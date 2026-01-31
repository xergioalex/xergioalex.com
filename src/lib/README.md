# Library (`src/lib/`)

This directory contains utility functions, constants, types, and enums used throughout the application.

## Directory Structure

```
lib/
├── blog.ts        # Blog-related utility functions
├── constances.ts  # Site-wide constants
├── enum.ts        # Shared enumerations
└── types.ts       # TypeScript type definitions
```

## File Overview

### blog.ts

Blog data fetching and pagination utilities.

#### `getBlogPosts(params: BlogParamsType): Promise<BlogPostsResultType>`

Fetches and filters blog posts with pagination support.

**Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `lang` | `string` | - | Language filter (future use) |
| `tag` | `string` | - | Filter posts by tag |
| `page` | `number` | `1` | Page number |
| `pageSize` | `number` | `BLOG_PAGE_SIZE` | Posts per page |

**Returns:** `BlogPostsResultType`

| Field | Type | Description |
|-------|------|-------------|
| `tagsResult` | `CollectionEntry<'tags'>[]` | Available tags (filtered to used ones) |
| `postsResult` | `CollectionEntry<'blog'>[]` | Posts for current page |
| `totalPages` | `number` | Total number of pages |
| `currentPage` | `number` | Current page number |
| `pageSize` | `number` | Posts per page |
| `totalPostsAvailable` | `number` | Total posts count |

**Usage:**

```typescript
import { getBlogPosts } from '@/lib/blog';

// Get first page of all posts
const result = await getBlogPosts({ page: 1 });

// Get posts filtered by tag
const techPosts = await getBlogPosts({ tag: 'tech', page: 1 });

// Get posts with custom page size
const posts = await getBlogPosts({ page: 2, pageSize: 10 });
```

**Behavior:**
1. Fetches all posts from Content Collection
2. Filters tags to only those used in posts
3. Filters by tag if specified
4. Sorts by publication date (newest first)
5. Calculates total pages
6. Applies pagination

---

### constances.ts

Site-wide constants.

| Constant | Type | Value | Description |
|----------|------|-------|-------------|
| `SITE_TITLE` | `string` | `'Astro Blog'` | Site title (used in meta tags) |
| `SITE_DESCRIPTION` | `string` | `'Welcome to my website!'` | Default site description |
| `BLOG_PAGE_SIZE` | `number` | `30` | Default posts per page |

**Usage:**

```typescript
import { SITE_TITLE, SITE_DESCRIPTION, BLOG_PAGE_SIZE } from '@/lib/constances';
```

---

### types.ts

TypeScript type definitions for the application.

#### `BlogParamsType`

Parameters for `getBlogPosts()` function.

```typescript
export type BlogParamsType = {
  lang?: string;    // Language code (e.g., 'en', 'es')
  tag?: string;     // Tag to filter by
  page?: number;    // Page number (1-indexed)
  pageSize?: number; // Posts per page
};
```

#### `BlogPostsResultType`

Return type of `getBlogPosts()` function.

```typescript
export type BlogPostsResultType = {
  tagsResult: CollectionEntry<'tags'>[];     // Available tags
  postsResult: CollectionEntry<'blog'>[];    // Posts for page
  totalPages: number;                         // Total pages
  currentPage: number;                        // Current page
  pageSize: number;                           // Page size
  totalPostsAvailable: number;                // Total post count
};
```

---

### enum.ts

Shared enumeration types.

#### `LanguageEType`

```typescript
export enum LanguageEType {
  LEFT = 'left',
  RIGHT = 'right',
}
```

**Note:** This appears to be a legacy/placeholder enum. For actual language codes, use string literals (`'en'`, `'es'`).

---

## Import Alias

All lib files can be imported using the `@/lib/` alias:

```typescript
// Using alias (recommended)
import { getBlogPosts } from '@/lib/blog';
import { SITE_TITLE } from '@/lib/constances';
import type { BlogParamsType } from '@/lib/types';

// Using relative path
import { getBlogPosts } from '../lib/blog';
```

The alias is configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Adding New Utilities

### Adding a New Function

1. Create or edit the appropriate file in `src/lib/`
2. Export the function
3. Add TypeScript types in `types.ts` if needed

```typescript
// src/lib/utils.ts
export function formatDate(date: Date, locale: string = 'en-US'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

### Adding a New Type

Add to `types.ts`:

```typescript
export type NewFeatureType = {
  id: string;
  name: string;
  options?: Record<string, unknown>;
};
```

### Adding a New Constant

Add to `constances.ts`:

```typescript
export const NEW_CONSTANT: string = 'value';
```

---

## Related Documentation

- [Content Collections](../content/README.md)
- [Blog Components](../components/blog/README.md)
- [API Reference](../../docs/API_REFERENCE.md)
- [Architecture](../../docs/ARCHITECTURE.md)
