# Source Directory (`src/`)

This is the main source directory for the XergioAleX.com Astro website. All application code, components, pages, and content live here.

## Directory Structure

```
src/
├── components/          # Reusable UI components (Astro + Svelte)
│   ├── blog/           # Blog-related components
│   ├── home/           # Homepage section components
│   ├── layout/         # Layout components (Header, MobileMenu)
│   └── pages/          # Shared page components (*Page.astro)
├── content/            # Content Collections
│   ├── authors/        # Multi-author definitions (.yaml)
│   ├── blog/           # Blog posts by language (en/, es/)
│   ├── pages/          # Agent-friendly Markdown endpoints
│   ├── series/         # Blog series definitions
│   ├── slides/         # Slide decks by language
│   └── tags/           # Tag taxonomy with tiers
├── layouts/            # Page layouts (MainLayout, SlideLayout, ...)
├── lib/                # Utilities, translations, types, constants
├── pages/              # File-based routing (EN root, ES in /es/)
│   ├── api/            # JSON API endpoints
│   └── es/             # Spanish language routes
├── middleware.ts       # Route allowlist and rewrites
├── styles/             # Global styles and Tailwind
└── content.config.ts   # Content Collections schema
```

## Folder Overview

| Folder | Purpose | Tech |
|--------|---------|------|
| `components/` | Reusable UI components | Astro (.astro) + Svelte (.svelte) |
| `content/` | Blog posts, slides, tags, series, authors | Markdown, MDX, YAML, Content Collections |
| `layouts/` | Page wrapper layouts | Astro |
| `lib/` | Utilities, types, constants | TypeScript |
| `pages/` | Routes (file-based) | Astro |
| `styles/` | Global CSS | Tailwind CSS v4 |

## Key Files

| File | Description |
|------|-------------|
| `content.config.ts` | Defines Content Collections schemas (blog, tags, series, slides, authors) |
| `env.d.ts` | TypeScript environment declarations |

## Quick Start Guide

### Adding a New Page

1. Create a new `.astro` file in `pages/`
2. Import and use `MainLayout` from `layouts/`
3. The route is determined by the file path

```astro
---
// src/pages/new-page.astro
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="New Page" lang="en">
  <main>
    <!-- Content -->
  </main>
</MainLayout>
```

### Adding a New Component

1. Choose the appropriate folder (`blog/`, `home/`, `layout/`, or root)
2. Use `.astro` for static components, `.svelte` for interactive ones
3. Follow naming conventions (PascalCase)

### Adding a Blog Post

1. Create a new `.md` or `.mdx` file in `content/blog/`
2. Include required frontmatter (title, description, pubDate)
3. See `content/README.md` for schema details

## Related Documentation

- [Components Documentation](./components/README.md)
- [Content Collections](./content/README.md)
- [Pages & Routing](./pages/README.md)
- [Layouts](./layouts/README.md)
- [Utilities & Types](./lib/README.md)
- [Styling Guide](./styles/README.md)
- [Architecture Guide](../docs/ARCHITECTURE.md)
- [Standards](../docs/STANDARDS.md)

## Component vs Svelte Decision

| Use Astro (`.astro`) | Use Svelte (`.svelte`) |
|---------------------|------------------------|
| Static content | Interactive UI |
| Server-rendered | Client-side state |
| No JavaScript needed | Event handlers |
| SEO-critical content | Animations |

See [Components README](./components/README.md) for detailed guidelines.
