---
title: "Introduction to Serverless with Emphasis on IoT"
description: "Exploring serverless architectures — BaaS, FaaS, benefits, trade-offs, and when to use them in IoT projects."
pubDate: "2019-03-03"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

In March 2019 I gave a talk on serverless architectures with a focus on IoT. The idea was to demystify what "serverless" actually means — there are still servers, of course — and show when it makes sense to use it, especially for IoT and event-driven applications.

Serverless comes in two main flavors: **Backend as a Service (BaaS)** and **Functions as a Service (FaaS)**. BaaS has been around for over a decade — AWS S3 was one of the first, offering cloud storage in 2006. FaaS emerged in 2014 with AWS Lambda, changing how we design and run applications.

---

## Backend as a Service (BaaS)

BaaS gives you generic components — storage, auth, search — connected to your app via APIs. You don't build or maintain that logic yourself. Examples: AWS DynamoDB, Auth0, Algolia, Skygear. The benefit: developers focus on what makes their app unique instead of reinventing the wheel.

---

## Functions as a Service (FaaS)

FaaS is the next evolution of cloud computing. You deploy functions that run in response to events: an HTTP request, a file upload, a database change. The platform handles scaling, provisioning, and execution. AWS Lambda, Google Cloud Functions, and Azure Functions are the main players.

---

## Benefits and Trade-offs

**Benefits:** No server management, automatic scaling, event-driven architecture, no upfront costs — you pay per execution.

**Trade-offs:** Vendor lock-in, cold starts, execution limits (e.g., AWS Lambda: 3 seconds min, 5 minutes max), debugging is harder, cost estimation can be tricky.

---

## When to Use Serverless

**Use it when:** Short, periodic tasks; long idle periods; data processing; web/mobile apps that respond to user events; stateless apps; chatbots.

**Avoid it when:** You don't want vendor dependency; you need long-running executions; you have complex workflows.

---

## Demos and Resources

I showed demos including [Bambú Meditación](https://appbambu.com/alexa/) (Alexa integration), [IoT Light Bulb](https://github.com/xergioalex/serverless-ligth-bulb), [DailyBot](https://dailybot.co/), and a [Twitter bot](https://twitter.com/xergioalexbot).

For learning more: [Foo Bar](https://www.youtube.com/watch?v=YPc5ulMR6VI) on YouTube, or Udemy courses on Serverless with AWS and Serverless Framework in Spanish.

---

## Slides & Reference

- [View slides](https://slides.com/xergioalex/introduction-to-serverless-with-emphasis-on-iot)
