---
title: 'CSS Grid Layout'
description: 'Lo que compartí en una charla sobre CSS Grid — Display Flex vs Grid, ejercicios prácticos y trucos del State of CSS 2020.'
pubDate: '2020-02-25'
heroImage: '/images/blog/posts/css-grid-layout/hero.png'
heroLayout: 'side-by-side'
tags: ['talks', 'tech']
---

**CSS Grid Layout** y algunos trucos e insights extraídos del State of CSS Survey (2020). La idea: comparar Flexbox y Grid, mostrar compatibilidad de navegadores y pasar a demos prácticas.

---

## Display: Flex y Grid

La propiedad **display** en CSS define cómo se colocan los componentes (div, enlaces, encabezados, etc.) en la página.

**Display Flex** — Flexbox lleva más tiempo en los navegadores. Hay cheatsheets y ejercicios para practicar.

**Display Grid** — CSS Grid desde 2017. También tiene cheatsheets y ejercicios. La compatibilidad actual es muy buena.

---

## Flexbox vs Grid

Ambos resuelven problemas de layout, pero de forma distinta. Flexbox es unidimensional (filas o columnas). Grid es bidimensional (filas y columnas a la vez). La charla cubrió cuándo usar cada uno y cómo combinarlos.

---

## Demo time

Compartí ejercicios prácticos que puedes hacer en casa:

### Curso de CSS Grid

- [CSS Grid Layout Course](https://css-grid-layout-course.xergioalex.com/)

### Ejercicio: Movies Page

Crear una página de películas usando CSS Grid. Mi solución:

- [movies-page-css-grid](https://github.com/xergioalex/movies-page-css-grid)

![Ejercicio Movies Page con CSS Grid](/images/blog/posts/css-grid-layout/movies-demo.png)

### Ejercicio: Videos Player

Crear una página de reproductor de vídeos con CSS Grid. Incluye sidebar con playlists, reproductor principal y controles.

- [videos-player-css-grid](https://github.com/xergioalex/videos-player-css-grid)
- [Demo en vivo](https://videos-player-css-grid.xergioalex.com/)

![Ejercicio Videos Player con CSS Grid](/images/blog/posts/css-grid-layout/videos-demo.jpg)

---

## Bonus: line-clamp y prefers-reduced-motion

**line-clamp** — Permite truncar texto a un número de líneas con ellipsis. Muy útil para cards y listas.

**prefers-reduced-motion** — Media query que respeta la preferencia del usuario de reducir animaciones. Accesibilidad importante. Se puede probar en Firefox Inspector con `ui.prefersReducedMotion: 1`.

---

[Ver slides](https://slides.com/xergioalex/css-grid-layout)

A seguir construyendo.
