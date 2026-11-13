const executeBinding = ({ binding, event, socket, payload, context }) => {
  if (typeof binding.actionFn !== "function") return;

  if (binding.event === "message") {
    binding.actionFn(payload, event, socket, context);
  } else {
    binding.actionFn(event, socket, context);
  }
};

export default executeBinding;
