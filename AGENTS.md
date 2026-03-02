# AGENTS.md - Documentation for AI Agents

**Purpose:** This file is the **single source of truth** for all AI coding assistants working with this repository, including:

- **Claude Code** (via `CLAUDE.md` import using `@AGENTS.md`)
- **Cursor AI** (can reference this file directly)
- **OpenAI Codex (ChatGPT)**
- **Google Gemini (Antigravity)**
- **GitHub Copilot**
- **Other AI coding assistants**

This ensures all agents work in harmony with consistent guidelines, coding standards, and architectural patterns.

## 📚 Detailed Documentation

**For comprehensive information, refer to these detailed guides:**

### Core Documentation

- **[Product Specification](docs/PRODUCT_SPEC.md)** - Product vision, features, and website goals
- **[Architecture Guide](docs/ARCHITECTURE.md)** - Astro components, Content Collections, Svelte integration
- **[Testing Guide](docs/TESTING_GUIDE.md)** - Vitest setup, test conventions, and writing tests
- **[Development Commands](docs/DEVELOPMENT_COMMANDS.md)** - npm scripts, Astro CLI, build workflows

### Standards & Security

- **[Repository Standards](docs/STANDARDS.md)** - Canonical coding rules for all agents
- **[Security Guide](docs/SECURITY.md)** - Static site security best practices
- **[Performance Guide](docs/PERFORMANCE.md)** - Astro SSG optimization, image handling, caching
- **[SEO Guide](docs/SEO.md)** - Meta tags, structured data, multilingual SEO, AEO, PageSpeed

### AI Agent Guides

- **[AI Agent Onboarding](docs/AI_AGENT_ONBOARDING.md)** - Quick setup checklist for new agents
- **[AI Agent Collaboration](docs/AI_AGENT_COLLAB.md)** - Multi-agent handoff and communication guidelines

## Project Overview

**XergioAleX.com** is a personal website and blog built with Astro, featuring a modern design with dark mode support, multilingual content (English/Spanish), and a performant static site architecture deployed to Cloudflare Pages.

**Technology Stack:**

- **Astro 5.16.15** - Static site generator with islands architecture
- **Svelte 5.48.0** - Interactive components
- **TypeScript 5.9.3** - Type-safe development
- **Tailwind CSS 4.1.18** - Utility-first styling with dark mode
- **Biome 2.3.11** - Fast linter and formatter (replaces ESLint + Prettier)
- **MDX** - Enhanced Markdown for blog posts

**Key Features:**

- Blog with Content Collections
- Multilingual support (en/es)
- Dark mode toggle
- RSS feed and sitemap
- Client-side search
- Image optimization pipeline (sharp)
- Cloudflare Pages deployment

## Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── BaseHead.astro       # SEO meta tags, Open Graph
│   ├── Footer.astro         # Site footer with social links
│   ├── ThemeToggle.astro    # Dark mode toggle
│   ├── blog/                # Blog-specific components
│   │   ├── BlogCard.svelte  # Post card (interactive)
│   │   ├── BlogGrid.svelte  # Grid layout
│   │   ├── BlogPagination.svelte
│   │   └── StaticBlogSearch.svelte
│   ├── home/                # Homepage sections
│   │   ├── HeroSection/
│   │   ├── BlogPreviewSection.astro
│   │   ├── ProjectsSection.astro
│   │   └── ...
│   ├── layout/
│   │   ├── Header.svelte    # Main navigation (interactive)
│   │   └── MobileMenu.svelte
│   └── pages/               # Shared page components (lang-agnostic)
│       ├── HomePage.astro
│       ├── AboutPage.astro
│       ├── blog/            # Shared blog page components
│       └── ...
├── content/                 # Content Collections
│   ├── blog/                # Blog posts (Markdown/MDX)
│   │   ├── en/              # English posts (YYYY-MM-DD_slug.md)
│   │   │   └── _demo/      # Demo posts (dev only)
│   │   └── es/              # Spanish posts (YYYY-MM-DD_slug.md)
│   │       └── _demo/      # Demo posts (dev only)
│   └── tags/                # Tag definitions
│       ├── tech.md
│       └── personal.md
├── content.config.ts        # Collection schemas (Zod)
├── integrations/            # Custom Astro integrations
│   └── exclude-internal.ts  # Removes /internal from production builds
├── layouts/
│   ├── MainLayout.astro     # Base page layout (public pages)
│   ├── InternalLayout.astro # Internal Hub layout (dev-only, self-contained)
│   └── ShowcaseLayout.astro # Design System layout (dev-only, self-contained)
├── lib/                     # Utility functions
│   ├── blog.ts              # Post fetching, pagination
│   ├── i18n.ts              # Centralized i18n config & utilities
│   ├── constances.ts        # Site constants
│   ├── enum.ts              # Shared enums
│   ├── types.ts             # TypeScript types
│   └── translations/        # Modular translation system
│       ├── index.ts         # Public API barrel: getTranslations(), re-exports
│       ├── types.ts         # SiteTranslations interface + all sub-interfaces
│       ├── en.ts            # English translations
│       └── es.ts            # Spanish translations
├── pages/                   # File-based routing
│   ├── index.astro          # Homepage (English)
│   ├── es/index.astro       # Homepage (Spanish)
│   ├── about.astro
│   ├── contact.astro
│   ├── blog/
│   │   ├── index.astro      # Blog listing
│   │   ├── [...slug].astro  # Dynamic post pages
│   │   ├── page/[page].astro
│   │   └── tag/[tag].astro
│   ├── internal/            # Internal Hub (dev-only, excluded from production)
│   │   ├── index.astro      # Hub landing page
│   │   ├── sitemap.astro    # Auto-generated sitemap
│   │   ├── ui/              # UI Design System Showcase (11 pages)
│   │   └── guide/           # Staff Guide (3 pages)
│   ├── api/
│   │   └── posts.json.ts    # Search API endpoint
│   └── rss.xml.js           # RSS feed
└── styles/
    └── global.css           # Global styles, Tailwind config

public/                      # Static assets (84 files, ~5.5 MB)
├── favicon.svg              # Site favicon
├── robots.txt               # Crawling rules
├── llms.txt                 # LLM-readable site summary
├── images/                  # Site images (~5.4 MB)
│   ├── (root images)        # Brand, section, profile (10 files)
│   └── blog/                # Blog images
│       ├── posts/{slug}/    # Per-post image folders
│       ├── shared/          # Shared images (placeholders)
│       └── _staging/        # Incoming images (temp)
├── icons/                   # Social icons (paired light/dark)
├── fonts/                   # Custom fonts (Atkinson Hyperlegible)
└── scripts/
    └── (theme script inlined in layouts)

scripts/                     # Build/utility scripts
├── optimize-images.mjs      # Staging image optimizer
└── optimize-existing-images.mjs  # One-off optimizer

docs/                        # Project documentation
```

## CRITICAL: Mandatory Requirements

### 1. Language Standards

**ALL code, comments, and documentation MUST be in English.**

✅ Code, comments, docs, commits, variable names in English
❌ Never use Spanish or any other language in code

**Always update documentation after important changes.**

### 2. Import Order Convention (MANDATORY)

Follow this import order in all TypeScript/Astro/Svelte files:

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

### 3. Type Hints (RECOMMENDED)

TypeScript is configured but with relaxed rules (Biome allows `any` for flexibility). However, prefer explicit types when possible:

```typescript
// Function signatures should have type annotations
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Use Astro's built-in types
import type { CollectionEntry } from 'astro:content';
type BlogPost = CollectionEntry<'blog'>;
```

### 4. Code Quality (MANDATORY)

**Use Biome for linting and formatting:**

```bash
# Check for issues
npm run biome:check

# Auto-fix issues
npm run biome:fix

# Fix with unsafe transformations
npm run biome:fix:unsafe
```

**❌ DO NOT use ESLint or Prettier** - This project uses Biome exclusively.

### 5. Testing

This project uses **Vitest** for unit and component testing with **@testing-library/svelte** for Svelte components.

```bash
npm run test               # Run all tests (single run)
npm run test:watch         # Watch mode
npm run test:coverage      # Run with coverage report
```

- Test files use `*.test.ts` naming convention
- Tests live in `tests/unit/lib/` (utilities) and `tests/unit/components/` (Svelte)
- Mock data in `tests/fixtures/posts.ts`
- Coverage target: 80%+ on `src/lib/`
- See **[Testing Guide](docs/TESTING_GUIDE.md)** for full details

### 6. Multilingual Content Synchronization (MANDATORY)

**This site is multilingual-ready (currently English/Spanish). ALL content changes MUST be synchronized across all active languages.**

When you create or modify content in one language, you MUST create or update the equivalent content in the other language within the same PR/commit. There are no exceptions to this rule.

#### Content Type Rules

**Pages:**
- When creating a new page, create **1 shared component** in `src/components/pages/*Page.astro` + **thin wrappers** in `src/pages/` and `src/pages/es/` (one per language).
- Wrappers are 3-line files that only import the component and pass `lang` as a string literal (`"en"`, `"es"`).
- The shared component handles `MainLayout`, translations, and all content internally.

**Blog Posts:**
- When creating or modifying a blog post in `src/content/blog/en/`, the corresponding post in `src/content/blog/es/` MUST be created or updated with the translated content, and vice versa.
- Translate `title`, `description`, and body content. Preserve `pubDate`, `updatedDate`, `heroImage`, `tags`, code blocks, and formatting.

**Translation Strings:**
- When adding new UI strings to `src/lib/translations/`, translations MUST be added for BOTH English and Spanish simultaneously.
- Add new keys to both `src/lib/translations/en.ts` and `src/lib/translations/es.ts`.
- Update `src/lib/translations/types.ts` if the new keys require interface changes.
- Never leave a translation key with a value in only one language.

**Components:**
- Components with user-visible text MUST use `getTranslations(lang)` from `@/lib/translations`.
- Never hardcode user-visible strings directly in templates.
- If a component introduces new translation keys, add them to both locale files in `src/lib/translations/`.

#### Multilingual Compliance Checklist

Before committing any content change, verify:

- [ ] All new/modified pages exist in both `src/pages/` and `src/pages/es/`
- [ ] All new/modified blog posts exist in both `src/content/blog/en/` and `src/content/blog/es/`
- [ ] All new UI strings added to both `src/lib/translations/en.ts` and `src/lib/translations/es.ts`
- [ ] Translation types updated in `src/lib/translations/types.ts` if needed
- [ ] No hardcoded user-visible text in components (use `getTranslations()`)

#### Tools for Multilingual Work

- Use `/translate-sync` skill for synchronizing content between languages
- Use `i18n-guardian` agent for translation quality review and multilingual audits

#### How to Add a New Language

The architecture is designed so adding a new language requires zero changes to components or utilities:

1. **Update i18n config** (`src/lib/i18n.ts`):
   - Add the language code to the `Language` type union (e.g., `'en' | 'es' | 'pt'`)
   - Add a `LanguageConfig` entry to the `LANGUAGES` registry

2. **Add translations** (`src/lib/translations/`):
   - Create a new locale file `src/lib/translations/{lang}.ts` (e.g., `pt.ts`)
   - Export a complete `SiteTranslations` object using `en.ts` as a reference
   - Import the new locale in `src/lib/translations/index.ts` and add it to the `translations` record

3. **Create page wrappers** (`src/pages/{lang}/`):
   - Create `src/pages/{lang}/` directory
   - Copy thin wrapper files from `src/pages/es/` and change `lang` value
   - Each file is ~5 lines (import + render with new lang)

4. **Create blog content directory** (`src/content/blog/{lang}/`):
   - Create `src/content/blog/{lang}/` for translated blog posts

5. **Verify**: `npm run biome:check && npm run astro:check && npm run build`

### 7. Performance-First Mindset (MANDATORY)

**Performance is a core architectural value of this project.** Astro was chosen specifically for its performance characteristics. Every change MUST consider performance impact.

**Rules for all agents:**

1. **Prefer static over dynamic** — use `.astro` components for non-interactive content
2. **Choose the laziest hydration** — `client:visible` or `client:idle` over `client:load` unless immediate interactivity is required
3. **Minimize JavaScript** — prefer CSS-only solutions (transitions, scroll-behavior, animations) over JS equivalents
4. **Use native browser APIs** — IntersectionObserver over scroll listeners, native `loading="lazy"` over JS lazy-loaders
5. **Optimize images** — always include dimensions, use lazy loading for below-fold content
6. **Avoid layout shifts** — reserve space for async content, use `font-display: swap`

**Before any change, ask:** Does this add JS? Could it use a lighter hydration? Could CSS do this instead?

**See [Performance Guide](docs/PERFORMANCE.md) for comprehensive optimization strategies.**

### 8. Accessibility Standards (MANDATORY)

**This site targets WCAG 2.1 AA compliance and Lighthouse Accessibility score of 100.** Every UI change MUST maintain accessibility.

**Rules for all agents:**

1. **Meet WCAG AA contrast ratios** — 4.5:1 for normal text, 3:1 for large text (>=18px or >=14px bold)
2. **Use approved text color pairings** — `text-gray-600 dark:text-gray-300` for secondary text. **NEVER** use `text-gray-400`, `text-gray-500` alone, `dark:text-gray-400`, or `dark:text-gray-500`
3. **Always include image dimensions** — every `<img>` must have `width` and `height` to prevent CLS
4. **Use semantic HTML** — proper heading hierarchy (no skipped levels), landmark elements, button vs link
5. **Provide text alternatives** — meaningful `alt` for informative images, `alt=""` for decorative
6. **Support keyboard navigation** — all interactive elements must be focusable and operable
7. **Use ARIA correctly** — disclosure pattern for nav dropdowns (not `role="menu"`), `role="progressbar"` for skill bars

**Before any UI change, ask:** Does the text contrast pass 4.5:1? Are images dimensioned? Is the heading hierarchy correct?

**See [Accessibility Guide](docs/ACCESSIBILITY.md) for complete standards and approved color pairings.**

## Shared Agent Coordination - CRITICAL

**Multiple AI agents collaborate on this codebase:**

1. **Cursor AI** - Guided by `.cursorrules` (if exists)
2. **Claude Code** - Guided by `CLAUDE.md`
3. **OpenAI Codex (ChatGPT)** - Guided by this file (`AGENTS.md`)
4. **Google Gemini** - Guided by this file (`AGENTS.md`)

**MANDATORY SYNCHRONIZATION**: When updating agent guidance, mirror changes across all relevant files.

**Synchronize**: Patterns, standards, architectural practices, common mistakes
**Don't sync**: Agent-specific workflows

**See [AI Agent Collaboration](docs/AI_AGENT_COLLAB.md) for detailed coordination guidelines.**

## Quick Commands

```bash
# Development
npm run dev                # Start dev server (http://localhost:4444)
npm run build              # Production build with type check
npm run build              # Production build (outputs to dist/; prebuild runs images:webp)
npm run astro:preview      # Preview production build

# Code Quality
npm run biome:check        # Check linting and formatting
npm run biome:fix          # Auto-fix issues
npm run biome:fix:unsafe   # Fix with unsafe transformations
npm run astro:check        # TypeScript type checking

# Testing
npm run test               # Run unit tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage report

# Package Management
npm run ncu:check          # Check for package updates
npm run ncu:upgrade        # Upgrade all packages

# Images
npm run images:optimize    # Process staged images (resize, compress, move)

# Lighthouse
npm run lighthouse         # Run Lighthouse audit on built dist/ (requires Chrome)

# Release
npm run release            # Bump version and create release commit
```

## Architecture Patterns

### 1. Astro Component Pattern

Astro components (`.astro`) are the foundation:

```astro
---
// Component Script (runs at build time)
import { getCollection } from 'astro:content';
import BlogCard from '@/components/blog/BlogCard.svelte';

interface Props {
  title: string;
  count?: number;
}

const { title, count = 5 } = Astro.props;
const posts = await getCollection('blog');
---

<!-- Component Template -->
<section class="py-12">
  <h2 class="text-2xl font-bold">{title}</h2>
  {posts.slice(0, count).map((post) => (
    <BlogCard client:load post={post} />
  ))}
</section>

<style>
  /* Scoped styles */
  section { max-width: 1200px; margin: 0 auto; }
</style>
```

### 2. Content Collections Pattern

Blog posts and tags use Astro Content Collections:

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroLayout: z.enum(['banner', 'side-by-side', 'minimal', 'none']).default('banner').optional(),
    tags: z.array(z.string()).optional(),
  }),
});
```

### 3. Svelte Integration Pattern

Use Svelte for interactive components with `client:load`:

```astro
---
import Header from '@/components/layout/Header.svelte';
---

<!-- Hydrate on page load for interactivity -->
<Header client:load lang={lang} />
```

### 4. API Route Pattern

Server endpoints in `src/pages/api/`:

```typescript
// src/pages/api/posts.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
};
```

### 5. Page Wrapper Pattern (MANDATORY)

**All content pages use the Page wrapper pattern.** Pages in `src/pages/` are ultra-minimal 3-line routing wrappers. The real logic (MainLayout, translations, SEO metadata, content) lives inside `*Page.astro` components in `src/components/pages/`.

**Page component** (`src/components/pages/AboutPage.astro`) — handles everything internally:

```astro
---
// src/components/pages/AboutPage.astro
import MainLayout from '@/layouts/MainLayout.astro';
import { getTranslations } from '@/lib/translations';
import { getUrlPrefix } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = getTranslations(lang);
const prefix = getUrlPrefix(lang);
---

<MainLayout lang={lang} title={t.aboutPage.title} description={t.aboutPage.description}>
  <section>
    <h1>{t.aboutPage.title}</h1>
    <!-- Page content using t.* for text and prefix for URLs -->
  </section>
</MainLayout>
```

**Page wrappers** (3 lines, only routing + lang):

```astro
---
// src/pages/about.astro (EN wrapper)
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

```astro
---
// src/pages/es/about.astro (ES wrapper)
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="es" />
```

**Key rules:**
- Page components handle `MainLayout` internally — wrappers never import `MainLayout`
- The `lang` prop is passed as a **string literal** (`"en"`, `"es"`), not a variable
- For a new page: create **1 `*Page.astro` component** + **N thin wrappers** (one per language)
- All user-visible text uses `getTranslations(lang)`, all URLs use `getUrlPrefix(lang)`

**Benefits:** DRY (one component per page), scalable to N languages, content changes in a single file.

### 6. i18n Pattern

Language-specific routes with `lang` prop:

```
src/pages/
├── index.astro          # English (default) — wrapper: <HomePage lang="en" />
├── about.astro          # English — wrapper: <AboutPage lang="en" />
└── es/
    ├── index.astro      # Spanish — wrapper: <HomePage lang="es" />
    └── about.astro      # Spanish — wrapper: <AboutPage lang="es" />
```

Page components in `src/components/pages/` receive `lang` and handle all translations internally.

### 7. Internal Hub (Dev-Only Documentation Portal)

**The Internal Hub is a dev-only documentation portal at `/internal/` that is automatically excluded from production builds.** It provides a visual design system reference, development guides, and an auto-generated sitemap for developers and AI agents.

**Three pillars:**
1. **UI Design System Showcase** (`/internal/ui/`) — Visual reference for all design tokens and components (colors, typography, spacing, radius, buttons, badges, cards, forms, layouts, brand)
2. **Staff Guide** (`/internal/guide/`) — Development documentation (tech stack, file structure, naming conventions)
3. **Auto-Generated Sitemap** (`/internal/sitemap`) — Build-time discovery of all site pages

**Key architecture rules:**
- **Dev-only:** Visible at `http://localhost:4444/internal/` during `npm run dev`. **Never deployed to production.**
- **Three-layer production exclusion:**
  1. Post-build deletion via `src/integrations/exclude-internal.ts` (`astro:build:done` hook)
  2. Sitemap XML filter in `astro.config.mjs` (excludes `/internal/` URLs)
  3. `<meta name="robots" content="noindex, nofollow">` on all internal pages
- **Self-contained layouts:** `InternalLayout.astro` and `ShowcaseLayout.astro` have their own `<html>/<head>/<body>`. They **NEVER** use `MainLayout`.
- **English-only:** No multilingual variants, no translation keys needed.
- **No Page Wrapper pattern:** Internal pages are standalone `.astro` files in `src/pages/internal/`, not thin wrappers.
- **Staging builds:** Set `INCLUDE_INTERNAL=true` environment variable to keep internal pages in build output.

**When to use each layout:**
- `InternalLayout` — Hub landing page, sitemap, and Staff Guide pages. Uses `section` and optional `subsection` props for sidebar navigation.
- `ShowcaseLayout` — UI Design System pages. Uses `section` prop for flat navigation across design categories.

**Adding new internal pages:**
1. Create an `.astro` file in `src/pages/internal/` (or a subdirectory)
2. Import `InternalLayout` or `ShowcaseLayout` (never `MainLayout`)
3. The page automatically appears in the auto-generated sitemap
4. The page is automatically excluded from production builds

## Documentation Standards

### When to Update Documentation

- ✅ After adding new components or pages
- ✅ After changing Content Collection schemas
- ✅ After updating configuration files
- ✅ After adding new npm scripts
- ✅ After establishing new patterns

### Documentation Files

Complex features should include documentation:

```
src/components/blog/
├── README.md              # Component overview
├── BlogCard.svelte
├── BlogGrid.svelte
└── ...
```

### Analysis Results Convention

The `analysis_results/` folder is an optional convention for storing analysis reports, research outputs, and investigation artifacts within `docs/` directories.

| Aspect | Detail |
|--------|--------|
| **Location** | `docs/{any-subfolder}/analysis_results/` |
| **Required?** | No — created only when analysis work produces shareable artifacts |
| **Naming** | `SCREAMING_SNAKE_CASE.md` (e.g., `PERFORMANCE_AUDIT.md`) |
| **Git tracked?** | Yes by default — commit if the analysis has lasting value |
| **Cleanup** | Remove when findings are integrated into permanent docs or no longer relevant |

> This is distinct from DWP plan `analysis_results/` folders, which are auto-created inside plan folders and are temporary execution artifacts.

## Blog Post Conventions

### Blog Post File Naming

Blog posts use date-prefix naming for chronological ordering:

- **Format:** `YYYY-MM-DD_slug.{md,mdx}` (underscore separator)
- **Example:** `2024-03-15_my-awesome-post.md`
- **Location:** `src/content/blog/en/` and `src/content/blog/es/`
- The date prefix is stripped from URLs (clean slugs: `/blog/my-awesome-post/`)
- Use the post's `pubDate` as the date prefix
- Use `getPostSlug()` from `@/lib/blog` to extract clean slugs from post IDs

### Blog Tag Taxonomy (Unified Collection)

The blog uses a **unified taxonomy collection** with a single `tags` array in blog post frontmatter. Tag tiers are defined in the tags collection (`src/content/tags/*.md`), NOT in the blog posts themselves.

#### Architecture

```
Blog Post Frontmatter          Tags Collection (src/content/tags/)
┌────────────────────┐         ┌──────────────────────────────┐
│ tags:              │         │ tech.md     → tier: primary  │
│   - tech           │────────►│ python.md   → tier: secondary│
│   - portfolio      │  build  │ portfolio.md→ tier: primary  │
│   - python         │  time   │ database.md → tier: secondary│
│   - database       │ lookup  └──────────────────────────────┘
└────────────────────┘                      │
                                            ▼
                               groupPostTags() splits by tier
                               ┌─────────────────────────────┐
                               │ primaryTags: [tech, portfolio]│
                               │ topicTags: [python, database] │
                               └─────────────────────────────┘
```

**Key principle:** Blog posts store a flat `tags` array. The tier (primary/secondary/subtopic) is resolved at **build time** from the tags collection. Zero runtime cost, zero Lighthouse impact.

#### Three Tiers

| Tier | Purpose | Visual Style | Example Tags |
|------|---------|-------------|--------------|
| `primary` | Section/category classification | Blue filled badges | `tech`, `personal`, `talks`, `trading`, `portfolio`, `dailybot` |
| `secondary` | Content/technology classification | Gray bordered badges | `web-development`, `javascript`, `ai`, `blockchain`, `devops`, `python`, `university`, `database`, `iot`, `design` |
| `subtopic` | Fine-grained specialization (future) | Gray bordered badges (same as secondary) | Not yet used — ready for when needed |

#### Tag Collection Schema

Each tag is a `.md` file in `src/content/tags/` with this frontmatter:

```yaml
---
name: "python"                    # Tag identifier (must match what's used in blog posts)
description: "Python ecosystem"   # Optional description
tier: secondary                   # primary | secondary | subtopic
parent: "tech"                    # Optional — parent tag for future hierarchical browsing
order: 6                          # Sort order within tier (all tiers)
---
```

#### Current Tags (17 total)

**Primary (7):** `tech` (order: 1), `personal` (2), `portfolio` (3), `talks` (4), `trading` (5), `dailybot` (6), `demo` (99)

**Secondary (10):** All have `parent: "tech"`. `web-development` (order: 1), `javascript` (2), `ai` (3), `blockchain` (4), `devops` (5), `python` (6), `university` (7), `database` (8), `iot` (9), `design` (10)

**Subtopic (0):** None yet — the tier is supported in schema and code but not populated. When needed, use `tier: subtopic` with `parent` referencing a secondary tag (e.g., `parent: "python"`).

#### Key Utilities (`src/lib/blog.ts`)

| Function | Purpose |
|----------|---------|
| `getTagTierMap()` | Cached build-time lookup: tag name → tier |
| `getTagTier(name)` | Get tier of a single tag |
| `groupPostTags(tags)` | Split unified array into `{ primaryTags, topicTags }` |
| `getRelatedPosts()` | Weighted scoring: primary match = 2 points, secondary/subtopic = 1 point |
| `validateTagHierarchy()` | Build-time validation: orphaned parents, primary-with-parent, non-primary parents (warns, doesn't break) |

#### How to Assign Tags to a Blog Post

1. Choose 1-2 **primary tags** (section classification): `tech`, `personal`, `talks`, `trading`, `portfolio`, `dailybot`
2. Choose 1-3 **secondary tags** (topic classification): `web-development`, `javascript`, `ai`, etc.
3. Put ALL of them in a single `tags` array:

```yaml
tags: ["tech", "portfolio", "python", "database"]
```

#### How to Add a New Tag

1. Create a `.md` file in `src/content/tags/` (e.g., `typescript.md`)
2. Set `tier`, `order`, and optionally `parent`
3. Add translations to both `src/lib/translations/en.ts` and `es.ts` (`tagNames` + `tagDescriptions`)
4. Use it in blog posts — no schema changes needed

#### Tag Governance Rules

**Creation criteria by tier:**

| Tier | When to create | Who decides | Cap |
|------|---------------|-------------|-----|
| Primary | New site section (almost never) | User only, manually | ~8 |
| Secondary | Topic applies to 3+ posts AND expected to recur | Agent proposes, user approves | ~20 |
| Subtopic | Topic applies to 3+ posts within parent AND needs granularity | Agent proposes, user approves | ~15 |

**New tag requirements:**
- Name: lowercase, kebab-case (e.g., `web-development`)
- Must include: `name`, `description`, `tier`, `order`, and `parent` (for secondary/subtopic)
- Translations required in both `en.ts` and `es.ts` (`tagNames` + `tagDescriptions`)
- Maximum 5 total tags per post (1-2 primary + 1-3 secondary/subtopic)

**What agents must NOT do:**
- Auto-create tags without user approval
- Use a tag not defined in `src/content/tags/`
- Skip the 3-post threshold when proposing new tags

**Audit cadence:**
- Every new post: `add-blog-post` skill checks existing tags, proposes new only if criteria met
- Every ~20 posts: check for tags with <3 posts (candidates for removal/merger)
- Build-time: `validateTagHierarchy()` warns about invalid parent references

**All routes unified:** `/blog/tag/{tag}/` handles both primary and secondary tags

#### Visual Rendering

| Context | Primary Tags | Secondary/Subtopic Tags |
|---------|-------------|------------------------|
| Blog listing pills | Blue filled `bg-blue-600` (active) / `bg-blue-100` | Gray bordered `border-gray-200` |
| Blog cards | Blue `bg-blue-100 text-blue-800` with `#` prefix | Gray bordered `border-gray-200 text-gray-600` |
| Post detail header | Blue filled with `#` prefix | Gray bordered without `#` prefix |
| Related articles | Blue (max 3 shown) | Gray bordered (max 2 shown) |

#### Search Support

Topics are fully searchable. The search API (`posts.json`) pre-groups tags by tier. Search scoring: title (0.0) > primary tags (0.1) > topics (0.15) > description (0.2).

#### Future Scalability

The `parent` field and `subtopic` tier are ready for hierarchical tag browsing (e.g., "Tech > Python > Django"). Adding subtopic tags requires zero code changes — just create `.md` files with `tier: subtopic` and `parent: "python"`

### Blog Post Series

Posts can belong to a **series** — a curated sequence of related posts displayed with chapter navigation. Series use the Content Collection pattern (same as tags).

**How it works:**
- Series are defined in `src/content/series/{slug}.md` with `name`, `title`, `description`, `order`
- Blog posts reference a series via `series: "{slug}"` and `seriesOrder: {n}` in frontmatter
- `SeriesNavigation.astro` renders a TOC + prev/next panel at the bottom of each series post
- `SeriesIndicator.svelte` renders a floating button (bottom-right) showing "Chapter X of Y" with a progress ring, visible when the navigation panel is below the viewport. Uses `IntersectionObserver` + `client:load`. Mirrors the `ScrollToTimeline.svelte` pattern from portfolio/tech-talks pages.

**Creating a new series:**
1. Create `src/content/series/{series-slug}.md`
2. Add `series` and `seriesOrder` to each post's frontmatter (both EN and ES)
3. Build — the navigation panel and floating indicator appear automatically

**Current series:**
- `building-xergioalex` — "Building XergioAleX.com" (4 chapters)

**Key files:** `src/content/series/*.md`, `src/content.config.ts` (series schema), `src/lib/blog.ts` (`getSeriesNavigation()`), `src/components/blog/SeriesNavigation.astro`, `src/components/blog/SeriesIndicator.svelte`

### Blog Post Hero Layouts

Posts support a `heroLayout` frontmatter field:

- `banner` (default): Full-width image above title. Best for landscape/wide images (16:9, 2:1).
- `side-by-side`: Two-column layout -- title left, image right. Best for square images (1:1). Stacks on mobile.
- `minimal`: Small thumbnail with text-focused layout. For posts where the image is secondary.
- `none`: No hero image area. For text-only posts.

When creating a post, choose the layout based on the hero image aspect ratio.

### Blog Post Visibility

All blog posts are visible in both production and dev. The only special case is **demo posts** in `_demo/` folders:

| Type | Location | Production | Dev (listing) | Dev (direct URL) |
|------|----------|:----------:|:-------------:|:----------------:|
| Regular post | `src/content/blog/{lang}/` | Visible | Visible | Visible |
| Demo post | `src/content/blog/{lang}/_demo/` | Hidden | Hidden | Accessible |

Demo posts are **never** shown in blog listings, tag pages, RSS feeds, or search. They are only accessible by direct URL in local dev mode (`import.meta.env.DEV`) and serve as structural references for AI agents.

### Demo Posts

Demo posts showcase blog features and are stored in:
- `src/content/blog/en/_demo/` (English)
- `src/content/blog/es/_demo/` (Spanish)

Demo posts are **never** listed or built in production. In local dev, they are accessible by direct URL only. They serve as references for:
- Hero layout variations (banner, side-by-side, minimal, none)
- MDX capabilities
- Rich Markdown formatting
- Code syntax highlighting across languages

### Blog Image Organization

Images are stored in per-post folders:

```
public/images/blog/
├── posts/{slug}/           # Per-post folders
│   ├── hero.{ext}          # Hero/cover image
│   └── {name}.{ext}        # Inline images
├── shared/                 # Shared across posts (placeholders)
└── _staging/               # Incoming images (temp)
```

**Naming conventions:**

- Hero images: `hero.{jpg,png,webp}`
- Inline images: `{descriptive-name}.{ext}` (lowercase, kebab-case)
- Folder name matches the post slug (without date prefix)
- Hero image path in frontmatter: `/images/blog/posts/{slug}/hero.jpg`

**Image optimization:**

- Use `npm run images:optimize` to process staged images
- Drop images in `_staging/` with naming: `{slug}--{name}.{ext}`
- Script resizes (max 1400px heroes, 1200px others), compresses, and moves to final destination
- Use `--webp` flag for WebP variants, `--dry-run` for preview

## Common Mistakes to Avoid

### ❌ DON'T:

1. Write code/docs in Spanish (English only)
2. Use ESLint or Prettier (use Biome)
3. Forget to run `npm run biome:check` before committing
4. Put interactive logic in `.astro` files (use Svelte)
5. Skip the `client:*` directive for interactive Svelte components
6. Hardcode text that should be translatable
7. Forget to update Content Collection schemas after changing frontmatter
8. Forget to run `npm run test` before committing (tests are configured)
9. Import `MainLayout` directly in page wrappers (use the Page wrapper pattern — `MainLayout` belongs inside `*Page.astro` components)
10. Forget dark mode support in new components
11. Create content (pages, blog posts) without covering all active languages
12. Add translation strings without covering all active languages in `src/lib/translations/`
13. Name blog post files without date prefix (use `YYYY-MM-DD_slug.md`)
14. Put blog images in random locations (use `public/images/blog/posts/{slug}/`)
15. Commit unoptimized large images (use `npm run images:optimize`)
16. Put demo posts outside `_demo/` folders
19. Use `client:load` when `client:visible` or `client:idle` would suffice
20. Add JS-based solutions when CSS can achieve the same result
21. Forget to include image dimensions (causes layout shifts)
22. Use `text-gray-400`, `dark:text-gray-400`, or `dark:text-gray-500` for body text (fails WCAG AA contrast)
23. Use `role="menu"` for navigation dropdowns (use disclosure pattern instead)
24. Skip heading levels (e.g., h1 -> h3 without h2)
25. Forget `alt=""` on decorative images or `aria-label` on icon-only links
26. Use `MainLayout` for internal hub pages (use `InternalLayout` or `ShowcaseLayout` instead)
27. Add multilingual variants for internal pages (they are English-only, dev-only)
28. Forget that `/internal/` pages are excluded from production builds — never reference them from public pages

### ✅ DO:

1. Write all code in English
2. Use Biome for linting and formatting
3. Run `npm run biome:check` before commits
4. Use Svelte for interactive components
5. Add `client:load` or `client:visible` for Svelte components
6. Support dark mode with Tailwind's `dark:` variant
7. Use Content Collections for structured content
8. Follow the established component patterns
9. Use the `@` path alias for imports
10. Use the Page wrapper pattern: thin 3-line wrappers in `src/pages/`, logic in `src/components/pages/*Page.astro`
11. Always create/update content in all active languages (see `src/lib/i18n.ts`)
12. Use `/translate-sync` when synchronizing content across languages
13. Add new translation strings to both locale files in `src/lib/translations/`
13. Use date-prefix naming for blog posts (`YYYY-MM-DD_slug.md`)
14. Set `heroLayout` based on image aspect ratio
15. Use the image staging and optimization workflow
16. Keep demo posts in `_demo/` folders (they're filtered automatically)
19. Consider performance impact of every change (see [Performance Guide](docs/PERFORMANCE.md))
20. Use the lightest hydration directive that works (`client:visible` > `client:load`)
21. Prefer CSS-only solutions over JavaScript when possible
22. Use `text-gray-600 dark:text-gray-300` for secondary/body text (WCAG AA compliant)
23. Include `width` and `height` on all `<img>` elements
24. Use `alt=""` for decorative images, meaningful alt for informative images
25. Follow the [Accessibility Guide](docs/ACCESSIBILITY.md) for ARIA patterns and contrast rules
26. Use `InternalLayout` or `ShowcaseLayout` for new internal hub pages (never `MainLayout`)
27. Browse `/internal/` in dev mode to reference design tokens and project documentation
28. Add new design system pages to `/internal/ui/` when establishing new UI patterns

## Pre-Commit Checklist

- [ ] All code in English
- [ ] `npm run test` passes (all unit tests)
- [ ] `npm run biome:check` passes
- [ ] `npm run astro:check` passes (no TypeScript errors)
- [ ] `npm run build` succeeds
- [ ] Dark mode works in new components
- [ ] Content exists in both English and Spanish versions (pages, blog posts)
- [ ] Translation strings added for both languages in `src/lib/translations/` (if applicable)
- [ ] Documentation updated if needed
- [ ] Demo posts are in `_demo/` folders only
- [ ] Performance considered (lightest hydration, minimal JS, no layout shifts)
- [ ] Accessibility: text contrast uses approved pairings (see [Accessibility Guide](docs/ACCESSIBILITY.md))
- [ ] Accessibility: all images have `width`, `height`, and appropriate `alt` text
- [ ] Commit message in English (conventional format)

## 🧠 Skills & Agents System

This repository includes a system for creating reusable **Skills** and **Agents** that help AI assistants work more effectively.

### What Are Skills and Agents?

- **Skills**: Reusable "how-to" procedures invoked via slash commands (e.g., `/quick-fix`, `/doc-edit`)
- **Agents**: Specialized worker personas for specific tasks (e.g., `reviewer`, `executor`, `architect`)

**Available in this repo:** Skills: `quick-fix`, `doc-edit`, `pr-review-lite`, `fix-lint`, `write-tests`, `type-fix`, `refactor-safe`, `security-check`, `git-commit-push`, `translate-sync`, `add-blog-post`. Agents: `reviewer`, `executor`, `architect`, `security-auditor`, `i18n-guardian`, `content-writer`.

Full list and usage: [.claude/docs/skills_agents_catalog.md](.claude/docs/skills_agents_catalog.md).

### Quick Commands

```bash
/skill-create           # Create a new skill (guided)
/skill-list             # List available skills
/agent-create           # Create a new agent (guided)
/agent-list             # List available agents
```

### 3-Tier Model Strategy

| Tier  | Name     | Use Case                        | Model      |
| ----- | -------- | ------------------------------- | ---------- |
| **1** | Light    | Simple fixes, formatting, docs  | Cheap/Fast |
| **2** | Standard | Features, tests, safe refactors | Standard   |
| **3** | Heavy    | Architecture, planning, complex | Frontier   |

### Key Files

| File                                                              | Purpose               |
| ----------------------------------------------------------------- | --------------------- |
| `.agent_commands/agent_skills_generator/GUIDE_TO_CREATE_SKILLS_AND_AGENTS.md` | Complete guide        |
| `.agent_commands/agent_skills_generator/MASTER_PROMPT.md`         | Generation prompt     |
| `.agent_commands/agent_skills_generator/MODEL_ROUTING.md`         | Tier routing rules    |
| `.claude/docs/skills_agents_catalog.md`                           | Available skills/agents |

### Output Locations

- Skills: `.claude/skills/{skill-name}/SKILL.md`
- Agents: `.claude/agents/{agent-name}.md`

---

## Quick Reference Links

### Documentation

- [Product Spec](docs/PRODUCT_SPEC.md)
- [Brand Guide](docs/BRAND_GUIDE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Testing](docs/TESTING_GUIDE.md)
- [Commands](docs/DEVELOPMENT_COMMANDS.md)
- [Standards](docs/STANDARDS.md)
- [Security](docs/SECURITY.md)
- [Performance](docs/PERFORMANCE.md)
- [SEO](docs/SEO.md)
- [Analytics](docs/ANALYTICS.md)
- [Accessibility](docs/ACCESSIBILITY.md)
- [Blog Posts](docs/features/BLOG_POSTS.md)
- [Blog Content Lifecycle](docs/features/BLOG_CONTENT_LIFECYCLE.md)
- [AI Agent Onboarding](docs/AI_AGENT_ONBOARDING.md)
- [AI Agent Collaboration](docs/AI_AGENT_COLLAB.md)

### External Resources

- [Astro Documentation](https://docs.astro.build/)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Biome Documentation](https://biomejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Conventional Commits

**Format**: `<type>: <description>`

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

**Examples:**

- `feat: add blog search functionality`
- `fix: resolve dark mode toggle on mobile`
- `docs: update architecture guide with Content Collections`
- `style: improve blog card hover effects`
- `refactor: extract common blog utilities to lib/`
- `perf: optimize image loading in hero section`
