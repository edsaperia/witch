// Prove informational thresholds cannot fail valid surveys and execution errors stay distinct.
import {test} from 'vitest';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import YAML from 'yaml';
import {metric,summary} from '../behaviour/results.mjs';
import {shouldRunReport} from '../behaviour/schedule.mjs';
import {fixtureSystem,runFixtureChecks} from '../behaviour/fixture.mjs';

const fixtureRows=()=>({schema:1,source:'abc',predicates:[
  {id:'first-run-censored',observed:'won',reference:'censored',matchesReference:false},
  {id:'fox-stunned',observed:false,reference:true,matchesReference:false},
  {id:'fox-hits-positive',observed:0,reference:'> 0',matchesReference:false},
  {id:'boar-retaliation-positive',observed:0,reference:'> 0',matchesReference:false},
]});

test('T6 actual strings, booleans and counts outside references remain informational',()=>{
  const system=fixtureSystem(fixtureRows(),'abc');
  assert.deepEqual(system.metrics.map(m=>m.value),['won',false,0,0]);
  assert.equal(system.metrics.every(m=>m.withinReference===false),true);
  const text=summary({status:'complete',sha:'abc',seconds:1,systems:[system]});
  assert.match(text,/won/);assert.match(text,/censored/);assert.match(text,/outside reference/);
  assert.doesNotMatch(text,/Execution error:/);
});
test('T6 rejects missing, stale and malformed observations',()=>{
  assert.throws(()=>fixtureSystem(fixtureRows(),'other'),/source/);
  const raw=fixtureRows();raw.predicates.pop();assert.throws(()=>fixtureSystem(raw,'abc'),/row count/);
  const invalid=fixtureRows();invalid.predicates[2].observed=NaN;assert.throws(()=>fixtureSystem(invalid,'abc'),/Invalid fixture/);
  const inconsistent=fixtureRows();inconsistent.predicates[0].matchesReference=true;assert.throws(()=>fixtureSystem(inconsistent,'abc'),/Inconsistent/);
});
test('T6 executes bounded sequential commands and clears stale results before collecting',()=>{
  const out=fs.mkdtempSync(path.join(os.tmpdir(),'witch-t6-'));
  try {
    const file=path.join(out,'report-fixture-sanity.json'),calls=[];
    fs.writeFileSync(file,JSON.stringify(fixtureRows()));
    const result=runFixtureChecks(out,'abc',(_exe,args,options)=>{
      calls.push(args);assert.equal(options.timeout,120_000);
      if(calls.length===1)assert.equal(fs.existsSync(file),false);
      else fs.writeFileSync(file,JSON.stringify(fixtureRows()));
      return {status:0,stdout:`stage${calls.length}`,stderr:''};
    });
    assert.deepEqual(calls[0],['--test','--test-concurrency=1','tools/balance/report.test.mjs']);
    assert.equal(calls[1][0],'tools/balance/report-fixture-sanity.mjs');
    assert.equal(result.error,null);assert.equal(result.system.metrics.length,4);
    assert.match(result.log,/stage1/);assert.match(result.log,/stage2/);
  } finally { fs.rmSync(out,{recursive:true,force:true}); }
});
test('T6 replay failures and missing fixture output surface as execution errors',()=>{
  const out=fs.mkdtempSync(path.join(os.tmpdir(),'witch-t6-'));
  try {
    const result=runFixtureChecks(out,'abc',()=>({status:1,stdout:'assertion failed',stderr:'details'}));
    assert.match(result.error,/T6 replay integrity: process exited 1/);
    assert.match(result.error,/T6 fixture observations: process exited 1/);
    assert.match(result.error,/T6 fixture result:/);assert.equal(result.system,undefined);
    assert.match(result.log,/assertion failed/);assert.match(result.log,/details/);
  } finally { fs.rmSync(out,{recursive:true,force:true}); }
});

test('scheduled reports skip old prototypes, while manual dispatch always runs',()=>{
  const now=Date.parse('2026-11-02T12:00:00Z');
  assert.equal(shouldRunReport('schedule','2026-11-01T11:59:59Z',now),false);
  assert.equal(shouldRunReport('schedule','2026-11-01T12:00:00Z',now),true);
  assert.equal(shouldRunReport('schedule','2026-11-02T11:00:00Z',now),true);
  assert.equal(shouldRunReport('workflow_dispatch','2020-01-01T00:00:00Z',now),true);
  assert.equal(shouldRunReport('schedule','invalid',now),true);
});

test('valid measurements outside every reference are data, not thrown failures',()=>{
  for(const [operator,value,bound]of [['>=',0,3],['>',0,1],['<',9,3.5]]){
    const m=metric('sample',value,'count',{operator,value:bound});
    assert.equal(m.value,value);assert.equal(m.withinReference,false);
  }
  assert.equal(metric('boundary',3,'count',{operator:'>=',value:3}).withinReference,true);
  assert.equal(metric('strict boundary',3,'count',{operator:'>',value:3}).withinReference,false);
  assert.equal(metric('upper boundary',3,'count',{operator:'<=',value:3}).withinReference,true);
  assert.equal(metric('upper exceeded',4,'count',{operator:'<=',value:3}).withinReference,false);
});
test('invalid measurement is an execution error rather than an outcome observation',()=>{
  assert.throws(()=>metric('broken',NaN,'count',{operator:'>',value:0}),/Invalid measurement/);
  assert.throws(()=>metric('broken',Infinity,'count',{operator:'>',value:0}),/Invalid measurement/);
  assert.throws(()=>metric('broken',1,'count',{operator:'unknown',value:0}),/Invalid reference/);
  const text=summary({status:'execution error',sha:'abc',seconds:1,systems:[],error:'fixture failed'});
  assert.match(text,/Execution error: fixture failed/);assert.doesNotMatch(text,/within reference \|/);
});
test('summary shows actual values and observations without calling them execution failures',()=>{
  const text=summary({status:'complete',sha:'abc',seconds:1.25,systems:[{metrics:[metric('cue',0,'cues',{operator:'>=',value:3})]}]});
  assert.match(text,/0 cues/);assert.match(text,/outside reference/);assert.doesNotMatch(text,/Execution error:/);
});
test('workflow stays nightly/manual and survey discovery stays outside release tests',()=>{
  const workflow=YAML.parse(fs.readFileSync('.github/workflows/behaviour-report.yml','utf8'));
  assert.deepEqual(Object.keys(workflow.on).sort(),['schedule','workflow_dispatch']);
  assert.equal(workflow.jobs.report.needs,undefined);
  const steps=workflow.jobs.report.steps;
  assert.equal(steps.find(s=>s.name==='Measure behaviour with one worker').if,"steps.source.outputs.run == 'true'");
  assert.match(steps.find(s=>s.name==='Save measurements, summary and execution log').if,/outputs.run != 'false'/);
  assert.match(steps.find(s=>s.name==='Update one standing nightly observation').if,/outputs.run != 'false'/);
  const config=fs.readFileSync('tools/behaviour/config.mjs','utf8');
  assert.match(config,/maxWorkers:1/);assert.match(config,/\.behaviour\.ts/);
  assert.doesNotMatch(fs.readFileSync('vite.config.ts','utf8'),/behaviour/);
  assert.doesNotMatch(fs.readFileSync('.github/workflows/ci.yml','utf8'),/behaviour-report/);
});
