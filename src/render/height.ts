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
import { gpuKind } from "./gpuLedger";
import type { ForestMap } from "../rules/map";
import type { Forest } from "../rules/forest";
import type { HillsTuning } from "../rules/terrain";

// The hills' noise and the layout's rises and hollows are the rules' (rules/terrain.ts: the trees grow by them too).
export { hillsAt, SLOPE_SCALE, type HillsTuning } from "../rules/terrain";

import { HeightSamples, knownHeightPrep, RES, N } from "../rules/heightSamples";
export { blend, RES, N } from "../rules/heightSamples";

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

/** HEIGHT_GLSL plus overBend(w) and groundSeen(w), whether the bent ground hides a world point: for vertex or fragment
 *  shaders (a fragment shader tests each of its pixels, so what floats over the horizon is cut off along it). */
export const GROUND_SEEN_GLSL = HEIGHT_GLSL + /* glsl */ `
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
// 1 if nothing of the bent, rolling ground stands between a (lifted, unbent) world point and the camera, 0 if it hides it:
// the bend's horizon, and the hills on the way, marched in 16 steps along the line of sight, both bent as drawn (Ed, 2026-10-06:
// "I shouldn't see anything on the ground that's obscured when it goes past the bend"). For what is drawn without a depth
// test, or past one (the ley line through the trees, its pixel heads), so it hides where the earth would hide it.
float groundSeen(vec3 w) {
  if (overBend(w) < 0.5) return 0.0;
  vec3 b = bendW(w);
  for (int i = 1; i < 16; i++) {
    vec3 q = mix(b, cameraPosition, float(i) / 16.0);
    if (bendW(vec3(q.x, groundH(q.xz), q.z)).y > q.y + 0.3) return 0.0;
  }
  return 1.0;
}
`;

/** GROUND_SEEN_GLSL plus clipOf(w): a world point bent and projected (vertex shaders only). */
export const HEIGHT_VERT_GLSL = GROUND_SEEN_GLSL + /* glsl */ `
vec4 clipOf(vec3 w) { return projectionMatrix * viewMatrix * vec4(bendW(w), 1.0); }
`;

/** Glowing points (rgba vertex colours, added on) given as height above the ground: motes, trails. */
export function groundPoints(size: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: `attribute vec4 color;\nvarying vec4 vCol;\nuniform float uSize;\n${HEIGHT_VERT_GLSL}\nvoid main() { vCol = color; gl_Position = clipOf(onGround(position)); gl_PointSize = uSize; }`,
    fragmentShader: "varying vec4 vCol;\nvoid main() { gl_FragColor = vCol; }", // added on: rgb times alpha, as a points material does
    uniforms: { ...HEIGHT_UNIFORMS, uSize: { value: size } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, // (uSize: its points' size, the picture's pixels, live)
  });
}

export class HeightField extends HeightSamples {
  readonly texture: THREE.DataTexture;
  constructor(map: ForestMap, forest: Forest, hills: HillsTuning) {
    const started = performance.now();
    super(map, forest, hills, THREE.DataUtils, knownHeightPrep(map));
    amplitude = this.H.on ? this.H.amplitude : 0;
    this.texture = new THREE.DataTexture(this.half, N, N, THREE.RedFormat, THREE.HalfFloatType);
    const t = gpuKind(this.texture, 'ground');
    t.magFilter = t.minFilter = THREE.LinearFilter; t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true;
    HEIGHT_UNIFORMS.uHeight.value = t;
    if (this.filled) this.changed();
    try { performance.mark('witch:height-prep-source', { detail: { seed: map.seed, status: this.prepSource, ms: performance.now() - started, filled: this.filled, ci: this.ci, cj: this.cj } }); } catch { /* no timeline */ }
  }
  protected override changed(): void {
    this.texture.needsUpdate = true;
    HEIGHT_UNIFORMS.uHeightWin.value.set(this.H.on ? RES : 0, N, this.ci * RES, this.cj * RES);
  }
  dispose(): void { this.texture.dispose(); }
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

const SEEN_STEPS = 16, seenQ = { x: 0, y: 0, z: 0 }, seenG = { x: 0, y: 0, z: 0 };
/** groundSeen's twin on the CPU (GROUND_SEEN_GLSL): whether nothing of the bent, rolling ground stands between a point `y` metres
 *  above the ground at (x, z) and `cam`: the bend's horizon (overBendAt), then the hills on the way, marched in SEEN_STEPS steps
 *  along the line of sight, both bent as drawn. For what is drawn without a depth test, so it hides where the earth would hide it
 *  (the ley line's dots, render/leash/rainbow.ts; Ed, 2026-10-29: "I can see it through the ground, under the horizon"). */
export function groundSeenAt(x: number, y: number, z: number, cam: { x: number; y: number; z: number }): boolean {
  const gy = y + groundHeight(x, z);
  if (!overBendAt(x, gy, z, cam)) return false;
  seenQ.x = x; seenQ.y = gy; seenQ.z = z; bendPoint(seenQ);
  const bx = seenQ.x, by = seenQ.y, bz = seenQ.z;
  for (let i = 1; i < SEEN_STEPS; i++) {
    const f = i / SEEN_STEPS, qx = bx + (cam.x - bx) * f, qy = by + (cam.y - by) * f, qz = bz + (cam.z - bz) * f;
    seenG.x = qx; seenG.y = groundHeight(qx, qz); seenG.z = qz; bendPoint(seenG);
    if (seenG.y > qy + 0.3) return false;
  }
  return true;
}

/** A point given as height above the ground, lifted onto it and bent (in place): where it is drawn. */
export function placed<V extends { x: number; y: number; z: number }>(v: V): V {
  v.y += groundHeight(v.x, v.z);
  return bendPoint(v);
}
