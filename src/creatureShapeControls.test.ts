import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {critter} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";
import {GENOME_BY_ID} from "../art/genome/index.js";
import type {Style} from "./render/style";

const current={...defaultStyle(),creatureModels:"flyingsquirrel:current,meerkat:current"};
function selected(id:string,edit:(g:any)=>void){const g=structuredClone(GENOME_BY_ID[id]);edit(g);return {...current,creatureModels:`${id}:roster`,creatureVariants:{[id]:{roster:g}}} as unknown as Style;}
function digest(id:string,level:number,idle=false,style:object=current){const h=createHash("sha256");for(const facing of ["towards","away"]){const sp=Reflect.apply(critter,null,[id,level,0,style,facing,idle?{idle:true}:null]);h.update(JSON.stringify([sp.w,sp.h]));for(const bytes of [sp.m,sp.n])h.update(Buffer.from(bytes.buffer,bytes.byteOffset,bytes.byteLength));}return h.digest("hex");}
it("pins projected-fit material and normal bytes with all optional controls absent",()=>{
  // Combined occupied age sizing and twenty approved defaults (6520542543/6520690688), pending art review.
  expect(digest("mole",2)).toBe("929ed89599e60eb90cba174f526851b4a8f7c2c94f6f7c910639ad10858bb284");
  expect(digest("flyingsquirrel",2,false,defaultStyle())).toBe("09768a12a7120d5807d41ac04717c9a0dfcb220a7bb55f4e21bb1c8c05839d7d");
  expect(digest("meerkat",1,false,defaultStyle())).toBe("2ad36eabd8661ad2e9825641942b1d4411f504a8e8c4d18f50359fff66b1259d");
  expect(digest("meerkat",1,true,defaultStyle())).toBe("8e63b0f8c8051a87cc7c5c2733d15718365887e2f6bdd34d94937a1e449339ef");
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
