import { afterEach, expect, it } from 'vitest';
import type { Game } from '../rules/game';
import { hueSpinPhase } from '../rules/potionCycle';
import { POTION_RECIPES } from '../rules/potionRecipes';
import { resetPotionSettings, setPotionSetting } from '../rules/potionSettings';
import { hueRotation, potionStrength } from './potionEffects';
import { potionFilterState } from '../platform/audio/potionFilter';

const recipe = POTION_RECIPES.find(r => r.id === 108)!;
const game = (time = 100) => ({ clock: { time }, witches: [{ id: 4 }], mushrooms: { trips: {
  4: { key: recipe.key, recipe: recipe.recipe, at: 100, until: 700 },
} } } as unknown as Game);
afterEach(() => resetPotionSettings());

it('rotates colours, preserves neutrals and completes a cycle', () => {
  const g = game(), initial = hueRotation(hueSpinPhase(g));
  expect(initial[0]).toBeCloseTo(0); expect(initial[1]).toBeCloseTo(0); expect(initial[2]).toBeCloseTo(1);
  for (let phase = 0; phase < 7; phase += .13) expect(hueRotation(phase).reduce((a,b) => a+b)).toBeCloseTo(1);
  g.clock.time += 20;
  hueRotation(hueSpinPhase(g)).forEach((v, i) => expect(v).toBeCloseTo(initial[i]));
});
it('shares the cycle with existing audio and respects controls and paused game time', () => {
  const g = game(); setPotionSetting('hue-spin', 'offset', 90); setPotionSetting('hue-spin', 'soundDepth', 2);
  expect(potionFilterState(g).low).toBeCloseTo(10400);
  expect(potionFilterState(g)).toEqual(potionFilterState(g));
  g.clock.time += 10; expect(potionFilterState(g).low).toBeCloseTo(650);
  setPotionSetting('hue-spin', 'period', 40); expect(potionFilterState(g).low).toBeCloseTo(2600);
});
it('starts at wake, fades both picture and audio, and clears on Stop or replacement', () => {
  const g = game(99); expect(potionStrength(g, 'hue-spin')).toBe(0);
  g.clock.time = 100; expect(potionStrength(g, 'hue-spin')).toBe(1);
  g.clock.time = 580; expect(potionStrength(g, 'hue-spin')).toBe(1);
  g.clock.time = 640; expect(potionStrength(g, 'hue-spin')).toBe(.5); expect(potionFilterState(g).amount).toBe(.5);
  g.clock.time = 700; expect(potionStrength(g, 'hue-spin')).toBe(0); expect(potionFilterState(g).amount).toBe(0);
  g.clock.time = 100; g.mushrooms.trips[4].key = POTION_RECIPES.find(r => r.id === 102)!.key;
  expect(potionStrength(g, 'hue-spin')).toBe(0); expect(potionFilterState(g).low).toBe(8500);
  delete g.mushrooms.trips[4]; expect(potionStrength(g, 'hue-spin')).toBe(0); expect(potionFilterState(g).amount).toBe(0);
});
