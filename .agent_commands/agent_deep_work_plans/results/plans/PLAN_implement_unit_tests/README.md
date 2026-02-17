# Plan: Implement Unit Testing Infrastructure

## 1. Goal

Establish a comprehensive unit testing infrastructure for the XergioAleX.com Astro website. Install and configure Vitest, create unit tests for all critical utility functions in `src/lib/`, add Svelte component tests for key interactive components, and update project documentation. Focus on unit/component tests only (not E2E) for maximum ROI.

## 2. Context

- **Project:** XergioAleX.com — Personal website and blog built with Astro 5.17.2
- **Stack:** Astro 5.17.2, Svelte 5.50.3, TypeScript 5.9.3, Tailwind CSS 4.1.18, Biome 2.3.15, Fuse.js 7.1.0
- **Current state:** No testing framework installed. `npm run test` is a placeholder.
- **Package type:** ES Module (`"type": "module"`)
- **Path aliases:** `@/*` → `src/*` (defined in `tsconfig.json`)
- **Key files to test:**
  - `src/lib/blog.ts` — 7 pure functions (slug, language, status, word count, reading time)
  - `src/lib/i18n.ts` — 13 pure functions (URL building, language detection, alternate URLs)
  - `src/lib/search.ts` — 4 exported functions (Fuse.js search, highlighting)
  - `src/lib/translations/` — Translation lookup and structural completeness
  - `src/components/blog/BlogCard.svelte` — Post card rendering
  - `src/components/blog/BlogPagination.svelte` — Pagination logic

## Plan Variables

| Variable | Value |
|----------|-------|
| Branch | `feat/unit-tests` |
| Test runner | Vitest |
| DOM environment | happy-dom |
| Coverage target | 80%+ on `src/lib/` |
| Test speed target | < 5 seconds |

## 3. Global Guidelines

- Always work in the `feat/unit-tests` branch, never directly on `main` or `dev`.
- Use small, incremental, well-described commits.
- All code and comments in English.
- Follow `*.test.ts` naming convention.
- Run code quality checks after each task: `npm run test && npm run biome:check && npm run astro:check`.
- Use TypeScript with type annotations where practical.
- Follow import order: Node.js native → third-party → internal (using @) → types.
- Prefer `expect().toBe()` for primitives, `expect().toEqual()` for objects.
- Use descriptive `describe`/`it` blocks.
- Do NOT set up E2E tests — scoped to unit/component tests only.
- Do NOT test impure async functions (`getBlogPosts`, `getRelatedPosts`) that depend on `astro:content`.

## 4. Task List & Links

The agent must execute tasks **in order** and **one at a time**.

- [x] Task 1: Install Vitest and testing dependencies
      See: [1.task_install_vitest_dependencies.md](./1.task_install_vitest_dependencies.md)

- [x] Task 2: Create Vitest configuration and update scripts
      See: [2.task_create_vitest_config.md](./2.task_create_vitest_config.md)

- [x] Task 3: Create test fixtures and helpers
      See: [3.task_create_test_fixtures_helpers.md](./3.task_create_test_fixtures_helpers.md)

- [x] Task 4: Write unit tests for blog.ts
      See: [4.task_unit_tests_blog.md](./4.task_unit_tests_blog.md)

- [x] Task 5: Write unit tests for i18n.ts
      See: [5.task_unit_tests_i18n.md](./5.task_unit_tests_i18n.md)

- [x] Task 6: Write unit tests for search.ts
      See: [6.task_unit_tests_search.md](./6.task_unit_tests_search.md)

- [x] Task 7: Write unit tests for translations/
      See: [7.task_unit_tests_translations.md](./7.task_unit_tests_translations.md)

- [ ] Task 8: Write Svelte component tests for BlogCard and BlogPagination
      See: [8.task_svelte_component_tests.md](./8.task_svelte_component_tests.md)

- [ ] Task 9: Update testing documentation
      See: [9.task_update_testing_docs.md](./9.task_update_testing_docs.md)

- [ ] Task 10: Skills & Agents Discovery
      See: [10.task_skills_agents_discovery.md](./10.task_skills_agents_discovery.md)

- [ ] Task 11: Executive Report
      See: [11.task_executive_report.md](./11.task_executive_report.md)

> **Agent rule:** Always work on the first unchecked `[ ]` task, and only move to the next after fully completing it.

> **Mandatory final tasks:** Every plan includes Skills & Agents Discovery (second-to-last) and Executive Report (last).

## 5. Execution Rules for the Agent

- Work strictly in the order defined in the Task List.
- Focus on **one task file at a time**.
- Do not skip or reorder tasks.
- For each task:
  - Open the corresponding `N.task_*.md`.
  - Follow the detailed instructions carefully.
  - If the task references a skill file, read and follow the skill's procedure.
  - Run validations (including any agent-based validations specified in the task).
  - **MANDATORY: Mark the task as completed:**
    - **UPDATE this README task list `[ ] → [x]`** (CRITICAL!)
    - **UPDATE the Plan Status section** (completed count)
    - **UPDATE the task file's completion / log section**
    - **UPDATE PROGRESS.md** with task summary (3-5 bullets), key decisions, important values
  - Commit changes before moving to the next task.
- Stop and log any blocking issue or failing validation.

> **IMPORTANT:** Failing to mark tasks as completed will break resume functionality and cause repeated work!

## 6. Skills & Agents Used in This Plan

| Task | Skill/Agent | Purpose |
|------|-------------|---------|
| Task 4-7 | `/write-tests` skill | Test writing procedure and patterns |
| Task 8 | `/write-tests` skill | Svelte component test patterns |
| Task 9 | `/doc-edit` skill | Documentation update procedure |
| Task 10 | Skills & Agents Discovery | Evaluate new patterns from testing work |
| Task 11 | Executive Report | Final comprehensive summary |

> See the full catalog at `.claude/docs/skills_agents_catalog.md`

## 7. Plan Status / Notes

- **Current status:** In progress, Task 8
- **Completed:** 7/11

## Analysis Outputs

Reports and artifacts generated during plan execution are stored in `analysis_results/`.

| Output | Generated By | Description |
|--------|-------------|-------------|
| `EXECUTIVE_REPORT.md` | Task 11 (Executive Report) | Comprehensive summary of all work done |

## 8. Quick Reference

**Need prompts for this plan?** See [PROMPTS.md](./PROMPTS.md) for ready-to-use copy-paste prompts to execute, resume, or check this plan.
