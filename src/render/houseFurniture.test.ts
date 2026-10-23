// The treehouse's furniture (Ed, 2026-10-23; art/furniture.js, render/houseFurniture.ts): every object of the house drawn as art, from
// its footprint, in every state, standing on the floor, its lights on it, and facing into its room, never away from the camera.
import { describe, expect, it } from "vitest";
import { furnitureSprite, FURNITURE_IDS, FURNITURE_STATES, SIZE } from "../../art/furniture.js";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { standing } from "./houseFurniture";

type Drawn = { sp: { w: number; h: number; m: Uint8Array }; origin: { x: number; y: number }; lights: { x: number; y: number }[] };
const PPM = 32 / 3; // (the house's art pixels a metre: tuning artPixelsPerMetre 16 at pixelSize 3)

describe("the treehouse's furniture", () => {
  it("draws every object of the house as art (none left a box)", () => {
    for (const o of HOUSE_ROOMS.objects) expect(FURNITURE_IDS, o.id).toContain(o.id);
  });
  it("draws each from its footprint, in every state: on the floor, about its footprint's size, its lights on it", () => {
    for (const o of HOUSE_ROOMS.objects) {
      const { yaw, foot } = standing(o);
      for (const state of (FURNITURE_STATES as Record<string, string[]>)[o.id] ?? [undefined]) {
        const d = furnitureSprite(o.id, foot, {}, { ppm: PPM, pitch: 0.6, yaw, state }) as Drawn, { sp } = d, at = `${o.id} ${state ?? ""}`;
        let n = 0, bottom = 0;
        for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { n++; bottom = y; }
        expect(n, `${at}: drawn`).toBeGreaterThan(40);
        // (its floor's middle on the picture, and nothing far below the floor: the floor's middle within its footprint's depth of the bottom)
        expect(d.origin.x, at).toBeGreaterThanOrEqual(0); expect(d.origin.x, at).toBeLessThanOrEqual(sp.w);
        expect(bottom - d.origin.y, `${at}: stands on the floor`).toBeLessThanOrEqual(Math.max(foot.w, foot.d) * PPM * 0.6 + 2);
        // (no wider than its footprint's diagonal and a little, past the clutter)
        expect(sp.w, `${at}: its footprint's size`).toBeLessThanOrEqual(Math.hypot(foot.w, foot.d) * PPM * 1.25 + 6);
        for (const L of d.lights) { expect(L.x, `${at}: light`).toBeGreaterThan(-4); expect(L.x).toBeLessThan(sp.w + 4); expect(L.y).toBeGreaterThan(-4); expect(L.y).toBeLessThan(sp.h + 4); }
      }
    }
  });
  it("draws its states differently (the curtains open and shut)", () => {
    const o = HOUSE_ROOMS.objects.find(q => q.id === "curtains")!, { yaw, foot } = standing(o);
    const [a, b] = ["open", "shut"].map(state => (furnitureSprite("curtains", foot, {}, { ppm: PPM, yaw, state }) as Drawn).sp.m.join());
    expect(a).not.toBe(b);
  });
  it("faces into its room, towards its middle, and never shows its back to the camera; its footprint as the art's, along its wall", () => {
    for (const o of HOUSE_ROOMS.objects) {
      const r = HOUSE_ROOMS.rooms.find(q => q.id === o.room)!, { yaw, foot } = standing(o), f = [-Math.sin(yaw), Math.cos(yaw)];
      expect(f[1], `${o.id}: faces the camera's way`).toBeGreaterThanOrEqual(-1e-9);
      const dx = (r.x0 + r.x1) / 2 - o.x, dz = (r.z0 + r.z1) / 2 - o.z;
      if (Math.hypot(dx, dz) > 1.2 && dz > 0) expect(f[0] * dx + f[1] * dz, `${o.id}: faces its room's middle`).toBeGreaterThan(0);
      expect([foot.w, foot.d].sort().join(), o.id).toBe([o.w, o.d].sort().join());
    }
  });
  it("is twice a real piece's size (Ed, 2026-10-23: \"about 2x, as big as in her old creator bedroom\"): the bed about 4 m by 5 m", () => {
    expect(SIZE).toBe(2);
    const bed = HOUSE_ROOMS.objects.find(o => o.id === "bed")!;
    expect(Math.max(bed.w, bed.d)).toBeGreaterThan(4.5);
  });
});
