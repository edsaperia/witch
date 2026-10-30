// Assigned cloud-rig diagnostic only. No application shader changes, pixels or travel claims.
// CLOUD_RIG=1 RIG_NAME=<allocated runner> EXPECT_SHA=<head> node tools/bench/ground-compile.mjs <out-dir>
// Ten serial cases: four baseline and six candidate variants. Fresh browser/context each; driver cache is NOT purged.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { openBrowser } from '../../art/headless.mjs';
const require = createRequire(import.meta.url);
const { waterOnlyDiagnosticSource, groundCompileCases } = require('./ground-compile-variants.cjs');
if (process.platform === 'win32' || process.env.CLOUD_RIG !== '1' || !process.env.RIG_NAME) throw new Error('Requires an explicitly allocated cloud rig; do not run on the laptop');
const sha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (!process.env.EXPECT_SHA || !sha.startsWith(process.env.EXPECT_SHA)) throw new Error('EXPECT_SHA must identify this checkout');
const startedAt = Date.now(), totalLimitMs = 13 * 60 * 1000;
const out = path.resolve(process.argv[2] || 'ground-compile-results'), deadlineMs = 120000;
fs.mkdirSync(out, { recursive: true });
const bundle = path.join(out, 'ground-source.cjs');
await build({ entryPoints: ['src/render/ground.ts'], outfile: bundle, bundle: true, platform: 'node', format: 'cjs', logLevel: 'warning', plugins: [{ name: 'read-only-source-export', setup(b) {
  b.onLoad({ filter: /ground\.ts$/ }, a => ({ contents: fs.readFileSync(a.path, 'utf8') + '\nexport const __compileSource = { VERT, FRAG, LAKE_LOOKS_GLSL };', loader: 'ts', resolveDir: path.dirname(a.path) }));
  // No art is generated: overrides do not affect the source strings being measured.
  b.onResolve({ filter: /^virtual:art-overrides$/ }, () => ({ path: 'unused-overrides', namespace: 'compile-source' }));
  b.onLoad({ filter: /.*/, namespace: 'compile-source' }, () => ({ contents: 'export default {};', loader: 'js' }));
} }] });
const source = require(bundle).__compileSource;
const candidate = waterOnlyDiagnosticSource(source.FRAG, source.LAKE_LOOKS_GLSL);
const report = { sha, rig: process.env.RIG_NAME, hostname: os.hostname(), node: process.version, os: `${os.platform()} ${os.release()}`, cpus: os.cpus().length,
  deadlineMs, totalLimitMs, sourceHash: createHash('sha256').update(source.FRAG).digest('hex'), baselineChars: source.FRAG.length,
  note: 'Compile-only proxy, not game travel or pixel equivalence. New browser/context per serial case; no OS/driver-cache purge. KHR absence makes readiness untrusted; uniform read may contain forced compile time.', runs: [] };
let activeBrowser, stopping = false;
const save = () => fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
const totalTimer = setTimeout(async () => {
  stopping = true; report.stopReason = '13-minute total limit'; save();
  const forceExit = setTimeout(() => process.exit(1), 5000);
  try { if (activeBrowser) await activeBrowser.close(); } finally { clearTimeout(forceExit); process.exit(1); }
}, Math.max(1, startedAt + totalLimitMs - Date.now()));
for (const job of groundCompileCases()) {
  if (stopping || Date.now() - startedAt >= totalLimitMs) break;
  let browser;
  try {
    browser = activeBrowser = await openBrowser();
    await browser.page.goto(browser.base + '/art/headless-blank.html');
    const payload = { vertex: source.VERT, fragment: job.version === 'baseline' ? source.FRAG : candidate, defines: job.defines, deadlineMs };
    let timeout;
    const result = await Promise.race([browser.page.evaluate(async ({ vertex, fragment, defines, deadlineMs }) => {
      const THREE = await import('/node_modules/three/build/three.module.js');
      const renderer = new THREE.WebGLRenderer({ antialias: false }); renderer.setSize(16, 16);
      const gl = renderer.getContext(), debug = gl.getExtension('WEBGL_debug_renderer_info');
      const gpu = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
      const parallel = renderer.extensions.has('KHR_parallel_shader_compile');
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      const geometry = new THREE.PlaneGeometry(2, 2), material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, defines });
      scene.add(new THREE.Mesh(geometry, material)); camera.position.z = 5;
      const start = performance.now(), compiled = renderer.compileAsync(scene, camera), callEnd = performance.now(); gl.flush();
      let timer;
      try {
        await Promise.race([compiled, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('shader readiness deadline')), deadlineMs); })]);
        const readyAt = performance.now(), program = renderer.info.programs[0];
        if (!program?.isReady()) throw new Error('program unfinished');
        const uniformsAt = performance.now(); program.getUniforms(); const end = performance.now();
        return { gpu, parallel, readinessTrusted: parallel, cores: navigator.hardwareConcurrency, userAgent: navigator.userAgent, compileCallMs: callEnd - start, readinessWallMs: readyAt - start,
          uniformReadMs: end - uniformsAt, totalMs: end - start, linked: !!gl.getProgramParameter(program.program, gl.LINK_STATUS), programs: renderer.info.programs.length };
      } finally { clearTimeout(timer); geometry.dispose(); material.dispose(); renderer.dispose(); }
    }, payload), new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error('host shader deadline')), deadlineMs + 10000); })]).finally(() => clearTimeout(timeout));
    report.runs.push({ ...job, ...result, errors: [...browser.errors] });
  } catch (error) { report.runs.push({ ...job, error: String(error) }); }
  finally { if (browser && !stopping) await browser.close(); activeBrowser = undefined; }
  save();
  console.log(JSON.stringify(report.runs.at(-1)));
  if (report.runs.at(-1).error) break;
}
clearTimeout(totalTimer);
process.exitCode = report.runs.length === 10 && report.runs.every(r => r.linked && !r.error && !r.errors.length) ? 0 : 1;
