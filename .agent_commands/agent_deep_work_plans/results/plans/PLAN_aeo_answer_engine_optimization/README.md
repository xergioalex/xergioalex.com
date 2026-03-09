# Plan: AEO (Answer Engine Optimization) — Comprehensive Blog Post

## 1. Goal

Create a definitive, highly shareable blog post about Answer Engine Optimization (AEO) that serves as both an educational resource and a personal narrative. The post explains what AEO is, why it matters, and the current state of the art — backed by authoritative references. Simultaneously, it documents everything implemented on xergioalex.com: the technical journey, real code, audit grades, and lessons learned. Part of the "Building XergioAleX.com" series (chapter 8).

## 2. Context

### What Already Exists

**Previous blog posts** (mention AEO superficially):
- "Tracking the Invisible: How I Built AI Bot Analytics" (seriesOrder: 7)
- "Measuring What Matters: How I Set Up Free Analytics" (seriesOrder: 6)

**AEO infrastructure on site** (comprehensive, A+ audit grade):
- 13 AI crawlers allowed in `robots.txt`
- `llms.txt` + `llms-full.txt` for LLM discovery
- 9 JSON-LD schema types (WebSite, Person, Organization, BlogPosting, BreadcrumbList, CollectionPage, ContactPage, ProfilePage, WebPage)
- Cloudflare middleware for server-side AI bot tracking (zero JS)
- Full multilingual support (EN/ES) with hreflang
- E-E-A-T signals: Y Combinator S21, CTO DailyBot, 14+ years
- 30 target AEO queries mapped (TOFU/MOFU/BOFU)
- Monthly AEO maintenance checklist

**Previous plans executed**: PLAN_aeo_llm_discoverability, PLAN_seo_audit

### Key Files

| Category | Location |
|----------|----------|
| Blog posts EN | `src/content/blog/en/` |
| Blog posts ES | `src/content/blog/es/` |
| Blog images | `public/images/blog/posts/{slug}/` |
| AEO docs | `docs/aeo/AUDIT.md`, `docs/aeo/QUERIES.md`, `docs/aeo/CHECKLIST.md` |
| SEO docs | `docs/SEO.md` |
| Structured data | `src/components/BaseHead.astro`, `src/components/JsonLd.astro` |
| Bot tracking | `functions/_middleware.ts` |
| LLM files | `public/llms.txt`, `public/llms-full.txt` |
| Robots | `public/robots.txt` |
| Writing voice | `docs/WRITING_VOICE_GUIDE.md` |
| Series config | `src/content/series/` |
| Tags config | `src/content/tags/` |
| Translations | `src/lib/translations/{en,es}.ts` |

### Writing Voice Requirements

- Personal, experience-driven narrative
- Extreme specificity (real names, versions, metrics, code)
- Varied sentence rhythm (short punchy + longer explanatory)
- Dry humor, failure-as-data mindset
- "Let's keep building." closer
- NO AI slop vocabulary (see `docs/WRITING_VOICE_GUIDE.md`)

## Plan Variables

| Variable | Value |
|----------|-------|
| `SLUG` | `aeo-answer-engine-optimization` |
| `PUB_DATE` | `2026-03-09` |
| `SERIES` | `building-xergioalex` |
| `SERIES_ORDER` | `8` |
| `BRANCH` | `feat/blog-aeo-answer-engine-optimization` |
| `WORD_TARGET` | `3,500–5,000` |
| `HERO_LAYOUT` | TBD (based on image) |

## 3. Global Guidelines

- **Branch**: `feat/blog-aeo-answer-engine-optimization` (create from `dev`)
- **Commits**: Conventional format — `feat(blog): ...`, `docs: ...`
- **Import order**: Node.js → Third-party → Internal (`@/`) → Types
- **Code quality**: `npm run biome:check` must pass (zero issues)
- **TypeScript**: `npm run astro:check` must pass
- **Build**: `npm run build` must succeed
- **Tests**: `npm run test` must pass
- **Dark mode**: Verify any new components support dark mode
- **i18n**: Both EN and ES versions mandatory, no hardcoded strings
- **Spanish orthography**: Proper ñ, accents, ¿, ¡ — run grep validation
- **No placeholders**: Zero `[TODO:]`, `[AUTHOR:]`, `[TBD]` text in published content
- **References**: Every state-of-the-art claim must include a reference link
- **Voice**: Follow `docs/WRITING_VOICE_GUIDE.md` strictly

## 4. Task List & Links

- [x] Task 1: Deep AEO State-of-the-Art Web Research
      See: [1.task_aeo_web_research.md](./1.task_aeo_web_research.md)
- [x] Task 2: Content Outline & Story Arc Design
      See: [2.task_content_outline.md](./2.task_content_outline.md)
- [x] Task 3: Write English Blog Post
      See: [3.task_write_english_post.md](./3.task_write_english_post.md)
- [ ] Task 4: Write Spanish Blog Post
      See: [4.task_write_spanish_post.md](./4.task_write_spanish_post.md)
- [ ] Task 5: Hero Image & Visual Assets
      See: [5.task_hero_image.md](./5.task_hero_image.md)
- [ ] Task 6: Final Review & Comprehensive Validation
      See: [6.task_final_review.md](./6.task_final_review.md)
- [ ] Task 7: Skills & Agents Discovery
      See: [7.task_skills_agents_discovery.md](./7.task_skills_agents_discovery.md)
- [ ] Task 8: Executive Report
      See: [8.task_executive_report.md](./8.task_executive_report.md)

> **Mandatory final tasks:** Every plan includes Skills & Agents Discovery (second-to-last) and Executive Report (last).

**Progress: 3/8 tasks completed**

## 5. Execution Rules for the Agent

1. **Read this README** fully before starting any task
2. **Work tasks in order** (1 → 2 → 3 → ... → 8). Never skip ahead.
3. **Before each task**: Read the task file completely. Re-read Section 1 (Goal) to stay aligned.
4. **After each task**:
   - Update this README: change `[ ]` → `[x]` for completed task
   - Update progress count (e.g., "1/8 tasks completed")
   - Update the task file's Completion & Log section
   - Update `PROGRESS.md` with task summary
   - Commit changes with conventional format
5. **Run validations** as specified in each task before marking complete
6. **If blocked**: Document the blocker in the task log, skip to next task if possible, flag for user
7. **Use skills when specified**: `/add-blog-post` for post creation, `/translate-sync` for translations

## 6. Skills & Agents Used in This Plan

| Task | Skill/Agent | Purpose |
|------|-------------|---------|
| 1 | Web research | Deep AEO state-of-the-art research with references |
| 2 | — | Manual outline creation |
| 3 | `/add-blog-post` | Blog post creation with scaffolding |
| 3 | `content-writer` agent | Writing in author's voice |
| 4 | `/translate-sync` or `/add-blog-post` | Spanish translation |
| 4 | `i18n-guardian` agent | Translation quality check |
| 6 | `reviewer` agent | Final quality review |
| 6 | `i18n-guardian` agent | Bilingual consistency |

## 7. Plan Status / Notes

| Field | Value |
|-------|-------|
| Status | In progress |
| Created | 2026-03-09 |
| Tasks | 8 (6 user + 2 mandatory) |
| Branch | `feat/blog-aeo-answer-engine-optimization` |
| Blocked | — |

## Analysis Outputs

| Output | Generated By | Description |
|--------|-------------|-------------|
| `analysis_results/aeo_research.md` | Task 1 | AEO state-of-the-art research with references |
| `analysis_results/blog_outline.md` | Task 2 | Detailed content outline and story arc |
| `analysis_results/EXECUTIVE_REPORT.md` | Task 8 | Final executive report |

## 8. Quick Reference

See [PROMPTS.md](./PROMPTS.md) for ready-to-use prompts.
