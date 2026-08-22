---
title: 'Por qué aparecieron veinte apps en una semana'
description: 'Días después del terremoto había más de veinte apps ciudadanas de ayuda. El problema nunca fue tener muchas herramientas. Fue la ausencia de puentes.'
pubDate: '2026-08-24'
tags: ['tech', 'civic-tech', 'colombia', 'personal']
keywords: ['apps de ayuda terremoto Colombia', 'tecnología cívica emergencias', 'por qué hay tantas apps de emergencia', 'información desactualizada en emergencias', 'centros de acopio Pereira', 'coordinación por WhatsApp en emergencias', 'datos abiertos terremoto']
series: 'colombia-earthquake-2026'
seriesOrder: 3
draft: true
---

La primera noche, el problema de información se veía así.

Un grupo de WhatsApp con 400 personas. Alguien publica que un centro de acopio en la Avenida 30 de Agosto necesita agua. Cuarenta personas lo reenvían. Dos horas después ese centro está lleno y dejó de recibir, pero el mensaje ya está en otros nueve grupos y va a seguir circulando dos días más. En el mismo hilo hay una nota de voz diciendo que un puente está a punto de fallar. Nadie sabe quién la grabó. Todo el mundo la reenvía.

Mientras tanto una señora está tratando de averiguar si el albergue más cercano a su mamá todavía recibe gente, y lo más reciente que encuentra es la captura de pantalla de una lista que no tiene fecha.

Eso no es una falla de buena voluntad. Buena voluntad sobraba. Es una falla de infraestructura, y la infraestructura que falló no era solo digital.

---

## El dato que reencuadra todo

Según el MinTIC, **más de 3.400 estaciones base móviles quedaron fuera de servicio**. En siete departamentos, el 46,1 % de las estaciones revisadas estaba caído.

Casi la mitad de la red celular de la región afectada, abajo, justo en el momento en que varios millones de personas necesitaban coordinarse.

La respuesta del ministerio fue interesante desde el punto de vista de ingeniería: abrió espectro radioeléctrico de forma temporal, volvió obligatoria la interconexión entre operadores — para que tu llamada pudiera salir por la red que siguiera en pie, sin importar a quién le pagas — y liberó las llamadas a líneas de emergencia para usuarios sin saldo. La ANE y el MinTIC además empezaron a evaluar una banda para conectividad satelital *direct-to-device*, de modo que los celulares compatibles pudieran hablar con un satélite sin ninguna red terrestre de por medio. [Starlink ofreció servicio gratuito hasta el 12 de septiembre](https://www.semana.com/tecnologia/articulo/starlink-anuncia-internet-satelital-gratis-a-colombia-tras-el-devastador-terremoto-asi-puede-recibirlo/202612/) y envió equipos a los organismos de respuesta.

Así que cuando digo que WhatsApp y las hojas de cálculo no escalan en una emergencia, quiero ser preciso. No es que la gente estuviera usando la herramienta equivocada. Es que durante los primeros días, en buena parte de la ciudad, *no había* herramienta. La información se movió por radio, por papel pegado en una pared, y porque alguien caminó hasta donde estabas a contarte.

Todo lo que se construyó esa primera semana tuvo que sobrevivir a eso.

---

## "¿Esto no es otra app más?"

Esta es la crítica, y es lo suficientemente razonable como para merecer una respuesta de verdad en vez de una defensiva.

Hoy existen más de veinte herramientas de ayuda para esta emergencia. Mapas de daños. Tableros de centros de acopio. Directorios de albergues. Cruce de personas desaparecidas. Un clasificado de mascotas perdidas. Un tablero comunitario de arriendos. Un portal municipal. Varias se traslapan. Algunas las construyó gente que no sabía que las otras existían.

La lectura escéptica es: esto es ego. Todo el mundo quiso construir lo suyo en vez de aportar a lo de otro, y el resultado es fragmentación disfrazada de solidaridad.

Lo he pensado con honestidad y no creo que eso sea lo que pasó, aunque admito que existe una versión de la historia donde sí.

Esto es lo que yo creo que significa fragmentación.

Fragmentación no es *muchas herramientas*. Fragmentación es **muchas herramientas que no se pueden leer entre sí**.

Piensa en lo que realmente hacen estas cosas:

- SismoVision recibe fotos de grietas en muros y da orientación estructural preliminar.
- Alluda lleva el control de qué le falta a cada centro de acopio, por ciudad.
- Encontrados.co le permite a un rescatista fotografiar a alguien que está a su cuidado y cruzarlo contra reportes de desaparecidos.
- SOS Pereira es la Alcaldía levantando un censo de empresarios afectados.

Son cuatro modelos de datos distintos, cuatro usuarios distintos, cuatro ciclos de actualización distintos y cuatro modos de falla distintos. Una herramienta de reporte de grietas no es una herramienta de cadena de suministro. Un censo municipal no es ayuda persona a persona. Pedirle a una sola app que haga todo produce algo que no hace bien nada y que se demora tres meses en construir — y no teníamos tres meses.

La especialización fue la respuesta correcta. Lo que faltaba no era consolidación. Eran **puentes**.

---

## La frescura del dato es el producto entero

Si tuviera que nombrar la única decisión de diseño que separa una herramienta de emergencia útil de una dañina, sería esta: ¿te dice *cuándo* fue cierta la información por última vez?

Las necesidades de un centro de acopio cambian en cuatro horas. Un albergue se llena. Un hospital reabre. Una vía se despeja. En ese contexto, una lista pulida sin fecha es peor que una fea con fecha, porque la pulida convence más.

Algunas de estas herramientas lo entendieron de inmediato. [Unidos por Pereira](https://unidosporpereira.com/) muestra la hora de última actualización en cada sección. [Pereira Ayuda](https://pereiraayuda.com/) fecha su directorio de albergues, puntos de donación y hospitales abiertos en Pereira y Dosquebradas.

Eso no es un detalle simpático. En una semana en la que la cifra oficial de fallecidos se publicó de cuatro maneras distintas la misma tarde por cuatro entidades distintas — todas honestas, todas cortando a horas diferentes — la marca de tiempo *es* el mecanismo de confianza.

---

## El agregador que no inventa nada

Si quieres una prueba de que el efecto de red funciona sin que nadie tenga que morir, mira [AquíAyuda](https://www.aquiayuda.com/).

Centraliza la información de ayuda del terremoto para todo el país: centros de acopio por municipio con qué necesitan y qué ya tienen, ayuda entre personas, todo ordenable por cercanía. Y lo hace **agregando fuentes ajenas** — Ayudas Pereira, Corag, Pereira Responde, Pereira Unida — sin inventar datos propios.

Esa es la forma de la respuesta. No una app para gobernarlas a todas. Una capa especializada que lee a las demás con honestidad y agrega lo que ninguna podía hacer sola: una vista nacional.

Solo funciona si las piezas de abajo son legibles. Por eso, de toda esta lista, las dos entradas que más me animan son las aburridas: [Pereira Responde](https://pereiraresponde.co/) publica una API pública documentada, y Corag publica una API pública sin autenticación más un servidor MCP remoto. No porque las APIs sean emocionantes, sino porque sobre una app con API se puede construir. Una app sin API es un callejón sin salida con buena interfaz.

---

## El mapa de la red

Hace unos días la gente detrás de varias de estas herramientas se sentó a hablar. No para fusionarse — para dejar de pisarse. De esa conversación salió [corag.app/ecosystem](https://corag.app/ecosystem/), y es donde he puesto la mayor parte de mis propias horas.

Es un directorio. Seis categorías: ayuda directa, reportes de daños, acopio y logística, mascotas, personas y el canal municipal. Cada entrada describe lo que la herramienta dice de sí misma, enlaza a ella, y anota si pudimos confirmar una API pública. La inclusión es por formulario y la revisa una persona.

Dos cosas que insistí en dejar así, y en las que volvería a insistir:

**Listar no es avalar.** La página lo dice explícitamente. En una emergencia donde [la Policía viene alertando sobre falsas campañas de donación y suplantación de organismos de socorro](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/), lo último que le sirve a alguien es un sello de confianza autoproclamado. Describir una herramienta no es responder por ella, y fingir lo contrario convertiría al directorio en parte del problema.

**"Sin API confirmada" significa que no pudimos confirmarla, no que no exista.** La mayoría de estos equipos está agotada y produciendo. Ausencia de documentación no es ausencia de capacidad, y escribirlo al revés sería un golpe barato contra gente que hace el mismo trabajo que yo.

La línea que está arriba en esa página es la que me quedaría si tuviera que botar todo lo demás: **No competimos. Nos alimentamos.**

---

## Una cosa más, y lo dejo ahí

Vale la pena notarlo sin volverlo el tema del artículo: mientras el lado ciudadano estaba ocupado averiguando cómo interoperar, la respuesta nacional pasó por un debate público sobre lo contrario — Colombia [restringió inicialmente equipos internacionales de rescate](https://es.wikipedia.org/wiki/Terremoto_de_Colombia_de_2026), de México, China, El Salvador y OCHA de la ONU, con el argumento de que la capacidad nacional era suficiente. El equipo de 47 personas de Ecuador sí fue aceptado; las brigadas mexicanas llegaron por su cuenta.

No tengo autoridad para juzgar esa decisión y no lo voy a intentar. Solo me cuesta ignorar que "¿dejamos que otros ayuden con esto?" fue la pregunta viva en los dos extremos de la respuesta, y que los dos extremos la contestaron distinto.

---

## Recursos

- [corag.app/ecosystem — el directorio de apps de ayuda](https://corag.app/ecosystem/)
- [AquíAyuda — agregador nacional de centros de acopio](https://www.aquiayuda.com/)
- [Pereira Responde — mapa de daños con API pública](https://pereiraresponde.co/)
- [DPL News — telcos, gobierno y plataformas activan medidas de emergencia](https://dplnews.com/terremoto-en-colombia-activan-medidas-emergencia/)
- [El País — casi la mitad de las antenas móviles fuera de servicio](https://www.elpais.com.co/colombia/terremoto-en-colombia-casi-la-mitad-de-las-antenas-moviles-estan-fuera-de-servicio-estos-son-los-departamentos-mas-afectados-1143.html)

---

Veinte herramientas no son el problema. Veinte herramientas que no se pueden leer entre sí sí lo son, y ese problema tiene solución — es la única parte de toda esta catástrofe que está completamente en nuestras manos.

A seguir construyendo.
