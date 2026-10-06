// Sigil weight, made visible (render/load.ts): nothing for the first few sigils, growing with weight and tension, pulling
// toward the army, "away" only flying away from it, and sinking only over the treetops.
import { describe, expect, it } from "vitest";
import type { Game } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { LOAD_DEFAULT, loadView, newLoadView } from "./load";

function game(levels: number[], at: (i: number) => { x: number; z: number }, witch: Partial<Game["witch"]> = {}): Game {
  const creatures = levels.map((level, i) => ({ id: i, level, ...at(i) }));
  return { tuning: TUNING, witch: { x: 0, z: 0, vx: 0, vz: 0, mode: "ground", ...witch }, leash: { stack: creatures.map(c => c.id) }, creatures } as unknown as Game;
}
const settle = (g: Game, secs = 4) => { const v = newLoadView(); for (let i = 0; i < secs * 60; i++) loadView(g, LOAD_DEFAULT, 1 / 60, v); return v; };

describe("sigil weight's look", () => {
  it("shows nothing for a few sigils following close", () => {
    expect(settle(game([0, 0, 1], i => ({ x: 2 + i, z: 0 }))).load).toBe(0);
  });
  it("grows with weight and tension, toward the army", () => {
    const L = TUNING.leash.length;
    const mid = settle(game([2, 2, 1, 1], i => ({ x: L * 0.9, z: i - 1.5 }))).load;
    const heavy = settle(game([2, 2, 2, 2, 1, 1], i => ({ x: L * 1.4, z: i - 2.5 })));
    expect(mid).toBeGreaterThan(0.05); expect(heavy.load).toBeGreaterThan(mid); expect(heavy.load).toBeLessThanOrEqual(1);
    expect(heavy.dx).toBeGreaterThan(0.95); // pulling east, where they are
  });
  it("leans her only flying away from the pull, and sinks her only over the treetops", () => {
    const L = TUNING.leash.length, far = (i: number) => ({ x: L * 1.4, z: i - 2.5 }), lv = [2, 2, 2, 2, 2, 2];
    expect(settle(game(lv, far, { vx: -TUNING.groundSpeed })).away).toBeGreaterThan(0.8);
    expect(settle(game(lv, far, { vx: TUNING.groundSpeed })).away).toBeLessThan(0.05);
    expect(settle(game(lv, far)).sinking).toBe(0);
    expect(settle(game(lv, far, { mode: "treetop" })).sinking).toBeGreaterThan(0.3);
  });
});
