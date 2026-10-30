import {expect,it} from "vitest";
import {quad3d,dragonfly3d,withForm,withTexture} from "../art/creatures3d.js";
import {speciesOf,GENOME_BY_ID} from "../art/genome/index.js";
import {Model} from "../art/model3d.js";
import {Sprite} from "../art/core.js";
import {defaultStyle} from "../art/generator.js";
function capture(id:string,edit:(g:any)=>void,level=2,frame=0,facing="towards"){
  const g=structuredClone(GENOME_BY_ID[id]);edit(g);let model!:Model,options!:Record<string,any>;
  const form=Object.assign((m:Model,o:Record<string,any>)=>{model=m;options=o;return new Sprite(1,1);},{motes:false});
  const S=speciesOf(g),st=defaultStyle();
  withForm(form,()=>withTexture({S,level,st},()=> (id==="dragonfly"?dragonfly3d:quad3d)(S,level,frame,st,facing)));return {model,options};
}
it("lets the final age target govern pinned quadruped proportion changes",()=>{
  for(const id of ["fennec","wolf"])for(const [level,frame,facing] of [[0,0,"towards"],[1,1,"away"],[2,0,"away"],[3,1,"towards"]] as const){
    const base=capture(id,()=>{},level,frame,facing),candidate=capture(id,g=>{g.look={...g.look,[id]:{fit:"current"}};g.body={...g.body,hgt:1.6,len:2};for(const l of g.levels??[])if(l){l.body={...l.body,hgt:1.6,len:2};l.parts={...l.parts,ears:{kind:"sail",size:4}};}},level,frame,facing);
    expect(candidate.options.sizeTarget).toBe(base.options.sizeTarget);
    expect(candidate.options.scale).toBeGreaterThan(0);
  }
  expect(()=>capture("fennec",g=>{g.look={fennec:{fit:"other"}};})).toThrow(/Quadruped fit/);
},60000);
it("keeps dragonfly wing length and width independent and their roots fixed",()=>{
  const base=capture("dragonfly",()=>{}).model.flats;
  const changed=capture("dragonfly",g=>{g.levels[2].body={...g.levels[2].body,wingLength:1.7,wingWidth:.6};}).model.flats;
  for(let i=0;i<4;i++){
    expect(changed[i].su/base[i].su).toBeCloseTo(1.7);expect(changed[i].sv/base[i].sv).toBeCloseTo(.6);
    for(let j=0;j<3;j++)expect(changed[i].c[j]-changed[i].u[j]*changed[i].su).toBeCloseTo(base[i].c[j]-base[i].u[j]*base[i].su,12);
  }
});
it("sets wing elevation in radians, including flat panes in both frames",()=>{
  for(const frame of [0,1])for(const angle of [0,.3,-.2]){
    const c=capture("dragonfly",g=>{g.levels[2].body={...g.levels[2].body,wingAngle:angle};},2,frame);
    for(const f of c.model.flats)expect(Math.asin(f.u[1])).toBeCloseTo(angle,12);
  }
  for(const body of [{wingLength:0},{wingWidth:NaN},{wingAngle:Math.PI/2}])expect(()=>capture("dragonfly",g=>{g.levels[2].body={...g.levels[2].body,...body};})).toThrow(/Dragonfly/);
});
