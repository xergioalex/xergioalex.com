---
title: 'Lo que sigue'
description: 'La fase de rescate dura semanas y la reconstrucción dura años. Cómo ayudar hoy, cómo no caer en estafas, y qué sobrevive cuando se apagan las cámaras.'
pubDate: '2026-09-03'
tags: ['tech', 'personal', 'civic-tech', 'colombia']
keywords: ['cómo ayudar a los damnificados del terremoto', 'evitar estafas con donaciones Colombia', 'cuánto cuesta la reconstrucción tras el terremoto', 'cómo aportar a proyectos de tecnología cívica', 'recuperación a largo plazo desastres', 'datos abiertos después de una emergencia', 'plan de reconstrucción Pereira']
series: 'colombia-earthquake-2026'
seriesOrder: 4
draft: true
---

La fase de rescate de un desastre dura unas dos semanas. La reconstrucción dura años, y para el tercer mes casi nadie está mirando.

De esa brecha quiero hablar, porque todo lo que aparece en esta serie se construyó durante las dos semanas.

---

## Dónde va la reconstrucción de verdad

El Gobierno declaró desastre nacional mediante el **Decreto 1171 del 11 de agosto de 2026**, seguido de tres días de duelo nacional y del anuncio de una emergencia económica para financiar la reconstrucción. A las familias afectadas se les prometieron subsidios de arriendo, suspensión de facturas de servicios y un mes de prórroga en las declaraciones tributarias.

Cuánto cuesta todavía está sin resolver, y prefiero mostrarte el rango en vez de escoger un número:

| Fuente | Estimación |
|--------|-----------|
| Estimaciones preliminares del Gobierno (vía Portafolio) | $20 billones COP, ~1 % del PIB |
| La República | US$6.350 millones, 1 % del PIB |
| Oxford Economics | US$990 – US$1.980 millones, 0,2–0,4 % del PIB |
| Modelo PAGER del USGS | 34 % de probabilidad de pérdidas entre US$1.000 y US$10.000 millones |

Esas cifras se contradicen por un orden de magnitud, y la razón no es que alguien mienta. Miden cosas distintas. Unas cuentan daño físico directo; otras, pérdida económica total incluyendo la actividad que no va a ocurrir; las del USGS son modelos probabilísticos automáticos publicados en las primeras horas, antes de que existiera censo alguno. Cualquiera que cite una de ellas como *el* número te está diciendo más sobre su argumento que sobre el daño.

En lo local: el gobernador de Risaralda, Juan Diego Patiño Ochoa, anunció que solicitaría unos **$67 mil millones COP** del sistema de regalías, dirigidos sobre todo a vivienda e infraestructura educativa. El censo de edificaciones de Pereira arrancó el 12 de agosto y es lo que con el tiempo va a convertir todo esto de estimación en hecho.

A nivel nacional: 81.506 viviendas averiadas y 14.493 destruidas, más 298 vías, 44 puentes, 59 acueductos, 241 centros de salud y 2.612 instituciones educativas.

Esas dos últimas categorías son la razón por la que esto no se acaba en un año.

---

## Si eres vecino

Arranca por la categoría, no por un enlace que te reenviaron. [El directorio](https://corag.app/ecosystem/) está organizado por lo que de verdad necesitas: albergues y acopio, reporte de daños, personas, mascotas, vivienda, ayuda directa.

Dos cosas concretas que vale la pena conocer y que casi nadie tiene en el radar:

- **[PereiraVive](https://pereiravive.com/)** es un tablero comunitario y gratuito de arriendos, y permite **reportar precios abusivos**. Si te acaban de doblar el arriendo, ahí es donde queda constancia.
- **[Encuentra tu mascota](https://encuentratumascota.co/anuncios/se-busca)** existe y funciona. Solo los equipos oficiales sacaron catorce animales de los escombros en Pereira.

Y revisa la fecha de cualquier dato operativo antes de moverte. Las necesidades de un centro de acopio cambian en cuatro horas.

---

## Si manejas una organización o un punto de acopio

Publica qué necesitas, publica también de qué te sobra, y **publica la hora en que actualizaste**.

La mitad del excedente importa más de lo que la gente cree. Un centro ahogado en ropa usada mientras tres cuadras más allá otro no tiene agua es la falla más común de todo este sistema, y es enteramente un problema de información.

Si puedes exponer tus datos en cualquier formato legible por máquina — así sea un archivo JSON que regeneras a mano dos veces al día — los agregadores pueden jalar de ti en vez de transcribirte. Esa es la diferencia entre estar en un mapa y estar en seis.

---

## Si eres desarrollador

**Lee antes de escribir.** Pregúntate si la cosa ya existe, y después si la puedes leer. [Pereira Responde publica una API documentada](https://pereiraresponde.co/api/docs). [La API pública de Corag](https://corag.app/developers) es sin autenticación e idempotente, con un servidor MCP al lado. Si una herramienta sobre la que quieres construir no tiene documentación pública, escríbele al equipo — la mayoría te pasa un endpoint, porque no están compitiendo contigo.

**Haz las escrituras idempotentes desde el día uno.** `source` + `externalId`. No cuesta nada ahora y cuesta una migración después.

**Ponle marca de tiempo a todo.**

**No toques datos personales que no necesites**, y borra los que sí necesitas apenas termine el trabajo — como [Encontrados.co](https://encontrados.co/) borra la foto después del match.

**Propón tu herramienta al directorio** si no está. Hay un formulario, lo lee una persona, y la inclusión no es automática. Y si encuentras algo mal descrito en el listado — incluido cualquier cosa que yo haya escrito en esta serie — dilo.

**No silencies las otras piezas.** En este ecosistema nadie gana por quedar de último en pie.

---

## Antes de donar

La Policía, a través de la DIJÍN, viene alertando desde la primera semana sobre un conjunto de estafas específicas, y vale la pena conocerlas por nombre:

- **Suplantación de organismos de socorro**, líderes sociales y funcionarios públicos, con falsas campañas de recolección. El Colombiano documentó [a alguien haciéndose pasar por director de Sanidad](https://www.elcolombiano.com/colombia/terremoto-alerta-por-estafadores-policia-suplantacion-director-sanidad-damnificados-EG39953869).
- **La llamada del familiar atrapado.** Alguien llama diciendo que tu familiar está atrapado o gravemente herido, para que el pánico te haga enviar dinero de inmediato.
- **Enlaces fraudulentos** por WhatsApp, SMS y redes sociales.

La recomendación oficial es validar por canales que puedas verificar de forma independiente: Cruz Roja, alcaldías, gobernaciones, Defensa Civil.

Agrego una mía, ya que la serie lleva seis artículos defendiéndola: **prefiere a quien te muestre evidencia de entrega antes que a quien te cuente la historia más urgente.** La urgencia es fácil de fingir. Un registro de entrega, menos.

A propósito no publico números de cuenta ni enlaces de pago en ninguna parte de esta serie. Si alguien lee esto en seis meses, cualquier canal que yo hubiera listado pudo haber cambiado de manos.

---

## Qué sobrevive cuando se apagan las cámaras

Esta es la parte que de verdad me preocupa.

Más de veinte herramientas se construyeron en unas dos semanas. Varias las hicieron dos o tres personas, de noche, a punta de adrenalina, sin financiación y sin plan más allá de la emergencia. [Gravitas se adaptó en 42 horas](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222) por un estudio cuyo negocio real es el turismo rural. En algún momento ese estudio tiene que volver al turismo rural.

La reconstrucción va para años. Nada de esta lista se construyó para durar años. Ese desfase no es un reproche a nadie — construir para la emergencia era lo correcto — pero es un problema real que llega en una fecha predecible.

No creo que la respuesta sea que las veinte se vuelvan productos sostenibles. La mayoría no lo hará, ni debería. Algunas ya son redundantes. Algunas resolvieron un problema que solo existió la semana uno.

Lo que yo creo que sobrevive son **los datos y las interfaces hacia ellos**. Un mapa es una renderización; el conjunto de datos de edificaciones dañadas, puntos de acopio, albergues y vivienda es el activo. Si esos datos son abiertos, documentados y legibles, cuando un mantenedor se queme o un dominio se venza, otro los puede retomar en una tarde. Si están encerrados dentro de una SPA sin API, se mueren con el proyecto y la próxima vez empezamos de cero.

Así que lo útil en el mes dos, en mi opinión, es poco glamoroso: sacar los datos de debajo de las interfaces. Documentar los endpoints. Escribir el esquema. Entregarle el histórico a alguien institucional — una universidad, la alcaldía, quien sea que todavía vaya a existir en 2029.

Esa es la versión donde el próximo terremoto arranca desde algo en vez de desde nada. Y va a haber un próximo. Colombia tiene unos 2.500 eventos sísmicos al mes, no los podemos predecir, y la única variable que controlamos es lo que hayamos construido y lo que hayamos dejado escrito.

---

## Recursos

- [corag.app/ecosystem — el directorio vivo](https://corag.app/ecosystem/)
- [Policía Nacional — cómo evitar estafas en emergencias](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/)
- [Portafolio — la estimación inicial del costo de reconstrucción](https://www.portafolio.co/economia/reconstruir-a-colombia-tras-el-terremoto-tendria-un-costo-inicial-de-20-billones-segun-estimaciones-preliminares-500175)
- [LA FM — Risaralda busca regalías para vivienda e infraestructura educativa](https://www.lafm.com.co/actualidad/risaralda-reconstruccion-viviendas-terremoto-colombia-2026-sesenta-y-siete-mil-millones-de-pesos-regalias-408019)
- [Documentación para desarrolladores de Corag](https://corag.app/developers)

---

En el primer artículo escribí que Pereira no se quedó en silencio noventa segundos — se quedó en silencio tres días, y lo que terminó llenando ese silencio fue gente apareciendo con lo que tenía.

Aparecer nunca fue la parte difícil. Los colombianos somos extremadamente buenos para las primeras dos semanas. En lo que históricamente somos peores es en el mes siete, cuando la noticia ya se movió y la familia del albergue sigue en el albergue.

Lo que vayamos a dejar de todo esto — los datos, el código, la costumbre de leer el trabajo del otro en vez de reconstruirlo — hay que construirlo ahora, mientras a todo el mundo todavía le importa.

A seguir construyendo.
