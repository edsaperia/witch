import { expect,it } from 'vitest';
import {createRequire} from 'node:module';
const {withProbeClock}=createRequire(import.meta.url)('./veil-capture-clock.cjs');
it('advances real probe easing with a fixed picture time and restores the method',async()=>{
  const times:number[]=[];const probes={update(t:number){times.push(t);}},original=probes.update;
  await withProbeClock(probes,30,async(clock:{steps:number})=>{for(let i=0;i<120;i++)probes.update(20);expect(clock.steps).toBe(120);});
  expect(times[0]).toBeCloseTo(30+1/60);expect(times[119]).toBe(32);expect(probes.update).toBe(original);
});
it('restores prototype dispatch even when capture fails',async()=>{
  class Probe {lastTime=12;update(t:number){this.lastTime=t;}}
  const probes=new Probe(),original=probes.update;
  await expect(withProbeClock(probes,12,async()=>{probes.update(0);throw Error('capture failed');})).rejects.toThrow('capture failed');
  expect(probes.update).toBe(original);expect(Object.hasOwn(probes,'update')).toBe(false);
  expect(probes.lastTime).toBe(12);
});
