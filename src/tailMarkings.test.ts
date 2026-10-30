import {createHash} from "node:crypto";
import {describe,expect,it} from "vitest";
import {Model} from "../art/model3d.js";
import {M} from "../art/core.js";
import {tailPath,tailCoordinates,paintTailParts} from "../art/body-graph/tail-markings.js";
import {critter} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";
import {GENOME_BY_ID} from "../art/genome/index.js";
import type {Style} from "./render/style";

const bent=()=>new Model().chain([[0,0,0,.2],[-1,0,0,.2],[-1,1,0,.1]],M.BODY,{paint:()=>M.MAGIC});
describe("optional tail region painter",()=>{
  it.each([
    // Combined age-size/approved roster baselines (6520542543/6520690688).
    ["raccoon","b5a4467f4e30bb78ac2292c36d7c656eb7fa8d01167acdbbce74d05a024f2349"],
    ["stoat","c0509d65e5c60d3d97302e09c0395006294c1464ba3da81955567b173ec76b34"],
    ["jaguar","f1084b3e82b3083b95fbabe5f186100320627f7cc3e5ae08bf172649fe2c8786"],
  ])("pins projected-fit %s material and normal bytes with the region absent",(id,expected)=>{
    const hash=createHash("sha256");
    for(const facing of ["towards","away"]){const sp=critter(id,1,0,defaultStyle(),facing);hash.update(JSON.stringify([sp.w,sp.h]));for(const bytes of [sp.m,sp.n])hash.update(Buffer.from(bytes.buffer,bytes.byteOffset,bytes.byteLength));}
    expect(hash.digest("hex")).toBe(expected);
  });
  it("uses arc length around bends for rings and the tip, preserving geometry",()=>{
    const m=bent(),before=JSON.stringify(m.parts.map(({paint,...part})=>part));
    const painted=paintTailParts(m.parts,{kind:"rings",count:4,width:.5,mat:"BODY3",tip:{length:.2,mat:M.NOSE}})!;
    expect(tailCoordinates([-1,.8,.1],painted.path)!.t).toBeCloseTo(.9);
    expect(painted.paint([-.1,.1,0])).toBe(M.BODY3);
    expect(painted.paint([-.4,.1,0])).toBe(null);
    expect(painted.paint([-1,.8,.1])).toBe(M.NOSE);
    expect(JSON.stringify(m.parts.map(({paint,...part})=>part))).toBe(before);
    const disabled=bent(),old=disabled.parts[0].paint;expect(paintTailParts(disabled.parts,null)).toBe(null);expect(disabled.parts[0].paint).toBe(old);
  });
  it("reuses seeded rosettes, filled cells and centre dots around the whole tail",()=>{
    const m=new Model().chain([[0,0,0,.2],[-2,0,0,.2]],M.BODY);
    let scale=25;
    const options={kind:"rosettes",outerPx:7,density:1,inner:.18,outer:.4,sizeVariation:.15,closedFraction:.25,gapRange:[0,.65],centreMat:"BODYL",centreDotRadius:.5,centreDotMat:"NOSE"};
    const painted=paintTailParts(m.parts,options,()=>scale)!;
    const sample=()=>{const out:number[]=[];for(let x=.01;x<1.99;x+=.01)for(let a=0;a<48;a++){const t=a/48*Math.PI*2;out.push(painted.paint([-x,Math.cos(t)*.2,Math.sin(t)*.2])??255);}return out;};
    const first=sample();expect(first).toEqual(sample());expect(first).toContain(M.BODY3);expect(first).toContain(M.BODYL);expect(first).toContain(M.NOSE);
    scale=50;expect(sample()).not.toEqual(first);
    const solid=paintTailParts(m.parts,{...options,filledFraction:1})!;
    expect(solid.paint([-.5,0,.2])).not.toBe(M.NOSE);
  });
  it("wires the region through a selected creature without changing its shape or Current",()=>{
    const record=structuredClone(GENOME_BY_ID.raccoon),before=JSON.stringify(GENOME_BY_ID.raccoon);
    Reflect.set(record,"coat",{...Reflect.get(record,"coat"),regions:{tail:{kind:"rings",count:5,width:.5,mat:"BODY3",tip:{length:.2,mat:"BODY2"}}}});
    const style={...defaultStyle(),creatureModels:"raccoon:roster",creatureVariants:{raccoon:{roster:record}}} as unknown as Style;
    const a=critter("raccoon",1,0,{...defaultStyle(),creatureModels:"raccoon:current"}),b=critter("raccoon",1,0,style);
    expect([b.w,b.h]).toEqual([a.w,a.h]);expect(b.n).toEqual(a.n);
    let changed=0;for(let i=0;i<a.m.length;i++)changed+=Number(a.m[i]!==b.m[i]);expect(changed).toBeGreaterThan(0);
    expect(JSON.stringify(GENOME_BY_ID.raccoon)).toBe(before);
  });
  it("rejects invalid fields and does not guess a path for non-chain tails",()=>{
    for(const options of [{kind:"rings",count:0},{kind:"rings",width:2},{kind:"rings",mat:"missing"},{tip:{length:2}},{kind:"gloss"}])expect(()=>paintTailParts(bent().parts,options)).toThrow(/Tail/);
    expect(()=>paintTailParts(new Model().ell([0,0,0],[1,1,1],M.BODY).parts,{kind:"spots"})).toThrow(/chain/);
    expect(tailPath([]).length).toBe(0);
  });
});
