---
title: "Las Herramientas: llms.txt, Datos Estructurados y Markdown para Agentes"
description: "Permitir los crawlers es el mínimo. Esto es todo lo que construí para hacer un sitio estático legible por máquinas — desde esquemas JSON-LD hasta endpoints nativos de Markdown."
pubDate: "2026-03-10T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["implementación especificación llms.txt", "datos estructurados JSON-LD AEO", "markdown para agentes endpoints", "negociación de contenido Accept text/markdown", "datos estructurados E-E-A-T esquema"]
series: "aeo-journey"
seriesOrder: 2
---

Permitir los crawlers es el mínimo.

Estar en la lista de permitidos en `robots.txt` significa que los bots de IA pueden visitar el sitio. Pero visitar y ser entendido son cosas distintas. Un crawler que llega a una página llena de clases de Tailwind, íconos SVG y markup de navegación tiene que filtrar mucho ruido antes de encontrar el contenido real. Y si no hay metadatos estructurados que expliquen quién escribió esto, cuándo, y qué significa — hace lo que puede con información incompleta.

El trabajo real es hacer el contenido legible por máquinas de formas que ayuden a los sistemas de IA a extraerlo, entenderlo y citarlo. Eso implica tres cosas: un menú (`llms.txt`), un vocabulario (datos estructurados) y un canal directo (endpoints de Markdown).

---

## llms.txt — Un Menú para Modelos de Lenguaje

**La versión corta:** `llms.txt` es un archivo Markdown en `/llms.txt` que le da a los modelos de lenguaje un resumen curado del sitio — qué cubre, cómo está organizado y dónde encontrar las cosas. Son unas 10-30 líneas y se escribe en minutos.

La [especificación llms.txt](https://llmstxt.org/) fue propuesta por Jeremy Howard en septiembre de 2024. La premisa es simple: en lugar de obligar a un modelo a rastrear todo el sitio para entender qué hay ahí, le das un índice estructurado. [Semrush reporta](https://www.semrush.com/blog/llms-txt/) que aproximadamente 844.000 sitios ya tienen uno — cerca del 10% de los dominios encuestados. Los primeros en adoptarlo son en su mayoría empresas orientadas a desarrolladores: Anthropic, Cloudflare, Vercel, Supabase.

John Mueller de Google dijo en junio de 2025 que "ningún sistema de IA usa llms.txt actualmente." Lo construí de todas formas.

El costo es unas pocas líneas de Markdown. Si algún modelo empieza a leerlo — y creo que eventualmente alguno lo hará — la información ya va a estar ahí. Lo pienso como el `sitemap.xml` de la era de la IA: nada glamoroso, sin garantías de hacer algo hoy, pero tan barato de mantener que vale la pena tenerlo.

Así luce el de este sitio:

```markdown
# XergioAleX.com

> Personal website and technical blog by Sergio Alexander Florez Galeano
> (XergioAleX): CTO & Co-founder at DailyBot (Y Combinator S21).

## Core Sections
- Home: /
- Blog: /blog/
- About: /about/
- Portfolio: /portfolio/
...

## Blog Tags
- tech — Software development tutorials and technical articles
- ai — Artificial intelligence and machine learning content
...

## Blog Series
- Building XergioAleX.com (8 chapters)
- Trading Journey (3 chapters)

## Crawling Guidance
- All public content is intended for indexing by search engines and LLM systems.
- Structured data (JSON-LD) is embedded on all pages for machine consumption.

## Detailed Version
For comprehensive content descriptions, see: /llms-full.txt
```

También existe un `llms-full.txt` — 130 líneas con descripciones detalladas de páginas, áreas temáticas y el stack tecnológico completo. ¿Lo está usando algún modelo hoy? Probablemente ninguno de los grandes. Pero mantenerlo no me cuesta nada.

---

## Datos Estructurados — Enseñarle a las Máquinas Quién Soy

**La versión corta:** Los datos estructurados JSON-LD le dicen a los sistemas de IA no solo qué hay en una página, sino qué significa — quién lo escribió, cuándo, de qué tipo es y cómo se relaciona con otro contenido. Las páginas con schema markup tienen [tasas de citación por IA 2,8 veces mayores](https://www.airops.com/blog/schema-markup-aeo).

Aquí es donde el AEO se vuelve concreto y, honestamente, un poco tedioso.

Los datos estructurados son E-E-A-T — Experiencia, Pericia, Autoridad y Confiabilidad — codificados en un formato que las máquinas pueden parsear directamente. Las [Quality Rater Guidelines de Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) describen lo que los evaluadores humanos buscan al valorar la calidad de un contenido. Los datos estructurados son la forma de comunicarle esas mismas señales al algoritmo.

El schema más importante de este sitio es el tipo `Person`, que aparece en todas y cada una de las páginas:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sergio Alexander Florez Galeano",
  "alternateName": "XergioAleX",
  "url": "https://xergioalex.com",
  "image": "https://xergioalex.com/images/profile.png",
  "description": "CTO & Cofounder of DailyBot (Y Combinator S21). Computer Science Engineer, MSc in Data Science, with 14+ years building digital products.",
  "jobTitle": "CTO & Co-founder",
  "worksFor": {
    "@type": "Organization",
    "name": "DailyBot",
    "url": "https://dailybot.com"
  },
  "alumniOf": [
    { "@type": "Organization", "name": "Y Combinator" },
    { "@type": "CollegeOrUniversity", "name": "Universidad Tecnológica de Pereira" }
  ],
  "knowsAbout": [
    "Software Engineering", "Artificial Intelligence", "Web Development",
    "DevOps", "Blockchain", "Algorithmic Trading", "Startup Building"
  ],
  "sameAs": [
    "https://github.com/xergioalex",
    "https://www.linkedin.com/in/xergioalex/",
    "https://x.com/XergioAleX",
    "https://www.instagram.com/xergioalex"
  ]
}
```

Cada campo tiene un propósito. `alumniOf` con Y Combinator — credibilidad institucional. `worksFor` — contexto profesional actual. `sameAs` con cuatro perfiles sociales — verificación de identidad entre plataformas. `knowsAbout` — señales de autoridad temática. Nada de eso es decorativo. Cada campo es algo que un sistema de IA puede usar al decidir si citar este sitio como fuente.

En marzo de 2025, [Google, Microsoft y OpenAI confirmaron](https://www.stackmatix.com/blog/structured-data-ai-search) que usan datos estructurados en sus funciones de IA generativa. Un [estudio de BrightEdge](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353) encontró un 44% de aumento en citaciones de búsqueda con IA para sitios con datos estructurados y bloques FAQ.

Más allá del schema `Person`, este sitio tiene 9 tipos JSON-LD en total: `BlogPosting` (con `wordCount`, `timeRequired`, `dateModified` y datos de autor anidados), `BreadcrumbList` en cada página, `Organization` para DailyBot, `WebSite`, `CollectionPage`, `ContactPage` y `ProfilePage`.

Le dediqué más tiempo a los datos estructurados que a cualquier otra parte de este proyecto. No es trabajo emocionante — escribir schemas JSON, validarlos en el Rich Results Test de Google, asegurarse de que cada página tenga los tipos correctos. Pasé una tarde entera solo en el schema `BlogPosting`, cruzando referencias en la especificación de schema.org para verificar qué propiedades usaban realmente los sistemas de IA versus cuáles eran técnicamente válidas pero ignoradas. La mayor parte del primer borrador estaba mal en detalles pequeños que requerían volver a documentación que ya había leído.

Pero es la optimización que le comunica directamente significado a las máquinas — no solo contenido, sino contexto. Quién escribió esto, por qué está calificado para escribirlo, cuándo fue actualizado por última vez. Esa es la capa que importa.

---

## Markdown para Agentes — Hablar el Idioma de las Máquinas

**La versión corta:** Cada página y post de este sitio tiene un endpoint `.md` que sirve el Markdown original. Cuando los agentes de IA solicitan `/about`, pueden obtener Markdown limpio en lugar de HTML — ya sea visitando `/about.md` directamente o enviando un header `Accept: text/markdown`. Son 153 archivos estáticos generados en cada build.

Hay un problema con el HTML que no aprecié del todo hasta que lo pensé desde el otro lado.

Un crawler que llega a una página lee barras de navegación, footers, scripts de cambio de tema, clases de Tailwind, íconos SVG y schemas JSON-LD — todo eso antes de encontrar el contenido del artículo. Estos modelos son buenos extrayendo señal del ruido. Pero los tokens gastados en markup de `<nav>` y atributos `class="text-gray-600 dark:text-gray-300"` son tokens que no se gastan en entender el contenido real.

En marzo de 2025, [Cloudflare publicó "Markdown for Agents"](https://blog.cloudflare.com/markdown-for-agents/) — una propuesta para conversión de HTML a Markdown en el edge. Cuando un agente envía `Accept: text/markdown`, la solución de Cloudflare convierte el HTML al vuelo.

El concepto me gustó, pero no quería depender de una capa de computación en el edge para algo que no necesitaba computar. El contenido de este sitio ya existe como Markdown — cada post del blog es un archivo `.md`. La fuente ya está limpia. Solo necesita servirse directamente.

La arquitectura es deliberadamente simple:

```
Source .md  →  [Astro build]  →  Página HTML (humanos)
Source .md  →  [Astro build]  →  Archivo .md (agentes)
```

Ambas salidas vienen de la misma fuente. Sin conversión de HTML a Markdown en el camino. Sin artefactos de conversión. Lo que lee el agente es exactamente lo que escribí.

El resultado: 153 endpoints estáticos `.md` generados en cada build. Posts del blog, páginas y un índice:

```
/blog/building-xergioalex-website.md     → Markdown del post
/about.md                                → Markdown de la página About
/es/blog/aeo-answer-engine-optimization.md → Este mismo post, en Markdown
/es/about.md                              → About en español
```

Cada archivo tiene un header de metadatos — título, descripción, autor, fecha, URL canónica — seguido del cuerpo tal como lo escribí. Cero impacto en el rendimiento de las páginas HTML. Los archivos `.md` son assets estáticos separados servidos desde el CDN.

### Negociación de Contenido

La parte que requirió un poco más de reflexión fue la negociación de contenido. Visitar `/about.md` directamente funciona, pero requiere conocer la convención de URLs. El enfoque más elegante: una solicitud a `/about` con un header `Accept: text/markdown` debería devolver Markdown automáticamente — sin cambiar la URL.

Eso lo maneja un middleware de Cloudflare Pages en `functions/_middleware.ts`. Cuando una solicitud incluye `Accept: text/markdown`, el middleware:

1. Verifica el header `Accept`
2. Resuelve la ruta del asset `.md` (`/about` → `/about.md`)
3. Obtiene el archivo estático vía `context.env.ASSETS.fetch()`
4. Lo devuelve con los headers correctos: `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept` y `X-Content-Negotiation: markdown`

Un agente que usa este enfoque no necesita conocer la convención de URLs `.md`. Solicita la página normalmente — la misma URL que usaría para HTML — y obtiene Markdown limpio de vuelta si anuncia esa preferencia.

```bash
# Obtener Markdown vía negociación de contenido
curl -H "Accept: text/markdown" https://xergioalex.com/about

# La URL directa .md también funciona
curl https://xergioalex.com/about.md
```

El middleware excluye `/api/*`, `/internal/*` y cualquier ruta con una extensión de archivo existente — así que solo las solicitudes reales de páginas y posts pasan por la lógica de negociación.

### Seguimiento de Solicitudes Markdown

Cada solicitud de Markdown dispara un evento `markdown_request` a Umami. El middleware distingue dos orígenes:

| Origen | Disparador |
|--------|-----------|
| `content_negotiation` | El agente envía el header `Accept: text/markdown` |
| `direct_url` | El agente navega directamente a una URL `.md` |

Cada evento captura el nombre del bot (identificado contra la misma lista de 13 bots usada para el seguimiento de crawlers de IA), la ruta solicitada, el origen y el string User-Agent. Esto me permite ver qué agentes — ClaudeBot, GPTBot, PerplexityBot, o crawlers desconocidos — están consumiendo contenido Markdown, y si están usando el enfoque basado en headers o marcando las URLs directas.

No sé si algún agente está leyendo estos endpoints hoy. La analítica está activa, pero todavía no he visto una señal clara — los agentes no siempre se identifican, y el volumen sigue siendo suficientemente bajo como para que sea difícil separar señal del ruido. Lo que sí puedo decir es que la infraestructura está ahí y el costo de construirla fue un día de trabajo.

Lo pienso como la decisión de `llms.txt`, multiplicada. El `llms.txt` es un resumen. Los endpoints `.md` son el contenido completo. Si un agente quiere leer un post entero, lo consume directamente sin parsear HTML. Si quiere indexarlo todo, hay un `/blog/index.md` con enlaces a cada archivo `.md` individual.

Cloudflare tomó el camino de la conversión en el edge. Yo tomé el camino de la fuente primero. Ambos llegan al mismo resultado. El mío tiene una ventaja: fidelidad perfecta. Sin conversión, sin artefactos, sin adivinar cómo debería verse el Markdown. Es el original.

---

## Qué Sigue

Las herramientas están construidas. Los datos estructurados están en su lugar, los crawlers tienen acceso, el contenido es legible por máquinas. Pero hay una pregunta con la que me topé repetidamente mientras construía todo esto: ¿cómo sabes si realmente está funcionando?

Puedes optimizar el contenido. Puedes servir Markdown limpio. No puedes ver fácilmente "¿con qué frecuencia me cita la IA?" de la misma forma que ves "¿cuál es mi CTR orgánico?" El problema de medición es la parte más difícil del AEO ahora mismo — y es de lo que trata el próximo capítulo.

Sigamos construyendo.

---

## Recursos

**Estándares y Especificaciones**
- [Especificación oficial de llms.txt](https://llmstxt.org/)
- [Schema.org](https://schema.org/)
- [Cloudflare: Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/)
- [Google: Introducción a Datos Estructurados](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google: Funciones de IA y Tu Sitio Web](https://developers.google.com/search/docs/appearance/ai-features)

**Investigación**
- [AirOps: Schema Markup y Tasas de Citación por IA](https://www.airops.com/blog/schema-markup-aeo)
- [BrightEdge: Schema y Visibilidad en AI Overviews](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353)
- [SEMrush: Reporte de Adopción de llms.txt](https://www.semrush.com/blog/llms-txt/)
- [Stackmatix: Datos Estructurados en Búsqueda con IA (Google, Microsoft, OpenAI)](https://www.stackmatix.com/blog/structured-data-ai-search)

**Herramientas**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Validador de Schema.org](https://validator.schema.org/)
