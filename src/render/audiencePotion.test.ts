import { afterEach, expect, it } from 'vitest';
import type { Game } from '../rules/game';
import { POTION_RECIPES } from '../rules/potionRecipes';
import { potionSettingsSnapshot, resetPotionSettings, setPotionSetting } from '../rules/potionSettings';
import { potionStrength, potionWatching } from './potionEffects';

afterEach(() => resetPotionSettings('the-audience'));
const base = Object.freeze({on:true,radius:9,lean:.35,lag:.45});
it('enables recipe 64 and restores the original watching settings over the last two game minutes', () => {
  const recipe = POTION_RECIPES.find(r=>r.id===64)!;
  expect(recipe.key).toBe('green+purple+red'); expect(recipe.comingSoon).toBe(false);
  const g = {witches:[{id:0}],clock:{time:0},mushrooms:{trips:{0:{key:recipe.key,at:0,until:600}}}} as unknown as Game;
  const watch=()=>potionWatching(base,potionStrength(g,'the-audience'));
  expect(watch()).toEqual({on:true,radius:35,lean:4,lag:2});
  g.clock.time=480; expect(watch().lean).toBe(4);
  g.clock.time=540; expect(watch().lean).toBeCloseTo(2.175); expect(watch().radius).toBe(22);
  g.clock.time=600; expect(watch()).toBe(base);
  g.clock.time=20; g.mushrooms.trips[0].key='blue+blue+white'; expect(watch()).toBe(base);
});
it('temporarily enables a disabled watcher and fades its lean to zero without mutating tuning', () => {
  const disabled=Object.freeze({...base,on:false});
  expect(potionWatching(disabled,1).on).toBe(true);
  expect(potionWatching(disabled,.001).lean).toBeCloseTo(.004);
  expect(potionWatching(disabled,0)).toBe(disabled);
  expect(potionWatching(undefined,0).on).toBe(false);
  expect(potionWatching(undefined,1).lean).toBe(4);
});
it('exposes bounded local settings and copies independent values', () => {
  setPotionSetting('the-audience','lean',99); setPotionSetting('the-audience','lag',0);
  const copy=potionSettingsSnapshot();
  expect(copy.effects['the-audience']).toEqual({radius:35,lean:12,lag:.05});
  copy.effects['the-audience'].lean=0;
  expect(potionWatching(base,1).lean).toBe(12);
  expect(base).toEqual({on:true,radius:9,lean:.35,lag:.45});
});
