# Content Collections (`src/content/`)

This directory contains Content Collections for blog posts and tags. Astro's Content Collections provide type-safe frontmatter validation and easy querying of content.

## Directory Structure

```
content/
├── blog/                    # Blog posts collection
│   ├── ejemplo.md
│   ├── first-post.md
│   ├── markdown-style-guide.md
│   ├── personal-post-1.md
│   ├── personal-post-2.md
│   ├── second-post.md
│   ├── third-post.md
│   └── using-mdx.mdx
└── tags/                    # Tags collection
    ├── personal.md
    ├── talks.md
    ├── tech.md
    └── trading.md
```

## Schema Definition

Schemas are defined in `src/content.config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const tags = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, tags };
```

## Blog Collection

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Post title |
| `description` | `string` | Yes | Post description/excerpt |
| `pubDate` | `Date` | Yes | Publication date |
| `updatedDate` | `Date` | No | Last update date |
| `heroImage` | `string` | No | Hero image path |
| `tags` | `string[]` | No | Array of tag names |

### Creating a New Blog Post

1. Create a new `.md` or `.mdx` file in `content/blog/`:

```bash
touch src/content/blog/my-new-post.md
```

2. Add required frontmatter:

```markdown
---
title: 'My New Post Title'
description: 'A brief description of what this post is about.'
pubDate: 'Jan 31 2026'
heroImage: '/blog-placeholder-1.jpg'
tags: ['tech', 'personal']
---

Your content starts here...

## Section Heading

More content with **bold** and *italic* text.
```

### Frontmatter Examples

**Minimal (required fields only):**

```markdown
---
title: 'Post Title'
description: 'Post description'
pubDate: '2026-01-31'
---
```

**Complete (all fields):**

```markdown
---
title: 'Complete Post Example'
description: 'This post demonstrates all available frontmatter fields.'
pubDate: 'Jan 31 2026'
updatedDate: 'Feb 01 2026'
heroImage: '/images/hero.jpg'
tags: ['tech', 'tutorial']
---
```

### Using MDX

MDX files (`.mdx`) allow you to use components inside markdown:

```mdx
---
title: 'MDX Post'
description: 'Using components in markdown'
pubDate: '2026-01-31'
---

import { Code } from 'astro:components';

# My MDX Post

Regular markdown works here.

<Code code={`const x = 1;`} lang="js" />
```

## Tags Collection

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Tag identifier (used in blog posts) |
| `description` | `string` | No | Tag description |

### Creating a New Tag

1. Create a new `.md` file in `content/tags/`:

```bash
touch src/content/tags/new-tag.md
```

2. Add frontmatter:

```markdown
---
name: "new-tag"
description: "Description of this tag category."
---
```

**Note:** The `name` field should match the tag strings used in blog posts' `tags` array.

### Current Tags

| Tag | Description |
|-----|-------------|
| `personal` | Personal posts and experiences |
| `talks` | Conference talks and presentations |
| `tech` | Technical tutorials and guides |
| `trading` | Trading and finance content |

## Querying Collections

### Get All Posts

```typescript
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
```

### Get Posts by Tag

```typescript
const techPosts = await getCollection('blog', ({ data }) => {
  return data.tags?.includes('tech');
});
```

### Get Single Post

```typescript
import { getEntry } from 'astro:content';

const post = await getEntry('blog', 'first-post');
```

### Get All Tags

```typescript
const allTags = await getCollection('tags');
```

### Render Post Content

```typescript
const { Content, headings } = await post.render();
```

Then use in Astro:

```astro
<Content />
```

## Content Organization

### File Naming

- Use kebab-case: `my-post-title.md`
- No spaces or special characters
- The filename becomes the post's slug

### Images

Blog images can be stored in:
- `public/` - For static images (recommended for hero images)
- `src/assets/` - For processed images with optimization

Reference images in frontmatter:

```markdown
heroImage: '/blog-placeholder-1.jpg'  # From public/
```

## Type Safety

Content Collections provide full TypeScript support:

```typescript
import type { CollectionEntry } from 'astro:content';

// Typed post entry
const post: CollectionEntry<'blog'> = await getEntry('blog', 'first-post');

// Access typed data
console.log(post.data.title);  // string
console.log(post.data.pubDate); // Date
console.log(post.data.tags);    // string[] | undefined
```

## Related Documentation

- [Blog Components](../components/blog/README.md)
- [Library Functions](../lib/README.md) - `getBlogPosts()` utility
- [API Reference](../../docs/API_REFERENCE.md) - Search API
- [Pages](../pages/README.md) - Blog routing
- [Features: Blog Search](../../docs/features/BLOG_SEARCH.md)
