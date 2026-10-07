// The lie of the land (Ed's idea, as the coordinator relayed it, 2026-10-07: "we still know where hills and valleys are made by the shader; we could use this
// as part of the map layout generator; higher areas could be made where runestones are; lower areas could be made where
// legends are; trees could be thicker in lower areas and sparser in higher areas"): the hills' height as the map lays it
// out, with no Three.js, so the rules (the trees' density) and the drawing (render/height.ts, the rolling ground) read
// the same land. The rules still move on flat ground: only where trees grow follows it.
import type { ForestMap } from "./map";
import { smoothstep, vnoise } from "./random";
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
  return hillsAt(x, z, map.seed + 6113, H) + H.amplitude * layoutBias(map, x, z);
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
