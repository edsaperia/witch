import { afterEach, expect, it } from 'vitest';
import type { Game } from '../rules/game';
import { POTION_RECIPES } from '../rules/potionRecipes';
import { potionSettingsSnapshot, resetPotionSettings, setPotionSetting } from '../rules/potionSettings';
import { potionStrength, stiltwalkerShape } from './potionEffects';

afterEach(() => resetPotionSettings('stiltwalkers'));
it('replaces Tall Tales without changing either existing recipe ID and fades the leg shape back to normal', () => {
  const recipes = [29,58].map(id => POTION_RECIPES.find(r => r.id === id)!);
  for (const recipe of recipes) {
    expect(recipe.effect).toBe('stiltwalkers'); expect(recipe.comingSoon).toBe(false);
    const game = { witches: [{id:0}], clock:{time:0}, mushrooms:{trips:{0:{key:recipe.key,at:0,until:600}}} } as unknown as Game;
    const shape = () => stiltwalkerShape(potionStrength(game,'stiltwalkers'));
    expect(shape().length).toBe(6); expect(shape().tip).toBeCloseTo(.08);
    game.clock.time=480; expect(shape().length).toBe(6);
    game.clock.time=540; expect(shape().length).toBe(3.5); expect(shape().strength).toBe(.5);
    game.clock.time=600; expect(shape()).toEqual({length:1,tip:1,strength:0});
    game.clock.time=10; game.mushrooms.trips[0].key='blue+blue+white'; expect(shape()).toEqual({length:1,tip:1,strength:0});
  }
});
it('copies adjustable length/taper independently and bounds both controls', () => {
  setPotionSetting('stiltwalkers','length',100); setPotionSetting('stiltwalkers','tip',-1);
  const snapshot=potionSettingsSnapshot();
  expect(snapshot.effects.stiltwalkers).toEqual({length:12,tip:.02});
  snapshot.effects.stiltwalkers.length=2;
  expect(stiltwalkerShape(1).length).toBe(12);
  expect(stiltwalkerShape(0)).toEqual({length:1,tip:1,strength:0});
});
