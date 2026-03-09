---
title: "The Shift: Why Rankings No Longer Mean Visibility"
description: "I had perfect SEO scores. AI couldn't find me. Here's what changed — and why the question moved from 'how do I rank?' to 'how do I get cited?'"
pubDate: "2026-03-09T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["answer engine optimization AEO guide", "what is AEO vs SEO", "how AI search engines work", "Google AI Overviews optimization", "ChatGPT Perplexity content citation"]
series: "aeo-journey"
seriesOrder: 1
---

I had good SEO scores. Lighthouse 100 across the board. Pages indexed, canonical URLs validated, structured data passing every test Google threw at it. By every traditional metric, the site was doing fine.

Then I started asking AI about topics I'd written about. I tried ChatGPT. I tried Perplexity. I asked questions I'd answered in actual blog posts — with code, with real examples, with months of implementation behind them.

My site didn't come up. Not once.

That was the gap. Not in the ranking — in the answering. I was optimized for search engines. I was invisible to answer engines.

---

## The Shift

**The short version: for over two decades, search worked the same way — get your link higher on the list. That model is breaking. Traditional search volume is declining, AI answer engines are absorbing millions of queries per day, and most of those interactions never produce a click.**

For over two decades, search worked roughly the same way. You typed something, you got a list of links, you clicked one. The game was: get your link higher on that list. SEO was built around this. Keywords, backlinks, meta tags, page speed, mobile-friendly design — all in service of moving up the list.

That model is breaking.

[Gartner predicted](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents) in February 2024 that traditional search volume would drop 25% by 2026. At the time, that sounded aggressive. Now, with US desktop searches per user [down roughly 20% year over year](https://searchengineland.com/google-searches-per-us-user-fall-report-468051) and publisher referrals from Google [down 38%](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/), it's tracking close.

The shift didn't happen overnight. Google's Knowledge Graph started answering queries directly back in 2012. Featured Snippets came in 2014. But the real break happened in May 2023, when Google launched the Search Generative Experience — later renamed to AI Overviews.

As of early 2026, AI Overviews appear in [roughly 48% of US search queries](https://www.demandsage.com/ai-overviews-statistics/). When they show up, [83% of those searches end without a click](https://www.demandsage.com/ai-overviews-statistics/). The user gets the answer. The list of links below — the list we spent years optimizing for — doesn't get touched.

And Google isn't alone. ChatGPT hit [900 million weekly active users](https://almcorp.com/blog/chatgpt-900-million-weekly-active-users/) in February 2026. Perplexity is processing [35 to 45 million queries a day](https://www.demandsage.com/perplexity-ai-statistics/). According to McKinsey, [44% of AI search users](https://magnawiz.com/answer-engine-optimization-aeo-why-seo-alone-isnt-enough-in-2025-2026/) now turn to AI as their main source of insight — more than traditional search.

This is not the death of SEO. It's the evolution. The question changed from "how do I rank?" to "how do I get cited?"

---

## What Is AEO — And Why It's Not Just SEO With a New Name

**Answer Engine Optimization is the practice of making your content visible to AI systems that generate answers — and getting cited as a source in those answers. It's complementary to SEO, not a replacement, but it requires a fundamentally different set of techniques.**

[SEMrush defines it](https://www.semrush.com/blog/answer-engine-optimization/) as "a set of marketing practices used to increase your brand's visibility in AI-generated answers." [Ahrefs frames it differently](https://ahrefs.com/blog/answer-engine-optimization/): "Traditional search is about competing for clicks. AI search is about being cited within the answer itself."

The terminology is still shaking out — which, honestly, is half the fun and half the frustration of working on something early. Some people call it GEO — Generative Engine Optimization. A [Princeton University paper](https://arxiv.org/abs/2311.09735) published at KDD 2024 coined that term and demonstrated that specific optimization strategies can boost visibility in generative engine responses by up to 40%. Others call it LLMO (Large Language Model Optimization). In practice, they overlap. I use AEO because it's the most descriptive: you're optimizing for engines that give answers.

Here's what makes AEO different from traditional SEO:

| | Traditional SEO | AEO |
|---|---|---|
| **Goal** | Rank on the results page | Get cited in the AI answer |
| **Format** | Long-form pages | Structured, extractable answer blocks |
| **Focus** | Keywords and backlinks | Entities, questions, conversational queries |
| **Metrics** | Rankings, click-through rate | Citation frequency, brand mentions, sentiment |

The critical nuance: AEO doesn't replace SEO. They're complementary. AI systems heavily favor content from domains that already rank well in traditional search. [86% of Google AI Overview citations](https://ahrefs.com/blog/search-rankings-ai-citations/) come from pages ranking in the top 100. Strong SEO feeds AEO. But SEO alone is no longer enough.

There's even a next layer forming. Search Engine Land has started writing about [AAO — Assistive Agent Optimization](https://searchengineland.com/aao-assistive-agent-optimization-469919) — preparing content for AI agents that don't just answer questions but act on behalf of users. Book a flight. Compare products. File a report. We're not there yet for most sites. But the direction is clear.

I think about it like this: SEO gets you indexed. AEO gets you cited. AAO — someday — gets you chosen.

We're living through the transition between the second and third layers. AI agents are already booking flights, writing code, comparing products, and making purchasing decisions. When an agent evaluates options on behalf of a user, it's going to pull from the same structured data, the same crawled content, the same trust signals that AEO optimizes for. The work you do now for AEO compounds into the agent era. That's the architecture these systems are built on.

Only [37% of marketing teams](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) are actively doing AEO work right now. Most know it matters. Most haven't started. That gap is an opportunity — for now.

---

## The Answer Engines

**Not all AI answer engines work the same way. Understanding how Google AI Overviews, ChatGPT, Claude, and Perplexity crawl and retrieve content is the first step to making your site visible to them — and it starts with your robots.txt.**

To optimize for answer engines, it helps to understand how they actually work. Not all of them operate the same way. I spent more time digging into crawler docs than I expected — the differences matter.

**Google AI Overviews** don't use a separate crawler. If Googlebot has already indexed your page, you're eligible. What's interesting is their ["query fan-out" technique](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search) — when building an answer, the system fires multiple related sub-queries. A page ranking position 40 for a related topic can end up cited in the primary answer. Content with specific, self-contained answer blocks of [134 to 167 words](https://wellows.com/blog/google-ai-overviews-ranking-factors/) has higher selection rates. I didn't know that range existed until I started measuring my own content against it.

**ChatGPT** runs three separate crawlers, each independently controllable: [GPTBot](https://platform.openai.com/docs/bots) for training, OAI-SearchBot for its search index, and ChatGPT-User for real-time browsing. You can block training while allowing search — they're separate decisions. Most people don't realize this.

**Claude** also has three bots — ClaudeBot, Claude-SearchBot, and Claude-User. Its web search is [powered by Brave Search](https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/). All three [respect robots.txt](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), including `Crawl-delay`.

**Perplexity** uses PerplexityBot for indexing (explicitly [not for model training](https://docs.perplexity.ai/guides/bots)) and Perplexity-User for real-time queries. It favors factual density, recency, and clean HTML structure. Its top cited domains? Reddit, YouTube, and Gartner — not exactly a traditional SEO leaderboard.

This site explicitly allows 13 AI crawlers in `robots.txt`:

```
# AI/LLM Crawlers - Explicitly allowed
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

# ... plus Bytespider, CCBot, Applebot-Extended, Amazonbot, Meta-ExternalAgent, cohere-ai
```

I chose to allow everything — both training and search crawlers. For a personal site, visibility matters more than opting out of data usage I can't control anyway. A commercial site might think differently — blocking GPTBot for training while allowing OAI-SearchBot for citations. The point is that these are independent decisions now, and "do nothing" is also a decision.

One thing that surprised me: Apple is building its own AI search system. ["World Knowledge Answers"](https://searchengineland.com/apple-world-knowledge-answers-ai-search-461569) is expected in iOS 26.4, powered partly by Google's Gemini models. Their Applebot-Extended crawler is already evaluating content for AI training. By the time it launches, sites that already allow Applebot will be in the index. Sites that don't won't.

---

## Why This Matters Now

The window to move early on AEO is narrow. Not because the techniques are hard — most aren't. It's because the longer you wait, the more content already optimized for AI citation will be in the index ahead of yours.

I started this work because my site was invisible to the tools I was already using every day. That felt wrong. I'd done the work — written the posts, built the implementations, shipped the features. But none of it was surfacing where people were actually asking questions.

Fixing that turned into a months-long project. Chapter 2 covers the concrete toolkit: structured data, `llms.txt`, Markdown endpoints for AI agents, and how I built them into a static Astro site without slowing anything down.

---

## Resources

**Research & Data**
- [Gartner: Search Volume Decline Prediction](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents)
- [Princeton GEO Paper — Generative Engine Optimization (KDD 2024)](https://arxiv.org/abs/2311.09735)
- [Search Engine Land: US Desktop Searches Declining](https://searchengineland.com/google-searches-per-us-user-fall-report-468051)
- [Demand Sage: AI Overviews Statistics](https://www.demandsage.com/ai-overviews-statistics/)
- [Demand Sage: Perplexity AI Statistics](https://www.demandsage.com/perplexity-ai-statistics/)

**Definitions & Guides**
- [SEMrush: Answer Engine Optimization](https://www.semrush.com/blog/answer-engine-optimization/)
- [Ahrefs: Answer Engine Optimization](https://ahrefs.com/blog/answer-engine-optimization/)
- [Search Engine Land: AAO — Assistive Agent Optimization](https://searchengineland.com/aao-assistive-agent-optimization-469919)
- [Ahrefs: Search Rankings vs AI Citations](https://ahrefs.com/blog/search-rankings-ai-citations/)

**Crawler Documentation**
- [OpenAI Crawlers](https://platform.openai.com/docs/bots)
- [Anthropic Crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity Crawlers](https://docs.perplexity.ai/guides/bots)
- [Google: Succeeding in AI Search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)
- [Apple World Knowledge Answers](https://searchengineland.com/apple-world-knowledge-answers-ai-search-461569)
