# auth.md — Agent Registration for xergioalex.com

> Machine-readable agent registration guidance for AI agents and autonomous
> clients, following the [Auth.md](https://workos.com/auth-md) convention.

## TL;DR

**xergioalex.com is a static, public, read-only content site.** There is no
account system, no protected API, and no credential issuance. **Agents do not
need to register or authenticate to access anything here.** Every page,
endpoint, and feed is publicly readable.

This file exists so agents can confirm — quickly and without guessing — that no
authorization step is required before fetching content.

## Audience

This guidance targets autonomous agents (LLM-based assistants, crawlers, and
A2A/MCP clients) that look for an `/auth.md` entry point to decide how to
authenticate before using a site's resources.

## Access model

| Aspect | Value |
|--------|-------|
| Identity required | **None** — anonymous access |
| Credentials required | **None** |
| Protected resources | **None** today |
| Registration endpoint | Reserved (see below); not active |
| Supported identity types | `anonymous` |

## What agents can do without registering

- Read any HTML page (`https://xergioalex.com/…`) and its Spanish twin (`/es/…`).
- Read the Markdown-for-agents twin of any page (append `.md` to the path).
- Read `/.well-known/api-catalog`, `/openapi.json`, `/llms.txt`, and
  `/llms-full.txt` for a machine-readable map of the site.
- Discover skills via `/.well-known/agent-skills/index.json` and the MCP
  surface via `/.well-known/mcp/server-card.json`.

## OAuth & registration metadata (stubs)

For agents that probe the standard OAuth discovery surface, the site publishes
spec-shaped metadata. These are **reserved, non-active stubs** — the site has no
live OAuth flows today:

- Protected Resource Metadata — [`/.well-known/oauth-protected-resource`](/.well-known/oauth-protected-resource)
- Authorization Server Metadata — [`/.well-known/oauth-authorization-server`](/.well-known/oauth-authorization-server)
  - Includes an `agent_auth` block advertising an `anonymous` identity type and
    a reserved `register_uri`.

> **Do not probe registration endpoints during passive scans.** The
> `register_uri` / `identity_endpoint` paths are reserved and do not currently
> accept requests. The public discovery documents above are the authoritative
> source of truth.

## Contact

Questions about agent access: **xergioalex@dailybot.com** —
or [https://xergioalex.com/contact](https://xergioalex.com/contact).
