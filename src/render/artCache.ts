// Drawn sprite sets kept in the browser (IndexedDB) between visits, so a reload, or a new build
// whose art hasn't changed, starts at once instead of drawing every area's trees again. Keyed by
// each job kind's source fingerprint (from vite.config.ts), the style and the set (seed and scale
// included where they matter). Safe to miss: with storage blocked, full or failing, every call
// quietly answers nothing and the sets are drawn as before.
import type { ArtJob, ArtResult } from "./artBuild";
import { GENOME_BY_ID, genomeHash, selectedCreatureGenome } from "../../art/genome/index.js";

/** A job's cache key, carried with it to the art worker, which keeps the cache (render/artWorker.ts); null: not kept. */
export interface CacheHint { cacheKey?: string | null; /** Only if it's kept: a set not kept comes back `miss`, not drawn. */ cacheOnly?: boolean }

/** An island's own tree seed (the transition review, 2026-10-19; Ed: "revisits can draw instantly then redraw during the bedroom
 *  sequence"): its area types' trees drawn under it are the same every night and session, so they're kept (the art cache) and a
 *  revisit draws them at once; the night's own (the night's seed, as before) are drawn ahead and swapped in unseen (main.ts
 *  revealArt). (Kept in the rules, rules/stumps.ts: the stumps' deal is the rules' too.) */
export { islandArtSeed } from "../rules/stumps";

declare const __ART_HASH__: string;
/** Legacy diagnostic only; never a prefix on the per-kind cache keys. */
export const ART_HASH = typeof __ART_HASH__ === "string" ? __ART_HASH__ : "dev";
declare const __ART_KIND_HASHES__: Record<string, string>;
export const ART_KIND_HASHES: Readonly<Record<string, string>> = typeof __ART_KIND_HASHES__ === "object" ? __ART_KIND_HASHES__ : {};

// (version 2: atlases kept as palette indices, render/palette.ts; the RGBA sets of version 1 are let go as it opens)
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

/** Where a set is kept between visits: the art's code, the style (its hash), the set, and for an area type its seed and scale.
 *  Party looks are per creature, so they aren't kept (null). The game's art (render/assets.ts) and the landing's bake ahead
 *  (app/landingBake.ts) both key by it. */
export const artCacheKey = (j: ArtJob, styleHash: string, fingerprints = ART_KIND_HASHES): string | null => {
  // One schema migration, no IDB clear. Unrecognized kinds miss safely rather than
  // sharing a fallback key whose incomplete dependencies could retain stale art.
  if (j.kind === "party" || !Object.hasOwn(fingerprints, j.kind)) return null;
  const fingerprint = fingerprints[j.kind];
  if (typeof fingerprint !== "string" || !fingerprint) return null;
  const species = j.kind === "creature" ? j.id : "species" in j ? j.species : null;
  const base = species ? GENOME_BY_ID[species] : null;
  const selectedKey = base && selectedCreatureGenome(base, j.style) !== base ? `|genome:${genomeHash(base, j.style, j.kind === "rig" ? j.level : null)}` : "";
  return ["art-kind-v1", fingerprint, styleHash, j.kind + ":" + j.id, j.kind === "type" ? `${j.seed}|${j.K}${j.biome ? "|" + j.biome : ""}` : j.kind === "beachEdge" || j.kind === "lakeShore" ? `${j.K}` : ""].join("|") + selectedKey;
};

/** A set drawn before, or null. */
export async function cacheGet(key: string): Promise<ArtResult | null> {
  try {
    const db = await open();
    if (!db) return null;
    return await new Promise<ArtResult | null>(resolve => {
      try {
        // (settled once its transaction has finished, not on the read: the worker draws straight after, and a transaction left
        // open through the drawing held every other worker's write behind it, so the workers' sets landed three at a time)
        const tx = db.transaction(STORE, "readonly"), q = tx.objectStore(STORE).get(key);
        tx.oncomplete = () => resolve((q.result as ArtResult | undefined) ?? null);
        tx.onerror = tx.onabort = () => resolve(null);
      } catch { resolve(null); }
    });
  } catch { return null; }
}

/** Keep a set for next time (in the background; failure is ignored). Settles once it's written, or not. */
export function cachePut(key: string, value: ArtResult): Promise<void> {
  return open().then(db => new Promise<void>(resolve => {
    if (!db) return resolve();
    try {
      const tx = db.transaction(STORE, "readwrite");
      tx.onerror = e => { e.preventDefault(); resolve(); }; // quota and the like: just not kept
      tx.oncomplete = tx.onabort = () => resolve();
      tx.objectStore(STORE).put(value, key);
    } catch { resolve(); /* not kept */ }
  })).catch(() => {});
}

/** A short hash of a string (FNV-1a), for the style's part of the key. */
export function hashText(s: string): string {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(36);
}
