import {expect,it} from "vitest";
import {critter,defaultStyle} from "../art/generator.js";
import {M} from "../art/core.js";
import {carrierSprite,CARRIER} from "../art/carrier.js";

it.each(["heron","raven","owl"])("keeps %s legend expressions on the visible blended head",id=>{
 const st=defaultStyle(),plain=critter(id,3,0,st);
 for(const face of ["dazed","angry","happy","asleep"]){
  const sp=Reflect.apply(critter,null,[id,3,0,st,"towards",{face}]) as ReturnType<typeof critter>;
  expect(sp.m.some((v:number)=>v===M.BROW),face).toBe(true);
  expect(sp.w).toBeLessThanOrEqual(plain.w+Math.max(3,plain.w*.01));
  expect(sp.h).toBeLessThanOrEqual(plain.h+Math.max(3,plain.h*.01));
 }
});
it("keeps both sleeping woodlouse legend ground anchors inside their native canvases",()=>{
 const st=defaultStyle(),awake=critter("woodlouse",3,0,st);
 for(const frame of [0,1]){
  const sp=Reflect.apply(critter,null,["woodlouse",3,frame,st,"towards",{nap:true}]) as ReturnType<typeof critter>;
  expect(sp.origin[1]).toBeLessThanOrEqual(sp.h+2);
  expect(sp.h).toBeLessThanOrEqual(awake.h);
  expect(sp.m.some(Boolean)).toBe(true);
  expect(sp.n.every(Number.isFinite)).toBe(true);
  expect(sp.anchors.ground).toEqual(sp.origin);
 }
});
it("keeps the resized crocodile carrier within its existing length and back limits",()=>{
 const c=carrierSprite(defaultStyle(),"crocodile",{ppm:16})!;
 expect(c.lengthM).toBeLessThanOrEqual(CARRIER.maxLength+.5);
 expect(c.backM).toBeGreaterThanOrEqual(6);
 expect(c.backM).toBeLessThanOrEqual(CARRIER.maxBack+.5);
});
