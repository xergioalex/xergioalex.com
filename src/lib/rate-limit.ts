/**
 * Best-effort per-IP rate limiting for the programmatic surfaces of the site
 * (`/api/*`, `/mcp`), implemented in the Cloudflare Pages Function middleware.
 *
 * The site is static; the JSON endpoints are prerendered files on the CDN.
 * This limiter runs at the edge in front of them and enforces a sliding-window
 * quota per client IP. It is *best-effort*: Cloudflare may run several
 * isolates of the Function concurrently, each with its own counters, so the
 * effective ceiling for a single abusive client can be a small multiple of
 * the configured quota. That is enough to make the published policy honest
 * while never touching the browsing experience of a human visitor.
 *
 * Responses carry the quota status in the RateLimit header fields of
 * draft-ietf-httpapi-ratelimit-headers-11 (`RateLimit-Policy` and `RateLimit`)
 * plus the widely-deployed field names from earlier drafts of the same
 * document (`RateLimit-Limit` / `-Remaining` / `-Reset`) so every client or
 * scanner that speaks any version of the convention can self-throttle. A
 * limited request is answered with `429` and `Retry-After` (RFC 6585).
 */

/** The quota this site publishes and enforces on its API surface. */
export const API_RATE_LIMIT_POLICY = {
  /** Policy name, quoted in the structured RateLimit header fields. */
  name: 'edge',
  /** Requests allowed per window per client IP. */
  quota: 300,
  /** Window length, in seconds. */
  windowSeconds: 60,
} as const;

export interface RateLimitPolicy {
  name: string;
  quota: number;
  windowSeconds: number;
}

export interface RateLimitDecision {
  /** True when the request exceeds the quota and must be rejected. */
  limited: boolean;
  /** Requests still allowed inside the current window. */
  remaining: number;
  /** Seconds until the window fully drains; the Retry-After value on a 429. */
  retryAfterSeconds: number;
}

export interface RateLimiter {
  check(key: string, policy: RateLimitPolicy, now?: number): RateLimitDecision;
  prune(now?: number): void;
}

/** Sliding-window-log limiter over one isolate's memory. */
export function createRateLimiter(): RateLimiter {
  const hits = new Map<string, number[]>();
  /** Hard cap on tracked keys so a flood of unique IPs cannot grow memory. */
  const MAX_KEYS = 10_000;

  function windowFor(
    key: string,
    policy: RateLimitPolicy,
    now: number
  ): number[] {
    const cutoff = now - policy.windowSeconds * 1000;
    const fresh = (hits.get(key) ?? []).filter((t) => t > cutoff);
    hits.set(key, fresh);
    return fresh;
  }

  return {
    check(key, policy, now = Date.now()) {
      if (hits.size > MAX_KEYS) this.prune(now);
      const fresh = windowFor(key, policy, now);

      if (fresh.length >= policy.quota) {
        const oldest = fresh[0] ?? now;
        const retryAfterSeconds = Math.max(
          1,
          Math.ceil((oldest + policy.windowSeconds * 1000 - now) / 1000)
        );
        return {
          limited: true,
          remaining: 0,
          retryAfterSeconds,
        };
      }

      fresh.push(now);
      return {
        limited: false,
        remaining: policy.quota - fresh.length,
        retryAfterSeconds: policy.windowSeconds,
      };
    },

    prune(now = Date.now()) {
      for (const [key, timestamps] of hits) {
        const cutoff = now - API_RATE_LIMIT_POLICY.windowSeconds * 1000;
        if (timestamps.every((t) => t <= cutoff)) hits.delete(key);
      }
    },
  };
}

/** The limiter instance the edge middleware uses (one per isolate). */
export const apiRateLimiter = createRateLimiter();

/**
 * Build the `RateLimit-Policy` field value (draft-ietf-httpapi-ratelimit-headers-11).
 * A List of String items with parameters: `"edge";q=300;w=60`.
 */
export function rateLimitPolicyFieldValue(policy: RateLimitPolicy): string {
  return `"${policy.name}";q=${policy.quota};w=${policy.windowSeconds}`;
}

/**
 * Build the `RateLimit` field value (draft-ietf-httpapi-ratelimit-headers-11).
 * `r` is the remaining quota, `t` the effective window in seconds.
 */
export function rateLimitFieldValue(
  policy: RateLimitPolicy,
  decision: RateLimitDecision
): string {
  return `"${policy.name}";r=${decision.remaining};t=${decision.retryAfterSeconds}`;
}

/** Every RateLimit-related response header for one decision. */
export function rateLimitHeaders(
  policy: RateLimitPolicy,
  decision: RateLimitDecision
): Record<string, string> {
  const headers: Record<string, string> = {
    'RateLimit-Policy': rateLimitPolicyFieldValue(policy),
    RateLimit: rateLimitFieldValue(policy, decision),
    // Names from earlier drafts of the same specification, still the most
    // widely implemented convention — kept as aliases of the values above.
    'RateLimit-Limit': String(policy.quota),
    'RateLimit-Remaining': String(decision.remaining),
    'RateLimit-Reset': String(decision.retryAfterSeconds),
  };
  if (decision.limited) {
    headers['Retry-After'] = String(decision.retryAfterSeconds);
  }
  return headers;
}

/** True for the request paths the limiter protects. */
export function isRateLimitedPath(pathname: string): boolean {
  return (
    pathname === '/api' ||
    pathname.startsWith('/api/') ||
    pathname === '/mcp' ||
    pathname === '/.well-known/mcp'
  );
}
