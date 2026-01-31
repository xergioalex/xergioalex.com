# DRAFT: Lambda Performance Optimization (Refined)

**Status:** Refined draft (ready for plan creation)

---

Create a deep work plan following `.agent_commands/agent_deep_work_plans/GUIDE_TO_CREATE_AGENT_DEEP_WORK_PLANS.md`

## Objective

Optimize the botFlow Lambda function to reduce cold start times from 3-5 seconds to under 1 second and decrease average execution duration by 40%. This will improve user experience across all chat platforms (Slack, Discord, Teams, Telegram) and reduce AWS Lambda costs.

## Context

**Location:**

- Primary function: `src/functions/botFlow/`
- Related infrastructure: `serverless/services/botFlow/`
- Configuration: `serverless.base.config.ts`

**Current Performance Metrics:**

- Cold start time: 3-5 seconds
- Average execution time: 800ms
- Memory usage: 512MB (often hitting limits)
- Bundle size: 15MB

**Technical Stack:**

- Node.js 20.x runtime
- TypeScript 5.9.2
- Webpack 5.101.3 bundling
- AWS Lambda with 512MB memory
- DynamoDB for state management

**Constraints:**

- Must maintain backward compatibility with all platform integrations
- Cannot break existing handler patterns
- Must follow TypeScript strict mode with explicit types
- All code changes must pass existing tests (127 tests)
- Logger usage only (NO console.\*)
- Test files must use `*.spec.ts` naming

**Related Documentation:**

- Performance baseline: `docs/PERFORMANCE.md`
- Lambda architecture: `docs/ARCHITECTURE.md`
- Testing requirements: `docs/TESTING_GUIDE.md`

## Tasks

1. **Analyze and Establish Baseline**
   - Profile current Lambda execution using AWS X-Ray
   - Identify top 5 performance bottlenecks
   - Document current metrics (cold start, execution time, memory)
   - Create performance baseline report

2. **Optimize Webpack Bundle**
   - Analyze bundle size with webpack-bundle-analyzer
   - Implement tree shaking for unused dependencies
   - Split large dependencies into separate chunks
   - Enable production optimizations in webpack config
   - Target: Reduce bundle from 15MB to <8MB

3. **Optimize DynamoDB Queries**
   - Review all DynamoDB queries in botFlow
   - Implement batch reads where possible
   - Add DynamoDB connection reusing
   - Optimize query patterns (use GSI efficiently)
   - Add query result caching for frequently accessed data

4. **Implement Connection Pooling**
   - Add HTTP connection pooling for DailyBot API calls
   - Reuse AWS SDK clients across invocations
   - Implement connection warming for DynamoDB
   - Add timeout configurations to prevent hanging connections

5. **Reduce Lambda Cold Starts**
   - Increase Lambda memory to 1024MB (faster CPU = faster init)
   - Minimize imports in handler entry point
   - Implement Lambda provisioned concurrency for critical paths
   - Use Lambda layers for common dependencies

6. **Add Performance Monitoring**
   - Add custom CloudWatch metrics for cold starts
   - Implement execution time tracking with Logger
   - Create performance dashboard in CloudWatch
   - Set up alarms for performance degradation

7. **Comprehensive Testing**
   - Run full test suite (`npm run test`)
   - Add performance regression tests
   - Test with all platforms (Slack, Discord, Teams, Telegram)
   - Load test with realistic traffic patterns
   - Validate no functionality broken

8. **Update Documentation**
   - Update `docs/PERFORMANCE.md` with new benchmarks
   - Document optimization techniques in `docs/ARCHITECTURE.md`
   - Update Serverless configuration comments
   - Add performance best practices section

## Plan Name

`PLAN_lambda_performance_optimization`

## Global Guidelines

- **Branch:** Work in feature branch `feature/lambda-performance-optimization`
- **Commits:** Use conventional commit format: `perf(lambda): description`
- **Validation:** Run `codecheck` after each task
- **Testing:** All 127 existing tests must pass
- **Code standards:** Follow `CLAUDE.md` and `STANDARDS.md`
- **Performance target:** 60% reduction in cold starts, 40% reduction in execution time
- **Budget:** Stay within AWS Free Tier limits during testing

---

**This refined draft is ready for plan creation. Use:**

```
/dwp-create from-draft DRAFT_EXAMPLE_refined.md
```

Or copy the content above and create the plan with `/dwp-create`.
