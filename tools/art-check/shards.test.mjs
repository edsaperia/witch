// Pure orchestration safety fixtures; never import or generate sprites.
import test from 'node:test';
import assert from 'node:assert/strict';
import { partition, projectedSeconds, hydrateTasks, DEFAULT_SHARDS, digest, combine, needsBrowser, runShard, finalize } from './shards.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import YAML from 'yaml';
import {execute,snapshotHash,taskDispatcher,sha} from './affected.mjs';
const tasks = Array.from({length:9},(_,i)=>({id:`task-${i}`,key:String(i).repeat(64),cached:false}));
function fixture() {
  const p={schema:1,mode:'affected',tasks,shards:partition(tasks,{'task-0':100,'task-1':90,'task-2':80,'task-3':70}),ci:{tree:'a'.repeat(40),runId:99,attempt:1,environment:{node:'v22',os:'Linux',arch:'x64',browser:'1.56.1'}}};
  const manifests=p.shards.map(s=>({schema:1,index:s.index,tree:p.ci.tree,runId:99,attempt:1,environment:p.ci.environment,plan:digest(p),passed:true,fullRun:false,results:s.tasks.map(id=>({...tasks.find(t=>t.id===id),schema:1,passed:true}))}));
  return {p,manifests};
}
test('balanced assignment covers every task exactly once and is stable across input order',()=>{
  const a=partition(tasks,{}),b=partition([...tasks].reverse(),{});
  assert.deepEqual(a,b);assert.deepEqual(a.flatMap(s=>s.tasks).sort(),tasks.map(t=>t.id).sort());
  const loads=a.map(s=>s.seconds);assert.ok(Math.max(...loads)-Math.min(...loads)<=60);
  assert.throws(()=>partition([],{}));assert.throws(()=>partition([...tasks,tasks[0]],{}));
});
test('only validated cached tasks have zero scheduling cost; unknown tasks remain scheduled',()=>{
  const p=partition([{...tasks[0],cached:true},tasks[1]],{});assert.equal(p.reduce((sum,s)=>sum+s.seconds,0),60);assert.equal(p.flatMap(s=>s.tasks).length,2);
});
test('all selected successful matching shards yield complete existing-format proof',()=>{
  const {p,manifests}=fixture(),proof=combine(p,manifests,'success');assert.equal(proof.results.length,tasks.length);assert.equal(proof.tree,p.ci.tree);assert.equal(proof.runId,99);assert.equal(proof.schema,1);
});
test('failed, cancelled, skipped, missing and duplicate shards cannot be green',()=>{
  for(const status of ['failure','cancelled','skipped',undefined]){const {p,manifests}=fixture();assert.throws(()=>combine(p,manifests,status));}
  const {p,manifests}=fixture();assert.throws(()=>combine(p,manifests.slice(1),'success'));assert.throws(()=>combine(p,[manifests[0],...manifests.slice(0,3)],'success'));
});
test('missing, duplicate, extra, failed, stale and different-environment task proofs fail',()=>{
  for(const mutate of [m=>m.results.pop(),m=>m.results.push(m.results[0]),m=>m.results[0].key='f'.repeat(64),m=>m.results[0].passed=false,m=>m.tree='b'.repeat(40),m=>m.runId++,m=>m.attempt=0,m=>m.plan='different',m=>m.environment={...m.environment,browser:'changed'},m=>m.environment={...m.environment,node:'v22.23.3'}]){
    const {p,manifests}=fixture();mutate(manifests[0]);assert.throws(()=>combine(p,manifests,'success'));
  }
});
test('an explicit job retry can reuse passed same-plan shards, not future/different-plan proofs',()=>{
  const {p,manifests}=fixture();manifests[0].attempt=2;assert.throws(()=>combine(p,manifests,'success'));assert.equal(combine(p,manifests,'success',2).results.length,tasks.length);manifests[0].plan='changed';assert.throws(()=>combine(p,manifests,'success',2));
});
test('unknown-analysis full fallback requires one full run and all selected successful manifests',()=>{
  const p={...fixture().p,full:true,mode:'full'};delete p.tasks;delete p.shards;
  const manifests=Array.from({length:DEFAULT_SHARDS},(_,index)=>({schema:1,index,tree:p.ci.tree,runId:99,attempt:1,environment:p.ci.environment,plan:digest(p),passed:true,fullRun:index===0,results:[]}));
  assert.equal(combine(p,manifests,'success').results.length,0);manifests[0].fullRun=false;assert.throws(()=>combine(p,manifests,'success'));
});

test('2, 3 and 4 shard plans preserve exact coverage and reject missing or extra manifests',()=>{
  for(const count of [2,3,4]){
    const {p}=fixture();p.shards=partition(tasks,{},count);p.shardCount=count;
    const manifests=p.shards.map(s=>({schema:1,index:s.index,tree:p.ci.tree,runId:99,attempt:1,environment:p.ci.environment,plan:digest(p),passed:true,fullRun:false,results:s.tasks.map(id=>({...tasks.find(t=>t.id===id),schema:1,passed:true}))}));
    assert.equal(combine(p,manifests,'success').results.length,tasks.length);
    assert.throws(()=>combine(p,manifests.slice(1),'success'));
    assert.throws(()=>combine(p,[...manifests,manifests[0]],'success'));
  }
});

test('duration packing models the existing three-page pool and isolates the long serial auxiliary unit',()=>{
  const t=[{id:'auxiliary-and-labs',key:'a'.repeat(64)},...tasks];
  const w=Object.fromEntries(tasks.map(t=>[t.id,100]));w['auxiliary-and-labs']=500;
  assert.equal(projectedSeconds(tasks,w),300);
  const p=partition(t,w,3),aux=p.find(s=>s.tasks.includes('auxiliary-and-labs'));
  assert.deepEqual(aux.tasks,['auxiliary-and-labs']);assert.equal(aux.seconds,500);
  assert.equal(p.flatMap(s=>s.tasks).length,t.length);
});

test('transported cached flags never replace validated matching success records',()=>{
  const t=tasks.map(t=>({...t,cached:true}));
  const miss=hydrateTasks(t,()=>null);
  assert.ok(miss.every(t=>!t.cached));assert.ok(t.every(t=>t.cached));
  const normal=hydrateTasks(t,t=>t.id==='task-0'?{schema:1,id:t.id,key:t.key,passed:true}:null);
  assert.equal(normal.filter(t=>t.cached).length,1);
  for(const bad of [{passed:true},{schema:1,id:'other',key:tasks[0].key,passed:true},{schema:1,id:tasks[0].id,key:'f'.repeat(64),passed:true},{schema:1,id:tasks[0].id,key:tasks[0].key,passed:false}])assert.ok(hydrateTasks(t,()=>bad).every(t=>!t.cached));
});

const result=t=>({schema:1,id:t.id,key:t.key,passed:true});
test('current real check catalogue, including auxiliary coverage, is partitioned without drawing',()=>{
  const names=[...taskDispatcher(fs.readFileSync('art/check.mjs','utf8')).names,'auxiliary-and-labs'];
  const current=names.map(id=>({id,key:sha(id),cached:false})),weights=JSON.parse(fs.readFileSync('tools/art-check/task-times.json','utf8')).seconds;
  const p=partition(current,weights);assert.deepEqual(p.flatMap(s=>s.tasks).sort(),names.sort());
  assert.equal(p.flatMap(s=>s.tasks).filter(id=>id==='auxiliary-and-labs').length,1);
});
test('browser need is derived from current records, including empty and full fallback shards',()=>{
  const {p}=fixture();assert.equal(needsBrowser(p,0,result),false);assert.equal(needsBrowser(p,0,()=>null),true);
  assert.throws(()=>needsBrowser(p,-1,result));assert.throws(()=>needsBrowser(p,3,result));
  const full={...p,full:true,mode:'full'};assert.equal(needsBrowser(full,0,result),true);assert.equal(needsBrowser(full,1,result),false);
});
test('assigned execution cannot certify unexecuted, failed, stale or another shard coverage',()=>{
  const {p}=fixture();let assigned;
  const m=runShard(p,1,{load:result,execute:subset=>{assigned=subset.tasks.map(t=>t.id);},full:()=>{throw Error('Unexpected fallback');}});
  assert.deepEqual(assigned,p.shards[1].tasks);assert.deepEqual(m.results.map(r=>r.id),assigned);
  assert.throws(()=>runShard(p,1,{load:()=>null,execute:()=>{},full:()=>{}}));
  assert.throws(()=>runShard(p,1,{load:result,execute:()=>{throw Error('Execution failed');},full:()=>{}}));
  assert.throws(()=>runShard(p,1,{load:t=>({...result(t),key:'f'.repeat(64)}),execute:()=>{},full:()=>{}}));
});
test('unknown analysis executes the unchanged complete fallback exactly once, without three partial claims',()=>{
  const {p}=fixture(),full={...p,full:true,mode:'full'},manifests=[];let calls=0;
  for(let i=0;i<3;i++)manifests.push(runShard(full,i,{load:()=>{throw Error('No task cache');},execute:()=>{throw Error('No filtered run');},full:()=>{calls++;return {status:0};}}));
  assert.equal(calls,1);assert.equal(combine(full,manifests,'success').results.length,0);
  assert.throws(()=>runShard(full,0,{full:()=>({status:1})}));assert.throws(()=>runShard(full,0,{full:()=>({status:null,error:Error('spawn')})}));
});
test('assignment tampering, conflicting keys and extra full-run claims cannot pass',()=>{
  assert.throws(()=>partition([{...tasks[0]}, {...tasks[1],key:tasks[0].key}],{}));
  for(const mutate of [p=>p.shards[0].tasks.pop(),p=>p.shards[1].tasks.push(p.shards[0].tasks[0]),p=>p.shards[0].index=1]){
    const {p,manifests}=fixture();mutate(p);assert.throws(()=>combine(p,manifests,'success'));
  }
  const {p,manifests}=fixture();manifests[0].fullRun=true;assert.throws(()=>combine(p,manifests,'success'));
});
test('all-cached proof still needs every valid record and actual skipped shard jobs',()=>{
  const {p}=fixture();p.mode='cached';
  assert.equal(finalize(p,{load:result,shardStatus:'skipped'}).results.length,tasks.length);
  assert.throws(()=>finalize(p,{load:()=>null,shardStatus:'skipped'}));
  assert.throws(()=>finalize(p,{load:result,shardStatus:'success'}));
  assert.throws(()=>finalize(p,{load:result,shardStatus:'skipped',expectedMode:'affected'}));
});
test('exact-tree reuse binds prior successful source proof, environment and expected scheduling mode',()=>{
  const {p}=fixture();p.mode='exact';p.sourceRun=88;
  const priorProof={schema:1,tree:p.ci.tree,runId:88,environment:p.ci.environment,results:[]};
  assert.equal(finalize(p,{priorProof,shardStatus:'skipped'}).runId,99);
  for(const changed of [{...priorProof,tree:'b'.repeat(40)},{...priorProof,runId:87},{...priorProof,environment:{...priorProof.environment,browser:'other'}},{...priorProof,results:undefined}])assert.throws(()=>finalize(p,{priorProof:changed,shardStatus:'skipped'}));
  assert.throws(()=>finalize(p,{priorProof,shardStatus:'success'}));
});
test('actual affected executor preserves original sprite and atomic auxiliary commands without rendering',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'art-shard-fixture-'));
  try{
    fs.mkdirSync(path.join(root,'art'));fs.writeFileSync(path.join(root,'art/input.js'),'fixture');
    const selected=[tasks[0],{id:'auxiliary-and-labs',key:'e'.repeat(64)}],files=['art/input.js'];
    const p={tasks:selected,files,snapshot:snapshotHash(root,files)},calls=[];
    execute(p,root,path.join(root,'cache'),args=>{calls.push(args);return {status:0};});
    assert.deepEqual(calls,[['--tasks','task-0','--sprite-only','--no-lab','--times'],['--aux-only','--times']]);
    assert.ok(selected.every(t=>JSON.parse(fs.readFileSync(path.join(root,'cache',t.key+'.json'),'utf8')).passed));
    fs.writeFileSync(path.join(root,'art/input.js'),'changed');assert.throws(()=>execute(p,root,path.join(root,'cache'),()=>{throw Error('Must not execute stale source');}));
  }finally{assert.equal(path.dirname(root),path.resolve(os.tmpdir()));assert.ok(path.basename(root).startsWith('art-shard-fixture-'));fs.rmSync(root,{recursive:true,force:true});}
});
test('nightly workflow pins every job to one source and cannot become a release gate',()=>{
  const w=YAML.parse(fs.readFileSync('.github/workflows/art-check.yml','utf8'));
  assert.deepEqual(Object.keys(w.on).sort(),['schedule','workflow_dispatch']);assert.equal(w.on.schedule[0].cron,'17 3 * * *');
  assert.deepEqual(Object.keys(w.jobs),['plan','shards','art']);assert.equal(w.jobs.shards.strategy['fail-fast'],false);
  assert.equal(w.jobs.plan.steps.find(s=>s.uses==='actions/checkout@v4').with.ref,'${{ steps.source.outputs.sha }}');
  for(const name of ['shards','art'])assert.equal(w.jobs[name].steps.find(s=>s.uses==='actions/checkout@v4').with.ref,'${{ needs.plan.outputs.sha }}');
  assert.equal(w.jobs.plan.steps.find(s=>s.with?.path==='.art-check-results').uses,'actions/cache/restore@v4');
  assert.equal(w.jobs.shards.steps.find(s=>s.name==='Save successful shard proof').if,'success()');
  assert.equal(w.jobs.art.if,'${{ always() }}');assert.deepEqual(w.jobs.art.needs,['plan','shards']);
  assert.ok(w.jobs.art.steps.find(s=>s.name==='Validate complete coverage and combine proof').run.includes('shards.mjs combine'));
  const notify=w.jobs.art.steps.find(s=>s.name==='Update the single nightly art result on issue 1476');assert.ok(notify.if.includes("github.event_name == 'schedule'"));assert.ok(notify.with.script.includes('witch-art-check-nightly-result'));
  for(const file of fs.readdirSync('.github/workflows').filter(f=>f.endsWith('.yml')&&f!=='art-check.yml'))assert.ok(!/needs:.*\bart\b/.test(fs.readFileSync('.github/workflows/'+file,'utf8')),file);
});
test('embedded workflow scripts write actual output/log newlines without running art or GitHub calls',()=>{
  const w=YAML.parse(fs.readFileSync('.github/workflows/art-check.yml','utf8')),steps=w.jobs.art.steps;
  const records=steps.find(s=>s.id==='records').run.match(/^node -e '([\s\S]*)'$/)[1];let written;
  new Function('require','process',records)(()=>({readFileSync:()=>JSON.stringify({results:[]}),mkdirSync:()=>{},appendFileSync:(_file,text)=>{written=text;}}),{env:{GITHUB_OUTPUT:'output'}});
  assert.equal(written,'count=0\n');
  const logs=steps.find(s=>s.name==='Collect diagnostic logs').run.split("<<'NODE'\n")[1].replace(/\nNODE\s*$/,'').replace("import fs from 'node:fs';",'');
  const fake={existsSync:()=>false,mkdirSync:()=>{},readFileSync:p=>{if(p==='out/combine.log')return 'fixture';throw Error('absent');},writeFileSync:(_file,text)=>{written=text;}};
  new Function('fs',logs)(fake);assert.ok(written.includes('\n--- out/combine.log ---\nfixture'));
  const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
  for(const job of Object.values(w.jobs))for(const step of job.steps)if(step.uses==='actions/github-script@v7')assert.doesNotThrow(()=>new AsyncFunction(step.with.script));
});
