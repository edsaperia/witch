import { describe, expect, it } from "vitest";
import { catCaptureGenome } from "../tools/body-graph/cat-fixtures.js";
import { GENOME_BY_ID, speciesOf } from "../art/genome/index.js";
import { quad3d, withForm } from "../art/creatures3d.js";
import { defaultStyle } from "../art/generator.js";
import { Model, render, YAW, PITCH } from "../art/model3d.js";
import { Sprite, M } from "../art/core.js";
import { triangularEarMask } from "../art/body-graph/quadruped.js";
import gameStyle from "../config/style.json";
import tuning from "../config/tuning.json";
import { critter, withView } from "../art/creatures.js";
import { connectivityRegression } from "../art/genome/connectivity.js";
import type { Style } from "./render/style";

function adult() {
  let model!: Model, height = 0;
  const form = Object.assign((m: Model, o: {height:number}) => { model = m; height = o.height; return new Sprite(1, 1); }, { motes: false });
  withForm(form, () => quad3d(speciesOf(catCaptureGenome(GENOME_BY_ID.cat)), 2, 0, Object.assign(defaultStyle(),gameStyle,{pixel:tuning.pixelSize})));
  return { model, height };
}
describe("sand-cat ear projection gate", () => {
  it("does not regress baby/adult attachment in any game-style facing and retains Current baby",()=>{
    const current=Object.assign(defaultStyle(),gameStyle,{pixel:tuning.pixelSize}) as unknown as Style;
    const selected={...current,creatureModels:"cat:graph",creatureVariants:{cat:{graph:catCaptureGenome(GENOME_BY_ID.cat)}}} as unknown as Style;
    for(const facing of ["towards","away","top"])for(const level of [0,2]){
      const draw=(style:Style)=>critter("cat",level,0,style,facing==="top"?"towards":facing);
      const sp=facing==="top"?withView({yaw:.6,pitch:Math.PI/2},()=>draw(selected)):draw(selected);
      const baseline=facing==="top"?withView({yaw:.6,pitch:Math.PI/2},()=>draw(current)):draw(current);
      const comparison=connectivityRegression(baseline,sp);
      expect(comparison.good,`${level} ${facing} attachment regression: ${JSON.stringify(comparison)}`).toBe(true);
      if(level===0){const base=facing==="top"?withView({yaw:.6,pitch:Math.PI/2},()=>draw(current)):draw(current);expect(sp.m).toEqual(base.m);expect(sp.n).toEqual(base.n);}
    }
  });
  it.each(["towards","away","top"])("both ears have visible pixels in the actual %s render without a narrow horn",facing=>{
    const {model,height}=adult(), yaw=facing==="top"?.6:YAW[facing as "towards"|"away"],pitch=facing==="top"?Math.PI/2:PITCH;
    const measureOptions={height,yaw,pitch,measure:true},scale=render(model,measureOptions).s;
    for(const group of [5,25]){
      const tagged=Object.assign(new Model(),model,{atScale:null,flats:model.flats.map(f=>f.group===group?{...f,mask:(s:number,t:number)=>f.mask(s,t)?M.WOKEN:null}:f)});
      const options={scale,yaw,pitch},sp=render(tagged,options).sp!,xs:number[]=[],ys:number[]=[];
      for(let i=0;i<sp.m.length;i++)if(sp.m[i]===M.WOKEN){xs.push(i%sp.w);ys.push(Math.floor(i/sp.w));}
      expect(xs.length,`${facing} ear group ${group} visible pixels`).toBeGreaterThanOrEqual(4);
      const width=Math.max(...xs)-Math.min(...xs)+1,height=Math.max(...ys)-Math.min(...ys)+1;
      if(facing!=="top")expect(height/width,`${facing} ear group ${group} projected aspect`).toBeLessThan(1.2);
    }
  });
  it("uses straight triangular edges rather than the old rounded leaf", () => {
    const mask=triangularEarMask(M.BODY,M.EAR,M.BODY3);
    for(let t=-1;t<1;t+=.05){const half=(1-t)/2; expect(mask(half-.001,t)).not.toBe(null);expect(mask(half+.001,t)).toBe(null);}
    expect(mask(0,1)).toBe(M.BODY3);
  });
  it.each(["towards", "away", "top"])("both adult tips clear the skull by 2 art px with pointed outlines in %s", facing => {
    const { model, height } = adult(), rig = Reflect.get(model, "rig"), head = rig.head;
    const skull = model.parts.find(p => p.type === "ell" && p.c.every((v:number,i:number) => Math.abs(v-head.H[i]) < 1e-8))!;
    const yaw = facing === "top" ? .6 : YAW[facing as "towards" | "away"], pitch = facing === "top" ? Math.PI/2 : PITCH;
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const project = (p:number[]) => [p[0]*cy-p[2]*sy, -(p[1]*cp-(p[0]*sy+p[2]*cy)*sp)];
    const options = { height, yaw, pitch, measure:true }, scale = render(model, options).s;
    const centre = project(head.H), axes = skull.axes.map((a:number[],i:number) => project(a.map(v=>v*skull.r[i])));
    const a = axes.reduce((s:number,v:number[])=>s+v[0]*v[0],0), b = axes.reduce((s:number,v:number[])=>s+v[0]*v[1],0), c = axes.reduce((s:number,v:number[])=>s+v[1]*v[1],0), det = a*c-b*b;
    for (const ear of rig.ears) {
      expect(ear.vertices, "ear must have a true triangular outline").toHaveLength(3);
      // A raised but detached ear could pass a projection test. Require the
      // socket to remain within the actual skull volume as well.
      expect(ear.base.reduce((sum:number,x:number,i:number)=>sum+((x-head.H[i])/skull.r[i])**2,0)).toBeLessThanOrEqual(1);
      const [left,right,tip] = ear.vertices.map(project), d = tip.map((v:number,i:number)=>v-centre[i]);
      const radial = Math.sqrt((c*d[0]*d[0]-2*b*d[0]*d[1]+a*d[1]*d[1])/det);
      // The smallest singular value of the ellipse transform gives a lower
      // bound on Euclidean clearance, unlike radial distance which can overstate it.
      const minRadius=Math.sqrt((a+c-Math.sqrt((a-c)**2+4*b*b))/2);
      const clearance = (radial-1)*minRadius*scale;
      expect(clearance, `${facing} side ${ear.side} tip clearance`).toBeGreaterThanOrEqual(2);
      const u=left.map((v:number,i:number)=>v-tip[i]), v=right.map((x:number,i:number)=>x-tip[i]);
      const angle=Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)))))*180/Math.PI;
      expect(angle, `${facing} side ${ear.side} tip angle`).toBeLessThan(80);
    }
  });
});
