import { expect, it } from "vitest";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { gcForWalk, overlap, distribution, frameRows, summarizeRuns, markdown } from "../../tools/bench/house-profile-summary.mjs";
import { recordsInputs } from "../platform/diagnosticMode";
const { houseRoute, walkHouse, COLUMNS, PHASES } = createRequire(import.meta.url)("../../tools/bench/house-route.cjs");
it("keeps ordinary recording enabled and confines the comparison bypass to recording=0", () => {
  for (const s of ["", "?recording=1", "?recording=false", "?other=0"]) expect(recordsInputs(s)).toBe(true);
  expect(recordsInputs("?seed=123&recording=0")).toBe(false);
});
it("uses the smoke route's corridor directions and actual house rotation", () => {
  const H = { turn: 90, rooms: [{ id: "bestiary", x: 3, z: 4 }, { id: "studio", x: 5, z: 6 }], corridors: [
    { id: "terrace-parlour", pts: [[1, 0], [2, 0]] }, { id: "bestiary-parlour", pts: [[3, 4], [2, 0]] }, { id: "terrace-studio", pts: [[0, 1], [5, 6]] },
  ] };
  const route = houseRoute(H);
  expect(route[0]).toEqual([0, 0]); expect(route[1][0]).toBeCloseTo(0); expect(route[1][1]).toBeCloseTo(-1);
  expect(route[3][1]).toBeCloseTo(-2); expect(route.at(-1)[0]).toBeCloseTo(6); expect(route.at(-1)[1]).toBeCloseTo(-5);
});
it("merges nested GC intervals on the anchored renderer thread without counting workers or double counting parents", () => {
  const events = [
    { name: "house-profile-walk-start", ph: "R", pid: 1, tid: 2, ts: 100_000 },
    { name: "MinorGC", ph: "X", pid: 1, tid: 2, ts: 101_000, dur: 3000 },
    { name: "V8.GCScavenger", ph: "X", pid: 1, tid: 2, ts: 102_000, dur: 1000 },
    { name: "MajorGC", ph: "X", pid: 1, tid: 9, ts: 100_000, dur: 50_000 },
    { name: "MajorGC", ph: "B", pid: 1, tid: 2, ts: 105_000 },
    { name: "detail", ph: "B", pid: 1, tid: 2, ts: 105_500 },
    { ph: "E", pid: 1, tid: 2, ts: 106_000 },
    { ph: "E", pid: 1, tid: 2, ts: 107_000 },
  ];
  const gc = gcForWalk(events, 10);
  expect(gc.intervals).toEqual([[11, 14], [15, 17]]); expect(overlap(gc.intervals, 12, 15)).toBe(2);
  expect(() => gcForWalk([], 10)).toThrow(/anchor/);
});
it("reports measured quantiles and five slowest phase splits, and rejects missing trace/timings instead of inventing zeros", () => {
  expect(distribution([1, 4, 2, 3])).toEqual({ count: 4, max: 4, p99: 4, median: 2.5 });
  expect(() => distribution([])).toThrow();
  const row = Object.fromEntries(COLUMNS.map((k: string) => [k, 0]));
  Object.assign(row, { frame: 7, section: 1, start: 10, wall: 8, step: 2, render: 5, witch: 3, witchStart: 12, witchEnd: 15 });
  const walk = { got: true, anchor: 10, samples: COLUMNS.map((k: string) => row[k]) };
  const measured = frameRows(walk, COLUMNS, [{ name: "house-profile-walk-start", ph: "R", pid: 1, tid: 2, ts: 100_000 }]);
  expect(measured.rows[0]).toMatchObject({ renderOther: 2, outside: 1, gcWitch: 0 });
  const group = summarizeRuns([{ repeat: 1, frames: 1, rows: measured.rows }]);
  expect(group.top5[0].frame).toBe(7); expect(group.phases.witch.median).toBe(3);
  expect(markdown({ complete: false, groups: { candidate: group } })).toContain("| candidate | 1 | 1 | 3.000");
  expect(() => frameRows({ ...walk, samples: [1] }, COLUMNS, [])).toThrow();
  const missing = [...walk.samples]; missing[COLUMNS.indexOf("witchStart")] = NaN;
  expect(() => frameRows({ ...walk, samples: missing }, COLUMNS, [{ name: "house-profile-walk-start", ph: "R", pid: 1, tid: 2, ts: 100_000 }])).toThrow(/Missing measured/);
});
it("profiles the same controls/steps as smoke and restores the timing hook and manual state", () => {
  const streams: unknown[][] = [];
  for (const profile of [false, true]) {
    let now = 0, mark = 0;
    const stream: unknown[] = [], game = { witches: [{ body: { x: 0, z: 0, seated: false } }], map: { treehouse: { x: 0, z: 0 } } };
    const view = { lap: 0, ms: {} as Record<string, number>, time(part: string) { const at = now; this.ms[part] = at - this.lap; this.lap = at; } };
    const original = view.time;
    const witch = { game, view, manual: false, frame(c: { moveX: number; moveZ: number }, dt: number, draw: boolean) {
      stream.push([c, dt, draw]); const b = game.witches[0].body; b.x += c.moveX * dt * 10; b.z += c.moveZ * dt * 10;
      view.ms = {}; view.lap = now; view.time("grass+lights"); now += 2; view.time("witch");
      return { step: 1, render: 2, ms: view.ms };
    } };
    const context = { window: { witch }, performance: { now: () => now, mark: () => { mark = now; }, getEntriesByName: () => [{ startTime: mark }] }, input: { route: [[0, 0], [2, 0]], profile, phases: PHASES } };
    const result = runInNewContext(`(${walkHouse.toString()})(input)`, context);
    expect(result.got).toBe(true); expect(result.worst).toBe(2); expect(witch.manual).toBe(false); expect(view.time).toBe(original);
    if (profile) { expect(result.samples.length % COLUMNS.length).toBe(0); expect(result.samples.length).toBeGreaterThan(0); }
    streams.push(stream);
  }
  expect(streams[1]).toEqual(streams[0]);
});
