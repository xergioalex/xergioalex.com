import { expect, test } from '@playwright/test';

test.describe('i18n', () => {
  test('Spanish home renders the localized title', async ({ page }) => {
    await page.goto('/es/');
    await expect(page).toHaveTitle(/CTO y Cofundador/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Sergio Florez' })
    ).toBeVisible();
  });

  test('language toggle is available', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('button', { name: 'EN' }).first()
    ).toBeVisible();
  });
});
