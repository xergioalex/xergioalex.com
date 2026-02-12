# Library (`src/lib/`)

This directory contains utility functions, constants, types, and enums used throughout the application.

## Directory Structure

```
lib/
├── blog.ts        # Blog-related utility functions
├── constances.ts  # Site-wide constants
├── enum.ts        # Shared enumerations
├── search.ts      # Fuse.js search utilities
├── translations.ts # i18n translation system
└── types.ts       # TypeScript type definitions
```

## File Overview

### translations.ts

Centralized translation system for the entire site.

#### Types

```typescript
export type Language = 'en' | 'es';

export interface SiteTranslations {
  siteTitle: string;
  siteDescription: string;
  nav: { home: string; blog: string; about: string; contact: string; /* ... */ };
  footer: { copyright: string; allRightsReserved: string; };
  hero: { description: string; typewriterWords: string[]; };
  homeSections: { about: { /* ... */ }; dailybot: { /* ... */ }; /* ... */ };
  contact: { title: string; nameLabel: string; /* ... */ };
  searchPlaceholder: string;
  resultsFound: (count: number) => string;
  noResults: (query: string) => string;
  // ... more translation keys
}
```

#### Functions

| Function | Description |
|----------|-------------|
| `getTranslations(lang)` | Get translation object for language |
| `isValidLanguage(lang)` | Check if language code is valid |
| `getDefaultLanguage()` | Returns `'en'` |

#### Usage

```typescript
import { getTranslations, type Language } from '@/lib/translations';

const lang: Language = 'es';
const t = getTranslations(lang);

console.log(t.searchPlaceholder); // "Buscar artículos..."
console.log(t.noResults('test')); // "No se encontraron resultados para 'test'"
console.log(t.resultsFound(5));   // "5 resultados encontrados"
```

#### Available Keys

| Key | English | Spanish |
|-----|---------|---------|
| `title` | "Articles" | "Artículos" |
| `searchPlaceholder` | "Search articles..." | "Buscar artículos..." |
| `noResults(q)` | "No results found for '{q}'" | "No se encontraron..." |
| `resultsFound(n)` | "{n} results found" | "{n} resultados..." |
| `previous` | "Previous" | "Anterior" |
| `next` | "Next" | "Siguiente" |
| `loadError` | "Failed to load..." | "Error al cargar..." |
| `retry` | "Try again" | "Intentar de nuevo" |

---

### search.ts

Advanced search functionality using Fuse.js for fuzzy matching and relevance scoring.

#### Types

```typescript
export interface SearchablePost {
  id: string;
  slug: string;
  lang: string;
  title: string;
  description: string;
  tags: string[];
  pubDate: string;
  heroImage?: string;
}

export interface SearchResult {
  item: SearchablePost;
  score: number;
  matches?: ReadonlyArray<{
    key: string;
    value?: string;
    indices: ReadonlyArray<readonly [number, number]>;
  }>;
}
```

#### Functions

| Function | Description |
|----------|-------------|
| `createSearchIndex(posts)` | Create Fuse.js instance from posts |
| `searchPosts(fuse, query, limit)` | Perform fuzzy search |
| `highlightMatches(text, indices)` | Highlight matched text |
| `getHighlightedField(result, field, original)` | Get field with highlights |

#### Usage

```typescript
import { 
  createSearchIndex, 
  searchPosts, 
  getHighlightedField,
  type SearchablePost 
} from '@/lib/search';

// Create index from posts
const posts: SearchablePost[] = await fetch('/api/posts.json').then(r => r.json());
const fuse = createSearchIndex(posts);

// Perform search
const results = searchPosts(fuse, 'javascript');

// Get highlighted text for display
results.forEach(result => {
  const title = getHighlightedField(result, 'title', result.item.title);
  console.log(title); // "Learn <mark>JavaScript</mark> basics"
});
```

#### Fuse.js Configuration

```typescript
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.3 },
  ],
  threshold: 0.4,       // Fuzzy tolerance
  distance: 50,         // Optimized for performance
  includeMatches: true, // Enable highlighting
  includeScore: true,   // Enable relevance sorting
};
```

---

### blog.ts

Blog data fetching and pagination utilities.

#### Functions

| Function | Description |
|----------|-------------|
| `getBlogPosts(params)` | Fetch posts with pagination |
| `getPostSlug(postId)` | Strip language prefix from ID |
| `getPostLanguage(postId)` | Extract language from ID |

#### `getBlogPosts(params: BlogParamsType): Promise<BlogPostsResultType>`

Fetches and filters blog posts with pagination support.

**Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `lang` | `string` | `'en'` | Language filter |
| `tag` | `string` | - | Filter posts by tag |
| `page` | `number` | `1` | Page number |
| `pageSize` | `number` | `BLOG_PAGE_SIZE` | Posts per page |

**Returns:** `BlogPostsResultType`

| Field | Type | Description |
|-------|------|-------------|
| `tagsResult` | `CollectionEntry<'tags'>[]` | Available tags |
| `postsResult` | `CollectionEntry<'blog'>[]` | Posts for current page |
| `totalPages` | `number` | Total number of pages |
| `currentPage` | `number` | Current page number |
| `pageSize` | `number` | Posts per page |
| `totalPostsAvailable` | `number` | Total posts count |

**Usage:**

```typescript
import { getBlogPosts } from '@/lib/blog';

// Get English posts
const result = await getBlogPosts({ lang: 'en', page: 1 });

// Get Spanish posts filtered by tag
const techPosts = await getBlogPosts({ lang: 'es', tag: 'tech', page: 1 });
```

#### Helper Functions

```typescript
// Get slug without language prefix
getPostSlug('en/first-post'); // Returns: 'first-post'

// Get language from post ID
getPostLanguage('es/my-article'); // Returns: 'es'
```

---

### constances.ts

Site-wide constants.

| Constant | Type | Value | Description |
|----------|------|-------|-------------|
| `SITE_TITLE` | `string` | `'Astro Blog'` | Site title (meta tags) |
| `SITE_DESCRIPTION` | `string` | `'Welcome to my website!'` | Default description |
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
  lang?: string;     // Language code (e.g., 'en', 'es')
  tag?: string;      // Tag to filter by
  page?: number;     // Page number (1-indexed)
  pageSize?: number; // Posts per page
};
```

#### `BlogPostsResultType`

Return type of `getBlogPosts()` function.

```typescript
export type BlogPostsResultType = {
  tagsResult: CollectionEntry<'tags'>[];
  postsResult: CollectionEntry<'blog'>[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalPostsAvailable: number;
};
```

---

### enum.ts

Shared enumeration types.

```typescript
export enum LanguageEType {
  LEFT = 'left',
  RIGHT = 'right',
}
```

**Note:** This is a legacy enum. For language codes, use the `Language` type from `translations.ts`.

---

## Import Alias

All lib files can be imported using the `@/lib/` alias:

```typescript
// Using alias (recommended)
import { getBlogPosts } from '@/lib/blog';
import { getTranslations } from '@/lib/translations';
import { createSearchIndex, searchPosts } from '@/lib/search';
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

### Adding a New Translation

1. Add the key to `SiteTranslations` interface
2. Add translations for both `en` and `es`

```typescript
// In translations.ts
export interface SiteTranslations {
  // ... existing keys
  newKey: string;
}

const translations = {
  en: {
    // ... existing
    newKey: 'English text',
  },
  es: {
    // ... existing
    newKey: 'Spanish text',
  },
};
```

### Adding a New Language

1. Add to `Language` type: `type Language = 'en' | 'es' | 'fr';`
2. Add complete translation object in `translations` const
3. Create routes at `/[lang]/blog/`
4. Add content folder `src/content/blog/[lang]/`

---

## Related Documentation

- [Content Collections](../content/README.md)
- [Blog Components](../components/blog/README.md)
- [Features: Blog Search](../../docs/features/BLOG_SEARCH.md)
- [API Reference](../../docs/API_REFERENCE.md)
- [Architecture](../../docs/ARCHITECTURE.md)
