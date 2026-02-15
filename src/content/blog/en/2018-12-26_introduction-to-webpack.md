---
title: "Introduction to Webpack"
description: "Module bundler for modern JavaScript applications — entry points, loaders, plugins, and developer experience."
pubDate: "2018-12-26"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

In December 2018 I gave a talk on Webpack — the module bundler that became the de facto standard for modern JavaScript applications. The goal was to demystify the config and show how it brings together AMD and CommonJS in one place.

**Module systems in JavaScript:** AMD (Asynchronous Module Definition, e.g. RequireJS) loads modules asynchronously. CommonJS (Node.js style) allows a single request with all the libraries you need. Webpack combines the best of both worlds.

**Other tools:** Gulp and Grunt are task runners — you configure them to minify, transpile, compile. Browserify only lets you use `require` in the browser. Parcel is often described as "Webpack fancy" — less config, more convention. Webpack is about **developer experience**: divide and conquer.

---

## What You Need to Configure

- **Entry points** — The main module(s) where Webpack starts. Can have multiple.
- **Output** — Where the bundle goes, what it's called.
- **Loaders** — Handle different file types: images (jpg, png, gif), fonts, CoffeeScript, Stylus, Sass, JSX.
- **Plugins** — Extend Webpack: Uglify for minification, code splitting into chunks for faster loading.

---

## Installation and Examples

```bash
npm i webpack webpack-cli --save-dev
# or
yarn add webpack webpack-cli --dev
```

I shared code examples from [Jopmi Landing](https://github.com/RockaLabs/jopmi-landing), [Webpack Backend Example](https://github.com/xergioalex/webpack_backend_example), and [Webpack Frontend Examples](https://github.com/xergioalex/webpack_examples).

---

## Slides & Reference

- [View slides](https://slides.com/xergioalex/introduction-to-webpack)
- [Gulp vs Grunt vs Webpack](https://da-14.com/blog/gulp-vs-grunt-vs-webpack-comparison-build-tools-task-runners)
