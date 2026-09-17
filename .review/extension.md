# Review overrides for xergioalex.com

XergioAleX.com is an Astro 7 static site (Svelte 5 islands, TypeScript 6,
Tailwind CSS 4, Biome 2, Vitest 4) deployed to Cloudflare Pages. There is no
app database or session auth. The review surface that actually hurts here is
client-side secret leakage, i18n/content-lifecycle defects, accessibility
regressions, and Cloudflare middleware/API contract breaks — not ORM or
password-reset flows.

## Severity overrides for this codebase

- **Always `critical`:** a non-`PUBLIC_` secret, API key, or token in any
  file that ships to the browser — Svelte with `client:*`, `src/components/`,
  or client JS. Static HTML cannot hide it. Pattern: `docs/SECURITY.md`,
  `src/components/**/*.svelte`.
- **Always `critical`:** a blog `pubDate` change without a matching
  `git mv` of the `YYYY-MM-DD_` filename prefix in **both**
  `src/content/blog/en/` and `src/content/blog/es/`. The date is one fact in
  two places (`AGENTS.md` Blog Post Conventions).
- **Always `critical`:** Spanish slugs for posts, series, or image
  directories. Slugs stay English even for Spanish content
  (`src/content/blog/es/`, `src/content/series/`).
- **Always `critical`:** placeholder copy in published posts —
  `[AUTHOR:]`, `[TODO:]`, `[TBD]`, `[FIXME]` in `src/content/blog/`.
- **Always `critical`:** body text using `text-gray-400`, `text-gray-500`,
  `dark:text-gray-400`, or `dark:text-gray-500` (fails WCAG AA). Approved
  secondary text is `text-gray-600 dark:text-gray-300`
  (`docs/ACCESSIBILITY.md`, `docs/DESIGN.md`).
- **Escalate to `warning`:** a new top-level route without updating the
  hardcoded allowlist in `src/middleware.ts` (`KNOWN_ROOT_PATHS` /
  `KNOWN_ES_PATHS`). Symptom in dev: `[404] (rewrite) /foo`.
- **Escalate to `warning`:** importing `MainLayout` in a `src/pages/`
  wrapper. Wrappers are 3-line routers; layout lives in
  `src/components/pages/*Page.astro`.
- **Escalate to `warning`:** a Cloudflare Pages change in
  `functions/_middleware.ts` that drops Markdown `Accept` negotiation,
  `/api/*` JSON 404s, `/mcp` handling, or rate-limit headers
  (`src/lib/agent-errors.ts`, `src/lib/rate-limit.ts`, `src/lib/mcp/`).
- **De-escalate to `info`:** missing unit tests for `astro:content` async
  helpers (`getBlogPosts`, `getRelatedPosts`). Vitest cannot resolve that
  virtual module; the project mocks it in `tests/mocks/astro-content.ts`
  and documents the skip in `docs/TESTING_GUIDE.md`.

## Don't comment on

- Generated artifacts: `public/openapi.json`,
  `public/.well-known/agent-skills/index.json` (rewritten by `prebuild`).
- Vendored upstream skill trees under `.agents/skills/deepworkplan/` and
  `.agents/skills/ai-diff-reviewer/` unless this repo adapted a file.
- Formatting-only noise in `dist/`, `.astro/`, `coverage/`,
  `playwright-report/`.
- Reveal.js CSS/JS loading only on internal decks via `SlideLayout.astro`
  — that isolation is intentional.
- Spanish orthography nits inside English-only files (`AGENTS.md`,
  `src/pages/internal/`). Internal hub is English-only by design.

## Repo-specific conventions

- **Package manager is pnpm** (`pnpm-lock.yaml`, `packageManager: pnpm@11.22.0`).
  Do not introduce npm/yarn lockfiles.
- **Lint/format is Biome 2**, not ESLint/Prettier (`biome.json`,
  `pnpm run biome:check`).
- **i18n:** English at `src/pages/`, Spanish at `src/pages/es/`. User-visible
  strings go through `getTranslations(lang)`; URLs through `getUrlPrefix(lang)`.
- **Page wrapper pattern:** `src/pages/*.astro` stay 3 lines; pass `lang` as
  a string literal (`"en"` / `"es"`), never a variable.
- **Hydration:** prefer `client:visible` over `client:load`. Documented
  exception: `RevealDeck.svelte` uses `client:only="svelte"`.
- **Commits:** conventional commits in English (`feat:`, `fix:`, `docs:`,
  `chore:`). Do not push to `main` without explicit confirmation.
- **Env:** only `PUBLIC_*` may reach the client (`docs/SECURITY.md`).
  Cloudflare branch visibility uses `CF_PAGES_BRANCH` / `PRODUCTION_BRANCHES`
  in `src/lib/blog.ts` — do not invert draft hiding.
- **API:** JSON endpoints live under `src/pages/api/` and are prerendered
  static files; runtime behavior for missing paths is in
  `functions/_middleware.ts`, not a Node server.

## Test-strategy expectations

- New pure helpers in `src/lib/*.ts` need a matching file under
  `tests/unit/lib/*.test.ts`. Coverage floor is 80% on `src/lib/`
  (`vitest.config.ts`).
- New interactive Svelte components should get
  `tests/unit/components/*.test.ts` with `@testing-library/svelte`.
- Prefer scoped Vitest (`pnpm exec vitest run <file>`) for a touched
  unit; fall back to `pnpm run test` when `src/lib/` shared code or
  `vitest.config.ts` changes.
- Do not demand E2E (`pnpm run test:e2e`, Playwright) for copy/docs-only
  diffs. Keep Playwright for high-value user flows.
- Do not assert on internal call sequences; test rendered/user-visible
  behavior and lib return values.
