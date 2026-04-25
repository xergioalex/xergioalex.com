---
title: "The Mobile Landscape in 2026: The Map I Made Before Writing Code"
description: "The mobile development map I built before touching code: what's available, how each option works, and why I ended up with two serious paths."
pubDate: "2026-04-26"
heroLayout: "none"
tags: ["tech", "mobile"]
keywords: ["mobile development 2026", "mobile frameworks", "Flutter", "Kotlin Multiplatform", "KMP", "Android iOS", "React Native", "cross-platform development", "learning mobile", "mobile landscape"]
series: "learning-mobile-development"
seriesOrder: 1
---

I've been watching mobile development from a distance for years. I see it, I respect it, I occasionally envy it. But always from the other side: building APIs, configuring infrastructure, designing systems that live on servers. Mobile was always "the thing other people do."

This year I decided that was enough. Not because I have an urgent project that demands it — though there's something there — but because there's a real difference between knowing a domain superficially and having actually touched it. I wanted to move to the second group.

Before writing a single line of code, I sat down to understand the landscape. Because one of the most common mistakes people make when arriving from backend or web is assuming that mobile development is just "normal programming but on a phone." It isn't. State models are different. The lifecycle of screens works differently. The way you think about UI — who controls it, when it gets destroyed, how it persists — has its own logic. Before choosing a tool, I wanted to understand what I was getting into.

This post is that map I made for myself.

## The real problem isn't choosing a framework

Before talking about options, you have to name the underlying problem. People arriving from backend tend to ask the wrong question: "what framework should I use?" The right question comes before that: "what's actually different about this domain?"

The honest answer: quite a bit.

In a web request, state lives on the server. You make a request, the server processes it, sends back a response. The screen the user sees is a snapshot. In a mobile app, state lives in the screen itself — and when the user navigates away, that screen can be destroyed and recreated. That lifecycle has its own logic, and it ramifies through every architectural decision you make. Where do you store data? Who updates it when the screen comes back? What happens when the OS kills your app for running low on memory?

It's not that backend doesn't have complexity — it does. It's that the complexity is different, and the "small server" instinct you've built up over years doesn't transfer directly here.[^hook-f]

That said: the framework does matter. And there are too many to choose from without mapping the terrain first.

## Four categories before the list

Before naming each option, it helps to establish the categories. The mobile ecosystem organizes into four fundamental types:

**Native** — one platform, one language, full access to the OS APIs. Maximum control, maximum platform lock-in. If you build native Android, your app only runs on Android.

**Cross-platform with native UI** — shared logic or shared UI, compiled to native. KMP and Flutter live here, though with fundamentally different philosophies. Both are "cross-platform," but what that means for each is different.

**Hybrid** — web technologies running inside a native container. React Native maps JavaScript components to native views — technically not a classic hybrid, though it often gets grouped with them. Ionic/Capacitor is a truer hybrid: your HTML and CSS run in a WebView.

**Web / PWA** — a website you can install on the home screen. No native compilation. Works well for content-first apps; hits its limits when you need deep device integration.

This classification will feel simple once you get into the details — and it is, a bit. The reality is that "cross-platform" is not a monolithic category. KMP and Flutter are two very different bets about what sharing code means, and that nuance matters more than it looks at first.

## Each option, without decoration

Nine options. One by one. Not feature lists — an honest description of what makes each one what it is, and what it genuinely does better than the others.

### Native Android — Kotlin + Jetpack Compose

You write Kotlin with Jetpack Compose. Your app is exactly what Google designed Android to run.[^kotlin-google] The OS gives you direct access to all its APIs, animations feel native because they are, and nothing will surprise you in terms of compatibility. The cost is simple: it only runs on Android. If you ever need to reach iOS, you're starting over.

Jetpack Compose 1.10.1 shipped in January 2026.[^compose-1101] The ecosystem has been maturing for years.

### Native iOS — Swift + SwiftUI

Same logic, Apple side. Swift since 2014[^swift-release], SwiftUI since 2019[^swiftui-release]. By 2026 they're on Swift 6.2 and SwiftUI for iOS 26.[^swift-2026] The Apple ecosystem is hermetic and consistent — if you stay inside the garden, everything works together well. Same cost: only runs on Apple platforms.

### Flutter

Google's bet on "build once, run everywhere."[^flutter-tagline] You write Dart — a language you almost certainly don't know — and Flutter renders everything through its own graphics engine, Impeller, independent of each platform's native controls.[^flutter-impeller] That's both its strength and its peculiarity: the UI looks the same on Android and iOS because Flutter draws it itself, not because it adopts each system's native widgets.

Is that an advantage or a problem? Depends who's asking. For apps with strong brand identity, for internal tools, for games — total control over rendering is valuable. For apps that need to feel like a proper native Android or iOS app — it's a real cost.

Flutter 3.41 shipped on February 11, 2026.[^flutter-341] The package ecosystem on pub.dev is large. The tooling — `flutter doctor`, DevTools, the VS Code and Android Studio plugins — is polished in a way that suggests Google is genuinely committed to the platform.[^flutter-homepage]

The honest tradeoff: Dart is a language that only exists for Flutter. If you ever move on from Flutter, Dart doesn't follow. It's a bet on Google's ecosystem, not on a general-purpose language.

### React Native

Meta's bet that web developers shouldn't have to learn a new paradigm.[^rn-tagline] Write JavaScript or TypeScript, get native UI — not a WebView, but components mapped to real native platform views.

The New Architecture — which replaced the old bridge with JSI, a real C++ interface — is now mandatory since version 0.82 and is the default in 0.84.[^rn-084] That makes React Native significantly faster and more reliable than the React Native of 2018. If you already know React, this is the lowest-friction path to mobile.

In October 2025, Meta donated React, React Native, and JSX to the React Foundation — part of the Linux Foundation — making the project formally independent of any single company.[^react-foundation]

### Kotlin Multiplatform

KMP is a fundamentally different bet. Where Flutter says "trust our renderer, write once," KMP says something different: share your logic, keep the UI native.[^kmp-stable]

The philosophy is explicit in JetBrains' positioning: "share code across platforms while retaining the benefits of native programming." In practice: you write your data models, business logic, networking, and storage in Kotlin — once. Each platform — Android, iOS — gets its own native UI layer. On Android, that's Jetpack Compose. On iOS, that's SwiftUI. The platform feels like itself because the UI is genuinely native.

KMP has had a long journey since its introduction in Kotlin 1.2 in 2017.[^kmp-2017] It declared stability in November 2023.[^kmp-stable] Compose Multiplatform — the optional layer that lets you share UI too using Compose syntax — reached stability for iOS in May 2025[^compose-ios-stable], and released version 1.10.0 in January 2026.[^compose-110]

The question KMP leaves open — how much code you can actually share, and when that makes sense — is the most interesting question in the entire cross-platform ecosystem. I'm not going to answer it here. That's the question the next chapter will start to explore.[^hook-d]

### Ionic + Capacitor

A web app inside a native container. Your HTML, CSS, and JavaScript run in a WebView; Capacitor provides a bridge to native device APIs.[^capacitor-8] If you're a web developer who needs an app in the store, this is the path of least resistance. The tradeoff is honest: it feels like a web app because it is one. For many use cases that's fine. For others, it's not.

Capacitor 8 was announced in December 2025 and version 8.3.0 shipped in March 2026.[^capacitor-830]

### .NET MAUI

Microsoft's cross-platform framework for the .NET ecosystem — the successor to Xamarin.[^maui-tagline] Runs on Android, iOS, Windows, and macOS. If your team lives in C# and Visual Studio and you already have .NET code, this is where you land. For someone coming from outside the Microsoft ecosystem, the entry point is higher with no clear payoff.

.NET MAUI 10 shipped with .NET 10 in 2026.[^maui-10]

### Xamarin

It reached end of support in May 2024.[^xamarin-eol] Microsoft pointed everyone to .NET MAUI. No reason to start anything new on Xamarin.

### PWA — Progressive Web Apps

A website you can pin to the home screen. Works surprisingly well for content-first apps: no native compilation, no app store approval, one codebase for both web and mobile. The limits arrive fast when you need real device integration — advanced camera access, Bluetooth, background processing — especially on iOS, where Safari's support for modern web APIs remains more restrictive than on Android.[^pwa-limits]

For certain use cases, a PWA is the right answer. For what I want to build, it isn't.

## Before choosing: the landscape in a table

Before going deeper on the two options that interest me most, here's how they all look against the criteria that matter to me. One caveat: this table represents my read of the landscape from documentation and changelogs. Not from actual use. After months with two of them, the table will look different in my head.[^hook-c]

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

**Ionic/Capacitor:** The tradeoff is too clear. If I care about the app feeling native — and I do — Ionic isn't where to start. It's useful if you already have a web app and want to get it into the store. I'm building from scratch.

**.NET MAUI:** I don't live in the C# ecosystem. No reason to start there.

**PWA:** For the project I have in mind, I need real device access. A PWA doesn't get there.

**React Native:** This is a serious option. The New Architecture made it a much more solid platform than it used to be. If I already had a large React codebase, the calculation would change. I don't, and the Flutter/Dart or Kotlin ecosystem has more coherence as an entry point for someone not arriving from the JS world.

That leaves two.

### Flutter: the most direct path to a first result

Flutter is probably the most direct entry point for someone coming from outside mobile. The reason isn't Dart — Dart is fine, but it's not the reason. The reason is that Flutter removes one entire category of confusion: platform UI differences.

When you write a Flutter app, the widgets you build look the same on Android and iOS because Flutter renders them itself through Impeller. You don't need to understand UIKit or Android's View system. You learn the widget tree, you learn state management — there are good options: Riverpod, Bloc, the built-in `setState` approach — and you build. The feedback loop is fast. Hot reload actually works.

The ecosystem is mature. Flutter 3.41 — released February 11, 2026 — shipped three years into the stable era. The pub.dev package ecosystem already has what you'd need for most integrations.

For a developer who wants to go from "I've never shipped a mobile app" to "I have something running on both Android and iOS as fast as possible" — Flutter is the most direct path.

The honest tradeoff: Dart is a language that only exists for Flutter. If I move away from Flutter, that Dart knowledge doesn't travel. The UI uniformity is also a philosophical bet — your app will look like a Flutter app, not like an Android app or an iOS app. For some use cases that's fine. For apps that need to feel at home on each platform, it's a real cost.

### KMP: the more defensible long-term bet

KMP is a fundamentally different bet. Where Flutter says "trust our renderer, write once," KMP says something different: share your logic, keep the UI native.

The most important architectural distinction is this: KMP doesn't replace the native UI — it lives under it. Your Android layer is still Jetpack Compose. Your iOS layer is still SwiftUI. What you share is the business logic — data models, networking, storage, domain rules. The platform feels like itself because the UI genuinely is native.

Compose Multiplatform — JetBrains' optional layer on top of KMP — goes further: it lets you share UI too, in Compose syntax, across Android, iOS, Desktop, and Web. It reached stability for iOS in May 2025.[^compose-ios-stable] So if you want Flutter-style "one UI codebase," KMP can do that now. If you prefer native UI per platform, it can do that too. It's more flexible — which also means more decisions.

The adoption signal is strong. According to the JetBrains Developer Ecosystem Survey, KMP usage grew from 7% to 18% of developers in a single year.[^kmp-adoption] Google has been migrating its own Jetpack libraries to KMP — Room, DataStore, ViewModel, Lifecycle. Netflix, Philips, Cash App, and Quizlet are production users.[^kmp-stable]

The honest tradeoff: the learning curve is steeper. You're working in Kotlin — a great language, but if you don't already know it, you're learning that too. The iOS tooling, while improving, involves Xcode integration that can be frustrating at first. The documentation has gaps at the edges.

But for a developer with backend or JVM experience, the ramp is shorter than it looks from the outside. And the architectural philosophy — share the logic, keep the UI native — describes how most production apps actually work in practice.

Whether that holds up in reality or only sounds good on paper is the question that comes next.

## What I don't know yet

Honestly: I don't know which of the two I'm going to end up with.

Both are serious bets. Both have coherent philosophies. Both have real production deployments behind them. The difference isn't that one is objectively better — it's that they answer different questions about what "cross-platform" means.

Flutter says: one codebase, one rendering engine, consistent UI everywhere. The price is Dart, a custom renderer, and a UI that doesn't fully belong to either platform.

KMP says: one codebase for logic, native UI per platform. The price is more complexity, more code when targeting both platforms, and a higher floor to get started.

For someone who's learning, Flutter is probably the faster start. The feedback loop is tighter. The "I have something running" moment arrives sooner. For someone building production software that needs to coexist with native codebases — or that needs to feel at home on each platform — KMP is the more defensible long-term choice.[^hook-a]

This series will go deep on KMP first. That's where my curiosity landed. But this chapter is not the verdict.

What I do know: I'm not here just to understand the landscape. I want to build something that actually runs on my phone.[^hook-e] A map isn't the territory. And the territory is what I came to learn.

Let's keep building.

---

[^hook-f]: This is the pattern I'm going to find over and over: the instincts you build up in backend are valid, but they don't transfer directly. Part of learning mobile is figuring out when to trust what you already know and when to set it aside.

[^kotlin-google]: Per Google's official Android documentation: "Kotlin is Google's preferred language for Android app development." — [developer.android.com/kotlin](https://developer.android.com/kotlin)

[^compose-1101]: Jetpack Compose 1.10.1, released January 14, 2026. Source: [developer.android.com — Jetpack Compose releases](https://developer.android.com/jetpack/androidx/releases/compose)

[^swift-release]: Swift 1.0 was released September 9, 2014 with Xcode 6.0 GM. Source: [Wikipedia — Swift (programming language)](https://en.wikipedia.org/wiki/Swift_(programming_language))

[^swiftui-release]: SwiftUI was introduced at WWDC on June 3, 2019. Source: [developer.apple.com — WWDC19 session 204](https://developer.apple.com/videos/play/wwdc2019/204/)

[^swift-2026]: Swift 6.2 and SwiftUI for iOS 26 are the active versions in 2026. Source: [hackingwithswift.com — What's new in SwiftUI for iOS 26](https://www.hackingwithswift.com/articles/278/whats-new-in-swiftui-for-ios-26)

[^flutter-tagline]: Official tagline: "Flutter is an open-source framework for building beautiful, natively compiled, multi-platform applications from a single codebase." — [flutter.dev](https://flutter.dev)

[^flutter-impeller]: Impeller replaced Skia as the default renderer in Flutter: first on iOS with Flutter 3.10 (May 2023), then on Android with Flutter 3.22 (May 2024). Source: [docs.flutter.dev — What's new](https://docs.flutter.dev/release/whats-new)

[^flutter-341]: Flutter 3.41 was released February 11, 2026. Source: [docs.flutter.dev — What's new](https://docs.flutter.dev/release/whats-new)

[^flutter-homepage]: [flutter.dev](https://flutter.dev)

[^rn-tagline]: Official tagline: "Learn once, write anywhere." — [reactnative.dev](https://reactnative.dev)

[^rn-084]: React Native 0.84, released February 11, 2026, with Hermes V1 as the default engine and the New Architecture mandatory since 0.82. Source: [reactnative.dev/blog/2026/02/11/react-native-0.84](https://reactnative.dev/blog/2026/02/11/react-native-0.84)

[^react-foundation]: In October 2025, Meta donated React, React Native, and JSX to the React Foundation (part of the Linux Foundation). Source: [engineering.fb.com — Introducing the React Foundation](https://engineering.fb.com/2025/10/07/open-source/introducing-the-react-foundation-the-new-home-for-react-react-native/)

[^kmp-stable]: KMP declared stability on November 1, 2023. Official JetBrains positioning: "An open-source technology built by JetBrains that allows developers to share code across platforms while retaining the benefits of native programming." Source: [blog.jetbrains.com — Kotlin Multiplatform Stable](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/)

[^kmp-2017]: KMP was introduced in Kotlin 1.2, presented at KotlinConf in November 2017. Source: [droidcon.com — Kotlin Multiplatform at Five Years](https://www.droidcon.com/2022/09/29/kotlin-multiplatform-at-five-years/)

[^compose-ios-stable]: Compose Multiplatform for iOS declared stability in May 2025 with version 1.8.0. Source: [blog.jetbrains.com — Compose Multiplatform 1.8.0](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/)

[^compose-110]: Compose Multiplatform 1.10.0 released January 2026. Source: [blog.jetbrains.com — Compose Multiplatform 1.10.0](https://blog.jetbrains.com/kotlin/2026/01/compose-multiplatform-1-10-0/)

[^capacitor-8]: Capacitor 8 was announced December 2025. Source: [ionic.io/blog/announcing-capacitor-8](https://ionic.io/blog/announcing-capacitor-8)

[^capacitor-830]: Capacitor 8.3.0 released March 25, 2026. Source: [github.com/ionic-team/capacitor/releases](https://github.com/ionic-team/capacitor/releases)

[^maui-tagline]: Official tagline: "Build native, cross-platform desktop and mobile apps all in one framework." — [dotnet.microsoft.com/en-us/apps/maui](https://dotnet.microsoft.com/en-us/apps/maui)

[^maui-10]: .NET MAUI 10.0 shipped with .NET 10. Source: [infoq.com — .NET 11 Preview 2 MAUI](https://www.infoq.com/news/2026/03/net-11-preview2-maui/)

[^xamarin-eol]: Xamarin reached end of support on May 1, 2024. Source: [dotnet.microsoft.com — Xamarin Support Policy](https://dotnet.microsoft.com/en-us/platform/support/policy/xamarin)

[^pwa-limits]: iOS/Safari support for advanced web APIs — background sync, Bluetooth, background processing — remains more limited than on Android. Source: [Wikipedia — Progressive web app](https://en.wikipedia.org/wiki/Progressive_web_app)

[^hook-c]: This table is the map from documentation and changelogs. Not from actual use. I expect it to look different after months with the two options I'm most interested in.

[^hook-d]: The question of how much code you can actually share — and when that makes sense — doesn't have a clean answer from the documentation. It's a practical question, and the next chapter will start trying to answer it.

[^kmp-adoption]: According to the JetBrains Developer Ecosystem Survey, KMP usage grew from 7% to 18% of developers in a single year. Source: [kotlinlang.org — Reasons to try KMP](https://kotlinlang.org/docs/multiplatform/multiplatform-reasons-to-try.html)

[^hook-a]: The series will go deep on KMP first — that's where my curiosity landed — and then on Flutter. After both, a choice. The choice isn't made yet.

[^hook-e]: What I want to build doesn't have a name in this chapter yet. But it exists. The destination of this series isn't a comparison document.
