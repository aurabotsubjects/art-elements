// Shim for the window.storage API (get/set/delete/list) that the components
// were originally written against inside Claude.ai's artifact sandbox.
// Backed by real localStorage so progress/portfolios persist in the browser
// when this app is hosted standalone (e.g. on GitHub Pages).
(function () {
  function fullKey(key, shared) {
    // "shared" storage isn't meaningful outside the sandbox (there's no
    // multi-user backend here) — everything is just namespaced locally.
    return "art-explorer:" + key;
  }

  window.storage = {
    async get(key, shared) {
      const raw = window.localStorage.getItem(fullKey(key, shared));
      if (raw === null) {
        throw new Error("Key not found: " + key);
      }
      return { key, value: raw, shared: !!shared };
    },

    async set(key, value, shared) {
      try {
        window.localStorage.setItem(fullKey(key, shared), value);
        return { key, value, shared: !!shared };
      } catch (e) {
        console.error("storage.set failed", e);
        return null;
      }
    },

    async delete(key, shared) {
      window.localStorage.removeItem(fullKey(key, shared));
      return { key, deleted: true, shared: !!shared };
    },

    async list(prefix, shared) {
      const full = "art-explorer:" + (prefix || "");
      const keys = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(full)) {
          keys.push(k.slice("art-explorer:".length));
        }
      }
      return { keys, prefix, shared: !!shared };
    },
  };
})();
