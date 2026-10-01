# Testing Guide

Guide for testing in XergioAleX.com.

## Overview

This project uses **Vitest** for unit and component testing. The testing infrastructure covers:

- **Utility function tests** for all pure functions in `src/lib/`
- **Svelte component tests** for key interactive components using `@testing-library/svelte`
- **Coverage enforcement** at 80%+ on `src/lib/` code

E2E testing uses **Playwright** (`pnpm run test:e2e`). See [Testing Guide](../docs/TESTING_GUIDE.md) for setup details.

## Running Tests

```bash
# Run all tests (single run)
pnpm run test

# Watch mode (re-runs on file changes)
pnpm run test:watch

# Run with coverage report
pnpm run test:coverage
```

## Validation Gates: Full and Scoped Commands

Deep Work Plan tasks turn their touched surface into a gate using this section. All commands run from the repository root with pnpm 11 (Vitest 4.1, Biome 2.5). Counts below were observed when this section was last verified; they drift as tests are added, so treat "non-empty selection, exit 0" as the evidence.

| Purpose | Scope | Command | Expected evidence |
|---|---|---|---|
| Unit/component tests | full | `pnpm run test` | all files pass (`vitest run`) |
| Unit tests | scoped (file) | `pnpm exec vitest run tests/unit/lib/blog.test.ts` | 1 file, 45 tests |
| Unit tests | scoped (directory) | `pnpm exec vitest run tests/unit/lib` | 15 files, 296 tests |
| Unit tests | scoped (name filter) | `pnpm exec vitest run -t "<test name>"` | only matching tests run |
| Unit tests | affected by a source change | `pnpm exec vitest related --run src/lib/blog.ts` | 4 files, 81 tests |
| Coverage | full | `pnpm run test:coverage` | 80% thresholds on `src/lib/` |
| End-to-end | full | `pnpm run test:e2e` | Playwright specs in `tests/e2e/` |
| Lint + format | full | `pnpm run biome:check` | exit 0 |
| Lint + format | scoped (files) | `pnpm exec biome check src/lib/blog.ts` | "Checked 1 file", exit 0 |
| Type-check | full only | `pnpm run astro:check` | exit 0; `astro check` has no per-file mode, so always run it project-wide |

A scoped run that selects nothing is not a pass: confirm the file or test count is non-zero.

### Source-to-test mapping

- `src/lib/<name>.ts` is covered by `tests/unit/lib/<name>.test.ts` (variants such as `blog-tags.test.ts` exist for large modules).
- `src/components/**/<Name>.svelte` is covered by `tests/unit/components/<Name>.test.ts`.
- API/agent surfaces (`src/lib/mcp.ts`, OpenAPI, ARD manifest) are covered by `tests/unit/lib/` and `tests/unit/agent-readiness/`; CLI code by `tests/unit/cli/`.
- Pages (`src/pages/**`, `src/components/pages/*Page.astro`), `.astro` components, content and translations have no unit tests. Cover them with `pnpm run astro:check`, `pnpm run build`, and the Playwright specs in `tests/e2e/` for user-visible flows.

### Dependent consumers

Run `pnpm exec vitest related --run <changed source files>` to find the tests that import a changed module (Vitest follows the import graph). Several `src/lib/` modules (`blog.ts`, `i18n.ts`, `translations/`) are shared by most components, so changes there should run `tests/unit` in full.

### Blind spots

`vitest related` does not see runtime `astro:content` data (mocked in `tests/mocks/astro-content.ts`), content collection schemas in `src/content.config.ts`, Markdown content, translation keys consumed only from `.astro` templates, or Tailwind classes. These are exercised only by `pnpm run astro:check` and `pnpm run build`.

### Escalation to the full run

Run `pnpm run test`, `pnpm run biome:check`, `pnpm run astro:check` and `pnpm run build` when the change touches `package.json`, `pnpm-lock.yaml`, `vitest.config.ts`, `biome.json`, `astro.config.*`, `tsconfig.json`, `tests/helpers/`, `tests/mocks/`, `src/content.config.ts`, `src/middleware.ts`, or the shared `src/lib/` modules named above.

### Fallback

When you cannot derive a sound scoped gate, run `pnpm run test`; it finishes in a few seconds.

### Testing posture

Unit tests come first: fast, deterministic checks of observable behavior in `src/lib/` (errors, edge cases, regressions), with mocks only at boundaries such as `astro:content`. Component tests use `@testing-library/svelte`. Integration-style coverage of routing, content collections and rendering comes from `pnpm run build` and a small number of Playwright flows. The repository enforces an 80% coverage threshold on `src/lib/` only; it sets no quota elsewhere. Everything in this section is a current, verified capability; nothing here is a proposal.

## Test Structure

```
tests/
├── unit/
│   ├── lib/                    # Utility function tests
│   │   ├── blog.test.ts        # Blog utility functions (41 tests)
│   │   ├── i18n.test.ts        # i18n utility functions (46 tests)
│   │   ├── search.test.ts      # Search/Fuse.js functions (26 tests)
│   │   └── translations.test.ts # Translation system (14 tests)
│   └── components/             # Svelte component tests
│       ├── BlogCard.test.ts    # Blog card rendering (14 tests)
│       └── BlogPagination.test.ts # Pagination logic (17 tests)
├── fixtures/
│   └── posts.ts                # Mock blog post data
├── helpers/
│   └── setup.ts                # Test setup (jest-dom matchers)
└── mocks/
    └── astro-content.ts        # Mock for astro:content virtual module
```

## Writing New Tests

### File Naming

- Use `*.test.ts` for all test files
- Place in `tests/unit/lib/` for utility tests
- Place in `tests/unit/components/` for component tests

### Utility Function Tests

```typescript
import { describe, expect, it } from 'vitest';
import { myFunction } from '@/lib/myModule';

describe('myFunction', () => {
  it('returns expected result for valid input', () => {
    expect(myFunction('input')).toBe('expected');
  });

  it('handles edge case', () => {
    expect(myFunction('')).toBe('default');
  });
});
```

### Svelte Component Tests

```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import MyComponent from '@/components/MyComponent.svelte';

describe('MyComponent', () => {
  it('renders content', () => {
    render(MyComponent, { props: { title: 'Hello' } });
    expect(screen.getByText('Hello')).toBeDefined();
  });
});
```

### Using Fixtures

Import mock data from `tests/fixtures/posts.ts`:

```typescript
import { publishedEnglishPost, demoEnglishPost } from '../../fixtures/posts';

// Use `as never` for CollectionEntry type compatibility
render(BlogCard, { props: { post: publishedEnglishPost as never } });
```

## Configuration

### `vitest.config.ts`

Key configuration:

- **Environment:** `happy-dom` (lightweight DOM for tests)
- **Path aliases:** `@/` maps to `src/` (matches tsconfig)
- **Svelte support:** `@sveltejs/vite-plugin-svelte` with `hot: false`
- **Browser resolve:** `conditions: ['browser']` required for Svelte 5 component tests
- **astro:content mock:** Aliased to `tests/mocks/astro-content.ts` since Vitest cannot resolve Astro virtual modules

### Coverage

- **Provider:** V8
- **Target:** 80%+ on statements, branches, functions, and lines for `src/lib/`
- **Excludes:** `src/lib/types.ts`, `src/lib/enum.ts` (type-only files)
- **Reporters:** text, text-summary, html

### Svelte 5 Compatibility

Svelte 5 components require `resolve.conditions: ['browser']` in the Vitest config. Without this, `@testing-library/svelte` throws a `lifecycle_function_unavailable` error because Svelte resolves to server-side exports.

## Test Conventions

- Use descriptive `describe`/`it` blocks: `describe('getPostSlug')` + `it('strips date prefix from post ID')`
- Prefer `expect().toBe()` for primitives, `expect().toEqual()` for objects
- Test edge cases: empty strings, undefined values, boundary conditions
- Do **not** test async functions that depend on `astro:content` (e.g., `getBlogPosts`, `getRelatedPosts`)
- Import order: vitest > testing-library > source modules > fixtures

## Testing Best Practices

### Do

- Test user-visible behavior, not implementation details
- Use meaningful test descriptions that explain the expected behavior
- Keep tests independent (no shared mutable state)
- Use test fixtures for mock data
- Test edge cases and error conditions

### Don't

- Test Astro/Svelte framework internals
- Over-mock to the point tests are meaningless
- Write flaky tests that depend on timing
- Skip running tests before committing

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Svelte](https://testing-library.com/docs/svelte-testing-library/intro)
- [Astro Testing Recipes](https://docs.astro.build/en/recipes/testing/)
