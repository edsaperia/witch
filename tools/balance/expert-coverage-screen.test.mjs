import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { COVERAGE_SCREEN_NIGHTS, COVERAGE_SCREEN_LIMITS, COVERAGE_SCREEN_DECISION, finalCoverageCases } from "./expert-coverage-screen.mjs";
const held = JSON.parse(readFileSync(new URL("../../docs/notes/expert-held-out-pairs.json", import.meta.url), "utf8"));
test("final coverage matrix is sixteen exact paired cases with alternating arm order and visits on", () => {
  const cases = finalCoverageCases(held);
  assert.equal(cases.length, 16); assert.deepEqual([...new Set(cases.map(c => c.seed))], [16838,24757,32676,40595]);
  for (let i = 0; i < cases.length; i += 2) {
    const { vector: av, coverageExploration: ae, ...a } = cases[i], { vector: bv, coverageExploration: be, ...b } = cases[i + 1];
    assert.deepEqual(a, b); assert.notEqual(ae, be);
    assert.deepEqual([av,bv], Math.floor(i / 4) % 2 ? ["on","off"] : ["off","on"]);
    assert.equal(a.rememberDreamVisits, true); assert.equal(a.limit, 300); assert.equal(a.worldSeed, 0);
    assert.equal(a.island, "home"); assert.equal(a.bpm, 100); assert.equal(a.bag, "satchel");
    assert.equal(a.hat, "none"); assert.equal(a.wearsHat, false); assert.deepEqual(a.parts, []);
  }
  assert.equal(cases.filter(c => c.condition === "matched").length, 8);
  assert.equal(cases.filter(c => c.condition === "home-everything").length, 8);
});
test("every final-screen night is refused if protected; missing protection input is refused", () => {
  for (const nightSeed of COVERAGE_SCREEN_NIGHTS) assert.throws(() => finalCoverageCases([...held, { worldSeed: 0, nightSeed }]), /protected/);
  assert.throws(() => finalCoverageCases(null), /required/);
});
test("screen fixes the ten-minute whole-job budget and preserves the pre-registered decision verbatim", () => {
  assert.equal(COVERAGE_SCREEN_LIMITS.preflightSeconds + COVERAGE_SCREEN_LIMITS.workerSeconds, 600);
  assert.equal(COVERAGE_SCREEN_LIMITS.wholeJobSeconds, 600);
  assert.equal(COVERAGE_SCREEN_DECISION, "Proceed to later full-night validation only if total learned requests improves, total seen does not fall, neither condition loses requests, and KO/loss totals do not worsen. Otherwise drop the tactic; no repeated parameter search.");
});
