import { test } from "node:test";
import assert from "node:assert/strict";
import { validateExecution } from "./expert-execution.mjs";
test("explicit local full-night mode is bounded, exact-case, campaign training only", () => {
  const input = { execution: "local-full-night", cap: 3300, limit: 4200, trainingOnly: true, campaignOnly: true, caseFile: "cases.json" };
  assert.doesNotThrow(() => validateExecution(input));
  for (const invalid of [{ cap: 3601 }, { limit: 4201 }, { trainingOnly: false }, { campaignOnly: false }, { caseFile: "" }, { execution: "unknown" }]) assert.throws(() => validateExecution({ ...input, ...invalid }));
  assert.throws(() => validateExecution({ ...input, execution: "pilot", limit: 121, cap: 480 }));
  assert.doesNotThrow(() => validateExecution({ ...input, execution: "pilot", limit: 120, cap: 480, trainingOnly: false }));
});
