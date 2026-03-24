---
title: "El trabajo oculto de la era IA: el arte de dirigir agentes"
description: "Los agentes de IA no son multiplicadores de productividad — son multiplicadores de criterio. Por qué la dirección importa más que el modelo."
pubDate: "2026-03-25"
heroImage: "/images/blog/posts/the-art-of-directing-agents/hero-es.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai", "personal"]
keywords: ["arte de dirigir agentes IA", "mejores instrucciones agentes IA", "delegar en agentes de código", "cómo trabajar con agentes IA", "dirigir vs prompting agentes IA", "mismo modelo resultados diferentes IA", "enmarcar trabajo para agentes IA"]
series: "working-with-agents"
seriesOrder: 2
---

En los últimos meses he notado algo que creo que es una de las verdades más importantes sobre trabajar con agentes de IA: dale a dos personas el mismo modelo, el mismo agente, el mismo codebase y la misma configuración, y los resultados pueden seguir siendo abismalmente diferentes. No ligeramente diferentes — abismalmente diferentes. Una persona obtiene algo limpio, coherente, sorprendentemente sólido y casi listo para producción. La otra obtiene algo vago, frágil, demasiado complicado o simplemente mal en todos los aspectos que importan. El modelo no cambió. El agente no cambió. La configuración no cambió. Lo que cambió fue la persona que dirigía el trabajo.

Y creo que esa es la parte que muchas personas todavía no ven. Pasamos tanto tiempo hablando de modelos — cuál es más inteligente, cuál es mejor para programar, cuál tiene mejores benchmarks, cuál tiene ventana de contexto más larga, cuál vale la pena pagar. Todo eso importa. Pero en la práctica sigo viendo algo más: la calidad del resultado suele depender menos del modelo que de la calidad de la dirección detrás de él.

Por eso he estado repensando cuál es realmente el trabajo oculto de la era IA. Al principio pensé que una gran parte era revisar el trabajo realizado por los agentes. Y sí, la revisión sigue importando. Mucho. Pero cuanto más trabajo con agentes cada día, más convencido estoy de que el trabajo oculto empieza antes que la revisión. Mucho antes. Empieza antes de que exista el resultado.

Empieza cuando encuadras el problema. Cuando defines la tarea. Cuando decides qué importa. Cuando estableces los límites. Cuando proporcionas el contexto correcto. Cuando haces el trabajo suficientemente claro para que el agente pueda hacerlo bien. El trabajo oculto no es solo revisar el trabajo de la máquina — es dirigir agentes. Y cuanto mejor me vuelvo en esto, más siento que este es uno de los verdaderos artes de la ingeniería moderna.

---

## El resultado empieza antes de lo que la mayoría piensa

Cuando las personas evalúan el trabajo realizado por la IA, normalmente miran la parte visible — el código, la interfaz, el diff, los tests, la respuesta final — y entonces pregunta: ¿fue bueno o malo? Tiene sentido. Es la parte que podemos ver. Pero la calidad del resultado suele empezar mucho antes que eso. Empieza en cómo se encuadró el trabajo.

¿Cuál es el problema real? ¿Qué estamos intentando resolver? ¿Qué parte del sistema importa aquí? ¿Qué restricciones no son negociables? ¿Qué no se debe tocar bajo ningún concepto? ¿Estamos optimizando por velocidad, mantenibilidad, simplicidad, bajo riesgo o solo por momentum? Estas no son detalles secundarios alrededor de la tarea. Son la tarea.

Ese es uno de los cambios más grandes que he sentido en esta nueva forma de trabajar. Antes, mucho de ese pensamiento ocurría durante la implementación. Empezabas a programar, te encontrabas con ambigüedad, ibas resolviendo las cosas sobre la marcha, hacías compromisos en movimiento, ajustabas a medida que avanzabas. Ahora mucho de eso se ha desplazado hacia arriba en el proceso. Porque cuando la ejecución se vuelve tan rápida, la ambigüedad se vuelve cara. Es parecido a lo que pasa con TDD — en test-driven development primero defines qué debe pasar, qué comportamiento esperas, qué condiciones debe cumplir el código, y solo después escribes la implementación que satisface esos criterios. Dirigir agentes se siente igual: defines las restricciones, el resultado esperado y los límites antes de que el agente escriba una sola línea. La diferencia es que en TDD lo hacías para tu propio código. Ahora lo haces para el trabajo de otro — uno que ejecuta mucho más rápido que tú.

Un desarrollador humano suele frenar naturalmente cuando una solicitud está mal especificada. Un agente generalmente no lo hace. Seguirá avanzando, llenará los espacios en blanco, hará suposiciones, elegirá una dirección. Y a veces hará todo eso con suficiente confianza como para que el resultado parezca bueno hasta que te das cuenta de que resolvió el problema equivocado. Lo aprendí a las malas cuando todavía era inexperto dando instrucciones. Le daba indicaciones vagas al agente sobre algo que quería desarrollar — el qué, pero no el cómo. No le especificaba qué patrones seguir, qué servicios existentes reutilizar, qué convenciones respetar. Y el agente hacía lo que cualquiera haría con información incompleta: buscaba la mejor manera de resolverlo por su cuenta. El resultado muchas veces era código que funcionaba, bien estructurado incluso, pero que no encajaba con el resto del sistema. Creaba sus propias abstracciones donde ya existían otras, elegía enfoques diferentes a los que usábamos, tomaba decisiones arquitectónicas que yo nunca habría tomado. Esto pasa sobre todo cuando el proyecto no está bien documentado y el agente no tiene forma de responderse preguntas básicas sobre la arquitectura, la estructura de carpetas, los servicios disponibles o las convenciones del equipo. El código era objetivamente bueno. La dirección no. Y yo terminaba deshaciendo trabajo que nunca debió haber pasado — no porque el agente fallara, sino porque yo no le di el contexto suficiente para acertar.

Por eso sigo volviendo a la misma idea: **el resultado empieza mucho antes del output.** Empieza en la dirección.

---

## Esto no se trata realmente de prompting

Muchas personas todavía llaman a esto prompting. Lo entiendo — era la palabra que teníamos. Pero honestamente, cuanto más trabajo de esta forma, menos útil me resulta esa palabra. Porque lo que hago la mayor parte del tiempo no se siente como solo "prompting." Se siente como diseñar trabajo. Se siente como tomar algo difuso y convertirlo en algo delegable. Se siente como decidir qué contexto importa, qué restricciones importan, qué debe permanecer estable, qué nivel de calidad buscamos, y dónde es probable que el agente se equivoque si dejo demasiado abierto.

Hay un momento en la [entrevista reciente de Andrej Karpathy en No Priors](https://www.youtube.com/watch?v=kwSVtQ7dziU) que se me quedó grabado. La entrevistadora le pregunta: *"Code's not even the right verb anymore, right?"* Y Karpathy responde con una sola palabra: *"Manifest."* Ese es su nombre para lo que hacemos ahora. No programar. No hacer prompts. Manifestar — expresar tu voluntad a los agentes, convertir intención en acción. Creo que tiene razón. Eso se acerca más a lo que realmente se siente que cualquier otra palabra que haya escuchado. Otros lo llaman vibe coding — el propio Karpathy acuñó el término hace un tiempo. Pero incluso eso se queda corto. Vibe coding suena a algo casual, improvisado, como dejarte llevar. Lo que yo hago todos los días no tiene nada de casual. Es deliberado, estructurado, y requiere entender profundamente lo que estás pidiendo.

<iframe width="100%" style="aspect-ratio:16/9" loading="lazy" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/kwSVtQ7dziU?autoplay=1><img src=/images/blog/posts/the-art-of-directing-agents/karpathy-no-priors.webp alt='Andrej Karpathy sobre Code Agents, AutoResearch y la era Loopy de la IA — Entrevista en No Priors'><span>&#x25BA;</span></a>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Andrej Karpathy sobre Code Agents, AutoResearch y la era Loopy de la IA — Entrevista en No Priors"></iframe>

Una buena instrucción no es solo mejor redacción. No es un truco ni una fórmula. Una buena instrucción suele ser una forma comprimida de pensamiento estructurado — qué problema necesita resolverse, qué contexto importa, qué restricciones deben preservarse, qué no debe cambiarse, qué nivel de calidad se espera, y cuándo el agente debe detenerse y preguntar en lugar de adivinar. La propia [guía de prompt engineering de Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) cubre la mayoría de estas dimensiones — especificar contexto, restricciones y criterios de éxito. Pero la etiqueta "prompting" todavía hace que suene como un ejercicio de escritura, cuando en la práctica se parece más a un ejercicio de diseño de sistemas.

Esa distinción importa, porque cuando las personas lo reducen a prompting, hace que el trabajo parezca mucho más ligero de lo que realmente es. El apalancamiento no está en escribir una solicitud más bonita. El apalancamiento está en entender el trabajo lo suficientemente bien como para definirlo bien. Una buena delegación no es pedir trabajo — es definir el trabajo con suficiente claridad para que pueda ejecutarse correctamente.

---

## La brecha se movió hacia arriba

Hay una historia muy seductora circulando ahora mismo. Va más o menos así: ahora que la IA puede programar, todos están más cerca de operar al mismo nivel. Las herramientas se están volviendo tan potentes que la experiencia importa menos. El acceso está nivelando el campo de juego.

Hay algo real en eso. El piso definitivamente subió. Personas que antes no podían construir ahora pueden hacerlo. Personas que antes estaban bloqueadas por la implementación ahora pueden avanzar. Diseñadores, PMs, fundadores, marketers, operadores — he visto a todos ellos acercarse mucho más a la ejecución porque los agentes cierran parte de la brecha. Esa parte es real, y honestamente, es una de las cosas más emocionantes que están pasando ahora mismo.

Pero no creo que eso signifique que la brecha entre personas desapareció. Creo que se movió. Se desplazó hacia arriba en el proceso, hacia la calidad de la dirección.

Un junior y un experto pueden sentarse frente exactamente al mismo setup y aun así obtener resultados radicalmente diferentes, porque no están haciendo realmente lo mismo. No solo están "usando IA." Están encuadrando, acotando, restringiendo y dirigiendo el trabajo a niveles muy distintos. [El estudio de productividad de desarrolladores IA de METR de principios de 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) encontró que los desarrolladores con experiencia eran a veces un 19% *más lentos* cuando tenían herramientas de IA — un resultado contraintuitivo que sé que parece contradecir lo que describí en el [capítulo anterior](/es/blog/from-programmer-to-orchestrator/). Creo que están midiendo cosas diferentes. Ese estudio seguía tareas específicas y acotadas con criterios de aceptación claros. El tipo de trabajo de orquestación abierta que yo describí — levantar agentes en paralelo, diseñar sistemas, tomar decisiones de criterio — es un juego diferente. Pero el hallazgo se me quedó porque sugiere que el acceso a la herramienta por sí solo no produce las ganancias de productividad. La habilidad para dirigirla importa tanto como la herramienta.

Karpathy dijo algo en la misma entrevista que me cristalizó esto: *"Everything feels like it's a skill issue. It's not that the capability is not there."* Cuando el agente entrega algo malo, el reflejo es culpar al modelo. A veces esa culpa es justa. Pero más seguido de lo que me gustaría admitir, el problema era mío — la tarea era vaga, las restricciones eran débiles, o dejé demasiado abierto para que el agente adivinara. La persona con más experiencia suele ser mejor en ver el problema real detrás de la tarea, anticipar la ambigüedad antes de que el agente la encuentre, preservar la intención arquitectónica, y saber cuándo una tarea está lista para delegar y cuándo todavía no lo está.

He visto tareas donde la distancia entre una instrucción débil y una fuerte no era un 10% mejor o peor — era la diferencia entre "esto más o menos funciona" y "esto es lo suficientemente sólido como para construir sobre ello." El mismo modelo puede parecer mediocre en las manos de una persona y notable en las de otra. No porque el modelo haya cambiado. Sino porque la dirección cambió.

---

## Multiplicadores de criterio

Una de las razones por las que esto importa tanto es que los agentes son amplificadores reales. Un agente bien dirigido puede sentirse casi injusto. Se mueve rápido. Se mantiene coherente. Maneja la complejidad mejor de lo que esperabas. Te da un apalancamiento que, honestamente, algunos días todavía parece irreal.

Pero un agente mal dirigido también puede moverse rápido — y ese es el problema. Puede moverse rápido en la dirección equivocada. Puede sobreingenierizar con confianza. Puede resolver limpiamente el problema equivocado. Puede hacer suposiciones que nunca quisiste que hiciera. Puede generar algo pulido sobre una comprensión incorrecta de la tarea. Y cuando eso ocurre, las personas suelen culpar al modelo. A veces con razón. Pero mucho de lo que parece un fallo del modelo es en realidad un fallo de dirección — la tarea era vaga, el contexto era incompleto, los límites eran débiles, y el agente se vio forzado a adivinar demasiado. Gran parte del mal output es simplemente trabajo mal encuadrado que llega rápido.

Por eso he empezado a pensar en los agentes menos como multiplicadores de productividad y más como **multiplicadores de criterio**. Multiplican el beneficio de la claridad. Y multiplican el costo de la confusión en igual medida. Una tarea bien dirigida conduce a resultados más nítidos, revisiones más enfocadas, trabajo de mayor valor. Una tarea mal dirigida conduce a trabajo de rescate — limpiar ambigüedad que debería haberse resuelto antes, corregir suposiciones que el agente no debería haber tenido que hacer, arrastrar el trabajo de vuelta hacia el objetivo real después de que se desvió.

La diferencia entre estas dos experiencias es una de las señales más claras de que el apalancamiento real empieza antes de lo que la mayoría piensa. Empieza en la dirección.

---

## Por qué algunas personas obtienen tanto más de la IA

Esta es también la razón por la que tengo cuidado cuando alguien me dice que probó un agente, obtuvo resultados mediocres, pasó demasiado tiempo limpiando cosas, y se fue pensando que todo era puro hype. No descarto esa experiencia. Es real, y le ocurre a personas técnicamente capaces que lo intentan en serio. Pero cuando hago algunas preguntas — qué le pediste que hiciera, cómo lo encuadraste, qué contexto le diste — la respuesta es casi siempre la misma: la tarea no estaba suficientemente bien definida. No por malas intenciones. Solo por una brecha en la dirección.

También he aprendido que "usar IA" es una frase increíblemente amplia. Dos personas pueden decir que están usando coding agents y aun así estar haciendo cosas completamente diferentes. La [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/ai) muestra exactamente esto: mientras que el 84% de los desarrolladores usa o planea usar herramientas de IA, las ganancias de productividad reportadas varían enormemente. Algunos desarrolladores reportan ahorrar horas al día. Otros reportan un impacto mínimo o incluso frustración. Las mismas herramientas. Resultados diferentes.

Una persona está chateando con un modelo y esperando un output útil. La otra está dirigiendo un sistema de trabajo delegado con contexto, límites, estándares e intencionalidad. Por supuesto que esas dos experiencias se van a sentir diferentes. Por eso no creo que la ventaja a largo plazo pertenezca solo a las personas que tienen acceso a los mejores modelos. Creo que pertenecerá a las personas que aprendan a dirigirlos bien — las que aprendan a encuadrar problemas con claridad, definir tareas delegables, proporcionar suficiente contexto sin ahogar el sistema en ruido, y revisar eficientemente porque el trabajo estuvo bien dirigido desde el principio.

---

## El trabajo oculto

El trabajo oculto de la era IA no es solo revisar lo que producen los agentes. Es saber cómo dirigirlos — tomar un problema desordenado y darle forma hasta convertirlo en algo que pueda delegarse bien. Es decidir qué importa, qué no, qué debe restringirse y qué debe permanecer flexible. Es saber qué contexto necesita el agente, cómo debería verse la calidad, dónde están los riesgos, y cuándo la tarea está realmente lista para entregar.

Y cuanto más trabajo de esta manera, más convencido estoy de que este es uno de los cambios definitorios de la era IA. No solo que las máquinas ahora pueden ejecutar más del trabajo, sino que el valor humano se está desplazando hacia arriba, hacia el encuadre, el criterio, la delegación y la dirección. El *"express my will"* de Karpathy me sigue resonando. Ese es el trabajo ahora. No escribir código. No revisar diffs. Expresar tu voluntad con suficiente claridad para que la máquina pueda actuar — y tener el criterio para saber si lo que regresó es realmente lo que querías.

Ese es el trabajo oculto. Y los agentes no solo lo hacen posible — lo hacen inevitable. Porque cuanto mejores se vuelven los agentes, más se convierte tu criterio en el cuello de botella, no tu velocidad tecleando.

Sigamos construyendo.

---

## Recursos

- [Andrej Karpathy on Code Agents, AutoResearch, and the Loopy Era of AI](https://www.youtube.com/watch?v=kwSVtQ7dziU) — La entrevista en No Priors donde Karpathy describe "expresar su voluntad" a los agentes y por qué todo se siente como un problema de habilidad
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Cubre diseño de contexto, restricciones y criterios de éxito para trabajar con Claude
- [METR: Early 2025 AI Dev Productivity Study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — El hallazgo contraintuitivo de que los devs con experiencia eran un 19% más lentos con herramientas de IA
- [Stack Overflow Developer Survey 2025: AI](https://survey.stackoverflow.co/2025/ai) — 84% de adopción pero con impacto reportado muy variable — las mismas herramientas, resultados diferentes
- [METR: AI Task Time Horizons](https://metr.org/time-horizons/) — La "nueva Ley de Moore" que rastrea cómo las capacidades de los agentes de IA se duplican cada pocos meses
