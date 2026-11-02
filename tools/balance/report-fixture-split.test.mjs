// Cheap synthetic checks; no runtime, generated game, Vite server or simulation.
import { test } from "node:test";
import assert from "node:assert/strict";
import { collectFixtureSanity } from "./report-fixture-sanity.mjs";
import { verifyReportReplay } from "./report-replay.mjs";

function runner() {
  const calls = [];
  return {
    calls,
    run(c, limit) { calls.push({ kind: "run", ...c, limit }); return { outcome: "won", end: limit, phases: { opening: { seconds: limit } } }; },
    stun(c, limit, distance) { calls.push({ kind: "stun", ...c, limit, distance }); return { stunned: false, hits: 0, retaliation: 0, fixture: "active-party-after-intro-v2" }; },
  };
}

test("all four false scenario predicates are report data, not failed integrity assertions", () => {
  const r = runner(), report = collectFixtureSanity(r);
  assert.equal(report.predicates.length, 4);
  assert.ok(report.predicates.every(p => p.matchesReference === false));
  assert.deepEqual(report.cases.map(c => [c.id, c.limit, c.distance]), [["first-run", 30, undefined], ["fox-stun", 15, 10], ["active-boar", 30, 10]]);
  assert.doesNotThrow(() => verifyReportReplay(r));
});

test("replay still rejects drift, broken accounting and a changed fixture identity", () => {
  for (const defect of ["run", "expert", "stun", "accounting", "fixture"]) {
    const r = runner(), run = r.run, stun = r.stun;
    let n = 0;
    r.run = (c, limit) => {
      const row = run(c, limit);
      if (defect === "run" || defect === "expert" && c.bot === "expert") row.sequence = n++;
      if (defect === "accounting") row.end++;
      return row;
    };
    r.stun = (...args) => { const row = stun(...args); if (defect === "stun") row.sequence = n++; if (defect === "fixture") row.fixture = "unexpected"; return row; };
    assert.throws(() => verifyReportReplay(r), assert.AssertionError, defect);
  }
});

test("replay keeps the original interleaving, horizons and loadouts", () => {
  const r = runner(); verifyReportReplay(r);
  const base = { seed: 1000, island: "home", bpm: 120, bag: "satchel", bot: "sloppy" };
  const expert = { ...base, bot: "expert", hat: "none", wearsHat: false, parts: [] };
  const stun = { seed: 1000, bpm: 100, bag: "tote", species: "fox", level: 1 };
  assert.deepEqual(r.calls, [
    { kind: "run", ...base, limit: 30 },
    { kind: "run", ...base, bot: "skilled", bag: "purse", bpm: 200, limit: 5 },
    { kind: "run", ...base, limit: 30 },
    { kind: "run", ...expert, limit: 5 }, { kind: "run", ...expert, limit: 5 },
    { kind: "stun", ...stun, limit: 15, distance: 10 }, { kind: "stun", ...stun, limit: 15, distance: 10 },
  ]);
});

test("malformed observations and execution failures remain errors", () => {
  const bad = runner(); bad.stun = () => ({ stunned: false, hits: NaN, retaliation: 0 });
  assert.throws(() => collectFixtureSanity(bad), /malformed observations/);
  const failed = runner(); failed.run = () => { throw Error("runner failed"); };
  assert.throws(() => collectFixtureSanity(failed), /runner failed/);
});
