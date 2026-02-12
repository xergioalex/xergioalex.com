---
title: 'Referencia Completa de Markdown para Escritores Tecnicos'
description: 'Una muestra exhaustiva de todas las caracteristicas de formato Markdown disponibles para posts de blog'
pubDate: '2025-01-06'
heroImage: '/images/blog/shared/blog-placeholder-5.jpg'
heroLayout: 'banner'
tags: ['tech']
draft: false
---

Este post demuestra cada caracteristica de formato Markdown soportada en nuestro sistema de blog. Usalo como referencia cuando escribas tus propios posts.

## Formato de Texto

El texto de parrafo regular fluye naturalmente a traves de las lineas. Markdown maneja los saltos de linea y el espaciado de parrafos automaticamente.

**Texto en negrita** se crea con doble asterisco. *Texto en cursiva* usa un solo asterisco. ***Negrita y cursiva*** combina ambos. ~~Tachado~~ usa doble virgulilla.

Tambien puedes usar `codigo en linea` con comillas invertidas para terminos tecnicos, nombres de archivo como `package.json`, o comandos como `npm install`.

## Encabezados

Los encabezados se crean con simbolos de numeral. Este documento usa H2 para secciones principales y H3-H4 para subsecciones:

### Encabezado de Tercer Nivel

#### Encabezado de Cuarto Nivel

##### Encabezado de Quinto Nivel

###### Encabezado de Sexto Nivel

## Listas

### Listas Desordenadas

- Primer elemento
- Segundo elemento
  - Elemento anidado A
  - Elemento anidado B
    - Elemento profundamente anidado
- Tercer elemento

### Listas Ordenadas

1. Primer paso
2. Segundo paso
   1. Sub-paso A
   2. Sub-paso B
3. Tercer paso

### Listas de Tareas

- [x] Escribir el post del blog
- [x] Agregar ejemplos de codigo
- [x] Incluir imagenes
- [ ] Revisar y publicar
- [ ] Compartir en redes sociales

## Citas

> "Cualquier tonto puede escribir codigo que una computadora puede entender. Los buenos programadores escriben codigo que los humanos pueden entender." — Martin Fowler

Las citas anidadas tambien son soportadas:

> Esta es la cita exterior.
>
> > Esta es una cita anidada dentro de la cita exterior. Puede contener su propio formato como **negrita** y `codigo`.
>
> De vuelta al nivel exterior.

## Enlaces

- [Enlace externo a la documentacion de Astro](https://docs.astro.build)
- [Enlace con titulo](https://docs.astro.build "Documentacion de Astro")
- URL auto-enlazada: https://example.com

## Imagenes

Las imagenes se pueden embeber con texto alternativo:

![Una imagen de ejemplo demostrando soporte de imagenes en linea](/images/blog/shared/blog-placeholder-3.jpg)

## Tablas

### Tabla Basica

| Caracteristica | Estado | Prioridad |
|----------------|--------|-----------|
| Modo oscuro | Completo | Alta |
| Busqueda | Completo | Alta |
| Feed RSS | Completo | Media |
| Comentarios | Planeado | Baja |

### Tabla con Alineacion

| Alineado Izquierda | Alineado Centro | Alineado Derecha |
|:--------------------|:---------------:|-----------------:|
| Texto | Texto | Texto |
| Texto mas largo | Texto mas largo | Texto mas largo |
| 100 | 200 | 300 |

## Bloques de Codigo

### Codigo en Linea

Usa `const x = 42` para codigo en linea dentro de parrafos.

### Bloques de Codigo Delimitados

```javascript
// Ejemplo en JavaScript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

```python
# Ejemplo en Python
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55
```

### Bloque de Codigo sin Lenguaje

```
Este es un bloque de codigo plano
sin resaltado de sintaxis.
Util para salida generica o logs.
```

## Lineas Horizontales

Contenido arriba de la linea.

---

Contenido debajo de la linea.

## Caracteres Especiales y Escapado

Puedes escapar caracteres Markdown con una barra invertida: \*no cursiva\*, \`no codigo\`, \# no es un encabezado.

Las entidades HTML tambien funcionan: &copy; 2025, 5 &gt; 3, A &amp; B.

## Combinaciones de Enfasis

- **Texto en negrita** para enfasis fuerte
- *Texto en cursiva* para enfasis suave
- ***Negrita cursiva*** para enfasis maximo
- ~~Tachado~~ para contenido obsoleto
- **Negrita con `codigo` dentro**
- *Cursiva con `codigo` dentro*

## Contenido Largo para Probar el Scroll

Esta seccion contiene suficiente contenido para probar como se renderizan y se desplazan articulos mas largos. La escritura tecnica a menudo involucra explicaciones detalladas que abarcan multiples parrafos.

Al construir un sitio estatico, el pipeline de contenido tipicamente involucra varias etapas: escribir en Markdown, procesar a traves de una herramienta de build (como Astro), aplicar layouts y estilos, y generar la salida HTML final. Cada etapa agrega valor — el Markdown es facil de escribir y controlar versiones, la herramienta de build maneja la optimizacion e integracion de componentes, y la salida es HTML rapido y accesible.

La belleza de este enfoque es que los escritores se enfocan en el contenido mientras el sistema de build maneja la presentacion. Un sistema de blog bien disenado hace esta separacion limpia y mantenible, permitiendo que el contenido se actualice independientemente de los cambios de diseno.

## Resumen

Este post cubrio todas las principales caracteristicas de formato Markdown:

1. Formato de texto (negrita, cursiva, tachado, codigo)
2. Encabezados (H1 a H6)
3. Listas (ordenadas, desordenadas, tareas)
4. Citas (incluyendo anidadas)
5. Enlaces e imagenes
6. Tablas (con alineacion)
7. Bloques de codigo (en linea y delimitados)
8. Lineas horizontales
9. Caracteres especiales y escapado

Usa estas caracteristicas para crear contenido tecnico rico y bien estructurado que sea facil de leer y mantener.
