---
title: "Building a Multilingual Slide System Inside Astro with Reveal.js"
description: "How I built a three-type slide deck catalog inside my Astro website — discriminated unions, AEO twins, asset isolation, and live theme sync."
pubDate: 2026-04-27
tags: ["web-development", "talks", "astro", "svelte", "portfolio"]
series: "slides-as-code"
seriesOrder: 2
heroLayout: none
draft: true
keywords: [astro slides, reveal.js astro integration, slides as content, discriminated union schema, AEO markdown twins, presentation system]
---

After [an analysis of the different slides-as-code tools available for developers](/blog/best-presentation-tools-for-developers-2026), I chose [Reveal.js](https://revealjs.com) to build my own slide system inside my website. This post is the technical case study: how I built a three-type slide deck catalog that lives *inside* my Astro site as first-class content, with the same multilingual support, SEO/AEO infrastructure, and theme system as my blog posts.

The full system handles three kinds of decks:

1. **Internal decks** — authored in Markdown, rendered with Reveal.js at build time.
2. **External-embed decks** — third-party slides (Google Slides, Speaker Deck) rendered via `<iframe>`.
3. **External-link decks** — third-party slides that block iframes, rendered as a stub info page with a CTA.

All three types live in one Astro Content Collection, share the same Zod schema (discriminated union), and surface in a dedicated `/slides` catalog with infinite scroll.

## Why Not Slidev?

I covered this briefly in the [comparison post](/blog/best-presentation-tools-for-developers-2026), but the architecture mismatch deserves a deeper explanation.

Slidev is a standalone Vue/Vite application. To use it, you run `slidev build` and get a static SPA. Integrating that into an Astro site would mean:

- Maintaining a **separate `package.json`** with Vue, Vite, and Slidev's dependency tree.
- Running a **separate build** pipeline (`slidev build` → copy output to `public/slides/`).
- Losing **Content Collections**: no Zod validation, no draft filtering, no `getCollection()` queries.
- Losing **i18n**: no `getTranslations(lang)`, no `getUrlPrefix(lang)`, no language switcher in the deck chrome.
- Losing **AEO twins**: the project mandates that every HTML page has a parallel `.md` endpoint for AI agents. A Slidev SPA can't participate in that.
- Losing **theme integration**: Slidev has its own UnoCSS-based theming. My site uses Tailwind v4 with a dark/light toggle that drives `<html class="dark">`. Two theme systems that don't talk to each other.
- Losing **sitemap and SEO**: Slidev's output is a SPA with hash-based routing, invisible to `@astrojs/sitemap`.

Reveal.js avoids all of this because it's a library, not an app. I import it in a Svelte component, initialize it on mount, and the rest of the page is standard Astro. Same build, same collections, same i18n, same SEO.

## The Three-Type Schema

The heart of the architecture is a Zod discriminated union in `src/content.config.ts`:

```typescript
const slideSchema = z.discriminatedUnion('type', [
  internalSlideSchema,     // type: 'internal'
  externalLinkSlideSchema, // type: 'external-link'
  externalEmbedSlideSchema // type: 'external-embed'
]);
```

Each variant shares a base schema (title, description, pubDate, tags, draft, event metadata) and extends it with type-specific fields:

- **`internal`** adds `theme`, `transition`, `syntaxHighlight`, `math`.
- **`external-link`** adds `externalUrl`, `provider`.
- **`external-embed`** adds `externalUrl`, `embedUrl`, `provider`, `aspectRatio`.

TypeScript narrows the type automatically: when I write `if (deck.data.type === 'internal')`, the compiler knows `deck.data.theme` exists in that branch. No type casting, no runtime checks beyond the one the discriminated union already provides.

Why one collection instead of three? The catalog page (`SlidesPage.astro`) calls `getSlideDecks(lang)` once and renders all types in a single timeline. The AEO twin endpoints handle all types in one `getStaticPaths`. Translations apply uniformly. And migrating a deck from one type to another is a one-field frontmatter change — no file moves.

## Build-Time Markdown Rendering

For internal decks, the route reads `deck.body` (the raw Markdown from the `.md` file) and embeds it in a `<textarea data-template>` inside a `<section data-markdown>`. This is Reveal's native Markdown handling:

```html
<section data-markdown
  data-separator="^---$"
  data-separator-vertical="^--$">
  <textarea data-template>{deck.body}</textarea>
</section>
```

Reveal's Markdown plugin parses the textarea content on hydration, converting it into real `<section>` elements with all the fragment, auto-animate, and code highlight features intact.

The anti-FOUC mechanism: the deck container starts with `opacity-0` and transitions to full opacity after Reveal fires its `ready` event. A small inline script in `SlideLayout.astro` listens for a custom `reveal:ready` event dispatched by the Svelte component.

## SlideLayout and RevealDeck

**`SlideLayout.astro`** is the fullscreen layout used by internal and external-embed decks. It:

1. Imports Reveal.js CSS (both dark and light themes) — this is the **only** layout that does, ensuring Reveal styles don't leak to other pages.
2. Provides accessible navigation chrome: exit link (← back to catalog), language switcher, and conditional PDF hint.
3. Syncs the site's dark/light theme to Reveal's body class via a `MutationObserver` on `<html class="dark">`.

**`RevealDeck.svelte`** is the client-side component that initializes Reveal. It uses `client:only="svelte"` (a documented exception to the project's preference for `client:visible`) because Reveal needs DOM access that SSR can't provide.

The component dynamically imports Reveal core and plugins on mount:

```typescript
const Reveal = (await import('reveal.js')).default;
const Markdown = (await import('reveal.js/plugin/markdown')).default;
const Notes = (await import('reveal.js/plugin/notes')).default;
```

Plugins like Highlight and Math are conditionally loaded based on frontmatter flags (`syntaxHighlight`, `math`), so decks that don't use code or equations don't pay for those bytes.

## Asset Isolation

This was a non-negotiable: visiting `/`, `/blog`, `/about`, or even `/slides` (the catalog) must ship **zero Reveal.js bytes**.

Astro's per-route asset graph handles this automatically. Since Reveal CSS is only imported in `SlideLayout.astro`, and `SlideLayout` is only used by internal-deck and external-embed routes, the CSS chunks only appear in those pages' HTML.

I verified this after the build by grepping `dist/` for Reveal chunk references — only the two demo deck pages (EN + ES) reference them. Every other page is clean.

## AEO Twins for Slides

The project has an explicit policy: every HTML page must have a parallel `.md` endpoint serving `text/markdown` for AI agents. This is enforced by `npm run md:check:strict` in the build.

Slides follow this policy via `[slug].md.ts` endpoints:

- **Internal decks**: the twin serves the raw Markdown body verbatim. An AI agent reading `/slides/demo-revealjs-features.md` gets the full slide content as human-readable Markdown.
- **External-link decks**: the twin serves a structured stub with title, description, event metadata, and the external URL.
- **External-embed decks**: same stub plus the embed URL.

This means AI agents can answer "what slides has Sergio published about DevOps?" without rendering JavaScript or parsing HTML.

## The Catalog

The catalog has its own route: `/slides` (and `/es/slides`). It's a dedicated index page, not a section glued onto another page.

`SlidesPage.astro` fetches all non-draft decks for the current language and hands them to `SlidesTimelineInfiniteScroll.svelte`, a Svelte 5 component that progressively loads pages via a JSON API endpoint. The initial render ships the first batch; the rest stream in as the visitor scrolls. This means a catalog of 100 decks doesn't ship 100 cards on first paint.

Each `SlideCard.astro` shows the hero image (or a gradient placeholder), a `TypeBadge` pill ("Built in-house" / "External link" / "Embedded"), the title, event metadata, description, and tags. The same component is reusable: it powers both the dedicated `/slides` index and any embedded surface (homepage previews, related-decks panels) that consumes the same JSON endpoint.

## Production Hardening

The three improvements that took the system from "works on my machine" to "ships to anyone" — none of them were obvious until I had real decks running in front of real audiences.

**Vertical centering vs. late image decode.** Reveal sets a per-slide `top` via its `layout()` method: `top = max((slideHeight − section.scrollHeight) / 2, 0)`. Reveal runs `layout()` on init — usually *before* raster images have decoded. With `scrollHeight` still too small, `top` lands too high; once the image paints, the block sits with empty space above it and the bottom can clip off the 1280×720 canvas. The fix lives in `RevealDeck.svelte`: wire `load` and `error` handlers on every `<img>` (once) and schedule `deck.layout()` on the next animation frame so centering uses the final `scrollHeight`. Authors should still set `width` and `height` on every image, but the engine now handles the timing race.

**Overview thumbnails and Tailwind v4 preflight.** Reveal hides off-screen slides with the `[hidden]` attribute. Tailwind v4's preflight ships its own `[hidden] { display: none }` rule. When the user presses `O` to enter overview mode, Reveal expects to show every thumbnail — but Tailwind's rule keeps them hidden, so the overview screen renders blank. The fix: strip the `[hidden]` attribute on `overviewshown` and re-apply Reveal's own visibility logic via `slidechanged`. Reveal's own CSS takes over from there.

**Click-to-advance without surprises.** I wanted a single click anywhere on the slide area to advance, like a clicker. But Reveal's overview mode uses clicks to select a slide, not advance — double-advancing would feel broken. The current handler listens for clicks on the slide area, ignores them when overview mode is active, and ignores clicks that originated on links, buttons, or inputs (so embedded interactive content still works). One click, one advance, no false positives.

## Layout Primitives and Background Modes

The schema and engine are only half the system. The other half is authoring ergonomics — how fast can I go from "blank deck" to "good slide"?

The answer lives in `src/content/slides/_layouts/`: **19 reusable layout primitives** as copy-paste Markdown snippets. Each one has a header explaining when to use it, the HTML structure (Tailwind helpers + Markdown), and a working example. The `_layouts/` directory is excluded from the slides content collection glob, so snippets never leak as deck pages.

The layouts cover the talk archetypes I actually need: `title-hero`, `section-divider`, `two-column-split`, `three-column-cards`, `image-left`, `image-right`, `image-centered`, `image-full-bleed`, `video-left`, `video-right`, `video-centered`, `quote`, `code-with-callout`, `big-stat`, `comparison-table`, `process-steps`, `timeline`, `team-avatars`, and `closing-cta`. Each one is responsive — three-column grids stack vertically below 768px, tables shrink their font-size below 640px, etc.

On top of layouts sit **8 background modes** in `_layouts/backgrounds/`: solid color, gradient (with five preset gradients including "Void Navy" and "Brand"), image-with-text (`slide-bg-overlay--dark/light` for guaranteed contrast), image-fullscreen (pure visual impact, no text), video-with-text, video-fullscreen (muted + looped for cinematic mood), CSS patterns (dots/grid), and iframe backgrounds.

The whole thing is themed through a CSS custom-property layer in `src/styles/slides.css`. Tokens like `--slide-bg`, `--slide-surface`, `--slide-text`, `--slide-accent`, plus Reveal's own `--r-*` variables, redefine themselves when `<html class="dark">` flips. One source of truth — change a token once and every deck, every primitive, every background mode updates instantly.

The kitchen-sink reference is `/slides/demo-revealjs-features` (and `/es/slides/demo-revealjs-features`). It exercises every primitive and every background mode in sequence, so I can spot-check a token change against the entire system in a single deck pass.

## What I'd Do Differently

**Build-time `<section>` parsing.** The current approach (Option A: raw Markdown in textarea, Reveal parses on hydration) works and keeps authoring flexibility high, but the HTML isn't crawlable before JavaScript runs. The AEO twin mitigates this for AI agents, but for human visitors, there's a brief opacity-0 moment before Reveal is ready. A future iteration could parse Markdown to `<section>` elements at build time (Option B), making the HTML fully static and SEO-readable without JS.

**Faceted search on the catalog.** The infinite-scroll catalog handles volume — but it's still chronological. Once the catalog has 50+ decks, filtering by tag, event, or year will be the next paper cut to address. The data model already supports it; the UI is the missing piece.

**Homepage preview.** The homepage has a `TechTalksPostsSection` that surfaces recent blog posts tagged `talks`. A parallel `RecentDecksSection` could surface recent slide decks using the same JSON endpoint that powers the `/slides` infinite scroll. Same data, same card component, just a smaller initial limit.

## Resources

- [Reveal.js v6 release notes](https://github.com/hakimel/reveal.js/releases/tag/6.0.0)
- [Slides feature guide](/docs/features/SLIDES.md) — full authoring documentation
- [Live demo deck](/slides/demo-revealjs-features) — all Reveal.js features, layouts, and background modes in action
- [Slides catalog](/slides) — the dedicated index page with infinite scroll
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) — how collections and Zod schemas work
- [Previous post: The Best Presentation Tools for Developers](/blog/best-presentation-tools-for-developers-2026)
