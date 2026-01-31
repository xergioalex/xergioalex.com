# Testing Guide

Guide for testing in XergioAleX.com.

## Current Status

**Testing is NOT currently configured in this project.**

The `npm run test` command is a placeholder:

```json
{
  "scripts": {
    "test": "echo 'Running tests...'"
  }
}
```

This document outlines the recommended testing approach for future implementation.

## Recommended Testing Stack

| Tool | Purpose | Type |
|------|---------|------|
| **Vitest** | Unit tests | Fast, Vite-native |
| **Testing Library** | Component tests | DOM testing |
| **Playwright** | E2E tests | Browser automation |

## Future Setup

### Step 1: Install Dependencies

```bash
# Unit testing
npm install -D vitest @testing-library/svelte happy-dom

# E2E testing
npm install -D @playwright/test
npx playwright install
```

### Step 2: Configure Vitest

Create `vitest.config.ts`:

```typescript
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'happy-dom',
  },
});
```

### Step 3: Update package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:watch": "vitest --watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### Step 4: Configure Playwright

Create `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run preview',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4321',
  },
});
```

## Test Directory Structure

```
tests/
├── unit/                    # Vitest unit tests
│   ├── lib/
│   │   └── blog.test.ts     # Utility function tests
│   └── components/
│       └── BlogCard.test.ts # Component tests
├── e2e/                     # Playwright E2E tests
│   ├── home.spec.ts
│   ├── blog.spec.ts
│   └── navigation.spec.ts
└── fixtures/                # Test data
    └── posts.json
```

## Test File Naming

| Type | Pattern | Example |
|------|---------|---------|
| Unit | `*.test.ts` | `blog.test.ts` |
| E2E | `*.spec.ts` | `home.spec.ts` |

## Example Tests

### Unit Test: Utility Function

```typescript
// tests/unit/lib/blog.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from '@/lib/blog';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    const result = formatDate(date);
    expect(result).toBe('Jan 15, 2024');
  });

  it('handles invalid date gracefully', () => {
    expect(() => formatDate(null as any)).toThrow();
  });
});
```

### Component Test: Svelte Component

```typescript
// tests/unit/components/BlogCard.test.ts
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import BlogCard from '@/components/blog/BlogCard.svelte';

describe('BlogCard', () => {
  const mockPost = {
    id: 'test-post',
    data: {
      title: 'Test Post Title',
      description: 'Test description',
      pubDate: new Date('2024-01-15'),
      tags: ['tech'],
    },
  };

  it('renders post title', () => {
    render(BlogCard, { props: { post: mockPost } });
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('renders post description', () => {
    render(BlogCard, { props: { post: mockPost } });
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(BlogCard, { props: { post: mockPost } });
    expect(screen.getByText('tech')).toBeInTheDocument();
  });
});
```

### E2E Test: Page Navigation

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/XergioAleX/);
  });

  test('can navigate to blog', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Blog');
    await expect(page).toHaveURL('/blog');
  });

  test('can navigate to about', async ({ page }) => {
    await page.goto('/');
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
  });

  test('language switcher works', async ({ page }) => {
    await page.goto('/');
    // Switch to Spanish
    await page.selectOption('select', '/es/');
    await expect(page).toHaveURL('/es/');
  });
});
```

### E2E Test: Blog Functionality

```typescript
// tests/e2e/blog.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('blog page shows posts', async ({ page }) => {
    await page.goto('/blog');
    const posts = page.locator('article');
    await expect(posts).toHaveCount.greaterThan(0);
  });

  test('can click on blog post', async ({ page }) => {
    await page.goto('/blog');
    const firstPost = page.locator('article').first();
    await firstPost.click();
    await expect(page.url()).toContain('/blog/');
  });

  test('search filters posts', async ({ page }) => {
    await page.goto('/blog');
    await page.fill('input[type="search"]', 'markdown');
    // Wait for search results
    await page.waitForTimeout(500);
    const posts = page.locator('article');
    // Should show filtered results
    await expect(posts).toHaveCount.lessThan(10);
  });

  test('tag filtering works', async ({ page }) => {
    await page.goto('/blog/tag/tech');
    const posts = page.locator('article');
    await expect(posts).toHaveCount.greaterThan(0);
  });
});
```

### E2E Test: Dark Mode

```typescript
// tests/e2e/theme.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Theme', () => {
  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');
    
    // Check initial state (light mode)
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);
    
    // Toggle dark mode
    await page.click('[aria-label="Toggle dark mode"]');
    await expect(html).toHaveClass(/dark/);
    
    // Toggle back
    await page.click('[aria-label="Toggle dark mode"]');
    await expect(html).not.toHaveClass(/dark/);
  });

  test('dark mode persists on navigation', async ({ page }) => {
    await page.goto('/');
    await page.click('[aria-label="Toggle dark mode"]');
    
    // Navigate to another page
    await page.click('text=Blog');
    
    // Should still be in dark mode
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });
});
```

## What to Test

### Priority 1: Critical User Flows

- [ ] Home page loads
- [ ] Navigation works
- [ ] Blog posts display
- [ ] Blog post pages load
- [ ] Dark mode toggle

### Priority 2: Features

- [ ] Search functionality
- [ ] Tag filtering
- [ ] Pagination
- [ ] Language switching
- [ ] RSS feed

### Priority 3: Edge Cases

- [ ] Empty search results
- [ ] Invalid URLs (404)
- [ ] Mobile navigation

## Testing Best Practices

### Do

- ✅ Test user-visible behavior, not implementation
- ✅ Use meaningful test descriptions
- ✅ Keep tests independent
- ✅ Use test fixtures for data
- ✅ Run tests in CI/CD

### Don't

- ❌ Test Astro/Svelte internals
- ❌ Over-mock to the point tests are meaningless
- ❌ Write flaky tests that depend on timing
- ❌ Skip testing after changes

## CI/CD Integration

When testing is set up, add to GitHub Actions:

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:run
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

## Validation Without Tests

Until testing is configured, validate changes with:

```bash
# Type checking
npm run astro:check

# Linting
npm run biome:check

# Build verification
npm run build

# Manual testing
npm run dev
```

## Next Steps

To implement testing:

1. Install dependencies (see Setup section)
2. Create configuration files
3. Add first tests for critical paths
4. Set up CI/CD integration
5. Gradually increase coverage

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Svelte](https://testing-library.com/docs/svelte-testing-library/intro)
- [Playwright Documentation](https://playwright.dev/)
- [Astro Testing Recipes](https://docs.astro.build/en/recipes/testing/)
