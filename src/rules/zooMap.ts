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
  /** Its outline's outer envelope: the furthest coast (m) at n even angles from -PI (atan2(z, x)), eased between (spacing). */
  reach: Float32Array;
  /** Its coast (Ed, 2026-10-26: "We already know the real coastline shapes, can't we reuse them in the zoo"): a closed loop of
   *  points (x, z pairs, m from its middle), the chart's real one where this browser has it (ZooLayoutKnobs.coasts), else the
   *  round one from `reach`. What's inside it is the island (insideIsland, coastDist). */
  coast: Float32Array;
  /** Its coast is the chart's real one (not the round stand-in). */
  real?: boolean;
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
  /** The street between the nearest two islands at least (m), coast to coast. */
  gap: number;
  /** The street an island's nearest neighbour typically lies across (m, coast to coast; the median): the chart is spread to it. */
  street?: number;
  /** Clear of the Ent's plaza by at least (m from home's middle). */
  plaza?: number;
  /** The chart's real coasts by kind (app/zooCoasts.ts, from the chart's cache): each a closed loop of x, z pairs, its longer side
   *  1 across, centred on its box. An island with none is drawn round, as the chart draws one it hasn't made yet. */
  coasts?: Record<string, readonly number[]>;
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
export function insideIsland(I: Pick<ZooIsland, "x" | "z" | "most" | "coast">, x: number, z: number): boolean {
  const dx = x - I.x, dz = z - I.z;
  if (Math.abs(dx) > I.most || Math.abs(dz) > I.most) return false;
  return inLoop(I.coast, dx, dz);
}

/** Whether (x, z) lies inside a closed loop of x, z pairs (even-odd: bays and points as they are). */
export function inLoop(loop: ArrayLike<number>, x: number, z: number): boolean {
  let inside = false;
  for (let i = 0, n = loop.length, j = n - 2; i < n; j = i, i += 2) {
    const xi = loop[i], zi = loop[i + 1], xj = loop[j], zj = loop[j + 1];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

/** The nearest point of a closed loop to (x, z): the point, how far, and the way out of the coast there (the edge's normal,
 *  pointing from (x, z)'s side to it if `inside`, else away). */
export function nearestOnLoop(loop: ArrayLike<number>, x: number, z: number): { x: number; z: number; d: number; nx: number; nz: number } {
  let best = Infinity, bx = 0, bz = 0;
  for (let i = 0, n = loop.length, j = n - 2; i < n; j = i, i += 2) {
    const ax = loop[j], az = loop[j + 1], ex = loop[i] - ax, ez = loop[i + 1] - az, l2 = ex * ex + ez * ez;
    const t = l2 > 0 ? Math.max(0, Math.min(1, ((x - ax) * ex + (z - az) * ez) / l2)) : 0, px = ax + ex * t, pz = az + ez * t, d = (x - px) ** 2 + (z - pz) ** 2;
    if (d < best) { best = d; bx = px; bz = pz; }
  }
  const d = Math.sqrt(best), nx = d > 1e-6 ? (bx - x) / d : 0, nz = d > 1e-6 ? (bz - z) / d : 0;
  return { x: bx, z: bz, d, nx, nz };
}

/** How far inside its island's coast a point lies (+), or outside it (-), m. */
export function coastDist(I: Pick<ZooIsland, "x" | "z" | "coast">, x: number, z: number): number {
  const d = nearestOnLoop(I.coast, x - I.x, z - I.z).d;
  return inLoop(I.coast, x - I.x, z - I.z) ? d : -d;
}

/** How far from its middle the coast first comes along a bearing (radians, atan2(z, x)), m: the shore that way. */
export function coastAlong(I: Pick<ZooIsland, "coast" | "most">, a: number): number {
  const ux = Math.cos(a), uz = Math.sin(a), L = I.coast;
  let best = I.most;
  for (let i = 0, n = L.length, j = n - 2; i < n; j = i, i += 2) {
    const ax = L[j], az = L[j + 1], ex = L[i] - ax, ez = L[i + 1] - az, den = ux * ez - uz * ex;
    if (Math.abs(den) < 1e-9) continue;
    const t = (ax * ez - az * ex) / den, s = (ax * uz - az * ux) / den; // (along the ray, and along the edge)
    if (t > 0 && s >= 0 && s <= 1 && t < best) best = t;
  }
  return best;
}

/** A round coast from radii at even angles (the stand-in): a loop of `n` points. */
function loopOfReach(reach: Float32Array, n = 96): Float32Array {
  const out = new Float32Array(n * 2);
  for (let k = 0; k < n; k++) { const a = -Math.PI + (k / n) * Math.PI * 2, r = reachAt(reach, a); out[k * 2] = Math.cos(a) * r; out[k * 2 + 1] = Math.sin(a) * r; }
  return out;
}

/** A real coast (unit across, centred on its box) made `across` metres wide, its middle moved to the point deepest inside it (so
 *  its legend's circle and its fence's lamps sit well in), with its envelope at `bins` angles and its furthest point. */
export function placeCoast(unit: readonly number[], across: number, bins = 128): { coast: Float32Array; reach: Float32Array; most: number } {
  const n = unit.length >> 1, c = new Float32Array(n * 2);
  for (let i = 0; i < n * 2; i++) c[i] = unit[i] * across;
  // (the point deepest inside: a coarse grid over its box, then a finer one round the best)
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (let i = 0; i < n; i++) { x0 = Math.min(x0, c[i * 2]); x1 = Math.max(x1, c[i * 2]); z0 = Math.min(z0, c[i * 2 + 1]); z1 = Math.max(z1, c[i * 2 + 1]); }
  let bx = (x0 + x1) / 2, bz = (z0 + z1) / 2, bd = -Infinity;
  const look = (cx: number, cz: number, half: number, steps: number) => {
    for (let i = 0; i <= steps; i++) for (let j = 0; j <= steps; j++) {
      const x = cx - half + (2 * half * i) / steps, z = cz - half + (2 * half * j) / steps;
      if (!inLoop(c, x, z)) continue;
      const d = nearestOnLoop(c, x, z).d;
      if (d > bd) { bd = d; bx = x; bz = z; }
    }
  };
  look((x0 + x1) / 2, (z0 + z1) / 2, Math.max(x1 - x0, z1 - z0) / 2, 24);
  look(bx, bz, Math.max(x1 - x0, z1 - z0) / 24, 12);
  for (let i = 0; i < n; i++) { c[i * 2] -= bx; c[i * 2 + 1] -= bz; }
  // (its envelope: the furthest coast at each angle, and between its points, so nothing of it sticks out past it)
  const reach = new Float32Array(bins);
  let most = 0;
  for (let i = 0; i < n; i++) {
    const x = c[i * 2], z = c[i * 2 + 1], ax = c[((i + 1) % n) * 2], az = c[((i + 1) % n) * 2 + 1];
    for (let s = 0; s < 4; s++) {
      const px = x + ((ax - x) * s) / 4, pz = z + ((az - z) * s) / 4, r = Math.hypot(px, pz), k = Math.round(((Math.atan2(pz, px) + Math.PI) / (Math.PI * 2)) * bins) % bins;
      reach[k] = Math.max(reach[k], r); most = Math.max(most, r);
    }
  }
  for (let pass = 0; pass < 2; pass++) for (let k = 0; k < bins; k++) reach[k] = Math.max(reach[k], reach[(k + 1) % bins] * 0.97, reach[(k + bins - 1) % bins] * 0.97);
  return { coast: c, reach, most };
}

/** The zoo's layout for a world: every kind's island at its chart place, `found` (a set of kinds, or "all") its area, the rest
 *  lakes. `coast`: the islands' coast knobs (the tuning's islands.coast), as the chart draws them. */
export function zooLayout(world: number, found: ReadonlySet<string> | "all", k: ZooLayoutKnobs, coast?: CoastKnobs, kinds: readonly string[] = KIND_NAMES): ZooLayout {
  const placed = worldOf(world).islands;
  // Each island's outline, scaled so it's `across` wide whatever its real size (Ed, "about the same size as the ones found on islands")
  const shapes: { kind: string; p: { x: number; y: number }; reach: Float32Array; most: number; coast: Float32Array; real: boolean }[] = [];
  for (const kind of kinds) {
    const p = placed.get(kind), isle = islandOf(kind, world);
    if (!p || !isle) continue;
    const real = k.coasts?.[kind];
    if (real && real.length >= 12) { const P = placeCoast(real, k.across); shapes.push({ kind, p, ...P, real: true }); continue; } // (the chart's own coast)
    const radii = islandCoast(coastSpec(isle) as IslandSpec, coast).radii, N = radii.length;
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let i = 0; i < N; i++) { const a = -Math.PI + (i / N) * Math.PI * 2, r = radii[i]; x0 = Math.min(x0, Math.cos(a) * r); x1 = Math.max(x1, Math.cos(a) * r); z0 = Math.min(z0, Math.sin(a) * r); z1 = Math.max(z1, Math.sin(a) * r); }
    const s = k.across / Math.max(1e-6, x1 - x0, z1 - z0), reachM = new Float32Array(N);
    let most = 0;
    for (let i = 0; i < N; i++) { reachM[i] = radii[i] * s; most = Math.max(most, reachM[i]); }
    shapes.push({ kind, p, reach: reachM, most, coast: loopOfReach(reachM), real: false });
  }
  // The chart spread so an island's nearest neighbour typically lies a street of `street` metres away (Ed, 2026-10-26: "Zoo areas
  // are too small and too far apart"; before, the chart's closest two islands set the spread, leaving most streets far wider), then
  // eased apart wherever two come closer than `gap` coast to coast, or one onto the plaza: the chart's layout kept, its gaps closed.
  const nn = shapes.map(a => Math.min(...shapes.filter(b => b !== a).map(b => Math.hypot(a.p.x - b.p.x, a.p.y - b.p.y))));
  const sorted = [...nn].sort((a, b) => a - b), mid = sorted[Math.floor(sorted.length / 2)] ?? 1;
  const scale = (k.across + (k.street ?? k.gap)) / Math.max(1e-6, mid);
  const at = shapes.map(sh => ({ x: sh.p.x * scale, z: sh.p.y * scale }));
  const clear = (k.plaza ?? 0) + k.gap;
  const ease = () => { // (apart wherever two come closer than gap coast to coast, or one onto the plaza)
    for (let pass = 0; pass < 80; pass++) {
      let moved = false;
      for (let i = 0; i < shapes.length; i++) {
        const A = at[i];
        if (k.plaza !== undefined) { const d = Math.hypot(A.x, A.z) || 1e-6, need = clear + reachAt(shapes[i].reach, Math.atan2(-A.z, -A.x)); if (d < need) { A.x *= need / d; A.z *= need / d; moved = true; } }
        for (let j = i + 1; j < shapes.length; j++) {
          const B = at[j], dx = B.x - A.x, dz = B.z - A.z, d = Math.hypot(dx, dz) || 1e-6;
          if (d > shapes[i].most + shapes[j].most + k.gap) continue;
          const a = Math.atan2(dz, dx), need = reachAt(shapes[i].reach, a) + reachAt(shapes[j].reach, a + Math.PI) + k.gap;
          if (d >= need) continue;
          const push = (need - d) / 2 + 0.01, ux = dx / d, uz = dz / d;
          A.x -= ux * push; A.z -= uz * push; B.x += ux * push; B.z += uz * push; moved = true;
        }
      }
      if (!moved) return;
    }
  };
  // (each island's street to its nearest neighbour, coast to coast; the median)
  const streets = () => { const g = at.map((A, i) => Math.min(...at.map((B, j) => { if (i === j) return Infinity; const a = Math.atan2(B.z - A.z, B.x - A.x); return Math.hypot(B.x - A.x, B.z - A.z) - reachAt(shapes[i].reach, a) - reachAt(shapes[j].reach, a + Math.PI); }))).sort((a, b) => a - b); return g[Math.floor(g.length / 2)] ?? 0; };
  ease();
  // (the chart's sparse stretches leave wide streets still: drawn in toward the plaza a little at a time, eased apart again each
  // time, till the typical street is `street`)
  for (let step = 0; step < 120 && streets() > (k.street ?? k.gap); step++) { for (const A of at) { A.x *= 0.99; A.z *= 0.99; } ease(); }
  let far = 0;
  shapes.forEach((sh, i) => { far = Math.max(far, Math.hypot(at[i].x, at[i].z) + sh.most); });
  const reach = far, half = reach + k.margin + k.areaSize * 2, A = k.areaSize;
  const n = Math.ceil((half * 2) / A) + 2, gridMid = (n * A) / 2, home = { x: gridMid, z: gridMid };
  const homeCell: Cell = [Math.floor(home.x / A), Math.floor(home.z / A)];
  const taken = new Set([`${homeCell[0]},${homeCell[1]}`]);
  const islands: ZooIsland[] = [];
  shapes.forEach((sh, i) => {
    const x = home.x + at[i].x, z = home.z + at[i].z;
    // (its cell: the grid's cell at its middle, or the nearest free one round it: a key, never shared)
    let cell: Cell = [Math.floor(x / A), Math.floor(z / A)];
    search: for (let d = 0; d < 6; d++) for (let dy = -d; dy <= d; dy++) for (let dx = -d; dx <= d; dx++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== d) continue;
      const c: Cell = [Math.floor(x / A) + dx, Math.floor(z / A) + dy];
      if (!taken.has(`${c[0]},${c[1]}`)) { cell = c; break search; }
    }
    taken.add(`${cell[0]},${cell[1]}`);
    islands.push({ kind: sh.kind, x, z, reach: sh.reach, most: sh.most, coast: sh.coast, ...(sh.real ? { real: true } : {}), found: found === "all" || found.has(sh.kind), cell });
  });
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
  // (how far inside its island a point lies (+), or outside its nearest coast (-), m)
  const into = (I: ZooIsland, x: number, z: number) => coastDist(I, x, z);
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
      const r = Math.hypot(x - I.x, z - I.z), d = coastDist(I, x, z);
      return d > 0 ? r / Math.max(1e-6, r + d) : 1 + -d / Math.max(1e-6, r); // (0 at its middle, 1 at its coast)
    },
    openness(px, py) {
      const x = px * A, z = py * A, I = islandAt(x, z);
      if (!I) return 1;
      const r = Math.hypot(x - I.x, z - I.z);
      return Math.min(1, r / Math.max(1e-6, r + Math.max(0, coastDist(I, x, z))));
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
  // (the coast nearest (x, z), `off` metres out from it (in, if negative), and the way out there)
  const at = (I: ZooIsland, x: number, z: number, off: number) => {
    const q = nearestOnLoop(I.coast, x - I.x, z - I.z), inside = inLoop(I.coast, x - I.x, z - I.z), ux = inside ? q.nx : -q.nx, uz = inside ? q.nz : -q.nz;
    const ox = q.d > 1e-6 ? ux : -(q.x) / (Math.hypot(q.x, q.z) || 1), oz = q.d > 1e-6 ? uz : -(q.z) / (Math.hypot(q.x, q.z) || 1); // (on it: out from the middle)
    return { x: I.x + q.x + ox * off, z: I.z + q.z + oz * off, ux: ox, uz: oz };
  };
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
      if (coastDist(I, x, z) >= pad) return { x, z };
      const p = at(I, x, z, -pad); return { x: p.x, z: p.z };
    },
  };
}
