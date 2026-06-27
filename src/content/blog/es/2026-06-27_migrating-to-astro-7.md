---
title: "Migrando a Astro 7: el compilador de Rust vino por mi Markdown"
description: "Migré XergioAleX.com a Astro 7 y a Sätteri, el nuevo compilador de Markdown en Rust: qué se rompió y por qué mis plugins de rehype tuvieron que mudarse."
pubDate: "2026-06-27"
heroLayout: "none"
tags: ["tech", "web-development", "javascript", "astro"]
keywords: ["guía migración Astro 7", "compilador Markdown Satteri Astro", "Astro 7 Markdown MDX en Rust", "portar plugins rehype a hastPlugins Satteri", "Astro 7 Vite 8 Rolldown", "actualizar Astro 6 a 7", "procesador markdown satteri astro", "ejemplo defineHastPlugin"]
series: "building-xergioalex"
seriesOrder: 10
---

La vez pasada, [activé un compilador de Rust experimental](/es/blog/migrating-to-astro-6/) y vi cómo mi servidor de desarrollo pasaba de once segundos a menos de tres. Se sentía como hacer trampa. La trampa estaba ahí mismo, en el nombre: *experimental*. Tenías que optar por él, instalar un paquete extra, poner un flag, y aceptar que el compilador más estricto podía dejar escapar una etiqueta `<style>` directo a producción — que, para que conste, fue exactamente lo que me hizo.

[Astro 7](https://astro.build/blog/astro-7/) cierra ese ciclo, y luego abre uno nuevo. El compilador de Rust para `.astro` que yo trataba como un experimento divertido ahora es el compilador **por defecto y único** — el flag desapareció porque ya no hay nada que activar. Y Astro tomó la misma idea — *reescribe la parte lenta en Rust* — y la apuntó hacia Markdown. Ese es el titular: un nuevo compilador de Markdown y MDX llamado **Sätteri**.

Este sitio ya lo corre. Así estuvo la migración, qué se rompió, y por qué eso de "se siente más rápido" otra vez no era toda la historia.

---

## La estrategia: primero los menores, después el mayor

El mismo manual que usé en el salto a Astro 6. Antes de tocar la versión mayor, corrí todas las actualizaciones menores y de parche primero — Biome, Vitest, Svelte, sharp, Playwright, Tailwind, el resto. El razonamiento no ha cambiado: aislar las variables. Si algo se rompe después de la actualización mayor, quiero *saber* que fue la mayor, no un parche que silenciosamente trajo una regresión tres días antes.

Todo fijado a versiones exactas — sin caret, sin sorpresas. Tests en verde, build limpio, y el terreno quedó despejado para el salto de verdad.

---

## La migración propiamente dicha

Los cambios de versión que importaron:

| Paquete | Antes | Después |
|---------|-------|---------|
| astro | 6.3.1 | 7.0.3 |
| @astrojs/mdx | 5.0.4 | 7.0.0 |
| @astrojs/svelte | 8.1.0 | 9.0.0 |
| @astrojs/markdown-satteri | — | 0.3.2 |
| @astrojs/compiler-rs | 0.2.0 | *eliminado* |
| rehype-external-links | 3.0.0 | *eliminado* |

Dos de esos son eliminaciones, y ahí está lo interesante. `@astrojs/compiler-rs` — el paquete que tuve que instalar a mano en el post de Astro 6 para tener el compilador de Rust experimental — ya no está. Astro 7 trae su compilador incluido; no hay paquete aparte ni flag. Así que lo primero que hizo la migración fue dejarme borrar código:

```diff
-  experimental: {
-    rustCompiler: true,
-  },
```

Eso que con tanto orgullo activé hace seis meses ahora es simplemente... cómo funciona Astro. Ese es el tipo correcto de obsolescencia.

`rehype-external-links` es la otra eliminación, y esa no fue gratis. Para explicar por qué, tengo que hablar de Sätteri.

---

## Lo nuevo: Sätteri, un compilador de Markdown en Rust

En Astro 7, [Sätteri](https://satteri.bruits.org/docs/plugins/) es el procesador **por defecto y único** para Markdown y MDX. Está escrito en Rust — `pulldown-cmark` para el parsing de CommonMark, `Oxc` para las expresiones de MDX — y es obra de Erika, integrante del equipo central de Astro.

La propuesta es la obvia una vez que viste al compilador de `.astro` recibir el tratamiento en Rust: el parsing de Markdown estaba ocurriendo en JavaScript, encima del ecosistema `unified`/remark/rehype, y para un sitio cargado de contenido eso se acumula. Astro reporta que cambiar el build de su propia documentación (y la de Cloudflare) a Sätteri recortó más de un minuto del tiempo de compilación, y que los sitios con mucho Markdown son los más beneficiados. Súmale [Vite 8 y su nuevo bundler Rolldown](https://astro.build/blog/astro-7/) — los benchmarks de Astro ponen los builds entre 15 y 61% más rápidos en general — y todo el pipeline se aceleró, no solo una capa.

Para un blog que es, en el fondo, una pila de Markdown, esa es la frase más relevante de todo el release.

Pero "reescribimos el pipeline de Markdown en Rust" tiene una consecuencia, y es la consecuencia que se comió mi tarde.

---

## Qué se rompió: mis plugins de rehype

Sätteri no corre plugins de remark ni de rehype.

Suena peor de lo que es, pero hay que dejarlo asentar un segundo. Todo el ecosistema de plugins de `unified` — cada paquete `remark-*` y `rehype-*` — asume un árbol de sintaxis en JavaScript que los plugins recorren y modifican. Sätteri parsea en Rust. No puede simplemente entregarle un árbol de `unified` a tus plugins viejos. Así que trae su *propia* API de plugins: `mdastPlugins` y `hastPlugins`, registrados con `defineHastPlugin` / `defineMdastPlugin`.

Yo tenía dos plugins de rehype en mi configuración:

```js
markdown: {
  rehypePlugins: [
    [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    rehypeTableResponsive,
  ],
},
```

`rehype-external-links` abría los enlaces externos en una pestaña nueva con atributos `rel` seguros. `rehypeTableResponsive` era una transformación pequeña, propia del repo, que envuelve cada `<table>` en un div `.table-responsive` para que las tablas anchas hagan scroll dentro de la columna en lugar de reventar la página en móvil.

Astro 7 te da una salida de emergencia: instalas `@astrojs/markdown-remark`, apuntas `markdown.processor` a su procesador `unified()`, y tus plugins viejos siguen funcionando — a costa de correr el pipeline de JavaScript del que estabas tratando de salir. Yo no quería la salida de emergencia. El punto entero era *estar* en Sätteri. Así que porté los dos plugins.

El port resultó más pequeño que el susto que produjo. Aquí está el envoltorio de tablas, antes y después:

```js
// Antes — una transformación de unified/rehype recorriendo el árbol HAST
export function rehypeTableResponsive() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table') return;
      // ...construir un div envoltorio, insertarlo en parent.children
    });
  };
}
```

```js
// Después — un plugin HAST de Sätteri
defineHastPlugin({
  name: 'table-responsive',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      ctx.wrapNode(node, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-responsive'] },
        children: [],
      });
    },
  },
});
```

La forma es de hecho más agradable. En lugar de recorrer todo el árbol y revisar el `tagName` en cada nodo, declaras un `filter` — `['table']`, `['a']` — y Sätteri solo te entrega los nodos que pediste. El lado de Rust hace el emparejamiento. Las modificaciones pasan por un objeto de contexto (`ctx.wrapNode`, `ctx.setProperty`, `ctx.parent`) en vez de andar insertando elementos en arreglos a mano, lo que mantiene la arena de Rust sincronizada con lo que cambias. Los dos plugins ahora viven en un solo `satteri-plugins.ts`, y los tests viejos se reescribieron contra un contexto simulado.

La configuración que reemplazó al bloque `rehypePlugins`:

```js
import { satteri } from '@astrojs/markdown-satteri';
import { satteriExternalLinks, satteriTableResponsive } from './src/lib/satteri-plugins';

export default defineConfig({
  markdown: {
    processor: satteri({
      hastPlugins: [satteriExternalLinks(), satteriTableResponsive()],
    }),
  },
});
```

Un detalle me ahorró buena parte del trabajo: el `processor` de `@astrojs/mdx` 7 usa por defecto el `markdown.processor`. Así que configurar el procesador una sola vez cubre tanto `.md` como `.mdx` — no tuve que cablear MDX por separado. Un pipeline, dos tipos de archivo.

### Los dos rasguños

Nada grave se rompió más allá de los plugins, pero dos cosas pequeñas necesitaron atención. Mi configuración de Vitest le pasaba `svelte({ hot: false })` al plugin de Svelte; la opción `hot` fue eliminada en `@sveltejs/vite-plugin-svelte` 7, y con Astro 7 pasó de ser una advertencia a un error de tipo `ts(2353)` real en `astro check`. El arreglo fue borrar dos palabras. Y el `$schema` de la configuración de Biome estaba fijado a una versión más vieja que la del CLI, así que lo subí. Ninguno era interesante. Ambos eran de esas cosas que no puedo dejar pasar en la terminal.

### Qué no se rompió

Venía preparado para más, y casi todo lo que me preocupaba fue un no-evento:

- **Mis islas de Svelte** — `@astrojs/svelte` pasó de 8 a 9, un salto mayor, y los componentes interactivos no necesitaron ni una edición.
- **Las content collections** — ya me había movido a loaders con `glob()` durante la migración a Astro 6, así que esta vez no había ningún esquema heredado que desenredar. El trabajo anterior pagó por adelantado.
- **Vite 8 y Rolldown** — un nuevo bundler mayor por debajo, y tanto mi configuración de `manualChunks` como el filtro `onwarn` que había escrito para Svelte sobrevivieron sin tocarse.
- **Los tests** — 220, incluidos los tests reescritos del plugin de Sätteri, en verde a la primera.

La lección de la vez pasada se sostuvo: cuando te mantienes al día entre versiones mayores, la mayor deja de dar miedo. La mayor parte del trabajo es borrar cosas que se volvieron el comportamiento por defecto.

---

## Prueba, no efecto placebo

Aquí está la parte que me importa, porque la vez pasada eso de "todo se siente más rápido" resultó ser el compilador de Rust haciendo trabajo real, y aprendí a verificar.

El build quedó en verde: `astro check` con cero errores, Biome limpio, los **220 tests unitarios** pasando a la primera, y un build de producción completo de **416 páginas**. Pero un build en verde no prueba que Sätteri esté de verdad *corriendo* — un procesador puede caer de vuelta a otro en silencio. Así que me puse a buscar en el HTML generado las huellas de mis dos plugins portados.

Estaban por todos lados. **3.150** enlaces externos a lo largo del sitio habían sido reescritos con `target="_blank" rel="noopener noreferrer"`. **Veintiún posts** renderizaron sus tablas envueltas en `<div class="table-responsive">`. Esas transformaciones solo existen si `satteriExternalLinks` y `satteriTableResponsive` corrieron — lo que solo pasa si Sätteri es el procesador activo. Si hubiera caído de vuelta a `unified`, los `hastPlugins` nunca se dispararían y ese markup no estaría ahí. Estaba ahí. Sätteri es el que está compilando.

Así que, como la vez pasada: no es placebo. El Markdown que construye este sitio ahora se parsea en Rust, y los plugins que me daba miedo portar están corriendo en el pipeline nuevo, en cada página.

---

## ¿Valió la pena?

La migración en sí fue aburrida, y lo digo como el mayor de los cumplidos. Subir las versiones, borrar un flag, portar dos plugins, arreglar dos rasguños, ver pasar los tests. Una tarde, no un fin de semana.

Lo *interesante* es la dirección. La historia que arrancó en el post de Astro 6 como un experimento divertido — "mira qué rápido pone Rust al compilador de `.astro`" — ahora es la base sobre la que construyes sin pensarlo, y se extendió a la siguiente capa hacia abajo. Primero los componentes, ahora el contenido. En cada release, otra parte lenta de las herramientas se vuelve silenciosamente más rápida, y te enteras solo cuando vas y lo mides.

Para cualquiera en Astro 6 que se pregunte si dar el salto: si usas plugins de remark o rehype, esa es tu única decisión real — pórtalos a los `hastPlugins` de Sätteri, o quédate con la salida de emergencia de `@astrojs/markdown-remark` y corre el pipeline de JavaScript un rato más. Todo lo demás es la actualización de Astro suave de siempre. Y si tu sitio es mayormente Markdown, el compilador de Rust no es un lujo opcional. Es la razón para ir.

---

## Recursos

- [Blog del Release de Astro 7.0](https://astro.build/blog/astro-7/) — Vista completa de funcionalidades, Sätteri, Vite 8 + Rolldown
- [Guía de Actualización de Astro 6 → 7](https://docs.astro.build/en/guides/upgrade-to/v7/) — Migración paso a paso
- [Documentación de Plugins de Sätteri](https://satteri.bruits.org/docs/plugins/) — Escribir plugins MDAST/HAST
- [El PR de la migración de este sitio](https://github.com/xergioalex/xergioalex.com/pull/162) — El diff real
- [Repositorio de XergioAleX.com](https://github.com/xergioalex/xergioalex.com) — El código fuente

Sigamos construyendo.
