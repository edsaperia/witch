// Canonical cloud only: SHARD=0 SHARDS=8 CLOUD_RIG=1 EXPECT_SHA=<head> node tools/bench/ground-extra-parity.mjs <out>
// Every shard has a13min deadline; all8 shards cover256 extra masks, plain/beach, plus diagnostic and sensitivity controls.
// DRY_ROW=0 selects one draw comparison from a shard; a dry run is never full-shard/matrix proof.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
const require = createRequire(import.meta.url), root = process.cwd(), prepareOnly = process.env.PREPARE_ONLY === '1';
if (!prepareOnly && (process.platform === 'win32' || process.env.CLOUD_RIG !== '1')) throw Error('Requires explicitly allocated canonical cloud rig; no local browser run');
const sha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), baselineSha = '5e51a00c470d84deec3b8f2ca05d04e45ef771b7';
if (!process.env.EXPECT_SHA || !sha.startsWith(process.env.EXPECT_SHA)) throw Error('Wrong checkout');
if (!prepareOnly) execFileSync('git', ['diff', '--exit-code', 'HEAD', '--', 'src/render/ground.ts', 'src/render/groundFamily.ts', 'tools/bench/ground-extra-parity.mjs', 'tools/bench/ground-parity-scene.mjs']);
const shard = Number(process.env.SHARD ?? 0), shards = Number(process.env.SHARDS ?? 8);
if (!Number.isInteger(shard) || !Number.isInteger(shards) || shards < 1 || shard < 0 || shard >= shards) throw Error('Invalid shard');
const out = path.resolve(process.argv[2] || `ground-extra-parity-${shard}`); fs.mkdirSync(out, { recursive: true });
async function source(base) {
  const outfile = path.join(out, base ? 'baseline.cjs' : 'candidate.cjs');
  await build({ entryPoints: ['src/render/ground.ts'], outfile, bundle: true, platform: 'node', format: 'cjs', logLevel: 'warning', plugins: [{ name: 'shader-export', setup(b) {
    b.onLoad({ filter: /[\\/]render[\\/](ground|lakeLooks)\.ts$/ }, a => {
      let contents = base ? execFileSync('git', ['show', `${baselineSha}:${path.relative(root, a.path).replaceAll(path.sep, '/')}`], { encoding: 'utf8' }) : fs.readFileSync(a.path, 'utf8');
      if (a.path.endsWith('ground.ts')) contents += `\nexport const __source={VERT,FRAG${base ? '' : ',BEACH_FRAG'}};`;
      return { contents, loader: 'ts', resolveDir: path.dirname(a.path) };
    });
    b.onResolve({ filter: /^virtual:art-overrides$/ }, () => ({ path: 'unused', namespace: 'parity' }));
    b.onLoad({ filter: /.*/, namespace: 'parity' }, () => ({ contents: 'export default {};', loader: 'js' }));
  } }] }); return require(outfile).__source;
}
const baseline = await source(true), candidate = await source(false);
const extras = ['ZOO_STREET', 'ZOO_PLAZA', 'DANCEFLOOR', 'PAVEMENT', 'LEGENDS', 'LEGEND_FLOOR', 'KOI', 'BARE'];
const rows = [];
for (let mask = 0; mask < 256; mask++) {
  const selected = extras.filter((_, i) => mask & (1 << i));
  rows.push({ name: `extras-${mask}`, ids: [0], extras: selected, defines: { GROUND_SPECIALIZED: '', GROUND_LAKE_WATER: '', ...Object.fromEntries(selected.map(k => [`GROUND_${k}`, ''])) } });
}
for (const extra of extras) {
  const selected = extra === 'LEGEND_FLOOR' ? ['LEGENDS', extra] : [extra];
  rows.push({ name: `sensitivity-${extra}`, ids: [0], extras: selected, sensitiveExtra: extra, defines: { GROUND_SPECIALIZED: '', GROUND_LAKE_WATER: '', ...Object.fromEntries(selected.map(k => [`GROUND_${k}`, ''])) } });
}
for (const name of ['forced-full', 'zoo-full', 'debug-full']) rows.push({ name, ids: [0, 2], extras, defines: { GROUND_SPECIALIZED: '', ...Object.fromEntries(['WATER', 'ICE', 'LAVA', 'OASIS', 'SINKHOLE', 'TARN', 'TAR', 'RUST', 'LILY'].map(k => [`GROUND_LAKE_${k}`, ''])), ...Object.fromEntries(extras.map(k => [`GROUND_${k}`, ''])) } });
const selected = rows.filter((_, i) => i % shards === shard);
const comparisons = selected.flatMap(fixture => [false, true].map(beach => ({ fixture, beach })));
const dryRow = process.env.DRY_ROW === undefined ? null : Number(process.env.DRY_ROW);
if (dryRow !== null && (!Number.isInteger(dryRow) || dryRow < 0 || dryRow >= comparisons.length)) throw Error('Invalid dry row');
const planned = dryRow === null ? comparisons : [comparisons[dryRow]];
const hash = s => createHash('sha256').update(s.VERT + s.FRAG + (s.BEACH_FRAG ?? '')).digest('hex');
const report = { sha, baselineSha, shard, shards, baselineSourceHash: hash(baseline), candidateSourceHash: hash(candidate), expectedRows: planned.length, totalMatrixRows: rows.length * 2, dryRun: dryRow !== null, rows: [], complete: false };
const save = () => fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2)); save();
if (prepareOnly) { report.preparationOnly = true; report.fixtures = selected.map(f => f.name); save(); console.log(JSON.stringify({ preparationOnly: true, shaderBundlesBuilt: true, selectedRows: report.expectedRows, totalMatrixRows: report.totalMatrixRows })); process.exit(0); }
let pw; try { pw = require(process.env.PLAYWRIGHT_MODULE || 'playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }
const server = createServer((req, res) => {
  const file = path.resolve(root, '.' + new URL(req.url, 'http://x').pathname);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  try { res.setHeader('Content-Type', file.endsWith('.html') ? 'text/html' : 'text/javascript'); res.end(fs.readFileSync(file)); } catch { res.writeHead(404); res.end(); }
});
let browser, timer;
try {
  await new Promise(ok => server.listen(0, '127.0.0.1', ok));
  timer = setTimeout(() => { report.error = '13min shard deadline'; save(); void browser?.close(); server.close(); setTimeout(() => process.exit(1), 5000); }, 13 * 60 * 1000);
  browser = await pw.chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage(), errors = [];
  page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(`http://127.0.0.1:${server.address().port}/art/headless-blank.html`);
  report.gpu = await page.evaluate(async () => { const T = await import('/node_modules/three/build/three.module.js'); const r = window.groundParityRenderer = new T.WebGLRenderer({ antialias: false }); r.setSize(192, 192); const gl = r.getContext(), d = gl.getExtension('WEBGL_debug_renderer_info'); return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER); }); save();
  for (const { fixture, beach } of planned) {
    const row = await page.evaluate(async payload => (await import('/tools/bench/ground-parity-scene.mjs')).compareGround(payload), { baseline, candidate, fixture, beach });
    report.rows.push(row); save(); console.log(JSON.stringify(row));
    if (errors.length) throw Error(errors.join('; '));
    if (row.parity.pixels || row.currentDrift.pixels || row.baselineDrift.pixels) throw Error('Pixel mismatch/drift');
  }
  report.complete = true;
} catch (e) { report.error = String(e); process.exitCode = 1; }
finally { clearTimeout(timer); save(); if (browser) await browser.close(); await new Promise(ok => server.close(ok)); }
