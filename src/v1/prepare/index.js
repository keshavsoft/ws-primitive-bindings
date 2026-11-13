import groupBindings from "./groupBindings.js";

const prepareBindings = (bindings, actions = {}) => {
  const configuredBindings = bindings.map((binding) => {
    const actionFn = typeof actions[binding.action] === "function"
      ? actions[binding.action]
      : null;

    return {
      ...binding,
      actionFn
    };
  });

  return groupBindings(configuredBindings);
};

export default prepareBindings;

