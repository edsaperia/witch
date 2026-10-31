import {expect,it} from 'vitest';
import {frameWindow,timingArm,compareTiming} from './ground-warm-timing-data.mjs';
it('includes an entire frame crossing the first arrival draw in both windows',()=>{
  const frames=[{start:0,end:16},{start:16,end:250},{start:250,end:2100}];
  expect(frameWindow(frames,0,100)).toMatchObject({count:2,worstMs:234,p95Ms:234});
  expect(frameWindow(frames,100,2100)).toMatchObject({count:2,worstMs:1850});
  expect(()=>frameWindow(frames,0,2200)).toThrow('Incomplete');
  expect(()=>frameWindow([{start:0,end:10},{start:11,end:20}],0,20)).toThrow('gap');
});
it('uses nearest-rank p95 over raw intervals instead of averaging away stalls',()=>{
  let end=0;const frames=Array.from({length:100},(_,i)=>{const start=end;end+=i+1;return {start,end};});
  expect(frameWindow(frames,0,end)).toMatchObject({count:100,worstMs:100,p95Ms:95});
});
it('rejects paused, non-submitting, unbound and unresolved arrival evidence',()=>{
  const state={frames:[{start:0,end:100},{start:100,end:2100}],sailStart:0,draw:{at:100,boundProgramConfirmed:true,beforeCalls:25,afterCalls:26},sailResolved:true};
  expect(timingArm(state).arrival.count).toBe(1);
  for(const bad of [{paused:true},{sailResolved:false},{draw:{...state.draw,afterCalls:25}},{draw:{...state.draw,boundProgramConfirmed:false}}])expect(()=>timingArm({...state,...bad})).toThrow();
});
it('requires lower arrival worst and sail p95 within the declared noise allowance',()=>{
  const arm=(p95Ms:number,worstMs:number)=>({sail:{p95Ms},arrival:{worstMs}});
  expect(compareTiming(arm(21,90),arm(20,100))).toMatchObject({status:'PASS',noiseMs:2});
  expect(compareTiming(arm(23,90),arm(20,100)).status).toBe('FAIL');
  expect(compareTiming(arm(20,100),arm(20,100)).status).toBe('FAIL');
  expect(compareTiming(arm(20,90),arm(20,100),true).status).toBe('INSUFFICIENT');
});
