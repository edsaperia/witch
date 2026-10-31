import { describe, expect, it } from "vitest";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import supplied from "../../docs/evidence/treehouse-layout-ed-2026-10-31.v1.json";
import { defaultLayout, floorplanKey, layoutItems, parseLayout } from "./houseLayout";
import { auditLayout } from "./houseLayoutAudit";

describe("layout adoption audit", () => {
  const items = layoutItems(), key = floorplanKey(HOUSE_ROOMS, items);
  it("audits Ed's converted proposal without changing the published defaults", () => {
    const before = JSON.stringify(HOUSE_ROOMS), layout = parseLayout(supplied, items, key), audit = auditLayout(layout, items);
    expect(audit.objectCount).toBe(44); expect(audit.clutterCount).toBe(73);
    expect(audit.overlaps).toEqual([["cauldron", "mushroom-basket:purple"], ["cauldron", "mushroom-basket:turquoise"]]); // Actual current-kitchen fit warnings are retained, not hidden.
    expect(audit.objects.filter(o => o.interactive && ((o.anchorOutside ?? 0) > -.3 || !o.floorReachable || o.approachOverlaps.length))).toEqual([]);
    const hats = audit.objects.find(o => o.id === "hats")!;
    expect(hats.interactive).toBe(false); expect(hats.anchor).toBeNull(); expect(hats.spawnSlots?.length).toBeGreaterThan(0);
    expect(audit.hatSpawnPoints).toHaveLength(15);
    expect(audit.hatSpawnPoints.every(p => p.floorOutside <= -.3 && !p.footprintOverlaps.length)).toBe(true);
    expect(audit.objects.find(o => o.id === "drumKit")?.physicalRoom).toBe("workshop");
    expect(audit.migration?.held.map(p => p.id)).toEqual(["cauldron"]);
    expect(JSON.stringify(HOUSE_ROOMS)).toBe(before);
  });
  it("detects an object outside the floor and overlapping approach geometry", () => {
    const layout = defaultLayout(items, key), wardrobe = layout.objects.find(p => p.id === "wardrobe")!;
    wardrobe.x = 1000; wardrobe.z = 1000;
    const audit = auditLayout(layout, items), row = audit.objects.find(o => o.id === "wardrobe")!;
    expect(row.centerOutside).toBeGreaterThan(0); expect(row.floorReachable).toBe(false);
    const other = layout.objects.find(p => p.id === "shoeRack")!;
    other.x = wardrobe.x; other.z = wardrobe.z;
    expect(auditLayout(layout, items).overlaps.some(pair => pair.includes("wardrobe") && pair.includes("shoeRack"))).toBe(true);
  });
});
