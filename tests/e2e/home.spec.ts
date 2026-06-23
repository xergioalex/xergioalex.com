import { expect, test } from '@playwright/test';

test.describe('Home (EN)', () => {
  test('renders the hero title and heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Sergio Florez/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Sergio Florez' })
    ).toBeVisible();
  });

  test('primary navigation is present', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation').first();
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();
  });
});
