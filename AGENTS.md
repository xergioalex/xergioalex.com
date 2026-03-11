# AGENTS.md - Documentation for AI Agents

**Purpose:** Single source of truth for all AI coding assistants (Claude Code, Cursor AI, OpenAI Codex, Google Gemini, GitHub Copilot, and others). Ensures all agents work with consistent guidelines and patterns.

## Detailed Documentation

**Comprehensive guides for specific tasks:**

| Category | Guide | Purpose |
|----------|-------|---------|
| Architecture | [Architecture](docs/ARCHITECTURE.md) | Components, Content Collections, Svelte integration, project structure |
| Standards | [Standards](docs/STANDARDS.md) | Canonical coding rules, orthography, import order |
| Blog | [Blog Posts](docs/features/BLOG_POSTS.md) | Tags, series, hero layouts, images, content lifecycle |
| Blog Lifecycle | [Blog Content Lifecycle](docs/features/BLOG_CONTENT_LIFECYCLE.md) | End-to-end blog workflow |
| Writing Voice | [Writing Voice Guide](docs/WRITING_VOICE_GUIDE.md) | Anti-AI-slop checklist, author voice, vocabulary blocklist |
| Testing | [Testing](docs/TESTING_GUIDE.md) | Vitest setup, conventions, writing tests |
| Commands | [Development Commands](docs/DEVELOPMENT_COMMANDS.md) | npm scripts, Astro CLI, build workflows |
| i18n | [I18N Guide](docs/I18N_GUIDE.md) | Adding languages, translation workflow |
| Performance | [Performance](docs/PERFORMANCE.md) | Astro SSG optimization, image handling, caching |
| Accessibility | [Accessibility](docs/ACCESSIBILITY.md) | WCAG AA, contrast ratios, ARIA patterns |
| SEO | [SEO](docs/SEO.md) | Meta tags, structured data, multilingual SEO, AEO |
| Security | [Security](docs/SECURITY.md) | Static site security best practices |
| Documentation | [Documentation Guide](docs/DOCUMENTATION_GUIDE.md) | When and how to update docs |
| Product | [Product Spec](docs/PRODUCT_SPEC.md) | Product vision, features, website goals |
| Brand | [Brand Guide](docs/BRAND_GUIDE.md) | Visual identity, colors, typography |
| Analytics | [Analytics](docs/ANALYTICS.md) | Tracking, GSC, verification |
| AI Agents | [Agent Onboarding](docs/AI_AGENT_ONBOARDING.md), [Agent Collaboration](docs/AI_AGENT_COLLAB.md) | Setup, handoff, coordination |
| Skills/Agents | [Skills & Agents Catalog](.claude/docs/skills_agents_catalog.md) | Available skills and agents |
| Commands | [Commands Reference](.claude/docs/COMMANDS_REFERENCE.md) | All slash commands with procedure files |

## Project Overview

**XergioAleX.com** — Personal website and blog built with Astro. Modern design with dark mode, multilingual content (en/es), static site architecture deployed to Cloudflare Pages.

**Technology Stack:**

- **Astro 5.16.15** — Static site generator (islands architecture)
- **Svelte 5.48.0** — Interactive components
- **TypeScript 5.9.3** — Type-safe development
- **Tailwind CSS 4.1.18** — Utility-first styling with dark mode
- **Biome 2.3.11** — Linter and formatter (replaces ESLint + Prettier)
- **MDX** — Enhanced Markdown for blog posts

## Project Structure

> Full tree with all files: **[Architecture Guide](docs/ARCHITECTURE.md#project-structure)**

```
src/
├── components/          # UI components (Astro + Svelte)
│   ├── blog/            # Blog components (BlogCard, BlogGrid, Search)
│   ├── home/            # Homepage sections (Hero, Projects, Blog preview)
│   ├── layout/          # Header.svelte, MobileMenu.svelte
│   └── pages/           # Shared page components (*Page.astro)
├── content/             # Content Collections (blog posts, tags, series)
│   ├── blog/{en,es}/    # Blog posts by language (YYYY-MM-DD_slug.md)
│   ├── tags/            # Tag definitions (.md files with tier/order)
│   └── series/          # Series definitions
├── layouts/             # MainLayout, InternalLayout, ShowcaseLayout
├── lib/                 # Utilities (blog.ts, i18n.ts, translations/)
├── pages/               # File-based routing (EN root, ES in /es/)
│   ├── internal/        # Dev-only hub (excluded from production)
│   └── api/             # JSON endpoints
└── styles/              # global.css (Tailwind config)

public/images/blog/      # Blog images: posts/{slug}/, shared/, _staging/
scripts/                 # Build utilities (image optimization)
docs/                    # Project documentation
```

## CRITICAL: Mandatory Requirements

### 1. Language Standards

**ALL code, comments, and documentation MUST be in English.** Always update documentation after important changes.

### 2. Orthography & Diacritical Marks (MANDATORY)

**All user-facing text MUST use proper orthography.** Spanish content MUST include ñ (e.g., pequeño, diseño, español), accented vowels (e.g., análisis, código, página, versión), and interrogative accents (e.g., cómo, qué, cuál).

**Quick validation** before committing Spanish text:

```bash
grep -rn 'pequeno\|tamano\|diseno\|espanol\|manana' src/content/blog/es/ src/lib/translations/es.ts
grep -rn 'analisis\|numero\|codigo\|ejecucion\|version\|pagina\|titulo' src/content/blog/es/ src/lib/translations/es.ts
```

If any match is found, fix it before committing. Full word lists in **[Standards Guide](docs/STANDARDS.md)**.

### 3. Import Order Convention (MANDATORY)

```typescript
// 1. Node.js native modules
import { dirname, resolve } from 'node:path';

// 2. Third-party packages
import { defineConfig } from 'astro/config';
import { z } from 'astro:content';

// 3. Internal project modules (using @ alias)
import Header from '@/components/layout/Header.svelte';
import { SITE_TITLE } from '@/lib/constances';
import { getBlogPosts } from '@/lib/blog';

// 4. Type imports (separate group)
import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
```

### 4. Type Hints (RECOMMENDED)

Prefer explicit types on function signatures. Biome allows `any` for flexibility but explicit types are better. See **[Standards Guide](docs/STANDARDS.md)** for examples.

### 5. Code Quality (MANDATORY)

```bash
npm run biome:check        # Check linting and formatting
npm run biome:fix          # Auto-fix issues
npm run biome:fix:unsafe   # Fix with unsafe transformations
```

**DO NOT use ESLint or Prettier** — this project uses Biome exclusively.

### 6. Testing

```bash
npm run test               # Run all tests (single run)
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage report
```

Tests use `*.test.ts` naming in `tests/unit/`. Coverage target: 80%+ on `src/lib/`. See **[Testing Guide](docs/TESTING_GUIDE.md)**.

### 7. Multilingual Content Synchronization (MANDATORY)

**ALL content changes MUST be synchronized across all active languages (en/es).** No exceptions.

**Content type rules:**

- **Pages:** Create 1 shared `*Page.astro` in `src/components/pages/` + thin 3-line wrappers in `src/pages/` and `src/pages/es/` passing `lang` as string literal
- **Blog Posts:** Both `src/content/blog/en/` and `src/content/blog/es/` MUST have the equivalent post. Translate `title`, `description`, and body. Preserve `pubDate`, `heroImage`, `tags`, code blocks. **Use `/add-blog-post` skill for new posts.**
- **Translation Strings:** Add to BOTH `src/lib/translations/en.ts` and `es.ts`. Update `types.ts` with any new interface keys
- **Components:** Use `getTranslations(lang)` from `@/lib/translations`. Never hardcode user-visible strings
- **Agent-Friendly Markdown (MANDATORY):** When page or translation content changes, update the corresponding `src/content/pages/{en,es}/*.md` files. These serve as Markdown endpoints for AI agents and MUST stay in sync with the HTML content. See **[Markdown for Agents](docs/aeo/MARKDOWN_FOR_AGENTS.md)**.

**Compliance checklist:**

- [ ] Pages exist in both `src/pages/` and `src/pages/es/`
- [ ] Blog posts exist in both `src/content/blog/en/` and `src/content/blog/es/`
- [ ] UI strings in both `en.ts` and `es.ts`
- [ ] No hardcoded user-visible text
- [ ] Page Markdown files updated in both `src/content/pages/en/` and `src/content/pages/es/`

**Tools:** `/translate-sync` skill, `i18n-guardian` agent. Adding a new language: see **[I18N Guide](docs/I18N_GUIDE.md)**.

### 8. Performance-First Mindset (MANDATORY)

1. **Prefer static over dynamic** — use `.astro` for non-interactive content
2. **Choose the laziest hydration** — `client:visible` or `client:idle` over `client:load`
3. **Minimize JavaScript** — prefer CSS-only solutions over JS
4. **Use native browser APIs** — IntersectionObserver over scroll listeners, native `loading="lazy"`
5. **Optimize images** — always include dimensions, lazy load below-fold content
6. **Avoid layout shifts** — reserve space for async content, `font-display: swap`
7. **Keep search payload lean** — use language-sharded endpoints, minimal index schema
8. **Protect Lighthouse scores** — run `npm run search:budgets` after search changes

See **[Performance Guide](docs/PERFORMANCE.md)**.

### 9. Accessibility Standards (MANDATORY)

1. **WCAG AA contrast** — 4.5:1 normal text, 3:1 large text
2. **Approved text colors** — `text-gray-600 dark:text-gray-300` for secondary text. **NEVER** `text-gray-400`, `text-gray-500`, `dark:text-gray-400`, `dark:text-gray-500`
3. **Image dimensions** — every `<img>` must have `width` and `height`
4. **Semantic HTML** — proper heading hierarchy, landmarks, button vs link
5. **Text alternatives** — meaningful `alt` for informative images, `alt=""` for decorative
6. **Keyboard navigation** — all interactive elements focusable and operable
7. **ARIA** — disclosure pattern for nav dropdowns (not `role="menu"`)

See **[Accessibility Guide](docs/ACCESSIBILITY.md)**.

### 10. Analytics Verification Policy (MANDATORY)

1. Do not add or reintroduce `PUBLIC_GOOGLE_SITE_VERIFICATION`
2. Do not add `google-site-verification` meta tags in templates/components
3. Keep Bing verification as optional env-based meta tag (`PUBLIC_BING_SITE_VERIFICATION`)
4. GSC verification is DNS-only (Domain property DNS TXT)

## Shared Agent Coordination

Multiple AI agents collaborate on this codebase. When updating agent guidance, mirror changes across all relevant files. See **[AI Agent Collaboration](docs/AI_AGENT_COLLAB.md)**.

## Quick Commands

```bash
npm run dev                # Dev server (http://localhost:4444)
npm run build              # Production build (prebuild runs images:webp)
npm run astro:preview      # Preview production build
npm run biome:check        # Lint and format check
npm run biome:fix          # Auto-fix lint issues
npm run astro:check        # TypeScript type checking
npm run test               # Run unit tests
npm run test:coverage      # Tests with coverage
npm run images:optimize    # Process staged images
npm run lighthouse         # Lighthouse audit
npm run release            # Bump version and release commit
npm run ncu:check          # Check for package updates
```

Full command reference: **[Development Commands](docs/DEVELOPMENT_COMMANDS.md)**.

## Architecture Patterns

> Full patterns with code examples: **[Architecture Guide](docs/ARCHITECTURE.md)**

### 1. Astro Components

`.astro` files are the foundation. Script block (frontmatter) runs at build time. Use for all non-interactive content. Svelte is only for interactive components.

```astro
---
interface Props {
  title: string;
  count?: number;
}
const { title, count = 5 } = Astro.props;
---

<section class="py-12">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
</section>
```

### 2. Content Collections

Blog posts, tags, and series use Astro Content Collections with Zod schemas defined in `src/content.config.ts`.

### 3. Svelte Integration

Use Svelte for interactive components. Always include a `client:*` directive (`client:visible` preferred over `client:load`).

### 4. Page Wrapper Pattern (MANDATORY)

Pages in `src/pages/` are ultra-minimal 3-line routing wrappers. All logic lives in `*Page.astro` components in `src/components/pages/`.

**Key rules:**

- Page components handle `MainLayout` internally — wrappers **never** import `MainLayout`
- The `lang` prop is passed as a **string literal** (`"en"`, `"es"`), not a variable
- For a new page: create **1 `*Page.astro` component** + **N thin wrappers** (one per language)
- All user-visible text uses `getTranslations(lang)`, all URLs use `getUrlPrefix(lang)`

**Page component** (`src/components/pages/AboutPage.astro`):

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
import { getTranslations } from '@/lib/translations';
import { getUrlPrefix, type Language } from '@/lib/i18n';

interface Props { lang: Language; }
const { lang } = Astro.props;
const t = getTranslations(lang);
const prefix = getUrlPrefix(lang);
---

<MainLayout lang={lang} title={t.aboutPage.title} description={t.aboutPage.description}>
  <!-- page content using t.* for text, prefix for URLs -->
</MainLayout>
```

**Wrapper** (`src/pages/about.astro` — 3 lines):

```astro
---
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

### 5. i18n Routing

English pages at root (`src/pages/`), Spanish in `src/pages/es/`. Page components in `src/components/pages/` receive `lang` and handle translations internally.

### 6. Internal Hub (Dev-Only)

Dev-only portal at `/internal/`. Uses `InternalLayout` or `ShowcaseLayout` (never `MainLayout`). English-only, no Page Wrapper pattern. Automatically excluded from production builds via three layers (post-build deletion, sitemap filter, noindex meta).

## Blog Post Conventions

> Full reference: **[Blog Posts Guide](docs/features/BLOG_POSTS.md)**

**File naming:** `YYYY-MM-DD_slug.{md,mdx}` in `src/content/blog/{en,es}/`. Date prefix stripped from URLs.

**Tags:** Flat `tags` array in frontmatter. Tiers (primary/secondary/subtopic) resolved at build time from `src/content/tags/*.md`. Max 5 tags per post (1-2 primary + 1-3 secondary). Never auto-create tags without user approval.

**Series:** Posts reference `series: "{slug}"` and `seriesOrder: {n}` in frontmatter. Series defined in `src/content/series/`. Navigation renders automatically.

**Resources section:** Include external links (docs, repos, tools). Do NOT list related articles or previous chapters — they appear in the series navigation below.

**Hero layouts:** `banner` (default, landscape), `side-by-side` (square), `minimal` (thumbnail), `none` (text-only). Set based on image aspect ratio.

**Demo posts:** In `_demo/` folders only. Never shown in listings/search. Accessible by direct URL in dev only.

**Images:** Stored in `public/images/blog/posts/{slug}/`. Hero: `hero.{ext}`. Use `npm run images:optimize` for staged images.

**New post workflow:** Use `/add-blog-post` skill (mandatory). Do not create blog post files manually.

## Documentation Standards

Update docs after: adding components/pages, changing schemas, updating config, adding npm scripts, establishing patterns. See **[Documentation Guide](docs/DOCUMENTATION_GUIDE.md)**.

## Common Mistakes to Avoid

### DON'T:

1. Put interactive logic in `.astro` files (use Svelte)
2. Skip `client:*` directive for interactive Svelte components
3. Import `MainLayout` in page wrappers (it belongs inside `*Page.astro`)
4. Hardcode translatable text in templates
5. Create content without covering all active languages
6. Use `client:load` when `client:visible` or `client:idle` would suffice
7. Add JS solutions when CSS can achieve the same result
8. Use `text-gray-400`, `dark:text-gray-400`, or `dark:text-gray-500` for body text (fails WCAG AA)
9. Use `role="menu"` for nav dropdowns (use disclosure pattern)
10. Skip heading levels (e.g., h1 -> h3 without h2)
11. Forget `alt=""` on decorative images or `aria-label` on icon-only links
12. Use `MainLayout` for internal hub pages (use `InternalLayout` or `ShowcaseLayout`)
13. Add multilingual variants for internal pages (English-only, dev-only)
14. Reference `/internal/` pages from public pages
15. Name blog post files without date prefix (use `YYYY-MM-DD_slug.md`)
16. Put blog images outside `public/images/blog/posts/{slug}/`
17. Put demo posts outside `_demo/` folders
18. Write Spanish content without proper accents/tildes/ñ
19. List related articles or previous chapters in the Resources section when the post belongs to a series — they already appear in `#series-navigation` below; listing them is redundant
20. **Leave placeholder content in blog posts** — `[AUTHOR: ...]`, `[TODO: ...]`, `[TBD]`, or any bracketed "fill in later" text. Published posts must be complete. Zero tolerance.

### DO:

1. Use Biome for linting (`npm run biome:check` before commits)
2. Use Svelte for interactive components with appropriate `client:*` directive
3. Support dark mode with Tailwind's `dark:` variant
4. Use `@` path alias for imports
5. Use the Page wrapper pattern (thin wrappers + `*Page.astro`)
6. Create/update content in all active languages
7. Use `text-gray-600 dark:text-gray-300` for secondary text (WCAG AA)
8. Include `width` and `height` on all `<img>` elements
9. Use date-prefix naming for blog posts (`YYYY-MM-DD_slug.md`)
10. Verify Spanish diacritical marks before committing
11. Ensure no placeholder content in blog posts (`grep -rn '\[AUTHOR:\|\[AUTOR:\|\[TODO:\|\[TBD\]\|\[FIXME\]' src/content/blog/` → zero matches)

## Pre-Commit Checklist

- [ ] All code in English
- [ ] `npm run test` passes
- [ ] `npm run biome:check` passes
- [ ] `npm run astro:check` passes
- [ ] `npm run build` succeeds
- [ ] Dark mode works in new components
- [ ] Content in both English and Spanish
- [ ] Translation strings in both locale files
- [ ] Spanish content has correct diacritical marks
- [ ] No placeholder content in blog posts (`[AUTHOR:`, `[TODO:`, etc.)
- [ ] Meta descriptions: 130-160 characters (pages in translations, blog posts in frontmatter)
- [ ] Accessibility: approved text contrast, image dimensions, heading hierarchy
- [ ] Performance: lightest hydration, minimal JS
- [ ] Commit message in English (conventional format)

## Skills & Agents

- **Skills** — Reusable procedures via slash commands: `quick-fix`, `doc-edit`, `pr-review-lite`, `fix-lint`, `write-tests`, `type-fix`, `refactor-safe`, `security-check`, `git-commit-push`, `translate-sync`, `add-blog-post`, `promote-post`, `optimize-image`
- **Agents** — Specialized workers: `reviewer`, `executor`, `architect`, `security-auditor`, `i18n-guardian`, `content-writer`
- **Critical policy:** New blog posts MUST use `/add-blog-post` skill
- **Management:** `/skill-list`, `/agent-list`, `/skill-create`, `/agent-create`
- **Full catalog:** [Skills & Agents Catalog](.claude/docs/skills_agents_catalog.md)

### Execution Modes

| Mode | Support | Description |
|------|---------|-------------|
| Sequential | All agents | Default — tasks one at a time |
| Subagents | Claude Code | Helper agents within session |
| Team Agents | Claude Code only | Parallel instances with shared coordination |
| Orchestrator | All agents | Child DWPs in sub-repos |

See [Team Agents Reference](docs/technical/TEAM_AGENTS_REFERENCE.md) for details.

## ⚡ Slash Commands (All Agents)

**This section applies to ALL agents** — Claude Code, OpenAI Codex, Cursor AI, Gemini, and any other assistant.

### How to Invoke Commands

| Agent | Prefix | Example |
|-------|--------|---------|
| **Claude Code** | `/` (native) | `/add-blog-post` |
| **OpenAI Codex** | `#` | `#add-blog-post` |
| **Cursor AI** | `#` | `#add-blog-post` |
| **Gemini / others** | `#` | `#add-blog-post` |

> **Why `#` for non-Claude agents?** Most AI CLIs (Codex, Cursor) intercept `/` as their own system commands. Using `#` avoids interception. You can also write the command name in plain text: "run add-blog-post".

When a command is invoked (via `/`, `#`, or by name), the agent MUST:

1. **Look up** the command in **[Commands Reference](.claude/docs/COMMANDS_REFERENCE.md)** to find its procedure file
2. **READ** the linked procedure file completely
3. **FOLLOW** its step-by-step instructions exactly
4. **DO NOT** improvise or skip steps — the procedure file IS the spec

> **If a user prompt starts with `#`** (e.g., `#add-blog-post`, `#quick-fix`), treat it as a command invocation — look up the command name (without `#`) in the [Commands Reference](.claude/docs/COMMANDS_REFERENCE.md) and execute its procedure.

## Conventional Commits

**Format:** `<type>: <description>`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

Examples: `feat: add blog search functionality`, `fix: resolve dark mode toggle on mobile`
