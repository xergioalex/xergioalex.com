---
title: "Divide and Conquer: Microservices and Docker"
description: "Strategies for breaking monolithic applications into microservices using Docker — characteristics, trade-offs, and demos."
pubDate: "2018-10-27"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

A week after my microservices + Docker talk, I gave a follow-up focused on the **divide and conquer** strategy: how to break down a monolith into microservices, what to expect, and when it's worth it.

The same principles applied: autonomous, isolated, elastic, resilient, message-oriented services. Each one does one thing well. The lifecycle is automated — dev, build, test, staging, production, distribution.

---

## Pros and Cons

**Pros:** Scalable, lower deployment costs, small teams can own services, continuous deployment, technology freedom.

**Cons:** Network latency, exponential complexity as services grow, versioning challenges, distributed transactions are hard.

---

## Demos and Resources

- [Docker Load Balancer Demo](https://github.com/xergioalex/docker-load-balancer)
- [Cookiecutter Django](https://github.com/pydanny/cookiecutter-django) — for scaffolding Django projects
- [Divide and Conquer — Microservice Approach](https://www.art2link.com/divide-conquer-microservice-approach/)

---

## Slides & Reference

- [View slides](https://slides.com/xergioalex/divide-and-conquer-microservices-architectures)
