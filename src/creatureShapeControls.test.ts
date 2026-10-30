import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {critter} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";
import {GENOME_BY_ID} from "../art/genome/index.js";
import type {Style} from "./render/style";

const current=defaultStyle();
function selected(id:string,edit:(g:any)=>void){const g=structuredClone(GENOME_BY_ID[id]);edit(g);return {...current,creatureModels:`${id}:roster`,creatureVariants:{[id]:{roster:g}}} as unknown as Style;}
function digest(id:string,level:number,idle=false,style=current){const h=createHash("sha256");for(const facing of ["towards","away"]){const sp=Reflect.apply(critter,null,[id,level,0,style,facing,idle?{idle:true}:null]);h.update(JSON.stringify([sp.w,sp.h]));for(const bytes of [sp.m,sp.n])h.update(Buffer.from(bytes.buffer,bytes.byteOffset,bytes.byteLength));}return h.digest("hex");}
it("preserves existing material and normal bytes in all four affected forms",()=>{
  expect(digest("mole",2)).toBe("eb3ff5d44762dc22e804e9e75b496b46cfe806e7e169803a835c3bef83811157");
  expect(digest("flyingsquirrel",2)).toBe("f4c22a1700d8f476de8c2803c983d4fc9cc14a07be7167917d105f9f954a21c3");
  expect(digest("meerkat",1)).toBe("293e0e26163079bea7cca7ba1dde108217c32aed96d8a4d48672ac51b55190e2");
  expect(digest("meerkat",1,true)).toBe("8dc5e67bd41a2129f945ffd042ef5a4787ecb26b92552704722db3fca7f24f97");
});
it("changes each mole control independently while explicit unit values preserve Current",()=>{
  const keys=["bodyDepth","bodyLength","snoutProjection","forepawSpread","forepawSize"];
  for(const key of keys){expect(digest("mole",2,false,selected("mole",g=>{g.look={mole:{[key]:1.4}};}))).not.toBe(digest("mole",2));}
  expect(digest("mole",2,false,selected("mole",g=>{g.look={mole:Object.fromEntries(keys.map(k=>[k,1]))};}))).toBe(digest("mole",2));
  expect(()=>digest("mole",2,false,selected("mole",g=>{g.look={mole:{bodyDepth:0}};}))).toThrow(/positive/);
});
it("gates the ground membrane to adult levels and reuses its existing feature",()=>{
  const skirt=selected("flyingsquirrel",g=>{for(const level of g.levels)for(const f of level?.features??[])if(f.kind==="patagium")f.groundSkirt=.5;});
  expect(digest("flyingsquirrel",1,false,skirt)).toBe(digest("flyingsquirrel",1));
  expect(digest("flyingsquirrel",2,false,skirt)).not.toBe(digest("flyingsquirrel",2));
});
it("keeps walking eye paint and sentinel belly/tip controls independent",()=>{
  const eye=selected("meerkat",g=>{g.head={...g.head,eyePatchPx:2};});
  expect(digest("meerkat",1,false,eye)).not.toBe(digest("meerkat",1));
  expect(digest("meerkat",1,true,eye)).toBe(digest("meerkat",1,true));
  const idle=selected("meerkat",g=>{g.look={sentinel:{belly:{mat:"BELLY",extent:{along:[0,.8],width:.6,depth:1}},tailTip:{length:.5,mat:"BODY3"}}};});
  expect(digest("meerkat",1,true,idle)).not.toBe(digest("meerkat",1,true));
  expect(digest("meerkat",1,false,idle)).toBe(digest("meerkat",1));
});
