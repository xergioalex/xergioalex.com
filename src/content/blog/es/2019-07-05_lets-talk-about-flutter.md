---
title: "Hablemos de Flutter"
description: "Lo que compartí en una charla sobre Flutter — SDK cross-platform, Dart, evolución, widgets, estructura del proyecto y demos."
pubDate: "2019-07-05"
heroImage: "/images/blog/posts/lets-talk-about-flutter/hero.png"
heroLayout: "side-by-side"
tags: ["talks", "tech"]
---

Di una charla sobre Flutter en Pereira Tech Talks. Flutter es un **SDK gratuito y open source** para crear aplicaciones nativas Android e iOS desde la misma base de código. El buzz era real — acababa de llegar a 1.0 en diciembre de 2018.

---

## Evolución

- **Alpha** (2017)
- **Beta** (febrero 2018)
- **1.0** (diciembre 2018)

---

## Tipos de desarrollo móvil

- **Nativo** — Codebases separados por plataforma (Swift/Kotlin)
- **Híbrido** — Basado en WebView (Cordova, Ionic)
- **Cross-platform** — Una base de código, múltiples plataformas (React Native, Flutter)

Flutter es **cross-platform** con una diferencia clave: usa el **motor de renderizado Skia 2D**. No usa WebView ni componentes nativos de UI — dibuja todo con Skia, lo que da consistencia pixel-perfect entre plataformas y control total sobre el look and feel.

---

## Dart

**Dart** es un lenguaje de programación multi-paradigma usado para codificar apps Flutter. Puedes construir aplicaciones **full stack** con Dart:

- **Mobile** — Flutter
- **Frontend** — Angular Dart
- **Backend** — Aplicaciones servidor

---

## Instalación

- [SDK Flutter](https://flutter.dev/docs/get-started/install)
- [Android Studio](https://developer.android.com/studio/?hl=es-419)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Xcode](https://developer.apple.com/xcode/) (para iOS)

Verificar instalación: `flutter doctor`

---

## Estructura de un proyecto Flutter

- **flutter_app/** — Carpeta principal
- **android/** — Configuraciones para Android
- **ios/** — Configuraciones para iOS
- **pubspec.yaml** — Configuración del proyecto: assets, fuentes, imágenes, plugins
- **lib/** — Código Flutter escrito en Dart

---

## Inspirado en React — Programación declarativa

Flutter usa un enfoque **declarativo**. Describes la UI como función del estado. La estructura típica incluye:

- **main()** — Punto de entrada
- **StatelessWidget** — Widget sin estado mutable (Iconos, Text, Container, Row, Column)
- **StatefulWidget** — Widget dinámico que cambia con interacciones (Sliders, Checkbox, Radio, Forms)
- **Scaffold** — Estructura base: appBar, body, bottomNavigationBar, floatingActionButton

**Todo es un widget.**

---

## Widgets básicos

- **Text** — [api.flutter.dev](https://api.flutter.dev/flutter/widgets/Text-class.html)
- **Row** — Layout horizontal
- **Column** — Layout vertical
- **Stack** — Superposición de widgets
- **Container** — Contenedor con márgenes, color, dimensiones

---

## Demo y recursos

- [Demo Flutter App](https://github.com/xergioalex/demo_flutter_app)
- [Documentación Flutter](https://flutter.dev/docs)
- [Curso Flutter en Platzi](https://platzi.com/clases/flutter/)
- [DartPad](https://dartpad.dartlang.org/)
- [Flutter Theme](https://startflutter.com/)

---

[Ver slides](https://slides.com/xergioalex/lets-talk-about-flutter)

A seguir construyendo.
