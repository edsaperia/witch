// Shadows on the ground: one flat quad per tree, bush or creature, drawn as one instanced batch.
// With ?fx=smooth (the default) each is a soft ellipse that darkens what's under it (multiply, so
// a lit pool stays lit, only dimmer, and fading into the haze); with ?fx=pixel a dithered one.
// A tree's shadow (off by default) is the size of its crown, laid on the ground where the
// moonlight would throw it. The crown is a camera-facing sprite high up while its shadow lies
// flat, so the two slide past each other as the camera moves: parallax for nothing.
// Small things get a small blob right under them.
import * as THREE from "three";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";

const VERT = /* glsl */ `
attribute vec4 iShadow; // x, z, width, depth (metres); a negative width marks scenery's
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
void main() {
  vLocal = position.xz * 2.0;
  vScenery = iShadow.z < 0.0 ? 1.0 : 0.0;
  vec3 w = vec3(iShadow.x + position.x * abs(iShadow.z), 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`;

const FRAG = /* glsl */ `
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${LIGHT_GLSL}
float bayer(vec2 p) {
  int i = int(mod(p.x, 4.0)) + int(mod(p.y, 4.0)) * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
void main() {
  float r = dot(vLocal, vLocal);
  if (r > 1.0) discard;
  float a = uStrength * (1.0 - r * r) * (vScenery > 0.5 ? sceneryFade(vWorld) : 1.0); // fading with its scenery
  if (uSmooth > 0.5) {
    float h = smoothstep(uHazeRange.x, uHazeRange.y, length(vWorld.xz - uHazeCentre));
    gl_FragColor = vec4(mix(vec3(1.0 - a * (1.0 - r)), vec3(1.0), h * h), 1.0); // multiplied over the ground
    return;
  }
  if (bayer(gl_FragCoord.xy) >= a) discard;
  gl_FragColor = vec4(haze(uHazeColour * 0.25, vWorld), 1.0);
}`;

/** scenery: a tree's or bush's, fading out with it at the scenery budget's edge. */
export interface ShadowInstance { x: number; z: number; w: number; d: number; scenery?: boolean }

export class ShadowBatch {
  readonly mesh: THREE.Mesh;
  private geo = new THREE.InstancedBufferGeometry();
  private attr: THREE.InstancedBufferAttribute;
  private capacity = 0;

  constructor(strength: number, smooth = true) {
    const quad = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    this.geo.index = quad.index;
    this.geo.setAttribute("position", quad.getAttribute("position"));
    this.attr = this.grow(1024);
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...LIGHT_UNIFORMS, uStrength: { value: strength } }, depthWrite: false,
      ...(smooth ? { transparent: true, blending: THREE.CustomBlending, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor } : {}) });
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
    this.attr.needsUpdate = true;
    this.geo.instanceCount = items.length;
    this.mesh.visible = items.length > 0;
  }
}
