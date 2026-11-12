// Her eyes closing as she goes to sleep (Ed, 2026-11-12: "going to sleep zzz timer should be an eye closing vignette instead of
// a dial"): render/eyelids.ts, by the bed's hold (rules/houseRooms.ts stepBed).
import { describe, expect, it } from "vitest";
import { lidClosure, stepLids, wakeClosure, OPEN_RATE, WAKE_SHUT, WAKE_OPEN } from "./eyelids";

describe("her eyes closing at the bed", () => {
  it("open with no hold, shut at a full one, closing all the way through it", () => {
    expect(lidClosure(0)).toBe(0); expect(lidClosure(1)).toBe(1);
    expect(lidClosure(-1)).toBe(0); expect(lidClosure(2)).toBe(1);
    let last = 0;
    for (let f = 0.05; f <= 1; f += 0.05) { const c = lidClosure(f); expect(c).toBeGreaterThan(last); last = c; }
    expect(lidClosure(0.1)).toBeGreaterThan(0.05); // (the first moment of the hold shows at once)
  });
  it("follow the hold up exactly (the timer's length unchanged)", () => {
    expect(stepLids(0.2, 0.7, 1 / 60)).toBe(0.7);
    expect(stepLids(0.2, 1, 0)).toBe(1);
  });
  it("let go early, open again smoothly, not at once", () => {
    let c = 0.8, frames = 0;
    const seen: number[] = [];
    while (c > 0 && frames < 600) { c = stepLids(c, 0, 1 / 60); seen.push(c); frames++; }
    expect(seen[0]).toBeGreaterThan(0.6); // (one frame barely opens them)
    for (let i = 1; i < seen.length; i++) expect(seen[i]).toBeLessThanOrEqual(seen[i - 1]);
    expect(c).toBe(0); // (open, exactly, at the end)
    expect(frames / 60).toBeGreaterThan(0.3); expect(frames / 60).toBeLessThan(1.2);
    expect(OPEN_RATE).toBeGreaterThan(0);
  });
  it("a stalled frame (no time) leaves them where they are", () => {
    expect(stepLids(0.5, 0, 0)).toBe(0.5);
  });
});

describe("her eyes opening as she wakes (Ed, 2026-11-12: \"we can also use this animation for waking up (in reverse)\")", () => {
  const alarm = { beat: "alarm", at: 10, snoozes: 0, open: false };
  it("shut as her alarm first rings, then opening, open once WAKE_SHUT + WAKE_OPEN s have passed", () => {
    expect(wakeClosure(alarm, 10)).toBe(1);
    expect(wakeClosure(alarm, 10 + WAKE_SHUT)).toBe(1);
    const mid = wakeClosure(alarm, 10 + WAKE_SHUT + WAKE_OPEN / 2);
    expect(mid).toBeGreaterThan(0.2); expect(mid).toBeLessThan(0.8);
    expect(wakeClosure(alarm, 10 + WAKE_SHUT + WAKE_OPEN)).toBe(0);
    let last = 1;
    for (let t = 10; t < 12; t += 0.05) { const c = wakeClosure(alarm, t); expect(c).toBeLessThanOrEqual(last); last = c; }
  });
  it("open while she dreams (still seen in the dark), after a snooze, stretching, up, or with no wake-up", () => {
    expect(wakeClosure({ ...alarm, beat: "dream" }, 10)).toBe(0);
    expect(wakeClosure({ ...alarm, snoozes: 1 }, 10)).toBe(0);
    expect(wakeClosure({ ...alarm, beat: "snooze" }, 10)).toBe(0);
    expect(wakeClosure({ ...alarm, beat: "stretch" }, 10)).toBe(0);
    expect(wakeClosure({ ...alarm, open: true }, 10)).toBe(0);
    expect(wakeClosure(null, 10)).toBe(0);
  });
});
