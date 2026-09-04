---
title: "Las mejores herramientas de presentación slides-as-code para desarrolladores"
description: "Comparación práctica de Reveal.js, Slidev, Marp y Spectacle — más la ola agéntica de 2026: Claude Design, agentes de Cursor y decks con Gemini Notebook."
pubDate: 2026-05-25T10:00:00Z
updatedDate: "2026-09-04"
tags: [tech, web-development, talks]
series: "slides-as-code"
seriesOrder: 1
heroImage: "/images/blog/posts/best-slides-as-code-presentation-tools/hero-es.webp"
heroLayout: banner
draft: false
keywords: [slides as code, herramientas de presentación, reveal.js, slidev, marp, spectacle, claude design, claude code, gemini notebook, notebooklm, presentaciones con ia, slides en markdown]
---

Si alguna vez construiste una presentación en PowerPoint, Google Slides, Keynote u otras herramientas similares, conoces el trabajo manual: arrastrar cajas, diseñar cada diapositiva a mano, acomodar imágenes pixel por pixel, perder el formato al pegar contenido y no tener control de versiones. Puedes hacer `git diff` de tu código fuente — pero no de tus diapositivas.

**Slides-as-code** es la alternativa: escribir presentaciones en Markdown, en tu IDE, con control de versiones, compatibles con CI/CD y compartibles como HTML estático. En la era de los agentes, eso importa aún más — el formato es textual y estructurado, así que los agentes pueden redactar decks casi sin error mientras yo me concentro en la narrativa.

Antes de [construir un sistema de diapositivas dentro de mi sitio Astro](/es/blog/building-slide-system-inside-astro-revealjs), evalué cada opción seria en este espacio. Este post es esa comparación — los criterios, las herramientas y los tradeoffs que llevaron a mi elección.

> **Actualizado septiembre de 2026:** Cifras de GitHub actualizadas en todo el post, y nueva sección sobre el giro agéntico — Claude Design, Claude Artifacts, Claude Code, agentes de Cursor y Gemini Notebook (antes NotebookLM).

## ¿Qué hace buena a una herramienta slides-as-code?

Antes de entrar en las herramientas, estos son los criterios que evalué:

- **Soporte de Markdown** — ¿Puedo escribir diapositivas en archivos `.md` sin salir de mi editor?
- **Resaltado de código** — ¿Resaltado de sintaxis con revelado progresivo (resaltar líneas paso a paso)?
- **Soporte matemático** — ¿KaTeX o MathJax para ecuaciones?
- **Temas** — ¿Temas basados en CSS que coincidan con el sistema de diseño de mi sitio?
- **Exportación a PDF** — ¿Para conferencias que requieren envíos en PDF?
- **Dependencia de framework** — ¿Me obliga a usar React, Vue u otro runtime?
- **Incrustabilidad** — ¿Puedo incrustar el resultado dentro de un sitio existente (no solo como app independiente)?
- **Compatibilidad con Git** — ¿El formato fuente es diffable, mergeable, revisable?
- **Mantenimiento activo** — ¿El proyecto sigue mantenido?
- **Curva de aprendizaje** — ¿Qué tan rápido puedo ir de cero a mi primera presentación?

## Reveal.js — El veterano

**[revealjs.com](https://revealjs.com)** · ~72k estrellas en GitHub · JavaScript vanilla · v6.0.1 (abril 2026)

Reveal.js es el abuelo de las presentaciones web. Creado por [Hakim El Hattab](https://hakim.se) hace casi 15 años, sigue siendo el framework de presentaciones HTML más destacado por amplio margen.

**Lo que lo distingue:**
- **Cero dependencia de framework.** JavaScript vanilla. Funciona con Astro, Next, Svelte, HTML plano — cualquier cosa que sirva una página web.
- **Ecosistema de plugins.** Markdown, resaltado de sintaxis, matemáticas (KaTeX/MathJax), notas del presentador, multiplexing, búsqueda — todo como plugins componibles.
- **Sistema de fragmentos.** El sistema de revelado progresivo más expresivo: `fade-up`, `fade-in-then-out`, `grow`, `shrink`, `highlight-red`, `strike`, con ordenamiento explícito.
- **Auto-animación.** Transiciones mágicas entre diapositivas mediante coincidencia de `data-id`.
- **Resaltado de código con revelado por pasos.** Escribe `` ```js [1-3|5|7-9] `` ` y Reveal avanza por rangos de líneas resaltadas en cada clic.
- **Fondos de pantalla completa.** Color, imagen, video (con loop/muted), o incluso un iframe en vivo como fondo.
- **Exportación a PDF.** Agrega `?print-pdf` a cualquier URL de presentación y Chrome lo imprime perfectamente.
- **v6.** La última versión trajo builds basados en Vite, tipos TypeScript incluidos y un wrapper oficial para React.

**La compensación:** Comparado con otras herramientas, Reveal pide un poco más de setup inicial y la curva de aprendizaje es algo más pronunciada. Las diapositivas son elementos HTML `<section>` (con un plugin opcional de Markdown), así que estás más cerca del metal. La ventaja es control total.

**Ideal para:** Presentaciones altamente personalizadas, portafolios, incrustación dentro de sitios existentes, equipos que necesitan extensibilidad de plugins sin atarse a un framework.

## Slidev — El rey de la experiencia de desarrollo

**[sli.dev](https://sli.dev)** · ~48k estrellas en GitHub · Vue 3 + Vite

Slidev es lo que pasa cuando alguien dice "¿qué tal si la experiencia de IDE para diapositivas fuera tan buena como para código?" Está construido específicamente para desarrolladores presentando contenido técnico, y se nota.

**Lo que lo distingue:**
- **Componentes Vue en línea.** Puedes poner `<Tweet id="..." />`, `<Youtube id="..." />`, o cualquier componente Vue directamente en tus diapositivas Markdown.
- **Resaltado de código Shiki con animaciones.** Resaltado línea por línea que anima, no solo alterna.
- **Editor Monaco.** Integra un editor tipo VS Code en tus diapositivas para demos de código en vivo.
- **Grabación integrada.** Graba tu presentación con overlay de webcam y exporta como video.
- **Diagramas Mermaid.** Soporte nativo para diagramas de secuencia, flujos, etc.
- **Temas como paquetes npm.** Temas de la comunidad instalables via `npm install`.

**La compensación:** Slidev es una **aplicación Vue/Vite independiente**, no una librería que incrustas. Ejecutas `slidev build` y obtienes una SPA estática. Si quieres diapositivas dentro de un sitio web existente que no es Vue (como un sitio Astro o Next.js), necesitarías mantener un pipeline de build separado, perder las Content Collections, el sistema i18n, el toggle de tema, la infraestructura SEO/AEO, y la integración con el sitemap del sitio host.

**Ideal para:** Charlas de conferencia para desarrolladores donde la presentación ES el producto. Equipos que ya usan Vue. Speakers que quieren grabación y código en vivo integrados.

## Marp — El minimalista

**[marp.app](https://marp.app)** · ~3.8k estrellas (CLI) · Framework Marpit · CommonMark

Marp es la herramienta que demuestra que las restricciones generan claridad. Escribe CommonMark Markdown. Agrega un frontmatter YAML para tema y paginación. Usa `---` para separar diapositivas. Listo.

**Lo que lo distingue:**
- **Curva de aprendizaje más plana.** Si conoces Markdown, conoces el 95% de Marp.
- **Extensión para VS Code.** Vista previa en vivo mientras escribes, con recarga automática.
- **Exportación a PPTX.** La única herramienta en esta lista que exporta directamente a PowerPoint.
- **Integración CI/CD.** Marp + GitHub Actions = diapositivas renderizadas automáticamente en cada push.
- **Tasa de error con LLMs casi cero.** El formato es tan mínimo que las herramientas de IA casi nunca producen Markdown Marp inválido.

**La compensación:** Interactividad limitada. No tiene fragmentos (revelado progresivo al hacer clic). No tiene demos de código en vivo. El sistema de estilos es poderoso (CSS completo) pero los valores por defecto son de grado presentación, no de grado experiencia web.

**Ideal para:** Diapositivas rápidas de Markdown a PDF. Presentaciones de sprint review. Documentación como diapositivas. Equipos que quieren diapositivas en su pipeline de CI sin ceremonia.

## Spectacle — El nativo de React

**[formidable.com/open-source/spectacle](https://formidable.com/open-source/spectacle/)** · ~10k estrellas en GitHub · React 18+

Spectacle toma el enfoque opuesto a Marp: si conoces React, ya conoces Spectacle. Las diapositivas son componentes JSX.

**Lo que lo distingue:**
- **Ecosistema completo de React.** Cualquier librería de React funciona en tus diapositivas — gráficos, mapas, visualización de datos, demos interactivas.
- **Vista previa de código en vivo.** Muestra código ejecutándose junto a su fuente, editable en tiempo real.
- **Soporte Markdown.** Via el componente `MarkdownSlideSet`, para quienes prefieren escribir sobre JSX.
- **Mantenimiento activo.** v10.2.3 (octubre 2025), más de 180 contribuidores en 10 años.

**La compensación:** Requiere React 18+. El bundle es más pesado que Reveal o Marp. Si tu sitio no es React, agregar Spectacle significa agregar un segundo runtime de framework.

**Ideal para:** Equipos de React que quieren diapositivas que se sientan como su código de producto. Presentaciones con elementos interactivos pesados o visualización de datos.

## Menciones honorables

**Impress.js** (~38k estrellas) — La experiencia tipo Prezi en JavaScript vanilla. Diapositivas posicionadas en espacio 3D con transformaciones CSS. Espectacular para narrativas espaciales, pero nicho.

**WebSlides** (~6k estrellas) — Hermosos valores por defecto con 40+ componentes reutilizables. Navegación horizontal y vertical. Menos mantenido activamente pero funcional.

**Pandoc + Beamer** — El pipeline LaTeX. Escribe Markdown, convierte a PDF Beamer via Pandoc. Ideal para academia.

## El giro agéntico — decks escritos por agentes

El cambio más grande desde que publiqué esta comparación no es un framework nuevo — es *quién escribe el deck*. Los agentes pasaron de "ocasionalmente útiles" a autores de primera clase, y alrededor de eso creció una generación de herramientas nativas de IA. Este es el panorama de 2026.

### Claude Design — El conversacional

**[claude.ai/design](https://claude.ai/design)** · Anthropic Labs

Claude Design es la herramienta de diseño conversacional de Anthropic. Describes el deck en lenguaje natural — "un deck de resultados del Q1 de 10 diapositivas, tema oscuro, nuestras fuentes de marca" — y genera una presentación completa que refinas diapositiva por diapositiva, en la misma conversación.

**Lo que lo distingue:**
- **Salida HTML interactiva.** Los decks se renderizan como HTML vivo, no como imágenes estáticas — incluyendo animaciones que llevan la narrativa a través de las diapositivas.
- **Consciente de marca.** Con un sistema de diseño configurado, las diapositivas respetan automáticamente tus colores, tipografía y assets.
- **Exportación real.** HTML independiente, PPTX, PDF, enviar a Canva — o pasarle el deck a Claude Code para seguir iterando en un repo.
- **Colaborativo.** Comparte con permisos de ver, comentar o editar; varias personas pueden chatear con el agente en el mismo hilo.

**La compensación:** Es design-first, no git-first. La fuente de verdad vive en la conversación hasta que exportas — no hay Markdown diffable por debajo.

**Ideal para:** Decks pulidos con fecha límite, equipos sin diseñador, el 80% de las presentaciones que nunca necesitó un sistema de temas personalizado.

### Claude Artifacts — El de cero setup

En cualquier plan de Claude — incluido el gratuito — puedes generar un deck HTML completo como artifact, previsualizarlo en vivo en el chat e iterar conversacionalmente. Es el camino más rápido de "tengo un outline" a "tengo algo presentable", y puedes descargar el HTML independiente cuando sea suficiente.

**La compensación:** Cada deck es HTML a medida. Sin ecosistema de plugins, sin sistema de temas, nada reutilizable entre decks.

**Ideal para:** Decks de un solo uso, presentaciones internas, prototipar una narrativa antes de comprometerte con una herramienta real.

### Claude Code — El que cierra el círculo

Aquí es donde los agentes y el slides-as-code se encuentran: [Claude Code](https://claude.com/product/claude-code), el agente de código de Anthropic, puede autorar el deck *dentro de tu repo* — escribir el Markdown, conectar el frontmatter, hacer commit y abrir un PR. El formato que los agentes escriben mejor resulta ser exactamente el formato del que habla todo este post.

No es hipotético — así se construyen los decks de este sitio. Yo describo la charla, el agente escribe el Markdown y los metadatos, Reveal lo renderiza. Yo reviso el diff, no las cajas de las diapositivas.

**La compensación:** Necesitas el scaffolding primero — un pipeline de decks donde tu agente pueda escribir. De eso trata [el siguiente post de esta serie](/es/blog/building-slide-system-inside-astro-revealjs).

**Ideal para:** Desarrolladores que quieren que los decks sean contenido: versionado, revisable, renderizado en CI, autorable por agentes.

### Cursor — Agentes, no canvases

La gente pregunta si Cursor — el editor de código AI-first — tiene un "canvas" para construir diapositivas. No lo tiene, y ese es justo el punto: los agentes de Cursor escriben decks *en los mismos frameworks slides-as-code de arriba* — Slidev, Marp, Reveal — dentro de tu repositorio. El mismo ciclo que Claude Code, distinto editor. El framework sigue siendo tuyo; el agente solo es el autor.

**Ideal para:** Equipos que ya viven en Cursor y quieren que los decks fluyan por su proceso normal de revisión.

### Gemini Notebook — El fundamentado

**[El cuaderno de investigación de Google](https://support.google.com/gemininotebook/answer/16757456)** · Antes NotebookLM, renombrado en julio de 2026

NotebookLM se convirtió en Gemini Notebook en julio de 2026 — el mismo producto, con una integración más profunda con Google. Para presentaciones, la función estrella es Slide Decks: lo apuntas a las fuentes de tu notebook y genera un deck completo, con visuales del modelo de imágenes Nano Banana Pro de Google. Desde marzo de 2026 puedes revisar cualquier diapositiva por prompt y exportar como PPTX o PDF. Y cuando un deck no es el medio correcto, los Video Overviews (incluida la variante Cinematic) convierten las mismas fuentes en video narrado.

**Lo que lo distingue:**
- **Generación fundamentada.** Cada deck se construye a partir de *tus* fuentes — docs, papers, notas — no del conocimiento general del modelo.
- **Un ciclo de edición real.** Revisiones por diapositiva mediante prompts; cada regeneración queda como un nuevo deck con el que puedes comparar.
- **Exportación a PPTX y PDF.** Para todos los usuarios desde marzo de 2026.
- **También video.** Slideshows narrados y Cinematic Video Overviews desde las mismas fuentes.

**La compensación:** El estilo del deck es de grado consumidor, no un sistema de diseño que controlas tú. Y es lo opuesto a código — nada que diferenciar, nada que versionar.

**Ideal para:** Flujos de investigación-a-deck, material de estudio, convertir un montón de documentos en una presentación o un video narrado.

## Plataformas en línea y con IA

No todo necesita ser código. Aquí es cuando las plataformas en la nube tienen más sentido:

| Plataforma | Fortaleza | Ideal para |
|---|---|---|
| **[Gamma](https://gamma.app)** | Genera presentaciones completas desde prompts | Presentaciones rápidas generadas por IA |
| **[Pitch](https://pitch.com)** | Edición colaborativa en tiempo real | Pitch decks para equipos |
| **[Beautiful.ai](https://beautiful.ai)** | Motor de diseño IA que auto-organiza contenido | Presentaciones con diseño pesado sin diseñador |
| **[slides.com](https://slides.com)** | Editor WYSIWYG construido sobre Reveal.js por el mismo autor | Decks estilo Reveal sin escribir código |
| **Google Slides** | Compatibilidad universal | Entornos corporativos, colaboración entre equipos |
| **Canva** | Biblioteca masiva de plantillas | Presentadores no técnicos |
| **[Claude Design](https://claude.ai/design)** | Generación conversacional de decks consciente de marca | Decks pulidos en HTML/PPTX sin tocar código |
| **[Gemini Notebook](https://support.google.com/gemininotebook/answer/16757456)** | Decks y videos fundamentados en tus propias fuentes | Decks respaldados por investigación, overviews narrados |

Estas plataformas resuelven problemas diferentes al slides-as-code. Si tu audiencia son inversionistas o un equipo no técnico, Google Slides o Pitch pueden ser la opción pragmática. Si tu audiencia son desarrolladores y tu contenido es código, las herramientas slides-as-code de arriba son lo que quieres. Y la línea sigue desdibujándose: Claude Design exporta HTML independiente y Gemini Notebook exporta PPTX, así que las herramientas agénticas suelen estar a un solo export del mundo del código.

## La tabla comparativa completa

| Característica | Reveal.js | Slidev | Marp | Spectacle |
|---|---|---|---|---|
| **Tecnología** | JS vanilla | Vue 3/Vite | Node.js | React 18+ |
| **Markdown** | Plugin | Nativo | Nativo | Componente |
| **Dependencia** | Ninguna | Vue | Ninguna | React |
| **Código** | Revelado por pasos | Animaciones Shiki | Básico | Vista previa |
| **Matemáticas** | KaTeX/MathJax | KaTeX | MathJax/KaTeX | Limitado |
| **Fragmentos** | Rico | Básico | No | Básico |
| **Auto-animación** | Sí | Sí | Morphing (v4) | No |
| **Exportar PDF** | `?print-pdf` | Sí | Nativo (+ PPTX) | Sí |
| **Incrustable** | Sí | No (independiente) | Limitado | No (independiente) |
| **Ext. VS Code** | No | No | Sí | No |
| **Grabación** | No | Integrada | No | No |
| **Estrellas GitHub** | ~72k | ~48k | ~3.8k | ~10k |
| **Curva aprendizaje** | Media | Media (Vue ayuda) | Baja | Media (React) |

## Mi elección — y por qué (slides-as-code dentro de mi propio sitio)

Quería integrar un sistema **slides-as-code** dentro de mi propio sitio para mis charlas técnicas — que [xergioalex.com](https://xergioalex.com) mismo fuera el host de los decks, no un servicio externo. Por eso elegí **Reveal.js**.

El factor decisivo no fue que Reveal tenga la mejor experiencia de desarrollo (Slidev gana ahí) ni la curva de aprendizaje más plana (Marp gana). Fue la **incrustabilidad**.

Necesitaba que las diapositivas vivieran *dentro* de mi sitio web Astro — como contenido de primera clase, con el mismo soporte multilingüe, el mismo sistema de temas, la misma infraestructura SEO y AEO que mis posts del blog. Reveal es JavaScript vanilla que puedo inicializar en un componente Svelte, dentro de un layout Astro, importando CSS solo en las páginas de presentación. Sin segundo runtime de framework. Sin pipeline de build separado.

El giro agéntico desde entonces no cambió esa conclusión — la reforzó. Cuando un agente puede autorar el deck, el formato que eliges *es* la interfaz, y un archivo Markdown diffable es la interfaz que tanto humanos como agentes revisan mejor. Los agentes también escriben HTML a medida, pero nadie quiere revisar ese diff.

En el [siguiente post de esta serie](/es/blog/building-slide-system-inside-astro-revealjs), recorreré exactamente cómo lo construí: un catálogo de tres tipos de presentaciones con esquemas de unión discriminada, renderizado de Markdown en tiempo de build, aislamiento de assets, gemelos AEO, y sincronización de tema oscuro/claro en vivo.

## Recursos

- [Reveal.js](https://revealjs.com) — Sitio oficial
- [Slidev](https://sli.dev) — Sitio oficial
- [Marp](https://marp.app) — Sitio oficial
- [Spectacle](https://formidable.com/open-source/spectacle/) — Sitio oficial
- [Impress.js](https://impress.js.org) — Sitio oficial
- [Claude Design](https://claude.ai/design) — Herramienta conversacional de decks de Anthropic
- [Claude Code](https://claude.com/product/claude-code) — Agente de código de Anthropic
- [Cursor](https://cursor.com) — Editor de código AI-first
- [Gemini Notebook](https://support.google.com/gemininotebook/answer/16757456) — Ayuda de Slide Decks (antes NotebookLM)
- [Gamma](https://gamma.app) — Plataforma de presentaciones IA
- [Pitch](https://pitch.com) — Presentaciones colaborativas
