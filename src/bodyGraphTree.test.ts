import {describe,it,expect} from "vitest";
import {sminBand,BLEND_CONVENTION,PART_FAMILIES,blendProfilePriors,familyBean,uvrMount,boundTreeBlendGroups} from "../art/body-graph/part-tree.js";
import {acceptanceGraph,createAcceptanceVariants,buildAcceptanceModel} from "../art/body-graph/acceptance.js";
import {compileGraph} from "../art/body-graph/graph.js";
import {GENOMES,selectedCreatureGenome} from "../art/genome/index.js";
import {Model} from "../art/model3d.js";
import {M} from "../art/core.js";

describe("research-based opt-in part tree",()=>{
  const pack=createAcceptanceVariants(GENOMES.map(g=>selectedCreatureGenome(g,{})));
  it("names the classic band convention and its B/4 bulge",()=>{
    expect(BLEND_CONVENTION).toBe("classic-quadratic-band-width");
    expect(sminBand(0,0,.08)).toBeCloseTo(-.02);
    expect(sminBand(.1,.3,.08)).toBe(.1);
    const m=new Model({blend:.08});for(let i=0;i<2;i++)m.ell([0,0,0],[1,1,1],M.BODY);
    expect(m.groupField(1,[1,0,0])).toBeCloseTo(sminBand(0,0,.08));
  });
  it("uses u along parent, v around cross-section, r skeleton-to-surface without SDF offsets",()=>{
    const parent=[{at:[0,1,0],r:[1,.5,.25]},{at:[2,1,0],r:[1,.5,.25]}];
    expect(uvrMount(parent,.5,0,1)).toEqual([1,1.5,0]);
    const side=uvrMount(parent,.5,.25,.4);expect(side[0]).toBe(1);expect(side[1]).toBeCloseTo(1);expect(side[2]).toBeCloseTo(.1);
    expect(uvrMount(parent,.5,0,0)).toEqual([1,1,0]);
    expect(()=>uvrMount(parent,.5,0,-.1)).toThrow();
    const upright=[{at:[0,0,0],r:[.1,.1,.1]},{at:[0,1,0],r:[.1,.1,.1]}];
    const mounted=uvrMount(upright,.5,0,1);
    expect(mounted[1]).toBeCloseTo(.5);expect(Math.abs(mounted[0])).toBeCloseTo(.1);
  });
  it.each(Object.keys(PART_FAMILIES))("%s blends reference radius profiles and varies radii, never positions",template=>{
    const graph=acceptanceGraph(pack.bear.graph,2).graph;
    const a=familyBean(graph.spine,{template,profileVariation:0}),b=familyBean(graph.spine,{template,profileVariation:.05,seed:17});
    expect(a.masses).toHaveLength(3);
    expect(a.masses.map(m=>m.at)).toEqual(b.masses.map(m=>m.at));
    expect(a.masses.map(m=>m.r)).not.toEqual(b.masses.map(m=>m.r));
    const deeper=familyBean(graph.spine,{template,ribcage:{depth:1.2},flank:{width:.8}});
    expect(deeper.masses[1].r[1]).toBeCloseTo(a.masses[1].r[1]*1.2);
    expect(deeper.masses[0].r[2]).toBeCloseTo(a.masses[0].r[2]*.8);
    expect(blendProfilePriors(template,[{kind:"reference",weight:1},{kind:"broad",weight:1}])).toEqual(blendProfilePriors(template,[{kind:"reference",weight:2},{kind:"broad",weight:2}]));
  });
  it.each(Object.keys(pack))("%s has a parent tree, three torso masses and no sibling limb/neck blend",id=>{
    const {graph}=acceptanceGraph(pack[id].graph,2),built=compileGraph(graph);
    const tree=graph as typeof graph & {bodyMasses:unknown[];blendConvention:string;partTree:{id:string;parent:string}[]};
    expect(tree.bodyMasses).toHaveLength(3);expect(tree.blendConvention).toBe(BLEND_CONVENTION);
    const known=new Set(["body"]);for(const part of tree.partTree.slice(1)){expect(known.has(part.parent)).toBe(true);known.add(part.id);}
    const sockets=graph.sockets as {kind:string;id:string}[];
    const limbs=sockets.filter(s=>s.kind==="leg"||s.kind==="neck");
    expect(new Set(limbs.map(s=>built.groups[s.id])).size).toBe(limbs.length);
    for(const age of [0,1,2,3]){
      const {model}=buildAcceptanceModel(pack[id].graph,age,0),counts=new Map<number,number>();
      for(const p of model.parts){if(!p.cut)counts.set(p.group,(counts.get(p.group)??0)+1);expect(p.group).toBeLessThan(256);}
      expect(Math.max(...counts.values())).toBeLessThanOrEqual(3);
    }
  });
  it("caps feature additions after the body without inflating a shared group",()=>{
    const m=new Model();for(let i=0;i<12;i++)m.ell([0,0,0],[1,1,1],M.BODY);
    boundTreeBlendGroups(m);const counts=new Map<number,number>();for(const p of m.parts)counts.set(p.group,(counts.get(p.group)??0)+1);
    expect([...counts.values()]).toEqual([3,3,3,3]);
  });
  it("bear anatomy preset carries a low forward head, hanging belly, low rump and tiny tail",()=>{
    for(const age of [0,1,2,3]){
      const {graph,plan}=acceptanceGraph(pack.bear.graph,age),compiled=compileGraph(graph);
      const tree=graph as typeof graph & {bodyMasses:{at:number[];r:number[]}[]};
      const head=compiled.sockets.head,front=Math.max(...tree.bodyMasses.map(m=>m.at[0]+m.r[0]));
      expect(head[0]).toBeGreaterThan(front);
      const highest=Math.max(...tree.bodyMasses.map(m=>m.at[1]+m.r[1]));
      expect(head[1]).toBeLessThan(highest);
      const rear=tree.bodyMasses[0],middle=tree.bodyMasses[1],shoulder=tree.bodyMasses[2];
      expect(shoulder.at[1]+shoulder.r[1]).toBeGreaterThan(rear.at[1]+rear.r[1]);
      expect(middle.at[1]-middle.r[1]).toBeLessThan(rear.at[1]-rear.r[1]);
      const tail=(graph.sockets as {id:string;points:number[][]}[]).find(s=>s.id==="tail");
      if(!tail)throw Error("Missing tail");
      const tip=compiled.sockets.tail[0]+tail.points.at(-1)![0];
      const rump=Math.min(...tree.bodyMasses.map(m=>m.at[0]-m.r[0]));
      expect(Math.abs(tip-rump)).toBeLessThan(.12);
      const {model}=buildAcceptanceModel(pack.bear.graph,age);
      expect(model.anchors.feet).toHaveLength(4);
      expect(plan.limbRadius).toBeGreaterThanOrEqual(.13);
      expect(plan.footShape.pads).toBe(true);
      expect(plan.footShape.claws).toBe(true);
      expect(plan.headShape.eyes.glint).toBeGreaterThan(0);
      expect(plan.headShape.muzzleTaper).toBeLessThan(1);
      for(const foot of model.anchors.feet as {c:number[]}[])expect(foot.c[1]-.07).toBeCloseTo(0,1);
    }
    const cub=acceptanceGraph(pack.bear.graph,0).plan,adult=acceptanceGraph(pack.bear.graph,2).plan;
    expect(cub.head/cub.width).toBeGreaterThan(adult.head/adult.width);
    expect(cub.muzzle).toBeLessThan(adult.muzzle);
    expect(cub.headShape.ears.size).toBeGreaterThan(adult.headShape.ears.size);
  });
});
