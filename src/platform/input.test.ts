// A gamepad's controls (platform/input.ts padControls), and how a station's panel takes the pad over.
import { describe, expect, it } from "vitest";
import { PAD, padControls } from "./input";

const pressed = (...i: number[]) => { const b = Array(17).fill(false); for (const k of i) b[k] = true; return b; };
const none = Array(17).fill(false), still = [0, 0, 0, 0];

describe("padControls", () => {
  it("in play: the bottom face button rises, the left one puts down, the right stick aims", () => {
    expect(padControls(pressed(...PAD.rise), still, none, false, false).toggleMode).toBe(true);
    expect(padControls(pressed(...PAD.sigil), still, none, false, false).sigil).toBe(true);
    expect(padControls(none, [0, 0, 1, 0], none, false, false).aim).toEqual({ x: 20, z: 0 });
  });
  it("at a station's panel (Ed's playtest, 2026-10-23: the bottom face button flew her off from the bedroom): no button but square, d-pad or right stick reaches the game; the left stick still walks her", () => {
    for (let i = 0; i < 17; i++) {
      const c = padControls(pressed(i), still, none, false, true);
      // (square, the use button, closes it as E does: Ed, 2026-10-26, "E should also close ... (square and X on controller)")
      expect({ ...c, moveX: 0, moveZ: 0 }, `button ${i}`).toEqual({ moveX: 0, moveZ: 0, zoom: 0, toggleMode: false, debug: false, sigil: i === 2, sigilHeld: false, hat: false, spell: false, cycle: false, dash: false, fire: false, aim: null });
      expect([c.moveX, c.moveZ], `button ${i}`).toEqual([0, 0]); // (the d-pad's the panel's)
    }
    expect(padControls(none, [0, 0, 1, 1], none, false, true).aim).toBeNull();
    const walk = padControls(none, [1, 0, 0, 0], none, false, true);
    expect(walk.moveX).toBeCloseTo(1, 5);
  });
});
