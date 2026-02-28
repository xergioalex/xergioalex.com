---
title: "Arquitectura de Microservicios y APIs con GraphQL"
description: "Microservicios y GraphQL en Pereira Tech Talks — divide y conquista, pros y contras, y por qué GraphQL me convenció como capa de API."
pubDate: "2017-11-23"
heroImage: "/images/blog/posts/microservices-architecture-graphql/hero.png"
heroLayout: "banner"
tags: ["talks", "tech"]
---

Microservicios y GraphQL — un tema que me tiene entusiasmado. He estado construyendo sistemas distribuidos y REST me está quedando corto para lo que necesito en el lado móvil. GraphQL está ganando tracción y quise compartir lo que he aprendido.

Aquí están los conceptos que cubrí. Si prefieres ver los slides directamente, [aquí están](https://slides.com/xergioalex/microservices-architecture-and-apis-with-graphql).

![Audience during the talk](/images/blog/posts/microservices-architecture-graphql/audience.webp)

---

## Divide y Conquista

El principio central detrás de los microservicios es simple: **divide y conquista**. En lugar de construir una aplicación monolítica que hace todo, dividimos el sistema en servicios más pequeños y enfocados. Cada microservicio hace una cosa y la hace bien — una filosofía que heredé de la tradición Unix y que me ha servido mucho para arquitecturas escalables y mantenibles.

![Divide y conquista — el principio estratégico detrás de los microservicios](/images/blog/posts/microservices-architecture-graphql/divide-and-conquer.webp)

---

## ¿Qué es un Microservicio?

Para mí, un microservicio es una unidad de funcionalidad autocontenida que cumple varias características que valoro:

- **Hace una cosa bien** — enfocado en una única capacidad de negocio
- **Es autónomo** — identificado por una URL única, opera de forma independiente
- **Está aislado** — puedo modificarlo, probarlo y desplegarlo sin impactar otras partes de la solución
- **Es elástico** — se escala de forma independiente (vertical u horizontalmente)
- **Es resiliente** — tolerante a fallos y altamente disponible
- **Es responsivo** — responde en un tiempo razonable
- **Está orientado a mensajes** — usa paso de mensajes asíncronos para establecer límites entre componentes
- **Es programable** — expone APIs; las aplicaciones se componen de múltiples microservicios
- **Está automatizado** — su ciclo de vida (dev, build, test, staging, producción) se gestiona con automatización

---

## ¿Son la Bala de Plata? No.

Siempre que hablo de microservicios, alguien pregunta si son la solución para todo. **No.** Son un patrón poderoso, pero conllevan compensaciones. Mostré esta tabla en la charla:

| Pros | Contras |
|------|---------|
| **Escalable** | La latencia de red aumenta con el intercambio de mensajes |
| **Reduce costos de despliegue** | La complejidad de despliegue y pruebas crece con el número de interacciones |
| **Puede desarrollarse por un equipo pequeño** | Microservicios demasiado granulares pueden crear más overhead que utilidad |
| **El equipo solo necesita conocer la lógica del servicio** | Se requieren formatos de mensajes, restricciones y conocimiento de interacciones |
| **Despliegue continuo** | El versionado es crítico por las interacciones con versiones antiguas |
| **Usa la tecnología que prefieras** | Las operaciones transaccionales entre muchos servicios aumentan la complejidad |

---

## GraphQL: Por Qué Me Convenció

GraphQL fue creado por Facebook en 2012, impulsado por el equipo móvil. Es un **lenguaje de consulta** para comunicación entre clientes y servidores — una alternativa completa a REST. (Nota: no es como SQL; es un lenguaje de API tipado, no de base de datos.)

Lo que más me gustó desde el principio: el cliente define qué recibe. No más over-fetching ni múltiples requests por vista.

### REST vs GraphQL

| REST | GraphQL |
|------|---------|
| Es una convención | Es un lenguaje tipado |
| El servidor expone recursos | El cliente define qué recibe |
| Suele enviar más datos de los necesarios | Solo se envía lo necesario |
| Múltiples solicitudes por vista | Una solicitud por vista |
| Documentación separada del desarrollo | Documentado por definición |
| Múltiples endpoints | Un solo endpoint: `/graphql` |

### Conceptos Clave

- **Schema** — Define la estructura de tu API
- **Types** — Tipado fuerte para consultas y respuestas
- **Queries** — Operaciones de lectura
- **Mutations** — Operaciones de escritura
- **Resolvers** — Funciones que resuelven cada campo del schema

Si quieres jugar con un ejemplo real, la [API de Star Wars (SWAPI)](http://graphql.org/swapi-graphql/) es excelente para explorar.

---

## Recursos que Uso

### GraphQL

- [Especificación GraphQL](https://facebook.github.io/graphql/October2016/)
- [GraphQL.js](https://github.com/graphql/graphql-js)
- [GraphQL SWAPI](http://graphql.org/swapi-graphql/)
- [Apollo Launchpad](https://launchpad.graphql.com/)
- [Graphene (Python)](http://graphene-python.org/)
- [Apollo Client](https://www.apollographql.com/client)
- [Awesome GraphQL](https://github.com/chentsulin/awesome-graphql)

### Microservicios y Docker

- [Divide y Conquista – El Enfoque Microservicio](https://www.art2link.com/divide-conquer-microservice-approach/)
- [Docker Load Balancer Demo](https://github.com/xergioalex/docker-load-balancer) — un proyecto mío que usé en la demo
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Charla Recomendada

- [Por qué API REST está muerto y debemos usar APIs GraphQL](https://www.youtube.com/watch?v=cUIhcgtMvGc) — José María Rodríguez Hurtado (en español)

---

[Ver presentación completa](https://slides.com/xergioalex/microservices-architecture-and-apis-with-graphql)

A seguir construyendo.
