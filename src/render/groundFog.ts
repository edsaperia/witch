// Ground fog (Ed, 2026-10-07, making the wild forest eerier: "low ground fog in the wild areas, slow, thinner near the
// party"). One pass over the screen in the half-size effects layer (post.ts), no geometry: each pixel's world point is
// rebuilt from the scene's depth, and the fog is thickest where that point lies at the ground, thinning up to `depth`
// metres above it, so it pools on the floor and round the feet of trees, rocks and creatures and leaves their tops clear.
// A slow noise drifts through it with the wind; it thins near every partified area (the party's warmth burns it off),
// and fades as she rises to the treetops.
import * as THREE from "three";
import { VALUE_NOISE_GLSL } from "./shaders";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_GLSL, HEIGHT_UNIFORMS } from "./height";

/** How many partified areas thin it at once (the nearest). */
export const FOG_PARTIES = 8;

export interface GroundFogTuning {
  on: boolean;
  /** How thick at the ground (0 to 1). */
  density: number;
  /** How high it reaches (m above the ground). */
  depth: number;
  /** How fast it drifts, times the wind's speed. */
  drift: number;
  /** Its patches' size (m). */
  size: number;
  /** Round a partified area's centre: clear within `clear` m, back to full by `reach` m. */
  clear: number;
  reach: number;
  /** How much is left over the treetops (0 to 1). */
  treetops: number;
  /** Round her: clear within `part` m, full by twice that. */
  part: number;
}

const VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const FRAG = /* glsl */ `
uniform sampler2D uDepth;
uniform mat4 uInvProj, uCamWorld;
uniform vec4 uFog; // density, depth (m), drift (m/s), patch size (m)
uniform vec4 uFog2; // lift (0 ground, 1 treetops), what's left over the treetops, clear (m), reach (m)
uniform vec3 uParties[${FOG_PARTIES}]; // x, z, on (0 or 1)
uniform vec4 uHer; // where she is (x, z), and the fog parts round her: clear within z m, full by w m
varying vec2 vUv;
${LIGHT_GLSL}
${HEIGHT_GLSL}
${VALUE_NOISE_GLSL}
void main() {
  float d = texture2D(uDepth, vUv).r;
  if (d >= 1.0) discard; // the sky
  vec4 v = uInvProj * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  vec3 w = (uCamWorld * vec4(v.xyz / v.w, 1.0)).xyz;
  // Unbend (bendW drops what's ahead by curve x d^2: height.ts), then how far above the rolling ground it stands.
  if (uBend.x > 0.0) { float a = max(0.0, dot(w.xz - uBend.yz, uBendFwd)); w.y += uBend.x * a * a; }
  float above = w.y - groundH(w.xz);
  float f = 1.0 - smoothstep(0.0, uFog.y, above);
  if (f <= 0.0) discard;
  vec2 drift = vec2(1.0, 0.3) * uFog.z * uTime;
  float n = vnoise((w.xz + drift) / uFog.w) * 0.65 + vnoise((w.xz - drift * 0.5) / (uFog.w * 0.37) + 7.0) * 0.35;
  float k = smoothstep(0.32, 0.8, n);
  k *= smoothstep(uHer.z, uHer.w, length(w.xz - uHer.xy)); // (she wades through it: her light's pool stays warm)
  // The party burns it off.
  for (int i = 0; i < ${FOG_PARTIES}; i++) { vec3 p = uParties[i]; if (p.z > 0.0) k *= smoothstep(uFog2.z, uFog2.w, length(w.xz - p.xy)); }
  float a = clamp(uFog.x * f * k * mix(1.0, uFog2.y, uFog2.x), 0.0, 0.85);
  if (a <= 0.003) discard;
  vec3 col = mix(uHazeColour * 2.0, uMoon * 0.85 + uAmb * 1.0, 0.6);
  gl_FragColor = vec4(col * a, a); // premultiplied
}`;

export class GroundFog {
  readonly mesh: THREE.Mesh;
  private mat: THREE.ShaderMaterial;
  private parties: THREE.Vector3[] = Array.from({ length: FOG_PARTIES }, () => new THREE.Vector3());

  constructor(private T: GroundFogTuning, depth: THREE.Texture | null) {
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: {
        ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uDepth: { value: depth },
        uInvProj: { value: new THREE.Matrix4() }, uCamWorld: { value: new THREE.Matrix4() },
        uFog: { value: new THREE.Vector4() }, uFog2: { value: new THREE.Vector4() }, uHer: { value: new THREE.Vector4() }, uParties: { value: this.parties },
      },
      depthWrite: false, depthTest: false, transparent: true,
      blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 3; // (over the low mist)
  }

  /** A frame: the camera that draws the scene, where she is, how far she's risen (0 ground, 1 treetops), the wind's speed, and the
   *  where she is, the partified areas' centres nearest first (at most FOG_PARTIES are read). */
  update(camera: THREE.Camera, x: number, z: number, lift: number, wind: number, parties: readonly { x: number; z: number }[]): void {
    const T = this.T, u = this.mat.uniforms;
    camera.updateMatrixWorld(); // (this frame's, not the last's)
    u.uInvProj.value.copy((camera as THREE.PerspectiveCamera).projectionMatrixInverse);
    u.uCamWorld.value.copy(camera.matrixWorld);
    u.uFog.value.set(T.density, Math.max(0.1, T.depth), T.drift * wind, Math.max(1, T.size));
    u.uFog2.value.set(lift, T.treetops, T.clear, Math.max(T.clear + 1, T.reach));
    u.uHer.value.set(x, z, T.part, Math.max(T.part * 2, T.part + 0.5));
    for (let i = 0; i < FOG_PARTIES; i++) { const p = parties[i]; if (p) this.parties[i].set(p.x, p.z, 1); else this.parties[i].set(0, 0, 0); }
  }
}
