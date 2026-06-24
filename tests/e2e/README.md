# End-to-end tests (Playwright)

E2E tests that drive a real browser against a production-like build of the site.

> **MCP vs these tests:** the Playwright **MCP** (`docker/local/docker-compose.yaml`
> → `playwright-mcp`) gives the *agent* interactive eyes. These are deterministic
> **Playwright Test** specs (`@playwright/test`) that pass/fail and run in CI.
> Different tools, shared Playwright image + browser.

## Layout

```
playwright.config.ts     # root config (browsers, webServer, baseURL)
tests/e2e/
├── home.spec.ts         # hero title + primary nav
├── blog.spec.ts         # listing, live search, post view
├── dark-mode.spec.ts    # theme toggle light → dark
└── i18n.spec.ts         # /es/ localized title + language toggle
```

## How to run

These need a browser + system deps, which the dev container does NOT have. Run
them through the dedicated **`e2e`** service (the official Playwright image, which
ships the browsers). From the **host**:

```sh
cd docker/local
docker compose --profile e2e run --rm e2e
```

That service mounts the repo, installs deps, and runs `pnpm run test:e2e`. By
default the config **builds the site and launches `astro preview`** itself, so
the run is deterministic and self-contained — no dependency on the dev server.

### Faster loop against the running dev server

To skip the build and hit the already-running dev server, pass its address via
`E2E_BASE_URL` (the config then skips its own `webServer`):

```sh
# IP because Vite's allowedHosts rejects the service name; the IP is ephemeral.
E2E_BASE_URL=http://<dev-container-ip>:4444 docker compose --profile e2e run --rm e2e
```

## Local scripts

```sh
pnpm run test:e2e          # run all specs
pnpm run test:e2e:ui       # interactive UI mode (needs a display)
pnpm run test:e2e:report   # open the last HTML report
```

## Notes

- We pin **bundled Chromium** in `playwright.config.ts` (not
  `devices['Desktop Chrome']`, which uses the Google Chrome channel that isn't in
  the image).
- `@playwright/test` is pinned to `1.61.0` to match the
  `mcr.microsoft.com/playwright:v1.61.0-noble` image's browser revision.
- Artifacts (`playwright-report/`, `test-results/`) are git-ignored.
