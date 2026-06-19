---
title: "Midjourney quiere escanear todo tu cuerpo en 60 segundos"
description: "Midjourney, la empresa de imágenes con IA, presentó un escáner de ultrasonido de cuerpo completo y un spa. ¿Es un pivote o una nueva división? ¿Y funciona?"
pubDate: "2026-06-19"
heroImage: "/images/blog/posts/midjourney-medical-pivot/hero-es.webp"
heroLayout: "banner"
tags: ["tech", "ai"]
keywords: ["Midjourney escáner médico", "qué es Ultrasonic CT Midjourney", "ultrasonido de cuerpo completo Midjourney", "Midjourney Spa San Francisco", "Midjourney pivote a salud", "tomografía por ultrasonido cuerpo completo", "Midjourney Butterfly Network acuerdo"]
---

Te metes a una piscina poco profunda de luz dorada. Un anillo de sensores manda sonido a través de tu cuerpo desde todos los ángulos. Cerca de un minuto después sales, y ha quedado dibujado un mapa 3D de todo lo que tienes adentro: órganos, arterias, hueso. Sin agujas, sin radiación, sin esperas.

Suena a escena de película: la Med-Bay de *Elysium*, la mitad de las enfermerías de la ciencia ficción. Y lo sería, salvo por un detalle: quien lo anunció, en un escenario en San Francisco, es [Midjourney](https://www.midjourney.com/). La empresa que conoces por convertir texto en imágenes ahora quiere convertir sonido en un mapa de tu cuerpo. La llaman el Midjourney Scanner, y al método, "Ultrasonic CT". Y quieren poner la primera máquina dentro de un spa. (Hasta la prensa tecnológica hizo una doble toma: en Engadget admitieron que *"had to check… it wasn't April 1st"* ("tuvimos que revisar que no fuera 1 de abril").)

Así que la pregunta que se me quedó no fue si es una broma. Es la que toda buena premisa de ciencia ficción tiene que responder tarde o temprano: ¿la ciencia es real, o se queda en ficción? Una empresa de imágenes con IA, sin historia en hardware ni trayectoria médica, dice que va a reinventar cómo miramos el interior del cuerpo humano. Me puse a investigar —no para burlarme, no para hacerle barra— para entender qué fue lo que de verdad anunciaron, qué significa para Midjourney como empresa, y dónde queda la línea entre la película y la máquina.

---

## Qué fue lo que anunciaron

La promesa, en palabras de la propia Midjourney, es *"something as powerful as MRI, and as casual as a trip to the spa"* ("algo tan potente como una resonancia magnética, y tan informal como ir al spa").

El aparato es un anillo de —según dicen— *"half a million tiny squares each the size of a fine grain of sand, and each capable of acting as both a tiny speaker and a tiny microphone"* ("medio millón de cuadritos del tamaño de un grano fino de arena, cada uno capaz de actuar como un pequeño altavoz y un pequeño micrófono"). Bajas a través de ese anillo a unos 5 cm por segundo. Los cuadritos disparan ondas ultrasónicas y escuchan los ecos millones de veces por segundo, *"producing terabytes of data each second"* ("produciendo terabytes de datos cada segundo"). El software reconstruye cómo se curvan las ondas al cruzar las fronteras entre agua, grasa, músculo y hueso, y lo convierte en un *"3D map of your body, down to a fraction of a millimeter"* ("mapa 3D de tu cuerpo, hasta una fracción de milímetro").

Los números del titular son enormes. Un escaneo que *"looks a lot like today's MRIs but at nearly a hundred times the speed"* ("se parece mucho a las resonancias de hoy, pero a casi cien veces la velocidad"). Una meta de **50.000 escáneres en el mundo para 2031**. Una capacidad de *"a billion scans a month"* ("mil millones de escaneos al mes"). Y una afirmación —matizada, pero dicha— de que con suficiente imagen temprana el mundo *"could avoid 30% of all deaths and 50% of all healthcare costs"* ("podría evitar el 30% de todas las muertes y el 50% de todos los costos de salud").

Y luego viene la parte que nadie vio venir: el primero va en un **spa**. Un buque insignia en San Francisco, que abriría hacia finales de 2027, de unos 24 a 25.000 pies cuadrados con *"hot tubs, saunas, cold plunges, and cozy rooms with pools of golden light which softly scan your body"* ("jacuzzis, saunas, baños de inmersión fríos y salas acogedoras con piscinas de luz dorada que escanean tu cuerpo suavemente"). Abierto 24/7. Como lo ponen ellos: *"The scans are a side-effect. You barely think of them when going to the spa"* ("Los escaneos son un efecto secundario. Casi ni piensas en ellos cuando vas al spa").

<figure>
  <video
    src="/images/blog/posts/midjourney-medical-pivot/spa-renders.mp4"
    width="2490"
    height="1080"
    autoplay
    loop
    muted
    playsinline
    preload="metadata"
    style="width: 100%; height: auto;"
    aria-label="Render conceptual en bucle del interior del Midjourney Spa — piscinas de luz dorada en una sala oscura tipo spa."
  ></video>
  <figcaption>Los propios renders conceptuales del spa que planea Midjourney — piscinas de luz dorada a las que te metes, con el escaneo como efecto secundario. — Fuente: <a href="https://www.midjourney.com/medical/blogpost">Midjourney</a>.</figcaption>
</figure>

Acá va lo primero que conviene tener presente, porque el marketing lo difumina: **los 60 segundos son una meta, no una medición.** Su propia frase es *"the goal is for this process to take no more than 60 seconds"* ("la meta es que este proceso no tome más de 60 segundos"). La cobertura del evento ubica el prototipo actual en unos **20 minutos**, usado en unas **12 personas** hasta ahora. Y el fundador, David Holz, le dijo algo a The Next Web que el demo pulido no muestra: *"We're not even using any AI in this yet, just really cool hardware and software"* ("Ni siquiera estamos usando IA en esto todavía, solo hardware y software muy chéveres"). Lo que corre hoy es procesamiento de señales, no un modelo.

<figure>
  <img src="/images/blog/posts/midjourney-medical-pivot/reconstruction-abdomen-es.webp"
       alt="Corte transversal del abdomen reconstruido por el Midjourney Scanner, con etiquetas anatómicas en español: aorta, hígado, bazo, riñones, costillas, médula espinal y más."
       width="1774"
       height="887"
       loading="lazy" />
  <figcaption>La segmentación con IA etiqueta lo que el escaneo identifica dentro del cuerpo: un corte del abdomen con sus estructuras nombradas. — Fuente: <a href="https://www.midjourney.com/medical/blogpost">Midjourney</a>.</figcaption>
</figure>

---

## ¿Es un pivote o una nueva división?

Esta fue mi primera pregunta de verdad, y sospecho que también la tuya. Los titulares dijeron "pivote". La lectura de Bloomberg fue *"AI Startup Midjourney Pivots to Health"* ("La startup de IA Midjourney pivota hacia la salud"). Pero lee lo que Midjourney escribió de verdad, y el encuadre es distinto. La primera línea del anuncio no es "vamos a cambiar lo que hacemos". Es *"We're a new division of Midjourney"* ("Somos una nueva división de Midjourney"). El texto se titula "A New Era of Midjourney" ("Una nueva era de Midjourney"), y reencuadra a toda la empresa como un *"community-backed research lab… funded by everyday people"* ("laboratorio de investigación respaldado por la comunidad… financiado por gente común"), con un adelanto de que hay *"even more exciting projects"* ("proyectos aún más emocionantes") todavía sin anunciar.

Así que la respuesta honesta es: **esto es una expansión, no un pivote.** Nada en el anuncio retira la generación de imágenes. No hay ningún "vamos a cerrar lo que paga las cuentas". Si acaso, el producto de imágenes es la *razón* por la que esto es posible, y esa es la parte que me parece más interesante.

Y tampoco fue un capricho de la noche a la mañana. Como señaló [Deedy Das](https://debarghyadas.com/) —partner de Menlo Ventures y una voz muy seguida en la industria—, *"the midjourney roadmap was public the whole time"* ("la hoja de ruta de Midjourney fue pública todo el tiempo"). Rescató un intercambio de marzo de 2024 en el que Holz escribió, casi al pasar: *"tbh i want to open up a biomedical imaging division at midjourney to work on stuff like this"* ("la verdad, quiero abrir una división de imágenes biomédicas en Midjourney para trabajar en cosas así"). Dos años antes de los renders del spa, la intención ya estaba sobre la mesa. Y los recibos lo respaldan: Midjourney [anunció que entraba al hardware](https://techcrunch.com/2024/08/28/midjourney-says-its-getting-into-hardware) en agosto de 2024, contrató a un ex ingeniero del Vision Pro de Apple para liderarlo, y firmó el acuerdo con Butterfly a finales de 2025. El evento de lanzamiento fue la revelación, no el comienzo.

<figure>
  <img class="prose-img-md" src="/images/blog/posts/midjourney-medical-pivot/deedy-das-roadmap-tweet.webp"
       alt="Tuit de Deedy Das mostrando un mensaje de marzo de 2024 de David Holz donde dice que quiere abrir una división de imágenes biomédicas en Midjourney."
       width="1072"
       height="1112"
       loading="lazy" />
  <figcaption>Deedy Das rescata el post de Holz de marzo de 2024: el plan de imágenes biomédicas era público años antes del lanzamiento. — Fuente: <a href="https://x.com/deedydas/status/2067631455145177300">Deedy Das en X</a>.</figcaption>
</figure>

Midjourney **no tiene inversionistas externos.** Ha sido rentable desde casi el primer día, con ingresos anuales reportados de unos 500 millones de dólares y alrededor de 107 personas, y no levantó ni un peso de capital de riesgo. Esa estructura es toda la historia acá. Una startup financiada por fondos no puede decirle creíblemente a su junta "vamos a gastar las ganancias de la generación de imágenes construyendo hardware para un mercado que nunca hemos tocado, con un horizonte de 5 a 10 años, empezando por un spa". Midjourney sí puede, porque no hay junta a la que convencer. A quienes le tiene que responder es a sus suscriptores.

Hay además un hilo más profundo que conecta a las dos divisiones, y no es solo "ambas tienen la palabra imagen". Las dos consisten, en el fondo, en **reconstruir una imagen a partir de datos.** Un modelo de difusión convierte ruido y un prompt en una imagen coherente. Un escáner como este convierte terabytes de ecos acústicos en bruto en una imagen coherente de tu hígado. La matemática no es la misma, pero la *forma* del problema —mucho cómputo, un problema inverso, convertir una avalancha de señal en algo que un humano pueda leer— rima. Vuelvo a esto, porque es a la vez el mejor argumento de "por qué Midjourney" y el mejor argumento de qué podría salir mal.

Lo que no aclararon, marcadamente: qué pasa con la hoja de ruta del producto de imágenes, si sacaron ingenieros de ahí, y cómo una empresa de ~107 personas le pone gente a un moonshot de hardware y salud sin frenar lo que lo financia. "Nueva división" es la etiqueta correcta. También es una etiqueta que tapa mucho riesgo de ejecución.

---

## La ciencia detrás de la ciencia ficción

Si te quedas en "empresa de imágenes construye un escáner", suena absurdo. Si miras *cómo* funciona de verdad la tomografía por ultrasonido moderna, se vuelve menos absurdo, y se entiende por qué una empresa pesada en cómputo escogió esta pelea.

El ultrasonido convencional —la varita de mano en la clínica— rebota sonido contra el tejido y lee los ecos. Lo que Midjourney describe se parece más a una **tomografía computarizada por ultrasonido**: mandar sonido *a través* del cuerpo desde todos los ángulos, medir cómo cambia cada onda, y resolver hacia atrás qué tejido tiene que haber adentro para producir esas mediciones. La técnica para hacerlo bien se llama inversión de onda completa, y se tomó prestada de la sismología: es la misma familia de matemática que usan los geólogos para ver qué hay bajo tierra a partir de las ondas de los terremotos.

Acá está la trampa que también es la oportunidad: la inversión de onda completa es brutalmente cara. Una sola reconstrucción 3D de alta calidad puede tomar horas o días en hardware serio. Ese es justo el tipo de problema que una empresa con una flota gigante de GPU y experiencia profunda en reconstrucción de imágenes podría estar en posición de atacar, y hay investigación publicada que muestra que el aprendizaje profundo puede acelerar este tipo de reconstrucción en cuatro o cinco órdenes de magnitud. *Esa* es la verdadera respuesta a "por qué Midjourney". No el spa. El cómputo.

El hardware tampoco es humo. El único hecho duro y verificable de toda esta historia es una alianza: Midjourney firmó un acuerdo de codesarrollo con **Butterfly Network**, la empresa de "ultrasonido en un chip", revelado en un documento ante la SEC en noviembre de 2025, por hasta **74 millones de dólares en cinco años**, con 40 de los módulos de chip de Butterfly en cada máquina prototipo. La acción de Butterfly subió con la noticia. El líder de hardware que contrató Midjourney, Ahmad Abbas, viene del equipo del Vision Pro de Apple. Hay ingenieros reales y silicio real detrás del render.

<figure>
  <img src="/images/blog/posts/midjourney-medical-pivot/reconstruction-thigh-es.webp"
       alt="Corte transversal de dos muslos reconstruidos por el Midjourney Scanner, con etiquetas anatómicas en español: fémur, músculo sartorio, arteria femoral, vena safena mayor y más."
       width="1774"
       height="887"
       loading="lazy" />
  <figcaption>El mismo escaneo en el muslo, con músculos y vasos etiquetados. La pierna, vale anotarlo, es una de las partes del cuerpo más fáciles de atravesar para el sonido. — Fuente: <a href="https://www.midjourney.com/medical/blogpost">Midjourney</a>.</figcaption>
</figure>

Hasta pasó la prueba del testigo presencial. Ben Parr —periodista de tecnología, autor de *Captivology* y figura de los medios tech desde sus años en Mashable— fue invitado al lanzamiento y se subió él mismo al escáner. *"I saw the inside of my arm today. And it was the future!"* ("Hoy vi el interior de mi brazo. ¡Y era el futuro!") [escribió en X](https://x.com/benparr/status/2067462636867142020). Solo pudo escanearse el brazo —*"the full machine is HUGE"* ("la máquina completa es ENORME"), agregó—, lo cual encaja con un prototipo temprano. Tómalo con calma: era un invitado, así que es una primera impresión entusiasta, no una prueba independiente. Pero es un testigo creíble diciendo que una máquina real lo escaneó en tiempo real, no un render.

<figure>
  <img class="prose-img-md" src="/images/blog/posts/midjourney-medical-pivot/ben-parr-launch-tweet.webp"
       alt="Tuit de Ben Parr diciendo que vio el interior de su brazo en el lanzamiento de Midjourney y que era el futuro, con fotos del evento."
       width="1070"
       height="1386"
       loading="lazy" />
  <figcaption>Ben Parr en el lanzamiento — la primera impresión de un invitado tras probar el escáner en su brazo. — Fuente: <a href="https://x.com/benparr/status/2067462636867142020">Ben Parr en X</a>.</figcaption>
</figure>

---

## Entonces, ¿funciona de verdad?

Toda buena película de ciencia ficción tiene un agujero en la trama que solo notas en la segunda vuelta. El de esta tiene nombre: física. La distancia entre la promesa y lo que el sonido de verdad puede hacer dentro de un cuerpo es enorme, y los que más saben de esto no fueron nada amables.

Empecemos por el cuerpo mismo. El sonido tiene dos enemigos, y el cuerpo humano está lleno de ambos: **el aire y el hueso.** En la frontera entre el tejido blando y el aire —pulmones, gas intestinal— alrededor del 99,9% de una onda de ultrasonido se refleja de vuelta. No puede pasar. El hueso también refleja una fracción grande, dispersa el resto y distorsiona feo lo que sobreviva. Esto no es un error de ingeniería que se arregla con más sensores o más cómputo. Es la física del sonido chocando contra un pulmón lleno de aire. Un radiólogo en ejercicio lo dijo sin rodeos en Hacker News: el ultrasonido *físicamente no puede* obtener imágenes de pulmones llenos de aire ni ver a través del hueso cortical, y calificó la afirmación de "evitar el 30% de las muertes" como *"completely divorced from reality"* ("completamente divorciada de la realidad").

Por esto mismo todo sistema de tomografía por ultrasonido que ha llegado a la clínica obtiene imágenes de exactamente una cosa: **el seno.** El SoftVue de Delphinus y el escáner de QT Imaging tienen aprobación de la FDA, y ambos son solo para seno, porque el seno es blando, no tiene hueso en el camino, no tiene bolsas de aire y se sumerge limpiamente en agua. El seno se eligió *porque* esquiva todos los límites duros del ultrasonido. Veinte años de trabajo previo convergieron en "solo seno" por una razón. El torso, el abdomen, el cráneo —los lugares donde más querrías que un escaneo de cuerpo completo viera— son el peor caso para el sonido. La frase honesta a la que sigo volviendo: la física dice *con forma de seno, no con forma de cuerpo.*

Y luego está la ironía que debería hacer parar a cualquiera. El modo de falla documentado de los modelos generativos de imágenes es la **alucinación**: producir con confianza detalle que no es real. Cuando reconstruyes una imagen médica a partir de datos escasos y ruidosos usando un modelo aprendido, el modelo puede inventar anatomía: una estructura que se ve plausible, que renderiza hermosa y que no está ahí. Un investigador de resonancia magnética hizo justo este señalamiento sobre el demo: el reescalado con IA a partir de datos escasos produce imágenes *"spectacularly beautiful"* ("espectacularmente hermosas") pero poco confiables. La empresa cuya experiencia entera es generar imágenes convincentes que nunca existieron ahora propone generar imágenes de tus órganos. Eso es, o bien el equipo perfecto para el problema de reconstrucción, o bien el más peligroso. Posiblemente ambos.

Y un encuadre del marketing es, sencillamente, engañoso. "Sin radiación" se vende como una ventaja sobre la resonancia magnética. Pero **la resonancia magnética nunca ha usado radiación ionizante.** Las ventajas reales del ultrasonido sobre la resonancia son costo, velocidad, no tener un imán gigante y no tener un tubo claustrofóbico, no la radiación, porque nunca hubo radiación que vencer. La tomografía computarizada (CT) es la de la radiación. Compararse con la resonancia en ese eje es un truco de manos.

Está también la pregunta que nadie en un evento de lanzamiento quiere abordar: ¿deberían escanearse las personas sanas? El tamizaje de cuerpo completo en personas sin síntomas es algo contra lo que los grandes organismos de radiología advierten activamente. El Colegio Americano de Radiología dice claramente que no hay *"documented evidence that total body screening is cost-efficient or effective in prolonging life"* ("evidencia documentada de que el tamizaje de cuerpo completo sea costo-eficiente o efectivo para prolongar la vida"). La razón es estadística, no pesimismo: escanea suficientes personas sanas y encontrarás sombras en cerca de 1 de cada 3, casi todas inofensivas, pero cada una dispara más pruebas, más biopsias, más ansiedad, más costo. Corre eso a *mil millones de escaneos al mes* y no estás democratizando la salud: estás fabricando miedo a escala industrial. La empresa de escaneo directo al consumidor Prenuvo lleva años viviendo justo este debate.

Acá va el contraargumento a favor, porque los escépticos no se llevan la última palabra automáticamente. La tomografía computacional de onda completa de verdad es una bestia distinta a la varita de mano: puede medir propiedades del tejido que la vieja forma no puede, y un arreglo masivo y simultáneo más mucho cómputo podría de hecho empujar más allá de algunos límites que la gente asume fijos. E incluso si la gran visión de "reemplazar la resonancia" nunca aterriza, hay un mercado real y poco glamoroso ahí mismo: **datos de composición corporal baratos y repetibles** —grasa, músculo, hueso— es algo por lo que la gente paga hoy vía escaneos DEXA costosos y difíciles de conseguir. Un escáner que solo haga *eso* bien, a precio de spa, tiene clientes. Y, revelador, ese es el carril en el que Midjourney de verdad está lanzando: no diagnóstico, sino *"detailed body composition maps"* ("mapas detallados de composición corporal"), con las solicitudes a la FDA para cualquier cosa más llegando *"over time"* ("con el tiempo"). Sin aprobación todavía. Saben dónde está la línea.

| La promesa | Lo que es cierto hoy |
|------------|----------------------|
| Escaneo de cuerpo completo en 60 segundos | Una meta; el prototipo tarda ~20 minutos, ~12 personas escaneadas |
| La IA reconstruye tu interior | "Ni siquiera estamos usando IA en esto todavía" |
| Superior a la resonancia magnética | Ningún radiólogo independiente ha evaluado la resolución; entrega mapas de composición corporal, no diagnósticos |
| Sin radiación, a diferencia de la resonancia | La resonancia tampoco tuvo nunca radiación ionizante |
| Podría evitar el 30% de las muertes | Contradicho por el consenso contra el tamizaje de cuerpo completo en personas sanas |
| Toma imágenes de todo tu cuerpo | Todo sistema de tomografía por ultrasonido aprobado es solo para seno, por física |

---

## Qué representa en realidad

Quítale los renders del spa y el número de mil millones de escaneos, y creo que Midjourney está haciendo tres apuestas al tiempo.

La primera es una **apuesta técnica** a que el cómputo puede romper un problema de reconstrucción que el campo ha tratado como limitado por la física. Esa apuesta es en parte acertada y en parte soberbia: el cómputo puede mucho, pero no puede hacer que el sonido atraviese un pulmón lleno de aire.

La segunda es una **apuesta de negocio** a que una empresa rentable y sin inversionistas puede usar sus márgenes para comprarse la entrada a una industria adyacente y difícil con un horizonte de una década. Esa sí es nueva, y solo es posible por cómo está construida Midjourney. Si es sabia es otra pregunta.

La tercera es la **apuesta del encuadre**, y es la que más me incomoda. Lanzar un dispositivo cuasi-médico como una *experiencia de spa de bienestar*, empezando por "composición corporal" no diagnóstica, les suena a los críticos a arbitraje regulatorio: pon a girar un volante de datos de mil millones de escaneos en el carril del bienestar de consumo, y después devuélvete hacia las afirmaciones clínicas con la FDA una vez que tengas los datos y el impulso. Podría ser la única forma realista de arrancar una nueva modalidad de imagen. También es justo el camino que permite que decisiones de grado médico se tomen en un contexto con supervisión de grado spa.

---

## Cierre

¿Honestamente? No sé si esto funciona. No creo que nadie lo sepa todavía, incluida Midjourney, cuyo propio lenguaje está lleno de "metas" y de "creemos que es posible". De lo que sí estoy bastante seguro es de que las lecturas fáciles están las dos equivocadas. No es una empresa perdiendo el rumbo y abandonando la generación de imágenes: es una nueva división financiada por un producto que va bien. Y no es la muerte de la resonancia magnética: la física que confinó al ultrasonido al seno durante veinte años no desapareció porque apareciera una empresa de GPU.

Lo que queda en el medio es más interesante que cualquiera de los dos titulares. Una empresa con una estructura inusual, dinero real, socios de hardware reales y una ventaja real en cómputo, entrando de frente a la versión más difícil de un problema, haciendo afirmaciones que su propio prototipo todavía no puede respaldar, con un encuadre diseñado para esquivar el escrutinio que esas afirmaciones normalmente invitarían. Eso vale la pena seguirlo de cerca, con curiosidad por la ambición y una mano en el escepticismo.

La ciencia ficción se vuelve ciencia de la forma aburrida: una solicitud ante la FDA, un resultado revisado por pares, un prototipo honesto a la vez. Así que voy a estar pendiente de las solicitudes, no de los renders del spa. Ahí es donde vamos a descubrir cuál de estas apuestas cruza desde la película, y cuál se queda en la pantalla.

A seguir construyendo.

---

## Recursos

- [Midjourney — "A New Era of Midjourney" (anuncio de Medical)](https://www.midjourney.com/medical/blogpost) — la fuente primaria del escáner, el spa y cada cita directa de aquí.
- [Butterfly Network — comentario sobre la alianza del Midjourney Scanner](https://www.butterflynetwork.com/press-releases/midjourney-scanner-ultrasound-chip) — el socio de hardware confirmando el acuerdo y el detalle de los 40 módulos por sistema.
- [Engadget — el escáner ultrasónico de cuerpo completo de Midjourney](https://www.engadget.com/2196998/midjourney-full-body-ultrasonic-scanner/) — la cobertura de Mariella Moon, incluida la frase de "tuvimos que revisar que no fuera 1 de abril".
- [The Next Web — el Midjourney Scanner, examinado](https://thenextweb.com/news/midjourney-scanner-midjourney-medical-ultrasound) — la crítica más afilada de la prensa general, y la fuente de la cita de Holz "ni siquiera usamos IA todavía".
- [Discusión en Hacker News](https://news.ycombinator.com/item?id=48579650) — más de 800 comentarios, con radiólogos y científicos de imagen en ejercicio en ambos lados de la física.
- [Colegio Americano de Radiología — declaración sobre el tamizaje de cuerpo completo](https://www.acr.org/News-and-Publications/Media-Center/2023/ACR-Statement-on-Screening-Total-Body-MRI) — por qué se advierte contra el tamizaje de cuerpo completo en personas asintomáticas.
- [Tomography (2024) — revisión de la tomografía computarizada por ultrasonido](https://pmc.ncbi.nlm.nih.gov/articles/PMC11053617/) — la ciencia de la USCT y por qué los sistemas clínicos son solo para seno.
- [Ben Parr en X — relato de primera mano del lanzamiento](https://x.com/benparr/status/2067462636867142020) — periodista de tecnología y autor de *Captivology*; probó el escáner en su brazo y lo llamó "el futuro".
- [Deedy Das en X — "la hoja de ruta era pública todo el tiempo"](https://x.com/deedydas/status/2067631455145177300) — partner de Menlo Ventures que rescata el post de Holz de marzo de 2024 sobre abrir una división de imágenes biomédicas.
