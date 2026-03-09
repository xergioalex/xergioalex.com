---
title: "El Marcador: Auditar AEO, Leer los Datos y lo Que Viene"
description: "Lo más difícil del AEO es saber si funciona. Así es como rastreo el tráfico de bots IA, audito la salud AEO, y lo que pinta el futuro de la búsqueda con IA."
pubDate: "2026-03-09T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["auditoría AEO metodología checklist", "rastrear tráfico bots IA analíticas", "informe rendimiento IA Bing", "medir citas búsqueda IA", "estadísticas crecimiento tráfico referido IA"]
series: "aeo-journey"
seriesOrder: 3
---

Lo más difícil del AEO es la medición. Google Analytics no ve los bots de IA. No ejecutan JavaScript. Desde la perspectiva de las analíticas del lado del cliente, cada visita de un crawler de IA es completamente invisible — un agujero negro al que va tu mejor contenido y del que no sabes nada de lo que pasa después.

Pasé bastante tiempo tratando de entender qué significa siquiera "funcionar" en el contexto del AEO. Con el SEO tradicional tenés rankings, CTR, impresiones. Con el AEO tenés... intuición. Alguien te dice que te encontró en ChatGPT. Buscás tu propio nombre en Perplexity y a veces aparecés, a veces no. El ecosistema de medición está años por detrás del ecosistema de optimización, y esa brecha es frustrante.

Este capítulo trata de lo que construí para cerrar esa brecha — y es honesto sobre cuánto camino falta recorrer todavía.

---

## Rastrear el Tráfico de Bots IA

**Respuesta corta: middleware del lado del servidor que verifica el User-Agent de cada solicitud contra una lista de 13 crawlers de IA conocidos, dispara eventos a Umami, y no agrega nada de overhead en JavaScript. La implementación técnica completa está en [Tracking the Invisible: How I Built AI Bot Analytics](/es/blog/tracking-invisible-ai-bot-analytics).**

Los crawlers de IA no ejecutan JavaScript. Piden la página, reciben el HTML y se van. Umami, Plausible, GA4 — ninguno los ve nunca. El único lugar donde podés interceptar estos bots es del lado del servidor, antes de que salga la respuesta.

La solución vive en `functions/_middleware.ts` — un middleware de Cloudflare Pages que corre en el edge con cada solicitud. La lógica es simple: revisá el header `User-Agent`, comparalo contra 13 patrones de bots de IA conocidos, disparar un evento no bloqueante a Umami si hay coincidencia. Los visitantes humanos pasan sin overhead.

El array de detección de bots cubre los patrones que importan:

```typescript
const AI_BOT_PATTERNS: ReadonlyArray<{ pattern: RegExp; name: string }> = [
  { pattern: /GPTBot/i, name: 'GPTBot' },
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User' },
  { pattern: /ClaudeBot/i, name: 'ClaudeBot' },
  { pattern: /anthropic-ai/i, name: 'anthropic-ai' },
  { pattern: /Google-Extended/i, name: 'Google-Extended' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot' },
  { pattern: /OAI-SearchBot/i, name: 'OAI-SearchBot' },
  // ... más Bytespider, CCBot, Applebot-Extended, Amazonbot,
  //     Meta-ExternalAgent, cohere-ai
];
```

Cada coincidencia dispara un evento `ai_bot_visit` a Umami con el nombre del bot, la ruta de la página y el método HTTP. La llamada va envuelta en `context.waitUntil()` — fire-and-forget, no bloquea la respuesta. Ahora puedo ver qué bots están rastreando, qué páginas visitan y con qué frecuencia. Ese es el primer paso.

---

## Rastrear Solicitudes de Markdown

**El middleware también registra cuando los agentes piden contenido en Markdown — ya sea vía headers `Accept: text/markdown` o accediendo directamente a URLs `.md`. Se dispara un evento `markdown_request` con un campo `source` que revela cómo el agente encontró el endpoint.**

Esto es más reciente. El capítulo 2 de esta serie cubrió la implementación de Markdown para Agentes — servir archivos `.md` limpios directamente desde assets estáticos, con soporte de content negotiation para que los agentes que envíen `Accept: text/markdown` reciban Markdown en lugar de HTML. La pregunta que surgió después de construirlo: ¿alguien lo está usando realmente?

La función de tracking en el middleware — `trackMarkdownRequest` — se dispara cada vez que sale una respuesta `.md`. Registra dos campos que importan:

- **`source`**: ya sea `content_negotiation` (el agente envió `Accept: text/markdown`) o `direct_url` (el agente navegó directamente a una URL `.md` como `/about.md`)
- **`bot`**: el nombre del bot detectado, o `"unknown"` para lo que no se reconoce

La distinción entre las dos fuentes es interesante — si empiezo a ver muchas solicitudes `content_negotiation`, significa que los agentes están usando activamente el estándar HTTP. Si veo mayormente `direct_url`, significa que encontraron los paths `.md` desde el índice y los guardaron. Ambos son patrones válidos. Solo cuentan historias distintas sobre cómo los agentes consumen contenido.

Sinceramente, todavía no tengo suficientes datos para sacar conclusiones. El tracking acaba de entrar en producción junto con la feature de Markdown para Agentes. Estoy mirando la pestaña de Eventos en Umami para el evento `markdown_request`, y por ahora los números son bajos — un puñado de solicitudes que pueden o no ser agentes reales. Démosle unos meses.

Lo que sí espero ver eventualmente: ClaudeBot y GPTBot usando `content_negotiation` (tanto OpenAI como Anthropic han invertido en ese estándar), mientras que los agentes estilo scraper usan `direct_url` después de descubrir el listado de links en `/blog/index.md`. Es una hipótesis. Veremos si se sostiene.

---

## El Panorama de la Medición

**Bing Webmaster Tools lanzó un informe de Rendimiento de IA en febrero de 2026 — la primera herramienta oficial que muestra con qué frecuencia tu contenido es citado en respuestas generadas por IA. Google todavía no tiene algo equivalente. Las herramientas de terceros existen pero son volátiles. La visibilidad en citas cambia drásticamente entre consultas.**

El informe de Rendimiento de IA de Bing (lanzado en febrero de 2026) es el primer tooling de cualquier plataforma importante que muestra con qué frecuencia tu contenido es citado en respuestas de IA — específicamente en Microsoft Copilot y los resúmenes de Bing AI. Obtenés citas totales, qué páginas se referencian, y las "consultas de fundamentación" — las frases que usó la IA cuando recuperó tu contenido. No es perfecto, pero son datos reales de una plataforma real, lo que lo pone por delante de casi todo lo que hay disponible ahora mismo.

Google no tiene nada comparable para AI Overviews. Google Search Console sigue agrupando los clics de AI Mode dentro del tipo de búsqueda "Web" regular. Si eso es un descuido o una opacidad intencional, no lo sé — pero es molesto. La plataforma que genera más AI Overviews es la que menos visibilidad da sobre el comportamiento de las citas.

Para todo lo que Google no cubre, las opciones son herramientas de terceros. [Otterly.ai](https://otterly.ai) monitorea la visibilidad de citas en múltiples plataformas de IA. El [AEO Grader gratuito de HubSpot](https://www.hubspot.com/aeo-grader) corre una auditoría básica y puntúa tu sitio contra las mejores prácticas de AEO. Y después está el testing manual — preguntarle a ChatGPT y Perplexity tus consultas objetivo y ver si aparecés.

El testing manual es más útil de lo que parece, pero tiene una advertencia importante. Según [la investigación de AirOps](https://www.airops.com/blog/how-to-test-content-visibility-in-perplexity-and-chatgpt), solo el 30% de las marcas se mantienen visibles de una respuesta de IA a la siguiente, y solo el 20% en cinco ejecuciones consecutivas. Los AI Overviews de Google cambian aproximadamente el 70% de su contenido para la misma consulta entre ejecuciones, con cerca de la mitad de las citas intercambiadas. Las citas de IA son volátiles. Una verificación puntual el martes no significa nada para el jueves.

Esta es la parte más débil del ecosistema AEO ahora mismo. Podemos optimizar contenido. Podemos rastrear crawlers. Pero medir "¿con qué frecuencia me cita la IA?" con alguna confianza estadística sigue siendo básicamente un problema sin resolver. Creo que eso cambia en el próximo año a medida que más herramientas como el informe de Bing entren en línea. Por ahora, el rastreo de bots del lado del servidor es el mejor proxy que tenemos — al menos podés confirmar que los bots están llegando y cuáles páginas les interesan.

---

## La Auditoría

**Hice una auditoría completa de AEO en cuatro dimensiones: Descubribilidad, Extraíbilidad, Confianza y Citabilidad. Puntaje total: 40/40. Esto es lo que reveló la auditoría y qué fue lo que más movió la aguja.**

No empecé este proceso pensando que iba a terminar con puntaje perfecto. El sitio tenía buenos cimientos — HTML estático, el enfoque de cero JavaScript por defecto de Astro, marcado semántico — pero esperaba encontrar brechas significativas. El trabajo deliberado de AEO fue lo que lo terminó de empujar:

| Dimensión | Nota | Qué Mide |
|-----------|-------|-----------------|
| **Descubribilidad** | 10/10 | ¿Pueden los crawlers de IA encontrar y acceder al contenido? |
| **Extraíbilidad** | 10/10 | ¿Pueden los sistemas de IA analizar significado estructurado del contenido? |
| **Confianza** | 10/10 | ¿Lleva el contenido señales de credibilidad que la IA pueda evaluar? |
| **Citabilidad** | 10/10 | ¿Está el contenido estructurado de una manera que facilite citarlo? |

Tres cosas me sorprendieron al revisar esto sistemáticamente.

**La frescura importa más de lo que esperaba.** Según [la investigación de Ten Speed](https://www.tenspeed.io/blog/content-freshness-aeo-era), el 76,4% de las páginas citadas por IA fueron actualizadas en los 30 días previos. Los sistemas de IA prefieren contenido que es [un 25,7% más fresco](https://www.hillwebcreations.com/content-freshness/) que lo que surfea la búsqueda tradicional. Agregar timestamps visibles de "última actualización" a los posts llevó a [30% más citas en Perplexity](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026) en un estudio publicado. Nunca había pensado en los timestamps como una señal de confianza. Ahora los tengo en todos los posts.

**El contenido bilingüe es un multiplicador real.** El sitio corre en inglés y español — 59 posts del blog en cada idioma, cada página con ambas versiones. Los sitios multilingües correctamente localizados tienen [hasta un 327% más de visibilidad en AI Overview](https://koanthic.com/en/multilingual-seo-ai/) comparado con sitios en un solo idioma. El énfasis está en "localizado" — no traducido. Los sistemas de IA evalúan cada idioma de forma independiente. La traducción automática sin adaptación cultural no alcanza. Los posts en español acá están escritos, no generados.

**Las consultas objetivo tienen que ser explícitas.** Mapeé 30 consultas en tres etapas del funnel — informacional, comparativa, orientada a la acción. Las 30 tienen contenido correspondiente. No porque un consultor me lo dijera, sino porque me di cuenta de que había estado escribiendo posts que respondían preguntas que nadie estaba haciendo realmente. Tener una lista de 30 consultas reales y mapearlas a posts reales cambió lo que escribí después.

También armé un checklist de mantenimiento mensual: actualizar llms.txt, validar schemas, correr cinco consultas objetivo contra plataformas de IA, revisar estadísticas de rastreo. El AEO no es una configuración de una sola vez. Los datos de frescura solos te dicen que tiene que ser una rutina.

---

## Hacia Dónde Va Esto

**El tráfico referido de IA creció un 123% entre septiembre de 2024 y febrero de 2025. ChatGPT concentra el 87,4% de ese tráfico. Los estándares de infraestructura todavía se están formando — el grupo de trabajo IETF AIPREF está redactando especificaciones formales para los permisos de contenido de IA. Los sitios que se adapten ahora tienen una ventana.**

Solo el [37% de los equipos de marketing](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) están optimizando activamente para la búsqueda con IA. El 70% reconoce que importa. Solo el 20% ha empezado. Las marcas que están implementando ven [3,4 veces más visibilidad](https://blog.hubspot.com/marketing/answer-engine-optimization-trends) que los adoptadores tardíos. La ventaja de ser primero es real, y la ventana todavía está abierta.

Los estándares todavía se están escribiendo. El [grupo de trabajo IETF AIPREF](https://www.ietf.org/blog/aipref-wg/), constituido en febrero de 2025, está redactando especificaciones formales sobre cómo los sitios web pueden expresar preferencias sobre el uso de su contenido por IA — categorías separadas para entrenamiento, output de IA y búsqueda. Eso va a importar. Por ahora, robots.txt es lo mejor que tenemos, y nunca fue diseñado para este problema. Directivas de rastreo que preceden a los grandes modelos de lenguaje por quince años están haciendo un trabajo para el que no fueron pensadas.

Los números de tráfico no son teóricos. El tráfico referido de IA [creció un 123%](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653) entre septiembre de 2024 y febrero de 2025. ChatGPT concentra el 87,4% de ese tráfico. Vercel reportó que las referencias de ChatGPT [crecieron hasta el 10% de sus nuevos registros](https://aiseotracker.com/case-study/vercel). Tally.so vio a ChatGPT convertirse en su principal fuente de referidos, a secas. Son empresas reales reportando números reales — no proyecciones.

Los endpoints de Markdown que construí son una apuesta concreta en esa dirección. Hoy, la mayoría de los crawlers leen HTML. Los agentes autónomos que emergen ahora — los que compran, comparan, investigan y actúan — necesitan contenido limpio, estructurado, eficiente. No solo están leyendo páginas; están consumiendo contenido como entradas a cadenas de razonamiento. Servirles HTML crudo con navegación, avisos de cookies y secciones de comentarios es como servir una API JSON envuelta en una página HTML completa. Los endpoints de Markdown limpian todo eso.

Los sitios que ya hablan ese idioma van a tener ventaja. Los que sigan sirviendo solo HTML van a ser como los sitios sin versión mobile en 2015 — funcionan, pero con fricción creciente.

No sé exactamente qué porcentaje del tráfico de este sitio viene de citas de IA en este momento. Ese problema de medición es real y he sido honesto sobre él a lo largo de este capítulo. Pero puedo ver los bots llegando. Puedo ver qué páginas visitan. El informe de Rendimiento de IA de Bing muestra citas. Y ahora, si un agente quiere leer este post completo sin parsear HTML, puede hacerlo — directamente, en Markdown, tal como lo escribí.

El terreno debajo de la búsqueda se está moviendo. El SEO tradicional sigue importando — es la base sobre la que se construye todo lo demás. Pero la siguiente capa ya está acá, y ya no es una tendencia para observar.

Sigamos construyendo.

---

## Recursos

**Herramientas de Medición**
- [Rendimiento de IA en Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) — Seguimiento de citas en Microsoft Copilot y Bing AI
- [Otterly.ai](https://otterly.ai) — Monitoreo de visibilidad de citas en múltiples plataformas de IA
- [AEO Grader de HubSpot](https://www.hubspot.com/aeo-grader) — Herramienta gratuita de auditoría y puntaje AEO

**Investigación y Datos**
- [AirOps: Volatilidad de Citas de IA](https://www.airops.com/blog/how-to-test-content-visibility-in-perplexity-and-chatgpt) — Solo el 30% se mantiene visible entre ejecuciones; el 70% de las citas cambia entre consultas
- [Ten Speed: Frescura de Contenido y AEO](https://www.tenspeed.io/blog/content-freshness-aeo-era) — El 76,4% de las páginas citadas fueron actualizadas en los últimos 30 días
- [Koanthic: Visibilidad Multilingüe en AI Overview](https://koanthic.com/en/multilingual-seo-ai/) — 327% de aumento para sitios multilingües localizados
- [Search Engine Land: Tráfico Referido de IA](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653) — Crecimiento del 123% de septiembre de 2024 a febrero de 2025
- [HubSpot: Tendencias de Adopción de AEO](https://blog.hubspot.com/marketing/answer-engine-optimization-trends) — 3,4 veces más visibilidad para los adoptadores tempranos
- [Caso de Estudio Vercel](https://aiseotracker.com/case-study/vercel) — ChatGPT crece hasta el 10% de los nuevos registros

**Estándares**
- [Grupo de Trabajo IETF AIPREF](https://www.ietf.org/blog/aipref-wg/) — Especificaciones formales de permisos de contenido para IA en desarrollo
- [Cloudflare: Markdown para Agentes](https://blog.cloudflare.com/markdown-for-agents/) — Content negotiation en el edge
