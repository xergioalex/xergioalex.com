---
title: "Mobile Development in 2026: State of the Art and Where to Start Today"
description: "State of the art of mobile development in 2026: the available options, how each one works, and where it actually makes sense to start today."
draft: true
pubDate: "2026-04-26"
heroLayout: "none"
tags: ["tech", "mobile"]
keywords: ["mobile development 2026", "mobile frameworks", "Flutter", "Kotlin Multiplatform", "KMP", "Android iOS", "React Native", "cross-platform development", "learning mobile", "mobile landscape"]
series: "learning-mobile-development"
seriesOrder: 1
---

As a full stack developer, I've always tried to learn a bit of everything: backend, frontend, infrastructure, DevOps. If there's a new technology that catches my attention, I explore it. That's how I work. But with mobile development the story has been different. I watch it from a distance — I see it, I respect it, sometimes I envy it — but I always end up on the other side, building APIs, interfaces, and infrastructure — systems that live on servers. Mobile was always that "someday" that never arrived.

Not because I hadn't tried.

I remember my final university years — we're talking around fifteen years ago — when I needed to build a mobile app for an entrepreneurship course. Android Studio didn't exist yet; the official IDE was Eclipse with the ADT plugin, and it was too heavy for my humble laptop at the time. It wouldn't start, or it would start and eat all the memory, or it would get stuck compiling in a loop that felt eternal.

Looking up screenshots from that era I found these gems — Eclipse Helios loading with the ADT plugin, the visual layout editor, and the emulator with its virtual physical keyboard. The flashbacks are immediate:

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-helios-loading.webp"
     alt="Eclipse Helios IDE loading screen with the ADT plugin installed, circa 2011"
     width="1024"
     height="576"
     loading="lazy" />
<figcaption>Eclipse Helios (~2011) loading with the ADT plugin. That purple screen was the last thing you'd see before your laptop decided whether to cooperate or not.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-adt-layout-editor.webp"
     alt="Eclipse ADT graphical layout editor showing a Hello World Android app with form widgets palette"
     width="991"
     height="612"
     loading="lazy" />
<figcaption>The visual layout editor in Eclipse ADT — dragging TextViews and Buttons onto a virtual Nexus One. The "Hello world!" that took half an hour of setup.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-adt-emulator.webp"
     alt="Eclipse ADT with the Android emulator showing a virtual phone with physical keyboard, DDMS debug panel below"
     width="1024"
     height="734"
     loading="lazy" />
<figcaption>The Android emulator inside Eclipse — with a virtual physical keyboard, the DDMS panel, and a speed that tested your patience.</figcaption>
</figure>

So I started looking for alternatives. [PhoneGap](https://en.wikipedia.org/wiki/Apache_Cordova) — later [Apache Cordova](https://cordova.apache.org/) — opened the door to my first hybrid apps: the same web stack packaged inside a native shell, a route that actually made sense because on the laptop I had back then Eclipse + ADT + emulator never really worked.

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/phonegap-cordova.webp"
     alt="PhoneGap / Apache Cordova diagram showing HTML5, CSS3 and JavaScript logos bridging to iOS, Android and Windows platforms"
     width="1024"
     height="462"
     loading="lazy" />
<figcaption>PhoneGap and Cordova: the hybrid development promise — write HTML, CSS, and JavaScript, and deploy to iOS, Android, and Windows from a single codebase.</figcaption>
</figure>

For the university course, our team was Camilo, Miguel, and me. Camilo and Miguel are close friends from school; Miguel was practicing karate at the time. We staged a photo shoot and wrapped the material into a simple instructor-style app — a pocket reference to review and learn from the phone — and shipped it as **KDoSensei**. The MVP was plain and, by today's standard, dated: we're talking nearly fifteen years ago, before UIs were as polished as they are now; it still worked.

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/kdosensei-hero.webp"
     alt="KDoSensei project branding: karate practitioner in a white gi with green belt in a blocking stance and the product name in white type on a black background"
     width="1024"
     height="522"
     loading="lazy" />
<figcaption>Project branding: high-contrast black and white with the green belt as the only accent color.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/kdosensei-screens-overview.webp"
     alt="Three KDoSensei screenshots: home with Karate and Self-Defense sections, Karate menu with History, Glossary, and Guides, and belt-based guide list"
     width="1024"
     height="800"
     loading="lazy" />
<figcaption>MVP screenshots: landing, content navigation, and belt-based guides — very much of its time, but it worked.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/kdosensei-screens-techniques.webp"
     alt="Three KDoSensei technique detail screens for kihon moves Tettsui-uchi, Oi-zuki, and Gedan-barai, each with an outdoor photo and explanatory Spanish text"
     width="1024"
     height="548"
     loading="lazy" />
<figcaption>Three kihon detail screens using the outdoor shoot photos and short movement notes.</figcaption>
</figure>

Years later I dug up my course files — source included — along with the original Android APKs. Those packages don't run cleanly on today's devices anymore — newer OS releases have mostly left them behind — but the web layer was worth saving. Hybrid apps like that are still, at heart, embedded web inside a native shell. I put that same frontend online as a static site on [Cloudflare Pages](https://pages.cloudflare.com/) at [kdosensei.xergioalex.com](https://kdosensei.xergioalex.com/).

I didn't close the book there. Over the years I tried [Ionic](https://ionicframework.com/) — same idea, better tooling, faster prototypes — **Meteor** bundled with Cordova (reactive and tempting until production felt fragile), and some experiments with **React Native**, closer to native but with its own friction. Each round taught me the ceiling of the last one.

The problem arrived when I needed more than screens and copy. When a project needed real access to native pieces — camera, GPS, sensors, push — hybrid showed visible seams: a slow bridge or an API that simply wasn't there. If you layered complex animations or expected genuinely native UX, you still felt the web inside the shell; on modest hardware, performance fell apart fast. What "flew" in a desktop browser could land on a phone like a dressed-up web app — and users notice that gap.

After that, I walked away from mobile development — more than once — and drifted back to what I already knew: APIs, servers, infrastructure, and databases. The phone went back into the "someday" drawer.

And that "again" is the important part — because it wasn't the first time and it wasn't the last. Every now and then I'd feel the urge to come back. I'd see a new framework, a demo that looked incredible, a tutorial that promised "build your first app in 30 minutes." But mobile development, unlike frontend or backend, requires a quantity of artifacts that when you see them all together — the certificates, the provisioning profiles, the emulators, the Gradle or Xcode configurations, the developer accounts — the impulse would die before I wrote a single line of code. In frontend you can open an HTML file and you're already running. In backend, three lines spin up a server. In mobile, before seeing "Hello World" on your phone you've already gone through three setup wizards and a Gradle error that sends you to Stack Overflow. The entry barrier wasn't intellectual. It was logistical. And logistics kills motivation faster than complexity.

This year I decided that was enough. Not because I have an urgent project that demands it — though there's something there — but because I wanted to understand the current state of the art. To find the best path for someone like me: a full stack developer with solid experience in backend, frontend, and infrastructure, but no expertise in mobile. My happy path — the one that gets me building apps intuitively, with the best possible standards, without having to fight the ecosystem just to get started.

Before writing a single line of code, I sat down to understand the landscape. Because one of the most common mistakes people make when arriving from backend or web is assuming that mobile development is just "normal programming but on a phone." It isn't. State models are different. The lifecycle of screens works differently. The way you think about UI — who controls it, when it gets destroyed, how it persists — has its own logic. Before choosing a tool, I wanted to understand what I was getting into.

This post is that state of the art I sat down to understand. I tell the same personal story — team, shoot, screenshots — with more visual runway in [this slide deck](/slides/mobile-landscape-2026/); here the focus is the technical map.

## The real problem isn't choosing a framework

Before talking about options, you have to name the underlying problem. People arriving from web development — whether backend or frontend — tend to ask the wrong question: "what framework should I use?" The right question comes before that: "what's actually different about this domain?"

The honest answer: quite a bit.

A web app runs inside the browser, a relatively predictable environment: an open tab, available memory, a URL that anchors state. If the tab closes, the user decided so. On mobile, that predictability disappears. The operating system decides when your application runs, when it moves to the background, and when it terminates the process to free memory — without prior notice to your code. The screen the user sees can be destroyed and recreated at any moment, and when it comes back you have to rehydrate state from persistent storage, not from memory. That lifecycle has its own logic, and it ramifies through every architectural decision: where do you store data so it survives?, who rehydrates it when the screen comes back?, how much time do you have to serialize state before the operating system terminates the process?

It's not that web doesn't have complexity — it does, whether backend or frontend. It's that the complexity is different: the instinct you've built up handling requests or component reactivity doesn't transfer directly to this domain, because the runtime isn't yours anymore — it's the operating system's.

It's a pattern I'm going to find over and over in this series: the instincts you build up in web development are valid, but they don't transfer directly. Part of learning mobile is figuring out when to trust what you already know and when to set it aside.

That said: the framework does matter. And there are too many to choose from without understanding the terrain first.

## Four categories before the list

Before naming each option, it helps to establish the categories. The mobile ecosystem organizes into four fundamental types:

**Native** — one platform, one language, full access to the OS APIs. Kotlin with Jetpack Compose on Android; Swift with SwiftUI on iOS. Maximum control, maximum platform lock-in: if you build native Android, your app only runs on Android, and reaching iOS means rewriting it in another language and another ecosystem.

**Cross-platform with native UI** — shared logic or shared UI, compiled to native. KMP and Flutter live here, though with fundamentally different philosophies. Both are "cross-platform," but what that means for each is different.

**Hybrid** — web technologies running inside a native container. React Native maps JavaScript components to native views — technically not a classic hybrid, though it often gets grouped with them. Ionic/Capacitor is a truer hybrid: your HTML and CSS run in a WebView (a browser embedded inside the app).

**Web / PWA** — a website you can install on the home screen. No native compilation. Works well for content-first apps; hits its limits when you need deep device integration.

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/categories-en.webp"
     alt="Diagram of four architecture towers comparing Native, Cross-platform native UI, Hybrid, and Web/PWA. Each tower shows the layers between developer code and device hardware, with height increasing from left to right. PWA is the tallest tower and includes a browser sandbox marker."
     width="1400"
     height="876"
     loading="lazy" />
<figcaption>The four categories as architecture stacks: code (in terracotta) traverses more layers from left to right. Native is the most direct path; PWA, beyond adding layers, is constrained by the browser sandbox.</figcaption>
</figure>

This classification will feel simple once we get into the details — and it is, a bit. The reality is that "cross-platform" is not a monolithic category. KMP and Flutter are two very different bets about what sharing code means, and that nuance matters more than it looks at first.

## Each option, without decoration

Nine options: the ones worth considering in mobile development today, in 2026. One by one. What defines each, what it costs to use, and where it fits best.

### Native Android — Kotlin + Jetpack Compose

You write [Kotlin](https://developer.android.com/kotlin) with Jetpack Compose. Your app is exactly what Google designed Android to run — Kotlin is, in Google's own words, *"the preferred language for Android app development."* The OS gives you direct access to all its APIs, animations feel native because they are, and nothing will surprise you in terms of compatibility. The cost is clear: it only runs on Android. If you ever need to reach iOS, you're back at square one with a different language and a different stack.

### Native iOS — Swift + SwiftUI

Same logic, Apple side. [Swift](https://en.wikipedia.org/wiki/Swift_%28programming_language%29) since 2014, [SwiftUI](https://developer.apple.com/videos/play/wwdc2019/204/) since 2019. By 2026, Swift is at 6.2 and SwiftUI [ships with iOS 26](https://www.hackingwithswift.com/articles/278/whats-new-in-swiftui-for-ios-26). The Apple ecosystem is hermetic and consistent — inside the garden, the pieces fit together: APIs, tooling, distribution. Same cost: only runs on Apple platforms.

### Flutter

[Google's bet with Flutter](https://flutter.dev) on "build once, run everywhere." You write Dart — a language you almost certainly don't know — and Flutter renders everything through its own graphics engine, [Impeller](https://docs.flutter.dev/perf/impeller) — which paints directly on Metal on iOS and Vulkan on Android, the APIs that high-performance apps use to talk directly to the device's GPU. That's both its strength and its quirk: the UI looks the same on Android and iOS because Flutter draws it itself, not because it adopts each system's native widgets.

Is that an advantage or a problem? Depends on who's asking. For apps with strong brand identity, for internal tools, for games — total control over rendering is valuable. For apps that need to feel like a proper native Android or iOS app — it's a real cost.

[Flutter 3.41](https://docs.flutter.dev/release/whats-new) shipped on February 11, 2026. The package ecosystem on pub.dev is broad. The tooling — `flutter doctor`, DevTools, the VS Code and Android Studio plugins — is polished in a way that signals real Google commitment to the project.

The honest tradeoff: Dart is a language that only exists for Flutter. If you ever step away, Dart doesn't follow. It's a bet on Google's ecosystem, not on a general-purpose language.

### React Native

Meta's bet that web developers shouldn't have to learn a new paradigm. The [React Native](https://reactnative.dev) tagline is direct: *"Learn once, write anywhere."* You write JavaScript or TypeScript and you get native UI — not a WebView, but components mapped to real native platform views.

The New Architecture replaced the old bridge — the slow, asynchronous layer between JavaScript and native code — with JSI, a direct C++ interface. It's mandatory from version 0.82 and the default in [0.84](https://reactnative.dev/blog/2026/02/11/react-native-0.84). That makes React Native significantly faster and more reliable than its 2018 incarnation. If you already know React, this is the lowest-friction path to mobile.

In October 2025, Meta donated React, React Native, and JSX to the [React Foundation](https://engineering.fb.com/2025/10/07/open-source/introducing-the-react-foundation-the-new-home-for-react-react-native/) — part of the Linux Foundation — making the project formally independent of any single company.

### Kotlin Multiplatform

KMP is a fundamentally different bet. Where Flutter says "trust our renderer, write once," KMP says something different: share your logic, keep the UI native.

JetBrains' positioning is explicit: *"share code across platforms while retaining the benefits of native programming."* In practice: you write your data models, business logic, networking, and storage in Kotlin — once. Each platform — Android, iOS — keeps its own native UI layer: Jetpack Compose on Android, SwiftUI on iOS. The platform feels native because the UI is.

KMP has had a long journey since its [introduction in Kotlin 1.2 in 2017](https://www.droidcon.com/2022/09/29/kotlin-multiplatform-at-five-years/). It [declared stability in November 2023](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/). Compose Multiplatform — the optional layer that lets you share UI too using Compose syntax — [reached stability for iOS in May 2025](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/), and [released version 1.10.0](https://blog.jetbrains.com/kotlin/2026/01/compose-multiplatform-1-10-0/) in January 2026.

The question KMP leaves open — how much code can you actually share, and when does it make sense — is the most interesting one in the cross-platform ecosystem. I won't answer it here: that's exactly what I'll explore in the next chapter.

### Ionic + Capacitor

A web app inside a native container. Your HTML, CSS, and JavaScript run in a WebView; [Capacitor](https://ionic.io/blog/announcing-capacitor-8) exposes a bridge to native device APIs. If you're a web developer who needs an app in the store, it's the path of least resistance. The tradeoff is honest: it feels like a web app because it is one. For many use cases that's fine. For others, it's not.

Capacitor 8 was announced in December 2025 and [version 8.3.0](https://github.com/ionic-team/capacitor/releases) shipped on March 25, 2026.

### .NET MAUI

Microsoft's cross-platform framework for the .NET ecosystem — [.NET MAUI](https://dotnet.microsoft.com/en-us/apps/maui), the successor to Xamarin. Runs on Android, iOS, Windows, and macOS. If your team lives in C# and Visual Studio and already has .NET code, this is the natural landing place. For anyone coming from outside the Microsoft ecosystem, the entry point is higher with no clear benefit in return.

[.NET MAUI 10](https://www.infoq.com/news/2026/03/net-11-preview2-maui/) shipped with .NET 10 in 2026.

### Xamarin

[Reached end of support](https://dotnet.microsoft.com/en-us/platform/support/policy/xamarin) on May 1, 2024. Microsoft pointed everyone toward .NET MAUI. There's no reason to start anything new on Xamarin.

### PWA — Progressive Web Apps

A website you can install on the home screen. Works surprisingly well for content-first apps: no native compilation, no app store approval, one codebase for both web and mobile. [The limits arrive fast](https://en.wikipedia.org/wiki/Progressive_web_app) when you need real device integration — advanced camera access, Bluetooth, background processing — especially on iOS, where Safari remains more restrictive than Chrome for modern web APIs.

For certain use cases, a PWA is the right answer. For what I want to build, it isn't.

## Before choosing: the landscape in a table

Before going deeper on the two options that interest me most, here's how they all look against the criteria that matter to me. One caveat: this table represents my read of the landscape from documentation and changelogs. Not from actual use. After months with two of them, the table will look different in my head.

| Option | Language(s) | Platforms | UI Approach | Maintained by | Best suited for |
|---|---|---|---|---|---|
| Native Android | Kotlin + Jetpack Compose | Android only | 100% native Android UI | Google | Android-only apps; teams that live in the Android ecosystem |
| Native iOS | Swift + SwiftUI | Apple platforms only | 100% native Apple UI | Apple | iOS/macOS-only apps; teams that only ship on Apple |
| Kotlin Multiplatform | Kotlin | Android, iOS, Desktop, Web | Shared logic; UI native per platform (or Compose Multiplatform for shared UI) | JetBrains + Google | Teams that want shared business logic with native-quality UI per platform |
| Flutter | Dart | Android, iOS, Web, Desktop | Custom rendering engine (Impeller) — same UI on all platforms | Google | Teams that want one UI codebase across platforms; rapid cross-platform prototyping |
| React Native | JavaScript / TypeScript | Android, iOS | Maps JS components to native platform views | React Foundation (Meta + community) | Web teams moving to mobile; existing React/JS codebases |
| .NET MAUI | C# | Android, iOS, Windows, macOS | Native UI controls per platform via .NET abstraction | Microsoft | .NET/C# teams; enterprise apps already in the Microsoft ecosystem |
| Ionic + Capacitor | HTML, CSS, JS/TS | Android, iOS, Web | WebViews inside a native shell | Ionic team | Web teams; existing web apps that need installable mobile presence |
| PWA | HTML, CSS, JS | Any browser | Standard web UI (no native controls) | W3C / browser vendors | Content-first apps; teams that want installability without app store submission |
| Xamarin | C# | — | — | Microsoft (deprecated) | **Do not start new projects on Xamarin.** EOL: May 2024. Migrate to .NET MAUI. |

## Why Flutter + KMP are the two serious options for me

I ruled out the rest fairly quickly. The reasoning:

**Native Android/iOS:** The answer only makes sense if you already know which platform you're building for. I don't — I want to reach both. Going native would mean learning two languages, two UI models, two ecosystems. It's the right answer for many teams. Not for me starting from zero.

**Ionic/Capacitor:** I've been through this. PhoneGap, Cordova, Meteor, Ionic — they served me fifteen years ago to get through university courses, but I lived the tradeoff firsthand: when you need the app to feel native, hybrid doesn't get there. If you already have a web app and want to get it into the store, it's a valid path. But I'm building from scratch, and this time I want to do it right.

**.NET MAUI:** I don't live in the C# ecosystem. No reason to start there.

**PWA:** For the project I have in mind, I need real device access. A PWA doesn't get there.

**React Native:** This is a serious option. The New Architecture made it a much more solid platform than it used to be. If I already had a large React codebase, the calculation would change. I don't, and the Flutter/Dart or Kotlin ecosystem has more coherence as an entry point for someone not arriving from the JS world.

That leaves two.

### Flutter: the most direct path to a first result

Flutter is probably the most direct entry point for someone coming from outside mobile. The reason isn't Dart — Dart is fine, but it's not the reason. The reason is that Flutter removes one entire category of confusion: platform UI differences.

When you write a Flutter app, the widgets you build look the same on Android and iOS because Flutter renders them itself through Impeller. You don't need to understand UIKit or Android's View system. You learn the widget tree, you learn state management — there are good options: libraries like Riverpod or Bloc, or the built-in `setState` approach — and you build. The feedback loop is fast. Hot reload actually works.

The ecosystem is mature. Flutter 3.41 — released February 11, 2026 — shipped three years into the stable era. The pub.dev package ecosystem already has what you'd need for most integrations.

For a developer who wants to go from "I've never shipped a mobile app" to "I have something running on both Android and iOS as fast as possible" — Flutter is the most direct path.

The honest tradeoff: Dart is a language that only exists for Flutter. If I move away from Flutter, that Dart knowledge doesn't travel. The UI uniformity is also a philosophical bet — your app will look like a Flutter app, not like an Android app or an iOS app. For some use cases that's fine. For apps that need to feel at home on each platform, it's a real cost.

### KMP: the more defensible long-term bet

KMP is a fundamentally different bet. Where Flutter says "trust our renderer, write once," KMP says something different: share your logic, keep the UI native.

The most important architectural distinction is this: KMP doesn't replace the native UI — it lives under it. Your Android layer is still Jetpack Compose. Your iOS layer is still SwiftUI. What you share is the business logic — data models, networking, storage, domain rules. The platform feels like itself because the UI is actually native.

Compose Multiplatform — JetBrains' optional layer on top of KMP — goes further: it lets you share UI too, in Compose syntax, across Android, iOS, Desktop, and Web. It [reached stability for iOS in May 2025](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/). So if you want Flutter-style "one UI codebase," KMP can do that now. If you prefer native UI per platform, it can do that too. It's more flexible — which also means more decisions.

The adoption signal is strong. According to the [JetBrains Developer Ecosystem Survey](https://kotlinlang.org/docs/multiplatform/multiplatform-reasons-to-try.html), KMP usage grew from 7% to 18% of developers in a single year. Google has been migrating its own Jetpack libraries to KMP — Room, DataStore, ViewModel, Lifecycle. [Netflix, Philips, Cash App, and Quizlet](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/) are production users.

The honest tradeoff: the learning curve is steeper. You're working in Kotlin — a great language, but if you don't already know it, you're learning that too. The iOS tooling, while improving, involves Xcode integration that can be frustrating at first. The documentation has gaps at the edges.

But for a developer with backend or Java/Kotlin experience, the ramp is shorter than it looks from the outside. And the architectural philosophy — share the logic, keep the UI native — describes how most production apps actually work in practice.

Whether that holds up in reality or only sounds good on paper is the question that comes next.

## What I don't know yet

Honestly: I don't know which of the two I'm going to end up with.

Both are serious bets. Both have coherent philosophies. Both have real production deployments behind them. The difference isn't that one is objectively better — it's that they answer different questions about what "cross-platform" means.

Flutter says: one codebase, one rendering engine, consistent UI everywhere. The price is Dart, a custom renderer, and a UI that doesn't fully belong to either platform.

KMP says: one codebase for logic, native UI per platform. The price is more complexity, more code when targeting both platforms, and a higher floor to get started.

For someone who's learning, Flutter is probably the faster start. The feedback loop is tighter. The "I have something running" moment arrives sooner. For someone building production software that needs to coexist with native codebases — or that needs to feel at home on each platform — KMP is the more defensible long-term choice.

This series will go deep on KMP first. That's where my curiosity landed. But this chapter is not the verdict.

What I do know: I'm not here just to understand the landscape. I want to build something that actually runs on my phone — something that doesn't have a name in this chapter yet, but exists. The destination of this series isn't a comparison document. Documentation isn't the code. And the code is what I came to write.

Let's keep building.
