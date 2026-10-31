import { expect, it } from "vitest";
import { newGame as fullGame, type Controls } from "./game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "./tuning";
import { HOUSE_ROOMS, objectFront, objectWorld } from "./houseRooms";
import { bedFor, bedRoom, doorFor, keepInBedroom, startWake, startWakeFor, stepWake, wakeOf, WAKE_DEFAULT } from "./wakeUp";

const newGame = smallWorld(fullGame, "Guest wake routing needs only one house and two players.");
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

it("looks up stable guest-room beds and doors without changing room access", () => {
  expect(bedFor("bedroom2")?.id).toBe("bedroom2Bed");
  expect(doorFor("bedroom2")?.id).toBe("bedroom2Door");
  expect(bedFor("bedroom3")?.id).toBe("bedroom3Bed");
  expect(doorFor("bedroom3")?.id).toBe("bedroom3Door");
  expect(bedFor("missing")).toBeUndefined(); expect(doorFor("missing")).toBeUndefined();
  expect(HOUSE_ROOMS.rooms.find(r => r.id === "bedroom2")?.locked).toBe(true);
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

it("keeps explicit host-room routing equivalent to the unchanged host default", () => {
  const a = newGame(123, TUNING), b = newGame(123, TUNING);
  expect(startWake(a, 4, { dreaming: true, mirrored: true })).toBe(true);
  expect(startWakeFor(b, 4, { dreaming: true, mirrored: true }, b.witches[0], { player: 0, room: bedRoom() })).toBe(true);
  const { player, room, ...wake } = b.wake!;
  expect(player).toBe(0); expect(room).toBe(bedRoom()); expect(wake).toEqual(a.wake);
  expect(b.witches[0].body).toEqual(a.witches[0].body);
  expect(b.witches[0].hat).toEqual(a.witches[0].hat);
  expect(b.witches[0].spells).toEqual(a.witches[0].spells);
  expect(b.camera).toEqual(a.camera);
});

it("rejects unknown rooms and mismatched player targets without changing state", () => {
  const g = newGame(123, TUNING, 2), guest = g.witches[1], before = structuredClone({ body: guest.body, hat: guest.hat });
  expect(startWakeFor(g, 0, {}, guest, { player: 0, room: "bedroom2" })).toBe(false);
  expect(startWakeFor(g, 0, {}, guest, { player: 1, room: "missing" })).toBe(false);
  expect(guest.wake).toBeUndefined(); expect(g.wake).toBeUndefined();
  expect({ body: guest.body, hat: guest.hat }).toEqual(before);
});
