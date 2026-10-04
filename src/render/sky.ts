// The night sky over the bend (Ed, 2026-10-04: "it would be cool to see a little bit of night
// sky, stars, moon"; "occasional clouds, lit from below by the party"). The camera looks down, so
// there is only sky where the world's bend (treetop mode) drops the far forest below the top of the
// screen, and only while there is a bend.
//
// One full-screen pass at the low resolution (so it is pixel art for free), drawn after the opaque
// scene on the far plane with a depth test, so only the pixels nothing covered are shaded: a
// gradient from the haze's colour (the far canopy fades into it) up to deep night; a twinkling starfield in a few
// sizes and colours, drifting a little with the camera; a pixel moon on the moonlight's side; and a
// few slow clouds, moonlit grey-blue with a silver rim on the moon's side, their undersides lit in
// the colours of the partified areas beneath them, pulsing on the beat.
import * as THREE from "three";
import { LIGHT_UNIFORMS } from "./lighting";
import { SPRITE_UNIFORMS } from "./sprites";

export interface SkyTuning { on: boolean; stars: number; moon: number; clouds: { count: number; speed: number; partyGlow: number } }

const VERT = /* glsl */ `
varying vec2 vNdc;
void main() { vNdc = position.xy; gl_Position = vec4(position.xy, 0.99999, 1.0); } // just inside the far plane: behind everything drawn
`;

const FRAG = /* glsl */ `
uniform vec2 uRes;
uniform vec3 uHazeColour, uMoon, uMoonDir;
uniform float uTime;
uniform vec4 uSky;     // stars, moon, cloud cover (from count), cloud speed
uniform vec4 uCam;     // the camera's focus x, z; how far ahead the top of the screen looks (m); width there (m)
uniform float uShow;   // 0 to 1, with the bend
uniform float uGlow;   // party glow
uniform vec4 uParty[16];
uniform vec3 uPartyCol[16];
uniform int uPartyCount;
uniform vec4 uUplight;  // strength, pulse, edge, the beat's phase
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
  float tw = 0.6 + 0.4 * sin(uTime * (1.5 + r * 4.0) + r * 60.0);
  float star = (r > 1.0 - 0.004 * uSky.x ? 1.0 : 0.0) + (big > 1.0 - 0.0008 * uSky.x && mod(px.x, 2.0) + mod(px.y, 2.0) < 1.5 ? 0.8 : 0.0);
  vec3 tint = h21(sp + 13.0) > 0.85 ? vec3(1.0, 0.75, 0.6) : h21(sp + 29.0) > 0.85 ? vec3(0.65, 0.8, 1.0) : vec3(1.0);
  col += tint * star * tw * (0.35 + 0.65 * t) * 0.9;
  // The moon, on the moonlight's side, high in the band: a pixel disc with dark seas and a halo.
  vec2 mc = vec2(0.5 + uMoonDir.x * 0.55, 0.86) * uRes, md = px + 0.5 - mc;
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
  // Clouds: a few slow drifting shapes (wider than tall), sometimes across the moon.
  if (uSky.z > 0.0) {
    vec2 cq = vec2(px.x / uRes.y, px.y / uRes.y) * vec2(2.2, 5.5) + vec2(uCam.x * 0.004 + uTime * uSky.w * 0.01, -uCam.y * 0.002);
    float n = vn(cq) * 0.6 + vn(cq * 2.3 + 7.0) * 0.3 + vn(cq * 5.1 + 3.0) * 0.1;
    float cover = 0.78 - uSky.z * 0.22;
    float c = smoothstep(cover, cover + 0.06, n);
    if (c > 0.0) {
      // Its underside: lower in the cloud (where n falls off below), and its moon side's rim.
      float below = clamp((n - vn(cq + vec2(0.0, 0.18)) * 0.6 - vn((cq + vec2(0.0, 0.18)) * 2.3 + 7.0) * 0.3 - 0.1 * vn((cq + vec2(0.0, 0.18)) * 5.1 + 3.0)) * 6.0, 0.0, 1.0);
      float rim = clamp((n - vn(cq + vec2(uMoonDir.x * 0.2, -0.12)) * 0.6 - 0.3 * vn((cq + vec2(uMoonDir.x * 0.2, -0.12)) * 2.3 + 7.0) - 0.1 * vn((cq + vec2(uMoonDir.x * 0.2, -0.12)) * 5.1 + 3.0)) * 8.0, 0.0, 1.0);
      vec3 cl = mix(vec3(0.07, 0.08, 0.13), vec3(0.11, 0.12, 0.18), t) + uMoon * 0.12;
      cl += uMoon * 0.55 * rim * (1.0 - below);
      // The party below: the ground far ahead under this part of the sky, and its partified areas' colours.
      vec2 g = vec2(uCam.x + (uv.x - 0.5) * uCam.w, uCam.y - uCam.z * (0.8 + uv.y * 0.6));
      vec3 up = vec3(0.0);
      for (int i = 0; i < 16; i++) {
        if (i >= uPartyCount) break;
        float d = length(g - uParty[i].xy), reach = uParty[i].z * 2.5;
        if (d < reach) up = max(up, uPartyCol[i] * (1.0 - d / reach) * uParty[i].w);
      }
      cl += up * uGlow * (0.6 + 0.4 * below) * (1.0 + uUplight.y * sin(uUplight.w));
      col = mix(col, cl, c);
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
      uParty: SPRITE_UNIFORMS.uParty, uPartyCol: SPRITE_UNIFORMS.uPartyCol, uPartyCount: SPRITE_UNIFORMS.uPartyCount, uUplight: SPRITE_UNIFORMS.uUplight,
      uSky: { value: new THREE.Vector4(T.stars, T.moon, Math.min(1, T.clouds.count / 10), T.clouds.speed) },
      uCam: { value: new THREE.Vector4() }, uShow: { value: 0 }, uGlow: { value: T.clouds.partyGlow },
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
}
