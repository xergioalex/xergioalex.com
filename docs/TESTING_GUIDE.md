# Testing Guide

Guide for testing in XergioAleX.com.

## Overview

This project uses **Vitest** for unit and component testing. The testing infrastructure covers:

- **Utility function tests** for all pure functions in `src/lib/`
- **Svelte component tests** for key interactive components using `@testing-library/svelte`
- **Coverage enforcement** at 80%+ on `src/lib/` code

E2E testing uses **Playwright** (`pnpm run test:e2e`). See [Testing Guide](../docs/TESTING_GUIDE.md) for setup details.

## Running Tests

Working directory for every command below is the **repository root**. Vitest is **4.1.11**; Biome is **2.5.10**. Flag behavior is version-sensitive — do not assume npm/jest selectors.

### Full suite

```bash
# Unit tests, single run (full)
pnpm run test

# Watch mode (re-runs on file changes)
pnpm run test:watch

# Run with coverage report (full; 80% floor on src/lib/)
pnpm run test:coverage

# Lint/format (full)
pnpm run biome:check

# TypeScript / Astro check (full — no file-scoped variant)
pnpm run astro:check

# E2E (Playwright, full)
pnpm run test:e2e
```

### Scoped invocation (verified)

Vitest and Biome accept a path. A scoped run that selects **zero** tests is not verified — fix the selector.

```bash
# Unit tests by file (verified 2026-09-17: 45 tests, exit 0)
pnpm exec vitest run tests/unit/lib/blog.test.ts

# Unit tests by directory
pnpm exec vitest run tests/unit/lib/

# Name filter
pnpm exec vitest run tests/unit/lib/blog.test.ts -t "getPostSlug"

# Lint/format one file (verified 2026-09-17: 1 file, exit 0)
pnpm exec biome check src/lib/blog.ts
```

Playwright can take a file (`pnpm exec playwright test tests/e2e/<file>`). That pattern is **proposed / unverified** in this session — if e2e is in the gate, run `pnpm run test:e2e` unless you have just confirmed a non-empty selection. `astro check` is project-wide only.

When the full unit suite is cheap (it is, on this repo), prefer `pnpm run test` over elaborate selection. Use scoped Vitest for a single touched lib/component file.

### Source-to-test mapping

| Source | Test |
|--------|------|
| `src/lib/<name>.ts` | `tests/unit/lib/<name>.test.ts` (mirrored tree, `*.test.ts`) |
| `src/components/**/*.svelte` | `tests/unit/components/<Component>.test.ts` |
| `src/pages/`, `src/content/`, layouts | no co-located unit tests; cover via lib helpers, component tests, or Playwright |

**Dependent consumers:** there is no `--changed` / `testmon` / affected-tests graph. When a shared module changes, run the tests of its known importers (grep `from '@/lib/<name>'`) and, if unsure, the full unit suite.

**Blind spots:** `astro:content` virtual module (mocked at `tests/mocks/astro-content.ts`; async helpers like `getBlogPosts` are **not** unit-tested); Markdown/MDX content; Cloudflare `functions/_middleware.ts` runtime; generated `public/openapi.json` and `public/.well-known/agent-skills/index.json`; image pipelines; Tailwind class presence.

**Escalation — always run the full unit suite (`pnpm run test`) when the change includes:** `src/lib/` shared utilities, `vitest.config.ts`, `astro.config.mjs`, `tsconfig.json`, `biome.json`, `package.json` / `pnpm-lock.yaml`, `src/content.config.ts`, or `src/middleware.ts`. Content-only or docs-only diffs do not require the unit suite; still run `pnpm run biome:check` if `src/` or `tests/` or `scripts/` files changed.

**Fallback:** if scoping cannot cover the change, run `pnpm run test`. If lint cannot be scoped, run `pnpm run biome:check`. If types are in play, run `pnpm run astro:check`.

## Test layers and posture

- **Unit (base, unit-first):** `tests/unit/**/*.test.ts` via Vitest + happy-dom. Fast, deterministic tests of observable behavior and meaningful boundaries — return values, rendered text, error/edge cases. Mock at useful boundaries (`astro:content`). **No** assertions on internal call sequences.
- **Component:** Svelte under `tests/unit/components/` with `@testing-library/svelte`.
- **Integration / real seams:** JSON API contracts live in `src/pages/api/` and `src/lib/agent-errors.ts` / `src/lib/rate-limit.ts`. A change to those seams should add or update unit tests of the pure helpers; there is no separate integration runner.
- **E2E:** Playwright (`pnpm run test:e2e`, `playwright.config.ts`) for a few high-value flows. Not the default gate for a lib or component change.

**Current vs proposed:** everything in this guide is the current, verified toolchain except the Playwright file-scoped pattern (proposed/unverified) and `astro check` (full only).

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
