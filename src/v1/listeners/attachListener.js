import dispatchEvent from "../dispatch/index.js";

const attachListener = (socket, eventType, bindings, context = {}) => {
  const handler = (event) => {
    dispatchEvent({ bindings, event, socket, context });
  };

  socket.__wsBindingsListeners ??= new Map();
  socket.__wsBindingsListeners.set(eventType, handler);

  if (typeof socket.addEventListener === "function") {
    socket.addEventListener(eventType, handler);
  } else {
    socket[`on${eventType}`] = handler;
  }
};

export default attachListener;
