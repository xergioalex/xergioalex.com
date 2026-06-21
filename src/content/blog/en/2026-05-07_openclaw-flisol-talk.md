---
title: "OpenClaw at FLISOL: The Lobster That Took Over Open Source"
description: "My FLISOL talk at UTP Pereira: the story of OpenClaw and its creator Peter Steinberger, and how a one-hour WhatsApp bot reshaped the AI-agent world."
pubDate: "2026-05-07"
heroImage: "/images/blog/posts/openclaw-flisol-talk/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "talks", "ai-agents", "openclaw"]
keywords: ["OpenClaw talk", "FLISOL 2026", "Peter Steinberger", "personal AI agent", "open source AI agent", "FLISOL UTP Pereira", "OpenClaw history"]
relatedSlide: openclaw-your-assistant-your-machine-your-rules
---

I'm at **FLISOL** with a microphone in one hand and a pair of red lobster antennae on my head, telling the story of a project that went from a one-hour WhatsApp bot to one of the most important things to happen to open source all year: **OpenClaw**. FLISOL — the *Festival Latinoamericano de Software Libre* — is the largest free-software gathering in Latin America, run on the same day across dozens of cities, and this edition lives at the **Universidad Tecnológica de Pereira**, hosted by the Facultad de Ingenierías alongside ASE UTP, QA CONF, Ubuntu Colombia, and FOREST.

I'm telling this story at this festival on purpose. OpenClaw isn't just a clever piece of software — it's an open-source story, and FLISOL is exactly the room where that part matters most.

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/flyer.webp"
     alt="OpenClaw FLISOL talk flyer: 'Tu asistente. Tu máquina. Tus reglas.' with the OpenClaw architecture diagram, Sergio Florez (CTO de DailyBot, @xergioalex), and FLISOL, UTP, ASE UTP, QA CONF, Ubuntu Colombia and FOREST logos"
     width="1672"
     height="941"
     loading="lazy" />
<figcaption>The talk flyer — OpenClaw's "Your assistant. Your machine. Your rules." landing at the FLISOL edition hosted by UTP.</figcaption>
</figure>

## Why OpenClaw belongs on a free-software stage

OpenClaw runs on *your* machine, under *your* rules, driven by an AI model *you* choose — and the whole thing is configured in plain Markdown, no code required. Its tagline says it in six words: *"Your assistant. Your machine. Your rules."* That's not a marketing line bolted on after the fact; it's the design. The agent isn't rented from a platform or locked behind someone else's servers. It's yours.

That is a deeply free-software idea, which is why FLISOL is the right place to tell it. The whole point of a festival like this is that the tools shaping our lives should be open, inspectable, and owned by the people who use them. OpenClaw takes that principle and aims it at the one piece of software everyone is suddenly racing to control: the personal AI agent. I've already written the full story in my deep-dive, [OpenClaw: Your Assistant. Your Machine. Your Rules.](/blog/openclaw-your-assistant-your-machine-your-rules/), and the slides for this session live in [the companion deck](/slides/openclaw-your-assistant-your-machine-your-rules/) — so up here I can move fast and stay on the narrative.

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-02.webp"
     alt="Sergio presenting the 'Construido en abierto' slide: OpenClaw as an open-source personal agent built on transparency, community, collaboration and freedom"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>"Built in the open" — the four pillars I anchor the talk on: transparency, community, collaboration, freedom.</figcaption>
</figure>

## The story I'm here to tell

OpenClaw's origin sounds made up, and that's half of why it's fun to tell. **Peter Steinberger** — the Austrian developer behind PSPDFKit, who walked away from a successful company and then spent a couple of years burned out and unable to write code — got annoyed that he couldn't talk to Claude from WhatsApp. So he built a bridge in about an hour, asked Claude what to call it, got "Clawdbot," pushed it to GitHub, and went to sleep.

For two months almost nothing happened. Then the curve broke physics: thousands of stars in a day, tens of thousands in a weekend, past React's decade-long total in roughly sixty days. I won't re-run every number here — that's what the [deep-dive](/blog/openclaw-your-assistant-your-machine-your-rules/) is for — but up here the star-history chart does the work for me.

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-03.webp"
     alt="Sergio at the screen showing the Star History chart comparing OpenClaw, React and Linux, with OpenClaw's line shooting almost vertically off the top"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>That near-vertical red line is OpenClaw — overtaking React and Linux in weeks, not decades.</figcaption>
</figure>

Then comes the part the room enjoys most: the triple rebrand. A cease-and-desist from Anthropic (Clawdbot sounded too much like Claude), a 5am Discord rename to **Moltbot**, crypto scammers grabbing the freed-up handle to pump a fake `$CLAWD` token, a wave of harassment from the people they scammed — and, days later, a third and final name: **OpenClaw**. Three names in under a week, one lobster mascot that survives all of it.

<figure>
<img src="/images/blog/posts/openclaw-flisol-talk/memories-04.webp"
     alt="Sergio presenting the rebrand slide explaining the handle change from @clawdbot to @moltbot and the pump-and-dump scam"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>Telling the rebrand chaos: Clawdbot → Moltbot → OpenClaw, with a crypto scam in the middle.</figcaption>
</figure>

And then the bigger point, the one I most want a free-software audience to sit with: OpenClaw doesn't just grow — it drags the whole ecosystem forward. Agents get their own social network (Moltbook, which Meta snapped up three months after launch), their own payment, identity, and email infrastructure, an enterprise layer from NVIDIA (NemoClaw), and a swarm of community clones small enough to run on a Raspberry Pi. After OpenClaw, every big assistant has to add file access, real execution, and integrations just to keep up. An open-source weekend project reset the minimum bar for what "an agent" even means.

## What it comes down to

If there's one idea I want to land at FLISOL, it's that none of this comes out of a boardroom. It comes from one developer scratching his own itch, building in the open, and letting a community run with it. That's the oldest story in free software — Linux, WordPress, Wikipedia — and OpenClaw is just its newest, fastest chapter. The full argument lives in [the deck](/slides/openclaw-your-assistant-your-machine-your-rules/) and the [deep-dive post](/blog/openclaw-your-assistant-your-machine-your-rules/); the short version is the one I leave the room with, borrowed from Peter himself: the lobster is loose, and it's not going back into the tank.

## Scenes from FLISOL

The best part of a festival like this isn't the slides — it's a room full of people who actually care that their tools stay open.

<figure>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;align-items:start;">
<img src="/images/blog/posts/openclaw-flisol-talk/memories-01.webp"
     alt="Sergio and a co-host on stage, both wearing red lobster antennae, holding the OpenClaw FLISOL poster in front of the big OpenClaw projection"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
<img src="/images/blog/posts/openclaw-flisol-talk/memories-06.webp"
     alt="The OpenClaw cover slide projected on the big screen with the FLISOL, UTP, ASE UTP, QA CONF, Ubuntu Colombia and FOREST logos"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
</div>
<figcaption>Lobster antennae mandatory — wrapping with the FLISOL edition poster, and the cover with the full host strip: FLISOL · UTP · ASE UTP · QA CONF · Ubuntu Colombia · FOREST.</figcaption>
</figure>

<figure>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;align-items:start;">
<img src="/images/blog/posts/openclaw-flisol-talk/memories-05.webp"
     alt="Wide shot of Sergio on stage presenting the slide about how OpenClaw's early days felt wild"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
<img src="/images/blog/posts/openclaw-flisol-talk/memories-07.webp"
     alt="The closing 'Gracias' slide with Sergio's contact details, speaker on stage"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
</div>
<figcaption>The "wild early days" slide, and the closing thank-you.</figcaption>
</figure>

---

## Resources

- [FLISOL — Festival Latinoamericano de Software Libre](https://flisol.info/) — the event this talk is part of
- [OpenClaw: Your Assistant. Your Machine. Your Rules.](/blog/openclaw-your-assistant-your-machine-your-rules/) — the full written story behind the talk
- [The OpenClaw talk deck](/slides/openclaw-your-assistant-your-machine-your-rules/) — the slides for this session
- [OpenClaw](https://openclaw.ai/) — the official project site
- [OpenClaw on GitHub](https://github.com/openclaw/openclaw) — the repository
