// The ranged-hit harness's checks: a shot from the real engine hits her standing, misses her walking across, leads her when asked.
// node --test --test-concurrency=1 tools/balance/rangedhit.test.mjs
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { openRules } from "./lib.mjs";
import { loadRules, attackFor, applyVariant, trial, hitRate, timeToImpact } from "./rangedhit-core.mjs";

const { load, close } = await openRules();
const R = await loadRules(load);
after(() => close());

test("a young dormouse's own bolt is built as the fight builds it: its wind-up, its speed, reaching 2.4 times as far at her", () => {
  const a = attackFor(R, "dormouse", 1, "solo");
  assert.equal(a.spec.cast.windup, 0.6);
  assert.equal(a.spec.speed.v, 26);
  assert.equal(a.aim, "cast");
  assert.ok(Math.abs(a.fire - 20 * R.TUNING.dodge.b.range * R.TUNING.difficulty.rangedRange) < 1e-9);
  assert.equal(attackFor(R, "dormouse", 0, "solo"), null, "babies have no attack");
  assert.equal(attackFor(R, "stoat", 1, "solo"), null, "a lunge isn't ranged");
  assert.ok(attackFor(R, "stoat", 1, "pack"), "but a stoat pack's bolt is");
});

test("aimed where she stood at the wind-up's start: it hits her standing and misses her walking across", () => {
  const a = attackFor(R, "dormouse", 1, "solo");
  assert.equal(trial(R, a, { d: 15, pattern: "still" }).hit, true);
  assert.equal(trial(R, a, { d: 15, pattern: "across" }).hit, false);
  assert.equal(trial(R, a, { d: 15, pattern: "still", mode: "treetop" }).hit, false, "nothing reaches her in the treetops");
  const tti = timeToImpact(R, a, 15);
  assert.ok(tti.total > 1 && tti.walked > 20, "over a second to arrive, in which she walks over 20 m");
});

test("in memory, leading her fully at release hits her walking straight across, and nothing is changed for the next run", () => {
  const a = attackFor(R, "dormouse", 2, "solo"), led = applyVariant(R, a, 2, { lead: { 1: 0.5, 2: 1 }, commit: 0.2 });
  assert.equal(led.aim, "release"); assert.equal(led.lead, 1);
  assert.equal(hitRate(R, led, "across", { n: 20, seed: 3 }).rate, 1);
  assert.ok(hitRate(R, led, "zigzag", { n: 40, seed: 3 }).rate < 0.6, "changing direction still dodges most");
  assert.equal(attackFor(R, "dormouse", 2, "solo").aim, "cast", "the game's own attack is as it was");
});
