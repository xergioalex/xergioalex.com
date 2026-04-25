# Slides Feature — Multi-Type Deck Catalog

## Overview

The slides feature adds a **unified presentation deck catalog** to xergioalex.com, integrated into the existing `/tech-talks` page. Three deck types coexist under a single Astro Content Collection:

| Type | When to Use | Renders As |
|---|---|---|
| `internal` | Author decks in Markdown with Reveal.js | Fullscreen Reveal.js presentation |
| `external-embed` | Third-party deck that supports iframe (Google Slides published, Speaker Deck) | Fullscreen iframe in the same chrome |
| `external-link` | Third-party deck without iframe support (private Drive, Google Docs) | Stub info page with CTA to external URL |

## Schema

The `slides` collection uses a Zod discriminated union defined in `src/content.config.ts`. The `type` field narrows which additional fields are required.

### Base Fields (all types)

```yaml
title: string (max 100)
description: string (130-160 chars)
pubDate: date
updatedDate: date (optional)
heroImage: string (optional)
tags: string[] (max 5, optional)
draft: boolean (default false)
eventName: string (optional)
eventDate: date (optional)
eventUrl: URL (optional)
relatedPost: string (optional, blog slug)
```

### Internal Deck

```yaml
type: internal
theme: dark | light (default: dark)
transition: none | fade | slide | convex | concave | zoom (default: slide)
syntaxHighlight: boolean (default: true)
math: boolean (default: false)
```

### External Link

```yaml
type: external-link
externalUrl: URL (required)
provider: string (optional, e.g. "google-slides")
```

### External Embed

```yaml
type: external-embed
externalUrl: URL (required, canonical link)
embedUrl: URL (required, iframe-friendly URL)
provider: string (optional)
aspectRatio: 16:9 | 4:3 | 1:1 (default: 16:9)
```

## Authoring Internal Decks

### File Location

Place deck files in `src/content/slides/{en,es}/` with date-prefix naming:

```
src/content/slides/en/2026-04-25_my-deck-slug.md
src/content/slides/es/2026-04-25_my-deck-slug.md
```

**Slugs must be English-only** on both language versions.

### Slide Separators

- `---` (three dashes on its own line) — horizontal slide separator
- `--` (two dashes on its own line) — vertical sub-slide separator

### Fragments (Click-to-Reveal)

```markdown
- First point <!-- .element: class="fragment fade-up" -->
- Second point <!-- .element: class="fragment fade-up" -->
```

Fragment animations: `fade-up`, `fade-in`, `fade-out`, `fade-in-then-out`, `grow`, `shrink`, `highlight-red`, `highlight-blue`, `strike`.

### Slide Attributes

```markdown
<!-- .slide: data-background-color="#1a1a2e" -->
<!-- .slide: data-background-image="url" data-background-opacity="0.3" -->
<!-- .slide: data-auto-animate -->
<!-- .slide: data-transition="zoom" -->
```

### Code Highlight with Stepped Reveal

````markdown
```typescript [1-2|4-6|8-10]
// Lines 1-2 highlighted first
// Then 4-6 on next click
// Then 8-10
```
````

### Custom Layouts with Tailwind

Markdown supports inline HTML. Use Tailwind utilities for custom layouts:

```html
<div class="grid grid-cols-2 gap-8">
  <div>Left column content</div>
  <div>Right column content</div>
</div>
```

### Speaker Notes

```markdown
Note: These are speaker notes visible only in speaker view (press S).
```

### Math (KaTeX)

Set `math: true` in frontmatter, then use LaTeX:

```markdown
$$e^{i\pi} + 1 = 0$$
```

## Adding External Decks

### External Embed

1. Publish your deck for embedding (e.g., Google Slides: File > Share > Publish to web > Embed)
2. Copy the embed URL (the `src` from the iframe code)
3. Create the deck file with `type: external-embed`, `externalUrl` (canonical), and `embedUrl` (iframe)

### External Link

1. Get the URL to your deck (any format)
2. Create the deck file with `type: external-link` and `externalUrl`
3. The site renders a stub info page with a CTA button

### Tested Providers

- Google Slides (published embed)
- Speaker Deck
- Pitch

## Theming

Internal decks sync with the site's dark/light mode toggle:

- `SlideLayout.astro` loads both Reveal themes (black + white)
- `RevealDeck.svelte` observes `<html class="dark">` changes via MutationObserver
- Theme switches instantly without page reload

## Performance

- **Asset isolation**: Reveal.js CSS and JS only load on internal deck pages. No Reveal bytes on home, blog, `/tech-talks` index, or any other route.
- **Build-time rendering**: Deck Markdown is embedded in static HTML. Reveal parses it on hydration.
- **Anti-FOUC**: Deck container starts `opacity-0`, fades in after `Reveal:ready` event.
- **Lazy plugin loading**: Highlight and Math plugins loaded only when enabled in frontmatter.
- **`client:only="svelte"`**: RevealDeck uses `client:only` since Reveal needs DOM access.

## AEO Twins

Every deck has a Markdown twin endpoint:

- `/tech-talks/<slug>.md` (EN)
- `/es/tech-talks/<slug>.md` (ES)

Behavior per type:
- **Internal**: serves the raw Markdown body (human and agent readable)
- **External-link**: structured stub with title, description, event metadata, external URL
- **External-embed**: same stub plus embed URL

## i18n Conventions

- Both EN and ES versions required for all deck types
- Title, description, event metadata always translated
- External deck body can include `slides.languageNotice` when original is in a different language
- Slugs English-only (project rule)
- Spanish: tuteo only, full diacritics

## Images

Store deck images in `public/images/slides/<slug>/`:

```
public/images/slides/demo-revealjs-features/hero.webp
```

Use `npm run images:optimize` for WebP conversion.

## Related

- [Blog Posts Guide](./BLOG_POSTS.md) — parallel content surface
- [Architecture Guide](../ARCHITECTURE.md) — Content Collections, layouts
- [I18N Guide](../I18N_GUIDE.md) — multilingual conventions
