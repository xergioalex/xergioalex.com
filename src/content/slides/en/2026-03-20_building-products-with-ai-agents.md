---
type: internal
title: "Building Products with AI Agents"
description: "How AI coding agents are reshaping product development — from orchestration patterns to real-world workflows at DailyBot and beyond."
pubDate: 2026-03-20
tags: [tech, talks, ai]
draft: false
theme: dark
transition: slide
syntaxHighlight: true
math: false
eventName: "Pereira Tech Talks 2026"
eventDate: 2026-03-20
eventUrl: "https://pereiratechtalks.org/"
---

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" -->

# Building Products with AI Agents

### From solo developer to orchestrator

<small>Sergio Alexander Florez · Pereira Tech Talks 2026</small>

---

## The shift

> "Every company needs an AI agent strategy — just like they once needed an internet strategy and a cloud strategy."

— Jensen Huang, GTC 2026

---

## What changed in 2025–2026

- **Claude**, **GPT**, **Gemini** went from chatbots to **coding agents** <!-- .element: class="fragment fade-up" -->
- Agents can read codebases, run tests, open PRs <!-- .element: class="fragment fade-up" -->
- The developer's role shifted from **writing code** to **directing agents** <!-- .element: class="fragment fade-up" -->

---

## The orchestrator mindset

<div class="grid grid-cols-2 gap-8 text-left">
  <div>
    <h3>Before</h3>
    <ul>
      <li>You write every line</li>
      <li>You debug by reading</li>
      <li>Speed = typing speed</li>
    </ul>
  </div>
  <div>
    <h3>Now</h3>
    <ul>
      <li>You define the architecture</li>
      <li>Agents implement the details</li>
      <li>Speed = clarity of instructions</li>
    </ul>
  </div>
</div>

---

## Real example: DailyBot.com migration

We migrated **dailybot.com** from a legacy CMS to Astro:

- **5 engineers** + AI agents <!-- .element: class="fragment" -->
- **700 pages** across 3 languages <!-- .element: class="fragment" -->
- **6 weeks** from kickoff to production <!-- .element: class="fragment" -->
- **12 content collections** with typed Zod schemas <!-- .element: class="fragment" -->

---

## The agent workflow

```text [1|2|3|4|5]
1. Human defines architecture (schemas, patterns, constraints)
2. Agent scaffolds components from patterns
3. Human reviews, adjusts, approves
4. Agent handles repetitive work (translations, tests, migrations)
5. CI validates everything (types, lint, build, Lighthouse)
```

---

## What agents are great at

- Scaffolding from patterns <!-- .element: class="fragment fade-up" -->
- Translating content (EN ↔ ES) <!-- .element: class="fragment fade-up" -->
- Writing tests for existing code <!-- .element: class="fragment fade-up" -->
- Migrating data between formats <!-- .element: class="fragment fade-up" -->
- Repetitive refactoring across many files <!-- .element: class="fragment fade-up" -->

---

## What agents still need humans for

- **Architecture decisions** — which abstractions, which patterns <!-- .element: class="fragment fade-up" -->
- **Product judgment** — what to build, what to skip <!-- .element: class="fragment fade-up" -->
- **Quality bar** — defining "good enough" vs "ship it" <!-- .element: class="fragment fade-up" -->
- **Context** — business constraints, user needs, team dynamics <!-- .element: class="fragment fade-up" -->

---

## Key lesson

The best engineers in 2026 are not the fastest coders.

They are the **clearest thinkers** — because agents amplify clarity and punish ambiguity.

---

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" -->

## Thank you

**@XergioAleX** · xergioalex.com

<small>Slides built with Reveal.js inside Astro</small>

Note: Closing — invite questions. Mention that the slides themselves are built with the slides-as-code approach discussed in the talk.
