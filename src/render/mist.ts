// A low mist: a plane a few metres above the ground following the camera, a faint drifting noise
// drawn in dithered steps. It is a second layer between the camera and the ground, so it slides
// against the ground as she flies, and it thickens into the twilight haze far off. It is drawn into
// its own buffer as smooth alpha (hidden behind whatever the scene drew in front,
// by the scene's depth), blurred a little and laid over the scaled-up picture (post.ts).
import * as THREE from "three";
import { VALUE_NOISE_GLSL } from "./shaders";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";

const VERT = /* glsl */ `
varying vec3 vWorld;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = onGround((modelMatrix * vec4(position, 1.0)).xyz); // its height above the rolling ground
  vWorld = w;
  gl_Position = clipOf(w);
}`;

const FRAG = /* glsl */ `
uniform float uStrength, uWind;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${LIGHT_GLSL}
${VALUE_NOISE_GLSL}
void main() {
  vec2 p = vWorld.xz;
  vec2 drift = vec2(1.0, 0.35) * uWind * uTime;
  float n = vnoise((p + drift) / 14.0) * 0.65 + vnoise((p - drift * 0.6) / 5.0) * 0.35;
  float far = smoothstep(uHazeRange.x * 0.5, uHazeRange.y, length(vWorld.xz - uHazeCentre));
  float a = uStrength * (smoothstep(0.45, 0.85, n) + far * 0.3);
  vec3 col = mix(uHazeColour * 1.8, uMoon * 0.7 + uAmb * 0.8, 0.5);
  if (gl_FragCoord.z > texture2D(uDepth, gl_FragCoord.xy / uLow).r) discard; // behind a tree
  a = clamp(a * 1.4, 0.0, 1.0);
  gl_FragColor = vec4(col * a, a); // premultiplied, for the overlay
}`;

export class Mist {
  readonly mesh: THREE.Mesh;
  private mat: THREE.ShaderMaterial;

  constructor(strength: number, private height: number, wind: number, depth: THREE.Texture | null, low: THREE.Vector2) {
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uStrength: { value: strength }, uWind: { value: wind }, uDepth: { value: depth }, uLow: { value: low } },
      depthWrite: false, depthTest: false, blending: THREE.NoBlending,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(700, 700, 70, 70).rotateX(-Math.PI / 2), this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2;
  }

  /** Its strength now (the mood's, area by area: render/mood.ts AreaMoods). */
  setStrength(s: number): void { this.mat.uniforms.uStrength.value = s; }

  /** Keep the mist round the camera's view. */
  follow(x: number, z: number): void { this.mesh.position.set(x, this.height, z - 150); }
}
