---
title: "The Harness Layer: The System Around the Model"
description: "Harness engineering is the new way to steer AI agents — the system around the model that checks its work and stops it repeating the same mistake."
pubDate: "2026-06-12"
heroImage: "/images/blog/posts/the-harness-layer/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "claude"]
keywords: ["harness engineering", "agent harness", "Agent = Model + Harness", "Mitchell Hashimoto harness engineering", "AI coding agents reliability", "Guides and Sensors harness", "spec-driven development harness"]
series: "working-with-agents"
seriesOrder: 7
draft: false
---

The most important part of an AI agent isn't the model. I know how that sounds — we've spent two years measuring progress by whatever release comes next — but the teams that have pushed agents the furthest keep arriving at the same conclusion from different directions: what separates a reliable agent from a disappointing one is almost never the intelligence inside it. It's the system around it.

That system now has a name: **harness engineering**. If prompt engineering was the skill of the chatbot era, this is the skill of the agent era: it's no longer about asking the model for things in better ways — it's about building the environment that checks what it does, catches what it breaks, and turns every mistake into a permanent fix.

---

## Agent = Model + Harness

The cleanest way I've seen it put comes from Vivek Trivedy — product lead at LangChain, the company behind one of the most widely used frameworks for building LLM applications and agents — in a piece called [*The Anatomy of an Agent Harness*](https://langchain-blog.ghost.io/the-anatomy-of-an-agent-harness/): **"Agent = Model + Harness."** The model is the intelligence. The harness is everything else — and "everything else" is doing more work than it sounds. His definition is worth quoting exactly: *"A harness is every piece of code, configuration, and execution logic that isn't the model itself."*

System prompts. The tools the agent can call. The skills it can read. The orchestration that decides when to spawn a sub-agent or hand off. The hooks that run a linter before a change is accepted. All of that is harness. The model sits in the middle of it like an engine sits inside a car — essential, and also not the part that keeps you on the road.

<figure>
<img
  src="/images/blog/posts/the-harness-layer/model-plus-harness.webp"
  alt="An exploded holographic wireframe of a car with a small friendly robot sitting in the engine bay, surrounded by labeled harness components: system prompt, tools, skills, orchestration, hooks. Above it, the equation 'Agent = Model + Harness'."
  width="1200"
  height="1200"
  loading="lazy"
  class="prose-img-md"
/>
<figcaption>The model sits inside the agent like an engine inside a car — essential, and still the smallest part of the machine.</figcaption>
</figure>

What makes the framing land isn't the diagram, it's the evidence. LangChain reported that they *"improved our coding agent Top 30 to Top 5 on Terminal Bench 2.0 by only changing the harness."* Same model. They didn't fine-tune anything, didn't wait for a smarter release. They rebuilt the scaffolding around a fixed model and jumped twenty-five places on a benchmark. If you've spent the last two years assuming progress comes from the next model drop, that result rearranges something.

And it rearranges it in a counterintuitive direction: in a production agent, the model turns out to be the smallest part. Most of what determines whether the agent is useful lives outside it.

"Changing the harness" sounds vague until you list what's actually on the table. You can rewrite the system prompt so the agent reasons in a different order. You can hand it a sharper set of tools, or take away the ones it keeps misusing. You can change how the repository is laid out so the agent finds the right file instead of inventing one. You can add a hook that runs the test suite after every edit and refuses to accept changes that break it. You can split a job into smaller pieces so the agent never holds more in its head than it can keep straight. None of those touch the model. All of them change what the agent does. That menu — long, mundane, entirely in your control — is the surface harness engineering works on.

And one of the components Trivedy lists, right alongside tools and orchestration, is *skills*. That's the bridge from [the piece on skills in this series](/blog/the-skill-layer/). A skill teaches an agent a capability it didn't have. The harness is the larger system that decides when that capability runs, whether the agent was allowed to run it, and whether the result is good enough to keep. Skills are a component *inside* the harness. The harness is the frame the skills hang on.

---

## Why the word showed up in 2026

The term comes from [Mitchell Hashimoto](https://mitchellh.com/writing/my-ai-adoption-journey) — the person behind Terraform and a lot of HashiCorp — who named it in February 2026 in an essay about his own slow, stubborn adoption of AI. One of the steps he describes is *"engineer the harness,"* and his definition is the whole idea compressed into a sentence: *"anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again."*

That's it. That's the discipline. Not a framework, not a product — a habit. Every mistake becomes a permanent fix, so the same mistake can't come back.

I want to be precise about what Hashimoto did and didn't invent, because the credit matters and it's easy to overstate. He named the *practice*. The thing itself — a scaffold wrapped around a model — was already in use and already being called a harness; Anthropic, for one, was [describing the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk) as "a general-purpose agent harness" in 2025. So this isn't a new invention with a launch date. It's an old activity that finally got a name, and the name stuck because a lot of people needed it at once.

The reason they needed it at once is the more interesting part. For two years the bottleneck was the model: it wasn't good enough, so you waited for the next one. Sometime in the last stretch that stopped being true. The models got good enough that the limiting factor moved. The question stopped being *can it write the code* and became *can I trust it to write the code, repeatedly, without me babysitting every line*. That second question isn't a model problem. It's an engineering problem about the environment you put the model in — and engineering problems get disciplines, and disciplines get names.

---

## Guides and sensors

The most useful breakdown of *how* a harness actually works comes from [Martin Fowler's write-up](https://martinfowler.com/articles/harness-engineering.html), which splits it into two halves. There are **guides** — controls that act *before* the agent does something, to steer it away from the bad move in the first place. And there are **sensors** — controls that act *after*, to catch what went wrong and feed it back so the agent can correct itself. Feedforward and feedback. Steer ahead, check behind.

<figure>
<img
  src="/images/blog/posts/the-harness-layer/control-loop.webp"
  alt="A control loop drawn around an agent: Guides feed in before it acts, Sensors feed back after, looping around."
  width="1200"
  height="1200"
  loading="lazy"
  class="prose-img-md"
/>
<figcaption>A harness has two halves: guides that steer the agent before it acts, and sensors that catch what it gets wrong after.</figcaption>
</figure>

Fowler also draws a line I keep coming back to, between two kinds of check. Some are **computational** — deterministic and fast, the kind a machine settles with a yes or no: a test passes or fails, a type checks or doesn't, a linter is happy or it isn't, a grep finds a missing accent or it doesn't. Others are **inferential** — semantic and slower, where you ask another model to judge whether a piece of writing is in the right voice or a change is actually safe. You want the computational checks doing as much as they can, because they're cheap and they never get tired; you save the inferential ones for the judgments a regex can't make.

All of this can sound academic until you land it on a real repository — this blog's, for example. The guides are the things I wrote down so the agent reads them before it acts: the project's [`AGENTS.md`](https://github.com/xergioalex/xergioalex.com/blob/main/AGENTS.md) with its mandatory rules, the skills that encode how to do a specific job, the plan that forces an agent to take one task at a time instead of sprinting through ten. The sensors are everything that runs after: the build, the type check, the linter, the accent grep, the audit that reads the whole post against a checklist before it's allowed near publication. None of it makes the agent smarter. All of it makes the agent's mistakes cheaper to catch and impossible to ship.

---

## Humans steer, agents execute

If you want to see how far this goes when someone pushes it all the way, the clearest report I've read is [OpenAI's, written by Ryan Lopopolo](https://openai.com/index/harness-engineering/). His thesis is four words: **"Humans steer. Agents execute."**

The numbers behind that thesis: one internal beta product, built over five months, with — this is the claim, stated plainly — zero manually-written lines of code. *"Every line of code,"* he writes, *"application logic, tests, CI configuration, documentation, observability, and internal tooling, has been written by Codex."* A team that started at three engineers and grew to seven shipped around 1,500 pull requests, roughly 3.5 per engineer per day, adding up to about a million lines. Their own estimate is that it took something like a tenth of the time writing it by hand would have.

I could hold numbers like that loosely — it's one team, one internal product, their own estimate, and a company with an obvious interest in the result. But I don't need to take OpenAI's word for it, because I have the version at my own scale: this very repository. The blog you're reading this on has accumulated almost 1,500 commits — the vast majority written in the last few months — and every one of them is the work of AI agents. I don't write the code: I steer — I decide what gets built, I review what matters — and I keep the harness tuned so the agents' output comes out reliable and high-quality. And what I've found is the same thing Lopopolo reports: when you stop writing the code, your time goes into the harness — the repository organized so an agent can navigate it, the invariants enforced centrally so an agent can't quietly break the architecture, the merge gates kept light so progress doesn't stall. The discipline shows up in the scaffolding, not in the code. The job didn't disappear. It moved up a layer.

It's the same move at both ends of the dial — even the number rhymes: their 1,500 pull requests, this blog's almost 1,500 commits. The instinct is identical at any scale: don't get better at correcting the agent, get better at building the system that makes correcting it unnecessary.

---

## Specs are the rules the harness enforces

There's a sibling idea showing up in the same conversations — **spec-driven development** — and it's easy to mistake it for a competing trend. It isn't. It's the other half of the same thing. [Loiane Groner puts the relationship well](https://loiane.com/2026/04/harness-engineering-missing-layer-specs-driven-ai-development/): *"specs define the target state; the harness defines the control system."* Or, even more bluntly: *"Specs-driven development is what makes harness engineering practical. Without it, there is nothing concrete for the harness to enforce."*

A harness with no spec is a thermostat with no temperature set on it — a control system regulating toward nothing. The spec is what you write down so the harness has a target to hold the work against. You say what *correct* means — the goals, the contracts, the acceptance criteria — and the harness's job becomes proving, over and over, that the agent's output still lands inside those lines. Spec says where; harness keeps you there.

This is also why the whole thing fits together as a series rather than a pile of buzzwords. Directing agents is the human role I started this series describing. Skills are the capabilities the agent picks up. Specs are how you write down what you want. And the harness is the machine that makes all of it reliable enough to actually lean on.

---

## A harness gets built one scar at a time

Nothing in this blog's harness was planned as a system. Each piece is a scar — the residue of some specific time an agent did something I didn't want, and I decided once was enough. Even the corrections I give in one session become written rules the next session reads before it starts. The correction stops being something I have to remember to give and becomes something the system gives on my behalf.

The reason any of this matters is that it changes where your attention goes. Once the model isn't the bottleneck, getting more out of your agents stops being about chasing the next release and starts being about the system you build around the one you already have. That's a kind of work most of us already know how to do — it's just engineering, the unglamorous discipline of making a thing reliable — pointed at a new target.

And it doesn't aim to push the human out. Fowler has a line about this that I think is exactly right: a good harness *"should not necessarily aim to fully eliminate human input, but to direct it to where our input is most important."* That's the honest version of the promise. Not no judgment — judgment spent where it counts.

Let's keep building.

---

## Resources

- [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey) — Mitchell Hashimoto's essay where "harness engineering" gets its name
- [The Anatomy of an Agent Harness](https://langchain-blog.ghost.io/the-anatomy-of-an-agent-harness/) — Vivek Trivedy (LangChain) on `Agent = Model + Harness` and the Terminal Bench result
- [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) — Ryan Lopopolo's field report from OpenAI
- [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html) — Martin Fowler on guides, sensors, and computational vs inferential checks
- [Harness Engineering: the missing layer in specs-driven AI development](https://loiane.com/2026/04/harness-engineering-missing-layer-specs-driven-ai-development/) — Loiane Groner on how specs and harnesses fit together
- [This blog's skills and plans](https://github.com/xergioalex/xergioalex.com/tree/main/.agents) — the harness used as the running example throughout the post
