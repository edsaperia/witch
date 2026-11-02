// Subtractive colour halos: remove the complementary light from the background rather than bleaching it with additive light.
import * as THREE from 'three';
import { HEIGHT_GLSL, HEIGHT_UNIFORMS } from './height';
import { MUSHROOM_COLOURS } from './mushroomArt';
import { MUSHROOM_LIGHT_DEFAULTS, type MushroomLight } from '../rules/mushroomLight';

export function subtractiveMaterial(material: THREE.Material): void {
  material.blending = THREE.CustomBlending;
  material.blendEquation = THREE.ReverseSubtractEquation;
  material.blendSrc = THREE.SrcAlphaFactor; material.blendDst = THREE.OneFactor;
  material.blendEquationAlpha = THREE.AddEquation;
  material.blendSrcAlpha = THREE.ZeroFactor; material.blendDstAlpha = THREE.OneFactor;
}
export function complement(type: string): [number, number, number] {
  const c = new THREE.Color(MUSHROOM_COLOURS[type]);
  if (type === 'white') return [.18, .18, .18];
  const max = Math.max(c.r, c.g, c.b, .001);
  return [1 - c.r / max, 1 - c.g / max, 1 - c.b / max];
}
export interface MushroomHalo { x: number; z: number; radius: number; type: string }
/** The halo lies flat on the ground like the other ground decals (render/leash/glyphs.ts's uFlat: onGround per vertex), lifted
 *  this many metres a unit of mushroomLight.height so it stays clear of the ground's surface (Ed, 2026-11-02: "doesn't sit parallel
 *  to the floor, so the bottom of it is cut off, and it's not foreshortened"). */
export const HALO_LIFT = 0.04;
/** Segments a side of the halo's ground disc: each vertex is set on the ground, so it follows rises and dips under a wide halo. */
const HALO_SEGMENTS = 8;
/** The halo's unit disc in the ground plane: x and z in -1..1, y 0 (lifted onto the ground per vertex in the shader). */
export function haloDisc(n = HALO_SEGMENTS): THREE.BufferGeometry {
  const position: number[] = [], index: number[] = [];
  for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) position.push(-1 + 2 * i / n, 0, -1 + 2 * j / n);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const a = j * (n + 1) + i, b = a + 1, c = a + n + 1, d = c + 1; index.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(position, 3)); g.setIndex(index);
  return g;
}
export class MushroomGlow {
  readonly mesh: THREE.Mesh;
  private readonly geometry: THREE.InstancedBufferGeometry;
  private readonly material: THREE.ShaderMaterial;
  private readonly poolMaterial: THREE.ShaderMaterial;
  private capacity = 0;
  constructor() {
    this.geometry = new THREE.InstancedBufferGeometry();
    const disc = haloDisc();
    this.geometry.setAttribute('position', disc.getAttribute('position'));
    this.geometry.setIndex(disc.getIndex());
    this.material = new THREE.ShaderMaterial({
      uniforms: { strength: { value: MUSHROOM_LIGHT_DEFAULTS.haloStrength }, ...HEIGHT_UNIFORMS },
      vertexShader: `${HEIGHT_GLSL}
        attribute vec4 halo; attribute vec3 tint; attribute vec3 ownColour; varying vec2 local; varying vec3 colour;
        // halo: x, z, lift above the ground, radius. Flat on the ground, each vertex set onto it (foreshortened by the camera).
        void main(){local=position.xz;colour=tint;
          #ifdef COLOUR_POOL
          colour=ownColour;
          #endif
          vec3 world=onGround(vec3(halo.x+position.x*halo.w,halo.z,halo.y+position.z*halo.w));
          gl_Position=projectionMatrix*viewMatrix*vec4(bendW(world),1.0);
        }`,
      fragmentShader: `uniform float strength; varying vec2 local; varying vec3 colour;
        void main(){float r=length(local);if(r>=1.0)discard;
          float edge=1.0-smoothstep(.24,1.0,r);
          float centre=smoothstep(0.0,.12,r); // (just a soft centre under the stem: the cap itself is kept clear by its depth)
          gl_FragColor=vec4(colour,strength*edge*centre);
        }`,
      transparent: true, depthWrite: false, depthTest: true, side: THREE.DoubleSide,
    });
    // First remove complementary light, then add the mushroom hue even on black ground.
    this.poolMaterial = this.material.clone();
    this.poolMaterial.uniforms = { ...this.material.uniforms, strength: { value: MUSHROOM_LIGHT_DEFAULTS.poolStrength } };
    this.poolMaterial.defines = { COLOUR_POOL: 1 };
    this.poolMaterial.blending = THREE.AdditiveBlending;
    subtractiveMaterial(this.material);
    this.mesh = new THREE.Mesh(this.geometry, this.material); this.mesh.frustumCulled = false; this.mesh.renderOrder = 9.8;
    const pool = new THREE.Mesh(this.geometry, this.poolMaterial);
    pool.frustumCulled = false; pool.renderOrder = 9.9;
    this.mesh.add(pool);
  }
  set(items: MushroomHalo[], settings: MushroomLight = MUSHROOM_LIGHT_DEFAULTS): void {
    this.material.uniforms.strength.value = settings.haloStrength;
    this.poolMaterial.uniforms.strength.value = settings.poolStrength;
    if (items.length > this.capacity) {
      this.capacity = Math.max(items.length, 16);
      this.geometry.dispose();
      this.geometry.setAttribute('halo', new THREE.InstancedBufferAttribute(new Float32Array(this.capacity * 4), 4));
      this.geometry.setAttribute('ownColour', new THREE.InstancedBufferAttribute(new Float32Array(this.capacity * 3), 3));
      this.geometry.setAttribute('tint', new THREE.InstancedBufferAttribute(new Float32Array(this.capacity * 3), 3));
    }
    this.mesh.visible = items.length > 0; this.geometry.instanceCount = items.length;
    if (!items.length) return;
    const h = this.geometry.getAttribute('halo') as THREE.InstancedBufferAttribute, c = this.geometry.getAttribute('tint') as THREE.InstancedBufferAttribute;
    const own = this.geometry.getAttribute('ownColour') as THREE.InstancedBufferAttribute;
    const rgb = new THREE.Color();
    items.forEach((p,i)=>{ h.setXYZW(i,p.x,p.z,HALO_LIFT * settings.height,p.radius * settings.radius);c.setXYZ(i,...complement(p.type).map(v => v * settings.complement) as [number, number, number]);rgb.set(MUSHROOM_COLOURS[p.type]);own.setXYZ(i,rgb.r,rgb.g,rgb.b); });
    h.needsUpdate = c.needsUpdate = own.needsUpdate = true;
  }
  dispose(): void { this.geometry.dispose(); this.material.dispose(); this.poolMaterial.dispose(); }
}
