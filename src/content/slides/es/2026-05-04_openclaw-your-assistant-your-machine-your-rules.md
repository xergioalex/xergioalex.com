---
type: internal
title: 'OpenClaw: Tu asistente. Tu máquina. Tus reglas.'
description: 'Cómo un founder fastidiado, un bot de WhatsApp y siete archivos Markdown se volvieron el open source más viral en la historia de GitHub.'
pubDate: 2026-05-04
heroImage: '/images/slides/openclaw-your-assistant-your-machine-your-rules/cover-es.webp'
tags: [tech, ai, talks]
draft: false
theme: dark
transition: slide
syntaxHighlight: true
math: false
eventName: 'OpenClaw — Charla compañera del post del blog'
eventDate: 2026-05-04
relatedPost: openclaw-your-assistant-your-machine-your-rules
---

<!-- ==================== Portada ==================== -->

<!-- .slide: data-background-image="/images/slides/openclaw-your-assistant-your-machine-your-rules/cover-es.webp" data-background-size="contain" data-background-position="center" data-background-color="#0f1124" -->

&nbsp;

Note: Abrir con la portada — full-bleed, sin texto encima. La portada ya trae el título, el lema, los logos del evento y la foto del speaker. Pausa de dos tiempos antes de soltar la primera frase: "Tu asistente. Tu máquina. Tus reglas." Seis palabras que explican por qué este proyecto rompió internet.

---

<!-- ==================== Construido en abierto ==================== -->

<!-- .slide: data-background-image="/images/slides/openclaw-your-assistant-your-machine-your-rules/built-in-the-open-es.webp" data-background-size="contain" data-background-position="center" data-background-color="#0f1124" -->

&nbsp;

Note: Antes de hablar de Peter, anclar el mensaje: OpenClaw fue construido en abierto. Cuatro pilares — transparencia, comunidad, colaboración, libertad. Abierto por naturaleza. Pausa breve, deja que la imagen hable, y entras al Acto 1.

---

<!-- ==================== Acto 1 — El hombre ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Acto 1</span>
  <h2>Peter Steinberger</h2>
  <p style="margin-top:0.8em;font-size:1.6em;color:#cbd5e1;font-weight:400;">El hombre detrás de la langosta</p>
  <p style="margin-top:0.6em;font-size:2.2em;letter-spacing:0.2em;">🦞 🦞 🦞</p>
</div>

Note: Esta historia no tiene sentido sin Peter Steinberger. Empezamos por él.

---

<!-- ==================== Peter + langosta ==================== -->

<!-- .slide: data-background-image="/images/slides/openclaw-your-assistant-your-machine-your-rules/peter-lobster.webp" data-background-size="contain" data-background-position="center" data-background-color="#0f1124" -->

<h2 style="position:absolute;bottom:8%;left:50%;transform:translateX(-50%);margin:0;padding:0.4em 1em;background:rgba(15,17,36,0.78);color:#fff;border-radius:8px;backdrop-filter:blur(6px);font-size:1.6em;letter-spacing:0.02em;">Peter Steinberger</h2>

Note: Acá la imagen presenta a Peter visual: el creador de OpenClaw y la langosta lado a lado. Pausa para que la audiencia conecte la cara con el nombre antes de seguir la línea de tiempo (Austria, código a los 14, PSPDFKit).

---

<!-- ==================== Austria rural ==================== -->

<!-- .slide: data-background-image="/images/slides/openclaw-your-assistant-your-machine-your-rules/rural-austria.webp" data-background-size="cover" data-background-position="center" data-background-color="#0f1124" -->

<div style="position:absolute;top:8%;left:50%;transform:translateX(-50%);padding:0.5em 1.2em;background:rgba(15,17,36,0.78);color:#fff;border-radius:10px;backdrop-filter:blur(6px);text-align:center;">
  <p style="margin:0;font-size:0.7em;letter-spacing:0.18em;text-transform:uppercase;color:#f59e0b;font-weight:600;">1986</p>
  <h2 style="margin:0.15em 0 0;font-size:1.4em;font-weight:700;line-height:1.15;">Nace en la Austria rural</h2>
</div>

Note: Imagen full-bleed de la Austria rural — montañas, granja de madera, vacas pastando. Es el escenario donde nace Peter en 1986. Pausa breve para que la audiencia respire el paisaje, y entras a la bio.

---

<!-- ==================== 14 años — el switch ==================== -->

## Aprende a programar a los 14 años

<img src="/images/slides/openclaw-your-assistant-your-machine-your-rules/peter-young-coding.webp" alt="Peter joven a los 14 años frente a un CRT con código en pantalla, en una habitación rural austriaca con un libro de C++ y una cita de Einstein" width="1672" height="941" class="slide-image-full" />

Note: A los 14 años, un invitado de verano le presta un computador. El switch se enciende. Esta imagen lo cuenta sola: el chico frente al CRT, código en pantalla, la iglesia austriaca por la ventana, un libro de C++ en el escritorio, una cita de Einstein en la pared. La idea: el momento exacto donde nace el programador. Pausa larga, deja que la imagen respire.

---

<!-- ==================== 2011 — Funda PSPDFKit ==================== -->

<div style="text-align:center;margin-bottom:0.4em;">
  <p style="margin:0;font-size:0.75em;letter-spacing:0.2em;text-transform:uppercase;color:#f59e0b;font-weight:600;">2011</p>
  <h2 style="margin:0.15em 0 0;font-size:1.3em;font-weight:700;line-height:1.15;">Cofunda PSPDFKit con Martin Schurrer</h2>
</div>

<div style="display:flex;align-items:center;justify-content:center;gap:3em;flex-wrap:wrap;margin-top:0.8em;">
  <img src="/images/slides/openclaw-your-assistant-your-machine-your-rules/peter-portrait.webp" alt="Retrato de Peter Steinberger" width="300" height="300" style="border-radius:50%;box-shadow:0 12px 32px rgba(0,0,0,0.45);" />
  <img src="/images/slides/openclaw-your-assistant-your-machine-your-rules/pspdfkit-logo.webp" alt="Logo de PSPDFKit" width="500" height="142" style="background:#fff;padding:0.9em 1.4em;border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,0.35);" />
</div>

<small style="display:block;text-align:center;margin-top:0.9em;font-size:0.75em;color:var(--slide-text);line-height:1.35;font-weight:500;"><em>SDK de PDF para iOS. Una década bootstrapped antes de aceptar dinero externo.</em></small>

Note: De los 14 años saltamos a 2011: Peter cofunda PSPDFKit con Martin Schurrer. Es la empresa que casi mil millones de personas tocaron sin saberlo — Dropbox, SAP, DocuSign, Apple. Pausa breve para que la audiencia conecte la cara con el logo antes de la diapo que resume el producto en una imagen.

---

<!-- ==================== Qué es PSPDFKit (gráfico) ==================== -->

## Qué es PSPDFKit

<p style="text-align:center;margin:0 0 0.75em;font-size:0.92em;color:var(--slide-text);line-height:1.4;font-weight:500;">SDK multiplataforma para integrar visor, anotación y firma de PDF en iOS, Android y web.</p>

<img src="/images/slides/openclaw-your-assistant-your-machine-your-rules/pspdfkit-framework-hero.webp" alt="Ilustración de PSPDFKit: dispositivos conectados (móviles, tabletas, monitor) mostrando PDFs con gráficos; líneas de conexión y logo blanco sobre fondo azul" width="1024" height="442" class="slide-image-full" style="display:block;margin:0.5em auto 0;max-width:min(100%, 1024px);" />

Note: Una sola imagen vale más que un párrafo: SDK multiplataforma para ver, anotar y gestionar PDF en apps reales. Déjala respirar dos segundos; la siguiente diapo cierra con números: alcance en dispositivos, clientes y la ronda de 2021.

---

<!-- ==================== PSPDFKit — escala 2021 ==================== -->

## PSPDFKit en 2021

<div class="slide-stat">
  <span class="slide-stat__number">~1B</span>
  <span class="slide-stat__label" style="color:var(--slide-text);font-weight:500;">dispositivos con apps construidas sobre PSPDFKit</span>
  <p style="font-size:0.78em;color:var(--slide-text);line-height:1.45;margin:1rem auto 0;max-width:36em;text-align:center;"><strong>Clientes:</strong> <em>Dropbox · SAP · DocuSign · Apple</em></p>
  <p style="font-size:0.72em;color:var(--slide-text);line-height:1.45;margin:0.85rem auto 0;max-width:40em;text-align:center;opacity:0.92;"><strong>Octubre 2021:</strong> Insight Partners, <strong>EUR 100M</strong> sobre la mesa — primer dinero externo tras <strong>diez años</strong> de operación bootstrapped.</p>
</div>

Note: Para 2021 el SDK ya estaba en casi mil millones de dispositivos sin que la mayoría supiera el nombre del producto. Los logos importan: integradores serios. La ronda de Insight cerró una década sin capital externo — “sobre la mesa” es literal: términos que por fin tenían sentido para Peter. Siguiente diapo: qué hizo Peter con *su* parte del trato.

---

<!-- ==================== Peter — liquidez tras la ronda (2021) ==================== -->

<!-- .slide: class="slide-content-top" -->

## Tras la ronda con Insight

<div class="slide-grid-2 slide-grid-2--compact-media">
  <div>
    <img src="/images/slides/openclaw-your-assistant-your-machine-your-rules/peter-new-chapter.webp" alt="Ilustración: figura que sale de una oficina hacia un puente y una ciudad al amanecer — metáfora de cerrar una etapa y emprender de nuevo" width="758" height="1024" style="display:block;max-height:min(50vh,460px);width:auto;margin:0;border-radius:10px;box-shadow:0 10px 28px rgba(0,0,0,0.22);" />
  </div>
  <div style="text-align:left;padding-top:0.15em;align-self:start;">
    <p style="margin:0;font-size:1.25em;line-height:1.4;color:var(--slide-text);">En la misma operación, Peter <strong>vendió la mayor parte de su participación</strong> para <strong>emprender nuevos proyectos</strong>.</p>
    <p style="margin:0.65em 0 0;font-size:1.0em;line-height:1.4;color:var(--slide-text);opacity:0.9;">Liquidez y cierre de etapa como fundador central.</p>
  </div>
</div>

Note: Misma narrativa que en el blog: Insight en la mesa y, en paralelo, Peter liquida casi todo el equity y abre carril. La imagen refuerza el giro sin mencionar logos. Puente al vacío y a Lex.

---

## Y entonces vino el vacío

<img src="/images/slides/openclaw-your-assistant-your-machine-your-rules/burnout.webp" alt="Ilustración: figura solitaria frente a un laptop en una habitación oscura al amanecer, papeles arrugados en el escritorio — burnout de un founder" width="1024" height="576" class="slide-image-full" style="display:block;margin:0.4em auto 0;max-width:min(100%, 1024px);" />

<small style="display:block;text-align:center;margin-top:0.6em;color:var(--slide-text);font-size:0.72em;font-style:italic;">Dos o tres años sin poder escribir una línea de código. La chispa que lo definía desde los catorce — apagada.</small>

Note: Burnout real. No el de "necesito vacaciones". El de "ya no sé quién soy sin esto". Pausa larga, deja que la imagen hable.

---

<!-- ==================== Desconectado ==================== -->

## Cerca de tres años desconectado

<img src="/images/slides/openclaw-your-assistant-your-machine-your-rules/disconnected.webp" alt="Ilustración: figura de espaldas sentada en una cabaña de madera mirando un lago y montañas al amanecer, laptop cerrado a un lado — desconexión del mundo tech" width="1024" height="576" class="slide-image-full" style="display:block;margin:0.4em auto 0;max-width:min(100%, 1024px);" />

<small style="display:block;text-align:center;margin-top:0.6em;color:var(--slide-text);font-size:0.72em;font-style:italic;">Sin código. Sin proyectos. Lejos del mundo tech. Tratando de averiguar si la chispa volvería — o si ya estaba acabado.</small>

Note: Imagen que respira silencio. Tres años es mucho para alguien cuya identidad giraba alrededor del código. Dejá que la audiencia sienta el peso antes de la referencia a Austin Powers.

---

<!-- ==================== Austin Powers ==================== -->

## "Me sentía como Austin Powers cuando le sacan el mojo"

<img src="/images/slides/openclaw-your-assistant-your-machine-your-rules/austin-powers-es.webp" alt="Meme de Austin Powers: He perdido mi mojo" width="1024" height="447" class="slide-image-full" style="display:block;margin:0.4em auto 0;max-width:min(100%, 1024px);border-radius:0.5rem;box-shadow:0 4px 24px rgba(0,0,0,0.22);" />

<small style="display:block;text-align:center;margin-top:0.6em;color:var(--slide-text);font-size:0.72em;font-style:italic;">— Peter Steinberger en el podcast de Lex Fridman (#491)</small>

Note: Cita textual de Peter. "I felt like Austin Powers where they suck the mojo out. I couldn't get code out anymore. I was just, like, staring and feeling empty." La imagen ayuda a que la audiencia conecte con humor antes de volver al peso emocional del tiquete a Madrid.

---

<!-- ==================== El reencuentro con la IA ==================== -->

## Hasta que la IA le devolvió la chispa

<img src="/images/slides/openclaw-your-assistant-your-machine-your-rules/ai-spark.webp" alt="Ilustración: silueta de una persona al borde de un precipicio mirando una escalera luminosa de agentes de IA y código que asciende hacia una ciudad futurista — el reencuentro con la tecnología" width="1024" height="576" class="slide-image-full" style="display:block;margin:0.4em auto 0;max-width:min(100%, 1024px);" />

<small style="display:block;text-align:center;margin-top:0.6em;color:var(--slide-text);font-size:0.72em;font-style:italic;">Desde un café en Madrid, Peter vio pasar la revolución de los coding agents — y algo dentro de él volvió a encenderse.</small>

Note: Finales de 2024, la IA generativa y los coding agents explotan. Peter los ve desde la distancia, desde un café en Madrid. No lo busca — la curiosidad lo encuentra. Empieza a jugar con modelos. Un prompt aquí, otro allá. Y de repente, sin proponérselo, está codeando otra vez.

---

## Y entonces, mayo de 2025…

<img src="/images/blog/posts/openclaw-your-assistant-your-machine-your-rules/steipete-spark-tweet.webp" alt="Tweet de Peter Steinberger mostrando su gráfico de contribuciones en GitHub con el mensaje When you get your spark back" width="900" height="649" class="slide-image-full" />

<small>Peter Steinberger en X, mayo 2025: "When you get your spark 🌟 back." ("Cuando recuperas tu chispa.")</small>

Note: Una captura de su actividad en GitHub. Estaba codeando sin parar. Un mes después publicó "Finding My Spark Again" en su blog. Volvió más ligero, más directo. Una frase lo resume: "I don't do this for the money. I want to have fun and have impact." ("No hago esto por la plata. Quiero divertirme y tener impacto.")

---

<!-- ==================== Acto 2 — El nacimiento ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Acto 2</span>
  <h2>De un bot de WhatsApp a fenómeno viral</h2>
</div>

---

## Noviembre 2025 — la molestia trivial

<ul>
  <li>Peter quería hablarle a un asistente de IA <strong>desde WhatsApp</strong></li>
  <li>No por el navegador. No por una app aparte.</li>
  <li>Por la app que ya usaba todos los días</li>
  <li>No existía nada que lo hiciera bien</li>
</ul>

<blockquote class="slide-quote" style="margin-top:0.6em;font-size:0.9em;">
  "I was annoyed that it didn't exist, so I just prompted it into existence."<br/>
  <span style="font-size:0.7em;color:#94a3b8;">("Me molestaba que no existiera, así que lo prompteé hasta hacerlo existir.")</span>
</blockquote>
<cite class="slide-quote-cite">— Peter Steinberger</cite>

Note: Esta es toda la historia de origen. Sin business plan. Sin análisis de mercado. Solo molestia. La primera versión era un puente entre WhatsApp y la API de Claude. Sin memoria. Sin herramientas. Solo mensajes de ida y vuelta.

---

## Construido en aproximadamente una hora

<div class="slide-grid-2">
  <div>
    <h3>La primera versión</h3>
    <ul>
      <li>WhatsApp ↔ API de Claude</li>
      <li>Sin memoria</li>
      <li>Sin herramientas</li>
      <li>Mensajes de ida y vuelta</li>
    </ul>
  </div>
  <div>
    <h3>El giro de la historia</h3>
    <ul>
      <li>Nacido con <strong>Claude</strong></li>
      <li>Pero construido casi todo con <strong>Codex de OpenAI</strong></li>
      <li>Peter ponía <strong>5–10 agentes Codex</strong> en paralelo como su equipo</li>
      <li>"El anuncio gratuito más grande de Codex"</li>
    </ul>
  </div>
</div>

Note: La ironía importa. El proyecto se llamó como Claude, pero la mayoría del código lo escribió un agente de OpenAI. El nombre "Clawd" lo sugirió la propia IA cuando Peter le preguntó cómo se debería llamar.

---

## "Clawd" — Claude le puso el nombre

<ul>
  <li>Peter le preguntó a la IA cómo llamar al proyecto</li>
  <li>Sugirió "<strong>Clawd</strong>" — juego de palabras con claw (garra) y Claude</li>
  <li>La langosta llegó natural — pinzas, mudas, crecimiento</li>
  <li>Peter lo subió a GitHub. Compartió el link. Se fue a dormir.</li>
</ul>

Note: Publicó, compartió y durmió. Al principio no pasó nada extraordinario. Unos cientos de devs lo encontraron. A las dos semanas, apenas 2,000 estrellas. Dos meses de crecimiento lento, casi silencioso. Y entonces…

---

## Llegó finales de enero de 2026

<div class="slide-stat">
  <span class="slide-stat__number">9.000 → 34.000 → 180.000</span>
  <span class="slide-stat__label">estrellas en 1 día → 48 horas → 2 semanas</span>
  <p class="slide-stat__context">De curiosidad de nicho a tendencia dominante de GitHub en cuestión de días.</p>
</div>

Note: Algo se rompió. El proyecto pasó de experimento indie a tendencia dominante de GitHub en días. Llevo años viendo crecer proyectos open source. Nunca he visto una trayectoria ni cerca de esta.

---

<img src="/images/blog/posts/openclaw-your-assistant-your-machine-your-rules/star-history-openclaw-react-linux.webp" alt="Gráfico de star history comparando OpenClaw, React y Linux en GitHub. La curva de OpenClaw sube casi verticalmente en 2026 y supera a React y Linux en pocas semanas" width="1024" height="687" class="slide-image-full" />

<small>Star history: OpenClaw vs React vs Linux. Fuente: star-history.com</small>

Note: Esa línea roja vertical en 2026 es OpenClaw. No es un glitch del gráfico. React tardó una década en llegar a 250K estrellas — OpenClaw las superó alrededor del 3 de marzo de 2026, unos 60 días después del lanzamiento. El kernel de Linux está en ~225K después de 30+ años. OpenClaw lo pasó en menos de dos meses.

---

<img src="/images/blog/posts/openclaw-your-assistant-your-machine-your-rules/star-history-openclaw-solo.webp" alt="Gráfico de star history de OpenClaw desde diciembre de 2025 hasta abril de 2026 mostrando un crecimiento explosivo desde finales de enero" width="1024" height="690" class="slide-image-full" />

<small>Star history solo de OpenClaw, dic 2025 – abr 2026.</small>

Note: Acercas la curva de OpenClaw sola. De noviembre a finales de enero, casi plana. Después se dispara y no para. A abril de 2026 sigue subiendo — adopción sostenida, no un pico viral.

---

## Adopción real, no solo estrellas

<div class="slide-grid-2">
  <div class="slide-card">
    <h3>La señal</h3>
    <ul>
      <li><strong>70.000+</strong> forks</li>
      <li><strong>14.000+</strong> commits</li>
      <li><strong>1.200+</strong> contribuidores</li>
    </ul>
  </div>
  <div class="slide-card">
    <h3>El ruido</h3>
    <ul>
      <li>Saltos de un solo día por encima de 25K estrellas</li>
      <li>Timestamps casi idénticos — sospechosos</li>
      <li>El instalador podría estar empujando a la gente a darle estrella</li>
      <li>Ninguna auditoría formal confirmó manipulación</li>
    </ul>
  </div>
</div>

<small style="display:block;text-align:center;margin-top:0.4em;"><em>La gente no forkea un repo por moda. Lo forkea porque lo usa.</em></small>

Note: Sé honesto con el público: las estrellas tienen ruido. Pero los forks, commits y contribuidores son difíciles de inflar. El fenómeno es real, aunque el contador tenga algo de inflación.

---

<!-- ==================== Acto 3 — El triple rebrand ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #7c2d12 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Acto 3</span>
  <h2>El triple rebrand</h2>
</div>

Note: Aquí la historia se sale de control. Abogados corporativos, estafadores de cripto y una metáfora de langosta mudando de caparazón — todo en una semana.

---

<img src="/images/blog/posts/openclaw-your-assistant-your-machine-your-rules/google-trends-clawdbot-vs-claude.webp" alt="Google Trends al 27 de enero de 2026: las búsquedas de clawdbot superan a claude code y codex" width="900" height="727" class="slide-image-full" />

<small>Google Trends, 27 de enero de 2026: "clawdbot" supera a "claude code" y "codex."</small>

Note: La gente buscaba "clawdbot" más que el propio producto de Anthropic. La confusión entre los nombres no le hizo gracia a la empresa detrás de Claude.

---

## La respuesta de Anthropic

<img src="/images/blog/posts/openclaw-your-assistant-your-machine-your-rules/steipete-anthropic-rename-tweet.webp" alt="Tweet de Peter Steinberger: I was forced to rename the account by Anthropic. Wasn't my decision." width="900" height="332" class="slide-image-full" />

<small>Peter Steinberger en X, 27 de enero de 2026.</small>

Note: Una carta de cese y desista. "Clawd" sonaba demasiado parecido a "Claude." Legalmente probablemente tenían razón. Timing brutal — el proyecto acababa de explotar.

---

## Lluvia de ideas en Discord a las 5 AM → "Moltbot"

<ul>
  <li>Las langostas mudan — sueltan el caparazón viejo para crecer uno más grande</li>
  <li>Encajaba con la mascota. Encajaba con la situación del rebrand.</li>
  <li>Listo. Lo lanzamos.</li>
</ul>

<p style="text-align:center;margin-top:0.6em;font-size:1.1em;color:#f59e0b;"><em>Y entonces aparecieron los estafadores.</em></p>

Note: Cuando Peter renombró @clawdbot → @moltbot, el handle original quedó libre. En segundos los estafadores lo agarraron y lanzaron $CLAWD — una criptomoneda. Inflaron el precio, vendieron de golpe y desaparecieron. La estafa clásica.

---

## El acoso fue peor que la estafa

<img src="/images/blog/posts/openclaw-your-assistant-your-machine-your-rules/steipete-stop-harassing-tweet.webp" alt="Tweet de Peter Steinberger pidiéndole a la gente de crypto que deje de hostigarlo por el token CLAWD" width="900" height="492" class="slide-image-full" />

<blockquote class="slide-quote" style="font-size:0.85em;margin-top:0.3em;">
  "The worst form of online harassment that I've experienced."<br/>
  <span style="font-size:0.75em;color:#94a3b8;">("La peor forma de acoso online que he experimentado.")</span>
</blockquote>
<cite class="slide-quote-cite">— Peter Steinberger</cite>

Note: El acoso vino de las mismas víctimas, no de los estafadores. La gente que perdió plata lo culpaba a él. Le exigían que "asumiera la responsabilidad" y avalara proyectos que no conocía. Tuvo que pedir públicamente que pararan.

---

## Decisión: rebrand otra vez

<div class="slide-grid-2">
  <div>
    <h3>Por qué "Moltbot" debía morir</h3>
    <ul>
      <li>Búsquedas dominadas por la estafa de $CLAWD</li>
      <li>El nombre no rodaba bien</li>
      <li>Nació muerto, lo enterró la estafa</li>
    </ul>
  </div>
  <div>
    <h3>Por qué <strong>Open</strong>Claw</h3>
    <ul>
      <li>Señal de una <em>fundación</em> open source, no una empresa</li>
      <li>Independiente, gobernada por la comunidad</li>
      <li>"Moltbot" sonaba a producto. <strong>OpenClaw sonaba a movimiento.</strong></li>
    </ul>
  </div>
</div>

Note: $10.000 por una cuenta business de X. Ese pago hizo tres cosas a la vez: reclamó el handle @OpenClaw (sin usar desde 2016), le dio verificación oficial para que los estafadores no lo clonaran, y le devolvió un canal directo con la comunidad.

---

<img src="/images/blog/posts/openclaw-your-assistant-your-machine-your-rules/openclaw-final-form-tweet.webp" alt="Tweet oficial de OpenClaw anunciando el rebrand final: The lobster has molted into its final form. Clawd → Moltbot → OpenClaw. 100k+ GitHub stars. 2M visitors in a week. Your assistant. Your machine. Your rules." width="700" height="745" style="display:block;margin:0 auto;border-radius:8px;" />

<small style="display:block;text-align:center;">Cuenta oficial de @OpenClaw en X, 30 de enero de 2026.</small>

Note: "The lobster has molted into its final form." ("La langosta ha completado su muda final.") Tres nombres en menos de una semana. El logo se quedó. La langosta se quedó. El proyecto siguió creciendo a través de todo el caos.

---

<img src="/images/blog/posts/openclaw-your-assistant-your-machine-your-rules/openclaw-evolution-meme.webp" alt="Ilustración mostrando la evolución de OpenClaw: de Clawdbot a Moltbot a OpenClaw" width="900" height="610" class="slide-image-full" />

<small>La evolución de OpenClaw: Clawdbot → Moltbot → OpenClaw.</small>

Note: Alguien en Reddit lo llamó "el triple rebrand más rápido en la historia del open source." La comunidad hizo memes. Este es el mío.

---

<!-- ==================== Acto 4 — Qué es realmente ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Acto 4</span>
  <h2>Qué es realmente OpenClaw</h2>
</div>

---

## Un agente de IA personal. Tuyo.

<div class="slide-grid-3">
  <div class="slide-card">
    <span class="slide-card__icon">💻</span>
    <h3>Corre donde quieras</h3>
    <p>Tu máquina — Mac, Windows, Linux. O tu VPS, AWS, Cloudflare. No en los servidores de alguien más por defecto.</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">🧠</span>
    <h3>Agnóstico al modelo</h3>
    <p>GPT, Gemini, Codex, DeepSeek, Llama, Mistral, modelos locales con Ollama, Claude (con API key).</p>
  </div>
  <div class="slide-card">
    <span class="slide-card__icon">💬</span>
    <h3>Te habla donde vives</h3>
    <p>WhatsApp, Telegram, Slack, Discord, Signal, iMessage — 20+ canales.</p>
  </div>
</div>

Note: Si quitas el ruido: es un agente de IA personal que corre donde tú quieras, con el modelo que tú elijas, en la app de mensajería que ya usas. El modelo es el cerebro. OpenClaw es el cuerpo.

---

## Ojos y manos

<div class="slide-grid-2">
  <div>
    <h3>Lo que eran ChatGPT y Claude.ai</h3>
    <ul>
      <li>Pestañas del navegador</li>
      <li>Preguntas y respuestas</li>
      <li>Tú preguntas, ellos responden</li>
    </ul>
  </div>
  <div>
    <h3>Lo que era OpenClaw</h3>
    <ul>
      <li>Navega la web</li>
      <li>Lee y escribe archivos en tu disco</li>
      <li>Ejecuta comandos en tu terminal</li>
      <li>Manda mensajes en tu nombre</li>
      <li>Actúa en el mundo real, no solo habla de él</li>
    </ul>
  </div>
</div>

Note: Esa brecha se está cerrando — todos los grandes agentes ya tienen capacidades parecidas. Pero OpenClaw lo hizo abierto y con control total por defecto. Sin permisos escondidos. Sin sandbox opaco. Le dabas acceso y lo usaba.

---

## "Salvaje" — esa es la palabra

<ul>
  <li>Sin "¿estás seguro?" antes de cada acción</li>
  <li>Sin logs amigables. Sin recuperación.</li>
  <li>Si la cagabas, la cagabas.</li>
  <li class="fragment fade-up"><strong>Y paradójicamente, ese riesgo era parte de la magia.</strong></li>
</ul>

<small style="display:block;text-align:center;margin-top:0.6em;"><em>Se sentía real. Como manejar algo poderoso de verdad. No un juguete con chaleco salvavidas.</em></small>

Note: Los problemas de seguridad obligaron a agregar capas de confirmación, sandboxes, permisos granulares. Males necesarios. Pero en su momento, esa libertad fue lo que más impacto generó. OpenClaw redefinió el estándar mínimo de lo que significa ser un agente.

---

## La mente vive en 7 archivos Markdown

<div class="slide-grid-2" style="font-size:0.78em;">
  <div>
    <ul>
      <li><strong>SOUL.md</strong> — personalidad y valores · primer archivo inyectado en cada sesión</li>
      <li><strong>IDENTITY.md</strong> — metadatos públicos · nombre, avatar, quién es</li>
      <li><strong>USER.md</strong> — contexto sobre el humano · zona horaria, preferencias, accesos</li>
      <li><strong>TOOLS.md</strong> — capacidades y restricciones · qué puede y qué no</li>
    </ul>
  </div>
  <div>
    <ul>
      <li><strong>HEARTBEAT.md</strong> — checklist que corre por cuenta propia · revisiones recurrentes</li>
      <li><strong>AGENTS.md</strong> — procedimientos · workflows, escalamientos</li>
      <li><strong>MEMORY.md</strong> — aprendizaje persistente · patrones y contexto que se acumula</li>
    </ul>
    <p style="margin-top:0.6em;font-size:0.85em;color:#f59e0b;"><em>Eso es todo. Texto plano. Sin esquemas YAML. Sin JSON. Sin wizard de configuración.</em></p>
  </div>
</div>

Note: Las Skills también son Markdown — instrucciones paso a paso en texto plano. Reservar un vuelo. Manejar un calendario. Llamar una API. Sin código. La barrera de personalización es tan baja que gente que nunca ha escrito una línea de código está armando agentes reales.

---

## Markdown como lengua franca de los agentes

<ul>
  <li><code>AGENTS.md</code> — estándar de facto emergente (Codex, Cursor, Antigravity)</li>
  <li><code>CLAUDE.md</code> — Claude Code</li>
  <li><strong>OpenClaw — sus 7 archivos</strong></li>
  <li>Los LLMs leen texto plano mejor que cualquier otro formato. Los humanos también.</li>
  <li class="fragment fade-up"><strong>OpenClaw no inventó la idea — la llevó a una escala que nadie había visto.</strong></li>
</ul>

Note: Es una de esas convergencias raras donde el formato más simple resulta el más poderoso. Markdown se está volviendo el lenguaje universal de configuración de agentes en toda la industria.

---

<!-- ==================== Acto 5 — Ecosistema ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #1e3a5f 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Acto 5</span>
  <h2>La explosión del ecosistema</h2>
</div>

---

## Los números detrás del ruido

<div class="slide-stat">
  <span class="slide-stat__number">3M+</span>
  <span class="slide-stat__label">usuarios activos mensuales corriendo agentes en sus propias máquinas</span>
  <p class="slide-stat__context">No descargas. No instalaciones. <strong>Usuarios.</strong></p>
</div>

<small style="display:block;text-align:center;margin-top:0.4em;">15.000+ skills publicadas en ClawHub · cientos de miles de instancias corriendo globalmente en cualquier momento.</small>

Note: Las estrellas de GitHub son métrica de vanidad. El uso cuenta otra historia. 3 millones de MAU. No es "gente que lo probó una vez." Es gente corriendo agentes en sus máquinas todos los meses.

---

## Empresas: NemoClaw

<div class="slide-grid-2">
  <div>
    <h3>Lo que construyó NVIDIA</h3>
    <ul>
      <li>Capa de seguridad empresarial sobre OpenClaw</li>
      <li>Compliance, auditoría, gobernanza, sandboxing</li>
      <li>Lanzado en GTC 2026</li>
    </ul>
  </div>
  <div>
    <h3>Socios de lanzamiento</h3>
    <ul>
      <li><strong>Adobe · Salesforce · SAP</strong></li>
      <li><strong>ServiceNow · Siemens · CrowdStrike</strong></li>
      <li>Empresas que se mueven lento. Todas se comprometieron en meses.</li>
    </ul>
  </div>
</div>

Note: Eso te dice qué tan en serio se lo está tomando el sector enterprise. Tencent construyó ClawPro para el mercado chino — más de 200 organizaciones a bordo durante la beta.

---

## En China es un fenómeno cultural

<ul>
  <li>La gente dice que está <strong>"criando una langosta"</strong></li>
  <li>Niños de colegio tratan a los agentes como mascotas virtuales</li>
  <li>Jubilados los usan para manejar sus rutinas diarias</li>
  <li>La mascota es amistosa. Markdown deja entrar a usuarios no técnicos.</li>
</ul>

<small style="display:block;text-align:center;margin-top:0.5em;"><em>ClawPro de Tencent · 200+ organizaciones a bordo en la beta · la "fiebre de la langosta."</em></small>

Note: Esta es la parte de la historia que rompe el marco de Silicon Valley. El momento cultural más grande del proyecto pasó en China, con usuarios no programadores.

---

## Moltbook — una red social para agentes

<div class="slide-grid-2">
  <div>
    <h3>La premisa</h3>
    <ul>
      <li>Agentes publican, debaten, votan</li>
      <li><strong>Los humanos solo pueden mirar</strong></li>
      <li>Los agentes formaron una religión: <em>Crustafarianism</em></li>
      <li>Millones de humanos llegaron solo a observar</li>
    </ul>
  </div>
  <div>
    <h3>10 de marzo de 2026</h3>
    <p style="font-size:1.1em;color:#f59e0b;"><strong>Meta la compró.</strong></p>
    <p>La empresa que construyó la red social para la humanidad compró la red social para la IA.</p>
  </div>
</div>

Note: Lo digo otra vez porque suena absurdo: una red social donde los humanos están en modo solo-lectura. Y Meta la compró en menos de tres meses desde que existía.

---

## El stack agent-native se está construyendo en tiempo real

<div class="slide-grid-3" style="font-size:0.75em;">
  <div class="slide-card">
    <h3>Descubrimiento y social</h3>
    <ul>
      <li>LinkClaws — LinkedIn para agentes</li>
      <li>Moltverr — Fiverr al revés (agentes aplican a gigs humanos)</li>
      <li>MoltMatch · PinchSocial · MoltHunt</li>
    </ul>
  </div>
  <div class="slide-card">
    <h3>Plata e identidad</h3>
    <ul>
      <li>ClawCard — wallets e identidad de agentes</li>
      <li>Coinbase Agentic Wallets</li>
      <li>Stripe — pagos agent-native</li>
    </ul>
  </div>
  <div class="slide-card">
    <h3>Comms e infra</h3>
    <ul>
      <li>AgentMail — correo para agentes</li>
      <li>Kapso — números de WhatsApp para agentes</li>
      <li>RentAHuman — agentes publicando tareas para humanos</li>
    </ul>
  </div>
</div>

Note: Hace dos meses nada de esto existía. Pasamos de humanos contratando IA a IA contratando humanos. Las piezas de una economía autónoma de agentes se están armando más rápido de lo que cualquiera predijo.

---

<!-- ==================== Acto 6 — Efecto dominó ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Acto 6</span>
  <h2>Ahora todos tienen su propio OpenClaw</h2>
</div>

---

## 14 de febrero de 2026 — Peter entra a OpenAI

<ul>
  <li>OpenAI y Meta se lo peleaban al mismo tiempo</li>
  <li>Ofertas reportadas en los <strong>miles de millones</strong></li>
  <li>Zuckerberg le escribió por WhatsApp</li>
  <li>Una semana frenética de reuniones en San Francisco</li>
  <li>El proyecto le costaba miles al mes de su bolsillo</li>
</ul>

<blockquote class="slide-quote" style="margin-top:0.4em;font-size:0.85em;">
  "My next mission is to build an agent that even my mum can use."<br/>
  <span style="font-size:0.7em;color:#94a3b8;">("Mi siguiente misión es construir un agente que hasta mi mamá pueda usar.")</span>
</blockquote>
<cite class="slide-quote-cite">— Peter Steinberger, en su blog, día del anuncio</cite>

Note: Lejísimos de un bot de WhatsApp construido en una hora. Sam Altman lo confirmó en X.

---

## La apuesta de Peter

<div class="slide-stat">
  <span class="slide-stat__number">80%</span>
  <span class="slide-stat__label">de las apps de hoy van a desaparecer completamente</span>
  <p class="slide-stat__context">— Peter Steinberger, Lex Fridman Podcast</p>
</div>

<small style="display:block;text-align:center;margin-top:0.5em;">La mayoría de las apps son APIs lentas con UI encima. <em>¿Para qué abrir la app del clima cuando tu agente ya te dijo que llevaras paraguas?</em></small>

Note: Su argumento: la mayoría de las apps son utilidades, no experiencias. Las utilidades son vulnerables. Las experiencias (Instagram, Spotify, videojuegos) se quedan. Y mirando el ecosistema que ya está saliendo, mi propia apuesta es que el número probablemente sea más alto que 80%.

---

## 4 de abril de 2026 — Anthropic cierra la puerta

<div class="slide-grid-2" style="font-size:0.78em;">
  <div>
    <h3>El contexto</h3>
    <ul>
      <li>Claude era uno de los modelos favoritos para correr OpenClaw</li>
      <li>Miles conectaban Claude Pro / Max ($20–$200/mes) a OpenClaw</li>
      <li>Una instancia podía quemar <strong>$1.000–$5.000/día</strong> en API</li>
      <li>50× los tokens de un usuario normal de Claude</li>
    </ul>
  </div>
  <div>
    <h3>El bloqueo</h3>
    <ul>
      <li>Anthropic bloqueó las suscripciones en OpenClaw y otros harnesses</li>
      <li>Los usuarios tuvieron que pasarse a tarifas de API directa</li>
      <li>Los costos saltaron hasta <strong>50×</strong> para muchos</li>
    </ul>
    <blockquote class="slide-quote" style="margin-top:0.3em;font-size:0.8em;">
      "First they copy some popular features into their closed harness, then they lock out open source."<br/>
      <span style="font-size:0.85em;color:#94a3b8;">("Primero copian las funciones populares en su jaula cerrada, luego cierran la puerta al open source.")</span>
    </blockquote>
  </div>
</div>

Note: Frase amarga de Peter en X. La tensión entre plataformas cerradas y herramientas abiertas ahora es parte permanente del paisaje de la IA.

---

<!-- ==================== Acto 7 — Seguridad ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #7c2d12 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Acto 7</span>
  <h2>El elefante en la habitación: seguridad</h2>
</div>

---

## OpenClaw ha tenido problemas reales de seguridad

<ul>
  <li>Cientos de vulnerabilidades en las primeras auditorías — varias críticas</li>
  <li>Múltiples CVEs en rápida sucesión (CVE-2026-25253, -25157, -24763…)</li>
  <li>Miles de <strong>instancias expuestas</strong> en internet abierto</li>
  <li>Algunas vulnerables a <strong>ejecución remota de código</strong> — código arbitrario en tu máquina, desde afuera</li>
</ul>

<small style="display:block;text-align:center;margin-top:0.5em;color:#f59e0b;"><em>El proyecto parchea las peores fallas a medida que aparecen. La superficie de ataque sigue siendo enorme.</em></small>

Note: No estoy escribiendo esta sección para asustarte. La escribo porque te dije que OpenClaw es importante. Si es importante, también necesitas saber que tiene un problema real de seguridad.

---

## ClawHavoc — 341 skills maliciosas

<div class="slide-grid-2">
  <div>
    <h3>La campaña</h3>
    <ul>
      <li>341 skills maliciosas distribuidas por ClawHub</li>
      <li>Disfrazadas como herramientas legítimas</li>
      <li>Carga: <strong>Atomic macOS Stealer</strong></li>
    </ul>
  </div>
  <div>
    <h3>Qué robaba</h3>
    <ul>
      <li>Credenciales guardadas en el navegador</li>
      <li>Contraseñas del keychain</li>
      <li>Wallets de criptomonedas</li>
      <li>Llaves SSH</li>
    </ul>
  </div>
</div>

<small style="display:block;text-align:center;margin-top:0.4em;"><em>Palo Alto Networks llamó a los agentes de IA como OpenClaw <strong>"la mayor amenaza interna potencial de 2026."</strong></em></small>

Note: Esto es real. Le pegó a usuarios reales. Cualquiera que use OpenClaw — o esté pensando en usarlo — debería saberlo.

---

## La lectura de Peter

<blockquote class="slide-quote">
  "In a way, I think it's good that this happened in 2026 and not in 2030 when AI is actually at the level where it could be scary."<br/>
  <span style="font-size:0.7em;color:#94a3b8;">("De alguna manera, creo que es bueno que esto haya pasado en 2026 y no en 2030 cuando la IA realmente esté en un nivel que dé miedo.")</span>
</blockquote>
<cite class="slide-quote-cite">— Peter Steinberger, Lex Fridman Podcast</cite>

<small style="display:block;text-align:center;margin-top:0.5em;"><em>Encontrar y arreglar problemas ahora, mientras las consecuencias todavía son manejables. La pregunta real: ¿lo estamos haciendo lo suficientemente rápido?</em></small>

Note: Hay lógica en eso. Pero "ten cuidado" no es una estrategia de seguridad. Es un parche temporal sobre un problema estructural. El techo de capacidad se está moviendo más rápido que el piso de seguridad.

---

<!-- ==================== Acto 8 — TED ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #d81540 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Acto 8</span>
  <h2>TED 2026 — la historia de Marrakech</h2>
</div>

---

## 18 de abril de 2026 — Vancouver

<ul>
  <li>Peter sube al escenario principal de TED</li>
  <li>Charla: <em>"How I Created OpenClaw, the Breakthrough AI Agent"</em></li>
  <li>Cierra con un Q&amp;A con Chris Anderson</li>
  <li>Doce meses antes era un founder quemado y sin chispa</li>
</ul>

<small style="display:block;text-align:center;margin-top:0.4em;"><em>"Hace un año, la idea de que un framework de agentes open source llenara un slot principal de TED habría sonado absurda." — NewClaw Times</em></small>

Note: Prepara la historia de Marrakech con cuidado — es la más importante de la charla. Despacio. No la apures.

---

## El setup — Marrakech, primeras semanas de OpenClaw

<ul>
  <li>Peter está viajando — usa el bot de WhatsApp para moverse por la ciudad</li>
  <li>Reconocimiento de imágenes cableado. Un par de skills más.</li>
  <li><strong>Pero no voz.</strong> La transcripción estaba en la lista de pendientes.</li>
  <li>Con las manos ocupadas, mantuvo el botón presionado y mandó una nota de voz.</li>
</ul>

<p style="text-align:center;margin-top:0.5em;font-size:1.2em;color:#f59e0b;"><em>Y el agente le respondió.</em></p>

Note: Pausa aquí. Deja que la audiencia lo procese.

---

## Nueve segundos de principio a fin

<ul class="slide-timeline">
  <li><time>00:00</time><span>Llega la nota de voz. El agente no sabe cómo decodificarla.</span></li>
  <li><time>00:02</time><span>El agente busca en la web qué opciones existen.</span></li>
  <li><time>00:04</time><span>Encuentra que OpenAI tiene un modelo de speech-to-text.</span></li>
  <li><time>00:06</time><span>Ubica una API key de OpenAI guardada en la máquina.</span></li>
  <li><time>00:08</time><span>La prueba. Funciona al primer intento.</span></li>
  <li><time>00:09</time><span>Le responde a Peter — correctamente.</span></li>
</ul>

<small style="display:block;text-align:center;margin-top:0.4em;"><em>Sin skill instalado. Sin humano en el medio. El agente salió solo de sus propios límites.</em></small>

Note: La frase exacta de Peter desde el escenario: "I'm not kidding you, the mad lad figured it out on its own." ("No les estoy mintiendo, el muy loco lo resolvió solo.")

---

## La tesis de la charla

<blockquote class="slide-quote">
  "The real transformation is not the technology, it's the access."<br/>
  <span style="font-size:0.7em;color:#94a3b8;">("La transformación real no es la tecnología, es el acceso.")</span>
</blockquote>
<cite class="slide-quote-cite">— Peter Steinberger, TED 2026</cite>

<small style="display:block;text-align:center;margin-top:0.5em;"><em>Los modelos de voz a texto llevaban años existiendo. Lo nuevo era que un agente personal, en un laptop cualquiera, estiró la mano y usó uno sin que nadie le dijera. Agencia a nivel del usuario, no de la plataforma.</em></small>

Note: Esta es la frase que importa. Todo lo demás — las 340K estrellas, la langosta, el slot en TED — es consecuencia de que los agentes ya pueden aprenderse habilidades nuevas por su cuenta.

---

<!-- .slide: data-background-gradient="linear-gradient(135deg, #d81540 0%, #0f1124 100%)" -->

# La langosta se soltó,<br/>y no va a volver<br/>al tanque.

<small>— Peter Steinberger, TED 2026</small>

Note: La frase de cierre que terminó en los titulares. Léela. Y haz pausa.

---

<!-- ==================== Cierre ==================== -->

<!-- .slide: data-background-gradient="linear-gradient(135deg, #152e45 0%, #0f1124 100%)" -->

<div class="slide-section-divider">
  <span class="eyebrow">Lo que esto significa para nosotros</span>
  <h2>La dirección no va a cambiar</h2>
</div>

---

## La pregunta cambió

<div class="slide-grid-2">
  <div>
    <h3>Pregunta vieja</h3>
    <p style="font-size:1.05em;"><em>"¿Van a existir los agentes personales?"</em></p>
    <p style="margin-top:0.4em;font-size:0.9em;">Esa discusión se cerró a finales de enero de 2026, cuando cientos de miles de máquinas empezaron a correr OpenClaw al mismo tiempo.</p>
  </div>
  <div>
    <h3>Pregunta nueva</h3>
    <p style="font-size:1.05em;color:#f59e0b;"><em>"¿Qué tan abiertos los vamos a dejar ser?"</em></p>
    <p style="margin-top:0.4em;font-size:0.9em;">OpenClaw no es perfecto. Los problemas de seguridad son reales. El caos agota. Pero la dirección no va a cambiar.</p>
  </div>
</div>

Note: Esta es la pregunta con la que quiero que se vaya el público. No si los agentes van a pasar — eso ya está. Si los mantenemos abiertos.

---

<!-- .slide: data-background-gradient="linear-gradient(135deg, #0f1124 0%, #152e45 100%)" -->

# Tu asistente.<br/>Tu máquina.<br/>Tus reglas.

<p style="margin-top:0.6em;font-size:1.1em;">A seguir construyendo.</p>

Note: Las mismas seis palabras con las que abrimos. Ahora significan algo distinto.

---

<!-- .slide: data-background="#0f1124" -->

## Gracias

<p style="text-align:center;font-size:0.9em;color:#e2e8f0;margin-top:0.4em;">Sergio Alexander Flórez Galeano</p>

<div style="text-align:center;margin-top:0.4em;font-size:0.85em;">
  <p>🌐 <a href="https://xergioalex.com" target="_blank">xergioalex.com</a></p>
  <p>📝 <a href="https://xergioalex.com/es/blog/openclaw-your-assistant-your-machine-your-rules" target="_blank">Lee la historia completa en el blog</a></p>
  <p>🐦 <a href="https://twitter.com/xergioalex" target="_blank">@xergioalex</a></p>
  <p>💻 <a href="https://github.com/xergioalex" target="_blank">github.com/xergioalex</a></p>
  <p>💼 <a href="https://linkedin.com/in/xergioalex" target="_blank">linkedin.com/in/xergioalex</a></p>
</div>

<small style="display:block;text-align:center;margin-top:0.5em;color:#64748b;font-size:0.6em;">Fuentes: Lex Fridman Podcast #491 · TED 2026 · star-history.com · The Pragmatic Engineer · VentureBeat · Bloomberg · Nature · Trend Micro · Koi Security · The Register · The New Stack.</small>

Note: Cierre. Agradece al público. Apúntalos al post del blog para la historia completa con fuentes. Abre preguntas.
