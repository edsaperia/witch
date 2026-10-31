// Beaten creatures sleep on the beach (Ed, 2026-10-28; rules/runaway.ts): a beaten one runs to a spot on the nearest beach and lies
// down asleep there, gone for the rules (out of every fight, not on its area), but there to see; the night lost, the afterparty gets
// it up and it sleeps in its own area like the rest.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Game } from "./game";
import { endParty } from "./partyOver";
import { cellKey } from "./party";
import { targetable } from "./combat";
import { beachOf } from "./mapShape";
import { runAway } from "./orbit";
import { runawaySpot } from "./runaway";
import type { Creature } from "./creatures";

// Keep the seeded full coastline: runaways traverse to distinct beach spots and return to their assigned inland area after a loss.
const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const run = (g: Game, s: number) => { for (let i = 0; i < s / STEP; i++) stepGame(g, C, STEP); };
function game(): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, perch: false };
  return g;
}
/** Beaten, by her: run away (a hostile one stunned, or a friend full of 💧s: rules/orbit.ts), a few metres from her (in the fight, stepped). */
function beat(g: Game, c: Creature, dx: number): void {
  Object.assign(c, { x: g.witch.x + dx, z: g.witch.z + 6, tx: g.witch.x + dx, tz: g.witch.z + 6, leashed: false, state: undefined, asleep: false, dazed: true, dazedUntil: g.clock.time });
  c.cell = g.map.cellSafe(c.x, c.z).cell as [number, number]; // (of her area, its home: stepped in the fight there)
  Object.assign(c, { homeX: c.x, homeZ: c.z, anchorX: c.x, anchorZ: c.z, safeR: undefined, circle: undefined });
  g.byArea = null;
  c.dazed = false; c.dazedUntil = undefined;
  runAway(c, runawaySpot(g, c), () => ({ x: c.x, z: c.z }));
}
const wild = (g: Game, n: number) => g.creatures.filter(c => !c.boss && !c.gone && c.level > 0 && !c.leashed).slice(0, n);
const inOwnArea = (g: Game, c: Creature) => cellKey(g.map.cellSafe(c.x, c.z).cell) === cellKey(c.cell);

describe("a beaten creature sleeps on the beach (Ed, 2026-10-28)", () => {
  it("runs to the nearest beach and lies down asleep there, apart from the others and the beach witches, gone for the rules", () => {
    const g = game(), [a, b] = wild(g, 2), beach = beachOf(g.map.bounds, g.tuning)!;
    beat(g, a, -2); beat(g, b, 2);
    run(g, 0.1);
    for (const c of [a, b]) { expect(c.fleeUntil).toBe(Infinity); expect(c.beach).toBeTruthy(); }
    for (let i = 0; i < 4000 && !(a.beached && b.beached); i++) run(g, 0.25);
    for (const c of [a, b]) {
      expect(c.beached).toBe(true);
      expect(c.gone).toBe(true); // (as a runaway's always been for the rules: out of every fight, not on its area's roster or clears)
      expect(c.asleep).toBe(true);
      expect(targetable(c)).toBe(false);
      expect([c.x, c.z]).toEqual([c.beach!.x, c.beach!.z]);
      expect(beach.intoSand(c.x, c.z)).toBeGreaterThan(0); // (on the sand)
      expect(beach.intoSea(c.x, c.z)).toBeLessThan(0); // (not in the water)
      for (const w of g.beach ?? []) expect(Math.hypot(w.x - c.x, w.z - c.z)).toBeGreaterThanOrEqual(10);
    }
    expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeGreaterThanOrEqual(3);
    // (the night going on: it sleeps on there, as when the night's won)
    run(g, 5);
    expect(a.beached && a.asleep && a.gone).toBe(true);
    expect([a.x, a.z]).toEqual([a.beach!.x, a.beach!.z]);
  });

  it("the party lost: it's up off the beach and asleep in its own area, with everyone else", () => {
    const g = game(), [a] = wild(g, 1);
    beat(g, a, 0);
    for (let i = 0; i < 4000 && !a.beached; i++) run(g, 0.25);
    expect(a.beached).toBe(true);
    endParty(g);
    expect(a.beached).toBe(false); expect(a.gone).toBe(false); expect(a.beach).toBeUndefined();
    for (let i = 0; i < 4000 && !a.asleep; i++) run(g, 0.25);
    expect(a.asleep).toBe(true);
    expect(inOwnArea(g, a)).toBe(true);
  });
});
