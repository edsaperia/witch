// Where the island's map made while the chart flies is kept for the game's page (app/mapPrep.ts): one record in IndexedDB, the
// next sailing's overwriting it. Its own module so the worker (mapPrep.worker.ts) needs nothing of the page's.
import type { Archipelago } from "../rules/archipelago";
import type { MapPrep } from "../rules/map";
import type { Tuning } from "../rules/tuning";

/** What the worker keeps: the map's prep and the world's archipelago, under the night's key (mapPrep.ts prepKey). */
export interface PrepRecord { key: string; prep: MapPrep; arch: Archipelago; ms: number; /** the tuning it was made with (a stale one's differences logged: mapPrep.ts) */ tuning: Tuning }
/** What the page asks the worker: make the map for this key's night. */
export interface PrepAsk { key: string; seed: number; tuning: Tuning; /** Descriptor only, no path/height payload or cache write. */ groundOnly?: boolean; /** post the record back too (a night started without a reload, or the boot's own) */ send?: boolean; /** not kept in IndexedDB (the boot's: its page takes it straight back) */ noKeep?: boolean }

const DB = "witch-mapprep", STORE = "prep", SLOT = "next";
const open = (): Promise<IDBDatabase | null> => new Promise(res => {
  try {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result);
    r.onerror = r.onblocked = () => res(null);
  } catch { res(null); }
});
/** Keep a night's record (one at a time: the next sailing's overwrites it). */
export async function putPrep(rec: PrepRecord): Promise<boolean> {
  const d = await open();
  if (!d) return false;
  return new Promise(res => {
    try { const tx = d.transaction(STORE, "readwrite"); tx.objectStore(STORE).put(rec, SLOT); tx.oncomplete = () => { d.close(); res(true); }; tx.onerror = tx.onabort = () => { d.close(); res(false); }; } catch { d.close(); res(false); }
  });
}
export async function getPrep(): Promise<PrepRecord | null> {
  const d = await open();
  if (!d) return null;
  return new Promise(res => {
    try { const r = d.transaction(STORE, "readonly").objectStore(STORE).get(SLOT); r.onsuccess = () => { d.close(); res((r.result as PrepRecord) ?? null); }; r.onerror = () => { d.close(); res(null); }; } catch { d.close(); res(null); }
  });
}

