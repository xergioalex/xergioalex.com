# Skills & Agents Catalog

This document serves as the central reference for all available Skills and Agents in this repository.

## Overview

| Type   | Count | Description                |
|--------|-------|----------------------------|
| Skills | 9     | Reusable task procedures   |
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
| doc-edit        | docs   | `/doc-edit`       | Update documentation (README, comments, JSDoc, markdown)                    |
| pr-review-lite  | review | `/pr-review-lite` | Quick checklist review of a PR (style, obvious bugs, missing tests)         |
| fix-lint        | fix    | `/fix-lint`       | Fix ESLint errors in 1–3 files (auto-fix + minimal manual edits)             |
| type-fix        | fix    | `/type-fix`       | Fix TypeScript type errors in 1–3 files (explicit types, no any)            |
| security-check  | review | `/security-check` | Quick security checklist (secrets, input, logging); escalate to security-auditor |
| git-commit-push | execute | `/git-commit-push` | Commit all changes and push to remote                                        |

#### Tier 2 (Standard)

Everyday development work.

| Skill         | Intent   | Invocation       | Description                                                              |
|---------------|----------|------------------|--------------------------------------------------------------------------|
| write-tests   | tests    | `/write-tests`   | Add or expand unit/integration tests (*.spec.ts) for code                 |
| refactor-safe | execute  | `/refactor-safe` | Safe refactor in bounded scope (1–10 files, no behavior change, tests)   |

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
| reviewer          | Code review and quality analysis | Thorough PR review; quality, maintainability, best practices |
| executor          | Executing predefined plans     | Follows plans step by step; implements and validates      |
| security-auditor  | Security review (read-only)    | Secrets, input validation, auth, OWASP; follows SECURITY.md |

#### Tier 3 (Heavy/Reasoning)

Planning and architecture specialists.

| Agent     | Scope                                  | Description                                      |
|-----------|----------------------------------------|--------------------------------------------------|
| architect | Architecture, design, planning (no code) | System design, decisions, detailed execution plans |

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

## Related Documentation

- [Guide to Create Skills and Agents](../../.agent_commands/agent_skills_generator/GUIDE_TO_CREATE_SKILLS_AND_AGENTS.md)
- [Model Routing](../../.agent_commands/agent_skills_generator/MODEL_ROUTING.md)
- [Skill Template](../../.agent_commands/agent_skills_generator/templates/SKILL_TEMPLATE.md)
- [Agent Template](../../.agent_commands/agent_skills_generator/templates/AGENT_TEMPLATE.md)
