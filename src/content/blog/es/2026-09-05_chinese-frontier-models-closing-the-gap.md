---
title: "La frontera se descarga gratis: la ola china de pesos abiertos"
description: "Los labs chinos igualaron a la frontera en trabajo agéntico y la volvieron descarga gratis. Qué tiene de cierto el 'casi Mythos', qué no, y qué cuesta."
pubDate: "2026-09-05"
heroImage: "/images/blog/posts/chinese-frontier-models-closing-the-gap/hero.webp"
heroLayout: "banner"
tags: ["tech", "ai-agents", "personal"]
keywords: ["Kimi K3 pesos abiertos", "modelos de IA chinos vs Claude", "benchmarks GLM-5.3", "precio DeepSeek V4", "modelos open weight frontera 2026", "brecha modelos chinos Mythos", "Terminal-Bench modelos chinos", "controles de exportación IA pesos abiertos"]
series: "the-agi-race"
seriesOrder: 3
---

Durante dieciocho días de junio no pudiste alquilar el modelo de IA más vigilado de Occidente. Pudiste descargarte un casi-equivalente gratis.

Esa frase me tomó tres semanas creérmela. La primera mitad la viví en tiempo real — [la suspensión por control de exportaciones](/es/blog/claude-fable-5-mythos-unleashed/), el modelo apagado en todo el mundo, todo el drama de la frontera filtrada jalando su propio enchufe. La segunda mitad tuve que salir a buscarla, porque nadie escribió titulares sobre ella. Mientras Fable 5 estaba apagado, los labs chinos estaban publicando modelos cercanos a la frontera como pesos descargables, para cualquiera, en cualquier país, por el costo de un disco duro. Sin verificación. Sin coalición. Sin llamada del Departamento de Comercio.

Para julio, Simon Willison — el desarrollador cuyos análisis de modelos he seguido y en los que he confiado más que en cualquier sitio de benchmarks — había visto suficiente para decirlo en voz alta: *"Something that has become undeniable this month is that the best available open weight models now come from the Chinese AI labs."* ("Algo que se ha vuelto innegable este mes es que los mejores modelos de pesos abiertos disponibles ahora vienen de los labs chinos de IA.") Cuando Willison llama innegable a algo, no es una opinión caliente. Es un hombre que evalúa estas cosas para vivir admitiendo que el piso se movió debajo de él.

Quiero ser honesto con dónde empecé, porque este capítulo es en parte una corrección — mía. Yo asumí que "los modelos chinos están casi al nivel de Mythos" era la exageración de siempre en temporada de benchmarks, el tipo de afirmación que se derrite al contacto con una prueba independiente. Luego leí las tablas. La afirmación resultó ser en parte cierta, en parte falsa, y la línea entre las dos mitades es lo más interesante de toda la carrera. Así que voy a dibujar la línea con cuidado.

---

## Seis lanzamientos, cuatro meses, cero ruedas de prensa

La densidad de la ola es la historia antes que cualquier benchmark. [DeepSeek V4](https://simonwillison.net/2026/Apr/24/deepseek-v4/) aterrizó en abril — un mixture-of-experts de 1,6 billones de parámetros con pesos bajo licencia MIT, mientras Mythos todavía era un rumor. GLM-5.2 siguió a finales de junio, diez días después de la suspensión. A mediados de julio, Moonshot — el lab detrás de los modelos Kimi — [liberó Kimi K3](https://simonwillison.net/2026/Jul/27/kimi-k3/): 2,8 billones de parámetros, contexto de un millón de tokens y pesos completamente abiertos en Hugging Face desde el 27 de julio. Alibaba respondió con Qwen3.8-Max a principios de agosto. DeepSeek llevó su nivel Pro a disponibilidad general el 13 de agosto. Y el 14 de agosto, Z.ai — un lab que la mayoría de lectores occidentales no había oído nombrar — liberó GLM-5.3, que es donde esta historia se complica.

Seis lanzamientos cercanos a la frontera en menos de cuatro meses, de cinco labs, mientras la frontera americana alcanzó a tener un lanzamiento público y una suspensión gubernamental. Willison siguió el arco todo el año: en abril llamó a DeepSeek V4 "almost on the frontier, a fraction of the price" ("casi en la frontera, por una fracción del precio"). Para finales de julio, el "casi" ya no estaba.

Y el mundo se dio cuenta en silencio. Los modelos chinos superaron a los americanos en descargas de Hugging Face esta primavera — [41% de todas las descargas](https://www.csis.org/analysis/what-know-about-chinese-ai-models) del último año, según CSIS, el think tank de seguridad de Washington. Ese número no es curiosidad de desarrolladores. Es los constructores del mundo esquivando, dependencia a dependencia, una frontera americana que no para de cerrar sus propias puertas.

---

## La afirmación, desarmada

"Casi al nivel de Mythos" está cargando mucho trabajo en una frase, y la respuesta honesta depende por completo de qué capacidad midas. La mejor evidencia viene de un lugar inesperado: [el propio anuncio de GLM-5.3 de Z.ai](https://z.ai/blog/glm-5.3), que publica una tabla comparativa incluyendo Mythos 5, Fable 5 y GPT-5.6 Sol — un lab chino benchmarkeándose voluntariamente contra los modelos americanos que persigue, con notas al pie y todo. Eso no lo hace quien esconde algo. Lo hace quien cree que está cerca.

**En el trabajo, es un empate — y sigo teniendo que reescribir esa frase en estado de incredulidad.** Terminal-Bench 2.1 son tareas reales de terminal, el pan de cada día del código agéntico, y la diferencia entre cinco labs es de menos de un punto: GLM-5.3 en 88,2, Kimi K3 en 88,3, Fable 5 en 88,0, GPT-5.6 Sol en 88,8. En SWE-Marathon, una prueba de código de largo aliento, Kimi K3 no alcanza a los americanos — los bate, 48,1 contra 33,1 de Fable 5. Y en GDPval-AA v2, un benchmark de trabajo económico corrido de forma independiente por Artificial Analysis, GLM-5.3 encabeza todo el campo con 1769.

Traducción: para el trabajo que la mayoría de nosotros le delegamos de verdad a estos modelos — escribe el código, corre la terminal, termina la tarea — la pregunta "¿están cerca?" ya está respondida. La frontera no viene en camino. Ya está aquí, y parte de ella tiene botón de descarga.

**En una capacidad estrecha, el cruce ya pasó.** CyberGym mide encontrar vulnerabilidades de seguridad — la disciplina que hizo a Mythos aterrador. GLM-5.3 sacó 84,5, por encima del 83,8 de Mythos 5 y del 83,6 de GPT-5.6 Sol. En ese benchmark, un modelo chino es el mejor del mundo descubriendo fallas de seguridad.

**Y en la capacidad que arrancó toda esta saga, la brecha es real.** Encontrar una vulnerabilidad y convertirla en arma son trabajos distintos. En ExploitBench — encadenar una falla hasta un exploit funcional, la prueba exacta que llevó a que Mythos fuera clasificado como arma en abril — GLM-5.3 saca 54,4 contra aproximadamente 78 de Mythos 5. En las corridas largas de ExploitGym, son 105 de 130 puntos donde Mythos se lleva 181. Y aquí está la frase que se ganó más de mi respeto que cualquier benchmark de este capítulo: Z.ai lo dice de sí misma, en su propio post de lanzamiento. *"Capability is growing fastest exactly where we are furthest behind."* ("La capacidad crece más rápido justo donde más rezagados estamos.") Un lab admitiendo por escrito que la capacidad más aterradora es justamente la que no ha alcanzado — nunca he visto un lanzamiento americano decir algo parecido.

Las mediciones independientes respaldan la lectura honesta. El organismo de pruebas de NIST evaluó DeepSeek V4 Pro en mayo como ["ocho meses atrás"](https://www.csis.org/analysis/what-know-about-chinese-ai-models) de los modelos americanos líderes. La contaminación es un tema vivo — el preview de DeepSeek de abril sacó 8% en un benchmark de código libre de contaminación contra números autoreportados mucho más altos, y las afirmaciones de frontera de Qwen3.8-Max terminaron etiquetadas de ["benchmaxxed"](https://www.reddit.com/r/singularity/comments/1ve0hp7/qwen_38_max_benchmarks/) por la comunidad, con corridas independientes ubicándolo cerca de GLM-5.2, no de la frontera.

Así que el marcador lee: empatados en el trabajo, meses y no años atrás en general, todavía claramente detrás en las cadenas de explotación profunda que definen "clase Mythos" en primer lugar. Quien te diga que China ya alcanzó a todos — o que va irremediablemente atrás — te está vendiendo un narrativo. La verdad es más interesante que las dos cosas, y está publicada en un post de lanzamiento desde Beijing.

---

## Glasswing, con características chinas

Aquí está la parte que recableó mi forma de pensar esta carrera. Yo esperaba que la historia china fuera lo opuesto a la americana — caos abierto contra harnesses controlados. No es lo opuesto. Es la misma jugada, corrida por otro equipo.

La capacidad cibernética de GLM-5.3 se desarrolló más rápido de lo que Z.ai esperaba durante el post-entrenamiento, y la respuesta de la empresa [se leyó como el playbook de Anthropic](https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride): un lanzamiento por etapas — primero socios de seguridad, luego la API, luego los pesos — más un clasificador de peticiones y monitoreo de cadena de pensamiento. Sospechosamente familiar, si leíste [mi pieza sobre harnesses](/es/blog/the-harness-layer/). Toda la industria vio lo que le pasó a Mythos y adoptó el template en silencio.

Z.ai hasta corrió su propio Glasswing. Trabajando con equipos de seguridad chinos, GLM-5.2 y 5.3 identificaron [2.436 vulnerabilidades en 269 proyectos](https://z.ai/blog/glm-5.3) — 107 de ellas críticas, la más antigua de 1981 — y publicaron los hallazgos en un Security Disclosure Ledger público. Reportado por el lab, eso sí; no encontré auditoría independiente. Pero la forma es inconfundible: encuentra los huecos, divulga responsablemente, parcha al mundo. Project Glasswing con características chinas.

La diferencia es qué pasa *después* del harness. Nathan Lambert, el analista detrás de Interconnects, lo puso sin anestesia: una vez que los pesos abiertos salen, "this type of safety barely matters" ("este tipo de seguridad casi no importa"). Cualquiera puede tomar el modelo, quitarle el clasificador y correrlo crudo. El harness gobierna la puerta. Para Fable, la puerta es la única entrada. Para GLM y Kimi, los pesos tarde o temprano salen por la puerta — y entonces el harness es una sugerencia.

---

## Qué compraron dieciocho días

Ahora de vuelta a la frase con la que abre este capítulo, porque la aritmética de esa frase es brutal.

Washington apagó el modelo *filtrado*, envuelto en clasificadores y salvaguardado, por el reporte de un jailbreak — y lo hizo tan amplio que hasta los defensores perdieron el acceso. Durante esos dieciocho días, modelos a menos de un punto de la frontera americana en trabajo agéntico, y a un paso en descubrimiento de vulnerabilidades, eran descargas gratis en cada país del planeta. Un artículo de opinión en FT llamó a la suspensión ["a gift to China"](https://www.ft.com/content/d286851f-dcf6-4284-93cc-99063e169c11) ("un regalo para China") — el argumento está tras un muro de pago, pero CSIS hace el mismo caso a cielo abierto: la directiva de junio fue la primera vez que los controles de exportación se aplicaron al *acceso a un modelo* y no a los chips, y la percibida falta de confiabilidad "empujará a los usuarios hacia los pesos abiertos chinos". Los aliados se dieron cuenta. Canadá, Reino Unido, la Unión Europea, Australia e India emitieron advertencias sobre depender de la IA americana.

Un dato más que merecería ser famoso y no lo es: Epoch AI midió [un spike de 3,5x en CVEs divulgados](https://epoch.ai/data-insights/cve-severity-spike) — vulnerabilidades reales, radicadas, públicas — en el período posterior a los anuncios de Mythos y Glasswing de abril. De cualquier lado de esta carrera que hagas barra, la capacidad ya no es un demo. Está en las bases de datos de vulnerabilidades.

---

## Qué significa esto en el teclado

Suficiente geopolítica. Este es un blog para gente que construye software, así que hablemos de tu factura.

DeepSeek V4 Flash cuesta 0,14 dólares por millón de tokens de entrada y 0,28 por millón de salida. Fable 5 cuesta 10 y 50. Eso no es un descuento; es otro universo — más o menos setenta veces más barato en entrada por un modelo que Willison llamó casi de frontera en abril. Kimi K3 está en 3/15. GLM-5.3-Flash afirma código de clase Opus 4.8 a un 5% del costo, y corre en un Mac Studio de 128 GB sobre tu escritorio. Tu factura de modelos frontera dejó de ser un hecho este año. Ahora es una elección.

El costo de cambio es cómicamente bajo. Un desarrollador en Hacker News describió pasar Claude Code a Kimi K3: ["it took like 30 seconds."](https://news.ycombinator.com/item?id=48981703) ("tomó como 30 segundos.") Los harnesses en los que pasamos dos años construyendo — la ingeniería de contexto, los skills, las guías — resultaron ser agnósticos del modelo. El harness es el foso ahora. El modelo es un archivo de configuración.

Las advertencias son reales, pero no son las que venden los titulares. La censura varía por *proveedor*, no por nacionalidad: en un estudio de 168 preguntas, Kimi K2.5 [respondió el 98,8%](https://www.ellamind.com/blog/llm-censorship-bias-china) de las preguntas de temas sensibles — una tasa comparable a GPT y Claude — mientras DeepSeek falló el 81% de ellas. "Los modelos chinos están censurados" es tan preciso como "los modelos americanos son seguros". El modelo importa más que la bandera. Y las acusaciones de destilación — OpenAI y Anthropic alegando que labs chinos extrajeron datos de entrenamiento a través de 24.000 cuentas fraudulentas — recuerdan que debajo de las tablas de benchmarks, esto también es una historia de espionaje industrial.

¿Entonces dónde queda la carrera de verdad, desde el teclado? Tres puertas, una frontera. Alojado y vigilado — Fable, con sus clasificadores y sus enredos gubernamentales. Alojado y a escala — OpenAI, cuya respuesta estaba aterrizando mientras escribía esto. O descargable — Kimi, GLM, DeepSeek: capacidad que puedes tener, con todo lo que tenerla implica. La capacidad dejó de ser el diferenciador este verano. Lo que queda es la gobernanza.

La frontera ahora se descarga gratis. El foso se movió — y por primera vez en esta serie, no estoy seguro de que alguien sepa hacia dónde.

A seguir construyendo. Con los ojos abiertos.

---

## Recursos

- [Anuncio de GLM-5.3 de Z.ai](https://z.ai/blog/glm-5.3) — la tabla de benchmarks comparando GLM-5.3, Kimi K3, Mythos 5, Fable 5 y GPT-5.6 Sol, más el programa público de divulgación de vulnerabilidades
- [Simon Willison sobre Kimi K3](https://simonwillison.net/2026/Jul/27/kimi-k3/) — evaluación independiente y con las manos en la masa del lanzamiento de pesos abiertos de 2,8 billones de parámetros
- [Simon Willison sobre DeepSeek V4](https://simonwillison.net/2026/Apr/24/deepseek-v4/) — "casi en la frontera, por una fracción del precio", con precios verificados
- [Model card de Kimi K3](https://huggingface.co/moonshotai/Kimi-K3) — especificaciones, evaluaciones y la licencia personalizada (servicios de modelos con más de $20M de ingresos necesitan acuerdo aparte)
- [CSIS: Qué saber sobre los modelos de IA chinos](https://www.csis.org/analysis/what-know-about-chinese-ai-models) — el 41% de las descargas, la evaluación de NIST de "ocho meses atrás" y el análisis de controles de exportación
- [Interconnects: cómo los labs chinos mantienen el paso](https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride) — Nathan Lambert sobre el lanzamiento por etapas del GLM-5.3 y lo que los pesos abiertos le hacen a la seguridad
- [Epoch AI: spike en severidad de CVEs](https://epoch.ai/data-insights/cve-severity-spike) — el aumento de 3,5x en vulnerabilidades divulgadas tras el anuncio de Mythos
- [ellamind: estudio de censura en LLMs](https://www.ellamind.com/blog/llm-censorship-bias-china) — la censura varía por proveedor: 98,8% de respuesta en Kimi contra 81% de fallas en DeepSeek
