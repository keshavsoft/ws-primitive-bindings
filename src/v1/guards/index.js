import checkSocket from "./socket/index.js";
import checkBindings from "./bindings/index.js";
import checkActions from "./actions/index.js";

const runGuards = (socket, bindings, actions = {}) => {
  const validSocket = checkSocket(socket);
  const validBindings = checkBindings(bindings);
  const validActions = checkActions(actions);

  return {
    socket: validSocket,
    bindings: validBindings,
    actions: validActions
  };
};

export default runGuards;

