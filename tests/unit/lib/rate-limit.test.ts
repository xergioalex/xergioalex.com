import { describe, expect, it } from 'vitest';

import {
  API_RATE_LIMIT_POLICY,
  createRateLimiter,
  isRateLimitedPath,
  rateLimitFieldValue,
  rateLimitHeaders,
  rateLimitPolicyFieldValue,
} from '@/lib/rate-limit';

const T0 = 1_000_000; // arbitrary epoch ms
const tinyPolicy = { name: 'test', quota: 3, windowSeconds: 60 };

describe('createRateLimiter (sliding window)', () => {
  it('allows requests under the quota and counts remaining', () => {
    const limiter = createRateLimiter();

    // Remaining is reported after the current request is counted.
    expect(limiter.check('a', tinyPolicy, T0)).toEqual({
      limited: false,
      remaining: 2,
      retryAfterSeconds: 60,
    });
    expect(limiter.check('a', tinyPolicy, T0 + 1000).remaining).toBe(1);
    expect(limiter.check('a', tinyPolicy, T0 + 2000).remaining).toBe(0);
  });

  it('limits the request that exceeds the quota', () => {
    const limiter = createRateLimiter();
    for (let i = 0; i < tinyPolicy.quota; i++) {
      limiter.check('b', tinyPolicy, T0 + i * 1000);
    }

    const decision = limiter.check('b', tinyPolicy, T0 + 3500);
    expect(decision.limited).toBe(true);
    expect(decision.remaining).toBe(0);
  });

  it('computes Retry-After as the time until the oldest hit expires', () => {
    const limiter = createRateLimiter();
    for (let i = 0; i < tinyPolicy.quota; i++) {
      limiter.check('c', tinyPolicy, T0);
    }

    // Oldest hit is at T0; the window drains at T0 + 60s. Asked 10s in,
    // Retry-After must be ~50s and never 0.
    const decision = limiter.check('c', tinyPolicy, T0 + 10_000);
    expect(decision.limited).toBe(true);
    expect(decision.retryAfterSeconds).toBe(50);
  });

  it('frees the window as hits age out', () => {
    const limiter = createRateLimiter();
    for (let i = 0; i < tinyPolicy.quota; i++) {
      limiter.check('d', tinyPolicy, T0);
    }
    expect(limiter.check('d', tinyPolicy, T0 + 1000).limited).toBe(true);

    // 61s after the burst every hit has expired.
    const decision = limiter.check('d', tinyPolicy, T0 + 61_000);
    expect(decision.limited).toBe(false);
    expect(decision.remaining).toBe(tinyPolicy.quota - 1);
  });

  it('tracks keys independently', () => {
    const limiter = createRateLimiter();
    for (let i = 0; i < tinyPolicy.quota; i++) {
      limiter.check('ip-1', tinyPolicy, T0);
    }
    expect(limiter.check('ip-2', tinyPolicy, T0).limited).toBe(false);
  });

  it('prunes expired keys on demand', () => {
    const limiter = createRateLimiter();
    limiter.check('gone', tinyPolicy, T0);
    limiter.check('stay', tinyPolicy, T0 + 120_000);

    limiter.prune(T0 + 130_000);

    // 'gone' is fully outside the window and was dropped; 'stay' survives.
    expect(limiter.check('stay', tinyPolicy, T0 + 130_000).remaining).toBe(
      tinyPolicy.quota - 2
    );
  });
});

describe('header field values (draft-ietf-httpapi-ratelimit-headers-11)', () => {
  it('formats RateLimit-Policy as a quoted string item with q and w params', () => {
    expect(rateLimitPolicyFieldValue(tinyPolicy)).toBe('"test";q=3;w=60');
    expect(rateLimitPolicyFieldValue(API_RATE_LIMIT_POLICY)).toBe(
      '"edge";q=300;w=60'
    );
  });

  it('formats RateLimit with remaining quota r and window t', () => {
    expect(
      rateLimitFieldValue(tinyPolicy, {
        limited: false,
        remaining: 2,
        retryAfterSeconds: 60,
      })
    ).toBe('"test";r=2;t=60');
  });

  it('emits the draft-11 fields, the legacy alias fields, and Retry-After only when limited', () => {
    const allowed = rateLimitHeaders(tinyPolicy, {
      limited: false,
      remaining: 3,
      retryAfterSeconds: 60,
    });
    expect(allowed).toEqual({
      'RateLimit-Policy': '"test";q=3;w=60',
      RateLimit: '"test";r=3;t=60',
      'RateLimit-Limit': '3',
      'RateLimit-Remaining': '3',
      'RateLimit-Reset': '60',
    });

    const limited = rateLimitHeaders(tinyPolicy, {
      limited: true,
      remaining: 0,
      retryAfterSeconds: 42,
    });
    expect(limited['Retry-After']).toBe('42');
    expect(limited['RateLimit']).toBe('"test";r=0;t=42');
  });
});

describe('isRateLimitedPath', () => {
  it('covers the API surface and MCP endpoints', () => {
    expect(isRateLimitedPath('/api/index.json')).toBe(true);
    expect(isRateLimitedPath('/api/series/en/trading-journey.json')).toBe(true);
    expect(isRateLimitedPath('/api')).toBe(true);
    expect(isRateLimitedPath('/mcp')).toBe(true);
    expect(isRateLimitedPath('/.well-known/mcp')).toBe(true);
  });

  it('leaves HTML pages and assets alone', () => {
    expect(isRateLimitedPath('/')).toBe(false);
    expect(isRateLimitedPath('/blog/some-post/')).toBe(false);
    expect(isRateLimitedPath('/openapi.json')).toBe(false);
    expect(isRateLimitedPath('/images/blog/posts/x/hero.webp')).toBe(false);
  });
});
