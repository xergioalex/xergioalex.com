---
title: "The Scorecard: Auditing AEO, Reading the Data, and What's Next"
description: "The hardest part of AEO is knowing if it works. Here's how I track AI bot traffic, audit AEO health, and what the future of AI search looks like."
pubDate: "2026-03-11T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["AEO audit methodology checklist", "track AI bot traffic analytics", "Bing AI Performance report", "measure AI search citations", "AI referral traffic growing statistics"]
series: "aeo-journey"
seriesOrder: 3
---

The hardest part of AEO is measurement. Google Analytics can't see AI bots. They don't execute JavaScript. From a client-side analytics perspective, every AI crawler visit is completely invisible — a black hole where your best content goes and you have no idea what happens next.

I spent a fair amount of time trying to figure out what "working" even looks like for AEO. With traditional SEO you have rankings, CTR, impressions. With AEO you have... vibes. Someone tells you they found you on ChatGPT. You search your own name in Perplexity and sometimes you're there, sometimes you're not. The measurement ecosystem is years behind the optimization ecosystem, and that gap is frustrating.

This chapter is about what I built to close that gap — and honest about how far there still is to go.

---

## Tracking AI Bot Traffic

**Short answer: server-side middleware that checks every request's User-Agent against a list of 13 known AI crawlers, fires analytics events to Umami, and adds zero JavaScript overhead. The full technical implementation is in [Tracking the Invisible: How I Built AI Bot Analytics](/blog/tracking-invisible-ai-bot-analytics).**

AI crawlers don't run JavaScript. They request your page, get the HTML, and leave. Umami, Plausible, GA4 — none of them ever see it. The only place where you can catch these bots is server-side, before the response goes out.

The solution I built lives in `functions/_middleware.ts` — a Cloudflare Pages middleware that runs at the edge on every request. The logic is dead simple: check the `User-Agent` header, match against 13 known AI bot patterns, fire a non-blocking event to Umami if there's a match. Human visitors pass through with zero overhead.

The bot detection array covers the patterns that matter:

```typescript
const AI_BOT_PATTERNS: ReadonlyArray<{ pattern: RegExp; name: string }> = [
  { pattern: /GPTBot/i, name: 'GPTBot' },
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User' },
  { pattern: /ClaudeBot/i, name: 'ClaudeBot' },
  { pattern: /anthropic-ai/i, name: 'anthropic-ai' },
  { pattern: /Google-Extended/i, name: 'Google-Extended' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot' },
  { pattern: /OAI-SearchBot/i, name: 'OAI-SearchBot' },
  // ... plus Bytespider, CCBot, Applebot-Extended, Amazonbot,
  //     Meta-ExternalAgent, cohere-ai
];
```

Each match fires an `ai_bot_visit` event to Umami with the bot name, page path, and HTTP method. The call is wrapped in `context.waitUntil()` — fire-and-forget, doesn't block the response. Now I can see which bots are crawling, which pages they visit, and how often. That's step one.

---

## Tracking Markdown Requests

**The middleware also tracks when agents request Markdown content — either via `Accept: text/markdown` headers or by visiting `.md` URLs directly. A `markdown_request` event fires with a `source` field that reveals how the agent found the endpoint.**

This is newer. Chapter 2 of this series covered the Markdown for Agents implementation — serving clean `.md` files directly from static assets, with content negotiation support so agents that send `Accept: text/markdown` get Markdown instead of HTML. The question that came after building it: is anyone actually using it?

The tracking function in the middleware — `trackMarkdownRequest` — fires whenever a `.md` response goes out. It records two fields that matter:

- **`source`**: either `content_negotiation` (the agent sent `Accept: text/markdown`) or `direct_url` (the agent navigated directly to a `.md` URL like `/about.md`)
- **`bot`**: the detected bot name, or `"unknown"` for anything unrecognized

The distinction between the two sources is interesting — if I start seeing lots of `content_negotiation` requests, it means agents are actively using the HTTP standard. If I see mostly `direct_url`, it means they've bookmarked or discovered the `.md` paths from the index. Both are valid patterns. They just tell different stories about how agents consume content.

Honestly? I don't have enough data yet to draw conclusions. The tracking just went live alongside the Markdown for Agents feature. I'm watching the Umami Events tab for `markdown_request` events, and so far the numbers are small — a handful of requests that may or may not be real agents. Give it a few months.

What I do expect to see eventually: ClaudeBot and GPTBot using `content_negotiation` (OpenAI and Anthropic have both invested in that standard), while scraper-style agents use `direct_url` after discovering the `/blog/index.md` link list. That's a hypothesis. We'll see if it holds.

---

## The Measurement Landscape

**Bing Webmaster Tools launched an AI Performance report in February 2026 — the first official tool showing how often your content gets cited in AI-generated answers. Google hasn't shipped an equivalent yet. Third-party tools exist but are volatile. Citation visibility changes dramatically between runs.**

Bing's AI Performance report (launched February 2026) is the first tooling from any major platform that shows how often your content gets cited in AI answers — specifically in Microsoft Copilot and Bing AI summaries. You get total citations, which pages get referenced, and the "grounding queries" — the phrases the AI used when it retrieved your content. It's not perfect, but it's real data from a real platform, which puts it ahead of almost everything else available right now.

Google hasn't shipped anything comparable for AI Overviews. Google Search Console still lumps AI Mode clicks into the regular "Web" search type. Whether that's an oversight or intentional opacity, I couldn't say — but it's annoying. The platform generating the most AI Overviews gives you the least visibility into citation behavior.

For everything Google doesn't cover, the options are third-party tools. [Otterly.ai](https://otterly.ai) monitors citation visibility across multiple AI platforms. [HubSpot's free AEO Grader](https://www.hubspot.com/aeo-grader) runs a basic audit and scores your site against AEO best practices. And then there's manual testing — asking ChatGPT and Perplexity your target queries and checking if you show up.

Manual testing is more useful than it sounds, but it comes with a major caveat. According to [AirOps research](https://www.airops.com/blog/how-to-test-content-visibility-in-perplexity-and-chatgpt), only 30% of brands stay visible from one AI answer to the next, and only 20% across five consecutive runs. Google AI Overviews change roughly 70% of their content for the same query between runs, with about half the citations swapped out. AI citations are volatile. A snapshot check on Tuesday means nothing by Thursday.

This is the weakest part of the AEO ecosystem right now. We can optimize content. We can track crawlers. But measuring "how often does AI cite me?" with any statistical confidence is still basically unsolved. I think that changes over the next year as more tools like Bing's report come online. For now, server-side bot tracking is the best proxy we have — you can at least confirm the bots are coming and which pages they care about.

---

## The Audit

**I ran a full AEO audit across four dimensions: Discoverability, Extractability, Trust, and Citability. Total score: 40/40. Here's what the audit revealed and what moved the needle most.**

I didn't start this process thinking I'd end up at a perfect score. The site had good bones — static HTML, Astro's zero-JavaScript-by-default approach, semantic markup — but I expected to find meaningful gaps. The deliberate AEO work was what pushed it over:

| Dimension | Grade | What It Measures |
|-----------|-------|-----------------|
| **Discoverability** | 10/10 | Can AI crawlers find and access the content? |
| **Extractability** | 10/10 | Can AI systems parse structured meaning from the content? |
| **Trust** | 10/10 | Does the content carry credibility signals for AI to evaluate? |
| **Citability** | 10/10 | Is the content structured in a way that makes it easy to cite? |

Three things surprised me when I went through this systematically.

**Freshness matters more than I expected.** According to [Ten Speed's research](https://www.tenspeed.io/blog/content-freshness-aeo-era), 76.4% of AI-cited pages were updated within the previous 30 days. AI systems prefer content that's [25.7% fresher](https://www.hillwebcreations.com/content-freshness/) than what traditional search surfaces. Adding visible "last updated" timestamps to posts led to [30% more Perplexity citations](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026) in one published study. I hadn't thought about timestamps as a trust signal before. Now they're on every post.

**Bilingual content is a real multiplier.** The site runs in English and Spanish — 59 blog posts in each language, every page with both versions. Properly localized multilingual sites see [up to 327% more AI Overview visibility](https://koanthic.com/en/multilingual-seo-ai/) compared to single-language sites. The emphasis is on "localized" — not translated. AI systems assess each language independently. Machine translation without cultural adaptation doesn't cut it. The Spanish posts here are written, not generated.

**Target queries need to be explicit.** I mapped 30 queries across three funnel stages — informational, comparison, action-oriented. All 30 have matching content. Not because a consultant told me to, but because I realized I'd been writing posts that answered questions nobody was actually asking. Having a list of 30 real queries and mapping them to real posts changed what I wrote next.

I also built a monthly maintenance checklist: update llms.txt, validate schemas, run five target queries against AI platforms, check crawl stats. AEO isn't a one-time setup. The freshness data alone tells you it needs to be a routine.

---

## Where This Is Heading

**AI referral traffic grew 123% between September 2024 and February 2025. ChatGPT drives 87.4% of it. The infrastructure standards are still forming — the IETF AIPREF working group is drafting formal specs for AI content permissions. The sites that adapt now have a window.**

Only [37% of marketing teams](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) are actively optimizing for AI search. 70% recognize it matters. Only 20% have started. The brands that are implementing see [3.4x more visibility](https://blog.hubspot.com/marketing/answer-engine-optimization-trends) than late adopters. The first-mover advantage is real, and the window is still open.

The standards are still being written. The [IETF AIPREF working group](https://www.ietf.org/blog/aipref-wg/), chartered in February 2025, is drafting formal specifications for how websites can express preferences about AI content use — separate categories for training, AI output, and search. That's going to matter. Right now, robots.txt is the best we have, and it was never designed for this problem. Crawl directives that predate large language models by fifteen years are doing a lot of work they weren't meant for.

The traffic numbers aren't theoretical. AI referral traffic [grew 123%](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653) between September 2024 and February 2025. ChatGPT drives 87.4% of it. Vercel reported that ChatGPT referrals [grew to 10% of their new signups](https://aiseotracker.com/case-study/vercel). Tally.so saw ChatGPT become their number one referral source, period. These are real companies reporting real numbers — not projections.

The Markdown endpoints I built are a concrete bet in that direction. Today, most crawlers read HTML. The autonomous agents emerging now — the ones that buy, compare, research, and act — need clean, structured, efficient content. They're not just reading pages; they're consuming content as inputs to reasoning chains. Serving them raw HTML with navigation, ads, cookie banners, and comment sections is like serving a JSON API wrapped in a full HTML page. The Markdown endpoints strip all of that out.

Sites that already speak that language will have an advantage. Sites still serving only HTML will be like sites without a mobile version in 2015 — they work, but with increasing friction.

I don't know exactly how much of this site's traffic comes from AI citations right now. That measurement problem is real and I've been honest about it throughout this chapter. But I can see the bots coming. I can see which pages they hit. The Bing AI Performance report shows citations. And now, if an agent wants to read this entire post without parsing HTML, it can — directly, in Markdown, exactly as I wrote it.

The ground is moving under search. Traditional SEO still matters — it's the foundation everything else is built on. But the next layer is here, and it's not a trend to watch anymore.

Let's keep building.

---

## Resources

**Measurement Tools**
- [Bing AI Performance in Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) — Citation tracking in Microsoft Copilot and Bing AI
- [Otterly.ai](https://otterly.ai) — AI citation monitoring across platforms
- [HubSpot AEO Grader](https://www.hubspot.com/aeo-grader) — Free AEO audit scoring tool

**Research & Data**
- [AirOps: AI Citation Volatility](https://www.airops.com/blog/how-to-test-content-visibility-in-perplexity-and-chatgpt) — 30% stay visible across runs; 70% of citations swap between runs
- [Ten Speed: Content Freshness and AEO](https://www.tenspeed.io/blog/content-freshness-aeo-era) — 76.4% of cited pages updated within 30 days
- [Koanthic: Multilingual AI Overview Visibility](https://koanthic.com/en/multilingual-seo-ai/) — 327% uplift for localized multilingual sites
- [Search Engine Land: AI Referral Traffic](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653) — 123% growth September 2024–February 2025
- [HubSpot: AEO Adoption Trends](https://blog.hubspot.com/marketing/answer-engine-optimization-trends) — 3.4x visibility for early adopters
- [Vercel Case Study](https://aiseotracker.com/case-study/vercel) — ChatGPT grows to 10% of new signups

**Standards**
- [IETF AIPREF Working Group](https://www.ietf.org/blog/aipref-wg/) — Formal AI content permission specifications in progress
- [Cloudflare: Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/) — Content negotiation at the edge
