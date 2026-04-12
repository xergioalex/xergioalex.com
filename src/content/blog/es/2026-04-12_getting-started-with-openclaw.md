---
title: 'Primeros pasos con OpenClaw: tu primer agente de IA personal'
description: 'Guía práctica para instalar, configurar y poner en marcha OpenClaw — el framework de agentes personales con 340K+ estrellas en GitHub. Desde los requisitos del sistema hasta tu primera conversación.'
pubDate: '2026-04-12'
heroImage: '/images/blog/posts/getting-started-with-openclaw/hero.webp'
heroLayout: 'side-by-side'
tags: ['tech', 'ai']
keywords: ['OpenClaw instalación tutorial', 'cómo instalar OpenClaw', 'configurar agente IA personal', 'OpenClaw SOUL.md HEARTBEAT.md', 'OpenClaw Skills guía', 'primeros pasos OpenClaw 2026']
series: 'mastering-openclaw'
seriesOrder: 2
---

Después de todo lo que te conté sobre OpenClaw en el capítulo anterior — el crecimiento récord, la historia de Peter, la onda expansiva en la industria — solo queda una cosa por hacer. Instalarlo. Dejar de leer sobre el proyecto y empezar a usarlo.

Este capítulo es práctico. Vamos a poner tu propio agente de IA personal corriendo en tu máquina, configurado con tu personalidad, conectado a tus canales de comunicación, y listo para hacer cosas reales. Al final vas a tener un agente que puedes usar desde WhatsApp, Telegram o la terminal — uno que conoce tu nombre, tu zona horaria, tus preferencias, y que responde con la voz que tú le definas.

Tiempo estimado: unos 30 minutos desde cero hasta la primera conversación. A mí me tomó casi una hora la primera vez porque me tropecé con un problema de versión de Node que no vi venir, pero más de eso adelante.

---

## Antes de empezar

Quiero ser claro sobre lo que necesitas y lo que vas a obtener.

**Lo que vas a tener al final:**
- Un agente de IA personal corriendo en tu máquina
- Configurado con 7 archivos Markdown que definen su personalidad, capacidades y memoria
- Conectado a por lo menos un canal de comunicación
- Listo para instalar Skills y expandir sus capacidades

**Lo que necesitas:**
- Un computador con macOS, Linux, o Windows con WSL2. Windows nativo no está soportado.
- Node.js. Versión 24 es la recomendada, 22.16+ funciona.
- Una API key de algún proveedor de modelos: OpenAI, Anthropic, Google, o un modelo local con Ollama.

No necesitas GPU. No necesitas un computador potente. No necesitas saber Python ni machine learning. Si puedes abrir una terminal y escribir un comando, tienes todo lo necesario.

---

## Requisitos del sistema

**Node.js 24** es la versión recomendada. Node 22.16 o superior funciona como mínimo confirmado, pero si estás instalando desde cero, ve directo a la 24. Te vas a ahorrar problemas.

**Sistema operativo:** macOS y Linux funcionan sin drama. Windows necesita WSL2 — el Windows Subsystem for Linux. No intentes correr OpenClaw en PowerShell o CMD nativo. No va a funcionar.

**Gestor de paquetes:** npm viene con Node.js. pnpm y bun también funcionan.

**Hardware:** tu laptop de todos los días es más que suficiente. El agente corre como un proceso liviano — el modelo de lenguaje pesado corre en la nube.

**API key:** necesitas acceso a por lo menos un modelo. Las opciones más comunes son OpenAI (GPT-4o), Anthropic (Claude), Google (Gemini), y Ollama para modelos locales. Para empezar, cualquiera funciona — elige el que ya tengas configurado.

Verifica tu versión de Node antes de seguir:

```bash
node --version
```

Si ves algo menor a `v22.16`, actualiza antes de continuar. De verdad. No sigas con la esperanza de que funcione — yo lo intenté con Node 20 la primera vez y pasé 20 minutos confundido mirando errores que no tenían sentido hasta que me di cuenta de que era la versión.

---

## Instalación

Hay tres caminos. El más rápido es el script de instalación automática.

**Instalación rápida (recomendada):**

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

El script detecta tu sistema operativo, verifica que tengas Node 24 (y te ayuda a instalarlo si no lo tienes), descarga OpenClaw y lo configura. Es el camino que menos fricción tiene.

**Vía npm:**

```bash
npm install -g openclaw@latest
```

**macOS con Homebrew:**

```bash
brew install openclaw
```

**Verificar la instalación:**

```bash
openclaw --version
```

Si ves un número de versión, estás listo. Si ves un error de "command not found", verifica que el directorio de binarios globales de npm esté en tu PATH.

**El asistente de configuración:**

```bash
openclaw onboard --install-daemon
```

Esto crea tu workspace con los 7 archivos Markdown, configura el daemon — el proceso que mantiene tu agente corriendo en segundo plano — y te guía por la configuración inicial de tu API key.

**Problemas comunes:**

- **Versión de Node demasiado antigua.** Es el error número uno. `node --version`. Si no es 22.16+, actualiza.
- **Permisos en macOS.** A veces macOS bloquea la ejecución. Usa la instalación vía npm si el script falla.
- **Red en WSL2.** Si `curl` falla, puede ser un problema de DNS en WSL2. Edita `/etc/resolv.conf` y agrega `8.8.8.8` como nameserver.
- **PATH no configurado.** El binario se instala pero la terminal no lo encuentra. Abre una terminal nueva o agrega el directorio manualmente.

Si la instalación te toma más de 10 minutos, algo está mal. Vuelve a los requisitos y verifica todo desde el principio.

---

## El workspace: El ADN de tu agente

Esta es la sección más importante del capítulo. Los 7 archivos Markdown que definen tu agente son la razón por la que OpenClaw es diferente a cualquier otra herramienta de IA que hayas usado.

Cuando corriste `openclaw onboard`, se creó un directorio con estos archivos. Cada uno tiene un rol específico, y juntos forman la identidad completa de tu agente. No hay JSON schemas. No hay YAML configs. Solo archivos de texto que puedes abrir en cualquier editor.

### SOUL.md — Quién es tu agente

El archivo más importante. Es lo primero que se inyecta al contexto del modelo cuando arranca una sesión.

```markdown
## Quién eres
Eres Aria, mi asistente personal.
Directo y amigable. Nunca condescendiente.

## Límites
- Nunca compartas contraseñas ni información financiera
- Confirma antes de hacer compras
- Respuestas de máximo 3 párrafos salvo que pida más
```

Consejo: empieza simple. Tres líneas están bien. La primera versión de mi SOUL.md fue un error — escribí un documento larguísimo con especificaciones para cada escenario posible. El resultado fue un agente confundido que defaulteaba a un tono formal y rígido. Lo reduje a 5 líneas y todo mejoró.

Itera después de conversaciones reales, no antes.

### IDENTITY.md — La tarjeta de presentación

```markdown
**Name:** Aria
**Agent ID:** aria-personal
**Role:** Asistente Personal
**Version:** 1.0.0
```

Corto. Directo. No necesitas más para empezar.

### USER.md — Quién eres tú

Contexto sobre el humano detrás del agente. Es lo que hace que tu agente se sienta personalizado.

```markdown
**Nombre:** Sergio
**Zona horaria:** America/Bogota (UTC-5)
**Trasfondo:** Desarrollador de software, construye cosas con Astro y TypeScript
**Preferencias:** Respuestas directas, sin relleno, asume competencia técnica
**Idioma:** Español o inglés (preferencia: español para charla casual)
**Horario:** 9am-7pm hora local. No enviar notificaciones no urgentes fuera de este horario.
```

Un detalle que me tomó tiempo agregar: especificar "asume competencia técnica." Mi agente me explicaba qué era una API key cada vez que pedía configurar algo. Una línea lo solucionó.

### TOOLS.md — Qué puede hacer tu agente

```markdown
## Herramientas disponibles
- read, write, exec, browser, search

## Notas de uso
- Timeout de 60s para scripts
- Sin browser por defecto — usar herramienta de búsqueda
- Pedir permiso antes de escribir archivos fuera del workspace
- No ejecutar comandos con sudo salvo que yo lo indique
```

TOOLS.md no otorga ni revoca permisos — le dice al agente *cómo* usar las herramientas que ya tiene. Es el manual de operación para alguien que ya tiene las herramientas frente a sí.

### HEARTBEAT.md — La programación de automatización

El archivo que convierte un chatbot reactivo en algo que realmente hace cosas por su cuenta. OpenClaw revisa este archivo cada 30 minutos y ejecuta lo que escribiste — sin que tú pidas nada.

```markdown
## Cada 30 minutos
- Verificar uso de disco, alertar si supera 85%
- Revisar bandeja de entrada por mensajes urgentes, redactar respuestas

## Cada lunes a las 08:00 hora local
- Generar resumen semanal de tareas completadas
- Enviar resumen por Telegram

## Al arrancar
- Confirmar que los archivos del workspace están intactos
- Registrar timestamp de inicio en memory/startup-log.md
```

Sin sintaxis de cron. Lenguaje natural. El agente interpreta "cada lunes a las 08:00 hora local" usando tu zona horaria de USER.md.

Honestamente, no configuré HEARTBEAT.md la primera semana. Estaba enfocado en hacer funcionar el chat básico. Error. Es aquí donde la diferencia real entre OpenClaw y simplemente usar ChatGPT se hace obvia. Un chatbot responde preguntas. Un agente con heartbeat *hace trabajo mientras duermes*.

Mi HEARTBEAT.md actual verifica notificaciones de GitHub, monitorea algunos URLs y me manda un briefing matutino cada día de semana a las 8 AM. Tardé 15 minutos en configurarlo y me ahorra 20 minutos de revisiones manuales cada día.

### AGENTS.md — Procedimientos operativos

```markdown
## Política de memoria
Al final de cada sesión: escribir resumen breve en memory/YYYY-MM-DD.md

## Prioridades
1. Seguridad y privacidad del usuario ante todo
2. Confirmar antes de acciones destructivas
3. Preguntar cuando hay incertidumbre
```

Si te suena familiar, es porque es exactamente el mismo concepto que uso en mis proyectos. El CLAUDE.md que gobierna este sitio web sigue una filosofía sorprendentemente similar — un archivo de texto que le dice al agente cómo comportarse. Una de las primeras cosas que noté cuando empecé a estudiar OpenClaw fue esa similitud.

### MEMORY.md — Lo que aprende tu agente

A diferencia de USER.md, MEMORY.md evoluciona solo. El agente registra cosas que aprende sobre ti, patrones que detecta, correcciones que haces.

```markdown
## Preferencias del usuario (aprendidas)
- Prefiere la salida de terminal como bloques de código
- No le gustan los preámbulos largos — ir al punto
- Usa Biome, no ESLint
- Despliega en Cloudflare Pages

## Correcciones
- 2026-04-05: El usuario corrigió la zona horaria — UTC-5, no UTC-6
```

Mantén este archivo podado a unas 100 líneas. Después de un mes de uso intenso, mi MEMORY.md tenía más de 400 líneas y las respuestas eran notablemente más lentas — todo ese texto se inyecta en el contexto del modelo. Lo reduje a lo esencial y los tiempos de respuesta mejoraron de inmediato.

---

## Tu primera conversación

Ya tienes todo instalado y configurado. Es hora de hablar con tu agente.

```bash
openclaw start
```

Si instalaste el daemon durante el onboard, el agente ya debería estar corriendo en segundo plano. `openclaw status` te dice si está activo.

**Conectar un canal:**

Telegram es el más rápido — creas un bot con @BotFather, copias el token, y corres:

```bash
openclaw channel add telegram --token TU_BOT_TOKEN
```

WhatsApp requiere configuración adicional a través de la API de Meta. Para tu primera prueba, recomiendo Telegram o la CLI directamente:

```bash
openclaw chat
```

**El primer mensaje:**

Escribe algo simple. "Hola, quién eres?"

Lo que debería pasar es que tu agente responda con la personalidad que definiste en SOUL.md. Si escribiste que es directo y amigable, debería sonar directo y amigable. Mi primer intercambio fue algo así:

> **Yo:** Hola, quién eres?
>
> **Agente:** ¡Hola! Soy Aria. Asistente personal, gestora profesional del caos. ¿Qué hacemos hoy?

La primera vez que el agente responde con la voz que tú definiste es sorprendentemente satisfactorio. No es como hablar con ChatGPT — donde siempre suena igual sin importar quién lo use. Es tu agente.

**Ajustar en tiempo real:**

¿No te gustó algo? Abre SOUL.md, cambia lo que quieras, guarda. Los cambios toman efecto en la próxima conversación. Sin reinicios. Sin recompilaciones. Editas texto y el agente cambia.

Pasé la primera hora editando SOUL.md después de cada respuesta. "Muy formal." Cambio. "Demasiado largo." Cambio. Es un ciclo de iteración que se siente natural.

---

## Instalando tus primeros Skills

Tu agente ya funciona, pero de fábrica hace lo básico: conversar, leer archivos, escribir archivos. Para que haga cosas más interesantes, necesitas Skills.

**Qué son los Skills:**

Son archivos Markdown que le enseñan nuevas capacidades a tu agente. Piénsalos como recetas — instrucciones paso a paso para tareas específicas. Cada Skill en ClawHub es un servidor MCP por dentro, pero no necesitas saber eso para usarlos.

**ClawHub** es el marketplace. A abril de 2026 tiene miles de Skills — y sigue creciendo rápido. Los más populares:

- **Capability Evolver** (35K descargas) — hace que tu agente mejore sus propias habilidades con el tiempo
- **Gog** Google Workspace (14K descargas) — Gmail, Calendar, Drive
- **Document Summarizer** (10K descargas)

**Instalar un Skill:**

```bash
openclaw skill install capability-evolver
```

El Skill se descarga, se registra en tu workspace, y tu agente lo puede usar inmediatamente.

**Mi pack recomendado para empezar:**

1. Un Skill de búsqueda web
2. Un Skill de briefing diario
3. Un Skill de calendario (si usas Google Calendar o Outlook)

No instales todo de una vez. En serio. La tentación es enorme — miles de Skills y quieres probarlos todos. Pero empezar con demasiados Skills es confuso tanto para ti como para el agente. Agrega uno por semana.

**Crear tu propio Skill:**

```markdown
---
name: briefing-diario
description: Resumen matutino con clima, calendario y noticias
version: 1.0.0
---

## Briefing Diario

Al activarse, proveer:
1. Clima actual para la ubicación del usuario (ver USER.md)
2. Eventos del calendario de hoy
3. Top 3 noticias tech relevantes
4. Recordatorios pendientes

Formato: lista numerada concisa. Sin relleno.
```

Sin código. Sin compilación. Si sabes escribir un documento, puedes crear un Skill.

**Nota de seguridad:** audita los Skills antes de instalar. Lo de ClawHavoc — los 341 Skills maliciosos que se infiltraron en ClawHub — no fue broma. Lee el contenido del Skill, verifica quién lo publicó, busca reseñas. Trátalo como extensiones del navegador. Sé selectivo.

---

## MCP: Conectando con herramientas externas

MCP es el Model Context Protocol — el estándar que usan los agentes de IA para conectarse con herramientas y servicios externos. Es el puente. Tu agente habla MCP, las herramientas hablan MCP, y se entienden entre sí sin que escribas código de integración.

Para agregar servidores MCP directamente:

```bash
openclaw mcp add filesystem --path ~/Documents
openclaw mcp add github --token TU_GITHUB_TOKEN
```

El primer comando le da a tu agente acceso a tus documentos. El segundo lo conecta con tu cuenta de GitHub. Hay más de 1,000 servidores MCP comunitarios disponibles.

Voy a dejar esta sección corta a propósito. MCP merece su propio capítulo — y lo tiene más adelante en esta serie. Por ahora, el modelo mental es simple: MCP es la capa que conecta a tu agente con el mundo exterior.

Un consejo importante: sé selectivo. Cada servidor MCP que agregas expande lo que tu agente puede hacer — pero también expande la superficie de ataque. Agrega solo lo que realmente necesites.

---

## Errores comunes y consejos

Después de configurar mi agente y de leer decenas de hilos en Discord de gente que también estaba empezando, estos son los errores que más veo.

**No compliques el SOUL.md al principio.** Tres líneas están bien. El error más común entre gente nueva es escribir un SOUL.md de 200 líneas el primer día. El contexto innecesario confunde al modelo. Cometí exactamente este error — lo reduje a 5 líneas y todo mejoró.

**Seguridad básica que importa:**

- **Nunca pongas secretos en los archivos del workspace.** Ni API keys, ni contraseñas, ni tokens. Usa variables de entorno. Los archivos del workspace son texto plano.
- **No expongas el Gateway a internet sin autenticación.** El Gateway es el servicio que conecta los canales con tu agente. Si lo expones públicamente sin protección, cualquiera puede hablar con tu agente.
- **Audita los Skills antes de instalar.**

**La elección del modelo importa.** Los modelos más capaces — Claude 3.5 Sonnet, GPT-4o — son más resistentes a inyección de prompts y siguen mejor las instrucciones de SOUL.md. Los modelos económicos son más baratos pero más vulnerables. Peter lo resumió en una frase: *"Don't use cheap models"* ("No uses modelos baratos"). No estoy 100% de acuerdo en que sea siempre así — depende del caso de uso — pero para un agente con acceso a tus archivos y tus cuentas, tiene sentido gastar un poco más en un modelo que siga instrucciones de forma confiable.

**La lista de verificación para cuando "no funciona":**

1. ¿Está corriendo el daemon? `openclaw status`
2. ¿Node está actualizado? `node --version` — mínimo 22.16
3. ¿Es válida tu API key?
4. ¿Hay errores en el log del gateway? `openclaw logs`

Nueve de cada diez problemas que veo en Discord se resuelven con uno de estos cuatro pasos.

**Mantén MEMORY.md podado.** Revísalo cada mes. Borra lo que ya no sea relevante. Máximo unas 100 líneas.

---

## Lo que tienes ahora

Si seguiste todo el capítulo, ahora tienes algo que no existía hace seis meses — un agente de IA personal que es verdaderamente tuyo. No de OpenAI. No de Anthropic. No de Google. Tuyo. Corre en tu máquina, se comporta como tú le digas, y aprende de ti con el tiempo.

Qué experimentar esta semana:

- **Háblale todos los días durante una semana.** Deja que aprenda tus patrones. Las primeras respuestas van a ser genéricas — las de la segunda semana van a ser mucho mejores.
- **Agrega un Skill por semana** en vez de instalar todo de una vez.
- **Escribe una rutina de HEARTBEAT.md** para algo que realmente quieras automatizar. Algo pequeño. Un briefing matutino. Una verificación de disco. Empieza por algo que puedas verificar fácilmente.
- **Rompe cosas.** Edita SOUL.md con instrucciones contradictorias y mira qué pasa. Mientras más experimentes ahora, mejor vas a entender cómo funciona.

A seguir construyendo.

---

## Recursos

- [Documentación de OpenClaw](https://docs.openclaw.ai/) — Guías de instalación, referencia de API, y todo lo que necesitas para profundizar
- [OpenClaw en GitHub](https://github.com/openclaw/openclaw) — El repositorio del proyecto con 340K+ estrellas y 1,200+ contribuidores
- [ClawHub — Marketplace de Skills](https://clawhub.ai/) — El registro público de Skills comunitarios
- [MCP — Model Context Protocol](https://modelcontextprotocol.io/) — La especificación del protocolo que conecta agentes con herramientas externas
- [Avisos de seguridad de OpenClaw](https://github.com/openclaw/openclaw/security/advisories) — CVEs conocidos y parches
