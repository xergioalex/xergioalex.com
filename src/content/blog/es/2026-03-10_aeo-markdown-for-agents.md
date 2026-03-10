---
title: "Markdown for Agents: Cómo Hacer que tu Contenido Hable el Idioma de la IA"
description: "La negociación de contenido existe desde HTTP/1.1. Ahora tiene un trabajo nuevo. Qué significa 'Markdown for Agents' como patrón web — y una implementación funcional con Astro y Cloudflare Pages."
pubDate: "2026-03-10T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["implementación markdown for agents", "negociación de contenido bots IA", "header Accept text/markdown", "Cloudflare markdown for agents", "contenido web legible por IA", "servir markdown a agentes IA"]
series: "aeo-journey"
seriesOrder: 2
---

Cuando un agente de IA visita una página web, recibe la respuesta HTTP completa — lo mismo que recibe un navegador. Markup de navegación, footer, scripts de cambio de tema, avisos de cookies, clases de utilidad de Tailwind, definiciones de íconos SVG, schemas JSON-LD embebidos como etiquetas script. Y en algún lugar dentro de todo eso, el contenido real.

Los agentes son buenos extrayendo señal del ruido. Pero cada token gastado en `class="text-gray-600 dark:text-gray-300"` o `<nav aria-label="Main navigation">` es un token que no se gasta entendiendo lo que la página realmente dice. Para un artículo corto, la proporción está bien. Para un post largo con una barra lateral compleja, estás quemando una parte significativa de la ventana de contexto antes de llegar al primer párrafo.

Este es un problema estructural con la entrega HTML primero. Y está adquiriendo un nombre: **Markdown for Agents**.

---

## Negociación de Contenido: Una Idea Vieja, un Trabajo Nuevo

La negociación de contenido ha sido parte de HTTP desde la versión 1.1. El cliente envía un header `Accept` describiendo el formato que quiere. El servidor responde con el formato que mejor coincide. Un navegador solicita `Accept: text/html`. Un cliente que puede trabajar con texto plano podría solicitar `Accept: text/plain`. El servidor decide qué enviar.

Durante la mayor parte de la historia de la web, este mecanismo se usó principalmente para la selección de idioma (`Accept-Language`) y compresión (`Accept-Encoding`). La negociación de formato entre HTML y otros tipos rara vez surgía en la práctica — los navegadores querían HTML y los servidores entregaban HTML.

Los agentes de IA cambian ese cálculo. Un agente que puede leer Markdown no tiene razón para preferir HTML. El Markdown es más limpio, eficiente en tokens, y lleva todo el contenido semántico sin la capa de presentación. Si un servidor puede detectar que el cliente es un agente de IA — o más precisamente, si el cliente anuncia que puede manejar `text/markdown` — el servidor puede saltarse el HTML por completo.

Esa es la idea detrás de Markdown for Agents. Enviar Markdown cuando el cliente quiere Markdown.

---

## La Propuesta de Cloudflare

En marzo de 2025, [Cloudflare publicó "Markdown for Agents"](https://blog.cloudflare.com/markdown-for-agents/) — un post que planteó el problema con claridad y propuso una implementación: conversión de HTML a Markdown en el edge. Cuando una solicitud incluye `Accept: text/markdown`, Cloudflare Workers la intercepta, obtiene el HTML, lo convierte al vuelo y devuelve Markdown limpio al agente. Sin cambios requeridos en el servidor de origen.

El post aterrizó en los círculos de desarrolladores e inició una conversación que todavía continúa. Posicionó el header `Accept: text/markdown` como el estándar emergente para esta clase de solicitud — lo que probablemente será, si el patrón se consolida.

Markdown for Agents está junto a dos otras convenciones en el conjunto de herramientas AEO: `robots.txt` (política de acceso), `llms.txt` (índice del sitio para modelos de lenguaje), y ahora negociación de contenido para entrega limpia bajo demanda. Resuelven cosas distintas. `robots.txt` dice si los bots pueden visitar. `llms.txt` les da un mapa. Markdown for Agents les da el contenido en un formato que no desperdicia su atención.

Si esto se convierte en un estándar web formal es una pregunta abierta. El IETF no lo ha estandarizado. Ningún navegador importante se preocupa por él. Pero Cloudflare es una de las redes edge más grandes del planeta, y cuando publican un post de "así es como los agentes deberían hablar con los servidores web", la industria presta atención. Creo que esta convención tiene futuro — no porque sea técnicamente novedosa, sino porque resuelve un problema real con mínima ceremonia.

---

## Cómo Funciona

El patrón tiene dos caminos de entrega:

**Negociación de contenido vía header `Accept`:**
```
Agente → GET /about
         Accept: text/markdown
Servidor → 200 OK
           Content-Type: text/markdown; charset=utf-8
           Vary: Accept
           [Contenido Markdown]
```

**Fallback por URL directa:**
```
Agente → GET /about.md
Servidor → 200 OK
           Content-Type: text/markdown; charset=utf-8
           [Contenido Markdown]
```

El enfoque de header es más limpio — el agente usa la misma URL que usaría para HTML y anuncia su preferencia. El enfoque de URL directa es más simple de implementar y funciona incluso sin middleware — es solo un archivo estático en una ruta predecible.

De cualquier forma, lo que el agente recibe es Markdown: el contenido sin el decorado. Una respuesta Markdown bien formateada para un post de blog se ve así:

```markdown
# Título del Post

> Texto de descripción

Published: 2026-03-09
Language: en
Canonical: https://example.com/blog/post-slug

---

[cuerpo del post tal como fue escrito]
```

Título, metadatos, cuerpo. Eso es todo. Sin `<head>`, sin navegación, sin anuncios, sin píxeles de analíticas. Para un post de 2.000 palabras, esto podría ser 8KB de Markdown versus 80KB de HTML con todo lo que viene junto a un sitio moderno.

El header de respuesta `Vary: Accept` es importante — le dice a los cachés de CDN que la misma URL puede devolver contenido diferente dependiendo del header `Accept`, para que un caché no sirva accidentalmente Markdown a un navegador o HTML a un agente.

---

## Una Implementación Funcional

Cloudflare tomó el camino de conversión de HTML a Markdown. Yo fui en una dirección diferente.

Este sitio está construido con Astro — cada post de blog ya es un archivo `.md`. El código fuente Markdown existe. No necesita computarse desde HTML; solo necesita servirse. Entonces en vez de conversión en el edge, el build genera archivos `.md` endpoint junto a las páginas HTML:

```
Fuente .md → [Astro build] → Página HTML (navegadores)
Fuente .md → [Astro build] → Archivo .md (agentes)
```

Dos salidas de una sola fuente. Sin artefactos de conversión, sin adivinar cómo debería verse el Markdown después de quitar etiquetas HTML. Lo que el agente lee es lo que escribí.

El resultado son 153 endpoints `.md` estáticos generados en cada build:

```
/blog/building-xergioalex-website.md       → Post EN del blog
/es/blog/building-xergioalex-website.md    → Post ES del blog
/about.md                                  → Página About
/es/about.md                               → About en español
/blog/index.md                             → Índice del blog EN con links .md
/es/blog/index.md                          → Índice del blog ES
```

Cada archivo tiene un header de metadatos — título, descripción, autor, URL canónica — seguido del cuerpo tal como fue escrito. Cero procesamiento en runtime. Los archivos `.md` están en el CDN de Cloudflare como cualquier otro asset estático.

### El Middleware

La negociación de contenido — la parte de "devolver Markdown cuando se pide" — corre en un middleware de Cloudflare Pages en `functions/_middleware.ts`. La lógica de resolución de rutas maneja slashes finales, rutas index y los distintos patrones de URL:

```typescript
function resolveMarkdownPath(pathname: string): string {
  let clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (clean === '/') return '/index.md';
  if (clean.endsWith('/index')) return `${clean}.md`;
  return `${clean}.md`;
}
```

Cuando llega una solicitud con `Accept: text/markdown`, el middleware verifica que no sea una ruta excluida (`/api/`, `/internal/`, assets estáticos), resuelve la ruta `.md`, y la obtiene vía `context.env.ASSETS.fetch()` — una API de Cloudflare Pages que accede a assets estáticos sin hacer una solicitud HTTP externa:

```typescript
async function tryServeMarkdown(context: EventContext): Promise<Response | null> {
  const accept = context.request.headers.get('accept') || '';
  if (!accept.includes('text/markdown')) return null;

  // ... verificaciones de exclusión ...

  const mdPath = resolveMarkdownPath(pathname);
  let assetResponse = await context.env.ASSETS.fetch(new Request(mdUrl.toString()));

  // Fallback: /path.md → /path/index.md
  if (!assetResponse.ok && !mdPath.endsWith('/index.md')) {
    const indexMdPath = `${mdPath.replace(/\.md$/, '')}/index.md`;
    assetResponse = await context.env.ASSETS.fetch(new Request(indexMdUrl.toString()));
  }

  if (!assetResponse.ok) return null;

  return new Response(assetResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept',
      'X-Content-Negotiation': 'markdown',
    },
  });
}
```

El fallback — intentar `/path/index.md` si `/path.md` no existe — fue algo que descubrí de la manera difícil. Las rutas como `/es/` y `/blog/` tienen archivos `index.md`, no `es.md` y `blog.md`. La primera versión del middleware devolvía 404s para esas. Lo detecté durante las pruebas, pero era uno de esos bugs que habría sido vergonzoso si hubiera llegado a producción sin el fallback: las rutas index son posiblemente las páginas más útiles para un agente navegando el sitio.

El middleware completo tiene 346 líneas incluyendo la capa de analíticas de bots de IA — que maneja un trabajo separado (rastreo server-side de crawlers de IA conocidos como GPTBot, ClaudeBot, PerplexityBot y otros 10 — los agentes no corren JavaScript, por lo que las analíticas del lado del cliente no los ven).

Puedes probar todo con un solo curl:

```bash
# Negociación de contenido
curl -H "Accept: text/markdown" https://xergioalex.com/about

# URL .md directa — sin headers necesarios
curl https://xergioalex.com/about.md
```

---

## Rastrear la Adopción

Los bots de IA no corren JavaScript. Esa es la primera complicación con cualquier analítica relacionada con agentes: el rastreo estándar de páginas es invisible para ellos. El rastreo server-side es la única opción que realmente funciona.

Cada solicitud de markdown — ya sea vía negociación de contenido o URL directa — dispara un evento `markdown_request` a Umami desde dentro del middleware. El evento captura:

| Campo | Descripción |
|-------|-------------|
| `bot` | Nombre del bot conocido (GPTBot, ClaudeBot, etc.) o `"unknown"` |
| `path` | La ruta solicitada |
| `source` | `content_negotiation` o `direct_url` |
| `user_agent` | Primeros 200 caracteres del string User-Agent |

El campo `source` es el que encuentro más interesante. Si los agentes empiezan a enviar headers `Accept: text/markdown` — la manera "correcta" de solicitar Markdown for Agents — vería eventos `content_negotiation`. Si están simplemente marcando URLs `.md` que encontraron en algún lugar, aparece como `direct_url`. La proporción me dice algo sobre cuánto conocen los agentes la convención.

Honestamente, no sé si algún agente está leyendo estos endpoints hoy. Los eventos están activos, los datos se están acumulando, pero todavía no he visto un patrón claro. El volumen es suficientemente bajo como para que las visitas individuales de bots sean difíciles de separar de pruebas, verificadores de links y lo que sea que rastrée un martes por la tarde. Lo que puedo decir es que la infraestructura está ahí.

El desafío con las analíticas de Markdown for Agents es el mismo que con cualquier otra métrica de AEO ahora mismo: estás midiendo entradas (¿está esto optimizado?), no salidas (¿está siendo citado?). No hay una API que te diga "un sistema de IA leyó tu endpoint de Markdown y lo usó en una respuesta." Desplegás la infraestructura, mirás los logs y esperás.

---

## Reflexión Honesta

¿Alguien está leyendo estos endpoints hoy? Probablemente no de forma sistemática. Ningún sistema de IA importante ha dicho públicamente que envía headers `Accept: text/markdown` o que lee preferentemente URLs `.md`. Cloudflare propuso el patrón en marzo de 2025; todavía no se ha convertido en un estándar.

Pero así es también como empiezan estas cosas. `robots.txt` era informal antes de ser estándar. `sitemap.xml` era una propuesta de Google antes de ser una convención de la industria. `llms.txt` tiene 844.000 adoptadores y John Mueller de Google diciendo que ningún sistema de IA actual lo usa — ambas cosas son simultáneamente verdad, y probablemente ambas cosas seguirán siendo verdad por un tiempo.

El patrón de Markdown for Agents no cuesta casi nada mantener en un sitio estático. Los 153 archivos `.md` agregan quizás unos pocos cientos de kilobytes a la salida del build. El middleware corre en cada solicitud pero no agrega overhead a las respuestas HTML. Y si la convención se consolida — si los agentes empiezan a enviar `Accept: text/markdown` como los navegadores envían `Accept: text/html` — la infraestructura ya está en su lugar.

Creo que la pregunta más importante no es si Markdown for Agents funciona hoy, sino qué pasa si se convierte en un estándar web. Si el W3C o el IETF formalizan la negociación de contenido para agentes de IA, los sitios sin endpoints `.md` se vuelven ciudadanos de segunda clase en la web de agentes. Los que los tienen obtienen entrega limpia desde el primer día. El costo de ser temprano es despreciable. El costo de ser tarde, si esto despega, es un proyecto de migración.

Estoy dispuesto a hacer esa apuesta.

Sigamos construyendo.

---

## Recursos

**Markdown for Agents**
- [Cloudflare: Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/) — el post que inició la conversación
- [xergioalex.com/about.md](https://xergioalex.com/about.md) — ejemplo de endpoint Markdown (URL directa)

**Estándares**
- [Negociación de Contenido HTTP — RFC 7231](https://www.rfc-editor.org/rfc/rfc7231#section-5.3.2)
- [Especificación llms.txt](https://llmstxt.org/)

**Implementación**
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
