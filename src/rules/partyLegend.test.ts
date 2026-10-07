// The party-legend Easter egg (Ed, 2026-10-06; rules/partyLegend.ts): only a happy legend takes 💌s, 100 of them, draining
// slowly; full, it's a party legend (its buff kept, fighting no one, its rune at its feet); picked up, it never comes to
// her and she can't go a step past legends.partyReach of it, on the ground, over the treetops or by a blink; put down,
// it's let go where it stands and she's free; knocked out, it's let go too.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "./tuning";
import { affectionOf, hitWitch, newGame, stepGame, type Game } from "./game";
import { hasRune, stateOf } from "./creatureStates";
import { targetable } from "./combat";
import type { Creature } from "./creatures";

const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const E = TUNING.legends;

function game(t = TUNING): { g: Game; L: Creature } {
  const g = newGame(123, t);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.clearedAt = Infinity; // (no area clears: this empties areas by hand; rules/clear.ts)
  const L = g.creatures.find(c => c.boss)!;
  for (const c of g.creatures) if (!c.boss && Math.hypot(c.x - L.x, c.z - L.z) < 60) c.gone = true; // (no wild crowd round it to jostle her)
  g.byArea = null;
  g.witch = { ...g.witch, x: L.x + 4, z: L.z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 };
  return { g, L };
}
const fill = (g: Game, L: Creature, n: number) => { const A = affectionOf(g); for (let i = 0; i < n; i++) A.hit(L, TUNING.invites.amount, g.clock.time); };
const press = (g: Game) => { stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60); };
/** s seconds of steps holding c; she shrugs off the wild's hits meanwhile (a knockout would let the legend go: tested below). */
const run = (g: Game, s: number, c: Partial<typeof C> & Record<string, unknown> = {}) => { for (let i = 0; i < s * 60; i++) { g.witches[0].health.hp = 99; stepGame(g, { ...C, ...c }, 1 / 60); } };
/** A party legend leashed to her, she beside it. */
function leashed(): { g: Game; L: Creature } {
  const { g, L } = game();
  L.legendState = "happy"; L.buffed = true;
  fill(g, L, E.partyHits);
  g.witch = { ...g.witch, x: L.x + 1, z: L.z };
  press(g);
  expect(L.leashed).toBe(true);
  return { g, L };
}

describe("the party legend (Easter egg)", () => {
  it("only a happy legend takes 💌s: asleep, restless and angry ones block them, and with the egg off a happy one does too", () => {
    const { g, L } = game(), A = affectionOf(g);
    for (const s of ["asleep", "restless", "angry"] as const) { L.legendState = s; expect(A.invitable(L)).toBe(false); expect(A.blocksLetters(L)).toBe(true); }
    L.legendState = "happy";
    expect(A.invitable(L)).toBe(true);
    expect(A.blocksLetters(L)).toBe(false);
    const off = game(withTuning({ legends: { ...E, partyEgg: false } }));
    off.L.legendState = "happy";
    expect(affectionOf(off.g).invitable(off.L)).toBe(false);
  });

  it("takes partyHits 💌s (99 aren't enough), draining slowly; the 100th makes it a party legend, buff kept, its rune at its feet", () => {
    const { g, L } = game(), A = affectionOf(g);
    L.legendState = "happy"; L.buffed = true;
    fill(g, L, E.partyHits - 1);
    expect(L.partyLegend).toBeFalsy();
    expect(A.affection(L)).toBeCloseTo((E.partyHits - 1) / E.partyHits, 5);
    run(g, 10);
    expect(A.affection(L)!).toBeGreaterThan(0.85); // (slow: a common meter would be empty by now)
    for (let i = 0; i < E.partyHits && !L.partyLegend; i++) fill(g, L, 1); // (topped up past what drained)
    expect(L.partyLegend).toBe(true);
    expect(L.buffed).toBe(true);
    expect(stateOf(L)).toBe("happy");
    expect(hasRune(L, g.clock.time)).toBe(true);
    expect(targetable(L)).toBe(false); // (out of every fight)
    expect(A.invitable(L)).toBe(false);
  });

  it("picked up, it never comes to her, and she can't go a step past partyReach of it: on foot, over the treetops, or by a blink", () => {
    const { g, L } = leashed(), at = { x: L.x, z: L.z }, d = () => Math.hypot(g.witch.x - L.x, g.witch.z - L.z);
    run(g, 4, { moveX: 1 });
    expect(d()).toBeLessThanOrEqual(E.partyReach + 1e-6);
    expect(d()).toBeGreaterThan(E.partyReach - 0.5); // (right at the edge)
    expect(g.witches[0].pinned?.id).toBe(L.id);
    expect(Math.hypot(L.x - at.x, L.z - at.z)).toBeLessThan(1.5); // (it stayed where it was: jostled by the crowd at most)
    stepGame(g, { ...C, toggleMode: true }, 1 / 60);
    run(g, 6, { moveX: -1, moveZ: 1 });
    expect(d()).toBeLessThanOrEqual(E.partyReach + 1e-6);
    run(g, 2, { toggleMode: false });
    stepGame(g, { ...C, toggleMode: true }, 1 / 60); run(g, 3);
    for (let i = 0; i < 5; i++) { stepGame(g, { ...C, moveX: 1, dash: true, aimX: 30, aimZ: 0 }, 1 / 60); run(g, 1.2, { moveX: 1 }); }
    expect(d()).toBeLessThanOrEqual(E.partyReach + 1e-6);
    // Moving back in, she's free of the edge.
    run(g, 0.3, { moveX: L.x < g.witch.x ? -1 : 1 });
    expect(g.witches[0].pinned ?? null).toBeNull();
  });

  it("put down (E), it's let go where it stands, dancing, and she's free", () => {
    const { g, L } = leashed(), at = { x: L.x, z: L.z };
    g.witch = { ...g.witch, x: L.x + 3, z: L.z };
    press(g);
    expect(L.leashed).toBe(false);
    expect(L.partyLegend).toBe(true);
    expect(g.leash.stack).not.toContain(L.id);
    expect(g.leash.placed.some(p => p.id === L.id)).toBe(false);
    run(g, 4, { moveX: 1 });
    expect(Math.hypot(g.witch.x - L.x, g.witch.z - L.z)).toBeGreaterThan(E.partyReach + 5);
    run(g, 5); // (and it stays put, long after: not moved on as if it had been out of sight)
    expect(Math.hypot(L.x - at.x, L.z - at.z)).toBeLessThan(1.5); // (jostled by the crowd at most)
    expect(hasRune(L, g.clock.time)).toBe(true); // (to be picked up again)
  });

  it("knocked out, she lets it go where it stands", () => {
    const { g, L } = leashed(), W = g.witches[0];
    for (let i = 0; i < 50 && !W.ko; i++) hitWitch(g, 0, g.clock.time + i * (TUNING.witchHealth.grace + 0.05));
    for (let i = 0; i < 60 * 60 && W.ko; i++) stepGame(g, C, 1 / 60);
    expect(L.leashed).toBe(false);
    expect(L.partyLegend).toBe(true);
    expect(Math.hypot(g.witch.x - L.x, g.witch.z - L.z)).toBeGreaterThan(E.partyReach); // (home: free)
  }, 60000);
});
