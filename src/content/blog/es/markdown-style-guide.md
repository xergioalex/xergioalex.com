---
title: 'Guia de Estilo Markdown'
description: 'Aqui hay una muestra de sintaxis basica de Markdown que se puede usar al escribir contenido en Astro.'
pubDate: 'Jun 19 2024'
tags: ["personal"]
heroImage: '/blog-placeholder-1.jpg'
---

Aqui hay una muestra de sintaxis basica de Markdown que se puede usar al escribir contenido en Markdown en Astro.

## Encabezados

Los siguientes elementos HTML `<h1>`—`<h6>` representan seis niveles de encabezados de seccion. `<h1>` es el nivel de seccion mas alto mientras que `<h6>` es el mas bajo.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Parrafo

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Imagenes

### Sintaxis

```markdown
![Texto alternativo](./ruta/completa/o/relativa/de/imagen)
```

### Resultado

![blog placeholder](/blog-placeholder-about.jpg)

## Citas

El elemento de cita representa contenido citado de otra fuente, opcionalmente con una referencia que debe estar dentro de un elemento `footer` o `cite`, y opcionalmente con cambios en linea como anotaciones y abreviaturas.

### Cita sin atribucion

#### Sintaxis

```markdown
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Nota** que puedes usar _sintaxis Markdown_ dentro de una cita.
```

#### Resultado

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Nota** que puedes usar _sintaxis Markdown_ dentro de una cita.

### Cita con atribucion

#### Sintaxis

```markdown
> No comuniques compartiendo memoria, comparte memoria comunicando.<br>
> — <cite>Rob Pike[^1]</cite>
```

#### Resultado

> No comuniques compartiendo memoria, comparte memoria comunicando.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: La cita anterior es un extracto de la [charla](https://www.youtube.com/watch?v=PAAkCSZUG1c) de Rob Pike durante Gopherfest, 18 de noviembre de 2015.

## Tablas

### Sintaxis

```markdown
| Cursiva   | Negrita  | Codigo |
| --------- | -------- | ------ |
| _cursiva_ | **negrita** | `codigo` |
```

### Resultado

| Cursiva   | Negrita  | Codigo |
| --------- | -------- | ------ |
| _cursiva_ | **negrita** | `codigo` |

## Bloques de Codigo

### Sintaxis

Podemos usar 3 backticks ``` en una nueva linea y escribir el fragmento y cerrar con 3 backticks en una nueva linea. Para resaltar la sintaxis especifica del lenguaje, escribe el nombre del lenguaje despues de los primeros 3 backticks, por ejemplo: html, javascript, css, markdown, typescript, txt, bash

````markdown
```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Ejemplo de Documento HTML5</title>
  </head>
  <body>
    <p>Prueba</p>
  </body>
</html>
```
````

### Resultado

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Ejemplo de Documento HTML5</title>
  </head>
  <body>
    <p>Prueba</p>
  </body>
</html>
```

## Tipos de Listas

### Lista Ordenada

#### Sintaxis

```markdown
1. Primer elemento
2. Segundo elemento
3. Tercer elemento
```

#### Resultado

1. Primer elemento
2. Segundo elemento
3. Tercer elemento

### Lista No Ordenada

#### Sintaxis

```markdown
- Elemento de lista
- Otro elemento
- Y otro elemento
```

#### Resultado

- Elemento de lista
- Otro elemento
- Y otro elemento

### Lista Anidada

#### Sintaxis

```markdown
- Fruta
  - Manzana
  - Naranja
  - Banana
- Lacteos
  - Leche
  - Queso
```

#### Resultado

- Fruta
  - Manzana
  - Naranja
  - Banana
- Lacteos
  - Leche
  - Queso

## Otros Elementos — abbr, sub, sup, kbd, mark

### Sintaxis

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> es un formato de imagen de mapa de bits.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Presiona <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Supr</kbd> para finalizar la sesion.

La mayoria de las <mark>salamandras</mark> son nocturnas y cazan insectos, gusanos y otras criaturas pequenas.
```

### Resultado

<abbr title="Graphics Interchange Format">GIF</abbr> es un formato de imagen de mapa de bits.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Presiona <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Supr</kbd> para finalizar la sesion.

La mayoria de las <mark>salamandras</mark> son nocturnas y cazan insectos, gusanos y otras criaturas pequenas.
