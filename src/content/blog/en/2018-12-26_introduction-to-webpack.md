---
title: "Introduction to Webpack"
description: "What I shared in a talk on Webpack — module bundler, AMD vs CommonJS, entry points, loaders, plugins, and developer experience."
pubDate: "2018-12-26"
heroImage: "/images/blog/posts/introduction-to-webpack/hero.png"
heroLayout: "side-by-side"
tags: ["talks", "tech"]
---

I gave a talk on Webpack — the **module bundler for modern JavaScript applications**. The goal was to explain how Webpack takes modules with dependencies (`.js`, `.css`, `.coffee`, `.less`, `.jade`, images) and turns them into optimized static assets. Divide and conquer.

---

## Ways to Use Modules in JavaScript

**AMD** (Asynchronous Module Definition) — Used with RequireJS. Loads modules asynchronously.

**CommonJS** — Node.js module system. Lets you make a single request with all the libraries you need.

Webpack brings the best of both worlds in one place. **AMD + CommonJS**. And above all: **Webpack === Developer experience**.

---

## What Other Tools Are There?

- **Gulp and Grunt** — Task runners. You configure the tool and it does several things for you: minify, transpile, compile code, etc. Grunt came first; Gulp improved on it, including speed.
- **Browserify** — Only lets you use `require` in the browser, bundling all dependencies.
- **Parcel** — Often described as "Webpack fancy" — less config, more convention.

---

## What You Need to Know to Configure Webpack

### Entry Points

The main module where Webpack starts importing other modules. It's the file Webpack reads to generate the bundle. You can have multiple entry points.

### Output

Settings for the output file: where it goes, what it's called.

### Loaders

Help load all kinds of formats: images (jpg, png, gif), custom fonts, icons, and "dialects" like CoffeeScript, Stylus, Sass, or JSX.

### Plugins

Extend Webpack's features: compress files with Uglify, split modules into smaller chunks so the app loads faster.

---

## Installation

```bash
npm i webpack webpack-cli --save-dev
# or
yarn add webpack webpack-cli --dev
```

---

## Code and Examples

I shared examples from real projects:

- [Jopmi Landing](https://github.com/RockaLabs/jopmi-landing)
- [Bambú Alexa](https://github.com/xergioalex/bambu-alexa)
- [Beyond Campus Landing](https://github.com/xergioalex/beyond-campus-landing)
- [Beyond Campus Webapp](https://github.com/xergioalex/beyond-campus-webapp)
- [Webpack Backend Example](https://github.com/xergioalex/webpack_backend_example)
- [Webpack Frontend Examples](https://github.com/xergioalex/webpack_examples)

---

[View slides](https://slides.com/xergioalex/introduction-to-webpack)

Let's keep building.
