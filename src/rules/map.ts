// The forest map: mapAreas x mapAreas areas cut by the fractal partition, each given an area
// type that no neighbour shares, plus a margin of areas round the edge so the forest never
// visibly ends. World units are metres: x runs east, z runs south, one area cell is areaSize.
import rawTypes from "../../config/area-types.json";
import { AREAS } from "../../art/areas.js";
import { makePartition, type Cell, type Partition } from "./partition";
import { hash2, rng, smoothstep, vnoise } from "./random";
import type { Tuning } from "./tuning";

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
}

interface ArtArea { id: string; name: string; creature: string; text: AreaType["text"]; floor: [string, number, number, number]; wall?: unknown[]; set?: unknown }
const settings = (rawTypes as { types: Record<string, { treeDensity: number }> }).types;
export const AREA_TYPES: readonly AreaType[] = (AREAS as unknown as ArtArea[]).map(a => ({
  id: a.id, name: a.name, creature: a.creature, text: a.text,
  setPiece: a.set ? a.text.set ?? "a set piece" : "", hasWalls: !!a.wall?.length,
  floor: [a.floor[1], a.floor[2], a.floor[3]], treeDensity: settings[a.id]?.treeDensity ?? 1,
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
  /** Where the witch starts: the dancefloor. */
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
  /** How far an area is from home: 0 at the middle area, 1 at the map's edge. */
  remoteness(cx: number, cy: number): number;
  /** An area's centre (its layer-0 site), in metres. */
  siteOf(cx: number, cy: number): { x: number; z: number };
  /** The chance a tree grows at a point: 0 in a clearing, rising smoothly to treeDensity. */
  treeWeight(x: number, z: number): number;
  /** Pairs of areas that touch, as "cx,cy|cx,cy" keys, for tests and the debug view. */
  readonly neighbours: ReadonlyMap<string, ReadonlySet<string>>;
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
  // The dancefloor keeps a clearing of its own, however close a neighbouring area's centre.
  const floorR = tuning.dancefloor.radius, floorClear = floorR + tuning.dancefloor.clearing;
  const treeWeight = (x: number, z: number) => {
    if (Math.hypot(x - centre.x, z - centre.z) < floorClear) return 0;
    const [u, v] = toPart(x, z);
    // Trees thin gradually toward the centre: a long smooth falloff over clearingFalloff.
    const glade = 1 - smoothstep((vnoise(x / tuning.gladeScale, z / tuning.gladeScale, seed + 61) - (1 - tuning.gladeAmount)) / 0.03);
    return smoothstep((partition.openness(u, v) - tuning.clearingSize) / Math.max(0.01, tuning.clearingFalloff)) * tuning.treeDensity * glade;
  };

  const setPieceOf = (cx: number, cy: number) => {
    const t = AREA_TYPES[typeOf(cx, cy)];
    return t.setPiece && hash2(cx, cy, seed + 61) < tuning.setPieceChance ? t.setPiece : null;
  };
  const remoteness = (cx: number, cy: number) => Math.min(1, Math.hypot(cx - centreCell[0], cy - centreCell[1]) / (n / 2));
  const pad = A * 0.5;
  return {
    seed, tuning, n, margin, areaSize: A, partition, centreCell,
    dancefloor: { x: centre.x, z: centre.z, radius: floorR },
    start: { x: centre.x, z: centre.z + 2 },
    bounds: { minX: pad, maxX: n * A - pad, minZ: pad, maxZ: n * A - pad },
    extent: { minX: lo * A, maxX: hi * A, minZ: lo * A, maxZ: hi * A },
    typeOf, areaAt, siteOf, treeWeight, neighbours, setPieceOf, remoteness,
  };
}
