// Shadows on the ground: one flat quad per tree, bush or creature, drawn as one instanced batch.
// Each is a soft ellipse that darkens what's under it (multiply, so a lit pool stays lit, only
// dimmer, and fading into the haze).
// A tree's shadow (off by default) is the size of its crown, laid on the ground where the
// moonlight would throw it. The crown is a camera-facing sprite high up while its shadow lies
// flat, so the two slide past each other as the camera moves: parallax for nothing.
// Small things get a small blob right under them.
import * as THREE from "three";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";

const VERT = /* glsl */ `
attribute vec4 iShadow; // x, z, width, depth (metres); a negative width marks scenery's
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${HEIGHT_VERT_GLSL}
void main() {
  vLocal = position.xz * 2.0;
  vScenery = iShadow.z < 0.0 ? 1.0 : 0.0;
  vec3 w = onGround(vec3(iShadow.x + position.x * abs(iShadow.z), 0.08, iShadow.y + position.z * iShadow.w)); // lying on the rolling ground (point by point; see the PlaneGeometry)
  vWorld = w;
  gl_Position = clipOf(w);
}`;

/** ?debug=shadows: every shadow drawn as a flat magenta tint, so where it lies against what casts it shows plainly. */
export const SHADOW_DEBUG = { value: 0 };

const FRAG = /* glsl */ `
uniform float uStrength, uShadowDebug;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${LIGHT_GLSL}
void main() {
  float r = dot(vLocal, vLocal);
  if (r > 1.0) discard;
  float a = uStrength * (1.0 - r * r) * (vScenery > 0.5 ? sceneryFade(vWorld) : 1.0); // fading with its scenery
  if (uShadowDebug > 0.5) { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); return; }
  float h = smoothstep(uHazeRange.x, uHazeRange.y, length(vWorld.xz - uHazeCentre));
  gl_FragColor = vec4(mix(vec3(1.0 - a * (1.0 - r)), vec3(1.0), h * h), 1.0); // multiplied over the ground
}`;

/** scenery: a tree's or bush's, fading out with it at the scenery budget's edge. */
export interface ShadowInstance { x: number; z: number; w: number; d: number; scenery?: boolean }

export class ShadowBatch {
  readonly mesh: THREE.Mesh;
  private geo = new THREE.InstancedBufferGeometry();
  private attr: THREE.InstancedBufferAttribute;
  private capacity = 0;

  constructor(strength: number) {
    const quad = new THREE.PlaneGeometry(1, 1, 4, 4).rotateX(-Math.PI / 2); // divided, to lie on the slopes
    this.geo.index = quad.index;
    this.geo.setAttribute("position", quad.getAttribute("position"));
    this.attr = this.grow(1024);
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uStrength: { value: strength }, uShadowDebug: SHADOW_DEBUG }, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4,
      transparent: true, blending: THREE.CustomBlending, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
  }

  private grow(n: number): THREE.InstancedBufferAttribute {
    this.capacity = Math.max(n, this.capacity * 2);
    this.geo.dispose(); // or three.js keeps drawing only the old capacity (see SpriteBatch.grow)
    this.attr = new THREE.InstancedBufferAttribute(new Float32Array(this.capacity * 4), 4);
    this.attr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute("iShadow", this.attr);
    return this.attr;
  }

  set(items: ShadowInstance[]): void {
    if (items.length > this.capacity) this.grow(items.length);
    const a = this.attr.array as Float32Array;
    items.forEach((s, i) => { a[i * 4] = s.x; a[i * 4 + 1] = s.z; a[i * 4 + 2] = s.scenery ? -s.w : s.w; a[i * 4 + 3] = s.d; });
    this.attr.clearUpdateRanges(); this.attr.addUpdateRange(0, items.length * 4); // (only those in use)
    this.attr.needsUpdate = true;
    this.geo.instanceCount = items.length;
    this.mesh.visible = items.length > 0;
  }
}
