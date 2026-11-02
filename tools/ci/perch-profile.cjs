// Canonical/cloud only. One disposable headless browser, no relay or local listener.
// Diagnostic fixture positioning is not multiplayer acceptance evidence. Outputs stay private.
const fs = require('node:fs'), path = require('node:path');
if (process.platform === 'win32' || !(process.env.CI === 'true' || process.env.WITCH_CANONICAL_EVIDENCE === '1')) throw Error('Cloud/canonical runner required; never run this browser on the laptop');
const [base, sha, output] = process.argv.slice(2);
if (!base || !/^[a-f0-9]{40}$/.test(sha ?? '') || !output) throw Error('Usage: node tools/ci/perch-profile.cjs <served URL> <exact SHA> <private output directory>');
let playwright; try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }
const out = path.resolve(output); if (fs.existsSync(out)) throw Error('Fresh output directory required'); fs.mkdirSync(out, { recursive: true });
const result = { source: sha, mode: 'solo-cloud-native-keys', startedAt: new Date().toISOString(), errors: [] };
const save = () => fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify(result, null, 2));
(async () => {
  const version = await fetch(new URL('version.json', base), { cache: 'no-store', signal: AbortSignal.timeout(15000) }).then(r => { if (!r.ok) throw Error('No served version'); return r.json(); });
  if (!version.version?.endsWith(sha.slice(0, 7))) throw Error('Served source mismatch'); result.version = version;
  const browser = await playwright.chromium.launch({ headless: true });
  const hard = setTimeout(() => { result.failure = '270s hard bound'; save(); void browser.close(); }, 270000);
  try {
    const context = await browser.newContext({ viewport: { width: 960, height: 540 } }), page = await context.newPage(), cdp = await context.newCDPSession(page);
    await page.addInitScript(() => {
      window.__perchProfile = { slow: [], tasks: [], transitions: [], overflow: false };
      const add = (key, value) => { const d = window.__perchProfile; if (d[key].length < 1000) d[key].push(value); else d.overflow = true; };
      addEventListener('witch-slow-frame-evidence', e => add('slow', e.detail));
      for (const type of ['longtask', 'long-animation-frame']) try {
        const observer = new PerformanceObserver(list => { for (const e of list.getEntries()) add('tasks', { type, startTime: e.startTime, duration: e.duration, wallStart: performance.timeOrigin + e.startTime,
          scripts: Array.from(e.scripts ?? [], s => ({ duration: s.duration, functionName: s.sourceFunctionName, invoker: s.invoker, sourceCharPosition: s.sourceCharPosition })) }); });
        observer.observe({ type, buffered: true });
      } catch {}
      let previous; const frame = () => { const b = window.witch?.game?.witches?.[0]?.body; if (b && previous !== !!b.perch) { add('transitions', { at: Date.now(), perched: !!b.perch, mode: b.mode, x: b.x, z: b.z }); previous = !!b.perch; } requestAnimationFrame(frame); }; requestAnimationFrame(frame);
    });
    page.on('pageerror', error => result.errors.push(error.message));
    // Enable the existing read-only geometry adapter; no telephone menu is opened or relay connection made.
    const url = new URL(base); url.search = new URLSearchParams({ quick: '1', shot: 'room:terrace', seed: '123', creator: '0', telephone: '1', telephoneCalls: '1' }).toString();
    await page.goto(url.href, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction(() => window.witch?.ready, null, { timeout: 120000 });
    if (await page.evaluate(() => window.witch.game.clock.paused)) {
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 15000 });
    }
    const target = await page.evaluate(() => {
      const d = window.witch.telephoneProof(), room = d.house.shape.trunk.find(r => r.id === 'terrace'), a = d.house.terrace.takeoff.angle * Math.PI / 180, t = d.house.turn * Math.PI / 180;
      const x = room.x + Math.cos(a) * (room.r + 8), z = room.z + Math.sin(a) * (room.r + 8);
      return { x: d.house.at.x + x * Math.cos(t) + z * Math.sin(t), z: d.house.at.z - x * Math.sin(t) + z * Math.cos(t) };
    });
    await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 1000 }); await cdp.send('Profiler.start');
    await cdp.send('Tracing.start', { categories: 'devtools.timeline,v8,disabled-by-default-v8.cpu_profiler', transferMode: 'ReturnAsStream' });
    const until = Date.now() + 90000, held = new Set();
    while (Date.now() < until) {
      const b = await page.evaluate(() => { const b = window.witch.game.witches[0].body; return { x: b.x, z: b.z, perched: !!b.perch }; });
      if (!b.perched) { result.departedAt = new Date().toISOString(); break; }
      const dx = target.x - b.x, dz = target.z - b.z, want = new Set();
      if (Math.abs(dx) > .3) want.add(dx > 0 ? 'ArrowRight' : 'ArrowLeft');
      if (Math.abs(dz) > .3) want.add(dz > 0 ? 'ArrowDown' : 'ArrowUp');
      for (const key of held) if (!want.has(key)) { await page.keyboard.up(key); held.delete(key); }
      for (const key of want) if (!held.has(key)) { await page.keyboard.down(key); held.add(key); }
      await page.waitForTimeout(80);
    }
    for (const key of held) await page.keyboard.up(key);
    await page.waitForTimeout(10000);
    result.diagnostics = await page.evaluate(() => window.__perchProfile);
    fs.writeFileSync(path.join(out, 'cpu-profile.private.json'), JSON.stringify((await cdp.send('Profiler.stop')).profile));
    const complete = new Promise(resolve => cdp.once('Tracing.tracingComplete', resolve)); await cdp.send('Tracing.end');
    const { stream } = await complete; const fd = fs.openSync(path.join(out, 'trace.private.json'), 'w'); let bytes = 0;
    try { for (;;) { const chunk = await cdp.send('IO.read', { handle: stream, size: 1048576 }); const data = Buffer.from(chunk.data, chunk.base64Encoded ? 'base64' : 'utf8'); bytes += data.length; if (bytes > 96 * 1024 * 1024) throw Error('Trace retention cap'); fs.writeSync(fd, data); if (chunk.eof) break; } } finally { fs.closeSync(fd); await cdp.send('IO.close', { handle: stream }); }
    if (!result.departedAt) throw Error('Native solo route did not leave perch; no hitch conclusion');
  } catch (error) { result.failure = error.message; process.exitCode = 1; }
  finally { clearTimeout(hard); await browser.close(); result.finishedAt = new Date().toISOString(); save(); }
})().catch(error => { result.failure = error.message; save(); process.exitCode = 1; });
