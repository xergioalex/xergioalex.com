---
title: 'Autonomous Line-Following Robot'
description: 'A robotics project combining Arduino, computer vision, and PID control to build an autonomous line-following robot capable of navigating complex tracks at high speed.'
pubDate: '2023-04-15'
heroImage: '/blog-placeholder-2.jpg'
heroLayout: 'banner'
tags: ['portfolio', 'tech']
---

## Overview

This project was born from my passion for the intersection of hardware and software. The goal was to build an autonomous robot that could follow a line track at high speed while handling curves, intersections, and varying line widths.

## Technical Stack

- **Microcontroller:** Arduino Mega 2560
- **Sensors:** Array of 8 IR reflectance sensors
- **Motor Driver:** L298N dual H-bridge
- **Power:** 11.1V LiPo battery
- **Chassis:** Custom 3D-printed design

## How It Works

The robot uses a PID (Proportional-Integral-Derivative) control algorithm to keep centered on the line. The IR sensor array reads the position of the line relative to the robot center, and the PID controller adjusts the motor speeds to correct the trajectory in real-time.

### Key Features

- **Adaptive speed control** — slows down on tight curves, accelerates on straights
- **Intersection handling** — detects and navigates T-junctions and crossroads
- **Calibration mode** — auto-calibrates sensors to different surfaces and lighting conditions
- **Telemetry** — real-time data streaming via Bluetooth for debugging and tuning

## Challenges & Learnings

The biggest challenge was tuning the PID parameters. Too aggressive and the robot oscillates; too conservative and it fails on sharp turns. I built a custom tuning interface that streams sensor data in real-time, which made the process much faster.

This project deepened my understanding of control systems, embedded programming, and the importance of iterative prototyping.
