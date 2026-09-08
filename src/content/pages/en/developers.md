---
title: "XergioAleX.com Developer Portal"
description: "Developer and agent resources for XergioAleX.com: read-only JSON API, OpenAPI spec, MCP server at /mcp, npm CLI and agent discovery docs. No key needed."
lastUpdated: 2026-09-08
---

## API, MCP and agent resources

Everything a developer or an AI agent needs to consume XergioAleX.com programmatically: a read-only JSON API, an OpenAPI 3.1 description, an MCP server at /mcp, a CLI on npm, and the discovery documents that tie them together. No API key, no signup — just stay inside the published rate limit.

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

Failures return `application/problem+json` (RFC 9457), never HTML. The body carries the standard problem-details members alongside an `error` object with a stable code, a human message and a recovery hint — so an agent can act on the failure without parsing a page.

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
| `rate_limited` | 429 | Too many requests. Wait the number of seconds in Retry-After, then retry. |
| `internal_error` | 500 | The request could not be completed. Retrying is safe. |

---

## Versioning and deprecation

The API is versioned semantically. Every response carries the version in the `X-API-Version` header and the current version is published at runtime in the API index, so a client never has to hardcode it.

- **Additive changes ship silently.** New endpoints and new optional fields can appear at any time. Parse defensively: ignore fields you do not know.
- **Breaking changes get a new prefix.** Removing a field, retyping one, or removing an endpoint ships under `/api/v2/…`. The unprefixed paths are never repurposed.
- **Deprecation is signalled, not implied.** When a new prefix ships, the previous paths keep serving for at least six months and answer with `Deprecation` (RFC 9745) and `Sunset` (RFC 8594) headers, so a client can see the end date in-band and migrate before it.

---

## Agent surface

Beyond the API, the site publishes the discovery documents agents look for. Each one is a stable URL you can fetch directly.

| Resource | What it is |
|----------|------------|
| [/mcp](https://xergioalex.com/mcp) | MCP server over Streamable HTTP (protocol 2025-06-18) — six read-only tools over the same data as the REST API. Also reachable at `/.well-known/mcp`. |
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

## MCP server and CLI

Two more doors into the same room: a Model Context Protocol server for AI clients, and a CLI for the terminal.

**MCP server — /mcp.** A stateless, read-only MCP server (Streamable HTTP, protocol 2025-06-18) serving six tools over the site's prerendered JSON: `search_blog_posts`, `list_series`, `get_series`, `get_posts_by_tag`, `list_slide_decks` and `get_api_index`. No authentication; the same rate limit as the REST API applies. Add `https://xergioalex.com/mcp` to any MCP client.

```bash
curl -s https://xergioalex.com/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

**CLI — `npm install -g xergioalex`.** The official CLI wraps the same API for the terminal: `xergioalex posts`, `search`, `series`, `tag`, `talks` and `api`, with `--json` and `--lang en|es` on every command. Zero dependencies, Node 18+.

---

## Access, limits and licensing

- **Authentication.** None. Every endpoint is public, anonymous and read-only. There is no free tier to sign up for because there is no paid tier — and no account, so nothing to onboard.
- **Rate limits.** 300 requests per minute per client IP, enforced best-effort at the edge. Every response publishes the quota in the RateLimit-Policy and RateLimit headers (draft-ietf-httpapi-ratelimit-headers); exceeding it returns 429 with Retry-After. Cache responses for an hour and you will never come close.
- **Licensing.** Content is available under CC BY 4.0: reuse it, including for training and grounding, with attribution to xergioalex.com.

---

## Something broken or missing?

If an endpoint returns the wrong shape, a document is stale, or you need a field that is not exposed yet, get in touch — this surface exists to be used.

- [Contact](https://xergioalex.com/contact)
