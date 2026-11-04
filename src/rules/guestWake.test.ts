import { expect, it } from "vitest";
import { newGame as fullGame, type Controls } from "./game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "./tuning";
import { HOUSE_ROOMS, objectFront, objectWorld } from "./houseRooms";
import { bedFor, homeBed, keepInBedroom, startWake, startWakeFor, stepWake, wakeOf, WAKE_DEFAULT } from "./wakeUp";

const newGame = smallWorld(fullGame, "Guest wake routing needs only one house and two players.");
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

// Ed, 2026-11-03 (the house one room): a bed is found by its own id, not by which room's floor it stands on; no doors.
it("looks up stable guest beds by their ids, whatever room they stand in", () => {
  expect(bedFor("bedroom2")?.id).toBe("bedroom2Bed");
  expect(bedFor("bedroom3")?.id).toBe("bedroom3Bed");
  expect(bedFor("missing")).toBeUndefined();
  const bed = bedFor("bedroom2")!, room = bed.room;
  try { bed.room = "kitchen"; expect(bedFor("bedroom2")).toBe(bed); } finally { bed.room = room; }
  expect(HOUSE_ROOMS.objects.filter(o => o.id.endsWith("Door"))).toEqual([]);
});

it("routes guest alarm, hold and stretch to her own bed without changing host or equipment", () => {
  const g = newGame(123, TUNING, 2), host = g.witches[0], guest = g.witches[1];
  startWake(g, 0, { yesterday: true });
  const hostBefore = structuredClone({ body: host.body, wake: g.wake, hat: host.hat, spells: host.spells });
  const equipment = structuredClone({ hat: guest.hat, spells: guest.spells });
  const bed = bedFor("bedroom2")!, at = objectWorld(bed, g.map.treehouse, bed.w * .15, 0);
  expect(startWakeFor(g, 7, { yesterday: true }, guest, { player: 1, room: "bedroom2" })).toBe(true);
  expect(guest.body).toMatchObject({ ...at, mode: "ground", perch: true, seated: false });
  expect(wakeOf(g, guest)).toMatchObject({ player: 1, room: "bedroom2", beat: "alarm", at: 7 });
  expect({ hat: guest.hat, spells: guest.spells }).toEqual(equipment);
  const side = objectFront(bed, g.map.treehouse, 1.4);
  guest.body.x += 100; keepInBedroom(g, guest);
  expect(guest.body).toMatchObject(side);
  stepWake(g, { ...idle, moveX: 1 }, 8, WAKE_DEFAULT, guest);
  stepWake(g, idle, 8 + WAKE_DEFAULT.stretch, WAKE_DEFAULT, guest);
  expect(guest.body).toMatchObject(side);
  expect(guest.wake).toMatchObject({ open: true, beat: "up" });
  expect({ body: host.body, wake: g.wake, hat: host.hat, spells: host.spells }).toEqual(hostBefore);
});

it("wakes the host in her own bed, the object `bed`, with the other beds open in solo", () => {
  const g = newGame(123, TUNING), bed = homeBed()!;
  expect(bed.id).toBe("bed");
  expect(startWake(g, 4, { dreaming: true, mirrored: true })).toBe(true);
  expect(g.witches[0].body).toMatchObject(objectWorld(bed, g.map.treehouse, bed.w * .15, 0));
  expect(g.wake).toMatchObject({ beat: "dream", at: 4 }); expect(g.wake!.room).toBeUndefined();
});

it("rejects unknown rooms and mismatched player targets without changing state", () => {
  const g = newGame(123, TUNING, 2), guest = g.witches[1], before = structuredClone({ body: guest.body, hat: guest.hat });
  expect(startWakeFor(g, 0, {}, guest, { player: 0, room: "bedroom2" })).toBe(false);
  expect(startWakeFor(g, 0, {}, guest, { player: 1, room: "missing" })).toBe(false);
  expect(guest.wake).toBeUndefined(); expect(g.wake).toBeUndefined();
  expect({ body: guest.body, hat: guest.hat }).toEqual(before);
});
