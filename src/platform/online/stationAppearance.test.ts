import { expect, it } from "vitest";
import { WITCH_GENOME } from "../../../art/witchGenome.js";
import { DEFAULT_OUTFIT } from "../../../art/witch.js";
import { SHELVES, wear } from "../../rules/wardrobe";
import { appearance } from "./appearance";
import { applyStationLook, readStationLook, stationLook } from "./stationAppearance";
it("changes only that station's fields and refuses unowned new clothes", () => {
  const before = appearance(WITCH_GENOME)!, item = SHELVES.cloak.items.find(i => i.set.cloak === "long")!;
  const wanted = wear(before, item), request = stationLook("cloakPegs", wanted)!;
  expect(request.changes).not.toHaveProperty("hat.shape"); expect(request.changes).not.toHaveProperty("broom.kind");
  expect(applyStationLook(before, request, new Set())).toBeNull();
  const next = applyStationLook(before, request, new Set([item.id]))!;
  expect(next.cloak).toBe("long"); expect(next.hat).toEqual(before.hat); expect(next.broom).toEqual(before.broom); expect(before.cloak).toBe("none");
  for (const changes of [{ "hat.shape": "none" }, { "palette.hair": [0, 0, 0] }, { "__proto__.x": true }, { cloakLength: Infinity }]) expect(readStationLook({ kind: "look", station: "cloakPegs", changes })).toBeNull();
});
it("preserves actual base colours when adding a station colour and rejects out-of-range fits", () => {
  const before = appearance(WITCH_GENOME)!, request = { kind: "look" as const, station: "dressingTable", changes: { "palette.hair": [.2, .3, .4] } };
  expect(applyStationLook(before, request)).toBeNull();
  const base = structuredClone(DEFAULT_OUTFIT) as Record<string, number[]>; base.jeans = [.1, .2, .3];
  const next = applyStationLook(before, request, undefined, base)!;
  expect((next.palette as Record<string, number[]>).hair).toEqual([.2, .3, .4]); expect((next.palette as Record<string, number[]>).jeans).toEqual(base.jeans);
  expect(applyStationLook(before, { kind: "look", station: "mirror", changes: { "hat.height": 999 } })).toBeNull();
  expect(readStationLook({ ...request, player: 0 })).toBeNull();
});
