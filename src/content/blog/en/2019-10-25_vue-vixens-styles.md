---
title: "Vue Vixens Talk: Styles in Vue"
description: "What I shared at Vue Vixens Day Pereira — styles in Vue.js, style tag, preprocessors, scoped, Bootstrap and Semantic UI."
pubDate: "2019-10-25"
heroImage: "/images/blog/posts/vue-vixens-styles/hero.png"
heroLayout: "side-by-side"
tags: ["talks", "tech"]
---

I gave a talk on **styles in Vue** during **Vue Vixens Day Pereira**. It's an introductory talk on Vue and styling, developed especially for the event. The recording is available on YouTube.

[Watch talk on YouTube](https://www.youtube.com/watch?v=HAWL6wzzyxQ)

---

## Front-end Development

I started with the basics: **HTML**, **CSS**, and **JavaScript**. User interfaces combine all three. UX vs UI — user experience vs visual interface. On the front-end spectrum, Vue.js handles the reactive part; **styles (CSS)** are the other half.

---

## The `<style>` Tag

In Vue, styles go inside `<style>`. You can use selectors and classes like in regular CSS:

```html
<template>
  <p>Hello World</p>
  <p class="text-green">Hello Vue Vixens</p>
</template>

<style>
  p { color: red; }
  p.text-green { color: green; }
</style>
```

---

## Selectors and Classes

The difference between `p.text-green` (element with class) and `p .text-green` (descendant) matters. In the first case the `<p>` has the class; in the second, a child like `<span class="text-green">` has it.

---

## Preprocessors

Vue supports **SCSS**, **Stylus**, and **Less** with the `lang` attribute:

```html
<style lang="scss">
  p {
    color: red;
    &.text-green { color: green; }
  }
</style>
```

The `&` in SCSS lets you nest and reference the parent selector.

---

## Importing Modules

You can import CSS frameworks and use them with Vue:

```javascript
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
```

- **[Bootstrap Vue](https://bootstrap-vue.js.org/)** — Bootstrap components for Vue
- **[Semantic UI Vue](https://semantic-ui-vue.github.io)** — Semantic UI for Vue

---

## Local and Global Styles

`<style>` without attributes applies globally. `<style scoped>` limits styles to the current component:

```html
<style></style>       <!-- global -->
<style scoped></style> <!-- this component only -->
```

---

## Slides and Resources

- [View slides](https://slides.com/xergioalex/vue-vixenx-talk-styles)
- [Vue Vixens](https://www.vuevixens.org/) — Community for learning Vue

Let's keep building.
