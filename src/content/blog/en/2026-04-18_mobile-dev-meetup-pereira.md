---
title: "Abril Mobile: The Talk Where I Finally Picked a Mobile Path"
description: "My Abril Mobile talk at Universidad Católica de Pereira: how a backend dev chose a path to learn mobile in 2026 — and why I picked Kotlin Multiplatform."
pubDate: "2026-04-18"
heroImage: "/images/blog/posts/mobile-dev-meetup-pereira/hero-en.webp"
heroLayout: "side-by-side"
tags: ["tech", "talks", "mobile", "kotlin", "flutter"]
keywords: ["learn mobile development 2026", "Kotlin Multiplatform vs Flutter", "Pereira Tech Talks mobile", "mobile development talk", "Abril Mobile", "Kotlin Multiplatform for beginners", "mobile development with AI agents"]
---

I just stepped off the stage at Universidad Católica de Pereira, where I gave a talk about the one corner of software I'd spent fifteen years circling without ever landing on: mobile development. The event is **Abril Mobile**, a [Pereira Tech Talks](https://www.pereiratechtalks.org/q087gp2d-abril-mobile/) meetup.

Here's the honest backdrop. I've been full stack my whole career, and I've always made a point of learning every technology I could get my hands on — backend, frontend, infrastructure, DevOps. If something new catches my eye, I dig into it; that's just how I work. Mobile was the stubborn exception — not for lack of interest, but because every time I leaned in, something pushed me back. Early on it was as basic as hardware: I didn't have a computer that could run the tooling of the day, and that alone was enough to send me back to the server side. So mobile kept getting filed under "someday."

That's the angle I want to take here. Not "the expert tour of the mobile ecosystem," but something more honest: *if you've always watched mobile from the outside, what's the sanest way to get in?*

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/flyer.webp"
     alt="Abril Mobile event flyer: Sergio Florez (Kotlin) and Juan Campuzano (Flutter), organized by Pereira Tech Talks, sponsored by DailyBot, Aumentada, Universidad Católica de Pereira and Vuetify"
     width="1200"
     height="675"
     loading="lazy" />
<figcaption>The Abril Mobile flyer. Two speakers, two frameworks: Kotlin on my side, Flutter on Juan's — the whole evening built around mobile.</figcaption>
</figure>

## Why this talk, from someone who always said "someday"

That barrier was never really about interest — it was logistics. Back in university the official IDE was Eclipse with the ADT plugin, and my humble laptop simply couldn't run it: it wouldn't start, or it would start and swallow all the memory in a compile loop that felt eternal. Years later I tried again with hybrid stacks like Cordova and Ionic, and hit a different wall — too many seams, and a result that never felt truly native. So each time I'd retreat to the place I knew: servers, APIs, and infrastructure.

What changed isn't that mobile got easier overnight. It's that I finally decided to treat "how do I learn this?" as a real engineering question — map the terrain, run the explorations, and commit to a path instead of bouncing off the entry barrier one more time. That decision is the spine of the talk. I lay out the full exploration in my companion write-up, [Mobile Development in 2026: State of the Art and Where to Start Today](/blog/mobile-development-landscape-2026/), and the slides for it live here: [the mobile landscape deck](/slides/mobile-landscape-2026/).

## The map: four shapes, two survivors

The deck walks through the whole ecosystem, so I'll keep this part fast. The mobile world takes four shapes — **native** (one platform, full control, full lock-in), **cross-platform with native UI** (shared logic or UI that compiles down to native — where Flutter and Kotlin Multiplatform live), **hybrid** (web inside a native shell — low friction, real ceilings), and **web/PWA** (an installable site, no app store, no native feel).

Then the quick discards — quick because I've already lived several of them: native-only loses cross-platform reach, Ionic and Capacitor I've hit the ceiling on before, .NET MAUI is a world I'm not in, PWAs can't reach deep enough into the device, and React Native is solid but keeps its roots in JavaScript. What's left after that honest cut is two names: **Flutter** and **Kotlin Multiplatform**.

I won't re-explain every framework here — that's exactly what the [deck](/slides/mobile-landscape-2026/) and the [companion post](/blog/mobile-development-landscape-2026/) are for. This is about the choice, not the catalog.

## Two philosophies, one goal

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-04.webp"
     alt="Sergio on stage pointing at a slide titled 'Dos filosofías, un mismo camino' comparing Flutter and Kotlin Multiplatform"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>The slide the whole talk pivots on — Flutter and Kotlin Multiplatform, two philosophies aiming at the same goal.</figcaption>
</figure>

Flutter and Kotlin Multiplatform want the same thing — write less, ship to both platforms — but they get there from opposite directions. Flutter says *"trust our renderer, write once":* one engine (Impeller) draws the same UI everywhere, with instant hot reload and a mature package ecosystem. Kotlin Multiplatform says *"share the logic, keep the UI native":* a shared Kotlin layer underneath, with Jetpack Compose on Android and SwiftUI on iOS drawing each platform's real, native interface.

Both are genuinely good bets. The honest version is that they solve slightly different problems — and that's the part worth sitting with before I tell you where I land.

## Why I chose Kotlin Multiplatform

My pick is **Kotlin Multiplatform**. Not because it's the easy path — it isn't — but because it's the one I find most defensible over the long run. The UI stays 100% native on each platform, the shared logic doesn't compromise the user experience, it backs into existing apps through progressive migration rather than a rewrite, and it has JetBrains plus Google standing behind it with real production adopters using it at scale.

The obvious objection is the learning curve, and it's real: KMP is steeper than Flutter, with two UI layers to keep in mind and an Xcode integration that's still rough at the edges. Here's the thing, though — and this is where I think the AI era genuinely changes the math: **that curve is far easier to climb than it used to be.** Coding agents turn "months of ramping up in a new ecosystem" into a much faster loop. They scaffold the project, untangle the build errors that used to eat an afternoon, and suggest the platform-specific pieces while you keep your eyes on the architecture. The curve didn't disappear — but the tool that flattens it is sitting right next to you now.

So it's a trade I'm making knowingly: a steeper start in exchange for the bet I'd rather be holding in three years.

## A meetup that was all about mobile

I'm not the only speaker, and that's what makes the night feel complete. **Juan Campuzano** ([juan-campuzano](https://github.com/juan-campuzano)) takes the Flutter side, sharing his expertise as a senior software engineer building real mobile products — his talk, *Generative UI - Flutter*, comes at the same problem from the other framework.

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-10.webp"
     alt="Juan Campuzano on stage presenting his 'Generative UI - Flutter' talk at Abril Mobile"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>Juan Campuzano on the Flutter side — his "Generative UI - Flutter" talk makes the night a two-framework conversation.</figcaption>
</figure>

Between the two of us, the whole meetup is a single conversation about mobile from both angles: my case for Kotlin Multiplatform and Juan's for Flutter. If you're on the fence about which path to start with, it's hard to ask for a better side-by-side than hearing each one argued by someone actually building with it.

## Memories from the event

The best part of a Pereira Tech Talks night is never just the slides — it's the room. A full house at Universidad Católica de Pereira, a community that has kept mobile on the agenda for years, and the kind of questions that only come from people who actually want to build something.

<figure>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;align-items:start;">
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-06.webp"
     alt="Sergio presenting the 'Mi problema con el desarrollo móvil' slide to the audience at Universidad Católica de Pereira"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-03.webp"
     alt="Sergio speaking with a microphone, the Universidad Católica de Pereira table and flags behind him"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
</div>
<figcaption>On stage at Universidad Católica de Pereira — opening with "my problem with mobile development," then mid-talk making the case.</figcaption>
</figure>

<figure>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;align-items:start;">
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-01.webp"
     alt="Sergio at the podium presenting, with the 'why mobile development was always someday' slide behind him"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-07.webp"
     alt="The Abril Mobile audience seated and watching the talk"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
</div>
<figcaption>From the podium to the seats — a full room that kept the questions coming.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-05.webp"
     alt="Group photo of the Abril Mobile attendees and speakers at Universidad Católica de Pereira"
     width="1200"
     height="900"
     loading="lazy" />
<figcaption>The Abril Mobile crew. Thanks to everyone who came out, and to Pereira Tech Talks for keeping the lights on.</figcaption>
</figure>

If you want the full argument behind the talk, the [deck](/slides/mobile-landscape-2026/) and the [companion post](/blog/mobile-development-landscape-2026/) go deeper than I can here. The short version is the one I keep coming back to: the barrier I used to hit is gone, the tools are ready, and with an agent next to you the steeper path is no longer the scary one.

Let's keep building.

---

## Resources

- [Abril Mobile — Pereira Tech Talks](https://www.pereiratechtalks.org/q087gp2d-abril-mobile/) — the meetup this talk was part of
- [The mobile landscape deck](/slides/mobile-landscape-2026/) — the slides for this talk
- [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html) — JetBrains' approach to sharing logic while keeping native UI per platform
- [Flutter](https://flutter.dev) — Google's cross-platform framework; Dart language, [Impeller](https://docs.flutter.dev/perf/impeller) rendering engine
- [Compose Multiplatform](https://www.jetbrains.com/compose-multiplatform/) — shared UI on top of Kotlin Multiplatform
- [Juan Campuzano on GitHub](https://github.com/juan-campuzano) — co-speaker, Flutter side of the meetup
