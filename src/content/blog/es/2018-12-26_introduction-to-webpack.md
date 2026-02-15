---
title: "Introducción a Webpack"
description: "Empaquetador de módulos para aplicaciones JavaScript modernas — entry points, loaders, plugins y developer experience."
pubDate: "2018-12-26"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

En diciembre de 2018 di una charla sobre Webpack — el empaquetador de módulos que se convirtió en el estándar de facto para aplicaciones JavaScript modernas. El objetivo era desmitificar la configuración y mostrar cómo reúne AMD y CommonJS en un solo lugar.

**Sistemas de módulos en JavaScript:** AMD (Asynchronous Module Definition, ej. RequireJS) carga módulos de forma asíncrona. CommonJS (estilo Node.js) permite una sola petición con todas las librerías que necesitas. Webpack combina lo mejor de ambos mundos.

**Otras herramientas:** Gulp y Grunt son task runners — los configuras para minificar, transpilar, compilar. Browserify solo te deja usar `require` en el navegador. Parcel a menudo se describe como "Webpack fancy" — menos config, más convención. Webpack es sobre **developer experience**: divide y vencerás.

---

## Lo que necesitas configurar

- **Entry points** — El(los) módulo(s) principal(es) por donde Webpack empieza. Puedes tener múltiples.
- **Output** — Dónde va el bundle, cómo se llama.
- **Loaders** — Manejan diferentes tipos de archivo: imágenes (jpg, png, gif), fuentes, CoffeeScript, Stylus, Sass, JSX.
- **Plugins** — Extienden Webpack: Uglify para minificación, code splitting en chunks para carga más rápida.

---

## Instalación y ejemplos

```bash
npm i webpack webpack-cli --save-dev
# o
yarn add webpack webpack-cli --dev
```

Compartí ejemplos de código de [Jopmi Landing](https://github.com/RockaLabs/jopmi-landing), [Webpack Backend Example](https://github.com/xergioalex/webpack_backend_example) y [Webpack Frontend Examples](https://github.com/xergioalex/webpack_examples).

---

## Slides y referencias

- [Ver slides](https://slides.com/xergioalex/introduction-to-webpack)
- [Gulp vs Grunt vs Webpack](https://da-14.com/blog/gulp-vs-grunt-vs-webpack-comparison-build-tools-task-runners)
