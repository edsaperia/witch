// Ground cover (Ed, v171: so the ground doesn't look flat): tiny tufts of grass, fern, heather,
// reeds, moss and clover scattered over the ground near the witch, each area its own kinds and
// thickness (groundCover in config/area-types.json). Every tuft is seeded from its place on a
// fine grid, so a patch always comes out the same and needs no saving. None on paths, the
// dancefloor's clearing or ground kept clear (set pieces, soundsystems, the treehouse); thicker
// along path edges, and (given the forest) round the feet of trunks and rocks, with a ring of
// reeds round every pond. No drawing here.
import { hash2 } from "./random";
import { LOOKS, type ForestMap } from "./map";
import { floorClearing } from "./speakers";
import type { Forest } from "./forest";

export const TUFT_KINDS = ["blades", "fern", "heather", "reeds", "moss", "clover"] as const;
export interface Tuft { x: number; z: number; /** how open the ground is there (0 at an area's centre): the canopy's shade */ open: number; /** index in TUFT_KINDS */ kind: number; /** size factor */ size: number; /** area type */ type: number; flip: boolean }

/** The tufts in grid cell (ci, cj), cell metres square, one chance every `spacing` metres, scaled by `density`. */
export function tuftsInCell(map: ForestMap, ci: number, cj: number, cell: number, spacing: number, density: number, forest?: Forest): Tuft[] {
  const out: Tuft[] = [], s = map.seed, n = Math.max(1, Math.round(cell / spacing)), d = map.dancefloor, R = floorClearing(map.tuning);
  // What tufts gather round (Ed, 2026-10-04: "extra grass touches"): trunks and rocks (not right
  // against them), and ponds, ringed with reeds; none in the water.
  const span = n * spacing, mx = (ci + 0.5) * span, mz = (cj + 0.5) * span, REEDS = TUFT_KINDS.indexOf("reeds"); // (the cell's true size: whole tufts across)
  const feet: [number, number, number][] = [], ponds: [number, number, number][] = [];
  if (forest) {
    for (const p of forest.treesNear(mx, mz, span / 2 + 2)) feet.push([p.x, p.z, 0.35]);
    for (const r of forest.decorNear(mx, mz, span / 2 + 3)) if (r.family === "rocks") feet.push([r.x, r.z, 1.1]);
    for (const l of forest.lightsNear(mx, mz, span / 2 + 8)) if (l.kind === "pond") ponds.push([l.x, l.z, 3 * l.size]);
  }
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const gi = ci * n + i, gj = cj * n + j, roll = hash2(gi, gj, s + 1101);
    if (roll >= density * 3) continue; // out of the running even at a path's edge by a trunk's foot: skip the lookups
    const x = (gi + 0.15 + hash2(gi, gj, s + 1102) * 0.7) * spacing, z = (gj + 0.15 + hash2(gi, gj, s + 1103) * 0.7) * spacing;
    const a = map.areaAt(x, z), G = LOOKS[a.look].groundCover;
    let k = density * G.density, reed = false;
    for (const [px, pz, pr] of ponds) {
      const pd = Math.hypot(x - px, z - pz);
      if (pd < pr) { k = 0; break; }
      if (pd < pr + 1.6) { k = Math.max(k, density * 0.9); reed = true; }
    }
    for (const [fx, fz, fr] of feet) {
      const fd = Math.hypot(x - fx, z - fz);
      if (fd < fr) { k = 0; break; }
      if (fd < fr + 1.4) k *= 1.6;
    }
    if (k <= 0) continue;
    if (Math.hypot(x - d.x, z - d.z) < R || map.hardClear(x, z)) continue;
    const onPath = map.paths.at(x, z);
    if (onPath) continue;
    if (map.paths.at(x, z, 2.5)) k *= 1.8; // thick along the edges
    if (roll >= k) continue;
    // An area's arena: a little thinner in its open middle, following its falloff (asked only of the tufts that would grow).
    const A = map.tuning.arena;
    if (A && roll >= k * (A.tufts + (1 - A.tufts) * map.arenaOpen(x, z, a.cell))) continue;
    const kinds = G.kinds.map(name => TUFT_KINDS.indexOf(name as (typeof TUFT_KINDS)[number])).filter(v => v >= 0);
    out.push({ x, z, open: a.openness, type: a.look, kind: reed && REEDS >= 0 ? REEDS : kinds.length ? kinds[Math.floor(hash2(gi, gj, s + 1104) * kinds.length)] : 0, size: 0.7 + hash2(gi, gj, s + 1105) * 0.6, flip: hash2(gi, gj, s + 1106) < 0.5 });
  }
  return out;
}
