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
  it("stays put on a true clock, and ?audio=lite starts shed, ?audio=full never sheds", () => {
    const v = new ShedValve();
    for (let t = 0; t < 30; t++) v.feed(t, 5, -3);
    expect(v.level).toBe(0);
    expect(new ShedValve("lite").level).toBe(SHED_MAX);
    const full = new ShedValve("full");
    for (let t = 0; t < 30; t++) full.feed(t, t * 10, -100 * t);
    expect(full.level).toBe(0);
  });
});
