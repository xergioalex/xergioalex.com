---
title: "Introduction to GoLang"
description: "What I shared at Pereira Tech Talks on Go — syntax, concurrency, standard library, goroutines, and use cases for modern applications."
pubDate: "2018-07-05"
heroImage: "/images/blog/posts/introduction-to-golang/hero.png"
heroLayout: "banner"
tags: ["talks", "tech"]
---

Go — an introduction to the language explaining what it is, why use it, and use cases for building modern applications.

---

## What Is Go?

Go is **open source**, **compiled**, and **cross-platform**. With `go build` you generate binaries for different architectures without changing code. The syntax is C-like but with the ergonomics of interpreted languages — less ceremony, more productivity.

```go
package main

import "fmt"

func main() {
    fmt.Printf("Hello World")
}
```

Go was born in 2007 from Robert Griesemer (JVM, V8), Rob Pike (UNIX, UTF-8), and Ken Thompson (B, C, UNIX). Google released it as open source in 2009; version 1.0 arrived in 2012. The team wasn't trying to replace Java or C++ — they wanted a language that gave them the advantages they needed for modern systems.

---

## Why Go?

- **Easy to learn** — The language is small and consistent.
- **Modern** — Designed for systems that need high performance and high concurrency.
- **Standard library** — `net/http`, `database/sql`, `encoding`, `testing`, encryption — you get a lot without external dependencies.
- **Who uses it** — Canonical, Cloudflare, Uber, Disqus, Digital Ocean, Facebook, Netflix.

And yes, the Gopher mascot is cute. That counts.

---

## What I Covered in the Talk

I ran live demos from the basics to practical examples:

### Fundamentals

- Hello World, standard input, variable declarations
- Types: `bool`, `string`, `int`, `float`, `byte`, `rune`, `complex`
- Functions with multiple return values
- Loops (`for` is the only one, but very flexible), conditionals, `switch` with `fallthrough`
- Arrays, maps, structs, methods, and interfaces

### Concurrency and More

- **Defer** — Run code when exiting a function's context
- **Panic and errors** — Idiomatic error handling
- **Pointers** — References and dereferencing
- **Goroutines** — Lightweight concurrency with `go`
- **Channels** — Communication between goroutines

### Practical Examples

- HTTP server with `net/http`
- HTTP client consuming an API (JSON)
- File reading with `io/ioutil`

### Frameworks and Libraries

- **Frameworks:** Revel, Beego, Martini, Buffalo
- **Libraries:** Testify, Logrus, pkg/errors, cobra, godog
- **Bonus:** Ebiten (2D games), WebAssembly

---

## Resources

- [View slides](https://slides.com/xergioalex/introduction-to-go-lang)
- [Go Basics (GitHub)](https://github.com/xergioalex/goBasics) — Code from the talk
- [Go official](https://golang.org/)
- [Rob Pike — Concurrency Is Not Parallelism](https://blog.golang.org/concurrency-is-not-parallelism)
- [Platzi — Go Básico](https://platzi.com/cursos/go-basico/)

Let's keep building.
