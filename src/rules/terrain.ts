// The lie of the land (Ed's idea, as the coordinator relayed it, 2026-10-07: "we still know where hills and valleys are made by the shader; we could use this
// as part of the map layout generator; higher areas could be made where runestones are; lower areas could be made where
// legends are; trees could be thicker in lower areas and sparser in higher areas"): the hills' height as the map lays it
// out, with no Three.js, so the rules (the trees' density) and the drawing (render/height.ts, the rolling ground) read
// the same land. The rules still move on flat ground: only where trees grow follows it.
import type { ForestMap } from "./map";
import { smoothstep, vnoise } from "./random";
import { makeLand, type LandMap } from "./land";
import type { Tuning } from "./tuning";

export interface HillsTuning { on: boolean; amplitude: number; scale: number; octaves: number; /** The steepest the ground may rise (tan of the camera's shallowest pitch): the hills are made at least broad enough for it (HeightField). */ maxSlope?: number }

/** How broad hills of amplitude A must be (scale, m) so that, with their levelling, ground rising
 *  away from the camera stays under its sightline to her (Ed, v289: "you never go behind a bump"):
 *  measured over the map (height.test.ts), the raw noise's steepest is about 2.6 A / scale, and the
 *  plateaus' and paths' ramps steepen it by about 1.65 times. */
export const SLOPE_SCALE = 4.3;

/** The hills' raw noise at (x, z): centred on 0, between -amplitude and +amplitude. */
export function hillsAt(x: number, z: number, seed: number, H: HillsTuning): number {
  let s = 0, a = 1, f = 1 / Math.max(1, H.scale), norm = 0;
  for (let o = 0; o < Math.max(1, H.octaves); o++) {
    s += (vnoise(x * f, z * f, seed + o * 101) - 0.5) * a;
    norm += a * 0.5; a *= 0.45; f *= 2.03;
  }
  return (s / norm) * H.amplitude;
}

/** The hills as the game draws them: broad enough for the camera's shallowest pitch at any zoom (render/view.ts). */
export function drawnHills(t: Tuning): HillsTuning {
  const C = t.camera, pitch = Math.min(C.ground.angleIn, C.ground.angleOut, C.treetop.angleIn, C.treetop.angleOut);
  const H = t.ground.hills, maxSlope = Math.tan((pitch * Math.PI) / 180);
  return { ...H, maxSlope, scale: Math.max(H.scale, SLOPE_SCALE * H.amplitude / maxSlope) };
}

interface Mark { x: number; z: number; h: number }
interface Marks { cell: number; reach: number; grid: Map<string, Mark[]> }
const MARKS = new WeakMap<ForestMap, Marks | null>();

/** The runestones' rises and the legend clearings' hollows, bucketed by their reach. */
function marksOf(map: ForestMap): Marks | null {
  if (MARKS.has(map)) return MARKS.get(map)!;
  const L = map.tuning.ground.layout;
  let out: Marks | null = null;
  if (L?.on && map.tuning.ground.hills.on) {
    const reach = Math.max(1, L.reach), grid = new Map<string, Mark[]>();
    const put = (m: Mark) => { const k = `${Math.floor(m.x / reach)},${Math.floor(m.z / reach)}`; (grid.get(k) ?? grid.set(k, []).get(k)!).push(m); };
    const [hx, hy] = map.centreCell;
    // every area's runestone (where its soundsystem comes) on a rise; home's is the dancefloor's own terrace
    for (const [cx, cy] of map.cells) if (cx !== hx || cy !== hy) { const s = map.soundsystemSpot(cx, cy); put({ x: s.x, z: s.z, h: L.rise }); }
    // every sleeping legend's clearing in a hollow
    for (const c of map.legendClearings ?? []) put({ x: c.x, z: c.z, h: -L.dip });
    out = { cell: reach, reach, grid };
  }
  MARKS.set(map, out);
  return out;
}

/** How much the layout raises (a runestone's rise) or lowers (a legend's hollow) the hills at (x, z), as a share of
 *  their amplitude: each mark's full share at its middle, easing smoothly to nothing at `ground.layout.reach` metres. */
export function layoutBias(map: ForestMap, x: number, z: number): number {
  const M = marksOf(map);
  if (!M) return 0;
  const bx = Math.floor(x / M.cell), bz = Math.floor(z / M.cell), r2 = M.reach * M.reach;
  let h = 0;
  for (let j = bz - 1; j <= bz + 1; j++) for (let i = bx - 1; i <= bx + 1; i++) {
    const ms = M.grid.get(`${i},${j}`);
    if (ms) for (const m of ms) {
      const dx = x - m.x, dz = z - m.z, d2 = dx * dx + dz * dz;
      if (d2 < r2) h += m.h * smoothstep(1 - Math.sqrt(d2) / M.reach);
    }
  }
  return h;
}

/** The land's height at (x, z) before any levelling: the hills' noise (H, as drawn) plus the layout's rises and
 *  hollows. 0 everywhere with the hills off. render/height.ts levels it under paths and plateaus and eases it to the beach. */
export function terrainAt(map: ForestMap, x: number, z: number, H: HillsTuning): number {
  if (!H.on) return 0;
  const h = hillsAt(x, z, map.seed + 6113, H) + H.amplitude * layoutBias(map, x, z);
  if (!map.bounds?.lakes) return h;
  // A lake lies in a hollow (Ed, 2026-10-12: "lakes and the hill shader interact nicely"; rules/lakes.ts): its water one level,
  // a little under the lowest of the hills along its shore, and the ground eased down to it over LAKE_EASE metres of shore, so
  // no hill pokes through the water and no shore hangs above it, wherever the lake lies.
  // On high ground the hollow is carved out: away from the water the ground rises no steeper than a share of the hills' own
  // limit (LAKE_SLOPE of maxSlope, the camera's sightline), blended into the hills (a smooth minimum, LAKE_BLEND m), so a lake
  // on a hillside sits in a bowl rather than under a cliff.
  const W = map.bounds.lakes, LB = W.box;
  if (x < LB.minX - LAKE_REACH || x > LB.maxX + LAKE_REACH || z < LB.minZ - LAKE_REACH || z > LB.maxZ + LAKE_REACH) return h; // (quickly: well away from any lake)
  const d = W.distAt(x, z); // (exact: the quick one steps between samples)
  if (d <= -LAKE_REACH - 8) return h;
  if (d >= 0) return lakeLevel(map, x, z, H) ?? h;
  // (each lake's own bowl, blended into the hills and each other by a smooth minimum: no step where one lake's nearer than another's)
  const k = (H.maxSlope ?? 0.6) * LAKE_SLOPE, r = LAKE_BLEND;
  let carved = h, floor = -Infinity;
  const gi = Math.max(0, Math.min(W.cols - 1, Math.round((x - W.x0) / W.step))), gj = Math.max(0, Math.min(W.rows - 1, Math.round((z - W.z0) / W.step))), sg = W.seg[gj * W.cols + gi], nearest = sg < 0 ? -1 : W.segLoop[sg];
  for (const b of bowlsOf(map, H)) {
    const B = b.land.box;
    if (x < B.minX - LAKE_REACH || x > B.maxX + LAKE_REACH || z < B.minZ - LAKE_REACH || z > B.maxZ + LAKE_REACH) continue;
    // (by its own shore the lakes' map's exact distance, eased over to the bowl's own further out: the bowl's map, sampled
    // coarsely first, can miss a narrow arm of the water)
    let di = Math.max(0, -b.land.distAt(x, z));
    if (b.loop === nearest) di += (-d - di) * (1 - smoothstep((-d - LAKE_EASE) / LAKE_EASE));
    const cone = b.level + k * di;
    const m = Math.max(r - Math.abs(carved - cone), 0);
    carved = Math.min(carved, cone) - (m * m) / (4 * r);
    // (never under its water round its shore: the floor a little over its level by the water, falling away past 6 m as gently as
    // the bowl rises, so it never makes a step)
    floor = Math.max(floor, b.level + 0.02 * Math.min(di, 6) - k * Math.max(0, di - 6));
  }
  return Math.max(floor, carved);
}

const BOWLS = new WeakMap<object, Map<string, { land: LandMap; level: number; loop: number }[]>>();
/** Each lake's bowl: its own distance map (rules/land.ts, every 4 m, out to LAKE_REACH past it) and its level. Made once a map. */
function bowlsOf(map: ForestMap, H: HillsTuning): { land: LandMap; level: number; loop: number }[] {
  const W = map.bounds.lakes!, key = `${H.amplitude}|${H.scale}|${H.octaves}`;
  let byH = BOWLS.get(W);
  if (!byH) BOWLS.set(W, (byH = new Map()));
  let out = byH.get(key);
  if (out) return out;
  out = [];
  for (let i = 0; i < W.loops.length; i++) {
    const l = W.loops[i];
    if (!l.sea) continue; // (a loop round water)
    const P = l.pts, n = P.length / 2;
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let q = 0; q < n; q++) { x0 = Math.min(x0, P[q * 2]); x1 = Math.max(x1, P[q * 2]); z0 = Math.min(z0, P[q * 2 + 1]); z1 = Math.max(z1, P[q * 2 + 1]); }
    const inside = (x: number, z: number) => { let w = false; for (let a = 0, b = n - 1; a < n; b = a++) { const za = P[a * 2 + 1], zb = P[b * 2 + 1]; if ((za > z) !== (zb > z) && x < ((P[b * 2] - P[a * 2]) * (z - za)) / (zb - za) + P[a * 2]) w = !w; } return w; };
    const p = W.along(i, 0), level = lakeLevel(map, p.x - p.nx, p.z - p.nz, H);
    if (level !== null) out.push({ land: makeLand(inside, { minX: x0, maxX: x1, minZ: z0, maxZ: z1 }, 4, LAKE_REACH + 16), level, loop: i });
  }
  byH.set(key, out);
  return out;
}

/** How far out from a lake its bowl may reach (m), how steep it rises (a share of the hills' maxSlope), and the blend (m). */
export const LAKE_REACH = 160, LAKE_SLOPE = 0.6, LAKE_BLEND = 6;

/** How far round a lake's shore its level is sought (m, for the lowest ground round it), and how far under that the water lies. */
export const LAKE_EASE = 24, LAKE_DROP = 1.2;
const LEVELS = new WeakMap<object, Map<string, Map<number, number>>>();
/** The water level (m, as terrainAt's heights) of the lake nearest (x, z): the lowest of the hills (before any lake) along its
 *  shore and across the band round it, LAKE_DROP under, and the same for lakes within twice that band of each other (no step in
 *  the strip between them); null with no lakes. The same for every point of one lake. */
export function lakeLevel(map: ForestMap, x: number, z: number, H: HillsTuning): number | null {
  const L = map.bounds?.lakes;
  if (!L || !H.on) return null;
  const i = Math.max(0, Math.min(L.cols - 1, Math.round((x - L.x0) / L.step))), j = Math.max(0, Math.min(L.rows - 1, Math.round((z - L.z0) / L.step))), sg = L.seg[j * L.cols + i];
  if (sg < 0) return null;
  return levelsOf(map, H).get(L.segLoop[sg]) ?? null;
}
/** Every lake's level by its loop (lakeLevel's). */
function levelsOf(map: ForestMap, H: HillsTuning): Map<number, number> {
  const L = map.bounds.lakes!, key = `${H.amplitude}|${H.scale}|${H.octaves}`;
  let byH = LEVELS.get(L);
  if (!byH) LEVELS.set(L, (byH = new Map()));
  let out = byH.get(key);
  if (out) return out;
  out = new Map();
  const raw = (px: number, pz: number) => hillsAt(px, pz, map.seed + 6113, H) + H.amplitude * layoutBias(map, px, pz);
  const loops = L.loops.map((_, i) => i).filter(i => L.loops[i].sea), own = new Map<number, number>(), group = new Map<number, number>();
  // (round each shore every 6 m, at the water's edge and out across the band: never water above the ground round it)
  for (const i of loops) {
    let lo = Infinity;
    for (let s = 0; s < L.loops[i].length; s += 6) { const p = L.along(i, s); for (const o of [0, LAKE_EASE / 2, LAKE_EASE]) lo = Math.min(lo, raw(p.x + p.nx * o, p.z + p.nz * o)); }
    own.set(i, Number.isFinite(lo) ? lo : 0);
    group.set(i, i);
  }
  // (lakes near each other share the lowest of their levels)
  const root = (i: number): number => (group.get(i) === i ? i : root(group.get(i)!));
  for (const a of loops) for (const b of loops) {
    if (b <= a || root(a) === root(b)) continue;
    const A = L.loops[a].pts, B = L.loops[b].pts;
    let near = false;
    for (let p = 0; p < A.length && !near; p += 8) for (let q = 0; q < B.length; q += 8) if (Math.hypot(A[p] - B[q], A[p + 1] - B[q + 1]) < LAKE_EASE * 2) { near = true; break; }
    if (near) group.set(root(b), root(a));
  }
  const low = new Map<number, number>();
  for (const i of loops) low.set(root(i), Math.min(low.get(root(i)) ?? Infinity, own.get(i)!));
  for (const i of loops) out.set(i, low.get(root(i))! - LAKE_DROP);
  byH.set(key, out);
  return out;
}

const DRAWN = new WeakMap<ForestMap, HillsTuning>();
/** How much denser trees grow at (x, z) for the lie of the land (Ed: "thicker in lower areas and sparser in higher
 *  areas"): 1 + trees in the lowest ground down to 1 - trees on the highest, 1 with the layout or hills off. */
export function lowlandDensity(map: ForestMap, x: number, z: number): number {
  const L = map.tuning.ground.layout;
  if (!L?.on || !L.trees || !map.tuning.ground.hills.on) return 1;
  let H = DRAWN.get(map);
  if (!H) DRAWN.set(map, H = drawnHills(map.tuning));
  const v = terrainAt(map, x, z, H) / Math.max(1, H.amplitude * 0.5); // (most of the land lies within half the amplitude)
  return 1 - L.trees * Math.max(-1, Math.min(1, v));
}
