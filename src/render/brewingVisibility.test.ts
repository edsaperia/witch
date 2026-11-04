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
  it('releases texture storage before a panel changes size, without reallocating steady frames', () => {
    installEdLayout(true);
    vi.stubGlobal('document', {createElement: () => { const c = new KitchenCanvas(); c.width = 300; c.height = 150; return c; }});
    const g = newGame(123, smallWorldTuning(TUNING, 'Panel texture lifecycle needs a kitchen state, not island simulation.'));
    g.herTime = 1;
    const draw = new BrewingView(), names = ['halo', 'back', 'front'] as const;
    const panels = draw as unknown as Record<typeof names[number], {canvas: KitchenCanvas; texture: THREE.CanvasTexture; mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>}>;
    const disposed: {name: string; width: number; height: number}[] = [];
    const textures = names.map(name => panels[name].texture);
    for (const name of names) panels[name].texture.addEventListener('dispose', () => { const c = panels[name].canvas; disposed.push({name, width: c.width, height: c.height}); });
    const update = (ppm: number) => draw.update({game: g, mpp: 1 / ppm} as View, (x, z, dx, dy) => ({x: x + dx, y: dy, z}), 0.4);
    try {
      update(6);
      expect(disposed).toEqual(names.map(name => ({name, width: 300, height: 150})));
      const size = {width: panels.back.canvas.width, height: panels.back.canvas.height};
      const versions = textures.map(t => t.version);
      update(6);
      expect(disposed).toHaveLength(3); expect(textures.map(t => t.version)).toEqual(versions);
      g.herTime += 0.1; update(6);
      expect(disposed).toHaveLength(3); // Repainting alone never disposes the GPU storage.
      g.herTime += 0.1; update(7);
      expect(disposed.slice(3)).toEqual(names.map(name => ({name, ...size})));
      names.forEach((name, i) => {
        const panel = panels[name];
        expect(panel.texture).toBe(textures[i]); expect(panel.mesh.material.map).toBe(textures[i]);
        expect(panel.texture.image).toBe(panel.canvas); expect(panel.texture.version).toBeGreaterThan(versions[i]);
      });
      expect(panels.back.canvas.pixels.some((v, i) => i % 4 === 3 && v === 255)).toBe(true);
    } finally { draw.dispose(); }
  });
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
