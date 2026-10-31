import {afterEach,expect,it,vi} from 'vitest';
import {groundReuseObservation,observeArrivalGround} from './ground-warm-observation.mjs';
afterEach(()=>vi.unstubAllGlobals());
const target={id:'hedgehog',seed:7,keys:['exact'],programs:[81]};
it('waits for an actual arrival ground draw instead of failing on pre-draw empty properties',()=>{
  expect(groundReuseObservation(target,{firstDraw:null}).status).toBe('WAIT');
});
it('records the exact arrival material only after an actual draw, not a shader-gate skip',()=>{
  const handle={},fallbackHandle={},material={uuid:'plain',defines:{GROUND_SPECIALIZED:''}},mesh={uuid:'ground',material},program={id:81,cacheKey:'exact',usedTimes:2,program:handle};
  let skip=true,bound=handle;
  const renderer={info:{programs:[program],render:{calls:0}},getContext:()=>({CURRENT_PROGRAM:1,getParameter:()=>bound}),properties:{get:()=>({currentProgram:program,programs:new Map([['exact',program]])})},renderBufferDirect(..._args:unknown[]){if(!skip)this.info.render.calls++;}};
  const host={witch:{view:{renderer,ground:{mesh,programMaterial:material}},game:{seed:7,map:{island:{kind:'hedgehog'}}}},__groundWarmArrival:null as any};
  vi.stubGlobal('window',host);observeArrivalGround(target);
  renderer.renderBufferDirect(null,null,null,material,mesh,null);
  expect(host.__groundWarmArrival.firstDraw).toBeNull();
  skip=false;renderer.renderBufferDirect(null,null,null,{uuid:'other'},{uuid:'unrelated'},null);
  expect(host.__groundWarmArrival.firstDraw).toBeNull();
  renderer.renderBufferDirect(null,null,null,{uuid:'outer-fallback'},mesh,null);
  expect(host.__groundWarmArrival.firstDraw).toBeNull();
  bound=fallbackHandle;renderer.renderBufferDirect(null,null,null,material,mesh,null);
  expect(host.__groundWarmArrival.firstDraw).toBeNull();expect(host.__groundWarmArrival.fallbackDraws).toBe(2);
  bound=handle;
  renderer.renderBufferDirect(null,null,null,material,mesh,null);
  expect(host.__groundWarmArrival.firstDraw).toMatchObject({material:'plain',normalMaterial:'plain',program:81,key:'exact',boundProgramConfirmed:true,beforeCalls:3,afterCalls:4});
  expect(groundReuseObservation(target,host.__groundWarmArrival).status).toBe('PASS');
});
it('identifies the actual beach material on a ground child instead of assuming plain',()=>{
  const handle={},mesh={uuid:'ground'},plain={uuid:'plain'},coast={uuid:'coast',defines:{GROUND_BEACH:''}};
  const program={id:83,cacheKey:'beach-key',usedTimes:1,program:handle};
  const renderer={info:{programs:[program],render:{calls:0}},getContext:()=>({CURRENT_PROGRAM:1,getParameter:()=>handle}),properties:{get:()=>({currentProgram:program,programs:new Map([['beach-key',program]])})},renderBufferDirect(..._args:unknown[]){this.info.render.calls++;}};
  const host={witch:{view:{renderer,ground:{mesh,programMaterial:plain}},game:{seed:7,map:{island:{kind:'hedgehog'}}}},__groundWarmArrival:null as any};
  vi.stubGlobal('window',host);observeArrivalGround(target);
  renderer.renderBufferDirect(null,null,null,coast,{uuid:'coast-surface',parent:mesh,material:coast},null);
  expect(host.__groundWarmArrival.firstDraw).toMatchObject({plain:false,groundChild:true,material:'coast',normalMaterial:'plain',program:83,defines:{GROUND_BEACH:''}});
  expect(groundReuseObservation(target,host.__groundWarmArrival).status).toBe('FAIL');
});
it('requires both the live draw and renderer registry to use the retained key/id',()=>{
  const firstDraw={island:'hedgehog',seed:7,key:'exact',program:81,boundProgramConfirmed:true,registry:[{id:81,key:'exact',usedTimes:2}]};
  expect(groundReuseObservation(target,{firstDraw}).status).toBe('PASS');
  expect(groundReuseObservation(target,{firstDraw:{...firstDraw,key:'different'}}).status).toBe('FAIL');
  expect(groundReuseObservation(target,{firstDraw:{...firstDraw,boundProgramConfirmed:false}}).status).toBe('FAIL');
  expect(groundReuseObservation(target,{firstDraw:{...firstDraw,program:82}}).status).toBe('FAIL');
  expect(groundReuseObservation(target,{firstDraw:{...firstDraw,registry:[{id:82,key:'exact',usedTimes:2}]}}).status).toBe('FAIL');
  expect(groundReuseObservation(target,{firstDraw:{...firstDraw,registry:[...firstDraw.registry,{id:82,key:'exact',usedTimes:1}]}}).status).toBe('FAIL');
});
