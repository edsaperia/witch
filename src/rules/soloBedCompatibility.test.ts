import { expect, it } from "vitest";
import { newGame, type Controls } from "./game";
import { TUNING } from "./tuning";
import { HOUSE_ROOMS, objectFront } from "./houseRooms";
import { startWake } from "./wakeUp";
import { stepSigilButton } from "./sigilButton";

it("leaves the solo wake bytes and standing pose unchanged when the bed emits its normal end-night event", () => {
  // Calls-off compatibility uses one bed; distant areas cannot change its use dispatch.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const g = newGame(123, tuning), W = g.witches[0], bed = HOUSE_ROOMS.objects.find(o => o.id === "bed")!;
  startWake(g, 0, {yesterday:true,mirrored:true}); g.wake!.open = true; g.wake!.beat = "up"; g.wake!.pile = [];
  Object.assign(W.body, objectFront(bed, g.map.treehouse, .1), {perch:true,mode:"ground",seated:false});
  const wake = JSON.stringify(g.wake), body = structuredClone(W.body);
  const controls = {moveX:0,moveZ:0,zoom:0,toggleMode:false,sigilHeld:true} as Controls;
  stepSigilButton(g, controls, W, tuning, 1, .05, [], () => false, 0);
  stepSigilButton(g, controls, W, tuning, 1 + HOUSE_ROOMS.bed.hold + .01, .05, [], () => false, 0);
  expect(W.leash.events.some(e => e.kind === "house" && e.obj === "slept")).toBe(true);
  expect(JSON.stringify(g.wake)).toBe(wake); expect(W.body).toEqual(body);
});
