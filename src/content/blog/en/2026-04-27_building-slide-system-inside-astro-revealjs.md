---
title: "Building a Multilingual Slide System Inside Astro with Reveal.js"
description: "How I built a three-type slide deck catalog inside my Astro website — discriminated unions, AEO twins, asset isolation, and live theme sync."
pubDate: 2026-04-27
tags: [tech, web-development, talks]
series: "slides-as-code"
seriesOrder: 2
heroLayout: none
draft: true
keywords: [astro slides, reveal.js astro integration, slides as content, discriminated union schema, AEO markdown twins, presentation system]
---

In the [previous post](/blog/best-presentation-tools-for-developers-2026), I compared every serious slides-as-code tool and explained why I picked Reveal.js for my website. This post is the technical case study: how I built a three-type slide deck catalog that lives *inside* my Astro site as first-class content, with the same multilingual support, SEO/AEO infrastructure, and theme system as my blog posts.

The full system handles three kinds of decks:

1. **Internal decks** — authored in Markdown, rendered with Reveal.js at build time.
2. **External-embed decks** — third-party slides (Google Slides, Speaker Deck) rendered via `<iframe>`.
3. **External-link decks** — third-party slides that block iframes, rendered as a stub info page with a CTA.

All three types live in one Astro Content Collection, share the same Zod schema (discriminated union), and surface in one catalog section inside the existing `/tech-talks` page.

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

Why one collection instead of three? The catalog component (`SlidesCatalog.astro`) fetches `getSlideDecks(lang)` and renders all types in a single grid. The AEO twin endpoints handle all types in one `getStaticPaths`. Translations apply uniformly. And migrating a deck from one type to another is a one-field frontmatter change — no file moves.

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

This was a non-negotiable: visiting `/`, `/blog`, `/about`, or even `/tech-talks` (the catalog page) must ship **zero Reveal.js bytes**.

Astro's per-route asset graph handles this automatically. Since Reveal CSS is only imported in `SlideLayout.astro`, and `SlideLayout` is only used by internal-deck and external-embed routes, the CSS chunks only appear in those pages' HTML.

I verified this after the build by grepping `dist/` for Reveal chunk references — only the two demo deck pages (EN + ES) reference them. Every other page is clean.

## AEO Twins for Slides

The project has an explicit policy: every HTML page must have a parallel `.md` endpoint serving `text/markdown` for AI agents. This is enforced by `npm run md:check:strict` in the build.

Slides follow this policy via `[slug].md.ts` endpoints:

- **Internal decks**: the twin serves the raw Markdown body verbatim. An AI agent reading `/tech-talks/demo-revealjs-features.md` gets the full slide content as human-readable Markdown.
- **External-link decks**: the twin serves a structured stub with title, description, event metadata, and the external URL.
- **External-embed decks**: same stub plus the embed URL.

This means AI agents can answer "what slides has Sergio published about DevOps?" without rendering JavaScript or parsing HTML.

## The Catalog

The catalog lives inside the existing `/tech-talks` page as an additive section. I inserted it between the Philosophy section and the Speaking-invitation CTA — a natural slot that surfaces past work before asking visitors to invite the speaker.

`SlidesCatalog.astro` fetches all non-draft decks for the current language and renders them in a responsive grid. Each `SlideCard.astro` shows the hero image (or a gradient placeholder), a `TypeBadge` pill ("Built in-house" / "External" / "Embedded"), the title, event metadata, description, and tags.

The section only renders when decks exist (`{decks.length > 0 && ...}`), so the TechTalksPage looks identical before any decks are published.

## What I'd Do Differently

**Build-time `<section>` parsing.** The current approach (Option A: raw Markdown in textarea, Reveal parses on hydration) works and keeps authoring flexibility high, but the HTML isn't crawlable before JavaScript runs. The AEO twin mitigates this for AI agents, but for human visitors, there's a brief opacity-0 moment before Reveal is ready. A future iteration could parse Markdown to `<section>` elements at build time (Option B), making the HTML fully static and SEO-readable without JS.

**Catalog search/filter.** Right now the catalog is a flat grid. Once it grows past 10-15 decks, search chips (by tag, event, year) would help. The data model already supports this — tags and event metadata are in the schema.

**Homepage preview.** The homepage has a `TechTalksPostsSection` that surfaces recent blog posts tagged `talks`. A parallel `RecentDecksSection` could surface recent slide decks. The `SlidesCatalog` component already accepts a `limit` prop for this.

## Resources

- [Reveal.js v6 release notes](https://github.com/hakimel/reveal.js/releases/tag/6.0.0)
- [Slides feature guide](/docs/features/SLIDES.md) — full authoring documentation
- [Live demo deck](/tech-talks/demo-revealjs-features) — all Reveal.js features in action
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) — how collections and Zod schemas work
- [Previous post: The Best Presentation Tools for Developers](/blog/best-presentation-tools-for-developers-2026)
