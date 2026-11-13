import { afterEach, describe, expect, it } from "vitest";
import * as THREE from "three";
import { MagicFx, FX_QUALITY } from "./system";
import { LIGHT_UNIFORMS } from "../lighting";
import { FX_UNIFORMS } from "./uniforms";
import { comfort } from "../comfort";
afterEach(()=>{FX_QUALITY.lightCap=6;FX_QUALITY.imprints=true;comfort.reduceFlashing=false;});
describe("production magic lifecycle",()=>{
  it("caps signature screen response and disables it with reduce flashing",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={};fx.begin(0,0,0,owner);
    fx.emit("party","pillar",0,4,0,3,1.5);expect(fx.screenKick).toBeLessThanOrEqual(0.18);
    expect(fx.screenKick).toBeGreaterThan(0);comfort.reduceFlashing=true;expect(fx.screenKick).toBe(0);
    comfort.reduceFlashing=false;fx.begin(1,0,0,owner);expect(fx.screenKick).toBe(0);
  });
  it("bounds lights, eases in, makes the world's lights' room eased (no pop) and fades completely",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={};
    fx.begin(0,0,0,owner);
    let last=0;
    for(let frame=1;frame<=40;frame++){
      fx.begin(frame/60,0,0,owner);
      for(let i=0;i<20;i++)fx.draw("fire","projectile",i,1,0,2,1,1,0,i);
      // (the world's own lights fill the budget, each at strength 1)
      for(let i=0;i<20;i++)LIGHT_UNIFORMS.uLightCol.value[i].w=1;
      LIGHT_UNIFORMS.uLightCount.value=20;fx.finish(20);
      expect(fx.stats.lights).toBeLessThanOrEqual(6);expect(LIGHT_UNIFORMS.uLightCount.value).toBeLessThanOrEqual(20);
      // the effects' lights come in a slot at a time as the world's farthest fade out, never more than a slot a few frames
      expect(fx.stats.lights-last).toBeLessThanOrEqual(2);last=fx.stats.lights;
      if(frame===1){expect(fx.stats.lights).toBe(0);expect(LIGHT_UNIFORMS.uLightCol.value[19].w).toBeLessThan(1);expect(LIGHT_UNIFORMS.uLightCol.value[19].w).toBeGreaterThan(0.2);}
    }
    expect(fx.stats.lights).toBe(6);expect(LIGHT_UNIFORMS.uLightCount.value).toBe(20);
    fx.begin(2,0,0,owner);LIGHT_UNIFORMS.uLightCount.value=20;fx.finish(20);
    expect(fx.stats.lights).toBe(0);expect(fx.stats.requests).toBe(0);
  });
  it("uses free slots at once, each light easing in from dark",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={};fx.begin(0,0,0,owner);
    const seen:number[]=[];
    for(let frame=1;frame<=15;frame++){fx.begin(frame/60,0,0,owner);fx.draw("fire","projectile",1,1,0,2,1,1,0,1);LIGHT_UNIFORMS.uLightCount.value=2;fx.finish(20);seen.push(LIGHT_UNIFORMS.uLightCol.value[2].w);}
    expect(seen[0]).toBeLessThan(0.05);for(let i=1;i<seen.length;i++)expect(seen[i]).toBeGreaterThanOrEqual(seen[i-1]);
    expect(seen.at(-1)).toBeGreaterThan(0.3);
  });
  it("lights at most attackFx.glow.lights creatures' spells, scaled by its light",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={},look={core:1,halo:1,pool:1,lights:3,light:1};
    for(let frame=0;frame<=30;frame++){fx.begin(frame/60,0,0,owner);for(let i=0;i<10;i++)fx.draw("fire","projectile",i,1,0,2,1,1,0,i,null,undefined,1,look);LIGHT_UNIFORMS.uLightCount.value=0;fx.finish(20);}
    expect(fx.stats.lights).toBe(3);
    const bright=LIGHT_UNIFORMS.uLightCol.value[0].w;
    const dim=new MagicFx(new THREE.Scene()),o2={};
    for(let frame=0;frame<=30;frame++){dim.begin(frame/60,0,0,o2);dim.draw("fire","projectile",0,1,0,2,1,1,0,0,null,undefined,1,{...look,light:0.5});LIGHT_UNIFORMS.uLightCount.value=0;dim.finish(20);}
    expect(LIGHT_UNIFORMS.uLightCol.value[0].w).toBeCloseTo(bright*0.5,2);
    const none=new MagicFx(new THREE.Scene()),o3={};
    for(let frame=0;frame<=30;frame++){none.begin(frame/60,0,0,o3);none.draw("fire","projectile",0,1,0,2,1,1,0,0,null,undefined,1,{...look,lights:0});LIGHT_UNIFORMS.uLightCount.value=0;none.finish(20);}
    expect(none.stats.lights).toBe(0);
  });
  it("draws the glow's core, halo and pool only when asked",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={};fx.begin(0,0,0,owner);
    const count=(i:number)=>(fx.batches.layers[i].mesh.geometry as THREE.InstancedBufferGeometry).instanceCount;
    fx.draw("fire","projectile",0,1,0,2);fx.finish(20);expect(count(9)).toBe(0);expect(count(10)).toBe(0);expect(fx.batches.layers[9].mesh.visible).toBe(false);
    fx.begin(0.1,0,0,owner);fx.draw("fire","projectile",0,1,0,2,1,1,0,0,null,undefined,1,{core:1,halo:1,pool:1,lights:5,light:1});fx.finish(20);
    expect(count(9)).toBe(1);expect(count(10)).toBe(1);expect(fx.batches.layers[9].mesh.visible).toBe(true);
    fx.begin(0.2,0,0,owner);fx.draw("fire","projectile",0,1,0,2,1,1,0,0,null,undefined,1,{core:1,halo:1,pool:0,lights:5,light:1});fx.finish(20);
    expect(count(9)).toBe(1);expect(count(10)).toBe(0);
  });
  // Her own magic's glow (Ed, 2026-11-13, asked whether to extend the creatures' glow to her magic: "extend").
  it("glows her own magic only while her glow's on, in the same layers at her own strengths",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={},HERS={core:0.8,halo:0.6,pool:0.4,light:1};
    const count=(i:number)=>(fx.batches.layers[i].mesh.geometry as THREE.InstancedBufferGeometry).instanceCount;
    // without hers(): her blink's effects and the ley line's spark as before
    fx.begin(0,0,0,owner);fx.emit("moonlight","burst",1,0.8,0,1,0.7,0.6,1,true);fx.streak("moonlight",0,0,6,0,0.9,0.22,0.45);fx.native("ley",2,0.4,0,1,7,[1,0.5,0.2]);
    fx.begin(0.1,0,0,owner);fx.native("ley",2,0.4,0,1,7,[1,0.5,0.2]);fx.finish(20);
    expect(count(9)).toBe(0);expect(count(10)).toBe(0);expect(fx.her).toBeNull();
    // with it: the burst's core and pool, the streak's line and pool, the spark's core and pool
    fx.begin(0.2,0,0,owner);fx.hers(HERS);fx.native("ley",2,0.4,0,1,7,[1,0.5,0.2]);fx.finish(20);
    expect(count(9)).toBe(3);expect(count(10)).toBe(3);
    expect(fx.batches.magicGlow.value.toArray().slice(0,3)).toEqual([0.8,0.6,0.4]);
    expect(fx.batches.spellGlow.value.x).toBe(0); // (the creatures' strengths untouched)
    // a native with no core of its own (her flight trail: a core would cover her) draws its pool alone
    fx.begin(2,0,0,owner);fx.hers(HERS);fx.native("flightTrail",0,1,0,1,8,[0.8,0.7,1]);fx.finish(20);
    expect(count(9)).toBe(0);expect(count(10)).toBe(1);
    // Reduce flashing halves it; ?magicglow=0 (the switch) draws none
    comfort.reduceFlashing=true;fx.begin(2.1,0,0,owner);fx.hers(HERS);expect(fx.her).toMatchObject({core:0.4,halo:0.3,pool:0.2,light:0.5});
    comfort.reduceFlashing=false;fx.magicGlow=false;fx.begin(2.2,0,0,owner);fx.hers(HERS);fx.native("ley",2,0.4,0,1,7);fx.finish(20);fx.magicGlow=true;
    expect(fx.her).toBeNull();expect(count(9)).toBe(0);expect(count(10)).toBe(0);
  });
  it("gives her cast magic's light a slot before the other effects', each still easing in",()=>{
    const fx=new MagicFx(new THREE.Scene()),owner={},seen:number[]=[];
    for(let frame=0;frame<=30;frame++){
      fx.begin(frame/60,0,0,owner);fx.hers({core:1,halo:1,pool:1,light:1});
      for(let i=0;i<10;i++)fx.draw("fire","projectile",i,1,0,3,1,1,0,i);
      fx.native("ley",30,0.4,0,1,7,[0.2,1,0.3]); // (far off and faint beside ten fire bolts)
      LIGHT_UNIFORMS.uLightCount.value=0;fx.finish(20);seen.push(LIGHT_UNIFORMS.uLightCol.value[0].w);
    }
    expect(fx.stats.lights).toBe(6);
    const first=LIGHT_UNIFORMS.uLightCol.value[0],pos=LIGHT_UNIFORMS.uLightPos.value[0];
    expect(pos.x).toBe(30);expect(first.y).toBeCloseTo(1);expect(first.x).toBeCloseTo(0.2); // (hers, in its own colour, in the first slot)
    for(let i=1;i<seen.length;i++)expect(seen[i]).toBeGreaterThanOrEqual(seen[i-1]-1e-6); // (eased in: no pop)
    expect(seen[1]).toBeLessThan(seen.at(-1)!*0.5);
    // her glow off: the spark's light competes by strength as before, and ten bolts beat it
    const old=new MagicFx(new THREE.Scene()),o2={};
    for(let frame=0;frame<=30;frame++){old.begin(frame/60,0,0,o2);for(let i=0;i<10;i++)old.draw("fire","projectile",i,1,0,3,1,1,0,i);old.native("ley",30,0.4,0,1,7,[0.2,1,0.3]);LIGHT_UNIFORMS.uLightCount.value=0;old.finish(20);}
    for(let i=0;i<old.stats.lights;i++)expect(LIGHT_UNIFORMS.uLightPos.value[i].x).not.toBe(30);
  });
  it("draws her decks' ring's glow in two more layers of the same batches, begun and ended with them",()=>{
    const scene=new THREE.Scene(),fx=new MagicFx(scene),owner={},extra=fx.batches.extraGlow(scene,19.947,"Decks ring");
    const n=(b:{mesh:THREE.Mesh})=>(b.mesh.geometry as THREE.InstancedBufferGeometry).instanceCount;
    fx.begin(0,0,0,owner);expect(fx.herData("party",true)).toBeNull();fx.finish(20);expect(extra.core.mesh.visible).toBe(false);
    fx.begin(0.1,0,0,owner);fx.hers({core:1,halo:1,pool:1,light:1});
    const data=fx.herData("party",true)!;expect(data[1]).toBeGreaterThanOrEqual(100);expect(data[2]).toBeGreaterThan(5); // (tinted, and hers)
    extra.core.add(0,0.1,0,0.8,data,1,0,0,1);extra.pool.add(0,0,0,1.5,data,1,0,0,0.7);fx.finish(20);
    expect(n(extra.core)).toBe(1);expect(n(extra.pool)).toBe(1);expect(extra.core.mesh.visible).toBe(true);
    expect(extra.core.mesh.renderOrder).toBeGreaterThan(extra.pool.mesh.renderOrder);
    fx.begin(0.2,0,0,owner);fx.finish(20);expect(n(extra.core)).toBe(0);expect(extra.core.mesh.visible).toBe(false);
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
