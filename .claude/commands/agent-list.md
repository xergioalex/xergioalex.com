---
description: List all available agents with tier and description
---

# Agent List

Lists all available agents in the repository, organized by tier.

## Parameter Reference

| Parameter | Description | Example |
|-----------|-------------|---------|
| (none) | List all agents | `/agent-list` |
| `tier:N` | Filter by tier | `/agent-list tier:2` |
| `{query}` | Search by name/description | `/agent-list security` |

---

## Workflow

### Step 1: Scan Agents

Read all agents from `.claude/agents/*.md`

Extract from each:
- Name (from frontmatter)
- Description (from frontmatter)
- Tier (from frontmatter)
- Scope (from frontmatter)

### Step 2: Apply Filters

If `tier:N` provided, filter to that tier.
If query provided, filter by name/description match.

### Step 3: Display Results

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Available Agents
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Tier 2 (Standard)
Everyday development specialists

| Agent | Scope | Description |
|-------|-------|-------------|
| `reviewer` | Code review | Thorough code review specialist |
| `executor` | Execution | Follows plans precisely |
| `qa` | Testing | Quality assurance focus |

## Tier 3 (Heavy/Reasoning)
Complex planning and architecture

| Agent | Scope | Description |
|-------|-------|-------------|
| `architect` | Planning | System design, NO code execution |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: {N} agents

📝 Create new: /agent-create
📖 Details: .claude/agents/{name}.md
```

---

## Filtered Output Example

```
User: /agent-list tier:3

Agent:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Tier 3 Agents (Heavy/Reasoning)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Agent | Scope | Description |
|-------|-------|-------------|
| `architect` | Planning | System design, NO code execution |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Showing: 1 Tier 3 agent
```

---

## Search Example

```
User: /agent-list review

Agent:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Agents matching "review"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Agent | Tier | Description |
|-------|------|-------------|
| `reviewer` | 2 | Thorough code review specialist |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Found: 1 agent
```

---

## If No Agents Found

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 No Agents Found
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No agents found in .claude/agents/

To create your first agent: /agent-create
```
