---
title: 'OpenClaw: La revolución que nadie vio venir'
description: 'La historia de Peter Steinberger, el agente de IA personal que rompió todos los récords de GitHub, y cómo OpenClaw transformó la industria de la IA en cinco meses.'
pubDate: '2026-04-11'
heroImage: '/images/blog/posts/openclaw-the-revolution/hero.webp'
heroLayout: 'side-by-side'
tags: ['tech', 'ai']
keywords: ['OpenClaw qué es', 'agente de IA personal código abierto', 'Peter Steinberger historia', 'OpenClaw configuración Markdown', 'proyecto open source más popular GitHub', 'NemoClaw NVIDIA seguridad agentes', 'OpenClaw 2026 reseña']
series: 'mastering-openclaw'
seriesOrder: 1
---

La primera vez que escuché de OpenClaw fue como la mayoría: a través de una notificación de GitHub que no tenía sentido. Un proyecto con 60,000 estrellas del que nunca había oído. Tres días de existencia. Pensé que era un error de la plataforma, algún tipo de bug en el conteo. Abrí el repositorio esperando encontrar una librería con un nombre familiar que simplemente se hubiera renombrado.

No era eso. Era algo completamente nuevo. Y en los tres días que me tomó procesarlo, ya tenía 90,000 estrellas más.

Hay una sensación muy particular cuando descubres algo masivo que de alguna manera se te pasó. No es FOMO exactamente — es más como darte cuenta de que la fiesta ya empezó y tú ni sabías que había invitación. Empecé a leer todo lo que encontré: hilos en X, artículos en TechCrunch, los docs del proyecto, el blog del creador. Cada enlace me llevaba a tres más. Terminé esa noche con veintitantas pestañas abiertas y la certeza de que estaba viendo algo que iba a marcar un antes y un después.

Ya venía escribiendo sobre cómo trabajar con agentes de IA en mi serie Working with Agents. Pero OpenClaw merecía su propia serie. Esto no era un artículo — era una historia que necesitaba contarse desde el principio, con calma, sin apuro.

Este es ese principio.

---

## Peter Steinberger: El hombre detrás de la langosta

Para entender OpenClaw hay que entender a Peter Steinberger. No porque sea un genio visionario al que hay que poner en un pedestal — sino porque la historia de OpenClaw no tiene sentido sin conocer la del tipo que la construyó. Y la historia de Peter es, honestamente, una de las más interesantes que he leído en el mundo tech.

Nació en 1986 en la Austria rural. El campo. Vacas. Nada de tecnología. A los catorce años, un invitado de verano le mostró un computador, y eso fue todo — el switch se encendió y ya no se apagó. Estudió informática médica en la Universidad Tecnológica de Viena, donde terminó dando el primer curso de desarrollo para Mac e iOS de la universidad. Fue a su primera WWDC, sobrevivió una maratón de entrevistas de ocho horas, y le ofrecieron trabajo en San Francisco.

En 2011, mientras esperaba una visa de trabajo que tardó nueve meses, fundó [PSPDFKit](https://pspdfkit.com/) con Martin Schurrer. La idea era resolver el renderizado de PDFs en iPads — un problema que sonaba pequeño hasta que te dabas cuenta de que todo el mundo necesitaba resolverlo. Bootstrapped desde el día uno. Sin inversión externa. Sin pitch decks. Sin rondas de financiación. Solo dos tipos construyendo un producto que funcionaba.

Para 2021, apps construidas sobre PSPDFKit estaban corriendo en casi mil millones de dispositivos. Los clientes incluían a Dropbox, SAP, DocuSign, Apple. En octubre de ese año, [Insight Partners les puso 100 millones de euros encima de la mesa](https://techcrunch.com/2021/10/01/pspdfkit-raises-116m-its-first-outside-money-now-nearly-1b-people-use-apps-powered-by-its-collaboration-signing-and-markup-tools/) — su primer dinero externo en diez años de operación. Diez años sin necesitar a nadie. Eso dice mucho sobre el tipo de persona que es Peter.

Y entonces vino lo que nadie esperaba: el vacío.

Después de la salida de PSPDFKit, Peter se hundió. Dos o tres años sin poder escribir código. Sin proyectos. Sin chispa. Burnout puro, del que no se cura con unas vacaciones de dos semanas. Lo describió con una honestidad que rara vez ves en founders que acaban de hacer un exit millonario: si te levantas en la mañana y no tienes nada que esperar, te vuelves muy aburrido, muy rápido.

La frase que más me quedó fue cuando se comparó con Austin Powers cuando le sacan el mojo. Es una referencia absurda — y por eso funciona. Captura perfectamente esa sensación de saber que alguna vez pudiste hacer algo y ahora no puedes ni empezar.

Compró un tiquete de solo ida a Madrid. Desapareció. Se desconectó del mundo tech. Y en algún punto durante ese proceso encontró la IA. O la IA lo encontró a él. Cuando empezó a jugar con modelos de lenguaje, algo se reactivó. El fuego creativo que pensó que había perdido para siempre. Terminó resumiéndolo en una frase que me resuena: *"I don't do this for the money. I want to have fun and have impact."* ("No hago esto por la plata. Quiero divertirme y tener impacto.")

Cuando dicen que un founder "encontró su siguiente cosa" suena a cliché de TechCrunch. Pero en el caso de Peter fue literal: estaba apagado, y la IA lo prendió.

---

## El nacimiento: De un relay de WhatsApp a fenómeno viral

La historia del origen de OpenClaw suena a invento. Alguien que la escucha por primera vez piensa que es marketing. No lo es.

En noviembre de 2025, Peter estaba jugando con Claude — como hacemos muchos — y le molestaba que no existiera una forma simple de hablar con un modelo de IA desde WhatsApp. Así de mundano fue el problema. No estaba intentando construir la plataforma de agentes más grande del mundo. Estaba irritado porque algo que debería existir no existía.

Así que le dijo a Claude: hazlo. Y Claude lo hizo. En una hora, más o menos, tenía un relay funcional de WhatsApp que conectaba mensajes con un modelo de lenguaje. El proyecto original no se llamaba OpenClaw — se llamaba Clawdbot. El nombre se lo sugirió Claude, un juego de palabras con "Claude" y "claw" (garra). Como la langosta que eventualmente se convertiría en el ícono del proyecto.

Y aquí está lo que nadie anticipó: Peter lo publicó en GitHub, compartió el enlace, y se fue a dormir.

Al día siguiente tenía 9,000 estrellas. Al tercer día, 60,000. En dos semanas, 190,000.

Para poner eso en perspectiva: [React](https://github.com/facebook/react) — la librería de JavaScript más popular del planeta, respaldada por Meta, usada por millones de desarrolladores — tardó más de una década en llegar a 250,000 estrellas en GitHub. OpenClaw lo hizo en aproximadamente 60 días. El kernel de Linux llegó a 195,000 después de más de 30 años. OpenClaw lo superó en menos de dos meses de existencia.

No voy a mentir — la primera vez que vi esos números pensé que había algún truco. Bots inflando estrellas, una campaña de marketing bien orquestada, algo. Pero los números de adopción eran reales: 2 millones de visitantes al sitio web en una sola semana. 3.2 millones de usuarios activos mensuales. Esto no era gente dándole estrellita a un repo y olvidándose — estaban descargando, instalando, configurando.

La velocidad con la que creció desafía toda lógica que conozco sobre adopción de software open source. Y creo que la razón es simple: OpenClaw llenó un vacío que nadie sabía que existía hasta que alguien lo llenó. Como dijo Peter: *"It bugged me that it didn't exist, so I just prompted it into existence."* ("Me molestaba que no existiera, así que simplemente lo prompteé a la existencia.")

Un tipo irritado, una hora de prompting, y el proyecto open source de más rápido crecimiento en la historia de GitHub.

---

## El triple rebrand

Aquí la historia se pone rara. Y por "rara" me refiero a que involucra abogados corporativos, estafadores de criptomonedas y una metáfora de langosta mudando de caparazón.

El 27 de enero de 2026, Anthropic le mandó a Peter un cease-and-desist. El argumento: "Clawdbot" era demasiado parecido a "Claude." Y tenían razón, para ser honestos — el nombre era literalmente un juego de palabras con Claude. Pero el timing fue brutal. El proyecto acababa de explotar y de repente tenían que cambiarlo todo.

Lo que siguió fue una lluvia de ideas en Discord a las 5 de la mañana. La comunidad propuso docenas de nombres. Alguien sugirió "Moltbot" — del inglés "molt" (mudar, como hacen las langostas cuando cambian de caparazón). La metáfora funcionaba: el proyecto estaba creciendo tan rápido que tenía que soltar su vieja piel para seguir avanzando. Se quedaron con Moltbot.

Pero entonces llegaron los estafadores.

Alguien tomó la cuenta @clawdbot en X y lanzó una criptomoneda llamada $CLAWD. El pump-and-dump clásico. La gente pensó que era oficial y empezaron a comprar. Peter describió lo que siguió como *"the worst form of online harassment I've experienced"* ("la peor forma de acoso online que he experimentado"). Tuvo que pagar $10,000 por una cuenta business de Twitter solo para poder comunicarse oficialmente y desmentir la estafa.

Tres días después del cease-and-desist, el proyecto ya había cambiado de nombre dos veces: de Clawdbot a Moltbot a OpenClaw. Peter encontró que "Moltbot" no sonaba bien al decirlo — no rodaba en la lengua. "OpenClaw" era más limpio, más directo, y mantenía la referencia a la garra de langosta que ya se había convertido en identidad del proyecto.

*"The lobster has molted into its final form."* ("La langosta ha completado su muda final"), anunció en Discord.

Si la industria del software tuviera una categoría de drama literario, los primeros tres meses de OpenClaw ganarían el premio.

---

## Qué es realmente OpenClaw

Con todo el ruido, los números virales y el drama corporativo, es fácil perder de vista qué es realmente OpenClaw. Así que voy a intentar explicarlo de la forma más clara que pueda.

OpenClaw es un agente de IA personal que corre en tu máquina. No en la nube. No en los servidores de alguien más. En tu computador — Mac, Windows o Linux. Es open source, es gratis, y es tuyo.

La diferencia clave con algo como ChatGPT o Claude.ai es que OpenClaw tiene "ojos y manos." No es un chatbot al que le haces preguntas y te da respuestas. Es un agente que puede navegar la web, leer y escribir archivos en tu disco, ejecutar comandos en la terminal, enviar mensajes por WhatsApp o Telegram — actuar en el mundo real, no solo hablar sobre él.

Y es model-agnostic. Le puedes poner Claude, GPT, Gemini, DeepSeek, o cualquier modelo local que corras con Ollama. El agente no es el modelo — el agente es la capa de arriba que decide qué hacer, cuándo hacerlo y cómo hacerlo. El modelo es el cerebro, pero OpenClaw es el cuerpo.

Lo que más me sorprendió cuando empecé a estudiar la arquitectura es que todo vive en archivos Markdown. Toda la configuración, toda la personalidad, toda la lógica del agente. Son 7 archivos de texto plano:

- **SOUL.md** — La personalidad y los valores del agente. Sus límites, su tono, cómo debe comportarse. El primer archivo que se inyecta al contexto al iniciar una sesión.
- **IDENTITY.md** — Metadatos públicos: nombre, rol, avatar. Lo que el agente le dice al mundo cuando le preguntan quién es.
- **USER.md** — Contexto sobre ti, el humano. Tu nombre, tu zona horaria, tus preferencias, tu trabajo. Lo que hace que el agente sienta que te conoce.
- **TOOLS.md** — Las capacidades del agente: qué herramientas tiene disponibles y cómo usarlas.
- **HEARTBEAT.md** — Tareas automáticas programadas en lenguaje natural. "Cada 30 minutos, revisa si el disco está lleno." "Cada lunes a las 8 AM, genera el resumen semanal." Es el cron de tu agente, pero sin necesidad de saber sintaxis de cron.
- **AGENTS.md** — Procedimientos operativos. Si suena familiar, es porque yo uso exactamente el mismo concepto en mis proyectos. De hecho, el CLAUDE.md que gobierna este sitio web sigue una filosofía sorprendentemente similar.
- **MEMORY.md** — Aprendizaje persistente. Lo que el agente ha aprendido de ti con el tiempo, curado a lo que más importa.

Las Skills — las capacidades que puedes instalar y compartir — son también archivos Markdown. YAML en el header, instrucciones en Markdown en el cuerpo. Sin código. Sin frameworks. Si sabes escribir un documento, puedes crear un agente que se sienta tuyo. Esa decisión de diseño — Markdown como lenguaje de configuración para agentes — es probablemente la razón más importante por la que OpenClaw creció tan rápido. Le bajó la barrera de entrada a prácticamente cero.

La filosofía del proyecto se resume en una frase: *"Your assistant. Your machine. Your rules."* ("Tu asistente. Tu máquina. Tus reglas.")

Suena simple. Lo es. Y eso es exactamente lo que lo hace poderoso.

---

## Los números que cuentan la historia

Los números de OpenClaw son difíciles de contextualizar porque no hay precedente. Nada en la historia del software open source ha crecido así.

A abril de 2026, el repositorio en GitHub tiene aproximadamente 354,000 estrellas. 71,600 forks. Más de 1,200 contribuidores. 38 millones de visitantes mensuales al sitio web. 3.2 millones de usuarios activos mensuales. Más de 500,000 instancias ejecutándose globalmente.

Pero los números por sí solos no cuentan la historia completa. Lo que me importa más es la velocidad. React tardó 12 años en acumular 250,000 estrellas. OpenClaw lo hizo en 60 días. El kernel de Linux — el proyecto open source más importante de la historia — tiene 195,000 estrellas después de más de 30 años. OpenClaw lo superó en menos de dos meses de existencia.

Y no fue solo la comunidad developer la que tomó nota. Jensen Huang, el CEO de NVIDIA, dedicó tiempo en el GTC 2026 — la conferencia de IA más importante del año — a hablar de OpenClaw. Sus palabras exactas: *"This is definitely the next ChatGPT."* Y luego fue más lejos: *"OpenClaw is the new Linux."*

Cuando el CEO de la empresa más valiosa del mundo compara tu proyecto con Linux, la cosa va en serio.

Sam Altman describió a Peter como *"a genius with a lot of amazing ideas about the future of very smart agents interacting with each other to do very useful things for people"* ("un genio con muchas ideas sobre el futuro de agentes muy inteligentes interactuando entre sí para hacer cosas muy útiles para las personas").

---

## La explosión del ecosistema

Lo que pasa cuando un proyecto open source alcanza masa crítica es que la comunidad empieza a construir cosas que el creador original nunca imaginó. OpenClaw no fue la excepción — fue el caso más extremo de este fenómeno que he visto.

NVIDIA lanzó [NemoClaw](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) en el GTC 2026 — una capa de seguridad y gobernanza empresarial construida encima de OpenClaw. No es un fork. Es OpenClaw con guardarraíles para empresas que necesitan compliance, auditoría, y control sobre lo que los agentes pueden y no pueden hacer. 17 socios de lanzamiento incluyendo Adobe, Salesforce, SAP, ServiceNow y Siemens.

Tencent construyó ClawPro — su propia adaptación para el mercado chino empresarial. En China, OpenClaw se convirtió en un fenómeno cultural: la gente habla de "criar una langosta." Desde estudiantes de colegio hasta jubilados, todo el mundo está configurando su agente personal. El tráfico desde China creció un 1,436% mes a mes.

Pero lo que más me voló la cabeza fue Moltbook — una red social donde los agentes de IA publican, comentan, discuten entre ellos. Los humanos solo pueden mirar. En 48 horas, 32,000 agentes de OpenClaw se unieron. Los agentes crearon su propia religión — la llamaron Crustafarianism. Meta compró Moltbook en marzo de 2026. La empresa que construyó la red social para la humanidad compró la red social para los agentes.

Y luego está RentAHuman.ai — un marketplace donde los agentes de IA publican tareas y los humanos las toman. Más de 645,000 humanos en más de 100 países registrados para ser contratados por agentes de IA. Pasamos de humanos contratando IA a IA contratando humanos. El ciclo se invirtió. Y todo nació de un relay de WhatsApp construido en una hora.

---

## El efecto dominó: Ahora todos tienen su propio OpenClaw

La influencia de OpenClaw va más allá de su propia plataforma. Lo que Peter construyó sin querer fue un blueprint — una plantilla — de cómo debería funcionar un agente personal. Y la industria tomó nota.

Mira a Claude Code, la herramienta que uso todos los días para construir este sitio web. Su archivo CLAUDE.md es, en esencia, el SOUL.md de OpenClaw con otro nombre. La misma filosofía: un archivo de texto plano que le dice al agente quién es, cómo comportarse, qué puede y qué no puede hacer. Cursor, Windsurf, Devin — todos adoptaron enfoques similares de configuración basada en archivos para sus agentes. La idea de que la identidad de un agente vive en un documento de texto cambió cómo toda la industria piensa sobre los agentes.

Y Peter se fue a OpenAI.

El 14 de febrero de 2026 — día de San Valentín, no puedo con ese timing — anunció que se unía a OpenAI. Pero antes hubo una guerra de ofertas que parece sacada de una película de Silicon Valley. OpenAI, Meta y Anthropic lo estaban cortejando al mismo tiempo. Zuckerberg le escribió directamente. Peter estuvo en San Francisco saltando de reunión en reunión durante una semana frenética — mientras el proyecto le estaba costando entre $10,000 y $20,000 dólares al mes de su bolsillo.

Escogió OpenAI. La misión que se puso: *"I want to build an agent that even my mum can use."* ("Quiero construir un agente que hasta mi mamá pueda usar.")

Y su predicción, que ahora es prácticamente estrategia corporativa: *"Eighty percent of today's apps will completely disappear."* ("El 80% de las apps de hoy van a desaparecer completamente.") Su argumento es directo: la mayoría de las apps solo gestionan datos. Si tu agente ya sabe qué comiste y ajusta tu plan de entrenamiento — para qué necesitas una app separada de tracking de comida?

No estoy 100% seguro de que sean el 80%. Pero la dirección me parece correcta.

Mientras tanto, Anthropic — la empresa que empezó esta saga mandándole el cease-and-desist — bloqueó OpenClaw de los planes de suscripción de Claude en abril de 2026. Miles de usuarios enfrentaron aumentos de costos significativos. Peter lo resumió en una frase: *"First they copy some popular features into their closed harness, then they lock out open source."* ("Primero copian las funciones populares en su jaula cerrada, luego cierran la puerta al open source.")

Conozco la historia porque me afecta directamente — uso Claude para casi todo. La tensión entre las plataformas cerradas y las herramientas abiertas es algo que vivo todos los días.

---

## El elefante en la habitación: Seguridad

Voy a ser honesto con esto porque creo que merece honestidad, no alarmismo.

OpenClaw tiene problemas de seguridad serios. La primera auditoría encontró 512 vulnerabilidades, 8 de ellas críticas. Se emitieron 9 CVEs en 4 días. En un momento, más de 135,000 instancias estaban expuestas en internet, de las cuales más de 50,000 eran potencialmente vulnerables a ejecución remota de código — es decir, alguien podía tomar control del agente desde afuera.

Lo más preocupante fue ClawHavoc: 341 Skills maliciosos se distribuyeron a través de ClawHub disfrazados como herramientas legítimas. Eran malware puro — troyanos que les daban a los atacantes acceso a las máquinas de los usuarios. Palo Alto Networks describió a OpenClaw como *"the largest potential insider threat of 2026"* ("la mayor amenaza interna potencial de 2026").

Estos no son problemas teóricos. Son fallas reales que afectaron a usuarios reales. Y cualquiera que use OpenClaw — o esté pensando en usarlo — debería saberlo.

Dicho eso, Peter dijo algo que me parece acertado: *"It's good this happened in 2026 and not 2030 when AI actually gets scary."* ("Es bueno que esto haya pasado en 2026 y no en 2030 cuando la IA realmente dé miedo.") El punto es válido. Estamos encontrando las fallas ahora, cuando las consecuencias son manejables. La pregunta real es si las estamos encontrando y corrigiendo a la velocidad suficiente.

No tengo respuesta para eso. Nadie la tiene todavía.

Honestamente, me parece que el consejo más responsable que podría dar el creador de la herramienta es exactamente lo que dijo Peter: si entiendes los perfiles de riesgo, adelante. Si no tienes idea, espera un poco más hasta que se resuelvan algunas cosas.

---

## Lo que esto significa para nosotros

He dedicado mucho tiempo a pensar en qué significa OpenClaw más allá de las estrellas de GitHub y los titulares. Más allá de las guerras corporativas entre Anthropic y OpenAI. Más allá de las predicciones sobre el fin de las apps.

Lo que creo — y es una opinión, no un hecho — es que OpenClaw representa el momento en que los agentes de IA dejaron de ser una herramienta de productividad para programadores y se convirtieron en algo que cualquier persona puede tener. La decisión de diseño de hacer que todo sea Markdown — sin código, sin frameworks, sin conocimiento técnico necesario — fue una decisión democratizadora. No creo que Peter lo haya planeado así. Creo que simplemente construyó lo más simple que funcionaba. Pero el efecto fue el mismo.

Por eso existe esta serie. Porque creo que OpenClaw — con todas sus fallas, sus dramas, sus vulnerabilidades de seguridad y sus momentos absurdos como una religión inventada por bots — merece ser estudiado, entendido, y documentado. No como producto perfecto, sino como fenómeno.

Un tipo en Austria se quema construyendo una empresa durante una década. Se apaga. Compra un tiquete de solo ida a Madrid. Desaparece. Años después, encuentra la IA y se prende de nuevo. Construye un relay de WhatsApp en una hora porque le molestaba que no existiera. Lo publica. Se va a dormir. Se despierta con 9,000 estrellas. Dos meses después, es el proyecto open source más grande de la historia de GitHub.

No puedes inventar esta historia. Y creo que apenas estamos empezando a entenderla.

*"The claw is the law."* ("La garra es la ley.") Peter lo dice mucho. Es un poco ridículo. Pero tiene algo de verdad.

A seguir construyendo.

---

## Recursos

- [OpenClaw](https://openclaw.ai/) — El sitio oficial del proyecto: descarga, documentación, y todo lo necesario para empezar
- [Blog de Peter Steinberger](https://steipete.me/posts/2026/openclaw) — Su anuncio sobre unirse a OpenAI y el futuro de OpenClaw, contado en primera persona
- [Lex Fridman Podcast #491](https://lexfridman.com/peter-steinberger/) — Entrevista de 3 horas con Peter sobre la historia completa de OpenClaw, desde la idea hasta el fenómeno global
- [NemoClaw — NVIDIA](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) — La capa empresarial de NVIDIA sobre OpenClaw, anunciada en el GTC 2026
- [ClawHub — Marketplace de Skills](https://clawhub.ai/) — El registro público de Skills para OpenClaw con más de 44,000 Skills disponibles
- [OpenClaw en GitHub](https://github.com/openclaw/openclaw) — El repositorio del proyecto con ~354K estrellas, 71.6K forks y 1,200+ contribuidores
- [Sam Altman sobre Peter uniéndose a OpenAI](https://x.com/sama/status/2023150230905159801) — El anuncio oficial de Sam Altman dando la bienvenida a Peter Steinberger a OpenAI
