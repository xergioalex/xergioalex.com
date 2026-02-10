---
name: write-article
description: Write a bilingual blog post or portfolio article with personal-professional voice and narrative structure. Use proactively when creating new articles or portfolio case studies.
# === Universal fields (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific (full functionality) ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: sonnet
argument-hint: "[topic or brief]"
# === Documentation fields (ignored by all tools, useful for humans) ===
tier: 2
intent: create
max-files: 6
max-loc: 600
---

# Skill: Write Article

## Objective

Write a complete bilingual blog post or portfolio article for XergioAleX.com, creating both English and Spanish versions with a personal-professional voice, narrative structure, and proper Content Collections frontmatter. The article should read like it was written by the site owner — authentic, conversational, and grounded in real experience.

## Non-Goals

- Does NOT create page layouts or modify blog templates
- Does NOT download or optimize images (images must already exist or be provided)
- Does NOT create new tag definitions (uses existing tags from `src/content/tags/`)
- Does NOT modify `translations.ts` unless new UI strings are needed
- Does NOT handle content strategy (topic selection, publishing schedule)
- Does NOT create interactive Svelte components for articles

## Tier Classification

**Tier: 2** - Standard

**Reasoning:** Writing quality bilingual articles requires moderate reasoning for tone calibration, narrative structure, natural translation, and adapting voice across languages. More than mechanical content generation (Tier 1) but less than architectural planning (Tier 3).

## Inputs

### Required Parameters

- `$TOPIC`: The article topic, brief, or detailed description of what to write about

### Optional Parameters

- `$SLUG`: Article URL slug (default: auto-generated from topic in kebab-case)
- `$TAG`: Content tag (default: inferred from topic; must exist in `src/content/tags/`)
- `$PUB_DATE`: Publication date in YYYY-MM-DD format (default: today's date)
- `$HERO_IMAGE`: Path to hero image (default: none — article created without hero)
- `$TYPE`: Article type — `blog`, `portfolio`, `tutorial` (default: `blog`)

## Prerequisites

Before running this skill, ensure:

- [ ] Topic or brief is clear enough to write an authentic personal article
- [ ] If images are referenced, they exist in `public/images/`
- [ ] If a specific tag is needed, it exists in `src/content/tags/`
- [ ] Working directory is the project root (`/app`)

## Steps

### Step 1: Analyze Brief and Research

Read the topic/brief and gather context:

1. Identify the core story or angle
2. Check existing articles in `src/content/blog/en/` for voice reference and to avoid overlap
3. Check available tags in `src/content/tags/`
4. Verify any referenced images exist in `public/images/`
5. If the brief is too vague, stop and ask for clarification

```bash
# Check existing articles for reference
ls src/content/blog/en/

# Check available tags
ls src/content/tags/

# Verify image assets if referenced
ls public/images/blog/ 2>/dev/null
```

### Step 2: Plan Article Structure

Create a mental outline following this convention:

1. **Opening hook** — Personal, relatable opening (2-3 paragraphs)
2. **Context/Why** — Why this matters, why the author did it
3. **Core content** — Main story, breakdown, or explanation (3-6 sections)
4. **Visual elements** — Place images, tables, code blocks where they add value
5. **Closing** — Brief, forward-looking ("Let's keep building." / "A seguir construyendo.")
6. **Resources** — Links to repos, tools, people, references (when applicable)

Determine frontmatter values:
- `title`: Descriptive, engaging, not clickbait
- `description`: 1-2 sentences summarizing the article
- `pubDate`: The date provided or today
- `heroImage`: Path if available
- `tags`: Array of existing tag slugs

### Step 3: Write English Version

Create `src/content/blog/en/{slug}.md`:

**Voice rules:**
- First person (I, my, me)
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
- Use inline HTML `<span>` elements for color swatches (not external image services)
- Include alt text for all images

### Step 4: Write Spanish Version

Create `src/content/blog/es/{slug}.md`:

**Translation rules:**
- Translate IDEAS, not words — the Spanish should read as if originally written in Spanish
- Adapt idioms and expressions to sound natural
- Keep the same first-person, conversational voice
- Preserve all frontmatter structure (translate title and description)
- Keep all image paths, tags, code blocks, and URLs identical
- Use informal-professional register (not overly formal)
- When in doubt, prefer Colombian Spanish phrasing

**What to translate:**
- Title, description, all body text, section headings
- Alt text for images
- Creative names (e.g., color names) should have Spanish equivalents

**What NOT to translate:**
- Code blocks, CLI commands, technical terms
- Product names, project names, URLs
- Tag slugs, frontmatter keys
- Image paths

### Step 5: Validate

Run validation checks:

```bash
# Verify both files exist
ls -la src/content/blog/en/{slug}.md src/content/blog/es/{slug}.md

# Check build
npm run build

# Check code quality (if any code files were modified)
npm run biome:check
```

Verify manually:
- Both files have identical frontmatter structure
- All image paths reference existing files
- Tags reference existing tag definitions
- No hardcoded UI strings (if components were modified)

## Output Format

### Success Output

```
## Article Written

### Files Created
- `src/content/blog/en/{slug}.md` — English version ({word_count} words)
- `src/content/blog/es/{slug}.md` — Spanish version

### Details
- **Title (EN):** {title}
- **Title (ES):** {title_es}
- **Tags:** {tags}
- **Date:** {pubDate}
- **Hero Image:** {heroImage or "none"}
- **Sections:** {count}

### Preview
- EN: /blog/{slug}/
- ES: /es/blog/{slug}/

### Build: Passing
```

### Failure Output

```
## Article Not Written

### Reason
{Why the article couldn't be completed}

### What's Needed
{Specific information or action needed to proceed}
```

## Guardrails

### Scope Limits

- **Maximum files:** 6 (2 article files + up to 4 supporting image/asset references)
- **Maximum LOC:** 600 (combined EN + ES, ~300 per language)
- **Allowed directories:** `src/content/blog/en/`, `src/content/blog/es/`, `public/images/`
- **Forbidden directories:** `src/pages/`, `src/components/`, `src/layouts/`

### Safety Checks

Before making changes:

- [ ] Verify the slug doesn't conflict with an existing article
- [ ] Verify all referenced images exist
- [ ] Verify tags are valid (exist in `src/content/tags/`)
- [ ] Verify frontmatter matches the Content Collections schema

### Stop Conditions

**Stop immediately** and report if:

- Topic is too vague to write an authentic personal article (ask for clarification)
- Article would require more than 600 lines combined (suggest splitting into a series)
- Required images or assets don't exist and can't be substituted
- Topic requires creating new tags or modifying the Content Collections schema
- Article conflicts with or heavily overlaps existing content

## Definition of Done

This skill is **complete** when ALL of the following are true:

- [ ] English article exists at `src/content/blog/en/{slug}.md` with valid frontmatter
- [ ] Spanish article exists at `src/content/blog/es/{slug}.md` with matching frontmatter
- [ ] Both articles have the same sections and structure
- [ ] Voice is personal-professional (not marketing/advertising)
- [ ] Spanish reads naturally (not machine-translated)
- [ ] All referenced images exist
- [ ] Resources section included (when applicable)
- [ ] `npm run build` passes

## Escalation Conditions

**Escalate to a higher tier** (or ask user) if:

- Article requires new Content Collections schema fields
- Topic requires creating new page templates or components
- Multiple articles need to be created as a series (plan with `architect` first)
- Article requires custom interactive elements (Svelte islands)

**Escalation Path:**

1. First: Try to simplify the article to fit within scope
2. Then: Ask user for missing information or clarification
3. Finally: Escalate to `architect` for structural changes or `content-writer` agent for complex multi-step content projects

## Examples

### Example 1: Portfolio Article

**Context:** Writing about a personal branding project

**Input:**

```
$TOPIC: Portfolio article about my XergioAleX personal branding. Ninja coder logo designed by Koru.
Branding repo: github.com/xergioalex/personal-branding
$TAG: portfolio
$PUB_DATE: 2020-12-31
$HERO_IMAGE: /images/blog/personal-branding-hero.jpg
```

**Execution:**
Creates EN + ES articles with sections: Why I Built a Brand, Why a Ninja, Working with Koru, Breaking Down the Logo, Color Palette, Logo Variants, Where I Use It, Style Guide, Resources. Personal voice throughout, creative color names (Ninja Navy / Marino Ninja), dark background containers for logo images.

**Output:**

```
## Article Written

### Files Created
- `src/content/blog/en/personal-branding-xergioalex.md` — English (227 lines)
- `src/content/blog/es/personal-branding-xergioalex.md` — Spanish (227 lines)

### Details
- **Title (EN):** Building the XergioAleX Brand: The Ninja Coder Identity
- **Title (ES):** Construyendo la Marca XergioAleX: La Identidad del Ninja Coder
- **Tags:** [portfolio]
- **Date:** 2020-12-31
- **Sections:** 10

### Build: Passing
```

### Example 2: Technical Blog Post

**Context:** Writing about a DevOps project

**Input:**

```
$TOPIC: How I built a self-hosted CI/CD pipeline using Docker and GitHub Actions for my side projects
$TAG: tech
```

**Execution:**
Creates EN + ES articles with personal narrative about the motivation, technical decisions, architecture overview, and lessons learned. Includes code snippets for key configurations.

### Example 3: Escalation — Vague Topic

**Context:** Topic too vague to write authentically

**Input:**

```
$TOPIC: AI
```

**Result:** Escalated because the topic "AI" is too broad. No specific personal experience, project, or angle was provided. The skill needs a concrete story to tell — not just a subject area.

## Related Skills/Agents

- [`content-writer`](../../agents/content-writer.md) - Agent persona for complex content projects
- [`add-blog-post`](../add-blog-post/SKILL.md) - Basic blog post scaffold (frontmatter only)
- [`translate-sync`](../translate-sync/SKILL.md) - Synchronize existing content between languages
- [`i18n-guardian`](../../agents/i18n-guardian.md) - Translation quality verification
- [`doc-edit`](../doc-edit/SKILL.md) - Documentation editing (non-article content)

## Changelog

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-02-10 | Initial version |
