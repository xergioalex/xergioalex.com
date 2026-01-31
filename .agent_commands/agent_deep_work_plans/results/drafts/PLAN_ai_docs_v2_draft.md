# Draft: PLAN_ai_docs_v2

## Objective

Second iteration of AI documentation to achieve 100% AI-pilotability:
1. Fully adapt all existing skills and agents to this Astro repository
2. Create new Astro-specific skills for common tasks
3. Update all cross-references and documentation
4. Ensure consistency across all AI agent systems

## Context

**Repository:** XergioAleX.com - Astro personal website
**Tech Stack:** Astro 5.16.15, Svelte 5.48.0, TypeScript 5.9.3, Tailwind CSS 4.1.18, Biome 2.3.11

**Current State Analysis:**

### Skills (9 existing) - Need Updates:
- `quick-fix` - Partially adapted ✅
- `doc-edit` - Needs review
- `fix-lint` - Updated for Biome ✅
- `git-commit-push` - Generic, OK
- `pr-review-lite` - Needs Astro updates
- `refactor-safe` - Needs Astro updates
- `security-check` - Needs static site focus
- `type-fix` - Needs Astro updates
- `write-tests` - Needs Vitest/Playwright focus

### Agents (4 existing) - Need Updates:
- `architect` - Has Lambda/serverless references ❌
- `executor` - Has Lambda/serverless references ❌
- `reviewer` - Has Logger/console references ❌
- `security-auditor` - Has Lambda/serverless references ❌

### Missing Skills for Astro:
- `add-component` - Create new Astro/Svelte components
- `add-page` - Create new pages with routing
- `add-blog-post` - Create blog posts with frontmatter
- `update-styles` - Modify Tailwind/CSS styles

## Tasks

### Phase 1: Update Existing Agents (4 tasks)
1. Update architect.md - Remove serverless refs, add Astro context
2. Update executor.md - Remove serverless refs, add Astro context
3. Update reviewer.md - Remove Logger refs, add Biome/Astro checks
4. Update security-auditor.md - Focus on static site security

### Phase 2: Update Existing Skills (5 tasks)
5. Update doc-edit skill - Astro/MDX context
6. Update pr-review-lite skill - Astro/Svelte checklist
7. Update refactor-safe skill - Astro patterns
8. Update type-fix skill - Astro types
9. Update write-tests skill - Vitest/Playwright focus

### Phase 3: Create New Astro-Specific Skills (4 tasks)
10. Create add-component skill - Astro/Svelte components
11. Create add-page skill - Routing patterns
12. Create add-blog-post skill - Content Collections
13. Create update-styles skill - Tailwind utilities

### Phase 4: Update Catalog and Documentation (2 tasks)
14. Update skills_agents_catalog.md - Complete catalog
15. Final validation and cross-reference check

## Guidelines

- All documentation in English
- Follow existing skill/agent template patterns
- Reference docs/STANDARDS.md and docs/ARCHITECTURE.md
- Run `npm run biome:check` after changes
- Commit after each logical group
