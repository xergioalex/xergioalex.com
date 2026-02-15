---
title: "Divide y Vencerás: Microservicios y Docker"
description: "Estrategias para descomponer aplicaciones monolíticas en microservicios con Docker — características, contraprestaciones y demos."
pubDate: "2018-10-27"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

Una semana después de mi charla sobre microservicios + Docker, di un seguimiento enfocado en la estrategia **divide y vencerás**: cómo descomponer un monolito en microservicios, qué esperar y cuándo vale la pena.

Los mismos principios aplicaban: servicios autónomos, aislados, elásticos, resilientes, orientados a mensajes. Cada uno hace una cosa bien. El ciclo de vida está automatizado — dev, build, test, staging, production, distribution.

---

## Pros y contras

**Pros:** Escalable, menores costos de despliegue, equipos pequeños pueden poseer servicios, despliegue continuo, libertad tecnológica.

**Contras:** Latencia de red, complejidad exponencial a medida que crecen los servicios, desafíos de versionado, transacciones distribuidas son difíciles.

---

## Demos y recursos

- [Docker Load Balancer Demo](https://github.com/xergioalex/docker-load-balancer)
- [Cookiecutter Django](https://github.com/pydanny/cookiecutter-django) — para scaffolding de proyectos Django
- [Divide and Conquer — Microservice Approach](https://www.art2link.com/divide-conquer-microservice-approach/)

---

## Slides y referencias

- [Ver slides](https://slides.com/xergioalex/divide-and-conquer-microservices-architectures)
