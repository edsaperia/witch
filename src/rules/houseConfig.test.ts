// The house a file a room (housekeeping, Ed 2026-10-23; rules/houseConfig.ts, config/house/): the same for the game and the tools, and
// whole. (That the split changed nothing was proved against config/house.json as it was, on #1084's own commits.)
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { HOUSE_CONFIG } from "./houseConfig";
import { houseFiles, loadHouse } from "../../config/house/load.mjs";
import { roomPlaces } from "../../config/house/assemble.js";

type House = { rooms: { id: string }[]; corridors: { id: string }[]; objects: { id: string; room: string }[] } & Record<string, unknown>;
const H = HOUSE_CONFIG as House;

describe("the house, a file a room (config/house/)", () => {
  it("is the same for the game (Vite) and the tools (from disk)", () => expect(loadHouse()).toEqual(H));
  it("has every room in its own file, named by its id, every object's id once, each parent placed before its child", () => {
    const dir = new URL("../../config/house/rooms/", import.meta.url), files = readdirSync(dir).filter(f => f.endsWith(".json"));
    const rooms = files.map(f => [f, JSON.parse(readFileSync(new URL(f, dir), "utf8"))] as const);
    for (const [f, r] of rooms) expect(f, "named by its id").toBe(`${r.id}.json`);
    const order = Object.fromEntries(rooms.map(([, r]) => [r.id, r.order]));
    for (const [, r] of rooms) if (r.parent) expect(order[r.parent], `${r.id}'s parent before it`).toBeLessThan(r.order);
    expect(new Set(Object.values(order)).size, "orders all different").toBe(rooms.length);
    const ids = H.objects.map(o => o.id);
    expect(new Set(ids).size, "object ids unique").toBe(ids.length);
  });
  it("is whole: every room and object id once, every object in its room (a locked room's door at its rim), every branch from its parent's floor into its room's (or to its door), no two rooms crowding, the walk to her bedroom's door about 49 m", () => {
    const { base, rooms: files } = houseFiles(), P = roomPlaces(base, files) as Record<string, { id: string; parent?: string; x: number; z: number; r: number }>, H2 = H as unknown as { rooms: { id: string; r: number; locked?: boolean }[]; corridors: { id: string; pts: [number, number][] }[]; objects: { id: string; room: string; x: number; z: number; w: number; d: number }[] };
    const roomIds = H2.rooms.map(r => r.id);
    expect(new Set(roomIds).size, "room ids unique").toBe(roomIds.length);
    const parentOf = Object.fromEntries(files.map((f: { id: string; parent?: string }) => [f.id, f.parent]));
    for (const o of H2.objects) {
      const p = P[o.room]; expect(p, `${o.id}: its room ${o.room}`).toBeDefined();
      const from = Math.hypot(o.x - p.x, o.z - p.z), door = o.id.endsWith("Door") && H2.rooms.find(r => `${r.id}Door` === o.id);
      if (door) { const L = P[door.id]; expect(Math.abs(Math.hypot(o.x - L.x, o.z - L.z) - L.r), `${o.id}: at its room's rim`).toBeLessThan(0.5); }
      else expect(from + Math.min(o.w, o.d) / 2, `${o.id}: in ${o.room}`).toBeLessThanOrEqual(p.r + 0.6);
    }
    for (const c of H2.corridors) {
      const [from, to] = c.id.split("-"), a = P[from], b = P[to], s = c.pts[0], e = c.pts[c.pts.length - 1], room = H2.rooms.find(r => r.id === to)!;
      expect(parentOf[to], `${c.id}: from its parent`).toBe(from);
      expect(Math.hypot(s[0] - a.x, s[1] - a.z), `${c.id}: starts on ${from}'s floor`).toBeLessThan(a.r);
      if (room.locked) expect(Math.hypot(e[0] - b.x, e[1] - b.z), `${c.id}: ends at ${to}'s door`).toBeGreaterThan(b.r);
      else expect(Math.hypot(e[0] - b.x, e[1] - b.z), `${c.id}: ends on ${to}'s floor`).toBeLessThan(b.r);
    }
    const L = Object.values(P) as { id: string; parent?: string; x: number; z: number; r: number }[];
    for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
      const a = L[i], b = L[j], gap = Math.hypot(a.x - b.x, a.z - b.z) - a.r - b.r;
      expect(gap, `${a.id} and ${b.id} crowd (tools/house/organic.mjs)`).toBeGreaterThanOrEqual(a.parent === b.id || b.parent === a.id ? 1 : 1.4);
    }
    const path = ["terrace", "atrium", "parlour", "boudoir", "bedroom"];
    let walk = -P.bedroom.r; for (let i = 1; i < path.length; i++) walk += Math.hypot(P[path[i]].x - P[path[i - 1]].x, P[path[i]].z - P[path[i - 1]].z);
    expect(Math.round(walk), "the walk from the Terrace's middle to the bedroom's door (m)").toBe(49);
  });
});
