// Failed writes belong to this page and this storage object, never to another tab or test store.
export interface Store { getItem(k: string): string | null; setItem(k: string, v: string): void }
const wrappers = new WeakMap<Store, Store>();
const missing = makeStore(null);

function makeStore(store: Store | null): Store {
  const pending = new Map<string, string>();
  const warned = new Set<string>();
  const warn = (key: string) => {
    if (warned.has(key)) return;
    warned.add(key);
    console.warn(`[storage] ${key}: browser storage unavailable; changes are kept for this page only.`);
  };
  return {
    getItem(key) {
      if (pending.has(key)) return pending.get(key)!;
      try { if (store) return store.getItem(key); } catch { /* fall through */ }
      warn(key);
      return null;
    },
    setItem(key, value) {
      // Retain the new value before attempting persistence; a subsequent read must not restore stale data.
      pending.set(key, value);
      try {
        if (store) { store.setItem(key, value); pending.delete(key); return; }
      } catch { /* keep this page's value */ }
      warn(key);
      throw new Error(`Browser storage refused ${key}`);
    },
  };
}

/** Explicit null means no persistence; omitted means this browser's storage, even if accessing it throws. */
export function fallbackStorage(store?: Store | null): Store {
  if (store === undefined) try { store = globalThis.localStorage ?? null; } catch { store = null; }
  if (!store) return missing;
  let wrapper = wrappers.get(store);
  if (!wrapper) { wrapper = makeStore(store); wrappers.set(store, wrapper); }
  return wrapper;
}
