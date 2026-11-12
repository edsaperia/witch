import { expect, it } from "vitest";
import { WITCH_GENOME } from "../../../art/witchGenome.js";
import { DEFAULT_OUTFIT } from "../../../art/witch.js";
import { SHELVES, wear } from "../../rules/wardrobe";
import { appearance } from "./appearance";
import { applyStationLook, readStationLook, stationLook, type StationLook } from "./stationAppearance";
import { stationChoice } from "./stationChoice";
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
// Ed, 2026-11-12: the basin's makeup is one colour for lips and eyes ("Pick again to remove"; "Drop blush"). Its look message carries
// both and their colours; an older one (blush, or lips and eyes apart) is still taken, made one colour as a saved look is.
it("the basin's makeup crosses as one colour; an older makeup message is still taken", () => {
  const before = appearance(WITCH_GENOME)!, mk = SHELVES.makeup, RED = [0, 1, .74], BLUE = [.6667, 1, 1];
  const base = structuredClone(DEFAULT_OUTFIT) as Record<string, number[]>, own = new Set(mk.items.map(i => i.id));
  const wanted = { ...wear(before, mk.items[0]), palette: { ...base, lips: RED, eyeshadow: RED } }, request = stationLook("basin", wanted, "makeup")!;
  expect(request.changes).toMatchObject({ "accessories.lipstick": true, "accessories.eyeshadow": true, "palette.lips": RED, "palette.eyeshadow": RED });
  expect(request.changes).not.toHaveProperty("accessories.blush");
  expect(stationChoice(request)).toEqual(request);
  expect(applyStationLook(before, request, new Set(), base)).toBeNull(); // (the makeup not hers: refused)
  const on = applyStationLook(before, request, own, base)!;
  expect(on.accessories).toMatchObject({ lipstick: true, eyeshadow: true }); expect(on.palette).toMatchObject({ lips: RED, eyeshadow: RED });
  const off = applyStationLook(on, stationLook("basin", { ...on, accessories: { ...(on.accessories as object), lipstick: false, eyeshadow: false } }, "makeup")!, own)!;
  expect(off.accessories).toMatchObject({ lipstick: false, eyeshadow: false });
  // older: blush with it, her lips alone in one colour and her eyes in another, no shelf named
  const older = { kind: "look", station: "basin", changes: { "accessories.lipstick": true, "accessories.eyeshadow": false, "accessories.blush": true, "palette.lips": BLUE, "palette.eyeshadow": RED } };
  const read = stationChoice(older)!;
  expect(read).toEqual({ kind: "look", station: "basin", changes: { "accessories.lipstick": true, "accessories.eyeshadow": false, "palette.lips": BLUE, "palette.eyeshadow": RED } });
  const merged = applyStationLook(before, read as StationLook, own, base)!;
  expect(merged.accessories).toMatchObject({ lipstick: true, eyeshadow: true, blush: false }); expect(merged.palette).toMatchObject({ lips: BLUE, eyeshadow: BLUE });
  expect(readStationLook({ kind: "look", station: "basin", changes: { "accessories.blush": "yes" } })).toBeNull(); // (still checked)
  // a whole older look (an avatar) with blush on still reads, its blush off
  expect(appearance({ ...structuredClone(WITCH_GENOME), accessories: { ...WITCH_GENOME.accessories, blush: true } })!.accessories).toMatchObject({ blush: false });
});
