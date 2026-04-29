---
type: internal
title: "The Mobile Landscape in 2026"
description: "The map I drew before writing code: nine mobile frameworks, four categories, and why Flutter and KMP are the only two paths I'm still considering."
pubDate: 2026-04-26
heroImage: "/images/slides/mobile-landscape-2026/hero.webp"
tags: [tech, mobile, talks]
draft: false
theme: dark
transition: slide
syntaxHighlight: true
math: false
eventName: "Learning Mobile Development — Series Companion Deck"
eventDate: 2026-04-26
relatedPost: mobile-development-landscape-2026
---

<!-- ==================== Cover ==================== -->

<!-- .slide: data-background-image="/images/slides/mobile-landscape-2026/hero-en.webp" data-background-size="cover" data-background-position="center" -->

&nbsp;

Note: Open with the personal angle. This isn't a comparison report — it's the map I drew for myself before learning mobile from scratch as a backend developer. Set the tone: honest, first-person, no expert pose. The cover image is full-bleed — no overlay text, the design speaks for itself.

---

<!-- ==================== Section 01 — The pull ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 01</span>
  <h2>Why mobile was always "someday"</h2>
</div>

---

<img src="/images/slides/mobile-landscape-2026/full-stack-not-mobile-en.webp" alt="Infographic: 15+ years calling myself full stack — Backend, Web, Infra, APIs, Databases, Cloud, DevOps — but mobile development was always left for later" width="1024" height="576" class="slide-image-full" />

Note: The image anchors the talk in the personal. 15+ years of a full career in everything except mobile. The barrier at the end of the path toward the phone is the visual punchline — the audience will feel the identification.

---

## My problem with mobile development

<img src="/images/slides/mobile-landscape-2026/mobile-dev-problem.webp" alt="Chaotic diagram of mobile development setup: IDE, SDK, emulators, certificates, plugins, and build conflicts connected by tangled cables" width="1024" height="576" class="slide-image-full" />

Note: Let the image speak. The visual chaos — cables, warnings, endless steps — is exactly what anyone feels trying to start with mobile for the first time. Don't over-explain; the audience will recognize the pain.

---

<img src="/images/slides/mobile-landscape-2026/tried-several-times-en.webp" alt="Infographic: I tried several times — four attempts at starting mobile development, each blocked by IDE setup, SDK, emulators, plugins, certificates, and build conflicts" width="1024" height="576" class="slide-image-full" />

Note: The image tells the story by itself. Four attempts, all blocked by logistics before writing useful code. Let the audience read it — recognition is immediate.

---

## My first mobile project was in college

<img src="/images/slides/mobile-landscape-2026/84-years-meme-en.webp" alt="Titanic Rose meme: It's been 84 years" width="520" height="291" style="display:block;margin:0 auto;" />

<p style="text-align:center;">During an entrepreneurship course</p>

Note: The meme breaks the tension. The audience laughs and connects — everyone has that story of a college project that was their only real contact with mobile. Short pause for the laugh, then move on.

---

<img src="/images/slides/mobile-landscape-2026/business-model-canvas.webp" alt="The Business Model Canvas — business model template with sections for key partners, activities, value propositions, customer relationships, segments, channels, cost structure and revenue streams" width="720" height="480" style="display:block;margin:0 auto;" />

Note: The Business Model Canvas as visual context — that entrepreneurship course used this tool. The mobile app was part of the final project. No need to explain every box, just let the audience recognize the canvas.

---

<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-helios-loading.webp" alt="Eclipse Helios IDE loading screen with the ADT plugin, circa 2011" width="1024" height="576" class="slide-image-full" />

Note: The purple Eclipse Helios loading screen. The audience who lived through that era will recognize it instantly. For younger folks, it's visual evidence of how rough the tooling was.

---

## Eclipse with ADT plugin

<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-adt-layout-editor.webp" alt="Eclipse ADT graphical layout editor showing a Hello World Android app with form widgets palette" width="991" height="612" class="slide-image-full" />

---

## And the emulator

<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-adt-emulator.webp" alt="Android emulator inside Eclipse with virtual physical keyboard and DDMS panel" width="1024" height="576" class="slide-image-full" />

Note: The third Eclipse image. Most of the audience under 30 has never seen this and the older half is wincing.

---

## My computer couldn't run Eclipse with ADT plugin

<img src="/images/slides/mobile-landscape-2026/low-resources-barrier.webp" alt="Frustrated developer in front of an old laptop with Eclipse stuck, insufficient resources icons and a wall blocking the path to mobile development" width="1024" height="576" class="slide-image-full" />

Note: The first real barrier: insufficient hardware. Eclipse + ADT + emulator needed more than the student's laptop could give. The barrier wasn't intellectual — it was logistical.

---

## Then I tried hybrid

<div class="slide-grid-2">
  <div>
    <h3>What worked</h3>
    <ul>
      <li>Cordova → first apps shipped</li>
      <li>Ionic → better tooling, real prototypes</li>
      <li>HTML + CSS + JS in a native container</li>
    </ul>
  </div>
  <div>
    <h3>Where it broke</h3>
    <ul>
      <li>Camera, GPS, sensors, push</li>
      <li>The bridge was too slow</li>
      <li>It felt like a web app — because it was one</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Section 02 — The real difference ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 02</span>
  <h2>The real difference isn't the framework</h2>
</div>

---

## The runtime isn't yours anymore

<div class="slide-grid-2 slide-grid--align-center">
  <div>

```kotlin
class MainActivity : AppCompatActivity() {
  override fun onCreate(
    savedInstanceState: Bundle?
  ) {
    super.onCreate(savedInstanceState)
    // The screen you see was already
    // destroyed and recreated by the OS.
    // Rehydrate from disk, not memory.
  }
}
```

  </div>
  <div>
    <h3>Look at the parameter</h3>
    <ul>
      <li><code>savedInstanceState</code> exists because the OS can kill your screen at any moment</li>
      <li>State has to survive on disk, not in RAM</li>
      <li>You don't own the lifecycle — the OS does</li>
    </ul>
  </div>
</div>

Note: One small code snippet does more work than a whole paragraph here. The presence of `savedInstanceState` in the most basic Android signature is the entire mobile lifecycle story compressed into one line.

---

## Backend instinct vs mobile reality

<div class="slide-grid-2">
  <div>
    <h3>What I knew</h3>
    <ul>
      <li>State lives on the server</li>
      <li>Request → response → snapshot</li>
      <li>Three lines spin up a server</li>
      <li>The browser is a predictable tab</li>
    </ul>
  </div>
  <div>
    <h3>What mobile actually is</h3>
    <ul>
      <li>State lives in the screen</li>
      <li>The OS destroys and recreates it</li>
      <li>Lifecycle ramifies through every decision</li>
      <li>The runtime belongs to Android or iOS</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Section 03 — Four categories ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 03</span>
  <h2>Four categories before the list</h2>
</div>

---

## The four shapes the ecosystem takes

<div class="slide-grid-2">
  <div class="slide-card">
    <span class="slide-card__icon">🔒</span>
    <h3>Native</h3>
    <p>One platform, one language, full OS access. <strong>Maximum control, maximum lock-in.</strong></p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">🔀</span>
    <h3>Cross-platform, native UI</h3>
    <p>Shared logic or UI compiled to native. <strong>KMP and Flutter live here — different philosophies.</strong></p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">📦</span>
    <h3>Hybrid</h3>
    <p>Web tech inside a native shell. <strong>Lowest friction, real ceilings.</strong></p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">🌐</span>
    <h3>Web / PWA</h3>
    <p>A site you install on the home screen. <strong>No app store. No native feel.</strong></p>
  </div>
</div>

---

## As architecture stacks

<img src="/images/blog/posts/mobile-development-landscape-2026/categories-en.webp" alt="Diagram of four architecture towers comparing Native, Cross-platform native UI, Hybrid, and Web/PWA. Each tower shows the layers between developer code and device hardware." width="1400" height="876" class="slide-image-full" />

<small>From left to right: more layers between your code and the device. Native is the most direct path; PWA, on top of layers, is constrained by the browser sandbox.</small>

Note: This is the diagram from the blog post. Walk through it left to right. The audience will remember this diagram longer than any list.

---

<!-- ==================== Section 04 — Nine options ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 04</span>
  <h2>Nine options on the map</h2>
</div>

---

## The ones worth considering

- **Native Android** — Kotlin + Jetpack Compose <!-- .element: class="fragment fade-up" -->
- **Native iOS** — Swift + SwiftUI <!-- .element: class="fragment fade-up" -->
- **Flutter** — Dart + Impeller engine <!-- .element: class="fragment fade-up" -->
- **React Native** — JS/TS, native via JSI <!-- .element: class="fragment fade-up" -->
- **Kotlin Multiplatform** — shared logic, native UI <!-- .element: class="fragment fade-up" -->
- **Ionic + Capacitor** — web inside a WebView <!-- .element: class="fragment fade-up" -->
- **.NET MAUI** — C# successor to Xamarin <!-- .element: class="fragment fade-up" -->
- **PWA** — installable website <!-- .element: class="fragment fade-up" -->
- **~~Xamarin~~** — EOL May 2024 · don't start here <!-- .element: class="fragment fade-up" -->

Note: Reveal one at a time. Spend ~10 seconds on each. The point is volume — the audience should feel the size of the decision space before we narrow it.

---

## Side by side

<table class="slide-table">
  <thead>
    <tr><th>Option</th><th>Language</th><th>Platforms</th><th>UI Approach</th></tr>
  </thead>
  <tbody>
    <tr><td>Native Android</td><td>Kotlin + Compose</td><td>Android</td><td>Native</td></tr>
    <tr><td>Native iOS</td><td>Swift + SwiftUI</td><td>Apple</td><td>Native</td></tr>
    <tr><td>Kotlin Multiplatform</td><td>Kotlin</td><td>Android, iOS, Desktop, Web</td><td>Native (or Compose MP)</td></tr>
    <tr><td>Flutter</td><td>Dart</td><td>Android, iOS, Web, Desktop</td><td>Custom (Impeller)</td></tr>
    <tr><td>React Native</td><td>JS / TS</td><td>Android, iOS</td><td>Native via JSI</td></tr>
    <tr><td>.NET MAUI</td><td>C#</td><td>Android, iOS, Win, macOS</td><td>Native via .NET</td></tr>
    <tr><td>Ionic + Capacitor</td><td>HTML / CSS / JS</td><td>Android, iOS, Web</td><td>WebView</td></tr>
    <tr><td>PWA</td><td>HTML / CSS / JS</td><td>Any browser</td><td>Web</td></tr>
    <tr><td><s>Xamarin</s></td><td><s>C#</s></td><td>—</td><td>EOL May 2024</td></tr>
  </tbody>
</table>

---

<!-- .slide: class="slide-bg-pattern--grid" -->

## Quick rule-outs

<div class="slide-grid-2">
  <div>
    <h3>Out</h3>
    <ul>
      <li><strong>Native only</strong> — I want to reach both</li>
      <li><strong>Ionic / Capacitor</strong> — lived this, hit the ceiling</li>
      <li><strong>.NET MAUI</strong> — not in the C# world</li>
      <li><strong>PWA</strong> — need real device access</li>
      <li><strong>Xamarin</strong> — EOL</li>
    </ul>
  </div>
  <div>
    <h3>Maybe</h3>
    <ul>
      <li><strong>React Native</strong> — solid, but JS-rooted</li>
    </ul>
    <h3>Stays</h3>
    <ul>
      <li><strong>Flutter</strong> — fastest path to a first result</li>
      <li><strong>Kotlin Multiplatform</strong> — the more defensible long-term bet</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Section 05 — Two paths ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #2a76dd 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 05</span>
  <h2>Two bets about "cross-platform"</h2>
</div>

---

## Two philosophies, one room

<div class="slide-grid-2">
  <div>
    <h3>🐦 Flutter</h3>
    <p><em>"Trust our renderer, write once."</em></p>
    <ul>
      <li>Dart + Impeller engine</li>
      <li>Same UI on every platform — by design</li>
      <li>Hot reload, mature pub.dev</li>
      <li><strong>3.41</strong> · Feb 2026</li>
    </ul>
  </div>
  <div>
    <h3>🟣 Kotlin Multiplatform</h3>
    <p><em>"Share the logic, keep the UI native."</em></p>
    <ul>
      <li>Kotlin shared layer · native UI per platform</li>
      <li>Jetpack Compose ↔ SwiftUI on each side</li>
      <li>Stable since Nov 2023</li>
      <li>Compose MP <strong>1.10</strong> · Jan 2026</li>
    </ul>
  </div>
</div>

---

## What "shared logic" looks like in KMP

```kotlin [1-2|4-9|11-15]
// commonMain — runs on Android AND iOS
package com.example.shared

class UserRepository(private val api: HttpClient) {
  suspend fun getUser(id: String): User {
    val response = api.get("/users/$id")
    if (!response.ok) throw NotFoundException()
    return response.body()
  }
}

// androidMain → consumed by Jetpack Compose
// iosMain     → consumed by SwiftUI
// Same data model. Same network call.
// Each platform keeps its own UI.
```

Note: Stepped highlight. First show the package — common code. Then the function — the logic that's actually shared. Then the comment block — where the UI lives. The point: KMP doesn't replace SwiftUI or Compose, it lives under them.

---

<div class="slide-stat">
  <span class="slide-stat__number">7% → 18%</span>
  <span class="slide-stat__label">KMP adoption growth among developers in a single year</span>
  <p class="slide-stat__context">Source: JetBrains Developer Ecosystem Survey</p>
</div>

---

## KMP — the long road to here

<ul class="slide-timeline">
  <li><time>2017</time><span>Introduced in Kotlin 1.2 at KotlinConf</span></li>
  <li><time>Nov 2023</time><span>KMP declared stable</span></li>
  <li><time>May 2025</time><span>Compose Multiplatform for iOS goes stable</span></li>
  <li><time>Jan 2026</time><span>Compose MP 1.10.0 released</span></li>
  <li><time>2026</time><span>Google migrating Jetpack libs (Room, DataStore, ViewModel) to KMP</span></li>
</ul>

---

## What each one costs you

<div class="slide-grid-2">
  <div>
    <h3>Flutter — honest tradeoffs</h3>
    <ul>
      <li>Dart only exists for Flutter</li>
      <li>UI doesn't fully belong to either platform</li>
      <li>Custom renderer ≠ true native feel</li>
    </ul>
  </div>
  <div>
    <h3>KMP — honest tradeoffs</h3>
    <ul>
      <li>Steeper learning curve</li>
      <li>Two UI layers to maintain (unless Compose MP)</li>
      <li>Xcode integration still rough at the edges</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Section 06 — Plan from here ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 06</span>
  <h2>The plan from here</h2>
</div>

---

## Process — what comes next

<ol class="slide-steps">
  <li><strong>Map</strong><br/>Understand the landscape (this chapter).</li>
  <li><strong>KMP first</strong><br/>Where curiosity landed. Build something real.</li>
  <li><strong>Then Flutter</strong><br/>Same exercise. Same yardstick.</li>
  <li><strong>Choose</strong><br/>After both, with evidence — not vibes.</li>
</ol>

---

<blockquote class="slide-quote">
  "A map isn't the territory. The territory is what I came to learn."
</blockquote>
<cite class="slide-quote-cite">— Closing the chapter</cite>

---

## What this series WON'T be

<div class="slide-grid-3">
  <div class="slide-card">
    <span class="slide-card__icon">❌</span>
    <h3>An expert take</h3>
    <p>I'm starting from zero. The arrogance of arrival hasn't caught up yet.</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">❌</span>
    <h3>A "Flutter vs KMP" doc</h3>
    <p>Comparison documents pretend the answer is universal. It isn't.</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">✅</span>
    <h3>A real journey</h3>
    <p>Built in public, with tradeoffs named, decisions logged, mistakes published.</p>
  </div>
</div>

---

## Questions before we land?

<div class="slide-grid-2 slide-grid--align-center">
  <div>
    <h3>Things worth asking</h3>
    <ul>
      <li>What's your team's existing language?</li>
      <li>One platform first, or both at once?</li>
      <li>How much UI fidelity do you need?</li>
      <li>Do you already have a web app to port?</li>
    </ul>
  </div>
  <div>
    <h3>Things not worth asking</h3>
    <ul>
      <li>"Which is objectively better?"</li>
      <li>"What does X big company use?"</li>
      <li>"Is Dart dying?"</li>
    </ul>
  </div>
</div>

Note: Optional Q&A bridge. Skip if running long. The asymmetry between the two columns is the punchline.

---

<!-- ==================== Closing ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f1124 0%, #2a76dd 100%)" -->

## Read the series

<p>The full chapter (and the next ones) live on the blog:</p>

<a href="/blog/series/learning-mobile-development" class="slide-cta">Open the series →</a>

<small>xergioalex.com · @XergioAleX</small>

Note: Close — invite the audience to follow along. The series builds in public; chapter 2 dives into KMP from zero.
