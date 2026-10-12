// The sea chart's islands, kept across visits (Ed, 2026-10-12: "Generating the map on the map screen is slow; can we do it
// earlier, before we need to show it? I believe it doesn't change through the entire campaign except for the home island"):
// each island's outline, ground and lakes as the worker makes them (app/chartOutlines.worker.ts), in this browser's IndexedDB by
// the build, the world, the island and its grid (home also by the kinds she's found: its size). Made ahead in the night (app/
// chartWarm.ts) or on the first visit, every later opening of the chart reads them back. Any failure (no IndexedDB, a private
// window, a full disk): as if nothing were kept, and the worker makes them as before.
import { knownKinds } from "../rules/rosters";
import { TUNING } from "../rules/tuning";

const DB = "witch-chart", STORE = "outlines";
/** An island's ground, samples across its longer side (app/chartOutlines.worker.ts; its close-up's finer). */
export const OUTLINE_ACROSS = 150, OUTLINE_DETAIL = 420;

// The keys: this build first (a new build makes its islands again: its code or tuning may draw them differently; the old ones are
// pruned), then the world, the island, its grid; home's also by the kinds she's found, its size.
declare const __BUILD__: string;
function hashOf(t: string): string { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
export const CACHE_PREFIX = `${typeof __BUILD__ === "string" ? __BUILD__ : "dev"}|${hashOf(JSON.stringify(TUNING))}|`;
/** An island's key: by the world, its grid (step, samples across) and, for home, the kinds she's found. */
export const cacheKey = (id: string, world: number, found: readonly string[], step: number, across: number): string =>
  `${CACHE_PREFIX}${world}|${id}|${step}|${across}|${id === "home" ? knownKinds([...found]).join(",") : ""}`;

let opened: Promise<IDBDatabase | null> | null = null;
function db(): Promise<IDBDatabase | null> {
  return (opened ??= new Promise<IDBDatabase | null>(res => {
    try {
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE);
      r.onsuccess = () => res(r.result);
      r.onerror = r.onblocked = () => res(null);
    } catch { res(null); }
  }));
}

/** What was kept under `key`, or null. */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const d = await db();
  if (!d) return null;
  return new Promise(res => {
    try {
      const q = d.transaction(STORE).objectStore(STORE).get(key);
      q.onsuccess = () => res((q.result as T | undefined) ?? null);
      q.onerror = () => res(null);
    } catch { res(null); }
  });
}

/** Every key kept (an empty set if there's no store). */
export async function cacheKeys(): Promise<Set<string>> {
  const d = await db();
  if (!d) return new Set();
  return new Promise(res => {
    try {
      const q = d.transaction(STORE).objectStore(STORE).getAllKeys();
      q.onsuccess = () => res(new Set(q.result.map(String)));
      q.onerror = () => res(new Set());
    } catch { res(new Set()); }
  });
}

/** Keep `value` under `key` (copied as it's called, so its buffers can be sent on straight after). */
export async function cachePut(key: string, value: unknown): Promise<void> {
  const d = await db();
  if (!d) return;
  try { d.transaction(STORE, "readwrite").objectStore(STORE).put(value, key); } catch { /* full, or gone: not kept */ }
}

/** Forget what another build kept (its keys don't start with `prefix`). */
export async function cachePrune(prefix: string): Promise<void> {
  const d = await db();
  if (!d) return;
  try {
    const store = d.transaction(STORE, "readwrite").objectStore(STORE), q = store.openKeyCursor();
    q.onsuccess = () => { const c = q.result; if (!c) return; if (!String(c.key).startsWith(prefix)) store.delete(c.key); c.continue(); };
  } catch { /* nothing to prune */ }
}
