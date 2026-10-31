import {test} from "node:test";import assert from "node:assert/strict";
import {guardedCoverageCases,GUARDED_COVERAGE_LIMITS,GUARDED_COVERAGE_GATE} from "./expert-guarded-coverage-screen.mjs";
test("guarded coverage fixes four paired cases on the KO night with both correctness fixes on",()=>{
  const cases=guardedCoverageCases([]);assert.equal(cases.length,4);
  for(let i=0;i<4;i+=2){const{vector:a,guardedCoverageExploration:ag,...left}=cases[i],{vector:b,guardedCoverageExploration:bg,...right}=cases[i+1];assert.deepEqual(left,right);assert.deepEqual([a,b],["off","on"]);assert.deepEqual([ag,bg],[false,true]);
    assert.equal(left.seed,24757);assert.equal(left.worldSeed,0);assert.equal(left.island,"home");assert.equal(left.bpm,100);assert.equal(left.limit,300);assert.equal(left.questMax,1);assert.equal(left.rememberDreamVisits,true);assert.equal(left.questDeliveryRepair,true);assert.equal(left.knownQuestPriority,false);assert.equal(left.coverageExploration,false);assert.equal(left.bag,"satchel");assert.equal(left.hat,"none");assert.equal(left.wearsHat,false);assert.deepEqual(left.parts,[]);}
  assert.deepEqual(cases.map(c=>c.condition),["matched","matched","home-everything","home-everything"]);
});
test("guarded coverage refuses protected input and fixes its eight-minute gate without tuning",()=>{
  assert.throws(()=>guardedCoverageCases(null),/required/);assert.throws(()=>guardedCoverageCases([{worldSeed:0,nightSeed:24757}]),/protected/);
  assert.equal(GUARDED_COVERAGE_LIMITS.preflightSeconds+GUARDED_COVERAGE_LIMITS.workerSeconds,480);assert.equal(GUARDED_COVERAGE_LIMITS.wholeJobSeconds,480);
  assert.equal(GUARDED_COVERAGE_GATE,"Total fully-seen cells rise, neither condition's coverage falls, no extra KO or loss in either pair; otherwise stop, with no tuning. Report minimum HP for each case alongside.");
});
