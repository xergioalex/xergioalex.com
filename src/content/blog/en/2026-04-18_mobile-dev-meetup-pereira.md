---
title: "Abril Mobile: The Talk Where I Finally Picked a Mobile Path"
description: "My Abril Mobile talk at Universidad Católica de Pereira: how a backend dev chose a path to learn mobile in 2026 — and why I picked Kotlin Multiplatform."
pubDate: "2026-04-18"
heroImage: "/images/blog/posts/mobile-dev-meetup-pereira/hero-en.webp"
heroLayout: "banner"
tags: ["tech", "talks", "mobile", "kotlin", "flutter"]
keywords: ["learn mobile development 2026", "Kotlin Multiplatform vs Flutter", "Pereira Tech Talks mobile", "mobile development talk", "Abril Mobile", "Kotlin Multiplatform for beginners", "mobile development with AI agents"]
---

On April 18, 2026 I stood on a stage at Universidad Católica de Pereira, microphone in hand, talking about the one part of software I had spent fifteen years avoiding: mobile development. The event was **Abril Mobile**, a [Pereira Tech Talks](https://www.pereiratechtalks.org/q087gp2d-abril-mobile/) meetup, and the irony wasn't lost on me — a backend developer, the guy who always built the API and let someone else build the app, giving a talk about how to actually learn mobile.

That's the angle I wanted to take. Not "here's the expert tour of the mobile ecosystem," but something more honest: *if you've always watched mobile from the outside, what's the sanest way to get in — today, in 2026?*

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/flyer.webp"
     alt="Abril Mobile event flyer: Sergio Florez (Kotlin) and Juan Campuzano (Flutter), organized by Pereira Tech Talks, sponsored by DailyBot, Aumentada, Universidad Católica de Pereira and Vuetify"
     width="1200"
     height="675"
     loading="lazy" />
<figcaption>The Abril Mobile flyer. Two speakers, two frameworks: Kotlin on my side, Flutter on Juan's — the whole evening built around mobile.</figcaption>
</figure>

## Why this talk, from someone who always said "someday"

For most of my career mobile was the "someday" that never arrived. I'd tried more than once — back in university with Eclipse and the ADT plugin, later with hybrid stacks like Cordova and Ionic — and every time I hit the same wall: too much setup, too many seams, and a result that never felt truly native. So I'd retreat to the place I knew, building servers, APIs, and infrastructure.

What changed isn't that mobile got easier overnight. It's that I finally decided to treat "how do I learn this?" as a real engineering question — map the terrain, run the explorations, and commit to a path instead of bouncing off the entry barrier one more time. That decision is the spine of the whole talk. I told the room about the full exploration in my companion write-up, [Mobile Development in 2026: State of the Art and Where to Start Today](/blog/mobile-development-landscape-2026/), and the slides for this session live here: [the mobile landscape deck](/slides/mobile-landscape-2026/).

## The map: four shapes, two survivors

The deck walks through the whole ecosystem, so on stage I kept this part fast. The mobile world takes four shapes — **native** (one platform, full control, full lock-in), **cross-platform with native UI** (shared logic or UI that compiles down to native — where Flutter and Kotlin Multiplatform live), **hybrid** (web inside a native shell — low friction, real ceilings), and **web/PWA** (an installable site, no app store, no native feel).

Then came the quick discards, and they were quick because I'd already lived several of them: native-only loses cross-platform reach, Ionic and Capacitor I'd hit the ceiling on before, .NET MAUI is a world I'm not in, PWAs can't reach deep enough into the device, and React Native is solid but keeps its roots in JavaScript. What's left after that honest cut is two names: **Flutter** and **Kotlin Multiplatform**.

I won't re-explain every framework here — that's exactly what the [deck](/slides/mobile-landscape-2026/) and the [companion post](/blog/mobile-development-landscape-2026/) are for. The talk was about the choice, not the catalog.

## Two philosophies, one goal

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-04.webp"
     alt="Sergio on stage pointing at a slide titled 'Dos filosofías, un mismo camino' comparing Flutter and Kotlin Multiplatform"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>The slide the whole talk pivots on — Flutter and Kotlin Multiplatform, two philosophies aiming at the same goal.</figcaption>
</figure>

Flutter and Kotlin Multiplatform want the same thing — write less, ship to both platforms — but they get there from opposite directions. Flutter says *"trust our renderer, write once":* one engine (Impeller) draws the same UI everywhere, with instant hot reload and a mature package ecosystem. Kotlin Multiplatform says *"share the logic, keep the UI native":* a shared Kotlin layer underneath, with Jetpack Compose on Android and SwiftUI on iOS drawing each platform's real, native interface.

Both are genuinely good bets. The honest version is that they solve slightly different problems — and that's the part I wanted the audience to sit with before I told them where I landed.

## Why I chose Kotlin Multiplatform

I went with **Kotlin Multiplatform**. Not because it's the easy path — it isn't — but because it's the one I find most defensible over the long run. The UI stays 100% native on each platform, the shared logic doesn't compromise the user experience, it backs into existing apps through progressive migration rather than a rewrite, and it has JetBrains plus Google standing behind it with real production adopters using it at scale.

The obvious objection is the learning curve, and it's real: KMP is steeper than Flutter, with two UI layers to keep in mind and an Xcode integration that's still rough at the edges. Here's the thing, though — and this is where I think 2026 genuinely changes the math: **in the age of AI, that curve is far easier to climb than it used to be.** Coding agents turn "months of ramping up in a new ecosystem" into a much faster loop. They scaffold the project, untangle the build errors that used to eat an afternoon, and suggest the platform-specific pieces while you keep your eyes on the architecture. The curve didn't disappear — but the tool that flattens it is sitting right next to you now.

So I made the trade knowingly: a steeper start in exchange for the bet I'd rather be holding in three years.

## A meetup that was all about mobile

I wasn't the only speaker, and that's what made the evening feel complete. **Juan Campuzano** ([juan-campuzano](https://github.com/juan-campuzano)) took the Flutter side, sharing his expertise as a senior software engineer building real mobile products — his talk, *Generative UI - Flutter*, came at the same problem from the other framework.

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-10.webp"
     alt="Juan Campuzano on stage presenting his 'Generative UI - Flutter' talk at Abril Mobile"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Juan Campuzano on the Flutter side — his "Generative UI - Flutter" talk made the night a two-framework conversation.</figcaption>
</figure>

Between the two of us, the whole meetup ended up being a single conversation about mobile from both angles: my case for Kotlin Multiplatform and Juan's for Flutter. If you were on the fence about which path to start with, it was hard to ask for a better side-by-side than hearing each one argued by someone actually building with it.

## Memories from the event

The best part of a Pereira Tech Talks night is never just the slides — it's the room. A full house at Universidad Católica de Pereira, a community that has kept mobile on the agenda for years, and the kind of questions that only come from people who actually want to build something.

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-06.webp"
     alt="Sergio presenting the 'Mi problema con el desarrollo móvil' slide to the audience at Universidad Católica de Pereira"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Opening the talk with "my problem with mobile development" — the tangled setup diagram everyone who's tried to start recognizes instantly.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-03.webp"
     alt="Sergio speaking with a microphone, the Universidad Católica de Pereira table and flags behind him"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>Mid-talk, making the case — Universidad Católica de Pereira hosting.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-07.webp"
     alt="The Abril Mobile audience seated and watching the talk"
     width="960"
     height="1280"
     loading="lazy" />
<figcaption>The room — a community that keeps showing up for this stuff.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-05.webp"
     alt="Group photo of the Abril Mobile attendees and speakers at Universidad Católica de Pereira"
     width="1200"
     height="900"
     loading="lazy" />
<figcaption>The Abril Mobile crew. Thanks to everyone who came out, and to Pereira Tech Talks for keeping the lights on.</figcaption>
</figure>

If you want the full argument behind the talk, the [deck](/slides/mobile-landscape-2026/) and the [companion post](/blog/mobile-development-landscape-2026/) go deeper than I could in one evening. The short version is the one I left the room with: the barrier I used to hit is gone, the tools are ready, and with an agent next to you the steeper path is no longer the scary one.

Let's keep building.

---

## Resources

- [Abril Mobile — Pereira Tech Talks](https://www.pereiratechtalks.org/q087gp2d-abril-mobile/) — the meetup this talk was part of
- [The mobile landscape deck](/slides/mobile-landscape-2026/) — the slides for this talk
- [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html) — JetBrains' approach to sharing logic while keeping native UI per platform
- [Flutter](https://flutter.dev) — Google's cross-platform framework; Dart language, [Impeller](https://docs.flutter.dev/perf/impeller) rendering engine
- [Compose Multiplatform](https://www.jetbrains.com/compose-multiplatform/) — shared UI on top of Kotlin Multiplatform
- [Juan Campuzano on GitHub](https://github.com/juan-campuzano) — co-speaker, Flutter side of the meetup
