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
/** What's kept with an island, numbered: 2 since its meshes come with its ground (render/chart/islandMesh.ts), 3 with its
 *  sigil's ink at each tier, so an older entry is made again. */
export const KEPT_VERSION = 3;
/** An island's key: by the world, its grid (step, samples across) and, for home, the kinds she's found. */
export const cacheKey = (id: string, world: number, found: readonly string[], step: number, across: number): string =>
  `${CACHE_PREFIX}v${KEPT_VERSION}|${world}|${id}|${step}|${across}|${id === "home" ? knownKinds([...found]).join(",") : ""}`;

let opened: Promise<IDBDatabase | null> | null = null;
function db(): Promise<IDBDatabase | null> {
  return (opened ??= new Promise(res => {
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

/** An island's coast for the zoo (Ed, 2026-10-26: "We already know the real coastline shapes, can't we reuse them in the zoo
 *  without calculating anything?"; rules/zooMap.ts ZooLayoutKnobs.coasts): kept beside its outline, small, by the world and the
 *  island alone, under this build's prefix (the night's tuning's, as the chart's own keys: the zoo's page has its own tuning, so
 *  it looks up these, never keys of its own). */
export const coastKey = (id: string, world: number): string => `${CACHE_PREFIX}coast1|${world}|${id}`;

/** The most points a kept coast has (evenly round it). */
export const COAST_POINTS = 240;

/** An outline's coast for the zoo: its biggest sea loop (an islet off it, and its lakes, left out), its points spaced evenly round
 *  it (at most COAST_POINTS), its longer side 1 across, centred on its box; x, z pairs. Null if it has none. */
export function compactCoast(loops: readonly { pts: ArrayLike<number>; sea: boolean }[]): number[] | null {
  let best: ArrayLike<number> | null = null, area = 0;
  for (const l of loops) {
    if (!l.sea || l.pts.length < 6) continue;
    let a = 0;
    for (let i = 0, n = l.pts.length, j = n - 2; i < n; j = i, i += 2) a += l.pts[j] * l.pts[i + 1] - l.pts[i] * l.pts[j + 1];
    if (Math.abs(a) > area) { area = Math.abs(a); best = l.pts; }
  }
  if (!best) return null;
  const P = best, m = P.length >> 1, cum = [0];
  for (let i = 0; i < m; i++) { const j = (i + 1) % m; cum.push(cum[i] + Math.hypot(P[j * 2] - P[i * 2], P[j * 2 + 1] - P[i * 2 + 1])); }
  const n = Math.min(COAST_POINTS, m), per = cum[m], out: number[] = [];
  let seg = 0;
  for (let k = 0; k < n; k++) {
    const d = (k / n) * per;
    while (seg < m - 1 && cum[seg + 1] < d) seg++;
    const j = (seg + 1) % m, t = (d - cum[seg]) / Math.max(1e-9, cum[seg + 1] - cum[seg]);
    out.push(P[seg * 2] + (P[j * 2] - P[seg * 2]) * t, P[seg * 2 + 1] + (P[j * 2 + 1] - P[seg * 2 + 1]) * t);
  }
  // (one gentle pass of smoothing: the land's sampled on a grid, its coast stepped at its samples)
  const sm = out.map((v, i) => { const k = i >> 1, o = i & 1, a = out[(((k - 1 + n) % n) << 1) + o], b = out[(((k + 1) % n) << 1) + o]; return (a + 2 * v + b) / 4; });
  out.splice(0, out.length, ...sm);
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (let k = 0; k < n; k++) { x0 = Math.min(x0, out[k * 2]); x1 = Math.max(x1, out[k * 2]); z0 = Math.min(z0, out[k * 2 + 1]); z1 = Math.max(z1, out[k * 2 + 1]); }
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, size = Math.max(1e-9, x1 - x0, z1 - z0);
  return out.map((v, i) => Math.round(((v - (i % 2 ? cz : cx)) / size) * 1e5) / 1e5);
}

/** Keep an island's coast for the zoo, if it isn't kept yet (the chart's worker, as it keeps or reads back an outline). */
export async function keepCoast(id: string, world: number, loops: readonly { pts: ArrayLike<number>; sea: boolean }[]): Promise<void> {
  if (id === "home") return; // (the zoo's home is the plaza)
  const key = coastKey(id, world), c = compactCoast(loops); // (read now: its buffers may be sent on straight after)
  if (!c || (await cacheGet(key))) return;
  await cachePut(key, c);
}
