// The forest map: areas cut by the fractal partition, each given an area type that no neighbour
// shares; the playable ones a circle of them round home (Ed, 2026-10-06; or, ?shape=square, the
// old mapAreas x mapAreas square), then a buffer ring of forest she can fly over but where nothing
// happens, then a margin of areas past it so the forest never visibly ends. World units are metres: x runs east, z runs south, one area cell is areaSize.
import { legendRadius } from "./legendFit";
import rawTypes from "../../config/area-types.json";
import { seatOffset } from "./treehouse";
import { AREAS, HOME_AREA } from "../../art/areas.js";
import { areaIdOf } from "../../art/areaRenames.js";
import { SCENES as SCENES_RAW, SCENE_BY_ID as SCENE_BY_ID_RAW } from "../../art/scenes.js";
import { makePartition, type Cell, type Partition } from "./partition";
import { hash2, rng, smoothstep, vnoise } from "./random";
import type { Tuning } from "./tuning";
import { floorClearing, speakerRadius, speakerRing, type Speaker } from "./speakers";

/** The treehouse's front, where the ley line leaves it: `clear` metres from its foot towards the dancefloor (the oak's Terrace opens
 *  that way: Ed, 2026-10-24; due south while it stood due north). */
const frontOf = (t: { x: number; z: number }, d: { x: number; z: number }, clear: number) => { const L = Math.hypot(d.x - t.x, d.z - t.z) || 1; return { x: t.x + ((d.x - t.x) / L) * clear, z: t.z + ((d.z - t.z) / L) * clear }; };
/** How far the treehouse's foot stands from the dancefloor's middle (Ed, 2026-10-05: "5m due north of
 *  the dance floor, outside the speaker ring"): past the ring's outer edge by gap, plus its footprint. */
export const treehouseDistance = (t: Tuning) => speakerRadius(t) + t.dancefloor.speakers.footprint + t.treehouse.gap + t.treehouse.clear;
import { PathNetwork } from "./paths";
import { knownPathGeometry, rememberPathGeometry, pathGeometryProblem, type PathGeometry } from "./pathGeometry";
import { knownHeightPrep, rememberHeightPrep, heightPrepProblem, type HeightPrep } from "./heightSamples";
import { routeOf } from "./party";
import { dealAlongRoute, matchLegendAreas } from "./deal";
import { beachOf, isInside, makeCoast, type Bounds } from "./mapShape";
import { landOf, makeLand, type LandData, type LandMap } from "./land";
import { knownRoute, rememberRoute, type LeyRoute } from "./leyroute";
import { lakeDepth, lakeKnobs } from "./lakes";
import { growIsland, lakePlan, placeLakes, reachOf, shapeOf, type Candidate, type PatchGrowth } from "./islandGrowth";
import { patchAt, STRAIT } from "./archipelago";
import { dealLegends, homeIsland, homeKinds, islandOf, isPlaceholder, knownKinds, playableIsland, type Island } from "./rosters";
import { CLASSIC_SLOTS, KIND_SLOTS } from "./kinds";
import { ZOO_CONFIG, zooChartPlan, zooJunctions, type ZooPlan } from "./zoo";
import { coastAlong, zooFence, zooLayout, zooPartition } from "./zooMap";

/** An area type: Ed's 30 are defined with their art in art/areas.js; config/area-types.json adds
 *  the game's own numbers. Only plain data is read here. */
export interface AreaType {
  id: string;
  name: string;
  /** The creature's species id (in the art module's bestiary). */
  creature: string;
  /** Ed's columns, in words. */
  text: { floor?: string; wall?: string; small?: string; big?: string; set?: string };
  /** The set piece in words, or "" if the type has none. */
  setPiece: string;
  hasWalls: boolean;
  /** The floor's colour, [hue, saturation, value], for the ground before its tile is drawn. */
  floor: [number, number, number];
  treeDensity: number;
  /** The tufts on its ground (config/area-types.json): density 0-1 and which kinds. */
  groundCover: { density: number; kinds: string[] };
  /** How its vegetation is arranged (art/areas.js AREA_LAYOUTS): pattern, density, clump, undergrowth... */
  layout: AreaLayout;
  /** Its flags (art/areas.js; an area recipe's own): more moonlit ponds; wet ground (streams and boardwalks for paths); steep (stairs may stand). */
  ponds: boolean; wet: boolean; steep: boolean;
  /** Its creature may be another area's too (an area recipe's `sharesCreature`; Ed's rule is a creature of its own for every area). */
  sharesCreature: boolean;
}

export interface AreaLayout {
  pattern: string; along?: number | string; density: number; clump: number; undergrowth: number; lean?: { dir: number; amount: number };
  /** Shares of its trees by height class. */
  heightMix?: { sapling: number; mature: number; tall: number; giant: number } | null;
  /** In an open area (its big objects mostly props), its trees' share of them all (0-1): the props keep their own weights. */
  treeShare?: number;
  /** Its ground's features: stream, pools, rocky, mounds, paths, hollows, ridges. */
  terrain?: string[];
  /** How many decorations it has (rate, 0-1) and of which families. */
  decor?: { rate: number; ruins: number; rocks: number; freak: number; lake: number; modern: number };
  /** Its feel in a line (art/areas.js): the zoo's nameplates show it (render/zooPlates.ts). */
  feel?: string;
}

interface ArtArea { id: string; name: string; creature: string; text: AreaType["text"]; floor: [string, number, number, number]; wall?: unknown[]; set?: unknown; layout?: AreaLayout; ponds?: boolean; wet?: boolean; steep?: boolean; sharesCreature?: boolean; settings?: { treeDensity?: number; groundCover?: { density: number; kinds: string[] } } }
const settings = (rawTypes as { types: Record<string, { treeDensity: number; groundCover?: { density: number; kinds: string[] } }> }).types;
export const AREA_TYPES: readonly AreaType[] = (AREAS as unknown as ArtArea[]).map(a => ({
  id: a.id, name: a.name, creature: a.creature, text: a.text,
  setPiece: a.set ? a.text.set ?? "a set piece" : "", hasWalls: !!a.wall?.length,
  floor: [a.floor[1], a.floor[2], a.floor[3]], treeDensity: settings[a.id]?.treeDensity ?? a.settings?.treeDensity ?? 1, // (an area recipe carries its own settings)
  groundCover: settings[a.id]?.groundCover ?? a.settings?.groundCover ?? { density: 0.5, kinds: ["blades"] },
  layout: a.layout ?? { pattern: "scatter", density: 0.6, clump: 0.3, undergrowth: 0.5 },
  ponds: !!a.ponds, wet: !!a.wet, steep: !!a.steep, sharesCreature: !!a.sharesCreature,
}));
/** Home's look (Ed, 2026-10-05: "its own custom floor; a pleasant green meadow with flowers"; party
 *  decorations instead of trees): its ground and flora are its own (art/areas.js HOME_AREA), not one
 *  of the creature area types; home keeps the type it rolls for the rest (its colour, its sigil). */
export const HOME_LOOK = AREA_TYPES.length;
/** The seed a look's art is drawn from (render/artBuild.ts typeSprites: its trees' variants): the look itself, but home's pinned
 *  (Foxtrot, 2026-10-13: HOME_LOOK is the array's end, so every new area type moved it and redrew home, and the bench's pixel
 *  check went red on every animal PR). 60 is what it was with the 60 area types of 2026-10-13, so nothing changed then. */
export const HOME_SEED = 60;
export const lookSeed = (look: number): number => (look === HOME_LOOK ? HOME_SEED : look);
/** The area types a map without a roster deals (the classic map): the kinds in the table's first 32 slots (rules/kinds.ts
 *  CLASSIC_SLOTS; introduced before phase 3 until the roster moved some to the biomes, Ed, 2026-10-23). The journey's new kinds
 *  (later slots, area recipes added at the end of AREA_TYPES) come only through their islands' rosters, so adding one, or moving
 *  one, leaves every classic map as it was. */
export const CLASSIC_TYPES: readonly number[] = AREA_TYPES.map((a, i) => ((KIND_SLOTS[a.creature] ?? 0) < CLASSIC_SLOTS ? i : -1)).filter(i => i >= 0);
const H_ = HOME_AREA as unknown as ArtArea;
/** How the ground looks, by an area sample's `look`: the area types, then home's meadow. */
export const LOOKS: readonly AreaType[] = [...AREA_TYPES, {
  id: H_.id, name: H_.name, creature: AREA_TYPES[0].creature, text: H_.text, setPiece: "", hasWalls: false,
  floor: [H_.floor[1], H_.floor[2], H_.floor[3]], treeDensity: 0,
  groundCover: settings.home?.groundCover ?? { density: 0.9, kinds: ["blades", "clover"] },
  layout: { pattern: "scatter", density: 0, clump: 0.3, undergrowth: 0 }, ponds: false, wet: false, steep: false, sharesCreature: true,
}];

export interface AreaSample {
  cell: Cell;
  type: number;
  /** How its ground looks (LOOKS): its type, or HOME_LOOK in home's area. */
  look: number;
  /** 0 at the nearest area centre, about 1 midway between centres: what clears the trees. */
  openness: number;
}

export interface ForestMap {
  readonly seed: number;
  readonly tuning: Tuning;
  /** Areas across the grid of cells: the playable square's (square map), or the whole flight circle's and a little more (circular). */
  readonly n: number;
  /** The grid's first cell (its cells run first to first + n - 1 each way): 0, but below on a home grown past its 10 areas (its
   *  middle kept where the 10-area home's is). */
  readonly first: number;
  /** Extra rings of areas outside the grid. */
  readonly margin: number;
  /** The zoo's plan (?zoo, rules/zoo.ts), its paths' crossings in metres; undefined on any other map. */
  readonly zoo?: ZooPlan & { junctions: { x: number; z: number }[] };
  /** The map's shape: "circle" (Ed, 2026-10-06) or "square" (as before, ?shape=square). */
  readonly shape: "circle" | "square";
  /** Every playable area (home among them), row by row: those that get a runestone, a soundsystem, a legend and creatures, and wake in waves. */
  readonly cells: readonly Cell[];
  /** Is this area playable? (The circular map: its centre within map.radius areas of home's.) */
  playable(cx: number, cy: number): boolean;
  /** Is this area in the buffer ring: not playable, but where she can fly (scenery only)? */
  inBuffer(cx: number, cy: number): boolean;
  /** Is this area a lake (Ed, 2026-10-11: from phase 1, never home)? Neither playable nor the buffer's: water (bounds.lakes). */
  isLake(cx: number, cy: number): boolean;
  /** The coast (Ed, 2026-10-06: "slightly irregular"): every edge round home, at an angle (radians,
   *  atan2(dz, dx) from the dancefloor), as a factor of its round radius (1 on the square map). The
   *  playable areas reach radius x coast, the buffer theirs x coast; her flight's edge is the coast round them (bounds.land). */
  coast(angle: number): number;
  readonly areaSize: number;
  readonly partition: Partition;
  /** The middle area, whose clearing holds the dancefloor. */
  readonly centreCell: Cell;
  /** Home's circle (metres round the dancefloor), all home's ground: out past the treehouse. */
  readonly homeRadius: number;
  readonly dancefloor: { x: number; z: number; radius: number; /** the ring of speakers round it */ speakers: readonly Speaker[] };
  /** The witch's treehouse: its trunk's foot, just beyond the dancefloor's clearing. */
  readonly treehouse: { x: number; z: number };
  /** The treehouse's front (Ed, 2026-10-05): the foot of its door's side, south (towards the camera), just outside its footprint. */
  readonly treehouseFront: { x: number; z: number };
  /** The old playgrounds and sports grounds: a handful per map, each in a clearing of its own off
   *  an area's centre; kind is the art's arrangement (playground, tennis, baseball, football, basketball). */
  readonly grounds: readonly Ground[];
  /** The scenes: each at most once per map, in an area it suits (Ed, 2026-10-04). */
  readonly scenes: readonly Scene[];
  /** Where the witch starts: at the treehouse (sitting on its terrace). */
  readonly start: { x: number; z: number };
  /** Where the witch may fly (metres): a box, and on the circular map the circle round home (see mapShape.ts). */
  readonly bounds: Bounds;
  /** Everything the map covers, margin included (metres). */
  readonly extent: { minX: number; maxX: number; minZ: number; maxZ: number };
  /** The area type index of an area cell. */
  typeOf(cx: number, cy: number): number;
  /** Which area a point is in, its type, and how open it is (0 at an area's centre). */
  areaAt(x: number, z: number): AreaSample;
  /** Which area a point is in (cheaper than areaAt), and how far in metres it can move in any
   *  direction and surely stay in that area, so a walker need not ask again until it has. */
  cellSafe(x: number, z: number): { cell: Cell; safe: number };
  /** The area's set piece, if this one has one (rare: setPieceChance of the types that have one). */
  setPieceOf(cx: number, cy: number): string | null;
  /** Where an area's soundsystem stands when the party reaches it (reserved from the start). */
  soundsystemSpot(cx: number, cy: number): { x: number; z: number };
  /** Where an area's set piece stands: in its clearing, its footprint clear of every soundsystem
   *  and the dancefloor; null if it has none, or there is no room for it. */
  setPieceSpot(cx: number, cy: number): { x: number; z: number } | null;
  /** Whether a footprint r metres round (x, z) comes within reserveMargin of anything placed for
   *  gameplay (soundsystems, the dancefloor, the treehouse) or of a set piece: scenery keeps out. */
  reserved(x: number, z: number, r: number): boolean;
  /** How far (x, z) is from the nearest area's stone (its great stump or runestone: its soundsystem's spot), metres. */
  stoneGap(x: number, z: number): number;
  /** Whether a footprint r metres round (x, z) lies wholly out of every stone's keep-clear zone (stoneKeepClear metres round its
   *  middle; Ed, 2026-10-29): the special scenery, finds, flasks, legends' clearings, walls, ponds, campfires, picnics and grounds keep out. */
  clearOfStones(x: number, z: number, r?: number): boolean;
  /** How far an area is from home: 0 at the middle area, 1 at the playable map's edge. */
  remoteness(cx: number, cy: number): number;
  /** An area's centre (its layer-0 site), in metres. */
  siteOf(cx: number, cy: number): { x: number; z: number };
  /** The chance a tree grows at a point: 0 in a clearing, rising smoothly to treeDensity. */
  treeWeight(x: number, z: number): number;
  /** Ground that must stay clear of every tree: the dancefloor's clearing and set pieces'. */
  hardClear(x: number, z: number): boolean;
  /** How far (x, z) is out of its area's fighting arena: 0 in its open middle, rising smoothly over its band to 1 (tuning arena); `cell` if known. */
  arenaOpen(x: number, z: number, cell?: Cell): number;
  /** Whether an area has a sleeping legend (Ed, 2026-10-06: "only in about half of areas"): legends.share of them, seeded, spread out; never home. */
  hasLegend(cx: number, cy: number): boolean;
  /** The areas with a legend, as "cx,cy" keys. */
  readonly legendCells: ReadonlySet<string>;
  /** The island this map is, when it's one by roster (rules/rosters.ts: a kind's, or home's), else null. */
  readonly island: Island | null;
  /** On an island by roster, the night's legends' kinds (dealt from its roster: one area of each has its legend); else empty. */
  legendKinds: string[];
  /** Each area's sleeping legend's clearing (not home's: it has no legend), or null where none fits. */
  legendClearing(cx: number, cy: number): LegendClearing | null;
  /** Every legend's clearing (for the drawing: its ground ring, and the rendering's twilight and motes). */
  readonly legendClearings: readonly LegendClearing[];
  /** The legend areas (Ed, 2026-10-26): each "cx,cy" key to its pair's, the area of its kind it was grown beside. In the buffer
   *  (inBuffer: no runestone, soundsystem, arena or creatures of its own), its legend's circle at its heart; the legend's own cell
   *  is its pair's, and its pair's legendClearing is the circle there. */
  readonly legendAreas: ReadonlyMap<string, string>;
  isLegendArea(cx: number, cy: number): boolean;
  /** The area a cell counts as (Ed, 2026-10-26: "for legends getting enraged, and also for animals attacking and defending, the
   *  adjacent areas should count as one"): a legend area's pair, else the cell itself (the same array: no allocation). */
  areaOf(cell: Cell): Cell;
  /** Whether two cells count as one area (the same cell, or a legend area and its pair). */
  sameArea(a: Cell, b: Cell): boolean;
  /** Pairs of areas that touch, as "cx,cy|cx,cy" keys, for tests and the debug view. */
  readonly neighbours: ReadonlyMap<string, ReadonlySet<string>>;
  /** Paths, roads and railways, with the corridors they keep clear. */
  readonly paths: PathNetwork;
}

/** flip: the whole arrangement mirrored left to right. */
export interface Ground { kind: string; x: number; z: number; r: number; flip: boolean }
/** A scene (art/scenes.js) on the map: its id, middle, footprint radius, and whether it's mirrored. */
export interface Scene { id: string; x: number; z: number; r: number; mirror: boolean }
/** An area's sleeping legend's clearing (Ed, 2026-10-06): a small circle (x, z, radius r metres) where
 *  nothing grows or stands, the legend lying near its far (north) side at legend; edge: its ring's width. */
export interface LegendClearing { cell: Cell; x: number; z: number; r: number; edge: number; legend: { x: number; z: number } }

type SceneDef = { id: string; size: string; suits?: string[]; pieces: [string, number, number, string?][] };
const SCENES = SCENES_RAW as unknown as SceneDef[], SCENE_BY_ID = SCENE_BY_ID_RAW as unknown as Record<string, SceneDef>;

const cellKey = (cx: number, cy: number) => cx + "," + cy;
/** The land map's samples (m apart; rules/land.ts). */
const LAND_STEP = 4;

/** A seed from the URL: a number is used as is, any other text is hashed. */
export function parseSeed(text: string | null | undefined): number | null {
  if (text == null || text.trim() === "") return null;
  const t = text.trim();
  if (/^\d{1,9}$/.test(t)) return Number(t);
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619);
  return (h >>> 0) % 1000000000;
}

/** Which areas touch which, found by sampling the partition finely over the cells given. */
function findNeighbours(p: Partition, lo: number, hi: number, perCell: number): Map<string, Set<string>> {
  const nb = new Map<string, Set<string>>();
  const link = (a: Cell, b: Cell) => {
    if (a[0] === b[0] && a[1] === b[1]) return;
    const ka = cellKey(a[0], a[1]), kb = cellKey(b[0], b[1]);
    if (!nb.has(ka)) nb.set(ka, new Set());
    if (!nb.has(kb)) nb.set(kb, new Set());
    nb.get(ka)!.add(kb); nb.get(kb)!.add(ka);
  };
  const steps = (hi - lo) * perCell;
  let prevRow: Cell[] = [];
  for (let j = 0; j <= steps; j++) {
    const row: Cell[] = [];
    for (let i = 0; i <= steps; i++) {
      const c = p.partition(lo + i / perCell, lo + j / perCell);
      row.push(c);
      if (i > 0) link(c, row[i - 1]);
      if (j > 0) link(c, prevRow[i]);
    }
    prevRow = row;
  }
  return nb;
}

/** Only an island's land (rules/islandShape.ts: the sea chart's and the dreams' outlines): its land map, sampled every `step`
 *  metres, and home's middle; the areas grown as the map grows them, nothing else made. `island` the island (rules/rosters.ts). */
export function islandLand(island: Island, tuning: Tuning, step = 16): { land: LandMap; lakes?: LandMap; home: { x: number; z: number }; areaSize: number; cells: string[] } {
  return generateMap(island.seed, tuning, { landStep: step, island }) as unknown as { land: LandMap; lakes?: LandMap; home: { x: number; z: number }; areaSize: number; cells: string[] };
}

/** The heavy, pure parts of a map's making as plain data (Ed, 2026-10-19, the sailing's option 4: app/mapPrep.ts makes them in a
 *  worker while the chart flies and carries them to the game's page): which areas touch which (in their order: the map's own
 *  iteration order), the land and lakes maps, and the ley line's route (rules/leyroute.ts). generateMap given them makes the same map, without their work. */
export interface MapPrep { neighbours: [string, string[]][]; land: LandData | null; lakes: LandData | null; route: LeyRoute | null; pathGeometry?: PathGeometry; heightSamples?: HeightPrep }

const landData = (L: LandMap | undefined): LandData | null => (L ? { x0: L.x0, z0: L.z0, step: L.step, cols: L.cols, rows: L.rows, dist: L.dist, seg: L.seg, loops: L.loops, segLoop: L.segLoop, segAt: L.segAt, box: L.box } : null);
/** A map's prep (see MapPrep): to make the same map again quickly, on another thread or page. */
export function prepOf(map: ForestMap): MapPrep {
  const b = map.bounds;
  return { neighbours: [...map.neighbours].map(([k, v]) => [k, [...v]]), land: landData(b.land), lakes: landData(b.lakes), route: knownRoute(map) ?? null, ...(knownPathGeometry(map) ? { pathGeometry: knownPathGeometry(map) } : {}), ...(knownHeightPrep(map) ? { heightSamples: knownHeightPrep(map) } : {}) };
}

/** What's wrong with a prep, if anything (a record from another build's code, cut short, or not a prep at all): its shapes checked
 *  against each other, so a bad one is never hydrated (app/mapPrep.ts readyMap makes the map afresh instead). Null if sound. */
export function prepProblem(p: unknown): string | null {
  const q = p as Partial<MapPrep> | null;
  if (!q || typeof q !== "object") return "no prep";
  if (!Array.isArray(q.neighbours) || !q.neighbours.every(e => Array.isArray(e) && typeof e[0] === "string" && Array.isArray(e[1]))) return "neighbours";
  const land = (L: LandData | null | undefined, what: string): string | null => {
    if (L == null) return null;
    const n = L.cols * L.rows;
    if (!(Number.isInteger(L.cols) && Number.isInteger(L.rows) && n > 0 && L.step > 0)) return what + " grid";
    if (!(L.dist instanceof Float32Array && L.dist.length === n && L.seg instanceof Int32Array && L.seg.length === n)) return what + " samples";
    if (!(L.segLoop instanceof Int32Array && L.segAt instanceof Int32Array && L.segLoop.length === L.segAt.length && Array.isArray(L.loops))) return what + " stretches";
    if (!L.loops.every(l => l.pts instanceof Float64Array && l.at instanceof Float64Array && l.pts.length === l.at.length * 2)) return what + " loops";
    for (let s = 0; s < L.segLoop.length; s++) { const l = L.loops[L.segLoop[s]]; if (!l || L.segAt[s] < 0 || L.segAt[s] * 2 >= l.pts.length) return what + " stretch " + s; }
    return null;
  };
  if (q.land === undefined || q.lakes === undefined || q.route === undefined) return "parts missing";
  const bad = land(q.land, "land") ?? land(q.lakes, "lakes");
  if (bad) return bad;
  if (q.pathGeometry !== undefined) { const bad = pathGeometryProblem(q.pathGeometry); if (bad) return bad; }
  if (q.heightSamples !== undefined) { const bad = heightPrepProblem(q.heightSamples); if (bad) return bad; }
  if (q.route && !(Array.isArray(q.route.order) && Array.isArray(q.route.stones) && Array.isArray(q.route.links) && q.route.order.length === q.route.stones.length)) return "route";
  return null;
}

/** A map from its ready parts (a worker's prep: app/mapPrep.ts): the map generateMap(seed, tuning) makes, without their work
 *  (src/rules/mapPrep.test.ts). The seam a night started in place takes (docs/plans/sail-without-reload.md, startNight; or
 *  newGame's prep). */
export const hydrateMap = (seed: number, tuning: Tuning, prep: MapPrep): ForestMap => {
  const map = generateMap(seed, tuning, undefined, prep);
  if (prep.pathGeometry && !pathGeometryProblem(prep.pathGeometry)) rememberPathGeometry(map, prep.pathGeometry);
  if (prep.heightSamples && !heightPrepProblem(prep.heightSamples)) rememberHeightPrep(map, prep.heightSamples);
  return map;
};

export function generateMap(runSeed: number, tuning: Tuning, only?: { landStep: number; island: Island }, prep?: MapPrep): ForestMap {
  const A = tuning.areaSize * tuning.areaScale;
  // The circular map (Ed, 2026-10-06): playable areas those whose centres lie within radius areas of
  // home's; past them a buffer ring buffer areas deep, then the edge of her flight (from the
  // playable areas' outer edges, half an area past their centres). The grid of cells covers all of
  // that and the warp's play; the forest goes on edge areas beyond, its last areas never seen.
  const MS = tuning.map ?? { shape: "square" as const, radius: 0, buffer: 0, push: 0, drift: 0, edge: 2 };
  const shape: "circle" | "square" = MS.shape === "circle" ? "circle" : "square", round = shape === "circle";
  // The zoo (rules/zoo.ts; Ed, 2026-10-13): a square grid of square blocks, each a real area of the type its row and column give,
  // home the entrance; no warp and no fractal borders (a straight path runs along every border), every block's legend in its clearing.
  // Laid out like the sea chart (Ed, 2026-10-26; rules/zooMap.ts): every island at its chart place, one area across, the
  // streets (the plaza's flagstones) between; a found island (map.found: the kinds she knows; "*" every one, ?all) its area,
  // one not found its biome's lake.
  const zooAt = MS.shape === "zoo" ? zooLayout(MS.world ?? 0, (MS.found ?? []).includes("*") ? "all" : new Set(knownKinds(MS.found ?? [])), { across: A * (ZOO_CONFIG.size ?? 1), gap: ZOO_CONFIG.gap ?? 30, street: ZOO_CONFIG.street, plaza: ZOO_CONFIG.plaza, margin: ZOO_CONFIG.margin ?? 120, areaSize: A, coasts: MS.coasts }, tuning.islands?.coast ?? MS.coast) : null;
  const zoo: ZooPlan | null = zooAt ? zooChartPlan(zooAt) : null;
  // The journey's islands by roster (Ed, 2026-10-11; rules/rosters.ts): map.island a kind plays that kind's island, its shape and
  // areas from its own seed (where it lies on the sea chart) and its size by phase; "home" plays home's (one area per kind she
  // knows, on the run's seed). The run's seed deals the night's legends.
  // The world seed (Ed, 2026-10-11; rules/rosters.ts): an island's shape (its coast, the partition into areas, their types) is
  // its own, from the campaign's world (map.world) and its kind, the same every night (shapeSeed); everything inside it (paths,
  // scenery, set pieces, creatures, the night's legends; map.seed) is the night's, the run's seed.
  const world = MS.world ?? 0;
  // Home grows (Ed, 2026-10-10, journey.md "Home's size"): one area per kind she knows, home's 10 and every kind found since
  // (map.found, the save's); islandAreas turns it on, and is its least (past one each, the kinds again in turn).
  const rosterIsland = only ? only.island : !round || zoo ? null : MS.island === "home" ? ((MS.islandAreas ?? 0) > 0 ? homeIsland(world, knownKinds(MS.found ?? []), Math.round(MS.islandAreas!)) : null) : MS.island && playableIsland(MS.island) ? islandOf(MS.island, world) : null; // (never a placeholder's: rules/rosters.ts)
  const seed = runSeed, shapeSeed = rosterIsland ? rosterIsland.seed : runSeed;
  // An island of so many areas (Ed, 2026-10-11, the journey's first step: map.islandAreas): home and exactly that many more, the
  // nearest home's (found below, once the areas are cut); until then a radius sure to hold them sizes the grid and the forest.
  const island = rosterIsland ? rosterIsland.size : round && (MS.islandAreas ?? 0) > 0 ? Math.round(MS.islandAreas!) : 0;
  // Its shape by its phase (Ed, 2026-10-11, the journey's irregular islands: rules/islandGrowth.ts, the tuning's map.shapes): home
  // near-round, each phase further out more irregular; the grid sized for its furthest arm.
  const phase = rosterIsland ? rosterIsland.phase : Math.max(0, Math.round(MS.phase ?? 0)), shapeK = shapeOf(phase, MS.shapes), shapeReach = island ? reachOf(shapeK, shapeSeed, rosterIsland?.turn ?? 0) : null;
  // (in its patch on the chart, rules/archipelago.ts: the grid sized for the patch's furthest reach)
  const patch = rosterIsland?.patch, patchMost = patch ? Math.max(...patch) : 0;
  const reach = (areas: number) => (patch ? patchMost / (tuning.areaSize * tuning.areaScale) + 1 : (Math.sqrt((areas + 1) / Math.PI) * 1.4 + 1.5) * (shapeReach?.most ?? 1));
  let R = island ? reach(island) : MS.radius, flightR = (R + 0.5 + MS.buffer) * A;
  const edgeK = MS.edge ?? 2;
  // The coast's wobble (Ed, 2026-10-06): seeded, the same for every edge; the forest's extent covers its furthest headland.
  // (The grid doesn't change with it, so the coast's knobs never reshuffle the map: its slack of an area holds the
  // playable areas' furthest headland, and the buffer's past it are the forest's anyway.)
  // (a kind's island takes the islands' coast, as its outline on the sea chart and in the dreams: rules/islandShape.ts)
  const coastKnobs = rosterIsland && rosterIsland.kind !== "home" ? tuning.islands?.coast ?? MS.coast : MS.coast;
  const coast = round ? makeCoast(shapeSeed, coastKnobs) : () => 1, most = 1 + (round ? Math.max(0, coastKnobs?.amp ?? 0) : 0);
  const across = (r: number) => 2 * Math.ceil(r + 0.5 + MS.buffer + 1) + 1;
  const n = zoo ? zoo.n : round ? across(R) : tuning.mapAreas, margin = round ? Math.ceil(edgeK) : 2;
  // Home grown (more kinds known than home's 10): its grid's middle stays where the 10-area home's is, so the partition, home's
  // cell and its first areas are the same every night of the campaign; the grid reaches further round it (from cell `first`).
  const homeBase = rosterIsland?.kind === "home" ? homeKinds().length : 0, grown = homeBase > 0 && island > homeBase;
  // Areas vary in size: the world is warped smoothly before it is cut, so in some stretches of
  // the map the cells spread out (big areas) and in others they crowd (small ones). The warp
  // never folds (its slope stays under 1), so every area keeps its place and the map stays
  // n x n areas. Positions in partition space are in cells.
  const L = 3, V = zoo ? 0 : Math.max(0, Math.min(1, tuning.areaSizeVariance)) * L * 0.3;
  const toPart = (x: number, z: number): [number, number] => {
    const u = x / A, v = z / A;
    return [u + V * (vnoise(u / L, v / L, shapeSeed + 91) - 0.5) * 2, v + V * (vnoise(u / L, v / L, shapeSeed + 92) - 0.5) * 2];
  };
  const toWorld = (u: number, v: number): [number, number] => {
    let x = u * A, z = v * A;
    // (toPart inline, its pair in locals: 30 rounds made 30 tuples a call, a frame's commonest garbage; phase 2's GC
    // audit. The same sums in the same order.)
    for (let i = 0; i < 30; i++) {
      const uu = x / A, vv = z / A;
      const pu = uu + V * (vnoise(uu / L, vv / L, shapeSeed + 91) - 0.5) * 2, pv = vv + V * (vnoise(uu / L, vv / L, shapeSeed + 92) - 0.5) * 2;
      x += (u - pu) * A; z += (v - pv) * A;
    }
    return [x, z];
  };
  // Home first (Ed, 2026-10-05: "Home area should be big enough that the whole circle, centre the
  // dancefloor, edge the treehouse, is within it - should fix this before generating the rest of
  // the areas"). Its cell: the one nearest the middle whose centre lies inside its own area, so the
  // dancefloor stands on its own area's ground. Then its circle: out past the treehouse's footprint
  // and home.margin more, measured through the warp (its edge mapped into partition space), so
  // every point of it is home's; the areas round it are cut round it, their centres kept
  // home.gap of an area beyond it.
  const mid = Math.floor((grown ? across(reach(homeBase)) : n) / 2), first = mid - Math.floor(n / 2), depth = zoo ? 0 : tuning.borderLayers, plain = zooAt ? zooPartition(zooAt, A, shapeSeed) : makePartition(shapeSeed, depth, undefined, { grid: !!zoo });
  const ownsSite = (cx: number, cy: number) => { const s = plain.site(cx, cy), c = plain.partition(s[0], s[1]); return c[0] === cx && c[1] === cy; };
  let centreCell: Cell = zoo ? zoo.home : [mid, mid];
  if (!zoo) for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) if (ownsSite(mid + dx, mid + dy)) { centreCell = [mid + dx, mid + dy]; break; }
  const H = tuning.home, homeSite = plain.site(centreCell[0], centreCell[1]), homeWorld = toWorld(homeSite[0], homeSite[1]);
  const homeRadius = treehouseDistance(tuning) + tuning.treehouse.clear + H.margin; // metres
  let homeR = 0;
  for (let k = 0; k < 96; k++) {
    const a = (k / 96) * Math.PI * 2, [u, v] = toPart(homeWorld[0] + Math.cos(a) * homeRadius, homeWorld[1] + Math.sin(a) * homeRadius);
    homeR = Math.max(homeR, Math.hypot(u - homeSite[0], v - homeSite[1]));
  }
  const partition = zooAt ? plain : makePartition(shapeSeed, depth, { cell: centreCell, radius: homeR * 1.03, gap: H.gap }, { grid: !!zoo });
  // (circular: the extent a square round the flight circle, edge areas past it; the cells it covers, and one more for the warp)
  const ext = round ? { minX: homeWorld[0] - flightR * most - edgeK * A, maxX: homeWorld[0] + flightR * most + edgeK * A, minZ: homeWorld[1] - flightR * most - edgeK * A, maxZ: homeWorld[1] + flightR * most + edgeK * A } : null;
  const lo = ext ? Math.floor(Math.min(ext.minX, ext.minZ) / A) - 1 : -margin, hi = ext ? Math.ceil(Math.max(ext.maxX, ext.maxZ) / A) + 1 : n + margin;
  const neighbours = prep ? new Map(prep.neighbours.map(([k, v]) => [k, new Set(v)])) : findNeighbours(partition, lo, hi, 6);

  // Area types: random, never the same as a touching area nor any area within two cells.
  const types = new Map<string, number>();
  const r = rng(shapeSeed * 5 + 1);
  for (let cy = lo; cy < hi; cy++) for (let cx = lo; cx < hi; cx++) {
    const near = new Set<number>(), homeKey = cellKey(centreCell[0], centreCell[1]);
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      if (cellKey(cx + dx, cy + dy) === homeKey) continue; // (home looks like none of them: a meadow of its own)
      const t = types.get(cellKey(cx + dx, cy + dy));
      if (t !== undefined) near.add(t);
    }
    for (const k of neighbours.get(cellKey(cx, cy)) ?? []) { if (k === homeKey) continue; const t = types.get(k); if (t !== undefined) near.add(t); }
    const free = CLASSIC_TYPES.filter(t => !near.has(t));
    const pool = free.length ? free : CLASSIC_TYPES;
    types.set(cellKey(cx, cy), pool[Math.floor(r() * pool.length)]);
  }
  // (the zoo's blocks: each its own area's type; an empty "?" block its row's first area's ground, so the row reads as one biome)
  const zooCells = new Set<string>();
  if (zoo) {
    const byId = (id: string) => AREA_TYPES.findIndex(a => a.id === areaIdOf(id)), first = new Map<string, number>(); // (an old id, renamed since, still finds its area: art/areaRenames.js)
    for (const b of zoo.blocks) if (b.area && !first.has(b.row)) first.set(b.row, byId(b.area));
    for (const b of zoo.blocks) { const t = b.area ? byId(b.area) : first.get(b.row) ?? -1; if (t >= 0) types.set(cellKey(b.cell[0], b.cell[1]), t); if (b.area && t >= 0 && b.found !== false) zooCells.add(cellKey(b.cell[0], b.cell[1])); }
    zooCells.add(cellKey(centreCell[0], centreCell[1]));
  }
  const typeOf = (cx: number, cy: number) => types.get(cellKey(cx, cy)) ?? CLASSIC_TYPES[Math.floor(hash2(cx, cy, shapeSeed + 17) * CLASSIC_TYPES.length)];

  // (an area's centre never moves: each is worked out once, then read from SITES; a fresh object each time, as before)
  const SITES = new Map<number, [number, number]>();
  const siteXZ = (cx: number, cy: number): readonly [number, number] => {
    const k = (cx + 32768) * 65536 + (cy + 32768);
    let w = SITES.get(k);
    if (!w) { const s = partition.site(cx, cy); w = toWorld(s[0], s[1]); SITES.set(k, w); }
    return w;
  };
  const siteOf = (cx: number, cy: number) => { const w = siteXZ(cx, cy); return { x: w[0], z: w[1] }; };
  const centre = siteOf(centreCell[0], centreCell[1]);
  // The playable areas and the buffer ring, by their centres' distance from home's.
  // (each by how far its centre lies out along its own direction, as a share of the coast there)
  const fromHome = (cx: number, cy: number) => { const s = siteOf(cx, cy), dx = s.x - centre.x, dz = s.z - centre.z; return Math.hypot(dx, dz) / coast(Math.atan2(dz, dx)); };
  // An area must own some ground: the warped partition can leave a cell with none (every point near its centre another
  // area's), and such a ghost area put its runestone, its legend and its creatures all on one spot in a neighbour's
  // ground (Ed, v1628: "Legend and runestone in the same place"). Ground: any of the neighbour scan's samples, 6 a cell.
  const hasGround = (cx: number, cy: number) => neighbours.has(cellKey(cx, cy));
  // The island's areas (Ed, 2026-10-11): home and `island` more that own ground, grown out from home by its shape
  // (rules/islandGrowth.ts), in the order taken (a grown home's first 10 then the same every night: the growth's order doesn't
  // change with how many it takes); R then the furthest of them (in areas, by cell), for how remote each is.
  // Its lakes (Ed, 2026-10-11: from phase 1, never home): areas of water among its own, grown with it (so it keeps its size
  // in land) and kept off home and its neighbours (rules/islandGrowth.ts placeLakes).
  let grownSet: Set<string> | null = null, growOrder: string[] = [], lakeCells = new Set<string>();
  // (an area of the grid the island could have grown into, inside its patch: where a legend area may grow, below)
  let growable: (k: string) => boolean = () => false;
  if (island) {
    const cand = new Map<string, Candidate>(), plan = lakePlan(shapeK, shapeSeed), extra = plan.reduce((t, k) => t + k, 0);
    for (let cy = first; cy < first + n; cy++) for (let cx = first; cx < first + n; cx++) if (hasGround(cx, cy)) { const s = siteOf(cx, cy), k = cellKey(cx, cy); cand.set(k, { key: k, dx: (s.x - centre.x) / A, dz: (s.z - centre.z) / A }); }
    // (in its patch: its playable areas kept in from the patch's edge by half a strait, the buffer's depth and most of an area (its
    // ground past its centre), so its land, buffer and all, stops half a strait short of its neighbours'; its reach its own shape)
    let grow: PatchGrowth | undefined;
    if (patch) {
      const inset = STRAIT / 2 + MS.buffer * A * 0.85 + A * 0.75, room = (a: number) => Math.max(A, patchAt(patch, a) - inset) / A;
      let mean = 0;
      for (let k = 0; k < 64; k++) mean += room((k / 64) * Math.PI * 2) / 64;
      grow = { reach: a => room(a) / mean, outside: c => Math.max(0, Math.hypot(c.dx, c.dz) - room(Math.atan2(c.dz, c.dx))) };
    }
    growOrder = growIsland(cellKey(centreCell[0], centreCell[1]), island + extra, cand, neighbours, shapeK, shapeSeed, grow, rosterIsland?.turn ?? 0);
    if (extra) { const L = placeLakes(growOrder, island, plan, neighbours, shapeSeed); growOrder = L.playable; lakeCells = L.lakes; }
    grownSet = new Set(growOrder);
    growable = k => { const c = cand.get(k); return !!c && (!grow || grow.outside(c) <= 0); };
    R = 1;
    for (const k of grownSet) { const [cx, cy] = k.split(",").map(Number); R = Math.max(R, Math.hypot(cx - centreCell[0], cy - centreCell[1])); }
  }
  // (the zoo: an island not found yet is its biome's lake, Ed 2026-10-26)
  if (zoo) for (const b of zoo.blocks) if (b.found === false) lakeCells.add(cellKey(b.cell[0], b.cell[1]));
  const playable = (cx: number, cy: number) => cx >= first && cy >= first && cx < first + n && cy < first + n && (zoo ? zooCells.has(cellKey(cx, cy)) : grownSet ? grownSet.has(cellKey(cx, cy)) : !round || fromHome(cx, cy) <= R * A) && hasGround(cx, cy);
  const cells: Cell[] = [];
  for (let cy = first; cy < first + n; cy++) for (let cx = first; cx < first + n; cx++) if (playable(cx, cy)) cells.push([cx, cy]);
  const isLake = (cx: number, cy: number) => lakeCells.has(cellKey(cx, cy));
  const inBuffer = (cx: number, cy: number) => round && !playable(cx, cy) && landCells.has(cellKey(cx, cy)) && !isLake(cx, cy);
  // (an island by roster: its areas' types from the roster, as few of a kind side by side as the swaps can manage)
  const others = cells.filter(([x, y]) => x !== centreCell[0] || y !== centreCell[1]);
  if (rosterIsland && !grown) assignRoster(rosterIsland, others, types, neighbours, shapeSeed);
  else if (rosterIsland) {
    // Home grown: its first 10 areas dealt as the 10-area home's (the same areas, the same kinds), then each kind found since
    // given the next area out, in the order found.
    const at = new Map(growOrder.map((k, i) => [k, i])), inBase = (x: number, y: number) => (at.get(cellKey(x, y)) ?? Infinity) <= homeBase, extra = others.filter(([x, y]) => !inBase(x, y)).sort((a, b) => at.get(cellKey(a[0], a[1]))! - at.get(cellKey(b[0], b[1]))!);
    assignRoster(homeIsland(world), others.filter(([x, y]) => inBase(x, y)), types, neighbours, shapeSeed);
    const known = knownKinds(MS.found ?? []), more = known.slice(homeBase);
    more.forEach((kind, i) => { const c = extra[i]; if (c) types.set(cellKey(c[0], c[1]), AREA_TYPES.findIndex(a => a.creature === kind)); });
    // (past one area each, islandAreas's padding: the kinds again, dealt as any roster's)
    const pad = extra.slice(more.length);
    if (pad.length) assignRoster(homeIsland(world, known, known.length + pad.length), pad, types, neighbours, shapeSeed, known.length);
  }
  // (an island by roster grows only its roster's species, Ed 2026-10-12: every area past its playable ones, the buffer ring's, the
  // sea's and the lakes', takes the type of the nearest playable area but home's, centre to centre, so its shore is its own forest)
  // (again after the night's deal, below: typeBeyond)
  const typeBeyond = () => {
    const own = others.map(([x, y]) => { const s = siteXZ(x, y); return { x: s[0], z: s[1], t: types.get(cellKey(x, y))! }; });
    for (const k of [...types.keys()]) {
      const [cx, cy] = k.split(",").map(Number);
      if (playable(cx, cy) || (cx === centreCell[0] && cy === centreCell[1])) continue;
      const s = siteXZ(cx, cy);
      let best = own[0], bd = Infinity;
      for (const o of own) { const d = (o.x - s[0]) ** 2 + (o.z - s[1]) ** 2; if (d < bd) { bd = d; best = o; } }
      types.set(k, best.t);
    }
  };
  if (rosterIsland && others.length) typeBeyond();

  // The legend areas (Ed, 2026-10-26: "legends are spawned in additional areas that have legend circles where runestones usually
  // are"; "extra areas are added to each island, and the legend areas can be adjacent to the same type of area, so it effectively
  // becomes an area twice the size"; all legends in them; "The route only cares about runestones"; islands grow by them): on an
  // island by roster, each of the night's legends is given an area of its own, grown out of the island's frontier beside one of its
  // kind's areas (its pair), taking the pair's kind and look: the roomiest such (the biggest circle it holds, up to what its
  // legend needs), never beside home or another legend area, nor a lake. No runestone, soundsystem, arena or route stop: its
  // legend's circle at its heart. Here, before the land, so the island's land and coast grow round them; the night's legends dealt
  // here too (the route isn't made yet: the early quest's areas taken as the three nearest home). The pair counts as one area
  // (map.areaOf, map.sameArea): a legend's kin and rage, wild creatures chasing and defending. A kind with no room beside any of
  // its areas keeps its legend in one of its own areas, as before (below, once the route's known).
  const legendAreas = new Map<string, string>(), pairCells = new Map<string, Cell>(); // (a legend area's key -> its pair's key, and its pair's cell)
  const slotRoom = new Map<string, number>(); // (each legend area's room, m: the biggest circle it holds, up to its first kind's need)
  let dealtKinds: string[] | null = null;
  const LC0 = tuning.legendClearing, areaMax = LC0.fit?.areaMax ?? LC0.fit?.max ?? 25;
  if (rosterIsland && grownSet && !zoo && tuning.legends?.areas !== false && others.length) {
    const homeKey = cellKey(centreCell[0], centreCell[1]), nearHome = new Set([homeKey, ...(neighbours.get(homeKey) ?? [])]);
    const kindOf = (k: string) => AREA_TYPES[types.get(k) ?? 0]?.creature;
    const byHome = [...others].sort((a, b) => Math.hypot(a[0] - centreCell[0], a[1] - centreCell[1]) - Math.hypot(b[0] - centreCell[0], b[1] - centreCell[1]));
    const first = byHome.slice(0, 3).map(([x, y]) => cellKey(x, y));
    const early = tuning.legends?.earlyQuest !== false ? first.filter(k => first.some(o => o !== k && kindOf(o) !== kindOf(k))).map(kindOf) : [];
    dealtKinds = dealLegends(rosterIsland, runSeed, new Set(MS.found ?? []), early);
    // The biggest circle (m, up to `want`) wholly in area k round a spot near its middle (16 points on its rim in it).
    const cellAt = (x: number, z: number) => { const [u, v] = toPart(x, z); return partition.partition(u, v); };
    const room = (k: string, want: number) => {
      const [cx, cy] = k.split(",").map(Number), s = siteOf(cx, cy), inside = (x: number, z: number) => { const c = cellAt(x, z); return c[0] === cx && c[1] === cy; };
      const holds = (x: number, z: number, r: number) => { for (let i = 0; i < 16; i++) { const b = (i / 16) * Math.PI * 2; if (!inside(x + Math.cos(b) * r, z + Math.sin(b) * r)) return false; } return true; };
      let best = 0;
      for (let i = -5; i <= 5 && best < want; i++) for (let j = -5; j <= 5 && best < want; j++) {
        const x = s.x + i * A * 0.07, z = s.z + j * A * 0.07;
        if (!inside(x, z) || !holds(x, z, best + 2)) continue;
        let r = best + 2;
        while (r + 2 <= want && holds(x, z, r + 2)) r += 2;
        best = r;
      }
      return best;
    };
    const taken = new Set<string>(), near = (k: string) => [...(neighbours.get(k) ?? [])];
    // (one for every kind a night could deal here, not just tonight's: the island's shape, and so its land, coast and chart
    // outline, is its world's every night; tonight's legends take theirs, the rest stand empty. The early quest's kinds choose
    // first, then the rest in an order seeded by the island's own seed.)
    const pool = [...new Set(rosterIsland.roster.map(r => r.kind))].filter(k => k !== rosterIsland.kind && !isPlaceholder(k)).sort();
    const order = [...pool.filter(k => early.includes(k)), ...pool.filter(k => !early.includes(k)).sort((a, b) => hash2(pool.indexOf(a), 3, shapeSeed + 6153) - hash2(pool.indexOf(b), 3, shapeSeed + 6153))];
    order.forEach((kind, ki) => {
      const want = legendRadius(kind, LC0, areaMax);
      let best: { k: string; pair: string; room: number; h: number } | null = null;
      for (const [x, y] of others) {
        const pair = cellKey(x, y);
        if (kindOf(pair) !== kind) continue;
        for (const k of near(pair)) {
          if (grownSet!.has(k) || lakeCells.has(k) || nearHome.has(k) || taken.has(k) || !growable(k) || near(k).some(o => taken.has(o) || lakeCells.has(o))) continue;
          const r = room(k, want), h = early.includes(kind) ? Math.hypot(x - centreCell[0], y - centreCell[1]) : hash2(x * 31 + y, ki, shapeSeed + 6151);
          // (the roomiest up to its legend's need; among those that hold it, an early kind's nearest home, else seeded)
          if (!best || Math.min(r, want) > Math.min(best.room, want) || (Math.min(r, want) === Math.min(best.room, want) && h < best.h)) best = { k, pair, room: r, h };
        }
      }
      if (!best) return;
      taken.add(best.k);
      slotRoom.set(best.k, best.room);
      legendAreas.set(best.k, best.pair);
      types.set(best.k, types.get(best.pair)!);
    });
    for (const [k, p] of legendAreas) { const [x, y] = p.split(",").map(Number); pairCells.set(k, [x, y]); }
  }
  const isLegendArea = (cx: number, cy: number) => legendAreas.has(cellKey(cx, cy));

  // The warp's steepest slope (vnoise's gradient is at most 1.5 a component), so a step of d metres
  // moves a point at most d * stretch / A in partition units.
  const stretch = 1 + (2 * V / L) * 1.5 * 2;
  const cellSafe = (x: number, z: number) => { const [u, v] = toPart(x, z), r = partition.partitionSafe(u, v); return { cell: r.cell, safe: (r.safe * A) / stretch }; };
  // The island's land (rules/land.ts; Ed, 2026-10-11): its playable areas and the buffer ring's (the areas whose centres lie
  // within the buffer of them), whole; its coast runs round their borders. Made once here, then asked how far from the water by
  // everything that cares. Past it, the sea.
  const landCells = new Set<string>();
  let land: LandMap | undefined, lakes: LandMap | undefined;
  if (round) {
    // (the playable areas, and every area that comes within the buffer's depth of them, `deep` metres: so everything placed for
    // play stands that far from the sea at least, whatever the island's shape; found on a coarse grid swept for its distance to
    // the playable ground)
    const want = new Set<string>(), deep = MS.buffer * A * 0.85, G = 20;
    for (const [cx, cy] of cells) want.add(cellKey(cx, cy));
    for (const k of legendAreas.keys()) want.add(k); // (its legend areas its ground too: the buffer and the coast round them)
    let px0 = Infinity, px1 = -Infinity, pz0 = Infinity, pz1 = -Infinity;
    for (const [cx, cy] of [...cells, ...[...legendAreas.keys()].map((k): Cell => { const [x, y] = k.split(",").map(Number); return [x, y]; })]) { const s = siteOf(cx, cy); px0 = Math.min(px0, s.x); px1 = Math.max(px1, s.x); pz0 = Math.min(pz0, s.z); pz1 = Math.max(pz1, s.z); }
    px0 -= deep + A; px1 += deep + A; pz0 -= deep + A; pz1 += deep + A;
    const gc = Math.ceil((px1 - px0) / G) + 1, gr = Math.ceil((pz1 - pz0) / G) + 1, dd = new Float32Array(gc * gr).fill(Infinity), at: string[] = new Array(gc * gr);
    for (let j = 0; j < gr; j++) for (let i = 0; i < gc; i++) {
      const [u, v] = toPart(px0 + i * G, pz0 + j * G), c = partition.partition(u, v), k = j * gc + i;
      at[k] = cellKey(c[0], c[1]);
      if (playable(c[0], c[1]) || lakeCells.has(at[k]) || legendAreas.has(at[k])) dd[k] = 0; // (a lake is ringed by land as deep: never a lake on the coast)
    }
    const D2 = G * Math.SQRT2, relax = (k: number, q: number, w: number) => { if (dd[q] + w < dd[k]) dd[k] = dd[q] + w; };
    for (let j = 0; j < gr; j++) for (let i = 0; i < gc; i++) { const k = j * gc + i; if (i) relax(k, k - 1, G); if (j) { relax(k, k - gc, G); if (i) relax(k, k - gc - 1, D2); if (i < gc - 1) relax(k, k - gc + 1, D2); } }
    for (let j = gr - 1; j >= 0; j--) for (let i = gc - 1; i >= 0; i--) { const k = j * gc + i; if (i < gc - 1) relax(k, k + 1, G); if (j < gr - 1) { relax(k, k + gc, G); if (i < gc - 1) relax(k, k + gc + 1, D2); if (i) relax(k, k + gc - 1, D2); } }
    // (and in its patch: no land past half a strait in from its edge, so its coast and its neighbour's keep a strait between)
    const inPatch = (k: number) => { if (!patch) return true; const [cx, cy] = at[k].split(",").map(Number), q = siteOf(cx, cy), dx = q.x - centre.x, dz = q.z - centre.z; return Math.hypot(dx, dz) <= patchAt(patch, Math.atan2(dz, dx)) - STRAIT / 2 - A * 0.6; }; // (an area's ground reaches past its centre)
    for (let k = 0; k < dd.length; k++) if (dd[k] <= deep && (dd[k] === 0 || inPatch(k))) want.add(at[k]);
    // (one island: those joined to home's; and any area they ring round taken in, so no stray pond of a ghost area)
    const homeKey = cellKey(centreCell[0], centreCell[1]), todo = [homeKey];
    landCells.add(homeKey);
    while (todo.length) for (const k of neighbours.get(todo.pop()!) ?? []) if (want.has(k) && !landCells.has(k)) { landCells.add(k); todo.push(k); }
    const sea = new Set<string>(), edge: string[] = [];
    for (const k of neighbours.keys()) { const [x, y] = k.split(",").map(Number); if (!landCells.has(k) && (x <= lo || y <= lo || x >= hi - 1 || y >= hi - 1)) { sea.add(k); edge.push(k); } }
    while (edge.length) for (const k of neighbours.get(edge.pop()!) ?? []) if (!landCells.has(k) && !sea.has(k)) { sea.add(k); edge.push(k); }
    for (const k of neighbours.keys()) if (!sea.has(k)) landCells.add(k);
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (const k of landCells) { const [cx, cy] = k.split(",").map(Number), s = siteOf(cx, cy); x0 = Math.min(x0, s.x); x1 = Math.max(x1, s.x); z0 = Math.min(z0, s.z); z1 = Math.max(z1, s.z); }
    // (and never past half a strait in from its patch's edge, whatever its areas' ground: its coast and its neighbour's keep a
    // strait apart, the coast running along the strait where an area would reach over)
    // (by its true distance from the patch's edge near it: the edge crosses the way out from home's middle at a slant)
    const rim = patch ? Array.from(patch, (r, a) => { const t = (a / patch.length) * Math.PI * 2; return [Math.cos(t) * r, Math.sin(t) * r]; }) : [];
    // (each rim segment's middle and half its length: a sample further from the middle than that half plus half a strait, and
    // a metre over for rounding, is further than half a strait from every point of it, so the segment is skipped untested;
    // the rest are measured as before. The land map's samples went round all 96 segments each: a fifth of an island's making.)
    const rimMid = new Float64Array(rim.length * 3);
    for (let i = 0; i < rim.length; i++) {
      const [ax, az] = rim[i], [bx, bz] = rim[(i + 1) % rim.length], half = Math.hypot(bx - ax, bz - az) / 2 + STRAIT / 2 + 1;
      rimMid[i * 3] = (ax + bx) / 2; rimMid[i * 3 + 1] = (az + bz) / 2; rimMid[i * 3 + 2] = half * half;
    }
    const inStrait = (x: number, z: number) => {
      if (!patch) return true;
      const dx = x - centre.x, dz = z - centre.z, r = Math.hypot(dx, dz), out = patchAt(patch, Math.atan2(dz, dx));
      if (r > out - STRAIT / 2) return false;
      if (r < out - STRAIT * 3) return true;
      for (let i = 0; i < rim.length; i++) {
        const mx = dx - rimMid[i * 3], mz = dz - rimMid[i * 3 + 1];
        if (mx * mx + mz * mz > rimMid[i * 3 + 2]) continue;
        const [ax, az] = rim[i], [bx, bz] = rim[(i + 1) % rim.length], ex = bx - ax, ez = bz - az, f = Math.max(0, Math.min(1, ((dx - ax) * ex + (dz - az) * ez) / (ex * ex + ez * ez || 1)));
        if (Math.hypot(dx - ax - ex * f, dz - az - ez * f) < STRAIT / 2) return false;
      }
      return true;
    };
    const isLand = (x: number, z: number) => { if (!inStrait(x, z)) return false; const [u, v] = toPart(x, z), c = partition.partition(u, v); return landCells.has(cellKey(c[0], c[1])); };
    land = prep?.land ? landOf(prep.land) : makeLand(isLand, { minX: x0 - A, maxX: x1 + A, minZ: z0 - A, maxZ: z1 + A }, only?.landStep ?? LAND_STEP, 64, (A * 0.5) ** 2, only ? 1 : 2, true); // (crumbs under a quarter of an area's square taken as what's round them; slivers under about 16 m smoothed; ponds filled: no lakes but those meant)
    // The lakes' own map (the same kind, its "land" the lakes' water: + in a lake, - ashore), over the lakes' areas alone; the
    // island's land above has them as land (her flight's edge, the beach and the sea are the sea's alone).
    if (lakeCells.size) {
      let lx0 = Infinity, lx1 = -Infinity, lz0 = Infinity, lz1 = -Infinity;
      for (const k of lakeCells) { const [cx, cy] = k.split(",").map(Number), s = siteOf(cx, cy); lx0 = Math.min(lx0, s.x); lx1 = Math.max(lx1, s.x); lz0 = Math.min(lz0, s.z); lz1 = Math.max(lz1, s.z); }
      const isLakeAt = (x: number, z: number) => { const [u, v] = toPart(x, z), c = partition.partition(u, v); return lakeCells.has(cellKey(c[0], c[1])); };
      lakes = prep ? (prep.lakes ? landOf(prep.lakes) : undefined) : makeLand(isLakeAt, { minX: lx0 - A, maxX: lx1 + A, minZ: lz0 - A, maxZ: lz1 + A }, only?.landStep ?? LAND_STEP, 32, (A * 0.5) ** 2, only ? 1 : 2, true);
    }
    if (only) return { land, lakes, home: centre, areaSize: A, cells: cells.map(c => cellKey(c[0], c[1])) } as unknown as ForestMap; // (islandLand: the land alone)
  }
  // The zoo's lakes (the islands not found yet): their own map, as an island's lakes', over their outlines.
  if (zooAt && lakeCells.size) {
    const wet = zooAt.islands.filter(I => !I.found);
    let lx0 = Infinity, lx1 = -Infinity, lz0 = Infinity, lz1 = -Infinity;
    for (const I of wet) { lx0 = Math.min(lx0, I.x - I.most); lx1 = Math.max(lx1, I.x + I.most); lz0 = Math.min(lz0, I.z - I.most); lz1 = Math.max(lz1, I.z + I.most); }
    const isLakeAt = (x: number, z: number) => { const c = partition.partition(x / A, z / A); return lakeCells.has(cellKey(c[0], c[1])); };
    lakes = prep ? (prep.lakes ? landOf(prep.lakes) : undefined) : makeLand(isLakeAt, { minX: lx0 - A, maxX: lx1 + A, minZ: lz0 - A, maxZ: lz1 + A }, LAND_STEP, 32, (A * 0.25) ** 2, 2, true);
  }
  // The zoo's disc (Ed, 2026-10-26: "Around the edge of the zoo, it looks like the map; all around the flagstones give way to
  // water, which falls off the disc as a waterfall, and behind that is space"): its land a disc out `margin` past the furthest
  // coast; past it the sea (rules/mapShape.ts beachOf: the zoo's beach a strip of flagstones' width), its lip and the fall drawn.
  if (zooAt && !land) {
    const R = zooAt.reach + (ZOO_CONFIG.margin ?? 120), h = zooAt.home;
    land = prep?.land ? landOf(prep.land) : makeLand((x, z) => Math.hypot(x - h.x, z - h.z) <= R, { minX: h.x - R, maxX: h.x + R, minZ: h.z - R, maxZ: h.z + R }, 8, 96);
  }
  // (how far into a lake: rules/lakes.ts; nothing grows or is placed on one or its shore)
  const lakeShore = lakeKnobs(tuning).shore, lakeAt = (x: number, z: number) => (lakes ? lakeDepth({ lakes } as Bounds, x, z) : -Infinity);
  const areaAt = (x: number, z: number): AreaSample => {
    // (toPart inline: no [u, v] tuple a call; phase 2's GC audit, the same sums)
    const uu = x / A, vv = z / A;
    const u = uu + V * (vnoise(uu / L, vv / L, shapeSeed + 91) - 0.5) * 2, v = vv + V * (vnoise(uu / L, vv / L, shapeSeed + 92) - 0.5) * 2, cell = partition.partition(u, v);
    return { cell, type: typeOf(cell[0], cell[1]), look: cell[0] === centreCell[0] && cell[1] === centreCell[1] ? HOME_LOOK : typeOf(cell[0], cell[1]), openness: partition.openness(u, v) };
  };
  // An area that rolls a set piece (setPieceChance of those whose type has one; not home).
  const rollsSetPiece = (cx: number, cy: number) => {
    const t = AREA_TYPES[typeOf(cx, cy)];
    return !!t.setPiece && !(cx === centreCell[0] && cy === centreCell[1]) && hash2(cx, cy, seed + 61) < tuning.setPieceChance;
  };
  // Each set piece at most once per map (Ed, v160): in the area of its type nearest home that
  // rolls one and has room for it; the type's other areas get none.
  let pieceHome: Map<number, string> | null = null;
  const setPieceOf = (cx: number, cy: number) => {
    if (!pieceHome) {
      pieceHome = new Map();
      const cand: [number, number, number][] = [];
      for (const [x, y] of cells) if (rollsSetPiece(x, y)) cand.push([x, y, Math.hypot(x - centreCell[0], y - centreCell[1]) + hash2(x, y, seed + 63) * 0.5]);
      cand.sort((a, b) => a[2] - b[2]);
      for (const [x, y] of cand) { const t = typeOf(x, y); if (!pieceHome.has(t) && pieceSpotOf(x, y)) pieceHome.set(t, cellKey(x, y)); }
    }
    const t = typeOf(cx, cy);
    return pieceHome.get(t) === cellKey(cx, cy) ? AREA_TYPES[t].setPiece! : null;
  };
  // The dancefloor keeps a clearing of its own, however close a neighbouring area's centre.
  const floorR = tuning.dancefloor.radius, floorClear = floorClearing(tuning); // out past the speakers

  // Gameplay is placed first: each area's soundsystem spot is reserved from the start (whether or
  // not the party has reached it yet), then scenery keeps clear of it and of the dancefloor.
  const inCell = (x: number, z: number, cx: number, cy: number) => { const c = areaAt(x, z).cell; return c[0] === cx && c[1] === cy; };
  const soundSpots = new Map<string, { x: number; z: number }>();
  const soundsystemSpot = (cx: number, cy: number) => {
    const key = cellKey(cx, cy), had = soundSpots.get(key);
    if (had) return had;
    // (the zoo: its legend lies at its island's middle, so its runestone stands by the south shore, by the street: Ed, 2026-10-26)
    const zi = zooAt?.islands.find(I => I.cell[0] === cx && I.cell[1] === cy);
    if (zi) { const spot = { x: zi.x, z: zi.z + coastAlong(zi, Math.PI / 2) * 0.72 }; soundSpots.set(key, spot); return spot; } // (toward its south shore, the first coast that way: bays as they are)
    // Beside the area's centre, in its clearing, inside its own ground.
    const s = siteOf(cx, cy), r = rng(seed * 17 + cx * 53 + cy * 911);
    let [ax, az] = [s.x, s.z];
    if (!inCell(s.x, s.z, cx, cy)) search: for (let d = 2; d < A * 0.75 * 1.5; d += 2) for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2, x = s.x + Math.cos(a) * d, z = s.z + Math.sin(a) * d;
      if (inCell(x, z, cx, cy)) { [ax, az] = [x, z]; break search; }
    }
    let spot = { x: ax, z: az };
    for (let i = 0; i < 24; i++) {
      const a = r() * Math.PI * 2, d = 3 + r() * 4, x = ax + Math.cos(a) * d, z = az + Math.sin(a) * d + 3;
      if (inCell(x, z, cx, cy)) { spot = { x, z }; break; }
    }
    // Off any path, road, railway or stream's corridor (Ed, v160: paths run on unbroken), and never
    // in the dancefloor's ring of speakers or its clearing (Ed, v183), the nearest clear spot round
    // it if it fell on one.
    const onPath = (x: number, z: number) => !!map.paths.at(x, z, tuning.soundsystemFootprint + 1) || Math.hypot(x - centre.x, z - centre.z) < floorClear + tuning.soundsystemFootprint;
    if (onPath(spot.x, spot.z)) search: for (let d = 3; d < A * 0.3; d += 3) for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2, x = spot.x + Math.cos(a) * d, z = spot.z + Math.sin(a) * d;
      if (inCell(x, z, cx, cy) && !onPath(x, z)) { spot = { x, z }; break search; }
    }
    soundSpots.set(key, spot);
    return spot;
  };
  const TH = tuning.treehouse, ta = (TH.angle * Math.PI) / 180;
  const treehouse = { x: centre.x + Math.cos(ta) * treehouseDistance(tuning), z: centre.z + Math.sin(ta) * treehouseDistance(tuning) };
  const pieceSpots = new Map<string, { x: number; z: number } | null>();
  const setPieceSpot = (cx: number, cy: number) => (setPieceOf(cx, cy) ? pieceSpotOf(cx, cy) : null);
  // Where a set piece would stand in an area that rolls one, or null if there's no room.
  const pieceSpotOf = (cx: number, cy: number) => {
    const key = cellKey(cx, cy);
    if (pieceSpots.has(key)) return pieceSpots.get(key)!;
    let spot: { x: number; z: number } | null = null;
    if (rollsSetPiece(cx, cy)) {
      const R = tuning.setPieceFootprint * tuning.setPieceScale, gap = tuning.reserveMargin;
      const sounds = [cellKey(cx, cy), ...(neighbours.get(cellKey(cx, cy)) ?? [])].map(k => k.split(",").map(Number)).filter(([x, y]) => playable(x, y)).map(([x, y]) => soundsystemSpot(x, y));
      const clear = (x: number, z: number) => inCell(x, z, cx, cy)
        && sounds.every(p => Math.hypot(x - p.x, z - p.z) >= R + tuning.soundsystemFootprint + gap)
        && Math.hypot(x - centre.x, z - centre.z) >= R + floorClear + gap
        && Math.hypot(x - treehouse.x, z - treehouse.z) >= R + TH.clear + gap
        && clearOfStones(x, z, R)
        && !map.paths.at(x, z, R);
      // Its old place (a little north of the centre) if that is clear, else the nearest clear
      // spot round it, out past the stone's keep-clear zone.
      const s = siteOf(cx, cy);
      search: for (let d = 0; d <= A * 0.5; d += 3) for (let k = 0; k < (d ? 16 : 1); k++) {
        const a = (k / 16) * Math.PI * 2, x = s.x + Math.cos(a) * d, z = s.z - 4 + Math.sin(a) * d;
        if (clear(x, z)) { spot = { x, z }; break search; }
      }
    }
    pieceSpots.set(key, spot);
    return spot;
  };
  const legendCells = zoo ? new Set(cells.filter(([x, y]) => x !== centreCell[0] || y !== centreCell[1]).map(([x, y]) => cellKey(x, y))) : rosterIsland ? new Set<string>() : chooseLegendCells(cells, centreCell, neighbours, tuning.legends?.share ?? 1, seed); // (the playable areas; an island by roster deals its own below, once the route's known)
  let legendKinds: string[] = [];
  const grounds: Ground[] = [], scenes: Scene[] = [], clearings = new Map<string, LegendClearing>();
  const reserved = (x: number, z: number, r: number) => {
    const gap = tuning.reserveMargin, cell = areaAt(x, z).cell;
    for (const c of clearings.values()) if (Math.abs(x - c.x) < r + c.r + gap && Math.abs(z - c.z) < r + c.r + gap && Math.hypot(x - c.x, z - c.z) < r + c.r + gap) return true;
    if (Math.hypot(x - centre.x, z - centre.z) < r + floorClear + gap) return true;
    if (Math.hypot(x - treehouse.x, z - treehouse.z) < r + TH.clear + gap) return true;
    if (lakes && lakeAt(x, z) > -(r + lakeShore + gap)) return true; // (nothing placed on a lake or its shore: rules/lakes.ts)
    for (const g of grounds) if (Math.hypot(x - g.x, z - g.z) < r + g.r + gap) return true;
    for (const c of scenes) if (Math.hypot(x - c.x, z - c.z) < r + c.r + gap) return true;
    for (const k of [cellKey(cell[0], cell[1]), ...(neighbours.get(cellKey(cell[0], cell[1])) ?? [])]) {
      const [cx, cy] = k.split(",").map(Number);
      if (!(cx === centreCell[0] && cy === centreCell[1]) && playable(cx, cy)) { const q = soundsystemSpot(cx, cy); if (Math.hypot(x - q.x, z - q.z) < r + tuning.soundsystemFootprint + gap) return true; }
      const p = setPieceSpot(cx, cy);
      if (p && Math.hypot(x - p.x, z - p.z) < r + tuning.setPieceFootprint * tuning.setPieceScale + gap) return true;
    }
    return false;
  };
  // The keep-clear zone round every area's great stump, or its runestone where the stumps are off (Ed, 2026-10-29: "No special
  // areas should appear so close to stump/runestone areas; no special scenery, no finds or flasks, no legend circles"): the
  // scenes and set pieces, ruins and freak trees, modern relics, the night's find, the flasks, the legends' clearings, walls and
  // stone rings, ponds and campfires, the party's picnics and campfires and the grounds each keep their whole footprint
  // stoneKeepClear metres from the stone's middle (its soundsystem's spot). How far (x, z) is from the nearest stone's middle:
  const keepClear = tuning.stoneKeepClear ?? 40;
  let stoneSites: { cx: number; cy: number; x: number; z: number }[] | null = null;
  const stoneGap = (x: number, z: number) => {
    stoneSites ??= cells.filter(([cx, cy]) => playable(cx, cy) && !(cx === centreCell[0] && cy === centreCell[1])).map(([cx, cy]) => ({ cx, cy, ...siteOf(cx, cy) }));
    const reach = keepClear + A * 2; // (a stone lies at most about 1.5 areas from its site: soundsystemSpot)
    let best = Infinity;
    for (const s of stoneSites) {
      if (Math.abs(x - s.x) > reach || Math.abs(z - s.z) > reach) continue;
      const q = soundsystemSpot(s.cx, s.cy);
      best = Math.min(best, Math.hypot(x - q.x, z - q.z));
    }
    return best;
  };
  const clearOfStones = (x: number, z: number, r = 0) => stoneGap(x, z) >= keepClear + r;
  // The beach and the sea past it (the tuning's beach): nothing grows or stands there.
  const pad = A * 0.5;
  const bounds: Bounds = land
    ? { ...land.box, land, lakes, seed: shapeSeed, ...(zooAt ? { fence: zooFence(zooAt, A) } : {}) }
    : { minX: pad, maxX: n * A - pad, minZ: pad, maxZ: n * A - pad, ...(lakes ? { lakes, seed: shapeSeed } : {}), ...(zooAt ? { fence: zooFence(zooAt, A) } : {}) };
  const beach = beachOf(bounds, tuning);
  const hardCell = (x: number, z: number, cell: Cell) => {
    if (beach && beach.intoSand(x, z) > 0) return true;
    if (zooAt && cell[0] === centreCell[0] && cell[1] === centreCell[1]) return true; // (the zoo's plaza and streets: bare stone)
    if (lakes && lakeAt(x, z) > -lakeShore) return true; // (a lake and its bare shore: rules/lakes.ts)
    if (Math.hypot(x - centre.x, z - centre.z) < floorClear) return true;
    // (the circle lying in this cell: a legend area's is kept under its pair's key; a pair's legend lying next door isn't its own)
    const key = cellKey(cell[0], cell[1]), held = clearings.get(key) ?? (legendAreas.size ? clearings.get(legendAreas.get(key) ?? "") : undefined);
    const lc = held && held.cell[0] === cell[0] && held.cell[1] === cell[1] ? held : undefined;
    if (lc && Math.hypot(x - lc.x, z - lc.z) < lc.r + (vnoise(x / 4, z / 4, seed + 93) - 0.5) * 3) return true; // a sleeping legend's clearing (its edge ragged by a metre and a half either way: the art director on #235)
    if (Math.hypot(x - treehouse.x, z - treehouse.z) < TH.clear) return true;
    for (const g of grounds) if (Math.abs(x - g.x) < g.r && Math.abs(z - g.z) < g.r && Math.hypot(x - g.x, z - g.z) < g.r) return true;
    for (const c of scenes) if (Math.abs(x - c.x) < c.r && Math.abs(z - c.z) < c.r && Math.hypot(x - c.x, z - c.z) < c.r * 0.85) return true; // a scene's ground is clear of trees
    // A set piece keeps a clearing round it, sized with it; a soundsystem a little room.
    const p = setPieceSpot(cell[0], cell[1]);
    if (p && Math.hypot(x - p.x, z - p.z) < tuning.setPieceClear * tuning.setPieceScale) return true;
    if (cell[0] === centreCell[0] && cell[1] === centreCell[1]) return false;
    if (!playable(cell[0], cell[1])) return false; // (no soundsystem ever stands in the buffer's areas)
    const q = soundsystemSpot(cell[0], cell[1]);
    // (a great stump in its place: its roots kept clear of trees, runeMarkers.stump.clear: Ed, 2026-10-29)
    const S = tuning.runeMarkers?.stump;
    return Math.hypot(x - q.x, z - q.z) < Math.max(tuning.soundsystemFootprint + tuning.treeMarginFromSoundsystem, S?.on ? S.clear : 0);
  };
  const hardClear = (x: number, z: number) => { const [u, v] = toPart(x, z); return hardCell(x, z, partition.partition(u, v)); };
  // Every area's fighting arena (Ed, 2026-10-05: "each is effectively a fighting arena... not much
  // room to fight in each area"; then "softer edges, the falloff between dense forest and clearing
  // smoother"): mostly open within arena.radius metres of its centre and its soundsystem, the woods
  // thickening along a smooth curve over a band arena.band metres wide beyond, its distance
  // wobbled by noise (arena.noise of the band) so the edge is no ring; both times the fight's scale.
  // Only the playable areas have one: the buffer's by the beach never get a runestone, soundsystem or
  // fight, so an arena there was an empty hole in the woods (Ed, 2026-10-26).
  const arenaIn = (x: number, z: number, cell: Cell) => {
    const R = tuning.arena;
    if (!R || R.radius <= 0 || !playable(cell[0], cell[1])) return 1;
    const k = tuning.fight?.scale ?? 1, s = siteXZ(cell[0], cell[1]), q = soundsystemSpot(cell[0], cell[1]);
    const d = Math.min(Math.hypot(x - s[0], z - s[1]), Math.hypot(x - q.x, z - q.z)), band = R.band * k;
    const wob = (vnoise(x / 14, z / 14, seed + 71) - 0.5) * 2 * R.noise * band;
    const f = Math.min(1, Math.max(0, (d + wob - R.radius * k) / Math.max(0.01, band)));
    return R.curve === "smooth" ? smoothstep(f) : f; // (linear: the woods start thinning in right past the open middle, Ed at v473)
  };
  const arenaOpen = (x: number, z: number, cell?: Cell) => arenaIn(x, z, cell ?? areaAt(x, z).cell);
  const treeWeight = (x: number, z: number) => {
    const [u, v] = toPart(x, z), cell = partition.partition(u, v);
    if (hardCell(x, z, cell)) return 0;
    // Clearings round area centres and random glades, each with a soft edge (Ed: no hard rings).
    const glade = 1 - smoothstep((vnoise(x / tuning.gladeScale, z / tuning.gladeScale, seed + 61) - (1 - tuning.gladeAmount)) / 0.12);
    return smoothstep((partition.openness(u, v) - tuning.clearingSize) / Math.max(0.01, tuning.clearingFalloff)) * glade * arenaIn(x, z, cell);
  };

  const remoteness = (cx: number, cy: number) => Math.min(1, Math.hypot(cx - centreCell[0], cy - centreCell[1]) / (round ? R : n / 2));
  // (a legend area counts as its pair: the cell itself otherwise, unallocated; on a map without legend areas, no lookup at all)
  const areaOf = (cell: Cell): Cell => (legendAreas.size ? pairCells.get(cellKey(cell[0], cell[1])) ?? cell : cell);
  const sameArea = (a: Cell, b: Cell) => (a[0] === b[0] && a[1] === b[1]) || (legendAreas.size > 0 && (() => { const p = areaOf(a), q = areaOf(b); return p[0] === q[0] && p[1] === q[1]; })());
  const map = {
    seed, tuning, n, first, margin, shape, cells, playable, inBuffer, isLake, coast, areaSize: A, partition, centreCell, homeRadius,
    dancefloor: { x: centre.x, z: centre.z, radius: floorR, speakers: speakerRing(centre, tuning) },
    treehouse, treehouseFront: frontOf(treehouse, centre, tuning.treehouse.clear), grounds, scenes,
    start: zooAt ? { x: zooAt.home.x, z: zooAt.home.z + (ZOO_CONFIG.plaza ?? 60) * 0.3 } : { x: treehouse.x + seatOffset(tuning).x, z: treehouse.z + seatOffset(tuning).z }, // (the zoo: on the Ent's plaza, no treehouse) // (her decks: on the Terrace's open rim, or the deck: rules/treehouse.ts)
    bounds,
    extent: ext ? (land ? { minX: Math.min(ext.minX, land.box.minX - edgeK * A), maxX: Math.max(ext.maxX, land.box.maxX + edgeK * A), minZ: Math.min(ext.minZ, land.box.minZ - edgeK * A), maxZ: Math.max(ext.maxZ, land.box.maxZ + edgeK * A) } : ext) : { minX: lo * A, maxX: hi * A, minZ: lo * A, maxZ: hi * A }, // (the forest past the coast all round)
    typeOf, areaAt, cellSafe, siteOf, treeWeight, arenaOpen, hardClear, neighbours, setPieceOf, soundsystemSpot, setPieceSpot, reserved, stoneGap, clearOfStones, remoteness,
    legendAreas, isLegendArea, areaOf, sameArea,
    hasLegend: (cx: number, cy: number) => legendCells.has(cellKey(cx, cy)), legendCells,
    island: rosterIsland, legendKinds, zoo: zoo ? { ...zoo, junctions: zoo.layout ? [] : zooJunctions(zoo, A) } : undefined,
    legendClearing: (cx: number, cy: number) => clearings.get(cellKey(cx, cy)) ?? (legendAreas.size ? clearings.get(legendAreas.get(cellKey(cx, cy)) ?? "") ?? null : null), legendClearings: [] as LegendClearing[], // (by its legend's area: a legend area's by its pair)
    paths: null as unknown as PathNetwork,
  };
  if (prep?.route) rememberRoute(map as unknown as ForestMap, prep.route); // (its route, already worked out: rules/leyroute.ts)
  // The paths first (their lines need only the areas), so soundsystems, set pieces and the
  // grounds can keep off them; then the grounds; then the paths' pieces, clear of all of those.
  map.paths = new PathNetwork(map);
  // The night's deal (Ed, 2026-10-28; rules/deal.ts): the island's types dealt again onto its areas along tonight's route, its own
  // kind first, no kind twice in a row; its shapes (areas, lakes, coast, legend areas) left as its world made them. The route
  // first (through the soundsystems' spots, kept off the paths made above: those spots are kept, so the route and its stones stay
  // as planned), then the deal, then everything that follows the types: the shore's forest, the legend areas' pairs and looks,
  // the paths again (the streams between wet areas: the only lines that follow the types), the set pieces and scenes below.
  let legendSlotOf: Map<string, string> | null = null;
  if (rosterIsland && !zoo && others.length > 1) {
    const order = routeOf(map as unknown as ForestMap).order, at = (k: string): Cell => { const [x, y] = k.split(",").map(Number); return [x, y]; };
    for (const k of order) { const [x, y] = at(k); soundsystemSpot(x, y); } // (kept: the route's stones)
    const kindOfType = (t: number) => AREA_TYPES[t]?.creature ?? "", own = rosterIsland.kind === "home" ? null : rosterIsland.kind;
    const deck = order.map(k => types.get(k)!), found = new Set(MS.found ?? []), before = new Map(types);
    // (the legend areas each of tonight's legends could have, given a deal: those beside one of its kind's areas, the roomiest
    // for it first; tonight's legends as the route's first three areas deal them, rules/rosters.ts dealLegends)
    const slots = [...legendAreas.keys()], homeKey = cellKey(centreCell[0], centreCell[1]);
    const legendsOf = (dealt: number[]) => {
      const kindAt = new Map(order.map((k, i) => [k, kindOfType(dealt[i])]));
      const first = order.slice(0, 3), early = tuning.legends?.earlyQuest !== false ? first.filter(k => first.some(o => o !== k && kindAt.get(o) !== kindAt.get(k))).map(k => kindAt.get(k)!) : [];
      const kinds = dealLegends(rosterIsland, runSeed, found, early), byKind = new Map<string, string[]>();
      for (const kind of kinds) {
        const want = legendRadius(kind, LC0, areaMax), fits = (s: string) => Math.min(slotRoom.get(s) ?? 0, want); // (room up to its need)
        byKind.set(kind, slots.filter(s => [...(neighbours.get(s) ?? [])].some(o => o !== homeKey && kindAt.get(o) === kind)).sort((a, b) => fits(b) - fits(a) || (a < b ? -1 : 1)));
      }
      const slotOf = matchLegendAreas(kinds, k => byKind.get(k) ?? []);
      return { kinds, slotOf, kindAt };
    };
    const { types: dealt } = dealAlongRoute(deck, kindOfType, own, runSeed, d => legendsOf(d).slotOf.size);
    order.forEach((k, i) => types.set(k, dealt[i]));
    typeBeyond();
    // (the legend areas paired again: tonight's legends each beside one of its kind's areas where the matching found one, the rest
    // beside the area they were grown from, each taking its pair's look)
    const { kinds, slotOf, kindAt } = legendsOf(dealt), mine = new Map([...slotOf].map(([kind, s]) => [s, kind]));
    // (each pair its own: tonight's legends' first, then the rest, the area each was grown beside where it's free)
    const used = new Set<string>(), nextTo = (s: string) => [...(neighbours.get(s) ?? [])].filter(o => kindAt.has(o) && !used.has(o)).sort((a, b) => order.indexOf(a) - order.indexOf(b));
    const pairOf = new Map<string, string>();
    for (const s of slots) { const kind = mine.get(s); if (!kind) continue; const p = nextTo(s).find(o => kindAt.get(o) === kind)!; pairOf.set(s, p); used.add(p); }
    for (const s of slots) { if (mine.has(s)) continue; const was = legendAreas.get(s)!, p = !used.has(was) ? was : nextTo(s)[0] ?? was; pairOf.set(s, p); used.add(p); }
    for (const s of slots) {
      const pair = pairOf.get(s)!;
      legendAreas.set(s, pair);
      pairCells.set(s, at(pair));
      types.set(s, types.get(pair)!);
    }
    dealtKinds = kinds;
    legendSlotOf = new Map([...slotOf].map(([kind, s]) => [kind, legendAreas.get(s)!]));
    pieceHome = null;
    pieceSpots.clear();
    map.paths = new PathNetwork(map, (cx, cy) => AREA_TYPES[before.get(cellKey(cx, cy)) ?? typeOf(cx, cy)].wet);
  }
  // The grounds: some areas (not home) have one, off to the side of the area's centre; its whole
  // clearing keeps clear of everything placed before it (soundsystems, the dancefloor, the
  // treehouse, set pieces, other grounds), turning round the centre to find room, or left out.
  const G = tuning.grounds, usedGrounds = new Set<string>();
  for (const [cx, cy] of cells) {
    if ((cx === centreCell[0] && cy === centreCell[1]) || hash2(cx, cy, seed + 871) >= G.chance) continue;
    // Each kind at most once per map (Ed, v160): the kind it rolled, or the next one not yet used.
    let ki = Math.floor(hash2(cx, cy, seed + 873) * G.kinds.length), tries = 0;
    while (usedGrounds.has(G.kinds[ki]) && tries++ < G.kinds.length) ki = (ki + 1) % G.kinds.length;
    if (usedGrounds.has(G.kinds[ki])) continue;
    const kind = G.kinds[ki], r = G.radius[kind] ?? 8, a = hash2(cx, cy, seed + 875) * Math.PI * 2, site = siteOf(cx, cy);
    search: for (const d of [r + 6, r + 14, r + 24, r + 36, r + 50, r + 66]) for (let k = 0; k < 12; k++) { // (the farther rings: out past the stone's keep-clear zone)
      const b = a + (k / 12) * Math.PI * 2, x = site.x + Math.cos(b) * d, z = site.z + Math.sin(b) * d;
      if (inCell(x, z, cx, cy) && !reserved(x, z, r) && clearOfStones(x, z, r)) { grounds.push({ kind, x, z, r, flip: hash2(cx, cy, seed + 877) < 0.5 }); usedGrounds.add(kind); break search; }
    }
  }
  // Scenes (Ed, 2026-10-04): small vignettes and large landmarks of a few pieces each, each at
  // most once per map, in an area it suits; like a ground, off to the side of the area's centre,
  // its whole footprint clear of everything placed before it and of the paths, mirrored at random.
  const SC = tuning.scenes, usedScenes = new Set<string>();
  const order: [number, number, number][] = [];
  for (const [cx, cy] of cells) if (!(cx === centreCell[0] && cy === centreCell[1])) order.push([cx, cy, hash2(cx, cy, seed + 881)]);
  order.sort((a, b) => a[2] - b[2]);
  const placeScene = (id: string, cx: number, cy: number): boolean => {
    const r = sceneFootprint(id, tuning), a = hash2(cx, cy, seed + 885) * Math.PI * 2, site = siteOf(cx, cy);
    for (const d of [r + 8, r + 16, r + 26, r + 38, r + 52, r + 68]) for (let k = 0; k < 12; k++) { // (the farther rings: out past the stone's keep-clear zone)
      const b = a + (k / 12) * Math.PI * 2, x = site.x + Math.cos(b) * d, z = site.z + Math.sin(b) * d;
      if (inCell(x, z, cx, cy) && !reserved(x, z, r) && clearOfStones(x, z, r) && !map.paths.at(x, z, r * 0.7)) { scenes.push({ id, x, z, r, mirror: hash2(cx, cy, seed + 887) < 0.5 }); usedScenes.add(id); return true; }
    }
    return false;
  };
  // A featured scene, one of its ids (Ed, 2026-10-11: the temple ruins on most islands, the Greek temple or the classical ruins): on a map at its chance, in the first area it suits that has
  // room, else in any area that has room (an island of 10 areas often has none of the types it suits).
  const FS = SC.featured, pool = (FS?.ids ?? []).flatMap(id => (id.endsWith("*") ? SCENES.filter(sc => sc.id.startsWith(id.slice(0, -1))).map(sc => sc.id) : SCENES.some(sc => sc.id === id) ? [id] : [])); // ("temple-*": every scene whose id starts so)
  if (FS && pool.length && hash2(seed, 7, seed + 889) < FS.chance) {
    const fid = pool[Math.floor(hash2(seed, 9, seed + 891) * pool.length)], suits = SCENES.find(sc => sc.id === fid)!.suits ?? [], fit = (c: [number, number, number]) => (suits.includes(AREA_TYPES[typeOf(c[0], c[1])].id) ? 0 : 1);
    for (const [cx, cy] of [...order].sort((p, q) => fit(p) - fit(q) || p[2] - q[2])) if (placeScene(fid, cx, cy)) break;
  }
  for (const [cx, cy, roll] of order) {
    if (roll >= SC.chance) continue;
    const id = AREA_TYPES[typeOf(cx, cy)].id, fits = SCENES.filter(sc => !usedScenes.has(sc.id) && (sc.suits ?? []).includes(id));
    if (!fits.length) continue;
    placeScene(fits[Math.floor(hash2(cx, cy, seed + 883) * fits.length)].id, cx, cy);
  }
  // Each area's sleeping legend's clearing (Ed, 2026-10-06: "Sleeping legends should be in a small
  // circular clearing, where they sit near the top of the circle"): out from the area's middle
  // (where the legend always lay), wholly inside its own area and the map, clear of everything
  // placed before it and of the paths; sized to its legend. Placed after the scenes, before the
  // paths' pieces, so those and all later scenery (trees, decor, berries) keep out of it.
  // The early easy quest (Ed, 2026-10-07: "force a circle into the first three"; rules/quest.ts earlyQuest): one of the first
  // three areas the waves wake always has a legend. When legends.share left all three without, one of them (seeded, one whose
  // kind another of the three doesn't share, so its dream has a creature to want) is given one here, moved from another
  // area so the share holds, before the clearings are cut.
  if (rosterIsland) {
    // The night's legends (rules/rosters.ts dealLegends): one area of each kind dealt; a kind among the route's first three areas
    // (with another kind beside it there, so its dream has a creature to want) dealt where it can be, in its earliest area.
    const order = routeOf(map as unknown as ForestMap).order, kindAt = (k: string) => { const [x, y] = k.split(",").map(Number); return AREA_TYPES[typeOf(x, y)].creature; };
    const first = order.slice(0, 3), early = tuning.legends?.earlyQuest !== false ? first.filter(k => first.some(o => o !== k && kindAt(o) !== kindAt(k))).map(kindAt) : [];
    legendKinds = dealtKinds ?? dealLegends(rosterIsland, runSeed, new Set(MS.found ?? []), early); // (dealt with the legend areas, above)
    map.legendKinds = legendKinds;
    for (const kind of legendKinds) {
      const pair = legendSlotOf ? legendSlotOf.get(kind) : [...legendAreas.values()].find(p => kindAt(p) === kind); // (its legend area's pair: the legend's own area)
      if (pair) { legendCells.add(pair); continue; }
      const mine = order.filter(k => kindAt(k) === kind);
      const at = mine.find(k => first.includes(k)) ?? mine[Math.floor(hash2(runSeed, mine.length, 7357 + legendKinds.indexOf(kind)) * mine.length)];
      if (at) legendCells.add(at);
    }
  } else if (tuning.legends?.earlyQuest !== false) {
    const order = routeOf(map as unknown as ForestMap).order, first = order.slice(0, 3), kind = (k: string) => { const [x, y] = k.split(",").map(Number); return AREA_TYPES[typeOf(x, y)].creature; };
    if (first.length && !first.some(k => legendCells.has(k))) {
      const fit = first.filter(k => first.some(o => o !== k && kind(o) !== kind(k)));
      // a swap, keeping legends.share and its spread: a legend moves to one of them, from the area the route reaches last
      // or, where that would make a clump of legend areas, from the clump's area beside it
      const last = [...order].reverse().find(k => legendCells.has(k));
      const clump = (k: string, without: string) => { const seen = new Set([k]), todo = [k]; while (todo.length) for (const x of neighbours.get(todo.pop()!) ?? []) if (x !== without && legendCells.has(x) && !seen.has(x)) { seen.add(x); todo.push(x); } return seen.size; };
      const moves = fit.flatMap(k => [last, ...[...(neighbours.get(k) ?? [])].filter(x => legendCells.has(x))].filter((d): d is string => !!d).map(d => ({ k, d, n: clump(k, d) })));
      if (moves.length) {
        const least = Math.min(...moves.map(m => m.n)), best = moves.filter(m => m.n === least), lastFirst = best.filter(m => m.d === last);
        const pick = (lastFirst.length ? lastFirst : best)[Math.floor(hash2(seed, 907, 911) * (lastFirst.length || best.length))];
        legendCells.delete(pick.d); legendCells.add(pick.k);
      }
    }
  }
  const LC = tuning.legendClearing, nearStone: string[] = [], SHRINK = [1, 0.92, 0.85, 0.78, 0.72, 0.65];
  const legendAreaOfPair = new Map([...legendAreas].map(([k, p]) => [p, k]));
  for (const [cx, cy] of cells) {
    if (!legendCells.has(cellKey(cx, cy))) continue; // (no legend, no clearing: home, and the areas legends.share leaves out)
    // In its legend area (above): at its heart, where a runestone would stand, sized to fit its legend up to fit.areaMax; clear of
    // the runestones round it (its pair's among them) by minFromOtherStones; failing a full-size spot, smaller in fine steps.
    const la = legendAreaOfPair.get(cellKey(cx, cy));
    if (la) {
      const [lx, ly] = la.split(",").map(Number), species = AREA_TYPES[typeOf(cx, cy)].creature, site = siteOf(lx, ly), a0 = hash2(lx, ly, seed + 893) * Math.PI * 2;
      const r0 = legendRadius(species, LC, areaMax);
      const stones = [...(neighbours.get(la) ?? [])].map(k => k.split(",").map(Number)).filter(([x, y]) => playable(x, y) && !(x === centreCell[0] && y === centreCell[1])).map(([x, y]) => soundsystemSpot(x, y));
      const B = map.bounds, fits = (x: number, z: number, r: number) => {
        if (!isInside(B, x, z, 15) || !inCell(x, z, lx, ly)) return false;
        if (!stones.every(q => Math.hypot(x - q.x, z - q.z) - r >= (LC.minFromOtherStones ?? 0)) || !clearOfStones(x, z, r)) return false;
        for (let k = 0; k < 16; k++) { const b = (k / 16) * Math.PI * 2; if (!inCell(x + Math.cos(b) * r, z + Math.sin(b) * r, lx, ly)) return false; }
        return !reserved(x, z, r) && !map.paths.at(x, z, r * 0.6);
      };
      const spots: [number, number][] = [[site.x, site.z]];
      for (const f of [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5]) for (let k = 0; k < 16; k++) { const b = a0 + (k / 16) * Math.PI * 2; spots.push([site.x + Math.cos(b) * A * f, site.z + Math.sin(b) * A * f]); }
      placed: for (const k of [1, 0.92, 0.85, 0.78, 0.72, 0.65, 0.55, 0.45]) { const r = Math.max(LC.radius, r0 * k); for (const [x, z] of spots) if (fits(x, z, r)) { clearings.set(cellKey(cx, cy), { cell: [lx, ly], x, z, r, edge: LC.edge, legend: { x, z: z - r * LC.top } }); break placed; } }
      if (clearings.has(cellKey(cx, cy))) continue;
    }
    const species = AREA_TYPES[typeOf(cx, cy)].creature, r0 = legendRadius(species, zooAt ? { ...LC, fit: { margin: LC.fit?.margin ?? 3, max: ZOO_CONFIG.legendCap ?? LC.fit?.max ?? 25 } } : LC); // (sized to fit its legend: rules/legendFit.ts; the zoo's cap its own)
    let r = r0;
    const site = siteOf(cx, cy), a0 = hash2(cx, cy, seed + 891) * Math.PI * 2;
    // (the zoo: at its island's middle, Ed 2026-10-26: "Each zoo area has the corresponding legend circle at the centre of it")
    if (zooAt) { clearings.set(cellKey(cx, cy), { cell: [cx, cy], x: site.x, z: site.z, r, edge: LC.edge, legend: { x: site.x, z: site.z - r * LC.top } }); continue; }
    // Away from its area's runestone (where its soundsystem comes; Ed, 2026-10-06: "The legend circle shouldn't spawn
    // near its runestone"): its edge at least minFromStone metres off, so the circle, its grove and its rim kit stand
    // clear of the stone's clearing and the party's dance space (and a siege gets no safe spot beside its soundsystem).
    const stone = soundsystemSpot(cx, cy), fromStone = (x: number, z: number) => Math.hypot(x - stone.x, z - stone.z) - r;
    // (and every neighbouring area's runestone at least minFromOtherStones off its edge, always: none standing over the legend)
    const others = [...(neighbours.get(cellKey(cx, cy)) ?? [])].map(k => k.split(",").map(Number)).filter(([x, y]) => playable(x, y) && !(x === centreCell[0] && y === centreCell[1])).map(([x, y]) => soundsystemSpot(x, y));
    const clearOfOthers = (x: number, z: number) => others.every(q => Math.hypot(x - q.x, z - q.z) - r >= (LC.minFromOtherStones ?? 0));
    let farEnough = (x: number, z: number) => fromStone(x, z) >= (LC.minFromStone ?? 0);
    let keptClear = (x: number, z: number) => clearOfStones(x, z, r); // (and its whole circle out of every stone's keep-clear zone)
    const B = map.bounds, fits = (x: number, z: number) => {
      if (!isInside(B, x, z, 15) || !inCell(x, z, cx, cy)) return false; // (its middle where she can fly)
      if (!farEnough(x, z) || !clearOfOthers(x, z) || !keptClear(x, z)) return false;
      for (let k = 0; k < 16; k++) { const b = (k / 16) * Math.PI * 2; if (!inCell(x + Math.cos(b) * r, z + Math.sin(b) * r, cx, cy)) return false; }
      return !reserved(x, z, r) && !map.paths.at(x, z, r * pathK);
    };
    // (the paths kept wholly out at first; failing that, one may graze its rim)
    let pathK = 1;
    search: for (pathK of [1, 0.6]) for (const f of [0.4, 0.3, 0.5, 0.22, 0.6, 0.15, 0.7, 0.08]) for (let k = 0; k < 16; k++) {
      const b = a0 + (k / 16) * Math.PI * 2, x = site.x + Math.cos(b) * A * f, z = site.z + Math.sin(b) * A * f;
      if (fits(x, z)) { clearings.set(cellKey(cx, cy), { cell: [cx, cy], x, z, r, edge: LC.edge, legend: { x, z: z - r * LC.top } }); break search; }
    }
    // Failing that (an area at the map's edge, or one whose ground lies off its middle): anywhere it fits in the area, nearest the usual distance first.
    if (!clearings.has(cellKey(cx, cy))) {
      // round a point surely in the area (its ground can lie well off its middle)
      let ox = site.x, oz = site.z;
      if (!inCell(ox, oz, cx, cy)) found: for (let d = 4; d < A * 1.6; d += 4) for (let k = 0; k < 24; k++) { const b = (k / 24) * Math.PI * 2, x = site.x + Math.cos(b) * d, z = site.z + Math.sin(b) * d; if (inCell(x, z, cx, cy)) { ox = x; oz = z; break found; } }
      const grid: [number, number, number][] = [];
      for (let i = -14; i <= 14; i++) for (let j = -14; j <= 14; j++) { const x = ox + i * A * 0.08, z = oz + j * A * 0.08; grid.push([x, z, Math.abs(Math.hypot(x - ox, z - oz) - A * 0.4)]); }
      grid.sort((p, q) => p[2] - q[2]);
      pathK = 0.6;
      // (and in a tight area, a smaller circle: the legend fills it more; in fine steps, so a big legend's circle loses no more than it must)
      sized: for (const k of SHRINK) { r = r0 * k; for (const [x, z] of grid) if (fits(x, z)) { clearings.set(cellKey(cx, cy), { cell: [cx, cy], x, z, r, edge: LC.edge, legend: { x, z: z - r * LC.top } }); break sized; } }
      // A small area with no spot far enough from the stones: the farthest from any that fits (logged).
      if (!clearings.has(cellKey(cx, cy))) {
        farEnough = () => true; keptClear = () => true;
        const off = (x: number, z: number) => Math.min(fromStone(x, z), stoneGap(x, z) - r);
        let best: [number, number, number, number] | null = null; // x, z, distance off the nearest stone, radius
        for (const k of SHRINK) { r = r0 * k; for (const [x, z] of grid) if (fits(x, z) && (!best || off(x, z) > best[2] + 2)) best = [x, z, off(x, z), r]; } // (a smaller circle only for a clearly better spot)
        if (best) { const [x, z] = best; r = best[3]; clearings.set(cellKey(cx, cy), { cell: [cx, cy], x, z, r, edge: LC.edge, legend: { x, z: z - r * LC.top } }); nearStone.push(`${cx},${cy} ${best[2].toFixed(0)} m`); }
      }
    }
  }
  if (nearStone.length) console.info(`legend clearings: seed ${seed}: ${nearStone.length} closer than minFromStone (${LC.minFromStone} m) to their runestone or inside a stone's keep-clear zone (${keepClear} m), at the farthest spot they fit: ${nearStone.join(", ")}`);
  map.legendClearings = [...clearings.values()];
  map.paths.placePieces();
  return map;
}

/** Whether (x, z) is inside the legend's clearing of the area at cell (Ed, 2026-10-06: "Quest sigils and relics
 *  need to be placed in the circle to have their effect"); where an area has no clearing (no room for one),
 *  within fallback metres of its legend at legendAt. */
export function inLegendClearing(map: ForestMap, cell: Cell, x: number, z: number, legendAt: { x: number; z: number }, fallback: number): boolean {
  const c = map.legendClearing(cell[0], cell[1]);
  return c ? Math.hypot(x - c.x, z - c.z) <= c.r : Math.hypot(x - legendAt.x, z - legendAt.z) <= fallback;
}

/** The legends' clearings nearest (x, z), up to out's length or 6, nearest first, into out (reused, so no
 *  garbage a frame); only those within 400 m. For the drawing (the ground's rings, the twilight) and the rules. */
export function nearestClearings(all: readonly LegendClearing[], x: number, z: number, out: LegendClearing[], max = 6): LegendClearing[] {
  out.length = 0;
  for (const c of all) {
    const d = Math.hypot(c.x - x, c.z - z);
    if (d > 400) continue;
    let i = out.length;
    while (i > 0 && Math.hypot(out[i - 1].x - x, out[i - 1].z - z) > d) i--;
    if (i < max) { out.splice(i, 0, c); if (out.length > max) out.length = max; }
  }
  return out;
}

/** A scene's footprint radius (metres), from its pieces' authored offsets: a little more than the
 *  art's own (sceneLayout's footprint, which a test checks it covers), without drawing anything. */
export function sceneFootprint(id: string, tuning: Tuning): number {
  const sc = SCENE_BY_ID[id];
  if (!sc) return 0;
  return Math.max(...sc.pieces.map(([, x, z]) => Math.hypot(x, z))) * tuning.scenes.scale + tuning.scenes.pad;
}

/** Which areas have a sleeping legend (Ed, 2026-10-06: "Legends should only appear in about half of
 *  areas (we can test this ratio); every area makes them too common"): share of the areas but home,
 *  rounded, in a seeded order, spread so they don't clump: first only areas that keep every run of
 *  neighbouring legend areas to two at most; then (an area has about six neighbours, so half can't
 *  all be kept that apart) ones that leave no legend area bordering more than two others; then
 *  any left over, those with the fewest legend neighbours first. */
/** The area a point counts as in (map.areaOf: a legend area as its pair; Ed, 2026-10-26: "the adjacent areas should count as
 *  one"), its cell; a map without legend areas (or a test's stand-in) its own cell. */
export function areaCellAt(map: Pick<ForestMap, "cellSafe"> & Partial<Pick<ForestMap, "areaOf">>, x: number, z: number): Cell {
  const c = map.cellSafe(x, z).cell;
  return map.areaOf ? map.areaOf(c) : c;
}

export function chooseLegendCells(cells: readonly Cell[], home: Cell, neighbours: ReadonlyMap<string, ReadonlySet<string>>, share: number, seed: number): Set<string> {
  const all: { key: string; h: number }[] = [];
  for (const [cx, cy] of cells) if (cx !== home[0] || cy !== home[1]) all.push({ key: cellKey(cx, cy), h: hash2(cx, cy, seed + 901) });
  const want = Math.max(0, Math.min(all.length, Math.round(Math.max(0, Math.min(1, share)) * all.length)));
  const chosen = new Set<string>();
  if (want >= all.length) { for (const a of all) chosen.add(a.key); return chosen; }
  all.sort((a, b) => a.h - b.h);
  const near = (k: string) => [...(neighbours.get(k) ?? [])].filter(x => chosen.has(x));
  // (taking k keeps every clump at two or fewer: k has at most one chosen neighbour, and that one has no other)
  const spread = (k: string) => { const c = near(k); return c.length === 0 || (c.length === 1 && near(c[0]).length === 0); };
  for (const a of all) { if (chosen.size >= want) break; if (spread(a.key)) chosen.add(a.key); }
  // (then: no legend area bordering more than two others)
  const thin = (k: string) => { const c = near(k); return c.length <= 2 && c.every(x => near(x).length < 2); };
  for (const a of all) { if (chosen.size >= want) break; if (!chosen.has(a.key) && thin(a.key)) chosen.add(a.key); }
  while (chosen.size < want) {
    let best: string | null = null, bn = Infinity;
    for (const a of all) if (!chosen.has(a.key)) { const c = near(a.key).length; if (c < bn) { bn = c; best = a.key; } }
    chosen.add(best!);
  }
  return chosen;
}

/** Give an island's areas their types from its roster (Ed, 2026-10-11; rules/rosters.ts): each kind's count of areas, dealt
 *  in a seeded order, then swapped about to keep two of a kind from touching where it can. */
function assignRoster(island: Island, cells: readonly Cell[], types: Map<string, number>, neighbours: ReadonlyMap<string, ReadonlySet<string>>, seed: number, skip = 0): void {
  const typeOfKind = (k: string) => AREA_TYPES.findIndex(a => a.creature === k);
  const deck: number[] = [];
  for (const { kind, areas } of island.roster) for (let i = 0; i < areas; i++) deck.push(typeOfKind(kind));
  // (`skip`: one of each kind dealt already elsewhere, so the deck is the rest)
  for (const { kind } of skip ? island.roster.slice(0, skip) : []) deck.splice(deck.indexOf(typeOfKind(kind)), 1);
  if (!deck.length || !cells.length) return;
  const keys = cells.map(([x, y]) => cellKey(x, y)), r = rng(seed * 7 + 13);
  for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
  keys.forEach((k, i) => types.set(k, deck[i % deck.length]));
  const clash = (k: string, t: number) => { let c = 0; for (const o of neighbours.get(k) ?? []) if (types.get(o) === t && keys.includes(o)) c++; return c; };
  for (let pass = 0; pass < 6; pass++) {
    let moved = false;
    for (const a of keys) {
      const ta = types.get(a)!;
      if (!clash(a, ta)) continue;
      for (const b of keys) {
        const tb = types.get(b)!;
        if (tb === ta) continue;
        const before = clash(a, ta) + clash(b, tb);
        types.set(a, tb); types.set(b, ta);
        const after = clash(a, tb) + clash(b, ta);
        if (after < before) { moved = true; break; }
        types.set(a, ta); types.set(b, tb);
      }
    }
    if (!moved) break;
  }
}
