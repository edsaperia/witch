// The rolling ground (Ed, 2026-10-04: "could the ground literally roll?"): one height function
// h(x, z), broad swells a few metres high over tens of metres, that the ground and everything
// standing on it rise by. Drawing only: the rules stay flat and never see it, so physics, the
// leash, waves and placement are unchanged.
//
// h is worked out here, in TypeScript, from the map: the hills' noise, levelled across every path
// (so a path follows the land along its length and stays level across) and eased to a plateau over
// the dancefloor's clearing and speakers, the treehouse, soundsystems, set pieces, the grounds and
// ponds. It is written into a half-float texture round the witch (wrapping round as she moves), and
// the shaders read h from that texture with linear filtering; heightAt reads the same quantised
// samples and filters them the same way, so what the CPU places and what the GPU draws agree.
//
// The world's bend (the "rolling log", treetop mode only) is here too: every vertex ahead of the
// camera's focus drops by curve x d^2, d its distance ahead along the camera's ground-forward axis,
// so the forest falls away toward the top of the screen and the sky shows over it.
import * as THREE from "three";
import type { ForestMap } from "../rules/map";
import type { Forest } from "../rules/forest";
import { floorClearing } from "../rules/speakers";
import { beachOf, type Beach } from "../rules/mapShape";
import { smoothstep, vnoise } from "../rules/random";

export interface HillsTuning { on: boolean; amplitude: number; scale: number; octaves: number; /** The steepest the ground may rise (tan of the camera's shallowest pitch): the hills are made at least broad enough for it (HeightField). */ maxSlope?: number }

/** How broad hills of amplitude A must be (scale, m) so that, with their levelling, ground rising
 *  away from the camera stays under its sightline to her (Ed, v289: "you never go behind a bump"):
 *  measured over the map (height.test.ts), the raw noise's steepest is about 2.6 A / scale, and the
 *  plateaus' and paths' ramps steepen it by about 1.65 times. */
export const SLOPE_SCALE = 4.3;

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

/** The hills' raw noise at (x, z): centred on 0, between -amplitude and +amplitude. */
export function hillsAt(x: number, z: number, seed: number, H: HillsTuning): number {
  let s = 0, a = 1, f = 1 / Math.max(1, H.scale), norm = 0;
  for (let o = 0; o < Math.max(1, H.octaves); o++) {
    s += (vnoise(x * f, z * f, seed + o * 101) - 0.5) * a;
    norm += a * 0.5; a *= 0.45; f *= 2.03;
  }
  return (s / norm) * H.amplitude;
}

/** h pulled toward several levels at once: `pulls` is flat (weight 0 to 1, level, the most odds
 *  it can have). Each pulls by its odds w / (1 - w), so one alone is a plain mix by w, a level
 *  core (w 1) always wins (where two cores meet, the one allowed more odds), and the result
 *  doesn't depend on their order (which was a cliff where two crossed). */
export function blend(h: number, pulls: number[]): number {
  let num = h, den = 1;
  for (let i = 0; i < pulls.length; i += 3) {
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
const quantise = (v: number) => THREE.DataUtils.fromHalfFloat(THREE.DataUtils.toHalfFloat(v));

interface Circle { x: number; z: number; r: number; h: number; pond?: boolean }

/** Shared by every material that stands things on the ground or bends the world. */
export const HEIGHT_UNIFORMS = {
  uHeight: { value: null as THREE.Texture | null },
  // metres a sample (0: no hills), samples across, the window's centre x, z
  uHeightWin: { value: new THREE.Vector4(0, N, 0, 0) },
  // the bend: curve (per metre), the camera's focus x, z; and its ground-forward axis
  uBend: { value: new THREE.Vector4(0, 0, 0, 0) },
  uBendFwd: { value: new THREE.Vector2(0, -1) },
};

/** GLSL: groundH(xz), the ground's height; onGround(p), a point given as height above the ground lifted onto it; bendW(w), a world point bent. */
export const HEIGHT_GLSL = /* glsl */ `
uniform sampler2D uHeight;
uniform vec4 uHeightWin, uBend;
uniform vec2 uBendFwd;
float groundH(vec2 p) {
  if (uHeightWin.x <= 0.0) return 0.0;
  float hw = uHeightWin.y * uHeightWin.x * 0.5;
  vec2 e = abs(p - uHeightWin.zw);
  float k = 1.0 - smoothstep(hw - 60.0, hw - 16.0, max(e.x, e.y));
  if (k <= 0.0) return 0.0;
  return texture2D(uHeight, (p / uHeightWin.x + 0.5) / uHeightWin.y).r * k;
}
vec3 onGround(vec3 p) { return vec3(p.x, p.y + groundH(p.xz), p.z); }
vec3 bendW(vec3 w) {
  if (uBend.x <= 0.0) return w;
  float d = max(0.0, dot(w.xz - uBend.yz, uBendFwd));
  return vec3(w.x, w.y - uBend.x * d * d, w.z);
}
`;

/** HEIGHT_GLSL plus clipOf(w): a world point bent and projected (vertex shaders only). */
export const HEIGHT_VERT_GLSL = HEIGHT_GLSL + /* glsl */ `
vec4 clipOf(vec3 w) { return projectionMatrix * viewMatrix * vec4(bendW(w), 1.0); }
// 1 if a (lifted, unbent) world point shows over the bent ground's horizon, 0 if the bend hides it
// (seenOverBend's twin): for what is drawn without a depth test, like lights glimmering through the
// canopy, so they don't show through the earth (Ed, v256).
float overBend(vec3 w) {
  if (uBend.x <= 0.0) return 1.0;
  float ahead = dot(w.xz - uBend.yz, uBendFwd);
  if (ahead <= 0.0) return 1.0;
  float D = max(1.0, -dot(cameraPosition.xz - uBend.yz, uBendFwd)), H = cameraPosition.y + uBend.w + 3.0; // (uBend.w: the hills' amplitude)
  float dh = -D + sqrt(D * D + H / uBend.x);
  if (ahead <= dh) return 1.0;
  float m = (H + uBend.x * dh * dh) / (dh + D);
  return (H - w.y + uBend.x * ahead * ahead) / (ahead + D) <= m + 0.02 ? 1.0 : 0.0;
}
`;

/** Glowing points (rgba vertex colours, added on) given as height above the ground: motes, trails. */
export function groundPoints(size: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: `attribute vec4 color;\nvarying vec4 vCol;\n${HEIGHT_VERT_GLSL}\nvoid main() { vCol = color; gl_Position = clipOf(onGround(position)); gl_PointSize = ${size.toFixed(1)}; }`,
    fragmentShader: "varying vec4 vCol;\nvoid main() { gl_FragColor = vCol; }", // added on: rgb times alpha, as a points material does
    uniforms: { ...HEIGHT_UNIFORMS }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
}

/** The window's fade toward its edge (the same as the shader's). */
function edgeFade(x: number, z: number, cx: number, cz: number): number {
  const hw = N * RES * 0.5, e = Math.max(Math.abs(x - cx), Math.abs(z - cz));
  const t = Math.min(1, Math.max(0, (e - (hw - 60)) / 44));
  return 1 - t * t * (3 - 2 * t);
}

export class HeightField {
  readonly texture: THREE.DataTexture;
  private half = new Uint16Array(N * N);
  private data = new Float32Array(N * N);
  /** The window's centre, in samples (a multiple of STEP); null until first filled. */
  private ci = 0;
  private cj = 0;
  private filled = false;
  private seed: number;
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

  constructor(private map: ForestMap, private forest: Forest, hills: HillsTuning) {
    // Broad enough that no slope rises past the camera's sightline (the shallowest pitch); taller
    // hills come broader, not steeper.
    const H = this.H = hills.maxSlope ? { ...hills, scale: Math.max(hills.scale, SLOPE_SCALE * hills.amplitude / hills.maxSlope) } : hills;
    // The slope limit: a little under the camera's shallowest pitch.
    this.limit = hills.maxSlope ? hills.maxSlope * 0.85 : 0;
    this.PATH_EDGE = Math.max(6, H.amplitude * 0.6);
    this.PLATEAU_FADE = Math.max(16, H.amplitude * 2);
    amplitude = H.on ? H.amplitude : 0;
    { const b = beachOf(map.bounds, map.tuning), B = map.tuning.beach; if (b && B) { const ease = Math.max(1, B.ease), clear = b.edgeMin - Math.max(...b.sand) - ease; this.beach = { b, ease, hSand: B.sand, hSea: B.sea, clear2: clear > 0 ? clear * clear : 0 }; } }
    this.seed = map.seed + 6113;
    this.texture = new THREE.DataTexture(this.half, N, N, THREE.RedFormat, THREE.HalfFloatType);
    const t = this.texture;
    t.magFilter = t.minFilter = THREE.LinearFilter; t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true;
    HEIGHT_UNIFORMS.uHeight.value = t;
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
      if (cx !== m.centreCell[0] || cy !== m.centreCell[1]) add(s.x, s.z, T.soundsystemFootprint + 2); // (home's has none)
      const p = m.setPieceSpot(cx, cy);
      if (p) add(p.x, p.z, T.setPieceFootprint * T.setPieceScale + 2);
    }
  }

  private raw(x: number, z: number): number {
    if (!this.H.on) return 0;
    const h = hillsAt(x, z, this.seed, this.H), b = this.beach;
    if (!b) return h;
    // The beach (rules/mapShape.ts beachOf): the hills eased down over `ease` metres to the sand's
    // height where it starts, the sand sloping gently to the sea's, flat beyond.
    const dx = x - b.b.x, dz = z - b.b.z;
    if (dx * dx + dz * dz < b.clear2) return h; // (quickly: nearer the middle than the sand comes anywhere, less the ease)
    const into = b.b.intoSand(x, z);
    if (into < -b.ease) return h;
    if (into < 0) return h + (b.hSand - h) * smoothstep((into + b.ease) / b.ease);
    return b.hSand + (b.hSea - b.hSand) * smoothstep(Math.min(1, into / Math.max(1, b.b.sandAt(Math.atan2(z - b.b.z, x - b.b.x)) + b.b.out)));
  }
  /** The beach's levels, on the circular map with it on. */
  private beach: { b: Beach; ease: number; hSand: number; hSea: number; clear2: number } | null = null;

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

  /** The hills eased to the plateaus (ponds' buckets added first; or, asked not to, the fixed plateaus alone). */
  private plateaued(x: number, z: number, ponds = true): number {
    let h = this.raw(x, z);
    const bx = Math.floor(x / BUCKET), by = Math.floor(z / BUCKET);
    const reach = Math.ceil((this.PLATEAU_FADE + 16) / BUCKET); // any pond whose plateau could reach here
    if (ponds && (bx !== this.pondsAt[0] || by !== this.pondsAt[1])) {
      for (let dy = -reach; dy <= reach; dy++) for (let dx = -reach; dx <= reach; dx++) this.ponds(bx + dx, by + dy);
      this.pondsAt[0] = bx; this.pondsAt[1] = by;
    }
    const pulls: number[] = [];
    for (const c of this.circles.get(bucketKey(bx, by)) ?? []) {
      if (c.pond && !ponds) continue; // (a pond's own level: the fixed plateaus only)
      const d = Math.hypot(x - c.x, z - c.z);
      if (d < c.r + this.PLATEAU_FADE) pulls.push(1 - smoothstep((d - c.r) / this.PLATEAU_FADE), c.h, 1e6);
    }
    return blend(h, pulls);
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
    for (const id of list) {
      const o = id * SEG, ax = S[o], az = S[o + 1], ex = S[o + 2], ez = S[o + 3], half = S[o + 5];
      const u = Math.min(1, Math.max(0, ((x - ax) * ex + (z - az) * ez) / S[o + 4])), d = Math.hypot(x - ax - ex * u, z - az - ez * u);
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
    const pulls: number[] = [];
    for (let m = 0; m < n; m++) pulls.push(LW[m], LS[m] / LK[m], 1e3);
    // A plateau's level core still wins over a path's (eased back over PATH_EDGE at its edge).
    for (const c of this.circles.get(bucketKey(Math.floor(x / BUCKET), Math.floor(z / BUCKET))) ?? []) {
      const d = Math.hypot(x - c.x, z - c.z);
      if (d < c.r + this.PATH_EDGE) pulls.push(1 - smoothstep((d - c.r) / this.PATH_EDGE), c.h, 1e6);
    }
    return blend(h, pulls);
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

  private put(i: number, j: number): void {
    const k = sampleKey(i, j), pre = this.ahead.get(k);
    if (pre !== undefined) this.ahead.delete(k);
    const s = ((j % N) + N) % N * N + ((i % N) + N) % N, v = pre ?? this.limited(i, j, true);
    this.half[s] = THREE.DataUtils.toHalfFloat(v);
    this.data[s] = quantise(v);
  }

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
    this.texture.needsUpdate = true;
    HEIGHT_UNIFORMS.uHeightWin.value.set(this.H.on ? RES : 0, N, ci * RES, cj * RES);
    return true;
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
    const at = (a: number, b: number) => this.data[((b % N) + N) % N * N + ((a % N) + N) % N];
    const top = at(i, j) + (at(i + 1, j) - at(i, j)) * tx, bot = at(i, j + 1) + (at(i + 1, j + 1) - at(i, j + 1)) * tx;
    return (top + (bot - top) * tz) * k;
  }
}

/** The hills' amplitude in use (metres), for the bend's horizon test. */
let amplitude = 0;

/** The field in use (one game, one field), for everything that stands a thing on the ground. */
let current: HeightField | null = null;
export function useHeightField(f: HeightField | null): void { current = f; }

/** The ground's height at (x, z): 0 with no hills. */
export function groundHeight(x: number, z: number): number { return current ? current.heightAt(x, z) : 0; }

/** A world point bent as the shaders bend it (in place). */
export function bendPoint<V extends { x: number; y: number; z: number }>(v: V): V {
  const B = HEIGHT_UNIFORMS.uBend.value, F = HEIGHT_UNIFORMS.uBendFwd.value;
  if (B.x <= 0) return v;
  const d = Math.max(0, (v.x - B.y) * F.x + (v.z - B.z) * F.y);
  v.y -= B.x * d * d;
  return v;
}

/** Whether something `ahead` metres ahead of the bend's focus, its top `top` metres up, shows over
 *  the horizon of ground bent by `k`, seen from `cam` (true without a bend, or before the horizon);
 *  past it, things count as hidden more than `beyond` metres on. */
export function seenOverBend(ahead: number, top: number, k: number, cam: { y: number; z: number }, beyond = Infinity): boolean {
  if (k <= 0 || ahead <= 0) return true;
  const B = HEIGHT_UNIFORMS.uBend.value, D = Math.max(1, cam.z - B.z), H = cam.y + amplitude + 3; // (from the lowest the hills go: a valley at the horizon hides less)
  const dh = -D + Math.sqrt(D * D + H / k); // where the camera's line of sight grazes the bent ground
  if (ahead <= dh) return true;
  if (ahead > dh + beyond) return false;
  const m = (H + k * dh * dh) / (dh + D); // the grazing line's drop per metre
  return (H - top + k * ahead * ahead) / (ahead + D) <= m + 0.02;
}

/** overBend's twin on the CPU (HEIGHT_VERT_GLSL): whether a world point (x, z), `y` metres up (absolute, the ground's height
 *  included, unbent), shows over the bent ground's horizon from `cam`. For what's drawn over the picture or without a depth
 *  test (the DOM overlays, the state marks), so nothing on the ground shows past the bend (Ed, 2026-10-06: "I shouldn't see
 *  anything on the ground that's obscured when it goes past the bend"). */
export function overBendAt(x: number, y: number, z: number, cam: { x: number; y: number; z: number }): boolean {
  const B = HEIGHT_UNIFORMS.uBend.value, F = HEIGHT_UNIFORMS.uBendFwd.value;
  if (B.x <= 0) return true;
  const ahead = (x - B.y) * F.x + (z - B.z) * F.y;
  if (ahead <= 0) return true;
  const D = Math.max(1, -((cam.x - B.y) * F.x + (cam.z - B.z) * F.y)), H = cam.y + B.w + 3;
  const dh = -D + Math.sqrt(D * D + H / B.x);
  if (ahead <= dh) return true;
  const m = (H + B.x * dh * dh) / (dh + D);
  return (H - y + B.x * ahead * ahead) / (ahead + D) <= m + 0.02;
}

/** Whether a point `y` metres above the ground at (x, z) shows over the bend from `cam` (overBendAt, on the rolling ground). */
export function shownOverBend(x: number, y: number, z: number, cam: { x: number; y: number; z: number }): boolean {
  return overBendAt(x, y + groundHeight(x, z), z, cam);
}

/** A point given as height above the ground, lifted onto it and bent (in place): where it is drawn. */
export function placed<V extends { x: number; y: number; z: number }>(v: V): V {
  v.y += groundHeight(v.x, v.z);
  return bendPoint(v);
}
