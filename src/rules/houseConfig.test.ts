// The house a file a room (housekeeping, Ed 2026-10-23; rules/houseConfig.ts, config/house/): the same for the game and the tools, and
// whole: the oak's layout (Ed, 2026-10-24, v4), its rooms and limbs, and the outline the crown's builder reads, up to date.
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { HOUSE_CONFIG } from "./houseConfig";
import { houseFiles, loadHouse } from "../../config/house/load.mjs";
import { roomPlaces } from "../../config/house/assemble.js";
import { inRoom } from "../../config/house/shape.js";
import { houseOutline, houseWalk } from "../../config/house/outline.js";

type House = { rooms: { id: string }[]; corridors: { id: string }[]; objects: { id: string; room: string }[] } & Record<string, unknown>;
const H = HOUSE_CONFIG as House;

describe("the house, a file a room (config/house/)", () => {
  it("is the same for the game (each room imported by name) and the tools (every room file on disk): no room file left out", () => expect(loadHouse()).toEqual(H));
  it("has every room in its own file, named by its id, every object's id once, each branch room off a trunk room", () => {
    const dir = new URL("../../config/house/rooms/", import.meta.url), files = readdirSync(dir).filter(f => f.endsWith(".json"));
    const rooms = files.map(f => [f, JSON.parse(readFileSync(new URL(f, dir), "utf8"))] as const);
    for (const [f, r] of rooms) expect(f, "named by its id").toBe(`${r.id}.json`);
    const trunk = new Set(rooms.filter(([, r]) => r.trunk).map(([, r]) => r.id));
    for (const [, r] of rooms) if (!r.trunk) expect(trunk.has(r.from), `${r.id}: off a trunk room`).toBe(true);
    expect(new Set(rooms.map(([, r]) => r.order)).size, "orders all different").toBe(rooms.length);
    const ids = H.objects.map(o => o.id);
    expect(new Set(ids).size, "object ids unique").toBe(ids.length);
  });
  it("is the oak (the layout v4, Ed 2026-10-24): six rooms up the trunk, a pair of branch rooms off each of the first four, the last pair locked; the walk from her bed to the take-off about 93 m", () => {
    const { base, rooms: files } = houseFiles(), P = roomPlaces(base, files) as Record<string, { id: string; parent?: string; trunk: boolean; x: number; z: number; r: number }>;
    const H2 = H as unknown as { rooms: { id: string; trunk?: boolean; from?: string; locked?: boolean }[]; corridors: { id: string; pts: [number, number][] }[]; objects: { id: string; room: string; x: number; z: number }[]; shape: unknown };
    expect(H2.rooms.filter(r => r.trunk).map(r => r.id)).toEqual(["dining", "terrace", "parlour", "boudoir", "bedroom", "turret"]);
    const pairs = Object.fromEntries(["dining", "terrace", "parlour", "boudoir"].map(t => [t, H2.rooms.filter(r => r.from === t).map(r => r.id).sort()]));
    expect(pairs).toEqual({ dining: ["kitchen", "workshop"], terrace: ["cloakroom", "studio"], parlour: ["bestiary", "solarium"], boudoir: ["bedroom2", "bedroom3"] });
    expect(H2.rooms.filter(r => r.locked).map(r => r.id).sort()).toEqual(["bedroom2", "bedroom3"]);
    for (const gone of ["atrium", "drawingRoom", "study", "crowsNest", "curtains", "crystalBall"]) expect(H2.rooms.some(r => r.id === gone) || H2.objects.some(o => o.id === gone), gone).toBe(false);
    // every object's middle on its own room's floor (a locked room's door on its rim; tools/house/organic.mjs checks the corners)
    for (const o of H2.objects) {
      const door = o.id.endsWith("Door") ? o.id.slice(0, -4) : null, d = inRoom(H2.shape, door ?? o.room, o.x, o.z);
      if (door) expect(Math.abs(d), `${o.id}: at ${door}'s rim`).toBeLessThan(0.6);
      else expect(d, `${o.id}: in ${o.room}`).toBeLessThan(0);
    }
    // the limbs: the trunk's between its rooms in order, each branch from its trunk room into its room (or to its door)
    for (const c of H2.corridors) {
      const [from, to] = c.id.split("-"), s = c.pts[0], e = c.pts[c.pts.length - 1], room = H2.rooms.find(r => r.id === to)!;
      expect(room.trunk ? H2.rooms[H2.rooms.indexOf(room) - 1].id : room.from, `${c.id}: from the room below it, or its trunk room`).toBe(from);
      expect(inRoom(H2.shape, from, s[0], s[1]), `${c.id}: starts on ${from}'s floor`).toBeLessThan(0);
      if (room.locked) expect(Math.abs(inRoom(H2.shape, to, e[0], e[1])), `${c.id}: ends at ${to}'s door`).toBeLessThan(0.1);
      else expect(inRoom(H2.shape, to, e[0], e[1]), `${c.id}: ends on ${to}'s floor`).toBeLessThan(0);
    }
    const L = Object.values(P);
    for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
      const a = L[i], b = L[j];
      expect(Math.hypot(a.x - b.x, a.z - b.z) - a.r - b.r, `${a.id} and ${b.id} crowd`).toBeGreaterThanOrEqual(3);
    }
    expect(Math.round(houseWalk(H as never).toTakeoff), "bed to take-off along the trunk (m; the mock's 93)").toBe(93);
  });
  it("its outline for the crown's builder (config/house/outline.json) is up to date: node tools/house/organic.mjs --outline", () => {
    const f = JSON.parse(readFileSync(new URL("../../config/house/outline.json", import.meta.url), "utf8"));
    expect(f).toEqual(JSON.parse(JSON.stringify(houseOutline(H as never))));
  });
});
