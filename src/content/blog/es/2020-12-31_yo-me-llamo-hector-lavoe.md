---
title: "Yo Me Llamo Héctor Lavoe: Creando un Sitio Web Personal para un Artista Salsero"
description: "La historia de construir un sitio web multimedia para un concursante de 'Yo Me Llamo' que interpreta a Héctor Lavoe — reproductor de audio integrado, galería de fotos y el reto de hacer que un sitio estático se sienta vivo."
pubDate: "2020-12-31"
heroImage: "/images/blog/posts/yo-me-llamo-hector-lavoe/hero.png"
heroLayout: "banner"
tags: ["portfolio", "web-development", "personal", "design"]
---

Yuli me llamó por ahí en 2017. Éramos amigos desde la universidad — de esas amistades que sobreviven la graduación y la distancia y años de apenas hablar, y un día alguien te llama y es como si no hubiera pasado el tiempo.

"¿Le podrías hacer un sitio web a mi esposo?"

Su esposo es músico de salsa. Más exactamente, imita a **Héctor Lavoe** — la leyenda puertorriqueña — y había participado en *[Yo Me Llamo](https://www.caracoltv.com/yo-me-llamo)*, que para los que no son de Colombia es básicamente el programa de televisión de imitación más grande del país. Los concursantes escogen un artista famoso y se convierten en él en tarima. El canto, el look, los gestos. Es un show enorme acá.

Dije que sí antes de que terminara de explicarme qué necesitaba.

---

## El encargo

Lo que me describió era más de lo que esperaba. No era un landing page con una bio y un formulario de contacto. El señor tenía décadas de material — fotos de presentaciones por todo el país, grabaciones de video, una biografía completa que recorría su camino por varias orquestas, y lo más importante: música. Pistas que quería que la gente pudiera escuchar directamente en el sitio.

Entonces la lista de funcionalidades creció rápido: reproductor de audio, galería de fotos, sección de videos, biografía de la trayectoria, formulario de contacto, redes sociales. ¿Cada cosa por separado? Fácil. ¿Todo junto en algo que no parezca un Frankenstein de componentes de Bootstrap? Ahí se pone complicado.

---

## El reproductor de audio fue el problema real

Todo lo demás lo había hecho antes de alguna forma u otra. Galerías, layouts, formularios — trabajo web estándar. Pero integrar un reproductor de música que funcionara bien de verdad? Eso era terreno nuevo para mí.

Escogí **[jPlayer](http://jplayer.org/)**, una librería de audio HTML5 basada en jQuery. En ese momento era de las pocas opciones que te dejaban construir una interfaz personalizada sin importar medio internet. La idea era simple: poner el reproductor en el header para que la música sea lo primero que encuentras. Llegas al sitio, escuchas salsa. Ese es todo el punto.

Hacer que jPlayer reprodujera audio fue la parte fácil. Hacer que se viera como si perteneciera al sitio — eso tomó una eternidad. El skin por defecto es feo. No hay forma bonita de decirlo. Terminé escribiendo CSS personalizado encima, peleando guerras de especificidad contra los estilos propios de jPlayer, tratando de que los controles encajaran con el esquema dorado y negro del resto del sitio. En un momento estaba debuggeando un botón de play que funcionaba en Chrome pero aparecía desalineado en Firefox por exactamente 3 píxeles. Tres píxeles. Me gasté una tarde entera en tres píxeles.

Y después está el móvil. En esa época — y honestamente creo que sigue siendo parcialmente cierto — Safari en iOS tenía sus propias opiniones sobre cuándo el audio debía hacer autoplay y cuándo no. Tuve que agregar workarounds para que el reproductor inicializara bien en iPhones. De esos workarounds que encuentras en la página 3 de un hilo de Stack Overflow de 2015.

---

## El resto del stack

Nada sofisticado: **HTML, CSS, JavaScript, LESS, un poco de PHP** para el formulario de contacto. Sin React. Sin bundler. Editas un archivo, refrescas el navegador, ves si funcionó. Ese tipo de proyecto.

LESS fue la mejor decisión que tomé. El sitio tiene seis secciones — inicio, trayectoria, videos, galería, música y contacto — y sin un preprocesador de CSS la hoja de estilos habría sido inmanejable. Separé todo en módulos: `_gallery.less`, `_player.less`, `_layout.less`, y así. Todo compilado en un solo archivo. Suficientemente limpio.

El PHP era mínimo. Solo el formulario de contacto mandando un correo. Viéndolo ahora, la validación es... digamos optimista. Sin tokens CSRF, sin rate limiting. Funcionó, nadie lo abusó, pero no lo escribiría así hoy.

---

## Diseñando para la salsa

Dos cosas supe temprano sobre la dirección visual: tenía que sentirse como salsa — cálida, enérgica, viva — y tenía que sentirse profesional. Este no es un músico de hobby posteando links de SoundCloud. Es alguien que se presenta en televisión nacional.

Fondos oscuros. Acentos dorados. Tipografía bold en mayúsculas para los encabezados. Fotografía de alto contraste del artista en tarima. El logo de "Yo Me Llamo" visible en el hero. Suena obvio cuando lo describo, pero encontrar el balance entre "festivo" y "serio" tomó varias iteraciones. Las primeras versiones estaban demasiado oscuras — parecían un flyer de discoteca. Tuve que retroceder, agregar más espacio, dejar que las fotos hablaran solas.

La galería me dio más problemas de los que esperaba. Recuerdo ir y venir con el tamaño de las miniaturas — muy pequeñas y no se ve nada, muy grandes y la página es enorme en móvil. Las relaciones de aspecto eran inconsistentes porque las fotos venían de distintos eventos, distintas cámaras, distintos años. Terminé recortando todo al mismo ratio y esperando que nadie notara los bordes perdidos. Nadie lo notó.

---

## Lo que haría diferente

Veo este sitio ahora y veo al desarrollador que era en ese momento. Los breakpoints del responsive son muy pocos — básicamente hay "desktop" y "teléfono" sin nada en el medio. Las imágenes no tienen lazy loading, así que la galería carga todo de entrada. La integración de jPlayer funciona pero el código es desordenado — muchos event handlers inline y callbacks de jQuery que estructuraría completamente diferente hoy.

Pero hizo lo que tenía que hacer. El esposo de Yuli tenía un lugar donde mandar a la gente. La música sonaba. Las fotos se veían bien. La biografía contaba su historia. Cuando alguien le preguntaba "¿tienes página web?" podía decir que sí y dar una URL que no avergonzaba a nadie.

Creo que eso es lo que más valoro de proyectos como este. No son piezas de portafolio que construyes para impresionar a otros desarrolladores. Son cosas que construyes porque alguien que te importa necesitaba ayuda, y tú sabías cómo ayudar.

---

## Dónde está ahora

El sitio ya no se mantiene. La carrera del artista tomó otros rumbos, y la web también — el stack se nota viejo. Pero lo dejé corriendo en [yomellamohectorlavoe.xergioalex.com](https://yomellamohectorlavoe.xergioalex.com/) bajo mi dominio. Una cápsula del tiempo.

Mirando hacia atrás, lo que más recuerdo no es el código ni las decisiones de diseño. Es Yuli mandándome las fotos y las pistas de su esposo por WhatsApp, el ir y venir sobre cuál imagen usar para el hero, el "¡quedó increíble!" cuando le mandé la primera versión funcional. Eso no aparece en un git log, pero es la razón por la que el proyecto existió.

Sigamos construyendo.

---

## Recursos

- [Yo Me Llamo Héctor Lavoe — Sitio en vivo](https://yomellamohectorlavoe.xergioalex.com/) — El sitio web tal como está hoy
- [Repositorio en GitHub](https://github.com/xergioalex/yomellamohectorlavoe) — Código fuente
- [jPlayer](http://jplayer.org/) — La librería de audio/video HTML5 usada para el reproductor de música
- [Yo Me Llamo — Caracol TV](https://www.caracoltv.com/yo-me-llamo) — El programa de televisión colombiano
