---
title: "Learning Webpack: 17 Exercises That Changed How I Build for the Web"
description: "The story of diving deep into Webpack 4 through 17 hands-on exercises — from basic loaders and CSS preprocessors to code splitting, DLL optimization, and React integration. The learning journey that turned a mysterious black box into my go-to build tool."
pubDate: "2018-07-27"
heroLayout: "none"
tags: ["portfolio"]
---

There's a moment in every front-end developer's life when the toolchain becomes the bottleneck. You're comfortable writing JavaScript, CSS, HTML — the actual code feels natural. But then you need to use SASS. And import images. And split your code into multiple bundles. And transpile modern JavaScript for older browsers. And suddenly you realize: you don't have a build system. You have a *problem*.

For me, that moment led to **Webpack**.

In 2018, Webpack wasn't just a tool — it was *the* tool. The module bundler that had taken the JavaScript ecosystem by storm. Everyone was using it. Every framework recommended it. Every tutorial assumed you had it configured. But configuring it? That was its own skill. And like any skill worth having, I decided to learn it properly — not by copying configs from Stack Overflow, but by building 17 exercises from scratch, each one targeting a specific feature.

The result was a [collection of webpack examples](https://github.com/xergioalex/webpack_examples) that became my reference manual for every project that followed.

---

## Why Webpack felt like a revolution

Before Webpack, front-end builds were a mess. You had Grunt task runners, Gulp pipelines, RequireJS for modules, separate tools for each file type. Nothing talked to each other. Configuration was scattered across multiple files and systems.

Webpack changed the mental model completely: **everything is a module**. JavaScript files? Modules. CSS files? Modules. Images? Modules. Fonts? Modules. Every asset in your project flows through the same dependency graph, gets processed by the right loader, and comes out the other side as an optimized bundle. One tool. One config. One mental model.

The concept was elegant. The execution — with its `webpack.config.js` that could grow into a hundred-line monster — was where things got interesting.

---

## Starting simple: loaders for everything

My learning path followed a natural progression. Start with the basics, understand each piece in isolation, then combine them into real projects.

### Babel Loader — speaking modern JavaScript everywhere

The first exercise was `babel-loader` — the gateway to modern JavaScript. You write ES6+ code (arrow functions, destructuring, async/await), and Babel transpiles it to ES5 that every browser understands. The config is minimal:

```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

Simple. But understanding *why* this works — the regex matching, the exclusion of `node_modules`, the preset system — that's the foundation for everything else.

### CSS, SASS, LESS, Stylus, PostCSS — the style gauntlet

This is where I went deep. Not one CSS exercise, but **five**:

1. **css-style-loader** — inject CSS directly into the DOM via `<style>` tags
2. **sass-loader** — compile `.scss` files (the preprocessor I'd use most in real projects)
3. **less-loader** — compile LESS files (popular in some ecosystems)
4. **stylus-loader** — compile Stylus (terser syntax, fewer characters)
5. **postcss-loader** — the PostCSS pipeline for autoprefixing, future CSS features, optimizations

Why all five? Because every project uses a different one, and I wanted to understand the pattern, not just memorize a config. The pattern is always the same: `test` a file extension, `use` a chain of loaders that process from right to left. Once you see it for one preprocessor, you see it for all of them.

### Assets: images, fonts, videos

Then came the asset loaders:

- **url-loader-images** — small images get inlined as base64 data URIs (faster loading, fewer HTTP requests), large images get emitted as files
- **url-loader-fonts** — same pattern for font files, with proper MIME types
- **file-loader-video** — video files always emitted as separate files (too large to inline)
- **json-loader** — import JSON files directly as JavaScript objects

Each exercise taught a specific trade-off. Inlining a 2 KB icon as base64 saves an HTTP request. Inlining a 200 KB image bloats your bundle. The `limit` parameter in url-loader is where you draw that line.

---

## Code organization: the art of splitting

Once you understand loaders, the next frontier is **how you organize your output**. This is where Webpack goes from "build tool" to "architecture tool."

### Multiple entry points

Not every page needs the same JavaScript. A login page doesn't need the charting library your dashboard uses. The `multiple-entry-points` exercise taught me to define separate bundles:

```javascript
entry: {
  home: './src/home.js',
  admin: './src/admin.js',
  contact: './src/contact.js'
}
```

Three entry points, three bundles, each containing only the code it needs.

### Dynamic imports and code splitting

Even better than manual entry points: **dynamic imports**. Load code only when the user actually needs it:

```javascript
button.addEventListener('click', () => {
  import('./heavy-module.js').then(module => {
    module.doExpensiveThing();
  });
});
```

Webpack sees that `import()` call and automatically creates a separate chunk. The heavy module only downloads when the user clicks the button. This was mind-blowing for me — the bundler understanding your code's execution patterns and optimizing around them.

### Preventing duplication

When you have multiple entry points that share dependencies, Webpack can deduplicate them — extracting the common code into a shared chunk that gets loaded once and cached. The `prevent-duplication` exercise taught me the `SplitChunksPlugin` configuration that makes this automatic.

### Vendor bundles and DLL plugin

Two exercises that changed how I think about caching:

**Vendor bundles** — separate your application code (changes frequently) from third-party libraries (change rarely). The browser caches `vendor.bundle.js` independently, so updating your app doesn't invalidate the cache for React, lodash, or moment.js.

**DLL plugin** — pre-compile vendor libraries into a "Dynamic Link Library" that Webpack doesn't need to reprocess on every build. For large projects, this cut build times dramatically. You run the DLL build once, and subsequent builds skip all that vendor processing.

---

## Plugin extract text: CSS in its own file

The `plugin-extract-text` exercise solved a problem I'd hit immediately in production: the css-style-loader injects CSS via JavaScript, which means there's a flash of unstyled content on first load. The `ExtractTextPlugin` (later `MiniCssExtractPlugin`) pulls CSS out into its own `.css` file that the browser loads in parallel with JavaScript. Proper production setup.

---

## External dependencies

The `external` exercise taught a subtle but important concept: sometimes you *don't* want Webpack to bundle a library. If you're loading React from a CDN via a `<script>` tag, you tell Webpack to treat it as an external — available globally, but not bundled. This keeps your bundle small while still letting you `import React from 'react'` in your code.

---

## React integration

The `react` exercise brought everything together: Babel for JSX transpilation, style loaders for CSS, url-loader for images, webpack-dev-server for hot reloading. A complete React development environment built from scratch, every piece understood because I'd studied each one individually in the previous exercises.

This was the payoff. No `create-react-app` magic. No hidden configuration. Every line in `webpack.config.js` was something I could explain because I'd written it myself in isolation first.

---

## Webpack Dev Server: the development loop

The `webpack-dev-server` exercise completed the picture. A local server that watches your files, rebuilds on changes, and refreshes the browser automatically. With Hot Module Replacement, it could even update modules in place without a full page reload — you change a CSS value and see it update instantly, without losing your application state.

After weeks of manually running builds and refreshing browsers, dev server felt like cheating.

---

## The backend chapter

A few weeks after finishing the examples, I created a [separate project for backend Webpack](https://github.com/xergioalex/webpack_backend_example) — proving that Webpack isn't just for front-end. Using it to bundle a Node.js application with Docker integration opened up another perspective: consistent build tooling across the entire stack.

---

## What 17 exercises taught me

Looking at the [webpack_examples repository](https://github.com/xergioalex/webpack_examples), each folder is a lesson learned. But the meta-lesson was bigger than any individual exercise:

**Learn the pieces before learning the whole.** I could have started with a complex boilerplate and worked backwards. Instead, I started with one loader, one concept, one config — and built up. By the time I was configuring React projects with code splitting, DLL optimization, and extracted CSS, nothing felt magical. Everything was just a combination of pieces I already understood.

That approach — isolating concepts, building examples in isolation, then combining — became my go-to learning strategy for every new tool after Webpack. It's slower at the beginning, but it pays compound interest. You don't just learn to use the tool; you learn to *think* in it.

These 17 exercises became my reference library. Every new project I configured in the months and years that followed, I'd go back to one of these folders, grab the relevant config, and adapt it. Not copy-pasting from Stack Overflow — reaching into my own understanding.

Webpack may not be the only bundler today, but the mental model it taught me — everything is a module, everything flows through a graph, every transformation is a loader, every optimization is a plugin — that model applies everywhere. Vite, Rollup, esbuild, Turbopack — they all build on the same core ideas that Webpack crystallized.

And it all started with 17 folders and a `webpack.config.js`.
