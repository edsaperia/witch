import { expect, it } from "vitest";
import { stationAuthority } from "./stationAuthority";
import { BAGS } from "../../rules/bags";
import { bareBroom, PARTS } from "../../rules/broomParts";
import { newGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { HOUSE_ROOMS, objectFront } from "../../rules/houseRooms";
import { setParts } from "../../rules/spells";

it("checks the assigned visitor's real station position and host-owned choices, not the host's position", () => {
  // One house and two players are sufficient for proximity/inventory authority.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning, 2), guest = game.witches[1], bags = new Set<string>(), parts = new Set<string>();
  const authority = stationAuthority(() => ({ bags, parts, hats: new Set() }));
  const at = (id: string) => Object.assign(guest.body, objectFront(HOUSE_ROOMS.objects.find(o => o.id === id)!, game.map.treehouse, .1), { perch: true, mode: "ground", seated: false });
  const bag = { kind: "bag" as const, id: BAGS[0].id };
  at("bags"); expect(authority(game, 1, bag)).toBe(false); bags.add(bag.id); expect(authority(game, 1, bag)).toBe(true);
  expect(authority(game, 0, bag)).toBe(false);
  guest.body.x += 100; expect(authority(game, 1, bag)).toBe(false);
  at("bags"); guest.body.perch = false; expect(authority(game, 1, bag)).toBe(false);
  at("lathe"); expect(authority(game, 1, bag)).toBe(false);
  const part = PARTS[0], fitted = { ...bareBroom(), [part.slot]: part.id }, fit = { kind: "broom" as const, fitted };
  expect(authority(game, 1, fit)).toBe(false); parts.add(part.id); expect(authority(game, 1, fit)).toBe(true);
  setParts(game.witches[0].spells, fitted); expect(authority(game, 1, fit)).toBe(false);
});
