---
title: "Estructuras de Datos en Java: De Listas Enlazadas a un Triqui Invencible con IA"
description: "La historia de mi curso de Estructuras de Datos en la universidad — implementando pilas, colas, árboles, grafos y el algoritmo de Dijkstra en Java, culminando en un Triqui invencible usando el algoritmo Minimax."
pubDate: "2018-05-01"
heroLayout: "none"
tags: ["portfolio"]
---

Si mi [primer semestre con DrScheme](/es/blog/racket-projects-university/) me enseñó que programar se trataba de pensar, mi segundo semestre me enseñó que pensar no era suficiente — también había que organizar.

Estructuras de Datos. La materia que separa a la gente que sabe escribir código de la gente que sabe escribir código *eficiente*. La materia que te hace darte cuenta de que una simple lista no siempre es la respuesta, que la forma en que almacenas tus datos cambia todo sobre qué tan rápido puedes encontrarlos, ordenarlos o recorrerlos. Y la materia que, para mí, vino con un cambio de paradigma que no me esperaba: estábamos dejando Scheme atrás. No más paréntesis. No más notación prefija. No más "todo es una función."

Estábamos aprendiendo **Java**.

---

## De paréntesis a llaves

Después de un semestre completo escribiendo `(define (factorial n) ...)` en DrScheme, abrir [BlueJ](https://www.bluej.org/) por primera vez y ver `public static void main(String[] args)` fue como llegar a un país diferente. El mismo planeta — programación — pero todo se veía, se escuchaba y se sentía diferente.

En Scheme, una función era una función. En Java, una función vivía dentro de una clase, que vivía dentro de un archivo, que tenía que llamarse exactamente igual que la clase, y la clase tenía que tener los modificadores de acceso correctos, y — espera, ¿qué es un constructor?

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

Programación orientada a objetos. Clases. Encapsulamiento. Herencia. Todos conceptos que no tenían ningún equivalente en el mundo funcional del que venía. Pero acá viene lo interesante — el pensamiento recursivo que había entrenado en Scheme se transfería perfecto. Los árboles son recursivos. Los grafos son recursivos. La mayoría de las soluciones elegantes en estructuras de datos son recursivas. DrScheme me había preparado mejor de lo que me imaginaba.

---

## Los ladrillos fundamentales: pilas y colas

Todo curso de estructuras de datos empieza en el mismo lugar: **listas enlazadas**. Y a partir de las listas enlazadas, construyes todo lo demás.

Una lista enlazada es engañosamente simple — cada nodo guarda un dato y un puntero al siguiente nodo. Eso es todo. Pero de esa idea tan simple, salen dos estructuras fundamentales:

**Pilas** — Last In, First Out. Piensa en una pila de platos. Solo puedes agregar arriba y sacar de arriba. Implementamos `push()`, `pop()` y `peek()`, y de repente entiendes cómo funciona el botón de atrás del navegador, cómo funciona deshacer/rehacer, cómo funcionan las pilas de llamadas de funciones. El concepto que había sido abstracto en Scheme — el call stack creciendo y desenrollándose durante la recursividad — ahora tenía una implementación concreta que podía tocar.

**Colas** — First In, First Out. Una fila en el supermercado. La primera persona en la fila es la primera en ser atendida. Implementamos `enqueue()`, `dequeue()`, y recuerdo la satisfacción de construir la cola sobre la misma clase de lista enlazada que ya habíamos escrito para las pilas. Misma base, diferentes reglas, comportamiento completamente diferente.

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

¿Simple? Sí. Pero construir estas estructuras desde cero — sin usar `java.util.Stack` ni `java.util.Queue`, sino implementando cada manipulación de punteros tú mismo — ahí es donde está el verdadero aprendizaje.

---

## Árboles: donde la cosa se pone interesante

Si las pilas y colas son la entrada, los **árboles binarios** son donde empieza el plato fuerte.

Un árbol binario es un nodo con máximo dos hijos: izquierdo y derecho. Definición simple, complejidad infinita. Nuestra implementación cubría de todo:

- **Recorridos** — preorden, inorden, postorden, por niveles. Cuatro maneras diferentes de visitar cada nodo, cada una útil para diferentes propósitos. Me acuerdo del momento en que entendí que el recorrido inorden de un árbol binario de búsqueda te da la salida ordenada — se sintió como descubrir un secreto.

- **Evaluación de árboles de expresiones** — este fue el proyecto que conectó ambos semestres. Construimos un árbol que podía representar expresiones matemáticas como `((5 + 3) * 2)` en una estructura de árbol, y después evaluarlas recorriéndolas de abajo hacia arriba. El mismo concepto que había implementado en Scheme con notación prefija, ahora implementado en Java con objetos y punteros.

- **Verificación de balance AVL** — verificar si un árbol cumple la propiedad de balance. No implementar rotaciones AVL completas (eso vendría después), pero entender *por qué* importa el balance y *cómo* detectar el desbalance.

- **Comparación de árboles** — algoritmos para verificar si dos árboles son idénticos, si uno es subárbol de otro. Soluciones recursivas elegantes que me hicieron apreciar lo naturalmente que los árboles se mapean al pensamiento recursivo.

Después vinieron los **árboles N-arios** — árboles donde cada nodo puede tener cualquier cantidad de hijos, no solo dos. Los implementamos usando una estructura de punteros padre-hermano-hijo y construimos algoritmos para:

- **Verificación de isomorfismo** — ¿dos árboles son estructuralmente idénticos, sin importar los datos que contienen?
- **Ancestro común más bajo** — dados dos nodos, encontrar su padre compartido más cercano
- **Verificación de estabilidad** — verificar si los valores de los padres siempre son mayores que los de sus hijos

Cada algoritmo era un ejercicio de pensar recursivamente sobre datos jerárquicos. Y cada uno reforzaba algo que había aprendido en Scheme: si puedes resolverlo para un nivel, la recursividad se encarga del resto.

---

## Grafos y la belleza de Dijkstra

Después vinieron los **grafos**, y con ellos, una manera completamente nueva de modelar el mundo.

Un grafo es nodos conectados por aristas. Carreteras entre ciudades. Amistades en una red social. Dependencias entre paquetes de software. Implementamos grafos dirigidos con pesos usando listas de adyacencia — cada vértice mantiene una lista de sus aristas salientes, cada arista lleva un costo.

```java
public class Grafo {
    private ListaVertice listaVertices;

    public void insertarVertice(Object dato) { ... }
    public void insertarArco(Object origen, Object destino, int costo) { ... }
    public boolean existeCamino(Object origen, Object destino) { ... }
}
```

Pero la verdadera estrella del módulo de grafos fue el **algoritmo de Dijkstra para caminos más cortos**. La idea es elegante: empezando desde un nodo origen, progresivamente explorar el camino más barato no explorado hasta haber encontrado la ruta más corta a cada nodo alcanzable.

Me acuerdo implementándolo paso a paso — la tabla de distancias, el conjunto de visitados, la selección greedy del vértice no visitado con costo mínimo — y corriéndolo por primera vez en un grafo pequeño. Viendo al algoritmo encontrar caminos que yo mismo no había visto. Esa fue la primera vez que sentí que había construido algo genuinamente *inteligente*. No solo código que seguía instrucciones, sino código que *descubría* respuestas.

---

## La joya de la corona: un Triqui invencible

Para el proyecto final, construimos algo que unía todas las estructuras de datos: un **juego de Triqui con un oponente de IA que nunca pierde**.

¿El secreto? El **algoritmo Minimax** — un algoritmo de toma de decisiones de la teoría de juegos que considera cada posible estado futuro del juego y elige la jugada óptima.

Así funciona: el programa construye un **árbol N-ario de juego** donde cada nodo es un estado del tablero y cada hijo es un posible siguiente movimiento. Desde cualquier posición, el algoritmo evalúa recursivamente todas las posibles continuaciones:

- Si la computadora gana → puntuación +9
- Si es empate → puntuación 0
- Si el jugador gana → puntuación -9

La computadora elige el movimiento que lleva a la puntuación garantizada más alta. El jugador, siendo el adversario, se asume que elige el movimiento que lleva a la puntuación más baja. Máximo y mínimo, alternando — de ahí, "Minimax."

```java
// Detección de victoria - 8 combinaciones ganadoras posibles
// 3 filas, 3 columnas, 2 diagonales
if ((tablero[0] == jugador && tablero[1] == jugador && tablero[2] == jugador) ||
    (tablero[3] == jugador && tablero[4] == jugador && tablero[5] == jugador) ||
    (tablero[6] == jugador && tablero[7] == jugador && tablero[8] == jugador) ||
    // ... columnas y diagonales
    ) {
    return true;
}
```

¿El resultado? Una IA que **nunca pierde**. No por movimientos preprogramados ni por reconocimiento de patrones, sino porque literalmente considera cada posible futuro y escoge el mejor. No puedes ganarle — lo mejor que puedes lograr es un empate.

Construir esto conectó todo: árboles N-arios para el árbol de juego, recorrido recursivo para evaluar posiciones, la comprensión conceptual de pilas (el call stack de la recursión) y colas (exploración BFS potencial). Cada estructura de datos que habíamos aprendido encontró su lugar.

Lo que lo hacía especial no era solo que funcionara — es que un estudiante de segundo semestre podía entender *por qué* funcionaba. El algoritmo Minimax no es magia. Son solo árboles, recursividad y una función de puntuación. Los mismos bloques fundamentales que habíamos estado estudiando todo el semestre, ensamblados en algo que se sentía como inteligencia.

---

## Mirando hacia atrás

Estructuras de Datos fue la materia que me convirtió de alguien que podía programar en alguien que podía *hacer ingeniería*. La diferencia es saber no solo *cómo* resolver un problema, sino *cómo resolverlo bien*. Elegir la estructura de datos correcta — un árbol en vez de una lista, un grafo en vez de una matriz — cambia todo sobre la elegancia, rendimiento y mantenibilidad de tu solución.

Java fue el vehículo, pero las estructuras de datos fueron el destino. Las pilas me enseñaron sobre orden. Los árboles me enseñaron sobre jerarquía. Los grafos me enseñaron sobre conexiones. Y Minimax me enseñó que con la estructura correcta, un programa puede explorar posibilidades mucho más allá de lo que cualquier humano podría trazar en papel — aunque todo esté construido con piezas simples y comprensibles.

Cada clase, interfaz y algoritmo en ese [repositorio](https://github.com/xergioalex/pregrado_estructura_de_datos_java) representa un paso en entender que la computación no se trata solo de instrucciones — se trata de *organización*. Cómo organizas tus datos determina qué preguntas puedes responder. Y la organización correcta puede hacer que lo imposible se sienta trivial.
