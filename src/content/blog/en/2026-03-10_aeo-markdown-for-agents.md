---
title: "Markdown for Agents: Making Your Content Speak AI's Language"
description: "Content negotiation has existed since HTTP/1.1. Now it's getting a new job. Here's what 'Markdown for Agents' means as a web pattern — and a working implementation using Astro and Cloudflare Pages."
pubDate: "2026-03-10T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["markdown for agents implementation", "content negotiation AI bots", "Accept text/markdown header", "Cloudflare markdown for agents", "AI-readable web content", "serve markdown to AI agents"]
series: "aeo-journey"
seriesOrder: 2
---

When an AI agent visits a web page, it gets the full HTTP response — the same thing a browser gets. Navigation markup, footer, theme-switching scripts, cookie banners, Tailwind utility classes, SVG icon definitions, JSON-LD schemas embedded as script tags. Then, somewhere inside all of that, the actual content.

Agents are good at extracting signal from noise. But every token spent on `class="text-gray-600 dark:text-gray-300"` or `<nav aria-label="Main navigation">` is a token not spent on understanding what the page actually says. For a short article, the ratio is fine. For a long post with a complex sidebar, you're burning a significant share of the context window before reaching the first paragraph.

This is a structural problem with HTML-first delivery. And it's getting a name: **Markdown for Agents**.

---

## Content Negotiation: An Old Idea, a New Job

Content negotiation has been part of HTTP since version 1.1. The client sends an `Accept` header describing what format it wants. The server responds with the format that best matches. A browser requests `Accept: text/html`. A client that can work with plain text might request `Accept: text/plain`. The server decides what to send.

For most of the web's history, this mechanism was mainly used for language selection (`Accept-Language`) and compression (`Accept-Encoding`). Format negotiation between HTML and other types rarely came up in practice — browsers wanted HTML, and servers delivered HTML.

AI agents change that calculus. An agent that can read Markdown has no reason to prefer HTML. Markdown is cleaner, token-efficient, and carries all the semantic content without the presentation layer. If a server can detect that the client is an AI agent — or more precisely, if the client announces it can handle `text/markdown` — the server can skip the HTML entirely.

That's the idea behind Markdown for Agents. Send Markdown when the client wants Markdown.

---

## Cloudflare's Proposal

In March 2025, [Cloudflare published "Markdown for Agents"](https://blog.cloudflare.com/markdown-for-agents/) — a post that laid out the problem clearly and proposed an implementation: edge-based HTML-to-Markdown conversion. When a request includes `Accept: text/markdown`, Cloudflare Workers intercepts it, fetches the HTML, converts it on the fly, and returns clean Markdown to the agent. No changes to the origin server required.

The post landed in developer circles and started a conversation that's still ongoing. It positioned the `Accept: text/markdown` header as the emerging standard for this class of request — which it probably will be, if the pattern takes hold.

Markdown for Agents sits alongside two other conventions in the AEO toolkit: `robots.txt` (access policy), `llms.txt` (site index for language models), and now content negotiation for on-demand clean content delivery. They solve different things. `robots.txt` says whether bots can visit. `llms.txt` gives them a map. Markdown for Agents gives them the content in a format that doesn't waste their attention.

Whether this becomes a formal web standard is an open question. The IETF hasn't standardized it. No major browser cares about it. But Cloudflare is one of the largest edge networks on the planet, and when they publish a "here's how agents should talk to web servers" post, the industry pays attention. I think this particular convention has legs — not because it's technically novel, but because it solves a real problem with minimal ceremony.

---

## How It Works

The pattern has two delivery paths:

**Content negotiation via `Accept` header:**
```
Agent → GET /about
        Accept: text/markdown
Server → 200 OK
         Content-Type: text/markdown; charset=utf-8
         Vary: Accept
         [Markdown content]
```

**Direct URL fallback:**
```
Agent → GET /about.md
Server → 200 OK
         Content-Type: text/markdown; charset=utf-8
         [Markdown content]
```

The header approach is cleaner — the agent uses the same URL it would use for HTML and announces its preference. The direct URL approach is simpler to implement and works even without middleware — it's just a static file at a predictable path.

Either way, what the agent receives is Markdown: the content without the chrome. A well-formatted Markdown response for a blog post looks like this:

```markdown
# Post Title

> Description text

Published: 2026-03-09
Language: en
Canonical: https://example.com/blog/post-slug

---

[post body as authored]
```

Title, metadata, body. That's it. No `<head>`, no navigation, no ads, no analytics pixels. For a 2,000-word post, this might be 8KB of Markdown versus 80KB of HTML with everything that comes along with a modern site.

The `Vary: Accept` response header is important — it tells CDN caches that the same URL can return different content depending on the `Accept` header, so a cache doesn't accidentally serve Markdown to a browser or HTML to an agent.

---

## A Working Implementation

Cloudflare took the HTML-to-Markdown conversion path. I went a different direction.

This site is built with Astro — every blog post is already a `.md` file. The Markdown source exists. It doesn't need to be computed from HTML; it just needs to be served. So instead of edge conversion, the build generates `.md` endpoint files alongside the HTML pages:

```
Source .md → [Astro build] → HTML page (browsers)
Source .md → [Astro build] → .md file (agents)
```

Two outputs from one source. No conversion artifacts, no guessing at what the Markdown should look like after stripping HTML tags. What the agent reads is what I wrote.

The result is 153 static `.md` endpoints generated on every build:

```
/blog/building-xergioalex-website.md       → EN blog post
/es/blog/building-xergioalex-website.md    → ES blog post
/about.md                                  → About page
/es/about.md                               → About in Spanish
/blog/index.md                             → EN blog index with .md links
/es/blog/index.md                          → ES blog index
```

Each file has a metadata header — title, description, author, canonical URL — followed by the body as written. Zero runtime processing. The `.md` files sit on Cloudflare's CDN like any other static asset.

### The Middleware

Content negotiation — the "return Markdown when asked" part — runs in a Cloudflare Pages middleware at `functions/_middleware.ts`. The path-resolution logic handles trailing slashes, index routes, and the various URL patterns:

```typescript
function resolveMarkdownPath(pathname: string): string {
  let clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (clean === '/') return '/index.md';
  if (clean.endsWith('/index')) return `${clean}.md`;
  return `${clean}.md`;
}
```

When a request arrives with `Accept: text/markdown`, the middleware checks that it's not an excluded path (`/api/`, `/internal/`, static assets), resolves the `.md` path, and fetches it via `context.env.ASSETS.fetch()` — a Cloudflare Pages API that accesses static assets without making an external HTTP request:

```typescript
async function tryServeMarkdown(context: EventContext): Promise<Response | null> {
  const accept = context.request.headers.get('accept') || '';
  if (!accept.includes('text/markdown')) return null;

  // ... exclusion checks ...

  const mdPath = resolveMarkdownPath(pathname);
  let assetResponse = await context.env.ASSETS.fetch(new Request(mdUrl.toString()));

  // Fallback: /path.md → /path/index.md
  if (!assetResponse.ok && !mdPath.endsWith('/index.md')) {
    const indexMdPath = `${mdPath.replace(/\.md$/, '')}/index.md`;
    assetResponse = await context.env.ASSETS.fetch(new Request(indexMdUrl.toString()));
  }

  if (!assetResponse.ok) return null;

  return new Response(assetResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept',
      'X-Content-Negotiation': 'markdown',
    },
  });
}
```

The fallback — trying `/path/index.md` if `/path.md` doesn't exist — was something I discovered the hard way. Routes like `/es/` and `/blog/` have `index.md` files, not `es.md` and `blog.md`. The first version of the middleware returned 404s for those. I caught it during testing, but it was one of those bugs that would have been embarrassing if it had shipped without the fallback: the index routes are arguably the most useful pages for an agent navigating the site.

The full middleware is 346 lines including the AI bot analytics layer — which handles a separate job (server-side tracking of known AI crawlers like GPTBot, ClaudeBot, PerplexityBot, and 10 others — agents don't run JavaScript, so client-side analytics miss them entirely).

You can test the whole thing with a single curl:

```bash
# Content negotiation
curl -H "Accept: text/markdown" https://xergioalex.com/about

# Direct .md URL — no headers needed
curl https://xergioalex.com/about.md
```

---

## Tracking Adoption

AI bots don't run JavaScript. That's the first complication with any agent-related analytics: standard page tracking is invisible to them. Server-side tracking is the only option that actually works.

Every markdown request — whether via content negotiation or direct URL — fires a `markdown_request` event to Umami from inside the middleware. The event captures:

| Field | Description |
|-------|-------------|
| `bot` | Known bot name (GPTBot, ClaudeBot, etc.) or `"unknown"` |
| `path` | The requested path |
| `source` | `content_negotiation` or `direct_url` |
| `user_agent` | First 200 characters of the User-Agent string |

The `source` field is the one I find most interesting. If agents start sending `Accept: text/markdown` headers — the "proper" way to request Markdown for Agents — I'd see `content_negotiation` events. If they're just bookmarking `.md` URLs they found somewhere, it shows up as `direct_url`. The ratio tells me something about how aware agents are of the convention.

Honestly, I don't know if any agent is reading these endpoints today. The events are live, the data is accumulating, but I haven't seen a clear pattern yet. The volume is low enough that individual bot visits are hard to separate from testing, link-checkers, and whatever crawls through on a Tuesday afternoon. What I can say is that the infrastructure is there.

The challenge with Markdown for Agents analytics is the same as with every other AEO metric right now: you're measuring inputs (is this optimized?), not outputs (is this getting cited?). There's no API that tells you "an AI system read your Markdown endpoint and used it in a response." You ship the infrastructure, you watch the logs, and you wait.

---

## Honest Reflection

Is anyone reading these endpoints today? Probably not systematically. No major AI system has publicly said it sends `Accept: text/markdown` headers or preferentially reads `.md` URLs. Cloudflare proposed the pattern in March 2025; it hasn't become a standard yet.

But that's also how these things start. `robots.txt` was informal before it was standard. `sitemap.xml` was a Google proposal before it was an industry convention. `llms.txt` has 844,000 adopters and Google's John Mueller saying it isn't used by any current AI system — both things are simultaneously true, and both things will probably remain true for a while.

The Markdown for Agents pattern costs almost nothing to maintain on a static site. The 153 `.md` files add maybe a few hundred kilobytes to the build output. The middleware runs on every request but adds zero overhead to HTML responses. And if the convention takes hold — if agents start sending `Accept: text/markdown` the way browsers send `Accept: text/html` — the infrastructure is already in place.

I think the bigger question isn't whether Markdown for Agents works today, but what happens if it becomes a web standard. If the W3C or IETF formalizes content negotiation for AI agents, sites without `.md` endpoints become second-class citizens in the agent web. Sites with them get clean delivery from day one. The cost of being early is negligible. The cost of being late, if this takes off, is a migration project.

I'm willing to make that bet.

Let's keep building.

---

## Resources

**Markdown for Agents**
- [Cloudflare: Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/) — the post that started the conversation
- [xergioalex.com/about.md](https://xergioalex.com/about.md) — example Markdown endpoint (direct URL)

**Standards**
- [HTTP Content Negotiation — RFC 7231](https://www.rfc-editor.org/rfc/rfc7231#section-5.3.2)
- [llms.txt Specification](https://llmstxt.org/)

**Implementation**
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
