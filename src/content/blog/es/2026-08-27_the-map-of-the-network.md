---
title: 'El mapa de la red'
description: 'Recorrido por las veinte herramientas ciudadanas que responden al terremoto en Colombia, categoría por categoría. Una descripción, no un ranking.'
pubDate: '2026-08-27'
tags: ['tech', 'civic-tech', 'colombia', 'web-development']
keywords: ['directorio de apps de ayuda terremoto Colombia', 'Pereira Responde API', 'Gravitas mapa Colombia', 'Encontrados.co personas desaparecidas', 'AquíAyuda centros de acopio', 'herramientas ciudadanas emergencia', 'plataformas de código abierto terremoto']
series: 'colombia-earthquake-2026'
seriesOrder: 4
draft: true
---

Antes que nada, el encuadre, porque cambia cómo deberías leer cada párrafo de abajo.

**Esto es una descripción, no un ranking.** Cada resumen sale de lo que cada herramienta dice de sí misma en su propio sitio público. No he auditado el código, la disponibilidad, la calidad de datos ni el gobierno de nadie. Nadie está siendo certificado. Nadie está siendo recomendado por encima de otro.

**Listar no es avalar.** [El directorio en el que se basa este artículo](https://corag.app/ecosystem/) lo dice en la propia página, y quiero repetirlo acá, porque la Policía viene [alertando sobre falsas campañas de donación y suplantación de organismos de socorro](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/) desde la primera semana. Un sello de confianza autoproclamado empeoraría esto, no lo mejoraría.

**"Sin API pública confirmada" significa exactamente eso.** Significa que no encontré documentación. La mayoría de estos equipos lleva días sin dormir. Ausencia de documentación no es ausencia de capacidad.

**Acá no aparece ningún dato personal.** Algunas de estas herramientas manejan reportes de personas desaparecidas. Describo la herramienta. Nunca describo un caso.

Aclarado eso.

---

## Ayuda directa y matching

Herramientas donde una persona publica una necesidad o un ofrecimiento y el sistema intenta conectarlos.

**[Corag Ayuda Directa](https://ayuda.corag.app)** — mapa vivo de solicitudes y personas disponibles. Publicas una necesidad o un ofrecimiento con contacto consentido, y las entregas quedan con evidencia pública. Documenta una API pública sin autenticación y un servidor MCP remoto. Es en la que yo he estado aportando, y por eso el siguiente artículo lo voy a dedicar a desarmar sus decisiones técnicas en vez de elogiarlas acá.

**[Pereira Unida](https://pereiraunida.com/)** — coordinación de ayuda ciudadana en Pereira y Dosquebradas: alimentos, herramientas, medicinas, voluntariado, red familiar, acopio.

**[SOS Terremoto](https://conectando-ayudas-colombia.com/)** — tablero compartido para publicar y atender solicitudes de ayuda.

**[Help Them Directly](https://helpthemdirectly.org/en/)** — directorio voluntario que conecta donantes con familias que recaudan para sí mismas. Su campaña principal es el terremoto de Venezuela 2026, con un formulario para Colombia al lado. Detalle importante, y lo dice el propio sitio: **no administra dinero.** Cada familia maneja sus propios canales.

---

## Daños y reportes

La categoría más grande, lo cual tiene sentido — después de un terremoto, la primera pregunta de todo el mundo es *si este edificio es seguro*.

**[Pereira Responde](https://pereiraresponde.co/)** — mapa ciudadano de daños en infraestructura de Pereira: edificios, vías, puntos de apoyo. Hasta tres fotos por reporte, más atajos a acopio y albergues cercanos. Publica una **API pública documentada** en `/api/docs`, lo que la mete en un club muy pequeño.

**[SismoVision](https://sismovision.com/)** — reportes ciudadanos de daño estructural, en concreto grietas, con orientación preliminar. El sitio es explícito en que esto no reemplaza una inspección profesional, y ese encuadre importa: la distancia entre "una herramienta me dijo que mi muro probablemente está bien" y "un ingeniero certificó mi edificio" es donde la gente se hace daño.

**[Mapa del terremoto](https://www.mapadelterremoto.com/)** — mapa abierto de daños del sismo del 10 de agosto: puntos de daño, albergues y acopio en varias ciudades.

**[Reporte CO](https://co.crafter.run/)** — plataforma abierta con privacidad por diseño que mapea daños, personas atrapadas o heridas, albergues y fallas de servicios.

**[Terremoto Colombia](https://terremotocolombia.co/)** — reportes, mapa de daños y enlaces a fuentes oficiales. Se describe como plataforma ciudadana libre y de código abierto para conectar reportes, recursos y equipos de respuesta, y como iniciativa independiente y no partidista.

**[Gravitas](https://mapa.gravitasworld.com/)** — mapeo ciudadano en tiempo real de edificios, centros de acopio y logística. Más sobre esta abajo.

---

## Acopio y logística

Dónde está lo físico, qué le falta y cómo moverlo.

**[AquíAyuda](https://www.aquiayuda.com/)** — hub nacional: centros de acopio por municipio mostrando qué falta y qué está cubierto, ayuda entre personas, ordenable por cercanía. **Agrega fuentes ajenas** (Ayudas Pereira, Corag, Pereira Responde, Pereira Unida) sin inventar datos.

**[Acopio / Ayudas Pereira](https://alluda.online/)** — centros de acopio por ciudad, con visibilidad de faltantes y excedentes, más registro de voluntarios y transportadores.

**[Unidos por Pereira](https://unidosporpereira.com/)** — albergues, acopio, comidas, ayuda y mascotas, organizados por tema, cada uno con hora de última actualización.

**[Pereira Ayuda](https://pereiraayuda.com/)** — directorio fechado de albergues, puntos de donación y hospitales abiertos en Pereira y Dosquebradas.

**[ayuda.red](https://ayuda.red/)** — mapa de infraestructura de ayuda más un registro de desaparecidos, canales de donación y guías oficiales.

**[Mapa de Ayuda — Gogó](https://soygogo.com/pereira-ayuda)** — puntos de ayuda en Pereira.

**[PereiraVive](https://pereiravive.com/)** — y esta merece más atención de la que está recibiendo.

Es un tablero comunitario y gratuito de arriendos para Pereira y municipios cercanos. Puedes buscar vivienda, publicar un aviso, fotografiar un letrero de "se arrienda" que viste en la calle y subirlo — y **reportar precios abusivos**. Sin cuenta.

Piensa en lo que significa esa última función. Entre cuarenta mil y ciento cuarenta mil personas de esta ciudad necesitan de repente dónde vivir, todas la misma semana. Ese es el escenario de manual para que los arriendos se dupliquen de un día para otro. Alguien miró eso y construyó una forma de que los vecinos lo denuncien públicamente. Es la pieza de software más silenciosamente furiosa de toda esta lista y me tomó tres pasadas por el directorio darme cuenta de que estaba ahí.

El sitio deja claro que es un tablero comunitario, no una inmobiliaria: verifica el inmueble en persona, no pagues por adelantado.

---

## Mascotas

**[Encuentra tu mascota](https://encuentratumascota.co/anuncios/se-busca)** — clasificados de "se busca" para reunir mascotas con su familia.

He visto gente en redes tratar esta categoría como algo frívolo. No lo es. Los equipos oficiales de rescate sacaron catorce animales de los escombros en Pereira. Para una familia que perdió la casa, el perro no es una nota al pie.

---

## Personas

La categoría más delicada por mucho, y donde las decisiones de diseño cuestan más caro.

**[Encontrados.co](https://encontrados.co/)** — hecha para rescatistas. Fotografías a alguien que está a tu cuidado, el sistema lo cruza contra reportes de desaparecidos, y **la foto se borra después del match**. Las familias también pueden reportar. Se construyó con voluntarios de Ni500 / Torrenegra.

Ese borrado es el diseño entero. El dato más valioso de este sistema es también el que más necesita dejar de existir un minuto después de lo necesario — fotografías de personas heridas, desorientadas o inconscientes, tomadas sin su consentimiento porque el consentimiento no era posible. Construir el paso de borrado desde el principio, en una semana, bajo esta presión, es la mejor decisión de ingeniería que he visto salir de esta emergencia.

**[SOS Pereira 2026](https://sospereira.com/)** — el portal ciudadano de la Alcaldía: reportes de desaparecidos, reporte de daños en edificaciones, censo de empresarios afectados, listados públicos y acceso para operadores.

Esta es de la Alcaldía. No es de Corag ni un proyecto de voluntarios. Lo digo de frente porque los directorios difuminan los orígenes, y confundir un canal municipal con una herramienta ciudadana les hace un flaco favor a los dos.

---

## La que tiene el método mejor documentado

De todo lo que hay acá, [Gravitas](https://mapa.gravitasworld.com/) es el caso que le mostraría a alguien que construye software, en parte porque [El Colombiano lo documentó](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222) y así no dependo de mi propia lectura.

Juan Camilo Garzón es diseñador y antropólogo, de Risaralda. Su estudio, Senza Create, llevaba cuatro años trabajando en turismo rural. Después del terremoto rehicieron la plataforma para uso de emergencia en **42 horas**.

Lo que integra: reportes ciudadanos, datos satelitales y georreferenciados de Copernicus, redes sociales, grupos oficiales de WhatsApp, y reportes de gobierno y alcaldías. Al momento de esa nota había recibido unos 250 reportes ciudadanos y 850 internos.

La parte que vale la pena robarse es cómo deciden qué es cierto. En palabras del propio Garzón:

> *"Si cinco personas reportan el mismo centro de acopio, eso nos ayuda a determinar que la información es verídica, más que un solo reporte que puede parecer inusual o no tener respaldo."*

Umbral de corroboración más IA más un administrador revisando antes de que algo llegue al mapa. No es "la IA decide". Es IA reduciendo el campo y un humano cerrándolo. Cualquiera que haya construido un sistema de reportes ciudadanos termina reinventando alguna versión de esto, normalmente después de quemarse. Ellos llegaron ahí en menos de dos días.

---

## Lo que falta en este mapa

Un directorio honesto debería decir qué no alcanza a ver.

No sé cuáles de estas herramientas van a seguir funcionando en tres meses. No conozco sus políticas de retención de datos más allá de lo que publican. No sé cuántas entradas de centros de acopio están desactualizadas en este momento, en ninguna de ellas, incluidas las que yo ayudo a mantener. Nadie ha auditado el traslape para ver cuántos reportes están duplicados en cuatro mapas porque el mismo vecino los subió en cuatro lados.

Y no sé — nadie sabe — si algo de esto cambió el desenlace para una sola persona. Me gustaría creer que sí. No lo puedo demostrar, y esta no es una serie donde me dé el lujo de afirmar cosas que no puedo demostrar.

Si manejas una de estas y la describí mal, [el directorio tiene un formulario](https://corag.app/ecosystem/), y una persona lee cada envío.

---

## Recursos

- [corag.app/ecosystem — el directorio vivo](https://corag.app/ecosystem/)
- [El Colombiano — la plataforma con IA que organiza ayudas, voluntarios y recursos](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222)
- [Documentación para desarrolladores de Corag](https://corag.app/developers)
- [Documentación de la API de Pereira Responde](https://pereiraresponde.co/api/docs)
- [Recomendaciones de la Policía Nacional para evitar estafas con donaciones](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/)

---

Veinte herramientas, seis categorías, un supuesto compartido: que la pieza del otro vale más leerla que reconstruirla.

Ese supuesto es más joven que la emergencia. Falta ver si le sobrevive.

A seguir construyendo.
