import { expect, it } from "vitest";
import { sharedCatalogue } from "./sharedCatalogue";
import { ITEMS } from "../../rules/wardrobe";
import { PART_IDS } from "../../rules/broomParts";
import { RECORDS } from "../../rules/records";
it("copies only bounded registered display IDs, rejecting invented inventory and extra authority fields", () => {
  const input = { wardrobe: [ITEMS[0].id], parts: [PART_IDS[0]], hats: [], records: [RECORDS[0].id] };
  const result = sharedCatalogue(input)!; expect(result).toEqual(input);
  result.wardrobe.length = 0; expect(input.wardrobe).toHaveLength(1);
  for (const bad of [null, [], {}, { ...input, player: 1 }, { ...input, wardrobe: ["invented"] }, { ...input, parts: [PART_IDS[0], PART_IDS[0]] }, { ...input, records: [999] }]) expect(sharedCatalogue(bad)).toBeNull();
});
