---
title: 'El día que Pereira se quedó en silencio'
description: 'El 10 de agosto de 2026 un terremoto de magnitud 7,4 golpeó el occidente de Colombia. Pereira, mi ciudad, fue una de las más golpeadas. Qué pasó, con fuentes.'
pubDate: '2026-08-17'
tags: ['personal', 'colombia', 'tech']
keywords: ['terremoto Colombia 2026', 'terremoto Pereira 10 de agosto', 'qué pasó en el terremoto de Colombia', 'cuántos muertos dejó el terremoto en Colombia', 'sismo San José del Palmar Chocó', 'edificios colapsados en Pereira', 'cuánto duró el terremoto en Colombia']
series: 'colombia-earthquake-2026'
seriesOrder: 1
draft: true
---

Lunes 10 de agosto de 2026. 7:34 de la mañana.

El [Servicio Geológico Colombiano](https://www2.sgc.gov.co/Noticias/Paginas/SGC-actualiza-la-informacion-sobre-el-sismo-ocurrido-en-San-Jose-del-Palmar-Choco.aspx) dice que el movimiento duró entre noventa segundos y dos minutos. No he conocido a nadie en Pereira que lo recuerde en menos de cinco.

Yo vivo acá. Y una semana después todavía no tengo una forma limpia de describir cómo está la ciudad, así que voy a prestarme la única frase que me ha sonado precisa: gran parte de Pereira se siente destruida, o irreconocible, y mucha gente necesita ayuda. Eso no es una estadística. Es lo que se siente al caminar por acá, y voy a mantener esas dos cosas separadas durante toda esta serie — lo que siento y lo que puedo demostrar.

Este es el primero de seis artículos sobre el terremoto y sobre lo que hicieron unos cuantos cientos de desarrolladores en los días siguientes. Quiero empezar por la parte que no tiene nada que ver con software.

---

## Qué pasó, en concreto

El epicentro estuvo cerca de **San José del Palmar**, en el Chocó, a unos 20 km del casco urbano. Magnitud **7,4**. Profundidad de **103 km** según el SGC — el USGS lo calcula un poco más hondo, en 110 km. En las primeras horas circularon 82 km y 96 km. Eran estimaciones tempranas que después se corrigieron, y vale la pena recordarlo, porque es el primer ejemplo pequeño de un patrón que marcó todo el resto de la semana.

La profundidad explica por qué este se sintió distinto a todo.

No fue una falla superficial rompiéndose debajo de una ciudad. Frente a la costa Pacífica, la placa de Nazca se hunde por debajo de la Sudamericana — subducción, el mismo proceso que levantó los Andes. Este sismo ocurrió *adentro* de esa placa que ya va descendiendo, a más de cien kilómetros de profundidad. El USGS lo clasifica como falla de rumbo dentro de la placa, no como una ruptura en el límite entre placas.

Es decir: la energía vino de muy abajo y se repartió sobre un área enorme en vez de concentrarse en un valle. Más de **12.000 personas de 900 centros poblados** reportaron haberlo sentido, según el SGC. Se sintió en Panamá. Se sintió en Venezuela. Y siguió y siguió, porque — en palabras del SGC — cuando hay magnitudes tan altas, la energía liberada no alcanza a disiparse completamente por debajo de la superficie.

Es el sismo de mayor magnitud registrado en Colombia en este siglo.

Después empezaron las réplicas. Dieciocho al mediodía del primer día. [Más de 130 a las seis de la mañana del 12 de agosto](https://www.infobae.com/colombia/2026/08/12/tras-el-terremoto-de-74-en-colombia-ya-son-130-las-replicas-confirmo-el-servicio-geologico-colombiano/), entre 0,6 y 4,8, concentradas en San José del Palmar y Sipí. El 13 volvió a temblar fuerte en el Chocó de madrugada.

Las réplicas son la razón por la que la gente dejó de dormir bajo techo. Y también son la razón por la que cualquier información sobre si un edificio era seguro tenía una vida útil que se medía en horas.

---

## Las cifras, y por qué se siguen moviendo

Acá quiero ir con cuidado, porque es donde mucha escritura sobre desastres se tuerce sin que nadie se dé cuenta.

Entre el 10 y el 15 de agosto las cifras oficiales cambiaron todos los días, y a veces varias veces al día. Distintas entidades — la UNGRD, Asocapitales, alcaldías, gobernaciones — publicaron consolidados diferentes en el mismo momento. No porque alguien mintiera. Porque cada una cortaba a una hora distinta, y durante los primeros días no había un consolidado nacional único.

Así se ve:

| Corte | Fallecidos | Heridos | Desaparecidos |
|-------|-----------|---------|---------------|
| 10 ago (preliminar, Asocapitales) | 132 | 570 | — |
| 12 ago (UNGRD) | 239 | 3.755 | 287 |
| 13 ago (UNGRD) | 281 | 3.971 | 379 |
| **15 ago, 6:30 p. m. (UNGRD)** | **289** | **3.937** | **143** |

Quince departamentos. Cuatrocientos cincuenta municipios.

Mira la última columna. Los desaparecidos pasaron de 379 a 143 en dos días.

Esa caída no es la corrección de un error de nadie. Son varios cientos de personas que aparecieron — que se reunieron con su familia, que estaban en un albergue, que fueron identificadas. Es, en el sentido más literal, el resultado de seres humanos cruzando listas. Voy a volver a eso más adelante en la serie, porque parte de ese cruce ocurrió en software que no existía la semana anterior.

Por departamento, con corte al 13 de agosto: Valle del Cauca 125, **Risaralda 94**, Chocó 14, Caldas 6, Quindío 3, Antioquia 1. Según Asocapitales, las ciudades capitales concentraron cerca del 75 % de los fallecidos. Este fue un desastre urbano.

---

## Pereira

[El Tiempo la llamó la ciudad más golpeada](https://www.eltiempo.com/justicia/investigacion/pereira-la-ciudad-mas-golpeada-por-el-terremoto-al-menos-67-victimas-mortales-3577462), y el conteo de edificios explica por qué.

El reporte temprano de la Alcaldía: **66 edificaciones con colapso total, 26 con colapso parcial**, más cientos de viviendas afectadas. Reportes posteriores subieron la cifra por encima de 80. Doscientas cuarenta y tres personas rescatadas. Doscientas setenta y nueve trasladadas a clínicas y hospitales. Catorce animales sacados de los escombros.

El edificio Invico, sobre la Avenida Circunvalar, es el que todo el mundo ha visto. Su piso doce simplemente no está. Tres personas quedaron atrapadas ahí y [no pudieron ser recuperadas](https://www.pulzo.com/nacion/terremoto-pereira-danos-edificio-invico-rescatados-balance-oficial-PP5272271), porque no quedó paso entre pisos.

Unos 267 rescatistas trabajaban al mismo tiempo, entre personal local y equipos USAR enviados desde Bogotá, Envigado, Yopal y Medellín. Solo Bogotá mandó cien personas. Y al lado de ellos, miles de vecinos. En Los Álamos y en Lorena, más de doscientas personas se concentraron en dos puntos a escarbar.

Se habilitaron albergues en el Parque El Vergel, el Parque El Oso, el Coliseo Mayor, el Parque Olaya, la Plaza de Ferias y el Estadio Mora Mora. [Dos llegaron al límite en cuestión de días](https://www.semana.com/nacion/pereira/articulo/terremoto-en-pereira-dos-albergues-ya-estan-al-limite-y-estos-son-los-puntos-disponibles/202651/).

El alcalde Mauricio Salazar declaró calamidad pública y emergencia económica, impuso toque de queda de seis de la tarde a cinco de la mañana tras reportes de saqueos, y después prohibió por completo la circulación de vehículos particulares desde la medianoche del 12 hasta las ocho de la noche del 17. El censo de edificaciones arrancó el 12.

La cifra que más se movió fue la de damnificados. Empezó en "2.000, y seguramente vamos a llegar a 4.000". Después llegó a **41.600 familias, alrededor de 140.000 personas afectadas**. No son números contradictorios — el primero era gente en albergues, el segundo es gente cuya vivienda quedó afectada. Pero si los ves citados uno al lado del otro sin esa distinción, parecen un desorden, y no lo son.

---

## Tres días sin nada

Gran parte de la ciudad se quedó sin agua, sin energía y sin internet al mismo tiempo, y así estuvo unos tres días. Algunos sectores todavía no tienen, o lo tienen intermitente, mientras escribo esto.

A nivel nacional, [Andesco reportó el 93 % del servicio eléctrico restablecido](https://www.lafm.com.co/economia/terremoto-colombia-reestablecimiento-servicio-electrico-terremoto-407808) en cuestión de días, y Pereira pasó del 75 % a cerca del 90 %. Algunos sectores siguieron sin luz a propósito, por seguridad, no por falta de capacidad. El agua volvió de forma progresiva mientras se inspeccionaban las redes de distribución dañadas. El gas siguió cortado en varias zonas mientras controlaban fugas.

La caída de telecomunicaciones es la que no se me quita de la cabeza como ingeniero. Según el MinTIC, **más de 3.400 estaciones base móviles quedaron fuera de servicio** — el 46,1 % de las estaciones revisadas en siete departamentos. Casi la mitad de la red celular de la región afectada, abajo.

El ministerio abrió espectro de forma temporal, volvió obligatoria la interconexión entre operadores para que una llamada pudiera salir por la red que estuviera viva, y liberó las llamadas a líneas de emergencia para usuarios sin saldo. [Starlink ofreció servicio gratuito hasta el 12 de septiembre](https://www.semana.com/tecnologia/articulo/starlink-anuncia-internet-satelital-gratis-a-colombia-tras-el-devastador-terremoto-asi-puede-recibirlo/202612/) y envió equipos para organismos de respuesta. Acá se instalaron antenas.

Menciono todo esto ahora porque voy a dedicar los siguientes artículos a hablar de aplicaciones, y no quiero hacerlo de forma deshonesta. Durante los primeros días, buena parte de la ciudad no tenía cómo abrir una.

---

## Cada quien ayudó desde donde estaba parado

Esta es la parte que no esperaba, y es la razón por la que estoy escribiendo.

La colaboración que salió de esto ha sido impresionante. Los médicos hicieron medicina. Los restaurantes cocinaron. El que tenía camión movió cosas. El que tenía un cuarto libre lo ofreció. Estudiantes clasificando donaciones en bodegas durante días enteros. Rescatistas que siguieron mucho más allá del punto en que alguien lo habría llamado razonable — El Colombiano publicó una entrevista con uno de ellos bajo el titular *"Estoy donde me toque, lo más importante es ayudar"*, y La Patria publicó otra titulada *"Estamos cansados pero satisfechos de ayudar"*. Esas son sus palabras, no las mías.

Cada quien aportó desde lo que sabe hacer.

Yo no sé sacar a nadie de un edificio colapsado. Nunca he sido tan consciente de eso como en esta última semana. Lo que sé hacer es software.

Así que eso fue lo que hicimos muchos. En cuestión de días había mapas de daños, tableros de centros de acopio, herramientas para cruzar reportes de personas desaparecidas, directorios de albergues, hasta un clasificado para mascotas perdidas. Algunas se construyeron en horas. Una de ellas, [Gravitas, se rehízo para la emergencia en 42 horas](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222), por un estudio de diseño que hasta esa semana trabajaba en turismo rural.

Yo ayudé a construir la landing de [Corag](https://corag.app/), donde un equipo está trabajando en conectar a quien necesita algo con quien puede darlo. Y empecé a hacer lo que resultó ser mi aporte real: anotar quién más está allá afuera, para que las piezas se puedan encontrar entre sí. Esa lista vive en [corag.app/ecosystem](https://corag.app/ecosystem/).

Ya son más de veinte herramientas. Hace unos días la gente detrás de varias de ellas se sentó a mirar cómo dejar de duplicarse. De esa conversación trata el resto de esta serie.

---

## Una nota sobre las cifras de esta serie

Cada número de estos artículos lleva fuente nombrada y fecha de corte. Lo hago por una razón aburrida y por una importante.

La aburrida es que estos números todavía se están moviendo. Cualquier cosa que escriba hoy va a estar desactualizada en algún margen el mes entrante, y un número sin fecha es un número que empieza a mentir en silencio a medida que envejece.

La importante es que toda esta serie sostiene que la información confiable importa — que los timestamps y la evidencia son la diferencia entre que la ayuda llegue y que se evapore. No puedo defender eso en un artículo que juega sucio con sus propios datos.

Entonces: nada de porcentajes inventados. Nada de "media ciudad quedó destruida". A mí me *parece* que media ciudad quedó destruida. Eso es una sensación, está en el tercer párrafo de este post, y está marcada como tal.

---

## Recursos

- [Servicio Geológico Colombiano — actualización oficial sobre el sismo de San José del Palmar](https://www2.sgc.gov.co/Noticias/Paginas/SGC-actualiza-la-informacion-sobre-el-sismo-ocurrido-en-San-Jose-del-Palmar-Choco.aspx)
- [Chequeado — doce preguntas y respuestas para entender qué pasó](https://chequeado.com/el-explicador/terremoto-en-colombia-10-preguntas-y-respuestas-para-entender-que-paso/)
- [El Tiempo — balance oficial de la UNGRD](https://www.eltiempo.com/colombia/otras-ciudades/balance-oficial-de-la-ungrd-tras-terremoto-de-magnitud-7-4-en-colombia-273-fallecidos-3-824-heridos-y-377-desaparecidos-3578196)
- [corag.app/ecosystem — directorio de las apps de ayuda construidas tras el terremoto](https://corag.app/ecosystem/)

---

Pereira no se quedó en silencio noventa segundos. Se quedó en silencio tres días — sin luz, sin agua, sin señal, y con mucha gente parada en la calle porque volver a entrar se sentía como una apuesta.

Lo que llenó ese silencio, con el tiempo, fue gente apareciendo con lo que tenía.

A seguir construyendo.
