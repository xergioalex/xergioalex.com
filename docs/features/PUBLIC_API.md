# Public API & Developer Portal

The site exposes a small read-only JSON API and a `/developers` portal that
documents it. Both exist for the same reason the `.well-known/` surface does:
an agent should be able to consume this site without scraping HTML.

**Related:** [Public Assets](PUBLIC_ASSETS.md) · [Markdown for Agents](../aeo/MARKDOWN_FOR_AGENTS.md) · [Architecture](../ARCHITECTURE.md)

---

## The three documents that describe the API

They describe the same surface and **must never disagree**:

| Document | Source | Purpose |
|----------|--------|---------|
| `public/openapi.json` | `scripts/build-openapi.mjs` (generated) | OpenAPI 3.1 — schemas, parameters, error model |
| `/api/index.json` | `src/pages/api/index.json.ts` | Runtime index with fully-resolved URLs, versioning policy, auth model |
| `/developers` | `src/components/pages/DevelopersPage.astro` | Human-readable portal, both languages |

They are joined by `operationId`, and the list of operations lives in **one**
place: `src/lib/api-endpoints.ts`. `tests/unit/agent-readiness/openapi.test.ts`
fails the build if the shared list, the generated spec, or either locale's
endpoint descriptions drift apart.

**To add or change an endpoint:**

1. Add the route under `src/pages/api/`.
2. Add its `operationId` and path template to `src/lib/api-endpoints.ts`.
3. Add the operation and its response schema to `scripts/build-openapi.mjs`.
4. Add a description under `developersPage.endpoints.descriptions` in **both**
   `src/lib/translations/en.ts` and `es.ts` (the type is keyed by `operationId`,
   so TypeScript catches a missing one).
5. Describe it in `src/pages/api/index.json.ts` and in the `.md` twins at
   `src/content/pages/{en,es}/developers.md`.
6. Run `pnpm run generate:openapi && pnpm run test`.

### Path shape matters

Endpoints are **prerendered static files**, so a path must name a real file.
`/api/series/{lang}` returns 404; `/api/series/{lang}/index.json` is the file
the build emits. The OpenAPI paths use the file form. The edge middleware
resolves the directory form as a convenience (see below), but never document
the directory form as canonical.

---

## Agent-friendly errors (`functions/_middleware.ts`)

The site is static, so the `try/catch` in an API route runs at **build** time
and never at request time. A request for a path that was never built is
answered by Cloudflare with the static HTML 404 page — useless to an agent.

The Pages Function fixes that after `context.next()`:

| Request | Response |
|---------|----------|
| Any `/api/*` 4xx/5xx | `application/problem+json` (RFC 9457) with the `Error` schema — never HTML, whatever the client's `Accept` says |
| `/api/series/en` (directory form) | Resolved to `/api/series/en/index.json`, served 200 with `Content-Location` |
| Non-API 4xx, `Accept: application/json` | Same JSON error, `scope: 'site'` — hint points at the sitemap, not the endpoint index |
| Non-API 4xx, `Accept` **without** `text/html` | Short Markdown recovery document, EN or ES by path |
| Non-API 4xx from a browser (`Accept` lists `text/html`) | The designed HTML 404 page, unchanged, plus `Vary: Accept` |
| Any `/api/*` over quota | `429` problem+json with `Retry-After` and the `RateLimit-*` headers (see below) |

The decision logic lives in `src/lib/agent-errors.ts` as pure functions so it
can be unit-tested; the Function itself needs the Workers runtime and the
`ASSETS` binding, which Vitest cannot provide.

### The error body

RFC 9457 problem-details members **plus** a nested `error` object:

```json
{
  "type": "https://xergioalex.com/developers#errors",
  "title": "Not Found",
  "status": 404,
  "detail": "No API resource exists at /api/series/fr/index.json.",
  "instance": "/api/series/fr/index.json",
  "error": {
    "code": "resource_not_found",
    "message": "No API resource exists at /api/series/fr/index.json.",
    "hint": "Fetch https://xergioalex.com/api/index.json for the list of available endpoints.",
    "documentation_url": "https://xergioalex.com/developers"
  }
}
```

Both shapes on purpose: problem-details clients read the top level, and an
agent that just wants `error.message` does not have to special-case anything.
Error `code` values are stable identifiers — add one, never rename one, and
keep the enum in `agent-errors.ts` and in `build-openapi.mjs` in step.

---

## Verifying it locally

`pnpm run dev` runs Astro's middleware, **not** the Cloudflare Pages Function —
error handling and Markdown negotiation are invisible there. To exercise the
real edge runtime:

```bash
pnpm run build
npx wrangler pages dev dist --port 8788

curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://127.0.0.1:8788/nope
#   404 text/markdown; charset=utf-8
curl -s http://127.0.0.1:8788/api/series/fr/index.json
#   the JSON error body above
curl -s -H 'Accept: text/html' -o /dev/null -w "%{content_type}\n" http://127.0.0.1:8788/nope
#   text/html; charset=utf-8 — browsers keep the designed page
```

---

## Versioning policy

Published in three places (`openapi.json` `info.description`,
`/api/index.json` `versioning`, and `/developers#versioning`) and worth keeping
literally true:

- **Additive changes** — new endpoints, new optional fields — ship without notice.
- **Breaking changes** ship under a new path prefix (`/api/v2/…`). The
  unprefixed paths are never repurposed for a different shape.
- **Overlap**: when a new prefix ships, the previous paths keep serving for at
  least six months, and answer with `Deprecation` (RFC 9745) and `Sunset`
  (RFC 8594) headers for the whole overlap.
- **Version in band**: every `/api/*` response carries `X-API-Version`
  (set by the edge middleware; the value lives in `src/lib/constances.ts`).

If you ever need to break a response shape, that is the contract to honor —
changing a field in place silently is the one thing this policy rules out.

---

## Rate limits (`src/lib/rate-limit.ts` + `functions/_middleware.ts`)

The programmatic surfaces (`/api/*`, `/mcp`, `/.well-known/mcp`) are rate
limited **for real**: a per-client-IP sliding window of 300 requests / 60 s,
enforced in the Pages Function middleware. Every response from those paths
carries the quota in the RateLimit header fields of
`draft-ietf-httpapi-ratelimit-headers-11` (`RateLimit-Policy`, `RateLimit`)
plus the alias names from earlier drafts of the same specification
(`RateLimit-Limit` / `-Remaining` / `-Reset`). Exceeding the quota returns
`429` with the problem+json error body and `Retry-After`.

Honesty rules, inherited from the old "no limits" policy this replaced:

- The limiter is **best-effort**: Cloudflare runs several middleware isolates,
  each with its own counters, so a single abusive client may get a small
  multiple of the published quota. The docs (`/developers#rate-limits`,
  `openapi.json`) say so — do not scrub that caveat.
- Never advertise a header the edge does not set. The headers exist because
  the edge enforces the quota, not the other way around.
- Change the quota in **one** place: `API_RATE_LIMIT_POLICY` in
  `src/lib/rate-limit.ts` — then mirror the two numbers in
  `scripts/build-openapi.mjs` (`RATE_LIMIT_QUOTA`,
  `RATE_LIMIT_WINDOW_SECONDS`) and regenerate the spec. The openapi test pins
  the header components, not the numbers.

Auth is still none. The OAuth documents under `.well-known/` are labelled
reserved stubs for a reason.

---

## MCP server (`/mcp`) and CLI (`cli/`)

Three doors into the same data, kept in sync by sharing the JSON API:

- **REST** — the endpoints in this document.
- **MCP** — `functions/mcp.ts` + `src/lib/mcp/` expose a stateless, read-only
  Streamable HTTP server (protocol 2025-06-18) at `/mcp`; the middleware maps
  `/.well-known/mcp` to the same handler. Six tools (`search_blog_posts`,
  `list_series`, `get_series`, `get_posts_by_tag`, `list_slide_decks`,
  `get_api_index`), each reading the prerendered `/api/*.json` assets via
  `ASSETS.fetch` — the MCP layer holds no data of its own.
- **CLI** — `cli/` (`npm: xergioalex`) wraps the same endpoints for the
  terminal. Zero dependencies; pure logic in `cli/src/core.mjs` is covered by
  `tests/unit/cli/core.test.ts`.

The JSON-RPC core (`src/lib/mcp/server.ts`) and the HTTP envelope
(`src/lib/mcp/endpoint.ts`) are pure modules so Vitest covers the protocol
without the Workers runtime. The Functions layer stays thin on purpose.
