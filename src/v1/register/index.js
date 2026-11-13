import meta from "./meta.js";

const registerGlobal = (api, metadata = meta) => {
  if (!api || typeof globalThis === "undefined") return;

  globalThis.ks ??= {};

  globalThis.ks.wsPrimitiveBindings = {
    meta: metadata,
    ...api
  };

  globalThis.ks.bindWs ??= api.bindWs;

  return globalThis.ks.wsPrimitiveBindings;
};

export default registerGlobal;

