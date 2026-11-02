// Integrity assertions only. Scenario outcomes are reported by report-fixture-sanity.mjs.
import assert from "node:assert/strict";

export function verifyReportReplay(r) {
  const c = { seed: 1000, island: "home", bpm: 120, bag: "satchel", bot: "sloppy" };
  const first = r.run(c, 30);
  r.run({ ...c, bot: "skilled", bag: "purse", bpm: 200 }, 5);
  assert.deepEqual(r.run(c, 30), first);
  const expertCase = { ...c, bot: "expert", hat: "none", wearsHat: false, parts: [] };
  const expert = r.run(expertCase, 5);
  assert.deepEqual(r.run(expertCase, 5), expert);
  assert.ok(Math.abs(Object.values(first.phases).reduce((s, p) => s + p.seconds, 0) - first.end) < 1e-8);
  const stun = { seed: 1000, bpm: 100, bag: "tote", species: "fox", level: 1 };
  const a = r.stun(stun, 15, 10), b = r.stun(stun, 15, 10);
  assert.deepEqual(a, b);
  assert.equal(a.fixture, "active-party-after-intro-v2");
}
