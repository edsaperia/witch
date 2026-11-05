// Duration-balanced art-check shards and strict combined proof. No art/check assertions are changed.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';
import { proofMatches } from './checked-tree.mjs';
export const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const read = file => JSON.parse(readFileSync(file, 'utf8'));
const save = (file, value) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, JSON.stringify(value, null, 2) + '\n'); };
export const validResult = (r, t) => !!t && r?.schema === 1 && r.id === t.id && r.key === t.key && r.passed === true;
export const DEFAULT_SHARDS = 3;
export function projectedSeconds(tasks, weights, pages = 3) {
  const lanes = Array(pages).fill(0); let auxiliary = 0;
  for (const t of tasks) {
    const seconds = t.cached ? 0 : Number.isFinite(weights[t.id]) && weights[t.id] >= 0 ? weights[t.id] : 60;
    if (t.id === 'auxiliary-and-labs') auxiliary += seconds;
    else { const at = lanes.indexOf(Math.min(...lanes)); lanes[at] += seconds; }
  }
  // Existing execute() runs the sprite pool then the conservative auxiliary unit serially.
  return Math.max(...lanes) + auxiliary;
}
export function partition(tasks, weights, count = DEFAULT_SHARDS) {
  if (![2, 3, 4].includes(count) || !Array.isArray(tasks) || !tasks.length || new Set(tasks.map(t => t.id)).size !== tasks.length || new Set(tasks.map(t => t.key)).size !== tasks.length || tasks.some(t => typeof t.id !== 'string' || !/^[a-z0-9-]+$/.test(t.id) || !/^[a-f0-9]{64}$/.test(t.key))) throw Error('Invalid complete task plan');
  const shards = Array.from({ length: count }, (_, index) => ({ index, seconds: 0, tasks: [] }));
  const seconds = t => t.cached ? 0 : Number.isFinite(weights[t.id]) && weights[t.id] >= 0 ? weights[t.id] : 60;
  for (const t of [...tasks].sort((a, b) => seconds(b) - seconds(a) || a.id.localeCompare(b.id))) {
    const cost = s => projectedSeconds([...s.tasks.map(id => tasks.find(t => t.id === id)), t], weights);
    const s = [...shards].sort((a, b) => cost(a) - cost(b) || a.tasks.length - b.tasks.length || a.index - b.index)[0];
    s.tasks.push(t.id); s.seconds = projectedSeconds(s.tasks.map(id => tasks.find(t => t.id === id)), weights);
  }
  return shards;
}
export function hydrateTasks(tasks, load) {
  return tasks.map(t => ({...t,cached:validResult(load(t),t)}));
}
function validateCoverage(p) {
  const count=p.shardCount??p.shards?.length??DEFAULT_SHARDS;
  if(![2,3,4].includes(count)||!Array.isArray(p.shards)||p.shards.length!==count||!Array.isArray(p.tasks)||!p.tasks.length||p.tasks.some(t=>typeof t.id!=='string'||!/^[a-z0-9-]+$/.test(t.id)||!/^[a-f0-9]{64}$/.test(t.key)))throw Error('Invalid complete plan');
  const ids=p.shards.flatMap((s,i)=>{if(s.index!==i||!Array.isArray(s.tasks))throw Error('Invalid assignment');return s.tasks;});
  if(ids.length!==p.tasks.length||new Set(ids).size!==p.tasks.length||new Set(p.tasks.map(t=>t.id)).size!==p.tasks.length||ids.some(id=>!p.tasks.some(t=>t.id===id)))throw Error('Assignment differs from complete plan');
}
function shardIndex(p,index) { if(!Number.isInteger(index)||index<0||index>=(p.shardCount??p.shards?.length??DEFAULT_SHARDS))throw Error('Unknown shard');if(!p.full)validateCoverage(p); }
export function needsBrowser(p,index,load) { shardIndex(p,index);return p.full?index===0:p.shards[index].tasks.some(id=>{const t=p.tasks.find(t=>t.id===id);return !validResult(load(t),t);}); }
export function validateManifest(p, m, index, latestAttempt = p.ci.attempt) {
  shardIndex(p,index);
  if(!Number.isInteger(latestAttempt)||latestAttempt<p.ci.attempt)throw Error('Invalid current attempt');
  if (m?.schema !== 1 || m.index !== index || m.plan !== digest(p) || m.tree !== p.ci.tree || m.runId !== p.ci.runId || !Number.isInteger(m.attempt) || m.attempt < p.ci.attempt || m.attempt > latestAttempt || JSON.stringify(m.environment) !== JSON.stringify(p.ci.environment) || m.passed !== true) throw Error(`Invalid shard ${index} identity/result`);
  const expected = p.full ? [] : p.shards[index].tasks;
  if (!Array.isArray(m.results) || m.results.length !== expected.length || new Set(m.results.map(r => r.id)).size !== expected.length || m.results.some(r => !expected.includes(r.id) || !validResult(r, p.tasks.find(t => t.id === r.id)))) throw Error(`Incomplete/extra shard ${index} coverage`);
  if (m.fullRun !== (!!p.full && index === 0)) throw Error('Full fallback must run exactly once');
  return m.results;
}
export function combine(p, manifests, shardStatus, latestAttempt = p.ci.attempt) {
  const count = p.shardCount ?? p.shards?.length ?? DEFAULT_SHARDS;
  if (![2,3,4].includes(count) || shardStatus !== 'success' || manifests.length !== count || new Set(manifests.map(m => m.index)).size !== count) throw Error('Every art shard must succeed');
  const results = Array.from({length:count},(_,i)=>i).flatMap(i => validateManifest(p, manifests.find(m => m.index === i), i, latestAttempt));
  if (!p.full && (results.length !== p.tasks.length || new Set(results.map(r => r.id)).size !== p.tasks.length)) throw Error('Combined coverage differs from complete plan');
  return { schema: 1, tree: p.ci.tree, runId: p.ci.runId, environment: p.ci.environment, results };
}
/** Synthetic tests inject executors; the CLI invokes only the existing unchanged check commands. */
export function runShard(p,index,{load,execute,full,attempt=p.ci.attempt}) {
  shardIndex(p,index);
  if(p.full){if(index===0){const r=full();if(r.error||r.status!==0)throw Error('Full fallback failed');}}
  else execute({...p,tasks:p.tasks.filter(t=>p.shards[index].tasks.includes(t.id))});
  const results=p.full?[]:p.shards[index].tasks.map(id=>{const t=p.tasks.find(t=>t.id===id),r=load(t);if(!validResult(r,t))throw Error(`Missing successful record ${id}`);return r;});
  return {schema:1,index,tree:p.ci.tree,runId:p.ci.runId,attempt,environment:p.ci.environment,plan:digest(p),passed:true,fullRun:!!p.full&&index===0,results};
}
export function finalize(p,{manifests=[],shardStatus,latestAttempt=p.ci.attempt,priorProof,load,expectedMode=p.mode}) {
  if(p.mode!==expectedMode)throw Error('Plan mode differs from planning job output');
  if(p.mode==='exact'){
    if(p.full||shardStatus!=='skipped'||!Number.isInteger(p.sourceRun)||!proofMatches(priorProof,p.ci.tree,p.ci.environment,p.sourceRun)||!Array.isArray(priorProof.results))throw Error('Invalid exact-tree reuse');
    return {...priorProof,runId:p.ci.runId};
  }
  if(p.mode==='cached'){
    if(p.full||shardStatus!=='skipped')throw Error('Unexpected shards for cached plan');validateCoverage(p);
    const results=p.tasks.map(t=>{const r=load(t);if(!validResult(r,t))throw Error(`Missing cached result ${t.id}`);return r;});
    return {schema:1,tree:p.ci.tree,runId:p.ci.runId,environment:p.ci.environment,results};
  }
  if(p.mode!==(p.full?'full':'affected'))throw Error('Unknown/inconsistent art mode');
  return combine(p,manifests,shardStatus,latestAttempt);
}
const tree = () => execFileSync('git', ['rev-parse', 'HEAD^{tree}'], { encoding: 'utf8' }).trim();
const environment = () => ({ node: process.version, os: process.env.RUNNER_OS, arch: process.arch, browser: process.env.PLAYWRIGHT_VERSION });
const record = (cache, t) => { try { const r = read(join(cache, t.key + '.json')); return validResult(r, t) ? r : null; } catch { return null; } };
const assertCurrent = p => {
  const actual = { sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(), tree: tree(), runId: Number(process.env.GITHUB_RUN_ID), attempt: Number(process.env.GITHUB_RUN_ATTEMPT), environment: environment() };
  if (p.ci.sha !== actual.sha || p.ci.tree !== actual.tree || p.ci.runId !== actual.runId || p.ci.attempt > actual.attempt || JSON.stringify(p.ci.environment) !== JSON.stringify(actual.environment)) throw Error(`Plan source/run/attempt/environment changed: expected ${JSON.stringify(p.ci)}, actual ${JSON.stringify(actual)}`);
  execFileSync('git',['diff','--exit-code','HEAD','--'],{stdio:'pipe'});
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [command, file = 'out/art-check-plan.json', number] = process.argv.slice(2);
  const cache = 'out/art-cache';
  if (command === 'prepare') {
    const p = read(file); p.shardCount = DEFAULT_SHARDS;
    p.ci = { sha:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(), tree: tree(), runId: Number(process.env.GITHUB_RUN_ID), attempt: Number(process.env.GITHUB_RUN_ATTEMPT), environment: environment() };
    if(!Number.isInteger(p.ci.runId)||p.ci.runId<=0||!Number.isInteger(p.ci.attempt)||p.ci.attempt<=0||!['node','os','arch','browser'].every(k=>typeof p.ci.environment[k]==='string'&&p.ci.environment[k]))throw Error('Missing CI identity');
    if (process.env.CHECKED_RUN) { p.mode = 'exact'; p.sourceRun = Number(process.env.CHECKED_RUN); }
    else if (p.full) p.mode = 'full';
    else {
      const weights = read('tools/art-check/task-times.json').seconds;
      if(p.tasks.filter(t=>t.id==='auxiliary-and-labs').length!==1)throw Error('Missing auxiliary coverage');
      mkdirSync(cache, { recursive: true });
      p.tasks = hydrateTasks(p.tasks, t => { const r = record('.art-check-results', t); if (r) save(join(cache, t.key + '.json'), r); return r; });
      // Rebalance after validating transported cache records, never merely trusting a cached flag.
      p.shards = partition(p.tasks, weights); p.mode = p.tasks.every(t => !!record(cache, t)) ? 'cached' : 'affected';
    }
    save(file, p); console.log(`art mode ${p.mode}; predicted shard work (not measured wall time): ${p.shards?.map(s => s.seconds.toFixed(1)).join(',') ?? 'fallback/skip'}`);
    if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `mode=${p.mode}\nshards=${JSON.stringify(Array.from({length:p.shardCount},(_,i)=>i))}\n`, { flag: 'a' });
  } else if (command === 'needs-browser') {
    const p = read(file), i = Number(number); assertCurrent(p);
    const needed = needsBrowser(p,i,t=>record(cache,t));
    if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `needed=${needed}\n`, { flag: 'a' });
  } else if (command === 'run') {
    const p = read(file), i = Number(number); assertCurrent(p); if (!Number.isInteger(i) || i < 0 || i >= p.shardCount) throw Error('Unknown shard');
    const started = Date.now();
    const {execute}=await import('./affected.mjs');
    const manifest=runShard(p,i,{load:t=>record(cache,t),execute:subset=>execute(subset,process.cwd(),cache),full:()=>spawnSync(process.execPath,['art/check.mjs','--times'],{stdio:'inherit'}),attempt:Number(process.env.GITHUB_RUN_ATTEMPT)});
    save(`out/shard-${i}.json`,{...manifest,elapsedMs:Date.now()-started});
  } else if (command === 'combine') {
    const p = read(file); assertCurrent(p); let proof;
    if (p.mode !== process.env.EXPECTED_MODE) throw Error('Plan mode differs from planning job output');
    if (p.mode !== 'exact' && !p.full) {
      const { plan } = await import('./affected.mjs');
      const fresh = await plan(process.cwd(), cache, p.environment);
      const identity = tasks => tasks.map(t => [t.id, t.key]).sort((a,b) => a[0].localeCompare(b[0]));
      if (fresh.snapshot !== p.snapshot || JSON.stringify(identity(fresh.tasks)) !== JSON.stringify(identity(p.tasks))) throw Error('Combined plan does not cover current complete source');
    }
    proof=finalize(p,{expectedMode:process.env.EXPECTED_MODE,shardStatus:process.env.SHARD_STATUS,latestAttempt:Number(process.env.GITHUB_RUN_ATTEMPT),priorProof:p.mode==='exact'?read('out/exact-proof.json'):undefined,load:t=>record(cache,t),manifests:['affected','full'].includes(p.mode)?Array.from({length:p.shardCount},(_,i)=>read(`out/shards/shard-${i}.json`)):[]});
    save('out/art-check-proof.json', proof);
    console.log(`All art coverage proved: ${p.mode}, ${proof.results.length} task records`);
  } else throw Error('Use prepare, needs-browser, run or combine');
}
