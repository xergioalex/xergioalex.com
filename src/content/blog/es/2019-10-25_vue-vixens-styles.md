---
title: 'Vue Vixens Talk: Estilos en Vue'
description: 'Lo que compartí en Vue Vixens Day Pereira — estilos en Vue.js, etiqueta style, preprocesadores, scoped, Bootstrap y Semantic UI.'
pubDate: '2019-10-25'
heroImage: '/images/blog/posts/vue-vixens-styles/hero.png'
heroLayout: 'side-by-side'
tags: ['talks', 'tech']
---

Di una charla sobre **estilos en Vue** durante el **Vue Vixens Day Pereira**. Es una charla introductoria a Vue y al manejo de estilos, desarrollada especialmente para el evento. La grabación está disponible en YouTube.

[Ver charla en YouTube](https://www.youtube.com/watch?v=HAWL6wzzyxQ)

---

## Desarrollo front-end

Empecé con lo básico: **HTML**, **CSS** y **JavaScript**. Las interfaces de usuario combinan los tres. UX vs UI — experiencia de usuario vs interfaz visual. En el espectro front-end, Vue.js entra en juego para la parte reactiva; los **estilos (CSS)** son la otra mitad.

---

## Etiqueta `<style>`

En Vue, los estilos van dentro de `<style>`. Puedes usar selectores y clases como en CSS normal:

```html
<template>
  <p>Hola Mundo</p>
  <p class="text-green">Hola Vue Vixens</p>
</template>

<style>
  p { color: red; }
  p.text-green { color: green; }
</style>
```

---

## Sectores y clases

La diferencia entre `p.text-green` (elemento con clase) y `p .text-green` (descendiente) importa. En el primer caso el `<p>` tiene la clase; en el segundo, un hijo como `<span class="text-green">` la tiene.

---

## Preprocesadores

Vue soporta **SCSS**, **Stylus** y **Less** con el atributo `lang`:

```html
<style lang="scss">
  p {
    color: red;
    &.text-green { color: green; }
  }
</style>
```

El `&` en SCSS permite anidar y referenciar el selector padre.

---

## Importación de módulos

Puedes importar frameworks CSS y usarlos con Vue:

```javascript
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
```

- **[Bootstrap Vue](https://bootstrap-vue.js.org/)** — Componentes Bootstrap para Vue
- **[Semantic UI Vue](https://semantic-ui-vue.github.io)** — Semantic UI para Vue

---

## Estilos locales y globales

`<style>` sin atributos aplica a todo el documento. `<style scoped>` limita los estilos al componente actual:

```html
<style></style>       <!-- global -->
<style scoped></style> <!-- solo este componente -->
```

---

## Slides y recursos

- [Ver slides](https://slides.com/xergioalex/vue-vixenx-talk-styles)
- [Vue Vixens](https://www.vuevixens.org/) — Comunidad para aprender Vue

A seguir construyendo.
