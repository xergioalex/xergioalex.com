---
title: "Construyendo Rocka.co: La Historia Detrás del Sitio Web de un Tech Venture Builder Premiado"
description: "Cómo construimos el sitio web de Rocka.co — desde metáforas con estatuas clásicas y efectos parallax personalizados hasta un Special Kudos en CSS Design Awards. La historia de crear la identidad digital de la incubadora donde nació DailyBot."
pubDate: "2017-12-15"
heroImage: "/images/blog/posts/building-rocka-co-website/hero.png"
heroLayout: "banner"
tags: ["portfolio", "tech"]
---

Algunos proyectos son solo trabajo. Recibes el brief, escribes el código, lo despliegas. Otros se te meten bajo la piel. Se vuelven parte de tu historia — entretejidos en las memorias de sesiones de código a medianoche, discusiones frente a la pizarra sobre colores, y ese tipo específico de energía que solo ocurre cuando las personas que construyen algo realmente creen en lo que están haciendo.

Construir el sitio web de [Rocka.co](https://www.rocka.co/) fue uno de esos proyectos.

Rocka no es solo una empresa con la que trabajé. Es la incubadora donde nació [DailyBot](https://www.dailybot.com/) — donde un grupo de makers, builders y emprendedores se unieron para experimentar, prototipar y lanzar productos desde cero. Es donde pasé años escribiendo código, rompiendo cosas, aprendiendo haciendo, y construyendo en lo que se sentía como hackathones permanentes. Así que cuando llegó el momento de construir el sitio web corporativo — la puerta digital que le diría al mundo quién es Rocka — no era solo otro proyecto. Era personal.

---

## La visión: Rocka como una roca sólida

Antes de escribir una sola línea de código, necesitábamos responder una pregunta fundamental: ¿cómo se *siente* Rocka?

Trajimos a [Sergio Ruiz](https://www.behance.net/sergioruiz), un diseñador prestigioso cuyo portafolio habla por sí solo. Trabajar con Sergio fue una de las mejores decisiones que tomamos — no solo diseñó pantallas, nos ayudó a encontrar un lenguaje visual que capturaba algo esencial de lo que Rocka es.

El concepto era audaz: **Rocka es un asteroide — una roca sólida de la cual nacen grandes productos.** Piénsalo como una fundación. Una plataforma de lanzamiento. Algo masivo y firme que envía cosas a órbita. Esa metáfora se convirtió en la columna vertebral de todo lo visual en el sitio.

Y entonces llegó la idea que elevó todo el proyecto — estatuas clásicas como la identidad visual.

---

## Dioses y estatuas: diseño como metáfora

Sergio propuso usar **estatuas clásicas griegas y romanas** como el elemento visual central. No como relleno decorativo — cada estatua representaba un pilar de lo que Rocka hace como tech venture builder.

**El Discóbolo** — el famoso lanzador de disco griego — se convirtió en la cara visual del servicio Boost (Fractional CTO/CPO). Representa acción, impulso, la energía cinética de empujar un negocio hacia adelante. Cuando una empresa necesita liderazgo experimentado para acelerar su tecnología y producto — eso es el Discóbolo lanzando el disco.

**Poseidón** — dios del mar, portador del tridente — fue emparejado con el servicio Enterprise (Tech Due Diligence). Autoridad. Profundidad. La capacidad de ver debajo de la superficie y entender el verdadero estado de un stack tecnológico. Cuando los inversores necesitan una evaluación técnica clara de una startup antes de invertir — eso es Poseidón.

Las estatuas aparecen por todo el sitio — en las secciones hero con efectos parallax, en el modal de contacto al hacer hover, como elementos de fondo en diferentes secciones. Cada estatua tiene un tratamiento de **doble capa**: la imagen en sí más una capa de sombra, cada una moviéndose a diferentes velocidades de parallax para crear una sensación de profundidad y tridimensionalidad.

La conexión con "Rocka" es implícita pero poderosa. Roca. Piedra. Esculturas clásicas talladas en mármol. Solidez. Permanencia. Fundamentos que perduran. Todo se conecta sin necesidad de explicarlo explícitamente.

---

## La paleta de colores y la tipografía

Sergio construyó el sistema visual alrededor de tres colores que funcionan como personajes en una historia.

Un **azul marino profundo, casi negro** domina todo — los fondos, las secciones hero, el espacio entre elementos. Es el cielo nocturno. El fondo del océano. Le da al sitio esa sensación inmersiva y cinematográfica donde las estatuas y el texto parecen flotar contra el infinito. Luego un **rojo vibrante** corta a través — enérgico, imposible de ignorar — marcando los momentos que demandan atención. Y un **azul eléctrico** aporta el contrapunto tecnológico — claridad, precisión, el complemento frío al calor del rojo.

Juntos, los tres colores crean contraste sin caos. El azul marino te atrapa. El rojo te despierta. El azul te guía hacia adelante.

Para la tipografía, elegimos **GT-Walsheim** como la fuente principal — limpia, geométrica, moderna — combinada con **Knockout 90** para los encabezados display. Knockout es una tipografía condensada de peso pesado que le da a las secciones hero una presencia audaz, casi brutalista. Cuando ves "DESIGN. BUILD. LAUNCH." en Knockout contra un fondo azul marino con estatuas clásicas — el impacto es diferente.

---

## El stack técnico: Hugo y las herramientas de 2017

Para la base técnica, elegimos **Hugo** — el generador de sitios estáticos escrito en Go. En ese momento, Hugo era el SSG más rápido disponible, y para un sitio corporativo que sería principalmente orientado a contenido con efectos visuales ricos, era la elección perfecta.

Así se veía el stack:

- **Hugo v0.27.1** — Generación de sitios estáticos con un tema custom "Rocka"
- **SCSS/Sass** — Arquitectura CSS modular con compilación Node-sass
- **Bootstrap v4.0.0-alpha.6** — Sí, la versión *alpha* — fuimos early adopters
- **jQuery** — Manipulación del DOM (la lingua franca del frontend en 2017)
- **Particles.js** — Efectos atmosféricos de partículas
- **AOS (Animate On Scroll)** — Animaciones activadas por scroll
- **Slick Carousel** — Sliders para la sección Life at Rocka
- **Moment.js + Moment Timezone** — Para los relojes en tiempo real del footer
- **Bower** — Gestión de dependencias frontend
- **Grunt** — Task runner para el pipeline de build
- **Babel** — Transpilación ES2015

Ver esta lista hoy es como abrir una cápsula del tiempo. Bower, Grunt, jQuery, Bootstrap 4 alpha — estas eran las herramientas de la época. ¿Y saben qué? Funcionaron. El sitio se lanzó, se veía increíble y ganó premios. Las herramientas no eran el punto — la artesanía lo era.

El pipeline de build era directo: Grunt manejaba la concatenación, minificación (uglify para JS, cssmin para CSS, htmlmin para HTML) y la eliminación de comentarios. Babel transpilaba nuestro código ES6 a ES5 para compatibilidad con navegadores. Todo compilaba en dos bundles — `vendors.js` para librerías y `dist.js` para código custom — más `vendors.css` y `main.css` para los estilos.

También configuramos un **entorno de desarrollo Docker** con una imagen de Node 18 + Hugo, para que cualquier desarrollador pudiera levantar todo el proyecto con un solo comando. Sin excusas de "en mi máquina funciona".

---

## El parallax personalizado: profundidad a través del código

Uno de los puntos técnicos destacados del sitio es el **sistema de parallax personalizado**. No usamos una librería externa para esto — escribimos nuestro propio plugin, `parallaxImages.js`.

El concepto es simple pero efectivo: mientras el usuario hace scroll, diferentes elementos se mueven a diferentes velocidades, creando una ilusión de profundidad. Cada elemento parallax tiene un atributo `data-speed` (valores como 10, 20, 28, 38) y un `data-parent-section` para anclar el cálculo relativo a su sección contenedora.

La fórmula:

```javascript
yPos = -(((scrollTop - offsetParent) * speed) / 100);
element.style.transform = `translate3d(0, ${yPos}px, 0)`;
```

Usar `translate3d` en lugar de posicionamiento `top` activa la aceleración GPU en el navegador — una optimización crucial para animaciones de scroll suaves a 60fps.

Pero aquí es donde entra el pragmatismo: **deshabilitamos el parallax completamente en Safari**. En ese momento, Safari tenía problemas de renderizado con cálculos parallax complejos que causaban scroll entrecortado y artefactos visuales. En vez de pelear contra el navegador, priorizamos la experiencia del usuario — los usuarios de Safari ven el sitio sin parallax, y sigue viéndose genial.

De forma similar, **las animaciones AOS de scroll están deshabilitadas en dispositivos móviles**. No porque no funcionen, sino porque en hardware móvil más lento de 2017, podían causar tartamudeo. Performance sobre estética. Siempre.

---

## Partículas, colores y atmósfera

**Particles.js** maneja los efectos atmosféricos — círculos flotantes conectados por líneas delgadas, desplazándose lentamente por el fondo de diferentes secciones. La configuración es personalizada: alrededor de 80–100 partículas por sección, con colores que cambian dependiendo de en qué sección estén — partículas grises en fondos claros, partículas azules en las secciones azul marino, partículas blancas en las secciones rojas.

Una decisión de optimización: **el movimiento de las partículas está deshabilitado por defecto**. Las partículas empiezan estáticas y solo comienzan su desplazamiento lento cuando el usuario hace scroll hasta ellas. Esto reduce la carga de renderizado en la carga inicial — un detalle pequeño, pero el tipo de decisión que suma.

El color de fondo de toda la página **cambia dinámicamente** según qué sección está en el viewport. Mientras haces scroll desde el hero hacia la sección Boost, el body hace transición del azul marino profundo al rojo vibrante. Haces scroll hacia Tech Due Diligence y cambia a azul eléctrico. Hacia Labs y se suaviza a gris. La transición toma 0.5 segundos — suave, sutil, inmersiva.

En móvil, el fondo dinámico se deshabilita y se establece como transparente por rendimiento. Cada decisión visual en el sitio tiene esta doble naturaleza — la experiencia completa en desktop, una versión simplificada pero igualmente hermosa en móvil.

---

## Los relojes: estamos en todas partes

Uno de mis detalles favoritos es el **footer**. Tres relojes analógicos mostrando la hora actual en Madrid (MAD), Nueva York (NYC) y Medellín (MED) — las tres ciudades donde el equipo de Rocka está distribuido.

No son imágenes decorativas — son **relojes en tiempo real** construidos con Moment.js y Moment Timezone, calculando la hora, minuto y segundo actual para cada zona horaria. Cada reloj renderiza 60 marcas CSS con manecillas rotatorias de hora, minuto y segundo.

Es un detalle sutil pero significativo. El mensaje es implícito: *estamos distribuidos, siempre estamos trabajando, y lo abrazamos*. Se conecta directamente con los valores de Rocka — **Remote. Flexible. Focused.** — sin necesidad de deletrearlo en un párrafo de texto corporativo.

---

## Storytelling en el copy

Hablando de texto — una de las cosas que hace especial al sitio de Rocka es el **copy**. Esto no es jerga corporativa genérica. Cada sección cuenta una historia.

La página About abre con: *"In a galaxy far far away..."* — un guiño a Star Wars que inmediatamente establece un tono lúdico y humano. Continúa: *"We were born as tech entrepreneurs, willing to create digital products to solve big problems, and willing to do so for our lifetime."*

La sección Labs declara: *"Makers. Builders. Creators."* Tres palabras que capturan todo sobre la cultura — los hackathones permanentes, las sesiones de código a medianoche, los prototipos que eventualmente se convirtieron en productos reales como DailyBot y Bambú.

Y la metáfora recurrente que lo une todo: *"help you establishing the technical foundation (a solid 'rock') for the future of your business."* Rocka. Rock. Fundación. Todo se conecta de vuelta a esa idea central.

El encabezado "WE MAKE IMPACT" en la página About tiene su propio truco visual — **tres capas de texto superpuestas** en rojo, azul y azul marino primario, cada una moviéndose a diferentes velocidades de parallax. Mientras haces scroll, las capas se separan y convergen, creando un efecto de profundidad tipográfica que refuerza el mensaje.

---

## Lo que el sitio comunica

Más allá de los efectos visuales y la implementación técnica, el sitio de Rocka hace algo que muchos sitios web corporativos no logran — **comunica identidad a través del diseño**, no solo a través de palabras.

Los tres pilares del negocio son claros:

- **Boost** — Servicio de Fractional CTO/CPO. *"15h/week of experienced leadership to move your business forward."* La estatua del Discóbolo. Impulso. Acción.
- **Tech Due Diligence** — Un servicio para inversores y fundadores. *"Get an executive report about the startup status in terms of tech, infrastructure, frameworks, security, and product development practices."* Poseidón. Autoridad. Profundidad.
- **Rocka Labs** — El laboratorio de productos. *"We are constantly researching and shipping new products from our Lab."* Makers construyendo DailyBot, Bambú, Breeze y más.

El equipo distribuido entre Madrid, NYC y Medellín — visible en los relojes del footer. La cultura maker — visible en la sección Labs y la narrativa de "hackathones permanentes". El ADN emprendedor — visible en la sección de liderazgo donde fundadores con respaldo de Y Combinator y más de 15 años de experiencia respaldan la marca.

El diseño *es* comunicación. Cada efecto parallax, cada transición de color, cada elección de estatua fue deliberada.

---

## CSS Design Awards: Special Kudos

Después del lanzamiento, enviamos el sitio a **[CSS Design Awards](https://www.cssdesignawards.com/sites/rocka/32032/)** — una de las plataformas más respetadas para reconocer diseño web excepcional.

El resultado: **Special Kudos 2017**.

Los jueces lo calificaron:
- **UI Design:** 7.25 / 10
- **UX Design:** 7.10 / 10
- **Innovation:** 6.97 / 10

Recibir reconocimiento de una comunidad internacional de diseño significó mucho para el equipo. No por los puntajes en sí — sino porque validó el enfoque. Un sitio estático construido con Hugo, animado con JavaScript personalizado, diseñado alrededor de estatuas clásicas como metáforas — funcionó. Resonó. Personas fuera de nuestra burbuja lo vieron y dijeron: esto es bueno.

Para un equipo pequeño y distribuido construyendo todo in-house, ese tipo de validación externa importa más de lo que uno pensaría.

---

## Lecciones y reflexiones

Construir rocka.co me enseñó cosas que llevo conmigo hasta hoy:

**Un sitio estático puede ser inmersivo.** Hay una idea errónea de que "estático" significa "aburrido" o "limitado." Rocka.co demuestra lo contrario. Con parallax, partículas, animaciones de scroll, colores dinámicos y relojes en tiempo real — todo servido desde archivos HTML estáticos — puedes crear una experiencia que se siente viva y dinámica sin server-side rendering ni frameworks JavaScript pesados.

**El diseño debe contar una historia.** Las estatuas no eran solo decoración. Los relojes no eran solo widgets. Las transiciones de color no eran solo efectos. Cada decisión de diseño comunicaba algo sobre quién es Rocka y qué valora. Los mejores sitios web no solo se ven bien — *significan* algo.

**El rendimiento es una decisión de diseño.** Deshabilitar parallax en Safari. Apagar animaciones en móvil. Iniciar partículas en estado estático. No son compromisos — son decisiones de diseño que priorizan la experiencia del usuario sobre el ego del desarrollador.

**Las herramientas importan menos que la artesanía.** Construimos esto con Bower, Grunt, jQuery y Bootstrap 4 alpha. Herramientas que hoy se consideran legacy. Pero el sitio sigue en pie, sigue viéndose genial, y sigue comunicando exactamente lo que Rocka es. Las herramientas son un medio. La artesanía es lo que perdura.

Y a nivel personal — Rocka es donde todo empezó para mí. Los experimentos, los productos, la cultura maker. DailyBot comenzó como una de esas ideas de noches en el Lab. Construir el sitio web fue una forma de empaquetar toda esa energía e intención en algo que el mundo pudiera ver.

Estoy orgulloso de lo que construimos. No solo el sitio web — sino todo lo que representa.

Sigamos construyendo.

---

## Recursos

- [Rocka.co](https://www.rocka.co/) — El sitio web en producción
- [CSS Design Awards — Rocka](https://www.cssdesignawards.com/sites/rocka/32032/) — Special Kudos 2017
- [DailyBot](https://www.dailybot.com/) — Uno de los productos nacidos en Rocka Labs
- [Hugo](https://gohugo.io/) — El generador de sitios estáticos utilizado
- [Particles.js](https://vincentgarreau.com/particles.js/) — La librería de efectos de partículas
- [AOS](https://michalsnik.github.io/aos/) — Librería Animate On Scroll
