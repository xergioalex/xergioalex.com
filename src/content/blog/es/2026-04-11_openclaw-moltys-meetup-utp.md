---
title: "El meetup Moltys: una mañana de OpenClaw en la UTP"
description: "El meetup Moltys en la UTP de Pereira — un taller de la comunidad OpenClaw con Cursor donde recorro su historia, casos de uso y la arquitectura detrás."
pubDate: "2026-04-11"
heroImage: "/images/blog/posts/openclaw-moltys-meetup-utp/hero-es.webp"
heroLayout: "side-by-side"
tags: ["talks", "tech", "ai-agents", "openclaw"]
keywords: ["meetup OpenClaw", "comunidad Moltys", "taller OpenClaw UTP Pereira", "evento Cursor OpenClaw", "casos de uso arquitectura OpenClaw", "comunidad OpenClaw Colombia"]
---

La forma más fácil de reconocer un **meetup Moltys** es el salón lleno de gente que lleva pequeñas tenazas rojas de langosta en la cabeza. Es un encuentro de la comunidad OpenClaw, y este es en la Universidad Tecnológica de Pereira, con el apoyo de [Cursor](https://cursor.com), conmigo como uno de los que está liderando el taller. Si conoces OpenClaw, las diademas de langosta tienen todo el sentido; si no, eso es lo primero que vale la pena explicar.

Un meetup Moltys no es una charla de conferencia donde una persona presenta y el resto escucha. La idea es justo la contraria: abrir el espacio y dejar que la comunidad muestre lo que de verdad está construyendo con OpenClaw. La gente llega a compartir sus propias configuraciones, sus experimentos, las cosas raras y útiles que han conectado — y la mañana se vuelve un ida y vuelta en lugar de una conferencia. Ese formato es la parte que más me gusta. Aprendes mucho más de los proyectos reales de diez personas que de un buen deck de diapositivas.

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-03.webp"
     alt="Una mano sosteniendo una diadema con tenazas rojas de langosta, la mascota Moltys, con el público sentado y desenfocado detrás"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>La langosta es la mascota de OpenClaw — así que el salón llega con tenazas. El uniforme no oficial de un meetup Moltys.</figcaption>
</figure>

## Mi parte: historia, casos de uso, arquitectura

Mi trabajo es poner la mesa — compartir mi propia experiencia con OpenClaw para que el resto de la mañana tenga un punto de partida común. Lo dejo en tres cosas: de dónde viene, para qué lo usa la gente de verdad, y cómo está armado por dentro.

La historia es una buena historia, y no la voy a contar entera aquí — es justo lo que me empuja a escribir un texto aparte, mucho más largo, sobre OpenClaw. La versión corta es el arco: un agente de IA personal que corre en tu propia máquina, configurado en Markdown plano, que te habla por las apps de mensajería que ya usas y se conecta al modelo que tú elijas. De ahí creció hasta convertirse en uno de los proyectos open source que más rápido se ha movido.

Para la arquitectura me voy al tablero, porque es más fácil dibujarla que describirla. Un agente arriba, OpenClaw en el medio, un gateway que se abre hacia Telegram, WhatsApp y Slack, y un conjunto de herramientas colgando del lado — APIs, skills, herramientas MCP, shells. Ese solo dibujo explica la mayor parte de lo que hace que esto funcione.

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-01.webp"
     alt="Dos presentadores en un tablero con un diagrama de arquitectura de OpenClaw dibujado a mano: un agente conectado a OpenClaw, un gateway que se abre hacia Telegram, WhatsApp y Slack, y una caja de herramientas con APIs, skills, herramientas MCP y shells"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>La arquitectura en un tablero: agente → OpenClaw → gateway → Telegram/WhatsApp/Slack, con las herramientas (APIs, skills, MCP, shells) al lado.</figcaption>
</figure>

Si quieres la versión completa — la persona detrás de OpenClaw, las decisiones técnicas, el caos de la comunidad y hacia dónde va la computación personal — ese es el texto donde entro a fondo: [OpenClaw: Tu asistente. Tu máquina. Tus reglas.](/es/blog/openclaw-your-assistant-your-machine-your-rules/). Prepararme para una mañana como esta es justo lo que me dan ganas de sentarme a escribirlo bien.

## Lo mejor es el salón

Las diapositivas y el tablero son la excusa; la gente es el punto. Lo que hace buena la mañana es compartir unas horas con una comunidad que de verdad tiene curiosidad por esto — comparando configuraciones, haciendo el tipo de preguntas que solo salen de quien ya intentó algo y se topó con una pared, e intercambiando los trucos pequeños que nunca llegan a la documentación.

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-02.webp"
     alt="Un presentador con camiseta verde explicando mientras otra persona escribe en el diagrama de OpenClaw, con un asistente con diadema de langosta en primer plano"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Taller, no conferencia — el espacio va pasando de uno a otro según quién tenga algo para mostrar.</figcaption>
</figure>

Gracias a la UTP por recibirnos, a Cursor por apoyar el evento, y a todos los que llegan con sus proyectos y sus tenazas puestas. Mañanas como esta son la razón por la que las comunidades locales importan — sales con más de lo que entraste.

## Memorias del evento

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-04.webp"
     alt="El público sentado en el salón de la UTP siguiendo el taller, con la mesa de los presentadores a la derecha"
     width="1200"
     height="900"
     loading="lazy" />
<figcaption>Un salón lleno en la UTP, atento.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-05.webp"
     alt="Asistentes sentados, varios con diademas de tenazas de langosta, con la ciudad a través de las ventanas"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Con las tenazas puestas y toda la atención arriba — la comunidad en su hábitat natural.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-06.webp"
     alt="Detrás de cámaras del montaje audiovisual: dos portátiles y una cámara en trípode, con la diadema de langosta sobre la mesa"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Detrás de cámaras — el equipo que mantiene viva la transmisión y la grabación.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-07.webp"
     alt="Foto grupal de los asistentes y presentadores del meetup Moltys en el salón de la UTP"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>El combo Moltys. Gracias por venir — repetimos.</figcaption>
</figure>

Sigamos construyendo.

---

## Recursos

- [OpenClaw](https://openclaw.ai) — el agente de IA personal del que se trata toda la mañana ([documentación](https://docs.openclaw.ai))
- [OpenClaw: Tu asistente. Tu máquina. Tus reglas.](/es/blog/openclaw-your-assistant-your-machine-your-rules/) — la historia a fondo detrás de la charla
- [Cursor](https://cursor.com) — el editor de código con IA que apoya el evento
- [Universidad Tecnológica de Pereira](https://www.utp.edu.co) — nuestros anfitriones de la mañana
