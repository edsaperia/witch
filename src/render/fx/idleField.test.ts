import { expect, it } from "vitest";
import * as THREE from "three";
import { ImprintField, IMPRINTS, settings, type Imprint } from "./model";
import { MagicFx } from "./system";
import { FX_UNIFORMS } from "./uniforms";

/** Pre-optimization equations, retained as the output oracle rather than timing assertions. */
class OriginalField {
  readonly data: Uint8Array; readonly values: Float32Array; readonly cell: number;
  x=0; z=0; private ready=false; scans=0;
  constructor(readonly size=16,readonly metres=16){this.data=new Uint8Array(size*size*8);this.values=new Float32Array(this.data.length);this.cell=metres/size;}
  private index(x:number,z:number){return (((z%this.size+this.size)%this.size)*this.size+(x%this.size+this.size)%this.size)*8;}
  move(x:number,z:number){const nx=Math.floor(x/this.cell)-this.size/2,nz=Math.floor(z/this.cell)-this.size/2;
    if(this.ready&&nx===this.x&&nz===this.z)return;
    for(let iz=nz;iz<nz+this.size;iz++)for(let ix=nx;ix<nx+this.size;ix++)if(!this.ready||ix<this.x||ix>=this.x+this.size||iz<this.z||iz>=this.z+this.size){const i=this.index(ix,iz);this.values.fill(0,i,i+8);this.data.fill(0,i,i+8);}
    this.x=nx;this.z=nz;this.ready=true;
  }
  decay(dt:number){const amount=Math.max(0,dt)*255/settings.imprintSeconds;if(!amount)return;this.scans+=this.values.length;for(let i=0;i<this.values.length;i++)this.values[i]=Math.max(0,this.values[i]-amount);}
  stamp(x:number,z:number,radius:number,kind:Imprint,strength:number){const channel=IMPRINTS.indexOf(kind);if(channel<0||!(radius>0)||!this.ready)return;
    const loX=Math.max(this.x,Math.floor((x-radius)/this.cell)),hiX=Math.min(this.x+this.size-1,Math.floor((x+radius)/this.cell)),loZ=Math.max(this.z,Math.floor((z-radius)/this.cell)),hiZ=Math.min(this.z+this.size-1,Math.floor((z+radius)/this.cell));
    for(let iz=loZ;iz<=hiZ;iz++)for(let ix=loX;ix<=hiX;ix++){const d=Math.hypot((ix+.5)*this.cell-x,(iz+.5)*this.cell-z),a=Math.max(0,1-d/radius)*Math.min(1,Math.max(0,strength))*255,i=this.index(ix,iz)+channel;this.values[i]=Math.max(this.values[i],a);}
  }
  publish(){this.scans+=this.data.length;for(let i=0;i<this.data.length;i++)this.data[i]=Math.round(this.values[i]);}
  reset(){this.values.fill(0);this.data.fill(0);this.ready=false;}
}

it("matches the original bytes and Float32 values through idle, writes, scroll, reset and extinction",()=>{
  const current=new ImprintField(16,16),original=new OriginalField();
  const both=(fn:(f:ImprintField|OriginalField)=>void)=>{fn(current);fn(original);expect(current.values).toEqual(original.values);expect(current.data).toEqual(original.data);expect([current.x,current.z]).toEqual([original.x,original.z]);};
  both(f=>f.move(0,0));both(f=>f.publish());
  for(let frame=0;frame<80;frame++){
    if(frame%11===0)both(f=>f.stamp((frame%9)-4+.5,(frame%7)-3+.5,2.4,IMPRINTS[frame%IMPRINTS.length],.013*(frame+1)));
    if(frame%13===0)both(f=>f.move(frame/4,-frame/5));
    if(frame===43)both(f=>f.reset());
    both(f=>f.decay(frame%3===0?0:.037));both(f=>f.publish());
  }
  both(f=>f.decay(20));both(f=>f.move(500,500));both(f=>f.publish());
  both(f=>f.stamp(500.5,500.5,1,"frost",1));both(f=>f.publish());both(f=>f.reset());both(f=>f.publish());
});

it("does zero steady idle scans, wakes on the first write, and returns to idle after clearing",()=>{
  const f=new ImprintField(16,16);f.move(0,0);f.publish();
  const idle={...f.work};for(let i=0;i<30;i++){f.move(i,0);f.decay(.1);expect(f.publish()).toBe(false);}
  expect(f.work).toEqual(idle);
  f.stamp(29.5,.5,2,"frost",1);expect(f.publish()).toBe(true);expect(f.active).toBe(true);
  f.decay(20);expect(f.publish()).toBe(true);expect(f.active).toBe(false);expect(f.data.every(x=>x===0)).toBe(true);
  const cleared={...f.work};for(let i=0;i<30;i++){f.decay(.1);expect(f.publish()).toBe(false);}expect(f.work).toEqual(cleared);
});

it("skips actual MagicFx texture copy/upload while idle, but publishes first ink and its final clear",()=>{
  const fx=new MagicFx(new THREE.Scene()),owner={};fx.begin(0,0,0,owner);fx.finish(20);
  const work={...fx.field.work},copies=fx.stats.fieldCopyValues,versions=[FX_UNIFORMS.uFxField.value.version,FX_UNIFORMS.uFxExtra.value.version];
  for(let i=1;i<=30;i++){fx.begin(i/60,i,0,owner);fx.finish(20);}
  expect(fx.field.work).toEqual(work);expect(fx.stats.fieldCopyValues).toBe(copies);
  expect([FX_UNIFORMS.uFxField.value.version,FX_UNIFORMS.uFxExtra.value.version]).toEqual(versions);expect(FX_UNIFORMS.uFxOn.value).toBe(0);
  fx.field.stamp(30.5,.5,2,"frost",1);fx.finish(20);expect(FX_UNIFORMS.uFxOn.value).toBe(1);expect(fx.stats.fieldCopyValues).toBeGreaterThan(copies);
  fx.begin(20,30,0,owner);fx.finish(20);expect(FX_UNIFORMS.uFxOn.value).toBe(0);
  expect((FX_UNIFORMS.uFxField.value.image.data as Uint8Array).every(x=>x===0)).toBe(true);
  const clean=fx.stats.fieldCopyValues;fx.begin(21,31,0,owner);fx.finish(20);expect(fx.stats.fieldCopyValues).toBe(clean);
});

it("records local idle CPU work without a browser or a timing gate",()=>{
  const f=new ImprintField(),old=new OriginalField(settings.fieldSize,settings.fieldMetres);f.move(0,0);f.publish();old.move(0,0);old.publish();old.scans=0;
  const initial={...f.work},frames=120,t0=performance.now();for(let i=0;i<frames;i++){old.decay(1/60);old.publish();}const originalMs=performance.now()-t0;
  const t1=performance.now();for(let i=0;i<frames;i++){f.decay(1/60);f.publish();}const optimizedMs=performance.now()-t1;
  expect(f.work).toEqual(initial);expect(old.scans).toBe(frames*f.data.length*2);
  console.log(JSON.stringify({idleFieldCPU:{frames,valuesPerField:f.data.length,originalVisits:old.scans,optimizedVisits:0,originalMs,optimizedMs},scope:"CPU field decay/publication only; not browser FPS or GPU time"}));
});

it("restores the right published bytes when scenes share the field uniforms",()=>{
  const first=new MagicFx(new THREE.Scene()),second=new MagicFx(new THREE.Scene());
  first.begin(0,0,0,{});first.field.stamp(.5,.5,2,"frost",1);first.finish(20);
  const original=new Uint8Array(FX_UNIFORMS.uFxField.value.image.data as Uint8Array);
  second.begin(0,0,0,{});second.field.stamp(.5,.5,2,"wet",1);second.finish(20);
  expect((FX_UNIFORMS.uFxField.value.image.data as Uint8Array)[2]).toBeGreaterThan(0);
  first.finish(20);expect(FX_UNIFORMS.uFxField.value.image.data).toEqual(original);
});
