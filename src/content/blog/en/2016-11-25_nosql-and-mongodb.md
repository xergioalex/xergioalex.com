---
title: "NoSQL and MongoDB"
description: "Introduction to NoSQL databases and MongoDB — differences with SQL, when to use each, and practical examples."
pubDate: "2016-11-25"
heroImage: "/images/blog/posts/nosql-and-mongodb/hero.png"
heroLayout: "banner"
tags: ["talks", "tech"]
---

In this talk I gave an introduction to NoSQL databases and MongoDB. The goal was to clarify what NoSQL means, how it differs from traditional SQL databases, when each approach makes sense, and to show practical examples you can try yourself.

---

## What is NoSQL?

**NoSQL** stands for "Not Only SQL" — it's a broad term for databases that don't follow the rigid relational model. Instead of tables, rows, and columns, NoSQL databases use different structures: documents, key-value pairs, graphs, or wide-column stores.

The rise of NoSQL came from a need to handle:

- **Scale** — Horizontal scaling, sharding, and distributed systems
- **Flexibility** — Schemas that evolve quickly without migrations
- **Performance** — Optimized for specific access patterns (reads, writes, aggregations)
- **Variety** — Unstructured or semi-structured data (logs, events, JSON from APIs)

---

## SQL vs NoSQL: Key Differences

| Aspect | SQL (Relational) | NoSQL |
|--------|------------------|-------|
| **Model** | Tables, rows, columns | Documents, key-value, graph, etc. |
| **Schema** | Fixed, defined upfront | Flexible, schema-less or schema-optional |
| **Scaling** | Vertical (bigger machine) | Horizontal (more machines) |
| **Transactions** | ACID, strong consistency | Varies (eventual consistency common) |
| **Query language** | SQL (standardized) | API-specific (MongoDB uses JSON-like queries) |
| **Joins** | Native (JOIN) | Often application-level or embedded documents |

SQL excels when you have clear relationships, need strong consistency, and your data fits neatly into tables. NoSQL shines when you need flexibility, horizontal scale, or when your data is document-shaped (nested, variable structure).

---

## MongoDB: Document-Oriented NoSQL

[MongoDB](https://www.mongodb.com/) is a **document database**. Data is stored as **BSON** (Binary JSON) documents inside **collections**. Instead of normalizing data across tables, you store related data together in a single document.

### Example: A User with Posts

**SQL approach** — Multiple tables, joins:

```
users (id, name, email)
posts (id, user_id, title, content, created_at)
```

**MongoDB approach** — Embedded or referenced documents:

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

You can embed when the relationship is one-to-few and you always read together. You reference (store `ObjectId`) when you have one-to-many or many-to-many and need to query independently.

---

## Practical Examples from the Talk

### 1. Inserting Documents

```javascript
db.users.insertOne({
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
});
```

### 2. Finding Documents

```javascript
// Find all
db.users.find();

// Find with filter
db.users.find({ name: "Alice" });

// Find one
db.users.findOne({ email: "alice@example.com" });
```

### 3. Updating Documents

```javascript
db.users.updateOne(
  { name: "Alice" },
  { $set: { lastLogin: new Date() } }
);
```

### 4. Aggregation Pipeline

MongoDB's aggregation framework lets you transform and analyze data in stages:

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);
```

---

## When to Use MongoDB (and When Not To)

**Good fit:**

- Content management, blogs, catalogs
- Real-time analytics, event logs
- Prototyping and rapid iteration
- Data with variable or nested structure (JSON from APIs)

**Less ideal:**

- Heavy relational reporting (lots of JOINs)
- Strong multi-document transactions (MongoDB has them, but they're newer)
- Data that fits perfectly in normalized tables with strict integrity

---

## Slides & Resources

- [View slides](https://slides.com/xergioalex/nosql-y-mongodb)
- [Source code (GitHub)](https://github.com/RockaLabs/mongoNodeExamples) — Node.js examples connecting to MongoDB
