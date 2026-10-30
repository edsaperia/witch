// Static survey design/merge/leakage tests; no engine, browser, training or survey simulations.
// node --test --test-concurrency=1 tools/balance/survey.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { makeDesign, validateDesign, cells, shards, digest, mapPair, validateLock, validateRow, mergeData, weakCells, selected, catalogue, contractCase, normalize, waveOne, deepenSelection } from "./survey.mjs";

const mini = { islands: ["home", "fox"], species: ["fox"], hats: ["none", "helmet"], bags: ["satchel", "tote"], parts: ["missile"] };
const m = { ...makeDesign(mini)[0], islands: ["home"], bots: ["expert"], bpms: [100], maps: [mapPair(0), mapPair(1)], shardKind: "island-map" };
const good = () => ({ status: "ok", outcome: "won", durationPlayer: 100, durationWorld: 95, knockdowns: 0, waveReached: 2, wavesPassed: 1, rangedSeconds: 1, eligibleSeconds: 90, quests: { completed: 1, total: 1 }, permanentFind: { available: true, found: true, kept: true }, expertParameters: { kite: 9 }, expertAudit: "bounded-observation-v1" });
const meta = shard => ({ manifestHash: digest(m), selectionHash: null, sourceCommit: "a".repeat(40), sourceFingerprint: "b".repeat(64), expertModelHash: "c".repeat(64), adapterHash: "d".repeat(64), expertAudit: "bounded-observation-v1", expertParameters: { kite: 9 }, shard });
const data = () => shards(m).map(s => [{ survey: meta(s.id) }, ...s.cases.map(c => ({ key: c.key, case: c, result: good() }))]);
const lock = (modelPatch={}) => {
  const body={schema:1,sourceFingerprint:"b".repeat(64),parameters:{kite:9},heldOutPairs:[mapPair(200)],observation:"approximate fair observation",humanLimits:{reactionSeconds:0.25,inputHz:8,aimErrorMetres:1},...modelPatch};
  return { expertTrained:true,sourceCommit:"a".repeat(40),searchRound:1,trainingPairs:[mapPair(100)],modelLock:{...body,modelSha256:digest(body)} };
};

test("every frozen production cell has exactly one cloud shard, including census ages and gear", () => {
  const ms = makeDesign(catalogue()), counts = validateDesign(ms);
  assert.deepEqual(counts.map(c => [c.study, c.cases, c.shards]), [["ladder",2600,65],["tempo",225,15],["equipment",320,40],["census",12800,64],["map-luck",30,6]]);
  assert.equal(counts.reduce((s,c) => s+c.cases,0), 15975);
  const eq = ms.find(x=>x.id==="equipment");
  assert.equal(eq.loadouts.length, 32); assert.equal(eq.loadouts.filter(l=>l.id==="plain").length,1);
  assert.equal(eq.loadouts.filter(l=>l.hat!=="none").length,14);
  assert.ok(eq.loadouts.every(l=>l.parts.length<=1));
  assert.deepEqual(ms.find(x=>x.id==="census").levels,[0,1,2,3]);
  assert.ok(cells(ms[0]).filter(c=>c.bot!=="expert").every(c=>c.observationAccess==="privileged-state"));
  const jobs=JSON.parse(readFileSync(new URL("./surveys/cloud-shards.json",import.meta.url),"utf8"));
  assert.equal(jobs.length,190);assert.equal(new Set(jobs.map(j=>j.shard)).size,190);
  const specs=new Map(ms.flatMap(study=>shards(study).map(s=>[s.id,{...s,study:study.id}])));
  for(const j of jobs){const s=specs.get(j.shard);assert.equal(j.study,s.study);assert.equal(j.cases,s.cases.length);assert.deepEqual(j.seedPairs,s.seedPairs);assert.ok(j.command.includes(`--shard ${s.id}`));assert.ok(j.command.includes(`--out results/${s.study}/${s.id}.jsonl`));}
});

test("untrained experts, first-round leakage and final-heldout contamination fail closed", () => {
  const l=lock(); validateLock(m,l);
  assert.throws(()=>validateLock(m,{...l,expertTrained:false}),/gated/);
  assert.throws(()=>validateLock(m,{...l,trainingPairs:[mapPair(0)]}),/first expert/);
  validateLock(m,{...l,searchRound:2,trainingPairs:[mapPair(0)]});
  assert.throws(()=>validateLock(m,{...l,searchRound:2,trainingPairs:[mapPair(200)]}),/Final held-out/);
  assert.throws(()=>validateLock(m,lock({heldOutPairs:[mapPair(0)]})),/Final held-out/);
});

test("wave one covers every axis in 24 budgeted shards with distinct short-horizon keys",()=>{
  const full=makeDesign(catalogue()),ws=waveOne(full),stats=validateDesign(ws);
  assert.deepEqual(stats.map(s=>[s.study,s.cases,s.shards]),[["ladder",520,13],["tempo",45,3],["equipment",64,2],["census",2560,5],["map-luck",5,1]]);
  assert.equal(stats.reduce((s,r)=>s+r.cases,0),3194);
  const jobs=JSON.parse(readFileSync(new URL("./surveys/wave1/cloud-shards.json",import.meta.url),"utf8"));
  assert.equal(jobs.length,24);assert.equal(jobs.length*50/60,20);
  assert.ok(jobs.every(j=>j.command.startsWith("timeout --signal=INT 50m node ")&&j.command.includes("--budget-seconds 2940")));
  const fullKeys=new Set(full.flatMap(cells).map(c=>c.key));assert.ok(ws.flatMap(cells).every(c=>!fullKeys.has(c.key)));
  assert.equal(ws.reduce((s,x)=>s+x.runtimeEstimate.oneCoreHoursBase,0).toFixed(2),"16.28");
});

test("case/JSONL translation follows createCaseRunner contract, preserving exact external evaluations", () => {
  const c=cells(m)[0], model=lock().modelLock, input=contractCase(c);
  assert.deepEqual(Object.keys(input).sort(),["kind","worldSeed","nightSeed","island","bpm","bag","hat","broomPart","condition","limit","bot"].sort());
  assert.equal(input.kind,"run");assert.equal(input.broomPart,null);
  const external={schema:1,status:"ok",case:input,modelSha256:model.modelSha256,sourceFingerprint:model.sourceFingerprint,parameters:model.parameters,result:{...good(),playerEnd:100,end:95,questsCompleted:1,questsTotal:1,upgradeFound:true,upgradeEligibleToKeep:true,upgradePersisted:false}};
  const normalized=normalize(c,external,model);
  assert.deepEqual(normalized.expertEvaluation,external);assert.equal(normalized.permanentFind.persisted,false);
  validateRow(c,{key:c.key,case:c,result:normalized});
  const sloppy={...c,bot:"sloppy"},unsupported=normalize(sloppy,{status:"unsupported",case:contractCase(sloppy),modelSha256:model.modelSha256,reason:"Unsupported survey bot"},model);
  assert.equal(unsupported.status,"unsupported");
  const f=cells(makeDesign(mini).find(x=>x.id==="census")).find(x=>x.level===3), fc=contractCase(f);
  assert.equal(fc.condition,"home-everything");assert.equal(fc.kind,"stun");
  assert.throws(()=>normalize(f,{status:"ok",case:fc,modelSha256:model.modelSha256,sourceFingerprint:model.sourceFingerprint,result:{actualRank:3,actualBoss:false}},model),/legend/);
});

test("merge refuses duplicates, wrong cells, missing shards, missing progression and model drift", () => {
  const ds=data(); assert.equal(mergeData(m,ds).length,3);
  assert.throws(()=>mergeData(m,[ds[0],ds[0],ds[1]]),/duplicate/);
  assert.throws(()=>mergeData(m,[ds[0]]),/Incomplete/);
  const partial=mergeData(m,[ds[0]],undefined,true);assert.equal(partial[0].survey.complete,false);assert.equal(partial[0].survey.missingKeys.length,1);assert.equal(partial.length,2);
  const drift=data(); drift[1][0].survey.expertModelHash="e".repeat(64); assert.throws(()=>mergeData(m,drift),/mismatch/);
  const wrong=data(); wrong[0][1].case={...wrong[0][1].case,bpm:220}; assert.throws(()=>mergeData(m,wrong),/differs/);
  const progress=data(); delete progress[0][1].result.quests; assert.throws(()=>mergeData(m,progress),/quests/);
  const vector=data(); vector[0][1].result.expertParameters={kite:100}; assert.throws(()=>mergeData(m,vector),/vector/);
});

test("wave-two depth is selected from actual map-luck spread, not an automatic full matrix",()=>{
  const full=makeDesign(mini),ws=waveOne(full),fm=full.find(x=>x.id==="tempo"),wm=ws.find(x=>x.id==="tempo"),lm=ws.find(x=>x.id==="map-luck");
  const merged=x=>[{survey:{...meta("merged"),manifestHash:digest(x),complete:true}},...cells(x).map(c=>({key:c.key,case:c,result:good()}))];
  const first=merged(wm),spread=merged(lm);first[1].result={...good(),outcome:"lost",permanentFind:{available:true,found:true,kept:false}};
  const low=deepenSelection(fm,wm,first,spread,lm);assert.equal(low.mapDepth,3);assert.equal(selected(fm,low).length,6);assert.equal(low.selectionKind,"deepen");
  spread[1].result={...good(),outcome:"lost",permanentFind:{available:true,found:true,kept:false}};
  const high=deepenSelection(fm,wm,first,spread,lm);assert.equal(high.mapDepth,5);assert.equal(selected(fm,high).length,10);
  first[0].survey.complete=false;assert.throws(()=>deepenSelection(fm,wm,first,spread,lm),/Complete wave-one/);
});

test("unsupported is explicit; fixture progression N/A and unresolved retention never become fake zeros", () => {
  const c=cells(m)[0]; validateRow(c,{key:c.key,case:c,result:{status:"unsupported",reason:"hat controller missing"}});
  assert.throws(()=>validateRow(c,{key:c.key,case:c,result:{status:"unsupported"}}),/reason/);
  validateRow(c,{key:c.key,case:c,result:{...good(),outcome:"censored",permanentFind:{available:true,found:true,kept:null}}});
  assert.throws(()=>validateRow(c,{key:c.key,case:c,result:{...good(),outcome:"lost"}}),/permanent-find/);
  const f=cells(makeDesign(mini).find(x=>x.id==="census"))[0];
  validateRow(f,{key:f.key,case:f,result:{status:"ok",durationPlayer:0,durationWorld:0,eventObserved:false,eligible:false,quests:null,permanentFind:null}});
  assert.throws(()=>validateRow(f,{key:f.key,case:f,result:{status:"ok",durationPlayer:0,durationWorld:0,eventObserved:true,eligible:false,quests:null,permanentFind:null}}),/ineligible/);
});

test("weak feedback keeps all matched maps of a weak cell and never enters final scoring", () => {
  const d=mergeData(m,data());
  assert.equal(weakCells(m,d).keys.length,0);
  d[1].result={...good(),outcome:"lost",permanentFind:{available:true,found:true,kept:false}};
  const weak=weakCells(m,d);
  assert.equal(weak.keys.length,2); assert.equal(selected(m,weak).length,2);
  assert.ok(weak.priorities[0].reasons.includes("outcomes-vary-between-maps"));
  assert.match(weak.role,/never final/);
  assert.throws(()=>selected(m,{...weak,keys:["invented"]}),/existing expert/);
  assert.deepEqual(selected(m,{...weak,keys:[]}),[]);
});
