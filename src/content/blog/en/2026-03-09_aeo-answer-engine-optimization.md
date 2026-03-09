---
title: "Optimizing for Answers, Not Just Rankings: What I Built for the Age of AI Search"
description: "SEO got me ranked. AEO got me cited. Here's everything I built to make a static site visible to AI answer engines — and what I learned along the way."
pubDate: "2026-03-09T14:00:00"
heroImage: "/images/blog/posts/aeo-answer-engine-optimization/hero.png"
heroLayout: "side-by-side"
tags: ["tech", "web-development", "ai"]
keywords: ["answer engine optimization AEO guide", "optimize website for AI search engines", "llms.txt structured data AEO", "how AI search engines cite sources", "AEO vs SEO practical guide", "structured data JSON-LD for AI visibility", "track AI bot traffic server-side analytics"]
series: "building-xergioalex"
seriesOrder: 8
---

I had good SEO scores. Lighthouse 100 across the board. Pages indexed, canonical URLs validated, structured data passing every test Google threw at it. By every traditional metric, the site was doing fine.

Then I started asking AI about topics I'd written about. I tried ChatGPT. I tried Perplexity. I asked questions I'd answered in actual blog posts — with code, with real examples, with months of implementation behind them.

My site didn't come up. Not once.

That was the gap. Not in the ranking — in the answering. I was optimized for search engines. I was invisible to answer engines.

---

## The Shift

For over two decades, search worked roughly the same way. You typed something, you got a list of links, you clicked one. The game was: get your link higher on that list. SEO was built around this. Keywords, backlinks, meta tags, page speed, mobile-friendly design — all in service of moving up the list.

That model is breaking.

[Gartner predicted](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents) in February 2024 that traditional search volume would drop 25% by 2026. At the time, that sounded aggressive. Now, with US desktop searches per user [down roughly 20% year over year](https://searchengineland.com/google-searches-per-us-user-fall-report-468051) and publisher referrals from Google [down 38%](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/), it's tracking close.

The shift didn't happen overnight. Google's Knowledge Graph started answering queries directly back in 2012. Featured Snippets came in 2014. But the real break happened in May 2023, when Google launched the Search Generative Experience — later renamed to AI Overviews.

As of early 2026, AI Overviews appear in [roughly 48% of US search queries](https://www.demandsage.com/ai-overviews-statistics/). When they show up, [83% of those searches end without a click](https://www.demandsage.com/ai-overviews-statistics/). The user gets the answer. The list of links below — the list we spent years optimizing for — doesn't get touched.

And Google isn't alone. ChatGPT hit [900 million weekly active users](https://almcorp.com/blog/chatgpt-900-million-weekly-active-users/) in February 2026. Perplexity is processing [35 to 45 million queries a day](https://www.demandsage.com/perplexity-ai-statistics/). According to McKinsey, [44% of AI search users](https://magnawiz.com/answer-engine-optimization-aeo-why-seo-alone-isnt-enough-in-2025-2026/) now turn to AI as their main source of insight — more than traditional search.

This is not the death of SEO. It's the evolution. The question changed from "how do I rank?" to "how do I get cited?"

---

## What Is AEO — And Why It's Not Just SEO With a New Name

Answer Engine Optimization is the practice of making your content visible to AI systems that generate answers — and getting cited as a source in those answers.

[SEMrush defines it](https://www.semrush.com/blog/answer-engine-optimization/) as "a set of marketing practices used to increase your brand's visibility in AI-generated answers." [Ahrefs frames it differently](https://ahrefs.com/blog/answer-engine-optimization/): "Traditional search is about competing for clicks. AI search is about being cited within the answer itself."

The terminology is still shaking out. Some people call it GEO — Generative Engine Optimization. A [Princeton University paper](https://arxiv.org/abs/2311.09735) published at KDD 2024 coined that term and demonstrated that specific optimization strategies can boost visibility in generative engine responses by up to 40%. Others call it LLMO (Large Language Model Optimization). In practice, they overlap. I use AEO because it's the most descriptive: you're optimizing for engines that give answers.

Here's what makes AEO different from traditional SEO:

| | Traditional SEO | AEO |
|---|---|---|
| **Goal** | Rank on the results page | Get cited in the AI answer |
| **Format** | Long-form pages | Structured, extractable answer blocks |
| **Target** | Keywords and backlinks | Entities, questions, conversational queries |
| **Metrics** | Rankings, click-through rate | Citation frequency, brand mentions, sentiment |

The critical nuance: AEO doesn't replace SEO. They're complementary. AI systems heavily favor content from domains that already rank well in traditional search. [86% of Google AI Overview citations](https://ahrefs.com/blog/search-rankings-ai-citations/) come from pages ranking in the top 100. Strong SEO feeds AEO. But SEO alone is no longer enough.

There's even a next layer forming. Search Engine Land has started writing about [AAO — Assistive Agent Optimization](https://searchengineland.com/aao-assistive-agent-optimization-469919) — preparing content for AI agents that don't just answer questions but act on behalf of users. Book a flight. Compare products. File a report. We're not there yet for most sites. But the direction is clear: SEO → AEO → AAO. Each layer adds complexity. Each layer compounds the value of the previous one.

I think about it like this: SEO gets you indexed. AEO gets you cited. AAO — someday — gets you chosen.

We're living through the transition between the second and third layers. AI agents are already booking flights, writing code, comparing products, and making purchasing decisions. When an agent evaluates options on behalf of a user, it's going to pull from the same structured data, the same crawled content, the same trust signals that AEO optimizes for. The work you do now for AEO compounds into the agent era. That's not speculation — that's the architecture these systems are built on.

Only [37% of marketing teams](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) are actively doing AEO work right now. Most know it matters. Most haven't started. That gap is an opportunity — for now.

---

## The Answer Engines

To optimize for answer engines, it helps to understand how they actually work. Not all of them operate the same way.

**Google AI Overviews** don't use a separate crawler. If Googlebot has already indexed your page, you're eligible. What's interesting is their ["query fan-out" technique](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search) — when building an answer, the system fires multiple related sub-queries. A page ranking position 40 for a related topic can end up cited in the primary answer. Content with specific, self-contained answer blocks of [134 to 167 words](https://wellows.com/blog/google-ai-overviews-ranking-factors/) has higher selection rates.

**ChatGPT** runs three separate crawlers, each independently controllable: [GPTBot](https://platform.openai.com/docs/bots) for training, OAI-SearchBot for its search index, and ChatGPT-User for real-time browsing. You can block training while allowing search — they're separate decisions.

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

I chose to allow everything — both training and search crawlers. For a personal site, visibility matters more than opting out of data usage I can't control anyway. A commercial site might think differently — blocking GPTBot for training while allowing OAI-SearchBot for citations. The point is that these are independent decisions now, and "do nothing" is also a decision. Probably the worst one.

One thing that surprised me: Apple is building its own AI search system. ["World Knowledge Answers"](https://searchengineland.com/apple-world-knowledge-answers-ai-search-461569) is expected in iOS 26.4, powered partly by Google's Gemini models. Their Applebot-Extended crawler is already evaluating content for AI training. By the time it launches, sites that already allow Applebot will be in the index. Sites that don't won't.

---

## The Toolkit

Allowing crawlers in is the bare minimum. The real work is making the content machine-readable in ways that help AI systems understand, extract, and cite it.

### llms.txt — A Menu for Language Models

The [llms.txt specification](https://llmstxt.org/) was proposed by Jeremy Howard in September 2024. It's a Markdown file at `/llms.txt` that gives language models a structured summary of your site — what it covers, how it's organized, where to find things.

I'm not going to pretend this is widely adopted. [Semrush reports](https://www.semrush.com/blog/llms-txt/) roughly 844,000 sites have it, with about 10% adoption across surveyed domains. Notable adopters include Anthropic, Cloudflare, Vercel, and Supabase — mostly developer-facing companies. Google's John Mueller said in June 2025 that "no AI system currently uses llms.txt."

I built one anyway. The cost is a few lines of Markdown. The upside — if any model ever starts reading it — is a clean, curated summary of the entire site that a language model can consume in one request instead of crawling dozens of pages.

Here's what it looks like:

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

The full version (`llms-full.txt`) goes deeper — detailed page descriptions, topic areas, complete tech stack, all 130 lines of it. Is it being used today? Probably not by any major model. But it costs me nothing to maintain, and if any crawler starts reading it, the information is already there. I think of it like a `sitemap.xml` for the AI era — useful enough to keep, cheap enough to not worry about.

### Structured Data — Teaching Machines Who I Am

This is where AEO gets concrete. JSON-LD structured data tells AI systems not just what's on a page, but what it means — who wrote it, when, what type of content it is, how it relates to other content.

This site has 9 JSON-LD schema types across all pages. The most important one for AEO is the `Person` schema that ships on every page:

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

Every signal here serves a purpose. `alumniOf` with Y Combinator and the university — institutional credibility. `worksFor` with DailyBot — professional context. `sameAs` links to four social profiles — identity verification. `knowsAbout` — topic authority.

This is E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) encoded in a format machines can actually parse. Google's [Quality Rater Guidelines](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) describe what evaluators look for. Structured data is how you tell the algorithm the same thing.

The data backs this up. Pages with schema markup have [2.8x higher AI citation rates](https://www.airops.com/blog/schema-markup-aeo). In March 2025, [Google, Microsoft, and OpenAI all confirmed](https://www.stackmatix.com/blog/structured-data-ai-search) they use structured data in their generative AI features.

Beyond the Person schema, this site includes `BlogPosting` (with `wordCount`, `timeRequired`, `dateModified`, and nested author data), `BreadcrumbList` on every page, `Organization` for DailyBot, `WebSite`, `CollectionPage`, `ContactPage`, and `ProfilePage`. Nine types total. Each one gives AI systems another dimension to understand what this site is and who's behind it.

I spent more time on structured data than on any other AEO optimization. It's not exciting work — writing JSON schemas, validating them against Google's Rich Results Test, making sure every page has the right types. But the [BrightEdge study](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353) found that sites with structured data and FAQ blocks saw a 44% increase in AI search citations. And it's the one optimization that directly communicates meaning to machines — not just content, but context.

---

## Measuring What You Can't See

The hardest part of AEO is measurement. Google Analytics can't see AI bots. They don't execute JavaScript. From a client-side analytics perspective, every AI crawler visit is invisible.

I covered the technical solution in detail in a previous chapter — a Cloudflare Pages middleware that inspects every request, checks the User-Agent against a list of 13 known AI crawlers, and fires server-side events to Umami. Zero JavaScript overhead, zero impact on page load, runs at the edge.

The bot detection array looks like this:

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

Now I can see who's crawling, which pages they visit, and how often. That was step one.

Step two came in February 2026, when Microsoft launched the [AI Performance report](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) in Bing Webmaster Tools. It's the first tool from any major platform that shows how often your content gets cited in AI answers — specifically in Microsoft Copilot and Bing AI summaries. You can see total citations, which pages get referenced, and the "grounding queries" — the phrases the AI used when it retrieved your content.

It's not everything. There's no equivalent from Google for AI Overviews yet. Google Search Console still lumps AI Mode clicks into the regular "Web" search type. For now, the options are Bing's report, third-party tools like [Otterly.ai](https://otterly.ai) or [HubSpot's free AEO Grader](https://www.hubspot.com/aeo-grader), or manual testing — asking ChatGPT and Perplexity your target queries and checking if you show up.

One sobering stat from [AirOps research](https://www.airops.com/blog/how-to-test-content-visibility-in-perplexity-and-chatgpt): only 30% of brands stay visible from one AI answer to the next, and only 20% across five consecutive runs. Google AI Overviews change roughly 70% of their content for the same query between runs, with about half the citations getting swapped out. AI citations are volatile. One-time checks don't mean much. You need to measure over time — and accept that the numbers are going to be noisy.

This is, honestly, the weakest part of the AEO ecosystem right now. We can optimize content. We can track crawlers. But we still can't cleanly measure "how often does AI cite me?" the way we can measure "what's my organic CTR?" I think that changes over the next year as more tools like Bing's report come online. For now, server-side bot tracking is the best proxy we have.

---

## The Audit

I ran a full AEO audit on this site. Four dimensions, graded on a 10-point scale.

| Dimension | Grade | What It Measures |
|-----------|-------|-----------------|
| **Discoverability** | 10/10 | Can AI crawlers find and access the content? |
| **Extractability** | 10/10 | Can AI systems parse structured meaning from the content? |
| **Trust** | 10/10 | Does the content carry credibility signals for AI to evaluate? |
| **Citability** | 10/10 | Is the content structured in a way that makes it easy to cite? |

A+ overall. 40 out of 40. I documented the full methodology and findings in the site's internal AEO audit docs — scores per dimension, gap analysis, and a list of every improvement made.

Honestly, I didn't expect that score when I started this work. The site had good bones — static HTML, semantic markup, Astro's zero-JavaScript-by-default approach meant every page was clean, fast, and fully crawlable. But the deliberate AEO work — the structured data, the llms.txt files, the explicit crawler allowances, the bot tracking, the multilingual parity — that's what pushed it over the edge.

A few things I learned along the way:

**Freshness matters more than I expected.** According to [Ten Speed's research](https://www.tenspeed.io/blog/content-freshness-aeo-era), 76.4% of AI-cited pages were updated within the previous 30 days. AI systems prefer content that's [25.7% fresher](https://www.hillwebcreations.com/content-freshness/) than what traditional search surfaces. Adding visible "last updated" timestamps led to [30% more Perplexity citations](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026) in one study.

**Bilingual content is a multiplier.** This site runs in English and Spanish — 59 blog posts in each language, every page with both versions. Properly localized multilingual sites see [up to 327% more AI Overview visibility](https://koanthic.com/en/multilingual-seo-ai/) compared to single-language sites. Not translated — localized. AI systems assess each language independently. Machine translation without cultural adaptation doesn't cut it.

**I mapped 30 target queries** across three funnel stages — top of funnel (informational), middle (comparison), bottom (action-oriented). All 30 have matching content. I also built a monthly maintenance checklist: update llms.txt, validate schemas, run five target queries against AI platforms, check crawl stats. AEO isn't a one-time setup. It's an ongoing process.

---

## Where This Is Heading

AEO is still early. Only [37% of marketing teams](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) are actively optimizing for AI search. 70% recognize it matters, but only 20% have actually started implementing. The brands that are doing it? They're capturing [3.4x more visibility](https://blog.hubspot.com/marketing/answer-engine-optimization-trends) than late adopters.

The standards are still forming. The [IETF AIPREF working group](https://www.ietf.org/blog/aipref-wg/), chartered in February 2025, is drafting formal specifications for how websites can express preferences about AI content use — separate categories for training, AI output, and search. That's going to be important. Right now, robots.txt is the best we have, and it was never designed for this.

AI referral traffic is real and growing. It [grew 123%](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653) between September 2024 and February 2025. ChatGPT drives 87.4% of it. Vercel reported that ChatGPT referrals [grew to 10% of their new signups](https://aiseotracker.com/case-study/vercel). Tally.so saw ChatGPT become their number one referral source. These aren't theoretical projections. They're real numbers from real companies.

I don't know exactly how much of this site's traffic comes from AI citations. That's still hard to measure accurately. I don't know which model training runs included this content, or whether any fine-tuning dataset picked it up. But I can see the crawlers coming. I can see which pages they hit. I can see the Bing AI Performance report showing citations.

The ground is moving under search. Traditional SEO still matters — it's the foundation everything else is built on. But the next layer is here. AEO isn't a trend to watch anymore. It's something to build for.

And if you're reading this and thinking "I should probably do something about this" — you're already ahead of 63% of marketing teams. Start with structured data. Add an `llms.txt`. Check your robots.txt. Track your bots. Run your queries against ChatGPT and Perplexity. The bar is low right now, and the first-mover advantage is real.

Let's keep building.

---

## Resources

**Standards & Specifications**
- [llms.txt Official Specification](https://llmstxt.org/)
- [Schema.org](https://schema.org/)
- [Google: AI Features and Your Website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Succeeding in AI Search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)
- [Google: Structured Data Introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [IETF AIPREF Working Group](https://www.ietf.org/blog/aipref-wg/)

**Crawler Documentation**
- [OpenAI Crawlers](https://platform.openai.com/docs/bots)
- [Anthropic Crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity Crawlers](https://docs.perplexity.ai/guides/bots)

**Tools**
- [Bing Webmaster Tools AI Performance Report](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- [HubSpot AEO Grader (Free)](https://www.hubspot.com/aeo-grader)

**Research & Guides**
- [Princeton GEO Paper — Generative Engine Optimization (KDD 2024)](https://arxiv.org/abs/2311.09735)
- [Gartner: Search Volume Decline Prediction](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents)
- [SEMrush: Answer Engine Optimization](https://www.semrush.com/blog/answer-engine-optimization/)
- [Ahrefs: Answer Engine Optimization](https://ahrefs.com/blog/answer-engine-optimization/)
- [CXL: AEO Guide](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/)
