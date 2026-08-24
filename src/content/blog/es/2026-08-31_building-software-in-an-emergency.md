---
title: 'Construir software en una emergencia'
description: 'En días había más de veinte herramientas ciudadanas de ayuda. Por qué fueron tantas, qué aprendí construyendo una, y lo que aún no me deja tranquilo.'
pubDate: '2026-08-31'
tags: ['tech', 'civic-tech', 'colombia', 'ai-agents', 'mcp', 'web-development']
keywords: ['apps de ayuda terremoto Colombia', 'tecnología cívica emergencias', 'por qué hay tantas apps de emergencia', 'construir software en un desastre', 'API pública sin autenticación', 'idempotencia source externalId', 'servidor MCP para emergencias', 'privacidad datos personas desaparecidas', 'frescura del dato timestamps API', 'protocolo Cabuya interoperabilidad']
series: 'colombia-earthquake-2026'
seriesOrder: 2
draft: true
---

La primera noche, el problema de información se veía así.

Un grupo de WhatsApp con cuatrocientas personas. Alguien publica que un centro de acopio en la Avenida 30 de Agosto necesita agua. Cuarenta personas lo reenvían. Dos horas después ese centro está lleno y dejó de recibir, pero el mensaje ya está en otros nueve grupos y va a seguir circulando dos días más. En el mismo hilo hay una nota de voz diciendo que un puente está a punto de fallar. Nadie sabe quién la grabó. Todo el mundo la reenvía.

Mientras tanto una señora está tratando de averiguar si el albergue más cercano a su mamá todavía recibe gente, y lo más reciente que encuentra es la captura de pantalla de una lista sin fecha.

Eso no fue una falla de buena voluntad. Buena voluntad sobraba.

---

## Lo que falló no fue la buena voluntad

En el capítulo anterior conté que casi la mitad de la red celular de la región se cayó: **3.403 estaciones base fuera de servicio**, el 46,1 % de las revisadas en siete departamentos. Vale la pena repetirlo acá porque es la restricción que condicionó todo lo que se construyó esa semana.

Cuando digo que WhatsApp y las hojas de cálculo no escalan en una emergencia, quiero ser preciso. No es que la gente estuviera usando la herramienta equivocada. Es que durante los primeros días, en buena parte de la ciudad, **no había herramienta**. La información se movió por radio, por papel pegado en una pared, y porque alguien caminó hasta donde estabas a contarte.

Todo lo que apareció después tuvo que sobrevivir a eso.

---

## "¿Esto no es otra app más?"

Es la crítica obvia, y es lo bastante razonable como para merecer una respuesta de verdad en vez de una defensiva.

Hoy existen más de veinte herramientas de ayuda para esta emergencia. Mapas de daños. Tableros de centros de acopio. Directorios de albergues. Cruce de personas desaparecidas. Un clasificado de mascotas perdidas. Un tablero comunitario de arriendos. Un portal municipal. Varias se traslapan. Algunas las construyó gente que no sabía que las otras existían.

La lectura escéptica es que esto fue ego: todo el mundo quiso construir lo suyo en vez de aportar a lo de otro, y el resultado es fragmentación disfrazada de solidaridad.

Lo he pensado con honestidad y no creo que sea lo que pasó, aunque admito que existe una versión de la historia donde sí.

**Fragmentación no es tener muchas herramientas. Es tener muchas herramientas que no se pueden leer entre sí.**

Mira lo que estas cosas hacen de verdad. SismoVision recibe fotos de grietas en muros y da orientación estructural preliminar. Alluda lleva el control de qué le falta a cada centro de acopio, por ciudad. [Encontrados.co](https://encontrados.co/) le permite a un rescatista fotografiar a alguien que está a su cuidado y cruzarlo contra reportes de desaparecidos. SOS Pereira es la alcaldía levantando un censo de empresarios afectados.

Son cuatro modelos de datos distintos, cuatro usuarios distintos, cuatro ciclos de actualización distintos y cuatro modos de falla distintos. Una herramienta de reporte de grietas no es una herramienta de cadena de suministro. Un censo municipal no es ayuda persona a persona. Pedirle a una sola app que haga todo produce algo que no hace bien nada y que se demora tres meses en construir, y no teníamos tres meses.

La especialización fue la respuesta correcta. Lo que faltaba no era consolidación. Eran puentes.

Lo que sigue es lo que aprendí construyendo uno de esos puentes, en el orden en que me lo fui encontrando, incluido lo que todavía no me deja tranquilo.

---

## La marca de tiempo es el producto

Si tuviera que quedarme con una sola decisión de diseño que separa una herramienta de emergencia útil de una dañina, sería esta: **¿le dice al usuario cuándo fue cierta la información por última vez?**

Todo lo operativo en esta emergencia tenía una vida útil que se medía en horas. Un centro de acopio deja de recibir. Un albergue se llena. Un hospital reabre. Una vía se despeja. Un edificio que amaneció bien recibió una réplica de 4,8 de madrugada.

El instinto cuando estás produciendo rápido es renderizar el dato limpio y seguir. La jugada correcta es más fea: muestra la marca de tiempo siempre, incluso cuando te avergüence. "Actualizado hace seis horas" es más útil que una tarjeta bonita que insinúa una frescura que no tiene. Una lista pulida sin fecha es peor que una fea con fecha, porque la pulida convence más.

[Unidos por Pereira](https://unidosporpereira.com/) y [Pereira Ayuda](https://pereiraayuda.com/) lo hicieron bien desde el primer día. Yo lo noté antes de copiarlo, lo cual es su propia lección pequeña.

El corolario es más duro: si no puedes refrescar un conjunto de datos, dilo, o bájalo. Un directorio desactualizado que parece vivo manda a alguien a cruzar la ciudad, en una semana sin gasolina y con circulación restringida, hasta una puerta cerrada.

---

## Lo que no se debe hacer, aunque se pueda

Esta es la tensión de verdad y no se resuelve limpiamente: producir rápido contra no hacer daño.

La lista de lo que un desarrollador no debería hacer en una emergencia resultó mucho más específica de lo que esperaba.

**No hagas scraping de datos personales.** Los listados de personas desaparecidas son públicos en un contexto específico y para un propósito específico. Copiarlos a tu propia base porque "ayuda al cruce" crea un registro permanente que nadie consintió.

**No publiques teléfonos privados**, aunque alguien haya puesto el suyo en un grupo de WhatsApp. Un grupo de cuatrocientos no es la internet pública.

**No prometas lo que no puedes sostener.** Si tu app insinúa que alguien va a aparecer, alguien tiene que aparecer de verdad.

**No inventes rankings de confianza.** Nada de listas de organizaciones verificadas, ni sellos, ni calificaciones de organismos de socorro. No tienes la autoridad, y la Policía ya está lidiando con [gente suplantando organismos de socorro y funcionarios públicos](https://www.elcolombiano.com/colombia/terremoto-alerta-por-estafadores-policia-suplantacion-director-sanidad-damnificados-EG39953869).

**No pongas un botón hacia un canal que no verificaste hoy.**

El mejor contraejemplo de todo el ecosistema es [Encontrados.co](https://encontrados.co/), al que sigo volviendo. Los rescatistas fotografían a alguien que está a su cuidado, el sistema lo cruza contra reportes de desaparecidos, y **la foto se borra después del match**. El dato más valioso del sistema es también el que más necesita dejar de existir. Construyeron el borrado desde el principio, en una semana, bajo presión. Esa es la vara.

---

## La decisión de la que menos seguro estoy

Corag documentó una **API pública sin autenticación** durante la emergencia. Cualquiera puede leer la base de necesidades y cualquiera puede escribir en ella. El razonamiento era directo: la fricción es el enemigo cuando otros equipos están intentando integrarse a las dos de la mañana, y un proceso de solicitud de llave que nadie atiende equivale a no tener API.

Creo que fue la decisión correcta para las primeras semanas. También es la que peor defendería en una sala tranquila, y prefiero dejar escrito el intercambio real en vez de la versión de folleto.

**Lo que ganas** es una base sobre la que cualquiera puede construir de verdad. Bots, tableros, otras aplicaciones y agregadores pueden leer y escribir sin pedir permiso ni esperar a nadie.

**A qué quedas expuesto** es a spam, a envenenamiento de datos y a que alguien inunde el mapa con necesidades falsas para hacer ver un barrio como desatendido. Nada lo impide estructuralmente. Todas las mitigaciones quedan aguas abajo, y las mitigaciones aguas abajo son las que construyes después de que algo salió mal.

**Qué haría distinto, en frío:** dejar las lecturas abiertas y poner la escritura detrás de algo barato. No un formulario de solicitud, sino algo automático, tipo un token por fuente que puedas emitirte solo y que se revoque cuando una fuente se porte mal. Conservas la fricción cero y ganas trazabilidad. No empujé por eso en la semana uno porque la semana uno no era la semana para eso, y honestamente no sé si eso fue buen criterio o una racionalización.

---

## Idempotencia, o la diferencia entre integrar y duplicar

De esta sí estoy seguro, y es el punto menos glamoroso de la lista.

Cuando cinco clientes distintos pueden escribir la misma necesidad en la misma base, vas a terminar con la misma necesidad cinco veces a menos que la API se niegue. La [API pública de Corag](https://ayuda.corag.app/api/public/openapi.json) es idempotente por diseño: cada escritura lleva un `source` y un `externalId`, y ese par siempre resuelve al mismo registro.

Eso es todo. Ese es el mecanismo completo. Y es la diferencia entre una base compartida y un botadero.

Sin eso, cada integración empeora los datos. Con eso, un agregador puede resincronizar cada diez minutos sin miedo, y un equipo que se cayó un día puede reproducir todo lo que se perdió. Si estás construyendo algo en lo que otros van a escribir, esto es lo primero que hay que hacer bien. En el día uno no cuesta casi nada. En el día treinta cuesta una migración y un script de deduplicación.

---

## Cuando el que consulta no es una persona

Corag también expone un [servidor MCP remoto](https://ayuda.corag.app/mcp), con herramientas del estilo *listar emergencias*, *publicar una solicitud*, *publicar un ofrecimiento*.

Si todavía no te has topado con MCP, es un protocolo que le permite a un agente de IA descubrir y llamar herramientas. Más o menos lo que una especificación OpenAPI hace por un desarrollador, salvo que el consumidor es un modelo y no una persona escribiendo código de integración.

Por qué importa en una emergencia no tiene que ver con la palabra de moda. Tiene que ver con que el conjunto de personas que podría consultar útilmente la base de necesidades es mucho más grande que el conjunto de personas capaces de escribir un cliente HTTP. Una coordinadora de voluntarios con un agente puede preguntar qué se necesita en Dosquebradas ahora mismo y obtener una respuesta real de la base viva, sin que nadie le construya un tablero. Un bot de WhatsApp de un barrio puede publicar una solicitud sin que un desarrollador lo cablee.

Voy a ser honesto: esta es la pieza en la que es más probable que me esté equivocando sobre el impacto. Es lo más nuevo y lo menos probado de la lista. Pero de todo lo que sacamos, es lo que me hizo pensar que lo que está cambiando es la forma del software cívico, y no solo su velocidad.

---

## Verificación por corroboración, con un humano cerrando

El mejor caso que vi de esto es [Gravitas](https://mapa.gravitasworld.com/), la plataforma que un estudio de diseño de Risaralda rehízo para la emergencia en 42 horas.

Su regla, [como se la describió Juan Camilo Garzón a El Colombiano](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222): cinco personas reportando el mismo centro de acopio suben la confianza mucho más que un reporte solitario que se ve raro o sin respaldo. La IA reduce, un administrador confirma, y ahí sí llega al mapa.

Lo que quiero subrayar es la dirección del ciclo. El modelo no es quien decide. El modelo es el filtro que hace manejable la revisión humana cuando llegan ochocientos cincuenta reportes y son cuatro personas.

Cualquiera que construya reportes ciudadanos termina llegando a alguna versión de esto, normalmente después de publicar algo falso. Ellos llegaron en 42 horas.

---

## Diseñar para una red que no está

Si tu app asume conexión viva, no funciona el día que importa.

Lo que eso implica en concreto: cargas pequeñas, caché agresivo, un estado offline de solo lectura que sirva, no bloquear en scripts de terceros y, esta es la parte que a los ingenieros nos cuesta, una respuesta a cómo llega esta información a alguien que no tiene señal.

La respuesta honesta para la mayoría de estas herramientas, incluidas en las que yo trabajé, es que no llega. Llega a alguien que sí tiene señal y que después camina hasta allá y le cuenta. Lo cual está bien, siempre que diseñes sabiendo que ese es el último salto, y no construyas como si el celular en el albergue fuera el destino final.

---

## No reconstruyas lo que ya existe

El impulso más fuerte en las primeras 48 horas es construirlo todo tú, porque integrarse con el proyecto a medio terminar de otro se siente más lento que arrancar limpio.

No lo es, y la cuenta no está ni cerca. Cuatro equipos construyendo cuatro mapas de acopio producen cuatro conjuntos de datos incompletos y cuatro grupos de usuarios confundidos. Un equipo construyendo un mapa y tres equipos leyendo su API producen un conjunto de datos que mejora cada hora.

La prueba está en [AquíAyuda](https://www.aquiayuda.com/), que centraliza la información de ayuda para todo el país agregando fuentes ajenas sin inventar datos propios. Esa es la forma de la respuesta: no una app para gobernarlas a todas, sino una capa especializada que lee a las demás con honestidad y agrega lo que ninguna podía hacer sola. Solo funciona si las piezas de abajo son legibles, y por eso las dos entradas que más me animan de todo el ecosistema son las aburridas: [Pereira Responde](https://pereiraresponde.co/) publica una API documentada, y Corag publica la suya sin autenticación. Sobre una app con API se puede construir. Una app sin API es un callejón sin salida con buena interfaz.

De esa conversación entre equipos salieron dos cosas. Una es [corag.app/ecosystem](https://corag.app/ecosystem/), el directorio donde he puesto la mayor parte de mis horas: seis categorías, cada entrada describe lo que la herramienta dice de sí misma, enlaza a ella y anota si pudimos confirmar una API pública. La otra es [Cabuya](https://cabuya.org/es/), un protocolo abierto para que las aplicaciones publiquen y lean los mismos datos sin depender de que alguien las autorice.

Dos cosas del directorio en las que insistí, y en las que volvería a insistir.

**Listar no es avalar.** La página lo dice explícitamente. En una emergencia donde [la Policía viene alertando sobre falsas campañas de donación](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/), lo último que le sirve a alguien es un sello de confianza autoproclamado. Describir una herramienta no es responder por ella.

**"Sin API confirmada" significa que no pudimos confirmarla, no que no exista.** La mayoría de estos equipos está agotada y produciendo. Ausencia de documentación no es ausencia de capacidad, y escribirlo al revés sería un golpe barato contra gente que hace el mismo trabajo que yo.

Y lo que nadie ha medido todavía: cuántas entradas de centros de acopio están desactualizadas en este momento, en cualquiera de estas herramientas, incluidas las que yo ayudo a mantener. Nadie ha auditado el traslape para ver cuántos reportes están duplicados en cuatro mapas porque el mismo vecino los subió en cuatro lados. Tampoco sé cuáles van a seguir funcionando en tres meses. Un directorio honesto debería decir qué no alcanza a ver, y esas tres cosas no las ve ninguno.

---

## Qué hizo la IA de verdad, y qué no

De lo que todo el mundo quiere hablar es de que se construyeron aplicaciones enteras en horas. Eso pasó. Gravitas se rehízo en 42 horas por un estudio que venía trabajando en turismo rural. Existen más de veinte herramientas que hace tres semanas no existían. Parte de esa velocidad es inequívocamente nueva.

Esto es lo que pongo al lado.

Nadie puede demostrar que algo de esto salvó una vida. Ni Corag, ni ninguna de las otras. El conteo de desaparecidos [se movió cientos de casos](https://www.eltiempo.com/colombia/otras-ciudades/balance-oficial-de-la-ungrd-tras-terremoto-de-magnitud-7-4-en-colombia-273-fallecidos-3-824-heridos-y-377-desaparecidos-3578196) en pocos días, y me encantaría reclamar una tajada de eso. No puedo. El cruce que produjo esa cifra ocurrió entre hospitales, albergues, registros oficiales, redes familiares y, en algún punto de la mezcla, software. Desenredar la contribución no es posible, y fingir lo contrario sería exactamente la conducta contra la que argumenta esta serie.

Lo que la IA sí hizo con claridad fue acortar la distancia entre que a alguien se le ocurra una herramienta y que la herramienta exista. Eso es real y es enorme. Lo que no hizo fue decidir qué construir, decidir qué es cierto, ni responder por una respuesta equivocada. Esas tres se quedaron enteras con nosotros, y esta semana me hizo pensar que se van a quedar más tiempo del que asume la conversación actual.

---

## Recursos

- [corag.app/ecosystem — el directorio de herramientas de ayuda](https://corag.app/ecosystem/)
- [Cabuya — protocolo abierto para que las apps de ayuda se lean entre sí](https://cabuya.org/es/)
- [Documentación para desarrolladores de Corag](https://corag.app/developers)
- [Especificación OpenAPI pública de Corag](https://ayuda.corag.app/api/public/openapi.json)
- [Servidor MCP de Corag](https://ayuda.corag.app/mcp)
- [Documentación de la API de Pereira Responde](https://pereiraresponde.co/api/docs)
- [AquíAyuda — agregador nacional de centros de acopio](https://www.aquiayuda.com/)
- [Encontrados.co — cruce de reportes con borrado de la foto tras el match](https://encontrados.co/)
- [El Colombiano — cómo verifica Gravitas los reportes ciudadanos](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222)
- [Plan de contingencia del MinTIC para las comunicaciones](https://laopinion.co/colombia/mintic-activa-plan-de-contingencia-para-garantizar-las-comunicaciones-tras-terremoto)
- [El País — casi la mitad de las antenas móviles fuera de servicio](https://www.elpais.com.co/colombia/terremoto-en-colombia-casi-la-mitad-de-las-antenas-moviles-estan-fuera-de-servicio-estos-son-los-departamentos-mas-afectados-1143.html)
- [DPL News — telcos, gobierno y plataformas activan medidas de emergencia](https://dplnews.com/terremoto-en-colombia-activan-medidas-emergencia/)
- [Policía Nacional — recomendaciones para evitar estafas con donaciones](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/)

---

El resumen incómodo es que las partes difíciles de esto nunca fueron técnicas. Producir fue lo fácil. Decidir qué merecía existir, qué merecía borrarse y qué no teníamos derecho a reclamar: ahí estuvo todo el trabajo real.

A seguir construyendo. Con cuidado.
