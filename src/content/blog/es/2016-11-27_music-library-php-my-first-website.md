---
title: "Music Library PHP: Mi primera página web"
description: "La historia detrás de mi primer proyecto web — el trabajo final del curso de bases de datos que se convirtió en mi introducción a PHP, SQLite y el desarrollo web."
pubDate: "2016-11-27"
heroImage: "/images/blog/posts/music-library-php/home.gif"
heroLayout: "banner"
tags: ["portfolio", "tech", "personal"]
---

Llevo casi 10 años construyendo para la web, pero no empecé así. Hace poco estaba desempolvando archivos de la universidad y encontré la primera página web que desarrollé. Era el proyecto final del curso de bases de datos — y fue ahí donde tuve mi primer encuentro real con el desarrollo web.

Esta es la historia.

---

## La tarea

El enunciado era claro: construir un sistema que aplicara todo lo aprendido en el curso. Definir un modelo de datos relacional, implementarlo y soportar consultas de todo tipo. El lenguaje y la tecnología eran libres.

Después de investigar y sopesar opciones, elegí **PHP, SQLite, HTML y CSS**. Sin JavaScript. Era la primera vez que usaba estas tecnologías juntas y había mucho que digerir — pero al final entregué un producto funcional: una **biblioteca musical** donde podías crear una cuenta, guardar tus canciones favoritas y reproducirlas.

¿Suena simple? Lo es — pero cuando recién empiezas, el alcance de lo que en realidad estás aprendiendo es enorme.

---

## Lo que realmente implicaba

Si estás iniciando en este mundo, esto es todo lo que implicaba desarrollar esa aplicación:

1. **Entender el desarrollo web** — Cómo instalar un servidor (usé [XAMPP](https://www.apachefriends.org/es/index.html) en esa época) y tener claro que unas tecnologías corren en el servidor (PHP, SQLite) y otras en el navegador (HTML, CSS, JavaScript).

2. **Diseñar el modelo de datos** — Definir tablas, relaciones y restricciones en SQLite.

3. **PHP + SQLite** — Aprender a conectar con la base de datos, ejecutar consultas y manejar resultados desde PHP.

4. **CRUD para cada entidad** — Crear, leer, actualizar y eliminar para cada modelo del sistema.

5. **Comunicación cliente–servidor** — Cómo el navegador habla con el servidor y cómo fluyen los datos.

6. **Maquetado y estilos** — Construir interfaces con HTML y CSS.

7. **Manejo de archivos en PHP** — Subir y almacenar los archivos de las canciones de forma organizada en el servidor.

8. **Gestión de sesiones** — Registro de usuarios, login y ciclo de vida de la sesión (crear, destruir).

Esa lista resume la mayor parte del trabajo. Y algo importante: **todo se hizo desde cero**. Sin frameworks, sin librerías para sesiones, manejo de archivos o maquetado. Siempre recomiendo empezar así — como ejercicio académico y de autoaprendizaje, es crucial entender los conceptos antes de apoyarse en abstracciones. Necesitas saber qué hace tu herramienta por debajo cuando eventualmente elijas un stack.

---

## El modelo de datos

Este es el esquema de base de datos que diseñé para la biblioteca musical:

![Modelo de datos de la biblioteca musical](/images/blog/posts/music-library-php/db-model.jpg)

---

## La aplicación en acción

He mantenido el proyecto en GitHub todos estos años. Aquí hay algunos GIFs que muestran cómo se veía y funcionaba la app:

### Página de inicio

![Página de inicio de Music Library PHP](/images/blog/posts/music-library-php/home.gif)

### Registro e inicio de sesión

![Flujo de registro e inicio de sesión](/images/blog/posts/music-library-php/login-and-list-music.gif)

### Navegación y gestión de canciones

![Agregar canciones, artistas, géneros y álbumes](/images/blog/posts/music-library-php/add-song.gif)

### Búsqueda

![Búsqueda de canciones](/images/blog/posts/music-library-php/search.gif)

---

## Unas palabras honestas

Este fue mi primer proyecto web. No encontrarás código pulido, documentación exhaustiva ni mejores prácticas. Lo que encontrarás es lo mejor que un estudiante de ciencias de la computación trasnochado y agobiado por la carga académica pudo lograr en poco tiempo.

Espero que hayas disfrutado esta breve historia — y que algún día este código le pueda servir a alguien.

---

*"La inteligencia consiste no sólo en el conocimiento, sino también en la destreza de aplicar los conocimientos en la práctica."*  
*— Aristóteles*

---

## Pruébalo tú mismo

Si quieres ejecutar la app localmente, instala PHP (funciona con PHP 7.0 y las extensiones `php7.0-fpm` y `php7.0-sqlite3`) y sigue la configuración del repositorio.

**Repositorio:** [xergioalex/MusicLibraryPHP](https://github.com/xergioalex/MusicLibraryPHP)
