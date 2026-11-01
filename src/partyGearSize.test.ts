import {expect,it} from 'vitest';
import {critter,sigilColour,GLASSES_STYLES} from '../art/generator.js';
import {defaultStyle} from '../art/generator.js';
import {M} from '../art/core.js';
import gameStyle from '../config/style.json';
import tuning from '../config/tuning.json';
const st={...defaultStyle(),...gameStyle,artStyle:'bold',pixel:tuning.pixelSize};
it.each(['arcticfox','bear','dormouse','wolf','elephant','crab'])('%s party accessories keep the naked body scale',id=>{
 for(const level of [0,1,2])for(const facing of ['towards','away']){
  const gear={collar:sigilColour(id),hat:level%3,glasses:GLASSES_STYLES[level],shoes:'sneakers'};
  const sp=Reflect.apply(critter,null,[id,level,0,st,facing,gear]),plain=critter(id,level,0,st,facing);
  expect(Math.abs(sp.bodyH-plain.bodyH),`${id}/${level}/${facing}`).toBeLessThanOrEqual(1);
  expect(sp.m.some((mat:number)=>mat===M.COLLAR)).toBe(true);
  expect(sp.m.some((mat:number)=>mat===M.HAT1||mat===M.HAT2)).toBe(true);
  expect(sp.m.slice(-sp.w).some(Boolean)).toBe(true);
 }
},60000);
