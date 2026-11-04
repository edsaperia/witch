// Ed, 2026-11-03: "the cauldron should be drawn on top of the witch". The house draws with no depth, in renderOrder, and her room
// pass (HOUSE_WITCH_OVERLAY_ORDER) comes after all of it; the kitchen's cauldron and baskets whose foot is south of hers (nearer the
// camera) are painted on their own panel drawn after her (render/houseWitchPass.ts inFrontOfHer), the rest stay behind her.
import {afterEach, describe, expect, it, vi} from 'vitest';
import {KitchenCanvas} from '../test/kitchenCanvas';
import {newGame} from '../rules/game';
import {smallWorldTuning} from '../test/worlds';
import {TUNING} from '../rules/tuning';
import {fromPlan, installEdLayout} from '../rules/houseRooms';
import {kitchenPlan} from '../rules/mushrooms';
import {edLayoutRequested} from '../rules/housePlacement';
import {BrewingView} from './brewing';
import {brewingFrame} from './brewingFrame';
import {HOUSE_OVER_HER_ORDER, HOUSE_WITCH_OVERLAY_ORDER, inFrontOfHer} from './houseWitchPass';
import type {View} from './view';
import type * as THREE from 'three';

type Panel = {canvas: KitchenCanvas; mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>};
const PPM = 6, PITCH = 0.4;
const opaque = (c: KitchenCanvas, x: number, y: number) => c.pixels[(Math.round(y) * c.width + Math.round(x)) * 4 + 3] === 255;
const count = (c: KitchenCanvas) => c.pixels.filter((v, i) => i % 4 === 3 && v === 255).length;
/** A plan point `by` metres south of (x, z) (negative: north), whatever the plan's turn. */
const southOf = (q: {x: number; z: number}, by: number) => {
  const o = fromPlan({x: 0, z: 0}, 0, 0).z, gx = fromPlan({x: 0, z: 0}, 1, 0).z - o, gz = fromPlan({x: 0, z: 0}, 0, 1).z - o, n = Math.hypot(gx, gz);
  return {x: q.x + by * gx / n, z: q.z + by * gz / n};
};

afterEach(() => {installEdLayout(false); vi.unstubAllGlobals();});
describe('the kitchen props in front of her draw over her', () => {
  it('orders the in-front panel after her room pass and before the smoke; the rest before her', () => {
    vi.stubGlobal('document', {createElement: () => new KitchenCanvas()});
    const draw = new BrewingView(), panels = draw as unknown as Record<'halo' | 'back' | 'over' | 'front', Panel>;
    expect(panels.over.mesh.renderOrder).toBe(HOUSE_OVER_HER_ORDER);
    expect(HOUSE_OVER_HER_ORDER).toBeGreaterThan(HOUSE_WITCH_OVERLAY_ORDER);
    expect(HOUSE_OVER_HER_ORDER).toBeLessThan(panels.front.mesh.renderOrder);
    for (const k of ['halo', 'back'] as const) expect(panels[k].mesh.renderOrder).toBeLessThan(HOUSE_WITCH_OVERLAY_ORDER);
    expect(panels.over.mesh.material.depthTest).toBe(false);
    draw.dispose();
  });
  it('is the painter\'s rule: in front only when its foot is south of hers', () => {
    expect(inFrontOfHer(5, 4.9)).toBe(true);
    expect(inFrontOfHer(5, 5)).toBe(false);
    expect(inFrontOfHer(5, 7)).toBe(false);
    expect(inFrontOfHer(5, null)).toBe(false);
  });
  for (const authored of [false, true]) it(`moves the cauldron over her as she goes behind it, and back as she comes in front (${authored ? 'Dining' : 'classic'} layout)`, () => {
    installEdLayout(authored);
    vi.stubGlobal('document', {createElement: () => new KitchenCanvas()});
    const g = newGame(123, smallWorldTuning(TUNING, 'Kitchen panel split needs one house, not a full island.'));
    g.herTime = 1;
    const layout = kitchenPlan()!, pot = layout.cauldron, draw = new BrewingView(), panels = draw as unknown as Record<'back' | 'over', Panel>;
    const {ox, oy} = brewingFrame(layout, PPM, PITCH, edLayoutRequested());
    // (the iron bowl's middle on the panels: render/brewingProps.ts paintKitchenCauldron)
    const bowl = [ox + (pot.x - layout.room.x) * PPM, oy + (pot.z - layout.room.z) * PITCH * PPM - 2.9 * PPM];
    const update = (her: {x: number; z: number} | null) => { g.herTime += 0.25; draw.update({game: g, mpp: 1 / PPM} as View, (x, z, dx, dy) => ({x: x + dx, y: dy, z}), PITCH, her); };
    try {
      update(null); // (not in the house: everything behind, as before)
      const all = count(panels.back.canvas);
      expect(opaque(panels.back.canvas, bowl[0], bowl[1])).toBe(true); expect(count(panels.over.canvas)).toBe(0);
      update(southOf(pot, 0.5)); // (just in front of the pot, every basket too: Ed's layout has them nearer the camera)
      expect(opaque(panels.back.canvas, bowl[0], bowl[1])).toBe(true); expect(opaque(panels.over.canvas, bowl[0], bowl[1])).toBe(false);
      update(southOf(pot, -3)); // (behind it, where Ed stood: the pot over her)
      expect(opaque(panels.over.canvas, bowl[0], bowl[1])).toBe(true); expect(opaque(panels.back.canvas, bowl[0], bowl[1])).toBe(false);
      const southBaskets = layout.baskets.filter(b => fromPlan({x: 0, z: 0}, b.x, b.z).z > fromPlan({x: 0, z: 0}, pot.x, pot.z).z - 3).length;
      if (southBaskets === layout.baskets.length) expect(count(panels.back.canvas)).toBe(0);
      update(southOf(pot, -200)); // (far behind everything: all of it over her, nothing lost)
      expect(count(panels.back.canvas)).toBe(0); expect(count(panels.over.canvas)).toBe(all);
      update(southOf(pot, 200)); // (far in front: all of it behind her)
      expect(count(panels.over.canvas)).toBe(0); expect(count(panels.back.canvas)).toBe(all);
    } finally { draw.dispose(); }
  });
});
