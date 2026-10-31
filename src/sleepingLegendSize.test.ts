import {expect,it} from 'vitest';
import {legendForm} from '../art/legends.js';
import {critter} from '../art/creatures.js';
import {defaultStyle} from '../art/generator.js';
import {M} from '../art/core.js';
import gameStyle from '../config/style.json';
import tuning from '../config/tuning.json';
const st={...defaultStyle(),...gameStyle,artStyle:'bold',pixel:tuning.pixelSize};
it.each(['featheredserpent','marten'])('%s sleeping legend keeps its awake height budget',id=>{
 // Profile the original three calls on the CI runner before changing how this check does its work.
 const timed=<T>(stage:string,build:()=>T):T=>{const at=performance.now();try{return build();}finally{console.log('sleeping-legend-cost',JSON.stringify({id,stage,ms:performance.now()-at,node:process.version,runner:process.env.RUNNER_OS??'local'}));}};
 const awake=timed('awake',()=>critter(id,3,0,st)),breaths=[0,1].map(frame=>timed(`sleeping-${frame}`,()=>legendForm(id,st,{frame}).sp));
 for(const sp of breaths){
  expect(sp.h).toBeLessThanOrEqual(awake.h);
  expect(sp.m.slice(-sp.w).some(Boolean)).toBe(true);
  expect(sp.n.every(Number.isFinite)).toBe(true);
  expect(sp.m.some((mat:number)=>[M.PUPIL,M.IRIS,M.MAGIC,M.MAGIC2,M.GLOW].includes(mat))).toBe(false);
  expect(sp.groundLine).toBeGreaterThan(0);
  expect(sp.origin?.[0]).toBeGreaterThanOrEqual(0);
  expect(sp.origin?.[0]).toBeLessThanOrEqual(sp.w);
 }
 expect(Array.from(breaths[0].m)).not.toEqual(Array.from(breaths[1].m));
},60000);
