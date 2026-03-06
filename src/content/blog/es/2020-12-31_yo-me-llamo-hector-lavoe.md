---
title: "Yo Me Llamo Héctor Lavoe: Creando un Sitio Web Personal para un Artista Salsero"
description: "La historia de construir un sitio web multimedia para un concursante de 'Yo Me Llamo' que interpreta a Héctor Lavoe — reproductor de audio integrado, galería de fotos y el reto de hacer que un sitio estático se sienta vivo."
pubDate: "2020-12-31"
heroImage: "/images/blog/posts/yo-me-llamo-hector-lavoe/hero.png"
heroLayout: "banner"
tags: ["portfolio", "web-development", "personal", "design"]
---

Hay proyectos que nacen de contratos. Otros de la energía de un side project. Y otros nacen de una amiga que te dice: "Oye, ¿le podrías hacer un sitio web a mi esposo?"

Así empezó este.

---

## La historia detrás

Yuli fue de esas amigas de la universidad con las que conectas de verdad — de esas personas con las que sigues hablando mucho después de graduarte. Su esposo es músico. No cualquier músico — es imitador de **Héctor Lavoe**, el legendario cantante de salsa puertorriqueño, y concursó en *Yo Me Llamo*.

Para quien no conozca el programa: [Yo Me Llamo](https://www.caracoltv.com/yo-me-llamo) es uno de los shows de televisión más populares de Colombia, donde los concursantes imitan a artistas famosos. No se trata de ser uno mismo — se trata de *convertirse* en alguien más. El canto, el estilo, la presencia escénica. El público y los jueces evalúan qué tan cerca llegas del original.

Participar en ese programa es un logro grande. Y una vez que estás ahí, tener una presencia profesional en línea importa. Yuli me contactó, y yo dije que sí sin pensarlo dos veces.

---

## Lo que el sitio necesitaba

No era una página de portafolio típica ni un landing page cualquiera. Los requisitos venían del contenido mismo — la carrera de un artista es inherentemente multimedia:

- **Reproducción de música** — Necesitaba que los visitantes pudieran *escuchar* sus presentaciones. No enlaces a Spotify o YouTube. Un reproductor integrado, ahí mismo en la página.
- **Galería de fotos** — Fotos de presentaciones, eventos, imágenes detrás de cámaras del programa. Organizadas y navegables.
- **Sección de videos** — Grabaciones de conciertos y apariciones en televisión.
- **Biografía** — Una sección detallada de su trayectoria cubriendo décadas de trabajo musical en Colombia, desde la orquesta Borinquen hasta giras nacionales.
- **Contacto** — Un formulario para consultas de contratación, más enlaces a redes sociales.

El reto no era ninguna función individual. Era lograr que todas coexistieran en un sitio que se sintiera pulido y cohesivo — no como cinco cosas diferentes pegadas con cinta.

---

## El problema del reproductor de audio

La sección de música fue el desafío técnico más interesante. Necesitaba un reproductor que funcionara de manera confiable en todos los navegadores, manejara múltiples pistas y se viera lo suficientemente bien como para encajar con la identidad visual del sitio.

Elegí **[jPlayer](http://jplayer.org/)** — una librería de audio y video HTML5 basada en jQuery. En ese momento, jPlayer era una de las mejores opciones para integrar reproductores de audio personalizados sin cargar un framework enorme. Me daba control sobre la interfaz, soportaba playlists y manejaba las inconsistencias entre navegadores que hacían del audio en la web un dolor de cabeza.

Hacerlo funcionar fue una cosa. Lograr que se *sintiera* integrado fue otra. El reproductor está en la parte superior del sitio — siempre visible, siempre accesible. Llegas a la página y su música está ahí. Eso fue intencional. Para un artista, la música debería ser lo primero que la gente experimenta, no algo enterrado a tres clics de profundidad.

Honestamente, lo más difícil fue el estilo visual. jPlayer te da un reproductor funcional, pero la apariencia por defecto es... genérica. Pasé más tiempo ajustando el CSS de ese reproductor de lo que me gustaría admitir.

---

## Construyendo el sitio

El stack era directo para la época: **HTML, CSS, JavaScript, LESS y un poco de PHP** para el formulario de contacto. Sin framework. Sin sistema de build. Solo archivos, un preprocesador para estilos y el tipo de trabajo frontend donde abres `index.html` en un navegador y le das refresh.

El sitio tiene seis secciones principales:

- **Inicio** — Un hero a ancho completo con la marca "Yo Me Llamo", el artista actuando en escenario. Fondo oscuro, tipografía bold. El reproductor de audio integrado directo en el header.
- **Trayectoria** — Su camino musical desde la universidad hasta giras nacionales. Esta sección es larga — el hombre tiene décadas de experiencia en múltiples orquestas y agrupaciones musicales.
- **Videos** — Grabaciones de presentaciones y conciertos.
- **Galería** — Colecciones de fotos organizadas por evento, con miniaturas clicables.
- **Música** — La sección de jPlayer con sus pistas.
- **Contacto** — Formulario de contratación, correo, teléfono, redes sociales.

LESS hizo manejable la parte de estilos. Podía separar todo en módulos — un archivo para la galería, otro para el reproductor, otro para el layout — y compilar todo en un solo archivo CSS. Sin eso, la hoja de estilos habría sido un desastre.

---

## Decisiones de diseño

La identidad visual tenía que comunicar dos cosas: salsa y profesionalismo. Este no es un músico de hobby — es alguien que se presenta en televisión nacional.

Opté por un **esquema de colores oscuros** — principalmente negros y grises profundos — con **acentos dorados/amarillos** que hacen referencia a la calidez de la música salsa y la cultura latina. La tipografía es bold y en mayúsculas en los encabezados, más legible en el cuerpo. La sección hero usa fotografía de alto contraste — el artista en el escenario, micrófono en mano, con el logo de "Yo Me Llamo" visible.

Algo con lo que batallé fue la galería. Las galerías de fotos suenan simples hasta que las construyes. Tamaño de miniaturas, relaciones de aspecto, rendimiento de carga, comportamiento en móvil — cada una es una pequeña decisión que se acumula. Terminé con una grilla de miniaturas que se expanden al hacer clic, organizadas por tipo de evento. Nada revolucionario, pero funcional y limpio.

---

## Lo que aprendí

Construir para un cliente no técnico — especialmente uno en las artes — me enseñó cosas que los proyectos puramente de ingeniería no enseñan.

**El contenido dirige todo.** No podía decidir el layout hasta saber qué contenido existía. ¿Cuántas fotos? ¿Qué tan larga es la biografía? ¿Cuántas pistas de audio? Las respuestas a esas preguntas moldearon la arquitectura. No al revés.

**El audio en la web es más difícil de lo que parece.** Entre las inconsistencias de navegadores, las políticas de autoplay y las limitaciones en móvil, lograr una experiencia de audio confiable fue más trabajo que construir el resto del sitio combinado. Creo que el audio sigue siendo una de las áreas más descuidadas del desarrollo web.

**Los proyectos personales pesan.** Este no fue un cliente de gran presupuesto. No había equipo de diseño, ni project manager, ni tablero de Jira. Solo yo, el contenido que Yuli y su esposo proporcionaron, y muchas idas y vueltas sobre qué se veía bien. Pero me alegra haberlo hecho. Construir algo para alguien que te importa tiene una energía diferente que construir para una empresa.

---

## Dónde está hoy

El sitio ya no se mantiene activamente — la carrera del artista ha seguido adelante, y la web también. Pero lo mantuve vivo en [yomellamohectorlavoe.xergioalex.com](https://yomellamohectorlavoe.xergioalex.com/) como subdominio de mi sitio personal. Es una foto de un momento en el tiempo — tanto de la carrera del artista como de mis propias habilidades en ese punto.

Viéndolo ahora, veo todas las cosas que haría diferente. El comportamiento responsive podría ser mejor. La galería podría usar lazy loading. El formulario de contacto en PHP es una reliquia. Pero también veo algo que funciona, que cuenta una historia y que cumplió su propósito cuando importaba.

No todos los proyectos necesitan ser de última tecnología. A veces solo necesitan ser los correctos para la persona para la que los estás construyendo.

Sigamos construyendo.

---

## Recursos

- [Yo Me Llamo Héctor Lavoe — Sitio en vivo](https://yomellamohectorlavoe.xergioalex.com/) — El sitio web tal como está hoy
- [Repositorio en GitHub](https://github.com/xergioalex/yomellamohectorlavoe) — Código fuente
- [jPlayer](http://jplayer.org/) — La librería de audio/video HTML5 usada para el reproductor de música
- [Yo Me Llamo — Caracol TV](https://www.caracoltv.com/yo-me-llamo) — El programa de televisión colombiano
