# Agent Skills Generator

## Overview

This system enables AI agents to create high-quality **Skills** and **Agents** for any repository. It leverages repository knowledge (AGENTS.md, docs, architecture) to generate contextually appropriate definitions that follow the 3-tier model/cost strategy.

## What Are Skills and Agents?

### Skills

A **Skill** is a reusable "how-to" SOP (Standard Operating Procedure):

- Located in `.agents/skills/<skill-name>/SKILL.md`
- Invoked via slash commands like `/quick-fix`
- Must be small, atomic, and reusable
- Skills are **"HOW it's done"**

### Agents

An **Agent** is a specialized worker persona:

- Located in `.agents/agents/<agent-name>.md`
- Used for specialization and parallelizable work
- Examples: reviewer, architect, executor
- Agents are **"WHO does it"**

## Directory Structure

```
.agent_commands/agent_skills_generator/
├── README.md                              ← You are here
├── GUIDE_TO_CREATE_SKILLS_AND_AGENTS.md   ← Complete creation guide
├── MASTER_PROMPT.md                       ← Generation prompt with context analysis
├── MODEL_ROUTING.md                       ← Tier 1/2/3 cost strategy
├── example_prompts/
│   ├── README.md
│   ├── CREATE_SKILL.md                    ← Skill creation prompt
│   ├── CREATE_AGENT.md                    ← Agent creation prompt
│   └── examples/                          ← Example skills and agents
│       ├── SKILL_EXAMPLE_quick_fix/
│       ├── SKILL_EXAMPLE_doc_edit/
│       └── AGENT_EXAMPLE_reviewer.md
└── templates/
    ├── SKILL_TEMPLATE.md                  ← Canonical skill template
    └── AGENT_TEMPLATE.md                  ← Canonical agent template

.agents/                                   ← Where generated skills/agents live
├── skills/
│   └── {skill-name}/
│       └── SKILL.md
├── agents/
│   └── {agent-name}.md
├── docs/
│   └── skills_agents_catalog.md
└── commands/
    ├── skill-create.md
    ├── skill-list.md
    ├── agent-create.md
    └── agent-list.md
```

## Quick Start

### Create a New Skill

```
/skill-create                  # Guided mode
/skill-create my-skill trust   # Trust mode (auto)
```

### Create a New Agent

```
/agent-create                  # Guided mode
/agent-create my-agent trust   # Trust mode (auto)
```

### List Available Skills/Agents

```
/skill-list
/agent-list
```

## The 3-Tier Model Strategy

To optimize cost and quality, all Skills and Agents are classified into tiers:

| Tier  | Name        | Use Case                        | Model      |
| ----- | ----------- | ------------------------------- | ---------- |
| **1** | Light/Cheap | Simple fixes, formatting, docs  | Cheap/Fast |
| **2** | Standard    | Features, tests, safe refactors | Standard   |
| **3** | Heavy       | Architecture, planning, complex | Frontier   |

See [MODEL_ROUTING.md](./MODEL_ROUTING.md) for detailed routing rules.

## Key Files

| File                                   | Purpose                                       |
| -------------------------------------- | --------------------------------------------- |
| `GUIDE_TO_CREATE_SKILLS_AND_AGENTS.md` | Complete guide with definitions and workflows |
| `MASTER_PROMPT.md`                     | The prompt AI uses to generate skills/agents  |
| `MODEL_ROUTING.md`                     | Cost-efficient model selection strategy       |
| `templates/SKILL_TEMPLATE.md`          | Template for all Skills                       |
| `templates/AGENT_TEMPLATE.md`          | Template for all Agents                       |

## Integration with Repository

The generator uses these as **primary context** (read first):

- **AGENTS.md** - Repository guidelines and standards (single source of truth when present)
- **docs/** - Technical documentation (e.g. ARCHITECTURE.md, PRODUCT_SPEC.md, STANDARDS.md, TESTING_GUIDE.md)

**Optional** (when present in the repo):

- **.context/** - Company and product context (many repositories do not have this folder)

This context ensures generated Skills and Agents are appropriate for the repository.

## Repository-Specific Context (This Repo)

When generating Skills and Agents **for this repository**, use the following so that guardrails, examples, and validation commands are correct:

| Area            | This repo                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Stack**       | TypeScript 5.9.2, Node.js 20.x, AWS Lambda, Serverless Framework, Mocha, ESLint, Prettier                                                              |
| **Key docs**    | AGENTS.md (single source of truth), docs/ARCHITECTURE.md, docs/PRODUCT_SPEC.md, docs/STANDARDS.md, docs/TESTING_GUIDE.md, docs/DEVELOPMENT_COMMANDS.md |
| **Validation**  | `npm run test`, `npm run eslint:check`, `npm run prettier:check`                                                                                       |
| **Test naming** | `*.spec.ts` (Mocha); never `test_*.ts` or `*_test.ts`                                                                                                  |
| **Logging**     | Logger from `src/common/logger.ts` only; never `console.*`                                                                                             |
| **Types**       | Explicit TypeScript annotations; no `any` (strict mode)                                                                                                |

See [AUDIT_REPO_FIT.md](./AUDIT_REPO_FIT.md) for how the generator fits this repo.

## Output Location

Generated Skills and Agents go directly to `.agents/`:

- Skills: `.agents/skills/{skill-name}/SKILL.md`
- Agents: `.agents/agents/{agent-name}.md`

## Related

- [Deep Work Plans](../agent_deep_work_plans/README.md)
- [AGENTS.md](../../AGENTS.md)
