import { describe, expect, it } from "vitest";
import { HOUSE_CONFIG } from "./houseConfig";
import { fromObject, hatSlots, objectFront, objectWorld, type HouseConfig } from "./houseRooms";
import { applyEdLayout, objectOffset, placementFacing } from "./housePlacement";
import { kitchenPlacement } from "./kitchenPlacement";
import { kitchenPlan } from "./mushrooms";
import proposal from "../../config/house/layouts/ed-current.json";

describe("explicit opt-in house placement", () => {
  const source = HOUSE_CONFIG as HouseConfig;
  it("leaves the published default and fixed shape unchanged and only applies Ed on explicit opt-in", () => {
    const before = JSON.stringify(source);
    expect(applyEdLayout(source, false)).toBe(source);
    const H = applyEdLayout(source, true);
    expect(JSON.stringify(source)).toBe(before); expect(H.shape).toEqual(source.shape);
    expect(H.layout?.id).toBe("ed"); expect(H.layout!.hatPoints.length).toBeGreaterThan(4);
    expect(H.terrace.decks.rotation).toBe(proposal.objects.find(p => p.id === "terrace:decks")!.rotation);
    expect(H.objects.find(o => o.id === "drumKit")!.placement?.sourceRoom).toBe(source.objects.find(o => o.id === "drumKit")!.room);
    const pot = H.objects.find(o => o.id === "cauldron")!, baselinePot = source.objects.find(o => o.id === "cauldron")!;
    const authored = proposal.objects.find(p => p.id === "cauldron")!;
    expect([pot.x, pot.z, pot.w, pot.d, pot.h]).toEqual([authored.x, authored.z, baselinePot.w, baselinePot.d, baselinePot.h]);
    expect(pot.room).toBe("dining");
  });
  it("uses explicit model-facing, transformed station anchors and bed attachments instead of re-inferring source room facing", () => {
    const H = applyEdLayout(source, true), bed = H.objects.find(o => o.id === "bed")!, p = proposal.objects.find(o => o.id === bed.id)!;
    expect(objectFront(bed, { x: 0, z: 0 }, .5, H)).toEqual("useAnchor" in p ? p.useAnchor : null);
    expect(fromObject(bed, { x: 0, z: 0 }, bed.x, bed.z, H)).toBe(0);
    const local = objectOffset(bed, bed.w * .15, 0), inBed = objectWorld(bed, { x: 0, z: 0 }, bed.w * .15, 0, H);
    expect(inBed.x).toBeCloseTo(bed.x + local.x); expect(inBed.z).toBeCloseTo(bed.z + local.z);
    expect(placementFacing(90).heading).toBe("down"); expect(placementFacing(-90).heading).toBe("up");
    expect(hatSlots({ x: 10, z: 20 }, H)[0]).toEqual({ x: H.layout!.hatPoints[0].x + 10, z: H.layout!.hatPoints[0].z + 20 });
    for (const room of ["bedroom2", "bedroom3"]) {
      const table = H.objects.find(o => o.id === `${room}DressingTable`)!;
      const chest = proposal.objects.find(o => o.id === `${room}Chest`)!;
      expect([table.x, table.z, table.placement?.rotation]).toEqual([chest.x, chest.z, chest.rotation]);
      expect(table.placement?.foot.h).toBe(table.h);
      expect(table.use.kind).toBe("creator");
    }
  });
  it("provides a potion-owner position hook without changing colour identity, state or default kitchen geometry", () => {
    const base = kitchenPlan(), before = JSON.stringify(base);
    expect(kitchenPlacement(base, false)).toBe(base);
    const moved = kitchenPlacement(base, true);
    expect(moved.baskets.map(b => b.type)).toEqual(base.baskets.map(b => b.type)); expect(moved.baskets).toHaveLength(9);
    for (const b of moved.baskets) { const p = proposal.objects.find(p => p.id === `mushroom-basket:${b.type}`)!; expect(b).toMatchObject({ x: p.x, z: p.z, rotation: p.rotation }); }
    expect(JSON.stringify(base)).toBe(before);
  });
});
