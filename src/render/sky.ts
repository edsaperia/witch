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
//
// It goes with the bend (Ed, round 12: "the bend shader ... should be applied before"): the sky is
// hung on the bent ground's horizon, where the camera's line of sight grazes the curve, worked out
// each frame (horizon()); the gradient rises from it and the stars and moon move with it, so as the
// bend grows and the ground curves away, the sky comes down with it and the two meet at one line.
import * as THREE from "three";
import { LIGHT_UNIFORMS } from "./lighting";
import { SPRITE_UNIFORMS } from "./sprites";
import { HEIGHT_UNIFORMS } from "./height";

export interface SkyTuning { on: boolean; stars: number; moon: number }

const VERT = /* glsl */ `
varying vec2 vNdc;
void main() { vNdc = position.xy; gl_Position = vec4(position.xy, 0.99999, 1.0); } // just inside the far plane: behind everything drawn
`;

const FRAG = /* glsl */ `
uniform vec2 uRes;
uniform vec3 uHazeColour, uMoon, uMoonDir;
uniform float uTime;
uniform vec4 uSky;     // stars, moon
uniform vec4 uCam;     // the camera's focus x, z; how far ahead the top of the screen looks (m); width there (m)
uniform float uShow;   // 0 to 1, with the bend
uniform float uHorizon; // the bent ground's horizon, as a share of the screen's height from the bottom
varying vec2 vNdc;
// Where the horizon sat when the sky was drawn pinned to the screen (its look is kept there).
const float H0 = 0.74;
float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y);
}
void main() {
  vec2 px = floor(gl_FragCoord.xy), uv = gl_FragCoord.xy / uRes;
  // Hung on the horizon: everything below is offset by how far it is from where it sat (H0), in whole pixels.
  float drop = floor((uHorizon - H0) * uRes.y + 0.5);
  // The gradient: the haze's colour at the horizon (where the far forest fades into it), deep night above.
  float t = smoothstep(uHorizon - 0.39, uHorizon + 0.26, uv.y); // (the same as before with the horizon where it sat)
  vec3 night = vec3(0.012, 0.012, 0.035), col = mix(uHazeColour * 1.15, night, t);
  // Stars: one in a few hundred pixels, a few bigger, a few tinted; twinkling; drifting a little
  // as she flies (they're far, but not infinitely: a hint of parallax).
  vec2 sp = px - vec2(0.0, drop) + floor(vec2(uCam.x, -uCam.y) * 0.02);
  float r = h21(sp), big = h21(floor(sp / 2.0) + 71.0);
  // Each star its own slow rate and phase; most barely twinkle, a few noticeably (Ed, v276: "too much and too in sync").
  float tPhase = h21(sp + 5.0) * 6.2832, tRate = 0.25 + 0.9 * h21(sp + 9.0), tAmp = h21(sp + 41.0) > 0.9 ? 0.4 : 0.07;
  float tw = 1.0 - tAmp * (0.5 + 0.5 * sin(uTime * tRate + tPhase));
  float star = (r > 1.0 - 0.004 * uSky.x ? 1.0 : 0.0) + (big > 1.0 - 0.0008 * uSky.x && mod(px.x, 2.0) + mod(px.y, 2.0) < 1.5 ? 0.8 : 0.0);
  vec3 tint = h21(sp + 13.0) > 0.85 ? vec3(1.0, 0.75, 0.6) : h21(sp + 29.0) > 0.85 ? vec3(0.65, 0.8, 1.0) : vec3(1.0);
  col += tint * star * tw * (0.35 + 0.65 * t) * 0.9;
  // The moon, on the moonlight's side, high in the band: a pixel disc with dark seas and a halo.
  vec2 mc = vec2(0.5 + uMoonDir.x * 0.55, 0.86) * uRes + vec2(0.0, drop), md = px + 0.5 - mc;
  float mr = max(4.0, uRes.y * 0.035), dm = length(md);
  if (uSky.y > 0.0) {
    col += uMoon * 0.25 * uSky.y * exp(-max(0.0, dm - mr) / (mr * 1.6)); // the halo
    if (dm < mr) {
      vec2 q = floor(md / max(1.0, mr / 7.0));
      float sea = vn(q * 0.6 + 3.0) > 0.62 ? 0.72 : 1.0;
      float lit = 0.75 + 0.25 * clamp(dot(normalize(md + 1e-4), normalize(vec2(-uMoonDir.x, 0.6))), 0.0, 1.0);
      col = mix(col, vec3(0.92, 0.94, 0.86) * sea * lit * uSky.y, 1.0);
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

export class Sky {
  readonly mesh: THREE.Mesh;
  private u: Record<string, THREE.IUniform>;

  private on: boolean;

  constructor(T: SkyTuning) {
    this.on = T.on;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3)); // one triangle over the screen
    this.u = {
      uRes: SPRITE_UNIFORMS.uRes, uHazeColour: LIGHT_UNIFORMS.uHazeColour, uMoon: LIGHT_UNIFORMS.uMoon, uMoonDir: LIGHT_UNIFORMS.uMoonDir, uTime: LIGHT_UNIFORMS.uTime,
      uSky: { value: new THREE.Vector4(T.stars, T.moon, 0, 0) },
      uCam: { value: new THREE.Vector4() }, uShow: { value: 0 }, uHorizon: { value: 0.74 },
    };
    this.mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.u, depthTest: true, depthFunc: THREE.LessEqualDepth, depthWrite: false }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 9; // after the opaque scene, before her and the see-through passes
    this.mesh.visible = false;
  }

  /** bend: the world's bend now (none: no sky drawn); the camera's focus, how far ahead the top of
   *  the screen looks and how wide the view is there (metres), for the clouds' party glow. */
  update(bend: number, x: number, z: number, ahead: number, width: number): void {
    this.mesh.visible = this.on && bend > 1e-6;
    (this.u.uCam.value as THREE.Vector4).set(x, z, ahead, width);
  }

  private hv = new THREE.Vector3();
  /** Hang the sky on the bent ground's horizon as `cam` sees it (after the camera is posed): the
   *  point where its line of sight grazes ground bent by uBend (k, from the focus along uBendFwd),
   *  projected; its height on the screen is where the sky's gradient starts and its stars and moon sit. */
  horizon(cam: THREE.Camera): void {
    const B = HEIGHT_UNIFORMS.uBend.value, F = HEIGHT_UNIFORMS.uBendFwd.value, k = B.x;
    if (!this.mesh.visible || k <= 1e-6) return;
    const p = cam.position, D = Math.max(1, -((p.x - B.y) * F.x + (p.z - B.z) * F.y)), H = Math.max(1, p.y);
    const dh = -D + Math.sqrt(D * D + H / k); // how far past the focus the line of sight grazes the curve
    const v = this.hv.set(B.y + F.x * dh, -k * dh * dh, B.z + F.y * dh).project(cam);
    if (Number.isFinite(v.y) && v.z < 1) this.u.uHorizon.value = Math.max(-0.5, Math.min(1.5, (v.y + 1) / 2));
  }
}
