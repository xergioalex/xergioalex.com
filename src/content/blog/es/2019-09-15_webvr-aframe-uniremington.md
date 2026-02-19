---
title: 'WebVR con A-Frame (Charla UniRemington)'
description: 'Lo que compartí en Universidad Remington — realidad virtual en la web, WebVR, A-Frame, Entity-Component System y demos con CodePen.'
pubDate: '2019-09-15'
heroImage: '/images/blog/posts/webvr-aframe-uniremington/hero.png'
heroLayout: 'side-by-side'
tags: ['talks', 'tech']
---

Di una charla sobre WebVR y A-Frame en la **Universidad Remington**. Es una versión actualizada de la charla que había dado antes en Pereira Tech Talks: mismas bases, pero con diapositivas renovadas y más demos. La idea: crear experiencias 360° en la web con A-Frame y JavaScript.

Empecé invitando a participar en las comunidades de tecnología en Pereira: [Sirius](https://sirius.utp.edu.co/jointdeveloper/), [PyPereira](https://pypereira.co/), [Pereira Tech Talks](https://pereiratechtalks.com/), [PereiraJs](https://pereirajs.org/).

---

## VR, AR y Mixed Reality

Pasé por los conceptos: **Realidad Virtual** (VR), **Realidad Aumentada** (AR) y **Realidad Mixta** (MR). Luego al hardware: HTC Vive, Oculus Rift, Oculus Go, Sony VR, Samsung Gear, Google Daydream — precios que van desde 79 USD hasta más de 500 USD. La **distribución** y **masificación** cambian con opciones como Cardboard (7 USD) o VR Box (15 USD).

---

## ¿Por qué WebVR?

La web es la plataforma de distribución masiva más importante. [WebVR](https://immersive-web.github.io/webvr/spec/1.1/) es el estándar que define las APIs que un navegador debe exponer para crear experiencias VR. La mayoría de experiencias WebVR pesan menos de 2 MB.

No hace falta aprender tecnologías nuevas. Usas WebGL pero sin lidiar con él directamente. A-Frame está basado en Three.js. Si ya conoces WebGL o Three.js, con un poco de código añades WebVR. **A-Frame** te permite hacer experiencias con HTML y JavaScript.

---

## A-Frame: Entity-Component System

[A-Frame](https://aframe.io/) usa una arquitectura **Entity-Component System**:

- **Entities** — Objetos contenedores a los que se adjuntan componentes. Base de todo en la escena.
- **Components** — Módulos reutilizables que dan apariencia, comportamiento o funcionalidad.
- **Systems** — Alcance global, gestión y servicios para clases de componentes.

También hablé del **sistema de coordenadas** y del inspector de A-Frame para inspeccionar la escena en tiempo real.

---

## Demos

Mostré más de 20 demos en vivo, desde primitivos hasta proyectos completos:

- **Primitivos** — [CodePen](https://codepen.io/xergioalex/pen/jZxbdo)
- **Sky e imágenes equirectangulares** — [CodePen](https://codepen.io/xergioalex/pen/PQeZYy), [A-Frame Registry](https://aframe.io/aframe-registry/)
- **Texturas** — [CodePen](https://codepen.io/xergioalex/pen/VQxepd)
- **Stats y atributos** — [CodePen](https://codepen.io/xergioalex/pen/LQmGdr)
- **Animación de cámara** — [CodePen](https://codepen.io/xergioalex/pen/ddeGKq)
- **Torus** — [CodePen](https://codepen.io/xergioalex/pen/wyjMQB)
- **Texto y múltiples animaciones** — [CodePen](https://codepen.io/xergioalex/pen/qxYbwM)
- **Assets** — [CodePen](https://codepen.io/xergioalex/pen/eVrZpV)
- **Modelos 3D (Collada)** — [CodePen](https://codepen.io/xergioalex/pen/JpvXrz), [3D Warehouse](https://3dwarehouse.sketchup.com/), [Clara.io](https://clara.io), [Blender](https://www.blender.org/)
- **Vídeos** — [CodePen](https://codepen.io/xergioalex/pen/eVrZQQ)
- **Audio** — [CodePen](https://codepen.io/xergioalex/pen/BYxzBw)
- **Eventos de cursor** — [CodePen](https://codepen.io/xergioalex/pen/rJvLab)
- **Formas del cursor** — [CodePen](https://codepen.io/xergioalex/pen/qxYNNO)
- **Eventos A-Frame** — [CodePen](https://codepen.io/xergioalex/pen/MQQrwJ)
- **Galería** — [webvr-gallery](https://github.com/xergioalex/webvr-gallery)
- **Física** (Cannon.js) — [CodePen](https://codepen.io/xergioalex/pen/wyjowM)
- **Componente Sun** — [CodePen](https://codepen.io/xergioalex/pen/BYxLPB)
- **Colisiones** — [CodePen](https://codepen.io/xergioalex/pen/QQrGBO)
- **Laberinto** — [webvr-maze](https://github.com/xergioalex/webvr-maze)
- **Reconocimiento de voz** — [CodePen](https://codepen.io/xergioalex/pen/rJKxbm), [Storyteller](https://zajdband.com/storyteller/vr.html)

---

## Inspiración y créditos

- [A-Painter](https://blog.mozvr.com/a-painter/) — Mozilla
- [A-Frame City Builder](https://github.com/kfarr/aframe-city-builder)
- [Mini Mike's Metro Minis](https://github.com/mikelovesrobots/mmmm)
- [Platzi — Curso Web VR](https://platzi.com/clases/web-vr/)
- [A-Frame React](https://github.com/ngokevin/aframe-react)

---

[Ver slides](https://slides.com/xergioalex/webvr-aframe-uniremington-talk)

A seguir construyendo.
