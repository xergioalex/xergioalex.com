---
title: "Construye algo que los agentes quieran"
description: "Cinco meses de comprobantes después, la contraparte es real, los rieles de pago se partieron y la pregunta le sobrevivió a su categoría."
pubDate: "2026-10-05"
heroImage: "/images/blog/posts/make-something-agents-want/hero-es.webp"
heroLayout: "side-by-side"
tags: ["tech", "personal", "ai-agents", "cloudflare"]
keywords: ["construye algo que los agentes quieran", "agentes como clientes Cloudflare", "Y Combinator software para agentes", "agentes IA ciudadanos primera clase", "cómo construir software para agentes", "Cloudflare Stripe protocolo agentes", "economía de agentes 2026"]
series: "working-with-agents"
seriesOrder: 9
draft: false
---

Algo cambió en cómo la industria tech habla sobre los agentes de IA, y se puede ver concentrado en dos afirmaciones hechas con días de diferencia.

**27 de abril de 2026.** La cuenta de Y Combinator publica en su [Request for Startups](https://www.ycombinator.com/rfs) una nueva categoría enfocada en *Software for Agents,* firmada por [Aaron Epstein](https://www.ycombinator.com/people/aaron-epstein), General Partner del fondo. El cierre del post dice: *"So if you're Making Something Agents Want, we'd love to hear from you."* ("Así que si estás Construyendo Algo Que los Agentes Quieren, nos encantaría escucharte"). Como [alumni de YC](/es/blog/how-we-got-into-y-combinator/), la frase original — *Make something people want* ("Construye algo que la gente quiera") — lleva años en mi cabeza. Ver una sola palabra cambiada en esa misma oración es el tipo de cosa que notas en la segunda lectura. Del tipo de error que se comete a propósito.

<figure>
  <img src="/images/blog/posts/make-something-agents-want/figure-yc-tweet.webp"
       alt="Captura del post de Y Combinator del 27 de abril de 2026 firmado por Aaron Epstein, titulado 'Software for Agents', argumentando que el próximo billón de usuarios de internet serán agentes de IA."
       width="960"
       height="1058"
       loading="lazy" />
  <figcaption>Y Combinator, 27 de abril de 2026 — Aaron Epstein abre el RFS "Software for Agents". — <a href="https://x.com/ycombinator/status/2048834309994565832">Post original</a>.</figcaption>
</figure>

**28 de abril de 2026.** La cuenta de Cloudflare suelta una afirmación que para muchos sonó bastante salvaje: *"Starting today, agents can now be Cloudflare customers."* ("A partir de hoy, los agentes ya pueden ser clientes de Cloudflare.") No "los agentes ya pueden usar Cloudflare." Clientes. La palabra que carga la frase es el sustantivo. Y la afirmación, cuando aterriza así de directa, mueve algo distinto a cuando se dice con rodeos.

<figure>
  <img src="/images/blog/posts/make-something-agents-want/figure-cloudflare-tweet.webp"
       alt="Captura del tweet de Cloudflare del 28 de abril de 2026 anunciando que los agentes ya pueden crear cuentas de Cloudflare, iniciar suscripciones, registrar dominios y recibir tokens de API para desplegar código."
       width="960"
       height="908"
       loading="lazy" />
  <figcaption>Cloudflare, 28 de abril de 2026 — el primer gran proveedor de infraestructura en decirlo en voz alta. — <a href="https://x.com/Cloudflare/status/2049545195914498139">Post original</a>.</figcaption>
</figure>

Dos afirmaciones. Cuarenta y ocho horas de diferencia. Cualquiera de las dos habría sido la noticia principal de su semana. Juntas marcaron una bisagra. YC, la institución que ha moldeado la metodología de startups por dos décadas, le dice a los founders que diseñen para un público que no hace clic. Cloudflare, uno de los mayores proveedores de CDN y edge de la web abierta, declara que ese público ya puede sostener el contrato.

Eso fue la primavera. Desde entonces se acumularon cinco meses de comprobantes, suficientes para evaluar si la bisagra giró de verdad. Giró — aunque no en la dirección que nadie esperaba. Incluida la mía.

Internet lo notó. Y, siendo internet, también se equivocó en un par de cosas.

---

## Antes de seguir, una aclaración

Hubo dos lecturas de estos eventos que se propagaron rápido y conviene corregir antes de que el resto del post tenga sentido. También hay un tercer error, más sutil que cualquiera de los dos, y la primera versión de este post lo cometió igual.

**Lectura uno: "YC cambió su lema."** No lo cambió. [yc.com](https://www.ycombinator.com/) sigue diciendo "Make something people want" al pie de la página. La línea nueva (*"Making Something Agents Want"*) es el cierre de un RFS. Un eco de campaña. Aaron Epstein la escribió como remate de una lista de deseos de startups que quiere ver, invirtiendo a propósito el lema canónico para señalar algo. Eso sigue siendo una señal de tesis, no un rebrand. Es YC diciendo que *la metodología sigue aplicando — pero el público acaba de expandirse.*

**Lectura dos: "Cloudflare lo hizo solo."** No. El [post del blog de Cloudflare](https://blog.cloudflare.com/agents-stripe-projects/) lo deja claro en los primeros tres párrafos, en palabras del propio Cloudflare: *"a new protocol that we've co-designed with Stripe as part of the launch of Stripe Projects"* ("un nuevo protocolo que codiseñamos con Stripe como parte del lanzamiento de Stripe Projects"). El lado de Stripe salió un día antes, en [Sessions 2026](https://stripe.com/blog/everything-we-announced-at-sessions-2026): Shared Payment Tokens, una billetera de agentes dentro de Link, y una especificación abierta nueva llamada Machine Payments Protocol, coautorada por Stripe y una startup de pagos llamada Tempo.

**El tercer error lo cometí yo.** En algún punto de la ola de cobertura, el protocolo sin nombre de Cloudflare y el MPP de Stripe colapsaron en una sola historia: que Cloudflare y Stripe "lanzaron juntos el MPP". Yo repetí esa versión casi palabra por palabra en el primer borrador de este post. Está equivocada de una forma que importa. El post de Cloudflare nunca usa el término MPP; su protocolo tiene tres partes con nombre (Discovery, Authorization, Payment) y ninguna marca propia. El MPP es la especificación de Stripe y Tempo, y para septiembre su capa central de autorización de pagos se renovaba como [borrador individual en el IETF](https://datatracker.ietf.org/doc/draft-ryan-httpauth-payment/). Hasta PlanetScale, que el post de lanzamiento menciona por su nombre, resulta ser una integración anterior (bases de datos Postgres aprovisionadas desde dentro de Cloudflare), no un pasajero del riel nuevo.

Entonces el encuadre más preciso es: Cloudflare y Stripe codiseñaron un protocolo que permite al agente probar quién es su humano, ser facturado sin nunca tocar el número de la tarjeta del humano, y terminar sosteniendo una cuenta cloud recién creada en su propia sesión. Stripe dedicó la misma semana a publicar la especificación de pagos de la que es coautora. Dos movimientos, una sola dirección.

Todas las aclaraciones importan para el resto del post, porque la versión más pequeña y precisa de la historia es la más interesante — y porque la diferencia entre esos dos protocolos terminó siendo la historia del verano.

---

## Lo que pasa cuando el cliente no eres tú

En [La economía de los agentes](/es/blog/the-agent-economy/), el post que escribí en marzo, rastreé cómo los agentes consiguieron dinero: Stripe SPTs, Visa Intelligent Commerce, Mastercard, Ramp Agent Cards, billeteras agénticas de Coinbase, x402. El encuadre era *agentes como actores económicos.* Esa historia era sobre si los agentes podían pagar.

Esta es otra historia. Esta es sobre si los agentes pueden ser la **contraparte.** No el consumidor en la caja, sino el nombre en el contrato. No la billetera que se carga, sino la cuenta que se factura.

Mira lo que Cloudflare acaba de desempacar. Cinco cosas que tiene cualquier cliente legítimo, descompuestas y reconstruidas para una parte no humana:

| Primitiva | Lo que solía significar | Lo que significa ahora |
|-----------|------------------------|----------------------|
| Cuenta | Una persona llena un formulario | Un agente se provisiona vía flujo OAuth, con Stripe atestiguando al humano detrás |
| Identidad | Un login, un correo, un MFA | Una cadena firmada de delegación — *por cuenta de quién* estás actuando, y con qué límites |
| Cobro | Una tarjeta que se carga | Un Shared Payment Token con alcance por vendedor, monto y tiempo, con gasto que el humano aprueba |
| Contrato | Términos de Servicio que un humano acepta | Un acuerdo de alcance on-protocol que firma la parte que despliega al agente |
| Soporte | Documentación, chat, rutas de escalamiento | Respuestas de error legibles por máquina, endpoints `.well-known/`, contratos de API que el agente parsea |

Ninguna de esas primitivas es nueva por sí sola. OAuth es de 2010. Las tarjetas virtuales existen hace años. Lo interesante es que se están **componiendo para una contraparte que no es humana** — y la composición es lo nuevo.

Hay una línea del post de Cloudflare a la que vuelvo: *"Similar to how the OAuth standard made it possible to delegate access to your account to other platforms, the protocol uses OAuth and extends further into payments and account creation, doing so in a way that treats agents as a first-class concern."* ("Similar a cómo el estándar OAuth hizo posible delegar acceso a tu cuenta a otras plataformas, el protocolo usa OAuth y se extiende hasta pagos y creación de cuentas, haciéndolo de una forma que trata a los agentes como una preocupación de primera clase.")

*First-class concern* — preocupación de primera clase. Es la frase con la que hay que sentarse. Durante 20 años, los agentes (bots, scripts, crawlers) fueron de segunda clase. Los aplicaba el rate-limit. Les ponían CAPTCHA. Los baneaban en Ticketmaster. El formulario de signup era un foso, no una feature. Ahora el formulario de signup se está reconstruyendo para que el bot lo use a propósito.

Eso, en todo caso, era la teoría. Lo que le hacía falta a la teoría era una contraparte que realmente se presentara.

---

## Lo que Paul Graham realmente dijo

La frase "Make something people want" viene de un ensayo que Paul Graham publicó en abril de 2008 llamado ["Be Good"](https://paulgraham.com/good.html). La línea relevante está en el segundo párrafo:

> *"About a month after we started Y Combinator we came up with the phrase that became our motto: 'Make something people want.' We've learned a lot since then, but if I were choosing now that's still the one I'd pick."* ("Cerca de un mes después de que arrancamos Y Combinator se nos ocurrió la frase que se convirtió en nuestro lema: 'Make something people want.' Hemos aprendido mucho desde entonces, pero si tuviera que elegir ahora, seguiría escogiendo esa.")

YC tenía tres años cuando PG escribió eso. La frase ha sobrevivido a tres ciclos económicos. Ha sobrevivido a la primera década del iPhone, al auge y caída del cripto dos veces, a toda la era del SaaS. La razón por la que sobrevivió todo es que es casi imposible discutirla. *Want* — querer — es algo medible. Que alguien quiera algo es lo único que el mercado realmente premia.

Honestamente, pienso en esa frase cada vez que miro una idea de producto. Incluyendo este sitio que estás leyendo. Incluyendo DailyBot.

Cambiarle el sustantivo no es trivial. Los agentes no *quieren* como quieren los humanos. No tienen aburrimiento, ansiedad por el estatus, un círculo de amigos al que impresionar. Lo que tienen son metas, dadas por un humano, y una ventana de contexto, y la paciencia de un proceso. Si la línea de YC significa algo, significa: construye la cosa que hace ese loop más rápido. Construye la cosa que el agente elige porque elegirla acerca la meta del humano.

Es una definición más estrecha de *want* que la original de PG. También es falsable. O el agente elige tu API o no.

Cinco meses después, la versión falsable de la tesis tiene comprobantes. Así que mirémoslos.

---

## Cinco meses de comprobantes

Empieza por el número que me detuvo en seco. En junio, [Stripe reportó](https://stripe.com/blog/stripe-projects-adds-new-agents-providers-developer-controls) que el tráfico de agentes a su documentación ya representa casi el 40% del tráfico de docs después de crecer más de 10 veces en 2025, y que el 70% de las peticiones de CLI para recursos de API vienen de agentes. Siete de cada diez peticiones de recursos de API por su CLI no son una persona tecleando. Stripe Projects, la superficie de aprovisionamiento detrás del lanzamiento de abril, llegó a 49 proveedores para mediados de junio, con agentes de código como Warp, los Droids de Factory y Hermes de Nous Research consumiéndola de forma nativa. La misma actualización añadió topes de gasto por proveedor y entornos con nombre donde los agentes arrancan por defecto en desarrollo. Controles así solo tienen sentido cuando la base de clientes realmente no es humana.

Pero lo que nadie predijo es dónde apareció primero la contraparte: en la API, como micropagador. El protocolo x402 — el riel de stablecoins sobre HTTP que [el capítulo de la economía de los agentes](/es/blog/the-agent-economy/) siguió cuando cruzaba los 50 millones de transacciones acumuladas — cerraba [agosto con 75,41 millones de transacciones y 24,24 millones de dólares en los últimos 30 días](https://x402.org). Haz la división: el ticket promedio ronda los 32 centavos. Inferencia. Búsqueda web. Conversión de PDF. Anna Patterson, fundadora de Ceramic.ai, cuya API de búsqueda les vende a agentes a través del gateway de Cloudflare, [lo puso en una línea](https://blog.cloudflare.com/monetization-gateway-beta/): *"Search is one of the first things every agent needs, so it should be one of the first things an agent can buy."* ("La búsqueda es una de las primeras cosas que todo agente necesita, así que debería ser una de las primeras cosas que un agente pueda comprar.")

El lado consumidor es real, pero más joven. A finales de septiembre, [Stripe contó](https://stripe.com/blog/helping-personal-agents-shop-more-intelligently-and-reliably-with-link) que las compras agénticas por la billetera de agentes de Link crecieron 38 veces en un mes, con Muse de Meta, Grok Bot e Instinct conectándose. Treinta y ocho veces desde una base pequeña (la lectura honesta de ese número), pero la dirección no es sutil.

Lo segundo que hizo el verano fue partir los rieles de pago, casi exactamente por la costura que [el capítulo de la economía de los agentes](/es/blog/the-agent-economy/) trazó entre fiat y cripto. Stripe empujó su especificación: el [repositorio del MPP](https://github.com/tempoxyz/mpp-specs) pasó el verano aterrizando intents de suscripción y métodos de pago en cadenas que van de Solana a XRPL, y el borrador central [avanzó hacia el IETF](https://datatracker.ietf.org/doc/draft-ryan-httpauth-payment/). Cloudflare tomó el otro camino. En julio anunció el [Monetization Gateway](https://blog.cloudflare.com/monetization-gateway/), un muro de pago para agentes que liquidan en stablecoins sobre x402, construido con una coalición de más de 25 empresas a través de la Fundación x402 — el hogar en la Linux Foundation que el protocolo nacido en Coinbase recibió ese mismo mes. Para la [beta cerrada del 30 de septiembre](https://blog.cloudflare.com/monetization-gateway-beta/), los vendedores podían ponerle precio a "todo lo que pase por nosotros" — por petición, por consulta, por token — con Cloudflare mismo como primer cliente, vendiendo con pago por inferencia a través de su propio AI Gateway.

Y enterrado en ese post de la beta está la oración que reorganiza toda esta historia. Miles de vendedores se unieron a la lista de espera, y lo más común que pidieron fue poder **"charge agents, not humans"** ("cobrarle a los agentes, no a los humanos"). Léela de nuevo contra abril. En abril, la pregunta era si un agente podía ser cliente. Para octubre, la pregunta más fuerte, hecha desde el otro lado del mostrador, era si la web podía facturarle al agente. La misma plomería de protocolo, el incentivo invertido.

Los números de tráfico explican la urgencia. Cloudflare midió [peticiones de agentes de IA creciendo 1.700% año tras año](https://blog.cloudflare.com/agentic-web) y reportó que este año, por primera vez, más de la mitad del tráfico de Internet no era humano. El tráfico humano en las categorías más rastreadas (retail, software, TI, finanzas) cayó hasta 40% en menos de un año. Cuando la mayoría de tus lectores son programas, "quién paga por el fetch" deja de ser una pregunta hipotética.

Un detalle evita que esta división se convierta en una historia de guerra: la nómina de la propia Fundación x402 incluye a Cloudflare *y* a Stripe, junto con AWS y Vercel. Las empresas se cubren en ambos rieles. La versión ideológica de esta historia — fiat contra cripto, incumbente contra insurgente — no deja de fracasar al contacto con el calendario de lanzamientos.

---

## Quién paga por los errores

No quiero escribir un post de hype. El encuadre tiene problemas, y los escépticos tienen razón al empujar.

La crítica más limpia que encontré es de [Cooley LLP](https://www.cooley.com/news/insight/2026/2026-03-26-ai-agents-and-consumer-law-what-businesses-need-to-know), un despacho de abogados cuyo equipo de IA y derecho del consumidor publicó en marzo un artículo que aterriza un solo punto con una claridad poco común: *"The fact that it is an AI agent, rather than a human, performing these functions does not diminish the business's obligations under consumer protection law."* ("El hecho de que sea un agente de IA, y no un humano, quien realice estas funciones no disminuye las obligaciones del negocio bajo la ley de protección al consumidor.") En otras palabras: llamar al agente "cliente" no mueve la responsabilidad legal a ninguna parte nueva. Si tu agente compra el dominio equivocado, contrata el plan equivocado, o viola normas de consumidor a escala, la empresa que desplegó al agente sigue siendo la responsable.

Y los agentes sí fallan a escala. No cometen un error. Cometen diez mil. El equipo de Cooley señala una actualización de la guía de la Competition and Markets Authority (CMA) del Reino Unido, del 9 de marzo de 2026, que ya codifica esto: la escala no excusa, agrava.

Después está el vector de abuso. El [comentario más votado](https://news.ycombinator.com/item?id=48031684) en el hilo de Hacker News sobre el lanzamiento de Cloudflare es una sola oración: *"Perfect for spammers, scammers and domain squatters, who can now automate their activities even more."* ("Perfecto para spammers, estafadores y domain squatters, que ahora pueden automatizar aún más sus actividades.") Una línea y aterriza, porque la misma plomería que le permite a un agente legítimo levantar un deploy en segundos le permite a uno hostil levantar miles en la misma ventana. Cloudflare gana plata vendiendo los rieles *y* vendiendo las defensas contra el abuso encima de esos rieles. Eso no es nuevo. Pero sí escala.

No tengo una respuesta limpia a ninguna de las dos críticas. Creo que el encuadre de Cooley es correcto: la responsabilidad legal se queda con quien despliega, y la nueva infraestructura hace más barato ser responsable de muchas cosas al mismo tiempo. La respuesta correcta probablemente es: alcances más estrechos por agente, topes duros de gasto, audit trails que todos en el loop puedan leer, y una postura mucho más estricta sobre lo que un agente sin supervisión humana tiene permitido hacer.

Lo que cambió desde abril es que nadie espera a que la ley obligue a nada de esto. La billetera de agentes de Link funciona sobre aprobaciones de gasto. El keynote de Sessions adelantó guardrails: identidades de agente, reglas de alcance, flujos de aprobación. Para junio, Stripe Projects tenía topes por proveedor y entornos donde los agentes arrancan en desarrollo. La infraestructura se está construyendo con cuidado, una capa por delante de la pregunta de responsabilidad.

Los reguladores, por su parte, sostuvieron mayormente la línea de primavera. La guía de la CMA sigue vigente y sin que nada la haya reemplazado, y la respuesta del Reino Unido a "quién responde" no se movió: quien despliega. El único cambio vinculante vino de Bruselas. El 2 de agosto, el artículo de transparencia del [Reglamento Europeo de IA](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) se volvió exigible: las interacciones con IA deben divulgarse, el contenido sintético marcarse. Eso es un mínimo de transparencia para el comercio agéntico, no un régimen de responsabilidad. Quién absorbe una mala compra de un agente, y por cuál carril de contracargo, sigue negociándose en las redes de tarjetas.

Y este es el hallazgo que más me sorprendió. Salí a buscar el primer desastre de compras por agentes — el carrito desbocado, la ola de fraude, la guerra de contracargos — y no encontré ninguno. Las historias reales de agentes descontrolados en el año fueron incidentes de seguridad, no juergas de compras. Lo que muestran los datos, en cambio, es una brecha de confianza. El [Índice de Confianza de Visa para el comercio agéntico](https://investor.visa.com/news/news-details/2026/New-Visa-Research-Finds-Consumer-Trust-is-Accelerating-the-Path-to-Agentic-Commerce/default.aspx), publicado en septiembre, encontró que el 72% de los consumidores ha usado un asistente de IA, pero solo el 23% confía en la IA generativa para manejar transacciones de pago en su nombre. Los mismos encuestados nombraron a Visa la marca más confiable para pagos con IA, con 61%. Los rieles funcionan. Los comprobantes existen. El cuello de botella es si los humanos confían en lo que sostiene el comprobante.

---

## Por qué no vendrá de los incumbentes: una corrección

El tweet de Aaron Epstein cierra con una frase que sigo subrayando: *"...that won't come from incumbents."* ("...y eso no va a venir de los incumbentes.")

Creí la versión de abril de ese argumento. La versión de octubre necesita una corrección, y la corrección es más interesante que el original.

Los incumbentes (Salesforce, SAP, Workday, Oracle, todo el stack empresarial cobrado por puesto) tienen tres lastres que se acumulan. Su interfaz está construida alrededor de dropdowns y dashboards optimizados para humanos que hacen clic. Su precio es por puesto, que se rompe en el momento en que el puesto es un agente que ejecuta 10.000 acciones al día por un solo humano. Su capital de marca está construido sobre entrenamientos, certificaciones, conferencias llenas de humanos con cordón de marca al cuello. Reconstruir cualquiera de los tres para un público agent-first es un cambio arquitectónico. Reconstruir los tres es otra empresa.

No es imposible. Microsoft viene incorporando Copilot dentro de Office a buena velocidad. Stripe ha demostrado que una empresa de pagos veterana puede publicar un protocolo nuevo en cuestión de meses. Pero la fricción es real, y la fricción es asimétrica. Un recién llegado no tiene UI legacy que deprecar. Un recién llegado no tiene que migrar decenas de miles de contratos empresariales fuera del precio por puesto. Un recién llegado puede simplemente lanzar la versión API-first y llamarla el producto.

Después llegó el verano, y los lastres resultaron negociables — al menos para las empresas que podían recotizar. Salesforce, el primer nombre de mi propia lista, fue el que más se movió: en junio [anunció](https://www.salesforce.com/news/stories/agentforce-help-agent-announcement/) el Help Agent de Agentforce con precio por resolución (pagas cuando el caso se resuelve, no cuando el puesto está ocupado) y reportó que el agente resuelve el 70% de los 4,3 millones de consultas que llegan a su propio sitio de ayuda. SAP [puso a trabajar](https://news.sap.com/2026/05/sap-anthropic-to-bring-claude-sap-business-ai-platform) al Claude de Anthropic dentro de los agentes Joule que operan su superficie de RR. HH. y cadena de suministro. Workday [lanzó](https://newsroom.workday.com/2026-06-02-Workday-Launches-New-Tools-for-Developers-to-Build,-Connect,-and-Verify-AI-Agents-For-HR,-Finance,-and-IT) un Developer Agent y un Agent Passport para verificar cada agente operando en un tenant. Microsoft siguió expandiendo [Copilot Checkout](https://about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents) por redes de comercios. El puesto no aguantó. Los incumbentes le dieron la vuelta por el lado del precio.

La versión más limpia de la línea redibujada viene de Cloudflare — un incumbente por cualquier métrica de cuota de red — en su manifiesto de la Agents Week de agosto, ["The Agentic Internet"](https://blog.cloudflare.com/the-agentic-internet): *"Seat-based models do not work when the user is a program."* ("Los modelos por puesto no funcionan cuando el usuario es un programa.")

Así que la línea divisoria no es incumbente contra startup. Es si tu valor se puede exponer como algo que un agente llama, y cobrarse por lo que la llamada hace: una resolución, una petición, una consulta, un token. Salesforce puede vender una resolución. SAP puede vender una llamada a su ERP. Lo que sigue sin reempaquetarse es el stack más profundo: el software cuyo valor *es* el dashboard, los programas de certificación, los contratos multianuales con precio por humano. Esos lastres son reales. Solo que no son los que yo señalé en abril.

[La lectura de The Next Web](https://thenextweb.com/news/yc-summer-2026-rfs-hard-tech-pivot) sobre el RFS de YC apuntó al mismo punto en una frase a la que vuelvo: *"Software is now the substrate, not the moat. The models are commoditising. The infrastructure is scaling."* ("El software ahora es el sustrato, no el foso. Los modelos se están commoditizando. La infraestructura está escalando.") Si el software es el sustrato, el foso se mueve hacia arriba: a la interfaz con forma de agente y a quien aterrice el protocolo primero. El manifiesto de Cloudflare le pone cuatro nombres a ese territorio — la web orientada a agentes tiene que ser *readable, discoverable, callable* y *payable* (legible, descubrible, invocable y pagable) — y es un mapa tan bueno de dónde van a aparecer las empresas nuevas como cualquier cosa que YC haya publicado.

El post que escribí en abril sobre [la Agents Week de Cloudflare](/es/blog/cloudflare-agents-week-2026/) rastreó el push completo de infraestructura — sandboxes, navegadores, correo, identidad. Lo que cambió ahora no es la *infraestructura.* La infraestructura ya estaba. Lo que cambió es la *relación.* La infraestructura ahora viene respaldada por la propuesta de que el agente sostiene la cuenta, no solo la usa.

---

## Lo que estoy cambiando en mi propio trabajo

Específicos, no abstracciones. Esto es lo que cambié desde que se publicaron esos dos posts.

**En este sitio.** A comienzos de año lancé [Markdown for Agents](/es/blog/aeo-markdown-for-agents/) — cada página HTML de xergioalex.com tiene un endpoint `.md` espejo. La semana en que salió corrí [isitagentready.com](https://isitagentready.com/) contra el sitio. Saqué 33/100: contenido era la única categoría al máximo; todo lo demás (descubribilidad, control de acceso de bots, la familia `.well-known/`) quedó como trabajo pendiente. Desde entonces el propio scorecard creció. Hoy corre 21 chequeos en cinco categorías, incluida una categoría de comercio que no existía en primavera, que mide preparación para x402 y MPP. Se movió la portería. Y el campo también: el [escaneo de Radar](https://blog.cloudflare.com/agent-readiness) de Cloudflare sobre unos 200.000 dominios principales encontró 78% con robots.txt pero solo 4% con señales de contenido, y menos de 15 sitios publicando tarjetas de servidor MCP. Casi nadie está listo para agentes. Mi 33 queda en algún lugar cerca de la mediana de la web, que es tranquilizador o alarmante según la hora. Sigo avanzando en la lista, y lo escribiré cuando cruce 80 — contra el scorecard nuevo, no el viejo.

**En el stack de agentes que uso para trabajo de clientes.** Mantengo un set pequeño de servidores MCP privados — para búsqueda en repos, para recuperación de documentos de cliente, para un par de pipelines internos de datos. Después del anuncio de Cloudflare volví a revisarlos y agregué dos cosas que había estado posponiendo: alcances más estrechos por consumidor (para que un agente de código literalmente no pueda llamar a la herramienta de facturación) y topes duros de gasto diario atados a la identidad del agente. Ambas tomaron una tarde. Ambas tenían que haber estado desde el inicio. El artículo de Cooley me empujó.

**En DailyBot.** No voy a escribir la versión larga acá — es un post aparte, y no me toca solo a mí escribirlo — pero la conversación dentro del equipo sobre interfaces agent-first cambió de forma desde estos dos anuncios. Ya éramos una compañía de YC S21 construyendo para la colaboración humano + agente. La pregunta ahora es más estrecha: ¿cómo se siente la experiencia del *agente* dentro de nuestro producto, y qué superficies deberían exponer esa experiencia por defecto?

Creo que muchos equipos están teniendo una versión de esta conversación ahora mismo. Creo que la mayoría todavía la está calibrando como una pregunta de roadmap de features cuando en realidad es una pregunta de posicionamiento.

La forma más simple de plantearlo: hace un año, la pregunta era *si mi producto funciona con agentes.* Este año es *si un agente que funciona elegiría mi producto.*

---

## Cierre

*Make something people want* no se retiró. Se generalizó. La frase de PG se escribió cuando "usuarios" significaba humanos haciendo clic. Veinte años después significa algo más borroso: en parte humanos, en parte los agentes actuando por ellos, y cada vez más los agentes actuando por sus propias metas dentro de los alcances que los humanos definen. La metodología aplica. El público se expandió.

La categoría sí se retiró. El [RFS de otoño de 2026](https://www.ycombinator.com/rfs) botó "Software for Agents" después de un solo ciclo. Trece categorías ahora, ninguna es esta. El nombre de Aaron Epstein está en otro ensayo, "Multiplayer AI". Una de las categorías nuevas es la imagen en el espejo: "Proving You're Human" ("probar que eres humano"). La tesis no murió; se disolvió en todo lo demás. Una pregunta que le sobrevive a la categoría que la formuló nunca fue una pregunta de categoría.

Si estás construyendo ahora, la pregunta que Aaron Epstein metió en el RFS es la que toca sostener. No como slogan. Como función forzante. *¿Un agente que funciona elegiría esto?* Si la respuesta es "sí, al final, después de que rediseñemos la UI", la respuesta es no. El agente ya está decidiendo. El rediseño es el trabajo.

A seguir construyendo.

---

## Recursos

- [Cloudflare — los agentes ya pueden crear cuentas, comprar dominios y desplegar](https://blog.cloudflare.com/agents-stripe-projects/) — el post del lanzamiento, cofirmado por Sid Chatterjee y Brendan Irvine-Broque, con la arquitectura del protocolo codiseñado con Stripe.
- [Tweet de Cloudflare anunciando el lanzamiento](https://x.com/Cloudflare/status/2049545195914498139) — la línea que abrió el encuadre.
- [Stripe — Todo lo que anunciamos en Sessions 2026](https://stripe.com/blog/everything-we-announced-at-sessions-2026) — Stripe Projects, Shared Payment Tokens, y el Machine Payments Protocol desde el lado de Stripe.
- [Stripe — Stripe Projects añade proveedores y controles de agentes](https://stripe.com/blog/stripe-projects-adds-new-agents-providers-developer-controls) — la actualización de junio: 49 proveedores, 40% del tráfico de docs, 70% de las peticiones de CLI.
- [Stripe — Link para agentes personales](https://stripe.com/blog/helping-personal-agents-shop-more-intelligently-and-reliably-with-link) — los números de Link de septiembre: 38 veces de crecimiento mensual, Muse, Grok Bot, Instinct.
- [Repositorio de la especificación del Machine Payments Protocol](https://github.com/tempoxyz/mpp-specs) — la especificación de pagos de Stripe y Tempo, en desarrollo activo.
- [Cloudflare — Monetization Gateway](https://blog.cloudflare.com/monetization-gateway/) — el anuncio de julio: liquidación en x402, coalición de 25 empresas.
- [Cloudflare — Monetization Gateway beta](https://blog.cloudflare.com/monetization-gateway-beta/) — la beta del 30 de septiembre: precios en el edge, "charge agents, not humans".
- [Cloudflare — The agentic web](https://blog.cloudflare.com/agentic-web) — Birthday Week: crecimiento de agentes de 1.700%, mitad del tráfico no humano, Pay Per Use.
- [Cloudflare — The Agentic Internet](https://blog.cloudflare.com/the-agentic-internet) — el manifiesto de Agents Week: readable, discoverable, callable, payable.
- [Cloudflare — Agent Readiness](https://blog.cloudflare.com/agent-readiness) — el escaneo de Radar sobre cuánto de la web pueden usar de verdad los agentes.
- [x402](https://x402.org) — el dashboard del protocolo: conteos de transacciones y volumen en vivo.
- [Y Combinator — Requests for Startups de otoño de 2026](https://www.ycombinator.com/rfs) — el RFS actual. "Software for Agents" ya no está.
- [Tweet de Y Combinator — Aaron Epstein](https://x.com/ycombinator/status/2048834309994565832) — el post que abrió el encuadre.
- [Aaron Epstein en Y Combinator](https://www.ycombinator.com/people/aaron-epstein) — perfil del autor.
- [Paul Graham — "Be Good"](https://paulgraham.com/good.html) — la fuente escrita canónica de "Make something people want".
- [Salesforce — anuncio del Help Agent de Agentforce](https://www.salesforce.com/news/stories/agentforce-help-agent-announcement/) — precio por resolución y el número del 70% de 4,3 millones.
- [SAP — Claude en la plataforma SAP Business AI](https://news.sap.com/2026/05/sap-anthropic-to-bring-claude-sap-business-ai-platform) — un incumbente poniendo un modelo de frontera debajo de sus agentes.
- [Workday — herramientas para construir, conectar y verificar agentes de IA](https://newsroom.workday.com/2026-06-02-Workday-Launches-New-Tools-for-Developers-to-Build,-Connect,-and-Verify-AI-Agents-For-HR,-Finance,-and-IT) — Developer Agent y Agent Passport.
- [Microsoft — Copilot Checkout y agentes de marca](https://about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents) — checkout dentro del asistente.
- [Cooley LLP — AI Agents y derecho del consumidor](https://www.cooley.com/news/insight/2026/2026-03-26-ai-agents-and-consumer-law-what-businesses-need-to-know) — la crítica de protección al consumidor al encuadre de agentes-como-clientes.
- [Reglamento Europeo de IA — el marco regulatorio](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) — el artículo de transparencia, exigible desde el 2 de agosto.
- [Visa — Índice de Confianza para el comercio agéntico](https://investor.visa.com/news/news-details/2026/New-Visa-Research-Finds-Consumer-Trust-is-Accelerating-the-Path-to-Agentic-Commerce/default.aspx) — 72% ha usado un asistente de IA, 23% le confía los pagos.
- [InfoQ — Cloudflare y Stripe envían comercio agéntico](https://www.infoq.com/news/2026/05/cloudflare-stripe-agent-commerce/) — Steef-Jan Wiggers sobre la implementación a nivel de producción y sus riesgos abiertos.
- [TechCrunch — Stripe Link para agentes de IA](https://techcrunch.com/2026/04/30/stripe-link-digital-wallet-ai-agents-shopping/) — Sarah Perez sobre el lado consumidor de la misma arquitectura.
- [The Next Web — el giro hard-tech del RFS de YC](https://thenextweb.com/news/yc-summer-2026-rfs-hard-tech-pivot) — Cristian Dina sobre lo que el RFS señala sobre defensibilidad.
- [Hilo de Hacker News sobre el anuncio de Cloudflare](https://news.ycombinator.com/item?id=48031684) — incluyendo la crítica sobre spam y automatización.
