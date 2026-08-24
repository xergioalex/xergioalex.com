---
title: "Portal de desarrolladores de XergioAleX.com"
description: "Recursos para desarrolladores y agentes de XergioAleX.com: API JSON pública de solo lectura, especificación OpenAPI, tarjeta MCP y documentos de descubrimiento."
lastUpdated: 2026-08-24
---

## API, MCP y recursos para agentes

Todo lo que un desarrollador o un agente de IA necesita para consumir XergioAleX.com de forma programática: una API JSON de solo lectura, una descripción OpenAPI 3.1, una tarjeta de servidor MCP y los documentos de descubrimiento que los conectan. Sin API key, sin registro y sin límite de peticiones.

---

## Inicio rápido

Cada endpoint es un archivo JSON estático detrás de un CDN. Empieza por el índice: lista todos los endpoints con URLs completas, así no hay que adivinar nada.

```bash
curl -s https://xergioalex.com/api/index.json
curl -s https://xergioalex.com/api/posts-es.json
curl -s https://xergioalex.com/api/series/es/index.json
```

No hay nada que registrar. Envía un GET normal y listo: si mandas credenciales, simplemente se ignoran.

---

## Endpoints

Ocho operaciones de solo lectura, todas documentadas en la [especificación OpenAPI 3.1](https://xergioalex.com/openapi.json) con su `operationId` y un esquema de respuesta tipado, listas para conectarse a function calling.

| Endpoint | operationId | Qué devuelve |
|----------|-------------|--------------|
| `GET /api/index.json` | `getApiIndex` | Todos los endpoints con URLs completas, la política de versionado y el modelo de autenticación. El punto de entrada. |
| `GET /api/posts.json` | `listPosts` | El índice de búsqueda del blog en todos los idiomas. |
| `GET /api/posts-en.json` | `listPostsInEnglish` | El índice de búsqueda del blog, solo artículos en inglés. |
| `GET /api/posts-es.json` | `listPostsInSpanish` | El índice de búsqueda del blog, solo artículos en español. |
| `GET /api/series/{lang}/index.json` | `listSeries` | Todas las series del blog en un idioma, con el número de capítulos. |
| `GET /api/series/{lang}/{slug}.json` | `getSeries` | Los capítulos de una serie en orden de lectura. |
| `GET /api/timeline/{lang}/{tag}.json` | `getTimelineByTag` | Todos los artículos con una etiqueta, del más reciente al más antiguo. |
| `GET /api/slides-timeline/{lang}.json` | `getSlidesTimeline` | Todas las presentaciones publicadas en un idioma. |

- [Especificación OpenAPI](https://xergioalex.com/openapi.json)
- [Índice de la API](https://xergioalex.com/api/index.json)

---

## Errores

Los fallos devuelven JSON, nunca HTML. El cuerpo incluye los campos de RFC 9457 (Problem Details) junto a un objeto `error` con un código estable, un mensaje legible y una pista de recuperación, para que un agente pueda reaccionar sin analizar una página.

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
| `internal_error` | 500 | La petición no pudo completarse. Reintentar es seguro. |

---

## Versionado

La API usa versionado semántico y publica su versión actual en tiempo de ejecución dentro del índice de la API, así ningún cliente necesita fijarla en el código.

- **Los cambios aditivos salen sin aviso.** Pueden aparecer endpoints nuevos y campos opcionales nuevos en cualquier momento. Analiza de forma defensiva: ignora los campos que no conozcas.
- **Los cambios incompatibles estrenan prefijo.** Eliminar un campo, cambiar su tipo o retirar un endpoint sale bajo `/api/v2/…`. Las rutas sin prefijo nunca se reutilizan para otra cosa.
- **Seis meses de convivencia.** Cuando se estrena un prefijo nuevo, las rutas anteriores siguen funcionando al menos seis meses para que nada se rompa sin aviso.

---

## Superficie para agentes

Además de la API, el sitio publica los documentos de descubrimiento que buscan los agentes. Cada uno es una URL estable que puedes consultar directamente.

| Recurso | Qué es |
|---------|--------|
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

## Acceso, límites y licencia

- **Autenticación.** Ninguna. Todos los endpoints son públicos, anónimos y de solo lectura. No hay un plan gratuito que activar porque no hay plan de pago, y tampoco hay cuenta, así que no hay nada que configurar.
- **Límites de uso.** No hay límite de peticiones a nivel de aplicación. Los endpoints son archivos estáticos cacheados detrás de Cloudflare, que aplica su propia protección contra abuso a nivel de red. Si cacheas las respuestas una hora, nunca te acercarás al límite.
- **Licencia.** El contenido está disponible bajo CC BY 4.0: reutilízalo, incluso para entrenamiento y grounding, citando a xergioalex.com.

---

## ¿Algo roto o algo que falta?

Si un endpoint devuelve una forma incorrecta, un documento está desactualizado o necesitas un campo que aún no se expone, escríbeme: esta superficie existe para usarse.

- [Contacto](https://xergioalex.com/es/contact)
