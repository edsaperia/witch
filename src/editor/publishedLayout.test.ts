import { expect, it } from "vitest";
import { EDITOR_HOUSE, defaultLayout, floorplanKey, layoutItems, normalAngle } from "./houseLayout";
import { publishedLayout } from "./publishedLayout";
import proposal from "../../config/house/layouts/ed-current.json";
import { guestFurnitureMigration } from "../rules/guestFurnitureMigration";

it("opens and resets the editor to Ed's published poses with the stable import identity", () => {
  const items = layoutItems(), key = floorplanKey(EDITOR_HOUSE, items);
  const selected = publishedLayout(items, key, new URLSearchParams());
  expect(selected).toEqual(publishedLayout(items, key, new URLSearchParams("layout=ed")));
  for (const p of selected.objects) {
    const sourceId = p.id === "bedroom2DressingTable" ? "bedroom2Chest" : p.id === "bedroom3DressingTable" ? "bedroom3Chest" : p.id;
    const authored = proposal.objects.find(o => o.id === sourceId)!;
    expect(p).toEqual({ id: p.id, x: authored.x, z: authored.z, rotation: normalAngle(authored.rotation) });
  }
  const classic = publishedLayout(items, key, new URLSearchParams("layout=classic"));
  expect(classic).toEqual(defaultLayout(items, key));
  expect(selected.objects.find(o => o.id === "bed")).not.toEqual(classic.objects.find(o => o.id === "bed"));
  expect(selected.floorplan).toBe(classic.floorplan);
  expect(guestFurnitureMigration).toEqual({ version: 1, replacements: {
    bedroom2Chest: "bedroom2DressingTable", bedroom3Chest: "bedroom3DressingTable",
  } });
  // The saved publication is still the old catalogue; only its loaded copy migrates.
  expect(proposal.objects.filter(p => /bedroom[23](Chest|DressingTable)$/.test(p.id)).map(p => p.id)).toEqual(["bedroom2Chest", "bedroom3Chest"]);
  expect(selected.objects.filter(p => /bedroom[23](Chest|DressingTable)$/.test(p.id)).map(p => p.id)).toEqual(["bedroom2DressingTable", "bedroom3DressingTable"]);
});
