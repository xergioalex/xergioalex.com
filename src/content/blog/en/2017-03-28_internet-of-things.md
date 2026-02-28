---
title: "Introduction to the Internet of Things"
description: "Introductory talk on IoT — sensors, actuators, controllers, and programming your first robot with Arduino and Johnny-five."
pubDate: "2017-03-28"
heroImage: "/images/blog/posts/internet-of-things/hero.jpg"
heroLayout: "banner"
tags: ["talks", "tech"]
---

The Internet of Things (IoT) — alongside Alejandro Rendon's talk on managing a small Node.js cluster for distributed computing. You can read more about it on the [Pereira Tech Talks blog](https://www.pereiratechtalks.com/introduccion-al-internet-de-las-cosas-y-clustering-con-nodejs/).

---

## What is the Internet of Things?

The **Internet of Things** refers to the network of physical devices — sensors, actuators, and controllers — that connect to the internet and exchange data. It's often called a second industrial revolution because it bridges the physical and digital worlds: machines talk to each other, to the cloud, and to us.

![IoT talk at Pereira Tech Talks](/images/blog/posts/internet-of-things/iot-1.webp)

---

## The Three Essential Components

Smart devices are built from three core elements:

1. **Sensors** — Capture data from the environment (temperature, light, motion, humidity, etc.)
2. **Actuators** — Perform actions in the physical world (motors, LEDs, relays, speakers)
3. **Controllers** — Process data and decide what to do (microcontrollers like Arduino, Raspberry Pi)

Together they form feedback loops: sense → decide → act.

![IoT components and robotics](/images/blog/posts/internet-of-things/iot-2.webp)

---

## Programming Hardware with Node.js: Johnny-five

[Johnny-five](http://johnny-five.io/) is a JavaScript robotics and IoT platform. It lets you control Arduino, Raspberry Pi, and other boards from Node.js — no need to write C or C++. You write JavaScript, and Johnny-five handles the low-level communication.

### Your First Robot

In the talk I showed how to get started: connect an Arduino, install Johnny-five, and blink an LED or read a sensor in a few lines of code. From there you can build more complex projects — robots, smart home devices, data loggers.

---

## Event Memories

![Pereira Tech Talks meetup — Jonathan Alvarez inviting to JsConf](/images/blog/posts/internet-of-things/iot-3.webp)

![Pereira Tech Talks meetup](/images/blog/posts/internet-of-things/iot-4.webp)

Jonathan Alvarez also invited the community to attend [JsConf Colombia](https://jsconf.co/) in Medellín.

---

## Slides & Event Reference

- [View slides](https://slides.com/xergioalex/internet-of-things)
- [Pereira Tech Talks blog post](https://www.pereiratechtalks.com/introduccion-al-internet-de-las-cosas-y-clustering-con-nodejs/) — event recap (IoT + Node.js clustering)
