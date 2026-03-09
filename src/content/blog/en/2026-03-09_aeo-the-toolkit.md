---
title: "The Toolkit: llms.txt, Structured Data, and Markdown for Agents"
description: "Allowing crawlers in is the bare minimum. Here's everything I built to make a static site machine-readable — from JSON-LD schemas to native Markdown endpoints."
pubDate: "2026-03-09T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["llms.txt specification implementation", "structured data JSON-LD AEO", "markdown for agents endpoints", "content negotiation Accept text/markdown", "E-E-A-T structured data schema"]
series: "aeo-journey"
seriesOrder: 2
---

Allowing crawlers in is the bare minimum.

Getting on the allowlist in `robots.txt` means AI bots can visit. But showing up and being understood are different things. A crawler that lands on a page full of Tailwind classes, SVG icons, and navigation markup has to dig through a lot of noise to find the actual content. And if there's no structured metadata to tell it who wrote this, when, and what it means — it's doing its best with incomplete information.

The real work is making content machine-readable in ways that help AI systems extract, understand, and cite it. That means three things: a menu (`llms.txt`), a vocabulary (structured data), and a direct channel (Markdown endpoints).

---

## llms.txt — A Menu for Language Models

**A short answer:** `llms.txt` is a Markdown file at `/llms.txt` that gives language models a curated summary of your site — what it covers, how it's organized, and where to find things. It's about 10-30 lines and takes a few minutes to write.

The [llms.txt specification](https://llmstxt.org/) was proposed by Jeremy Howard in September 2024. The premise is simple: instead of making a language model crawl your entire site to understand what's there, you hand it a structured index. [Semrush reports](https://www.semrush.com/blog/llms-txt/) roughly 844,000 sites have one — about 10% of surveyed domains. The early adopters are mostly developer-facing companies: Anthropic, Cloudflare, Vercel, Supabase.

Google's John Mueller said in June 2025 that "no AI system currently uses llms.txt." I built one anyway.

The cost is a few lines of Markdown. If any model ever starts reading it — and I think some eventually will — the information is already there. I think of it like `sitemap.xml` for the AI era: not glamorous, not guaranteed to do anything right now, but cheap enough to maintain and potentially valuable enough to keep.

Here's what this site's looks like:

```markdown
# XergioAleX.com

> Personal website and technical blog by Sergio Alexander Florez Galeano
> (XergioAleX): CTO & Co-founder at DailyBot (Y Combinator S21).

## Core Sections
- Home: /
- Blog: /blog/
- About: /about/
- Portfolio: /portfolio/
...

## Blog Tags
- tech — Software development tutorials and technical articles
- ai — Artificial intelligence and machine learning content
...

## Blog Series
- Building XergioAleX.com (8 chapters)
- Trading Journey (3 chapters)

## Crawling Guidance
- All public content is intended for indexing by search engines and LLM systems.
- Structured data (JSON-LD) is embedded on all pages for machine consumption.

## Detailed Version
For comprehensive content descriptions, see: /llms-full.txt
```

There's also a `llms-full.txt` — 130 lines with detailed page descriptions, topic areas, and the full tech stack. Is it being used today? Probably not by any major model. But it costs me nothing to maintain.

---

## Structured Data — Teaching Machines Who I Am

**A short answer:** JSON-LD structured data tells AI systems not just what's on a page, but what it means — who wrote it, when, what type it is, and how it relates to other content. Pages with schema markup have [2.8x higher AI citation rates](https://www.airops.com/blog/schema-markup-aeo).

This is where AEO gets concrete and, honestly, a little tedious.

Structured data is E-E-A-T — Experience, Expertise, Authoritativeness, Trustworthiness — encoded in a format machines can parse directly. Google's [Quality Rater Guidelines](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) describe what human evaluators look for when assessing content quality. Structured data is how you communicate the same signals to the algorithm.

The most important schema on this site is the `Person` type, which ships on every single page:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sergio Alexander Florez Galeano",
  "alternateName": "XergioAleX",
  "url": "https://xergioalex.com",
  "image": "https://xergioalex.com/images/profile.png",
  "description": "CTO & Cofounder of DailyBot (Y Combinator S21). Computer Science Engineer, MSc in Data Science, with 14+ years building digital products.",
  "jobTitle": "CTO & Co-founder",
  "worksFor": {
    "@type": "Organization",
    "name": "DailyBot",
    "url": "https://dailybot.com"
  },
  "alumniOf": [
    { "@type": "Organization", "name": "Y Combinator" },
    { "@type": "CollegeOrUniversity", "name": "Universidad Tecnológica de Pereira" }
  ],
  "knowsAbout": [
    "Software Engineering", "Artificial Intelligence", "Web Development",
    "DevOps", "Blockchain", "Algorithmic Trading", "Startup Building"
  ],
  "sameAs": [
    "https://github.com/xergioalex",
    "https://www.linkedin.com/in/xergioalex/",
    "https://x.com/XergioAleX",
    "https://www.instagram.com/xergioalex"
  ]
}
```

Every field serves a purpose. `alumniOf` with Y Combinator — institutional credibility. `worksFor` — current professional context. `sameAs` with four social profiles — identity verification across platforms. `knowsAbout` — topic authority signals. None of this is decorative. Each field is something an AI system can use when deciding whether to cite this site as a source.

In March 2025, [Google, Microsoft, and OpenAI all confirmed](https://www.stackmatix.com/blog/structured-data-ai-search) they use structured data in their generative AI features. A [BrightEdge study](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353) found a 44% increase in AI search citations for sites with structured data and FAQ blocks.

Beyond the `Person` schema, this site has 9 JSON-LD types in total: `BlogPosting` (with `wordCount`, `timeRequired`, `dateModified`, and nested author data), `BreadcrumbList` on every page, `Organization` for DailyBot, `WebSite`, `CollectionPage`, `ContactPage`, and `ProfilePage`.

I spent more time on structured data than on any other piece of this project. It's not exciting work — writing JSON schemas, validating them in Google's Rich Results Test, making sure each page has the right types. I spent an afternoon on the `BlogPosting` schema alone, cross-referencing the schema.org spec to check which properties were actually used by AI systems versus which ones were just technically valid but ignored. Most of the first draft was wrong in small ways that required going back through documentation I'd already read.

But it's the one optimization that directly communicates meaning to machines — not just content, but context. Who wrote this, why they're qualified to write it, when it was last updated. That's the layer that matters.

---

## Markdown for Agents — Speaking the Machines' Language

**A short answer:** Every page and blog post on this site has a `.md` endpoint serving the original Markdown source. When AI agents request `/about`, they can get clean Markdown instead of HTML — either by visiting `/about.md` directly or by sending an `Accept: text/markdown` header. That's 153 static files generated on every build.

There's a problem with HTML that I didn't fully appreciate until I thought about it from the other side.

A crawler that lands on a page reads navigation bars, footers, theme-switching scripts, Tailwind classes, SVG icons, and JSON-LD schemas — all before it finds the article content. These models are good at extracting signal from noise. But tokens spent on `<nav>` markup and `class="text-gray-600 dark:text-gray-300"` attributes are tokens not spent on understanding the actual content.

In March 2025, [Cloudflare published "Markdown for Agents"](https://blog.cloudflare.com/markdown-for-agents/) — a proposal for edge-based HTML-to-Markdown conversion. When an agent sends `Accept: text/markdown`, Cloudflare's solution converts the HTML on the fly.

I liked the concept but didn't want to depend on an edge computing layer for something I didn't need to compute. This site's content already exists as Markdown — every blog post is a `.md` file. The source is already clean. It just needs to be served directly.

The architecture is deliberately simple:

```
Source .md  →  [Astro build]  →  HTML page (humans)
Source .md  →  [Astro build]  →  .md file (agents)
```

Both outputs come from the same source. No HTML-to-Markdown conversion in the path. No conversion artifacts. What the agent reads is exactly what I wrote.

The result: 153 static `.md` endpoints generated on every build. Blog posts, pages, and an index:

```
/blog/building-xergioalex-website.md     → Post Markdown
/about.md                                → About page Markdown
/es/blog/aeo-answer-engine-optimization.md → This very post, in Markdown
/es/about.md                              → About in Spanish
```

Each file has a metadata header — title, description, author, date, canonical URL — followed by the body as I wrote it. Zero performance impact on the HTML pages. The `.md` files are separate static assets served from the CDN.

### Content Negotiation

The part that took a bit more thought was content negotiation. Visiting `/about.md` directly works, but it requires knowing the URL convention. The more elegant approach: a request to `/about` with an `Accept: text/markdown` header should return Markdown automatically — no URL change needed.

That's handled by a Cloudflare Pages middleware in `functions/_middleware.ts`. When a request includes `Accept: text/markdown`, the middleware:

1. Checks the `Accept` header
2. Resolves the `.md` asset path (`/about` → `/about.md`)
3. Fetches the static file via `context.env.ASSETS.fetch()`
4. Returns it with the right headers: `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, and `X-Content-Negotiation: markdown`

An agent using this approach doesn't need to know the `.md` URL convention. It requests the page normally — same URL it would use for HTML — and gets clean Markdown back if it announces that preference.

```bash
# Get Markdown via content negotiation
curl -H "Accept: text/markdown" https://xergioalex.com/about

# Direct .md URL also works
curl https://xergioalex.com/about.md
```

The middleware excludes `/api/*`, `/internal/*`, and any path with an existing file extension — so only actual page and post requests go through the negotiation logic.

### Tracking Markdown Requests

Every markdown request fires a `markdown_request` event to Umami. The middleware distinguishes two sources:

| Source | Trigger |
|--------|---------|
| `content_negotiation` | Agent sends `Accept: text/markdown` header |
| `direct_url` | Agent navigates directly to a `.md` URL |

Each event captures the bot name (matched against the same 13-bot list used for AI crawler tracking), the requested path, the source, and the User-Agent string. This lets me see which agents — ClaudeBot, GPTBot, PerplexityBot, or unknown crawlers — are consuming Markdown content, and whether they're using the header-based approach or bookmarking the direct URLs.

I don't know if any agent is reading these endpoints today. The analytics are live, but I haven't seen a clear signal yet — agents don't always identify themselves, and the volume is still low enough that it's hard to separate signal from noise. What I can say is that the infrastructure is there and the cost of building it was a day of work.

I think of it like the `llms.txt` decision, multiplied. The `llms.txt` is a summary. The `.md` endpoints are the full content. If an agent wants to read an entire post, it consumes it directly without parsing HTML. If it wants to index everything, there's a `/blog/index.md` with links to every individual `.md` file.

Cloudflare took the edge-conversion path. I took the source-first path. Both reach the same result. Mine has one advantage: perfect fidelity. No conversion, no artifacts, no guessing at what the Markdown should look like. It's the original.

---

## What's Next

The toolkit is built. The structured data is in place, the crawlers are allowed, the content is machine-readable. But there's a question I kept running into while building all of this: how do you actually know if it's working?

You can optimize content. You can serve clean Markdown. You can't easily see "how often does AI cite me?" the way you can see "what's my organic CTR?" The measurement problem is the hardest part of AEO right now — and it's what the next chapter covers.

Let's keep building.

---

## Resources

**Standards & Specifications**
- [llms.txt Official Specification](https://llmstxt.org/)
- [Schema.org](https://schema.org/)
- [Cloudflare: Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/)
- [Google: Structured Data Introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google: AI Features and Your Website](https://developers.google.com/search/docs/appearance/ai-features)

**Research**
- [AirOps: Schema Markup and AI Citation Rates](https://www.airops.com/blog/schema-markup-aeo)
- [BrightEdge: Schema and AI Overview Visibility](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353)
- [SEMrush: llms.txt Adoption Report](https://www.semrush.com/blog/llms-txt/)
- [Stackmatix: Structured Data in AI Search (Google, Microsoft, OpenAI)](https://www.stackmatix.com/blog/structured-data-ai-search)

**Tools**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
