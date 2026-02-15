---
title: "Docker Introduction"
description: "Introduction to Docker and microservice-oriented architectures — containers, isolation, scaling, and practical demos."
pubDate: "2018-12-13"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

In December 2018 I gave a talk on Docker with a focus on microservice-oriented architectures. The goal was to show how containers fit into the bigger picture: building systems that are autonomous, isolated, and scalable.

A **microservice** does one thing and does it well. It's autonomous — a self-contained unit of functionality identified by a unique URL. It's isolated, so you can modify, test, and deploy it without impacting other parts of the system. It's elastic: you can scale it independently, vertically or horizontally. It's resilient, responsive, message-oriented, programmable, and automated.

---

## Are Microservices the Silver Bullet?

No. They're a tool, not a religion. The talk covered when they help and when they add complexity. The key is understanding the trade-offs.

---

## What I Covered

- **Microservice characteristics** — Autonomous, isolated, elastic, resilient, message-oriented
- **Docker basics** — Containers, images, Docker Compose
- **Demos** — Load balancer with Docker, Ghost blog in containers, Django with multiple database engines

---

## Resources

- [Docker Load Balancer Demo](https://github.com/xergioalex/docker-load-balancer)
- [Ghost Docker](https://github.com/xergioalex/ghostDocker)
- [Django Multiple Databases](https://github.com/xergioalex/django-multiple-databases-engines)
- [Divide and Conquer — Microservice Approach](https://www.art2link.com/divide-conquer-microservice-approach/)

---

## Slides & Reference

- [View slides](https://slides.com/xergioalex/docker-introduction)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Machine](https://docs.docker.com/machine/)
- [Docker Swarm](https://docs.docker.com/engine/swarm/)
