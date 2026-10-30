import {expect,it} from 'vitest';
import {critter} from '../art/creatures.js';
import {defaultStyle} from '../art/generator.js';
import {M} from '../art/core.js';
import gameStyle from '../config/style.json';
import tuning from '../config/tuning.json';
const st={...defaultStyle(),...gameStyle,artStyle:'bold',pixel:tuning.pixelSize};
it('keeps the adult hydra angry brows visible on its actual multi-head geometry',()=>{
 const plain=critter('hydra',2,0,st),angry=Reflect.apply(critter,null,['hydra',2,0,st,'towards',{face:'angry'}]);
 expect(angry.m.some((m:number)=>m===M.BROW)).toBe(true);
 expect(angry.w).toBeLessThanOrEqual(plain.w+3);
 expect(angry.h).toBeLessThanOrEqual(plain.h+3);
 expect(angry.n.every(Number.isFinite)).toBe(true);
},60000);
