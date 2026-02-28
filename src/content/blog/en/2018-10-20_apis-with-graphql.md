---
title: "Introduction to APIs with GraphQL"
description: "What I shared at Pereira Tech Talks on GraphQL — query language, REST vs GraphQL, schema, types, queries, mutations, and resolvers."
pubDate: "2018-10-20"
heroImage: "/images/blog/posts/apis-with-graphql/hero.png"
heroLayout: "banner"
tags: ["talks", "tech"]
---

GraphQL — a **query language** designed for communication between clients and servers, created by Facebook in 2012 and driven by the mobile team. A complete alternative to REST. (And no, it's not like SQL.)

What I liked most from the start: the client defines what it receives. No more over-fetching or multiple requests per view. GraphQL is platform-agnostic — it's implemented in over 20 languages.

---

## REST vs GraphQL

| REST | GraphQL |
|------|---------|
| It's a convention | It's a typed language |
| Server exposes resources | Client defines what it receives |
| Often sends more data than needed | Only necessary data is sent |
| Multiple requests per view | One request per view |
| Documentation separate from development | Documented by definition |
| Multiple endpoints (`/puppies`, `/puppies/:id`, etc.) | Single endpoint: `/graphql` |

---

## Core Concepts

- **Schema** — Defines the structure of your API
- **Types** — Strong typing for queries and responses
- **Queries** — Read operations
- **Mutations** — Write operations
- **Resolvers** — Functions that resolve each field in the schema

If you want to play with a real example, the [Star Wars API (SWAPI)](http://graphql.org/swapi-graphql/) is great to explore.

---

## Resources I Shared

### GraphQL

- [GraphQL Specification](https://facebook.github.io/graphql/October2016/)
- [GraphQL.js](https://github.com/graphql/graphql-js)
- [GraphQL SWAPI](http://graphql.org/swapi-graphql/)
- [Apollo Launchpad](https://launchpad.graphql.com/)
- [GraphQL Voyager](https://github.com/APIs-guru/graphql-voyager)
- [Graphene (Python)](http://graphene-python.org/)
- [Apollo Client](https://www.apollographql.com/client)
- [Awesome GraphQL](https://github.com/chentsulin/awesome-graphql)

### Recommended Talk

- [Por qué API REST está muerto y debemos usar APIs GraphQL](https://www.youtube.com/watch?v=cUIhcgtMvGc) — José María Rodríguez Hurtado

---

[View slides](https://slides.com/xergioalex/apis-with-graphql)

Let's keep building.
