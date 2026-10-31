import { afterEach, expect, it } from 'vitest';
import type { Game } from '../rules/game';
import { potionRecipe } from '../rules/potionRecipes';
import { potionSettingsSnapshot, resetPotionSettings, setPotionSetting } from '../rules/potionSettings';
import { potionStrength, wormsEyeCamera } from './potionEffects';

afterEach(() => resetPotionSettings('worm-s-eye'));
it('lowers recipe 45 on waking, fades on game time, and restores normal framing on expiry or replacement', () => {
  const recipe = potionRecipe(['white', 'blue', 'white'])!;
  expect(recipe.id).toBe(45); expect(recipe.comingSoon).toBe(false);
  const game = { witches: [{ id: 0 }], clock: { time: 0 }, mushrooms: { trips: { 0: { key: recipe.key, at: 0, until: 600 } } } } as unknown as Game;
  const camera = () => wormsEyeCamera(45, 80, potionStrength(game, 'worm-s-eye'));
  expect(camera()).toEqual({ angle: 3, distance: 32 });
  // At this distance the camera is less than two metres above its focus.
  expect(Math.sin(camera().angle * Math.PI / 180) * camera().distance).toBeLessThan(2);
  game.clock.time = 480; expect(camera()).toEqual({ angle: 3, distance: 32 });
  game.clock.time = 540; expect(camera()).toEqual({ angle: 24, distance: 56 });
  game.clock.time = 600; expect(camera()).toEqual({ angle: 45, distance: 80 });
  game.clock.time = 10; game.mushrooms.trips[0].key = 'blue+blue+white';
  expect(camera()).toEqual({ angle: 45, distance: 80 });
});
it('uses and copies live lab controls without mutating the normal camera values', () => {
  setPotionSetting('worm-s-eye', 'angle', 10); setPotionSetting('worm-s-eye', 'distance', .5);
  expect(wormsEyeCamera(45, 80, 1)).toEqual({ angle: 10, distance: 40 });
  expect(wormsEyeCamera(45, 80, 0)).toEqual({ angle: 45, distance: 80 });
  expect(potionSettingsSnapshot().effects['worm-s-eye']).toEqual({ angle: 10, distance: .5 });
});
