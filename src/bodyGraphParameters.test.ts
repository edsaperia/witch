import {describe,it,expect} from "vitest";
import {HEAD_FAMILIES,headParameters,shapeEnvelope,buildFamilyHead,familyMarking,tailPoints} from "../art/body-graph/expressiveness.js";
import {compareSilhouettes} from "../art/body-graph/silhouette.js";
import {acceptanceGraph,createAcceptanceVariants,buildAcceptanceModel} from "../art/body-graph/acceptance.js";
import {GENOMES,selectedCreatureGenome} from "../art/genome/index.js";
import {Model} from "../art/model3d.js";
import {M} from "../art/core.js";

describe("graph expressiveness parameters",()=>{
  it.each(Object.keys(HEAD_FAMILIES))("%s has shared skull/muzzle/ear/eye/jaw anatomy without a species builder",family=>{
    const h=headParameters({family}),model=new Model();
    buildFamilyHead(model,[0,1,0],.2,{family,ears:{kind:"leaf",size:1.2},eyes:{size:.08},mouth:true},{muzzle:.3});
    expect(h.skull.every((v:number)=>v>0)).toBe(true);
    expect(model.parts.some(p=>p.mat===M.MOUTH)).toBe(true);
    expect(model.parts.filter(p=>p.mat===M.EYE)).toHaveLength(2);
  });
  it("soft tissue falloff changes neighbouring skin smoothly and fur expands rather than replacing it",()=>{
    const graph=()=>({spine:Array.from({length:7},(_,i)=>({at:[i,0,0],r:[.2,.2,.2]}))});
    const tight=graph(),soft=graph();
    shapeEnvelope(tight,{volumes:[{at:.5,size:.1,softness:.1}]});
    shapeEnvelope(soft,{volumes:[{at:.5,size:.1,softness:.3}],furShell:{thickness:.02,softness:.2}});
    expect(soft.spine[2].r[1]).toBeGreaterThan(tight.spine[2].r[1]);
    expect(soft.spine[3].r[1]).toBeCloseTo(.32);
    expect(()=>shapeEnvelope(graph(),{volumes:[{at:.5,size:-1,softness:.1}]})).toThrow();
  });
  it("bear bulk and round skull are preset data, with serializable age overrides",()=>{
    const pack=createAcceptanceVariants(GENOMES.map(g=>selectedCreatureGenome(g,{})));
    const record=pack.bear.graph,before=JSON.stringify(record);
    for(let age=0;age<4;age++){
      const {plan,graph}=acceptanceGraph(record,age,0);
      expect(plan.headShape.family).toBe("ursine");
      expect(plan.volumes.map((v:{region:string})=>v.region)).toEqual(["neck","shoulder","chest","belly","haunch"]);
      const head=(graph.sockets as {id:string;r:number[]}[]).find(s=>s.id==="head");
      if(!head)throw Error("Missing skull");
      expect(head.r[1]).toBeGreaterThan(head.r[0]);
      expect(buildAcceptanceModel(record,age,0).model.parts.length).toBeGreaterThan(30);
    }
    expect(JSON.stringify(record)).toBe(before);
    expect(JSON.parse(before)).toEqual(record);
  });
  it("tail families and soft painted regions are bounded deterministic controls",()=>{
    for(const kind of ["stub","bushy","whip","fluffy"]){
      const points=tailPoints({kind,length:.4,thickness:.05},.4,.05,0);
      expect(points.every(p=>p.every(Number.isFinite)&&p[3]>0)).toBe(true);
    }
    const mark={kind:"mask",centre:[0,0,0],radius:[1,1,1],softness:.2,mat:"BODY3"};
    expect(familyMarking(mark,[0,0,0])).toBe(M.BODY3);
    expect(familyMarking(mark,[2,0,0])).toBeUndefined();
    const edge=Array.from({length:100},(_,i)=>familyMarking(mark,[.98,i/1000,0]));
    expect(edge.some(v=>v===undefined)).toBe(true);
    expect(edge.some(v=>v===M.BODY3)).toBe(true);
  });
});

describe("native silhouette comparison",()=>{
  it("scores identity and overlap without normalizing shape or optimizing alignment",()=>{
    const a={w:3,h:2,m:new Uint8Array([0,1,0,1,1,1])};
    expect(compareSilhouettes(a,a).score.iou).toBe(1);
    const b={w:3,h:2,m:new Uint8Array([1,0,0,0,1,1])};
    const score=compareSilhouettes(a,b).score;
    expect(score.iou).toBeCloseTo(2/5);
    expect(score.precision).toBeCloseTo(2/3);
    expect(score.recall).toBeCloseTo(.5);
  });
  it("aligns different canvas heights on the same native ground",()=>{
    const a={w:1,h:1,m:new Uint8Array([1])},b={w:1,h:3,m:new Uint8Array([0,0,1])};
    expect(compareSilhouettes(a,b).score.iou).toBe(1);
  });
});
