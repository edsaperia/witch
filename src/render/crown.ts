// The great oak's crown over the treehouse (rules/crown.ts places it; Ed, 2026-10-24, the mock previews/ed/treehouse-layout-v4/crown/):
// its leaves one instanced mesh of lobes (each an octagon facing the camera, alpha-cut: a ragged edge, and a thin lobe broken into
// sprays by a finer noise, the bark behind it), its bark one merged mesh of tubes. Both are given on the house's plan (x, z from the
// hub's centre, y over the floor) and laid into the world by one affine map (uMap*), so the same crown stands in the world outside
// (depth-tested with the forest, bent with it) and lies over the floors indoors in the house's own plane (render/houseRooms.ts, where
// the rooms' leaf roofs were: after the house, no depth, far to near), eased between the two as she lands or takes off.
//
// Indoors (Ed: "indoors, whole room opens up; these holes should match the irregular shape of the room") it clears over the room
// she's in, its floor's outline and its far wall, with a ragged soft edge 1 to 3.5 m out (faded as the forest's hole is, not dithered), or over her stretch of branch: a small
// distance field of that floor, made when she changes room. Everywhere, the forest's own hole round her (render/sprites.ts: her
// circle on the screen, uWitch and uOcc, its dithered way, uSeeDither) cuts it where it stands in front of her.
import * as THREE from "three";
import { crownBulbs, type Bulb, type Crown, type HouseOutline, type Knot } from "../rules/crown";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { SPRITE_UNIFORMS } from "./sprites";
import { clearMask, inPoly, maskKeys, MASK, polyDist } from "./crownMask";

/** The plan → world map: world = O + x Ex + y Ey + z Ez (y over the floor). */
export interface PlanMap { o: THREE.Vector3; ex: THREE.Vector3; ey: THREE.Vector3; ez: THREE.Vector3 }

/** The crown's noise: value noise, 64 cells across, tiling (its leaves' speckle, ragged edges, sprays, the bark's furrows). */
function noiseTexture(): THREE.DataTexture {
  const N = 64, v = new Float32Array(N * N), h = (i: number, j: number) => { const x = Math.sin(((i % N) + N) % N * 127.1 + (((j % N) + N) % N) * 311.7) * 43758.5453; return x - Math.floor(x); };
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) v[j * N + i] = h(i, j);
  const data = new Uint8Array(N * N * 4);
  for (let k = 0; k < N * N; k++) data[k * 4] = data[k * 4 + 1] = data[k * 4 + 2] = Math.round(v[k] * 255), data[k * 4 + 3] = 255;
  const t = new THREE.DataTexture(data, N, N, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearFilter; t.needsUpdate = true;
  return t;
}

const smooth01 = (t: number) => t * t * (3 - 2 * t);
/** How fast the oak fades away as she goes behind it and back as she comes out (1/s). */
const BEHIND_EASE = 4;

export const SHARED_GLSL = /* glsl */ `
uniform vec3 uMapO, uMapX, uMapY, uMapZ;
uniform float uBendOn;
vec3 mapPlan(vec3 p) { return uMapO + p.x * uMapX + p.y * uMapY + p.z * uMapZ; }
`;
export const CLEAR_GLSL = /* glsl */ `
uniform float uIndoor; // laid over the floors: no haze nor slowed time's grey (the floors' own colours aren't graded)
vec3 crownHaze(vec3 c, vec3 P) { return uIndoor > 0.5 ? c : haze(c, P); }
uniform sampler2D uClear, uClearB; // her room's (or branch's) floor, and the one she left (fading back in)
uniform vec4 uClearBox; // the mask's plan box: x0, z0, 1/width, 1/depth
uniform float uClearOn; // 1 indoors with a room (or branch) to clear
uniform vec2 uClearW; // how far each is cleared: the room she's in fading in, the one she left fading out (treehouse.house.crown.cutFade)
uniform vec4 uHerHole; // indoors, the hole round her (canopyCutout's, as outdoors): its middle where she's drawn, radius, edge (pixels)
uniform vec4 uCutShape; // the hole's edge, shared with the forest's: wobble, how far out the fade reaches, ragged, (spread)
uniform vec4 uWitch, uOcc;
uniform float uWitchDepth;
uniform float uBehind; // she's behind the oak, north of it (0 to 1, eased): what of it stands nearer than her fades away
uniform sampler2D uNoise; // a tiling value noise, 64 cells across (one lookup in place of four hashes: the crown is a lot of pixels)
float vnoise2(vec2 p) { return texture2D(uNoise, (p + 0.5) / 64.0).r; }
float bayer4(vec2 p) { vec2 q = mod(floor(p), 4.0); float i = q.x + q.y * 4.0;
  return (i == 0.0 ? 0.0 : i == 1.0 ? 8.0 : i == 2.0 ? 2.0 : i == 3.0 ? 10.0 : i == 4.0 ? 12.0 : i == 5.0 ? 4.0 : i == 6.0 ? 14.0 : i == 7.0 ? 6.0 : i == 8.0 ? 3.0 : i == 9.0 ? 11.0 : i == 10.0 ? 1.0 : i == 11.0 ? 9.0 : i == 12.0 ? 15.0 : i == 13.0 ? 7.0 : i == 14.0 ? 13.0 : 5.0) / 16.0 + 1.0 / 32.0; }
float screenDistC(vec2 a, vec2 b) { return length(clamp((a - b) / 256.0, -100.0, 100.0)) * 256.0; }
// How far a floor's mask clears this pixel (1 cleared, 0 not): its floor and its far wall, a ragged soft edge 1 to 3.5 m out, faded
// smoothly as the forest's hole is (Ed, 2026-10-26: "Room cutouts seem to be more dithered (pixellated) than in the forest": it
// was a 4 x 4 ordered dither across the band).
float inClear(sampler2D mask, vec2 floorP) {
  vec2 uv = (floorP - uClearBox.xy) * uClearBox.zw, uv2 = (floorP + vec2(0.0, 5.0) - uClearBox.xy) * uClearBox.zw;
  float d = 1e3;
  if (all(greaterThan(uv, vec2(0.0))) && all(lessThan(uv, vec2(1.0)))) d = texture2D(mask, uv).r * 16.0;
  if (all(greaterThan(uv2, vec2(0.0))) && all(lessThan(uv2, vec2(1.0)))) d = min(d, texture2D(mask, uv2).r * 16.0);
  float o = d - (1.0 + 1.6 * vnoise2(floorP * 0.5));
  return 1.0 - smoothstep(0.0, 2.5, o);
}
// How much of the crown stays here (0 cleared away, 1 whole): her room's (or branch's) floor as it fades in, the one she left as it
// fades back (vFloor: the floor's plan point under this pixel); indoors, the forest's hole round her where she's drawn, its soft
// edge as outdoors (render/sprites.ts); and the fade round her, where this stands in front of her (depth: its distance from the camera).
float clearKeep(vec2 floorP, float depth) {
  float keep = 1.0;
  if (uClearOn > 0.5) {
    if (uClearW.x > 0.0) keep *= 1.0 - uClearW.x * inClear(uClear, floorP);
    if (uClearW.y > 0.0) keep *= 1.0 - uClearW.y * inClear(uClearB, floorP);
  }
  if (uHerHole.z > 0.0) {
    vec2 off = gl_FragCoord.xy - uHerHole.xy;
    float ang = atan(off.y, off.x), rag = 0.5 * sin(ang * 3.0 + 1.3) + 0.3 * sin(ang * 5.0 + 4.1) + 0.2 * sin(ang * 7.0 + 2.2);
    float wob = (vnoise2(floorP * 0.4) - 0.5) * uHerHole.w * uCutShape.x, r = uHerHole.z * (1.0 + uCutShape.z * rag);
    keep *= smoothstep(r - uHerHole.w, r + uHerHole.w * uCutShape.y, screenDistC(gl_FragCoord.xy, uHerHole.xy) + wob);
  }
  // (Ed, 2026-10-26: "from the north of the oak, hide the crown and trunk of the treehouse as well, when you're behind them": the
  // camera looks north, so north of the oak it stands between the camera and her, its lobes filling the screen; everything of it
  // nearer than her goes, faded in and out as she comes and goes)
  if (uBehind > 0.0 && uIndoor < 0.5 && depth < uWitchDepth - 1.0) keep *= 1.0 - uBehind;
  if (uOcc.w > 0.0 && depth < uWitchDepth - 0.5) {
    float e = screenDistC(gl_FragCoord.xy, uWitch.xy) / max(max(uWitch.z, uWitch.w) * 1.2, 1.0);
    float occl = 1.0 - smoothstep(0.3, 1.0 + uOcc.y, e);
    if (bayer4(gl_FragCoord.xy) < occl) keep = 0.0;
  }
  return keep;
}
// Cleared away here? (the string lights: a bulb is there or not, dithered through a fade)
bool cleared(vec2 floorP, float depth) { return clearKeep(floorP, depth) <= bayer4(gl_FragCoord.xy + vec2(2.0, 1.0)); }
`;

const LOBE_VERT = /* glsl */ `
attribute vec2 corner;
attribute vec4 iLobe; // plan x, y over the floor, plan z, radius
attribute vec2 iData; // thin, seed
uniform vec3 uRight, uUp;
uniform float uLobeK; // the lobes' size: 1 outside, smaller laid over the floors
varying vec2 vUv;
varying vec2 vData;
varying vec3 vWorld;
varying vec2 vFloor;
varying float vDepth;
varying vec3 vLight; // the light on it (its lamps, the moon's fill, her glow), once a vertex: the pixels add only the moon's shading
uniform vec3 uBack;
${SHARED_GLSL}
${HEIGHT_VERT_GLSL}
${LIGHT_GLSL}
void main() {
  vec3 c = mapPlan(iLobe.xyz), p = c + (corner.x * uRight + corner.y * uUp) * iLobe.w * uLobeK;
  vLight = nightLight(normalize(uBack + uUp * 0.5 + (corner.x * uRight + corner.y * uUp) * 0.6), c + (corner.x * uRight + corner.y * uUp) * iLobe.w);
  vWorld = c + (corner.x * uRight + corner.y * uUp) * iLobe.w;
  vUv = corner; vData = iData;
  // the floor's plan point under this pixel (indoors: the house's plane, its right the plan's east and its up the plan's north)
  vec3 q = p - uMapO;
  vFloor = vec2(dot(q, uRight) / max(1e-4, dot(uMapX, uRight)), dot(q, uUp) / min(-1e-4, dot(uMapZ, uUp)));
  vec4 mv = viewMatrix * vec4(uBendOn > 0.5 ? bendW(p) : p, 1.0);
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

// The night's leaves (the mock's five tones, darkest a lobe's underside to its moonlit top) and its bark (furrow to lit ridge) and moss.
const LOBE_FRAG = /* glsl */ `
varying vec2 vUv;
varying vec2 vData;
varying vec3 vWorld;
varying vec2 vFloor;
varying float vDepth;
varying vec3 vLight;
uniform vec3 uBack, uRight, uUp;
${LIGHT_GLSL}
${CLEAR_GLSL}
vec3 leafTone(float t) {
  return t < 0.5 ? vec3(0.047, 0.086, 0.078) : t < 1.5 ? vec3(0.078, 0.141, 0.110) : t < 2.5 ? vec3(0.118, 0.204, 0.141) : t < 3.5 ? vec3(0.188, 0.298, 0.188) : vec3(0.329, 0.439, 0.282);
}
void main() {
  float s = vData.y, rr = length(vUv);
  // a ragged edge: the clump's outline broken by a coarse noise; a thin lobe broken into sprays by a finer one
  float rag = vnoise2(vUv * 3.2 + s) * 0.28 + vnoise2(vUv * 7.0 + s * 1.7) * 0.12;
  if (rr > 1.0 - rag) discard;
  if (vData.x > 0.0 && vnoise2(vUv * 6.5 + s * 3.1) + vnoise2(vUv * 13.0 - s) * 0.4 < vData.x * 1.5) discard;
  float keep = clearKeep(vFloor, vDepth);
  if (keep < 0.004) discard;
  // a billowing clump: a sphere's normal, lumped by its leaves, shaded by the moon on the light the vertices found
  vec2 u = vUv + (vec2(vnoise2(vUv * 5.0 + s * 0.3), vnoise2(vUv * 5.0 + s * 0.3 + 19.0)) - 0.5) * 0.45;
  vec3 N = normalize(u.x * uRight + u.y * uUp + uBack * sqrt(max(0.05, 1.0 - dot(u, u))));
  vec3 L = vLight * (0.55 + 0.6 * max(0.0, dot(N, uMoonDir)) + 0.25 * N.y);
  float y = dot(L, vec3(0.3, 0.55, 0.15)), speck = vnoise2(gl_FragCoord.xy * 0.45) * 0.6 + vnoise2(gl_FragCoord.xy * 0.9 + 7.0) * 0.4;
  float t = clamp(floor(y * 7.0 + (speck - 0.5) * 1.6), 0.0, 4.0);
  vec3 tint = L / max(y, 1e-3);
  vec3 c = leafTone(t) * mix(vec3(1.0), clamp(tint, 0.0, 2.0), 0.12) * (0.85 + 0.4 * min(1.0, y * 2.0));
  gl_FragColor = vec4(crownHaze(c, vWorld), keep);
}`;

const BARK_VERT = /* glsl */ `
attribute vec3 aNormal; // on the plan
attribute vec2 aBark; // metres along the limb, angle round it (0 to 1)
varying vec3 vWorld, vN;
varying vec2 vBark;
varying vec2 vFloor;
varying float vDepth;
varying vec3 vLight;
uniform vec3 uRight, uUp;
${SHARED_GLSL}
${HEIGHT_VERT_GLSL}
${LIGHT_GLSL}
void main() {
  vec3 p = mapPlan(position);
  vWorld = p; vBark = aBark;
  vN = normalize(aNormal.x * normalize(uMapX) + aNormal.y * normalize(uMapY) + aNormal.z * normalize(uMapZ));
  vLight = nightLight(vN, p); // (once a vertex)
  vec3 q = p - uMapO;
  vFloor = vec2(dot(q, uRight) / max(1e-4, dot(uMapX, uRight)), dot(q, uUp) / min(-1e-4, dot(uMapZ, uUp)));
  vec4 mv = viewMatrix * vec4(uBendOn > 0.5 ? bendW(p) : p, 1.0);
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const BARK_FRAG = /* glsl */ `
varying vec3 vWorld, vN;
varying vec2 vBark;
varying vec2 vFloor;
varying float vDepth;
varying vec3 vLight;
${LIGHT_GLSL}
${CLEAR_GLSL}
void main() {
  float keep = clearKeep(vFloor, vDepth);
  if (keep < 0.004) discard;
  vec3 N = normalize(vN);
  vec3 L = vLight;
  float y = dot(L, vec3(0.3, 0.55, 0.15));
  // furrows running along the limb, the ridges between them lit
  float fur = vnoise2(vec2(vBark.x * 0.7, vBark.y * 9.0)) * 0.7 + vnoise2(vec2(vBark.x * 2.1, vBark.y * 21.0)) * 0.3;
  float t = clamp(floor(y * 5.0 + (fur - 0.5) * 2.4), 0.0, 3.0);
  vec3 c = t < 0.5 ? vec3(0.094, 0.078, 0.078) : t < 1.5 ? vec3(0.157, 0.129, 0.118) : t < 2.5 ? vec3(0.227, 0.188, 0.165) : vec3(0.314, 0.267, 0.220);
  if (fur < 0.3) c = vec3(0.094, 0.078, 0.078);
  if (N.y > 0.35 && vnoise2(vBark * vec2(0.35, 4.0)) > 0.55) c = vnoise2(gl_FragCoord.xy * 0.7) < 0.5 ? vec3(0.133, 0.196, 0.118) : vec3(0.204, 0.282, 0.157); // moss on its top
  gl_FragColor = vec4(crownHaze(c * (0.85 + 0.3 * min(1.0, y * 2.0)), vWorld), keep);
}`;

/** The bark's tubes: a Catmull-Rom through each limb's knots, rings of `sides` round it about a third of its radius apart. */
function barkGeometry(c: Crown): THREE.BufferGeometry {
  const pos: number[] = [], nrm: number[] = [], bark: number[] = [], idx: number[] = [];
  for (const l of c.limbs) {
    const k: Knot[] = [l.knots[0], ...l.knots, l.knots[l.knots.length - 1]], sides = l.knots[0][3] > 2.5 ? 8 : l.knots[0][3] > 0.8 ? 6 : 4;
    const ring: { p: number[]; t: number[]; r: number; s: number }[] = [];
    let along = 0, prev: number[] | null = null;
    for (let i = 1; i < k.length - 2; i++) {
      const [p0, p1, p2, p3] = [k[i - 1], k[i], k[i + 1], k[i + 2]], L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]);
      const n = Math.max(2, Math.ceil(L / Math.max(1.6, Math.min(p1[3], p2[3]) * 2.2))); // (rings about a diameter apart: the bend between is gentle)
      for (let s = 0; s < n + (i === k.length - 3 ? 1 : 0); s++) {
        const t = s / n, t2 = t * t, t3 = t2 * t, q = [0, 1, 2, 3].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3));
        if (prev) along += Math.hypot(q[0] - prev[0], q[1] - prev[1], q[2] - prev[2]);
        ring.push({ p: q, t: [0, 0, 0], r: Math.max(0.15, q[3]), s: along }); prev = q;
      }
    }
    if (ring.length < 2) continue;
    for (let i = 0; i < ring.length; i++) { const a = ring[Math.max(0, i - 1)].p, b = ring[Math.min(ring.length - 1, i + 1)].p, L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) || 1; ring[i].t = [(b[0] - a[0]) / L, (b[1] - a[1]) / L, (b[2] - a[2]) / L]; }
    const base = pos.length / 3;
    for (const R of ring) {
      // a frame round the tangent: across it level, then up
      const T = R.t; let ax = [-T[2], 0, T[0]], al = Math.hypot(ax[0], ax[2]);
      if (al < 1e-3) { ax = [1, 0, 0]; al = 1; }
      ax = [ax[0] / al, 0, ax[2] / al];
      const up = [T[1] * ax[2] - T[2] * ax[1], T[2] * ax[0] - T[0] * ax[2], T[0] * ax[1] - T[1] * ax[0]];
      for (let j = 0; j < sides; j++) {
        const a = (j / sides) * Math.PI * 2, cs = Math.cos(a), sn = Math.sin(a), n = [ax[0] * cs + up[0] * sn, ax[1] * cs + up[1] * sn, ax[2] * cs + up[2] * sn];
        pos.push(R.p[0] + n[0] * R.r, R.p[1] + n[1] * R.r, R.p[2] + n[2] * R.r); nrm.push(n[0], n[1], n[2]); bark.push(R.s, j / sides);
      }
    }
    for (let i = 0; i < ring.length - 1; i++) for (let j = 0; j < sides; j++) {
      const a = base + i * sides + j, b = base + i * sides + ((j + 1) % sides), c2 = a + sides, d = b + sides;
      idx.push(a, c2, b, b, c2, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aNormal", new THREE.Float32BufferAttribute(nrm, 3));
  g.setAttribute("aBark", new THREE.Float32BufferAttribute(bark, 2));
  g.setIndex(idx);
  return g;
}

/** The lobes: an octagon each (fewer empty pixels than a square reach the shader), one instance a lobe, far (north) first so the
 *  floors' layer is drawn far to near indoors. */
function lobeGeometry(c: Crown): THREE.InstancedBufferGeometry {
  const g = new THREE.InstancedBufferGeometry(), cs: number[] = [0, 0], idx: number[] = [];
  for (let i = 0; i < 8; i++) { const a = ((i + 0.5) / 8) * Math.PI * 2, r = 1 / Math.cos(Math.PI / 8); cs.push(Math.cos(a) * r, Math.sin(a) * r); idx.push(0, i + 1, ((i + 1) % 8) + 1); }
  g.setAttribute("corner", new THREE.Float32BufferAttribute(cs, 2));
  g.setIndex(idx);
  const L = [...c.lobes].sort((a, b) => a.z - b.z || a.y - b.y), lobe = new Float32Array(L.length * 4), data = new Float32Array(L.length * 2);
  L.forEach((l, i) => { lobe.set([l.x, l.y, l.z, l.r], i * 4); data.set([l.thin, (l.seed % 997) * 0.37], i * 2); });
  g.setAttribute("iLobe", new THREE.InstancedBufferAttribute(lobe, 4));
  g.setAttribute("iData", new THREE.InstancedBufferAttribute(data, 2));
  g.instanceCount = L.length;
  return g;
}

export class CrownView {
  readonly meshes: THREE.Mesh[];
  readonly lobes: THREE.Mesh;
  readonly bark: THREE.Mesh;
  /** 0 outside (the world), 1 indoors (laid over the floors), eased between. */
  private k = 0;
  /** Drawn laid over the floors (indoors), with no depth, after the house. */
  get indoors(): boolean { return this.k > 0.5; }
  /** Its uniforms (the map, the clearing): shared with its string lights (render/strings.ts). */
  readonly uniforms: Record<string, THREE.IUniform>;
  /** Two floors' masks: the room (or branch) she's in, clearing as it fades in, and the one she left, filling back in as it fades
   *  out (Ed, 2026-10-26: "Room canopy cuts should fade in rather than be instant"); each its key and how far it's cleared. */
  private readonly masks = [0, 1].map(() => { const data = new Uint8Array(MASK * MASK), tex = new THREE.DataTexture(data, MASK, MASK, THREE.RedFormat, THREE.UnsignedByteType); tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter; tex.needsUpdate = true; return { data, tex, key: "", w: 0 }; });
  /** Each floor's clearing (render/crownMask.ts: its distance field), by its key, once drawn; and those asked of the art workers. */
  private readonly fields = new Map<string, Uint8Array>();
  private readonly fieldsAsked = new Set<string>();
  /** Asks the art workers for a floor's clearing (render/view.ts: Assets.oneOff, tracked); unset or refused, it's drawn here. */
  drawMask: ((key: string, box: readonly number[]) => Promise<Uint8Array>) | null = null;
  /** How far the hole round her is open indoors (0 to 1, by the same fade). */
  private herW = 0;
  private readonly back = new THREE.Vector3();
  /** The bulbs of its lights (rules/crown.ts crownBulbs), for render/strings.ts and the far landmark. */
  readonly bulbs: Bulb[];

  constructor(readonly crown: Crown, spacing: number, private readonly outline: HouseOutline) {
    const { cx, cz, rx, rz } = crown.dome;
    this.uniforms = {
      ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS,
      uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp, uWitch: SPRITE_UNIFORMS.uWitch, uWitchDepth: SPRITE_UNIFORMS.uWitchDepth, uOcc: SPRITE_UNIFORMS.uOcc, uCutShape: SPRITE_UNIFORMS.uCutShape,
      uMapO: { value: new THREE.Vector3() }, uMapX: { value: new THREE.Vector3(1, 0, 0) }, uMapY: { value: new THREE.Vector3(0, 1, 0) }, uMapZ: { value: new THREE.Vector3(0, 0, 1) },
      uBendOn: { value: 1 }, uIndoor: { value: 0 }, uLobeK: { value: 1 }, uBack: { value: this.back },
      uNoise: { value: noiseTexture() },
      uBehind: { value: 0 }, uClear: { value: this.masks[0].tex }, uClearB: { value: this.masks[1].tex }, uClearW: { value: new THREE.Vector2() }, uClearBox: { value: new THREE.Vector4(cx - rx, cz - rz, 1 / (2 * rx), 1 / (2 * rz)) }, uClearOn: { value: 0 },
      uHerHole: { value: new THREE.Vector4() },
    };
    const lobeMat = new THREE.ShaderMaterial({ vertexShader: LOBE_VERT, fragmentShader: LOBE_FRAG, uniforms: this.uniforms });
    const barkMat = new THREE.ShaderMaterial({ vertexShader: BARK_VERT, fragmentShader: BARK_FRAG, uniforms: this.uniforms });
    this.lobes = new THREE.Mesh(lobeGeometry(crown), lobeMat);
    this.bark = new THREE.Mesh(barkGeometry(crown), barkMat);
    for (const m of [this.lobes, this.bark]) { m.frustumCulled = false; m.name = "crown"; }
    this.meshes = [this.bark, this.lobes];
    this.bulbs = crownBulbs(crown, spacing);
  }

  /** How many triangles and lobes it draws (for ?perf and the report). */
  get stats() { return { lobes: (this.lobes.geometry as THREE.InstancedBufferGeometry).instanceCount, barkTris: (this.bark.geometry.index?.count ?? 0) / 3 }; }

  /** A frame: `world` the true map (the hub on the ground, the floor's height), `house` the floors' own (null when she isn't
   *  indoors), `here` her place on the plan indoors, `dt` her clock's step; `hole` the forest's hole round her as it would be
   *  outdoors, its middle where she's drawn (screen pixels: x, y, radius, edge), cut in the crown indoors; `fade` the seconds a
   *  room's cut (and that hole) takes to open or close (treehouse.house.crown.cutFade; 0 at once); `her` where she is in the world
   *  (for hiding the oak when she's behind it). */
  update(camera: THREE.Camera, world: PlanMap, house: PlanMap | null, here: { x: number; z: number } | null, dt: number, hole: { x: number; y: number; r: number; edge: number } | null = null, fade = 0, her: { x: number; y: number; z: number } | null = null): void {
    const want = house ? 1 : 0;
    this.k += (want - this.k) * (1 - Math.exp(-8 * Math.max(0, dt)));
    if (Math.abs(this.k - want) < 0.01 || dt <= 0) this.k = want;
    const k = this.k, h = house ?? world, U = this.uniforms;
    // indoors the crown is a layer a few metres over the floors (the mock's 5 m): its heights flattened, its lobes smaller
    const base = this.crown.dome.base, flat = 0.12, lift = 5 - base * flat;
    const mix = (a: THREE.Vector3, b: THREE.Vector3, out: THREE.Vector3) => out.copy(a).lerp(b, k);
    const hy = new THREE.Vector3().copy(h.ey).multiplyScalar(flat), ho = new THREE.Vector3().copy(h.o).addScaledVector(h.ey, lift);
    mix(world.o, ho, U.uMapO.value); mix(world.ex, h.ex, U.uMapX.value); mix(world.ey, hy, U.uMapY.value); mix(world.ez, h.ez, U.uMapZ.value);
    U.uBendOn.value = k > 0.5 ? 0 : 1; U.uIndoor.value = k > 0.5 ? 1 : 0; U.uLobeK.value = 1 - 0.35 * k;
    // behind the oak: north of its middle, with the oak on her line of sight from the camera; eased over about a quarter of a second
    const behind = k < 0.5 && her ? this.behindOak(camera.position, her, world) : 0;
    this.behind += (behind - this.behind) * (1 - Math.exp(-BEHIND_EASE * Math.max(0, dt)));
    if (Math.abs(this.behind - behind) < 0.01 || dt <= 0) this.behind = behind;
    U.uBehind.value = this.behind;
    camera.getWorldDirection(this.back).negate();
    const indoors = k > 0.5;
    // (indoors in three.js's transparent list, so after the house's floors and walls, which are drawn there with no depth: in the
    // opaque list it came first and the floors painted over it)
    for (const m of this.meshes) { const mt = m.material as THREE.ShaderMaterial; mt.depthTest = !indoors; mt.depthWrite = !indoors; mt.transparent = indoors; }
    this.bark.renderOrder = indoors ? 19.96 : 0.5; this.lobes.renderOrder = indoors ? 19.97 : 0.5;
    // her room's floor (its own outline), or the branch she's on, as a distance field, when she moves into another
    const O = this.outline, room = indoors && here ? O.rooms.find(r => !r.locked && inPoly(r.outline, here.x, here.z)) ?? null : null;
    let branch = null as HouseOutline["branches"][number] | null;
    if (indoors && here && !room) { let bd = Infinity; for (const b of O.branches) { const d = polyDist(b.pts, here.x, here.z) - b.w / 2; if (d < bd) { bd = d; branch = b; } } if (bd > 2) branch = null; }
    const key = room ? `room:${room.id}` : branch ? `branch:${branch.id}` : "";
    // (a floor she moves into takes the mask that's least cleared, unless it's one of the two already: back into the room she
    // just left, its cut opens again from where its fade had got to)
    const M = this.masks, step = fade > 0 ? Math.max(0, dt) / fade : 1;
    // (each floor's field asked of the art workers from the crown's first frame, kept as it comes: drawn here as she stepped into a
    // room, it held the frame 190 to 360 ms under the cloud's software renderer, Ed's playtest of v4515; one not in yet waits a frame
    // or two, its fade starting as it comes; with no workers, drawn here)
    const B = this.uniforms.uClearBox.value as THREE.Vector4, box = [B.x, B.y, B.z, B.w];
    if (this.drawMask) for (const k of maskKeys(O)) if (!this.fields.has(k) && !this.fieldsAsked.has(k)) {
      this.fieldsAsked.add(k);
      this.drawMask(k, box).then(f => { this.fields.set(k, f); }, () => { this.fieldsAsked.delete(k); this.drawMask = null; });
    }
    if (key && !this.fields.has(key) && !this.fieldsAsked.has(key)) { const f = clearMask(key, box, O); if (f) this.fields.set(key, f); }
    const field = key ? this.fields.get(key) : undefined;
    if (key && field && !M.some(m => m.key === key)) { const m = M[0].w <= M[1].w ? M[0] : M[1]; m.key = key; m.w = 0; m.data.set(field); m.tex.needsUpdate = true; }
    for (const m of M) { m.w = m.key && m.key === key ? Math.min(1, m.w + step) : Math.max(0, m.w - step); if (!m.w && m.key !== key) m.key = ""; }
    // (the room she's in is the shader's first mask, the other the second)
    const [a, b] = M[1].key === key && key ? [M[1], M[0]] : [M[0], M[1]];
    U.uClear.value = a.tex; U.uClearB.value = b.tex; (U.uClearW.value as THREE.Vector2).set(a.key ? a.w : 0, b.key ? b.w : 0);
    U.uClearOn.value = (a.key && a.w > 0) || (b.key && b.w > 0) ? 1 : 0;
    // the hole round her, as outdoors, where she's drawn: opening as she comes in, closing as she goes out
    this.herW = indoors && hole ? Math.min(1, this.herW + step) : Math.max(0, this.herW - step);
    const H = U.uHerHole.value as THREE.Vector4;
    if (hole && this.herW > 0) H.set(hole.x, hole.y, hole.r * smooth01(this.herW), Math.max(1, hole.edge)); else H.set(0, 0, 0, 1);
  }

  /** How far a floor's cut has opened (0 to 1), by its key (`room:<id>`, `branch:<id>`), and the hole round her: for the tests. */
  cutOf(key: string): number { return this.masks.find(m => m.key === key)?.w ?? 0; }
  get herHole(): number { return this.herW; }

  /** How much she's behind the oak (0 or 1): north of the crown's middle on its plan, and the line from the camera to her passing
   *  through the crown (its dome on the plan, from its lowest sagging lobes to its top). */
  behindOak(cam: THREE.Vector3, her: { x: number; y: number; z: number }, world: PlanMap): number {
    const d = this.crown.dome, o = world.o, toPlan = (x: number, y: number, z: number) => {
      const dx = x - o.x, dz = z - o.z, ex = world.ex, ez = world.ez;
      return [(dx * ex.x + dz * ex.z) / Math.max(1e-6, ex.x * ex.x + ex.z * ex.z), y - o.y, (dx * ez.x + dz * ez.z) / Math.max(1e-6, ez.x * ez.x + ez.z * ez.z)];
    };
    const h = toPlan(her.x, her.y, her.z), c = toPlan(cam.x, cam.y, cam.z);
    if (h[2] > d.cz) return 0; // (south of its middle: the crown is seen as it is from the south)
    for (let i = 1; i < 32; i++) {
      const u = i / 32, x = c[0] + (h[0] - c[0]) * u, y = c[1] + (h[1] - c[1]) * u, z = c[2] + (h[2] - c[2]) * u;
      if (((x - d.cx) / d.rx) ** 2 + ((z - d.cz) / d.rz) ** 2 < 1 && y < d.top && y > -this.crown.floor) return 1;
    }
    return 0;
  }
  /** Eased 0 to 1 as she goes behind the oak (uBehind). */
  private behind = 0;

  dispose(): void {
    for (const m of this.meshes) { m.geometry.dispose(); (m.material as THREE.Material).dispose(); }
    for (const m of this.masks) m.tex.dispose(); (this.uniforms.uNoise.value as THREE.Texture).dispose();
  }
}
