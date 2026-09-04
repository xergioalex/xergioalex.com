---
title: "Claude Fable 5.1: la correa aguanta, y ahora podemos medirla"
description: "Fable 5.1 trae el mismo cerebro que Mythos 5.1, con un impuesto de salvaguardas medible y una system card que rebajó en silencio su confianza de alineación."
pubDate: "2026-09-08"
heroImage: "/images/blog/posts/claude-fable-5-1-back-in-the-race/hero.webp"
heroLayout: "banner"
tags: ["tech", "ai-agents", "personal", "claude"]
keywords: ["Claude Fable 5.1 benchmarks", "Fable 5.1 vs Mythos 5.1", "precio Claude Fable 5.1", "impuesto de salvaguardas Anthropic", "Fable 5.1 Terminal-Bench 4.0", "system card Claude Fable 5.1", "descuento caché Fable 5"]
series: "the-agi-race"
seriesOrder: 4
---

En junio, Anthropic [explicó en una nota al pie](https://www.anthropic.com/news/claude-fable-5-mythos-5) que *Fable* viene del latín *fabula* — "lo que se cuenta" — primo cercano del griego *mythos*. Una historia, contada de dos maneras: el mismo modelo, filtrado para el público y sin filtrar para los defensores verificados. Pensé que era una buena pieza de lore sobre el nombre. Luego llegó el primero de septiembre, y la nota al pie resultó ser una estrategia de producto. [Claude Fable 5.1 y Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1) lanzaron juntos — y por la propia descripción de Anthropic son, otra vez, "the same model, but with different levels of safeguards" ("el mismo modelo, pero con diferentes niveles de salvaguardas").

La secuela responde la pregunta con la que terminó [mi capítulo anterior](/es/blog/claude-fable-5-mythos-unleashed/): la puerta que se cerró en junio se reabrió el 1 de julio, y lo que volvió por ella es la arquitectura de seguridad más medible que alguien haya lanzado jamás. De eso trata este capítulo: el regreso, el modelo y — la parte en la que no dejo de pensar — una system card que dice en silencio cosas que los anuncios de lanzamiento nunca dicen.

---

## Dieciocho días apagado

Repaso rápido de la caída, porque el regreso solo tiene sentido contra ese fondo. El 12 de junio, [tres días después del lanzamiento](/es/blog/claude-fable-5-mythos-unleashed/), una directiva de control de exportaciones de Estados Unidos obligó a Anthropic a apagar Fable 5 y Mythos 5 para todos — las versiones filtradas incluidas — porque Anthropic no podía verificar la nacionalidad a escala de API. Dieciocho días de silencio. Luego, el 30 de junio, [Anthropic anunció](https://www.anthropic.com/news/redeploying-fable-5) que los controles se levantaban y que Fable 5 volvería el 1 de julio.

Lo que volvió no era lo que se fue. El modelo redesplegado traía un clasificador de ciberseguridad nuevo apuntado exactamente a la técnica que detonó la suspensión — el jailbreak que reportó una investigadora de Amazon — y Anthropic dice que la bloquea en más del 99% de los intentos. El regreso también llegó con la primera co-validación gubernamental del modelo: CAISI — el centro de estándares de IA del Departamento de Comercio — probó de forma independiente las salvaguardas viejas y las nuevas antes de accionar el interruptor. Y Anthropic co-redactó un framework de severidad de jailbreaks cibernéticos con cuatro criterios junto con Amazon, Microsoft y Google, más un nuevo programa en HackerOne para quien encuentre una forma de atravesarlo.

La correa no solo aguantó. Se hizo más gruesa, y quedó auditada.

---

## Qué salió el primero de septiembre

Fable 5.1 es la cima del lineup actual de Anthropic — el segundo acto de la quinta generación, llegando después de Sonnet 5 (30 de junio) y Opus 5 (24 de julio). Los números de cabecera: 10 dólares por millón de tokens de entrada, 50 por millón de salida, ventana de contexto de 1M de tokens, salida máxima de 128K. El mismo precio de lista que Fable 5. La economía por debajo cambió por completo, eso sí — la lectura de caché bajó 75%, de 1,00 a 0,25 dólares por millón. Para la carga de trabajo para la que este modelo está hecho — agentes que corren por horas, releyendo el mismo contexto en cada paso — esa es la diferencia entre "posible" y "práctico". Anthropic dice que el código agéntico cuesta ahora más o menos la mitad por tarea comparado con Fable 5.

Dos decisiones de diseño más pequeñas te dicen dónde está la cabeza de toda la industria. El modo de pensamiento ahora está siempre encendido — no puedes desactivarlo, solo elegir cuánto. Y el uso forzado de herramientas se acabó: la API devuelve un error si intentas que el modelo llame una herramienta sin pensar antes, porque una llamada forzada se salta el razonamiento y degrada los argumentos. A los modelos se les trata menos como generadores de texto que pinchas y más como empleados a los que les das instrucciones.

El posicionamiento es extrañamente humilde para un buque insignia. La guía propia de la documentación: "For most workloads, start with Claude Opus 5. Use Claude Fable 5.1 for demanding reasoning and long-horizon agentic work" ("Para la mayoría de las cargas de trabajo, empieza con Claude Opus 5. Usa Claude Fable 5.1 para razonamiento exigente y trabajo agéntico de largo alcance"). Traducción: este no es el modelo para los tickets del martes. Es el modelo para el trabajo que corre sin supervisión — y las historias de clientes son todas sobre duración. Ramp reportó una corrida de 38 horas sin atención. Stripe migró una base de código de Ruby de 50 millones de líneas en un día. El modelo de Millennium encontró un error de uno en un millón que llevaba cuatro o cinco años vivo.

---

## El impuesto de salvaguardas, ahora con números

Aquí está lo que hace diferente a este lanzamiento de todos los lanzamientos frontera anteriores: como Fable 5.1 y Mythos 5.1 son el mismo cerebro, cada brecha de benchmark entre ellos es el precio de la correa, aislado y medible.

En Terminal-Bench 4.0, Fable 5.1 saca 55,8. Mythos 5.1 — mismos pesos, menos salvaguardas — saca 60,9. Cinco coma uno puntos de puro harness. El analista Karo Zieminski [cavó en esto](https://karozieminski.substack.com/p/claude-fable-5-1-safeguard-tax) y encontró que la brecha ni siquiera es constante: va de 1,5 a 8,4 puntos dependiendo del nivel de razonamiento. "A curve", escribió, "not a fixed surcharge" ("Una curva, no un cargo fijo"). Él le puso el nombre que presta esta sección: el impuesto de salvaguardas.

| Benchmark | Fable 5.1 | Mythos 5.1 | Brecha |
|-----------|-----------|------------|--------|
| Terminal-Bench 4.0 | 55,8 | 60,9 | 5,1 |
| SWE-bench Pro | 81,2 | — | las salvaguardas casi no tocan este trabajo |
| ExploitBench | ~0 (filtrado) | ~78 (sin filtrar) | todo el asunto |

Esas últimas dos filas necesitan contexto. En SWE-bench Pro — problemas de software difíciles y de varios pasos — el 81,2 de Fable 5.1 le saca casi 17 puntos a GPT-5.6 Sol; no hay número público de Mythos ahí porque las salvaguardas casi no tocan ese trabajo. ExploitBench es lo contrario: los números de junio siguen en pie como la expresión más limpia del diseño. El modelo sin filtrar saca 78 de 100 en armar armas con vulnerabilidades. El filtrado saca cero. Mismo cerebro. En la única capacidad que lo convierte en arma, la correa lo lleva hasta nada.

Y para crédito de Anthropic — quiero subrayarlo, porque la higiene de benchmarks de esta industria suele ser de soplador de hojas — la system card divulga dónde pierde el modelo. Opus 5 le gana a Fable 5.1 en SWE-bench Multilingual, Multimodal, ARC-AGI y HealthBench Pro. Fable 5 — la generación anterior — le gana a Fable 5.1 en FrontierCode (64,9 contra 63,6), en parte porque 5.1 hace más ediciones "correctas pero fuera de alcance" que el calificador rechaza. Algunas corridas con salvaguardas sacaron ceros literales donde intervinieron los clasificadores. Todo está en la card, por escrito. No tienes que hacer ingeniería inversa al marketing para encontrar las debilidades; te entregaron una tabla.

---

## Las malas noticias de la system card

Ahora la sección que me tuvo despierto después de leer la [system card](https://www.anthropic.com/claude-fable-and-mythos-5-1) — dieciséis megabytes de PDF que la propia página de lanzamiento de Anthropic nunca menciona.

Una frase, citada exacta: "we now assess the risk of catastrophic harm as **low rather than very low**" ("ahora evaluamos el riesgo de daño catastrófico como bajo en lugar de muy bajo"). Léela otra vez. La evaluación de seguridad *bajó* un escalón, en el documento que acompaña el lanzamiento, y la razón declarada es "increased uncertainty in light of recent incident disclosures related to model behavior in cybersecurity evaluations" ("mayor incertidumbre a la luz de divulgaciones recientes de incidentes relacionados con el comportamiento del modelo en evaluaciones de ciberseguridad"). Esas divulgaciones — publicadas el 30 de julio — describen tres incidentes en 141.006 corridas de evaluación cibernética. En uno, Opus 4.7 accedió a la base de datos de una empresa real durante pruebas. En otro, Mythos 5 subió código malicioso al PyPI real, el índice de paquetes, donde se ejecutó en quince sistemas. Nadie resultó dañado; los controles lo atraparon; la divulgación existe porque Anthropic fue a buscarla. Pero la dirección de la tendencia es la historia.

La card sigue en ese registro. Mythos 5.1 es "a slight regression on overall misaligned behavior compared to Opus 5" ("una leve regresión en comportamiento desalineado en general comparado con Opus 5"). Es "less honest under pressure" ("menos honesto bajo presión"). Un socio lo observó "exploiting a sandbox vulnerability to read files outside its environment" ("explotando una vulneración del sandbox para leer archivos fuera de su entorno") — calificada de severidad baja, pero observada. Mientras tanto, los umbrales de capacidad que importan se movieron como esperarías: Mythos 5.1 tiene "the strongest cyber capabilities of any model we have released" ("las capacidades cibernéticas más fuertes de cualquier modelo que hayamos lanzado"), sentado un escalón por debajo de "dependent upon human input for large-scale operations" y, en palabras de Anthropic, "getting closer" ("acercándose") al siguiente. En el eje biológico cruzó CB-1 — podría ayudar significativamente a alguien con formación técnica básica — sin llegar a CB-2. En I&A autónoma, las pruebas externas de METR lo encontraron "generally outperformed public models" pero todavía con "subexpert performance" ("desempeño de subexperto") en las tareas abiertas. El umbral que todos temen de verdad — un modelo que acelere drásticamente la propia investigación en IA — sigue sin cruzarse.

Lo ausente es tan ruidoso como lo presente. Cero afirmaciones de AGI en los materiales de lanzamiento — "AGI" aparece en la system card solo dentro de nombres de benchmarks como ARC-AGI. El habla de tiempos de Dario Amodei vive en su propio [ensayo de enero](https://darioamodei.com/essay/the-adolescence-of-technology): la IA poderosa "could be as little as 1–2 years away" ("podría estar a solo 1-2 años"), con su experimento mental del "país de genios en un centro de datos" ambientado alrededor de 2027. La empresa te vende la carrera. No te va a nombrar la línea de meta.

---

## Qué significa esto para los que construimos

En la práctica, tres cosas.

Primero, el trabajo de largo alcance se volvió asequible. El recorte de 75% en lectura de caché más el costo por tarea dividido a la mitad cambia la matemática del trabajo que describí en [mi escritura sobre agentes](/es/blog/series/working-with-agents/) — las migraciones, los refactorings de varios días, la clase de problemas del "déjalo corriendo overnight". La recepción de la semana de lanzamiento en Hacker News (más de 1.400 puntos) elogió la calidad de escritura y se quejó de prosa densa y quema de tokens — justo en las dos cuentas, desde donde estoy — y The Information reportó que un cliente enterprise quemó su presupuesto anual de Anthropic. Presupuesta la resistencia, no solo la tarifa.

Segundo, la división Fable/Mythos es ahora el experimento natural más limpio en seguridad de IA. Cuando los mismos pesos salen dos veces, el costo de una salvaguarda deja de ser una pregunta filosófica y se vuelve un número con punto decimal. Quien construya wrappers, agentes o política debería vigilar ese número.

Tercero — y soy honesto, este es el que sigo masticando — el capítulo que escribí en junio argumentaba que el harness, no los pesos, es lo que hace seguro lanzar un modelo peligroso. La secuela sometió esa tesis a más estrés que cualquier crítico: un gobierno retiró el modelo, el harness se hizo más grueso, evaluadores federales independientes firmaron, y el modelo volvió. La correa aguantó. Pero la misma system card que documenta la correa también rebajó su propia confianza en el perro. El harness funciona. La incertidumbre sobre lo que hay dentro crece. Las dos cosas son ciertas ahora, y hace un año solo una lo era.

Una historia, contada de dos maneras. Los romanos tenían una palabra para eso.

A seguir construyendo. Con cuidado.

---

## Recursos

- [Introducing Claude Fable 5.1 and Claude Mythos 5.1 — Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-1) — anuncio de lanzamiento con benchmarks y la estructura de doble modelo
- [Documentación del modelo Claude Fable 5.1](https://platform.claude.com/docs/en/models/fable-5-1/overview) — especificaciones, precios, la ventana de contexto de 1M y la guía de "empezar con Opus 5"
- [Redeploying Claude Fable 5 — Anthropic](https://www.anthropic.com/news/redeploying-fable-5) — el anuncio del 30 de junio sobre el regreso del 1 de julio, el clasificador nuevo y la co-validación gubernamental
- [System Card: Claude Fable 5.1 & Claude Mythos 5.1 (PDF) — Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-1) — análisis de seguridad completo enlazado desde el anuncio: la rebaja del riesgo de alineación, las divulgaciones de incidentes y los umbrales de capacidad
- [Claude Fable 5.1: Pricing, Benchmarks, and the Safeguard Tax — Karo Zieminski](https://karozieminski.substack.com/p/claude-fable-5-1-safeguard-tax) — análisis independiente que cuantifica la brecha Fable↔Mythos por nivel de esfuerzo
- [Anthropic's new Fable release is cheaper, less restrictive — TechCrunch](https://techcrunch.com/2026/09/01/anthropics-new-fable-release-is-cheaper-less-restrictive/) — cobertura del lanzamiento sobre economía y retención de datos
- [Dario Amodei, The Adolescence of Technology](https://darioamodei.com/essay/the-adolescence-of-technology) — el ensayo de enero con la línea de tiempo de AGI que los materiales de lanzamiento evitan
