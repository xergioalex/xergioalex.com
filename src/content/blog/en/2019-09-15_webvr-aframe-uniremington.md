---
title: "WebVR with A-Frame (UniRemington Talk)"
description: "What I shared at Universidad Remington — web VR, WebVR, A-Frame, Entity-Component System, and CodePen demos."
pubDate: "2019-09-15"
heroImage: "/images/blog/posts/webvr-aframe-uniremington/hero.png"
heroLayout: "side-by-side"
tags: ["talks", "tech"]
---

I gave a talk on WebVR and A-Frame at **Universidad Remington**. It's an updated version of the talk I'd given earlier at Pereira Tech Talks: same foundations, but with refreshed slides and more demos. The goal: create 360° web experiences with A-Frame and JavaScript.

I started by inviting people to join the tech communities in Pereira: [Sirius](https://sirius.utp.edu.co/jointdeveloper/), [PyPereira](https://pypereira.co/), [Pereira Tech Talks](https://pereiratechtalks.com/), [PereiraJs](https://pereirajs.org/).

---

## VR, AR, and Mixed Reality

I went through the concepts: **Virtual Reality** (VR), **Augmented Reality** (AR), and **Mixed Reality** (MR). Then hardware: HTC Vive, Oculus Rift, Oculus Go, Sony VR, Samsung Gear, Google Daydream — prices from 79 USD to over 500 USD. **Distribution** and **mass adoption** change with options like Cardboard (7 USD) or VR Box (15 USD).

---

## Why WebVR?

The web is the most important mass distribution platform. [WebVR](https://immersive-web.github.io/webvr/spec/1.1/) is the standard that defines the APIs a browser must expose to create VR experiences. Most WebVR experiences weigh less than 2 MB.

You don't need to learn new technologies. You use WebGL without dealing with it directly. A-Frame is built on Three.js. If you already know WebGL or Three.js, a bit of code adds WebVR. **A-Frame** lets you build experiences with HTML and JavaScript.

---

## A-Frame: Entity-Component System

[A-Frame](https://aframe.io/) uses an **Entity-Component System** architecture:

- **Entities** — Container objects that components attach to. The base of everything in the scene.
- **Components** — Reusable modules that provide appearance, behavior, or functionality.
- **Systems** — Global scope, management, and services for component classes.

I also covered the **coordinate system** and A-Frame's inspector for real-time scene inspection.

---

## Demos

I showed over 20 live demos, from primitives to full projects:

- **Primitives** — [CodePen](https://codepen.io/xergioalex/pen/jZxbdo)
- **Sky and equirectangular images** — [CodePen](https://codepen.io/xergioalex/pen/PQeZYy), [A-Frame Registry](https://aframe.io/aframe-registry/)
- **Textures** — [CodePen](https://codepen.io/xergioalex/pen/VQxepd)
- **Stats and attributes** — [CodePen](https://codepen.io/xergioalex/pen/LQmGdr)
- **Camera animation** — [CodePen](https://codepen.io/xergioalex/pen/ddeGKq)
- **Torus** — [CodePen](https://codepen.io/xergioalex/pen/wyjMQB)
- **Text and multiple animations** — [CodePen](https://codepen.io/xergioalex/pen/qxYbwM)
- **Assets** — [CodePen](https://codepen.io/xergioalex/pen/eVrZpV)
- **3D models (Collada)** — [CodePen](https://codepen.io/xergioalex/pen/JpvXrz), [3D Warehouse](https://3dwarehouse.sketchup.com/), [Clara.io](https://clara.io), [Blender](https://www.blender.org/)
- **Videos** — [CodePen](https://codepen.io/xergioalex/pen/eVrZQQ)
- **Audio** — [CodePen](https://codepen.io/xergioalex/pen/BYxzBw)
- **Cursor events** — [CodePen](https://codepen.io/xergioalex/pen/rJvLab)
- **Cursor shapes** — [CodePen](https://codepen.io/xergioalex/pen/qxYNNO)
- **A-Frame events** — [CodePen](https://codepen.io/xergioalex/pen/MQQrwJ)
- **Gallery** — [webvr-gallery](https://github.com/xergioalex/webvr-gallery)
- **Physics** (Cannon.js) — [CodePen](https://codepen.io/xergioalex/pen/wyjowM)
- **Sun component** — [CodePen](https://codepen.io/xergioalex/pen/BYxLPB)
- **Collisions** — [CodePen](https://codepen.io/xergioalex/pen/QQrGBO)
- **Maze** — [webvr-maze](https://github.com/xergioalex/webvr-maze)
- **Speech recognition** — [CodePen](https://codepen.io/xergioalex/pen/rJKxbm), [Storyteller](https://zajdband.com/storyteller/vr.html)

---

## Inspiration and credits

- [A-Painter](https://blog.mozvr.com/a-painter/) — Mozilla
- [A-Frame City Builder](https://github.com/kfarr/aframe-city-builder)
- [Mini Mike's Metro Minis](https://github.com/mikelovesrobots/mmmm)
- [Platzi — Web VR Course](https://platzi.com/clases/web-vr/)
- [A-Frame React](https://github.com/ngokevin/aframe-react)

---

[View slides](https://slides.com/xergioalex/webvr-aframe-uniremington-talk)

Let's keep building.
