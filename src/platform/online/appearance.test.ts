import { expect, it } from "vitest";
import { WITCH_GENOME, witchGenome } from "../../../art/witchGenome.js";
import { appearance } from "./appearance";
it("copies valid normal/generated looks and allows known colour and fit choices", () => {
  const original = structuredClone(WITCH_GENOME), decoded = appearance(original)!;
  expect(decoded).toEqual(original); expect(decoded).not.toBe(original);
  for (const seed of [1, 12, 123]) expect(appearance(witchGenome(seed))).not.toBeNull();
  const input = { hat: { shape: "classic", height: 1.3 }, accessories: { shades: "round" }, palette: { hair: [.2, .3, .4] } };
  const look = appearance(input)!; input.palette.hair[0] = 99;
  expect((look.palette as { hair: number[] }).hair[0]).toBe(.2);
});
it("rejects rules/identity/inventory fields, oversized or malformed artwork input", () => {
  for (const bad of [null, [], { player: 0 }, { tuning: {} }, { inventory: [] }, { hat: { height: "2" } }, { hat: { height: Infinity } }, { hat: { shape: "invented" } }, { broom: { length: 9999999 } }, { accessories: { lantern: {} } }, { palette: { unknown: [0, 0, 0] } }, { palette: { hair: [NaN, 0, 0] } }, JSON.parse('{"__proto__":{}}')]) expect(appearance(bad)).toBeNull();
});
