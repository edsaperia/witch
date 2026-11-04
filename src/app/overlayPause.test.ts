import { expect, it } from "vitest";
import { overlayPause } from "./overlayPause";
it("retains solo open/close pause behaviour and never overwrites a shared consensus pause", () => {
  for (const initial of [false, true]) {
    const clock = { paused: initial }, previous = overlayPause(clock, true, true, false);
    expect(clock.paused).toBe(true); expect(previous).toBe(initial);
    overlayPause(clock, false, true, previous); expect(clock.paused).toBe(initial);
    for (const opening of [true, false]) { clock.paused = initial; overlayPause(clock, opening, false, !initial); expect(clock.paused).toBe(initial); }
  }
});
