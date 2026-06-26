import { expect, test } from '@playwright/test';

test.describe('Blog', () => {
  test('lists articles', async ({ page }) => {
    await page.goto('/blog');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Articles & Stories' })
    ).toBeVisible();
    await expect(page.getByRole('article').first()).toBeVisible();
  });

  test('live search filters by query string', async ({ page }) => {
    await page.goto('/blog');
    const search = page.getByRole('searchbox', { name: 'Search articles...' });

    // The search is a `client:visible` Svelte island, so in the production build
    // it may not be hydrated the instant the input appears — early keystrokes
    // would be lost and the URL never updates. toPass() retries the type+assert
    // so the hydration race self-heals (and a genuine failure still surfaces).
    await expect(async () => {
      await search.fill('');
      await search.pressSequentially('trading');
      await expect(page).toHaveURL(/q=trading/, { timeout: 1500 });
    }).toPass({ timeout: 15_000 });

    await expect(page.getByText(/results found/i)).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /trading/i }).first()
    ).toBeVisible();
  });

  test('opens a blog post', async ({ page }) => {
    await page.goto('/blog/from-manual-to-algorithmic-trading/');
    await expect(page).toHaveTitle(
      /From Manual Trading to Algorithmic Trading/
    );
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
