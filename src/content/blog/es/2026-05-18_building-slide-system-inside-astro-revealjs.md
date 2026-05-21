---
title: "Construyendo un sistema de diapositivas multilingüe dentro de Astro con Reveal.js"
description: "Cómo construí un catálogo de presentaciones de tres tipos dentro de mi sitio Astro — uniones discriminadas, gemelos AEO, aislamiento de assets y más."
pubDate: 2026-05-18T10:00:00Z
tags: ["web-development", "talks", "astro", "svelte", "portfolio"]
series: "slides-as-code"
seriesOrder: 2
heroImage: "/images/blog/posts/building-slide-system-inside-astro-revealjs/hero-es.webp"
heroLayout: side-by-side
draft: true
keywords: [astro diapositivas, integración reveal.js astro, slides como contenido, esquema unión discriminada, gemelos AEO markdown, sistema de presentaciones]
---

Después de [investigar las herramientas de slides-as-code que hoy existen para desarrolladores](/es/blog/best-presentation-tools-for-developers-2026) —Reveal.js, Slidev, Marp, Spectacle y un puñado más— elegí [Reveal.js](https://revealjs.com) para construir el sistema de presentaciones de mi sitio.

La meta era concreta: quería que mis charlas vivieran en el mismo lugar que mi blog. No repartidas entre Google Slides, un PDF colgado en algún lado y un dominio externo, sino dentro de mi sitio y tratadas como contenido de primera clase: misma Content Collection, mismo i18n, mismo SEO que cualquier post.

Y había una segunda condición: que el sistema se pudiera pilotar con agentes de IA. Si las slides son texto plano —archivos `.md` en el repo— un agente puede generar una, reordenar una sección o traducir un deck entero igual que edita cualquier otro archivo, y yo me quedo con lo que de verdad importa: la narrativa.

Este post es el caso de estudio de cómo lo construí: las decisiones de arquitectura, los tres tipos de presentaciones que el sistema soporta, y los problemas que solo aparecieron cuando empecé a usarlo frente a audiencias reales.

## ¿Por qué Reveal.js?

La comparación completa, herramienta por herramienta, vive en [un análisis aparte de las opciones de slides-as-code](/es/blog/best-presentation-tools-for-developers-2026). Aquí me interesa la otra mitad: por qué Reveal encajó en mi sitio donde las demás no. Y casi todo se reduce a una distinción: **Reveal.js es una librería; las alternativas más fuertes son aplicaciones.** Una librería la importo dentro de mi propio build; una aplicación me obliga a mantener la suya en paralelo.

Reveal es JavaScript vanilla, sin dependencia de framework. Lo importo en un componente Svelte, lo inicializo al montar, y el resto de la página sigue siendo Astro estándar: mismo build, mismas Content Collections, mismo i18n, mismo SEO. La frontera de integración cabe en unas pocas decenas de líneas. Encima trae lo que necesito para charlas técnicas —Markdown nativo, fragments, auto-animate, resaltado de código por pasos— como plugins componibles, sin atarme a ningún runtime.

Las demás opciones que evalué eran buenas, pero cada una chocaba con esa misma frontera. **Marp** es el más fácil de aprender, pero su interactividad es limitada —sin fragments, sin demos de código en vivo— y sus valores por defecto apuntan a un PDF de grado presentación, no a una experiencia web dentro de mi sitio. **Spectacle** es elegante si tu proyecto ya corre sobre React; el mío no, así que adoptarlo significaba meter un segundo runtime de framework solo para las diapositivas.

El caso más difícil de descartar fue **Slidev**, porque tiene la mejor experiencia de autoría del grupo. Pero Slidev no es una librería, es una aplicación. Para usarlo dentro de un sitio Astro tendría que mantener dos universos en paralelo: el `package.json` de Astro y el de Slidev, con Vue, Vite y todo su árbol de dependencias. Dos pipelines de build. Dos sistemas de tema que no se hablan entre sí —el de UnoCSS de Slidev y el mío de Tailwind v4, que vive en `<html class="dark">`.

Y, sobre todo, perdería las Content Collections de Astro: sin validación Zod, sin filtrado de borradores, sin `getCollection()`. La salida de Slidev es una SPA con routing basado en hash, invisible para `@astrojs/sitemap`. Reveal evita todo eso por una razón de fondo: es algo que incrusto, no algo que tengo que hospedar aparte.

## Tres tipos de decks, una sola Content Collection

El sistema soporta tres tipos de presentaciones. No fue una decisión de diseño anticipada: los tres salieron del inventario de lo que ya tenía que mostrar.

1. **Decks internos.** Charlas escritas en Markdown dentro del repo, que Reveal renderiza en tiempo de build. El tema, la transición y el syntax highlighting se controlan desde el frontmatter.
2. **Decks externos incrustados.** Presentaciones que ya viven en Google Slides o Speaker Deck y permiten incrustarse vía `<iframe>`. Las muestro embebidas dentro de una página propia, con mi navegación alrededor (back-link, selector de idioma, breadcrumb).
3. **Decks externos con enlace.** Presentaciones hospedadas en sitios que bloquean iframes con `X-Frame-Options` o CSP. Para esas no intento incrustar algo que va a fallar: genero una página de información con título, descripción, evento y fecha, más un botón para abrir el deck en su sitio original.

Son tres porque cada uno responde a una situación distinta. Sin el tercer tipo, las charlas en sitios restrictivos quedarían fuera del catálogo o aparecerían con un iframe roto. Y separar los dos tipos externos no es redundante: marca explícitamente cuándo el sistema *puede* incrustar y cuándo es más honesto enlazar.

Los tres viven en una sola Content Collection (`slides` en `src/content.config.ts`), con un schema Zod modelado como unión discriminada:

```typescript
const slideSchema = z.discriminatedUnion('type', [
  internalSlideSchema,     // type: 'internal'
  externalLinkSlideSchema, // type: 'external-link'
  externalEmbedSlideSchema // type: 'external-embed'
]);
```

Cada variante extiende un schema base (título, descripción, fecha del evento, tags, draft) con campos propios de su tipo. La ventaja concreta aparece en el código que consume los decks: cuando escribo `if (deck.data.type === 'internal')`, TypeScript ya sabe que `deck.data.theme` existe en esa rama. Sin casting, sin chequeos adicionales en runtime; la unión discriminada hace el trabajo.

Usar una sola colección en lugar de tres simplifica todo lo que viene después. El catálogo en [`/es/slides`](/es/slides) llama `getSlideDecks(lang)` una vez y renderiza los tres tipos en un mismo timeline. Los endpoints `.md` para agentes manejan todos los tipos en un solo `getStaticPaths`. Y migrar un deck de un tipo a otro es cambiar un campo en el frontmatter, sin mover archivos.

## El renderizado: Reveal lee Markdown nativo

Los decks internos no necesitan un parser propio. La ruta toma `deck.body` —el Markdown crudo del archivo `.md`— y lo incrusta dentro de un `<textarea>` que Reveal sabe interpretar:

```html
<section data-markdown
  data-separator="^---$"
  data-separator-vertical="^--$">
  <textarea data-template>{deck.body}</textarea>
</section>
```

El plugin de Markdown de Reveal parsea ese contenido al hidratar y lo convierte en elementos `<section>` reales, con fragmentos, auto-animate y resaltado de código intactos.

El trade-off es claro y conviene nombrarlo: el HTML inicial no contiene las slides, así que antes de que el JavaScript corra el deck está vacío. Para evitar el parpadeo, el contenedor arranca en `opacity-0` y solo se hace visible cuando Reveal dispara su evento `ready`. A cambio de ese pequeño costo, gano una flexibilidad de autoría que las alternativas no ofrecían.

## Aislamiento de assets: cero bytes fuera de las slides

Una condición era innegociable: visitar `/`, `/blog`, `/about` o incluso el catálogo en `/slides` no debe cargar **ni un byte de Reveal.js**. No es purismo de performance. Reveal y su CSS son intrusivos —controlan el tamaño del viewport, el comportamiento del scroll, los atajos de teclado— y si esos estilos se filtran al resto del sitio, las páginas normales se rompen de formas difíciles de diagnosticar.

El grafo de assets por ruta de Astro resuelve esto sin esfuerzo extra. El CSS de Reveal se importa únicamente en `SlideLayout.astro`, y ese layout solo lo usan las rutas de decks internos e incrustados. Por lo tanto, los chunks de Reveal aparecen exclusivamente en el HTML de esas páginas. Lo confirmé tras el build buscando referencias a esos chunks en `dist/`: solo las páginas de decks las incluyen; el resto del sitio queda limpio.

## Gemelos AEO: una `.md` por cada `.html`

El sitio tiene una política explícita: cada página HTML debe tener un endpoint `.md` paralelo que sirva `text/markdown`, para que los agentes de IA lean el contenido sin renderizar JavaScript ni parsear HTML. Está documentada en `docs/aeo/MARKDOWN_FOR_AGENTS.md` y se valida con `npm run md:check:strict` durante el build.

Las diapositivas cumplen esa política mediante endpoints `[slug].md.ts`:

- En decks internos, el gemelo sirve el cuerpo Markdown en crudo. Un agente que lea `/es/slides/demo-revealjs-features.md` obtiene el contenido completo en texto legible.
- En `external-link` y `external-embed`, sirve un stub estructurado con título, descripción, metadatos del evento y la URL externa (más la de embed cuando aplica).

El resultado es que un agente puede responder *"¿qué charlas ha publicado Sergio sobre DevOps?"* sin abrir un navegador.

## El catálogo

El catálogo tiene ruta propia en [`/es/slides`](/es/slides) y es una página índice dedicada, no una sección añadida al blog.

`SlidesPage.astro` recoge todos los decks no-draft del idioma actual y se los pasa a `SlidesTimelineInfiniteScroll.svelte`, un componente Svelte 5 que carga páginas progresivamente a través de un endpoint JSON. El render inicial entrega el primer lote y el resto llega a medida que el visitante hace scroll, de modo que un catálogo con cien decks no envía cien tarjetas en el primer pintado.

Cada `SlideCard.astro` muestra la imagen hero (o un placeholder con gradiente), una etiqueta con el tipo de deck, el título, los metadatos del evento, la descripción y los tags. El mismo componente alimenta tanto el índice de `/slides` como cualquier superficie embebida —previews en el homepage, paneles de decks relacionados— que consuma ese endpoint JSON.

## Los problemas que solo aparecen con audiencia

La arquitectura funcionaba en mi máquina mucho antes de funcionar para cualquiera. Tres problemas concretos marcaron esa diferencia, y ninguno era evidente hasta que tuve decks reales, con imágenes reales, frente a una sala.

**Las miniaturas del overview salían en blanco.** Reveal oculta las slides fuera de pantalla con el atributo `[hidden]`, y el preflight de Tailwind v4 trae su propia regla `[hidden] { display: none }`. Al presionar `O` para entrar al modo overview, Reveal intenta mostrar todas las miniaturas, pero la regla de Tailwind las mantiene ocultas y la pantalla queda vacía. El diagnóstico fue lo costoso; la solución son pocas líneas: remover el atributo `[hidden]` en el evento `overviewshown` y dejar que el CSS de Reveal recupere el control.

**El centrado vertical se calculaba antes de tiempo.** Reveal fija el `top` de cada slide con su método `layout()`, aproximadamente `(slideHeight − section.scrollHeight) / 2`. El problema es que `layout()` corre al inicializar, normalmente antes de que las imágenes raster terminen de decodificarse. Con un `scrollHeight` todavía pequeño, el `top` queda demasiado alto; cuando la imagen finalmente pinta, el bloque deja un espacio vacío arriba y puede salirse del canvas de 1280×720. La solución vive en `RevealDeck.svelte`: conectar handlers `load` y `error` en cada `<img>` una sola vez y reagendar `deck.layout()` en el siguiente animation frame, para que el centrado use el `scrollHeight` final. Los autores siguen declarando `width` y `height` en cada imagen; el engine se encarga del problema de timing.

**El click para avanzar chocaba con el modo overview.** Quería que un click en cualquier parte de la slide avanzara la presentación, como un control remoto. Pero en modo overview Reveal usa el click para *seleccionar* una slide, no para avanzar, y un doble avance se sentiría defectuoso. El handler actual escucha los clicks en el área de slide, los ignora mientras el overview está activo y también cuando provienen de un link, botón o input, de modo que el contenido interactivo embebido sigue funcionando. Un click, un avance, sin falsos positivos.

## La capa de autoría: primitivos y modos de fondo

El schema y el engine son la mitad del sistema. La otra mitad es la ergonomía de autoría, que es la que decide si voy a querer escribir el siguiente deck: ¿qué tan rápido paso de un archivo en blanco a una slide presentable?

La respuesta vive en `src/content/slides/_layouts/`, con **19 layouts primitivos reutilizables** en forma de snippets de Markdown listos para copiar. Cada uno incluye una cabecera que explica cuándo usarlo, la estructura HTML (helpers de Tailwind más Markdown) y un ejemplo funcional. El directorio `_layouts/` está excluido del glob de la content collection, así que los snippets nunca se publican como páginas de deck.

Los layouts cubren los arquetipos de charla que realmente uso: `title-hero`, `section-divider`, `two-column-split`, `three-column-cards`, `image-left/right/centered/full-bleed`, `video-left/right/centered`, `quote`, `code-with-callout`, `big-stat`, `comparison-table`, `process-steps`, `timeline`, `team-avatars` y `closing-cta`. Todos son responsivos: los grids de tres columnas se apilan por debajo de 768px y las tablas reducen su tamaño de fuente por debajo de 640px.

Sobre los layouts hay **8 modos de fondo** en `_layouts/backgrounds/`: color sólido, gradiente (con cinco presets, entre ellos "Void Navy" y "Brand"), imagen con texto (con overlay que garantiza contraste), imagen a pantalla completa, video con texto, video a pantalla completa (sin sonido y en loop), patrones CSS y fondos con iframe.

Todo se tematiza desde una capa de custom properties en `src/styles/slides.css`. Tokens como `--slide-bg`, `--slide-surface` y `--slide-accent`, junto con las variables `--r-*` propias de Reveal, se redefinen cuando `<html class="dark">` cambia. Modificar un token actualiza al instante cada deck, cada primitivo y cada modo de fondo. El [demo deck en vivo](/es/slides/demo-revealjs-features) ejercita cada primitivo y cada fondo en secuencia, y me sirve como referencia completa y como prueba visual cuando ajusto un token.

## Lo que dejé pendiente

**Parsear las `<section>` en build time.** El enfoque actual deja el HTML opaco hasta que Reveal se ejecuta. Los gemelos AEO compensan eso para los agentes de IA, pero para los crawlers tradicionales y para el primer pintado humano queda ese breve instante en `opacity-0`. Una iteración futura podría convertir el Markdown en elementos `<section>` durante el build. Lo pospuse porque, por ahora, mantener la flexibilidad de autoría pesa más.

**Búsqueda facetada en el catálogo.** El scroll infinito resuelve el volumen, pero el orden sigue siendo cronológico. Cuando el catálogo supere los 50 decks, filtrar por tag, evento o año será el siguiente detalle a resolver. El modelo de datos ya lo soporta; falta la interfaz.

**Preview en el homepage.** El homepage ya tiene una `TechTalksPostsSection` que muestra los posts etiquetados con `talks`. Una `RecentDecksSection` paralela podría mostrar los decks recientes usando el mismo endpoint JSON del scroll infinito de `/slides`: los mismos datos, el mismo componente de tarjeta, solo con un límite inicial más pequeño.

Lo que más me convence del resultado es lo poco ceremonioso que se volvió crear un deck nuevo. Abro un archivo `.md`, escribo, lo reviso en `/es/slides`, lo presento y queda archivado, y el agente que recorre el sitio puede leerlo igual que cualquier artículo. No hay un dominio aparte, ni un build aparte, ni un sistema de temas paralelo. Es, en esencia, un post que en lugar de leerse se presenta.

## Recursos

- [Notas de la versión de Reveal.js v6](https://github.com/hakimel/reveal.js/releases/tag/6.0.0)
- [Guía de la función de diapositivas](/docs/features/SLIDES.md) — documentación completa de autoría
- [Demo deck en vivo](/es/slides/demo-revealjs-features) — todas las características, layouts y modos de fondo en acción
- [Catálogo de slides](/es/slides) — la página índice dedicada con scroll infinito
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) — cómo funcionan las collections y los esquemas Zod
