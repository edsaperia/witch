import { describe, expect, it, vi } from "vitest";
import path from "node:path";
// @ts-expect-error plain JavaScript CI runner
import { balancedSelection, balancedShards, parseShard, runTests, selectedTests } from "./run-unit.mjs";
// @ts-expect-error plain JavaScript timing refresh tool
import { reportTimings } from "./unit-timings.mjs";

const scope = { mode: "related", base: "abc", reason: "small PR" }, file = path.resolve("src/render/character.test.ts");
describe("CI related-test execution safety", () => {
  it("locally runs exactly the resolved related files once with one worker", () => {
    const selection = selectedTests(scope, () => JSON.stringify([{ file }, { file }]));
    expect(selection.tests).toEqual(["src/render/character.test.ts"]);
    const run = vi.fn(() => ({ status: 0 }));
    expect(runTests(selection, run)).toEqual({ status: 0 });
    expect(run).toHaveBeenCalledExactlyOnceWith(["run", "src/render/character.test.ts", "--maxWorkers=1"]);
  });
  it.each(["[]", "not json", "{}", '[{"file":"../outside.test.ts"}]', '[{"file":"-malformed"}]'])("falls back to all tests for %s", output => {
    expect(selectedTests(scope, () => output)).toMatchObject({ mode: "full", tests: [] });
  });
  it("falls back if module-graph selection itself throws", () => {
    expect(selectedTests(scope, () => { throw Error("broken import graph"); })).toMatchObject({ mode: "full", tests: [] });
  });
  it("does not hide a failing selected test by rerunning the full suite", () => {
    const run = vi.fn(() => ({ status: 1 }));
    expect(runTests({ tests: ["src/render/character.test.ts"] }, run).status).toBe(1);
    expect(run).toHaveBeenCalledTimes(1);
  });
  it("full runs do not invoke the related selector or permit empty suites", () => {
    const list = vi.fn(), run = vi.fn(() => ({ status: 0 }));
    const selection = selectedTests({ mode: "full", reason: "release check" }, list);
    runTests(selection, run);
    expect(list).not.toHaveBeenCalled();
    expect(run).toHaveBeenCalledExactlyOnceWith(["run", "--maxWorkers=1"]);
  });
  it.each([{ tests: [] }, { tests: ["src/render/character.test.ts"] }])("CI keeps its configured parallelism for $tests", ({ tests }) => {
    const run = vi.fn(() => ({ status: 0 }));
    runTests({ tests }, run, true);
    expect(run).toHaveBeenCalledExactlyOnceWith(["run", ...tests]);
  });
  it("full CI runs pass the shard to Vitest so every file runs in exactly one shard", () => {
    const run = vi.fn(() => ({ status: 0 }));
    runTests({ tests: [] }, run, true, parseShard("2/4"));
    expect(run).toHaveBeenCalledExactlyOnceWith(["run", "--shard=2/4"]);
  });
  it("a related selection runs entirely in shard 1; other shards never start an empty Vitest run", () => {
    const run = vi.fn(() => ({ status: 3 })), tests = ["src/render/character.test.ts"];
    expect(runTests({ tests }, run, true, parseShard("1/4")).status).toBe(3);
    expect(run).toHaveBeenCalledExactlyOnceWith(["run", ...tests]);
    run.mockClear();
    expect(runTests({ tests }, run, true, parseShard("3/4"))).toEqual({ status: 0, skipped: true });
    expect(run).not.toHaveBeenCalled();
  });
  it.each(["", undefined])("no shard env means the unsharded run (%s)", value => expect(parseShard(value)).toBeNull());
  it.each(["0/4", "5/4", "2", "a/b", "1/0"])("rejects a malformed shard %s instead of skipping tests", value => {
    expect(() => parseShard(value)).toThrow(/invalid VITEST_SHARD/);
  });
  it("splits the full suite by measured time: every file exactly once, deterministically, the slowest alone", () => {
    const files = ["a.test.ts", "b.test.ts", "c.test.ts", "d.test.ts", "e.test.ts", "f.test.ts", "new.test.ts"];
    const seconds = { "a.test.ts": 300, "b.test.ts": 40, "c.test.ts": 40, "d.test.ts": 40, "e.test.ts": 20, "f.test.ts": 10 };
    const split = balancedShards(files, seconds, 3);
    expect(split.flatMap((s: any) => s.files).sort()).toEqual([...files].sort());
    expect(split.find((s: any) => s.files.includes("a.test.ts")).files).toEqual(["a.test.ts"]);
    expect(balancedShards([...files].reverse(), seconds, 3)).toEqual(split);
    expect(balancedShards(files, {}, 2).flatMap((s: any) => s.files).sort()).toEqual([...files].sort());
  });
  it("balances only full sharded runs, never hands Vitest an empty filter, and falls back to its own --shard", () => {
    const full = { mode: "full", reason: "release", tests: [] }, shard = parseShard("2/2"), list = () => ["x.test.ts", "y.test.ts"];
    const mine = balancedSelection(full, shard, list, { "x.test.ts": 5, "y.test.ts": 1 });
    expect(mine.tests).toEqual(["y.test.ts"]);
    expect(runTests(mine, (a: string[]) => ({ status: 0, args: a }), true, shard)).toEqual({ status: 0, args: ["run", "y.test.ts"] });
    expect(balancedSelection({ ...full, mode: "related" }, shard, list, {})).toBeNull();
    expect(balancedSelection(full, null, list, {})).toBeNull();
    expect(balancedSelection(full, parseShard("3/3"), list, {})).toBeNull(); // (two files, three shards: shard 3 would be empty)
    expect(balancedSelection(full, shard, () => { throw Error("list failed"); }, {})).toBeNull();
  });
  it("keeps the measured timings in step with the real test files", async () => {
    const fs = await import("node:fs"), seconds = JSON.parse(fs.readFileSync("tools/ci/unit-timings.json", "utf8")).seconds;
    for (const f of Object.keys(seconds)) expect(f).toMatch(/\.test\.ts$/);
    expect(seconds["src/rules/combat/packsLull1.test.ts"]).toBeGreaterThan(0);
  });
  it("does not hide extra heavy work underneath the longest file", () => {
    const files = ["a.test.ts", "b.test.ts", "c.test.ts", "d.test.ts", "e.test.ts"];
    const seconds = Object.fromEntries(files.map((f, i) => [f, [100, 80, 70, 60, 50][i]]));
    const split = balancedShards(files, seconds, 2);
    const totals = split.map((s: any) => s.files.reduce((sum: number, f: string) => sum + seconds[f], 0));
    expect(Math.max(...totals) - Math.min(...totals)).toBeLessThanOrEqual(40);
    expect(split.flatMap((s: any) => s.files).sort()).toEqual(files);
  });
  it("refreshes portable cloud timings and rejects failures, duplicate files and invalid durations", () => {
    const report = { success: true, testResults: [{ name: "/home/runner/work/witch/witch/src/rules/a.test.ts", status: "passed", startTime: 1000, endTime: 2500 }] };
    expect(reportTimings(JSON.stringify(report))).toEqual({ "src/rules/a.test.ts": 1.5 });
    expect(() => reportTimings(JSON.stringify({ ...report, success: false }))).toThrow();
    expect(() => reportTimings(JSON.stringify({ ...report, testResults: [...report.testResults, ...report.testResults] }))).toThrow(/Duplicate/);
    expect(() => reportTimings(JSON.stringify({ ...report, testResults: [{ ...report.testResults[0], endTime: 0 }] }))).toThrow(/Invalid/);
    expect(reportTimings("unit tests (1/4)\tSTEP\tdate ✓ src/rules/a.test.ts (2 tests) 1234ms", true)).toEqual({ "src/rules/a.test.ts": 1.234 });
  });
});
