# Deep Work Plan: AI Docs V2 - Full Astro Adaptation

**Plan ID:** PLAN_ai_docs_v2
**Created:** 2026-01-31
**Status:** ✅ Completed

---

## 1. Goal

**Second iteration of AI documentation** to achieve full AI-pilotability by:
- Updating all 4 agents to remove serverless/Lambda references
- Updating all skills for Astro/Svelte/Tailwind patterns
- Creating 4 new Astro-specific skills for common development tasks
- Ensuring complete consistency across all AI agent systems

**Success Criteria:** Any AI agent can autonomously perform common development tasks using the documented skills and agents.

---

## 2. Context

**Repository:** XergioAleX.com - Personal website and blog
**Tech Stack:** Astro 5.16.15, Svelte 5.48.0, TypeScript 5.9.3, Tailwind CSS 4.1.18, Biome 2.3.11

**Current Issues:**
- 4 agents have serverless/Lambda references
- 5 skills need Astro-specific updates
- Missing skills for common Astro tasks (add component, add page, add blog post)

---

## 3. Global Guidelines

1. **Branch:** Work on `dev` branch
2. **Commits:** Commit after each phase (4 commits total)
3. **Validation:** Run `npm run biome:check` before committing
4. **Language:** All content in English
5. **Templates:** Follow patterns in `.agent_commands/agent_skills_generator/templates/`

---

## 4. Task List

### Phase 1: Update Existing Agents (Tasks 1-4)

- [x] **Task 1:** Update architect.md ✅
      See: [1.task_update_architect.md](./1.task_update_architect.md)

- [x] **Task 2:** Update executor.md ✅
      See: [2.task_update_executor.md](./2.task_update_executor.md)

- [x] **Task 3:** Update reviewer.md ✅
      See: [3.task_update_reviewer.md](./3.task_update_reviewer.md)

- [x] **Task 4:** Update security-auditor.md ✅
      See: [4.task_update_security_auditor.md](./4.task_update_security_auditor.md)

### Phase 2: Update Existing Skills (Tasks 5-9)

- [x] **Task 5:** Update doc-edit skill ✅
      See: [5.task_update_doc_edit.md](./5.task_update_doc_edit.md)

- [x] **Task 6:** Update pr-review-lite skill ✅
      See: [6.task_update_pr_review_lite.md](./6.task_update_pr_review_lite.md)

- [x] **Task 7:** Update refactor-safe skill ✅
      See: [7.task_update_refactor_safe.md](./7.task_update_refactor_safe.md)

- [x] **Task 8:** Update type-fix skill ✅
      See: [8.task_update_type_fix.md](./8.task_update_type_fix.md)

- [x] **Task 9:** Update write-tests skill ✅
      See: [9.task_update_write_tests.md](./9.task_update_write_tests.md)

### Phase 3: Create New Astro-Specific Skills (Tasks 10-13)

- [x] **Task 10:** Create add-component skill ✅
      See: [10.task_create_add_component.md](./10.task_create_add_component.md)

- [x] **Task 11:** Create add-page skill ✅
      See: [11.task_create_add_page.md](./11.task_create_add_page.md)

- [x] **Task 12:** Create add-blog-post skill ✅
      See: [12.task_create_add_blog_post.md](./12.task_create_add_blog_post.md)

- [x] **Task 13:** Create update-styles skill ✅
      See: [13.task_create_update_styles.md](./13.task_create_update_styles.md)

### Phase 4: Catalog and Final Validation (Tasks 14-15)

- [x] **Task 14:** Update skills_agents_catalog.md ✅
      See: [14.task_update_catalog.md](./14.task_update_catalog.md)

- [x] **Task 15:** Final validation and cross-reference check ✅
      See: [15.task_final_validation.md](./15.task_final_validation.md)

---

## 5. Execution Rules

1. **Execute tasks in strict order** - Task 1 → Task 15
2. **Read task file first** - Understand before implementing
3. **Validation required** - Run `npm run biome:check`
4. **Commit after each phase** - 4 commits total
5. **Never skip tasks** - Even if they seem trivial

---

## 6. Status

| Phase | Description | Tasks | Status |
|-------|-------------|-------|--------|
| 1 | Update Existing Agents | 1-4 | ✅ Complete |
| 2 | Update Existing Skills | 5-9 | ✅ Complete |
| 3 | Create New Skills | 10-13 | ✅ Complete |
| 4 | Catalog and Validation | 14-15 | ✅ Complete |

**Overall Progress:** 15/15 tasks (100%) ✅

---

## 7. Quick Reference

**Validation:**
```bash
npm run biome:check
```

**Commits:**
```bash
docs: update agents for Astro repository
docs: update skills for Astro repository  
feat: add Astro-specific skills
docs: update catalog and final validation
```

---

## 8. Execute

```bash
/dwp-execute ai_docs_v2
```
