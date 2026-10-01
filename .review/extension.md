# Review overrides for xergioalex.com

Personal website and blog built as a static Astro 7 site (Svelte 5 islands, Tailwind CSS 4, Biome 2, Vitest 4) with English and Spanish content, deployed to Cloudflare Pages. The only server-side code is the Pages Function in `functions/` (`_middleware.ts`, `mcp.ts`), which serves Markdown negotiation, agent-friendly errors, per-IP rate limiting and an MCP endpoint. A good review here protects content parity between languages, the public API contract and edge code, and accessibility and performance budgets.

## Severity overrides for this codebase

- **Always `critical`:** a secret, token or private env var read from client code. Only `PUBLIC_*` variables may reach `.astro` client scripts, `.svelte` files or anything under `public/`. Reference: `docs/SECURITY.md`, `src/lib/constances.ts`.
- **Always `critical`:** `set:html`, `{@html}` or `innerHTML` fed by unsanitized, user-controlled or externally fetched strings. Existing legitimate uses are build-time content: `src/components/JsonLd.astro` (`JSON.stringify` of build data) and `src/components/slides/ExternalView.astro` (deck body from the content collection). Any new use needs a trusted-source justification.
- **Always `critical`:** untrusted input flowing into the edge code without validation. This covers `functions/_middleware.ts`, `functions/mcp.ts` and `src/lib/mcp/*` (request bodies, query params, headers, tool arguments), and anything that weakens `src/lib/rate-limit.ts` or bypasses it for `/api/*` or `/mcp`.
- **Always `critical`:** removing or loosening the production exclusion of `/internal/*` (`src/integrations/exclude-internal.ts`, the `INCLUDE_INTERNAL` flag, the `noindex` meta, the sitemap filter), or linking `/internal/` pages from public pages.
- **Always `critical`:** re-adding `PUBLIC_GOOGLE_SITE_VERIFICATION` or any `google-site-verification` meta tag (GSC verification is DNS-only; Bing is the optional `PUBLIC_BING_SITE_VERIFICATION`).
- **Escalate to `warning`:** a content or UI change that exists in only one language. Blog posts in `src/content/blog/{en,es}/`, slide decks in `src/content/slides/{en,es}/`, page Markdown in `src/content/pages/{en,es}/`, and strings in both `src/lib/translations/en.ts` and `es.ts` (with `types.ts` updated) must change together.
- **Escalate to `warning`:** a blog post whose filename date prefix (`YYYY-MM-DD_slug.md`) differs from its frontmatter `pubDate`, a Spanish slug, or a bracketed placeholder (`[TODO:`, `[AUTHOR:`, `[TBD]`, `[FIXME]`) in published content.
- **Escalate to `warning`:** a new top-level route (`/foo`, `/es/foo`) that does not also update the allowlist in `src/middleware.ts` (`KNOWN_ROOT_PATHS`, `KNOWN_ES_PATHS`); it silently 404s.
- **Escalate to `warning`:** a change to a public JSON endpoint under `src/pages/api/` or to `src/lib/api-*.ts` that alters response shape without updating the OpenAPI generation and the versioning policy (`src/lib/api-versioning.ts`, `docs/features/PUBLIC_API.md`).
- **Escalate to `warning`:** `client:load` where `client:visible` or `client:idle` would do, new JavaScript where CSS suffices, or an `<img>` without `width` and `height`.
- **Escalate to `warning`:** secondary text styled `text-gray-400`, `text-gray-500`, `dark:text-gray-400` or `dark:text-gray-500` (fails WCAG AA), and `role="menu"` on navigation dropdowns.
- **De-escalate to `info`:** `any` types and unused imports or variables. `biome.json` deliberately turns off `noExplicitAny`, `noUnusedImports` and `noUnusedVariables`.

## Don't comment on

- Formatting or lint style that `pnpm run biome:check` already enforces; Biome is the only formatter (no ESLint or Prettier suggestions).
- `public/images/**` binaries, generated `.webp` files, and `public/openapi.json` and other generated discovery files that `prebuild` regenerates.
- `pnpm-lock.yaml` and version bumps produced by `pnpm run release` or the package-upgrade workflows.
- Demo content under `_demo/` folders; it never ships to listings or search.
- Prose style in blog posts, unless a rule in `docs/WRITING_VOICE_GUIDE.md` is clearly broken (placeholders, missing accents).

## Repo-specific conventions

- **Page wrapper pattern:** files in `src/pages/` and `src/pages/es/` are three-line wrappers that pass `lang` as a string literal to a `*Page.astro` in `src/components/pages/`. Wrappers must never import `MainLayout`; page components own the layout.
- **No hardcoded user-visible text:** components use `getTranslations(lang)` from `@/lib/translations` and `getUrlPrefix(lang)` for URLs.
- **Spanish orthography:** Spanish text must carry ñ, accents and interrogative accents (`diseño`, `código`, `cómo`). Unaccented forms such as `diseno`, `codigo`, `pagina` or `version` in `src/content/**/es/` or `src/lib/translations/es.ts` are defects.
- **Agent-friendly Markdown parity:** changes to page or translation content must also update `src/content/pages/{en,es}/*.md`, which `functions/_middleware.ts` serves for `Accept: text/markdown`.
- **Import order:** Node built-ins, third-party packages, `@/` project modules, then `import type` statements as a separate group.
- **Series and tags:** series and image directories use English slugs; tags are never auto-created (they come from `src/content/tags/*.md`), with 1-3 primary tags per post.
- **Slides:** Reveal.js CSS and JS load only through `SlideLayout.astro`; routes live under `/tech-talks/`, not `/slides/`.
- **Conventional commits** in English (`feat:`, `fix:`, `docs:`, ...).

## Test-strategy expectations

- New or changed functions in `src/lib/` need a matching `tests/unit/lib/<name>.test.ts`; the repository enforces an 80% coverage floor on `src/lib/` (`vitest.config.ts`).
- Changes to edge behavior (`functions/_middleware.ts`, `src/lib/rate-limit.ts`, `src/lib/agent-errors.ts`, `src/lib/mcp/*`) should come with unit tests covering the error and limit paths.
- New or changed Svelte components that carry logic need a test under `tests/unit/components/`; user-visible flows that span pages belong in `tests/e2e/` (Playwright).
- Changes to `src/content.config.ts` schemas should be validated by `pnpm run build`, since content collections are not unit-tested.
