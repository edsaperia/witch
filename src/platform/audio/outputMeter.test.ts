import { describe, expect, it } from "vitest";
import { MicJudge, SilenceTracker, envelopeLag, ClockWatch } from "./outputMeter";

describe("the measured output's silence episodes", () => {
  it("logs a silence while the music should be heard, from the last loud read to the last silent one", () => {
    const s = new SilenceTracker();
    const eps = [];
    for (let i = 0; i <= 30; i++) { const t = i * 0.1, e = s.feed(t, t > 1 && t < 1.9 ? -90 : -20, true); if (e) eps.push(e); }
    expect(eps.length).toBe(1);
    expect(eps[0].start).toBeCloseTo(1.0, 5);
    expect(eps[0].dur).toBeCloseTo(0.8, 5);
  });
  it("ignores a short dip, and silence that isn't expected (before the speakers boot, paused, muted)", () => {
    const s = new SilenceTracker(), eps = [];
    for (let i = 0; i <= 30; i++) { const t = i * 0.1, e = s.feed(t, Math.abs(t - 1.05) < 0.1 ? -90 : -20, true); if (e) eps.push(e); }
    for (let i = 31; i <= 60; i++) { const e = s.feed(i * 0.1, -120, false); if (e) eps.push(e); }
    expect(eps).toEqual([]);
  });
  it("says how long it's been silent so far", () => {
    const s = new SilenceTracker();
    s.feed(0, -20, true); s.feed(0.1, -90, true); s.feed(0.6, -90, true);
    expect(s.silentFor(0.6)).toBeCloseTo(0.6, 5); // (from the last loud read)
  });
});

describe("the mic check", () => {
  const block = 1024 / 48000;
  // a game output with a beat in its envelope, and a mic hearing it `lag` blocks later over a room at -70 dB
  const out = (i: number) => -20 - 10 * (Math.floor(i / 6) % 2);
  it("finds the device's lag", () => {
    const o = [], m = [];
    for (let i = 0; i < 100; i++) { o.push(out(i)); m.push(i >= 5 ? out(i - 5) - 25 : -70); }
    expect(envelopeLag(o, m, 14).lag).toBe(5);
  });
  it("flags a dropout after the game (the mic drops to the room while the output plays on), and not otherwise", () => {
    const J = new MicJudge(block), eps = [];
    const n = Math.round(12 / block);
    for (let i = 0; i < n; i++) {
      const t = i * block, quietRoom = t < 1, drop = t > 8 && t < 8.6;
      const o = quietRoom ? -120 : out(i), heard = quietRoom || drop ? -70 + (i % 3) : out(i - 4) - 25;
      const e = J.feed(t, o, heard);
      if (i % 24 === 0) J.relag();
      if (e) eps.push(e);
    }
    expect(eps.map(e => e.kind)).toEqual(["dropout"]);
    expect(eps[0].dur).toBeGreaterThan(0.5);
    expect(eps[0].dur).toBeLessThan(0.7);
    expect(J.lag).toBe(4);
  });
  it("flags the mic hearing it loud while the output is silent", () => {
    const J = new MicJudge(block), eps = [];
    for (let i = 0; i < Math.round(6 / block); i++) {
      const t = i * block, gap = t > 4 && t < 4.5;
      const e = J.feed(t, t < 1 ? -120 : gap ? -120 : out(i), t < 1 ? -70 : out(i - 4) - 15);
      if (e) eps.push(e);
    }
    expect(eps.map(e => e.kind)).toEqual(["unheard"]);
  });
});

describe("ClockWatch: why the sound cut out (Ed, 2026-10-07: \"the music is still cutting out\")", () => {
  /** 60 s of reads every 0.1 s; `ctxAt(t)` the audio clock at page time t. */
  const run = (ctxAt: (t: number) => number, stats?: (t: number) => { underrunEvents: number; underrunDuration: number }) => {
    const w = new ClockWatch();
    for (let i = 0; i <= 600; i++) { const t = 10 + i * 0.1; w.feed(t, ctxAt(t), true, null, stats?.(t)); }
    return w;
  };

  it("calls a true clock true", () => {
    const w = run(t => t - 10);
    expect(w.slow).toBe(0);
    expect(w.verdict()).toBe("clock true");
  });

  it("tells coarse clock steps (slow seconds paid back by fast ones, nothing lost) from under-runs", () => {
    // the clock jumps 1.5 s at a time, so some seconds read 0 and others 1.5 or more
    const w = run(t => Math.floor((t - 10) / 1.5) * 1.5);
    expect(w.slow).toBeGreaterThan(0);
    expect(w.fast).toBeGreaterThan(0);
    expect(Math.abs(w.drift)).toBeLessThan(1600);
    expect(w.verdict()).toMatch(/clock steps/);
  });

  it("calls a clock that loses time for good under-runs", () => {
    // the audio thread loses 300 ms every 10 s and never catches up
    const w = run(t => (t - 10) - Math.floor((t - 10) / 10) * 0.3);
    expect(w.drift).toBeLessThan(-1000);
    expect(w.verdict()).toMatch(/fell behind/);
  });

  it("believes the browser's own under-run count where it has one", () => {
    const w = run(t => t - 10, t => ({ underrunEvents: 5 + Math.floor((t - 10) / 20), underrunDuration: 0.01 * Math.floor((t - 10) / 20) }));
    expect(w.underruns).toBe(3);
    expect(w.verdict()).toMatch(/device under-ran 3×/);
  });

  it("starts the reckoning again after a suspend", () => {
    const w = new ClockWatch();
    w.feed(0, 0, true); w.feed(5, 5, true); w.feed(6, 5, false); w.feed(100, 5, true); w.feed(101, 6, true);
    expect(w.drift).toBe(0);
  });
});
