---
title: "Claude Fable 5: El modelo que no querían liberar ahora está en tus manos"
description: "Hace dos meses, Anthropic dijo que un modelo era demasiado peligroso para liberarlo. Hoy lo liberaron — mismos pesos, distinto nombre, con una capa de seguridad que cambia la ecuación."
pubDate: "2026-06-09"
heroImage: "/images/blog/posts/claude-fable-5-mythos-unleashed/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "personal", "claude"]
keywords: ["Claude Fable 5 lanzamiento", "Claude Mythos 5 público", "Anthropic Fable 5 capacidades", "Project Glasswing actualización 2026", "modelo Mythos disponible al público", "clasificadores de seguridad IA"]
---

Hace dos meses escribí sobre [un modelo demasiado peligroso para ser liberado](/blog/claude-mythos-the-model-too-dangerous-to-release/). Anthropic había construido algo que encontraba miles de fallas de seguridad desconocidas en todos los sistemas operativos principales. Armaron una coalición de cien millones de dólares, restringieron el acceso a cincuenta socios, y dijeron que lo responsable era mantenerlo bajo llave. Ese post terminaba con "esto es solo el principio."

Sesenta y tres días después — hoy — [Anthropic liberó ese modelo](https://www.anthropic.com/news/claude-fable-5-mythos-5). Mismos pesos. Misma arquitectura. El mismo cerebro que encontró un bug de 28 años en OpenBSD por cincuenta dólares. Le pusieron Claude Fable 5, le agregaron un conjunto de clasificadores de seguridad, y lo metieron en la API para cualquiera con una tarjeta de crédito. El modelo demasiado peligroso para ser liberado es el modelo con el que puedes hablar ahora mismo.

Quiero entender cómo pasamos de "demasiado peligroso para cualquiera" a "disponible en todos lados hoy" en dos meses. Y quiero entender qué significa.

---

## Qué cambió

La respuesta corta: el harness cambió. El modelo no.

Entre abril y hoy, pasaron tres cosas. Primero, [Project Glasswing se expandió](https://www.anthropic.com/news/expanding-project-glasswing). Los cincuenta socios iniciales crecieron a unas doscientas organizaciones en más de quince países. Compañías de energía, utilidades de agua, sistemas de salud, fabricantes de hardware — el tipo de infraestructura de la que mucha gente depende sin pensarlo. En esos dos meses, los socios de Glasswing [encontraron más de diez mil](https://www.anthropic.com/news/expanding-project-glasswing) fallas de seguridad de severidad alta o crítica. Diez mil. El modelo haciendo exactamente lo que lo construyeron para hacer — encontrar los bugs antes de que alguien más los encuentre.

Segundo, Anthropic construyó la capa de seguridad. [Más de mil horas de pruebas externas de jailbreak](https://www.anthropic.com/news/claude-fable-5-mythos-5), ningún bypass universal encontrado. Desarrollaron clasificadores que detectan cuando una consulta toca ciberseguridad, biología, química o destilación de modelos, y cuando uno se activa, la respuesta viene de Claude Opus 4.8 en su lugar. No es un rechazo — es una degradación elegante a un modelo todavía capaz. El usuario no se choca contra una pared. Recibe una respuesta un poco menos potente.

Tercero — y esta es la parte que hace que todo encaje — midieron qué tan seguido se activan los clasificadores. [Menos del cinco por ciento de las sesiones](https://www.anthropic.com/news/claude-fable-5-mythos-5). Más del noventa y cinco por ciento del tiempo, estás recibiendo capacidad completa de clase Mythos sin nada entre tú y el modelo. La correa casi no está ahí.

Los nombres cuentan la historia. Anthropic [anota al pie](https://www.anthropic.com/news/claude-fable-5-mythos-5) que *Fable* viene del latín *fabula* — "lo que se cuenta" — análogo al griego *mythos*. Misma historia, diferente manera de contarla. Mismo modelo, diferente harness. Un nombre para la versión restringida que usan los ciberdefensores. Otro para la versión que recibe todo el mundo. CyberScoop [lo llamó](https://cyberscoop.com/anthropic-claude-fable-5-release-mythos-guardrails/) "Mythos on a leash" (Mythos con correa), y honestamente, es el resumen más preciso de dos palabras que he visto.

---

## Qué puede hacer

No voy a listar benchmarks. Pero algunas cosas que reportaron las empresas durante las pruebas tempranas merecen un momento.

Stripe tomó un codebase de cincuenta millones de líneas en Ruby e [hizo una migración completa en un día](https://www.anthropic.com/news/claude-fable-5-mythos-5). Su equipo estimó que la misma migración les habría tomado más de dos meses a mano. El CEO de Cursor dijo que Fable 5 [abrió "una clase de problemas de largo horizonte que estaban fuera de alcance para modelos anteriores."](https://www.anthropic.com/news/claude-fable-5-mythos-5) Uno de los socios internos de Anthropic reportó que en investigación de física de frontera, Fable 5 [llegó a resultados en 36 horas](https://www.anthropic.com/news/claude-fable-5-mythos-5) que GPT-5.5 alcanzó después de cuatro días — usando un tercio de los tokens de razonamiento.

En un benchmark que a mí sí me importa — [SWE-bench Pro](https://www.digitalapplied.com/blog/claude-fable-5-mythos-5-release-benchmarks-2026), que le tira problemas de software difíciles y de múltiples pasos a los modelos — Fable 5 saca 80.3%. Opus 4.8 saca 69.2%. GPT-5.5 aterriza en 58.6%. Eso no es una ventaja incremental. Es una brecha donde el modelo está resolviendo problemas que los otros no pueden.

Y después está lo de Pokémon. Los modelos anteriores de Claude [no podían pasar Pokémon FireRed](https://www.anthropic.com/news/claude-fable-5-mythos-5) ni siquiera con un sistema elaborado de ayuda que les daba mapas, herramientas de navegación e información extra del estado del juego. Fable 5 terminó el juego con nada más que capturas de pantalla crudas — una configuración mínima, solo visión. Suena a benchmark de juguete hasta que te das cuenta de lo que realmente está probando: razonamiento autónomo sostenido a través de cientos de decisiones secuenciales, sin andamiaje al cual agarrarse.

Esa última parte es lo que importa en la práctica. No es que el modelo sea más inteligente en ningún paso individual. Es que mantiene la coherencia durante horizontes más largos sin desviarse.

---

## La parte personal

Voy a ser directo con algo: este post se está escribiendo con la ayuda de Claude Fable 5. Escribí sobre Mythos estando bajo llave. Ahora estoy escribiendo `claude-fable-5` en mis llamadas a la API. Eso pasó en dos meses.

La experiencia es notoriamente diferente a Opus 4.8. No en la forma obvia de "más inteligente" — más en el sentido de que estoy interviniendo menos. Corridas autónomas más largas antes de que algo se desvíe. Menos momentos en los que necesito corregir el rumbo porque el modelo perdió el hilo de lo que estaba haciendo. Más confianza en dejarlo correr sin estar leyendo por encima de su hombro cada pocos minutos.

Creo que la descripción honesta es que el modelo cruzó un umbral donde mi rol cambió. Con Opus estaba revisando. Con Fable estoy aprobando. La diferencia suena pequeña hasta que notas que libera un tipo distinto de atención.

---

## Qué significa todo esto

Esto es lo que me ha estado dando vueltas en la cabeza desde que salió el anuncio esta mañana.

El mismo modelo es el arma y la herramienta. La inteligencia que encontró miles de zero-days es la misma inteligencia que migra un codebase de cincuenta millones de líneas. El cerebro que podía encadenar cuatro vulnerabilidades separadas hasta tomar control total de un sistema es el mismo cerebro que mantiene coherencia a través de cientos de decisiones de código. Las capacidades de seguridad y las capacidades generales no son cosas separadas. Son la misma cosa — razonamiento autónomo profundo — apuntado en diferentes direcciones.

La única diferencia entre el modelo demasiado peligroso para liberar y el modelo que puedes usar ahora mismo es el sistema envuelto alrededor de él. No los pesos. No el entrenamiento. El harness.

Eso valida algo a lo que sigo volviendo en [esta serie](/blog/the-harness-layer/). El modelo ya no es donde vive el valor. El sistema alrededor del modelo es. Anthropic acaba de probarlo a la escala más grande imaginable: puedes tomar el modelo más peligroso jamás construido y hacerlo seguro para uso general construyendo un mejor harness. El modelo no cambió. Todo lo que está alrededor de él sí.

---

## El movimiento de negocio

Estaría ignorando algo si no notara el timing. Anthropic [presentó confidencialmente su prospecto de IPO](https://www.cnbc.com/2026/06/02/anthropic-mythos-ai-project-glasswing.html) la misma semana que expandieron Glasswing. Una semana después liberan el modelo al público. Lo pusieron a [$10 por millón de tokens de entrada y $50 por millón de salida](https://www.anthropic.com/news/claude-fable-5-mythos-5) — menos de la mitad de lo que costaba Mythos Preview. Está [disponible en AWS Bedrock](https://aws.amazon.com/blogs/aws/anthropic-claude-fable-5-on-aws-mythos-class-capabilities-with-built-in-safeguards-now-available/), [GitHub Copilot](https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/), Vertex AI y Microsoft Foundry desde el día uno.

Eso no es distribución cautelosa. Es máximo alcance en el primer día. Pasaron de "nadie puede tener esto" a "todo el mundo puede tener esto en todas las plataformas" en sesenta y tres días. La capa de seguridad no solo resolvió un problema técnico. Resolvió un problema de negocio.

Y hay una pregunta más difícil debajo: ¿qué significa que ahora puedes rentar el modelo más capaz jamás construido por diez dólares por millón de tokens? La asimetría que hacía a Mythos aterrador — una IA encontrando vulnerabilidades críticas por cincuenta dólares — no desaparece porque el modelo cambió de nombre. Solo significa que la misma asimetría ahora aplica a todos los problemas, no solo a seguridad. El costo de resolver problemas difíciles con modelos de IA se redujo a la mitad en dos meses.

---

## Qué viene después

No lo sé. Y quiero ser honesto con esa incertidumbre en lugar de cerrar con una predicción segura.

Lo que sí sé: en abril, un modelo que era demasiado poderoso para liberar existía detrás de una puerta cerrada. En junio, ese modelo está corriendo en mi máquina. La brecha entre "capacidad de frontera" y "disponible al público" se comprimió de años a meses. Si Fable 5 es lo que pasa cuando construyes una capa de seguridad alrededor de Mythos Preview, ¿qué pasa cuando llega el siguiente modelo de clase Mythos y la capa de seguridad ya está construida?

El ritmo no se ha frenado. Si acaso, hoy prueba que es más rápido de lo que mapeé [hace cinco meses](/blog/from-programmer-to-orchestrator/). La revolución que llamé "silenciosa" sigue haciéndose más fuerte.

Sigamos construyendo.

---

## Recursos

- [Claude Fable 5 and Claude Mythos 5 — Anthropic](https://www.anthropic.com/news/claude-fable-5-mythos-5) — Anuncio oficial de lanzamiento con benchmarks, salvaguardas y detalles de disponibilidad
- [Expanding Project Glasswing — Anthropic](https://www.anthropic.com/news/expanding-project-glasswing) — Expansión de junio a 150 organizaciones en más de 15 países
- [Claude Fable 5 on AWS — AWS News Blog](https://aws.amazon.com/blogs/aws/anthropic-claude-fable-5-on-aws-mythos-class-capabilities-with-built-in-safeguards-now-available/) — Disponibilidad en Bedrock y detalles de integración
- [Claude Fable 5 for GitHub Copilot — GitHub Changelog](https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/) — Integración con Copilot y política de retención de datos
- [Anthropic's new model is Mythos on a leash — CyberScoop](https://cyberscoop.com/anthropic-claude-fable-5-release-mythos-guardrails/) — Análisis de seguridad de la arquitectura de salvaguardas
- [Claude Fable 5 & Mythos 5: The Frontier, Split in Two — Digital Applied](https://www.digitalapplied.com/blog/claude-fable-5-mythos-5-release-benchmarks-2026) — Comparación detallada de benchmarks entre modelos de frontera
- [Claude API Models Overview — Anthropic Docs](https://platform.claude.com/docs/en/about-claude/models/overview) — Especificaciones técnicas, precios e identificadores de API
