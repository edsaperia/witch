// The land map (Ed, 2026-10-11, the journey's irregular islands: docs/backlog/journey.md "Irregular islands and lakes"): where
// the island's land is, worked out once when the map is made, and asked "how far from the water?" by everything that cares
// (her flight's edge and its soft hold, the beach's sand and sea, the hills easing down to it, the sea's life, the camera by the
// sea, the waves' sound). It replaces the polar coast (one radius per direction from home), which couldn't bend into inlets or
// hold a lake.
//
// Made from a test of whether a point is land (the map: is its area one of the island's), sampled on a square grid `step`
// metres apart: the coast traced between the samples (marching squares, each crossing found exactly by halving), joined into
// closed loops with the land on their left, and every sample's signed distance to the nearest stretch of them (+ on land),
// spread from the coast across the grid in two sweeps, each sample keeping the stretch nearest it. Read back by easing between
// the four samples round a point. Outside the grid: the sea, further out the further off.
//
// No drawing here: the ground shader reads the same numbers from a texture (render/ground.ts).

/** One closed coastline: its corners in order round (land on the left going round), and how far round each one lies. */
export interface CoastLoop {
  /** The corners, x and z interleaved; the last joins back to the first. */
  pts: Float64Array;
  /** How far round (m) each corner lies from the first; `length` the whole way round. */
  at: Float64Array;
  length: number;
  /** Is this the sea's coast (round land) rather than a lake's shore (round water)? */
  sea: boolean;
}

/** The nearest point of the coast to somewhere: which loop, how far round it (m), where, the way out to the water from there
 *  (a unit vector), and how far off it is (signed: + on land). */
export interface Shore { loop: number; s: number; x: number; z: number; nx: number; nz: number; dist: number }

export interface LandMap {
  /** The grid: its first sample (its corner), metres between samples, samples across and down. */
  x0: number; z0: number; step: number; cols: number; rows: number;
  /** Each sample's signed distance (m) to the coast: + on land, - on the water. Row by row from (x0, z0). */
  dist: Float32Array;
  /** Each sample's nearest stretch of coast (an index into the stretches: segLoop, segAt). */
  seg: Int32Array;
  loops: CoastLoop[];
  /** Each stretch's loop and its first corner's index in it. */
  segLoop: Int32Array; segAt: Int32Array;
  /** The land's own box (m): no land outside it. */
  box: { minX: number; maxX: number; minZ: number; maxZ: number };
  /** Signed distance (m) to the coast at (x, z), eased between the samples round it: + on land. */
  distAt(x: number, z: number): number;
  /** The distance at the sample nearest (x, z), quickly (within about a step of distAt's; off the grid, the grid's edge's). */
  roughDistAt(x: number, z: number): number;
  /** Is (x, z) on land, more than `pad` metres from the water? */
  inside(x: number, z: number, pad?: number): boolean;
  /** The way in to the land at (x, z): the distance's slope there, a unit vector (out of it, toward the water: its negative). */
  inward(x: number, z: number, out?: { x: number; z: number }): { x: number; z: number };
  /** The nearest point of the coast to (x, z). */
  shore(x: number, z: number, out?: Shore): Shore;
  /** The point `s` metres round loop `loop` (wrapping), and the way out to the water there. */
  along(loop: number, s: number, out?: { x: number; z: number; nx: number; nz: number }): { x: number; z: number; nx: number; nz: number };
}

/** Make the land map: `isLand` the test, over `box` (the land lies within it; the grid covers it and `margin` metres more), its
 *  samples `step` metres apart. */
export function makeLand(isLand: (x: number, z: number) => boolean, box: { minX: number; maxX: number; minZ: number; maxZ: number }, step = 4, margin = 128,
  /** Bits of land or water smaller than this (m², a share of an area: the fractal borders' stray crumbs of one area inside
   *  another) taken as their surroundings. */
  minArea = 0,
  /** Slivers thinner than about twice this many samples smoothed away (0: none). */
  smooth = 0,
  /** Water the sea doesn't reach (a pond the areas' borders leave) taken as land, whatever its size: no lakes but those meant. */
  fillPonds = false): LandMap {
  const x0 = box.minX - margin, z0 = box.minZ - margin;
  const cols = Math.ceil((box.maxX - box.minX + 2 * margin) / step) + 1, rows = Math.ceil((box.maxZ - box.minZ + 2 * margin) / step) + 1, N = cols * rows;
  // The test at every sample (the grid's rim always water: the land lies inside the box, and the margin past it is sea): first
  // every BLOCK-th sample, then every sample of a block whose corners differ, the rest of a block taken as its corners say.
  const land = new Uint8Array(N), BLOCK = 8;
  const test = (i: number, j: number) => i > 0 && j > 0 && i < cols - 1 && j < rows - 1 && isLand(x0 + i * step, z0 + j * step) ? 1 : 0;
  const bc = Math.ceil((cols - 1) / BLOCK) + 1, br = Math.ceil((rows - 1) / BLOCK) + 1, coarse = new Uint8Array(bc * br);
  for (let J = 0; J < br; J++) for (let I = 0; I < bc; I++) coarse[J * bc + I] = test(Math.min(cols - 1, I * BLOCK), Math.min(rows - 1, J * BLOCK));
  for (let J = 0; J < br - 1; J++) for (let I = 0; I < bc - 1; I++) {
    const v = coarse[J * bc + I], same = v === coarse[J * bc + I + 1] && v === coarse[(J + 1) * bc + I] && v === coarse[(J + 1) * bc + I + 1];
    const i1 = Math.min(cols - 1, (I + 1) * BLOCK), j1 = Math.min(rows - 1, (J + 1) * BLOCK);
    for (let j = J * BLOCK; j <= j1; j++) for (let i = I * BLOCK; i <= i1; i++) land[j * cols + i] = same ? v : (i % BLOCK === 0 && j % BLOCK === 0 ? coarse[(j / BLOCK) * bc + i / BLOCK] : test(i, j));
  }
  const raw = land.slice();
  // Smoothed (an opening, then a closing, over `smooth` samples either way): slivers of land and of water thinner than about
  // twice that (the fractal borders' finest wiggles: a finger of beach just offshore, a crack of sea) taken as what's round them.
  if (smooth > 0) {
    const tmp = new Uint8Array(N), R = smooth;
    const pass = (src: Uint8Array, dst: Uint8Array, max: boolean, horizontal: boolean) => {
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        let v = max ? 0 : 1;
        for (let o = -R; o <= R; o++) {
          const ii = horizontal ? i + o : i, jj = horizontal ? j : j + o;
          const w = ii < 0 || jj < 0 || ii >= cols || jj >= rows ? 0 : src[jj * cols + ii];
          if (max ? w > v : w < v) v = w;
        }
        dst[j * cols + i] = v;
      }
    };
    const op = (max: boolean) => { pass(land, tmp, max, true); pass(tmp, land, max, false); };
    op(false); op(true); // (opening: land's slivers gone)
    op(true); op(false); // (closing: water's)
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1) land[j * cols + i] = 0;
  }
  // Crumbs: each run of land or of water (joined side to side) under minArea taken as what's round it; the sea round the rim never.
  if (minArea > 0 || fillPonds) {
    const most = minArea / (step * step), comp = new Int32Array(N).fill(-1), stack = new Int32Array(N), members = new Int32Array(N);
    for (let k0 = 0; k0 < N; k0++) {
      if (comp[k0] >= 0) continue;
      const v = land[k0];
      let top = 0, count = 0, rim = false;
      stack[top++] = k0; comp[k0] = k0;
      while (top) {
        const k = stack[--top], i = k % cols, j = (k - i) / cols;
        members[count++] = k;
        if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1) rim = true;
        if (i > 0 && comp[k - 1] < 0 && land[k - 1] === v) { comp[k - 1] = k0; stack[top++] = k - 1; }
        if (i < cols - 1 && comp[k + 1] < 0 && land[k + 1] === v) { comp[k + 1] = k0; stack[top++] = k + 1; }
        if (j > 0 && comp[k - cols] < 0 && land[k - cols] === v) { comp[k - cols] = k0; stack[top++] = k - cols; }
        if (j < rows - 1 && comp[k + cols] < 0 && land[k + cols] === v) { comp[k + cols] = k0; stack[top++] = k + cols; }
      }
      if (!rim && (count < most || (fillPonds && v === 0))) for (let q = 0; q < count; q++) land[members[q]] = 1 - v; // (its neighbours, already numbered, keep theirs)
    }
  }
  // Where the coast crosses each edge between samples, found by halving (8 times: to a 256th of a step), kept by the edge.
  const cross = (ax: number, az: number, bx: number, bz: number, aLand: boolean): [number, number] => {
    let lo = 0, hi = 1;
    for (let k = 0; k < 8; k++) { const m = (lo + hi) / 2; if (isLand(ax + (bx - ax) * m, az + (bz - az) * m) === aLand) lo = m; else hi = m; }
    const m = (lo + hi) / 2;
    return [ax + (bx - ax) * m, az + (bz - az) * m];
  };
  const points = new Map<number, [number, number]>(); // (an edge's key: its first sample's index * 2, + 1 for the vertical edge)
  const pointOn = (i: number, j: number, vertical: boolean): number => {
    const key = (j * cols + i) * 2 + (vertical ? 1 : 0);
    if (!points.has(key)) {
      const ax = x0 + i * step, az = z0 + j * step, bx = vertical ? ax : ax + step, bz = vertical ? az + step : az;
      const ka = j * cols + i, kb = vertical ? ka + cols : ka + 1;
      points.set(key, raw[ka] === raw[kb] ? [(ax + bx) / 2, (az + bz) / 2] : cross(ax, az, bx, bz, raw[ka] === 1)); // (a crumb taken in: its edge halfway)
    }
    return key;
  };
  // Marching squares: each square's crossings joined in pairs (a saddle split by the test at its middle), every pair a stretch
  // `from -> to`, then turned so the land lies on its left.
  const next = new Map<number, number>();
  for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
    const a = land[j * cols + i], b = land[j * cols + i + 1], c = land[(j + 1) * cols + i + 1], d = land[(j + 1) * cols + i];
    const code = a | (b << 1) | (c << 2) | (d << 3);
    if (code === 0 || code === 15) continue;
    // its edges: top (a-b), right (b-c), bottom (d-c), left (a-d), and the corners each joins
    const E = { T: [0, 1], R: [1, 2], B: [3, 2], L: [0, 3] } as const, corner = [a, b, c, d];
    const key = (e: keyof typeof E) => e === "T" ? pointOn(i, j, false) : e === "R" ? pointOn(i + 1, j, true) : e === "B" ? pointOn(i, j + 1, false) : pointOn(i, j, true);
    const pairs: [keyof typeof E, keyof typeof E][] = [];
    switch (code) {
      case 1: case 14: pairs.push(["L", "T"]); break;
      case 2: case 13: pairs.push(["T", "R"]); break;
      case 3: case 12: pairs.push(["L", "R"]); break;
      case 4: case 11: pairs.push(["R", "B"]); break;
      case 6: case 9: pairs.push(["T", "B"]); break;
      case 7: case 8: pairs.push(["L", "B"]); break;
      case 5: case 10: {
        // (a and c alike, b and d alike: joined through the middle if it's like a and c (b's and d's corners cut off), else a's and c's)
        const mid = isLand(x0 + (i + 0.5) * step, z0 + (j + 0.5) * step) ? 1 : 0;
        if (mid === a) pairs.push(["T", "R"], ["L", "B"]); else pairs.push(["L", "T"], ["R", "B"]);
        break;
      }
    }
    for (const [p, q] of pairs) {
      // Turned so the land lies on its left: the corner the two edges share (or, straight across, corner a) tested.
      const shared = E[p].find(k => (E[q] as readonly number[]).includes(k)) ?? 0;
      const P = points.get(key(p))!, Q = points.get(key(q))!, cx = x0 + (i + (shared === 1 || shared === 2 ? 1 : 0)) * step, cz = z0 + (j + (shared >= 2 ? 1 : 0)) * step;
      const hx = Q[0] - P[0], hz = Q[1] - P[1], onLeft = (cx - P[0]) * hz - (cz - P[1]) * hx > 0;
      let f = key(p), t = key(q);
      if (onLeft !== (corner[shared] === 1)) { const s = f; f = t; t = s; }
      next.set(f, t);
    }
  }
  // Joined into loops.
  const loops: CoastLoop[] = [], segLoopL: number[] = [], segAtL: number[] = [];
  const used = new Set<number>();
  for (const start of next.keys()) {
    if (used.has(start)) continue;
    const xs: number[] = [];
    let k: number | undefined = start;
    while (k !== undefined && !used.has(k)) { used.add(k); const p = points.get(k)!; xs.push(p[0], p[1]); k = next.get(k); }
    if (xs.length < 6) continue;
    const n = xs.length / 2, pts = Float64Array.from(xs), at = new Float64Array(n);
    let len = 0;
    for (let q = 0; q < n; q++) { at[q] = len; const r = (q + 1) % n; len += Math.hypot(pts[r * 2] - pts[q * 2], pts[r * 2 + 1] - pts[q * 2 + 1]); }
    const li = loops.length;
    loops.push({ pts, at, length: len, sea: false });
    for (let q = 0; q < n; q++) { segLoopL.push(li); segAtL.push(q); }
  }
  // Which loops are the sea's coast: those going round land (their area, the land on their left, comes out positive); a loop
  // round water inside the land is a lake's shore.
  for (const L of loops) {
    let a = 0;
    const n = L.pts.length / 2;
    for (let q = 0; q < n; q++) { const r = (q + 1) % n; a += L.pts[q * 2] * L.pts[r * 2 + 1] - L.pts[r * 2] * L.pts[q * 2 + 1]; }
    L.sea = -a / 2 > 0;
  }
  const segLoop = Int32Array.from(segLoopL), segAt = Int32Array.from(segAtL), S = segLoop.length;
  const segX0 = new Float64Array(S), segZ0 = new Float64Array(S), segX1 = new Float64Array(S), segZ1 = new Float64Array(S);
  for (let s = 0; s < S; s++) {
    const L = loops[segLoop[s]], q = segAt[s], r = (q + 1) % (L.pts.length / 2);
    segX0[s] = L.pts[q * 2]; segZ0[s] = L.pts[q * 2 + 1]; segX1[s] = L.pts[r * 2]; segZ1[s] = L.pts[r * 2 + 1];
  }
  const segDist2 = (s: number, x: number, z: number) => {
    const ax = segX0[s], az = segZ0[s], dx = segX1[s] - ax, dz = segZ1[s] - az, l2 = dx * dx + dz * dz;
    const u = l2 > 0 ? Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l2)) : 0, px = ax + dx * u - x, pz = az + dz * u - z;
    return px * px + pz * pz;
  };
  // Every sample's nearest stretch: first those within a step and a half of each stretch, then spread across the grid.
  const seg = new Int32Array(N).fill(-1), d2 = new Float64Array(N).fill(Infinity);
  for (let s = 0; s < S; s++) {
    const i0 = Math.max(0, Math.floor((Math.min(segX0[s], segX1[s]) - x0) / step) - 1), i1 = Math.min(cols - 1, Math.ceil((Math.max(segX0[s], segX1[s]) - x0) / step) + 1);
    const j0 = Math.max(0, Math.floor((Math.min(segZ0[s], segZ1[s]) - z0) / step) - 1), j1 = Math.min(rows - 1, Math.ceil((Math.max(segZ0[s], segZ1[s]) - z0) / step) + 1);
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) { const k = j * cols + i, e = segDist2(s, x0 + i * step, z0 + j * step); if (e < d2[k]) { d2[k] = e; seg[k] = s; } }
  }
  // (a sweep each way, every sample offered its neighbours' stretches: dead reckoning, inlined for speed)
  const offer = (k: number, s: number, x: number, z: number) => {
    const ax = segX0[s], az = segZ0[s], dx = segX1[s] - ax, dz = segZ1[s] - az, l2 = dx * dx + dz * dz;
    let u = l2 > 0 ? ((x - ax) * dx + (z - az) * dz) / l2 : 0;
    u = u < 0 ? 0 : u > 1 ? 1 : u;
    const px = ax + dx * u - x, pz = az + dz * u - z, e = px * px + pz * pz;
    if (e < d2[k]) { d2[k] = e; seg[k] = s; }
  };
  for (let pass = 0; pass < 1; pass++) {
    for (let j = 0; j < rows; j++) {
      const z = z0 + j * step;
      for (let i = 0; i < cols; i++) {
        const k = j * cols + i, x = x0 + i * step, me = seg[k];
        let s;
        if (i > 0 && (s = seg[k - 1]) >= 0 && s !== me) offer(k, s, x, z);
        if (j > 0) {
          if ((s = seg[k - cols]) >= 0 && s !== seg[k]) offer(k, s, x, z);
          if (i > 0 && (s = seg[k - cols - 1]) >= 0 && s !== seg[k]) offer(k, s, x, z);
          if (i < cols - 1 && (s = seg[k - cols + 1]) >= 0 && s !== seg[k]) offer(k, s, x, z);
        }
      }
      for (let i = cols - 2; i >= 0; i--) { const k = j * cols + i, s = seg[k + 1]; if (s >= 0 && s !== seg[k]) offer(k, s, x0 + i * step, z); }
    }
    for (let j = rows - 1; j >= 0; j--) {
      const z = z0 + j * step;
      for (let i = cols - 1; i >= 0; i--) {
        const k = j * cols + i, x = x0 + i * step, me = seg[k];
        let s;
        if (i < cols - 1 && (s = seg[k + 1]) >= 0 && s !== me) offer(k, s, x, z);
        if (j < rows - 1) {
          if ((s = seg[k + cols]) >= 0 && s !== seg[k]) offer(k, s, x, z);
          if (i < cols - 1 && (s = seg[k + cols + 1]) >= 0 && s !== seg[k]) offer(k, s, x, z);
          if (i > 0 && (s = seg[k + cols - 1]) >= 0 && s !== seg[k]) offer(k, s, x, z);
        }
      }
      for (let i = 1; i < cols; i++) { const k = j * cols + i, s = seg[k - 1]; if (s >= 0 && s !== seg[k]) offer(k, s, x0 + i * step, z); }
    }
  }
  const dist = new Float32Array(N);
  for (let k = 0; k < N; k++) dist[k] = (land[k] ? 1 : -1) * (seg[k] >= 0 ? Math.sqrt(d2[k]) : 1e4);

  const distAt = (x: number, z: number): number => {
    const u = (x - x0) / step, v = (z - z0) / step;
    const iu = Math.max(0, Math.min(cols - 2, Math.floor(u))), iv = Math.max(0, Math.min(rows - 2, Math.floor(v)));
    const fu = Math.max(0, Math.min(1, u - iu)), fv = Math.max(0, Math.min(1, v - iv)), k = iv * cols + iu;
    const d = (dist[k] * (1 - fu) + dist[k + 1] * fu) * (1 - fv) + (dist[k + cols] * (1 - fu) + dist[k + cols + 1] * fu) * fv;
    // (off the grid: the sea, deeper by how far off)
    const ox = Math.max(0, x0 - x, x - (x0 + (cols - 1) * step)), oz = Math.max(0, z0 - z, z - (z0 + (rows - 1) * step));
    return ox || oz ? d - Math.hypot(ox, oz) : d;
  };
  const inward = (x: number, z: number, out = { x: 0, z: 0 }) => {
    const h = step * 0.5, gx = distAt(x + h, z) - distAt(x - h, z), gz = distAt(x, z + h) - distAt(x, z - h), l = Math.hypot(gx, gz);
    if (l > 1e-9) { out.x = gx / l; out.z = gz / l; return out; }
    // (flat: toward the nearest coast's land side)
    const s = shore(x, z);
    out.x = -s.nx; out.z = -s.nz;
    return out;
  };
  const sampleSeg = (x: number, z: number): number => {
    const i = Math.max(0, Math.min(cols - 1, Math.round((x - x0) / step))), j = Math.max(0, Math.min(rows - 1, Math.round((z - z0) / step)));
    return seg[j * cols + i];
  };
  const shore = (x: number, z: number, out?: Shore): Shore => {
    // (the stretches the samples round it are nearest, the nearest of them exactly)
    const i = Math.max(0, Math.min(cols - 2, Math.floor((x - x0) / step))), j = Math.max(0, Math.min(rows - 2, Math.floor((z - z0) / step)));
    let bs = sampleSeg(x, z), be = bs >= 0 ? segDist2(bs, x, z) : Infinity;
    for (const k of [j * cols + i, j * cols + i + 1, (j + 1) * cols + i, (j + 1) * cols + i + 1]) {
      const s = seg[k];
      if (s < 0 || s === bs) continue;
      // (its neighbours round its loop too: the corner between two stretches)
      for (const t of [s, neighbourSeg(s, -1), neighbourSeg(s, 1)]) { const e = segDist2(t, x, z); if (e < be) { be = e; bs = t; } }
    }
    if (bs >= 0) for (const t of [neighbourSeg(bs, -1), neighbourSeg(bs, 1)]) { const e = segDist2(t, x, z); if (e < be) { be = e; bs = t; } }
    const o = out ?? { loop: 0, s: 0, x: 0, z: 0, nx: 0, nz: 0, dist: 0 };
    if (bs < 0) { o.loop = -1; o.s = 0; o.x = x; o.z = z; o.nx = 0; o.nz = 0; o.dist = distAt(x, z); return o; }
    const ax = segX0[bs], az = segZ0[bs], dx = segX1[bs] - ax, dz = segZ1[bs] - az, l2 = dx * dx + dz * dz, l = Math.sqrt(l2) || 1;
    const u = l2 > 0 ? Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l2)) : 0;
    const L = loops[segLoop[bs]];
    o.loop = segLoop[bs]; o.s = L.at[segAt[bs]] + u * l; o.x = ax + dx * u; o.z = az + dz * u;
    const d = Math.sqrt(be), sign = distAt(x, z) >= 0 ? 1 : -1;
    o.dist = sign * d;
    // (out to the water: off the coast, along the line from her to it (toward it from the land, away from it on the water);
    // on it, the coast's own way out there, smoothed over a few stretches)
    if (d > step * 0.25) { o.nx = ((o.x - x) / d) * sign; o.nz = ((o.z - z) / d) * sign; }
    else { const n = normalAt(segLoop[bs], segAt[bs]); o.nx = n[0]; o.nz = n[1]; }
    return o;
  };
  /** The way out to the water at a loop's stretch q: right of the chord over two stretches either side (the land on its left). */
  function normalAt(loop: number, q: number): [number, number] {
    const L = loops[loop], n = L.pts.length / 2, a = (q - 2 + n * 4) % n, b = (q + 3) % n;
    const dx = L.pts[b * 2] - L.pts[a * 2], dz = L.pts[b * 2 + 1] - L.pts[a * 2 + 1], l = Math.hypot(dx, dz) || 1;
    return [-dz / l, dx / l];
  }
  function neighbourSeg(s: number, by: number): number {
    const L = loops[segLoop[s]], n = L.pts.length / 2, q = (segAt[s] + by + n) % n;
    return s - segAt[s] + q; // (a loop's stretches lie together, in order)
  }
  const along = (loop: number, s: number, out = { x: 0, z: 0, nx: 0, nz: 0 }) => {
    const L = loops[loop], n = L.pts.length / 2;
    let w = s % L.length;
    if (w < 0) w += L.length;
    // (binary search for the stretch holding w)
    let lo = 0, hi = n - 1;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (L.at[m] <= w) lo = m; else hi = m - 1; }
    const q = lo, r = (q + 1) % n, ax = L.pts[q * 2], az = L.pts[q * 2 + 1], dx = L.pts[r * 2] - ax, dz = L.pts[r * 2 + 1] - az, l = Math.hypot(dx, dz) || 1, u = Math.min(1, (w - L.at[q]) / l);
    out.x = ax + dx * u; out.z = az + dz * u;
    const nn = normalAt(loop, q); out.nx = nn[0]; out.nz = nn[1];
    return out;
  };
  let bx0 = Infinity, bx1 = -Infinity, bz0 = Infinity, bz1 = -Infinity;
  for (const L of loops) for (let q = 0; q < L.pts.length; q += 2) { bx0 = Math.min(bx0, L.pts[q]); bx1 = Math.max(bx1, L.pts[q]); bz0 = Math.min(bz0, L.pts[q + 1]); bz1 = Math.max(bz1, L.pts[q + 1]); }
  return {
    x0, z0, step, cols, rows, dist, seg, loops, segLoop, segAt,
    box: loops.length ? { minX: bx0, maxX: bx1, minZ: bz0, maxZ: bz1 } : { ...box },
    distAt, inside: (x, z, pad = 0) => distAt(x, z) > pad, inward, shore, along,
    roughDistAt: (x, z) => { let i = Math.round((x - x0) / step), j = Math.round((z - z0) / step); i = i < 0 ? 0 : i >= cols ? cols - 1 : i; j = j < 0 ? 0 : j >= rows ? rows - 1 : j; return dist[j * cols + i]; },
  };
}

/** The point of the sea's coast whose way out to the water faces `bearing` (radians, atan2 of z and x: 0 east), within `within`
 *  radians, furthest out that way of those on a straight stretch (30 m in, 30 m from the water); and that way out. Null if none
 *  faces that way. For tests and tools: a beach to stand on facing a given way. */
export function coastFacing(L: LandMap, bearing: number, within = 0.04): { x: number; z: number; nx: number; nz: number } | null {
  let sea = -1;
  L.loops.forEach((l, i) => { if (l.sea && (sea < 0 || l.length > L.loops[sea].length)) sea = i; });
  if (sea < 0) return null;
  const len = L.loops[sea].length, ux = Math.cos(bearing), uz = Math.sin(bearing);
  let best: { x: number; z: number; nx: number; nz: number } | null = null, far = -Infinity;
  for (let s = 0; s < len; s += 4) {
    const p = L.along(sea, s), off = Math.atan2(p.nz, p.nx) - bearing;
    if (Math.abs(Math.atan2(Math.sin(off), Math.cos(off))) > within) continue;
    if (Math.abs(L.distAt(p.x - p.nx * 30, p.z - p.nz * 30) - 30) > 3) continue;
    const d = p.x * ux + p.z * uz;
    if (d > far) { far = d; best = { ...p }; }
  }
  return best;
}
