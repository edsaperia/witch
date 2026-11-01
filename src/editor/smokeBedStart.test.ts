import { describe, expect, it } from "vitest";
import { createRequire } from "node:module";
import authored from "../../config/house/layouts/ed-current.json";
import { HOUSE_ROOMS, installEdLayout, objectAt, fromObject } from "../rules/houseRooms";
const { activeBedStart, activeObjectStart } = createRequire(import.meta.url)("../../tools/smoke/house-bed-start.cjs");
const hub = { x: 120, z: 340 };
describe("smoke sleep interaction follows the active house", () => {
  it("uses Ed's authored bed anchor for both a plain page and explicit ed", () => {
    const plain = activeBedStart("https://example.test/?island=fox&seed=4242", hub);
    expect(plain).toEqual(activeBedStart("https://example.test/?layout=ed", hub));
    expect(plain).toMatchObject({ id: "bed", room: "turret", layout: "ed" });
    const bed = authored.objects.find(o => o.id === "bed")!;
    expect(Math.hypot(plain.x - hub.x - bed.useAnchor!.x, plain.z - hub.z - bed.useAnchor!.z)).toBeCloseTo(0.1, 9);
    // Original smoke used classic bed centre plus d/2+0.4, even when the game installed Ed's arrangement.
    expect(Math.hypot(plain.x - hub.x - (-6.33), plain.z - hub.z - (-63.18))).toBeGreaterThan(10);
  });
  it("keeps explicit classic and resets repeated selected-layout switches", () => {
    const classic = activeBedStart("https://example.test/?layout=classic", hub);
    expect(classic).toMatchObject({ id: "bed", layout: "classic" });
    const ed = activeBedStart("https://example.test/", hub);
    expect(Math.hypot(classic.x - ed.x, classic.z - ed.z)).toBeGreaterThan(5);
    expect(activeBedStart("https://example.test/?layout=classic", hub)).toEqual(classic);
    expect(activeBedStart("https://example.test/?layout=ed", hub)).toEqual(ed);
  });
  it("translates the selected interaction point with the actual island hub", () => {
    const a = activeBedStart("https://example.test/", { x: 0, z: 0 });
    const b = activeBedStart("https://example.test/", hub);
    expect(b.x - a.x).toBeCloseTo(hub.x, 9);
    expect(b.z - a.z).toBeCloseTo(hub.z, 9);
  });
  it.each(["mapTable", "wardrobe", "lathe"])("resolves %s at its selected authored anchor, retaining classic fallback", id => {
    const p = activeObjectStart("https://example.test/", hub, id);
    expect(p).toMatchObject({ id, layout: "ed" });
    const object = authored.objects.find(o => o.id === id)!;
    expect(Math.hypot(p.x - hub.x - object.useAnchor!.x, p.z - hub.z - object.useAnchor!.z)).toBeCloseTo(0.2, 9);
    const classic = activeObjectStart("https://example.test/?layout=classic", hub, id);
    expect(classic).toMatchObject({ id, layout: "classic" });
    expect(p).not.toEqual(classic);
  });
  it.each([{ id: "wardrobe", x: -18.51, z: -64.88 }, { id: "lathe", x: -46.98, z: 10.05 }])("rejects the old classic %s fixture under Ed's layout", old => {
    installEdLayout(true);
    try {
      const at = { x: 0, z: 0 }, target = HOUSE_ROOMS.objects.find(o => o.id === old.id)!;
      expect(fromObject(target, at, old.x, old.z)).toBeGreaterThan(HOUSE_ROOMS.reach);
      expect(objectAt(at, old.x, old.z)?.id).not.toBe(old.id);
      const fixed = activeObjectStart("https://example.test/", at, old.id);
      expect(objectAt(at, fixed.x, fixed.z)?.id).toBe(old.id);
    } finally { installEdLayout(false); }
  });
});
