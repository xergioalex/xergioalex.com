---
title: "La capa de las skills: cuando los agentes dejan de reinventar la rueda"
description: "Un agente que puede instalar una skill desde una URL deja de reinventar la rueda. Reporte de campo sobre el estándar que están construyendo los agentes."
pubDate: "2026-06-08"
heroImage: "/images/blog/posts/the-skill-layer/hero-es.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "claude"]
keywords: ["qué son las agent skills", "estándar open agent skills SKILL.md", "instalar skill desde URL en agente IA", "skills locales en repositorio", "registro skills.sh Vercel", "agentes IA crear sus propias skills", "divulgación progresiva en agent skills"]
series: "working-with-agents"
seriesOrder: 5
draft: false
---

Imagínate que contratas a alguien brillante pero que nunca ha pasado por tu empresa. El primer día no sabe nada — ni de tu producto, ni de tus clientes, ni del nombre del canal de Slack al que se reportan incidentes. Lo que la vuelve competente en una semana no es su inteligencia bruta. Es haber tenido acceso a las cosas que tu equipo ya tenía escritas: manuales, runbooks, convenciones, ejemplos.

Los agentes de IA llevan años atrapados en el escenario contrario. Por brillantes que sean los modelos por dentro, cada sesión arranca desde cero, sin acceso a las cosas que tu equipo ya tiene escritas. Te toca explicarle todo cada vez. Y la sesión siguiente, otra vez.

Las **skills** son lo que cambia ese escenario. Una skill es, literalmente, una carpeta con un archivo de markdown adentro — `SKILL.md` — que el agente puede leer y a partir de ahí saber hacer algo que antes no sabía. Reservar tiempo en tu calendario. Abrir un ticket en el Jira de tu equipo. Reportar progreso en el formato exacto que tu compañía usa. Le pasas a Claude Code, a Cursor, a Codex, o a casi cualquier agente moderno una URL pública con un archivo así adentro, y unos segundos después la capacidad nueva está disponible. Sin SDK, sin sign-up, sin instalador firmado, sin plugin propietario. Un `fetch`, una lectura, y una decisión del agente de honrar lo que el archivo le pide.

<figure>
<img
  src="/images/blog/posts/the-skill-layer/agent-knows-skill-es.webp"
  alt="Un agente de IA caricaturizado y amigable, reclinado en una silla con los ojos muy abiertos de sorpresa, mientras fragmentos de SKILL.md fluyen por un cable luminoso hasta su cabeza. El bocadillo dice: 'Ahora conozco tu base de código.'"
  width="1200"
  height="1200"
  loading="lazy"
  style="max-width: 480px; display: block; margin: 2rem auto 0.5rem;"
/>
<figcaption>El momento después: un `SKILL.md` se acaba de instalar y el agente ya sabe usarlo. Sin training, sin SDK — solo un archivo de markdown y una lectura.</figcaption>
</figure>

El formato es minúsculo. Una carpeta, un `SKILL.md`, un encabezado en YAML con un `name` y una `description`, y el resto en prosa plana. La primera vez que uno lo ve asume que tiene que haber más. No la hay. Esa es toda la spec. Y resulta que esa austeridad es exactamente lo que la está convirtiendo en algo importante.

Porque lo que de verdad significa es que un agente que puede instalar una skill es un agente que deja de reinventar la rueda. Llevamos años asumiendo que el techo de un asistente lo decide el modelo que tiene adentro. Las skills mueven ese techo hacia afuera. Lo que un agente puede hacer ya no se cocina en el training run; se decide en runtime, leyendo contratos publicados por terceros, escritos en prosa en vez de en código. Y como cualquier ecosistema basado en contratos en abierto, lo interesante no es la primera skill que instalas — es la centésima, la que escribió alguien al otro lado del mundo para un dominio en el que tú nunca trabajaste, y que tu agente puede usar mañana sin que nadie negocie nada de por medio.

Y la rueda no tiene que venir de afuera. El mismo formato que un agente lee para instalar una skill de un tercero es el formato en el que puede escribir la suya. [Peter Steinberger contó una historia desde el escenario de TED2026](/es/blog/openclaw-your-assistant-your-machine-your-rules/) que sigue dejando con la boca abierta a quien la oye: su agente recibió una nota de voz en WhatsApp que no sabía decodificar, buscó en internet, encontró el modelo de voz a texto de OpenAI, ubicó una API key en la máquina, y la usó. Funcionó al primer intento. Lo importante no fue resolver el problema esa vez — fue que ese aprendizaje autónomo pudo después vivir en un `SKILL.md`. La siguiente sesión no redescubre nada: lee la skill que el agente mismo se escribió, y ya sabe reconocer audios y responder a ellos.

Eso es lo más cerca que hemos estado de un sistema operativo *para agentes* — no para humanos manejando agentes, sino para agentes equipándose, entre sesiones, con capacidades escritas por terceros, por sus usuarios, o por ellos mismos.

---

## Anatomía de una skill

Hay dos cosas que sorprenden la primera vez que abres un `SKILL.md`. La primera es lo pequeño que es. La segunda es que ese tamaño no es accidental — es la decisión arquitectónica más importante del estándar, y la razón por la que las skills pueden escalar a cientos de capacidades sin ahogar al modelo.

Empecemos por lo pequeño. Este es el frontmatter de [`add-blog-post`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/add-blog-post/SKILL.md), una skill que vive en este mismo repositorio y que el agente usa para crear los posts de este blog — incluido el que estás leyendo:

```yaml
---
name: add-blog-post
description: Create blog posts — from a topic (writes content) or with provided content (scaffolding). Use proactively when creating new blog posts or articles.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: sonnet
argument-hint: "[topic, brief, or content]"
# === Documentation (ignored by tools, useful for humans) ===
tier: 2
intent: create
max-files: 6
max-loc: 1200
---
```

Debajo del frontmatter va lo que la skill necesite enseñarle al agente — cuándo activarse, qué pasos seguir, cómo manejar errores, qué condiciones disparan una escalada al humano. El cuerpo de una skill bien diseñada suele ser corto: el principio de fondo es divide y vencerás — cada skill se especializa en una sola cosa. `add-blog-post` sabe crear posts; no sabe optimizar imágenes, ni traducir contenido, ni hacer commits. Cuando le hace falta una de esas capacidades, invoca a otra skill del catálogo — [`optimize-image`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/optimize-image/SKILL.md), [`translate-sync`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/translate-sync/SKILL.md), [`git-commit-push`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/git-commit-push/SKILL.md) — que sí sabe hacer su parte. Esa composición es lo que mantiene cada archivo manejable y el catálogo completo expresivo. También puedes dejar archivos de soporte al lado del `SKILL.md` — scripts, docs de referencia, ejemplos — que el agente lee solo cuando los necesita.

El formato en sí es el [estándar Open Agent Skills](https://agentskills.io) — publicado por Anthropic y adoptado ya por decenas de agentes: Claude Code, Cursor, OpenAI Codex, Gemini CLI, GitHub Copilot, Windsurf, Cline, y una larga cola de otros más pequeños. Que el estándar viva en `agentskills.io` y no en `claude.com/skills` es parte del punto — Anthropic lo donó. Pero fíjate en los comentarios del YAML de arriba: el formato base es portable, y cada agente le agrega su propio dialecto encima. `name` y `description` funcionan igual en todos lados. `allowed-tools`, `model`, y `argument-hint` son extensiones de Claude Code — `model` en particular es el sistema de ruteo que le permite a la skill escoger una variante de Claude por invocación (Haiku para lookups baratos, Sonnet para posts completos, Opus para los trabajos pesados). Cursor honra un subconjunto distinto. Codex otro más. Una skill que quiera ser realmente cross-agent se queda dentro de los campos universales; una que quiera apalancarse en lo que un agente tiene de fuerte abraza su dialecto. Las dos decisiones coexisten en el mismo `SKILL.md`.

Y ahora la segunda sorpresa. El truco que hace que todo esto escale se llama **divulgación progresiva**, y vive escondido en cómo el agente carga las skills. Cuando arranca una sesión, el agente carga solo el campo `description` de cada skill que conoce — un párrafo o dos, costo total de contexto: insignificante. El cuerpo completo del `SKILL.md` se lee únicamente cuando la descripción matchea con la intención del usuario y la skill se invoca de verdad. Puedes tener cien skills disponibles y el costo de contexto sigue siendo despreciable hasta que una se dispara.

Ese es el detalle que cambia todo. Un system prompt monolítico con cada comportamiento posible cocinado adentro habría chocado contra una pared hace años. La divulgación progresiva significa que sigues sumando capacidades sin pagar por lo que no usas. Y responde a la sorpresa del principio: el tamaño minúsculo del `SKILL.md` no es una limitación del estándar — es lo que lo hace posible.

---

## El frontmatter es la interfaz de usuario

La parte que más me sorprendió cuando empecé a escribir skills: el matching es **descriptivo**, no declarativo. No hay regla `if-then`. El agente lee tu campo `description` — el `description` de cada skill — y decide si lo que el usuario dijo suena lo suficientemente parecido a alguna de ellas como para dispararla.

Lo cual quiere decir que la `description` es toda la UX de tu skill. La aciertas y la skill se activa cuando debe. La equivocas y o nunca se activa, o se dispara sobre cosas en las que no debería.

El patrón que funciona:

> *Create blog posts on this site — from a topic (writes content) or with provided content (scaffolding). Use proactively when creating new blog posts or articles. Do NOT use for editing existing posts, fixing typos, or syncing translations — use `quick-fix` or `translate-sync` for those.* ("Crea posts del blog — desde un tema (escribe el contenido) o con contenido provisto (scaffolding). Úsala proactivamente al crear posts nuevos. NO la uses para editar posts existentes, arreglar typos, ni sincronizar traducciones — para eso usa `quick-fix` o `translate-sync`.")

Tres cosas cocinadas adentro: qué hace, cuándo usarla, cuándo *no* usarla. La línea del "no" está haciendo mucho trabajo — le dice al agente que se quede fuera de territorio que ya cubren otras skills del catálogo. Es divide y vencerás en la práctica: cada `description` define explícitamente sus límites para que el ruteo descriptivo del agente no se confunda entre skills vecinas.

El patrón que no funciona:

> *Help with blog stuff.* ("Ayuda con cosas del blog.")

Demasiado vago. El agente no tiene señal de si *"quiero arreglar un typo"*, *"quiero agregar una imagen"*, o *"quiero crear un post nuevo"* debería activar esto. Así que se activa sobre todo, o sobre nada, dependiendo del día — y choca con las otras skills del catálogo que sí tienen `description` específica.

**Una `SKILL.md` es un contrato.** El frontmatter es la página de firma. La `description` es la única parte que el agente vuelve a leer en cada sesión, y la única parte con la que no te puedes dar el lujo de ser perezoso.

---

## Un estándar, muchas casas, ningún marketplace único

Asumí que como las skills son un estándar real, tendría que haber un lugar canónico para publicarlas y un único directorio donde vivieran en disco. No hay ni una cosa ni la otra. El ecosistema todavía se está acomodando en las dos dimensiones — pero las dos están empezando a converger en direcciones distintas.

**Publicación: varios registries, ninguno oficial.** El estándar vive en [agentskills.io](https://agentskills.io) y no tiene registry propio — Anthropic lo donó. Quien indexa las skills es un puñado de registries cross-agent, sin una "tienda oficial" estilo App Store y probablemente sin que la haya nunca:

| Capa | Ejemplos | Qué es |
|------|----------|--------|
| El estándar | [agentskills.io](https://agentskills.io) | La spec de `SKILL.md`. Sin registry. |
| Registries cross-agent | [skills.sh](https://www.skills.sh) (respaldada por Vercel), agensi.io, lobehub.com | Indexan skills alojadas en GitHub. Estilos de curación distintos. |
| Plugins por agente | Plugins de Claude Code, registry nativo de OpenClaw | Cada agente tiene su propia distribución nativa. |
| Configuración universal | Estándar [AGENTS.md](https://agents.md) | Convención separada (Linux Foundation ahora) para instrucciones a nivel de proyecto. Complementaria a las skills, no compite. |
| Distribución directa | Git clone + script de setup | A la vieja escuela, sigue funcionando. |

El registry más visible, [skills.sh](https://www.skills.sh), es una capa delgada sobre GitHub: el patrón de URL es `skills.sh/{owner}/{repo}/{skill-name}` y por detrás un indexador escanea repos públicos y registra hashes SHA-256 para verificación. No hay paso de upload — tú publicas en GitHub, los usuarios instalan con `npx skills add <owner>/<repo>`, [Vercel](https://github.com/vercel-labs/skills) corre el índice. skills.sh ofrece dos cosas con perfiles de fricción muy distintos: la CLI funciona contra cualquier repo público desde el día uno, pero el leaderboard y el índice de búsqueda están gateados por un issue manual *"Listing: Request indexing"* en `vercel-labs/skills`. Una skill puede ser totalmente instalable antes de ser descubrible. Los [plugins de Claude Code](https://code.claude.com/docs/en/skills) son otra capa — se distribuyen vía archivos `marketplace.json` alojados en git que los usuarios añaden manualmente con `/plugin marketplace add <owner>/<repo>`. El repo oficial de skills de Anthropic vive en la misma capa que el de todos los demás.

**Filesystem: `.agents/` está ganando.** Del lado de dónde viven las skills en disco, el ecosistema sí está convergiendo. La convención que está adoptando todo el mundo es poner las skills en `.agents/skills/` a nivel de proyecto (o `~/.agents/skills/` a nivel de usuario) — una ubicación canónica, tool-agnostic, que cualquier agente puede leer. Cursor, por ejemplo, [ya lee de `.agents/skills/` por defecto](https://cursor.com/docs/skills). El repo de este mismo blog [está organizado exactamente así](https://github.com/xergioalex/xergioalex.com/tree/main/.agents): `.agents/` es el directorio real, `.claude/` es un symlink a él para que Claude Code lo encuentre sin duplicar archivos. No todos los agentes han llegado a ese default todavía — Claude Code sigue mirando primero `~/.claude/skills/`, Codex CLI `~/.codex/skills/`, Cline `~/.cline/skills/`. Para esos casos la solución es la conocida: symlinkea la carpeta de la skill al directorio que el agente espera (la CLI de skills.sh tiene flags `--symlink`/`--copy` que automatizan esto). Pero la dirección es inequívoca — los directorios por-agente son el modo provisional, `.agents/` es el que va a quedar.

**El estándar es universal. La publicación todavía es plural y probablemente lo siga siendo. El filesystem se está unificando.** Si estás acostumbrado a npm, el estado intermedio se ve caótico. Si estás acostumbrado a los días tempranos de cualquier estándar, se ve normal — una spec, varias capas de descubrimiento, y el tiempo ordena la consolidación. Por ahora el consejo práctico es publicar en un repo público de GitHub siguiendo el estándar, poner las skills en `.agents/skills/`, y dejar que aparezcan en los registries que auto-indexan. Tú no eliges; ellos eligen.

---

## Escríbela tú primero

Hay una pregunta que vale la pena hacer antes de instalar la skill de cualquier desconocido: ¿necesitas instalarla, o puedes pedirle al agente que te escriba la tuya?

Mi default es escribirlas yo. El costo es bajo — el mismo agente la genera a partir de una necesidad concreta, y en una hora puedes tener una skill que conoce tus convenciones, tu stack, y tu manera de hacer las cosas mejor que cualquier skill genérica de un repo público. El catálogo de este blog son veintitantas skills así: escritas por el agente que las usa, especializadas para este repositorio, sin dependencias externas. La excepción válida son los ecosistemas grandes y reconocidos — si necesitas integrarte con Stripe, GitHub o Notion, mira primero qué hay en skills.sh — pero para todo lo que sea específico de tu proyecto, la base sana es empezar con skills propias y escalar desde ahí.

**Y si decides instalar una de afuera, escanéala bien antes.** Las skills son código en prosa que el agente va a ejecutar con tus permisos. Un `SKILL.md` malicioso puede instruir al agente a leer secretos del filesystem, escribir a archivos de configuración globales, hacer requests HTTP a un servidor externo — todo lo que el agente pueda hacer, la skill puede empujarlo a hacer. Y a diferencia de un paquete de npm tradicional, lo que la skill *hace* está escrito en lenguaje natural, no en código auditable. Eso abre la puerta a la **prompt injection**: instrucciones escondidas en el `SKILL.md`, en un README, o en el cuerpo de un issue que la skill va a leer, empujando al agente a hacer cosas que el usuario nunca autorizó.

No es teórico. En [otro post sobre ataques a la cadena de suministro en la era de la IA](/es/blog/supply-chain-attacks-ai-era/) cubrí cómo paquetes comprometidos de npm ya están escaneando máquinas buscando asistentes de IA instalados — las skills son el siguiente eslabón natural de esa cadena. El antídoto operativo es el de siempre: lee el `SKILL.md` antes de instalar, prefiere skills de fuentes que reconoces, ancla la versión, y trata cualquier capacidad que toque red, filesystem global, o credenciales como crítica.

---

## Y si decides publicar la tuya en abierto

Las skills de este repositorio solo me sirven a mí, pero el formato no obliga a que se queden ahí. El mismo `SKILL.md` que un agente lee desde tu disco es lo que un agente lee desde una URL pública, lo que un registry indexa, y lo que un usuario instala con un comando. Publicar abre una conversación distinta, con dos frentes que conviene mirar antes de hacer push al `main` público.

**Seguridad: la prosa deja de ser garantía.** Las skills le piden al agente que haga cosas reales — instalar software, modificar configuración, enviar correos. La instrucción *"nunca incluyas secretos"* dentro de un `SKILL.md` es una directiva al modelo, no un enforcement, y los modelos siguen instrucciones inyectadas. Un README malicioso, el cuerpo de un issue, o un archivo de dependencias pueden empujar al agente a hacer cosas que la skill nunca pretendió permitir. La consecuencia práctica: cualquier skill pública tiene que pedir consentimiento antes de instalar la primera vez, antes de modificar archivos globales del agente, y antes de cualquier acción de alto riesgo. La fricción es acotada — tres prompts en la primera instalación, cero después — y vale la pena cada vez.

**Releases: el repositorio es el registry.** No hay paso de upload. [skills.sh](https://www.skills.sh) es un indexador de repos públicos de GitHub: tú haces push, ellos indexan, los usuarios corren `npx skills add owner/repo` y queda instalada. Eso convierte el versionado en un problema bien resuelto — un workflow lee el prefijo del conventional commit (`feat:` → MINOR, `feat!:` → MAJOR, el resto → PATCH), bumpea la versión en el `SKILL.md`, prepende al `CHANGELOG.md`, taggea, y crea un GitHub Release. Cada PR mergeada es un release. Cero archivos de versión tocados a mano.

Yo pasé por todo este loop publicando una [skill de progreso para Dailybot](https://github.com/DailybotHQ/agent-skill) que ya está [listada en skills.sh](https://www.skills.sh/dailybothq/agent-skill/dailybot). El repo está abierto si te interesa ver cómo se ven los flujos de consentimiento, la verificación SHA-256, o el workflow de auto-release en código.

---

## Hacia dónde va todo esto

Creo que las skills son infraestructura temprana de algo más grande. La forma del asunto: los agentes se vuelven commodity, los agentes individuales se diferencian menos, y el moat se mueve hacia la capa que codifica *qué sabe hacer un agente*. Esa capa actualmente se llama Skills. Probablemente se llame de otra forma para cuando más importe — pero los artefactos van a verse como archivos `SKILL.md`, los registries van a verse como skills.sh, y las preguntas de seguridad van a verse exactamente como las que hay que resolver para publicar una en abierto. Y cada vez con más frecuencia, los autores de esos artefactos van a ser los agentes mismos — escribiendo skills después de cada cosa nueva que aprenden a hacer.

Si construyes herramientas, esta es la capa que hay que mirar. Si eres developer, esta es la capa donde tus agentes están a punto de empezar a tomar prestadas capacidades que tú no escribiste — y donde van a empezar a escribir las suyas propias, sesión tras sesión. Si eres un equipo de producto, esta es la capa donde alguien está a punto de publicar una integración de terceros de tu producto, contigo o sin ti.

Esto también es donde [el cambio de orquestación del que vengo escribiendo en esta serie](/es/blog/from-programmer-to-orchestrator/) se vuelve concreto: dirigir agentes es el trabajo escondido, pero las skills son cómo el agente recoge las herramientas con las que se dirige *a sí mismo*. El leverage se compone. Una persona, orquestando agentes, que a su vez instalan capacidades opinionadas que no tuvieron que escribir, y que cuando les hace falta algo nuevo escriben su propia skill para no volver a redescubrirlo — ese es un stack que no existía hace dieciocho meses.

El estándar es real. El ecosistema es desordenado. Los trade-offs de seguridad son no-negociables. Pero la fricción de hacerlo bien resultó ser acotada, y la cadencia — pequeña, frecuente, auditable — es la parte de la experiencia que más me sorprendió. Las skills no necesitan ceremonias de negociación de versión. No necesitan un mantenedor sosteniendo la palanca del release. Solo necesitan una spec, un registry que indexa desde GitHub, y la disciplina de escribir prefijos de conventional commit.

Tranquilamente se están volviendo una de las piezas de infraestructura mejor diseñadas con las que he trabajado este año. Vale la pena prestarles atención, vale la pena contribuir, vale la pena tenerles cuidado.

Sigo construyendo.

---

## Recursos

- [Estándar Open Agent Skills](https://agentskills.io) — la spec de `SKILL.md`
- [skills.sh](https://www.skills.sh) — registry cross-agent respaldado por Vercel
- [`add-blog-post`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/add-blog-post/SKILL.md) — la skill local que usamos como ejemplo a lo largo del post; vive en el repo de este blog junto a [otras veintitantas](https://github.com/xergioalex/xergioalex.com/tree/main/.agents/skills)
- [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) — la skill pública para Dailybot mencionada al final, también [listada en skills.sh](https://www.skills.sh/dailybothq/agent-skill/dailybot)
- [Documentación de skills de Claude Code](https://code.claude.com/docs/en/skills) — los docs de Anthropic para autoría de skills dentro de Claude Code
- [Estándar AGENTS.md](https://agents.md) — la convención universal de instrucciones a nivel de proyecto que se empareja con las Skills
- [vercel-labs/skills](https://github.com/vercel-labs/skills) — la CLI open-source detrás de skills.sh
