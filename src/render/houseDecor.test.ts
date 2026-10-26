// The treehouse's rooms dressed (Ed, 2026-10-23; art/houseDecor.js, render/houseDecor.ts): a middle density, every piece by the walls
// and clear of the doorways, the ways in and the stations' reach, the same every load; each kind drawn, lit where it's a light.
import { describe, expect, it } from "vitest";
import { decorSprite, DECOR_KINDS } from "../../art/houseDecor.js";
import { HOUSE_ROOMS, fromObject } from "../rules/houseRooms";
import { decorPlan, ROOM_DECOR } from "./houseDecor";

describe("the treehouse's rooms dressed", () => {
  const rooms = HOUSE_ROOMS.rooms.filter(r => r.r && !r.locked);
  it("gives each room a middle density (Ed's pick): a rug and up to six pieces, two or more in the bigger rooms (the small hubs crowded with branches, and the busy Workshop, take what fits)", () => {
    for (const r of rooms) {
      const items = decorPlan(r), pieces = items.filter(i => i.kind !== "rug" && i.kind !== "mess");
      if (r.r! >= 6) expect(pieces.length, r.id).toBeGreaterThanOrEqual(Math.min(2, (ROOM_DECOR[r.id] ?? []).filter(k => k !== "rug").length));
      expect(pieces.length, r.id).toBeLessThanOrEqual(6);
    }
    expect(decorPlan(HOUSE_ROOMS.rooms.find(r => r.locked)!)).toEqual([]);
  });
  it("puts every piece on its room's floor by the wall, clear of the doorways, the ways in and every object's reach", () => {
    for (const r of rooms) {
      const cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
      for (const it of decorPlan(r)) {
        if (it.kind === "rug") { expect(Math.hypot(it.x, it.z) + it.r!, `${r.id} rug`).toBeLessThan(r.r!); continue; }
        if (it.kind === "mess") continue; // (a piece's spill, round its foot: below)
        expect(Math.hypot(it.x, it.z), `${r.id} ${it.kind}: by the wall`).toBeGreaterThan(r.r! - 1.6);
        expect(Math.hypot(it.x, it.z), `${r.id} ${it.kind}: on the floor`).toBeLessThan(r.r! - 0.5);
        for (const o of HOUSE_ROOMS.objects) expect(fromObject(o, { x: 0, z: 0 }, cx + it.x, cz + it.z), `${r.id} ${it.kind} by ${o.id}`).toBeGreaterThan(HOUSE_ROOMS.reach);
        for (const c of HOUSE_ROOMS.corridors) if (c.pts && c.id.split("-").includes(r.id)) for (const e of [c.pts[0], c.pts[c.pts.length - 1]]) if (Math.hypot(e[0] - cx, e[1] - cz) < r.r!) expect(Math.hypot(cx + it.x - e[0], cz + it.z - e[1]), `${r.id} ${it.kind}: off the doorway`).toBeGreaterThan(3);
      }
    }
  });
  it("is the same every load, and faces each piece into its room, never away from the camera", () => {
    for (const r of rooms) {
      expect(JSON.stringify(decorPlan(r))).toBe(JSON.stringify(decorPlan(r)));
      for (const it of decorPlan(r)) expect(Math.cos(it.yaw), `${r.id} ${it.kind}`).toBeGreaterThanOrEqual(-1e-9);
    }
  });
  it("draws every kind, the lights lit", () => {
    for (const kind of DECOR_KINDS) for (const k of [1, 2, 3]) {
      const d = decorSprite(kind, k, {}, { ppm: 32 / 3, r: 1.2 }) as { sp: { m: Uint8Array }; lights: unknown[] };
      expect(d.sp.m.filter(Boolean).length, `${kind} ${k}`).toBeGreaterThan(20);
      if (["lamp", "candles", "lantern", "mushrooms", "neon", "shelf", "crates"].includes(kind)) expect(d.lights.length, `${kind}: lit`).toBeGreaterThan(0);
    }
  });
});
