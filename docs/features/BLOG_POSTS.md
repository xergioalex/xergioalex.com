# Blog Posts

Comprehensive guide to the blog post system: file naming, directory structure, frontmatter schema, hero layouts, and image organization.

## Overview

Blog posts use Astro Content Collections with a bilingual structure (English/Spanish). Each post exists in both languages with matching slugs, and uses date-prefixed filenames for chronological ordering.

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
└── tags/
    ├── tech.md
    ├── personal.md
    ├── talks.md
    ├── trading.md
    ├── portfolio.md
    └── demo.md                          # Demo tag (dev only)
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
  draft: z.boolean().default(false).optional(), // Optional - marks post as work-in-progress
})
```

### Field Details

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title. Translated between languages. |
| `description` | Yes | 1-2 sentence excerpt. 50-160 chars recommended for SEO. Used in meta tags and Open Graph. |
| `pubDate` | Yes | Publication date. Accepts various formats (`'Jan 31 2026'`, `2026-01-31`). Also used as date prefix in filename. If set to a future date, the post is **scheduled** (hidden until rebuild after that date). |
| `updatedDate` | No | Last significant update. Displayed with "Last updated on" label. |
| `heroImage` | No | Path from `public/`. Convention: `/images/blog/posts/{slug}/hero.{ext}` |
| `heroLayout` | No | How the hero image is displayed. Default: `'banner'`. See [Hero Layouts](#hero-layouts). |
| `tags` | No | Array of tag identifiers. Must match files in `src/content/tags/`. |
| `draft` | No | Set `true` to mark as work-in-progress. Hides post from production. Default: `false`. See [Content Lifecycle](./BLOG_CONTENT_LIFECYCLE.md). |

### Frontmatter Examples

**Published post:**

```markdown
---
title: 'Building the XergioAleX Brand'
description: 'The story behind the XergioAleX personal brand and ninja coder identity.'
pubDate: '2020-12-31'
heroImage: '/images/blog/posts/personal-branding-xergioalex/hero.jpg'
heroLayout: 'side-by-side'
tags: ['portfolio']
---
```

**Draft post (hidden from production):**

```markdown
---
title: 'Article Still Being Written'
description: 'Work in progress.'
pubDate: '2026-03-01'
tags: ['tech']
draft: true
---
```

**Scheduled post (auto-publishes on rebuild after pubDate):**

```markdown
---
title: 'Future Announcement'
description: 'Coming soon.'
pubDate: '2026-06-15'
tags: ['tech']
---
```

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

## Available Tags

Tags are defined as Content Collection entries in `src/content/tags/`:

| Tag ID | Description | Visibility |
|--------|-------------|------------|
| `tech` | Technical content | Always |
| `personal` | Personal posts | Always |
| `talks` | Conference talks | Always |
| `trading` | Trading content | Always |
| `portfolio` | Portfolio/branding | Always |
| `demo` | Demo posts showcasing blog features | Dev only (with `?preview=all`) |

Tags are referenced by their ID in frontmatter. Display names are localized via `translations.ts` using `t.tagNames[slug]`.

**Note:** The `demo` tag is only used by demo posts in `_demo/` folders. It is automatically hidden in production and in the default dev view. It only appears in the tag filter when `?preview=all` is active.

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
| `src/content.config.ts` | Collection schema definition (Zod) |
| `src/lib/blog.ts` | `getPostSlug()`, `getBlogPosts()`, `getRelatedPosts()`, reading time |
| `src/components/blog/BlogPostHeader.astro` | Hero layout rendering (4 variants) |
| `src/components/blog/BlogCard.svelte` | Post card in listings |
| `src/components/blog/BlogGrid.svelte` | Grid layout for post cards |
| `src/pages/blog/[...slug].astro` | Dynamic post page routing |
| `src/pages/blog/index.astro` | Blog listing page |
| `scripts/optimize-images.mjs` | Staging image optimizer |
| `scripts/optimize-existing-images.mjs` | One-off bulk optimizer |

## Content Lifecycle

Posts support draft, scheduled, and demo states. See **[Blog Content Lifecycle](./BLOG_CONTENT_LIFECYCLE.md)** for the complete guide on:

- Draft posts (`draft: true`) — work-in-progress, hidden from production
- Scheduled posts (future `pubDate`) — auto-publish on rebuild
- Demo posts (`_demo/` folder) — feature showcases, never in production
- Preview mode (`?preview=all`) — see all posts in dev mode
- Status badges and production safety

## Related Documentation

- [Blog Content Lifecycle](./BLOG_CONTENT_LIFECYCLE.md) - Draft, scheduled, demo posts, preview mode
- [Image Optimization](./IMAGE_OPTIMIZATION.md) - Image pipeline and optimization workflow
- [Blog Search](./BLOG_SEARCH.md) - Client-side search functionality
- [Pagination](./PAGINATION.md) - Blog post pagination
- [Internationalization](./I18N.md) - Multi-language support
- [Public Assets](./PUBLIC_ASSETS.md) - Static assets structure
- [Architecture Guide](../ARCHITECTURE.md) - Overall site architecture
