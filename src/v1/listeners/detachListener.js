const detachListener = (socket, eventType) => {
  if (!socket) return;
  const handler = socket.__wsBindingsListeners?.get(eventType);

  if (handler) {
    if (typeof socket.removeEventListener === "function") {
      socket.removeEventListener(eventType, handler);
    } else if (socket[`on${eventType}`] === handler) {
      socket[`on${eventType}`] = null;
    }
    socket.__wsBindingsListeners.delete(eventType);
  }
};

export default detachListener;

