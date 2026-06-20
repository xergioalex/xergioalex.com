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

Esta serie ha venido construyendo de a una capa por vez. Empezó por la mentalidad: [el arte de dirigir agentes](/es/blog/the-art-of-directing-agents/), donde el desarrollo guiado por especificaciones (Spec Driven Development) dejó de ser un truco para volverse el oficio — decirle al agente qué construir y contra qué se le mide, no cómo teclearlo. Después, las capacidades que un agente instala para hacer ese trabajo — [la capa de las skills](/es/blog/the-skill-layer/), donde un agente lee un `SKILL.md` y de repente sabe hacer algo que antes no podía. Después, el sistema alrededor del modelo que revisa su trabajo y convierte cada error en un arreglo permanente — [la capa del harness](/es/blog/the-harness-layer/), el andamiaje que decide cuándo corre una skill y si el resultado es lo bastante bueno como para conservarlo. Skill a skill, cicatriz a cicatriz, el repositorio de este blog se volvió bueno para el trabajo con agentes.

Y entonces vi a un agente bien equipado desviarse de todos modos.

Era un trabajo de varias partes en este mismo blog — una migración de contenido a lo largo de unas cuantas docenas de archivos. Las skills estaban. El harness estaba: los hooks, las guías que leía antes de actuar, los sensores que cazan lo que un cambio rompe. Durante la primera hora fue un placer verlo — ediciones limpias, los archivos correctos, hasta cazó una tilde que se me había escapado en un texto en español. En algún punto cerca de la tercera hora de esa tarde se había desviado en silencio. No se había caído — se había ido por la tangente. Volvió a resolver algo que ya estaba resuelto, se convenció a sí mismo de un refactor que yo nunca pedí, y perdió el hilo de qué archivos había terminado de verdad. La ventana de contexto se había llenado con su propia cháchara, las decisiones del principio se habían ido por arriba, y el agente razonaba a partir de una versión de la tarea que ya no coincidía con la que le di.

La inteligencia estaba bien. La inteligencia nunca fue el problema — esa fue toda la lección del capítulo del harness, y aquí estaba otra vez frente a mí. Lo que este agente tenía era un harness. Lo que no tenía era nada contra lo que ese harness pudiera sostener el trabajo: un sistema de control regulando hacia nada. No tenía un lugar donde pararse. Le faltaba un plan.

Ese fue el giro para mí. El arreglo nunca iba a ser un prompt más astuto ni esperar a un modelo más inteligente — los modelos importan, pero importa más aquello dentro de lo que trabajan, y la desviación era un problema estructural que había que resolver con ingeniería, no uno de prompting que se gana hablando más bonito. Un agente bien equipado, resulta, no es el que tiene el modelo más inteligente. Es el que está parado sobre un plan del que no puede irse por la tangente en silencio — y darle eso a un agente es de lo que trata todo lo demás.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-plan-no-drift.webp"
       alt="Ilustración de estilo grabado: el bucle de un Deep Work Plan dispuesto en círculo — plan, tareas atómicas, puertas de validación, terminación y estado reanudable — bajo el título 'A plan agents can't drift from' (un plan del que los agentes no se pueden desviar)."
       width="1600"
       height="960"
       loading="lazy" />
  <figcaption>El bucle completo: plan → tareas atómicas → puertas de validación → terminación → estado reanudable. Desarrollo guiado por especificaciones, escrito en el repositorio como archivos.</figcaption>
</figure>

---

## Aquello a lo que apunta un harness

Esta es la versión honesta de dónde me había trancado. El repositorio estaba, para los estándares de esta serie, bien afinado — skills instaladas, guías que el agente leía antes de actuar, sensores que cazaban lo que rompía después. Y aun así se desviaba en cualquier cosa que tomara más de una hora, porque nada en el harness era el *objetivo*. El build te dice que un cambio está roto. No te dice que el cambio era el cambio equivocado. El linter queda feliz hayas hecho o no el trabajo que de verdad pediste.

Un termostato es la forma más limpia que conozco de decirlo. El harness es el termostato — el sistema de control que sigue midiendo y corrigiendo. Pero un termostato sin una temperatura puesta solo zumba. Lo que te falta no es un mejor termostato. Es un número en el dial.

El número en el dial es el plan. No una intención vaga en un mensaje de chat que se va con el scroll — una especificación escrita que el agente lee al inicio de cada tarea y contra la que se le mide al final de cada tarea. Qué significa *correcto*, dicho de entrada: el objetivo, las restricciones, los criterios de aceptación, las puertas de validación que tienen que pasar antes de que una tarea cuente como hecha. Una vez que eso existe, el harness tiene algo que hacer. Deja de ser una pila de chequeos y se convierte en una máquina para probar, una y otra vez, que el trabajo del agente sigue cayendo dentro de las líneas que dibujaste.

Esta es la parte que subestimé durante meses. Creo que la subestimé porque suena aburrida. "Escribe lo que quieres antes de que el agente arranque" no es una frase que haga a nadie inclinarse hacia adelante. Pero la diferencia entre un agente que se desvía a la tercera hora y uno que corre solo toda una tarde resultó vivir casi entera en esa frase aburrida.

---

## Qué te compra de verdad el desarrollo guiado por especificaciones

El nombre propio de la frase aburrida es **desarrollo guiado por especificaciones**. El plan, o la especificación, es la fuente de verdad estable — y el agente ejecuta contra ella en lugar de contra lo que todavía alcance a recordar de la conversación.

La palabra *estable* es la que carga el peso. Un contexto de chat es lo opuesto a estable: es una ventana deslizante, se llena, las decisiones del principio se caen por atrás, y cuando el agente compacta o se reinicia, la tarea que cree estar haciendo ya divergió en silencio de la que le diste. Eso no es un bug de ningún modelo en particular. Es la forma del medio. Una especificación en disco no se desliza. El agente la vuelve a leer al inicio de la tarea cuatro exactamente como la leyó al inicio de la tarea uno. La desviación no tiene dónde acumularse, porque la fuente de verdad no está en la parte del sistema que se erosiona.

Y el desarrollo guiado por especificaciones te da la segunda cosa que el chat no puede: una definición de terminado que una máquina puede verificar. Aquí es donde deja de ser una lista de pendientes. Cada tarea lleva sus propios criterios de aceptación y sus propias puertas de validación — los comandos que tienen que volver en verde antes de que la tarea pueda cerrarse. En este blog esa puerta es concreta: `pnpm run build`, un grep de tildes sobre el español, una auditoría que lee el post completo contra un checklist antes de dejarlo acercarse a publicación. El agente no puede *sentirse* terminado. Tiene que pasar. "Terminado" se vuelve un contrato, no una sensación — que es exactamente la diferencia entre trabajo que puedes verificar y trabajo que tienes que releer línea por línea porque no confías en él.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-done-is-a-contract.webp"
       alt="Ilustración de estilo grabado de un sello de lacre estampando 'Acceptance Criteria Met', bajo el título 'Done is a contract, not a vibe' (terminado es un contrato, no una sensación), con la lista: tests pass, types check, acceptance criteria met, or the task stays open."
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>Cada tarea nombra sus criterios de aceptación y las puertas que tienen que pasar. El agente no puede <em>sentirse</em> terminado — tiene que pasar, o la tarea sigue abierta.</figcaption>
</figure>

El bucle, escrito completo, es casi vergonzosamente simple. Escribes un plan. El plan se parte en tareas atómicas, suficientemente pequeñas como para que una quepa cómoda dentro de una sola ventana de contexto. Cada tarea nombra sus criterios de aceptación y sus puertas. El agente hace una tarea, las puertas corren, la tarea cierra o no cierra. Después la siguiente. Plan, tarea, puerta, terminación — esa es toda la forma, y esa forma *es* el desarrollo guiado por especificaciones. No hay nada exótico ahí. La disciplina está en negarse a saltarse cualquier parte cuando tienes prisa.

---

## El repositorio es el harness — y ahora tiene un plan

La razón por la que esto encaja en la serie en vez de quedar al lado es la parte a la que sigo volviendo: el plan no vive en una herramienta. Vive en el repositorio.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-repository-is-the-harness.webp"
       alt="Ilustración de estilo grabado de un cofre rotulado 'REPOSITORY' del que cuelgan cinco fichas — SPEC, TASKS, CHECKS, STATE y TOOLS — bajo el título 'The repository is the harness' (el repositorio es el harness)."
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>Contexto, herramientas, barreras y estado — todos como archivos planos que cualquier agente puede leer. La especificación durable en disco, puertas de validación en vez de corazonadas, y todo sobrevive a un reinicio de contexto.</figcaption>
</figure>

Ese es el movimiento. Toda la serie ha venido empujando hacia la idea de que el repositorio mismo se convierte en el harness — el contexto, las guías, los sensores, las skills, todo instalado en el repo como archivos que cualquier agente puede leer. El desarrollo guiado por especificaciones es lo que por fin le da a ese harness un objetivo. El plan es un conjunto de archivos en disco, todos bajo un directorio `.dwp/plans/PLAN_<slug>/`: un `README.md` con el objetivo y la tabla de tareas, un archivo por tarea (`<n>.task_<slug>.md`), y — la parte que me sorprendió por lo mucho que importaba — el *estado*. No vive en una casilla mágica: cada tarea lleva su propio marcador de avance (`[ ]` sin empezar, `[~]` en curso, `[x]` hecha, `[!]` bloqueada) y un `PROGRESS.md` que solo crece, un registro con fecha de qué se hizo en cada tarea y qué se desvió. El plan no es solo una descripción del trabajo. Es la posición viva del trabajo, en disco, donde un reinicio de contexto no la puede tocar.

Esa última parte es la que hace que una corrida sea reanudable. La migración de aquella tarde que se me desvió no era recuperable, porque la idea que tenía el agente de dónde iba vivía solo en una ventana de contexto que se estaba evaporando. Cuando la posición vive en archivos, puedes cerrar el portátil. El agente — u otro agente, o el mismo agente tres reinicios después — abre el plan, lee qué tareas están marcadas, lee el estado, y retoma exactamente donde paró el anterior. El trabajo de larga duración deja de exigir una sesión de chat ininterrumpida, porque la sesión nunca fue donde vivía la verdad.

A la metodología que empaqueta todo esto la he venido llamando **Deep Work Plan**. El nombre viene del trabajo profundo — esfuerzo sostenido y sin distracción sobre algo cognitivamente exigente —, solo que para un agente: un plan suficientemente profundo como para correrlo durante horas, suficientemente estructurado como para que no pueda irse por la tangente en silencio. Un agente sin plan es como alguien que nunca bloquea tiempo en el calendario, nunca anota nada y cambia de tarea con cada interrupción; el plan le da el equivalente de una agenda bloqueada y un brief escrito. No es un producto que esté vendiendo y no está nombrado en honor a nadie — es eso que volví a reconstruir a mano en cada repo, el mismo andamiaje rascado desde cero cada vez, hasta que me cansé lo suficiente de retipearlo como para escribirlo bien, como una especificación. Plan, tareas atómicas, puertas, terminación, estado reanudable. El bucle guiado por especificaciones, instalado en el repositorio como archivos.

Escribirlo es donde dejó de ser una costumbre personal y se volvió una metodología. Una vez que la forma estuvo en papel pude hacerla proporcional — un arreglo de una línea no necesita la ceremonia de una migración de base de datos — así que un plan ahora viene en niveles: un plan micro para lo pequeño, uno profundo para el trabajo que de verdad tiene que sobrevivir horas y reinicios. El estado también se volvió más honesto: no solo las casillas del `README.md`, sino el `PROGRESS.md` que registra, con marca de tiempo, qué pasó en cada tarea y dónde se desvió o por qué se bloqueó, para que un agente nuevo pueda reconstruir exactamente dónde quedó el anterior. Nada de eso fue un destello de inspiración. Fue la acumulación lenta de ver romperse la misma cosa de la misma forma y por fin decidir arreglarla una vez.

Dos pilares lo sostienen, y nombrarlos es la forma más limpia que he encontrado de decir qué es la metodología. Uno es el harness — el contexto, las barreras, el estado — todo repo-native, eso que esta serie ha venido construyendo a mano capítulo tras capítulo. El otro es el plan guiado por especificaciones que por fin le da a ese harness un número que sostener. Deep Work Plan es cómo dejas de armar ambos a mano y los instalas de una vez: un plan *y* un harness, soltados en un repo como archivos.

---

## Qué le da eso al agente, en el día a día

Vale la pena deletrear qué hace de verdad el plan una vez que está corriendo, porque ahí es donde deja de ser una lista de pendientes con esteroides — y las preguntas más filudas que me hicieron cuando lo puse frente a otra gente cayeron justo aquí. Así que déjame responderlas como las respondí entonces.

Las puertas corren solas. Una puerta de validación no es una nota para mí; es un comando que el agente corre y que tiene que ver volver en verde antes de que se le permita cerrar una tarea. Cuando no vuelve en verde, el agente marca la tarea como *bloqueada* y se detiene — fuerte, en un archivo — en lugar de enterrar la falla en algún punto de una transcripción que yo tendría que ir a pescar. Mi visto bueno solo enmarca la corrida: apruebo el plan antes de que arranque y leo el diff cuando termina. El medio, la parte que antes era yo rondando encima, ahora les pertenece a las puertas.

El plan describe comportamiento, no ediciones, que es lo que evita que se vuelva obsoleto. Los criterios de aceptación nombran resultados, no números de línea — así que puedo cambiar el código entre corridas y el plan sigue en pie. Las puertas simplemente se vuelven a correr contra lo que sea que el repo es ahora, y fallan fuerte si la realidad se desvió de la especificación. Un plan clavado a ediciones específicas se pudriría la primera vez que tocara un archivo a mano; uno clavado al comportamiento me sobrevive.

Y cuando una tarea sencillamente está mal — mal secuenciada, o resultó significar algo que yo no había visto — el agente no improvisa para esquivarla. La marca como bloqueada y se detiene, y como el estado vive aparte de la lista de tareas, puedo reescribir la parte abierta del plan sin perder la parte que ya pasó. El refinamiento solo toca lo que todavía no ha corrido.

La parte que no diseñé a propósito, y la que terminé apreciando más: cada corrida deja el repositorio un poco más listo para agentes de lo que lo encontró. Una tarea que cambia comportamiento actualiza la documentación y extiende las pruebas dentro de su propia puerta. Y la metodología lo vuelve obligatorio: todo plan cierra con tres tareas fijas — una **revisión de seguridad** que audita todo lo que el plan tocó, un **descubrimiento de skills y agentes** que rescata lo reutilizable que salió en el camino, y un **reporte ejecutivo** que resume qué se entregó. El harness no solo sostiene el trabajo — lo capitaliza. Que es toda la serie plegándose sobre sí misma: skill, harness, plan, cada corrida abaratando la siguiente.

Junta las piezas y mira lo que de verdad queda en manos del agente: capacidad (las skills), un sistema que lo corrige solo (el harness) y un objetivo verificable del que no se puede escapar en silencio (el plan). Esa combinación es lo que vuelve la autonomía *confiable*, no apenas posible. Puedes dejar una corrida andando sin estar encima porque cada "terminado" está respaldado por una puerta que pasó, cada posición vive en disco a prueba de reinicios, y cada desviación se detiene fuerte en un archivo en lugar de esconderse en una transcripción. No es que el agente se haya vuelto más listo — es que el trabajo por fin tiene barandas. Y ese es justo el piso que hace falta antes de soltar a un agente a trabajar solo durante horas: **trabajo autónomo en el que de verdad puedes confiar**.

---

## Por qué no es una herramienta

La objeción obvia, y la correcta de plantear, es que esto ya existe. El desarrollo guiado por especificaciones no es una frase que yo haya inventado — hay herramientas reales construidas alrededor de la misma idea: Spec Kit de GitHub, Kiro de Amazon, Tessl. Si has usado alguna, mucho de lo que acabo de describir te va a sonar, y es justo.

La diferencia es dónde vive la especificación. Esas son herramientas — adoptas la herramienta, trabajas como la herramienta trabaja, y tu especificación queda moldeada por la superficie de esa herramienta. Deep Work Plan es la otra cosa: vive en el repositorio como archivos planos que cualquier agente puede leer. No hay un runtime que adoptar, ni un proveedor al que apostarle, ni una reimplementación por herramienta cuando cambias de agente. El plan, las tareas y el log son markdown plano sentado en `.dwp/`. Claude Code lo puede correr. Codex lo puede correr. Cursor lo puede correr. El agente del año que viene que nadie ha lanzado todavía lo va a poder correr, porque son solo archivos, y leer archivos es lo único que todo agente ya sabe hacer.

Ese es todo el argumento de repo-native sobre tool-bound, y voy a ser honesto: no lo aprecié hasta que tuve el mismo formato de plan sobreviviendo a un agente que ya había dejado de usar. La metodología sobrevivió a la herramienta. Una especificación dentro de una herramienta es una apuesta a que la herramienta siga existiendo. Una especificación dentro del repositorio es una apuesta a que el *repositorio* siga existiendo — que es una apuesta que ya estoy haciendo, porque es donde está el código.

---

## Probado en carne propia, tres repos de profundidad

Desconfío de las metodologías que solo funcionan en las diapositivas. Así que la prueba honesta es si de verdad corro esto en las cosas que publico, y sí lo hago — este blog entre ellas. Casi todo cambio en este repositorio ahora arranca como un Deep Work Plan: un archivo de plan, tareas atómicas, puertas que tienen que pasar, estado en disco. El post que estás leyendo se escribió bajo uno. Cuando digo que el bucle sobrevive un reinicio de contexto, es porque lo he visto sobrevivir uno en trabajo que me importaba, no porque el diagrama diga que debería.

Y tampoco es solo en mis proyectos personales. La misma metodología corre en producción en DailyBot — de hecho nació de la ingeniería de ahí, donde la versión a mano se reconstruyó suficientes veces en suficientes repos como para que estandarizarla dejara de ser opcional. Un equipo la usa para que el trabajo de agentes de larga duración no se desvíe a una escala en la que yo no opero estando solo, y hay [un relato más largo de cómo un equipo corre esto a lo largo de cientos de páginas](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) si quieres la versión a escala de empresa de la misma historia. La metodología se documenta y se publica desde un repositorio que la usa sobre sí mismo, que es más o menos todo el dogfooding que sé hacer. La prueba y el artefacto son los mismos repos.

Si quieres probarla, todo está abierto y con licencia MIT. La metodología, la especificación legible y el kit viven en [deepworkplan.com](https://deepworkplan.com); hay un endpoint de adopción en un paso en [deepworkplan.com/init](https://deepworkplan.com/init) que apunta un agente a tu repo y lo deja listo; y está empaquetada como una skill instalable en [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — un router y un puñado de sub-skills que mapean directo sobre el bucle: create, execute, refine, resume, status, verify. Entra en el layout `.agents/skills/` igual que cualquier otra skill. Instálala, apunta un agente a tu repo, genera un plan, córrelo.

---

## Qué cambió para mí

El giro, mirando atrás, fue pequeño y total al mismo tiempo. Dejé de tratar de volverme mejor corrigiendo al agente a mitad de corrida, y empecé a escribir — antes de que arranque — qué significa terminado y dónde están las líneas. La corrección no desapareció. Se movió más temprano, hacia el plan, donde es una frase que escribo una vez en lugar de una interrupción que tengo que seguir haciendo.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-humans-steer.webp"
       alt="Ilustración de estilo grabado de un capitán de barco al timón señalando el rumbo mientras la tripulación ejecuta, bajo el título 'Humans steer. Agents execute' (los humanos dirigen, los agentes ejecutan)."
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>Tú decides qué significa terminado y dónde están las líneas; el plan carga tu intención y los agentes hacen las horas. El plan es el contrato entre los dos.</figcaption>
</figure>

Y ahí hay una trampa, que es lo más honesto que puedo decir del método: un plan flojo falla tan en silencio como antes lo hacía la desviación. Una especificación vaga se ejecuta con toda fidelidad — las puertas pasan a verde, el build pasa, y lo que vuelve es exactamente lo que escribí, que es justo el problema cuando lo que escribí no estaba bien pensado. El agente ya no se va por la tangente; ahora soy yo el que apunta mal. Nada del andamiaje arregla eso. Escribir bien el plan — nombrar el problema real en vez del síntoma, trazar las líneas contra las que se mide el trabajo, anticipar dónde va a adivinar el agente para cerrar la brecha antes de que arranque — es la parte que sigue siendo mía, y resultó ser la parte difícil. La metodología no reemplaza ese criterio. Lo vuelve aquello de lo que depende toda la corrida.

La tarde que se me desvió fue la última que se me desvió por esa razón. No porque el modelo se volviera más inteligente — es el mismo modelo. Sino porque el trabajo por fin tuvo un lugar donde pararse que el contexto no podía erosionar por debajo. El harness tenía un objetivo. El plan era el objetivo. Y el repositorio sostenía los dos.

A seguir construyendo.

---

## Recursos

- [Deep Work Plan](https://deepworkplan.com) — la metodología, la especificación legible y el kit
- [deepworkplan.com/init](https://deepworkplan.com/init) — endpoint de adopción en un paso que deja tu repo listo
- [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — Deep Work Plan empaquetado como skill instalable para agentes
- [Cómo un equipo corre trabajo de agentes de larga duración en producción](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) — el relato a escala de empresa de la misma metodología
- [GitHub Spec Kit](https://github.com/github/spec-kit) — desarrollo guiado por especificaciones atado a una herramienta, para contrastar con el enfoque repo-native
