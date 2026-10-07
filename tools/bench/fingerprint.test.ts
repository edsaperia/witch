import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls } from "../../src/rules/game";
import { TUNING, type Tuning } from "../../src/rules/tuning";
import { fingerprint } from "./fingerprint";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
/** A short game on a tuning: off the seat and a few seconds' flight east, then its fingerprint. */
function play(t: Tuning): Record<string, string> {
  const g = newGame(7, t);
  g.clock.paused = false;
  for (let i = 0; i < 240; i++) stepGame(g, { ...idle, moveX: 1 }, STEP);
  return fingerprint(g);
}

describe("the bench's fingerprint (tools/bench/fingerprint.ts)", () => {
  const base = play(TUNING);
  it("is the same for a knob added, a note edited, or the groups reordered: the tuning file is an input, not the state", () => {
    const added = { ...TUNING, someNewKnob: 3, _someNewKnob: "a note" } as Tuning;
    expect(play(added)).toEqual(base);
    const reordered = Object.fromEntries(Object.entries(TUNING).reverse()) as unknown as Tuning;
    expect(play(reordered)).toEqual(base);
  });
  it("still changes when a knob the game uses changes what happens", () => {
    const faster = { ...TUNING, groundSpeed: TUNING.groundSpeed * 1.5 } as Tuning;
    const t = play(faster);
    expect(t.all).not.toEqual(base.all);
    expect(t.witches).not.toEqual(base.witches);
  });
});
