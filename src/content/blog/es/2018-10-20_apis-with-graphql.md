---
title: 'Introducción a APIs con GraphQL'
description: 'Lo que compartí en Pereira Tech Talks sobre GraphQL — lenguaje de consulta, REST vs GraphQL, schema, types, queries, mutations y resolvers.'
pubDate: '2018-10-20'
heroImage: '/images/blog/posts/apis-with-graphql/hero.png'
heroLayout: 'banner'
tags: ['talks', 'tech']
---

Di una charla sobre GraphQL en [Pereira Tech Talks](https://www.pereiratechtalks.com/). GraphQL fue creado por Facebook en 2012, impulsado por el equipo móvil. Es un **lenguaje de consulta** diseñado para la comunicación entre clientes y servidores — una alternativa completa a REST. (Y no, no es como SQL.)

Lo que más me gustó desde el principio: el cliente define qué recibe. No más over-fetching ni múltiples requests por vista. GraphQL es agnóstico de plataforma — está implementado en más de 20 lenguajes.

---

## REST vs GraphQL

| REST | GraphQL |
|------|---------|
| Es una convención | Es un lenguaje tipado |
| El servidor expone recursos | El cliente define qué recibe |
| Suele enviar más datos de los necesarios | Solo se envía lo necesario |
| Múltiples solicitudes por vista | Una solicitud por vista |
| Documentación separada del desarrollo | Documentado por definición |
| Múltiples endpoints (`/puppies`, `/puppies/:id`, etc.) | Un solo endpoint: `/graphql` |

---

## Conceptos Clave

- **Schema** — Define la estructura de tu API
- **Types** — Tipado fuerte para consultas y respuestas
- **Queries** — Operaciones de lectura
- **Mutations** — Operaciones de escritura
- **Resolvers** — Funciones que resuelven cada campo del schema

Si quieres jugar con un ejemplo real, la [API de Star Wars (SWAPI)](http://graphql.org/swapi-graphql/) es excelente para explorar.

---

## Recursos que Compartí

### GraphQL

- [Especificación GraphQL](https://facebook.github.io/graphql/October2016/)
- [GraphQL.js](https://github.com/graphql/graphql-js)
- [GraphQL SWAPI](http://graphql.org/swapi-graphql/)
- [Apollo Launchpad](https://launchpad.graphql.com/)
- [GraphQL Voyager](https://github.com/APIs-guru/graphql-voyager)
- [Graphene (Python)](http://graphene-python.org/)
- [Apollo Client](https://www.apollographql.com/client)
- [Awesome GraphQL](https://github.com/chentsulin/awesome-graphql)

### Charla Recomendada

- [Por qué API REST está muerto y debemos usar APIs GraphQL](https://www.youtube.com/watch?v=cUIhcgtMvGc) — José María Rodríguez Hurtado

---

[Ver slides](https://slides.com/xergioalex/apis-with-graphql)

A seguir construyendo.
