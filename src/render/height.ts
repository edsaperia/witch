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
import { smoothstep, vnoise } from "../rules/random";

export interface HillsTuning { on: boolean; amplitude: number; scale: number; octaves: number }

/** Metres a sample; samples across the window; the window moves in steps of this many samples. */
export const RES = 2;
export const N = 400;
const STEP = 8;
/** How far beyond its edge a path levels the ground, and the plateaus' easing (metres). */
const PATH_EDGE = 6;
const PLATEAU_FADE = 16;
const BUCKET = 64;

/** The hills' raw noise at (x, z): centred on 0, between -amplitude and +amplitude. */
export function hillsAt(x: number, z: number, seed: number, H: HillsTuning): number {
  let s = 0, a = 1, f = 1 / Math.max(1, H.scale), norm = 0;
  for (let o = 0; o < Math.max(1, H.octaves); o++) {
    s += (vnoise(x * f, z * f, seed + o * 101) - 0.5) * a;
    norm += a * 0.5; a *= 0.45; f *= 2.03;
  }
  return (s / norm) * H.amplitude;
}

/** One sample as the texture holds it (half float). */
const bucketKey = (bx: number, by: number) => (bx + 32768) * 65536 + (by + 32768);
const sampleKey = (i: number, j: number) => (i + 1048576) * 2097152 + (j + 1048576);
const quantise = (v: number) => THREE.DataUtils.fromHalfFloat(THREE.DataUtils.toHalfFloat(v));

interface Circle { x: number; z: number; r: number; h: number }

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
  float D = max(1.0, -dot(cameraPosition.xz - uBend.yz, uBendFwd)), H = cameraPosition.y + 3.0;
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
  /** Samples worked out ahead of the window (prepare), by sample: follow takes them as it moves. */
  private ahead = new Map<number, number>();
  /** The window position and heading the strip ahead was last finished for. */
  private prepared = "";

  constructor(private map: ForestMap, private forest: Forest, readonly H: HillsTuning) {
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
    add(df.x, df.z, floorClearing(T) + 2);
    add(th.x, th.z, T.treehouse.clear + 2);
    for (const g of m.grounds) add(g.x, g.z, g.r + 2);
    for (const s of m.scenes ?? []) add(s.x, s.z, s.r + 2); // the scenes: each on its own terrace
    for (let cy = 0; cy < m.n; cy++) for (let cx = 0; cx < m.n; cx++) {
      const s = m.soundsystemSpot(cx, cy);
      if (cx !== m.centreCell[0] || cy !== m.centreCell[1]) add(s.x, s.z, T.soundsystemFootprint + 2); // (home's has none)
      const p = m.setPieceSpot(cx, cy);
      if (p) add(p.x, p.z, T.setPieceFootprint * T.setPieceScale + 2);
    }
  }

  private raw(x: number, z: number): number { return this.H.on ? hillsAt(x, z, this.seed, this.H) : 0; }

  private addCircle(c: Circle): void {
    const R = c.r + PLATEAU_FADE;
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
      if (l.kind === "pond" && Math.floor(l.x / BUCKET) === bx && Math.floor(l.z / BUCKET) === by) this.addCircle({ x: l.x, z: l.z, r: 3 * l.size + 1.5, h: this.plateaued(l.x, l.z, false) });
  }

  /** The hills eased to the plateaus (ponds' buckets added first, unless asked not to). */
  private plateaued(x: number, z: number, ponds = true): number {
    let h = this.raw(x, z);
    const bx = Math.floor(x / BUCKET), by = Math.floor(z / BUCKET);
    if (ponds) for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) this.ponds(bx + dx, by + dy);
    for (const c of this.circles.get(bucketKey(bx, by)) ?? []) {
      const d = Math.hypot(x - c.x, z - c.z);
      if (d < c.r + PLATEAU_FADE) h += (c.h - h) * (1 - smoothstep((d - c.r) / PLATEAU_FADE));
    }
    return h;
  }

  /** h before it is stored: the hills eased to the plateaus, then levelled across paths (to the
   *  height at the nearest point of the centreline), so a path is always level across. */
  sourceAt(x: number, z: number): number {
    if (!this.H.on) return 0;
    let h = this.plateaued(x, z);
    const P = this.map.paths, hit = P.at(x, z, PATH_EDGE);
    if (hit) {
      const l = P.lines[hit.line], a = l.pts[hit.seg], b = l.pts[hit.seg + 1];
      const ex = b[0] - a[0], ez = b[1] - a[1], u = Math.min(1, Math.max(0, ((x - a[0]) * ex + (z - a[1]) * ez) / (ex * ex + ez * ez || 1)));
      h += (this.plateaued(a[0] + ex * u, a[1] + ez * u) - h) * (1 - smoothstep((hit.d - l.half) / PATH_EDGE));
      // A plateau's level core still wins over a path's easing (eased back over PATH_EDGE at its edge).
      for (const c of this.circles.get(bucketKey(Math.floor(x / BUCKET), Math.floor(z / BUCKET))) ?? []) {
        const d = Math.hypot(x - c.x, z - c.z);
        if (d < c.r + PATH_EDGE) h += (c.h - h) * (1 - smoothstep((d - c.r) / PATH_EDGE));
      }
    }
    return h;
  }

  private put(i: number, j: number): void {
    const k = sampleKey(i, j), pre = this.ahead.get(k);
    if (pre !== undefined) this.ahead.delete(k);
    const s = ((j % N) + N) % N * N + ((i % N) + N) % N, v = pre ?? this.sourceAt(i * RES, j * RES);
    this.half[s] = THREE.DataUtils.toHalfFloat(v);
    this.data[s] = quantise(v);
  }

  /** Keep the window centred on (x, z): fill the samples it moves over. Returns whether it moved. */
  follow(x: number, z: number): boolean {
    const ci = Math.round(x / RES / STEP) * STEP, cj = Math.round(z / RES / STEP) * STEP;
    if (this.filled && ci === this.ci && cj === this.cj) return false;
    const h = N / 2, i0 = ci - h, j0 = cj - h, oi0 = this.ci - h, oj0 = this.cj - h;
    const was = (i: number, j: number) => this.filled && i >= oi0 && i < oi0 + N && j >= oj0 && j < oj0 + N;
    if (this.H.on) for (let j = j0; j < j0 + N; j++) for (let i = i0; i < i0 + N; i++) if (!was(i, j)) this.put(i, j);
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
    const h = N / 2, i0 = this.ci - h, j0 = this.cj - h, ni0 = i0 + di, nj0 = j0 + dj, t0 = performance.now();
    for (let j = nj0; j < nj0 + N; j++) {
      const rowNew = j < j0 || j >= j0 + N;
      for (let i = ni0; i < ni0 + N; i++) {
        if (!rowNew && i >= i0 && i < i0 + N) { i = i0 + N - 1; continue; } // inside the window now: skip to its far side
        const k = sampleKey(i, j);
        if (this.ahead.has(k)) continue;
        if (performance.now() - t0 > budgetMs) return false;
        this.ahead.set(k, this.sourceAt(i * RES, j * RES));
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
  const B = HEIGHT_UNIFORMS.uBend.value, D = Math.max(1, cam.z - B.z), H = cam.y + 3; // (+3: the hills' rises)
  const dh = -D + Math.sqrt(D * D + H / k); // where the camera's line of sight grazes the bent ground
  if (ahead <= dh) return true;
  if (ahead > dh + beyond) return false;
  const m = (H + k * dh * dh) / (dh + D); // the grazing line's drop per metre
  return (H - top + k * ahead * ahead) / (ahead + D) <= m + 0.02;
}

/** A point given as height above the ground, lifted onto it and bent (in place): where it is drawn. */
export function placed<V extends { x: number; y: number; z: number }>(v: V): V {
  v.y += groundHeight(v.x, v.z);
  return bendPoint(v);
}
