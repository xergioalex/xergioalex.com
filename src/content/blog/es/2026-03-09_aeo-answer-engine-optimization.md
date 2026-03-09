---
title: "Optimizar para Respuestas, No Solo para Rankings: Lo Que Construí para la Era de la Búsqueda con IA"
description: "El SEO me dio rankings. El AEO me dio citas. Todo lo que implementé para hacer visible un sitio estático ante los motores de respuesta con IA — y lo que aprendí en el camino."
pubDate: "2026-03-09T14:00:00"
heroImage: "/images/blog/posts/aeo-answer-engine-optimization/hero.png"
heroLayout: "side-by-side"
tags: ["tech", "web-development", "ai"]
keywords: ["optimización para motores de respuesta AEO", "optimizar sitio web para búsqueda con IA", "llms.txt datos estructurados AEO", "cómo los motores de búsqueda IA citan fuentes", "AEO vs SEO guía práctica", "datos estructurados JSON-LD visibilidad IA", "rastrear tráfico bots IA analítica servidor"]
series: "building-xergioalex"
seriesOrder: 8
---

Tenía buenos puntajes de SEO. Lighthouse 100 en todas las métricas. Páginas indexadas, URLs canónicas validadas, datos estructurados pasando cada prueba que Google me lanzaba. Por cualquier métrica tradicional, el sitio estaba en orden.

Luego empecé a preguntarle a la IA sobre temas en los que había escrito. Probé ChatGPT. Probé Perplexity. Hice preguntas que había respondido en posts reales del blog — con código, con ejemplos concretos, con meses de implementación detrás.

Mi sitio no aparecía. Ni una sola vez.

Eso era el vacío. No en el ranking — en la respuesta. Estaba optimizado para motores de búsqueda. Era invisible para los motores de respuesta.

---

## El Cambio

Durante más de dos décadas, la búsqueda funcionó más o menos igual. Escribías algo, obtenías una lista de enlaces, hacías clic en uno. El juego era: subir tu enlace en esa lista. El SEO se construyó alrededor de eso. Palabras clave, backlinks, meta etiquetas, velocidad de página, diseño móvil — todo al servicio de subir en la lista.

Ese modelo se está rompiendo.

[Gartner predijo](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents) en febrero de 2024 que el volumen de búsqueda tradicional caería un 25% para 2026. En ese momento sonaba exagerado. Ahora, con las búsquedas por usuario en escritorios de EE.UU. [bajando aproximadamente un 20% año tras año](https://searchengineland.com/google-searches-per-us-user-fall-report-468051) y las referencias de publicadores desde Google [cayendo un 38%](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/), la proyección va encaminada.

El cambio no ocurrió de la noche a la mañana. El Knowledge Graph de Google empezó a responder consultas directamente desde 2012. Los Featured Snippets llegaron en 2014. Pero el verdadero quiebre ocurrió en mayo de 2023, cuando Google lanzó la Search Generative Experience — rebautizada luego como AI Overviews.

A principios de 2026, los AI Overviews aparecen en [aproximadamente el 48% de las búsquedas en EE.UU.](https://www.demandsage.com/ai-overviews-statistics/). Cuando aparecen, [el 83% de esas búsquedas terminan sin un clic](https://www.demandsage.com/ai-overviews-statistics/). El usuario recibe la respuesta. La lista de enlaces de abajo — la lista que pasamos años optimizando — no la toca nadie.

Y Google no está solo. ChatGPT llegó a [900 millones de usuarios activos semanales](https://almcorp.com/blog/chatgpt-900-million-weekly-active-users/) en febrero de 2026. Perplexity procesa [entre 35 y 45 millones de consultas al día](https://www.demandsage.com/perplexity-ai-statistics/). Según McKinsey, [el 44% de los usuarios de búsqueda con IA](https://magnawiz.com/answer-engine-optimization-aeo-why-seo-alone-isnt-enough-in-2025-2026/) ahora recurre a la IA como su principal fuente de información — más que la búsqueda tradicional.

Esto no es la muerte del SEO. Es su evolución. La pregunta cambió de "¿cómo rankeo?" a "¿cómo consigo que me citen?"

---

## Qué Es el AEO — Y Por Qué No Es Solo SEO con Otro Nombre

La Optimización para Motores de Respuesta (AEO, por sus siglas en inglés) es la práctica de hacer visible tu contenido ante los sistemas de IA que generan respuestas — y lograr que te citen como fuente en esas respuestas.

[SEMrush lo define](https://www.semrush.com/blog/answer-engine-optimization/) como "un conjunto de prácticas de marketing para aumentar la visibilidad de tu marca en respuestas generadas por IA." [Ahrefs lo plantea diferente](https://ahrefs.com/blog/answer-engine-optimization/): "La búsqueda tradicional consiste en competir por clics. La búsqueda con IA consiste en ser citado dentro de la respuesta misma."

La terminología todavía se está asentando. Algunos le llaman GEO — Generative Engine Optimization. Un [artículo de la Universidad de Princeton](https://arxiv.org/abs/2311.09735) presentado en KDD 2024 acuñó ese término y demostró que estrategias específicas de optimización pueden aumentar la visibilidad en respuestas de motores generativos hasta en un 40%. Otros le llaman LLMO (Large Language Model Optimization). En la práctica se superponen. Yo uso AEO porque es el más descriptivo: estás optimizando para motores que dan respuestas.

Esto es lo que hace al AEO diferente del SEO tradicional:

| | SEO Tradicional | AEO |
|---|---|---|
| **Objetivo** | Rankear en la página de resultados | Ser citado en la respuesta de la IA |
| **Formato** | Páginas de formato largo | Bloques de respuesta estructurados y extraíbles |
| **Objetivo** | Palabras clave y backlinks | Entidades, preguntas, consultas conversacionales |
| **Métricas** | Rankings, tasa de clics | Frecuencia de citas, menciones de marca, sentimiento |

El matiz clave: el AEO no reemplaza al SEO. Son complementarios. Los sistemas de IA favorecen fuertemente el contenido de dominios que ya rankean bien en búsqueda tradicional. [El 86% de las citas en Google AI Overviews](https://ahrefs.com/blog/search-rankings-ai-citations/) provienen de páginas que rankean en el top 100. Un buen SEO alimenta al AEO. Pero el SEO solo ya no es suficiente.

Incluso está surgiendo una nueva capa. Search Engine Land ha empezado a escribir sobre [AAO — Assistive Agent Optimization](https://searchengineland.com/aao-assistive-agent-optimization-469919) — preparar el contenido para agentes de IA que no solo responden preguntas sino que actúan en nombre del usuario. Comprar un vuelo. Comparar productos. Radicar un informe. Todavía no estamos ahí para la mayoría de los sitios. Pero la dirección es clara: SEO → AEO → AAO. Cada capa agrega complejidad. Cada capa multiplica el valor de la anterior.

Lo pienso así: el SEO te indexa. El AEO te cita. El AAO — algún día — te elige.

Estamos viviendo la transición entre la segunda y la tercera capa. Los agentes de IA ya están comprando tiquetes, escribiendo código, comparando productos y tomando decisiones de compra. Cuando un agente evalúa opciones en nombre de un usuario, va a recurrir a los mismos datos estructurados, el mismo contenido rastreado, las mismas señales de confianza que el AEO optimiza. El trabajo que hagas ahora para AEO se multiplica en la era de los agentes. No es especulación — es la arquitectura sobre la que están construidos estos sistemas.

Solo el [37% de los equipos de marketing](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) está haciendo trabajo de AEO activamente ahora mismo. La mayoría sabe que importa. La mayoría no ha empezado. Esa brecha es una oportunidad — por ahora.

---

## Los Motores de Respuesta

Para optimizar para los motores de respuesta, ayuda entender cómo funcionan realmente. No todos operan de la misma manera.

**Google AI Overviews** no usa un crawler separado. Si Googlebot ya indexó tu página, eres elegible. Lo interesante es su [técnica de "query fan-out"](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search) — al construir una respuesta, el sistema lanza múltiples sub-consultas relacionadas. Una página que rankea en posición 40 para un tema relacionado puede terminar citada en la respuesta principal. El contenido con bloques de respuesta específicos y autocontenidos de [134 a 167 palabras](https://wellows.com/blog/google-ai-overviews-ranking-factors/) tiene tasas de selección más altas.

**ChatGPT** corre tres crawlers separados, cada uno controlable de forma independiente: [GPTBot](https://platform.openai.com/docs/bots) para entrenamiento, OAI-SearchBot para su índice de búsqueda, y ChatGPT-User para navegación en tiempo real. Puedes bloquear el entrenamiento mientras permites la búsqueda — son decisiones separadas.

**Claude** también tiene tres bots — ClaudeBot, Claude-SearchBot, y Claude-User. Su búsqueda web [está impulsada por Brave Search](https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/). Los tres [respetan robots.txt](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), incluyendo `Crawl-delay`.

**Perplexity** usa PerplexityBot para indexación (explícitamente [no para entrenamiento de modelos](https://docs.perplexity.ai/guides/bots)) y Perplexity-User para consultas en tiempo real. Favorece la densidad factual, la actualidad y una estructura HTML limpia. Sus dominios más citados: Reddit, YouTube y Gartner — no exactamente el podio del SEO tradicional.

Este sitio permite explícitamente 13 crawlers de IA en `robots.txt`:

```
# AI/LLM Crawlers - Explicitly allowed
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

# ... más Bytespider, CCBot, Applebot-Extended, Amazonbot, Meta-ExternalAgent, cohere-ai
```

Decidí permitirlo todo — tanto crawlers de entrenamiento como de búsqueda. Para un sitio personal, la visibilidad importa más que optar por no participar en un uso de datos que de todas formas no puedo controlar. Un sitio comercial podría pensar diferente — bloquear GPTBot para entrenamiento mientras permite OAI-SearchBot para citas. El punto es que estas son decisiones independientes, y "no hacer nada" también es una decisión. Probablemente la peor.

Algo que me sorprendió: Apple está construyendo su propio sistema de búsqueda con IA. ["World Knowledge Answers"](https://searchengineland.com/apple-world-knowledge-answers-ai-search-461569) se espera en iOS 26.4, impulsado en parte por los modelos Gemini de Google. Su crawler Applebot-Extended ya está evaluando contenido para entrenamiento de IA. Para cuando lance, los sitios que ya permitan Applebot estarán en el índice. Los que no, no.

---

## Las Herramientas

Permitir que entren los crawlers es el mínimo. El trabajo real es hacer el contenido legible por máquinas de formas que ayuden a los sistemas de IA a entenderlo, extraerlo y citarlo.

### llms.txt — Un Menú para Modelos de Lenguaje

La [especificación llms.txt](https://llmstxt.org/) fue propuesta por Jeremy Howard en septiembre de 2024. Es un archivo Markdown en `/llms.txt` que le da a los modelos de lenguaje un resumen estructurado de tu sitio — qué cubre, cómo está organizado, dónde encontrar las cosas.

No voy a pretender que tiene adopción masiva. [SEMrush reporta](https://www.semrush.com/blog/llms-txt/) aproximadamente 844.000 sitios con él, con cerca de un 10% de adopción entre los dominios encuestados. Entre los que lo usan están Anthropic, Cloudflare, Vercel y Supabase — principalmente empresas orientadas a desarrolladores. John Mueller de Google dijo en junio de 2025 que "ningún sistema de IA usa actualmente llms.txt."

Lo construí de todas formas. El costo es unas pocas líneas de Markdown. La ventaja — si algún modelo algún día empieza a leerlo — es un resumen limpio y curado de todo el sitio que un modelo de lenguaje puede consumir en una sola solicitud en lugar de rastrear decenas de páginas.

Así se ve:

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

La versión completa (`llms-full.txt`) va más profundo — descripciones detalladas de páginas, áreas temáticas, stack técnico completo, sus 130 líneas. ¿Lo está usando algún modelo hoy? Probablemente no alguno de los principales. Pero no me cuesta nada mantenerlo, y si algún crawler empieza a leerlo, la información ya está ahí. Lo pienso como un `sitemap.xml` para la era de la IA — útil para tener, barato para mantener.

### Datos Estructurados — Enseñándole a las Máquinas Quién Soy

Aquí es donde el AEO se vuelve concreto. Los datos estructurados JSON-LD le dicen a los sistemas de IA no solo qué hay en una página, sino qué significa — quién lo escribió, cuándo, qué tipo de contenido es, cómo se relaciona con otro contenido.

Este sitio tiene 9 tipos de schema JSON-LD en todas las páginas. El más importante para AEO es el schema `Person` que va en cada página:

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

Cada señal aquí cumple un propósito. `alumniOf` con Y Combinator y la universidad — credibilidad institucional. `worksFor` con DailyBot — contexto profesional. Los enlaces `sameAs` a cuatro perfiles sociales — verificación de identidad. `knowsAbout` — autoridad temática.

Esto es E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) codificado en un formato que las máquinas pueden procesar realmente. Las [Quality Rater Guidelines de Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) describen lo que buscan los evaluadores. Los datos estructurados son la forma de decirle al algoritmo exactamente lo mismo.

Los datos respaldan esto. Las páginas con schema markup tienen [tasas de citación por IA 2.8 veces más altas](https://www.airops.com/blog/schema-markup-aeo). En marzo de 2025, [Google, Microsoft y OpenAI confirmaron](https://www.stackmatix.com/blog/structured-data-ai-search) que usan datos estructurados en sus funciones de IA generativa.

Más allá del schema Person, este sitio incluye `BlogPosting` (con `wordCount`, `timeRequired`, `dateModified` y datos de autor anidados), `BreadcrumbList` en cada página, `Organization` para DailyBot, `WebSite`, `CollectionPage`, `ContactPage` y `ProfilePage`. Nueve tipos en total. Cada uno le da a los sistemas de IA otra dimensión para entender qué es este sitio y quién está detrás.

Le dediqué más tiempo a los datos estructurados que a cualquier otra optimización de AEO. No es trabajo emocionante — escribir schemas JSON, validarlos contra el Rich Results Test de Google, asegurarse de que cada página tenga los tipos correctos. Pero el [estudio de BrightEdge](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353) encontró que los sitios con datos estructurados y bloques FAQ vieron un aumento del 44% en citas de búsqueda con IA. Y es la única optimización que comunica significado directamente a las máquinas — no solo contenido, sino contexto.

---

## Medir Lo Que No Se Puede Ver

La parte más difícil del AEO es la medición. Google Analytics no puede ver los bots de IA. No ejecutan JavaScript. Desde una perspectiva de analíticas del lado del cliente, cada visita de un crawler de IA es invisible.

Cubrí la solución técnica en detalle en un capítulo anterior — un middleware de Cloudflare Pages que inspecciona cada solicitud, verifica el User-Agent contra una lista de 13 crawlers de IA conocidos, y dispara eventos server-side a Umami. Cero overhead de JavaScript, cero impacto en la carga de la página, corre en el edge.

El array de detección de bots se ve así:

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

Ahora puedo ver quién está rastreando, qué páginas visitan, y con qué frecuencia. Ese fue el primer paso.

El segundo llegó en febrero de 2026, cuando Microsoft lanzó el [reporte AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) en Bing Webmaster Tools. Es la primera herramienta de cualquier plataforma importante que muestra con qué frecuencia tu contenido es citado en respuestas de IA — específicamente en Microsoft Copilot y los resúmenes de IA de Bing. Puedes ver el total de citas, qué páginas se referencian y las "grounding queries" — las frases que usó la IA cuando recuperó tu contenido.

No es todo. Todavía no hay algo equivalente de Google para AI Overviews. Google Search Console sigue agrupando los clics de AI Mode en el tipo de búsqueda "Web" regular. Por ahora, las opciones son el reporte de Bing, herramientas de terceros como [Otterly.ai](https://otterly.ai) o el [AEO Grader gratuito de HubSpot](https://www.hubspot.com/aeo-grader), o pruebas manuales — preguntarle a ChatGPT y Perplexity tus consultas objetivo y verificar si apareces.

Un dato que pone los pies en la tierra: según [investigación de AirOps](https://www.airops.com/blog/how-to-test-content-visibility-in-perplexity-and-chatgpt), solo el 30% de las marcas se mantienen visibles de una respuesta de IA a la siguiente, y solo el 20% a través de cinco ejecuciones consecutivas. Los AI Overviews de Google cambian aproximadamente el 70% de su contenido para la misma consulta entre ejecuciones, con cerca de la mitad de las citas rotando. Las citas de IA son volátiles. Las verificaciones puntuales no significan mucho. Hay que medir en el tiempo — y aceptar que los números van a tener ruido.

Esta es, honestamente, la parte más débil del ecosistema AEO ahora mismo. Podemos optimizar el contenido. Podemos rastrear crawlers. Pero todavía no podemos medir claramente "¿con qué frecuencia me cita la IA?" de la forma en que podemos medir "¿cuál es mi CTR orgánico?" Creo que eso cambia en el próximo año a medida que más herramientas como el reporte de Bing entren en escena. Por ahora, el rastreo de bots server-side es el mejor proxy que tenemos.

---

## La Auditoría

Hice una auditoría completa de AEO en este sitio. Cuatro dimensiones, calificadas en una escala de 10 puntos.

| Dimensión | Calificación | Qué Mide |
|-----------|-------------|----------|
| **Descubrimiento** | 10/10 | ¿Pueden los crawlers de IA encontrar y acceder al contenido? |
| **Extractabilidad** | 10/10 | ¿Pueden los sistemas de IA extraer significado estructurado del contenido? |
| **Confianza** | 10/10 | ¿El contenido lleva señales de credibilidad que la IA pueda evaluar? |
| **Citabilidad** | 10/10 | ¿El contenido está estructurado de forma que facilite su cita? |

A+ en general. 40 de 40. Documenté la metodología completa y los hallazgos en los documentos internos de auditoría AEO del sitio — puntajes por dimensión, análisis de brechas, y una lista de cada mejora implementada.

Honestamente, no esperaba esa calificación cuando empecé este trabajo. El sitio tenía buena base — HTML estático, markup semántico, el enfoque de cero JavaScript por defecto de Astro significaba que cada página era limpia, rápida y completamente rastreable. Pero el trabajo deliberado de AEO — los datos estructurados, los archivos llms.txt, los permisos explícitos a crawlers, el rastreo de bots, la paridad multilingüe — eso fue lo que lo llevó al límite.

Algunas cosas que aprendí en el camino:

**La actualidad importa más de lo que esperaba.** Según [la investigación de Ten Speed](https://www.tenspeed.io/blog/content-freshness-aeo-era), el 76.4% de las páginas citadas por IA fueron actualizadas en los 30 días previos. Los sistemas de IA prefieren contenido que es [un 25.7% más reciente](https://www.hillwebcreations.com/content-freshness/) que lo que muestra la búsqueda tradicional. Agregar marcas de tiempo visibles de "última actualización" llevó a [un 30% más de citas en Perplexity](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026) en un estudio.

**El contenido bilingüe es un multiplicador.** Este sitio corre en inglés y español — 59 posts del blog en cada idioma, cada página con ambas versiones. Los sitios multilingüe correctamente localizados ven [hasta un 327% más de visibilidad en AI Overviews](https://koanthic.com/en/multilingual-seo-ai/) comparados con los de un solo idioma. No traducidos — localizados. Los sistemas de IA evalúan cada idioma de forma independiente. La traducción automática sin adaptación cultural no sirve.

**Mapeé 30 consultas objetivo** en tres etapas del embudo — parte alta (informacional), media (comparación), baja (orientada a la acción). Las 30 tienen contenido correspondiente. También construí un checklist de mantenimiento mensual: actualizar llms.txt, validar schemas, ejecutar cinco consultas objetivo contra plataformas de IA, revisar estadísticas de rastreo. El AEO no es una configuración única. Es un proceso continuo.

---

## Hacia Dónde Va Esto

El AEO todavía está en sus inicios. Solo el [37% de los equipos de marketing](https://www.acquia.com/blog/why-answer-engine-optimization-aeo-next-big-thing-digital-strategy-and-why-most-brands-arent) está optimizando activamente para búsqueda con IA. El 70% reconoce que importa, pero solo el 20% ha empezado a implementarlo. Las marcas que sí lo hacen están capturando [3.4 veces más visibilidad](https://blog.hubspot.com/marketing/answer-engine-optimization-trends) que los que llegan tarde.

Los estándares todavía se están formando. El [grupo de trabajo IETF AIPREF](https://www.ietf.org/blog/aipref-wg/), creado en febrero de 2025, está redactando especificaciones formales para que los sitios web puedan expresar preferencias sobre el uso de su contenido por IA — categorías separadas para entrenamiento, output de IA y búsqueda. Eso va a ser importante. Por ahora, robots.txt es lo mejor que tenemos, y nunca fue diseñado para esto.

El tráfico de referencia desde IA es real y está creciendo. [Creció un 123%](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653) entre septiembre de 2024 y febrero de 2025. ChatGPT mueve el 87.4% de ese tráfico. Vercel reportó que las referencias de ChatGPT [crecieron hasta el 10% de sus nuevos registros](https://aiseotracker.com/case-study/vercel). Tally.so vio a ChatGPT convertirse en su principal fuente de referencia. No son proyecciones teóricas. Son números reales de empresas reales.

No sé exactamente cuánto del tráfico de este sitio viene de citas de IA. Eso todavía es difícil de medir con precisión. No sé qué ciclos de entrenamiento de modelos incluyeron este contenido, ni si algún dataset de fine-tuning lo tomó. Pero puedo ver los crawlers llegando. Puedo ver qué páginas visitan. Puedo ver el reporte AI Performance de Bing mostrando citas.

El terreno bajo la búsqueda se está moviendo. El SEO tradicional todavía importa — es la base sobre la que todo lo demás está construido. Pero la siguiente capa ya está aquí. El AEO ya no es una tendencia para observar. Es algo para construir.

Y si estás leyendo esto pensando "creo que debería hacer algo al respecto" — ya estás por delante del 63% de los equipos de marketing. Empieza con los datos estructurados. Agrega un `llms.txt`. Revisa tu robots.txt. Rastrea tus bots. Ejecuta tus consultas en ChatGPT y Perplexity. El listón está bajo ahora mismo, y la ventaja del primero en actuar es real.

A seguir construyendo.

---

## Recursos

**Estándares y Especificaciones**
- [Especificación Oficial de llms.txt](https://llmstxt.org/)
- [Schema.org](https://schema.org/)
- [Google: Funciones de IA y tu Sitio Web](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Cómo Tener Éxito en la Búsqueda con IA](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)
- [Google: Introducción a los Datos Estructurados](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Grupo de Trabajo IETF AIPREF](https://www.ietf.org/blog/aipref-wg/)

**Documentación de Crawlers**
- [Crawlers de OpenAI](https://platform.openai.com/docs/bots)
- [Crawlers de Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Crawlers de Perplexity](https://docs.perplexity.ai/guides/bots)

**Herramientas**
- [Reporte AI Performance de Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- [AEO Grader de HubSpot (Gratuito)](https://www.hubspot.com/aeo-grader)

**Investigación y Guías**
- [Artículo GEO de Princeton — Generative Engine Optimization (KDD 2024)](https://arxiv.org/abs/2311.09735)
- [Gartner: Predicción de Caída en el Volumen de Búsqueda](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents)
- [SEMrush: Answer Engine Optimization](https://www.semrush.com/blog/answer-engine-optimization/)
- [Ahrefs: Answer Engine Optimization](https://ahrefs.com/blog/answer-engine-optimization/)
- [CXL: Guía AEO](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/)
