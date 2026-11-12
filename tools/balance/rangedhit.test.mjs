// The ranged-hit harness's checks: a shot from the real engine, aimed by the game's own rule (Ed, 2026-11-12: shots aim where she's
// going, tuning ranged) or the old one (ranged.on false), hits her standing; the old aim misses her walking across, the new one leads her.
// node --test --test-concurrency=1 tools/balance/rangedhit.test.mjs
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { openRules } from "./lib.mjs";
import { loadRules, attackFor, trial, hitRate, timeToImpact } from "./rangedhit-core.mjs";

const { load, close } = await openRules();
const R = await loadRules(load);
after(() => close());
const RULE = R.TUNING.ranged;
/** With the ranged rule as given, for one check (in memory: R.TUNING is this run's). */
const withRule = (G, f) => { R.TUNING.ranged = G; try { return f(); } finally { R.TUNING.ranged = RULE; } };

test("a young dormouse's own bolt is built as the fight builds it: its wind-up, the speed floor, reaching 2.4 times as far at her", () => {
  const a = attackFor(R, "dormouse", 1, "solo");
  assert.equal(a.spec.cast.windup, 0.6);
  assert.equal(a.spec.speed.v, RULE.speedFloor * R.TUNING.groundSpeed);
  assert.equal(a.aim, "track");
  assert.ok(Math.abs(a.fire - 20 * R.TUNING.dodge.b.range * R.TUNING.difficulty.rangedRange) < 1e-9);
  assert.equal(attackFor(R, "dormouse", 0, "solo"), null, "babies have no attack");
  assert.equal(attackFor(R, "stoat", 1, "solo"), null, "a lunge isn't ranged");
  assert.ok(attackFor(R, "stoat", 1, "pack"), "but a stoat pack's bolt is");
});

test("the old aim (ranged.on false): where she stood at the wind-up's start, so it hits her standing and misses her walking across", () => {
  withRule({ ...RULE, on: false }, () => {
    const a = attackFor(R, "dormouse", 1, "solo");
    assert.equal(a.aim, "cast"); assert.equal(a.spec.speed.v, 26);
    assert.equal(trial(R, a, { d: 15, pattern: "still" }).hit, true);
    assert.equal(trial(R, a, { d: 15, pattern: "across" }).hit, false);
    assert.equal(trial(R, a, { d: 15, pattern: "still", mode: "treetop" }).hit, false, "nothing reaches her in the treetops");
    const tti = timeToImpact(R, a, 15);
    assert.ok(tti.total > 1 && tti.walked > 20, "over a second to arrive, in which she walks over 20 m");
  });
});

test("the game's aim leads her: it hits her walking straight across, a zig-zag mostly dodges, the treetops stay safe", () => {
  const a = attackFor(R, "dormouse", 2, "solo");
  assert.equal(hitRate(R, a, "across", { n: 20, seed: 3 }).rate, 1);
  assert.ok(hitRate(R, a, "zigzag", { n: 40, seed: 3 }).rate < 0.6, "changing direction still dodges most");
  assert.equal(trial(R, a, { d: 15, pattern: "still", mode: "treetop" }).hit, false);
});
