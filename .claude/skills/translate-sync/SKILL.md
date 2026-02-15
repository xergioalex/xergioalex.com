---
name: translate-sync
description: Synchronize content between English and Spanish versions. Use proactively when content needs multilingual synchronization.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: haiku
# === Documentation (ignored by tools, useful for humans) ===
tier: 1
intent: execute
max-files: 10
max-loc: 500
---

# Skill: Translate Sync

## Objective

Synchronize content between English (en) and Spanish (es) versions of pages, blog posts, and translation strings. Ensures multilingual parity across the entire site.

## Non-Goals

- Does NOT create new pages or posts from scratch (use `add-page` or `add-blog-post`)
- Does NOT modify the translation system architecture
- Does NOT add new languages to `src/lib/i18n.ts` (only syncs existing active languages)
- Does NOT change Content Collection schemas or `content.config.ts`

## Tier Classification

**Tier: 1** - Light/Cheap

**Reasoning:** Translation follows established patterns, is content-focused, and has low risk. The source content already exists; this skill produces the counterpart.

## Inputs

### Required Parameters

- `$SOURCE_FILE`: The file that was recently created or modified (en or es version)

### Optional Parameters

- `$TARGET_LANG`: Target language to sync to (default: auto-detect the opposite language from source path)
- `$CONTENT_TYPE`: Type of content: `page`, `blog`, `translations` (default: auto-detect from file path)

## Prerequisites

- [ ] Source file exists and is valid
- [ ] For blog posts: understand Content Collection schema in `content.config.ts`
- [ ] For translation strings: understand `src/lib/translations.ts` structure

## Steps

### Step 1: Detect Source Language and Content Type

Determine the source language and content type from the file path:

| Path Pattern | Language | Content Type |
|---|---|---|
| `src/pages/es/**` | Spanish | page |
| `src/pages/**` (not es/) | English | page |
| `src/content/blog/es/**` | Spanish | blog |
| `src/content/blog/en/**` | English | blog |
| `src/lib/translations.ts` | Both | translations |

Set target language to the opposite of source.

### Step 2: Find or Create Target File

Map source to target path:

| Source | Target |
|---|---|
| `src/pages/{path}.astro` | `src/pages/es/{path}.astro` |
| `src/pages/es/{path}.astro` | `src/pages/{path}.astro` |
| `src/content/blog/en/{slug}.md` | `src/content/blog/es/{slug}.md` |
| `src/content/blog/es/{slug}.md` | `src/content/blog/en/{slug}.md` |

If the target file does not exist, create it using the source as a template. If it exists, update it to match the source structure.

### Step 3: Translate Content

Translate the content following these rules:

**For blog posts:**
- Translate: `title`, `description`, and body content
- Preserve exactly: `pubDate`, `updatedDate`, `heroImage`, `tags`, code blocks, frontmatter structure
- Use natural, idiomatic translations (not literal word-for-word)
- Preserve all markdown formatting, headings, lists, links
- Do NOT translate code blocks, terminal commands, or technical identifiers

**For pages (.astro):**
- Set the correct `lang` value: `const lang: Language = 'en';` or `'es';`
- Ensure `getTranslations(lang)` is used for all text
- Translate any inline text content
- Preserve all imports, component structure, and layout
- Update the `lang` prop on `MainLayout`

**For translations.ts:**
- Find keys that exist in one language but not the other
- Add the missing translations maintaining the same nested structure
- Ensure both `en` and `es` objects have identical key structures

### Step 4: Validate Synchronization

```bash
# Check both files exist
ls -la {source_file} {target_file}

# Run code quality checks
npm run biome:check
npm run astro:check
npm run build
```

## Output Format

### Success Output

```
## Translation Sync Complete

### Source
- File: {source_file}
- Language: {en|es}
- Type: {page|blog|translations}

### Target
- File: {target_file}
- Language: {en|es}
- Action: {created|updated}

### Changes
- {list of specific changes made}

### Validation
- Biome check: {pass/fail}
- Astro check: {pass/fail}
- Build: {pass/fail}

### Commit Message
content: sync {content_type} translation for "{identifier}" ({source_lang} -> {target_lang})
```

## Guardrails

### Scope Limits

- Maximum files: 10 per invocation
- Maximum LOC: 500

### Translation Quality Rules

- Use natural, idiomatic translations (not literal)
- Preserve technical terminology without translation (code terms, product names, URLs)
- Use formal-but-friendly tone for Spanish (consistent with existing site voice)
- Maintain the same markdown structure and formatting

### Stop Conditions

Stop and ask if:

- Translation quality is uncertain for domain-specific or technical content
- Source file has validation errors or malformed frontmatter
- Content type cannot be determined from the file path
- More than 10 files need synchronization (break into batches)
- Source file contains content that seems incomplete or draft-quality

## Definition of Done

- [ ] Target file exists with translated content
- [ ] Frontmatter structure matches source (for blog posts)
- [ ] All user-visible text is translated
- [ ] Code blocks, commands, and technical content are preserved untranslated
- [ ] `lang` value is correct in target page files
- [ ] `npm run biome:check` passes
- [ ] `npm run astro:check` passes
- [ ] `npm run build` passes

## Escalation Conditions

Escalate to higher tier if:

- Content requires domain-specific terminology review -> use `i18n-guardian` agent
- More than 10 files need synchronization -> break into multiple invocations
- Structural changes are needed (new components, new routes) -> escalate to Tier 2
- Translation system architecture needs modification -> escalate to `architect` agent

## Examples

### Example 1: Sync a New English Blog Post to Spanish

**Input:**
```
$SOURCE_FILE: src/content/blog/en/getting-started-with-astro.md
```

**Actions:**
1. Detect: English blog post
2. Target: `src/content/blog/es/getting-started-with-astro.md`
3. Translate title, description, and body to Spanish
4. Preserve frontmatter dates, tags, hero image
5. Validate and report

**Creates:** `src/content/blog/es/getting-started-with-astro.md`

### Example 2: Sync a Modified Spanish Page to English

**Input:**
```
$SOURCE_FILE: src/pages/es/about.astro
```

**Actions:**
1. Detect: Spanish page
2. Target: `src/pages/about.astro`
3. Update English page content to match Spanish changes
4. Ensure `lang = 'en'` in target
5. Validate and report

**Updates:** `src/pages/about.astro`

### Example 3: Add Missing Translation Strings

**Input:**
```
$SOURCE_FILE: src/lib/translations.ts
$CONTENT_TYPE: translations
```

**Actions:**
1. Detect: translations file
2. Scan for keys present in `en` but missing in `es` (and vice versa)
3. Add missing translations
4. Validate and report

**Updates:** `src/lib/translations.ts`

## Related

- [add-blog-post](../add-blog-post/SKILL.md) - Create multilingual blog posts
- [add-page](../add-page/SKILL.md) - Create multilingual pages
- [add-component](../add-component/SKILL.md) - Create components with i18n support
- `i18n-guardian` agent - Translation quality specialist
