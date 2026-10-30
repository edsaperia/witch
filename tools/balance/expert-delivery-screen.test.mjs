import { test } from "node:test";
import assert from "node:assert/strict";
import { deliveryCases, DELIVERY_SCREEN_LIMITS, DELIVERY_SCREEN_GATE } from "./expert-delivery-screen.mjs";
test("delivery correctness screen fixes one matched off/on pair with priority and coverage off",()=>{
  const [off,on]=deliveryCases([]),{vector:a,questDeliveryRepair:ap,...left}=off,{vector:b,questDeliveryRepair:bp,...right}=on;
  assert.deepEqual([a,b],["off","on"]);assert.deepEqual([ap,bp],[false,true]);assert.deepEqual(left,right);
  assert.equal(left.seed,32676);assert.equal(left.worldSeed,0);assert.equal(left.island,"home");assert.equal(left.condition,"home-everything");
  assert.equal(left.bpm,100);assert.equal(left.limit,120);assert.equal(left.questMax,1);assert.equal(left.rememberDreamVisits,true);
  assert.equal(left.knownQuestPriority,false);assert.equal(left.coverageExploration,false);assert.equal(left.bag,"satchel");
  assert.equal(left.hat,"none");assert.equal(left.wearsHat,false);assert.deepEqual(left.parts,[]);
});
test("delivery screen refuses protected pairs and fixes five-minute budget and exact gate",()=>{
  assert.throws(()=>deliveryCases([{worldSeed:0,nightSeed:32676}]),/protected/);assert.throws(()=>deliveryCases(null),/required/);
  assert.equal(DELIVERY_SCREEN_LIMITS.preflightSeconds+DELIVERY_SCREEN_LIMITS.workerSeconds,300);assert.equal(DELIVERY_SCREEN_LIMITS.wholeJobSeconds,300);
  assert.equal(DELIVERY_SCREEN_GATE,"Gate: OFF reproduces stall,ON completes actualwolf297quest by120,no addedKO/loss/contractviolation; otherwise stop.");
});
