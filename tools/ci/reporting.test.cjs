// Lightweight reporting/reuse regression tests without loading the game, Vite or a browser.
//   node --test tools/ci/reporting.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createSink } = require('./annotations.cjs');
const { failureLine, runCommand } = require('./report-command.cjs');
const { spawnSync } = require('node:child_process');

test('annotation cap is shared across commands, totals remain complete and payload cannot inject commands', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'witch-annotations-'));
  try {
    const file = path.join(dir, 'job.json'), lines = [];
    const options = { enabled: true, file, write: s => lines.push(s) };
    for (let i = 0; i < 12; i++) createSink(options).error('smoke', `check ${i}\n::error::injection%`, {file:'a,b.ts',line:7});
    for (let i = 0; i < 13; i++) createSink(options).error('art', `card ${i}`);
    createSink(options).summary();
    assert.equal(lines.length, 21); assert.match(lines[0], /file=a%2Cb.ts,line=7/);
    assert.match(lines[0], /%0A::error::injection%25/);
    assert.match(lines[20], /25 failure\(s\).*5 omitted/);
    assert.match(lines[20], /smoke: 12, art: 13/);
  } finally { fs.rmSync(dir, {recursive:true,force:true}); }
});

test('tool diagnostics retain names and config paths', () => {
  assert.equal(failureLine('smoke', '[12 s] FAIL pause over wardrobe'), 'pause over wardrobe');
  assert.equal(failureLine('art', 'FAIL lab card raven: ReferenceError: x is not defined'), 'lab card raven: ReferenceError: x is not defined');
  assert.equal(failureLine('config', 'config/style.json: shape.height must be a number'), 'config/style.json: shape.height must be a number');
  assert.equal(failureLine('config', 'config/style.json: valid'), null);
  assert.equal(failureLine('art', 'ok  raven'), null);
});

test('command status is preserved; crash fallback and unsuccessful named checks are annotated', async () => {
  const errors = [], sink = {error:(...a)=>errors.push(a)};
  const fail = await runCommand({command:process.execPath,args:['-e', 'console.log("FAIL wardrobe");process.exitCode=7'],kind:'smoke',sink});
  assert.equal(fail.status, 7); assert.equal(errors[0][1], 'wardrobe');
  const crash = await runCommand({command:process.execPath,args:['-e','throw Error("Art Lab ReferenceError")'],kind:'art',sink});
  assert.equal(crash.status,1); assert.match(errors[1][1], /Art Lab ReferenceError/);
  const pass = await runCommand({command:process.execPath,args:['-e','console.log("FAIL is only sample output")'],kind:'art',sink});
  assert.equal(pass.status,0); assert.equal(errors.length,2);
});

test('checked-tree proof rejects changed tree/environment, failed runs, absent or corrupt proof', async () => {
  const { proofMatches, findPassedTree } = await import('../art-check/checked-tree.mjs');
  // Actual release1549 ea42af826 tree; proof is a synthetic warm-protocol fixture,
  // not a claim that the historical workflow produced this new artifact.
  const tree = 'fe556ad3a06b9baea27986bc4423e9fff8a5300b', environment = {node:'v22.1',os:'Linux',arch:'x64',browser:'1.56.1'};
  const proof = {schema:1,tree,environment,runId:10};
  assert.equal(proofMatches(proof,tree,environment,10),true);
  assert.equal(proofMatches(proof,'b'.repeat(40),environment,10),false);
  assert.equal(proofMatches(proof,tree,{...environment,browser:'changed'},10),false);
  assert.equal(proofMatches(proof,tree,environment,11),false);
  let downloads = 0;
  const run = {id:10,conclusion:'success',head_sha:'source',head_repository:{full_name:'o/r'}};
  const github = {rest:{actions:{listWorkflowRuns:async()=>({data:{workflow_runs:[run]}}),listWorkflowRunArtifacts:async()=>({data:{artifacts:[{id:1,name:'art-check-tree',expired:false}]}})},git:{getCommit:async()=>({data:{tree:{sha:tree}}})}}};
  const options = {github,owner:'o',repo:'r',tree,environment,currentRun:11,readProof:async()=>{downloads++;return proof;}};
  assert.equal(await findPassedTree(options),10); assert.equal(downloads,1);
  run.conclusion='failure'; assert.equal(await findPassedTree(options),null); assert.equal(downloads,1);
  run.conclusion='success'; run.head_repository.full_name='fork/r'; assert.equal(await findPassedTree(options),null);
  run.head_repository.full_name='o/r'; assert.equal(await findPassedTree({...options,readProof:async()=>{throw Error('corrupt');}}),null);
  assert.equal(await findPassedTree({...options,tree:'b'.repeat(40)}),null);
});

test('real isolated Vitest failure reports its test name, file and assertion line without changing failure status', () => {
  fs.mkdirSync(path.join(process.cwd(), 'previews'), {recursive:true});
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'previews/annotation-fixture-'));
  try {
    const fixture = path.join(dir, 'failure.test.ts'), config = path.join(dir, 'config.mjs');
    fs.writeFileSync(fixture, 'import {it,expect} from "vitest";\nit("named assertion fixture",()=>{\nexpect(1).toBe(2);\n});\n');
    fs.writeFileSync(config, `export default ${JSON.stringify({test:{include:[fixture.replaceAll('\\','/')],reporters:['default',path.resolve('tools/ci/vitest-reporter.mjs').replaceAll('\\','/')],maxWorkers:1}})};`);
    const cli = ['node_modules/vitest/vitest.mjs','../../node_modules/vitest/vitest.mjs'].map(p=>path.resolve(p)).find(fs.existsSync);
    const run = spawnSync(process.execPath,[cli,'run','--config',config],{encoding:'utf8',timeout:20000,env:{...process.env,GITHUB_ACTIONS:'true',WITCH_ANNOTATION_FILE:path.join(dir,'budget.json')}});
    assert.equal(run.status,1,run.stderr);
    assert.match(run.stdout, /::error .*file=.*failure.test.ts,line=3::.*named assertion fixture.*expected 1 to be 2/);
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});

test('release imports only successful matching-environment task results; changed fingerprints remain misses', async () => {
  const { importPassedResults } = await import('../art-check/checked-tree.mjs');
  const environment={node:'v22',os:'Linux',arch:'x64',browser:'1.56.1'}, key='a'.repeat(64), saved=[];
  const run={id:7,conclusion:'success',head_repository:{full_name:'o/r'}};
  const proof={schema:1,runId:7,tree:'b'.repeat(40),environment,results:[{schema:1,id:'trees',key,passed:true},{schema:1,id:'failed',key:'c'.repeat(64),passed:false},{schema:1,id:'invalid',key:'../../file',passed:true}]};
  const github={rest:{actions:{listWorkflowRuns:async()=>({data:{workflow_runs:[run]}}),listWorkflowRunArtifacts:async()=>({data:{artifacts:[{name:'art-check-tree',expired:false}]}})}}};
  const options={github,owner:'o',repo:'r',environment,currentRun:8,readProof:async()=>proof,saveResult:r=>saved.push(r)};
  assert.equal(await importPassedResults(options),1); assert.deepEqual(saved,[proof.results[0]]);
  assert.equal(saved.some(r=>r.key==='d'.repeat(64)),false); // Actual changed task is not manufactured into a cache hit.
  assert.equal(await importPassedResults({...options,environment:{...environment,node:'v24'}}),0);
  run.conclusion='failure'; assert.equal(await importPassedResults(options),0);
});

test('embedded GitHub scripts compile and neither workflow reruns on PR edits', () => {
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  for (const file of ['.github/workflows/ci.yml','.github/workflows/art-check.yml','.github/workflows/pages.yml','.github/workflows/pages-publish.yml']) {
    const text=fs.readFileSync(file,'utf8'), lines=text.split(/\r?\n/); let count=0;
    assert.doesNotMatch(text,/^\s*- edited\s*$|types:.*\bedited\b/m);
    for(let i=0;i<lines.length;i++) {
      const match=lines[i].match(/^(\s*)script: \|$/); if(!match)continue;
      const indent=match[1].length+2, body=[];
      for(i++;i<lines.length&&(lines[i].trim()===''||lines[i].search(/\S/)>=indent);i++)body.push(lines[i].slice(indent));
      i--; new AsyncFunction(body.join('\n')); count++;
    }
    assert.ok(count>0);
  }
});
