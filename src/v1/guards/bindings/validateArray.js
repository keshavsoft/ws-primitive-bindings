import validateBinding from "./validateBinding.js";

const validateArray = (bindings) => {
  if (!Array.isArray(bindings)) {
    throw new TypeError("bindings must be an array.");
  }
  if (bindings.length === 0) {
    throw new TypeError("bindings must contain at least one binding.");
  }
  bindings.forEach((binding, index) => {
    if (!validateBinding(binding)) {
      throw new TypeError(
        `bindings[${index}] must have a valid 'event' ('open', 'message', 'error', 'close') and non-empty 'action'.`
      );
    }
  });
  return bindings;
};

export default validateArray;

