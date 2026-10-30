import {createHash} from "node:crypto";
import {describe,expect,it} from "vitest";
import {bibCoordinates,regionMarking} from "../art/body-graph/quadruped.js";
import {M,Sprite} from "../art/core.js";
import {Model} from "../art/model3d.js";
import {quad3d,withForm} from "../art/creatures3d.js";
import {critter} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";
import {GENOME_BY_ID,speciesOf} from "../art/genome/index.js";
import type {Style} from "./render/style";

const definition={kind:"bib",mat:"BELLY",extent:{along:[-.8,.95],width:1,depth:1.5}};
describe("localized shared throat/chest bib paint",()=>{
  it("pins projected-fit marten pixels and normal bytes with the field absent",()=>{
    const hash=createHash("sha256");for(const facing of ["towards","away"]){const sp=critter("marten",1,0,defaultStyle(),facing);hash.update(JSON.stringify([sp.w,sp.h]));for(const bytes of [sp.m,sp.n])hash.update(Buffer.from(bytes.buffer,bytes.byteOffset,bytes.byteLength));}
    // Projected-fit baseline (6519883775); the optional bib remains absent.
    expect(hash.digest("hex")).toBe("22a10e0e590d0131f22046b97125ba11a3e2be6a6c1b3592aa5073ea2850dc82");
  });
  it("bounds the shared paint to the underside of the neck and local chest",()=>{
    expect(regionMarking([.4,.5,0],definition)).toBe(M.BELLY);
    expect(regionMarking([-.6,.5,.5],definition)).toBe(M.BELLY);
    for(const point of [[-2,.5,0],[1.1,.5,0],[.4,-.1,0],[.4,1.6,0],[.4,.5,1.1]])expect(regionMarking(point,definition)).toBe(null);
    expect(regionMarking([.4,.5,0],{...definition,mat:M.BODYL})).toBe(M.BODYL);
    const base=[0,0,0],head=[1,1,0],p=[.6,.2,.1],before=p.slice();
    const coordinates=bibCoordinates(p,base,head,.4);
    expect(coordinates[0]).toBeCloseTo(.4);expect(coordinates[1]).toBeGreaterThan(0);expect(coordinates[2]).toBeCloseTo(.25);expect(p).toEqual(before);
    expect(()=>bibCoordinates(p,base,base,.4)).toThrow(/Bib/);
  });
  it("paints a selected cream bib with a brown belly and no geometry changes",()=>{
    const record=structuredClone(GENOME_BY_ID.marten),before=JSON.stringify(GENOME_BY_ID.marten);
    Reflect.set(record,"coat",{...Reflect.get(record,"coat"),belly:false,bib:{mat:"BELLY",extent:definition.extent}});
    const selected={...defaultStyle(),creatureModels:"marten:roster",creatureVariants:{marten:{roster:record}}} as unknown as Style;
    for(const facing of ["towards","away"]){const current=critter("marten",1,0,defaultStyle(),facing),candidate=critter("marten",1,0,selected,facing);
      const count=(m:Uint8Array)=>m.filter(v=>v===M.BELLY).length;
      expect(count(candidate.m)).toBeGreaterThan(0);
      expect([candidate.w,candidate.h]).toEqual([current.w,current.h]);expect(candidate.n).toEqual(current.n);
    }
    let model!:Model;
    const form=Object.assign((m:Model)=>{model=m;return new Sprite(1,1);},{motes:false});
    withForm(form,()=>quad3d(speciesOf(record),1,0,defaultStyle()));
    const rig=Reflect.get(model,"rig"),body=model.parts.find(p=>p.part==="body"&&p.paint)!;
    expect(body.paint([0,rig.chest+.05,0])).not.toBe(M.BELLY); // centre underside stays brown
    const {nb,H}=rig.head,dx=H[0]-nb[0],dy=H[1]-nb[1],length=Math.hypot(dx,dy);
    const throat=[(nb[0]+H[0])/2+dy/length*.05,(nb[1]+H[1])/2-dx/length*.05,0];
    const neck=model.parts.find(p=>p.part==="head"&&p.type==="cone"&&p.paint)!;
    expect(neck.paint(throat)).toBe(M.BELLY);
    expect(JSON.stringify(GENOME_BY_ID.marten)).toBe(before);
  });
  it("requires a finite localized extent and valid material",()=>{
    for(const extent of [{along:[-2,1],width:1,depth:1},{along:[.5,.1],width:1,depth:1},{along:[0,1],width:0,depth:1},{along:[0,1],width:1,depth:3}])expect(()=>regionMarking([0,0,0],{...definition,extent})).toThrow(/Bib/);
    expect(()=>regionMarking([0,0,0],{...definition,mat:"missing"})).toThrow(/Bib/);
  });
});
