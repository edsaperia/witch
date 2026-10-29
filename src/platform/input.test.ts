// A gamepad's controls (platform/input.ts padControls) under Ed's layout (2026-10-28; platform/bindings.ts), and how a menu takes
// the pad over.
import { describe, expect, it } from "vitest";
import { padControls } from "./input";
import { PAD_BUTTONS } from "./bindings";

const pressed = (...names: string[]) => { const b = Array(17).fill(false); for (const n of names) b[PAD_BUTTONS[n]] = true; return b; };
const none = Array(17).fill(false), still = [0, 0, 0, 0];
const play = (...names: string[]) => padControls(pressed(...names), still, none, false, false);

describe("padControls in play (Ed's layout, 2026-10-28)", () => {
  it("cross rises or lands; square uses (puts down, picks up, held: a run) (Ed, 2026-10-29: \"swap x and square\"); circle dodges; triangle the hat; L3 the boost", () => {
    expect(play("cross").toggleMode).toBe(true);
    expect([play("square").sigil, play("square").sigilHeld]).toEqual([true, true]);
    expect(play("circle").dash).toBe(true);
    expect(play("triangle").hat).toBe(true);
    expect(play("L3").spell).toBe(true);
  });
  it("square never rises; cross never uses (never opens a station or puts down a sigil)", () => {
    expect(play("square").toggleMode).toBe(false);
    expect([play("cross").sigil, play("cross").sigilHeld]).toEqual([false, false]);
  });
  it("R1 cycles forward, L1 back; R2 invites and L2 dodges (Ed, 2026-10-29); the d-pad zooms (up out, down in: Ed, 2026-10-29) and no longer moves her; Share debug", () => {
    expect([play("R1").cycle, play("R1").cycleBack]).toEqual([true, false]);
    expect([play("L1").cycle, play("L1").cycleBack]).toEqual([false, true]);
    expect(play("R2").fire).toBe(true); expect([play("L2").fire, play("L2").dash]).toEqual([false, true]);
    expect(play("circle").dash).toBe(true); // (still)
    expect(play("up").zoom).toBe(1); expect(play("down").zoom).toBe(-1); // (+1: out, the camera further away)
    for (const d of ["up", "down", "left", "right"]) expect([play(d).moveX, play(d).moveZ], d).toEqual([0, 0]);
    expect(play("share").debug).toBe(true);
  });
  it("the left stick moves (past its dead zone), the right aims", () => {
    expect(padControls(none, [1, 0, 0, 0], none, false, false).moveX).toBeCloseTo(1, 5);
    expect(padControls(none, [0.1, 0, 0, 0], none, false, false).moveX).toBe(0);
    expect(padControls(none, [0, 0, 1, 0], none, false, false).aim).toEqual({ x: 20, z: 0 });
    expect(padControls(none, [0, 0, 0, 1], none, false, false).aim).toEqual({ x: 0, z: 20 });
  });
  it("a button held from last frame isn't pressed again; one taken by something else (the start) does nothing", () => {
    expect(padControls(pressed("cross"), still, pressed("cross"), false, false).toggleMode).toBe(false);
    expect(padControls(pressed("cross"), still, none, true, false).toggleMode).toBe(false);
  });
});

describe("padControls with a menu open (Ed's playtest, 2026-10-23: the bottom face button flew her off from the bedroom)", () => {
  it("only circle (back: main.ts closes it) and the triggers (the telescope's zoom) reach the game; no stick moves her", () => {
    for (let i = 0; i < 17; i++) {
      const b = Array(17).fill(false); b[i] = true;
      const c = padControls(b, still, none, false, true);
      expect(c, `button ${i}`).toEqual({ moveX: 0, moveZ: 0, zoom: i === PAD_BUTTONS.R2 ? -1 : i === PAD_BUTTONS.L2 ? 1 : 0, toggleMode: false, debug: false, sigil: i === PAD_BUTTONS.circle, sigilHeld: false, hat: false, spell: false, cycle: false, cycleBack: false, dash: false, fire: false, aim: null });
    }
    expect(padControls(none, [1, 1, 1, 1], none, false, true).aim).toBeNull();
    expect(padControls(none, [1, 0, 0, 0], none, false, true).moveX).toBe(0);
  });
});
