// The treehouse's furniture (Ed, 2026-10-23; art/furniture.js, render/houseFurniture.ts): every object of the house drawn as art, from
// its footprint, in every state, standing on the floor, its lights on it, and facing into its room, never away from the camera.
import { describe, expect, it } from "vitest";
import { furnitureSprite, FURNITURE_IDS, FURNITURE_STATES, SIZE } from "../../art/furniture.js";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { DRAWN_ELSEWHERE, PENDING, standing } from "./houseFurniture";

type Drawn = { sp: { w: number; h: number; m: Uint8Array }; origin: { x: number; y: number }; lights: { x: number; y: number }[] };
const PPM = 32 / 3; // (the house's art pixels a metre: tuning artPixelsPerMetre 16 at pixelSize 3)

describe("the treehouse's furniture", () => {
  it("draws every object of the house as art (none left a box)", () => {
    // (but those drawn by another's art, and new objects still placeholders: render/houseFurniture.ts DRAWN_ELSEWHERE, PENDING)
    for (const o of HOUSE_ROOMS.objects) if (!DRAWN_ELSEWHERE.has(o.id) && !PENDING.has(o.id)) expect(FURNITURE_IDS, o.id).toContain(o.id);
  });
  it("draws each from its footprint, in every state: on the floor, about its footprint's size, its lights on it", () => {
    for (const o of HOUSE_ROOMS.objects) {
      if (!FURNITURE_IDS.includes(o.id)) continue;
      const { yaw, foot, curve } = standing(o);
      for (const state of (FURNITURE_STATES as Record<string, string[]>)[o.id] ?? [undefined]) {
        const d = furnitureSprite(o.id, foot, {}, { ppm: PPM, pitch: 0.6, yaw, state, curve }) as Drawn, { sp } = d, at = `${o.id} ${state ?? ""}`;
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
  it("draws the Studio's instruments (Ed, 2026-10-23: a glam-rock drum kit, a retro wall of synths, the mic under its spot lamp) at their planned footprints, the lamp marked for the view's light", () => {
    for (const [id, foot] of [["drumKit", { w: 4.4, d: 4, h: 2.6 }], ["synthRack", { w: 4.8, d: 1.4, h: 3.8 }], ["microphone", { w: 1, d: 1, h: 3.4 }]] as const) {
      const d = furnitureSprite(id, foot, {}, { ppm: PPM, yaw: 0, curve: id === "synthRack" ? 6.5 : 0 }) as Drawn & { marks: Record<string, { x: number; y: number }> };
      expect(d.sp.m.filter(Boolean).length, id).toBeGreaterThan(120);
      expect(d.lights.length, `${id}: lit`).toBeGreaterThan(0);
      if (id === "microphone") { const s = d.marks.spot; expect(s.y, "the spot lamp over the mic").toBeLessThan(d.origin.y - 20); expect(s.x).toBeGreaterThan(0); expect(s.x).toBeLessThan(d.sp.w); }
    }
  });
  it("draws the Workshop's pieces (Hotel's, Ed's OK 2026-10-23) with their marks for Hotel's broom and parts: the bay's and the lathe's rest, the biome board's nine cells in rows from the top left", () => {
    for (const id of ["broomBay", "lathe", "pegboard"]) {
      const o = HOUSE_ROOMS.objects.find(q => q.id === id)!, { yaw, foot, curve } = standing(o);
      const d = furnitureSprite(id, foot, {}, { ppm: PPM, yaw, curve }) as Drawn & { marks: Record<string, { x: number; y: number }> };
      const want = id === "pegboard" ? [...Array(9).keys()].map(i => `cell${i}`) : ["rest"];
      for (const k of want) { const q = d.marks[k]; expect(q, `${id}.${k}`).toBeDefined(); expect(q.x).toBeGreaterThan(0); expect(q.x).toBeLessThan(d.sp.w); expect(q.y).toBeGreaterThan(0); expect(q.y).toBeLessThan(d.origin.y); }
      if (id === "pegboard") { const c = d.marks; expect(c.cell0.y, "rows from the top").toBeLessThan(c.cell3.y); expect(c.cell3.y).toBeLessThan(c.cell6.y); }
    }
  });
  it("faces into its room, towards its middle, and never shows its back to the camera; its footprint as the art's, along its wall", () => {
    for (const o of HOUSE_ROOMS.objects) {
      if (!FURNITURE_IDS.includes(o.id)) continue;
      const r = HOUSE_ROOMS.rooms.find(q => q.id === o.room), { yaw, foot } = standing(o), f = [-Math.sin(yaw), Math.cos(yaw)];
      expect(f[1], `${o.id}: faces the camera's way`).toBeGreaterThanOrEqual(-1e-9);
      const dx = r ? (r.x0 + r.x1) / 2 - o.x : 0, dz = r ? (r.z0 + r.z1) / 2 - o.z : 0; // (on the Terrace, in no room: it faces the camera)
      if (r && Math.hypot(dx, dz) > 1.2 && dz > 0) expect(f[0] * dx + f[1] * dz, `${o.id}: faces its room's middle`).toBeGreaterThan(0);
      expect([foot.w, foot.d].sort().join(), o.id).toBe([o.w, o.d].sort().join());
    }
  });
  it("is twice a real piece's size (Ed, 2026-10-23: \"about 2x, as big as in her old creator bedroom\"): the bed about 4 m by 5 m", () => {
    expect(SIZE).toBe(2);
    const bed = HOUSE_ROOMS.objects.find(o => o.id === "bed")!;
    expect(Math.max(bed.w, bed.d)).toBeGreaterThan(4.5);
  });
});
