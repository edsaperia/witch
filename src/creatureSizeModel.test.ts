import {expect,it} from "vitest";
import {SIZE_CLASSES,SIZE_CLASS_BY_ID,sizeMultiplier} from "../art/genome/size-ranks.js";
import {GENOME_BY_ID} from "../art/genome/index.js";
import {standingWitchHeight,occupiedHeight} from "../art/creature-size.js";
import {critter} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";
import gameStyle from "../config/style.json";
import tuning from "../config/tuning.json";
const st={...defaultStyle(),...gameStyle,artStyle:"bold",pixel:tuning.pixelSize};
it("covers every species exactly once and keeps continuous age targets ordered",()=>{
  const ids=SIZE_CLASSES.flat();expect(new Set(ids).size).toBe(ids.length);expect(ids.slice().sort()).toEqual(Object.keys(GENOME_BY_ID).sort());
  for(const level of [0,1,2,3])for(let i=1;i<SIZE_CLASSES.length;i++)expect(sizeMultiplier(SIZE_CLASSES[i][0],level)).toBeGreaterThan(sizeMultiplier(SIZE_CLASSES[i-1][0],level));
  expect(standingWitchHeight(st)).toBe(43);
});
it("keeps the accepted bands, full-presence legend ratio and hard real-size pairs",()=>{
  for(const id of Object.keys(GENOME_BY_ID)){
    expect(sizeMultiplier(id,0)).toBeGreaterThanOrEqual(.75);expect(sizeMultiplier(id,0)).toBeLessThanOrEqual(1.2);
    expect(sizeMultiplier(id,1)).toBeGreaterThanOrEqual(1.1);expect(sizeMultiplier(id,1)).toBeLessThanOrEqual(1.5);
    expect(sizeMultiplier(id,2)).toBeGreaterThanOrEqual(1.8);expect(sizeMultiplier(id,2)).toBeLessThanOrEqual(3);
    expect(sizeMultiplier(id,3)/sizeMultiplier(id,2)).toBeCloseTo(1.75);
  }
  for(const [big,small]of [["tiger","cat"],["wolf","fox"],["fox","stoat"],["elephant","rhino"]])for(const level of [0,1,2])expect(Math.round(43*sizeMultiplier(big,level))).toBeGreaterThan(Math.round(43*sizeMultiplier(small,level)));
  for(const a of Object.keys(GENOME_BY_ID))for(const b of Object.keys(GENOME_BY_ID))if(SIZE_CLASS_BY_ID[a]>=SIZE_CLASS_BY_ID[b]+2)for(const level of [0,1,2])expect(Math.round(43*sizeMultiplier(a,level))).toBeGreaterThan(Math.round(43*sizeMultiplier(b,level)));
});
it("uses the same final age target across shapes and both game facings",()=>{
  for(const id of ["woodlouse","fox","tiger","cat","elephant","rhino"])for(const level of [0,1,2,3])for(const facing of ["towards","away"]){
    const sp=critter(id,level,0,st,facing),target=level===3?Math.ceil(Math.round(43*sizeMultiplier(id,2))*1.75):Math.round(43*sizeMultiplier(id,level));expect(occupiedHeight(sp),`${id}/${level}/${facing}`).toBe(target);
  }
},60000);
