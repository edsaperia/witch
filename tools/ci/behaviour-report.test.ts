// Prove informational thresholds cannot fail valid surveys and execution errors stay distinct.
import {test} from 'vitest';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import YAML from 'yaml';
import {metric,summary} from '../behaviour/results.mjs';
import {shouldRunReport} from '../behaviour/schedule.mjs';

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
