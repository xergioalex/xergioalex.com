---
title: "Claude Fable 5: The Model They Wouldn't Release Is Now in Your Hands"
description: "Two months ago, Anthropic said a model was too dangerous to release. Today they released it — same weights, different name, with a safety layer that changes the equation."
pubDate: "2026-06-09"
heroImage: "/images/blog/posts/claude-fable-5-mythos-unleashed/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "personal", "claude"]
keywords: ["Claude Fable 5 release", "Claude Mythos 5 public", "Anthropic Fable 5 capabilities", "Project Glasswing update 2026", "Mythos class model general availability", "AI safety classifiers"]
---

Two months ago I wrote about [a model too dangerous to release](/blog/claude-mythos-the-model-too-dangerous-to-release/). Anthropic had built something that found thousands of unknown security flaws in every major operating system. They assembled a $100 million coalition, restricted access to fifty partners, and said the responsible thing to do was keep it locked away. That post ended with "this is just the beginning."

Sixty-three days later — today — [Anthropic released that model](https://www.anthropic.com/news/claude-fable-5-mythos-5). Same weights. Same architecture. Same brain that found a 28-year-old bug in OpenBSD for fifty bucks. They called it Claude Fable 5, gave it a set of safety classifiers, and put it in the API for anyone with a credit card. The model too dangerous to release is the model you can talk to right now.

I want to understand how we got from "too dangerous for anyone" to "available everywhere today" in two months. And I want to understand what it means.

---

## What Changed

The short answer: the harness changed. The model didn't.

Between April and today, three things happened. First, [Project Glasswing expanded](https://www.anthropic.com/news/expanding-project-glasswing). The initial fifty partners grew to roughly two hundred organizations across more than fifteen countries. Power companies, water utilities, healthcare systems, hardware vendors — the kind of infrastructure that a lot of people depend on without thinking about it. In those two months, Glasswing partners [found more than ten thousand](https://www.anthropic.com/news/expanding-project-glasswing) high- or critical-severity security flaws. Ten thousand. That's the model doing exactly what they built it to do — finding the bugs before someone else does.

Second, Anthropic built the safety layer. [Over a thousand hours of external jailbreak testing](https://www.anthropic.com/news/claude-fable-5-mythos-5), no universal bypass found. They developed classifiers that detect when a query touches cybersecurity, biology, chemistry, or model distillation, and when one triggers, the response comes from Claude Opus 4.8 instead. Not a refusal — a graceful fallback to a still-capable model. The user doesn't hit a wall. They get a slightly less powerful answer.

Third — and this is the part that makes the whole thing click — they measured how often the classifiers actually fire. [Less than five percent of sessions](https://www.anthropic.com/news/claude-fable-5-mythos-5). More than ninety-five percent of the time, you're getting full Mythos-class capability with nothing between you and the model. The leash is barely there.

The naming tells the story. Anthropic [notes in a footnote](https://www.anthropic.com/news/claude-fable-5-mythos-5) that *Fable* comes from the Latin *fabula* — "that which is told" — akin to the Greek *mythos*. Same story, different telling. Same model, different harness. One name for the restricted version used by cyberdefenders. Another for the version everyone else gets. CyberScoop [called it](https://cyberscoop.com/anthropic-claude-fable-5-release-mythos-guardrails/) "Mythos on a leash," and honestly, that's the most accurate two-word summary I've seen.

---

## What It Can Do

I'm not going to list benchmarks at you. But a few things that companies reported during early testing are worth sitting with.

Stripe took a fifty-million-line Ruby codebase and [ran a full migration in one day](https://www.anthropic.com/news/claude-fable-5-mythos-5). Their team estimated that same migration would have taken over two months by hand. Cursor's CEO said Fable 5 [opened "a class of long-horizon problems that were out of reach for earlier models."](https://www.anthropic.com/news/claude-fable-5-mythos-5) One of Anthropic's internal partners reported that on frontier physics research, Fable 5 [got to results in 36 hours](https://www.anthropic.com/news/claude-fable-5-mythos-5) that GPT-5.5 reached after four days — using a third of the reasoning tokens.

On one benchmark that actually matters to me — [SWE-bench Pro](https://www.digitalapplied.com/blog/claude-fable-5-mythos-5-release-benchmarks-2026), which throws hard, multi-step software problems at models — Fable 5 scores 80.3%. Opus 4.8 gets 69.2%. GPT-5.5 lands at 58.6%. That's not an incremental lead. That's a gap where the model is solving problems the others can't.

And then there's the Pokémon thing. Earlier Claude models [couldn't beat Pokémon FireRed](https://www.anthropic.com/news/claude-fable-5-mythos-5) even with an elaborate helper system giving them maps, navigation tools, and extra game state. Fable 5 beat the game with nothing but raw screenshots — a minimal, vision-only setup. It feels like a toy benchmark until you realize what it actually tests: sustained autonomous reasoning over hundreds of sequential decisions, with no scaffold to lean on.

That last part is what matters in practice. It's not that the model is smarter at any single step. It's that it stays coherent over longer horizons without drifting.

---

## The Personal Part

I'll be direct about something: this post is being written with the help of Claude Fable 5. I wrote about Mythos being locked away. Now I'm typing `claude-fable-5` into my API calls. That happened in two months.

The experience is noticeably different from Opus 4.8. Not in the obvious "smarter" way — more in the sense that I'm intervening less. Longer autonomous runs before something goes off-track. Fewer moments where I need to course-correct because the model lost the thread of what it was doing. More trust in letting it run without me reading over its shoulder every few minutes.

I think the honest description is that the model hit a threshold where my role shifted. With Opus I was reviewing. With Fable I'm approving. The difference sounds small until you notice that it frees up a different kind of attention.

---

## What This Actually Means

Here's what's been turning in my head since the announcement dropped this morning.

The same model is the weapon and the tool. The intelligence that found thousands of zero-days is the same intelligence migrating a fifty-million-line codebase. The brain that could chain four separate vulnerabilities into a full system takeover is the same brain that stays coherent across hundreds of coding decisions. Security capabilities and general capabilities are not separate things. They're the same thing — deep autonomous reasoning — pointed in different directions.

The only difference between the model too dangerous to release and the model you can use right now is the system wrapped around it. Not the weights. Not the training. The harness.

That validates something I keep coming back to in [this series](/blog/the-harness-layer/). The model isn't where the value lives anymore. The system around the model is. Anthropic just proved it at the grandest scale imaginable: you can take the most dangerous model ever built and make it safe for general use by building a better harness. The model didn't change. Everything around it did.

---

## The Business Move

I'd be ignoring something if I didn't note the timing. Anthropic [confidentially filed their IPO prospectus](https://www.cnbc.com/2026/06/02/anthropic-mythos-ai-project-glasswing.html) the same week they expanded Glasswing. A week later they release the model to the public. They priced it at [$10 per million input tokens and $50 per million output](https://www.anthropic.com/news/claude-fable-5-mythos-5) — less than half what Mythos Preview cost. It's [available on AWS Bedrock](https://aws.amazon.com/blogs/aws/anthropic-claude-fable-5-on-aws-mythos-class-capabilities-with-built-in-safeguards-now-available/), [GitHub Copilot](https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/), Vertex AI, and Microsoft Foundry from day one.

That's not cautious distribution. That's maximum reach on day one. They went from "nobody can have this" to "everyone can have this on every platform" in sixty-three days. The safety layer didn't just solve a technical problem. It solved a business problem.

And there's a harder question underneath: what does it mean that you can now rent the most capable model ever built for ten dollars per million tokens? The asymmetry that made Mythos scary — an AI finding critical vulnerabilities for fifty dollars — doesn't go away because the model changed its name. It just means the same asymmetry now applies to every problem, not just security. The cost of solving hard problems with AI models dropped by half in two months.

---

## What Comes Next

I don't know. And I want to be honest about that uncertainty rather than wrap things up with a confident prediction.

What I do know: in April, a model that was too powerful to release existed behind a locked door. In June, that model is running on my machine. The gap between "frontier capability" and "generally available" compressed from years to months. If Fable 5 is what happens when you build a safety layer around Mythos Preview, what happens when the next Mythos-class model arrives and the safety layer is already built?

The pace hasn't slowed down. If anything, today proves it's faster than the timeline I mapped out [five months ago](/blog/from-programmer-to-orchestrator/). The revolution I called "silent" keeps getting louder.

Let's keep building.

---

## Resources

- [Claude Fable 5 and Claude Mythos 5 — Anthropic](https://www.anthropic.com/news/claude-fable-5-mythos-5) — Official launch announcement with benchmarks, safeguards, and availability details
- [Expanding Project Glasswing — Anthropic](https://www.anthropic.com/news/expanding-project-glasswing) — June 2 expansion to 150 organizations in 15+ countries
- [Claude Fable 5 on AWS — AWS News Blog](https://aws.amazon.com/blogs/aws/anthropic-claude-fable-5-on-aws-mythos-class-capabilities-with-built-in-safeguards-now-available/) — Bedrock availability and integration details
- [Claude Fable 5 for GitHub Copilot — GitHub Changelog](https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/) — Copilot integration and data retention policy
- [Anthropic's new model is Mythos on a leash — CyberScoop](https://cyberscoop.com/anthropic-claude-fable-5-release-mythos-guardrails/) — Security analysis of the safeguard architecture
- [Claude Fable 5 & Mythos 5: The Frontier, Split in Two — Digital Applied](https://www.digitalapplied.com/blog/claude-fable-5-mythos-5-release-benchmarks-2026) — Detailed benchmark comparison across frontier models
- [Claude API Models Overview — Anthropic Docs](https://platform.claude.com/docs/en/about-claude/models/overview) — Technical specs, pricing, and API identifiers
