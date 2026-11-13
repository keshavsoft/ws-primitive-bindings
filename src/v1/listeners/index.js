import attachListener from "./attachListener.js";
import detachListener from "./detachListener.js";

const attachListeners = (socket, eventGroups, context = {}) => {
  for (const [eventType, bindings] of eventGroups.entries()) {
    attachListener(socket, eventType, bindings, context);
  }
  return socket;
};

const detachListeners = (socket, eventTypes = ["open", "message", "error", "close"]) => {
  for (const eventType of eventTypes) {
    detachListener(socket, eventType);
  }
  return socket;
};

export { attachListeners, detachListeners };
export default attachListeners;
