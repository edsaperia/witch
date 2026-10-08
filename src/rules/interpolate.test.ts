// What's drawn between two fixed steps (Ed's playtest, 2026-10-06: "it feels low"): interpolated()
// eases the witches, creatures and camera between the last two steps, and carries 💌s and shots
// back along their flight to the moment drawn, so on a display faster than the steps nothing holds
// still every other frame; then puts the simulated state back exactly.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { STEP, interpolated, newGame } from "./game";
import type { Letter } from "./invites";

describe("drawing between steps", () => {
  it("draws a 💌 and a shot where they were at the moment drawn, and puts them back", () => {
    const g = newGame(321, TUNING);
    g.clock.paused = false;
    const L = { n: 1, x: 10, z: 20, vx: 30, vz: -12, flown: 6, at: 0, r: 0.5, range: 22, pierce: 0, bounce: 0, split: false, home: false, hit: [] } as unknown as Letter;
    g.witches[0].invites.letters.push(L);
    const shot = { id: 1, x: 5, z: 5, vx: -20, vz: 0, until: 9, from: 0, side: "wild", species: "wolf", damage: 1, radius: 1, attack: "bite" } as unknown as (typeof g.combat.shots)[number];
    g.combat.shots.push(shot);
    const lob = { id: 2, x: 0, z: 0, vx: 0, vz: 0, until: 9, from: 0, side: "wild", species: "wolf", damage: 1, radius: 1, attack: "lob", lob: { fx: 0, fz: 0, tx: 10, tz: 0, at: 0, lands: 1 } } as unknown as (typeof g.combat.shots)[number];
    g.combat.shots.push(lob);
    g.prev.witches = g.witches.map(w => ({ x: w.body.x, z: w.body.z, lift: w.body.lift }));
    g.prev.creatures = new Float64Array(g.creatures.length * 2);
    g.creatures.forEach((c, i) => { g.prev.creatures[2 * i] = c.x; g.prev.creatures[2 * i + 1] = c.z; });
    g.clock.time = 0.5; g.alpha = 0.25;
    const back = 0.75 * STEP;
    const seen = interpolated(g, () => ({ lx: L.x, lz: L.z, flown: L.flown, sx: shot.x, bx: lob.x }));
    expect(seen.lx).toBeCloseTo(10 - 30 * back, 9);
    expect(seen.lz).toBeCloseTo(20 + 12 * back, 9);
    expect(seen.flown).toBeCloseTo(6 - Math.hypot(30, 12) * back, 9);
    expect(seen.sx).toBeCloseTo(5 + 20 * back, 9);
    expect(seen.bx).toBeCloseTo(10 * (0.5 - back), 9); // (the lob along its arc at the moment drawn)
    expect([L.x, L.z, L.flown, shot.x, lob.x]).toEqual([10, 20, 6, 5, 0]);
  });
});
