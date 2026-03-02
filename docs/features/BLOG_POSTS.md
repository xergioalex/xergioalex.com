# Blog Posts

Comprehensive guide to the blog post system: file naming, directory structure, frontmatter schema, hero layouts, and image organization.

## Overview

Blog posts use Astro Content Collections with a bilingual structure (English/Spanish). Each post exists in both languages with matching slugs, and uses date-prefixed filenames for chronological ordering.

## AI Workflow (Mandatory)

For AI agents and assistants, new blog post creation in `src/content/blog/` must use `/add-blog-post`.

- Do not manually scaffold new post files unless the user explicitly asks to bypass the skill.
- The workflow must create/update both language versions in the same task.
- Use `/translate-sync` when parity corrections are needed for existing posts.

## File Naming Convention

**Format:** `YYYY-MM-DD_slug.{md,mdx}`

- The date prefix uses the post's `pubDate` value
- The separator is an underscore (`_`)
- The slug is kebab-case derived from the title
- The date prefix is **stripped from URLs** (clean slugs: `/blog/my-post/`)

**Examples:**

| Title | pubDate | Filename |
|-------|---------|----------|
| Getting Started with Astro | 2026-01-15 | `2026-01-15_getting-started-with-astro.md` |
| My Travel Adventures | 2024-03-20 | `2024-03-20_my-travel-adventures.md` |
| Mi Experiencia con Astro | 2026-02-01 | `2026-02-01_mi-experiencia-con-astro.md` |

**Slug extraction:** The `getPostSlug()` utility in `src/lib/blog.ts` strips both the language prefix and date prefix from post IDs:

```typescript
// "en/2026-01-15_getting-started-with-astro" -> "getting-started-with-astro"
// "es/2024-03-20_my-travel-adventures" -> "my-travel-adventures"
getPostSlug(post.id);
```

## Directory Structure

```
src/content/
├── blog/
│   ├── en/                              # English posts
│   │   ├── _demo/                       # Demo posts (dev only, never in production)
│   │   │   ├── 2025-01-01_demo-hero-banner.md
│   │   │   └── ...
│   │   ├── 2020-12-31_personal-branding-xergioalex.md
│   │   ├── 2022-07-08_first-post.md
│   │   └── ...
│   └── es/                              # Spanish posts (matching filenames)
│       ├── _demo/                       # Demo posts (matching en/_demo/)
│       │   └── ...
│       ├── 2020-12-31_personal-branding-xergioalex.md
│       └── ...
└── tags/                              # Unified taxonomy (17 tags)
    ├── tech.md                        # tier: primary
    ├── personal.md                    # tier: primary
    ├── talks.md                       # tier: primary
    ├── trading.md                     # tier: primary
    ├── portfolio.md                   # tier: primary
    ├── dailybot.md                    # tier: primary
    ├── demo.md                        # tier: primary (dev only)
    ├── web-development.md             # tier: secondary, order: 1
    ├── javascript.md                  # tier: secondary, order: 2
    ├── ai.md                          # tier: secondary, order: 3
    ├── blockchain.md                  # tier: secondary, order: 4
    ├── devops.md                      # tier: secondary, order: 5
    ├── python.md                      # tier: secondary, order: 6
    ├── university.md                  # tier: secondary, order: 7
    ├── database.md                    # tier: secondary, order: 8
    ├── iot.md                         # tier: secondary, order: 9
    └── design.md                      # tier: secondary, order: 10
```

**Bilingual requirement:** Every post **must** exist in both `en/` and `es/` with the **same filename**. Never create a post in only one language.

## Frontmatter Schema

Defined in `src/content.config.ts`:

```typescript
schema: z.object({
  title: z.string(),                    // Required - post title
  description: z.string(),             // Required - excerpt/description (50-160 chars recommended)
  pubDate: z.coerce.date(),            // Required - publication date
  updatedDate: z.coerce.date().optional(),  // Optional - last update date
  heroImage: z.string().optional(),    // Optional - path: /images/blog/posts/{slug}/hero.{ext}
  heroLayout: z.enum(['banner', 'side-by-side', 'minimal', 'none'])
    .default('banner').optional(),     // Optional - hero image display layout
  tags: z.array(z.string()).optional(), // Optional - must be existing tags
  series: z.string().optional(),        // Optional - references src/content/series/{slug}.md
  seriesOrder: z.number().optional(),   // Optional - chapter order when series is set
})
```

### Field Details

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title. Translated between languages. |
| `description` | Yes | 1-2 sentence excerpt. 50-160 chars recommended for SEO. Used in meta tags and Open Graph. |
| `pubDate` | Yes | Publication date. Accepts date-only (`'2026-01-31'`) or datetime (`'2026-01-31T14:00:00'`). Date-only defaults to midnight. |
| `updatedDate` | No | Last significant update. Displayed with "Last updated on" label. |
| `heroImage` | No | Path from `public/`. Convention: `/images/blog/posts/{slug}/hero.{ext}` |
| `heroLayout` | No | How the hero image is displayed. Default: `'banner'`. See [Hero Layouts](#hero-layouts). |
| `tags` | No | Array of tag identifiers. Must match files in `src/content/tags/`. |
| `series` | No | Series slug from `src/content/series/`. Required together with `seriesOrder`. |
| `seriesOrder` | No | Chapter number within the series. Required together with `series`. |

### Frontmatter Examples

**Example:**

```markdown
---
title: 'Building the XergioAleX Brand'
description: 'The story behind the XergioAleX personal brand and ninja coder identity.'
pubDate: '2020-12-31'
heroImage: '/images/blog/posts/personal-branding-xergioalex/hero.jpg'
heroLayout: 'side-by-side'
tags: ['portfolio', 'personal', 'design']
---
```

> **Note:** The `tags` array contains both primary (`portfolio`, `personal`) and secondary (`design`) tags. The tier is determined by the tag collection, not by position in the array.

### Translation Rules

When creating the translated version:

- **Translate:** `title`, `description`, and all body content
- **Preserve exactly:** `pubDate`, `updatedDate`, `heroImage`, `heroLayout`, `tags`, code blocks, formatting
- Use natural, idiomatic translations (not literal word-for-word)
- Do NOT translate code blocks, CLI commands, or technical identifiers
- Maintain the same markdown structure (headings, lists, emphasis)

## Hero Layouts

The `heroLayout` field controls how the hero image is displayed in the `BlogPostHeader` component (`src/components/blog/BlogPostHeader.astro`).

### `banner` (default)

Full-width image above the title. Best for **landscape/wide images** (16:9, 2:1 aspect ratio).

```
┌─────────────────────────────────────────┐
│                                         │
│            [  Full-width image  ]       │
│                                         │
├─────────────────────────────────────────┤
│          Dec 31, 2020 - 5 min           │
│    Building the XergioAleX Brand        │
│              #portfolio                 │
├─────────────────────────────────────────┤
│  Post content...                        │
└─────────────────────────────────────────┘
```

**Image dimensions:** Optimized to 1400x700px (cover fit).

### `side-by-side`

Two-column layout: title and metadata on the left, image on the right. Stacks vertically on mobile. Best for **square images** (1:1 aspect ratio).

```
┌─────────────────────────────────────────┐
│                           │             │
│  Dec 31, 2020 - 5 min    │             │
│  Building the XergioAleX  │   [Image]  │
│  Brand                    │             │
│  #portfolio               │             │
│                           │             │
├─────────────────────────────────────────┤
│  Post content...                        │
└─────────────────────────────────────────┘
```

**Image dimensions:** Optimized to 800x800px (cover fit) for square images. Max height `24rem` in display.

### `minimal`

Small thumbnail with text-focused layout. Image floats left at 160x160px (128x128px on mobile). Best for posts where **the image is secondary**.

```
┌─────────────────────────────────────────┐
│  ┌──────┐  Dec 31, 2020 - 5 min        │
│  │      │  Building the XergioAleX      │
│  │ img  │  Brand                        │
│  │      │  #portfolio                   │
│  └──────┘                               │
├─────────────────────────────────────────┤
│  Post content...                        │
└─────────────────────────────────────────┘
```

### `none`

No hero image area. Just title and metadata, centered. Best for **text-only posts** with no relevant image.

```
┌─────────────────────────────────────────┐
│          Dec 31, 2020 - 5 min           │
│    Building the XergioAleX Brand        │
│              #portfolio                 │
├─────────────────────────────────────────┤
│  Post content...                        │
└─────────────────────────────────────────┘
```

### Choosing a Layout

| Image type | Recommended layout |
|------------|-------------------|
| Landscape/wide (16:9, 2:1) | `banner` |
| Square (1:1) | `side-by-side` |
| Small icon/logo | `minimal` |
| No image | `none` |

## Image Organization

Blog images are stored in per-post folders under `public/images/blog/`:

```
public/images/blog/
├── posts/                    # Per-post image folders
│   ├── personal-branding-xergioalex/
│   │   ├── hero.jpg          # Hero/cover image
│   │   ├── full_logo_white.png
│   │   └── social_1.jpg      # Inline images
│   ├── first-post/
│   │   └── hero.jpg
│   └── {slug}/               # Folder name = post slug (no date prefix)
│       ├── hero.{ext}        # Hero image (required if using heroImage)
│       └── {name}.{ext}      # Additional inline images
├── shared/                   # Images shared across posts (placeholders, common assets)
└── _staging/                 # Incoming images for optimization (temporary)
```

### Naming Conventions

| Image type | Filename | Path in frontmatter |
|------------|----------|-------------------|
| Hero image | `hero.{jpg,png,webp}` | `/images/blog/posts/{slug}/hero.{ext}` |
| Inline image | `{descriptive-name}.{ext}` | `/images/blog/posts/{slug}/{name}.{ext}` |

- Folder name matches the post **slug** (without date prefix)
- Filenames use **lowercase kebab-case**
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`

### Referencing Images in Content

**In frontmatter (hero image):**

```markdown
---
heroImage: '/images/blog/posts/my-post-slug/hero.jpg'
---
```

**In markdown body (inline images):**

```markdown
![Description](/images/blog/posts/my-post-slug/screenshot.jpg)
```

## Image Optimization

Blog images are optimized using a **sharp-based pipeline**. See [IMAGE_OPTIMIZATION.md](./IMAGE_OPTIMIZATION.md) for the complete guide on:

- Staging workflow (`_staging/` directory)
- `npm run images:optimize` command
- Optimization presets and quality settings
- WebP variant generation
- One-off optimization of existing images

## Tag Taxonomy (Unified Collection)

Tags use a **unified taxonomy collection** with 3 tiers. Blog posts store a single `tags` array in frontmatter — the tier of each tag is resolved at build time from the tags collection.

### Architecture

```
Blog Post: tags: ["tech", "python", "database"]
                    │          │          │
                    ▼          ▼          ▼
Tags Collection:  primary   secondary  secondary
                    │          │          │
                    ▼          ▼          ▼
UI Display:      [blue]     [gray]     [gray]
```

**Key files:**
- `src/content/tags/*.md` — Tag definitions with tier, parent, order
- `src/lib/blog.ts` — `groupPostTags()`, `getTagTierMap()` (cached build-time lookup)
- `src/lib/translations/{en,es}.ts` — `tagNames` and `tagDescriptions` for all tiers

### Tag Collection Schema

Each tag is a `.md` file in `src/content/tags/`:

```yaml
---
name: "python"                    # Identifier (matches what's used in blog posts)
description: "Python ecosystem"   # Optional description
tier: secondary                   # primary | secondary | subtopic
parent: "tech"                    # Optional — for future hierarchical browsing
order: 6                          # Sort order within tier (secondary/subtopic)
---
```

### All Tags (17 total)

#### Primary Tags (7) — Section/Category

| Tag ID | Order | Description | Notes |
|--------|-------|-------------|-------|
| `tech` | 1 | Technical content | Main technology tag, parent of all secondary tags |
| `personal` | 2 | Personal posts | Life, reflections |
| `portfolio` | 3 | Portfolio/branding | Projects showcase |
| `talks` | 4 | Conference talks | Speaking events |
| `trading` | 5 | Trading content | Financial/trading |
| `dailybot` | 6 | DailyBot product | Product-specific |
| `demo` | 99 | Demo posts | Dev only (`_demo/` folders) |

#### Secondary Tags (10) — Content/Technology Topics

All secondary tags have `parent: "tech"`.

| Tag ID | Order | Parent | Description |
|--------|-------|--------|-------------|
| `web-development` | 1 | `tech` | Frontend/backend web technologies |
| `javascript` | 2 | `tech` | JavaScript ecosystem (Vue, Webpack, Node) |
| `ai` | 3 | `tech` | AI, machine learning, deep learning, LLMs |
| `blockchain` | 4 | `tech` | Blockchain, Ethereum, smart contracts |
| `devops` | 5 | `tech` | Docker, CI/CD, infrastructure |
| `python` | 6 | `tech` | Python ecosystem (Django, data science) |
| `university` | 7 | `tech` | University projects and coursework |
| `database` | 8 | `tech` | Database systems (SQL, NoSQL, MongoDB) |
| `iot` | 9 | `tech` | Internet of Things, hardware, sensors |
| `design` | 10 | `tech` | UI/UX design, WebVR, creative tech |

#### Subtopic Tags (0) — Fine-Grained (Future)

No subtopic tags exist yet. The tier is supported in schema and code. When needed, create tags with `tier: subtopic` and `parent: "python"` (for example).

### Assigning Tags to Posts

1. Choose 1-2 **primary tags** for section classification
2. Choose 1-3 **secondary tags** for content topics
3. Put ALL in a single `tags` array:

```yaml
tags: ["tech", "portfolio", "python", "database"]
```

### Adding a New Tag

1. **Verify criteria**: Tag applies to 3+ existing posts AND is expected to recur
2. Create `src/content/tags/{tag-name}.md` with `name`, `description`, `tier`, `order`, and `parent`
3. Add translations to `src/lib/translations/en.ts` and `es.ts` (`tagNames` + `tagDescriptions`)
4. Use it in blog posts — no schema or code changes needed
5. Build-time `validateTagHierarchy()` will verify parent references are valid

### Tag Governance

**Creation criteria by tier:**

| Tier | When to create | Who decides | Cap |
|------|---------------|-------------|-----|
| Primary | New site section (almost never) | User only | ~8 |
| Secondary | 3+ posts use it AND expected to recur | Agent proposes, user approves | ~20 |
| Subtopic | 3+ posts within parent use it | Agent proposes, user approves | ~15 |

**Rules:**
- Naming: lowercase, kebab-case (e.g., `web-development`)
- Max 5 tags per post (1-2 primary + 1-3 secondary/subtopic)
- Agents must NEVER auto-create tags without user approval
- Audit every ~20 posts: check for tags with <3 posts (merge/remove candidates)
- All routes unified: `/blog/tag/{tag}/` (all tiers share the same route)
- Build-time validation warns about invalid parent references

### Visual Rendering by Tier

| Context | Primary | Secondary/Subtopic |
|---------|---------|-------------------|
| Blog listing header | Blue filled pills | Gray bordered pills |
| Blog cards | Blue `#tag` badges | Gray bordered badges |
| Post detail header | Blue `#tag` badges | Gray bordered badges |
| Related articles | Blue (max 3) | Gray bordered (max 2) |

### Search Support

Topics are fully searchable. The API (`posts.json`) pre-groups tags by tier. Search scoring: title (0.0) > primary tags (0.1) > topics (0.15) > description (0.2).

**Note:** The `demo` tag is only used by demo posts in `_demo/` folders. Demo posts are never visible in production or in blog listings. They are only accessible by direct URL in local dev mode.

## Blog Post Series

Posts can belong to a **series** — a curated sequence of related posts (e.g., a multi-chapter tutorial, a project build log). Series use the same Content Collection pattern as tags: centralized metadata with build-time resolution.

### Architecture

```
Blog Post: series: "building-xergioalex", seriesOrder: 2
                    │                              │
                    ▼                              ▼
Series Collection: building-xergioalex.md    Sort position
                    │
                    ▼
SeriesNavigation:  TOC + prev/next links
```

### Series Collection Schema

Each series is a `.md` file in `src/content/series/`:

```yaml
---
name: "building-xergioalex"
title: "Building XergioAleX.com"
description: "The complete story of building a modern personal website."
order: 1
---
```

### Blog Frontmatter Fields

Add these optional fields to posts that belong to a series:

```yaml
series: "building-xergioalex"   # References series name
seriesOrder: 2                   # Chapter number (1, 2, 3...)
```

### Creating a New Series

1. Create `src/content/series/{series-slug}.md` with `name`, `title`, `description`, `order`
2. Add `series` and `seriesOrder` to each post's frontmatter (both EN and ES)
3. The `SeriesNavigation` component renders automatically on posts with series metadata

### SeriesNavigation Component

Located at `src/components/blog/SeriesNavigation.astro`. Renders between post content and Related Articles:

- Series title and description
- Table of contents listing all chapters (current chapter highlighted)
- Previous/Next chapter navigation links
- Bilingual (uses translation keys)
- Has `id="series-navigation"` for the floating indicator to target

### SeriesIndicator Component (Floating)

Located at `src/components/blog/SeriesIndicator.svelte`. A floating button in the bottom-right corner that makes series membership discoverable on long posts:

- **Visibility:** Appears when the `SeriesNavigation` panel is below the viewport (uses `IntersectionObserver`). Disappears when the reader scrolls the navigation into view.
- **Progress ring:** Circular SVG showing chapter position (e.g., filled 2/4 of the ring for chapter 2 of 4).
- **Label:** Two lines — "Chapter X of Y" and "All chapters" with a down arrow.
- **Action:** Clicking smooth-scrolls to the series navigation panel.
- **Styling:** Glassmorphism (`bg-white/95 backdrop-blur-sm ring-1 ring-blue-200`), slide-in animation from right. Dark mode supported.
- **Hydration:** Uses `client:load` since it needs to track scroll position immediately.

This pattern mirrors the `ScrollToTimeline.svelte` component used on portfolio and tech-talks pages (red floating pill), but with series-specific content and blue theming.

### Key Files

| File | Purpose |
|------|---------|
| `src/content/series/*.md` | Series definitions |
| `src/content.config.ts` | Series collection schema |
| `src/lib/blog.ts` | `getSeriesNavigation()` utility |
| `src/lib/types.ts` | `SeriesInfo`, `SeriesPost` types |
| `src/components/blog/SeriesNavigation.astro` | Navigation panel (TOC + prev/next) |
| `src/components/blog/SeriesIndicator.svelte` | Floating chapter indicator |
| `src/lib/translations/{en,es}.ts` | Series translation keys (`seriesPartOf`, `seriesChapterOf`, etc.) |

## URL Structure

Blog post URLs are clean (no date prefix):

| Type | URL pattern |
|------|-------------|
| English post | `/blog/{slug}/` |
| Spanish post | `/es/blog/{slug}/` |
| English tag page | `/blog/tag/{tag}/` |
| Spanish tag page | `/es/blog/tag/{tag}/` |
| English blog listing | `/blog/` |
| Spanish blog listing | `/es/blog/` |
| Paginated listing | `/blog/page/{n}/` |

## Key Source Files

| File | Purpose |
|------|---------|
| `src/content.config.ts` | Collection schema definition (Zod) — blog, tags, and series collections |
| `src/content/tags/*.md` | Tag definitions with tier, parent, order |
| `src/content/series/*.md` | Series definitions with name, title, description |
| `src/lib/blog.ts` | `getPostSlug()`, `getBlogPosts()`, `getRelatedPosts()`, `groupPostTags()`, `getTagTierMap()`, `getSeriesNavigation()` |
| `src/lib/translations/{en,es}.ts` | `tagNames` + `tagDescriptions` for all tiers |
| `src/components/blog/BlogPostHeader.astro` | Hero layout rendering (4 variants) with tier-aware tag display |
| `src/components/blog/BlogCard.svelte` | Post card in listings with tier-aware tag badges |
| `src/components/blog/BlogGrid.svelte` | Grid layout for post cards |
| `src/pages/blog/[...slug].astro` | Dynamic post page routing |
| `src/pages/blog/tag/[tag].astro` | Unified tag page (handles both primary and secondary tags) |
| `src/pages/blog/index.astro` | Blog listing page |
| `src/pages/api/posts.json.ts` | Search API — pre-groups tags by tier for client |
| `scripts/optimize-images.mjs` | Staging image optimizer |
| `scripts/optimize-existing-images.mjs` | One-off bulk optimizer |

## Content Lifecycle

Posts are either published or demo. See **[Blog Content Lifecycle](./BLOG_CONTENT_LIFECYCLE.md)** for the complete guide on:

- Published posts — visible in production and dev
- Demo posts (`_demo/` folder) — feature showcases, accessible only by direct URL in local dev mode

## Related Documentation

- [Blog Content Lifecycle](./BLOG_CONTENT_LIFECYCLE.md) - Published and demo post visibility
- [Image Optimization](./IMAGE_OPTIMIZATION.md) - Image pipeline and optimization workflow
- [Blog Search](./BLOG_SEARCH.md) - Client-side search functionality
- [Pagination](./PAGINATION.md) - Blog post pagination
- [Internationalization](./I18N.md) - Multi-language support
- [Public Assets](./PUBLIC_ASSETS.md) - Static assets structure
- [Architecture Guide](../ARCHITECTURE.md) - Overall site architecture
