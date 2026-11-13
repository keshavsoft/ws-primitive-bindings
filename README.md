# ws-primitive-bindings

> Declarative, instruction-driven WebSocket event and message type bindings.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 🌐 Live Documentation & Interactive Story

Explore the complete interactive story and live samples on **[GitHub Pages](https://keshavsoft.github.io/ws-primitive-bindings/)**:

1. **[Chapter 1: The WebSocket Spaghetti](https://keshavsoft.github.io/ws-primitive-bindings/stories/01-the-socket-spaghetti.html)** ([local](./docs/stories/01-the-socket-spaghetti.html))  
   Why monolithic `socket.onmessage = (e) => { switch(...) }` creates brittle code in production apps.
2. **[Chapter 2: Declarative Blueprints](https://keshavsoft.github.io/ws-primitive-bindings/stories/02-declarative-socket-bindings.html)** ([local](./docs/stories/02-declarative-socket-bindings.html))  
   Moving event wiring into declarative JSON with automatic message `type` routing and safe JSON decoding.
3. **[Chapter 3: The 3-File Standard](https://keshavsoft.github.io/ws-primitive-bindings/stories/03-the-three-file-standard.html)** ([local](./docs/stories/03-the-three-file-standard.html))  
   The pure 3-file pattern (`bindings.json` + `actions.js` + `bindWs()`) with a live interactive playground.
4. **[Interactive Samples](https://keshavsoft.github.io/ws-primitive-bindings/samples/v1/)** ([local](./samples/v1/index.html))  
   Live in-browser demonstrations: Live Appointment Display and interactive Echo Client.

---

## ⚡ Quick Start & Distribution

### 1. Direct Script Tag (Zero Install via CDN)

```html
<script type="module" src="https://keshavsoft.github.io/ws-primitive-bindings/dist/v1/min.js"></script>
```

### 2. ES Module Import in JavaScript

```javascript
import { bindWs } from "https://keshavsoft.github.io/ws-primitive-bindings/dist/v1/min.js";
```

### 3. NPM Package

```bash
npm install ws-primitive-bindings
```

---

## 📦 The 3-File Standard Usage Example (v1)

### 1. Declare `bindings.json` (The Blueprint)

```json
[
  { "event": "open", "action": "onOpen" },
  { "event": "message", "type": "state", "action": "onStateUpdate" },
  { "event": "message", "type": "error", "action": "onServerError" },
  { "event": "close", "action": "onClose" }
]
```

### 2. Declare `actions.js` (The Behaviors)

```javascript
export const actions = {
  onOpen: (event, socket) => {
    console.log("WebSocket connected!");
  },
  onStateUpdate: (payload, event, socket) => {
    console.log("Received state snapshot:", payload);
  },
  onServerError: (payload, event, socket) => {
    console.error("Server error:", payload.message);
  },
  onClose: (event, socket) => {
    console.log("WebSocket disconnected.");
  }
};

export default actions;
```

### 3. Delegate with `index.js` (The Orchestrator)

```javascript
import bindings from "./bindings.json" with { type: "json" };
import actions from "./actions.js";
import { bindWs } from "ws-primitive-bindings";

const socket = new WebSocket("ws://localhost:3000/ws");

// Binds all socket events and auto-routes JSON message types to actions
bindWs(socket, bindings, actions);
```

---

## 🏗️ Staged Pipeline Architecture

The engine enforces a decoupled pipeline where every directory contains an `index.js` public gateway:

```text
src/v1/
├── guards/               # Validates socket instance, bindings array, and actions object
├── prepare/              # Groups bindings by event type and action mappings
├── listeners/            # Attaches listeners to the WebSocket (attach/detach)
├── dispatch/             # Handles incoming events, safe JSON decoding, and type routing
├── register/             # Exposes module onto globalThis.ks.wsPrimitiveBindings
└── index.js              # Orchestrator (bindWs, unbindWs, check)
```

---

## 🧪 Testing

```bash
npm test
```

---

## 📄 License

MIT © KeshavSoft

