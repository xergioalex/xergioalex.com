---
title: "Introducción a Docker"
description: "Introducción a Docker y arquitecturas orientadas a microservicios — contenedores, aislamiento, escalado y demos prácticas."
pubDate: "2018-12-13"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

En diciembre de 2018 di una charla sobre Docker con enfoque en arquitecturas orientadas a microservicios. El objetivo era mostrar cómo los contenedores encajan en el panorama más amplio: construir sistemas autónomos, aislados y escalables.

Un **microservicio** hace una cosa y la hace bien. Es autónomo — una unidad autocontenida de funcionalidad identificada por una URL única. Es aislado, así que puedes modificarlo, probarlo y desplegarlo sin impactar otras partes del sistema. Es elástico: puedes escalarlo independientemente, vertical u horizontalmente. Es resiliente, responsivo, orientado a mensajes, programable y automatizado.

---

## ¿Son los microservicios la bala de plata?

No. Son una herramienta, no una religión. La charla cubrió cuándo ayudan y cuándo añaden complejidad. La clave es entender las contraprestaciones.

---

## Lo que cubrí

- **Características de microservicios** — Autónomos, aislados, elásticos, resilientes, orientados a mensajes
- **Conceptos básicos de Docker** — Contenedores, imágenes, Docker Compose
- **Demos** — Load balancer con Docker, blog Ghost en contenedores, Django con múltiples motores de base de datos

---

## Recursos

- [Docker Load Balancer Demo](https://github.com/xergioalex/docker-load-balancer)
- [Ghost Docker](https://github.com/xergioalex/ghostDocker)
- [Django Multiple Databases](https://github.com/xergioalex/django-multiple-databases-engines)
- [Divide and Conquer — Microservice Approach](https://www.art2link.com/divide-conquer-microservice-approach/)

---

## Slides y referencias

- [Ver slides](https://slides.com/xergioalex/docker-introduction)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Machine](https://docs.docker.com/machine/)
- [Docker Swarm](https://docs.docker.com/engine/swarm/)
