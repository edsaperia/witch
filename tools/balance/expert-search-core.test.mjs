import { test } from "node:test";
import assert from "node:assert/strict";
import { startSearch, ask, tell, objective, better } from "./expert-search-core.mjs";

const space = [["distance", 1, 10], ["guards", 0, 6, true]];
const start = () => startSearch(space, { distance: 5, guards: 2 }, 713);
const score = p => [0, p.guards, 10 - Math.abs(p.distance - 7)];

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

test("wins dominate all progress; waves dominate survival; ties retain incumbent", () => {
  assert.equal(better([1, 0, 0], [0, 1e9, 1e12]), true);
  assert.equal(better([0, 2, 0], [0, 1, 1e12]), true);
  assert.equal(better([0, 2, 9], [0, 2, 9]), false);
  assert.deepEqual(objective([{ outcome: "won", wavesPassed: 3, end: 10 }, { outcome: "censored", wavesPassed: 1, end: 20 }]), [1, 4, 30]);
});

test("invalid domains, results and mismatched checkpoint replies are refused", () => {
  assert.throws(() => startSearch([], {}));
  assert.throws(() => startSearch([["x", 0, 1], ["x", 0, 2]], { x: 1 }));
  assert.throws(() => startSearch(space, { distance: 5, guards: 2.5 }));
  assert.throws(() => objective([]));
  assert.throws(() => objective([{ outcome: "lost", wavesPassed: NaN, end: 1 }]));
  const s = start(), c = ask(s);
  assert.throws(() => tell(s, { ...c, id: 3 }, [0, 0, 0]));
  assert.throws(() => tell(s, c, [NaN, 0, 0]));
  tell(s, c, [0, 0, 0]); assert.throws(() => tell(s, c, [0, 0, 0]));
});
