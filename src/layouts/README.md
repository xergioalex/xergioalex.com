# Layouts (`src/layouts/`)

This directory contains page layout components that wrap page content with common elements like headers, footers, and meta tags.

## Directory Structure

```
layouts/
└── MainLayout.astro   # Base layout for all pages
```

## MainLayout.astro

The primary layout component used by all pages in the application.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `lang` | `string` | Yes | Language code (`'en'`, `'es'`) |
| `title` | `string` | Yes | Page title (for SEO and browser tab) |
| `description` | `string` | Yes | Page description (for SEO meta tags) |

### Slots

| Slot | Description |
|------|-------------|
| default | Main page content |
| `head` | Additional head elements |

### Structure

```html
<html lang={lang}>
  <head>
    <BaseHead title={title} description={description} />
    <slot name="head" />           <!-- Custom head elements -->
    <script src="/scripts/global.theme.js" />
  </head>
  <body>
    <Header client:load lang={lang} />
    <main>
      <slot />                      <!-- Page content -->
    </main>
    <Footer lang={lang} />
  </body>
</html>
```

### Features

- **SEO:** Uses `BaseHead` for meta tags, Open Graph, and Twitter cards
- **Dark Mode:** Theme script loads before paint to prevent flash
- **Responsive Header:** Svelte Header with mobile menu support
- **i18n Ready:** Passes `lang` prop to components
- **Accessible:** Semantic HTML structure

### Usage

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
---

<MainLayout lang="en" title="Page Title" description="Page description">
  <main class="main-container py-24">
    <h1>Page Content</h1>
    <p>Your content here...</p>
  </main>
</MainLayout>
```

### With Custom Head Elements

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
---

<MainLayout lang="en" title="Page Title" description="Description">
  <link slot="head" rel="stylesheet" href="/custom-styles.css" />
  <script slot="head" src="/custom-script.js" />
  
  <main class="main-container py-24">
    <!-- Content -->
  </main>
</MainLayout>
```

### Component Integration

The layout integrates these components:

| Component | Type | Purpose |
|-----------|------|---------|
| `BaseHead` | Astro | Meta tags, fonts, SEO |
| `Header` | Svelte | Navigation (requires `client:load`) |
| `Footer` | Astro | Site footer |

## Dark Mode Integration

The theme script (`/scripts/global.theme.js`) runs inline before the body renders to:

1. Check `localStorage` for saved theme preference
2. Check system preference via `prefers-color-scheme`
3. Apply `dark` class to `<html>` element
4. Prevent flash of wrong theme

```javascript
// Simplified theme logic
const theme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.classList.toggle('dark', theme === 'dark');
```

## Creating a New Layout

For specialized pages, you can create additional layouts:

```astro
---
// src/layouts/BlogLayout.astro
import MainLayout from './MainLayout.astro';

interface Props {
  lang: string;
  title: string;
  description: string;
  pubDate: Date;
  author?: string;
}

const { lang, title, description, pubDate, author } = Astro.props;
---

<MainLayout lang={lang} title={title} description={description}>
  <article class="main-container py-24">
    <header class="mb-8">
      <h1 class="text-4xl font-bold">{title}</h1>
      <time>{pubDate.toLocaleDateString()}</time>
      {author && <p>By {author}</p>}
    </header>
    <slot />
  </article>
</MainLayout>
```

## Best Practices

1. **Always use MainLayout** for consistency across pages
2. **Pass all required props** - missing props will cause build errors
3. **Use semantic HTML** in page content
4. **Wrap content in appropriate containers** (`main-container`, `py-24`, etc.)
5. **Add custom head elements via slot** rather than duplicating BaseHead logic

## Related Documentation

- [BaseHead Component](../components/README.md#basehead)
- [Header Component](../components/layout/README.md)
- [Footer Component](../components/README.md#footer)
- [Styling Guide](../styles/README.md)
- [i18n Guide](../../docs/I18N_GUIDE.md)
- [Features: Dark Mode](../../docs/features/dark-mode.md)
