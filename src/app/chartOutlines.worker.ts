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
import { homeIsland, islandOf, isPlaceholder, knownKinds } from "../rules/rosters";
import { TUNING } from "../rules/tuning";
import { lakeKnobs } from "../rules/lakes";
import { islandBiome, lookOfLoop, loopMiddles, nearestLoop, LOOK_IDS, type Blend, type LakeLook } from "../rules/lakeLooks";
import type { LandMap } from "../rules/land";
import { CACHE_PREFIX, cacheGet, cacheKey, cachePrune, cachePut, keepCoast, OUTLINE_ACROSS, OUTLINE_DETAIL } from "./chartCache";
import { buildIslandMesh, meshBuffers, type IslandMesh } from "../render/chart/islandMesh";
import { K, SIGIL_TIERS } from "../render/chart/chartScale";
import { islandSigil } from "../../art/sigils.js";
import { sigilDetail } from "../../art/sigilDetail.js";

/** The page's asks: the islands to make (`ids` in order), or one to make next. */
/** The islands for a world (the closest first), the kinds she's found (home's size), the grid; `warm`: make and keep them only
 *  (app/chartWarm.ts, in the night), answering { warmed } as each is kept and { warmDone } at the end. Or: this one next; this
 *  one's fine grid next. */
export type OutlineAsk = { world: number; found: string[]; ids: string[]; step: number; warm?: boolean; /** only what's kept already: nothing made (the map table's miniature, Ed, 2026-10-13: never built while she's near the deck) */ cacheOnly?: boolean } | { first: string } | { detail: string };
/** A warm job's progress: an island kept (made, or already kept), then the end (how many made, how many already kept). */
export type WarmNote = { warmed: string; made: boolean } | { warmDone: true; made: number; kept: number };
/** An island's ground on a grid (metres from home's middle): its first sample, the step, samples across and down; each sample's
 *  height (m: below 0 the sea; a lake's its bed), colour (r, g, b), water and a lake's level. */
export interface IslandGround { x0: number; z0: number; step: number; cols: number; rows: number; h: Float32Array; rgb: Uint8Array; /** 0 land, 1 sea, 2 lake */ water: Uint8Array; /** a lake's water level (m, as h) */ level: Float32Array; /** each sample's lake look (an index in LOOK_IDS: its lake's, or the lake beside it on its shore; else 0) */ looks: Uint8Array; /** its biome: the two nearest by its bearing, and the first's share */ blend: Blend }

/** Each island as it's made: its coast's loops (x, z in metres from its home's middle; `sea` a coast, else a lake's shore), their
 *  box, and its ground. */
export interface OutlineDone { id: string; world: number; loops: { pts: Float32Array; sea: boolean }[]; box: { minX: number; maxX: number; minZ: number; maxZ: number }; far: number; ground: IslandGround; /** its meshes, made here with its ground (render/chart/islandMesh.ts) */ mesh: IslandMesh; /** its sigil's ink at each tier (SIGIL_TIERS, px across, a byte a pixel, row 0 at the top as art/sigilDetail.js draws it): drawn here, not on the page as the island arrives (home's 48 px was 80 ms there) */ sigils: { px: number; ink: Uint8Array }[]; /** the fine grid, for the chart's close zoom (asked for by `detail`) */ detail?: boolean }

let queue: string[] = [], detail: string | null = null, job: { world: number; found: string[]; step: number; warm?: boolean; cacheOnly?: boolean } | null = null, busy = false;
let warmMade = 0, warmKept = 0;
void cachePrune(CACHE_PREFIX);
const post = (m: OutlineDone, t: Transferable[]) => (self as unknown as { postMessage(m: unknown, t: Transferable[]): void }).postMessage(m, t);

/** HSV (0..1) to RGB (0..1). */
function hsv(h: number, s: number, v: number): [number, number, number] {
  const f = (n: number) => { const k = (n + h * 6) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return [f(5), f(3), f(1)];
}
type RGB = [number, number, number];
/** A biome's land colours, as a map's terrain is painted (Ed, 2026-10-12: "natural land colours", "colour it themed by its
 *  biome"): its lowlands, uplands, rock and heights, its beach, and its forest (how the ground darkens where trees stand thick).
 *  By the kind's biome (config/kinds.json, by its island's direction: north cold, south hot, east volcanic, west jungle, the
 *  diagonals between; 16 temperate). */
interface Palette { low: RGB; up: RGB; rock: RGB; peak: RGB; sand: RGB; forest: RGB }
const PALETTES: Record<string, Palette> = {
  temperate: { low: hsv(0.27, 0.42, 0.5), up: hsv(0.2, 0.36, 0.46), rock: hsv(0.09, 0.18, 0.44), peak: hsv(0.1, 0.08, 0.62), sand: hsv(0.12, 0.32, 0.66), forest: hsv(0.33, 0.55, 0.3) },
  cold: { low: hsv(0.3, 0.16, 0.5), up: hsv(0.45, 0.1, 0.56), rock: hsv(0.6, 0.1, 0.48), peak: hsv(0.58, 0.04, 0.86), sand: hsv(0.1, 0.1, 0.62), forest: hsv(0.42, 0.35, 0.3) },
  hot: { low: hsv(0.11, 0.42, 0.66), up: hsv(0.08, 0.5, 0.58), rock: hsv(0.04, 0.45, 0.46), peak: hsv(0.09, 0.3, 0.7), sand: hsv(0.12, 0.3, 0.76), forest: hsv(0.2, 0.45, 0.38) },
  jungle: { low: hsv(0.36, 0.62, 0.42), up: hsv(0.32, 0.58, 0.36), rock: hsv(0.25, 0.3, 0.3), peak: hsv(0.3, 0.25, 0.44), sand: hsv(0.13, 0.36, 0.66), forest: hsv(0.38, 0.75, 0.22) },
  "mountains and glaciers": { low: hsv(0.33, 0.22, 0.44), up: hsv(0.55, 0.12, 0.5), rock: hsv(0.6, 0.1, 0.42), peak: hsv(0.55, 0.06, 0.92), sand: hsv(0.1, 0.1, 0.6), forest: hsv(0.4, 0.4, 0.28) },
  "mangrove swamp": { low: hsv(0.24, 0.42, 0.38), up: hsv(0.2, 0.36, 0.36), rock: hsv(0.12, 0.26, 0.34), peak: hsv(0.15, 0.2, 0.46), sand: hsv(0.12, 0.3, 0.5), forest: hsv(0.3, 0.6, 0.22) },
  "cold rainforest": { low: hsv(0.4, 0.42, 0.36), up: hsv(0.42, 0.32, 0.38), rock: hsv(0.55, 0.12, 0.38), peak: hsv(0.55, 0.06, 0.7), sand: hsv(0.1, 0.14, 0.56), forest: hsv(0.42, 0.6, 0.2) },
  volcanic: { low: hsv(0.05, 0.2, 0.26), up: hsv(0.03, 0.18, 0.2), rock: hsv(0.62, 0.08, 0.16), peak: hsv(0.04, 0.75, 0.62), sand: hsv(0.08, 0.12, 0.34), forest: hsv(0.3, 0.45, 0.24) }, // (black basalt and ash, a glowing peak: the stegosaurus's island first, Ed, 2026-10-13; every east island since, Ed, 2026-10-23)
  badlands: { low: hsv(0.07, 0.4, 0.56), up: hsv(0.04, 0.45, 0.48), rock: hsv(0.02, 0.4, 0.38), peak: hsv(0.06, 0.25, 0.6), sand: hsv(0.1, 0.3, 0.68), forest: hsv(0.18, 0.4, 0.34) },
};
// What a biome's lakes become, and an island's biomes by its bearing: rules/lakeLooks.ts (the game's lakes take the same).
export { LOOK_IDS, LAKE_LOOKS, blendAt, type LakeLook, type Blend } from "../rules/lakeLooks";
/** Each look's rim on the shore round its lakes: its colour, how wide (m) and how strongly. */
const LAKE_RIMS: Record<LakeLook, { rgb: RGB; width: number; k: number }> = {
  water: { rgb: [0, 0, 0], width: 0, k: 0 },
  ice: { rgb: hsv(0.57, 0.1, 0.72), width: 26, k: 0.75 }, // frost
  lava: { rgb: hsv(0.03, 0.4, 0.13), width: 30, k: 0.9 }, // a dark crust
  oasis: { rgb: hsv(0.3, 0.7, 0.46), width: 44, k: 0.9 }, // palms and grass
  sinkhole: { rgb: hsv(0.34, 0.75, 0.3), width: 50, k: 0.95 }, // rainforest canopy right up to the pit's rim
  tarn: { rgb: hsv(0.58, 0.06, 0.6), width: 26, k: 0.8 }, // bare grey scree
  tar: { rgb: hsv(0.07, 0.35, 0.13), width: 24, k: 0.85 }, // a black, sticky shore
  rust: { rgb: hsv(0.1, 0.05, 0.95), width: 80, k: 0.95 }, // pale grey-white crusted ground round it
  lily: { rgb: hsv(0.3, 0.65, 0.4), width: 34, k: 0.85 }, // reeds
};
/** A sinkhole (Ed's reference, a jungle tiankeng): how far (m) its floor lies below its rim. */
const SINK = 26;
/** A seeded number in 0..1 from two integers. */
const rand = (a: number, b: number) => { let x = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x632be5ab, 0xc2b2ae35); x ^= x >>> 15; x = Math.imul(x, 0x2c1b3c6d); x ^= x >>> 12; return (x >>> 0) / 4294967296; };
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const smooth = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** The ground's samples across an island's longer side: for the whole chart, and the chosen island's close-up (Ed, 2026-10-12:
 *  "the islands should be larger at full zoom"). */
const ACROSS = OUTLINE_ACROSS, DETAIL_ACROSS = OUTLINE_DETAIL;
/** How far past the land the grid reaches (m): the shallows fading out from the coast. */
const SEA_PAD = 260;

/** What an island's ground is drawn from: its coast, its lakes, its heights (m, as the game's terrain: hills, the hollows the
 *  lakes lie in), each lake's water level, how thick the trees stand, where the beach is, and its biome. */
interface Source {
  land: LandMap; lakes: LandMap | null; centre: { x: number; z: number }; blend: Blend; /** its lakes' biomes (null: plain water) */ lakeBlend: Blend | null; /** the share of its lakes that take them (the rest plain water) */ lakeShare: number; seed: number;
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
  const B = src.blend, PA = PALETTES[B.a] ?? PALETTES.temperate, PB = PALETTES[B.b] ?? PALETTES.temperate;
  const P = Object.fromEntries((Object.keys(PA) as (keyof Palette)[]).map(k => [k, mix(PB[k], PA[k], B.w)])) as unknown as Palette;
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
  // each lake's look: one of the blend's two, by its odds, seeded by the lake (its shore loop: the same on every grid)
  const looks = new Uint8Array(n), shores = lakes ? loopMiddles(lakes) : [];
  const seen = new Uint8Array(n), stack: number[] = [];
  for (let i0 = 0; i0 < n; i0++) {
    if (water[i0] !== 2 || seen[i0]) continue;
    const part: number[] = []; let sx = 0, sz = 0; stack.push(i0); seen[i0] = 1;
    while (stack.length) {
      const i = stack.pop()!, r = (i / cols) | 0, c = i - r * cols; part.push(i); sx += x0 + c * step; sz += z0 + r * step;
      for (const j of [c > 0 ? i - 1 : -1, c < cols - 1 ? i + 1 : -1, i - cols, i + cols]) if (j >= 0 && j < n && water[j] === 2 && !seen[j]) { seen[j] = 1; stack.push(j); }
    }
    const look = LOOK_IDS.indexOf(lookOfLoop(nearestLoop(shores, sx / part.length, sz / part.length), src.seed, { blend: src.blend, lakeBlend: src.lakeBlend, lakeShare: src.lakeShare }));
    for (const i of part) looks[i] = look;
  }
  // a sinkhole is no lake but a dry pit: a lip just below its rim, sheer walls, a forest floor far below (`ring` in from its rim)
  const ring = new Uint8Array(n), queue: number[] = [];
  for (let i = 0; i < n; i++) if (water[i] === 2 && LOOK_IDS[looks[i]] === "sinkhole") {
    const c = i % cols;
    if ([c > 0 ? i - 1 : -1, c < cols - 1 ? i + 1 : -1, i - cols, i + cols].some(j => j >= 0 && j < n && water[j] !== 2)) { ring[i] = 1; queue.push(i); }
  }
  for (let q = 0; q < queue.length; q++) {
    const i = queue[q], c = i % cols;
    for (const j of [c > 0 ? i - 1 : -1, c < cols - 1 ? i + 1 : -1, i - cols, i + cols]) if (j >= 0 && j < n && water[j] === 2 && LOOK_IDS[looks[j]] === "sinkhole" && !ring[j]) { ring[j] = Math.min(255, ring[i] + 1); queue.push(j); }
  }
  for (let i = 0; i < n; i++) if (ring[i]) { const top = level[i]; h[i] = top - (ring[i] === 1 ? 3 : ring[i] === 2 ? SINK * 0.8 : SINK); level[i] = h[i]; }
  // how far (m) each land sample is from the nearest lake, and that lake's look, within the widest rim
  const near = new Float32Array(n).fill(Infinity), R = Math.ceil(Math.max(...Object.values(LAKE_RIMS).map(r => r.width)) / step);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c; if (water[i] !== 2 || !LAKE_RIMS[LOOK_IDS[looks[i]]].width) continue;
    for (let dr = -R; dr <= R; dr++) for (let dc = -R; dc <= R; dc++) {
      const rr = r + dr, cc = c + dc; if (rr < 0 || cc < 0 || rr >= rows || cc >= cols) continue;
      const j = rr * cols + cc, dd = Math.hypot(dr, dc) * step; if (water[j] === 0 && dd < near[j]) { near[j] = dd; looks[j] = looks[i]; }
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
    const rim = LAKE_RIMS[LOOK_IDS[looks[i]]];
    if (near[i] < rim.width) col = mix(col, rim.rgb, rim.k * (1 - smooth(0.35, 1, near[i] / rim.width))); // the lakes' rim
    if (ring[i]) { // the pit: pale limestone walls streaked green from its lip down, a cave-dark foot, its floor dark forest
      const v = rand(i, src.seed), stone = mix(hsv(0.11, 0.1, 1), hsv(0.28, 0.45, 0.6), v * 0.35);
      col = ring[i] === 1 ? stone : ring[i] === 2 ? mix(stone, hsv(0.3, 0.3, 0.5), 0.25) : ring[i] === 3 ? hsv(0.33, 0.5, 0.07) : mix(hsv(0.33, 0.6, 0.2), hsv(0.3, 0.5, 0.28), v);
    }
    rgb[i * 3] = Math.round(col[0] * 255); rgb[i * 3 + 1] = Math.round(col[1] * 255); rgb[i * 3 + 2] = Math.round(col[2] * 255);
  }
  return { x0: x0 - src.centre.x, z0: z0 - src.centre.z, step, cols, rows, h, rgb, water, level, looks, blend: B };
}

/** The last few islands' sources (a close-up asks again for the one just made). */
const made = new Map<string, Source>();
export function make(id: string, world: number, found: string[], step: number, across = ACROSS): OutlineDone | null {
  // (only home's island depends on what she's found: its size. Another's map would deal its legends to areas a little differently
  // by the kinds found (rules/rosters.ts dealLegends), moving a clearing or two: the chart draws it as before she found any, so it
  // stays the same through the whole campaign and is made once)
  if (id !== "home") found = [];
  const key = `${id}|${world}|${found.length}`;
  const had = made.get(key);
  if (had) return outlineOf(id, world, had, across);
  const island = id === "home" ? homeIsland(world, knownKinds(found)) : islandOf(id, world);
  if (!island) return null;
  const H = drawnHills(TUNING), seed = island.seed | 0;
  // its biomes by where it lies (rules/lakeLooks.ts: the game's lakes take the same)
  const { blend, lakeBlend, lakeShare } = islandBiome(id, world, island.phase, lakeKnobs(TUNING));
  let src: Source;
  if (id !== "home" && isPlaceholder(id)) { // uncharted: its land alone, the hills as drawn, no forest known
    const l = islandLand(island, TUNING, step), lakes = l.lakes ?? null;
    src = { land: l.land, lakes, centre: l.home, blend, lakeBlend, lakeShare, seed, heightAt: (x, z) => hillsAt(x, z, island.seed, H), levelAt: () => null, forest: () => 0, sand: (_x, _z, d) => d < (TUNING.beach?.width ?? 60) };
  } else { // its whole map, as the night plays it (the run's seed only places what's inside: its shape, areas and lakes are the world's)
    const t = { ...TUNING, map: { ...TUNING.map, island: id, world, found, islandAreas: id === "home" ? knownKinds(found).length : TUNING.map?.islandAreas } };
    const map = generateMap(1, t as typeof TUNING), L = map.bounds.land;
    if (!L) return null;
    const beach = beachOf(map.bounds, TUNING);
    src = {
      land: L, lakes: map.bounds.lakes ?? null, centre: { x: map.dancefloor.x, z: map.dancefloor.z }, blend, lakeBlend, lakeShare, seed,
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
  const b = land.box, g = ground(src, across), sigil = islandSigil(id) as string;
  const sigils = SIGIL_TIERS.map((t, tier) => ({ px: t.px, ink: Uint8Array.from(sigilDetail(sigil, t.px, { tier }) as ArrayLike<number>, v => (v ? 1 : 0)) }));
  return { id, world, loops, box: { minX: b.minX - centre.x, maxX: b.maxX - centre.x, minZ: b.minZ - centre.z, maxZ: b.maxZ - centre.z }, far, ground: g, mesh: buildIslandMesh(g, K), sigils, detail: across > ACROSS };
}

/** An island sent to the page, its buffers handed over (not copied). */
const send = (o: OutlineDone) => post(o, [...o.loops.map(l => l.pts.buffer), o.ground.h.buffer, o.ground.rgb.buffer, o.ground.water.buffer, o.ground.level.buffer, o.ground.looks.buffer, ...meshBuffers(o.mesh), ...(o.sigils ?? []).map(s => s.ink.buffer)]);

/** What's kept of the queue, sent first (an island kept comes in a few ms; one to make in a second or two, and would hold the
 *  kept ones behind it); the rest left in the queue to make, unless the ask was for what's kept alone. */
async function serveKept(): Promise<void> {
  const j = job; if (!j) return;
  const ids = [...queue], left: string[] = [];
  for (const id of ids) {
    if (job !== j) return; // (a new ask: it serves its own)
    const o = await cacheGet<OutlineDone>(cacheKey(id, j.world, j.found, j.step, ACROSS));
    if (o && o.mesh && o.sigils) { void keepCoast(id, j.world, o.loops); send(o); } else left.push(id); // (its coast kept for the zoo too, app/chartCache.ts keepCoast)
  }
  queue = queue.filter(id => left.includes(id)); // (a `first` meanwhile keeps its place)
  if (j.cacheOnly) queue = [];
}

async function next(): Promise<void> {
  const close = detail; detail = null; // (a close-up asked for goes first)
  const id = close ?? queue.shift();
  if (!id || !job) {
    busy = false;
    if (job?.warm) { note({ warmDone: true, made: warmMade, kept: warmKept }); warmMade = warmKept = 0; }
    return;
  }
  const j = job, across = close ? DETAIL_ACROSS : ACROSS, key = cacheKey(id, j.world, j.found, j.step, across);
  try {
    let o = await cacheGet<OutlineDone>(key), made = false;
    if (o && !(o.mesh && o.sigils)) o = null; // (kept before the meshes and the sigil's ink came with the ground: made again)
    if (!o && !j.cacheOnly) { o = make(id, j.world, j.found, j.step, across); made = !!o; if (o) await cachePut(key, o); } // (copied as it's put, before its buffers are sent on)
    if (o && !close) await keepCoast(id, j.world, o.loops); // (its coast kept for the zoo: app/chartCache.ts)
    if (j.warm && !close) { if (made) warmMade++; else warmKept++; note({ warmed: id, made }); }
    else if (o) send(o);
  } catch (e) { console.warn(`sea chart: ${id}'s island`, e); }
  setTimeout(next, 0); // (between islands, so a `first` can come in)
}
const note = (m: WarmNote) => (self as unknown as { postMessage(m: unknown): void }).postMessage(m);

self.onmessage = (e: MessageEvent<OutlineAsk>) => {
  const m = e.data;
  if ("detail" in m) { detail = m.detail; if (!busy && job) { busy = true; setTimeout(next, 0); } return; }
  if ("first" in m) { const i = queue.indexOf(m.first); if (i > 0) { queue.splice(i, 1); queue.unshift(m.first); } return; }
  job = { world: m.world, found: m.found, step: m.step, warm: m.warm, cacheOnly: m.cacheOnly }; queue = [...m.ids];
  if (!busy) { busy = true; void (m.warm ? Promise.resolve() : serveKept()).then(() => setTimeout(next, 0)); }
};
