import { expect, it } from 'vitest';
import { createRequire } from 'node:module';
const {analyse}=createRequire(import.meta.url)('./veil-readback-model.cjs');
function arm(mode:string,ms:number){return {mode,fixtureKey:'seed/route/fire',cpu:[10],quietProofs:[{at:'now',idleMs:300000,externalBrowserCount:0,method:'complete-process-inventory/no-external-browser'}],frames:Array.from({length:100},()=>({intervalMs:ms,probeMs:0,activeProbe:true,smokeDrawn:true}))};}
it('requires the original stall and all three real, matched arms before accepting smoothness',()=>{
  expect(analyse([arm('default',16),arm('three',16),arm('off',16)]).status).toBe('INCONCLUSIVE');
  expect(analyse([arm('default',16),arm('three',26),arm('off',16)]).status).toBe('PASS');
  expect(analyse([arm('default',18.01),arm('three',29),arm('off',16)]).status).toBe('FAIL');
});
it('preserves the exact relative p95, worst and count ceilings',()=>{
  const d=arm('default',42),t=arm('three',60),o=arm('off',40);
  expect(analyse([d,t,o]).limits).toEqual({p95:42,worst:56.7,over50:1});
  d.frames[0].intervalMs=56.71;expect(analyse([d,t,o]).status).toBe('FAIL');
  d.frames[0].intervalMs=55;d.frames[1].intervalMs=55;expect(analyse([d,t,o]).checks.over50).toBe(false);
});
it('accepts three attributed >50ms stalls even with unchanged p95',()=>{
  const t=arm('three',16);for(let i=0;i<3;i++){t.frames[i].intervalMs=60;t.frames[i].probeMs=30;}
  expect(analyse([arm('default',16),t,arm('off',16)]).status).toBe('PASS');
});
it('rejects absent smoke, CPU70%, missing guard proof and mismatched fixture',()=>{
  for(const change of [(a:any)=>{a.frames.forEach((f:any)=>f.smokeDrawn=false);},(a:any)=>{a.cpu=[70];},(a:any)=>{a.quietProofs=[];},(a:any)=>{a.fixtureKey='different';}]){
    const d=arm('default',16);change(d);expect(analyse([d,arm('three',30),arm('off',16)]).status).toBe('INCONCLUSIVE');
  }
});
