---
title: "Building a Real-Time Chat with Meteor.js"
description: "How I built a fully functional real-time chat application in one afternoon using Meteor.js — the framework that made real-time feel effortless."
pubDate: "2016-09-27"
heroLayout: "none"
tags: ["portfolio"]
---

There is a specific feeling you get when a framework just *clicks*. Not when you finally get it to work after hours of fighting the docs, but when it clicks on the first try — when it does exactly what you hoped it would do, and then a little more. That was my experience with [Meteor.js](https://www.meteor.com/).

I remember the first time I ran `meteor create` and opened the browser. A reactive counter, updating in real time, with zero server setup, zero database configuration, zero WebSocket boilerplate. I refreshed the page. I opened a second tab. I changed something and watched both tabs react simultaneously. I was sold before I even understood how it worked.

That was the moment I knew Meteor was going to be my go-to tool for rapid prototyping. And today — on this particular Tuesday afternoon in September 2016 — it was time to put that conviction to the test.

---

## The JavaScript Landscape in 2016

To understand why Meteor felt so refreshing, you have to remember what building a real-time app looked like in 2016.

If you wanted a chat application, you were looking at something like this: Node.js on the backend with Express, Socket.io for WebSocket management, MongoDB or Redis for persistence, Mongoose for data modeling, Passport for authentication, and then your choice of React or Angular or Backbone on the frontend — each with its own build pipeline. Webpack. Babel. Maybe Gulp. A `package.json` with thirty dependencies just to get started.

By the time you had everything wired together, half the afternoon was gone and you hadn't written a single line of actual product code. That was JavaScript fatigue in its purest form.

Meteor was the counter-argument to all of that. One command, and you had a full-stack app running — backend, frontend, database, build system, hot reload, all wired and talking to each other out of the box. You could get from zero to a working prototype in the time it would normally take you to configure webpack.

That was the pitch. And I had been using it long enough to know the pitch was real.

---

## The Idea: A Chat to Prove the Point

I was going to give a talk at [Pereira Tech Talks](https://www.pereiratechtalks.com/), the local tech community I had been involved with for a while. The event was planned for November, at Universidad Tecnológica de Pereira. The topic: Meteor.js.

The question every good technical talk has to answer is: what's the demo? You can explain a framework all you want, but there is nothing more convincing than watching something real get built in front of you. I wanted to show — not just tell — that Meteor could go from nothing to a working multi-user real-time application faster than most developers could finish setting up their development environment.

A chat app was the obvious choice. Real-time is Meteor's superpower. What better way to show that than building something where you can open two browser windows, type a message, and watch it appear in both — instantly, with no extra plumbing?

So on the afternoon of September 27, 2016, I sat down and decided to build the whole thing from scratch. Not just prototype the core idea — actually build it properly. Authentication, multiple chat rooms, message history, clean architecture, the works. All in one afternoon.

At 16:20, I made the first commit. By 21:43, I had a complete real-time chat application.

Let me walk you through how that afternoon went.

---

## The Build: Commit by Commit

### 16:20 — First Commit: Clean Slate

Every Meteor project starts the same way:

```bash
meteor create rocka-chat-tutorial
cd rocka-chat-tutorial
meteor
```

You open `localhost:3000` and you have a running app. Not a "hello world" static file — an actual running full-stack application with a MongoDB instance, a Node server, a client bundle, and hot reload all active. The initial commit was this scaffolding plus the chat resource files I'd prepared in advance: reference UI mockups, a list of dependencies to install, the architecture plan.

The project structure I planned from the start:

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

This structure was deliberate. The `imports/api/` layer separated data modeling (collections), server-to-client data flow (publications), and client-to-server operations (methods). Clean separation of concerns before a single business feature existed.

### 16:50 — Base Packages

Meteor's package system was one of its best features in this era. I added the core packages I needed:

```bash
meteor add accounts-password
meteor add kadira:flow-router
meteor add kadira:blaze-layout
meteor add reactive-dict
```

The final `packages` file ended up with 22 Meteor packages, including `meteor-base`, `mongo`, `blaze-html-templates`, `reactive-var`, `tracker`, and `jquery`. On the npm side: `moment` for timestamps, `faker` for test data, `bcrypt` for password hashing, `is_js` for utility validations.

Every package I added was there for a reason. That discipline matters more early on than people realize.

### 18:04 — Routing With Flow Router

Meteor's router of choice in 2016 was [kadira:flow-router](https://github.com/kadirahq/flow-router) paired with Blaze Layout for template rendering. I set up three routes: `/` for the home/chat list, `/login` and `/register` for authentication, and `/chat/:chatId` for individual chat rooms.

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

The `mainLayout` template wrapped everything with a persistent sidebar and nav. Individual `content` templates swapped in and out reactively as routes changed.

### 18:28 — Integrating the UI

With routing in place, I brought in the chat UI from the reference mockups I'd prepared. Meteor's Blaze templating system uses a Handlebars-like syntax that compiles to reactive DOM updates. The templates were clean and readable:

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

The `{{#each messages}}` helper was reactive. The moment the `messages` cursor updated, the DOM updated. No manual refresh, no explicit state management, no event listeners on the data — Blaze handled all of it.

### 20:25 — User Registration

Authentication was next. With `accounts-password` installed, the heavy lifting was already done. I just needed to wire the UI to the API:

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

That's it. No JWT, no bcrypt setup, no session management, no email validation logic. `Accounts.createUser` handled everything. A fully working registration flow in about 15 lines of code.

### 20:42 — User Login

Login followed the same pattern:

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

The `Meteor.user()` reactive variable was now available everywhere in templates. Blaze re-rendered any template that read `Meteor.user()` the moment authentication state changed.

### 20:46 — Auth Redirections

A small but critical piece: route guards. If you weren't logged in, you shouldn't be able to view the chat. If you were already logged in, you shouldn't see the login page.

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

With that, the auth flow was complete in under twenty minutes of actual coding time.

---

## The Magic: Collections, Publications, and Methods

This is the heart of Meteor. The part that makes everything else feel like scaffolding.

### 21:27 — Collections and Publications

At 21:27, I added the `Chats` and `Messages` collections and the publications that controlled what each user could see.

Collections in Meteor are MongoDB collections that exist in two places simultaneously: on the server (the real database) and on the client (Minimongo, a client-side in-memory replica). They stay in sync automatically via DDP — Meteor's real-time protocol built on top of WebSockets.

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

The `deny()` rules were important. By default, Meteor allows client-side direct writes to collections (useful for prototyping), but for any real application you want all mutations to go through validated server Methods. The `deny()` call on all three operations made that a hard rule.

Publications controlled exactly what data each client received:

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

This is the pub/sub pattern that makes Meteor so elegant. The server decides what data to send — filtered per user, scoped to what's relevant. The client subscribes and automatically receives updates when that data changes. No polling, no manual fetching, no cache invalidation headaches.

On the client, subscribing was two lines:

```javascript
Template.chatList.onCreated(function() {
  this.subscribe('chats');
  this.subscribe('userFriends');
});
```

From the moment `subscribe` was called, `Chats.find({ usersIds: Meteor.userId() })` on the client returned live, reactive data — matching exactly what the server published.

### 21:43 — Complete Chat: History, Messaging, Removal

The final commit at 21:43 wired everything together: message insertion, chat history, and chat removal. All mutations went through Meteor Methods:

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

On the client, calling a Method was a single line:

```javascript
Meteor.call('messages.insert', chatId, messageText);
```

Meteor executed it on the server. The server inserted the document. MongoDB notified Meteor's oplog observer. DDP pushed the change to all subscribed clients. Minimongo updated on each client. Blaze re-rendered the `{{#each messages}}` block.

Two users, two browser windows, one message typed — and it appeared everywhere in under a hundred milliseconds. No polling, no manual socket management, no explicit state sync.

That's the Meteor magic.

---

## The Result

At 21:43 on a September Tuesday, I had a fully working real-time chat application. Let me be specific about what "fully working" means here:

- User registration and login with hashed passwords
- Friend list (all other registered users)
- Creating a chat with any friend
- Sending and receiving messages in real time across multiple browser windows
- Full message history on re-join
- Removing a chat (with message cleanup)
- Route guards keeping unauthenticated users out
- All client mutations going through validated server Methods

Nine commits over five hours and twenty-three minutes of actual work. That included planning the architecture, designing the collection schemas, wiring up routing, building auth, and implementing the complete chat feature with history and deletion.

For context: the npm dependencies I used — `moment`, `faker`, `is_js`, `jquery`, `bcrypt` — are minimal. The heavy lifting was all Meteor: MongoDB through the collection API, real-time sync through DDP, authentication through `accounts-password`, client-side reactivity through Minimongo and Tracker, template rendering through Blaze. All of it coordinated automatically.

---

## Why I Love Meteor for Prototyping

I want to be honest about what Meteor is and isn't, because I think the honest version is more useful than the marketing version.

Meteor is not the right choice for every application. For very large teams, very complex business logic, or applications that need fine-grained control over the network layer and database queries, other architectures serve better. The opinionated full-stack approach that makes Meteor fast to start also adds constraints as complexity grows.

But for prototyping? For going from "I have an idea" to "here is a working thing you can use" in the shortest possible time? For demonstrating that a technical concept is viable before investing in infrastructure? Meteor is exceptional.

The reason comes down to what I'd call **hybrid elimination**. Most frameworks require you to make a dozen decisions before you write your first line of product code: Which database? What ORM? How do I structure the API? How do I handle auth? What state management solution? How do I set up the build? With Meteor, those decisions were made for you, and they were made well. You just built.

The pub/sub model for real-time data was particularly well-designed. Instead of thinking "I need to set up a WebSocket and broadcast changes and handle reconnection and cache invalidation," you thought "I need clients to see chats they belong to" — and you expressed exactly that. The infrastructure beneath it was invisible.

That conceptual clarity — being able to express *what you want* rather than *how to achieve it technically* — is what made Meteor feel like a superpower in this era.

---

## What's Next

The plan now is to take this tutorial project to [Pereira Tech Talks](https://www.pereiratechtalks.com/) in November. The talk is scheduled for November 25, at Universidad Tecnológica de Pereira, as part of the Pereira JS community event. The goal is to walk the audience through exactly this build — from `meteor create` to a working real-time chat — and show that the gap between "idea" and "working prototype" can be measured in hours, not days.

I've already started preparing the [slides](https://slides.com/rockalabs/meteorjs-live-chat). The code is up on GitHub and I'll be using it live during the presentation. If you want to follow along or poke around the architecture before then, everything is in the repo.

Real-time doesn't have to be complicated. Meteor proved that a long time ago. The Pereira community is about to see it first-hand.

Let's keep building.

---

## Resources

- **Source code:** [github.com/rockalabs/rocka-chat-tutorial](https://github.com/rockalabs/rocka-chat-tutorial)
- **Slides:** [slides.com/rockalabs/meteorjs-live-chat](https://slides.com/rockalabs/meteorjs-live-chat)
- **Meteor.js:** [meteor.com](https://www.meteor.com/)
- **Pereira Tech Talks:** [pereiratechtalks.com](https://www.pereiratechtalks.com/)
