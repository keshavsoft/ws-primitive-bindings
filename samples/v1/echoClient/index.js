import bindings from "./bindings.json" with { type: "json" };
import actions from "./actions.js";
import { bindWs } from "../../../docs/dist/v1/min.js";

const host = window.location.host || "localhost:3000";
const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const url = `${protocol}//${host}/ws?role=display-v17`;

const socket = new WebSocket(url);
bindWs(socket, bindings, actions);

const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");

if (sendBtn && msgInput) {
  sendBtn.addEventListener("click", () => {
    const text = msgInput.value.trim();
    if (!text) return;
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "ping", text }));
      msgInput.value = "";
    } else {
      alert("Socket is not currently open!");
    }
  });
}

