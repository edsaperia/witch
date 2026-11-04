// A glider's roam (the flying squirrel, Ed 2026-10-12: "its movement should glide between trees"; config/movement.json
// profiles.flyingsquirrel.glide, rules/creatures.ts stepCreature): a far enough spot it sails to, through the air, landing on it.
import { describe, expect, it } from "vitest";
import type { ForestMap } from "./map";
import { stepCreature, type Creature } from "./creatures";
import { glideOf } from "./movement";
import { TUNING } from "./tuning";

describe("a glider's roam", () => {
  it("holds a supplied glide through its pause, respects its speed and lands at its target; only gliders have profiles", () => {
    const G = glideOf("flyingsquirrel")!;
    expect(G.min).toBeGreaterThan(0);
    expect(glideOf("squirrel")).toBeUndefined();
    const map = { tuning: TUNING, cellSafe: () => ({ cell: [0, 0], safe: 0 }) } as unknown as ForestMap;
    const c = { id: 1, species: "flyingsquirrel", cell: [0, 0], level: 1, x: 0, z: 0, tx: G.speed, tz: 0, walk: 0, facing: 1, rand: () => 0.5,
      leap: { fx: 0, fz: 0, tx: G.speed, tz: 0, at: 2, lands: 3, height: G.height } } as Creature;
    stepCreature(c, 1 / 60, map, 2 - 1 / 60);
    expect([c.x, c.z]).toEqual([0, 0]); expect(c.moving).toBe(false);
    stepCreature(c, 1 / 60, map, 2);
    const start = [c.x, c.z]; stepCreature(c, 1 / 60, map, 2 + 1 / 60);
    expect(c.moving).toBe(false);
    expect(Math.hypot(c.x - start[0], c.z - start[1])).toBeLessThanOrEqual(G.speed / 60 + 1e-6);
    stepCreature(c, 1 / 60, map, 3);
    expect(c.leap).toBeUndefined(); expect([c.x, c.z]).toEqual([G.speed, 0]);
    expect(Math.hypot(c.x - c.tx, c.z - c.tz)).toBeLessThan(0.01);
    // C1 reports the original seed7/rng3/120s glides and landings, rather than requiring their occurrence.
  });
});
