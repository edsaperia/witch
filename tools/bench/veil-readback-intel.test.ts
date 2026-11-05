import { expect, it } from 'vitest';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {hardware,MAX_MS,WORK_MS,FRAMES}=require('./veil-readback-intel.cjs');
const {quietPolicy}=require('./veil-laptop-guard.cjs');
it('imports without launching and requires real Intel/KHR telemetry with a cleanup reserve',()=>{
  expect(MAX_MS).toBeLessThanOrEqual(270000);expect(WORK_MS+5000).toBeLessThan(MAX_MS);expect(FRAMES).toBe(600);
  expect(()=>hardware({gpu:'Intel UHD D3D11',khr:true,timer:true})).not.toThrow();
  for(const i of [{gpu:'SwiftShader',khr:true,timer:true},{gpu:'Intel D3D11',khr:false,timer:true},{gpu:'Intel D3D11',khr:true,timer:false}])expect(()=>hardware(i)).toThrow();
});
it('records runtime input without inspecting browsers or stopping the run',()=>{
  const state={at:'now',idleMs:120000,lastInputTick:1};
  expect(quietPolicy(state).inputChanged).toBe(false);
  expect(quietPolicy({...state,idleMs:0,lastInputTick:2},undefined,state).inputChanged).toBe(true);
  expect(()=>quietPolicy({...state,idleMs:NaN})).toThrow();
});
