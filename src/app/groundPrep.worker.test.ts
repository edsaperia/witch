import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {generateMap} from '../rules/map';
import {TUNING} from '../rules/tuning';
import {smallWorldTuning} from '../test/worlds';
import {groundArrivalProgramDefines} from '../render/groundRecipe';
import {Ground,groundProgramMaterial,type DiscoArt} from '../render/ground';
import {Forest} from '../rules/forest';
import {loadStyle} from '../render/style';
import {beachOf} from '../rules/mapShape';
import {sailTuning} from './mapPrep';
import {groundShaderKey} from '../../tools/bench/ground-warm-key.mjs';
import type {ShaderMaterial} from 'three';
const mocks=vi.hoisted(()=>({put:vi.fn()}));
beforeEach(()=>{vi.resetModules();vi.clearAllMocks();const data=new Map<string,string>();vi.stubGlobal('localStorage',{getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>data.set(k,v),removeItem:(k:string)=>data.delete(k)});vi.doMock('./mapPrepStore',()=>({putPrep:mocks.put}));});
afterEach(()=>{vi.unstubAllGlobals();vi.doUnmock('./mapPrepStore');vi.resetModules();});
it('the actual map worker returns exactly the normal program recipe, without a map payload or cache write',async()=>{
  const tuning=smallWorldTuning(TUNING,'Descriptor equality needs actual deterministic map facts, not shipped world size.');
  const scope:any={postMessage:vi.fn()};vi.stubGlobal('self',scope);
  await import('./mapPrep.worker');
  await scope.onmessage({data:{key:'ground',seed:123,tuning,groundOnly:true}});
  expect(scope.postMessage).toHaveBeenCalledOnce();
  expect(scope.postMessage.mock.calls[0][0]).toEqual({ok:true,ground:groundArrivalProgramDefines(generateMap(123,tuning))});
  expect(mocks.put).not.toHaveBeenCalled();
});
it('the worker warm key equals the BUILT arrival material for hedgehog814361 and a beach-free island',async()=>{
  const scope:any={postMessage:vi.fn()};vi.stubGlobal('self',scope);await import('./mapPrep.worker');
  for(const beach of [true,false]){
    const tuning=sailTuning(beach?'hedgehog':'squirrel',0,814361);tuning.beach={...tuning.beach!,on:beach};
    const map=generateMap(814361,tuning),canvas={width:1,height:1} as HTMLCanvasElement;
    const art:DiscoArt={base:canvas,lit:canvas,tileM:1,pitch:1,size:1,gridOrigin:0,rimOuter:1};
    const ground=new Ground(map,new Forest(map),loadStyle(),1,64,art),coast=beachOf(map.bounds,tuning);
    ground.setBeach(coast);
    const arrival=coast?(ground.mesh.children.find(o=>(o as any).material?.defines?.GROUND_BEACH!==undefined) as any).material as ShaderMaterial:ground.programMaterial;
    scope.postMessage.mockClear();await scope.onmessage({data:{key:'arrival',seed:814361,tuning,groundOnly:true}});
    const defines=scope.postMessage.mock.calls[0][0].ground,warm=groundProgramMaterial(defines,{});
    expect(!!coast).toBe(beach);expect(defines,'worker must describe the actual built arrival variant').toEqual(arrival.defines);
    expect(groundShaderKey(warm)).toBe(groundShaderKey(arrival));
    expect(warm.customProgramCacheKey()).toBe(arrival.customProgramCacheKey());
    warm.dispose();ground.dispose();
    if(coast){
      // v6628 merge: a lazily created coast must inherit both active potion flags through the shared factory.
      const thermal=new Ground(map,new Forest(map),loadStyle(),1,64,art);
      thermal.potionSky(1);thermal.thermalVision(1);thermal.setBeach(coast);
      const material=(thermal.mesh.children.find(o=>(o as any).material?.defines?.GROUND_BEACH!==undefined) as any).material as ShaderMaterial;
      expect(material.defines).toMatchObject({GROUND_BEACH:'',POTION_SKY:'',THERMAL_VISION:''});
      const shared=groundProgramMaterial({...groundArrivalProgramDefines(map),POTION_SKY:'',THERMAL_VISION:''},{});
      expect(groundShaderKey(material)).toBe(groundShaderKey(shared));
      thermal.thermalVision(0);thermal.potionSky(0);
      expect(material.defines).not.toHaveProperty('THERMAL_VISION');expect(material.defines).not.toHaveProperty('POTION_SKY');
      shared.dispose();thermal.dispose();
    }
  }
});
