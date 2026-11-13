import assert from "node:assert/strict";
import { check, bindWs, unbindWs } from "../src/index.js";

console.log("Running ws-primitive-bindings Suite Verification...\n");

class MockWebSocket {
  constructor() {
    this.listeners = new Map();
  }
  addEventListener(type, fn) {
    const list = this.listeners.get(type) ?? [];
    list.push(fn);
    this.listeners.set(type, list);
  }
  removeEventListener(type, fn) {
    const list = this.listeners.get(type) ?? [];
    this.listeners.set(type, list.filter((f) => f !== fn));
  }
  emit(type, eventData) {
    const list = this.listeners.get(type) ?? [];
    for (const fn of list) {
      fn({ type, ...eventData });
    }
  }
}

// 1. Guard check
const socket = new MockWebSocket();
const bindings = [
  { event: "open", action: "onOpen" },
  { event: "message", type: "state", action: "onStateUpdate" },
  { event: "message", action: "onAnyMessage" },
  { event: "close", action: "onClose" }
];

let openCount = 0;
let statePayload = null;
let anyMessageCount = 0;
let closeCount = 0;
let contextReceived = null;

const actions = {
  onOpen: (event, ws, context) => {
    openCount++;
    assert.equal(ws, socket);
    assert.equal(context.userRole, "admin");
  },
  onStateUpdate: (payload, event, ws, context) => {
    statePayload = payload;
  },
  onAnyMessage: (payload, event, ws, context) => {
    anyMessageCount++;
  },
  onClose: (event, ws, context) => {
    closeCount++;
    contextReceived = context;
  }
};

const guarded = check(socket, bindings, actions);
assert.ok(guarded, "Guard must return valid object");
console.log("✔ Guard check passed");

// 2. Pure Bind socket with context
bindWs(socket, bindings, actions, { userRole: "admin", onDone: true });
console.log("✔ Socket event listeners attached with pure 1-line bindWs");

// 3. Emit 'open'
socket.emit("open", {});
assert.equal(openCount, 1, "onOpen must be called once");
console.log("✔ 'open' event dispatched cleanly with context");

// 4. Emit 'message' with type: 'state'
const rawState = JSON.stringify({ type: "state", count: 42, text: "ready" });
socket.emit("message", { data: rawState });
assert.ok(statePayload, "State payload must be parsed");
assert.equal(statePayload.count, 42);
assert.equal(anyMessageCount, 1, "Catch-all message handler must also receive message");
console.log("✔ 'message' event with automatic JSON parsing and type routing passed");

// 5. Emit 'close'
socket.emit("close", { code: 1000 });
assert.equal(closeCount, 1, "onClose must be called once");
assert.equal(contextReceived.onDone, true, "Context must be delivered to onClose");
console.log("✔ 'close' event dispatched with context");

// 6. Unbind check
unbindWs(socket, ["open", "message"]);
socket.emit("open", {});
assert.equal(openCount, 1, "onOpen must NOT fire after unbinding");
console.log("✔ unbindWs cleanly removes event listeners");

console.log("\nAll ws-primitive-bindings Tests Passed Successfully!");
