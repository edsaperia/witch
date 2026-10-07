// The front of the ley line (Ed, 2026-10-06: "Please come up with a better design for the front of the leyline"; it was a long
// smooth over-exposed wedge, cut off hard across the line's wide glow). Objects are pixels, light can be smooth:
// - the head: a small pixel-art spark, a 7-art-pixel diamond turning to a star on the beat, a white core in the line's colour,
//   tinted toward the colour of the area it's heading for; never smaller than 7 pixels on screen, so from the treetops it's a
//   clear bright point at the end of the line;
// - embers: single art pixels kicked off the head as it writes the line, falling and fading behind it; a burst of them, and a
//   pop of its light, as it reaches a stone;
// - its light: a soft round glow on the ground a few metres across, in the line's colour, kept dim enough that the bloom never
//   blows it to white.
// The line itself writes on behind it pixel by pixel (render/leylines.ts).
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { PIXEL_SNAP_GLSL } from "./shaders";

/** Art pixels across the head. */
export const HEAD_PX = 7;
/** At most this many embers in the air at once. */
const EMBERS = 64;
/** The head's height over the ground (m), and its light's radius (m) and strength (kept under the bloom's threshold). */
const HEAD_Y = 1.4, GLOW_R = 3.5, GLOW_I = 0.3;

const VERT = /* glsl */ `
attribute vec4 aCol;  // rgb, alpha
attribute vec2 aKind; // x: 0 the head, 1 an ember; y: art pixels across
uniform vec2 uRes;
uniform float uMpp;
varying vec4 vCol;
varying float vKind, vN, vCell;
${HEIGHT_VERT_GLSL}${PIXEL_SNAP_GLSL}
void main() {
  vec3 p = onGround(position);
  vCol = aCol; vKind = aKind.x; vN = aKind.y;
  // Never through a hill or the bent horizon (it's drawn over the trees, so it can be found from anywhere).
  if (groundSeen(p) < 0.5) vCol.a = 0.0;
  // Its art pixels as big as the sprites' here (whole screen pixels, at least one).
  vec4 c0 = clipOf(p);
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec4 c1 = clipOf(p + right * uMpp);
  float ppa = length((c1.xy / c1.w - c0.xy / c0.w) * 0.5 * uRes);
  vCell = max(2.0, floor(ppa + 0.5)); // (at least two screen pixels an art pixel: a clear point from the treetops)
  gl_PointSize = vN * vCell;
  gl_Position = c0;
  gl_Position.xy += pixelSnap(c0) * c0.w; // on the pixel grid
  if (mod(gl_PointSize, 2.0) < 0.5) gl_Position.xy += c0.w / uRes; // (an even size centred on a pixel's corner)
}`;

const FRAG = /* glsl */ `
uniform float uBeat, uPop;
varying vec4 vCol;
varying float vKind, vN, vCell;
void main() {
  if (vCol.a <= 0.0) discard;
  if (vKind > 0.5) { gl_FragColor = vCol; return; } // an ember: one art pixel
  vec2 q = floor(gl_PointCoord * vN) - (vN - 1.0) * 0.5; // its art pixel, from its middle
  float r = (vN - 1.0) * 0.5, m = abs(q.x) + abs(q.y), k = max(abs(q.x), abs(q.y));
  // On the beat a star (its rays out to the edge), between beats a diamond; brighter on the beat.
  float b = fract(uBeat), on = b < 0.5 ? 1.0 : 0.0;
  bool inside = on > 0.5 ? ((min(abs(q.x), abs(q.y)) < 0.5 && k <= r) || m <= r - 1.0) : m <= r;
  if (!inside) discard;
  vec3 c = m <= 0.5 ? vec3(1.0) : m <= 1.5 ? mix(vCol.rgb, vec3(1.0), 0.6) : vCol.rgb;
  float lit = 0.82 + 0.18 * (1.0 - b) + 0.2 * uPop;
  gl_FragColor = vec4(min(vec3(1.0), c * lit), 1.0);
}`;

const GLOW_VERT = /* glsl */ `
varying vec2 vLocal;
${HEIGHT_VERT_GLSL}
void main() { vLocal = position.xz * 2.0; gl_Position = clipOf(onGround((modelMatrix * vec4(position, 1.0)).xyz)); }`;
const GLOW_FRAG = /* glsl */ `
uniform vec3 uColour;
uniform float uStrength;
varying vec2 vLocal;
void main() {
  float r = length(vLocal);
  if (r > 1.0) discard;
  float a = (1.0 - r) * (1.0 - r) * uStrength;
  gl_FragColor = vec4(uColour * a, 1.0);
}`;

/** Where the front is this frame: on the ground at (x, z), its colour, and how many stones it has passed (links drawn). */
export interface LeyTip { x: number; z: number; colour: THREE.Vector3; links: number }

interface Ember { x: number; y: number; z: number; vx: number; vy: number; vz: number; at: number; life: number; c: THREE.Vector3 }

export class LeyHead {
  readonly meshes: THREE.Object3D[];
  private geo = new THREE.BufferGeometry();
  private pos = new Float32Array((EMBERS + 1) * 3);
  private col = new Float32Array((EMBERS + 1) * 4);
  private kind = new Float32Array((EMBERS + 1) * 2);
  private points: THREE.Points;
  private glow: THREE.Mesh;
  private glowU: { uColour: { value: THREE.Vector3 }; uStrength: { value: number } };
  private u: { uBeat: { value: number }; uPop: { value: number } };
  private embers: Ember[] = [];
  private last: { x: number; z: number; links: number; time: number } | null = null;
  private popAt = -Infinity;
  private seed = 1;

  /** px: art pixels across its head (7 the front, 5 a pulse); sparks: embers kicked off a metre it moves. */
  constructor(uRes: { value: THREE.Vector2 }, mpp: number, private px = HEAD_PX, private sparks = 1.6) {
    this.geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute("aCol", new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute("aKind", new THREE.BufferAttribute(this.kind, 2).setUsage(THREE.DynamicDrawUsage));
    this.u = { uBeat: { value: 0 }, uPop: { value: 0 } };
    this.points = new THREE.Points(this.geo, new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS, uRes, uMpp: { value: mpp }, ...this.u },
      transparent: true, depthTest: false, depthWrite: false,
    }));
    this.points.frustumCulled = false; this.points.renderOrder = 15; this.points.visible = false;
    this.glowU = { uColour: { value: new THREE.Vector3() }, uStrength: { value: 0 } };
    this.glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 6, 6).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({
      vertexShader: GLOW_VERT, fragmentShader: GLOW_FRAG, uniforms: { ...HEIGHT_UNIFORMS, ...this.glowU },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4,
    }));
    this.glow.frustumCulled = false; this.glow.renderOrder = 12; this.glow.visible = false;
    this.meshes = [this.glow, this.points];
  }

  private rand(): number { this.seed = (this.seed * 16807) % 2147483647; return this.seed / 2147483647; }

  private spark(x: number, z: number, c: THREE.Vector3, time: number, burst: boolean): void {
    const a = this.rand() * Math.PI * 2, s = burst ? 2.5 + this.rand() * 3 : 0.4 + this.rand() * 0.9;
    if (this.embers.length >= EMBERS) this.embers.shift();
    this.embers.push({ x, y: HEAD_Y, z, vx: Math.cos(a) * s, vy: (burst ? 2 : 1) + this.rand() * 1.5, vz: Math.sin(a) * s, at: time, life: (burst ? 0.7 : 0.6) + this.rand() * 0.5, c: this.rand() < 0.3 ? new THREE.Vector3(1, 1, 1) : c.clone() });
  }

  /** Each frame: where the front is (null: none drawn, the whole line shown or none yet), the beat (beats, for its pulse) and the
   *  time. Kicks embers off it as it moves, a burst and a pop of light as it passes a stone. */
  update(tip: LeyTip | null, time: number, beats: number, strength = 1): void {
    const on = !!tip && strength > 0.001;
    this.points.visible = on || this.embers.length > 0; this.glow.visible = on;
    this.u.uBeat.value = beats;
    if (tip && on) {
      const L = this.last;
      if (L && Math.abs(time - L.time) < 1) {
        const moved = Math.hypot(tip.x - L.x, tip.z - L.z);
        for (let n = Math.min(4, Math.floor(moved * this.sparks + this.rand())); n > 0; n--) this.spark(tip.x, tip.z, tip.colour, time, false);
        if (Math.floor(tip.links) > Math.floor(L.links) && tip.links - L.links < 0.5) { this.popAt = time; for (let i = 0; i < 18; i++) this.spark(tip.x, tip.z, tip.colour, time, true); }
      }
      this.last = { x: tip.x, z: tip.z, links: tip.links, time };
    } else this.last = null;
    const pop = Math.max(0, 1 - (time - this.popAt) / 0.6);
    this.u.uPop.value = pop;
    // The embers: up, out and down again, fading in steps (pixels).
    this.embers = this.embers.filter(e => time - e.at < e.life && time >= e.at);
    let n = 0;
    const put = (x: number, y: number, z: number, r: number, g: number, b: number, a: number, kind: number, px: number) => {
      this.pos.set([x, y, z], n * 3); this.col.set([r, g, b, a], n * 4); this.kind.set([kind, px], n * 2); n++;
    };
    for (const e of this.embers) {
      const t = time - e.at, k = t / e.life, fade = k < 0.5 ? 1 : k < 0.8 ? 0.6 : 0.3;
      put(e.x + e.vx * t, Math.max(0.05, e.y + e.vy * t - 3 * t * t), e.z + e.vz * t, e.c.x, e.c.y, e.c.z, fade * strength, 1, 1);
    }
    if (tip && on) {
      put(tip.x, HEAD_Y, tip.z, tip.colour.x, tip.colour.y, tip.colour.z, strength, 0, this.px);
      // Its light: small, round, in its colour, dim enough for the bloom to leave it be; a pop at a stone.
      const r = GLOW_R * (this.px / HEAD_PX) * (1 + 0.8 * pop);
      this.glow.position.set(tip.x, 0.1, tip.z); this.glow.scale.set(r * 2, 1, r * 2);
      const peak = Math.max(tip.colour.x, tip.colour.y, tip.colour.z, 1e-3);
      this.glowU.uColour.value.copy(tip.colour).multiplyScalar(1 / peak);
      this.glowU.uStrength.value = GLOW_I * (1 + 0.6 * pop) * strength;
    }
    this.geo.setDrawRange(0, n);
    for (const k of ["position", "aCol", "aKind"]) this.geo.getAttribute(k).needsUpdate = true;
  }
}
