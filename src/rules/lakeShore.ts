// What stands round a biome lake's shore (Ed, 2026-10-23, the biome lakes' second part: "shore dressing" for each look): palms
// by an oasis, bones and drowned trunks in a tar pit, reeds round a lily pond (its pads and flowers the water's own), ice chunks by a glacial tarn and a
// glacier, lava rocks and scorched trees by lava, a hot spring's pale mineral crust. Laid along each lake's shore loops, seeded
// by their place along it, so they're the same every night on that island; never on a path, in a clearing, on the gameplay's
// ground, a legend's clearing or by the dancefloor and the treehouse (the decor's own rules: rules/forest.ts). Drawing only: nothing stops or stands on them.
import type { LakeLook } from "./lakeLooks";
import type { ForestMap } from "./map";
import { hash2 } from "./random";
import { floorClearing } from "./speakers";

/** A piece by a lake: where, what (its kind, a variant of it), mirrored or not, how big. */
export interface ShorePiece { x: number; z: number; kind: ShoreKind; v: number; flip: boolean; scale: number }
export type ShoreKind = "palm" | "grass" | "bones" | "trunk" | "reeds" | "ice" | "lavaRock" | "scorched" | "crust";

/** Each look's dressing: for each kind, how often a place along the shore takes one (0 to 1), how far ashore (m: from, to;
 *  - out on the water), and its size (from, to). The places are `step` metres apart along the shore. */
interface Rule { kind: ShoreKind; odds: number; d: [number, number]; scale: [number, number] }
const RULES: Partial<Record<LakeLook, { step: number; rules: Rule[] }>> = {
  oasis: { step: 4, rules: [{ kind: "palm", odds: 0.32, d: [1.5, 7], scale: [0.85, 1.2] }, { kind: "grass", odds: 0.55, d: [0.3, 4], scale: [0.8, 1.3] }] },
  tar: { step: 5, rules: [{ kind: "bones", odds: 0.14, d: [-3, 1], scale: [0.8, 1.3] }, { kind: "trunk", odds: 0.07, d: [-5, -1], scale: [0.9, 1.4] }] },
  lily: { step: 2.5, rules: [{ kind: "reeds", odds: 0.7, d: [-1, 1.5], scale: [0.9, 1.5] }] }, // (its pads and flowers are the water's own: render/lakeLooks.ts)
  tarn: { step: 4, rules: [{ kind: "ice", odds: 0.3, d: [-2, 1.5], scale: [0.7, 1.4] }] },
  ice: { step: 5, rules: [{ kind: "ice", odds: 0.35, d: [0.5, 4], scale: [0.8, 1.6] }] },
  lava: { step: 4, rules: [{ kind: "lavaRock", odds: 0.45, d: [-0.5, 3], scale: [0.7, 1.5] }, { kind: "scorched", odds: 0.12, d: [3, 9], scale: [0.9, 1.3] }] },
  rust: { step: 3.5, rules: [{ kind: "crust", odds: 0.45, d: [0.5, 6], scale: [0.8, 1.6] }] },
};

/** The kinds a look's dressing uses (the art the view needs for it). */
export const shoreKinds = (look: LakeLook): ShoreKind[] => (RULES[look]?.rules ?? []).map(r => r.kind);

/** Every piece round every special lake on the map: `lake` each sample of the lakes' map's lake (-1 ashore), `looks` each
 *  lake's (rules/lakeLooks.ts lakesOf). Made once a map (a few thousand at most). */
export function shorePieces(map: ForestMap, lake: Int32Array, looks: readonly LakeLook[]): ShorePiece[] {
  const L = map.bounds.lakes, out: ShorePiece[] = [];
  if (!L) return out;
  const t = map.tuning, s0 = map.seed, floor = floorClearing(t) + 6, dance = map.dancefloor;
  const lakeAt = (x: number, z: number) => { const c = Math.round((x - L.x0) / L.step), r = Math.round((z - L.z0) / L.step); return c < 0 || r < 0 || c >= L.cols || r >= L.rows ? -1 : lake[r * L.cols + c]; };
  const P = { x: 0, z: 0, nx: 0, nz: 0 };
  L.loops.forEach((loop, li) => { // (every loop of the lakes' map is a lake's shore: its "land" is the water)
    // (the loop's lake: a step in from its first corner, onto the water)
    L.along(li, 0, P);
    const id = lakeAt(P.x - P.nx * L.step, P.z - P.nz * L.step), look = id >= 0 ? looks[id] : "water", R = RULES[look];
    if (!R) return;
    const count = Math.max(1, Math.round(loop.length / R.step)), ds = loop.length / count;
    for (let k = 0; k < count; k++) R.rules.forEach((rule, ri) => {
      const h = (salt: number) => hash2(li * 7919 + k, ri * 131 + salt, s0 + 6121);
      if (h(1) >= rule.odds) return;
      L.along(li, (k + h(2) - 0.5) * ds, P);
      const d = rule.d[0] + h(3) * (rule.d[1] - rule.d[0]), x = P.x + P.nx * d, z = P.z + P.nz * d;
      // (the decor's own rules: off the paths and their pieces, out of the clearings and the gameplay's ground, clear of the dancefloor)
      // (not hardClear, and reserved just past the lake's bare shore: the shore itself is in both, and that's where these stand)
      const past = Math.max(0, d) + (t.lakes?.shore ?? 4) + (t.reserveMargin ?? 0) + 2.5;
      if (map.paths.at(x, z, 2) || map.paths.pieceAt(x, z) || map.reserved(P.x + P.nx * past, P.z + P.nz * past, 2) || (d > 0 && map.areaAt(x, z).openness < t.decor.clearing)) return;
      if (Math.hypot(x - dance.x, z - dance.z) < floor || Math.hypot(x - map.treehouse.x, z - map.treehouse.z) < 30) return;
      if (map.legendClearings.some(c => Math.hypot(x - c.x, z - c.z) < c.r + 3)) return;
      out.push({ x, z, kind: rule.kind, v: Math.floor(h(4) * 8), flip: h(5) < 0.5, scale: rule.scale[0] + h(6) * (rule.scale[1] - rule.scale[0]) });
    });
  });
  return out;
}

/** Where a lava lake's glow lights its shore (Ed, 2026-10-23: "a warm light or two from each lava lake onto the trees round
 *  it"): `every` metres round each lava lake's shore, a little out on it (x, z pairs). */
export function lavaGlows(map: ForestMap, lake: Int32Array, looks: readonly LakeLook[], every = 40): number[] {
  const L = map.bounds.lakes, out: number[] = [];
  if (!L) return out;
  const P = { x: 0, z: 0, nx: 0, nz: 0 };
  const lakeAt = (x: number, z: number) => { const c = Math.round((x - L.x0) / L.step), r = Math.round((z - L.z0) / L.step); return c < 0 || r < 0 || c >= L.cols || r >= L.rows ? -1 : lake[r * L.cols + c]; };
  L.loops.forEach((loop, li) => { // (every loop of the lakes' map is a lake's shore: its "land" is the water)
    L.along(li, 0, P);
    const id = lakeAt(P.x - P.nx * L.step, P.z - P.nz * L.step);
    if (id < 0 || looks[id] !== "lava") return;
    const n = Math.max(2, Math.round(loop.length / every));
    for (let k = 0; k < n; k++) { L.along(li, (k / n) * loop.length, P); out.push(P.x - P.nx * 3, P.z - P.nz * 3); }
  });
  return out;
}
