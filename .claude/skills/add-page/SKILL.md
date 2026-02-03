---
name: add-page
description: Create new pages with correct routing and MainLayout usage
tier: 1
intent: create
max-files: 4
max-loc: 200
---

# Skill: Add Page

## Objective

Create new pages in the Astro application with correct file-based routing, MainLayout usage, and SEO properties. Creates pages in BOTH English and Spanish routes to maintain bilingual parity.

## Non-Goals

- Does NOT create components (use add-component skill)
- Does NOT create blog posts (use add-blog-post skill)
- Does NOT create API endpoints (separate concern)
- Does NOT modify existing pages

## Tier Classification

**Tier: 1** - Light/Cheap

**Reasoning:** Creating a page follows a clear template, has defined patterns, and is low risk.

## Inputs

### Required Parameters

- `$NAME`: Page name/route (e.g., `projects`, `about/team`)
- `$TITLE`: Page title (for SEO)
- `$DESCRIPTION`: Page description (for SEO)

### Optional Parameters

- `$LANG`: Language code (default: `'en'`)
- `$DYNAMIC`: If true, creates dynamic route with `getStaticPaths`

## Routing Patterns

| File | Route |
|------|-------|
| `pages/about.astro` | `/about` |
| `pages/projects/index.astro` | `/projects` |
| `pages/team/[member].astro` | `/team/{member}` (dynamic) |
| `pages/es/about.astro` | `/es/about` (i18n) |

## Steps

### Step 1: Determine Route Structure

- Simple page → `pages/{name}.astro`
- Section index → `pages/{name}/index.astro`
- Dynamic → `pages/{name}/[param].astro`
- i18n → `pages/{lang}/{name}.astro`

### Step 2: Create Page File

**Static Page Template:**

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';

const lang = 'en';
const title = 'Page Title';
const description = 'Page description for SEO.';
---

<MainLayout lang={lang} title={title} description={description}>
  <main class="main-container py-24">
    <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
      {title}
    </h1>
    
    <div class="prose dark:prose-invert max-w-none">
      <!-- Page content -->
    </div>
  </main>
</MainLayout>
```

**Dynamic Page Template:**

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';

export async function getStaticPaths() {
  // Return array of { params, props }
  const items = await getItems();
  return items.map(item => ({
    params: { slug: item.slug },
    props: { item },
  }));
}

interface Props {
  item: ItemType;
}

const { item } = Astro.props;
const lang = 'en';
---

<MainLayout lang={lang} title={item.title} description={item.description}>
  <main class="main-container py-24">
    <!-- Dynamic content -->
  </main>
</MainLayout>
```

### Step 3: Create Bilingual Counterpart (MANDATORY)

**MANDATORY:** Every page must exist in both languages.

- After creating the English page at `src/pages/{name}.astro`, create the Spanish version at `src/pages/es/{name}.astro`
- The Spanish page must:
  - Set `const lang: Language = 'es';`
  - Use `getTranslations(lang)` for all text content
  - Pass `lang` to `MainLayout` and child components
  - Have the same structure and layout as the English version

- If the page introduces new UI text, add corresponding entries to `src/lib/translations.ts` for BOTH English and Spanish.

### Step 4: Validate

```bash
npm run astro:check
npm run biome:check
npm run build
```

## Output Format

### Success Output

```
## ✅ Pages Created (Bilingual)

### Pages
- English: `src/pages/{path}.astro` -> URL: `/{route}`
- Spanish: `src/pages/es/{path}.astro` -> URL: `/es/{route}`
- Type: {Static|Dynamic}

### SEO
- Title: {title} / {title_es}
- Description: {description} / {description_es}

### Layout
- Uses MainLayout ✅
- main-container ✅

### Validation
- Astro check: ✅
- Build: ✅

### Commit Message
feat: add {name} page (en + es)
```

## Guardrails

### Required Elements

- [ ] Uses `MainLayout` with all props (lang, title, description)
- [ ] Has `main-container` wrapper
- [ ] Has semantic heading (`<h1>`)
- [ ] Dark mode support

### Scope Limits

- **Maximum files:** 2 (page + optional helper)
- **Maximum LOC:** 100

### Bilingual Enforcement

- MUST create both language versions. Never create a page in only one language.
- If new UI strings are needed, add them to `translations.ts` in both languages.

### Stop Conditions

**Stop and escalate** if:

- Needs new layout component
- Complex data fetching required
- Multiple dynamic segments
- Translation quality is uncertain for page content

## Definition of Done

- [ ] English page created in `src/pages/`
- [ ] Spanish page created in `src/pages/es/`
- [ ] Both pages use correct `lang` value (`'en'` or `'es'`)
- [ ] MainLayout imported and used with `lang` prop
- [ ] SEO props provided in both languages
- [ ] New UI strings added to `translations.ts` in both languages (if applicable)
- [ ] `npm run astro:check` passes
- [ ] `npm run build` passes

## Examples

### Example 1: Static Page

**Input:**
```
$NAME: projects
$TITLE: My Projects
$DESCRIPTION: A showcase of my development projects
```

**Creates:**
- `src/pages/projects.astro` -> `/projects`
- `src/pages/es/projects.astro` -> `/es/projects`

### Example 2: Page with Translations

**Input:**
```
$NAME: about
$TITLE: About Me
$DESCRIPTION: Information about me
```

**Creates:**
- `src/pages/about.astro` (English, `lang='en'`)
- `src/pages/es/about.astro` (Spanish, `lang='es'`)

### Example 3: Dynamic Page

**Input:**
```
$NAME: projects/[slug]
$TITLE: (dynamic)
$DESCRIPTION: (dynamic)
$DYNAMIC: true
```

**Creates:** `src/pages/projects/[slug].astro`
**Route:** `/projects/{slug}`

## Related

- [add-component](../add-component/SKILL.md) - Create components
- [add-blog-post](../add-blog-post/SKILL.md) - Create blog posts
- [translate-sync](../translate-sync/SKILL.md) - Synchronize translations
- docs/ARCHITECTURE.md - Routing details
- src/pages/README.md - Page patterns
