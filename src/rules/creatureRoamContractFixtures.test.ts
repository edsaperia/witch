// Supplied C1 area boundary: reject an outward step and exercise an inward step at the configured speed.
import {expect,it} from "vitest";
import {stepCreature,type Creature} from "./creatures";
import type {ForestMap} from "./map";
import {TUNING} from "./tuning";

it("rejects a roaming step across a supplied boundary and moves inward within the same speed bound",()=>{
  const cell=(x:number)=>({cell:x>=0&&x<=1?[0,0]:[1,0],safe:0});
  const map={tuning:TUNING,cellSafe:cell,areaAt:cell} as unknown as ForestMap;
  const c={id:0,species:"fox",level:1,cell:[0,0],x:0.99,z:0,tx:2,tz:0,speed:1,rest:0,walk:0,facing:1,rand:()=>0.5} as Creature;
  stepCreature(c,0.1,map);
  expect([c.x,c.z]).toEqual([0.99,0]);expect(c.moving).toBe(false);expect(c.tx).toBe(c.x);
  c.tx=0.5;const x=c.x;
  stepCreature(c,0.1,map);
  expect(x-c.x).toBeCloseTo(c.speed*0.1,9);expect(c.moving).toBe(true);
  expect(map.cellSafe(c.x,c.z).cell).toEqual(c.cell);expect([c.id,c.level]).toEqual([0,1]);
});
