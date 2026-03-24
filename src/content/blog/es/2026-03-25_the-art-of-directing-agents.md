---
title: "El trabajo oculto de la era IA: el arte de dirigir agentes"
description: "La mayor diferencia entre resultados mediocres y extraordinarios con agentes de IA no es el modelo — es la capacidad humana de dirigir con precisión."
pubDate: "2026-03-25"
heroImage: "/images/blog/posts/the-art-of-directing-agents/hero-es.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai", "personal"]
keywords: ["arte de dirigir agentes IA", "mejores instrucciones agentes IA", "delegar en agentes de código", "cómo trabajar con agentes IA", "dirigir vs prompting agentes IA", "mismo modelo resultados diferentes IA", "enmarcar trabajo para agentes IA"]
series: "working-with-agents"
seriesOrder: 2
---

En los últimos meses he notado algo que creo que es una de las verdades más importantes sobre trabajar con agentes de IA:

Dale a dos personas el mismo modelo, el mismo agente, el mismo codebase y la misma configuración, y los resultados pueden seguir siendo abismalmente diferentes.

No ligeramente diferentes.

Abismalmente diferentes.

Una persona obtiene algo limpio, coherente, sorprendentemente sólido y casi listo para producción. La otra obtiene algo vago, frágil, demasiado complicado o simplemente mal en todos los aspectos que importan.

El modelo no cambió.
El agente no cambió.
La configuración no cambió.

Lo que cambió fue la persona que dirigía el trabajo.

Y creo que esa es la parte que mucha gente todavía no termina de ver.

Pasamos tanto tiempo hablando de modelos. Cuál es más inteligente. Cuál es mejor para programar. Cuál tiene mejores benchmarks. Cuál tiene ventana de contexto más larga. Cuál vale la pena pagar.

Todo eso importa.

Pero en la práctica sigo viendo algo más: la calidad del resultado suele depender menos del modelo que de la calidad de la dirección detrás de él.

Por eso he estado repensando cuál es realmente el trabajo oculto de la era IA.

Al principio pensé que una gran parte era revisar el trabajo de la máquina. Y sí, la revisión sigue importando. Mucho. Pero cuanto más trabajo con agentes cada día, más convencido estoy de que el trabajo oculto empieza antes que la revisión.

Mucho antes.

Empieza antes de que exista el resultado.

Empieza cuando encuadras el problema. Cuando defines la tarea. Cuando decides qué importa. Cuando estableces los límites. Cuando proporcionas el contexto correcto. Cuando haces el trabajo suficientemente claro para que el agente pueda hacerlo bien.

En otras palabras, el trabajo oculto no es solo revisar el trabajo de la máquina.

Es dirigir agentes.

Y cuanto mejor me vuelvo en esto, más siento que este es uno de los verdaderos artes de la ingeniería moderna.

---

## El resultado empieza antes de lo que la mayoría piensa

Cuando la gente evalúa IA, normalmente mira la parte visible.

El código.
La interfaz.
El diff.
El suite de pruebas.
La respuesta final.

Y entonces pregunta: ¿fue bueno o malo?

Tiene sentido. Es la parte que podemos ver.

Pero la calidad del resultado suele empezar mucho antes que eso.

Empieza en cómo se encuadró el trabajo.

¿Cuál es el problema real? ¿Qué estamos intentando resolver? ¿Qué parte del sistema importa aquí? ¿Qué restricciones no son negociables? ¿Qué no se debe tocar bajo ningún concepto? ¿Estamos optimizando por velocidad, mantenibilidad, simplicidad, bajo riesgo o solo por momentum? ¿Qué casos borde importan lo suficiente como para mencionarlos de antemano? ¿Cómo se vería realmente un buen resultado?

Estas no son detalles secundarios alrededor de la tarea.

Son la tarea.

Ese es uno de los cambios más grandes que he sentido en esta nueva forma de trabajar.

Antes, mucho de ese pensamiento ocurría durante la implementación. Empezabas a programar, te encontrabas con ambigüedad, ibas resolviendo las cosas sobre la marcha, hacías compromisos en movimiento, ajustabas a medida que avanzabas.

Ahora mucho de eso se ha desplazado hacia arriba en el proceso.

Porque cuando la ejecución se vuelve tan rápida, la ambigüedad se vuelve cara.

Un desarrollador humano suele frenar naturalmente cuando una solicitud está mal especificada. Un agente generalmente no lo hace. Seguirá avanzando. Llenará los espacios en blanco. Hará suposiciones. Elegirá una dirección. Y a veces hará todo eso con suficiente confianza como para que el resultado parezca bueno hasta que te das cuenta de que resolvió el problema equivocado.

Por eso sigo volviendo a la misma idea:

**El resultado empieza mucho antes del output.**

Empieza en la dirección.

---

## Esto no se trata realmente de prompting

Mucha gente todavía llama a esto prompting.

Lo entiendo. Era la palabra que teníamos. Pero honestamente, cuanto más trabajo de esta forma, menos útil me resulta esa palabra.

Porque lo que hago la mayor parte del tiempo no se siente como "prompting."

Se siente como diseñar trabajo.

Se siente como tomar algo difuso y convertirlo en algo delegable.

Se siente como decidir qué contexto importa, qué restricciones importan, qué debe permanecer estable, qué nivel de calidad buscamos, y dónde es probable que el agente se equivoque si dejo demasiado abierto.

Una buena instrucción no es solo mejor redacción.

No es un truco. No es una fórmula — y definitivamente no es algún encantamiento mágico que le susurras al modelo.

Una buena instrucción suele ser una forma comprimida de pensamiento estructurado.

Contiene, explícita o implícitamente:
- qué problema necesita resolverse
- qué contexto importa
- qué restricciones deben preservarse
- qué no debe cambiarse
- qué tipo de output es útil
- qué nivel de calidad se espera
- qué compromisos evitar
- qué validar antes de considerar el trabajo terminado
- cuándo el agente debe detenerse y preguntar en lugar de adivinar

La propia [guía de prompt engineering de Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) cubre la mayoría de estos puntos — especificar contexto, restricciones y criterios de éxito. Es buena documentación. Pero la etiqueta "prompting" todavía hace que suene como un ejercicio de escritura, cuando en la práctica se parece más a un ejercicio de diseño de sistemas.

Eso no es un truco de prompt.

Es criterio.

Y creo que esa distinción importa mucho, porque cuando la gente lo reduce a prompting, hace que el trabajo parezca mucho más ligero de lo que realmente es.

El apalancamiento no está en escribir una solicitud más bonita.

El apalancamiento está en entender el trabajo lo suficientemente bien como para definirlo bien.

Una buena delegación no es pedir trabajo.

Es definir el trabajo con suficiente claridad para que pueda ejecutarse correctamente.

---

## La brecha entre personas no desapareció

Hay una historia muy seductora circulando ahora mismo.

Va más o menos así: ahora que la IA puede programar, todos están más cerca de operar al mismo nivel. Las herramientas se están volviendo tan potentes que la experiencia importa menos. El acceso está nivelando el campo de juego.

Hay algo real en eso. El piso definitivamente subió.

Personas que antes no podían construir ahora pueden hacerlo. Personas que antes estaban bloqueadas por la implementación ahora pueden avanzar. Diseñadores, PMs, fundadores, marketers, operadores — he visto a todos ellos acercarse mucho más a la ejecución porque los agentes cierran parte de la brecha.

Esa parte es real, y honestamente, es una de las cosas más emocionantes que están pasando ahora mismo.

Pero no creo que eso signifique que la brecha entre personas desapareció.

Creo que se movió.

Se desplazó hacia arriba en el proceso.

Se desplazó hacia la calidad de la dirección.

Un junior y un experto pueden sentarse frente exactamente al mismo setup y aun así obtener resultados radicalmente diferentes, porque no están haciendo realmente lo mismo. No solo están "usando IA." Están encuadrando, acotando, restringiendo y dirigiendo el trabajo a niveles muy distintos.

Curiosamente, [el estudio de productividad de desarrolladores IA de METR de principios de 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) encontró que los desarrolladores con experiencia eran a veces un 19% *más lentos* cuando tenían herramientas de IA — un resultado contraintuitivo que en realidad respalda este punto. El acceso a la herramienta por sí solo no cierra la brecha. La habilidad para dirigirla es lo que importa, y esa habilidad no viene incluida en la suscripción.

La persona con más experiencia suele ser mejor en:
- ver el problema real detrás de la tarea
- anticipar la ambigüedad antes de que el agente la encuentre
- preservar la intención arquitectónica
- establecer límites más claros
- identificar dónde vive el riesgo
- definir mejores criterios de aceptación
- separar lo que importa de lo que es ruido
- saber cuándo una tarea está lista para delegar y cuándo todavía no lo está

Esa diferencia importa enormemente.

He visto tareas donde la distancia entre una instrucción débil y una fuerte no era un 10% mejor o peor.

Era la diferencia entre:
- "esto más o menos funciona"
- y "esto es lo suficientemente sólido como para construir sobre ello"

El mismo modelo puede parecer mediocre en las manos de una persona y notable en las de otra.

No porque el modelo haya cambiado.

Sino porque la dirección cambió.

---

## El mejor constructor suele ser el mejor director

Este es uno de los cambios de mentalidad más grandes que he tenido.

Durante mucho tiempo, gran parte de la fortaleza técnica se manifestaba de forma más visible en la implementación. Podías verlo en cómo alguien programaba, depuraba, estructuraba un componente, manejaba la complejidad o limpiaba un sistema desordenado.

Eso sigue importando. No voy a fingir que no.

Pero a medida que más ejecución se delega, otra capa de habilidad se vuelve mucho más visible: la capacidad de dirigir bien el trabajo.

Y cuanto más trabajo con agentes, más convencido estoy de que el mejor constructor suele ser el mejor director.

No porque sepa más sintaxis.

No porque escriba más rápido.

Sino porque entiende mejor los sistemas. Ve los compromisos antes. Sabe cómo se ve algo bueno. Sabe qué debe permanecer estable. Sabe dónde no improvisar. Sabe cómo convertir una solicitud difusa en una tarea que la máquina puede ejecutar bien.

Eso no me parece una habilidad secundaria.

Me parece una nueva expresión del criterio de ingeniería.

Y creo que todavía estamos subestimando qué tan grande es ese cambio.

Porque una vez que la ejecución se vuelve más barata, lo que diferencia a las personas ya no es solo quién puede implementar.

Es cada vez más quién puede dirigir.

---

## Los agentes amplían la claridad — y también la confusión

Una de las razones por las que esto importa tanto es que los agentes son amplificadores reales.

Un agente bien dirigido puede sentirse casi injusto.

Se mueve rápido. Se mantiene coherente. Maneja la complejidad mejor de lo que esperabas. Te da un apalancamiento que, honestamente, algunos días todavía parece irreal.

Pero un agente mal dirigido también puede moverse rápido.

Ese es el problema.

Puede moverse rápido en la dirección equivocada. Puede sobreingenierizar con confianza. Puede resolver limpiamente el problema equivocado. Puede hacer suposiciones que nunca quisiste que hiciera. Puede generar algo pulido sobre una comprensión incorrecta de la tarea.

Y cuando eso ocurre, la gente suele culpar al modelo.

A veces esa culpa es justa. Los modelos todavía fallan de formas muy reales. Pero también creo que mucho de lo que parece un fallo del modelo es en realidad un fallo de dirección.

La tarea era vaga.
El contexto era incompleto.
Los límites eran débiles.
Los criterios de éxito no estaban claros.
El agente se vio forzado a adivinar demasiado.

Gran parte del mal output es simplemente trabajo mal encuadrado que llega rápido.

Por eso he empezado a pensar en los agentes menos como multiplicadores de productividad puros y más como **multiplicadores de criterio**.

Multiplican el beneficio de la claridad.

Y también multiplican el coste de la confusión.

---

## La revisión sigue importando — pero es posterior

Para ser claro, sigo pensando que la revisión es una parte enorme de trabajar con agentes.

Todavía tienes que verificar qué cambió. Todavía tienes que validar si la implementación realmente resuelve el problema correcto. Todavía tienes que detectar riesgos ocultos, abstracciones incómodas, lógica frágil, y trabajo que técnicamente funciona pero que en realidad no pertenece al sistema.

Eso no desaparece.

Pero ya no creo que la revisión sea el centro del trabajo oculto.

Creo que es posterior a él.

Gran parte del trabajo de revisión doloroso es simplemente el coste de una dirección débil que se manifiesta más tarde.

Si la tarea estaba mal encuadrada, la revisión se vuelve más pesada. Ahora no solo estás evaluando calidad. Estás limpiando ambigüedad que debería haberse resuelto antes. Estás corrigiendo suposiciones que el agente no debería haber tenido que hacer. Estás arrastrando el trabajo de vuelta hacia el objetivo real después de que se desvió.

Ese es un tipo de revisión muy diferente.

Una tarea bien dirigida suele conducir a una revisión más nítida. Más enfocada. Con mayor apalancamiento.

Estás verificando encaje, coherencia, riesgo y calidad.

Una tarea mal dirigida conduce a trabajo de rescate.

Y esa diferencia es una de las señales más claras de que el apalancamiento real empieza antes de lo que la mayoría piensa.

---

## Por qué algunas personas obtienen tanto más de la IA

Esta es también la razón por la que tengo cuidado cuando alguien me dice que probó un agente, obtuvo resultados mediocres, pasó demasiado tiempo limpiando cosas, y se fue pensando que todo era puro hype. No descarto esa experiencia. Es real, y le ocurre a personas técnicamente capaces que lo intentan en serio. Pero cuando hago algunas preguntas — qué le pediste que hiciera, cómo lo encuadraste, qué contexto le diste — la respuesta es casi siempre la misma: la tarea no estaba suficientemente bien definida. No por malas intenciones. Solo por una brecha en la dirección.

Esa experiencia es real.

Pero también he aprendido que "usar IA" es una frase increíblemente amplia. Dos personas pueden decir que están usando coding agents y aun así estar haciendo cosas completamente diferentes.

La [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/ai) muestra exactamente esto: mientras que el 84% de los desarrolladores usa o planea usar herramientas de IA, las ganancias de productividad reportadas varían enormemente. Algunos desarrolladores reportan ahorrar horas al día. Otros reportan un impacto mínimo o incluso frustración. Las mismas herramientas. Resultados diferentes.

Una persona está chateando con un modelo y esperando un output útil.

La otra está dirigiendo un sistema de trabajo delegado con contexto, límites, estándares e intencionalidad.

Por supuesto que esas dos experiencias se van a sentir diferentes.

Por eso no creo que la ventaja a largo plazo pertenezca solo a las personas que tienen acceso a los mejores modelos.

Creo que pertenecerá a las personas que aprendan a dirigirlos bien.

Las personas que aprendan a:
- encuadrar problemas con claridad
- definir tareas delegables
- proporcionar suficiente contexto sin ahogar el sistema en ruido
- establecer límites
- secuenciar el trabajo correctamente
- y revisar eficientemente porque el trabajo estuvo bien dirigido desde el principio

Esa no es una habilidad menor.

Creo que se está convirtiendo en una de las habilidades de mayor apalancamiento en el trabajo de software moderno.

---

## El trabajo oculto

El trabajo oculto de la era IA no es solo revisar lo que producen los agentes.

Es saber cómo dirigirlos.

Es tomar un problema desordenado y darle forma hasta convertirlo en algo que pueda delegarse bien. Es decidir qué importa, qué no, qué debe restringirse y qué debe permanecer flexible. Es saber qué contexto necesita el agente, cómo debería verse la calidad, dónde están los riesgos, y cuándo la tarea está realmente lista para entregar.

Esa es la parte que creo que mucha gente todavía no ve.

El apalancamiento real no es solo tener acceso a agentes.

Es la capacidad de dirigirlos bien.

Y cuanto más trabajo de esta manera, más convencido estoy de que este es uno de los cambios definitorios de la era IA: no solo que las máquinas ahora pueden ejecutar más del trabajo, sino que el valor humano se está desplazando hacia arriba, hacia el encuadre, el criterio, la delegación y la dirección.

Ese es el trabajo oculto.

Y creo que apenas estamos empezando a entender cuánto importa.

Sigamos construyendo.

---

## Recursos

- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Cubre diseño de contexto, restricciones y criterios de éxito para trabajar con Claude
- [METR: Early 2025 AI Dev Productivity Study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — El hallazgo contraintuitivo de que los devs con experiencia eran un 19% más lentos con herramientas de IA
- [Stack Overflow Developer Survey 2025: AI](https://survey.stackoverflow.co/2025/ai) — 84% de adopción pero con impacto reportado muy variable — las mismas herramientas, resultados diferentes
- [METR: AI Task Time Horizons](https://metr.org/time-horizons/) — La "nueva Ley de Moore" que rastrea cómo las capacidades de los agentes de IA se duplican cada pocos meses
