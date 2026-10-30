// Node-only compute attribution: one worker at a time, hard deadline per case. No browser or IndexedDB.
import { build } from 'esbuild';
import { Worker } from 'node:worker_threads';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { normalizeProfile } from './worker-profile.cjs';
const root = process.cwd(), out = path.resolve(process.argv[2] || 'work/worker-compute'), limit = Math.min(10000, Number(process.env.LIMIT_MS || 10000));
if (!(limit > 0)) throw new Error('invalid deadline');
fs.mkdirSync(out, { recursive: true });
const bundle = path.join(out, 'compute.cjs');
const hooks = { name: 'diagnostic-chart-stages', setup(b) {
  if (fs.readdirSync('art/overrides', { recursive: true }).some(f => String(f).endsWith('.png'))) throw new Error('profile must load current PNG overrides before art measurement');
  b.onResolve({ filter: /^virtual:art-overrides$/ }, () => ({ path: 'overrides', namespace: 'compute-overrides' }));
  b.onLoad({ filter: /.*/, namespace: 'compute-overrides' }, () => ({ contents: 'export default {};', loader: 'js' }));
  b.onLoad({ filter: /chartOutlines\.worker\.ts$/ }, args => {
    let text = fs.readFileSync(args.path, 'utf8');
    const change = (from, to) => { if (text.split(from).length !== 2) throw new Error(`stage hook is stale: ${from}`); text = text.replace(from, to); };
    change('import { generateMap, islandLand }', 'import { generateMap as rawGenerateMap, islandLand }');
    change('import { buildIslandMesh, meshBuffers', 'import { buildIslandMesh as rawBuildIslandMesh, meshBuffers');
    change('import { sigilDetail }', 'import { sigilDetail as rawSigilDetail }');
    for (const name of ['ground', 'outlineOf']) change(`function ${name}(`, `function raw_${name}(`);
    change('export function make(', 'function raw_make(');
    for (const [name, raw, label, exported] of [
      ['generateMap','rawGenerateMap','chart.map',false], ['buildIslandMesh','rawBuildIslandMesh','chart.mesh',false], ['sigilDetail','rawSigilDetail','chart.sigils',false],
      ['ground','raw_ground','chart.ground',false], ['outlineOf','raw_outlineOf','chart.outline',false], ['make','raw_make','chart.total',true],
    ]) text += `\n${exported ? 'export ' : ''}function ${name}(...args) { return globalThis.__stage('${label}', () => ${raw}(...args)); }\n`;
    return { contents: text, loader: 'ts', resolveDir: path.dirname(args.path) };
  });
} };
await build({ entryPoints: ['tools/bench/worker-compute-entry.ts'], outfile: bundle, bundle: true, platform: 'node', format: 'cjs', sourcemap: true, plugins: [hooks], logLevel: 'warning' });
const jobs = [{ kind: 'map' }, { kind: 'chart', island: 'home', across: 150 }, { kind: 'chart', island: 'home', across: 420 }, { kind: 'chart', island: 'fox', across: 420 }, { kind: 'art', seed: 225745 }, { kind: 'art', seed: 305895 }].filter(j => !process.env.ONLY || j.kind === process.env.ONLY);
if (!jobs.length) throw new Error('no matching compute case');
const report = { sha: execFileSync('git', ['rev-parse','HEAD'], { encoding: 'utf8' }).trim(), bundleHash: createHash('sha256').update(fs.readFileSync(bundle)).digest('hex'), node: process.version, cpus: os.cpus().length, memoryGB: os.totalmem() / 2**30, deadlineMs: limit, notes: 'Cold isolated Node workers; no IndexedDB/GPU/browser. Chart stage totals are nested, not additive. Art areaType0 is representative because prior trace omitted job IDs; pixel backend differs from browser canvas.', runs: [] };
for (const [index, job] of jobs.entries()) {
  const worker = new Worker(`globalThis.self = globalThis; require(${JSON.stringify(bundle)});`, { eval: true });
  let profile, timer;
  try {
    await new Promise((resolve, reject) => { timer = setTimeout(() => reject(new Error('worker startup deadline')), limit); worker.once('error', reject); worker.once('message', resolve); }); clearTimeout(timer);
    profile = await Promise.race([worker.startCpuProfile(), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('profiler startup deadline')), 1500); })]); clearTimeout(timer);
    const result = await new Promise(resolve => { timer = setTimeout(() => resolve({ ok: false, error: 'compute deadline exceeded' }), limit); worker.once('message', resolve); worker.once('error', e => resolve({ ok: false, error: String(e) })); worker.postMessage(job); }); clearTimeout(timer);
    const raw = await Promise.race([profile.stop(), new Promise(resolve => { timer = setTimeout(() => resolve(null), 1500); })]); clearTimeout(timer);
    if (raw) {
      const normalized = normalizeProfile(raw);
      if (normalized.repaired) fs.writeFileSync(path.join(out, `${index}-${job.kind}.native-profile.txt`), raw);
      fs.writeFileSync(path.join(out, `${index}-${job.kind}.cpuprofile`), JSON.stringify(normalized.profile));
      result.profileWindowsPathsRepaired = normalized.repaired;
    }
    report.runs.push({ job, ...result });
  } catch (e) { report.runs.push({ job, ok: false, error: String(e) }); }
  finally { clearTimeout(timer); await worker.terminate(); }
  fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report.runs.at(-1)));
}
process.exitCode = report.runs.every(r => r.ok) ? 0 : 1;
