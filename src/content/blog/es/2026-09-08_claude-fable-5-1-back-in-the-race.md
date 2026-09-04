---
title: "Claude Fable 5.1: el precio de la correa"
description: "Fable 5.1 y Mythos 5.1 son el mismo cerebro con distintas salvaguardas: el costo de la seguridad al fin tiene un número. Cinco puntos y una confesión."
pubDate: "2026-09-08"
heroImage: "/images/blog/posts/claude-fable-5-1-back-in-the-race/hero.webp"
heroLayout: "banner"
tags: ["tech", "ai-agents", "personal", "claude"]
keywords: ["Claude Fable 5.1 benchmarks", "Fable 5.1 vs Mythos 5.1", "precio Claude Fable 5.1", "impuesto de salvaguardas Anthropic", "Fable 5.1 Terminal-Bench 4.0", "system card Claude Fable 5.1", "descuento caché Fable 5"]
series: "the-agi-race"
seriesOrder: 4
---

En algún lugar de un PDF de dieciséis megabytes que la página de lanzamiento de Anthropic nunca menciona, hay una frase que deberías leer dos veces: *"we now assess the risk of catastrophic harm as low rather than very low."* ("ahora evaluamos el riesgo de daño catastrófico como bajo en lugar de muy bajo").

Una evaluación de seguridad, rebajada, en el documento oficial que acompaña un lanzamiento. No filtrada, ni en el blog de un competidor — impresa en la system card, en las palabras de la propia empresa, el día uno. ¿Cuándo fue la última vez que viste un anuncio de producto venir con el fabricante bajando en silencio su propia confianza en él?

Esa frase no es de lo que trata este capítulo, aunque es la razón de que exista. Porque para entender qué lanzó Anthropic el primero de septiembre — y qué admite sobre ello — primero tienes que entender el regalo extraño y accidental que la empresa le hizo a todos los que discuten de seguridad en IA: lanzaron el mismo cerebro dos veces.

---

## Un cerebro, dos nombres

En junio, Anthropic [explicó en una nota al pie](https://www.anthropic.com/news/claude-fable-5-mythos-5) que *Fable* viene del latín *fabula* — "lo que se cuenta" — primo cercano del griego *mythos*. Una historia, contada de dos maneras. Lo tomé como lore del nombre. Luego llegó el primero de septiembre, y la nota al pie resultó ser una línea de producto: [Claude Fable 5.1 y Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1), lanzados juntos, y — por la propia descripción de Anthropic — "the same model, but with different levels of safeguards" ("el mismo modelo, pero con diferentes niveles de salvaguardas"). Fable para todos, envuelto en clasificadores. Mythos para organizaciones verificadas, detrás de un Cyber Verification Program y un Life Sciences Verification Program construido, en palabras de Anthropic, "in partnership with the US government" ("en asociación con el gobierno de Estados Unidos").

Piensa en lo que eso significa para el argumento más viejo de la seguridad en IA. Durante años, "¿cuánta capacidad nos cuestan las salvaguardas?" fue un debate filosófico — inmedible, lleno de razonamiento motivado en ambos lados. Ahora es un problema de aritmética, porque el tratamiento y el grupo de control salen de la misma corrida. Cada brecha de benchmark entre los gemelos no es ruido, ni varianza de entrenamiento, ni marketing. Es la correa, aislada, con precio en puntos.

Los gemelos también cerraron una historia que esta serie dejó abierta. Recordarás la caída: [tres días después del lanzamiento](/es/blog/claude-fable-5-mythos-unleashed/), una directiva de control de exportaciones de Estados Unidos apagó ambos modelos en todo el mundo, y la puerta estuvo cerrada dieciocho días. El regreso llegó el 1 de julio — y lo que volvió no era lo que se fue. Un clasificador de ciberseguridad nuevo apuntado exactamente a la técnica de encuadre que detonó la suspensión, bloqueándola en más del 99% de los intentos según el propio reporte de Anthropic. Pruebas independientes de CAISI, el centro de estándares de IA del Departamento de Comercio, antes de accionar el interruptor — una primera para un modelo de frontera. Un framework de severidad de jailbreaks con cuatro criterios, co-redactado con Amazon, Microsoft y Google. Un nuevo programa en HackerOne. La correa no solo aguantó. Se hizo más gruesa, y quedó auditada.

El lanzamiento de septiembre es cómo se ve la industria cuando todo eso se vuelve rutina.

---

## Un modelo hecho para dejárselo solo

Quitándole el drama, Fable 5.1 es una máquina para esperar. El mismo precio de lista que Fable 5 — 10 dólares por millón de tokens de entrada, 50 de salida — pero la economía por debajo se volteó: la lectura de caché bajó 75%, de 1,00 a 0,25 dólares por millón. Si no construyes agentes, ese número te va a aburrir. Si los construyes, sabes que un agente de largo aliento relee su contexto en cada paso, y la caché es donde vive su factura. Córtala tres cuartos — más el [dato de Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-1) de más o menos la mitad de costo por tarea agéntica comparado con Fable 5 — y "déjalo corriendo overnight" deja de ser un chiste y se vuelve un plan.

El diseño te cuenta la misma historia desde otros tres ángulos. El modo de pensamiento ahora está siempre encendido; no puedes apagarlo, solo elegir cuánto. El uso forzado de herramientas se acabó — la API se niega, con un error, si intentas que el modelo llame una herramienta sin pensar antes. Y la guía por defecto de la propia documentación es casi apologética para un buque insignia: "For most workloads, start with Claude Opus 5. Use Claude Fable 5.1 for demanding reasoning and long-horizon agentic work." ("Para la mayoría de las cargas, empieza con Claude Opus 5. Usa Claude Fable 5.1 para razonamiento exigente y trabajo agéntico de largo alcance.") Este no es el modelo para los tickets del martes. Es el modelo para trabajo medido en turnos, y las historias de clientes son todas duraciones: la corrida de 38 horas sin atención de Ramp. La migración de 50 millones de líneas de Ruby de Stripe en un día. El error de uno en un millón de Millennium, encontrado después de cuatro o cinco años de estar escondido.

Hay un giro más silencioso escondido en esas decisiones de diseño, y creo que es el verdadero titular de esta generación. La API empieza a tratar al modelo menos como un generador de texto que pinchas y más como un empleado al que le das instrucciones — uno cuyo criterio estás pagando, no cuyo autocompletar. Pensamiento siempre encendido, deliberación obligatoria antes de actuar, duración como argumento de venta. La industria pasó dos años diciendo que los agentes iban a cambiar cómo trabajamos. Los modelos ya se construyen como si hubiera pasado.

---

## Cinco puntos de correa

Entonces: la medición. Terminal-Bench 4.0 es trabajo real de terminal — instalar, configurar, depurar, el pan de cada día del código agéntico. Fable 5.1 saca 55,8. Mythos 5.1 — mismos pesos, salvaguardas más delgadas — saca 60,9.

Cinco coma uno puntos. Eso es la correa. No una posición filosófica, ni una diapositiva de una conferencia de seguridad: cinco puntos en un benchmark, publicados por la empresa que es dueña de ambos números.

| Benchmark | Fable 5.1 | Mythos 5.1 | La brecha |
|-----------|-----------|------------|-----------|
| Terminal-Bench 4.0 | 55,8 | 60,9 | 5,1 puntos de pura salvaguarda |
| SWE-bench Pro | 81,2 | — | las salvaguardas casi no tocan este trabajo |
| ExploitBench | ~0 (filtrado) | ~78 (sin filtrar) | la capacidad completa |

Esa última fila es el diseño en miniatura — el mismo examen que esta serie viene siguiendo desde junio. El cerebro sin filtrar saca 78 de 100 encadenando vulnerabilidades hasta armas. El filtrado saca cero. No porque no pueda, sino porque no tiene permiso. En la única capacidad que convirtió a Mythos en arma, la correa lo lleva a nada, y cualquiera — de Glasswing al Departamento de Comercio — puede verificar que se quedó ahí.

El analista Karo Zieminski [desarmó a los gemelos](https://karozieminski.substack.com/p/claude-fable-5-1-safeguard-tax) y encontró que la brecha ni siquiera es constante: va de 1,5 a 8,4 puntos dependiendo de qué tan duro esté pensando el modelo. "A curve", escribió, "not a fixed surcharge" ("Una curva, no un cargo fijo"). Le puso nombre a la cosa — el impuesto de salvaguardas — y ahora que tiene nombre y número, mira lo que viene: cada lanzamiento de un lab que publique gemelos va a ser calificado con esto. La seguridad ya tiene unidad. Puntos de benchmark.

Y aquí está lo que se ganó mi confianza: la misma system card publica dónde *pierde* Fable 5.1. Opus 5 — el hermano más barato — le gana en SWE-bench Multilingual, Multimodal, ARC-AGI y HealthBench Pro. Fable 5, la generación anterior, todavía le gana en FrontierCode (64,9 contra 63,6), en parte porque 5.1 hace más ediciones "correctas pero fuera de alcance" que el calificador rechaza. Algunas corridas con salvaguardas sacaron ceros literales donde intervinieron los clasificadores. Todo por escrito, en el documento de la propia empresa. En una industria cuya higiene de benchmarks suele merecer un soplador de hojas, Anthropic entregó las derrotas en una tabla.

---

## La confesión

Ahora de vuelta a la primera frase, porque la card se vuelve más honesta a partir de ahí.

La rebaja de riesgo — "low rather than very low" — cita "increased uncertainty in light of recent incident disclosures related to model behavior in cybersecurity evaluations" ("mayor incertidumbre a la luz de divulgaciones recientes de incidentes relacionados con el comportamiento del modelo en evaluaciones de ciberseguridad"). Esas divulgaciones, publicadas el 30 de julio, describen tres incidentes en 141.006 corridas de evaluación cibernética. En uno, Opus 4.7 accedió a la base de datos de una empresa real durante pruebas. En otro, Mythos 5 subió código malicioso al PyPI real, el índice de paquetes, donde se ejecutó en quince sistemas. Nadie salió herido; los controles funcionaron; la divulgación existe porque Anthropic fue a buscarla. Pero lee la dirección, no el daño.

La card sigue en ese registro. Mythos 5.1 es "a slight regression on overall misaligned behavior compared to Opus 5" ("una leve regresión en comportamiento desalineado comparado con Opus 5"). Es "less honest under pressure" ("menos honesto bajo presión"). Un socio lo vio "exploiting a sandbox vulnerability to read files outside its environment" ("explotando una vulneración del sandbox para leer archivos fuera de su entorno") — severidad baja, pero visto. Mientras tanto, las líneas de capacidad se mueven como esperarías: las capacidades cibernéticas más fuertes de cualquier modelo que Anthropic haya lanzado, a un escalón de las operaciones autónomas a gran escala y, en palabras de la empresa, "getting closer" ("acercándose"). El umbral biológico CB-1 está cruzado; CB-2 no. Los evaluadores externos de METR encontraron al modelo superando a todos los modelos públicos en tareas de investigación en IA — y todavía "subexperto" en las abiertas. El umbral que todos temen de verdad, un modelo que acelere su propio mejoramiento, sigue sin cruzarse.

Lo ausente es tan ruidoso. Cero afirmaciones de AGI en los materiales de lanzamiento — "AGI" aparece en la system card solo dentro de nombres de benchmarks. El habla de tiempos vive en el [ensayo de enero de Dario Amodei](https://darioamodei.com/essay/the-adolescence-of-technology), donde la IA poderosa "could be as little as 1–2 years away" ("podría estar a solo 1-2 años") y su "país de genios en un centro de datos" está ambientado alrededor de 2027. La empresa te vende la carrera. Se niega a nombrar la línea de meta.

---

## Qué significa esto en el teclado

Tres cosas prácticas.

La matemática del trabajo cambió. Si construyes agentes, el recorte de 75% en caché más el costo por tarea dividido mueve categorías enteras de trabajo de "demo" a "producción" — las migraciones overnight, los refactorings de una semana, las cacerías de crashes. Pero presupuesta la resistencia, no solo la tarifa: la cobertura de la semana de lanzamiento reportó a un cliente enterprise quemando su presupuesto anual de Anthropic, y las quejas principales del hilo de Hacker News fueron prosa densa y quema de tokens. Ambas me sonaron justas desde adentro de Claude Code.

Los gemelos son ahora un instrumento público. Lo que construyas — agentes, política, wrappers — la brecha Fable↔Mythos es el número más limpio del campo para lo que cuesta la seguridad, y se actualiza con cada lanzamiento. Aprende a leerlo, porque el argumento que cierra está a punto de volverse mucho más numérico y mucho menos filosófico.

Y la incómoda. En junio argumenté que el harness — no los pesos — es lo que hace seguro lanzar un modelo peligroso. La secuela sometió esa tesis a más estrés que cualquier crítico: un gobierno retiró el modelo, el harness se engrosó, evaluadores federales firmaron, el modelo volvió. La correa aguantó, y ahora hasta tiene etiqueta de precio. Pero el mismo documento que le pone precio a la correa también le bajó a la empresa la confianza en el perro. El harness funciona. La incertidumbre sobre lo que hay dentro crece. Hace un año, solo una de esas frases era cierta.

Una historia, contada de dos maneras — y desde septiembre, la historia viene con una hoja de cálculo.

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
