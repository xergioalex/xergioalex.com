---
title: 'How I Built a Multilingual Website with Astro'
description: 'Chapter five of building xergioalex.com — the complete story of designing a multilingual architecture from scratch: language configuration as code, a typed translation system with 960+ keys, the Page Wrapper pattern that keeps every page DRY across languages, and an architecture ready to scale to any number of languages with zero component changes.'
pubDate: '2026-03-03'
heroImage: '/images/blog/posts/building-multilingual-website/hero.png'
heroLayout: 'side-by-side'
tags: ['tech', 'portfolio', 'web-development']
series: "building-xergioalex"
seriesOrder: 5
---

In [chapter one](/blog/building-xergioalex-website/), I built the site — Astro, Svelte, Content Collections, the whole architecture from scratch. In [chapter two](/blog/lighthouse-perfect-scores/), I optimized it until every Lighthouse category hit 100. In [chapter three](/blog/measuring-what-matters-free-analytics/), I added a complete analytics stack without losing those scores. In [chapter four](/blog/building-blog-without-backend/), I designed the entire blog system: tags, search, series, and content architecture.

One thread has been woven through every chapter, mentioned often but never given its own story: this site speaks two languages.

Every page, every blog post, every button label, every navigation link — all of it exists in both English and Spanish. Not as an afterthought bolted on at the end, but as a first-class architectural decision that shaped the entire codebase from day one.

Chapter five: how I built the multilingual system, and why the architecture is ready for languages I may never add.

---

## Why Two Languages

Most personal websites are monolingual. And honestly, that makes sense — building a personal site is already a significant investment of time. Why double the work?

For me, the answer was immediate and personal. English is the language of the global tech community. It is the language of documentation, open source, conference talks, and the audience that cares about the same things I care about: building products, scaling teams, and shipping code. If I was going to write about these topics, English was non-negotiable.

But Spanish is the language I grew up with. It is the language of my family, my friends, and the Latin American tech community that has been a part of my career since the beginning — from organizing Pereira Tech Talks to building DailyBot with a team spread across Colombia and beyond. When I think about who I am building for, the answer is not just the English-speaking world. It is also the people I have shared stages with, the developers who attended my talks in Spanish, and the friends who would read my blog if it spoke their language.

So the question was never _whether_ to support both languages. It was _how_ — and how to do it without making the codebase a nightmare to maintain.

---

## Language as Configuration

The foundation of the entire multilingual system is a single TypeScript file: `src/lib/i18n.ts`. It is 160 lines long, and it contains every piece of language configuration the site needs.

The first design decision was choosing a TypeScript union type instead of an enum:

```typescript
// src/lib/i18n.ts
export type Language = 'en' | 'es';
```

Why a union? Because it is lighter, more composable, and extending it is a one-character change. Adding Portuguese in the future is literally:

```typescript
export type Language = 'en' | 'es' | 'pt';
```

TypeScript enforces this at compile time across the entire codebase. Every function that accepts a `Language` parameter will immediately require handling the new value. The compiler becomes the migration checklist.

The second decision was centralizing all language metadata into a single registry:

```typescript
export interface LanguageConfig {
  code: Language;
  name: string;           // English name
  nativeName: string;     // Native name (for language selector)
  dateLocale: string;     // BCP 47 locale for date formatting
  ogLocale: string;       // OpenGraph locale for social sharing
  flag: string;           // Flag emoji for UI
  urlPrefix: string;      // URL path prefix
}

export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dateLocale: 'en-US',
    ogLocale: 'en_US',
    flag: '🇬🇧',
    urlPrefix: '',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dateLocale: 'es-ES',
    ogLocale: 'es_ES',
    flag: '🇪🇸',
    urlPrefix: '/es',
  },
};
```

Eight fields per language. Everything the site needs — date formatting, Open Graph tags, URL routing, the language selector — comes from this one object. No scattered constants across files. No magic strings hidden in templates. One registry, one source of truth.

The URL prefix strategy is worth calling out explicitly. The default language (`en`) gets an empty prefix, which means English URLs are clean: `/about`, `/blog/my-post`, `/contact`. Spanish gets `/es` as a prefix: `/es/about`, `/es/blog/my-post`, `/es/contact`. This is a common pattern for multilingual sites, and Astro's file-based routing makes it natural.

The module also exports 13 utility functions that the rest of the codebase relies on:

```typescript
getUrlPrefix(lang)      // '' or '/es'
getLocalizedUrl(path, lang)   // Combines prefix + path
getAlternateUrls(currentPath) // All language variants of a URL
getLangFromUrl(pathname)       // Detect language from URL
stripLangPrefix(path)          // Remove prefix to get base path
getDateLocale(lang)            // 'en-US' or 'es-ES'
getOGLocale(lang)              // 'en_US' or 'es_ES'
```

Every component uses these functions instead of building URLs or detecting languages manually. If the URL strategy changes, or if a new language is added, only this file changes. Everything downstream adapts automatically.

---

## The Page Wrapper Pattern

Here is the problem with multilingual sites using file-based routing: if you have 12 pages and 2 languages, you need 24 files. With 3 languages, 36 files. Each file contains the full page logic — layout, translations, data fetching, template markup. Change how the About page works, and you update it in 2 places. Or 3. Or 5. This scales poorly and breaks easily.

The solution I built is what I call the **Page Wrapper pattern**. The idea is simple: separate routing from logic.

Routing wrappers live in `src/pages/` and are ultra-thin — three lines of code:

```astro
---
// src/pages/about.astro (English)
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

```astro
---
// src/pages/es/about.astro (Spanish)
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="es" />
```

That is it. The wrapper's only job is to exist at the right URL path and pass the `lang` string literal to the shared component.

The actual page logic lives in `src/components/pages/AboutPage.astro`, and it handles everything:

```astro
---
// src/components/pages/AboutPage.astro
import MainLayout from '@/layouts/MainLayout.astro';
import type { Language } from '@/lib/i18n';
import { getUrlPrefix } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = getTranslations(lang);
const prefix = getUrlPrefix(lang);
---

<MainLayout lang={lang} title={t.aboutPage.title} description={t.aboutPage.description}>
  <h1>{t.aboutPage.title}</h1>
  <p>{t.aboutPage.bioText}</p>
  <a href={`${prefix}/cv`}>{t.aboutPage.ctaCv}</a>
</MainLayout>
```

The shared component imports the layout, gets the translations for the current language, builds localized URLs, and renders the full page. One file, all logic. The wrappers are just routing stubs.

I have 17 shared page components and 23 routing wrappers across both languages. If I add Portuguese tomorrow, I create 11 new wrapper files — each one is three lines. I change zero shared components. The new language works everywhere immediately because the logic is already language-agnostic. It receives `lang`, calls `getTranslations(lang)`, and renders. It does not know or care how many languages exist.

The DRY payoff compounds over time. Every bug fix to a page happens in one file. Every new feature is automatically available in all languages. Every new page requires writing the logic exactly once.

---

## The Translation System

Behind `getTranslations(lang)` is a structured, typed translation system that covers every piece of user-visible text on the site.

The architecture is four files:

```
src/lib/translations/
├── types.ts     # SiteTranslations interface (480 lines)
├── en.ts        # English translations (956 lines)
├── es.ts        # Spanish translations (967 lines)
└── index.ts     # Barrel: getTranslations() function (52 lines)
```

The heart is `types.ts` — a 480-line TypeScript interface that defines the complete shape of all translations:

```typescript
// src/lib/translations/types.ts (simplified)
export interface SiteTranslations {
  siteTitle: string;
  siteTitleFull: string;
  siteDescription: string;

  nav: {
    home: string;
    blog: string;
    about: string;
    contact: string;
    // ... 12 navigation keys
  };

  aboutPage: {
    title: string;
    subtitle: string;
    bioTitle: string;
    bioText: string;
    passions: PagePassion[];
    // ... 12 keys for the About page
  };

  // Dynamic strings — functions that accept parameters
  readingTime: (minutes: number) => string;
  seriesChapter: (n: number) => string;
  resultsFound: (count: number) => string;
  pageOf: (current: number, total: number) => string;

  // ... hundreds more keys covering every page and component
}
```

Each locale file (`en.ts`, `es.ts`) implements this interface. The TypeScript compiler enforces **complete parity**. If I add a new key to `types.ts` and only implement it in `en.ts`, the build fails with a clear error telling me that `es.ts` is missing the key. No key falls through the cracks. No page renders with a missing translation.

One design decision I am particularly pleased with is the use of **functions for dynamic strings**:

```typescript
// en.ts
readingTime: (minutes: number) => `${minutes} min read`,
resultsFound: (count: number) => `${count} results found`,
seriesChapterOf: (current: number, total: number) =>
  `Chapter ${current} of ${total}`,

// es.ts
readingTime: (minutes: number) => `${minutes} min de lectura`,
resultsFound: (count: number) => `${count} resultados encontrados`,
seriesChapterOf: (current: number, total: number) =>
  `Capítulo ${current} de ${total}`,
```

These are not template strings with placeholders that need a separate formatting step. They are regular TypeScript functions. The compiler type-checks the parameters. Autocomplete works. No runtime formatting library needed. The translation _is_ the formatter.

The barrel file is minimal:

```typescript
// src/lib/translations/index.ts
const translations: Record<Language, SiteTranslations> = { en, es };

export function getTranslations(lang: Language): SiteTranslations {
  return translations[lang] || translations.en;
}
```

One function. Full typed access. English fallback if something unexpected happens. In practice, the entire site uses it the same way:

```typescript
const t = getTranslations(lang);
// Then: t.nav.blog, t.aboutPage.title, t.readingTime(5)
```

The system currently holds approximately 960 translation keys organized into structured sections: site metadata, navigation, footer, hero, 11 homepage sections, 10 page-specific sections (About, CV, DailyBot, Entrepreneur, Tech Talks, Portfolio, Trading, Foodie, Hobbies, Contact), search, blog, series navigation, tags, and utility strings.

---

## Blog Content in Two Languages

The blog uses Astro Content Collections with a simple but effective language strategy: **directory-based language separation**.

```
src/content/blog/
├── en/
│   ├── 2026-01-22_building-xergioalex-website.md
│   ├── 2026-02-26_lighthouse-perfect-scores.mdx
│   ├── 2026-02-28_measuring-what-matters-free-analytics.md
│   ├── 2026-03-01_building-blog-without-backend.md
│   └── ... (57 posts total)
└── es/
    ├── 2026-01-22_building-xergioalex-website.md
    ├── 2026-02-26_lighthouse-perfect-scores.mdx
    ├── 2026-02-28_measuring-what-matters-free-analytics.md
    ├── 2026-03-01_building-blog-without-backend.md
    └── ... (57 posts, 1:1 parity with English)
```

The Content Collection loader scans all files in both directories and generates IDs that naturally encode the language:

```
en/2026-03-01_building-blog-without-backend
es/2026-03-01_building-blog-without-backend
```

Extracting the language from a post is a single function:

```typescript
// src/lib/blog.ts
export function getPostLanguage(postId: string): string {
  const parts = postId.split('/');
  return parts.length > 1 ? parts[0] : 'en';
}
```

No database lookup. No runtime detection. No URL parsing. The language is encoded in the file path, and the function just reads it.

The slug extraction strips the language prefix and the date prefix, so both the English and Spanish versions share the same clean URL slug:

```
EN: /blog/building-blog-without-backend/
ES: /es/blog/building-blog-without-backend/
```

There is a mandatory rule: **every post in `en/` must have a corresponding post in `es/`** with the same filename, same date prefix, and the same slug. The `title`, `description`, and body content are translated. The `pubDate`, `heroImage`, `tags`, and code blocks are preserved identically.

Tags are language-agnostic. Both English and Spanish posts reference the same tag identifiers (`tech`, `web-development`, `portfolio`). The display names are localized through the translation system — `t.tagNames['tech']` returns "Tech" in English and the appropriate translation in Spanish. The tag collection (`src/content/tags/`) is a single set of files shared across all languages.

This design means adding a post is always a two-file operation: write the English version, translate it to Spanish. The structure guarantees parity. The build validates the schema. The tags work everywhere without duplication.

---

## The SEO Layer

A multilingual site that search engines cannot understand is a multilingual site that only exists for its author. The SEO layer handles this automatically.

Every page on the site generates hreflang tags through `BaseHead.astro`:

```astro
{alternateUrls.map((alt) => (
  <link rel="alternate" hreflang={alt.lang} href={alt.href} />
))}
<link rel="alternate" hreflang="x-default" href={defaultHref} />
```

These tags tell Google and other search engines: "This page exists in English at this URL, and in Spanish at that URL." The `x-default` tag points to the English version as the fallback for unmatched languages.

The data comes from `getAlternateUrls()`, which strips the language prefix from the current URL and rebuilds it for each supported language:

```typescript
export function getAlternateUrls(currentPath: string): { lang: Language; url: string }[] {
  const basePath = stripLangPrefix(currentPath);
  return getSupportedLanguages().map((lang) => ({
    lang,
    url: getLocalizedUrl(basePath, lang),
  }));
}
```

Open Graph tags are also language-aware. Each page sets `og:locale` to the current language's locale and adds `og:locale:alternate` for every other language. The search system uses language-sharded static endpoints — `/api/posts-en.json` and `/api/posts-es.json` — so the client-side search only loads the relevant language's index. No wasted bandwidth on posts the reader cannot read.

All of this is automatic. Adding a third language does not require touching the SEO layer at all. The functions iterate over `getSupportedLanguages()`, which reads from the same `LANGUAGES` registry. Add a language there, and the hreflang tags, Open Graph locales, and search endpoints adapt.

---

## Why Only English and Spanish

I want to be explicit about this, because the architecture I just described could support five languages, or ten, or twenty. But I chose two. And I chose them for reasons that go beyond technical capability.

English and Spanish are the languages I speak, think, and write in. They are not just languages I can translate into — they are languages I can _hear_. When I read a paragraph in English, I know if it sounds natural or if it reads like it was translated by a machine. When I read a paragraph in Spanish, I notice a missing accent mark, an awkward phrase, a cultural reference that does not quite land.

This matters to me more than coverage.

I know the temptation. Today's AI can translate text into dozens of languages with impressive quality. I could add Portuguese, French, German, Japanese, and have a globally accessible site by next week. The architecture would support it — the code literally does not care. A new language is a config entry, a translation file, and some wrapper files. No component changes.

But publishing in a language I cannot verify feels like giving up control over my own voice. A personal site is _personal_. Every word on it represents me. If someone reads the Portuguese version and finds an awkward phrase, a cultural mismatch, or a sentence that just does not sound right — that is my name on it, and I have no way to catch it.

English is the language of my professional world. Spanish is the language of my roots. These are the audiences I know, the communities I have built in, and the people I am writing for. Two languages, fully audited, fully mine.

The architecture does not judge this decision. It is ready for three languages, or five, or ten, whenever I am. But right now, quality matters more than quantity. And I would rather have two languages done well than five done almost-well.

---

## Adding a New Language: The Scalability Story

Despite choosing to stay with two languages, I want to walk through what it would actually take to add a third. Because the architecture was designed for this, and the proof is in the steps.

Let us say I decide to add Portuguese. Here is the complete process:

**Step 1: Update the language configuration** (`src/lib/i18n.ts`)

```typescript
// Add to the type union
export type Language = 'en' | 'es' | 'pt';

// Add to the LANGUAGES registry
pt: {
  code: 'pt',
  name: 'Portuguese',
  nativeName: 'Português',
  dateLocale: 'pt-BR',
  ogLocale: 'pt_BR',
  flag: '🇧🇷',
  urlPrefix: '/pt',
},
```

**Step 2: Create the translation file** (`src/lib/translations/pt.ts`)

Copy `en.ts` as a template, translate the approximately 960 keys, import it in `index.ts`, and add it to the translations record.

**Step 3: Create page wrappers** (`src/pages/pt/`)

Create 11 files in `src/pages/pt/`. Each one is three lines:

```astro
---
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="pt" />
```

**Step 4: Create blog content directory** (`src/content/blog/pt/`)

Create the directory. Start adding Portuguese versions of blog posts.

**Step 5: Create search endpoint** (`src/pages/api/posts-pt.json.ts`)

One file, 24 lines. Filter the search index by language.

**Step 6: Verify**

```bash
npm run biome:check && npm run astro:check && npm run build
```

That is it. Six steps. Zero changes to any existing component. The About page, the Blog page, the Contact page, the header, the footer, the search — they all work in Portuguese immediately because they already speak "any language." They receive `lang`, call `getTranslations(lang)`, and render.

The hreflang tags automatically include the new language. The language selector shows three options instead of two. The search loads the right index. The blog filters by language. Everything adapts because the language boundary is entirely in the data layer — translations and content — not in the code layer.

This is the compound benefit of the architecture. Every feature I add to the site — a new page, a new blog component, a new search improvement — automatically works in all supported languages. The investment in the multilingual architecture pays dividends on every future feature.

---

## Everything Happens at Build Time

One pattern you might have noticed throughout this chapter: there is no runtime language detection. No cookies storing language preferences. No JavaScript switching the page content based on the browser's `Accept-Language` header.

Every language variant is a separate, pre-rendered HTML file. The English About page is one file. The Spanish About page is another file. They share the same component source, but they produce independent static HTML at build time.

This has three consequences:

1. **Zero JavaScript cost for language.** There is no runtime library loading translations, no hydration penalty, no client-side route resolution. The page loads as static HTML in the correct language.

2. **Perfect SEO.** Each language variant has its own URL, its own canonical tag, and its own hreflang tags. Google sees two distinct, well-structured pages linked by language metadata.

3. **Instant page loads.** There is no flash of the wrong language. No redirect from `/about` to `/es/about` based on detection. If you visit `/es/about`, you get the Spanish page. Immediately. Because it was built that way.

Astro made this natural. Its file-based routing produces one HTML file per route. Its Content Collections validate everything at build time. Its islands architecture means Svelte components only hydrate when they need interactivity — the language logic stays entirely on the server side (which, for a static site, means "at build time").

---

## Reflecting on This Chapter

Every chapter in this series has been about making a decision that costs something now in exchange for a simpler path later. Chapter one: build with Astro's constraints and get performance for free. Chapter two: invest in accessibility and earn a perfect score from every audit tool. Chapter three: choose lightweight analytics and keep the performance you worked for. Chapter four: design the content architecture correctly before the content outgrows the container.

Chapter five: invest in a multilingual architecture from day one, even for a personal site.

The cost was real. Every page component needed to be language-aware from the start. Every piece of text needed to flow through the translation system. Every URL needed a prefix strategy. Every blog post needed a companion in another language.

But the payoff is real too. Today, the site serves 57 blog posts in two languages, across 12 page types, with 960+ translation keys — and the only thing that knows about language is the data. The components, the layouts, the utilities, the search system — they are all language-agnostic. They accept a `lang` parameter and do their job.

The languages you choose for your site reveal who you are building for. I chose English and Spanish because those are my people. The architecture is ready for more, but the decision to add them is a human one, not a technical one. And that is exactly how it should be.

Let's keep building.

---

## Resources

- **[Chapter 1 — Building XergioAleX.com](/blog/building-xergioalex-website/)** — The full architecture story: Astro, Svelte, Content Collections, and the first bilingual decisions.
- **[Chapter 2 — Lighthouse Perfect Scores](/blog/lighthouse-perfect-scores/)** — Accessibility, performance, SEO, and the road to 100/100/100/100.
- **[Chapter 3 — Measuring What Matters](/blog/measuring-what-matters-free-analytics/)** — The free analytics stack: Umami, Cloudflare, search consoles, and zero cookie banners.
- **[Chapter 4 — Architecture of a Scalable Blog](/blog/building-blog-without-backend/)** — Content Collections, tag taxonomy, client-side search, series navigation, and bilingual content.
- **[Astro i18n Recipes](https://docs.astro.build/en/recipes/i18n/)** — Official Astro documentation for internationalization patterns.
- **[xergioalex.com source code](https://github.com/xergioalex/xergioalex.com)** — The full repository where all of the code described in this series lives.
