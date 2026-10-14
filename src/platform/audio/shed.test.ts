import { describe, expect, it } from "vitest";
import { SHED_MAX, ShedValve } from "./shed";

describe("the sound's safety valve (shed.ts)", () => {
  it("sheds a step when the browser counts under-runs, waits between steps and stops at the last", () => {
    const v = new ShedValve();
    let u = 0, said: string[] = [];
    for (let t = 0; t < 60; t++) { u += 2; const why = v.feed(t, u, 0); if (why) said.push(why); }
    expect(v.level).toBe(SHED_MAX);
    expect(said.length).toBe(SHED_MAX);
    expect(said[0]).toMatch(/^shed 1 \(beds off\)/);
  });
  it("sheds when the audio clock falls behind for good, but not for a coarse clock's steps that pay back", () => {
    const steps = new ShedValve();
    for (let t = 0; t < 30; t++) steps.feed(t, null, t % 2 ? -120 : 0);
    expect(steps.level).toBe(0);
    const behind = new ShedValve();
    for (let t = 0; t < 8; t++) behind.feed(t, null, -60 * t);
    expect(behind.level).toBe(1);
  });
  it("sheds when the music keeps re-anchoring (Ed's v2186 pattern: 279 resyncs in 320 s, no clock data)", () => {
    const v = new ShedValve();
    for (let t = 0; t < 8; t++) v.feed(t, null, 0, Math.floor(t * 279 / 320));
    expect(v.level).toBe(1);
  });
  it("stays put on a true clock, and ?audio=lite starts shed, ?audio=full never sheds", () => {
    const v = new ShedValve();
    for (let t = 0; t < 30; t++) v.feed(t, 5, -3);
    expect(v.level).toBe(0);
    expect(new ShedValve("lite").level).toBe(SHED_MAX);
    const full = new ShedValve("full");
    for (let t = 0; t < 30; t++) full.feed(t, t * 10, -100 * t);
    expect(full.level).toBe(0);
  });
  // Ed's logs, 2026-10-14 (v3492-v3668): a one-off loss as the sound starts read as "can't keep up", and never undone
  it("lets play's start pass: a second lost and a burst of under-runs in the first seconds shed nothing", () => {
    const v = new ShedValve();
    v.begin(100);
    let said: string[] = [];
    for (let t = 100; t < 160; t++) { const u = t < 104 ? (t - 100) * 5 : 15, drift = t < 101 ? 0 : -1083; const why = v.feed(t, u, drift); if (why) said.push(why); }
    expect(said).toEqual([]);
    expect(v.level).toBe(0);
  });
  it("doesn't shed for a one-off step in the clock, only for time still being lost", () => {
    const once = new ShedValve();
    for (let t = 0; t < 40; t++) once.feed(t, null, t < 3 ? 0 : -400);
    expect(once.level).toBe(0);
    const going = new ShedValve();
    for (let t = 0; t < 8; t++) going.feed(t, null, -60 * t);
    expect(going.level).toBe(1);
  });
  it("steps back up after a calm minute (a wave landing's burst costs a minute, not the night), never past ?audio=lite", () => {
    const v = new ShedValve();
    let u = 0, said: string[] = [];
    for (let t = 0; t < 6; t++) { u += 2; const why = v.feed(t, u, 0); if (why) said.push(why); }
    expect(v.level).toBe(1);
    for (let t = 6; t < 200; t++) { const why = v.feed(t, u, 0); if (why) said.push(why); }
    expect(v.level).toBe(0);
    expect(said.at(-1)).toMatch(/^unshed to 0 \(the full mix\): 60 s calm/);
    const lite = new ShedValve("lite");
    for (let t = 0; t < 200; t++) lite.feed(t, 0, 0);
    expect(lite.level).toBe(SHED_MAX);
  });
  it("keeps shed while the trouble goes on", () => {
    const v = new ShedValve();
    let u = 0;
    for (let t = 0; t < 300; t++) { if (t % 20 === 0) u += 1; v.feed(t, u, 0); } // (an under-run every 20 s: never a calm minute)
    expect(v.level).toBe(0); // (too few to shed)
    const w = new ShedValve();
    u = 0;
    for (let t = 0; t < 6; t++) { u += 2; w.feed(t, u, 0); }
    for (let t = 6; t < 300; t++) { if (t % 30 === 0) u += 1; w.feed(t, u, 0); }
    expect(w.level).toBe(2); // (shed twice as the burst ran on, and never a calm minute after to step back)
  });
});
