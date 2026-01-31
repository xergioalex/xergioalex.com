# Ready-to-Use Prompts: Lambda Performance Optimization

This file contains copy-paste ready prompts for executing, resuming, and managing this deep work plan.

---

## 🚀 Execute Plan (Start from Beginning)

```
Execute the plan at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md

Follow the execution rules:
- Work on one task at a time, in strict order
- Read the full task file before starting
- Run all validation commands
- Update completion logs
- Commit after each task
- Mark tasks [x] in the plan README
- Stop if validation fails

Start with Task 1 (Establish Baseline).
```

---

## 🔄 Resume Plan (Continue from Last Checkpoint)

```
RESUME the plan at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md

Steps:
1. Check git history to see what was completed
2. Read the plan README to find the first unchecked [ ] task
3. Review that task's completion log
4. Continue from there following execution rules
5. Never redo completed tasks

Resume execution now.
```

---

## 📊 Resume with Status Report

```
RESUME the plan at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md with a detailed status report.

First, provide a status report:
- List all completed tasks [x]
- List all pending tasks [ ]
- Show current progress (X/10 tasks)
- Review baseline metrics from Task 1
- Compare current progress against performance targets
- Check for any validation failures or blockers
- Review recent git commits related to this plan

Then resume execution from the first unchecked task.
```

---

## 🔍 Check Status Only (No Execution)

```
Check status of plan at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md

Provide a comprehensive status report:
- Current progress: X/10 tasks completed
- List completed tasks with performance improvements achieved
- List pending tasks
- Review performance metrics from baseline
- Show improvements so far (cold start, execution time, bundle size)
- Check for any failures or blockers
- Estimate remaining time to complete plan

DO NOT execute any tasks. Status report only.
```

---

## 📈 Performance Progress Report

```
Generate a performance progress report for the plan at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md

Report should include:
- Baseline metrics (from Task 1)
- Current metrics (after completed optimizations)
- Progress toward targets:
  - Cold start: [current] / [target] (< 1s)
  - Execution time: [current] / [target] (< 480ms)
  - Bundle size: [current] / [target] (< 8MB)
  - Cost reduction: [current] / [target] (30%)
- Remaining optimization tasks
- Projected final performance

Format as a table with baseline vs. current vs. target.
```

---

## ✏️ Modify Plan (Add/Update Tasks)

```
I need to modify the plan at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md

Changes needed:
[Describe changes here - e.g., "Add task for Lambda provisioned concurrency" or "Update Task 3 to include additional webpack optimization"]

Please:
1. Review current plan structure
2. Make the requested changes
3. Update task numbering if needed
4. Ensure consistency with existing completed tasks
5. Update plan README with changes log
```

---

## 🎯 Execute Specific Task (Advanced)

```
Execute ONLY Task [N] from plan at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md

Task file: [N].task_*.md

Follow task instructions, run validations, update logs, commit changes.

DO NOT proceed to next task automatically. Stop after completing this task.
```

---

## 🧪 Validate Optimizations

```
Validate all performance optimizations made in plan at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md

Check:
- All tests still passing: npm run test
- ESLint checks passing: npm run eslint:check
- No TypeScript errors
- Performance improvements are measurable
- CloudWatch metrics show improvements
- No increase in error rates
- Cost reduction is measurable

Generate validation report.
```

---

## 📋 Review Plan Structure

```
Review the plan structure at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md

Analyze:
- Are optimization tasks properly ordered?
- Are dependencies clear?
- Are performance targets realistic?
- Are validation commands comprehensive?
- Is there enough context for autonomous execution?
- Are there any gaps in the optimization strategy?

Provide recommendations for improvement.
```

---

## 🔧 Rollback Optimizations

```
Need to rollback optimizations from plan at: .agent_commands/agent_deep_work_plans/example_prompts/PLAN_EXAMPLE_lambda_performance_optimization/README.md

Rollback strategy:
1. Identify which task introduced issues
2. Review git history for that task
3. Create rollback branch
4. Revert changes from problematic task
5. Run full test suite
6. Validate performance hasn't degraded below baseline
7. Update plan notes with rollback reason

Execute rollback for Task [N] if specified.
```

---

## 📝 Quick Tips for Performance Optimization Plans

### When to Use Each Prompt

- **Execute:** Starting fresh, all tasks pending
- **Resume:** Interrupted session, continue where left off
- **Resume with Status:** Need performance metrics and progress
- **Check Status:** Just want to see progress and metrics
- **Performance Progress Report:** Stakeholder update with metrics
- **Validate Optimizations:** After completing several tasks
- **Rollback:** If optimization caused issues

### Best Practices for Performance Plans

1. **Always measure** before and after each optimization
2. **Document metrics** in completion logs
3. **Run full tests** after each task
4. **Monitor production** after deployment
5. **Keep baseline report** for comparison
6. **Validate improvements** with real traffic
7. **Document trade-offs** (e.g., memory vs. speed)

### Performance Validation Checklist

- [ ] Baseline metrics established
- [ ] CloudWatch metrics show improvement
- [ ] No increase in error rates
- [ ] All tests passing
- [ ] Cost reduction measurable
- [ ] User experience improved (if measurable)

---

**Note:** This is an example PROMPTS.md file for a performance optimization plan. Copy this structure for your own performance plans.
