---
type: internal
title: "Reveal.js Features Demo"
description: "A comprehensive showcase of Reveal.js capabilities including fragments, auto-animate, code highlights, media embeds, and custom Tailwind layouts."
pubDate: 2026-04-25
tags: [tech, talks]
draft: false
theme: dark
transition: slide
syntaxHighlight: true
math: true
eventName: "XergioAleX.com Demo"
eventDate: 2026-04-25
---

<!-- .slide: data-background-gradient="linear-gradient(to bottom right, #0f172a, #1e3a5f)" -->

# Reveal.js Features Demo

### Everything you can do from Markdown

<small>XergioAleX.com · 2026</small>

---

## Fragments

Click to reveal each item:

- First point <!-- .element: class="fragment fade-up" -->
- Second point <!-- .element: class="fragment fade-up" -->
- Third point <!-- .element: class="fragment fade-up" -->

---

<!-- .slide: data-auto-animate -->

## Auto-Animate

<div data-id="box" style="background: #2563eb; width: 100px; height: 100px; border-radius: 8px; margin: 0 auto;"></div>

---

<!-- .slide: data-auto-animate -->

## Auto-Animate

<div data-id="box" style="background: #7c3aed; width: 300px; height: 200px; border-radius: 32px; margin: 0 auto;"></div>

---

## Code Highlight

Step through the code with arrow keys:

```typescript [1-2|4-6|8-10]
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown';

const deck = new Reveal({
  plugins: [Markdown],
});

deck.initialize().then(() => {
  console.log('Reveal.js is ready!');
});
```

---

## Inline Image

<div class="r-stack">
  <img src="https://picsum.photos/800/400?random=1" alt="Sample landscape" width="800" height="400" class="fragment fade-in-then-out" />
  <img src="https://picsum.photos/800/400?random=2" alt="Another landscape" width="800" height="400" class="fragment fade-in" />
</div>

---

## Inline Video

<video data-autoplay loop muted width="640" height="360">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
</video>

---

## Animated GIF

<img src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" alt="Coding animation" width="480" height="270" />

---

## Two-Column Layout

<div class="grid grid-cols-2 gap-8 text-left">
  <div>
    <h3>Left Column</h3>
    <p>Tailwind CSS grid utilities work inside Reveal slides. This gives you full layout control.</p>
  </div>
  <div>
    <h3>Right Column</h3>
    <p>Mix Markdown content with HTML and Tailwind classes for any layout you need.</p>
  </div>
</div>

---

<!-- .slide: data-background-image="https://picsum.photos/1920/1080?random=3" data-background-opacity="0.3" -->

## Fullscreen Background Image

This slide has a background image with reduced opacity.

---

## Vertical Slides

Press **down arrow** to navigate vertically.

--

### Vertical Sub-Slide 1

This is nested content using the `--` separator.

--

### Vertical Sub-Slide 2

You can go as deep as you need.

---

## Speaker Notes

Press **S** to open the speaker view.

Note: These are speaker notes visible only in speaker view. Use them for talking points, reminders, or timing cues. The audience never sees this content.

---

## Math with KaTeX

The quadratic formula:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

Euler's identity:

$$e^{i\pi} + 1 = 0$$

---

<!-- .slide: data-background-gradient="linear-gradient(to bottom right, #1e3a5f, #0f172a)" -->

## Thank You

Built with **Reveal.js** inside **Astro**

<small>Part of the slides-as-code approach at xergioalex.com</small>
