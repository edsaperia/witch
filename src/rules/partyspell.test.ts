// The party spell (Ed, 2026-10-06: "there is a button on the screen that says "CAST THE PARTY SPELL", when you press it,
// the witch does a spellcasting animation, the pulse appears ... and you can start moving around"): before it, she can't
// move and neither the game clock nor the boot-up runs; the press starts both, and she moves once the cast is done and her
// needle-drop routine at the decks with it (Ed, 2026-10-07: "She IS held at the decks until it ends"; rules/djSet.ts).
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP } from "./game";
import { PARTY_CAST } from "./party";
import { clockSeconds, pointerShown } from "./leypulse";
import { djIntroEnd } from "./djSet";

const run = (g: ReturnType<typeof newGame>, secs: number, c: object = {}) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c } as Parameters<typeof stepGame>[1], STEP); };

describe("the party spell", () => {
  it("holds everything until it's cast: she doesn't move or rise, the clock and the boot don't run", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; g.clock.paused = false;
    const x0 = g.witch.x, z0 = g.witch.z, bootLeft0 = g.party.bootUntil - g.clock.time;
    run(g, 3, { moveX: 1, moveZ: 0.5, fire: true, dash: true });
    run(g, 0.5, { toggleMode: true });
    expect(g.witch.x).toBeCloseTo(x0, 6); expect(g.witch.z).toBeCloseTo(z0, 6);
    expect(g.witch.seated).toBe(true); expect(g.witch.mode).toBe("ground");
    expect(clockSeconds(g.party, g.clock.time)).toBe(0);
    expect(g.party.bootUntil - g.clock.time).toBeCloseTo(bootLeft0, 3);
    expect(pointerShown(g.party, g.map, g.clock.time)).toBe(0);
  });
  it("starts the clock and the boot when pressed, and lets her move once the cast and her routine are done", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; g.clock.paused = false;
    run(g, 2);
    const x0 = g.witch.x;
    run(g, STEP, { castParty: true });
    const at = g.party.spellAt!;
    expect(typeof at).toBe("number");
    expect(g.party.bootFrom).toBeUndefined(); // (the boot sets off when she leaves her decks: Ed, 2026-10-06)
    // casting: still at the decks
    run(g, PARTY_CAST * 0.8, { moveX: 1 });
    expect(g.witch.x).toBeCloseTo(x0, 6);
    expect(clockSeconds(g.party, g.clock.time)).toBeGreaterThan(PARTY_CAST * 0.7);
    // the cast done, her needle-drop routine: still at the decks till it ends
    const end = djIntroEnd(g)!;
    expect(end).toBeGreaterThan(at + PARTY_CAST);
    run(g, end - g.clock.time - 0.1, { moveX: 1 });
    expect(g.witch.x).toBeCloseTo(x0, 6); expect(g.witch.seated).toBe(true);
    // done: off she goes, the clock still counting, the boot counting down
    run(g, 1.1, { moveX: 1 });
    expect(g.witch.x).toBeGreaterThan(x0 + 1);
    expect(g.witch.seated).toBeFalsy();
    expect(clockSeconds(g.party, g.clock.time)).toBeGreaterThan(end - at + 0.9);
    // off her decks: the first stone turns boot.firstAfter later, the boot's minutes from it
    const from = g.party.bootFrom!;
    expect(from).toBeGreaterThanOrEqual(end - 2 * STEP); expect(from).toBeLessThan(end + 0.1);
    expect(g.party.bootUntil).toBeCloseTo(from + TUNING.boot.firstAfter + TUNING.boot.time, 5);
    expect(g.party.nextAt - g.party.bootUntil).toBeCloseTo(TUNING.party.startDelay + TUNING.party.interval, 5);
    // a second press does nothing
    run(g, STEP, { castParty: true });
    expect(g.party.spellAt).toBe(at);
  });
  it("is cast by her spell key too, which then isn't the boost", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; g.clock.paused = false;
    run(g, 1);
    run(g, STEP, { spell: true });
    expect(typeof g.party.spellAt).toBe("number");
    expect(g.spells.activeUntil).toBeLessThanOrEqual(g.clock.time);
  });
  it("leaves a game without it (the tools, the tests) as before: she moves at once", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    expect(g.party.spellAt).toBeUndefined();
    const x0 = g.witch.x;
    run(g, 1, { moveX: 1 });
    expect(g.witch.x).toBeGreaterThan(x0 + 1);
  });
});
