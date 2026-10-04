// Ground cover (Ed, v171: so the ground doesn't look flat): tiny tufts of grass, fern, heather,
// reeds, moss and clover scattered over the ground near the witch, each area its own kinds and
// thickness (groundCover in config/area-types.json). Every tuft is seeded from its place on a
// fine grid, so a patch always comes out the same and needs no saving. None on paths, the
// dancefloor's clearing or ground kept clear (set pieces, soundsystems, the treehouse); thicker
// along path edges. No drawing here.
import { hash2 } from "./random";
import { AREA_TYPES, type ForestMap } from "./map";
import { floorClearing } from "./speakers";

export const TUFT_KINDS = ["blades", "fern", "heather", "reeds", "moss", "clover"] as const;
export interface Tuft { x: number; z: number; /** index in TUFT_KINDS */ kind: number; /** size factor */ size: number; /** area type */ type: number; flip: boolean }

/** The tufts in grid cell (ci, cj), cell metres square, one chance every `spacing` metres, scaled by `density`. */
export function tuftsInCell(map: ForestMap, ci: number, cj: number, cell: number, spacing: number, density: number): Tuft[] {
  const out: Tuft[] = [], s = map.seed, n = Math.max(1, Math.round(cell / spacing)), d = map.dancefloor, R = floorClearing(map.tuning);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const gi = ci * n + i, gj = cj * n + j, roll = hash2(gi, gj, s + 1101);
    if (roll >= density * 1.8) continue; // out of the running even at a path's edge: skip the lookups
    const x = (gi + 0.15 + hash2(gi, gj, s + 1102) * 0.7) * spacing, z = (gj + 0.15 + hash2(gi, gj, s + 1103) * 0.7) * spacing;
    const a = map.areaAt(x, z), G = AREA_TYPES[a.type].groundCover;
    let k = density * G.density;
    if (k <= 0) continue;
    if (Math.hypot(x - d.x, z - d.z) < R || map.hardClear(x, z)) continue;
    const onPath = map.paths.at(x, z);
    if (onPath) continue;
    if (map.paths.at(x, z, 2.5)) k *= 1.8; // thick along the edges
    if (roll >= k) continue;
    const kinds = G.kinds.map(name => TUFT_KINDS.indexOf(name as (typeof TUFT_KINDS)[number])).filter(v => v >= 0);
    out.push({ x, z, type: a.type, kind: kinds.length ? kinds[Math.floor(hash2(gi, gj, s + 1104) * kinds.length)] : 0, size: 0.7 + hash2(gi, gj, s + 1105) * 0.6, flip: hash2(gi, gj, s + 1106) < 0.5 });
  }
  return out;
}
