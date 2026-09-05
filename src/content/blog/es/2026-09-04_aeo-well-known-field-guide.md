---
title: "La Explosión de .well-known: Guía de Campo a los Nuevos Estándares para Agentes"
description: "Guía de campo de la familia .well-known para agentes de IA: Link headers, API Catalog, OAuth, MCP, skills y Web Bot Auth, con cabuya.org como ejemplo real."
pubDate: "2026-09-04T19:30:00"
heroImage: "/images/blog/posts/aeo-well-known-field-guide/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "web-development", "ai-agents", "cloudflare", "mcp", "aeo"]
keywords: ["well-known endpoints", "RFC 8288 Link headers", "RFC 9727 API Catalog", "RFC 9728 OAuth Protected Resource Metadata", "MCP Server Card SEP-1649", "Agent Skills Discovery", "Web Bot Auth", "Content Signals"]
series: "aeo-from-invisible-to-cited"
seriesOrder: 6
draft: false
---

Cada dominio de internet tiene una carpeta donde cualquiera puede llamar sin pedir permiso: `/.well-known/`. No es una metáfora — es una ruta fija que la [RFC 8615](https://www.rfc-editor.org/rfc/rfc8615) (los RFC son los documentos con los que Internet define sus reglas) reservó hace años para decir: *lo que un sitio quiere que el mundo sepa de antemano, vive aquí*. Los clientes la llevan usando una década — ahí viven `openid-configuration` para inicio de sesión, `security.txt` para reportar vulnerabilidades, los desafíos de ACME para emitir certificados.

Lo nuevo es quién llegó a la carpeta. Durante 2025 y 2026 se llenó de archivos que no están escritos para humanos ni para navegadores, sino para agentes de IA — programas que visitan sitios a leer y a actuar, no a mirar. Cuando un agente llega a tu sitio no ve tu diseño, tu navegación ni tu copy cuidadoso. Le conviene hacer lo que haría un mensajero con prisa: ir directo a la recepción. La carpeta `.well-known/` es esa recepción.

Esta guía recorre la familia completa, en el orden en que la implementarías en un sitio nuevo: del archivo más barato al más caro. Y esta vez tengo algo que no tenía cuando escribí el borrador original: un segundo sitio, [cabuya.org](https://cabuya.org/es/), donde toda esta familia vive en producción. Cada sección lo usa como ejemplo real.

## Qué cambió desde abril

Este post llevaba meses de borrador, y el terreno se movió mientras tanto. Cuatro cosas, todas verificadas hoy:

1. **El tablero creció.** [isitagentready.com](https://isitagentready.com/) (el tablero de Cloudflare — la empresa de infraestructura web — que mide qué tan listo para agentes está un sitio) pasó de 8 verificaciones a **22, en cinco ejes**: descubribilidad, accesibilidad de contenido, control de bots, descubrimiento de protocolos y comercio. También cambió el número por niveles con nombre, de 0 a 5.
2. **Llegaron los pagos.** Cuatro formatos compiten por la billetera del agente: x402, UCP, MPP y ACP. Un eje completo del tablero que en abril no existía.
3. **Web Bot Auth se volvió real.** Era roadmap cuando escribí el borrador; hoy es una verificación del tablero y tiene grupo de trabajo propio en la IETF (el organismo que estandariza Internet).
4. **MCP publicó el spec 2026-07-28.** El protocolo con el que los agentes hablan con herramientas externas se reescribió sin estado — sin handshake, sin sesiones.

Si no programas, quédate en los "qué es" y "por qué existe" de cada sección; el código puede esperar. Si sí programas, cada sección es autocontenida: *qué es / por qué existe / ejemplo mínimo válido / trampas comunes / dónde aprender más*. Salta entre ellas.

## 1. Content Signals en robots.txt

### Qué es

Una directiva de una línea en `robots.txt` que declara tus preferencias para el uso de tu contenido por IA: entrenamiento, indexación en buscadores, uso como insumo de una respuesta generada.

### Por qué existe

`robots.txt` tradicionalmente le decía a los crawlers si podían *traer* el contenido. Content Signals extiende eso a qué pueden *hacer* con lo que traen. Formaliza la diferencia entre "indéxame por favor" y "por favor no me entrenes" — una distinción que `noindex` y allow/disallow no pueden expresar.

### Ejemplo mínimo válido

```text
User-agent: *
Content-Signal: ai-train=no, search=yes, ai-input=yes
```

Las tres señales (`ai-train`, `search`, `ai-input`) deben aparecer. Hay una cuarta en camino: `use`, que declara *cómo* se consume el contenido (`immediate`, `reference` o `full`) — hoy aparece en los bloques que Cloudflare gestiona automáticamente.

### Trampas comunes

- Poner `Content-Signal:` fuera de un bloque `User-agent:` — invisible para los crawlers.
- Omitir una de las tres señales, o escribir `ai-train=no,search=yes` sin espacio después de la coma.
- **La trampa de las dos capas.** Si activas la gestión automática de Content Signals en Cloudflare, tu `robots.txt` termina con dos bloques que escriben la misma directiva — el gestionado arriba, el tuyo abajo. En cabuya.org hoy conviven `ai-train=no` (gestionado) y `ai-train=yes` (el mío). Al preparar este post encontré exactamente eso, y no tengo una respuesta limpia: cada crawler resuelve bloques duplicados a su manera. Lo que sí sé es que una política ambigua es peor que una política que te desagrade. Decide qué capa es la dueña de la señal.

### Dónde aprender más

- [contentsignals.org](https://contentsignals.org/)
- [Draft IETF](https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/)
- [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/) de Cloudflare

## 2. Link headers de respuesta (RFC 8288)

### Qué es

Encabezados HTTP `Link:` en las respuestas HTML que apuntan a documentos compañeros legibles por máquina. Piénsalos como las etiquetas `<link rel>` de HTML promovidas al encabezado de respuesta, para que los clientes que nunca parsean el HTML igual encuentren los metadatos del sitio.

### Por qué existe

Los agentes no siempre renderizan la página — a veces hacen `HEAD /` y toman decisiones desde los encabezados solos. Los Link headers les permiten descubrir tu catálogo de APIs, tu tarjeta MCP o tu índice de skills sin traer el HTML.

### Ejemplo mínimo válido

```text
Link: </.well-known/api-catalog>; rel="api-catalog"
```

Valores de `rel` útiles: `api-catalog`, `service-desc`, `service-doc`, `describedby`. Uno basta; varios están bien. Así se ve el de cabuya.org en producción, servido en cada respuesta:

```text
Link: </.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json",
      </openapi.json>; rel="service-desc"; type="application/openapi+json",
      </llms.txt>; rel="describedby"; type="text/plain"
```

### Trampas comunes

- Faltan los brackets angulares alrededor de la URL, o el punto y coma antes de `rel=`.
- Apuntar `rel` a una URL que devuelve 404.
- Emitirlos solo en `/` y no en subrutas por idioma como `/es/`.

### Dónde aprender más

- [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) (Web Linking)
- [RFC 9727 §3](https://www.rfc-editor.org/rfc/rfc9727#section-3) (registro del rel `api-catalog`)
- [Registro de Link Relations de IANA](https://www.iana.org/assignments/link-relations/)

## 3. API Catalog (RFC 9727 + Linkset RFC 9264)

### Qué es

Un documento JSON en `/.well-known/api-catalog` que lista tus APIs públicas, cada una con enlaces a su descripción legible por máquina (OpenAPI — el formato estándar para describir APIs) y su documentación humana.

### Por qué existe

Un solo puntero a tu spec OpenAPI no basta — los sitios grandes tienen varias APIs, cada una con docs distintas. El catálogo usa el formato *linkset* para que las herramientas consuman una lista de descripciones de APIs de manera uniforme.

### Ejemplo mínimo válido

```json
{
  "linkset": [
    {
      "anchor": "https://api.example.com/users",
      "links": [
        { "rel": "service-desc", "href": "https://api.example.com/openapi.json" },
        { "rel": "service-doc", "href": "https://api.example.com/docs" }
      ]
    }
  ]
}
```

El catálogo de cabuya.org (recortado) apunta al OpenAPI, a la documentación y a los JSON Schema del protocolo — tres `anchor` para tres superficies:

```json
{
  "linkset": [
    {
      "anchor": "https://cabuya.org/api/validate",
      "service-desc": [{ "href": "https://cabuya.org/openapi.json" }],
      "service-doc": [{ "href": "https://cabuya.org/developers/validator.md" }]
    }
  ]
}
```

### Trampas comunes

- **El Content-Type equivocado.** Debe ser `application/linkset+json`, *no* `application/json`. Esta falla en silencio: el archivo se ve perfecto en el navegador y ningún cliente lo acepta.
- Un array `linkset` vacío, o sin `service-desc`/`service-doc`.
- Enlazar a un spec OpenAPI que en realidad no has escrito.

### Dónde aprender más

- [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727) (The Linkset API Catalog)
- [RFC 9264](https://www.rfc-editor.org/rfc/rfc9264) (Linksets) — el Apéndice A del 9727 tiene ejemplos completos

## 4. OAuth Authorization Server Metadata (RFC 8414) / OIDC Discovery

### Qué es

Publicar la configuración de tu servidor de autorización OAuth (OAuth es el estándar con el que una app pide permisos a otra sin compartir contraseñas) en una ruta fija, para que los clientes descubran los endpoints programáticamente.

### Por qué existe

Los agentes no pueden traer codificada a mano la ubicación de tu endpoint de autorización. Estos metadatos les permiten hacer un solo fetch y saber exactamente cómo iniciar un flujo de autenticación.

### Ejemplo mínimo válido

```json
{
  "issuer": "https://your-domain.com",
  "authorization_endpoint": "https://your-domain.com/authorize",
  "token_endpoint": "https://your-domain.com/token",
  "jwks_uri": "https://your-domain.com/.well-known/jwks.json",
  "grant_types_supported": ["authorization_code"],
  "response_types_supported": ["code"]
}
```

Seis campos requeridos, servidos en `/.well-known/oauth-authorization-server` o `/.well-known/openid-configuration`. La versión honesta que sirve cabuya.org declara exactamente lo que existe — un solo credencial, y lo que compra:

```json
{
  "issuer": "https://cabuya.org",
  "token_endpoint": "https://cabuya.org/oauth/token",
  "grant_types_supported": ["client_credentials"],
  "scopes_supported": ["validate:extended"],
  "service_documentation": "https://cabuya.org/auth.md"
}
```

*Traducción: estos archivos le dan al agente el mapa de la puerta — dónde se pide un token y qué se puede hacer con él. La llave sigue siendo cosa tuya.*

### Trampas comunes

- Publicar endpoints que no existen. La forma honesta en un sitio sin OAuth real es documentar rutas reservadas — un campo `_comment` cumple el spec.
- Faltar uno de los seis campos requeridos.
- Contar con el registro dinámico de clientes (RFC 7591) para siempre: el spec MCP 2026-07-28 [lo deprecó](https://blog.cloudflare.com/mcp-v2/) para implementaciones nuevas, con remoción después del verano de 2027. Si estás empezando, prefiere clientes pre-registrados.

### Dónde aprender más

- [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414) (OAuth 2.0 Authorization Server Metadata)
- [OpenID Connect Discovery 1.0](http://openid.net/specs/openid-connect-discovery-1_0.html)
- [Managed OAuth for Access](https://blog.cloudflare.com/managed-oauth-for-access/) de Cloudflare

## 5. OAuth Protected Resource Metadata (RFC 9728)

### Qué es

El documento compañero del anterior: declara qué *recursos* están protegidos y qué servidores de autorización emiten tokens para ellos.

### Por qué existe

Los metadatos del servidor de autorización responden "¿dónde consigo un token?". Los del recurso protegido responden "¿qué puedo hacer con uno aquí?". Un agente que descubre ambos puede planear el flujo completo.

### Ejemplo mínimo válido

```json
{
  "resource": "https://your-domain.com",
  "authorization_servers": ["https://your-oauth-provider.com"]
}
```

Dos campos requeridos. En un sitio de contenido sin recursos protegidos, una autoreferencia es una tautología honesta válida — así la sirve cabuya.org:

```json
{
  "resource": "https://cabuya.org",
  "authorization_servers": ["https://cabuya.org"],
  "scopes_supported": ["validate:extended"]
}
```

### Trampas comunes

- Listar servidores de autorización inexistentes o inalcanzables.
- Ruta equivocada: debe ser exactamente `/.well-known/oauth-protected-resource`, sin extensión `.json`.
- Olvidar el `WWW-Authenticate: resource_metadata` en las respuestas 401 — es cómo un agente que llegó sin saber descubre el documento.

### Dónde aprender más

- [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728) (OAuth 2.0 Protected Resource Metadata)

## 6. MCP Server Card (SEP-1649)

### Qué es

Un documento JSON en `/.well-known/mcp/server-card.json` que declara tu sitio como una superficie compatible con MCP — qué capacidades sirve y dónde conectar.

### Por qué existe

MCP (Model Context Protocol) se volvió el lenguaje compartido con el que los agentes hablan con herramientas externas. La tarjeta hace que un sitio MCP sea descubrible en una ruta conocida, sin configurar cada agente a mano.

### Qué cambió en el spec

La versión [2026-07-28](https://blog.cloudflare.com/mcp-v2/) reescribió el transporte: MCP ahora es sin estado — sin handshake de inicialización, sin `Mcp-Session-Id`, con encabezados nuevos (`Mcp-Method`, `Mcp-Name`) para que gateways y WAF decidan sin parsear el cuerpo. El transporte HTTP+SSE quedó deprecado. La tarjeta sigue siendo una propuesta — la [SEP-1649](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1649) — ahora acompañada de un [draft IETF](https://datatracker.ietf.org/doc/draft-serra-mcp-discovery-uri/04/) para un esquema URI `mcp://`. El estándar se está asentando; los detalles todavía se mueven.

### Ejemplo en producción

```json
{
  "serverInfo": { "name": "cabuya-org", "title": "cabuya.org site tools", "version": "0.1.0" },
  "transport": { "type": "streamable-http", "endpoint": "https://cabuya.org/mcp" },
  "capabilities": { "tools": {} },
  "tools": [
    { "name": "validate_cabuya_feed" },
    { "name": "read_cabuya_page_as_markdown" }
  ],
  "authentication": { "type": "none" }
}
```

Nota el detalle: el SEP define `capabilities` como un array plano de strings; cabuya.org sirve un objeto — y el escáner pasa ambas formas. Estamos en esa etapa incómoda donde el spec, los escáneres y la producción todavía no dicen lo mismo. Escribe lo que el SEP pide y tolera lo que encuentres.

### Trampas comunes

- Ruta anidada equivocada — es `/.well-known/mcp/server-card.json`, no `/.well-known/mcp.json`.
- Un array `capabilities` vacío.
- Declarar capacidades que tu sitio no sirve por MCP.

### Dónde aprender más

- [Model Context Protocol — spec](https://modelcontextprotocol.io/)
- [SEP-1649 / server card](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1649)
- [The next generation of MCP](https://blog.cloudflare.com/mcp-v2/) (Cloudflare, sobre 2026-07-28)

## 7. Agent Skills Discovery (Cloudflare RFC v0.2.0)

### Qué es

Un índice JSON en `/.well-known/agent-skills/index.json` que lista skills — procedimientos documentados que un agente puede leer, cachear y seguir — cada uno apuntando a su SKILL.md con un hash SHA-256 de los bytes servidos.

### Por qué existe

Una *herramienta* es algo que un agente puede llamar. Una *skill* es conocimiento componible encima: instrucciones que el agente lee y ejecuta cuando las necesita. El índice estándariza dónde encontrarlas y el hash permite verificar que no cambiaron en el camino.

### Ejemplo mínimo válido

```json
{
  "$schema": "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  "skills": []
}
```

Un `skills[]` vacío es válido. El de cabuya.org lista dos, con hash y licencia (recortado):

```json
{
  "skills": [
    {
      "name": "publish-a-cabuya-feed",
      "type": "skill",
      "description": "Publish emergency-aid data as a conforming feed and measure it with the public validator.",
      "url": "https://cabuya.org/.well-known/agent-skills/publish-a-feed/SKILL.md",
      "sha256": "7777afc5fcf6c2f2...",
      "license": "CC0-1.0"
    }
  ]
}
```

¿Notaste? El spec canónico llama al campo `digest` con prefijo `sha256:`; la producción a veces lo llama `sha256` a secas. El escáner acepta ambas. Si escribes un cliente, tolera la varianza — es un draft, y los drafts mutan.

### Trampas comunes

- Nombre de skill con mayúsculas o espacios (minúsculas, números, guiones; 1–64 caracteres).
- Hash calculado sobre los bytes locales en vez de los bytes realmente servidos — difieren si tu servidor recomprime el contenido.
- Confundir `type: "skill-md"` (un solo archivo) con `type: "archive"` (un `.tar.gz` multi-archivo).

### Dónde aprender más

- [Cloudflare Agent Skills Discovery RFC](https://github.com/cloudflare/agent-skills-discovery-rfc)
- [agentskills.io](https://agentskills.io/)

## 8. WebMCP (navegador)

### Qué es

Una API de navegador — `navigator.modelContext.registerTool()` — con la que una página publica herramientas que un agente corriendo *dentro del navegador* puede llamar. MCP sobre el contexto de una página en vez de sobre un servidor.

### Por qué existe

Cuando el agente corre en el navegador del usuario (una extensión, un asistente integrado), tiene acceso completo a la sesión — cookies, estado, todo. WebMCP le da a la página una forma de decir "estas acciones expongo" sin convertirlas en APIs públicas.

### Ejemplo mínimo válido

```js
navigator.modelContext.registerTool({
  name: 'search',
  description: 'Search site content',
  inputSchema: {
    type: 'object',
    properties: { q: { type: 'string' } },
    required: ['q'],
  },
  execute: async ({ q }) => { /* ... */ },
}, { signal: abortController.signal });
```

Cuatro propiedades por herramienta: `name`, `description`, `inputSchema`, `execute`. Pasa la señal del `AbortController` para revocar el registro al desmontar.

### Trampas comunes

- Registrar herramientas en un script diferido que corre después del snapshot del escáner — usa una directiva de hidratación que corra a tiempo.
- Exponer operaciones de escritura sin consentimiento explícito. Mantén la superficie de solo lectura al principio.
- Un `inputSchema` que no es JSON Schema válido.

### Dónde aprender más

- [Spec WebMCP](https://webmachinelearning.github.io/webmcp/)
- [Explicación de WebMCP por Chrome](https://developer.chrome.com/blog/webmcp-epp)

## 9. Web Bot Auth (ya no es bonus)

### Qué es

Un directorio en `/.well-known/http-message-signatures-directory` con las llaves públicas que los agentes usan para firmar sus peticiones HTTP. Le permite a un sitio verificar "esta petición viene realmente del agente que dice ser".

### Por qué existe

La identificación de bots hoy se basa en IP y User-Agent — ambos suplantables. Web Bot Auth propone firmas criptográficas para que los agentes *prueben* su identidad. En abril esto era roadmap del tablero; hoy es una verificación real (pedir un JWKS con al menos una llave) y tiene un [grupo de trabajo propio en la IETF](https://datatracker.ietf.org/wg/webbotauth/about/). El programa de bots verificados de Cloudflare ya [verifica con criptografía](https://blog.cloudflare.com/verified-bots-with-cryptography/), no con listas de IP.

### Qué pide la verificación

- Publicar un JWKS (un conjunto de llaves públicas JSON) en la ruta well-known.
- Firmar las peticiones que envía tu bot, incluyendo los encabezados `Signature-Agent` y `Signature-Input`.

### Dónde aprender más

- [Web Bot Auth en Cloudflare](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)
- [The age of agents](https://blog.cloudflare.com/signed-agents/) (el origen, agosto 2025)

## 10. Lo que llegó después de abril: pagos, agentes entre sí y DNS

El tablero ahora corre 22 verificaciones. Estas son las que no estaban cuando escribí el borrador — una línea cada una, para que sepas que existen:

- **A2A Agent Card** — `/.well-known/agent-card.json`: descubrimiento de agente a agente, para agentes que se buscan entre sí ([spec](https://a2a-protocol.org/latest/specification/)).
- **ARD** — `/.well-known/ai-catalog.json`: un manifiesto unificado que lista tus servidores MCP, agentes A2A, skills y APIs en un solo documento ([spec](https://agenticresourcediscovery.org/), aún v0.9).
- **DNS-AID** — descubrimiento por DNS: registros `SVCB` bajo el namespace `_agents` de tu dominio, para que un agente encuentre tus endpoints antes de hacer una sola petición HTTP.
- **auth.md** — un `/auth.md` en la raíz que explica tu autenticación en prosa para agentes ([la propuesta](https://workos.com/auth-md)).
- **Comercio** — cuatro formatos que compiten por la billetera del agente: [x402](https://x402.org) (de Coinbase, pagos HTTP nativos con respuesta 402), [UCP](https://ucp.dev/), [MPP](https://mpp.dev) y [ACP](https://agenticcommerce.dev).

No voy a fingir que sé cuáles sobreviven. En abril eran 8 verificaciones; hoy son 22. La carpeta sigue explotando.

## 11. Cabuya: la familia completa en producción

Cabuya es un protocolo abierto de interoperabilidad para aplicaciones de ayuda humanitaria que construí. El problema es sencillo: en cada emergencia, los equipos construyen sus propios mapas y directorios — a veces para la misma ciudad — y los datos quedan atrapados en cada app. Cabuya define un formato común para los lugares donde corre la ayuda (albergues, centros de acopio, puntos de servicio) y una ruta fija para publicarlos. Cualquier app puede leer lo que cualquier otra publicó. Los datos personales quedan fuera por diseño, no por buenas intenciones. Todo es CC0 — no hay a quién pedirle permiso.

¿Por qué esto le importa a un protocolo recién nacido? Porque un sitio nuevo no tiene enlaces, ni reputación, ni historial. Un protocolo nuevo no tiene nada que recomendarlo excepto ser fácil de encontrar por quien llega sin contexto. La recepción bien atendida no es un lujo — es la única distribución que tiene el primer día.

Así que cabuya.org sirve la familia completa: encabezados `Link` en cada respuesta; el catálogo de APIs con su Content-Type correcto apuntando al OpenAPI, a los esquemas JSON y a las páginas de documentación; la tarjeta MCP con dos herramientas reales (validar un feed, leer cualquier página como Markdown) sobre transporte sin estado y sin autenticación; el índice de skills con dos entradas — una guía de adopción y una guía de publicación — con sus hashes y su licencia; los metadatos OAuth que declaran sin vergüenza que el único credencial lo que compra es una tasa mayor de validación, nada más; y cada página del sitio con su gemelo `.md`, porque el agente que prefiere Markdown no debería tener que parsear HTML.

Hay una vuelta que me gusta más que todo lo demás: **el protocolo mismo vive en la carpeta**. Un publicador de Cabuya declara su manifiesto en `/.well-known/cabuya.json`. La carpeta que describe el protocolo también lo ejecuta. Ese es el patrón de fondo de toda esta guía — cuando diseñes un protocolo, la carpeta te presta un cajón propio.

Medido, no declarado (que es la norma de la casa): el [API de isitagentready](https://isitagentready.com/api/scan) devuelve hoy nivel 5, *Agent-Native*, para cabuya.org — las 22 verificaciones pasan o aplican como neutrales, salvo la tarjeta A2A y el catálogo ARD, que el sitio no sirve.

¿Y el tráfico? Honestamente: no que yo pueda medir. Creo que publicar esta familia es una apuesta correcta y barata, no una lotería ganada — los formatos todavía compiten entre sí y ninguno tiene el monopolio de cómo llegarán los agentes. Pero una tarde de trabajo te deja dentro de la conversación, y no publicarte deja fuera de ella. El costo es asimétrico.

## Qué implementaría si lo hiciera de nuevo

El orden de esta guía es el orden en que lo enviarías:

1. **Tarde uno:** Content Signals en robots.txt + Link headers. Dos archivos, dos líneas cada uno.
2. **Fin de semana uno:** los seis archivos JSON `.well-known/*`. La mayoría pesan menos de 1 KB. El spec OpenAPI es el que más toma — presupuesta media jornada.
3. **Fin de semana dos (opcional):** el puente WebMCP. Depende de la superficie de herramientas de tu sitio; de solo lectura la primera vez.

No necesitas leer cada RFC de principio a fin. Lee cada SKILL.md en `isitagentready.com/.well-known/agent-skills/` — esos son los ejemplos que el tablero aplica; copia sus payloads y ajusta las URLs. Los RFC explican *por qué* existe cada campo; el SKILL.md te dice *qué* poner.

La segunda vez fue más rápida que la primera — cabuya.org salió con la familia completa en una fracción del tiempo que tomó este sitio, porque la guía ya existía en mi cabeza. Ojalá ahora exista en la tuya.

Sigo construyendo.

## Recursos

- [RFC 8615 — Well-Known URIs](https://www.rfc-editor.org/rfc/rfc8615)
- [RFC 8288 — Web Linking](https://www.rfc-editor.org/rfc/rfc8288)
- [RFC 9264 — Linksets](https://www.rfc-editor.org/rfc/rfc9264)
- [RFC 9727 — API Catalog](https://www.rfc-editor.org/rfc/rfc9727)
- [RFC 8414 — OAuth Authorization Server Metadata](https://www.rfc-editor.org/rfc/rfc8414)
- [RFC 9728 — OAuth Protected Resource Metadata](https://www.rfc-editor.org/rfc/rfc9728)
- [Model Context Protocol](https://modelcontextprotocol.io/) · [SEP-1649 server card](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1649) · [draft IETF mcp://](https://datatracker.ietf.org/doc/draft-serra-mcp-discovery-uri/04/)
- [Cloudflare Agent Skills Discovery RFC](https://github.com/cloudflare/agent-skills-discovery-rfc) · [agentskills.io](https://agentskills.io/)
- [Spec WebMCP](https://webmachinelearning.github.io/webmcp/)
- [Content Signals](https://contentsignals.org/) · [Web Bot Auth (IETF WG)](https://datatracker.ietf.org/wg/webbotauth/about/)
- [isitagentready.com](https://isitagentready.com/)
- [cabuya.org](https://cabuya.org/es/) — el protocolo y su API pública de validación
