import { expect, it } from "vitest";
import { floorDistance, floorRects, fromPlan, HOUSE_ROOMS, roomAccessFor } from "./houseRooms";

it("keeps host, solo, unassigned and other-player floors byte-identical", () => {
  const floor = floorRects({ x: 13, z: -7 }), before = JSON.stringify(floor);
  for (const player of [0, 1, 2, -1, NaN]) expect(roomAccessFor(floor, player)).toBe(floor);
  expect(roomAccessFor(floor, 0, { player: 0, room: "bedroom2" })).toBe(floor);
  expect(roomAccessFor(floor, 2, { player: 1, room: "bedroom2" })).toBe(floor);
  expect(roomAccessFor(floor, 1, { player: 1, room: "turret" })).toBe(floor);
  expect(JSON.stringify(floor)).toBe(before);
});

it("opens only the authoritative guest's assigned bedroom, even after the original floor was queried", () => {
  const floor = floorRects({ x: 0, z: 0 });
  const point = (id: string) => { const r = HOUSE_ROOMS.rooms.find(r => r.id === id)!; return fromPlan(floor.at, r.x, r.z, floor.turn); };
  const p2 = point("bedroom2"), p3 = point("bedroom3");
  expect(floorDistance(floor, p2.x, p2.z)).toBeGreaterThan(0);
  const before = JSON.stringify(floor);
  const guest = roomAccessFor(floor, 1, { player: 1, room: "bedroom2" });
  expect(floorDistance(guest, p2.x, p2.z)).toBeLessThan(0);
  expect(floorDistance(guest, p3.x, p3.z)).toBeGreaterThan(0);
  expect(floorDistance(floor, p2.x, p2.z)).toBeGreaterThan(0);
  expect(JSON.stringify(floor)).toBe(before);
  expect(HOUSE_ROOMS.rooms.filter(r => r.locked).map(r => r.id).sort()).toEqual(["bedroom2", "bedroom3"]);
});
