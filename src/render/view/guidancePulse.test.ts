// The morning's guidance pins breathe (Ed, 2026-10-29: "morning routine pointers should pulse slightly (wake up to spell)"):
// render/view/guidance.ts guidePulse, by the tuning's pins.pulse and pulseRate; half as much with reduce flashing.
import { describe, expect, it, vi } from "vitest";
import { GuidePin, guidePulse } from "./guidance";
import type { View } from "../view";
import { TUNING } from "../../rules/tuning";

const T = TUNING.pins!, dress = { kind: "dress" as const, target: { object: "wardrobe" } };
const over = (f: (s: number) => number) => { let lo = Infinity, hi = -Infinity; for (let s = 0; s < 2; s += 0.01) { const v = f(s); lo = Math.min(lo, v); hi = Math.max(hi, v); } return [lo, hi]; };

describe("the morning's guidance pins breathe", () => {
  it("keeps the displayed pointer phase through ten paused seconds and resumes from it", () => {
    const pin = { scale: 0, show() {}, hide() {} };
    const clock = { time: 1.25 };
    const pins = { pulse: 0.1, pulseRate: 0.73 };
    const pointer = new GuidePin({ game: { clock, tuning: { pins } }, pin: () => pin, leashView: {}, usePrompt: {} } as unknown as View);
    vi.useFakeTimers({ toFake: ["performance"] });
    try {
      pointer.update(dress, true);
      const before = pin.scale;
      vi.advanceTimersByTime(10000);
      pointer.update(dress, true);
      expect(pin.scale).toBe(before);
      clock.time += 1 / 60;
      pointer.update(dress, true);
      expect(pin.scale).not.toBe(before);
    } finally { vi.useRealTimers(); }
  });
  it("swell gently, from 1 to 1 + pins.pulse and back, pulseRate times a second", () => {
    const [lo, hi] = over(s => guidePulse(dress, s, T));
    expect(lo).toBeCloseTo(1, 3);
    expect(hi).toBeCloseTo(1 + T.pulse!, 2);
    expect(T.pulse!).toBeGreaterThan(0); expect(T.pulse!).toBeLessThanOrEqual(0.15); // (slight: Ed's "pulse slightly")
    expect(guidePulse(dress, 1 / T.pulseRate!, T)).toBeCloseTo(1, 6); // (a whole breath a cycle)
  });
  it("half as much with reduce flashing", () => {
    expect(over(s => guidePulse(dress, s, T, true))[1]).toBeCloseTo(1 + T.pulse! / 2, 2);
  });
  it("only the morning's: the night's end's 🧭 and 💤 stay still, as with no pin", () => {
    for (const g of [{ kind: "bed" as const, target: { object: "bed" } }, { kind: "chart" as const, target: { object: "mapTable" } }, null]) expect(over(s => guidePulse(g, s, T))).toEqual([1, 1]);
    for (const kind of ["desk", "lathe", "decks", "hat"] as const) expect(over(s => guidePulse({ kind, target: { object: "x" } }, s, T))[1]).toBeGreaterThan(1);
  });
});
