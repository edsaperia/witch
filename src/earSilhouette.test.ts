import { describe, expect, it } from "vitest";
import { catCaptureGenome } from "../tools/body-graph/cat-fixtures.js";
import { GENOME_BY_ID, speciesOf } from "../art/genome/index.js";
import { quad3d, withForm } from "../art/creatures3d.js";
import { defaultStyle } from "../art/generator.js";
import { Model, render, YAW, PITCH } from "../art/model3d.js";
import { Sprite, M } from "../art/core.js";
import { triangularEarMask } from "../art/body-graph/quadruped.js";

function adult() {
  let model!: Model, height = 0;
  const form = Object.assign((m: Model, o: {height:number}) => { model = m; height = o.height; return new Sprite(1, 1); }, { motes: false });
  withForm(form, () => quad3d(speciesOf(catCaptureGenome(GENOME_BY_ID.cat)), 2, 0, defaultStyle()));
  return { model, height };
}
describe("sand-cat ear projection gate", () => {
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
