// Subtractive colour halos: remove the complementary light from the background rather than bleaching it with additive light.
import renderKnobs from '../../config/playtest-render.json';
import * as THREE from 'three';
import { HEIGHT_GLSL, HEIGHT_UNIFORMS } from './height';
import { SPRITE_UNIFORMS } from './sprites';
import { MUSHROOM_COLOURS } from './mushroomArt';

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
export interface MushroomHalo { x: number; z: number; h: number; radius: number; type: string }
export class MushroomGlow {
  readonly mesh: THREE.Mesh;
  private readonly geometry: THREE.InstancedBufferGeometry;
  private readonly material: THREE.ShaderMaterial;
  private readonly poolMaterial: THREE.ShaderMaterial;
  private capacity = 0;
  constructor() {
    this.geometry = new THREE.InstancedBufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1,-1,0, 1,-1,0, 1,1,0, -1,1,0]),3));
    this.geometry.setIndex([0,1,2,0,2,3]);
    this.material = new THREE.ShaderMaterial({
      uniforms: { strength: { value: renderKnobs.mushroomHaloStrength }, ...HEIGHT_UNIFORMS, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp },
      vertexShader: `${HEIGHT_GLSL}
        attribute vec4 halo; attribute vec3 tint; attribute vec3 ownColour; varying vec2 local; varying vec3 colour;
        uniform vec3 uRight,uUp;
        void main(){local=position.xy;colour=tint;
          #ifdef COLOUR_POOL
          colour=ownColour;
          #endif
          vec3 base=onGround(vec3(halo.x,halo.z,halo.y));
          vec3 world=base+uRight*position.x*halo.w+uUp*position.y*halo.w;
          gl_Position=projectionMatrix*viewMatrix*vec4(bendW(world),1.0);
        }`,
      fragmentShader: `uniform float strength; varying vec2 local; varying vec3 colour;
        void main(){float r=length(local);if(r>=1.0)discard;
          float edge=1.0-smoothstep(.24,1.0,r);
          float centre=smoothstep(.05,.32,r);
          gl_FragColor=vec4(colour,strength*edge*centre);
        }`,
      transparent: true, depthWrite: false, depthTest: true, side: THREE.DoubleSide,
    });
    // First remove complementary light, then add the mushroom hue even on black ground.
    this.poolMaterial = this.material.clone();
    this.poolMaterial.uniforms = { ...this.material.uniforms, strength: { value: renderKnobs.mushroomPoolStrength } };
    this.poolMaterial.defines = { COLOUR_POOL: 1 };
    this.poolMaterial.blending = THREE.AdditiveBlending;
    subtractiveMaterial(this.material);
    this.mesh = new THREE.Mesh(this.geometry, this.material); this.mesh.frustumCulled = false; this.mesh.renderOrder = 9.8;
    const pool = new THREE.Mesh(this.geometry, this.poolMaterial);
    pool.frustumCulled = false; pool.renderOrder = 9.9;
    this.mesh.add(pool);
  }
  set(items: MushroomHalo[]): void {
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
    items.forEach((p,i)=>{ h.setXYZW(i,p.x,p.z,p.h,p.radius);c.setXYZ(i,...complement(p.type));rgb.set(MUSHROOM_COLOURS[p.type]);own.setXYZ(i,rgb.r,rgb.g,rgb.b); });
    h.needsUpdate = c.needsUpdate = own.needsUpdate = true;
  }
  dispose(): void { this.geometry.dispose(); this.material.dispose(); this.poolMaterial.dispose(); }
}
