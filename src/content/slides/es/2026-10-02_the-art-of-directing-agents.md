---
type: native
title: 'El Arte de dirigir agentes'
description: 'Por qué dos personas con el mismo modelo obtienen resultados distintos: dirigir agentes es diseñar trabajo delegable con specs, skills, harness y Deep Work Plan'
pubDate: 2026-10-02
heroImage: '/images/slides/the-art-of-directing-agents/flyer-es.webp'
draft: false
theme: dark
transition: fade
syntaxHighlight: true
math: false
relatedPost: the-art-of-directing-agents
---

<!-- S01 · portada -->

<!-- .slide: class="aod" data-background-image="/images/slides/the-art-of-directing-agents/flyer-es.webp" data-background-size="cover" data-background-position="center" data-background-color="#0f1124" data-aod-id="S01" -->

<p class="aod-sr">El Arte de dirigir agentes. De escribir código a diseñar sistemas de trabajo para agentes. Sergio Florez, CTO en Dailybot.</p>

Note: Dejo la portada en silencio unos segundos y presento la charla sin leer nada: esto no es una charla de prompts ni de modelos, es sobre cómo dirigimos el trabajo cuando ejecutar se volvió barato. Con la siguiente slide rompo la expectativa de entrada.

---

<!-- S102 · pereira-tech-talks -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S102" -->

<div class="aod-ptt">
<div class="aod-col"><img class="aod-art aod-logo" src="/images/slides/the-art-of-directing-agents/community/pereira-tech-talks.webp" width="478" height="158" alt="Logo de Pereira Tech Talks"><p class="aod-link"><a href="https://pereiratechtalks.org">pereiratechtalks.org</a></p></div>
<img class="aod-qr" src="/images/slides/the-art-of-directing-agents/community/qr-pereira-tech-talks.webp" width="797" height="797" alt="Código QR de WhatsApp de Pereira Tech Talks">
</div>

Note: Antes de entrar en materia, un saludo a la comunidad de Pereira Tech Talks. Dejo el logo, el código QR y la dirección en pantalla para quien quiera sumarse.

---

<!-- P02 · 2026 -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P02" -->

<p class="aod-year">2026</p>
<p class="aod-idea">Un punto de inflexión en nuestra historia.</p>

Note: 2026 es un punto de inflexión en nuestra historia. Hay años en los que todo sigue igual con pequeñas mejoras, y hay años en los que algo se parte en dos. Este es de los segundos.

---

<!-- P05 · el-trabajo-como-lo-conociamos -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P05" -->

<p class="aod-punch">Nuestro trabajo como lo conocíamos <span class="aod-accent">dejó de existir</span>.</p>

Note: Nuestro trabajo, tal como se conocía, dejó de existir. Lo digo despacio. No desapareció la profesión; desapareció la forma de trabajarla que aprendimos y que enseñábamos.

---

<!-- P19 · charlie-y-la-fabrica-de-chocolate -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P19" -->

<p class="aod-kicker">Charlie y la fábrica de chocolate</p>
<div class="aod-panels">
<figure class="aod-panel"><img src="/images/slides/the-art-of-directing-agents/mr-bucket/1-line.webp" width="1000" height="569" alt="Mr. Bucket trabajando en la línea de ensamblaje"><figcaption><b>1 · En la línea</b>Trabaja en la línea de ensamblaje</figcaption></figure>
<figure class="aod-panel fragment"><img src="/images/slides/the-art-of-directing-agents/mr-bucket/2-replaced.webp" width="1000" height="556" alt="Mr. Bucket junto al brazo robótico que lo reemplazó"><figcaption><b>2 · Reemplazado</b>Una máquina ocupa su puesto</figcaption></figure>
<figure class="aod-panel fragment"><img src="/images/slides/the-art-of-directing-agents/mr-bucket/3-adapted.webp" width="1000" height="563" alt="Mr. Bucket conversa junto al brazo robótico con quien lo recontrató"><figcaption><b>3 · Se adaptó</b>Lo contratan de nuevo para supervisar y mantener la máquina</figcaption></figure>
</div>

Note: Me acordé de una escena de Charlie y la fábrica de chocolate. Primero vemos a Mr. Bucket trabajando en la línea de ensamblaje. Luego lo despiden, porque una máquina ocupa su lugar. Y al final se adapta: lo contratan de nuevo para supervisar y mantener la máquina que lo reemplazó. Esa tercera imagen es la que me interesa de esta era.

---

<!-- P06 · una-nueva-era -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P06" -->

<p class="aod-punch aod-punch--xl">Entramos en una <span class="aod-accent">nueva era</span>.</p>

Note: Entramos en una nueva era. Una pausa corta aquí: es el cierre de la idea y la puerta hacia lo que sigue.

---

<!-- P08 · trabajando-con-agentes -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P08" -->

<img class="aod-art aod-art--ml" src="/images/blog/series/working-with-agents/hero-es.webp" width="1536" height="1024" alt="Portada de la serie Trabajando con Agentes">
<p class="aod-punch aod-punch--s">Trabajando con Agentes</p>
<p class="aod-sub">La serie completa:</p>
<p class="aod-link"><a href="https://xergioalex.com/es/blog/series/working-with-agents/">xergioalex.com/es/blog/series/working-with-agents/</a></p>

Note: Todo eso lo pueden leer en mi serie Trabajando con Agentes, donde he contado uno a uno las etapas que fui viviendo y cómo mi trabajo se transformó cada día. Hay ocho capítulos publicados y recorro solo algunos, uno por slide.

---

<!-- P09 · capitulo-1 -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P09" -->

<div class="aod-chapter"><img class="" src="/images/blog/posts/from-programmer-to-orchestrator/hero-es.webp" width="1536" height="1024" alt=""><div><p class="aod-kicker">Capítulo 1 de 8</p><p class="aod-idea">De programador a orquestador: la revolución silenciosa que casi nadie ve</p></div></div>

Note: Empecé por el principio: cuando noté que mi trabajo ya no era escribir cada línea sino dirigir. De programador a orquestador.

---

<!-- S103 · el-mono-y-la-escopeta -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S103" -->

<img class="aod-art aod-art--xl" src="/images/slides/the-art-of-directing-agents/art/mono-escopeta.webp" width="1672" height="941" alt="Un carpintero le entrega una escopeta a un mono; después, el mono dispara y destroza el taller mientras el carpintero se espanta">
<p class="aod-idea aod-idea--s">¿Quién tiene la culpa: el mono o <span class="aod-accent">quien le dio la escopeta</span>?</p>

Note: Una imagen exagerada a propósito, para hablar de responsabilidad. A la izquierda, alguien le entrega una herramienta muy poderosa a quien no sabe usarla; a la derecha, el resultado. La pregunta es quién tiene la culpa: el mono, o quien le dio la escopeta. Con los agentes me hago esa misma pregunta, y más adelante les cuento mi respuesta.

---

<!-- P10 · capitulo-2 -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="P10" -->

<div class="aod-chapter"><img class="" src="/images/blog/posts/the-art-of-directing-agents/hero-es.webp" width="1536" height="1024" alt=""><div><p class="aod-kicker">Capítulo 2 de 8</p><p class="aod-idea">El trabajo oculto de la era IA: el arte de dirigir agentes</p></div></div>

Note: Después puse nombre a lo que estaba pasando: el trabajo oculto de la era IA, el arte de dirigir agentes. Este capítulo es la semilla de toda la charla.

---

<!-- S04 · la-pregunta -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S04" -->

<p class="aod-idea">¿Por qué dos personas con <span class="aod-accent">el mismo modelo</span> y <span class="aod-accent">el mismo objetivo</span> pueden obtener resultados abismalmente diferentes?</p>

Note: Esta es la pregunta de toda la charla: dos personas, el mismo modelo, el mismo objetivo, y resultados abismalmente diferentes. La dejo sola en pantalla. Antes de contestar, vamos a ir quitando variables una por una.

---

<!-- S05 · mismo-modelo -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S05" -->

<p class="aod-punch aod-punch--s">Mismo modelo.</p>
<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/modelo.webp" width="1536" height="1024" alt="Ilustración de un cerebro sobre una base conectado a texto, imagen, código, gráficos y datos">

Note: Empiezo a construir la escena con un solo elemento: el modelo, en el centro. Un clic por idea, sin prisa.

---

<!-- S06 · mismo-agente -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="S06" -->

<p class="aod-punch aod-punch--s">Mismos agentes.</p>
<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/agente.webp" width="1672" height="941" alt="Ilustración de un equipo de agentes colaborando alrededor de un diagrama de flujo">

Note: Mismos agentes: la misma herramienta, la misma configuración, el mismo equipo de agentes con sus tareas. Tampoco aquí hay una diferencia técnica que explique lo que viene.

---

<!-- S07 · mismo-codebase -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="S07" -->

<p class="aod-punch aod-punch--s">Mismo codebase.</p>
<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/codebase.webp" width="1748" height="899" alt="Ilustración de un repositorio de código con carpetas y archivos conectados a un editor">

Note: Mismo codebase: el mismo repositorio, la misma estructura de carpetas y el mismo código de partida para los dos. Ya no queda ninguna variable técnica que explique lo que viene.

---

<!-- S105 · mismo-objetivo -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="S105" -->

<p class="aod-punch aod-punch--s">Mismo objetivo.</p>
<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/objetivo.webp" width="1672" height="941" alt="Ilustración de dos caminos que llegan al mismo blanco">

Note: Y por último, el mismo objetivo. Los dos caminos apuntan al mismo blanco: a nadie le pidieron cosas distintas. Con el modelo, los agentes, el repositorio y el objetivo iguales, lo único que queda por revisar es cómo se dirigió el trabajo.

---

<!-- S08 · resultados-distintos -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="S08" -->

<p class="aod-punch aod-punch--s">Resultados radicalmente distintos.</p>
<div class="aod-split aod-split--mid"><div class="aod-terminal"><div class="aod-terminal__bar"><i></i><i></i><i></i></div><div class="aod-terminal__line dim">$ agent run "refactor billing..."</div><div class="aod-terminal__line ok">✓ 58 files changed</div><div class="aod-terminal__line ok">✓ tests passing (212/212)</div><div class="aod-terminal__line ok">✓ no new dependencies</div></div><div class="aod-terminal aod-terminal--noisy"><div class="aod-terminal__bar"><i></i><i></i><i></i></div><div class="aod-terminal__line dim">$ agent run "refactor billing..."</div><div class="aod-terminal__line bad">✗ 41 files changed</div><div class="aod-terminal__line bad">! new BillingManagerFactory</div><div class="aod-terminal__line bad">! duplicated retry service</div><div class="aod-terminal__line bad">✗ tests passing (187/212)</div></div></div>

Note: El golpe: todo era igual y el resultado no. Este es el código que obtuvo cada uno. A la izquierda, un cambio grande, con cincuenta y ocho archivos tocados, y todo en verde; a la derecha, cuarenta y un archivos y una abstracción que nadie pidió. Fíjense también en el prompt: los dos escribieron «refactor billing» y siguieron con más texto, porque cada uno dio instrucciones un poco distintas, no solo esa frase. No se trata de cuánto cambió, sino de qué tan bien dirigido estaba.

---

<!-- S09 · que-cambio -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S09" -->

<p class="aod-punch aod-cursor">¿Qué cambió?</p>

Note: Pausa larga a propósito. Les doy unos segundos para que cada uno ponga su hipótesis: el modelo, el prompt, la suerte. Casi nadie dice lo que viene en la siguiente slide.

---

<!-- S10 · la-direccion -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S10" -->

<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/director.webp" width="1536" height="1024" alt="Ilustración de una persona dirigiendo a un equipo de agentes alrededor de un diagrama y un objetivo">
<p class="aod-idea">La persona que <span class="aod-accent">dirigía</span> el trabajo.</p>

Note: Esta es la tesis en una frase. Lo que cambió no fue el modelo ni el agente: fue quién dirigía el trabajo y cómo lo hacía. Un punto de origen, muchos agentes, y todo depende de lo que sale de ese punto.

---

<!-- S101 · mismas-herramientas -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S101" -->

<img class="aod-art aod-art--xl" src="/images/slides/the-art-of-directing-agents/art/carpinteros.webp" width="1672" height="941" alt="Dos carpinteros con las mismas herramientas y el mismo trabajo: una mesa burda e inestable a la izquierda, una mesa de ebanista a la derecha">
<p class="aod-idea aod-idea--s">Mismas herramientas. Mismo trabajo. <span class="aod-accent">Obra distinta.</span></p>

Note: Una imagen para que se vea sin hablar de tecnología. Dos personas con las mismas herramientas, la misma madera y el mismo encargo: hacer una mesa. La persona sin experiencia termina con algo burdo; la ebanista, con una obra. Nadie diría que el problema fue el cepillo. Con los agentes pasa lo mismo, y de eso se trata el resto de la charla. Con esta idea volvemos al recorrido por los capítulos.

---

<!-- S106 · dirigir-bien -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S106" -->

<p class="aod-punch aod-punch--s">Dirigir agentes bien <span class="aod-accent">no es fácil</span>.</p>

Note: Con esa imagen sobre la mesa, quiero decir algo que a veces se pasa por alto: dirigir agentes, y hacerlo bien, no es fácil. Desde afuera parece que basta con escribir una instrucción. No es así, y lo que sigue es por qué.

---

<!-- S107 · habilidades-blandas -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S107" -->

<p class="aod-idea">Exige habilidades más cercanas a las blandas que a las técnicas.</p>
<div class="aod-row "><div class="aod-box aod-box--dim">Habilidades técnicas</div><span class="aod-arrow">→</span><div class="aod-box aod-box--hot">Habilidades blandas</div></div>

Note: Lo técnico sigue importando, pero el peso se está moviendo. Lo que más separa un buen resultado de uno malo se parece más a las habilidades blandas que a las técnicas. Lo digo desde mi experiencia dirigiendo agentes todos los días.

---

<!-- S108 · junior-y-senior -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S108" -->

<p class="aod-idea">La diferencia entre un junior y un senior nunca fue solo conocimiento técnico.</p>
<div class="aod-chain"><span class="aod-node ">Junior</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">Senior</span></div>
<p class="aod-sub">Siempre hemos dicho que hay algo más que código.</p>

Note: Siempre lo hemos dicho en la industria: lo que separa a un desarrollador junior de uno senior no es solo cuánto sabe de tecnología. Es algo más. Y ese algo más es justo lo que ahora se vuelve el centro del trabajo.

---

<!-- S109 · lo-que-hace-falta -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S109" -->

<p class="aod-kicker">Lo que hace falta</p>
<div class="aod-grid aod-grid--2 aod-grid--skills"><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 22V3"/><path d="M4 4h13l-2 4 2 4H4"/></svg><span><b>Liderar</b>poner dirección y asumir las decisiones</span></div><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.1-4.6A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/></svg><span><b>Comunicar</b>transmitir una idea con claridad</span></div><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg><span><b>Diseñar</b>darle forma antes de construir</span></div><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg><span><b>Planear</b>descomponer y ordenar el trabajo</span></div></div>
<p class="aod-sub">...y todo lo que se parece a esto.</p>

Note: Estas son las habilidades de las que hablo: liderar, comunicar y transmitir una idea, diseñar, planear, y todo lo que se les parece. Son las que usas para dirigir a un equipo de personas, y ahora las usas para dirigir agentes.

---

<!-- S110 · nueva-era -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S110" -->

<img class="aod-art aod-art--l aod-art--framed" src="/images/slides/the-art-of-directing-agents/art/nueva-era.webp" width="1672" height="941" alt="Ilustración de una persona señalando un diagrama de flujo frente a un equipo de agentes que trabajan hacia un objetivo">
<p class="aod-idea aod-idea--s">Ese es el conjunto de habilidades que hace falta en esta nueva era de la IA.</p>

Note: Ese conjunto de habilidades es lo que hace falta en esta nueva era de la IA. No lo presento como una moda ni como un reemplazo de lo técnico: es lo que se suma encima, y lo que hoy marca la diferencia.

---

<!-- S111 · seguir-ordenes -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S111" -->

<p class="aod-idea aod-idea--s">Si tu trabajo era seguir órdenes, hoy lo hace un agente: más rápido y con la mejor arquitectura posible.</p>
<div class="aod-chain"><span class="aod-node ">orden</span><span class="aod-arrow">→</span><span class="aod-node aod-strike">desarrollador</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">agente</span></div>

Note: Esta es la parte incómoda, y la digo sin ganas de pegarle a nadie. Si te enseñaron a trabajar solo siguiendo órdenes, ese trabajo ya lo hacen los agentes: lo mismo que tú, más rápido y con la mejor arquitectura posible. Es lo que veo en mi día a día, no una ley.

---

<!-- S112 · dirigir -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S112" -->

<p class="aod-punch aod-punch--s">Ya no se trata de escribir código.</p>
<p class="aod-punch aod-punch--s aod-accent">Se trata de dirigir.</p>

Note: Para cerrar este bloque: ya no se trata de escribir código. Se trata de dirigir. A partir de aquí vuelvo al recorrido por los capítulos de la serie, para ver cómo fue cambiando mi forma de trabajar.

---

<!-- S113 · ya-son-agi -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S113" -->

<p class="aod-kicker">Lo primero que hay que interiorizar</p>
<p class="aod-punch aod-punch--s">Estos modelos <span class="aod-accent">ya son AGI</span>.</p>

Note: Antes de hablar de metodología, quiero que interioricemos algo, y lo digo como mi postura: estos modelos ya son AGI. Sé que suena fuerte, así que primero pongamos de acuerdo el concepto.

---

<!-- S114 · que-es-agi -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S114" -->

<p class="aod-kicker">AGI · Inteligencia Artificial General</p>
<p class="aod-idea">Una IA capaz de aprender, razonar y realizar cualquier tarea intelectual o cognitiva al mismo nivel que un ser humano.</p>

Note: Esta es la definición: la inteligencia artificial general es un tipo de IA capaz de aprender, razonar y realizar cualquier tarea intelectual o cognitiva al mismo nivel que un ser humano. Durante años se describió como algo hipotético, algo que llegaría algún día.

---

<!-- S115 · ya-esta-a-ese-nivel -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S115" -->

<p class="aod-idea">Si partimos de ese concepto, la IA ya está a ese nivel <span class="aod-accent">desde hace rato</span>.</p>

Note: Y si partimos de ese concepto, la IA ya está a ese nivel desde hace rato. Es mi lectura de lo que veo trabajando todos los días con agentes, no un dato de laboratorio, y entiendo que haya quien la discuta. Pero acepten la premisa un momento, porque de ella sale todo lo demás.

---

<!-- S116 · tratarlos-como-personas -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S116" -->

<p class="aod-idea">Si dirigir es la nueva habilidad, hay que tratar a los agentes como a personas.</p>
<div class="aod-row "><span class="aod-node ">un equipo de personas</span><span class="aod-arrow">≈</span><span class="aod-node aod-node--hot">un equipo de agentes</span></div>

Note: Entonces, si estamos de acuerdo con el concepto, y dirigir es la nueva habilidad de la era de la IA, la consecuencia es clara: hay que tratar a los agentes como si fueran personas. Con sus límites, pero con ese mismo cuidado al pedirles las cosas.

---

<!-- S117 · saber-delegar -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S117" -->

<p class="aod-punch aod-punch--s">Y saber <span class="aod-accent">delegar</span>.</p>
<p class="aod-sub">Delegar es difícil.</p>

Note: Y tratar a alguien como persona significa saber delegar. Delegar es difícil. Lo sé porque a mí me costó, y me sigue costando algunos días.

---

<!-- S118 · el-ego -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S118" -->

<p class="aod-idea">A muchos desarrolladores les pega en el ego.</p>
<p class="aod-quote">“Si no lo hago yo mismo, no va a quedar bien hecho.”</p>

Note: Delegar le pega mucho al ego de los desarrolladores. Muchas veces creemos que si no lo hacemos nosotros mismos no va a quedar bien hecho. Me incluyo: es una frase que me dije muchas veces antes de dirigir agentes.

---

<!-- S119 · sin-ego -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S119" -->

<p class="aod-idea">Si nos quitamos el ego, aprendemos a delegar.</p>
<div class="aod-chain"><span class="aod-node aod-strike">ego</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">aprender a delegar</span></div>

Note: Pero si nos quitamos ese ego y aprendemos a delegar, cambia todo. Deja de importar quién escribió cada línea y empieza a importar si el resultado hace lo que tenía que hacer.

---

<!-- S120 · comunicar-y-planear -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S120" -->

<p class="aod-idea">Y delegar requiere comunicar bien y planear.</p>
<div class="aod-grid aod-grid--2 aod-grid--skills"><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.1-4.6A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/></svg><span><b>Comunicar bien</b></span></div><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg><span><b>Planear</b></span></div></div>

Note: Ahora, delegar bien requiere dos cosas que ya mencionamos: comunicar bien y planear. Nadie delega con éxito lo que no sabe explicar ni lo que no sabe descomponer.

---

<!-- S121 · una-metodologia -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S121" -->

<p class="aod-kicker">Me di cuenta de que necesitaba una metodología</p>
<p class="aod-idea aod-idea--s">Para comunicar mis ideas y transformarlas en un plan bien estructurado, adaptado a los requerimientos y a la arquitectura del proyecto.</p>
<div class="aod-chain"><span class="aod-node ">idea</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">plan estructurado</span><span class="aod-arrow">→</span><span class="aod-node ">requerimientos + arquitectura</span></div>

Note: Fue entonces cuando me di cuenta de que necesitaba una metodología. Una que me permitiera comunicar mis ideas y transformarlas en un plan bien estructurado, adaptado a los requerimientos y a la arquitectura del proyecto, para poder entregárselo a un agente como se lo entregaría a una persona.

---

<!-- S122 · nacio-deep-work-plan -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S122" -->

<p class="aod-punch aod-punch--xs">De ahí nació <span class="aod-accent">Deep Work Plan</span>.</p>
<img class="aod-art aod-art--xxl aod-art--framed" src="/images/blog/posts/deep-work-plan/figure-humans-steer-es.webp" width="1600" height="957" alt="Infografía de Deep Work Plan: los humanos dirigen y los agentes ejecutan, con un capitán al timón señalando el rumbo">

Note: Y de ahí nació Deep Work Plan. Primero fue una necesidad mía, antes que un método: una forma de comunicar y de planear para poder delegar de verdad. En un momento vuelvo a explicarlo con calma, pero ya saben de dónde viene.

---

<!-- P16 · capitulo-8 -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="P16" -->

<div class="aod-chapter"><img class="" src="/images/blog/posts/deep-work-plan/hero-es.webp" width="1600" height="900" alt=""><div><p class="aod-kicker">Capítulo 7 de 8</p><p class="aod-idea">Deep Work Plan: dale a tu agente un plan y un harness</p></div></div>

Note: Deep Work Plan: un plan y un harness para poder delegar trabajo de horas y volver sabiendo que siguió una dirección verificable.

---

<!-- S123 · dwp-contexto -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S123" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/hero.webp" width="680" height="850" alt="Grabado de un faro en una costa rocosa que guía con su haz a un pequeño barco"><div><p class="aod-kicker">Deep Work Plan</p><p class="aod-idea">Los modelos importan. El contexto importa más.</p><p class="aod-body">Convierte cualquier repositorio en un entorno estructurado, con contexto, límites y un plan duradero, donde cualquier agente ejecuta con precisión y termina trabajo de largo aliento.</p></div></div>

Note: Voy a recorrer Deep Work Plan acto por acto, con las láminas de su sitio, deepworkplan.com. La idea de fondo cabe en una frase: los modelos importan, pero el contexto importa más. Como un faro: no empuja al barco, le da un rumbo estable.

---

<!-- S124 · dwp-problema -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S124" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/problem.webp" width="1040" height="1300" alt="Díptico grabado: un barco a la deriva entre rocas y el mismo barco con rumbo firme hacia un puerto"><div><p class="aod-kicker">El problema y la respuesta</p><p class="aod-idea">Un agente rinde bien en tareas cortas. En las largas, deriva.</p><p class="aod-body">En una migración o un refactor a escala la ventana de contexto se llena y las decisiones previas se desvanecen. La respuesta: un plan duradero, tareas atómicas y compuertas de validación.</p></div></div>

Note: El problema que ya vimos: un agente rinde de maravilla en tareas cortas, pero en misiones largas deriva. El díptico lo muestra: a la izquierda el barco a la deriva entre rocas; a la derecha, el mismo barco con un rumbo trazado. La respuesta es desarrollo guiado por especificación: plan duradero, tareas atómicas y compuertas de validación.

---

<!-- S125 · dwp-economia-contexto -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S125" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/context.webp" width="1600" height="1000" alt="Grabado de un camarote con una balanza que pesa cajas de carga contra un cofre, junto a un libro de cuentas"><div><p class="aod-kicker">La economía del contexto</p><p class="aod-idea">El contexto es el recurso más escaso de tu agente.</p><p class="aod-body">Por eso el harness mantiene sus instrucciones breves y auditables: se cargan de forma progresiva y cada tarea recibe solo el contexto que necesita para su trabajo.</p></div></div>

Note: Cada token cuenta, y la balanza lo dice: el contexto es el recurso más escaso de tu agente. Por eso las instrucciones se cargan de forma progresiva y cada tarea recibe solo lo que necesita. Y los planes escalan: Lite para un arreglo acotado, Full para trabajo de horas.

---

<!-- S126 · dwp-roles -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S126" -->

<div class="aod-act aod-act--flip"><img src="/images/slides/the-art-of-directing-agents/dwp-site/steer.webp" width="1600" height="1000" alt="Grabado de un capitán al timón que señala el rumbo mientras la tripulación trabaja las velas"><div><p class="aod-kicker">Reparto de roles</p><p class="aod-idea">Los humanos dirigen. Los agentes ejecutan.</p><p class="aod-body">Tú decides qué significa «terminado» y dónde están los límites. El plan lleva tu intención; los agentes ponen las horas, sin niñera y sin corregir cada veinte minutos.</p></div></div>
<div class="aod-row "><span class="aod-chip aod-chip--accent">Tú: intención, criterios de aceptación, revisión</span><span class="aod-chip aod-chip--accent">Agentes: ejecución, tarea por tarea</span><span class="aod-chip aod-chip--accent">El plan: el contrato entre ambos</span></div>

Note: Aquí el reparto de roles, con el capitán al timón. Tú decides qué significa terminado y dónde están los límites; los agentes ponen las horas. Sin niñera y sin corregir cada veinte minutos. El plan es el contrato entre los dos.

---

<!-- S127 · dwp-bucle -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S127" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/drift.webp" width="1600" height="1000" alt="Grabado de un velero seguro dentro de una esclusa de muros de piedra, con una estela discontinua que se aleja"><div><p class="aod-kicker">El bucle central</p><p class="aod-idea">Un plan del que los agentes no pueden desviarse.</p><p class="aod-body">Las tareas largas llenan el contexto de cualquier modelo y los detalles se pierden. Un plan escrito es a lo que el agente vuelve, vuelta tras vuelta.</p></div></div>
<div class="aod-chain"><span class="aod-node ">Plan</span><span class="aod-arrow">→</span><span class="aod-node ">Tareas atómicas</span><span class="aod-arrow">→</span><span class="aod-node ">Compuertas de validación</span><span class="aod-arrow">→</span><span class="aod-node ">Cierre</span><span class="aod-arrow">→</span><span class="aod-node ">Estado reanudable</span></div>

Note: El bucle central, con el velero a salvo dentro de la esclusa: plan, tareas atómicas, compuertas de validación, cierre y estado reanudable. Las tareas largas llenan el contexto de cualquier modelo; el plan escrito es lo que el agente consulta una y otra vez, y por eso no deriva en silencio.

---

<!-- S128 · dwp-contrato -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S128" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/contract.webp" width="1600" height="1000" alt="Grabado de una mano que estampa un sello de lacre sobre un contrato con casillas en blanco"><div><p class="aod-kicker">Criterios de aceptación</p><p class="aod-idea">Terminado es un contrato, no una corazonada.</p><p class="aod-body">Cada tarea nombra sus criterios de aceptación y las verificaciones que deben pasar. El agente no decide que terminó: pasa, o la tarea sigue abierta.</p></div></div>
<div class="aod-row "><span class="aod-chip aod-chip--accent">Pasan los tests</span><span class="aod-chip aod-chip--accent">Tipos correctos</span><span class="aod-chip aod-chip--accent">Criterios cumplidos</span><span class="aod-chip aod-chip--accent">O la tarea sigue abierta</span></div>

Note: Terminado es un contrato, no una corazonada. Cada tarea declara sus criterios de aceptación y las verificaciones que deben pasar, y el sello solo se estampa cuando pasan. Si no, la tarea sigue abierta, sin importar qué tan segura suene la respuesta del agente.

---

<!-- S129 · dwp-repo-harness -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S129" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/harness.webp" width="1600" height="1000" alt="Grabado de un baúl de archivo con cinco etiquetas en blanco atadas con cordel"><div><p class="aod-kicker">La arquitectura</p><p class="aod-idea">El repositorio es el harness.</p><p class="aod-body">Contexto, herramientas, límites y estado viven en tu repositorio como archivos planos que cualquier agente puede leer. Sin dependencia de un proveedor, sin cerebro externo: sobrevive a los reinicios de contexto.</p></div></div>
<div class="aod-row "><span class="aod-chip aod-chip--accent">SPEC</span><span class="aod-chip aod-chip--accent">TASKS</span><span class="aod-chip aod-chip--accent">CHECKS</span><span class="aod-chip aod-chip--accent">STATE</span><span class="aod-chip aod-chip--accent">TOOLS</span></div>

Note: El baúl con cinco etiquetas: spec, tareas, verificaciones, estado y herramientas. Todo vive en el repositorio como archivos planos que cualquier agente puede leer. No hay un cerebro externo del que depender, así que el trabajo sobrevive cuando se reinicia el contexto.

---

<!-- S130 · desbloqueo -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S130" -->

<p class="aod-kicker">Con esta metodología instalada</p>
<p class="aod-idea">Pude desbloquear la capacidad de delegarle <span class="aod-accent">trabajo autónomo</span> a un agente <span class="aod-accent">por horas</span>, con la confianza de que al volver a supervisar va a estar bien hecho.</p>
<div class="aod-chain"><span class="aod-node ">delegar</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">horas de trabajo autónomo</span><span class="aod-arrow">→</span><span class="aod-node aod-node--ok">supervisar con confianza</span></div>

Note: Esto es lo que me dio Deep Work Plan: con esta metodología instalada pude desbloquear la capacidad de delegarle trabajo autónomo a un agente por horas. Y lo más importante, la confianza de que al volver a supervisar va a estar bien hecho. Esa confianza es lo que cambia mi forma de trabajar.

---

<!-- S131 · cuello-de-botella -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S131" -->

<p class="aod-kicker">Y entonces pasó algo</p>
<p class="aod-idea">Mis agentes estaban haciendo el trabajo súper bien.</p>

Note: Después me fui dando cuenta de algo. Esto estaba funcionando tan bien y mis agentes estaban haciendo el trabajo tan bien que algo tenía que cambiar. Miren lo que pasó a continuación.

---

<!-- S136 · cuello-de-botella -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S136" -->

<p class="aod-punch aod-punch--xs">Yo me convertí en el <span class="aod-accent">cuello de botella</span>.</p>
<img class="aod-art aod-art--xxl" src="/images/slides/the-art-of-directing-agents/art/cuello-de-botella.webp" width="1536" height="1024" alt="Ilustración de una persona desbordada en el centro, recibiendo tareas de seis agentes que trabajan a toda velocidad">

Note: Y ahí la pieza lenta del sistema empezó a ser yo. Los agentes avanzaban rápido, pero todo tenía que pasar por mí: me convertí en el cuello de botella de mis propios agentes.

---

<!-- S137 · arquitectura-contenedores -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S137" -->

<p class="aod-kicker aod-kicker--tight">Cómo funciona nuestra arquitectura de contenedores</p>
<img class="aod-art aod-art--xxl" src="/images/slides/the-art-of-directing-agents/art/repos-docker.webp" width="1672" height="941" alt="Cinco repositorios (backend, web, microservicios del bot, dailybot.com y otros), cada uno en su contenedor Docker con un agente de IA aislado">
<p class="aod-sr">backend, web, microservicios del bot, sitio de dailybot.com y otros. Un agente aislado por contenedor.</p>

Note: Así funciona nuestra arquitectura. Cada repositorio, el backend, la web, los microservicios del bot, dailybot.com y los demás, corre en su propio contenedor de Docker, y dentro de cada uno trabaja un agente aislado. Cada agente ve solo su entorno, y eso es lo que nos ha funcionado tan bien.

---

<!-- S132 · puente-entre-agentes -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S132" -->

<p class="aod-punch aod-punch--xs">Yo era el <span class="aod-accent">puente</span> entre los agentes de distintos contenedores.</p>
<img class="aod-art aod-art--xxl" src="/images/slides/the-art-of-directing-agents/art/puente-agentes.webp" width="1672" height="941" alt="Una persona en el centro pasando mensajes entre un agente en el contenedor Web y otro en el contenedor API">

Note: Y ese era el problema: cada agente vivía aislado en su contenedor, así que no podían hablar entre ellos. El único canal de comunicación era yo. Pasaba los mensajes de un lado al otro, como puente entre el agente de la web y el de la API.

---

<!-- S138 · conoci-herdr -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S138" -->

<p class="aod-punch aod-punch--s">Tuve ese problema hasta que conocí <span class="aod-accent">Herdr</span>.</p>
<img class="aod-art aod-logo-herdr" src="/images/slides/the-art-of-directing-agents/community/herdr-logo.webp" width="1776" height="433" alt="Logo de Herdr">

Note: Viví un buen tiempo con ese ping-pong, hasta que conocí Herdr. Ahora les explico qué es y cómo lo uso, porque fue lo que me sacó del medio.

---

<!-- S139 · que-es-herdr -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S139" -->

<p class="aod-kicker">¿Qué es Herdr?</p>
<p class="aod-idea aod-idea--xs">Un espacio de trabajo de terminal donde cada agente vive en su propio panel.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/herdr-hub.webp" width="1672" height="941" alt="Panel de Herdr como centro de orquestación: cinco máquinas con contenedores Docker y agentes de IA que se envían mensajes entre sí">

Note: Herdr es un espacio de trabajo en la terminal. La idea es sencilla: cada agente vive en su propio panel, y puedo ver y manejar varios a la vez. Hasta aquí parece un administrador de terminales más; lo interesante viene en el siguiente slide.

---

<!-- S149 · control-desde-el-celular -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S149" -->

<p class="aod-idea aod-idea--s">Y puedo controlarlo <span class="aod-accent">desde el celular</span>.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/herdr-celular.webp" width="1672" height="941" alt="Un celular en la mano muestra el panel de Herdr con las cinco máquinas, sus contenedores y agentes, rodeado de las máquinas Web, Backend, Bot Services, Dailybot.com y otras">

Note: Y esto es lo que más me gusta: como todo está conectado, puedo ver y controlar mis máquinas, contenedores y agentes de forma remota, incluso desde el celular. Reviso qué está pasando, veo la actividad reciente y sigo supervisando sin estar frente al computador.

---

<!-- S140 · direccion-del-agente -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S140" -->

<p class="aod-idea aod-idea--s">Cada agente tiene una dirección: <span class="aod-accent">máquina + panel</span>.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/agent-address.webp" width="1774" height="887" alt="Tres contenedores con un agente cada uno; debajo de cada uno su dirección: máquina y panel (máquina A panel w1:p1, máquina A panel w2:p1, máquina B panel w1:p1)">
<p class="aod-sub">Y las máquinas pueden ser contenedores.</p>

Note: Lo que lo cambia todo: cada agente tiene una dirección, compuesta por la máquina y el panel donde vive. Y esas máquinas pueden ser mis contenedores, que ya tienen un servicio de acceso por SSH. Los nombres que ven son ilustrativos.

---

<!-- S141 · escribirse-directo -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S141" -->

<p class="aod-idea">Un agente puede escribirle <span class="aod-accent">directamente</span> a otro.</p>
<div class="aod-terminal"><div class="aod-terminal__bar"><i></i><i></i><i></i></div><div class="aod-terminal__line dim">$ herdr --machine &lt;máquina&gt; agent prompt &lt;panel&gt; "..."</div><div class="aod-terminal__line hot">→ el agente del otro contenedor recibe el prompt</div></div>

Note: Con un comando, un agente le manda un prompt a otro agente, sin importar en qué contenedor esté. Es el mismo prompt que yo copiaba y pegaba a mano, pero ahora viaja solo, de agente a agente.

---

<!-- S142 · permiso-de-respuesta -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S142" -->

<p class="aod-idea">Cada mensaje lleva el permiso y la dirección para <span class="aod-accent">responder</span>.</p>
<div class="aod-chain"><span class="aod-node ">agente web</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">pregunta + cómo responder</span><span class="aod-arrow">→</span><span class="aod-node ">agente API</span></div>
<p class="aod-sub">El otro agente contesta solo, sin pedirme permiso.</p>

Note: Cada mensaje trae incluida la autorización y la dirección exacta para responder. Así el otro agente contesta él mismo, sin detenerse a preguntarme y sin quedarse esperando a que yo haga de mensajero.

---

<!-- S144 · contenedores-no-islas -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S144" -->

<p class="aod-idea aod-idea--s">Los contenedores dejaron de ser islas.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/islas-conectadas.webp" width="1774" height="887" alt="Dos islas flotantes, el contenedor Web y el contenedor API, con un agente en cada una intercambiando mensajes en ambas direcciones">
<p class="aod-sub">Yo ya no soy el puente: superviso la conversación.</p>

Note: Con esto los contenedores dejaron de ser islas. El agente de la web y el de la API se hablan directamente, y yo dejé de ser el puente. Me quedo supervisando la conversación, que es el trabajo que sí me corresponde.

---

<!-- S146 · superviso -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S146" -->

<p class="aod-idea aod-idea--s">Los agentes se hablan entre sí. <span class="aod-accent">Yo superviso.</span></p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/supervisando.webp" width="1774" height="887" alt="Una persona sonriente observa desde el centro mientras el agente web y el agente API intercambian mensajes entre sus contenedores">

Note: Y así me veo ahora: observando, tranquilo, mientras los dos agentes se pasan los mensajes entre sus contenedores. Antes yo cargaba cada mensaje de un lado a otro; hoy superviso la conversación y entro solo cuando de verdad hace falta una decisión mía.

---

<!-- S145 · n-agentes -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S145" -->

<p class="aod-punch aod-punch--s">Desbloqueé que <span class="aod-accent">N agentes</span> se hablen entre sí.</p>
<p class="aod-sub">Del mensajero al director.</p>

Note: Esto es lo que desbloqueó Herdr: que no sean dos agentes, sino N agentes, hablándose entre sí sin que todo pase por mí. Dejé de ser el mensajero y volví a ser quien dirige.

---

<!-- S147 · agente-lider -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S147" -->

<p class="aod-idea aod-idea--s">Ahora oriento a un <span class="aod-accent">agente líder</span> y él orquesta al resto.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/agente-lider.webp" width="1672" height="941" alt="Una persona observa tranquila mientras un agente líder, sobre Herdr, coordina a los agentes de los contenedores Web, API, Bot Services, Dailybot.com y otros">

Note: Y este es el siguiente paso. Ya no hablo con cada agente: oriento a un agente líder, y él orquesta al resto, a través de Herdr, entre todos los contenedores. Yo me quedo en lo mío: la intención, la arquitectura y la revisión.

---

<!-- S148 · gracias -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S148" -->

<img class="aod-photo aod-photo--red aod-photo--m" src="/images/authors/sergio-florez.webp" width="162" height="165" alt="Sergio Alexander Flórez">
<h2 class="aod-thanks-title">¡Gracias!</h2>
<p class="aod-thanks-name">Sergio Alexander Flórez Galeano</p>
<div class="aod-thanks">
<p>🌐 <a href="https://xergioalex.com" target="_blank">xergioalex.com</a></p>
<p>🐦 <a href="https://twitter.com/xergioalex" target="_blank">@xergioalex</a></p>
<p>💻 <a href="https://github.com/xergioalex" target="_blank">github.com/xergioalex</a></p>
<p>💼 <a href="https://linkedin.com/in/xergioalex" target="_blank">linkedin.com/in/xergioalex</a></p>
</div>

Note: Cierro agradeciendo y dejando los canales de contacto. Si algo de lo que conté les sirve, me encantaría saber cómo les va al probarlo.
