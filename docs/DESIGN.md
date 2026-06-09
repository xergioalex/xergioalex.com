# DESIGN.md — XergioAleX.com design system

> Design-system context for AI coding agents. When generating or editing UI in
> this repo, follow this file. Prefer the named tokens below over ad-hoc values.
> Tokens are reasoned from the **real** sources: `src/styles/global.css`
> (`@theme` block), `docs/BRAND_GUIDE.md`, and the accessibility rules in
> `AGENTS.md` / `docs/ACCESSIBILITY.md`. Where a value is inferred or where the
> brand guide and the implemented CSS disagree, it is **flagged** inline.

## Overview

XergioAleX.com is the personal site and blog of Sergio Alexander Florez Galeano,
built around a **"ninja coder"** identity: silent, precise, versatile. The visual
tone is **dark-first, high-contrast, and restrained** — a deep navy/black canvas,
generous whitespace, hyperlegible body type, and a single crimson accent used
sparingly for energy and interaction. The personality is personal-professional,
not corporate: confident and clean, never loud. Accent color is a seasoning, not a
surface.

## Colors

Brand palette (from `BRAND_GUIDE.md`) mapped to the **implemented** Tailwind theme
tokens in `src/styles/global.css`. Only three colors are registered as `@theme`
tokens today (`--color-main`, `--color-secondary`, `--color-gray-50`); the rest of
the surface/text scale comes from Tailwind's default gray ramp.

| Token | Value (light) | Value (dark) | Role / usage |
|-------|---------------|--------------|--------------|
| `bg-main` (`--color-main`) | `#0F1124` | `#0F1124` | "Void Black" — dark-mode page base, hero/branded backgrounds |
| `text-secondary` / `bg-secondary` (`--color-secondary`) | `#D81540` ⚠️ | `#CD3553` | "Crimson Strike" accent — links, CTAs, focus ring, interactive emphasis. Theme-aware: softer in dark mode |
| `bg-gray-50` (`--color-gray-50`) | `#F1F5F9` | — | Elevated light surface (cards/sections on white) |
| Page bg (light) | `#FFFFFF` | `#0F1124` | Default page background |
| Primary text | `text-gray-900` `#111827` | `dark:text-gray-100` / `dark:text-white` | Body & headings |
| Secondary text | `text-gray-600` `#4B5563` | `dark:text-gray-300` `#D1D5DB` | The **only** approved muted pairing (WCAG AA) |
| Brand navy (not a token) | `#152E45` | — | "Ninja Navy" — brand-heavy contexts, logo; **not** registered in CSS |
| Shadow steel (not a token) | `#637996` | — | Depth/detail only — **never** body text (too low contrast) |

⚠️ **Flagged divergence:** `BRAND_GUIDE.md` documents the light accent as `#E51641`/
`#E41541`, but `global.css` actually ships `#D81540`. The implemented value wins
here; confirm which is intended and reconcile the brand guide if needed.

**Accent contrast:** white text on `bg-secondary` (`#D81540`) is ~4.5:1 — meets AA
for normal text, but verify when used at small sizes. Use the accent for
interactive/emphasis elements, **never as a background behind long-form text**.

## Typography

Single brand typeface: **Atkinson Hyperlegible** (chosen for legibility), loaded as
`@font-face` with `font-display: swap` and preloaded in `BaseHead.astro`.

| Level | Family | Size / weight | Used for |
|-------|--------|---------------|----------|
| Display / h1 | Atkinson | `text-4xl font-extrabold` | Page & post titles |
| Heading / h2 | Atkinson | `text-2xl`–`text-3xl font-bold` | Section headings |
| Subheading / h3 | Atkinson | `text-xl font-semibold` | Subsections |
| Minor / h4 | Atkinson | `text-lg font-semibold` | Card titles |
| Body | Atkinson (400) | base / `text-sm` for captions | Paragraphs |
| Mono | system monospace | — | Code blocks & inline code |

Fallback: system sans-serif. Long-form blog content renders inside Tailwind
Typography (`.prose`).

## Layout & spacing

- **Spacing scale:** Tailwind default (4px base; `0.25rem` steps). *Inferred* — no
  custom spacing in `@theme`.
- **Container:** `.main-container` = `max-w-7xl mx-auto py-4 px-4 md:px-8` (1280px
  max, 16px gutters → 32px on `md+`).
- **Whitespace principle:** generous vertical rhythm; let the dark canvas breathe.
  Sections commonly use `py-12`.

## Elevation & depth

Mostly **flat**. Depth is expressed through surface color shifts rather than heavy
shadows: light mode lifts surfaces with `bg-gray-50`/`bg-white`; dark mode uses
`bg-gray-800`/`bg-gray-900` cards over the `#0F1124` base, with
`border-gray-200` (light) / `border-gray-700` (dark) hairlines.

## Shapes

- Rounded corners; cards/containers commonly `rounded-xl` (~12px, matching the
  brand guide's `border-radius:12px` example). *Partly inferred from examples.*
- Borders are thin hairlines (`border-gray-200` / `dark:border-gray-700`).
- **Focus ring (global, in `global.css`):** `focus-visible:ring-2 ring-secondary
  ring-offset-2` with `ring-offset-white dark:ring-offset-gray-900` on all
  interactive elements — keep it.

## Components

Described in terms of the tokens above:

- **Button (primary):** `bg-secondary text-white` + `hover:bg-red-700`, rounded;
  focus uses the global crimson ring. Accent on white meets AA.
- **Link:** `text-secondary hover:text-red-700`; underline/emphasis on hover.
  (Brand guide also references `text-blue-600 dark:text-blue-400` for some links —
  prefer the crimson accent for brand consistency.)
- **Card / surface:** `bg-white dark:bg-gray-900` (or `gray-800`), hairline border,
  `rounded-xl`; titles `text-lg font-semibold`, body `text-gray-600
  dark:text-gray-300`.
- **Nav / header:** dark-friendly; uses the disclosure pattern for dropdowns
  (**not** `role="menu"` — see Do's & Don'ts).
- **Figure caption:** `text-sm text-center text-gray-600 dark:text-gray-300 mt-3`.

## Responsive behavior

Tailwind default breakpoints (*inferred — no custom `screens`*):

| Breakpoint | Min width | Notes |
|------------|-----------|-------|
| sm | 640px | |
| md | 768px | Container gutters widen to `px-8`; wide blog tables get horizontal scroll |
| lg | 1024px | |
| xl | 1280px | Matches `max-w-7xl` container ceiling |

Respect `prefers-reduced-motion` (handled globally in `global.css`). Mobile wide
tables use `.table-responsive` for horizontal scroll.

## Do's and Don'ts

**Do:**
- Use the named tokens (`bg-main`, `text-secondary`/`bg-secondary`, `bg-gray-50`)
  and Tailwind's gray ramp; theme every element for **both** light and dark (`dark:`).
- Keep text contrast at **WCAG AA** (4.5:1 normal, 3:1 large).
- Use `text-gray-600 dark:text-gray-300` for secondary text.
- Use the accent sparingly — interactive elements and emphasis only.
- Pair white text with `bg-main` / `bg-secondary`; wrap white/transparent logos in
  a `#0F1124` container on light backgrounds.

**Don't:**
- ❌ Use `text-gray-400`, `text-gray-500`, `dark:text-gray-400`, or
  `dark:text-gray-500` for body text — **fails WCAG AA** (this overrides the older
  "muted text" rows in `BRAND_GUIDE.md`, which are non-compliant).
- ❌ Use Crimson Strike as a background behind long-form text.
- ❌ Put Ninja Navy on Void Black (too similar) or use Shadow Steel for primary text.
- ❌ Hardcode red hex values — use `*-secondary` so theme-awareness holds.
- ❌ Use `role="menu"` for nav dropdowns (use the disclosure pattern).
- ❌ Ship `<img>` without `width`/`height`, or skip heading levels.

## Agent prompt guide

**For coding agents working in this repo:** this `DESIGN.md` is the source of truth
for UI. Before generating or editing any UI:

1. **Use the named tokens** above (`bg-main`, `text-secondary`/`bg-secondary`,
   `bg-gray-50`, Tailwind gray ramp) — no ad-hoc hex or new fonts.
2. **Respect roles** — pick a color by role (`bg-secondary` for primary actions),
   not by eyeballing a hex; the accent is theme-aware via `--color-secondary`.
3. **Keep accessibility** — meet the WCAG AA targets in Do's & Don'ts; never use
   `text-gray-400/500` (or their `dark:` forms) for body text.
4. **Match component patterns** — reuse the Button/Link/Card/Nav patterns and the
   global crimson focus ring.
5. **Theme both modes** — every element needs light + `dark:` styles.
6. **When something isn't covered**, choose the option most consistent with these
   tokens and note the gap rather than inventing an unrelated style.

> Suggested instruction to paste into an agent prompt:
> "Follow `DESIGN.md` strictly. Build the UI using its tokens, roles, and component
>  patterns; theme light + dark; keep text contrast at WCAG AA."

---

**Sources:** `src/styles/global.css` (`@theme` tokens), `docs/BRAND_GUIDE.md`
(palette/typography/voice), `docs/ACCESSIBILITY.md` + `AGENTS.md` (contrast rules).
Related: [Brand Guide](BRAND_GUIDE.md) · [Accessibility](ACCESSIBILITY.md) ·
[Standards](STANDARDS.md) · [Styling Guide](../src/styles/README.md).
