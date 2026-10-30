import {expect,it} from 'vitest';
import {critter} from '../art/creatures.js';
import {defaultStyle} from '../art/generator.js';
import gameStyle from '../config/style.json';
import tuning from '../config/tuning.json';
import {M} from '../art/core.js';
const st={...defaultStyle(),...gameStyle,artStyle:'bold',pixel:tuning.pixelSize};
it.each([['snail',0],['snail',1],['hydra',1],['hydra',2],['armadillo',2],['sphinx',1]] as const)('%s age %s lies no taller than its awake form',(id,level)=>{
 const awake=critter(id,level,0,st);
 const breaths=[0,1].map(frame=>Reflect.apply(critter,null,[id,level,frame,st,'towards',{nap:true}]) as ReturnType<typeof critter>);
 for(const nap of breaths){
  expect(nap.h).toBeLessThanOrEqual(awake.h);
  expect(nap.m.some(Boolean)).toBe(true);
  expect(nap.n.every(Number.isFinite)).toBe(true);
  expect(nap.m.slice(-nap.w).some(Boolean)).toBe(true);
  expect(nap.m.some((m:number)=>m===M.PUPIL||m===M.IRIS)).toBe(false);
  expect(nap.origin?.[0]).toBeGreaterThanOrEqual(0);
  expect(nap.origin?.[0]).toBeLessThanOrEqual(nap.w);
  expect(nap.origin?.[1]).toBeGreaterThanOrEqual(nap.h*.5);
  expect(nap.origin?.[1]).toBeLessThanOrEqual(nap.h+2);
 }
 expect(Array.from(breaths[0].m)).not.toEqual(Array.from(breaths[1].m));
},60000);
