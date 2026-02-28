---
title: 'Introducción a GoLang'
description: 'Lo que compartí en Pereira Tech Talks sobre Go — sintaxis, concurrencia, librería estándar, goroutines y casos de uso para aplicaciones modernas.'
pubDate: '2018-07-05'
heroImage: '/images/blog/posts/introduction-to-golang/hero.png'
heroLayout: 'banner'
tags: ['talks', 'tech']
---

Go — una introducción al lenguaje explicando qué es, por qué usarlo y casos de uso para desarrollar aplicaciones modernas.

---

## ¿Qué es Go?

Go es **open source**, **compilado** y **multiplataforma**. Con `go build` generas binarios para distintas arquitecturas sin cambiar código. La sintaxis es tipo C pero con la ergonomía de lenguajes interpretados — menos ceremonias, más productividad.

```go
package main

import "fmt"

func main() {
    fmt.Printf("Hello World")
}
```

Go nació en 2007 de la mano de Robert Griesemer (JVM, V8), Rob Pike (UNIX, UTF-8) y Ken Thompson (B, C, UNIX). Google lo lanzó como open source en 2009; la versión 1.0 llegó en 2012. El equipo no buscaba reemplazar Java o C++, sino crear un lenguaje que les diera las ventajas que necesitaban para sistemas modernos.

---

## ¿Por Qué Go?

- **Fácil de aprender** — El lenguaje es pequeño y consistente.
- **Moderno** — Pensado para sistemas que requieren alto rendimiento y alta concurrencia.
- **Librería estándar** — `net/http`, `database/sql`, `encoding`, `testing`, encriptación — obtienes mucho sin dependencias externas.
- **Quién lo usa** — Canonical, Cloudflare, Uber, Disqus, Digital Ocean, Facebook, Netflix.

Y sí, la mascota Gopher es linda. Eso cuenta.

---

## Lo Que Cubrí en la Charla

Hice demos en vivo desde lo más básico hasta ejemplos prácticos:

### Fundamentos

- Hello World, entrada estándar, declaraciones de variables
- Tipos: `bool`, `string`, `int`, `float`, `byte`, `rune`, `complex`
- Funciones con múltiples retornos
- Loops (`for` es el único, pero muy flexible), condicionales, `switch` con `fallthrough`
- Arrays, maps, structs, métodos e interfaces

### Concurrencia y Más

- **Defer** — Ejecutar código al salir del contexto de una función
- **Panic y errors** — Manejo de errores idiomático
- **Pointers** — Referencias y desreferenciación
- **Goroutines** — Concurrencia ligera con `go`
- **Channels** — Comunicación entre goroutines

### Ejemplos Prácticos

- Servidor HTTP con `net/http`
- Cliente HTTP consumiendo una API (JSON)
- Lectura de archivos con `io/ioutil`

### Frameworks y Librerías

- **Frameworks:** Revel, Beego, Martini, Buffalo
- **Librerías:** Testify, Logrus, pkg/errors, cobra, godog
- **Bonus:** Ebiten (juegos 2D), WebAssembly

---

## Recursos

- [Ver slides](https://slides.com/xergioalex/introduction-to-go-lang)
- [Go Basics (GitHub)](https://github.com/xergioalex/goBasics) — Código de la charla
- [Go oficial](https://golang.org/)
- [Rob Pike — Concurrency Is Not Parallelism](https://blog.golang.org/concurrency-is-not-parallelism)
- [Platzi — Go Básico](https://platzi.com/cursos/go-basico/)

A seguir construyendo.
