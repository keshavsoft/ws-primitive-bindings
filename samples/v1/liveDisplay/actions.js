export const actions = {
  onConnected: (event, socket) => {
    const statusBadge = document.getElementById("statusBadge");
    const logBox = document.getElementById("liveLog");
    if (statusBadge) {
      statusBadge.className = "badge bg-success";
      statusBadge.textContent = "Connected to Server";
    }
    if (logBox) {
      logBox.innerHTML = `<strong>[open]</strong> <span class="text-success">WebSocket handshake established.</span>`;
    }
  },

  onStateReceived: (payload, event, socket) => {
    const tokenDisplay = document.getElementById("currentToken");
    const logBox = document.getElementById("liveLog");
    const num = payload.announcement?.number || "—";

    if (tokenDisplay) {
      tokenDisplay.textContent = num;
    }
    if (logBox) {
      logBox.innerHTML = `<strong>[message:state]</strong> <span class="text-info">Received snapshot: Token #${num} (displayConnected: ${payload.displayConnected})</span>`;
    }
  },

  onServerError: (payload, event, socket) => {
    const logBox = document.getElementById("liveLog");
    if (logBox) {
      logBox.innerHTML = `<strong>[message:error]</strong> <span class="text-danger">Server reported: ${payload.message}</span>`;
    }
  },

  onDisconnected: (event, socket) => {
    const statusBadge = document.getElementById("statusBadge");
    const logBox = document.getElementById("liveLog");
    if (statusBadge) {
      statusBadge.className = "badge bg-secondary";
      statusBadge.textContent = "Disconnected";
    }
    if (logBox) {
      logBox.innerHTML = `<strong>[close]</strong> <span class="text-warning">Connection closed (code: ${event.code}).</span>`;
    }
  },

  onError: (event, socket) => {
    const statusBadge = document.getElementById("statusBadge");
    const logBox = document.getElementById("liveLog");
    if (statusBadge) {
      statusBadge.className = "badge bg-danger";
      statusBadge.textContent = "Connection Error";
    }
    if (logBox) {
      logBox.innerHTML = `<strong>[error]</strong> <span class="text-danger">Socket encountered an error.</span>`;
    }
  }
};

export default actions;

