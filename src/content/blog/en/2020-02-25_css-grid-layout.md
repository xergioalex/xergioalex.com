---
title: "CSS Grid Layout"
description: "What I shared in a talk on CSS Grid — Display Flex vs Grid, practical exercises, and tricks from State of CSS 2020."
pubDate: "2020-02-25"
heroImage: "/images/blog/posts/css-grid-layout/hero.png"
heroLayout: "side-by-side"
tags: ["talks", "tech"]
---

I gave a talk on **CSS Grid Layout** and some tricks and insights from the State of CSS Survey (2020). The goal was to compare Flexbox and Grid, show browser compatibility, and move on to practical demos.

---

## Display: Flex and Grid

The **display** property in CSS defines how components (div, links, headings, etc.) are placed on the page.

**Display Flex** — Flexbox has been in browsers longer. There are cheatsheets and exercises to practice.

**Display Grid** — CSS Grid since 2017. Also has cheatsheets and exercises. Current compatibility is very good.

---

## Flexbox vs Grid

Both solve layout problems, but differently. Flexbox is one-dimensional (rows or columns). Grid is two-dimensional (rows and columns at once). The talk covered when to use each and how to combine them.

---

## Demo time

I shared practical exercises you can do at home:

### CSS Grid Course

- [CSS Grid Layout Course](https://css-grid-layout-course.xergioalex.com/)

### Exercise: Movies Page

Create a movies page using CSS Grid. My solution:

- [movies-page-css-grid](https://github.com/xergioalex/movies-page-css-grid)

![Movies Page exercise with CSS Grid](/images/blog/posts/css-grid-layout/movies-demo.png)

### Exercise: Videos Player

Create a video player page with CSS Grid. Includes sidebar with playlists, main player, and controls.

- [videos-player-css-grid](https://github.com/xergioalex/videos-player-css-grid)
- [Live demo](https://videos-player-css-grid.xergioalex.com/)

![Videos Player exercise with CSS Grid](/images/blog/posts/css-grid-layout/videos-demo.jpg)

---

## Bonus: line-clamp and prefers-reduced-motion

**line-clamp** — Lets you truncate text to a number of lines with ellipsis. Very useful for cards and lists.

**prefers-reduced-motion** — Media query that respects the user's preference to reduce animations. Important for accessibility. Can be tested in Firefox Inspector with `ui.prefersReducedMotion: 1`.

---

[View slides](https://slides.com/xergioalex/css-grid-layout)

Let's keep building.
