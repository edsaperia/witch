// The Workshop's broom parts drawn on their own (art/broomParts.js, art/workshop.js; render/workshopArt.ts lays them on the bay, the
// lathe and the pegboard, ui/stationPanel.ts on the cards): every part its own piece, big and bold on a card, hung on the pegboard
// within its cell, and her broom resting assembled from whatever she's fitted.
import { describe, expect, it } from "vitest";
import { partSprite, restingBroomSprite } from "../../art/workshop.js";
import { PART_ART } from "../../art/broomParts.js";
import { PARTS, fittedOf } from "../rules/broomParts";

type D = { sp: { w: number; h: number; m: Uint8Array }; origin: { x: number; y: number }; lights: unknown[] };
const filled = (d: D) => d.sp.m.reduce((n, v) => n + (v ? 1 : 0), 0);
const PPM = 32 / 3; // (the house's art pixels a metre)

describe("the parts' pictures", () => {
  it("draws every part of config/broom-parts.json as its own piece, in its slot", () => {
    for (const p of PARTS) expect((PART_ART as Record<string, { slot: string }>)[p.id]?.slot, p.id).toBe(p.slot);
  });
  it("draws each on a card big and bold: about the card's length, no two alike", () => {
    const seen = new Set<string>();
    for (const p of PARTS) {
      const d = partSprite(p.id, { fit: 58 }) as D;
      expect(filled(d), p.id).toBeGreaterThan(300);
      expect(d.sp.w, p.id).toBeGreaterThanOrEqual(40); expect(d.sp.w, p.id).toBeLessThanOrEqual(72);
      seen.add(`${d.sp.w}x${d.sp.h}:${filled(d)}`);
    }
    expect(seen.size).toBe(PARTS.length);
  });
  it("hangs each on the pegboard within its cell (about 1.6 m across), still readable: a dozen pixels or more each way", () => {
    for (const p of PARTS) {
      const d = partSprite(p.id, { fit: PPM * 1.75, pitch: .6, yaw: 0, hung: true }) as D;
      expect(d.sp.w, p.id).toBeLessThanOrEqual(PPM * 2.2); expect(Math.max(d.sp.w, d.sp.h), p.id).toBeGreaterThanOrEqual(12);
      expect(filled(d), p.id).toBeGreaterThan(60);
    }
  });
  it("glows only where a real light would: the nozzles' pilot flames and the fairing's headlamp", () => {
    for (const p of PARTS) expect((partSprite(p.id) as D).lights.length > 0, p.id).toBe(p.id === "nozzles" || p.id === "fairing");
  });
  it("rests her broom assembled from her parts: bare, and each set and part changing it", () => {
    const at = (ids: string) => restingBroomSprite(fittedOf(ids), { ppm: PPM, scale: 2 }) as D, bare = at("");
    expect(filled(bare)).toBeGreaterThan(40);
    const seen = new Set([filled(bare)]);
    for (const ids of ["missile,fairing,nozzles", "curl,ladder,twigs", "horse,canoe,oar", "missile", "canoe", "twigs"]) seen.add(filled(at(ids)));
    expect(seen.size).toBe(7);
  });
});
