---
title: "Migrating to Astro 7: The Rust Compiler Came for My Markdown"
description: "How I migrated XergioAleX.com to Astro 7 and Sätteri, the new Rust Markdown compiler — what broke, why my rehype plugins had to move, and the proof it works."
pubDate: "2026-06-27"
heroLayout: "none"
tags: ["tech", "web-development", "javascript", "astro"]
keywords: ["Astro 7 migration guide", "Satteri markdown compiler Astro", "Astro 7 Rust markdown MDX", "port rehype plugins to Satteri hastPlugins", "Astro 7 Vite 8 Rolldown", "upgrade Astro 6 to 7", "Astro markdown processor satteri", "defineHastPlugin example"]
series: "building-xergioalex"
seriesOrder: 10
---

Last time, [I flipped on an experimental Rust compiler](/blog/migrating-to-astro-6/) and watched my dev server go from eleven seconds to under three. It felt like cheating. The catch was right there in the name: *experimental*. You opted in, you installed an extra package, you set a flag, and you accepted that the stricter compiler might escape a `<style>` tag straight into production — which, for the record, it did to me.

[Astro 7](https://astro.build/blog/astro-7/) closes that loop, and then opens a new one. The Rust `.astro` compiler I was treating as a fun experiment is now the **default and only** compiler — the flag is gone because there's nothing left to toggle. And Astro took the same idea — *rewrite the slow part in Rust* — and pointed it at Markdown. That's the headline: a new Markdown and MDX compiler called **Sätteri**.

This site runs it now. Here's how the migration went, what broke, and why "it feels faster" was, once again, not the whole story.

---

## The Strategy: Minors First, Major Second

Same playbook as the Astro 6 jump. Before touching the major, I ran every minor and patch bump first — Biome, Vitest, Svelte, sharp, Playwright, Tailwind, the rest. The reasoning hasn't changed: isolate the variables. If something breaks after the major upgrade, I want to *know* it was the major upgrade, not a patch release that quietly shipped a regression three days earlier.

All pinned to exact versions — no carets, no surprises. Green tests, clean build, and the ground was clear for the real jump.

---

## The Actual Migration

The version bumps that mattered:

| Package | Before | After |
|---------|--------|-------|
| astro | 6.3.1 | 7.0.3 |
| @astrojs/mdx | 5.0.4 | 7.0.0 |
| @astrojs/svelte | 8.1.0 | 9.0.0 |
| @astrojs/markdown-satteri | — | 0.3.2 |
| @astrojs/compiler-rs | 0.2.0 | *removed* |
| rehype-external-links | 3.0.0 | *removed* |

Two of those are deletions, and that's the interesting part. `@astrojs/compiler-rs` — the package I had to install by hand in the Astro 6 post to get the experimental Rust compiler — is gone. Astro 7 bundles its compiler; there's no separate package and no flag. So the first thing the migration did was let me delete code:

```diff
-  experimental: {
-    rustCompiler: true,
-  },
```

The thing I was proud of enabling six months ago is now just... how Astro works. That's the right kind of obsolete.

`rehype-external-links` is the other deletion, and that one wasn't free. To explain why, I have to talk about Sätteri.

---

## The New Thing: Sätteri, a Rust Markdown Compiler

In Astro 7, [Sätteri](https://satteri.bruits.org/docs/plugins/) is the **default and only** processor for Markdown and MDX. It's written in Rust — `pulldown-cmark` for the CommonMark parsing, `Oxc` for MDX expressions — and it's the work of Astro core-team member Erika.

The pitch is the obvious one once you've seen the `.astro` compiler get the Rust treatment: Markdown parsing was happening in JavaScript, on top of the `unified`/remark/rehype ecosystem, and for a content-heavy site that adds up. Astro reports that switching their own docs build (and Cloudflare's) to Sätteri shaved more than a minute off build times, and that Markdown-heavy sites are the biggest winners. Stack that on top of [Vite 8 and its new Rolldown bundler](https://astro.build/blog/astro-7/) — Astro's benchmarks put builds 15–61% faster overall — and the whole pipeline got quicker, not just one layer.

For a blog that is, fundamentally, a pile of Markdown, that's the most relevant sentence in the entire release.

But "we rewrote the Markdown pipeline in Rust" has a consequence, and it's the consequence that ate my afternoon.

---

## What Broke: My Rehype Plugins

Sätteri does not run remark and rehype plugins.

That sounds worse than it is, but you have to sit with it for a second. The entire `unified` plugin ecosystem — every `remark-*` and `rehype-*` package — assumes a JavaScript syntax tree that plugins walk and mutate. Sätteri parses in Rust. It can't just hand a Go-style `unified` tree to your old plugins. So it ships its *own* plugin API: `mdastPlugins` and `hastPlugins`, registered through `defineHastPlugin` / `defineMdastPlugin`.

I had two rehype plugins in my config:

```js
markdown: {
  rehypePlugins: [
    [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    rehypeTableResponsive,
  ],
},
```

`rehype-external-links` opened outbound links in a new tab with safe `rel` attributes. `rehypeTableResponsive` was a small in-repo transform that wraps every `<table>` in a `.table-responsive` div so wide tables scroll inside the column instead of blowing out the page on mobile.

Astro 7 gives you an escape hatch: install `@astrojs/markdown-remark`, set `markdown.processor` to its `unified()` processor, and your old plugins keep working — at the cost of running the JavaScript pipeline you were trying to leave. I didn't want the escape hatch. The whole point was to *be* on Sätteri. So I ported both plugins.

The port turned out to be smaller than the dread it produced. Here's the table wrapper, before and after:

```js
// Before — a unified/rehype transform walking the HAST tree
export function rehypeTableResponsive() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table') return;
      // ...build a wrapper div, splice it into parent.children
    });
  };
}
```

```js
// After — a Sätteri HAST plugin
defineHastPlugin({
  name: 'table-responsive',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      ctx.wrapNode(node, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-responsive'] },
        children: [],
      });
    },
  },
});
```

The shape is actually nicer. Instead of walking the whole tree and checking `tagName` on every node, you declare a `filter` — `['table']`, `['a']` — and Sätteri only hands you the nodes you asked for. The Rust side does the matching. Mutations go through a context object (`ctx.wrapNode`, `ctx.setProperty`, `ctx.parent`) rather than splicing arrays by hand, which means the Rust arena stays in sync with what you change. Both plugins now live in a single `satteri-plugins.ts`, and the old unit tests were rewritten against a mock context.

The config that replaced the `rehypePlugins` block:

```js
import { satteri } from '@astrojs/markdown-satteri';
import { satteriExternalLinks, satteriTableResponsive } from './src/lib/satteri-plugins';

export default defineConfig({
  markdown: {
    processor: satteri({
      hastPlugins: [satteriExternalLinks(), satteriTableResponsive()],
    }),
  },
});
```

One detail saved me a chunk of work: `@astrojs/mdx` 7's `processor` defaults to `markdown.processor`. So setting the processor once covers both `.md` and `.mdx` — I didn't have to wire MDX separately. One pipeline, two file types.

### The two papercuts

Nothing major broke beyond the plugins, but two small things needed a touch. My Vitest config passed `svelte({ hot: false })` to the Svelte plugin; the `hot` option was removed in `@sveltejs/vite-plugin-svelte` 7, and under Astro 7 it went from a warning to an actual `ts(2353)` type error in `astro check`. The fix was deleting two words. And Biome's config `$schema` was pinned to an older version than the CLI, so I bumped it. Neither was interesting. Both were the kind of thing I can't leave in a terminal.

### What didn't break

I was braced for more, and most of what I worried about was a non-event:

- **My Svelte islands** — `@astrojs/svelte` went from 8 to 9, a major bump, and the interactive components didn't need a single edit.
- **Content collections** — I'd already moved to `glob()` loaders during the Astro 6 migration, so there was no legacy schema to untangle this time. The earlier work paid forward.
- **Vite 8 and Rolldown** — a new major bundler under the hood, and my `manualChunks` config and the `onwarn` filter I'd written for Svelte both survived untouched.
- **The tests** — 220 of them, the rewritten Sätteri plugin tests included, green on the first run.

The lesson from last time held: when you stay current between majors, the major stops being scary. Most of the work is deleting things that became defaults.

---

## Proof, Not Placebo

Here's the part I care about, because last time "everything feels faster" turned out to be the Rust compiler doing real work, and I've learned to check.

The build went green: `astro check` with zero errors, Biome clean, all **220 unit tests** passing on the first run, and a full production build of **416 pages**. But a green build doesn't prove Sätteri is actually *running* — a processor can silently fall back. So I went looking in the built HTML for the fingerprints of my two ported plugins.

They were everywhere. **3,150** external links across the site had been rewritten with `target="_blank" rel="noopener noreferrer"`. **Twenty-one posts** rendered their tables wrapped in `<div class="table-responsive">`. Those transforms only exist if `satteriExternalLinks` and `satteriTableResponsive` ran — which only happens if Sätteri is the live processor. If it had fallen back to `unified`, the `hastPlugins` would never fire and that markup wouldn't be there. It was there. Sätteri is doing the compiling.

So, like last time: not placebo. The Markdown that builds this site is now parsed in Rust, and the plugins I was afraid to port are running in the new pipeline, on every page.

---

## Was It Worth It?

The migration itself was boring, and I mean that as the highest compliment. Bump the versions, delete a flag, port two plugins, fix two papercuts, watch the tests pass. An afternoon, not a weekend.

What's *interesting* is the direction. The story that started in the Astro 6 post as a fun experiment — "look how fast Rust makes the `.astro` compiler" — is now the foundation you build on without thinking about it, and it's spread to the next layer down. First the components, now the content. Each release, another slow part of the toolchain quietly gets faster, and you find out only when you go measure it.

For anyone on Astro 6 wondering whether to jump: if you use remark or rehype plugins, that's your one real decision — port them to Sätteri's `hastPlugins`, or keep the `@astrojs/markdown-remark` escape hatch and run the JavaScript pipeline a while longer. Everything else is the usual smooth Astro upgrade. And if your site is mostly Markdown, the Rust compiler isn't a nice-to-have. It's the reason to go.

---

## Resources

- [Astro 7.0 Release Blog](https://astro.build/blog/astro-7/) — Full feature overview, Sätteri, Vite 8 + Rolldown
- [Astro 6 → 7 Upgrade Guide](https://docs.astro.build/en/guides/upgrade-to/v7/) — Step-by-step migration
- [Sätteri Plugin Docs](https://satteri.bruits.org/docs/plugins/) — Writing MDAST/HAST plugins
- [The migration PR for this site](https://github.com/xergioalex/xergioalex.com/pull/162) — The actual diff
- [XergioAleX.com Repository](https://github.com/xergioalex/xergioalex.com) — The source code

Let's keep building.
