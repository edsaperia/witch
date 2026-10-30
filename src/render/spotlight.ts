// The Studio microphone's spotlight (Ed, 2026-10-23: "microphone (middle, spotlit)"; the coordinator's follow-up to #1021): a cone of
// warm light from the spot lamp Alpha drew over the mic (art/furniture.js, its `spot` mark) down to a pool on the floor round its
// foot. Cheap for Ed's Intel UHD: one quad in the furniture's own plane, added over what's under it (no light, no shadow map), its
// cone and pool worked out in the shader on whole art pixels and in four steps of brightness, so it reads as pixel art.
import * as THREE from "three";
import { bridgeNativeObject } from "./fx/native";

type V3 = { x: number; y: number; z: number };

/** The pool's half-width (m) on the floor, and the cone's at the lamp; how strong, and its colour (the lamp's warm white). */
const POOL = 1.15, TOP = 0.12, STRENGTH = 0.42;
const COLOUR = new THREE.Color(1, 0.86, 0.6);

const VERT = /* glsl */ `
attribute vec2 q;
varying vec2 vQ;
void main() { vQ = q; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

// (q: the picture's pixels from the mic's floor middle, y down; the lamp at uSpot, the pool's radii uR, the cone's half-width at the top uTop)
const FRAG = /* glsl */ `
uniform vec2 uSpot; uniform vec2 uR; uniform float uTop; uniform vec3 uColour; uniform float uStrength;
varying vec2 vQ;
void main() {
  vec2 p = floor(vQ) + 0.5;
  float t = clamp((p.y - uSpot.y) / max(1.0, -uSpot.y), 0.0, 1.0);
  float half_ = mix(uTop, uR.x, t), cx = mix(uSpot.x, 0.0, t);
  float inCone = step(uSpot.y, p.y) * step(p.y, 0.0);
  float cone = inCone * (1.0 - smoothstep(half_ * 0.55, half_, abs(p.x - cx))) * mix(0.9, 0.5, t);
  float e = length(p / uR);
  float pool = 1.0 - smoothstep(0.45, 1.0, e);
  float a = floor(max(cone, pool * 0.75) * 4.0) / 4.0;
  if (a <= 0.0) discard;
  gl_FragColor = vec4(uColour * a * uStrength, 1.0);
}`;

export class Spotlight {
  readonly mesh: THREE.Mesh;
  private readonly pos = new Float32Array(12);
  private readonly q = new Float32Array(8);
  private readonly mat: THREE.ShaderMaterial;

  constructor() {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute("q", new THREE.BufferAttribute(this.q, 2));
    geo.setIndex([0, 1, 2, 0, 2, 3]);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      uniforms: { uSpot: { value: new THREE.Vector2() }, uR: { value: new THREE.Vector2() }, uTop: { value: 1 }, uColour: { value: COLOUR }, uStrength: { value: STRENGTH } },
    });
    this.mesh = new THREE.Mesh(geo, this.mat);
    bridgeNativeObject(this.mesh,"decorativeGlow");
    this.mesh.frustumCulled = false; this.mesh.visible = false;
  }

  /** A frame: the lamp `spot` in the picture's pixels from the mic's floor middle (y down), `px` pixels a metre across and `ky`
   *  pixels a metre of the plane's depth down, `at` that point of the picture in the world; drawn just after the mic (`order`). */
  place(spot: { x: number; y: number }, px: number, ky: number, at: (dx: number, dy: number) => V3, order: number): void {
    const rx = POOL * px, ry = Math.max(2, POOL * ky), top = Math.max(1, TOP * px);
    const corners: [number, number][] = [[-rx - 1, spot.y - 1], [rx + 1, spot.y - 1], [rx + 1, ry + 1], [-rx - 1, ry + 1]];
    corners.forEach(([dx, dy], i) => { const p = at(dx, dy); this.pos[i * 3] = p.x; this.pos[i * 3 + 1] = p.y; this.pos[i * 3 + 2] = p.z; this.q[i * 2] = dx; this.q[i * 2 + 1] = dy; });
    const geo = this.mesh.geometry;
    (geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (geo.getAttribute("q") as THREE.BufferAttribute).needsUpdate = true;
    const u = this.mat.uniforms;
    (u.uSpot.value as THREE.Vector2).set(spot.x, spot.y); (u.uR.value as THREE.Vector2).set(rx, ry); u.uTop.value = top;
    this.mesh.renderOrder = order; this.mesh.visible = true;
  }

  dispose(): void { this.mesh.geometry.dispose(); this.mat.dispose(); }
}
