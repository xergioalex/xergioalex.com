---
title: "Construyendo un sistema de diapositivas multilingüe dentro de Astro con Reveal.js"
description: "Cómo construí un catálogo de presentaciones de tres tipos dentro de mi sitio Astro — uniones discriminadas, gemelos AEO, aislamiento de assets y más."
pubDate: 2026-04-27
tags: ["web-development", "talks", "astro", "svelte", "portfolio"]
series: "slides-as-code"
seriesOrder: 2
heroLayout: none
draft: true
keywords: [astro diapositivas, integración reveal.js astro, slides como contenido, esquema unión discriminada, gemelos AEO markdown, sistema de presentaciones]
---

Tras [un análisis de las distintas herramientas de slides-as-code disponibles para desarrolladores](/es/blog/best-presentation-tools-for-developers-2026), elegí [Reveal.js](https://revealjs.com) para construir mi propio sistema de diapositivas dentro de mi sitio web. Este post es el caso de estudio técnico: cómo construí un catálogo de tres tipos de presentaciones que vive *dentro* de mi sitio Astro como contenido de primera clase, con el mismo soporte multilingüe, infraestructura SEO/AEO, y sistema de temas que mis posts del blog.

El sistema completo maneja tres tipos de presentaciones:

1. **Decks internos** — creados en Markdown, renderizados con Reveal.js en tiempo de build.
2. **Decks externos incrustados** — diapositivas de terceros (Google Slides, Speaker Deck) renderizadas via `<iframe>`.
3. **Decks externos con enlace** — diapositivas de terceros que bloquean iframes, renderizadas como una página de información con un CTA.

Los tres tipos viven en una sola Content Collection de Astro, comparten el mismo esquema Zod (unión discriminada), y se muestran en un catálogo dedicado en `/slides` con scroll infinito.

## ¿Por qué no Slidev?

Cubrí esto brevemente en el [post de comparación](/es/blog/best-presentation-tools-for-developers-2026), pero la incompatibilidad arquitectural merece una explicación más profunda.

Slidev es una aplicación Vue/Vite independiente. Para usarlo, ejecutas `slidev build` y obtienes una SPA estática. Integrar eso en un sitio Astro significaría:

- Mantener un **`package.json` separado** con Vue, Vite, y el árbol de dependencias de Slidev.
- Ejecutar un **pipeline de build separado** (`slidev build` → copiar la salida a `public/slides/`).
- Perder **Content Collections**: sin validación Zod, sin filtrado de borradores, sin consultas `getCollection()`.
- Perder **i18n**: sin `getTranslations(lang)`, sin `getUrlPrefix(lang)`, sin selector de idioma en la interfaz de la presentación.
- Perder **gemelos AEO**: el proyecto exige que cada página HTML tenga un endpoint `.md` paralelo para agentes de IA. Una SPA de Slidev no puede participar en eso.
- Perder **integración de temas**: Slidev tiene su propia tematización basada en UnoCSS. Mi sitio usa Tailwind v4 con un toggle oscuro/claro que maneja `<html class="dark">`. Dos sistemas de temas que no se comunican entre sí.
- Perder **sitemap y SEO**: la salida de Slidev es una SPA con routing basado en hash, invisible para `@astrojs/sitemap`.

Reveal.js evita todo esto porque es una librería, no una aplicación. Lo importo en un componente Svelte, lo inicializo al montar, y el resto de la página es Astro estándar. Mismo build, mismas collections, mismo i18n, mismo SEO.

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

¿Por qué una sola colección en lugar de tres? La página del catálogo (`SlidesPage.astro`) llama a `getSlideDecks(lang)` una vez y renderiza todos los tipos en un único timeline. Los endpoints gemelos AEO manejan todos los tipos en un solo `getStaticPaths`. Las traducciones aplican uniformemente. Y migrar un deck de un tipo a otro es un cambio de un solo campo en frontmatter — sin mover archivos.

## Renderizado de Markdown en tiempo de build

Para los decks internos, la ruta lee `deck.body` (el Markdown crudo del archivo `.md`) y lo incrusta en un `<textarea data-template>` dentro de un `<section data-markdown>`:

```html
<section data-markdown
  data-separator="^---$"
  data-separator-vertical="^--$">
  <textarea data-template>{deck.body}</textarea>
</section>
```

El plugin de Markdown de Reveal parsea el contenido del textarea al hidratar, convirtiéndolo en elementos `<section>` reales con todas las características de fragmentos, auto-animate y resaltado de código intactas.

El mecanismo anti-FOUC: el contenedor del deck empieza con `opacity-0` y transiciona a opacidad completa después de que Reveal dispara su evento `ready`. Un pequeño script inline en `SlideLayout.astro` escucha un evento custom `reveal:ready` despachado por el componente Svelte.

## SlideLayout y RevealDeck

**`SlideLayout.astro`** es el layout de pantalla completa para decks internos e incrustados. Importa el CSS de Reveal.js (ambos temas oscuro y claro) — este es el **único** layout que lo hace, asegurando que los estilos de Reveal no se filtren a otras páginas. Provee el chrome de navegación: back-link al catálogo, selector de idioma, toggle de tema y botón de fullscreen. Sincroniza el tema oscuro/claro del sitio con la clase de body de Reveal mediante un `MutationObserver` sobre `<html class="dark">`.

**`RevealDeck.svelte`** es el componente del lado del cliente que inicializa Reveal. Usa `client:only="svelte"` (una excepción documentada a la preferencia del proyecto por `client:visible`) porque Reveal necesita acceso al DOM que SSR no puede proporcionar.

El componente importa dinámicamente el core de Reveal y los plugins al montar:

```typescript
const Reveal = (await import('reveal.js')).default;
const Markdown = (await import('reveal.js/plugin/markdown')).default;
const Notes = (await import('reveal.js/plugin/notes')).default;
```

Plugins como Highlight y Math se cargan condicionalmente según las flags del frontmatter (`syntaxHighlight`, `math`), así los decks que no usan código ni ecuaciones no pagan por esos bytes.

## Aislamiento de assets

Esto era innegociable: visitar `/`, `/blog`, `/about`, o incluso `/slides` (el catálogo) debe enviar **cero bytes de Reveal.js**.

El grafo de assets por ruta de Astro maneja esto automáticamente. Como el CSS de Reveal solo se importa en `SlideLayout.astro`, y `SlideLayout` solo se usa en rutas de decks internos y embeds, los chunks de CSS solo aparecen en el HTML de esas páginas.

Verifiqué esto después del build buscando en `dist/` referencias a chunks de Reveal — solo las páginas de decks internos los referencian. Todas las demás están limpias.

## Gemelos AEO para diapositivas

El proyecto tiene una política explícita: cada página HTML debe tener un endpoint `.md` paralelo sirviendo `text/markdown` para agentes de IA. Esto se aplica con `npm run md:check:strict` en el build.

Las diapositivas siguen esta política via endpoints `[slug].md.ts`:

- **Decks internos**: el gemelo sirve el cuerpo Markdown crudo. Un agente de IA que lea `/slides/demo-revealjs-features.md` obtiene el contenido completo como Markdown legible.
- **Decks external-link**: el gemelo sirve un stub estructurado con título, descripción, metadatos del evento y la URL externa.
- **Decks external-embed**: el mismo stub más la URL de embed.

Esto significa que los agentes de IA pueden responder "¿qué diapositivas ha publicado Sergio sobre DevOps?" sin renderizar JavaScript ni parsear HTML.

## El catálogo

El catálogo tiene su propia ruta: `/slides` (y `/es/slides`). Es una página índice dedicada, no una sección pegada en otra página.

`SlidesPage.astro` obtiene todos los decks no-draft del idioma actual y los pasa a `SlidesTimelineInfiniteScroll.svelte`, un componente Svelte 5 que carga páginas progresivamente vía un endpoint JSON. El render inicial envía el primer batch; el resto llega mientras el visitante hace scroll. Esto significa que un catálogo con 100 decks no envía 100 tarjetas en el primer pintado.

Cada `SlideCard.astro` muestra la imagen hero (o un placeholder con gradiente), una pill `TypeBadge` ("Built in-house" / "External link" / "Embedded"), el título, metadatos del evento, descripción y tags. El mismo componente es reutilizable: alimenta tanto el índice dedicado de `/slides` como cualquier superficie embebida (previews en homepage, paneles de decks relacionados) que consuma el mismo endpoint JSON.

## Endurecimiento en producción

Las tres mejoras que llevaron al sistema de "funciona en mi máquina" a "le funciona a cualquiera" — ninguna fue obvia hasta que tuve decks reales corriendo frente a audiencias reales.

**Centrado vertical vs. decode tardío de imágenes.** Reveal calcula el `top` de cada slide vía su método `layout()`: `top = max((slideHeight − section.scrollHeight) / 2, 0)`. Reveal ejecuta `layout()` al inicializar — usualmente *antes* de que las imágenes raster terminen de decodificar. Con `scrollHeight` aún muy pequeño, `top` queda demasiado alto; cuando la imagen pinta, el bloque queda con espacio vacío arriba y el inferior puede salirse del canvas de 1280×720. El fix vive en `RevealDeck.svelte`: conecta handlers `load` y `error` en cada `<img>` (una sola vez) y agenda `deck.layout()` en el siguiente animation frame para que el centrado use el `scrollHeight` final. Los autores deben seguir poniendo `width` y `height` en cada imagen, pero el engine ahora maneja la carrera de timing.

**Thumbnails de overview y el preflight de Tailwind v4.** Reveal oculta las slides fuera de pantalla con el atributo `[hidden]`. El preflight de Tailwind v4 incluye su propia regla `[hidden] { display: none }`. Cuando el usuario presiona `O` para entrar al modo overview, Reveal espera mostrar todos los thumbnails — pero la regla de Tailwind los mantiene ocultos, y la pantalla de overview se renderiza en blanco. El fix: remover el atributo `[hidden]` en `overviewshown` y volver a aplicar la lógica de visibilidad de Reveal en `slidechanged`. El CSS propio de Reveal toma el control desde ahí.

**Click-to-advance sin sorpresas.** Quería que un solo click en cualquier parte del área de la slide avanzara, como un clicker. Pero el modo overview de Reveal usa los clicks para *seleccionar* una slide, no para avanzar — un doble avance se sentiría roto. El handler actual escucha clicks en el área de slide, los ignora cuando el modo overview está activo, e ignora clicks originados en links, botones o inputs (para que el contenido interactivo embebido siga funcionando). Un click, un avance, cero falsos positivos.

## Layouts primitivos y modos de fondo

El esquema y el engine son solo la mitad del sistema. La otra mitad es la ergonomía de autoría — ¿qué tan rápido voy de "deck en blanco" a "slide decente"?

La respuesta vive en `src/content/slides/_layouts/`: **19 layouts primitivos reutilizables** como snippets de Markdown copy-paste. Cada uno tiene un header explicando cuándo usarlo, la estructura HTML (helpers de Tailwind + Markdown), y un ejemplo funcional. El directorio `_layouts/` está excluido del glob de la content collection de slides, así que los snippets nunca se filtran como páginas de deck.

Los layouts cubren los arquetipos de charla que realmente necesito: `title-hero`, `section-divider`, `two-column-split`, `three-column-cards`, `image-left`, `image-right`, `image-centered`, `image-full-bleed`, `video-left`, `video-right`, `video-centered`, `quote`, `code-with-callout`, `big-stat`, `comparison-table`, `process-steps`, `timeline`, `team-avatars`, y `closing-cta`. Cada uno es responsivo — los grids de tres columnas se apilan verticalmente por debajo de 768px, las tablas reducen su font-size por debajo de 640px, etc.

Sobre los layouts viven **8 modos de fondo** en `_layouts/backgrounds/`: color sólido, gradiente (con cinco presets incluidos "Void Navy" y "Brand"), imagen con texto (`slide-bg-overlay--dark/light` para contraste garantizado), imagen fullscreen (puro impacto visual, sin texto), video con texto, video fullscreen (muted + en loop para mood cinematográfico), patrones CSS (puntos/grilla), y fondos con iframe.

Todo el sistema se tematiza a través de una capa de custom properties CSS en `src/styles/slides.css`. Tokens como `--slide-bg`, `--slide-surface`, `--slide-text`, `--slide-accent`, más las variables `--r-*` propias de Reveal, se redefinen cuando `<html class="dark">` cambia. Una sola fuente de verdad — cambias un token una vez y cada deck, cada primitivo, cada modo de fondo se actualiza al instante.

La referencia kitchen-sink es `/slides/demo-revealjs-features` (y `/es/slides/demo-revealjs-features`). Ejercita cada primitivo y cada modo de fondo en secuencia, así puedo verificar un cambio de token contra todo el sistema en una sola pasada de deck.

## Qué haría diferente

**Parseo de `<section>` en tiempo de build.** El enfoque actual (Opción A: Markdown crudo en textarea, Reveal parsea al hidratar) funciona y mantiene alta la flexibilidad de autoría, pero el HTML no es rastreable antes de que JavaScript se ejecute. Los gemelos AEO mitigan esto para agentes de IA, pero para visitantes humanos, hay un breve momento opacity-0 antes de que Reveal esté listo. Una iteración futura podría parsear el Markdown a elementos `<section>` en tiempo de build (Opción B), haciendo el HTML completamente estático y SEO-readable sin JS.

**Búsqueda facetada en el catálogo.** El catálogo con scroll infinito maneja el volumen — pero sigue siendo cronológico. Cuando el catálogo tenga más de 50 decks, filtrar por tag, evento o año será el siguiente paper cut a resolver. El modelo de datos ya lo soporta; la UI es la pieza que falta.

**Vista previa en el homepage.** El homepage tiene una `TechTalksPostsSection` que muestra los posts recientes con tag `talks`. Una `RecentDecksSection` paralela podría mostrar los decks recientes usando el mismo endpoint JSON que alimenta el scroll infinito de `/slides`. Los mismos datos, el mismo componente de card, solo con un límite inicial más pequeño.

## Recursos

- [Notas de la versión de Reveal.js v6](https://github.com/hakimel/reveal.js/releases/tag/6.0.0)
- [Guía de la función de diapositivas](/docs/features/SLIDES.md) — documentación completa de autoría
- [Demo deck en vivo](/es/slides/demo-revealjs-features) — todas las características, layouts y modos de fondo en acción
- [Catálogo de slides](/es/slides) — la página índice dedicada con scroll infinito
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) — cómo funcionan las collections y los esquemas Zod
