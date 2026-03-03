---
title: "Rastreando lo Invisible: Cómo Construí Analíticas para Bots de IA sin JavaScript"
description: "El séptimo capítulo de la construcción de XergioAleX.com — implementando analíticas para bots de IA con un solo archivo de middleware en Cloudflare Pages. Sin JavaScript, sin scripts de rastreo, sin cambios de infraestructura. Solo un archivo en el edge y doce patrones que cambiaron lo que puedo ver."
pubDate: "2026-03-03"
heroImage: "/images/blog/posts/tracking-the-invisible-ai-bot-analytics/hero.png"
heroLayout: "side-by-side"
tags: ["tech", "portfolio", "web-development", "ai"]
series: "building-xergioalex"
seriesOrder: 7
---

En el [capítulo seis](/es/blog/deploying-astro-blog-cloudflare-pages/) moví el sitio de GitHub Pages a Cloudflare Pages y expliqué por qué: hosting gratuito, despliegues de vista previa por rama, DNS y SSL integrados, y una plataforma con margen para crecer. Hacia el final de ese capítulo, mencioné una puerta que la plataforma había abierto — el directorio `functions/`, detectado automáticamente, desplegado como middleware en el edge, sin infraestructura que gestionar.

Esto es lo que construí con ella.

---

## El Punto Ciego

En el [capítulo tres](/es/blog/measuring-what-matters-free-analytics/) armé un stack de analíticas del que estaba orgulloso. Umami para rastreo de eventos con privacidad primero. Cloudflare Web Analytics en el edge. Ambos gratuitos. Ambos rápidos. Ambos funcionando sin banners de cookies ni scripts pesados.

Lo que no noté — o no pensé con suficiente cuidado — fue quién no podía ser contado.

Ambas herramientas funcionan de la misma manera. Un snippet de JavaScript corre en el navegador del visitante. El snippet dispara eventos. Los eventos llegan a una API. Los números suben en un dashboard. Esa cadena solo funciona si hay un navegador. Si hay un visitante que realmente ejecuta JavaScript.

Para 2025, algunos de los visitantes más importantes de un sitio de contenido no son ese tipo de visitante.

---

## El Problema con los Crawlers

Los crawlers de IA — GPTBot, ClaudeBot, PerplexityBot, los demás — no navegan la web como los humanos. Envían solicitudes HTTP. Leen el HTML. Se van. Sin navegador. Sin ejecución de JavaScript. Sin disparar eventos.

Esto significa que cada vez que GPTBot rastrea una página para entrenar un modelo de lenguaje, no veo nada. La página se sirve. El crawler la lee. Mis analíticas registran cero. Desde la perspectiva del dashboard, la visita nunca ocurrió.

La ironía era aguda. Este sitio se había esforzado por invitar a esos crawlers. Había escrito un `robots.txt` que los nombraba explícitamente a los doce con reglas `Allow: /`. Había creado archivos `llms.txt` y `llms-full.txt` — resúmenes legibles por máquinas del contenido del sitio y la información de contacto, específicamente para consumo de LLMs. Había agregado datos estructurados para ayudar a los sistemas de IA a entender de qué trata el sitio.

Había tendido la alfombra roja. No tenía idea si alguien estaba pasando por ella.

Y no son solo los bots de IA. Lectores de RSS, crawlers de motores de búsqueda, herramientas de monitoreo — todo el ecosistema que no usa navegador es invisible para las analíticas del lado del cliente. Había asumido que "analíticas" significaba "analíticas JavaScript" y nunca lo había cuestionado. Ese supuesto era incorrecto.

---

## La Solución Parecía Un Solo Archivo

Había visto el directorio `functions/` mencionado en la documentación de Cloudflare Pages antes. En el capítulo seis, lo mencioné como una de las cosas que incluye la plataforma: pon un archivo TypeScript en `functions/`, y Cloudflare lo detecta automáticamente y lo despliega como middleware en el edge. Cada solicitud pasa por él antes de servirse.

Para la mayoría de los sitios estáticos, esto es innecesario. Todo el atractivo de un sitio estático es no necesitar lógica del lado del servidor. Eso sigue siendo cierto para el 99.9% de lo que hace este sitio.

Pero el middleware corre en cada solicitud de todas formas. Y lo que necesitaba era exactamente eso — algo que pudiera inspeccionar la solicitud, mirar el encabezado User-Agent, y decidir qué hacer antes de servir el contenido estático.

La solución fueron 122 líneas. Un archivo. Sin `wrangler.toml`. Sin nuevas dependencias. Sin cambios al pipeline de build de Astro. Solo un archivo TypeScript en `functions/` y un despliegue de Cloudflare que lo detectó automáticamente.

---

## Recorriendo el Código

Aquí está `functions/_middleware.ts` completo, con explicación de cada parte.

### Las Definiciones de Tipos

```typescript
interface Env {
  PUBLIC_UMAMI_WEBSITE_ID?: string;
}

interface EventContext {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
}
```

Las Cloudflare Pages Functions corren en un entorno Worker. La interfaz `EventContext` define lo que recibe el middleware: la solicitud entrante, el entorno (donde leo los secretos), una función `next()` para pasar la solicitud aguas abajo, y `waitUntil()` para trabajo asíncrono no bloqueante.

Definí estas interfaces de forma inline en lugar de instalar `@cloudflare/workers-types`. Una dependencia evitada, sin compromisos — los tipos que necesito son específicos y estables.

### La Lista de Bots

```typescript
const AI_BOT_PATTERNS: ReadonlyArray<{ pattern: RegExp; name: string }> = [
  { pattern: /GPTBot/i, name: 'GPTBot' },
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User' },
  { pattern: /ClaudeBot/i, name: 'ClaudeBot' },
  { pattern: /anthropic-ai/i, name: 'anthropic-ai' },
  { pattern: /Google-Extended/i, name: 'Google-Extended' },
  { pattern: /Bytespider/i, name: 'Bytespider' },
  { pattern: /CCBot/i, name: 'CCBot' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot' },
  { pattern: /Applebot-Extended/i, name: 'Applebot-Extended' },
  { pattern: /Amazonbot/i, name: 'Amazonbot' },
  { pattern: /Meta-ExternalAgent/i, name: 'Meta-ExternalAgent' },
  { pattern: /cohere-ai/i, name: 'cohere-ai' },
];
```

Doce patrones. Estos son los mismos doce bots listados en `robots.txt` con reglas explícitas `Allow: /`. No es coincidencia — la alfombra roja y el timbre usan la misma lista.

Cada entrada tiene un patrón regex y un nombre limpio. Los nombres aparecen en los eventos de analíticas, así que quería que fueran legibles. "GPTBot" es más útil en un dashboard que la cadena de User-Agent sin procesar.

### La Función de Detección

```typescript
function detectAiBot(userAgent: string): string | null {
  for (const { pattern, name } of AI_BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }
  return null;
}
```

Escaneo lineal a través de la lista de patrones. Gana el primer match. Devuelve el nombre del bot si lo encuentra, null si no.

Simple. La lista son doce elementos. Un trie o matching más sofisticado sería optimización prematura para algo que corre en resultados `null` el 99.9%+ de las veces.

### El Manejador de Solicitudes

```typescript
export async function onRequest(context: EventContext): Promise<Response> {
  const userAgent = context.request.headers.get('user-agent') || '';
  const botName = detectAiBot(userAgent);

  // Solicitudes de no-bots: pasar inmediatamente con cero overhead
  if (!botName) {
    return context.next();
  }

  // Bot detectado: log a consola (visible en logs en tiempo real del dashboard de CF)
  const url = new URL(context.request.url);
  console.log(
    `[AI Bot] ${botName} → ${url.pathname} (${context.request.method})`
  );

  // Rastrear a Umami via API server-side (no bloqueante)
  const websiteId = context.env.PUBLIC_UMAMI_WEBSITE_ID;
  if (websiteId) {
    context.waitUntil(sendToUmami(websiteId, botName, context.request));
  }

  return context.next();
}
```

Este es el núcleo. Cada solicitud toca esta función. El camino rápido son las primeras tres líneas: leer el User-Agent, verificar patrones de bot, devolver `context.next()` inmediatamente si no hay match. Para visitantes humanos, el overhead es una lectura de encabezado y doce pruebas de regex — microsegundos, no milisegundos.

Si se detecta un bot, pasan dos cosas: un log de consola (para visibilidad en tiempo real en el dashboard de Cloudflare) y una llamada a `context.waitUntil()` hacia Umami.

Luego `context.next()` devuelve la página real. El bot recibe su respuesta.

### El Payload de Umami

```typescript
function buildUmamiPayload(
  websiteId: string,
  botName: string,
  url: string,
  hostname: string,
  language: string
): object {
  return {
    payload: {
      website: websiteId,
      url,
      hostname,
      language,
      name: 'ai_bot_visit',
      data: {
        bot: botName,
        path: url,
        method: 'GET',
      },
    },
    type: 'event',
  };
}
```

La API server-side de Umami acepta un payload JSON con un `type` y un `payload`. El nombre del evento es `ai_bot_visit` — el mismo nombre definido en el catálogo de analíticas del sitio. El objeto `data` personalizado adjunta el nombre del bot y la ruta, lo que significa que puedo filtrar por bot en el dashboard de Umami.

### La Llamada de Rastreo

```typescript
async function sendToUmami(
  websiteId: string,
  botName: string,
  request: Request
): Promise<void> {
  const requestUrl = new URL(request.url);

  const body = buildUmamiPayload(
    websiteId,
    botName,
    requestUrl.pathname,
    requestUrl.hostname,
    'en-US'
  );

  try {
    await fetch(UMAMI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    // Falla silenciosamente — las analíticas nunca deben romper el sitio
  }
}
```

Un `fetch` a la API de Umami. La función completa está envuelta en un try/catch con un bloque catch vacío. Si Umami está caído, si la solicitud expira, si el payload está mal formado — el sitio sirve normalmente y nadie sabe que las analíticas fallaron. Ese es el comportamiento correcto para instrumentación.

---

## Por Qué Estas Decisiones de Diseño Específicas

### Regex en Lugar de una Biblioteca

No hay paquete npm para detección de bots de IA aquí. Lo consideré brevemente, miré las opciones, y decidí que el overhead no valía la pena — tanto en tamaño del bundle como en mantenimiento de dependencias. Doce patrones regex hacen el trabajo. Los patrones vienen de la documentación oficial de cada bot (OpenAI, Anthropic, Google, etc.), y son lo suficientemente estables como para que un enfoque regex sobreviva a cualquier biblioteca que los envuelva.

El compromiso: cuando aparece un nuevo bot de IA y quiero rastrearlo, actualizo el array y el archivo `robots.txt`. Dos lugares. Manual, pero obvio. Si usara una biblioteca, estaría esperando un ciclo de release en lugar de hacer un cambio de dos líneas.

### `waitUntil()` en Lugar de `await`

Esta sí importa. Si hubiera escrito:

```typescript
await sendToUmami(websiteId, botName, context.request);
return context.next();
```

Entonces cada visita de bot bloquearía esperando a que la llamada a la API de Umami se resolviera antes de devolver una respuesta. Para un bot que no se preocupa por la latencia, esto no tiene sentido. Para el rendimiento en el edge, es activamente malo.

`context.waitUntil()` registra una promesa para resolverse después de que se envíe la respuesta. El bot recibe su respuesta inmediatamente. La llamada a Umami corre en segundo plano. La experiencia del visitante — incluso la experiencia del bot — no cambia.

Este es un patrón de Service Workers y Cloudflare Workers: hacer lo mínimo requerido antes de responder, diferir todo lo demás. Las analíticas son por definición "todo lo demás."

### La Misma Instancia de Umami

Rastro los bots de IA en el mismo sitio web de Umami que los visitantes humanos — no en un proyecto separado. Los eventos están etiquetados `ai_bot_visit` y llevan `data.bot` para que pueda filtrar y segmentar. Pero los datos viven en el mismo lugar.

La alternativa era un sitio de Umami separado solo para bots. Lo pensé unos treinta segundos y decidí que era sobre-ingeniería. Quiero ver el tráfico de bots junto al tráfico humano — mismo dashboard, misma línea de tiempo, mismo contexto. Un bot visitando el blog la misma semana que un pico de tráfico de un artículo compartido es interesante. En dashboards separados, esa correlación es más difícil de ver.

La variable de entorno `PUBLIC_UMAMI_WEBSITE_ID` ya está configurada en el dashboard de Cloudflare — el middleware la lee desde `context.env`. No agregué un nuevo secreto ni una nueva variable de entorno. La infraestructura ya estaba. Eso es parte de lo que quise decir en el capítulo seis cuando dije que Cloudflare Pages era una plataforma, no solo hosting: las piezas encajan de maneras que no tienes que conectar tú mismo.

---

## El Debugging Que Hice y No Debería Haber Tenido Que Hacer

Quiero ser honesto sobre algo: la primera versión no funcionó. No por la lógica del middleware — por un error de TypeScript que introduje al intentar ser demasiado listo.

Mi función original `buildUmamiPayload` aceptaba un parámetro `userAgent` para incluirlo en el payload. Después de escribirla, decidí que el nombre del bot era más útil que la cadena de User-Agent sin procesar y eliminé el uso del cuerpo del payload. Pero olvidé quitar el parámetro de la firma de la función. `astro check` lo marcó: declarado pero nunca leído. Corrección de una línea. Veinte minutos de debugging confuso porque había estado mirando la sección incorrecta del código.

La lección: cuando un check de build falla después de un cambio pequeño, el error casi siempre está en el cambio pequeño. Perdí tiempo mirando la lógica del middleware cuando el problema estaba en la firma de una función una pantalla más arriba.

---

## Lo Que Puedo Ver Ahora Que Antes No Podía

El dashboard de Cloudflare tiene un visor de logs en tiempo real. Dentro de la primera hora de desplegar el middleware, vi `[AI Bot] GPTBot → /blog/building-xergioalex-website/ (GET)` pasar por la pantalla.

Ese es un crawler real de OpenAI, leyendo el capítulo uno de esta serie. No tengo idea en qué ciclo de entrenamiento de modelo entró, ni si el contenido terminó en algún dataset de fine-tuning. Pero puedo ver que ocurrió. Eso es lo importante. Antes de esto, era invisible. Ahora está registrado.

En Umami, los eventos `ai_bot_visit` aparecen en la sección de eventos personalizados con el nombre del bot adjunto. Puedo filtrar por `bot = ClaudeBot`, ver qué páginas ha visitado el crawler de Anthropic, y compararlo con la distribución de vistas de página de los lectores humanos. Puedo rastrear si el tráfico de bots se correlaciona con la publicación de nuevos posts. Puedo ver qué secciones del sitio se rastrean más.

Nada de esto era posible con analíticas del lado del cliente. Todo es posible con 122 líneas y un archivo.

---

## Manteniéndolo en el Futuro

La lista necesitará actualizaciones. Los crawlers de IA se están proliferando. Había cinco o seis cuando armé por primera vez la lista de allow en `robots.txt`. Ahora hay doce. Para cuando leas esto, probablemente habrá más.

Mi proceso actual: cuando veo un User-Agent de bot desconocido en los logs de Cloudflare que parece un crawler de IA, lo agrego. Dos cambios — uno a `AI_BOT_PATTERNS` en el middleware, uno a `robots.txt`. Ambos archivos están en el mismo repositorio. El cambio es una adición de una línea a cada uno.

No estoy monitoreando activamente en busca de nuevos bots. Los detectaré cuando aparezcan en los logs como tráfico no rastreado que una búsqueda muestre que es un crawler de IA. No es perfecto, pero es suficiente para lo que es esto: instrumentación para un sitio personal, no un sistema de producción.

Lo único que haría diferente si construyera esto para algo más grande: leer los patrones de detección de bots desde un KV store en lugar de tenerlos hardcodeados en el middleware. Así, agregar un nuevo patrón de bot es una actualización del dashboard y no un deploy. Algo bueno saber antes de necesitarlo.

---

## El Panorama General

Este capítulo trata, en la superficie, de un pequeño archivo de middleware. Pero sigo volviendo a lo que representa.

El sitio ya estaba construido para IA — datos estructurados, `llms.txt`, reglas explícitas de allow. Pero "construido para IA" significaba "hacer el contenido descubrible." No decía nada sobre si los sistemas de IA realmente lo estaban descubriendo. El punto ciego en las analíticas no fue un error que cometí. Era una brecha en lo que las herramientas podían ver.

Cerrar esa brecha no requirió un nuevo producto ni un servicio de pago. Requirió una función en el edge y la observación de que un snippet de JavaScript no puede correr en un crawler que no ejecuta JavaScript. Una vez que eso es obvio, la solución se sigue.

Hay algo interesante en quién rastrea más y adónde va. Mi hipótesis inicial era que los posts del blog dominarían — el texto de formato largo es exactamente lo que scrapean los entrenamientos de modelos de lenguaje. También esperaba que la página principal y `llms.txt` recibieran tráfico de crawlers que hacen un inventario rápido de superficie antes de profundizar. Si eso es realmente lo que pasa es lo que los datos eventualmente mostrarán.

Creo que vale la pena decirlo directamente: la mayoría de las cosas invisibles en la infraestructura web no son invisibles porque sean complicadas de medir. Son invisibles porque las herramientas que hemos estado usando desde 2005 fueron diseñadas para navegadores, y hemos asumido que todo lo que vale la pena medir tiene un navegador adjunto.

Cada vez más, no lo tiene. Eso no va a cambiar.

A seguir construyendo.

---

## Recursos

- [Documentación de Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [API Server-Side de Umami](https://umami.is/docs/api/sending-stats)
- [Cloudflare Pages Functions — Middleware](https://developers.cloudflare.com/pages/functions/middleware/)
- [Especificación robots.txt de OpenAI](https://platform.openai.com/docs/bots)
- [Logs en Tiempo Real de Cloudflare](https://developers.cloudflare.com/logs/about/)
