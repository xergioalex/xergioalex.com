---
title: 'Jev: el modelo que toma decisiones en lugar de texto'
description: 'Un modelo que no genera texto resolvió 15 decisiones de soporte en 2.5 segundos por centésimas de centavo. Corrí los experimentos y monté un laboratorio.'
pubDate: '2026-09-19'
heroImage: '/images/blog/posts/jev-decisions-instead-of-text/hero.webp'
heroLayout: 'side-by-side'
tags: ['portfolio', 'tech', 'ai', 'ai-agents', 'javascript', 'python']
keywords: ['qué es jev typesafe', 'modelo de ia que no genera texto', 'jev system one modelo', 'árboles de decisión con ia baratos', 'api noul choice score', 'jev vs llm diferencias', 'enrutamiento con ia barata']
author: 'sergio-florez'
---

El 15 de septiembre, una startup llamada TypeSafe lanzó Jev, un modelo con una restricción inusual: no puede generar texto. Lee un estado —un ticket de soporte, un correo, un documento—, responde un conjunto de preguntas tipadas sobre él y devuelve números: una elección, una puntuación, una probabilidad. Ese es el producto completo. Cuando el lanzamiento provocó comparaciones como *"LLMs to Jev is like CPU to GPU moment"* ("De los LLMs a Jev es como el momento CPU a GPU", Sayed Allam), y el hilo de Hacker News acumuló 1,900 puntos, la pregunta razonable es de qué va tanto ruido.

Porque sobre el papel hay muy poco aquí. Leer contexto y responder preguntas de selección múltiple es el trabajo menos glamoroso del aprendizaje automático — un clasificador zero-shot, como lo resumió más de un comentarista. Lo interesante es lo que hay debajo: una arquitectura no autorregresiva que emite todas las probabilidades en paralelo, un objetivo de entrenamiento construido para incertidumbre calibrada en lugar de prosa persuasiva, y un precio —$42 por mil millones de tokens, salida gratis— que solo funciona si toda la pila es genuinamente diferente. La distancia entre lo que Jev parece ser y lo que toma construirlo es la historia real.

Así que hice lo que hice en marzo con [PreTeXt](/es/blog/pretext-programmable-text-layout/), otro lanzamiento que parecía trivial hasta que dejó de serlo: leí la documentación completa y luego apunté mi terminal a la API en vivo a correr mis propios números en lugar de citar los de ellos. Seis experimentos y un laboratorio de 16 módulos después —ambos abiertos como [jev-lab](https://github.com/xergioalex/jev-lab)— tengo una respuesta defendible, y empieza con la honestidad de TypeSafe. Su post de lanzamiento nombra los sesgos de sus benchmarks; su documentación incluye una página que enumera exactamente en qué es malo el modelo.

---

## La idea completa, en un párrafo

Jev es un modelo "System One", nombrado así por el pensamiento rápido e intuitivo de Kahneman. Le envías dos cosas: un **estado** (cualquier texto o JSON — un ticket de soporte, un correo, una cláusula de contrato) y una lista de **preguntas** tipadas. Devuelve respuestas tipadas. Eso es todo. Sin texto generado, nada que parsear. De la [documentación](https://docs.typesafe.ai/introduction): *"No text generation, no parsing. You get typed values and probability distributions that your code can branch on, sort by, and route with."* ("Sin generación de texto ni parsing. Recibes valores tipados y distribuciones de probabilidad con las que tu código puede ramificar, ordenar y enrutar.")

Hay exactamente tres tipos de pregunta:

| Tipo | Pregunta | Devuelve |
|------|----------|----------|
| **Choice** | ¿Cuál opción es? | `choice`, `probabilities`, `confidence` |
| **Score** | Califícalo de 0–3 en esta rúbrica | `score`, `probabilities`, `confidence` |
| **Noul** | ¿Esto es cierto? (0–1) | `noul` |

"Noul" es su palabra para el chequeo instintivo de sí/no — la probabilidad de que la respuesta sea sí. Aquí va una llamada real con el SDK de JavaScript:

```javascript
import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const response = await client.systemOne({
  state: { ticket: "I was charged twice for order A-104. Refund the duplicate, this is urgent." },
  questions: {
    department: choice("Which team should handle this?", {
      billing: "Charges, invoices, refunds, payment problems",
      technical: "Bugs, crashes, errors, integration",
      orders: "Delivery, shipping, tracking, cancellations",
    }),
    urgent: noul("Does the message express that the matter cannot wait until the next business day?"),
    frustration: score("How frustrated does the customer appear?", [
      "0: calm or neutral", "1: mildly annoyed", "2: frustrated", "3: angry or threatening",
    ]),
  },
});

response.answers.department.choice        // "billing"
response.answers.department.confidence    // 1.0
response.answers.urgent.noul              // 0.96
response.answers.frustration.score        // 2.0
```

<figure>
  <img src="/images/blog/posts/jev-decisions-instead-of-text/diagram-01.webp" alt="Diagrama del flujo de Jev: un documento de estado y burbujas de preguntas alimentan carriles de evaluación paralela, que producen fichas de respuesta choice, score y noul con distribuciones de probabilidad" loading="lazy" width="1200" height="675" />
  <figcaption>El flujo completo: un estado y muchas preguntas entran, respuestas tipadas con distribuciones salen — una sola llamada.</figcaption>
</figure>

Las tres preguntas viajan en una sola llamada. Cada una se evalúa **en paralelo y en aislamiento** contra el mismo estado — la pregunta 12 nunca ve la respuesta de la 11, así que no hay pudrición de contexto cuando la lista crece. Las respuestas las combinas en tu propio código: `if urgent AND refund → priority lane`.

---

## La parte vergonzosamente simple

Cada ingrediente de esto existía antes del 15 de septiembre. Los LLMs exponen logprobs. "Clasificador zero-shot" es una idea de hace décadas (un comentarista en Hacker News le llamó a Jev exactamente eso, y no estaba equivocado). Routers, guardrails, puntuaciones semánticas — la gente lleva años forzando modelos con forma de GPT a emitir JSON, y luego validando, reintentando y pagando la factura.

La gracia es que TypeSafe lo sabe. Su [post de lanzamiento](https://typesafe.ai/blog/introducing-system-one-models-and-jev) describe a Jev como *"a frontier-intelligence function call: unstructured state in, typed probabilistic decisions out."* ("Una llamada a función con inteligencia de frontera: estado no estructurado entra, decisiones probabilísticas tipadas salen"). El modelo es **no autorregresivo** — emite todas las probabilidades en paralelo en vez de generar token a token — y está entrenado con algo que llaman RLCD (aprendizaje por refuerzo para decisiones calibradas) en lugar del RLHF que hace que los chatbots suenen seguros. El fundador, Diogo Almeida, co-inventó RLHF en OpenAI y luego pasó dos años en modo sigiloso construyendo la versión que optimiza para *calibración* en vez de *sonar seguro*. Cuando algo así viene de la persona que inventó lo que está reemplazando, me presta atención.

Y está el nombre. Jev, por la **paradoja de Jevons** — la observación de 1865 de que abaratar el carbón hizo que el consumo de carbón subiera, porque la eficiencia genera demanda. Esa es toda la apuesta de negocio, impresa en el nombre del modelo: creen que la inteligencia está a punto de volverse tan barata que la demanda explotará. La meta declarada de TypeSafe es una "relación inteligencia-velocidad-costo mayor a 100×".

Lo que nos lleva a los números.

---

## Así que corrí los números

Todo en esta sección es reproducible: cada script, cada salida cruda y cada gráfico viven en [jev-lab](https://github.com/xergioalex/jev-lab), el laboratorio que construí mientras escribía este post.

Sus benchmarks —40–200x más rápidos que LLMs de frontera— se califican a sí mismos. Su propio post lo admite, lo cual respeto; también es la razón por la que no cito esas cifras. Medí lo que podía medir yo mismo: mi portátil, la API en vivo, scripts publicados. El precio es público: **$42 por mil millones de tokens de entrada, salida gratis**. Mi primera llamada de prueba consumió 370 tokens de entrada. Eso son $0.0000155.

**Experimento 1 — ¿la latencia es realmente plana?** La documentación dice que agregar preguntas casi no cambia el tiempo de respuesta. Le lancé hasta 64 preguntas a un solo ticket de soporte:

<figure>
  <img src="/images/blog/posts/jev-decisions-instead-of-text/chart-e1-latency.svg" alt="Gráfico de línea que muestra la latencia de Jev plana alrededor de 500ms mientras el número de preguntas crece de 1 a 64" loading="lazy" width="720" height="400" />
  <figcaption>De 1 a 64 preguntas en una sola llamada: 502ms → 518ms. El p95 (línea punteada) sube una vez a 755ms y fue mi red, no el modelo.</figcaption>
</figure>

Sesenta y tres preguntas extra costaron dieciséis milisegundos. Esa es la afirmación de "paralelo y aislado", verificada — y es la llave de todo lo que viene abajo.

**Experimento 2 — las mismas decisiones, Jev contra un LLM real.** Cinco tickets de soporte, tres decisiones cada uno (enrutar el ticket, si es urgente, qué tan frustrado está el cliente). Jev respondió con una llamada por ticket. Grok 4.3 respondió con 15 llamadas secuenciales usando un prompt estricto de JSON — como hacen el enrutamiento la mayoría de agentes hoy.

Jev: 2.5 segundos en total, 2,381 tokens, $0.0001, **5/5 correctas**. Grok: 75 segundos, ~5,000 tokens, 2/5 en mi prueba estricta de los-tres-campos (en el enrutamiento también acertó 5/5 — los fallos fueron urgencia y bandas de frustración). Mismo juez, mismos tickets.

Ahora la parte que casi no escribo. Mi **primera** corrida de Jev sacó 1/5. El error era mío: había preguntado *"Does the customer consider this time-sensitive or urgent?"* y el modelo respondió sí en los cinco tickets — incluyendo "necesito actualizar mi tarjeta antes de la renovación la próxima semana", que un humano llamaría no urgente. La documentación tiene una página — [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13) — que lo dice sin rodeos: *"Jev answers the question you wrote, not the one you meant."* ("Jev responde la pregunta que escribiste, no la que quisiste decir.") Cuando reescribí la pregunta a *"Does the message express that the matter cannot wait until the next business day?"* — 5/5. Una línea, de mi lado. Ese es el flujo de trabajo: el bug vivía en mi pregunta, no en un prompt que pulir.

**Experimento 3 — ¿se puede confiar en la confianza?** Repetí evaluaciones 20 veces cada una sobre ocho tickets. Los tickets fáciles: la misma respuesta siempre, confianza 1.0. El interesante era uno que mezcla dos temas ("su actualización rompió mi flujo de trabajo, además mi tarjeta venció"). Jev respondió **technical 20 de 20 veces** — y reportó confianza 0.395. Misma respuesta, igual desconfió. La confianza mide qué tan turbia es la pregunta, no la consistencia de la respuesta. Eso es exactamente lo que "calibrado" debe significar.

**Experimento 4 — el árbol de decisión.** Este es el caso de uso que más me importaba, así que tiene su propia sección.

---

## Árboles de decisión, de vuelta de entre los muertos

La forma más común en el software es un flujo condicional: si es urgente enruta aquí, si es reembolso enruta allá, escala el resto. Por una década no pudimos poner criterio dentro de esos árboles sin pagar precios de LLM por nodo, así que lo fingimos con palabras clave y expresiones regulares. El diagrama de flujo de cada documento de arquitectura tenía un recuadro punteado que decía "aquí pasa la magia".

Con Jev, los nodos del árbol pueden ser criterio. Mi [jev-lab](https://github.com/xergioalex/jev-lab) tiene un motor de árboles de decisión donde el árbol es un archivo JSON — los nodos noul evalúan condiciones, los choice ramifican, los score agrupan en bandas, y cada nodo puede tener su propia compuerta de confianza:

```json
{
  "entry": "urgency",
  "nodes": {
    "urgency": { "type": "noul", "instructions": "Is this ticket time-sensitive?",
                 "threshold": 0.6, "true": "department", "false": "frustration" },
    "department": { "type": "choice", "instructions": "Which team should handle this?",
                    "criteria": { "billing": "Charges, refunds, invoices",
                                  "orders": "Delivery, tracking" },
                    "branches": { "billing": "refund_check", "default": "frustration" } },
    "refund_check": { "type": "noul", "instructions": "Explicit refund request?",
                      "threshold": 0.6, "true": "act_refund_priority", "false": "act_billing_normal" }
  }
}
```

Este es el árbol real corriendo en vivo sobre un ticket de cobro duplicado (la captura viene de la corrida del laboratorio):

<figure>
  <img src="/images/blog/posts/jev-decisions-instead-of-text/jev-lab-live-run.webp" alt="Captura de terminal del motor de árboles de decisión de jev-lab enrutando un ticket a cobros con prioridad de reembolso y valores de confianza" loading="lazy" width="860" height="1600" style="background:#0d1117;border-radius:12px" />
  <figcaption>Módulos 13 y 14 de jev-lab contra la API en vivo: una cola de 20 tickets triada por $0.0007 en total.</figcaption>
</figure>

Mi primera versión hacía lo obvio: evaluar un nodo, seguir la rama, evaluar el siguiente — una llamada a la API por nodo. Funciona, y es **1.8 veces más caro de lo necesario**, porque cada llamada reenvía el estado. La forma barata es el patrón propio de TypeSafe llamado "speculative fan-out": lanzar *todas* las preguntas del árbol en una sola llamada y hacer la ramificación en el código, ignorando las respuestas que no necesites. Mismas respuestas, 20/20 tickets, la mitad de los tokens:

<figure>
  <img src="/images/blog/posts/jev-decisions-instead-of-text/chart-e4-cost.svg" alt="Gráfico de barras comparando costos de árboles de decisión: secuencial a 34 dólares por millón de decisiones contra 19 dólares con fan-out especulativo" loading="lazy" width="720" height="400" />
  <figcaption>Una decisión completa de árbol cuesta $18.83 por millón — cerca de 0.002 centavos — cuando agrupas las preguntas y ramificas en código. El recorrido secuencial cuesta $34.13 por respuestas idénticas.</figcaption>
</figure>

Un árbol de decisión completo con IA: dos milésimas de centavo por decisión. Veinte tickets triados, clasificados y priorizados por menos de una milésima de dólar. No es un error de tipeo, es la aritmética verificada sobre mis propias corridas.

---

## Por qué esto cambia las cosas

**Tu próximo router puede no ser un LLM.** Medí el patrón de escalado por confianza: Jev enruta todo barato; los casos de baja confianza escalan a un modelo grande. En mis ocho tickets, el hallazgo honesto es que la escalada *empeoró* las cosas. Las respuestas desconfiadas de Jev eran correctas; en el único ticket donde "escalé" a la respuesta segura del LLM, el LLM estaba equivocado. Las compuertas de confianza compran previsibilidad y auditabilidad, no precisión automática. Mide tu propio punto de equilibrio. (La compuerta igual ganó en lo que importa operacionalmente: sabes exactamente qué 12% del tráfico necesita el modelo caro.)

**Los agentes están sentados sobre un montón de no-decisiones caras.** Un agente de código toma docenas de juicios pequeños por tarea: qué herramienta usar, si este paso es seguro, si esta salida se ve cuerda, si este PR merece revisión completa. Hoy esos juicios cuestan llamadas a LLM — la mayor parte de la factura de tokens de un agente es esta fontanería, no la escritura de código. El módulo 16 de mi laboratorio es esa idea convertida en herramienta: entra una descripción de PR, sale un veredicto de esfuerzo de revisión, ~500 tokens. En mis 20 PRs sintéticos atrapó 18/20 de los de riesgo alto/crítico. Si Anthropic y OpenAI conectaran este tipo de modelo a las rutas de decisión de sus agentes, las curvas de costo se moverían. Construí un modelo de escenario (supuestos a la vista, no es una medición): una flota de agentes que toma 40,000 decisiones internas al día cuesta ~$634/mes como llamadas secuenciales a LLM, ~$1.80 como preguntas agrupadas de Jev.

**Y sí — todos lo van a copiar.** Eso no es un riesgo para la tesis, es la tesis. La idea es vergonzosamente simple: juzgar, no generar; evaluar en paralelo; calibrar las probabilidades. Las partes difíciles son las que no se pueden fingir — el objetivo de entrenamiento que hace honesta la confianza, la arquitectura no autorregresiva que la hace barata. A PreTeXt lo reimplementaron en cuestión de semanas; el valor duradero estuvo en entender qué desbloqueaba la medición de texto. Espero aquí la misma película.

---

## El turno de los escépticos

Tres objeciones merecen algo mejor que un gesto de mano, porque yo mismo tuve las tres.

<figure>
  <img src="/images/blog/posts/jev-decisions-instead-of-text/diagram-02.webp" alt="Diagrama que contrasta el camino secuencial de tokens de un LLM con los carriles paralelos de decisiones de Jev abriéndose en un árbol de decisión" loading="lazy" width="1200" height="675" />
  <figcaption>La analogía, dibujada: el LLM se desenrolla token a token; Jev dispara todas las preguntas a la vez y deja que el código elija.</figcaption>
</figure>

*"Es solo un clasificador."* A nivel de idea, claro — ese es el contenido real del tuit de CPU-a-GPU, y la razón por la que es una buena analogía: una GPU es "solo" operaciones simples en paralelo. Lo nuevo no es el concepto, es el paquete: criterio de nivel frontera, calibración como objetivo de entrenamiento, con precio para millones de llamadas. Nadie había lanzado eso como producto estrella. Una GPU también es "solo" un montón de unidades aritméticas — el empaquetado era la revolución.

*"Los benchmarks los califica el propio vendedor."* Correcto, y su post de lanzamiento lo dice — por eso corrí mis propios seis experimentos y publiqué todos los scripts. Mis números son un portátil en un día; están en [el laboratorio](https://github.com/xergioalex/jev-lab), son reproducibles, y fueron suficientes para moverme de escéptico a constructor.

*"'No puede alucinar' es marketing."* También correcto — una respuesta de Jev puede estar equivocada con seguridad; lo que no puede es inventar un texto que no esté en tu lista de opciones. La distinción que importa: equivocado-con-una-confianza-calibrada es un fallo *detectable*, y mi experimento 3 sugiere que la calibración es real. "Sigue pudiendo estar equivocado, solo que no puede inventar datos" — ese no es un defecto del pitch, ese es el pitch.

---

## Cuándo tiene sentido — y cuándo no

Úsalo cuando la forma del trabajo sea una **decisión**: enrutamiento, clasificación, puntuación, compuertas, moderación, triaje — alto volumen, apuestas bajas por llamada o apuestas con compuerta de confianza, sensible a la latencia. El mapa de casos de uso de su documentación es honesto con los puntos dulces y mis resultados coinciden con él.

No lo uses cuando necesites **texto generado** — respuestas, código, resúmenes, cualquier cosa abierta. Esta es la parte que la analogía de CPU-a-GPU tiene bien si la empujas: una GPU no reemplazó a la CPU, se encargó de las cargas de trabajo que eran secretamente paralelas. Jev no reemplazará a tu LLM; se encarga de la rebanada con forma de decisión de tu factura de LLM. La propia página de jaggedness lo dice sin rodeos — para generar, "usa un modelo generativo". Conoce también los bordes: por ahora solo acepta texto, el inglés es su mejor idioma (mis tickets en español igual enrutaron bien, pero la documentación advierte que la precisión baja), no cuenta de forma confiable, y la aritmética mantenla en tu código.

Si quieres jugar con ello tú mismo: el laboratorio está en [github.com/xergioalex/jev-lab](https://github.com/xergioalex/jev-lab) — 16 módulos, cero dependencias, toda la suite de pruebas corre sin API key, y cada módulo tiene su bandera `--live`. Empieza en el módulo 13 y rómpeme el árbol de decisión. Hay un [playground](https://console.typesafe.ai/playground) si quieres probar la API sin escribir nada.

Entré a esta semana pensando que un modelo que no puede escribir era una contradicción. Salgo con un router, un guardrail, un pipeline de triaje y dos herramientas que voy a seguir usando — todos corriendo sobre juicios que cuestan milésimas de centavo. El carbón acaba de abaratarse.

Sigamos construyendo.

---

## Recursos

- [Introducción y documentación de Jev](https://docs.typesafe.ai/introduction) — conceptos System One, primitivas, patrones
- [Post de lanzamiento de TypeSafe](https://typesafe.ai/blog/introducing-system-one-models-and-jev) — las afirmaciones, y sus propias advertencias
- [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13) — la página de modos de fallo que debería tener todo proveedor
- [jev-lab](https://github.com/xergioalex/jev-lab) — mi laboratorio de 16 módulos; cada experimento de este post es reproducible desde él
- [SDK de JavaScript](https://www.npmjs.com/package/@typesafe-ai/sdk) · [SDK de Python](https://pypi.org/project/typesafe-sdk/) — `choice()`, `score()`, `noul()`
- [Confianza y calibración](https://docs.typesafe.ai/confidence) — cómo fijar umbrales, y por qué "no sé" es una señal
- El post de [CPU-to-GPU de Sayed Allam](https://x.com/Sayedevv) en X — la analogía que empezó todo esto
