// Drawn sprite sets kept in the browser (IndexedDB) between visits, so a reload, or a new build
// whose art hasn't changed, starts at once instead of drawing every area's trees again. Keyed by
// the art code's hash (ART_HASH, from vite.config.ts), the style and the set (seed and scale
// included where they matter). Safe to miss: with storage blocked, full or failing, every call
// quietly answers nothing and the sets are drawn as before.
import type { ArtResult } from "./artBuild";

declare const __ART_HASH__: string;
export const ART_HASH = typeof __ART_HASH__ === "string" ? __ART_HASH__ : "dev";

const DB = "witch-art", STORE = "sets";
let opening: Promise<IDBDatabase | null> | null = null;

function open(): Promise<IDBDatabase | null> {
  if (opening) return opening;
  opening = new Promise<IDBDatabase | null>(resolve => {
    try {
      if (typeof indexedDB === "undefined") return resolve(null);
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => { try { r.result.createObjectStore(STORE); } catch { /* answered by onerror */ } };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => resolve(null);
      r.onblocked = () => resolve(null);
    } catch { resolve(null); }
  });
  return opening;
}

/** A set drawn before, or null. */
export async function cacheGet(key: string): Promise<ArtResult | null> {
  try {
    const db = await open();
    if (!db) return null;
    return await new Promise<ArtResult | null>(resolve => {
      try {
        const q = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
        q.onsuccess = () => resolve((q.result as ArtResult | undefined) ?? null);
        q.onerror = () => resolve(null);
      } catch { resolve(null); }
    });
  } catch { return null; }
}

/** Keep a set for next time (in the background; failure is ignored). */
export function cachePut(key: string, value: ArtResult): void {
  open().then(db => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE, "readwrite");
      tx.onerror = e => e.preventDefault(); // quota and the like: just not kept
      tx.objectStore(STORE).put(value, key);
    } catch { /* not kept */ }
  }).catch(() => {});
}

/** A short hash of a string (FNV-1a), for the style's part of the key. */
export function hashText(s: string): string {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(36);
}
