---
title: "Jev: The Model That Makes Decisions Without Writing a Single Word"
description: 'A model that cannot write text answered 15 support decisions correctly in 2.5 seconds for a hundredth of a cent. I ran the experiments and built a lab.'
pubDate: '2026-09-19'
heroImage: '/images/blog/posts/jev-decisions-without-writing/hero.webp'
heroLayout: 'side-by-side'
tags: ['portfolio', 'tech', 'ai', 'ai-agents', 'javascript', 'python']
keywords: ['jev typesafe system one model', 'jev model decisions not text', 'noul choice score api', 'cheap ai decision trees', 'llm cpu to gpu moment', 'jev api example', 'system one vs llm']
author: 'sergio-florez'
---

How much does it cost software to evaluate whether something is urgent? Answering that question takes reasoning, and today we delegate it to an advanced tool: a generalist model trained to write code and complex essays.

We use the best programmers and writers in the world to say yes or no. That's the bill nobody looks at. And it didn't start there. The question is old: does this go to the front of the queue or the back? Almost every piece of software needs that answer for every message it receives, and no `if` knows how to ask it. At first we solved it archaically, with regexes or simple ifs like:

```javascript
if (message.includes("urgent"))
```

That line doesn't evaluate anything: it prays that the right word arrives in the right message, carrying the right intention with it. The actual judgment — which team handles this ticket, whether this transaction is suspicious, whether this message needs a human — never fit inside it. A decade of keywords and regexes pretending it did. When the archaic conditionals stopped being enough, we gave the job to a billion-parameter essayist who charges by the word.

TypeSafe exists because of that mismatch. Its flagship model, Jev, cannot generate text — not that it struggles; it refuses by design. It reads a state: a support ticket, an email, a document. It answers typed questions about that state and returns numbers — a choice, a score, a probability. Nothing to parse, nothing to hedge. Numbers your code can branch on. Aimed at a real support queue, it graded fifteen judgment calls correctly in 2.5 seconds. The entire bill: one hundredth of a cent.

The launch earned it a *"LLMs to Jev is like CPU to GPU moment"* comparison (Sayed Allam) and a 1,900-point Hacker News thread, and both undersell what is actually going on. On paper there is very little here — reading context and answering multiple-choice questions is the least glamorous job in machine learning, a zero-shot classifier as more than one commenter put it. What sits underneath is not: a non-autoregressive architecture that emits every probability in parallel, a training objective tuned for calibrated uncertainty instead of persuasive prose, and pricing — $42 per billion tokens, output free — that only works if the whole stack is genuinely different. The distance between what Jev appears to be and what it takes to build is the real story.

So I did what I did with [PreTeXt](/blog/pretext-programmable-text-layout/), another release that looked trivial until it wasn't: I read the complete documentation, then pointed my terminal at the live API and ran my own numbers instead of citing theirs. Six experiments and a 16-module lab later — both open-sourced as [jev-lab](https://github.com/xergioalex/jev-lab) — I have a defensible answer, and it starts with TypeSafe's own honesty. Their launch post names the biases in its benchmarks; their docs include a page listing exactly what the model is bad at.

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

<figure>
  <img src="/images/blog/posts/jev-decisions-without-writing/diagram-01.webp" alt="Diagram of the Jev pipeline: a state document and question bubbles feed parallel evaluation lanes, which produce choice, score and noul answer tiles with probability distributions" loading="lazy" width="1200" height="675" />
  <figcaption>The whole pipeline: one state and many questions in, typed answers with distributions out - one call.</figcaption>
</figure>

All three questions ride on one call. Every one of them is evaluated **in parallel and in isolation** against the same state — question 12 never sees question 11's answer, so there is no context rot as the list grows. You combine the answers in your own code: `if urgent AND refund → priority lane`.

---

## The embarrassingly simple part

Every ingredient of this existed before Jev did. LLMs expose logprobs. "Zero-shot classifier" is a decades-old idea (a commenter on Hacker News called Jev exactly that, and they weren't wrong). Routers, guardrails, semantic scores — people have been coercing GPT-shaped models into emitting JSON for years, then validating and re-trying and paying for it.

The joke is that TypeSafe knows this. Their [launch post](https://typesafe.ai/blog/introducing-system-one-models-and-jev) describes Jev as *"a frontier-intelligence function call: unstructured state in, typed probabilistic decisions out."* The model is **non-autoregressive** — it outputs all probabilities in parallel instead of generating token by token — and it's trained with something they call RLCD (reinforcement learning for calibrated decisions) instead of the RLHF that makes chatbots sound confident. The founder, Diogo Almeida, co-invented RLHF at OpenAI and then spent two years in stealth building the version that optimizes for *calibration* instead of *sounding right*. When something like this comes from the person who invented the thing it's replacing, I pay attention.

And then there's the name. Jev, as in **Jevons paradox** — the 1865 observation that making coal cheaper made coal consumption go *up*, because efficiency breeds demand. That's the entire business bet, printed in the model's name: they think intelligence is about to get so cheap that demand explodes. TypeSafe's target is a "greater than 100× intelligence-to-speed-and-cost ratio."

Which brings us to the numbers.

---

## So I ran the numbers

Everything in this section is reproducible: every script, raw output and chart lives in [jev-lab](https://github.com/xergioalex/jev-lab), a lab I built while writing this post.

Their benchmark claims — 40–200x faster than frontier LLMs — are self-graded. Their own launch post admits it, which I respect; it is also why I don't cite those numbers. I measured what I could measure myself: my laptop, the live API, published scripts. Pricing is public: **$42 per billion input tokens, output free** — "too cheap to meter," in their words. My first probe call consumed 370 input tokens. That's $0.0000155.

**Experiment 1 — is latency really flat?** The docs claim adding questions barely changes response time. I threw up to 64 questions at one support ticket:

<figure>
  <img src="/images/blog/posts/jev-decisions-without-writing/chart-e1-latency.svg" alt="Line chart showing Jev latency staying flat around 500ms as question count grows from 1 to 64" loading="lazy" width="720" height="400" />
  <figcaption>One to 64 questions in a single call: 502ms → 518ms. The p95 (dashed) spikes once at 755ms and that was my network, not the model.</figcaption>
</figure>

Sixty-three extra questions cost sixteen milliseconds. That is the "parallel and isolated" claim, verified — and it is the unlock for everything below.

**Experiment 2 — same decisions, Jev vs a real LLM.** Five support tickets, three decisions each (route the ticket, is it urgent, how frustrated is the customer). Jev answered with one call per ticket. Grok 4.3 answered with 15 sequential calls using a strict JSON prompt — the way most agents do routing today.

Jev: 2.5 seconds total, 2,381 tokens, $0.0001, **5/5 correct**. Grok: 75 seconds, ~5,000 tokens, 2/5 on my strict all-three-fields test (it got the routing right 5/5 too — the misses were urgency and frustration bands). Same judge, same tickets.

Now the part I almost didn't write. My **first** Jev run scored 1/5. The bug was mine: I'd asked *"Does the customer consider this time-sensitive or urgent?"* and the model answered yes on all five tickets — including "I need to update my card before renewal next week," which a human would call not-urgent. The docs have a page — [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13) — that says it plain: *"Jev answers the question you wrote, not the one you meant."* When I rewrote the question to *"Does the message express that the matter cannot wait until the next business day?"* — 5/5. One line, my side. That's the workflow: the bug lived in my question, not in a prompt to massage.

**Experiment 3 — can you trust the confidence?** I repeated evaluations 20 times each on eight tickets. Easy tickets: same answer every time, confidence 1.0. The interesting one was a ticket that mixes two topics ("your update broke my workflow, also my card expired"). Jev answered **technical 20 times out of 20** — and reported confidence 0.395. Same answer, hedged anyway. The confidence tracks murkiness of the question, not consistency of the answer. That's exactly what "calibrated" is supposed to mean.

**Experiment 4 — the decision tree.** This is the use case I cared about most, so it gets its own section.

---

## Decision trees, back from the dead

The opening bet is the most common shape in software: if urgent route here, if refund route there, escalate the rest. For a decade we couldn't put judgment inside those trees without paying LLM prices per node, so we faked it. The flowchart in every architecture doc had a dashed box called "magic happens here."

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
  <img src="/images/blog/posts/jev-decisions-without-writing/jev-lab-live-run.webp" alt="Terminal screenshot of the jev-lab decision tree engine routing a support ticket to billing refund priority with confidence values" loading="lazy" width="860" height="1600" style="background:#0d1117;border-radius:12px" />
  <figcaption>Module 13 and 14 of jev-lab, running against the live API: a 20-ticket queue triaged for $0.0007 total.</figcaption>
</figure>

I built my first version the obvious way: evaluate a node, follow the branch, evaluate the next — one API call per node. It works, and it is **1.8x more expensive than it needs to be**, because every call re-sends the state. The cheap way is TypeSafe's own "speculative fan-out" pattern: throw *all* the tree's questions at the API in one call and do the branching in code, ignoring answers you don't need. Same answers, 20/20 tickets, half the tokens:

<figure>
  <img src="/images/blog/posts/jev-decisions-without-writing/chart-e4-cost.svg" alt="Bar chart comparing decision tree costs: sequential at 34 dollars per million decisions versus 19 dollars with speculative fan-out" loading="lazy" width="720" height="400" />
  <figcaption>A full decision-tree decision costs $18.83 per million — about 0.002 cents — when you batch questions and branch in code. The sequential walk costs $34.13 for identical answers.</figcaption>
</figure>

A complete AI decision tree: two thousandths of a cent per decision. Twenty tickets triaged, classified and prioritized for less than a thousandth of a dollar. That's not a typo, that's the verified arithmetic on my own runs.

---

## Why this changes things

**Your next router might not be an LLM.** I measured a confidence-gated escalation pattern: Jev routes everything cheap; low-confidence cases escalate to a big model. On my eight tickets, the honest finding is that the escalation *hurt*. Jev's hedged answers were correct; the one ticket where I "escalated" to the LLM's confident answer, the LLM was wrong. Confidence gates buy predictability and auditability, not automatic accuracy. Measure your own break-even. (The gate still won on the thing that matters operationally: you learn exactly which 12% of traffic needs the expensive model.)

**Agents are sitting on a pile of expensive non-decisions.** A coding agent makes dozens of tiny judgments per task: which tool, is this step safe, does this output look sane, should this PR get a full review. Today those judgments cost LLM calls — most of an agent's token bill is this plumbing, not the writing of code. My lab's module 16 is that idea as a tool: a PR description goes in, a review-effort verdict comes out, ~500 tokens. On my 20 synthetic PRs it caught 18/20 of the high/critical ones. If Anthropic and OpenAI wired this kind of model into their agents' decision paths, the cost curves would move. I built a what-if model (assumptions shown, not a measurement): an agent fleet making 40,000 internal decisions a day costs ~$634/month as sequential LLM calls, ~$1.80 as batched Jev questions.

**And yes — everyone is going to copy it.** That's not a risk to the thesis, it *is* the thesis. The idea is embarrassingly simple: judge, don't generate; evaluate in parallel; calibrate the probabilities. The hard parts are the parts you can't fake — the training objective that makes confidence honest, the non-autoregressive architecture that makes it cheap. PreTeXt got re-implemented within weeks; the lasting value was understanding what text measurement unlocked. I expect the same shape here.

---

## The skeptics' turn

Three objections deserve better than a hand-wave, because I had all three myself.

<figure>
  <img src="/images/blog/posts/jev-decisions-without-writing/diagram-02.webp" alt="Diagram contrasting an LLM's single winding sequential token path with Jev's parallel decision lanes fanning into a decision tree" loading="lazy" width="1200" height="675" />
  <figcaption>The analogy, drawn: the LLM unspools one token at a time; Jev fires every question at once and lets code pick.</figcaption>
</figure>

*"It's just a classifier."* At the idea level, sure — that's the CPU-to-GPU tweet's actual content, and the reason it's a good analogy: a GPU is "just" simple ops in parallel. What's new is not the concept, it's the package: frontier-level judgment, calibration as a training objective, priced for millions of calls. Nobody shipped that as a flagship before. A GPU is also "just" a bunch of arithmetic units — the packaging was the revolution.

*"The benchmarks are self-graded."* Correct, and their launch post says so — that's exactly why I ran my own six experiments and published every script. My numbers are one laptop on one day; they're in [the lab](https://github.com/xergioalex/jev-lab), reproducible, and they were good enough to move me from skeptic to builder.

*"'Can't hallucinate' is marketing."* Partly correct — a Jev answer can be confidently wrong; it just can't invent a string that isn't in your option list. But the type-safety half of the claim is measurable, and TypeSafe measured it. In their own error-rate evals, Jev's structured outputs came back valid **0%** of the time they were wrong — zero, by construction, because the schema either matches or there is no answer at all — while the frontier models they compared against ranged from 0.6% to a painful 45.5%, with tool-call errors climbing to 17%. Hold it at the same skepticism as everything else: the LLM baselines came from OpenRouter traffic (routing bias, admitted), and a guaranteed-by-construction zero is not the same kind of result as a benchmark win. What the chart actually proves is narrower and more useful — the failure modes are *different kinds*. A hallucinated tool call is, in their words, *"an absolute deal-breaker if it's part of a system with latency guarantees or it's buried several layers deep in a dependency chain"*; a wrong answer carrying calibrated confidence is a *detectable* one, and my experiment 3 suggests that calibration is real. "It can still be wrong, it just can't make up data" — that's not a bug in the pitch, that IS the pitch.

<figure>
  <img src="/images/blog/posts/jev-decisions-without-writing/type-safety.webp" alt="Bar charts from TypeSafe's launch post comparing structured output error rate and tool call error rate: Jev at 0 percent versus frontier models ranging from 0.58 to 45.5 percent" loading="lazy" width="1400" height="433" />
  <figcaption>TypeSafe's own measurements: structured-output and tool-call error rates. The 0% is guaranteed by the output contract rather than earned empirically — the honest caveat is in their post. (Source: TypeSafe launch blog.)</figcaption>
</figure>

---

## When it makes sense — and when it doesn't

Use it when the shape of the work is a **decision**: routing, classification, scoring, gating, moderation, triage, guardrails — high volume, low stakes per call or confidence-gated stakes, latency-sensitive. The use-case map in their docs is honest about the sweet spots and my results agree with it.

Don't use it when you need **generated text** — replies, code, summaries, anything open-ended. This is the part the CPU-to-GPU analogy gets right if you push on it: a GPU didn't replace the CPU, it took over the workloads that were secretly parallel. Jev won't replace your LLM; it takes over the decision-shaped slice of your LLM bill. The docs' own jaggedness page says it flatly — for generation, "use a generative model." Also know the edges: it's text-only for now, English is its best language (my Spanish tickets still routed fine, but the docs warn accuracy drops), it can't count reliably, and you should keep arithmetic in code.

If you want to poke at it yourself: the lab is [github.com/xergioalex/jev-lab](https://github.com/xergioalex/jev-lab) — 16 modules, zero dependencies, the whole test suite runs with no API key, and every module has a `--live` flag. Start at module 13 and break my decision tree. There's a [playground](https://console.typesafe.ai/playground) if you want to try the API without writing anything.

I started digging into Jev half-expecting a model that can't write to be a contradiction. I'm coming out the other side with a router, a guardrail, a triage pipeline and two tools I'll actually keep using — all running on judgments that cost thousandths of a cent. The coal just got cheaper.

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
