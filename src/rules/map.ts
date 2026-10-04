// The forest map: mapAreas x mapAreas areas cut by the fractal partition, each given an area
// type that no neighbour shares, plus a margin of areas round the edge so the forest never
// visibly ends. World units are metres: x runs east, z runs south, one area cell is areaSize.
import rawTypes from "../../config/area-types.json";
import { AREAS } from "../../art/areas.js";
import { makePartition, type Cell, type Partition } from "./partition";
import { hash2, rng, smoothstep, vnoise } from "./random";
import type { Tuning } from "./tuning";
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
  /** How its vegetation is arranged (art/areas.js AREA_LAYOUTS): pattern, density, clump, undergrowth... */
  layout: AreaLayout;
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

interface ArtArea { id: string; name: string; creature: string; text: AreaType["text"]; floor: [string, number, number, number]; wall?: unknown[]; set?: unknown; layout?: AreaLayout }
const settings = (rawTypes as { types: Record<string, { treeDensity: number }> }).types;
export const AREA_TYPES: readonly AreaType[] = (AREAS as unknown as ArtArea[]).map(a => ({
  id: a.id, name: a.name, creature: a.creature, text: a.text,
  setPiece: a.set ? a.text.set ?? "a set piece" : "", hasWalls: !!a.wall?.length,
  floor: [a.floor[1], a.floor[2], a.floor[3]], treeDensity: settings[a.id]?.treeDensity ?? 1,
  layout: a.layout ?? { pattern: "scatter", density: 0.6, clump: 0.3, undergrowth: 0.5 },
}));

export interface AreaSample {
  cell: Cell;
  type: number;
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
  readonly dancefloor: { x: number; z: number; radius: number };
  /** The witch's treehouse: its trunk's foot, just beyond the dancefloor's clearing. */
  readonly treehouse: { x: number; z: number };
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
  /** Pairs of areas that touch, as "cx,cy|cx,cy" keys, for tests and the debug view. */
  readonly neighbours: ReadonlyMap<string, ReadonlySet<string>>;
  /** Paths, roads and railways, with the corridors they keep clear. */
  readonly paths: PathNetwork;
}

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
  const partition = makePartition(seed, tuning.borderLayers);
  const lo = -margin, hi = n + margin;
  const neighbours = findNeighbours(partition, lo, hi, 6);

  // Area types: random, never the same as a touching area nor any area within two cells.
  const types = new Map<string, number>();
  const r = rng(seed * 5 + 1);
  for (let cy = lo; cy < hi; cy++) for (let cx = lo; cx < hi; cx++) {
    const near = new Set<number>();
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const t = types.get(cellKey(cx + dx, cy + dy));
      if (t !== undefined) near.add(t);
    }
    for (const k of neighbours.get(cellKey(cx, cy)) ?? []) { const t = types.get(k); if (t !== undefined) near.add(t); }
    const free = [...Array(typeCount).keys()].filter(t => !near.has(t));
    const pool = free.length ? free : [...Array(typeCount).keys()];
    types.set(cellKey(cx, cy), pool[Math.floor(r() * pool.length)]);
  }
  const typeOf = (cx: number, cy: number) => types.get(cellKey(cx, cy)) ?? Math.floor(hash2(cx, cy, seed + 17) * typeCount);

  // The middle area: the cell nearest the middle whose centre lies inside its own area, so the
  // dancefloor stands on its own area's ground.
  const mid = Math.floor(n / 2);
  const ownsSite = (cx: number, cy: number) => { const s = partition.site(cx, cy), c = partition.partition(s[0], s[1]); return c[0] === cx && c[1] === cy; };
  let centreCell: Cell = [mid, mid];
  for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) if (ownsSite(mid + dx, mid + dy)) { centreCell = [mid + dx, mid + dy]; break; }
  const siteOf = (cx: number, cy: number) => { const s = partition.site(cx, cy), w = toWorld(s[0], s[1]); return { x: w[0], z: w[1] }; };
  const centre = siteOf(centreCell[0], centreCell[1]);

  const areaAt = (x: number, z: number): AreaSample => {
    const [u, v] = toPart(x, z), cell = partition.partition(u, v);
    return { cell, type: typeOf(cell[0], cell[1]), openness: partition.openness(u, v) };
  };
  const setPieceOf = (cx: number, cy: number) => {
    const t = AREA_TYPES[typeOf(cx, cy)];
    return t.setPiece && hash2(cx, cy, seed + 61) < tuning.setPieceChance ? t.setPiece : null;
  };
  // The dancefloor keeps a clearing of its own, however close a neighbouring area's centre.
  const floorR = tuning.dancefloor.radius, floorClear = floorR + tuning.dancefloor.clearing;

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
    soundSpots.set(key, spot);
    return spot;
  };
  const TH = tuning.treehouse, ta = (TH.angle * Math.PI) / 180;
  const treehouse = { x: centre.x + Math.cos(ta) * (floorClear + TH.distance), z: centre.z + Math.sin(ta) * (floorClear + TH.distance) };
  const pieceSpots = new Map<string, { x: number; z: number } | null>();
  const setPieceSpot = (cx: number, cy: number) => {
    const key = cellKey(cx, cy);
    if (pieceSpots.has(key)) return pieceSpots.get(key)!;
    let spot: { x: number; z: number } | null = null;
    if (setPieceOf(cx, cy) && !(cx === centreCell[0] && cy === centreCell[1])) {
      const R = tuning.setPieceFootprint * tuning.setPieceScale, gap = tuning.reserveMargin;
      const sounds = [cellKey(cx, cy), ...(neighbours.get(cellKey(cx, cy)) ?? [])].map(k => { const [x, y] = k.split(",").map(Number); return soundsystemSpot(x, y); });
      const clear = (x: number, z: number) => inCell(x, z, cx, cy)
        && sounds.every(p => Math.hypot(x - p.x, z - p.z) >= R + tuning.soundsystemFootprint + gap)
        && Math.hypot(x - centre.x, z - centre.z) >= R + floorClear + gap
        && Math.hypot(x - treehouse.x, z - treehouse.z) >= R + TH.clear + gap;
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
  const reserved = (x: number, z: number, r: number) => {
    const gap = tuning.reserveMargin, cell = areaAt(x, z).cell;
    if (Math.hypot(x - centre.x, z - centre.z) < r + floorClear + gap) return true;
    if (Math.hypot(x - treehouse.x, z - treehouse.z) < r + TH.clear + gap) return true;
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
    // A set piece keeps a clearing round it, sized with it; a soundsystem a little room.
    const p = setPieceSpot(cell[0], cell[1]);
    if (p && Math.hypot(x - p.x, z - p.z) < tuning.setPieceClear * tuning.setPieceScale) return true;
    if (cell[0] === centreCell[0] && cell[1] === centreCell[1]) return false;
    const q = soundsystemSpot(cell[0], cell[1]);
    return Math.hypot(x - q.x, z - q.z) < tuning.soundsystemFootprint + tuning.treeMarginFromSoundsystem;
  };
  const hardClear = (x: number, z: number) => { const [u, v] = toPart(x, z); return hardCell(x, z, partition.partition(u, v)); };
  const treeWeight = (x: number, z: number) => {
    const [u, v] = toPart(x, z);
    if (hardCell(x, z, partition.partition(u, v))) return 0;
    // Clearings round area centres and random glades, each with a soft edge (Ed: no hard rings).
    const glade = 1 - smoothstep((vnoise(x / tuning.gladeScale, z / tuning.gladeScale, seed + 61) - (1 - tuning.gladeAmount)) / 0.12);
    return smoothstep((partition.openness(u, v) - tuning.clearingSize) / Math.max(0.01, tuning.clearingFalloff)) * glade;
  };

  const remoteness = (cx: number, cy: number) => Math.min(1, Math.hypot(cx - centreCell[0], cy - centreCell[1]) / (n / 2));
  const pad = A * 0.5;
  const map = {
    seed, tuning, n, margin, areaSize: A, partition, centreCell,
    dancefloor: { x: centre.x, z: centre.z, radius: floorR },
    treehouse,
    start: { x: treehouse.x, z: treehouse.z + 1 },
    bounds: { minX: pad, maxX: n * A - pad, minZ: pad, maxZ: n * A - pad },
    extent: { minX: lo * A, maxX: hi * A, minZ: lo * A, maxZ: hi * A },
    typeOf, areaAt, siteOf, treeWeight, hardClear, neighbours, setPieceOf, soundsystemSpot, setPieceSpot, reserved, remoteness,
    paths: null as unknown as PathNetwork,
  };
  map.paths = new PathNetwork(map);
  return map;
}
