import {expect,it} from "vitest";
import {mole3d,withForm} from "../art/creatures3d.js";
import {render,Model} from "../art/model3d.js";
import {Sprite} from "../art/core.js";
import {speciesOf,GENOME_BY_ID} from "../art/genome/index.js";
import {defaultStyle} from "../art/generator.js";

function capture(look:Record<string,unknown>,level=2,frame=0,facing="towards"){
  let model!:Model,options!:Record<string,any>;
  const g=structuredClone(GENOME_BY_ID.mole);Reflect.set(g,"look",{mole:look});
  const form=Object.assign((m:Model,o:Record<string,any>)=>{model=m;options=o;return new Sprite(1,1);},{motes:false});
  withForm(form,()=>mole3d(speciesOf(g),level,frame,defaultStyle(),facing));
  return {model,options};
}
function scale(c:ReturnType<typeof capture>){return render(c.model,{...c.options,measure:true}).s;}
it("keeps the final age target governing pinned and unpinned mole proportions",()=>{
  for(const [level,frame,facing] of [[0,0,"towards"],[1,1,"away"],[2,0,"away"],[3,1,"towards"]] as const){
    const base=capture({},level,frame,facing),candidate=capture({fit:"current",bodyLength:1.7,bodyVerticalDepth:1.65,bodyWidth:1,snoutThickness:1.3,forepawForward:.1},level,frame,facing);
    expect(candidate.options.sizeTarget).toBe(base.options.sizeTarget);
    expect(candidate.options.scale).toBeGreaterThan(0);
    const bare=capture({fit:"current"},level,frame,facing);
    expect(scale(bare)).toBeCloseTo(scale(base),12);
  }
},60000);
it("separates barrel vertical depth and width without changing the other axis",()=>{
  const body=(c:ReturnType<typeof capture>)=>c.model.parts.find(p=>p.type==="ell"&&p.c[0]===0&&p.c[2]===0)!;
  const base=body(capture({})),deep=body(capture({bodyVerticalDepth:1.6})),wide=body(capture({bodyWidth:1.4}));
  expect(deep.r[1]/base.r[1]).toBeCloseTo(1.6);expect(deep.r[2]).toBe(base.r[2]);
  expect(wide.r[2]/base.r[2]).toBeCloseTo(1.4);expect(wide.r[1]).toBe(base.r[1]);
});
it("moves and reshapes existing snout/paws and rejects invalid controls",()=>{
  const a=capture({}).model.parts,b=capture({snoutThickness:1.4,snoutForward:.1,snoutLift:.05,forepawForward:.15,forepawLength:1.3,forepawWidth:1.5,forepawThickness:.6}).model.parts;
  const snout=(p:any[])=>p.find(q=>q.type==="ell"&&q.group===1&&q.c[0]>.5&&q.r[0]>.2)!;
  expect(snout(b).c[0]-snout(a).c[0]).toBeCloseTo(.1);expect(snout(b).c[1]-snout(a).c[1]).toBeCloseTo(.05);expect(snout(b).r[1]/snout(a).r[1]).toBeCloseTo(1.4);
  const hand=(p:any[])=>p.find(q=>q.type==="ell"&&q.group===7&&q.r[0]>.1)!;
  expect(hand(b).c[0]-hand(a).c[0]).toBeCloseTo(.15);
  for(const [i,k] of [[0,1.3],[1,.6],[2,1.5]])expect(hand(b).r[i]/hand(a).r[i]).toBeCloseTo(k);
  for(const look of [{fit:"global"},{bodyWidth:0},{forepawThickness:-1},{snoutLift:Infinity}])expect(()=>capture(look)).toThrow(/Mole/);
});
