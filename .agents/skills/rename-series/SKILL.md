---
name: rename-series
description: Rename a blog series safely — series file, image directory, post frontmatters, translations, and 301 redirects, with dev-server verification. Use proactively when renaming or re-slugging an existing series.
disable-model-invocation: false
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: haiku
argument-hint: "<old-slug> <new-slug>"
tier: 1
intent: execute
max-files: 20
max-loc: 0
---

# Skill: Rename Series

## Objective

Rename an existing blog series (change its slug) with zero broken URLs: migrate the series definition, its image directory, every post frontmatter that references it (EN + ES), the translation entries, and add 301 redirects from the old series URL. Finish with verification.

## Non-Goals

- Does NOT create or delete series (use `/add-blog-post` conventions for new series)
- Does NOT rewrite post content — only the `series:` frontmatter field
- Does NOT rename individual posts (slugs of posts are untouched)

## Tier Classification

**Tier: 1** - Light. Mechanical migration with a fixed checklist and verification commands. Distilled from the `the-mythos-saga` → `the-agi-race` rename (September 2026), which touched exactly these six places.

## Inputs

- `$OLD_SLUG`: current series slug (must exist as `src/content/series/{old}.md`)
- `$NEW_SLUG`: new slug — MUST be English kebab-case, must not collide with an existing series
- Optional: new `title` / `description` / `keywords` for the series frontmatter and translations

## Steps

### 1. Preconditions

```bash
test -f src/content/series/$OLD_SLUG.md || { echo "old series not found"; exit 1; }
test -f src/content/series/$NEW_SLUG.md && { echo "new slug already exists"; exit 1; }
```

### 2. Migrate the series definition

```bash
git mv src/content/series/$OLD_SLUG.md src/content/series/$NEW_SLUG.md
```

Then edit the new file's frontmatter: `name`, `title`, `description`, and the `heroImage` / `heroImageEs` paths (they embed the slug).

### 3. Migrate the image directory

```bash
git mv public/images/blog/series/$OLD_SLUG public/images/blog/series/$NEW_SLUG
```

### 4. Rewire every post frontmatter (both languages)

```bash
grep -rl "series: \"$OLD_SLUG\"" src/content/blog/
# for each hit, replace series: "$OLD_SLUG" → series: "$NEW_SLUG"
```

### 5. Update translations

In BOTH `src/lib/translations/en.ts` and `es.ts`: rename the `'$OLD_SLUG'` keys in `seriesTitles` and `seriesDescriptions` (translate the title/description per language). Note: the map type is `Record<string, string>` — `types.ts` needs no change.

### 6. Add 301 redirects

Append to `public/_redirects` (follow the block-comment style of existing entries):

```
/blog/series/$OLD_SLUG          /blog/series/$NEW_SLUG/          301
/blog/series/$OLD_SLUG/         /blog/series/$NEW_SLUG/          301
/blog/series/$OLD_SLUG.md       /blog/series/$NEW_SLUG.md        301
/es/blog/series/$OLD_SLUG       /es/blog/series/$NEW_SLUG/       301
/es/blog/series/$OLD_SLUG/      /es/blog/series/$NEW_SLUG/       301
/es/blog/series/$OLD_SLUG.md    /es/blog/series/$NEW_SLUG.md     301
```

### 7. Verify

```bash
# No residual references outside _redirects
grep -rn "$OLD_SLUG" src/ public/ --include="*.md" --include="*.ts" --include="*.astro" | grep -v _redirects   # expect empty
# New URLs live (dev server on :4444)
curl -s -o /dev/null -w "%{http_code}" http://localhost:4444/blog/series/$NEW_SLUG/        # 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:4444/blog/series/$NEW_SLUG.md     # 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:4444/es/blog/series/$NEW_SLUG/    # 200
# Chapters still listed
curl -s http://localhost:4444/blog/series/$NEW_SLUG/ | grep -c "<chapter-slug>"           # ≥ 1
```

### 8. Commit

Conventional commit, e.g. `content(blog): rename series $OLD_SLUG to $NEW_SLUG with 301 redirects`.

## Guardrails

- Never leave the old slug in any post frontmatter — the series join is by slug, so a stale reference silently drops the post out of the series.
- Never skip the redirects: external links and search indexes point at the old series URL.
- Do not edit files via the `.claude/` symlink — always `.agents/` real paths (irrelevant here, but applies to any skill edits).

## Definition of Done

- [ ] Series file + images migrated via `git mv` (history preserved)
- [ ] All referencing posts rewired (EN + ES)
- [ ] Translations renamed in both locale files
- [ ] 6 redirect lines added with comment
- [ ] Verification greps/curls pass
- [ ] Committed

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-09-04 | Initial version, distilled from the the-mythos-saga → the-agi-race rename. |
