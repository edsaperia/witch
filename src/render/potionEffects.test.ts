import { describe, expect, it } from 'vitest';
import type { Game } from '../rules/game';
import { POTION_RECIPES } from '../rules/potionRecipes';
import { potionBend, potionBloom, potionStrength, potionCamera, potionLevels, vertigoAmount } from './potionEffects';
import { HEIGHT_UNIFORMS, bendPoint } from './height';
import * as THREE from 'three';
import { Sky } from './sky';
import { Ground } from './ground';
import type { MoonState } from '../rules/moon';

describe('view-only potion parameters', () => {
  it('uses only the local witch, starts on wake, fades on game time and resets on replacement', () => {
    const glow = POTION_RECIPES.find(r => r.effect === 'glow-up')!;
    const ravine = POTION_RECIPES.find(r => r.effect === 'ravine')!;
    const trip = { key: glow.key, recipe: glow.recipe, at: 100, until: 700 };
    const g = { witches: [{ id: 4 }], clock: { time: 99 }, mushrooms: { trips: { 4: trip } } } as unknown as Game;
    expect(potionStrength(g, 'glow-up')).toBe(0);
    g.clock.time = 100; expect(potionStrength(g, 'glow-up')).toBe(1);
    g.clock.time = 580; expect(potionStrength(g, 'glow-up')).toBe(1);
    g.clock.time = 640; expect(potionStrength(g, 'glow-up')).toBe(.5);
    g.mushrooms.trips[4] = { ...trip, key: ravine.key };
    expect(potionStrength(g, 'glow-up')).toBe(0);
    expect(potionStrength(g, 'ravine')).toBe(.5);
    g.clock.time = 700; expect(potionStrength(g, 'ravine')).toBe(0);
    delete g.mushrooms.trips[4]; expect(potionStrength(g, 'ravine')).toBe(0);
  });

  it('restores exact baseline parameters without changing the saved settings', () => {
    const baseline = Object.freeze({ threshold: .8, strength: .6, bend: .0005 });
    expect(potionBloom(baseline.threshold, baseline.strength, 1).threshold).toBe(0);
    expect(potionBloom(baseline.threshold, baseline.strength, 0)).toEqual({ threshold: .8, strength: .6 });
    expect(potionBend(baseline.bend, .001, 1, 0)).toBeLessThan(0);
    expect(potionBend(baseline.bend, .001, 0, 1)).toBeGreaterThan(baseline.bend);
    expect(potionBend(baseline.bend, .001, 0, 0)).toBe(baseline.bend);
  });

  it('bends CPU positions upward for ravines, matching the signed shader equation', () => {
    const oldBend = HEIGHT_UNIFORMS.uBend.value.clone(), oldForward = HEIGHT_UNIFORMS.uBendFwd.value.clone();
    try {
      HEIGHT_UNIFORMS.uBend.value.set(-.002, 10, 20, 0);
      HEIGHT_UNIFORMS.uBendFwd.value.set(0, -1);
      expect(bendPoint({ x: 10, y: 3, z: -80 }).y).toBe(23);
      expect(bendPoint({ x: 10, y: 3, z: 30 }).y).toBe(3);
      HEIGHT_UNIFORMS.uBend.value.x = 0;
      expect(bendPoint({ x: 10, y: 3, z: -80 }).y).toBe(3);
    } finally {
      HEIGHT_UNIFORMS.uBend.value.copy(oldBend); HEIGHT_UNIFORMS.uBendFwd.value.copy(oldForward);
    }
  });
  it('keeps vertigo grounded when landed and restores the exact camera and grade on expiry', () => {
    expect(vertigoAmount(1, 0)).toBe(0);
    expect(vertigoAmount(.5, 1)).toBe(.5);
    expect(vertigoAmount(0, 1)).toBe(0);
    expect(potionCamera(35, 80, 50, 0)).toEqual({ angle: 35, distance: 80, fov: 50 });
    const high = potionCamera(35, 80, 50, 1);
    expect(high.angle).toBeGreaterThan(35); expect(high.distance).toBeGreaterThan(80); expect(high.fov).toBe(80);
    expect(potionLevels(.03, 1, 0)).toEqual({ black: .03, gamma: 1, saturation: 1 });
    expect(potionLevels(.03, 1, 1).saturation).toBeGreaterThan(1);
    expect(potionLevels(.03, 1, 1).black).toBeGreaterThan(.03);
  });
  it('restores moon glow and sky ordering after a trip, while the transparent floor retains depth', () => {
    const sky = new Sky({ on: true, stars: 1, moon: .8 }, 2);
    const moon: MoonState = { x: .5, y: .7, phase: .5, lit: 1, arc: .5, kind: 'plain', colour: 0, rgb: [1, 1, 1] };
    const material = sky.mesh.material as THREE.ShaderMaterial;
    sky.potionMoon = 10; sky.potionMoonGlow = 6; sky.potionFloor = 1;
    sky.update(.001, 0, 0, 200, 100, moon);
    expect(material.uniforms.uSky.value.z).toBe(20);
    expect(material.uniforms.uSky.value.y).toBeCloseTo(4.8);
    expect(sky.mesh.renderOrder).toBe(-100); expect(material.depthTest).toBe(false);
    sky.potionMoon = 1; sky.potionMoonGlow = 1; sky.potionFloor = 0;
    sky.update(.001, 0, 0, 200, 100, moon);
    expect(material.uniforms.uSky.value.z).toBe(2);
    expect(material.uniforms.uSky.value.y).toBe(.8);
    expect(sky.mesh.renderOrder).toBe(9); expect(material.depthTest).toBe(true);
    const plain = new THREE.ShaderMaterial({ uniforms: { uPotionSky: { value: 0 } } });
    const beach = plain.clone(), mesh = new THREE.Mesh();
    const floor = { plain, beach, mesh } as unknown as Ground;
    for (const strength of [1, .5, 0]) {
      Ground.prototype.potionSky.call(floor, strength);
      expect(plain.depthWrite).toBe(true); expect(beach.depthWrite).toBe(true);
      expect(plain.uniforms.uPotionSky.value).toBe(strength);
      expect(plain.transparent).toBe(false);
      expect(plain.blending).toBe(strength > 0 ? THREE.CustomBlending : THREE.NormalBlending);
    }
    expect(mesh.renderOrder).toBe(-1); // Restore the ordinary ground pass before stump and court decals.
    sky.mesh.geometry.dispose(); material.dispose(); plain.dispose(); beach.dispose(); mesh.geometry.dispose();
  });
});
