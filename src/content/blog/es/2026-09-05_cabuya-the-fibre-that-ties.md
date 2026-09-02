---
title: 'Cabuya: la fibra que ata'
description: 'Veinte apps de ayuda que no podían leerse entre ellas. Cabuya es el protocolo abierto que construimos para atarlas: la fibra con que se teje la ayuda.'
pubDate: '2026-09-05'
heroImage: '/images/blog/posts/cabuya-the-fibre-that-ties/hero.webp'
heroLayout: 'side-by-side'
tags: ['tech', 'portfolio', 'civic-tech', 'colombia']
keywords: ['protocolo Cabuya', 'qué es Cabuya', 'interoperabilidad apps de ayuda', 'protocolo abierto emergencias', 'estándar de datos para desastres', 'esquema JSON ayuda humanitaria', 'tecnología cívica Colombia', 'coger la cabuya significado']
series: 'colombia-earthquake-2026'
seriesOrder: 4
draft: true
---

Toma una necesidad. Agua, en un centro de acopio del sur de la ciudad. Un vecino la publica donde puede — un grupo de WhatsApp, un formulario, un pin en un mapa — y después la publica otra vez en otro lado, porque nadie, incluido el vecino, sabe cuál mapa está mirando cada quien. Cuatro mapas terminan sosteniendo la misma necesidad. Tres horas después el centro está lleno. Un mapa se entera. Los otros tres siguen mandando gente.

Ese era el estado del arte en la segunda semana del terremoto: más de veinte apps de ayuda, cuatro mapas de suministros para la misma ciudad, y ni una sola capaz de leer a otra. Antes en esta serie escribí que la fragmentación no es tener muchas herramientas — es tener muchas herramientas que no pueden leerse entre ellas. Lo que no tenía entonces era la respuesta.

Este capítulo trata de la respuesta. Se llama Cabuya, y la revelación de intereses va primero: yo estaba en la sala. Soy una de las personas que la creó, así que lee todo lo que diga sobre ella con eso en mente. Voy a intentar ser más duro con ella de lo que lo sería un comunicado de prensa — el protocolo mismo tiene una regla para eso.

---

## No otra app

La jugada obvia era construir la app número veintiuno: la que unifica todo. También es la equivocada, y a estas alturas el argumento ya es viejo. Un reportador de grietas no es una cadena de suministro. Un censo municipal no es ayuda de persona a persona. Meter todo eso en un solo producto produce algo que no hace nada bien y tarda tres meses que no teníamos. La especialización fue la respuesta correcta en la primera semana, y lo sigue siendo.

Lo que faltaba no era consolidación. Faltaba una forma compartida — un acuerdo sobre cómo se ve un registro, para que cualquier app pueda leer a cualquier otra sin una integración a la medida por cada pareja. Un protocolo, en el sentido aburrido de la palabra. El mismo truco de los contenedores de carga: nadie estandarizó los barcos, estandarizaron la caja, y de pronto todas las grúas y trenes y camiones del mundo podían moverla.

La matemática fue lo que me convenció. Con veinte apps, las integraciones bilaterales son 190 apretones de manos — ciento noventa conversaciones entre equipos agotados, casi todo trabajo repetido. Un esquema compartido es un solo acuerdo. El ecosistema ya tenía las semillas: Corag publicaba una API sin autenticación, Pereira Responde tenía la suya documentada. Que dos apps se lean entre ellas es un favor. Que veinte publiquen la misma forma es infraestructura.

---

## Seis días

El protocolo tiene un acta fundacional, [ratificada el 16 de agosto de 2026](https://github.com/Cabuya/cabuya.org/tree/main/docs/context) — a seis días del terremoto — por un fundador y un grupo de trabajo, en un conjunto de documentos públicos, versionados y con cero datos personales.

Antes de que existiera un solo esquema hubo una fase de análisis: alguien se dio a la tarea de recorrer las más de veinte apps, catalogar qué guardaba cada una, modelar las entidades debajo de todo eso, revisar el estado del arte y trabajar las preguntas de gobernanza y de marca. El acta conserva sus propias advertencias a la vista, y eso te dice de qué cultura se trata: *"The DIVIPOLA codes were never verified"* (los códigos DIVIPOLA nunca se verificaron) — DIVIPOLA siendo el sistema de códigos municipales sobre el que después construimos — y, la frase en la que más pienso, *"Analysis is not adoption"* (analizar no es adoptar). Aparecer en esa matriz no significaba nada. El protocolo se iba a juzgar por lo que los equipos publicaran de verdad, nada más.

Esa frase es toda la disciplina. He visto suficientes páginas de proyecto para saber cómo se cuentan estas historias normalmente: post de lanzamiento, gráfica de adopción, victoria. El acta se negó a eso desde el día uno.

---

## Cuatro pasos y una tarde

Lo que Cabuya le pide a un equipo es casi vergonzosamente poco. La [página principal](https://cabuya.org/) lo pone en cuatro pasos, bajo un título que co-firmé y que sigo defendiendo: *"Four steps, and none of them need us"* (cuatro pasos, y ninguno nos necesita a nosotros).

1. **Publica un manifiesto.** Un archivo JSON en una ruta conocida que dice quién eres, qué publicas y con qué licencia.
2. **Exporta un feed.** Tus lugares, en el esquema compartido. Basta un archivo estático en una URL estable — no se necesita API.
3. **Corre el validador.** Descarga lo que publicaste y reporta lo que encontró, con cada hallazgo localizado y su corrección indicada.
4. **Abre una entrada en el registro.** Un pull request. La medición ocurre del lado del protocolo y la puede ver cualquiera.

Para una aplicación pequeña, todo eso es una tarde. No hay cuenta que crear, aprobación que esperar ni llave que te emitamos — no hay permiso que pedir ni alianza que firmar. La guía rápida son literalmente cinco comandos: publicar `cabuya.json`, exportar `places.json`, correr `validate <url>`, corregir lo que reporte, abrir el PR del registro.

Lo que significa unirse cabe en una línea, y es la que le quitó el miedo a los equipos: **tus datos siguen siendo tuyos; lo que viaja es una copia.** Tu app conserva su producto, sus usuarios y su base de datos exactamente como están. Lo que agregas es una copia pública de tus lugares en el formato compartido. Un registro recortado se ve así:

```json
{
  "name": "Coliseo Municipal",
  "place_kind": "shelter",
  "municipality_text": "Pereira",
  "neighborhood_text": "Centro",
  "lifecycle_status": "active",
  "public_url": "https://example.org/places/coliseo"
}
```

Un albergue. En Pereira, Centro. Activo ahora mismo. Y un enlace de vuelta a la app que lo publicó — porque ese último campo es todo el modelo de contacto: cuando alguien quiere actuar sobre el registro, el botón lo lleva al origen. Los datos de contacto nunca viajan en el feed.

---

## El nombre es una decisión de gobernanza

<figure>
  <img
    src="/images/blog/posts/cabuya-the-fibre-that-ties/fique-plant.webp"
    alt="Una planta de fique — un pariente del agave con hojas largas en forma de espada — creciendo en los Andes."
    width="400"
    height="538"
    loading="lazy"
  />
  <figcaption>El origen de todo: el fique, el pariente del agave del que sale la fibra. Imagen: cabuya.org.</figcaption>
</figure>

La cabuya es la fibra — y la cuerda que se hace con ella — sacada de las hojas del fique, un pariente del agave que crece por los Andes y Centroamérica, del que Colombia es el mayor cultivador del mundo. Si eres colombiano la has visto: el cordel rústico amarrando un bulto, la cuerda atravesada en una portería de vereda. Nadie la inventó, nadie la licenció, nadie la lanzó. Es barata, corriente y resiste carga.

Ese registro es el punto. La [página del nombre](https://cabuya.org/about/) dice que elegirlo fue *"a governance decision before it is a design one"* (una decisión de gobernanza antes que de diseño), y puedo confirmar que el grupo de trabajo gastó en esto más horas que en cualquier campo del esquema. Un protocolo nombrado por una empresa muere con la empresa. Un protocolo nombrado por un comité muere con el ciclo de financiación del comité. Una fibra que cualquier campesino puede convertir en cuerda no es de nadie, así que puede sobrevivirle a todos.

<figure>
  <img
    src="/images/blog/posts/cabuya-the-fibre-that-ties/leaf-to-fibre.webp"
    alt="La transformación de la hoja de fique en hebras de fibra dorada, dispuesta en etapas de izquierda a derecha."
    width="720"
    height="268"
    loading="lazy"
  />
  <figcaption>De la hoja a la fibra. La conversión es manual, mecánica y sin dueño. Imagen: cabuya.org.</figcaption>
</figure>

Dos cosas más sobre la palabra, porque dicen mucho de cómo piensa el proyecto.

La Real Academia Española registra un modismo — *coger la cabuya* — que significa retomar el hilo de un asunto. La página lo traduce para el lector inglés y saca la consecuencia mejor de lo que yo podría: *"A format whose verb of adoption already exists in the language of the region it starts in has one less thing to teach. Formats spread on what they do not have to explain"* (un formato cuyo verbo de adopción ya existe en el idioma de la región donde nace tiene una cosa menos que enseñar. Los formatos se difunden por lo que no tienen que explicar).

Y está el segundo significado, el que una agencia de marca habría enterrado: en Colombia y Ecuador, *estar en la cabuya* significa estar en un lío del que no te sacas fácil. Está en la página, en texto plano — lo sabíamos antes de elegir el nombre. Una iniciativa que revela su propia connotación peor te está diciendo, antes de que leas una línea del spec, cómo va a manejar las malas noticias después.

---

## La tesis

La página principal no lo llama lema ni declaración de misión. Lo llama **la tesis**:

> **«Crecemos juntos: no competimos, nos alimentamos.»**
> **We grow together: we don't compete, we feed each other.**

Quiero desempacar lo que representa, porque no es decoración. Este protocolo nació en una mesa de equipos que eran, en la lectura más plana, competidores — mismos usuarios, mismos donantes, misma atención, misma semana. La tesis es la apuesta de que en un ecosistema de emergencia la competencia es un espejismo y la duplicación es el enemigo; de que mi app volviéndose más fuerte porque puede leer tus datos no es una pérdida tuya, es el producto. Veinte apps que se alimentan entre ellas le ganan a una app que ganó — y el [capítulo anterior](/es/blog/what-comes-next-after-the-earthquake/) de esta serie ya argumentaba que aquí nadie gana siendo el único de pie.

Ahora, un lema es barato. Cualquiera puede escribir uno. Lo que hace que este resista carga es que la mecánica del protocolo lo implementa de verdad: cada registro que viaja lleva el `publisher_id` de la app que lo publicó, así que el crédito va estructuralmente adjunto, no prometido. Los agregadores deben mostrar de dónde vinieron los datos. No hay centro — el registro *"records who exists and what was measured. Never a data path"* (registra quién existe y qué se midió; nunca una ruta de datos). Y cuando una persona actúa sobre un registro, el botón devuelve a la app que lo publicó, porque ahí es donde la relación — y la ayuda — se resuelven. Alimentarse mutuamente está cableado a nivel de esquema.

<figure>
  <img
    src="/images/blog/posts/cabuya-the-fibre-that-ties/splice-no-centre.webp"
    alt="Diagrama de una costura de cuerdas donde dos cuerdas se unen tejiendo sus hebras una dentro de la otra, sin nudo central ni autoridad que las sostenga."
    width="420"
    height="415"
    loading="lazy"
  />
  <figcaption>Una costura: hebras tejidas entre sí, sin nudo en el medio. Imagen: cabuya.org.</figcaption>
</figure>

La [página del nombre](https://cabuya.org/about/) lo comprime en el par de frases que sigo citándoles a los desarrolladores: cada app es un hilo, el protocolo es la cuerda. Dos aplicaciones que pueden leerse *"are not rebuilt, not merged and not subordinated — the connection is the only new thing"* (no se reconstruyen, no se fusionan ni se subordinan — la conexión es lo único nuevo).

---

## Lo que se niega a transportar

Todo el esfuerzo de diseño de Cabuya fue a parar a lo que había que dejar por fuera. Los [dos hechos](https://cabuya.org/) sobre los que descansa todo: que van a existir muchas apps y que está bien, y que los datos son sensibles — así que la capa compartida transporta lugares y hechos, nunca personas: sin nombres, sin números de teléfono, sin contacto personal. *"Excluded by design, not by good intentions"* (excluido por diseño, no por buenas intenciones).

Vuelve a leerlo como ingeniero: no por buenas intenciones. El acta fundacional va más lejos que la página: *"Person-level data never federates — a join prohibition, not a field omission"* (los datos a nivel de persona nunca se federan — una prohibición de cruce, no una omisión de campo). Una omisión de campo es una columna que falta. Una prohibición de cruce significa que nada a nivel de persona puede viajar, en ningún campo, bajo ninguna extensión — para que nadie, nunca, pueda coser dos feeds y armar de vuelta una base de datos de seres humanos. Dado cómo fue esta emergencia — con la cifra de desaparecidos moviéndose por cientos y cada app tentada a «ayudar con el cruce» — esta fue la línea que más disciplina costó sostener. Encontrados.co borrando la foto después del cruce fue el listón ético de la primera semana. Cabuya escribe ese instinto en el esquema, donde no depende de la virtud de nadie.

Incluso el contacto se reduce a un hecho: el campo es `contact_available`, un booleano. Lleva el hecho, nunca el valor. Al albergue se puede contactar — verdadero o falso. El número de teléfono vive en la app que publica, a un salto de distancia, con quien recogió el consentimiento.

Y mi campo favorito de todo el spec, porque es esta serie en miniatura: `last_confirmed_at`. Es obligatorio en cada registro. Puede ser `null` — null significa nunca confirmado — pero la llave tiene que existir, y omitirla es no-conforme. El validador rechaza el registro. Me gasté el segundo capítulo argumentando que una herramienta siempre debe mostrar cuándo fue verdadera por última vez su información, aunque el sello la avergüence. Aquí ese argumento dejó de ser opinión y se volvió una restricción de esquema. Esa es la forma más fuerte que puede tomar un argumento.

---

## Medido, nunca declarado

La última decisión de diseño que vale la pena explicar, porque es la que defendería en una sala tranquila: la conformancia se mide, no se declara. Hay un validador público que cualquiera puede correr. El registro muestra lo que encontró. Que el README de alguien diga «Cabuya compatible» no cuenta para nada hasta que el validador lo diga — y el versionamiento del spec se niega a tener un alias «latest», porque *"a normative document that changes under its own address is a document nobody can cite"* (un documento normativo que cambia bajo su propia dirección es un documento que nadie puede citar).

¿Y qué dice el registro hoy, mientras escribo esto? Cinco publicadores — Corag, Emergencia Colombia, Pereira Ayuda, Pereira Responde, Reporte.co — y todos, sin excepción, aparecen como *sin medir todavía*. La página del registro explica el porqué con una franqueza que me desarma: fue construida *"without a connection to the measurement store"* (sin conexión al almacén de mediciones). Lo publicado es real. Lo medido no ha corrido. Son hechos distintos, y la página se niega a mezclarlos.

Las cinco entradas además están marcadas como *Proposed* — propuestas: la mayoría se abrieron a nombre de cada equipo a partir de información pública, y la marca se mantiene hasta que el equipo confirme. El razonamiento está en la página: ocultarlas haría ver el registro más vacío de lo que es la red — y se etiquetan porque un equipo que no ha respondido no ha aceptado nada.

La Regla-0 del acta fundacional es no hacer afirmaciones sin respaldo, y la regla obliga primero al proyecto mismo. No puedo decirte que Cabuya esté funcionando. Puedo decirte exactamente en qué estado está. Esa distinción es tan poco común que quise dejarla documentada en esta serie, en público, como el estándar al que creo que la tecnología cívica debería someterse.

---

## La skill

Una pieza más, y es la que conecta esta historia con todo lo demás que escribo. Cabuya publica una [skill para agentes](https://cabuya.org/developers/skill) — un paquete instalable ([GitHub](https://github.com/Cabuya/cabuya-skill)) que le enseña a un agente de código el esquema, los niveles de conformancia, las exclusiones y los ids de verificación del validador, sin conexión. La justificación de la página es una sola frase que solo pudo escribir gente que pasó agosto en este ecosistema: *"The skill exists because most teams in this ecosystem are already working with an agent"* (la skill existe porque la mayoría de los equipos de este ecosistema ya están trabajando con un agente).

Era verdad. Las veinte apps no las construyeron veinte agencias integradas; las construyeron equipos pequeños programando en pareja con modelos a las dos de la mañana. Si la ruta de adopción del protocolo pasa por un desarrollador, el agente del desarrollador tiene que conocer el spec — o va a improvisar uno. La página de la skill es directa sobre el modo de falla: un agente que tiene que ir a buscar un estándar va a inventar uno cuando la búsqueda falle, y va a inventarlo con seguridad. La solución es casi insultantemente simple: vender el spec dentro del paquete, con checksums. *"A specification on disk cannot be hallucinated"* (un spec en disco no se puede alucinar).

Las reglas que la skill deja en duro son las mismas que el protocolo se niega a dejar al juicio: nada de datos a nivel de persona, nunca, en ningún campo; los valores de contacto enlazan hacia afuera en vez de viajar; nada de scraping; las políticas de rastreo se respetan en el código que escribe, no en un comentario; y nunca reclamar una conformancia que el validador no haya medido — el paquete ni siquiera escribe la palabra *certificado*.

Y una decisión queda deliberadamente en manos de un humano. Cuando la skill mapea la base de datos de un equipo al esquema compartido, construye el cruce de campos, corre la lista de veto sobre datos personales por cada columna — y se detiene a preguntar. Esa pausa es la única decisión humana obligatoria de todo el flujo. Que una columna contenga o no datos personales no es algo que el agente pueda decidir solo. He escrito mucho sobre autonomía de agentes este año, y sigo volviendo a esa pausa como el patrón: automatiza el levantamiento, reserva el juicio.

---

## Lo que es real y lo que no

Aquí va el libro honesto, en el vocabulario del propio protocolo. Mientras escribo: spec 0.1, un solo tipo de entidad (lugares), cinco entradas propuestas en el registro, cero conformancias medidas, y una página principal que cierra su discurso con *"none of it is achieved yet"* (nada de esto está logrado todavía). Las ambiciones vienen etiquetadas como *Ambition, not roadmap* — ambición, no hoja de ruta: una red de emergencia para que la próxima crisis empiece con infraestructura y no con una hoja de cálculo; un esquema que le sobreviva a la emergencia que lo produjo; un ecosistema regional que puede bifurcar todo porque el spec es CC0 y no hay a quién pedirle permiso.

No sé si algo de eso pase. Ayudé a escribir el protocolo y de verdad no lo sé — igual que no sé cuál de las veinte apps seguirá corriendo en el mes siete, cuando la historia ya se fue y la familia del albergue sigue en el albergue. Lo que escribí en el capítulo anterior sigue siendo cierto: lo que sobrevive a una emergencia son los datos y las interfaces, y todo lo demás es un render. Cabuya es mi apuesta concreta a esa frase. No la app número veintiuno — la forma que permite reemplazar cualquiera de ellas sin que el conocimiento se muera con la app.

De todo lo que lancé este mes, es la pieza que más me gustaría seguir manteniendo en tres años.

La cabuya es la fibra con la que se atan las cosas. Un hilo solo no sostiene nada; torcidos juntos, cargan lo que ninguno pudo solo. Eso empezó como una frase de marca y terminó como la descripción honesta de lo que encontró esta serie entera: ninguna app, ningún organismo y ningún héroe cargó esta ciudad — hilos corrientes, torcidos a tiempo.

A seguir construyendo.

---

## Recursos

- [Cabuya — el protocolo abierto de interoperabilidad de ayuda](https://cabuya.org/)
- [Sobre el nombre, la fibra y los modismos](https://cabuya.org/about/)
- [La especificación del protocolo Cabuya v0.1](https://cabuya.org/developers/spec)
- [Los esquemas JSON que exige el validador](https://cabuya.org/developers/schemas)
- [El registro de publicadores](https://cabuya.org/registry)
- [La skill para agentes — documentación](https://cabuya.org/developers/skill) · [cabuya-skill en GitHub](https://github.com/Cabuya/cabuya-skill)
- [El acta fundacional (docs/context)](https://github.com/Cabuya/cabuya.org/tree/main/docs/context)
