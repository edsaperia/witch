// Lakes (Ed, 2026-10-11, the journey's irregular islands and lakes: docs/backlog/journey.md): some of an island's areas, from
// phase 1 on, are water (rules/islandGrowth.ts placeLakes; never home or its neighbours, the rest of the island still joined).
// Their water is the lakes' own land map (rules/land.ts, `bounds.lakes`: its "land" the lakes' water, so + in a lake and -
// ashore), apart from the island's (whose coast is the sea's alone: her flight's edge, the beach, the sea's life). No beaches
// but a small shore (the area's own floor running into the water: render/ground.ts); she flies over them in the treetops but
// never lands on the water; on foot she, and every creature, stops at the shore (Ed, 2026-10-11: "a creature knocked toward a
// lake stops at the shore"). No drawing here.
import type { Bounds } from "./mapShape";
import { hash2 } from "./random";

/** The lakes' knobs (the tuning's lakes): shore, metres of bare shore round the water (no trees, nothing placed); pad, how far
 *  from the water anything on foot stops; koi, the share of lakes with koi in them (the view's). */
export interface LakeKnobs { shore: number; pad: number; koi: number }
export const LAKES: LakeKnobs = { shore: 4, pad: 1.5, koi: 0.5 };
export const lakeKnobs = (t: { lakes?: Partial<LakeKnobs> }): LakeKnobs => ({ ...LAKES, ...t.lakes });

/** How far into a lake (x, z) is (m): + on the water, - ashore (-Infinity with no lakes, or well clear of them). */
export function lakeDepth(b: Bounds, x: number, z: number): number {
  const L = b.lakes;
  if (!L) return -Infinity;
  const B = L.box;
  if (x < B.minX - 64 || x > B.maxX + 64 || z < B.minZ - 64 || z > B.maxZ + 64) return -Infinity;
  const r = L.roughDistAt(x, z);
  return r < -2 * L.step - 8 ? r : L.distAt(x, z); // (well ashore: the nearest sample's is near enough)
}

/** Is (x, z) on a lake's water, or within `pad` metres of it? */
export const onLake = (b: Bounds, x: number, z: number, pad = 0): boolean => lakeDepth(b, x, z) > -pad;

/** The nearest point to (x, z) at least `pad` metres ashore of every lake (itself if it is). */
export function ashore(b: Bounds, x: number, z: number, pad: number): { x: number; z: number } {
  const L = b.lakes;
  if (!L) return { x, z };
  let px = x, pz = z;
  for (let k = 0; k < 4; k++) {
    const d = lakeDepth(b, px, pz);
    if (d <= -pad) return k ? { x: px, z: pz } : { x, z };
    const n = L.inward(px, pz); // (into the water)
    px -= n.x * (d + pad + 0.01); pz -= n.z * (d + pad + 0.01);
  }
  return { x: px, z: pz };
}

/** Anything on foot stopped at a lake's shore (Ed, 2026-10-11): moved from (fromX, fromZ) to (x, z), kept `pad` metres ashore,
 *  sliding along the shore by what of its step ran along it (and, when it walked nearly straight at the water, a nudge
 *  along it of `nudge` of its step, the way its step leaned, so nothing stands stuck facing a lake; 0 for none, as for her:
 *  she slides only as she steers). Null when (x, z) is ashore already. */
export function stopAtShore(b: Bounds, fromX: number, fromZ: number, x: number, z: number, pad: number, nudge = 0.3): { x: number; z: number; nx: number; nz: number } | null {
  const L = b.lakes;
  if (!L) return null;
  const d = lakeDepth(b, x, z);
  if (d <= -pad) return null;
  const n = L.inward(x, z), p = ashore(b, x, z, pad), sx = x - fromX, sz = z - fromZ, step = Math.hypot(sx, sz);
  // (head on: the tangent's share of its step is nil; a nudge along the shore, its way by the step's lean, or the left)
  const tx = -n.z, tz = n.x, along = sx * tx + sz * tz;
  if (nudge > 0 && step > 1e-6 && Math.abs(along) < step * 0.5) {
    const sgn = along >= 0 ? 1 : -1, k = step * nudge;
    const q = ashore(b, p.x + tx * sgn * k, p.z + tz * sgn * k, pad);
    return { x: q.x, z: q.z, nx: -n.x, nz: -n.z };
  }
  return { x: p.x, z: p.z, nx: -n.x, nz: -n.z };
}

/** Everything on foot kept ashore of the lakes (Ed, 2026-10-11): after every kind of movement, each step, a creature on a lake's
 *  water or within `pad` of it is put back on the shore, sliding along it toward where it's going (its target), so one walking
 *  at a lake goes round it. Those in the air (leaping, swooping) and burrowed pass over. */
export function creaturesAshore(creatures: readonly { x: number; z: number; tx: number; tz: number; gone?: boolean; burrow?: unknown; leap?: unknown; swoop?: unknown }[], b: Bounds, pad: number): void {
  const L = b.lakes;
  if (!L) return;
  const B = L.box, m = pad + 8;
  for (const c of creatures) {
    if (c.gone || c.burrow || c.leap || c.swoop) continue;
    if (c.x < B.minX - m || c.x > B.maxX + m || c.z < B.minZ - m || c.z > B.maxZ + m) continue;
    const dx = c.tx - c.x, dz = c.tz - c.z, d = Math.hypot(dx, dz), k = d > 1e-3 ? 0.15 / d : 0;
    const q = stopAtShore(b, c.x - dx * k, c.z - dz * k, c.x, c.z, pad);
    if (q) { c.x = q.x; c.z = q.z; }
  }
}

/** A lake's koi (Ed, 2026-10-11: "Lakes sometimes have Koi"): where they swim (round its deepest water), how far out, their
 *  seed and how many. The view's (render/ground.ts draws them under the water); here only which lakes have them. */
export interface KoiPond { x: number; z: number; r: number; seed: number; count: number }
const koiMade = new WeakMap<object, { key: string; ponds: KoiPond[] }>();
/** The lakes with koi: each lake (a loop of the lakes' map round its water) has them by `share` (seeded by the map), round its
 *  deepest point, as far out as half its depth there (6 to 30 m), 3 to 7 of them. Made once a map. */
export function koiPonds(b: Bounds, seed: number, share: number): KoiPond[] {
  const L = b.lakes;
  if (!L || share <= 0) return [];
  const key = `${seed}:${share}`, had = koiMade.get(L);
  if (had?.key === key) return had.ponds;
  // (each lake's deepest sample: its own loop's nearest)
  const deepest = new Map<number, number>();
  for (let k = 0; k < L.dist.length; k++) {
    const sg = L.seg[k];
    if (sg < 0 || L.dist[k] <= 0) continue;
    const loop = L.segLoop[sg], was = deepest.get(loop);
    if (was === undefined || L.dist[k] > L.dist[was]) deepest.set(loop, k);
  }
  const ponds: KoiPond[] = [];
  for (const [loop, k] of [...deepest].sort((a, b) => a[0] - b[0])) {
    if (!L.loops[loop].sea) continue; // (a loop round the lakes' "land": a lake's water)
    const h = hash2(loop, 17, seed + 131);
    if (h >= share) continue;
    ponds.push({ x: L.x0 + (k % L.cols) * L.step, z: L.z0 + Math.floor(k / L.cols) * L.step, r: Math.max(6, Math.min(30, L.dist[k] * 0.5)), seed: Math.floor(hash2(loop, 31, seed + 133) * 997) + 1, count: 3 + Math.floor(hash2(loop, 37, seed + 137) * 5) });
  }
  koiMade.set(L, { key, ponds });
  return ponds;
}

/** Where to head for (tx, tz) from (x, z) round the lakes (Ed, 2026-10-11): null (straight there) if no lake lies on the way within `look`
 *  metres ahead; else a point on round the lake's shore, `clear` metres off its water, `ahead` metres along it from her nearest
 *  point of it, the shorter way round to where the way comes out of the water. Stateless, so the same each step: as it goes
 *  round, the shorter way stays the shorter. */
export function roundLakes(b: Bounds, x: number, z: number, tx: number, tz: number, clear = 8, look = 120, ahead = 18): { x: number; z: number } | null {
  const L = b.lakes;
  if (!L || lakeDepth(b, x, z) < -look) return null; // (nowhere near one)
  const dx = tx - x, dz = tz - z, d = Math.hypot(dx, dz);
  if (d < 1) return null;
  // (along the way, every few metres: where it first goes into the water, and where it comes out)
  const n = Math.ceil(Math.min(d, look) / 4);
  let inAt = -1, outAt = -1;
  for (let i = 1; i <= n; i++) {
    const u = Math.min(d, (i * Math.min(d, look)) / n), wet = lakeDepth(b, x + (dx / d) * u, z + (dz / d) * u) > 0;
    if (wet && inAt < 0) inAt = u;
    if (!wet && inAt >= 0) { outAt = u; break; }
  }
  if (inAt < 0) return null;
  if (outAt < 0) { outAt = Math.min(d, look); for (let u = outAt; u < d; u += 6) if (lakeDepth(b, x + (dx / d) * u, z + (dz / d) * u) <= 0) { outAt = u; break; } }
  const me = L.shore(x, z), out = L.shore(x + (dx / d) * outAt, z + (dz / d) * outAt);
  if (me.loop !== out.loop) return null; // (a different water: let the shore stop sort it)
  const len = L.loops[me.loop].length, fwd = (((out.s - me.s) % len) + len) % len, way = fwd <= len - fwd ? 1 : -1;
  const p = L.along(me.loop, me.s + way * Math.min(ahead, way > 0 ? fwd : len - fwd));
  return { x: p.x + p.nx * clear, z: p.z + p.nz * clear }; // (n: out of the lakes' "land", the water: ashore)
}
