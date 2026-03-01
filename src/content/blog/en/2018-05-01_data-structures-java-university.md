---
title: "Data Structures in Java: From Linked Lists to an Unbeatable Tic-Tac-Toe AI"
description: "The story of my Data Structures course at university — implementing stacks, queues, trees, graphs, and Dijkstra's algorithm in Java, culminating in an unbeatable Tic-Tac-Toe AI using the Minimax algorithm."
pubDate: "2018-05-01"
heroLayout: "none"
tags: ["portfolio"]
---

If my [first semester with DrScheme](/blog/racket-projects-university/) taught me that programming was about thinking, my second semester taught me that thinking wasn't enough — you also had to organize.

Data Structures. The course that separates people who can write code from people who can write *efficient* code. The course that makes you realize a simple list isn't always the answer, that how you store your data changes everything about how fast you can find it, sort it, or traverse it. And the course that, for me, came with a paradigm shift I wasn't expecting: we were leaving Scheme behind. No more parentheses. No more prefix notation. No more "everything is a function."

We were learning **Java**.

---

## From parentheses to curly braces

After a full semester writing `(define (factorial n) ...)` in DrScheme, opening [BlueJ](https://www.bluej.org/) for the first time and seeing `public static void main(String[] args)` was like arriving in a different country. Same planet — programming — but everything looked, sounded, and felt different.

In Scheme, a function was a function. In Java, a function lived inside a class, which lived inside a file, which had to be named exactly the same as the class, and the class had to have the right access modifiers, and — wait, what's a constructor?

```java
public class NodoLista {
    private Object dato;
    private NodoLista siguiente;

    public NodoLista(Object dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}
```

Object-oriented programming. Classes. Encapsulation. Inheritance. All concepts that had zero equivalent in the functional world I'd just come from. But here's the interesting thing — the recursive thinking I'd trained in Scheme? That transferred perfectly. Trees are recursive. Graphs are recursive. Most of the elegant solutions in data structures are recursive. DrScheme had prepared me better than I realized.

---

## The building blocks: stacks and queues

Every data structures course starts at the same place: **linked lists**. And from linked lists, you build everything else.

A linked list is deceptively simple — each node holds a piece of data and a pointer to the next node. That's it. But from that simple idea, you get two fundamental structures:

**Stacks** — Last In, First Out. Think of a stack of plates. You can only add to the top and remove from the top. We implemented `push()`, `pop()`, and `peek()`, and suddenly you understand how your browser's back button works, how undo/redo works, how function call stacks work. The concept that had been abstract in Scheme — the call stack growing and unwinding during recursion — now had a concrete implementation I could touch.

**Queues** — First In, First Out. A line at the supermarket. The first person in line is the first person served. We implemented `enqueue()`, `dequeue()`, and I remember the satisfaction of building the queue on top of the same linked list class we'd already written for stacks. Same foundation, different rules, completely different behavior.

```java
public void enqueue(Object dato) {
    NodoLista nuevoNodo = new NodoLista(dato);
    if (isEmpty()) {
        cabeza.setSiguiente(nuevoNodo);
    } else {
        NodoLista actual = cabeza.getSiguiente();
        while (actual.getSiguiente() != null) {
            actual = actual.getSiguiente();
        }
        actual.setSiguiente(nuevoNodo);
    }
}
```

Simple? Yes. But building these from scratch — not using `java.util.Stack` or `java.util.Queue`, but implementing every pointer manipulation yourself — that's where the real learning happens.

---

## Trees: where things get interesting

If stacks and queues are the appetizers, **binary trees** are where the main course begins.

A binary tree is a node with at most two children: left and right. Simple definition, infinite complexity. Our implementation covered everything:

- **Traversals** — preorder, inorder, postorder, level-order. Four different ways to visit every node, each useful for different purposes. I remember the moment when I understood that inorder traversal of a binary search tree gives you sorted output — it felt like discovering a secret.

- **Syntax tree evaluation** — this was the project that connected both semesters. We built a tree that could represent mathematical expressions like `((5 + 3) * 2)` as a tree structure, then evaluate them by traversing bottom-up. The same concept I'd implemented in Scheme with prefix notation, now implemented in Java with objects and pointers.

- **AVL balance verification** — checking whether a tree satisfies the balance property. Not implementing full AVL rotations (that would come later), but understanding *why* balance matters and *how* to detect imbalance.

- **Tree comparison** — algorithms to check if two trees are identical, if one is a subtree of another. Elegant recursive solutions that made me appreciate how naturally trees map to recursive thinking.

Then came **N-ary trees** — trees where each node can have any number of children, not just two. We implemented them using a parent-sibling-child pointer structure and built algorithms for:

- **Isomorphism checking** — are two trees structurally identical, regardless of the data they contain?
- **Lowest common ancestor** — given two nodes, find their closest shared parent
- **Stability verification** — checking whether parent values are always greater than their children

Each algorithm was an exercise in thinking recursively about hierarchical data. And each one reinforced something I'd learned in Scheme: if you can solve it for one level, recursion handles the rest.

---

## Graphs and the beauty of Dijkstra

Then came **graphs**, and with them, a whole new way of modeling the world.

A graph is nodes connected by edges. Roads between cities. Friendships in a social network. Dependencies between software packages. We implemented directed weighted graphs using adjacency lists — each vertex maintains a list of its outgoing edges, each edge carries a cost.

```java
public class Grafo {
    private ListaVertice listaVertices;

    public void insertarVertice(Object dato) { ... }
    public void insertarArco(Object origen, Object destino, int costo) { ... }
    public boolean existeCamino(Object origen, Object destino) { ... }
}
```

But the real star of the graph module was **Dijkstra's shortest path algorithm**. The idea is elegant: starting from a source node, progressively explore the cheapest unexplored path until you've found the shortest route to every reachable node.

I remember implementing it step by step — the distance table, the visited set, the greedy selection of the minimum-cost unvisited vertex — and running it for the first time on a small graph. Watching the algorithm find paths I hadn't seen myself. That was the first time I felt like I'd built something genuinely *smart*. Not just code that followed instructions, but code that *discovered* answers.

---

## The crown jewel: an unbeatable Tic-Tac-Toe

For the final project, we built something that brought every data structure together: a **Tic-Tac-Toe game with an AI opponent that never loses**.

The secret? The **Minimax algorithm** — a decision-making algorithm from game theory that considers every possible future state of the game and chooses the optimal move.

Here's how it works: the program builds an **N-ary game tree** where each node is a board state and each child is a possible next move. From any position, the algorithm recursively evaluates all possible continuations:

- If the computer wins → score +9
- If it's a draw → score 0
- If the player wins → score -9

The computer picks the move that leads to the highest guaranteed score. The player, being the adversary, is assumed to pick the move that leads to the lowest score. Max and min, alternating — hence, "Minimax."

```java
// Win detection - 8 possible winning combinations
// 3 rows, 3 columns, 2 diagonals
if ((tablero[0] == jugador && tablero[1] == jugador && tablero[2] == jugador) ||
    (tablero[3] == jugador && tablero[4] == jugador && tablero[5] == jugador) ||
    (tablero[6] == jugador && tablero[7] == jugador && tablero[8] == jugador) ||
    // ... columns and diagonals
    ) {
    return true;
}
```

The result? An AI that **never loses**. Not because of hardcoded moves or pattern matching, but because it literally considers every possible future and picks the best one. You can't outsmart it — the best you can achieve is a draw.

Building this connected everything: N-ary trees for the game tree, recursive traversal for evaluating positions, the conceptual understanding of stacks (the recursion call stack) and queues (potential BFS exploration). Every data structure we'd learned found its place.

What made it special wasn't just that it worked — it's that a second-semester student could understand *why* it worked. The Minimax algorithm isn't magic. It's just trees, recursion, and a scoring function. The same building blocks we'd been studying all semester, assembled into something that felt like intelligence.

---

## Looking back

Data Structures was the course that turned me from someone who could program into someone who could *engineer*. The difference is knowing not just *how* to solve a problem, but *how to solve it well*. Choosing the right data structure — a tree instead of a list, a graph instead of a matrix — changes everything about your solution's elegance, performance, and maintainability.

Java was the vehicle, but the data structures were the destination. Stacks taught me about ordering. Trees taught me about hierarchy. Graphs taught me about connections. And Minimax taught me that with the right structure, a program can explore possibilities far beyond what any human could trace on paper — even though it's all built from simple, understandable pieces.

Every class, interface, and algorithm in that [repository](https://github.com/xergioalex/pregrado_estructura_de_datos_java) represents a step in understanding that computing isn't just about instructions — it's about *organization*. How you organize your data determines what questions you can answer. And the right organization can make the impossible feel trivial.
