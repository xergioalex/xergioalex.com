---
name: add-blog-post
description: Create blog posts with Content Collections frontmatter
tier: 1
intent: create
max-files: 1
max-loc: 200
---

# Skill: Add Blog Post

## Objective

Create new blog posts using Astro Content Collections with proper frontmatter schema, following the defined structure in `content.config.ts`.

## Non-Goals

- Does NOT modify the Content Collections schema
- Does NOT create new tags (creates post with existing tags)
- Does NOT modify existing posts
- Does NOT create pages (use add-page skill)

## Tier Classification

**Tier: 1** - Light/Cheap

**Reasoning:** Creating a blog post follows a strict schema, is entirely content-focused, and has very low risk.

## Inputs

### Required Parameters

- `$TITLE`: Post title
- `$DESCRIPTION`: Post excerpt/description
- `$CONTENT`: Post content (markdown)

### Optional Parameters

- `$TAGS`: Array of tag names (must exist in `src/content/tags/`)
- `$HERO_IMAGE`: Hero image path (from `public/`)
- `$SLUG`: Custom slug (default: kebab-case of title)

## Frontmatter Schema

From `src/content.config.ts`:

```typescript
schema: z.object({
  title: z.string(),           // Required
  description: z.string(),     // Required
  pubDate: z.coerce.date(),    // Required
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
})
```

## Available Tags

Check `src/content/tags/` for available tags:
- `personal` - Personal posts
- `tech` - Technical content
- `talks` - Conference talks
- `trading` - Trading content

## Steps

### Step 1: Generate Slug

- Convert title to kebab-case
- Ensure uniqueness
- Example: "My First Post" → `my-first-post.md`

### Step 2: Create Post File

**Markdown Template:**

```markdown
---
title: 'Post Title Here'
description: 'A brief description of what this post is about.'
pubDate: 'Jan 31 2026'
heroImage: '/blog-placeholder-1.jpg'
tags: ['tech']
---

## Introduction

Your content starts here...

## Section Heading

More content with **bold** and *italic* text.

### Subsection

- List item 1
- List item 2

## Conclusion

Final thoughts...
```

**MDX Template (for interactive content):**

```mdx
---
title: 'Interactive Post'
description: 'A post with interactive elements'
pubDate: 'Jan 31 2026'
tags: ['tech']
---

import { Code } from 'astro:components';

## Introduction

This post includes interactive elements.

<Code code={`const x = 1;`} lang="ts" />
```

### Step 3: Validate

```bash
npm run astro:check
npm run build
```

## Output Format

### Success Output

```
## ✅ Blog Post Created

### Post
- Title: {title}
- File: `src/content/blog/{slug}.md`
- URL: `/blog/{slug}`

### Frontmatter
- pubDate: {date}
- tags: {tags}
- heroImage: {image or 'none'}

### Validation
- Astro check: ✅
- Build: ✅

### Commit Message
content: add blog post "{title}"
```

## Guardrails

### Required Elements

- [ ] Title is descriptive
- [ ] Description is 1-2 sentences
- [ ] pubDate is set
- [ ] Content has at least one heading

### Frontmatter Rules

- `title`: Required, string
- `description`: Required, string, 50-160 chars recommended
- `pubDate`: Required, valid date format
- `tags`: Optional, must be existing tags
- `heroImage`: Optional, path from `public/`

### Stop Conditions

**Stop and ask** if:

- Need to create a new tag
- Post requires custom components not available
- Unsure about content/topic

## Definition of Done

- [ ] File created in `src/content/blog/`
- [ ] Frontmatter is complete and valid
- [ ] Content is formatted properly
- [ ] `npm run astro:check` passes
- [ ] `npm run build` passes

## Examples

### Example 1: Simple Post

**Input:**
```
$TITLE: Getting Started with Astro
$DESCRIPTION: Learn how to build fast websites with Astro
$TAGS: ['tech']
```

**Creates:** `src/content/blog/getting-started-with-astro.md`

### Example 2: Post with Hero Image

**Input:**
```
$TITLE: My Travel Adventures
$DESCRIPTION: Sharing my recent travel experiences
$HERO_IMAGE: /blog-placeholder-2.jpg
$TAGS: ['personal']
```

**Creates:** `src/content/blog/my-travel-adventures.md`

### Example 3: MDX Post

**Input:**
```
$TITLE: Interactive Code Examples
$DESCRIPTION: Blog post with live code examples
$TAGS: ['tech']
$SLUG: interactive-code-examples.mdx
```

**Creates:** `src/content/blog/interactive-code-examples.mdx`

## Related

- [doc-edit](../doc-edit/SKILL.md) - Edit existing posts
- [add-page](../add-page/SKILL.md) - Create pages
- src/content/README.md - Content Collections
- content.config.ts - Schema definition
