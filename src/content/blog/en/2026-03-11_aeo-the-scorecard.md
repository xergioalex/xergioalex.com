---
title: "The Scorecard: How to Measure What AI Can't Tell You"
description: "AEO measurement is years behind AEO optimization. Here's what the industry has, what's still missing, and one audit framework that gives you something concrete to work with."
pubDate: "2026-03-11T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["AEO audit methodology checklist", "track AI bot traffic analytics", "Bing AI Performance report", "measure AI search citations", "AI referral traffic growing statistics"]
series: "aeo-journey"
seriesOrder: 3
---

The hardest part of AEO is measurement. Google Analytics can't see AI bots. They don't execute JavaScript. From a client-side analytics perspective, every AI crawler visit is completely invisible — a black hole where your best content goes and you have no idea what happens next.

I spent a fair amount of time trying to figure out what "working" even looks like for AEO. With traditional SEO you have rankings, CTR, impressions. With AEO you have... vibes. Someone tells you they found you on ChatGPT. You search your own name in Perplexity and sometimes you're there, sometimes you're not. The measurement ecosystem is years behind the optimization ecosystem, and that gap is frustrating for everyone — not just me.

This chapter is about closing that gap as much as currently possible, and honest about how much remains unsolved.

---

## Tracking AI Bot Traffic

The only place to catch AI crawlers is server-side, before the response goes out. Client-side analytics never sees them.

The approach that works: middleware that runs at the edge on every request, checks the `User-Agent` header against a list of known AI bot patterns, and fires analytics events when there's a match. Human visitors pass through with zero overhead. Full implementation details are in [Tracking the Invisible: How I Built AI Bot Analytics](/blog/tracking-invisible-ai-bot-analytics) — the short version is that Cloudflare Pages middleware handles this cleanly, using `context.waitUntil()` so the event fires without blocking the response.

The patterns to watch cover the main players: GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, OAI-SearchBot, plus a handful of others. Each match fires an `ai_bot_visit` event with the bot name, page path, and HTTP method.

What you get from this is imperfect but real: which bots are crawling, which pages they visit, how often. That's the baseline. Everything else in AEO measurement is built on top of this signal — or is missing it entirely.

For tracking when agents request Markdown content — via `Accept: text/markdown` headers or `.md` URLs directly — that's covered in [Markdown for Agents](/blog/aeo-markdown-for-agents), where the full tracking architecture lives alongside the implementation.

---

## The Measurement Landscape

**Bing Webmaster Tools launched an AI Performance report in February 2026 — the first official tool from any major platform showing how often your content gets cited in AI-generated answers. Google hasn't shipped an equivalent yet. Third-party tools exist but are volatile.**

This is the state of the industry: one useful native tool, a few third-party options, and a lot of manual guesswork.

Bing's AI Performance report is the most concrete thing available. You get total citations, which pages get referenced, and the "grounding queries" — the phrases the AI used when it retrieved your content. It covers Microsoft Copilot and Bing AI summaries specifically. Not a global picture, but actual data from an actual platform, which makes it more useful than most alternatives right now.

Google hasn't shipped anything comparable for AI Overviews. Google Search Console still lumps AI Mode clicks into the regular "Web" search type. Whether that's intentional opacity or it's just not ready, I couldn't say — but it's a significant gap given that Google generates the most AI Overviews. The platform with the biggest footprint gives you the least visibility.

For everything else, the options are: [Otterly.ai](https://otterly.ai) for cross-platform citation monitoring, [HubSpot's free AEO Grader](https://www.hubspot.com/aeo-grader) for a scored audit against AEO best practices, and manual testing — running your target queries through ChatGPT and Perplexity and checking if you appear.

Manual testing is more useful than it sounds, but with a major caveat. According to [AirOps research](https://www.airops.com/blog/how-to-test-content-visibility-in-perplexity-and-chatgpt), only 30% of brands stay visible from one AI answer to the next, and only 20% across five consecutive runs. Google AI Overviews change roughly 70% of their content for the same query between runs, with about half the citations swapped out. A snapshot check on Tuesday means nothing by Thursday.

This is the weakest part of the AEO ecosystem right now. We can optimize content. We can track crawlers. But measuring "how often does AI cite me?" with any statistical confidence is still basically unsolved. Server-side bot tracking is the best proxy available — you can at least confirm bots are coming and which pages they care about. What you can't confirm is whether those crawl visits are turning into citations.

---

## The Audit

**Running a structured AEO audit reveals what's actually missing — not what you assume is missing. The four dimensions that matter are Discoverability, Extractability, Trust, and Citability.**

There are no standardized AEO audit tools the way SEMrush or Lighthouse handle SEO and performance. You're building the checklist yourself, or borrowing one. The four-dimension framework I landed on covers the questions that actually matter:

| Dimension | What It Measures |
|-----------|-----------------|
| **Discoverability** | Can AI crawlers find and access the content? (robots.txt, llms.txt, crawl permissions) |
| **Extractability** | Can AI systems parse structured meaning? (schema markup, semantic HTML, heading hierarchy) |
| **Trust** | Does the content carry credibility signals? (author attribution, timestamps, cited sources) |
| **Citability** | Is the content structured to be quotable? (clear answers, direct language, factual density) |

Each dimension has its own checklist. I scored mine at 40/40 — not because it was already perfect, but because the deliberate AEO work documented across this series addressed each gap as I found it. What matters more than the final score is what the audit reveals in the process.

Three things surprised me when I went through this systematically.

**Freshness matters more than I expected.** According to [Ten Speed's research](https://www.tenspeed.io/blog/content-freshness-aeo-era), 76.4% of AI-cited pages were updated within the previous 30 days. AI systems prefer content that's [25.7% fresher](https://www.hillwebcreations.com/content-freshness/) than what traditional search surfaces. Adding visible "last updated" timestamps to posts led to [30% more Perplexity citations](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026) in one published study. Timestamps as a trust signal wasn't something I'd considered before. Now they're on every post.

**Bilingual content is a real multiplier.** Properly localized multilingual sites see [up to 327% more AI Overview visibility](https://koanthic.com/en/multilingual-seo-ai/) compared to single-language sites — and the emphasis is on "localized," not translated. AI systems assess each language independently. Machine translation without cultural adaptation doesn't qualify. This matters for anyone building a site that serves multiple languages: the work of actual translation pays off in AEO the same way it does in traditional search.

**Target queries need to be explicit.** The audit forced me to map content against real queries — 30 of them, across informational, comparison, and action-oriented categories. I'd been writing posts that answered questions nobody was actually asking. That's not an unusual problem. A lot of content is written from the author's perspective ("here's what I know") rather than from the reader's perspective ("here's what they're trying to find out"). AEO makes this gap visible because AI answers are pulled to specific queries — vague content doesn't get pulled.

The audit also surfaces maintenance requirements. AEO isn't a one-time setup. The freshness data alone tells you it needs to be a routine — updating llms.txt, validating schemas, running target queries, checking crawl stats. Monthly is probably the minimum.

---

## Where This Is Heading

**AI referral traffic grew 123% between September 2024 and February 2025. ChatGPT drives 87.4% of it. The infrastructure standards are still forming — the IETF AIPREF working group is drafting formal specs for AI content permissions. The sites that adapt now have a window.**

Only [37% of marketing teams](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) are actively optimizing for AI search. 70% recognize it matters. Only 20% have started. The brands implementing see [3.4x more visibility](https://blog.hubspot.com/marketing/answer-engine-optimization-trends) than late adopters. The first-mover advantage is real, and the window is still open — though it won't stay open indefinitely.

The standards are still being written. The [IETF AIPREF working group](https://www.ietf.org/blog/aipref-wg/), chartered in February 2025, is drafting formal specifications for how websites can express preferences about AI content use — separate categories for training, AI output, and search. That distinction matters. Right now, robots.txt is the best we have, and it was never designed for this problem. Crawl directives that predate large language models by fifteen years are carrying a lot of weight they weren't built to carry.

The traffic numbers aren't theoretical. AI referral traffic [grew 123%](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653) between September 2024 and February 2025. ChatGPT drives 87.4% of it. Vercel reported ChatGPT referrals [grew to 10% of new signups](https://aiseotracker.com/case-study/vercel). Tally.so saw ChatGPT become their number one referral source, period. Real companies, real numbers — not projections.

The measurement picture will improve. Bing's AI Performance report is a start. More platforms will follow — they have to, because the demand from publishers to understand citation behavior is only going to grow. The AIPREF specs will eventually give us cleaner permission frameworks. And as Markdown for Agents [becomes more common](/blog/aeo-markdown-for-agents), we'll have better signals about how agents are actually consuming content, not just crawling it.

I don't know exactly how much of any given site's traffic comes from AI citations right now — that measurement problem is real and I've been honest about it throughout this chapter. But the bots are coming. The pages they care about are visible. And the infrastructure to serve them well exists today.

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
