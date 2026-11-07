import {describe,it,expect} from "vitest";
import {dorsalHeight,DORSAL_STATIONS,DORSAL_POSITIONS,selectedDorsalProfile,addDorsalProfile} from "../art/body-graph/dorsal.js";
import {acceptanceGraph,createAcceptanceVariants,buildAcceptanceModel} from "../art/body-graph/acceptance.js";
import {GENOMES,selectedCreatureGenome,speciesOf} from "../art/genome/index.js";
import {compileGraph} from "../art/body-graph/graph.js";
import {boundTreeBlendGroups} from "../art/body-graph/part-tree.js";

describe("shared q.spine dorsal profile",()=>{
  const pack=createAcceptanceVariants(GENOMES.map(g=>selectedCreatureGenome(g,{})));
  it("matches existing station, interpolation, signed height and end-fade semantics",()=>{
    const p={hip:.02,loin:-.04,waist:-.06,ribcage:.025,shoulder:.05};
    for(let i=0;i<DORSAL_STATIONS.length;i++)expect(dorsalHeight(p,DORSAL_POSITIONS[i])).toBeCloseTo(p[DORSAL_STATIONS[i] as keyof typeof p]);
    expect(dorsalHeight(p,-.125)).toBeCloseTo(-.05);
    expect(dorsalHeight(.08,-.675)).toBeCloseTo(.04);
    expect(dorsalHeight(.08,.655)).toBeCloseTo(.04);
    expect(dorsalHeight(p,-.85)).toBe(0);expect(dorsalHeight(p,.83)).toBe(0);
    expect(()=>dorsalHeight({waist:NaN},0)).toThrow();
  });
  it("carries every existing genomic dorsal profile unchanged and respects level/preset precedence",()=>{
    const existing=GENOMES.flatMap(g=>"body" in g&&"spine" in g.body&&g.body.spine!=null?[{id:g.id,genome:g,profile:g.body.spine}]:[]);
    expect(existing.map(g=>g.id)).toContain("wolf");expect(existing.map(g=>g.id)).toContain("stag");
    expect(existing).toHaveLength(10);
    for(const g of existing)expect(selectedDorsalProfile(g.genome,2)).toEqual(g.profile);
    const S={body:{spine:.02},levels:{1:{body:{spine:-.03}}},q:{spine:.04},levelQ:{2:{spine:.05}}};
    expect(selectedDorsalProfile(S,1)).toBe(-.03);expect(selectedDorsalProfile(S,2)).toBe(.05);
    expect(selectedDorsalProfile(S,2,{dorsal:0})).toBe(0);
  });
  it("adds a crest outside the torso and cuts a groove only from its parent torso",()=>{
    const {graph}=acceptanceGraph(pack.stag.graph,2),positive=compileGraph(graph).model,negative=compileGraph(graph).model;
    const crest=addDorsalProfile(positive,graph,{waist:.08}),groove=addDorsalProfile(negative,graph,{waist:-.08});
    expect(crest.some(m=>m.operation==="crest")).toBe(true);expect(groove.some(m=>m.operation==="groove")).toBe(true);
    const at=groove.find(m=>Math.abs(m.position)<1e-9)!.at;
    const before=compileGraph(graph).model.groupField(1,at);
    expect(negative.groupField(1,at)).toBeGreaterThan(before);
    expect(negative.parts.filter(p=>p.cut).every(p=>p.group===1)).toBe(true);
    boundTreeBlendGroups(negative);
    expect(negative.parts.filter(p=>p.cut).every(p=>p.group===1)).toBe(true);
    const counts=new Map<number,number>();for(const p of negative.parts)if(!p.cut)counts.set(p.group,(counts.get(p.group)??0)+1);
    expect(Math.max(...counts.values())).toBeLessThanOrEqual(3);
  });
  it.each(["wolf","stag"])("%s automatically receives its current dorsal data in selected graph renders",id=>{
    const record=pack[id].graph,S=speciesOf(record),{graph,plan}=acceptanceGraph(S,2),model=buildAcceptanceModel(S,2).model;
    const profile=selectedDorsalProfile(S,2,plan),marks=addDorsalProfile(compileGraph(graph).model,graph,profile);
    expect(marks.length).toBeGreaterThan(0);
    expect(model.parts.some(p=>p.dorsal)).toBe(true);
    expect(marks.every(m=>m.operation===(id==="wolf"?"groove":"crest"))).toBe(true);
  });
  it("is absent for the pinned bear candidate and does not alter its preset",()=>{
    const before=JSON.stringify(pack.bear.graph),{graph}=acceptanceGraph(pack.bear.graph,2),model=compileGraph(graph).model,parts=model.parts.slice();
    expect(selectedDorsalProfile(pack.bear.graph,2)).toBeNull();
    expect(addDorsalProfile(model,graph,null)).toEqual([]);expect(model.parts).toEqual(parts);
    expect(JSON.stringify(pack.bear.graph)).toBe(before);
  });
});
