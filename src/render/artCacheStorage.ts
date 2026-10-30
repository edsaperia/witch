// Storage only: cache hits must not initialize the drawing or rules modules.
import type { ArtResult } from "./artBuild";

const DB = "witch-art", STORE = "sets", VERSION = 2;
let opening: Promise<IDBDatabase | null> | null = null;

function open(): Promise<IDBDatabase | null> {
  if (opening) return opening;
  opening = new Promise<IDBDatabase | null>(resolve => {
    try {
      if (typeof indexedDB === "undefined") return resolve(null);
      const r = indexedDB.open(DB, VERSION);
      r.onupgradeneeded = () => { try { if (r.result.objectStoreNames.contains(STORE)) r.result.deleteObjectStore(STORE); r.result.createObjectStore(STORE); } catch { /* answered by onerror */ } };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => resolve(null);
      r.onblocked = () => resolve(null);
    } catch { resolve(null); }
  });
  return opening;
}

/** A set drawn before, or null. Settle after the read transaction closes. */
export async function cacheGet(key: string): Promise<ArtResult | null> {
  try {
    const db = await open();
    if (!db) return null;
    return await new Promise<ArtResult | null>(resolve => {
      try {
        const tx = db.transaction(STORE, "readonly"), q = tx.objectStore(STORE).get(key);
        tx.oncomplete = () => resolve((q.result as ArtResult | undefined) ?? null);
        tx.onerror = tx.onabort = () => resolve(null);
      } catch { resolve(null); }
    });
  } catch { return null; }
}

/** Keep a set before transferring its buffers. Storage failure remains a miss. */
export function cachePut(key: string, value: ArtResult): Promise<void> {
  return open().then(db => new Promise<void>(resolve => {
    if (!db) return resolve();
    try {
      const tx = db.transaction(STORE, "readwrite");
      tx.onerror = e => { e.preventDefault(); resolve(); };
      tx.oncomplete = tx.onabort = () => resolve();
      tx.objectStore(STORE).put(value, key);
    } catch { resolve(); }
  })).catch(() => {});
}
