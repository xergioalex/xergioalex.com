---
title: "The Moltys Meetup: An OpenClaw Morning at the UTP"
description: "The Moltys meetup at the UTP in Pereira — an OpenClaw community workshop with Cursor where I walk through its history, use cases, and architecture."
pubDate: "2026-04-11"
heroImage: "/images/blog/posts/openclaw-moltys-meetup-utp/hero-en.webp"
heroLayout: "side-by-side"
tags: ["talks", "tech", "ai-agents", "openclaw"]
keywords: ["OpenClaw meetup", "Moltys community", "OpenClaw workshop UTP Pereira", "Cursor OpenClaw event", "OpenClaw use cases architecture", "OpenClaw community Colombia"]
---

The easiest way to spot a **Moltys meetup** is the room full of people wearing little red lobster claws on their heads. It's a gathering of the OpenClaw community, and this one is at the Universidad Tecnológica de Pereira, with the support of [Cursor](https://cursor.com), with me as one of the people leading the workshop. If you know OpenClaw, the lobster headbands make sense; if you don't, that's the first thing worth explaining.

A Moltys meetup isn't a conference talk where one person presents and everyone else listens. The idea is the opposite: open the floor and let the community show what they're actually building with OpenClaw. People come to share their own setups, their experiments, the weird and useful things they've wired up — and the morning turns into a back-and-forth instead of a lecture. That format is the part I like most. You learn far more from ten people's real projects than from one polished slide deck.

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-03.webp"
     alt="A hand holding up a red lobster-claw headband, the Moltys mascot, with the seated audience blurred behind"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>The lobster is OpenClaw's mascot — so the room comes with claws. The unofficial uniform of a Moltys meetup.</figcaption>
</figure>

## My part: history, use cases, architecture

My job is to set the table — share my own experience with OpenClaw so the rest of the morning has a common starting point. I keep it to three things: where it came from, what people actually use it for, and how it's put together underneath.

The history is a good story, and I won't retell all of it here — it's exactly what pushed me to write a separate, much longer piece on OpenClaw. The short version is the arc: a personal AI agent that runs on your own machine, configured in plain Markdown, talking to you through the messaging apps you already use, and connecting to whatever model you choose. From there it grew into one of the fastest-moving open-source projects anyone has seen.

For the architecture I go to the whiteboard, because it's easier to draw than to describe. An agent at the top, OpenClaw in the middle, a gateway fanning out to Telegram, WhatsApp, and Slack, and a set of tools hanging off the side — APIs, skills, MCP tools, shells. That one sketch explains most of what makes the thing tick.

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-01.webp"
     alt="Two presenters at a whiteboard with a hand-drawn OpenClaw architecture diagram: an agent connected to OpenClaw, a gateway fanning out to Telegram, WhatsApp and Slack, and a tools box listing APIs, skills, MCP tools and shells"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>The architecture on a whiteboard: agent → OpenClaw → gateway → Telegram/WhatsApp/Slack, with tools (APIs, skills, MCP, shells) on the side.</figcaption>
</figure>

If you want the full version — the person behind OpenClaw, the technical decisions, the community chaos, and where personal computing goes from here — that's the piece I go deep in: [OpenClaw: Your Assistant. Your Machine. Your Rules.](/blog/openclaw-your-assistant-your-machine-your-rules/). Getting ready for a morning like this is exactly what makes me want to write it all down properly.

## The best part is the room

The slides and the whiteboard are the excuse; the people are the point. What makes it a good morning is sharing a few hours with a community that's actually curious about this stuff — comparing setups, asking the kind of questions that only come from people who've already tried something and hit a wall, and trading the small tricks that never make it into documentation.

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-02.webp"
     alt="A presenter in a green shirt explaining while another person writes on the OpenClaw diagram, with an attendee in a lobster headband in the foreground"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>Workshop, not lecture — the floor keeps moving between whoever has something to show.</figcaption>
</figure>

Thanks to the UTP for hosting us, to Cursor for backing the event, and to everyone who shows up with their projects and their claws on. Mornings like this are why local communities matter — you walk out with more than you walked in with.

## Memories from the event

<figure>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;align-items:start;">
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-04.webp"
     alt="The audience seated in the UTP room watching the workshop, the speakers' table at the right"
     width="1200"
     height="900"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-05.webp"
     alt="Attendees seated, several wearing lobster-claw headbands, with the city skyline visible through the windows"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
</div>
<figcaption>A full room at the UTP — claws on, attention up.</figcaption>
</figure>

<figure>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;align-items:start;">
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-06.webp"
     alt="Behind-the-scenes of the live A/V setup: two laptops and a camera on a tripod, with the lobster headband resting on the desk"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-07.webp"
     alt="Group photo of the Moltys meetup attendees and speakers in the UTP room"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
</div>
<figcaption>Behind the scenes, and the whole Moltys crew — thanks for coming out.</figcaption>
</figure>

Let's keep building.

---

## Resources

- [OpenClaw](https://openclaw.ai) — the personal AI agent the whole morning is about ([docs](https://docs.openclaw.ai))
- [OpenClaw: Your Assistant. Your Machine. Your Rules.](/blog/openclaw-your-assistant-your-machine-your-rules/) — the in-depth history behind the talk
- [Cursor](https://cursor.com) — the AI code editor that backs the event
- [Universidad Tecnológica de Pereira](https://www.utp.edu.co) — our hosts for the morning
