// Mist at canopy height (Ed, 2026-10-07):
// - "In areas with few tall objects, or objects without canopies like standing stones or ravine, when flying over in treetop
//   mode the area looks very bare, and you can see too much of what's happening on the ground... have these areas have mist
//   clouds that act as their 'tall objects', like a canopy"; "The rocky area mist can also literally be the tall objects for
//   those areas". Each area type's canopy cover from above is measured (coverOf: its trees a square metre, from the forest,
//   times the crown they carry on average, from its art: stones and logs carry none). In those under mistCanopy.cover, a
//   clump of mist stands at canopy height on each of their big objects' places (the forest's own, as a crowned tree stands on
//   them in a wooded area), breathing slowly, and a thinner bank lies between them; on the ground the bank is low wisps.
// - "more mist patches scattered across the map, perhaps they move around with the wind, to make the forest generally
//   spookier and harder to parse in treetop view, and make the rocky areas stand out less": patches drifting over the whole
//   map at canopy height with the wind (the sway's: wind.speed), in the treetops only, so the ground view keeps clear.
// All of it parts round her and round the soundsystems under attack, as the canopy's hole does, and is drawn in the smooth
// effects layer over the low mist (post.ts), premultiplied, hidden behind whatever stands in front by the scene's depth.
import * as THREE from "three";
import { VALUE_NOISE_GLSL } from "./shaders";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import type { TypeArt } from "./assets";
import type { Plant } from "../rules/forest";

/** Looks the cover table holds (the area types and home), the places the mist parts round, and the most clumps drawn. */
export const MIST_LOOKS = 40, MIST_PARTS = 5, MIST_CLUMPS = 700;

export interface MistCanopyTuning {
  on: boolean;
  /** Canopy cover (0 to 1, the share of the ground crowns hide from above) under which an area gets mist; full at half of it. */
  cover: number;
  /** The open areas' bank between the clumps over the treetops (0 to 1), and on the ground (low wisps). */
  density: number; ground: number;
  /** Heights over the ground (m): on the ground, and over the treetops (eased as she rises). */
  low: number; high: number;
  /** How far round her, and round a soundsystem under attack, the mist parts (m). */
  part: number; partAction: number;
  /** The open areas' clumps: how thick (0 to 1) and how wide (m, across). */
  clumps: number; clumpSize: number;
  /** The drifting patches over the whole map: how much of the sky they cover (0 none to 1), how big (m), how fast they
   *  drift (times the wind's speed, m/s). */
  patches: number; patchSize: number; drift: number;
  /** How far round her the clumps are placed (m). */
  reach: number;
}

const VERT = /* glsl */ `
varying vec3 vWorld;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = onGround((modelMatrix * vec4(position, 1.0)).xyz);
  vWorld = w;
  gl_Position = clipOf(w);
}`;

/** Shared by both: the parting round her and the action, the depth test and the colour. */
const COMMON = /* glsl */ `
uniform sampler2D uDepth;
uniform vec2 uLow;
uniform vec4 uParts[${MIST_PARTS}];
float parted(vec2 p) {
  float k = 1.0;
  for (int i = 0; i < ${MIST_PARTS}; i++) { vec4 q = uParts[i]; if (q.z > 0.0) k *= smoothstep(q.z * 0.55, q.z, length(p - q.xy)); }
  return k;
}
vec4 mistOut(float a) {
  if (a <= 0.003) discard;
  if (gl_FragCoord.z > texture2D(uDepth, gl_FragCoord.xy / uLow).r) discard; // behind a tree
  vec3 col = mix(uHazeColour * 1.8, uMoon * 0.75 + uAmb * 0.9, 0.55);
  a = clamp(a, 0.0, 0.8);
  return vec4(col * a, a); // premultiplied
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uAreas;
uniform vec4 uExtent;
uniform float uCover[${MIST_LOOKS}];
uniform vec4 uMC; // open banks' density, lift (0 ground, 1 treetops), the patches' drift (m/s), ground density
uniform vec2 uPatch; // patches' cover, size (m)
varying vec3 vWorld;
${LIGHT_GLSL}
${VALUE_NOISE_GLSL}
${COMMON}
float coverAt(vec2 p) {
  vec2 uv = (p - uExtent.xy) / uExtent.zw;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 0.0;
  int look = int(floor(texture2D(uAreas, uv).r * 255.0 + 0.5));
  return look < ${MIST_LOOKS} ? uCover[look] : 0.0;
}
void main() {
  vec2 p = vWorld.xz;
  // The open area's share, softened over the areas' edges (the area texture is in half-metre steps).
  float m = (coverAt(p + vec2(7.0, 3.0)) + coverAt(p + vec2(-3.0, 7.0)) + coverAt(p + vec2(-7.0, -3.0)) + coverAt(p + vec2(3.0, -7.0))) * 0.25;
  vec2 drift = vec2(1.0, 0.4) * uMC.z * uTime;
  float n = vnoise((p + drift * 0.3) / 26.0) * 0.6 + vnoise((p - drift * 0.15) / 9.0) * 0.4;
  // Open areas: over the treetops a bank between the clumps; on the ground, wisps.
  float a = m * mix(smoothstep(0.42, 0.85, n) * uMC.w, smoothstep(0.3, 0.8, n) * uMC.x, uMC.y);
  // Patches over the whole map, drifting with the wind; the treetops only.
  if (uPatch.x > 0.0 && uMC.y > 0.0) {
    vec2 q = (p - drift) / uPatch.y;
    float pn = vnoise(q) * 0.7 + vnoise(q * 2.7 + 17.0) * 0.3;
    a = max(a, smoothstep(1.0 - uPatch.x, 1.0 - uPatch.x * 0.45, pn) * 0.5 * uMC.y);
  }
  gl_FragColor = mistOut(a * parted(p));
}`;

const CLUMP_VERT = /* glsl */ `
attribute vec4 aClump; // x, z, size (m), seed
uniform float uHigh;
varying vec3 vWorld;
varying vec3 vLocal; // the quad's place (-0.5 to 0.5), seed
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = onGround(vec3(aClump.x + position.x * aClump.z, uHigh, aClump.y + position.z * aClump.z));
  vWorld = w; vLocal = vec3(position.xz, aClump.w);
  gl_Position = clipOf(w);
}`;

const CLUMP_FRAG = /* glsl */ `
uniform vec2 uClump; // density, lift
varying vec3 vWorld;
varying vec3 vLocal;
${LIGHT_GLSL}
${VALUE_NOISE_GLSL}
${COMMON}
void main() {
  // A soft round clump, its edge lumpy, breathing slowly (each at its own pace).
  float r = length(vLocal.xy) * 2.0, lump = vnoise(vWorld.xz / 4.0 + vLocal.z * 31.0);
  float breathe = 0.85 + 0.15 * sin(uTime * (0.25 + 0.1 * vLocal.z) + vLocal.z * 6.283);
  float a = (1.0 - smoothstep(0.35 + 0.25 * lump, 1.0, r)) * breathe * uClump.x * uClump.y;
  gl_FragColor = mistOut(a * parted(vWorld.xz));
}`;

const PREMULTIPLIED = { blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor } as const;

export class MistCanopy {
  /** The banks and patches (a plane round the view) and the open areas' clumps. */
  readonly meshes: THREE.Mesh[];
  private plane: THREE.Mesh;
  private clumpMesh: THREE.Mesh;
  private clumpGeo: THREE.InstancedBufferGeometry;
  private mat: THREE.ShaderMaterial;
  private clumpMat: THREE.ShaderMaterial;
  private clumpAttr: THREE.InstancedBufferAttribute;
  private cover = new Float32Array(MIST_LOOKS);
  private parts = Array.from({ length: MIST_PARTS }, () => new THREE.Vector4());
  /** Which looks' cover has been measured. */
  private measured = new Uint8Array(MIST_LOOKS);
  /** Where the clumps were last placed round (x, z), and with which looks measured (a new one places them again). */
  private placedAt = { x: NaN, z: NaN, n: -1 };

  constructor(private T: MistCanopyTuning, areas: { value: THREE.Texture }, extent: { value: THREE.Vector4 }, depth: THREE.Texture | null, low: THREE.Vector2) {
    const shared = { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uDepth: { value: depth }, uLow: { value: low }, uParts: { value: this.parts } };
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...shared, uAreas: areas, uExtent: extent, uCover: { value: this.cover }, uMC: { value: new THREE.Vector4(T.density, 0, 0, T.ground) }, uPatch: { value: new THREE.Vector2(T.patches, T.patchSize) } },
      depthWrite: false, depthTest: false, transparent: true, ...PREMULTIPLIED,
    });
    this.plane = new THREE.Mesh(new THREE.PlaneGeometry(700, 700, 70, 70).rotateX(-Math.PI / 2), this.mat);
    this.plane.frustumCulled = false;
    this.plane.renderOrder = 3;
    this.clumpMat = new THREE.ShaderMaterial({
      vertexShader: CLUMP_VERT, fragmentShader: CLUMP_FRAG,
      uniforms: { ...shared, uHigh: { value: T.high }, uClump: { value: new THREE.Vector2(T.clumps, 0) } },
      depthWrite: false, depthTest: false, transparent: true, ...PREMULTIPLIED,
    });
    const base = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), geo = (this.clumpGeo = new THREE.InstancedBufferGeometry());
    geo.setIndex(base.getIndex()); geo.setAttribute("position", base.getAttribute("position"));
    this.clumpAttr = new THREE.InstancedBufferAttribute(new Float32Array(MIST_CLUMPS * 4), 4).setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("aClump", this.clumpAttr);
    geo.instanceCount = 0;
    this.clumpMesh = new THREE.Mesh(geo, this.clumpMat);
    this.clumpMesh.frustumCulled = false;
    this.clumpMesh.renderOrder = 4;
    this.meshes = [this.plane, this.clumpMesh];
  }

  /** Whether `look`'s cover still wants measuring. */
  needs(look: number): boolean { return look < MIST_LOOKS && !this.measured[look]; }

  /** An area look's measured canopy cover (0 to 1), or none (home: no mist over the dancefloor). */
  setCover(look: number, cover: number | null): void {
    if (look >= MIST_LOOKS) return;
    this.measured[look] = 1;
    this.cover[look] = cover === null ? 0 : mistShare(cover, this.T.cover);
  }

  /** How much mist a look gets (0 to 1). */
  share(look: number): number { return look < MIST_LOOKS ? this.cover[look] : 0; }

  /** Each frame: where the view looks (x, z), how far she's risen (0 to 1), the wind's speed (m/s), where the mist parts
   *  (round her and the soundsystems under attack), and the forest's big objects round her (asked for only when the clumps
   *  want placing again: she has moved a quarter of their reach, or another area's cover has come in). */
  update(x: number, z: number, lift: number, wind: number, her: { x: number; z: number }, action: readonly { x: number; z: number }[], bigNear: (x: number, z: number, r: number) => Plant[]): void {
    const T = this.T, u = this.mat.uniforms.uMC.value as THREE.Vector4;
    this.plane.position.set(x, T.low + (T.high - T.low) * lift, z - 150);
    u.y = lift; u.z = wind * T.drift;
    (this.clumpMat.uniforms.uClump.value as THREE.Vector2).y = lift;
    this.clumpMesh.visible = lift > 0.01 && T.clumps > 0;
    this.parts[0].set(her.x, her.z, T.part, 0);
    for (let i = 1; i < MIST_PARTS; i++) { const a = action[i - 1]; if (a) this.parts[i].set(a.x, a.z, T.partAction, 0); else this.parts[i].set(0, 0, 0, 0); }
    const n = this.measured.reduce((s, v) => s + v, 0), P = this.placedAt;
    if (this.clumpMesh.visible && (n !== P.n || Math.hypot(her.x - P.x, her.z - P.z) > T.reach * 0.25)) {
      P.x = her.x; P.z = her.z; P.n = n;
      this.place(bigNear(her.x, her.z, T.reach));
    }
  }

  /** A clump on each big object's place in an open area (the slots a crowned tree fills in a wooded one), as big as the
   *  area's want of cover. */
  private place(big: readonly Plant[]): void {
    const A = this.clumpAttr.array as Float32Array, T = this.T;
    let k = 0;
    for (let i = 0; i < big.length && k < MIST_CLUMPS; i++) {
      const p = big[i], s = this.share(p.type);
      if (s <= 0.01) continue;
      const h = clumpHash(p.x, p.z);
      A[k * 4] = p.x; A[k * 4 + 1] = p.z; A[k * 4 + 2] = T.clumpSize * (0.7 + 0.6 * h) * (0.5 + 0.5 * s); A[k * 4 + 3] = h;
      k++;
    }
    this.clumpGeo.instanceCount = k;
    this.clumpAttr.needsUpdate = true;
  }
}

/** The mist a cover gets (0 to 1): none at `threshold` and over, all at half of it and under. */
export function mistShare(cover: number, threshold: number): number {
  const t = Math.min(1, Math.max(0, (cover - threshold * 0.5) / Math.max(1e-3, threshold * 0.5)));
  return 1 - t * t * (3 - 2 * t);
}

const clumpHash = (x: number, z: number) => { const s = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453; return s - Math.floor(s); };

/** A type's canopy cover from above (0 to 1): its trees a square metre times the crown (m²) its trees carry on average
 *  (crownless big objects, stones and logs, carry none). trees: how many of its own stand in `area` m² of it sampled. */
export function coverOf(art: TypeArt, mpp: number, trees: number, area: number): number {
  const L = art.layout, f = art.atlas.frames;
  let w = 0, crown = 0;
  for (let i = 0; i < L.big.length; i++) {
    const b = L.big[i], k = L.bigWeight[i] ?? 0;
    w += k;
    if (b.top !== null) { const fr = f[b.top]; crown += k * fr.w * fr.h * mpp * mpp * 0.55; } // (a crown fills about half its box)
  }
  if (w <= 0) return 0;
  return area > 0 ? Math.min(1, (trees / area) * (crown / w)) : 0;
}
