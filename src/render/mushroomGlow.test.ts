import { expect, it } from 'vitest';
import * as THREE from 'three';
import { HALO_LIFT, MushroomGlow } from './mushroomGlow';
import { MUSHROOM_COLOURS } from './mushroomArt';
import {MUSHROOM_LIGHT_DEFAULTS} from '../rules/mushroomLight';

it('removes complementary light and emits each patch’s own colour on the same silhouette', () => {
  const glow = new MushroomGlow();
  const colours = ['blue', 'red', 'turquoise'];
  glow.set(colours.map((type, i) => ({ x: i, z: 0, radius: 3, type })));
  const pool = glow.mesh.children[0] as THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;
  expect(pool.geometry).toBe(glow.mesh.geometry);
  expect(pool.material.blending).toBe(THREE.AdditiveBlending);
  expect(pool.material.uniforms.strength.value).toBe(MUSHROOM_LIGHT_DEFAULTS.poolStrength);
  const subtract = glow.mesh.material as THREE.ShaderMaterial;
  expect(subtract.blendEquation).toBe(THREE.ReverseSubtractEquation);
  expect(subtract.uniforms.strength.value).toBe(MUSHROOM_LIGHT_DEFAULTS.haloStrength);
  const attr = pool.geometry.getAttribute('ownColour');
  colours.forEach((type, i) => {
    const expected = new THREE.Color(MUSHROOM_COLOURS[type]);
    expect(attr.getX(i)).toBeCloseTo(expected.r);
    expect(attr.getY(i)).toBeCloseTo(expected.g);
    expect(attr.getZ(i)).toBeCloseTo(expected.b);
  });
  glow.set([{x: 3, z: 4, radius: 5, type: 'red'}], {...MUSHROOM_LIGHT_DEFAULTS, haloStrength: 0.3, poolStrength: 0.1, radius: 2, height: 0.5, complement: 0});
  expect(subtract.uniforms.strength.value).toBe(0.3); expect(pool.material.uniforms.strength.value).toBe(0.1);
  const halo = pool.geometry.getAttribute('halo'); expect([halo.getX(0), halo.getY(0), halo.getZ(0), halo.getW(0)]).toEqual([3, 4, Math.fround(HALO_LIFT * 0.5), 10]);
  const tint = pool.geometry.getAttribute('tint'); expect([tint.getX(0), tint.getY(0), tint.getZ(0)]).toEqual([0, 0, 0]);
  glow.set([]);
  expect(glow.mesh.visible).toBe(false);
  glow.dispose();
});

it('lies flat on the ground under the mushroom, not standing up facing the camera', () => {
  const glow = new MushroomGlow();
  const pos = glow.mesh.geometry.getAttribute('position');
  const xs: number[] = [], zs: number[] = [];
  for (let i = 0; i < pos.count; i++) { expect(pos.getY(i)).toBe(0); xs.push(pos.getX(i)); zs.push(pos.getZ(i)); }
  // A unit disc spread over the ground plane round the mushroom (x and z both -1..1), cut finely enough to follow the ground.
  expect([Math.min(...xs), Math.max(...xs), Math.min(...zs), Math.max(...zs)]).toEqual([-1, 1, -1, 1]);
  expect(pos.count).toBeGreaterThan(4);
  // Every vertex set onto the ground in world x/z (onGround per vertex, like the flat leash decals), never offset along the camera's axes.
  for (const material of [glow.mesh.material as THREE.ShaderMaterial, (glow.mesh.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>).material]) {
    expect(material.vertexShader).toContain('onGround(vec3(halo.x+position.x*halo.w,halo.z,halo.y+position.z*halo.w))');
    expect(material.vertexShader).not.toMatch(/uRight|uUp/);
    expect(material.uniforms.uRight).toBeUndefined();
  }
  // Its lift is small at any slider setting: a decal on the ground, not a disc hung at the cap.
  glow.set([{x: 0, z: 0, radius: 2, type: 'blue'}], {...MUSHROOM_LIGHT_DEFAULTS, height: 2});
  expect(glow.mesh.geometry.getAttribute('halo').getZ(0)).toBeLessThanOrEqual(0.1);
  glow.dispose();
});
