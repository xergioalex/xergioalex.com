---
type: internal
title: "Demo de características de Reveal.js"
description: "Una demostración completa de las capacidades de Reveal.js incluyendo fragmentos, auto-animación, resaltado de código, medios y diseños Tailwind."
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

# Demo de Reveal.js

### Todo lo que puedes hacer desde Markdown

<small>XergioAleX.com · 2026</small>

---

## Fragmentos

Haz clic para revelar cada elemento:

- Primer punto <!-- .element: class="fragment fade-up" -->
- Segundo punto <!-- .element: class="fragment fade-up" -->
- Tercer punto <!-- .element: class="fragment fade-up" -->

---

<!-- .slide: data-auto-animate -->

## Auto-Animación

<div data-id="box" style="background: #2563eb; width: 100px; height: 100px; border-radius: 8px; margin: 0 auto;"></div>

---

<!-- .slide: data-auto-animate -->

## Auto-Animación

<div data-id="box" style="background: #7c3aed; width: 300px; height: 200px; border-radius: 32px; margin: 0 auto;"></div>

---

## Resaltado de código

Avanza por el código con las flechas:

```typescript [1-2|4-6|8-10]
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown';

const deck = new Reveal({
  plugins: [Markdown],
});

deck.initialize().then(() => {
  console.log('Reveal.js está listo!');
});
```

---

## Imagen en línea

<div class="r-stack">
  <img src="https://picsum.photos/800/400?random=1" alt="Paisaje de ejemplo" width="800" height="400" class="fragment fade-in-then-out" />
  <img src="https://picsum.photos/800/400?random=2" alt="Otro paisaje" width="800" height="400" class="fragment fade-in" />
</div>

---

## Video en línea

<video data-autoplay loop muted width="640" height="360">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
</video>

---

## GIF animado

<img src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" alt="Animación de programación" width="480" height="270" />

---

## Diseño en dos columnas

<div class="grid grid-cols-2 gap-8 text-left">
  <div>
    <h3>Columna izquierda</h3>
    <p>Las utilidades de grid de Tailwind CSS funcionan dentro de las diapositivas de Reveal. Esto te da control total del diseño.</p>
  </div>
  <div>
    <h3>Columna derecha</h3>
    <p>Mezcla contenido Markdown con HTML y clases de Tailwind para cualquier diseño que necesites.</p>
  </div>
</div>

---

<!-- .slide: data-background-image="https://picsum.photos/1920/1080?random=3" data-background-opacity="0.3" -->

## Imagen de fondo completa

Esta diapositiva tiene una imagen de fondo con opacidad reducida.

---

## Diapositivas verticales

Presiona la **flecha hacia abajo** para navegar verticalmente.

--

### Sub-diapositiva vertical 1

Este es contenido anidado usando el separador `--`.

--

### Sub-diapositiva vertical 2

Puedes ir tan profundo como necesites.

---

## Notas del presentador

Presiona **S** para abrir la vista del presentador.

Note: Estas son notas del presentador visibles solo en la vista de presentador. Úsalas para puntos de conversación, recordatorios o señales de tiempo. La audiencia nunca ve este contenido.

---

## Matemáticas con KaTeX

La fórmula cuadrática:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

La identidad de Euler:

$$e^{i\pi} + 1 = 0$$

---

<!-- .slide: data-background-gradient="linear-gradient(to bottom right, #1e3a5f, #0f172a)" -->

## Gracias

Construido con **Reveal.js** dentro de **Astro**

<small>Parte del enfoque slides-as-code en xergioalex.com</small>
