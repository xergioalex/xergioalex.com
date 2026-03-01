---
title: "Construyendo un Chat en Tiempo Real con Meteor.js"
description: "Como construi una aplicacion de chat en tiempo real completamente funcional en una tarde usando Meteor.js — el framework que hizo que el tiempo real se sintiera natural."
pubDate: "2016-09-27"
heroLayout: "none"
tags: ["portfolio"]
---

Hay una sensación muy particular que te da un framework cuando simplemente *hace clic*. No cuando por fin lo haces funcionar después de horas peleando con la documentación, sino cuando hace clic al primer intento — cuando hace exactamente lo que esperabas, y después un poco más. Esa fue mi experiencia con [Meteor.js](https://www.meteor.com/).

Recuerdo la primera vez que corrí `meteor create` y abrí el navegador. Un contador reactivo, actualizándose en tiempo real, sin configurar ningún servidor, sin configurar ninguna base de datos, sin ningún boilerplate de WebSocket. Refresqué la página. Abrí una segunda pestaña. Cambié algo y vi cómo ambas pestañas reaccionaban al mismo tiempo. Quedé convencido antes de entender siquiera cómo funcionaba.

Fue ese momento el que me hizo saber que Meteor iba a ser mi herramienta preferida para hacer prototipos rápido. Y ese día — un martes de septiembre de 2016 — era el momento de poner esa convicción a prueba.

---

## El panorama de JavaScript en 2016

Para entender por qué Meteor se sentía tan refrescante, hay que recordar cómo era construir una app en tiempo real en 2016.

Si querías una aplicación de chat, te enfrentabas a algo así: Node.js en el backend con Express, Socket.io para gestionar WebSockets, MongoDB o Redis para persistencia, Mongoose para modelado de datos, Passport para autenticación, y después tu elección entre React, Angular o Backbone en el frontend — cada uno con su propio pipeline de build. Webpack. Babel. Quizás Gulp. Un `package.json` con treinta dependencias solo para arrancar.

Para cuando tenías todo conectado, ya se había ido media tarde y no habías escrito ni una sola línea de código del producto. Eso era el JavaScript fatigue en su forma más pura.

Meteor era el contraargumento a todo eso. Un comando, y tenías una app full-stack corriendo — backend, frontend, base de datos, sistema de build, hot reload, todo conectado y comunicándose entre sí desde el primer momento. Podías pasar de cero a un prototipo funcionando en el tiempo que normalmente te tomaría configurar webpack.

Ese era el pitch. Y yo lo había usado el tiempo suficiente para saber que era real.

---

## La idea: un chat para demostrar el punto

Iba a dar una charla en [Pereira Tech Talks](https://www.pereiratechtalks.com/), la comunidad tech local con la que llevaba tiempo involucrado. El evento estaba planeado para noviembre, en la Universidad Tecnológica de Pereira. El tema: Meteor.js.

La pregunta que toda buena charla técnica tiene que responder es: ¿cuál es la demo? Puedes explicar un framework todo lo que quieras, pero no hay nada más convincente que ver cómo se construye algo real frente a tus ojos. Quería mostrar — no solo contar — que Meteor podía pasar de nada a una aplicación funcional multiusuario en tiempo real más rápido de lo que la mayoría de los desarrolladores terminarían de configurar su entorno de desarrollo.

Una app de chat era la elección obvia. El tiempo real es el superpoder de Meteor. ¿Qué mejor manera de demostrarlo que construir algo donde puedes abrir dos ventanas del navegador, escribir un mensaje, y verlo aparecer en las dos — al instante, sin plomería extra?

Así que en la tarde del 27 de septiembre de 2016, me senté y decidí construir todo desde cero. No solo prototipar la idea central — construirla de verdad, bien hecha. Autenticación, múltiples salas de chat, historial de mensajes, arquitectura limpia, todo. En una sola tarde.

A las 16:20 hice el primer commit. A las 21:43 tenía una aplicación de chat en tiempo real completamente funcional.

Te cuento cómo fue esa tarde.

---

## El build: commit por commit

### 16:20 — Primer commit: lienzo en blanco

Todo proyecto de Meteor empieza igual:

```bash
meteor create rocka-chat-tutorial
cd rocka-chat-tutorial
meteor
```

Abres `localhost:3000` y tienes una app corriendo. No un archivo "hola mundo" estático — una aplicación full-stack real y en funcionamiento con una instancia de MongoDB, un servidor Node, un bundle del cliente y hot reload, todo activo. El commit inicial era este scaffolding más los archivos de recursos del chat que había preparado de antemano: mockups de referencia de la UI, una lista de dependencias a instalar, el plan de arquitectura.

La estructura del proyecto que planeé desde el inicio:

```
client/
  main.html
  main.js
  styles/
imports/
  api/
    chats/
      chats.collection.js
      chats.methods.js
      chats.publications.js
    messages/
      messages.collection.js
      messages.methods.js
      messages.publications.js
    users/
      users.methods.js
      users.publications.js
  client/
    layouts/
    routes/
    templates/
server/
  main.js
```

Esta estructura fue deliberada. La capa `imports/api/` separaba el modelado de datos (collections), el flujo de datos del servidor al cliente (publications) y las operaciones del cliente al servidor (methods). Separación limpia de responsabilidades antes de que existiera una sola funcionalidad del negocio.

### 16:50 — Paquetes base

El sistema de paquetes de Meteor era uno de sus mejores atributos en esta época. Agregué los paquetes core que necesitaba:

```bash
meteor add accounts-password
meteor add kadira:flow-router
meteor add kadira:blaze-layout
meteor add reactive-dict
```

El archivo `packages` final terminó con 22 paquetes de Meteor, incluyendo `meteor-base`, `mongo`, `blaze-html-templates`, `reactive-var`, `tracker` y `jquery`. Del lado de npm: `moment` para timestamps, `faker` para datos de prueba, `bcrypt` para hashing de contraseñas, `is_js` para validaciones utilitarias.

Cada paquete que agregué estaba ahí por una razón. Esa disciplina importa más al inicio de lo que la gente se imagina.

### 18:04 — Routing con Flow Router

El router de elección en Meteor en 2016 era [kadira:flow-router](https://github.com/kadirahq/flow-router) combinado con Blaze Layout para el renderizado de templates. Configuré tres rutas: `/` para el home/lista de chats, `/login` y `/register` para autenticación, y `/chat/:chatId` para las salas de chat individuales.

```javascript
// imports/client/routes/routes.js
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('mainLayout', { content: 'home' });
  },
});

FlowRouter.route('/chat/:chatId', {
  name: 'chat',
  action() {
    BlazeLayout.render('mainLayout', { content: 'chat' });
  },
});
```

El template `mainLayout` envolvía todo con un sidebar persistente y navegación. Los templates individuales de `content` se intercambiaban reactivamente a medida que cambiaban las rutas.

### 18:28 — Integrando la UI

Con el routing listo, traje la UI del chat desde los mockups de referencia que había preparado. El sistema de templates Blaze de Meteor usa una sintaxis similar a Handlebars que compila a actualizaciones reactivas del DOM. Los templates eran limpios y legibles:

```html
<!-- imports/client/templates/chat/chat.html -->
<template name="chat">
  <div class="chat-messages">
    {{#each messages}}
      {{> chatMessage}}
    {{/each}}
  </div>
  <form class="chat-input">
    <input type="text" name="message" placeholder="Type a message..." />
    <button type="submit">Send</button>
  </form>
</template>
```

El helper `{{#each messages}}` era reactivo. En el momento en que el cursor `messages` se actualizaba, el DOM se actualizaba. Sin refresh manual, sin gestión explícita de estado, sin event listeners sobre los datos — Blaze se encargaba de todo.

### 20:25 — Registro de usuarios

La autenticación era lo siguiente. Con `accounts-password` instalado, el trabajo pesado ya estaba hecho. Solo necesitaba conectar la UI con el API:

```javascript
// User registration
Template.register.events({
  'submit .register-form'(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const username = event.target.username.value;

    Accounts.createUser({ email, password, username }, (error) => {
      if (error) {
        // Show error to user
        return;
      }
      FlowRouter.go('home');
    });
  },
});
```

Eso es todo. Sin JWT, sin configurar bcrypt, sin gestión de sesiones, sin lógica de validación de email. `Accounts.createUser` se encargaba de todo. Un flujo de registro completamente funcional en unas 15 líneas de código.

### 20:42 — Login de usuarios

El login siguió el mismo patrón:

```javascript
Template.login.events({
  'submit .login-form'(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        // Show error
        return;
      }
      FlowRouter.go('home');
    });
  },
});
```

La variable reactiva `Meteor.user()` ahora estaba disponible en todas partes dentro de los templates. Blaze re-renderizaba cualquier template que leyera `Meteor.user()` en el momento en que el estado de autenticación cambiaba.

### 20:46 — Redirecciones de auth

Una pieza pequeña pero crítica: los guards de ruta. Si no estabas autenticado, no deberías poder ver el chat. Si ya estabas autenticado, no deberías ver la página de login.

```javascript
// Global auth trigger
FlowRouter.triggers.enter([checkLoggedIn]);

function checkLoggedIn(context, redirect) {
  const publicRoutes = ['login', 'register'];
  if (!Meteor.userId() && !publicRoutes.includes(context.route.name)) {
    redirect('login');
  }
}
```

Con eso, el flujo de auth quedó completo en menos de veinte minutos de código real.

---

## La magia: Collections, Publications y Methods

Aquí está el corazón de Meteor. La parte que hace que todo lo demás se sienta como andamiaje.

### 21:27 — Collections y Publications

A las 21:27, agregué las collections `Chats` y `Messages` y las publications que controlaban qué podía ver cada usuario.

Las collections en Meteor son colecciones de MongoDB que existen en dos lugares simultáneamente: en el servidor (la base de datos real) y en el cliente (Minimongo, una réplica en memoria del lado del cliente). Se mantienen sincronizadas automáticamente a través de DDP — el protocolo en tiempo real de Meteor construido sobre WebSockets.

```javascript
// imports/api/chats/chats.collection.js
export const Chats = new Mongo.Collection('chats');

// Schema: { usersIds: [String], createdAt: Date, updatedAt: Date }

// Lock down client-side mutations — all writes go through Methods
Chats.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
```

```javascript
// imports/api/messages/messages.collection.js
export const Messages = new Mongo.Collection('messages');

// Schema: { chatId: String, ownerId: String, text: String, createdAt: Date, updatedAt: Date }

Messages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
```

Las reglas `deny()` eran importantes. Por defecto, Meteor permite escrituras directas del cliente en las collections (útil para prototipar), pero para cualquier aplicación real conviene que todas las mutaciones pasen por Methods validados en el servidor. La llamada a `deny()` en las tres operaciones convertía eso en una regla fija.

Las publications controlaban exactamente qué datos recibía cada cliente:

```javascript
// imports/api/chats/chats.publications.js
Meteor.publish('chats', function() {
  if (!this.userId) return this.ready();

  return Chats.find({ usersIds: this.userId });
});

Meteor.publish('chatMessages', function(chatId) {
  if (!this.userId) return this.ready();

  // Only publish messages for chats the user belongs to
  const chat = Chats.findOne({ _id: chatId, usersIds: this.userId });
  if (!chat) return this.ready();

  return Messages.find({ chatId });
});

Meteor.publish('userFriends', function() {
  if (!this.userId) return this.ready();

  return Meteor.users.find(
    { _id: { $ne: this.userId } },
    { fields: { username: 1, emails: 1 } }
  );
});
```

Este es el patrón pub/sub que hace a Meteor tan elegante. El servidor decide qué datos enviar — filtrados por usuario, con el scope justo de lo relevante. El cliente se suscribe y recibe automáticamente las actualizaciones cuando esos datos cambian. Sin polling, sin fetch manual, sin dolores de cabeza con la invalidación de caché.

En el cliente, suscribirse eran dos líneas:

```javascript
Template.chatList.onCreated(function() {
  this.subscribe('chats');
  this.subscribe('userFriends');
});
```

Desde el momento en que se llamaba a `subscribe`, `Chats.find({ usersIds: Meteor.userId() })` en el cliente devolvía datos vivos y reactivos — que coincidían exactamente con lo que el servidor publicaba.

### 21:43 — Chat completo: historial, mensajería y eliminación

El commit final a las 21:43 conectó todo: inserción de mensajes, historial del chat y eliminación de conversaciones. Todas las mutaciones pasaban por Meteor Methods:

```javascript
// imports/api/messages/messages.methods.js
Meteor.methods({
  'messages.insert'(chatId, text) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in.');
    }
    if (!text || !text.trim()) {
      throw new Meteor.Error('invalid-message', 'Message cannot be empty.');
    }

    // Verify user belongs to this chat
    const chat = Chats.findOne({ _id: chatId, usersIds: this.userId });
    if (!chat) {
      throw new Meteor.Error('not-authorized', 'You are not part of this chat.');
    }

    const now = new Date();
    Messages.insert({
      chatId,
      ownerId: this.userId,
      text: text.trim(),
      createdAt: now,
      updatedAt: now,
    });

    // Update the chat's updatedAt so it floats to the top of the list
    Chats.update(chatId, { $set: { updatedAt: now } });
  },
});
```

```javascript
// imports/api/chats/chats.methods.js
Meteor.methods({
  'chats.create'(friendId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Check if a chat already exists between these two users
    const existingChat = Chats.findOne({
      usersIds: { $all: [this.userId, friendId] },
    });
    if (existingChat) return existingChat._id;

    const now = new Date();
    return Chats.insert({
      usersIds: [this.userId, friendId],
      createdAt: now,
      updatedAt: now,
    });
  },

  'chats.remove'(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Chats.remove({ _id: chatId, usersIds: this.userId });
    Messages.remove({ chatId });
  },
});
```

En el cliente, llamar a un Method era una sola línea:

```javascript
Meteor.call('messages.insert', chatId, messageText);
```

Meteor lo ejecutaba en el servidor. El servidor insertaba el documento. MongoDB notificaba al observador de oplog de Meteor. DDP empujaba el cambio a todos los clientes suscritos. Minimongo se actualizaba en cada cliente. Blaze re-renderizaba el bloque `{{#each messages}}`.

Dos usuarios, dos ventanas del navegador, un mensaje escrito — y aparecía en todas partes en menos de cien milisegundos. Sin polling, sin gestión manual de sockets, sin sincronización explícita de estado.

Esa es la magia de Meteor.

---

## El resultado

A las 21:43 de un martes de septiembre, tenía una aplicación de chat en tiempo real completamente funcional. Quiero ser específico sobre lo que "completamente funcional" significa aquí:

- Registro e inicio de sesión con contraseñas hasheadas
- Lista de amigos (todos los demás usuarios registrados)
- Crear un chat con cualquier amigo
- Enviar y recibir mensajes en tiempo real a través de múltiples ventanas del navegador
- Historial completo de mensajes al volver a una sala
- Eliminar un chat (con limpieza de mensajes)
- Guards de ruta que mantienen fuera a los usuarios no autenticados
- Todas las mutaciones del cliente pasando por Methods validados en el servidor

Nueve commits en cinco horas y veintitrés minutos de trabajo real. Eso incluía planear la arquitectura, diseñar los schemas de las collections, conectar el routing, construir la autenticación e implementar la funcionalidad completa del chat con historial y eliminación.

Para contexto: las dependencias de npm que usé — `moment`, `faker`, `is_js`, `jquery`, `bcrypt` — son mínimas. El trabajo pesado fue todo Meteor: MongoDB a través del API de collections, sincronización en tiempo real a través de DDP, autenticación a través de `accounts-password`, reactividad del lado del cliente a través de Minimongo y Tracker, renderizado de templates a través de Blaze. Todo coordinado automáticamente.

---

## Por qué me encanta Meteor para prototipar

Quiero ser honesto sobre lo que Meteor es y no es, porque creo que la versión honesta es más útil que la versión de marketing.

Meteor no es la elección correcta para todas las aplicaciones. Para equipos muy grandes, lógica de negocio muy compleja, o aplicaciones que necesitan control granular sobre la capa de red y las consultas a la base de datos, otras arquitecturas funcionan mejor. El enfoque full-stack opinionado que hace a Meteor rápido para arrancar también agrega restricciones a medida que crece la complejidad.

Pero ¿para prototipar? ¿Para pasar de "tengo una idea" a "aquí hay algo funcionando que puedes usar" en el menor tiempo posible? ¿Para demostrar que un concepto técnico es viable antes de invertir en infraestructura? Meteor es excepcional.

La razón se reduce a lo que llamaría **eliminación de decisiones híbridas**. La mayoría de los frameworks te exigen tomar una docena de decisiones antes de escribir tu primera línea de código del producto: ¿Qué base de datos? ¿Qué ORM? ¿Cómo estructuro el API? ¿Cómo manejo la autenticación? ¿Qué solución de gestión de estado? ¿Cómo configuro el build? Con Meteor, esas decisiones ya estaban tomadas, y estaban bien tomadas. Solo construías.

El modelo pub/sub para datos en tiempo real estaba particularmente bien diseñado. En lugar de pensar "necesito configurar un WebSocket y transmitir cambios y manejar reconexión e invalidación de caché", pensabas "necesito que los clientes vean los chats a los que pertenecen" — y expresabas exactamente eso. La infraestructura debajo era invisible.

Esa claridad conceptual — poder expresar *qué quieres* en lugar de *cómo lograrlo técnicamente* — es lo que hacía que Meteor se sintiera como un superpoder en esta época.

---

## Lo que viene

El plan ahora es llevar este proyecto tutorial a [Pereira Tech Talks](https://www.pereiratechtalks.com/) en noviembre. La charla está programada para el 25 de noviembre, en la Universidad Tecnológica de Pereira, como parte del evento de la comunidad Pereira JS. El objetivo es guiar a la audiencia exactamente a través de este build — desde `meteor create` hasta un chat en tiempo real funcionando — y mostrar que la brecha entre "idea" y "prototipo funcional" se puede medir en horas, no en días.

Ya empecé a preparar los [slides](https://slides.com/rockalabs/meteorjs-live-chat). El código está en GitHub y lo voy a usar en vivo durante la presentación. Si quieres seguirlo o explorar la arquitectura antes de entonces, todo está en el repositorio.

El tiempo real no tiene que ser complicado. Meteor lo demostró hace tiempo. La comunidad de Pereira está a punto de verlo de primera mano.

A seguir construyendo.

---

## Recursos

- **Código fuente:** [github.com/rockalabs/rocka-chat-tutorial](https://github.com/rockalabs/rocka-chat-tutorial)
- **Slides:** [slides.com/rockalabs/meteorjs-live-chat](https://slides.com/rockalabs/meteorjs-live-chat)
- **Meteor.js:** [meteor.com](https://www.meteor.com/)
- **Pereira Tech Talks:** [pereiratechtalks.com](https://www.pereiratechtalks.com/)
