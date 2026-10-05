import { describe, expect, it } from "vitest";
import { moodOf, nearestSeen, newMemory, stepMemory } from "./memory";
import type { Creature } from "./creatures";
import type { ForestMap } from "./map";

// A 100 m grid of areas: area (i, j) covers [100i, 100i + 100) × [100j, 100j + 100), its site in the middle.
const map = {
  cellSafe: (x: number, z: number) => ({ cell: [Math.floor(x / 100), Math.floor(z / 100)], safe: 1 }),
  siteOf: (i: number, j: number) => ({ x: i * 100 + 50, z: j * 100 + 50 }),
} as unknown as ForestMap;
const make = (o: Partial<Creature>): Creature => ({ id: 0, species: "fox", level: 1, cell: [0, 0], leashed: false, ...o }) as Creature;

describe("area memory", () => {
  const foxes = [make({ id: 1 }), make({ id: 2, enraged: true }), make({ id: 3, species: "owl", friendly: true }), make({ id: 4, leashed: true }), make({ id: 5, boss: true, species: "bear" })];
  const inArea = (k: string) => (k === "0,0" ? foxes : k === "3,0" ? [make({ id: 9, species: "owl", cell: [3, 0] })] : []);

  it("remembers what she sees on the ground: species by mood, not the legend or a party animal", () => {
    const m = newMemory();
    stepMemory(m, true, 50, 50, map, inArea, 10);
    expect(m.areas.get("0,0")?.seen).toEqual([
      { species: "fox", wild: 1, happy: 0, enraged: 1 },
      { species: "owl", wild: 0, happy: 1, enraged: 0 },
    ]);
    expect(moodOf(foxes[0])).toBe("wild");
  });

  it("learns nothing from the treetops, and keeps the snapshot of her last visit once she's gone", () => {
    const m = newMemory();
    stepMemory(m, false, 350, 50, map, inArea, 10);
    expect(m.areas.size).toBe(0);
    stepMemory(m, true, 50, 50, map, inArea, 10);
    foxes[0].enraged = true; // it changes while she's away
    stepMemory(m, false, 50, 50, map, inArea, 20);
    expect(m.areas.get("0,0")!.seen[0]).toEqual({ species: "fox", wild: 1, happy: 0, enraged: 1 });
    foxes[0].enraged = false;
  });

  it("points a dream only at areas where she's seen that species, the nearest first", () => {
    const m = newMemory();
    expect(nearestSeen(m, "owl", 0, 0, map)).toBeNull();
    stepMemory(m, true, 50, 50, map, inArea, 10);
    stepMemory(m, true, 350, 50, map, inArea, 12);
    expect(nearestSeen(m, "owl", 400, 50, map)).toEqual({ key: "3,0", x: 350, z: 50 });
    expect(nearestSeen(m, "owl", 0, 0, map)).toEqual({ key: "0,0", x: 50, z: 50 });
    expect(nearestSeen(m, "badger", 0, 0, map)).toBeNull();
    expect(nearestSeen(m, "owl", 0, 0, map, "0,0")?.key).toBe("3,0");
  });

  it("snapshots at most once a second", () => {
    const m = newMemory();
    stepMemory(m, true, 50, 50, map, inArea, 10);
    stepMemory(m, true, 350, 50, map, inArea, 10.5);
    expect(m.areas.has("3,0")).toBe(false);
  });
});
