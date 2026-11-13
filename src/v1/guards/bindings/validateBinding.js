const validEvents = new Set(["open", "message", "error", "close"]);

const isPlainObject = (value) => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const validateBinding = (binding) => {
  if (!isPlainObject(binding)) return false;
  if (typeof binding.event !== "string" || !validEvents.has(binding.event.trim())) {
    return false;
  }
  if (typeof binding.action !== "string" || binding.action.trim().length === 0) {
    return false;
  }
  if (binding.type !== undefined && (typeof binding.type !== "string" || binding.type.trim().length === 0)) {
    return false;
  }
  return true;
};

export { validEvents, isPlainObject };
export default validateBinding;

