# Refined Draft: PLAN_ai_docs_v2

## 1. Goal

**Second iteration of AI documentation** to achieve full AI-pilotability by:
- Updating all agents to remove serverless/Lambda references and add Astro context
- Updating all skills for Astro/Svelte/Tailwind patterns
- Creating new Astro-specific skills for common development tasks
- Ensuring complete consistency across all AI agent systems

**Success Criteria:** Any AI agent can autonomously perform common development tasks (add components, pages, blog posts, fix issues) using the documented skills and agents.

---

## 2. Context

**Repository:** XergioAleX.com - Personal website and blog
**Tech Stack:**
- Astro 5.16.15 (Static Site Generator)
- Svelte 5.48.0 (Interactive Components)
- TypeScript 5.9.3 (Type Safety)
- Tailwind CSS 4.1.18 (Styling)
- Biome 2.3.11 (Linting/Formatting)

**Current Issues Found:**

### Agents with Serverless References:
- `architect.md` - References "Lambda/botFlow patterns"
- `executor.md` - References Lambda, *.spec.ts, npm run eslint:check
- `reviewer.md` - References "Logger (no console.*)", *.spec.ts
- `security-auditor.md` - References Lambda, DynamoDB, SNS

### Skills Needing Updates:
- `doc-edit` - Generic, needs Astro/MDX specifics
- `pr-review-lite` - Has ESLint references
- `refactor-safe` - Has function handler references
- `type-fix` - Generic TypeScript, needs Astro types
- `write-tests` - References Mocha, needs Vitest/Playwright

### Missing Skills for Common Tasks:
- Creating new components (Astro vs Svelte decision)
- Creating new pages (routing patterns)
- Creating blog posts (Content Collections)
- Styling updates (Tailwind patterns)

---

## 3. Global Guidelines

1. **Branch:** Work on `dev` branch
2. **Commits:** Commit after each phase
3. **Validation:** Run `npm run biome:check` before committing
4. **Language:** All content in English
5. **Templates:** Follow existing skill/agent patterns in `.agent_commands/agent_skills_generator/templates/`
6. **References:** Link to docs/ARCHITECTURE.md, docs/STANDARDS.md

---

## 4. Task List

### Phase 1: Update Existing Agents

- [ ] Task 1: Update architect.md agent
      See: [1.task_update_architect.md](./1.task_update_architect.md)

- [ ] Task 2: Update executor.md agent
      See: [2.task_update_executor.md](./2.task_update_executor.md)

- [ ] Task 3: Update reviewer.md agent
      See: [3.task_update_reviewer.md](./3.task_update_reviewer.md)

- [ ] Task 4: Update security-auditor.md agent
      See: [4.task_update_security_auditor.md](./4.task_update_security_auditor.md)

### Phase 2: Update Existing Skills

- [ ] Task 5: Update doc-edit skill
      See: [5.task_update_doc_edit.md](./5.task_update_doc_edit.md)

- [ ] Task 6: Update pr-review-lite skill
      See: [6.task_update_pr_review_lite.md](./6.task_update_pr_review_lite.md)

- [ ] Task 7: Update refactor-safe skill
      See: [7.task_update_refactor_safe.md](./7.task_update_refactor_safe.md)

- [ ] Task 8: Update type-fix skill
      See: [8.task_update_type_fix.md](./8.task_update_type_fix.md)

- [ ] Task 9: Update write-tests skill
      See: [9.task_update_write_tests.md](./9.task_update_write_tests.md)

### Phase 3: Create New Astro-Specific Skills

- [ ] Task 10: Create add-component skill
      See: [10.task_create_add_component.md](./10.task_create_add_component.md)

- [ ] Task 11: Create add-page skill
      See: [11.task_create_add_page.md](./11.task_create_add_page.md)

- [ ] Task 12: Create add-blog-post skill
      See: [12.task_create_add_blog_post.md](./12.task_create_add_blog_post.md)

- [ ] Task 13: Create update-styles skill
      See: [13.task_create_update_styles.md](./13.task_create_update_styles.md)

### Phase 4: Update Catalog and Final Validation

- [ ] Task 14: Update skills_agents_catalog.md
      See: [14.task_update_catalog.md](./14.task_update_catalog.md)

- [ ] Task 15: Final validation and cross-reference check
      See: [15.task_final_validation.md](./15.task_final_validation.md)

---

## 5. Execution Rules

1. **Execute tasks in strict order** - Task 1 → Task 2 → ... → Task 15
2. **Read task file first** - Understand requirements before implementing
3. **Validation required** - Run `npm run biome:check` after each task
4. **Commit after each phase** - Not after each task
5. **Log completion** - Add notes to task file if needed

---

## 6. Status

| Phase | Description | Tasks | Status |
|-------|-------------|-------|--------|
| 1 | Update Existing Agents | 1-4 | ⏳ Pending |
| 2 | Update Existing Skills | 5-9 | ⏳ Pending |
| 3 | Create New Skills | 10-13 | ⏳ Pending |
| 4 | Catalog and Validation | 14-15 | ⏳ Pending |

**Overall Progress:** 0/15 tasks (0%)

---

## 7. Quick Reference

**Validation Commands:**
```bash
npm run biome:check
```

**Commit Format:**
```bash
docs: update agents for Astro repository
docs: update skills for Astro repository
feat: add Astro-specific skills (add-component, add-page, add-blog-post, update-styles)
docs: update skills_agents_catalog.md
```

**Key Files:**
- `.claude/agents/*.md` - Agent definitions
- `.claude/skills/*/SKILL.md` - Skill definitions
- `.claude/docs/skills_agents_catalog.md` - Catalog
- `.agent_commands/agent_skills_generator/templates/` - Templates
