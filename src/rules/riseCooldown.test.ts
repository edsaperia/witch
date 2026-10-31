// After she lands she can't rise again for riseCooldown seconds (Ed, 2026-10-11: rising takes her out of ground mode at
// once, so players rose to the treetops instead of dodging).
import { describe, expect, it } from "vitest";
import { newGame as fullGame, stepGame, STEP, type Controls } from "./game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Rise cooldown timing depends on one witch's landing and broom parts, not distant areas.");
import { TUNING, withTuning } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

function landed(t = TUNING) {
  const g = newGame(7, t), W = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  W.body = { ...W.body, seated: false, mode: "treetop", lift: 1 };
  stepGame(g, idle, STEP);
  stepGame(g, { ...idle, toggleMode: true }, STEP); // (down)
  for (let i = 0; i < 10 / STEP && W.body.mode !== "ground"; i++) stepGame(g, idle, STEP);
  expect(W.body.mode).toBe("ground");
  return { g, W };
}

describe("the rise cooldown (riseCooldown)", () => {
  it("is 3 s", () => expect(TUNING.riseCooldown).toBe(3));

  it("just landed, rising does nothing till riseCooldown seconds after; then she rises (the bare broom: Ed, 2026-10-23, no quick take-off)", () => {
    const { g, W } = landed();
    for (let i = 0; i < (TUNING.riseCooldown! - 0.5) / STEP; i++) stepGame(g, idle, STEP);
    stepGame(g, { ...idle, toggleMode: true }, STEP);
    expect(W.body.mode).toBe("ground"); // (2.5 s on: not yet)
    for (let i = 0; i < 0.6 / STEP; i++) stepGame(g, idle, STEP);
    stepGame(g, { ...idle, toggleMode: true }, STEP);
    expect(W.body.mode).not.toBe("ground"); // (3.1 s on: up she goes)
  });

  it("the Jet nozzles' is half (the plain broom's old quick take-off, won back by a part: Ed, 2026-10-23); the bare broom's isn't", () => {
    const k = TUNING.riseCooldown! * 0.5, after = (parts: string) => {
      const { g, W } = landed(withTuning({ spells: { ...TUNING.spells, parts } }));
      for (let i = 0; i < (k + 0.1) / STEP; i++) stepGame(g, idle, STEP);
      stepGame(g, { ...idle, toggleMode: true }, STEP);
      return W.body.mode !== "ground";
    };
    expect(after("nozzles")).toBe(true);
    expect(after("")).toBe(false);
  });

  it("at 0, she rises again at once", () => {
    // (on the Jet nozzles: the take-off's own share, 1 s, fits beside what's left of the new game's dodge on the shared counter)
    const { g, W } = landed(withTuning({ riseCooldown: 0, spells: { ...TUNING.spells, parts: "nozzles" } }));
    stepGame(g, { ...idle, toggleMode: true }, STEP);
    expect(W.body.mode).not.toBe("ground");
  });
});
