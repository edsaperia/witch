// The sail's zoom isn't skipped by the press that sailed (app/flightSkip.ts; Ed, 2026-11-06, v7569: "When I start sailing, I do not
// zoom into the map at all but cut immediately to a blue loading screen"): at the map table a sail is a hold, so its key is still
// down and auto-repeating, its pad button still pressed and its mouse not yet up when the chart's flight sets off.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { keySkipsFlight, padSkipsFlight } from "./flightSkip";

/** A key held as a person holds it: one keydown, then the OS's repeats every 33 ms after a 500 ms delay, till `ms`. */
function held(ms: number): { t: number; repeat: boolean }[] {
  const out = [{ t: 0, repeat: false }];
  for (let t = 500; t < ms; t += 33) out.push({ t, repeat: true });
  return out;
}

describe("what skips a sail's flight (flightSkip)", () => {
  it("a key held through a table's hold sails and then lets the flight play: none of its repeats skip it", () => {
    const hold = 1.2 * 1000, sailedAt = hold; // (the tuning's chart.sailHold: the ring full, the flight sets off with the key still down)
    const after = held(2500).filter(e => e.t >= sailedAt);
    expect(after.length).toBeGreaterThan(10);
    expect(after.some(keySkipsFlight)).toBe(false);
  });
  it("a fresh key press during the flight still skips it", () => {
    expect(keySkipsFlight({ repeat: false })).toBe(true);
  });
  it("the pad's cross held through the hold doesn't skip it; a button pressed after does", () => {
    const cross = [true, false, false], none = [false, false, false];
    expect(padSkipsFlight(cross, cross)).toBe(false); // (still held from the sail, frame after frame)
    expect(padSkipsFlight(none, cross)).toBe(false); // (let go)
    expect(padSkipsFlight(cross, none)).toBe(true); // (pressed again)
    expect(padSkipsFlight([true, true, false], cross)).toBe(true); // (another button, the cross still down)
  });
  it("is how the chart's flight and the game's dive take their input (app/chartView.ts, main.ts)", () => {
    const chart = readFileSync(new URL("./chartView.ts", import.meta.url), "utf8");
    // keys: only a fresh press; the pad: only a button newly pressed
    expect(chart).toMatch(/if \(chart\.flying\) \{ e\.preventDefault\(\); if \(keySkipsFlight\(e\)\) chart\.skipFlight\(\); return; \}/);
    expect(chart).toMatch(/if \(chart\.flying\) \{ if \(fresh\) chart\.skipFlight\(\); return; \}/);
    expect(chart).toMatch(/const fresh = padSkipsFlight\(pressed, padButtons\);/);
    // the pointer: a press while it flies skips it; a release (the held island's, after the sail) never does
    const up = chart.slice(chart.indexOf('canvas.addEventListener("pointerup"'), chart.indexOf('canvas.addEventListener("pointercancel"'));
    expect(up.length).toBeGreaterThan(0);
    expect(up).not.toMatch(/skipFlight/);
    const down = chart.slice(chart.indexOf('canvas.addEventListener("pointerdown"'), chart.indexOf('canvas.addEventListener("pointermove"'));
    expect(down).toMatch(/if \(chart\.flying\) \{ chart\.skipFlight\(\); return; \}/);
    const main = readFileSync(new URL("../main.ts", import.meta.url), "utf8");
    expect(main).toMatch(/if \(e instanceof KeyboardEvent && !keySkipsFlight\(e\)\) return; const a = N\(\)\.arrival; if \(a && !a\.done\) a\.skip\(\);/);
  });
});
