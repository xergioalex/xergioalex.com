---
title: "Introducción a Serverless con énfasis en IoT"
description: "Lo que compartí en una charla sobre serverless — BaaS, FaaS, beneficios, desventajas, cuándo usarlo y demos con Bambú, IoT, DailyBot."
pubDate: "2019-03-03"
heroImage: "/images/blog/posts/introduction-to-serverless-iot/hero.jpg"
heroLayout: "banner"
tags: ["talks", "tech"]
---

Di una charla sobre arquitecturas serverless con enfoque en IoT. La idea era desmitificar qué significa **serverless** — *server-less*: sin servidor. Spoiler: aún hay servidores 😄. Y mostrar cuándo tiene sentido usarlo, especialmente para IoT y aplicaciones orientadas a eventos.

![Demos de la charla: Bambú, IoT Light Bulb, DailyBot, Twitter Bot](/images/blog/posts/introduction-to-serverless-iot/demo.jpg)

---

## Backend as a Service vs Functions as a Service

Serverless viene en dos sabores principales:

**BaaS (Backend as a Service)** — Lleva más de 10 años. AWS S3 fue uno de los primeros BaaS, ofreciendo almacenamiento en la nube en 2006. Los servicios son componentes genéricos conectados a nuestras aplicaciones de forma transparente mediante APIs. Permite que los desarrolladores no dediquen tiempo en construir ni mantener lógica de servicios genéricos que ya existen. Ejemplos: AWS DynamoDB, Auth0, Algolia, Skygear.

**FaaS (Functions as a Service)** — Nació en 2014 con AWS Lambda. Es la siguiente evolución de la computación en la nube. Una nueva forma de ejecutar y diseñar aplicaciones. Despliegas funciones que se ejecutan en respuesta a eventos: una petición HTTP, un cambio en base de datos, un archivo modificado, un usuario creado. La plataforma asigna recursos dinámicamente. Principales actores: AWS Lambda, Google Cloud Functions, Azure Functions.

---

## Beneficios de Serverless

- **No hay que administrar servidores**
- **Escala automáticamente**
- **Límites suaves** — pagas por lo que usas
- **Arquitectura orientada a eventos** — HTTP, cambios en DB, archivos, usuarios
- **No hay costos de contratación** — sin gastos iniciales

---

## Desventajas de Serverless

- **Vendor lock-in** — dependencia del proveedor
- **Cold starts** — latencia en la primera ejecución
- **Restricciones del proveedor** — tiempo, tamaño, etc. (ej. AWS Lambda: mín 3 seg, máx 5 min)
- **No hay buenas herramientas para debugging**
- **Es complicado calcular costes**

---

## Cuándo sí usar Serverless

- Tareas cortas y periódicas
- Largos periodos de inactividad
- Procesamiento de datos
- Aplicaciones web, móviles o workers que respondan a eventos disparados por el usuario
- Apps stateless
- Chatbots

---

## Cuándo no usar Serverless

- Cuando no quieres depender de un proveedor
- Cuando vas a tener ejecuciones largas (AWS: mín 3 seg, máx 5 min)
- Cuando tienes ejecuciones complejas

---

## Demo time

Mostré demos en vivo:

- **[Bambú Meditación](https://appbambu.com/alexa/)** — Integración con Alexa y Lambda

![Demo de Bambú Meditación con Alexa y AWS Lambda](/images/blog/posts/introduction-to-serverless-iot/alexa-demo.png)

- **[IoT Light Bulb](https://github.com/xergioalex/serverless-ligth-bulb)** — Control de bombillo con serverless

![Circuito del demo IoT: ESP8266, NRF24L01+, LEDs en breadboard](/images/blog/posts/introduction-to-serverless-iot/iot-circuit.png)

![Bombillo real funcionando — controlado por Lambda](/images/blog/posts/introduction-to-serverless-iot/iot-bulb.jpg)

- **[DailyBot](https://dailybot.co/)** — Asistente de equipos

![Diagrama de la demo DailyBot con serverless](/images/blog/posts/introduction-to-serverless-iot/dailybot-demo.png)

- **[Twitter Bot](https://x.com/XergioAleXBot)** — Bot automatizado con Lambda

![Bot de Twitter funcionando — @XergioAleXBot](/images/blog/posts/introduction-to-serverless-iot/twitter-bot-demo.png)

---

## ¿Por dónde empiezo?

**Lenguajes de programación?** — Node.js, Python, Go, etc. según el proveedor.

**¿Self-hosting?** — Opciones como [OpenFaaS](https://www.openfaas.com/), [Knative](https://knative.dev/) permiten correr FaaS on-premise.

**Referente destacado:** [Foo Bar](https://www.youtube.com/watch?v=YPc5ulMR6VI) en YouTube. Curso en Udemy: *Serverless en Español con AWS y Serverless Framework*.

---

[Ver slides](https://slides.com/xergioalex/introduction-to-serverless-with-emphasis-on-iot)

A seguir construyendo.
