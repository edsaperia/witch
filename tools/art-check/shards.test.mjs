// Pure orchestration safety fixtures; never import or generate sprites.
import test from 'node:test';
import assert from 'node:assert/strict';
import { partition, projectedSeconds, hydrateTasks, DEFAULT_SHARDS, digest, combine } from './shards.mjs';
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

test('an allocated cold plan cannot import any cache record or retain stale cached flags',()=>{
  const t=tasks.map(t=>({...t,cached:true}));
  const cold=hydrateTasks(t,()=>{throw Error('Cold run read cache');},true);
  assert.ok(cold.every(t=>!t.cached));assert.ok(t.every(t=>t.cached));
  const normal=hydrateTasks(t,t=>t.id==='task-0'?{passed:true}:null);
  assert.equal(normal.filter(t=>t.cached).length,1);
});
