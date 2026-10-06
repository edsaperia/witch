// The forest map: mapAreas x mapAreas areas cut by the fractal partition, each given an area
// type that no neighbour shares, plus a margin of areas round the edge so the forest never
// visibly ends. World units are metres: x runs east, z runs south, one area cell is areaSize.
import rawTypes from "../../config/area-types.json";
import { AREAS, HOME_AREA } from "../../art/areas.js";
import { SCENES as SCENES_RAW, SCENE_BY_ID as SCENE_BY_ID_RAW } from "../../art/scenes.js";
import { makePartition, type Cell, type Partition } from "./partition";
import { hash2, rng, smoothstep, vnoise } from "./random";
import type { Tuning } from "./tuning";
import { floorClearing, speakerRadius, speakerRing, type Speaker } from "./speakers";

/** How far the treehouse's foot stands from the dancefloor's middle (Ed, 2026-10-05: "5m due north of
 *  the dance floor, outside the speaker ring"): past the ring's outer edge by gap, plus its footprint. */
export const treehouseDistance = (t: Tuning) => speakerRadius(t) + t.dancefloor.speakers.footprint + t.treehouse.gap + t.treehouse.clear;
import { PathNetwork } from "./paths";

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
  /** Its ground's features: stream, pools, rocky, mounds, paths, hollows, ridges. */
  terrain?: string[];
  /** How many decorations it has (rate, 0-1) and of which families. */
  decor?: { rate: number; ruins: number; rocks: number; freak: number; lake: number; modern: number };
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
  /** Areas across the playable map. */
  readonly n: number;
  /** Extra rings of areas outside the playable map. */
  readonly margin: number;
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
  /** Where the witch may fly (metres). */
  readonly bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
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
  /** How far an area is from home: 0 at the middle area, 1 at the map's edge. */
  remoteness(cx: number, cy: number): number;
  /** An area's centre (its layer-0 site), in metres. */
  siteOf(cx: number, cy: number): { x: number; z: number };
  /** The chance a tree grows at a point: 0 in a clearing, rising smoothly to treeDensity. */
  treeWeight(x: number, z: number): number;
  /** Ground that must stay clear of every tree: the dancefloor's clearing and set pieces'. */
  hardClear(x: number, z: number): boolean;
  /** How far (x, z) is out of its area's fighting arena: 0 in its open middle, rising smoothly over its band to 1 (tuning arena); `cell` if known. */
  arenaOpen(x: number, z: number, cell?: Cell): number;
  /** Pairs of areas that touch, as "cx,cy|cx,cy" keys, for tests and the debug view. */
  readonly neighbours: ReadonlyMap<string, ReadonlySet<string>>;
  /** Paths, roads and railways, with the corridors they keep clear. */
  readonly paths: PathNetwork;
}

/** flip: the whole arrangement mirrored left to right. */
export interface Ground { kind: string; x: number; z: number; r: number; flip: boolean }
/** A scene (art/scenes.js) on the map: its id, middle, footprint radius, and whether it's mirrored. */
export interface Scene { id: string; x: number; z: number; r: number; mirror: boolean }

type SceneDef = { id: string; size: string; suits?: string[]; pieces: [string, number, number, string?][] };
const SCENES = SCENES_RAW as unknown as SceneDef[], SCENE_BY_ID = SCENE_BY_ID_RAW as unknown as Record<string, SceneDef>;

const cellKey = (cx: number, cy: number) => cx + "," + cy;

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

export function generateMap(seed: number, tuning: Tuning): ForestMap {
  const n = tuning.mapAreas, margin = 2, A = tuning.areaSize * tuning.areaScale, typeCount = AREA_TYPES.length;
  // Areas vary in size: the world is warped smoothly before it is cut, so in some stretches of
  // the map the cells spread out (big areas) and in others they crowd (small ones). The warp
  // never folds (its slope stays under 1), so every area keeps its place and the map stays
  // n x n areas. Positions in partition space are in cells.
  const L = 3, V = Math.max(0, Math.min(1, tuning.areaSizeVariance)) * L * 0.3;
  const toPart = (x: number, z: number): [number, number] => {
    const u = x / A, v = z / A;
    return [u + V * (vnoise(u / L, v / L, seed + 91) - 0.5) * 2, v + V * (vnoise(u / L, v / L, seed + 92) - 0.5) * 2];
  };
  const toWorld = (u: number, v: number): [number, number] => {
    let x = u * A, z = v * A;
    for (let i = 0; i < 30; i++) { const [pu, pv] = toPart(x, z); x += (u - pu) * A; z += (v - pv) * A; }
    return [x, z];
  };
  // Home first (Ed, 2026-10-05: "Home area should be big enough that the whole circle, centre the
  // dancefloor, edge the treehouse, is within it - should fix this before generating the rest of
  // the areas"). Its cell: the one nearest the middle whose centre lies inside its own area, so the
  // dancefloor stands on its own area's ground. Then its circle: out past the treehouse's footprint
  // and home.margin more, measured through the warp (its edge mapped into partition space), so
  // every point of it is home's; the areas round it are cut round it, their centres kept
  // home.gap of an area beyond it.
  const mid = Math.floor(n / 2), plain = makePartition(seed, tuning.borderLayers);
  const ownsSite = (cx: number, cy: number) => { const s = plain.site(cx, cy), c = plain.partition(s[0], s[1]); return c[0] === cx && c[1] === cy; };
  let centreCell: Cell = [mid, mid];
  for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) if (ownsSite(mid + dx, mid + dy)) { centreCell = [mid + dx, mid + dy]; break; }
  const H = tuning.home, homeSite = plain.site(centreCell[0], centreCell[1]), homeWorld = toWorld(homeSite[0], homeSite[1]);
  const homeRadius = treehouseDistance(tuning) + tuning.treehouse.clear + H.margin; // metres
  let homeR = 0;
  for (let k = 0; k < 96; k++) {
    const a = (k / 96) * Math.PI * 2, [u, v] = toPart(homeWorld[0] + Math.cos(a) * homeRadius, homeWorld[1] + Math.sin(a) * homeRadius);
    homeR = Math.max(homeR, Math.hypot(u - homeSite[0], v - homeSite[1]));
  }
  const partition = makePartition(seed, tuning.borderLayers, { cell: centreCell, radius: homeR * 1.03, gap: H.gap });
  const lo = -margin, hi = n + margin;
  const neighbours = findNeighbours(partition, lo, hi, 6);

  // Area types: random, never the same as a touching area nor any area within two cells.
  const types = new Map<string, number>();
  const r = rng(seed * 5 + 1);
  for (let cy = lo; cy < hi; cy++) for (let cx = lo; cx < hi; cx++) {
    const near = new Set<number>(), homeKey = cellKey(centreCell[0], centreCell[1]);
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      if (cellKey(cx + dx, cy + dy) === homeKey) continue; // (home looks like none of them: a meadow of its own)
      const t = types.get(cellKey(cx + dx, cy + dy));
      if (t !== undefined) near.add(t);
    }
    for (const k of neighbours.get(cellKey(cx, cy)) ?? []) { if (k === homeKey) continue; const t = types.get(k); if (t !== undefined) near.add(t); }
    const free = [...Array(typeCount).keys()].filter(t => !near.has(t));
    const pool = free.length ? free : [...Array(typeCount).keys()];
    types.set(cellKey(cx, cy), pool[Math.floor(r() * pool.length)]);
  }
  const typeOf = (cx: number, cy: number) => types.get(cellKey(cx, cy)) ?? Math.floor(hash2(cx, cy, seed + 17) * typeCount);

  const siteOf = (cx: number, cy: number) => { const s = partition.site(cx, cy), w = toWorld(s[0], s[1]); return { x: w[0], z: w[1] }; };
  const centre = siteOf(centreCell[0], centreCell[1]);

  // The warp's steepest slope (vnoise's gradient is at most 1.5 a component), so a step of d metres
  // moves a point at most d * stretch / A in partition units.
  const stretch = 1 + (2 * V / L) * 1.5 * 2;
  const cellSafe = (x: number, z: number) => { const [u, v] = toPart(x, z), r = partition.partitionSafe(u, v); return { cell: r.cell, safe: (r.safe * A) / stretch }; };
  const areaAt = (x: number, z: number): AreaSample => {
    const [u, v] = toPart(x, z), cell = partition.partition(u, v);
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
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (rollsSetPiece(x, y)) cand.push([x, y, Math.hypot(x - centreCell[0], y - centreCell[1]) + hash2(x, y, seed + 63) * 0.5]);
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
      const sounds = [cellKey(cx, cy), ...(neighbours.get(cellKey(cx, cy)) ?? [])].map(k => { const [x, y] = k.split(",").map(Number); return soundsystemSpot(x, y); });
      const clear = (x: number, z: number) => inCell(x, z, cx, cy)
        && sounds.every(p => Math.hypot(x - p.x, z - p.z) >= R + tuning.soundsystemFootprint + gap)
        && Math.hypot(x - centre.x, z - centre.z) >= R + floorClear + gap
        && Math.hypot(x - treehouse.x, z - treehouse.z) >= R + TH.clear + gap
        && !map.paths.at(x, z, R);
      // Its old place (a little north of the centre) if that is clear, else the nearest clear
      // spot round it, out to the edge of the clearing.
      const s = siteOf(cx, cy);
      search: for (let d = 0; d <= A * 0.35; d += 3) for (let k = 0; k < (d ? 16 : 1); k++) {
        const a = (k / 16) * Math.PI * 2, x = s.x + Math.cos(a) * d, z = s.z - 4 + Math.sin(a) * d;
        if (clear(x, z)) { spot = { x, z }; break search; }
      }
    }
    pieceSpots.set(key, spot);
    return spot;
  };
  const grounds: Ground[] = [], scenes: Scene[] = [];
  const reserved = (x: number, z: number, r: number) => {
    const gap = tuning.reserveMargin, cell = areaAt(x, z).cell;
    if (Math.hypot(x - centre.x, z - centre.z) < r + floorClear + gap) return true;
    if (Math.hypot(x - treehouse.x, z - treehouse.z) < r + TH.clear + gap) return true;
    for (const g of grounds) if (Math.hypot(x - g.x, z - g.z) < r + g.r + gap) return true;
    for (const c of scenes) if (Math.hypot(x - c.x, z - c.z) < r + c.r + gap) return true;
    for (const k of [cellKey(cell[0], cell[1]), ...(neighbours.get(cellKey(cell[0], cell[1])) ?? [])]) {
      const [cx, cy] = k.split(",").map(Number);
      if (!(cx === centreCell[0] && cy === centreCell[1])) { const q = soundsystemSpot(cx, cy); if (Math.hypot(x - q.x, z - q.z) < r + tuning.soundsystemFootprint + gap) return true; }
      const p = setPieceSpot(cx, cy);
      if (p && Math.hypot(x - p.x, z - p.z) < r + tuning.setPieceFootprint * tuning.setPieceScale + gap) return true;
    }
    return false;
  };
  const hardCell = (x: number, z: number, cell: Cell) => {
    if (Math.hypot(x - centre.x, z - centre.z) < floorClear) return true;
    if (Math.hypot(x - treehouse.x, z - treehouse.z) < TH.clear) return true;
    for (const g of grounds) if (Math.abs(x - g.x) < g.r && Math.abs(z - g.z) < g.r && Math.hypot(x - g.x, z - g.z) < g.r) return true;
    for (const c of scenes) if (Math.abs(x - c.x) < c.r && Math.abs(z - c.z) < c.r && Math.hypot(x - c.x, z - c.z) < c.r * 0.85) return true; // a scene's ground is clear of trees
    // A set piece keeps a clearing round it, sized with it; a soundsystem a little room.
    const p = setPieceSpot(cell[0], cell[1]);
    if (p && Math.hypot(x - p.x, z - p.z) < tuning.setPieceClear * tuning.setPieceScale) return true;
    if (cell[0] === centreCell[0] && cell[1] === centreCell[1]) return false;
    const q = soundsystemSpot(cell[0], cell[1]);
    return Math.hypot(x - q.x, z - q.z) < tuning.soundsystemFootprint + tuning.treeMarginFromSoundsystem;
  };
  const hardClear = (x: number, z: number) => { const [u, v] = toPart(x, z); return hardCell(x, z, partition.partition(u, v)); };
  // Every area's fighting arena (Ed, 2026-10-05: "each is effectively a fighting arena... not much
  // room to fight in each area"; then "softer edges, the falloff between dense forest and clearing
  // smoother"): mostly open within arena.radius metres of its centre and its soundsystem, the woods
  // thickening along a smooth curve over a band arena.band metres wide beyond, its distance
  // wobbled by noise (arena.noise of the band) so the edge is no ring; both times the fight's scale.
  const arenaIn = (x: number, z: number, cell: Cell) => {
    const R = tuning.arena;
    if (!R || R.radius <= 0) return 1;
    const k = tuning.fight?.scale ?? 1, s = siteOf(cell[0], cell[1]), q = soundsystemSpot(cell[0], cell[1]);
    const d = Math.min(Math.hypot(x - s.x, z - s.z), Math.hypot(x - q.x, z - q.z)), band = R.band * k;
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

  const remoteness = (cx: number, cy: number) => Math.min(1, Math.hypot(cx - centreCell[0], cy - centreCell[1]) / (n / 2));
  const pad = A * 0.5;
  const map = {
    seed, tuning, n, margin, areaSize: A, partition, centreCell, homeRadius,
    dancefloor: { x: centre.x, z: centre.z, radius: floorR, speakers: speakerRing(centre, tuning) },
    treehouse, treehouseFront: { x: treehouse.x, z: treehouse.z + tuning.treehouse.clear }, grounds, scenes,
    start: { x: treehouse.x, z: treehouse.z + 1 },
    bounds: { minX: pad, maxX: n * A - pad, minZ: pad, maxZ: n * A - pad },
    extent: { minX: lo * A, maxX: hi * A, minZ: lo * A, maxZ: hi * A },
    typeOf, areaAt, cellSafe, siteOf, treeWeight, arenaOpen, hardClear, neighbours, setPieceOf, soundsystemSpot, setPieceSpot, reserved, remoteness,
    paths: null as unknown as PathNetwork,
  };
  // The paths first (their lines need only the areas), so soundsystems, set pieces and the
  // grounds can keep off them; then the grounds; then the paths' pieces, clear of all of those.
  map.paths = new PathNetwork(map);
  // The grounds: some areas (not home) have one, off to the side of the area's centre; its whole
  // clearing keeps clear of everything placed before it (soundsystems, the dancefloor, the
  // treehouse, set pieces, other grounds), turning round the centre to find room, or left out.
  const G = tuning.grounds, usedGrounds = new Set<string>();
  for (let cy = 0; cy < n; cy++) for (let cx = 0; cx < n; cx++) {
    if ((cx === centreCell[0] && cy === centreCell[1]) || hash2(cx, cy, seed + 871) >= G.chance) continue;
    // Each kind at most once per map (Ed, v160): the kind it rolled, or the next one not yet used.
    let ki = Math.floor(hash2(cx, cy, seed + 873) * G.kinds.length), tries = 0;
    while (usedGrounds.has(G.kinds[ki]) && tries++ < G.kinds.length) ki = (ki + 1) % G.kinds.length;
    if (usedGrounds.has(G.kinds[ki])) continue;
    const kind = G.kinds[ki], r = G.radius[kind] ?? 8, a = hash2(cx, cy, seed + 875) * Math.PI * 2, site = siteOf(cx, cy);
    search: for (const d of [r + 6, r + 14, r + 24]) for (let k = 0; k < 12; k++) {
      const b = a + (k / 12) * Math.PI * 2, x = site.x + Math.cos(b) * d, z = site.z + Math.sin(b) * d;
      if (inCell(x, z, cx, cy) && !reserved(x, z, r)) { grounds.push({ kind, x, z, r, flip: hash2(cx, cy, seed + 877) < 0.5 }); usedGrounds.add(kind); break search; }
    }
  }
  // Scenes (Ed, 2026-10-04): small vignettes and large landmarks of a few pieces each, each at
  // most once per map, in an area it suits; like a ground, off to the side of the area's centre,
  // its whole footprint clear of everything placed before it and of the paths, mirrored at random.
  const SC = tuning.scenes, usedScenes = new Set<string>();
  const order: [number, number, number][] = [];
  for (let cy = 0; cy < n; cy++) for (let cx = 0; cx < n; cx++) if (!(cx === centreCell[0] && cy === centreCell[1])) order.push([cx, cy, hash2(cx, cy, seed + 881)]);
  order.sort((a, b) => a[2] - b[2]);
  for (const [cx, cy, roll] of order) {
    if (roll >= SC.chance) continue;
    const id = AREA_TYPES[typeOf(cx, cy)].id, fits = SCENES.filter(sc => !usedScenes.has(sc.id) && (sc.suits ?? []).includes(id));
    if (!fits.length) continue;
    const sc = fits[Math.floor(hash2(cx, cy, seed + 883) * fits.length)], r = sceneFootprint(sc.id, tuning), a = hash2(cx, cy, seed + 885) * Math.PI * 2, site = siteOf(cx, cy);
    search: for (const d of [r + 8, r + 16, r + 26]) for (let k = 0; k < 12; k++) {
      const b = a + (k / 12) * Math.PI * 2, x = site.x + Math.cos(b) * d, z = site.z + Math.sin(b) * d;
      if (inCell(x, z, cx, cy) && !reserved(x, z, r) && !map.paths.at(x, z, r * 0.7)) { scenes.push({ id: sc.id, x, z, r, mirror: hash2(cx, cy, seed + 887) < 0.5 }); usedScenes.add(sc.id); break search; }
    }
  }
  map.paths.placePieces();
  return map;
}

/** A scene's footprint radius (metres), from its pieces' authored offsets: a little more than the
 *  art's own (sceneLayout's footprint, which a test checks it covers), without drawing anything. */
export function sceneFootprint(id: string, tuning: Tuning): number {
  const sc = SCENE_BY_ID[id];
  if (!sc) return 0;
  return Math.max(...sc.pieces.map(([, x, z]) => Math.hypot(x, z))) * tuning.scenes.scale + tuning.scenes.pad;
}
