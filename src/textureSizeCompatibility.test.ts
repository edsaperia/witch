import {expect,it} from 'vitest';
import {critter,defaultStyle} from '../art/generator.js';
import gameStyle from '../config/style.json';
import tuning from '../config/tuning.json';
const st={...defaultStyle(),...gameStyle,artStyle:'bold',pixel:tuning.pixelSize};
it.each([['hare',1],['stoat',2]] as const)('%s age %s texture toggle preserves physical size',(id,level)=>{
 for(const facing of ['towards','away']){
  const on=critter(id,level,0,st,facing),off=critter(id,level,0,{...st,texture:0},facing),tol=Math.max(2,Math.ceil(Math.max(off.w,off.h)*.01));
  expect(Math.abs(on.w-off.w)).toBeLessThanOrEqual(tol);
  expect(Math.abs(on.h-off.h)).toBeLessThanOrEqual(tol);
  expect(on.n.every(Number.isFinite)).toBe(true);
 }
},60000);
