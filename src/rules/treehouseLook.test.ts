import { describe, expect, it } from "vitest";
import { advanceCrownFade, approachStrength, houseApproachDistance, showHouseLayer, crownLookInput } from "./treehouseLook";
import { TUNING } from "./tuning";
import { deckOf, keepInHouse, onFloor } from "./treehouse";
import { floorRects, fromPlan, HOUSE_ROOMS, roomAccessFor } from "./houseRooms";
import { newWitch, NO_INTENT, stepWitch } from "./witch";
import { sightClearance } from "./crown";
import { DECISION_LIST, applyKnobParams } from "../ui/decisions";
import { NO_LOAD } from "./leashWeight";
const H = TUNING.treehouse.house!, B = { minX: -10000, maxX: 10000, minZ: -10000, maxZ: 10000 };
it("keeps all four trials off in the published tuning", () => {
  expect([H.look!.indoor, H.look!.noNotch, H.look!.approach, H.look!.noWalls]).toEqual([false, false, false, false]);
});
it("finishes and reverses the authored fade without advancing on a negative step", () => {
  expect(advanceCrownFade(0, true, .375, .75)).toBe(.5);
  expect(advanceCrownFade(.5, true, .375, .75)).toBe(1);
  expect(advanceCrownFade(1, false, .375, .75)).toBe(.5);
  expect(advanceCrownFade(.5, false, 2, .75)).toBe(0);
  expect(advanceCrownFade(.5, true, -1, .75)).toBe(.5);
});
it("does no approach clearing off, on the ground or outside its radius", () => {
  expect(approachStrength(false, true, 0, 40)).toBe(0);
  expect(approachStrength(true, false, 0, 40)).toBe(0);
  expect(approachStrength(true, true, 40, 40)).toBe(0);
  expect(approachStrength(true, true, 0, 40)).toBe(1);
  expect(approachStrength(true, true, 20, 40)).toBe(.5);
});
it("measures proximity from floor outlines and branches, including translated turned houses", () => {
  const rooms = [{ outline: [[-1,-1],[1,-1],[1,1],[-1,1]] }], branches = [{ pts: [[1,0],[10,0]], w: 2 }];
  expect(houseApproachDistance(5, 0, 0, 0, 0, rooms, branches)).toBe(-1);
  expect(houseApproachDistance(10, 15, 10, 20, 90, rooms, branches)).toBeCloseTo(-1, 12);
  expect(houseApproachDistance(5, 4, 0, 0, 0, rooms, branches)).toBe(3);
});
it("removes upright walls only, retaining floors, furniture and low bark edges", () => {
  expect([0,1,2,3].map(l => showHouseLayer(l, false))).toEqual([true,true,true,true]);
  expect([0,1,2,3].map(l => showHouseLayer(l, true))).toEqual([true,false,true,true]);
});
describe("open platform edge rules (Ed, 2 Nov)", () => {
  // Include the two guest room shapes without changing their production access rules or any multiplayer code.
  // Use the existing authorized floor helper so cached shape locks cannot leak into a guest fixture.
  for (const room of HOUSE_ROOMS.rooms) it(room.id + " leaves at its own safe edge and returns there after the existing fall", () => {
    const d = deckOf({ treehouse: { x: 200, z: 300 } }, TUNING)!;
    d.house = { ...d.house!, noWalls: true, rooms: roomAccessFor(floorRects(d, H.rail), 1, { player: 1, room: room.id }), fall: { ...H.fall, on: true } };
    // A controlled outward segment from this room, no generated world or encounter outcome.
    let edge: ReturnType<typeof keepInHouse> | null = null, outside = { x: 0, z: 0 };
    for (let radius = room.r; radius < room.r + 12 && !edge; radius += .5) for (let k = 0; k < 16 && !edge; k++) {
      const a = k * Math.PI / 8, p = fromPlan(d, room.x + Math.cos(a) * radius, room.z + Math.sin(a) * radius);
      const q = keepInHouse(d, p.x, p.z); if (q.off) { edge = q; outside = p; }
    }
    expect(edge, room.id).not.toBeNull(); const q = edge!;
    expect(onFloor(d, q.x, q.z)).toBe(true);
    const dx = outside.x - q.x, dz = outside.z - q.z, length = Math.hypot(dx, dz), mx = dx / length, mz = dz / length;
    const start = { ...newWitch(q.x, q.z), perch: true, vx: mx * H.walk, vz: mz * H.walk };
    const move = { ...NO_INTENT, moveX: mx, moveZ: mz };
    const falling = stepWitch(start, move, .3, TUNING, B, NO_LOAD, d);
    expect(falling.falling).toBe(0); expect(falling.fallOrigin).toBeDefined();
    const origin = falling.fallOrigin!; expect(onFloor(d, origin.x, origin.z)).toBe(true);
    const broomDeck = { ...d, house: { ...d.house!, fall: { ...d.house!.fall, on: false } } };
    const flying = stepWitch(start, move, .3, TUNING, B, NO_LOAD, broomDeck);
    expect(flying.mode).toBe("rising"); expect(flying.falling).toBeUndefined();
    const down = stepWitch(falling, NO_INTENT, H.fall.time, TUNING, B, NO_LOAD, d);
    expect(down.falling).toBe(H.fall.time);
    const back = stepWitch(down, NO_INTENT, (H.fall.beat ?? 0) + .01, TUNING, B, NO_LOAD, d);
    expect([back.x, back.z]).toEqual([origin.x,origin.z]); expect(back.falling).toBeUndefined(); expect(back.fallOrigin).toBeUndefined();
    // Default remains the old wall constraint at this same non-Terrace edge.
    if (room.id !== "terrace") { const closed = { ...d, house: { ...d.house!, noWalls: false } }; expect(keepInHouse(closed, outside.x, outside.z).off).toBe(false); }
  });
});

it("preserves the original crown input off and removes only the near-view sight cut on", () => {
  const input = { seed: 1, gap: false, open: [{ x: 40, z: 40, r: 15 }] }, saved = structuredClone(input);
  expect(crownLookInput(input, false)).toBe(input);
  expect(crownLookInput(input, true)).toEqual({ seed: 1, gap: false, open: [] });
  expect(input).toEqual(saved); // The horizon receives this untouched source, not the near-view trial.
});

it("traces the dancefloor open-sky channel even when the Terrace crown is whole", () => {
  const original = { terrace: [{ x: 0, z: 0, r: 10 }], takeoff: [1, 1] as [number, number], notchFrom: [0, 0] as [number, number], gap: false, open: [{ x: 40, z: 40, r: 15 }] };
  expect(sightClearance(original, 40, 20, 40)).toBeLessThan(0);
  expect(sightClearance(crownLookInput(original, true), 40, 20, 40)).toBe(Infinity);
});

it("registers four independent off-by-default pause switches and applies each through the real link controls", () => {
  const controls = DECISION_LIST.filter(d => d.group === "Treehouse look" && d.control.type === "toggle");
  expect(controls.map(d => d.id)).toEqual(["lookIndoor", "lookNoNotch", "lookApproach", "lookNoWalls"]);
  for (const control of controls) {
    expect(control.default).toBe(false); const t = structuredClone(TUNING);
    applyKnobParams(t, new URLSearchParams("d_" + control.id + "=1"));
    const values = t.treehouse.house!.look!;
    expect([values.indoor,values.noNotch,values.approach,values.noWalls].filter(Boolean)).toHaveLength(1);
  }
});
