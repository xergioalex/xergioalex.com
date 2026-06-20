---
title: "Loop Engineering: automatización en la era de la IA"
description: "Todos dicen que deberíamos escribir loops, no prompts. Quítale la novedad y es automatización — con una sola cosa nueva dentro del cuerpo del loop."
pubDate: "2026-06-24"
heroImage: "/images/blog/posts/loop-engineering/hero-es.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "claude"]
keywords: ["loop engineering", "qué es loop engineering", "loops de agentes", "agentes autónomos", "agentes programados", "desarrollo guiado por especificaciones", "automatización con IA", "loops en Claude Code"]
series: "working-with-agents"
seriesOrder: 9
draft: false
---

Deja de hacerles prompts a tus agentes. Diseña los loops que los hacen por ti. Peter Steinberger ([@steipete](https://x.com/steipete/status/2063697162748260627)) lo resumió así, en una sola línea — y la frase se propagó: cientos de miles de vistas y una pelea medio cordial en los comentarios, de esas que solo aparecen cuando algo toca un nervio. El argumento es simple e incómodo a la vez: tu trabajo ya no es escribir el prompt perfecto, sino construir el sistema que lo escribe por ti.

<figure>
  <img src="/images/blog/posts/loop-engineering/figure-steipete-tweet.webp"
       alt="Captura del post de Peter Steinberger del 7 de junio de 2026: 'Here's your monthly reminder that you shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents.'"
       width="960"
       height="437"
       loading="lazy" />
  <figcaption>Peter Steinberger, 7 de junio de 2026 — el giro en una línea: deja de prompear al agente, empieza a diseñar el bucle dentro del que corre («you should be designing loops that prompt your agents»). — <a href="https://x.com/steipete/status/2063697162748260627">Post original</a>.</figcaption>
</figure>

Después aparecieron las pruebas. Boris Cherny, que lidera Claude Code en Anthropic, había dicho algo muy parecido [en una charla](https://workos.com/blog/boris-cherny-claude-code-acquired-interview-takeaways) unos días antes: *"I don't prompt Claude anymore. I have loops that are running. They're the ones that are prompting Claude and figuring out what to do. My job is to write loops."* ("Ya no le hago prompts a Claude. Tengo loops corriendo. Ellos son los que le hacen los prompts a Claude y deciden qué hacer. Mi trabajo es escribir loops."). También [describió su montaje real](https://www.platformer.news/boris-cherny-interview-ai-jobs/) — un loop de Claude Code que movió a una rutina que se dispara más o menos cada media hora, procesando solo el feedback de los usuarios. Dice que hace meses no escribe una línea de código a mano. Addy Osmani le puso nombre a la cosa en [un post](https://addyosmani.com/blog/loop-engineering/) de esa misma semana y le dio una definición limpia: loop engineering es *"replacing yourself as the person who prompts the agent. You design the system that does it instead."* ("Reemplazarte a ti mismo como la persona que le hace prompts al agente. Diseñas el sistema que lo hace en tu lugar.").

<figure>
<div class="youtube-facade relative aspect-video w-full overflow-hidden rounded-xl my-6 bg-black" data-video-id="RkQQ7WEor7w" data-title="Boris Cherny: Claude Code & the Future of Engineering | Acquired Unplugged presented by WorkOS">
  <img src="https://i.ytimg.com/vi/RkQQ7WEor7w/hqdefault.jpg" alt="Boris Cherny: Claude Code & the Future of Engineering — entrevista de Acquired Unplugged presentada por WorkOS" class="absolute inset-0 h-full w-full object-cover" loading="lazy" width="480" height="360" />
  <button type="button" aria-label="Reproducir video: Boris Cherny sobre Claude Code y el futuro de la ingeniería" class="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center border-0 bg-black/10 transition-colors hover:bg-black/30 focus-visible:bg-black/30 focus-visible:outline-none">
    <svg viewBox="0 0 68 48" class="h-12 w-12 drop-shadow-lg md:h-16 md:w-16" aria-hidden="true">
      <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00"/>
      <path d="M45 24L27 14v20z" fill="#fff"/>
    </svg>
  </button>
</div>
<figcaption>Boris Cherny sobre Claude Code y el futuro de la ingeniería — <a href="https://www.youtube.com/watch?v=RkQQ7WEor7w">Acquired Unplugged</a>, presentado por WorkOS.</figcaption>
</figure>

Ese es el momento, entonces. Un eslogan, un ingeniero citable, un nombre, y una semana entera de todo el mundo discutiendo si es el futuro o un reempaque.

Mi reacción honesta, cuando caí en cuenta de qué estaban hablando, fue menos epifanía y más déjà vu: esto es automatización de la de siempre, de la que llevo años montando, solo que ahora el que arranca y dirige el loop es el razonamiento de un agente. Y aun así me tocó, porque es justo el lugar al que apuntaba todo el camino: de [pasar de escribir código a dirigir agentes](/es/blog/from-programmer-to-orchestrator/) a [convertir esa dirección en un oficio propio](/es/blog/the-art-of-directing-agents/) — solo que no le había puesto nombre.

---

## Es automatización. Digámoslo sin rodeos.

Déjame bajarle el aire primero, porque el hype se lo merece.

Un loop no es nuevo. Llevamos escribiendo sistemas que se despiertan, revisan una meta, hacen trabajo y vuelven a revisar desde que existen los servidores. Kubernetes los llama control loops, y la documentación oficial los explica literalmente con un termostato: lee la temperatura, compárala con la meta, actúa, repite. Cada job de CI en un cron, cada autoscaler, cada pieza de infraestructura del tipo "si se desvía, devuélvelo a su sitio" es la misma forma. La teoría de control tenía esto resuelto antes de que la mayoría de nosotros naciéramos.

Así que cuando alguien dice que loop engineering es "solo automatización" — un workflow de toda la vida con un trigger programado —, no se equivoca. Tiene la mitad de la razón, de una forma que vale la pena masticar. El loop es viejo. El scheduler es viejo. Despertarse con un trigger y reconciliar contra un estado deseado — viejo.

Lo que cambió es una sola casilla. En el loop clásico, lo que está en el medio decidiendo qué hacer es bobo y determinista: si temp < meta, prende la calefacción. En un loop de agentes, esa casilla contiene un modelo. [Simon Willison](https://simonwillison.net/) — cocreador de Django y una de las voces más leídas sobre LLMs — tiene una definición compacta: un agente es un LLM usando herramientas en un loop, frase que Anthropic adoptó. Esa es la historia completa en nueve palabras. El cuerpo del loop ahora contiene algo que puede leer un test que falla, formular una hipótesis, editar tres archivos y volver a intentar. Y ese es el punto: lo que cambia entre un termostato y un agente no es el loop. Es lo que está dentro del cuerpo del loop.

<figure>
  <img src="/images/blog/posts/loop-engineering/figure-loop-anatomy-es.webp"
       alt="Diagrama de la anatomía de un loop de agentes: un disparador inicia el ciclo; un agente (un LLM usando herramientas, la casilla que cambió) lee la meta o spec, hace el trabajo y pasa por un nodo de verificación con tipos, linters y tests; si falla, vuelve al agente; si pasa, abre el cambio para revisión. Todo el ciclo está envuelto por condiciones de parada: máximo de iteraciones, detección de sin progreso y techo de tokens y presupuesto."
       width="1600"
       height="900"
       loading="lazy" />
  <figcaption>Anatomía de un loop de agentes: lo único nuevo es el modelo en la casilla del controlador; lo que lo vuelve seguro son la verificación y las condiciones de parada.</figcaption>
</figure>

Esa es la parte a la que vuelvo una y otra vez. La novedad no es el loop. Es que por fin podemos poner criterio donde antes estaba el `if`. Venderlo como algo completamente nuevo es inflarlo; despacharlo como puro reempaque es ignorar la única casilla que de verdad cambió de lugar.

---

## Cada capítulo venía apuntando a este loop

Si has seguido el desarrollo de mi serie [*Trabajando con Agentes*](/es/blog/series/working-with-agents/), el loop no es una idea nueva: es la conclusión hacia la que cada capítulo venía empujando.

El recorrido ha sido capa por capa. La base fue [el arte de dirigir agentes](/es/blog/the-art-of-directing-agents/), donde el desarrollo guiado por especificaciones (Spec Driven Development) dejó de ser un truco para volverse el oficio: escribir la spec en lugar de teclear el código. Sobre esa base, [la capa de skills](/es/blog/the-skill-layer/) — las capacidades que un agente instala para dejar de reinventar el mismo procedimiento. Después [la capa del harness](/es/blog/the-harness-layer/) — el sistema alrededor del modelo que revisa el trabajo y convierte cada error en un arreglo permanente. Después [el deep work plan](/es/blog/deep-work-plan/) — la especificación durable contra la que el harness mantiene el trabajo, para que una tarea larga no se desvíe hacia algo que yo nunca pedí.

Apila eso y mira lo que te queda: un agente que sabe hacer el trabajo, un sistema que lo atrapa cuando se equivoca, y un objetivo escrito del que no se puede escapar en silencio. Solo queda un movimiento. Ponlo a correr en un trigger. Quita la mano del teclado.

Eso es el loop. No es tanto una capa nueva como el momento en que dejas correr las capas que ya tienes sin estar ahí sentado dándole a enter. Skill más harness más plan siempre apuntó a la ejecución desatendida; loop engineering es apenas el verbo para por fin hacerlo.

Voy a admitir que subestimé cuánta de la dificultad vive *antes* del loop. No puedes poner a correr en loop, de forma segura, a un agente que no tiene plan ni manera de revisarse a sí mismo — solo consigues una forma más rápida de hacer un desastre. La razón por la que el loop se siente posible ahora no es un modelo más inteligente. Es que el andamiaje aburrido de abajo por fin existe.

---

## Automatizando la compañía, un poco más cada mes

Esto me resonó de cerca porque llevaba rato bocetando la misma idea, solo que con palabras menos elegantes. La llamaba "hacer que la empresa se maneje sola un poquito más cada mes".

La visión: un producto que mejora mientras duermo. Imagina un agente líder al que has instruido con tu propio criterio — el mismo que usas para decidir qué hacer y en qué orden. Ese agente es quien arranca el loop: revisa el tablero Kanban y crea tareas nuevas a partir del roadmap, de los tickets de soporte, del feedback de usuarios y del equipo, del backlog pendiente, o simplemente porque su criterio define que algo tiene sentido hacer. Una vez creada la tarea, otros agentes se disparan, la completan y la dejan lista para revisión e integración. El backlog del equipo deja de ser una fila de cosas que yo tengo que arrancar personalmente y se vuelve la entrada de un loop.

<figure>
  <img src="/images/blog/posts/loop-engineering/figure-self-running-roadmap-es.webp"
       alt="Diagrama del roadmap que se ejecuta solo: un agente líder, instruido con tu criterio, toma señales del roadmap, los tickets de soporte, el feedback de usuarios y equipo, y el backlog; crea tareas en un tablero Kanban; agentes trabajadores las investigan, planifican y entregan como pull requests listos para revisión e integración; tú revisas y apruebas, y el trabajo fusionado realimenta el siguiente ciclo."
       width="1600"
       height="900"
       loading="lazy" />
  <figcaption>La visión: un agente líder instruido con tu criterio crea las tareas, otros agentes las completan y las dejan listas para revisión. Tú apruebas; el loop se realimenta solo.</figcaption>
</figure>

En mi caso, parte de eso es real hoy y parte no, y prefiero ser honesto con la costura. Las piezas que vienen dentro de los productos — una rutina de Claude Code en un horario, hooks de sistema de archivos como los de Kiro que corren un prompt cuando se guarda un archivo — esas funcionan; la gente las está usando. Yo mismo he montado algunos loops básicos que automatizan proyectos y andan bien. La versión más lejana, donde un roadmap entero se ejecuta solo y la empresa se vuelve más autónoma cada trimestre, en mi caso sigue siendo más una meta que algo que pueda señalar en producción. Pero que yo todavía no haya llegado no quiere decir que nadie lo haya hecho: hay empresas que ya tienen este loop corriendo a plena escala.

La más contundente es Block — la compañía de Jack Dorsey detrás de Square y Cash App — que construyó un sistema interno llamado Builderbot para coordinar agentes sobre toda su base de código. Los ingenieros lo etiquetan en Slack y el sistema investiga, planifica y entrega: levanta el ticket, crea la rama, escribe el código, abre el pull request e itera con el feedback, sin tocar datos de clientes ni información de pagos. Los números que [hicieron públicos](https://block.xyz/inside/block-rolls-out-builderbot-a-new-suite-of-ai-native-tools-that-changes-the-way-we-ship) son el argumento entero: 200.000 operaciones al día, 1.500 pull requests fusionados por semana, el 15% de todos los cambios de código en producción de la compañía. Lo que antes tomaba meses ahora toma días.

<figure>
  <img src="/images/blog/posts/loop-engineering/figure-block-builderbot.webp"
       alt="Captura del anuncio de Block sobre Builderbot: un sistema interno de IA que coordina agentes sobre toda su base de código, con 200.000 operaciones al día, 1.500 pull requests fusionados por semana y el 15% de todos los cambios de código en producción."
       width="532"
       height="687"
       loading="lazy" />
  <figcaption>Block presenta Builderbot — agentes coordinados sobre toda su base de código, ya responsables del 15% de los cambios de código en producción. — <a href="https://x.com/blocks/status/2067284573482815979">Post original</a>.</figcaption>
</figure>

Eso ya no es una visión de fin de semana. Es un loop de agentes en producción, dentro de una empresa pública, moviendo una porción medible del trabajo de ingeniería.

Y no es solo Block, ni solo trabajo de ingeniería: el capital ya está apostando a la versión extrema de esto. Y Combinator presentó a [Thomas](https://www.ycombinator.com/launches/QwO-thomas-the-first-yc-backed-ai-founder), al que describen como *"the first YC-backed AI founder"* ("el primer fundador de IA respaldado por YC") — no un copiloto que contratas, sino una entidad autónoma que arranca empresas para generar ingresos por su cuenta. Y el propio YC lleva un tiempo [pidiendo explícitamente](https://www.ycombinator.com/rfs), en sus *requests for startups*, financiar equipos diminutos — incluso fundadores en solitario — capaces de construir compañías de miles de millones optimizando una sola métrica: ingresos por empleado. [Aaron Epstein](https://www.ycombinator.com/people/aaron-epstein), General Partner de YC y cofundador de Creative Market, lo planteó como la primera compañía de diez personas y cien mil millones de dólares. Que una empresa se gestione sola a punta de agentes dejó de ser una rareza para volverse una tesis de inversión.

Lo que me hace pensar que es alcanzable es precisamente que no es magia. Es automatización. Yo sé construir automatización. Llevo años cableando cron jobs, webhooks y manejadores de eventos. La parte nueva — el modelo en la casilla del controlador — es la parte que los proveedores están volviendo commodity más rápido. El resto es plomería que ya entiendo.

---

## El loop es fácil. Lo que lo vuelve seguro no.

Aquí quiero hacerle contrapeso a mi propio entusiasmo.

Un loop que corre es trivial. `while true`, llamas al agente, duermes, repites. Eso lo escribes en una tarde. La parte difícil es todo lo que evita que el loop haga con toda confianza la cosa equivocada para siempre.

Un loop sin forma de revisarse a sí mismo no es autonomía, es un error más rápido. El agente va a reportar éxito en una tarea que no terminó — la falla de "completitud prematura", donde el loop canta victoria y sigue de largo mientras la meta real queda intacta. Un proveedor que vive del negocio de la verificación lo puso filoso: un loop sin un nodo de verificación es indistinguible de la automatización ordinaria. Ellos lo dijeron como crítica. Yo creo que es lo más útil de toda la conversación, aunque vaya en contra del hype.

Entonces el trabajo de verdad de loop engineering, la parte que no es un eslogan, es lo poco glamoroso:

- **Feedback en el que el loop pueda confiar.** Tipos, linters, tests — señales deterministas que le dicen al agente que está equivocado sin un humano en la silla. Por esto las compuertas de validación del [deep work plan](/es/blog/deep-work-plan/) importan más que el loop mismo.
- **Condiciones de parada.** Máximo de iteraciones. Detección de "sin progreso". Un techo de tokens y de plata, porque un agente en un loop gasta dinero real y uno atascado lo gasta rápido. La primera vez que dejas un loop corriendo de noche sin tope de presupuesto, lo aprendes de la peor manera.
- **Un plan contra el cual mantenerlo.** El loop reconcilia hacia algo. Si ese algo es difuso, el loop optimiza hacia lo difuso.

Nada de eso es emocionante. Todo eso es la diferencia entre "mi producto mejora mientras duermo" y "me desperté con cuarenta commits que toca botar".

---

## Qué te atreves a poner dentro del loop

Creo que la palabra es buena, en realidad. No porque la idea sea nueva — he argumentado lo contrario casi todo el post — sino porque ponerle nombre a una cosa hace que la gente la construya a propósito en vez de por accidente. "Loop engineering" te dice que el loop es el artefacto. Lo diseñas, lo versionas, le pones barandas, igual que diseñarías cualquier otro sistema que corre sin que tú lo estés mirando.

Para mí reencuadra la meta de toda esta serie. Empecé aprendiendo a dirigir agentes una tarea a la vez. El final honesto nunca fue "dirigirlos más rápido". Era "construir el loop que los dirige, y pararse de la silla". Es incómodo decirlo en voz alta — es literalmente automatizar el trabajo que acabo de pasar un año aprendiendo. Pero esa es la dirección, y fingir lo contrario sería la voz de marketing que trato de mantener fuera de estos posts.

El loop es solo automatización. Ya hice las paces con eso. La pregunta interesante nunca fue si es nuevo, sino qué eres lo suficientemente valiente para poner dentro de su cuerpo — y qué tan buenos son tus frenos.

A seguir construyendo.

---

## Recursos

- [Loop Engineering — Addy Osmani](https://addyosmani.com/blog/loop-engineering/) — el post que nombró y definió la práctica.
- [Peter Steinberger (@steipete) en X](https://x.com/steipete/status/2063697162748260627) — el hilo de "diseña los loops que les hacen prompts a tus agentes".
- [Entrevista a Boris Cherny — Platformer](https://www.platformer.news/boris-cherny-interview-ai-jobs/) — la rutina de Claude Code que corre cada ~30 minutos.
- [Loop Engineering — The New Stack](https://thenewstack.io/loop-engineering/) — cómo pasó de patrón informal a práctica con nombre.
- ["LLMs using tools in a loop" — Simon Willison](https://simonwillison.net/2025/Sep/18/agents/) — la definición compacta de agente.
- [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Harness design for long-running agents — Anthropic](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Agent Hooks — Kiro](https://kiro.dev/docs/hooks/) — automatización por eventos que corre un prompt cuando pasa algo en un archivo.
- [Controllers / control loops — documentación de Kubernetes](https://kubernetes.io/docs/concepts/architecture/controller/) — el patrón del termostato que es anterior a todo esto.
- [Loop engineering without verification is just automation — Sonar](https://www.sonarsource.com/blog/loop-engineering-without-verification-is-just-automation/) — el contrapunto escéptico sobre por qué la verificación es la parte que carga el peso.
- [Thomas — Y Combinator](https://www.ycombinator.com/launches/QwO-thomas-the-first-yc-backed-ai-founder) — "el primer fundador de IA respaldado por YC", una entidad autónoma que arranca empresas para generar ingresos.
- [Requests for Startups — Y Combinator](https://www.ycombinator.com/rfs) — la tesis de equipos diminutos y fundadores en solitario que construyen compañías enormes optimizando ingresos por empleado.
- [Builderbot — Block](https://block.xyz/inside/block-rolls-out-builderbot-a-new-suite-of-ai-native-tools-that-changes-the-way-we-ship) — agentes coordinados sobre toda la base de código de Block: 1.500 pull requests por semana, 15% de los cambios en producción.
