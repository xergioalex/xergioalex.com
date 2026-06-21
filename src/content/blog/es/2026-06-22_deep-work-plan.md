---
title: "Deep Work Plan: dale a tu agente un plan y un harness"
description: "Un agente clavó la primera hora y a la tercera se desvió. El arreglo no fue un mejor modelo: fue un plan estable que el repositorio sostiene como objetivo."
pubDate: "2026-06-22"
heroImage: "/images/blog/posts/deep-work-plan/hero-es.webp"
heroLayout: "side-by-side"
tags: ["tech", "portfolio", "ai-agents", "claude"]
keywords: ["metodología Deep Work Plan", "desarrollo guiado por especificaciones agentes IA", "harness engineering para agentes de código", "trabajo de agentes de larga duración", "repositorio como harness de agentes", "spec-driven development agnóstico de herramienta", "planes de agentes reanudables en disco"]
series: "working-with-agents"
seriesOrder: 8
draft: false
---

Quiero poder entregarle a un agente una pieza de trabajo real — una migración, una función, una tanda de cambios que toman horas — y alejarme del teclado sabiendo que, cuando vuelva, va a estar bien hecho. Sin vigilarlo. Sin corregirlo cada veinte minutos. Trabajo autónomo en el que de verdad pueda confiar. Esa es la meta de este capítulo y de toda la metodología que voy a presentar.

La respuesta corta —la que me tomó un año entender— es que esa confianza no sale de un modelo más inteligente. Sale de darle al agente dos cosas: un plan del que no se pueda desviar en silencio, y un harness que lo sostenga contra ese plan — las dos instaladas en el repositorio, como archivos que cualquier agente puede leer. Lo empaqueté en una metodología estructurada y de código abierto para el trabajo con agentes, a la que he nombrado **Deep Work Plan** ([https://deepworkplan.com](https://deepworkplan.com)). El resto de este capítulo es qué significa eso y por qué cada pieza tiene que estar.

<figure>
  <img src="/images/blog/posts/deep-work-plan/logo-dwp-es.webp"
       alt="Logo de Deep Work Plan: el monograma DWP junto al nombre 'Deep Work Plan' y la línea 'Metodología · Especificación · Kit', con una ilustración de una lámpara de aceite al estilo grabado."
       width="1142"
       height="222"
       loading="lazy" />
  <figcaption><a href="https://deepworkplan.com">Deep Work Plan</a>: una metodología abierta de Spec Driven Development.</figcaption>
</figure>

Llegué a esa conclusión por las malas — viendo a un agente de frontera, bien equipado y con el mejor razonamiento disponible en el mercado, desviarse de todos modos. Es un patrón que aparece en cualquier trabajo de larga ejecución: pasado cierto tiempo, el agente empieza a perder el horizonte de la tarea. Hay un límite a cuánto contexto puede sostener, y cuando lo alcanza tiende a resumir lo que tiene para seguir avanzando — y el diablo está en los detalles, justo los que se pierden cuando ese contexto se comprime. De ahí en adelante razona desde una versión de la tarea que ya no coincide con la original: rehace trabajo que ya estaba hecho, se convence de un refactor que nadie pidió, pierde el hilo de qué terminó de verdad. No se cae. Se desvía.

La inteligencia nunca fue el problema — esa fue toda la lección [del capítulo sobre harness engineering](/es/blog/the-harness-layer/). Lo que aprendí esta vez fue la otra cara de esa lección: el mismo agente, con el mismo modelo, produce resultados de otro orden de magnitud según con qué lo equipes. Aquel agente tenía un harness, pero un harness sin un objetivo que sostener es un sistema de control regulando hacia nada. Súmale un plan —un lugar donde pararse, un objetivo del que no se pueda salir en silencio— y el mismo agente que se desviaba a la tercera hora cierra trabajo serio en una sola corrida, sin que estés supervisando de forma constante. Un buen harness y un plan no se suman: se multiplican.

Ese cambio de foco lo reordenó todo. Si el salto no viene del modelo, no lo vas a ganar con un prompt más astuto ni esperando la próxima versión más inteligente — los modelos importan, pero importa más aquello dentro de lo que trabajan. La desviación nunca fue un problema de prompting que se arregla hablando más bonito; era estructural, de los que se resuelven con ingeniería. Y eso reencuadra qué es un agente *bien equipado*: no el que corre el modelo más inteligente, sino el que está parado sobre un harness que lo sostiene y un plan del que no puede irse por la tangente — y darle eso a un agente es de lo que trata todo lo demás.

---

## El harness convierte una instrucción simple en un plan completo

Casi siempre, la calidad de lo que produce un agente es la calidad de lo que le pediste. Una instrucción vaga da un resultado vago; una buena —la que nombra los archivos que tocar, los servicios y las librerías que usar, las restricciones a respetar, el contexto que el agente no trae de entrada— da un resultado que de verdad sirve. Si quieres que una tarea quede lo mejor posible, normalmente te toca explicarla a ese nivel de detalle, y dictar todo ese detalle a mano, cada vez, es justo el trabajo que no escala.

Un repositorio bien equipado cambia la ecuación. El harness es el termostato de esta serie —el sistema que mide y corrige—, pero un termostato sin una temperatura puesta solo zumba: necesita un número en el dial. Lo interesante es de dónde sale ese número. Cuando las skills, los agentes, la documentación y las specs ya viven en el repo, el agente no llega en blanco: llega sabiendo cómo está armado el proyecto, qué convenciones seguir y qué herramientas tiene a mano. Con eso, una instrucción de una línea le alcanza para entender lo que de verdad hay que hacer — no porque adivine, sino porque el contexto que antes le tenías que dictar ya está escrito en el repositorio.

Y eso desbloquea lo importante: el mismo agente puede poner el número en el dial. De un objetivo de alto nivel deriva la especificación detallada —el objetivo afinado, las restricciones, los criterios de aceptación, las validaciones que tienen que pasar antes de que una tarea cuente como hecha— y te la deja escrita para que la revises antes de arrancar. Tú pones la dirección; el harness le da al agente lo que necesita para convertir esa dirección en un plan que se puede ejecutar y verificar. Y ese plan no se queda quieto: corre como un bucle que el agente recorre vuelta tras vuelta — plan, tareas atómicas, validaciones, finalización y estado reanudable —, y el harness deja de ser una pila de chequeos para volverse la máquina que, en cada vuelta, prueba que el trabajo sigue cayendo dentro de las líneas que quedaron dibujadas.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-plan-no-drift-es.webp"
       alt="Ilustración de estilo grabado: el bucle de un Deep Work Plan dispuesto en círculo — plan, tareas atómicas, validaciones, finalización y estado reanudable — bajo el título 'Un plan del que los agentes no pueden desviarse'."
       width="1600"
       height="960"
       loading="lazy" />
  <figcaption>El plan corre como un bucle — plan → tareas atómicas → validaciones → finalización → estado reanudable — y el harness mantiene al agente dentro de él, vuelta tras vuelta.</figcaption>
</figure>

Esto es lo que muchos subestiman, y creo que es porque suena aburrido: la diferencia entre un agente que se desvía a la tercera hora y uno que corre solo toda una tarde no vive en el modelo, vive en si hay un plan escrito al que volver. Y poner ese plan por escrito, antes de que el agente arranque, es una práctica con nombre propio.

---

## Qué consigues con el Spec Driven Development

Mueve una sola cosa, y de ahí sale todo lo demás: la fuente de verdad deja de ser una conversación efímera y pasa a ser un plan estructurado, contenido en disco. El agente ejecuta contra esa especificación, no contra lo que alcance a recordar del chat. Es un cambio pequeño que te compra dos cosas que un chat no puede dar.

La primera es estabilidad. Ya vimos cómo se erosiona el contexto al comprimirse: se llena, deja caer las decisiones del principio, y la tarea que el agente cree estar haciendo termina divergiendo de la que le diste. Un archivo en disco no se mueve. El agente lo lee al inicio de la tarea cuatro igual que en la tarea uno, así que la desviación no tiene dónde acumularse: la verdad vive fuera de la parte del sistema que se desgasta.

La segunda es una definición de completitud que una máquina puede verificar — una forma de comprobar si el agente de verdad completó su tarea, en vez de creerle. Aquí es donde deja de ser una lista de pendientes. Cada tarea lleva sus propios criterios de aceptación y sus propias validaciones — los comandos que tienen que volver en verde antes de que la tarea pueda cerrarse. El agente no puede *darse* por completado: tiene que pasar las validaciones. "Completado" se vuelve un contrato, no una sensación — que es exactamente la diferencia entre trabajo que puedes verificar y trabajo que tienes que releer línea por línea porque no confías en él.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-done-is-a-contract-es.webp"
       alt="Ilustración de estilo grabado de un sello de lacre estampando 'Criterios de Aceptación Cumplidos', bajo el título 'Terminado es cumplir el contrato, no un acto de fe', con la lista: tests pasan, tipos verifican, criterios de aceptación cumplidos, o la tarea sigue abierta."
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>Cada tarea nombra sus criterios de aceptación y las validaciones que tienen que pasar. El agente no puede <em>darse</em> por completado — las pasa, o la tarea sigue abierta.</figcaption>
</figure>

El bucle, escrito completo, es casi vergonzosamente simple. Escribes un plan. El plan se parte en tareas atómicas, suficientemente pequeñas como para que una quepa cómoda dentro de una sola ventana de contexto. Cada tarea nombra sus criterios de aceptación y sus validaciones. El agente hace una tarea, las validaciones corren, la tarea cierra o no cierra. Después la siguiente. Plan, tarea, validación, terminación — esa es toda la forma, y esa forma *es* el desarrollo guiado por especificaciones. No hay nada exótico ahí. La disciplina está en negarse a saltarse cualquier parte cuando tienes prisa.

---

## El repositorio es el harness — y ahora tiene un plan

La razón por la que esto encaja en la serie en vez de quedar al lado es la parte a la que sigo volviendo: el plan no vive en una herramienta. Vive en el repositorio.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-repository-is-the-harness-es.webp"
       alt="Ilustración de estilo grabado de un cofre rotulado 'REPOSITORIO' del que cuelgan cinco fichas — SPEC, TAREAS, CHEQUEOS, ESTADO y HERRAMIENTAS — bajo el título 'El repositorio es el harness'."
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>Contexto, herramientas, barreras y estado — todos como archivos planos que cualquier agente puede leer. La especificación durable en disco, validaciones en vez de corazonadas, y todo sobrevive a un reinicio de contexto.</figcaption>
</figure>

Ese es el movimiento, y es hacia donde esta serie ha venido empujando capa por capa. Empezó por la mentalidad — [el arte de dirigir agentes](/es/blog/the-art-of-directing-agents/), donde el desarrollo guiado por especificaciones dejó de ser un truco para volverse el oficio: decirle al agente qué construir y contra qué se le mide, no cómo teclearlo. Después, [la capa de las skills](/es/blog/the-skill-layer/) — las capacidades que un agente instala para hacer ese trabajo, leyendo un `SKILL.md` y de repente sabiendo algo que antes no podía. Después, [la capa del harness](/es/blog/the-harness-layer/) — el sistema alrededor del modelo que revisa su trabajo y convierte cada error en un arreglo permanente. Skill a skill, cicatriz a cicatriz, el repositorio de este blog se volvió bueno para el trabajo con agentes: el contexto, las guías, los sensores y las skills, todo instalado en el repo como archivos que cualquier agente puede leer. El desarrollo guiado por especificaciones es lo que por fin le da a ese harness un objetivo. El plan es un conjunto de archivos en disco, todos bajo un directorio `.dwp/plans/PLAN_<slug>/`: un `README.md` con el objetivo y la tabla de tareas, un archivo por tarea (`<n>.task_<slug>.md`), y — la parte que me sorprendió por lo mucho que importaba — el *estado*. No vive en una casilla mágica: cada tarea lleva su propio marcador de avance (`[ ]` sin empezar, `[~]` en curso, `[x]` hecha, `[!]` bloqueada) y un `PROGRESS.md` que solo crece, un registro con fecha de qué se hizo en cada tarea y qué se desvió. El plan no es solo una descripción del trabajo. Es la posición viva del trabajo, en disco, donde un reinicio de contexto no la puede tocar.

Esa última parte es la que hace que una corrida sea reanudable. La que se me desvió no era recuperable, porque la idea que tenía el agente de dónde iba vivía solo en una ventana de contexto que se estaba evaporando. Cuando la posición vive en archivos, puedes cerrar el portátil. El agente — u otro agente, o el mismo agente tres reinicios después — abre el plan, lee qué tareas están marcadas, lee el estado, y retoma exactamente donde paró el anterior. El trabajo de larga duración deja de exigir una sesión de chat ininterrumpida, porque la sesión nunca fue donde vivía la verdad.

El nombre — **Deep Work Plan** — viene del trabajo profundo: esfuerzo sostenido y sin distracción sobre algo cognitivamente exigente, solo que para un agente. Un plan suficientemente profundo como para correrlo durante horas, suficientemente estructurado como para que no pueda irse por la tangente en silencio. Un agente sin plan es como alguien que nunca bloquea tiempo en el calendario, nunca anota nada y cambia de tarea con cada interrupción; el plan le da el equivalente de una agenda bloqueada y un brief escrito. No es un producto que esté vendiendo y no está nombrado en honor a nadie — es eso que volví a reconstruir a mano en cada repo, el mismo andamiaje rascado desde cero cada vez, hasta que me cansé lo suficiente de retipearlo como para escribirlo bien, como una especificación. Plan, tareas atómicas, validaciones, terminación, estado reanudable. El bucle guiado por especificaciones, instalado en el repositorio como archivos.

Escribirlo es donde dejó de ser una costumbre personal y se volvió una metodología. Una vez que la forma estuvo en papel pude hacerla proporcional — un arreglo de una línea no necesita la ceremonia de una migración de base de datos — así que un plan ahora viene en niveles: un plan micro para lo pequeño, uno profundo para el trabajo que de verdad tiene que sobrevivir horas y reinicios. El estado también se volvió más honesto: no solo las casillas del `README.md`, sino el `PROGRESS.md` que registra, con marca de tiempo, qué pasó en cada tarea y dónde se desvió o por qué se bloqueó, para que un agente nuevo pueda reconstruir exactamente dónde quedó el anterior. Nada de eso fue un destello de inspiración. Fue la acumulación lenta de ver romperse la misma cosa de la misma forma y por fin decidir arreglarla una vez.

Dos pilares lo sostienen, y nombrarlos es la forma más limpia que he encontrado de decir qué es la metodología. Uno es el harness — el contexto, las barreras, el estado — todo repo-native, eso que esta serie ha venido construyendo a mano capítulo tras capítulo. El otro es el plan guiado por especificaciones que por fin le da a ese harness un número que sostener. **Deep Work Plan** es cómo dejas de armar ambos a mano y los instalas de una vez: un plan *y* un harness, soltados en un repo como archivos.

---

## Qué le da eso al agente, en el día a día

Vale la pena deletrear qué hace el plan una vez que está corriendo — ahí es donde deja de parecerse a una lista de pendientes con esteroides, y donde caían las preguntas más filudas que me hicieron cuando lo puse frente a otra gente. Déjame responderlas.

Las validaciones corren solas. Una validación no es una nota para mí; es un comando que el agente corre y que tiene que ver volver en verde antes de que se le permita cerrar una tarea. Cuando no vuelve en verde, el agente marca la tarea como *bloqueada* y se detiene — fuerte, en un archivo — en lugar de enterrar la falla en algún punto de una transcripción que yo tendría que ir a pescar. Mi visto bueno solo enmarca la corrida: apruebo el plan antes de que arranque y leo el diff cuando termina. El medio, la parte que antes era yo rondando encima, ahora les pertenece a las validaciones.

El plan describe comportamiento, no ediciones, y eso es lo que evita que se vuelva obsoleto: los criterios de aceptación nombran resultados, no números de línea, así que puedo cambiar el código entre corridas y las validaciones simplemente se vuelven a correr contra lo que el repo es ahora. Y cuando una tarea sencillamente está mal —mal secuenciada, o resultó significar algo que no había visto—, el agente la bloquea en vez de improvisar para esquivarla; como el estado vive aparte de la lista de tareas, puedo reescribir la parte abierta del plan sin perder la que ya pasó.

La parte que no diseñé a propósito, y la que terminé apreciando más: cada corrida deja el repositorio un poco más listo para agentes de lo que lo encontró. Una tarea que cambia comportamiento actualiza la documentación y extiende las pruebas dentro de su propia validación. Y la metodología lo vuelve obligatorio: todo plan cierra con tres tareas fijas — una **revisión de seguridad** que audita todo lo que el plan tocó, un **descubrimiento de skills y agentes** que rescata lo reutilizable que salió en el camino, y un **reporte ejecutivo** que resume qué se entregó. El harness no solo sostiene el trabajo — lo capitaliza. Que es toda la serie plegándose sobre sí misma: skill, harness, plan, cada corrida abaratando la siguiente.

Junta las piezas y mira lo que de verdad queda en manos del agente: capacidad (las skills), un sistema que lo corrige solo (el harness) y un objetivo verificable del que no se puede escapar en silencio (el plan). Esa combinación es lo que vuelve la autonomía *confiable*, no apenas posible. Puedes dejar una corrida andando sin estar encima porque cada "terminado" está respaldado por una validación que pasó, cada posición vive en disco a prueba de reinicios, y cada desviación se detiene fuerte en un archivo en lugar de esconderse en una transcripción. No es que el agente se haya vuelto más listo — es que el trabajo por fin tiene barandas. Y ese es justo el piso que hace falta antes de soltar a un agente a trabajar solo durante horas: **trabajo autónomo en el que de verdad puedes confiar**.

---

## Por qué no es una herramienta

La objeción obvia, y la correcta de plantear, es que esto ya existe. El Spec Driven Development no es algo que yo haya inventado — hay herramientas reales construidas alrededor de la misma idea: [Spec Kit de GitHub](https://github.com/github/spec-kit), [Kiro de Amazon](https://kiro.dev), [Tessl](https://tessl.io). Si has usado alguna, mucho de lo que acabo de describir te va a sonar, y es justo.

La diferencia es dónde vive la especificación. Esas son herramientas — adoptas la herramienta, trabajas como la herramienta trabaja, y tu especificación queda moldeada por la superficie de esa herramienta. **Deep Work Plan** es la otra cosa: vive en el repositorio como archivos planos que cualquier agente puede leer. No hay un runtime que adoptar, ni un proveedor al que apostarle, ni una reimplementación por herramienta cuando cambias de agente. El plan, las tareas y el log son markdown plano sentado en `.dwp/`. Claude Code lo puede correr. Codex lo puede correr. Cursor lo puede correr. El agente del año que viene que nadie ha lanzado todavía lo va a poder correr, porque son solo archivos, y leer archivos es lo que mejor sabe hacer cualquier agente.

Ese es todo el argumento de repo-native sobre tool-bound, y voy a ser honesto: no lo aprecié hasta que tuve el mismo formato de plan sobreviviendo a un agente que ya había dejado de usar. La metodología sobrevivió a la herramienta. Una especificación dentro de una herramienta es una apuesta a que la herramienta siga existiendo. Una especificación dentro del repositorio es una apuesta a que el *repositorio* siga existiendo — que es una apuesta que ya estoy haciendo, porque es donde está el código.

---

## Probado en carne propia, decenas de repos de profundidad

Desconfío de las metodologías que solo funcionan en las diapositivas, así que la única prueba que me convence es el dogfooding: usar la cosa en el trabajo real que publico, no solo recomendarla. Y eso es justo lo que hago — este blog entre ellas. Casi todo cambio en este repositorio ahora arranca como un **Deep Work Plan**: un archivo de plan, tareas atómicas, validaciones que tienen que pasar, estado en disco. El post que estás leyendo se escribió bajo uno. Cuando digo que el bucle sobrevive un reinicio de contexto, es porque lo he visto sobrevivir uno en trabajo que me importaba, no porque el diagrama diga que debería.

Y no es solo en proyectos personales: lo he probado tanto en los míos como en los profesionales. La misma metodología corre en producción en DailyBot — de hecho nació de la ingeniería de ahí, donde la versión a mano se reconstruyó suficientes veces en suficientes repos como para que estandarizarla dejara de ser opcional. Un equipo la usa para que el trabajo de agentes de larga duración no se desvíe a una escala en la que yo no opero estando solo, y hay [un relato más largo de cómo mi equipo en DailyBot corre esto a lo largo de cientos de páginas](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) si quieres la versión a escala de empresa de la misma historia. La metodología se documenta y se publica desde un repositorio que la usa sobre sí mismo — el dogfooding más honesto que conozco: si la cosa se rompiera, se rompería primero en su propia casa. La prueba y el artefacto son los mismos repos.

Si quieres probarla, todo está abierto y con licencia MIT. La metodología, la especificación legible y el kit viven en [deepworkplan.com](https://deepworkplan.com); hay un endpoint de adopción en un paso en [deepworkplan.com/init](https://deepworkplan.com/init) que apunta un agente a tu repo y lo deja listo; y está empaquetada como una skill instalable en [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — un router y un puñado de sub-skills que mapean directo sobre el bucle: create, execute, refine, resume, status, verify. Entra en el layout `.agents/skills/` igual que cualquier otra skill. Instálala, apunta un agente a tu repo, genera un plan, córrelo.

---

## Qué cambió para mí

El giro, mirando atrás, fue pequeño y total al mismo tiempo. Dejé de tratar de volverme mejor corrigiendo al agente a mitad de corrida y empecé a escribir —antes de que arranque— qué significa terminado y dónde están las líneas. Eso reordenó el trabajo en una división limpia: yo dirijo —la intención, los criterios de aceptación, la revisión— y el agente ejecuta, tarea por tarea. La corrección no desapareció; se movió más temprano, hacia el plan, donde es una frase que escribo una vez en lugar de una interrupción que tengo que seguir haciendo.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-humans-steer-es.webp"
       alt="Ilustración de estilo grabado de un capitán de barco al timón señalando el rumbo mientras la tripulación ejecuta, bajo el título 'Los humanos dirigen. Los agentes ejecutan', con las líneas: tú aportas intención, criterios de aceptación y revisión; los agentes, la ejecución tarea por tarea; el plan, el contrato entre ambos."
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>Tú decides qué significa terminado y dónde están las líneas; el plan carga tu intención y los agentes hacen las horas. El plan es el contrato entre los dos.</figcaption>
</figure>

Y ahí hay una trampa, que es lo más honesto que puedo decir del método: un plan flojo falla tan en silencio como antes lo hacía la desviación. Una especificación vaga se ejecuta con toda fidelidad — las validaciones pasan a verde, el build pasa, y lo que vuelve es exactamente lo que escribí, que es justo el problema cuando lo que escribí no estaba bien pensado. El agente ya no se va por la tangente; ahora soy yo el que apunta mal. Nada del andamiaje arregla eso. Escribir bien el plan — nombrar el problema real en vez del síntoma, trazar las líneas contra las que se mide el trabajo, anticipar dónde va a adivinar el agente para cerrar la brecha antes de que arranque — es la parte que sigue siendo mía, y resultó ser la parte difícil. La metodología no reemplaza ese criterio. Lo vuelve aquello de lo que depende toda la corrida.

Esa fue la última vez que un agente se me desvió por esa razón. No porque el modelo se volviera más inteligente —es el mismo modelo—, sino porque el trabajo por fin tuvo un lugar donde pararse que el contexto no podía erosionar por debajo. El harness tenía un objetivo. El plan era el objetivo. Y el repositorio sostenía los dos.

Pero el cambio más grande no está en el agente, sino en mí. Mi trabajo dejó de ser teclear la solución y pasó a ser dirigir: nombrar el objetivo con precisión, fijar las metas, comunicar la intención lo bastante bien como para que se ejecute sin que yo esté encima. Esa, creo, es la habilidad que define esta era: comunicar. La misma que siempre estuvo en el centro de las buenas relaciones humanas se vuelve ahora imprescindible en la relación entre un humano y un agente. El que sepa decir con claridad qué quiere construir —y por qué— va a llegar mucho más lejos que el que solo sepa construir.

A seguir construyendo — y, sobre todo, a seguir afinando cómo lo pedimos.

---

## Recursos

- [Deep Work Plan](https://deepworkplan.com) — la metodología, la especificación legible y el kit
- [deepworkplan.com/init](https://deepworkplan.com/init) — endpoint de adopción en un paso que deja tu repo listo
- [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — Deep Work Plan empaquetado como skill instalable para agentes
- [Cómo un equipo corre trabajo de agentes de larga duración en producción](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) — el relato a escala de empresa de la misma metodología
- [GitHub Spec Kit](https://github.com/github/spec-kit) — desarrollo guiado por especificaciones atado a una herramienta, para contrastar con el enfoque repo-native
