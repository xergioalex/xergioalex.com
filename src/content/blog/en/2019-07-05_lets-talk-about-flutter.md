---
title: "Let's Talk About Flutter"
description: "What I shared in a talk on Flutter — cross-platform SDK, Dart, evolution, widgets, project structure, and demos."
pubDate: "2019-07-05"
heroImage: "/images/blog/posts/lets-talk-about-flutter/hero.png"
heroLayout: "side-by-side"
tags: ["talks", "tech"]
---

Flutter — a **free, open-source SDK** to create native Android and iOS applications from the same codebase. The buzz was real — it had just hit 1.0 in December 2018.

---

## Evolution

- **Alpha** (2017)
- **Beta** (February 2018)
- **1.0** (December 2018)

---

## Types of Mobile Development

- **Native** — Separate codebases per platform (Swift/Kotlin)
- **Hybrid** — WebView-based (Cordova, Ionic)
- **Cross-platform** — One codebase, multiple platforms (React Native, Flutter)

Flutter is **cross-platform** with a key difference: it uses the **Skia 2D rendering engine**. It doesn't use WebView or native UI components — it draws everything with Skia, giving you pixel-perfect consistency across platforms and full control over the look and feel.

---

## Dart

**Dart** is a multi-paradigm programming language used to code Flutter apps. You can build **full-stack** applications with Dart:

- **Mobile** — Flutter
- **Frontend** — Angular Dart
- **Backend** — Server applications

---

## Installation

- [Flutter SDK](https://flutter.dev/docs/get-started/install)
- [Android Studio](https://developer.android.com/studio/?hl=es-419)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Xcode](https://developer.apple.com/xcode/) (for iOS)

Verify installation: `flutter doctor`

---

## Flutter Project Structure

- **flutter_app/** — Main folder
- **android/** — Android configurations
- **ios/** — iOS configurations
- **pubspec.yaml** — Project config: assets, fonts, images, plugins
- **lib/** — Flutter code written in Dart

---

## Inspired by React — Declarative Programming

Flutter uses a **declarative** approach. You describe the UI as a function of state. The typical structure includes:

- **main()** — Entry point
- **StatelessWidget** — Widget without mutable state (Icons, Text, Container, Row, Column)
- **StatefulWidget** — Dynamic widget that changes with interactions (Sliders, Checkbox, Radio, Forms)
- **Scaffold** — Base structure: appBar, body, bottomNavigationBar, floatingActionButton

**Everything's a widget.**

---

## Basic Widgets

- **Text** — [api.flutter.dev](https://api.flutter.dev/flutter/widgets/Text-class.html)
- **Row** — Horizontal layout
- **Column** — Vertical layout
- **Stack** — Widget stacking
- **Container** — Container with margins, color, dimensions

---

## Demo and Resources

- [Flutter Demo App](https://github.com/xergioalex/demo_flutter_app)
- [Flutter Documentation](https://flutter.dev/docs)
- [Platzi Flutter Course](https://platzi.com/clases/flutter/)
- [DartPad](https://dartpad.dartlang.org/)
- [Flutter Theme](https://startflutter.com/)

---

[View slides](https://slides.com/xergioalex/lets-talk-about-flutter)

Let's keep building.
