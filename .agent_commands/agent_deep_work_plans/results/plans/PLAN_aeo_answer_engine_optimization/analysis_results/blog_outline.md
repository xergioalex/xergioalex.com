# Blog Post Outline: AEO — Answer Engine Optimization

## Meta Information

### Title Options
1. **"Optimizing for Answers, Not Just Rankings: What I Built for the Age of AI Search"** (preferred — personal, specific, non-generic)
2. "When Search Engines Start Answering: Building for AEO from Scratch"
3. "From SEO to AEO: How I Made a Static Site Visible to AI"

### Frontmatter

```yaml
title: "Optimizing for Answers, Not Just Rankings: What I Built for the Age of AI Search"
description: "SEO got me ranked. AEO got me cited. Here's everything I built to make a static site visible to AI answer engines — and what I learned along the way."
pubDate: "2026-03-09T14:00:00"
heroImage: "/images/blog/posts/aeo-answer-engine-optimization/hero.png"
heroLayout: "side-by-side"
tags: ["tech", "web-development", "ai"]
keywords:
  EN: ["answer engine optimization AEO guide", "optimize website for AI search engines", "llms.txt structured data AEO", "how AI search engines cite sources", "AEO vs SEO practical guide", "structured data JSON-LD for AI visibility", "track AI bot traffic server-side analytics"]
  ES: ["optimización para motores de respuesta AEO", "optimizar sitio web para búsqueda con IA", "llms.txt datos estructurados AEO", "cómo los motores de búsqueda IA citan fuentes", "AEO vs SEO guía práctica", "datos estructurados JSON-LD visibilidad IA", "rastrear tráfico bots IA analítica servidor"]
series: "building-xergioalex"
seriesOrder: 8
```

### Tags
- `tech` (primary)
- `web-development` (secondary)
- `ai` (secondary)

---

## Story Arc Map

**Dual-arc weaving throughout the post:**

```
Section          | Arc A (Educational)              | Arc B (Personal)
-----------------|----------------------------------|----------------------------------
Opening Hook     | —                                | The moment I realized SEO wasn't enough
The Shift        | What changed in search           | What I noticed on my own site
What is AEO      | Definition, AEO vs SEO           | Why I started paying attention
The Engines      | How AI answer engines work        | Which crawlers visit my site
The Toolkit      | Standards & specs overview        | What I actually built (robots.txt, llms.txt, schemas)
Measuring It     | Tools available today             | My bot tracking middleware + Bing AI report
The Results      | Industry best practices           | My AEO audit grade (A+) and what I learned
The Road Ahead   | Where AEO is going               | What's next for this site
```

---

## Section Outline

### Opening Hook (~200 words)

**Concept:** Start with a concrete personal moment — the realization that traditional SEO success didn't mean AI visibility. Not a definition, not a stat. A specific thing that happened.

**Draft concept:**
> Something like: I had good SEO scores. Lighthouse 100 across the board. Pages indexed, structured data validated. Then I started asking ChatGPT and Perplexity questions about topics I'd written about. My site didn't appear. Not once. That was the gap. Not in the ranking — in the answering.

**Tone:** Puzzlement, not alarm. Curiosity-driven. "Huh, that's weird."

**Transition:** This kicked off a months-long project to understand what AI search engines actually want — and build it.

---

### Section 1: The Shift — When Search Stopped Being About Links (~500 words)

**Educational arc:**
- The 10-blue-links era is fading — Gartner predicted 25% decline by 2026, and it's broadly on track
- Zero-click searches: 58.5% in 2024, surged to 69% after AI Overviews rolled out, 83% for AIO queries
- AI Overviews now appear in ~48% of US queries
- ChatGPT at 900M weekly users; Perplexity at 35-45M queries/day
- The evolution: Knowledge Graph (2012) → Featured Snippets (2014) → SGE (2023) → AI Overviews (2024) → AI Mode (2025)
- This is not a replacement — it's an evolution. AEO is the next layer on top of SEO.

**Personal arc:**
- I'd been building for traditional SEO — and succeeding. But the ground shifted.
- Organic CTR dropping 58% when AI Overviews appear (Ahrefs data)
- The question changed from "how do I rank?" to "how do I get cited?"

**References:**
- [Gartner prediction](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents)
- [Search Engine Land zero-click data](https://searchengineland.com/zero-click-searches-up-organic-clicks-down-456660)
- [Ahrefs CTR study](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/)
- [Search Engine Land AIO evolution](https://searchengineland.com/google-ai-overviews-evolution-revolution-443454)

---

### Section 2: What is AEO — And Why It's Not Just SEO With a New Name (~600 words)

**Educational arc:**
- Define AEO clearly: optimizing content so AI answer engines cite you (not just rank you)
- AEO vs SEO table (goal, content format, optimization target, success metrics)
- AEO vs GEO vs LLMO — different names, overlapping concepts. Princeton GEO study (KDD 2024) showed strategies can boost visibility 40%.
- Key insight: AEO doesn't replace SEO. Strong SEO feeds AEO — AI systems favor trusted, well-ranked domains.
- Emerging: AAO (Assistive Agent Optimization) — optimizing for AI agents that act on behalf of users. This is the era of agents.
- Frame AEO as the natural evolution of SEO in the age of AI agents.

**Personal arc:**
- My site had strong SEO (Lighthouse 100, indexed, structured data). But AEO requires additional, deliberate work.
- The realization: "I was optimized for crawling but not for answering."

**References:**
- [SEMrush AEO definition](https://www.semrush.com/blog/answer-engine-optimization/)
- [Ahrefs AEO guide](https://ahrefs.com/blog/answer-engine-optimization/)
- [Princeton GEO paper](https://arxiv.org/abs/2311.09735)
- [Search Engine Land AAO](https://searchengineland.com/aao-assistive-agent-optimization-469919)

---

### Section 3: The Answer Engines — Who's Reading Your Content (~500 words)

**Educational arc:**
- Google AI Overviews: uses existing index, "query fan-out" technique, 86% citations from top-100 pages
- ChatGPT/SearchGPT: three crawlers (GPTBot for training, OAI-SearchBot for search, ChatGPT-User for live)
- Claude: three bots (ClaudeBot, Claude-SearchBot, Claude-User), powered by Brave Search
- Perplexity: PerplexityBot + Perplexity-User, NOT used for training, prioritizes factual density and recency
- Apple Intelligence: coming in iOS 26.4 with "World Knowledge Answers"
- Key insight: you can block training while allowing search — each crawler is independently controllable

**Personal arc:**
- I track 13 AI crawlers on this site. I can see them coming.
- Transition to showing the robots.txt setup

**Code snippet:** `public/robots.txt` (the AI crawler Allow rules — lines 16-54)

**References:**
- [Google AI Features docs](https://developers.google.com/search/docs/appearance/ai-features)
- [OpenAI crawler docs](https://platform.openai.com/docs/bots)
- [Anthropic crawler docs](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawler docs](https://docs.perplexity.ai/guides/bots)

---

### Section 4: The Toolkit — What I Actually Built (~1000 words)

This is the core "what I built" section. Several subsections.

#### 4a. robots.txt — Rolling Out the Welcome Mat (~150 words)
- 13 AI crawlers explicitly allowed
- Strategic choice: allow everything (training + search) — personal site, visibility matters more than training opt-out
- Brief code reference (already shown above)

#### 4b. llms.txt — A Menu for Language Models (~250 words)
- What llms.txt is: proposed by Jeremy Howard (Sept 2024), ~10% adoption, 844K+ sites
- Reality check: no LLM provider confirms reading it. But it's cheap insurance and good practice.
- Show the actual llms.txt file structure

**Code snippet:** `public/llms.txt` (full file, 59 lines)

**References:**
- [llms.txt spec](https://llmstxt.org/)
- [Semrush guide](https://www.semrush.com/blog/llms-txt/)

#### 4c. Structured Data — Teaching Machines Who I Am (~350 words)
- 9 JSON-LD schema types across all pages
- The most important for AEO: Person (with E-E-A-T signals), BlogPosting (with wordCount, timeRequired, author), BreadcrumbList
- Pages with schema markup: 2.8x higher AI citation rates
- March 2025: Google, Microsoft, and OpenAI confirmed using schema for generative AI

**Code snippet:** Person schema from BaseHead.astro (lines 174-216) — show how E-E-A-T is encoded

**References:**
- [Schema.org](https://schema.org/)
- [Google structured data docs](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [AirOps schema for AEO](https://www.airops.com/blog/schema-markup-aeo)

#### 4d. E-E-A-T Signals — Proving You're Real (~200 words)
- Experience, Expertise, Authoritativeness, Trustworthiness
- How I encoded it: Y Combinator alumni, CTO at DailyBot, university, 14+ years, 4 social profiles in sameAs
- Content with E-E-A-T: gets past AI's credibility filter before any other optimization matters

**References:**
- [Google Quality Rater Guidelines](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [T-Ranks E-E-A-T signals](https://t-ranks.com/seo/eeat-signals/)

---

### Section 5: Measuring What You Can't See (~600 words)

**Educational arc:**
- The measurement problem: Google Analytics can't see bots (no JS execution)
- Bing Webmaster Tools AI Performance report (launched Feb 2026) — first official tool
- Third-party tools: Otterly.ai, HubSpot AEO Grader, Semrush AI Toolkit
- Manual testing: ask AI platforms your target queries (but only 30% stay visible between runs)
- Server-side analytics is the key — logs reveal 30-40% of traffic standard analytics misses

**Personal arc:**
- I built a Cloudflare middleware to track AI bots server-side (covered in detail in previous chapter)
- Brief reference to the bot detection array (not full code — it's in chapter 7)
- What I can see now: which bots visit, which pages they crawl, crawl patterns
- Bing AI Performance report: I can see when my content is cited in Copilot

**Code snippet:** Brief excerpt of AI_BOT_PATTERNS from `functions/_middleware.ts` (lines 27-41) — just the pattern array, not the full middleware

**References:**
- [Bing Webmaster AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- [HubSpot AEO Grader](https://www.hubspot.com/aeo-grader)
- [AirOps testing visibility](https://www.airops.com/blog/how-to-test-content-visibility-in-perplexity-and-chatgpt)

---

### Section 6: The Audit — Grading Myself (~400 words)

**Personal arc (primary):**
- I ran a full AEO audit on this site. 4 dimensions, graded A-F.
- Results: A+ (40/40) across Discoverability, Extractability, Trust, Citability
- What made the difference: comprehensive structured data, explicit crawler allowances, bilingual content, strong E-E-A-T signals
- Mapped 30 target queries across TOFU/MOFU/BOFU — all 30 have matching content
- Monthly maintenance checklist documented
- Multilingual advantage: properly localized sites see up to 327% more AI visibility

**Educational arc:**
- Content freshness matters: 76.4% of AI-cited pages updated within 30 days
- Multilingual AEO: independent quality assessment per language, no shortcuts
- What NOT to do: keyword stuffing, missing schema, burying answers, cosmetic-only updates

**References:**
- [Ten Speed content freshness](https://www.tenspeed.io/blog/content-freshness-aeo-era)
- [Koanthic multilingual SEO AI](https://koanthic.com/en/multilingual-seo-ai/)
- [CXL AEO guide](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/)

---

### Section 7: Where This Is Heading (~300 words)

**Educational arc:**
- AEO adoption: only 37% of marketing teams actively doing it, but brands optimizing capture 3.4x more visibility
- IETF AIPREF working group: formalizing AI content preference standards
- AI referral traffic growing 123% between Sep 2024 and Feb 2025
- Vercel case study: ChatGPT referrals grew to 10% of signups
- The evolution continues: SEO → AEO → AAO (agents acting on behalf of users)

**Personal arc:**
- What's next for this site: monitoring the IETF standard, expanding target queries, measuring citation impact
- This is still early. Only 37% of sites are optimizing. First-mover advantage is real.

**Closer:** "Let's keep building."

**References:**
- [Acquia adoption data](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent)
- [IETF AIPREF](https://www.ietf.org/blog/aipref-wg/)
- [Vercel case study](https://aiseotracker.com/case-study/vercel)

---

### Resources Section (~external links only)

**Standards & Specifications:**
- [llms.txt Official Specification](https://llmstxt.org/)
- [Schema.org](https://schema.org/)
- [Google: AI Features and Your Website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Structured Data Introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [IETF AIPREF Working Group](https://www.ietf.org/blog/aipref-wg/)

**Crawler Documentation:**
- [OpenAI Crawlers](https://platform.openai.com/docs/bots)
- [Anthropic Crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity Crawlers](https://docs.perplexity.ai/guides/bots)

**Tools:**
- [Bing Webmaster AI Performance Report](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- [HubSpot AEO Grader](https://www.hubspot.com/aeo-grader)

**Research:**
- [Princeton GEO Paper (KDD 2024)](https://arxiv.org/abs/2311.09735)
- [Gartner: Search Volume Decline Prediction](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents)

**Industry Guides:**
- [SEMrush: Answer Engine Optimization](https://www.semrush.com/blog/answer-engine-optimization/)
- [Ahrefs: Answer Engine Optimization](https://ahrefs.com/blog/answer-engine-optimization/)
- [CXL: Comprehensive AEO Guide](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/)

---

## Code Snippet Plan

| # | Snippet | Source File | Lines | Purpose in Post |
|---|---------|-----------|-------|-----------------|
| 1 | AI crawler Allow rules | `public/robots.txt` | 16-54 | Show the 13 explicitly allowed AI crawlers |
| 2 | llms.txt structure | `public/llms.txt` | Full file | Show the LLM discovery file format |
| 3 | Person schema (E-E-A-T) | `src/components/BaseHead.astro` | 174-216 | Show how E-E-A-T signals are encoded in JSON-LD |
| 4 | AI bot detection patterns | `functions/_middleware.ts` | 27-41 | Show the bot detection array (brief, reference to ch.7) |

---

## Word Count Estimates

| Section | Est. Words |
|---------|-----------|
| Opening Hook | 200 |
| Section 1: The Shift | 500 |
| Section 2: What is AEO | 600 |
| Section 3: The Answer Engines | 500 |
| Section 4: The Toolkit | 1,000 |
| Section 5: Measuring What You Can't See | 600 |
| Section 6: The Audit | 400 |
| Section 7: Where This Is Heading | 300 |
| **Total** | **~4,100** |

Within the 3,500-5,000 target range.

---

## Voice Reminders

- Open with personal moment, NOT a definition
- Vary sentence length (5 words mixed with 30+)
- Use specific names, versions, URLs
- Dry humor where natural (not forced)
- Em-dashes for mid-sentence interruptions
- Admit unknowns: "I'm not sure whether...", "I have no idea if..."
- NO: comprehensive, delve, game-changer, seamless, revolutionize, harness, landscape, robust, cutting-edge
- End with "Let's keep building."
- Don't repeat what chapter 6 and 7 cover in detail — reference them naturally
