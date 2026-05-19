// Fully disable Vue DevTools in Vitest
globalThis.__VUE_DEVTOOLS_GLOBAL_HOOK__ = {
  enabled: false,
  plugins: [],
  Vue: null,
  emit: () => { },
  on: () => { },
  off: () => { },
  once: () => { }
};

// Mock localStorage (required because devtools-kit still touches it)
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
  clear: () => { }
};