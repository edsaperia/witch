import { describe, expect, it } from "vitest";
import { parseArena, setupArena } from "./arena";
import { newGame, stepGame, STEP, type Controls } from "./game";
import { TUNING } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

describe("the debug arena (Stage 5)", () => {
  it("reads groups, counts and levels", () => {
    expect(parseArena("wolf*4@2, beetle*3,bad?,owl")).toEqual([{ species: "wolf", count: 4, level: 2 }, { species: "beetle", count: 3, level: 1 }, { species: "owl", count: 3, level: 1 }]);
  });

  it("puts hers, parked, against the wild in the home clearing, and they fight", () => {
    const g = newGame(5, TUNING);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "wolf*4,raven*3");
    const ids = g.arena!.ids, hers = ids.filter(id => g.creatures[id].leashed), wild = ids.filter(id => !g.creatures[id].leashed);
    expect(hers.length).toBe(4); expect(wild.length).toBe(3);
    expect(g.leash.placed.length).toBe(4);
    for (let i = 0; i < 15 / STEP; i++) stepGame(g, idle, STEP);
    const hurt = ids.filter(id => { const c = g.creatures[id]; return c.hp !== undefined || c.fleeUntil || c.gone; });
    expect(hurt.length).toBeGreaterThan(0);
    // Again: the last lot go, a fresh lot comes.
    setupArena(g, "wolf*4,raven*3");
    for (const id of ids) expect(g.creatures[id].gone).toBe(true);
    expect(g.leash.placed.length).toBe(4);
  }, 60000);
});
