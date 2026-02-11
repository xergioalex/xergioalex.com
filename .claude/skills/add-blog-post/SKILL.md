---
name: add-blog-post
description: Create blog posts with Content Collections frontmatter. Use proactively when creating new blog posts.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: haiku
# === Documentation (ignored by tools, useful for humans) ===
tier: 1
intent: create
max-files: 2
max-loc: 400
---

# Skill: Add Blog Post

## Objective

Create new blog posts using Astro Content Collections with proper frontmatter schema, following the defined structure in `content.config.ts`. Creates posts in BOTH English and Spanish to maintain bilingual parity.

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
- `$LANG`: Primary language of the provided content, `en` or `es` (default: `en`). The other language version will be translated automatically.

## Frontmatter Schema

From `src/content.config.ts`:

```typescript
schema: z.object({
  title: z.string(),           // Required
  description: z.string(),     // Required
  pubDate: z.coerce.date(),    // Required
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),  // Path: /images/blog/posts/{slug}/hero.{ext}
  heroLayout: z.enum(['banner', 'side-by-side', 'minimal', 'none']).default('banner').optional(),
  tags: z.array(z.string()).optional(),
})
```

**heroLayout values:**
- `banner` (default): Full-width image above title. Best for landscape images.
- `side-by-side`: Two-column layout. Best for square images (1:1).
- `minimal`: Small thumbnail. For posts where image is secondary.
- `none`: No hero image area. For text-only posts.

## Available Tags

Check `src/content/tags/` for available tags:
- `personal` - Personal posts
- `tech` - Technical content
- `talks` - Conference talks
- `trading` - Trading content

## Steps

### Step 1: Generate Slug and Filename

- Convert title to kebab-case for the slug
- Ensure uniqueness among existing posts
- **File naming format:** `YYYY-MM-DD_{slug}.md` (use pubDate as date prefix)
- Example: "My First Post" with pubDate 2026-01-31 → `2026-01-31_my-first-post.md`
- The date prefix keeps files chronologically sorted but is stripped from URLs

### Step 2: Create Post File (Primary Language)

Create the post in the primary language directory: `src/content/blog/{$LANG}/YYYY-MM-DD_{slug}.md`

**Image setup:** If a hero image is provided:
1. Create the image folder: `public/images/blog/posts/{slug}/`
2. Place the hero image as: `public/images/blog/posts/{slug}/hero.{ext}`
3. Use path `/images/blog/posts/{slug}/hero.{ext}` in frontmatter

**Markdown Template:**

```markdown
---
title: 'Post Title Here'
description: 'A brief description of what this post is about.'
pubDate: 'Jan 31 2026'
heroImage: '/images/blog/posts/post-title-here/hero.jpg'
heroLayout: 'banner'
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

### Step 3: Create Translated Version (Other Language)

**MANDATORY:** Create the translated version in the other language directory.

- If primary language is English (`$LANG=en`): translate and save in `src/content/blog/es/YYYY-MM-DD_{slug}.md`
- If primary language is Spanish (`$LANG=es`): translate and save in `src/content/blog/en/YYYY-MM-DD_{slug}.md`
- Use the same date prefix and slug as the primary language version

**Translation rules:**
- Translate: `title`, `description`, and all body content
- Preserve exactly: `pubDate`, `updatedDate`, `heroImage`, `tags`, code blocks, formatting
- Use natural, idiomatic translations (not literal word-for-word)
- Do NOT translate code blocks, CLI commands, or technical identifiers
- Maintain the same markdown structure (headings, lists, emphasis)

### Step 4: Validate

```bash
npm run astro:check
npm run build
```

## Output Format

### Success Output

```
## ✅ Blog Post Created (Bilingual)

### Posts
- English: `src/content/blog/en/{slug}.md` -> URL: `/blog/{slug}`
- Spanish: `src/content/blog/es/{slug}.md` -> URL: `/es/blog/{slug}`

### Frontmatter
- pubDate: {date}
- tags: {tags}
- heroImage: {image or 'none'}

### Validation
- Astro check: ✅
- Build: ✅

### Commit Message
content: add blog post "{title}" (en + es)
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

### Bilingual Enforcement

- MUST create both language versions. Never create a post in only one language.
- If translation quality for the content is uncertain, use `/translate-sync` skill after creating the primary language version.

### Stop Conditions

**Stop and ask** if:

- Need to create a new tag
- Post requires custom components not available
- Unsure about content/topic
- Translation quality is uncertain for specialized content

## Definition of Done

- [ ] Post created in `src/content/blog/en/` (English version)
- [ ] Post created in `src/content/blog/es/` (Spanish version)
- [ ] Both versions have matching frontmatter structure
- [ ] Translated title and description are natural and accurate
- [ ] Frontmatter is complete and valid in both files
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

**Creates:**
- `src/content/blog/en/2026-01-31_getting-started-with-astro.md`
- `src/content/blog/es/2026-01-31_getting-started-with-astro.md` (translated)

### Example 2: Post with Hero Image

**Input:**
```
$TITLE: My Travel Adventures
$DESCRIPTION: Sharing my recent travel experiences
$HERO_IMAGE: /images/blog/posts/my-travel-adventures/hero.jpg
$TAGS: ['personal']
```

**Creates:**
- `src/content/blog/en/2026-01-31_my-travel-adventures.md`
- `src/content/blog/es/2026-01-31_my-travel-adventures.md` (translated)
- Image folder: `public/images/blog/posts/my-travel-adventures/`

### Example 3: Spanish-Primary Post

**Input:**
```
$TITLE: Mi Experiencia con Astro
$DESCRIPTION: Compartiendo mi experiencia construyendo sitios con Astro
$TAGS: ['tech']
$LANG: es
```

**Creates:**
- `src/content/blog/es/2026-01-31_mi-experiencia-con-astro.md` (primary)
- `src/content/blog/en/2026-01-31_mi-experiencia-con-astro.md` (translated to English)

## Related

- [doc-edit](../doc-edit/SKILL.md) - Edit existing posts
- [add-page](../add-page/SKILL.md) - Create pages
- [translate-sync](../translate-sync/SKILL.md) - Synchronize translations
- src/content/README.md - Content Collections
- content.config.ts - Schema definition
