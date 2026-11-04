import { expect, it, vi } from "vitest";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { snapshotGame } from "../rules/nightSnapshot";
import { HOUSE_ROOMS, objectFront } from "../rules/houseRooms";
import { startWake } from "../rules/wakeUp";
import { leaveVisit, visitHome } from "./visitHome";

it("returns an own fresh night to the existing telephone anchor without modifying house geometry or equipment", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), rooms = JSON.stringify(HOUSE_ROOMS), gear = JSON.stringify(game.witches[0].spells);
  startWake(game, 0, { yesterday: true });
  const phone = HOUSE_ROOMS.objects.find(o => o.id === "telephone")!;
  expect(visitHome(game)).toBe(phone.id);
  expect(game.witches[0].body).toMatchObject({ ...objectFront(phone, game.map.treehouse), mode: "ground", perch: true, vx: 0, vz: 0 });
  expect(game.wake).toMatchObject({ open: true, beat: "up", pile: [] });
  expect(JSON.stringify(HOUSE_ROOMS)).toBe(rooms); expect(JSON.stringify(game.witches[0].spells)).toBe(gear);
});
it("leaves solo/default state and callbacks byte-identical and orders hangup before thaw", () => {
  const tuning = structuredClone(TUNING); tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), before = JSON.stringify(snapshotGame(game)), hang = vi.fn(), thaw = vi.fn();
  expect(leaveVisit(false, hang, thaw)).toBe(false); expect(hang).not.toHaveBeenCalled(); expect(thaw).not.toHaveBeenCalled();
  expect(JSON.stringify(snapshotGame(game))).toBe(before);
  const order: string[] = []; expect(leaveVisit(true, () => order.push("hang"), () => order.push("thaw"))).toBe(true);
  expect(order).toEqual(["hang", "thaw"]);
});
