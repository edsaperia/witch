// The night sky over the bend (Ed, 2026-10-04: "it would be cool to see a little bit of night
// sky, stars, moon"; "occasional clouds, lit from below by the party"). The camera looks down, so
// there is only sky where the world's bend (treetop mode) drops the far forest below the top of the
// screen, and only while there is a bend.
//
// One full-screen pass at the low resolution (so it is pixel art for free), drawn after the opaque
// scene on the far plane with a depth test, so only the pixels nothing covered are shaded: a
// gradient by how high it looks, from the haze's colour low over the trees up to deep night; the stars (Ed, 2026-10-22: "more
// realistic star layout and density, and the occasional nebula"; his answers to the mock, previews/ed/starfield-mock) fixed in
// the sky's directions, so the telescope pans and tilts across one sky: many faint, few bright, blue-white to orange, the bright
// ones twinkling a little, a finer layer as the view zooms in; the Milky Way's band with its dark lane; three rare nebulae, soft
// and stepped in the pixel look; tonight's constellation (rules/constellations.ts), through the telescope only; and a pixel moon
// on the moonlight's side. (The clouds are real ones in the world: clouds.ts.)
import * as THREE from "three";
import { LIGHT_UNIFORMS } from "./lighting";
import { SPRITE_UNIFORMS } from "./sprites";
import type { MoonState } from "../rules/moon";

export interface SkyTuning { on: boolean; stars: number; moon: number }

const VERT = /* glsl */ `
varying vec2 vNdc;
void main() { vNdc = position.xy; gl_Position = vec4(position.xy, 0.99999, 1.0); } // just inside the far plane: behind everything drawn
`;

const FRAG = /* glsl */ `
uniform vec2 uRes;
uniform vec3 uHazeColour, uMoon, uMoonDir;
uniform float uTime;
uniform vec4 uSky;     // stars, moon, the moon's size (times the old)
uniform vec4 uCam;     // the camera's focus x, z; how far ahead the top of the screen looks (m); width there (m)
uniform vec4 uMoonAt;  // the moon (rules/moon.ts): x, y on the screen (fractions), its phase (0 new, 0.5 full), how much of it is lit
uniform vec3 uMoonRgb; // its colour (plain, or a red, blue or gold moon)
// The sky's view (look()): the telescope's own, or for the game's camera its sky as if looking north just over the horizon.
uniform vec3 uSkyR, uSkyU, uSkyF; // the sky's view: right, up, forward
uniform vec3 uSkyTan;             // tan of half its width and height, and its radians per pixel
uniform vec4 uCons[12];           // a constellation's stars: direction, brightness
uniform vec2 uPairs[16];          // its lines: the stars they join
uniform vec4 uConsOn;             // its stars' count, its lines' count, its lines' strength, its stars' strength
varying vec2 vNdc;
float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y);
}
float h31(vec3 p) { p = fract(p * vec3(0.1031, 0.1030, 0.0973)); p += dot(p, p.yxz + 33.33); return fract((p.x + p.y) * p.z); }
float vn3(vec3 p) {
  vec3 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(h31(i), h31(i + vec3(1,0,0)), u.x), mix(h31(i + vec3(0,1,0)), h31(i + vec3(1,1,0)), u.x), u.y),
             mix(mix(h31(i + vec3(0,0,1)), h31(i + vec3(1,0,1)), u.x), mix(h31(i + vec3(0,1,1)), h31(i + vec3(1,1,1)), u.x), u.y), u.z);
}
float fbm3(vec3 p) { return 0.5 * vn3(p) + 0.25 * vn3(p * 2.03) + 0.125 * vn3(p * 4.01) + 0.0625 * vn3(p * 8.07); }
float bayer4(vec2 p) { vec2 q = mod(p, 4.0); float a = mod(q.x, 2.0) * 2.0 + mod(q.y, 2.0), b = floor(q.x / 2.0) * 2.0 + floor(q.y / 2.0); return (a * 4.0 + mod(b * 2.0 + 3.0 * mod(b, 2.0), 4.0) + 0.5) / 16.0; }
// The Milky Way's band (its pole) and how strong it is at a direction.
const vec3 GAL = vec3(0.62, 0.2, 0.76);
float band(vec3 d) { float k = dot(d, normalize(GAL)); return exp(-k * k / 0.035); }
// A star of the layer whose cells are cell radians across, in the pixel looking along d: its colour times brightness, or 0.
vec3 starsAt(vec3 d, float cell, float prob, float fade, float salt) {
  vec3 a = abs(d); float m; vec2 uv; float face;
  if (a.x >= a.y && a.x >= a.z) { m = a.x; uv = d.yz; face = d.x > 0.0 ? 0.0 : 1.0; }
  else if (a.y >= a.z) { m = a.y; uv = d.xz; face = d.y > 0.0 ? 2.0 : 3.0; }
  else { m = a.z; uv = d.xy; face = d.z > 0.0 ? 4.0 : 5.0; }
  uv /= m;
  vec2 c = floor(uv / cell);
  vec3 key = vec3(c, face * 97.0 + salt);
  float b = band(d), p = prob * (1.0 + 2.5 * b);
  if (h31(key) > p) return vec3(0.0);
  vec2 s = (c + vec2(h31(key + 1.7), h31(key + 4.3))) * cell;
  vec3 sd = face < 2.0 ? vec3(face < 1.0 ? 1.0 : -1.0, s.x, s.y) : face < 4.0 ? vec3(s.x, face < 3.0 ? 1.0 : -1.0, s.y) : vec3(s.x, s.y, face < 5.0 ? 1.0 : -1.0);
  float ang = length(cross(d, normalize(sd)));
  // Many faint, few bright (a steep power law), the brightest a pixel or so bigger.
  float mag = pow(h31(key + 9.1), 4.5), r = uSkyTan.z * (0.55 + 0.8 * step(0.6, mag));
  if (ang > r) return vec3(0.0);
  float t = h31(key + 12.9);
  vec3 tint = t < 0.12 ? vec3(0.7, 0.8, 1.0) : t < 0.55 ? vec3(0.95, 0.96, 1.0) : t < 0.8 ? vec3(1.0, 0.94, 0.8) : t < 0.93 ? vec3(1.0, 0.82, 0.6) : vec3(1.0, 0.66, 0.45);
  float tw = 1.0 - 0.18 * mag * (0.5 + 0.5 * sin(uTime * (0.4 + h31(key + 3.3)) + h31(key + 6.6) * 6.28));
  if (mag < 0.04) return vec3(0.0); // (too faint to see)
  return tint * (0.04 + 1.1 * mag) * tw * fade * (ang > uSkyTan.z * 0.55 ? 0.45 : 1.0);
}
void main() {
  vec2 px = floor(gl_FragCoord.xy), uv = gl_FragCoord.xy / uRes;
  // The gradient: the haze's colour low down (where the far forest fades into it), deep night up top.
  float t = smoothstep(0.35, 1.0, uv.y);
  vec3 night = vec3(0.012, 0.012, 0.035), col = mix(uHazeColour * 1.15, night, t);
  {
    vec2 ndc = (px + 0.5) / uRes * 2.0 - 1.0;
    vec3 d = normalize(uSkyF + ndc.x * uSkyTan.x * uSkyR + ndc.y * uSkyTan.y * uSkyU);
    // (the gradient by how high she looks, not where on the screen: the haze low over the horizon, deep night above)
    t = smoothstep(-0.02, 0.3, d.y);
    col = mix(uHazeColour * 1.15, night, t);
    float bw = band(d), mw = bw * (0.45 + 0.55 * fbm3(d * 9.0)) * smoothstep(0.25, 0.75, fbm3(d * 3.0 + 7.0) + 0.35);
    // The Milky Way's glow, dithered in four steps (the game's pixel look), a dark lane down its middle.
    float lane = 1.0 - 0.7 * exp(-pow(dot(d, normalize(GAL)) + 0.03 * (fbm3(d * 14.0) - 0.5), 2.0) / 0.0016);
    float glow = floor(mw * lane * 3.5 + bayer4(px)) / 3.5;
    col += vec3(0.1, 0.105, 0.14) * glow * t;
    // A few nebulae: soft clouds of colour, rare, stepped and dithered.
    for (int i = 0; i < 3; i++) {
      vec3 nd = normalize(vec3(sin(float(i) * 2.4 + 0.7), 0.35 + 0.25 * float(i), cos(float(i) * 2.4 + 0.7)));
      float a = acos(clamp(dot(d, nd), -1.0, 1.0)), w = smoothstep(0.2, 0.0, a) * fbm3(d * 18.0 + float(i) * 5.0) * 1.4;
      float st = floor(w * 4.0 + bayer4(px)) / 4.0;
      vec3 nc = i == 0 ? vec3(0.5, 0.1, 0.42) : i == 1 ? vec3(0.06, 0.36, 0.4) : vec3(0.45, 0.2, 0.08);
      col += nc * st * 1.3 * t;
    }
    // The stars: the sky's, and finer ones only as the view zooms in (a telescope shows fainter stars).
    float fine = smoothstep(0.0013, 0.0006, uSkyTan.z);
    col += starsAt(d, 0.0052, 0.2, 1.0, 0.0) * (0.35 + 0.65 * t) * uSky.x;
    col += starsAt(d, 0.0019, 0.25, fine * 0.7, 31.0) * (0.35 + 0.65 * t) * uSky.x;
    // The night's constellation (the trunk's find, its shape traced in stars): its stars, and faint dotted lines between them.
    for (int i = 0; i < 12; i++) {
      if (float(i) >= uConsOn.x) break;
      float ang = length(cross(d, uCons[i].xyz));
      if (dot(d, uCons[i].xyz) > 0.0 && ang < uSkyTan.z * 1.5) col += vec3(1.0, 0.97, 0.88) * uCons[i].w * uConsOn.w * (ang < uSkyTan.z * 0.8 ? 1.0 : 0.45);
    }
    for (int i = 0; i < 16; i++) {
      if (float(i) >= uConsOn.y) break;
      vec3 a = uCons[int(uPairs[i].x)].xyz, b = uCons[int(uPairs[i].y)].xyz, n = normalize(cross(a, b));
      if (abs(dot(d, n)) < uSkyTan.z * 0.5 && dot(cross(a, d), n) > 0.0 && dot(cross(d, b), n) > 0.0 && mod(px.x + px.y, 2.0) < 1.0)
        col = mix(col, vec3(0.75, 0.8, 1.0), uConsOn.z); // (over the stars behind: legible in the Milky Way too)
    }
  }
  // The moon (rules/moon.ts), on its way across the sky band: a pixel disc with dark seas and a halo,
  // in its phase (waxing lit from the right, waning from the left; the dark side a faint earthshine)
  // and its colour. Below the far forest's line it is hidden behind it, so it rises and sets there.
  vec2 mc = uMoonAt.xy * uRes, md = px + 0.5 - mc;
  float mr = max(4.0, uRes.y * 0.035 * uSky.z), dm = length(md);
  if (uSky.y > 0.0) {
    col += uMoon * uMoonRgb * 0.27 * uSky.y * (0.25 + 0.75 * uMoonAt.w) * exp(-max(0.0, dm - mr) / (mr * 1.6)); // the halo, with how much is lit
    if (dm < mr) {
      float cell = max(1.0, mr / 7.0);
      vec2 q = floor(md / cell), n = (q + 0.5) * cell / mr; // the face in whole pixels of the moon's art
      float sea = vn(q * 0.6 + 3.0) > 0.62 ? 0.72 : 1.0;
      float shade = 0.75 + 0.25 * clamp(dot(normalize(md + 1e-4), normalize(vec2(-uMoonDir.x, 0.6))), 0.0, 1.0);
      float xt = cos(uMoonAt.z * 6.2832) * sqrt(max(0.0, 1.0 - n.y * n.y));
      float lit = uMoonAt.z < 0.5 ? step(xt, n.x) : step(n.x, -xt);
      // A thin crescent narrower than one of the art's pixels would break into dots: past new moon, the
      // limb's outermost pixel in each row stays lit, so it reads as an unbroken sliver (Ed: the moon reads through the blur).
      float rim = sqrt(max(0.0, 1.0 - n.y * n.y)), step1 = cell / mr;
      float limb = uMoonAt.z < 0.5 ? step(rim, n.x + step1) : step(n.x - step1, -rim);
      lit = max(lit, limb * step(abs(n.y), 0.92) * step(0.02, min(uMoonAt.z, 1.0 - uMoonAt.z)));
      vec3 face = uMoonRgb * sea * shade * uSky.y;
      col = mix(col * 0.4 + face * 0.07, face, lit); // the dark side: the sky dimmed behind it, a little earthshine
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

export class Sky {
  readonly mesh: THREE.Mesh;
  private u: Record<string, THREE.IUniform>;

  private on: boolean;
  private readonly baseDisc: number;
  private readonly baseMoon: number;
  /** Multiplier for the existing moon-radius parameter, reset every frame. */
  potionMoon = 1;
  potionMoonGlow = 1;
  potionFloor = 0;

  constructor(T: SkyTuning, disc = 1) {
    this.on = T.on;
    this.baseDisc = disc;
    this.baseMoon = T.moon;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3)); // one triangle over the screen
    this.u = {
      uRes: SPRITE_UNIFORMS.uRes, uHazeColour: LIGHT_UNIFORMS.uHazeColour, uMoon: LIGHT_UNIFORMS.uMoon, uMoonDir: LIGHT_UNIFORMS.uMoonDir, uTime: LIGHT_UNIFORMS.uTime,
      uSky: { value: new THREE.Vector4(T.stars, T.moon, disc, 0) },
      uCam: { value: new THREE.Vector4() },
      uMoonAt: { value: new THREE.Vector4(0.25, 0.86, 0.5, 1) }, uMoonRgb: { value: new THREE.Vector3(0.92, 0.94, 0.86) },
      uSkyR: { value: new THREE.Vector3(1, 0, 0) }, uSkyU: { value: new THREE.Vector3(0, 1, 0) }, uSkyF: { value: new THREE.Vector3(0, 0, -1) },
      uSkyTan: { value: new THREE.Vector3(0.3, 0.18, 0.001) },
      uCons: { value: Array.from({ length: 12 }, () => new THREE.Vector4()) }, uPairs: { value: Array.from({ length: 16 }, () => new THREE.Vector2()) },
      uConsOn: { value: new THREE.Vector4(0, 0, 0.35, 1) },
    };
    this.mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.u, depthTest: true, depthFunc: THREE.LessEqualDepth, depthWrite: false }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 9; // after the opaque scene, before her and the see-through passes
    this.mesh.visible = false;
  }

  /** bend: the world's bend now (none: no sky drawn); the camera's focus, how far ahead the top of
   *  the screen looks and how wide the view is there (metres), for the clouds' party glow. */
  /** The sky's view: its bearing (degrees from north), its pitch (degrees, down positive), its
   *  vertical field of view (degrees), the picture's size in pixels. */
  look(heading: number, pitch: number, fov: number, w: number, h: number): void {
    const a = (heading * Math.PI) / 180, p = (pitch * Math.PI) / 180, s = Math.sin(a), c = Math.cos(a);
    (this.u.uSkyF.value as THREE.Vector3).set(s * Math.cos(p), -Math.sin(p), -c * Math.cos(p));
    (this.u.uSkyR.value as THREE.Vector3).set(c, 0, s);
    (this.u.uSkyU.value as THREE.Vector3).set(s * Math.sin(p), Math.cos(p), -c * Math.sin(p));
    const ty = Math.tan((fov * Math.PI) / 360);
    (this.u.uSkyTan.value as THREE.Vector3).set(ty * (w / h), ty, (2 * Math.atan(ty)) / h);
  }
  /** Tonight's constellation (rules/constellations.ts; none: no stars): its stars (bearing and elevation, degrees; brightness), the lines joining them, their strengths. */
  constellation(stars: { bearing: number; elevation: number; b: number }[], lines: [number, number][], lineStrength: number, starStrength = 1): void {
    const C = this.u.uCons.value as THREE.Vector4[], P = this.u.uPairs.value as THREE.Vector2[];
    stars.slice(0, 12).forEach((q, i) => { const a = (q.bearing * Math.PI) / 180, e = (q.elevation * Math.PI) / 180; C[i].set(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e), q.b); });
    lines.slice(0, 16).forEach(([i, j], k) => P[k].set(i, j));
    (this.u.uConsOn.value as THREE.Vector4).set(Math.min(12, stars.length), Math.min(16, lines.length), lineStrength, starStrength);
  }

  update(bend: number, x: number, z: number, ahead: number, width: number, moon: MoonState): void {
    (this.u.uSky.value as THREE.Vector4).z = this.baseDisc * this.potionMoon;
    (this.u.uSky.value as THREE.Vector4).y = this.baseMoon * this.potionMoonGlow;
    this.mesh.visible = this.potionFloor > 0 || this.on && bend > 1e-6;
    this.mesh.renderOrder = this.potionFloor > 0 ? -100 : 9;
    (this.mesh.material as THREE.ShaderMaterial).depthTest = this.potionFloor <= 0;
    (this.u.uCam.value as THREE.Vector4).set(x, z, ahead, width);
    (this.u.uMoonAt.value as THREE.Vector4).set(moon.x, moon.y, moon.phase, moon.lit);
    (this.u.uMoonRgb.value as THREE.Vector3).set(...moon.rgb);
  }
}
