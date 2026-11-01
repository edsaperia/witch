import { afterEach, expect, it, vi } from "vitest";
import { installTelephone, telephoneEnabled } from "./telephoneSwitch";
import { telephoneStation } from "./telephoneStation";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { snapshotGame } from "../rules/nightSnapshot";
afterEach(() => installTelephone(false));

it("keeps the authored default say use and performs no panel/identity/storage/network work on use", async () => {
  installTelephone(false);
  const phone = HOUSE_ROOMS.objects.find(o => o.id === "telephone")!, original = phone.use;
  expect(phone.use).toEqual({ kind: "say", line: "The line's quiet. Friends can call later." });
  const tuning = structuredClone(TUNING); tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), before = JSON.stringify(snapshotGame(game));
  const loadIdentity = vi.fn(async () => { throw Error("Must not create identity"); }), socket = vi.fn(), menu = vi.fn(), read = vi.fn(), write = vi.fn();
  const station = telephoneStation({ enabled: telephoneEnabled(new URLSearchParams()), storage: { getItem: read, setItem: write }, loadIdentity, socket, menu });
  station.use(game, phone.id); station.frame(game, 0); station.close(); station.hangUp(); await station.returnHome(game, phone.id); station.dispose();
  expect(station.open).toBe(false); expect(phone.use).toBe(original);
  for (const callback of [loadIdentity, socket, menu, read, write]) expect(callback).not.toHaveBeenCalled();
  expect(JSON.stringify(snapshotGame(game))).toBe(before);
});
it("requires explicit telephone=1 and restores the original use after proof opt-in", () => {
  for (const value of ["", "seed=123", "telephone=0", "telephone=true", "telephone="]) expect(telephoneEnabled(new URLSearchParams(value))).toBe(false);
  expect(telephoneEnabled(new URLSearchParams("telephone=1"))).toBe(true);
  const phone = HOUSE_ROOMS.objects.find(o => o.id === "telephone")!, original = phone.use;
  installTelephone(true); expect(phone.use.kind).toBe("telephone"); installTelephone(false); expect(phone.use).toBe(original);
});
