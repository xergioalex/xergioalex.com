---
title: "El Marcador: Cómo Medir lo que la IA No Te Dice"
description: "La medición AEO está años por detrás de la optimización AEO. Esto es lo que tiene la industria, lo que todavía falta, y un framework de auditoría que te da algo concreto con qué trabajar."
pubDate: "2026-03-11T14:00:00"
heroLayout: "none"
tags: ["tech", "web-development", "ai"]
keywords: ["auditoría AEO metodología checklist", "rastrear tráfico bots IA analíticas", "informe rendimiento IA Bing", "medir citas búsqueda IA", "estadísticas crecimiento tráfico referido IA"]
series: "aeo-journey"
seriesOrder: 3
---

La parte más difícil del AEO es la medición. Google Analytics no ve los bots de IA. No ejecutan JavaScript. Desde la perspectiva de las analíticas del lado del cliente, cada visita de un crawler de IA es completamente invisible — un agujero negro al que va tu mejor contenido y del que no sabés nada de lo que pasa después.

Pasé bastante tiempo tratando de entender qué significa siquiera "funcionar" en el contexto del AEO. Con el SEO tradicional tenés rankings, CTR, impresiones. Con el AEO tenés... intuición. Alguien te dice que te encontró en ChatGPT. Buscás tu propio nombre en Perplexity y a veces aparecés, a veces no. El ecosistema de medición está años por detrás del ecosistema de optimización, y esa brecha es frustrante para todos — no solo para mí.

Este capítulo trata de cerrar esa brecha tanto como es posible actualmente, y es honesto sobre cuánto camino falta recorrer todavía.

---

## Rastrear el Tráfico de Bots IA

El único lugar donde podés interceptar los crawlers de IA es del lado del servidor, antes de que salga la respuesta. Las analíticas del lado del cliente nunca los ven.

El enfoque que funciona: middleware que corre en el edge con cada solicitud, verifica el header `User-Agent` contra una lista de patrones de bots de IA conocidos, y dispara eventos de analíticas cuando hay coincidencia. Los visitantes humanos pasan sin overhead. Los detalles completos de implementación están en [Tracking the Invisible: How I Built AI Bot Analytics](/es/blog/tracking-invisible-ai-bot-analytics) — la versión corta es que el middleware de Cloudflare Pages maneja esto limpiamente, usando `context.waitUntil()` para que el evento se dispare sin bloquear la respuesta.

Los patrones a vigilar cubren los actores principales: GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, OAI-SearchBot, más un puñado de otros. Cada coincidencia dispara un evento `ai_bot_visit` con el nombre del bot, la ruta de la página y el método HTTP.

Lo que obtenés de esto es imperfecto pero real: qué bots están rastreando, qué páginas visitan, con qué frecuencia. Esa es la base. Todo lo demás en la medición de AEO se construye sobre esta señal — o le falta completamente.

Para rastrear cuando los agentes solicitan contenido Markdown — vía headers `Accept: text/markdown` o URLs `.md` directamente — eso está cubierto en [Markdown for Agents](/es/blog/aeo-markdown-for-agents), donde vive la arquitectura completa de rastreo junto con la implementación.

---

## El Panorama de la Medición

**Bing Webmaster Tools lanzó un informe de Rendimiento de IA en febrero de 2026 — la primera herramienta oficial de cualquier plataforma importante que muestra con qué frecuencia tu contenido es citado en respuestas generadas por IA. Google todavía no tiene algo equivalente. Las herramientas de terceros existen pero son volátiles.**

Este es el estado de la industria: una herramienta nativa útil, algunas opciones de terceros, y mucho trabajo manual de suposición.

El informe de Rendimiento de IA de Bing es lo más concreto disponible. Obtenés citas totales, qué páginas son referenciadas, y las "consultas de fundamentación" — las frases que usó la IA cuando recuperó tu contenido. Cubre Microsoft Copilot y los resúmenes de Bing AI específicamente. No es un panorama global, pero son datos reales de una plataforma real, lo que lo hace más útil que la mayoría de las alternativas disponibles ahora mismo.

Google no tiene nada comparable para AI Overviews. Google Search Console sigue agrupando los clics de AI Mode dentro del tipo de búsqueda "Web" regular. Si eso es una opacidad intencional o simplemente no está listo, no podría decirlo — pero es una brecha significativa dado que Google genera la mayor cantidad de AI Overviews. La plataforma con mayor presencia te da la menor visibilidad.

Para todo lo demás, las opciones son: [Otterly.ai](https://otterly.ai) para monitoreo de citas entre plataformas, el [AEO Grader gratuito de HubSpot](https://www.hubspot.com/aeo-grader) para una auditoría puntuada contra las mejores prácticas de AEO, y pruebas manuales — corriendo tus consultas objetivo en ChatGPT y Perplexity y verificando si aparecés.

Las pruebas manuales son más útiles de lo que parecen, pero con una advertencia importante. Según [la investigación de AirOps](https://www.airops.com/blog/how-to-test-content-visibility-in-perplexity-and-chatgpt), solo el 30% de las marcas se mantienen visibles de una respuesta de IA a la siguiente, y solo el 20% en cinco ejecuciones consecutivas. Los AI Overviews de Google cambian aproximadamente el 70% de su contenido para la misma consulta entre ejecuciones, con cerca de la mitad de las citas intercambiadas. Una verificación puntual el martes no significa nada para el jueves.

Esta es la parte más débil del ecosistema AEO ahora mismo. Podemos optimizar contenido. Podemos rastrear crawlers. Pero medir "¿con qué frecuencia me cita la IA?" con alguna confianza estadística sigue siendo básicamente un problema sin resolver. El rastreo de bots del lado del servidor es el mejor proxy disponible — al menos podés confirmar que los bots están llegando y qué páginas les interesan. Lo que no podés confirmar es si esas visitas de crawleo se están convirtiendo en citas.

---

## La Auditoría

**Hacer una auditoría estructurada de AEO revela lo que realmente falta — no lo que suponés que falta. Las cuatro dimensiones que importan son Descubribilidad, Extraíbilidad, Confianza y Citabilidad.**

No hay herramientas de auditoría AEO estandarizadas como SEMrush o Lighthouse para SEO y rendimiento. Tenés que construir el checklist vos mismo, o tomarlo prestado de algún lado. El framework de cuatro dimensiones al que llegué cubre las preguntas que realmente importan:

| Dimensión | Qué Mide |
|-----------|-----------------|
| **Descubribilidad** | ¿Pueden los crawlers de IA encontrar y acceder al contenido? (robots.txt, llms.txt, permisos de rastreo) |
| **Extraíbilidad** | ¿Pueden los sistemas de IA analizar significado estructurado? (schema markup, HTML semántico, jerarquía de headings) |
| **Confianza** | ¿Lleva el contenido señales de credibilidad? (atribución de autor, timestamps, fuentes citadas) |
| **Citabilidad** | ¿Está el contenido estructurado para ser citable? (respuestas claras, lenguaje directo, densidad factual) |

Cada dimensión tiene su propio checklist. Puntué el mío en 40/40 — no porque ya fuera perfecto, sino porque el trabajo deliberado de AEO documentado a lo largo de esta serie abordó cada brecha a medida que la encontré. Lo que importa más que el puntaje final es lo que la auditoría revela en el proceso.

Tres cosas me sorprendieron cuando revisé esto sistemáticamente.

**La actualidad importa más de lo que esperaba.** Según [la investigación de Ten Speed](https://www.tenspeed.io/blog/content-freshness-aeo-era), el 76,4% de las páginas citadas por IA fueron actualizadas en los 30 días previos. Los sistemas de IA prefieren contenido que es [un 25,7% más fresco](https://www.hillwebcreations.com/content-freshness/) que lo que surfea la búsqueda tradicional. Agregar timestamps visibles de "última actualización" a los posts llevó a [un 30% más de citas en Perplexity](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026) en un estudio publicado. Los timestamps como señal de confianza no era algo que hubiera considerado antes. Ahora los tengo en todos los posts.

**El contenido bilingüe es un multiplicador real.** Los sitios multilingües correctamente localizados ven [hasta un 327% más de visibilidad en AI Overview](https://koanthic.com/en/multilingual-seo-ai/) comparado con sitios en un solo idioma — y el énfasis está en "localizado", no traducido. Los sistemas de IA evalúan cada idioma de forma independiente. La traducción automática sin adaptación cultural no alcanza. Esto importa para cualquiera que construya un sitio que sirva múltiples idiomas: el trabajo de traducción real rinde en AEO igual que en búsqueda tradicional.

**Las consultas objetivo tienen que ser explícitas.** La auditoría me forzó a mapear contenido contra consultas reales — 30 de ellas, en categorías informacional, comparativa y orientada a la acción. Había estado escribiendo posts que respondían preguntas que nadie estaba haciendo realmente. Ese no es un problema inusual. Mucho contenido se escribe desde la perspectiva del autor ("esto es lo que sé") en lugar de desde la perspectiva del lector ("esto es lo que están tratando de descubrir"). El AEO hace visible esta brecha porque las respuestas de IA se extraen para consultas específicas — el contenido vago no se extrae.

La auditoría también revela requerimientos de mantenimiento. El AEO no es una configuración de una sola vez. Los datos de actualidad solos te dicen que tiene que ser una rutina — actualizar llms.txt, validar schemas, correr consultas objetivo, verificar estadísticas de rastreo. Mensual es probablemente el mínimo.

---

## Hacia Dónde Va Esto

**El tráfico referido de IA creció un 123% entre septiembre de 2024 y febrero de 2025. ChatGPT concentra el 87,4% de ese tráfico. Los estándares de infraestructura todavía se están formando — el grupo de trabajo IETF AIPREF está redactando especificaciones formales para los permisos de contenido de IA. Los sitios que se adapten ahora tienen una ventana.**

Solo el [37% de los equipos de marketing](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) están optimizando activamente para búsqueda con IA. El 70% reconoce que importa. Solo el 20% ha empezado. Las marcas que están implementando ven [3,4 veces más visibilidad](https://blog.hubspot.com/marketing/answer-engine-optimization-trends) que los adoptadores tardíos. La ventaja de ser primero es real, y la ventana todavía está abierta — aunque no va a estarlo indefinidamente.

Los estándares todavía se están escribiendo. El [grupo de trabajo IETF AIPREF](https://www.ietf.org/blog/aipref-wg/), constituido en febrero de 2025, está redactando especificaciones formales sobre cómo los sitios web pueden expresar preferencias sobre el uso de su contenido por IA — categorías separadas para entrenamiento, output de IA y búsqueda. Esa distinción importa. Por ahora, robots.txt es lo mejor que tenemos, y nunca fue diseñado para este problema. Directivas de rastreo que preceden a los grandes modelos de lenguaje por quince años están haciendo un trabajo para el que no fueron pensadas.

Los números de tráfico no son teóricos. El tráfico referido de IA [creció un 123%](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653) entre septiembre de 2024 y febrero de 2025. ChatGPT concentra el 87,4% de ese tráfico. Vercel reportó que las referencias de ChatGPT [crecieron hasta el 10% de sus nuevos registros](https://aiseotracker.com/case-study/vercel). Tally.so vio a ChatGPT convertirse en su principal fuente de referidos, a secas. Son empresas reales reportando números reales — no proyecciones.

El panorama de medición va a mejorar. El informe de Rendimiento de IA de Bing es un comienzo. Más plataformas van a seguir — tienen que hacerlo, porque la demanda de los publicadores por entender el comportamiento de las citas solo va a crecer. Las especificaciones AIPREF eventualmente nos darán marcos de permisos más claros. Y a medida que Markdown for Agents [se vuelva más común](/es/blog/aeo-markdown-for-agents), tendremos mejores señales sobre cómo los agentes están consumiendo realmente el contenido, no solo rastreándolo.

No sé exactamente qué porcentaje del tráfico de este sitio viene de citas de IA ahora mismo — ese problema de medición es real y he sido honesto sobre él a lo largo de este capítulo. Pero los bots están llegando. Las páginas que les interesan son visibles. Y la infraestructura para servirlos bien existe hoy.

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
- [Cloudflare: Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/) — Content negotiation en el edge
