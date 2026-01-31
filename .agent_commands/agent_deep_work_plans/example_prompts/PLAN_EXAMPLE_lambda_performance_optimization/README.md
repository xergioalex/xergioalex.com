# Plan: Lambda Performance Optimization

**Status:** ✅ Example plan (for reference)
**Created:** 2026-01-26
**Type:** Performance optimization
**Based on:** DRAFT_EXAMPLE_refined.md

---

## 1. Goal

Optimize the botFlow Lambda function to reduce cold start times from 3-5 seconds to under 1 second and decrease average execution duration by 40%. This will improve user experience across all chat platforms (Slack, Discord, Teams, Telegram) and reduce AWS Lambda costs.

**Success Metrics:**

- Cold start time: < 1 second (currently 3-5s)
- Average execution time: < 480ms (currently 800ms, target 40% reduction)
- Memory efficiency: Optimize usage within 1024MB
- Cost reduction: ~30% reduction in Lambda costs

---

## 2. Context

### Current Performance Metrics

- **Cold start time:** 3-5 seconds
- **Average execution time:** 800ms
- **Memory usage:** 512MB (often hitting limits)
- **Bundle size:** 15MB

### Tech Stack

- **Runtime:** Node.js 20.x with TypeScript 5.9.2 (strict mode)
- **Framework:** AWS Lambda + Serverless Framework 4.19.1
- **Bundler:** Webpack 5.101.3
- **State:** DynamoDB for conversation state
- **Testing:** Mocha with 127 tests

### Integration Points

- **Primary function:** `src/functions/botFlow/`
- **Related infrastructure:** `serverless/services/botFlow/`
- **Configuration:** `serverless.base.config.ts`
- **Platform integrations:** Slack, Discord, Teams, Telegram, Google Chat

### Related Documentation

- Performance baseline: `docs/PERFORMANCE.md`
- Lambda architecture: `docs/ARCHITECTURE.md`
- Testing requirements: `docs/TESTING_GUIDE.md`

---

## 3. Global Guidelines

### Code Standards (from CLAUDE.md)

- ✅ **English only** - All code, comments, and docs in English
- ✅ **TypeScript strict mode** - Explicit type annotations required
- ✅ **Test naming** - Use `*.spec.ts` pattern (NOT `test_*.ts`)
- ✅ **Import order** - Node.js native → third-party → internal → types
- ✅ **Logging** - Use Logger from `src/common/logger.ts` (NEVER `console.*`)
- ✅ **No `any` type** - ESLint will error

### Project Practices

- Work in feature branch: `feature/lambda-performance-optimization`
- Use conventional commits: `perf(lambda): description`
- Run `codecheck` after each task (or `npm run test && npm run eslint:check`)
- Maintain backward compatibility with all platform integrations
- Cannot break existing handler patterns

### Validation Requirements

- All existing tests must pass (127 tests)
- No new ESLint or Prettier errors
- Performance improvements must be measurable
- Memory usage must stay within limits

### Performance Targets

- **Cold start reduction:** 60% (from 3-5s to <1s)
- **Execution time reduction:** 40% (from 800ms to <480ms)
- **Bundle size reduction:** 47% (from 15MB to <8MB)
- **Cost reduction:** ~30% in Lambda costs

---

## 4. Task List & Links

The agent must execute tasks **in order** and **one at a time**.

### Phase 1: Analysis & Baseline (Tasks 1-2)

- [ ] **Task 1:** Analyze and establish performance baseline
      See: [1.task_establish_baseline.md](./1.task_establish_baseline.md)

- [ ] **Task 2:** Profile Lambda execution and identify bottlenecks
      See: [2.task_profile_execution.md](./2.task_profile_execution.md)

### Phase 2: Bundle Optimization (Tasks 3-4)

- [ ] **Task 3:** Analyze and optimize webpack bundle
      See: [3.task_optimize_webpack_bundle.md](./3.task_optimize_webpack_bundle.md)

- [ ] **Task 4:** Implement code splitting and tree shaking
      See: [4.task_implement_code_splitting.md](./4.task_implement_code_splitting.md)

### Phase 3: Runtime Optimization (Tasks 5-7)

- [ ] **Task 5:** Optimize DynamoDB queries and implement caching
      See: [5.task_optimize_dynamodb_queries.md](./5.task_optimize_dynamodb_queries.md)

- [ ] **Task 6:** Implement connection pooling and reuse
      See: [6.task_implement_connection_pooling.md](./6.task_implement_connection_pooling.md)

- [ ] **Task 7:** Optimize Lambda configuration (memory, timeout)
      See: [7.task_optimize_lambda_config.md](./7.task_optimize_lambda_config.md)

### Phase 4: Monitoring & Testing (Tasks 8-10)

- [ ] **Task 8:** Add performance monitoring and metrics
      See: [8.task_add_performance_monitoring.md](./8.task_add_performance_monitoring.md)

- [ ] **Task 9:** Comprehensive testing and validation
      See: [9.task_comprehensive_testing.md](./9.task_comprehensive_testing.md)

- [ ] **Task 10:** Update documentation with new benchmarks
      See: [10.task_update_documentation.md](./10.task_update_documentation.md)

> **Agent rule:** Always work on the first unchecked `[ ]` task, and only move to the next after fully completing it.

---

## 5. Execution Rules for the Agent

- Work strictly in the order defined in the Task List
- Focus on **one task file at a time**
- Do not skip or reorder tasks
- For each task:
  - Open the corresponding `N.task_*.md`
  - Follow the detailed instructions carefully
  - Run validations as specified in the task
  - Mark the task as completed:
    - Update this README task list `[ ] → [x]`
    - Update the task file's completion / log section
  - Commit changes before moving to the next task
- Stop and log any blocking issue or failing validation
- If validation fails, do NOT mark task as complete
- Do NOT continue to next task if current task is blocked

---

## 6. Plan Status / Notes

### Current Status

- **Phase:** Not started
- **Current Task:** Task 1 (Establish Baseline)
- **Completion:** 0/10 tasks (0%)

### Important Notes

- Must maintain backward compatibility with all platforms
- Performance improvements must be validated with real traffic patterns
- AWS X-Ray integration required for detailed profiling
- Budget: Stay within AWS Free Tier limits during testing

### Risk Mitigation

- All optimizations behind feature flags initially
- Rollback plan: Keep previous Lambda version deployable
- Gradual rollout: 10% → 50% → 100% traffic

---

## 7. Quick Reference

**Need prompts for this plan?** See [PROMPTS.md](./PROMPTS.md) for ready-to-use copy-paste prompts to execute, resume, or check this plan.

**Related Documentation:**

- Performance Guide: `/home/node/app/docs/PERFORMANCE.md`
- Architecture: `/home/node/app/docs/ARCHITECTURE.md`
- Testing Guide: `/home/node/app/docs/TESTING_GUIDE.md`

---

**Example Plan Notes:**

- This is a reference example showing plan structure
- Based on the refined draft: `drafts_examples/DRAFT_EXAMPLE_refined.md`
- Real plans would be in `results/plans/` (git-ignored)
- This example demonstrates best practices for performance optimization plans
- Adapt structure for your specific use case
