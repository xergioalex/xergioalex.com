---
title: "Introducción a APIs con GraphQL"
description: "GraphQL como lenguaje de consulta para APIs — tipos, queries, mutations, resolvers y cómo se compara con REST."
pubDate: "2018-10-20"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

En octubre de 2018 di una charla sobre GraphQL en Pereira Tech Talks. GraphQL fue creado por Facebook en 2012, impulsado por su equipo móvil. Es un lenguaje de consulta diseñado para la comunicación entre clientes y servidores — una alternativa completa a REST. (Y no, no es como SQL.)

**¿Qué es GraphQL?** Agnóstico de plataforma (implementado en más de 20 lenguajes). Es un lenguaje tipado. El servidor expone un schema; el cliente define exactamente qué recibe. Envías solo lo necesario — sin over-fetching. Una petición por vista. La documentación vive en la definición. Y solo necesitas un endpoint: `/graphql`.

---

## REST vs GraphQL

| REST | GraphQL |
|------|---------|
| El servidor expone recursos | El cliente define qué recibe |
| A menudo envía más de lo necesario | Solo lo necesario |
| Múltiples peticiones por vista (o endpoints custom) | Una petición por vista |
| Documentación separada del desarrollo | Documentado por definición |
| Múltiples endpoints (`/puppies`, `/puppies/:id`, etc.) | Un solo endpoint `/graphql` |

---

## Conceptos centrales

- **Schema** — El contrato entre cliente y servidor
- **Types** — Definen la forma de tus datos
- **Queries** — Leer datos
- **Mutations** — Modificar datos
- **Resolvers** — Funciones que cumplen cada campo

---

## Recursos

- [GraphQL SWAPI](http://graphql.org/swapi-graphql/)
- [GraphQL Voyager](https://github.com/APIs-guru/graphql-voyager)
- [Apollo Launchpad](https://launchpad.graphql.com/)
- [GitHub GraphQL API](https://developer.github.com/v4/)
- [Awesome GraphQL](https://github.com/chentsulin/awesome-graphql)

---

## Slides y referencias

- [Ver slides](https://slides.com/xergioalex/apis-with-graphql)
