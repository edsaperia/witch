import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { deckOf, flyOnto, landsOn, landingSpot, onFloor, overDeck } from "./treehouse";
import { floorRects, fromPlan, HOUSE_ROOMS, roomAccessFor } from "./houseRooms";
import { newWitch, NO_INTENT, stepWitch } from "./witch";
import { NO_LOAD } from "./leashWeight";
const H = TUNING.treehouse.house!, bounds = { minX:-10000, maxX:10000, minZ:-10000, maxZ:10000 };
const deck = () => deckOf({ treehouse: { x:200,z:300 } }, TUNING)!;

describe("landing on the actual authorized treehouse floor (Ed, 2 November)", () => {
  for (const room of HOUSE_ROOMS.rooms) it(room.id + ": accepts the floor, descends in landTime and permits takeoff without snapping back", () => {
    const d = deck();
    // A guest's floor through the multiplayer hook: the same floor as everyone's since nothing's locked (Ed, 2026-11-03); no network fixture.
    d.house = { ...d.house!, rooms: roomAccessFor(floorRects(d,H.rail),1,{player:1,room:room.id}) };
    const p = fromPlan(d,room.x,room.z), clear = landingSpot(d,p.x,p.z);
    expect(onFloor(d,clear.x,clear.z),room.id).toBe(true);
    expect(flyOnto(d,clear.x,clear.z),room.id).toBe(true);
    expect(landsOn(d,clear.x,clear.z),room.id).toBe(true);
    const w = { ...newWitch(clear.x,clear.z),mode:"treetop" as const,lift:1 };
    const half = stepWitch(w,{ ...NO_INTENT,toggleMode:true },H.landTime/2,TUNING,bounds,NO_LOAD,d);
    expect([half.mode,half.perch]).toEqual(["descending",true]); expect(half.lift).toBeCloseTo(.5,10);
    const down = stepWitch(half,NO_INTENT,H.landTime/2,TUNING,bounds,NO_LOAD,d);
    expect([down.mode,down.perch,down.lift]).toEqual(["ground",true,0]);
    expect(onFloor(d,down.x,down.z)).toBe(true);
    const up = stepWitch(down,{ ...NO_INTENT,toggleMode:true },TUNING.riseTime,TUNING,bounds,NO_LOAD,d);
    expect([up.mode,!!up.perch]).toEqual(["treetop",false]);
    const held = stepWitch(up,NO_INTENT,.1,TUNING,bounds,NO_LOAD,d);
    expect([held.mode,!!held.perch]).toEqual(["treetop",false]);
  });
  it("lands her on Bedrooms 2 and 3 in solo, open as every room (Ed, 2026-11-03)", () => {
    const d = deck();
    for (const id of ["bedroom2", "bedroom3"]) {
      const room = HOUSE_ROOMS.rooms.find(r=>r.id===id)!, p=fromPlan(d,room.x,room.z);
      expect(landsOn(d,p.x,p.z),id).toBe(true); expect(flyOnto(d,p.x,p.z),id).toBe(true);
    }
  });
  it("does not land over air even inside the old grace distance", () => {
    const d=deck(), room=HOUSE_ROOMS.rooms.find(r=>r.id==="turret")!;
    let air: {x:number;z:number}|undefined;
    for(let r=room.r;r<room.r+10&&!air;r+=.1) for(let k=0;k<16&&!air;k++) {
      const p=fromPlan(d,room.x+Math.cos(k*Math.PI/8)*r,room.z+Math.sin(k*Math.PI/8)*r);
      if(!onFloor(d,p.x,p.z)&&overDeck(d,p.x,p.z))air=p;
    }
    expect(air).toBeDefined(); expect(landsOn(d,air!.x,air!.z)).toBe(false); expect(flyOnto(d,air!.x,air!.z)).toBe(false);
    const w={...newWitch(air!.x,air!.z),mode:"treetop" as const,lift:1};
    const down=stepWitch(w,{...NO_INTENT,toggleMode:true},.01,TUNING,bounds,NO_LOAD,d);
    expect(down.perch).toBeUndefined(); expect(down.mode).toBe("descending");
  });
});
