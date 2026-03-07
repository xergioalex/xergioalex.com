---
title: "Por qué abandoné ESLint + Prettier por Biome"
description: "Después de años persiguiendo actualizaciones de ESLint y manejando los conflictos con Prettier, me pasé a Biome. Un archivo de configuración, un binario, y no he mirado atrás."
pubDate: '2026-03-07'
heroLayout: 'none'
tags: ['tech', 'web-development', 'javascript']
---

Corrí `npm update eslint` y vi cómo mi pipeline de CI se rompía. De nuevo. Tercera vez ese año.

Era 2024, durante la migración a ESLint v9. Abrí la guía de migración. Era más larga que el README de mi proyecto. Hablaba de flat config, de la depreciación de `.eslintrc`, de utilidades `FlatCompat` para cuando tus plugins aún no se habían actualizado. Pasé dos horas — dos horas en configuración de linting, que debería tomar quince minutos en total, de por vida — solo para volver al punto donde estaba antes de la actualización.

Ese fue el momento en que empecé a buscar alternativas de verdad.

---

## Los años en que funcionó

Quiero ser justo. ESLint y Prettier funcionaron bien juntos durante mucho tiempo. Los usé en todos mis proyectos — este sitio personal, el frontend de DailyBot, una docena de proyectos paralelos. Configuración única, olvidarse del tema. Ejecuta al guardar, ejecuta en CI. El código sale con formato consistente. Imports ordenados. Punto y coma donde se espera.

Ese era el trato. Y se mantuvo, más o menos, hasta que dejó de hacerlo.

El problema no fue que ESLint o Prettier empeoraran. El problema es que el ecosistema alrededor de ellos se volvió complicado de una manera que hacía que cada actualización se sintiera como una negociación.

Hubo un período — creo que alrededor de 2022, 2023 — donde tenía un setup en VS Code con ESLint y Prettier configurados como formateadores. No me di cuenta del problema hasta que noté que mis archivos parpadeaban al guardar. ESLint ejecutaba, reformateaba el código de una manera. Prettier ejecutaba, lo reformateaba de vuelta. O a veces al revés. El archivo saltaba visiblemente — podías ver cómo la indentación cambiaba y cambiaba de vuelta en menos de un segundo. Pensé que tenía un problema de CPU antes de darme cuenta de que eran dos herramientas con opiniones peleando por el mismo texto.

La solución era `eslint-config-prettier` — un paquete que deshabilita todas las reglas de formato de ESLint que se superponen con Prettier. Un paquete que existe únicamente porque dos herramientas tienen opiniones superpuestas y a una hay que decirle que se calle. Lo instalas, pones `"prettier"` al final del array `extends` de ESLint, configuras VS Code para usar solo Prettier como formateador al guardar. Tres pasos para resolver un problema que no debería existir.

Funcionaba. Pero cargabas ese conocimiento en tu cabeza para siempre — el orden exacto, la entrada exacta de configuración, el ajuste exacto de VS Code. Cambia algo y la pelea volvía a empezar.

---

## La colección de archivos de configuración

Esto es lo que un setup real de ESLint + Prettier + TypeScript requiere en la práctica:

- `.eslintrc.js` (o `.json`, o `.yml`, o `.cjs` — escoge el que prefieras)
- `.prettierrc` (o `.prettierrc.json`, o `.prettierrc.js`)
- `.eslintignore`
- `.prettierignore`
- `eslint-config-prettier` — para deshabilitar las ~100 reglas de formato de ESLint que pelean con Prettier
- `eslint-plugin-prettier` — si quieres que los errores de Prettier aparezcan como errores de ESLint
- `@typescript-eslint/parser` y `@typescript-eslint/eslint-plugin` — para soporte de TypeScript

Ejecuta `npm install` en un proyecto nuevo. Mira cómo 127+ paquetes aterrizan en tu `node_modules`. No es un error tipográfico. Ciento veintisiete paquetes, solo para linting y formato.

Y luego está el problema del orden de configuración — los overrides de Prettier deben ir al *final* de tu config de ESLint, de lo contrario las reglas de formato pelean entre sí. Equivócate y tu editor reformatea el archivo de una manera al guardar, ESLint lo reformatea de vuelta, el archivo no para de parpadear. He depurado ese problema exacto más veces de las que me gustaría admitir.

---

## ESLint v9 y lo que pasó después

En abril de 2024, ESLint lanzó v9. Su primera versión mayor en casi tres años. Introdujeron el "flat config" — un nuevo formato de configuración que reemplazaba el sistema antiguo de `.eslintrc`.

En teoría era más limpio. Un solo archivo `eslint.config.js`, nativo de JavaScript, imports explícitos. En la práctica — ESLint publicó una retrospectiva en mayo de 2025, más de un año después del lanzamiento, y esto es lo que escribieron:

> "El sentimiento inicial en línea fue mayoritariamente negativo, con usuarios diciendo que v9.0.0 'no estaba lista', 'no funcionaba', o incluso que 'rompió el ecosistema'. Algunos postergaron la actualización mientras otros consideraron cambiar de herramienta."

Eso es del propio post-mortem del equipo de ESLint. Lo escribieron sobre su propio lanzamiento.

¿Qué salió mal? Varias cosas. La nueva sintaxis de flat config era — usando la palabra amable — verbosa. Los plugins de repente necesitaban exponer sus configuraciones de manera diferente, y no todos lo hacían igual. Algunos exportaban un objeto. Algunos un array. Algunos no se habían actualizado, así que necesitabas `FlatCompat` de `@eslint/eslintrc` solo para cargarlos. Los usuarios se topaban con errores de tipo `TypeError: context.getScope is not a function` para plugins que no se habían actualizado a la API de reglas de v9.

Había una discusión en GitHub — `eslint/eslint` #20500, si la quieres encontrar — preguntando por qué había 7+ formas distintas de usar plugins con flat config. Pregunta legítima. No tuvo una buena respuesta.

La respuesta eventual del equipo fue traer `extends` de vuelta. A través de `defineConfig()`. Una función que habían eliminado porque era "innecesaria en flat config". La eliminaron, recibieron retroalimentación de usuarios, y la volvieron a agregar. Esa secuencia dice bastante sobre cómo fue el rollout.

Y luego llegó ESLint v10 en febrero de 2026. El sistema antiguo de `.eslintrc` — el que todos habían usado durante años — fue eliminado completamente. No depreciado. Eliminado. Si no habías migrado todavía, ahora no tenías opción.

Cada proyecto que tocaba tenía alguna versión de este problema. Un plugin que no estaba actualizado. Una configuración compartida que necesitaba ser envuelta manualmente en `FlatCompat`. Un pipeline de CI que pasaba en local pero fallaba en el servidor por diferencias en la versión de Node.js al cargar la configuración. Horas de depuración, para un resultado que se veía idéntico a lo que tenía antes.

---

## Llega Biome

Había oído hablar de Biome en 2023. Un fork de Rome — una herramienta que intentó ser un toolchain unificado para JavaScript, se quedó en silencio por un tiempo, y luego regresó como Biome con un enfoque más claro: linting y formato, bien hecho, en una sola herramienta.

Escrito en Rust. Un solo binario. Un archivo de configuración.

Era escéptico. "Otra herramienta de linting" no es un argumento que convence fácilmente después de haber pagado los costos de migración de ESLint. Pero seguía volviendo a los números del [repositorio de Biome](https://github.com/biomejs/biome/blob/main/benchmark/README.md): 10,000 archivos procesados por el linter en 0.8 segundos frente a 45.2 segundos de ESLint. 10,000 archivos formateados en 0.3 segundos frente a 12.1 segundos de Prettier. Tus números van a variar — máquina, tamaño de archivos, complejidad — pero la diferencia de orden de magnitud es real. La velocidad viene de que Biome parsea el código una vez y reutiliza el AST tanto para linting como para formato. ESLint y Prettier parsean el código de forma independiente, y luego a veces pelean por el resultado.

Lo probé en este sitio — xergioalex.com, el proyecto de Astro + Svelte + TypeScript que corre en Cloudflare Pages. La migración tomó alrededor de una hora, principalmente porque quería entender lo que estaba haciendo en lugar de solo ejecutar comandos a ciegas.

Los comandos de migración reales:

```bash
biome migrate eslint
biome migrate prettier
```

Eso es todo. Esos dos comandos leen tus configuraciones existentes y generan un `biome.json` equivalente. Luego eliminas los archivos viejos y desinstalas alrededor de 120 paquetes.

Ejecuté `npm uninstall eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin` y vi cómo caía el conteo de paquetes. Luego eliminé cuatro archivos de configuración. Luego instalé un paquete: `@biomejs/biome`.

Esa eliminación — no quiero exagerarla — se sintió bien de una manera que me sorprendió. No porque las herramientas viejas fueran malas, sino porque la acumulación era visible. La podías ver en el conteo de paquetes, en el listado del directorio raíz, en el tiempo de instalación en CI. Eliminarla se sintió como limpiar un contador que había estado acumulando durante años.

---

## Lo que estoy usando en la práctica

Este es el `biome.json` de xergioalex.com, el sitio donde estás leyendo esto:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.4.5/schema.json",
  "linter": {
    "enabled": true,
    "rules": {
      "suspicious": {
        "noUnknownAtRules": "off",
        "noExplicitAny": "off"
      },
      "complexity": {
        "noBannedTypes": "off"
      },
      "correctness": {
        "noUnusedImports": "off",
        "noUnusedVariables": "off"
      },
      "style": {
        "useImportType": "off",
        "useConst": "off"
      }
    }
  },
  "files": {
    "ignoreUnknown": false,
    "includes": [
      "src/**",
      "!**/.astro",
      "!**/docs",
      "!**/dist",
      "!**/node_modules",
      "!**/public",
      "!**/.github"
    ]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5"
    }
  },
  "css": {
    "parser": {
      "tailwindDirectives": true
    }
  }
}
```

Cincuenta líneas. Eso es todo. Sin archivo ignore separado — `includes` lo maneja. Sin configuración de formato separada — está ahí mismo en el mismo archivo. Soporte de CSS incluido, con las directivas de Tailwind configuradas a través del flag `tailwindDirectives: true` del parser. El override `noUnknownAtRules: "off"` también está presente — por si acaso — para cualquier at-rule que el parser no reconozca automáticamente.

Los overrides que configuré: `noExplicitAny: "off"` porque tengo algo de código de interoperabilidad con TypeScript donde `any` es genuinamente el tipo correcto, `noUnusedImports: "off"` y `noUnusedVariables: "off"` porque esas reglas son útiles en CI pero generan ruido durante el desarrollo activo. Todo lo demás corre con los defaults de Biome.

Tres scripts de npm:

```json
"biome:check": "biome check",
"biome:fix": "biome check --write",
"biome:fix:unsafe": "biome check --write --unsafe"
```

`biome check` ejecuta el linter y el formatter juntos y reporta las violaciones. `--write` aplica las correcciones seguras automáticamente. `--unsafe` aplica todo, incluyendo transformaciones que podrían cambiar el comportamiento — ese lo uso raramente y con `git diff` abierto.

Un paquete instalado. Un archivo de configuración. Tres comandos. Compáralo con lo que había antes.

---

## Siendo honesto sobre lo que no puede hacer

No voy a pretender que Biome reemplaza ESLint función por función. No lo hace.

ESLint existe desde 2013. Su ecosistema tiene miles de reglas construidas por la comunidad. `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `eslint-plugin-security`, `eslint-plugin-unicorn` — plugins especializados para cada caso de uso. Biome tiene cientos de reglas integradas — el número sube con cada versión — y un sistema de plugins (GritQL, agregado en Biome 2.0) que todavía está madurando.

El soporte de Astro y Svelte es parcial. Biome maneja el JavaScript y TypeScript dentro de esos archivos, pero no la sintaxis de plantilla — los bloques `<template>` de Svelte, las directivas específicas de Astro. Eso está en el roadmap para 2026, pero aún no está ahí. Para este sitio, eso es aceptable — el código TypeScript es donde las reglas de lint importantes necesitan ejecutarse.

El linting consciente de tipos — creo que esta es el área donde la cobertura de Biome importa más y es más difícil de cuantificar con precisión. Reglas como `noFloatingPromises` funcionan — Biome hace inferencia de tipos por su cuenta, sin ejecutar el compilador de TypeScript, lo cual es genuinamente diferente a lo que hace typescript-eslint. La cobertura no es del 100%; hay casos extremos que typescript-eslint captura y Biome todavía no. Si esa brecha importa depende de tu proyecto y de cuáles reglas específicas necesitas. Para mí, la cobertura que realmente uso está sólida, y la diferencia de rendimiento — sin invocar el compilador de TypeScript en el proceso de linting — vale la pena.

HTML, Markdown y SCSS no están soportados todavía.

Honestamente — si tienes un proyecto que depende mucho de reglas específicas de `eslint-plugin-react-hooks`, o de jsx-a11y para enforcement de accesibilidad a nivel de linting, quizás necesitas un setup híbrido por un tiempo. Biome para formato y la mayoría del linting, ESLint para las reglas específicas que necesitas. Ese es un patrón real en 2025-2026. Es más configuración de la que quiero, pero es mejor que manejar todo el stack de ESLint.

Para este sitio, nada de eso es un problema. Biome cubre todo lo que necesito.

---

## Biome 2.0 y lo que viene

En junio de 2025, Biome 2.0 llegó — nombre en clave "Biotype". Dos grandes adiciones: plugins (escribe reglas de lint personalizadas en GritQL) e inferencia de tipos (reglas de lint que entienden los tipos de TypeScript sin ejecutar `tsc`).

El trabajo de inferencia de tipos fue patrocinado por Vercel — lo cual, si lo piensas, dice bastante sobre hacia dónde va el ecosistema de herramientas frontend. Las grandes empresas de infraestructura no patrocinan proyectos de linting por caridad. Lo hacen porque las herramientas lentas les cuestan minutos de CI y tiempo de desarrollo, y Biome es significativamente más rápido a escala. La regla `noFloatingPromises` — la regla estrella consciente de tipos — ya funciona. La cobertura sigue mejorando con cada versión.

El roadmap de 2026 incluye mejor soporte para Astro/Svelte/Vue — linting en las secciones de template/markup, no solo en los bloques de script. Reglas de lint cruzadas entre JavaScript y CSS. Mejor integración con LSP para que los editores puedan mostrar referencias entre tipos de archivos.

Nada de eso está disponible todavía. Pero la dirección es clara: una herramienta que maneja todo tu stack de frontend. Linting, formato, eventualmente bundling. Menos código de integración. Menos configuración. Menos "¿por qué ESLint está peleando con Prettier de nuevo?".

---

## Por qué no voy a volver

La decisión no fue solo por la velocidad. La velocidad es real — mi `biome:check` local corre en menos de un segundo, siempre. Pero honestamente, podría vivir con un linter más lento si la configuración fuera estable.

Lo que me quebró de ESLint fue el costo de mantenimiento. Cada versión mayor se sentía como un proyecto de migración. De v8 a v9 me tomó horas. La eliminación de `eslintrc` en ESLint v10 significa que todos los que seguían en el formato viejo tuvieron que migrar, quisieran o no. La danza del conflicto con Prettier — el paquete `eslint-config-prettier` existe solo porque dos herramientas tienen opiniones superpuestas sobre el formato y a alguien hay que decirle que se calle.

Biome no tiene ese problema. Una configuración. Una herramienta. Cuando actualizo Biome, actualizo la versión del `$schema` en `biome.json` y ejecuto `biome migrate`. Maneja las diferencias de configuración automáticamente.

Sé que las cosas cambian — Biome puede tener su propia historia de migración de v2 a v3 algún día. Espero que la manejen mejor de lo que ESLint manejó la suya. Pero ahora mismo, la superficie de mantenimiento es dramáticamente más pequeña, y quiero mantenerla así.

---

## Recursos

- [Biome.js](https://biomejs.dev/) — Documentación y guía de inicio rápido
- [Post de lanzamiento de Biome v2](https://biomejs.dev/blog/biome-v2/) — Qué llegó en 2.0 (plugins, inferencia de tipos)
- [Migrar de ESLint y Prettier a Biome](https://biomejs.dev/guides/migrate-eslint-prettier/) — Guía de migración oficial
- [Retrospectiva de ESLint v9.0.0](https://eslint.org/blog/2025/05/eslint-v9.0.0-retrospective/) — Vale la pena leerlo si quieres entender qué salió mal
- [Benchmarks de Biome](https://github.com/biomejs/biome/blob/main/benchmark/README.md) — De dónde vienen los números

A seguir construyendo.
