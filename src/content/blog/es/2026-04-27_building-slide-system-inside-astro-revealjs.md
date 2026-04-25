---
title: "Construyendo un sistema de diapositivas multilingüe dentro de Astro con Reveal.js"
description: "Cómo construí un catálogo de presentaciones de tres tipos dentro de mi sitio Astro — uniones discriminadas, gemelos AEO, aislamiento de assets y más."
pubDate: 2026-04-27
tags: [tech, web-development, talks]
series: "slides-as-code"
seriesOrder: 2
heroLayout: none
draft: true
keywords: [astro diapositivas, integración reveal.js astro, slides como contenido, esquema unión discriminada, gemelos AEO markdown, sistema de presentaciones]
---

En el [post anterior](/es/blog/best-presentation-tools-for-developers-2026), comparé todas las herramientas serias de slides-as-code y expliqué por qué elegí Reveal.js para mi sitio web. Este post es el caso de estudio técnico: cómo construí un catálogo de tres tipos de presentaciones que vive *dentro* de mi sitio Astro como contenido de primera clase, con el mismo soporte multilingüe, infraestructura SEO/AEO, y sistema de temas que mis posts del blog.

El sistema completo maneja tres tipos de presentaciones:

1. **Decks internos** — creados en Markdown, renderizados con Reveal.js en tiempo de build.
2. **Decks externos incrustados** — diapositivas de terceros (Google Slides, Speaker Deck) renderizadas via `<iframe>`.
3. **Decks externos con enlace** — diapositivas de terceros que bloquean iframes, renderizadas como una página de información con un CTA.

Los tres tipos viven en una sola Content Collection de Astro, comparten el mismo esquema Zod (unión discriminada), y se muestran en una sección de catálogo dentro de la página `/tech-talks` existente.

## ¿Por qué no Slidev?

Cubrí esto brevemente en el [post de comparación](/es/blog/best-presentation-tools-for-developers-2026), pero la incompatibilidad arquitectural merece una explicación más profunda.

Slidev es una aplicación Vue/Vite independiente. Para usarlo, ejecutas `slidev build` y obtienes una SPA estática. Integrar eso en un sitio Astro significaría:

- Mantener un **`package.json` separado** con Vue, Vite, y el árbol de dependencias de Slidev.
- Ejecutar un **pipeline de build separado** (`slidev build` → copiar la salida a `public/slides/`).
- Perder **Content Collections**: sin validación Zod, sin filtrado de borradores, sin consultas `getCollection()`.
- Perder **i18n**: sin `getTranslations(lang)`, sin `getUrlPrefix(lang)`, sin selector de idioma en la interfaz de la presentación.
- Perder **gemelos AEO**: el proyecto exige que cada página HTML tenga un endpoint `.md` paralelo para agentes de IA. Una SPA de Slidev no puede participar en eso.
- Perder **integración de temas**: Slidev tiene su propia tematización basada en UnoCSS. Mi sitio usa Tailwind v4 con un toggle oscuro/claro que maneja `<html class="dark">`. Dos sistemas de temas que no se comunican entre sí.

Reveal.js evita todo esto porque es una librería, no una aplicación. Lo importo en un componente Svelte, lo inicializo al montar, y el resto de la página es Astro estándar.

## El esquema de tres tipos

El corazón de la arquitectura es una unión discriminada Zod en `src/content.config.ts`:

```typescript
const slideSchema = z.discriminatedUnion('type', [
  internalSlideSchema,     // type: 'internal'
  externalLinkSlideSchema, // type: 'external-link'
  externalEmbedSlideSchema // type: 'external-embed'
]);
```

Cada variante comparte un esquema base (título, descripción, pubDate, tags, draft, metadatos de evento) y lo extiende con campos específicos del tipo:

- **`internal`** agrega `theme`, `transition`, `syntaxHighlight`, `math`.
- **`external-link`** agrega `externalUrl`, `provider`.
- **`external-embed`** agrega `externalUrl`, `embedUrl`, `provider`, `aspectRatio`.

TypeScript estrecha el tipo automáticamente: cuando escribo `if (deck.data.type === 'internal')`, el compilador sabe que `deck.data.theme` existe en esa rama. Sin casting de tipos, sin verificaciones en runtime más allá de la que la unión discriminada ya proporciona.

## Renderizado de Markdown en tiempo de build

Para los decks internos, la ruta lee `deck.body` (el Markdown crudo del archivo `.md`) y lo incrusta en un `<textarea data-template>` dentro de un `<section data-markdown>`. El plugin de Markdown de Reveal parsea el contenido del textarea al hidratar.

El mecanismo anti-FOUC: el contenedor del deck empieza con `opacity-0` y transiciona a opacidad completa después de que Reveal dispara su evento `ready`.

## SlideLayout y RevealDeck

**`SlideLayout.astro`** es el layout de pantalla completa para decks internos e incrustados. Importa el CSS de Reveal.js (ambos temas oscuro y claro) — este es el **único** layout que lo hace, asegurando que los estilos de Reveal no se filtren a otras páginas.

**`RevealDeck.svelte`** es el componente del lado del cliente que inicializa Reveal. Usa `client:only="svelte"` porque Reveal necesita acceso al DOM que SSR no puede proporcionar. Los plugins se importan dinámicamente y condicionalmente según las flags del frontmatter.

## Aislamiento de assets

Esto era innegociable: visitar `/`, `/blog`, `/about`, o incluso `/tech-talks` (la página del catálogo) no debe enviar **cero bytes de Reveal.js**.

El grafo de assets por ruta de Astro maneja esto automáticamente. Como el CSS de Reveal solo se importa en `SlideLayout.astro`, y `SlideLayout` solo se usa en rutas de decks internos y embeds, los chunks de CSS solo aparecen en el HTML de esas páginas.

Verifiqué esto después del build buscando en `dist/` referencias a chunks de Reveal — solo las páginas de decks internos los referencian.

## Gemelos AEO para diapositivas

El proyecto tiene una política explícita: cada página HTML debe tener un endpoint `.md` paralelo sirviendo `text/markdown` para agentes de IA. Esto se aplica con `npm run md:check:strict`.

Las diapositivas siguen esta política:
- **Decks internos**: el gemelo sirve el cuerpo Markdown crudo. Un agente de IA que lea `/tech-talks/demo-revealjs-features.md` obtiene el contenido completo.
- **Decks externos**: el gemelo sirve un stub estructurado con título, descripción, metadatos del evento y la URL externa.

## El catálogo

El catálogo vive dentro de la página `/tech-talks` existente como una sección aditiva. Lo inserté entre la sección de Filosofía y el CTA de invitación a hablar — un espacio natural que muestra trabajo pasado antes de pedir a los visitantes que inviten al speaker.

La sección solo se renderiza cuando existen decks, así que la TechTalksPage se ve idéntica antes de que se publiquen presentaciones.

## Qué haría diferente

**Parseo de `<section>` en tiempo de build.** El enfoque actual funciona y mantiene alta la flexibilidad de autoría, pero el HTML no es rastreable antes de que JavaScript se ejecute. Los gemelos AEO mitigan esto para agentes de IA, pero para visitantes humanos, hay un breve momento opacity-0 antes de que Reveal esté listo.

**Búsqueda/filtro en el catálogo.** Ahora el catálogo es una cuadrícula plana. Una vez que crezca más allá de 10-15 decks, chips de búsqueda (por tag, evento, año) ayudarían.

**Vista previa en el homepage.** La página principal tiene un `TechTalksPostsSection` que muestra posts recientes tagged `talks`. Un `RecentDecksSection` paralelo podría mostrar presentaciones recientes.

## Recursos

- [Notas de la versión de Reveal.js v6](https://github.com/hakimel/reveal.js/releases/tag/6.0.0)
- [Guía de la función de diapositivas](/docs/features/SLIDES.md) — documentación completa
- [Demo deck en vivo](/es/tech-talks/demo-revealjs-features) — todas las características en acción
- [Post anterior: Las mejores herramientas de presentación](/es/blog/best-presentation-tools-for-developers-2026)
