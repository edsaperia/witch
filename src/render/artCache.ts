// Drawn sprite sets kept in the browser (IndexedDB) between visits, so a reload, or a new build
// whose art hasn't changed, starts at once instead of drawing every area's trees again. Keyed by
// each job kind's source fingerprint (from vite.config.ts), the style and the set (seed and scale
// included where they matter). Safe to miss: with storage blocked, full or failing, every call
// quietly answers nothing and the sets are drawn as before.
import type { ArtJob } from "./artBuild";
export { cacheGet, cachePut } from "./artCacheStorage";

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

/** Where a set is kept between visits: the art's code, the style (its hash), the set, and for an area type its seed and scale.
 *  Party looks are per creature, so they aren't kept (null). The game's art (render/assets.ts) and the landing's bake ahead
 *  (app/landingBake.ts) both key by it. */
export const artCacheKey = (j: ArtJob, styleHash: string, fingerprints = ART_KIND_HASHES): string | null => {
  // One schema migration, no IDB clear. Unrecognized kinds miss safely rather than
  // sharing a fallback key whose incomplete dependencies could retain stale art.
  if (j.kind === "party" || !Object.hasOwn(fingerprints, j.kind)) return null;
  const fingerprint = fingerprints[j.kind];
  if (typeof fingerprint !== "string" || !fingerprint) return null;
  return ["art-kind-v1", fingerprint, styleHash, j.kind + ":" + j.id, j.kind === "type" ? `${j.seed}|${j.K}${j.biome ? "|" + j.biome : ""}` : j.kind === "beachEdge" || j.kind === "lakeShore" ? `${j.K}` : ""].join("|");
};

/** A short hash of a string (FNV-1a), for the style's part of the key. */
export function hashText(s: string): string {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(36);
}
