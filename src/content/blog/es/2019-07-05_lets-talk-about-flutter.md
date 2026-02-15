---
title: "Hablemos de Flutter"
description: "Introducción a Flutter — el SDK cross-platform de Google para construir apps nativas Android e iOS desde una sola base de código con Dart."
pubDate: "2019-07-05"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

En julio de 2019 di una charla sobre Flutter en Pereira Tech Talks. Flutter acababa de llegar a 1.0 en diciembre de 2018, y el buzz era real — un SDK gratuito y open source para construir apps nativas Android e iOS desde la misma base de código. Ya no más mantener dos codebases separados para móvil.

**¿Qué es Flutter?** Un SDK móvil cross-platform. Usa el motor de renderizado Skia 2D y compila a código ARM nativo — así obtienes rendimiento nativo real, no un wrapper WebView. El lenguaje es **Dart** — un lenguaje multi-paradigma que impulsa las apps Flutter. También puedes usar Dart para backend (aplicaciones servidor) y frontend (Angular Dart), así que es una opción full-stack.

---

## Tipos de desarrollo móvil

- **Nativo** — Codebases separados por plataforma (Swift/Kotlin)
- **Híbrido** — Basado en WebView (Cordova, Ionic)
- **Cross-platform** — Una base de código, múltiples plataformas (React Native, Flutter)

Flutter cae en la categoría cross-platform, pero con una diferencia clave: no usa los componentes nativos de UI. Dibuja todo con Skia, lo que te da consistencia pixel-perfect entre plataformas y control total sobre el look and feel.

---

## Básicos de Flutter

- **Declarativo** — Inspirado en React. Describes la UI como función del estado.
- **Widgets** — Todo es un widget: `StatelessWidget` para UI estática, `StatefulWidget` para UI dinámica.
- **Layout** — `Row`, `Column`, `Stack`, `Container`, `Text`, etc.
- **Estructura del proyecto** — `lib/` para código Dart, `pubspec.yaml` para dependencias y assets.

---

## Recursos

- [Flutter Demo App](https://github.com/xergioalex/demo_flutter_app)
- [Documentación de Flutter](https://flutter.dev/docs)
- [Curso Flutter en Platzi](https://platzi.com/clases/flutter/)
- [DartPad](https://dartpad.dartlang.org/)

---

## Slides y referencias

- [Ver slides](https://slides.com/xergioalex/lets-talk-about-flutter)
