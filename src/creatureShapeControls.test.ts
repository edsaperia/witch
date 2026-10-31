import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {critter} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";
import {GENOME_BY_ID} from "../art/genome/index.js";
import type {Style} from "./render/style";

const current={...defaultStyle(),creatureModels:"flyingsquirrel:current,meerkat:current"};
function selected(id:string,edit:(g:any)=>void){const g=structuredClone(GENOME_BY_ID[id]);edit(g);return {...current,creatureModels:`${id}:roster`,creatureVariants:{[id]:{roster:g}}} as unknown as Style;}
function digest(id:string,level:number,idle=false,style:object=current){const h=createHash("sha256");for(const facing of ["towards","away"]){const sp=Reflect.apply(critter,null,[id,level,0,style,facing,idle?{idle:true}:null]);h.update(JSON.stringify([sp.w,sp.h]));for(const bytes of [sp.m,sp.n])h.update(Buffer.from(bytes.buffer,bytes.byteOffset,bytes.byteLength));}return h.digest("hex");}
// Ed's adopted sizes change native dimensions. OFF reproduces every historical
// pin exactly; keep both grids, with separate cases so one failure hides none.
it.each([
  ["mole",2,false,"e736ab332a694c2806c81e63ac93fe1dbbd09caaea97bbd6ab843f34fc92cf1b","49e32fd54e5b16aa7ccf40ff7e75cf446c613164351a2c76ee6112aa62fd7b32"],
  ["flyingsquirrel",2,false,"40863f99965a083b7e94a91f469ed3ff6bc6ace7e118e50c93355b6e7f7c255d","3ef3108642a0279b783a13ce00b01f71c519d9fb8f1f616c907b099d5214d9f0"],
  ["meerkat",1,false,"04ec335cbf2a55baecaa3a6da025ed676e2ebb72dcf6b363e091009024999c85","f76f8fdab121e1bdf6ed9a650ee4bb340b64b4f7eaf64a278f84ddb7a9548836"],
  ["meerkat",1,true,"f8394dc25ae4015583d9ec0e98d461d8bb3417521cdca7301d49eb0a0607dd1d","3ed3970ee54b4045395f5cfefef56255b044fb91a59363d4baccb47e669d8e0c"],
] as const)("pins %s age %s idle %s with optional controls absent on both size grids",(id,level,idle,oldSize,adoptedSize)=>{
  const base=id==="mole"?current:defaultStyle();
  for(const [flag,expected]of [[0,oldSize],[1,adoptedSize]] as const)expect(digest(id,level,idle,{...base,creatureSizeCandidate:flag})).toBe(expected);
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
