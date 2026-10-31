import { test } from "node:test";
import assert from "node:assert/strict";
import { knownQuestCases, KNOWN_QUEST_SCREEN_LIMITS, KNOWN_QUEST_SCREEN_DECISION } from "./expert-known-quest-screen.mjs";
test("known-quest screen fixes two paired nights, alternating order and every other control", () => {
  const cases = knownQuestCases([]);
  assert.equal(cases.length, 4);
  assert.deepEqual(cases.map(c => [c.seed, c.vector]), [[1000,"off"],[1000,"on"],[32676,"on"],[32676,"off"]]);
  for (let i = 0; i < 4; i += 2) {
    const { vector: a, knownQuestPriority: ap, ...left } = cases[i], { vector: b, knownQuestPriority: bp, ...right } = cases[i+1];
    assert.deepEqual(left, right); assert.notEqual(ap, bp); assert.notEqual(a,b);
    assert.equal(left.condition, "home-everything"); assert.equal(left.worldSeed,0); assert.equal(left.island,"home");
    assert.equal(left.bpm,100); assert.equal(left.questMax,1); assert.equal(left.limit,600);
    assert.equal(left.rememberDreamVisits,true); assert.equal(left.coverageExploration,false);
    assert.equal(left.bag,"satchel"); assert.equal(left.hat,"none"); assert.equal(left.wearsHat,false); assert.deepEqual(left.parts,[]);
  }
});
test("known-quest screen refuses either protected pair before producing cases", () => {
  for (const nightSeed of [1000,32676]) assert.throws(() => knownQuestCases([{ worldSeed:0, nightSeed }]), /protected/);
  assert.throws(() => knownQuestCases(null), /required/);
});
test("known-quest screen fixes ten-minute budget and actual-completion disposition", () => {
  assert.equal(KNOWN_QUEST_SCREEN_LIMITS.preflightSeconds + KNOWN_QUEST_SCREEN_LIMITS.workerSeconds,600);
  assert.equal(KNOWN_QUEST_SCREEN_LIMITS.wholeJobSeconds,600);
  assert.match(KNOWN_QUEST_SCREEN_DECISION,/at least one actual quest completion/);
  assert.match(KNOWN_QUEST_SCREEN_DECISION,/preserves every OFF win/);
  assert.match(KNOWN_QUEST_SCREEN_DECISION,/does not worsen KO\/loss totals/);
  assert.match(KNOWN_QUEST_SCREEN_DECISION,/no automatic repeat or parameter search/);
});
