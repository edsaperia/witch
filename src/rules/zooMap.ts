// The zoo laid out like the sea chart (Ed, 2026-10-26: "The zoo should be laid out like the map; the sea are flagstone streets,
// and the islands are a single area the shape of the island but just for the animal that the island corresponds to. Islands that
// are not discovered yet appear as that biome's lake. Home appears as a stone plaza with the ent's sigil on it"; "zoo creature
// areas should be about the same size as the ones found on islands"; "I think the streets should be the shape of the sea, and
// the areas should be the shape of the islands"; mock: previews/ed/zoo-map on claude/ed-shots). Each island stands where the
// chart has it (rules/archipelago.ts worldOf), its outline the chart's (rules/islandShape.ts islandCoast) scaled to one area
// across (`across`), the chart's layout spread just enough that the nearest two islands' middles are an area and `gap` apart;
// home (the Ent's plaza: the dancefloor and the treehouse) in the middle; everything else, out to the edge, the streets. A
// found island is its kind's area; one not found yet (map.found, the chart's save; ?all, the map's "see all", finds them all)
// is its biome's lake. The zoo's partition (rules/partition.ts's contract, for rules/map.ts): an island's points its own cell's,
// the streets' and the plaza's home's. No drawing here.
import { coastSpec, islandOf, KIND_NAMES, worldOf } from "./rosters";
import { islandCoast, type IslandSpec } from "./islandShape";
import type { CoastKnobs } from "./mapShape";
import type { Cell, Partition } from "./partition";

export interface ZooIsland {
  /** Its kind (the chart's island's). */
  kind: string;
  /** Its middle (m). */
  x: number;
  z: number;
  /** Its outline: radii (m) at n even angles from -PI (atan2(z, x)), eased between. */
  reach: Float32Array;
  /** Its furthest coast from its middle (m). */
  most: number;
  /** Found (its area) or not (its biome's lake). */
  found: boolean;
  /** Its area's cell (rules/map.ts: a key, its grid cell near its middle; never home's, never another's). */
  cell: Cell;
}

export interface ZooLayout {
  islands: ZooIsland[];
  /** Home's middle (the dancefloor's: m). */
  home: { x: number; z: number };
  /** Home's cell. */
  homeCell: Cell;
  /** How far out the islands reach from home's middle (m: the furthest coast). */
  reach: number;
  /** Metres a chart unit (the disc's radius 1). */
  scale: number;
  /** The grid's size in cells (n x n, from 0). */
  n: number;
}

export interface ZooLayoutKnobs {
  /** An island's width (m: about an area). */
  across: number;
  /** The street between the nearest two islands at least (m). */
  gap: number;
  /** The streets' margin past the furthest coast to the edge water (m). */
  margin: number;
  /** An area's size (m: the grid's cell). */
  areaSize: number;
}

/** The radius (m) of an outline at an angle (radians, atan2(z, x)), eased between its samples. */
export function reachAt(reach: Float32Array, a: number): number {
  const n = reach.length, t = ((a + Math.PI) / (Math.PI * 2)) * n, i = Math.floor(t), f = t - i;
  return reach[((i % n) + n) % n] * (1 - f) + reach[(((i + 1) % n) + n) % n] * f;
}

/** Whether (x, z) lies inside an island's outline. */
export function insideIsland(I: Pick<ZooIsland, "x" | "z" | "reach" | "most">, x: number, z: number): boolean {
  const dx = x - I.x, dz = z - I.z;
  if (Math.abs(dx) > I.most || Math.abs(dz) > I.most) return false;
  const r = Math.hypot(dx, dz);
  return r <= I.most && r <= reachAt(I.reach, Math.atan2(dz, dx));
}

/** The zoo's layout for a world: every kind's island at its chart place, `found` (a set of kinds, or "all") its area, the rest
 *  lakes. `coast`: the islands' coast knobs (the tuning's islands.coast), as the chart draws them. */
export function zooLayout(world: number, found: ReadonlySet<string> | "all", k: ZooLayoutKnobs, coast?: CoastKnobs, kinds: readonly string[] = KIND_NAMES): ZooLayout {
  const placed = worldOf(world).islands;
  const mids = kinds.map(kind => placed.get(kind)).filter((p): p is NonNullable<typeof p> => !!p);
  let near = Infinity;
  const all = [{ x: 0, y: 0 }, ...mids];
  for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) near = Math.min(near, Math.hypot(all[i].x - all[j].x, all[i].y - all[j].y));
  const scale = (k.across + k.gap) / Math.max(1e-6, near);
  let far = 0;
  for (const p of mids) far = Math.max(far, Math.hypot(p.x, p.y));
  const reach = far * scale + k.across / 2, half = reach + k.margin + k.areaSize * 2, A = k.areaSize;
  const n = Math.ceil((half * 2) / A) + 2, mid = (n * A) / 2, home = { x: mid, z: mid };
  const homeCell: Cell = [Math.floor(home.x / A), Math.floor(home.z / A)];
  const taken = new Set([`${homeCell[0]},${homeCell[1]}`]);
  const islands: ZooIsland[] = [];
  for (const kind of kinds) {
    const p = placed.get(kind), isle = islandOf(kind, world);
    if (!p || !isle) continue;
    const radii = islandCoast(coastSpec(isle) as IslandSpec, coast).radii, N = radii.length;
    // (its outline scaled so it's `across` wide, whatever its real size: Ed, "about the same size as the ones found on islands")
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let i = 0; i < N; i++) { const a = -Math.PI + (i / N) * Math.PI * 2, r = radii[i]; x0 = Math.min(x0, Math.cos(a) * r); x1 = Math.max(x1, Math.cos(a) * r); z0 = Math.min(z0, Math.sin(a) * r); z1 = Math.max(z1, Math.sin(a) * r); }
    const s = k.across / Math.max(1e-6, x1 - x0, z1 - z0), reachM = new Float32Array(N);
    let most = 0;
    for (let i = 0; i < N; i++) { reachM[i] = radii[i] * s; most = Math.max(most, reachM[i]); }
    const x = home.x + p.x * scale, z = home.z + p.y * scale;
    // (its cell: the grid's cell at its middle, or the nearest free one round it: a key, never shared)
    let cell: Cell = [Math.floor(x / A), Math.floor(z / A)];
    search: for (let d = 0; d < 6; d++) for (let dy = -d; dy <= d; dy++) for (let dx = -d; dx <= d; dx++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== d) continue;
      const c: Cell = [Math.floor(x / A) + dx, Math.floor(z / A) + dy];
      if (!taken.has(`${c[0]},${c[1]}`)) { cell = c; break search; }
    }
    taken.add(`${cell[0]},${cell[1]}`);
    islands.push({ kind, x, z, reach: reachM, most, found: found === "all" || found.has(kind), cell });
  }
  return { islands, home, homeCell, reach, scale, n };
}

/** The zoo's partition (rules/partition.ts's contract; partition units are metres / areaSize, the zoo having no warp): a point
 *  inside an island its cell's, anywhere else home's (the plaza and the streets). `safe` is how far it can move and surely keep
 *  its cell: under the radial distance to the nearest coast (the outlines are smooth), never under a tenth of a metre. */
export function zooPartition(L: ZooLayout, areaSize: number, seed = 0): Partition {
  const A = areaSize, B = A * 1.5, buckets = new Map<number, ZooIsland[]>(), bkey = (i: number, j: number) => i * 4096 + j;
  for (const I of L.islands) {
    for (let i = Math.floor((I.x - I.most) / B); i <= Math.floor((I.x + I.most) / B); i++)
      for (let j = Math.floor((I.z - I.most) / B); j <= Math.floor((I.z + I.most) / B); j++) {
        const k = bkey(i, j), list = buckets.get(k);
        if (list) list.push(I); else buckets.set(k, [I]);
      }
  }
  const byCell = new Map(L.islands.map(I => [`${I.cell[0]},${I.cell[1]}`, I]));
  const near = (x: number, z: number) => buckets.get(bkey(Math.floor(x / B), Math.floor(z / B))) ?? [];
  const islandAt = (x: number, z: number): ZooIsland | null => { for (const I of near(x, z)) if (insideIsland(I, x, z)) return I; return null; };
  // (how far inside its island a point lies (+), or outside its nearest coast (-), radially, m)
  const into = (I: ZooIsland, x: number, z: number) => { const dx = x - I.x, dz = z - I.z; return reachAt(I.reach, Math.atan2(dz, dx)) - Math.hypot(dx, dz); };
  const P: Partition = {
    seed, depth: 0,
    site(cx, cy) {
      if (cx === L.homeCell[0] && cy === L.homeCell[1]) return [L.home.x / A, L.home.z / A];
      const I = byCell.get(`${cx},${cy}`);
      return I ? [I.x / A, I.z / A] : [cx + 0.5, cy + 0.5];
    },
    partition(px, py) {
      const I = islandAt(px * A, py * A);
      return I ? [I.cell[0], I.cell[1]] : [L.homeCell[0], L.homeCell[1]];
    },
    partitionSafe(px, py) {
      const x = px * A, z = py * A, I = islandAt(x, z);
      if (I) return { cell: [I.cell[0], I.cell[1]], safe: Math.max(0.1, into(I, x, z) * 0.5) / A };
      let safe = B * 0.5; // (no island in its bucket: safe to the bucket's half, at least)
      for (const J of near(x, z)) safe = Math.min(safe, Math.max(0.1, -into(J, x, z) * 0.5));
      return { cell: [L.homeCell[0], L.homeCell[1]], safe: safe / A };
    },
    centreness(px, py, rc) {
      const I = byCell.get(`${rc[0]},${rc[1]}`), x = px * A, z = py * A;
      if (!I) return 1;
      const dx = x - I.x, dz = z - I.z;
      return Math.hypot(dx, dz) / Math.max(1e-6, reachAt(I.reach, Math.atan2(dz, dx)));
    },
    openness(px, py) {
      const x = px * A, z = py * A, I = islandAt(x, z);
      if (!I) return 1;
      const dx = x - I.x, dz = z - I.z;
      return Math.min(1, Math.hypot(dx, dz) / Math.max(1e-6, reachAt(I.reach, Math.atan2(dz, dx))));
    },
  };
  return P;
}

/** The little gold fence round every island (Ed, 2026-10-26: "Zoo areas, apart from home, should have a little gold fence around
 *  them, that stop creatures passing"; "the witch can fly over the fence, not walk"; "lakes get fences too"): its outline, which
 *  nothing on foot crosses. `stop` is a step's answer (as rules/lakes.ts stopAtShore's): null if it crosses no fence, else where
 *  it stops (just this side, `pad` metres off it) and the way into the fence there (nx, nz: a step's velocity into it is taken
 *  off, so she slides along it). */
export interface ZooFence {
  /** The island a point is in, or null (the plaza, the streets). */
  islandAt(x: number, z: number): ZooIsland | null;
  stop(x0: number, z0: number, x1: number, z1: number, pad?: number): { x: number; z: number; nx: number; nz: number } | null;
  /** The island whose cell this is, or null. */
  ofCell(cx: number, cy: number): ZooIsland | null;
  /** A point kept inside an island's fence (`pad` metres in): itself if it's in. */
  keepIn(I: ZooIsland, x: number, z: number, pad?: number): { x: number; z: number };
}

export function zooFence(L: ZooLayout, areaSize: number): ZooFence {
  const B = areaSize * 1.5, buckets = new Map<number, ZooIsland[]>(), bkey = (i: number, j: number) => i * 4096 + j;
  for (const I of L.islands) for (let i = Math.floor((I.x - I.most) / B); i <= Math.floor((I.x + I.most) / B); i++) for (let j = Math.floor((I.z - I.most) / B); j <= Math.floor((I.z + I.most) / B); j++) { const k = bkey(i, j); (buckets.get(k) ?? buckets.set(k, []).get(k)!).push(I); }
  const islandAt = (x: number, z: number) => { for (const I of buckets.get(bkey(Math.floor(x / B), Math.floor(z / B))) ?? []) if (insideIsland(I, x, z)) return I; return null; };
  const at = (I: ZooIsland, x: number, z: number, off: number) => { const dx = x - I.x, dz = z - I.z, d = Math.hypot(dx, dz) || 1, a = Math.atan2(dz, dx), r = Math.max(0, reachAt(I.reach, a) + off); return { x: I.x + (dx / d) * r, z: I.z + (dz / d) * r, ux: dx / d, uz: dz / d }; };
  const byCell = new Map(L.islands.map(I => [I.cell[0] * 65536 + I.cell[1], I]));
  return {
    islandAt,
    ofCell: (cx, cy) => byCell.get(cx * 65536 + cy) ?? null,
    stop(x0, z0, x1, z1, pad = 0.4) {
      const a = islandAt(x0, z0), b = islandAt(x1, z1);
      if (a === b) return null;
      if (a) { const p = at(a, x1, z1, -pad); return { x: p.x, z: p.z, nx: p.ux, nz: p.uz }; } // (leaving her island: kept in, the fence outward)
      const p = at(b!, x1, z1, pad); return { x: p.x, z: p.z, nx: -p.ux, nz: -p.uz }; // (coming to one from the street: kept out, the fence inward)
    },
    keepIn(I, x, z, pad = 0.6) {
      if (insideIsland(I, x, z) && reachAt(I.reach, Math.atan2(z - I.z, x - I.x)) - Math.hypot(x - I.x, z - I.z) >= pad) return { x, z };
      const p = at(I, x, z, -pad); return { x: p.x, z: p.z };
    },
  };
}
