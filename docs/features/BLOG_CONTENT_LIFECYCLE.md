# Blog Content Lifecycle

Comprehensive guide to the blog post visibility system: draft posts, scheduled publishing, demo content, preview mode, and the `demo` tag.

## Overview

Blog posts in this project support a content lifecycle with multiple visibility states. This allows authors to work on drafts, schedule future publications, and maintain demo content for feature showcasing — all without affecting the production site.

**Key principle:** Production builds only show posts with status `published`. All other states (draft, scheduled, demo) are development-only features.

## Post Visibility States

Every blog post has a **status** determined by two factors: the `draft` frontmatter field and the `pubDate` value. Demo posts are identified by their file location (`_demo/` folder).

### Status Table

| Status | `draft` field | `pubDate` condition | Production | Dev (default) | Dev (`?preview=all`) |
|--------|:------------:|:-------------------:|:----------:|:-------------:|:--------------------:|
| **Published** | `false` (default) | `<= now` | Visible | Visible | Visible |
| **Scheduled** | `false` | `> now` | Hidden | Hidden | Visible (badge) |
| **Draft** | `true` | `<= now` | Hidden | Hidden | Visible (badge) |
| **Draft + Scheduled** | `true` | `> now` | Hidden | Hidden | Visible (badges) |
| **Demo** | any | any | Hidden | Hidden | Visible (badge) |

### Status Detection Logic

Content status is determined by `getPostStatus()` in `src/lib/blog.ts`:

```typescript
function getPostStatus(post: CollectionEntry<'blog'>): PostStatus {
  const isDraft = post.data.draft === true;
  const isScheduled = post.data.pubDate.valueOf() > Date.now();

  if (isDraft && isScheduled) return 'draft+scheduled';
  if (isDraft) return 'draft';
  if (isScheduled) return 'scheduled';
  return 'published';
}
```

Demo detection is separate via `isDemoPost(post)` which checks `post.id.includes('/_demo/')`. This allows demo posts to also show their content status (draft, scheduled) alongside the demo badge.

### Datetime Support

The `pubDate` field supports both date-only and datetime formats:

```yaml
# Date-only (time defaults to midnight UTC)
pubDate: '2026-03-15'

# Datetime with specific time (for precise scheduling)
pubDate: '2026-03-15T14:00:00'
```

When a scheduled post uses datetime format, the status badge and detail page banner will show the time alongside the date. Date-only posts show only the date (no "00:00" displayed).

---

## Draft Posts

Drafts are work-in-progress posts that are hidden from production but visible in dev preview mode.

### Creating a Draft

Add `draft: true` to the frontmatter:

```markdown
---
title: 'My Work in Progress Article'
description: 'This article is still being written.'
pubDate: '2026-02-15'
tags: ['tech']
draft: true
---

Content being worked on...
```

### Draft Behavior

- **Production:** Completely hidden — not in listings, tag pages, search, or RSS
- **Dev default:** Hidden (simulates production view)
- **Dev `?preview=all`:** Visible with an amber "Draft" badge overlay on the card
- **Schema default:** `draft` defaults to `false`. Omitting `draft` means the post is eligible for publishing.

### Publishing a Draft

To publish a draft, either:
1. Remove the `draft` field entirely, or
2. Set `draft: false`

Both have the same effect — the post becomes `published` (assuming `pubDate` is not in the future).

---

## Scheduled Posts

Scheduled posts have a future `pubDate` and will automatically become visible when the site is rebuilt after that date.

### Creating a Scheduled Post

Set `pubDate` to a future date:

```markdown
---
title: 'Upcoming Feature Announcement'
description: 'Details about an exciting new feature.'
pubDate: '2026-06-15'
tags: ['tech']
---

This post will go live on June 15, 2026.
```

### Scheduled Behavior

- **Production:** Hidden until a site rebuild occurs after `pubDate`
- **Dev `?preview=all`:** Visible with a blue "Scheduled" badge showing the publish date
- Posts do NOT auto-publish — they require a site rebuild (deploy) after `pubDate`
- Cloudflare Pages deployments trigger on push to main, so schedule a rebuild or push for the post to go live

### Draft + Scheduled

A post can be both draft AND scheduled:

```markdown
---
title: 'Future Article (Still Drafting)'
pubDate: '2026-12-01'
draft: true
---
```

This post shows both badges in preview mode and requires both conditions to be cleared before publishing: remove `draft: true` AND wait for `pubDate` to pass (or change it to a past date).

---

## Demo Posts

Demo posts showcase blog features and serve as **structural references** for formatting, layouts, and capabilities. They are **never** visible in production, regardless of other frontmatter settings.

### Purpose for AI Agents

**When writing new blog posts, agents SHOULD read the demo posts in `src/content/blog/en/_demo/` as templates.** These files demonstrate the correct structure, frontmatter patterns, formatting conventions, and layout options for different article types. Before creating a new post, review the relevant demo post(s) to match the appropriate structure (e.g., read `demo-hero-banner.md` if using a landscape hero, `demo-code-showcase.md` if the article has code blocks).

### Location

Demo posts are stored in dedicated `_demo/` subdirectories:

```
src/content/blog/
├── en/
│   ├── _demo/                    # English demo posts
│   │   ├── 2025-01-01_demo-hero-banner.md
│   │   ├── 2025-01-02_demo-hero-side-by-side.md
│   │   ├── 2025-01-03_demo-hero-minimal.md
│   │   ├── 2025-01-04_demo-hero-none.md
│   │   ├── 2025-01-05_demo-mdx-showcase.mdx
│   │   ├── 2025-01-06_demo-rich-formatting.md
│   │   ├── 2025-01-07_demo-code-showcase.md
│   │   ├── 2025-01-08_demo-draft-post.md
│   │   ├── 2025-01-09_demo-scheduled-post.md
│   │   └── 2025-01-10_demo-draft-scheduled-post.md
│   └── (regular posts)
└── es/
    ├── _demo/                    # Spanish demo posts (matching)
    │   └── (same filenames as en/_demo/)
    └── (regular posts)
```

### The `demo` Tag

All demo posts use the `demo` tag alongside their content-relevant tags:

```markdown
tags: ['tech', 'demo']
```

The `demo` tag is defined in `src/content/tags/demo.md` and has translations in `src/lib/translations.ts`.

**Tag visibility rules:**
- In production: the `demo` tag never appears (no demo posts exist to use it)
- In dev without `?preview=all`: the `demo` tag is hidden from the tag filter
- In dev with `?preview=all`: the `demo` tag appears in the tag filter, and clicking it shows all demo posts

### Demo Detection

A post is identified as demo by its file path containing `/_demo/`. This is checked in `getPostStatus()`:

```typescript
if (post.id.includes('/_demo/')) return 'demo';
```

**Important:** The `_demo/` folder detection takes priority over `draft` and `pubDate` checks. A demo post is always `demo`.

### What Demo Posts Showcase

The current demo posts cover:

| Post | Purpose |
|------|---------|
| `demo-hero-banner` | `heroLayout: 'banner'` — full-width landscape image |
| `demo-hero-side-by-side` | `heroLayout: 'side-by-side'` — two-column with square image |
| `demo-hero-minimal` | `heroLayout: 'minimal'` — small thumbnail |
| `demo-hero-none` | `heroLayout: 'none'` — text-only, no image |
| `demo-mdx-showcase` | MDX features: inline components, variables, dynamic tables |
| `demo-rich-formatting` | All Markdown formatting: headings, lists, tables, blockquotes |
| `demo-code-showcase` | Syntax highlighting across 10+ languages |
| `demo-draft-post` | `draft: true` — amber "Draft" badge in listing and detail view |
| `demo-scheduled-post` | Future `pubDate` (2030) — blue "Scheduled" badge with date |
| `demo-draft-scheduled-post` | `draft: true` + future `pubDate` — both badges stacked side by side |

### Creating New Demo Posts

1. Place the file in `src/content/blog/{lang}/_demo/`
2. Include `'demo'` in the `tags` array
3. Create both EN and ES versions (bilingual requirement applies)
4. Use `draft: false` (demo detection doesn't depend on draft field)

---

## Preview Mode (`?preview=all`)

Preview mode allows developers to see all posts (including draft, scheduled, and demo) in the blog listing during development.

### How It Works

**Technical implementation:**

1. **Server-side (Astro pages):** When preview features are enabled (local dev or Cloudflare Pages preview branch), all blog listing pages pass `includeHidden: true` to `getBlogPosts()`, so ALL posts are sent to the client — including demo, draft, and scheduled posts.

2. **Client-side (StaticBlogSearch.svelte):** On mount, the component reads `window.location.search` for the `preview=all` query parameter. This client-side detection is necessary because Astro's static output mode cannot read query parameters server-side.

3. **Filtering:**
   - **Without `?preview=all` (default dev view):** Posts are filtered client-side to only show `published` posts, simulating the production experience.
   - **With `?preview=all`:** All posts are shown with status badges.

4. **Query preservation:** The `?preview=all` parameter is preserved across all navigation — tag links, pagination, "All Posts" links — so it doesn't get lost while browsing.

### Why Client-Side?

This project uses Astro's default `output: 'static'` mode. In static mode, pages are pre-rendered at build time, so `Astro.url.searchParams` is not available. Preview mode detection must happen on the client side using `window.location.search`.

### Using Preview Mode

1. Start the dev server: `npm run dev`
2. Visit `http://localhost:4321/blog/?preview=all`
3. All posts appear with status badges:
   - Purple badge: Demo posts
   - Amber badge: Draft posts
   - Blue badge: Scheduled posts (shows publish date)
4. The `demo` tag appears in the tag filter — click it to see only demo posts
5. Click "Show Published Only" to return to the default view

### Toggle UI

When preview features are enabled, a toggle link appears above the blog header:
- Default view: Shows a "Show All Posts" link
- Preview mode: Shows a "Preview Mode" badge and a "Show Published Only" link

### Cloudflare Pages Preview Deployments

Preview features (badges, "Show all posts" link, hidden content) are **automatically enabled** on Cloudflare Pages preview branches. The build uses `CF_PAGES_BRANCH` (injected by Cloudflare) to detect non-production branches.

- **Production branch** (`main`, `master`, or `production`): Preview features are **disabled** — only published posts are shown.
- **Preview branches** (e.g. `dev`, `feature/xyz`, PR branches): Preview features are **enabled** — visit `/blog/?preview=all` to see drafts, scheduled, and demo posts with badges.

No configuration needed. If your production branch uses a different name, update the list in `astro.config.mjs` (`define.PREVIEW_FEATURES`).

---

## Status Badges

Non-published posts display colored badges in preview mode via the `PostStatusBadge` component (`src/components/blog/PostStatusBadge.svelte`).

| Status | Badge Color | Additional Info |
|--------|-------------|-----------------|
| Draft | Amber | — |
| Scheduled | Blue | Shows publish date |
| Draft + Scheduled | Amber + Blue | Shows both |
| Demo | Purple | — |

Badges appear as overlays on the hero image (if present) or above the title (if no hero image).

---

## Production Safety

The following safeguards ensure non-published content never leaks to production:

1. **`getBlogPosts()`:** Filters with `isPostVisibleInProduction()` when `includeHidden` is false (default)
2. **`getStaticPaths()`:** Tag and pagination routes only generate pages for production-visible posts in production builds
3. **API endpoint (`/api/posts.json`):** Filters out non-published posts in production (`import.meta.env.PROD`)
4. **Demo folder:** `_demo/` posts are always filtered out in production regardless of other flags
5. **Demo tag:** Not generated in production builds (no demo posts reference it)

### Verification

After building for production (`npx astro build`), verify:

```bash
# No demo tag page in production
ls dist/blog/tag/
# Should NOT contain 'demo'

# No demo posts in API
cat dist/api/posts.json | node -e "
  const posts = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const demo = posts.filter(p => p.status === 'demo');
  console.log('Demo posts in prod:', demo.length);  // Should be 0
"
```

---

## Key Source Files

| File | Purpose |
|------|---------|
| `src/lib/blog.ts` | `getPostStatus()`, `isPostVisibleInProduction()`, `getBlogPosts()` |
| `src/lib/types.ts` | `PostStatus` type: `'published' \| 'scheduled' \| 'draft' \| 'draft+scheduled' \| 'demo'` |
| `src/content.config.ts` | Schema with `draft` field (`z.boolean().default(false).optional()`) |
| `src/components/blog/PostStatusBadge.svelte` | Color-coded status badge component |
| `src/components/blog/StaticBlogSearch.svelte` | Client-side preview mode detection and post filtering |
| `src/components/blog/BlogCard.svelte` | Post card with status badge overlay |
| `src/content/tags/demo.md` | Demo tag definition |
| `src/lib/translations.ts` | Status and tag translations (EN + ES) |
| `src/pages/api/posts.json.ts` | Search API with production filtering |

## Related Documentation

- [Blog Posts](./BLOG_POSTS.md) - File naming, frontmatter schema, hero layouts, image organization
- [Image Optimization](./IMAGE_OPTIMIZATION.md) - Image pipeline and staging workflow
- [Architecture Guide](../ARCHITECTURE.md) - Overall site architecture
