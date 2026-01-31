# Refined Draft: PLAN_improve_ai_docs

## 1. Goal

**Achieve 100% AI Interoperability** for the XergioAleX.com repository by:
- Adding README.md files to every important folder
- Creating docs/features/ with detailed feature documentation
- Ensuring all documentation is consistent, cross-referenced, and AI-navigable
- Fixing any remaining inconsistencies (ESLint→Biome references)

**Success Criteria:** Any AI agent can start working on any part of the codebase by reading the relevant README.md and following links to detailed documentation.

---

## 2. Context

**Repository:** XergioAleX.com - Personal website and blog
**Tech Stack:** 
- Astro 5.16.15 (Static Site Generator)
- Svelte 5.48.0 (Interactive Components)
- TypeScript 5.9.3 (Type Safety)
- Tailwind CSS 4.1.18 (Styling)
- Biome 2.3.11 (Linting/Formatting)

**Location:** All source code in `src/`, documentation in `docs/`, agent systems in `.claude/` and `.agent_commands/`

**Constraints:**
- All documentation in English
- Follow pattern from docs/DOCUMENTATION_GUIDE.md
- Each README should be self-contained but link to related docs
- Must validate with `npm run biome:check` and `npm run astro:check`

---

## 3. Global Guidelines

1. **Branch:** Work on `dev` branch
2. **Commits:** Small, focused commits after each logical group
3. **Validation:** Run `npm run biome:check` and `npm run astro:check` before committing
4. **Language:** All content in English
5. **Pattern:** Each README should include:
   - Purpose (what is this folder for)
   - Structure (files and subfolders)
   - Key concepts (for AI understanding)
   - Usage examples
   - Related documentation links
6. **Quality:** Follow docs/DOCUMENTATION_GUIDE.md standards

---

## 4. Task List

### Phase 1: Source Folder Documentation

- [ ] Task 1: Create src/README.md
      See: [1.task_src_readme.md](./1.task_src_readme.md)

- [ ] Task 2: Create src/components/README.md
      See: [2.task_components_readme.md](./2.task_components_readme.md)

- [ ] Task 3: Create src/components/blog/README.md
      See: [3.task_blog_components_readme.md](./3.task_blog_components_readme.md)

- [ ] Task 4: Create src/components/home/README.md
      See: [4.task_home_components_readme.md](./4.task_home_components_readme.md)

- [ ] Task 5: Create src/components/layout/README.md
      See: [5.task_layout_components_readme.md](./5.task_layout_components_readme.md)

### Phase 2: Supporting Folders Documentation

- [ ] Task 6: Create src/lib/README.md
      See: [6.task_lib_readme.md](./6.task_lib_readme.md)

- [ ] Task 7: Create src/pages/README.md
      See: [7.task_pages_readme.md](./7.task_pages_readme.md)

- [ ] Task 8: Create src/layouts/README.md
      See: [8.task_layouts_readme.md](./8.task_layouts_readme.md)

- [ ] Task 9: Create src/content/README.md
      See: [9.task_content_readme.md](./9.task_content_readme.md)

- [ ] Task 10: Create src/styles/README.md
      See: [10.task_styles_readme.md](./10.task_styles_readme.md)

### Phase 3: Public Assets Documentation

- [ ] Task 11: Create public/README.md
      See: [11.task_public_readme.md](./11.task_public_readme.md)

### Phase 4: Feature Documentation

- [ ] Task 12: Create docs/features/ folder with feature docs
      See: [12.task_features_docs.md](./12.task_features_docs.md)

### Phase 5: Fixes and Validation

- [ ] Task 13: Update skills_agents_catalog.md (fix Biome references)
      See: [13.task_fix_catalog.md](./13.task_fix_catalog.md)

- [ ] Task 14: Create Astro-specific example plan
      See: [14.task_astro_example_plan.md](./14.task_astro_example_plan.md)

- [ ] Task 15: Final validation and cross-reference check
      See: [15.task_final_validation.md](./15.task_final_validation.md)

---

## 5. Execution Rules

1. **Execute tasks in strict order** - Never skip or reorder
2. **One task at a time** - Complete fully before moving on
3. **Validation required** - Run checks before marking complete
4. **Commit after each task** - Small, descriptive commits
5. **Log completion** - Update task file with completion notes

---

## 6. Status

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 1: Source Folder Documentation | 1-5 | ⏳ Pending |
| Phase 2: Supporting Folders Documentation | 6-10 | ⏳ Pending |
| Phase 3: Public Assets Documentation | 11 | ⏳ Pending |
| Phase 4: Feature Documentation | 12 | ⏳ Pending |
| Phase 5: Fixes and Validation | 13-15 | ⏳ Pending |

**Overall Progress:** 0/15 tasks (0%)

---

## 7. Quick Reference

**Validation Commands:**
```bash
npm run biome:check    # Linting
npm run astro:check    # TypeScript
npm run build          # Build verification
```

**Commit Format:**
```bash
docs: add README.md to {folder}
```

**Related Documentation:**
- docs/DOCUMENTATION_GUIDE.md - Documentation standards
- docs/STANDARDS.md - Coding standards
- AGENTS.md - AI agent guidance
