---
title: "Introducción a Serverless con énfasis en IoT"
description: "Explorando arquitecturas serverless — BaaS, FaaS, beneficios, contraprestaciones y cuándo usarlas en proyectos IoT."
pubDate: "2019-03-03"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

En marzo de 2019 di una charla sobre arquitecturas serverless con enfoque en IoT. La idea era desmitificar qué significa realmente "serverless" — claro que siguen existiendo servidores — y mostrar cuándo tiene sentido usarlo, especialmente para IoT y aplicaciones orientadas a eventos.

Serverless viene en dos sabores principales: **Backend as a Service (BaaS)** y **Functions as a Service (FaaS)**. BaaS lleva más de una década — AWS S3 fue uno de los primeros, ofreciendo almacenamiento en la nube en 2006. FaaS surgió en 2014 con AWS Lambda, cambiando cómo diseñamos y ejecutamos aplicaciones.

---

## Backend as a Service (BaaS)

BaaS te da componentes genéricos — almacenamiento, autenticación, búsqueda — conectados a tu app vía APIs. No construyes ni mantienes esa lógica tú mismo. Ejemplos: AWS DynamoDB, Auth0, Algolia, Skygear. El beneficio: los desarrolladores se enfocan en lo que hace única a su app en lugar de reinventar la rueda.

---

## Functions as a Service (FaaS)

FaaS es la siguiente evolución de la computación en la nube. Despliegas funciones que se ejecutan en respuesta a eventos: una petición HTTP, una subida de archivo, un cambio en base de datos. La plataforma maneja escalado, aprovisionamiento y ejecución. AWS Lambda, Google Cloud Functions y Azure Functions son los principales actores.

---

## Beneficios y contraprestaciones

**Beneficios:** Sin administración de servidores, escalado automático, arquitectura orientada a eventos, sin costos iniciales — pagas por ejecución.

**Contraprestaciones:** Vendor lock-in, cold starts, límites de ejecución (ej. AWS Lambda: 3 seg mín, 5 min máx), depurar es más difícil, estimar costos puede ser complicado.

---

## Cuándo usar Serverless

**Úsalo cuando:** Tareas cortas y periódicas; largos periodos de inactividad; procesamiento de datos; apps web/móviles que responden a eventos del usuario; apps stateless; chatbots.

**Evítalo cuando:** No quieres depender de un proveedor; necesitas ejecuciones largas; tienes flujos de trabajo complejos.

---

## Demos y recursos

Mostré demos incluyendo [Bambú Meditación](https://appbambu.com/alexa/) (integración con Alexa), [IoT Light Bulb](https://github.com/xergioalex/serverless-ligth-bulb), [DailyBot](https://dailybot.co/) y un [bot de Twitter](https://twitter.com/xergioalexbot).

Para aprender más: [Foo Bar](https://www.youtube.com/watch?v=YPc5ulMR6VI) en YouTube, o cursos de Udemy sobre Serverless con AWS y Serverless Framework en español.

---

## Slides y referencias

- [Ver slides](https://slides.com/xergioalex/introduction-to-serverless-with-emphasis-on-iot)
