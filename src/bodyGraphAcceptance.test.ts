import {describe,expect,it} from "vitest";
import {GENOMES,selectedCreatureGenome} from "../art/genome/index.js";
import {ACCEPTANCE_IDS,createAcceptanceVariants,buildAcceptanceModel,acceptanceGraph} from "../art/body-graph/acceptance.js";
import {compileGraph,validateGraph} from "../art/body-graph/graph.js";
import {quadrupedFixture} from "../art/body-graph/fixtures.js";

describe("explicit body graph acceptance pack",()=>{
  const records=GENOMES.map(g=>selectedCreatureGenome(g,{}));
  const pack=createAcceptanceVariants(records);
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
      if(id==="hydra")expect(meta.heads).toHaveLength([1,3,5,7][age]);
      if(id==="bat")expect((graph.sockets as {kind:string}[]).filter(s=>s.kind==="membrane")).toHaveLength(6);
    }
    expect(JSON.stringify(record)).toBe(before);
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
