import registerGlobal from "./register/index.js";
import runGuards from "./guards/index.js";
import prepareBindings from "./prepare/index.js";
import { attachListeners, detachListeners } from "./listeners/index.js";

const check = (socket, bindings = [], actions = {}) =>
  runGuards(socket, bindings, actions);

const bindWs = (socket, bindings = [], actions = {}, context = {}) => {
  const guarded = check(socket, bindings, actions);
  if (!guarded) return null;

  const { socket: validSocket, bindings: validBindings } = guarded;
  const eventGroups = prepareBindings(validBindings, guarded.actions);

  attachListeners(validSocket, eventGroups, context);

  return validSocket;
};

const unbindWs = (socket, eventTypes) => {
  return detachListeners(socket, eventTypes);
};

export {
  bindWs,
  unbindWs,
  check
};

export default bindWs;

registerGlobal({
  bindWs,
  unbindWs,
  check
});
