---
type: internal
title: "El panorama móvil en 2026"
description: "El mapa que armé antes de escribir código: nueve frameworks, cuatro categorías, y por qué Flutter y KMP quedaron como los dos caminos serios."
pubDate: 2026-04-26
tags: [tech, mobile, talks]
draft: true
theme: dark
transition: slide
syntaxHighlight: true
math: false
eventName: "Aprendiendo desarrollo móvil — Deck companion de la serie"
eventDate: 2026-04-26
relatedPost: mobile-development-landscape-2026
---

<!-- ==================== Portada ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #2a76dd 100%)" -->

# Móvil en 2026

### El mapa que armé antes de escribir código

<small>Sergio Alexander Florez · Abril 2026</small>

Note: Abrir con el ángulo personal — esto no es un reporte comparativo; es un mapa que dibujé para mí antes de aprender móvil desde cero como desarrollador backend.

---

<!-- ==================== Sección 01 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 01</span>
  <h2>Por qué lo seguía evitando</h2>
</div>

---

<div class="slide-stat">
  <span class="slide-stat__number">15+</span>
  <span class="slide-stat__label">años llamándome "full stack" mientras esquivaba móvil por completo</span>
  <p class="slide-stat__context">Backend, frontend, infra, DevOps — pero móvil siempre fue "lo que hacen los demás".</p>
</div>

---

## Dónde empezó

<div class="slide-grid-2 slide-grid--align-center">
  <div>
    <img src="/images/blog/posts/mobile-development-landscape-2026/eclipse-helios-loading.webp" alt="Pantalla de carga de Eclipse Helios con el plugin ADT, alrededor de 2011" width="1024" height="576" class="slide-image-full" />
  </div>
  <div>
    <h3>~2011 · Curso universitario</h3>
    <p>Eclipse Helios + plugin ADT. El IDE que se comía cada byte de RAM de mi laptop. Antes del "Hello World" ya habías pasado por tres asistentes de configuración.</p>
  </div>
</div>

---

<blockquote class="slide-quote">
  "La logística mata la motivación más rápido que la complejidad."
</blockquote>
<cite class="slide-quote-cite">— Sergio Florez · Panorama móvil 2026</cite>

---

## Instinto de backend vs realidad móvil

<div class="slide-grid-2">
  <div>
    <h3>Lo que sabía</h3>
    <ul>
      <li>El estado vive en el servidor</li>
      <li>Request → response → snapshot</li>
      <li>Tres líneas levantan un servidor</li>
    </ul>
  </div>
  <div>
    <h3>Lo que móvil realmente es</h3>
    <ul>
      <li>El estado vive en la pantalla</li>
      <li>El SO puede destruirla y recrearla</li>
      <li>El ciclo de vida ramifica cada decisión</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Sección 02 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 02</span>
  <h2>Cuatro categorías antes de la lista</h2>
</div>

---

## Las cuatro categorías

<div class="slide-grid-3">
  <div class="slide-card">
    <span class="slide-card__icon">🔒</span>
    <h3>Native</h3>
    <p>Una plataforma, un lenguaje, acceso total al SO. Máximo control, máximo lock-in.</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">🔀</span>
    <h3>Cross-platform</h3>
    <p>Lógica o UI compartida que compila a nativo. KMP y Flutter viven aquí — filosofías distintas.</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">🌐</span>
    <h3>Hybrid / Web</h3>
    <p>Tecnología web dentro de un shell nativo, o una PWA que instalas. Mínima fricción, techos reales.</p>
  </div>
</div>

---

<!-- ==================== Sección 03 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 03</span>
  <h2>Nueve opciones en el mapa</h2>
</div>

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

<!-- ==================== Sección 04 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #2a76dd 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 04</span>
  <h2>Dos caminos, dos filosofías</h2>
</div>

---

## Dos apuestas sobre "cross-platform"

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

<div class="slide-stat">
  <span class="slide-stat__number">7% → 18%</span>
  <span class="slide-stat__label">Crecimiento de adopción de KMP entre desarrolladores en un año</span>
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
      <li>Dos capas de UI que mantener</li>
      <li>Integración con Xcode todavía áspera en los bordes</li>
    </ul>
  </div>
</div>

---

<!-- ==================== Sección 05 ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Parte 05</span>
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
<cite class="slide-quote-cite">— Sergio Florez · Cierre del capítulo</cite>

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

<!-- ==================== Cierre ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f172a 0%, #2a76dd 100%)" -->

## Lee la serie

<p>El capítulo completo (y los siguientes) viven en el blog:</p>

<a href="/es/blog/series/learning-mobile-development" class="slide-cta">Abrir la serie →</a>

<small>xergioalex.com · @XergioAleX</small>

Note: Cierre — invitar a la audiencia a seguir la serie. Se construye en público; el capítulo 2 entra a KMP desde cero.
