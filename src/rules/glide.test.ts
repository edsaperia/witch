// A glider's roam (the flying squirrel, Ed 2026-10-12: "its movement should glide between trees"; config/movement.json
// profiles.flyingsquirrel.glide, rules/creatures.ts stepCreature): a far enough spot it sails to, through the air, landing on it.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { makeCreature, stepCreature } from "./creatures";
import { glideOf } from "./movement";
import { rng } from "./random";
import { TUNING } from "./tuning";
import { smallWorldTuning } from "../test/worlds";

describe("a glider's roam", () => {
  it("glides to its far spots (held still through its pause, then sailing there), and only gliders do", () => {
    const G = glideOf("flyingsquirrel")!;
    expect(G.min).toBeGreaterThan(0);
    expect(glideOf("squirrel")).toBeUndefined();
    const map = generateMap(7, smallWorldTuning(TUNING, "One creature glides within one cell; distant areas cannot affect its movement.")), cell = map.cells[0];
    const c = makeCreature(map, cell as [number, number], 1, 1, rng(3));
    c.species = "flyingsquirrel";
    let glides = 0, landed = 0, time = 0, wasAir = false;
    for (let i = 0; i < 60 * 120; i++, time += 1 / 60) {
      const x0 = c.x, z0 = c.z;
      stepCreature(c, 1 / 60, map, time);
      const air = !!c.leap && time >= c.leap.at;
      if (air && !wasAir) glides++;
      if (!c.leap && wasAir) { landed++; expect(Math.hypot(c.x - c.tx, c.z - c.tz)).toBeLessThan(0.01); }
      if (air) { expect(c.moving).toBe(false); expect(Math.hypot(c.x - x0, c.z - z0)).toBeLessThanOrEqual(G.speed / 60 + 1e-6); }
      wasAir = air;
    }
    expect(glides).toBeGreaterThan(2);
    expect(landed).toBeGreaterThan(1);
  });
});
