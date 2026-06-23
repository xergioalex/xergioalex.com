import { defineConfig } from '@playwright/test';

// E2E target. Default: a production-like server this config launches itself
// (build + astro preview) so runs are deterministic. Override E2E_BASE_URL to
// point at an already-running server instead (e.g. the dev container's IP:
// E2E_BASE_URL=http://172.22.0.3:4444). See tests/e2e/README.md.
const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4444';
const useExternalServer = Boolean(process.env.E2E_BASE_URL);

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // We pin the BUNDLED Chromium explicitly instead of using
  // devices['Desktop Chrome'], which sets channel: 'chrome' (Google Chrome) —
  // not present in the Playwright image, the same trap the MCP hit.
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', viewport: { width: 1280, height: 720 } },
    },
    // The Playwright image also ships Firefox + WebKit. Enable for cross-browser:
    // { name: 'firefox', use: { browserName: 'firefox', viewport: { width: 1280, height: 720 } } },
    // { name: 'webkit', use: { browserName: 'webkit', viewport: { width: 1280, height: 720 } } },
  ],
  webServer: useExternalServer
    ? undefined
    : {
        command: 'pnpm run build && pnpm exec astro preview --port 4444',
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 240_000,
      },
});
