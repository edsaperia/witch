import { afterEach, expect, it, vi } from 'vitest';
import type { Game } from '../../rules/game';
import { POTION_RECIPES } from '../../rules/potionRecipes';
import { resetPotionSettings, setPotionSetting } from '../../rules/potionSettings';
import { PotionFilter, potionFilterState } from './potionFilter';
const game=(id:number,time=0)=>({clock:{time},witches:[{id:0}],mushrooms:{trips:{0:{key:POTION_RECIPES.find(r=>r.id===id)!.key,at:0,until:600}}}} as unknown as Game);
afterEach(()=>resetPotionSettings());
it('covers every recipe with the fallback except the two explicitly bespoke vision effects',()=>{
  for(const r of POTION_RECIPES) expect(potionFilterState(game(r.id)).amount).toBe(['night-vision','heat-vision'].includes(r.effect)?0:1);
});
it('thins Miniature and fades any fallback over the final two minutes of game time',()=>{
  expect(potionFilterState(game(102))).toMatchObject({high:700,low:8500,amount:1});
  expect(potionFilterState(game(64,480)).amount).toBe(1);
  expect(potionFilterState(game(64,540)).amount).toBe(.5);
  expect(potionFilterState(game(64,600)).amount).toBe(0);
  const g=game(102); delete g.mushrooms.trips[0]; expect(potionFilterState(g).amount).toBe(0);
  setPotionSetting('trip-audio','mix',0); expect(potionFilterState(game(64)).amount).toBe(0);
});
it('keeps modulation bounded and fixed on a paused game clock',()=>{
  for(let time=0;time<480;time+=.3){const s=potionFilterState(game(64,time));expect(s.gain).toBeGreaterThanOrEqual(.82);expect(s.gain).toBeLessThanOrEqual(1);expect(s.low).toBeGreaterThan(100);}
  expect(potionFilterState(game(64,10))).toEqual(potionFilterState(game(64,10)));
});
it('routes both dry and filtered paths, starts dry and restores dry gain after Stop',()=>{
  const param=()=>({value:0,setTargetAtTime:vi.fn()});
  const nodes:any[]=[];
  const node=()=>{const n={gain:param(),frequency:param(),Q:param(),connect:vi.fn(),type:''};nodes.push(n);return n;};
  const context={currentTime:3,sampleRate:48000,destination:{},createGain:node,createBiquadFilter:node} as unknown as AudioContext;
  const filter=new PotionFilter(context),g=game(102);
  expect(nodes[2].gain.value).toBe(0); expect(nodes[0].connect).toHaveBeenCalledWith(nodes[1]);
  expect(nodes[0].connect).toHaveBeenCalledWith(nodes[3]);
  filter.update(g); expect(nodes[1].gain.setTargetAtTime).toHaveBeenLastCalledWith(0,3,.08);
  delete g.mushrooms.trips[0]; filter.update(g);
  expect(nodes[1].gain.setTargetAtTime).toHaveBeenLastCalledWith(1,3,.08);
  expect(nodes[2].gain.setTargetAtTime).toHaveBeenLastCalledWith(0,3,.08);
});
