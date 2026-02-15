---
title: "Arquitectura de Microservicios y Contenedores con Docker"
description: "Construir y desplegar microservicios con Docker — divide y vencerás, pros y contras, y demos prácticas."
pubDate: "2018-10-20"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

En octubre de 2018 di una charla sobre arquitectura de microservicios con Docker en Pereira Tech Talks. El tema era **divide y vencerás** — descomponer aplicaciones monolíticas en servicios más pequeños y autónomos que pueden desarrollarse, probarse y desplegarse independientemente.

Un microservicio hace una cosa y la hace bien. Es autónomo (autocontenido, identificado por una URL única), aislado (puedes modificarlo sin impactar otros servicios), elástico (escalable vertical u horizontalmente), resiliente, responsivo, orientado a mensajes, programable y automatizado.

---

## ¿Son los microservicios la bala de plata?

No. La charla cubrió las contraprestaciones:

**Pros:** Escalable, reduce costos de despliegue, puede ser desarrollado por un equipo pequeño, habilita despliegue continuo, usa la tecnología que prefieras.

**Contras:** Latencia de red por el intercambio de mensajes; la complejidad de despliegue y testing crece con el número de servicios; servicios demasiado granulares pueden crear overhead; el versionado entre servicios es crítico; operaciones transaccionales entre fronteras aumentan la complejidad lógica.

---

## Demos y recursos

- [Docker Load Balancer Demo](https://github.com/xergioalex/docker-load-balancer)
- [Ghost Docker](https://github.com/xergioalex/ghostDocker)
- [Documento de conceptos](https://docs.google.com/document/d/18fhtTFDRO1XfW1bAKAU2lPvaf9vY6YkH1-FajS2EMIY/edit?usp=sharing)

---

## Slides y referencias

- [Ver slides](https://slides.com/xergioalex/microservices-architecture-and-containers-wit-docker)
- [Divide and Conquer — Microservice Approach](https://www.art2link.com/divide-conquer-microservice-approach/)
