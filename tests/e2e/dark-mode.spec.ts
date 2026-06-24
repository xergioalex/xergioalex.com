import { expect, test } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('switches from light to dark', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: 'Toggle dark mode' });
    await expect(toggle).toBeVisible();

    // Fresh context defaults to light theme (sun icon).
    await expect(toggle).toContainText('☀️');

    await toggle.click();

    // After toggling, the control shows the moon icon and the document gets
    // the Tailwind `dark` class.
    await expect(toggle).toContainText('🌙');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
