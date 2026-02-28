---
title: 'Serverless, IoT e Interfaces Conversacionales'
description: 'Lo que compartí en Manizales Tech Talks — la voz como nueva interfaz, Voice First, serverless, IoT y demos con Bambú, DailyBot, Twitter Bot.'
pubDate: '2019-08-23'
heroImage: '/images/blog/posts/serverless-iot-voice-interfaces/hero.png'
heroLayout: 'side-by-side'
tags: ['talks', 'tech']
---

Serverless, IoT e interfaces conversacionales — similar a una charla anterior, pero con otro enfoque: **la voz como nueva interfaz**. Serverless es un modelo de computación en la nube donde solo pagas por el tiempo de cómputo consumido — y tiene un gran campo de acción en IoT y en el desarrollo de interfaces de voz.

---

## La voz es la nueva interfaz

Según Gartner, para 2020 el 30% de las sesiones de navegación web se harían sin pantalla. **Voice First Browsing**. Las interfaces conversacionales — Alexa, Google Assistant, Siri — cambian cómo interactuamos con las aplicaciones.

Un ejemplo: [Bambú Meditación](https://appbambu.com/alexa/) con Alexa. La interfaz de usuario de voz combina **frontend** (la experiencia de hablar con el asistente) y **backend** (la lógica que procesa la petición). En el flujo:

- **Wake word** — "Alexa"
- **Invocation name** — "Abre bambú" o "Launch bambú"
- **Utterances** — Lo que el usuario dice en contexto
- **Slots** — Datos variables, ej. "una meditación para descansar"
- **Intent** — La acción que la app debe ejecutar

![Flujo de una interfaz de voz: wake word, invocation, utterances, slots, intent](/images/blog/posts/serverless-iot-voice-interfaces/voice-interface.png)

---

## Serverless: BaaS y FaaS

**BaaS (Backend as a Service)** — Más de 10 años. AWS S3 (2006) fue uno de los primeros. Componentes genéricos conectados vía APIs. Ejemplos: DynamoDB, Auth0, Algolia, Skygear.

**FaaS (Functions as a Service)** — Nació en 2014 con AWS Lambda. Funciones que se ejecutan ante eventos (HTTP, cambios en DB, archivos). AWS Lambda, Google Cloud Functions, Azure Functions.

**Beneficios:** Sin administración de servidores, escalado automático, arquitectura orientada a eventos, sin costos iniciales.

**Desventajas:** Vendor lock-in, cold starts, restricciones (AWS: mín 3 seg, máx 5 min), debugging más difícil, costes difíciles de estimar.

---

## Cuándo usar y cuándo no

**Usar cuando:** Tareas cortas y periódicas, largos periodos de inactividad, procesamiento de datos, apps web/móviles que respondan a eventos, stateless, chatbots.

**Evitar cuando:** No quieres depender de un proveedor, ejecuciones largas, flujos complejos.

---

## Demo time

- **[Bambú Meditación](https://appbambu.com/alexa/)** — Alexa + Lambda
- **[IoT Light Bulb](https://github.com/xergioalex/serverless-ligth-bulb)** — Bombillo con serverless
- **[DailyBot](https://dailybot.co/)** — Asistente de equipos
- **[Twitter Bot](https://x.com/XergioAleXBot)** — Bot con Lambda

---

## ¿Por dónde empiezo?

**Lenguajes:** Node.js, Python, Go según el proveedor.

**Self-hosting:** [OpenFaaS](https://www.openfaas.com/), [Knative](https://knative.dev/).

**Referentes:** [Foo Bar](https://www.youtube.com/watch?v=YPc5ulMR6VI) en YouTube. Curso Udemy: *Serverless en Español con AWS y Serverless Framework*.

---

[Ver slides](https://slides.com/xergioalex/serverless-iot-and-voice-interfaces)

A seguir construyendo.
