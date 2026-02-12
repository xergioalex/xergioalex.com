---
name: add-blog-post
description: Create blog posts — from a topic (writes content) or with provided content (scaffolding). Use proactively when creating new blog posts or articles.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: sonnet
argument-hint: "[topic, brief, or content]"
# === Documentation (ignored by tools, useful for humans) ===
tier: 2
intent: create
max-files: 6
max-loc: 600
---

# Skill: Add Blog Post

## Objective

Create bilingual blog posts (English + Spanish) for XergioAleX.com using Astro Content Collections. Supports two modes:

- **Topic mode:** Given a topic or brief, writes the full article with personal-professional voice and narrative structure.
- **Content mode:** Given pre-written content, scaffolds the post files with proper frontmatter and bilingual versions.

The skill auto-detects the mode based on the inputs provided.

## Non-Goals

- Does NOT modify the Content Collections schema
- Does NOT create new tags (uses existing tags from `src/content/tags/`)
- Does NOT modify existing posts (use `doc-edit` skill)
- Does NOT create pages (use `add-page` skill)
- Does NOT download or optimize images (use `npm run images:optimize`)
- Does NOT create interactive Svelte components

## Tier Classification

**Tier: 2** - Standard

**Reasoning:** Writing quality bilingual articles requires moderate reasoning for tone calibration, narrative structure, and natural translation. Content mode (scaffolding) is simpler but shares the same bilingual creation flow.

## Inputs

### Mode Detection

| If provided | Mode | What happens |
|-------------|------|--------------|
| `$TOPIC` (no `$CONTENT`) | Topic mode | Researches, plans, and writes the article from scratch |
| `$CONTENT` (with `$TITLE`) | Content mode | Scaffolds files using the provided content |
| Both `$TOPIC` and `$CONTENT` | Content mode | Uses provided content, topic as context |

### Parameters

- `$TOPIC`: Article topic, brief, or description *(required for topic mode)*
- `$TITLE`: Post title *(required for content mode, auto-generated in topic mode)*
- `$DESCRIPTION`: Post excerpt/description *(required for content mode, auto-generated in topic mode)*
- `$CONTENT`: Pre-written post content in markdown *(triggers content mode)*
- `$TAGS`: Array of tag names (must exist in `src/content/tags/`)
- `$HERO_IMAGE`: Hero image path (from `public/`)
- `$SLUG`: Custom slug (default: kebab-case of title)
- `$LANG`: Primary language, `en` or `es` (default: `en`). The other language version will be translated.
- `$PUB_DATE`: Publication date in YYYY-MM-DD format (default: today's date)
- `$TYPE`: Article type — `blog`, `portfolio`, `tutorial` (default: `blog`, topic mode only)

## Reference Documentation

**Source of truth** for all blog post conventions:

- **[Blog Posts Feature Guide](../../../docs/features/BLOG_POSTS.md)** - File naming, directory structure, frontmatter schema, hero layouts, image organization, URL structure
- **[Image Optimization Guide](../../../docs/features/IMAGE_OPTIMIZATION.md)** - Staging workflow, optimization presets, commands

## Quick Reference

**File naming:** `YYYY-MM-DD_{slug}.md` (date prefix stripped from URLs)

**Directories:** `src/content/blog/en/` and `src/content/blog/es/`

**Frontmatter fields:** `title` (required), `description` (required), `pubDate` (required), `updatedDate`, `heroImage`, `heroLayout`, `tags`

**heroLayout:** `banner` for landscape, `side-by-side` for square, `minimal` for secondary, `none` for text-only

**Image path:** `/images/blog/posts/{slug}/hero.{ext}`

**Available tags:** Check `src/content/tags/` — currently: `personal`, `tech`, `talks`, `trading`, `portfolio`

## Steps

### Step 1: Analyze Input and Research

1. Determine mode (topic vs content) based on inputs provided
2. Check existing articles in `src/content/blog/en/` for voice reference and to avoid overlap
3. Check available tags in `src/content/tags/`
4. Verify any referenced images exist in `public/images/blog/posts/` or `public/images/blog/shared/`
5. **Topic mode only:** Identify the core story or angle. If the brief is too vague, stop and ask for clarification.

```bash
# Check existing articles
ls src/content/blog/en/

# Check available tags
ls src/content/tags/

# Verify image assets if referenced
ls public/images/blog/posts/ public/images/blog/shared/ 2>/dev/null
```

### Step 2: Generate Slug and Plan Structure

- Convert title to kebab-case for the slug (or use provided `$SLUG`)
- Ensure uniqueness among existing posts
- **File naming:** `YYYY-MM-DD_{slug}.md` (use pubDate as date prefix)
- Determine frontmatter values including `heroLayout` based on image aspect ratio

**Topic mode only — plan article structure:**

1. **Opening hook** — Personal, relatable opening (2-3 paragraphs)
2. **Context/Why** — Why this matters, why the author did it
3. **Core content** — Main story, breakdown, or explanation (3-6 sections)
4. **Visual elements** — Place images, tables, code blocks where they add value
5. **Closing** — Brief, forward-looking ("Let's keep building." / "A seguir construyendo.")
6. **Resources** — Links to repos, tools, people, references (when applicable)

### Step 3: Create Primary Language Version

Create `src/content/blog/{$LANG}/YYYY-MM-DD_{slug}.md`

**Image setup:** If a hero image is provided:
1. Verify the image folder exists: `public/images/blog/posts/{slug}/`
2. Use path `/images/blog/posts/{slug}/hero.{ext}` in frontmatter

**Topic mode — voice rules:**
- First person (I, my, me) — the author is Sergio (XergioAleX)
- Conversational and personal — like explaining to a friend
- No marketing language, no empty superlatives
- Specific details over vague claims
- Honest reflections — what worked, what didn't, what was learned

**Formatting rules:**
- Use `---` horizontal rules between major sections
- Use `##` for section headings, `###` for subsections
- Wrap transparent PNG/SVG images in dark background containers:
  ```html
  <div style="background:#0F1124;border-radius:12px;padding:2rem;text-align:center">

  ![Alt text](/images/path/to/image.png)

  </div>
  ```
- Include alt text for all images

**Markdown template:**

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

Content starts here...
```

### Step 4: Create Translated Version (Other Language)

**MANDATORY:** Create the translated version in the other language directory.

- If primary is English → save in `src/content/blog/es/YYYY-MM-DD_{slug}.md`
- If primary is Spanish → save in `src/content/blog/en/YYYY-MM-DD_{slug}.md`
- Use the same date prefix and slug

**Translation rules:**
- Translate IDEAS, not words — should read as if originally written in that language
- Translate: `title`, `description`, all body content, alt text
- Preserve exactly: `pubDate`, `updatedDate`, `heroImage`, `heroLayout`, `tags`, code blocks, URLs
- Adapt idioms and expressions to sound natural
- Use informal-professional register
- When translating to Spanish, prefer Colombian Spanish phrasing
- Do NOT translate code blocks, CLI commands, technical terms, product names

### Step 5: Validate

```bash
npm run build
```

Verify:
- Both files exist with matching frontmatter structure
- All image paths reference existing files
- Tags reference existing tag definitions

## Output Format

### Success Output

```
## Blog Post Created (Bilingual)

### Files Created
- English: `src/content/blog/en/YYYY-MM-DD_{slug}.md` -> URL: `/blog/{slug}/`
- Spanish: `src/content/blog/es/YYYY-MM-DD_{slug}.md` -> URL: `/es/blog/{slug}/`

### Details
- **Title (EN):** {title}
- **Title (ES):** {title_es}
- **Mode:** {topic|content}
- **Tags:** {tags}
- **Date:** {pubDate}
- **Hero:** {heroImage or "none"} ({heroLayout})

### Build: Passing

### Commit Message
content: add blog post "{title}" (en + es)
```

## Guardrails

### Scope Limits

- **Maximum files:** 6 (2 article files + up to 4 supporting assets)
- **Maximum LOC:** 600 (combined EN + ES, ~300 per language)
- **Allowed directories:** `src/content/blog/en/`, `src/content/blog/es/`, `public/images/`
- **Forbidden directories:** `src/pages/`, `src/components/`, `src/layouts/`

### Safety Checks

- [ ] Slug doesn't conflict with an existing article
- [ ] All referenced images exist
- [ ] Tags are valid (exist in `src/content/tags/`)
- [ ] Frontmatter matches the Content Collections schema

### Bilingual Enforcement

- MUST create both language versions. Never create a post in only one language.
- If translation quality is uncertain, use `/translate-sync` skill after creating the primary version.

### Stop Conditions

**Stop and ask** if:

- Topic is too vague to write an authentic personal article (topic mode)
- Need to create a new tag
- Article would require more than 600 lines combined
- Post requires custom components not available
- Article conflicts with or heavily overlaps existing content
- Translation quality is uncertain for specialized content

## Definition of Done

- [ ] Post created in `src/content/blog/en/` (English version)
- [ ] Post created in `src/content/blog/es/` (Spanish version)
- [ ] Both versions have matching frontmatter structure
- [ ] Translated title and description are natural and accurate
- [ ] Voice is personal-professional, not marketing copy (topic mode)
- [ ] Spanish reads naturally (not machine-translated)
- [ ] All referenced images exist
- [ ] `npm run build` passes

## Escalation Conditions

**Escalate to a higher tier** (or ask user) if:

- Article requires new Content Collections schema fields
- Topic requires creating new page templates or components
- Multiple articles need to be created as a series (plan with `architect` first)
- Article requires custom interactive elements (Svelte islands)

## Examples

### Example 1: Topic Mode — Portfolio Article

**Input:**
```
$TOPIC: Portfolio article about my XergioAleX personal branding. Ninja coder logo designed by Koru.
$TAG: portfolio
$PUB_DATE: 2020-12-31
$HERO_IMAGE: /images/blog/posts/personal-branding-xergioalex/hero.jpg
```

**Creates:**
- `src/content/blog/en/2020-12-31_personal-branding-xergioalex.md` (written from scratch)
- `src/content/blog/es/2020-12-31_personal-branding-xergioalex.md` (translated)
- Narrative with personal voice, sections about the logo, color palette, style guide

### Example 2: Content Mode — Post with Provided Content

**Input:**
```
$TITLE: Getting Started with Astro
$DESCRIPTION: Learn how to build fast websites with Astro
$CONTENT: [pre-written markdown content]
$TAGS: ['tech']
```

**Creates:**
- `src/content/blog/en/2026-02-11_getting-started-with-astro.md` (scaffolded)
- `src/content/blog/es/2026-02-11_getting-started-with-astro.md` (translated)

### Example 3: Topic Mode — Technical Blog Post

**Input:**
```
$TOPIC: How I built a self-hosted CI/CD pipeline using Docker and GitHub Actions
$TAG: tech
```

**Creates:**
- EN + ES articles with personal narrative about motivation, decisions, and lessons learned

### Example 4: Escalation — Vague Topic

**Input:**
```
$TOPIC: AI
```

**Result:** Stopped — topic too broad. Needs a specific personal experience, project, or angle.

## Related

- **[Blog Posts Feature Guide](../../../docs/features/BLOG_POSTS.md)** - Source of truth for blog conventions
- **[Image Optimization Guide](../../../docs/features/IMAGE_OPTIMIZATION.md)** - Image pipeline and staging workflow
- [`content-writer`](../../agents/content-writer.md) - Agent persona for complex content projects
- [`doc-edit`](../doc-edit/SKILL.md) - Edit existing posts
- [`add-page`](../add-page/SKILL.md) - Create pages
- [`translate-sync`](../translate-sync/SKILL.md) - Synchronize translations
- [`i18n-guardian`](../../agents/i18n-guardian.md) - Translation quality verification

## Changelog

| Version | Date       | Changes |
| ------- | ---------- | ------- |
| 2.0.0   | 2026-02-11 | Unified with write-article skill. Added topic mode, voice rules, article structure. |
| 1.0.0   | 2026-02-10 | Initial version (content mode only) |
