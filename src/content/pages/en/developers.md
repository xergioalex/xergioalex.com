---
title: "XergioAleX.com Developer Portal"
description: "Developer and agent resources for XergioAleX.com: a public read-only JSON API, an OpenAPI spec, an MCP server card and agent discovery documents. No key needed."
lastUpdated: 2026-08-24
---

## API, MCP and agent resources

Everything a developer or an AI agent needs to consume XergioAleX.com programmatically: a read-only JSON API, an OpenAPI 3.1 description, an MCP server card, and the discovery documents that tie them together. No API key, no signup, no rate limit.

---

## Quickstart

Every endpoint is a static JSON file behind a CDN. Start from the index — it lists every endpoint with fully-resolved URLs, so nothing has to be guessed.

```bash
curl -s https://xergioalex.com/api/index.json
curl -s https://xergioalex.com/api/posts-en.json
curl -s https://xergioalex.com/api/series/en/index.json
```

There is nothing to register for. Send a plain GET and you are done — credentials, if you send them, are ignored.

---

## Endpoints

Eight read-only operations, all documented in the [OpenAPI 3.1 spec](https://xergioalex.com/openapi.json) with an `operationId` and a typed response schema, so they can be wired straight into function calling.

| Endpoint | operationId | What it returns |
|----------|-------------|-----------------|
| `GET /api/index.json` | `getApiIndex` | Every endpoint with fully-resolved URLs, the versioning policy and the auth model. The entry point. |
| `GET /api/posts.json` | `listPosts` | The blog search index across every language. |
| `GET /api/posts-en.json` | `listPostsInEnglish` | The blog search index, English posts only. |
| `GET /api/posts-es.json` | `listPostsInSpanish` | The blog search index, Spanish posts only. |
| `GET /api/series/{lang}/index.json` | `listSeries` | Every blog series in one language, with chapter counts. |
| `GET /api/series/{lang}/{slug}.json` | `getSeries` | The ordered chapters of one series. |
| `GET /api/timeline/{lang}/{tag}.json` | `getTimelineByTag` | Every post carrying one tag, newest first. |
| `GET /api/slides-timeline/{lang}.json` | `getSlidesTimeline` | Every published slide deck in one language. |

- [OpenAPI specification](https://xergioalex.com/openapi.json)
- [API index](https://xergioalex.com/api/index.json)

---

## Errors

Failures return JSON, never HTML. The body carries RFC 9457 problem-details members alongside an `error` object with a stable code, a human message and a recovery hint — so an agent can act on the failure without parsing a page.

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

| Code | HTTP | Meaning |
|------|------|---------|
| `resource_not_found` | 404 | No resource exists at that path. The hint names the endpoint index. |
| `method_not_allowed` | 405 | The API is read-only. Retry with GET. |
| `gone` | 410 | The resource existed and was removed permanently. |
| `internal_error` | 500 | The request could not be completed. Retrying is safe. |

---

## Versioning

The API is versioned semantically and its current version is published at runtime in the API index, so a client never has to hardcode it.

- **Additive changes ship silently.** New endpoints and new optional fields can appear at any time. Parse defensively: ignore fields you do not know.
- **Breaking changes get a new prefix.** Removing a field, retyping one, or removing an endpoint ships under `/api/v2/…`. The unprefixed paths are never repurposed.
- **Six months of overlap.** When a new prefix ships, the previous paths keep serving for at least six months so nothing breaks without warning.

---

## Agent surface

Beyond the API, the site publishes the discovery documents agents look for. Each one is a stable URL you can fetch directly.

| Resource | What it is |
|----------|------------|
| [/.well-known/ai-catalog.json](https://xergioalex.com/.well-known/ai-catalog.json) | ARD capability manifest — every agent-facing artifact this site publishes, in one document. |
| [/.well-known/mcp/server-card.json](https://xergioalex.com/.well-known/mcp/server-card.json) | MCP server card for the read-only site tools exposed in the browser via WebMCP. |
| [/.well-known/agent-skills/index.json](https://xergioalex.com/.well-known/agent-skills/index.json) | Agent Skills discovery index — the agent-readiness conventions this site implements. |
| [/.well-known/api-catalog](https://xergioalex.com/.well-known/api-catalog) | RFC 9727 API catalog linkset pointing at the OpenAPI description and llms.txt. |
| [/openapi.json](https://xergioalex.com/openapi.json) | OpenAPI 3.1 description of every endpoint above. |
| [/llms.txt](https://xergioalex.com/llms.txt) | Curated map of the site for language models. |
| [/llms-full.txt](https://xergioalex.com/llms-full.txt) | The expanded content corpus for retrieval and grounding. |
| [/auth.md](https://xergioalex.com/auth.md) | Auth.md access policy: everything is public, anonymous and read-only. |

Markdown for Agents: send `Accept: text/markdown` on any URL, or append `.md`, to get Markdown instead of HTML.

---

## Access, limits and licensing

- **Authentication.** None. Every endpoint is public, anonymous and read-only. There is no free tier to sign up for because there is no paid tier — and no account, so nothing to onboard.
- **Rate limits.** No application-level rate limit. The endpoints are cached static assets behind Cloudflare, which applies its own network-level abuse protection. Cache responses for an hour and you will never come close.
- **Licensing.** Content is available under CC BY 4.0: reuse it, including for training and grounding, with attribution to xergioalex.com.

---

## Something broken or missing?

If an endpoint returns the wrong shape, a document is stale, or you need a field that is not exposed yet, get in touch — this surface exists to be used.

- [Contact](https://xergioalex.com/contact)
