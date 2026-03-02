---
title: "Analisis comparativo de algoritmos de ordenamiento"
description: "Un analisis academico sobre complejidad y tiempos de ejecucion de algoritmos de ordenamiento, comparando resultados reales en dos servidores."
pubDate: "2018-01-12"
heroImage: "/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/hero.jpg"
heroLayout: "banner"
tags: ["tech", "javascript", "university"]
---

Como parte de un ejercicio tipico de algoritmia en la universidad, hice un pequeno analisis comparativo de los algoritmos de ordenamiento mas populares, buscando estudiar la complejidad de cada uno y como las diferentes formas de resolver un mismo problema pueden afectar los tiempos de ejecucion.

Quiero aclarar que este es solo un analisis academico muy simple que quise documentar, y que tal vez sirva a futuro para otros estudiantes de ciencias de la computacion.

Comence desarrollando un pequeno script en Java que genera numeros aleatorios de cinco digitos y los almacena en un archivo de texto, para poder analizar el mismo conjunto de datos entre diferentes algoritmos. El script lo puedes encontrar en este [repositorio](https://github.com/xergioalex/analysisOfSortAlgorithms) y ejecutar de la siguiente forma:

```bash
# Ruta del archivo
> algorithms/java/RandomNumbers.java

# Ejecutar script en Java
$ javac RandomNumbers.java && java RandomNumbers
```

Lo anterior genera el archivo [numbers/numbers.txt](https://github.com/xergioalex/analysisOfSortAlgorithms/blob/master/numbers/numbers.txt) con `n` numeros aleatorios definidos dentro del script. En mis experimentos llegue a generar un archivo de 1.000.000.000 de datos (cerca de 5 GB), por eso no lo adjunte en el repositorio.

---

## Algoritmos evaluados

En un paso siguiente procedi a implementar algoritmos de ordenamiento populares:

- [Burbuja (Bubble Sort)](https://es.wikipedia.org/wiki/Ordenamiento_de_burbuja): `O(n^2)`
- [Conteo (Counting Sort)](https://es.wikipedia.org/wiki/Ordenamiento_por_cuentas): `O(n+k)`
- [Montones (Heapsort)](https://es.wikipedia.org/wiki/Heapsort): `O(n log n)`
- [Insercion (Insertion Sort)](https://es.wikipedia.org/wiki/Ordenamiento_por_inserci%C3%B3n): `O(n^2)`
- [Mezcla (Merge Sort)](https://es.wikipedia.org/wiki/Ordenamiento_por_mezcla): `O(n log n)`
- [Rapido (Quicksort)](https://es.wikipedia.org/wiki/Quicksort): `O(n log n)`
- [Seleccion (Selection Sort)](https://es.wikipedia.org/wiki/Ordenamiento_por_selecci%C3%B3n): `O(n^2)`

Para esta tarea seleccione C y los scripts se encuentran en [`algorithms/c/sortAlgorithms`](https://github.com/xergioalex/analysisOfSortAlgorithms/tree/master/algorithms/c/sortAlgorithms).

---

## Automatizacion de pruebas

Dado que para hacer un buen analisis se deben correr muchas pruebas, cree un par de scripts para automatizarlas:

```bash
# Script base para ejecutar cualquier algoritmo y generar logs de tiempos
> algorithms/c/benchmark.c

# Correr prueba
# arg1, arg2 => nombre del algoritmo y cantidad de elementos
$ gcc benchmark.c -o benchmark.out && ./benchmark.out arg1 arg2

# Script para correr multiples pruebas
> algorithms/c/runTest.c

# Correr pruebas
$ gcc runTest.c -o runTest.out && ./runTest.out
```

Con esto ya estaba todo listo. Solo faltaba dejar corriendo `runTest.c` en una maquina. Aunque era un ejercicio academico sin gran rigor cientifico, procure usar un pequeno ambiente controlado para evitar ruido por otros procesos.

Para eso cree dos droplets en Digital Ocean:

![Digital Ocean droplets](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/digital-ocean-droplets.png)

El segundo servidor tenia el doble de recursos, asi que en teoria debia rendir mejor.

Tambien configure Java y C en ambos servidores con este script de aprovisionamiento: [ServerConfig/provision.sh](https://github.com/xergioalex/analysisOfSortAlgorithms/blob/master/severConfig/provision.sh)

```bash
# Base installation
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y build-essential gcc python-dev python-pip python-setuptools

# Git
sudo apt-get install -y git

# Install Java
sudo apt-get install default-jre -y
sudo apt-get install default-jdk -y
sudo apt-get install openjdk-7-jre -y
sudo apt-get install openjdk-7-jdk -y
```

---

## Resultados

En cada maquina se corrieron pruebas con el mismo archivo de numeros aleatorios, aumentando el tamano en diferentes intervalos (10, 100, 1.000, 10.000, etc.). Los resultados detallados estan en [`results/analysis.ods`](https://github.com/xergioalex/analysisOfSortAlgorithms/blob/master/results/analysis.ods).

Como pausa util, este fue el truco para dejar el proceso en background sin depender de la sesion:

```bash
$ gcc runTest.c -o runTest.out && ./runTest.out
# Ctrl + z
disown -h %1
bg 1
```

Despues de varios dias, los experimentos apenas iban por 1.600.000 de datos en los algoritmos `O(n^2)`, asi que detuve la ejecucion en ambos servidores y empece el analisis.

M1 = Maquina 1 (1 nucleo, 1GB RAM)  
M2 = Maquina 2 (2 nucleos, 2GB RAM)

### Burbuja (Bubble Sort): O(n^2)

![Bubble Sort M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/bubble-sort-m1.png)
![Bubble Sort M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/bubble-sort-m2.png)
![Bubble Sort M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/bubble-sort-m1-m2.png)

### Conteo (Counting Sort): O(n+k)

![Counting Sort M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/counting-sort-m1.png)
![Counting Sort M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/counting-sort-m2.png)
![Counting Sort M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/counting-sort-m1-m2.png)

### Montones (Heapsort): O(n log n)

![Heap Sort M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/heap-sort-m1.png)
![Heap Sort M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/heap-sort-m2.png)
![Heap Sort M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/heap-sort-m1-m2.png)

### Insercion (Insertion Sort): O(n^2)

![Insertion Sort M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/insertion-sort-m1.png)
![Insertion Sort M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/insertion-sort-m2.png)
![Insertion Sort M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/insertion-sort-m1-m2.png)

### Mezcla (Merge Sort): O(n log n)

![Merge Sort M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/merge-sort-m1.png)
![Merge Sort M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/merge-sort-m2.png)
![Merge Sort M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/merge-sort-m1-m2.png)

### Rapido (Quicksort): O(n log n)

![Quick Sort M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/quick-sort-m1.png)
![Quick Sort M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/quick-sort-m2.png)
![Quick Sort M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/quick-sort-m1-m2.png)

### Seleccion (Selection Sort): O(n^2)

![Selection Sort M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/selection-sort-m1.png)
![Selection Sort M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/selection-sort-m2.png)
![Selection Sort M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/selection-sort-m1-m2.png)

### Grafica comparativa de todos los algoritmos

![All algorithms M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/all-algorithms-m1.png)
![All algorithms M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/all-algorithms-m2.png)
![All algorithms M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/all-algorithms-m1-m2.png)

En esa comparativa, los cuatro algoritmos rapidos (`quickSort`, `mergeSort`, `heapSort`, `countingSort`) se solapan por escala. El perdedor claro fue `bubbleSort`, seguido por `insertionSort` y `selectionSort`.

Esto refleja un reto clasico en computacion: para un mismo problema hay muchas soluciones, pero cada una funciona mejor bajo condiciones concretas.

---

## Tiempos de respuesta (ultimos 7 puntos)

### Maquina 1 (M1)

| Size | BubbleSort | CountingSort | HeapSort | InsertionSort | MergeSort | QuickSort | SelectionSort |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1,000,000 | 5584.254499 | 0.016609 | 0.747395 | 2592.498977 | 0.704281 | 0.291499 | 1935.487457 |
| 1,100,000 | 6637.222252 | 0.019187 | 0.925764 | 3171.445715 | 0.653455 | 0.471039 | 2269.966268 |
| 1,200,000 | 8045.953682 | 0.023652 | 0.913537 | 3722.638885 | 0.513099 | 0.239454 | 2783.279525 |
| 1,300,000 | 10169.383378 | 0.045208 | 0.713308 | 4824.250285 | 0.575149 | 0.261289 | 3514.914589 |
| 1,400,000 | 12053.658798 | 0.034613 | 1.489084 | 5658.739951 | 0.676112 | 0.279478 | 4066.729922 |
| 1,500,000 | 13798.854123 | 0.027525 | 1.094257 | 6555.365499 | 0.743651 | 0.315602 | 4839.340426 |
| 1,600,000 | 15205.680544 | 0.028478 | 0.996648 | 6794.512119 | 0.725347 | 0.325990 | 5056.213092 |

### Maquina 2 (M2)

| Size | BubbleSort | CountingSort | HeapSort | InsertionSort | MergeSort | QuickSort | SelectionSort |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1,000,000 | 7069.317038 | 0.032415 | 0.752168 | 3178.694237 | 0.558200 | 0.315689 | 2454.531144 |
| 1,100,000 | 8458.150387 | 0.024157 | 0.842038 | 3666.359787 | 0.557481 | 0.284579 | 2804.449695 |
| 1,200,000 | 9495.898708 | 0.026530 | 0.882819 | 4084.581924 | 0.616636 | 0.358502 | 3081.748250 |
| 1,300,000 | 10626.023771 | 0.027309 | 0.913814 | 4933.201883 | 0.753890 | 0.401456 | 3912.714921 |
| 1,400,000 | 13439.250082 | 0.030009 | 1.061221 | 5790.797804 | 0.633180 | 0.442449 | 4066.729922 |
| 1,500,000 | 15102.736592 | 0.031826 | 1.064744 | 6565.630358 | 0.788551 | 0.400238 | 5114.565289 |
| 1,600,000 | 16483.694808 | 0.039298 | 1.365129 | 7311.347004 | 0.760618 | 0.449284 | 5676.768371 |

---

## Algoritmos rapidos

Al graficar solo los algoritmos eficientes (`quickSort`, `mergeSort`, `heapSort`, `countingSort`), casi ninguno supero 1 segundo con 1.600.000 datos.

![Fastest algorithms M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/fastest-algorithms-m1.png)
![Fastest algorithms M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/fastest-algorithms-m2.png)
![Fastest algorithms M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/fastest-algorithms-m1-m2.png)

El ganador fue `countingSort` (`O(n+k)`), pero no es una bala de plata:

- Solo funciona con enteros.
- Puede consumir mucha memoria si `maximo - minimo` es grande.

En segundo lugar quedo `quickSort`, muy usado en practica, aunque puede degradar a `O(n^2)` con mala seleccion de pivote y distribuciones adversas.

---

## Maquina 1 vs Maquina 2

Surgio una pregunta importante: ¿como puede M1 vencer a M2 en tiempos si M2 tiene el doble de recursos?

La clave es que los algoritmos no estaban paralelizados. Aunque M2 tiene dos nucleos, el codigo no usaba hilos para explotarlos realmente.

Eso deja la comparacion mas ligada a frecuencia de CPU por nucleo:

- M1: `2399.998 MHz`
- M2: `1799.998 MHz`

### Informacion del sistema

![Arquitectura M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/architecture-m1.png)
![Arquitectura M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/architecture-m2.png)

Las unidades de frecuencia:

- 1 Hertz (Hz) = un ciclo/segundo
- 1 Kilohertz (KHz) = 1024 Hz
- 1 Megahertz (MHz) = 1024 KHz
- 1 Gigahertz (GHz) = 1024 MHz
- 1 Terahertz (THz) = 1024 GHz

Comando usado para inspeccionar CPU:

```bash
$ lscpu
```

---

## Prueba extendida (maxima capacidad por memoria)

Luego extendi el experimento enfocandome en algoritmos eficientes para ver cuanto soportaban las maquinas por memoria disponible:

![Capacidad maxima M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/fastst-algorithms-memory-test-m1.png)
![Capacidad maxima M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/fastst-algorithms-memory-test-m2.png)

Aqui M2 (2GB RAM) si logro procesar mas volumen en varios casos.

### Counting Sort hasta maximo volumen

![Counting max M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/counting-sort-max-memory-m1.png)
![Counting max M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/counting-sort-max-memory-m2.png)
![Counting max M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/counting-sort-max-memory-m1-m2.png)

### Heap Sort hasta maximo volumen

![Heap max M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/heap-sort-max-memory-m1.png)
![Heap max M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/heap-sort-max-memory-m2.png)
![Heap max M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/heap-sort-max-memory-m1-m2.png)

### Merge Sort hasta maximo volumen

![Merge max M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/merge-sort-max-memory-m1.png)
![Merge max M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/merge-sort-max-memory-m2.png)
![Merge max M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/merge-sort-max-memory-m1-m2.png)

### Quick Sort hasta maximo volumen

![Quick max M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/quick-sort-max-memory-m1.png)
![Quick max M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/quick-sort-max-memory-m2.png)
![Quick max M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/quick-sort-max-memory-m1-m2.png)

### Comparativa final de algoritmos eficientes

![All max M1](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/all-algorithms-max-memory-m1.png)
![All max M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/all-algorithms-max-memory-m2.png)
![All max M1 vs M2](/images/blog/posts/analisis-de-algoritmos-de-ordenamiento/all-algorithms-max-memory-m1-m2.png)

Al extender el experimento con mayor volumen de datos, las curvas se volvieron mas uniformes y comparables con sus funciones de complejidad teorica.

---

## Conclusiones

Este ejercicio me ayudo a reforzar varias ideas:

- Complejidad algoritmica importa, pero no cuenta toda la historia.
- El hardware influye segun el tipo de algoritmo y su uso real de recursos.
- Mas RAM no siempre acelera, pero puede ampliar el limite de datos procesables.
- Paralelismo real requiere diseno explicito (hilos, particion de trabajo, etc.).

Espero que este analisis le sirva a quien esta empezando en ciencias de la computacion o quiere repasar fundamentos.

Recursos: [Repositorio con codigo en GitHub](https://github.com/xergioalex/analysisOfSortAlgorithms)

---

> "La inteligencia consiste no solo en el conocimiento, sino tambien en la destreza de aplicar los conocimientos en la practica."  
> **Aristoteles**
