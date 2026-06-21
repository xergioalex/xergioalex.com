---
title: "The Moltys Meetup: An OpenClaw Morning at the UTP"
description: "A recap of the Moltys meetup at the UTP in Pereira — an OpenClaw community workshop with Cursor where I shared its history, use cases, and architecture."
pubDate: "2026-04-11"
heroImage: "/images/blog/posts/openclaw-moltys-meetup-utp/hero-en.webp"
heroLayout: "side-by-side"
tags: ["talks", "tech", "ai-agents", "openclaw"]
keywords: ["OpenClaw meetup", "Moltys community", "OpenClaw workshop UTP Pereira", "Cursor OpenClaw event", "OpenClaw use cases architecture", "OpenClaw community Colombia"]
---

On April 11, 2026 I spent a morning at the Universidad Tecnológica de Pereira with a room full of people wearing little red lobster claws on their heads. The event was a **Moltys meetup** — a gathering of the OpenClaw community — run with the support of [Cursor](https://cursor.com), and I was one of the people leading the workshop. If you know OpenClaw, the lobster headbands make sense; if you don't, that's the first thing worth explaining.

A Moltys meetup isn't a conference talk where one person presents and everyone else listens. The whole idea was the opposite: open the floor and let the community show what they're actually building with OpenClaw. People came to share their own setups, their experiments, the weird and useful things they'd wired up — and the morning turned into a back-and-forth instead of a lecture. That format is the part I liked most. You learn far more from ten people's real projects than from one polished slide deck.

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-03.webp"
     alt="A hand holding up a red lobster-claw headband, the Moltys mascot, with the seated audience blurred behind"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>The lobster is OpenClaw's mascot — so the room came with claws. The unofficial uniform of a Moltys meetup.</figcaption>
</figure>

## My part: history, use cases, architecture

My job was to set the table — share my own experience with OpenClaw so the rest of the morning had a common starting point. I kept it to three things: where it came from, what people actually use it for, and how it's put together underneath.

The history is a good story, and I won't retell all of it here — that's exactly what pushed me to write a separate, much longer piece a couple of days later. The short version on stage was the arc: a personal AI agent that runs on your own machine, configured in plain Markdown, talking to you through the messaging apps you already use, and connecting to whatever model you choose. From there it grew into one of the fastest-moving open-source projects anyone had seen.

For the architecture I went to the whiteboard, because it's easier to draw than to describe. An agent at the top, OpenClaw in the middle, a gateway fanning out to Telegram, WhatsApp, and Slack, and a set of tools hanging off the side — APIs, skills, MCP tools, shells. That one sketch explains most of what makes the thing tick.

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-01.webp"
     alt="Two presenters at a whiteboard with a hand-drawn OpenClaw architecture diagram: an agent connected to OpenClaw, a gateway fanning out to Telegram, WhatsApp and Slack, and a tools box listing APIs, skills, MCP tools and shells"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>The architecture on a whiteboard: agent → OpenClaw → gateway → Telegram/WhatsApp/Slack, with tools (APIs, skills, MCP, shells) on the side.</figcaption>
</figure>

If you want the full version — the person behind OpenClaw, the technical decisions, the community chaos, and where personal computing goes from here — that's the post the talk turned into: [OpenClaw: Your Assistant. Your Machine. Your Rules.](/blog/openclaw-your-assistant-your-machine-your-rules/). Preparing for this morning is what made me sit down and write it.

## The best part was the room

The slides and the whiteboard were the excuse; the people were the point. What made it a good morning was sharing a few hours with a community that's actually curious about this stuff — comparing setups, asking the kind of questions that only come from people who've already tried something and hit a wall, and trading the small tricks that never make it into documentation.

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-02.webp"
     alt="A presenter in a green shirt explaining while another person writes on the OpenClaw diagram, with an attendee in a lobster headband in the foreground"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Workshop, not lecture — the floor kept moving between whoever had something to show.</figcaption>
</figure>

Thanks to the UTP for hosting us, to Cursor for backing the event, and to everyone who showed up with their projects and their claws on. Mornings like this are why local communities matter — you walk out with more than you walked in with.

## Memories from the event

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-04.webp"
     alt="The audience seated in the UTP room watching the workshop, the speakers' table at the right"
     width="1200"
     height="900"
     loading="lazy" />
<figcaption>A full room at the UTP, following along.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-05.webp"
     alt="Attendees seated, several wearing lobster-claw headbands, with the city skyline visible through the windows"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Claws on, attention up — the community in its natural habitat.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-06.webp"
     alt="Behind-the-scenes of the live A/V setup: two laptops and a camera on a tripod, with the lobster headband resting on the desk"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Behind the scenes — the crew keeping the stream and the recording alive.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/openclaw-moltys-meetup-utp/memories-07.webp"
     alt="Group photo of the Moltys meetup attendees and speakers in the UTP room"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>The Moltys crew. Thanks for coming out — let's do it again.</figcaption>
</figure>

Let's keep building.

---

## Resources

- [OpenClaw](https://openclaw.ai) — the personal AI agent the whole morning was about ([docs](https://docs.openclaw.ai))
- [OpenClaw: Your Assistant. Your Machine. Your Rules.](/blog/openclaw-your-assistant-your-machine-your-rules/) — the in-depth history this talk turned into
- [Cursor](https://cursor.com) — the AI code editor that backed the event
- [Universidad Tecnológica de Pereira](https://www.utp.edu.co) — our hosts for the morning
