# Blog Content Lifecycle

Guide to blog post visibility with a focus on demo posts, the dev-only reference content that showcases blog features.

## Overview

Blog posts in this project are generally visible in production once published. The exception is **demo posts**, which are dev-only reference content stored in `_demo/` folders.

**Key principle:** Demo posts are structural references for AI agents and developers. They are accessible by direct URL in local development but never appear in blog listings, tag pages, search, RSS, or production builds.

## Post Visibility States

### Published Posts (Default)

All posts in `src/content/blog/{lang}/` (outside `_demo/` folders) are published and visible in production.

**Behavior:**
- Appear in blog listings, tag pages, RSS, and search
- Accessible via direct URL in both dev and production
- No special frontmatter required

### Demo Posts

Demo posts are stored in `_demo/` subdirectories and serve as **structural references** for formatting, layouts, and capabilities. They are **never** visible in production.

**Detection:** A post is identified as demo if its file path contains `/_demo/`. This is checked by the `isDemoPost()` function in `src/lib/blog.ts`:

```typescript
function isDemoPost(post: CollectionEntry<'blog'>): boolean {
  return post.id.includes('/_demo/');
}
```

**Behavior:**
- **Production:** Not built at all (filtered from all routes and APIs)
- **Dev (listings/search/tags):** Hidden from all listings, tag pages, search results, and RSS
- **Dev (direct URL):** Accessible by direct URL (e.g., `http://localhost:4321/blog/demo-hero-banner/`)
- **Badge:** No badge system exists — demo posts are simply accessible but unlisted in dev

**Why direct URL access in dev?** This allows developers and AI agents to view demo posts in rendered form to understand layout and formatting options while keeping them out of normal browsing flows.

---

## Demo Posts

Demo posts showcase blog features and serve as **structural references** for formatting, layouts, and capabilities.

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
│   │   └── 2025-01-07_demo-code-showcase.md
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

The `demo` tag is defined in `src/content/tags/demo.md` and has translations in `src/lib/translations/`.

**Tag visibility rules:**
- The `demo` tag never appears in production (no demo posts exist to use it)
- The `demo` tag is hidden from tag filters in dev mode (demo posts are filtered from listings)
- Clicking the demo tag URL directly (e.g., `/blog/tag/demo/`) shows zero posts in dev mode (consistent with listing behavior)

**Why keep the tag?** The `demo` tag serves as metadata for demo posts and is preserved for consistency, even though the tag filter never exposes it.

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

### Creating New Demo Posts

1. Place the file in `src/content/blog/{lang}/_demo/`
2. Include `'demo'` in the `tags` array
3. Create both EN and ES versions (bilingual requirement applies)
4. The `_demo/` folder detection automatically marks the post as demo

### Accessing Demo Posts in Dev

Visit the direct URL:
- English: `http://localhost:4321/blog/{slug}/`
- Spanish: `http://localhost:4321/es/blog/{slug}/`

Example: `http://localhost:4321/blog/demo-hero-banner/`

The post will render normally but will not appear in any listings, search results, or tag pages.

---

## Production Safety

The following safeguards ensure demo content never leaks to production:

1. **`getBlogPosts()`:** Filters out demo posts using `isDemoPost()` check
2. **`getStaticPaths()`:** Tag and pagination routes exclude demo posts when generating static paths
3. **API endpoint (`/api/posts.json`):** Filters out demo posts in production builds
4. **Demo folder:** `_demo/` posts are always filtered regardless of build mode
5. **Demo tag:** Not generated in production builds (no demo posts reference it in visible content)
6. **Direct URL builds:** In production, demo post routes are not generated at all

### Verification

After building for production (`npm run build`), verify:

```bash
# No demo tag page in production
ls dist/blog/tag/
# Should NOT contain 'demo'

# No demo posts in API
cat dist/api/posts.json | node -e "
  const posts = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const demo = posts.filter(p => p.id.includes('/_demo/'));
  console.log('Demo posts in prod:', demo.length);  // Should be 0
"

# No demo post detail pages
ls dist/blog/ | grep demo
# Should return no results
```

---

## Key Source Files

| File | Purpose |
|------|---------|
| `src/lib/blog.ts` | `isDemoPost()`, `getBlogPosts()` — demo detection and filtering |
| `src/content.config.ts` | Blog collection schema (no special demo field needed) |
| `src/pages/blog/[...slug].astro` | Dynamic post route with `import.meta.env.DEV` check for demo access |
| `src/pages/api/posts.json.ts` | Search API with demo post filtering |
| `src/content/tags/demo.md` | Demo tag definition |
| `src/lib/translations/` | Translation strings for the demo tag |

---

## Related Documentation

- [Blog Posts](./BLOG_POSTS.md) - File naming, frontmatter schema, hero layouts, image organization
- [Image Optimization](./IMAGE_OPTIMIZATION.md) - Image pipeline and staging workflow
- [Architecture Guide](../ARCHITECTURE.md) - Overall site architecture
