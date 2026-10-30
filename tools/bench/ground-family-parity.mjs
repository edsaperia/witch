// Ground materials only. CLOUD_RIG=1 EXPECT_SHA=<sha> node tools/bench/ground-family-parity.mjs <out>
// HARNESS_CPU=1 runs ONE synthetic fixture locally using forced SwiftShader; never a parity/release claim.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
const require = createRequire(import.meta.url), cpu = process.env.HARNESS_CPU === '1';
if (!cpu && (process.platform === 'win32' || process.env.CLOUD_RIG !== '1')) throw Error('Requires assigned cloud rig or explicit one-fixture CPU harness check');
const sha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (!cpu && (!process.env.EXPECT_SHA || !sha.startsWith(process.env.EXPECT_SHA))) throw Error('Wrong checkout');
if (!cpu) execFileSync('git', ['diff', '--exit-code', 'HEAD', '--', 'src/render/ground.ts', 'src/render/lakeLooks.ts', 'src/render/groundFamily.ts', 'tools/bench/ground-family-parity.mjs', 'tools/bench/ground-parity-scene.mjs']);
const root = process.cwd(), out = path.resolve(process.argv[2] || 'ground-parity-results'); fs.mkdirSync(out, { recursive: true });
const baseSha = '523b5cec0a9861aff1043f016c77fc255cbebfc7';
async function sources(base) {
  const bundle = path.join(out, base ? 'baseline.cjs' : 'candidate.cjs');
  await build({ entryPoints: ['src/render/ground.ts'], outfile: bundle, bundle: true, platform: 'node', format: 'cjs', logLevel: 'warning', plugins: [{ name: 'shader-export', setup(b) {
    b.onLoad({ filter: /[\\/]render[\\/](ground|lakeLooks)\.ts$/ }, a => {
      let text = base ? execFileSync('git', ['show', `${baseSha}:${path.relative(root, a.path).replaceAll(path.sep, '/')}`], { encoding: 'utf8' }) : fs.readFileSync(a.path, 'utf8');
      if (a.path.endsWith('ground.ts')) text += '\nexport const __source={VERT,FRAG};';
      return { contents: text, loader: 'ts', resolveDir: path.dirname(a.path) };
    });
    b.onResolve({ filter: /^virtual:art-overrides$/ }, () => ({ path: 'unused', namespace: 'parity' }));
    b.onLoad({ filter: /.*/, namespace: 'parity' }, () => ({ contents: 'export default {};', loader: 'js' }));
  } }] });
  return require(bundle).__source;
}
const baseline = await sources(true), candidate = await sources(false);
// Real two-kind island lake field, sampled at its normal map grid; skip entities/paths only.
const mapBundle = path.join(out, 'beetle-map.cjs');
if (!cpu) await build({ stdin: { contents: `
import {generateMap} from './src/rules/map'; import {TUNING} from './src/rules/tuning'; import {lakeLooksOf} from './src/render/lakeLooks';
globalThis.__parityGeometry=true;
const tuning={...TUNING,map:{...TUNING.map,island:'beetle',world:0,found:[]}};
const map=generateMap(424242,tuning), k=lakeLooksOf(map), L=k.L;
const n=256, dist=[], looks=[]; const width=(L.cols-1)*L.step, depth=(L.rows-1)*L.step;
for(let z=0;z<n;z++)for(let x=0;x<n;x++){const c=Math.round(x/(n-1)*(L.cols-1)),r=Math.round(z/(n-1)*(L.rows-1)),i=r*L.cols+c;dist.push(L.dist[i]);looks.push(k.near[i]);}
export const field={n,dist,looks,box:[L.x0,L.z0,width,depth],kinds:[...k.any]};
`, resolveDir: root, loader: 'ts' }, outfile: mapBundle, bundle: true, platform: 'node', format: 'cjs', logLevel: 'warning', plugins: [{ name: 'geometry-only', setup(b) {
  b.onLoad({ filter: /[\\/]rules[\\/]map\.ts$/ }, a => {
    const marker = '    if (only) return { land, lakes, home: centre', text = fs.readFileSync(a.path, 'utf8');
    if (text.split(marker).length !== 2) throw Error('map diagnostic hook changed');
    return { contents: text.replace(marker, '    if ((globalThis as unknown as {__parityGeometry?:boolean}).__parityGeometry) return {bounds:{land,lakes},island:rosterIsland,tuning,zoo:null} as unknown as ForestMap;\n' + marker), loader: 'ts', resolveDir: path.dirname(a.path) };
  });
} }] });
const kinds = ['water', 'ice', 'lava', 'oasis', 'sinkhole', 'tarn', 'tar', 'rust', 'lily'];
const fixtures = [{ name: 'no-lakes', ids: [], defines: {} }, ...kinds.map((name, id) => ({ name, ids: [id], defines: { [`GROUND_LAKE_${name.toUpperCase()}`]: '' } })),
  { name: 'beetle-lava+tarn', ids: [2, 5], defines: { GROUND_LAKE_LAVA: '', GROUND_LAKE_TARN: '' } },
  { name: 'water+ice', ids: [0, 1], defines: { GROUND_LAKE_WATER: '', GROUND_LAKE_ICE: '' } },
  { name: 'forced-zoo-debug-full', ids: [1, 2], defines: Object.fromEntries(kinds.map(k => [`GROUND_LAKE_${k.toUpperCase()}`, ''])) }];
if (!cpu) {
  const field = require(mapBundle).field;
  if (field.kinds.slice().sort().join(',') !== 'lava,tarn') throw Error('Beetle combination changed');
  fixtures.find(f => f.name === 'beetle-lava+tarn').field = field;
}
const report = { sha, baseline: baseSha, harnessOnly: cpu, candidateFragmentHash: createHash('sha256').update(candidate.FRAG).digest('hex'),
  note: 'Minimal ground-only fixed-camera/material fixtures. Nine synthetic single-kind fields plus real world0/seed424242 Beetle lake field (256x256 nearest-grid sample); fixed lighting/ground/coast uniforms, not whole-game screenshots. Exact RGBA, no game readiness or timing claim.', rows: [] };
const save = () => fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
save();
let pw; try { pw = require(process.env.PLAYWRIGHT_MODULE || 'playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }
const server = createServer((req, res) => {
  const p = path.resolve(root, '.' + new URL(req.url, 'http://x').pathname);
  if (!p.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
  try { res.setHeader('Content-Type', p.endsWith('.html') ? 'text/html' : 'text/javascript'); res.end(fs.readFileSync(p)); } catch { res.writeHead(404); res.end(); }
});
let browser, totalTimer;
try {
  await new Promise(ok => server.listen(0, '127.0.0.1', ok));
  totalTimer = setTimeout(() => { report.error = '13min total deadline'; save(); browser?.close(); server.close(); setTimeout(() => process.exit(1), 5000); }, 13 * 60 * 1000);
  browser = await pw.chromium.launch({ ...(cpu && process.env.PARITY_CHROMIUM ? { executablePath: process.env.PARITY_CHROMIUM } : {}), args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage(), errors = [];
  page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(`http://127.0.0.1:${server.address().port}/art/headless-blank.html`);
  report.gpu = await page.evaluate(async () => {
    const T = await import('/node_modules/three/build/three.module.js');
    const r = window.groundParityRenderer = new T.WebGLRenderer({ antialias: false }); r.setSize(192, 192);
    const gl = r.getContext(), debug = gl.getExtension('WEBGL_debug_renderer_info');
    return debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
  }); save(); console.log(JSON.stringify({ gpu: report.gpu }));
  if (cpu && !/swiftshader/i.test(report.gpu)) throw Error('CPU check must use SwiftShader');
  for (const fixture of cpu ? fixtures.filter(f => f.name === 'lava') : fixtures) for (const beach of cpu ? [false] : [false, true]) {
    let timer;
    const row = await Promise.race([page.evaluate(async payload => (await import('/tools/bench/ground-parity-scene.mjs')).compareGround(payload), { baseline, candidate, fixture, beach }),
      new Promise((_, reject) => { timer = setTimeout(() => reject(Error('fixture exceeded 300s')), 300000); })]).finally(() => clearTimeout(timer));
    report.rows.push(row); save(); console.log(JSON.stringify(row));
    if (errors.length) throw Error(errors.join('; '));
    if (row.parity.pixels || row.currentDrift.pixels || row.baselineDrift.pixels) throw Error('pixel mismatch/drift');
  }
  report.complete = true;
} catch (error) { report.error = String(error); process.exitCode = 1; }
finally { clearTimeout(totalTimer); save(); if (browser) await browser.close(); await new Promise(ok => server.close(ok)); }
