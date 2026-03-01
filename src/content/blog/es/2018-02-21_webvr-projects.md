---
title: "Construyendo Realidad Virtual para la Web: A-Frame, Laberintos y Galerías 360°"
description: "Cómo construí experiencias de WebVR con solo HTML y JavaScript — un laberinto en VR, una galería de fotos 360° y más de 20 demos que demostraron que la realidad virtual no necesita hardware costoso."
pubDate: "2018-02-21"
heroImage: "/images/blog/posts/webvr-projects/hero.jpg"
heroLayout: "banner"
tags: ["portfolio"]
---

Recuerdo el momento exacto en que hizo clic. Estaba mirando un archivo HTML simple — no un proyecto de Unity, no un engine en C++, no un Blueprint de Unreal — solo un archivo HTML. Agregué un `<script>`, escribí unos cuantos elementos personalizados, lo abrí en el navegador, y de repente estaba dentro de una habitación 3D. Incliné el teléfono, lo metí en un visor Cardboard de $7, y la habitación se movía conmigo. Realidad virtual. En un navegador. Desde un archivo HTML.

Eso fue a principios de 2018, y la tecnología se llamaba **WebVR**. El framework era **A-Frame**, creado por Mozilla. Y estaba a punto de convertirse en una de las madrigueras más divertidas en las que me he metido.

---

## La promesa: VR con solo HTML

El panorama de la VR en 2018 tenía un problema. Los visores de gama alta como el HTC Vive y Oculus Rift costaban entre $400 y $500. El desarrollo requería Unity o Unreal Engine — potentes pero complejos. La barrera de entrada era alta, tanto para creadores como para usuarios.

Entonces apareció **A-Frame**. El framework open-source de Mozilla construido sobre Three.js que te permitía crear escenas de VR con sintaxis tipo HTML. Sin paso de compilación. Sin configuración compleja. Si sabías HTML, podías construir VR.

```html
<a-scene>
  <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
  <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
  <a-sky color="#ECECEC"></a-sky>
</a-scene>
```

Eso es una escena 3D completa. Una caja azul, una esfera rosa y un cielo gris. Ábrelo en cualquier navegador y estás viendo un mundo 3D. Dale clic al botón de VR, y lo renderiza en estéreo para un visor. La simplicidad era revolucionaria.

Por debajo, A-Frame usa una arquitectura **Entity-Component System** tomada de los motores de videojuegos. Las entidades son contenedores. Los componentes les dan comportamiento — geometría, material, posición, física. Los sistemas manejan la lógica global. Es el mismo patrón que impulsa los juegos AAA, envuelto en HTML.

---

## Los demos: de primitivas a reconocimiento de voz

No me limité a leer sobre A-Frame — construí cosas. En unas pocas semanas, creé **más de 20 demos en vivo** en CodePen, cada uno explorando una capacidad diferente:

- **Primitivas** — cajas, esferas, cilindros ubicados en espacio 3D ([demo](https://codepen.io/xergioalex/pen/jZxbdo))
- **Cielos 360°** — fotos panorámicas equirectangulares como fondos inmersivos ([demo](https://codepen.io/xergioalex/pen/PQeZYy))
- **Texturas y animaciones** — aplicando imágenes a superficies con transiciones encadenadas ([demo](https://codepen.io/xergioalex/pen/VQxepd))
- **Modelos 3D** — importando archivos Collada desde Blender y SketchUp ([demo](https://codepen.io/xergioalex/pen/JpvXrz))
- **Física** — gravedad, masa y colisiones con Cannon.js ([demo](https://codepen.io/xergioalex/pen/wyjowM))
- **Eventos de cursor** — interacción por mirada donde ver un objeto dispara acciones ([demo](https://codepen.io/xergioalex/pen/rJvLab))
- **Audio espacial** — sonido que cambia según tu posición en la escena ([demo](https://codepen.io/xergioalex/pen/BYxzBw))
- **Reconocimiento de voz** — comandos de voz en VR usando la Web Speech API ([demo](https://codepen.io/xergioalex/pen/rJKxbm))

Cada demo era un bloque de construcción. Cada uno me enseñó algo nuevo sobre cómo funcionan los entornos 3D en el navegador. Y cada uno demostraba lo mismo: la web es lo suficientemente poderosa para experiencias inmersivas.

---

## La galería: caminando entre fotos 360°

El primer proyecto de verdad fue una **galería de fotos 360°** — un cuarto virtual donde podías acercarte a miniaturas panorámicas y hacer clic en ellas para ser transportado dentro de la escena.

El concepto era simple: cargar 18 imágenes panorámicas equirectangulares, organizarlas como miniaturas clickeables en una pared, y cuando alguien hiciera clic en una, cambiar todo el cielo a esa panorámica. De repente estabas parado dentro de una fotografía 360°, mirando en todas las direcciones.

```html
<a-image src="#p1" position="-1.5 1.8 -4" onclick="show('p1')"></a-image>
<a-sky src="#p1" id="sky"></a-sky>
```

Una línea para la miniatura. Una línea para el cielo. Una función de JavaScript de tres líneas para intercambiarlos. La galería entera — 18 panorámicas, navegación interactiva, lista para VR — era un solo archivo HTML.

![Panorámica 360° de la galería](/images/blog/posts/webvr-projects/gallery-panorama.jpg)

Le agregué un cubo flotante y giratorio con el logo de PereiraJS como easter egg, un cursor de mirada para interacción en VR (mirá una miniatura por 800ms y se activa), y controles de cámara para escritorio y móvil.

La galería sigue en línea: [webvr-gallery](https://xergioalex.github.io/webvr-gallery/). Ábrela en tu teléfono, mételo en un visor Cardboard, y recorré las panorámicas.

---

## El laberinto: juego VR con detección de colisiones

El segundo proyecto fue más ambicioso — un **laberinto VR navegable** con física, detección de colisiones, coleccionables y sistema de puntaje.

El laberinto se generaba a partir de un arreglo 2D — la misma técnica usada en el desarrollo clásico de videojuegos:

```javascript
var map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 3, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 1, 0, 1, 0],
  // 0=vacío, 1=pared, 2=jugador, 3=coleccionable
];
```

El script iteraba sobre esta cuadrícula, creaba entidades de pared con textura donde encontraba `1`s, ubicaba la cámara del jugador en el `2`, y generaba cubos coleccionables flotantes en cada `3`. Las paredes tenían imágenes de textura y cuerpos físicos. El jugador tenía un cuerpo cinemático que colisionaba con las paredes — no podías atravesarlas. Los coleccionables desaparecían cuando los mirabas, actualizando un marcador flotante frente a la cámara.

El stack tecnológico era mínimo pero efectivo:
- **A-Frame** para la escena y las entidades
- **aframe-extras** para controles universales y física
- **Cannon.js** (vía aframe-extras) para detección de colisiones
- Un componente **sun-sky** para iluminación exterior realista
- **Piso y paredes con textura** para profundidad visual

![Otra panorámica de la galería VR](/images/blog/posts/webvr-projects/gallery-panorama-2.jpg)

Todo el asunto eran unas 100 líneas de JavaScript y un archivo HTML. Podías jugarlo en escritorio con las teclas WASD o en VR con un visor. El laberinto sigue siendo jugable: [webvr-maze](https://xergioalex.github.io/webvr-maze/).

---

## De proyectos a charlas

Estos proyectos no se quedaron en GitHub. Se convirtieron en la columna vertebral de dos charlas que di sobre WebVR:

La primera fue en [Pereira Tech Talks](/es/blog/webvr-aframe) en febrero de 2018, donde mostré toda la progresión — desde formas primitivas hasta el juego del laberinto — a un salón lleno de desarrolladores. La audiencia sacó los teléfonos y cargó los demos en vivo durante la presentación.

La segunda fue en la [Universidad Remington](/es/blog/webvr-aframe-uniremington) en septiembre de 2019, para un público universitario. Expandí la charla para cubrir VR vs. AR vs. Realidad Mixta, la economía del hardware de VR, y por qué la web es la mejor plataforma de distribución. Estudiantes que nunca habían probado VR la estaban experimentando en sus teléfonos con visores Cardboard al final de la sesión.

Ambas charlas demostraron lo mismo: cuando la VR corre en un navegador, la audiencia puede experimentar lo que estás construyendo en tiempo real. Sin descargas. Sin instalaciones. Solo una URL.

---

## Mirando hacia atrás

WebVR desde entonces evolucionó a **WebXR**, expandiéndose para cubrir realidad aumentada junto con realidad virtual. A-Frame sigue activo y ha crecido significativamente. Las APIs del navegador están más maduras. El panorama del hardware cambió — visores independientes como el Meta Quest hicieron la VR más accesible que nunca.

Pero la idea central de 2018 sigue siendo válida: **la web es la plataforma de distribución más poderosa que tenemos.** Si podés construir una experiencia que corra en un navegador, podés llegar a cualquier persona con un dispositivo y conexión a internet. Sin tiendas de apps. Sin gatekeeping de plataformas. Solo una URL.

Construir esos demos me enseñó a pensar sobre la tecnología de manera diferente. No "¿cuál es la herramienta más poderosa?" sino "¿cuál es la más accesible?" No "¿cómo hago la mejor experiencia de VR?" sino "¿cómo hago que la VR esté disponible para todos?"

Los proyectos siguen en línea y se pueden explorar:

- **Galería VR:** [xergioalex.github.io/webvr-gallery](https://xergioalex.github.io/webvr-gallery/)
- **Laberinto VR:** [xergioalex.github.io/webvr-maze](https://xergioalex.github.io/webvr-maze/)
- **Código fuente:** [webvr-gallery](https://github.com/xergioalex/webvr-gallery), [webvr-maze](https://github.com/xergioalex/webvr-maze)
- **Slides de las charlas:** [Pereira Tech Talks](https://slides.com/xergioalex/webvr-aframe), [UniRemington](https://slides.com/xergioalex/webvr-aframe-uniremington-talk)

Cada demo en esos repos es prueba de que la VR no tiene que ser exclusiva. Solo necesita un navegador.
