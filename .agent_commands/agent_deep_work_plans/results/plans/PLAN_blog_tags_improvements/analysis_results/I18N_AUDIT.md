# i18n Architecture Audit Report

**Plan:** PLAN_blog_tags_improvements
**Date:** 2026-02-09
**Scope:** Complete i18n compliance review of XergioAleX.com

---

## 1. Executive Summary

The site's i18n system is **architecturally solid** — a centralized `translations.ts` file with 37 top-level keys and perfect EN/ES parity powers most of the UI. However, the audit reveals **5 major issues**, **3 high-priority issues**, **4 medium-priority tag issues**, and **3 minor issues**.

**Critical findings:**
- 4 homepage sections (Education, Experience, Projects, Skills) have **all content hardcoded in Spanish only** with no `lang` prop or translation support
- The `portfolio` tag is **missing entirely** from `tagNames` and `tagDescriptions` in translations.ts, despite being used in blog posts and having a content collection entry
- `portfolioPage` translations are **referenced in code but not defined** in translations.ts
- Tag names are displayed as **raw identifiers** (`#tech`) in all components instead of localized names (`#Tech` / `#Tecnología`)
- Several blog pages have **hardcoded title/description strings** instead of using translation keys

---

## 2. Component i18n Compliance Table

### Top-Level Components

| Component | Accepts `lang`? | Uses `getTranslations`? | Hardcoded Strings? | Tag Display? | Notes |
|-----------|:-:|:-:|:-:|:-:|-------|
| `BaseHead.astro` | Yes (optional) | No | No | N/A | Uses lang for og:locale |
| `Footer.astro` | Yes | Yes | No | N/A | Uses t.footer.* keys |
| `FormattedDate.astro` | Yes | No | No | N/A | Uses native locale formatting |
| `HeaderLink.astro` | No | No | No | N/A | Utility, text via slot |
| `JsonLd.astro` | No | No | No | N/A | Metadata only |
| `ThemeToggle.astro` | No | No | **Yes** | N/A | Hardcoded "Toggle dark mode" aria-label |

### Blog Components

| Component | Accepts `lang`? | Uses `getTranslations`? | Hardcoded Strings? | Tag Display? | Notes |
|-----------|:-:|:-:|:-:|:-:|-------|
| `BlogCard.svelte` | Yes | Yes | No | **RAW** | `#{tag}` — not localized |
| `BlogContainer.astro` | Yes | No | No | N/A | Passes lang to children |
| `BlogGrid.svelte` | Yes | No | No | N/A | Passes lang to children |
| `BlogHeader.svelte` | Yes | Yes | **Yes** | **RAW** | Hardcoded "Mostrando X de Y artículos" ternary |
| `BlogPagination.svelte` | Yes | Yes | Minor | N/A | Hardcoded "Page X" aria-label |
| `BlogSearchInput.svelte` | Yes | Yes | No | N/A | Uses t.searchPlaceholder |
| `SearchResults.svelte` | Yes | Yes | No | N/A | Uses t.noResults |
| `StaticBlogSearch.svelte` | Yes | Yes | **Yes** | **RAW** | Hardcoded loading text; tags not localized |

### Home Section Components

| Component | Accepts `lang`? | Uses `getTranslations`? | Hardcoded Strings? | Tag Display? | Notes |
|-----------|:-:|:-:|:-:|:-:|-------|
| `BlogPreviewSection.astro` | Yes | Yes | **Yes** | N/A | Hardcoded "View all posts" ternary |
| `ContactSection.astro` | Yes | Partial | **Yes** | N/A | Hardcoded ternary for title/description |
| `EducationSection.astro` | **No** | **No** | **ALL SPANISH** | N/A | **MAJOR: No i18n at all** |
| `ExperienceSection.astro` | **No** | **No** | **ALL SPANISH** | N/A | **MAJOR: No i18n at all** |
| `HeroSection.astro` | No | No | No | N/A | Content via props |
| `Typewriter.svelte` | No | No | No | N/A | Words via props |
| `HomeSection.astro` | No | No | No | N/A | Presentational wrapper |
| `HomeSectionContent.astro` | No | No | No | N/A | Content via props |
| `HomeSectionImage.astro` | No | No | No | N/A | Image only |
| `ProjectsSection.astro` | **No** | **No** | **ALL SPANISH** | N/A | **MAJOR: No i18n at all** |
| `SkillsSection.astro` | **No** | **No** | **ALL SPANISH** | N/A | **MAJOR: No i18n at all** |

### Layout Components

| Component | Accepts `lang`? | Uses `getTranslations`? | Hardcoded Strings? | Tag Display? | Notes |
|-----------|:-:|:-:|:-:|:-:|-------|
| `Header.svelte` | Yes | Yes | No | N/A | Complete i18n support |
| `MobileMenu.svelte` | Yes | Yes | **Minor** | N/A | Hardcoded "English"/"Español" text |

### Portfolio Components

| Component | Accepts `lang`? | Uses `getTranslations`? | Hardcoded Strings? | Tag Display? | Notes |
|-----------|:-:|:-:|:-:|:-:|-------|
| `PortfolioTimeline.svelte` | Yes | Yes | No | **RAW** | Uses t.portfolioPage.emptyState (undefined!) |

---

## 3. Page i18n Compliance Table

| EN Page | ES Exists? | `lang` Set? | Title Translated? | Description Translated? | Notes |
|---------|:-:|:-:|:-:|:-:|-------|
| `index.astro` | Yes | Yes | Yes (`t.siteTitle`) | Yes (`t.siteDescription`) | Compliant |
| `about.astro` | Yes | Yes | Yes | Yes | Compliant |
| `contact.astro` | Yes | Yes | Yes | Yes | Compliant |
| `cv.astro` | Yes | Yes | Yes | Yes | Compliant |
| `dailybot.astro` | Yes | Yes | Yes | Yes | Compliant |
| `entrepreneur.astro` | Yes | Yes | Yes | Yes | Compliant |
| `foodie.astro` | Yes | Yes | Yes | Yes | Compliant |
| `hobbies.astro` | Yes | Yes | Yes | Yes | Compliant |
| `maker.astro` | Yes | Yes | Yes | Yes | Compliant |
| `portfolio.astro` | Yes | Yes | **No** (`t.portfolioPage` undefined) | **No** | **Missing translations** |
| `techtalks.astro` | Yes | Yes | Yes | Yes | CTA uses wrong key |
| `trading.astro` | Yes | Yes | Yes | Yes | Compliant |
| `blog/index.astro` | Yes | Yes | **Hardcoded** ("Blog") | **Hardcoded** | Should use translation key |
| `blog/[...slug].astro` | Yes | Yes | Dynamic (post data) | Dynamic | Hardcoded "Last updated on" |
| `blog/page/[page].astro` | Yes | Yes | **Hardcoded** ("Blog") | **Hardcoded** | Same as blog index |
| `blog/tag/[tag].astro` | Yes | Yes | **Hardcoded template** | **Hardcoded template** | "Posts tagged: ${tag}" not localized |
| `blog/tag/[tag]/page/[page].astro` | Yes | Yes | **Hardcoded template** | **Hardcoded template** | Same pattern |
| `api/posts.json.ts` | N/A | N/A | N/A | N/A | API endpoint |

**Spanish pages:** All EN pages have ES equivalents. No orphaned pages in either direction.

---

## 4. Tag System Analysis

### 4.1 Tag Definition Flow

```
[Content Collection]          [translations.ts]
src/content/tags/*.md    →    tagNames / tagDescriptions
  - tech.md                     - EN: Tech / Tecnología
  - personal.md                 - EN: Personal / Personal
  - talks.md                    - EN: Talks / Charlas
  - trading.md                  - EN: Trading / Trading
  - portfolio.md                - ⚠️ MISSING from translations!
```

### 4.2 Tag Content Collection Schema

```typescript
// src/content.config.ts
const tags = defineCollection({
  schema: z.object({
    name: z.string(),           // Tag slug identifier
    description: z.string().optional(), // English-only description
  }),
});
```

### 4.3 Tag Content Files (English-Only)

| File | `name` | `description` |
|------|--------|---------------|
| `tech.md` | "tech" | "Tutorials, guides, and technical articles." |
| `personal.md` | "personal" | "Articles about my life and experiences." |
| `talks.md` | "talks" | "Tech talks, slides, videos, and events." |
| `trading.md` | "trading" | "Trading journal, analysis, and learnings." |
| `portfolio.md` | "portfolio" | "Personal projects, software, robotics, and open source work." |

### 4.4 Tag Retrieval (`blog.ts`)

```typescript
// Tags are retrieved by matching post tags with collection entries
const usedTags = Array.from(
  new Set(posts.flatMap((post) => post.data.tags ?? []))
);
const filteredTags = tagsResult.filter((tag) =>
  usedTags.includes(tag.data.name)
);
```

### 4.5 Tag Display Points (All Raw)

| Component | How Tags Displayed | Localized? |
|-----------|-------------------|:-:|
| `BlogCard.svelte` | `#{tag}` | No |
| `BlogHeader.svelte` | Raw tag identifier | No |
| `StaticBlogSearch.svelte` | `tag.data.name` from collection | No |
| `PortfolioTimeline.svelte` | `#{tag}` | No |
| Tag page titles | `Posts tagged: ${tag}` | No |

### 4.6 Redundancy Issue

Tag descriptions exist in **two places**:
1. Tag `.md` files (English only)
2. `translations.ts` → `tagDescriptions` (EN + ES)

The tag `.md` file descriptions are never actually used for display — they serve as the content collection entry but components don't read them. The `tagNames` and `tagDescriptions` in `translations.ts` are defined but also never used by components (which display raw identifiers instead).

### 4.7 Missing Portfolio Tag

The `portfolio` tag has:
- A content collection file: `src/content/tags/portfolio.md`
- Blog posts using it: `project-autonomous-robot.md`, `project-devops-toolkit.md`
- **NOT defined** in `translations.ts` `tagNames` or `tagDescriptions`

---

## 5. Translation Completeness Report

### 5.1 Overview

| Metric | Value |
|--------|-------|
| Total top-level keys | 37 |
| EN keys | 37 |
| ES keys | 37 |
| Key parity | **Perfect** |
| Empty values | None found |

### 5.2 Tag Translation Coverage

| Tag | In Collection? | In `tagNames`? | In `tagDescriptions`? |
|-----|:-:|:-:|:-:|
| tech | Yes | Yes | Yes |
| personal | Yes | Yes | Yes |
| talks | Yes | Yes | Yes |
| trading | Yes | Yes | Yes |
| portfolio | Yes | **NO** | **NO** |

### 5.3 Missing Translation Sections

| Section | Status | Notes |
|---------|--------|-------|
| `portfolioPage` | **MISSING** | Referenced in portfolio.astro, PortfolioTimeline.svelte but not defined |
| `portfolio` tag | **MISSING** | Not in tagNames or tagDescriptions |
| Blog "Last updated on" | **MISSING** | Hardcoded in post page template |
| Blog page title/desc | Exists (`blogTitle`, `blogDescription`) | Defined but not used by blog pages (hardcoded instead) |

### 5.4 Utility Functions

| Function | Purpose | Status |
|----------|---------|--------|
| `getTranslations(lang)` | Get translation object | Working |
| `isValidLanguage(lang)` | Type guard | Working |
| `getDefaultLanguage()` | Returns 'en' | Working |

---

## 6. Blog Post Tag Consistency

| Post Slug | EN Tags | ES Tags | Match? |
|-----------|---------|---------|:-:|
| ejemplo | ["personal", "tech"] | ["personal", "tech"] | Yes |
| first-post | (none) | (none) | Yes |
| markdown-style-guide | ["personal"] | ["personal"] | Yes |
| personal-post-1 | ["personal"] | ["personal"] | Yes |
| personal-post-2 | ["personal"] | ["personal"] | Yes |
| second-post | ["tech"] | ["tech"] | Yes |
| third-post | ["personal"] | ["personal"] | Yes |
| using-mdx | ["personal"] | ["personal"] | Yes |
| project-autonomous-robot | ["portfolio", "tech"] | ["portfolio", "tech"] | Yes |
| project-devops-toolkit | ["portfolio", "tech"] | ["portfolio", "tech"] | Yes |

**Status:** All 10 post pairs have **perfect tag consistency** between EN and ES.

**Posts without tags:** `first-post` (both EN and ES)

**Tag usage distribution:**
- `personal` — 7 posts
- `tech` — 4 posts
- `portfolio` — 2 posts
- `talks` — 0 posts (defined but unused)
- `trading` — 0 posts (defined but unused)

---

## 7. Identified Issues (Prioritized)

### CRITICAL (P0) — Broken Functionality

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | `portfolioPage` translations missing | `translations.ts`, `portfolio.astro`, `PortfolioTimeline.svelte` | Portfolio pages will crash or show undefined values |
| 2 | `portfolio` tag missing from `tagNames`/`tagDescriptions` | `translations.ts` | Portfolio tags cannot be localized |

### MAJOR (P1) — Completely Missing i18n

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 3 | EducationSection — all Spanish, no lang prop | `src/components/home/EducationSection.astro` | English homepage shows Spanish content |
| 4 | ExperienceSection — all Spanish, no lang prop | `src/components/home/ExperienceSection.astro` | English homepage shows Spanish content |
| 5 | ProjectsSection — all Spanish, no lang prop | `src/components/home/ProjectsSection.astro` | English homepage shows Spanish content |
| 6 | SkillsSection — all Spanish, no lang prop | `src/components/home/SkillsSection.astro` | English homepage shows Spanish content |

### HIGH (P2) — Tag Localization Bug

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 7 | BlogCard displays raw tag identifiers | `BlogCard.svelte:84-95` | Shows `#tech` instead of `#Tech`/`#Tecnología` |
| 8 | StaticBlogSearch displays raw tags | `StaticBlogSearch.svelte` | Tags not localized in search/filter |
| 9 | BlogHeader displays raw tags | `BlogHeader.svelte` | Tags not localized in header |
| 10 | PortfolioTimeline displays raw tags | `PortfolioTimeline.svelte` | Tags not localized |
| 11 | Tag page titles use raw identifiers | `blog/tag/[tag].astro` (all 4 files) | "Posts tagged: tech" instead of localized |

### MEDIUM (P3) — Hardcoded Strings

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 12 | Blog index title/description hardcoded | `blog/index.astro`, `blog/page/[page].astro` | Should use `t.blogTitle`/`t.blogDescription` |
| 13 | "Last updated on" hardcoded | `blog/[...slug].astro` | English string on Spanish posts |
| 14 | BlogHeader has hardcoded ternary strings | `BlogHeader.svelte:18-24` | "Mostrando X de Y" pattern instead of translation |
| 15 | BlogPreviewSection hardcoded CTA | `BlogPreviewSection.astro:14-15` | "View all posts" ternary |
| 16 | ContactSection hardcoded ternary | `ContactSection.astro:8-12` | Title/description use ternary instead of translations |

### LOW (P4) — Minor UX Issues

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 17 | ThemeToggle aria-label hardcoded | `ThemeToggle.astro` | "Toggle dark mode" not translated |
| 18 | MobileMenu language names hardcoded | `MobileMenu.svelte:114,118` | "English"/"Español" text |
| 19 | BlogPagination aria-label hardcoded | `BlogPagination.svelte` | "Page X" not translated |
| 20 | Tag `.md` descriptions redundant with translations.ts | `src/content/tags/*.md` | Dual maintenance burden |

---

## 8. Recommendations

### For Task 2 (Tag Bilingual Strategy)

**Recommended: Approach A (Centralized translations.ts)** because:
- The translation system is already mature with 37 keys and perfect parity
- Tag names/descriptions already exist in translations.ts (just missing `portfolio`)
- Components already use `getTranslations()` — just need to use `t.tagNames[tag]`
- Minimal code changes required
- Consistent with how all other UI strings are handled
- Tag `.md` files should be simplified to just contain the slug (remove redundant descriptions)

### For Task 3 (Fix Tag Display)

Fix these components to use `t.tagNames[tag] || tag`:
- `BlogCard.svelte`
- `StaticBlogSearch.svelte`
- `BlogHeader.svelte`
- `PortfolioTimeline.svelte`

### For Task 5 (Missing Tags)

- Add tags to `first-post.md` (EN and ES) — likely `tech` or `personal`
- `using-mdx.mdx` already has `["personal"]` tag (initial plan info was outdated)

### For Task 6 (General i18n)

**Highest priority:** Issues 1-6 (P0 and P1) should be addressed:
- Add `portfolioPage` translations
- Add `portfolio` to `tagNames`/`tagDescriptions`
- Fix the 4 homepage sections that are entirely in Spanish

**Note:** The homepage sections (Education, Experience, Projects, Skills) represent a large amount of structured content that needs translation. Consider whether this is in scope for this plan or warrants a separate plan.

### Architecture Notes

- The translation system is well-designed and scalable
- The pattern of `getTranslations(lang)` works well
- The main issue is inconsistent adoption (some components use it, some don't)
- Blog pages that have both EN and ES versions sometimes duplicate hardcoded strings instead of using the translation system
