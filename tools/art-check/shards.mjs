// Four balanced art-check shards and strict combined proof. No art/check assertions are changed.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';
export const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const read = file => JSON.parse(readFileSync(file, 'utf8'));
const save = (file, value) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, JSON.stringify(value, null, 2) + '\n'); };
const validResult = (r, t) => r?.schema === 1 && r.id === t.id && r.key === t.key && r.passed === true;
export function partition(tasks, weights, count = 4) {
  if (count !== 4 || !Array.isArray(tasks) || !tasks.length || new Set(tasks.map(t => t.id)).size !== tasks.length || tasks.some(t => typeof t.id !== 'string' || !/^[a-f0-9]{64}$/.test(t.key))) throw Error('Invalid complete task plan');
  const shards = Array.from({ length: count }, (_, index) => ({ index, seconds: 0, tasks: [] }));
  const seconds = t => t.cached ? 0 : Number.isFinite(weights[t.id]) && weights[t.id] > 0 ? weights[t.id] : 60;
  for (const t of [...tasks].sort((a, b) => seconds(b) - seconds(a) || a.id.localeCompare(b.id))) {
    const s = [...shards].sort((a, b) => a.seconds - b.seconds || a.tasks.length - b.tasks.length || a.index - b.index)[0];
    s.tasks.push(t.id); s.seconds += seconds(t);
  }
  return shards;
}
export function validateManifest(p, m, index, latestAttempt = p.ci.attempt) {
  if (m?.schema !== 1 || m.index !== index || m.plan !== digest(p) || m.tree !== p.ci.tree || m.runId !== p.ci.runId || !Number.isInteger(m.attempt) || m.attempt < p.ci.attempt || m.attempt > latestAttempt || JSON.stringify(m.environment) !== JSON.stringify(p.ci.environment) || m.passed !== true) throw Error(`Invalid shard ${index} identity/result`);
  const expected = p.full ? [] : p.shards[index].tasks;
  if (!Array.isArray(m.results) || m.results.length !== expected.length || new Set(m.results.map(r => r.id)).size !== expected.length || m.results.some(r => !expected.includes(r.id) || !validResult(r, p.tasks.find(t => t.id === r.id)))) throw Error(`Incomplete/extra shard ${index} coverage`);
  if (p.full && m.fullRun !== (index === 0)) throw Error('Full fallback must run exactly once');
  return m.results;
}
export function combine(p, manifests, shardStatus, latestAttempt = p.ci.attempt) {
  if (shardStatus !== 'success' || manifests.length !== 4 || new Set(manifests.map(m => m.index)).size !== 4) throw Error('Every art shard must succeed');
  const results = [0, 1, 2, 3].flatMap(i => validateManifest(p, manifests.find(m => m.index === i), i, latestAttempt));
  if (!p.full && (results.length !== p.tasks.length || new Set(results.map(r => r.id)).size !== p.tasks.length)) throw Error('Combined coverage differs from complete plan');
  return { schema: 1, tree: p.ci.tree, runId: p.ci.runId, environment: p.ci.environment, results };
}
const tree = () => execFileSync('git', ['rev-parse', 'HEAD^{tree}'], { encoding: 'utf8' }).trim();
const environment = () => ({ node: process.version, os: process.env.RUNNER_OS, arch: process.arch, browser: process.env.PLAYWRIGHT_VERSION });
const record = (cache, t) => { try { const r = read(join(cache, t.key + '.json')); return validResult(r, t) ? r : null; } catch { return null; } };
const assertCurrent = p => { if (p.ci.tree !== tree() || p.ci.runId !== Number(process.env.GITHUB_RUN_ID) || p.ci.attempt > Number(process.env.GITHUB_RUN_ATTEMPT) || JSON.stringify(p.ci.environment) !== JSON.stringify(environment())) throw Error('Plan tree/run/attempt/environment changed'); };

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [command, file = 'out/art-check-plan.json', number] = process.argv.slice(2), cache = 'out/art-cache';
  if (command === 'prepare') {
    const p = read(file); p.ci = { tree: tree(), runId: Number(process.env.GITHUB_RUN_ID), attempt: Number(process.env.GITHUB_RUN_ATTEMPT), environment: environment() };
    if (process.env.CHECKED_RUN) { p.mode = 'exact'; p.sourceRun = Number(process.env.CHECKED_RUN); }
    else if (p.full) p.mode = 'full';
    else {
      const weights = read('tools/art-check/task-times.json').seconds;
      p.shards = partition(p.tasks, weights);
      mkdirSync(cache, { recursive: true });
      for (const t of p.tasks) { const r = record('.art-check-results', t); t.cached = !!r; if (r) save(join(cache, t.key + '.json'), r); }
      // Rebalance after validating transported cache records, never merely trusting a cached flag.
      p.shards = partition(p.tasks, weights); p.mode = p.tasks.every(t => !!record(cache, t)) ? 'cached' : 'affected';
    }
    save(file, p); console.log(`art mode ${p.mode}; predicted shard work (not measured wall time): ${p.shards?.map(s => s.seconds.toFixed(1)).join(',') ?? 'fallback/skip'}`);
    if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `mode=${p.mode}\n`, { flag: 'a' });
  } else if (command === 'needs-browser') {
    const p = read(file), i = Number(number); assertCurrent(p);
    const needed = p.full ? i === 0 : p.shards[i].tasks.some(id => !record(cache, p.tasks.find(t => t.id === id)));
    if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `needed=${needed}\n`, { flag: 'a' });
  } else if (command === 'run') {
    const p = read(file), i = Number(number); assertCurrent(p); if (![0, 1, 2, 3].includes(i)) throw Error('Unknown shard');
    const started = Date.now();
    if (p.full) {
      if (i === 0) { const r = spawnSync(process.execPath, ['art/check.mjs', '--times'], { stdio: 'inherit' }); if (r.error || r.status !== 0) throw Error('Full fallback failed'); }
    } else {
      const { execute } = await import('./affected.mjs');
      await execute({ ...p, tasks: p.tasks.filter(t => p.shards[i].tasks.includes(t.id)) }, process.cwd(), cache);
    }
    const results = p.full ? [] : p.shards[i].tasks.map(id => { const t = p.tasks.find(t => t.id === id), r = record(cache, t); if (!r) throw Error(`Missing successful record ${id}`); return r; });
    save(`out/shard-${i}.json`, { schema: 1, index: i, tree: p.ci.tree, runId: p.ci.runId, attempt: Number(process.env.GITHUB_RUN_ATTEMPT), environment: p.ci.environment, plan: digest(p), passed: true, fullRun: !!p.full && i === 0, elapsedMs: Date.now() - started, results });
  } else if (command === 'combine') {
    const p = read(file); assertCurrent(p); let proof;
    if (p.mode !== process.env.EXPECTED_MODE) throw Error('Plan mode differs from planning job output');
    if (p.mode !== 'exact' && !p.full) {
      const { plan } = await import('./affected.mjs');
      const fresh = await plan(process.cwd(), cache, p.environment);
      const identity = tasks => tasks.map(t => [t.id, t.key]).sort((a,b) => a[0].localeCompare(b[0]));
      if (fresh.snapshot !== p.snapshot || JSON.stringify(identity(fresh.tasks)) !== JSON.stringify(identity(p.tasks))) throw Error('Combined plan does not cover current complete source');
    }
    if (p.mode === 'exact') {
      const { proofMatches } = await import('./checked-tree.mjs'), prior = read('out/exact-proof.json');
      if (!proofMatches(prior, p.ci.tree, p.ci.environment, p.sourceRun) || process.env.SHARD_STATUS !== 'skipped') throw Error('Invalid exact-tree reuse');
      proof = { ...prior, runId: p.ci.runId };
    } else if (p.mode === 'cached') {
      if (process.env.SHARD_STATUS !== 'skipped') throw Error('Unexpected shard status for cached plan');
      const results = p.tasks.map(t => { const r = record(cache, t); if (!r) throw Error(`Missing cached result ${t.id}`); return r; });
      proof = { schema: 1, tree: p.ci.tree, runId: p.ci.runId, environment: p.ci.environment, results };
    } else proof = combine(p, [0, 1, 2, 3].map(i => read(`out/shards/shard-${i}.json`)), process.env.SHARD_STATUS, Number(process.env.GITHUB_RUN_ATTEMPT));
    save('out/art-check-proof.json', proof);
    console.log(`All art coverage proved: ${p.mode}, ${proof.results.length} task records`);
  } else throw Error('Use prepare, needs-browser, run or combine');
}
