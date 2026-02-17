---
title: "Introduction to MyPy"
description: "Adding type checking to Python with MyPy — less cognitive load, catch bugs early, and reduce trivial unit tests."
pubDate: "2021-03-03"
heroImage: "/images/blog/shared/blog-placeholder-2.jpg"
heroLayout: "minimal"
tags: ["talks", "tech"]
---

In March 2021 I gave a talk on MyPy — Python's static type checker. The goal was to show why adding types to Python code isn't just pedantry: it reduces cognitive load, catches mistakes early, and can replace a lot of trivial unit tests.

**Why MyPy?** First, less cognitive load. When parameters and return values are clearly stated and verified, you don't have to guess. No surprises. Second, you realize mistakes early — wrong return types, forgotten `None` checks, accidental redeclarations — the type checker tells you before runtime. Third, data validation: we use [attrs](https://pypi.org/project/attrs/) for data classes with typed attributes and runtime checks (Pydantic is another great option). Fourth, you avoid trivial unit tests — type checking eliminates the need to write and maintain tests that only verify types.

---

## What Types Can You Use?

**Basic types:** `int`, `str`, `dict`, `list`, `set`, `float`, etc.

**Advanced typing (Python 3.5+):** Generics (`TypeVar`, `Generic`), `Callable`, composers (`Union`, `Optional`), collections (`Tuple`, `Dict`, `MutableMapping`, `List`, `NamedTuple`, etc.).

---

## Integrating MyPy into Your Flow

The talk included a demo of integrating MyPy into a development workflow — running it in CI, in pre-commit hooks, or as part of your editor setup.

---

## Slides & Reference

- [View slides](https://slides.com/xergioalex/introduction-to-mypy)
- [attrs](https://pypi.org/project/attrs/)
- [Pydantic](https://pydantic-docs.helpmanual.io/)
