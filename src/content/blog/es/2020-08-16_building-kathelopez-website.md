---
title: "Construyendo kathelopez.com: Un Sitio Web para la Práctica de Psicología de Mi Esposa"
description: "Cómo construí un sitio web estático simple, sin framework, para ayudar a mi esposa — terapeuta ABA y neuropsicóloga — a establecer su presencia profesional en línea. Bootstrap, GitHub Pages y cero backend."
pubDate: "2020-08-16"
heroImage: "/images/blog/posts/building-kathelopez-website/hero.png"
heroLayout: "banner"
tags: ["portfolio", "tech", "personal", "web-development"]
---

Katherine necesitaba un sitio web.

No una landing page de startup. No un producto SaaS. Un sitio profesional simple para una psicóloga construyendo su carrera en Pereira, Colombia. Mi esposa — Astrid Katherine López Vanegas — es terapeuta ABA y trabaja con niños con trastornos del neurodesarrollo. Había ido creciendo su práctica a través de referidos y el voz a voz, pero no tenía un solo lugar en internet donde un padre pudiera buscarla, ver sus credenciales y contactarla.

Ese es el tipo de problema que puedo resolver en un fin de semana. Y eso hice.

---

## Por Qué lo Necesitaba

La terapia ABA — Análisis de Comportamiento Aplicado — es un campo especializado. La mayoría de los pacientes de Katherine llegan por referidos de otros profesionales o clínicas. Pero pasa algo: cuando un padre recibe un referido, lo primero que hace es buscar el nombre en Google. Y si no aparece nada — ni sitio web, ni perfil profesional, ni forma de verificar credenciales — ese referido pierde peso.

Katherine tenía más de cuatro años de experiencia trabajando con niños con necesidades especiales. Había trabajado en Centro APAES, CGI Colombia, y estaba en Creer IPS Neurorehabilitación Integral. Tenía certificaciones en terapia ABA de Fono Genius, un diplomado en neuropsicopedagogía, un título de psicología de la Universidad Católica de Pereira. Después completaría una maestría en neuropsicología clínica en la Universidad Internacional de Valencia. Todo eso — y sin presencia web.

Quería arreglar eso. No como un desarrollador buscando un proyecto, sino como alguien que quería ayudar a la carrera de su esposa.

---

## El Enfoque: Por Qué Elegí No Usar Framework

Sé lo que estás pensando. Soy desarrollador full-stack. Trabajo con Astro, React, arquitecturas serverless, contenedores, pipelines de CI/CD. Podría haber construido esto en Next.js. Podría haber montado un CMS headless con un design system personalizado y despliegues automatizados.

No lo hice.

La razón: el sitio de Katherine es una sola página. Tiene una sección de "sobre mí", su experiencia, sus servicios, un formulario de contacto y sus credenciales. El contenido cambia quizás dos veces al año — cuando termina una certificación o actualiza su foto de perfil. No hay blog, no hay contenido dinámico, no hay cuentas de usuario. Nada que justifique un paso de build, un runtime de framework o una cuenta de hosting.

Así que fui con el stack más simple que hiciera el trabajo: **HTML, SCSS, Bootstrap 4, jQuery y GitHub Pages**. Costo total de hosting: cero. Overhead de framework: cero. Tiempo de despliegue: push a `master`.

Honestamente, lo más difícil no fue la tecnología. Fue resistir la tentación de sobreingeniería. Me sorprendí, más de una vez, pensando en agregar un CMS "por si acaso" o montar un pipeline de build con Webpack. Tuve que recordarme: esto no es para mí. Es para Kathe. Necesita que funcione, que se vea profesional y que esté arriba. Eso es todo.

---

## Qué Hace el Sitio

El sitio es un solo `index.html` con varias secciones, todo en una página con scroll.

### El Hero

Arriba, un banner de ancho completo con su nombre y una animación de texto rotativo — de esas donde las palabras van cambiando una por una:

*Soy Psicóloga. / Terapeuta. / Terapeuta ABA. / Neuropsicóloga.*

Animación CSS simple. Le da a los visitantes una idea inmediata de lo que hace sin leer un párrafo.

### Sobre Mí

Su biografía profesional — quién es, su filosofía, su enfoque terapéutico. El tono es cálido y directo: se describe como empática, organizada y comprometida con mejorar el bienestar psicológico de sus pacientes. Hay una foto profesional al lado del texto.

### Hoja de Vida

Esta es la sección con más estructura. Usa un layout con pestañas — Experiencia, Educación, Certificaciones, Habilidades — para que los visitantes puedan buscar lo que necesitan sin hacer scroll por todo.

Su sección de experiencia lista sus posiciones cronológicamente: desde su trabajo inicial como psicóloga social en PSICO Salud y Transformación, pasando por sus roles de terapia ABA en Centro APAES y CGI Colombia, hasta su puesto actual en Creer IPS. Educación cubre su título de psicología y después su maestría en neuropsicología clínica. Certificaciones incluye sus cursos de ABA de Fono Genius y su especialización en modificación conductual.

### Servicios

Enfocado en terapia ABA con servicio domiciliario. Este es un diferenciador clave. Katherine va a la casa del niño en lugar de requerir que las familias viajen a una clínica. Para padres de niños con trastornos del neurodesarrollo, eso importa.

### Formulario de Contacto — Lo Ingenioso

Esta es probablemente la decisión técnica más interesante de todo el sitio. Katherine necesitaba una forma para que potenciales pacientes la contactaran. La solución obvia: un formulario de contacto con backend — tal vez un servidor Node.js, tal vez una función serverless, tal vez un servicio de formularios de terceros.

Usé **Google Forms**.

Así funciona: creé un Google Form con los campos que necesitaba (nombre, email, teléfono, mensaje). Después hice ingeniería inversa de la URL de envío del formulario y conecté un formulario HTML con estilos personalizados que hace POST directamente al endpoint de Google. Sin servidor. Sin backend. Sin API keys. Cuando alguien llena el formulario en kathelopez.com, los datos van directo a un Google Spreadsheet, y Katherine recibe una notificación por email.

Cero costo. Cero mantenimiento. Me tomó unas horas hacer que el JavaScript quedara bien — hubo algo de prueba y error con los IDs de los campos y el endpoint de envío. Pero una vez funcionó, siguió funcionando. Cinco años después, es el mismo código.

### Hosting: GitHub Pages

Todo el sitio está alojado en **GitHub Pages** con un dominio personalizado — `kathelopez.com`. HTTPS gratis, despliegues automáticos al hacer push, cero configuración más allá de un archivo CNAME. No necesité Vercel. No necesité Netlify. No necesité un VPS. Push a `master` y está en línea. Para un sitio que se actualiza dos veces al año, este es el modelo de hosting perfecto.

### El Acabado

El sitio usa [AOS](https://michalsnik.github.io/aos/) (Animate on Scroll) para animaciones sutiles de entrada. Los elementos aparecen con fade, se deslizan hacia arriba y se muestran a medida que haces scroll. Es un detalle pequeño, pero hace que el sitio se sienta más pulido que una página estática plana. Y como AOS es liviano, no ralentiza nada.

El grid de Bootstrap maneja el diseño responsive. El sitio se ve bien en escritorio y móvil sin que yo escriba un solo media query a mano. También hay un efecto parallax en algunas secciones — una imagen de fondo que se mueve a diferente velocidad al hacer scroll. Puramente decorativo, pero agrega profundidad.

---

## La Marca

La identidad visual de Katherine pasó por una evolución. La versión inicial usaba una paleta de colores genérica y no tenía logo. Pero en febrero de 2021, rediseñamos la marca:

- Un **monograma "AK"** personalizado — sus iniciales, Astrid Katherine — con un degradado de azul a rosa que se siente profesional pero no frío
- Un color principal de **#c82c75** — un rosa/magenta vibrante que ella eligió. No era mi primera opción, honestamente. Yo habría ido con algo más sobrio. Pero es su sitio, su marca, su personalidad. Y viéndolo ahora, funciona.
- **Poppins** de Google Fonts para una tipografía limpia y moderna
- Identidad visual consistente en todas las secciones

El logo está arriba de la página y aparece en la tarjeta SEO cuando alguien comparte el enlace en redes sociales. Esa tarjeta SEO — la misma imagen que estoy usando como hero para este post — tiene su monograma, sus servicios y su información de contacto. Limpia, reconocible.

---

## Cinco Años de Mantenimiento Silencioso

Esto es lo que me parece interesante de este proyecto: el historial de commits cuenta la historia de un sitio web que creció con una carrera. Veinticuatro commits en cinco años. No muchos. Pero cada uno marca un momento real.

**16 de agosto de 2020** — Día de lanzamiento. Subí la plantilla base, agregué su nombre y foto de perfil, configuré las meta tags de SEO, configuré el dominio personalizado vía CNAME, y dejé listos el hero banner y la sección "sobre mí". Siete commits en un día. Esa es la energía de "sacarlo al aire".

**13 de septiembre de 2020** — Integración del formulario de contacto. Cuatro commits para hacer funcionar el envío con Google Forms. El prueba y error que mencioné antes.

**22 de febrero de 2021** — El gran rediseño. Eliminé los assets genéricos anteriores, agregué el monograma AK, actualicé el color principal a #c82c75. Aquí fue cuando el sitio obtuvo su verdadera identidad.

**Septiembre de 2022** — Actualización SEO. Agregué Google Analytics GA4, actualicé el favicon, refresqué las meta tags y keywords. Tres commits, todos en un día. El sprint de "déjame ajustar esto".

**Julio de 2025** — La actualización más reciente. Katherine terminó su maestría en neuropsicología clínica en la Universidad Internacional de Valencia, así que actualicé su sección de educación, refresqué su foto de perfil y agregué nuevas habilidades. El sitio creció porque ella creció.

Eso es todo. Sin refactors mayores. Sin migraciones de framework. Sin actualizaciones de dependencias que rompieran todo. El sitio hace lo que necesita hacer, y lo ha estado haciendo durante cinco años sin drama.

---

## Lo Que Aprendí

Construir para alguien que amas es diferente de construir para un cliente. No hay documento de alcance. No hay sprint planning. No hay "el stakeholder quiere agregar una funcionalidad". Solo hay: qué necesita ella, y cómo lo hago bien.

Y la respuesta, en este caso, fue: mantenlo simple.

Podría haber usado este proyecto como playground para tecnología nueva. Podría haber probado un generador de sitios estáticos, configurado despliegues automatizados, agregado un backend de formulario con funciones serverless. Pero nada de eso habría servido mejor a Katherine. Ella no necesita un pipeline de CI/CD. Necesita una página que cargue rápido, se vea profesional y tenga una forma de que la gente la contacte.

La herramienta correcta para el trabajo no siempre es la más nueva. A veces es Bootstrap 4, jQuery y un solo archivo HTML desplegado en GitHub Pages gratis. Y eso está bien.

También aprendí algo sobre el mantenimiento. Cuando construyes algo simple, el mantenimiento es simple también. No me da pereza actualizar su sitio. No hay un `npm audit` escupiendo 47 vulnerabilidades. No hay una versión mayor de framework con breaking changes. No hay un config de Webpack que debuggear. Abro `index.html`, cambio lo que haga falta, push, y listo. Esa simplicidad no es una limitación — es una decisión deliberada.

Y tal vez la lección más grande: un desarrollador no necesita demostrar nada con el tech stack. Lo que importa es el resultado. El sitio de Katherine la ha ayudado a conectar con familias, mostrar sus credenciales y presentarse profesionalmente. No necesitó React para eso. No necesitó una base de datos. Necesitaba existir, verse bien y ser fácil de encontrar.

A veces lo más útil que un desarrollador puede construir no es lo más técnicamente impresionante. Es lo que realmente le ayuda a alguien.

---

## Recursos

- **Repositorio en GitHub:** [xergioalex/kathelopez.com](https://github.com/xergioalex/kathelopez.com)
- **Sitio web en vivo:** [kathelopez.com](https://www.kathelopez.com/)

---

Sigamos construyendo.
