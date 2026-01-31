# Internationalization Guide

Guide for implementing and maintaining multilingual support in XergioAleX.com.

## Current Implementation

The site currently supports two languages:

| Language | Code | Route | Status |
|----------|------|-------|--------|
| English | `en` | `/` | Default |
| Spanish | `es` | `/es/` | Secondary |

## Route Structure

Languages are implemented via route-based i18n:

```
src/pages/
├── index.astro          # English homepage
├── about.astro          # English about
├── contact.astro        # English contact
├── blog/                # English blog
│   └── ...
└── es/
    └── index.astro      # Spanish homepage
    # (Add more Spanish pages as needed)
```

## Implementation Pattern

### 1. Language Prop

Components receive a `lang` prop to determine content language:

```astro
---
// src/pages/index.astro (English)
import MainLayout from '@/layouts/MainLayout.astro';
import HeroSection from '@/components/home/HeroSection/HeroSection.astro';
---

<MainLayout lang="en" title="Home" description="Welcome to my website">
  <HeroSection lang="en" />
</MainLayout>
```

```astro
---
// src/pages/es/index.astro (Spanish)
import MainLayout from '@/layouts/MainLayout.astro';
import HeroSection from '@/components/home/HeroSection/HeroSection.astro';
---

<MainLayout lang="es" title="Inicio" description="Bienvenido a mi sitio web">
  <HeroSection lang="es" />
</MainLayout>
```

### 2. HTML Lang Attribute

The `MainLayout` sets the correct `lang` attribute:

```astro
---
// src/layouts/MainLayout.astro
interface Props {
  lang: string;
  title: string;
  description: string;
}

const { lang, title, description } = Astro.props;
---

<html lang={lang}>
  <!-- ... -->
</html>
```

### 3. Component Translation

Components can use the `lang` prop to display appropriate content:

```astro
---
// src/components/home/HeroSection/HeroSection.astro
interface Props {
  lang: string;
}

const { lang } = Astro.props;

const content = {
  en: {
    greeting: "Hello, I'm",
    name: "Sergio Alexander",
    role: "Software Engineer"
  },
  es: {
    greeting: "Hola, soy",
    name: "Sergio Alexander",
    role: "Ingeniero de Software"
  }
};

const t = content[lang] || content.en;
---

<section>
  <h1>{t.greeting} {t.name}</h1>
  <p>{t.role}</p>
</section>
```

## Language Switcher

The header includes a language switcher dropdown:

```svelte
<!-- In Header.svelte -->
<script lang="ts">
  interface Props {
    lang: string;
  }
  
  let { lang }: Props = $props();
  
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸', href: '/' },
    { code: 'es', label: 'Español', flag: '🇪🇸', href: '/es/' },
  ];
</script>

<select onchange={(e) => window.location.href = e.target.value}>
  {#each languages as language}
    <option value={language.href} selected={lang === language.code}>
      {language.flag} {language.label}
    </option>
  {/each}
</select>
```

## Adding a New Language

### Step 1: Create Language Routes

Create a new folder under `src/pages/`:

```
src/pages/
└── fr/                  # French
    └── index.astro
```

### Step 2: Create Page Files

```astro
---
// src/pages/fr/index.astro
import MainLayout from '@/layouts/MainLayout.astro';
import HeroSection from '@/components/home/HeroSection/HeroSection.astro';
---

<MainLayout lang="fr" title="Accueil" description="Bienvenue sur mon site">
  <HeroSection lang="fr" />
</MainLayout>
```

### Step 3: Update Component Translations

Add translations to components that need them:

```typescript
const content = {
  en: { greeting: "Hello" },
  es: { greeting: "Hola" },
  fr: { greeting: "Bonjour" },  // Add French
};
```

### Step 4: Update Language Switcher

Add the new language to the switcher:

```typescript
const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸', href: '/' },
  { code: 'es', label: 'Español', flag: '🇪🇸', href: '/es/' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', href: '/fr/' },
];
```

## Translation Management

### Current Approach

Translations are inline in components. For small sites, this is manageable.

### Future Consideration: Translation Files

For larger translation needs, consider extracting to files:

```
src/
└── i18n/
    ├── en.json
    ├── es.json
    └── fr.json
```

```json
// src/i18n/en.json
{
  "hero": {
    "greeting": "Hello, I'm",
    "role": "Software Engineer"
  },
  "nav": {
    "home": "Home",
    "blog": "Blog",
    "about": "About"
  }
}
```

### Translation Utility

```typescript
// src/lib/i18n.ts
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';

const translations = { en, es };

export function t(lang: string, key: string): string {
  const keys = key.split('.');
  let value = translations[lang] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
```

Usage:

```astro
---
import { t } from '@/lib/i18n';

const { lang } = Astro.props;
---

<h1>{t(lang, 'hero.greeting')}</h1>
```

## Blog Content i18n

### Current Approach

Blog posts are in English only. Content Collections could support multiple languages:

```
src/content/blog/
├── en/
│   └── my-post.md
└── es/
    └── my-post.md
```

### Future Consideration

If multilingual blog is needed, update the Content Collection schema:

```typescript
// src/content.config.ts
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(['en', 'es']).default('en'),  // Add language field
  }),
});
```

Then filter by language:

```typescript
const posts = await getCollection('blog', ({ data }) => data.lang === lang);
```

## SEO Considerations

### Hreflang Tags

For multilingual SEO, add hreflang tags:

```astro
---
// src/components/BaseHead.astro
const { lang } = Astro.props;
const currentUrl = Astro.url.pathname;
---

<link rel="alternate" hreflang="en" href={`https://xergioalex.com${currentUrl.replace('/es/', '/')}`} />
<link rel="alternate" hreflang="es" href={`https://xergioalex.com/es${currentUrl.replace('/es/', '/')}`} />
<link rel="alternate" hreflang="x-default" href={`https://xergioalex.com${currentUrl.replace('/es/', '/')}`} />
```

### Meta Tags

Set language-specific meta:

```astro
<meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
```

## Best Practices

### Do

- ✅ Pass `lang` prop to all components that need translation
- ✅ Use consistent translation keys
- ✅ Include hreflang for SEO
- ✅ Test with both languages

### Don't

- ❌ Hardcode text that should be translated
- ❌ Forget to update language switcher when adding languages
- ❌ Mix languages in the same component

## Testing Translations

When adding or modifying translations:

1. **Build and preview**: `npm run build && npm run astro:preview`
2. **Check both languages**: Navigate to `/` and `/es/`
3. **Verify language switcher**: Ensure it works correctly
4. **Check HTML lang**: Inspect that `<html lang="">` is correct

## Resources

- [Astro i18n Recipes](https://docs.astro.build/en/recipes/i18n/)
- [W3C Internationalization](https://www.w3.org/International/)
- [Google Hreflang Guide](https://developers.google.com/search/docs/specialty/international/localized-versions)
