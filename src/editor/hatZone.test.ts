import { expect, it } from "vitest";
import { newGame as fullGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { smallWorld } from "../test/worlds";
import { HAT_FLOOR, HOUSE_ROOMS, hatSlots, hatToTake, useHats } from "../rules/houseRooms";
import { stationAt } from "../rules/stations";
import { dropHat, hatButton } from "../rules/hat";

const newGame = smallWorld(fullGame, "Hat-area authoring must preserve individual pickup/drop rules; distant island generation is irrelevant.");
it("keeps the empty spawn marker out of station menus and acts on individual hats only", () => {
  const marker = HOUSE_ROOMS.objects.find(o => o.use.kind === "hats")!, at = { x: 0, z: 0 };
  const H = { ...HOUSE_ROOMS, objects: [marker] };
  expect(stationAt(at, marker.x, marker.z, null, H)).toBeNull();
  expect(stationAt(at, marker.x, marker.z, marker.id, H)).toBeNull();
  const W = newGame(123, TUNING).witches[0], slots = hatSlots(at);
  W.hat.has = true; W.hat.down = null; W.hat.left = [];
  W.house = { ...W.house, hats: HAT_FLOOR.map(() => "") };
  expect(hatToTake(W, at, slots[0].x, slots[0].z, 1)).toBeNull();
  expect(useHats(W, at, slots[0].x, slots[0].z, 0, 1)).toBeNull();
  W.house.hats![0] = HAT_FLOOR[0];
  const otherSlots = W.house.hats!.slice(1), worn = W.spells.hat;
  expect(hatToTake(W, at, slots[0].x, slots[0].z, 1)?.slot).toBe(0);
  expect(useHats(W, at, slots[0].x, slots[0].z, 1, 1)?.kind).toBe("hatPicked");
  expect(W.spells.hat).toBe(HAT_FLOOR[0]); expect(W.house.hats![0]).toBe(worn === "none" ? "" : worn);
  expect(W.house.hats!.slice(1)).toEqual(otherSlots);
  expect(dropHat(W.hat, 200, 200, 2)).toBe(true);
  expect(hatButton(W.hat, 200, 200, 1, W.spells.hat)).toBe(HAT_FLOOR[0]);
  expect(W.hat.down).toBeNull(); expect(hatSlots(at)).toEqual(slots);
});
