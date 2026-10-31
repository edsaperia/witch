import {expect,it} from 'vitest';
import {createHash} from 'node:crypto';
import {ShaderMaterial} from 'three';
import {generateMap} from '../rules/map';
import {TUNING} from '../rules/tuning';
import {smallWorldTuning} from '../test/worlds';
import {speakerRadius} from '../rules/speakers';
import {groundDefines,groundExtras,groundFamily} from './groundFamily';
import {groundKoi,groundPavementRadius,groundProgramDefines} from './groundRecipe';
import {groundProgramMaterial} from './ground';
import {lakeLooksOf} from './lakeLooks';
import {lakeKnobs} from '../rules/lakes';
it('retains the accepted shader source and normal material defaults for warm and live ground',()=>{
  const warm=groundProgramMaterial({GROUND_SPECIALIZED:''},{}), live=groundProgramMaterial({GROUND_SPECIALIZED:''},{uTime:{value:1}}), defaults=new ShaderMaterial();
  // #1523 adds the POTION_SKY-gated wrapper; ordinary active tokens retain their independent baseline.
  expect(createHash('sha256').update(warm.vertexShader+warm.fragmentShader).digest('hex')).toBe('5c408926d1596622fd9dd0ea8113090eaaf0e4ffb2705a96e203b437f3bc3bef');
  expect(warm.defines).not.toHaveProperty('POTION_SKY'); expect(live.defines).not.toHaveProperty('POTION_SKY');
  expect(warm.vertexShader).toBe(live.vertexShader); expect(warm.fragmentShader).toBe(live.fragmentShader); expect(warm.customProgramCacheKey()).toBe(live.customProgramCacheKey());
  for(const key of ['precision','side','shadowSide','transparent','alphaTest','alphaHash','toneMapped','fog','lights','glslVersion','vertexColors'] as const)expect(warm[key]).toBe(defaults[key]);
  warm.dispose();live.dispose();defaults.dispose();
});
it('matches the pre-extraction uniform feature expressions without preparing textures or art',()=>{
  const tuning=smallWorldTuning(TUNING,'Feature metadata depends on actual map facts, not a large world.');
  for(const seed of [123,424242]){
    const map=generateMap(seed,tuning), t=map.tuning, zoo=!!map.zoo?.layout;
    const radius=t.dancefloor.paving.on?speakerRadius(t)+t.dancefloor.speakers.footprint+t.dancefloor.paving.beyond:0;
    expect(groundPavementRadius(map)).toBe(radius);
    const extras=groundExtras({zoo,dancefloor:!zoo&&map.dancefloor.radius>0,pavement:!zoo&&radius>0,legends:map.legendClearings.length>0,legendFloor:!!t.legendClearing.floor?.on,koi:groundKoi(map,lakeKnobs(t).koi).some(k=>k.r>0),bare:(t.bare??0)>1.5});
    expect(groundProgramDefines(map)).toEqual(groundDefines(groundFamily(!!map.bounds.lakes,map.bounds.lakes?lakeLooksOf(map)?.any??null:null,false,zoo,false),false,extras));
    expect(groundProgramDefines(map)).not.toHaveProperty('POTION_SKY');
    expect(groundProgramDefines(map,new URLSearchParams('debug=1'))).toHaveProperty('GROUND_BARE');
  }
});
