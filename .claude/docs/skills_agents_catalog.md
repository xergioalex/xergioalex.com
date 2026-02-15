# Skills & Agents Catalog

This document serves as the central reference for all available Skills and Agents in this repository.

## Overview

| Type   | Tier 1 (Light) | Tier 2 (Standard) | Tier 3 (Heavy) | Total |
|--------|:--------------:|:------------------:|:--------------:|:-----:|
| Skills | 11             | 3                  | 0              | 14    |
| Agents | 0              | 5                  | 1              | 6     |
| **Total** | **11**      | **8**              | **1**          | **20** |

---

## Skills by Tier

Skills are reusable "how-to" procedures invoked via slash commands.

### Tier 1 (Light/Cheap)

Fast, low-risk, pattern-following tasks.

| Skill           | Intent | Invocation        | Model  | Description                                                                 |
|-----------------|--------|-------------------|--------|-----------------------------------------------------------------------------|
| quick-fix       | fix    | `/quick-fix`      | haiku  | Fix small bugs in 1-3 files following existing patterns                    |
| doc-edit        | docs   | `/doc-edit`       | haiku  | Update documentation (README, comments, MDX, markdown)                      |
| pr-review-lite  | review | `/pr-review-lite` | haiku  | Quick checklist review of a PR (style, obvious bugs, Astro patterns)        |
| fix-lint        | fix    | `/fix-lint`       | haiku  | Fix Biome linting/formatting errors in 1-3 files                           |
| type-fix        | fix    | `/type-fix`       | haiku  | Fix TypeScript type errors in 1-3 files (explicit types, Astro types)      |
| security-check  | review | `/security-check` | haiku  | Quick security checklist (secrets, API routes, client exposure)             |
| git-commit-push | execute| `/git-commit-push`| haiku  | Commit all changes and push to remote                                       |
| add-component   | create | `/add-component`  | haiku  | Create new Astro or Svelte component with correct patterns                  |
| add-page        | create | `/add-page`       | haiku  | Create new page with routing and MainLayout                                 |
| translate-sync  | execute| `/translate-sync` | haiku  | Synchronize content between English and Spanish versions                    |
| update-styles   | fix    | `/update-styles`  | haiku  | Update Tailwind styles with dark mode support                               |

### Tier 2 (Standard)

Everyday development work.

| Skill         | Intent   | Invocation       | Model  | Description                                                              |
|---------------|----------|------------------|--------|--------------------------------------------------------------------------|
| add-blog-post | create   | `/add-blog-post` | sonnet | Create blog posts — topic mode (writes content) or content mode (scaffolding). Supports draft, scheduled, and published states. |
| write-tests   | tests    | `/write-tests`   | sonnet | Add or expand tests (*.test.ts) - Vitest/Playwright when configured      |
| refactor-safe | execute  | `/refactor-safe` | sonnet | Safe refactor in bounded scope (1-10 files, no behavior change)          |

### Tier 3 (Heavy/Reasoning)

Complex planning and architecture.

| Skill | Intent | Invocation | Model | Description |
|-------|--------|-------------|-------|-------------|
| *Add with /skill-create* | | | | |

---

## Agents by Tier

Agents are specialized personas for different types of work.

### Tier 2 (Standard)

Development and review specialists.

| Agent             | Scope                          | Model  | Description                                                |
|-------------------|---------------------------------|--------|------------------------------------------------------------|
| reviewer          | Code review and quality analysis | sonnet | Thorough PR review; Astro/Svelte patterns, dark mode, quality |
| executor          | Executing predefined plans     | sonnet | Follows plans step by step; implements and validates      |
| security-auditor  | Security review (read-only)    | sonnet | Static site security; API routes, secrets, client exposure |
| i18n-guardian     | Multilingual content & translation quality | sonnet | Translation quality specialist; multilingual consistency enforcer |
| content-writer    | Blog posts, portfolio articles, narrative content | sonnet | Expert multilingual content writer with personal-professional voice |

### Tier 3 (Heavy/Reasoning)

Planning and architecture specialists.

| Agent     | Scope                                  | Model | Description                                      |
|-----------|----------------------------------------|-------|--------------------------------------------------|
| architect | Architecture, design, planning (no code) | opus  | Component design, routing, Content Collections planning |

---

## Skill-Agent Interaction Map

This diagram shows how skills and agents interact during typical workflows.

```
                        TIER 3 - Planning & Architecture
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   architect                                                  │
  │   Designs component structure, routing, Content Collections  │
  │   Output: Implementation plans, architecture decisions       │
  │                                                              │
  └──────────────────────┬───────────────────────────────────────┘
                         │ plans flow down
                         ▼
                        TIER 2 - Execution & Review
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   executor ─────────────── implements using ──────┐          │
  │   Follows plans strictly,                         │          │
  │   validates each step                             ▼          │
  │                                          ┌────────────────┐  │
  │                                          │ Tier 2 Skills  │  │
  │                                          │ add-blog-post  │  │
  │                                          │ write-tests    │  │
  │                                          │ refactor-safe  │  │
  │                                          └────────┬───────┘  │
  │                                                   │          │
  │   content-writer ◄──── writes articles ───────────┘          │
  │   reviewer ◄──────── validates output ────────────┘          │
  │   security-auditor ◄─── security review ──────────┘          │
  │   i18n-guardian ◄──── multilingual audit ──────────┘          │
  │                                                              │
  └──────────────────────┬───────────────────────────────────────┘
                         │ uses atomic skills
                         ▼
                        TIER 1 - Atomic Skills
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   Creation         Fix/Update        Review       Execute    │
  │   ─────────        ──────────        ──────       ───────    │
  │   add-component    quick-fix         pr-review    git-commit │
  │   add-page         fix-lint          security     translate  │
  │   add-blog-post    type-fix          -check       -sync      │
  │                    update-styles                  -push      │
  │                                                              │
  │   Documentation                                              │
  │   ─────────────                                              │
  │   doc-edit                                                   │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘
```

### Typical Workflow

1. **architect** creates an implementation plan (Tier 3)
2. **executor** follows the plan, invoking Tier 1/2 skills as needed (Tier 2)
3. **content-writer** crafts blog posts and portfolio articles using `/add-blog-post` (Tier 2)
4. **reviewer**, **security-auditor**, and **i18n-guardian** validate the output (Tier 2)
5. Issues found are fixed using atomic Tier 1 skills

---

## Domain-Specific Skills & Agents

### 1. Blog & Content Development

Skills, commands, and agents for creating and managing blog content.

| Resource | Type | Description |
|----------|------|-------------|
| new-post | Command | Interactive guided flow for creating blog posts (`/new-post`) |
| add-blog-post | Skill (T2) | Create blog posts — topic mode (writes) or content mode (scaffolding) |
| doc-edit | Skill (T1) | Update documentation, README, comments, MDX files |
| content-writer | Agent (T2) | Expert multilingual content writer with personal-professional voice |

**Relationship:** `/new-post` (command) guides the user interactively, while `add-blog-post` (skill) is used programmatically by agents. Both follow conventions from `docs/features/BLOG_POSTS.md` and `docs/features/BLOG_CONTENT_LIFECYCLE.md`. Posts can be created as published, draft (`draft: true`), or scheduled (future `pubDate`).

### 2. i18n & Translation

Resources for multilingual content management (currently English/Spanish, N-language ready).

| Resource | Type | Description |
|----------|------|-------------|
| translate-sync | Skill (T1) | Synchronize content across active languages |
| add-page | Skill (T1) | Create multilingual pages with shared components + thin wrappers |
| add-blog-post | Skill (T2) | Create multilingual blog posts — topic or content mode |
| i18n-guardian | Agent (T2) | Translation quality specialist; multilingual consistency enforcer |

### 3. Code Quality & Review

Resources for maintaining code quality and reviewing changes.

| Resource | Type | Description |
|----------|------|-------------|
| fix-lint | Skill (T1) | Fix Biome linting/formatting errors |
| type-fix | Skill (T1) | Fix TypeScript type errors |
| pr-review-lite | Skill (T1) | Quick checklist review of a PR |
| quick-fix | Skill (T1) | Fix small bugs in 1-3 files |
| write-tests | Skill (T2) | Add or expand tests (Vitest/Playwright) |
| refactor-safe | Skill (T2) | Safe refactor in bounded scope |
| reviewer | Agent (T2) | Thorough PR review; Astro/Svelte patterns, quality |

### 4. Security

Resources for security review and auditing.

| Resource | Type | Description |
|----------|------|-------------|
| security-check | Skill (T1) | Quick security checklist (secrets, API routes, client exposure) |
| security-auditor | Agent (T2) | Static site security; API routes, secrets, client exposure |

### 5. Component & Page Creation

Resources for creating new UI components and pages.

| Resource | Type | Description |
|----------|------|-------------|
| add-component | Skill (T1) | Create new Astro or Svelte component with correct patterns |
| add-page | Skill (T1) | Create new page with routing and MainLayout |
| update-styles | Skill (T1) | Update Tailwind styles with dark mode support |
| architect | Agent (T3) | Component design, routing, Content Collections planning |
| executor | Agent (T2) | Follow plans step by step; implement and validate |

---

## Decision Guide: Skill vs Agent

Use this table to decide whether to invoke a Skill or an Agent.

| Criteria | Use a Skill | Use an Agent |
|----------|-------------|--------------|
| **Task scope** | Single, well-defined action | Multi-step or judgment-based work |
| **Invocation** | Slash command (`/fix-lint`) | By name or role ("as reviewer") |
| **Autonomy** | Follows procedure exactly | Makes decisions within scope |
| **Duration** | Short, completes quickly | May take longer, multi-phase |
| **Output** | Predictable, templated | Variable, context-dependent |
| **Examples** | Fix lint errors, create a component | Review a PR, plan architecture |

### When to Combine

- **architect** (Agent) produces a plan, then **executor** (Agent) implements it using **add-component**, **add-page**, and **write-tests** (Skills)
- **reviewer** (Agent) finds issues, then **fix-lint**, **type-fix**, or **quick-fix** (Skills) resolve them
- **i18n-guardian** (Agent) audits translations, then **translate-sync** (Skill) synchronizes content
- **content-writer** (Agent) crafts narrative articles, using **add-blog-post** (Skill) for file creation and **i18n-guardian** (Agent) for translation quality

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
- **Catalog:** `.claude/docs/skills_agents_catalog.md`

---

## Compatibility Notes

Skills and agents use the **Agent Skills open standard** (agentskills.io) for cross-tool compatibility.

| Feature | Claude Code | Cursor | Codex |
|---------|-------------|--------|-------|
| Skill invocation (`/skill-name`) | Yes | Yes | Yes |
| Auto-invocation by description | Yes | Yes | Yes |
| Model routing (haiku/sonnet/opus) | Yes | Ignored | Ignored |
| `allowed-tools` (skills) | Yes | Ignored | Ignored |
| `tools`/`disallowedTools` (agents) | Yes | Ignored | Ignored |
| `permissionMode` (agents) | Yes | Ignored | Ignored |
| Custom fields (tier, intent, etc.) | Ignored | Ignored | Ignored |

**Key insight**: The `model` column above reflects Claude Code routing. Other tools ignore this field and use their default model.

---

## Astro-Specific Notes

All skills and agents are adapted for this Astro repository:

- **Linting:** Biome (not ESLint)
- **Type checking:** `npm run astro:check`
- **Build:** `npm run build`
- **Components:** Astro (.astro) and Svelte (.svelte)
- **Styling:** Tailwind CSS with dark mode
- **Content:** Content Collections in `src/content/`
- **i18n:** Multilingual-ready (currently English/Spanish) with centralized config in `src/lib/i18n.ts`, shared page components in `src/components/pages/`, and thin per-language wrappers
- **Testing:** Not yet configured (Vitest/Playwright planned)

---

## Changelog

| Date | Change | Details |
|------|--------|---------|
| 2026-02-12 | Blog Content Lifecycle docs | Created `docs/features/BLOG_CONTENT_LIFECYCLE.md`. Updated add-blog-post skill (v2.2.0), content-writer agent (v1.1.0), and new-post command with draft/scheduled/demo support. |
| 2026-02-11 | new-post command created | Interactive guided command for blog post creation. Asks questions step by step, handles images, optimization, and validation. |
| 2026-02-11 | write-article merged into add-blog-post | Unified skill with topic mode (writes from scratch) and content mode (scaffolding). Deleted write-article. |
| 2026-02-10 | content-writer, write-article added | Expert bilingual content writer agent and article writing skill with personal-professional voice, narrative structure, and bilingual enforcement |
| 2026-02-10 | Responsive design guidance added | Enhanced `update-styles` skill with responsive design patterns, breakpoint reference, touch target sizing, and heading scaling examples. Enhanced `reviewer` agent with responsive design verification checklist (breakpoint coverage, dark mode pairing, touch targets, heading scales). |
| 2026-02-04 | Format migration | Migrated all skills and agents to official Agent Skills standard format with model routing, allowed-tools, and compatibility fields |
| 2026-02-03 | Catalog restructured | Added tier breakdown overview, interaction map, domain guides, decision guide, and changelog |
| 2026-02-15 | i18n refactor to multilingual-ready | Updated all skills/agents from "bilingual" to "multilingual-ready" terminology. Added `src/lib/i18n.ts` references and shared page component patterns. |
| 2025-01-01 | translate-sync, i18n-guardian added | Multilingual content synchronization skill and translation quality agent |
| 2025-01-01 | add-page, add-component updated | Updated with multilingual enforcement and i18n guidance |
| 2025-01-01 | Initial catalog | 14 skills and 5 agents cataloged |

---

## Related Documentation

- [Guide to Create Skills and Agents](../../.agent_commands/agent_skills_generator/GUIDE_TO_CREATE_SKILLS_AND_AGENTS.md)
- [Model Routing](../../.agent_commands/agent_skills_generator/MODEL_ROUTING.md)
- [Skill Template](../../.agent_commands/agent_skills_generator/templates/SKILL_TEMPLATE.md)
- [Agent Template](../../.agent_commands/agent_skills_generator/templates/AGENT_TEMPLATE.md)
- [AGENTS.md](../../AGENTS.md) - Main AI agent guidance
- [docs/STANDARDS.md](../../docs/STANDARDS.md) - Coding standards
