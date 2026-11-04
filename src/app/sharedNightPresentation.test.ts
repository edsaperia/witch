import { expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { newGame, newWitchPlayer, type Game } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { HOUSE_ROOMS, objectFront } from "../rules/houseRooms";
import { remoteRoomPass } from "../render/remoteWitch";
import { remoteAppearance } from "../platform/online/remoteAppearance";
import type { View } from "../render/view";
import type { WitchLookLease } from "../render/witchLookLease";
import { WITCH_GENOME } from "../../art/witchGenome.js";

it("rebinds the actual host rollover callback's remote body, room, hat and broom source to the new game", async () => {
  // Drawing-source ownership needs one house, not distant island generation.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const previous = newGame(123, tuning), next = newGame(456, tuning);
  for (const g of [previous, next]) g.witches.push(newWitchPlayer(1, 0, 0, tuning));
  previous.witches[1].body.perch = false;
  const guest = next.witches[1], wardrobe = HOUSE_ROOMS.objects.find(o => o.id === "bedroom2Wardrobe")!;
  Object.assign(guest.body, objectFront(wardrobe, next.map.treehouse, .1), { perch: true, seated: false });
  guest.hat.has = false; guest.spells.parts.tip = "missile";
  let drawing: Game | null = null;
  const bake = vi.fn(async (_genome: unknown) => ({ release: vi.fn() }) as unknown as WitchLookLease);
  const art = remoteAppearance({ assets: { leaseWitchLook: bake } } as unknown as Pick<View, "assets">,
    source => { drawing = source; return () => {}; });
  await art.look(1, WITCH_GENOME); await art.start(previous, 0);
  expect(drawing === previous).toBe(true);
  // Exercise the actual page seam; an unconnected helper cannot make this test green.
  const main = readFileSync("src/main.ts", "utf8").replace(/\r\n/g, "\n"), from = main.indexOf("  continuedHost: ") + "  continuedHost: ".length;
  const until = main.indexOf(",\n  prepareGuest:", from), callback = main.slice(from, until).trim();
  expect(from).toBeGreaterThan(20); expect(until).toBeGreaterThan(from);
  const continued = vi.fn(), failure = vi.fn();
  const rollover = Function("callArrival", "remoteArt", "logCaughtError", "phone", `return (${callback});`)
    ({ continued }, art, failure, { hangUp: failure }) as (previous: Game, next: Game) => void;
  rollover(previous, next); await art.refresh();
  expect(continued).toHaveBeenCalledWith(previous, next);
  expect(drawing === next).toBe(true);
  expect(remoteRoomPass(drawing!, drawing!.witches[1])).toBe(true);
  expect(drawing!.witches[1].spells.parts.tip).toBe("missile");
  expect(bake.mock.lastCall?.[0]).toMatchObject({ hat: { shape: "none" } });
  expect(failure).not.toHaveBeenCalled(); art.clear();
});
