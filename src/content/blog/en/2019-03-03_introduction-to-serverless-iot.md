---
title: "Introduction to Serverless with Emphasis on IoT"
description: "What I shared in a talk on serverless — BaaS, FaaS, benefits, drawbacks, when to use it, and demos with Bambú, IoT, DailyBot."
pubDate: "2019-03-03"
heroImage: "/images/blog/posts/introduction-to-serverless-iot/hero.jpg"
heroLayout: "banner"
tags: ["talks", "tech"]
---

I gave a talk on serverless architectures with a focus on IoT. The goal was to demystify what **serverless** means — *server-less*: without a server. Spoiler: there are still servers 😄. And to show when it makes sense to use it, especially for IoT and event-driven applications.

![Talk demos: Bambú, IoT Light Bulb, DailyBot, Twitter Bot](/images/blog/posts/introduction-to-serverless-iot/demo.jpg)

---

## Backend as a Service vs Functions as a Service

Serverless comes in two main flavors:

**BaaS (Backend as a Service)** — Over 10 years old. AWS S3 was one of the first BaaS, offering cloud storage in 2006. Services are generic components connected to our applications transparently via APIs. Lets developers avoid building and maintaining generic service logic that already exists. Examples: AWS DynamoDB, Auth0, Algolia, Skygear.

**FaaS (Functions as a Service)** — Born in 2014 with AWS Lambda. The next evolution of cloud computing. A new way to run and design applications. You deploy functions that run in response to events: an HTTP request, a database change, a modified file, a user created. The platform allocates resources dynamically. Main players: AWS Lambda, Google Cloud Functions, Azure Functions.

---

## Benefits of Serverless

- **No server management**
- **Scales automatically**
- **Soft limits** — pay for what you use
- **Event-driven architecture** — HTTP, DB changes, files, users
- **No upfront costs** — no hiring or provisioning costs

---

## Drawbacks of Serverless

- **Vendor lock-in** — dependency on the provider
- **Cold starts** — latency on first execution
- **Vendor restrictions** — time, size, etc. (e.g. AWS Lambda: min 3 sec, max 5 min)
- **No good debugging tools**
- **Cost estimation is tricky**

---

## When to Use Serverless

- Short, periodic tasks
- Long idle periods
- Data processing
- Web, mobile, or worker apps that respond to user-triggered events
- Stateless apps
- Chatbots

---

## When Not to Use Serverless

- When you don't want vendor dependency
- When you need long-running executions (AWS: min 3 sec, max 5 min)
- When you have complex executions

---

## Demo time

I showed live demos:

- **[Bambú Meditación](https://appbambu.com/alexa/)** — Alexa and Lambda integration

![Bambú Meditación demo with Alexa and AWS Lambda](/images/blog/posts/introduction-to-serverless-iot/alexa-demo.png)

- **[IoT Light Bulb](https://github.com/xergioalex/serverless-ligth-bulb)** — Light bulb control with serverless

![IoT demo circuit: ESP8266, NRF24L01+, LEDs on breadboard](/images/blog/posts/introduction-to-serverless-iot/iot-circuit.png)

![Real bulb working — controlled by Lambda](/images/blog/posts/introduction-to-serverless-iot/iot-bulb.jpg)

- **[DailyBot](https://dailybot.co/)** — Team assistant

![DailyBot demo diagram with serverless](/images/blog/posts/introduction-to-serverless-iot/dailybot-demo.png)

- **[Twitter Bot](https://x.com/XergioAleXBot)** — Automated bot with Lambda

![Twitter bot in action — @XergioAleXBot](/images/blog/posts/introduction-to-serverless-iot/twitter-bot-demo.png)

---

## Where to Start?

**Programming languages?** — Node.js, Python, Go, etc. depending on the provider.

**Self-hosting?** — Options like [OpenFaaS](https://www.openfaas.com/), [Knative](https://knative.dev/) let you run FaaS on-premise.

**Notable reference:** [Foo Bar](https://www.youtube.com/watch?v=YPc5ulMR6VI) on YouTube. Udemy course: *Serverless in Spanish with AWS and Serverless Framework*.

---

[View slides](https://slides.com/xergioalex/introduction-to-serverless-with-emphasis-on-iot)

Let's keep building.
