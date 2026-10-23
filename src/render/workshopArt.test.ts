// The Workshop's broom parts drawn on their own (art/workshop.js; render/workshopArt.ts lays them on the bay, the lathe and the
// pegboard, ui/stationPanel.ts on the cards): every part draws, its own, and her broom resting draws from whatever she's fitted.
import { describe, expect, it } from "vitest";
import { partSprite, restingBroomSprite } from "../../art/workshop.js";
import { PARTS, fittedOf, partById, SLOTS } from "../rules/broomParts";

type D = { sp: { w: number; h: number; m: Uint8Array }; origin: { x: number; y: number } };
const filled = (d: D) => d.sp.m.reduce((n, v) => n + (v ? 1 : 0), 0);

describe("the parts' pictures", () => {
  it("every part draws, no two alike, longer than tall on a card", () => {
    const seen = new Set<string>();
    for (const p of PARTS) {
      const d = partSprite(p.look.kind, p.look.piece, { ppm: 30, pitch: .3 }) as D;
      expect(filled(d), p.id).toBeGreaterThan(40);
      expect(d.sp.w, p.id).toBeGreaterThan(d.sp.h);
      seen.add(`${d.sp.w}x${d.sp.h}:${filled(d)}`);
    }
    expect(seen.size).toBe(PARTS.length);
  });
  it("her broom resting draws bare and with every set, its parts changing it", () => {
    const looks = (ids: string) => { const f = fittedOf(ids); return Object.fromEntries(SLOTS.map(s => [s, partById(f[s])?.look ?? null])); };
    const bare = restingBroomSprite(looks(""), { ppm: 20, scale: 1.6 }) as D, rocket = restingBroomSprite(looks("missile,fairing,nozzles"), { ppm: 20, scale: 1.6 }) as D;
    expect(filled(bare)).toBeGreaterThan(40);
    expect(filled(rocket)).not.toBe(filled(bare));
  });
});
