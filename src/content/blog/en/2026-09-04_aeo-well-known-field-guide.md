---
title: "The .well-known Explosion: A Field Guide to the New Agent Standards"
description: "A field guide to the .well-known family for AI agents: Link headers, API Catalog, OAuth, MCP, skills, Web Bot Auth — with cabuya.org as a production example."
pubDate: "2026-09-04T19:30:00"
heroImage: "/images/blog/posts/aeo-well-known-field-guide/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "web-development", "ai-agents", "cloudflare", "mcp", "aeo"]
keywords: ["well-known endpoints", "RFC 8288 Link headers", "RFC 9727 API Catalog", "RFC 9728 OAuth Protected Resource Metadata", "MCP Server Card SEP-1649", "Agent Skills Discovery", "Web Bot Auth", "Content Signals"]
series: "aeo-from-invisible-to-cited"
seriesOrder: 6
draft: false
---

Every domain on the internet keeps a folder where anyone can knock without asking permission: `/.well-known/`. That's not a metaphor — it's a fixed path that [RFC 8615](https://www.rfc-editor.org/rfc/rfc8615) (RFCs are the documents Internet rules are written in) reserved years ago to say: *whatever a site wants the world to know up front, lives here*. Clients have been using it for a decade — `openid-configuration` for sign-in, `security.txt` for vulnerability reports, ACME challenges for certificate issuance.

What's new is who moved into the folder. Through 2025 and 2026 it filled up with files written not for humans or browsers but for AI agents — programs that visit sites to read and to act, not to look. When an agent arrives at your site it doesn't see your design, your navigation, or your carefully revised copy. It does what a courier in a hurry would do: head straight for the front desk. The `.well-known/` folder is that front desk.

This guide walks the whole family, in the order you'd ship it on a new site: cheapest file first. And this time I have something I didn't have when I wrote the original draft: a second site, [cabuya.org](https://cabuya.org/), where this entire family runs in production. Every section uses it as the real example.

## What changed since April

This post sat in drafts for months, and the ground moved underneath it. Four things, all verified today:

1. **The scorecard grew.** [isitagentready.com](https://isitagentready.com/) (Cloudflare's scoreboard — the web infrastructure company — that measures how agent-ready a site is) went from 8 checks to **22, across five axes**: discoverability, content accessibility, bot access control, protocol discovery, and commerce. It also traded the numeric score for named levels, 0 to 5.
2. **Payments arrived.** Four formats are competing for the agent's wallet: x402, UCP, MPP, and ACP. A whole axis of the scorecard that didn't exist in April.
3. **Web Bot Auth got real.** It was roadmap when I wrote the draft; today it's a scorecard check with its own working group at the IETF (the body that standardizes Internet protocols).
4. **MCP shipped the 2026-07-28 spec.** The protocol agents use to talk to external tools got rewritten stateless — no handshake, no sessions.

If you don't code, stay for each section's "what it is" and "why it exists"; the code can wait. If you do, every section is self-contained: *what it is / why it exists / minimum valid example / common pitfalls / where to learn more.* Skip around.

## 1. robots.txt Content Signals

### What it is

A single-line directive in `robots.txt` declaring your preferences for AI use of your content: training, search indexing, use as input to a generated answer.

### Why it exists

`robots.txt` traditionally told crawlers whether they could *fetch*. Content Signals extends that to what they can *do* with what they fetch. It formalizes the difference between "please index me" and "please don't train on me" — a distinction `noindex` and allow/disallow can't express.

### Minimum valid example

```text
User-agent: *
Content-Signal: ai-train=no, search=yes, ai-input=yes
```

All three signals (`ai-train`, `search`, `ai-input`) must appear. A fourth is on the way: `use`, which declares *how* content gets consumed (`immediate`, `reference`, or `full`) — it already shows up in the blocks Cloudflare manages automatically.

### Common pitfalls

- Placing `Content-Signal:` outside a `User-agent:` block — invisible to crawlers.
- Omitting one of the three signals, or writing `ai-train=no,search=yes` with no space after the comma.
- **The two-layer trap.** If you turn on Cloudflare's managed Content Signals, your `robots.txt` ends up with two blocks writing the same directive — theirs on top, yours below. On cabuya.org today, `ai-train=no` (managed) and `ai-train=yes` (mine) coexist. I found exactly that while preparing this post, and I don't have a clean answer: every crawler resolves duplicate blocks its own way. What I do know is that an ambiguous policy is worse than a policy you dislike. Decide which layer owns the signal.

### Where to learn more

- [contentsignals.org](https://contentsignals.org/)
- [IETF draft](https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/)
- Cloudflare's [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/)

## 2. Link response headers (RFC 8288)

### What it is

HTTP `Link:` headers on HTML responses pointing at machine-readable companion documents. Think of them as HTML's `<link rel>` tags promoted to the response header, so clients that never parse the HTML still find the site's metadata.

### Why it exists

Agents don't always render the page — sometimes they `HEAD /` and decide from response headers alone. Link headers let them discover your API catalog, MCP server card, or skills index without fetching the HTML.

### Minimum valid example

```text
Link: </.well-known/api-catalog>; rel="api-catalog"
```

Useful `rel` values: `api-catalog`, `service-desc`, `service-doc`, `describedby`. One is enough; several are fine. Here's cabuya.org's in production, served on every response:

```text
Link: </.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json",
      </openapi.json>; rel="service-desc"; type="application/openapi+json",
      </llms.txt>; rel="describedby"; type="text/plain"
```

### Common pitfalls

- Missing angle brackets around the URL, or the semicolon before `rel=`.
- Pointing `rel` at a URL that returns 404.
- Emitting them only on `/` and not on language subpaths like `/es/`.

### Where to learn more

- [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) (Web Linking)
- [RFC 9727 §3](https://www.rfc-editor.org/rfc/rfc9727#section-3) (rel registration for `api-catalog`)
- [IANA Link Relations registry](https://www.iana.org/assignments/link-relations/)

## 3. API Catalog (RFC 9727 + Linkset RFC 9264)

### What it is

A JSON document at `/.well-known/api-catalog` listing your public APIs, each with links to its machine-readable description (OpenAPI — the standard format for describing APIs) and its human documentation.

### Why it exists

A single pointer to your OpenAPI spec isn't enough — larger sites have several APIs, each with different docs. The catalog uses the *linkset* format so tooling consumes a list of API descriptions uniformly.

### Minimum valid example

```json
{
  "linkset": [
    {
      "anchor": "https://api.example.com/users",
      "links": [
        { "rel": "service-desc", "href": "https://api.example.com/openapi.json" },
        { "rel": "service-doc", "href": "https://api.example.com/docs" }
      ]
    }
  ]
}
```

Cabuya.org's catalog (trimmed) points at the OpenAPI spec, the docs, and the protocol's JSON Schemas — three `anchor`s for three surfaces:

```json
{
  "linkset": [
    {
      "anchor": "https://cabuya.org/api/validate",
      "service-desc": [{ "href": "https://cabuya.org/openapi.json" }],
      "service-doc": [{ "href": "https://cabuya.org/developers/validator.md" }]
    }
  ]
}
```

### Common pitfalls

- **Wrong Content-Type.** It must be `application/linkset+json`, *not* `application/json`. This one fails silently: the file looks perfect in a browser and no client accepts it.
- An empty `linkset` array, or missing `service-desc`/`service-doc`.
- Linking at an OpenAPI spec you haven't actually written.

### Where to learn more

- [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727) (The Linkset API Catalog)
- [RFC 9264](https://www.rfc-editor.org/rfc/rfc9264) (Linksets) — Appendix A of 9727 has full worked examples

## 4. OAuth Authorization Server Metadata (RFC 8414) / OIDC Discovery

### What it is

Publishing your OAuth authorization server's configuration at a fixed path (OAuth is the standard that lets one app ask another for permissions without sharing passwords) so clients discover endpoints programmatically.

### Why it exists

Agents can't ship hard-coded knowledge of where your authorization endpoint lives. This metadata lets them make one fetch and know exactly how to start an auth flow.

### Minimum valid example

```json
{
  "issuer": "https://your-domain.com",
  "authorization_endpoint": "https://your-domain.com/authorize",
  "token_endpoint": "https://your-domain.com/token",
  "jwks_uri": "https://your-domain.com/.well-known/jwks.json",
  "grant_types_supported": ["authorization_code"],
  "response_types_supported": ["code"]
}
```

Six required fields, served at `/.well-known/oauth-authorization-server` or `/.well-known/openid-configuration`. The honest version cabuya.org serves declares exactly what exists — one credential, and what it buys:

```json
{
  "issuer": "https://cabuya.org",
  "token_endpoint": "https://cabuya.org/oauth/token",
  "grant_types_supported": ["client_credentials"],
  "scopes_supported": ["validate:extended"],
  "service_documentation": "https://cabuya.org/auth.md"
}
```

*Translation: these files hand the agent a map of the door — where to ask for a token and what it unlocks. The key remains your business.*

### Common pitfalls

- Publishing endpoints that don't exist. The honest shape on a site with no real OAuth is documenting reserved paths — a `_comment` field is spec-compliant.
- Missing one of the six required fields.
- Counting on dynamic client registration (RFC 7591) forever: the MCP 2026-07-28 spec [deprecated it](https://blog.cloudflare.com/mcp-v2/) for new implementations, with removal after summer 2027. If you're starting out, prefer pre-registered clients.

### Where to learn more

- [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414) (OAuth 2.0 Authorization Server Metadata)
- [OpenID Connect Discovery 1.0](http://openid.net/specs/openid-connect-discovery-1_0.html)
- Cloudflare's [Managed OAuth for Access](https://blog.cloudflare.com/managed-oauth-for-access/)

## 5. OAuth Protected Resource Metadata (RFC 9728)

### What it is

The companion document to the previous one: it declares which *resources* are protected and which authorization servers issue tokens for them.

### Why it exists

Authorization server metadata answers "where do I get a token?" Protected resource metadata answers "what can I do with one here?" An agent that discovers both can plan the whole flow.

### Minimum valid example

```json
{
  "resource": "https://your-domain.com",
  "authorization_servers": ["https://your-oauth-provider.com"]
}
```

Two required fields. On a content site with no protected resources, a self-reference is a valid honest tautology — that's how cabuya.org serves it:

```json
{
  "resource": "https://cabuya.org",
  "authorization_servers": ["https://cabuya.org"],
  "scopes_supported": ["validate:extended"]
}
```

### Common pitfalls

- Listing authorization servers that don't exist or aren't reachable.
- Wrong path: it must be exactly `/.well-known/oauth-protected-resource`, no `.json` extension.
- Forgetting `WWW-Authenticate: resource_metadata` on 401 responses — it's how an agent that arrived unknowing discovers the document.

### Where to learn more

- [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728) (OAuth 2.0 Protected Resource Metadata)

## 6. MCP Server Card (SEP-1649)

### What it is

A JSON document at `/.well-known/mcp/server-card.json` declaring your site an MCP-compatible surface — which capabilities you serve and where to connect.

### Why it exists

MCP (Model Context Protocol) became the shared language agents use to talk to external tools. The server card makes an MCP site discoverable at a known path, without hand-configuring every agent.

### What changed in the spec

The [2026-07-28](https://blog.cloudflare.com/mcp-v2/) version rewrote the transport: MCP is now stateless — no initialize handshake, no `Mcp-Session-Id`, with new headers (`Mcp-Method`, `Mcp-Name`) so gateways and WAFs can decide without parsing the body. The HTTP+SSE transport is deprecated. The card itself is still a proposal — [SEP-1649](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1649) — now joined by an [IETF draft](https://datatracker.ietf.org/doc/draft-serra-mcp-discovery-uri/04/) for an `mcp://` URI scheme. The standard is settling; the details still move.

### Production example

```json
{
  "serverInfo": { "name": "cabuya-org", "title": "cabuya.org site tools", "version": "0.1.0" },
  "transport": { "type": "streamable-http", "endpoint": "https://cabuya.org/mcp" },
  "capabilities": { "tools": {} },
  "tools": [
    { "name": "validate_cabuya_feed" },
    { "name": "read_cabuya_page_as_markdown" }
  ],
  "authentication": { "type": "none" }
}
```

Note the detail: the SEP defines `capabilities` as a flat string array; cabuya.org serves an object — and the scanner passes both. We're in that awkward stage where the spec, the scanners, and production don't all say the same thing yet. Write what the SEP asks for and tolerate what you find.

### Common pitfalls

- Wrong nested path — it's `/.well-known/mcp/server-card.json`, not `/.well-known/mcp.json`.
- An empty `capabilities` array.
- Declaring capabilities your site doesn't serve over MCP.

### Where to learn more

- [Model Context Protocol — spec](https://modelcontextprotocol.io/)
- [SEP-1649 / server card](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1649)
- [The next generation of MCP](https://blog.cloudflare.com/mcp-v2/) (Cloudflare, on 2026-07-28)

## 7. Agent Skills Discovery (Cloudflare RFC v0.2.0)

### What it is

A JSON index at `/.well-known/agent-skills/index.json` listing skills — documented procedures an agent can read, cache, and follow — each pointing at its SKILL.md with a SHA-256 hash of the served bytes.

### Why it exists

A *tool* is something an agent can call. A *skill* is composable knowledge on top: instructions the agent reads and follows when it needs them. The index standardizes where to find them, and the hash verifies they didn't change in transit.

### Minimum valid example

```json
{
  "$schema": "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  "skills": []
}
```

An empty `skills[]` is valid. Cabuya.org's lists two, with hash and license (trimmed):

```json
{
  "skills": [
    {
      "name": "publish-a-cabuya-feed",
      "type": "skill",
      "description": "Publish emergency-aid data as a conforming feed and measure it with the public validator.",
      "url": "https://cabuya.org/.well-known/agent-skills/publish-a-feed/SKILL.md",
      "sha256": "7777afc5fcf6c2f2...",
      "license": "CC0-1.0"
    }
  ]
}
```

Did you catch it? The canonical spec calls the field `digest` with a `sha256:` prefix; production sometimes names it `sha256` outright. The scanner accepts both. If you're writing a client, tolerate the variance — it's a draft, and drafts mutate.

### Common pitfalls

- Skill names with uppercase or spaces (lowercase, digits, hyphens; 1–64 characters).
- A hash computed on local bytes instead of the bytes actually served — they differ if your server re-compresses content.
- Confusing `type: "skill-md"` (single file) with `type: "archive"` (a multi-file `.tar.gz`).

### Where to learn more

- [Cloudflare Agent Skills Discovery RFC](https://github.com/cloudflare/agent-skills-discovery-rfc)
- [agentskills.io](https://agentskills.io/)

## 8. WebMCP (browser)

### What it is

A browser API — `navigator.modelContext.registerTool()` — that lets a page publish tools an agent running *in the browser itself* can call. MCP over a page context instead of a server.

### Why it exists

When the agent runs in the user's browser (an extension, an integrated assistant), it has full access to the session — cookies, state, everything. WebMCP gives the page a way to say "here are the actions I expose" without turning them into public APIs.

### Minimum valid example

```js
navigator.modelContext.registerTool({
  name: 'search',
  description: 'Search site content',
  inputSchema: {
    type: 'object',
    properties: { q: { type: 'string' } },
    required: ['q'],
  },
  execute: async ({ q }) => { /* ... */ },
}, { signal: abortController.signal });
```

Four properties per tool: `name`, `description`, `inputSchema`, `execute`. Pass the `AbortController` signal so the registration is revoked on unmount.

### Common pitfalls

- Registering tools in a deferred script that runs after the scanner's snapshot — use a hydration directive that runs in time.
- Exposing write operations without explicit consent. Keep the surface read-only at first.
- An `inputSchema` that isn't valid JSON Schema.

### Where to learn more

- [WebMCP spec](https://webmachinelearning.github.io/webmcp/)
- [Chrome's WebMCP explainer](https://developer.chrome.com/blog/webmcp-epp)

## 9. Web Bot Auth (no longer a bonus)

### What it is

A directory at `/.well-known/http-message-signatures-directory` holding the public keys agents use to sign their HTTP requests. It lets a site verify "this request really comes from the agent it claims to be."

### Why it exists

Bot identification today is IP-based and User-Agent-based — both spoofable. Web Bot Auth proposes cryptographic signatures so agents can *prove* their identity. In April this was scorecard roadmap; today it's a real check (asking for a JWKS with at least one key) with its own [working group at the IETF](https://datatracker.ietf.org/wg/webbotauth/about/). Cloudflare's verified bots program already [verifies with cryptography](https://blog.cloudflare.com/verified-bots-with-cryptography/), not IP lists.

### What the check asks for

- A JWKS (a JSON set of public keys) at the well-known path.
- Signed requests from your bot, including `Signature-Agent` and `Signature-Input` headers.

### Where to learn more

- [Web Bot Auth on Cloudflare](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)
- [The age of agents](https://blog.cloudflare.com/signed-agents/) (the origin, August 2025)

## 10. What arrived after April: payments, agent-to-agent, DNS

The scorecard now runs 22 checks. These are the ones that didn't exist when I wrote the draft — one line each, so you know they're there:

- **A2A Agent Card** — `/.well-known/agent-card.json`: agent-to-agent discovery, for agents looking for each other ([spec](https://a2a-protocol.org/latest/specification/)).
- **ARD** — `/.well-known/ai-catalog.json`: a unified manifest listing your MCP servers, A2A agents, skills, and APIs in one document ([spec](https://agenticresourcediscovery.org/), still v0.9).
- **DNS-AID** — discovery over DNS: `SVCB` records under your domain's `_agents` namespace, so an agent finds your endpoints before making a single HTTP request.
- **auth.md** — a `/auth.md` at the root explaining your authentication in prose, for agents ([the proposal](https://workos.com/auth-md)).
- **Commerce** — four formats competing for the agent's wallet: [x402](https://x402.org) (from Coinbase, native HTTP payments with a 402 response), [UCP](https://ucp.dev/), [MPP](https://mpp.dev), and [ACP](https://agenticcommerce.dev).

I won't pretend to know which ones survive. In April it was 8 checks; today it's 22. The folder is still exploding.

## 11. Cabuya: the whole family in production

Cabuya is an open interoperability protocol for emergency-aid applications that I built. The problem is simple: in every emergency, teams build their own maps and directories — sometimes for the same city — and the data stays trapped inside each app. Cabuya defines a common format for the places aid runs on (shelters, collection centres, service points) and a fixed path to publish them. Any app can read what any other app published. Person-level data is out by design, not by good intentions. Everything is CC0 — there's nobody to ask for permission.

Why should any of this matter to a newborn protocol? Because a new site has no inbound links, no reputation, no history. A new protocol has nothing to recommend it except being easy to find for whoever arrives with no context. A well-attended front desk isn't a luxury — it's the only distribution you have on day one.

So cabuya.org serves the whole family: `Link` headers on every response; the API catalog with the correct Content-Type pointing at the OpenAPI spec, the JSON Schemas, and the docs pages; the MCP server card with two real tools (validate a feed, read any page as Markdown) over stateless transport with no authentication; the skills index with two entries — an adoption guide and a publishing guide — with their hashes and license; OAuth metadata that declares without shame that the one credential buys a bigger validation rate tier, nothing else; and every page on the site with a `.md` twin, because an agent that prefers Markdown shouldn't have to parse HTML.

There's a twist I like more than everything else: **the protocol itself lives in the folder**. A Cabuya publisher declares its manifest at `/.well-known/cabuya.json`. The folder that describes the protocol also executes it. That's the deep pattern of this whole guide — when you design a protocol, the folder lends you a drawer of your own.

Measured, not declared (house rule): the [isitagentready API](https://isitagentready.com/api/scan) returns level 5, *Agent-Native*, for cabuya.org today — all 22 checks pass or register as neutral, except the A2A card and the ARD catalog, which the site doesn't serve.

And the traffic? Honestly: none that I can measure. I think publishing this family is a correct, cheap bet — not a won lottery; the formats are still competing with each other and none has a monopoly on how agents will arrive. But an afternoon of work keeps you in the conversation, and not publishing keeps you out of it. The cost is asymmetric.

## What I'd implement if I were doing it again

The order of this guide is the order you'd ship:

1. **Afternoon one:** Content Signals in robots.txt + Link headers. Two files, two lines each.
2. **Weekend one:** the six `.well-known/*` JSON files. Most are under 1 KB. The OpenAPI spec takes the longest — budget half a day.
3. **Weekend two (optional):** the WebMCP bridge. Depends on your site's tool surface; read-only the first time.

You don't need to read every RFC end to end. Read each SKILL.md at `isitagentready.com/.well-known/agent-skills/` — those are the examples the scorecard applies; copy their payloads and adjust the URLs. The RFCs explain *why* each field exists; the SKILL.md tells you *what* to put there.

The second time was faster than the first — cabuya.org shipped with the whole family in a fraction of the time this site took, because the guide already existed in my head. May it now exist in yours.

I'll keep building.

## Resources

- [RFC 8615 — Well-Known URIs](https://www.rfc-editor.org/rfc/rfc8615)
- [RFC 8288 — Web Linking](https://www.rfc-editor.org/rfc/rfc8288)
- [RFC 9264 — Linksets](https://www.rfc-editor.org/rfc/rfc9264)
- [RFC 9727 — API Catalog](https://www.rfc-editor.org/rfc/rfc9727)
- [RFC 8414 — OAuth Authorization Server Metadata](https://www.rfc-editor.org/rfc/rfc8414)
- [RFC 9728 — OAuth Protected Resource Metadata](https://www.rfc-editor.org/rfc/rfc9728)
- [Model Context Protocol](https://modelcontextprotocol.io/) · [SEP-1649 server card](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1649) · [IETF mcp:// draft](https://datatracker.ietf.org/doc/draft-serra-mcp-discovery-uri/04/)
- [Cloudflare Agent Skills Discovery RFC](https://github.com/cloudflare/agent-skills-discovery-rfc) · [agentskills.io](https://agentskills.io/)
- [WebMCP spec](https://webmachinelearning.github.io/webmcp/)
- [Content Signals](https://contentsignals.org/) · [Web Bot Auth (IETF WG)](https://datatracker.ietf.org/wg/webbotauth/about/)
- [isitagentready.com](https://isitagentready.com/)
- [cabuya.org](https://cabuya.org/) — the protocol and its public validation API
