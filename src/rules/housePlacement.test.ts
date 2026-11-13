import { describe, expect, it } from "vitest";
import { HOUSE_CONFIG } from "./houseConfig";
import { fromObject, hatSlots, objectFront, objectWorld, toPlan, type HouseConfig } from "./houseRooms";
import { field } from "../../config/house/shape.js";
import { applyEdLayout, objectOffset, placementFacing } from "./housePlacement";
import { kitchenPlacement } from "./kitchenPlacement";
import { kitchenPlan } from "./mushrooms";
import proposal from "../../config/house/layouts/ed-current.json";

describe("explicit opt-in house placement", () => {
  const source = HOUSE_CONFIG as HouseConfig;
  it("applies the explicit Ed placement mode without mutating its source or fixed shape", () => {
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
      // (Ed's 2026-11-12 export names the dressing tables by their own ids, no longer the chests')
      const placed = proposal.objects.find(o => o.id === `${room}DressingTable`)!;
      expect([table.x, table.z, table.placement?.rotation]).toEqual([placed.x, placed.z, placed.rotation]);
      expect(table.placement?.foot.h).toBe(table.h);
      expect(table.use.kind).toBe("creator");
    }
  });
  it("stands every object Ed's export places where he put it, its use point his, the objects new since the baseline too", () => {
    // (Ed, 2026-11-12, "New treehouse layout": the basins, the guests' shoe racks, the broom rack and the hydraulic lift among them)
    const H = applyEdLayout(source, true);
    for (const p of proposal.objects.filter(p => !p.id.includes(":"))) {
      const o = H.objects.find(o => o.id === p.id)!;
      expect([o.id, o.x, o.z, o.placement?.rotation]).toEqual([p.id, p.x, p.z, p.rotation]);
      if (p.id !== "cauldron") expect(objectFront(o, { x: 0, z: 0 }, .5, H)).toEqual(p.useAnchor);
    }
    for (const id of ["basin", "bedroom2Basin", "bedroom3Basin", "bedroom2ShoeRack", "bedroom3ShoeRack", "broomRack", "broomLift"]) {
      const o = H.objects.find(o => o.id === id)!, from = source.objects.find(o => o.id === id)!;
      expect(o.placement?.sourceRoom).toBe(from.room); expect(o.use).toEqual(from.use);
    }
  });
  it("has every station's use point on the house's floor, and the step back from it where ?shot=object: puts her", () => {
    // (Ed, 2026-11-13, "fix the others": his 2026-11-12 export had the basin's use point 0.32 m off the floor, facing the wall, and the
    // workbench's 0.13 m from the edge, so the shot tool, half a metre further back, dropped her into the treetops at both)
    for (const H of [applyEdLayout(source, true), source]) {
      for (const o of H.objects) for (const by of [.5, 1]) {
        const p = objectFront(o, { x: 0, z: 0 }, by, H), q = toPlan({ x: 0, z: 0 }, p.x, p.z, H.turn ?? 0);
        expect(field(H.shape, q.x, q.z, true), `${H.layout ? "Ed's" : "classic"} ${o.id} at ${by} m`).toBeLessThan(0);
      }
      // (and the decks' seat, where she starts the night)
      const t = H.rooms.find(r => r.id === "terrace")!;
      expect(field(H.shape, t.x + H.terrace.seat.x, t.z + H.terrace.seat.z, true)).toBeLessThan(0);
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
