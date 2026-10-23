// The house a file a room (housekeeping, Ed 2026-10-23; rules/houseConfig.ts, config/house/): put together, it's the house
// config/house.json held before the split, room for room, branch for branch, object for object; and the files are whole.
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { HOUSE_CONFIG } from "./houseConfig";
import { loadHouse } from "../../config/house/load.mjs";

type House = { rooms: { id: string }[]; corridors: { id: string }[]; objects: { id: string; room: string }[] } & Record<string, unknown>;
const H = HOUSE_CONFIG as House;
const byId = <T extends { id: string }>(xs: T[]) => Object.fromEntries(xs.map(x => [x.id, x]));

describe("the house, a file a room (config/house/)", () => {
  it("builds the house config/house.json held before the split: the same rooms and branches in the same order, the same objects, the same numbers", () => {
    // (the house as it was at the split, written by the old tools/house/organic.mjs. A change to the house on purpose changes this:
    // refresh it with `node tools/house/organic.mjs --write src/rules/__fixtures__/house-before-split.json`, or drop this test once the
    // split has settled)
    const before = JSON.parse(readFileSync(new URL("./__fixtures__/house-before-split.json", import.meta.url), "utf8")) as House;
    const { rooms, corridors, objects, _: note, ...rest } = H, { rooms: r0, corridors: c0, objects: o0, _: note0, ...rest0 } = before; // (its note, `_`, rewritten for the split)
    expect(rest).toEqual(rest0);
    expect(rooms).toEqual(r0);
    expect(corridors).toEqual(c0);
    expect(byId(objects)).toEqual(byId(o0)); // (now room by room: the order's not used, but for exact ties)
    expect(objects.length).toBe(o0.length);
  });
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
});
