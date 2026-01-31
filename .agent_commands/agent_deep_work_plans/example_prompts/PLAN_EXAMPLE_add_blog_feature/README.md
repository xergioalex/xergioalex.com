# Example Plan: Add Related Posts Feature

**Plan ID:** PLAN_add_related_posts
**Type:** Feature Addition (Astro/Svelte)

---

## 1. Goal

Add a "Related Posts" section to individual blog posts that displays 3-5 posts with matching tags, helping readers discover more relevant content.

## 2. Context

**Repository:** Astro personal website
**Tech Stack:** Astro, Svelte, TypeScript, Tailwind CSS
**Current State:** Blog posts display without any related content suggestions

**Files to Modify:**
- `src/components/blog/` - Add new component
- `src/pages/blog/[...slug].astro` - Integrate component
- `src/lib/blog.ts` - Add utility function

## 3. Global Guidelines

1. **Branch:** Work on `dev` branch
2. **Commits:** Small commits after each task
3. **Validation:** Run `npm run biome:check` and `npm run astro:check`
4. **Standards:** Follow docs/STANDARDS.md
5. **Testing:** Manual testing (no automated tests configured yet)

## 4. Task List

- [ ] **Task 1:** Create RelatedPosts component
      See: [1.task_create_component.md](./1.task_create_component.md)

- [ ] **Task 2:** Add getRelatedPosts utility function
      See: [2.task_add_utility.md](./2.task_add_utility.md)

- [ ] **Task 3:** Integrate into blog post page
      See: [3.task_integrate_page.md](./3.task_integrate_page.md)

- [ ] **Task 4:** Update documentation
      See: [4.task_update_docs.md](./4.task_update_docs.md)

## 5. Execution Rules

1. Execute tasks in order (1 → 2 → 3 → 4)
2. Read task file before implementing
3. Run validation after each task
4. Commit after completing each task

## 6. Status

| Task | Description | Status |
|------|-------------|--------|
| 1 | Create RelatedPosts component | ⏳ Pending |
| 2 | Add getRelatedPosts utility | ⏳ Pending |
| 3 | Integrate into blog post page | ⏳ Pending |
| 4 | Update documentation | ⏳ Pending |

**Overall Progress:** 0/4 tasks (0%)

## 7. Quick Reference

**Validation Commands:**
```bash
npm run biome:check
npm run astro:check
npm run build
npm run dev  # Manual testing
```

**Commit Format:**
```bash
feat: add RelatedPosts component
feat: add getRelatedPosts utility function
feat: integrate related posts into blog page
docs: add related posts documentation
```
