---
title: "La Mejor Forma de Desplegar tu Sitio Astro Gratis"
description: "Después de años desplegando sitios estáticos en GitHub Pages, evalué todas las opciones gratuitas y aterricé en Cloudflare Pages. Esto es lo que aprendí, lo que me sorprendió, y por qué la plataforma sigue mejorando."
pubDate: "2026-03-04"
heroImage: "/images/blog/posts/best-way-deploy-astro-site-free/hero.png"
heroLayout: "side-by-side"
tags: ["tech", "portfolio", "web-development"]
series: "building-xergioalex"
seriesOrder: 6
---

Todo sitio tiene que vivir en algún lugar. Por un tiempo no pensé mucho en dónde — tenía GitHub Pages, funcionaba, y con eso bastaba. Pero cuando los requisitos crecieron — más páginas, dos idiomas, procesamiento de imágenes en tiempo de build, un blog completo con búsqueda — me di cuenta de que la plataforma de despliegue merecía la misma elección deliberada que el framework.

---

## Los Años de GitHub Pages

Llevo mucho tiempo desplegando sitios estáticos en GitHub Pages. Lo había usado para sitios de comunidades, proyectos paralelos, documentación — los casos de uso típicos de sitios estáticos. Conectar el repositorio, escribir un workflow de GitHub Actions, empujar a `gh-pages`. Siempre funcionó.

Entonces cuando empecé a construir este sitio en Astro, GitHub Pages fue el primer instinto. Ya tenía las plantillas del workflow. Ya conocía los problemas comunes. Parecía el camino de menor resistencia.

Pero me detuve a mirar las opciones primero. No porque GitHub Pages me hubiera fallado — no lo hizo. Sino porque este sitio tenía más partes móviles que cualquier cosa que hubiera desplegado ahí antes. Quería elegir deliberadamente en lugar de caer por defecto en lo que ya conocía.

---

## Evaluando las Alternativas

Tenía un requisito innegociable: **gratis**. Este es un sitio personal. No voy a pagar una factura mensual de hosting por un blog estático. Más allá de eso, quería buena experiencia de desarrollador, despliegues de vista previa por rama, configuración de DNS fácil, y — idealmente — extras que fueran útiles después sin atarme a un plan de pago.

**GitHub Pages** era lo que conocía. Conectar el repositorio, correr `astro build` en un workflow de Actions, empujar la carpeta `dist/` a la rama `gh-pages`. Funciona. El nivel gratuito es realmente útil para sitios estáticos — sin cobros por ancho de banda, sin gestión de servidores. Pero los puntos de fricción se fueron acumulando cuando empecé a listarlos. Sin despliegues de vista previa por rama — cada PR requería hacer merge para ver el resultado en vivo. El DNS con un dominio personalizado implicaba configurar CNAMEs con un proveedor externo, esperar la propagación, y confiar en que todo encajara. El pipeline de build depende completamente de ti — tú escribes el YAML, tú gestionas el caché, tú depuras las fallas del runner. Y GitHub Pages tiene un sesgo heredado hacia Jekyll que se nota en detalles pequeños: el archivo `.nojekyll`, el modelo de despliegue basado en ramas, la suposición de que tu generador de sitios estáticos es un ciudadano de segunda clase.

Ninguno de esos era un problema fatal por sí solo. Juntos, se sentían como fricción que aceptaba por costumbre más que por preferencia.

**Netlify** tenía una experiencia de desarrollador sólida y un nivel gratuito que incluye la mayoría de lo que se necesita. Pero había escuchado suficientes historias de facturas sorpresa — despliegas el sitio, el tráfico sube un día, y de repente consumiste 100GB de ancho de banda y la factura espera. El nivel gratuito tiene un techo, y el precipicio del otro lado es pronunciado. Quizás está bien para un sitio personal que nunca se viraliza, pero no quería tener que pensarlo.

**Vercel** es excelente para Next.js. En el momento en que estaba evaluando, Astro no era exactamente de primera clase allí — la experiencia era compatible, no nativa. Tampoco necesitaba funciones serverless todavía: estaba construyendo un blog estático, no un backend. Pagar por infraestructura optimizada para Next.js para alojar Astro se sentía como comprar una camioneta para mover una bicicleta.

Entonces miré **Cloudflare Pages**. Los números del nivel gratuito me hicieron pausar: ancho de banda ilimitado. 500 builds al mes. Despliegues de vista previa ilimitados. Sin precipicio de ancho de banda. Sin sorpresas de facturación. Y ya estás en la red de Cloudflare — más de 300 centros de datos globalmente, protección DDoS incluida, Web Application Firewall en el edge. Además: analíticas integradas en el edge, Workers para lógica del lado del servidor, y un ecosistema creciente de primitivos de almacenamiento y base de datos — KV, R2, D1 — todos con niveles gratuitos.

Había estado buscando hosting gratuito. Lo que encontré fue una plataforma gratuita.

Dejé de buscar.

---

## Aterrizando en Cloudflare Pages

El primer despliegue fue casi decepcionante de tan simple. Conecté el repositorio de GitHub en el panel de Cloudflare, y Cloudflare detectó automáticamente el framework Astro. Completó el comando de build (`astro build`), configuró el directorio de salida (`dist`), y me pidió confirmar la versión de Node.js. Básicamente eso fue todo. El primer build corrió en unos cuarenta segundos y el sitio quedó activo en un subdominio `pages.dev`.

Sin workflow de despliegue que escribir. Sin secretos que gestionar. Sin archivos YAML definiendo etapas y entornos. Comparado con los workflows de GitHub Actions que había escrito antes — instalar dependencias, correr el build, configurar la rama `gh-pages`, gestionar claves de despliegue — esto fue un no-evento.

La configuración de DNS fue igual de directa. Apunté los nameservers del dominio a Cloudflare, fui al panel, agregué `xergioalex.com` como dominio personalizado en el proyecto de Pages, y el certificado SSL se generó automáticamente. Sin scripts de renovación de Let's Encrypt. Sin malabarismos de CNAME con un proveedor externo. Sin "espera 48 horas y veremos si resuelve." Todo quedó listo en menos de una hora, incluyendo la propagación del DNS — más rápido de lo esperado.

Honestamente, se sentía como lo que GitHub Pages debería haber evolucionado a ser. La misma simplicidad en la superficie, pero con una plataforma real detrás.

---

## Entonces Cloudflare Adquirió Astro

En 2025, Cloudflare adquirió la empresa detrás de Astro. Llevaba meses en Cloudflare Pages antes de que eso ocurriera — puramente por el nivel gratuito y la experiencia de despliegue. La adquisición no era algo que hubiera planeado.

Pero hizo todo más cohesivo casi de inmediato.

Los tiempos de build mejoraron. La detección del framework Astro se volvió más precisa. El pipeline se sentía como si hubiera sido construido específicamente para Astro, no solo configurado para soportarlo. Donde antes tenía una buena experiencia, después de la adquisición tuve una experiencia nativa. La diferencia es sutil pero real — como la diferencia entre un plugin que funciona y una funcionalidad que pertenece ahí.

Había hecho una apuesta sin saber que era una apuesta. Cloudflare Pages por el nivel gratuito. Astro como framework. Y luego la plataforma compró el framework. No creo que hubiera podido planear esto aunque lo intentara.

Mirando hacia atrás, la adquisición validó algo más allá de la elección de proveedor de hosting. Me dijo que la combinación de sitios estáticos en infraestructura edge era hacia donde se dirigía la industria. Cloudflare no adquirió Astro para agregar otro logo al dashboard — lo adquirieron porque la arquitectura de Astro se alineaba con cómo Cloudflare piensa sobre la web: lo más posible en el edge, lo menos posible en el origen. Esa es la misma apuesta sobre la que está construido todo este sitio.

---

## Qué Obtienes Gratis

Déjame recorrer cada funcionalidad de forma concreta, porque la lista en la página de marketing de Cloudflare no te dice cómo se siente usarla en la práctica.

### Despliegue con cada Push

Cada push a `main` dispara un build. Sin archivo de workflow necesario — Cloudflare lo maneja. El sitio usa un workflow de GitHub Actions para el versionado y las etiquetas de commits, pero el despliegue en sí es 100% responsabilidad de Cloudflare. No mantengo un pipeline de despliegue. Hago push del código y el sitio se actualiza.

Mis proyectos anteriores necesitaban workflows de GitHub Actions de 40 líneas solo para desplegar. Aquí, ese workflow no existe. Eso no es un detalle menor.

### Despliegues de Vista Previa por Rama

Cada pull request obtiene una URL de vista previa única — algo como `https://abc123.xergioalex-com.pages.dev`. Antes de hacer merge, puedo probar el build exacto en una URL real, servida a través del CDN real, con las variables de entorno reales. No un servidor local de desarrollo. El sitio actual.

Esto cambió mi forma de trabajar. Antes, mi proceso de revisión era: correr `npm run dev`, verificar localmente, hacer merge, esperar que el build estuviera bien. Ahora es: abrir la vista previa del PR, verificar en el entorno desplegado real, hacer merge. El paso de "merge y rezar" desapareció.

### DNS y SSL Integrados

Cuando los nameservers del dominio apuntan a Cloudflare, la gestión del DNS se mueve al mismo panel que todo lo demás. Sin proveedor de DNS externo. Sin configuración de certificado SSL separada. Sin scripts de renovación. `xergioalex.com` resuelve, HTTPS funciona, y no he tocado la configuración de DNS desde la configuración inicial.

Esto suena como algo menor. Después de años gestionando certificados de Let's Encrypt y registros DNS externos, no es algo menor.

### Analíticas Incluidas

Cloudflare Web Analytics se inyecta automáticamente en el edge. Sin script que agregar al código. Sin variable de entorno. Sin cambios en el código. En GitHub Pages, las analíticas requieren agregar un script de seguimiento manualmente. En Cloudflare Pages, simplemente vienen con la plataforma.

### Variables de Entorno

Se configuran en el panel, disponibles en tiempo de build, con valores distintos para vista previa vs producción. El ID del sitio web de Umami se configura una vez en el panel de Cloudflare — diferente para los despliegues de vista previa, diferente para producción. Sin archivos `.env` que gestionar en CI. Sin secretos en el repositorio. Sin el problema de "¿recordé actualizar la variable para el nuevo entorno?"

### Configuración de Build

Configuración única en el panel: comando de build (`astro check && astro build`), directorio de salida (`dist`), versión de Node.js. Sin `wrangler.toml` necesario para un sitio estático. La configuración vive con el proyecto en el panel, versionada implícitamente a través de la conexión con el repositorio de GitHub.

### La Red de Cloudflare

Esto es menos una funcionalidad y más una consecuencia. El sitio se sirve desde más de 300 centros de datos de Cloudflare a nivel global. Un lector en São Paulo obtiene la página desde un nodo edge cercano, no desde un servidor de origen único en Virginia. La protección DDoS está activada por defecto. El Web Application Firewall está disponible. Para un blog personal, la mayoría de esto corre silenciosamente en segundo plano — pero significa que el sitio tiene la misma infraestructura que propiedades mucho más grandes.

### Workers y Funciones en el Edge

El directorio `functions/` en el repositorio se detecta automáticamente y se despliega como Cloudflare Pages Functions — middleware en el edge que corre en cada solicitud sin infraestructura de servidor que gestionar. Esto es lo que hace posible la lógica del lado del servidor en lo que de otra manera sería un sitio estático.

La plataforma de despliegue que elegí por el nivel gratuito resultó tener un runtime de edge programable integrado en el alojamiento estático. Eso desbloqueó cosas que no había anticipado cuando elegí Cloudflare Pages — como analíticas del lado del servidor para visitantes que no ejecutan JavaScript.

### El Nivel Gratuito en Detalle

Esto es lo que incluye el nivel gratuito: sitios ilimitados, ancho de banda ilimitado, 500 builds al mes, despliegues de vista previa ilimitados. Más allá del alojamiento estático: Workers, almacenamiento KV, almacenamiento de objetos R2, base de datos SQLite D1 — todos con niveles gratuitos generosos. Puedes empezar con un blog estático y crecer hasta una plataforma completa sin cambiar de proveedor. El precipicio de precios que me preocupaba de Netlify no existe aquí, al menos no para la escala de un sitio personal.

---

## Lo Que No Es Perfecto

Quiero ser honesto sobre los puntos de fricción, porque la experiencia de Cloudflare Pages no es completamente perfecta.

Los tiempos de build pueden ser lentos. Mi sitio se construye en unos ocho segundos localmente — `astro check`, procesamiento de imágenes, generación estática para más de 60 páginas en dos idiomas. En el sistema de build de Cloudflare, el mismo proceso toma cerca de cuarenta segundos. Es una diferencia de 5 veces. No es un impedimento — el build corre en segundo plano después de un push, y no me quedo mirando la barra de progreso. Pero si estás acostumbrado a la velocidad de build de Vercel, lo vas a notar.

La primera vez que configuré la propagación DNS, pasé cerca de una hora depurando lo que resultó ser nada. El panel de Cloudflare mostraba todo configurado correctamente — dominio personalizado agregado, certificado SSL emitiéndose. Pero el dominio no resolvía. Revisé los registros DNS tres veces. Busqué guías de solución de problemas. Abrí un hilo de soporte. La respuesta: la propagación DNS toma tiempo, incluso en la red de Cloudflare. El panel no me había mentido. Solo tenía que esperar. Lección: la propagación DNS sigue siendo propagación DNS, sin importar de quién sea la red.

También: las Cloudflare Pages Functions son excelentes para middleware, pero no son lo mismo que los Cloudflare Workers completos. La superficie de API es más pequeña — sin Durable Objects, sin Queues, sin primitivos avanzados. Si necesitas esas funcionalidades, necesitas un proyecto de Workers separado, no un despliegue de Pages Functions. Para un blog, la capacidad de middleware es más que suficiente. Pero conocer el límite importa antes de diseñar alrededor de él.

Si estás buscando hosting gratuito para un sitio estático en Astro y quieres más que solo servir archivos — despliegues de vista previa, gestión de DNS, funciones en el edge, analíticas — Cloudflare Pages es la mejor opción que he encontrado. No es perfecta, pero la fricción es baja y el techo es alto.

A seguir construyendo.

---

## Recursos

- [Documentación de Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Desplegar un sitio Astro en Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Nivel Gratuito de Cloudflare Pages](https://www.cloudflare.com/developer-platform/products/pages/)
- [Cloudflare adquiere Astro](https://blog.cloudflare.com/cloudflare-acquires-astro/)
