// Pure rolling-height samples and caches. No textures, uniforms, DOM or graphics objects.
import type { ForestMap } from './map';
import type { Forest } from './forest';
import { floorClearing } from './speakers';
import { beachOf, type Beach } from './mapShape';
import { smoothstep } from './random';
import { SLOPE_SCALE, terrainAt, type HillsTuning } from './terrain';

export interface HalfCodec { toHalfFloat(v: number): number; fromHalfFloat(v: number): number }
export interface HeightPrep { seed: number; hills: string; state: Record<string, unknown> }
const HEIGHT_STATE_KEYS = ['half', 'data', 'ci', 'cj', 'filled', 'circles', 'pondBuckets', 'pondsAt', 'ahead', 'srcV', 'srcI', 'srcJ', 'segs', 'segGrid', 'segH', 'prepared', 'pondLevels'] as const;
const preparedHeights = new WeakMap<ForestMap, HeightPrep>();
export const knownHeightPrep = (map: ForestMap): HeightPrep | undefined => preparedHeights.get(map);
export const rememberHeightPrep = (map: ForestMap, prep: HeightPrep): void => { preparedHeights.set(map, prep); };
export const arrivalHills = (t: ForestMap['tuning']): HillsTuning => {
  const c = t.camera, pitch = Math.min(c.ground.angleIn, c.ground.angleOut, c.treetop.angleIn, c.treetop.angleOut);
  return { ...t.ground.hills, maxSlope: Math.tan(pitch * Math.PI / 180) };
};

/** Metres a sample; samples across the window; the window moves in steps of this many samples. */
export const RES = 2;
export const N = 400;
const STEP = 8;
/** The slope limit's reach (samples): no two samples this close differ by more than the limit allows. */
const RAD = 8;
/** Its neighbourhood: each sample offset's distance (m), 0 for itself and those past RAD. */
const DIST = Array.from({ length: 2 * RAD + 1 }, (_, a) => Float32Array.from({ length: 2 * RAD + 1 }, (_, b) => { const d = Math.hypot(a - RAD, b - RAD) * RES; return d <= RAD * RES ? d : 0; }));
/** The source samples kept round the window (wrapping like it), for the limit's neighbourhoods. */
const SM = N + 2 * (RAD + STEP);
/** How far beyond its edge a path levels the ground, and the plateaus' easing (metres). */
const BUCKET = 64;
/** The path segments' index: cell size (m), and floats a segment. */
const SEG_CELL = 24, SEG = 8;


/** h pulled toward several levels at once: `pulls` is flat (weight 0 to 1, level, the most odds
 *  it can have). Each pulls by its odds w / (1 - w), so one alone is a plain mix by w, a level
 *  core (w 1) always wins (where two cores meet, the one allowed more odds), and the result
 *  doesn't depend on their order (which was a cliff where two crossed). */
export function blend(h: number, pulls: ArrayLike<number>, length = pulls.length): number {
  let num = h, den = 1;
  for (let i = 0; i < length; i += 3) {
    const w = pulls[i];
    if (w <= 0) continue;
    const o = Math.min(pulls[i + 2], w >= 1 ? Infinity : w / (1 - w));
    num += o * pulls[i + 1]; den += o;
  }
  return num / den;
}

/** One sample as the texture holds it (half float). */
const bucketKey = (bx: number, by: number) => (bx + 32768) * 65536 + (by + 32768);
const sampleKey = (i: number, j: number) => (i + 1048576) * 2097152 + (j + 1048576);

interface Circle { x: number; z: number; r: number; h: number; pond?: boolean }

/** The window's fade toward its edge (the same as the shader's). */
function edgeFade(x: number, z: number, cx: number, cz: number): number {
  const hw = N * RES * 0.5, e = Math.max(Math.abs(x - cx), Math.abs(z - cz));
  const t = Math.min(1, Math.max(0, (e - (hw - 60)) / 44));
  return 1 - t * t * (3 - 2 * t);
}

export class HeightSamples {
  readonly prepSource: 'none' | 'worker' | 'mismatch' | 'invalid' = 'none';
  protected half = new Uint16Array(N * N);
  protected data = new Float32Array(N * N);
  /** The window's centre, in samples (a multiple of STEP); null until first filled. */
  protected ci = 0;
  protected cj = 0;
  protected filled = false;
  private circles = new Map<number, Circle[]>();
  private pondBuckets = new Set<number>();
  /** The bucket whose ponds round it were last made sure of. */
  private pondsAt = [NaN, NaN];
  /** Samples worked out ahead of the window (prepare), by sample: follow takes them as it moves. */
  private ahead = new Map<number, number>();
  /** h before the slope limit, at samples round the window (a ring like the window's, each slot
   *  tagged with the sample it holds). */
  private srcV = new Float32Array(SM * SM);
  private srcI = new Int32Array(SM * SM).fill(-2147483648);
  private srcJ = new Int32Array(SM * SM);
  /** The steepest slope allowed (m per m), or none. */
  private limit = 0;
  /** The paths' segments, for levelling across them: per segment its start x, z, its run x, z, the
   *  run's length squared, the line's half-width, the line and the segment's index (SEG floats
   *  each), filed by the 24 m cell they reach into (their edge plus PATH_EDGE): one lookup a sample. */
  private segs = new Float64Array(0);
  private segGrid = new Map<number, number[]>();
  /** Each segment's ends' heights (the hills eased to the plateaus), made as they're first needed. */
  private segH = new Float64Array(0);
  private lnId = new Float64Array(16);
  private lnW = new Float64Array(16);
  private lnS = new Float64Array(16);
  private lnK = new Float64Array(16);
  /** The window position and heading the strip ahead was last finished for. */
  private prepared = "";

  /** How far a path levels the ground beyond its edge, and the plateaus' easing (metres): wider for taller hills. */
  private PATH_EDGE: number;
  private PLATEAU_FADE: number;

  readonly H: HillsTuning;

  constructor(private map: ForestMap, private forest: Forest, hills: HillsTuning, private codec: HalfCodec, prep?: HeightPrep) {
    // Broad enough that no slope rises past the camera's sightline (the shallowest pitch); taller
    // hills come broader, not steeper.
    const H = this.H = hills.maxSlope ? { ...hills, scale: Math.max(hills.scale, SLOPE_SCALE * hills.amplitude / hills.maxSlope) } : hills;
    // The slope limit: a little under the camera's shallowest pitch.
    this.limit = hills.maxSlope ? hills.maxSlope * 0.85 : 0;
    this.PATH_EDGE = Math.max(6, H.amplitude * 0.6);
    this.PLATEAU_FADE = Math.max(16, H.amplitude * 2);
    { const b = beachOf(map.bounds, map.tuning), B = map.tuning.beach; if (b && B) { const ease = Math.max(1, B.ease); let most = 0; for (const w of b.sand) most = Math.max(most, w); this.beach = { b, ease, hSand: B.sand, hSea: B.sea, inland: most + ease + 1 }; } }
    if (prep) {
      if (prep.seed !== map.seed || prep.hills !== JSON.stringify(hills)) this.prepSource = 'mismatch';
      else if (heightPrepProblem(prep)) this.prepSource = 'invalid';
      else { this.restore(prep); this.prepSource = 'worker'; return; }
    }
    // The plateaus: everything placed for gameplay or that must sit level.
    const m = map, T = m.tuning, df = m.dancefloor, th = m.treehouse;
    // Each plateau sits at the height already there (the hills, or a plateau it's inside).
    // A plateau overlapping one already placed joins it as one terrace, at its height.
    const placed: Circle[] = [];
    const add = (x: number, z: number, r: number) => {
      const near = placed.find(c => Math.hypot(c.x - x, c.z - z) < c.r + r);
      const c = { x, z, r, h: near ? near.h : this.plateaued(x, z, false) };
      placed.push(c); this.addCircle(c);
    };
    this.indexPaths();
    add(df.x, df.z, floorClearing(T) + 2);
    add(th.x, th.z, T.treehouse.clear + 2);
    for (const g of m.grounds) add(g.x, g.z, g.r + 2);
    for (const s of m.scenes ?? []) add(s.x, s.z, s.r + 2); // the scenes: each on its own terrace
    // The sleeping legends' circles (Ed, 2026-10-06: "the legend circle ought to be mostly flat"): each on its own terrace,
    // its floor, rim kit, legend and baby level, eased into the hills round it like the rest.
    for (const c of m.legendClearings ?? []) add(c.x, c.z, c.r + 2);
    for (const [cx, cy] of m.cells) {
      const s = m.soundsystemSpot(cx, cy);
      if (cx !== m.centreCell[0] || cy !== m.centreCell[1]) add(s.x, s.z, Math.max(T.soundsystemFootprint, T.runeMarkers?.stump?.on ? T.runeMarkers.stump.clear : 0) + 2); // (home's has none; a great stump's roots lie level)
      const p = m.setPieceSpot(cx, cy);
      if (p) add(p.x, p.z, T.setPieceFootprint * T.setPieceScale + 2);
    }
  }

  private raw(x: number, z: number): number {
    if (!this.H.on) return 0;
    const h = terrainAt(this.map, x, z, this.H), b = this.beach; // (the hills and the layout's rises and hollows, and the lakes' hollows)
    if (!b) return h;
    // The beach (rules/mapShape.ts beachOf): the hills eased down over `ease` metres to the sand's
    // height where it starts, the sand sloping gently to the sea's, flat beyond.
    if (b.b.land.roughDistAt(x, z) > b.inland + 8) return h; // (quickly: further from the water than the sand comes anywhere, and its ease)
    const d = b.b.land.distAt(x, z);
    const w = b.b.sandAt(x, z), into = w - d;
    if (into < -b.ease) return h;
    if (into < 0) return h + (b.hSand - h) * smoothstep((into + b.ease) / b.ease);
    return b.hSand + (b.hSea - b.hSand) * smoothstep(Math.min(1, into / Math.max(1, w + b.b.out)));
  }
  /** The beach's levels, on the circular map with it on. */
  private beach: { b: Beach; ease: number; hSand: number; hSea: number; /** further from the water than this (m), no beach */ inland: number } | null = null;

  private addCircle(c: Circle): void {
    const R = c.r + this.PLATEAU_FADE;
    for (let by = Math.floor((c.z - R) / BUCKET); by <= Math.floor((c.z + R) / BUCKET); by++)
      for (let bx = Math.floor((c.x - R) / BUCKET); bx <= Math.floor((c.x + R) / BUCKET); bx++) {
        const k = bucketKey(bx, by);
        let l = this.circles.get(k);
        if (!l) this.circles.set(k, (l = []));
        l.push(c);
      }
  }

  /** Ponds come from the forest's light sources, made as they're asked for: add a bucket's once. */
  private ponds(bx: number, by: number): void {
    const k = bucketKey(bx, by);
    if (this.pondBuckets.has(k)) return;
    this.pondBuckets.add(k);
    for (const l of this.forest.lightsNear((bx + 0.5) * BUCKET, (by + 0.5) * BUCKET, BUCKET * 0.75))
      if (l.kind === "pond" && Math.floor(l.x / BUCKET) === bx && Math.floor(l.z / BUCKET) === by) {
        // Its level: the lowest of its cluster's (every pond within 12 m of another, so close ponds
        // share one level, not the slope between them crammed into the gap), each from the hills
        // and the fixed plateaus only: never from what has been made so far, or the ground would
        // depend on the order it was visited in (it left a pond 12 m above the lake it touched).
        this.addCircle({ x: l.x, z: l.z, r: 3 * l.size + 1.5, h: this.pondLevel(l.x, l.z), pond: true });
      }
  }

  /** A pond's level: its cluster's lowest (found whole, so the same whichever pond asks first). */
  private pondLevels = new Map<string, number>();
  private pondLevel(x: number, z: number): number {
    const key = (p: { x: number; z: number }) => `${p.x},${p.z}`, had = this.pondLevels.get(key({ x, z }));
    if (had !== undefined) return had;
    const GAP = 12, r = (p: { size: number }) => 3 * p.size + 1.5;
    const first = this.forest.lightsNear(x, z, 8).find(p => p.kind === "pond" && p.x === x && p.z === z);
    if (!first) return this.plateaued(x, z, false);
    const cluster = [first], seen = new Set([key(first)]);
    for (let i = 0; i < cluster.length && cluster.length < 100; i++) {
      const p = cluster[i];
      for (const o of this.forest.lightsNear(p.x, p.z, r(p) + GAP + 20))
        if (o.kind === "pond" && !seen.has(key(o)) && Math.hypot(o.x - p.x, o.z - p.z) < r(p) + r(o) + GAP) { seen.add(key(o)); cluster.push(o); }
    }
    const h = Math.min(...cluster.map(p => this.plateaued(p.x, p.z, false)));
    for (const p of cluster) this.pondLevels.set(key(p), h);
    return h;
  }

  /** Scratch for plateaued's and sourceAt's pulls (weight, level, cap: reused, they ran per sample), grown as needed. */
  private platPulls: Float64Array = new Float64Array(48);
  private srcPulls: Float64Array = new Float64Array(48);
  private static pull(a: Float64Array, n: number, w: number, level: number, cap: number): Float64Array {
    if (n + 3 > a.length) { const b = new Float64Array(a.length * 2); b.set(a); a = b; }
    a[n] = w; a[n + 1] = level; a[n + 2] = cap;
    return a;
  }
  /** The hills eased to the plateaus (ponds' buckets added first; or, asked not to, the fixed plateaus alone). */
  private plateaued(x: number, z: number, ponds = true): number {
    let h = this.raw(x, z);
    const bx = Math.floor(x / BUCKET), by = Math.floor(z / BUCKET);
    const reach = Math.ceil((this.PLATEAU_FADE + 16) / BUCKET); // any pond whose plateau could reach here
    if (ponds && (bx !== this.pondsAt[0] || by !== this.pondsAt[1])) {
      for (let dy = -reach; dy <= reach; dy++) for (let dx = -reach; dx <= reach; dx++) this.ponds(bx + dx, by + dy);
      this.pondsAt[0] = bx; this.pondsAt[1] = by;
    }
    const cs = this.circles.get(bucketKey(bx, by));
    let n = 0;
    if (cs) for (let q = 0; q < cs.length; q++) {
      const c = cs[q];
      if (c.pond && !ponds) continue; // (a pond's own level: the fixed plateaus only)
      const dx = x - c.x, dz = z - c.z, d = Math.sqrt(dx * dx + dz * dz); // (not Math.hypot: its result is boxed, thousands of times a frame while the ley line routes)
      if (d < c.r + this.PLATEAU_FADE) { this.platPulls = HeightSamples.pull(this.platPulls, n, 1 - smoothstep((d - c.r) / this.PLATEAU_FADE), c.h, 1e6); n += 3; }
    }
    return blend(h, this.platPulls, n);
  }

  private indexPaths(): void {
    const lines = this.map.paths.lines, out: number[] = [];
    lines.forEach((l, li) => {
      // Chords of every 4th point (8 m; a curve's spline points are 2 m apart, and its chords keep
      // within half a metre of it): a quarter of the segments to look at, levelled the same.
      for (let i = 0; i < l.pts.length - 1; i += 4) {
        const [a, b] = [l.pts[i], l.pts[Math.min(i + 4, l.pts.length - 1)]], ex = b[0] - a[0], ez = b[1] - a[1], id = out.length / SEG, pad = l.half + this.PATH_EDGE;
        out.push(a[0], a[1], ex, ez, ex * ex + ez * ez || 1, l.half, li, i);
        for (let cz = Math.floor((Math.min(a[1], b[1]) - pad) / SEG_CELL); cz <= Math.floor((Math.max(a[1], b[1]) + pad) / SEG_CELL); cz++)
          for (let cx = Math.floor((Math.min(a[0], b[0]) - pad) / SEG_CELL); cx <= Math.floor((Math.max(a[0], b[0]) + pad) / SEG_CELL); cx++) {
            const k = bucketKey(cx, cz);
            let list = this.segGrid.get(k);
            if (!list) this.segGrid.set(k, (list = []));
            list.push(id);
          }
      }
    });
    this.segs = Float64Array.from(out);
    this.segH = new Float64Array((out.length / SEG) * 2).fill(NaN);
  }

  /** h before it is stored: the hills eased to the plateaus, then levelled across paths (to the
   *  height at the nearest point of the centreline), so a path is always level across. */
  sourceAt(x: number, z: number): number {
    if (!this.H.on) return 0;
    const h = this.plateaued(x, z);
    const list = this.segGrid.get(bucketKey(Math.floor(x / SEG_CELL), Math.floor(z / SEG_CELL)));
    if (!list) return h;
    // Every path near pulls to its centreline's height, all at once (order free: where two meet
    // the ground stays smooth). A path's level is the average along its nearby centreline, weighted
    // to the nearest stretch: a single nearest point jumps across a bend's inside (a cliff).
    const S = this.segs, LI = this.lnId, LW = this.lnW, LS = this.lnS, LK = this.lnK; // per line near: its pull, sum of weights × level, sum of weights
    let n = 0;
    for (let q = 0; q < list.length; q++) {
      const id = list[q], o = id * SEG, ax = S[o], az = S[o + 1], ex = S[o + 2], ez = S[o + 3], half = S[o + 5];
      const u = Math.min(1, Math.max(0, ((x - ax) * ex + (z - az) * ez) / S[o + 4])), qx = x - ax - ex * u, qz = z - az - ez * u, d = Math.sqrt(qx * qx + qz * qz);
      if (d > half + this.PATH_EDGE) continue;
      const line = S[o + 6], w = 1 - smoothstep((d - half) / this.PATH_EDGE), k = w * w * w * w + 1e-9;
      if (Number.isNaN(this.segH[id * 2])) { this.segH[id * 2] = this.plateaued(ax, az); this.segH[id * 2 + 1] = this.plateaued(ax + ex, az + ez); }
      const level = this.segH[id * 2] * (1 - u) + this.segH[id * 2 + 1] * u;
      let m = 0;
      while (m < n && LI[m] !== line) m++;
      if (m === n) { if (n === LI.length) continue; LI[m] = line; LW[m] = 0; LS[m] = 0; LK[m] = 0; n++; }
      LW[m] = Math.max(LW[m], w); LS[m] += k * level; LK[m] += k;
    }
    if (!n) return h;
    let p = 0; // (srcPulls, its own scratch: plateaued, above, fills platPulls)
    for (let m = 0; m < n; m++) { this.srcPulls = HeightSamples.pull(this.srcPulls, p, LW[m], LS[m] / LK[m], 1e3); p += 3; }
    // A plateau's level core still wins over a path's (eased back over PATH_EDGE at its edge).
    const cs = this.circles.get(bucketKey(Math.floor(x / BUCKET), Math.floor(z / BUCKET)));
    if (cs) for (let q = 0; q < cs.length; q++) {
      const c = cs[q], dx = x - c.x, dz = z - c.z, d = Math.sqrt(dx * dx + dz * dz);
      if (d < c.r + this.PATH_EDGE) { this.srcPulls = HeightSamples.pull(this.srcPulls, p, 1 - smoothstep((d - c.r) / this.PATH_EDGE), c.h, 1e6); p += 3; }
    }
    return blend(h, this.srcPulls, p);
  }

  /** h at sample (i, j) before the slope limit (kept). */
  private src(i: number, j: number): number {
    const s = ((j % SM) + SM) % SM * SM + ((i % SM) + SM) % SM;
    if (this.srcI[s] !== i || this.srcJ[s] !== j) { this.srcV[s] = this.sourceAt(i * RES, j * RES); this.srcI[s] = i; this.srcJ[s] = j; }
    return this.srcV[s];
  }

  /** The stored height at sample (i, j): h with its slopes limited (Ed, v297: "bumps are fine,
   *  it's cliffs that really show the fact that this is a shader and not true 3d"). The average
   *  of h cut down from above (the lowest of every neighbour's height plus the limit times its
   *  distance) and filled up from below (the highest, minus): each never steeper than the limit,
   *  so neither is their average; a cliff becomes a slope of the limit, half cut, half filled,
   *  and ground already gentler (the bumps) is left exactly as it was. From the samples alone, so
   *  the same however the window came to be where it is. */
  limited(i: number, j: number, ready = false): number {
    const h = this.src(i, j);
    if (!(this.limit > 0)) return h;
    const V = this.srcV, TI = this.srcI, TJ = this.srcJ, col = this.cols, L = this.limit; // (ready: the block's source samples were all made first, ensure)
    for (let k = 0; k <= 2 * RAD; k++) col[k] = (((i + k - RAD) % SM) + SM) % SM;
    let lo = h, hi = h;
    for (let dj = -RAD; dj <= RAD; dj++) {
      const row = ((((j + dj) % SM) + SM) % SM) * SM, D = DIST[dj + RAD];
      for (let di = -RAD; di <= RAD; di++) {
        const d = D[di + RAD];
        if (d === 0) continue;
        const at = row + col[di + RAD], ii = i + di, jj = j + dj;
        const v = ready || (TI[at] === ii && TJ[at] === jj) ? V[at] : this.src(ii, jj), e = L * d; // (made if not yet)
        if (v + e < lo) lo = v + e;
        if (v - e > hi) hi = v - e;
      }
    }
    return (lo + hi) / 2;
  }
  private cols = new Int32Array(2 * RAD + 1);

  /** Make sure every source sample a block of samples' limits read is there, once for the block
   *  (asking per sample re-checked 289 neighbours each: the window's move cost 60 to 85 ms headless). */
  private ensure(i0: number, i1: number, j0: number, j1: number): void {
    if (!(this.limit > 0)) return;
    for (let j = j0 - RAD; j < j1 + RAD; j++) for (let i = i0 - RAD; i < i1 + RAD; i++) this.src(i, j);
  }

  /** limited() for every sample of a block, handed to `put` (same values, much faster): each
   *  sample's 17 x 17 neighbourhood's lowest and highest source heights come from two sliding
   *  passes, and where they're closer than the limit allows between neighbours (gentle ground,
   *  nearly everywhere) the limit can't change the sample, so the 289-neighbour loop only runs on
   *  steep ground. */
  private limitedBlock(i0: number, i1: number, j0: number, j1: number, put: (i: number, j: number, v: number) => void): void {
    const w = i1 - i0, hgt = j1 - j0;
    if (w <= 0 || hgt <= 0) return;
    if (!(this.limit > 0)) { for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) put(i, j, this.src(i, j)); return; }
    this.ensure(i0, i1, j0, j1);
    const W = w + 2 * RAD, H = hgt + 2 * RAD, V = this.srcV, K = 2 * RAD + 1;
    const A = new Float64Array(W * H);
    for (let y = 0; y < H; y++) { const row = ((((j0 - RAD + y) % SM) + SM) % SM) * SM; for (let x = 0; x < W; x++) A[y * W + x] = V[row + ((((i0 - RAD + x) % SM) + SM) % SM)]; }
    // Along rows, then down columns: each sample's square neighbourhood's lowest and highest.
    const rmin = new Float64Array(H * w), rmax = new Float64Array(H * w);
    for (let y = 0; y < H; y++) for (let x = 0; x < w; x++) {
      let lo = Infinity, hi = -Infinity;
      for (let k = 0; k < K; k++) { const v = A[y * W + x + k]; if (v < lo) lo = v; if (v > hi) hi = v; }
      rmin[y * w + x] = lo; rmax[y * w + x] = hi;
    }
    const gentle = this.limit * RES * (1 - 1e-6); // the limit times the nearest neighbour's distance
    for (let y = 0; y < hgt; y++) for (let x = 0; x < w; x++) {
      let lo = Infinity, hi = -Infinity;
      for (let k = 0; k < K; k++) { const a = rmin[(y + k) * w + x], b = rmax[(y + k) * w + x]; if (a < lo) lo = a; if (b > hi) hi = b; }
      const i = i0 + x, j = j0 + y;
      put(i, j, hi - lo < gentle ? A[(y + RAD) * W + x + RAD] : this.limited(i, j, true));
    }
  }

  /** The blocks a window centred on (ci, cj) gains over one centred on (oci, ocj): a column strip
   *  and a row strip (or the whole window, when it jumped). */
  private gained(ci: number, cj: number, oci: number, ocj: number, had: boolean): [number, number, number, number][] {
    const h = N / 2, i0 = ci - h, j0 = cj - h, oi0 = oci - h, oj0 = ocj - h;
    if (!had || Math.abs(ci - oci) >= N || Math.abs(cj - ocj) >= N) return [[i0, i0 + N, j0, j0 + N]];
    const out: [number, number, number, number][] = [];
    if (ci > oci) out.push([oi0 + N, i0 + N, j0, j0 + N]); else if (ci < oci) out.push([i0, oi0, j0, j0 + N]);
    if (cj > ocj) out.push([i0, i0 + N, oj0 + N, j0 + N]); else if (cj < ocj) out.push([i0, i0 + N, j0, oj0]);
    return out;
  }

  private put(i: number, j: number, half = this.half, data = this.data): void {
    const k = sampleKey(i, j), pre = this.ahead.get(k);
    if (pre !== undefined) this.ahead.delete(k);
    const s = ((j % N) + N) % N * N + ((i % N) + N) % N, v = pre ?? this.limited(i, j, true);
    half[s] = this.codec.toHalfFloat(v);
    data[s] = this.codec.fromHalfFloat(this.codec.toHalfFloat(v));
  }

  /** Let go of its texture. The shaders' uniform and the field in use (useHeightSamples) are left as they are: the next island's
   *  field sets both as it's made, and this one may no longer be current. */

  /** Keep the window centred on (x, z): fill the samples it moves over. Returns whether it moved. */
  follow(x: number, z: number): boolean {
    const ci = Math.round(x / RES / STEP) * STEP, cj = Math.round(z / RES / STEP) * STEP;
    if (this.filled && ci === this.ci && cj === this.cj) return false;
    const h = N / 2, i0 = ci - h, j0 = cj - h, oi0 = this.ci - h, oj0 = this.cj - h;
    const was = (i: number, j: number) => this.filled && i >= oi0 && i < oi0 + N && j >= oj0 && j < oj0 + N;
    if (this.H.on) {
      // Samples worked out ahead (prepare) are taken as they are; the rest a block at a time.
      for (const [a, b, c, d] of this.gained(ci, cj, this.ci, this.cj, this.filled)) {
        const ahead = this.ahead;
        let missing = false;
        for (let j = c; j < d && !missing; j++) for (let i = a; i < b; i++) if (!ahead.has(sampleKey(i, j))) { missing = true; break; }
        if (missing) this.limitedBlock(a, b, c, d, (i, j, v) => { if (!was(i, j) && !ahead.has(sampleKey(i, j))) ahead.set(sampleKey(i, j), v); });
      }
      for (let j = j0; j < j0 + N; j++) for (let i = i0; i < i0 + N; i++) if (!was(i, j)) this.put(i, j);
    }
    this.ci = ci; this.cj = cj; this.filled = true;
    this.changed();
    return true;
  }

  /** Fill or relocate the window round (x, z), as follow makes it, in steps (render/slices.ts: View.build's ground): its samples
   *  worked out a few rows at a time (the same values a row or the whole window at once: limitedBlock), then stored a few rows
   *  at a time. Used before a sail's first draw too: its camera jumps from the bedroom to the sea. */
  *fillSteps(x: number, z: number): Generator<undefined, void> {
    if (!this.H.on) { this.follow(x, z); return; }
    const ci = Math.round(x / RES / STEP) * STEP, cj = Math.round(z / RES / STEP) * STEP, h = N / 2, i0 = ci - h, j0 = cj - h, CH = this.filled ? 2 : 8;
    if (this.filled && ci === this.ci && cj === this.cj) return;
    // The house can finish preparing between slices. Keep its current heights valid until the whole new window is ready.
    const half = this.filled ? new Uint16Array(N * N) : this.half, data = this.filled ? new Float32Array(N * N) : this.data;
    const ahead = (i: number, j: number, v: number) => { const k = sampleKey(i, j); if (!this.ahead.has(k)) this.ahead.set(k, v); };
    for (let j = j0; j < j0 + N; j += CH) { yield; this.limitedBlock(i0, i0 + N, j, Math.min(j + CH, j0 + N), ahead); }
    for (let j = j0; j < j0 + N; j += CH) { yield; for (let jj = j; jj < Math.min(j + CH, j0 + N); jj++) for (let i = i0; i < i0 + N; i++) this.put(i, jj, half, data); }
    if (half !== this.half) { this.half.set(half); this.data.set(data); }
    this.ci = ci; this.cj = cj; this.filled = true;
    this.changed();
  }

  /** Work out, within budgetMs, the samples the window will take in when it next moves on along
   *  (vx, vz): a strip STEP samples deep on each side it is heading for, so the move itself (one
   *  every 16 m, all at once) finds them ready instead of computing thousands in one frame (a
   *  stutter at boost). Returns whether that strip is all ready. */
  prepare(vx: number, vz: number, budgetMs: number): boolean {
    if (!this.H.on || !this.filled) return true;
    if (this.ahead.size > N * STEP * 6) this.ahead.clear(); // turned about too often: start afresh
    const di = Math.abs(vx) > 1 ? Math.sign(vx) * STEP : 0, dj = Math.abs(vz) > 1 ? Math.sign(vz) * STEP : 0;
    if (!di && !dj) return true;
    const plan = `${this.ci},${this.cj},${di},${dj}`;
    if (plan === this.prepared) return true;
    // A few rows (or columns) of the strip at a time, until this frame's budget is spent.
    const t0 = performance.now(), CH = 16, put = (i: number, j: number, v: number) => { const k = sampleKey(i, j); if (!this.ahead.has(k)) this.ahead.set(k, v); };
    for (const [a, b, c, d] of this.gained(this.ci + di, this.cj + dj, this.ci, this.cj, true)) {
      const tall = d - c >= b - a; // chunk along the strip's length
      for (let s0 = tall ? c : a; s0 < (tall ? d : b); s0 += CH) {
        const s1 = Math.min(s0 + CH, tall ? d : b), [ca, cb, cc, cd] = tall ? [a, b, s0, s1] : [s0, s1, c, d];
        if (this.ahead.has(sampleKey(ca, cc)) && this.ahead.has(sampleKey(cb - 1, cd - 1))) continue; // done already
        if (performance.now() - t0 > budgetMs) return false;
        this.limitedBlock(ca, cb, cc, cd, put);
      }
    }
    this.prepared = plan;
    return true;
  }

  /** The ground's height at (x, z), as the shaders read it. */
  heightAt(x: number, z: number): number {
    if (!this.H.on || !this.filled) return 0;
    const k = edgeFade(x, z, this.ci * RES, this.cj * RES);
    if (k <= 0) return 0;
    const fx = x / RES, fz = z / RES, i = Math.floor(fx), j = Math.floor(fz), tx = fx - i, tz = fz - j;
    // (the four corners by index, no closure a call: it's asked thousands of times a frame)
    const D = this.data, i0 = ((i % N) + N) % N, i1 = (((i + 1) % N) + N) % N, j0 = (((j % N) + N) % N) * N, j1 = ((((j + 1) % N) + N) % N) * N;
    const a00 = D[j0 + i0], a10 = D[j0 + i1], a01 = D[j1 + i0], a11 = D[j1 + i1];
    const top = a00 + (a10 - a00) * tx, bot = a01 + (a11 - a01) * tx;
    return (top + (bot - top) * tz) * k;
  }
  /** Main-thread texture adapter is notified only after a complete window update. */
  protected changed(): void {}

  snapshot(hills: HillsTuning): HeightPrep {
    const state: Record<string, unknown> = {};
    for (const key of HEIGHT_STATE_KEYS) state[key] = (this as unknown as Record<string, unknown>)[key];
    return { seed: this.map.seed, hills: JSON.stringify(hills), state };
  }

  private restore(prep: HeightPrep): void {
    // Never mutate a cached prep when this field rolls to another window.
    const state = structuredClone(prep.state);
    for (const key of HEIGHT_STATE_KEYS) (this as unknown as Record<string, unknown>)[key] = state[key];
  }
}

export function heightPrepProblem(value: unknown): string | null {
  const p = value as Partial<HeightPrep> | null, s = p?.state;
  if (!p || !Number.isFinite(p.seed) || typeof p.hills !== 'string' || !s || typeof s !== 'object') return 'height prep';
  const arrays = [['half', Uint16Array, N * N], ['data', Float32Array, N * N], ['srcV', Float32Array, SM * SM], ['srcI', Int32Array, SM * SM], ['srcJ', Int32Array, SM * SM]] as const;
  for (const [key, kind, length] of arrays) if (!(s[key] instanceof kind) || (s[key] as ArrayLike<number>).length !== length) return 'height ' + key;
  if (!Number.isInteger(s.ci) || !Number.isInteger(s.cj) || s.filled !== true || typeof s.prepared !== 'string') return 'height window';
  if (!(s.circles instanceof Map) || !(s.pondBuckets instanceof Set) || !(s.ahead instanceof Map) || !(s.segGrid instanceof Map) || !(s.pondLevels instanceof Map)) return 'height caches';
  if (!Array.isArray(s.pondsAt) || s.pondsAt.length !== 2 || !s.pondsAt.every(v => typeof v === 'number')) return 'height pond position';
  if (!(s.segs instanceof Float64Array) || s.segs.length % SEG || !(s.segH instanceof Float64Array) || s.segH.length !== s.segs.length / SEG * 2) return 'height segments';
  if (!(s.data as Float32Array).every(Number.isFinite) || !(s.srcV as Float32Array).every(Number.isFinite) || !s.segs.every(Number.isFinite) || !s.segH.every(v => Number.isFinite(v) || Number.isNaN(v))) return 'height sample values';
  if (!(s.half as Uint16Array).every(v => (v & 0x7c00) !== 0x7c00)) return 'height half values';
  for (const [k, circles] of s.circles) if (!Number.isFinite(k) || !Array.isArray(circles) || !circles.every(c => c && [c.x, c.z, c.r, c.h].every(Number.isFinite))) return 'height circles';
  const segmentCount = s.segs.length / SEG;
  for (const [k, ids] of s.segGrid) if (!Number.isFinite(k) || !Array.isArray(ids) || !ids.every(id => Number.isInteger(id) && id >= 0 && id < segmentCount)) return 'height segment grid';
  for (const [k, v] of s.ahead) if (!Number.isInteger(k) || !Number.isFinite(v)) return 'height ahead';
  for (const [k, v] of s.pondLevels) if (typeof k !== 'string' || !Number.isFinite(v)) return 'height pond levels';
  return null;
}

