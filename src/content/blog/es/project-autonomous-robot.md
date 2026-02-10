---
title: 'Robot Autónomo Seguidor de Línea'
description: 'Un proyecto de robótica que combina Arduino, visión por computador y control PID para construir un robot autónomo seguidor de línea capaz de navegar pistas complejas a alta velocidad.'
pubDate: '2023-04-15'
heroImage: '/blog-placeholder-2.jpg'
tags: ['portfolio', 'tech']
---

## Descripción General

Este proyecto nació de mi pasión por la intersección entre hardware y software. El objetivo era construir un robot autónomo capaz de seguir una pista de línea a alta velocidad mientras maneja curvas, intersecciones y anchos de línea variables.

## Stack Técnico

- **Microcontrolador:** Arduino Mega 2560
- **Sensores:** Array de 8 sensores de reflectancia IR
- **Driver de Motores:** Puente H dual L298N
- **Energía:** Batería LiPo de 11.1V
- **Chasis:** Diseño personalizado impreso en 3D

## Cómo Funciona

El robot utiliza un algoritmo de control PID (Proporcional-Integral-Derivativo) para mantenerse centrado en la línea. El array de sensores IR lee la posición de la línea relativa al centro del robot, y el controlador PID ajusta las velocidades de los motores para corregir la trayectoria en tiempo real.

### Características Principales

- **Control de velocidad adaptativo** — reduce velocidad en curvas cerradas, acelera en rectas
- **Manejo de intersecciones** — detecta y navega cruces en T y encrucijadas
- **Modo de calibración** — auto-calibra los sensores para diferentes superficies y condiciones de luz
- **Telemetría** — transmisión de datos en tiempo real vía Bluetooth para depuración y ajuste

## Desafíos y Aprendizajes

El mayor desafío fue ajustar los parámetros PID. Demasiado agresivo y el robot oscila; demasiado conservador y falla en curvas cerradas. Construí una interfaz de ajuste personalizada que transmite datos de sensores en tiempo real, lo que hizo el proceso mucho más rápido.

Este proyecto profundizó mi comprensión de sistemas de control, programación embebida y la importancia del prototipado iterativo.
