---
title: "Midiendo lo que Importa: Cómo Configuré Analytics Gratis Sin Sacrificar el Rendimiento"
description: "El tercer capítulo de la construcción de XergioAleX.com — implementando un stack completo de analytics usando solo herramientas gratuitas, sin perder los puntajes perfectos de Lighthouse ni agregar banners de cookies."
pubDate: "2026-02-28"
heroImage: "/images/blog/posts/measuring-what-matters-free-analytics/hero.png"
heroLayout: "side-by-side"
tags: ["tech", "portfolio", "web-development"]
series: "building-xergioalex"
seriesOrder: 3
---

En el [primer post](/es/blog/building-xergioalex-website/), conté la historia de construir este sitio — desde una página de aterrizaje con una foto y cinco enlaces a redes sociales hasta una plataforma personal completa con Astro, Svelte, contenido bilingüe y una arquitectura lista para IA. En el [segundo post](/es/blog/lighthouse-perfect-scores/), profundicé en cómo logré puntajes perfectos en Lighthouse — 100/100/100/100 en Performance, Accessibility, Best Practices y SEO, tanto en móvil como en escritorio.

Ahora el sitio estaba construido. Era rápido. Era accesible. Estaba indexado.

Pero no tenía idea si alguien lo estaba leyendo.

---

## Volando a Ciegas

Hay algo extraño en publicar contenido al vacío. Escribes un post, lo despliegas, y luego... nada. Sin ciclo de retroalimentación. Sin señal. Puedes revisar el dashboard de Cloudflare y ver que sí, el sitio se está sirviendo, pero no sabes qué páginas visita la gente, qué posts realmente leen, de dónde vienen, o si pasan del primer párrafo.

Este era el problema que me propuse resolver. No solo "agregar analytics" — sino construir un sistema de medición que responda preguntas reales sobre el contenido y el comportamiento de los usuarios, sin comprometer lo que había pasado semanas perfeccionando.

Las restricciones eran claras:

1. **Todas las herramientas deben ser gratuitas.** Este es un sitio personal, no un producto SaaS. No voy a pagar $30/mes por heatmaps.
2. **Los puntajes de Lighthouse deben mantenerse en 100.** No pasé semanas optimizando rendimiento y accesibilidad para tirarlo a la basura con un script de tracking pesado.
3. **Sin banners de consentimiento de cookies.** Quiero que los visitantes lean mi contenido, no que cierren popups. La privacidad debería ser el estándar, no una opción.

---

## La Pregunta de Google Analytics

Déjame abordar esto directamente, porque es lo primero que todos preguntan: "¿Por qué no simplemente usar Google Analytics?"

Google Analytics 4 es gratis — en el sentido monetario. Pero el costo real se mide en kilobytes, cookies y complejidad.

**El script pesa ~70KB.** Para contexto, la fuente Atkinson Hyperlegible que usa este sitio pesa alrededor de 15KB. El script de tracking de GA4 es casi cinco veces más pesado que una fuente personalizada. En un sitio que apunta a Lighthouse 100, eso no es un error de redondeo — es una amenaza directa a tu puntaje de Performance. El script agrega 50-150ms de Total Blocking Time en el hilo principal.

**Establece cookies.** GA4 coloca cookies de primera parte `_ga` y `_ga_*` en el navegador de cada visitante. Bajo GDPR, estas constituyen datos personales. Lo que significa que necesitas un banner de consentimiento de cookies. Lo que significa más JavaScript, un elemento de UI que causa layout shifts, y una experiencia degradada para cada visitante nuevo.

**Los workarounds agregan complejidad.** Puedes usar Partytown para mover GA4 a un web worker y mantener el hilo principal limpio. Pero Partytown tiene problemas de compatibilidad con las View Transitions de Astro, agrega complejidad al build, y no resuelve el problema de las cookies.

Esta es la evaluación honesta: todo lo que GA4 proporciona — pageviews, sesiones, referrers, demografía, datos en tiempo real — puede cubrirse con alternativas más ligeras y sin cookies. Lo único que GA4 ofrece de forma exclusiva son segmentación de audiencia avanzada y funnels de conversión, que un blog personal no necesita.

Así que tomé la decisión: sin GA4. No porque sea malo — es una plataforma increíblemente poderosa — sino porque los trade-offs no tienen sentido para este sitio en particular.

---

## El Stack que Elegí

En lugar de una herramienta monolítica de analytics, armé un stack de herramientas gratuitas especializadas. Cada una es la mejor en lo que hace, y juntas cubren cada ángulo de medición que necesito.

### Cloudflare Web Analytics — El Regalo

Esta fue casi demasiado fácil. Como el sitio está desplegado en [Cloudflare Pages](https://pages.cloudflare.com), ya tenía acceso a Cloudflare Web Analytics. Viene incluido gratis con cada cuenta de Cloudflare.

Lo que lo hace especial es que requiere **cero cambios de código**. Cloudflare inyecta un beacon diminuto (~1KB) en el edge — nunca toca tu código fuente, tu pipeline de build, ni tu HTML. Lo habilitas en el dashboard con un solo clic.

Proporciona:
- Page views, visitas y visitantes únicos
- Páginas principales por tráfico
- Fuentes de referencia
- Países, navegadores y tipos de dispositivo
- **Real User Monitoring (RUM)** con Core Web Vitals: LCP, INP, CLS, FCP, TTFB

Ese último punto es crucial. Lighthouse te da puntajes de laboratorio — mediciones tomadas bajo condiciones controladas. Cloudflare te da **datos de campo** — lo que los usuarios reales experimentan. Puedes sacar 100 en Lighthouse pero tener un LCP lento para usuarios en Sudamérica en móvil. Solo los datos RUM revelan eso.

Sin cookies. Sin banner de consentimiento. Sin impacto en rendimiento. Estaba activado antes de que escribiera una sola línea de código de analytics.

### Umami — El Reemplazo de GA4

[Umami](https://umami.is) es una herramienta de analytics open-source enfocada en privacidad. La versión cloud tiene un tier gratuito que soporta hasta 1 millón de eventos por mes — más que suficiente para cualquier sitio personal.

Lo que me atrajo de Umami fue la combinación de funcionalidades y filosofía:

- **Sin cookies por diseño.** Sin cookies, sin fingerprinting, sin recolección de datos personales. Compatible con GDPR de fábrica.
- **Script de ~2KB.** Compara eso con los ~70KB de GA4. El script carga con `defer` y tiene cero impacto en el renderizado de la página.
- **Dashboard limpio.** Páginas principales, referrers, tracking de campañas UTM, eventos personalizados, bounce rate, tiempo en página — presentado en una interfaz rápida y sin distracciones.
- **Eventos personalizados.** Puedo trackear interacciones específicas — clics en enlaces externos, cambios de idioma, engagement con posts — llamando una simple función `trackEvent()`.

La integración fue directa. Un tag `<script>` en `BaseHead.astro`, renderizado condicionalmente solo cuando la variable de entorno `PUBLIC_UMAMI_WEBSITE_ID` está configurada:

```astro
{ANALYTICS.umami.websiteId && (
  <script
    defer
    src={ANALYTICS.umami.scriptUrl}
    data-website-id={ANALYTICS.umami.websiteId}
  />
)}
```

Si la variable de entorno no está configurada — como en desarrollo local — el script simplemente no se renderiza. Cero overhead.

### Microsoft Clarity — La Revelación

Esta es la herramienta que más me sorprendió. [Microsoft Clarity](https://clarity.microsoft.com) es completamente gratis — sin límites de tráfico, sin tier premium, sin truco. Y lo que proporciona es algo que ninguna herramienta de analytics de tráfico puede: **puedes ver a personas reales usar tu sitio.**

Clarity graba sesiones de usuario y genera heatmaps. Los heatmaps de clic muestran dónde la gente hace clic. Los heatmaps de scroll muestran qué tan lejos hacen scroll. Las grabaciones de sesión te permiten ver una reproducción anonimizada de una visita real.

Para un blog, esto es transformador. Puedo ver:
- **¿Los lectores realmente terminan mis posts?** Los heatmaps de scroll revelan el punto exacto donde la mayoría de visitantes dejan de hacer scroll. Si el 80% abandona después del segundo párrafo, eso es una señal para mejorar la apertura.
- **¿Dónde hacen clic?** ¿La gente está haciendo clic en los tags? ¿Los enlaces internos? ¿Los botones sociales?
- **¿Qué los frustra?** Clarity detecta "rage clicks" — clics rápidos y repetidos en un elemento que no responde. La detección de dead clicks encuentra elementos que parecen clickeables pero no lo son.

El script pesa ~10KB y carga asincrónicamente. Usa un patrón IIFE que se inicializa sin bloquear la página:

```astro
{ANALYTICS.clarity.projectId && (
  <script is:inline define:vars={{ clarityId: ANALYTICS.clarity.projectId }}>
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script",clarityId);
  </script>
)}
```

Mismo patrón condicional: sin variable de entorno, sin script.

### Google Search Console + Bing Webmaster Tools — La Capa SEO

Estas dos no son scripts de analytics — son herramientas solo de dashboard. En Google Search Console, la propiedad de dominio se puede verificar por DNS TXT. Cero impacto en rendimiento.

**Google Search Console** responde la pregunta que todo creador de contenido necesita saber: "¿Qué está buscando la gente para encontrar mi sitio?" Muestra qué queries generan impresiones, cuáles obtienen clics, y la posición promedio para cada una. Para un blog, esto es oro. Puedes ver qué posts rankean para qué términos, cuáles están en tendencia, y cuáles tienen muchas impresiones pero bajo click-through (lo que significa que el título y la descripción necesitan trabajo).

**Bing Webmaster Tools** proporciona datos de búsqueda similares, pero con una adición única: el **reporte AI Performance**. Lanzado en 2026, muestra qué tan seguido tu contenido es citado en Microsoft Copilot y en resúmenes generados por IA en Bing. A medida que la búsqueda impulsada por IA se vuelve más prevalente, esta es una de las únicas herramientas que da visibilidad sobre cómo los motores generativos usan tu contenido.

La etiqueta de verificación de Bing se renderiza condicionalmente:

```astro
{ANALYTICS.verification.bing && (
  <meta name="msvalidate.01" content={ANALYTICS.verification.bing} />
)}
```

### Lighthouse CI — El Guardián Automatizado

La pieza final no se trata de medir visitantes — se trata de proteger todo lo que construí. [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) es un workflow de GitHub Actions que ejecuta auditorías de Lighthouse automáticamente en cada pull request.

Construye el sitio, prueba páginas clave contra presupuestos de rendimiento, y falla el PR si algún puntaje cae por debajo del umbral. Los presupuestos están configurados para coincidir con los estándares actuales del sitio:

- Performance: >= 95
- Accessibility: = 100
- Best Practices: >= 95
- SEO: >= 95

Los umbrales están ligeramente por debajo de 100 para tener en cuenta la variación del entorno de CI (los puntajes de Lighthouse pueden fluctuar 2-3 puntos entre ejecuciones), mientras aún detectan cualquier regresión real. Si accidentalmente agrego un script que bloquea el render, una imagen sin dimensiones, o rompo un patrón ARIA, Lighthouse CI lo señalará antes de que el código llegue a producción.

---

## La Prueba de Rendimiento

La pregunta que me hacía constantemente durante este proceso: **¿agregar todos estos analytics rompió mis puntajes perfectos de Lighthouse?**

El overhead total de todos los scripts de analytics es aproximadamente **12KB cargados asincrónicamente**:
- Umami: ~2KB (defer)
- Clarity: ~10KB (IIFE async)
- Meta tags de verificación: despreciable

Para comparar, una sola imagen hero de blog pesa 50-200KB. Los scripts de analytics pesan menos que un JPEG pequeño.

Más importante aún, todos los scripts usan carga `defer` o `async`, lo que significa que no bloquean el renderizado de la página. No afectan el Largest Contentful Paint (LCP), el Cumulative Layout Shift (CLS), ni el Total Blocking Time (TBT) — las tres métricas que determinan el puntaje de Performance de Lighthouse.

La respuesta: **no, los puntajes se mantuvieron en 100.** El sitio se despliega con los mismos puntajes perfectos que tenía antes de agregar analytics. La clave fue elegir las herramientas correctas desde el inicio — scripts ligeros y asíncronos en lugar de un solo tracker pesado.

---

## Lo que Puedo Medir Ahora

Con este stack implementado, tengo respuestas a preguntas que antes no podía responder:

| Pregunta | Herramienta |
|----------|-------------|
| ¿Cuántas personas visitan el sitio? | Cloudflare + Umami |
| ¿Qué posts del blog tienen más tráfico? | Umami (Top Pages) |
| ¿De dónde vienen los visitantes? | Umami (Referrers) |
| ¿Qué busca la gente para encontrar el sitio? | Google Search Console |
| ¿Los lectores realmente terminan los posts? | Clarity (heatmaps de scroll) |
| ¿Dónde hacen clic los visitantes? | Clarity (heatmaps de clic) |
| ¿El sitio es rápido para usuarios reales? | Cloudflare (Core Web Vitals) |
| ¿Un cambio de código romperá el rendimiento? | Lighthouse CI (automático en PRs) |
| ¿El contenido es citado en herramientas de IA? | Bing Webmaster (AI Performance) |

Eso es cobertura completa — tráfico, comportamiento, búsqueda, rendimiento y visibilidad en IA — con cero dólares gastados y cero deuda de privacidad incurrida.

---

## La Decisión Arquitectónica: Todo Condicional

Una decisión de diseño que vale la pena destacar: cada integración de analytics es **condicional**. Los scripts y meta tags solo se renderizan cuando sus variables de entorno correspondientes están configuradas.

En la práctica, esto significa:
- **Desarrollo local** tiene cero overhead de analytics. Sin scripts de tracking, sin requests externos.
- **Producción** carga solo las herramientas que hayas configurado. Configura una variable, obtienes una herramienta. Configura todas, obtienes el stack completo.
- **Nuevos entornos** funcionan inmediatamente sin analytics — nada se rompe si las variables no están configuradas.

Esto se implementó a través de un objeto de configuración `ANALYTICS` centralizado en `src/lib/constances.ts` que lee de `import.meta.env`:

```typescript
export const ANALYTICS = {
  umami: {
    websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '',
    scriptUrl: 'https://cloud.umami.is/script.js',
  },
  clarity: {
    projectId: import.meta.env.PUBLIC_CLARITY_PROJECT_ID || '',
  },
  verification: {
    bing: import.meta.env.PUBLIC_BING_SITE_VERIFICATION || '',
  },
} as const;
```

Todas las variables usan la convención de prefijo `PUBLIC_` de Astro, que las hace disponibles en tiempo de build para renderizado del lado del cliente. La aserción `as const` le da a TypeScript inferencia de tipos completa sobre la configuración.

---

## Mirando Atrás

Este fue el tercer capítulo de construir XergioAleX.com:

1. **Construyendo la plataforma** — arquitectura, decisiones de tecnología, el camino de una página a un sitio completo.
2. **Perfeccionando los puntajes** — el trabajo meticuloso de lograr Lighthouse 100 en todas las categorías.
3. **Midiendo el impacto** — agregar un stack completo de analytics sin deshacer nada de ese trabajo.

Cada capítulo se construyó sobre el anterior. Las decisiones arquitectónicas del capítulo uno (Astro, generación estática, islands) hicieron posible el capítulo dos. El trabajo de rendimiento del capítulo dos estableció la restricción para el capítulo tres: cualquier analytics que agregara no podía comprometer lo que ya había logrado.

El resultado es un sitio que es rápido, accesible, medible y privado — todo al mismo tiempo. Sin trade-offs, sin compromisos, sin facturas mensuales.

Si hay algo que se puede sacar de todo este viaje, es esto: no tienes que elegir entre entender a tus usuarios y respetarlos. Las herramientas correctas, configuradas con cuidado, te dan ambas cosas.

---

## Recursos

- [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/) — RUM inyectado en el edge con Core Web Vitals
- [Umami Analytics](https://umami.is) — Analytics de tráfico open-source y sin cookies
- [Microsoft Clarity](https://clarity.microsoft.com) — Heatmaps y grabaciones de sesión gratis
- [Google Search Console](https://search.google.com/search-console) — Rendimiento de búsqueda e indexación
- [Bing Webmaster Tools](https://www.bing.com/webmasters) — Búsqueda + tracking de citaciones IA
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) — Auditorías de rendimiento automatizadas en CI
- [Construyendo XergioAleX.com](/es/blog/building-xergioalex-website/) — Primer post de esta serie
- [El Camino al 100: Puntajes Perfectos en Lighthouse](/es/blog/lighthouse-perfect-scores/) — Segundo post de esta serie
