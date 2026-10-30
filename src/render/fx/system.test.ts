import { afterEach, describe, expect, it } from "vitest";
import * as THREE from "three";
import { MagicFx, FX_QUALITY } from "./system";
import { LIGHT_UNIFORMS } from "../lighting";
import { FX_UNIFORMS } from "./uniforms";
import { comfort } from "../comfort";
afterEach(()=>{FX_QUALITY.lightCap=6;FX_QUALITY.imprints=true;comfort.reduceFlashing=false;});
describe("production magic lifecycle",()=>{
  it("bounds lights, eases in, respects world reservation and fades completely",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={};
    fx.begin(0,0,0,owner);
    for(let frame=1;frame<=12;frame++){
      fx.begin(frame/60,0,0,owner);
      for(let i=0;i<20;i++)fx.draw("fire","projectile",i,1,0,2,1,1,0,i);
      LIGHT_UNIFORMS.uLightCount.value=20;fx.finish(20);
      expect(fx.stats.lights).toBe(6);expect(LIGHT_UNIFORMS.uLightCount.value).toBe(20);
      if(frame===1)expect(LIGHT_UNIFORMS.uLightCol.value[14].w).toBeLessThan(0.1);
    }
    fx.begin(0.5,0,0,owner);LIGHT_UNIFORMS.uLightCount.value=20;fx.finish(20);
    expect(fx.stats.lights).toBe(0);expect(fx.stats.requests).toBe(0);
  });
  it("drops imprints and reduces lights with quality, resets on a new island",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={};fx.begin(0,0,0,owner);fx.begin(1,0,0,owner);
    FX_QUALITY.lightCap=2;
    for(let i=0;i<10;i++)fx.draw("frost","burst",i,1,0,3,1,1,0,i);
    LIGHT_UNIFORMS.uLightCount.value=0;fx.finish(20);expect(fx.stats.lights).toBe(2);
    expect(FX_UNIFORMS.uFxOn.value).toBe(1);
    FX_QUALITY.imprints=false;fx.begin(1.1,0,0,owner);fx.finish(20);expect(FX_UNIFORMS.uFxOn.value).toBe(0);
    fx.begin(0,100,100,{});fx.finish(20);expect(fx.stats.requests).toBe(0);expect(fx.field.values.every(v=>v===0)).toBe(true);
  });
  it("never changes gameplay or leaves a persistent imprint after its lifetime",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={};fx.begin(0,0,0,owner);
    fx.draw("frost","burst",0.5,1,0.5,3);fx.finish(20);
    expect(fx.field.at(0.5,0.5,"frost")).toBeGreaterThan(0);
    fx.begin(6,0,0,owner);fx.finish(20);expect(fx.field.values.every(v=>v===0)).toBe(true);
    expect(owner).toEqual({});
  });
});
