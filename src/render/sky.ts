// The night sky over the bend (Ed, 2026-10-04: "it would be cool to see a little bit of night
// sky, stars, moon"; "occasional clouds, lit from below by the party"). The camera looks down, so
// there is only sky where the world's bend (treetop mode) drops the far forest below the top of the
// screen, and only while there is a bend.
//
// One full-screen pass at the low resolution (so it is pixel art for free), drawn after the opaque
// scene on the far plane with a depth test, so only the pixels nothing covered are shaded: a
// gradient from the haze's colour (the far canopy fades into it) up to deep night; a starfield in a
// few sizes and colours, drifting a little with the camera, a few stars twinkling; and a pixel moon
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
uniform float uShow;   // 0 to 1, with the bend
uniform vec4 uMoonAt;  // the moon (rules/moon.ts): x, y on the screen (fractions), its phase (0 new, 0.5 full), how much of it is lit
uniform vec3 uMoonRgb; // its colour (plain, or a red, blue or gold moon)
varying vec2 vNdc;
float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y);
}
void main() {
  vec2 px = floor(gl_FragCoord.xy), uv = gl_FragCoord.xy / uRes;
  // The gradient: the haze's colour low down (where the far forest fades into it), deep night up top.
  float t = smoothstep(0.35, 1.0, uv.y);
  vec3 night = vec3(0.012, 0.012, 0.035), col = mix(uHazeColour * 1.15, night, t);
  // Stars: one in a few hundred pixels, a few bigger, a few tinted; twinkling; drifting a little
  // as she flies (they're far, but not infinitely: a hint of parallax).
  vec2 sp = px + floor(vec2(uCam.x, -uCam.y) * 0.02);
  float r = h21(sp), big = h21(floor(sp / 2.0) + 71.0);
  // Each star its own slow rate and phase; most barely twinkle, a few noticeably (Ed, v276: "too much and too in sync").
  float tPhase = h21(sp + 5.0) * 6.2832, tRate = 0.25 + 0.9 * h21(sp + 9.0), tAmp = h21(sp + 41.0) > 0.9 ? 0.4 : 0.07;
  float tw = 1.0 - tAmp * (0.5 + 0.5 * sin(uTime * tRate + tPhase));
  float star = (r > 1.0 - 0.004 * uSky.x ? 1.0 : 0.0) + (big > 1.0 - 0.0008 * uSky.x && mod(px.x, 2.0) + mod(px.y, 2.0) < 1.5 ? 0.8 : 0.0);
  vec3 tint = h21(sp + 13.0) > 0.85 ? vec3(1.0, 0.75, 0.6) : h21(sp + 29.0) > 0.85 ? vec3(0.65, 0.8, 1.0) : vec3(1.0);
  col += tint * star * tw * (0.35 + 0.65 * t) * 0.9;
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

  constructor(T: SkyTuning, disc = 1) {
    this.on = T.on;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3)); // one triangle over the screen
    this.u = {
      uRes: SPRITE_UNIFORMS.uRes, uHazeColour: LIGHT_UNIFORMS.uHazeColour, uMoon: LIGHT_UNIFORMS.uMoon, uMoonDir: LIGHT_UNIFORMS.uMoonDir, uTime: LIGHT_UNIFORMS.uTime,
      uSky: { value: new THREE.Vector4(T.stars, T.moon, disc, 0) },
      uCam: { value: new THREE.Vector4() }, uShow: { value: 0 },
      uMoonAt: { value: new THREE.Vector4(0.25, 0.86, 0.5, 1) }, uMoonRgb: { value: new THREE.Vector3(0.92, 0.94, 0.86) },
    };
    this.mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.u, depthTest: true, depthFunc: THREE.LessEqualDepth, depthWrite: false }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 9; // after the opaque scene, before her and the see-through passes
    this.mesh.visible = false;
  }

  /** bend: the world's bend now (none: no sky drawn); the camera's focus, how far ahead the top of
   *  the screen looks and how wide the view is there (metres), for the clouds' party glow. */
  update(bend: number, x: number, z: number, ahead: number, width: number, moon: MoonState): void {
    this.mesh.visible = this.on && bend > 1e-6;
    (this.u.uCam.value as THREE.Vector4).set(x, z, ahead, width);
    (this.u.uMoonAt.value as THREE.Vector4).set(moon.x, moon.y, moon.phase, moon.lit);
    (this.u.uMoonRgb.value as THREE.Vector3).set(...moon.rgb);
  }
}
