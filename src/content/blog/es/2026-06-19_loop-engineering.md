---
title: "Loop Engineering: automatización en la era de la IA"
description: "Todos dicen que deberíamos escribir loops, no prompts. Quítale la novedad y es automatización — con una sola cosa nueva dentro del cuerpo del loop."
pubDate: "2026-06-19"
heroImage: "/images/blog/posts/loop-engineering/hero.webp"
heroLayout: "banner"
tags: ["tech", "ai-agents", "claude"]
keywords: ["loop engineering", "qué es loop engineering", "loops de agentes", "agentes autónomos", "agentes programados", "desarrollo guiado por especificaciones", "automatización con IA", "loops en Claude Code"]
series: "working-with-agents"
seriesOrder: 9
draft: true
---

Durante unos días mi timeline entero decía lo mismo: deja de hacer prompts, empieza a escribir loops. Peter Steinberger ([@steipete](https://x.com/steipete/status/2063697162748260627)) lo puso de la forma más directa — ya no deberías estar haciéndoles prompts a mano a tus agentes de código; deberías estar diseñando los loops que se los hacen por ti. El post hizo números, cientos de miles de vistas, y después los comentarios se volvieron esa pelea medio cordial que solo pasa cuando una frase toca un nervio.

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

Mi reacción honesta: me sentí visto y un poco fastidiado al mismo tiempo. Porque esto es justo lo que llevo un año rondando sin tener una palabra ordenada para nombrarlo. Todo el sentido de [pasar de escribir código a dirigir agentes](/es/blog/from-programmer-to-orchestrator/) siempre apuntaba hacia acá. Simplemente no lo había llamado de ninguna forma.

---

## Es automatización. Digámoslo sin rodeos.

Déjame bajarle el aire primero, porque el hype se lo merece.

Un loop no es nuevo. Llevamos escribiendo sistemas que se despiertan, revisan una meta, hacen trabajo y vuelven a revisar desde que existen los servidores. Kubernetes los llama control loops, y la documentación oficial los explica literalmente con un termostato: lee la temperatura, compárala con la meta, actúa, repite. Cada job de CI en un cron, cada autoscaler, cada pieza de infraestructura del tipo "si se desvía, devuélvelo a su sitio" es la misma forma. La teoría de control tenía esto resuelto antes de que la mayoría de nosotros naciéramos.

Así que cuando alguien dice que loop engineering es "solo automatización", no se equivoca. Tiene la mitad de la razón, de una forma que vale la pena masticar. El loop es viejo. El scheduler es viejo. Despertarse con un trigger y reconciliar contra un estado deseado — viejo.

Lo que cambió es una sola casilla. En el loop clásico, lo que está en el medio decidiendo qué hacer es bobo y determinista: si temp < meta, prende la calefacción. En un loop de agentes, esa casilla contiene un modelo. La definición compacta de Simon Willison — un agente es un LLM usando herramientas en un loop, frase que Anthropic adoptó — es la historia completa en nueve palabras. El cuerpo del loop ahora contiene algo que puede leer un test que falla, formular una hipótesis, editar tres archivos y volver a intentar. Como lo dijo alguien por ahí, lo que cambia entre un termostato y un agente no es el loop. Es lo que está dentro del cuerpo del loop.

Esa es la parte a la que vuelvo una y otra vez. La novedad no es el loop. Es que por fin podemos poner criterio donde antes estaba el `if`. Decir que todo el asunto es completamente nuevo es venderlo de más; decir que no es más que un reempaque deja por fuera la única casilla que de verdad se movió.

---

## Por qué la serie iba justo para acá

Si me has venido leyendo, esto no se va a sentir como un giro.

El recorrido ha sido capa por capa. Primero [la capa de skills](/es/blog/the-skill-layer/) — las capacidades que un agente instala para dejar de reinventar el mismo procedimiento. Después [la capa del harness](/es/blog/the-harness-layer/) — el sistema alrededor del modelo que revisa el trabajo y convierte cada error en un arreglo permanente. Después [el deep work plan](/es/blog/deep-work-plan/) — la especificación durable contra la que el harness mantiene el trabajo, para que una tarea larga no se desvíe hacia algo que yo nunca pedí.

Apila eso y mira lo que te queda: un agente que sabe hacer el trabajo, un sistema que lo atrapa cuando se equivoca, y un objetivo escrito del que no se puede escapar en silencio. Solo queda un movimiento. Ponlo a correr en un trigger. Quita la mano del teclado.

Eso es el loop. No es tanto una capa nueva como el momento en que dejas correr las capas que ya tienes sin estar ahí sentado dándole a enter. Skill más harness más plan siempre apuntó a la ejecución desatendida; loop engineering es apenas el verbo para por fin hacerlo.

Voy a admitir que subestimé cuánta de la dificultad vive *antes* del loop. No puedes poner a correr en loop, de forma segura, a un agente que no tiene plan ni manera de revisarse a sí mismo — solo consigues una forma más rápida de hacer un desastre. La razón por la que el loop se siente posible ahora no es un modelo más inteligente. Es que el andamiaje aburrido de abajo por fin existe.

---

## Lo que yo ya venía construyendo

La razón por la que esto me pegó en lo personal es que yo llevaba rato bocetando la misma idea, con palabras menos elegantes. Lo llamaba "hacer que la empresa se maneje sola un poquito más cada mes".

La visión, y quiero ser claro en que es una visión y no un sistema terminado: un producto que mejora mientras duermo. Un roadmap en un tablero que no se queda ahí como una lista de intenciones — un agente toma el ítem de arriba, lee el plan, hace el trabajo, abre el cambio y me lo deja para que lo mire en la mañana. Una tarea creada en Linear que dispara un agente para intentarla antes de que un humano siquiera la asigne. El backlog del equipo como entrada de un loop en vez de una fila de cosas que yo tengo que arrancar personalmente.

Parte de eso es real hoy y parte no, y prefiero ser honesto con la costura. Las piezas que vienen dentro de los productos — una rutina de Claude Code en un horario, hooks de sistema de archivos como los de Kiro que corren un prompt cuando se guarda un archivo — esas funcionan. La gente las está usando. La versión más lejana, donde un roadmap entero se ejecuta solo y la empresa se vuelve medible y más autónoma cada trimestre, sigue siendo sobre todo algo que creo más que algo que puedo señalar en producción. No he visto un ejemplo creíble, ya funcionando, de un roadmap que se complete solo. Estoy construyendo hacia allá; no estoy diciendo que ya llegué.

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

## Dónde aterricé

Creo que la palabra es buena, en realidad. No porque la idea sea nueva — he argumentado lo contrario casi todo el post — sino porque ponerle nombre a una cosa hace que la gente la construya a propósito en vez de por accidente. "Loop engineering" te dice que el loop es el artefacto. Lo diseñas, lo versionas, le pones barandas, igual que diseñarías cualquier otro sistema que corre sin que tú lo estés mirando.

Para mí reencuadra la meta de toda esta serie. Empecé aprendiendo a dirigir agentes una tarea a la vez. El final honesto nunca fue "dirigirlos más rápido". Era "construir el loop que los dirige, y pararse de la silla". Es incómodo decirlo en voz alta — es literalmente automatizar el trabajo que acabo de pasar un año aprendiendo. Pero esa es la dirección, y fingir lo contrario sería la voz de marketing que trato de mantener fuera de estos posts.

El loop es solo automatización. Ya hice las paces con eso. La pregunta interesante nunca fue si es nuevo. Es qué eres lo suficientemente valiente para poner dentro del cuerpo del loop, y qué tan buenos son tus frenos.

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
