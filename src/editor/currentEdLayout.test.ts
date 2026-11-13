import { expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import authored from "../../docs/evidence/treehouse-layout-ed-2026-11-12.v2.json";
import previous from "../../docs/evidence/treehouse-layout-ed-2026-11-01.v2.json";
import current from "../../config/house/layouts/ed-current.json";
import fixes from "../../config/house/layouts/ed-current-fixes.json";
import identities from "../../config/house/layouts/editor-v2-identities.json";
import { ADDED_OBJECTS, EDITOR_HOUSE, exportLayout, floorplanKey, layoutItems, LayoutHistory, parseLayout } from "./houseLayout";
import { publishedLayout } from "./publishedLayout";
import { applyEdLayout, restingFacing } from "../rules/housePlacement";
import { placedDecorPlan } from "../render/houseDecor";

const sha = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");

it("publishes Ed's 2026-11-12 export, all 114 poses/anchors but the recorded fixes, its 22 removed clutter and the old hats' area", () => {
  // (Ed, 2026-11-12, "New treehouse layout": archived byte for byte)
  expect(sha("docs/evidence/treehouse-layout-ed-2026-11-12.v2.json")).toBe("8053ea09fe99ea261bb982ebb9ac5f16465bd3ccc446aabf20774ef2eca1a2a9");
  // (but for the few poses in ed-current-fixes.json, each with its reason: Ed, 2026-11-13, "fix the others", after the pictures showed
  // the basin and the workbench with use points at or past the floor's edge and Bedroom 3's shoe rack with her behind it)
  const fixed = structuredClone(authored);
  for (const f of fixes.fixes) {
    const p = fixed.objects.find(o => o.id === f.id)!;
    expect({ x: p.x, z: p.z, rotation: p.rotation, useAnchor: p.useAnchor }).toEqual(f.export);
    Object.assign(p, f.now);
  }
  expect(fixes.fixes.map(f => f.id)).toEqual(["basin", "broomBay", "bedroom3ShoeRack"]);
  expect(current).toEqual(fixed);
  expect(current.floorplan).toBe(identities.canonical);
  // (the same 22 clutter pieces west of plan X=-100 as Ed's 2026-11-01 export; Ed, 2026-11-02: "we should remove the old cloakroom hats area")
  expect(current.removed).toEqual(previous.objects.filter(p => p.x < -100).map(p => p.id));
  expect(current.removedObjects).toEqual(["hats"]);
  expect(current.removed).toHaveLength(22); expect(current.objects).toHaveLength(114);
  expect(current.hatSpawnPoints).toHaveLength(15); expect(current.kitchenPlacements).toHaveLength(10);
  // (every object new since the 2026-11-01 export is placed by Ed now, none at a default)
  for (const id of ADDED_OBJECTS) expect(current.objects.some(p => p.id === id)).toBe(true);
  const items = layoutItems(), key = floorplanKey(EDITOR_HOUSE, items);
  expect(parseLayout(authored, items, key).objects).toHaveLength(114);
  const selected = publishedLayout(items, key, new URLSearchParams()), exported = exportLayout(selected, items);
  expect(parseLayout(exported, items, key)).toEqual(selected);
  const history = new LayoutHistory(selected); history.save(); history.value = structuredClone(selected); history.value.objects[0].x += 1; history.undo();
  expect(history.value.removed).toEqual(current.removed);
  expect(history.value.objects.some(p => current.removed.includes(p.id))).toBe(false);
  expect(history.value.removedObjects).toEqual(["hats"]); expect(history.value.objects.some(p => p.id === "hats")).toBe(false);
  const H = applyEdLayout(EDITOR_HOUSE, true);
  expect(H.layout!.decor!.some(p => current.removed.includes(p.id))).toBe(false);
  const drawn = H.rooms.flatMap(r => placedDecorPlan(r, H));
  expect(drawn).toHaveLength(current.objects.filter(p => p.id.startsWith("clutter:")).length);
});
it("still opens Ed's 2026-11-01 export, archived byte for byte, in the editor", () => {
  expect(sha("docs/evidence/treehouse-layout-ed-2026-11-01.v2.json")).toBe("18c3c64c68a60d67d3d55b2f8f349983fe2260f467634b8b48b216984bb49af6");
  const items = layoutItems(), key = floorplanKey(EDITOR_HOUSE, items);
  // (less the guests' bedrooms' two doors, gone since Ed, 2026-11-03; the objects new since, Ed 2026-11-07, at their defaults)
  expect(parseLayout(previous, items, key).objects).toHaveLength(130 + ADDED_OBJECTS.length);
});
it("stands an object the recorded baseline doesn't know as the editor draws it", () => {
  // (rules/housePlacement.ts restingFacing: the same sums as render/housePieces.ts standing, which the editor's items carry)
  const items = layoutItems();
  // (all but the cauldron, whose facing is the kitchen's own)
  for (const o of EDITOR_HOUSE.objects.filter(o => o.id !== "cauldron")) expect(restingFacing(o, EDITOR_HOUSE)).toEqual(items.find(i => i.id === o.id)!.facing);
});
it("requires explicit valid clutter removal rather than accepting missing furniture or overlaps", () => {
  const items = layoutItems(), key = floorplanKey(EDITOR_HOUSE, items);
  expect(() => parseLayout({ ...current, removed: [...current.removed, "bed"] }, items, key)).toThrow(/clutter/);
  expect(() => parseLayout({ ...current, removed: undefined }, items, key)).toThrow(/does not match/);
  expect(() => parseLayout({ ...current, removed: [...current.removed, current.removed[0]] }, items, key)).toThrow(/clutter/);
  expect(() => parseLayout({ ...current, removed: current.removed.slice(1) }, items, key)).toThrow(/does not match/);
  // (only the old hats' area may go outright: Ed, 2026-11-02)
  expect(() => parseLayout({ ...current, removedObjects: ["hats", "bed"] }, items, key)).toThrow(/hats area/);
  expect(() => parseLayout({ ...current, removedObjects: undefined }, items, key)).toThrow(/does not match/);
});
