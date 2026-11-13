const isPlainObject = (value) => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const checkActions = (actions = {}) => {
  if (!isPlainObject(actions)) {
    throw new TypeError("actions must be a plain object.");
  }
  for (const [name, action] of Object.entries(actions)) {
    if (typeof action !== "function") {
      throw new TypeError(`actions.${name} must be a function.`);
    }
  }
  return actions;
};

export default checkActions;

