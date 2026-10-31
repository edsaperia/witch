import { afterEach, expect, it } from 'vitest';
import type { Game } from '../rules/game';
import { potionRecipe } from '../rules/potionRecipes';
import { potionSettingsSnapshot, resetPotionSettings, setPotionSetting } from '../rules/potionSettings';
import { chunkyPixelSize, potionStrength } from './potionEffects';

afterEach(() => resetPotionSettings('chunky'));
it('makes recipe 11 chunky at wake, fades in pixel steps, and restores the exact original grid', () => {
  const recipe = potionRecipe(['blue', 'purple', 'pink'])!;
  expect(recipe.id).toBe(11); expect(recipe.comingSoon).toBe(false);
  const game = { witches: [{ id: 0 }], clock: { time: 0 }, mushrooms: { trips: { 0: { key: recipe.key, at: 0, until: 600 } } } } as unknown as Game;
  const size = () => chunkyPixelSize(3.2, 1.25, potionStrength(game, 'chunky'));
  expect(size()).toBe(12.8);
  game.clock.time = 480; expect(size()).toBe(12.8);
  game.clock.time = 540; expect(size()).toBe(8);
  game.clock.time = 600; expect(size()).toBe(3.2);
  game.clock.time = 100; delete game.mushrooms.trips[0]; expect(size()).toBe(3.2);
});
it('uses live lab settings, exports them, and preserves telescope resolution when stopped', () => {
  setPotionSetting('chunky', 'multiplier', 6);
  expect(chunkyPixelSize(1.5, 2, 1)).toBe(9);
  expect(potionSettingsSnapshot().effects.chunky.multiplier).toBe(6);
  expect(chunkyPixelSize(1.3, 1.25, 0)).toBe(1.3);
  setPotionSetting('chunky', 'multiplier', 1);
  expect(chunkyPixelSize(1.3, 1.25, 1)).toBe(1.3);
});
