---
title: "Introduction to APIs with GraphQL"
description: "GraphQL as a query language for APIs — types, queries, mutations, resolvers, and how it compares to REST."
pubDate: "2018-10-20"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

In October 2018 I gave a talk on GraphQL at Pereira Tech Talks. GraphQL was created by Facebook in 2012, driven by their mobile team. It's a query language designed for communication between clients and servers — a complete alternative to REST. (And no, it's not like SQL.)

**What is GraphQL?** Platform-agnostic (implemented in 20+ languages). It's a typed language. The server exposes a schema; the client defines exactly what it receives. You send only what's necessary — no over-fetching. One request per view. Documentation lives in the definition. And you only need one endpoint: `/graphql`.

---

## REST vs GraphQL

| REST | GraphQL |
|------|---------|
| Server exposes resources | Client defines what it receives |
| Often sends more than needed | Only what's necessary |
| Multiple requests per view (or custom endpoints) | One request per view |
| Documentation separate from dev | Documented by definition |
| Multiple endpoints (`/puppies`, `/puppies/:id`, etc.) | Single endpoint `/graphql` |

---

## Core Concepts

- **Schema** — The contract between client and server
- **Types** — Define the shape of your data
- **Queries** — Read data
- **Mutations** — Modify data
- **Resolvers** — Functions that fulfill each field

---

## Resources

- [GraphQL SWAPI](http://graphql.org/swapi-graphql/)
- [GraphQL Voyager](https://github.com/APIs-guru/graphql-voyager)
- [Apollo Launchpad](https://launchpad.graphql.com/)
- [GitHub GraphQL API](https://developer.github.com/v4/)
- [Awesome GraphQL](https://github.com/chentsulin/awesome-graphql)

---

## Slides & Reference

- [View slides](https://slides.com/xergioalex/apis-with-graphql)
