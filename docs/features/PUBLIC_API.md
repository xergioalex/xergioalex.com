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
| Any `/api/*` 4xx/5xx | `application/json` with the `Error` schema — never HTML, whatever the client's `Accept` says |
| `/api/series/en` (directory form) | Resolved to `/api/series/en/index.json`, served 200 with `Content-Location` |
| Non-API 4xx, `Accept: application/json` | Same JSON error, `scope: 'site'` — hint points at the sitemap, not the endpoint index |
| Non-API 4xx, `Accept` **without** `text/html` | Short Markdown recovery document, EN or ES by path |
| Non-API 4xx from a browser (`Accept` lists `text/html`) | The designed HTML 404 page, unchanged, plus `Vary: Accept` |

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
  least six months.

If you ever need to break a response shape, that is the contract to honor —
changing a field in place silently is the one thing this policy rules out.

---

## Rate limits and auth

There are none, and the docs say so plainly. Do **not** add `RateLimit-*`
response headers unless the site actually enforces a limit: advertising a quota
nothing enforces is worse than advertising none. Same for auth — the OAuth
documents under `.well-known/` are labelled reserved stubs for a reason.
