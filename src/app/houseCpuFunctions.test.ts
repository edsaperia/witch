import { expect, it } from "vitest";
import { attributeCpu } from "../../tools/bench/house-cpu-functions.mjs";
it("clips sample weights to the actual frame window and keeps parent/child totals separate", () => {
  const profile = { startTime: 0, nodes: [{ id: 1, callFrame: { functionName: "house" }, children: [2] }, { id: 2, callFrame: { functionName: "bake" } }], samples: [2, 2, 1], timeDeltas: [1000, 1000, 1000] };
  const r = attributeCpu(profile, [{ start: 500, end: 1500, group: "early" }, { start: 2000, end: 3000, group: "later" }]);
  expect(r.groups.early.sampledMs).toBe(1); expect(r.groups.early.self[0]).toMatchObject({ key: "bake", ms: 1 });
  expect(r.groups.early.inclusive.find((r: { key: string; ms: number }) => r.key === "house")?.ms).toBe(1);
  expect(r.groups.later.self[0]).toMatchObject({ key: "house", ms: 1 });
});
it("does not double-count a recursive parent and keeps small negative sample deltas from adding time", () => {
  const profile = { startTime: 0, nodes: [{ id: 1, callFrame: { functionName: "same" }, children: [2] }, { id: 2, callFrame: { functionName: "same" } }], samples: [2, 2, 2], timeDeltas: [1000, -1, 1001] };
  const r = attributeCpu(profile, [{ start: 0, end: 2000, group: "all" }]);
  expect(r.negativeDeltas).toBe(1); expect(r.groups.all.inclusive).toHaveLength(1);
  expect(r.groups.all.inclusive[0].ms).toBeCloseTo(2);
});
