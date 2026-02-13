---
title: 'Introduccion a la Orquestacion con Kubernetes'
description: 'Aprende los fundamentos de Kubernetes y como revoluciona la orquestacion de contenedores a escala'
pubDate: '2025-01-02'
heroImage: '/images/blog/shared/blog-placeholder-2.jpg'
heroLayout: 'side-by-side'
tags: ['tech', 'demo']
draft: false
---

A medida que las aplicaciones en contenedores crecen en complejidad, gestionar contenedores individuales se vuelve impractico. Kubernetes (K8s) surgio como el estandar de la industria para automatizar el despliegue, escalado y gestion de aplicaciones en contenedores.

## Por que Kubernetes?

Ejecutar un solo contenedor en un servidor es simple. Pero cuando tienes cientos de contenedores en docenas de maquinas, necesitas respuestas a preguntas criticas:

- Como distribuyes los contenedores entre maquinas?
- Que pasa cuando un contenedor se cae a las 3 de la manana?
- Como escalas durante picos de trafico y reduces cuando baja la demanda?
- Como haces despliegues sin tiempo de inactividad?

Kubernetes responde a todas estas preguntas — y mas.

## Conceptos Fundamentales

### Pods

Un Pod es la unidad desplegable mas pequena en Kubernetes. Representa uno o mas contenedores que comparten recursos de almacenamiento y red. Lo mas comun es que un Pod ejecute un solo contenedor, pero los patrones sidecar (logging, proxy) usan Pods multi-contenedor.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mi-app
  labels:
    app: web
spec:
  containers:
    - name: web
      image: mi-app:1.0
      ports:
        - containerPort: 8080
      resources:
        requests:
          memory: '128Mi'
          cpu: '250m'
        limits:
          memory: '256Mi'
          cpu: '500m'
```

### Deployments

Un Deployment gestiona un conjunto de Pods identicos, asegurando que el numero deseado de replicas esten siempre en ejecucion. Maneja actualizaciones progresivas y rollbacks automaticamente.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: mi-app:1.0
```

### Services

Los Services proporcionan endpoints de red estables para acceder a los Pods. Como los Pods son efimeros (pueden ser creados y destruidos en cualquier momento), los Services te dan una forma consistente de alcanzar tu aplicacion:

- **ClusterIP:** Solo acceso interno (por defecto)
- **NodePort:** Expone en un puerto estatico en cada nodo
- **LoadBalancer:** Provisiona un balanceador de carga en la nube
- **Ingress:** Enrutamiento HTTP/HTTPS con terminacion TLS

## El Plano de Control

Kubernetes sigue un modelo declarativo. Tu describes el estado deseado de tu sistema, y el plano de control trabaja para que la realidad coincida con tu declaracion:

1. **API Server** — La puerta de entrada a tu cluster
2. **etcd** — Almacen distribuido de clave-valor para todos los datos del cluster
3. **Scheduler** — Asigna Pods a nodos basandose en requisitos de recursos
4. **Controller Manager** — Ejecuta bucles de control que regulan el estado del cluster

## Primeros Pasos en Local

La forma mas rapida de experimentar con Kubernetes es usando herramientas locales:

```bash
# Usando minikube
minikube start
kubectl apply -f deployment.yaml
kubectl get pods

# Usando kind (Kubernetes en Docker)
kind create cluster
kubectl cluster-info
```

## Conclusiones Clave

Kubernetes tiene una curva de aprendizaje pronunciada, pero la inversion vale la pena a escala. Comienza con despliegues simples, entiende el modelo de red, y adopta gradualmente caracteristicas avanzadas como Helm charts, operadores personalizados y service meshes. El ecosistema es vasto, pero los fundamentos permanecen constantes: Pods, Deployments, Services y el modelo declarativo.
