---
title: "Microservices Architecture and Containers with Docker"
description: "Building and deploying microservices using Docker — divide and conquer, pros and cons, and practical demos."
pubDate: "2018-10-20"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

In October 2018 I gave a talk on microservices architecture with Docker at Pereira Tech Talks. The theme was **divide and conquer** — breaking down monolithic applications into smaller, autonomous services that can be developed, tested, and deployed independently.

A microservice does one thing and does it well. It's autonomous (self-contained, identified by a unique URL), isolated (you can modify it without impacting other services), elastic (scalable vertically or horizontally), resilient, responsive, message-oriented, programmable, and automated.

---

## Are Microservices the Silver Bullet?

No. The talk covered the trade-offs:

**Pros:** Scalable, reduces deployment costs, can be developed by a small team, enables continuous deployment, use the technology you prefer.

**Cons:** Network latency from message interchange; deployment and testing complexity grows with the number of services; too fine-grained services can create overhead; versioning across services is critical; transactional operations across boundaries increase logic complexity.

---

## Demos and Resources

- [Docker Load Balancer Demo](https://github.com/xergioalex/docker-load-balancer)
- [Ghost Docker](https://github.com/xergioalex/ghostDocker)
- [Concepts document](https://docs.google.com/document/d/18fhtTFDRO1XfW1bAKAU2lPvaf9vY6YkH1-FajS2EMIY/edit?usp=sharing)

---

## Slides & Reference

- [View slides](https://slides.com/xergioalex/microservices-architecture-and-containers-wit-docker)
- [Divide and Conquer — Microservice Approach](https://www.art2link.com/divide-conquer-microservice-approach/)
