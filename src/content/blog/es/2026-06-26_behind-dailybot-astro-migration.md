---
title: "Detrás de la migración de dailybot.com a Astro: la vista del ingeniero"
description: "Lideré la migración de dailybot.com de un CMS visual a Astro. La historia del equipo está en el blog de DailyBot. Acá va la ingeniería de abajo."
pubDate: "2026-06-26"
heroLayout: "none"
tags: ["portfolio", "tech", "web-development", "dailybot", "astro"]
keywords:
  - "migración dailybot a astro ingeniero"
  - "astro content collections multilenguaje caso de estudio"
  - "pipeline markdown gemelo AEO astro"
  - "CI para que no ingenieros publiquen astro"
  - "cursor como CMS visual"
  - "reconstruir vs portar migración CMS"
  - "astro 700 páginas 3 idiomas"
draft: true
---

Durante las últimas seis semanas lideré la migración de [dailybot.com](https://www.dailybot.com) desde Webflow — un CMS con editor visual que nos había servido bien durante cuatro años — hacia [Astro](https://astro.build). La historia del equipo está en el blog de DailyBot: [How we migrated dailybot.com to Astro](https://www.dailybot.com/blog/how-we-migrated-dailybot-to-astro/) ("Cómo migramos dailybot.com a Astro"). Ese texto es el "nosotros" — por qué nos movimos, qué cambió en el ritmo de la compañía, qué significó para el equipo.

Este post es el "yo". La ingeniería que está debajo, y la parte que cuesta más meter en un post corporativo: lo que una migración así le hace a la forma en que un ingeniero piensa sobre su propio trabajo. El andamiaje que dejó que cuatro personas no ingenieras desplegaran a producción sin pasar por mí, las piezas específicas que le recomendaría construir a otro ingeniero a punto de hacer lo mismo — y por qué, a seis semanas, me importaban más las partes aburridas que el sitio en sí.

Ya escribí el argumento largo sobre [Astro y Svelte](/es/blog/astro-and-svelte-the-future-of-web-development/) en este blog. No lo voy a repetir acá. Si quieres el "por qué Astro", lee ese. Este post es el "cómo construí el piso" — y lo que construir el piso en vez del techo me terminó enseñando.

---

## La forma del problema que me cayó en el escritorio

Esto es lo que tenía sobre la mesa al cerrar el Q1:

- **16 tipos de página × 3 idiomas ≈ 700 páginas por idioma.** Blog, academia, centro de ayuda, integraciones, plantillas, changelog, carreras, páginas legales, developers y más — cada una con su propia forma.
- **Un rebrand completo aterrizando en la misma ventana.** Nueva identidad, nueva escala tipográfica, nuevo sistema de espaciado, una librería de componentes redibujada. No antes de la migración, no después — durante.
- **Un equipo de cinco: un ingeniero, cuatro no ingenieros.** Un product manager, una diseñadora, un growth lead y una líder de contenido. La migración no iba a funcionar si yo era el cuello de botella en cada cambio.
- **Un trimestre.** Eso era todo.

La brecha no era de rendimiento — el sitio viejo iba bien. La brecha era de velocidad. Todas las demás superficies de la compañía ya se movían a ritmo de agente. El sitio de marketing se movía a ritmo de CMS. Un ajuste de layout que eran cinco minutos en nuestra app de producto era un ejercicio de varios días en el editor visual. Ese era el problema que estaba resolviendo de verdad.

Tampoco saltamos directo a una reescritura. Primero pasamos dos semanas intentando aterrizar el rebrand dentro de Webflow — el camino más barato, en el papel. No nos dio la velocidad que buscábamos, y dejó obvio el verdadero límite: el cuello de botella no era el acabado de la herramienta, era que cada cambio seguía teniendo que pasar por una superficie que solo una o dos personas podían operar. Ahí "reconstruir" dejó de ser una opción en una diapositiva y se volvió el plan.

---

## Qué optimicé, y qué deliberadamente no

La decisión más importante que tomé temprano fue **reconstruir, no portar**. Una traducción componente a componente habría preservado decisiones que ya queríamos revisar. Conservamos las URLs y el contenido; reconstruimos todo lo demás. Había tomado una versión mucho más pequeña de esta decisión cuando [armé mi sitio personal desde cero](/es/blog/building-xergioalex-website/) — un sitio de una persona es un animal muy diferente a uno de cinco personas y 700 páginas, pero el instinto era el mismo: si vas a hacer el trabajo, haz la reconstrucción.

Lo que hizo segura esa decisión fue un spike de dos días. Antes de comprometer el trimestre, me senté con Cursor y Claude Code y porté el nuevo sistema de diseño más un puñado de tipos de página centrales en dos días. No listo para producción, pero lo bastante real como para probar que la reconstrucción no era un hueco de seis meses. Si el prototipo hubiera tomado dos semanas, habría defendido quedarnos en Webflow. Tomó dos días. Ese número fue el que pagó la reconstrucción — entré a la reunión de planeación con una vista previa funcionando en vez de con un pitch.

La segunda decisión fue más difícil, porque iba tanto de ego como de arquitectura. Mi instinto como ingeniero es construir el techo — la parte impresionante, la que mostrarías en un screenshot. El trabajo que tenía enfrente era el opuesto: **construir el piso** — el modelo de contenido, los esquemas, el CI, el onboarding — para que otras cuatro personas pudieran pararse encima y publicar. El piso es invisible. Nadie le toma un screenshot a un esquema de Zod. Aun así pasé encima de él la mayor parte de las seis semanas, y en algún punto de la segunda semana hice las paces con que el mejor trabajo de toda la migración sería un trabajo que nadie iba a ver nunca.

Lo que deliberadamente no perseguí: un page builder visual a medida, un DSL propietario para autoría, o cualquier "magia" que hubiera que mantener para siempre. Astro + TypeScript + Zod cubrió todas las necesidades reales de autoría que teníamos.

---

## Las Content Collections como modelo de contenido

Lo más valioso que construí es también lo menos vistoso: un `src/content.config.ts` con **12 Content Collections de Astro tipadas**, una por superficie — `blog`, `series`, `changelog`, `tags`, `templates`, `academy`, `integrations`, `skills`, `careers`, `helpCenter`, `pages`, `authors`. Cada una tiene su propio esquema de Zod. Cada entrada — un post de blog, un artículo de ayuda, una página de integración — es un archivo en disco con un frontmatter que se valida en tiempo de build.

La forma es aburrida a propósito. El esquema del blog se ve más o menos así:

```typescript
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().min(130).max(160),
      pubDate: z.coerce.date(),
      heroImage: image(),
      tags: z.array(z.string()).min(1),
      lang: z.enum(['en', 'es', 'pt']),
    }),
});
```

Nada ingenioso ahí. Pero ese `min(130).max(160)` en `description` significa que un compañero literalmente no puede fusionar un post con una meta description que le haría daño al SEO, y ese `z.enum(['en', 'es', 'pt'])` significa que un idioma mal escrito es una X roja en CI, no una página rota que un usuario encuentra tres semanas después. El esquema es donde codifiqué cada regla que antes hacía cumplir revisando a mano.

Esta es la jugada que pagó el costo de la migración. Con 700 páginas por idioma, la pregunta "¿están los tres idiomas sincronizados?" deja de ser algo que una persona revisa en una hoja de cálculo y se convierte en un **error de compilación**. ¿Faltó un `description` en portugués? Build falla. ¿Se escribió mal un `tag`? Build falla. ¿Se olvidó la imagen de portada en un nuevo artículo de academia? Build falla. Cada invariante de contenido que yo vigilaba a mano, ahora lo vigila el esquema — y lo hace también para cada persona no ingeniera que edita archivos por su cuenta.

Ya escribí sobre este patrón a una escala más pequeña en [Construyendo un sitio multilenguaje](/es/blog/building-multilingual-website/). Mismo patrón. Escala diferente. Pasar de 2 idiomas × un tipo de sitio a 3 idiomas × 16 superficies es donde el esquema deja de ser "buena idea" y pasa a ser la única forma realista de detectar divergencias.

Una cosa honesta: dejar los doce esquemas en su punto me tomó más de lo presupuestado. No porque los esquemas sean difíciles — no lo son — sino porque cada decisión de esquema restringe lo que los autores pueden escribir. Demasiado flojo y no atrapa nada; demasiado estricto y creas fricción para la gente que estás tratando de habilitar. Reescribí el esquema del blog tres veces antes de sentir que estaba bien.

---

## El pipeline del gemelo markdown

Cada página HTML de dailybot.com también se publica como markdown limpio. Pide cualquier URL con `Accept: text/markdown`, o simplemente añade `.md` al path, y recibes la misma página como markdown plano — el formato que los agentes de IA leen con más naturalidad:

```bash
curl -H 'Accept: text/markdown' https://www.dailybot.com/blog/how-we-migrated-dailybot-to-astro/
curl https://www.dailybot.com/blog/how-we-migrated-dailybot-to-astro.md
```

Dos formas equivalentes de recuperar la misma página. Los agentes no tienen que parsear HTML; las personas nunca ven la diferencia.

La pieza que hace que sea seguro confiar en esto es `scripts/check-md-parity.mjs`. Recorre cada ruta HTML que produce el build y verifica que exista un gemelo markdown que le corresponda. Corre en CI en cada PR. Si un PR agrega un tipo de página nuevo y se olvida de conectar la versión markdown, el build falla — antes de que cualquier cosa toque producción.

Ya escribí el lado conceptual de esto en [AEO: markdown para agentes](/es/blog/aeo-markdown-for-agents/). Lo que quiero subrayar acá es la disciplina del pipeline: una característica como "cada página tiene un gemelo markdown" solo se mantiene verdadera si algo la vigila automáticamente. En el momento en que dependes de una lista de chequeo, ya perdiste. `check-md-parity` son trescientas líneas de pegamento aburrido. Es también la razón por la que dailybot.com sacó un 100 limpio en [isitagentready.com](https://isitagentready.com/) sin ningún sprint de último minuto — el pipeline llevaba meses pagando ese impuesto en silencio.

---

## El piso de CI que dejó publicar a los no ingenieros

Este es del que estoy más orgulloso. Y también el que nunca se ve desde afuera.

Cada PR en dailybot.com — míos, del PM, de la diseñadora — tiene que pasar la misma pipeline antes de poder fusionarse:

1. Chequeo de tipos de TypeScript.
2. Biome lint + format (una sola herramienta para las dos — las razones por las que [reemplacé ESLint y Prettier por Biome](/es/blog/why-i-ditched-eslint-prettier-for-biome/) aplican acá por diez).
3. Suite de pruebas de Vitest.
4. Una corrida de Lighthouse CI contra el build, forzando un **piso** de puntaje en rendimiento, accesibilidad, best practices y SEO.
5. Un build de producción de Astro limpio.

El piso de Lighthouse es el sutil. No nos importa el techo — si dailybot.com saca 100 limpio una semana y 98 la siguiente, sigue siendo un sitio rápido. Lo que me importa es que un PR no pueda regresar el piso. En el momento en que un script bloqueante se cuela en un layout o alguien introduce una regresión de alt-text, el check falla y el PR se detiene.

Esto fue lo que hizo que entregarle las llaves al PM no fuera una imprudencia. Lo peor que un PR malo puede hacer es fallar un check y pedir una corrección. Nada sale a producción que no haya pasado la misma barra que tiene que pasar mi propio trabajo. Y siendo honesto, ese piso me atrapó a mí al menos tantas veces como atrapó a cualquier otro — una vez en un commit que habría publicado una interacción lenta en móvil en la página de pricing, algo que nunca habría detectado a ojo.

Una corrida completa de CI tarda unos 100 segundos. Ese número es la razón entera por la que el flujo se siente rápido en vez de burocrático.

---

## Cursor como CMS, en la práctica

La pregunta técnica más difícil de la migración nunca fue una pregunta técnica. Fue: *¿cómo hacen cuatro personas no ingenieras para publicar a través de un repo de git todos los días?*

La respuesta fue Cursor. No como IDE — como el editor visual literal del sitio.

El onboarding fue de dos horas. Una sesión corta de bases de git, una sesión corta de cómo funciona Cursor, una sesión corta de cómo **briefear** a un agente para que la instrucción aterrice. Luego ayudando a cada persona a dejar su entorno local listo. Eso fue todo. Al día siguiente, los tres — PM, diseñadora, growth lead — estaban abriendo pull requests.

Lo que hizo que hiciera clic no fue el editor. Fue el patrón que les dimos: abre la vista previa en vivo al lado del editor, usa el inspector para apuntar al elemento específico, dile al agente qué cambiar. Debajo de cada clic estaba el codebase real, y cada edición era un diff. La frase "Astro sigue siendo un CMS" del post de DailyBot no es un reencuadre — es literalmente cómo se ve la superficie de trabajo todo el día.

Tres piezas de andamiaje hicieron que eso funcionara a escala de equipo:

- **`docs/AGENTS.md`** — una única fuente de verdad para cada agente trabajando en el repo. Convenciones del proyecto, orden de imports, guía de voz, todo. Cada agente, cada ingeniero, cada no ingeniero lee del mismo documento. Lo mantengo sincronizado con obsesión; es el documento con más apalancamiento del repo.
- **`scripts/generate-agent-skills-index.mjs`** — genera automáticamente un índice legible por máquina de cada skill y agente del repo para que los agentes de código puedan descubrirlos sin que yo les diga qué buscar.
- **Un catálogo de skills propias del proyecto** — `add-blog-post`, `translate-sync`, `optimize-image`, `audit-post` y una docena más. Cada tarea recurrente queda codificada como una skill. Los no ingenieros no memorizan procedimientos; invocan la skill.

Si hubiera intentado correr esta migración hace dos años, sin agentes capaces de traducir un brief en lenguaje natural a un diff, nada de esto habría funcionado. Yo habría sido el cuello de botella. Los no ingenieros me habrían esperado, y habríamos publicado el sitio en seis meses en vez de seis semanas. Este es el caso de estudio concreto de lo que vengo escribiendo en [De programador a orquestador](/es/blog/from-programmer-to-orchestrator/) y [El arte de dirigir agentes](/es/blog/the-art-of-directing-agents/). En la migración, la teoría se volvió el piso.

---

## Qué haría diferente

Dos llamadas honestas, mirando hacia atrás.

**Debí construir `check-md-parity` antes de escribir cualquier página, no después de encontrar divergencias.** Lo agregué en la semana tres, después de detectar un post en inglés sin gemelo en español que llevaba varios días publicado. El arreglo fue de media hora; la divergencia nunca habría pasado si el script hubiera estado en CI desde el día uno. Error clásico de "la herramienta existía, solo que no la construí suficientemente temprano".

**Debí poner el piso de Lighthouse en CI desde la semana uno, no la semana dos.** Publicamos una iteración del rebrand que regresó silenciosamente el rendimiento móvil en el índice de plantillas, y solo la detecté cuando corrí Lighthouse a mano a mitad de semana. Nada roto, nada público, pero una hora de limpieza que me habría ahorrado con el piso puesto desde el inicio.

Ninguna de estas es lo bastante interesante como para haber entrado al post de la compañía. Son el tipo de cosa que un ingeniero solo le cuenta a otro ingeniero.

---

## El entregable detrás del entregable

El resultado real de esta migración no fue el nuevo dailybot.com. Fue el sistema que deja que cuatro personas no ingenieras publiquen a producción sin pasar por mí.

En un martes normal, el PM abre un PR con una nueva entrada de changelog. La diseñadora ajusta el espaciado de un tier de pricing. El growth lead modifica copy en una landing. Cada uno pasa el CI, aterriza en preview, recibe revisión, se fusiona, sale en vivo — a veces la misma tarde, casi siempre sin un solo mensaje para mí.

Hay una sensación rara en eso, y voy a ser honesto al respecto. El punto entero de la migración era volverme innecesario para el día a día, y funcionó — la mayoría de las semanas el sitio público se mueve sin que yo lo toque. Seis semanas de mi mejor ingeniería se fueron en construir algo cuyo éxito se ve exactamente como mi ausencia. Pensé que quizás se sentiría como una pérdida. No. Se siente como el mayor apalancamiento que he tenido: dejé de ser la persona que mueve el sitio y me convertí en la persona que construye lo que lo mueve. Esa es la parte que el post de la compañía no podía contener, y la parte que de verdad cambió cómo veo el trabajo.

Esa es la migración que importó. La URL no cambió; el sitio se ve distinto pero se comporta igual; el puntaje de Lighthouse subió unos puntos. Nada de eso es la historia. La historia es que la forma de quién puede mover nuestra superficie pública cambió, porque los agentes finalmente se volvieron lo suficientemente buenos como para sentarse entre personas no ingenieras y un repo de git y traducir de uno al otro. Llevo un año escribiendo sobre [este cambio](/es/blog/from-programmer-to-orchestrator/). Correr esta migración es la primera vez que lo veo pasar a escala de equipo.

Si tu equipo está donde estábamos nosotros a finales de 2025 — un CMS de editor visual que se mueve más lento que el resto de tu compañía — la decisión en realidad no va de Astro. Va de si quieres a un ingeniero moviendo tu superficie pública, o a todo el mundo.

A seguir construyendo.

---

## Recursos

- [DailyBot — How we migrated DailyBot to Astro](https://www.dailybot.com/blog/how-we-migrated-dailybot-to-astro/) (post oficial de la compañía, en inglés)
- [Astro](https://astro.build/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [isitagentready.com](https://isitagentready.com/)
