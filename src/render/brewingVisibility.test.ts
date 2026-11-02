import {afterEach, describe, expect, it, vi} from 'vitest';
import {KitchenCanvas} from '../test/kitchenCanvas';
import {newGame} from '../rules/game';
import {smallWorldTuning} from '../test/worlds';
import {TUNING} from '../rules/tuning';
import {installEdLayout} from '../rules/houseRooms';
import {kitchenPlan} from '../rules/mushrooms';
import {BrewingView} from './brewing';
import type {View} from './view';
import type * as THREE from 'three';

afterEach(() => {installEdLayout(false); vi.unstubAllGlobals();});
describe('kitchen visibility source invariants', () => {
  for (const authored of [false, true]) it(`paints opaque physical props in the ${authored ? 'Dining' : 'classic'} layout, with an empty halo for empty baskets`, () => {
    installEdLayout(authored);
    vi.stubGlobal('document', {createElement: () => new KitchenCanvas()});
    const g = newGame(123, smallWorldTuning(TUNING, 'Kitchen panel placement and RGBA checks need one house, not a full island.'));
    g.herTime = 1;
    const draw = new BrewingView(); draw.update({game: g, mpp: 1 / 6} as View, (x, z, dx, dy) => ({x: x + dx, y: dy, z}), 0.4);
    expect(kitchenPlan().baskets).toHaveLength(9); expect(draw.group.visible).toBe(true);
    const panels = draw as unknown as Record<string, {canvas: KitchenCanvas; mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>}>;
    expect(panels.back.canvas.pixels.filter((v, i) => i % 4 === 3 && v === 255).length).toBeGreaterThan(100);
    expect(panels.halo.canvas.pixels.some(v => v !== 0)).toBe(false);
    for (const key of ['back', 'halo', 'front']) {
      const p = panels[key], position = p.mesh.geometry.getAttribute('position');
      expect([...position.array].every(Number.isFinite)).toBe(true);
      expect(p.mesh.material.opacity).toBe(1); expect(p.mesh.material.depthTest).toBe(false);
      expect(p.canvas.width).toBeGreaterThan(0); expect(p.canvas.height).toBeGreaterThan(0);
    }
    g.mushrooms.baskets.red = 1; g.herTime = 2;
    draw.update({game: g, mpp: 1 / 6} as View, (x, z, dx, dy) => ({x: x + dx, y: dy, z}), 0.4);
    expect(panels.halo.canvas.pixels.some(v => v !== 0)).toBe(true);
    draw.dispose();
  });
});
