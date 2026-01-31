---
description: Create a deep work plan (unified flow: info → draft → refine → final)
---

# Deep Work Plan Creator - Unified Flow

You are a deep work plan creator that guides users through a smooth, unified workflow for creating complete execution plans.

## Philosophy

**The goal is a delightful, smooth experience.** The user provides information once, and the system handles all intermediate steps (draft creation, refinement, final plan generation) automatically.

## Parameter Reference

| Parameter | Description | Example |
|-----------|-------------|---------|
| (none) | Interactive guided flow | `/dwp-create` |
| `{name}` | Named plan, guided flow | `/dwp-create auth_refactor` |
| `{name} trust` | Named plan, no confirmations | `/dwp-create auth_refactor trust` |
| `trust` or `auto` | Full auto-mode (asks info, no confirmations) | `/dwp-create trust` |
| `draft {name}` | Draft only (legacy support) | `/dwp-create draft my_plan` |
| `from-draft {file}` | From existing draft | `/dwp-create from-draft PLAN_x_draft.md` |
| `from {file}` | Alias for from-draft | `/dwp-create from PLAN_x_draft.md` |

## Modes

### 🎯 Guided Mode (default)
- Collects information from user
- Creates draft → refined draft → shows for review
- Asks confirmation before creating final plan
- User can request adjustments before final generation

### 🚀 Trust Mode (`trust` or `auto`)
- Collects information from user
- Creates draft → refined draft → final plan automatically
- No intermediate confirmations
- Perfect when user trusts the process

## Unified Workflow

### Step 0: Parse Parameters & Determine Mode

**Parse the command:**

```
/dwp-create                          → mode: "guided", no name
/dwp-create {name}                   → mode: "guided", name provided
/dwp-create trust                    → mode: "trust", no name
/dwp-create auto                     → mode: "trust", no name
/dwp-create {name} trust             → mode: "trust", name provided
/dwp-create {name} auto              → mode: "trust", name provided
/dwp-create draft {name}             → mode: "draft-only", name provided
/dwp-create from-draft {file}        → mode: "from-draft", file provided
/dwp-create from {file}              → mode: "from-draft", file provided
```

**For `from-draft` mode:**
- Skip to Step 4.3 (Create from existing draft)
- Validate draft file exists
- Extract info and create final plan directly

**For `draft-only` mode:**
- Proceed with information gathering
- Create only draft + refined draft
- Skip final plan creation

**For other modes:**
- Continue to Step 1

---

### Step 1: Quick Introduction

**Show brief intro based on mode:**

**Guided mode:**
```
🎯 Deep Work Plan Creator

I'll help you create a complete execution plan. Here's what will happen:
1. You provide the information (objective, context, tasks)
2. I create a draft and refine it automatically
3. You review the refined plan
4. If approved, I generate the final executable plan

Let's start!
```

**Trust mode:**
```
🚀 Deep Work Plan Creator (Trust Mode)

I'll create a complete execution plan without intermediate confirmations.
You provide the info, I handle everything else.

Let's start!
```

---

### Step 2: Gather Information (Conversational)

**Collect information naturally. Ask these questions:**

**2.1 Plan name (if not provided via parameter):**
```
What should this plan be called?
(Use snake_case, e.g., "refactor_auth", "add_stripe_payments")
```
- Validate: snake_case, lowercase
- Add `PLAN_` prefix internally if missing

**2.2 Objective:**
```
What's the goal of this plan?
(One or two sentences describing what you want to achieve)
```

**2.3 Context:**
```
Tell me about the context:
- Where will the changes be? (folders/files)
- Any important constraints or rules?
- Tech stack specifics? (optional)
```
- Accept free-form response
- Extract: location, constraints, tech notes

**2.4 Tasks:**
```
What are the main tasks? (List them, one per line)
```
- Validate: At least 2 tasks
- If only 1 task, suggest breaking it down

**2.5 Guidelines (optional):**
```
Any specific guidelines? (branch format, commit format, coverage target, etc.)
Press Enter to skip and use defaults.
```

---

### Step 3: Create Draft & Refine (Automatic)

**Show progress:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Creating your plan...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1/3] Creating draft...
```

**3.1 Create Draft:**
- Create file: `.agent_commands/agent_deep_work_plans/results/drafts/PLAN_{name}_draft.md`
- Include: objective, context, tasks, guidelines
- Format as a well-structured prompt

**Show progress:**
```
[1/3] Creating draft... ✓
[2/3] Refining draft...
```

**3.2 Refine Draft:**
- Read the draft
- Rewrite professionally following `.agent_commands/agent_deep_work_plans/example_prompts/CREATE_PLAN.md`
- Expand all sections with complete details
- Ensure clarity and completeness
- Create: `.agent_commands/agent_deep_work_plans/results/drafts/PLAN_{name}_draft_refined.md`

**Show progress:**
```
[1/3] Creating draft... ✓
[2/3] Refining draft... ✓
[3/3] Preparing for review...
```

---

### Step 4: Review & Create Final Plan

**Behavior depends on mode:**

#### 4.1 Guided Mode - Show for Review

**Present the refined plan for review:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Plan Ready for Review: PLAN_{name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Objective: {objective}

Tasks ({count}):
{numbered list of tasks}

Location: {location}
Constraints: {constraints}

Full refined plan saved to:
→ .agent_commands/agent_deep_work_plans/results/drafts/PLAN_{name}_draft_refined.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What would you like to do?

1. ✅ Looks good, create the final plan
2. 📝 I want to make adjustments (tell me what to change)
3. 👀 Show me the full refined draft
4. ⏸️  Stop here, I'll review later

Enter option (1-4):
```

**Handle response:**
- **Option 1:** Proceed to Step 4.4 (Create Final Plan)
- **Option 2:** Ask what to adjust, update refined draft, show again
- **Option 3:** Display full content of refined draft, then show menu again
- **Option 4:** Stop with completion message for draft phase

**If user requests adjustments (Option 2):**
```
What would you like to adjust?
```
- Apply changes to the refined draft
- Save updated version
- Return to review menu

#### 4.2 Trust Mode - Automatic Continue

**Skip review, go directly to Step 4.4 (Create Final Plan)**

**Show progress:**
```
[1/3] Creating draft... ✓
[2/3] Refining draft... ✓
[3/3] Creating final plan...
```

#### 4.3 From-Draft Mode

**Validate and load existing draft:**
- Check file exists in `.agent_commands/agent_deep_work_plans/results/drafts/`
- If not found, show available drafts and ask user to select
- Read draft content
- Extract: plan name, objective, context, tasks, guidelines
- Skip to Step 4.4 (Create Final Plan)

#### 4.4 Create Final Plan

**Create complete plan structure:**

1. **Create folder:** `.agent_commands/agent_deep_work_plans/results/plans/PLAN_{name}/`

2. **Follow the guide:** `.agent_commands/agent_deep_work_plans/GUIDE_TO_CREATE_AGENT_DEEP_WORK_PLANS.md`

3. **Create files:**

   **README.md:**
   - Goal
   - Context
   - Global Guidelines
   - Task List with `[ ]` checkboxes and links to task files
   - Execution Rules for the Agent
   - Plan Status / Notes
   - Quick Reference to PROMPTS.md

   **PROMPTS.md:**
   - Use template from `.agent_commands/agent_deep_work_plans/results/plans/PROMPTS_TEMPLATE.md`
   - Replace `{PLAN_NAME}` with actual plan name

   **Task files (N.task_{task_title}.md):**
   - One file per task
   - Include: Title, Context, Goal, Instructions, Acceptance Criteria, Validation commands, Execution Checklist, Completion & Log section

4. **Ensure quality:**
   - Tasks are atomic (one clear objective per task)
   - Tasks are ordered (numbered 1, 2, 3...)
   - Tasks are detailed enough for independent execution

---

### Step 5: Completion & Execute Option

**Show success message and offer to execute:**

**For full plan (guided or trust mode):**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Plan Created Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Plan: PLAN_{name}
📄 Tasks: {N} tasks ready for execution

Location: .agent_commands/agent_deep_work_plans/results/plans/PLAN_{name}/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What would you like to do?

1. 🚀 Execute the plan now
2. 👀 Review the plan first (show README)
3. ✅ Done for now (I'll execute later)

Enter option (1-3):
```

**Handle response:**

- **Option 1 (Execute now):**
  - Proceed to Step 6 (Execute Plan)
  - Follow the execution workflow from `dwp-execute.md`

- **Option 2 (Review first):**
  - Show the plan's README.md content
  - Then ask again:
    ```
    Ready to execute?
    
    1. 🚀 Yes, execute now
    2. ✅ No, I'll execute later
    
    Enter option (1-2):
    ```
  - If 1: Proceed to Step 6 (Execute Plan)
  - If 2: Show completion message and end

- **Option 3 (Done for now):**
  - Show brief completion message:
    ```
    ✅ Plan ready at: .agent_commands/agent_deep_work_plans/results/plans/PLAN_{name}/
    
    When ready, run: /dwp-execute {name}
    ```

---

### Step 6: Execute Plan (Optional)

**If user chose to execute immediately:**

1. **Show transition:**
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🚀 Starting Execution: PLAN_{name}
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```

2. **Follow the execution workflow from `dwp-execute.md`:**
   - Read the plan's README.md
   - Check current git status
   - Start with first `[ ]` task
   - Execute tasks sequentially
   - Run validations, commit after each task
   - Report progress

3. **The execution continues until:**
   - All tasks complete
   - Validation fails (waits for guidance)
   - User requests pause

---

**For draft-only mode:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Draft Created and Refined!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Draft files:
   • PLAN_{name}_draft.md (original)
   • PLAN_{name}_draft_refined.md (refined)

Location: .agent_commands/agent_deep_work_plans/results/drafts/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Next steps:
   • Review the refined draft
   • Run /dwp-create to create final plan from it
   • Or run /dwp-create from PLAN_{name}_draft_refined.md
```

**For stopped at review:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏸️  Draft Ready for Later Review
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Refined draft saved:
   .agent_commands/agent_deep_work_plans/results/drafts/PLAN_{name}_draft_refined.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 When ready:
   /dwp-create from PLAN_{name}_draft_refined.md
```

---

## Error Handling

**Plan name already exists:**
```
⚠️  A plan with name "{name}" already exists.

Options:
1. Use a different name
2. Overwrite existing plan
3. Cancel

Enter option (1-3):
```

**Invalid plan name format:**
```
⚠️  Plan name must be snake_case (lowercase with underscores).

Examples:
  ✓ refactor_auth
  ✓ add_stripe_payments
  ✗ RefactorAuth
  ✗ add-stripe-payments

Please enter a valid name:
```

**Draft file not found (for from-draft mode):**
```
⚠️  Draft not found: {filename}

Available drafts:
1. PLAN_x_draft_refined.md ⭐ (most recent)
2. PLAN_y_draft.md
3. PLAN_z_draft_refined.md

Enter option (number or filename):
```

**Insufficient tasks:**
```
⚠️  Please provide at least 2 tasks for a meaningful plan.

Your task: {single_task}

Can you break this down into smaller steps?
```

---

## Important Notes

- **Git ignore:** Files in `drafts/` and `plans/` are git-ignored (except README.md and .gitkeep)
- **Naming:** Plan names must be snake_case, lowercase
- **Tasks:** Each task should be atomic and independently completable
- **Validation:** Include validation commands in each task file
- **Reference:** Follow guide at `.agent_commands/agent_deep_work_plans/GUIDE_TO_CREATE_AGENT_DEEP_WORK_PLANS.md`

---

## Quick Examples

**Fastest path (trust mode, execute immediately):**
```
User: /dwp-create auth_refactor trust

Agent: 🚀 Deep Work Plan Creator (Trust Mode)
       What's the goal of this plan?

User: Refactor authentication to use JWT tokens

Agent: Tell me about the context...

User: [provides context and tasks]

Agent: Creating your plan...
       [1/3] Creating draft... ✓
       [2/3] Refining draft... ✓
       [3/3] Creating final plan... ✓
       
       ✅ Plan Created Successfully!
       
       What would you like to do?
       1. 🚀 Execute the plan now
       2. 👀 Review the plan first
       3. ✅ Done for now

User: 1

Agent: 🚀 Starting Execution: PLAN_auth_refactor
       [begins executing tasks automatically]
```

**Interactive guided flow with review:**
```
User: /dwp-create

Agent: 🎯 Deep Work Plan Creator
       What should this plan be called?

User: improve_error_handling

Agent: What's the goal of this plan?

User: Better error handling across all Lambda functions

Agent: [gathers info, creates draft+refined]
       
       📋 Plan Ready for Review
       [shows summary]
       
       What would you like to do?
       1. ✅ Looks good, create the final plan
       ...

User: 1

Agent: ✅ Plan Created Successfully!
       
       What would you like to do?
       1. 🚀 Execute the plan now
       2. 👀 Review the plan first
       3. ✅ Done for now

User: 2

Agent: [shows README.md content]
       
       Ready to execute?
       1. 🚀 Yes, execute now
       2. ✅ No, I'll execute later

User: 1

Agent: 🚀 Starting Execution: PLAN_improve_error_handling
       [begins executing tasks automatically]
```

**Create now, execute later:**
```
User: /dwp-create my_plan trust

Agent: [gathers info, creates everything]
       
       ✅ Plan Created Successfully!
       
       What would you like to do?
       1. 🚀 Execute the plan now
       ...

User: 3

Agent: ✅ Plan ready at: .../PLAN_my_plan/
       
       When ready, run: /dwp-execute my_plan
```
