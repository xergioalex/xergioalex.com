---
title: "Claude Fable 5: El modelo que no querían liberar ahora está en tus manos"
description: "Anthropic dijo que era demasiado peligroso para liberarlo. Luego lo liberaron — mismos pesos, otro nombre y una capa de seguridad que cambia la ecuación."
pubDate: "2026-06-09"
updatedDate: "2026-06-12"
heroImage: "/images/blog/posts/claude-fable-5-mythos-unleashed/hero-es.webp"
heroLayout: "banner"
tags: ["tech", "ai-agents", "personal", "claude"]
series: "the-mythos-saga"
seriesOrder: 2
keywords: ["Claude Fable 5 lanzamiento", "Claude Mythos 5 público", "Anthropic Fable 5 capacidades", "Project Glasswing actualización 2026", "modelo Mythos disponible al público", "clasificadores de seguridad IA"]
---

En abril escribí sobre [un modelo demasiado peligroso para ser liberado](/es/blog/claude-mythos-the-model-too-dangerous-to-release/). Anthropic había construido algo que encontraba miles de fallas de seguridad desconocidas en todos los sistemas operativos principales. Armaron una coalición de cien millones de dólares, restringieron el acceso a cincuenta socios, y dijeron que lo responsable era mantenerlo bajo llave. Ese post terminaba con "esto es solo el principio."

En junio, [Anthropic liberó ese modelo](https://www.anthropic.com/news/claude-fable-5-mythos-5). Mismos pesos. Misma arquitectura. El mismo cerebro que encontró un bug de 28 años en OpenBSD por cincuenta dólares. Le cambiaron el nombre a Claude Fable 5, lo envolvieron en una capa de clasificadores de seguridad y lo publicaron en la API — al alcance de cualquiera con una tarjeta de crédito. El modelo demasiado peligroso para ser liberado se convirtió en un modelo con el que simplemente puedes hablar.

¿Cómo pasa un modelo de "demasiado peligroso para cualquiera" a "disponible en todos lados" entre abril y junio? Esa es la pregunta que este post desarma: qué cambió realmente, qué puede hacer el modelo, y qué significa para quienes construimos con estas herramientas.

---

## Qué cambió

La respuesta corta: el modelo no cambió. Cambió el *harness* — el sistema de controles que lo envuelve. Piensa en la diferencia entre un motor de Fórmula 1 suelto sobre una mesa y ese mismo motor dentro de un carro con frenos, cinturón y airbags.

Entre abril y junio pasaron tres cosas. Primero, [Project Glasswing se expandió](https://www.anthropic.com/news/expanding-project-glasswing). La coalición de defensores que recibió acceso al modelo restringido pasó de cincuenta socios a unas doscientas organizaciones en más de quince países: compañías de energía, acueductos, hospitales, fabricantes de hardware. La infraestructura de la que dependes todos los días sin pensarlo. En esa ventana [encontraron más de diez mil](https://www.anthropic.com/news/expanding-project-glasswing) fallas de seguridad graves. Diez mil. El modelo haciendo exactamente aquello para lo que lo construyeron: encontrar los huecos antes de que los encuentre alguien con malas intenciones.

Segundo, Anthropic construyó la capa de seguridad. La pieza central son los clasificadores: filtros que revisan cada consulta antes de responderla y detectan si toca terreno delicado — hackear sistemas, biología, química, o intentos de copiar el modelo para entrenar otro. Cuando ninguno se activa, te responde Fable 5 a plena potencia. Cuando uno se activa, la respuesta viene de Claude Opus 4.8, el modelo de la generación anterior: todavía excelente, solo un escalón abajo. No es un rechazo — no te chocas contra una pared ni recibes un "no puedo ayudarte con eso". Es el motor bajando un cambio justo en la curva peligrosa. Y para probar que la capa aguanta, ofrecieron recompensas a expertos externos por romperla: [más de mil horas de intentos de jailbreak](https://www.anthropic.com/news/claude-fable-5-mythos-5) — el arte de engañar a una IA para que se salte sus propias reglas — y nadie encontró una forma universal de lograrlo.

Tercero — y aquí es donde todo encaja — midieron qué tan seguido saltan esos filtros. [Menos del cinco por ciento de las sesiones](https://www.anthropic.com/news/claude-fable-5-mythos-5). El resto del tiempo — más del noventa y cinco por ciento — estás hablando con el modelo completo, sin nada en el medio. La correa existe, pero casi nunca se siente.

Pero cuando la correa importa, importa de verdad. Hay una prueba llamada [ExploitBench](https://www.digitalapplied.com/blog/claude-fable-5-mythos-5-release-benchmarks-2026) que mide justo lo que hacía aterrador a Mythos: su habilidad para hackear. Mythos 5 — la versión sin filtros que reciben los defensores de Glasswing — saca 78 sobre 100. Fable 5, el mismo modelo con los filtros puestos, saca **cero**. Mismos pesos. Mismo cerebro. En esa única materia, los filtros lo bajan de mejor del mundo a nada. Todo el diseño resumido en dos números: potencia completa en todo, excepto en lo único que puede usarse como arma.

Hasta los nombres cuentan la historia. Anthropic [explica en una nota al pie](https://www.anthropic.com/news/claude-fable-5-mythos-5) que *Fable* viene del latín *fabula* — "lo que se cuenta" — primo hermano del griego *mythos*. La misma historia, contada de dos maneras. Mythos 5, sin filtros, para los ciberdefensores. Fable 5, con filtros, para todo el mundo. CyberScoop [lo bautizó](https://cyberscoop.com/anthropic-claude-fable-5-release-mythos-guardrails/) "Mythos on a leash" — Mythos con correa — y honestamente, es el resumen más preciso de dos palabras que he visto.

Abril y junio, lado a lado:

| | Abril — Mythos Preview | Junio — Fable 5 |
|---|------------------------|-----------------|
| Quién puede usarlo | ~50 socios verificados | Cualquiera con una API key |
| Precio (por millón de tokens) | $25 entrada / $125 salida | $10 entrada / $50 salida |
| Project Glasswing | 12 socios fundadores + 40 organizaciones | ~200 organizaciones en más de 15 países |
| Capacidad de hackeo | Completa, tras verificación | Bloqueada por filtros — reservada para Mythos 5 |

Cada fila se mueve en la misma dirección: más acceso, menor costo, y un control más estricto sobre la única capacidad que asustaba a todos.

---

## Qué puede hacer

No necesitas otra pared de benchmarks. Lo que vale tu tiempo es lo que reportaron las empresas cuando tuvieron acceso temprano.

Stripe tomó un codebase de cincuenta millones de líneas en Ruby e [hizo una migración completa en un día](https://www.anthropic.com/news/claude-fable-5-mythos-5). Su equipo estimó que la misma migración les habría tomado más de dos meses a mano. El CEO de Cursor dijo que Fable 5 [abrió "una clase de problemas de largo horizonte que estaban fuera de alcance para modelos anteriores."](https://www.anthropic.com/news/claude-fable-5-mythos-5) Uno de los socios con acceso temprano de Anthropic reportó que en investigación de física de frontera, Fable 5 [llegó en 36 horas casi a donde GPT-5.5 aterrizó después de cuatro días](https://www.anthropic.com/news/claude-fable-5-mythos-5) — usando un tercio de los tokens de razonamiento.

Si escribes software, hay un benchmark que vale la pena conocer: [SWE-bench Pro](https://www.digitalapplied.com/blog/claude-fable-5-mythos-5-release-benchmarks-2026), que les tira problemas de software difíciles y de múltiples pasos a los modelos. Fable 5 saca 80.3%. Opus 4.8 saca 69.2%. GPT-5.5 aterriza en 58.6%. Eso no es una ventaja incremental. Es una brecha donde el modelo está resolviendo problemas que los otros no pueden.

Esa brecha se ve mejor en una gráfica. FrontierCode es un examen armado con los 50 problemas de programación más difíciles de un banco de 150 — tan difíciles que todos los modelos todavía fallan más de lo que aciertan. La prueba deja que cada modelo gaste más o menos esfuerzo en pensar, y mide cuánto le rinde ese gasto:

<figure>
<img src="/images/blog/posts/claude-fable-5-mythos-unleashed/frontiercode-benchmark-es.webp" alt="Gráfico de FrontierCode de precisión contra costo por tarea mostrando a Claude Fable 5 subiendo hasta 31% mientras Claude Opus 4.8 se estanca cerca del 13% y GPT-5.5 permanece plano alrededor del 5%" width="1200" height="704" loading="lazy" />
<figcaption>FrontierCode: precisión vs. costo por tarea — Fable 5 es el único cuya curva sigue subiendo cuando se le da más esfuerzo.</figcaption>
</figure>

Mira las tres curvas. GPT-5.5 (gris) no se mueve: gaste lo que gaste, ronda el 5%. Opus 4.8 (verde) mejora hasta cierto punto y se estanca cerca del 13% — de ahí no pasa, aunque le des más recursos. Fable 5 (naranja) es el único que sigue subiendo: cada dólar extra de esfuerzo se convierte en más problemas resueltos, hasta llegar al 31%. Eso es tener el techo más alto: no es que sea más barato — es que es el único al que darle más le sigue sirviendo.

Y no es solo código. Los socios de biología de Anthropic lo usaron para [acelerar partes del diseño de fármacos cerca de diez veces](https://www.anthropic.com/news/claude-fable-5-mythos-5), y en un proyecto de genómica construyó un modelo de machine learning a la medida que superó un resultado publicado en *Science* siendo cien veces más pequeño. Mi demo favorito es más modesto que todo eso: le pidieron un diseño imprimible en 3D, y [primero construyó el editor CAD, y luego diseñó la pieza ahí](https://www.anthropic.com/news/claude-fable-5-mythos-5). La herramienta no existía, así que hizo la herramienta.

Y después está lo de Pokémon. Los modelos anteriores de Claude [no podían pasar Pokémon FireRed](https://www.anthropic.com/news/claude-fable-5-mythos-5) ni siquiera con un sistema elaborado de ayuda que les daba mapas, herramientas de navegación e información extra del estado del juego. Fable 5 terminó el juego con nada más que capturas de pantalla crudas — una configuración mínima, solo visión. Suena a benchmark de juguete hasta que te das cuenta de lo que realmente está probando: razonamiento autónomo sostenido a través de cientos de decisiones secuenciales, sin andamiaje al cual agarrarse.

Esa última parte es a la que hay que prestarle atención. No es que el modelo sea más inteligente en ningún paso individual — es que mantiene la coherencia durante horizontes más largos sin desviarse. Si alguna vez has visto a un agente perder el hilo a mitad de una tarea, sabes exactamente cuánto vale eso.

---

## El horizonte de trabajo

La pregunta obvia es qué cambia frente a Opus 4.8, que ya podía trabajar solo durante horas — y lo hacía bien. La diferencia no es de resistencia sino de capacidad. Mientras más larga y enredada es una tarea, más le exige al modelo: cada decisión depende de las anteriores y los errores pequeños se van acumulando. Opus completa la maratón en terreno plano. Fable 5 la corre en montaña: planes más grandes, problemas más enredados, cientos de decisiones encadenadas — y llega al final con el objetivo intacto.

Eso cambia el tamaño de lo que se le puede delegar. Trabajo que antes había que partir en pedazos — un refactor entero, una migración, una suite de tests completa — ahora se entrega de una sola pieza y se recoge terminado al final del día. La diferencia no es cuántas horas trabaja. Es qué tan grande es el problema que puede sostener en la cabeza de principio a fin.

---

## Qué significa todo esto

Quita el ruido del lanzamiento y queda una sola idea en pie.

El mismo modelo es el arma y la herramienta. La inteligencia que encontró miles de zero-days es la misma inteligencia que migra un codebase de cincuenta millones de líneas. El cerebro que podía encadenar cuatro vulnerabilidades separadas hasta tomar control total de un sistema es el mismo cerebro que mantiene coherencia a través de cientos de decisiones de código. Las capacidades de seguridad y las capacidades generales no son cosas separadas. Son la misma cosa — razonamiento autónomo profundo — apuntado en diferentes direcciones.

La única diferencia entre el modelo demasiado peligroso para liberar y el modelo que cualquiera puede usar es el sistema envuelto alrededor de él. No los pesos. No el entrenamiento. El harness.

Eso valida algo a lo que sigo volviendo en [lo que escribo sobre trabajar con agentes](/es/blog/series/working-with-agents/). El modelo ya no es donde vive el valor. El valor vive en el sistema que lo rodea. Anthropic acaba de probarlo a la escala más grande imaginable: puedes tomar el modelo más peligroso jamás construido y hacerlo seguro para uso general construyendo un mejor harness. El modelo no cambió. Todo lo que está alrededor de él sí.

---

## El movimiento de negocio

Aquí también hay una historia de negocio, y el timing la cuenta sola. Anthropic [presentó confidencialmente su prospecto de IPO](https://www.cnbc.com/2026/06/01/anthropic-ipo-s1-prospectus.html) la misma semana que expandieron Glasswing. Una semana después de eso, liberaron el modelo al público. Lo pusieron a [$10 por millón de tokens de entrada y $50 por millón de salida](https://www.anthropic.com/news/claude-fable-5-mythos-5) — menos de la mitad de lo que costaba Mythos Preview. Salió [en AWS Bedrock](https://aws.amazon.com/blogs/aws/anthropic-claude-fable-5-on-aws-mythos-class-capabilities-with-built-in-safeguards-now-available/), [GitHub Copilot](https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/), Vertex AI y Microsoft Foundry desde el día uno — e incluso los planes de suscripción de Claude lo incluyeron sin costo extra durante la ventana de lanzamiento.

Eso no es distribución cautelosa. Es máximo alcance en el primer día. Pasaron de "nadie puede tener esto" en abril a "todo el mundo puede tener esto, en todas las plataformas" en junio. La capa de seguridad no solo resolvió un problema técnico. Resolvió un problema de negocio.

Y hay una pregunta más difícil debajo: ¿qué significa que ahora puedes rentar el modelo más capaz jamás construido por diez dólares por millón de tokens? La asimetría que hacía a Mythos aterrador — una IA encontrando vulnerabilidades críticas por cincuenta dólares — no desaparece porque el modelo cambió de nombre. Solo significa que la misma asimetría ahora aplica a todos los problemas, no solo a seguridad. El costo de resolver problemas difíciles con el modelo de IA más capaz disponible se redujo en más de la mitad entre abril y junio.

---

## Qué viene después

¿Honestamente? Nadie lo sabe. Cualquiera que te venda aquí una predicción segura está adivinando.

Lo que sí sabemos: en abril, un modelo que era demasiado poderoso para liberar existía detrás de una puerta cerrada. En junio, ese modelo estaba corriendo en mi máquina. La brecha entre "capacidad de frontera" y "disponible al público" se comprimió de años a meses. Si Fable 5 es lo que pasa cuando construyes una capa de seguridad alrededor de Mythos Preview, ¿qué pasa cuando llega el siguiente modelo de clase Mythos y la capa de seguridad ya está construida?

El ritmo no se ha frenado. Si acaso, este lanzamiento prueba que es más rápido que la línea de tiempo que mapeé cuando escribí por primera vez sobre [la revolución silenciosa](/es/blog/from-programmer-to-orchestrator/). La revolución sigue haciéndose más fuerte.

A seguir construyendo. Con cuidado, todavía — pero la puerta ya está abierta.

---

## Actualización — 12 de junio de 2026: el gobierno de Estados Unidos baja el interruptor

Escribí arriba que "la puerta ya está abierta". Tres días después del lanzamiento público, el gobierno de Estados Unidos la cerró.

El 12 de junio de 2026, Anthropic [desactivó Fable 5 y Mythos 5 para todos los clientes](https://www.anthropic.com/news/fable-mythos-access) tras recibir una directiva de control de exportaciones del gobierno de Estados Unidos. La orden exigía suspender el acceso a cualquier persona extranjera — dentro o fuera de Estados Unidos, incluidos [los propios empleados no estadounidenses de Anthropic](https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/). Como Anthropic no podía garantizar que lograra bloquear a toda persona no estadounidense, apagó ambos modelos por completo en lugar de intentar segmentar el acceso por nacionalidad. Todos los demás modelos de Claude — incluido Opus 4.8 — siguieron disponibles.

<figure>
<img src="/images/blog/posts/claude-fable-5-mythos-unleashed/anthropic-suspension-tweet.webp" alt="Publicación de Anthropic en X que anuncia que, tras una directiva de control de exportaciones del gobierno de Estados Unidos para suspender todo acceso a Fable 5 y Mythos 5 por parte de personas extranjeras, debe desactivar abruptamente ambos modelos para todos los clientes; el acceso a los demás modelos de Claude no se ve afectado" width="1186" height="1314" loading="lazy" />
<figcaption>El anuncio de Anthropic en X, 12 de junio de 2026 — <a href="https://x.com/AnthropicAI/status/2065597531644743999">@AnthropicAI</a>.</figcaption>
</figure>

Esta es, hasta donde se sabe, [la primera vez que Estados Unidos usa su autoridad de control de exportaciones para retirar un modelo de IA de frontera específico](https://natlawreview.com/article/ai-company-anthropic-suspends-access-claude-fable-5-claude-mythos-5-following-us) por motivos de seguridad nacional. El detonante reportado fue una empresa extranjera con acceso a Mythos y [sospechas que encendieron las alarmas de seguridad nacional](https://www.business-standard.com/technology/tech-news/us-anthropic-claude-fable-5-mythos-access-restricted-ai-export-controls-126061400194_1.html). La preocupación declarada del gobierno era una posible forma de [saltarse — "jailbreak" — las salvaguardas de ciberseguridad de Fable 5](https://www.anthropic.com/news/fable-mythos-access): justo la capa de seguridad de la que trata todo este post. Anthropic dice que revisó la demostración y encontró un truco estrecho y no universal que sacaba a la luz unas pocas vulnerabilidades menores ya conocidas — y no estuvo de acuerdo con que un hallazgo tan acotado justifique retirar un modelo ya desplegado a cientos de millones de personas.

La ironía es difícil de ignorar. Todo el argumento de este post es que el harness — no los pesos — es lo que hace que un modelo peligroso sea seguro para lanzar. La movida del gobierno es, a su manera, un voto de no confianza en exactamente ese harness. La correa aguantó mil horas de intentos de jailbreak financiados con recompensas; hizo falta una directiva del gobierno, no un filtro roto, para sacar el modelo de la mesa.

Al momento de escribir esto, Anthropic [dice que lo considera un malentendido y que está trabajando para restaurar el acceso](https://www.anthropic.com/news/fable-mythos-access), y un ejecutivo le dijo a la prensa en Seúl que la compañía está [segura de que los modelos volverán "en los próximos días".](https://www.koreajoongangdaily.com/business/anthropic-confident-of-reenabling-mythos-fable-5-access-in-coming-days-executive/12727522) Si vuelven sin cambios, con un harness más estricto, o bajo nuevas reglas de acceso es la parte que nadie puede responder todavía. Actualizaré este post de nuevo cuando haya algo sólido que reportar.

La puerta estuvo abierta tres días. Lo que pase ahora es la verdadera historia.

---

## Recursos

- [Claude Fable 5 and Claude Mythos 5 — Anthropic](https://www.anthropic.com/news/claude-fable-5-mythos-5) — Anuncio oficial de lanzamiento con benchmarks, salvaguardas y detalles de disponibilidad
- [Expanding Project Glasswing — Anthropic](https://www.anthropic.com/news/expanding-project-glasswing) — Expansión de junio de 2026 que suma ~150 organizaciones de energía, agua, salud y hardware en más de 15 países
- [Claude Fable 5 on AWS — AWS News Blog](https://aws.amazon.com/blogs/aws/anthropic-claude-fable-5-on-aws-mythos-class-capabilities-with-built-in-safeguards-now-available/) — Disponibilidad en Bedrock y detalles de integración
- [Claude Fable 5 for GitHub Copilot — GitHub Changelog](https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/) — Integración con Copilot y política de retención de datos
- [Anthropic's new model is Mythos on a leash — CyberScoop](https://cyberscoop.com/anthropic-claude-fable-5-release-mythos-guardrails/) — Análisis de seguridad de la arquitectura de salvaguardas
- [Claude Fable 5 & Mythos 5: The Frontier, Split in Two — Digital Applied](https://www.digitalapplied.com/blog/claude-fable-5-mythos-5-release-benchmarks-2026) — Comparación detallada de benchmarks entre modelos de frontera
- [Claude API Models Overview — Anthropic Docs](https://platform.claude.com/docs/en/about-claude/models/overview) — Especificaciones técnicas, precios e identificadores de API
- [Statement on the US government directive to suspend Fable 5 and Mythos 5 access — Anthropic](https://www.anthropic.com/news/fable-mythos-access) — Comunicado del 12 de junio de 2026 sobre la suspensión y la respuesta de Anthropic
- [Anthropic Suspends Access to Fable 5 and Mythos 5 Following US Export Control Directive — National Law Review](https://natlawreview.com/article/ai-company-anthropic-suspends-access-claude-fable-5-claude-mythos-5-following-us) — Análisis legal de la primera acción de control de exportaciones contra un modelo de frontera específico
- [Anthropic disables Fable and Mythos after US bars foreign access — Fortune](https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/) — Reporte sobre la directiva, a quién afecta y la justificación de seguridad nacional
