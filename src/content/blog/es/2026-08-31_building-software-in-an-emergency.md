---
title: 'Construir software en una emergencia'
description: 'Nueve cosas que aprendí haciendo software de ayuda tras el terremoto: datos que caducan, PII, una API pública sin autenticación, y qué haría distinto.'
pubDate: '2026-08-31'
tags: ['tech', 'civic-tech', 'ai-agents', 'mcp', 'web-development']
keywords: ['construir software en un desastre', 'API pública sin autenticación ventajas y riesgos', 'idempotencia source externalId', 'servidor MCP para emergencias', 'privacidad datos personas desaparecidas', 'apps offline first emergencia', 'frescura del dato timestamps API']
series: 'colombia-earthquake-2026'
seriesOrder: 5
draft: true
---

Este es el artículo que más he reescrito, porque la versión honesta siempre termina siendo menos halagadora que el primer borrador.

La versión fácil dice: los desarrolladores respondimos rápido, la IA nos dejó construir aplicaciones enteras en horas, qué impresionante. Todo eso es cierto y algo de eso ya lo dije. Pero si lo único que me llevo de esto es que fuimos rápidos, no aprendí nada que valga la pena escribir.

Así que van nueve cosas, en el orden en que me las encontré, incluidas las que todavía no me dejan tranquilo.

---

## 1. El dato caduca, y fingir lo contrario es el modo de falla

Todo lo operativo en esta emergencia tenía una vida útil que se medía en horas. Un centro de acopio deja de recibir. Un albergue se llena. Un hospital reabre. Una vía se despeja. Un edificio que ayer estaba bien recibió una réplica de 4,8 de madrugada.

El instinto cuando estás produciendo rápido es renderizar el dato limpio y seguir. La jugada correcta es más fea: **muestra la marca de tiempo, siempre, incluso cuando te avergüence.** "Actualizado hace 6 horas" es más útil que una tarjeta bonita que insinúa una frescura que no tiene.

[Unidos por Pereira](https://unidosporpereira.com/) y [Pereira Ayuda](https://pereiraayuda.com/) lo hicieron bien desde el primer día. Yo lo noté antes de copiarlo, lo cual es su propia lección pequeña.

El corolario es más duro: si no puedes refrescar un conjunto de datos, dilo, o bájalo. Un directorio desactualizado que parece vivo manda a alguien a cruzar la ciudad, en una semana sin gasolina y con circulación vehicular restringida, hasta una puerta cerrada.

---

## 2. Producir rápido contra no hacer daño

Esta es la tensión de verdad y no se resuelve limpiamente.

La lista de lo que un desarrollador no debería hacer en una emergencia resultó mucho más específica de lo que esperaba:

- **No hagas scraping de datos personales.** Los listados de personas desaparecidas son públicos en un contexto específico y para un propósito específico. Copiarlos a tu propia base porque "ayuda al cruce" crea un registro permanente que nadie consintió.
- **No publiques teléfonos privados**, aunque alguien haya puesto el suyo en un grupo de WhatsApp. Un grupo de 400 no es la internet pública.
- **No prometas lo que no puedes sostener.** Si tu app insinúa que alguien va a aparecer, alguien tiene que aparecer de verdad.
- **No inventes rankings de confianza.** Nada de listas de "ONG verificadas", ni sellos, ni calificaciones de organizaciones de socorro. No tienes la autoridad, y la Policía ya está lidiando con [gente suplantando organismos de socorro y funcionarios públicos](https://www.elcolombiano.com/colombia/terremoto-alerta-por-estafadores-policia-suplantacion-director-sanidad-damnificados-EG39953869).
- **No pongas un botón hacia un canal que no verificaste hoy.**

El mejor contraejemplo de todo este ecosistema es [Encontrados.co](https://encontrados.co/), al que sigo volviendo. Los rescatistas fotografían a alguien que está a su cuidado, el sistema lo cruza contra reportes de desaparecidos, y **la foto se borra después del match**. El dato más valioso del sistema es también el que más necesita dejar de existir. Construyeron el borrado desde el principio, en una semana, bajo presión. Esa es la vara.

---

## 3. La API pública sin autenticación — la decisión de la que menos seguro estoy

Corag documentó una **API pública sin autenticación** durante la emergencia. Cualquiera puede leer la base de necesidades y cualquiera puede escribir en ella. El razonamiento era directo: la fricción es el enemigo cuando otros equipos están intentando integrarse a las 2 de la mañana, y un proceso de solicitud de API key que nadie atiende equivale a no tener API.

Creo que fue la decisión correcta para las primeras semanas. También creo que es la que peor defendería en una sala tranquila, y quiero dejar escrito el trade-off real en vez de la versión de folleto.

**Lo que ganas:** una base sobre la que cualquiera puede construir de verdad. Bots, tableros, otras PWAs y agregadores pueden leer y escribir sin pedir permiso ni esperar a nadie. Así es como [AquíAyuda](https://www.aquiayuda.com/) termina jalando de cuatro fuentes.

**A qué quedas expuesto:** spam, envenenamiento de datos, y a que alguien inunde el mapa con necesidades falsas para hacer ver un barrio como desatendido. Nada lo impide estructuralmente. Todas las mitigaciones quedan aguas abajo — corroboración, revisión humana, límites de tasa — y las mitigaciones aguas abajo son las que construyes después de que algo salió mal.

**Qué haría distinto, en frío:** dejar las lecturas abiertas y poner la escritura detrás de algo barato. No un formulario de solicitud — algo automático, tipo un token por fuente que puedas emitirte solo y que se revoque cuando una fuente se porte mal. Conservas la propiedad de fricción cero y ganas trazabilidad. No empujé por eso en la semana uno porque la semana uno no era la semana para eso, y honestamente no sé si eso fue buen criterio o una racionalización.

---

## 4. La idempotencia es la diferencia entre integrar y duplicar

De esta sí estoy seguro, y es el punto menos glamoroso de la lista.

Cuando cinco clientes distintos pueden escribir la misma necesidad en la misma base, vas a terminar con la misma necesidad cinco veces a menos que la API se niegue. La API pública de Corag es idempotente por diseño: cada escritura lleva un `source` y un `externalId`, y ese par siempre resuelve al mismo registro.

Eso es todo. Ese es el mecanismo completo. Y es la diferencia entre una base compartida y un botadero.

Sin eso, cada integración empeora los datos. Con eso, un agregador puede resincronizar cada diez minutos sin miedo, y un equipo que se cayó un día puede reproducir todo lo que se perdió. Si estás construyendo algo en lo que otros van a escribir, esto es lo primero que hay que hacer bien y en el día uno no cuesta casi nada. En el día treinta cuesta una migración y un script de deduplicación.

---

## 5. MCP, o qué pasa cuando el cliente no es una persona

Corag también expone un servidor MCP remoto, con herramientas del estilo *listar emergencias*, *publicar una solicitud*, *publicar un ofrecimiento*.

Si todavía no te has topado con MCP: es un protocolo que le permite a un agente de IA descubrir y llamar herramientas — más o menos lo que una especificación OpenAPI hace por un desarrollador, salvo que el consumidor es un modelo y no una persona escribiendo código de integración.

Por qué esto importa en una emergencia no tiene que ver con la palabra de moda. Tiene que ver con que el conjunto de personas que podría consultar útilmente la base de necesidades es mucho más grande que el conjunto de personas capaces de escribir un cliente HTTP. Una coordinadora de voluntarios con un agente puede preguntar "qué se necesita en Dosquebradas ahora mismo" y obtener una respuesta real de la base viva, sin que nadie le construya un tablero. Un bot de WhatsApp de un barrio puede publicar una solicitud sin que un desarrollador lo cablee.

Voy a ser honesto: esta es la pieza en la que es más probable que me esté equivocando sobre el impacto. Es lo más nuevo y menos probado de la lista. Pero de todo lo que sacamos, es lo que me hizo pensar que lo que está cambiando es la forma del software cívico, y no solo su velocidad.

---

## 6. Verificación por corroboración, con un humano cerrando

Ya hablé de [Gravitas](https://mapa.gravitasworld.com/) en el artículo anterior, pero el patrón también va acá porque es la parte reutilizable.

Su regla, [como se la describió Juan Camilo Garzón a El Colombiano](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222): cinco personas reportando el mismo centro de acopio suben la confianza mucho más que un reporte solitario que se ve raro o sin respaldo. La IA reduce, un administrador confirma, y ahí sí llega al mapa.

Lo que quiero subrayar es la dirección del ciclo. El modelo no es quien decide. El modelo es el filtro que hace manejable la revisión humana cuando llegan 850 reportes y son cuatro personas.

Cualquiera que construya reportes ciudadanos termina llegando a alguna versión de esto, normalmente después de publicar algo falso. Ellos llegaron en 42 horas.

---

## 7. Diseña para una red que no está

**Más de 3.400 estaciones base móviles fuera de servicio.** El 46,1 % de las estaciones revisadas en siete departamentos. Es dato del MinTIC, y es la restricción que debió haberlo condicionado todo y en general no lo hizo.

Si tu app asume conexión viva, no funciona el día que importa. Lo que eso implica en concreto: cargas pequeñas, caché agresivo, un estado offline de solo lectura que sirva, no bloquear en scripts de terceros y — esta es la parte que a los ingenieros nos cuesta — una respuesta a "¿cómo llega esta información a alguien que no tiene señal?".

La respuesta honesta para la mayoría de estas herramientas, incluidas en las que yo trabajé, es *no llega*. Llega a alguien que sí tiene señal y que después camina hasta allá y le cuenta. Lo cual está bien, siempre que diseñes sabiendo que ese es el último salto, y no construyas como si el celular en el albergue fuera el destino final.

---

## 8. No reconstruyas el mapa de acopio

El impulso más fuerte en las primeras 48 horas es construirlo todo tú, porque integrarse con el proyecto a medio terminar de otro se siente más lento que arrancar limpio.

No lo es, y la cuenta no está ni cerca. Cuatro equipos construyendo cuatro mapas de acopio producen cuatro conjuntos de datos incompletos y cuatro grupos de usuarios confundidos. Un equipo construyendo un mapa y tres equipos leyendo su API producen un conjunto de datos que mejora cada hora.

La revisión que aplicaría ahora, antes de escribir una línea: *¿esto ya existe y, si existe, tiene alguna forma de que yo lo lea?* Si ambas son sí, construye encima. Si la primera es sí y la segunda no, escríbele al equipo — la mayoría te pasa un endpoint JSON si se lo pides, porque no están compitiendo contigo, están agotados.

---

## 9. Qué hizo la IA de verdad, y qué no

De lo que todo el mundo quiere hablar es de que se construyeron aplicaciones enteras en horas. Eso pasó. [Gravitas se rehízo en 42 horas](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222) por un estudio que venía trabajando en turismo rural. Existen más de veinte herramientas que hace tres semanas no existían. Parte de esa velocidad es inequívocamente nueva, y no creo que a nadie que haya vivido esta semana lo convenzan de lo contrario.

Esto es lo que pongo al lado.

Nadie puede demostrar que algo de esto salvó una vida. Ni Corag, ni ninguna de las otras. El conteo de desaparecidos [bajó de 379 a 143](https://www.eltiempo.com/colombia/otras-ciudades/balance-oficial-de-la-ungrd-tras-terremoto-de-magnitud-7-4-en-colombia-273-fallecidos-3-824-heridos-y-377-desaparecidos-3578196) entre el 13 y el 15 de agosto — cientos de personas encontradas — y me encantaría reclamar una tajada de eso. No puedo. El cruce que produjo esa cifra ocurrió entre hospitales, albergues, registros oficiales, redes familiares y, en algún punto de la mezcla, software. Desenredar la contribución no es posible, y fingir lo contrario sería exactamente la conducta contra la que argumenta esta serie.

Lo que la IA sí hizo con claridad fue acortar la distancia entre *a alguien se le ocurre una herramienta* y *la herramienta existe*. Eso es real y es enorme. Lo que no hizo fue decidir qué construir, decidir qué es cierto, ni responder por una respuesta equivocada. Esas tres se quedaron enteras con nosotros, y esta semana me hizo pensar que se van a quedar más tiempo del que asume la conversación actual.

---

## Recursos

- [Documentación para desarrolladores de Corag](https://corag.app/developers)
- [Especificación OpenAPI pública de Corag](https://ayuda.corag.app/api/public/openapi.json)
- [Servidor MCP de Corag](https://ayuda.corag.app/mcp)
- [Documentación de la API de Pereira Responde](https://pereiraresponde.co/api/docs)
- [El Colombiano — cómo verifica Gravitas los reportes ciudadanos](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222)
- [Plan de contingencia del MinTIC para las comunicaciones](https://laopinion.co/colombia/mintic-activa-plan-de-contingencia-para-garantizar-las-comunicaciones-tras-terremoto)

---

El resumen incómodo es que las partes difíciles de esto nunca fueron técnicas. Producir fue lo fácil. Decidir qué merecía existir, qué merecía borrarse y qué no teníamos derecho a reclamar — ahí estuvo todo el trabajo real.

A seguir construyendo. Con cuidado.
