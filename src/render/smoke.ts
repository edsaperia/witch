// Smoke from every fire (Ed, round 13: "Fires should produce puffs of smoke that rise high into the sky before dissipating"): the
// world's campfires, the party's campfires, bonfires and tiki torches, and the charcoal burner's smouldering mound. Each fire sends
// up a stream of soft, separate puffs that rise well above the treetops, slowing, drifting with the wind and widening as they go,
// then thin and fade. Moonlit grey-blue, the fire's warm light on the undersides of the low ones.
//
// Cheap by construction: one instanced draw of camera-facing quads from a fixed pool (`smoke.maxFires` fires, `smoke.perFire`
// puffs each), every puff's age, height, drift and fade worked out in the shader from the time and its fire's place, so the CPU
// only writes the nearest fires' places into a preallocated buffer each frame (nothing allocated), and a fire changing slots never
// moves its puffs. Fires past `smoke.range` aren't drawn; those near its edge fade, so none pops. Knobs: the tuning's `smoke`.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_UNIFORMS } from "./lighting";
import { SPRITE_UNIFORMS } from "./sprites";

export interface SmokeTuning { on: boolean; rate: number; life: number; rise: number; speed: number; size: number; grow: number; drift: number; opacity: number; warm: number; pixel: boolean; perFire: number; maxFires: number; range: number }

const VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform vec4 uSmoke;  // time, life (s), rise (m), the rise curve's power
uniform vec4 uSmoke2; // size (m), grow (times at the top), drift x, drift z (m/s)
uniform float uPuffs; // puffs a fire
attribute vec4 iFire; // the fire: x, ground y, z, strength (its size and the range fade; 0 for an unused slot)
attribute float iK;   // which of its fire's puffs this is
varying vec2 vUv;
varying float vT, vA, vSeed;
float h1(float n) { return fract(sin(n) * 43758.5453); }
${HEIGHT_VERT_GLSL}
void main() {
  vUv = uv;
  float life = uSmoke.y, f = iFire.w;
  // each fire's own phase, so neighbouring fires don't puff in step
  float fh = h1(iFire.x * 12.9898 + iFire.z * 78.233);
  float clock = uSmoke.x + (iK + h1(iK * 3.7 + fh * 91.0) * 0.6) / uPuffs * life + fh * life;
  float cyc = floor(clock / life), age = clock - cyc * life, t = age / life;
  float s = h1(cyc * 17.13 + iK * 5.31 + fh * 31.7); // this puff's own randomness, new each time round
  vSeed = s; vT = t;
  float y = uSmoke.z * (1.0 - pow(1.0 - t, uSmoke.w)) * (0.8 + 0.4 * s) * mix(0.6, 1.0, min(1.0, f));
  vec2 wob = vec2(sin(age * 0.6 + s * 6.28), cos(age * 0.45 + s * 4.0)) * (0.4 + 2.2 * t);
  vec3 c = vec3(iFire.x, iFire.y + 0.8 + y, iFire.z) + vec3(uSmoke2.z * age + wob.x, 0.0, uSmoke2.w * age + wob.y);
  float size = uSmoke2.x * (0.6 + 0.4 * min(1.5, f)) * (1.0 + uSmoke2.y * t) * (0.8 + 0.4 * s);
  // in quickly, full a while, then thinning out to nothing; fainter as it rises
  vA = f > 0.0 ? smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.45, 1.0, t)) * (1.0 - 0.35 * t) * min(1.0, f) : 0.0;
  vec3 w = c + uRight * (position.x * size) + uUp * (position.y * size);
  gl_Position = f > 0.0 ? clipOf(w) : vec4(2.0, 2.0, 2.0, 1.0);
}`;

const FRAG = /* glsl */ `
uniform vec3 uMoon, uMoonDir, uFireCol;
uniform vec2 uSmoke3; // opacity, warmth (how much firelight the low puffs catch)
uniform float uPixel; // stepped tones and a dithered edge (1) or smooth (0)
varying vec2 vUv;
varying float vT, vA, vSeed;
float ch(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float cn(vec2 p) { vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f); return mix(mix(ch(i), ch(i + vec2(1, 0)), u.x), mix(ch(i + vec2(0, 1)), ch(i + vec2(1, 1)), u.x), u.y); }
void main() {
  // a soft, lumpy puff
  vec2 q = vUv - 0.5;
  float n = cn(vUv * 4.0 + vSeed * 37.0) * 0.6 + cn(vUv * 9.0 + vSeed * 71.0) * 0.4;
  float a = smoothstep(0.5, 0.18, length(q) + (n - 0.5) * 0.35) * vA;
  if (a < 0.01) discard;
  // moonlit grey-blue, a lighter rim on the moon's side; the fire's warm light under the low ones
  float side = uMoonDir.x < 0.0 ? 1.0 - vUv.x : vUv.x;
  // a cool grey, only a little blue: lit, never a light (kept under the moon and the party's amber: the art director, #236)
  vec3 c = vec3(0.43, 0.44, 0.47) + uMoon * (0.4 + 0.5 * smoothstep(0.5, 0.95, side) * smoothstep(0.3, 0.9, vUv.y));
  // the lowest puffs catch the fire's amber underneath, cooling to grey by the treetops
  float warm = uSmoke3.y * (1.0 - smoothstep(0.02, 0.3, vT)) * smoothstep(0.2, 0.75, 1.0 - vUv.y);
  c = mix(c, uFireCol * 0.75, clamp(warm, 0.0, 0.85));
  a *= uSmoke3.x * (0.7 + 0.3 * n);
  if (uPixel > 0.5) { // drawn, not airbrushed: three stepped tones with an ordered dither at the edge, at the art pixel
    vec2 p = mod(floor(gl_FragCoord.xy), 4.0);
    float b = mod(p.x + p.y * 2.0, 4.0) / 4.0 + mod(floor(p.x * 0.5) + floor(p.y * 0.5) * 2.0, 4.0) / 16.0; // a 4 x 4 Bayer-ish threshold
    float k = floor(a * 3.0 / max(0.05, uSmoke3.x) + b) / 3.0;
    if (k <= 0.0) discard;
    a = min(k, 1.0) * uSmoke3.x;
  }
  gl_FragColor = vec4(c, a);
}`;

export class Smoke {
  readonly mesh: THREE.Mesh;
  private geo = new THREE.InstancedBufferGeometry();
  private fire: THREE.InstancedBufferAttribute;
  private u: Record<string, THREE.IUniform>;
  private fires: Float32Array; // candidates this frame: x, y, z, size, distance²
  private count = 0;
  private order: Int32Array;
  readonly perFire: number;
  /** Puffs drawn this frame (for the debug overlay). */
  puffs = 0;

  constructor(private T: SmokeTuning) {
    this.perFire = Math.max(1, Math.min(T.perFire, Math.round(T.rate * T.life)));
    const total = T.maxFires * this.perFire, quad = new THREE.PlaneGeometry(1, 1);
    this.geo.index = quad.index;
    this.geo.setAttribute("position", quad.getAttribute("position"));
    this.geo.setAttribute("uv", quad.getAttribute("uv"));
    this.fire = new THREE.InstancedBufferAttribute(new Float32Array(total * 4), 4); this.fire.setUsage(THREE.DynamicDrawUsage);
    const k = new Float32Array(total); for (let i = 0; i < total; i++) k[i] = i % this.perFire;
    this.geo.setAttribute("iFire", this.fire); this.geo.setAttribute("iK", new THREE.InstancedBufferAttribute(k, 1));
    this.geo.instanceCount = 0;
    this.fires = new Float32Array(256 * 5); this.order = new Int32Array(256);
    const life = Math.max(1, T.life), power = Math.max(1, T.speed * life / Math.max(1, T.rise)); // its rise slows: starting at `speed`, reaching `rise` at the end of its life
    const wind = Math.hypot(1, 0.35);
    this.u = {
      ...HEIGHT_UNIFORMS, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp, uMoon: LIGHT_UNIFORMS.uMoon, uMoonDir: LIGHT_UNIFORMS.uMoonDir,
      uSmoke: { value: new THREE.Vector4(0, life, T.rise, power) },
      uSmoke2: { value: new THREE.Vector4(T.size, T.grow, T.drift / wind, -T.drift * 0.35 / wind) },
      uSmoke3: { value: new THREE.Vector2(T.opacity, T.warm) },
      uPuffs: { value: this.perFire },
      uPixel: { value: T.pixel ? 1 : 0 },
      uFireCol: { value: new THREE.Color(1.0, 0.55, 0.22) },
    };
    this.mesh = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.u, transparent: true, depthWrite: false }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 9.4; // with the clouds: over the sky, depth-tested against the forest
  }

  /** Start a frame's list of fires. */
  begin(): void { this.count = 0; }
  /** A fire this frame: where, and how big (a small campfire 1, a bonfire about 2, a torch 0.3). */
  add(x: number, y: number, z: number, size: number, wx: number, wz: number): void {
    if (this.count >= 256 || size <= 0) return;
    const d2 = (x - wx) ** 2 + (z - wz) ** 2, R = this.T.range;
    if (d2 > R * R) return;
    const o = this.count * 5;
    this.fires[o] = x; this.fires[o + 1] = y; this.fires[o + 2] = z; this.fires[o + 3] = size; this.fires[o + 4] = d2;
    this.count++;
  }
  /** Draw the nearest fires' smoke (at most maxFires), those near the range's edge fading. */
  end(time: number): void {
    const T = this.T, on = T.on && this.count > 0;
    this.mesh.visible = on;
    if (!on) { this.puffs = 0; this.geo.instanceCount = 0; return; }
    const m = this.count, F = this.fires, O = this.order;
    for (let i = 0; i < m; i++) O[i] = i;
    // the nearest first (insertion sort: a few dozen at most, and nothing allocated)
    for (let i = 1; i < m; i++) { const k = O[i], d = F[k * 5 + 4]; let j = i - 1; while (j >= 0 && F[O[j] * 5 + 4] > d) { O[j + 1] = O[j]; j--; } O[j + 1] = k; }
    const n = Math.min(m, T.maxFires), A = this.fire.array as Float32Array, P = this.perFire, R = T.range;
    for (let i = 0; i < n; i++) {
      const k = O[i] * 5, d = Math.sqrt(F[k + 4]), fade = 1 - Math.min(1, Math.max(0, (d - R * 0.75) / (R * 0.25)));
      for (let p = 0; p < P; p++) { const o = (i * P + p) * 4; A[o] = F[k]; A[o + 1] = F[k + 1]; A[o + 2] = F[k + 2]; A[o + 3] = F[k + 3] * fade; }
    }
    this.puffs = n * P;
    this.geo.instanceCount = n * P;
    this.fire.needsUpdate = true; this.fire.clearUpdateRanges(); this.fire.addUpdateRange(0, n * P * 4);
    (this.u.uSmoke.value as THREE.Vector4).x = time;
  }
}
