// The zoo's little gold fences (rules/zooMap.ts zooFence; Ed, 2026-10-26: "Zoo areas, apart from home, should have a little gold
// fence around them, that stop creatures passing"; "lakes get fences too"): round every island, found or not, an upright ribbon
// along its outline, standing on the rolling ground (render/height.ts groundH), drawn with a post-and-rail strip in the bold pixel
// style (three hue-shifted gold tones, a near-black outline, whole art pixels: the mock's, previews/ed/zoo-map/fence-close.png):
// a post with a ball finial every SECTION metres, two rails between, HEIGHT metres tall. Seen across, its face; seen along, its edge,
// as a fence would be. Lit as the paths are. One mesh for the whole zoo, made once.
import * as THREE from "three";
import type { ForestMap } from "../rules/map";
import { reachAt } from "../rules/zooMap";
import { ZOO_CONFIG } from "../rules/zoo";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";

/** Metres a section (post to post), and the fence's height (m). */
const SECTION = 2, HEIGHT = 0.9;
/** The strip, a section's art: px across and up (whole art pixels at about 0.25 m, so 8 x 4 at the ordinary pixel size). */
const SW = 8, SH = 5;

const VERT = /* glsl */ `
attribute vec2 base; // the ground point under this corner (x, z)
attribute vec2 st;   // along (in sections), up (0 at the foot, 1 at the top)
varying vec3 vWorld;
varying vec2 vSt;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = vec3(base.x, groundH(base) + position.y, base.y);
  vWorld = w;
  vSt = st;
  gl_Position = clipOf(w);
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uStrip;
varying vec3 vWorld;
varying vec2 vSt;
${LIGHT_GLSL}
void main() {
  vec4 c = texture2D(uStrip, vec2(fract(vSt.x), vSt.y));
  if (c.a < 0.5) discard;
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, 1.0);
  gl_FragColor = vec4(haze(glowPool(min(vec3(1.0), c.rgb * light * 1.35), vWorld), vWorld), sceneryFade(vWorld));
}
`;

/** A section's pixels, SW x SH, row 0 at the bottom: a post at the left with its ball finial on top, two rails across. */
export function fenceStrip(): Uint8Array {
  const O = [36, 22, 10], D = [139, 90, 22], M = [210, 155, 44], L = [255, 217, 119], H = [255, 242, 184];
  const px = new Uint8Array(SW * SH * 4), put = (x: number, y: number, c: number[]) => { if (x < 0 || x >= SW || y < 0 || y >= SH) return; const o = (y * SW + x) * 4; px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; px[o + 3] = 255; };
  // (the rails: at about a third and two thirds up, a lit top row, an outline under)
  for (const y of [1, 3]) for (let x = 0; x < SW; x++) { put(x, y, x % 4 === 2 ? L : M); }
  // (the post: dark on its shaded side, the finial a lit ball)
  for (let y = 0; y < SH - 1; y++) { put(0, y, L); put(1, y, D); }
  put(0, SH - 1, H); put(1, SH - 1, M);
  // (its outline where the rails meet the post)
  for (const y of [1, 3]) put(2, y, O);
  return px;
}

export class ZooFences {
  readonly mesh: THREE.Mesh;
  private texture: THREE.DataTexture;
  constructor(map: ForestMap) {
    const L = map.zoo?.layout;
    const pos: number[] = [], base: number[] = [], st: number[] = [], idx: number[] = [];
    for (const I of L?.islands ?? []) {
      // (round its outline in sections of about SECTION metres)
      let per = 0;
      for (let k = 0; k < 96; k++) { const a0 = -Math.PI + (k / 96) * Math.PI * 2, a1 = -Math.PI + ((k + 1) / 96) * Math.PI * 2, r0 = reachAt(I.reach, a0), r1 = reachAt(I.reach, a1); per += Math.hypot(Math.cos(a1) * r1 - Math.cos(a0) * r0, Math.sin(a1) * r1 - Math.sin(a0) * r0); }
      const n = Math.max(12, Math.round(per / SECTION));
      for (let k = 0; k < n; k++) {
        const a0 = -Math.PI + (k / n) * Math.PI * 2, a1 = -Math.PI + ((k + 1) / n) * Math.PI * 2, r0 = reachAt(I.reach, a0), r1 = reachAt(I.reach, a1);
        const x0 = I.x + Math.cos(a0) * r0, z0 = I.z + Math.sin(a0) * r0, x1 = I.x + Math.cos(a1) * r1, z1 = I.z + Math.sin(a1) * r1, v = pos.length / 3;
        for (const [x, z, s, y] of [[x0, z0, 0, 0], [x1, z1, 1, 0], [x1, z1, 1, 1], [x0, z0, 0, 1]]) { pos.push(0, y * HEIGHT, 0); base.push(x, z); st.push(s, y); }
        idx.push(v, v + 1, v + 2, v, v + 2, v + 3);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("base", new THREE.Float32BufferAttribute(base, 2));
    g.setAttribute("st", new THREE.Float32BufferAttribute(st, 2));
    g.setIndex(idx);
    // (no bounds of its own to cull by: its corners' places are in base, not position)
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(L?.home.x ?? 0, 0, L?.home.z ?? 0), (L?.reach ?? 0) + 200);
    const t = (this.texture = new THREE.DataTexture(fenceStrip(), SW, SH));
    t.magFilter = t.minFilter = THREE.NearestFilter; t.wrapS = THREE.RepeatWrapping; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true;
    this.mesh = new THREE.Mesh(g, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide, uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uStrip: { value: t } } }));
    this.mesh.name = "zooFences";
    this.mesh.frustumCulled = false;
  }
  dispose(): void { this.mesh.geometry.dispose(); (this.mesh.material as THREE.Material).dispose(); this.texture.dispose(); }
}

// The zoo's edge (Ed, 2026-10-26: "all around the flagstones give way to water, which falls off the disc as a waterfall, and behind
// that is space"): a skirt hanging from the lip (the ground's water ends there: render/ground.ts uZooStreet), streaks running
// down it, fading into space, as the sea chart's fall (render/chart/seaChart.ts FALL_FRAG) in the game's whole art pixels.
const FALL_VERT = /* glsl */ `
attribute vec2 base;
attribute vec2 st; // round (0-1), down (0 at the lip, 1 at the bottom)
varying vec3 vWorld;
varying vec2 vSt;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = vec3(base.x, groundH(base) + position.y, base.y);
  vWorld = w;
  vSt = st;
  gl_Position = clipOf(w);
}
`;
const FALL_FRAG = /* glsl */ `
uniform float uTime;
uniform float uCols;
varying vec3 vWorld;
varying vec2 vSt;
float h(float x) { return fract(sin(x * 91.7) * 4375.85); }
void main() {
  float col = floor(vSt.x * uCols), streak = h(col), y = floor(vSt.y * 60.0) / 60.0; // (whole pixels down it)
  float run = fract(y * 3.0 - uTime * (0.4 + streak * 0.5) + streak);
  float lit = smoothstep(0.55, 1.0, run) * (0.4 + 0.6 * streak);
  float fade = 1.0 - smoothstep(0.1, 1.0, y);
  vec3 c = mix(vec3(0.07, 0.12, 0.2), vec3(0.42, 0.56, 0.72), lit) * (0.5 + 0.5 * fade);
  gl_FragColor = vec4(c, fade * (0.6 + 0.4 * lit));
}
`;

export class ZooFall {
  readonly mesh: THREE.Mesh;
  constructor(map: ForestMap, lip: number, drop = 70) {
    const L = map.zoo?.layout, R = (L?.reach ?? 0) + (ZOO_CONFIG.margin ?? 120) + lip; // (the disc's coast, rules/map.ts, and the lip past it)
    const pos: number[] = [], base: number[] = [], st: number[] = [], idx: number[] = [], n = Math.max(64, Math.round((Math.PI * 2 * R) / 3));
    const cx = L?.home.x ?? 0, cz = L?.home.z ?? 0;
    for (let k = 0; k < n; k++) {
      const a0 = (k / n) * Math.PI * 2, a1 = ((k + 1) / n) * Math.PI * 2, v = pos.length / 3;
      for (const [a, s, y] of [[a0, k / n, 0], [a1, (k + 1) / n, 0], [a1, (k + 1) / n, 1], [a0, k / n, 1]]) { pos.push(0, -y * drop, 0); base.push(cx + Math.cos(a) * R, cz + Math.sin(a) * R); st.push(s, y); }
      idx.push(v, v + 1, v + 2, v, v + 2, v + 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("base", new THREE.Float32BufferAttribute(base, 2));
    g.setAttribute("st", new THREE.Float32BufferAttribute(st, 2));
    g.setIndex(idx);
    this.mesh = new THREE.Mesh(g, new THREE.ShaderMaterial({ vertexShader: FALL_VERT, fragmentShader: FALL_FRAG, transparent: true, depthWrite: false, side: THREE.DoubleSide, uniforms: { ...HEIGHT_UNIFORMS, uTime: LIGHT_UNIFORMS.uTime, uCols: { value: Math.round((Math.PI * 2 * R) / 1.2) } } }));
    this.mesh.name = "zooFall";
    this.mesh.frustumCulled = false;
  }
  dispose(): void { this.mesh.geometry.dispose(); (this.mesh.material as THREE.Material).dispose(); }
}
