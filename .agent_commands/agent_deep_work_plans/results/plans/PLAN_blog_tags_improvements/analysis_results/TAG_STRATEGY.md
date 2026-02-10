# Tag Bilingual Strategy Decision

**Plan:** PLAN_blog_tags_improvements
**Date:** 2026-02-09
**Decision:** Approach A — Centralized translations.ts

---

## Approaches Evaluated

### Approach A: Centralized `translations.ts` (CHOSEN)

Keep tag `.md` files as minimal identifiers. All display names and descriptions live in `translations.ts`.

| Aspect | Assessment |
|--------|-----------|
| **Consistency** | Matches how ALL other UI strings are handled in the project |
| **Simplicity** | Components already use `getTranslations()` — just need `t.tagNames[tag]` |
| **Code changes** | Minimal — add missing `portfolio` tag, fix component display |
| **Adding new tags** | Requires: (1) create `.md` file, (2) add to `tagNames`+`tagDescriptions` in translations.ts |
| **Schema changes** | None needed — tag schema stays the same |
| **Refactoring risk** | Very low — no structural changes to content collections or blog.ts |

**Pros:**
- Single source of truth for translations (translations.ts)
- Consistent with the site's established pattern
- No content collection schema changes
- No blog.ts refactoring
- Tags are metadata, not content — translations.ts is the right place for them
- Perfect parity checking is easy (same object structure for EN/ES)

**Cons:**
- Adding a new tag requires editing 2 files (tag .md + translations.ts)
- Tag descriptions exist in both places (minor redundancy in .md files)

### Approach B: Bilingual Frontmatter

Add `name_en`, `name_es`, `description_en`, `description_es` to tag `.md` files.

**Pros:**
- Self-contained tag data in one file
- Single file edit to add a new tag

**Cons:**
- Breaks the established translations.ts pattern
- Content collections aren't designed for multi-language in one file
- Requires schema change and blog.ts refactoring
- Components would need different data access pattern
- Inconsistent with how all other strings are translated

**Rejected because:** Breaks established patterns, adds complexity, inconsistent with the rest of the codebase.

### Approach C: Language-Split Tag Folders

Move to `src/content/tags/en/` and `src/content/tags/es/`.

**Pros:**
- Mirrors blog post organization
- Clean separation

**Cons:**
- Doubles tag files (10 files instead of 5) for only 5 tags
- Requires significant blog.ts refactoring for tag retrieval by language
- Over-engineering for simple metadata
- Tags are universal identifiers, not language-specific content

**Rejected because:** Over-engineering for 5 simple tags, significant refactoring required, tags are metadata not content.

## Decision Rationale

Tags in this project are **metadata identifiers** (like enum values), not **content** (like blog posts). They serve as:
1. Slugs for URL routing (`/blog/tag/tech/`)
2. Filter keys in blog.ts
3. Display labels (which need translation)

The translations.ts system is perfectly suited for #3, while the content collection handles #1 and #2. This clean separation of concerns matches the site's architecture.

## Implementation Changes

1. **Add `portfolio` tag** to translations.ts `tagNames` and `tagDescriptions` (both EN and ES)
2. **Keep tag `.md` files** with `name` field (used as slug identifier by blog.ts) — `description` kept for documentation purposes but translations.ts is authoritative
3. **No changes** to `content.config.ts` schema
4. **No changes** to `blog.ts` tag retrieval logic
5. **Components** (Task 3) will use `t.tagNames[tag] || tag` for display
