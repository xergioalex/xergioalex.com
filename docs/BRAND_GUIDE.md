# Brand & Style Guide

This is the **single source of truth** for the XergioAleX visual identity. All AI agents, designers, and developers should reference this document when making UI, color, typography, or brand decisions.

## Brand Identity

**XergioAleX** is the personal brand of Sergio Alexander Florez Galeano — CTO & Co-founder of DailyBot (YC S21), builder, community founder, and open source contributor.

### The Ninja Coder Concept

The brand is built around a **ninja coder** metaphor — a stylized ninja character that represents:

- **Silent execution** — The best code "just works." Ship, scale, fix — no panic.
- **Constant training** — Always learning across AI, DevOps, full-stack, open source.
- **Versatility** — Robotics, distributed systems, trading, cloud, developer tools, AI.
- **Code as weapon** — Languages, frameworks, architectures — pick the right tool, execute with precision.

### Logo Symbolism

| Element | Meaning |
|---------|---------|
| **Ninja character** | Stylized hooded warrior — esports/gaming mascot style, face hidden, only eyes visible |
| **`<>` on forehead** | Universal code symbol — turns the ninja into a **coder** |
| **Shuriken X's** | The X in "**X**ERGIO ALE**X**" is designed as a shuriken (ninja throwing star) |
| **Banner** | Bold ribbon beneath the character — badge/esports logo feel |

### Logo Designer

**Daniel Vasquez Correa (Koru)** — Graphic designer and illustrator, Colombia.
- [Instagram @koru.studio.co](https://instagram.com/koru.studio.co)
- [Behance](https://behance.net/KoruProject)
- [X @Koruproject](https://x.com/Koruproject)

### Branding Assets Repository

All source files (AI master, SVGs, PNGs): [github.com/xergioalex/personal-branding](https://github.com/xergioalex/personal-branding)

---

## Color Palette

### Primary Colors

| Swatch | Name | Hex | RGB | Tailwind | Usage |
|:------:|------|-----|-----|----------|-------|
| ![#152E45](https://via.placeholder.com/20/152E45/152E45) | **Ninja Navy** | `#152E45` | `21, 46, 69` | — | Main brand color — ninja body, backgrounds, base surfaces |
| ![#E51641](https://via.placeholder.com/20/E51641/E51641) | **Crimson Strike** | `#E51641` | `229, 22, 65` | `text-secondary`, `bg-secondary` | Accent — highlights, energy, interactive elements, CTAs |

### Secondary Colors

| Swatch | Name | Hex | RGB | Tailwind | Usage |
|:------:|------|-----|-----|----------|-------|
| ![#637996](https://via.placeholder.com/20/637996/637996) | **Shadow Steel** | `#637996` | `99, 121, 150` | — | Depth and detail — subtle modeling, secondary text |
| ![#0F1124](https://via.placeholder.com/20/0F1124/0F1124) | **Void Black** | `#0F1124` | `15, 17, 36` | `bg-main` | Deep shadows, dark mode base, site background |
| ![#FFFFFF](https://via.placeholder.com/20/FFFFFF/FFFFFF) | **Pure White** | `#FFFFFF` | `255, 255, 255` | — | Code symbol, eyes, highlights, light mode background |

### Spanish Color Names (for bilingual content)

| English | Spanish |
|---------|---------|
| Ninja Navy | Marino Ninja |
| Crimson Strike | Carmesí Letal |
| Shadow Steel | Acero Sombra |
| Void Black | Negro Vacío |
| Pure White | Blanco Puro |

### Color Relationships

```
Brand hierarchy:

  Ninja Navy (#152E45)     ← Main brand color (logo, identity)
       │
  Void Black (#0F1124)     ← Dark mode base (--color-main in CSS)
       │
  Crimson Strike (#E51641) ← Accent (--color-secondary in CSS)
       │
  Shadow Steel (#637996)   ← Depth, secondary elements
       │
  Pure White (#FFFFFF)      ← Highlights, focal points, light mode base
```

### Color Pairing Rules

| Context | Background | Text | Accent |
|---------|-----------|------|--------|
| **Dark mode** | Void Black `#0F1124` | White `#FFFFFF` | Crimson Strike `#E51641` |
| **Light mode** | White `#FFFFFF` | Ninja Navy `#152E45` or dark grays | Crimson Strike `#E51641` |
| **Hero sections** | Ninja Navy `#152E45` or Void Black | White | Crimson Strike |
| **Cards (dark)** | Gray-800/900 | White/Gray-100 | Crimson Strike |
| **Cards (light)** | White | Gray-900 | Crimson Strike |

### Color Do's and Don'ts

**Do:**
- Use Crimson Strike sparingly as an accent — a little goes a long way
- Pair Ninja Navy with white text for high contrast
- Use Void Black as the dark mode base
- Use Shadow Steel for subtle depth and secondary information

**Don't:**
- Use Crimson Strike as a background for text — it's an accent, not a surface
- Use Ninja Navy on Void Black — too similar, no contrast
- Use Shadow Steel for primary text — too low contrast
- Mix brand colors with off-brand blues or reds

---

## CSS Design Tokens

### Current Implementation

In `src/styles/global.css`, two brand colors are registered as Tailwind theme tokens:

```css
@theme {
  --color-main: #0f1124;      /* Void Black — dark mode base */
  --color-secondary: #e41541; /* Crimson Strike — accent (note: #e41541 ≈ #E51641) */
}
```

### Tailwind Usage

| Token | Tailwind Class | Brand Color |
|-------|---------------|-------------|
| `--color-main` | `bg-main`, `text-main` | Void Black `#0F1124` |
| `--color-secondary` | `bg-secondary`, `text-secondary` | Crimson Strike `#E51641` |

### Using Brand Colors in Components

```html
<!-- Dark branded background -->
<div class="bg-main text-white">

<!-- Accent elements -->
<button class="bg-secondary hover:bg-red-700 text-white">
<a class="text-secondary hover:text-red-700">

<!-- Dark mode pattern with brand accent -->
<div class="bg-white dark:bg-gray-900 border-secondary">
```

### Full Palette Reference (for future token expansion)

If additional brand colors are registered as Tailwind tokens in the future:

| Proposed Token | Hex | Brand Name |
|---------------|-----|-----------|
| `--color-brand-navy` | `#152E45` | Ninja Navy |
| `--color-brand-steel` | `#637996` | Shadow Steel |

---

## Typography

### Font Family

| Font | Weight | Usage | File |
|------|--------|-------|------|
| **Atkinson Hyperlegible** | 400 (Regular) | Body text, paragraphs | `public/fonts/atkinson-regular.woff` |
| **Atkinson Hyperlegible** | 700 (Bold) | Headings, emphasis | `public/fonts/atkinson-bold.woff` |
| System sans-serif | — | Fallback | — |
| Monospace | — | Code blocks, inline code | System default |

Fonts are preloaded in `BaseHead.astro` for performance.

### Heading Scale

| Level | Tailwind | Usage |
|-------|----------|-------|
| h1 | `text-4xl font-extrabold` | Page titles, blog post titles |
| h2 | `text-2xl font-bold` or `text-3xl font-bold` | Section headings |
| h3 | `text-xl font-semibold` | Subsection headings |
| h4 | `text-lg font-semibold` | Card titles, minor headings |

### Text Colors

| Context | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Primary text | `text-gray-900` | `dark:text-gray-100` or `dark:text-white` |
| Secondary text | `text-gray-600` | `dark:text-gray-300` or `dark:text-gray-400` |
| Muted text | `text-gray-500` | `dark:text-gray-500` |
| Links | `text-blue-600` | `dark:text-blue-400` |
| Accent text | `text-secondary` | `text-secondary` (same in both) |

---

## Logo Variants

### Available Variants

| Variant | File | Dimensions | Usage |
|---------|------|-----------|-------|
| **Full Logo** | `public/images/logo_full.svg` | Large | Hero sections, presentations, large displays |
| **Small Version** | `public/images/logo_small_version_white.svg` | 952x168 | Site header, navigation bars, horizontal spaces |
| **Isologo (Ninja Face)** | `public/images/isologo.svg` | 116x165 | Favicon, app icons, avatars, very small contexts |

### Blog Branding Assets

Additional variants in `public/images/blog/branding/`:

| File | Description |
|------|-------------|
| `full_logo_white.png` | Full logo PNG (white, for dark backgrounds) |
| `isologo_white.png` | Isologo PNG (white, for dark backgrounds) |
| `logo_text_white.png` | Wordmark only (white, for dark backgrounds) |
| `social_1.jpg` through `social_5.jpg` | Social media assets and mockups |

### Logo Color Modes

Each variant comes in:
- **White version** — For dark backgrounds (primary usage)
- **Black version** — For light backgrounds (available in branding repo)

### Logo Usage Rules

**Do:**
- Use the full logo on dark backgrounds with adequate clear space
- Use the isologo for small contexts (favicons, avatars)
- Use the small version for navigation headers
- Maintain aspect ratio at all times

**Don't:**
- Stretch or distort the logo
- Use on backgrounds with insufficient contrast
- Pull individual elements out of the logo
- Add effects like drop shadows, gradients, or outlines
- Place the white logo on light backgrounds without a dark container

### Dark Background Containers for Transparent Images

When displaying white/transparent logo images in contexts where the background may be light (e.g., blog posts in light mode), wrap them in a dark container:

```html
<div style="background:#0F1124;border-radius:12px;padding:2rem;text-align:center">

![Logo Alt Text](/images/blog/branding/full_logo_white.png)

</div>
```

---

## Dark Mode Integration

### Theme System

The site uses class-based dark mode (`dark` class on `<html>`). See [Dark Mode Feature](features/dark-mode.md) for full implementation details.

### Brand Colors in Dark Mode

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Page background | White | `bg-main` (`#0F1124` Void Black) |
| Primary text | `text-gray-900` | `text-white` / `text-gray-100` |
| Accent | `text-secondary` / `bg-secondary` | Same (Crimson Strike works on both) |
| Cards | `bg-white` | `bg-gray-800` / `bg-gray-900` |
| Borders | `border-gray-200` | `border-gray-700` |
| Links | `text-blue-600` | `text-blue-400` |

### Icon Variants

Icons follow a dual-variant system for theme support:

```
public/icons/
├── github.svg          # Dark icon (for light backgrounds)
├── github_white.svg    # Light icon (for dark backgrounds)
```

See [Public Assets](features/public-assets.md) for the complete icon inventory.

---

## Brand Voice (for Content)

### Writing Tone

The XergioAleX brand voice is **personal-professional**: authentic, conversational, and grounded in real experience. See the [`content-writer` agent](../.claude/agents/content-writer.md) for comprehensive voice guidelines.

**Quick reference:**

| Do | Don't |
|----|-------|
| "I spent years building products" | "The journey of product development" |
| "Let me walk you through" | "The following section details" |
| "I'm really happy with how it turned out" | "The results exceeded all expectations" |
| Share real details, tools, names | Use generic platitudes |

### Article Structure Convention

1. Personal opening hook (2-3 paragraphs)
2. Context / Why this matters
3. Core content (3-6 sections with visuals)
4. Brief, forward-looking closing ("Let's keep building.")
5. Resources section with relevant links

---

## Quick Reference for AI Agents

When working on UI components, styling, or content:

### Colors to Use

```
Primary accent:     #E51641 (Crimson Strike) → bg-secondary, text-secondary
Dark background:    #0F1124 (Void Black)     → bg-main
Brand navy:         #152E45 (Ninja Navy)     → for brand-heavy contexts
Depth/secondary:    #637996 (Shadow Steel)   → subtle details
```

### Always Remember

- Every UI element needs both light and dark mode styles (`dark:` prefix)
- Crimson Strike (`#E51641`) is the accent — use for CTAs, highlights, interactive elements
- Void Black (`#0F1124`) is the dark mode base — don't confuse with Ninja Navy
- Content must exist in both English and Spanish
- The brand voice is personal, not corporate

### Checklist for New UI Work

- [ ] Uses brand accent color for interactive elements (`bg-secondary` / `text-secondary`)
- [ ] Supports dark mode with appropriate `dark:` variants
- [ ] Text has sufficient contrast in both modes
- [ ] Transparent/white images wrapped in dark containers when needed
- [ ] Font hierarchy follows the established heading scale
- [ ] Icons use the dual-variant system (regular + `_white` suffix)

---

## Related Documentation

- [Product Spec](PRODUCT_SPEC.md) — Brand positioning and messaging
- [Standards](STANDARDS.md) — Coding conventions including styling
- [Dark Mode](features/dark-mode.md) — Theme implementation details
- [Public Assets](features/public-assets.md) — Static asset inventory
- [Styling Guide](../src/styles/README.md) — CSS and Tailwind technical reference
- [Content Writer Agent](../.claude/agents/content-writer.md) — Brand voice guidelines for articles
- [Branding Blog Post (EN)](../src/content/blog/en/personal-branding-xergioalex.md) — Full brand story
- [Branding Assets Repo](https://github.com/xergioalex/personal-branding) — Source design files
