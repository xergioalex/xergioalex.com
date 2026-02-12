# Blog Search Feature

## Overview

The blog search feature provides a fast, client-side search experience for the static Astro blog. It supports:

- **Fuzzy matching** - Find results even with typos (powered by Fuse.js)
- **Relevance scoring** - Title matches rank higher than description
- **Result highlighting** - Search terms highlighted in results
- **Multi-language** - English and Spanish UI support
- **Tag filtering** - Search within specific topics
- **High performance** - Optimized for 1000+ posts with caching

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Search Flow                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Page Load                                                │
│     └── StaticBlogSearch mounts                             │
│         └── Lazy loads /api/posts.json (on idle/focus)      │
│             └── Creates Fuse.js index                       │
│                                                              │
│  2. User Types in Search                                     │
│     └── BlogSearchInput dispatches 'search' event           │
│         └── StaticBlogSearch debounces (200ms)              │
│             └── Fuse.js performs fuzzy search               │
│                 └── Results cached for pagination           │
│                     └── Updates searchResults               │
│                                                              │
│  3. Results Display                                          │
│     └── SearchResults renders with highlighting             │
│         └── BlogCard with highlighted title/description     │
│         └── BlogPagination for result pages                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Components

| Component | File | Role |
|-----------|------|------|
| StaticBlogSearch | `src/components/blog/StaticBlogSearch.svelte` | Orchestrates search logic |
| BlogSearchInput | `src/components/blog/BlogSearchInput.svelte` | Search input field |
| SearchResults | `src/components/blog/SearchResults.svelte` | Displays results |
| BlogCard | `src/components/blog/BlogCard.svelte` | Individual result card with highlighting |
| BlogPagination | `src/components/blog/BlogPagination.svelte` | Pagination controls |
| posts.json API | `src/pages/api/posts.json.ts` | Search index endpoint |

## Search Index API

**Endpoint:** `GET /api/posts.json`

**Response:**

```json
[
  {
    "id": "en/post-slug",
    "slug": "post-slug",
    "lang": "en",
    "title": "Post Title",
    "description": "Post description text",
    "pubDate": "2026-01-15T00:00:00.000Z",
    "tags": ["tech", "tutorial"],
    "heroImage": "/images/hero.jpg"
  }
]
```

**Headers:**
- `Content-Type: application/json`
- `Cache-Control: public, max-age=3600` (1 hour cache)

## Search Algorithm (Fuse.js)

The search uses Fuse.js for fuzzy matching with weighted fields:

```typescript
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },      // Most important
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.3 },
  ],
  threshold: 0.4,        // Fuzzy tolerance (0 = exact, 1 = match anything)
  distance: 50,          // Optimized for performance
  includeMatches: true,  // Enable highlighting
  includeScore: true,    // Enable relevance sorting
};
```

**Search Behavior:**
- **Minimum characters**: 2 (search starts after 2 chars)
- **Fuzzy matching**: Typos tolerated up to threshold
- **Relevance**: Results sorted by match score
- **Case-insensitive**: Always

## Internationalization

### Translation System

Translations are centralized in `src/lib/translations.ts`:

```typescript
import { getTranslations } from '@/lib/translations';

const t = getTranslations('en'); // or 'es'
console.log(t.searchPlaceholder); // "Search articles..."
console.log(t.noResults('test')); // "No results found for 'test'"
```

### Supported Languages

| Language | Code | Route |
|----------|------|-------|
| English | `en` | `/blog/` |
| Spanish | `es` | `/es/blog/` |

### Adding a New Language

1. Add language code to `Language` type in `translations.ts`
2. Add complete translation object for new language
3. Create routes at `/[lang]/blog/`
4. Add content in `src/content/blog/[lang]/`

## Performance

### Optimizations

| Feature | Description |
|---------|-------------|
| **Result caching** | Same searches return instantly (max 50 cached) |
| **Debouncing** | 200ms delay prevents lag during typing |
| **Lazy loading** | Index loads on focus or browser idle |
| **Bounded cache** | Max 50 cached queries to prevent memory leaks |

### Scaling Guidelines

| Posts | Expected Performance |
|-------|---------------------|
| 100 | <50ms search time |
| 500 | <100ms search time |
| 1000+ | <200ms search time |

### Performance Tuning

If search feels slow:

1. Open browser DevTools > Performance tab
2. Check `/api/posts.json` size in Network tab
3. Reduce `distance` in Fuse.js options
4. Truncate descriptions in API endpoint
5. Increase debounce time if needed

## Accessibility

The search includes accessibility features:

| Feature | Implementation |
|---------|----------------|
| **ARIA labels** | Search input and pagination buttons |
| **Live regions** | Result count announced to screen readers |
| **Keyboard navigation** | Escape clears search |
| **Semantic HTML** | `type="search"` on input |

## Usage

### Basic Integration

```astro
---
import BlogContainer from '@/components/blog/BlogContainer.astro';
import { getBlogPosts } from '@/lib/blog';

const posts = await getBlogPosts({ lang: 'en' });
---

<BlogContainer lang="en" blogPostsResult={posts} />
```

### With Tag Filtering

```astro
<BlogContainer 
  lang="en" 
  blogPostsResult={posts} 
  currentTag="tech" 
/>
```

### Spanish Blog

```astro
---
// src/pages/es/blog/index.astro
const posts = await getBlogPosts({ lang: 'es' });
---

<BlogContainer lang="es" blogPostsResult={posts} />
```

## Troubleshooting

### Search not finding results

1. Verify search term is at least 2 characters
2. Check if posts exist with matching content
3. Try lowering Fuse.js `threshold` (closer to 0 = stricter)
4. Verify language matches posts (check `lang` field)

### UI shows wrong language

1. Verify `lang` prop is passed correctly from page
2. Check that all parent components pass `lang` down
3. Verify translation key exists in `translations.ts`

### Performance issues

1. Open DevTools > Performance
2. Check `/api/posts.json` size in Network tab
3. Verify debouncing is working (200ms delay)
4. Check cache is not being cleared accidentally

### Highlighting not working

1. Verify `searchResult` prop is passed to BlogCard
2. Check that `includeMatches: true` in Fuse.js config
3. Ensure `{@html}` directive is used for highlighted text

### Error loading search index

1. Check browser console for network errors
2. Verify `/api/posts.json` endpoint is accessible
3. Click "Try again" button to retry loading
4. Check server logs for build errors

## Files Reference

| File | Purpose |
|------|---------|
| `src/lib/translations.ts` | UI translations (en/es) |
| `src/lib/search.ts` | Fuse.js utilities |
| `src/lib/blog.ts` | Blog data utilities |
| `src/pages/api/posts.json.ts` | Search API endpoint |
| `src/components/blog/*.svelte` | UI components |
| `src/pages/blog/` | English routes |
| `src/pages/es/blog/` | Spanish routes |
| `src/content/blog/en/` | English content |
| `src/content/blog/es/` | Spanish content |

## Related Documentation

- [Blog Components](../../src/components/blog/README.md)
- [Library Utilities](../../src/lib/README.md)
- [API Reference](../API_REFERENCE.md)
- [Pagination](./PAGINATION.md)
- [i18n Guide](../I18N_GUIDE.md)
