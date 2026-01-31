# Blog Components (`src/components/blog/`)

This directory contains all components related to the blog functionality, including post display, search, pagination, and filtering by tags.

## Component Overview

```
blog/
├── BlogCard.svelte          # Individual post card
├── BlogContainer.astro      # Blog page wrapper
├── BlogGrid.svelte          # Grid layout for posts
├── BlogHeader.svelte        # Header with title and tag filter
├── BlogPagination.svelte    # Page navigation
├── BlogSearchInput.svelte   # Search input field
├── SearchResults.svelte     # Search results display
└── StaticBlogSearch.svelte  # Complete search orchestrator
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    StaticBlogSearch                         │
│  (Main orchestrator - manages state, search, pagination)    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌───────────────────┐                   │
│  │ BlogHeader   │  │ BlogSearchInput   │                   │
│  │ (title/tags) │  │ (search query)    │                   │
│  └──────────────┘  └───────────────────┘                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  BlogGrid / SearchResults                           │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │   │
│  │  │BlogCard  │ │BlogCard  │ │BlogCard  │           │   │
│  │  └──────────┘ └──────────┘ └──────────┘           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 BlogPagination                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### StaticBlogSearch.svelte

**The main orchestrator component** that manages the entire blog listing.

| Prop | Type | Description |
|------|------|-------------|
| `postsResult` | `CollectionEntry<'blog'>[]` | Posts for current page |
| `currentTag` | `string \| undefined` | Current tag filter |
| `totalPages` | `number` | Total number of pages |
| `currentPage` | `number` | Current page number |
| `tagsResult` | `CollectionEntry<'tags'>[]` | All available tags |
| `totalPostsAvailable` | `number` | Total posts count |

**Features:**
- Loads search index from `/api/posts.json`
- Debounced search (300ms)
- Client-side filtering
- Manages search vs browse modes

### BlogCard.svelte

Displays an individual blog post card with image, title, description, date, and tags.

| Prop | Type | Description |
|------|------|-------------|
| `post` | `CollectionEntry<'blog'>` | Blog post entry |

**Features:**
- Handles both Content Collection and search index formats
- Responsive image display
- Tag links
- Dark mode support

### BlogGrid.svelte

Renders posts in a responsive grid layout.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `posts` | `Array` | Required | Posts to display |
| `showPagination` | `boolean` | `false` | Show pagination |
| `currentPage` | `number` | `1` | Current page |
| `totalPages` | `number` | `1` | Total pages |
| `currentTag` | `string` | `undefined` | Current tag filter |

### BlogHeader.svelte

Header section with title, post count, and tag filter chips.

| Prop | Type | Description |
|------|------|-------------|
| `currentTag` | `string \| undefined` | Current tag filter |
| `tagsResult` | `string[]` | Available tag names |
| `totalPosts` | `number` | Total posts count |
| `currentPagePosts` | `number` | Posts on current page |
| `currentPage` | `number` | Current page number |
| `totalPages` | `number` | Total pages |

### BlogPagination.svelte

Pagination controls for navigating blog pages.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | `1` | Current page |
| `totalPages` | `number` | `1` | Total pages |
| `isSearchMode` | `boolean` | `false` | Search vs browse mode |
| `onPageChange` | `function` | `null` | Callback for search mode |
| `currentTag` | `string` | `null` | Tag for URL building |

**URL Generation:**
- General: `/blog/` or `/blog/page/{n}/`
- Tag filter: `/blog/tag/{tag}/` or `/blog/tag/{tag}/page/{n}/`

### BlogSearchInput.svelte

Search input with result count display.

| Prop | Type | Description |
|------|------|-------------|
| `searchQuery` | `string` | Bound search query |
| `isSearching` | `boolean` | Search mode active |
| `resultsCount` | `number` | Number of results |

**Events:**
- `search` - Dispatched on input with query value

### SearchResults.svelte

Displays search results using BlogCard components.

| Prop | Type | Description |
|------|------|-------------|
| `filteredPosts` | `Array` | Filtered posts |
| `searchQuery` | `string` | Current search query |

### BlogContainer.astro

Astro wrapper for the blog page (server-side).

## Data Flow

### Browse Mode

```
Page Load → StaticBlogSearch receives postsResult
         → BlogHeader shows tag filters
         → BlogGrid displays posts
         → BlogPagination shows page numbers (links to server pages)
```

### Search Mode

```
User Types → BlogSearchInput dispatches 'search' event
          → StaticBlogSearch debounces (300ms)
          → Fetches /api/posts.json (if not cached)
          → Filters posts client-side
          → SearchResults displays filtered posts
          → BlogPagination shows pages (buttons, not links)
```

## Search API

The search uses `/api/posts.json` which returns:

```json
[
  {
    "id": "post-slug",
    "slug": "post-slug",
    "title": "Post Title",
    "description": "Post description",
    "pubDate": "2026-01-15T00:00:00.000Z",
    "tags": ["tag1", "tag2"],
    "heroImage": "/images/hero.jpg"
  }
]
```

See [API Reference](../../../docs/API_REFERENCE.md) for details.

## Usage Example

```astro
---
// In a blog page
import StaticBlogSearch from '@/components/blog/StaticBlogSearch.svelte';
import { getBlogPosts, getAllTags } from '@/lib/blog';

const posts = await getBlogPosts({ page: 1 });
const tags = await getAllTags();
---

<StaticBlogSearch
  client:load
  postsResult={posts.posts}
  currentPage={1}
  totalPages={posts.totalPages}
  tagsResult={tags}
  totalPostsAvailable={posts.totalPosts}
/>
```

## Styling

All components use Tailwind CSS with dark mode support via the `dark:` prefix.

## Related Documentation

- [API Reference](../../../docs/API_REFERENCE.md) - /api/posts.json endpoint
- [Content Collections](../../content/README.md) - Blog post schema
- [Features: Blog Search](../../../docs/features/blog-search.md) - Detailed search architecture
- [Features: Pagination](../../../docs/features/pagination.md) - Pagination implementation
