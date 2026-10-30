// One explicitly granted <=5min serial hardware run. Baseline and candidate build folders must already exist.
// INTEL_SLOT=granted BASE_SHA=<sha> EXPECT_SHA=<sha> PLAYWRIGHT_MODULE=<path> CHROMIUM=<path>
// node tools/bench/ground-extra-intel.cjs <baseline-dist> <candidate-dist> <out-prefix>
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
if (process.env.INTEL_SLOT !== 'granted' || !process.env.BASE_SHA || !process.env.EXPECT_SHA) throw Error('Explicit current canonical slot and exact build SHAs required');
const [baseArg, candidateArg, outArg] = process.argv.slice(2);
if (!baseArg || !candidateArg || !outArg) throw Error('Prepared baseline/candidate dist folders and output prefix required');
const builds = { baseline: path.resolve(baseArg), candidate: path.resolve(candidateArg) }, out = path.resolve(outArg);
for (const dir of Object.values(builds)) if (!fs.existsSync(path.join(dir, 'version.json'))) throw Error('Missing prepared version.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
const pw = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const report = { baselineSha: process.env.BASE_SHA, candidateSha: process.env.EXPECT_SHA, rows: [], note: 'One ordered baseline/candidate pair, fresh contexts, no OS shader-cache purge. Static normal-game coast visit, no simulation advancement; not a travel speedup benchmark. Screenshots can perturb timing.' };
const save = () => fs.writeFileSync(out + '.json', JSON.stringify(report, null, 2));
report.httpFailures = [];
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://x').pathname;
  // A browser's optional tab icon is not a game resource; the fixture has none.
  if (pathname === '/favicon.ico') { res.writeHead(204); return res.end(); }
  const parts = pathname.split('/').filter(Boolean), root = builds[parts.shift()];
  if (!root) { report.httpFailures.push({ url: req.url, status: 404 }); res.writeHead(404); return res.end(); }
  let file = path.resolve(root, parts.map(decodeURIComponent).join('/'));
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  try { res.setHeader('Content-Type', ({ '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json', '.wasm': 'application/wasm' })[path.extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); } catch { report.httpFailures.push({ url: req.url, status: 404 }); res.writeHead(404); res.end(); }
});
function probe() {
  const p = window.__groundExtras = { links: [], methods: {}, frames: [], ground: [], unsafeReads: [], coastAt: null }, seen = new WeakSet();
  let prior; requestAnimationFrame(function tick(t) {
    if (prior !== undefined) p.frames.push({ at: t, ms: t - prior }); prior = t;
    for (const program of window.witch?.view.renderer.info.programs ?? []) if (!seen.has(program)) {
      seen.add(program);
      for (const name of ['getUniforms', 'getAttributes']) { const fn = program[name]; program[name] = function (...args) {
        const at = performance.now(); if (!program.isReady()) p.unsafeReads.push({ id: program.id, name, at });
        try { return fn.apply(this, args); } finally { const m = p.methods[name] ||= { count: 0, longestMs: 0 }; m.count++; m.longestMs = Math.max(m.longestMs, performance.now() - at); }
      }; }
    }
    requestAnimationFrame(tick);
  });
  for (const proto of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
    const link = proto.linkProgram;
    proto.linkProgram = function (program) {
      const at = performance.now(), value = link.call(this, program), gl = this, ext = gl.getExtension('KHR_parallel_shader_compile');
      const row = { object: program, at, callMs: performance.now() - at, readyAt: null, parallel: !!ext }; p.links.push(row);
      if (ext) setTimeout(function poll() { if (gl.isContextLost()) return; if (gl.getProgramParameter(program, ext.COMPLETION_STATUS_KHR)) row.readyAt = performance.now(); else setTimeout(poll, 20); }, 0);
      return value;
    };
    for (const name of ['getProgramInfoLog', 'getShaderInfoLog', 'getActiveUniform', 'getUniformLocation']) {
      const fn = proto[name]; proto[name] = function (...args) { const t = performance.now(); try { return fn.apply(this, args); } finally { const m = p.methods[name] ||= { count: 0, longestMs: 0 }; m.count++; m.longestMs = Math.max(m.longestMs, performance.now() - t); } };
    }
  }
}
let browser, timer, stopping = false;
(async () => {
  await new Promise(ok => server.listen(0, '127.0.0.1', ok)); save();
  timer = setTimeout(async () => { stopping = true; report.error = '290s total deadline; partial rows are not completed comparison'; save(); const force = setTimeout(() => process.exit(1), 5000); try { await browser?.close(); } finally { server.close(); clearTimeout(force); process.exit(1); } }, 290000);
  try {
    browser = await pw.chromium.launch({ headless: true, ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}), args: ['--use-gl=angle', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
    for (const name of ['baseline', 'candidate']) {
      if (stopping) break;
      const context = await browser.newContext({ viewport: { width: 960, height: 540 } }), page = await context.newPage(), started = Date.now(), errors = [];
      page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(`${m.text()} ${JSON.stringify(m.location())}`); });
      page.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`); }); await page.addInitScript(probe);
      await page.goto(`http://127.0.0.1:${server.address().port}/${name}/?creator=0&quick=1&seed=424242&world=0&warmChart=0&prepChart=0&ladder=off`);
      const version = await page.evaluate(async () => (await fetch('./version.json', { cache: 'no-store' })).json());
      const expected = name === 'baseline' ? process.env.BASE_SHA : process.env.EXPECT_SHA;
      if (!version.version.includes(expected.slice(0, 7))) throw Error(`servedSHA mismatch: ${version.version}`);
      await page.waitForFunction(() => window.witch?.ready, null, { timeout: 150000 });
      const bootDemand = await page.evaluate(() => {
        const v = window.witch.view;
        return { at: performance.now(), beachExists: !!v.ground.beach, beachOn: v.beachView.on, coastReadiness: v.ground.coastReadiness ?? null, fly: v.fly ? { x: v.fly.tx, z: v.fly.tz } : null,
          coastMarks: performance.getEntriesByType('mark').filter(m => m.name.startsWith('ground:coast-')).map(m => ({ name: m.name, at: m.startTime, detail: m.detail })) };
      });
      (report.bootDemands ??= []).push({ name, version, ...bootDemand }); save();
      await page.keyboard.press('Space');
      await page.waitForFunction(() => { const el = document.getElementById('start'); return !el || getComputedStyle(el).display === 'none'; }, null, { timeout: 10000 });
      const before = await page.evaluate(() => {
        const v = window.witch.view, gl = v.renderer.getContext(), d = gl.getExtension('WEBGL_debug_renderer_info');
        return { at: performance.now(), gpu: d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), programs: v.renderer.info.programs.length, beachExists: !!v.ground.beach,
          beachOn: v.beachView.on, coastReadiness: v.ground.coastReadiness ?? null,
          coastMarks: performance.getEntriesByType('mark').filter(m => m.name.startsWith('ground:coast-')).map(m => ({ name: m.name, at: m.startTime, detail: m.detail })),
          methods: window.__groundExtras.methods, links: window.__groundExtras.links.map(({ object, ...r }) => ({ ...r, readyWallMs: r.readyAt === null ? null : r.readyAt - r.at })) };
      });
      if (!/Intel/i.test(before.gpu) || /SwiftShader/i.test(before.gpu)) throw Error(`not Intel hardware: ${before.gpu}`);
      const coast = await page.evaluate(() => {
        const w = window.witch, v = w.view, g = w.game, p = window.__groundExtras;
        w.manual = true; g.wake = undefined; g.islandReady = true; g.clock.paused = false;
        const point = [0, Math.PI / 2, Math.PI, Math.PI * 1.5].map(a => w.coastFacing(a)).find(Boolean); if (!point) throw Error('No coast');
        const shot = w.shot(`at:${point.x - point.nx * 30},${point.z - point.nz * 30}`); if (!shot.ok) throw Error(shot.say);
        v.dark.k = 1; v.dark.at = NaN; v.fly = null; p.coastAt = performance.now(); p.methods = {}; p.unsafeReads = [];
        const draw = v.renderer.renderBufferDirect.bind(v.renderer);
        v.renderer.renderBufferDirect = (...args) => { if (args[4] === v.ground.mesh) p.ground.push({ at: performance.now(), material: args[3].name || args[3].type, beach: 'GROUND_BEACH' in (args[3].defines || {}), share: v.ground.coastReadiness?.share ?? null }); return draw(...args); };
        requestAnimationFrame(function render() { if (!w.manual) return; v.render(g.clock.time); requestAnimationFrame(render); });
        return { at: p.coastAt, point };
      });
      await page.waitForFunction(() => window.witch.view.beachView.on, null, { timeout: 10000 });
      if (await page.evaluate(() => { const el = document.getElementById('start'); return el && getComputedStyle(el).display !== 'none'; })) throw Error('Start screen covers coast capture');
      if (name === 'candidate') await page.screenshot({ path: `${out}-${name}-first.png` });
      await page.waitForFunction(() => { const g = window.witch.view.ground; return 'GROUND_BEACH' in (g.mesh.material.defines || {}) && (!g.coastReadiness || g.coastReadiness.share === 1); }, null, { timeout: 65000 });
      await page.screenshot({ path: `${out}-${name}-ready.png` });
      const result = await page.evaluate(() => {
        const v = window.witch.view, p = window.__groundExtras;
        return { at: performance.now(), coastReadiness: v.ground.coastReadiness ?? null, methods: p.methods, unsafeReads: p.unsafeReads,
          coastProgramIds: [...(v.renderer.properties.get(v.ground.beach).programs?.values() ?? [])].map(p => p.id),
          links: p.links.filter(r => r.at >= p.coastAt).map(({ object, ...r }) => ({ ...r, readyWallMs: r.readyAt === null ? null : r.readyAt - r.at })),
          worstCoastFrameMs: Math.max(0, ...p.frames.filter(f => f.at >= p.coastAt).map(f => f.ms)), groundSubmissions: p.ground,
          marks: performance.getEntriesByType('mark').filter(m => m.startTime >= p.coastAt).map(m => ({ name: m.name, at: m.startTime - p.coastAt, detail: m.detail })) };
      });
      report.rows.push({ name, version, bootWallMs: before.at, elapsedWallMs: Date.now() - started, before, coast, result, errors }); save();
      if (errors.length) throw Error(errors.join('; '));
      if (!result.groundSubmissions.length) throw Error('No ground submitted at coast');
      if (name === 'candidate' && before.beachExists) throw Error('Candidate has pre-existing coast material at boot; fresh coast-demand scenario not established (see bootDemands)');
      if (name === 'candidate' && result.unsafeReads.some(r => result.coastProgramIds.includes(r.id))) throw Error('Unfinished coast program queried');
      await context.close();
    }
    report.complete = report.rows.length === 2; save();
  } catch (e) { report.error = String(e); save(); process.exitCode = 1; }
  finally { clearTimeout(timer); if (browser) await browser.close(); await new Promise(ok => server.close(ok)); }
})();
