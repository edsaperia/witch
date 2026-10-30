// Assigned cloud browser check. Compare the current ground material with exact v5878 shader source, same frozen scene/uniforms.
// Build with WITCH_SHA first. CLOUD_RIG=1 EXPECT_SHA=<head> node tools/bench/ground-family-parity.mjs <out-dir> <dist-dir>
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { openBrowser } from '../../art/headless.mjs';
if (process.platform === 'win32' || process.env.CLOUD_RIG !== '1') throw new Error('Requires assigned cloud browser; no laptop allocation inferred');
const sha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (!process.env.EXPECT_SHA || !sha.startsWith(process.env.EXPECT_SHA)) throw new Error('Wrong checkout');
const out = path.resolve(process.argv[2] || 'ground-parity-results'), dist = path.resolve(process.argv[3] || 'dist');
const stamp = JSON.parse(fs.readFileSync(path.join(dist, 'version.json'), 'utf8'));
if (!stamp.version.includes(sha.slice(0, 7))) throw new Error('Built game identity missing');
fs.mkdirSync(out, { recursive: true });
const baseSha = '523b5cec0a9861aff1043f016c77fc255cbebfc7';
const original = execFileSync('git', ['show', `${baseSha}:src/render/ground.ts`], { encoding: 'utf8' });
const bundle = path.join(out, 'baseline-ground.cjs');
await build({ entryPoints: ['src/render/ground.ts'], outfile: bundle, bundle: true, platform: 'node', format: 'cjs', logLevel: 'warning', plugins: [{ name: 'baseline-shader-only', setup(b) {
  b.onLoad({ filter: /[\\/]render[\\/]ground\.ts$/ }, a => ({ contents: original + '\nexport const __paritySource={VERT,FRAG};', loader: 'ts', resolveDir: path.dirname(a.path) }));
  b.onResolve({ filter: /^virtual:art-overrides$/ }, () => ({ path: 'unused-overrides', namespace: 'parity-source' }));
  b.onLoad({ filter: /.*/, namespace: 'parity-source' }, () => ({ contents: 'export default {};', loader: 'js' }));
} }] });
const baseline = createRequire(import.meta.url)(bundle).__paritySource;
const fixtures = [
  { island: 'home', force: '', expected: 'no-lakes' },
  { island: 'fox', force: '', expected: 'water-only-lakes', lookId: 0 },
  { island: 'raven', force: '', expected: 'full-lakes', lookId: 2 },
  { island: 'fox', force: 'ice', expected: 'full-lakes', lookId: 1 },
];
const report = { sha, baseline: baseSha, stamp, baselineFragmentHash: createHash('sha256').update(baseline.FRAG).digest('hex'),
  note: 'Exact RGBA ground-only back-to-back comparison in one frozen scene, baseline/current uniforms shared. No timing/whole-scene claim.', rows: [] };
let active, stopping = false;
const save = () => fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
const totalTimer = setTimeout(async () => {
  stopping = true; report.error = '13min total limit'; save();
  const force = setTimeout(() => process.exit(1), 5000);
  try { if (active) await active.close(); } finally { clearTimeout(force); process.exit(1); }
}, 13 * 60 * 1000);
for (const fixture of fixtures) {
  let browser;
  try {
    browser = active = await openBrowser(); await browser.page.setViewportSize({ width: 960, height: 540 });
    const relative = path.relative(process.cwd(), dist).replaceAll(path.sep, '/');
    const query = new URLSearchParams({ creator: '0', quick: '1', seed: '424242', world: '0', island: fixture.island, ladder: 'off' });
    if (fixture.force) query.set('lakelook', fixture.force);
    await browser.page.goto(`${browser.base}/${relative}/?${query}`);
    await browser.page.waitForFunction(() => window.witch?.ready, null, { timeout: 180000 });
    await browser.page.evaluate(() => { window.witch.manual = true; });
    for (const mode of ['plain', 'beach']) {
      const row = await browser.page.evaluate(async ({ fixture, mode, baseline }) => {
        const witch = window.witch, game = witch.game, view = witch.view;
        let point;
        if (mode === 'beach') {
          const c = [0, 90, 180, 270].map(d => witch.coastFacing(d * Math.PI / 180)).find(Boolean);
          if (!c) throw new Error('no coast'); point = { x: c.x - c.nx * 30, z: c.z - c.nz * 30 };
        } else {
          const L = game.map.bounds.lakes;
          if (L) { let best = 0; for (let i = 1; i < L.dist.length; i++) if (L.dist[i] > L.dist[best]) best = i; point = { x: L.x0 + (best % L.cols) * L.step, z: L.z0 + Math.floor(best / L.cols) * L.step }; }
          else point = game.map.dancefloor;
        }
        const shot = witch.shot(`at:${point.x},${point.z}`); if (!shot.ok) throw new Error(shot.say);
        for (let i = 0; i < 32; i++) witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0, i === 31);
        const ground = view.ground, mesh = ground.mesh, renderer = view.renderer, gl = renderer.getContext();
        const mine = mode === 'beach' ? ground.beach : ground.plain;
        if (mode === 'beach' && mine.uniforms.uBeach.value.x <= 0) throw new Error('beach effects not active');
        const family = 'GROUND_WATER_ONLY' in mine.defines ? 'water-only-lakes' : 'GROUND_LAKES' in mine.defines ? 'full-lakes' : 'no-lakes';
        if (family !== fixture.expected) throw new Error(`wrong family ${family}`);
        const lookIds = [...new Set(mine.uniforms.uLakeLooks?.value?.image?.data ?? [])];
        if (fixture.lookId !== undefined && !lookIds.includes(fixture.lookId)) throw new Error('expected lake look missing');
        const control = mine.clone(); control.uniforms = mine.uniforms; control.vertexShader = baseline.VERT; control.fragmentShader = baseline.FRAG;
        control.defines = { ...mine.defines }; delete control.defines.GROUND_WATER_ONLY; control.needsUpdate = true;
        const was = new Map(); view.scene.traverse(o => { was.set(o, o.visible); if (o.isMesh || o.isPoints || o.isLine || o.isSprite) o.visible = o === mesh; });
        const oldMaterial = mesh.material, oldTarget = renderer.getRenderTarget();
        const target = new view.post.sceneTarget.constructor(gl.drawingBufferWidth, gl.drawingBufferHeight);
        const read = material => { mesh.material = material; renderer.setRenderTarget(target); renderer.clear(); renderer.render(view.scene, view.camera); const p = new Uint8Array(target.width * target.height * 4); renderer.readRenderTargetPixels(target, 0, 0, target.width, target.height, p); return p; };
        const diff = (a, b) => { let pixels = 0, max = 0; for (let i = 0; i < a.length; i += 4) { let d = 0; for (let k = 0; k < 4; k++) d = Math.max(d, Math.abs(a[i + k] - b[i + k])); if (d) pixels++; max = Math.max(max, d); } return { pixels, max }; };
        try {
          mesh.material = control; await renderer.compileAsync(mesh, view.camera, view.scene);
          mesh.material = mine; await renderer.compileAsync(mesh, view.camera, view.scene);
          // No awaits between reads: no worker callback, game frame, time or uniform mutation can interleave.
          read(control); const before = read(control); read(mine); const after = read(mine); const repeat = read(mine); const baseRepeat = read(control);
          const colors = new Set(); for (let i = 0; i < before.length && colors.size < 16; i += 4) colors.add(`${before[i]},${before[i + 1]},${before[i + 2]}`);
          if (colors.size < 3) throw new Error('blank/flat fixture');
          const dbg = gl.getExtension('WEBGL_debug_renderer_info');
          return { fixture, mode, point, family, defines: mine.defines, lookIds, gpu: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
            width: target.width, height: target.height, sampledColors: colors.size, parity: diff(before, after), currentDrift: diff(after, repeat), baselineDrift: diff(before, baseRepeat) };
        } finally { mesh.material = oldMaterial; renderer.setRenderTarget(oldTarget); target.dispose(); control.dispose(); for (const [o, visible] of was) o.visible = visible; }
      }, { fixture, mode, baseline });
      report.rows.push(row); save(); console.log(JSON.stringify(row));
    }
    if (browser.errors.length) throw new Error(browser.errors.join('; '));
  } catch (error) { report.rows.push({ fixture, error: String(error) }); save(); break; }
  finally { if (browser && !stopping) await browser.close(); active = undefined; }
}
clearTimeout(totalTimer); save();
process.exitCode = report.rows.length === 8 && report.rows.every(r => !r.error && r.parity.pixels === 0 && r.currentDrift.pixels === 0 && r.baselineDrift.pixels === 0) ? 0 : 1;
