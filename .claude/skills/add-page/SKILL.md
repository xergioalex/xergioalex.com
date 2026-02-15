---
name: add-page
description: Create new pages with correct routing and MainLayout usage. Use proactively when creating new pages.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: haiku
# === Documentation (ignored by tools, useful for humans) ===
tier: 1
intent: create
max-files: 4
max-loc: 200
---

# Skill: Add Page

## Objective

Create new pages in the Astro application with correct file-based routing, MainLayout usage, and SEO properties. Creates pages in ALL active language routes to maintain multilingual parity. Uses shared page components (`src/components/pages/`) with thin per-language wrappers.

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

### Step 3: Create Shared Page Component and Language Wrappers (MANDATORY)

**MANDATORY:** Every page must use the shared page component pattern and exist in all active languages (see `src/lib/i18n.ts`).

1. **Create the shared component** at `src/components/pages/{Name}Page.astro`:
   - Accept `lang: Language` as a prop
   - Use `getTranslations(lang)` for all text content
   - Use `getUrlPrefix(lang)` for all internal URLs
   - Wrap in `MainLayout` with `lang` prop

2. **Create thin wrappers** for each language:
   - English: `src/pages/{name}.astro` → `<{Name}Page lang="en" />`
   - Spanish: `src/pages/es/{name}.astro` → `<{Name}Page lang="es" />`
   - Each wrapper is ~5 lines (import + render with lang)

3. If the page introduces new UI text, add entries to `src/lib/translations.ts` for ALL active languages.

### Step 4: Validate

```bash
npm run astro:check
npm run biome:check
npm run build
```

## Output Format

### Success Output

```
## ✅ Pages Created (Multilingual)

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

### Multilingual Enforcement

- MUST create a shared page component and wrappers for all active languages (see `src/lib/i18n.ts`).
- If new UI strings are needed, add them to `translations.ts` for all active languages.

### Stop Conditions

**Stop and escalate** if:

- Needs new layout component
- Complex data fetching required
- Multiple dynamic segments
- Translation quality is uncertain for page content

## Definition of Done

- [ ] Shared page component created in `src/components/pages/`
- [ ] Thin wrapper created for each active language (see `src/lib/i18n.ts`)
- [ ] All wrappers use correct `lang` value
- [ ] Shared component uses `MainLayout` with `lang` prop and `getUrlPrefix(lang)` for URLs
- [ ] SEO props provided for all active languages
- [ ] New UI strings added to `translations.ts` for all active languages (if applicable)
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
