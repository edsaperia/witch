import {afterEach,expect,it,vi} from 'vitest';
import {groundReuseObservation,observeArrivalGround} from './ground-warm-observation.mjs';
afterEach(()=>vi.unstubAllGlobals());
const target={id:'hedgehog',seed:7,keys:['exact'],programs:[81]};
it('waits for an actual arrival ground draw instead of failing on pre-draw empty properties',()=>{
  expect(groundReuseObservation(target,{firstDraw:null}).status).toBe('WAIT');
});
it('records the exact arrival material only after an actual draw, not a shader-gate skip',()=>{
  const handle={},fallbackHandle={},material={uuid:'plain',defines:{GROUND_SPECIALIZED:''}},mesh={uuid:'ground'},program={id:81,cacheKey:'exact',usedTimes:2,program:handle};
  let skip=true,bound=handle;
  const renderer={info:{programs:[program],render:{calls:0}},getContext:()=>({CURRENT_PROGRAM:1,getParameter:()=>bound}),properties:{get:()=>({currentProgram:program,programs:new Map([['exact',program]])})},renderBufferDirect(..._args:unknown[]){if(!skip)this.info.render.calls++;}};
  const host={witch:{view:{renderer,ground:{mesh,programMaterial:material}},game:{seed:7,map:{island:{kind:'hedgehog'}}}},__groundWarmArrival:null as any};
  vi.stubGlobal('window',host);observeArrivalGround(target);
  renderer.renderBufferDirect(null,null,null,material,mesh,null);
  expect(host.__groundWarmArrival.firstDraw).toBeNull();
  skip=false;renderer.renderBufferDirect(null,null,null,{uuid:'other'},mesh,null);
  expect(host.__groundWarmArrival.firstDraw).toBeNull();
  bound=fallbackHandle;renderer.renderBufferDirect(null,null,null,material,mesh,null);
  expect(host.__groundWarmArrival.firstDraw).toBeNull();expect(host.__groundWarmArrival.fallbackDraws).toBe(1);
  bound=handle;
  renderer.renderBufferDirect(null,null,null,material,mesh,null);
  expect(host.__groundWarmArrival.firstDraw).toMatchObject({material:'plain',normalMaterial:'plain',program:81,key:'exact',boundProgramConfirmed:true,beforeCalls:2,afterCalls:3});
  expect(groundReuseObservation(target,host.__groundWarmArrival).status).toBe('PASS');
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
