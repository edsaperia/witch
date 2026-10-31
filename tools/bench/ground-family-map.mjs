// Browser-free world0 family inventory. Map geometry uses normal settings; entity/path construction is skipped only in this diagnostic bundle.
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { Worker } from 'node:worker_threads';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
const require = createRequire(import.meta.url), out = path.resolve(process.argv[2] || 'ground-family-map.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
const bundle = out + '.cjs';
await build({ stdin: { contents: `
import {generateMap} from './src/rules/map'; import {TUNING} from './src/rules/tuning';
import {REAL_KINDS} from './src/rules/rosters'; import {lakeLooksOf} from './src/render/lakeLooks';
import {groundFamily,groundDefines} from './src/render/groundFamily';
globalThis.__familySurvey=true; export const ids=['home',...REAL_KINDS];
export function inspect(id){const tuning={...TUNING,map:{...TUNING.map,island:id,world:0,found:[]}};
const map=generateMap(424242,tuning),look=lakeLooksOf(map),looks=look?[...look.any].sort():[];
const family=groundFamily(!!map.bounds.lakes,look?.any??null,false,false);
return {island:id,phase:map.island?.phase,lakes:!!map.bounds.lakes,looks,family,plain:groundDefines(family,false),beach:groundDefines(family,true)};}
`, resolveDir: process.cwd(), loader: 'ts' }, outfile: bundle, bundle: true, platform: 'node', format: 'cjs', logLevel: 'warning', plugins: [{ name: 'geometry-only-survey', setup(b) {
  b.onLoad({ filter: /[\\/]rules[\\/]map\.ts$/ }, a => {
    let text = fs.readFileSync(a.path, 'utf8');
    const marker = '    if (only) return { land, lakes, home: centre';
    if (text.split(marker).length !== 2) throw new Error('map survey hook changed');
    text = text.replace(marker, '    if ((globalThis as unknown as {__familySurvey?:boolean}).__familySurvey) return {bounds:{land,lakes},island:rosterIsland,tuning,zoo:null} as unknown as ForestMap;\n' + marker);
    return { contents: text, loader: 'ts', resolveDir: path.dirname(a.path) };
  });
} }] });
const ids = require(bundle).ids;
const report = { sha: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), world: 0, nightSeed: 424242, found: [],
  expected: ids.length, geometry: 'Normal LAND_STEP and smoothing; early return before entities/paths, no application source mutation', rows: [] };
const started = Date.now();
for (const kind of ids) {
  if (Date.now() - started > 300000) { report.stopReason = '5min total limit'; break; }
  const worker = new Worker(`const {parentPort,workerData}=require('node:worker_threads'); parentPort.postMessage(require(workerData.bundle).inspect(workerData.kind));`, { eval: true, workerData: { bundle, kind } });
  let timer;
  const row = await new Promise(resolve => {
    timer = setTimeout(() => resolve({ island: kind, error: '15s map deadline' }), 15000);
    worker.once('message', resolve); worker.once('error', error => resolve({ island: kind, error: String(error) }));
  });
  clearTimeout(timer); await worker.terminate(); report.rows.push(row);
  fs.writeFileSync(out, JSON.stringify(report, null, 2)); console.log(JSON.stringify(row));
}
fs.writeFileSync(out, JSON.stringify(report, null, 2));
process.exitCode = report.rows.length === ids.length && report.rows.every(r => !r.error) ? 0 : 1;
