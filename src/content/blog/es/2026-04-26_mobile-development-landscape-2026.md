---
title: "Desarrollo mobile en 2026: estado del arte y por dónde empezar hoy"
description: "Estado del arte del desarrollo mobile en 2026: las opciones disponibles, cómo funciona cada una y por dónde tiene sentido empezar hoy."
draft: true
pubDate: "2026-04-26"
heroLayout: "none"
tags: ["tech", "mobile"]
keywords: ["desarrollo mobile 2026", "frameworks mobile", "Flutter", "Kotlin Multiplatform", "KMP", "Android iOS", "React Native", "desarrollo multiplataforma", "aprender mobile", "panorama mobile"]
series: "learning-mobile-development"
seriesOrder: 1
---

Como desarrollador full stack, siempre he procurado aprender un poco de todo: backend, frontend, infraestructura, DevOps. Si hay una tecnología nueva que me llama la atención, la exploro. Así funciono. Pero con el desarrollo mobile la historia ha sido distinta. Lo miro de lejos — lo veo, lo admiro, a veces lo envidio — pero siempre termino del otro lado, construyendo APIs, interfaces e infraestructura — sistemas que viven en servidores. El móvil siempre fue ese "algún día" que nunca llegaba.

No porque no lo haya intentado.

Recuerdo mis primeros años de universidad — estamos hablando de hace alrededor de quince años — cuando necesité desarrollar una app móvil para una materia. En esa época Android Studio no existía todavía; el IDE oficial era Eclipse con el plugin ADT, y era demasiado pesado para mi humilde laptop de ese entonces. No arrancaba, o arrancaba y se comía toda la memoria, o se quedaba compilando en un loop que parecía eterno.

Buscando capturas de pantalla de esa época encontré estas joyas — Eclipse Helios cargando con el plugin ADT, el editor visual de layouts y el emulador con su teclado físico virtual. Los flashbacks son inmediatos:

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-helios-loading.webp"
     alt="Eclipse Helios IDE loading screen with the ADT plugin installed, circa 2011"
     width="1024"
     height="576"
     loading="lazy" />
<figcaption>Eclipse Helios (~2011) cargando con el plugin ADT. Esa pantalla morada era lo último que veías antes de que tu laptop decidiera si cooperaba o no.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-adt-layout-editor.webp"
     alt="Eclipse ADT graphical layout editor showing a Hello World Android app with form widgets palette"
     width="991"
     height="612"
     loading="lazy" />
<figcaption>El editor visual de layouts en Eclipse ADT — arrastrando TextViews y Buttons sobre un Nexus One virtual. El "Hello world!" que costaba media hora de configuración.</figcaption>
</figure>

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-adt-emulator.webp"
     alt="Eclipse ADT with the Android emulator showing a virtual phone with physical keyboard, DDMS debug panel below"
     width="1024"
     height="734"
     loading="lazy" />
<figcaption>El emulador de Android dentro de Eclipse — con teclado físico virtual, panel DDMS y una velocidad que ponía a prueba tu paciencia.</figcaption>
</figure>

Así que empecé a buscar alternativas. [Cordova](https://cordova.apache.org/) me permitió crear apps híbridas que sirvieron para su propósito: monté mis primeras apps móviles con HTML, CSS y JavaScript empaquetados dentro de un contenedor nativo. Funcionaba. Luego experimenté con Ionic — mismo principio, mejor tooling — y creé un par de prototipos y proyectos con estas tecnologías.

El problema llegaba cuando necesitaba algo más. Cuando el proyecto requería acceso real a los componentes nativos del dispositivo — la cámara, el GPS, los sensores, las notificaciones push — el desarrollo híbrido mostraba sus costuras. Un bridge que tardaba demasiado, una API nativa que no estaba expuesta, un comportamiento que en el navegador funcionaba perfecto pero en el dispositivo se sentía como una app web disfrazada. Y lo era.

Después de eso, abandoné el desarrollo mobile. De nuevo. Y ese "de nuevo" es la parte importante — porque no fue la primera vez ni fue la última. Cada cierto tiempo sentía el impulso de acercarme. Veía un framework nuevo, una demo que se veía increíble, un tutorial que prometía "build your first app in 30 minutes". Pero el desarrollo mobile, a diferencia del frontend o el backend, requiere una cantidad de artefactos que al verlos todos juntos — los certificados, los perfiles de aprovisionamiento, los emuladores, las configuraciones de Gradle o Xcode, las cuentas de desarrollador — el impulso se me iba antes de escribir la primera línea de código. En frontend puedes abrir un archivo HTML y ya tienes algo. En backend, tres líneas levantan un servidor. En mobile, antes de ver "Hello World" en tu teléfono ya pasaste por tres asistentes de configuración y un error de Gradle que te manda a Stack Overflow. La barrera de entrada no era intelectual. Era logística. Y la logística mata la motivación más rápido que la complejidad.

Este año decidí que ya era suficiente. No porque tenga un proyecto urgente que lo requiera — aunque algo hay — sino porque quería entender el estado del arte actual. Encontrar el mejor camino para alguien como yo: un desarrollador full stack con experiencia sólida en backend, frontend e infraestructura, pero que no es experto en nada de mobile. Mi happy path — el que me lleve a crear apps de manera intuitiva, con los mejores estándares posibles, sin tener que pelear contra el ecosistema para empezar.

Antes de escribir una sola línea de código, me senté a entender el panorama. Porque uno de los errores más comunes de quien llega desde backend o web es asumir que el desarrollo mobile es simplemente "programación normal pero en un teléfono". No lo es. Los modelos de estado son distintos. El ciclo de vida de las pantallas funciona diferente. La forma en que piensas la UI — quién la controla, cuándo se destruye, cómo persiste — tiene lógica propia. Antes de elegir una herramienta, quería entender en qué me estaba metiendo.

Este post es ese estado del arte que me senté a entender.

## El problema real no es elegir el framework

Antes de hablar de opciones, hay que nombrar el problema de fondo. Quien llega desde el desarrollo web — sea backend o frontend — tiende a hacer la pregunta equivocada: "¿qué framework uso?". La pregunta correcta es anterior: "¿qué tiene de diferente este dominio?".

La respuesta más honesta: bastante.

Una app web se ejecuta dentro del navegador, un entorno relativamente predecible: una pestaña abierta, memoria disponible, una URL que ancla el estado. Si la pestaña se cierra, el usuario lo decidió. En móvil esa predictibilidad desaparece. El sistema operativo decide cuándo tu aplicación se ejecuta, cuándo pasa a segundo plano y cuándo termina su proceso para liberar memoria — sin previo aviso a tu código. La pantalla que el usuario ve puede destruirse y recrearse en cualquier momento, y cuando vuelva tienes que rehidratar el estado desde almacenamiento persistente, no desde memoria. Ese ciclo de vida propio ramifica a través de cada decisión arquitectónica: ¿dónde guardas los datos para que sobrevivan?, ¿quién los rehidrata cuando la pantalla vuelve?, ¿qué margen tienes para serializar el estado antes de que el sistema operativo termine el proceso?

No es que el desarrollo web no tenga complejidad — la tiene, sea backend o frontend. Es que la complejidad es diferente: el instinto que te formaste manejando peticiones o reactividad de componentes no se traslada directamente a este dominio, porque el runtime ya no es tuyo — es del sistema operativo.

Es un patrón que voy a encontrar una y otra vez en esta serie: los instintos del desarrollo web son válidos, pero no se trasladan directamente. Parte de aprender mobile es aprender cuándo confiar en lo que ya sabes y cuándo ponerlo en pausa.

Eso dicho: el framework sí importa. Y hay demasiados para elegir sin entender primero el terreno.

## Cuatro categorías antes de la lista

Antes de nombrar cada opción, vale la pena establecer las categorías. El ecosistema mobile se organiza en cuatro tipos fundamentales:

**Nativo** — una plataforma, un lenguaje, acceso completo a las APIs del sistema operativo. Kotlin con Jetpack Compose en Android; Swift con SwiftUI en iOS. Máximo control, máximo lock-in por plataforma: si construyes nativo Android tu app solo corre en Android, y llegar a iOS significa reescribirla en otro lenguaje y otro ecosistema.

**Cross-platform con UI nativa** — lógica o UI compartida, compilada a nativo. Aquí viven Kotlin Multiplatform (KMP) y Flutter, aunque con filosofías fundamentalmente distintas. Los dos son "cross-platform", pero lo que eso significa para cada uno es diferente.

**Híbrido** — tecnologías web corriendo dentro de un contenedor nativo. React Native mapea componentes JavaScript a vistas nativas — técnicamente no es un híbrido clásico, aunque a menudo se clasifica junto a ellos. Ionic/Capacitor sí es un híbrido más puro: tu HTML y CSS corren en un WebView (un navegador embebido dentro de la app).

**Web / PWA** — un sitio web que se puede instalar en la pantalla principal. No hay compilación nativa. Funciona muy bien para apps orientadas a contenido; llega a sus límites cuando necesitas integración profunda con el dispositivo.

<figure>
<img src="/images/blog/posts/mobile-development-landscape-2026/categories-es.webp"
     alt="Diagrama de cuatro torres arquitectónicas comparando Native, Cross-platform UI nativa, Híbrido y Web/PWA. Cada torre muestra las capas entre el código del desarrollador y el hardware del dispositivo, con altura creciente de izquierda a derecha. PWA es la torre más alta e incluye un marcador de sandbox del navegador."
     width="1400"
     height="876"
     loading="lazy" />
<figcaption>Las cuatro categorías como stacks arquitectónicos: el código (en terracota) atraviesa más capas de izquierda a derecha. Native es el camino más directo; PWA, además de añadir capas, queda restringido por el sandbox del navegador.</figcaption>
</figure>

Esta clasificación va a parecer simple cuando lleguemos a los detalles — y lo es, un poco. La realidad es que "cross-platform" no es una categoría monolítica. KMP y Flutter son dos apuestas muy distintas sobre qué significa compartir código, y ese matiz importa más de lo que parece al principio.

## Cada opción, sin adornos

Nueve opciones: las que tienen sentido considerar hoy en el panorama mobile, en 2026. Una por una. Qué define a cada una, qué pide a cambio, y dónde encaja mejor.

### Android nativo — Kotlin + Jetpack Compose

Escribes [Kotlin](https://developer.android.com/kotlin) con Jetpack Compose. Tu app es exactamente lo que Google diseñó Android para correr — Kotlin es, en palabras de Google, *"the preferred language for Android app development"* (el lenguaje preferido para desarrollo de Android). El sistema operativo te da acceso directo a todas sus APIs, las animaciones se sienten nativas porque lo son, y nada te va a sorprender en términos de compatibilidad. El costo es claro: solo corre en Android. Si algún día necesitas llegar a iOS, vuelves al punto de partida con otro lenguaje y otro stack.

### iOS nativo — Swift + SwiftUI

La misma lógica, del lado de Apple. [Swift](https://en.wikipedia.org/wiki/Swift_%28programming_language%29) desde 2014, [SwiftUI](https://developer.apple.com/videos/play/wwdc2019/204/) desde 2019. Para 2026, Swift está en 6.2 y SwiftUI [llegó hasta iOS 26](https://www.hackingwithswift.com/articles/278/whats-new-in-swiftui-for-ios-26). El ecosistema Apple es hermético y consistente — dentro del jardín, las piezas encajan entre sí: APIs, tooling, distribución. El costo es el mismo: solo corre en plataformas Apple.

### Flutter

La apuesta de [Google con Flutter](https://flutter.dev) en "build once, run everywhere" (construye una vez, corre en todas partes). Escribes en Dart — un lenguaje que casi con seguridad no conoces — y Flutter renderiza todo a través de su propio motor gráfico, [Impeller](https://docs.flutter.dev/perf/impeller) — que pinta directo sobre Metal en iOS y Vulkan en Android, las APIs por las que las apps de alto rendimiento hablan directo con la GPU del dispositivo. Esa es a la vez su fortaleza y su particularidad: la UI se ve igual en Android y en iOS porque Flutter la dibuja ella misma, no porque adopte los widgets nativos de cada sistema.

¿Es eso una ventaja o un problema? Depende de quién pregunte. Para apps con identidad de marca fuerte, para herramientas internas, para juegos — el control total sobre el renderizado es valioso. Para apps que deben sentirse como una app nativa de iOS o de Android — es un costo real.

[Flutter 3.41](https://docs.flutter.dev/release/whats-new) salió el 11 de febrero de 2026. El ecosistema de paquetes en pub.dev es amplio. El tooling — `flutter doctor`, DevTools, los plugins de VS Code y Android Studio — está pulido de un modo que sugiere compromiso real de Google con el proyecto.

El tradeoff honesto: Dart es un lenguaje que solo usas para Flutter. Si en algún momento te alejas, Dart no te acompaña. Es una apuesta sobre el ecosistema de Google, no sobre un lenguaje de propósito general.

### React Native

La apuesta de Meta en que los desarrolladores web no deberían tener que aprender un paradigma nuevo. El tagline de [React Native](https://reactnative.dev) es directo: *"Learn once, write anywhere"*. Escribes JavaScript o TypeScript y obtienes UI nativa — no un WebView, sino componentes mapeados a vistas nativas reales del sistema operativo.

La Nueva Arquitectura (New Architecture) reemplazó el antiguo bridge — la capa intermedia, lenta y asíncrona, que conectaba JavaScript con código nativo — por JSI, una interfaz directa en C++. Es obligatoria desde la versión 0.82 y viene por defecto en [0.84](https://reactnative.dev/blog/2026/02/11/react-native-0.84). Eso hace a React Native significativamente más rápido y confiable que su versión de 2018. Si ya conoces React, este es el camino de menor fricción hacia mobile.

En octubre de 2025, Meta donó React, React Native y JSX a la [React Foundation](https://engineering.fb.com/2025/10/07/open-source/introducing-the-react-foundation-the-new-home-for-react-react-native/) — parte de la Linux Foundation — haciendo el proyecto formalmente independiente de cualquier empresa.

### Kotlin Multiplatform

KMP es una apuesta fundamentalmente distinta. Donde Flutter dice "confía en nuestro renderer, escribe una vez", KMP dice "comparte tu lógica, mantén la UI nativa".

El posicionamiento de JetBrains es explícito: *"share code across platforms while retaining the benefits of native programming"* (compartir código entre plataformas preservando los beneficios de la programación nativa). En la práctica: escribes tus modelos de datos, lógica de negocio, networking y almacenamiento en Kotlin — una sola vez. Cada plataforma — Android, iOS — tiene su propia capa de UI nativa: Jetpack Compose en Android, SwiftUI en iOS. La plataforma se siente nativa porque su UI lo es.

KMP lleva un camino largo desde su [introducción en Kotlin 1.2 en 2017](https://www.droidcon.com/2022/09/29/kotlin-multiplatform-at-five-years/). [Declaró estabilidad en noviembre de 2023](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/). Compose Multiplatform — la capa opcional que te permite compartir también la UI en sintaxis Compose — [llegó a estabilidad para iOS en mayo de 2025](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/), y [lanzó la versión 1.10.0](https://blog.jetbrains.com/kotlin/2026/01/compose-multiplatform-1-10-0/) en enero de 2026.

La pregunta que KMP deja abierta — cuánto código puedes realmente compartir y cuándo tiene sentido hacerlo — es la más interesante del ecosistema cross-platform. No la voy a responder acá: es justamente lo que exploraré en el siguiente capítulo.

### Ionic + Capacitor

Una app web dentro de un contenedor nativo. Tu HTML, CSS y JavaScript corren en un WebView; [Capacitor](https://ionic.io/blog/announcing-capacitor-8) expone un puente a las APIs nativas del dispositivo. Si eres desarrollador web y necesitas una app en la tienda, es el camino de menor resistencia. El tradeoff es honesto: se siente como una app web porque lo es. Para muchos casos de uso eso está bien. Para otros, no.

Capacitor 8 se anunció en diciembre de 2025 y [la versión 8.3.0](https://github.com/ionic-team/capacitor/releases) salió el 25 de marzo de 2026.

### .NET MAUI

La apuesta cross-platform de Microsoft para el ecosistema .NET — [.NET MAUI](https://dotnet.microsoft.com/en-us/apps/maui), el sucesor de Xamarin. Corre en Android, iOS, Windows y macOS. Si tu equipo vive en C# y Visual Studio, y ya tiene código .NET, esta es la elección natural. Para alguien que llega desde fuera del ecosistema Microsoft, el punto de entrada es más alto sin un beneficio claro a cambio.

[.NET MAUI 10](https://www.infoq.com/news/2026/03/net-11-preview2-maui/) salió con .NET 10 en 2026.

### Xamarin

[Alcanzó el fin de soporte](https://dotnet.microsoft.com/en-us/platform/support/policy/xamarin) el 1 de mayo de 2024. Microsoft redirigió a todos hacia .NET MAUI. No hay razón para empezar nada nuevo en Xamarin.

### PWA — Progressive Web Apps

Un sitio web que se puede instalar en la pantalla principal. Funciona sorprendentemente bien para apps orientadas a contenido: sin compilación nativa, sin aprobación de tienda, una sola base de código para web y móvil. [Los límites llegan rápido](https://en.wikipedia.org/wiki/Progressive_web_app) cuando necesitas integración real con el dispositivo — acceso avanzado a cámara, Bluetooth, procesamiento en segundo plano — sobre todo en iOS, donde Safari sigue más restringido que Chrome para APIs web modernas.

Para ciertos casos de uso, una PWA es la respuesta correcta. Para lo que yo quiero construir, no lo es.

## Antes de elegir: el panorama en una tabla

Antes de ir más a fondo sobre las dos opciones que más me interesan, aquí está cómo se ven todas juntas contra los criterios que me importan. Una advertencia: esta tabla representa mi lectura del panorama desde la documentación y los changelogs. No desde el uso real. Después de meses con dos de ellas, la tabla va a verse diferente en mi cabeza.

| Opción | Lenguaje(s) | Plataformas | Enfoque de UI | Mantenida por | Mejor para |
|---|---|---|---|---|---|
| Android nativo | Kotlin + Jetpack Compose | Android | 100% UI nativa Android | Google | Apps solo Android; equipos que viven en el ecosistema Android |
| iOS nativo | Swift + SwiftUI | Plataformas Apple | 100% UI nativa Apple | Apple | Apps solo iOS/macOS; equipos que solo publican en Apple |
| Kotlin Multiplatform | Kotlin | Android, iOS, Desktop, Web | Lógica compartida; UI nativa por plataforma (o Compose Multiplatform para UI compartida) | JetBrains + Google | Equipos que quieren lógica compartida con UI de calidad nativa por plataforma |
| Flutter | Dart | Android, iOS, Web, Desktop | Motor de renderizado propio (Impeller) — misma UI en todas las plataformas | Google | Equipos que quieren una sola base de código UI; prototipado cross-platform rápido |
| React Native | JavaScript / TypeScript | Android, iOS | Mapea componentes JS a vistas nativas | React Foundation (Meta + comunidad) | Equipos web que pasan a mobile; codebases React/JS existentes |
| .NET MAUI | C# | Android, iOS, Windows, macOS | Controles UI nativos por plataforma vía abstracción .NET | Microsoft | Equipos .NET/C#; apps enterprise en el ecosistema Microsoft |
| Ionic + Capacitor | HTML, CSS, JS/TS | Android, iOS, Web | WebViews dentro de un contenedor nativo | Equipo de Ionic | Equipos web; apps web existentes que necesitan presencia mobile instalable |
| PWA | HTML, CSS, JS | Cualquier navegador | UI web estándar (sin controles nativos) | W3C / fabricantes de navegadores | Apps orientadas a contenido; equipos que quieren instalabilidad sin tienda |
| Xamarin | C# | — | — | Microsoft (deprecado) | **No empezar proyectos nuevos.** Fin de soporte: mayo 2024. Migrar a .NET MAUI. |

## Por qué Flutter + KMP son las dos opciones serias para mí

Descarté el resto bastante rápido. El razonamiento:

**Android/iOS nativo:** La respuesta solo tiene sentido si ya sabes para cuál de las dos plataformas estás construyendo. Yo no lo sé todavía — quiero llegar a las dos. Irme a nativo significaría aprender dos lenguajes, dos modelos de UI, dos ecosistemas. Es la respuesta correcta para muchos equipos. No para mí empezando desde cero.

**Ionic/Capacitor:** Ya pasé por esto. Cordova, Ionic — me sirvieron hace quince años para salir del paso en la universidad, pero el tradeoff lo viví en carne propia: cuando necesitas que la app se sienta nativa, el híbrido no llega. Si ya tienes una app web y quieres llevarla a la tienda, es un camino válido. Pero yo estoy construyendo desde cero, y esta vez quiero hacerlo bien.

**.NET MAUI:** No vivo en el ecosistema C#. No hay razón para empezar ahí.

**PWA:** Para el proyecto que tengo en mente, necesito acceso real al dispositivo. Una PWA no llega ahí.

**React Native:** Es una opción seria. La Nueva Arquitectura la hizo una plataforma mucho más sólida de lo que era. Si ya tuviera una base de código React grande, el cálculo cambiaría. Pero no la tengo, y el ecosistema Dart/Flutter o Kotlin para alguien que no llega del mundo JS tiene más coherencia como punto de entrada.

Eso deja dos.

### Flutter: el camino más directo al primer resultado

Flutter es probablemente el punto de entrada más directo para alguien que viene de fuera del mobile. La razón no es Dart — Dart está bien, pero no es en sí mismo una razón. La razón es que Flutter elimina una categoría entera de confusión: las diferencias de UI entre plataformas.

Cuando escribes una app en Flutter, los widgets que construyes se ven igual en Android y en iOS porque Flutter los renderiza ella misma a través de Impeller. No necesitas entender UIKit ni el sistema de Views de Android. Aprendes el árbol de widgets, aprendes manejo de estado — hay buenas opciones: librerías como Riverpod o Bloc, o el enfoque incorporado con `setState` — y construyes. El ciclo de retroalimentación es rápido. El hot reload funciona de verdad.

El ecosistema es maduro. Flutter 3.41 — lanzado el 11 de febrero de 2026 — llegó tres años después del inicio de la era estable. El ecosistema de paquetes en pub.dev ya tiene lo que necesitarías para la mayoría de integraciones.

Para un desarrollador que quiere ir de "nunca he publicado una app mobile" a "tengo algo corriendo en Android y en iOS lo más rápido posible" — Flutter es el camino más directo.

El tradeoff honesto: Dart es un lenguaje que solo existe para Flutter. Si me alejo de Flutter, el conocimiento de Dart no viaja conmigo. La uniformidad de UI también es una apuesta filosófica — tu app va a verse como una app Flutter, no como una app Android ni como una app iOS. Para ciertos casos de uso eso está bien. Para apps que necesitan sentirse en casa en cada plataforma, es un costo real.

### KMP: la apuesta más sólida para el largo plazo

KMP es una apuesta fundamentalmente diferente. Donde Flutter dice "confía en nuestro renderer, escribe una vez", KMP dice algo distinto: comparte tu lógica, mantén la UI nativa.

La distinción arquitectónica más importante es esta: KMP no reemplaza la UI nativa — vive debajo de ella. Tu capa de Android sigue siendo Jetpack Compose. Tu capa de iOS sigue siendo SwiftUI. Lo que compartes es la lógica de negocio — modelos de datos, networking, almacenamiento, reglas de dominio. La plataforma se siente como ella misma porque la UI es nativa de verdad.

Compose Multiplatform — la capa opcional de JetBrains sobre KMP — va más lejos: te permite compartir también la UI en sintaxis Compose, para Android, iOS, Desktop y Web. [Llegó a estabilidad para iOS en mayo de 2025](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/). Así que si quieres el estilo Flutter de "una sola base de código UI", KMP puede hacer eso ahora. Si prefieres UI nativa por plataforma, también puede hacer eso. Es más flexible — lo que también significa más decisiones.

La señal de adopción es fuerte. Según el [JetBrains Developer Ecosystem Survey](https://kotlinlang.org/docs/multiplatform/multiplatform-reasons-to-try.html), el uso de KMP creció del 7% al 18% de los desarrolladores en un año. Google ha estado migrando sus propias librerías Jetpack a KMP — Room, DataStore, ViewModel, Lifecycle. [Netflix, Philips, Cash App y Quizlet](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/) son usuarios en producción.

El tradeoff honesto: la curva de aprendizaje es más pronunciada. Trabajas en Kotlin — un lenguaje excelente, pero si no lo conoces ya estás aprendiendo eso también. El tooling para iOS, aunque está mejorando, implica una integración con Xcode que puede ser frustrante al principio. La documentación tiene huecos en los bordes.

Pero para un desarrollador con experiencia en backend o en el ecosistema Java/Kotlin, la rampa es más corta de lo que parece desde afuera. Y la filosofía arquitectónica — comparte la lógica, mantén la UI nativa — describe cómo funcionan en la práctica la mayoría de las apps en producción.

Si eso se sostiene en la realidad o solo suena bien en el papel, es la pregunta que viene después.

## Lo que no sé todavía

Honestamente: no sé cuál de las dos voy a terminar eligiendo.

Las dos son apuestas serias. Las dos tienen filosofías coherentes. Las dos tienen producción real detrás. La diferencia no es que una sea objetivamente mejor — es que responden preguntas distintas sobre qué significa "cross-platform".

Flutter dice: una base de código, un motor de renderizado, UI consistente en todas partes. El precio es Dart, un renderer propio, y una UI que no pertenece del todo a ninguna plataforma.

KMP dice: una base de código para la lógica, UI nativa por plataforma. El precio es más complejidad, más código cuando apuntas a las dos plataformas, y un umbral de entrada más alto para empezar.

Para alguien que está aprendiendo, Flutter es probablemente el comienzo más rápido. El ciclo de retroalimentación es más corto. El momento de "tengo algo corriendo" llega antes. Para alguien que está construyendo software en producción que necesita coexistir con codebases nativos — o que necesita sentirse en casa en cada plataforma — KMP es la elección más defendible a largo plazo.

Esta serie va a ir profundo en KMP primero. Ahí aterrizó mi curiosidad. Pero este capítulo no es el veredicto.

Lo que sí sé: no estoy aquí solo para entender el panorama. Quiero construir algo que corra en mi teléfono — algo que todavía no tiene nombre en este capítulo, pero existe. El destino de esta serie no es un documento de comparación. La documentación no es el código. Y el código es lo que vine a escribir.

A seguir construyendo.
