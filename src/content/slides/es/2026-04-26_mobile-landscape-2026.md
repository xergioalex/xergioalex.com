---
type: internal
title: "El panorama móvil en 2026"
description: "El mapa que armé antes de escribir código: nueve frameworks móviles, cuatro categorías y por qué Flutter y KMP son los dos caminos que sigo considerando."
pubDate: 2026-04-26
heroImage: "/images/slides/mobile-landscape-2026/hero.webp"
tags: [tech, mobile, talks]
draft: false
theme: dark
transition: slide
syntaxHighlight: true
math: false
eventName: "Aprendiendo desarrollo móvil — Deck companion de la serie"
eventDate: 2026-04-26
relatedPost: mobile-development-landscape-2026
---

<!-- ==================== Portada ==================== -->

<!-- .slide: data-background-image="/images/slides/mobile-landscape-2026/hero-es.webp" data-background-size="cover" data-background-position="center" -->

&nbsp;

Note: Abrir con el ángulo personal. Esto no es un reporte comparativo — es el mapa que dibujé para mí antes de aprender desarrollo móvil desde cero como desarrollador backend. Marcar el tono: honesto, en primera persona, sin pose de experto. La imagen de portada va full-bleed — sin texto encima, el diseño habla por sí mismo.

---

<!-- ==================== Sección 01 — La atracción ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 01</span>
  <h2>Por qué desarrollo móvil para mí siempre fue "algún día"</h2>
</div>

---

<img src="/images/slides/mobile-landscape-2026/full-stack-not-mobile-es.webp" alt="Infografía: 15+ años considerándome full stack — Backend, Web, Infra, APIs, Base de datos, Cloud, DevOps — pero el desarrollo móvil siempre lo fui dejando para después" width="1024" height="576" class="slide-image-full" />

Note: La imagen ancla la charla en lo personal. 15+ años de carrera completa en todo menos mobile. La barrera al final del camino hacia el celular es el remate visual — la audiencia va a sentir la identificación.

---

## Mi problema con el desarrollo móvil

<img src="/images/slides/mobile-landscape-2026/mobile-dev-problem-es.webp" alt="Diagrama caótico de la configuración de desarrollo móvil: descarga del IDE, instalación del SDK, emuladores, herramientas de compilación, plugins, permisos, certificados y conflictos conectados por cables enredados" width="1024" height="576" class="slide-image-full" />

Note: Dejar que la imagen hable. El caos visual — cables, warnings, pasos interminables — es exactamente lo que siente cualquiera que intenta arrancar en desarrollo móvil por primera vez. No explicar demasiado; la audiencia va a reconocer el dolor.

---

<img src="/images/slides/mobile-landscape-2026/tried-several-times-es.webp" alt="Infografía: Lo intenté varias veces — cuatro intentos de arrancar en desarrollo móvil, cada uno bloqueado por configuración de IDE, SDK, emuladores, plugins, certificados y conflictos de build" width="1024" height="576" class="slide-image-full" />

Note: La imagen cuenta la historia sola. Cuatro intentos, todos bloqueados por logística antes de escribir código útil. Dejar que la audiencia la lea — el reconocimiento es inmediato.

---

## Mi primer proyecto móvil fue en la universidad

<img src="/images/slides/mobile-landscape-2026/84-years-meme.webp" alt="Meme de Rose en Titanic: Han pasado 84 años" width="520" height="291" style="display:block;margin:0 auto;" />

<p style="text-align:center;">Durante una materia de emprendimiento</p>

Note: El meme rompe la tensión. La audiencia se ríe y conecta — todos tienen esa historia de un proyecto universitario que fue su único contacto real con mobile. Pausa corta para la risa, después seguir.

---

<img src="/images/slides/mobile-landscape-2026/business-model-canvas.webp" alt="The Business Model Canvas — plantilla de modelo de negocio con secciones de socios clave, actividades, propuesta de valor, relaciones con clientes, segmentos, canales, estructura de costos y fuentes de ingreso" width="720" height="480" style="display:block;margin:0 auto;" />

Note: El Business Model Canvas como contexto visual — en esa materia de emprendimiento usábamos esta herramienta. La app móvil era parte del proyecto final. No hace falta explicar cada casilla, solo que la audiencia reconozca el canvas.

---

<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-helios-loading.webp" alt="Pantalla de carga de Eclipse Helios con el plugin ADT, alrededor de 2011" width="1024" height="576" class="slide-image-full" />

Note: La pantalla morada de carga de Eclipse Helios. La audiencia que vivió esa época va a reconocerla al instante. Para los más jóvenes, es evidencia visual de lo áspero que era el tooling.

---

## Eclipse con plugin ADT

<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-adt-layout-editor.webp" alt="Editor gráfico de layouts de Eclipse ADT mostrando una app Hello World de Android con la paleta de widgets" width="991" height="612" class="slide-image-full" />

---

## Y el emulador

<img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-adt-emulator.webp" alt="Emulador de Android dentro de Eclipse con teclado físico virtual y panel DDMS" width="1024" height="576" class="slide-image-full" />

Note: La tercera imagen de Eclipse. La mitad menor de 30 nunca vio esto y la mayor está haciendo muecas.

---

## Mi computador no corría Eclipse con plugin ADT

<img src="/images/slides/mobile-landscape-2026/low-resources-barrier.webp" alt="Desarrollador frustrado frente a un laptop viejo con Eclipse trabado, íconos de recursos insuficientes y un muro bloqueando el camino hacia el desarrollo móvil" width="1024" height="576" class="slide-image-full" />

Note: La primera barrera real: hardware insuficiente. Eclipse + ADT + emulador necesitaban más de lo que el laptop del estudiante podía dar. La barrera no era intelectual — era logística.

---

## Después probé híbrido

<div class="slide-grid-2">
  <div>
    <h3>Lo que funcionó</h3>
    <ul>
      <li>Cordova → primeras apps en producción</li>
      <li>Ionic → mejor tooling, prototipos reales</li>
      <li>HTML + CSS + JS dentro de un contenedor nativo</li>
    </ul>
  </div>
  <div>
    <h3>Dónde se rompió</h3>
    <ul>
      <li>Cámara, GPS, sensores, push</li>
      <li>El bridge era demasiado lento</li>
      <li>Se sentía como una app web — porque lo era</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Sección 02 — La diferencia real ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 02</span>
  <h2>La diferencia real no es el framework</h2>
</div>

---

## El runtime ya no es tuyo

<div class="slide-grid-2 slide-grid--align-center">
  <div>

```kotlin
class MainActivity : AppCompatActivity() {
  override fun onCreate(
    savedInstanceState: Bundle?
  ) {
    super.onCreate(savedInstanceState)
    // La pantalla que ves ya fue
    // destruida y recreada por el SO.
    // Rehidrata desde disco, no de memoria.
  }
}
```

  </div>
  <div>
    <h3>Mira el parámetro</h3>
    <ul>
      <li><code>savedInstanceState</code> existe porque el SO puede matar tu pantalla en cualquier momento</li>
      <li>El estado tiene que sobrevivir en disco, no en RAM</li>
      <li>No eres dueño del ciclo de vida — el SO lo es</li>
    </ul>
  </div>
</div>

Note: Una pequeña pieza de código hace más trabajo que un párrafo entero acá. La presencia de `savedInstanceState` en la firma más básica de Android es toda la historia del ciclo de vida móvil comprimida en una línea.

---

## Instinto de backend vs realidad móvil

<div class="slide-grid-2">
  <div>
    <h3>Lo que sabía</h3>
    <ul>
      <li>El estado vive en el servidor</li>
      <li>Request → response → snapshot</li>
      <li>Tres líneas levantan un servidor</li>
      <li>El navegador es una pestaña predecible</li>
    </ul>
  </div>
  <div>
    <h3>Lo que el mundo móvil realmente es</h3>
    <ul>
      <li>El estado vive en la pantalla</li>
      <li>El SO la destruye y la recrea</li>
      <li>El ciclo de vida ramifica cada decisión</li>
      <li>El runtime es de Android o iOS</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Sección 03 — Cuatro categorías ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 03</span>
  <h2>Cuatro categorías antes de la lista</h2>
</div>

---

## Las cuatro formas que toma el ecosistema

<div class="slide-grid-2">
  <div class="slide-card">
    <span class="slide-card__icon">🔒</span>
    <h3>Nativo</h3>
    <p>Una plataforma, un lenguaje, acceso total al SO. <strong>Máximo control, máximo lock-in.</strong></p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">🔀</span>
    <h3>Cross-platform, UI nativa</h3>
    <p>Lógica o UI compartida que compila a nativo. <strong>KMP y Flutter viven acá — filosofías distintas.</strong></p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">📦</span>
    <h3>Híbrido</h3>
    <p>Tecnología web dentro de un shell nativo. <strong>Mínima fricción, techos reales.</strong></p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">🌐</span>
    <h3>Web / PWA</h3>
    <p>Un sitio que instalas en la pantalla de inicio. <strong>Sin app store. Sin sensación nativa.</strong></p>
  </div>
</div>

---

## Como pilas de arquitectura

<img src="/images/blog/posts/mobile-development-landscape-2026/categories-es.webp" alt="Diagrama de cuatro torres de arquitectura comparando Nativo, Cross-platform UI nativa, Híbrido y Web/PWA. Cada torre muestra las capas entre el código del desarrollador y el hardware del dispositivo." width="1400" height="876" class="slide-image-full" />

<small>De izquierda a derecha: más capas entre tu código y el dispositivo. Nativo es el camino más directo; PWA, además de capas, está restringido por el sandbox del navegador.</small>

Note: Este es el diagrama del blog post. Recórrelo de izquierda a derecha. La audiencia recordará este diagrama más tiempo que cualquier lista.

---

<!-- ==================== Sección 04 — Nueve opciones ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 04</span>
  <h2>Nueve opciones en el mapa</h2>
</div>

---

## Las que vale la pena considerar

- **Android nativo** — Kotlin + Jetpack Compose <!-- .element: class="fragment fade-up" -->
- **iOS nativo** — Swift + SwiftUI <!-- .element: class="fragment fade-up" -->
- **Flutter** — Dart + motor Impeller <!-- .element: class="fragment fade-up" -->
- **React Native** — JS/TS, nativo vía JSI <!-- .element: class="fragment fade-up" -->
- **Kotlin Multiplatform** — lógica compartida, UI nativa <!-- .element: class="fragment fade-up" -->
- **Ionic + Capacitor** — web dentro de un WebView <!-- .element: class="fragment fade-up" -->
- **.NET MAUI** — C#, sucesor de Xamarin <!-- .element: class="fragment fade-up" -->
- **PWA** — sitio instalable <!-- .element: class="fragment fade-up" -->
- **~~Xamarin~~** — EOL Mayo 2024 · no empieces acá <!-- .element: class="fragment fade-up" -->

Note: Revelar uno por uno. Unos 10 segundos por opción. El punto es el volumen — la audiencia tiene que sentir el tamaño del espacio de decisión antes de que lo reduzcamos.

---

## Lado a lado

<table class="slide-table">
  <thead>
    <tr><th>Opción</th><th>Lenguaje</th><th>Plataformas</th><th>UI</th></tr>
  </thead>
  <tbody>
    <tr><td>Android nativo</td><td>Kotlin + Compose</td><td>Android</td><td>Nativa</td></tr>
    <tr><td>iOS nativo</td><td>Swift + SwiftUI</td><td>Apple</td><td>Nativa</td></tr>
    <tr><td>Kotlin Multiplatform</td><td>Kotlin</td><td>Android, iOS, Desktop, Web</td><td>Nativa (o Compose MP)</td></tr>
    <tr><td>Flutter</td><td>Dart</td><td>Android, iOS, Web, Desktop</td><td>Custom (Impeller)</td></tr>
    <tr><td>React Native</td><td>JS / TS</td><td>Android, iOS</td><td>Nativa vía JSI</td></tr>
    <tr><td>.NET MAUI</td><td>C#</td><td>Android, iOS, Win, macOS</td><td>Nativa vía .NET</td></tr>
    <tr><td>Ionic + Capacitor</td><td>HTML / CSS / JS</td><td>Android, iOS, Web</td><td>WebView</td></tr>
    <tr><td>PWA</td><td>HTML / CSS / JS</td><td>Cualquier navegador</td><td>Web</td></tr>
    <tr><td><s>Xamarin</s></td><td><s>C#</s></td><td>—</td><td>EOL Mayo 2024</td></tr>
  </tbody>
</table>

---

<!-- .slide: class="slide-bg-pattern--grid" -->

## Descartes rápidos

<div class="slide-grid-2">
  <div>
    <h3>Fuera</h3>
    <ul>
      <li><strong>Solo nativo</strong> — quiero llegar a ambas</li>
      <li><strong>Ionic / Capacitor</strong> — viví esto, choqué el techo</li>
      <li><strong>.NET MAUI</strong> — no estoy en el mundo C#</li>
      <li><strong>PWA</strong> — necesito acceso real al dispositivo</li>
      <li><strong>Xamarin</strong> — EOL</li>
    </ul>
  </div>
  <div>
    <h3>Quizás</h3>
    <ul>
      <li><strong>React Native</strong> — sólido, pero raíces JS</li>
    </ul>
    <h3>Quedan</h3>
    <ul>
      <li><strong>Flutter</strong> — el camino más rápido a un primer resultado</li>
      <li><strong>Kotlin Multiplatform</strong> — la apuesta más defendible a largo plazo</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Sección 05 — Dos caminos ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #2a76dd 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 05</span>
  <h2>Dos apuestas sobre "cross-platform"</h2>
</div>

---

## Dos filosofías, un mismo cuarto

<div class="slide-grid-2">
  <div>
    <h3>🐦 Flutter</h3>
    <p><em>"Confía en nuestro renderer, escribe una vez."</em></p>
    <ul>
      <li>Dart + motor Impeller</li>
      <li>Misma UI en todas las plataformas — por diseño</li>
      <li>Hot reload, pub.dev maduro</li>
      <li><strong>3.41</strong> · Feb 2026</li>
    </ul>
  </div>
  <div>
    <h3>🟣 Kotlin Multiplatform</h3>
    <p><em>"Comparte la lógica, mantén la UI nativa."</em></p>
    <ul>
      <li>Capa Kotlin compartida · UI nativa por plataforma</li>
      <li>Jetpack Compose ↔ SwiftUI a cada lado</li>
      <li>Estable desde Nov 2023</li>
      <li>Compose MP <strong>1.10</strong> · Ene 2026</li>
    </ul>
  </div>
</div>

---

## Cómo se ve la "lógica compartida" en KMP

```kotlin [1-2|4-9|11-15]
// commonMain — corre en Android Y en iOS
package com.example.shared

class UserRepository(private val api: HttpClient) {
  suspend fun getUser(id: String): User {
    val response = api.get("/users/$id")
    if (!response.ok) throw NotFoundException()
    return response.body()
  }
}

// androidMain → consumido por Jetpack Compose
// iosMain     → consumido por SwiftUI
// Mismo modelo de datos. Misma llamada de red.
// Cada plataforma se queda con su propia UI.
```

Note: Highlight por pasos. Primero el package — código común. Después la función — la lógica que de verdad se comparte. Después el bloque de comentarios — donde vive la UI. El punto: KMP no reemplaza a SwiftUI ni a Compose, vive debajo de ellos.

---

<div class="slide-stat">
  <span class="slide-stat__number">7% → 18%</span>
  <span class="slide-stat__label">Crecimiento de adopción de KMP entre desarrolladores en un solo año</span>
  <p class="slide-stat__context">Fuente: JetBrains Developer Ecosystem Survey</p>
</div>

---

## KMP — el largo camino hasta acá

<ul class="slide-timeline">
  <li><time>2017</time><span>Introducido en Kotlin 1.2 en KotlinConf</span></li>
  <li><time>Nov 2023</time><span>KMP declarado estable</span></li>
  <li><time>May 2025</time><span>Compose Multiplatform para iOS pasa a estable</span></li>
  <li><time>Ene 2026</time><span>Compose MP 1.10.0 liberado</span></li>
  <li><time>2026</time><span>Google migrando librerías Jetpack (Room, DataStore, ViewModel) a KMP</span></li>
</ul>

---

## Lo que cuesta cada uno

<div class="slide-grid-2">
  <div>
    <h3>Flutter — tradeoffs honestos</h3>
    <ul>
      <li>Dart solo existe para Flutter</li>
      <li>La UI no termina de pertenecer a ninguna plataforma</li>
      <li>Renderer custom ≠ sensación nativa real</li>
    </ul>
  </div>
  <div>
    <h3>KMP — tradeoffs honestos</h3>
    <ul>
      <li>Curva de aprendizaje más empinada</li>
      <li>Dos capas de UI que mantener (a menos que uses Compose MP)</li>
      <li>Integración con Xcode todavía áspera en los bordes</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Sección 06 — El plan ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 06</span>
  <h2>El plan desde acá</h2>
</div>

---

## Proceso — qué viene

<ol class="slide-steps">
  <li><strong>Mapa</strong><br/>Entender el panorama (este capítulo).</li>
  <li><strong>KMP primero</strong><br/>Donde aterrizó la curiosidad. Construir algo real.</li>
  <li><strong>Después Flutter</strong><br/>El mismo ejercicio. La misma vara.</li>
  <li><strong>Decidir</strong><br/>Después de ambos, con evidencia — no con vibras.</li>
</ol>

---

<blockquote class="slide-quote">
  "Un mapa no es el territorio. El territorio es a lo que vine a aprender."
</blockquote>
<cite class="slide-quote-cite">— Cierre del capítulo</cite>

---

## Lo que esta serie NO va a ser

<div class="slide-grid-3">
  <div class="slide-card">
    <span class="slide-card__icon">❌</span>
    <h3>Una mirada de experto</h3>
    <p>Estoy arrancando desde cero. La arrogancia de la llegada todavía no apareció.</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">❌</span>
    <h3>Un doc "Flutter vs KMP"</h3>
    <p>Los documentos comparativos fingen que la respuesta es universal. No lo es.</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">✅</span>
    <h3>Un viaje real</h3>
    <p>Construido en público, con tradeoffs nombrados, decisiones registradas, errores publicados.</p>
  </div>
</div>

---

## ¿Preguntas antes de aterrizar?

<div class="slide-grid-2 slide-grid--align-center">
  <div>
    <h3>Cosas que vale la pena preguntar</h3>
    <ul>
      <li>¿Cuál es el lenguaje actual de tu equipo?</li>
      <li>¿Una plataforma primero, o las dos a la vez?</li>
      <li>¿Cuánta fidelidad de UI necesitas?</li>
      <li>¿Ya tienes una app web para portar?</li>
    </ul>
  </div>
  <div>
    <h3>Cosas que no vale la pena preguntar</h3>
    <ul>
      <li>"¿Cuál es objetivamente mejor?"</li>
      <li>"¿Qué usa la empresa X?"</li>
      <li>"¿Dart se está muriendo?"</li>
    </ul>
  </div>
</div>

Note: Puente opcional para Q&A. Saltar si vas largo. La asimetría entre las dos columnas es el remate.

---

<!-- ==================== Cierre ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f1124 0%, #2a76dd 100%)" -->

## Lee la serie

<p>El capítulo completo (y los siguientes) viven en el blog:</p>

<a href="/es/blog/series/learning-mobile-development" class="slide-cta">Abrir la serie →</a>

<small>xergioalex.com · @XergioAleX</small>

Note: Cierre — invita a la audiencia a seguir la serie. Se construye en público; el capítulo 2 entra a KMP desde cero.
