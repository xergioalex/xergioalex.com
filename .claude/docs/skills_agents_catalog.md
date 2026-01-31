# Skills & Agents Catalog

This document serves as the central reference for all available Skills and Agents in this repository.

## Overview

| Type   | Count | Description                |
|--------|-------|----------------------------|
| Skills | 13    | Reusable task procedures   |
| Agents | 4     | Specialized worker personas |

---

## Skills

Skills are reusable "how-to" procedures invoked via slash commands.

### By Tier

#### Tier 1 (Light/Cheap)

Fast, low-risk, pattern-following tasks.

| Skill           | Intent | Invocation        | Description                                                                 |
|-----------------|--------|-------------------|-----------------------------------------------------------------------------|
| quick-fix       | fix    | `/quick-fix`      | Fix small bugs in 1–3 files following existing patterns                    |
| doc-edit        | docs   | `/doc-edit`       | Update documentation (README, comments, MDX, markdown)                      |
| pr-review-lite  | review | `/pr-review-lite` | Quick checklist review of a PR (style, obvious bugs, Astro patterns)        |
| fix-lint        | fix    | `/fix-lint`       | Fix Biome linting/formatting errors in 1–3 files                           |
| type-fix        | fix    | `/type-fix`       | Fix TypeScript type errors in 1–3 files (explicit types, Astro types)      |
| security-check  | review | `/security-check` | Quick security checklist (secrets, API routes, client exposure)             |
| git-commit-push | execute| `/git-commit-push`| Commit all changes and push to remote                                       |
| add-component   | create | `/add-component`  | Create new Astro or Svelte component with correct patterns                  |
| add-page        | create | `/add-page`       | Create new page with routing and MainLayout                                 |
| add-blog-post   | create | `/add-blog-post`  | Create blog post with Content Collections frontmatter                       |
| update-styles   | fix    | `/update-styles`  | Update Tailwind styles with dark mode support                               |

#### Tier 2 (Standard)

Everyday development work.

| Skill         | Intent   | Invocation       | Description                                                              |
|---------------|----------|------------------|--------------------------------------------------------------------------|
| write-tests   | tests    | `/write-tests`   | Add or expand tests (*.test.ts) - Vitest/Playwright when configured      |
| refactor-safe | execute  | `/refactor-safe` | Safe refactor in bounded scope (1–10 files, no behavior change)          |

#### Tier 3 (Heavy/Reasoning)

Complex planning and architecture.

| Skill | Intent | Invocation | Description |
|-------|--------|-------------|-------------|
| *Add with /skill-create* | | | |

---

## Agents

Agents are specialized personas for different types of work.

### By Tier

#### Tier 2 (Standard)

Development and review specialists.

| Agent             | Scope                          | Description                                                |
|-------------------|---------------------------------|------------------------------------------------------------|
| reviewer          | Code review and quality analysis | Thorough PR review; Astro/Svelte patterns, dark mode, quality |
| executor          | Executing predefined plans     | Follows plans step by step; implements and validates      |
| security-auditor  | Security review (read-only)    | Static site security; API routes, secrets, client exposure |

#### Tier 3 (Heavy/Reasoning)

Planning and architecture specialists.

| Agent     | Scope                                  | Description                                      |
|-----------|----------------------------------------|--------------------------------------------------|
| architect | Architecture, design, planning (no code) | Component design, routing, Content Collections planning |

---

## Skills by Category

### Creation Skills

| Skill | Creates |
|-------|---------|
| add-component | Astro/Svelte components |
| add-page | Pages with routing |
| add-blog-post | Blog posts with frontmatter |

### Fix/Update Skills

| Skill | Fixes |
|-------|-------|
| quick-fix | Small bugs (1-3 files) |
| fix-lint | Biome linting errors |
| type-fix | TypeScript errors |
| update-styles | Tailwind/CSS styling |

### Review Skills

| Skill | Reviews |
|-------|---------|
| pr-review-lite | PR checklist review |
| security-check | Security checklist |

### Documentation Skills

| Skill | Updates |
|-------|---------|
| doc-edit | README, comments, MDX |

### Execution Skills

| Skill | Executes |
|-------|----------|
| git-commit-push | Git commit and push |
| refactor-safe | Safe refactoring |
| write-tests | Test creation |

---

## Quick Reference

### How to Use Skills

```bash
# List available skills
/skill-list

# Create a new skill
/skill-create
```

### How to Use Agents

```bash
# List available agents
/agent-list

# Create a new agent
/agent-create
```

### File Locations

- **Skills:** `.claude/skills/{skill-name}/SKILL.md`
- **Agents:** `.claude/agents/{agent-name}.md`

---

## Astro-Specific Notes

All skills and agents are adapted for this Astro repository:

- **Linting:** Biome (not ESLint)
- **Type checking:** `npm run astro:check`
- **Build:** `npm run build`
- **Components:** Astro (.astro) and Svelte (.svelte)
- **Styling:** Tailwind CSS with dark mode
- **Content:** Content Collections in `src/content/`
- **Testing:** Not yet configured (Vitest/Playwright planned)

---

## Related Documentation

- [Guide to Create Skills and Agents](../../.agent_commands/agent_skills_generator/GUIDE_TO_CREATE_SKILLS_AND_AGENTS.md)
- [Model Routing](../../.agent_commands/agent_skills_generator/MODEL_ROUTING.md)
- [Skill Template](../../.agent_commands/agent_skills_generator/templates/SKILL_TEMPLATE.md)
- [Agent Template](../../.agent_commands/agent_skills_generator/templates/AGENT_TEMPLATE.md)
- [AGENTS.md](../../AGENTS.md) - Main AI agent guidance
- [docs/STANDARDS.md](../../docs/STANDARDS.md) - Coding standards
