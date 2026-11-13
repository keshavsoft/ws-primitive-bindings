import bindings from "./bindings.json" with { type: "json" };
import actions from "./actions.js";
import { bindWs } from "../../../docs/dist/v1/min.js";

const host = window.location.host || "localhost:3000";
const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const url = `${protocol}//${host}/ws?role=display-v17`;

console.log("Connecting ws-primitive-bindings to:", url);
const socket = new WebSocket(url);

bindWs(socket, bindings, actions);

