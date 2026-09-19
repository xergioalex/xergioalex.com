---
title: 'Jev: The Model That Makes Decisions Instead of Text'
description: 'A model that cannot write text answered 15 support decisions correctly in 2.5 seconds for a hundredth of a cent. I ran the experiments and built a lab.'
pubDate: '2026-09-22'
heroImage: '/images/blog/posts/jev-decisions-instead-of-text/hero.webp'
heroLayout: 'side-by-side'
tags: ['portfolio', 'tech', 'ai', 'ai-agents', 'javascript', 'python']
keywords: ['jev typesafe system one model', 'jev model decisions not text', 'noul choice score api', 'cheap ai decision trees', 'llm cpu to gpu moment', 'jev api example', 'system one vs llm']
author: 'sergio-florez'
---

On September 15th a startup called TypeSafe launched a model called Jev, and my feed would not shut up about it. The post that stuck with me came from Sayed Allam: *"LLMs to Jev is like CPU to GPU moment."* A thousand people replied some version of "this changes everything."

My first reaction was: really? A model that can't write? Not "can't write well" — architecturally cannot produce a sentence. It reads a blob of context, answers a handful of yes/no/multiple-choice questions about it, and returns numbers. That's the product. And this is what has Hacker News at 1,900 points?

I've been here before. In March I didn't get the hype around [PreTeXt](/blog/pretext-programmable-text-layout/), a text measurement library, and it took me building 39 demos to understand why it mattered. So I did the same thing here: read everything, then point my terminal at the real API and run the numbers myself. TypeSafe publishes honest docs — more on that, it's rare — and their launch post even names the file where they admit what their model is bad at.

Three days and six experiments later: I get it. And the reason I get it is dumber and more interesting than the hype.

---

## The whole idea, in one paragraph

Jev is a "System One" model, named after Kahneman's fast, intuitive thinking. You send it two things: a **state** (any text or JSON — a support ticket, an email, a contract clause) and a list of typed **questions**. It returns typed answers. That's it. No generated text, nothing to parse. From the [docs](https://docs.typesafe.ai/introduction): *"No text generation, no parsing. You get typed values and probability distributions that your code can branch on, sort by, and route with."*

There are exactly three question types:

| Type | Asks | Returns |
|------|------|---------|
| **Choice** | Which option is it? | `choice`, `probabilities`, `confidence` |
| **Score** | Rate it 0–3 on this rubric | `score`, `probabilities`, `confidence` |
| **Noul** | Is this true? (0–1) | `noul` |

"Noul" is their word for a yes/no gut-check — the probability that the answer is yes. Here's a real call with the JavaScript SDK:

```javascript
import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const response = await client.systemOne({
  state: { ticket: "I was charged twice for order A-104. Refund the duplicate, this is urgent." },
  questions: {
    department: choice("Which team should handle this?", {
      billing: "Charges, invoices, refunds, payment problems",
      technical: "Bugs, crashes, errors, integration",
      orders: "Delivery, shipping, tracking, cancellations",
    }),
    urgent: noul("Does the message express that the matter cannot wait until the next business day?"),
    frustration: score("How frustrated does the customer appear?", [
      "0: calm or neutral", "1: mildly annoyed", "2: frustrated", "3: angry or threatening",
    ]),
  },
});

response.answers.department.choice        // "billing"
response.answers.department.confidence    // 1.0
response.answers.urgent.noul              // 0.96
response.answers.frustration.score        // 2.0
```

All three questions ride on one call. Every one of them is evaluated **in parallel and in isolation** against the same state — question 12 never sees question 11's answer, so there is no context rot as the list grows. You combine the answers in your own code: `if urgent AND refund → priority lane`.

---

## The embarrassingly simple part

Here's what I keep turning over. Every ingredient of this existed before September 15th. LLMs expose logprobs. "Zero-shot classifier" is a decades-old idea (a commenter on Hacker News called Jev exactly that, and they weren't wrong). Routers, guardrails, semantic scores — people have been coercing GPT-shaped models into emitting JSON for years, then validating and re-trying and paying for it.

The joke is that TypeSafe knows this. Their [launch post](https://typesafe.ai/blog/introducing-system-one-models-and-jev) describes Jev as *"a frontier-intelligence function call: unstructured state in, typed probabilistic decisions out."* The model is **non-autoregressive** — it outputs all probabilities in parallel instead of generating token by token — and it's trained with something they call RLCD (reinforcement learning for calibrated decisions) instead of the RLHF that makes chatbots sound confident. The founder, Diogo Almeida, co-invented RLHF at OpenAI and then spent two years in stealth building the version that optimizes for *calibration* instead of *sounding right*. When something like this comes from the person who invented the thing it's replacing, I pay attention.

And then there's the name. Jev, as in **Jevons paradox** — the 1865 observation that making coal cheaper made coal consumption go *up*, because efficiency breeds demand. That's the entire business bet, printed in the model's name: they think intelligence is about to get so cheap that demand explodes. TypeSafe's target is a "greater than 100× intelligence-to-speed-and-cost ratio."

Which brings us to the numbers.

---

## So I ran the numbers

Their benchmark claims (40–200x faster than frontier LLMs) are self-graded — their own launch post admits this, which I respect but don't cite. So I measured what I could measure myself, from my laptop, against the live API. Pricing is public: **$42 per billion input tokens, output free**. My first probe call consumed 370 input tokens. That's $0.0000155.

**Experiment 1 — is latency really flat?** The docs claim adding questions barely changes response time. I threw up to 64 questions at one support ticket:

<figure>
  <img src="/images/blog/posts/jev-decisions-instead-of-text/chart-e1-latency.svg" alt="Line chart showing Jev latency staying flat around 500ms as question count grows from 1 to 64" loading="lazy" width="720" height="400" />
  <figcaption>One to 64 questions in a single call: 502ms → 518ms. The p95 (dashed) spikes once at 755ms and that was my network, not the model.</figcaption>
</figure>

Sixty-three extra questions cost sixteen milliseconds. That is the "parallel and isolated" claim, verified, and it's the unlock for everything below.

**Experiment 2 — same decisions, Jev vs a real LLM.** Five support tickets, three decisions each (route the ticket, is it urgent, how frustrated is the customer). Jev answered with one call per ticket. Grok 4.3 answered with 15 sequential calls using a strict JSON prompt — the way most agents do routing today.

Jev: 2.5 seconds total, 2,381 tokens, $0.0001, **5/5 correct**. Grok: 75 seconds, ~5,000 tokens, 2/5 on my strict all-three-fields test (it got the routing right 5/5 too — the misses were urgency and frustration bands). Same judge, same tickets.

Now the part I almost didn't write. My **first** Jev run scored 1/5. The bug was mine: I'd asked *"Does the customer consider this time-sensitive or urgent?"* and the model answered yes on all five tickets — including "I need to update my card before renewal next week," which a human would call not-urgent. The docs have a page — [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13) — that says it plain: *"Jev answers the question you wrote, not the one you meant."* When I rewrote the question to *"Does the message express that the matter cannot wait until the next business day?"* — 5/5. One line, my side. That's the workflow: the bug lived in my question, not in a prompt to massage.

**Experiment 3 — can you trust the confidence?** I repeated evaluations 20 times each on eight tickets. Easy tickets: same answer every time, confidence 1.0. The interesting one was a ticket that mixes two topics ("your update broke my workflow, also my card expired"). Jev answered **technical 20 times out of 20** — and reported confidence 0.395. Same answer, hedged anyway. The confidence tracks murkiness of the question, not consistency of the answer. That's exactly what "calibrated" is supposed to mean.

**Experiment 4 — the decision tree.** This is the use case I cared about most, so it gets its own section.

---

## Decision trees, back from the dead

The most common shape in software is a conditional workflow: if urgent route here, if refund route there, escalate the rest. For a decade we couldn't put judgment inside those trees without paying LLM prices per node, so we faked it with keywords and regexes. The flowchart in every architecture doc had a dashed box called "magic happens here."

With Jev, the nodes of the tree can be judgment. My [jev-lab](https://github.com/xergioalex/jev-lab) has a decision-tree engine where the tree is a JSON file — noul nodes gate on conditions, choice nodes branch, score nodes band, and every node can carry its own confidence gate:

```json
{
  "entry": "urgency",
  "nodes": {
    "urgency": { "type": "noul", "instructions": "Is this ticket time-sensitive?",
                 "threshold": 0.6, "true": "department", "false": "frustration" },
    "department": { "type": "choice", "instructions": "Which team should handle this?",
                    "criteria": { "billing": "Charges, refunds, invoices",
                                  "orders": "Delivery, tracking" },
                    "branches": { "billing": "refund_check", "default": "frustration" } },
    "refund_check": { "type": "noul", "instructions": "Explicit refund request?",
                      "threshold": 0.6, "true": "act_refund_priority", "false": "act_billing_normal" }
  }
}
```

Here's the real tree running live on a duplicate-charge ticket (this screenshot is from the lab's own run):

<figure>
  <img src="/images/blog/posts/jev-decisions-instead-of-text/jev-lab-live-run.png" alt="Terminal screenshot of the jev-lab decision tree engine routing a support ticket to billing refund priority with confidence values" loading="lazy" width="860" height="1600" style="background:#0d1117;border-radius:12px" />
  <figcaption>Module 13 and 14 of jev-lab, running against the live API: a 20-ticket queue triaged for $0.0007 total.</figcaption>
</figure>

But here's the thing I got wrong on the first try, and it matters. I built the tree the obvious way: evaluate a node, follow the branch, evaluate the next node — one API call per node. It works. It's also **1.8x more expensive than it needs to be**, because every call re-sends the state. The cheap way is TypeSafe's own "speculative fan-out" pattern: throw *all* the tree's questions at the API in one call and do the branching in code, ignoring answers you don't need. Same answers, 20/20 tickets, half the tokens:

<figure>
  <img src="/images/blog/posts/jev-decisions-instead-of-text/chart-e4-cost.svg" alt="Bar chart comparing decision tree costs: sequential at 34 dollars per million decisions versus 19 dollars with speculative fan-out" loading="lazy" width="720" height="400" />
  <figcaption>A full decision-tree decision costs $18.83 per million — about 0.002 cents — when you batch questions and branch in code. The sequential walk costs $34.13 for identical answers.</figcaption>
</figure>

A complete AI decision tree: two thousandths of a cent per decision. Twenty tickets triaged, classified and prioritized for less than a thousandth of a dollar. That's not a typo, that's the verified arithmetic on my own runs.

---

## Why this changes things

**Your next router might not be an LLM.** I measured a confidence-gated escalation pattern: Jev routes everything cheap; low-confidence cases escalate to a big model. On my eight tickets, honest finding — the escalation *hurt*. Jev's hedged answers were correct; the one ticket where I "escalated" to the LLM's confident answer, the LLM was wrong. Confidence gates buy predictability and auditability, not automatic accuracy. Measure your own break-even. (The gate still won on the thing that matters operationally: you learn exactly which 12% of traffic needs the expensive model.)

**Agents are sitting on a pile of expensive non-decisions.** A coding agent makes dozens of tiny judgments per task: which tool, is this step safe, does this output look sane, should this PR get a full review. Today those judgments cost LLM calls — most of an agent's token bill is this plumbing, not the writing of code. My lab's module 16 is that idea as a tool: a PR description goes in, a review-effort verdict comes out, ~500 tokens. On my 20 synthetic PRs it caught 18/20 of the high/critical ones. If Anthropic and OpenAI wired this kind of model into their agents' decision paths, the cost curves would move. I built a what-if model (assumptions shown, not a measurement): an agent fleet making 40,000 internal decisions a day costs ~$634/month as sequential LLM calls, ~$1.80 as batched Jev questions.

**And yes — everyone is going to copy it.** That's not a risk to the thesis, it *is* the thesis. The idea is embarrassingly simple: judge, don't generate; evaluate in parallel; calibrate the probabilities. The hard parts are the parts you can't fake — the training objective that makes confidence honest, the non-autoregressive architecture that makes it cheap. PreTeXt got re-implemented too; the value was in understanding what text measurement unlocked. Same here.

---

## The skeptics' turn

Three objections deserve better than a hand-wave, because I had all three myself.

*"It's just a classifier."* At the idea level, sure — that's the CPU-to-GPU tweet's actual content, and the reason it's a good analogy: a GPU is "just" simple ops in parallel. What's new is not the concept, it's the package: frontier-level judgment, calibration as a training objective, priced for millions of calls. Nobody shipped that as a flagship before. A GPU is also "just" a bunch of arithmetic units — the packaging was the revolution.

*"The benchmarks are self-graded."* Correct, and their launch post says so — that's exactly why I ran my own six experiments and published every script. My numbers are one laptop on one day; they're in [the lab](https://github.com/xergioalex/jev-lab), reproducible, and they were good enough to move me from skeptic to builder.

*"'Can't hallucinate' is marketing."* Also correct — a Jev answer can be confidently wrong; it just can't invent a string that isn't in your option list. The distinction that matters: wrong-with-a-calibrated-confidence-score is a *detectable* failure, and my experiment 3 suggests the calibration is real. "It can still be wrong, it just can't make up data" — that's not a bug in the pitch, that IS the pitch.

---

## When it makes sense — and when it doesn't

Use it when the shape of the work is a **decision**: routing, classification, scoring, gating, moderation, triage, guardrails — high volume, low stakes per call or confidence-gated stakes, latency-sensitive. The use-case map in their docs is honest about the sweet spots and my results agree with it.

Don't use it when you need **generated text** — replies, code, summaries, anything open-ended. This is the part the CPU-to-GPU analogy gets right if you push on it: a GPU didn't replace the CPU, it took over the workloads that were secretly parallel. Jev won't replace your LLM; it takes over the decision-shaped slice of your LLM bill. The docs' own jaggedness page says it flatly — for generation, "use a generative model." Also know the edges: it's text-only for now, English is its best language (my Spanish tickets still routed fine, but the docs warn accuracy drops), it can't count reliably, and you should keep arithmetic in code.

If you want to poke at it yourself: the lab is [github.com/xergioalex/jev-lab](https://github.com/xergioalex/jev-lab) — 16 modules, zero dependencies, the whole test suite runs with no API key, and every module has a `--live` flag. Start at module 13 and break my decision tree. There's a [playground](https://console.typesafe.ai/playground) if you want to try the API without writing anything.

I came into this week thinking a model that can't write was a contradiction. I'm leaving with a router, a guardrail, a triage pipeline and two tools I'll actually keep using — all running on judgments that cost thousandths of a cent. The coal just got cheaper.

Let's keep building.

---

## Resources

- [Jev introduction & docs](https://docs.typesafe.ai/introduction) — System One concepts, primitives, patterns
- [TypeSafe launch post](https://typesafe.ai/blog/introducing-system-one-models-and-jev) — the claims, and their own caveats
- [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13) — the failure-modes page every vendor should have
- [jev-lab](https://github.com/xergioalex/jev-lab) — my 16-module lab; every experiment from this post is reproducible from it
- [JavaScript SDK](https://www.npmjs.com/package/@typesafe-ai/sdk) · [Python SDK](https://pypi.org/project/typesafe-sdk/) — `choice()`, `score()`, `noul()`
- [Confidence & calibration](https://docs.typesafe.ai/confidence) — how to threshold, and why "I don't know" is a signal
- Sayed Allam's [CPU-to-GPU post](https://x.com/Sayedevv) on X — the analogy that started this
