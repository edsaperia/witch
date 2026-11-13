import { expect, it } from "vitest";
import { ADDED_OBJECTS, EDITOR_HOUSE, defaultLayout, floorplanKey, layoutItems, normalAngle } from "./houseLayout";
import { publishedLayout } from "./publishedLayout";
import proposal from "../../config/house/layouts/ed-current.json";
import { guestFurnitureMigration } from "../rules/guestFurnitureMigration";

it("opens and resets the editor to Ed's published poses with the stable import identity", () => {
  const items = layoutItems(), key = floorplanKey(EDITOR_HOUSE, items);
  const selected = publishedLayout(items, key, new URLSearchParams());
  expect(selected).toEqual(publishedLayout(items, key, new URLSearchParams("layout=ed")));
  // (Ed's 2026-11-12 export, "New treehouse layout", places every object, the ones new since 2026-11-07 among them, by its own id)
  expect(selected.objects).toHaveLength(proposal.objects.length);
  for (const p of selected.objects) {
    const authored = proposal.objects.find(o => o.id === p.id)!;
    expect(p).toEqual({ id: p.id, x: authored.x, z: authored.z, rotation: normalAngle(authored.rotation) });
  }
  for (const id of ADDED_OBJECTS) expect(selected.objects.some(p => p.id === id)).toBe(true);
  const classic = publishedLayout(items, key, new URLSearchParams("layout=classic"));
  expect(classic).toEqual(defaultLayout(items, key));
  expect(selected.objects.find(o => o.id === "bed")).not.toEqual(classic.objects.find(o => o.id === "bed"));
  expect(selected.floorplan).toBe(classic.floorplan);
  expect(guestFurnitureMigration).toEqual({ version: 1, replacements: {
    bedroom2Chest: "bedroom2DressingTable", bedroom3Chest: "bedroom3DressingTable",
  } });
  // The saved publication is the new catalogue since Ed's 2026-11-12 export; older exports' chests still migrate on load.
  expect(proposal.objects.filter(p => /bedroom[23](Chest|DressingTable)$/.test(p.id)).map(p => p.id)).toEqual(["bedroom2DressingTable", "bedroom3DressingTable"]);
  expect(selected.objects.filter(p => /bedroom[23](Chest|DressingTable)$/.test(p.id)).map(p => p.id)).toEqual(["bedroom2DressingTable", "bedroom3DressingTable"]);
});
