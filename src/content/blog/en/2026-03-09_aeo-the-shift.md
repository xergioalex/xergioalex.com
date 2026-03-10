---
title: "The Shift: Why Rankings No Longer Mean Visibility"
description: "The search landscape changed — and most sites aren't ready. Here's what the shift looks like, why AI answer engines work differently, and the two foundations every site should have in place."
pubDate: "2026-03-09T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["answer engine optimization AEO guide", "what is AEO vs SEO", "how AI search engines work", "Google AI Overviews optimization", "ChatGPT Perplexity content citation", "llms.txt implementation", "structured data JSON-LD AEO", "E-E-A-T structured data schema"]
series: "aeo-journey"
seriesOrder: 1
---

The web didn't break overnight. It shifted.

In 2012, Google started answering some queries directly in the search results page — Knowledge Graph panels. In 2014, Featured Snippets appeared. Each step moved the answer slightly closer to the user and slightly further from your site. Then in May 2023, Google launched the Search Generative Experience — later renamed to AI Overviews — and the shift accelerated past the point where you could ignore it.

The question used to be: "How do I rank?" Now there's a second question that matters just as much: "How do I get cited?"

This post covers both the shift and the first practical response to it — two foundations that every site should have in place before worrying about anything more sophisticated.

---

## The Shift

**The short version: for over two decades, search worked the same way — get your link higher on the list. That model is breaking. Traditional search volume is declining, AI answer engines are absorbing millions of queries per day, and most of those interactions never produce a click.**

For over two decades, search worked roughly the same way. You typed something, you got a list of links, you clicked one. The game was: get your link higher on that list. SEO was built around this. Keywords, backlinks, meta tags, page speed, mobile-friendly design — all in service of moving up the list.

That model is breaking.

[Gartner predicted](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents) in February 2024 that traditional search volume would drop 25% by 2026. At the time, that sounded aggressive. Now, with US desktop searches per user [down roughly 20% year over year](https://searchengineland.com/google-searches-per-us-user-fall-report-468051) and publisher referrals from Google [down 38%](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/), it's tracking close.

As of early 2026, AI Overviews appear in [roughly 48% of US search queries](https://www.demandsage.com/ai-overviews-statistics/). When they show up, [83% of those searches end without a click](https://www.demandsage.com/ai-overviews-statistics/). The user gets the answer. The list of links below — the list we spent years optimizing for — doesn't get touched.

And Google isn't alone. ChatGPT hit [900 million weekly active users](https://almcorp.com/blog/chatgpt-900-million-weekly-active-users/) in February 2026. Perplexity is processing [35 to 45 million queries a day](https://www.demandsage.com/perplexity-ai-statistics/). According to McKinsey, [44% of AI search users](https://magnawiz.com/answer-engine-optimization-aeo-why-seo-alone-isnt-enough-in-2025-2026/) now turn to AI as their main source of insight — more than traditional search.

This is not the death of SEO. It's the evolution.

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

I think about it like this: SEO gets you indexed. AEO gets you cited. AAO — someday — gets you chosen. Only [37% of marketing teams](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) are actively doing AEO work right now. Most know it matters. Most haven't started.

---

## The Answer Engines

**Not all AI answer engines work the same way. Understanding how Google AI Overviews, ChatGPT, Claude, and Perplexity crawl and retrieve content is the first step to making your site visible to them — and it starts with your robots.txt.**

To optimize for answer engines, it helps to understand how they actually work. Not all of them operate the same way. I spent more time digging into crawler docs than I expected — the differences matter.

**Google AI Overviews** don't use a separate crawler. If Googlebot has already indexed your page, you're eligible. What's interesting is their ["query fan-out" technique](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search) — when building an answer, the system fires multiple related sub-queries. A page ranking position 40 for a related topic can end up cited in the primary answer. Content with specific, self-contained answer blocks of [134 to 167 words](https://wellows.com/blog/google-ai-overviews-ranking-factors/) has higher selection rates. I didn't know that range existed until I started measuring my own content against it.

**ChatGPT** runs three separate crawlers, each independently controllable: [GPTBot](https://platform.openai.com/docs/bots) for training, OAI-SearchBot for its search index, and ChatGPT-User for real-time browsing. You can block training while allowing search — they're separate decisions. Most people don't realize this.

**Claude** also has three bots — ClaudeBot, Claude-SearchBot, and Claude-User. Its web search is [powered by Brave Search](https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/). All three [respect robots.txt](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), including `Crawl-delay`.

**Perplexity** uses PerplexityBot for indexing (explicitly [not for model training](https://docs.perplexity.ai/guides/bots)) and Perplexity-User for real-time queries. It favors factual density, recency, and clean HTML structure. Its top cited domains? Reddit, YouTube, and Gartner — not exactly a traditional SEO leaderboard.

Allowing AI crawlers in `robots.txt` is the foundation — and a surprisingly active decision. This site explicitly allows 13 crawlers:

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

One thing worth noting: Apple is building its own AI search system. ["World Knowledge Answers"](https://searchengineland.com/apple-world-knowledge-answers-ai-search-461569) is expected in iOS 26.4, powered partly by Google's Gemini models. Their Applebot-Extended crawler is already evaluating content for AI training. By the time it launches, sites that already allow Applebot will be in the index. Sites that don't won't.

---

## The First Foundation: Giving AI a Menu

Getting on the allowlist means AI bots can visit. But showing up and being understood are different things — a lesson I learned more slowly than I should have. A crawler that lands on a page full of Tailwind classes, SVG icons, and navigation markup has to dig through a lot of noise to find the actual content.

That's where `llms.txt` comes in.

The [llms.txt specification](https://llmstxt.org/) was proposed by Jeremy Howard in September 2024. The premise is simple: instead of making a language model crawl your entire site to understand what's there, you hand it a structured index — a Markdown file at `/llms.txt` that gives AI systems a curated summary of your site. What it covers, how it's organized, where to find things. About 10-30 lines and takes a few minutes to write.

[Semrush reports](https://www.semrush.com/blog/llms-txt/) roughly 844,000 sites have one — about 10% of surveyed domains. Early adopters are mostly developer-facing: Anthropic, Cloudflare, Vercel, Supabase.

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

There's also a `llms-full.txt` — 130 lines with detailed page descriptions, topic areas, and the full tech stack. Is it being used today? Probably not by any major model. But it costs nothing to maintain.

---

## The Second Foundation: Speaking Their Vocabulary

This is where AEO gets concrete — and, honestly, a little tedious.

Structured data is E-E-A-T — Experience, Expertise, Authoritativeness, Trustworthiness — encoded in a format machines can parse directly. Pages with schema markup have [2.8x higher AI citation rates](https://www.airops.com/blog/schema-markup-aeo). In March 2025, [Google, Microsoft, and OpenAI all confirmed](https://www.stackmatix.com/blog/structured-data-ai-search) they use structured data in their generative AI features. A [BrightEdge study](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353) found a 44% increase in AI search citations for sites with structured data and FAQ blocks.

The most important schema on this site is the `Person` type — it ships on every single page:

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

I spent more time on structured data than on any other piece of this project. It's not exciting work — writing JSON schemas, validating them in Google's Rich Results Test, making sure each page has the right types. I spent an afternoon on the `BlogPosting` schema alone, cross-referencing the schema.org spec to check which properties were actually used by AI systems versus which ones were just technically valid but ignored. Most of the first draft was wrong in small ways. Going back through documentation I'd already read once wasn't fun.

But it's the one optimization that directly communicates meaning to machines — not just content, but context. Who wrote this, why they're qualified to write it, when it was last updated. That's the layer that matters.

Beyond the `Person` schema, this site has 9 JSON-LD types in total: `BlogPosting` (with `wordCount`, `timeRequired`, `dateModified`, and nested author data), `BreadcrumbList` on every page, `Organization` for DailyBot, `WebSite`, `CollectionPage`, `ContactPage`, and `ProfilePage`.

---

## What Comes Next

The foundations are in place: crawlers allowed, a menu in `/llms.txt`, structured data on every page. But crawlable and machine-readable are still just table stakes — they get you into the game. The more interesting frontier is giving AI agents a direct channel to your content, bypassing HTML parsing entirely with native Markdown endpoints.

That's what the next chapter covers. Let's keep building.

---

## Resources

**Research & Data**
- [Gartner: Search Volume Decline Prediction](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents)
- [Princeton GEO Paper — Generative Engine Optimization (KDD 2024)](https://arxiv.org/abs/2311.09735)
- [Search Engine Land: US Desktop Searches Declining](https://searchengineland.com/google-searches-per-us-user-fall-report-468051)
- [Demand Sage: AI Overviews Statistics](https://www.demandsage.com/ai-overviews-statistics/)
- [Demand Sage: Perplexity AI Statistics](https://www.demandsage.com/perplexity-ai-statistics/)
- [AirOps: Schema Markup and AI Citation Rates](https://www.airops.com/blog/schema-markup-aeo)
- [BrightEdge: Schema and AI Overview Visibility](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353)

**Definitions & Guides**
- [SEMrush: Answer Engine Optimization](https://www.semrush.com/blog/answer-engine-optimization/)
- [Ahrefs: Answer Engine Optimization](https://ahrefs.com/blog/answer-engine-optimization/)
- [Search Engine Land: AAO — Assistive Agent Optimization](https://searchengineland.com/aao-assistive-agent-optimization-469919)
- [Ahrefs: Search Rankings vs AI Citations](https://ahrefs.com/blog/search-rankings-ai-citations/)

**Standards & Specifications**
- [llms.txt Official Specification](https://llmstxt.org/)
- [Schema.org](https://schema.org/)
- [SEMrush: llms.txt Adoption Report](https://www.semrush.com/blog/llms-txt/)
- [Stackmatix: Structured Data in AI Search (Google, Microsoft, OpenAI)](https://www.stackmatix.com/blog/structured-data-ai-search)
- [Google: Structured Data Introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

**Crawler Documentation**
- [OpenAI Crawlers](https://platform.openai.com/docs/bots)
- [Anthropic Crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity Crawlers](https://docs.perplexity.ai/guides/bots)
- [Google: Succeeding in AI Search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)
- [Apple World Knowledge Answers](https://searchengineland.com/apple-world-knowledge-answers-ai-search-461569)

**Tools**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
