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
it('uses the five-minute idle and fail-closed external-browser proof',()=>{
  const state={at:'now',idleMs:300000,processInventoryComplete:true,processes:[{Name:'node.exe',ProcessId:1,ParentProcessId:0}]};
  expect(quietPolicy(state).externalBrowserCount).toBe(0);
  expect(()=>quietPolicy({...state,idleMs:299999})).toThrow();
  expect(()=>quietPolicy({...state,processes:[]})).toThrow();
  expect(()=>quietPolicy({...state,processes:[...state.processes,{Name:'chrome.exe',ProcessId:2,ParentProcessId:1}]})).toThrow(/proof unavailable/);
  expect(()=>quietPolicy(state,undefined,{idleMs:300001})).toThrow();
});
