// Explicitly allocated short headless demo only. Preload before sail-timing.cjs; no performance comparison.
// LANDING_DEMO=1 PLAYWRIGHT_MODULE=<optional> CHROMIUM=<installed Chromium> node -r ./tools/view/landing-limit-preload.cjs tools/view/sail-timing.cjs <out> <dist>
const fs = require('fs'), path = require('path'), Module = require('module');
if (process.env.LANDING_DEMO !== '1') throw Error('LANDING_DEMO=1 and a coordinator headless slot are required');
let pw; try { pw = require(process.env.PLAYWRIGHT_MODULE || 'playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }
const launch = pw.chromium.launch.bind(pw.chromium), out = path.resolve(process.argv[2] || 'landing-demo');
fs.mkdirSync(path.dirname(out), { recursive: true });
pw.chromium.launch = async opts => {
  const browser = await launch({ ...opts, headless: true, args: ['--use-gl=angle', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
  const close = browser.close.bind(browser);
  const hard = setTimeout(async () => { fs.writeFileSync(out + '-deadline.json', JSON.stringify({ error: '5min demo deadline' })); const force = setTimeout(() => process.exit(1), 5000); await close(); clearTimeout(force); process.exit(1); }, 290000);
  browser.close = async () => { clearTimeout(hard); return close(); };
  const newPage = browser.newPage.bind(browser);
  browser.newPage = async options => {
    const page = await newPage(options);
    await page.exposeFunction('__landingSnapshot', async snapshot => {
      fs.writeFileSync(out + '-15s.json', JSON.stringify(snapshot, null, 2));
      await page.screenshot({ path: out + '-15s.png' });
    });
    await page.addInitScript(() => {
      window.__witchShaderReadinessDelay = 30000;
      const probe = window.__landingDemo = { methods: {}, unsafeUniformReads: 0, frames: [], sail: null };
      const seen = new WeakSet(), renderers = new WeakSet(); let shot = false, previous;
      const counted = (name, fn) => function (...args) {
        if (probe.sail === null) return fn.apply(this, args);
        const start = performance.now(); try { return fn.apply(this, args); }
        finally { const m = probe.methods[name] ||= { count: 0, longestMs: 0 }; m.count++; m.longestMs = Math.max(m.longestMs, performance.now() - start); }
      };
      function frame(now) {
        const sail = performance.getEntriesByName('chart:sail').at(-1)?.startTime;
        if (sail !== undefined && probe.sail !== sail) { probe.sail = sail; probe.methods = {}; probe.frames = []; probe.unsafeUniformReads = 0; }
        if (previous !== undefined && probe.sail !== null) { probe.frames.push({ at: now, ms: now - previous }); if (probe.frames.length > 20000) probe.frames.shift(); } previous = now;
        const v = window.witch?.view;
        if (v) {
          if (!renderers.has(v.renderer)) {
            renderers.add(v.renderer); const gl = v.renderer.getContext();
            for (const name of ['getProgramInfoLog', 'getShaderInfoLog', 'getActiveUniform', 'getUniformLocation']) gl[name] = counted(name, gl[name]);
          }
          for (const p of v.renderer.info.programs || []) if (!seen.has(p)) {
            seen.add(p); const read = counted('getUniforms', p.getUniforms.bind(p));
            p.getUniforms = function () { if (probe.sail !== null && !p.isReady()) { probe.unsafeUniformReads++; throw Error(`unfinished uniform read ${p.id}`); } return read(); };
          }
          const due = performance.getEntriesByName('chart:landing-due').at(-1)?.detail?.at;
          if (!shot && due !== undefined && now >= due + 15500) {
            shot = true;
            const gl = v.renderer.getContext(), debug = gl.getExtension('WEBGL_debug_renderer_info');
            const objects = []; v.scene.traverse(o => { if (o.isMesh) objects.push({ id: o.id, name: o.name, parent: o.parent?.name, visible: o.visible, material: o.material?.name, type: o.type }); });
            void window.__landingSnapshot({ sampleAt: performance.now(), dueAt: due, graceMs: performance.now() - due,
              gpu: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
              chartPresent: !!document.getElementById('chart-overlay'), limited: v.shaderLandingLimited, drawStatus: v.shaderDrawStatus,
              unsafeUniformReads: probe.unsafeUniformReads, methods: probe.methods,
              worstFrameMs: Math.max(0, ...probe.frames.filter(f => f.at >= due).map(f => f.ms)), objects,
              marks: performance.getEntriesByType('mark').filter(e => e.startTime >= probe.sail).map(e => ({ name: e.name, at: e.startTime, detail: e.name === 'chart:landing-due' ? e.detail : undefined })) });
          }
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
    return page;
  };
  return browser;
};
const load = Module._load;
Module._load = function (id, ...args) { return id === 'playwright' ? pw : load.call(this, id, ...args); };
