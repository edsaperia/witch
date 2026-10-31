import { describe, expect, it } from "vitest";
import { HOUSE_ROOMS, hatSlots, toPlan } from "../rules/houseRooms";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { Model, render } from "../../art/model3d.js";
import { M } from "../../art/core.js";
import { FURNITURE_IDS } from "../../art/furniture.js";
import legacy from "../../config/house/layouts/editor-v1-baseline.json";
import supplied from "../../docs/evidence/treehouse-layout-ed-2026-10-31.v1.json";
import proposal from "../../docs/evidence/treehouse-layout-ed-2026-10-31.v2-proposal.json";
import { artKey, attachedPoint, cameraYaw, corners, defaultLayout, exportLayout, floorplanKey, hitItem, isHatZone, itemKind, LayoutHistory, layoutItems, normalAngle, parseLayout, physicalRoom, rotate, zoneSlots } from "./houseLayout";

const items = layoutItems(), key = floorplanKey(HOUSE_ROOMS, items), defaults = () => defaultLayout(items, key);
describe("treehouse authoring layouts", () => {
  it("edits the hats marker as a spawn zone, exporting future slots with no fake station use point", () => {
    const zone = items.find(o => o.id === "hats")!, base = defaults().objects.find(p => p.id === zone.id)!;
    expect(isHatZone(zone)).toBe(true); expect(itemKind(zone)).toBe("Hat spawn zone");
    const slots = zoneSlots(zone, base), runtime = hatSlots({ x: 0, z: 0 }).map(p => toPlan({ x: 0, z: 0 }, p.x, p.z, HOUSE_ROOMS.turn ?? 0));
    slots.forEach((p, i) => { expect(p.x).toBeCloseTo(runtime[i].x, 10); expect(p.z).toBeCloseTo(runtime[i].z, 10); expect(p.slot).toBe(i); });
    const moved = { ...base, x: base.x + 10, z: base.z - 4, rotation: base.rotation + 90 };
    zoneSlots(zone, moved).forEach((p, i) => {
      expect(p.x).toBeCloseTo(moved.x - (slots[i].z - base.z), 10);
      expect(p.z).toBeCloseTo(moved.z + (slots[i].x - base.x), 10);
    });
    const converted = parseLayout(supplied, items, key), edited = converted.objects.find(p => p.id === zone.id)!;
    expect([edited.x, edited.z]).toEqual([supplied.objects.find(p => p.id === zone.id)!.x, supplied.objects.find(p => p.id === zone.id)!.z]);
    const exported = exportLayout(converted, items) as { objects: { id: string; useAnchor?: unknown; kind?: string; spawnSlots?: unknown[] }[] };
    const out = exported.objects.find(p => p.id === zone.id)!;
    expect(out.kind).toBe("hat-spawn-zone"); expect(out).not.toHaveProperty("useAnchor"); expect(out.spawnSlots).toHaveLength(runtime.length);
    expect(parseLayout(exported, items, key)).toEqual(converted);
  });
  it("exports and reapplies every current object/station without changing the published house", () => {
    const original = JSON.stringify(HOUSE_ROOMS), layout = defaults();
    expect(new Set(items.map(o => o.id)).size).toBe(items.length);
    expect(items.filter(o => !o.synthetic && !o.decor).map(o => o.id)).toEqual(HOUSE_ROOMS.objects.map(o => o.id));
    for (const [i, p] of layout.objects.entries()) { p.x += i / 3; p.z -= i / 7; p.rotation = normalAngle(i * 3); }
    expect(parseLayout(JSON.parse(JSON.stringify(exportLayout(layout, items))), items, key)).toEqual(layout);
    expect(JSON.stringify(HOUSE_ROOMS)).toBe(original);
    expect(defaults().objects[0].x).toBe(items[0].x);
  });
  it("moves and rotates station footprints, their use positions and the decks' seat coherently", () => {
    for (const o of items.filter(o => o.use.kind === "creator" || o.synthetic)) {
      const p = { id: o.id, x: o.x + 12, z: o.z - 7, rotation: o.facing.yaw * 180 / Math.PI + 90 }, a = attachedPoint(o, p);
      expect(a.x).toBeCloseTo(p.x - (o.anchor.z - o.z));
      expect(a.z).toBeCloseTo(p.z + (o.anchor.x - o.x));
      expect(Math.hypot(a.x - p.x, a.z - p.z)).toBeCloseTo(Math.hypot(o.anchor.x - o.x, o.anchor.z - o.z));
      const cs = corners(o, p); expect(Math.hypot(cs[1].x - cs[0].x, cs[1].z - cs[0].z)).toBeCloseTo(o.facing.foot.w);
      const layout = defaults(); Object.assign(layout.objects.find(q => q.id === o.id)!, p);
      // Isolate the moved piece, so overlapping unchanged pieces cannot win the hit.
      expect(hitItem([o], { ...layout, objects: [p] }, p.x, p.z)).toBe(o.id);
      expect(hitItem([o], { ...layout, objects: [p] }, p.x + 20, p.z)).toBeNull();
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
    expect(() => parseLayout({ ...defaults(), version: 3 }, items, key)).toThrow();
    expect(() => parseLayout({ ...defaults(), floorplan: "old-house" }, items, key)).toThrow();
    const angle = defaults(); angle.objects[0].rotation = 450;
    expect(parseLayout(angle, items, key).objects[0].rotation).toBe(90);
    const anchors = exportLayout(defaults(), items) as { objects: { useAnchor: { x: number } }[] };
    anchors.objects[0].useAnchor.x += 1;
    expect(() => parseLayout(anchors, items, key)).toThrow(/anchor/);
  });
  it("uses the actual asymmetric model projection with the same sign as plan corners and approach geometry", () => {
    const m = new Model(); m.box([0, .5, 0], [2, .5, .5], M.WOOD);
    const p = { id: "asymmetric", x: 0, z: 0, rotation: 35 }, pitch = 24 * Math.PI / 180;
    const options = { scale: 8, pitch, yaw: cameraYaw(p) }, image = render(m, options);
    const a = image.project!([0, 0, 0]), b = image.project!([2, 0, .5]), plan = rotate(2, .5, p.rotation);
    expect(b[0] - a[0]).toBeCloseTo(plan.x * 8, 0);
    expect(b[1] - a[1]).toBeCloseTo(plan.z * Math.sin(pitch) * 8, 0);
    // The old camera subtraction would put this marker on the opposite side.
    expect(plan.z).toBeGreaterThan(0); expect(rotate(2, .5, -p.rotation).z).toBeLessThan(0);
  });
  it("converts Ed's exact v1 using camera facings, preserves newer kitchen/new clutter, and keeps original evidence bytes", () => {
    expect(createHash("sha256").update(readFileSync("docs/evidence/treehouse-layout-ed-2026-10-31.v1.json")).digest("hex")).toBe("7a939d05aa6b12e3973c3be0097e9b0376ccc00b38779b9c195fb01637ef4cd9");
    const converted = parseLayout(supplied, items, key);
    expect(converted.version).toBe(2); expect(converted.objects).toHaveLength(items.length);
    expect(converted.migration?.held.map(p => p.id)).toEqual(["cauldron"]);
    for (const old of supplied.objects.filter(p => p.id !== "cauldron")) {
      const base = legacy.items.find(o => o.id === old.id)!, p = converted.objects.find(p => p.id === old.id)!;
      expect(p.x).toBe(old.x); expect(p.z).toBe(old.z);
      const yaw = FURNITURE_IDS.includes(old.id) ? base.facing.yaw - old.rotation * Math.PI / 180 : old.rotation * Math.PI / 180;
      expect(Math.sin(cameraYaw(p))).toBeCloseTo(Math.sin(yaw), 12);
      expect(Math.cos(cameraYaw(p))).toBeCloseTo(Math.cos(yaw), 12);
    }
    const pot = HOUSE_ROOMS.objects.find(o => o.id === "cauldron")!, retained = converted.objects.find(p => p.id === pot.id)!;
    expect([retained.x, retained.z]).toEqual([pot.x, pot.z]); expect(pot.w).toBe(10);
    expect(converted.objects.filter(p => p.id.startsWith("clutter:")).length).toBeGreaterThan(20);
    expect(converted.objects.find(p => p.id === "terrace:decks")!.rotation).toBe(45); // camera proxy was already +45, not a model using subtraction
    expect(parseLayout(exportLayout(converted, items), items, key)).toEqual(converted);
    expect(proposal).toEqual(exportLayout(converted, items));
  });
  it("separates clutter into stable selectable/exportable pieces and changes room lighting identity without changing station function", () => {
    const clutter = items.filter(o => o.decor), repeated = layoutItems().filter(o => o.decor);
    expect(clutter.map(o => o.id)).toEqual(repeated.map(o => o.id));
    expect(clutter.some(o => o.decor?.kind === "rug")).toBe(true); expect(clutter.some(o => o.decor?.kind === "mess")).toBe(true);
    const wardrobe = items.find(o => o.id === "wardrobe")!, room = HOUSE_ROOMS.rooms.find(r => r.id === "workshop")!;
    const original = defaults().objects.find(p => p.id === wardrobe.id)!, moved = { ...original, x: room.x, z: room.z };
    expect(physicalRoom(moved)).toBe("workshop"); expect(artKey(wardrobe, moved)).not.toBe(artKey(wardrobe, original));
    expect(wardrobe.use.kind).toBe("creator"); expect(wardrobe.id).toBe("wardrobe");
    const value = defaults(), c = value.objects.find(p => p.id === clutter[0].id)!;
    c.x += 3; c.rotation = 75;
    expect(parseLayout(JSON.parse(JSON.stringify(exportLayout(value, items))), items, key)).toEqual(value);
  });
  it("undoes complete gestures and imports, redoes them, then discards a stale redo after editing", () => {
    const h = new LayoutHistory(defaults()), old = structuredClone(h.value);
    h.save(); h.value.objects[0].x += 1; h.value.objects[0].x += 5;
    const moved = structuredClone(h.value); h.undo(); expect(h.value).toEqual(old);
    h.redo(); expect(h.value).toEqual(moved);
    h.undo(); h.save(); h.value.objects[0].z = 17; h.redo(); expect(h.value.objects[0].z).toBe(17);
  });
});
