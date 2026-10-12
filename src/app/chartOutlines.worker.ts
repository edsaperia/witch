// The sea chart's islands as they really are, made off the page's thread (Ed, 2026-10-11: "the islands larger and more detailed
// (do we have the hill shader information?)"): each island's map (rules/map.ts generateMap, its land, areas and their types, as
// the night plays it; a placeholder's, uncharted, its land alone: islandLand), and from it its coast's loops (hotel's
// islandOutline, metres from home's middle) and a grid of its ground: its height (the coast rising out of the sea, the game's
// own hills, rules/terrain.ts hillsAt as drawn) and its colour (each area its type's floor, art/areas.js; home's its own; sand on
// the beach). Each takes about 0.4 to 2 s, about a minute for all 65, so the chart shows each island's round coast first and
// swaps in its land as it arrives. The page sends the world, the kinds she's found (home's size) and the islands in the order
// wanted; `{ first }` moves one to the front (the one just chosen).
import { generateMap, islandLand, HOME_LOOK } from "../rules/map";
import { beachOf } from "../rules/mapShape";
import { drawnHills, hillsAt } from "../rules/terrain";
import { homeIsland, islandOf, isPlaceholder, knownKinds } from "../rules/rosters";
import { TUNING } from "../rules/tuning";
import { AREAS } from "../../art/areas.js";
import type { LandMap } from "../rules/land";

/** The page's asks: the islands to make (`ids` in order), or one to make next. */
export type OutlineAsk = { world: number; found: string[]; ids: string[]; step: number } | { first: string };
/** An island's ground on a grid (metres from home's middle): its first sample, the step, samples across and down; each sample's
 *  height (m: below 0 the sea, or a lake) and colour (r, g, b). */
export interface IslandGround { x0: number; z0: number; step: number; cols: number; rows: number; h: Float32Array; rgb: Uint8Array }
/** Each island as it's made: its coast's loops (x, z in metres from its home's middle; `sea` a coast, else a lake's shore), their
 *  box, and its ground. */
export interface OutlineDone { id: string; world: number; loops: { pts: Float32Array; sea: boolean }[]; box: { minX: number; maxX: number; minZ: number; maxZ: number }; far: number; ground: IslandGround }

let queue: string[] = [], job: { world: number; found: string[]; step: number } | null = null, busy = false;
const post = (m: OutlineDone, t: Transferable[]) => (self as unknown as { postMessage(m: unknown, t: Transferable[]): void }).postMessage(m, t);

/** HSV (0..1) to RGB bytes. */
function hsv(h: number, s: number, v: number): [number, number, number] {
  const f = (n: number) => { const k = (n + h * 6) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return [Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255)];
}
// each area type's ground (its floor's hue, saturation and value, a little lifted to read at night), and home's
const FLOORS = (AREAS as unknown as { floor: [string, number, number, number] }[]).map(a => hsv(a.floor[1], Math.min(1, a.floor[2] * 1.1), Math.min(1, a.floor[3] * 1.25 + 0.06)));
const HOME_GROUND = hsv(0.3, 0.45, 0.5), SAND = hsv(0.12, 0.3, 0.6), BARE = hsv(0.32, 0.3, 0.4);
/** The ground's samples across an island's longer side. */
const ACROSS = 150;

function ground(land: LandMap, centre: { x: number; z: number }, seed: number, lookAt: ((x: number, z: number) => number) | null, sand: (x: number, z: number, d: number) => boolean): IslandGround {
  const b = land.box, pad = 60, w = b.maxX - b.minX + pad * 2, d = b.maxZ - b.minZ + pad * 2;
  const step = Math.max(12, Math.max(w, d) / ACROSS), cols = Math.ceil(w / step) + 1, rows = Math.ceil(d / step) + 1;
  const x0 = b.minX - pad, z0 = b.minZ - pad, H = drawnHills(TUNING), h = new Float32Array(cols * rows), rgb = new Uint8Array(cols * rows * 3);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = x0 + c * step, z = z0 + r * step, i = r * cols + c, dist = land.distAt(x, z);
    if (dist <= 0) { h[i] = Math.max(-30, dist * 0.5) - 4; rgb.set(SAND, i * 3); continue; } // (under the water: the sea or a lake)
    // the coast rising out of the sea over the beach and on up, the hills on top
    const rise = 26 * Math.min(1, dist / 320) ** 0.8;
    h[i] = 1 + rise + Math.max(0, hillsAt(x, z, seed, H) + H.amplitude * 0.5) * Math.min(1, dist / 200);
    const look = lookAt ? lookAt(x, z) : -1, base = sand(x, z, dist) ? SAND : look === HOME_LOOK ? HOME_GROUND : look >= 0 ? FLOORS[look] ?? BARE : BARE;
    rgb.set(base, i * 3);
  }
  return { x0: x0 - centre.x, z0: z0 - centre.z, step, cols, rows, h, rgb };
}

function make(id: string, world: number, found: string[], step: number): OutlineDone | null {
  const island = id === "home" ? homeIsland(world, knownKinds(found)) : islandOf(id, world);
  if (!island) return null;
  let land: LandMap, centre: { x: number; z: number }, lookAt: ((x: number, z: number) => number) | null = null, sand: (x: number, z: number, d: number) => boolean;
  if (id !== "home" && isPlaceholder(id)) { // uncharted: its land alone
    const l = islandLand(island, TUNING, step);
    land = l.land; centre = l.home; sand = (_x, _z, d) => d < (TUNING.beach?.width ?? 60);
  } else { // its whole map, as the night plays it (its areas and their types; the run's seed only places what's inside)
    const t = { ...TUNING, map: { ...TUNING.map, island: id, world, found, islandAreas: id === "home" ? knownKinds(found).length : TUNING.map?.islandAreas } };
    const map = generateMap(1, t as typeof TUNING), L = map.bounds.land;
    if (!L) return null;
    land = L; centre = { x: map.dancefloor.x, z: map.dancefloor.z }; lookAt = (x, z) => map.areaAt(x, z).look;
    const beach = beachOf(map.bounds, TUNING);
    sand = (x, z, d) => (beach ? beach.intoSand(x, z) > 0 : d < 60);
  }
  let far = 0;
  const loops = land.loops.map(l => {
    const pts = new Float32Array(l.pts.length);
    for (let i = 0; i < pts.length; i += 2) { pts[i] = l.pts[i] - centre.x; pts[i + 1] = l.pts[i + 1] - centre.z; if (l.sea) far = Math.max(far, Math.hypot(pts[i], pts[i + 1])); }
    return { pts, sea: l.sea };
  });
  const b = land.box;
  return { id, world, loops, box: { minX: b.minX - centre.x, maxX: b.maxX - centre.x, minZ: b.minZ - centre.z, maxZ: b.maxZ - centre.z }, far, ground: ground(land, centre, island.seed, lookAt, sand) };
}

function next(): void {
  const id = queue.shift();
  if (!id || !job) { busy = false; return; }
  try {
    const o = make(id, job.world, job.found, job.step);
    if (o) post(o, [...o.loops.map(l => l.pts.buffer), o.ground.h.buffer, o.ground.rgb.buffer]);
  } catch (e) { console.warn(`sea chart: ${id}'s island`, e); }
  setTimeout(next, 0); // (between islands, so a `first` can come in)
}

self.onmessage = (e: MessageEvent<OutlineAsk>) => {
  const m = e.data;
  if ("first" in m) { const i = queue.indexOf(m.first); if (i > 0) { queue.splice(i, 1); queue.unshift(m.first); } return; }
  job = { world: m.world, found: m.found, step: m.step }; queue = [...m.ids];
  if (!busy) { busy = true; setTimeout(next, 0); }
};
