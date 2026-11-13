// The challenge circle hidden till the party starts (Ed, 2026-11-12: "the challenge circle should be hidden before the party starts;
// there are just normal trees, no sign of it - fades into existence and the trees fade away when the party starts. The same happens in
// reverse when the party is over if the challenge circle has not been won yet."; rules/challenge.ts stepReveal, challenge.hide).
import { describe, expect, it } from "vitest";
import { stepGame, type Controls, type Game } from "./game";
import { TUNING, type Tuning } from "./tuning";
import { challengeRevealed, challengeWanted, clearChallenge, revealK } from "./challenge";
import { endParty } from "./partyOver";
import { preppedGame } from "../test/preppedGame";

const islandOf = (kind: string, t: Tuning = TUNING): Tuning => ({ ...t, map: { ...t.map!, island: kind, islandAreas: 10 } });
const hideOff = (t: Tuning): Tuning => ({ ...t, challenge: { ...t.challenge!, hide: { ...t.challenge!.hide!, on: false } } });
const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const STEP = 1 / 60, FADE = TUNING.challenge!.hide!.fade;
const run = (g: Game, secs: number) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, still, STEP); };

/** A night waiting for her party spell (the world asleep), her up over home. */
function waiting(t: Tuning = TUNING, seed = 2): Game {
  const g = preppedGame(seed, islandOf("fox", t));
  g.clock.paused = false; g.party.spellAt = null; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  run(g, 0.1);
  return g;
}
/** The party spell cast now (rules/partyOver.ts stepWorldAsleep wakes the world on it). */
const cast = (g: Game) => { g.party.spellAt = g.clock.time; };
/** Witch 0 on foot in the circle's middle. */
function onFloor(g: Game): void {
  const ch = g.challenge!, W = g.witches[0];
  W.body = { ...W.body, x: ch.x, z: ch.z, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
}

describe("hidden before the party starts", () => {
  it("is hidden, and stepping onto its floor wakes nothing", () => {
    const g = waiting();
    expect(TUNING.challenge!.hide!.on).toBe(true);
    expect(g.challenge!.reveal).toMatchObject({ shown: false, at: null });
    expect(revealK(g)).toBe(0);
    expect(challengeRevealed(g)).toBe(false);
    onFloor(g); run(g, 2);
    expect(g.challenge!.statues!.phase).toBe("stone");
  });

  it("has normal forest on its floor in the forest's data, marked as its own (and none with the hiding off)", () => {
    const g = waiting(), ch = g.challenge!;
    const inside = g.forest.treesNear(ch.x, ch.z, ch.radius).filter(p => Math.hypot(p.x - ch.x, p.z - ch.z) < ch.radius * 0.9);
    expect(inside.length).toBeGreaterThan(20);
    expect(inside.every(p => p.veil)).toBe(true);
    expect(g.forest.bushesNear(ch.x, ch.z, ch.radius).some(p => p.veil && Math.hypot(p.x - ch.x, p.z - ch.z) < ch.radius * 0.9)).toBe(true);
    const o = waiting(hideOff(TUNING)), oc = o.challenge!;
    expect(o.forest.treesNear(oc.x, oc.z, oc.radius).filter(p => Math.hypot(p.x - oc.x, p.z - oc.z) < oc.radius * 0.9)).toEqual([]);
    expect(o.forest.treesNear(oc.x, oc.z, oc.radius * 3).some(p => p.veil)).toBe(false);
    // (the forest outside its floor the same either way)
    const out = (h: Game) => h.forest.treesNear(ch.x, ch.z, ch.radius * 3).filter(p => !p.veil).map(p => `${p.x},${p.z},${p.type},${p.variant}`).sort();
    expect(out(g)).toEqual(out(o));
  });
});

describe("revealed as the party starts", () => {
  it("fades in over hide.fade seconds, can't be entered till it's whole, then wakes as ever", () => {
    const g = waiting();
    onFloor(g); cast(g); run(g, FADE / 2);
    expect(g.challenge!.reveal!.shown).toBe(true);
    expect(revealK(g)).toBeGreaterThan(0.3);
    expect(revealK(g)).toBeLessThan(0.7);
    expect(challengeRevealed(g)).toBe(false);
    expect(g.challenge!.statues!.phase).toBe("stone"); // (stood on it as it fades in: nothing)
    run(g, FADE / 2 + 0.2);
    expect(revealK(g)).toBe(1);
    expect(challengeRevealed(g)).toBe(true);
    expect(g.challenge!.statues!.phase).toBe("waking");
  });

  it("is there from the start on a night that never waited, with no fade", () => {
    const g = preppedGame(2, islandOf("fox"));
    g.clock.paused = false; g.party.spellAt = undefined;
    run(g, 0.05);
    expect(g.challenge!.reveal).toMatchObject({ shown: true, at: null });
    expect(revealK(g)).toBe(1);
  });
});

describe("after the party's over", () => {
  it("fades out again after a lost night, uncleared", () => {
    const g = waiting();
    cast(g); run(g, FADE + 0.5);
    expect(revealK(g)).toBe(1);
    endParty(g); run(g, 0.1);
    expect(challengeWanted(g)).toBe(false);
    expect(g.challenge!.reveal!.shown).toBe(false);
    expect(revealK(g)).toBeGreaterThan(0.8);
    run(g, FADE);
    expect(revealK(g)).toBe(0);
    expect(challengeRevealed(g)).toBe(false);
  });

  it("stays as it is when it was won", () => {
    const g = waiting();
    cast(g); run(g, FADE + 0.5);
    clearChallenge(g); run(g, 0.1);
    endParty(g); run(g, FADE + 0.5);
    expect(g.challenge!.reveal!.shown).toBe(true);
    expect(revealK(g)).toBe(1);
  });
});

describe("?challengehide=0 (the hiding off)", () => {
  it("is there before the party, as before", () => {
    const g = waiting(hideOff(TUNING));
    expect(g.challenge!.reveal).toBeUndefined();
    expect(revealK(g)).toBe(1);
    expect(challengeRevealed(g)).toBe(true);
  });
});
