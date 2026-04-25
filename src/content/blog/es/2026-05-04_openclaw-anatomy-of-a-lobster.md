---
title: 'Anatomía de una langosta: cómo funciona OpenClaw por dentro'
description: 'Por dentro de OpenClaw: el Gateway, el agente PI, los siete archivos del workspace, skills, MCP, heartbeat y la capa de sandbox — la anatomía completa.'
draft: true
pubDate: '2026-05-04'
heroImage: '/images/blog/posts/openclaw-anatomy-of-a-lobster/hero-es.webp'
heroLayout: 'side-by-side'
tags: ['tech', 'ai']
keywords: ['arquitectura OpenClaw', 'agente PI OpenClaw', 'archivos workspace OpenClaw', 'OpenClaw Gateway 18789', 'servidores MCP OpenClaw', 'SOUL.md AGENTS.md HEARTBEAT.md MEMORY.md', 'OpenClaw skills ClawHub', 'OpenClaw sandboxing permisos']
series: 'mastering-openclaw'
seriesOrder: 2
---

Peter Steinberger estaba en Marrakech. Caminando por una ciudad que no conocía, con las manos ocupadas, hizo lo que cualquiera hace en WhatsApp cuando tiene las manos ocupadas: presionó el botón y le mandó una nota de voz a su agente.

Había un problema. Todavía no le había construido voz al agente. Se quedó mirando el teléfono, esperando silencio — y el agente respondió. Con una respuesta real. A lo que él había preguntado. Le escribió de vuelta: *¿cómo hiciste eso?*

El agente le explicó. Recibió un archivo de audio, se dio cuenta de que no sabía cómo decodificarlo, buscó en la web qué opciones tenía, encontró que OpenAI tenía un modelo de speech-to-text, ubicó una API key de OpenAI guardada en la máquina y la probó. Funcionó al primer intento. Nueve segundos de extremo a extremo. La frase de Peter desde el escenario de TED: *"I'm not kidding you, the mad lad figured it out on its own."* ("No estoy bromeando, el muy salvaje lo descubrió por su cuenta.")

Esa es la historia a la que sigo regresando. Es el momento donde OpenClaw deja de ser software que tú configuraste y empieza a ser algo que se configura un poquito más a sí mismo cada día. Y la única forma de sentir por qué eso es importante es mirar adentro de la cosa — saber qué parte de OpenClaw vio el archivo de audio, qué parte decidió buscar en la web, qué parte cargó la API key, qué parte hizo la llamada. De eso se trata este capítulo.

Si te perdiste la [historia de origen — Peter, el burnout, el triple rebranding, por qué este proyecto existe siquiera](/es/blog/openclaw-your-assistant-your-machine-your-rules) — empieza por ahí. Este capítulo no asume nada de eso. Acá vamos a abrir el capó.

---

## Por qué la anatomía

Cada vez que intento explicar OpenClaw termino agarrando metáforas del cuerpo, así que arranquemos por ahí.

La mayoría del software se explica con cajitas y flechas. Los cuerpos son más amigables. Una langosta tiene caparazón, sistema nervioso, órganos internos, dos pinzas, un latido que corre exista o no presa que cazar, y una concha de la que tiene que mudar cuando se le queda chica. OpenClaw también. La metáfora no es perfecta — ninguna metáfora lo es — pero es lo suficientemente buena para colgar el resto del capítulo de ahí. Al final deberías poder señalar cualquier parte de OpenClaw y decirme qué parte de la langosta está representando.

Los diagramas de cajitas y flechas son la peor forma de enseñarle un sistema como este a una persona normal. Así que vamos con la langosta. Disculpas a los ingenieros que hubieran preferido UML.

---

## El caparazón: OpenClaw en tu máquina

Mira esto primero. Todo el resto del post es un recorrido por lo que está adentro.

<!-- DIAGRAM 1 HERE: diagram-architecture-overview.webp — "OpenClaw en tu máquina": laptop con el Gateway (con el agente PI adentro), flechas hacia los canales, el LLM, la carpeta del workspace, y el dashboard. -->

OpenClaw corre como un único proceso de larga duración por máquina — el Gateway — y ese Gateway es el caparazón. Es el dueño de las conexiones a los canales, las sesiones, el ruteo, el agente embebido y el servidor HTTP que sirve el dashboard. Un Gateway, una máquina, un solo límite de confianza. OpenClaw explícitamente *no* es multi-tenant — la documentación lo dice sin rodeos: ["one user/trust boundary per gateway"](https://docs.openclaw.ai/gateway/security) ("un usuario o un solo límite de confianza por gateway"). Quien pueda escribir en `~/.openclaw/` es el usuario, punto.

Por defecto el Gateway escucha en `127.0.0.1:18789`. Lo arrancas una vez con `openclaw onboard --install-daemon` y de ahí en adelante corre como `openclaw gateway --port 18789`. Después de eso, cada adaptador de canal, el dashboard, cada invocación del CLI, cada tarea programada — todo le habla a ese mismo proceso. Si el proceso se muere, el cuerpo se muere con él. Por eso la mayoría de la gente lo deja prendido.

Adentro del Gateway vive el agente PI. La cosa que quiero dejar absolutamente clara, porque la primera vez que leí la documentación lo entendí mal: PI *no* es un proceso aparte. No es un subproceso al que el Gateway le habla con pipes. Es un SDK embebido — una librería que el Gateway importa y llama directamente vía [`createAgentSession()`](https://github.com/openclaw/openclaw/blob/main/docs/pi.md). El Gateway y el agente PI comparten memoria, comparten estado, comparten el mismo proceso. Desde la perspectiva del sistema operativo, OpenClaw es una sola cosa.

Ese detalle importa porque explica por qué el sistema se siente tan cohesivo. No hay IPC, no hay un baile de JSON-RPC entre dos procesos — son llamadas a funciones, así de simple. El Gateway le pasa una sesión al agente, el agente corre, el Gateway le devuelve los resultados al canal que preguntó. Es la decisión arquitectónica más limpia del proyecto entero, y creo que no recibe el crédito que merece.

Entonces: el caparazón es un proceso, en tu máquina, que es dueño de todo. Quédate con esa imagen. El resto es lo que hay adentro.

---

## El sistema nervioso: el agente PI

Una langosta no tiene cerebro como tú y yo. Lo que tiene es un anillo de ganglios alrededor de su esófago — racimos de nervios — que toman decisiones. OpenClaw se parece incómodamente a eso. El agente PI es un anillo de toma de decisiones envuelto alrededor del bucle de mensajes, y no piensa entre turnos. Solo piensa cuando algo llega.

<!-- DIAGRAM 2 HERE: diagram-message-flow.webp — flujo horizontal de 7 etapas: Mensaje del usuario → Ingreso por canal → Normalizar/dedupe/control de acceso → Resolución de sesión → Ensamblaje de contexto → Modelo + bucle de herramientas → Respuesta + persistencia, con flecha de retorno. -->

Cuando un mensaje cae, esto es lo que pasa, en orden:

1. **Ingreso por canal.** El adaptador correspondiente recoge el evento de la red — WhatsApp por Baileys, Telegram por grammY, Slack y Discord y los demás cada uno por su propio cliente — y lo convierte en algo que OpenClaw pueda leer.
2. **Normalizar, dedupe, control de acceso.** El Gateway normaliza el mensaje a su forma interna, verifica que no sea un duplicado, y aplica la política de DM/grupo: pareo, allowlist, abierto. Para grupos puede exigir un @mention explícito antes de que el agente responda.
3. **Resolución de sesión y ruteo.** El Gateway corre una jerarquía determinística — peer match → parent peer → guild+roles → guild → team → account → channel → default — para descubrir a qué agente y a qué sesión pertenece este mensaje. Puede haber más de un agente por Gateway. Cada uno tiene su propio workspace, su propia auth, su propio almacén de sesiones.
4. **Ensamblaje de contexto.** El agente PI carga los archivos del workspace que veremos en un momento — SOUL, AGENTS, USER, los logs de memoria de hoy y ayer, MEMORY.md si esta es una sesión principal, más el snapshot de skills elegibles. Los archivos vacíos se saltan. Los archivos grandes se recortan y se truncan con un marcador para que el prompt se mantenga liviano.
5. **Modelo + bucle de herramientas.** PI hace streaming hacia el modelo que tengas configurado. A medida que llegan llamadas a herramientas, pasan por el filtro de políticas, el sandbox y el normalizador de esquema antes de ejecutarse de verdad. Después el resultado vuelve al modelo, y el bucle continúa hasta que el modelo termine.
6. **Respuesta + persistencia.** Los chunks del stream salen por el adaptador del canal de vuelta a ti. La conversación queda escrita en `~/.openclaw/agents/<agentId>/sessions/`. Cualquier memoria nueva o cambio en el workspace cae a disco.

Eso es todo. Seis pasos, más una flecha de retorno hacia ti. No intentes memorizar el orden — seguramente Peter también tiene que mirarlo cada vez. Lo que importa es la forma: el agente no corre en background. Corre porque algo se lo pidió. Notas de voz, ticks programados, clics de botón en el dashboard — todos terminan reduciéndose a "llegó un mensaje, corre el bucle".

---

## Las antenas: cómo siente el mundo

El Gateway responde la pregunta de *¿de dónde viene la entrada?* Y la respuesta es: de cualquier lugar en el que ya escribas. O hables.

OpenClaw trae adaptadores para más de veinte canales a estas alturas: WhatsApp, Telegram, Slack, Discord, Signal, iMessage, más una [superficie WebChat](https://docs.openclaw.ai/concepts/architecture) y el dashboard. La mayoría están apagados por defecto hasta que los autenticas — y si alguna vez configuraste un bot de Telegram, la palabra que va a aparecer es "tedioso". WhatsApp tiene sus propias mañas porque a Meta no le encanta que nada de esto exista.

El dashboard es la segunda puerta de entrada. En la documentación se llama oficialmente "Control UI", y "dashboard" en todos los demás lugares, incluyendo el propio `getting-started`. Lo voy a llamar dashboard porque es lo que yo le digo y lo que tú le vas a decir. Es una single-page app construida con Vite y Lit, servida por el Gateway en el mismo puerto (`127.0.0.1:18789` por defecto), y le habla al Gateway por un WebSocket tipado. La autenticación pasa durante el handshake del WebSocket — token, password, identidad de Tailscale o headers de un proxy de confianza. Ahí puedes chatear con tu agente, ver las llamadas a herramientas en vivo mientras pasan, editar los archivos del workspace en un editor de Markdown, programar cosas, manejar canales y skills.

Lo que el dashboard me enseñó es que los canales son la puerta ruidosa pero no toda la historia. Mucho de lo que un agente hace, sobre todo durante los ticks de heartbeat, no le llega nunca a un canal — aparece solo en el log del dashboard, como un pensamiento que no te contaron. Eso es una virtud. No querrías un ping cada vez que el agente corre un autochequeo. Pero también significa: si nunca abriste el dashboard, solo viste la mitad de lo que hace tu agente.

---

## Los siete órganos: los archivos del workspace

La mente de OpenClaw vive en siete archivos Markdown. Sí — Markdown. Sin esquemas YAML, sin JSON de configuración, sin un DSL con su propia sintaxis para aprender. Texto plano que describe cómo debe comportarse tu agente.

Pequeña honestidad antes de empezar a nombrar archivos: en el workspace técnicamente hay más de siete. Está `BOOT.md` para hooks de arranque cuando el Gateway reinicia. Está `BOOTSTRAP.md` para el ritual de primer uso que se borra después de correr. Están los logs diarios de memoria en `memory/AAAA-MM-DD.md`. Está `skills/` y `canvas/`. Los siete que voy a recorrer son la *mente* del agente — todo lo demás es plomería o historial. Esa distinción es lo que el Capítulo 1 trataba de capturar. Solo quiero dejar claro que es una distinción, no una cuenta literal.

<!-- DIAGRAM 3 HERE: diagram-seven-organs.webp — pila vertical de los siete archivos del workspace (SOUL, IDENTITY, USER, TOOLS, HEARTBEAT, AGENTS, MEMORY) con qué inyecta cada uno y cuándo, fluyendo hacia un bloque de "Context window". -->

El workspace vive en `~/.openclaw/workspace` por defecto (o `~/.openclaw/workspace-<perfil>` si configuras `OPENCLAW_PROFILE`). Esto es lo que hace cada archivo.

**SOUL.md** — Personalidad, tono, límites. La voz del agente. Se carga al inicio de cada sesión. Peter ha dicho en entrevistas que esta parte del diseño se [inspiró en el trabajo de constitutional AI de Anthropic](https://lexfridman.com/peter-steinberger-transcript/) — un set chico de principios que dan forma a todo lo que hace el modelo sin tener que repetirse. La primera vez que edité SOUL.md cambié dos líneas y el agente se sintió como una persona distinta. Mismo modelo, misma memoria, mismas skills — alma diferente. Ahí me di cuenta de que este archivo carga peso real.

**IDENTITY.md** — Nombre, vibra, emoji. Se define durante el ritual de bootstrap en el primer arranque. Distinto de SOUL.md de una forma que me costó interiorizar: SOUL es *cómo me comporto*. IDENTITY es *cómo me llamo*. Dos cosas distintas, dos archivos distintos.

**USER.md** — Quién eres tú. Zona horaria, contexto de trabajo, preferencias de comunicación, cosas que el agente debería saber sobre ti. Se carga cada sesión. Es el archivo que más reviso, porque cada vez que cambio de trabajo o de país el agente necesita el update.

**TOOLS.md** — Notas sobre tus herramientas locales y convenciones. Cuidado importante que la documentación deja muy claro: este archivo es *referencia*, no control. No decide qué herramientas tiene el agente — eso vive en `openclaw.json` y el filtro de políticas. TOOLS.md es para decirle al agente cosas como "usamos ripgrep, no grep" o "siempre corre prettier antes de commitear". Mal nombrado, históricamente.

**HEARTBEAT.md** — Una lista de chequeo opcional que el agente repasa por su cuenta cada cierto tiempo, cada 30 minutos por defecto (o cada hora si estás autenticado a Anthropic por OAuth). Solo se lee en los ticks de heartbeat. Soporta una lista de bullets simple o un bloque estructurado `tasks:` con ítems nombrados e intervalos. Hay una pieza pequeña de comportamiento que vale la pena conocer: [si HEARTBEAT.md existe pero está efectivamente vacío](https://docs.openclaw.ai/gateway/heartbeat) — solo líneas en blanco y headers — OpenClaw se salta el run completo y registra `reason=empty-heartbeat-file`. Es una cortesía. No te cobran por nada. (Yo le dije "cron en lenguaje natural" en el Capítulo 1, y en gran parte lo es — alcanza para captar la idea — pero adentro de OpenClaw, heartbeat y cron son dos primitivas distintas. Volvemos a eso en la sección de metabolismo.)

**AGENTS.md** — Instrucciones operativas. Reglas, prioridades, caminos de escalamiento. Este es el archivo que silenciosamente se ha convertido en un estándar de la industria. Codex, Cursor, Antigravity, todos leen AGENTS.md cuando están en tu proyecto. OpenClaw lo lee al inicio de cada sesión. Es lo más cercano que tiene OpenClaw a un "system prompt", y el hecho de que sea el mismo nombre de archivo en el que otras herramientas convergieron no es accidente.

**MEMORY.md** — Memoria curada de largo plazo. Las cosas que importan a través de semanas y meses. Esta es la que me sorprendió: MEMORY.md solo se carga en tu *sesión principal y privada* — no en chats compartidos ni grupos. La razón es sensata (no quieres que tu memoria privada se filtre en un hilo de Slack con tu equipo), pero me tomó un rato darme cuenta de por qué mi agente de repente olvidaba cosas en un servidor de Discord. El día a día vive en otro lugar: `memory/AAAA-MM-DD.md`, un archivo por día, leído automáticamente para "hoy y ayer" antes de cada sesión.

Siete archivos. Texto plano. Esa es la mente.

---

## Las pinzas: herramientas integradas, skills y MCP

Ya, suficiente del cerebro. Hablemos de las manos.

Si los siete archivos son con lo que el agente piensa, las pinzas son lo que de verdad hace. Y hay tres familias. Se sienten distintas, viven en lugares distintos, pero desde el punto de vista del modelo todas se ven igual: una llamada a una herramienta.

<!-- DIAGRAM 4 HERE: diagram-three-families.webp — tres columnas (Herramientas integradas | Skills | servidores MCP) que confluyen en un solo carril de "Tool calls". -->

**Herramientas integradas.** Vienen de fábrica con OpenClaw. El README del repo las lista: [browser, canvas, nodes, cron, sessions y channel actions](https://github.com/openclaw/openclaw) para Discord, Slack y demás. Más messaging, la herramienta gateway, y el trío read/write/edit/bash que PI ya trae y OpenClaw reemplaza con versiones conscientes del sandbox. Son las que no tienes que instalar. Ya están ahí.

**Skills.** Una skill es un directorio con un archivo `SKILL.md` adentro — frontmatter YAML (`name`, `description`), cuerpo en Markdown con instrucciones. Eso es una skill. Sin código, a menos que la skill misma quiera invocar algo. El agente la lee cuando decide que es relevante. Las skills pueden venir de seis lugares, y el [orden de precedencia](https://docs.openclaw.ai/skills) importa porque las skills del workspace ganan por nombre sobre todas las demás:

1. `<workspace>/skills`
2. `<workspace>/.agents/skills`
3. `~/.agents/skills`
4. `~/.openclaw/skills`
5. Skills bundle (vienen con la instalación)
6. `skills.load.extraDirs` (las de menor prioridad)

El registro comunitario vive en [ClawHub](https://clawhub.ai/) — instalas una skill con `openclaw skills install <slug>` y las actualizas todas con `openclaw skills update --all`. La documentación de skills es inusualmente directa con la seguridad: *"Treat third-party skills as untrusted code. Read them before enabling."* ("Trata las skills de terceros como código no confiable. Léelas antes de habilitarlas.") Vale la pena tomarlo en serio, dado lo que pasó con [ClawHavoc](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html). El Capítulo 1 lo cubrió. No lo voy a repetir.

**Servidores MCP.** Esta es la parte que la documentación casi esconde y la parte que creo que más va a importar dentro de un año. OpenClaw habla [Model Context Protocol](https://docs.openclaw.ai/cli/mcp) en dos direcciones.

Hacia afuera — *OpenClaw se conecta a servidores MCP* — registras un servidor con `openclaw mcp set <nombre> <json>` y OpenClaw lo gestiona por ti. Soporta tres transportes: `stdio` (un proceso hijo local), `SSE/HTTP` (un servidor remoto con headers de auth opcionales) y `streamable-HTTP` (streaming bidireccional remoto). Un ejemplo real, sacado de la documentación:

```bash
openclaw mcp set context7 '{"command":"uvx","args":["context7-mcp"]}'
openclaw mcp set docs    '{"url":"https://mcp.example.com"}'
```

A partir de ahí, el PI embebido expone las herramientas de esos servidores en los perfiles `coding` y `messaging` estándar. Desde la perspectiva del modelo son simplemente herramientas. Los runtimes MCP con scope de sesión se cierran cuando quedan inactivos, así no pagas por procesos que no estás usando.

Hacia adentro — *OpenClaw se vuelve un servidor MCP* — corres `openclaw mcp serve` y obtienes un servidor MCP por stdio que puentea las conversaciones de tu Gateway hacia clientes MCP como Claude Code. Lo cual es alucinante cuando te sientas con la idea. Tu agente personal se convierte en una herramienta que otro agente puede usar.

La razón por la que las tres familias terminan teniendo la misma forma es que, para cuando el modelo las ve, son simplemente definiciones de herramientas. Mismo sobre. Mismo filtro de políticas. Mismo sandbox. La división en tres familias es la forma más limpia de pensar en las capacidades de un agente, punto. Todo lo demás es detalle de implementación.

---

## Metabolismo: el heartbeat y la memoria que vive debajo

El metabolismo de una langosta corre haya o no haya presa. El metabolismo de OpenClaw es el bucle de heartbeat y la capa de memoria que vive debajo.

<!-- DIAGRAM 5 HERE: diagram-heartbeat-memory.webp — bucle circular de 5 etapas (tick de heartbeat → leer HEARTBEAT.md → turno del agente → escribir log diario → opcionalmente actualizar MEMORY.md → de vuelta al tick), con una flecha de Tiempo al lado. -->

Heartbeat es el agente despertándose periódicamente para hacer un autochequeo. Por defecto cada 30 minutos, o cada hora si estás en Anthropic OAuth. Lo puedes configurar por agente en `agents.defaults.heartbeat.every`, restringirlo al horario laboral con `activeHours`, o apagarlo del todo con `0m`. La cosa crucial que la [documentación de heartbeat](https://docs.openclaw.ai/gateway/heartbeat) deja en voz alta: *"Heartbeat is a scheduled main-session turn -- it does not create background task records."* ("Heartbeat es un turno programado de la sesión principal — no crea registros de tareas en background.") Heartbeat no es cron. Comparten una vibra, pero adentro del sistema son primitivas separadas. Heartbeat = el agente tiene un turno. Cron (la herramienta de OpenClaw) = se crea un registro de tarea en background. Sutil, pero es la diferencia entre "el agente se autochequea" y "el agente tiene una cola de jobs".

La memoria debajo del heartbeat tiene dos capas. El log diario es un archivo de Markdown por día — `memory/2026-05-04.md`, `memory/2026-05-03.md`, y así. La plantilla por defecto de AGENTS.md le dice al agente que lea "hoy y ayer" antes de procesar requests, así que dos días de contexto siempre son baratos. La capa curada de largo plazo es MEMORY.md, que solo se carga en sesiones principales privadas, donde van las cosas que de verdad quieres que el agente *recuerde*.

Las sesiones, las credenciales y los perfiles de auth viven aparte, en `~/.openclaw/agents/<agentId>/sessions/`. Esa separación es el truco que hace que la multi-agencia funcione sin que nadie se filtre en la sesión de nadie.

Honestamente no estoy seguro de que 30 minutos sean la cadencia correcta para todo el mundo. Para mí es demasiado en un día normal y poco en los momentos en que de verdad necesito un check-in. Espero que los defaults sigan moviéndose a medida que el proyecto vaya entendiendo para qué lo usa la gente.

---

## La muda: cómo crece sin matarse

Las langostas no crecen poco a poco. Se les queda chica la concha, salen de ella caminando hacia atrás, y esperan a que la nueva se endurezca. La historia de seguridad de OpenClaw tiene la misma forma. La primera versión era salvaje — le das tu máquina, lo ves trabajar. La versión que tenemos hoy es lo que se ve cuando el segundo caparazón ya endureció.

Por defecto, en tu sesión *principal*, las herramientas corren en el host. Esa es la sensación "salvaje" de la que habla el Capítulo 1. En cualquier otra sesión, el sandbox entra en escena. El modo `non-main` por defecto corre las sesiones no-principales adentro de un contenedor Docker; también están disponibles SSH y OpenShell. Puedes cambiar el modo a `off` si quieres recuperar la sensación salvaje, o a `all` si hasta tu sesión principal te quieres sandboxear. El acceso al workspace también es configurable: `none`, `ro` montado en `/agent`, o `rw` montado en `/workspace`.

La lista de cosas que el [sandbox bloquea por defecto](https://docs.openclaw.ai/gateway/sandboxing) se lee como una lista de "la gente correcta pensó esto": `docker.sock`, `/etc`, `/proc`, `/sys`, `/dev`, más los directorios de credenciales `~/.ssh` y `~/.aws`. Tres niveles de seguridad para ejecución: `deny`, `full` (sin aprobación por comando — el default de operador-confiable), y `ask=always` (aprobación por cada comando, útil cuando no confías del todo en el agente o en la skill).

Después de ClawHavoc, el proyecto también bloqueó por defecto algunas herramientas para mensajes que no vienen del dueño: `cron`, `gateway`, `sessions_spawn`, `sessions_send`. Si alguien que no eres tú le manda un mensaje a tu agente, esas herramientas no van a correr para él sin importar lo que el agente decida. Eso es la muda.

Si el Capítulo 1 hizo sonar caóticos los primeros días, así se ve *menos caótico* en código. Sigue sin ser multi-tenant, y no pretende serlo. Asume un solo límite de confianza por Gateway, prefiere un Gateway por usuario del sistema operativo, y te lo dice en la página de seguridad. Creo que es la decisión correcta. Tratar de embutir multi-tenancy en un runtime de agente personal habría matado el proyecto. Decir *no, esto es tuyo, córrelo donde confíes* es la única respuesta honesta.

---

## Qué significa esto para ti

¿Por qué importa todo esto más allá de la curiosidad?

Porque una vez que entiendes el cuerpo, lo puedes editar. Cambios en SOUL.md te toman dos minutos. Una skill nueva es un archivo Markdown. Un servidor MCP es un comando del CLI. La mayoría de los usuarios nunca va a escribir una herramienta integrada nueva — no la necesitan. La arquitectura está montada para que la *configuración* sea la superficie que toca la mayoría de la gente. Eso es el regalo. El comportamiento del agente se dobla a quien sepa escribir una lista de bullets, que somos casi todos.

Llevo unos meses corriendo OpenClaw y lo único que cambié primero fue SOUL.md, dos veces. Después agregué dos skills de ClawHub y escribí una mía. Después conecté un servidor MCP de context7 porque me cansé de pegar documentación. No he tocado el sandbox. No he personalizado el heartbeat. Abro el dashboard una vez por semana, máximo. La mayor parte del cuerpo, la dejo quieta. Ese es el punto.

El regalo de la arquitectura es que sobrevive a que la mayoría de sus primeros usuarios no sepa exactamente qué está haciendo.

Sigamos construyendo.

---

## Recursos

- [OpenClaw](https://openclaw.ai/) — Sitio oficial
- [Documentación de OpenClaw](https://docs.openclaw.ai/) — Conceptos, gateway, skills, referencia del CLI
- [Vista de arquitectura](https://docs.openclaw.ai/concepts/architecture) — Gateway, sesiones, ruteo
- [Runtime del agente](https://docs.openclaw.ai/concepts/agent) — El agente PI y el ensamblaje de contexto
- [Referencia de archivos del workspace](https://github.com/openclaw/openclaw/blob/main/docs/concepts/agent-workspace.md) — La lista completa, no solo los siete
- [Heartbeat](https://docs.openclaw.ai/gateway/heartbeat) — Turnos periódicos del agente y HEARTBEAT.md
- [Sandboxing](https://docs.openclaw.ai/gateway/sandboxing) — Modos, fuentes bloqueadas, niveles de seguridad
- [Modelo de seguridad](https://docs.openclaw.ai/gateway/security) — Un solo límite de confianza por Gateway
- [Skills](https://docs.openclaw.ai/skills) — Formato, precedencia, ClawHub
- [Referencia del CLI MCP](https://docs.openclaw.ai/cli/mcp) — `openclaw mcp serve` y `openclaw mcp set/list/show/unset`
- [ClawHub](https://clawhub.ai/) — Registro comunitario de skills
- [SDK del agente PI](https://github.com/openclaw/openclaw/blob/main/docs/pi.md) — `createAgentSession()` y el pipeline de cableado de herramientas
- [Peter Steinberger en TED2026](https://www.ted.com/talks/peter_steinberger_how_i_created_openclaw_the_breakthrough_ai_agent) — La historia de la nota de voz en Marrakech, completa
- [Lex Fridman Podcast #491](https://lexfridman.com/peter-steinberger-transcript/) — Entrevista larga, incluyendo la inspiración de constitutional AI para SOUL.md
