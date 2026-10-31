import { describe, expect, it } from "vitest";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { attachedPoint, corners, defaultLayout, exportLayout, floorplanKey, hitItem, LayoutHistory, layoutItems, parseLayout } from "./houseLayout";

const items = layoutItems(), key = floorplanKey(HOUSE_ROOMS, items), defaults = () => defaultLayout(items, key);
describe("treehouse authoring layouts", () => {
  it("exports and reapplies every current object/station without changing the published house", () => {
    const original = JSON.stringify(HOUSE_ROOMS), layout = defaults();
    expect(new Set(items.map(o => o.id)).size).toBe(items.length);
    expect(items.filter(o => !o.synthetic).map(o => o.id)).toEqual(HOUSE_ROOMS.objects.map(o => o.id));
    for (const [i, p] of layout.objects.entries()) { p.x += i / 3; p.z -= i / 7; p.rotation = i * 3; }
    expect(parseLayout(JSON.parse(JSON.stringify(exportLayout(layout, items))), items, key)).toEqual(layout);
    expect(JSON.stringify(HOUSE_ROOMS)).toBe(original);
    expect(defaults().objects[0].x).toBe(items[0].x);
  });
  it("moves and rotates station footprints, their use positions and the decks' seat coherently", () => {
    for (const o of items.filter(o => o.use.kind === "creator" || o.synthetic)) {
      const p = { id: o.id, x: o.x + 12, z: o.z - 7, rotation: 90 }, a = attachedPoint(o, p);
      expect(a.x).toBeCloseTo(p.x - (o.anchor.z - o.z));
      expect(a.z).toBeCloseTo(p.z + (o.anchor.x - o.x));
      expect(Math.hypot(a.x - p.x, a.z - p.z)).toBeCloseTo(Math.hypot(o.anchor.x - o.x, o.anchor.z - o.z));
      const cs = corners(o, p); expect(Math.hypot(cs[1].x - cs[0].x, cs[1].z - cs[0].z)).toBeCloseTo(o.w);
      const layout = defaults(); Object.assign(layout.objects.find(q => q.id === o.id)!, p);
      // Isolate the moved piece, so overlapping unchanged pieces cannot win the hit.
      expect(hitItem([o], { ...layout, objects: [p] }, p.x, p.z)).toBe(o.id);
      expect(hitItem([o], { ...layout, objects: [p] }, p.x + o.d / 2 + 2, p.z)).toBeNull();
    }
  });
  it("refuses incompatible/partial/duplicate IDs and non-finite or unbounded values before applying", () => {
    for (const bad of [NaN, Infinity, -Infinity, "1", null, 10001]) {
      const value = defaults(); (value.objects[0] as unknown as { x: unknown }).x = bad;
      expect(() => parseLayout(value, items, key)).toThrow();
    }
    const duplicate = defaults(); duplicate.objects[1].id = duplicate.objects[0].id;
    expect(() => parseLayout(duplicate, items, key)).toThrow();
    const unknown = defaults(); unknown.objects[0].id = "not-an-object";
    expect(() => parseLayout(unknown, items, key)).toThrow();
    expect(() => parseLayout({ ...defaults(), objects: [] }, items, key)).toThrow();
    expect(() => parseLayout({ ...defaults(), version: 2 }, items, key)).toThrow();
    expect(() => parseLayout({ ...defaults(), floorplan: "old-house" }, items, key)).toThrow();
    const angle = defaults(); angle.objects[0].rotation = 450;
    expect(parseLayout(angle, items, key).objects[0].rotation).toBe(90);
    const anchors = exportLayout(defaults(), items) as { objects: { useAnchor: { x: number } }[] };
    anchors.objects[0].useAnchor.x += 1;
    expect(() => parseLayout(anchors, items, key)).toThrow(/anchor/);
  });
  it("undoes complete gestures and imports, redoes them, then discards a stale redo after editing", () => {
    const h = new LayoutHistory(defaults()), old = structuredClone(h.value);
    h.save(); h.value.objects[0].x += 1; h.value.objects[0].x += 5;
    const moved = structuredClone(h.value); h.undo(); expect(h.value).toEqual(old);
    h.redo(); expect(h.value).toEqual(moved);
    h.undo(); h.save(); h.value.objects[0].z = 17; h.redo(); expect(h.value.objects[0].z).toBe(17);
  });
});
