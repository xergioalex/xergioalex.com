---
title: "Let's Talk About Flutter"
description: "Introduction to Flutter — Google's cross-platform SDK for building native Android and iOS apps from a single codebase with Dart."
pubDate: "2019-07-05"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

In July 2019 I gave a talk on Flutter at Pereira Tech Talks. Flutter had just hit 1.0 in December 2018, and the buzz was real — a free, open-source SDK to build native Android and iOS apps from the same codebase. No more maintaining two separate codebases for mobile.

**What is Flutter?** A cross-platform mobile SDK. It uses the Skia 2D rendering engine and compiles to native ARM code — so you get real native performance, not a WebView wrapper. The language is **Dart** — a multi-paradigm language that powers Flutter apps. You can also use Dart for backend (server applications) and frontend (Angular Dart), so it's a full-stack option.

---

## Types of Mobile Development

- **Native** — Separate codebases per platform (Swift/Kotlin)
- **Hybrid** — WebView-based (Cordova, Ionic)
- **Cross-platform** — One codebase, multiple platforms (React Native, Flutter)

Flutter falls in the cross-platform category, but with a key difference: it doesn't use the native UI components. It draws everything with Skia, which gives you pixel-perfect consistency across platforms and full control over the look and feel.

---

## Flutter Basics

- **Declarative** — Inspired by React. You describe the UI as a function of state.
- **Widgets** — Everything is a widget: `StatelessWidget` for static UI, `StatefulWidget` for dynamic UI.
- **Layout** — `Row`, `Column`, `Stack`, `Container`, `Text`, etc.
- **Project structure** — `lib/` for Dart code, `pubspec.yaml` for dependencies and assets.

---

## Resources

- [Flutter Demo App](https://github.com/xergioalex/demo_flutter_app)
- [Flutter Documentation](https://flutter.dev/docs)
- [Platzi Flutter Course](https://platzi.com/clases/flutter/)
- [DartPad](https://dartpad.dartlang.org/)

---

## Slides & Reference

- [View slides](https://slides.com/xergioalex/lets-talk-about-flutter)
