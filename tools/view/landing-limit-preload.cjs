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
    const closePage = page.close.bind(page);
    page.close = async (...args) => {
      // sail-timing closes its page before the browser. Capture here, while the final counters still exist.
      const final = await page.evaluate(() => ({ at: performance.now(), methods: window.__landingDemo?.methods,
        unsafeUniformReads: window.__landingDemo?.unsafeUniformReads, drawStatus: window.witch?.view.shaderDrawStatus,
        longFrames: window.__landingDemo?.longFrames, sections: window.__landingDemo?.sections,
        worstFrameMs: Math.max(0, ...(window.__landingDemo?.frames ?? []).map(f => f.ms)),
        marks: performance.getEntriesByType('mark').filter(e => e.startTime >= (window.__landingDemo?.sail ?? Infinity)).map(e => ({ name: e.name, at: e.startTime, detail: e.name === 'chart:landing-due' ? e.detail : undefined })) }));
      fs.writeFileSync(out + '-final.json', JSON.stringify(final, null, 2));
      const shot = fs.existsSync(out + '-15s.json') ? JSON.parse(fs.readFileSync(out + '-15s.json', 'utf8')) : null;
      const due = final.marks.find(m => m.name === 'chart:landing-due')?.detail?.at;
      const arrival = final.marks.find(m => m.name === 'game:arrived')?.at;
      const failures = [];
      if (!shot || !fs.existsSync(out + '-15s.png')) failures.push('missing15.5s capture');
      if (shot?.chartPresent) failures.push('chart still covering scene at15.5s');
      if (!shot?.fullWitchReady) failures.push('full witch missing at15.5s');
      if (!shot?.sleeping || !shot?.zzz || shot?.clock !== 0) failures.push('not asleep with zzz at00:00 at15.5s');
      const input = fs.existsSync(out + '-input.json') ? JSON.parse(fs.readFileSync(out + '-input.json', 'utf8')) : null;
      if (!input?.unchanged || !input.pauseOpened || !input.pauseClosed) failures.push('input suppression/pause-menu proof missing or failed');
      const woke = fs.existsSync(out + '-woke.json') ? JSON.parse(fs.readFileSync(out + '-woke.json', 'utf8')) : null;
      if (!woke || woke.sleeping || woke.clock <= 0 || woke.beat !== 'up') failures.push('normal wake/night start not observed');
      if (!(shot?.graceMs >= 15000 && shot.graceMs <= 16000)) failures.push('capture outside15–16s');
      if (!(arrival !== undefined && due !== undefined && arrival - due <= 16000)) failures.push('arrival later than16s after due');
      if (!final.marks.some(m => m.name === 'landing:alarm-ready') || !fs.existsSync(out + '-alarm.png')) failures.push('house-ready alarm/screenshot not observed');
      if (final.unsafeUniformReads || !Object.keys(final.methods ?? {}).length) failures.push('unsafe/missing uniform counters');
      for (const [name, m] of Object.entries(final.methods ?? {})) if (m.longestMs > 100) failures.push(`${name} exceeded100ms`);
      // All long frames remain in final.longFrames; the sleep brief specifically forbids shader-query stalls.
      fs.writeFileSync(out + '-verdict.json', JSON.stringify({ ok: !failures.length, failures }, null, 2));
      await closePage(...args);
      if (failures.length) throw Error('landing proof failed: ' + failures.join('; '));
    };
    await page.exposeFunction('__landingSnapshot', async snapshot => {
      fs.writeFileSync(out + '-15s.json', JSON.stringify(snapshot, null, 2));
      await page.screenshot({ path: out + '-15s.png' });
      const state = () => page.evaluate(() => { const g = window.witch.game, w = g.witch; return { clock: g.clock.time, herTime: g.herTime, witch: { x: w.x, z: w.z, mode: w.mode, lift: w.lift }, wake: g.wake?.beat, wave: g.party.wave, creatures: g.creatures.map(c => ({ id: c.id, x: c.x, z: c.z, state: c.state, hp: c.hp })) }; });
      const before = await state();
      for (const key of ['w', 'e', ' ']) await page.keyboard.down(key);
      await page.waitForTimeout(300);
      for (const key of ['w', 'e', ' ']) await page.keyboard.up(key);
      const after = await state();
      await page.keyboard.press('Escape'); await page.waitForTimeout(100);
      const pauseOpened = await page.evaluate(() => document.body.classList.contains('paused'));
      await page.keyboard.press('Escape'); await page.waitForTimeout(100);
      const pauseClosed = await page.evaluate(() => !document.body.classList.contains('paused'));
      fs.writeFileSync(out + '-input.json', JSON.stringify({ unchanged: JSON.stringify(before) === JSON.stringify(after), pauseOpened, pauseClosed, before, after }, null, 2));
    });
    await page.exposeFunction('__landingAlarmSnapshot', async snapshot => {
      fs.writeFileSync(out + '-alarm.json', JSON.stringify(snapshot, null, 2));
      await page.screenshot({ path: out + '-alarm.png' });
      await page.keyboard.down('w'); await page.waitForTimeout(300); await page.keyboard.up('w');
      await page.waitForTimeout(4000);
      const woke = await page.evaluate(() => ({ at: performance.now(), sleeping: window.witch.view.landingSleeping, clock: window.witch.game.clock.time, beat: window.witch.game.wake?.beat }));
      fs.writeFileSync(out + '-woke.json', JSON.stringify(woke, null, 2)); await page.screenshot({ path: out + '-woke.png' });
    });
    await page.addInitScript(() => {
      window.__witchShaderReadinessDelay = 30000;
      const probe = window.__landingDemo = { methods: {}, unsafeUniformReads: 0, frames: [], longFrames: [], sections: {}, sail: null };
      const seen = new WeakSet(), renderers = new WeakSet(); let shot = false, alarmShot = false, previous;
      const counted = (name, fn) => function (...args) {
        if (probe.sail === null) return fn.apply(this, args);
        const start = performance.now(); try { return fn.apply(this, args); }
        finally { const ms = performance.now() - start, m = probe.methods[name] ||= { count: 0, longestMs: 0 }; m.count++; if (ms > m.longestMs) { m.longestMs = ms; m.at = start; if (ms > 100) m.stack = new Error().stack; } }
      };
      function frame(now) {
        const sail = performance.getEntriesByName('chart:sail').at(-1)?.startTime;
        if (sail !== undefined && probe.sail !== sail) { probe.sail = sail; probe.methods = {}; probe.frames = []; probe.unsafeUniformReads = 0; }
        if (previous !== undefined && probe.sail !== null) { probe.frames.push({ at: now, ms: now - previous }); if (probe.frames.length > 20000) probe.frames.shift(); } previous = now;
        const v = window.witch?.view;
        if (v) {
          if (!v.__landingFrameProbe) {
            v.__landingFrameProbe = true;
            const render = v.render;
            v.render = function (...args) { const start = performance.now(); try { return render.apply(this, args); } finally { const ms = performance.now() - start; if (probe.sail !== null && ms > 100) probe.longFrames.push({ at: start, ms, parts: { ...v.ms } }); } };
          }
          for (const [object, name, key] of [[v.crownFar, 'crownBake', 'bake'], [v.houseRooms, 'houseRooms', 'update'], [v.post, 'post', 'render']]) if (object && !object['__landingProbe' + key]) {
            object['__landingProbe' + key] = true; const fn = object[key];
            object[key] = function (...args) { const start = performance.now(); try { return fn.apply(this, args); } finally { if (probe.sail !== null) { const m = probe.sections[name] ||= { longestMs: 0, at: 0 }; const ms = performance.now() - start; if (ms > m.longestMs) { m.longestMs = ms; m.at = start; } } } };
          }
          if (!renderers.has(v.renderer)) {
            renderers.add(v.renderer); const gl = v.renderer.getContext();
            for (const name of ['getProgramInfoLog', 'getShaderInfoLog', 'getActiveUniform', 'getUniformLocation']) gl[name] = counted(name, gl[name]);
          }
          for (const p of v.renderer.info.programs || []) if (!seen.has(p)) {
            seen.add(p); const read = counted('getUniforms', p.getUniforms.bind(p));
            p.getUniforms = function () { if (probe.sail !== null && !p.isReady()) { probe.unsafeUniformReads++; throw Error(`unfinished uniform read ${p.id}`); } return read(); };
          }
          const due = performance.getEntriesByName('chart:landing-due').at(-1)?.detail?.at;
          const alarm = performance.getEntriesByName('landing:alarm-ready').at(-1)?.startTime;
          if (!alarmShot && alarm !== undefined) { alarmShot = true; void window.__landingAlarmSnapshot({ at: performance.now(), alarmAt: alarm, afterDue: alarm - due, clock: window.witch.game.clock.time, beat: window.witch.game.wake?.beat }); }
          if (!shot && due !== undefined && now >= due + 15500) {
            shot = true;
            const gl = v.renderer.getContext(), debug = gl.getExtension('WEBGL_debug_renderer_info');
            const objects = []; v.scene.traverse(o => { if (o.isMesh) objects.push({ id: o.id, name: o.name, parent: o.parent?.name, visible: o.visible, material: o.material?.name, type: o.type }); });
            void window.__landingSnapshot({ sampleAt: performance.now(), dueAt: due, graceMs: performance.now() - due,
              gpu: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
              chartPresent: !!document.getElementById('chart-overlay'), limited: v.shaderLandingLimited, drawStatus: v.shaderDrawStatus,
              fullWitchReady: v.assets.fullWitchReady, houseShare: v.landingHouseShare,
              sleeping: v.landingSleeping, clock: window.witch.game.clock.time, beat: window.witch.game.wake?.beat,
              zzz: document.getElementById('wake-card')?.textContent?.includes('zzz'),
              ground: { id: v.ground.mesh.id, visible: v.ground.mesh.visible, layerMask: v.ground.mesh.layers.mask, behind: v.post.behind, programs: [...(v.renderer.properties.get(v.ground.mesh.material).programs?.values() ?? [])].map(p => ({ id: p.id, ready: p.isReady() })) },
              platformPresent: objects.some(o => o.name === 'Loading house platform' && o.visible),
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
