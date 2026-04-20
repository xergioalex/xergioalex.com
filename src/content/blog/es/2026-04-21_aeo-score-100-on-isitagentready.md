---
title: "Lo que de verdad hace falta para sacar 100 en isitagentready.com"
description: "Cuatro categorías, ocho artefactos, dos scorecards peleándose entre sí y una regresión de WebMCP: el trabajo real tras un 100 en isitagentready.com."
pubDate: "2026-04-21T15:00:00"
heroImage: "/images/blog/posts/aeo-score-100-on-isitagentready/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "web-development", "ai"]
keywords: ["isitagentready.com 100", "sitio listo para agentes", "well-known api-catalog", "oauth protected resource metadata", "mcp server card", "webmcp provideContext", "cloudflare pages headers RFC 8288", "content signals robots.txt", "lighthouse robots-txt"]
series: "aeo-from-invisible-to-cited"
seriesOrder: 5
---

Hace unos días, en [mi recap de la Agents Week 2026 de Cloudflare](/es/blog/cloudflare-agents-week-2026/), escribí sobre la herramienta de esa semana que más se me quedó dando vueltas: [isitagentready.com](https://isitagentready.com/). Convierte una pregunta vaga — *"¿mi sitio está listo para ser descubierto por la IA?"* — en un solo número de 0 a 100. Cuatro categorías, cada una con su spec, cada una con su chequeo pasa/no-pasa.

Escaneé xergioalex.com y saqué **33/100**. Este es el capítulo 5 de mi serie [AEO: De Invisible a Citado](/es/blog/series/aeo-from-invisible-to-cited/) — y es el capítulo donde dejo de escribir sobre lo que podría hacerse y empiezo a enviar código. Es una guía práctica: para cada una de las cuatro categorías que mide el scorecard, qué requiere realmente el spec, y exactamente qué puse en `xergioalex.com` para ganar cada punto.

Seamos honestos desde el principio: **el 33 no fue un cold-start.** La categoría Content ya estaba en 100 porque capítulos previos de esta serie habían enviado [Markdown for Agents](/es/blog/aeo-markdown-for-agents/) (content negotiation más endpoints `.md` para cada página) y `llms.txt` / `llms-full.txt` (sitemaps escritos para modelos de lenguaje). El sitio también ya tenía analíticas de bots de IA — el middleware de Cloudflare Pages en `functions/_middleware.ts` detectaba doce crawlers conocidos y registraba sus visitas. El 33 es lo que sacas cuando un sitio de contenido moderno se topa con un scorecard que además te pide primitivas a nivel de protocolo que nadie estaba enviando todavía.

El arco, en resumen: envié ocho artefactos repartidos entre las cuatro categorías y llegué a **92/100**. Después una sola línea en `robots.txt` empezó a pelear con el audit de SEO de Lighthouse; resolver *eso* me empujó a 100/100 — pero una semana después el scorecard endureció su chequeo de WebMCP y en silencio me bajó de vuelta a 92. Dos beats de reconciliación, uno detrás del otro. El 100 final solo quedó firme después de los dos. Me los gano en las secciones 4 y 5.

El resto del post recorre cada categoría de punta a punta: qué requiere el spec, qué se envió, y los dos lugares donde el puntaje no se sostuvo a la primera.

## Qué mide realmente el scorecard

Antes del trabajo, una orientación corta. [isitagentready.com](https://isitagentready.com/) divide "listo para agentes" en cuatro categorías, cada una con sus propios chequeos:

1. **Content** — ¿tu contenido está en una forma que los agentes de IA pueden parsear sin problema? (Endpoints Markdown, content negotiation, datos estructurados.)
2. **Discoverability** — ¿un agente que haga un solo `HEAD /` puede encontrar la superficie programática de tu sitio? (Link headers, metadata canónica.)
3. **Bot Access Control** — ¿les dijiste a los crawlers de IA qué pueden y qué no pueden hacer con tu contenido? (Señales en `robots.txt`.)
4. **APIs, Auth, MCP & Skill Discovery** — ¿tu superficie programática está descrita en los archivos canónicos `.well-known/*`, con metadata OAuth para discovery y MCP server cards? (Seis documentos JSON más una API de navegador.)

Cada categoría tiene su propio SKILL.md dentro de `isitagentready.com/.well-known/agent-skills/<skill>/SKILL.md`. Esos son los specs vinculantes: documentos cortos que te dicen, en inglés claro, qué chequea la herramienta y cuál es la respuesta mínima válida. Antes de escribir una sola línea de código, traje todos esos SKILL.md y los hice mi fuente de verdad. Cualquier cosa que construyera tenía que coincidir con esos ejemplos byte por byte, no con mi intuición de qué querían los RFCs.

Sin teatro. Donde un spec pedía un campo que no aplica a un sitio de contenido estático, llené la forma con honestidad y usé un campo `_comment` para explicar la situación — más abajo hay un ejemplo. Donde un spec se podía satisfacer con un JSON mínimo y válido, envié el mínimo. Todo artefacto en este post es real, todo commit es real, y cualquiera que lo lea puede clonar los patrones.

## El 33/100 de partida

Así se veía el desglose en la primera pasada:

| Categoría | Score | Qué faltaba |
|---|---|---|
| Content | **100** / 100 | Nada — los endpoints `.md` ya estaban vivos. |
| Discoverability | 67 / 100 | Header `Link:` en las respuestas de `/` y `/es/`. |
| Bot Access Control | 50 / 100 | Directiva `Content-Signal` en `robots.txt`. |
| APIs, Auth, MCP & Skills | 0 / 100 | Los seis documentos `.well-known/*` + WebMCP. |

La mayoría de sitios de contenido hoy estarían más o menos en el mismo punto. Ese es el punto del scorecard: define una nueva línea base, no una revisión de la vieja. El trabajo se divide en tres baldes — un par de edits de headers / robots, seis documentos JSON bajo `.well-known/`, y un pequeño componente de navegador.

Hora de ir categoría por categoría.

## 1. Content: ya en 100 (gracias a trabajo previo)

Content estaba en 100 desde el primer día gracias a trabajo anterior en la serie. [Markdown for Agents](/es/blog/aeo-markdown-for-agents/) montó una capa de content negotiation que sirve versiones limpias en Markdown de cada página a los crawlers de IA — y endpoints `.md` independientes en rutas predecibles. El chequeo de Content del scorecard busca exactamente esa estructura: si un crawler manda `Accept: text/markdown`, ¿el servidor responde con Markdown real en vez de una sopa de HTML que tiene que raspar?

Para `xergioalex.com`, la respuesta es sí. El middleware de Cloudflare Pages en `functions/_middleware.ts` observa los headers `Accept` entrantes; si un bot de IA pide Markdown, el middleware trae el archivo `.md` correspondiente del build output y lo devuelve con `Content-Type: text/markdown; charset=utf-8`. Cada página HTML tiene su contraparte `.md` — verificado por el script de paridad `md:check` que corre en CI.

Traducción: el chequeo de Content se trata de si tu sitio ya respeta el formato preferido del agente. Si lo construiste con Astro o algo similar moderno, probablemente estás cerca de pasar sin trabajo extra. El capítulo Markdown for Agents tiene el spec completo; este post no lo recapea.

## 2. Discoverability: una línea en `_headers`

El chequeo de Discoverability busca un header de respuesta HTTP `Link:` apuntando a una descripción legible por máquina de la superficie programática de tu sitio. [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) define el formato; [RFC 9727 §3](https://www.rfc-editor.org/rfc/rfc9727#section-3) registra `api-catalog` como tipo de relación válido. El SKILL.md acepta cualquiera de `api-catalog`, `service-desc`, `service-doc`, o `describedby` — escogí el más específico y lo apunté al API catalog que vamos a enviar en la sección 4.

En Cloudflare Pages, los headers de respuesta viven en `public/_headers`:

```text
/
  Link: </.well-known/api-catalog>; rel="api-catalog"

/es/
  Link: </.well-known/api-catalog>; rel="api-catalog"
```

Literalmente ese es todo el fix. Discoverability subió de 67/100 a 100/100. Tanto la homepage en inglés como la de español emiten el header en cada respuesta.

Un detalle que me costó un minuto: Cloudflare Pages aplica las reglas de `_headers` en el edge, no en el build de Astro. Los headers no aparecen en un `npm run dev` local. Verifiqué buildeando local con `npm run build`, corriendo `wrangler pages dev dist`, e inspeccionando la respuesta con `curl -sI http://localhost:8788/` — ahí sí salen.

Traducción: Discoverability es barato. Es una promesa que dice "si quieres la versión legible por máquina de este sitio, busca acá". Dos líneas de config, un archivo, listo.

## 3. APIs, Auth, MCP & Skill Discovery: seis documentos JSON + un bridge de navegador

Esta es la categoría donde 0 se convierte en 100 de un solo golpe — seis de mis ocho artefactos viven aquí, más el bridge WebMCP. El scorecard chequea:

1. `/.well-known/api-catalog` — un linkset listando tus APIs con enlaces a sus specs OpenAPI y docs humanas.
2. `/.well-known/oauth-authorization-server` — metadata del authorization server OAuth.
3. `/.well-known/oauth-protected-resource` — qué recursos están protegidos y por qué authorization servers.
4. `/.well-known/mcp/server-card.json` — el MCP server card anunciando las capacidades de tu sitio.
5. `/.well-known/agent-skills/index.json` — un índice de las agent skills que tu sitio publica, cada una con un digest SHA-256.
6. Una superficie WebMCP a nivel navegador — agentes corriendo en el browser del usuario pueden llamar `navigator.modelContext.registerTool()` para encontrar las tools que expones.

### La decisión honesta sobre OAuth

Antes de construir nada, tenía una pregunta de diseño que resolver. `xergioalex.com` es un sitio de contenido estático. Tiene endpoints JSON de solo lectura — `/api/posts.json`, `/api/series/{lang}`, y similares — pero ningún recurso protegido, ningún auth de usuario, ningún bearer token. Los chequeos OAuth del scorecard igual quieren seis campos obligatorios en `/.well-known/oauth-authorization-server` y dos en `/.well-known/oauth-protected-resource`. ¿Qué pones en esos campos cuando no tienes nada que proteger?

Tres opciones sobre la mesa:

1. **Stub honesto** — publicar los campos obligatorios con endpoints en rutas reservadas pero no funcionales. Agregar un campo `_comment` explicando la situación.
2. **Apuntar a un issuer upstream real** — solo honesto si el sitio realmente usa uno. No lo hace.
3. **Saltarse** — aceptar la deducción del scorecard, no llegar al 100/100.

Escogí la opción 1. El spec pide *presencia* de los campos, no *función* de los endpoints. Un agente que lea la metadata de discovery puede ver, en el mismo documento, que el authorization endpoint es una ruta reservada que no acepta flujos OAuth reales todavía. El campo `_comment` lo deja explícito:

```json
{
  "_comment": "xergioalex.com has no protected APIs today. This document is published for agent-readiness compliance per RFC 8414 / OIDC Discovery 1.0. Endpoints are reserved paths; they do not currently accept real OAuth flows.",
  "issuer": "https://xergioalex.com",
  "authorization_endpoint": "https://xergioalex.com/oauth/authorize",
  "token_endpoint": "https://xergioalex.com/oauth/token",
  "jwks_uri": "https://xergioalex.com/.well-known/jwks.json",
  "grant_types_supported": ["authorization_code"],
  "response_types_supported": ["code"]
}
```

Para `/.well-known/oauth-protected-resource`, la forma honesta es una autoreferencia: *este recurso está gobernado por el authorization server (stub) del mismo sitio*. Es una tautología, pero una verdadera, y [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728) lo permite.

Traducción: *la honestidad le gana al teatro*. Documentos que apuntan a nada pero te dicen que apuntan a nada son mejores que documentos que mienten. Un agente puede razonar sobre eso.

### El API catalog

[RFC 9727](https://www.rfc-editor.org/rfc/rfc9727) define el API catalog como un documento `application/linkset+json` — JSON con un Content-Type específico — en `/.well-known/api-catalog`. Cada entrada del linkset se ancla en una URL base y carga `links[]` con dos valores de rel requeridos: `service-desc` (spec legible por máquina, usualmente OpenAPI) y `service-doc` (documentación humana).

El sitio no tenía un spec OpenAPI, así que escribí uno mínimo en `public/openapi.json` — un documento 3.1 cubriendo `/api/posts.json`, `/api/posts-en.json`, `/api/posts-es.json`, `/api/series/{lang}`, y `/api/timeline/{lang}`. Más corto que un proyecto de fin de semana; los schemas se apoyan en `type: array` y `type: object` sin modelar cada campo exhaustivamente.

El catalog en sí apunta `service-desc` a ese archivo OpenAPI y `service-doc` a `llms.txt` (ya enviado desde el trabajo previo de Markdown for Agents):

```json
{
  "linkset": [
    {
      "anchor": "https://xergioalex.com/api/",
      "links": [
        { "rel": "service-desc", "href": "https://xergioalex.com/openapi.json", "type": "application/json" },
        { "rel": "service-doc", "href": "https://xergioalex.com/llms.txt", "type": "text/plain" }
      ]
    }
  ]
}
```

El archivo vive en `public/.well-known/api-catalog` — sin extensión, a propósito. El Content-Type es `application/linkset+json`, no el default `application/json`, así que agregué un override en `public/_headers`:

```text
/.well-known/api-catalog
  Content-Type: application/linkset+json
  Cache-Control: public, max-age=300, must-revalidate
```

Este detalle me costó un rebuild. La primera versión se sirvió como `application/json` y me sorprendió que el scorecard la rechazara. El SKILL.md literalmente dice "NOT `application/json`" en la sección de trampas. Se me pasó. Lee tus specs.

### MCP server card y el índice de skills

El MCP Server Card ([SEP-1649](https://github.com/modelcontextprotocol/modelcontextprotocol)) vive en `/.well-known/mcp/server-card.json`. La estructura son cuatro campos: `serverInfo.name`, `serverInfo.version`, `transport.endpoint`, y `capabilities[]`. El array `capabilities` toma valores string de `tools`, `resources`, `prompts` — strings planos, no un objeto anidado como había dibujado en el primer draft.

El índice de Agent Skills Discovery es donde se pone interesante. El RFC v0.2.0 de Cloudflare define `/.well-known/agent-skills/index.json` como un documento con un identificador `$schema` (opaco — no tiene que resolver) y un array `skills[]`. Cada entrada nombra una skill, enlaza a un archivo `SKILL.md`, e incluye un digest SHA-256 — una huella del archivo, misma idea que un hash de commit de Git — de los bytes servidos de ese archivo.

Pude haber escrito mis propios SKILL.md. Por ahora estoy en modo pointer: mi índice referencia los ocho SKILL.md canónicos de Cloudflare en `isitagentready.com/.well-known/agent-skills/<skill>/SKILL.md`, con el digest calculado desde los bytes servidos por Cloudflare al momento de generación. Un script pequeño en `scripts/generate-agent-skills-index.mjs` trae cada URL, la hashea, y escribe el índice:

```js
async function sha256OfUrl(url) {
  const res = await fetch(url);
  const bytes = new Uint8Array(await res.arrayBuffer());
  const hex = createHash('sha256').update(bytes).digest('hex');
  return `sha256:${hex}`;
}
```

La primera pasada produjo el digest equivocado. Había hasheado la representación local en memoria de la respuesta — pero el spec quiere los bytes *como se sirven*. Fix: un cambio de una sola línea, usar `arrayBuffer()` en vez de hacer un round-trip por `text()` a través de un string. El índice ahora tiene ocho entradas, cada una con un digest real que coincide con lo que sirve el CDN de Cloudflare.

El generador corre en `prebuild`, conectado en `package.json`:

```json
"prebuild": "npm run generate:agent-skills-index",
"generate:agent-skills-index": "node scripts/generate-agent-skills-index.mjs"
```

Cada build futuro regenera el índice desde los bytes vivos de Cloudflare. Si Cloudflare actualiza un SKILL.md, el digest se actualiza en el próximo deploy.

### WebMCP: la superficie del navegador

El último chequeo de esta categoría es el único que no es un archivo estático. [WebMCP](https://webmachinelearning.github.io/webmcp/) es una API del navegador — `navigator.modelContext.provideContext()` — y el scorecard carga la página en un browser sin cabeza para ver si tu sitio publica alguna tool al cargar.

Cada tool necesita `name`, `description`, un `inputSchema` que sea JSON Schema válido, y un callback `execute`. El spec moderno las recibe todas de golpe vía `provideContext({ tools })`; una variante antigua las acepta una por una vía `registerTool(tool, { signal })`. El scanner hace timeout si ninguna de las dos llamadas ocurre dentro de su sesión de browser, así que el bridge tiene que hidratar temprano.

Escribí un componente Svelte 5 en `src/components/agent/WebMCPBridge.svelte`. No renderiza nada visible. Monta en `client:load` — hidratar al cargar la página, no en idle, para ganarle al timeout del scanner — feature-detecta la API, y publica tres tools de solo lectura que mapean a endpoints que el sitio ya expone. Los navegadores modernos toman el camino de `provideContext`; los shims legacy caen a `registerTool` con una señal de `AbortController` para poder revocar el registro cuando el componente se desmonte:

```svelte
const tools = [
  {
    name: 'search_blog',
    description: 'Search xergioalex.com blog posts by keyword.',
    inputSchema: {
      type: 'object',
      properties: { q: { type: 'string' }, lang: { type: 'string', enum: ['en', 'es'] } },
      required: ['q'],
    },
    execute: async ({ q, lang: l }) => { /* fetch /api/posts-{lang}.json, filter, return top 20 */ },
  },
  // list_series, open_post...
];

if (typeof mc.provideContext === 'function') {
  mc.provideContext({ tools });
} else if (typeof mc.registerTool === 'function') {
  for (const tool of tools) mc.registerTool(tool, { signal });
}
```

Tres tools, todas de solo lectura: `search_blog`, `list_series`, `open_post`. Sin escrituras, sin acciones destructivas, nada cross-origin. El wiring es un import más un elemento dentro de `MainLayout.astro`. Cada página que use el layout — efectivamente todo el sitio público — ahora carga el bridge.

Un detalle que vale la pena apuntar: la primera versión de ese componente llamaba `registerTool(tool, { signal })` dentro de un loop y montaba con `client:idle`. Ambas elecciones se sentían razonables — `registerTool` es lo que documenta el SKILL.md de Cloudflare, `client:idle` es la estrategia de hidratación más perezosa de Astro, perfecta para un componente invisible. Volveré a esto en un momento, porque ninguna de las dos sobrevivió la siguiente actualización del scorecard. Por ahora, el post salió con ese código y la categoría se puso verde al primer intento.

Después de la sección 3, APIs/Auth/MCP/Skills salta de 0 a 100. Combinado con Content (100) y Discoverability (100), el sitio se para en **92/100**. Bot Access Control sigue en 50. Ahí es donde se pone interesante.

## 4. Bot Access Control: una línea, dos scorecards, una reconciliación

El chequeo de Bot Access Control hace una pregunta simple: ¿tu sitio dijo algo sobre cómo los crawlers de IA pueden usar tu contenido? El chequeo vive en `robots.txt` y busca la directiva `Content-Signal` — un [IETF draft](https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/) que extiende el tradicional `Allow/Disallow` con tres ejes independientes específicos de IA: `ai-train`, `search`, y `ai-input`. El scanner no califica qué valores escogiste; solo califica que la directiva exista y que la sintaxis sea válida. La elección es tuya.

Escogí:

```text
User-agent: *
Allow: /
Disallow: /api/
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

Razonamiento: este es un blog técnico personal cuya moneda es ser leído, citado y referenciado por otros. Los tres ejes de `Content-Signal` son independientes: `ai-train` controla si mi contenido puede entrar en los corpus de entrenamiento de futuros LLM base, `search` controla la indexación clásica en buscadores, y `ai-input` controla si mi contenido puede ser traído y citado en respuestas de IA en tiempo real (ChatGPT Search, Perplexity, Google AI Overviews, Claude Search). Para un sitio como este, decir `no` en cualquiera de los tres es cambiar descubribilidad por protección que en realidad no necesito. `ai-input=yes` es el link de vuelta cuando un asistente me cita en una respuesta. `ai-train=yes` es mi nombre dentro del conocimiento del modelo base — cuando alguien hace una pregunta general en un tema del que escribo, el modelo puede nombrarme sin que nadie tenga que hacer retrieval. Estar en uno solo de los tres canales es estrictamente peor que estar en los tres. `yes` en los tres ejes no es el default neutral — es la posición coherente para contenido cuyo trabajo es ser encontrado.

Dejo anotado el contraargumento obvio: esta postura está mal para publishers cuyo modelo de ingresos depende de gatillar contenido — medios, investigación bajo paywall, bases de datos por suscripción. Para esos sitios, `ai-train=no` y `ai-input=no` sí tienen sentido. El punto de que la directiva tenga tres ejes es justo ese: que distintos publishers puedan expresar políticas distintas sin que todo colapse en un único `allow/disallow`. La mía es solo una elección coherente dentro de ese espectro.

Por cierto, no arranqué en esta posición. La primera versión que envié de este archivo era el default defensivo: `ai-train=no, search=yes, ai-input=no`. Puso el scorecard en verde y se quedó ahí una semana. Después — portando el mismo patrón a un sitio hermano — me tocó escribir el razonamiento en voz alta para alguien más, y los dos `no` dejaron de tener sentido. El punto entero de este blog es ser leído, citado y referenciado. ¿Decirle `no` a entrenamiento y a citación en tiempo real estaba protegiendo qué, exactamente? No lo pude defender como algo que no fuera un reflejo. Cambié la directiva, reescribí el párrafo de arriba, y seguí. El git history de `public/robots.txt` todavía tiene las dos versiones, y no me da pena — la directiva es de esas líneas de config que uno debería esperar revisar a medida que entiende mejor qué es su sitio.

Lo envié. isitagentready.com se puso verde en Bot Access Control: **100/100**, score total saltó a 100. ¡Victoria!

Solo que no.

### La línea que rompió Lighthouse

Dos minutos después del deploy, corrí `npm run lighthouse` para asegurarme de que nada más hubiera regresado. La categoría SEO para cada página había caído de 1.00 a 0.92.

El culpable, según el panel de diagnóstico del mismo Lighthouse: *"robots.txt is not valid — Unknown directive at line 4"*. El parser estaba rechazando `Content-Signal`.

Esta es una incompatibilidad real, no un bug en mi archivo. El audit `robots-txt` de Lighthouse implementa [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309) estrictamente, y RFC 9309 no incluye `Content-Signal` — es un draft que todavía no ha aterrizado en ningún RFC adoptado. Curiosamente, [RFC 9309 §2.2.3](https://www.rfc-editor.org/rfc/rfc9309#section-2.2.3) dice explícitamente que los parsers DEBEN ignorar las directivas desconocidas — así que Lighthouse está siendo más estricto que el spec que dice cumplir. Pero eso no me ayuda en el corto plazo.

Primer reflejo: sacar `Content-Signal` de `robots.txt`. Reescribí el archivo con la directiva comentada y agregué un header de respuesta HTTP en `/robots.txt`, declarando la señal a nivel header.

Funcionó para Lighthouse — SEO volvió a 1.00. Pero el siguiente scan de `isitagentready.com` bajó Bot Access a 1/2. El scanner lee `robots.txt` línea por línea buscando la directiva; no parsea comentarios y no trae los headers de respuesta HTTP. Score total: **92/100**.

Dos scorecards. Ambos válidos. Ambos requiriendo cosas opuestas.

### La resolución: rewrite por user-agent

El fix fue una función de middleware en Cloudflare Pages que sirve un `robots.txt` levemente distinto según quién pregunte. El archivo estático completo — con la directiva `Content-Signal` — le llega a todo el mundo: Googlebot, Bingbot, GPTBot, ClaudeBot, usuarios, el scanner de `isitagentready.com`, cualquier otro crawler.

Para un conjunto específico de user-agents (Lighthouse CI, Lighthouse en las DevTools de Chrome, Google PageSpeed Insights — todos con `Chrome-Lighthouse` o `PageSpeed` en el UA string), el middleware trae el archivo estático, le quita la línea `Content-Signal`, y devuelve el resultado con un header `Vary: User-Agent` para que los caches se comporten correctamente. Lighthouse ve un `robots.txt` limpio que pasa su audit estricto; todos los demás clientes ven la directiva completa.

La función vive en `functions/_middleware.ts`:

```ts
const LIGHTHOUSE_UA_PATTERN = /Chrome-Lighthouse|PageSpeed|Lighthouse/i;

async function tryRewriteRobotsForLighthouse(context) {
  const url = new URL(context.request.url);
  if (url.pathname !== '/robots.txt') return null;
  const ua = context.request.headers.get('user-agent') || '';
  if (!LIGHTHOUSE_UA_PATTERN.test(ua)) return null;

  const res = await context.env.ASSETS.fetch(new Request(new URL('/robots.txt', url.origin).toString()));
  const body = (await res.text()).replace(/^Content-Signal:.*\r?\n?/m, '');
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Vary': 'User-Agent',
    },
  });
}
```

¿Esto es cloaking? Técnicamente, la misma ruta sirve bytes distintos según el user-agent del request, así que sí. Pero la política de cloaking de Google apunta específicamente a search engines versus usuarios: servirle a Googlebot algo diferente de lo que ven los humanos. Aquí, Googlebot, Bingbot, y cualquier otro crawler de ranking igual reciben el `robots.txt` completo. Los únicos clientes que ven la versión stripped son *herramientas de calidad* de la familia Lighthouse — Lighthouse no rankea páginas, las califica. Remover un falso positivo conocido de un parser estricto de la vista de un auditor no es lo mismo que esconder contenido de una página a un ranker.

Traducción: este fue un workaround estrecho para una rareza de un parser estricto, no un cambio de política. Y cuando Lighthouse se actualice al IETF draft — o cuando `Content-Signal` aterrice en una actualización de RFC de robots.txt — el middleware se vuelve código muerto y lo borro.

Después de que el middleware aterrizó, Bot Access Control volvió a 2/2. Lighthouse SEO se quedó en 1.00. Los dos scorecards en 100. Tomé el screenshot, celebré, seguí con otra cosa.

Una semana después volví a correr el scorecard y el score había bajado a 92/100. API, Auth, MCP & Skill Discovery ahora marcaba 5/6. Nada en el sitio había cambiado.

## 5. La regresión de WebMCP: los scanners se endurecen

El ítem que fallaba era el chequeo runtime de WebMCP. El texto exacto del error:

> **Goal:** Support WebMCP to expose site tools to AI agents via the browser.
> **Issue:** Browser session timed out.
> **Fix:** Implement the WebMCP API by calling `navigator.modelContext.provideContext()` with tool definitions.

Dos cosas habían cambiado — ninguna en mi codebase, las dos en cómo validaba el scorecard el chequeo:

**El nombre de la API.** Nuestro bridge llamaba `navigator.modelContext.registerTool(tool, { signal })`, que es lo que el SKILL.md de Cloudflare todavía documenta. Pero el [draft actual de WebMCP](https://webmachinelearning.github.io/webmcp/) canonicaliza `provideContext(context)`: una sola llamada que toma un objeto con un array `tools`. El browser sin cabeza que corre el scorecard fue actualizado para escuchar `provideContext` y ya no observa llamadas a `registerTool`. Para ese scanner, un sitio que solo llama `registerTool` se ve igual que un sitio que no publica ninguna tool.

**La ventana de timing.** Aun llamando la API correcta, `client:idle` era un bug latente esperando a morder. Esa directiva de Astro hidrata el componente solo cuando el browser reporta idle vía `requestIdleCallback`. En un browser sin cabeza rápido con presupuesto de sesión corto, "idle" nunca llega antes de que la sesión se cierre, y el componente nunca hidrata. Las tools nunca se estaban registrando — probablemente tampoco una semana antes. Estaba recibiendo crédito por un registro que pasaba demasiado tarde para contar, y la primera versión del scanner era lo suficientemente laxa para dejarlo pasar.

El fix fueron dos líneas de código más una corrección del modelo mental.

Primero, el bridge ahora feature-detecta las dos formas de la API y toma la moderna cuando está disponible:

```ts
if (typeof mc.provideContext === 'function') {
  mc.provideContext({ tools });
} else if (typeof mc.registerTool === 'function') {
  controller = new AbortController();
  for (const tool of tools) mc.registerTool(tool, { signal: controller.signal });
}
```

Segundo, el mount cambió de `client:idle` a `client:load` en `MainLayout.astro`. El bridge hidrata tan pronto corre el JavaScript de la página — sigue siendo después de parsear el HTML, sigue sin bloquear el first paint, pero garantizado que ocurre dentro de la ventana de sesión del scanner.

Siguiente scan: 100/100. El chequeo `webMcp` pasó con `provideContext`. Bot Access se quedó en 2/2 porque el middleware de la sección 4 está estrictamente scopeado por user-agent. Lighthouse SEO se quedó en 1.00. Level 5 Agent-Native.

Traducción: un scorecard en verde no es un monumento. Es un snapshot de dónde se para tu sitio frente a un objetivo que se mueve. Las primitivas que envié están atadas a specs reales y no caducan — pero los *validadores* que las chequean sí se actualizan, y normalmente se actualizan *agregando* requisitos, no relajándolos. Cada semana escribiendo feature detection defensiva es una semana de prevención de regresiones.

## 6. Cómo se ve el 100

Aquí está el snapshot final.

<figure>
<img src="/images/blog/posts/aeo-score-100-on-isitagentready/figure-scorecard-100.webp"
     alt="Scorecard de isitagentready.com para xergioalex.com mostrando un score total de 100, Level 5 Agent-Native, con Discoverability 3/3, Content 1/1, Bot Access Control 2/2, y API, Auth, MCP & Skill Discovery 6/6."
     width="1020"
     height="893"
     loading="lazy" />
<figcaption>isitagentready.com contra xergioalex.com, después del set completo de cambios: 100/100, Level 5 Agent-Native, cada categoría en su máximo. — <a href="https://isitagentready.com/">Califica tu propio sitio</a>.</figcaption>
</figure>

Apila los ocho artefactos, los dos caminos del middleware, y el bridge WebMCP. Cualquier agente de IA que le pegue a `xergioalex.com` ve, en orden:

1. Una respuesta HTML con un header `Link: </.well-known/api-catalog>; rel="api-catalog"`.
2. Un cuerpo HTML cuyo gemelo en markdown está a un `Accept: text/markdown` (o a una URL `.md`) de distancia.
3. Un `robots.txt` declarando `Content-Signal: ai-train=yes, search=yes, ai-input=yes` — a menos que el UA sea de la familia Lighthouse, en cuyo caso el middleware le quita esa línea para que el parser estricto pueda seguir calificando el resto.
4. Un API catalog apuntando a un spec OpenAPI 3.1 real y a docs legibles por humanos.
5. Un documento de metadata OAuth authorization-server — honesto, anotado, estructuralmente compatible.
6. Un documento OAuth protected-resource — una autoreferencia válida.
7. Un MCP server card declarando que el sitio soporta `tools` y `resources`.
8. Un índice agent-skills con ocho entradas y digests SHA-256, regenerado en cada build contra los bytes vivos de Cloudflare.
9. Una página de navegador que llama `navigator.modelContext.provideContext({ tools })` al cargar con tres tools de solo lectura — o que cae a `registerTool` uno por uno si la API moderna no está disponible.

Eso es una superficie de protocolo real. Nada de esto era posible hace unas semanas — ninguno de los drafts de arriba existía como spec enviado todavía. Todo se armó encima de una preocupación sobre la que venía escribiendo hace meses: que la medición del AEO iba años atrás de la optimización del AEO. Hoy, ya no.

## Lecciones

*Lección: la honestidad le gana al teatro.* Los documentos OAuth que apuntan a nada son mejores que los documentos OAuth que mienten. El campo `_comment` no es trampa; es una forma compatible con el spec de decir "la forma está acá; la función no". Los agentes pueden razonar sobre eso. Fabricar endpoints funcionales habría sido peor — tanto para la confianza como para el mantenimiento cuando alguien después se pregunte qué hace `/oauth/authorize` realmente.

*Lección: el directorio `.well-known/` es solo JSON.* La mayor parte del trabajo es leer los ejemplos canónicos de SKILL.md y coincidirlos byte por byte. Rebuildéé dos veces: una por el Content-Type equivocado en el API catalog, otra por el encoding SHA-256 equivocado en el índice de skills. Los dos eran errores pequeños sobre los que el SKILL.md me había advertido en su sección de trampas. Lee tus specs, incluso cuando creas que ya sabes qué van a decir.

*Lección: alinea el server card con la superficie WebMCP.* El MCP server card anuncia `capabilities: ["tools", "resources"]`, y el componente WebMCP registra tres tools. Describen la misma superficie de agente a dos granularidades distintas. Si alguna vez agregas una tool, agrégala en los dos lugares.

*Lección: dos scorecards pueden estar en desacuerdo, y eso está bien.* El audit `robots-txt` de Lighthouse y el chequeo Bot Access Control de `isitagentready.com` quieren cosas opuestas ahora mismo. Los dos están correctos bajo sus specs respectivos. La resolución no es escoger uno — es servir lo correcto a la audiencia correcta y dejar una nota corta del por qué. Cuando los specs se reconcilien, el workaround desaparece.

*Lección: los scanners se endurecen; escribe tu detección a la defensiva.* La regresión de WebMCP no fue un bug que yo introduje; fue un validador poniéndose más estricto sobre una API que siempre había sido ambigua entre `registerTool` y `provideContext`. El fix — feature-detectar las dos, tomar la moderna, caer a la legacy — también es la forma que sobrevive el *siguiente* endurecimiento. En un mes, `provideContext` puede crecer campos obligatorios que el SKILL.md todavía no menciona. El bridge que era opinionado sobre una sola API era frágil; el bridge que feature-detecta las dos es durable. Aplica el mismo instinto en cada sitio donde toques un spec emergente.

*Lección: la directiva es un vocabulario; la política es tuya.* `Content-Signal` no te dice qué escoger — te da palabras precisas para tres usos distintos que un único `allow/disallow` solía aplastar en uno. Cumplir con el spec es barato. Ser intencional sobre qué valores aterrizan en tu sitio es el ejercicio aparte, y la primera respuesta a la que uno va con el instinto rara vez es la correcta — vas a caer por default en el reflejo del publisher ("no me entrenes, no me cites") hasta en sitios cuyo punto entero es ser encontrados. Vale la pena decir tu respuesta en voz alta, idealmente a alguien que está configurando la misma directiva en un sitio de otro tipo, porque ahí es donde te das cuenta de si escogiste una postura o heredaste una.

## Qué sobrevive a un cambio de scorecard

`isitagentready.com` es el scorecard de un solo vendedor, y las definiciones pueden cambiar. Lighthouse va a actualizar su parser eventualmente. El draft de `Content-Signal` puede o no volverse un RFC.

Qué sobrevive a todo eso: los archivos `.well-known/` mismos. Cada uno está atado a un estándar real de IETF o WHATWG — [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288), [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727), [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728), [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414). Esos no se van a ninguna parte. Aunque toda herramienta de scorecard desaparezca mañana, las primitivas que envié siguen válidas y siguen haciendo su trabajo para cualquier crawler de IA que respete los estándares.

Si estás construyendo un sitio hoy y quieres seguir este camino, los archivos SKILL.md en `isitagentready.com/.well-known/agent-skills/` son el mejor punto de partida. Para el deep dive por-endpoint — qué es cada documento `.well-known/`, por qué existe, y el ejemplo mínimo válido — el siguiente capítulo de la serie (`aeo-well-known-field-guide`) va endpoint por endpoint.

Sigo construyendo.

## Recursos

- [Introducing the Agent Readiness score](https://blog.cloudflare.com/agent-readiness/)
- [isitagentready.com](https://isitagentready.com/)
- [RFC 8288 — Link headers](https://www.rfc-editor.org/rfc/rfc8288)
- [RFC 9727 — API Catalog](https://www.rfc-editor.org/rfc/rfc9727)
- [RFC 9728 — OAuth Protected Resource Metadata](https://www.rfc-editor.org/rfc/rfc9728)
- [RFC 8414 — OAuth Authorization Server Metadata](https://www.rfc-editor.org/rfc/rfc8414)
- [RFC 9309 — Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309)
- [Content Signals draft (IETF)](https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/)
- [contentsignals.org](https://contentsignals.org/)
- [Cloudflare Agent Skills Discovery RFC](https://github.com/cloudflare/agent-skills-discovery-rfc)
- [MCP Server Card — SEP-1649 / PR #2127](https://github.com/modelcontextprotocol/modelcontextprotocol)
- [WebMCP](https://webmachinelearning.github.io/webmcp/)
- [Cloudflare Pages `_headers` docs](https://developers.cloudflare.com/pages/configuration/headers/)
