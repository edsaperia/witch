import { afterEach, expect, it } from 'vitest';
import * as THREE from 'three';
import type { Game } from '../rules/game';
import { newBeatClock, rampTo, timeAt } from '../rules/beat';
import { forestCountStep, forestCountTime } from '../rules/forestCounts';
import { POTION_RECIPES } from '../rules/potionRecipes';
import { resetPotionSettings, setPotionSetting } from '../rules/potionSettings';
import { potionStrength } from './potionEffects';
import { potionFilterState } from '../platform/audio/potionFilter';
import { Mist } from './mist';
import { LIGHT_UNIFORMS } from './lighting';
const recipe = POTION_RECIPES.find(r => r.id === 73)!;
const game = (time = 0) => ({clock:{time},beat:newBeatClock(120),witches:[{id:0}],mushrooms:{trips:{0:{key:recipe.key,recipe:recipe.recipe,at:0,until:600}}}} as unknown as Game);
afterEach(() => resetPotionSettings());

it('holds scenery and audio between real beats and advances both at the boundary', () => {
  const g=game(.1), first=forestCountStep(g), sound=potionFilterState(g);
  g.clock.time=.49; expect(forestCountStep(g)).toEqual(first); expect(potionFilterState(g)).toEqual(sound);
  g.clock.time=.5; expect(forestCountStep(g)).toEqual({index:1,time:2}); expect(potionFilterState(g).low).not.toBe(sound.low);
  expect(g.clock.time).toBe(.5);
});
it('follows tempo ramps and lab beat subdivisions', () => {
  const g=game(); rampTo(g.beat,0,180,8); g.clock.time=timeAt(g.beat,3.6);
  expect(forestCountStep(g).index).toBe(3);
  expect(forestCountStep(g).time).toBeCloseTo(timeAt(g.beat,3)*4);
  setPotionSetting('the-forest-counts','beats',.5); setPotionSetting('the-forest-counts','speed',2);
  expect(forestCountStep(g).index).toBe(7);
  expect(forestCountStep(g).time).toBeCloseTo(timeAt(g.beat,3.5)*2);
});
it('fades presentation only and restores the exact normal clock after expiry or Stop', () => {
  const g=game(540), before=JSON.stringify(g), amount=potionStrength(g,'the-forest-counts');
  expect(amount).toBe(.5); expect(potionFilterState(g).amount).toBe(.5);
  expect(forestCountTime(g,540,amount)).toBe((540+forestCountStep(g).time)/2);
  expect(JSON.stringify(g)).toBe(before);
  g.clock.time=600; expect(forestCountTime(g,600,potionStrength(g,'the-forest-counts'))).toBe(600);
  delete g.mushrooms.trips[0]; expect(forestCountTime(g,123,potionStrength(g,'the-forest-counts'))).toBe(123);
  expect(potionFilterState(g).amount).toBe(0);
});
it('overrides mist drift locally without freezing shared lighting time', () => {
  const mist=new Mist(.3,2,1,null,new THREE.Vector2(320,180));
  const material=mist.mesh.material as THREE.ShaderMaterial;
  expect(material.uniforms.uTimeOverride.value).toBe(-1);
  const original=LIGHT_UNIFORMS.uTime.value;
  mist.setTimeOverride(12); expect(material.uniforms.uTimeOverride.value).toBe(12);
  expect(LIGHT_UNIFORMS.uTime.value).toBe(original);
  mist.setTimeOverride(-1); expect(material.uniforms.uTimeOverride.value).toBe(-1);
  material.dispose(); mist.mesh.geometry.dispose();
});
