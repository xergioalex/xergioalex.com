---
title: 'NoSQL y MongoDB'
description: 'Introducción a bases de datos NoSQL y MongoDB — diferencias con SQL, cuándo usar cada uno y ejemplos prácticos.'
pubDate: '2016-11-25'
heroImage: '/images/blog/posts/nosql-and-mongodb/hero.png'
heroLayout: 'banner'
tags: ['talks', 'tech']
---

En esta charla di una introducción a las bases de datos NoSQL y MongoDB. El objetivo era aclarar qué significa NoSQL, cómo se diferencia de las bases de datos SQL tradicionales, cuándo tiene sentido cada enfoque, y mostrar ejemplos prácticos que puedes probar tú mismo.

---

## ¿Qué es NoSQL?

**NoSQL** significa "Not Only SQL" — es un término amplio para bases de datos que no siguen el modelo relacional rígido. En lugar de tablas, filas y columnas, las bases NoSQL usan estructuras distintas: documentos, pares clave-valor, grafos o almacenes de columnas anchas.

El auge de NoSQL surgió de la necesidad de manejar:

- **Escala** — Escalado horizontal, sharding y sistemas distribuidos
- **Flexibilidad** — Esquemas que evolucionan rápido sin migraciones
- **Rendimiento** — Optimizado para patrones de acceso específicos (lecturas, escrituras, agregaciones)
- **Variedad** — Datos no estructurados o semi-estructurados (logs, eventos, JSON de APIs)

---

## SQL vs NoSQL: Diferencias Clave

| Aspecto | SQL (Relacional) | NoSQL |
|---------|------------------|-------|
| **Modelo** | Tablas, filas, columnas | Documentos, clave-valor, grafos, etc. |
| **Schema** | Fijo, definido de antemano | Flexible, sin schema o schema opcional |
| **Escalado** | Vertical (máquina más grande) | Horizontal (más máquinas) |
| **Transacciones** | ACID, consistencia fuerte | Varía (consistencia eventual común) |
| **Lenguaje de consulta** | SQL (estandarizado) | Específico de cada API (MongoDB usa consultas tipo JSON) |
| **Joins** | Nativo (JOIN) | A menudo a nivel de aplicación o documentos embebidos |

SQL brilla cuando tienes relaciones claras, necesitas consistencia fuerte, y tus datos encajan bien en tablas. NoSQL brilla cuando necesitas flexibilidad, escala horizontal, o cuando tus datos tienen forma de documento (anidados, estructura variable).

---

## MongoDB: NoSQL Orientado a Documentos

[MongoDB](https://www.mongodb.com/) es una **base de datos de documentos**. Los datos se almacenan como documentos **BSON** (Binary JSON) dentro de **colecciones**. En lugar de normalizar datos en tablas, almacenas datos relacionados juntos en un solo documento.

### Ejemplo: Un Usuario con Posts

**Enfoque SQL** — Múltiples tablas, joins:

```
users (id, name, email)
posts (id, user_id, title, content, created_at)
```

**Enfoque MongoDB** — Documentos embebidos o referenciados:

```javascript
{
  "_id": ObjectId("..."),
  "name": "Sergio",
  "email": "sergio@example.com",
  "posts": [
    { "title": "First post", "content": "...", "createdAt": ISODate("...") },
    { "title": "Second post", "content": "...", "createdAt": ISODate("...") }
  ]
}
```

Puedes embeber cuando la relación es uno-a-pocos y siempre lees juntos. Referencias (guardar `ObjectId`) cuando tienes uno-a-muchos o muchos-a-muchos y necesitas consultar de forma independiente.

---

## Ejemplos Prácticos de la Charla

### 1. Insertar Documentos

```javascript
db.users.insertOne({
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
});
```

### 2. Buscar Documentos

```javascript
// Buscar todos
db.users.find();

// Buscar con filtro
db.users.find({ name: "Alice" });

// Buscar uno
db.users.findOne({ email: "alice@example.com" });
```

### 3. Actualizar Documentos

```javascript
db.users.updateOne(
  { name: "Alice" },
  { $set: { lastLogin: new Date() } }
);
```

### 4. Pipeline de Agregación

El framework de agregación de MongoDB te permite transformar y analizar datos en etapas:

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);
```

---

## Cuándo Usar MongoDB (y Cuándo No)

**Buen ajuste:**

- Gestión de contenido, blogs, catálogos
- Analytics en tiempo real, logs de eventos
- Prototipado e iteración rápida
- Datos con estructura variable o anidada (JSON de APIs)

**Menos ideal:**

- Reportes relacionales pesados (muchos JOINs)
- Transacciones multi-documento fuertes (MongoDB las tiene, pero son más recientes)
- Datos que encajan perfectamente en tablas normalizadas con integridad estricta

---

## Slides y Recursos

- [Ver slides](https://slides.com/xergioalex/nosql-y-mongodb)
- [Código fuente (GitHub)](https://github.com/RockaLabs/mongoNodeExamples) — Ejemplos en Node.js para conectar con MongoDB
