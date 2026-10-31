// PREPARE_ONLY=1 BASE_DIR=<frozen checkout> BASE_SHA=<sha> EXPECT_SHA=<sha> node tools/bench/map-prep-intel.mjs <out>
// A browser run additionally requires the latest explicit INTEL_SLOT=granted. No inferred retry.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
const require = createRequire(import.meta.url), prepare = process.env.PREPARE_ONLY === '1', nodeDry = process.env.NODE_DRY === '1';
const profileHydrate = process.env.PROFILE_HYDRATE === '1', seedWorld = process.env.COLD_WORLD !== '1';
const root = process.cwd(), base = path.resolve(process.env.BASE_DIR || ''), out = path.resolve(process.argv[2] || '../travel-perf-2-state/map-prep-intel');
const shaAt = dir => execFileSync('git', ['-C', dir, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const sha = shaAt(root), baseSha = shaAt(base);
if (sha !== process.env.EXPECT_SHA || baseSha !== process.env.BASE_SHA) throw Error('Exact prepared checkout SHAs required');
if (!prepare && !nodeDry && process.env.INTEL_SLOT !== 'granted') throw Error('Current explicit serial Intel slot required');
if (!prepare && !nodeDry && !seedWorld) throw Error('Cold-world mode is a Node diagnostic, not the real application protocol');
if (!prepare) for (const dir of [root, base]) execFileSync('git', ['-C', dir, 'diff', '--exit-code', 'HEAD', '--', 'src', 'art', 'config', ...(!nodeDry ? ['tools/bench/map-prep-intel.mjs'] : [])]);
fs.mkdirSync(out, { recursive: true });
const report = { sha, baseSha, preparationOnly: prepare, complete: false, rows: [], sources: {}, note: 'Actual mapPrep worker followed by checked map hydration, Forest, HeightField and pure path-ribbon consumption. Fixed Home/Fox, seed424242, world0. No game boot, art bakes, uploads, coast or travel-speed claim. One ordered pair, no cache purge.' };
const save = () => fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
report.profileHydrate = profileHydrate; report.worldInstalledBeforeHydration = seedWorld;
report.harnessSourceHash = createHash('sha256').update(fs.readFileSync(new URL(import.meta.url))).digest('hex');
const main = `
import {generateMap,hydrateMap,prepProblem} from './src/rules/map';
import {Forest} from './src/rules/forest';
import {TUNING} from './src/rules/tuning';
import {rememberWorld} from './src/rules/rosters';
import {HeightField} from './src/render/height';
import {__pathGeometry} from './src/render/paths';
import {WebGLRenderer} from 'three';
const hash=async data=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',data))).map(x=>x.toString(16).padStart(2,'0')).join('');
globalThis.__mapPrepBench={
  build:__BUILD__,
  gpu(){const r=new WebGLRenderer(),gl=r.getContext(),d=gl.getExtension('WEBGL_debug_renderer_info'),name=d?gl.getParameter(d.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);r.dispose();r.forceContextLoss();return name;},
  async run(island,build){
    if(build!==__BUILD__)throw Error('servedSHA mismatch:'+__BUILD__);
    const seed=424242,tuning={...TUNING,map:{...TUNING.map,island,islandAreas:10,world:0}},key=build+'|'+seed+'|'+island;
    const start=performance.now(),worker=new Worker('./worker.js',{type:'module'});
    let rec;
    try{rec=await new Promise((ok,fail)=>{const timer=setTimeout(()=>fail(Error('worker60s deadline')),60000);worker.onerror=e=>{clearTimeout(timer);fail(Error(e.message));};worker.onmessage=e=>{clearTimeout(timer);e.data.ok&&e.data.rec?ok(e.data.rec):fail(Error('worker failed'));};worker.postMessage({key,seed,tuning,send:true,noKeep:true});});}
    finally{worker.terminate();}
    const workerWallMs=performance.now()-start;
    if(rec.key!==key)throw Error('wrong worker record');
    let at=performance.now();const bad=prepProblem(rec.prep);if(bad)throw Error('invalid worker prep:'+bad);const checkMs=performance.now()-at;
    at=performance.now();if(__BENCH_SEED_WORLD__)rememberWorld(rec.arch);const worldInstallMs=performance.now()-at;
    globalThis.__benchMapPhases=[];
    at=performance.now();const map=hydrateMap(seed,tuning,rec.prep),hydrateMs=performance.now()-at,mapPhases=globalThis.__benchMapPhases;
    at=performance.now();const forest=new Forest(map),forestMs=performance.now()-at;
    const c=tuning.camera,pitch=Math.min(c.ground.angleIn,c.ground.angleOut,c.treetop.angleIn,c.treetop.angleOut),hills={...tuning.ground.hills,maxSlope:Math.tan(pitch*Math.PI/180)};
    at=performance.now();const height=new HeightField(map,forest,hills);let heightSteps=0;for(const _ of height.fillSteps(map.start.x,map.start.z))heightSteps++;const heightMs=performance.now()-at;
    at=performance.now();const steps=__pathGeometry(map);let geometry;for(;;){const n=steps.next();if(n.done){geometry=n.value;break;}}const pathMs=performance.now()-at;
    const heightHash=await hash(new Uint8Array(height.texture.image.data.buffer)),pathHash=await hash(new TextEncoder().encode(JSON.stringify([...geometry.quads])));
    const mapHash=await hash(new TextEncoder().encode(JSON.stringify({cells:map.cells,types:map.cells.map(([x,z])=>map.typeOf(x,z)),grounds:map.grounds,scenes:map.scenes,legendClearings:map.legendClearings,lines:map.paths.lines,pieces:map.paths.pieces,junctions:map.paths.junctions,spots:map.cells.map(([x,z])=>[map.soundsystemSpot(x,z),map.setPieceSpot(x,z)])})));
    const row={island,seed,build,workerWallMs,workerComputeMs:rec.ms,checkMs,worldInstallMs,hydrateMs,mapPhases,forestMs,heightMs,pathMs,consumerCpuMs:checkMs+worldInstallMs+hydrateMs+forestMs+heightMs+pathMs,heightSteps,heightPrepSource:height.prepSource??null,pathPrepared:!!rec.prep.pathGeometry,heightPrepared:!!rec.prep.heightSamples,heightHash,pathHash,mapHash,pathGroups:geometry.quads.size};height.dispose();return row;
  }
};
`;
for (const [name, dir] of [['baseline', base], ['candidate', root]]) {
  const folder = path.join(out, name); fs.mkdirSync(folder, { recursive: true });
  report.sources[name] = {};
  const plugins = [{ name: 'bench-only-exports', setup(b) {
    b.onResolve({ filter: /^virtual:art-overrides$/ }, () => ({ path: 'empty', namespace: 'bench' }));
    b.onLoad({ filter: /.*/, namespace: 'bench' }, () => ({ contents: 'export default {};', loader: 'js' }));
    if (profileHydrate) b.onLoad({ filter: /[\\/]rules[\\/]map\.ts$/ }, a => {
      const original = fs.readFileSync(a.path, 'utf8'); let text = original;
      const replace = (anchor, value) => { if (text.split(anchor).length !== 2) throw Error('map profiling seam changed: ' + anchor); text = text.replace(anchor, value); };
      replace('  const A = tuning.areaSize * tuning.areaScale;', `  const __started = performance.now(); let __last = __started;
  const __events = ((globalThis as unknown as {__benchMapPhases?: unknown[]}).__benchMapPhases ??= []);
  const __stamp = (stage: string) => { const at = performance.now(); __events.push({kind:'stage',stage,seed:runSeed,prepared:!!prep,only:!!only,ms:at-__last}); __last=at; };
  function __span<T>(stage: string, fn: () => T): T { const at=performance.now(); try{return fn();}finally{__events.push({kind:'span',stage,seed:runSeed,prepared:!!prep,only:!!only,ms:performance.now()-at});} }
  const A = tuning.areaSize * tuning.areaScale;`);
      replace('  const neighbours = prep ?', "  __stamp('shape-and-partition');\n  const neighbours = prep ?");
      replace('  const legendAreas = new Map<string, string>()', "  __stamp('area-growth-and-types');\n  const legendAreas = new Map<string, string>()");
      replace('  let land: LandMap | undefined, lakes: LandMap | undefined;', "  __stamp('legend-slot-layout');\n  let land: LandMap | undefined, lakes: LandMap | undefined;");
      replace('  const lakeShore = lakeKnobs(tuning).shore', "  __stamp('land-topology-and-hydrate');\n  const lakeShore = lakeKnobs(tuning).shore");
      replace('  const treehouse = { x: centre.x', "  __stamp('pre-treehouse-layout');\n  const treehouse = { x: centre.x");
      replace('  const bounds: Bounds = land', "  __stamp('treehouse-bounds');\n  const bounds: Bounds = land");
      replace('  map.paths = new PathNetwork(map);', "  __stamp('layout-before-paths');\n  map.paths = __span('paths:world', () => new PathNetwork(map));\n  __stamp('paths-world-block');");
      replace('dealAlongRoute(deck, kindOfType, own, runSeed, d => legendsOf(d).slotOf.size)', "__span('deal-scoring', () => dealAlongRoute(deck, kindOfType, own, runSeed, d => legendsOf(d).slotOf.size))");
      replace('    map.paths = new PathNetwork(map, (cx, cy) => AREA_TYPES[before.get(cellKey(cx, cy)) ?? typeOf(cx, cy)].wet);', "    __stamp('deal-and-legend-matching');\n    map.paths = __span('paths:dealt', () => new PathNetwork(map, (cx, cy) => AREA_TYPES[before.get(cellKey(cx, cy)) ?? typeOf(cx, cy)].wet));\n    __stamp('paths-dealt-block');");
      replace('  const G = tuning.grounds, usedGrounds = new Set<string>();', "  __stamp('deal-end');\n  const G = tuning.grounds, usedGrounds = new Set<string>();");
      replace('  map.paths.placePieces();', "  __stamp('placements');\n  __span('path-pieces', () => map.paths.placePieces());\n  __stamp('path-pieces-block');\n  __events.push({kind:'total',stage:'generateMap',seed:runSeed,prepared:!!prep,only:!!only,ms:performance.now()-__started});");
      report.sources[name].mapOriginalHash = createHash('sha256').update(original).digest('hex');
      report.sources[name].mapInstrumentedHash = createHash('sha256').update(text).digest('hex');
      return { contents: text, loader: 'ts', resolveDir: path.dirname(a.path) };
    });
    b.onLoad({ filter: /[\\/]render[\\/]paths\.ts$/ }, a => {
      let text = fs.readFileSync(a.path, 'utf8'), extra;
      const start = text.indexOf('    const net = map.paths, seed = map.seed;', text.indexOf('static *prep(')), end = text.indexOf('    const colours = Art.pathColours(style)', start);
      if (start < 0 || end < 0) throw Error('path diagnostic seam changed');
      // Baseline copies its original geometry loop; candidate takes the exact prepared/fallback branch.
      extra = '\nexport function* __pathGeometry(map: ForestMap) {\n' + text.slice(start, end) + '\nreturn {quads};\n}\n';
      return { contents: text + extra, loader: 'ts', resolveDir: path.dirname(a.path) };
    });
  } }];
  const options = { bundle: true, platform: 'browser', format: 'esm', logLevel: 'warning', plugins, define: { __BUILD__: JSON.stringify(name === 'baseline' ? baseSha : sha), __ART_HASH__: JSON.stringify('map-prep-cpu-fixture'), __BENCH_SEED_WORLD__: JSON.stringify(seedWorld) } };
  await build({ ...options, stdin: { contents: main, resolveDir: dir, loader: 'ts' }, outfile: path.join(folder, 'main.js') });
  await build({ ...options, entryPoints: [path.join(dir, 'src/app/mapPrep.worker.ts')], outfile: path.join(folder, 'worker.js') });
  fs.writeFileSync(path.join(folder, 'index.html'), '<!doctype html><meta charset="utf-8"><script type="module" src="./main.js"></script>');
  Object.assign(report.sources[name], Object.fromEntries(['main.js', 'worker.js'].map(f => [f, createHash('sha256').update(fs.readFileSync(path.join(folder, f))).digest('hex')])));
}
save();
if (prepare) { console.log(JSON.stringify({ preparationOnly: true, sha, baseSha, bundles: 4 })); process.exit(0); }
if (nodeDry) {
  // Exercise actual worker records/consumers without any browser, HTTP listener or GPU.
  const { Worker: Thread } = await import('node:worker_threads'), { pathToFileURL } = await import('node:url');
  const previous = globalThis.Worker, closing = [];
  try {
    for (const name of ['baseline', 'candidate']) {
      globalThis.Worker = class {
        constructor() {
          this.thread = new Thread(`const {parentPort,workerData}=require('node:worker_threads');globalThis.self=globalThis;self.postMessage=data=>parentPort.postMessage(data);const ready=import(workerData.file);parentPort.on('message',data=>ready.then(()=>self.onmessage({data})).catch(e=>{throw e;}));`, { eval: true, workerData: { file: pathToFileURL(path.join(out, name, 'worker.js')).href } });
          this.thread.on('message', data => this.onmessage?.({ data })); this.thread.on('error', e => this.onerror?.(e));
        }
        postMessage(data) { this.thread.postMessage(data); }
        terminate() { closing.push(this.thread.terminate()); }
      };
      await import(pathToFileURL(path.join(out, name, 'main.js')).href);
      for (const island of ['home', 'fox']) {
        const row = await globalThis.__mapPrepBench.run(island, name === 'baseline' ? baseSha : sha);
        await Promise.all(closing.splice(0)); report.rows.push({ name, ...row }); save();
        if (name === 'candidate' && (!row.pathPrepared || !row.heightPrepared || row.heightPrepSource !== 'worker' || row.heightSteps !== 0)) throw Error('Node dry candidate did not consume worker prep');
      }
    }
    for (const island of ['home', 'fox']) { const rows = report.rows.filter(r => r.island === island); if (rows[0].heightHash !== rows[1].heightHash || rows[0].pathHash !== rows[1].pathHash || rows[0].mapHash !== rows[1].mapHash) throw Error('Node dry data mismatch: ' + island); }
    report.complete = true;
  } catch (e) { report.error = String(e); throw e; }
  finally { globalThis.Worker = previous; await Promise.all(closing); report.cpuOnly = true; report.note += ' NODE_DRY validates Node worker/data paths only; no browser, GPU or Intel timing proof.'; save(); }
  console.log(JSON.stringify({ cpuOnly: true, complete: report.complete, rows: report.rows.length })); process.exit(0);
}
const cpu = async () => { const before = os.cpus(); await new Promise(ok => setTimeout(ok, 1000)); let idle = 0, total = 0; os.cpus().forEach((c, i) => { idle += c.times.idle - before[i].times.idle; for (const k of Object.keys(c.times)) total += c.times[k] - before[i].times[k]; }); return { at: new Date().toISOString(), percent: 100 * (1 - idle / total) }; };
const pw = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const server = createServer((req, res) => {
  const pathname = new URL(req.url, 'http://x').pathname;
  if (pathname === '/favicon.ico') { res.writeHead(204); return res.end(); }
  let file = path.resolve(out, '.' + pathname);
  if (!file.startsWith(out + path.sep)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  try { res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : 'text/html'); res.end(fs.readFileSync(file)); } catch { res.writeHead(404); res.end(); }
});
let browser, timer;
try {
  report.cpuStart = await cpu(); save();
  await new Promise(ok => server.listen(0, '127.0.0.1', ok));
  timer = setTimeout(() => { report.error = '240s deadline; partial rows are not a completed comparison'; save(); void browser?.close(); server.close(); setTimeout(() => process.exit(1), 5000); }, 240000);
  browser = await pw.chromium.launch({ headless: true, ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}), args: ['--use-gl=angle', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
  for (const name of ['baseline', 'candidate']) {
    const context = await browser.newContext(), page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`); });
    await page.goto(`http://127.0.0.1:${server.address().port}/${name}/`);
    await page.waitForFunction(() => !!window.__mapPrepBench);
    const gpu = await page.evaluate(() => window.__mapPrepBench.gpu());
    if (!/Intel/i.test(gpu) || /SwiftShader/i.test(gpu)) throw Error('Wrong GPU: ' + gpu);
    for (const island of ['home', 'fox']) {
      const row = await page.evaluate(({ island, build }) => window.__mapPrepBench.run(island, build), { island, build: name === 'baseline' ? baseSha : sha });
      report.rows.push({ name, gpu, ...row }); save();
      if (errors.length) throw Error(errors.join('; '));
      if (name === 'candidate' && (!row.pathPrepared || !row.heightPrepared || row.heightPrepSource !== 'worker' || row.heightSteps !== 0)) throw Error('Candidate did not consume worker prep');
    }
    await context.close();
  }
  for (const island of ['home', 'fox']) { const rows = report.rows.filter(r => r.island === island); if (rows[0].heightHash !== rows[1].heightHash || rows[0].pathHash !== rows[1].pathHash || rows[0].mapHash !== rows[1].mapHash) throw Error('Prepared/sync data mismatch: ' + island); }
  report.complete = true;
} catch (e) { report.error = String(e); process.exitCode = 1; }
finally {
  clearTimeout(timer); const cap = setTimeout(() => process.exit(1), 5000);
  if (browser) await browser.close(); if (server.listening) await new Promise(ok => server.close(ok)); clearTimeout(cap);
  report.cpuEnd = await cpu(); report.timingsContaminated = report.cpuStart.percent >= 70 || report.cpuEnd.percent >= 70; save();
  console.log(JSON.stringify({ complete: report.complete, rows: report.rows.length, error: report.error, timingsContaminated: report.timingsContaminated }));
}
