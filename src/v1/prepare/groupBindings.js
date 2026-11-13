const groupBindings = (bindings) => {
  const groups = new Map();

  for (const binding of bindings) {
    const list = groups.get(binding.event) ?? [];
    list.push(binding);
    groups.set(binding.event, list);
  }

  return groups;
};

export default groupBindings;

