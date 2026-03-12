---
title: "Construyendo sergioykathe.com: el sitio web que creé para nuestra boda"
description: "El sitio de invitación de nuestra boda: Astro, Svelte, GitHub Pages y cero backend. Invitaciones personalizadas con código único y confirmación de asistencia vía Google Forms."
pubDate: "2025-01-10"
heroImage: "/images/blog/posts/building-wedding-website-sergioykathe/hero.webp"
heroLayout: "side-by-side"
tags: ["portfolio", "tech", "personal", "web-development", "design"]
keywords: ["sitio web de boda con Astro y Svelte", "invitaciones de boda personalizadas con código único", "RSVP boda con Google Forms sin backend", "página web matrimonio estática GitHub Pages", "cómo crear sitio web de boda gratis", "sistema confirmación asistencia boda Google Sheets", "invitación de boda personalizada URL única"]
---

La mayoría de los proyectos empiezan con una reunión y un documento de requerimientos. Este empezó con mi esposa mostrándome ideas de sitios web de boda que había guardado en Instagram.

"Quiero algo así para nuestra boda," me dijo. Y la manera en que lo dijo — como si fuera algo obvio que simplemente debía existir — fue al mismo tiempo un halago y un reto. Katherine llevaba semanas recopilando referencias. Sabía exactamente qué secciones quería: detalles del evento, un contador regresivo, información sobre vestimenta, lista de regalos, sugerencias de canciones, una galería de fotos y una forma para que los invitados confirmaran su asistencia. Ella tenía la visión del contenido. Yo tenía el teclado.

Así empezó [sergioykathe.com](https://www.sergioykathe.com/).

---

## La cliente era mi esposa

He construido sitios web para empresas, startups, proyectos open source y para la consulta de psicología de Kathe. Pero esto era diferente — construir el sitio de invitación de tu propia boda, donde la "cliente" es tu futura esposa, tiene un tipo de presión particular. No hay contrato, no hay planeación de sprints, no hay PM. Solo: esto necesita estar listo, tiene que ser bueno, y es para el día más importante en la vida de los dos.

Nos reunimos varias veces para trabajar los requerimientos. Katherine me mostraba ejemplos, me explicaba qué le gustaba, qué se sentía bien para nosotros. Quería algo elegante y cálido — no una plantilla genérica de boda, sino algo con personalidad. Algo que nos representara. Nuestros detalles del evento, nuestros lugares, nuestro estilo. Y quería que fuera realmente útil para los invitados, no solo bonito.

La lista de requerimientos final: nueve secciones, mapas interactivos para los lugares del evento, un contador regresivo en vivo, y — la funcionalidad clave — una manera de que cada invitado recibiera una invitación personalizada y pudiera confirmar su asistencia. Tenía quizás dos fines de semana para hacerlo funcionar. Las invitaciones tenían que salir con meses de anticipación.

---

## El stack: Astro + Svelte, nada más

Mi punto de partida fue [AstroWind](https://github.com/onwidget/astrowind) — la plantilla de Astro más destacada de 2022 y 2023. Una base sólida: estructura limpia, configuraciones sensatas, suficiente flexibilidad para construir encima sin pelear con ella.

Desde ahí:
- **Astro 5.1.1** para el contenido estático — cada sección de la página es un componente `.astro` que compila a HTML puro
- **Svelte** para todas las partes interactivas — cualquier cosa que necesite moverse, responder a entrada del usuario o cargar datos es un componente Svelte
- **TailwindCSS** para estilos, **TypeScript** en todo

No quería ningún backend. Sin servidor Node.js, sin funciones Lambda, nada por qué pagar ni mantener después del día de la boda. Todo estático, desplegado en **GitHub Pages**, con CI/CD vía GitHub Actions que construía y desplegaba automáticamente en cada merge. Esa era la restricción. Y honestamente, era la correcta.

---

## Nueve secciones, una sola página

El sitio es una página de scroll continuo con nueve componentes, cada uno en un archivo `.astro` separado — excepto los interactivos, que son Svelte.

**WeddingHero** es lo primero que ven los invitados: "Únete a nuestra historia" con nuestra foto, la fecha de la boda (22 de marzo de 2025), y dos CTAs. La navegación superior enlaza a cada sección.

**WeddingEvents** muestra los detalles de la ceremonia y la recepción. Cada lugar tiene un botón que abre un modal de Google Maps — un componente Svelte que carga el mapa embebido al hacer clic. Por poco usé imágenes estáticas con enlaces fijos. Luego pensé en los invitados navegando desde diferentes puntos, abriéndolo en el celular. El modal era la decisión correcta.

**WeddingCountdown** — un contador regresivo en vivo con días, horas, minutos y segundos. Otro componente Svelte. Un invitado que visitara el sitio seis meses antes vería el conteo completo; la mañana de la boda, mucho menos. Hay algo satisfactorio en un número que realmente va bajando.

**WeddingTips** cubría la información práctica: parqueadero en ambos lugares, llegar 15-20 minutos antes (la ceremonia empieza puntual, sin excepciones), evento solo para adultos, fotógrafos profesionales presentes, y dos códigos QR que los invitados podrían escanear el día del evento para compartir momentos.

**WeddingDressCode** fue solicitud específica de Katherine. Vestimenta formal, dos colores a evitar: vinotinto (el color de las damas de honor) y blanco. No estaba seguro de qué tan explícito ser con ese último punto. Kathe estaba muy segura.

**WeddingGifts, WeddingSongs, WeddingPhotoGallery** completan las secciones de contenido. El de canciones — un modal Svelte donde los invitados pueden sugerir lo que quieren que suene en la recepción — fue una adición de último momento que terminó siendo una de las funcionalidades más usadas. No queríamos perdernos una canción favorita porque nadie pensó en preguntar.

Y luego está **WeddingRSVP**. Ese fue el que tomó más trabajo.

---

## El sistema de invitaciones: 117 códigos personalizados

Esta es la parte de la que estoy más orgulloso técnicamente.

Cada invitado recibió un enlace de invitación personalizado. No una URL genérica — su enlace específico con un código único: `https://sergioykathe.com?invite=JU1330QY`. Cuando alguien abría ese enlace, el sitio leía el código, buscaba su registro en un archivo JSON local, y mostraba una experiencia personalizada: su nombre en el saludo, su cuenta específica de invitaciones (personas para la fiesta, cupos de alojamiento), y un formulario de confirmación preconfigurado para su situación.

Los datos de los invitados vivían en `public/data/invites.json` — 117 registros, cada uno con un código, nombre, invitaciones para la fiesta, invitaciones de alojamiento, género y si era un grupo. Manejé esto como una hoja de cálculo CSV (mucho más fácil de editar que JSON a mano), y escribí un script de Node.js que lo convertía a JSON para el frontend:

```javascript
// scripts/csv-to-json.js
// Lee invites.csv → parsea con csv-parse → escribe invites.json
// Se ejecuta una vez antes de cada despliegue cuando cambia la lista
```

El flujo de la invitación en `src/lib/invite.ts`:

```typescript
export function getInviteId(): string | null {
  // 1. Lee el parámetro ?invite= de la URL
  // 2. Si lo encuentra, lo persiste en localStorage
  // 3. Limpia el parámetro de la URL (queda compartible y limpia)
  // 4. En visitas siguientes, lee desde localStorage
}
```

Esa limpieza de la URL era importante. Un invitado abre `sergioykathe.com?invite=JU1330QY`, el código se guarda en localStorage, y la URL queda como `sergioykathe.com` — limpia, compartible, sin exponer el código si alguien tomaba un pantallazo. En cada visita posterior, el código viene del localStorage y la personalización se mantiene.

`InviteHandler.svelte` maneja la lógica de coincidencia: carga el JSON, encuentra el código, pasa los datos del invitado a los componentes del RSVP. Si no se encuentra un código válido — alguien llegó al sitio sin su enlace personalizado — un modal explica la situación.

Empezamos a enviar las invitaciones meses antes de la boda. A medida que se acercaba la fecha límite de confirmación, usamos el mismo sitio para hacer seguimiento — compartiendo los enlaces personalizados, recordándole a la gente que su URL específica estaba esperándolos. El sistema funcionó exactamente como estaba diseñado.

---

## Google Sheets como base de datos

`ConfirmModal.svelte` — con 10KB, el componente más grande del proyecto — maneja el envío del RSVP. Cuando un invitado confirma, recoge cuántas personas de su grupo asisten al evento y cuántas necesitan alojamiento, luego hace un POST con esos datos al endpoint de un Google Form:

```javascript
await fetch(GOOGLE_FORM_URL, {
  method: 'POST',
  body: formData,
  mode: 'no-cors'  // Se dispara y olvida — no necesitamos respuesta
})
```

El modo `no-cors` significa que no recibimos respuesta — pero el envío llega. Google lo captura, escribe una fila en una hoja de cálculo, y esa hoja se convirtió en nuestro tablero de confirmaciones en tiempo real. Katherine podía abrirla en cualquier momento y ver quién había confirmado, cuántas personas venían, quiénes necesitaban alojamiento. Sin base de datos, sin panel de administración, sin costo de backend. Solo una hoja de cálculo con marcas de tiempo automáticas.

La confirmación también se guarda en localStorage — así un invitado que regrese ve su estado de confirmado en lugar del formulario de nuevo. Detalle pequeño. El tipo de cosa que los invitados nunca notan, pero que se sentiría roto si no estuviera.

Honestamente, no estaba seguro de si este enfoque aguantaría 117 invitaciones y todas las visitas que implicaban. Aguantó. Ni un solo problema con los envíos.

---

## Cómo fueron realmente los dos fines de semana

El repositorio se creó el 15 de diciembre de 2024. A principios de enero, el núcleo estaba listo.

Primer fin de semana (22-28 dic): AstroWind integrado, v1.0.0 desplegada. Luego, en un día particularmente intenso — el 27 de diciembre — la mayoría de las secciones de la boda tomaron forma: hero, eventos con Google Maps, contador, galería de fotos, y el widget de invitación. No sé por qué todo avanzó tan rápido ese día. A veces uno está en el flujo correcto y las cosas simplemente suceden.

Nochevieja (31 dic): el sistema de RSVP. Varios commits a lo largo de varias horas. Había planeado tenerlo listo antes, pero la lógica de personalización, validación y seguimiento de estado resultó ser más compleja de lo que había estimado. Pasé parte de la Nochevieja terminándolo — a Kathe probablemente no le gustó mucho eso.

El 4 de enero fue el día de las analíticas: Google Analytics, Mixpanel y PostHog, conectados a través de una fachada unificada en `src/lib/analytics.ts`. Ocho versiones en un solo día. Ese ritmo de commits pasa cuando algo sigue casi funcionando.

El 5 de enero fue el sistema de códigos de invitación — el parámetro `?invite=`, la persistencia en localStorage, la limpieza de la URL, la interfaz personalizada por invitado. El día de mayor velocidad y la pieza técnica más interesante.

Luego empezamos a enviar las invitaciones. Llegó febrero y todavía estábamos añadiendo invitados — Meri el 28, Mari el mismo día, Anita el 2 de marzo. Tres semanas antes de la boda. Para entonces el pipeline de despliegue estaba completamente automatizado: agregar una fila al CSV, correr el script de conversión, hacer push, merge, desplegar. Listo en minutos.

El 22 de marzo llegó.

---

## Lo que aprendí construyendo para una ocasión muy especial

Construir esto fue diferente a cualquier proyecto de cliente que haya hecho.

Los requerimientos estaban claros desde el principio — Katherine sabía lo que quería. Pero el significado detrás de cada sección era personal de una manera que las especificaciones de producto nunca son. La sección de vestimenta no es solo contenido por llenar. Es orientación para personas que nos importan. La lista de regalos no es una funcionalidad — es una comunicación sobre lo que realmente necesitamos. El modal de canciones es cómo escucharíamos a la gente que queremos.

También reaprendí algo que sigo teniendo que recordar: las restricciones simples producen soluciones limpias. Sin backend, GitHub Pages, todo estático — esas no eran limitaciones. Eran decisiones que hicieron el proyecto mantenible, gratuito de operar y listo a tiempo. Google Forms como base de datos del RSVP no era un workaround. Era la herramienta correcta.

El sitio tenía nueve secciones, 117 invitaciones personalizadas, mapas interactivos, un contador en vivo, un modal de sugerencias de canciones, un sistema de RSVP construido con Svelte, analíticas, CI/CD y códigos únicos para cada invitado. Todo corriendo como un bundle de archivos estáticos en GitHub Pages. Gratis.

Funcionó de lujo.

---

## Recursos

- **Sitio web:** [sergioykathe.com](https://www.sergioykathe.com/)
- **Repositorio en GitHub:** [xergioalex/sergioykathe.com](https://github.com/xergioalex/sergioykathe.com)
