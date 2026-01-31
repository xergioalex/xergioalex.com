---
name: update-styles
description: Update Tailwind styles with dark mode support
tier: 1
intent: fix
max-files: 5
max-loc: 100
---

# Skill: Update Styles

## Objective

Update Tailwind CSS styles in components or global CSS with proper dark mode support. This skill handles styling-only changes without modifying component logic.

## Non-Goals

- Does NOT modify component logic
- Does NOT add new features
- Does NOT create new components
- Does NOT change layout structure

## Tier Classification

**Tier: 1** - Light/Cheap

**Reasoning:** Styling changes are visual-only, follow clear Tailwind patterns, and have low risk. Easy to validate visually.

## Inputs

### Required Parameters

- `$TARGET`: File(s) to update (component or global.css)
- `$CHANGES`: What styling changes are needed

### Optional Parameters

- `$DARK_MODE`: Ensure dark mode support (default: true)

## Key Concepts

### Tailwind Utility Classes

```html
<!-- Spacing -->
<div class="p-4 m-2 px-6 py-3">

<!-- Colors -->
<div class="bg-white text-gray-900">

<!-- Typography -->
<p class="text-lg font-bold text-center">

<!-- Flexbox/Grid -->
<div class="flex items-center justify-between gap-4">
<div class="grid grid-cols-3 gap-6">

<!-- Responsive -->
<div class="text-sm md:text-base lg:text-lg">
```

### Dark Mode Pattern

**Always pair light and dark:**

```html
<!-- Background -->
<div class="bg-white dark:bg-gray-900">

<!-- Text -->
<p class="text-gray-900 dark:text-gray-100">

<!-- Borders -->
<div class="border-gray-200 dark:border-gray-700">

<!-- Hover states -->
<button class="hover:bg-gray-100 dark:hover:bg-gray-800">
```

### Theme Colors

From `src/styles/global.css`:

```css
@theme {
  --color-main: #0f1124;
  --color-secondary: #e41541;
}
```

Usage:
```html
<div class="bg-main text-white">
<span class="text-secondary">
```

## Steps

### Step 1: Identify Target

- Read the target file(s)
- Understand current styling
- Note what needs to change

### Step 2: Apply Changes

- Use Tailwind utilities (not custom CSS when possible)
- Add `dark:` variants for all color-related classes
- Maintain responsive design (`sm:`, `md:`, `lg:`)
- Keep existing structure

### Step 3: Validate

```bash
npm run biome:check
npm run dev  # Visual inspection
```

## Output Format

### Success Output

```
## ✅ Styles Updated

### Target
{What was styled}

### Changes
- `{file}`: {what changed}

### Dark Mode
- Light mode: ✅
- Dark mode: ✅

### Validation
- Biome: ✅
- Visual check: ✅

### Commit Message
style: {description}
```

## Guardrails

### Required Patterns

- [ ] Dark mode classes included
- [ ] Responsive if needed
- [ ] Consistent with existing styles
- [ ] Uses Tailwind utilities

### Scope Limits

- **Maximum files:** 5
- **Maximum LOC:** 100 (styling changes)

### Stop Conditions

**Stop and escalate** if:

- Requires new custom CSS classes
- Layout restructuring needed
- Component logic changes required

## Definition of Done

- [ ] Styling changes applied
- [ ] Dark mode supported
- [ ] Looks correct in both themes
- [ ] `npm run biome:check` passes

## Common Patterns

### Card Component

```html
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 
            hover:shadow-lg transition-shadow">
  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
  <p class="text-gray-600 dark:text-gray-300">
</div>
```

### Button

```html
<button class="px-4 py-2 rounded-lg font-medium
               bg-blue-500 hover:bg-blue-600 text-white
               dark:bg-blue-600 dark:hover:bg-blue-700
               transition-colors">
```

### Link

```html
<a class="text-blue-600 hover:text-blue-800 
          dark:text-blue-400 dark:hover:text-blue-300
          underline transition-colors">
```

### Input

```html
<input class="w-full px-4 py-2 rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-blue-500 focus:outline-none">
```

## Examples

### Example 1: Add Dark Mode to Component

**Input:**
```
$TARGET: src/components/Footer.astro
$CHANGES: Add dark mode support to footer text
```

**Before:**
```html
<footer class="bg-gray-100 text-gray-600">
```

**After:**
```html
<footer class="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
```

### Example 2: Update Global Container

**Input:**
```
$TARGET: src/styles/global.css
$CHANGES: Add new utility class for cards
```

**Add to global.css:**
```css
@layer components {
  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
  }
}
```

## Related

- [quick-fix](../quick-fix/SKILL.md) - Small fixes
- [add-component](../add-component/SKILL.md) - Create components
- src/styles/README.md - Styling guide
- tailwind.config.mjs - Tailwind configuration
