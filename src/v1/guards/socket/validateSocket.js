const validateSocket = (socket) => {
  if (!socket || typeof socket !== "object") {
    throw new TypeError("socket must be a WebSocket object or compatible EventTarget.");
  }
  const hasListener = typeof socket.addEventListener === "function";
  const hasOnProps = "onopen" in socket || "onmessage" in socket;
  if (!hasListener && !hasOnProps) {
    throw new TypeError("socket must implement addEventListener or onopen/onmessage properties.");
  }
  return socket;
};

export default validateSocket;

