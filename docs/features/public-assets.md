# Public Assets (`public/`)

This directory contains static assets that are served directly without processing. Files here are copied as-is to the build output.

## Directory Structure

```
public/
├── favicon.svg                    # Site favicon
├── blog-placeholder-*.jpg         # Blog post placeholder images (6 files)
├── fonts/                         # Custom web fonts
│   ├── atkinson-bold.woff
│   └── atkinson-regular.woff
├── icons/                         # Icon assets (with dark mode variants)
│   ├── chevron_down.svg
│   ├── chevron_down_white.svg
│   ├── github.svg
│   ├── github_white.svg
│   ├── instagram.svg
│   ├── instagram_white.svg
│   ├── linkedin.svg
│   ├── linkedin_white.svg
│   ├── x.svg
│   └── x_white.svg
├── images/                        # Site images
│   ├── bicycle.png
│   ├── dailybot.png
│   ├── dailybotyc.png
│   ├── foddie.png
│   ├── ia.png
│   ├── isologo.svg
│   ├── logo_full.svg
│   ├── logo_small_version_white.svg
│   ├── profile.png
│   ├── techtalks.png
│   └── trading.png
└── scripts/                       # Client-side scripts
    └── global.theme.js
```

## Asset Categories

### Favicon

| File | Description |
|------|-------------|
| `favicon.svg` | Site favicon — XergioAleX isologo (same as `images/isologo.svg`) |

Referenced in `BaseHead.astro`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

**Note:** The favicon uses the same isologo as `images/isologo.svg`. Browsers cache favicons aggressively — use a hard refresh (Ctrl+Shift+R) or clear cache to see updates.

### Fonts

Custom Atkinson Hyperlegible fonts for improved readability.

| File | Weight | Usage |
|------|--------|-------|
| `atkinson-regular.woff` | 400 | Body text |
| `atkinson-bold.woff` | 700 | Headings, emphasis |

Preloaded in `BaseHead.astro`:

```html
<link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" crossorigin />
<link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" crossorigin />
```

### Icons

Social media and UI icons with light/dark variants.

**Naming Convention:**

- `{name}.svg` - Dark icon (for light backgrounds)
- `{name}_white.svg` - Light icon (for dark backgrounds)

| Icon Set | Light | Dark |
|----------|-------|------|
| GitHub | `github.svg` | `github_white.svg` |
| LinkedIn | `linkedin.svg` | `linkedin_white.svg` |
| Instagram | `instagram.svg` | `instagram_white.svg` |
| X (Twitter) | `x.svg` | `x_white.svg` |
| Chevron | `chevron_down.svg` | `chevron_down_white.svg` |

**Usage:**

```html
<!-- In dark section (use white icons) -->
<img src="/icons/github_white.svg" alt="GitHub" class="w-7 h-7" />

<!-- In light section (use regular icons) -->
<img src="/icons/github.svg" alt="GitHub" class="w-7 h-7" />
```

### Images

Site images for branding, projects, and sections. See **[Brand Guide](../BRAND_GUIDE.md)** for logo usage rules and color pairing guidelines.

| Image | Purpose |
|-------|---------|
| `logo_full.svg` | Full logo — ninja character + name banner (hero section) |
| `logo_small_version_white.svg` | Compact horizontal logo — ninja face + text (site header) |
| `isologo.svg` | Ninja face icon — compact identity mark (favicon, avatars) |
| `profile.png` | Personal profile photo |
| `dailybot.png` | DailyBot project image |
| `dailybotyc.png` | DailyBot YC image |
| `techtalks.png` | Tech talks section |
| `trading.png` | Trading section |
| `bicycle.png` | Hobbies section |
| `foddie.png` | Foodie section |
| `ia.png` | AI/ML section |

**Usage:**

```html
<img src="/images/profile.png" alt="Profile photo" />
```

### Blog Placeholders

Placeholder images for blog posts without hero images.

| File | Index |
|------|-------|
| `blog-placeholder-1.jpg` | Default |
| `blog-placeholder-2.jpg` | 2 |
| `blog-placeholder-3.jpg` | 3 |
| `blog-placeholder-4.jpg` | 4 |
| `blog-placeholder-5.jpg` | 5 |
| `blog-placeholder-about.jpg` | About page |

**Usage in blog posts:**

```markdown
---
heroImage: '/blog-placeholder-1.jpg'
---
```

### Scripts

Client-side JavaScript that runs before hydration.

| Script | Purpose |
|--------|---------|
| `global.theme.js` | Theme initialization (dark mode) |

**Theme Script:**

Loaded inline in `MainLayout.astro` to prevent flash of wrong theme:

```html
<script is:inline src="/scripts/global.theme.js"></script>
```

The script:
1. Checks `localStorage` for saved theme
2. Falls back to system preference
3. Applies `dark` class to `<html>` if needed

## Adding New Assets

### Adding an Image

1. Add image to appropriate folder:
   ```bash
   cp my-image.png public/images/
   ```

2. Reference in component:
   ```html
   <img src="/images/my-image.png" alt="Description" />
   ```

### Adding an Icon

1. Create both variants:
   ```bash
   cp icon.svg public/icons/
   cp icon_white.svg public/icons/
   ```

2. Use in components:
   ```html
   <img src="/icons/icon_white.svg" alt="Icon" class="w-6 h-6" />
   ```

### Adding a Font

1. Add font files:
   ```bash
   cp newfont.woff public/fonts/
   ```

2. Preload in `BaseHead.astro`:
   ```html
   <link rel="preload" href="/fonts/newfont.woff" as="font" type="font/woff" crossorigin />
   ```

3. Reference in CSS:
   ```css
   @font-face {
     font-family: 'NewFont';
     src: url('/fonts/newfont.woff') format('woff');
   }
   ```

## Best Practices

1. **Optimize images** before adding (compress, resize appropriately)
2. **Use SVG** for icons and logos (scalable, small file size)
3. **Preload critical fonts** to prevent FOUT
4. **Follow naming conventions** for consistency
5. **Keep variants paired** (light/dark icons together)
6. **Don't store sensitive data** - public folder is... public

## URL Mapping

Files in `public/` are served from the root:

| File Location | URL |
|---------------|-----|
| `public/favicon.svg` | `/favicon.svg` |
| `public/images/logo.png` | `/images/logo.png` |
| `public/fonts/font.woff` | `/fonts/font.woff` |

## Related Documentation

- [BaseHead Component](../../src/components/README.md#basehead)
- [Styling Guide](../../src/styles/README.md)
- [Features: Dark Mode](./dark-mode.md)
- [Content Collections](../../src/content/README.md) - Blog images
