---
title: 'Introducción al Internet de las Cosas'
description: 'Charla introductoria sobre IoT — sensores, actuadores, controladores y programar tu primer robot con Arduino y Johnny-five.'
pubDate: '2017-03-28'
heroImage: '/images/blog/posts/internet-of-things/hero.jpg'
heroLayout: 'banner'
tags: ['talks', 'tech']
---

En el segundo meetup de Pereira Tech Talks de 2017 di una charla sobre el Internet de las Cosas (IoT). El evento se realizó en la Universidad Tecnológica de Pereira, junto con la charla de Alejandro Rendon sobre administración de un pequeño cluster con Node.js para computación distribuida. Puedes leer más en el [blog de Pereira Tech Talks](https://www.pereiratechtalks.com/introduccion-al-internet-de-las-cosas-y-clustering-con-nodejs/).

---

## ¿Qué es el Internet de las Cosas?

El **Internet de las Cosas** se refiere a la red de dispositivos físicos — sensores, actuadores y controladores — que se conectan a internet e intercambian datos. A menudo se le llama una segunda revolución industrial porque une el mundo físico y el digital: las máquinas hablan entre sí, con la nube y con nosotros.

![Charla IoT en Pereira Tech Talks](/images/blog/posts/internet-of-things/iot-1.webp)

---

## Los Tres Componentes Esenciales

Los dispositivos inteligentes se construyen con tres elementos clave:

1. **Sensores** — Capturan datos del entorno (temperatura, luz, movimiento, humedad, etc.)
2. **Actuadores** — Realizan acciones en el mundo físico (motores, LEDs, relays, parlantes)
3. **Controladores** — Procesan datos y deciden qué hacer (microcontroladores como Arduino, Raspberry Pi)

Juntos forman ciclos de retroalimentación: sentir → decidir → actuar.

![Componentes IoT y robótica](/images/blog/posts/internet-of-things/iot-2.webp)

---

## Programar Hardware con Node.js: Johnny-five

[Johnny-five](http://johnny-five.io/) es una plataforma de robótica e IoT en JavaScript. Te permite controlar Arduino, Raspberry Pi y otras placas desde Node.js — sin necesidad de escribir C o C++. Escribes JavaScript y Johnny-five maneja la comunicación de bajo nivel.

### Tu Primer Robot

En la charla mostré cómo empezar: conectar un Arduino, instalar Johnny-five, y hacer parpadear un LED o leer un sensor en pocas líneas de código. Desde ahí puedes construir proyectos más complejos — robots, dispositivos para el hogar inteligente, registradores de datos.

---

## Memorias del Evento

![Meetup Pereira Tech Talks — Jonathan Alvarez invitando a JsConf](/images/blog/posts/internet-of-things/iot-3.webp)

![Meetup Pereira Tech Talks](/images/blog/posts/internet-of-things/iot-4.webp)

Jonathan Alvarez también invitó a la comunidad a asistir a [JsConf Colombia](https://jsconf.co/) en Medellín.

---

## Slides y Referencia del Evento

- [Ver slides](https://slides.com/xergioalex/internet-of-things)
- [Post del blog de Pereira Tech Talks](https://www.pereiratechtalks.com/introduccion-al-internet-de-las-cosas-y-clustering-con-nodejs/) — resumen del evento (IoT + clustering con Node.js)
