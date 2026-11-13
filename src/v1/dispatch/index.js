import executeBinding from "./executeBinding.js";

const parseMessageData = (data) => {
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

const dispatchEvent = ({ bindings, event, socket, context }) => {
  let payload = null;
  if (event.type === "message") {
    payload = parseMessageData(event.data);
  }

  for (const binding of bindings) {
    if (event.type === "message" && binding.type) {
      if (!payload || typeof payload !== "object" || payload.type !== binding.type) {
        continue;
      }
    }

    executeBinding({ binding, event, socket, payload, context });
  }
};

export default dispatchEvent;
