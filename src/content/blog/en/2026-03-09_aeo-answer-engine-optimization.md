---
title: "Optimizing for Answers, Not Just Rankings: What I Built for the Age of AI Search"
description: "SEO got me ranked. AEO got me cited. A three-part deep dive into building for the age of AI search — from theory to implementation to measurement."
pubDate: "2026-03-09T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["answer engine optimization AEO guide", "optimize website for AI search engines", "llms.txt structured data AEO", "how AI search engines cite sources", "AEO vs SEO practical guide", "structured data JSON-LD for AI visibility", "markdown for AI agents endpoints", "track AI bot traffic server-side analytics"]
series: "aeo-journey"
seriesOrder: 0
---

I had good SEO scores. Lighthouse 100 across the board. Pages indexed, canonical URLs validated, structured data passing every test Google threw at it. By every traditional metric, the site was doing fine.

Then I started asking AI about topics I'd written about. I tried ChatGPT. I tried Perplexity. I asked questions I'd answered in actual blog posts — with code, with real examples, with months of implementation behind them.

My site didn't come up. Not once.

That was the gap. Not in the ranking — in the answering. I was optimized for search engines. I was invisible to answer engines.

---

## The Big Picture

The shift has been building for years, but it's now undeniable. [Gartner predicted](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents) in February 2024 that traditional search volume would drop 25% by 2026. With publisher referrals from Google [down 38%](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/) and AI Overviews now appearing in [roughly 48% of US search queries](https://www.demandsage.com/ai-overviews-statistics/), those numbers aren't projection anymore — they're tracking.

When AI Overviews show up, [83% of those searches end without a click](https://www.demandsage.com/ai-overviews-statistics/). The user gets the answer. The ranked list below it — the list we spent years optimizing for — goes untouched.

And Google isn't the only front to defend. ChatGPT hit 900 million weekly active users in February 2026. Perplexity is processing 35 to 45 million queries a day. These aren't experiments anymore. The question changed from "how do I rank?" to "how do I get cited?" — and most sites are still answering the old question.

---

## What Is AEO

Answer Engine Optimization is the practice of making your content visible to AI systems that generate answers, and getting cited as a source in those answers.

It's not a replacement for SEO — it's the next layer. AI systems heavily favor content from domains that already rank well in traditional search. [86% of Google AI Overview citations](https://ahrefs.com/blog/search-rankings-ai-citations/) come from pages ranking in the top 100. Strong SEO feeds AEO. But SEO alone no longer closes the loop.

The shortest version I have for how they differ:

| | Traditional SEO | AEO |
|---|---|---|
| **Goal** | Rank on the results page | Get cited in the AI answer |
| **Format** | Long-form pages | Structured, extractable answer blocks |
| **Focus** | Keywords and backlinks | Entities, questions, conversational queries |
| **Metrics** | Rankings, click-through rate | Citation frequency, brand mentions, sentiment |

There's even a next layer forming. Search Engine Land has started writing about AAO — Assistive Agent Optimization — preparing content for AI agents that don't just answer questions but act on behalf of users. We're not there yet for most sites. The direction is clear though: SEO → AEO → AAO. The work you do now for AEO compounds into the agent era.

[Chapter 1](/blog/aeo-the-shift) goes deep on the landscape — how the answer engines actually work, who's crawling your site, and why the SEO foundation still matters.

---

## What I Built

Allowing crawlers in robots.txt is the bare minimum. The real work is making content machine-readable in ways that help AI systems understand, extract, and cite it. I built three things.

**llms.txt** — a Markdown file at `/llms.txt` that gives language models a curated summary of the site: what it covers, how it's organized, where to find things. Google's John Mueller said in June 2025 that no AI system currently uses it. I built one anyway. The cost is a few lines of Markdown. The upside — if any model starts reading it — is a clean index of the entire site in a single request. I think of it like `sitemap.xml` for the AI era.

**Structured data** — 9 JSON-LD schema types across all pages. The most important is the `Person` schema that ships on every page, encoding E-E-A-T signals that AI systems can actually parse: institutional credentials, professional context, identity verification across four social profiles, topic authority. Beyond Person, the site includes BlogPosting (with wordCount, timeRequired, dateModified), BreadcrumbList, Organization, WebSite, CollectionPage, ContactPage, and ProfilePage. Pages with schema markup have [2.8x higher AI citation rates](https://www.airops.com/blog/schema-markup-aeo).

**Markdown for Agents** — 153 static `.md` endpoints generated on every build. Every page and every blog post has a `.md` version that serves clean Markdown directly. No HTML parsing, no navigation noise, no Tailwind classes to discard. When an AI agent wants to read a post, it can consume the original Markdown exactly as I wrote it — with a metadata header prepended. The architecture is simple: the same source Markdown that generates HTML also generates the `.md` file. Zero performance impact.

[Chapter 2](/blog/aeo-the-toolkit) covers the full implementation — the llms.txt structure, the complete JSON-LD Person schema, and how the Markdown endpoints work technically.

---

## What I Learned

I ran a full AEO audit across four dimensions: Discoverability, Extractability, Trust, and Citability. The site scored 40/40 — which honestly surprised me. The Astro zero-JavaScript-by-default approach meant every page was already clean, fast, and fully crawlable. The deliberate AEO work pushed it over the edge.

A few things that stood out:

**Freshness matters more than I expected.** According to [Ten Speed's research](https://www.tenspeed.io/blog/content-freshness-aeo-era), 76.4% of AI-cited pages were updated within the previous 30 days. Adding visible "last updated" timestamps led to [30% more Perplexity citations](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026) in one study. AI systems weight recency differently than traditional search.

**Bilingual content is a multiplier.** This site runs in English and Spanish — properly localized, not translated by a machine. Multilingual sites see [up to 327% more AI Overview visibility](https://koanthic.com/en/multilingual-seo-ai/) compared to single-language sites. AI systems assess each language version independently. Machine translation without cultural adaptation doesn't count.

**Measurement is still the hardest part.** Google Analytics can't see AI bots — they don't execute JavaScript. I built server-side middleware in Cloudflare Pages that inspects every request, matches against 13 known AI crawlers, and fires analytics events to Umami with zero performance overhead. It's the best proxy available right now. Bing's [AI Performance report](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) is the first tool from any major platform that shows actual citation counts. There's still no equivalent from Google.

I also mapped 30 target queries across three funnel stages and built a monthly maintenance checklist. AEO isn't a one-time setup.

[Chapter 3](/blog/aeo-the-scorecard) covers the full audit methodology, the bot tracking implementation, and what the measurement ecosystem looks like today.

---

## The Series

This pillar post is the entry point. The three chapters go deep on each dimension of the work:

- **[The Shift: Why Rankings No Longer Mean Visibility](/blog/aeo-the-shift)** — The landscape change, how answer engines work, and why the SEO foundation still matters as a starting point
- **[The Toolkit: llms.txt, Structured Data, and Markdown for Agents](/blog/aeo-the-toolkit)** — The full technical implementation, including schema examples and the Markdown endpoint architecture
- **[The Scorecard: Auditing AEO, Reading the Data, and What's Next](/blog/aeo-the-scorecard)** — Measurement, the bot tracking setup, audit methodology, and where this is all heading

Only [37% of marketing teams](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) are actively doing AEO work right now. Most know it matters. Most haven't started. The bar is low — and the first-mover advantage is real.

Let's keep building.

---

## Resources

**Standards & Specifications**
- [llms.txt Official Specification](https://llmstxt.org/)
- [Schema.org](https://schema.org/)
- [Google: Succeeding in AI Search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)
- [Cloudflare: Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/)
- [IETF AIPREF Working Group](https://www.ietf.org/blog/aipref-wg/)

**Tools**
- [Bing Webmaster Tools AI Performance Report](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- [HubSpot AEO Grader (Free)](https://www.hubspot.com/aeo-grader)

**Research & Guides**
- [Princeton GEO Paper — Generative Engine Optimization (KDD 2024)](https://arxiv.org/abs/2311.09735)
- [Gartner: Search Volume Decline Prediction](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents)
- [SEMrush: Answer Engine Optimization](https://www.semrush.com/blog/answer-engine-optimization/)
- [Ahrefs: Answer Engine Optimization](https://ahrefs.com/blog/answer-engine-optimization/)
