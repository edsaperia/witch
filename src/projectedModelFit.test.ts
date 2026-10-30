import {expect,it} from "vitest";
import {Model,projectedInterval,render} from "../art/model3d.js";
import {M} from "../art/core.js";
import {occupiedHeight} from "../art/creature-size.js";

it("uses exact ellipsoid support instead of its largest radius",()=>{
  const m=new Model().ell([0,1,0],[3,.2,.4],M.BODY),q=m.parts[0];
  expect(projectedInterval(q,[0,1,0])).toEqual([.8,1.2]);
  const axis=[Math.SQRT1_2,Math.SQRT1_2,0],radius=Math.hypot(3*axis[0],.2*axis[1]);
  expect(projectedInterval(q,axis)[1]).toBeCloseTo(Math.SQRT1_2+radius,12);
  const options={height:40,yaw:0,pitch:0,measure:true,projected:true};
  expect(render(m,options).s).toBeCloseTo(100,10);
});
it("bounds rounded boxes, tapered cones and roughness conservatively",()=>{
  const box=new Model().box([0,0,0],[2,.3,.4],M.BODY,{round:.1}).parts[0];
  expect(projectedInterval(box,[0,1,0])).toEqual([-.3,.3]);
  const cone=new Model().seg([0,0,0],[2,1,0],.2,.5,M.BODY).parts[0];
  expect(projectedInterval(cone,[0,1,0])).toEqual([-.2,1.5]);
  const ell=new Model().ell([0,0,0],[1,.2,.3],M.BODY,{rough:.02}).parts[0];
  expect(projectedInterval(ell,[0,1,0])[1]).toBeCloseTo(.23,12);
});
it("fits skew plane coordinates using the same dual basis as ray clipping",()=>{
  const m=new Model().flat([0,0,0],[1,0,0],[1,1,0],2,1,()=>M.BODY),f=m.flats[0];
  expect(projectedInterval(f,[1,0,0])).toEqual([-2,2]);
  expect(projectedInterval(f,[0,1,0])[1]).toBeCloseTo(2+Math.SQRT2,12);
});
it("retains extras exclusion, explicit scale, projection and ground-row placement",()=>{
  const m=new Model().ell([0,.3,0],[.5,.3,.2],M.BODY);
  const options={height:40,yaw:0,pitch:0,measure:true,projected:true},s=render(m,options).s;
  m.ell([0,2,0],[.1,.3,.1],M.MAGIC,{extra:true});
  expect(render(m,options).s).toBe(s);
  const fixed={...options,measure:false,scale:50},result=render(m,fixed),sp=result.sp!;
  expect(result.s).toBe(50);expect(sp.m.slice((sp.h-1)*sp.w).some(v=>v!==0)).toBe(true);
  const centre=result.project!([0,.3,0]);expect(centre[0]).toBeGreaterThan(0);expect(centre[0]).toBeLessThan(sp.w);expect(centre[1]).toBeLessThan(sp.h);
  expect(m.anchors.feet).toEqual([]); // fitting never mutates model anchors
});
it("sparse edge and query rays match the full native mask after ground placement",()=>{
  const make=()=>{const m=new Model().ell([0,.4,0],[.7,.4,.3],M.BODY,{rough:.01}).seg([-.4,.4,0],[.8,.8,.1],.12,.04,M.ACCENT);Reflect.set(m,'clipY',.12);return m;};
  for(const facing of ['towards','away'])for(const samplePhaseY of [0,.125]){
    let points:number[][]=[];
    const opts={scale:45,projected:true,facing,samplePhaseY},full=render(make(),opts).sp!;
    const sparse=Reflect.apply(render,null,[make(),{...opts,occupiedOnly:true,probePixels:(w:number,h:number)=>points=Array.from({length:12},(_,i)=>[Math.min(w-2,2+i*3),Math.floor(h*.3)])}]).sp;
    expect(occupiedHeight(sparse)).toBe(occupiedHeight(full));
    for(const [x,y]of points)expect(sparse.get(x,y)).toBe(full.get(x,y));
    expect(sparse.m.filter(Boolean).length).toBeLessThan(full.m.filter(Boolean).length);
  }
});
