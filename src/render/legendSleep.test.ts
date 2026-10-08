import { describe, expect, it } from "vitest";
import { legendSleep, newSleepTrack, type SleepPose } from "./legendSleep";

const T = { wakeSecs: 6, angryWake: 0.5, settleSecs: 4 };
const at = (track: ReturnType<typeof newSleepTrack>, asleep: boolean, angry: boolean, time: number) => ({ ...legendSleep(track, asleep, angry, time, T, { sleep: 0, droop: 0 } as SleepPose) });

describe("a sleeping legend getting up and lying down", () => {
  it("is as its state is when first seen", () => {
    expect(at(newSleepTrack(true), true, false, 100)).toEqual({ sleep: 1, droop: 1 });
    expect(at(newSleepTrack(false), false, false, 100)).toEqual({ sleep: 0, droop: 0 });
  });
  it("wakes drowsily over wakeSecs: the head up first, a sag, then the body", () => {
    const tr = newSleepTrack(true);
    at(tr, true, false, 10);
    const s = [0, 0.6, 1.5, 2.2, 3, 4.5, 6, 7].map(d => at(tr, false, false, 10 + d));
    expect(s[0]).toEqual({ sleep: 1, droop: 1 });
    expect(s[1].sleep).toBe(1); expect(s[1].droop).toBeLessThan(0.8); // head coming up, body still down
    expect(s[3].droop).toBeGreaterThan(s[2].droop - 1e-9); // and sagging again
    for (let i = 1; i < s.length; i++) expect(s[i].sleep).toBeLessThanOrEqual(s[i - 1].sleep); // the body only ever rises
    expect(s[6]).toEqual({ sleep: 0, droop: 0 });
    expect(s[7]).toEqual({ sleep: 0, droop: 0 });
  });
  it("wakes angry in angryWake of the time", () => {
    const tr = newSleepTrack(true);
    at(tr, false, true, 0);
    expect(at(tr, false, true, 3)).toEqual({ sleep: 0, droop: 0 });
  });
  it("settles back to sleep over settleSecs, its head first", () => {
    const tr = newSleepTrack(false);
    at(tr, false, false, 0);
    const mid = at(tr, true, false, 0.0001), q = at(tr, true, false, 1.2);
    expect(mid.sleep).toBeCloseTo(0, 3);
    expect(q.droop).toBeGreaterThan(q.sleep);
    const end = at(tr, true, false, 4); expect(end.sleep).toBeCloseTo(1, 6); expect(end.droop).toBeCloseTo(1, 6);
  });
  it("turns back from part way without a jump", () => {
    const tr = newSleepTrack(true);
    at(tr, false, false, 0);
    const half = at(tr, false, false, 4), back = at(tr, true, false, 4);
    expect(back.sleep).toBeCloseTo(half.sleep, 9); expect(back.droop).toBeCloseTo(half.droop, 9);
  });
});
