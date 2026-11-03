import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { deckOf, onFloor, onTerrace } from "../rules/treehouse";
import { fromPlan, HOUSE_ROOMS, onRoomFloor, roomAccessFor, floorRects } from "../rules/houseRooms";
import { newWitch } from "../rules/witch";
import { TUNING } from "../rules/tuning";
import { depthWhereDrawn, houseWitchOverlay, setHouseWitchPass, HOUSE_FLOOR_OVERLAY_ORDER, HOUSE_WITCH_OVERLAY_ORDER } from "./houseWitchPass";
import { ROOMS_ORDER } from "./houseRooms";
const deck = () => deckOf({treehouse:{x:200,z:300}},TUNING)!;
const standing = (x:number,z:number) => ({...newWitch(x,z),perch:true});
const legacy = (d:ReturnType<typeof deck>,w:ReturnType<typeof standing>) => !onTerrace(d,w.x,w.z)&&onRoomFloor(d.house!.rooms!,w.x,w.z);
describe("standing witch pass over house floors and joins",()=>{
  it("uses the approved ON defaults",()=>{
    const L=TUNING.treehouse.house!.look!;expect([L.indoor,L.noNotch,L.approach,L.noWalls]).toEqual([true,true,true,true]);
  });
  it("covers every authorized room, including the Terrace",()=>{
    for(const room of HOUSE_ROOMS.rooms){
      const d=deck();d.house={...d.house!,rooms:roomAccessFor(floorRects(d,TUNING.treehouse.house!.rail),1,{player:1,room:room.id})};
      const p=fromPlan(d,room.x,room.z),w=standing(p.x,p.z);
      expect(onFloor(d,p.x,p.z),room.id).toBe(true);
      expect(houseWitchOverlay(d,w,true,legacy(d,w)),room.id).toBe(true);
    }
  });
  it("covers each accessible connecting branch and its overlaps with rooms",()=>{
    const d=deck();let samples=0;
    for(const branch of HOUSE_ROOMS.corridors)for(const [x,z]of branch.pts!){
      const p=fromPlan(d,x,z);if(!onFloor(d,p.x,p.z))continue;samples++;
      const w=standing(p.x,p.z);expect(houseWitchOverlay(d,w,true,legacy(d,w)),branch.id+":"+x+","+z).toBe(true);
    }
    expect(samples).toBeGreaterThan(0);
  });
  it("does not lose the overlay when a perched foot lies outside the stricter walking inset",()=>{
    const d=deck();let samples=0;
    for(const r of HOUSE_ROOMS.rooms.filter(r=>!r.locked))for(let k=0;k<32;k++){
      const p=fromPlan(d,r.x+Math.cos(k*Math.PI/16)*(r.r-.01),r.z+Math.sin(k*Math.PI/16)*(r.r-.01));
      if(!onFloor(d,p.x,p.z)||onRoomFloor(d.house!.rooms!,p.x,p.z))continue;samples++;
      const w=standing(p.x,p.z);expect(houseWitchOverlay(d,w,true,legacy(d,w)),r.id).toBe(true);
    }
    expect(samples).toBeGreaterThan(0);
  });
  it("places the real witch material after floors/near rims with depth tests off, then restores flight",()=>{
    const d=deck(),p=fromPlan(d,0,0),w=standing(p.x,p.z),mesh=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.ShaderMaterial());
    setHouseWitchPass(mesh,houseWitchOverlay(d,w,true,legacy(d,w)));
    expect(mesh.material.transparent).toBe(true);expect(mesh.material.depthTest).toBe(false);
    expect(mesh.renderOrder).toBeGreaterThan(HOUSE_FLOOR_OVERLAY_ORDER);
    for(const order of Object.values(ROOMS_ORDER))expect(mesh.renderOrder).toBeGreaterThan(order);
    expect(mesh.renderOrder).toBe(HOUSE_WITCH_OVERLAY_ORDER);expect(mesh.material.depthWrite).toBe(true);
    const version=mesh.material.version;setHouseWitchPass(mesh,true);expect(mesh.material.version).toBe(version);
    setHouseWitchPass(mesh,false);expect([mesh.material.transparent,mesh.material.depthTest,mesh.renderOrder]).toEqual([false,true,10]);
    mesh.geometry.dispose();mesh.material.dispose();
  });
  it("handles the declared multi-material mesh type without changing depth writes",()=>{
    const materials=[new THREE.ShaderMaterial(),new THREE.MeshBasicMaterial({depthWrite:false})];
    const mesh=new THREE.Mesh(new THREE.BufferGeometry(),materials);setHouseWitchPass(mesh,true);
    for(const m of materials)expect([m.transparent,m.depthTest]).toEqual([true,false]);
    expect(materials.map(m=>m.depthWrite)).toEqual([true,false]);setHouseWitchPass(mesh,false);
    for(const m of materials){expect([m.transparent,m.depthTest]).toEqual([false,true]);m.dispose();}mesh.geometry.dispose();
  });
  it("preserves legacy room overlays and leaves flight/seating/falls outside the new rule",()=>{
    const d=deck(),w=standing(200,300);
    expect(houseWitchOverlay(d,w,true,true)).toBe(true);
    for(const body of [{...w,perch:false},{...w,seated:true},{...w,falling:0},{...w,mode:"rising" as const},{...w,mode:"treetop" as const}])expect(houseWitchOverlay(d,body,true,false)).toBe(false);
    expect(houseWitchOverlay(d,{...w,mode:"descending"},true,false)).toBe(true);
    expect(houseWitchOverlay(d,w,false,false)).toBe(false);expect(houseWitchOverlay(null,w,true,false)).toBe(false);
  });
  // Ed, 2026-11-03, "witch is behind the floor": by the wardrobe on the Terrace's north side she wasn't drawn at all. Off a room's
  // walking inset (the Terrace is never one) her occluder depth came from her flight's height, metres behind where she's drawn on
  // the house's plane, so her own sprite counted as in front of her and her batch, with no see-through pass, dropped it.
  it("takes her occluder depth where she's drawn wherever she's in the room pass, the Terrace's far side too",()=>{
    const d=deck(),T=HOUSE_ROOMS.rooms.find(r=>r.id==="terrace")!;let samples=0;
    for(let k=0;k<16;k++){
      const p=fromPlan(d,T.x+Math.cos(k*Math.PI/8)*(T.r-.3),T.z-Math.abs(Math.sin(k*Math.PI/8))*(T.r-.3));
      if(!onTerrace(d,p.x,p.z))continue;samples++;
      const w=standing(p.x,p.z),inRoom=legacy(d,w),over=houseWitchOverlay(d,w,true,inRoom);
      expect(inRoom,`${k}`).toBe(false);expect(over,`${k}`).toBe(true);
      expect(depthWhereDrawn(false,inRoom,over),`${k}`).toBe(true);
    }
    expect(samples).toBeGreaterThan(0);
  });
  it("keeps her flight's height for her depth out of the house",()=>{
    const d=deck(),w={...standing(200,300),perch:false,mode:"treetop" as const};
    expect(depthWhereDrawn(false,false,houseWitchOverlay(d,w,true,false))).toBe(false);
    expect(depthWhereDrawn(true,false,false)).toBe(true);expect(depthWhereDrawn(false,true,false)).toBe(true);
  });
});
