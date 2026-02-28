---
title: "Serverless, IoT and Conversational Interfaces"
description: "What I shared at Manizales Tech Talks — voice as the new interface, Voice First, serverless, IoT, and demos with Bambú, DailyBot, Twitter Bot."
pubDate: "2019-08-23"
heroImage: "/images/blog/posts/serverless-iot-voice-interfaces/hero.png"
heroLayout: "side-by-side"
tags: ["talks", "tech"]
---

Serverless, IoT, and conversational interfaces — similar to an earlier talk, but with a different focus: **voice as the new interface**. Serverless is a cloud computing model where you only pay for compute time consumed — and it has a big role in IoT and voice interface development.

---

## Voice is the New Interface

According to Gartner, by 2020, 30% of web browsing sessions would be done without a screen. **Voice First Browsing**. Conversational interfaces — Alexa, Google Assistant, Siri — change how we interact with applications.

An example: [Bambú Meditación](https://appbambu.com/alexa/) with Alexa. The voice user interface combines **frontend** (the experience of talking to the assistant) and **backend** (the logic that processes the request). In the flow:

- **Wake word** — "Alexa"
- **Invocation name** — "Open bambú" or "Launch bambú"
- **Utterances** — What the user says in context
- **Slots** — Variable data, e.g. "a meditation to rest"
- **Intent** — The action the app must execute

![Voice interface flow: wake word, invocation, utterances, slots, intent](/images/blog/posts/serverless-iot-voice-interfaces/voice-interface.png)

---

## Serverless: BaaS and FaaS

**BaaS (Backend as a Service)** — Over 10 years. AWS S3 (2006) was one of the first. Generic components connected via APIs. Examples: DynamoDB, Auth0, Algolia, Skygear.

**FaaS (Functions as a Service)** — Born in 2014 with AWS Lambda. Functions that run on events (HTTP, DB changes, files). AWS Lambda, Google Cloud Functions, Azure Functions.

**Benefits:** No server management, automatic scaling, event-driven architecture, no upfront costs.

**Drawbacks:** Vendor lock-in, cold starts, restrictions (AWS: min 3 sec, max 5 min), harder debugging, tricky cost estimation.

---

## When to Use and When Not

**Use when:** Short periodic tasks, long idle periods, data processing, web/mobile apps that respond to events, stateless, chatbots.

**Avoid when:** You don't want vendor dependency, long-running executions, complex flows.

---

## Demo time

- **[Bambú Meditación](https://appbambu.com/alexa/)** — Alexa + Lambda
- **[IoT Light Bulb](https://github.com/xergioalex/serverless-ligth-bulb)** — Bulb with serverless
- **[DailyBot](https://dailybot.co/)** — Team assistant
- **[Twitter Bot](https://x.com/XergioAleXBot)** — Bot with Lambda

---

## Where to Start?

**Languages:** Node.js, Python, Go depending on the provider.

**Self-hosting:** [OpenFaaS](https://www.openfaas.com/), [Knative](https://knative.dev/).

**References:** [Foo Bar](https://www.youtube.com/watch?v=YPc5ulMR6VI) on YouTube. Udemy course: *Serverless in Spanish with AWS and Serverless Framework*.

---

[View slides](https://slides.com/xergioalex/serverless-iot-and-voice-interfaces)

Let's keep building.
