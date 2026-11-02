// Canonical/cloud program-count evidence only, not latency or native-route acceptance.
const fs = require('node:fs'), path = require('node:path');
if (process.platform === 'win32' || !(process.env.CI === 'true' || process.env.WITCH_CANONICAL_EVIDENCE === '1')) throw Error('Cloud/canonical only; no laptop browser');
const [base, sha, output] = process.argv.slice(2);
if (!base || !/^[a-f0-9]{40}$/.test(sha ?? '') || !output) throw Error('Usage: program-counts.cjs <served URL> <exact SHA> <fresh output directory>');
let playwright; try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }
const out = path.resolve(output); if (fs.existsSync(out)) throw Error('Fresh output required'); fs.mkdirSync(out, { recursive: true });
const result = { source: sha, evidence: 'program objects observed, not compile/link timing; baseline newObserved seeds the inventory, subsequent values count unseen objects since the previous sample', samples: [] };
const save = () => fs.writeFileSync(path.join(out, 'counts.json'), JSON.stringify(result, null, 2));
(async () => {
  const version = await fetch(new URL('version.json', base), { cache: 'no-store', signal: AbortSignal.timeout(15000) }).then(r => { if (!r.ok) throw Error('No version'); return r.json(); });
  if (!version.version?.endsWith(sha.slice(0, 7))) throw Error('Served source mismatch'); result.version = version;
  const browser = await playwright.chromium.launch({ headless: true }), hard = setTimeout(() => { result.failure = '270s bound'; save(); void browser.close(); }, 270000);
  try {
    const context = await browser.newContext({ viewport: { width: 960, height: 540 } }), page = await context.newPage();
    page.setDefaultTimeout(15000);
    const url = new URL(base); url.search = new URLSearchParams({ quick: '1', shot: 'room:parlour', seed: '123', creator: '0', telephone: '1', telephoneCalls: '1' }).toString();
    await page.goto(url.href, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction(() => window.witch?.ready, null, { timeout: 120000 });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press('Enter'); await page.waitForFunction(() => !window.witch.game.clock.paused); }
    await page.evaluate(() => {
      const w = window.witch; w.manual = true;
      const seen = new WeakSet();
      window.__programSample = label => {
        const programs = w.view.renderer.info.programs ?? []; let newObserved = 0;
        for (const p of programs) if (!seen.has(p)) { seen.add(p); newObserved++; }
        return { label, programCount: programs.length, newObserved, mode: w.game.witch.mode, perched: !!w.game.witch.perch,
          parallelShaderCompileAvailable: w.view.renderer.extensions.has('KHR_parallel_shader_compile'), houseReveal: w.view.post.behind, artPending: w.view.assets.pending, readiness: { ...w.view.readiness } };
      };
    });
    result.samples.push(await page.evaluate(() => window.__programSample('indoor-baseline')));
    if (!result.samples[0].perched || result.samples[0].mode !== 'ground') throw Error('Indoor coverage not confirmed');
    const render = label => page.evaluate(label => { window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); return window.__programSample(label); }, label);
    for (let n = 1; n <= 3; n++) { result.samples.push(await render('indoor-' + n)); await page.waitForTimeout(100); }
    const placed = await page.evaluate(() => {
      const w = window.witch, h = w.telephoneProof().house, terrace = h.shape.trunk.find(r => r.id === 'terrace'), a = h.terrace.takeoff.angle * Math.PI / 180, t = h.turn * Math.PI / 180;
      const x = terrace.x + Math.cos(a) * (terrace.r + 8), z = terrace.z + Math.sin(a) * (terrace.r + 8);
      return w.shot(`at:${h.at.x + x * Math.cos(t) + z * Math.sin(t)},${h.at.z - x * Math.sin(t) + z * Math.cos(t)},treetop`).ok;
    });
    if (!placed) throw Error('Outdoor fixture placement failed');
    result.samples.push(await page.evaluate(() => window.__programSample('outdoor-before-first-render')));
    for (let n = 1; n <= 6; n++) { result.samples.push(await render('outdoor-' + n)); await page.waitForTimeout(100); }
    result.coverage = { indoorFrames: 3, outdoorFrames: 6, directShotFixture: true, pendingArtAtEnd: result.samples.at(-1).artPending,
      lateArtCaveat: result.samples.at(-1).artPending !== 0 || result.samples.at(-1).readiness.stage !== 'ready' };
    if (result.samples.at(-1).perched || result.samples.at(-1).mode !== 'treetop') throw Error('Outdoor coverage not confirmed');
  } catch (e) { result.failure = e.message; process.exitCode = 1; }
  finally { clearTimeout(hard); await browser.close(); save(); }
})().catch(e => { result.failure = e.message; save(); process.exitCode = 1; });
