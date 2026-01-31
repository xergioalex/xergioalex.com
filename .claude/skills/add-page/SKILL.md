---
name: add-page
description: Create new pages with correct routing and MainLayout usage
tier: 1
intent: create
max-files: 2
max-loc: 100
---

# Skill: Add Page

## Objective

Create new pages in the Astro application with correct file-based routing, MainLayout usage, and SEO properties.

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

### Step 3: Validate

```bash
npm run astro:check
npm run biome:check
npm run build
```

## Output Format

### Success Output

```
## ✅ Page Created

### Page
- Route: `/{route}`
- File: `src/pages/{path}.astro`
- Type: {Static|Dynamic}

### SEO
- Title: {title}
- Description: {description}
- Lang: {lang}

### Layout
- Uses MainLayout ✅
- main-container ✅

### Validation
- Astro check: ✅
- Build: ✅

### Commit Message
feat: add {name} page
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

### Stop Conditions

**Stop and escalate** if:

- Needs new layout component
- Complex data fetching required
- Multiple dynamic segments

## Definition of Done

- [ ] Page file created in correct location
- [ ] MainLayout imported and used
- [ ] SEO props provided
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

**Creates:** `src/pages/projects.astro`
**Route:** `/projects`

### Example 2: Spanish Page

**Input:**
```
$NAME: about
$TITLE: Sobre Mí
$DESCRIPTION: Información sobre mí
$LANG: es
```

**Creates:** `src/pages/es/about.astro`
**Route:** `/es/about`

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
- docs/ARCHITECTURE.md - Routing details
- src/pages/README.md - Page patterns
