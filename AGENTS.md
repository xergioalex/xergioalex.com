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
- **[Testing Guide](docs/TESTING_GUIDE.md)** - Test conventions and future testing setup
- **[Development Commands](docs/DEVELOPMENT_COMMANDS.md)** - npm scripts, Astro CLI, build workflows

### Standards & Security

- **[Repository Standards](docs/STANDARDS.md)** - Canonical coding rules for all agents
- **[Security Guide](docs/SECURITY.md)** - Static site security best practices
- **[Performance Guide](docs/PERFORMANCE.md)** - Astro SSG optimization, image handling, caching

### AI Agent Guides

- **[AI Agent Onboarding](docs/AI_AGENT_ONBOARDING.md)** - Quick setup checklist for new agents
- **[AI Agent Collaboration](docs/AI_AGENT_COLLAB.md)** - Multi-agent handoff and communication guidelines

## Project Overview

**XergioAleX.com** is a personal website and blog built with Astro, featuring a modern design with dark mode support, multilingual content (English/Spanish), and a performant static site architecture deployed to GitHub Pages.

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
- GitHub Pages deployment

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
│   └── layout/
│       ├── Header.svelte    # Main navigation (interactive)
│       └── MobileMenu.svelte
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
├── layouts/
│   └── MainLayout.astro     # Base page layout
├── lib/                     # Utility functions
│   ├── blog.ts              # Post fetching, pagination
│   ├── constances.ts        # Site constants
│   ├── enum.ts              # Shared enums
│   └── types.ts             # TypeScript types
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
│   ├── api/
│   │   └── posts.json.ts    # Search API endpoint
│   └── rss.xml.js           # RSS feed
└── styles/
    └── global.css           # Global styles, Tailwind config

public/                      # Static assets
├── images/                  # Site images
│   └── blog/                # Blog images
│       ├── posts/{slug}/    # Per-post image folders
│       ├── shared/          # Shared images (placeholders)
│       └── _staging/        # Incoming images (temp)
├── icons/                   # Social icons
├── fonts/                   # Custom fonts
└── scripts/
    └── global.theme.js      # Theme persistence

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

### 5. Testing (NOT YET CONFIGURED)

Testing is not yet set up in this project. When adding tests in the future:

- Consider **Vitest** for unit tests
- Consider **Playwright** for E2E tests
- Test file naming: `*.test.ts` or `*.spec.ts`

Currently, `npm run test` is a placeholder.

### 6. Bilingual Content Synchronization (MANDATORY)

**This site is fully bilingual (English/Spanish). ALL content changes MUST be synchronized in both languages.**

When you create or modify content in one language, you MUST create or update the equivalent content in the other language within the same PR/commit. There are no exceptions to this rule.

#### Content Type Rules

**Pages:**
- When creating or modifying a page in `src/pages/`, the corresponding page in `src/pages/es/` MUST be created or updated with the translated content, and vice versa.
- Both pages must use the correct `lang` value (`'en'` or `'es'`) and pass it to `MainLayout` and child components.

**Blog Posts:**
- When creating or modifying a blog post in `src/content/blog/en/`, the corresponding post in `src/content/blog/es/` MUST be created or updated with the translated content, and vice versa.
- Translate `title`, `description`, and body content. Preserve `pubDate`, `updatedDate`, `heroImage`, `tags`, code blocks, and formatting.

**Translation Strings:**
- When adding new UI strings to `src/lib/translations.ts`, translations MUST be added for BOTH English and Spanish simultaneously.
- Never leave a translation key with a value in only one language.

**Components:**
- Components with user-visible text MUST use `getTranslations(lang)` from `@/lib/translations`.
- Never hardcode user-visible strings directly in templates.
- If a component introduces new translation keys, add them to `translations.ts` in both languages.

#### Bilingual Compliance Checklist

Before committing any content change, verify:

- [ ] All new/modified pages exist in both `src/pages/` and `src/pages/es/`
- [ ] All new/modified blog posts exist in both `src/content/blog/en/` and `src/content/blog/es/`
- [ ] All new UI strings in `translations.ts` have both English and Spanish values
- [ ] No hardcoded user-visible text in components (use `getTranslations()`)

#### Tools for Bilingual Work

- Use `/translate-sync` skill for synchronizing content between languages
- Use `i18n-guardian` agent for translation quality review and bilingual audits

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
npm run dev                # Start dev server (http://localhost:4321)
npm run build              # Production build with type check
npm run build:ghpages      # Build for GitHub Pages (outputs to docs/)
npm run astro:preview      # Preview production build

# Code Quality
npm run biome:check        # Check linting and formatting
npm run biome:fix          # Auto-fix issues
npm run biome:fix:unsafe   # Fix with unsafe transformations
npm run astro:check        # TypeScript type checking

# Package Management
npm run ncu:check          # Check for package updates
npm run ncu:upgrade        # Upgrade all packages

# Images
npm run images:optimize    # Process staged images (resize, compress, move)

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

### 5. Layout Pattern

All pages use `MainLayout.astro`:

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
---

<MainLayout lang="en" title="Page Title" description="Page description">
  <section>Page content here</section>
</MainLayout>
```

### 6. i18n Pattern

Language-specific routes with `lang` prop:

```
src/pages/
├── index.astro          # English (default)
└── es/
    └── index.astro      # Spanish
```

Components receive `lang` prop for translations.

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

### Blog Post Hero Layouts

Posts support a `heroLayout` frontmatter field:

- `banner` (default): Full-width image above title. Best for landscape/wide images (16:9, 2:1).
- `side-by-side`: Two-column layout -- title left, image right. Best for square images (1:1). Stacks on mobile.
- `minimal`: Small thumbnail with text-focused layout. For posts where the image is secondary.
- `none`: No hero image area. For text-only posts.

When creating a post, choose the layout based on the hero image aspect ratio.

### Blog Post Status & Visibility

Posts support a content lifecycle with multiple visibility states controlled by a `draft` frontmatter field and the `pubDate`:

| Status | Frontmatter | Condition | Production | Dev |
|--------|------------|-----------|:----------:|:---:|
| Published | `draft: false` (default) | `pubDate <= now` | Visible | Visible |
| Scheduled | `draft: false` | `pubDate > now` | Hidden (auto-publishes on rebuild) | Visible (badge) |
| Draft | `draft: true` | any | Hidden | Visible (badge) |
| Draft + Scheduled | `draft: true` | `pubDate > now` | Hidden | Visible (badges) |
| Demo | any | File in `_demo/` folder | Hidden | Visible (badge) |

**Draft field:** Add `draft: true` to frontmatter to mark a post as work-in-progress. Omitting `draft` or setting `draft: false` means the post is eligible for publishing.

**Scheduling:** Set `pubDate` to a future date. The post will automatically become visible when the site is rebuilt after that date.

**Preview mode:** Visit `/blog/?preview=all` in dev mode to see all posts including drafts, scheduled, and demo posts. A toggle link appears in dev mode to switch between published-only and all-posts views.

### Demo Posts

Demo posts showcase blog features and are stored in:
- `src/content/blog/en/_demo/` (English)
- `src/content/blog/es/_demo/` (Spanish)

Demo posts are **never** visible in production builds. They serve as references for:
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
8. Use `npm run test` expecting real tests (not configured yet)
9. Create new pages without using `MainLayout`
10. Forget dark mode support in new components
11. Create content (pages, blog posts) in only one language
12. Add translation strings for only one language in `translations.ts`
13. Name blog post files without date prefix (use `YYYY-MM-DD_slug.md`)
14. Put blog images in random locations (use `public/images/blog/posts/{slug}/`)
15. Commit unoptimized large images (use `npm run images:optimize`)
16. Forget to set `draft: true` on work-in-progress posts
17. Put demo posts outside `_demo/` folders
18. Forget that scheduled posts require a site rebuild to go live

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
10. Keep pages simple, delegate to components
11. Always create/update content in both English and Spanish
12. Use `/translate-sync` when synchronizing existing content between languages
13. Use date-prefix naming for blog posts (`YYYY-MM-DD_slug.md`)
14. Set `heroLayout` based on image aspect ratio
15. Use the image staging and optimization workflow
16. Use `draft: true` for work-in-progress posts
17. Use `?preview=all` to view drafts/scheduled posts in dev mode
18. Keep demo posts in `_demo/` folders (they're filtered automatically)

## Pre-Commit Checklist

- [ ] All code in English
- [ ] `npm run biome:check` passes
- [ ] `npm run astro:check` passes (no TypeScript errors)
- [ ] `npm run build` succeeds
- [ ] Dark mode works in new components
- [ ] Content exists in both English and Spanish versions (pages, blog posts)
- [ ] Translation strings added for both languages in `translations.ts` (if applicable)
- [ ] Documentation updated if needed
- [ ] Draft posts have `draft: true` in frontmatter
- [ ] Demo posts are in `_demo/` folders only
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
