// node run.cjs <url> <outdir> <sha> [fireIndex]
const L = require('./lib.cjs'), fs = require('fs'), path = require('path');
const { captureForeground } = require('/home/user/witch/tools/refraction/foreground.cjs');
const { analyse } = require('./calc.cjs');
const [url, out, sha, fireIdxArg] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const T = Date.now(), log = (...a) => console.log(`[${((Date.now() - T) / 1000).toFixed(1)}s]`, ...a);
const kill = setTimeout(() => { console.error('TIMEOUT 15 min'); process.exit(2); }, 15 * 60 * 1000);
(async () => {
  const { b, page, errs, loadS } = await L.open(url); log('loaded', loadS);
  const meta = { url, sha, loadS, timings: {} };
  await L.step(page, 30); await L.settle(page);
  if (process.env.HAT_ON) { meta.hatOn = await page.evaluate(() => { const g = window.witch.game; window.__pre = { wake: g.wake ? { beat: g.wake.beat, open: g.wake.open } : null, spellAt: g.party.spellAt }; const h = window.witch.game.witches[0].hat, was = JSON.stringify(h.down); h.down = null; return { wasDown: was, before: window.__pre }; }); await L.step(page, 10); await L.settle(page); log('hat put on (was down at', meta.hatOn.wasDown, ')'); }
  const freeze = () => page.evaluate(reseed => { if (!window.__pn) { window.__pn = performance.now.bind(performance); window.__dn = Date.now; } performance.now = () => 1000000; Date.now = () => 1790000000000;
    // RESEED: every view.render starts from the same Math.random state (particles otherwise redraw differently each render).
    if (reseed) { const v = window.witch.view, base = Object.getPrototypeOf(v).render; v.render = function (...a) { let s = 777; Math.random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; return base.apply(this, a); }; } }, !!process.env.RESEED);
  const fires = await page.evaluate(() => { const w = window.witch, g = w.game, v = w.view; return v.worldFires.filter(f => f.scale > 0.1).map(f => ({ x: f.x, z: f.z, scale: f.scale, d: Math.hypot(f.x - g.witch.x, f.z - g.witch.z) })).sort((a, b) => a.d - b.d); });
  meta.fires = fires.slice(0, 6); log('fires', JSON.stringify(meta.fires));
  const tryFire = async idx => {
    const fire = fires[idx]; const t0 = Date.now();
    await page.evaluate(({ x, z }) => window.witch.shot(`at:${x},${z + 3}`), fire); await L.step(page, 60, {}, 10); await L.settle(page, 4);
    // Runner-side only: the first composite after moving to the fire takes ~50 s on SwiftShader (probe5), beyond Playwright's
    // 30 s default the helper's screenshots use. Warm it up and raise the page's default timeout; the helper is unchanged.
    { const w0 = Date.now(); await page.screenshot({ timeout: 180000 }); meta.warmupScreenshotS = (Date.now() - w0) / 1000; log('warm-up screenshot s', meta.warmupScreenshotS); }
    page.setDefaultTimeout(120000);
    if (!process.env.NO_FREEZE) await freeze();
    const dir = path.join(out, `fire-${idx}`);
    try { const r = await captureForeground(page, sha, dir, { fire: { x: fire.x, z: fire.z } }); log('fire', idx, 'accepted, distance', r.distance, 's', (Date.now() - t0) / 1000); return { idx, fire, dir, r, wallS: (Date.now() - t0) / 1000 }; }
    catch (e) { log('fire', idx, 'REJECTED', e.message); meta['reject_' + idx] = { fire, error: e.message, wallS: (Date.now() - t0) / 1000 }; return null; }
  };
  const first = fireIdxArg ? +fireIdxArg : 0;
  let got = await tryFire(first); if (!got && !process.env.ONE_FIRE && fires.length > first + 1) got = await tryFire(first + 1);
  if (!got) { meta.errors = errs; fs.writeFileSync(path.join(out, 'run.json'), JSON.stringify(meta, null, 1)); await b.close(); clearTimeout(kill); return; }
  meta.used = { idx: got.idx, fire: got.fire, distance: got.r.distance, captureS: got.wallS, time: got.r.time };
  // Witch mask: re-stage each crossing exactly as the helper did (same frozen clock), render OFF with the
  // witch batch drawn and drawn with no items (her set() wrapped in-page, restored after); differing pixels inside the body envelope = her opaque pixels.
  meta.stages = [];
  for (const [i, st] of got.r.stages.entries()) {
    const t0 = Date.now(), d = path.join(got.dir, `crossing-${i}`);
    const restage = await page.evaluate(async ({ x, z, time }) => {
      const w = window.witch, v = w.view, g = w.game; const saved = { witch: g.witch, camera: g.camera, manual: w.manual, en: v.post.refractionEnabled };
      window.__saved = saved; w.manual = true;
      const res = w.shot(`at:${x},${z}`); if (!res.ok) throw Error(res.say);
      v.post.refractionEnabled = true; v.render(time); await v.assets.whenIdle(); for (let k = 0; k < 4; k++) v.render(time);
      v.post.refractionEnabled = false; v.render(time); return { clock: g.clock.time, items: v.witchBatch.items.length };
    }, { x: st.witch.x, z: st.witch.z, time: got.r.time });
    const vis = await page.screenshot({ path: path.join(d, 'off-recheck.png') });
    await page.evaluate(({ time }) => { const v = window.witch.view, wb = v.witchBatch; wb.__set = wb.set; wb.set = () => wb.__set.call(wb, []); v.render(time); window.__maskItems = wb.items.length; }, { time: got.r.time });
    const hid = await page.screenshot({ path: path.join(d, 'off-nowitch.png') });
    await page.evaluate(({ time }) => { const w = window.witch, v = w.view, g = w.game, s = window.__saved; v.witchBatch.set = v.witchBatch.__set; delete v.witchBatch.__set; g.witch = s.witch; g.camera = s.camera; w.manual = s.manual; v.post.refractionEnabled = s.en; delete window.__saved; }, { time: got.r.time });
    const rd = f => fs.readFileSync(path.join(d, f));
    const a = await analyse(b, { off: rd('off.png'), on: rd('on.png'), ret: rd('off-return.png'), vis, hid }, st.bodyEnvelope);
    fs.writeFileSync(path.join(d, 'diff-on-vs-off-x8.png'), a.png.onX8); fs.writeFileSync(path.join(d, 'diff-return-vs-off-x8.png'), a.png.retX8);
    fs.writeFileSync(path.join(d, 'witch-mask.png'), a.png.mask); fs.writeFileSync(path.join(d, 'side-by-side.png'), a.png.sbs);
    const rec = { crossing: i, lateral: st.lateral, witch: st.witch, foreground: st.foreground, overlapsPlume: st.overlapsPlume, ellipseRadius: st.ellipseRadius, supportDepth: st.supportDepth, farthestBodyDepth: st.farthestBodyDepth, fireShape: st.fireShape, renderer: st.pair.renderer, servedVersion: st.pair.served.version, restage, ...a.stats, analyseS: (Date.now() - t0) / 1000 };
    fs.writeFileSync(path.join(d, 'measure.json'), JSON.stringify(rec, null, 1)); meta.stages.push(rec);
    log('crossing', i, JSON.stringify({ lat: st.lateral, fg: st.foreground, ov: st.overlapsPlume, mask: a.stats.maskPixels, w: a.stats.witch, op: a.stats.opaquePixels, wo: a.stats.witchOpaque, whole: a.stats.whole }));
  }
  meta.errors = errs; meta.totalS = (Date.now() - T) / 1000;
  fs.writeFileSync(path.join(out, 'run.json'), JSON.stringify(meta, null, 1)); log('errors', errs.length, errs.slice(0, 5).join(' | ')); await b.close(); clearTimeout(kill);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
