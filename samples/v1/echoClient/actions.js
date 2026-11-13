export const actions = {
  onConnected: (event, socket) => {
    const status = document.getElementById("echoStatus");
    if (status) {
      status.className = "badge bg-success";
      status.textContent = "Socket Open";
    }
    const log = document.getElementById("echoLog");
    if (log) {
      log.innerHTML += `<div><span class="text-success">[OPEN]</span> Connected successfully.</div>`;
    }
  },

  onMessageReceived: (payload, event, socket) => {
    const log = document.getElementById("echoLog");
    const formatted = typeof payload === "object" ? JSON.stringify(payload) : payload;
    if (log) {
      log.innerHTML += `<div><span class="text-info">[MESSAGE]</span> ${formatted}</div>`;
      log.scrollTop = log.scrollHeight;
    }
  },

  onDisconnected: (event, socket) => {
    const status = document.getElementById("echoStatus");
    if (status) {
      status.className = "badge bg-secondary";
      status.textContent = "Socket Closed";
    }
    const log = document.getElementById("echoLog");
    if (log) {
      log.innerHTML += `<div><span class="text-warning">[CLOSE]</span> Connection closed.</div>`;
    }
  },

  onError: (event, socket) => {
    const status = document.getElementById("echoStatus");
    if (status) {
      status.className = "badge bg-danger";
      status.textContent = "Socket Error";
    }
    const log = document.getElementById("echoLog");
    if (log) {
      log.innerHTML += `<div><span class="text-danger">[ERROR]</span> Error encountered.</div>`;
    }
  }
};

export default actions;

