# Blog Search Feature

## Overview

The blog search feature provides client-side full-text search across all blog posts. Users can search by title, description, or tags without requiring a server round-trip.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Search Flow                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Page Load                                                │
│     └── StaticBlogSearch mounts                             │
│         └── Fetches /api/posts.json (search index)          │
│                                                              │
│  2. User Types in Search                                     │
│     └── BlogSearchInput dispatches 'search' event           │
│         └── StaticBlogSearch debounces (300ms)              │
│             └── Filters searchIndex client-side             │
│                 └── Updates searchResults                   │
│                                                              │
│  3. Results Display                                          │
│     └── SearchResults renders filtered posts                │
│         └── BlogCard for each result                        │
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
| BlogCard | `src/components/blog/BlogCard.svelte` | Individual result card |
| posts.json API | `src/pages/api/posts.json.ts` | Search index endpoint |

## Search Index API

**Endpoint:** `GET /api/posts.json`

**Response:**

```json
[
  {
    "id": "post-slug",
    "slug": "post-slug",
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

## Search Algorithm

The search uses a simple substring matching algorithm:

```javascript
const filteredPosts = searchIndex.filter((post) => {
  const searchTerm = query.toLowerCase();
  const title = post.title.toLowerCase();
  const description = post.description.toLowerCase();
  const tags = post.tags.join(' ').toLowerCase();

  return title.includes(searchTerm) ||
         description.includes(searchTerm) ||
         tags.includes(searchTerm);
});
```

**Matches against:**
- Post title
- Post description
- Tags (joined as space-separated string)

**Features:**
- Case-insensitive
- Partial matches
- Combined with tag filter (if active)

## Debouncing

Search is debounced to prevent excessive filtering:

```javascript
let searchTimeout;

function handleSearch(query) {
  if (searchTimeout) clearTimeout(searchTimeout);
  
  searchTimeout = setTimeout(() => {
    performSearch(query, 1);
  }, 300);  // 300ms debounce
}
```

## Pagination

Search results use client-side pagination:

```javascript
const limit = BLOG_PAGE_SIZE;  // 30 posts
const totalPages = Math.ceil(filteredPosts.length / limit);
const startIndex = (page - 1) * limit;
const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);
```

**Difference from browse mode:**
- Browse: Server-side pagination with URL navigation
- Search: Client-side pagination with button clicks

## Configuration

### Page Size

Defined in `src/lib/constances.ts`:

```typescript
export const BLOG_PAGE_SIZE: number = 30;
```

### Debounce Timing

In `StaticBlogSearch.svelte`:

```javascript
searchTimeout = setTimeout(() => {
  performSearch(query, 1);
}, 300);  // Adjust this value
```

## Usage

The search component is used in blog pages:

```astro
---
import StaticBlogSearch from '@/components/blog/StaticBlogSearch.svelte';
---

<StaticBlogSearch
  client:load
  postsResult={posts}
  currentPage={1}
  totalPages={totalPages}
  tagsResult={tags}
  totalPostsAvailable={totalPosts}
/>
```

## Extending

### Adding Search Fields

To search additional fields, modify the filter in `StaticBlogSearch.svelte`:

```javascript
const filteredPosts = searchIndex.filter((post) => {
  const searchTerm = query.toLowerCase();
  // Add new field
  const content = post.content?.toLowerCase() || '';
  
  return title.includes(searchTerm) ||
         description.includes(searchTerm) ||
         tags.includes(searchTerm) ||
         content.includes(searchTerm);
});
```

### Improving Search

For better search quality, consider:
- Fuzzy matching (fuse.js)
- Stemming
- Relevance scoring
- Search result highlighting

## Related Documentation

- [Blog Components](../../src/components/blog/README.md)
- [API Reference](../API_REFERENCE.md)
- [Pagination](./pagination.md)
