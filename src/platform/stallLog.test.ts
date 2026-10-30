import { expect, it } from "vitest";
import { StallLog, type SlowFrameSummary } from "./stallLog";
const sample = (work: number) => ({ t: 12, gap: 16, work, step: 0, parts: {}, mode: "ground", x: 1, z: 2, wave: 1, creatures: 4 });
it("uses the strict 100 ms threshold and reports a bad stretch at most once per five seconds, including its tail", () => {
  let now = 1000; const reports: SlowFrameSummary[] = [];
  const log = new StallLog(row => reports.push(row), () => now, false);
  log.frame(sample(100)); expect(log.count).toBe(0);
  log.frame(sample(100.1)); expect(reports).toHaveLength(1);
  now = 1100; log.frame(sample(200));
  now = 1200; log.frame(sample(300)); expect(reports).toHaveLength(1);
  now = 5999; log.frame(sample(10)); expect(reports).toHaveLength(1);
  now = 6000; log.frame(sample(10));
  expect(reports[1]).toMatchObject({ count: 2, maxWork: 300, worst: { work: 300 } });
  expect(log.count).toBe(3);
});
it("retains measured loading/draw breakdowns without summing inclusive totals or inventing missing parts", () => {
  const reports: SlowFrameSummary[] = [];
  const log = new StallLog(row => reports.push(row), () => 1000, false);
  log.frame({ ...sample(200), draw: 180, measured: { step: false, draw: true }, source: "warm-draw", loading: { phase: "handoff-warm", ready: false, stage: "draws", done: 1, total: 3 }, parts: { "draw.heights": 120, "draw.submit": 30, invalid: NaN, tiny: 0.1 } });
  expect(reports[0]).toMatchObject({ count: 1, loadingCount: 1, worst: { draw: 180, measured: { step: false, draw: true }, parts: [["draw.heights", 120], ["draw.submit", 30]], loading: { stage: "draws" } } });
  const empty = new StallLog(() => {}, () => 1000, false);
  empty.frame(sample(150)); expect(empty.stalls[0].parts).toEqual([]); expect(empty.stalls[0].draw).toBeUndefined();
});
it("bounds the raw stall ring and names only the five largest measured sections", () => {
  let now = 0; const log = new StallLog(() => {}, () => now++, false);
  for (let i = 0; i < 70; i++) log.frame({ ...sample(150), parts: { a: 5, b: 6, c: 7, d: 8, e: 9, f: 10 } });
  expect(log.count).toBe(70); expect(log.stalls).toHaveLength(50);
  expect(log.stalls.at(-1)?.parts).toEqual([["f", 10], ["e", 9], ["d", 8], ["c", 7], ["b", 6]]);
});
