// A low mist: a plane a few metres above the ground following the camera, a faint drifting noise
// drawn in dithered steps. It is a second layer between the camera and the ground, so it slides
// against the ground as she flies, and it thickens into the twilight haze far off.
import * as THREE from "three";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";

const VERT = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

const FRAG = /* glsl */ `
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${LIGHT_GLSL}
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
void main() {
  vec2 p = (floor(vWorld.xz / uPixel) + 0.5) * uPixel; // on the art's pixel grid
  vec2 drift = vec2(1.0, 0.35) * uWind * uTime;
  float n = vnoise((p + drift) / 14.0) * 0.65 + vnoise((p - drift * 0.6) / 5.0) * 0.35;
  float far = smoothstep(uHazeRange.x * 0.5, uHazeRange.y, length(vWorld.xz - uHazeCentre));
  float a = uStrength * (smoothstep(0.45, 0.75, n) + far * 0.6);
  // Two steps of density, as ordered dither: pixel art, no smooth alpha.
  float level = a > 0.5 ? 0.5 : a > 0.2 ? 0.25 : 0.0;
  vec2 g = mod(floor(gl_FragCoord.xy), 2.0);
  bool on = level >= 0.5 ? (g.x == g.y) : level > 0.0 ? (g.x == 0.0 && g.y == 0.0) : false;
  if (!on) discard;
  gl_FragColor = vec4(mix(uHazeColour * 2.2, uMoon * 0.9 + uAmb, 0.4), 1.0);
}`;

export class Mist {
  readonly mesh: THREE.Mesh;
  private mat: THREE.ShaderMaterial;

  constructor(strength: number, private height: number, wind: number, metresPerPixel: number) {
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, uStrength: { value: strength }, uWind: { value: wind }, uPixel: { value: metresPerPixel } },
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(700, 700).rotateX(-Math.PI / 2), this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2;
  }

  /** Keep the mist round the camera's view. */
  follow(x: number, z: number): void { this.mesh.position.set(x, this.height, z - 150); }
}
