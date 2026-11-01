import { expect, it } from 'vitest';
import * as THREE from 'three';
import { MushroomGlow } from './mushroomGlow';
import { MUSHROOM_COLOURS } from './mushroomArt';
import knobs from '../../config/playtest-render.json';

it('removes complementary light and emits each patch’s own colour on the same silhouette', () => {
  const glow = new MushroomGlow();
  const colours = ['blue', 'red', 'turquoise'];
  glow.set(colours.map((type, i) => ({ x: i, z: 0, h: 1, radius: 3, type })));
  const pool = glow.mesh.children[0] as THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;
  expect(pool.geometry).toBe(glow.mesh.geometry);
  expect(pool.material.blending).toBe(THREE.AdditiveBlending);
  expect(pool.material.uniforms.strength.value).toBe(knobs.mushroomPoolStrength);
  const subtract = glow.mesh.material as THREE.ShaderMaterial;
  expect(subtract.blendEquation).toBe(THREE.ReverseSubtractEquation);
  expect(subtract.uniforms.strength.value).toBe(knobs.mushroomHaloStrength);
  const attr = pool.geometry.getAttribute('ownColour');
  colours.forEach((type, i) => {
    const expected = new THREE.Color(MUSHROOM_COLOURS[type]);
    expect(attr.getX(i)).toBeCloseTo(expected.r);
    expect(attr.getY(i)).toBeCloseTo(expected.g);
    expect(attr.getZ(i)).toBeCloseTo(expected.b);
  });
  glow.set([]);
  expect(glow.mesh.visible).toBe(false);
  glow.dispose();
});
