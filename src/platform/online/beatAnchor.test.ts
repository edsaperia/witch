import { expect, it } from "vitest";
import { newBeatClock, shiftBeat } from "../../rules/beat";
import { beatAnchor } from "./beatAnchor";
it("copies the host's shifted anchor and rejects nonfinite or unordered clock data", () => {
  const clock = newBeatClock(120); shiftBeat(clock, 1, 1.5);
  const copied = beatAnchor(clock); expect(copied).toEqual(clock); expect(copied?.segs).not.toBe(clock.segs);
  expect(Object.keys(copied!)).toEqual(Object.keys(clock));
  for (const bad of [null, { ...clock, base: 0 }, { ...clock, wave: -1 }, { ...clock, segs: [] }, { ...clock, bonus: Infinity }, { ...clock, segs: [{ ...clock.segs[0], bpm: NaN }] }, { ...clock, segs: [...clock.segs].reverse() }]) expect(beatAnchor(bad)).toBeNull();
});
