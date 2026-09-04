---
title: "La ola china de pesos abiertos: empatados en el trabajo, meses atrás en el arma"
description: "Los labs chinos publican modelos de pesos abiertos que empatan con la clase Mythos en código, a una fracción del precio. La brecha que queda cuenta la historia."
pubDate: "2026-09-05"
heroImage: "/images/blog/posts/chinese-frontier-models-closing-the-gap/hero.webp"
heroLayout: "banner"
tags: ["tech", "ai-agents", "personal"]
keywords: ["Kimi K3 pesos abiertos", "modelos de IA chinos vs Claude", "benchmarks GLM-5.3", "precio DeepSeek V4", "modelos open weight frontera 2026", "brecha modelos chinos Mythos", "Terminal-Bench modelos chinos", "controles de exportación IA pesos abiertos"]
series: "the-agi-race"
seriesOrder: 3
---

*"Something that has become undeniable this month is that the best available open weight models now come from the Chinese AI labs."* ("Algo que se ha vuelto innegable este mes es que los mejores modelos de pesos abiertos disponibles ahora vienen de los labs chinos de IA.") Cuando [Simon Willison](https://simonwillison.net/2026/Jul/27/kimi-k3/) — el desarrollador cuyos análisis independientes de modelos he seguido y en los que he confiado más tiempo que a cualquier sitio de benchmarks — escribe una frase así, no es hype. Es un hombre que evalúa estas cosas para vivir diciéndote que el piso se movió.

Me pasé el verano mirando el lado americano de esta historia. El modelo demasiado peligroso para liberar, luego liberado, luego [retirado del mercado por su propio gobierno en tres días](/es/blog/claude-fable-5-mythos-unleashed/). Suspensiones, controles de exportación, clasificadores de seguridad, una coalición defensiva de 100 millones de dólares. Mientras todo eso pasaba, una historia más silenciosa se desenvolvía en el otro lado de la carrera — una sin cliffhangers y sin directivas gubernamentales. Solo pesos. Descargables, casi de frontera, con precios que parecen un error de dedo.

Este capítulo es sobre esa historia. Y confieso dónde empecé: yo asumí que "los modelos chinos están casi al nivel de Mythos" era la exageración de siempre en temporada de benchmarks. Luego leí las tablas. La afirmación es parcialmente cierta, parcialmente falsa, y la línea entre las dos partes es lo más interesante de toda la carrera.

---

## La ola que nadie promocionó

Empieza con la línea de tiempo, porque su densidad es la historia:

| Fecha | Modelo | Lab | Qué salió |
|-------|--------|-----|-----------|
| 24 de abril | DeepSeek-V4 Preview | DeepSeek | Versión Pro de 1,6T de parámetros, licencia MIT, pesos en Hugging Face |
| 22 de junio | GLM-5.2 | Z.ai (Zhipu) | Enfocado en código, pesos abiertos |
| Mediados de julio | **Kimi K3** | Moonshot AI | 2,8T de parámetros, contexto de 1M de tokens, pesos públicos el 27 de julio |
| 3 de agosto | Qwen3.8-Max | Alibaba | 2,4T de parámetros — cerrado, solo API |
| 13 de agosto | DeepSeek V4-Pro GA | DeepSeek | Disponibilidad general del nivel Pro |
| 14 de agosto | **GLM-5.3** | Z.ai | Ganancias solo de post-entrenamiento, pesos dos semanas después |

Seis lanzamientos cercanos a la frontera en cuatro meses, de cinco labs, mientras la frontera americana alcanzó a tener un lanzamiento público y una suspensión gubernamental. Willison [siguió el arco todo el año](https://simonwillison.net/2026/Apr/24/deepseek-v4/): en abril, DeepSeek V4 estaba "almost on the frontier, a fraction of the price" ("casi en la frontera, por una fracción del precio"). Para finales de julio, después de que los pesos de Kimi K3 aterrizaran, su veredicto se había endurecido en la frase con la que abre este post.

El número de adopción que me detuvo: los modelos chinos superaron a los americanos en descargas de Hugging Face esta primavera — [41% de todas las descargas](https://www.csis.org/analysis/what-know-about-chinese-ai-models) del último año, según CSIS, el think tank de seguridad con sede en Washington. Eso no es curiosidad de desarrolladores. Es los constructores del mundo esquivando en silencio una frontera americana que no para de cerrar sus propias puertas.

---

## Qué significa realmente "casi Mythos"

Aquí tengo que ser cuidadoso, porque "casi al nivel de Mythos" está cargando mucho en esa frase, y la respuesta honesta depende de qué capacidad midas.

La tabla más útil viene de un lugar inesperado: [el propio anuncio de GLM-5.3 de Z.ai](https://z.ai/blog/glm-5.3), que publica una comparación incluyendo Mythos 5, Fable 5, GPT-5.6 Sol y Opus 4.8 — un lab chino benchmarkeando voluntariamente contra los modelos americanos que persigue, con notas al pie y todo. De ahí salen tres niveles.

**Nivel uno: el trabajo es un empate.** En Terminal-Bench 2.1 — tareas reales de terminal, el pan de cada día del código agéntico — la diferencia entre cinco labs es de menos de un punto: GLM-5.3 en 88,2, Kimi K3 en 88,3, Fable 5 en 88,0, GPT-5.6 Sol en 88,8. En SWE-Marathon, una prueba de código de largo aliento, Kimi K3 no solo empata con los americanos — los bate, 48,1 contra 33,1 de Fable 5. Y en GDPval-AA v2, un benchmark de trabajo económico corrido de forma independiente por Artificial Analysis, GLM-5.3 encabeza la tabla completa con 1769, por encima de Fable 5 y GPT-5.6 Sol.

Traducción: para el trabajo que la mayoría de nosotros le delegamos de verdad a estos modelos — escribir código, usar terminales, completar tareas — la frontera china no viene en camino. Ya llegó.

**Nivel dos: un cruce real.** En CyberGym, que mide encontrar vulnerabilidades, GLM-5.3 sacó 84,5 — por encima del 83,8 de Mythos 5 y del 83,6 de Sol. Un modelo chino es ahora el mejor del mundo *descubriendo* fallas de seguridad, al menos en ese benchmark, en ese harness.

**Nivel tres: la brecha del arma.** Pero encontrar una vulnerabilidad y convertirla en arma son trabajos distintos. En ExploitBench — encadenar una falla hasta un exploit funcional — GLM-5.3 saca 54,4 contra aproximadamente 78 de Mythos 5. En las corridas largas de ExploitGym, 105/130 contra 181/247 de Mythos. Esta es exactamente la capacidad que llevó a que Mythos fuera clasificado como arma en abril. Y Z.ai, para su crédito, lo dice en su propio anuncio: *"Capability is growing fastest exactly where we are furthest behind."* ("La capacidad crece más rápido justo donde más rezagados estamos.")

Esa es la frase que más respeto en todo este capítulo. Un lab admitiendo, por escrito, que la capacidad más aterradora es justamente la que no ha alcanzado.

Las mediciones independientes coinciden con la lectura honesta. El organismo de pruebas de NIST [evaluó DeepSeek V4 Pro](https://www.csis.org/analysis/what-know-about-chinese-ai-models) como "ocho meses atrás" de los modelos americanos líderes en mayo. La contaminación también es un tema vivo — el preview de DeepSeek de abril sacó 8% en un benchmark de código libre de contaminación contra sus números autoreportados mucho más altos, y las afirmaciones de frontera de Qwen3.8-Max terminaron etiquetadas de ["benchmaxxed"](https://www.reddit.com/r/singularity/comments/1ve0hp7/qwen_38_max_benchmarks/) por la comunidad, con corridas independientes ubicándolo cerca de GLM-5.2, no de la frontera.

Así que: empatados en el trabajo. Meses, no años, atrás en general. Y todavía claramente detrás en las cadenas de explotación profunda que definen "clase Mythos" en primer lugar. Quien te diga que China ya alcanzó a todos — o que va demasiado atrás — te está vendiendo un narrativo.

---

## China corrió la misma jugada

Aquí está la parte que de verdad me sorprendió. Yo esperaba que la historia china fuera un contraste con la americana — caos abierto contra harnesses controlados. No es un contraste. Es una rima.

La capacidad cibernética de GLM-5.3 se desarrolló más rápido de lo que Z.ai esperaba durante el post-entrenamiento, y la respuesta de la empresa [se leyó como el playbook de Anthropic](https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride): un lanzamiento por etapas — primero socios de seguridad, luego la API, luego los pesos — más un clasificador de peticiones y monitoreo de cadena de pensamiento. Sospechosamente familiar, si leíste [mi capítulo sobre harnesses](/es/blog/the-harness-layer/). Toda la industria vio lo que le pasó a Mythos y adoptó el template en silencio.

Z.ai hasta corrió su propio Glasswing. Trabajando con equipos de seguridad chinos, GLM-5.2 y 5.3 identificaron [2.436 vulnerabilidades en 269 proyectos](https://z.ai/blog/glm-5.3) — 107 de ellas críticas, la más antigua de 1981 — y publicaron los hallazgos en un Security Disclosure Ledger público. Reportado por el lab, eso sí; no encontré auditoría independiente. Pero la forma es inconfundible: encuentra los huecos, divúlgalos responsablemente, parcha al mundo. Eso es Project Glasswing con características chinas.

La diferencia es qué pasa después del harness. Nathan Lambert, el analista detrás de Interconnects, lo dijo sin rodeos: una vez que los pesos abiertos salen, "this type of safety barely matters" ("este tipo de seguridad casi no importa") — cualquiera puede tomar el modelo, quitarle el clasificador y correrlo. El harness gobierna la puerta, no los pesos. Para Fable, la puerta es la única entrada. Para GLM y Kimi, los pesos terminan saliendo por la puerta, y entonces el harness es una sugerencia.

---

## Dieciocho días

Ahora la ironía, y quiero ser preciso porque esta parte sostiene mucho peso.

El 12 de junio, el gobierno de Estados Unidos obligó a Anthropic a apagar Fable 5 y Mythos 5 — las versiones *filtradas*, envueltas en clasificadores — para todos los usuarios del planeta, porque el reporte de un jailbreak levantó la posibilidad de acceso extranjero a capacidad cibernética nivel Mythos. Durante dieciocho días, el modelo frontera más vigilado de Occidente no estuvo disponible para nadie. Durante esos mismos dieciocho días, modelos a menos de un punto de la frontera americana en trabajo agéntico — y a un paso en descubrimiento de vulnerabilidades — eran descargas gratis en Hugging Face, disponibles en cualquier país, para cualquiera, sin ninguna verificación.

Un artículo de opinión en FT llamó a la suspensión ["a gift to China"](https://www.ft.com/content/d286851f-dcf6-4284-93cc-99063e169c11) ("un regalo para China") — está tras un muro de pago, así que solo conozco el argumento de segunda mano, pero el análisis de CSIS hace el mismo caso a cielo abierto: el episodio de junio fue la primera vez que los controles de exportación se aplicaron al *acceso a un modelo* y no a los chips, y la percibida falta de confiabilidad "empujará a los usuarios hacia los pesos abiertos chinos". La directiva de junio también asustó a los aliados — Canadá, Reino Unido, la Unión Europea, Australia e India emitieron advertencias sobre depender de IA americana.

Y un dato más que merecería ser famoso: Epoch AI midió [un spike de 3,5x en CVEs divulgados](https://epoch.ai/data-insights/cve-severity-spike) — vulnerabilidades de seguridad reales, publicadas — en el período posterior al anuncio de Mythos y Glasswing de abril. La capacidad no es un demo. Está en las bases de datos de vulnerabilidades.

---

## Qué significa esto para los que construimos

Vamos a lo concreto, porque este es un blog escrito para gente que construye software.

La tabla de precios es un argumento por sí sola. DeepSeek V4 Flash cuesta 0,14 dólares por millón de tokens de entrada y 0,28 por millón de salida. Fable 5 cuesta 10 y 50. Eso no es un descuento — es un universo distinto, más o menos 70 veces en la entrada, por un modelo que Willison llamó "casi en la frontera" en abril. Kimi K3 está en 3/15 dólares, y GLM-5.3-Flash afirma código de clase Opus 4.8 a un 5% del costo, ejecutable en un Mac Studio de 128 GB. Tu factura de modelos frontera es ahora una elección, no un hecho.

El costo de cambio también es casi cero. En Hacker News, un desarrollador describió pasar Claude Code a Kimi K3: ["it took like 30 seconds"](https://news.ycombinator.com/item?id=48981703) ("tomó como 30 segundos"). Los harnesses de agentes en los que hemos pasado dos años construyendo resultaron ser agnósticos del modelo. El harness es el foso; el modelo es un archivo de configuración.

Las advertencias son reales, eso sí, y no son las que venden los titulares. La censura varía por *proveedor*, no por nacionalidad — en un estudio de 168 preguntas, Kimi K2.5 [respondió el 98,8%](https://www.ellamind.com/blog/llm-censorship-bias-china) de las preguntas de temas sensibles, una tasa comparable a GPT y Claude, mientras DeepSeek falló el 81% de ellas. "Los modelos chinos están censurados" es tan preciso como "los modelos americanos son seguros". Qué modelo importa más que qué país.

Y las acusaciones de destilación — OpenAI y Anthropic alegando que labs chinos extrajeron datos de entrenamiento a través de 24.000 cuentas fraudulentas — recuerdan que esta carrera tiene una capa de espionaje industrial que las tablas de benchmarks no muestran.

¿Entonces dónde queda la carrera? Yo creo que queda aquí: por primera vez, la frontera es una elección con tres puertas. Alojado y vigilado (Fable, con sus clasificadores y sus enredos gubernamentales). Alojado y a escala (OpenAI — una historia para un capítulo posterior de esta serie). O descargable (Kimi, GLM, DeepSeek — capacidad que puedes tener, con todo lo que tenerla implica). La capacidad dejó de ser el diferenciador este año. Lo que queda es la gobernanza.

Willison lo dijo mejor, y vale la pena terminar donde empezamos: los mejores modelos de pesos abiertos ahora vienen de los labs chinos. Los mejores vigilados vienen de América. La pregunta más interesante de los próximos años no es qué modelo gana — es por cuál puerta entran los constructores del mundo.

A seguir construyendo. Con los ojos abiertos.

---

## Recursos

- [Anuncio de GLM-5.3 de Z.ai](https://z.ai/blog/glm-5.3) — la tabla de benchmarks comparando GLM-5.3, Kimi K3, Mythos 5, Fable 5 y GPT-5.6 Sol, más el programa de divulgación de vulnerabilidades
- [Simon Willison sobre Kimi K3](https://simonwillison.net/2026/Jul/27/kimi-k3/) — evaluación independiente y con las manos en la masa del lanzamiento de pesos abiertos de 2,8T
- [Simon Willison sobre DeepSeek V4](https://simonwillison.net/2026/Apr/24/deepseek-v4/) — "casi en la frontera, por una fracción del precio", con precios verificados
- [Model card de Kimi K3](https://huggingface.co/moonshotai/Kimi-K3) — especificaciones, evaluaciones y la licencia personalizada (servicios de modelos con ingresos >$20M necesitan acuerdo aparte)
- [CSIS: Qué saber sobre los modelos de IA chinos](https://www.csis.org/analysis/what-know-about-chinese-ai-models) — el 41% de las descargas, la evaluación de NIST de "ocho meses atrás" y el análisis de controles de exportación
- [Interconnects: cómo los labs chinos mantienen el paso](https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride) — análisis de Nathan Lambert sobre el lanzamiento por etapas del GLM-5.3 y lo que los pesos abiertos le hacen a la seguridad
- [Epoch AI: spike en severidad de CVEs](https://epoch.ai/data-insights/cve-severity-spike) — el aumento de 3,5x en vulnerabilidades divulgadas tras el anuncio de Mythos
- [ellamind: estudio de censura en LLMs](https://www.ellamind.com/blog/llm-censorship-bias-china) — la censura varía por proveedor: 98,8% de respuesta en Kimi contra 81% de fallas en DeepSeek
