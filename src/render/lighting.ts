// The night lighting, as shader code shared by sprites and ground: the Art Lab's lighting pass
// (art/lighting.js) moved into 3D. Twilight ambient, moonlight from the upper left, moonbeams,
// and the witch's glow, each stepped into a few light bands with a little dithering.
import * as THREE from "three";
import { hsv2rgb } from "../../art/generator.js";
import type { Style } from "./style";

export const LIGHT_UNIFORMS = {
  uAmb: { value: new THREE.Vector3() },
  uMoon: { value: new THREE.Vector3() },
  uMoonDir: { value: new THREE.Vector3(-0.45, 0.75, 0.5).normalize() },
  uMoonBeam: { value: new THREE.Vector3() },
  uBands: { value: 4 },
  uDither: { value: 0.35 },
  uShafts: { value: 0.3 },
  uShaftScale: { value: 1 },
  uGlowPos: { value: new THREE.Vector3() },
  uGlowRgb: { value: new THREE.Vector3() },
  uGlowR: { value: 8 },
  uGlowPower: { value: 1.4 },
  // The twilight haze: the forest fades into it from near to far metres from the witch.
  uHazeCentre: { value: new THREE.Vector2() },
  uHazeRange: { value: new THREE.Vector2(70, 200) },
  uHazeColour: { value: new THREE.Vector3() },
  uTime: { value: 0 },
};

export type LightUniforms = typeof LIGHT_UNIFORMS;

/** Set the light colours from a style (the Art Lab's knobs). One set of uniforms is shared by
 *  every material, so this and the glow position update everything at once. */
export function applyStyleLight(st: Style, glowReach: number, metresPerArtPixel: number): void {
  const v = (rgb: number[], k: number) => new THREE.Vector3(rgb[0] / 255 * k, rgb[1] / 255 * k, rgb[2] / 255 * k);
  LIGHT_UNIFORMS.uAmb.value.copy(v(hsv2rgb(st.ambientHue, 0.55, 1), st.ambient));
  LIGHT_UNIFORMS.uMoon.value.copy(v(hsv2rgb(st.moonHue, 0.35, 1), st.moon));
  LIGHT_UNIFORMS.uMoonBeam.value.copy(v(hsv2rgb(st.moonHue, 0.35, 1), st.shafts * 0.25));
  LIGHT_UNIFORMS.uBands.value = st.bands;
  LIGHT_UNIFORMS.uDither.value = st.dither * 0.5;
  LIGHT_UNIFORMS.uShafts.value = st.shafts;
  LIGHT_UNIFORMS.uShaftScale.value = metresPerArtPixel * 2;
  LIGHT_UNIFORMS.uGlowRgb.value.copy(v(hsv2rgb(st.glowHue, st.glowSat, 1), 1));
  LIGHT_UNIFORMS.uGlowR.value = glowReach;
  LIGHT_UNIFORMS.uGlowPower.value = st.glowPower;
  LIGHT_UNIFORMS.uHazeColour.value.copy(v(hsv2rgb(st.ambientHue, 0.45, 1), 0.16));
}

export const LIGHT_GLSL = /* glsl */ `
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;

// Fade toward the twilight haze with distance, in a few dithered steps so it stays pixel art.
vec3 haze(vec3 c, vec3 P) {
  float h = smoothstep(uHazeRange.x, uHazeRange.y, length(P.xz - uHazeCentre));
  h *= h; // light through the middle distance, full only at the far edge
  float q = h * 4.0, fr = fract(q);
  q = floor(q) + (fr > (mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.66 : 0.33) ? 1.0 : 0.0);
  return mix(c, uHazeColour, q / 4.0);
}

float lightStep(float f) {
  float q = f * uBands;
  float fr = fract(q);
  if (uDither > 0.0 && abs(fr - 0.5) < uDither * 0.5) q += mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.5 : -0.5;
  return max(0.0, floor(q)) / uBands;
}

// N: world normal; P: world position; moonK: how much moonlight gets through (a shadow lowers
// it; the witch's own glow is never shadowed). Returns the light falling on that pixel.
vec3 nightLightShaded(vec3 N, vec3 P, float moonK) {
  vec3 l = uAmb * mix(1.0, moonK, 0.5) + uMoon * moonK * lightStep(max(0.0, dot(N, uMoonDir)));
  if (uShafts > 0.0 && moonK > 0.99) {
    // Moonbeams: diagonal bands across the world, as the lab draws them across the screen.
    float s = mod(P.x / uShaftScale + P.z * 0.9 / uShaftScale, 150.0);
    float chk = mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0);
    if (s < 34.0 && (chk > 0.5 || (s > 4.0 && s < 30.0))) l += uMoonBeam;
  }
  vec3 v = uGlowPos - P;
  float d = length(v);
  if (d < uGlowR) {
    float ndl = max(0.0, dot(N, v / max(d, 1e-4)));
    float fall = 1.0 - d / uGlowR;
    l += uGlowRgb * lightStep(min(1.0, ndl * fall * fall * uGlowPower));
  }
  return l;
}
vec3 nightLight(vec3 N, vec3 P) { return nightLightShaded(N, P, 1.0); }
`;
