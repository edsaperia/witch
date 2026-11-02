import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { deckOf, onFloor, onTerrace } from "../rules/treehouse";
import { fromPlan, HOUSE_ROOMS, onRoomFloor, roomAccessFor, floorRects } from "../rules/houseRooms";
import { newWitch } from "../rules/witch";
import { TUNING } from "../rules/tuning";
import { houseWitchOverlay, setHouseWitchPass, HOUSE_FLOOR_OVERLAY_ORDER, HOUSE_WITCH_OVERLAY_ORDER } from "./houseWitchPass";
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
});
