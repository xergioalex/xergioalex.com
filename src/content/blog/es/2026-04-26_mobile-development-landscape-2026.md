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

Recuerdo mis primeros años de universidad — estamos hablando de hace más de quince años — cuando necesité desarrollar una app móvil para una materia. En esa época Android Studio no existía todavía; el IDE oficial era Eclipse con el plugin ADT, y era demasiado pesado para mi humilde laptop de ese entonces. No arrancaba, o arrancaba y se comía toda la memoria, o se quedaba compilando en un loop que parecía eterno.

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

Así que empecé a buscar alternativas. Cordova me permitió crear apps híbridas que sirvieron para su propósito: monté mis primeras apps móviles con HTML, CSS y JavaScript empaquetados dentro de un contenedor nativo. Funcionaba. Luego experimenté con Ionic — mismo principio, mejor tooling — y creé un par de prototipos y proyectos con estas tecnologías.

El problema llegaba cuando necesitaba algo más. Cuando el proyecto requería acceso real a los componentes nativos del dispositivo — la cámara, el GPS, los sensores, las notificaciones push — el desarrollo híbrido mostraba sus costuras. Un bridge que tardaba demasiado, una API nativa que no estaba expuesta, un comportamiento que en el navegador funcionaba perfecto pero en el dispositivo se sentía como una app web disfrazada. Y lo era.

Después de eso, abandoné el desarrollo mobile. De nuevo. Y ese "de nuevo" es la parte importante — porque no fue la primera vez ni fue la última. Cada cierto tiempo sentía el impulso de acercarme. Veía un framework nuevo, una demo que se veía increíble, un tutorial que prometía "build your first app in 30 minutes". Pero el desarrollo mobile, a diferencia del frontend o el backend, requiere una cantidad de artefactos que al verlos todos juntos — los certificados, los perfiles de aprovisionamiento, los emuladores, las configuraciones de Gradle o Xcode, las cuentas de desarrollador — el impulso se me iba antes de escribir la primera línea de código. En frontend puedes abrir un archivo HTML y ya tienes algo. En backend, tres líneas levantan un servidor. En mobile, antes de ver "Hello World" en tu teléfono ya pasaste por tres asistentes de configuración y un error de Gradle que te manda a Stack Overflow. La barrera de entrada no era intelectual. Era logística. Y la logística mata la motivación más rápido que la complejidad.

Este año decidí que ya era suficiente. No porque tenga un proyecto urgente que lo requiera — aunque algo hay — sino porque quería entender el estado del arte actual. Encontrar el mejor camino para alguien como yo: un desarrollador full stack con experiencia sólida en backend, frontend e infraestructura, pero que no es experto en nada de mobile. Mi happy path — el que me lleve a crear apps de manera intuitiva, con los mejores estándares posibles, sin tener que pelear contra el ecosistema para empezar.

Antes de escribir una sola línea de código, me senté a entender el panorama. Porque uno de los errores más comunes de quien llega desde backend o web es asumir que el desarrollo mobile es simplemente "programación normal pero en un teléfono". No lo es. Los modelos de estado son distintos. El ciclo de vida de las pantallas funciona diferente. La forma en que piensas la UI — quién la controla, cuándo se destruye, cómo persiste — tiene lógica propia. Antes de elegir una herramienta, quería entender en qué me estaba metiendo.

Este post es ese estado del arte que me senté a entender.

## El problema real no es elegir el framework

Antes de hablar de opciones, hay que nombrar el problema de fondo. La gente que llega desde backend tiende a hacer la pregunta equivocada: "¿qué framework uso?". La pregunta correcta es anterior: "¿qué tiene de diferente este dominio?".

La respuesta más honesta: bastante.

En una solicitud web, el estado vive en el servidor. Haces una petición, el servidor procesa, te devuelve una respuesta. La pantalla que ve el usuario es un snapshot. En una app móvil, el estado vive en la pantalla misma — y cuando el usuario navega hacia otra pantalla, esa pantalla puede destruirse y recrearse. Ese ciclo de vida propio ramifica a través de cada decisión arquitectónica que tomas. ¿Dónde guardas los datos? ¿Quién los actualiza cuando la pantalla vuelve? ¿Qué pasa cuando el sistema operativo mata tu app por falta de memoria?

No es que el backend no tenga complejidad — la tiene. Es que la complejidad es diferente, y el instinto de "pequeño servidor" que te formaste durante años no te sirve directamente acá.[^hook-f]

Eso dicho: el framework sí importa. Y hay demasiados para elegir sin entender primero el terreno.

## Cuatro categorías antes de la lista

Antes de nombrar cada opción, vale la pena establecer las categorías. El ecosistema mobile se organiza en cuatro tipos fundamentales:

**Native** — una plataforma, un lenguaje, acceso completo a las APIs del sistema operativo. Máximo control, máximo lock-in por plataforma. Si construyes native Android, tu app solo corre en Android.

**Cross-platform con UI nativa** — lógica o UI compartida, compilada a nativo. Aquí viven Kotlin Multiplatform (KMP) y Flutter, aunque con filosofías fundamentalmente distintas. Los dos son "cross-platform", pero lo que eso significa para cada uno es diferente.

**Híbrido** — tecnologías web corriendo dentro de un contenedor nativo. React Native mapea componentes JavaScript a vistas nativas — técnicamente no es un híbrido clásico, aunque a menudo se clasifica junto a ellos. Ionic/Capacitor sí es un híbrido más puro: tu HTML y CSS corren en un WebView.

**Web / PWA** — un sitio web que se puede instalar en la pantalla principal. No hay compilación nativa. Funciona muy bien para apps orientadas a contenido; llega a sus límites cuando necesitas integración profunda con el dispositivo.

Esta clasificación va a parecer simple cuando llegues a los detalles — y lo es, un poco. La realidad es que "cross-platform" no es una categoría monolítica. KMP y Flutter son dos apuestas muy distintas sobre qué significa compartir código, y ese matiz importa más de lo que parece al principio.

## Cada opción, sin adornos

Nueve opciones. Una por una. No listas de características — la descripción honesta de qué hace a cada una lo que es, y en qué gana a las demás.

### Native Android — Kotlin + Jetpack Compose

Escribes Kotlin con Jetpack Compose. Tu app es exactamente lo que Google diseñó Android para correr.[^kotlin-google] El sistema operativo te da acceso directo a todas sus APIs, los animations se sienten nativos porque lo son, y nada te va a sorprender en términos de compatibilidad. El costo es sencillo: solo corre en Android. Si algún día necesitas llegar a iOS, estás de vuelta en el punto de partida.

Jetpack Compose 1.10.1 salió en enero de 2026.[^compose-1101] El ecosistema lleva años madurando.

### Native iOS — Swift + SwiftUI

La misma lógica, del lado de Apple. Swift desde 2014[^swift-release], SwiftUI desde 2019[^swiftui-release]. Para 2026 ya van en Swift 6.2 y SwiftUI para iOS 26.[^swift-2026] El ecosistema Apple es hermético y consistente — si te quedas dentro del jardín, todo funciona junto muy bien. El costo es el mismo: solo corre en plataformas Apple.

### Flutter

La apuesta de Google en "build once, run everywhere" (construye una vez, corre en todas partes).[^flutter-tagline] Escribes en Dart — un lenguaje que casi con seguridad no conoces — y Flutter renderiza todo a través de su propio motor gráfico, Impeller, independientemente de los controles nativos de la plataforma.[^flutter-impeller] Eso es tanto su fortaleza como su particularidad: la UI se ve igual en Android y en iOS porque Flutter la dibuja ella misma, no porque adopte los widgets nativos de cada sistema.

¿Eso es una ventaja o un problema? Depende de quién lo pregunte. Para apps con identidad de marca fuerte, para herramientas internas, para juegos — el control total sobre el renderizado es valioso. Para apps que necesitan sentirse exactamente como una app nativa de iOS o de Android — es un costo real.

Flutter 3.41 salió el 11 de febrero de 2026.[^flutter-341] El ecosistema de paquetes en pub.dev es grande. El tooling — `flutter doctor`, DevTools, los plugins de VS Code y Android Studio — está pulido de una manera que sugiere que Google está comprometido seriamente con esto.[^flutter-homepage]

El tradeoff honesto: Dart es un lenguaje que solo usas para Flutter. Si en algún momento te alejas de Flutter, Dart no te acompaña. Es una apuesta sobre el ecosistema de Google, no sobre un lenguaje de propósito general.

### React Native

La apuesta de Meta en que los desarrolladores web no deberían tener que aprender un nuevo paradigma.[^rn-tagline] Escribes JavaScript o TypeScript y obtienes UI nativa — no un WebView, sino componentes mapeados a vistas nativas reales del sistema operativo.

La Nueva Arquitectura (New Architecture) — que eliminó el antiguo bridge y lo reemplazó con JSI, una interfaz C++ real — es ahora obligatoria desde la versión 0.82 y viene por defecto en 0.84.[^rn-084] Eso hace a React Native significativamente más rápido y confiable que el React Native de 2018. Si ya conoces React, este es el camino de menor fricción al móvil.

En octubre de 2025, Meta donó React, React Native y JSX a la React Foundation — parte de la Linux Foundation — haciendo el proyecto formalmente independiente de cualquier empresa.[^react-foundation]

### Kotlin Multiplatform

KMP es una apuesta fundamentalmente distinta. Donde Flutter dice "confía en nuestro renderer, escribe una vez", KMP dice "comparte tu lógica, mantén la UI nativa".[^kmp-stable]

La filosofía es explícita en el posicionamiento de JetBrains: *"share code across platforms while retaining the benefits of native programming"* (compartir código entre plataformas preservando los beneficios de la programación nativa). En la práctica: escribes tus modelos de datos, lógica de negocio, networking y almacenamiento en Kotlin — una vez. Cada plataforma — Android, iOS — tiene su propia capa de UI escrita de forma nativa. En Android, eso es Jetpack Compose. En iOS, eso es SwiftUI. La plataforma se siente como ella misma porque la UI es nativa.

KMP lleva un camino largo desde su introducción en Kotlin 1.2 en 2017.[^kmp-2017] Declaró estabilidad en noviembre de 2023.[^kmp-stable] Compose Multiplatform — la capa opcional que te permite compartir también la UI en sintaxis Compose — llegó a estabilidad para iOS en mayo de 2025[^compose-ios-stable], y lanzó la versión 1.10.0 en enero de 2026.[^compose-110]

La pregunta que KMP deja abierta — cuánto código puedes realmente compartir y cuándo tiene sentido hacerlo — es la más interesante de todo el ecosistema cross-platform. No la voy a responder acá. Esa es la pregunta que exploraré en el siguiente capítulo.[^hook-d]

### Ionic + Capacitor

Una app web dentro de un contenedor nativo. Tu HTML, CSS y JavaScript corren en un WebView; Capacitor provee un puente a las APIs nativas del dispositivo.[^capacitor-8] Si eres desarrollador web y necesitas una app en la tienda, este es el camino de menor resistencia. El tradeoff es honesto: se siente como una app web porque lo es. Para muchos casos de uso eso está bien. Para otros, no.

Capacitor 8 se anunció en diciembre de 2025 y la versión 8.3.0 salió en marzo de 2026.[^capacitor-830]

### .NET MAUI

La apuesta cross-platform de Microsoft para el ecosistema .NET — el sucesor de Xamarin.[^maui-tagline] Corre en Android, iOS, Windows y macOS. Si tu equipo vive en C# y Visual Studio, y ya tienes código .NET, aquí es donde aterrizas. Para alguien que llega desde fuera del ecosistema Microsoft, el punto de entrada es más alto sin un beneficio claro.

.NET MAUI 10 salió con .NET 10 en 2026.[^maui-10]

### Xamarin

Llegó al fin de su vida útil en mayo de 2024.[^xamarin-eol] Microsoft apuntó a todos hacia .NET MAUI. No hay razón para empezar nada nuevo en Xamarin.

### PWA — Progressive Web Apps

Un sitio web que se puede instalar en la pantalla principal. Funciona sorprendentemente bien para apps orientadas a contenido: sin compilación nativa, sin aprobación de tienda, una sola base de código para web y móvil. Los límites llegan rápido cuando necesitas integración real con el dispositivo — acceso a cámara avanzado, Bluetooth, procesamiento en segundo plano — especialmente en iOS, donde el soporte de Safari para APIs web modernas sigue siendo más restrictivo que en Android.[^pwa-limits]

Para ciertos casos de uso, una PWA es la respuesta correcta. Para lo que yo quiero construir, no lo es.

## Antes de elegir: el panorama en una tabla

Antes de ir más a fondo sobre las dos opciones que más me interesan, aquí está cómo se ven todas juntas contra los criterios que me importan. Una advertencia: esta tabla representa mi lectura del panorama desde la documentación y los changelogs. No desde el uso real. Después de meses con dos de ellas, la tabla va a verse diferente en mi cabeza.[^hook-c]

| Opción | Lenguaje(s) | Plataformas | Enfoque de UI | Mantenida por | Mejor para |
|---|---|---|---|---|---|
| Native Android | Kotlin + Jetpack Compose | Android | 100% UI nativa Android | Google | Apps solo Android; equipos que viven en el ecosistema Android |
| Native iOS | Swift + SwiftUI | Plataformas Apple | 100% UI nativa Apple | Apple | Apps solo iOS/macOS; equipos que solo publican en Apple |
| Kotlin Multiplatform | Kotlin | Android, iOS, Desktop, Web | Lógica compartida; UI nativa por plataforma (o Compose Multiplatform para UI compartida) | JetBrains + Google | Equipos que quieren lógica compartida con UI de calidad nativa por plataforma |
| Flutter | Dart | Android, iOS, Web, Desktop | Motor de renderizado propio (Impeller) — misma UI en todas las plataformas | Google | Equipos que quieren una sola base de código UI; prototipado cross-platform rápido |
| React Native | JavaScript / TypeScript | Android, iOS | Mapea componentes JS a vistas nativas | React Foundation (Meta + comunidad) | Equipos web que pasan a mobile; codebases React/JS existentes |
| .NET MAUI | C# | Android, iOS, Windows, macOS | Controles UI nativos por plataforma vía abstracción .NET | Microsoft | Equipos .NET/C#; apps enterprise en el ecosistema Microsoft |
| Ionic + Capacitor | HTML, CSS, JS/TS | Android, iOS, Web | WebViews dentro de un contenedor nativo | Equipo de Ionic | Equipos web; apps web existentes que necesitan presencia mobile instalable |
| PWA | HTML, CSS, JS | Cualquier navegador | UI web estándar (sin controles nativos) | W3C / fabricantes de navegadores | Apps orientadas a contenido; equipos que quieren instalabilidad sin tienda |
| Xamarin | C# | — | — | Microsoft (deprecado) | **No empezar proyectos nuevos.** Fin de soporte: mayo 2024. Migrar a .NET MAUI. |

## Por qué Flutter + KMP son las dos opciones serias para mí

Descarté el resto bastante rápido. El razonamiento:

**Native Android/iOS:** La respuesta solo tiene sentido si ya sabes para cuál de las dos plataformas estás construyendo. Yo no lo sé todavía — quiero llegar a las dos. Irme a native significaría aprender dos lenguajes, dos modelos de UI, dos ecosistemas. Es la respuesta correcta para muchos equipos. No para mí empezando desde cero.

**Ionic/Capacitor:** Ya pasé por esto. Cordova, Ionic — me sirvieron hace quince años para salir del paso en la universidad, pero el tradeoff lo viví en carne propia: cuando necesitas que la app se sienta nativa, el híbrido no llega. Si ya tienes una app web y quieres llevarla a la tienda, es un camino válido. Pero yo estoy construyendo desde cero, y esta vez quiero hacerlo bien.

**.NET MAUI:** No vivo en el ecosistema C#. No hay razón para empezar ahí.

**PWA:** Para el proyecto que tengo en mente, necesito acceso real al dispositivo. Una PWA no llega ahí.

**React Native:** Es una opción seria. La Nueva Arquitectura la hizo una plataforma mucho más sólida de lo que era. Si ya tuviera una base de código React grande, el cálculo cambiaría. Pero no la tengo, y el ecosistema Dart/Flutter o Kotlin para alguien que no llega del mundo JS tiene más coherencia como punto de entrada.

Eso deja dos.

### Flutter: el camino más directo al primer resultado

Flutter es probablemente el punto de entrada más directo para alguien que viene de fuera del mobile. La razón no es Dart — Dart está bien, pero no es en sí mismo una razón. La razón es que Flutter elimina una categoría entera de confusión: las diferencias de UI entre plataformas.

Cuando escribes una app en Flutter, los widgets que construyes se ven igual en Android y en iOS porque Flutter los renderiza ella misma a través de Impeller. No necesitas entender UIKit ni el sistema de Views de Android. Aprendes el árbol de widgets, aprendes manejo de estado — hay buenas opciones: Riverpod, Bloc, el enfoque incorporado con `setState` — y construyes. El ciclo de retroalimentación es rápido. El hot reload funciona de verdad.

El ecosistema es maduro. Flutter 3.41 — lanzado el 11 de febrero de 2026 — llegó tres años después del inicio de la era estable. El ecosistema de paquetes en pub.dev ya tiene lo que necesitarías para la mayoría de integraciones.

Para un desarrollador que quiere ir de "nunca he publicado una app mobile" a "tengo algo corriendo en Android y en iOS lo más rápido posible" — Flutter es el camino más directo.

El tradeoff honesto: Dart es un lenguaje que solo existe para Flutter. Si me alejo de Flutter, el conocimiento de Dart no viaja conmigo. La uniformidad de UI también es una apuesta filosófica — tu app va a verse como una app Flutter, no como una app Android ni como una app iOS. Para ciertos casos de uso eso está bien. Para apps que necesitan sentirse en casa en cada plataforma, es un costo real.

### KMP: la apuesta más sólida para el largo plazo

KMP es una apuesta fundamentalmente diferente. Donde Flutter dice "confía en nuestro renderer, escribe una vez", KMP dice algo distinto: comparte tu lógica, mantén la UI nativa.

La distinción arquitectónica más importante es esta: KMP no reemplaza la UI nativa — vive debajo de ella. Tu capa de Android sigue siendo Jetpack Compose. Tu capa de iOS sigue siendo SwiftUI. Lo que compartes es la lógica de negocio — modelos de datos, networking, almacenamiento, reglas de dominio. La plataforma se siente como ella misma porque la UI es nativa de verdad.

Compose Multiplatform — la capa opcional de JetBrains sobre KMP — va más lejos: te permite compartir también la UI en sintaxis Compose, para Android, iOS, Desktop y Web. Llegó a estabilidad para iOS en mayo de 2025.[^compose-ios-stable] Así que si quieres el estilo Flutter de "una sola base de código UI", KMP puede hacer eso ahora. Si prefieres UI nativa por plataforma, también puede hacer eso. Es más flexible — lo que también significa más decisiones.

La señal de adopción es fuerte. Según el JetBrains Developer Ecosystem Survey, el uso de KMP creció del 7% al 18% de los desarrolladores en un año.[^kmp-adoption] Google ha estado migrando sus propias librerías Jetpack a KMP — Room, DataStore, ViewModel, Lifecycle. Netflix, Philips, Cash App y Quizlet son usuarios en producción.[^kmp-stable]

El tradeoff honesto: la curva de aprendizaje es más pronunciada. Trabajas en Kotlin — un lenguaje excelente, pero si no lo conoces ya estás aprendiendo eso también. El tooling para iOS, aunque está mejorando, implica una integración con Xcode que puede ser frustrante al principio. La documentación tiene huecos en los bordes.

Pero para un desarrollador con experiencia en backend o en el ecosistema JVM, la rampa es más corta de lo que parece desde afuera. Y la filosofía arquitectónica — comparte la lógica, mantén la UI nativa — describe cómo funcionan en la práctica la mayoría de las apps en producción.

Si eso se sostiene en la realidad o solo suena bien en el papel, es la pregunta que viene después.

## Lo que no sé todavía

Honestamente: no sé cuál de las dos voy a terminar eligiendo.

Las dos son apuestas serias. Las dos tienen filosofías coherentes. Las dos tienen producción real detrás. La diferencia no es que una sea objetivamente mejor — es que responden preguntas distintas sobre qué significa "cross-platform".

Flutter dice: una base de código, un motor de renderizado, UI consistente en todas partes. El precio es Dart, un renderer propio, y una UI que no pertenece del todo a ninguna plataforma.

KMP dice: una base de código para la lógica, UI nativa por plataforma. El precio es más complejidad, más código cuando apuntas a las dos plataformas, y un umbral de entrada más alto para empezar.

Para alguien que está aprendiendo, Flutter es probablemente el comienzo más rápido. El ciclo de retroalimentación es más corto. El momento de "tengo algo corriendo" llega antes. Para alguien que está construyendo software en producción que necesita coexistir con codebases nativos — o que necesita sentirse en casa en cada plataforma — KMP es la elección más defendible a largo plazo.[^hook-a]

Esta serie va a ir profundo en KMP primero. Ahí aterrizó mi curiosidad. Pero este capítulo no es el veredicto.

Lo que sí sé: no estoy aquí solo para entender el panorama. Quiero construir algo que corra en mi teléfono.[^hook-e] La documentación no es el código. Y el código es lo que vine a escribir.

A seguir construyendo.

---

[^hook-f]: Este es el patrón que voy a encontrar una y otra vez: los instintos que te formas en backend son válidos, pero no se trasladan directamente. Parte de aprender mobile es aprender cuándo confiar en lo que ya sabes y cuándo ponerlo en pausa.

[^kotlin-google]: Según la documentación oficial de Google para Android: *"Kotlin is Google's preferred language for Android app development."* — [developer.android.com/kotlin](https://developer.android.com/kotlin)

[^compose-1101]: Jetpack Compose 1.10.1, lanzado el 14 de enero de 2026. Fuente: [developer.android.com — Jetpack Compose releases](https://developer.android.com/jetpack/androidx/releases/compose)

[^swift-release]: Swift 1.0 fue lanzado el 9 de septiembre de 2014 con Xcode 6.0 GM. Fuente: [Wikipedia — Swift (programming language)](https://en.wikipedia.org/wiki/Swift_(programming_language))

[^swiftui-release]: SwiftUI fue presentado en WWDC el 3 de junio de 2019. Fuente: [developer.apple.com — WWDC19 session 204](https://developer.apple.com/videos/play/wwdc2019/204/)

[^swift-2026]: Swift 6.2 y SwiftUI para iOS 26 son las versiones activas en 2026. Fuente: [hackingwithswift.com — What's new in SwiftUI for iOS 26](https://www.hackingwithswift.com/articles/278/whats-new-in-swiftui-for-ios-26)

[^flutter-tagline]: Tagline oficial: *"Flutter is an open-source framework for building beautiful, natively compiled, multi-platform applications from a single codebase."* — [flutter.dev](https://flutter.dev)

[^flutter-impeller]: Impeller reemplazó a Skia como renderer por defecto en Flutter: primero en iOS con Flutter 3.10 (mayo 2023), luego en Android con Flutter 3.22 (mayo 2024). Fuente: [docs.flutter.dev — What's new](https://docs.flutter.dev/release/whats-new)

[^flutter-341]: Flutter 3.41 fue lanzado el 11 de febrero de 2026. Fuente: [docs.flutter.dev — What's new](https://docs.flutter.dev/release/whats-new)

[^flutter-homepage]: [flutter.dev](https://flutter.dev)

[^rn-tagline]: Tagline oficial: *"Learn once, write anywhere."* — [reactnative.dev](https://reactnative.dev)

[^rn-084]: React Native 0.84, lanzado el 11 de febrero de 2026, con Hermes V1 como motor por defecto y la Nueva Arquitectura obligatoria desde 0.82. Fuente: [reactnative.dev/blog/2026/02/11/react-native-0.84](https://reactnative.dev/blog/2026/02/11/react-native-0.84)

[^react-foundation]: En octubre de 2025, Meta donó React, React Native y JSX a la React Foundation (parte de la Linux Foundation). Fuente: [engineering.fb.com — Introducing the React Foundation](https://engineering.fb.com/2025/10/07/open-source/introducing-the-react-foundation-the-new-home-for-react-react-native/)

[^kmp-stable]: KMP declaró estabilidad el 1 de noviembre de 2023. Posicionamiento oficial de JetBrains: *"An open-source technology built by JetBrains that allows developers to share code across platforms while retaining the benefits of native programming."* Fuente: [blog.jetbrains.com — Kotlin Multiplatform Stable](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/)

[^kmp-2017]: KMP fue introducido en Kotlin 1.2, presentado en KotlinConf en noviembre de 2017. Fuente: [droidcon.com — Kotlin Multiplatform at Five Years](https://www.droidcon.com/2022/09/29/kotlin-multiplatform-at-five-years/)

[^compose-ios-stable]: Compose Multiplatform para iOS declaró estabilidad en mayo de 2025 con la versión 1.8.0. Fuente: [blog.jetbrains.com — Compose Multiplatform 1.8.0](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/)

[^compose-110]: Compose Multiplatform 1.10.0 lanzado en enero de 2026. Fuente: [blog.jetbrains.com — Compose Multiplatform 1.10.0](https://blog.jetbrains.com/kotlin/2026/01/compose-multiplatform-1-10-0/)

[^capacitor-8]: Capacitor 8 fue anunciado en diciembre de 2025. Fuente: [ionic.io/blog/announcing-capacitor-8](https://ionic.io/blog/announcing-capacitor-8)

[^capacitor-830]: Capacitor 8.3.0 lanzado el 25 de marzo de 2026. Fuente: [github.com/ionic-team/capacitor/releases](https://github.com/ionic-team/capacitor/releases)

[^maui-tagline]: Tagline oficial: *"Build native, cross-platform desktop and mobile apps all in one framework."* — [dotnet.microsoft.com/en-us/apps/maui](https://dotnet.microsoft.com/en-us/apps/maui)

[^maui-10]: .NET MAUI 10.0 se lanzó con .NET 10. Fuente: [infoq.com — .NET 11 Preview 2 MAUI](https://www.infoq.com/news/2026/03/net-11-preview2-maui/)

[^xamarin-eol]: Xamarin llegó al fin de su vida útil el 1 de mayo de 2024. Fuente: [dotnet.microsoft.com — Xamarin Support Policy](https://dotnet.microsoft.com/en-us/platform/support/policy/xamarin)

[^pwa-limits]: El soporte de iOS/Safari para APIs web avanzadas — background sync, Bluetooth, procesamiento en segundo plano — sigue siendo más limitado que en Android. Fuente: [Wikipedia — Progressive web app](https://en.wikipedia.org/wiki/Progressive_web_app)

[^hook-c]: Esta tabla es la lectura desde la documentación y los changelogs. No desde el uso real. Espero que se vea diferente después de meses con las dos opciones que me interesan.

[^hook-d]: La pregunta de cuánto código puedes realmente compartir — y cuándo tiene sentido hacerlo — no tiene respuesta limpia desde la documentación. Es una pregunta práctica, y el siguiente capítulo va a intentar empezar a responderla.

[^kmp-adoption]: Según el JetBrains Developer Ecosystem Survey, el uso de KMP creció del 7% al 18% de los desarrolladores en un año. Fuente: [kotlinlang.org — Reasons to try KMP](https://kotlinlang.org/docs/multiplatform/multiplatform-reasons-to-try.html)

[^hook-a]: La serie va a ir profundo en KMP primero — eso es donde mi curiosidad aterrizó — y después en Flutter. Después de los dos, una elección. La elección no está tomada todavía.

[^hook-e]: Lo que quiero construir todavía no tiene nombre en este capítulo. Pero existe. El destino de esta serie no es un documento de comparación.
