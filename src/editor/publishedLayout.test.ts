import { expect, it } from "vitest";
import { EDITOR_HOUSE, defaultLayout, floorplanKey, layoutItems, normalAngle } from "./houseLayout";
import { publishedLayout } from "./publishedLayout";
import proposal from "../../config/house/layouts/ed-current.json";

it("opens and resets the editor to Ed's published poses with the stable import identity", () => {
  const items = layoutItems(), key = floorplanKey(EDITOR_HOUSE, items);
  const selected = publishedLayout(items, key, new URLSearchParams());
  expect(selected).toEqual(publishedLayout(items, key, new URLSearchParams("layout=ed")));
  for (const p of selected.objects) {
    const authored = proposal.objects.find(o => o.id === p.id)!;
    expect(p).toEqual({ id: authored.id, x: authored.x, z: authored.z, rotation: normalAngle(authored.rotation) });
  }
  const classic = publishedLayout(items, key, new URLSearchParams("layout=classic"));
  expect(classic).toEqual(defaultLayout(items, key));
  expect(selected.objects.find(o => o.id === "bed")).not.toEqual(classic.objects.find(o => o.id === "bed"));
  expect(selected.floorplan).toBe(classic.floorplan);
});
