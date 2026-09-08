---
title: "Portal de desarrolladores de XergioAleX.com"
description: "Recursos para desarrolladores y agentes de XergioAleX.com: API JSON de solo lectura, OpenAPI, servidor MCP en /mcp, CLI y documentos de descubrimiento."
lastUpdated: 2026-09-08
---

## API, MCP y recursos para agentes

Todo lo que un desarrollador o un agente de IA necesita para consumir XergioAleX.com de forma programática: una API JSON de solo lectura, una descripción OpenAPI 3.1, un servidor MCP en /mcp, una CLI en npm y los documentos de descubrimiento que los conectan. Sin API key y sin registro — solo respeta el límite de peticiones publicado.

---

## Inicio rápido

Cada endpoint es un archivo JSON estático detrás de un CDN. Empieza por el índice: lista todos los endpoints con URLs completas, así no hay que adivinar nada.

```bash
curl -s https://xergioalex.com/api/index.json
curl -s "https://xergioalex.com/api/posts-es.json?limit=5"
curl -s https://xergioalex.com/api/v1/series/es/index.json   # alias versionado
```

No hay nada que registrar. Envía un GET normal y listo: si mandas credenciales, simplemente se ignoran.

---

## Endpoints

Ocho operaciones de solo lectura, todas documentadas en la [especificación OpenAPI 3.1](https://xergioalex.com/openapi.json) con su `operationId` y un esquema de respuesta tipado, listas para conectarse a function calling.

| Endpoint | operationId | Qué devuelve |
|----------|-------------|--------------|
| `GET /api/index.json` | `getApiIndex` | Todos los endpoints con URLs completas, la política de versionado y el modelo de autenticación. El punto de entrada. |
| `GET /api/posts.json` | `listPosts` | El índice de búsqueda del blog en todos los idiomas. `?limit=N` (1-500) devuelve solo los N más recientes. |
| `GET /api/posts-en.json` | `listPostsInEnglish` | El índice de búsqueda del blog, solo artículos en inglés. `?limit=N` (1-500). |
| `GET /api/posts-es.json` | `listPostsInSpanish` | El índice de búsqueda del blog, solo artículos en español. `?limit=N` (1-500). |
| `GET /api/series/{lang}/index.json` | `listSeries` | Todas las series del blog en un idioma, con el número de capítulos. |
| `GET /api/series/{lang}/{slug}.json` | `getSeries` | Los capítulos de una serie en orden de lectura. |
| `GET /api/timeline/{lang}/{tag}.json` | `getTimelineByTag` | Todos los artículos con una etiqueta, del más reciente al más antiguo. |
| `GET /api/slides-timeline/{lang}.json` | `getSlidesTimeline` | Todas las presentaciones publicadas en un idioma. |

- [Especificación OpenAPI](https://xergioalex.com/openapi.json)
- [Índice de la API](https://xergioalex.com/api/index.json)

---

## Errores

Los fallos devuelven `application/problem+json` (RFC 9457), nunca HTML. El cuerpo incluye los campos estándar de Problem Details junto a un objeto `error` con un código estable, un mensaje legible y una pista de recuperación, para que un agente pueda reaccionar sin analizar una página.

```json
{
  "type": "https://xergioalex.com/developers#errors",
  "title": "Not Found",
  "status": 404,
  "detail": "No API resource exists at /api/series/fr/index.json.",
  "instance": "/api/series/fr/index.json",
  "error": {
    "code": "resource_not_found",
    "message": "No API resource exists at /api/series/fr/index.json.",
    "hint": "Fetch https://xergioalex.com/api/index.json for the list of available endpoints.",
    "documentation_url": "https://xergioalex.com/developers"
  }
}
```

| Código | HTTP | Significado |
|--------|------|-------------|
| `resource_not_found` | 404 | No existe ningún recurso en esa ruta. La pista indica el índice de endpoints. |
| `method_not_allowed` | 405 | La API es de solo lectura. Reintenta con GET. |
| `gone` | 410 | El recurso existió y fue eliminado de forma permanente. |
| `rate_limited` | 429 | Demasiadas peticiones. Espera los segundos indicados en Retry-After y reintenta. |
| `invalid_request` | 400 | Un parámetro de consulta es inválido — el mensaje indica el rango válido. |
| `internal_error` | 500 | La petición no pudo completarse. Reintentar es seguro. |

---

## Versionado y deprecación

La API usa versionado semántico. Cada respuesta lleva la versión en el header `X-API-Version` y la versión actual se publica en tiempo de ejecución dentro del índice de la API, así ningún cliente necesita fijarla en el código.

- **Los cambios aditivos salen sin aviso.** Pueden aparecer endpoints nuevos y campos opcionales nuevos en cualquier momento. Analiza de forma defensiva: ignora los campos que no conozcas.
- **Dos formas de dirigirse a la versión actual.** Sin prefijo (`/api/posts.json`) y versionada (`/api/v1/posts.json`) sirven las mismas respuestas; además, cada respuesta lleva `X-API-Version`.
- **Los cambios incompatibles estrenan prefijo.** Eliminar un campo, cambiar su tipo o retirar un endpoint sale bajo `/api/v2/…`. Las rutas existentes nunca se reutilizan para otra cosa.
- **La deprecación se anuncia, no se sobrentiende.** Cuando se estrena un prefijo nuevo, las rutas anteriores siguen funcionando al menos seis meses y responden con los headers `Deprecation` (RFC 9745) y `Sunset` (RFC 8594), así un cliente ve la fecha final en la propia respuesta y puede migrar antes.

---

## Superficie para agentes

Además de la API, el sitio publica los documentos de descubrimiento que buscan los agentes. Cada uno es una URL estable que puedes consultar directamente.

| Recurso | Qué es |
|---------|--------|
| [/mcp](https://xergioalex.com/mcp) | Servidor MCP sobre Streamable HTTP (protocolo 2025-06-18): seis herramientas de solo lectura sobre los mismos datos que la API REST. También disponible en `/.well-known/mcp`. |
| [/.well-known/ai-catalog.json](https://xergioalex.com/.well-known/ai-catalog.json) | Manifiesto de capacidades ARD: todos los artefactos para agentes que publica este sitio, en un solo documento. |
| [/.well-known/mcp/server-card.json](https://xergioalex.com/.well-known/mcp/server-card.json) | Tarjeta de servidor MCP para las herramientas de solo lectura expuestas en el navegador vía WebMCP. |
| [/.well-known/agent-skills/index.json](https://xergioalex.com/.well-known/agent-skills/index.json) | Índice de descubrimiento de Agent Skills: las convenciones de agent-readiness que implementa el sitio. |
| [/.well-known/api-catalog](https://xergioalex.com/.well-known/api-catalog) | Linkset de catálogo de API (RFC 9727) que apunta a la descripción OpenAPI y a llms.txt. |
| [/openapi.json](https://xergioalex.com/openapi.json) | Descripción OpenAPI 3.1 de todos los endpoints anteriores. |
| [/llms.txt](https://xergioalex.com/llms.txt) | Mapa curado del sitio para modelos de lenguaje. |
| [/llms-full.txt](https://xergioalex.com/llms-full.txt) | El corpus de contenido ampliado para recuperación y grounding. |
| [/auth.md](https://xergioalex.com/auth.md) | Política de acceso Auth.md: todo es público, anónimo y de solo lectura. |

Markdown para agentes: envía `Accept: text/markdown` en cualquier URL, o añade `.md`, para recibir Markdown en lugar de HTML.

---

## Servidor MCP y CLI

Dos puertas más a la misma sala: un servidor Model Context Protocol para clientes de IA y una CLI para la terminal.

**Servidor MCP — /mcp.** Un servidor MCP sin estado y de solo lectura (Streamable HTTP, protocolo 2025-06-18) que sirve seis herramientas sobre el JSON pregenerado del sitio: `search_blog_posts`, `list_series`, `get_series`, `get_posts_by_tag`, `list_slide_decks` y `get_api_index`. Sin autenticación; aplica el mismo límite de peticiones que la API REST. Añade `https://xergioalex.com/mcp` a cualquier cliente MCP.

```bash
curl -s https://xergioalex.com/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

**CLI — `npm install -g xergioalex`.** La CLI oficial envuelve la misma API para la terminal: `xergioalex posts`, `search`, `series`, `tag`, `talks` y `api`, con `--json` y `--lang en|es` en todos los comandos. Cero dependencias, Node 18+.

---

## Acceso, límites y licencia

- **Autenticación.** Ninguna. Todos los endpoints son públicos, anónimos y de solo lectura. No hay un plan gratuito que activar porque no hay plan de pago, y tampoco hay cuenta, así que no hay nada que configurar.
- **Límites de uso.** 300 peticiones por minuto por IP, aplicadas de forma best-effort en el edge. Cada respuesta publica la cuota en los headers RateLimit-Policy y RateLimit (draft-ietf-httpapi-ratelimit-headers); si la superas, recibirás un 429 con Retry-After. Si cacheas las respuestas una hora, nunca te acercarás al límite.
- **Licencia.** El contenido está disponible bajo CC BY 4.0: reutilízalo, incluso para entrenamiento y grounding, citando a xergioalex.com.

---

## ¿Algo roto o algo que falta?

Si un endpoint devuelve una forma incorrecta, un documento está desactualizado o necesitas un campo que aún no se expone, escríbeme: esta superficie existe para usarse.

- [Contacto](https://xergioalex.com/es/contact)
