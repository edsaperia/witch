import { afterEach, expect, it } from 'vitest';
import type { Game } from '../rules/game';
import { potionRecipe } from '../rules/potionRecipes';
import { potionSettingsSnapshot, resetPotionSettings, setPotionSetting } from '../rules/potionSettings';
import { nightVisionLevels, potionStrength } from './potionEffects';

afterEach(() => resetPotionSettings('night-vision'));
it('reveals low-light detail with existing tone maths and restores normal levels on expiry and replacement', () => {
  const recipe = potionRecipe(['orange', 'blue', 'red'])!;
  expect(recipe.id).toBe(26); expect(recipe.comingSoon).toBe(false);
  const game = { witches: [{ id: 0 }], clock: { time: 0 }, mushrooms: { trips: { 0: { key: recipe.key, at: 0, until: 600 } } } } as unknown as Game;
  const baseline = Object.freeze({ black: .05, gamma: 1.2, grade: .8 });
  const levels = () => nightVisionLevels(baseline.black, baseline.gamma, baseline.grade, potionStrength(game, 'night-vision'));
  expect(levels().black).toBe(0); expect(levels().gamma).toBeCloseTo(.4); expect(levels().grade).toBeCloseTo(.16);
  const tone = (value: number, black: number, gamma: number) => Math.pow(Math.max(0, Math.min(1, (value - black) / (1 - black))), gamma);
  expect(tone(.02, levels().black, levels().gamma)).toBeGreaterThan(.2);
  expect(tone(.02, baseline.black, baseline.gamma)).toBe(0);
  game.clock.time = 480; expect(levels().black).toBe(0);
  game.clock.time = 540; expect(levels().black).toBeCloseTo(.025); expect(levels().gamma).toBeCloseTo(.8);
  game.clock.time = 600; expect(levels()).toEqual(baseline);
  game.clock.time = 10; game.mushrooms.trips[0].key = 'blue+blue+white'; expect(levels()).toEqual(baseline);
});
it('copies live lab controls and can return neutral adjustments without accumulating changes', () => {
  setPotionSetting('night-vision', 'brightness', 1); setPotionSetting('night-vision', 'blackFloor', .05); setPotionSetting('night-vision', 'grade', 1);
  expect(nightVisionLevels(.05, 1.2, .8, 1)).toEqual({ black: .05, gamma: 1.2, grade: .8 });
  expect(potionSettingsSnapshot().effects['night-vision']).toEqual({ brightness: 1, blackFloor: .05, grade: 1 });
});
