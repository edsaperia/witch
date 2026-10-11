// After she lands she can't rise again for riseCooldown seconds (Ed, 2026-10-11: rising takes her out of ground mode at
// once, so players rose to the treetops instead of dodging).
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls } from "./game";
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

  it("just landed, rising does nothing till riseCooldown seconds after; then she rises (on a broom with a spell)", () => {
    const { g, W } = landed(withTuning({ spells: { ...TUNING.spells, broom: "speed" } }));
    for (let i = 0; i < (TUNING.riseCooldown! - 0.5) / STEP; i++) stepGame(g, idle, STEP);
    stepGame(g, { ...idle, toggleMode: true }, STEP);
    expect(W.body.mode).toBe("ground"); // (2.5 s on: not yet)
    for (let i = 0; i < 0.6 / STEP; i++) stepGame(g, idle, STEP);
    stepGame(g, { ...idle, toggleMode: true }, STEP);
    expect(W.body.mode).not.toBe("ground"); // (3.1 s on: up she goes)
  });

  it("the plain broom's is shorter (Ed, 2026-10-11: 'default broom reduces treetop cooldown'; spells.plain)", () => {
    const { g, W } = landed(), k = TUNING.riseCooldown! * TUNING.spells.plain!.riseCooldown;
    for (let i = 0; i < (k + 0.1) / STEP; i++) stepGame(g, idle, STEP);
    stepGame(g, { ...idle, toggleMode: true }, STEP);
    expect(W.body.mode).not.toBe("ground");
  });

  it("at 0, she rises again at once", () => {
    const { g, W } = landed(withTuning({ riseCooldown: 0 }));
    stepGame(g, { ...idle, toggleMode: true }, STEP);
    expect(W.body.mode).not.toBe("ground");
  });
});
