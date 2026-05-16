---
title: "La IA está acelerando los ataques a la cadena de suministro del open source: por qué me pasé de npm a pnpm en 2026"
description: "En 18 meses, npm, PyPI, RubyGems, Maven y Crates han distribuido malware. La IA lo está acelerando. Esta es la ola — y lo que cambié en mi CI para defenderme de la próxima."
pubDate: 2026-05-19T10:00:00Z
tags: ["tech", "devops", "ai", "javascript"]
keywords: ["ataque cadena de suministro 2026", "qué es minimumReleaseAge pnpm", "gusano Shai-Hulud npm", "CVE-2025-30066 tj-actions", "slopsquatting paquetes alucinados", "compromiso axios npm 2026", "Bitwarden CLI malicioso", "postmortem TanStack npm", "PyPI Trusted Publishing", "seguridad open source 2026"]
heroImage: "/images/blog/posts/supply-chain-attacks-ai-era/hero.webp"
heroLayout: banner
draft: false
---

El fin de semana pasado reescribí cómo este sitio instala paquetes de JavaScript. El diff fue pequeño — unos noventa archivos, casi todos sustituciones de texto en scripts y docs, [un solo PR](https://github.com/xergioalex/xergioalex.com/pull/131). Pero la razón por la que lo hice no es pequeña.

Hace ocho días, los [paquetes `@tanstack/*` fueron comprometidos](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem) — 42 paquetes, 84 versiones maliciosas, publicadas dentro de una ventana de seis minutos. La cadena de ataque terminó con el adversario leyendo el token OIDC desde la memoria del proceso Runner.Worker dentro de los propios GitHub Actions de TanStack, y usándolo para publicar directamente en npm como si fuera el maintainer. OpenAI [confirmó después](https://openai.com/index/our-response-to-the-tanstack-npm-supply-chain-attack/) que algunas máquinas de desarrollo de sus empleados fueron comprometidas a través de este ataque. Unas semanas antes, [el CLI de Bitwarden en npm](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/) fue secuestrado por unos noventa minutos. El payload malicioso escaneaba la máquina víctima buscando asistentes de IA para programar — Claude, Cursor, entre otros — e intentaba inyectarles ganchos de prompt persistentes.

No soy paranoico. Estoy haciendo la cuenta.

Este post es un recorrido por la ola que golpeó al ecosistema open source en 2025 y 2026, una mirada honesta a cómo la IA la está acelerando, y las cosas muy específicas que cambié en mi propio setup para volverme un blanco menos cómodo. No creo que ninguna de estas defensas sea heroica. Son la nueva línea base.

---

## La ola no es solo de npm

Los titulares se concentran en npm porque es el registro con el mayor radio de impacto — un solo paquete popular puede tener cientos de millones de descargas semanales. Pero el mismo libreto viene corriendo en todos los registros públicos importantes.

### npm — los incidentes que hicieron ruido

**Shai-Hulud (septiembre de 2025).** El primer gusano auto-replicante real en la historia de npm. [El investigador de Aikido Charlie Eriksen y StepSecurity lo destaparon](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised) el 14 y 15 de septiembre. El caso índice fue `@ctrl/tinycolor@4.1.1`. Una vez que un maintainer corría `npm install` con una versión comprometida, el gusano ejecutaba [TruffleHog](https://github.com/trufflesecurity/trufflehog) dentro de su máquina, cosechaba cualquier AWS key, PAT de GitHub o token de npm que encontrara, y luego usaba el token robado de npm para auto-publicarse en hasta veinte paquetes más del mismo maintainer. [CISA emitió una alerta](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem) el 23 de septiembre. El conteo de paquetes creció a finales de septiembre desde "180+" hasta "500+" según la fecha de corte. Una [segunda ola dos meses después](https://unit42.paloaltonetworks.com/npm-supply-chain-attack/), bautizada *"Sha1-Hulud: The Second Coming"* ("Sha1-Hulud: La segunda venida") en las descripciones que el atacante usaba para exfiltrar, traía un payload destructivo de respaldo: si no podía exfiltrar limpio, hacía `rm -rf` del directorio personal de la víctima.

**El secuestro real de axios (marzo de 2026).** No un typosquat — el paquete real `axios` en npm, con [más de 100 millones de descargas semanales y 174.000 dependientes](https://thehackernews.com/2026/03/axios-supply-chain-attack-pushes-cross.html). El 31 de marzo, el maintainer `jasonsaayman` publicó `axios@1.14.1` y `axios@0.30.4` con 39 minutos de diferencia — y cualquier proyecto con un caret `^1.x` o `^0.x` se las llevaba en el siguiente install. Las versiones maliciosas dependían de un typosquat pre-fabricado llamado `plain-crypto-js` que descargaba y ejecutaba un RAT multiplataforma en el momento del install. [El postmortem de Socket](https://socket.dev/blog/axios-npm-package-compromised) vale la pena leerlo completo. La causa raíz fue un token de npm de larga duración coexistiendo con Trusted Publishing — exactamente el tipo de credencial legacy que la mayoría de maintainers todavía tiene por ahí olvidada.

**Bitwarden CLI (abril de 2026).** `@bitwarden/cli@2026.4.0` estuvo vivo unos noventa minutos el 22 de abril. [SecurityWeek](https://www.securityweek.com/bitwarden-npm-package-hit-in-supply-chain-attack/) cubrió la divulgación; el [análisis del payload de Palo Alto](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/) es la parte que me sigue dando vueltas en la cabeza. El acceso inicial no fue un maintainer comprometido — fue [una GitHub Action comprometida dentro del propio pipeline CI/CD de Bitwarden](https://www.endorlabs.com/learn/shai-hulud-the-third-coming----inside-the-bitwarden-cli-2026-4-0-supply-chain-attack), inyectada en el paso de empaquetado para npm. El payload, una vez en la máquina del desarrollador, buscaba asistentes de IA para programar instalados e intentaba inyectarles ganchos persistentes. Las bóvedas de usuarios finales no fueron tocadas ([comunicado oficial de Bitwarden](https://community.bitwarden.com/t/bitwarden-statement-on-checkmarx-supply-chain-incident/96127)). Pero el targeting te dice exactamente dónde piensan los atacantes que está el próximo punto de apalancamiento grande.

**TanStack (11 de mayo de 2026).** Hace ocho días al momento de escribir esto. El [postmortem de TanStack](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem) recorre tres vulnerabilidades encadenadas en GitHub Actions: un workflow con `pull_request_target` que ejecutaba código controlado por un fork, una caché de pnpm envenenada que sobrevivió a merges de PRs no relacionados, y un binario que leía `/proc/*/cmdline` para encontrar el proceso Runner.Worker y extraer el token OIDC de su memoria. El token fue derecho a npm publish. La detección tomó entre 20 y 26 minutos después de la primera publicación maliciosa; las 84 versiones fueron deprecadas en una hora y 43 minutos. Respuesta rápida. Y aun así, muy grave.

### PyPI — el mismo libreto, menos titulares

**ultralytics (diciembre de 2024).** La librería YOLO, unas 60 millones de descargas en PyPI. Las versiones `8.3.41`, `8.3.42`, `8.3.45` y `8.3.46` distribuyeron un cryptominer. [ReversingLabs rastreó la causa raíz](https://www.reversinglabs.com/blog/compromised-ultralytics-pypi-package-delivers-crypto-coinminer) a una vulnerabilidad de inyección de scripts en GitHub Actions dentro de `ultralytics/actions` que permitió a un PR malicioso manipular el build *después* del code review, más un token de PyPI robado y reutilizado dos días después. Es la misma plantilla de TTP que vas a ver repetida en 2025: manipulación post-review del CI vía un workflow que corre antes del merge.

**JarkaStealer (divulgado en noviembre de 2024).** [Kaspersky encontró paquetes](https://www.kaspersky.com/blog/jarkastealer-in-pypi-packages/52640/) haciéndose pasar por wrappers de ChatGPT y Claude — `gptplus`, `claudeai-eng` — que llevaban más de un año activos. ~1.700 descargas, 30+ países. La carnada es la propia categoría de tooling de IA; si eres un desarrollador con afán por meterle un LLM a tu proyecto, eres un instalador menos cuidadoso de lo usual.

**La ola alineada con la RPDC.** [Sonatype bloqueó 234 paquetes maliciosos de npm y PyPI](https://thehackernews.com/2026/02/lazarus-campaign-plants-malicious.html) atribuidos al Lazarus Group de Corea del Norte entre enero y julio de 2025, distribuidos vía señuelos de reclutadores falsos en LinkedIn dirigidos a desarrolladores Web3. Cross-ecosistema, alineada con un Estado, persistente.

### RubyGems, Crates, Maven, Docker Hub

A **RubyGems** lo pegaron dos veces que vale la pena mencionar. [Las gemas Fastlane-Telegram proxy en mayo de 2025](https://socket.dev/blog/malicious-ruby-gems-exfiltrate-telegram-tokens-and-messages-following-vietnam-ban) — publicadas días después del bloqueo nacional de Telegram en Vietnam, imitando plugins legítimos de Fastlane y exfiltrando tokens de bots. Y una [campaña de 60 gemas surcoreanas entre 2023 y 2025](https://thehackernews.com/2026/05/poisoned-ruby-gems-and-go-modules.html) imitando automatización de Instagram, X, TikTok y WordPress, sumando alrededor de 275.000 descargas. Las gemas incluso entregaban la funcionalidad anunciada — solo que además te robaban las credenciales. Este mes (mayo de 2026), [Ruby Central suspendió el registro de nuevas cuentas](https://thehackernews.com/2026/05/rubygems-suspends-new-signups-after.html) después de que cientos de paquetes maliciosos fueran subidos en una ventana corta.

**Crates.io** es el más tranquilo de los registros grandes, pero no está vacío. [`faster_log` y `async_println`](https://blog.rust-lang.org/2025/09/24/crates.io-malicious-crates-fasterlog-and-asyncprintln/) (mayo–septiembre de 2025) fueron typosquats de `fast_log` que escaneaban los archivos del proyecto buscando llaves privadas de Solana y Ethereum en tiempo de ejecución. Cerca de 8.400 descargas combinadas antes de que crates.io desactivara las cuentas.

**Maven Central** quedó arrastrado por la estela de Shai-Hulud. [La segunda ola del gusano alcanzó Maven el 25 de noviembre de 2025](https://thehackernews.com/2025/11/shai-hulud-v2-campaign-spreads-from-npm.html) a través de artefactos espejados del proyecto PostHog. Maven Central purgó los mirrors comprometidos esa misma noche.

**Docker Hub.** [El repositorio `checkmarx/kics` de Checkmarx fue secuestrado](https://www.cxodigitalpulse.com/malicious-docker-images-and-vs-code-extensions-compromise-checkmarx-supply-chain/) en 2024 — tags legítimos `v2.1.20` y `alpine` reemplazados por versiones que exfiltraban credenciales. Y a agosto de 2025, [BleepingComputer documentó más de 35 imágenes Linux en Docker Hub que todavía distribuían el backdoor de XZ (CVE-2024-3094)](https://www.bleepingcomputer.com/news/security/docker-hub-still-hosts-dozens-of-linux-images-with-the-xz-backdoor/), más de un año después de su divulgación, y algunas servían como imagen base para otras imágenes publicadas.

### GitHub Actions mismo

El marketplace fue comprometido dos veces en la misma semana de marzo de 2025, y el segundo es el que importa.

[`reviewdog/action-setup@v1`](https://www.wiz.io/blog/new-github-action-supply-chain-attack-reviewdog-action-setup) fue manipulado el 11 de marzo, entre 18:42 y 20:31 UTC. La action dumpeaba la memoria del proceso Runner.Worker — es decir, los secrets de GitHub Actions — directo a los logs del workflow. CISA la sumó a su [catálogo de vulnerabilidades explotadas conocidas](https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction) el 24 de marzo. Cerca de 1.500 repos fueron afectados directamente. Los investigadores creen que este fue el vector de entrada para el ataque más grande cuatro días después: [`tj-actions/changed-files`, CVE-2025-30066](https://github.com/advisories/GHSA-mrrh-fwg8-r2c3). Cada tag publicado de `tj-actions/changed-files` — todos, hasta v45.0.7 inclusive — fue re-apuntado retroactivamente a un commit malicioso entre el 12 y el 15 de marzo. El payload era un script de Python que leía la memoria del runner e imprimía los secrets al log del workflow como un blob de doble base64. En repositorios públicos con logs públicos, esos secrets quedaron al alcance de cualquiera. La action era usada por [más de 23.000 repositorios](https://thehackernews.com/2025/03/github-action-compromise-puts-cicd.html) — aunque [Wiz observó solo "decenas"](https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066) que efectivamente filtraron secrets en logs públicos, así que el "23.000" es exposición, no brecha. Aun así, el mayor compromiso de una sola action hasta ahora.

Se nota el patrón. El ataque a nivel de registro y el ataque a nivel de CI están convergiendo. Las credenciales de los maintainers son robadas; los runners de CI son cooptados; el payload corre en máquinas de desarrolladores y dentro del CI; el botín son más credenciales.

---

## Dónde la IA realmente está acelerando esto

Quiero ser cuidadoso acá porque la mitad de lo que se escribe sobre *"IA en ataques de supply chain"* es exagerado y sin fuentes. Tres cosas están verificadas y son concretas.

### Slopsquatting

Lo primero es en el lado de la oferta. En un [paper de USENIX Security 2025](https://www.usenix.org/system/files/conference/usenixsecurity25/sec25cycle1-prepub-742-spracklen.pdf) (con preprint en [arXiv:2406.10279](https://arxiv.org/abs/2406.10279)), Spracklen y otros evaluaron 16 LLMs sobre 576.000 muestras de código generadas en Python y JavaScript. Los números titulares: los modelos comerciales alucinan nombres de paquetes inexistentes en alrededor del 5,2% de las sugerencias, los modelos open-source en alrededor del 21,7%. A lo largo del test set, los autores registraron 205.474 nombres únicos de paquetes alucinados. Esos nombres no son typos aleatorios — son plausibles, semánticamente coherentes, y tienden a *repetirse* entre queries distintas.

[Seth Larson, de la Python Software Foundation, acuñó el término **slopsquatting**](https://en.wikipedia.org/wiki/Slopsquatting) en abril de 2025 para el siguiente paso obvio: un atacante observa qué paquetes alucinan los LLMs, registra esos nombres en el registro real, y espera a que un desarrollador pegue la sugerencia del LLM en su terminal. Bar Lanyado, en Lasso Security, [lo demostró en 2023](https://www.aikido.dev/blog/slopsquatting-ai-package-hallucination-attacks) registrando un paquete de Python llamado `huggingface-cli` — un nombre que los LLMs no paraban de alucinar — y viendo cómo le caían 30.000+ descargas en tres meses. El propio README de Alibaba pegó el comando de instalación.

Entonces el atacante ya no necesita saber qué nombre typosquatear. El LLM se lo dice.

### Payloads que apuntan a la IA

Lo segundo es en el lado del payload. El compromiso del CLI de Bitwarden es el ejemplo más limpio: [el código malicioso específicamente buscaba instalaciones de Claude y Cursor](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/) e intentaba inyectarles ganchos de prompt persistentes. La lógica es obvia — si puedes envenenar el asistente de IA de un desarrollador, cada línea de código que esa persona escriba durante los próximos meses queda bajo sospecha.

En abril de 2026, Socket reveló [SANDWORM_MODE](https://socket.dev/blog/sandworm-mode-npm-worm-ai-toolchain-poisoning), un gusano de npm de la familia Shai-Hulud que llama a una instancia local de Ollama para *re-ofuscarse polimórficamente entre víctimas* — renombrado de variables, reescritura del control flow, inserción de código señuelo. La detección basada en firmas la pasa mal con código que cambia en cada salto. El mismo gusano cosecha API keys de nueve proveedores de LLM — OpenAI, Anthropic, Google, Groq, Together, Fireworks, Replicate, Mistral, Cohere — porque en 2026, una API key de LLM vale tanto como una AWS key.

### Lo que *no* estoy afirmando

No he visto un reporte de fuente primaria que cuantifique *"X% de los correos de phishing en las campañas de npm de 2025 fueron escritos por LLM."* Es un consenso de la industria, respaldado por la investigación general sobre phishing, pero no tengo un número específico para npm. Lo mismo con typosquats generados por IA a escala — el paper de Spracklen prueba el lado de la *oferta*; la medición del lado de la demanda todavía no está publicada.

Honestamente, no creo que las piezas verificadas necesiten una versión exagerada. Slopsquatting más payloads que apuntan a la IA más gusanos polimórficos más API keys de LLM robadas ya forman un sistema coherente. El atacante usa IA para encontrar nombres, IA para ofuscar código, tooling de IA en la máquina víctima para expandir el radio de impacto, y credenciales de IA robadas para financiar la siguiente ronda. Hace cinco años ninguno de esos vectores existía.

---

## Lo que hice al respecto

La nueva línea base no es heroica. Casi todos estos son cambios de una línea — lo difícil es hacerlos todos, no solo uno.

### Pinear el package manager vía Corepack

```json
{
  "packageManager": "pnpm@11.1.2"
}
```

[Corepack](https://nodejs.org/api/corepack.html) es el shim manager que viene con Node. Lee `"packageManager"` desde `package.json` y provisiona exactamente esa versión. Cada máquina — laptop, runner de CI, imagen de Docker — recibe el mismo pnpm. Nada de `npm install -g pnpm` en ninguna parte, porque instalar globalmente la herramienta que intentas pinear le quita el sentido al pin.

### Forzar una demora entre publicación e instalación

Esta fue la que arrancó toda la migración. [pnpm 10.16](https://pnpm.io/blog/releases/10.16) (lanzado en septiembre de 2025) agregó una configuración llamada `minimumReleaseAge`:

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 10080  # 7 días, en minutos
```

Rechaza instalar versiones de paquetes más jóvenes que la edad especificada. La mayoría de los paquetes comprometidos arriba estuvieron vivos menos de dos horas antes de ser retirados. Una demora de siete días significa que *la única forma de que yo instale una versión comprometida es que sobreviva siete días sin que nadie la note*. Es una barra mucho más alta que cero días. Desde [pnpm 11](https://pnpm.io/blog/releases/11.0), el default ya es de 24 horas; yo lo subí a una semana porque no estoy en un producto sensible a hotfixes.

Hay una válvula de escape — `minimumReleaseAgeExclude` te deja saltarte la demora para paquetes donde sí quieres hotfixes (los paquetes de tu propia organización, por ejemplo). Yo no tengo exclusiones por ahora. npm en sí no tiene una funcionalidad equivalente hoy.

### Allow-list de scripts de build

Desde pnpm 10, los scripts `postinstall` están bloqueados por defecto. Tú declaras explícitamente los paquetes que sí los necesitan legítimamente:

```yaml
# pnpm-workspace.yaml
allowBuilds:
  esbuild: true
  sharp: true
  "@biomejs/biome": true
  "@parcel/watcher": true
  unrs-resolver: true
```

Esa es la allow-list corta que este sitio necesita. Cinco entradas, todas conocidas y auditadas. Todo lo demás — y *"todo lo demás"* incluye cualquier paquete recién comprometido que traiga un `postinstall` malicioso — queda silenciosamente denegado. Shai-Hulud, axios, Bitwarden CLI y TanStack todos dependieron de ejecución vía `postinstall` o `preinstall`. Solo esta configuración neutraliza a la mayoría de ellos.

### Reemplazar `npm` dentro del dev container

Esta es con la que más paranoico estoy. Los asistentes de IA y los scripts viejos van a correr `npm install` por memoria muscular sin importar lo que diga `package.json`. Así que dentro de mi dev container el binario `npm` ya no es npm:

```dockerfile
RUN rm -f /usr/local/bin/npm && \
    printf '#!/bin/bash\necho "[npm→pnpm] Redirecting \"npm $*\" to pnpm." >&2\nexec corepack pnpm "$@"\n' \
    > /usr/local/bin/npm && \
    chmod +x /usr/local/bin/npm
```

Si cualquier cosa dentro del contenedor corre `npm install`, imprime una advertencia de redirección y enruta por pnpm — lo que significa que pasa por el filtro de `minimumReleaseAge`, por el lockfile, y por las reglas de `allowBuilds`. No me confío de mí mismo, de mis asistentes de IA, ni de ningún tutorial que vaya a pegar en esta terminal para acordarme de tipear `pnpm`.

### Hacer que el CI sea hostil a los atajos legacy de npm

En GitHub Actions, el workflow viejo usaba `npm install` más un install con `--no-save` de binarios nativos específicos de plataforma para esquivar la resolución de optional-deps rota de npm. Ese paso `--no-save` se saltaba el lockfile por completo — exactamente el tipo de *"ya lo arreglamos en CI"* que deja que binarios nativos comprometidos lleguen a producción sin aparecer en code review. El workflow nuevo es una línea:

```yaml
- run: corepack pnpm install --frozen-lockfile
```

`--frozen-lockfile` falla el build si `package.json` y `pnpm-lock.yaml` no concuerdan. La caché del CI usa como clave la ruta del store de pnpm (`corepack pnpm store path`) y `pnpm-lock.yaml`, no `node_modules`.

### Desacoplar el bump de versión de los efectos colaterales de git

`npm version patch -m "..."` acopla tres cosas — bump, commit, tag — y las corre en un orden que no se lleva bien con proyectos en workspace ni con scripts de release en CI. El reemplazo las separa:

```bash
corepack pnpm version patch --no-git-tag-version
git add package.json pnpm-lock.yaml
git commit -m "release v${VERSION}"
git tag -a "v${VERSION}" -m "v${VERSION}"
```

Cosita pequeña, pero los commits implícitos de `npm version` eran el tipo de magia de fondo que hace difícil depurar un script de release después de una falla parcial. Mejor hacer cada paso explícito.

---

## Lo que *no* hice (todavía)

Algunas cosas que consideré y aún no he aterrizado, para ser honesto:

- **Attestations de Sigstore en mis propias publicaciones.** Este sitio no publica a npm, así que no aplica. Pero para cualquier paquete que sí publique, [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) más [provenance attestations](https://docs.npmjs.com/generating-provenance-statements/) es la respuesta — sin llaves, respaldado por OIDC, consultable. El maintainer de axios tenía Trusted Publishing configurado al lado de un token legacy de larga duración; el token legacy fue lo que se comprometió. Migra completo o no migres.
- **Generación de SBOM en CI.** No lo he conectado. Para un sitio personal es marginal; para cualquier cosa que envíes a otras personas no.
- **OpenSSF Scorecard en CI.** Lo mismo — útil para librerías, marginal para un repo de sitio estático.
- **Pinear cada GitHub Action a un SHA, no a un tag.** Todavía estoy usando `actions/checkout@v4` en lugar de `actions/checkout@<sha>`. El ataque de tj-actions/changed-files fue re-targeting de tags — cada tag fue reescrito para apuntar al commit malicioso. Pinear a SHA previene eso. Lo voy a hacer en el siguiente paso.

También quiero marcar lo que *no* va a ayudar. Auditar tu `node_modules` después del install no es defensa — para ese momento, el postinstall ya corrió. Correr `npm audit` no es defensa contra esta clase de ataque — reporta CVEs conocidos en versiones publicadas, no *"esta versión salió hace 14 minutos y todavía no sabemos."* La defensa está en el momento del install, no después del install.

---

## Lo que puedes hacer esta semana

Si solo tienes una tarde, los movimientos de mayor palanca son:

1. Pinea tu package manager vía Corepack (`"packageManager"` en `package.json`).
2. Si estás en pnpm 10.16 o más reciente, agrega `minimumReleaseAge` a `pnpm-workspace.yaml`. Incluso 24 horas es dramáticamente mejor que cero.
3. Audita tus GitHub Actions buscando workflows con `pull_request_target` que ejecuten código controlado desde un fork. Esa fue la causa raíz de TanStack. Si tienes uno, quítalo o limita sus permisos a solo-lectura.
4. Migra cualquier paquete que publiques desde tokens de registro de larga duración a Trusted Publishing con OIDC — en [npm](https://docs.npmjs.com/trusted-publishers/), [PyPI](https://blog.pypi.org/posts/2024-11-14-pypi-now-supports-digital-attestations/) o [RubyGems](https://rubycentral.org/news/ruby-centrals-oss-changelog-march-2025/). Todos lo soportan ya.
5. Pinea las GitHub Actions de terceros a un SHA de commit, no a un tag. Sí, es más feo. La versión más fea no te la re-apuntan por debajo.

Nada de esto te protege de un adversario determinado que te conoce a ti específicamente. Suben el costo de que un gusano oportunista te encuentre a *ti en particular* lo suficiente como para que se vaya por otro desarrollador. Eso es todo lo que estás buscando. La seguridad en open source consiste, casi siempre, en volverte un blanco menos cómodo que la mediana.

El ecosistema no va a arreglar esto por nosotros. Los registros están haciendo trabajo real — el 2FA en PyPI es obligatorio, la provenance de npm está en GA, RubyGems y crates.io están sobre Sigstore — pero la responsabilidad del lado del install la cargamos los que construimos software. O sea, nosotros.

A seguir construyendo. Con cuidado.

---

## Recursos

- [Notas de release de pnpm 10.16 — `minimumReleaseAge`](https://pnpm.io/blog/releases/10.16)
- [Documentación de Corepack (Node.js)](https://nodejs.org/api/corepack.html)
- [npm Trusted Publishers](https://docs.npmjs.com/trusted-publishers/) y [docs de provenance](https://docs.npmjs.com/generating-provenance-statements/)
- [Digital attestations en PyPI](https://blog.pypi.org/posts/2024-11-14-pypi-now-supports-digital-attestations/)
- [OpenSSF Scorecard](https://scorecard.dev/)
- [Spracklen et al., *"We Have a Package for You!"* — alucinación de paquetes en LLMs (USENIX Security 2025)](https://www.usenix.org/system/files/conference/usenixsecurity25/sec25cycle1-prepub-742-spracklen.pdf)
- [Postmortem de TanStack](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem)
- [Análisis del compromiso de axios — Socket](https://socket.dev/blog/axios-npm-package-compromised)
- [Análisis de Shai-Hulud — StepSecurity](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised)
- [Análisis de tj-actions/changed-files (CVE-2025-30066) — Wiz](https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066)
