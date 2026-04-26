---
type: internal
title: "Construyendo productos con agentes de IA"
description: "Cómo los agentes de IA están transformando el desarrollo de productos — desde patrones de orquestación hasta flujos reales en DailyBot."
pubDate: 2026-03-20
tags: [tech, talks, ai]
draft: false
theme: dark
transition: slide
syntaxHighlight: true
math: false
eventName: "Pereira Tech Talks 2026"
eventDate: 2026-03-20
eventUrl: "https://pereiratechtalks.org/"
---

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" -->

# Construyendo productos con agentes de IA

### De desarrollador solitario a orquestador

<small>Sergio Alexander Florez · Pereira Tech Talks 2026</small>

---

## El cambio

> "Toda empresa necesita una estrategia de agentes de IA — igual que alguna vez necesitaron una estrategia de internet y una estrategia de nube."

— Jensen Huang, GTC 2026

---

## Qué cambió en 2025–2026

- **Claude**, **GPT**, **Gemini** pasaron de chatbots a **agentes de código** <!-- .element: class="fragment fade-up" -->
- Los agentes pueden leer codebases, ejecutar tests, abrir PRs <!-- .element: class="fragment fade-up" -->
- El rol del desarrollador cambió de **escribir código** a **dirigir agentes** <!-- .element: class="fragment fade-up" -->

---

## La mentalidad de orquestador

<div class="grid grid-cols-2 gap-8 text-left">
  <div>
    <h3>Antes</h3>
    <ul>
      <li>Tú escribes cada línea</li>
      <li>Tú depuras leyendo</li>
      <li>Velocidad = velocidad de tipeo</li>
    </ul>
  </div>
  <div>
    <h3>Ahora</h3>
    <ul>
      <li>Tú defines la arquitectura</li>
      <li>Los agentes implementan los detalles</li>
      <li>Velocidad = claridad de instrucciones</li>
    </ul>
  </div>
</div>

---

## Ejemplo real: migración de DailyBot.com

Migramos **dailybot.com** de un CMS legacy a Astro:

- **5 ingenieros** + agentes de IA <!-- .element: class="fragment" -->
- **700 páginas** en 3 idiomas <!-- .element: class="fragment" -->
- **6 semanas** desde el inicio hasta producción <!-- .element: class="fragment" -->
- **12 content collections** con esquemas Zod tipados <!-- .element: class="fragment" -->

---

## El flujo de trabajo con agentes

```text [1|2|3|4|5]
1. El humano define la arquitectura (esquemas, patrones, restricciones)
2. El agente genera componentes desde los patrones
3. El humano revisa, ajusta, aprueba
4. El agente maneja el trabajo repetitivo (traducciones, tests, migraciones)
5. CI valida todo (tipos, lint, build, Lighthouse)
```

---

## En qué son buenos los agentes

- Generar desde patrones existentes <!-- .element: class="fragment fade-up" -->
- Traducir contenido (EN ↔ ES) <!-- .element: class="fragment fade-up" -->
- Escribir tests para código existente <!-- .element: class="fragment fade-up" -->
- Migrar datos entre formatos <!-- .element: class="fragment fade-up" -->
- Refactorizar repetitivamente en muchos archivos <!-- .element: class="fragment fade-up" -->

---

## En qué los agentes todavía necesitan humanos

- **Decisiones de arquitectura** — qué abstracciones, qué patrones <!-- .element: class="fragment fade-up" -->
- **Juicio de producto** — qué construir, qué omitir <!-- .element: class="fragment fade-up" -->
- **Barra de calidad** — definir "suficientemente bueno" vs "envíalo" <!-- .element: class="fragment fade-up" -->
- **Contexto** — restricciones de negocio, necesidades de usuarios, dinámica del equipo <!-- .element: class="fragment fade-up" -->

---

## Lección clave

Los mejores ingenieros en 2026 no son los que codean más rápido.

Son los que **piensan con más claridad** — porque los agentes amplifican la claridad y castigan la ambigüedad.

---

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" -->

## Gracias

**@XergioAleX** · xergioalex.com

<small>Diapositivas construidas con Reveal.js dentro de Astro</small>

Note: Cierre — invitar preguntas. Mencionar que estas mismas diapositivas están construidas con el enfoque slides-as-code.
