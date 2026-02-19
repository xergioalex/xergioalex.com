---
title: "Introducción a MyPy"
description: "Lo que compartí con mi equipo en DailyBot — cómo implementar MyPy y tipar nuestros proyectos Python internos."
pubDate: "2021-03-03"
heroImage: "/images/blog/posts/introduction-to-mypy/hero.png"
heroLayout: "side-by-side"
tags: ["talks", "tech"]
---

Di una charla a mi equipo en **DailyBot** para explicar cómo empezar a implementar MyPy y tipar todo a lo largo de nuestros proyectos internos de Python. El objetivo: mostrar por qué agregar tipos no es solo pedantería — reduce la carga cognitiva, detecta errores temprano y puede reemplazar muchos tests unitarios triviales.

**¿Por qué MyPy?** Primero, menos carga cognitiva. Cuando los parámetros y valores de retorno están claramente declarados y verificados, no tienes que adivinar. Sin sorpresas. Segundo, detectas errores temprano — tipos de retorno incorrectos, checks de `None` olvidados, redeclaraciones accidentales — el type checker te lo dice antes de runtime. Tercero, validación de datos: usamos [attrs](https://pypi.org/project/attrs/) para data classes con atributos tipados y checks en runtime (Pydantic es otra gran opción). Cuarto, evitas tests unitarios triviales — el type checking elimina la necesidad de escribir y mantener tests que solo verifican tipos.

---

## ¿Qué tipos puedes usar?

**Tipos básicos:** `int`, `str`, `dict`, `list`, `set`, `float`, etc.

**Tipado avanzado (Python 3.5+):** Generics (`TypeVar`, `Generic`), `Callable`, compositores (`Union`, `Optional`), colecciones (`Tuple`, `Dict`, `MutableMapping`, `List`, `NamedTuple`, etc.).

---

## Integrando MyPy en tu flujo

La charla incluyó una demo de integrar MyPy en un flujo de desarrollo — ejecutándolo en CI, en pre-commit hooks, o como parte de la configuración de tu editor.

---

## Slides y referencias

- [Ver slides](https://slides.com/xergioalex/introduction-to-mypy)
- [attrs](https://pypi.org/project/attrs/)
- [Pydantic](https://pydantic-docs.helpmanual.io/)

A seguir construyendo.
