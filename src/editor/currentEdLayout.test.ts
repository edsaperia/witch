import { expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import authored from "../../docs/evidence/treehouse-layout-ed-2026-11-01.v2.json";
import current from "../../config/house/layouts/ed-current.json";
import { EDITOR_HOUSE, exportLayout, floorplanKey, layoutItems, LayoutHistory, parseLayout } from "./houseLayout";
import { publishedLayout } from "./publishedLayout";
import { applyEdLayout } from "../rules/housePlacement";
import { placedDecorPlan } from "../render/houseDecor";

it("preserves the complete export and all110 kept poses/anchors; removes strictly west of -100", () => {
  expect(createHash("sha256").update(readFileSync("docs/evidence/treehouse-layout-ed-2026-11-01.v2.json")).digest("hex")).toBe("18c3c64c68a60d67d3d55b2f8f349983fe2260f467634b8b48b216984bb49af6");
  expect(current.objects).toEqual(authored.objects.filter(p => p.x >= -100));
  expect(current.removed).toEqual(authored.objects.filter(p => p.x < -100).map(p => p.id));
  expect(current.removed).toHaveLength(22); expect(current.objects).toHaveLength(110);
  const items = layoutItems(), key = floorplanKey(EDITOR_HOUSE, items);
  expect(parseLayout(authored, items, key).objects).toHaveLength(132); // Recorded source migration still fully validated.
  const selected = publishedLayout(items, key, new URLSearchParams()), exported = exportLayout(selected, items);
  expect(parseLayout(exported, items, key)).toEqual(selected);
  const history = new LayoutHistory(selected); history.save(); history.value = structuredClone(selected); history.value.objects[0].x += 1; history.undo();
  expect(history.value.removed).toEqual(current.removed);
  expect(history.value.objects.some(p => current.removed.includes(p.id))).toBe(false);
  const H = applyEdLayout(EDITOR_HOUSE, true);
  expect(H.layout!.decor!.some(p => current.removed.includes(p.id))).toBe(false);
  const drawn = H.rooms.flatMap(r => placedDecorPlan(r, H));
  expect(drawn).toHaveLength(current.objects.filter(p => p.id.startsWith("clutter:")).length);
});
it("requires explicit valid clutter removal rather than accepting missing furniture or overlaps", () => {
  const items = layoutItems(), key = floorplanKey(EDITOR_HOUSE, items);
  expect(() => parseLayout({ ...current, removed: [...current.removed, "bed"] }, items, key)).toThrow(/clutter/);
  expect(() => parseLayout({ ...current, removed: undefined }, items, key)).toThrow(/does not match/);
  expect(() => parseLayout({ ...current, removed: [...current.removed, current.removed[0]] }, items, key)).toThrow(/clutter/);
  expect(() => parseLayout({ ...current, removed: current.removed.slice(1) }, items, key)).toThrow(/does not match/);
});
