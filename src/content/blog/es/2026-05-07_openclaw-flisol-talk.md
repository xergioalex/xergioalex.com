---
title: "OpenClaw en FLISOL: la langosta que se tomó el código abierto"
description: "Mi charla en FLISOL (UTP Pereira): la historia de OpenClaw y Peter Steinberger, y cómo un bot de WhatsApp hecho en una hora cambió los agentes de IA."
pubDate: "2026-05-07"
heroImage: "/images/blog/posts/openclaw-flisol-talk/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "talks", "ai-agents", "openclaw"]
keywords: ["charla OpenClaw", "FLISOL 2026", "Peter Steinberger", "agente de IA personal", "agente de IA código abierto", "FLISOL UTP Pereira", "historia de OpenClaw"]
relatedSlide: openclaw-your-assistant-your-machine-your-rules
---

El 7 de mayo de 2026 me subí a una tarima en la **Universidad Tecnológica de Pereira** con un micrófono en una mano y un par de antenas rojas de langosta en la cabeza, contando la historia de un proyecto que pasó de ser un bot de WhatsApp hecho en una hora a una de las cosas más importantes que le pasaron al código abierto en todo el año: **OpenClaw**. El evento era **FLISOL** — el Festival Latinoamericano de Software Libre, el encuentro de software libre más grande de América Latina, que se celebra el mismo día en decenas de ciudades — y esta edición vivió en la UTP, organizada por la Facultad de Ingenierías junto con ASE UTP, QA CONF, Ubuntu Colombia y FOREST.

Escogí esta historia para este festival a propósito. OpenClaw no es solo una pieza de software ingeniosa — es una historia de código abierto, y FLISOL es justo la sala donde esa parte importa más.

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/flyer.webp"
     alt="Flyer de la charla OpenClaw en FLISOL: 'Tu asistente. Tu máquina. Tus reglas.' con el diagrama de arquitectura de OpenClaw, Sergio Florez (CTO de DailyBot, @xergioalex) y los logos de FLISOL, UTP, ASE UTP, QA CONF, Ubuntu Colombia y FOREST"
     width="1672"
     height="941"
     loading="lazy" />
<figcaption>El flyer de la charla — el "Tu asistente. Tu máquina. Tus reglas." de OpenClaw aterrizando en la edición de FLISOL en la UTP.</figcaption>
</figure>

## Por qué OpenClaw pertenece a un escenario de software libre

OpenClaw corre en *tu* máquina, bajo *tus* reglas, con el modelo de IA que *tú* elijas — y todo se configura en Markdown plano, sin escribir código. Su lema lo dice en seis palabras: *"Your assistant. Your machine. Your rules."* ("Tu asistente. Tu máquina. Tus reglas.") No es una frase de marketing pegada después; es el diseño. El agente no se alquila a una plataforma ni vive encerrado en los servidores de alguien más. Es tuyo.

Esa es una idea profundamente del software libre, y por eso FLISOL se sentía como el lugar correcto para contarla. El sentido de un festival así es que las herramientas que moldean nuestra vida deberían ser abiertas, inspeccionables y de la gente que las usa. OpenClaw tomó ese principio y lo apuntó a la pieza de software que de repente todo el mundo quiere controlar: el agente de IA personal. Ya había escrito la historia completa en mi post a fondo, [OpenClaw: Tu asistente. Tu máquina. Tus reglas.](/es/blog/openclaw-your-assistant-your-machine-your-rules/), y las diapositivas de esta sesión viven en [el deck compañero](/es/slides/openclaw-your-assistant-your-machine-your-rules/) — así que en tarima pude ir rápido y quedarme en la narrativa.

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-02.webp"
     alt="Sergio presentando la diapositiva 'Construido en abierto': OpenClaw como agente personal de código abierto basado en transparencia, comunidad, colaboración y libertad"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>"Construido en abierto" — los cuatro pilares sobre los que armé la charla: transparencia, comunidad, colaboración, libertad.</figcaption>
</figure>

## La historia que conté

El origen de OpenClaw suena inventado, y esa es la mitad de la gracia de contarlo. En noviembre de 2025 **Peter Steinberger** — el desarrollador austriaco detrás de PSPDFKit, que se había alejado de una empresa exitosa y luego pasó un par de años quemado, sin poder escribir código — se aburrió de no poder hablarle a Claude desde WhatsApp. Así que construyó un puente en cerca de una hora, le preguntó a Claude cómo llamarlo, le sugirió "Clawdbot", lo subió a GitHub y se fue a dormir.

Durante dos meses no pasó casi nada. Entonces llegó finales de enero de 2026 y la curva rompió la física: miles de estrellas en un día, decenas de miles en un fin de semana, y superó el total que React tardó una década en juntar en unos sesenta días. No voy a repetir cada número acá — para eso está el [post a fondo](/es/blog/openclaw-your-assistant-your-machine-your-rules/) — pero en tarima la gráfica de star history hizo el trabajo por mí.

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-03.webp"
     alt="Sergio frente a la pantalla mostrando la gráfica de Star History que compara OpenClaw, React y Linux, con la línea de OpenClaw disparándose casi vertical en 2026"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Esa línea roja casi vertical es OpenClaw — superando a React y a Linux en semanas, no en décadas.</figcaption>
</figure>

Después vino la parte que más disfrutó la sala: el triple rebrand. Una carta de cese y desista de Anthropic (Clawdbot sonaba demasiado a Claude), un cambio de nombre a las 5 a. m. en Discord a **Moltbot**, estafadores de cripto agarrando el handle que quedó libre para inflar un token falso `$CLAWD`, una ola de acoso de la misma gente que estafaron — y, días después, un tercer y definitivo nombre: **OpenClaw**. Tres nombres en menos de una semana, una sola mascota langosta que sobrevivió a todo.

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-04.webp"
     alt="Sergio presentando la diapositiva del rebrand que explica el cambio de handle de @clawdbot a @moltbot y la estafa pump and dump"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Contando el caos del rebrand: Clawdbot → Moltbot → OpenClaw, con una estafa de cripto en el medio.</figcaption>
</figure>

Y luego el punto más grande, el que más quería que un público de software libre se llevara: OpenClaw no solo creció — arrastró a todo el ecosistema hacia adelante. Los agentes tuvieron su propia red social (Moltbook, que Meta compró tres meses después del lanzamiento), su propia infraestructura de pagos, identidad y correo, una capa empresarial de NVIDIA (NemoClaw) y un enjambre de clones comunitarios lo bastante pequeños como para correr en una Raspberry Pi. Después de OpenClaw, todos los asistentes grandes tuvieron que agregar acceso a archivos, ejecución real e integraciones solo para no quedarse atrás. Un proyecto de fin de semana, de código abierto, reseteó el mínimo de lo que significa "un agente".

## Con qué dejé a la sala

Si hay una idea que quería que aterrizara en FLISOL, es que nada de esto salió de una sala de juntas. Salió de un desarrollador rascándose su propia picazón, construyendo en abierto y dejando que una comunidad lo llevara más lejos. Esa es la historia más vieja del software libre — Linux, WordPress, Wikipedia — y OpenClaw es apenas su capítulo más nuevo y más rápido. El argumento completo está en [el deck](/es/slides/openclaw-your-assistant-your-machine-your-rules/) y en el [post a fondo](/es/blog/openclaw-your-assistant-your-machine-your-rules/); la versión corta es la del cierre, prestada del propio Peter: la langosta se soltó, y no va a volver al tanque.

## Recuerdos del evento

Lo mejor de un festival así no son las diapositivas — es una sala llena de gente a la que de verdad le importa que sus herramientas sigan siendo abiertas.

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-01.webp"
     alt="Sergio y un coanfitrión en tarima, ambos con antenas rojas de langosta, sosteniendo el afiche de OpenClaw de FLISOL frente a la gran proyección de OpenClaw"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Antenas de langosta obligatorias. Cerrando la sesión con el afiche de la edición de FLISOL.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-06.webp"
     alt="La diapositiva de portada de OpenClaw proyectada en la pantalla grande con los logos de FLISOL, UTP, ASE UTP, QA CONF, Ubuntu Colombia y FOREST"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>La portada, con toda la franja de organizadores y colaboradores: FLISOL · UTP · ASE UTP · QA CONF · Ubuntu Colombia · FOREST.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-05.webp"
     alt="Toma abierta de Sergio en tarima presentando la diapositiva sobre lo salvajes que se sentían los primeros días de OpenClaw"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Sobre los "primeros días salvajes" — cuando OpenClaw se sentía como manejar algo poderoso, no un juguete con chaleco salvavidas.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-07.webp"
     alt="La diapositiva final de '¡Gracias!' con los datos de contacto de Sergio, con el ponente en tarima"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Gracias por recibirme, FLISOL. A seguir construyendo — en abierto.</figcaption>
</figure>

---

## Recursos

- [FLISOL — Festival Latinoamericano de Software Libre](https://flisol.info/) — el evento del que hizo parte esta charla
- [OpenClaw: Tu asistente. Tu máquina. Tus reglas.](/es/blog/openclaw-your-assistant-your-machine-your-rules/) — la historia completa detrás de la charla
- [El deck de la charla de OpenClaw](/es/slides/openclaw-your-assistant-your-machine-your-rules/) — las diapositivas de esta sesión
- [OpenClaw](https://openclaw.ai/) — el sitio oficial del proyecto
- [OpenClaw en GitHub](https://github.com/openclaw/openclaw) — el repositorio
