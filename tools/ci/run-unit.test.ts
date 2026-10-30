import { describe, expect, it, vi } from "vitest";
import path from "node:path";
// @ts-expect-error plain JavaScript CI runner
import { runTests, selectedTests } from "./run-unit.mjs";

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
});
