---
type: internal
title: "The Mobile Landscape in 2026"
description: "The map I made before writing code: nine mobile frameworks, four categories, and why Flutter and KMP became the only two paths I'm still considering."
pubDate: 2026-04-26
tags: [tech, mobile, talks]
draft: true
theme: dark
transition: slide
syntaxHighlight: true
math: false
eventName: "Learning Mobile Development — Series Companion Deck"
eventDate: 2026-04-26
relatedPost: mobile-development-landscape-2026
---

<!-- ==================== Cover ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #2a76dd 100%)" -->

# Mobile in 2026

### The map I made before writing code

<small>Sergio Alexander Florez · April 2026</small>

Note: Open with the personal angle — this isn't a comparison report; it's a map I drew for myself before learning mobile from scratch as a backend developer.

---

<!-- ==================== Section 01 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 01</span>
  <h2>Why I kept avoiding it</h2>
</div>

---

<div class="slide-stat">
  <span class="slide-stat__number">15+</span>
  <span class="slide-stat__label">years calling myself "full stack" while skipping mobile entirely</span>
  <p class="slide-stat__context">Backend, frontend, infra, DevOps — but mobile? Always "the thing other people do."</p>
</div>

---

## Where it started

<div class="slide-grid-2 slide-grid--align-center">
  <div>
    <img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-helios-loading.webp" alt="Eclipse Helios IDE loading screen with the ADT plugin, circa 2011" width="1024" height="576" class="slide-image-full" />
  </div>
  <div>
    <h3>~2011 · University course</h3>
    <p>Eclipse Helios + ADT plugin. The IDE that ate every byte of RAM my laptop had. Before "Hello World" you'd been through three setup wizards.</p>
  </div>
</div>

---

<blockquote class="slide-quote">
  "Logistics kills motivation faster than complexity."
</blockquote>
<cite class="slide-quote-cite">— Sergio Florez · Mobile Landscape 2026</cite>

---

## Backend instinct vs mobile reality

<div class="slide-grid-2">
  <div>
    <h3>What I knew</h3>
    <ul>
      <li>State lives on the server</li>
      <li>Request → response → snapshot</li>
      <li>Three lines spin up a server</li>
    </ul>
  </div>
  <div>
    <h3>What mobile actually is</h3>
    <ul>
      <li>State lives in the screen</li>
      <li>OS can destroy and recreate it</li>
      <li>Lifecycle ramifies through every decision</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Section 02 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 02</span>
  <h2>Four categories before the list</h2>
</div>

---

## The four categories

<div class="slide-grid-3">
  <div class="slide-card">
    <span class="slide-card__icon">🔒</span>
    <h3>Native</h3>
    <p>One platform, one language, full OS access. Maximum control, maximum lock-in.</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">🔀</span>
    <h3>Cross-platform</h3>
    <p>Shared logic or UI compiled to native. KMP and Flutter live here — different philosophies.</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">🌐</span>
    <h3>Hybrid / Web</h3>
    <p>Web tech inside a native shell, or a PWA you install. Lowest friction, real ceilings.</p>
  </div>
</div>

---

<!-- ==================== Section 03 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 03</span>
  <h2>Nine options on the map</h2>
</div>

---

## Side by side

<table class="slide-table">
  <thead>
    <tr><th>Option</th><th>Language</th><th>Platforms</th><th>UI</th></tr>
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

<!-- ==================== Section 04 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #2a76dd 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 04</span>
  <h2>Two paths, two philosophies</h2>
</div>

---

## Two bets about "cross-platform"

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
      <li>Two UI layers to maintain</li>
      <li>Xcode integration still rough at the edges</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Section 05 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Part 05</span>
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
<cite class="slide-quote-cite">— Sergio Florez · Closing the chapter</cite>

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

<!-- ==================== Closing ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f172a 0%, #2a76dd 100%)" -->

## Read the series

<p>The full chapter (and the next ones) live on the blog:</p>

<a href="/blog/series/learning-mobile-development" class="slide-cta">Open the series →</a>

<small>xergioalex.com · @XergioAleX</small>

Note: Closing — invite the audience to follow along. The series builds in public; chapter 2 dives into KMP from zero.
