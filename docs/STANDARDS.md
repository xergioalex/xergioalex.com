# Repository Standards

This document defines the **canonical coding rules** for all contributors and AI agents working on XergioAleX.com.

## Language Standards

### English Only (MANDATORY)

**ALL code, comments, documentation, and commit messages MUST be in English.**

✅ **Do:**
- Variable names: `pageTitle`, `blogPosts`, `isMenuOpen`
- Comments: `// Fetch blog posts sorted by date`
- Commit messages: `feat: add dark mode toggle`

❌ **Don't:**
- Variable names: `tituloPagina`, `publicaciones`
- Comments: `// Obtener publicaciones del blog`
- Commit messages: `feat: agregar modo oscuro`

## TypeScript Standards

### Type Annotations

TypeScript is configured with relaxed rules for flexibility. However, prefer explicit types:

```typescript
// Good: Explicit return type
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-us');
}

// Good: Interface for component props
interface Props {
  title: string;
  description?: string;
  tags?: string[];
}

// Good: Use Astro's built-in types
import type { CollectionEntry } from 'astro:content';
type BlogPost = CollectionEntry<'blog'>;
```

### Type Inference

Let TypeScript infer types when obvious:

```typescript
// Good: Inferred as string
const title = 'My Blog Post';

// Good: Inferred as number[]
const numbers = [1, 2, 3];

// Explicit when not obvious
const config: SiteConfig = loadConfig();
```

### Any Type

Biome allows `any` for flexibility, but avoid it when possible:

```typescript
// Avoid when possible
function process(data: any) { ... }

// Better: Use generics or specific types
function process<T>(data: T) { ... }
function process(data: unknown) { ... }
```

## Import Order Convention (MANDATORY)

Follow this order in all TypeScript, Astro, and Svelte files:

```typescript
// 1. Node.js native modules
import { dirname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

// 2. Third-party packages (including Astro)
import { defineConfig } from 'astro/config';
import { z } from 'astro:content';
import { getCollection } from 'astro:content';

// 3. Internal project modules (using @ alias)
import Header from '@/components/layout/Header.svelte';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/lib/constances';
import { getBlogPosts } from '@/lib/blog';

// 4. Type imports (separate group)
import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import type { Props } from './types';

// 5. Relative imports (same directory)
import './styles.css';
```

## Code Quality (Biome)

### Linting and Formatting

This project uses **Biome** exclusively for linting and formatting.

```bash
# Check for issues
npm run biome:check

# Auto-fix issues
npm run biome:fix

# Fix with unsafe transformations
npm run biome:fix:unsafe
```

**❌ DO NOT use ESLint or Prettier** - They are not configured in this project.

### Biome Configuration

Key settings in `biome.json`:

- **Indent**: 2 spaces
- **Quotes**: Single quotes
- **Trailing commas**: ES5 style
- **Scope**: `src/**` only

### Pre-commit Requirements

Always run before committing:

```bash
npm run biome:check
npm run astro:check
```

## Component Standards

### Astro Components (.astro)

Use for static, build-time rendered content:

```astro
---
// 1. Imports at top
import BaseHead from '@/components/BaseHead.astro';
import type { Props } from './types';

// 2. Props interface
interface Props {
  title: string;
  description?: string;
}

// 3. Destructure props with defaults
const { title, description = 'Default description' } = Astro.props;

// 4. Data fetching and logic
const posts = await getCollection('blog');
---

<!-- 5. Template -->
<section class="container">
  <h1>{title}</h1>
  <p>{description}</p>
</section>

<!-- 6. Scoped styles (optional) -->
<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
```

### Svelte Components (.svelte)

Use for interactive, client-side components:

```svelte
<script lang="ts">
  // 1. Imports
  import { onMount } from 'svelte';
  import type { BlogPost } from '@/lib/types';

  // 2. Props with TypeScript
  interface Props {
    posts: BlogPost[];
    initialPage?: number;
  }

  let { posts, initialPage = 1 }: Props = $props();

  // 3. State
  let currentPage = $state(initialPage);
  let searchQuery = $state('');

  // 4. Derived values
  let filteredPosts = $derived(
    posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // 5. Lifecycle
  onMount(() => {
    // Client-side initialization
  });
</script>

<!-- 6. Template -->
<div class="blog-grid">
  {#each filteredPosts as post}
    <article>{post.title}</article>
  {/each}
</div>

<!-- 7. Styles -->
<style>
  .blog-grid {
    display: grid;
    gap: 1rem;
  }
</style>
```

### Component Hydration

Always specify hydration directive for Svelte components:

```astro
<!-- Hydrate immediately on page load -->
<Header client:load lang={lang} />

<!-- Hydrate when visible in viewport -->
<BlogGrid client:visible posts={posts} />

<!-- Hydrate only on idle -->
<Newsletter client:idle />

<!-- No hydration (static) -->
<StaticComponent />
```

## Styling Standards

> **Full brand reference:** See **[Brand Guide](BRAND_GUIDE.md)** for the complete color palette, typography, logo usage, and dark mode pairing rules.

### Tailwind CSS

Use Tailwind utility classes for styling:

```astro
<!-- Good: Utility classes -->
<div class="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Title</h2>
</div>
```

### Brand Colors

Use the registered brand tokens for brand-consistent styling:

```html
<!-- Dark branded background (Void Black) -->
<div class="bg-main text-white">

<!-- Accent elements (Crimson Strike) -->
<button class="bg-secondary hover:bg-red-700 text-white">
<a class="text-secondary hover:text-red-700">
```

See [Brand Guide — CSS Design Tokens](BRAND_GUIDE.md#css-design-tokens) for all available tokens and the full 5-color palette.

### Dark Mode

Always support dark mode with `dark:` variant:

```astro
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
    Click me
  </button>
</div>
```

### Custom CSS

Use scoped styles in components when Tailwind isn't sufficient:

```astro
<style>
  /* Scoped to this component */
  .custom-animation {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
```

## File Naming Conventions

### Components

- **Astro components**: `PascalCase.astro` (e.g., `BlogCard.astro`)
- **Svelte components**: `PascalCase.svelte` (e.g., `Header.svelte`)
- **Component folders**: `PascalCase/` (e.g., `HeroSection/`)

### Pages

- **Page files**: `kebab-case.astro` or `[param].astro`
- **Dynamic routes**: `[slug].astro`, `[...slug].astro`
- **API routes**: `kebab-case.json.ts`

### Utilities

- **Library files**: `camelCase.ts` (e.g., `blog.ts`, `types.ts`)
- **Constants**: `constances.ts` (note: intentional spelling)

### Content

- **Blog posts**: `kebab-case.md` or `kebab-case.mdx`
- **Tags**: `kebab-case.md`

## Content Collection Standards

### Blog Post Frontmatter

Required and optional fields:

```yaml
---
title: "My Blog Post Title"           # Required
description: "A brief description"     # Required
pubDate: 2024-01-15                    # Required (YYYY-MM-DD)
updatedDate: 2024-01-20               # Optional
heroImage: "/images/hero.jpg"         # Optional
tags: ["tech", "tutorial"]            # Optional
---
```

### Tag Definition

```yaml
---
name: "Technology"
description: "Posts about technology and programming"
---
```

## Git Standards

### Commit Messages

Use conventional commit format:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**
```
feat: add blog search functionality
fix: resolve dark mode toggle on mobile
docs: update architecture guide
style: format components with Biome
refactor: extract blog utilities to lib/
perf: optimize image loading
```

### Branch Naming

```
feature/add-blog-search
fix/dark-mode-toggle
docs/update-readme
refactor/blog-components
```

## Error Handling

### API Routes

```typescript
export const GET: APIRoute = async () => {
  try {
    const data = await fetchData();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

### Components

```typescript
// Handle potential null/undefined
const post = posts.find(p => p.id === id);
if (!post) {
  return Astro.redirect('/404');
}
```

## Testing Standards (Future)

Testing is not yet configured. When implemented:

- **Framework**: Vitest for unit tests, Playwright for E2E
- **File naming**: `*.test.ts` or `*.spec.ts`
- **Location**: `tests/` directory or co-located with source

## Documentation Standards

### When to Document

- ✅ After adding new components
- ✅ After changing schemas
- ✅ After updating configuration
- ✅ After adding npm scripts
- ✅ After establishing new patterns

### Documentation Language

All documentation must be in **English**.

## Summary Checklist

Before committing, verify:

- [ ] Code is in English (variables, comments, docs)
- [ ] Import order follows convention
- [ ] `npm run biome:check` passes
- [ ] `npm run astro:check` passes
- [ ] Dark mode is supported in new UI
- [ ] Documentation is updated if needed
- [ ] Commit message follows conventional format
