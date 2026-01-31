---
name: write-tests
description: Add or expand unit/integration tests for existing code (when testing is configured)
tier: 2
intent: tests
max-files: 10
max-loc: 500
---

# Skill: Write Tests

## Objective

Add or expand tests for existing code. This skill creates or extends test files with meaningful cases, edge cases, and mocks.

**IMPORTANT:** Testing is NOT currently configured in this repository. This skill documents the future testing approach.

## Current Status

- **Testing Framework:** Not configured
- **Recommended Setup:** Vitest for unit tests, Playwright for E2E
- **Test file naming:** `*.test.ts` or `*.spec.ts`

## Non-Goals

- Does NOT implement new production code
- Does NOT refactor production logic
- Does NOT change function signatures for the sake of testability without agreement

## Tier Classification

**Tier: 2** - Standard

**Reasoning:** Writing tests requires moderate reasoning (understanding behavior, edge cases, mocks). Scope typically 1–10 files, 100–500 LOC; standard development work.

## Inputs

### Required Parameters

- `$TARGET`: File(s) or module to add tests for (e.g., `src/components/blog/BlogCard.svelte`)
- `$SCOPE`: What to cover (e.g., "unit for props", "interaction tests", "edge cases for null")

### Optional Parameters

- `$EXISTING`: Path to existing test file to extend

## Prerequisites (Future)

When testing is configured, ensure:

- [ ] Test framework is set up (Vitest recommended)
- [ ] Target code is stable (no pending refactors)
- [ ] Test utilities and mocks are understood

## Future Testing Setup

### Recommended Configuration

```bash
# Install Vitest for unit tests
npm install -D vitest @testing-library/svelte

# Install Playwright for E2E
npm install -D @playwright/test
```

### Test File Structure

```
tests/
├── unit/
│   ├── components/
│   │   └── BlogCard.test.ts
│   └── lib/
│       └── blog.test.ts
└── e2e/
    ├── home.spec.ts
    └── blog.spec.ts
```

### Example Unit Test (Future)

```typescript
// tests/unit/lib/blog.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from '@/lib/blog';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('Jan 15, 2024');
  });

  it('handles invalid date', () => {
    expect(() => formatDate(null)).toThrow();
  });
});
```

### Example Component Test (Future)

```typescript
// tests/unit/components/BlogCard.test.ts
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import BlogCard from '@/components/blog/BlogCard.svelte';

describe('BlogCard', () => {
  it('renders post title', () => {
    const post = {
      data: { title: 'Test Post', description: 'Test desc', pubDate: new Date() },
      id: 'test-post',
    };
    render(BlogCard, { props: { post } });
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });
});
```

## Steps (When Testing is Configured)

### Step 1: Understand Target

- Read the target file(s) and identify public behavior to test
- Check for existing tests
- Review testing patterns in the project

### Step 2: Plan Cases

- List unit cases (happy path, edge cases, errors)
- Identify dependencies to mock
- Decide: new file or extend existing test

### Step 3: Implement Tests

- Create or update test file
- Use Vitest (describe, it, expect)
- Keep tests focused; avoid testing implementation details

### Step 4: Validate

```bash
npm run test           # Run tests
npm run biome:check    # Lint check
```

## Output Format

### Success Output

```
## ✅ Tests Added/Updated

### Target
{What was tested}

### Files
- `tests/.../foo.test.ts`: {created|updated} — {brief description}

### Coverage
- {list of cases covered}

### Validation
- npm run test: ✅
- npm run biome:check: ✅

### Commit Message
test: add|expand tests for {target}
```

## Guardrails

### Scope Limits

- **Maximum files:** 10 (test files + any small test helpers)
- **Maximum LOC:** 500 (test code)
- **Naming:** `*.test.ts` or `*.spec.ts`

### Stop Conditions

**Stop and escalate** if:

- Testing framework not configured
- Target is auth/security-critical (coordinate with team)
- Requires new test infrastructure not in project
- Scope exceeds 10 files or 500 LOC

## Definition of Done

- [ ] New or updated test files
- [ ] Tests pass (when configured)
- [ ] `npm run biome:check` passes
- [ ] Tests are meaningful (not only coverage)

## Escalation Conditions

**Escalate to Tier 3** if: integration/E2E design needed, or test architecture decisions.

## Current Recommendation

Since testing is not configured, consider:

1. **Setting up Vitest first** - Use `/skill-create` to create a "setup-testing" skill
2. **Document test requirements** - What needs testing priority
3. **Start with utility functions** - Easiest to test, low risk

## Related

- [quick-fix](../quick-fix/SKILL.md) - Small fixes
- [reviewer](../../agents/reviewer.md) - Review test quality
- docs/TESTING_GUIDE.md - Conventions (when configured)
