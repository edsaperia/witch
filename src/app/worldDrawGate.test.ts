import { expect, it } from "vitest";
import { WorldDrawGate } from "./worldDrawGate";

it("retains a paused picture through a minute of menu frames, including background art arrivals", () => {
  const gate = new WorldDrawGate();
  gate.drawn(1, 1, 9);
  let draws = 0;
  for (let frame = 0; frame < 3600; frame++) {
    if (gate.shouldDraw(false, true, false, frame, 1, 9)) draws++;
  }
  expect(draws).toBe(0);
  expect(gate.shouldDraw(false, false, false, 2, 1, 9)).toBe(true);
});

it("redraws the start for new art, a changed view or an explicit simulation step, once each", () => {
  const gate = new WorldDrawGate();
  for (const [art, view, step] of [[0,0,0], [1,0,0], [1,1,0], [1,1,1]]) {
    expect(gate.shouldDraw(true, true, true, art, view, step)).toBe(false);
    expect(gate.shouldDraw(false, true, true, art, view, step)).toBe(true);
    gate.drawn(art, view, step);
    expect(gate.shouldDraw(false, true, true, art, view, step)).toBe(false);
  }
});
