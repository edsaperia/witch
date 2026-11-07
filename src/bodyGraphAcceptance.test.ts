import {describe,expect,it} from "vitest";
import {GENOMES,selectedCreatureGenome} from "../art/genome/index.js";
import {ACCEPTANCE_IDS,createAcceptanceVariants,buildAcceptanceModel,acceptanceGraph,acceptanceCoat} from "../art/body-graph/acceptance.js";
import {sampleLeg} from "../art/body-graph/gait.js";
import {M} from "../art/core.js";
import {compileGraph,validateGraph} from "../art/body-graph/graph.js";
import {quadrupedFixture} from "../art/body-graph/fixtures.js";
import {critter} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";

describe("explicit body graph acceptance pack",()=>{
  const records=GENOMES.map(g=>selectedCreatureGenome(g,{}));
  const pack=createAcceptanceVariants(records);
  it.each(ACCEPTANCE_IDS)("%s renders through the real selected critter entry point",id=>{
    const style={...defaultStyle(),creatureModels:`${id}:graph`,creatureVariants:pack};
    const sprite=critter(id,0,0,style);
    expect(sprite.w).toBeGreaterThan(0);
    expect(sprite.h).toBeGreaterThan(0);
    expect(sprite.m.some((material:number)=>material!==0)).toBe(true);
    expect(Array.from(sprite.n).every(Number.isFinite)).toBe(true);
  });
  it.each(["snail","hydra"])("%s has distinct real baked crawl frames",id=>{
    const style={...defaultStyle(),creatureModels:`${id}:graph`,creatureVariants:pack};
    const a=critter(id,0,0,style),b=critter(id,0,1,style);
    expect({w:a.w,h:a.h,m:a.m,n:a.n}).not.toEqual({w:b.w,h:b.h,m:b.m,n:b.n});
    for(let age=0;age<4;age++)expect(acceptanceGraph(pack[id].graph,age,0).graph).not.toEqual(acceptanceGraph(pack[id].graph,age,1).graph);
  });
  it("uses only explicit graph selection and preserves Current and unavailable-mode fallbacks",()=>{
    for(const base of GENOMES){
      const shipped=selectedCreatureGenome(base,{});
      expect(selectedCreatureGenome(base,{creatureVariants:pack})).toBe(shipped);
      expect(selectedCreatureGenome(base,{creatureModels:`${base.id}:current`,creatureVariants:pack})).toBe(base);
      const selected=selectedCreatureGenome(base,{creatureModels:`${base.id}:graph`,creatureVariants:pack});
      if(pack[base.id])expect(selected).toEqual(pack[base.id].graph);
      else expect(selected).toBe(base);
    }
  });
  it("transports exactly six complete records without changing shipped records",()=>{
    expect(Object.keys(pack).sort()).toEqual([...ACCEPTANCE_IDS].sort());
    expect(JSON.parse(JSON.stringify(pack))).toEqual(pack);
    for(const base of records){
      expect(base.look?.bodyGraphAcceptance).toBeUndefined();
      if(pack[base.id]){
        const candidate=structuredClone(pack[base.id].graph);
        delete candidate.look.bodyGraphAcceptance;
        if(base.id==="bear"){
          expect((candidate as any).palette).toMatchObject({hue:.07,sat:.5,val:.43,over:{BODYL:[151,119,87],BODY2:[125,92,61],BELLY:[190,151,104]}});
          (candidate as any).palette=(base as any).palette;
        }
        if(!base.look)delete candidate.look;
        expect(candidate).toEqual(base);
      }
    }
  });
  it.each(ACCEPTANCE_IDS)("%s builds all four ages without mutating its record",id=>{
    const record=pack[id].graph,before=JSON.stringify(record);
    for(let age=0;age<4;age++)for(const frame of [0,1]){
      const {model,meta}=buildAcceptanceModel(record,age,frame);
      expect(model.parts.length).toBeGreaterThan(0);
      const {graph}=acceptanceGraph(record,age,frame);
      expect(Object.hasOwn(model.anchors,"head")).toBe(true);
      expect(()=>validateGraph(graph)).not.toThrow();
      if(meta.family==="quadruped")expect(model.anchors.feet).toHaveLength(4);
      if(id==="hydra")expect(meta.heads).toHaveLength([1,3,5,11][age]);
      if(id==="bat")expect((graph.sockets as {kind:string}[]).filter(s=>s.kind==="membrane")).toHaveLength(6);
    }
    expect(JSON.stringify(record)).toBe(before);
  });
  it("keeps wolf heels raised and all three bone lengths throughout a cycle",()=>{
    const {graph}=acceptanceGraph(pack.wolf.graph,2);
    const {legs}=compileGraph(graph);
    const length=(a:number[],b:number[])=>Math.hypot(...a.map((v,i)=>v-b[i]));
    for(const leg of legs){
      expect(leg.heel).toBeDefined();
      if(!leg.heel)throw Error("Missing wolf heel");
      for(let i=0;i<=100;i++){
        const pose=sampleLeg(leg,i/100,{lift:.075});
        if(!pose.heel)throw Error("Missing posed heel");
        expect(pose.reachable).toBe(true);
        expect(length(pose.root,pose.knee)).toBeCloseTo(length(leg.root,leg.knee),8);
        expect(length(pose.knee,pose.heel)).toBeCloseTo(length(leg.knee,leg.heel),8);
        expect(length(pose.heel,pose.end)).toBeCloseTo(length(leg.heel,leg.end),8);
        expect(pose.heel[1]).toBeGreaterThan(pose.end[1]);
        expect(pose.end[1]).toBeGreaterThanOrEqual(leg.end[1]-1e-9);
      }
    }
  });
  it("paints anatomical coat regions and limits fawn spots to juvenile ages",()=>{
    const meta={headX:.7,headY:1.2,headRadius:.2,top:1,depth:.25,length:1,width:.2};
    expect(acceptanceCoat({coat:"muzzle"},2,meta,[.9,1.1,0],"head")).toBe(M.BELLY);
    expect(acceptanceCoat({coat:"saddle"},2,meta,[0,.95,.1],"body")).toBe(M.BODY3);
    expect(acceptanceCoat({coat:"saddle"},2,meta,[0,.5,0],"body")).toBe(M.BELLY);
    expect(acceptanceCoat({coat:"fawn"},0,meta,[0,.75,.2],"body")).toBe(M.BELLY);
    expect(acceptanceCoat({coat:"fawn"},2,meta,[0,.75,.2],"body")).toBeUndefined();
  });
  it("attaches children at neck tips and rejects missing parents and collapsed membranes",()=>{
    const graph: {spine: ReturnType<typeof quadrupedFixture>["spine"]; sockets: Record<string,unknown>[]} = quadrupedFixture();
    graph.sockets=[{id:"neck",kind:"neck",station:graph.spine[0].id,offset:[0,0,0],points:[[0,0,0,.1],[.2,.2,0,.05]]},{id:"head",kind:"head",parent:"neck",offset:[.1,0,0],r:[.1,.1,.1]}];
    const built=compileGraph(graph);
    expect(built.sockets.head).toEqual(built.sockets.neck.map((v,i)=>v+(i===0?.1:0)));
    graph.sockets[1].parent="missing";
    expect(()=>validateGraph(graph)).toThrow(/preceding parent/);
    graph.sockets=[{id:"wing",kind:"membrane",station:graph.spine[0].id,offset:[0,0,0],vertices:[[0,0,0],[1,0,0],[2,0,0]]}];
    expect(()=>validateGraph(graph)).toThrow(/degenerate membrane/);
  });
});
