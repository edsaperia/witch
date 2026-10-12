// The sea chart's islands as they really are, made off the page's thread (Ed, 2026-10-11: "the islands larger and more detailed
// (do we have the hill shader information?)"): each island's map (rules/map.ts generateMap, its land, areas and their types, as
// the night plays it; a placeholder's, uncharted, its land alone: islandLand), and from it its coast's loops (hotel's
// islandOutline, metres from home's middle; its lakes' shores too) and a grid of its ground: its height (the coast rising out of
// the sea, the game's own terrain, rules/terrain.ts terrainAt: its hills and the hollows its lakes lie in), its lakes' water and
// levels (lakeLevel), and its colour, painted as a map's terrain by its biome (Ed, 2026-10-12: "natural land colours", "colour it
// themed by its biome"): lowlands, uplands, rock and heights by height and steepness, darker where the trees stand thick, sand
// on the beach. Each takes about 0.4 to 2 s, about a minute for all 65, so the chart shows each island's round coast first and
// swaps in its land as it arrives. The page sends the world, the kinds she's found (home's size) and the islands in the order
// wanted; `{ first }` moves one to the front (the one just chosen).
import { generateMap, islandLand } from "../rules/map";
import { beachOf } from "../rules/mapShape";
import { drawnHills, hillsAt, lakeLevel, terrainAt } from "../rules/terrain";
import { homeIsland, islandOf, isPlaceholder, KINDS, knownKinds } from "../rules/rosters";
import { TUNING } from "../rules/tuning";
import type { LandMap } from "../rules/land";

/** The page's asks: the islands to make (`ids` in order), or one to make next. */
export type OutlineAsk = { world: number; found: string[]; ids: string[]; step: number } | { first: string } | { detail: string };
/** An island's ground on a grid (metres from home's middle): its first sample, the step, samples across and down; each sample's
 *  height (m: below 0 the sea; a lake's its bed), colour (r, g, b), water and a lake's level. */
export interface IslandGround { x0: number; z0: number; step: number; cols: number; rows: number; h: Float32Array; rgb: Uint8Array; /** 0 land, 1 sea, 2 lake */ water: Uint8Array; /** a lake's water level (m, as h) */ level: Float32Array }
/** Each island as it's made: its coast's loops (x, z in metres from its home's middle; `sea` a coast, else a lake's shore), their
 *  box, and its ground. */
export interface OutlineDone { id: string; world: number; loops: { pts: Float32Array; sea: boolean }[]; box: { minX: number; maxX: number; minZ: number; maxZ: number }; far: number; ground: IslandGround; /** the fine grid, for the chart's close zoom (asked for by `detail`) */ detail?: boolean }

let queue: string[] = [], detail: string | null = null, job: { world: number; found: string[]; step: number } | null = null, busy = false;
const post = (m: OutlineDone, t: Transferable[]) => (self as unknown as { postMessage(m: unknown, t: Transferable[]): void }).postMessage(m, t);

/** HSV (0..1) to RGB (0..1). */
function hsv(h: number, s: number, v: number): [number, number, number] {
  const f = (n: number) => { const k = (n + h * 6) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return [f(5), f(3), f(1)];
}
type RGB = [number, number, number];
/** A biome's land colours, as a map's terrain is painted (Ed, 2026-10-12: "natural land colours", "colour it themed by its
 *  biome"): its lowlands, uplands, rock and heights, its beach, and its forest (how the ground darkens where trees stand thick).
 *  By the kind's biome (config/kinds.json, by its island's direction: north cold, south hot, east rocky, west jungle, the
 *  diagonals between; today's 32 temperate). */
interface Palette { low: RGB; up: RGB; rock: RGB; peak: RGB; sand: RGB; forest: RGB }
const PALETTES: Record<string, Palette> = {
  temperate: { low: hsv(0.27, 0.42, 0.5), up: hsv(0.2, 0.36, 0.46), rock: hsv(0.09, 0.18, 0.44), peak: hsv(0.1, 0.08, 0.62), sand: hsv(0.12, 0.32, 0.66), forest: hsv(0.33, 0.55, 0.3) },
  cold: { low: hsv(0.3, 0.16, 0.5), up: hsv(0.45, 0.1, 0.56), rock: hsv(0.6, 0.1, 0.48), peak: hsv(0.58, 0.04, 0.86), sand: hsv(0.1, 0.1, 0.62), forest: hsv(0.42, 0.35, 0.3) },
  hot: { low: hsv(0.11, 0.42, 0.66), up: hsv(0.08, 0.5, 0.58), rock: hsv(0.04, 0.45, 0.46), peak: hsv(0.09, 0.3, 0.7), sand: hsv(0.12, 0.3, 0.76), forest: hsv(0.2, 0.45, 0.38) },
  rocky: { low: hsv(0.25, 0.14, 0.46), up: hsv(0.6, 0.1, 0.44), rock: hsv(0.62, 0.12, 0.36), peak: hsv(0.6, 0.06, 0.6), sand: hsv(0.1, 0.12, 0.58), forest: hsv(0.36, 0.3, 0.3) },
  jungle: { low: hsv(0.36, 0.62, 0.42), up: hsv(0.32, 0.58, 0.36), rock: hsv(0.25, 0.3, 0.3), peak: hsv(0.3, 0.25, 0.44), sand: hsv(0.13, 0.36, 0.66), forest: hsv(0.38, 0.75, 0.22) },
  "mountains and glaciers": { low: hsv(0.33, 0.22, 0.44), up: hsv(0.55, 0.12, 0.5), rock: hsv(0.6, 0.1, 0.42), peak: hsv(0.55, 0.06, 0.92), sand: hsv(0.1, 0.1, 0.6), forest: hsv(0.4, 0.4, 0.28) },
  "mangrove swamp": { low: hsv(0.24, 0.42, 0.38), up: hsv(0.2, 0.36, 0.36), rock: hsv(0.12, 0.26, 0.34), peak: hsv(0.15, 0.2, 0.46), sand: hsv(0.12, 0.3, 0.5), forest: hsv(0.3, 0.6, 0.22) },
  "cold rainforest": { low: hsv(0.4, 0.42, 0.36), up: hsv(0.42, 0.32, 0.38), rock: hsv(0.55, 0.12, 0.38), peak: hsv(0.55, 0.06, 0.7), sand: hsv(0.1, 0.14, 0.56), forest: hsv(0.42, 0.6, 0.2) },
  badlands: { low: hsv(0.07, 0.4, 0.56), up: hsv(0.04, 0.45, 0.48), rock: hsv(0.02, 0.4, 0.38), peak: hsv(0.06, 0.25, 0.6), sand: hsv(0.1, 0.3, 0.68), forest: hsv(0.18, 0.4, 0.34) },
};
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const smooth = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** The ground's samples across an island's longer side: for the whole chart, and the chosen island's close-up (Ed, 2026-10-12:
 *  "the islands should be larger at full zoom"). */
const ACROSS = 150, DETAIL_ACROSS = 420;
/** How far past the land the grid reaches (m): the shallows fading out from the coast. */
const SEA_PAD = 260;

/** What an island's ground is drawn from: its coast, its lakes, its heights (m, as the game's terrain: hills, the hollows the
 *  lakes lie in), each lake's water level, how thick the trees stand, where the beach is, and its biome. */
interface Source {
  land: LandMap; lakes: LandMap | null; centre: { x: number; z: number }; biome: string;
  heightAt(x: number, z: number): number; levelAt(x: number, z: number): number | null; forest(x: number, z: number): number; sand(x: number, z: number, d: number): boolean;
}

function ground(src: Source, across = ACROSS): IslandGround {
  const { land, lakes } = src, b = land.box, pad = SEA_PAD, w = b.maxX - b.minX + pad * 2, d = b.maxZ - b.minZ + pad * 2;
  const step = Math.max(across > ACROSS ? 4 : 12, Math.max(w, d) / across), cols = Math.ceil(w / step) + 1, rows = Math.ceil(d / step) + 1;
  const x0 = b.minX - pad, z0 = b.minZ - pad, n = cols * rows;
  const h = new Float32Array(n), level = new Float32Array(n), water = new Uint8Array(n), rgb = new Uint8Array(n * 3), t = new Float32Array(n), dist = new Float32Array(n);
  // the terrain's heights over the land, and their range (the colours go by height within it)
  let lo = Infinity, hi = -Infinity;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = x0 + c * step, z = z0 + r * step, i = r * cols + c;
    dist[i] = land.distAt(x, z);
    if (dist[i] <= 0) continue;
    t[i] = src.heightAt(x, z); lo = Math.min(lo, t[i]); hi = Math.max(hi, t[i]);
  }
  const span = Math.max(1, hi - lo);
  // the height drawn: the coast rising out of the sea over the beach and on up, the terrain above its lowest (eased in from the shore)
  const drawn = (tm: number, dm: number) => 1 + 26 * Math.min(1, dm / 320) ** 0.8 + (tm - lo) * Math.min(1, dm / 200);
  const P = PALETTES[src.biome] ?? PALETTES.temperate;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = x0 + c * step, z = z0 + r * step, i = r * cols + c, dm = dist[i];
    if (dm <= 0) { h[i] = Math.max(-200, dm) - 1; water[i] = 1; continue; } // (the sea: as deep as it is far from the shore)
    h[i] = drawn(t[i], dm);
    if (lakes && lakes.distAt(x, z) > 0) { // a lake: its bed, and its water's level
      const lv = src.levelAt(x, z);
      water[i] = 2; level[i] = lv == null ? h[i] + 1 : drawn(lv, dm);
      if (level[i] <= h[i]) level[i] = h[i] + 0.5;
    }
  }
  // the colours: by height (lowlands, uplands, rock, heights), steepness (bare rock on the steep), forest, and the beach
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = x0 + c * step, z = z0 + r * step, i = r * cols + c;
    if (water[i] === 1) continue;
    const e = (t[i] - lo) / span, gx = (h[Math.min(n - 1, i + 1)] - h[Math.max(0, i - 1)]) / (2 * step), gz = (h[Math.min(n - 1, i + cols)] - h[Math.max(0, i - cols)]) / (2 * step), slope = Math.hypot(gx, gz);
    let col = mix(P.low, P.up, smooth(0.25, 0.55, e));
    col = mix(col, P.forest, src.forest(x, z) * 0.55 * (1 - smooth(0.55, 0.8, e)));
    col = mix(col, P.rock, Math.max(smooth(0.62, 0.82, e), smooth(0.18, 0.4, slope)));
    col = mix(col, P.peak, smooth(0.84, 0.97, e));
    if (src.sand(x, z, dist[i])) col = P.sand;
    rgb[i * 3] = Math.round(col[0] * 255); rgb[i * 3 + 1] = Math.round(col[1] * 255); rgb[i * 3 + 2] = Math.round(col[2] * 255);
  }
  return { x0: x0 - src.centre.x, z0: z0 - src.centre.z, step, cols, rows, h, rgb, water, level };
}

/** The last few islands' sources (a close-up asks again for the one just made). */
const made = new Map<string, Source>();
export function make(id: string, world: number, found: string[], step: number, across = ACROSS): OutlineDone | null {
  const key = `${id}|${world}|${found.length}`;
  const had = made.get(key);
  if (had) return outlineOf(id, world, had, across);
  const island = id === "home" ? homeIsland(world, knownKinds(found)) : islandOf(id, world);
  if (!island) return null;
  const H = drawnHills(TUNING), biome = id === "home" ? "temperate" : KINDS[id]?.biome ?? "temperate";
  let src: Source;
  if (id !== "home" && isPlaceholder(id)) { // uncharted: its land alone, the hills as drawn, no forest known
    const l = islandLand(island, TUNING, step), lakes = l.lakes ?? null;
    src = { land: l.land, lakes, centre: l.home, biome, heightAt: (x, z) => hillsAt(x, z, island.seed, H), levelAt: () => null, forest: () => 0, sand: (_x, _z, d) => d < (TUNING.beach?.width ?? 60) };
  } else { // its whole map, as the night plays it (the run's seed only places what's inside: its shape, areas and lakes are the world's)
    const t = { ...TUNING, map: { ...TUNING.map, island: id, world, found, islandAreas: id === "home" ? knownKinds(found).length : TUNING.map?.islandAreas } };
    const map = generateMap(1, t as typeof TUNING), L = map.bounds.land;
    if (!L) return null;
    const beach = beachOf(map.bounds, TUNING);
    src = {
      land: L, lakes: map.bounds.lakes ?? null, centre: { x: map.dancefloor.x, z: map.dancefloor.z }, biome,
      heightAt: (x, z) => terrainAt(map, x, z, H), levelAt: (x, z) => lakeLevel(map, x, z, H), forest: (x, z) => map.treeWeight(x, z),
      sand: (x, z, d) => (beach ? beach.intoSand(x, z) > 0 : d < 60),
    };
  }
  made.set(key, src); if (made.size > 4) made.delete(made.keys().next().value!);
  return outlineOf(id, world, src, across);
}

function outlineOf(id: string, world: number, src: Source, across: number): OutlineDone {
  const { land, centre } = src;
  let far = 0;
  const loops = [...land.loops, ...(src.lakes?.loops ?? []).map(l => ({ ...l, sea: false }))].map(l => {
    const pts = new Float32Array(l.pts.length);
    for (let i = 0; i < pts.length; i += 2) { pts[i] = l.pts[i] - centre.x; pts[i + 1] = l.pts[i + 1] - centre.z; if (l.sea) far = Math.max(far, Math.hypot(pts[i], pts[i + 1])); }
    return { pts, sea: l.sea };
  });
  const b = land.box;
  return { id, world, loops, box: { minX: b.minX - centre.x, maxX: b.maxX - centre.x, minZ: b.minZ - centre.z, maxZ: b.maxZ - centre.z }, far, ground: ground(src, across), detail: across > ACROSS };
}

function next(): void {
  const close = detail; detail = null; // (a close-up asked for goes first)
  const id = close ?? queue.shift();
  if (!id || !job) { busy = false; return; }
  try {
    const o = make(id, job.world, job.found, job.step, close ? DETAIL_ACROSS : ACROSS);
    if (o) post(o, [...o.loops.map(l => l.pts.buffer), o.ground.h.buffer, o.ground.rgb.buffer, o.ground.water.buffer, o.ground.level.buffer]);
  } catch (e) { console.warn(`sea chart: ${id}'s island`, e); }
  setTimeout(next, 0); // (between islands, so a `first` can come in)
}

self.onmessage = (e: MessageEvent<OutlineAsk>) => {
  const m = e.data;
  if ("detail" in m) { detail = m.detail; if (!busy && job) { busy = true; setTimeout(next, 0); } return; }
  if ("first" in m) { const i = queue.indexOf(m.first); if (i > 0) { queue.splice(i, 1); queue.unshift(m.first); } return; }
  job = { world: m.world, found: m.found, step: m.step }; queue = [...m.ids];
  if (!busy) { busy = true; setTimeout(next, 0); }
};
