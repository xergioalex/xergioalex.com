---
title: "Abril Mobile: la charla donde por fin elegí un camino móvil"
description: "Mi charla Abril Mobile en la Universidad Católica de Pereira: cómo elegí un camino para aprender móvil en 2026 y por qué terminé en Kotlin Multiplatform."
pubDate: "2026-04-18"
heroImage: "/images/blog/posts/mobile-dev-meetup-pereira/hero-es.webp"
heroLayout: "side-by-side"
tags: ["tech", "talks", "mobile", "kotlin", "flutter"]
keywords: ["aprender desarrollo móvil 2026", "Kotlin Multiplatform o Flutter", "charla desarrollo móvil Pereira", "Abril Mobile Pereira Tech Talks", "Kotlin Multiplatform para principiantes", "desarrollo móvil con agentes de IA"]
---

Acabo de bajarme de una tarima en la Universidad Católica de Pereira, donde di una charla sobre la única parte del software que llevaba quince años rondando sin terminar de entrar: el desarrollo móvil. El evento es **Abril Mobile**, un meetup de [Pereira Tech Talks](https://www.pereiratechtalks.org/q087gp2d-abril-mobile/).

Este es el contexto honesto. He sido full stack toda mi carrera, y siempre he procurado aprender toda tecnología que pudiera — backend, frontend, infraestructura, DevOps. Si algo nuevo me llama la atención, me meto a fondo; así funciono. El móvil fue la excepción terca — no por falta de interés, sino porque cada vez que me acercaba, algo me echaba para atrás. Al principio era algo tan básico como el hardware: no tenía un computador capaz de correr las herramientas de la época, y solo con eso me devolvía al lado del servidor. Así que el móvil siempre quedaba archivado en "algún día".

Ese es el ángulo que quiero tomar acá. No "el tour del experto por el ecosistema móvil", sino algo más honesto: *si siempre has mirado el móvil desde afuera, ¿cuál es la forma más sensata de entrar?*

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/flyer.webp"
     alt="Flyer del evento Abril Mobile: Sergio Florez (Kotlin) y Juan Campuzano (Flutter), organizado por Pereira Tech Talks, con el apoyo de DailyBot, Aumentada, Universidad Católica de Pereira y Vuetify"
     width="1200"
     height="675"
     loading="lazy" />
<figcaption>El flyer de Abril Mobile. Dos speakers, dos frameworks: Kotlin de mi lado, Flutter del lado de Juan — toda la noche armada alrededor del móvil.</figcaption>
</figure>

## Por qué esta charla, viniendo de alguien que siempre dijo "algún día"

Y nunca fue algo de una sola vez. Años después volví a intentarlo con stacks híbridos como Cordova e Ionic — mejor hardware, herramientas más nuevas — y choqué con otro muro: demasiadas costuras y un resultado que nunca se sentía realmente nativo. Cada intento terminaba igual, conmigo de vuelta en el lugar que conocía: servidores, APIs e infraestructura.

Lo que cambió no es que el móvil se volviera fácil de un día para otro. Es que por fin decidí tratar el "¿cómo aprendo esto?" como una pregunta de ingeniería en serio — mapear el terreno, hacer las exploraciones y comprometerme con un camino en vez de rebotar una vez más contra la barrera de entrada. Esa decisión es la columna vertebral de la charla. Toda la exploración la dejo en mi artículo complementario, [Desarrollo móvil en 2026: estado del arte y por dónde empezar hoy](/es/blog/mobile-development-landscape-2026/), y las diapositivas están acá: [el deck del panorama móvil](/es/slides/mobile-landscape-2026/).

## El mapa: cuatro formas, dos sobrevivientes

El deck recorre todo el ecosistema, así que esta parte la paso rápido. El mundo móvil toma cuatro formas — **nativo** (una plataforma, control total, lock-in total), **cross-platform con UI nativa** (lógica o UI compartida que compila a nativo — donde viven Flutter y Kotlin Multiplatform), **híbrido** (web dentro de un contenedor nativo — poca fricción, techos reales) y **web/PWA** (un sitio instalable, sin tienda, sin sensación nativa).

Después, los descartes rápidos — rápidos porque ya he vivido varios: solo nativo pierde el alcance cross-platform, Ionic y Capacitor ya me mostraron su techo, .NET MAUI es un mundo en el que no estoy, las PWA no llegan lo suficientemente hondo en el dispositivo, y React Native es sólido pero mantiene sus raíces en JavaScript. Lo que queda después de ese corte honesto son dos nombres: **Flutter** y **Kotlin Multiplatform**.

Pero esto es sobre la decisión, no sobre el catálogo.

## Dos filosofías, un mismo objetivo

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-04.webp"
     alt="Sergio en tarima señalando una diapositiva titulada 'Dos filosofías, un mismo camino' que compara Flutter y Kotlin Multiplatform"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>La diapositiva sobre la que gira toda la charla — Flutter y Kotlin Multiplatform, dos filosofías apuntando al mismo objetivo.</figcaption>
</figure>

Flutter y Kotlin Multiplatform quieren lo mismo — escribir menos, llegar a ambas plataformas — pero llegan desde direcciones opuestas. Flutter dice *"confía en nuestro renderer, escribe una vez":* un motor (Impeller) dibuja la misma UI en todas partes, con hot reload instantáneo y un ecosistema de paquetes maduro. Kotlin Multiplatform dice *"comparte la lógica, mantén la UI nativa":* una capa Kotlin compartida por debajo, con Jetpack Compose en Android y SwiftUI en iOS dibujando la interfaz real y nativa de cada plataforma.

Ambas son apuestas genuinamente buenas. La versión honesta es que resuelven problemas un poco distintos — y esa es la parte que vale la pena dejar asentar antes de contarte dónde aterrizo.

## Por qué elegí Kotlin Multiplatform

Mi elección es **Kotlin Multiplatform**. No porque sea el camino fácil — no lo es — sino porque es el que me parece más defendible a largo plazo. La UI se mantiene 100% nativa en cada plataforma, la lógica compartida no compromete la experiencia de usuario, se integra a apps existentes mediante migración progresiva en vez de una reescritura, y tiene a JetBrains y a Google respaldándolo, con adoptantes reales usándolo en producción a gran escala.

La objeción obvia es la curva de aprendizaje, y es real: KMP es más empinada que Flutter, con dos capas de UI que tener en mente y una integración con Xcode que todavía está áspera en los bordes. Pero acá está el punto — y es donde creo que la era de la IA cambia de verdad las cuentas: **esa curva es mucho más fácil de subir que antes.** Los coding agents convierten "meses de adaptación a un ecosistema nuevo" en un ciclo mucho más rápido. Te arman el proyecto, desenredan los errores de build que antes se comían una tarde, y sugieren las piezas específicas de cada plataforma mientras tú mantienes la vista en la arquitectura. La curva no desaparece — pero la herramienta que la aplana está sentada justo al lado tuyo ahora.

Así que es un cambio que hago con plena conciencia: un arranque más empinado a cambio de la apuesta que prefiero estar sosteniendo en tres años.

## Un meetup que fue todo sobre móvil

No soy el único speaker, y eso es lo que hace que la noche se sienta completa. **Juan Campuzano** ([juan-campuzano](https://github.com/juan-campuzano)) toma el lado de Flutter, compartiendo su experiencia como senior software engineer construyendo productos móviles reales — su charla, *Generative UI - Flutter*, llega al mismo problema desde el otro framework.

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-10.webp"
     alt="Juan Campuzano en tarima presentando su charla 'Generative UI - Flutter' en Abril Mobile"
     width="960"
     height="1280"
     loading="lazy"
     class="block mx-auto h-auto w-full rounded-lg md:w-1/2" />
<figcaption>Juan Campuzano del lado de Flutter — su charla "Generative UI - Flutter" convierte la noche en una conversación de dos frameworks.</figcaption>
</figure>

Entre los dos, el meetup completo es una sola conversación sobre móvil desde ambos ángulos: mi caso por Kotlin Multiplatform y el de Juan por Flutter. Si estás en la mitad sin saber por cuál camino empezar, es difícil pedir un mejor lado a lado que escuchar cada uno defendido por alguien que de verdad construye con él.

## Memorias del evento

Lo mejor de una noche de Pereira Tech Talks nunca son solo las diapositivas — es el salón. Una sala llena en la Universidad Católica de Pereira, una comunidad que ha mantenido el móvil en la agenda durante años, y el tipo de preguntas que solo salen de gente que de verdad quiere construir algo.

<figure>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;align-items:start;">
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-06.webp"
     alt="Sergio presentando la diapositiva 'Mi problema con el desarrollo móvil' ante la audiencia en la Universidad Católica de Pereira"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-03.webp"
     alt="Sergio hablando con un micrófono, con la mesa y las banderas de la Universidad Católica de Pereira detrás"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
</div>
<figcaption>Sobre la tarima en la Universidad Católica de Pereira — abriendo con "mi problema con el desarrollo móvil" y, a mitad de charla, exponiendo el caso.</figcaption>
</figure>

<figure>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;align-items:start;">
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-01.webp"
     alt="Sergio en el podio presentando, con la diapositiva 'por qué el desarrollo móvil siempre fue algún día' detrás"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-07.webp"
     alt="La audiencia de Abril Mobile sentada y atenta a la charla"
     width="960"
     height="1280"
     loading="lazy"
     style="width:100%;height:auto;margin:0;border-radius:8px;" />
</div>
<figcaption>Del podio a las sillas — un salón lleno que no paró de hacer preguntas.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-dev-meetup-pereira/memories-05.webp"
     alt="Foto grupal de los asistentes y speakers de Abril Mobile en la Universidad Católica de Pereira"
     width="1200"
     height="900"
     loading="lazy" />
<figcaption>El combo de Abril Mobile. Gracias a todos los que vinieron, y a Pereira Tech Talks por mantener las luces encendidas.</figcaption>
</figure>

Si quieres el argumento completo detrás de la charla, el [deck](/es/slides/mobile-landscape-2026/) y el [artículo complementario](/es/blog/mobile-development-landscape-2026/) van más a fondo de lo que puedo aquí. La versión corta es la que sigo repitiendo: la barrera que antes me frenaba ya no está, las herramientas están listas, y con un agente al lado el camino más empinado deja de ser el que da miedo.

A seguir construyendo.

---

## Recursos

- [Abril Mobile — Pereira Tech Talks](https://www.pereiratechtalks.org/q087gp2d-abril-mobile/) — el meetup del que fue parte esta charla
- [El deck del panorama móvil](/es/slides/mobile-landscape-2026/) — las diapositivas de esta charla
- [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html) — el enfoque de JetBrains para compartir lógica manteniendo la UI nativa por plataforma
- [Flutter](https://flutter.dev) — el framework cross-platform de Google; lenguaje Dart, motor de renderizado [Impeller](https://docs.flutter.dev/perf/impeller)
- [Compose Multiplatform](https://www.jetbrains.com/compose-multiplatform/) — UI compartida sobre Kotlin Multiplatform
- [Juan Campuzano en GitHub](https://github.com/juan-campuzano) — co-speaker, el lado Flutter del meetup
