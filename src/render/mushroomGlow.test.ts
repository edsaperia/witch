import { expect, it } from 'vitest';
import * as THREE from 'three';
import { MushroomGlow } from './mushroomGlow';
import { MUSHROOM_COLOURS } from './mushroomArt';
import knobs from '../../config/playtest-render.json';
import {MUSHROOM_LIGHT_DEFAULTS} from '../rules/mushroomLight';

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
  glow.set([{x: 3, z: 4, h: 2, radius: 5, type: 'red'}], {...MUSHROOM_LIGHT_DEFAULTS, haloStrength: 0.3, poolStrength: 0.1, radius: 2, height: 0.5, complement: 0});
  expect(subtract.uniforms.strength.value).toBe(0.3); expect(pool.material.uniforms.strength.value).toBe(0.1);
  const halo = pool.geometry.getAttribute('halo'); expect([halo.getX(0), halo.getY(0), halo.getZ(0), halo.getW(0)]).toEqual([3, 4, 1, 10]);
  const tint = pool.geometry.getAttribute('tint'); expect([tint.getX(0), tint.getY(0), tint.getZ(0)]).toEqual([0, 0, 0]);
  glow.set([]);
  expect(glow.mesh.visible).toBe(false);
  glow.dispose();
});
