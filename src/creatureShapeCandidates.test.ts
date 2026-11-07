import {createHash} from "node:crypto";
import {expect,it} from "vitest";
import {CREATURE_SHAPE_SWITCHES,creatureShapeCandidate} from "../art/genome/shape-candidates.js";
import {GENOME_BY_ID,genomeHash,selectedCreatureGenome} from "../art/genome/index.js";
import {buildCreature,speciesFor} from "../art/creatures.js";
import {withTexture} from "../art/creatures3d.js";
import {defaultStyle} from "../art/generator.js";
import {styleFromLink} from "./app/viewParams";
import {TUNING} from "./rules/tuning";

const entries=Object.entries(CREATURE_SHAPE_SWITCHES);
const allOn=Object.fromEntries(entries.map(([,key])=>[key,1]));
const st={...defaultStyle(),pixel:3};
function built(id:string,style:object){
  const S=speciesFor(id,style,2);
  return withTexture({S,level:2,st:style},()=>buildCreature(S,2,0,style,"towards"));
}
function hash(sp:any){const h=createHash("sha256");h.update(JSON.stringify([sp.w,sp.h]));
  for(const z of[sp.m,sp.n])h.update(Buffer.from(z.buffer,z.byteOffset,z.byteLength));return h.digest("hex");}

it("starts every independent link switch OFF and admits only explicit 1",()=>{
  for(const [,key]of entries){
    expect(defaultStyle()[key]).toBe(0);
    for(const value of [null,"0","true","2"]){
      const p=new URLSearchParams(value===null?"":key+"="+value);
      expect(styleFromLink(p,structuredClone(TUNING))[key]).toBe(0);
    }
    const picked=styleFromLink(new URLSearchParams(key+"=1"),structuredClone(TUNING));
    for(const [,other]of entries)expect(picked[other]).toBe(other===key?1:0);
  }
});
it("changes only the selected species, preserves Current and never mutates shipped records",()=>{
  const before=JSON.stringify(GENOME_BY_ID);
  for(const [id,key]of entries)for(const [other,g]of Object.entries(GENOME_BY_ID)){
    const base=selectedCreatureGenome(g,{}),picked=selectedCreatureGenome(g,{[key]:1});
    expect(picked===base,other).toBe(other!==id);
    expect(selectedCreatureGenome(g,{[key]:0})).toBe(base);
    expect(selectedCreatureGenome(g,{...allOn,creatureModels:other+":current"})).toBe(g);
    if(other===id){expect(creatureShapeCandidate(base,{[key]:true})).toBe(base);
      for(const age of [0,1,2,3])expect(genomeHash(g,{[key]:1},age)).not.toBe(genomeHash(g,{},age));}
  }
  expect(JSON.stringify(GENOME_BY_ID)).toBe(before);
  for(const id of ["rhino","unicorn","wolf","snowleopard","beetle"])
    expect(selectedCreatureGenome(GENOME_BY_ID[id],allOn)).toBe(selectedCreatureGenome(GENOME_BY_ID[id],{}));
});
it("retains paint, face definitions, size curves and adult-only ruff evolution",()=>{
  for(const [id,key]of entries){const g=GENOME_BY_ID[id],base=selectedCreatureGenome(g,{}),on=selectedCreatureGenome(g,{[key]:1});
    expect(on.palette).toEqual(base.palette);expect(on.face).toEqual(base.face);expect(on.sizes).toEqual(base.sizes);
  }
  const lion=selectedCreatureGenome(GENOME_BY_ID.lion,{shapeLion:1});
  expect(lion.levels[0].features).toEqual([]);
  expect(lion.levels[2].features.filter((f:any)=>f.kind==="ruff")).toHaveLength(2);
});

// Measured from original creatures3d.js at 26d69880a, loaded independently,
// against the same shipped selected record. Raw native material/normal bytes,
// dimensions, adult frame0 towards, default style with pixel3. All five matched
// before recording these pins. Broader OFF art/bench proof stays a CI gate.
const pins=[
  ["mole","b20e1b1ce0ad7c0bd70878c22b19c9fcd2b110219071e7ec47faa1331c8b4405"],
  ["hydra","a545fb57b8c389fd3bd082f81672a53af89db9f43809e56db1b27098457abb35"],
  ["lion","8e046faddbf4af8fb3fae69fe4095d0a76ed4ce1a1651f68d81d782305e5aaf6"],
  ["woodlouse","dadf8f5e5726f929684c63387c28a8569449c352fc421fea7db3bb7d4f664fcd"],
  ["crocodile","a21a4f5ebd12525552b10037cac09af7936d90b83edbcb59580ecdec0cb6c4e5"],
] as const;
it.each(pins)("preserves pre-change %s native OFF bytes and isolates its candidate",(id,expected)=>{
  expect(hash(built(id,st))).toBe(expected);
  const key=CREATURE_SHAPE_SWITCHES[id],on=built(id,{...st,[key]:1});
  expect(hash(on)).not.toBe(expected);
  for(const n of on.n)expect(Number.isFinite(n)).toBe(true);
  expect(hash(built(id,{...st,[key]:0}))).toBe(expected);
});
