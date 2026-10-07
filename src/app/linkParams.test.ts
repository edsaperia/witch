// The world's shape and the fight's knobs come from the link alone (2026-10-07: a 14 x 14 map left in Ed's browser by the
// debug overlay gave every PR build 196 areas, 1,909 creatures and 98 legends, and threw off each playtest's balance).
import { afterEach, describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { FORGOTTEN_KEYS, tuningFromLink, worldFromLink } from "./linkParams";

/** A browser's localStorage, as Ed's was: the world and the fight remembered from an earlier load. */
function fakeStorage(items: Record<string, string>) {
  const m = new Map(Object.entries(items)), writes: string[] = [];
  return { m, writes, store: { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { writes.push(k); m.set(k, v); }, removeItem: (k: string) => { m.delete(k); }, clear: () => m.clear(), key: () => null, length: 0 } };
}
const g = globalThis as { localStorage?: unknown };
const before = g.localStorage;
afterEach(() => { g.localStorage = before; });

describe("the link's world (src/app/linkParams.ts)", () => {
  it("ignores and deletes a remembered world and fight, and writes none back", () => {
    const f = fakeStorage({ "witch.world": JSON.stringify({ areaSize: 300, treetopSpeed: 200, mapAreas: 14 }), "witch.fight": JSON.stringify({ scale: 2, speed: 2, momentum: 2 }), "witch.volume": "0.4" });
    g.localStorage = f.store;
    const { tuning, world } = tuningFromLink(new URLSearchParams());
    expect(world.mapAreas).toBe(TUNING.mapAreas);
    expect(tuning.mapAreas).toBe(TUNING.mapAreas);
    expect(tuning.map?.radius).toBe(TUNING.map?.radius);
    expect(tuning.areaScale).toBeCloseTo(TUNING.areaScale, 9);
    expect(tuning.treetopSpeed).toBe(TUNING.treetopSpeed);
    for (const k of FORGOTTEN_KEYS) expect(f.m.has(k), k).toBe(false);
    expect(f.writes).toEqual([]);
    expect(f.m.get("witch.volume")).toBe("0.4"); // (a per-viewer convenience that doesn't change the rules stays)
  });
  it("takes the world from the link alone, for that load only", () => {
    const f = fakeStorage({});
    g.localStorage = f.store;
    const { tuning } = tuningFromLink(new URLSearchParams("mapAreas=14&treetopSpeed=90"));
    expect(tuning.mapAreas).toBe(14);
    expect(tuning.map?.radius).toBeCloseTo(14 / Math.sqrt(Math.PI), 9);
    expect(tuning.treetopSpeed).toBe(90);
    expect(f.writes).toEqual([]);
    expect(tuningFromLink(new URLSearchParams()).tuning.mapAreas).toBe(TUNING.mapAreas); // (the next load, without it, is the default)
  });
  it("clamps the link's values", () => {
    const w = worldFromLink(new URLSearchParams("mapAreas=99&areaSize=5&treetopSpeed=1"));
    expect(w).toEqual({ mapAreas: 30, areaSize: 56, treetopSpeed: 8 });
  });
});
