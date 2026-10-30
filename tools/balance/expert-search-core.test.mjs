import { test } from "node:test";
import assert from "node:assert/strict";
import { startSearch, ask, tell, objective, better } from "./expert-search-core.mjs";

const space = [["distance", 1, 10], ["guards", 0, 6, true]];
const start = () => startSearch(space, { distance: 5, guards: 2 }, 713);
const score = p => [0, 0, 0, 0, 0, 0, p.guards, 10 - Math.abs(p.distance - 7)];

test("a serialized pending evaluation resumes the exact search trajectory", () => {
  let interrupted = start(); const uninterrupted = start();
  for (let i = 0; i < 60; i++) {
    const a = ask(uninterrupted), b = ask(interrupted);
    assert.deepEqual(a, b);
    interrupted = JSON.parse(JSON.stringify(interrupted));
    assert.deepEqual(ask(interrupted), b);
    assert.deepEqual(ask(interrupted), b);
    tell(uninterrupted, a, score(a.point)); tell(interrupted, b, score(b.point));
    assert.deepEqual(interrupted, uninterrupted);
    for (const [name, lo, hi, integer] of space) { assert.ok(a.point[name] >= lo && a.point[name] <= hi); if (integer) assert.ok(Number.isInteger(a.point[name])); }
  }
});

test("completed priorities dominate every lower partial-progress reward", () => {
  for (let priority = 0; priority < 4; priority++) {
    const a = Array(8).fill(0), b = Array(8).fill(0); a[priority] = 1;
    for (let i = priority + 1; i < 8; i++) b[i] = 1e12;
    assert.equal(better(a, b), true);
  }
  assert.equal(better([0, 0, 0, 0, 0, 0, 2, 9], [0, 0, 0, 0, 0, 0, 2, 9]), false);
  assert.deepEqual(objective([{ outcome: "won", questsCompleted: 1, questsTotal: 1, upgradeEligibleToKeep: true, provisionalFindsCollected: 1, questDeliveries: 1, wavesPassed: 3, end: 10 }, { outcome: "censored", questsCompleted: 0, questsTotal: 2, upgradeEligibleToKeep: false, provisionalFindsCollected: 1, questDeliveries: 1, wavesPassed: 1, end: 20 }]), [1, 1, 1, 1, 2, 2, 1, 10]);
});

test("equal wins prefer faster completion while non-wins prefer longer survival", () => {
  const row = { outcome: "won", questsCompleted: 0, questsTotal: 2, upgradeEligibleToKeep: false, provisionalFindsCollected: 0, questDeliveries: 0, wavesPassed: 0, end: 100 };
  assert.equal(better(objective([row]), objective([{ ...row, wavesPassed: 9, end: 1000 }])), true);
  for (const outcome of ["lost", "censored"]) {
    assert.equal(better(objective([{ ...row, outcome, end: 1000 }]), objective([{ ...row, outcome }])), true);
    assert.equal(better(objective([{ ...row, outcome, wavesPassed: 2 }]), objective([{ ...row, outcome, wavesPassed: 1, end: 1000 }])), true);
  }
});

test("invalid domains, results and mismatched checkpoint replies are refused", () => {
  assert.throws(() => startSearch([], {}));
  assert.throws(() => startSearch([["x", 0, 1], ["x", 0, 2]], { x: 1 }));
  assert.throws(() => startSearch(space, { distance: 5, guards: 2.5 }));
  assert.throws(() => objective([]));
  assert.throws(() => objective([{ outcome: "lost", wavesPassed: NaN, end: 1 }]));
  const s = start(), c = ask(s);
  assert.throws(() => tell(s, { ...c, id: 3 }, Array(8).fill(0)));
  assert.throws(() => tell(s, c, [NaN, 0, 0, 0, 0, 0, 0, 0]));
  tell(s, c, Array(8).fill(0)); assert.throws(() => tell(s, c, Array(8).fill(0)));
  assert.throws(() => better(Array(6).fill(0), null), /Invalid objective/);
});
