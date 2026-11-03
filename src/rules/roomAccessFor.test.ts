import { expect, it } from "vitest";
import { floorDistance, floorRects, fromPlan, HOUSE_ROOMS, roomAccessFor } from "./houseRooms";

// Ed, 2026-11-03: "can we join it all into one room? ... it's ok if they're open before being occupied": nothing is locked, so a
// guest's assignment opens nothing; every witch, host, guest or solo, walks the same floor object.
it("gives every witch, assigned or not, the same floor", () => {
  const floor = floorRects({ x: 13, z: -7 }), before = JSON.stringify(floor);
  for (const player of [0, 1, 2, -1, NaN]) expect(roomAccessFor(floor, player)).toBe(floor);
  for (const room of ["bedroom2", "bedroom3", "turret"]) expect(roomAccessFor(floor, 1, { player: 1, room })).toBe(floor);
  expect(roomAccessFor(floor, 2, { player: 1, room: "bedroom2" })).toBe(floor);
  expect(JSON.stringify(floor)).toBe(before);
});

it("walks Bedrooms 2 and 3 in solo, their middles and their branches' middle lines on the floor", () => {
  const floor = floorRects({ x: 0, z: 0 });
  expect(HOUSE_ROOMS.rooms.filter(r => "locked" in r)).toEqual([]);
  for (const id of ["bedroom2", "bedroom3"]) {
    const r = HOUSE_ROOMS.rooms.find(r => r.id === id)!, p = fromPlan(floor.at, r.x, r.z, floor.turn);
    expect(floorDistance(floor, p.x, p.z), id).toBeLessThan(-1);
    const branch = HOUSE_ROOMS.corridors.find(c => c.id === `${r.from}-${id}`)!;
    for (const [x, z] of branch.pts!) { const q = fromPlan(floor.at, x, z, floor.turn); expect(floorDistance(floor, q.x, q.z), `${branch.id} at ${x}, ${z}`).toBeLessThan(0); }
  }
  expect(HOUSE_ROOMS.objects.filter(o => o.id.endsWith("Door"))).toEqual([]);
});
