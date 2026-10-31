// node run.cjs <url> <outdir> <sha> [fireIndex]   env CREATURE=1 to try a creature crossing
const L = require('./lib.cjs'), fs = require('fs'), path = require('path');
const { captureForeground } = require('/home/user/witch/tools/refraction/foreground.cjs');
const { analyse } = require('./calc.cjs');
const [url, out, sha, fireIdxArg] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const T = Date.now(), log = (...a) => console.log(`[${((Date.now() - T) / 1000).toFixed(1)}s]`, ...a);
const kill = setTimeout(() => { console.error('TIMEOUT 20 min'); process.exit(2); }, 20 * 60 * 1000);
(async () => {
  const { b, page, errs, loadS } = await L.open(url); log('loaded', loadS);
  const meta = { url, sha, loadS, timings: {} };
  await L.step(page, 30); await L.settle(page);
  const fires = await page.evaluate(() => { const w = window.witch, g = w.game, v = w.view; return v.worldFires.filter(f => f.scale > 0.1).map(f => ({ x: f.x, z: f.z, scale: f.scale, d: Math.hypot(f.x - g.witch.x, f.z - g.witch.z) })).sort((a, b) => a.d - b.d); });
  meta.fires = fires.slice(0, 6); log('fires', JSON.stringify(meta.fires));
  const fire = fires[fireIdxArg ? +fireIdxArg : 0];
  await page.evaluate(({ x, z }) => window.witch.shot(`at:${x},${z + 3}`), fire); await L.step(page, 60, {}, 10); await L.settle(page, 4);
  { const w0 = Date.now(); await page.screenshot({ timeout: 180000 }); meta.warmupScreenshotS = (Date.now() - w0) / 1000; log('warm-up s', meta.warmupScreenshotS); }
  page.setDefaultTimeout(120000);
  let creatureId = null;
  meta.creatures = await page.evaluate(({ x, z }) => window.witch.game.creatures.filter(c => !c.gone).map(c => ({ id: c.id, species: c.species, friendly: !!c.friendly, boss: !!c.boss, leashed: !!c.leashed, d: Math.hypot(c.x - x, c.z - z) })).sort((a, b) => a.d - b.d).slice(0, 12), fire);
  if (process.env.CREATURE) { const c = meta.creatures.find(c => c.friendly && !c.boss && !c.leashed); creatureId = c ? c.id : null; log('creature candidate', JSON.stringify(c || null)); }
  const t0 = Date.now();
  let r;
  try { r = await captureForeground(page, sha, out, creatureId === null ? { fire: { x: fire.x, z: fire.z } } : { fire: { x: fire.x, z: fire.z }, creatureId }); }
  catch (e) { log('REJECTED', e.message); meta.error = e.message; meta.errors = errs; fs.writeFileSync(path.join(out, 'run.json'), JSON.stringify(meta, null, 1)); await b.close(); clearTimeout(kill); return; }
  meta.captureS = (Date.now() - t0) / 1000; log('captureForeground done', meta.captureS, 'distance', r.distance);
  meta.used = { fire, distance: r.distance, time: r.time, creatureId };
  meta.stages = [];
  for (const [i, st] of r.stages.entries()) {
    const d = path.join(out, `crossing-${i}`), rd = f => fs.readFileSync(path.join(d, f));
    // Mask from the helper's own held frames: off.png vs off-nowitch.png (same prepared scene).
    const a = await analyse(b, { off: rd('off.png'), on: rd('on.png'), ret: rd('off-return.png'), vis: rd('off.png'), hid: rd('off-nowitch.png') }, st.bodyEnvelope);
    fs.writeFileSync(path.join(d, 'diff-on-vs-off-x8.png'), a.png.onX8); fs.writeFileSync(path.join(d, 'diff-return-vs-off-x8.png'), a.png.retX8);
    fs.writeFileSync(path.join(d, 'witch-mask.png'), a.png.mask); fs.writeFileSync(path.join(d, 'side-by-side.png'), a.png.sbs);
    const rec = { crossing: i, lateral: st.lateral, witch: st.witch, batch: st.batch, foreground: st.foreground, overlapsPlume: st.overlapsPlume, ellipseRadius: st.ellipseRadius, supportDepth: st.supportDepth, farthestBodyDepth: st.farthestBodyDepth, fireShape: st.fireShape, renderer: st.pair.renderer, servedVersion: st.pair.served.version, holdCalls: null, driftKeys: st.drift.changes.map(c => c.key), ...a.stats };
    fs.writeFileSync(path.join(d, 'measure.json'), JSON.stringify(rec, null, 1)); meta.stages.push(rec);
    log('crossing', i, JSON.stringify({ lat: st.lateral, fg: st.foreground, ov: st.overlapsPlume, op: a.stats.opaquePixels, wo: a.stats.witchOpaque, whole: a.stats.whole, drift: st.drift.changes.length }));
  }
  meta.creatureStages = [];
  for (const [i, cs] of (r.creatures || []).entries()) {
    const d = path.join(out, `creature-${i}`), rd = f => fs.readFileSync(path.join(d, f));
    const a = await analyse(b, { off: rd('off.png'), on: rd('on.png'), ret: rd('off-return.png'), vis: rd('off.png'), hid: rd('off.png') }, { left: 0, right: 1, bottom: 0, top: 1 });
    fs.writeFileSync(path.join(d, 'diff-on-vs-off-x8.png'), a.png.onX8); fs.writeFileSync(path.join(d, 'diff-return-vs-off-x8.png'), a.png.retX8);
    meta.creatureStages.push({ i, lateral: cs.lateral, id: cs.id, species: cs.species, x: cs.x, z: cs.z, whole: a.stats.whole });
    log('creature', i, JSON.stringify(a.stats.whole));
  }
  meta.errors = errs; meta.totalS = (Date.now() - T) / 1000;
  fs.writeFileSync(path.join(out, 'run.json'), JSON.stringify(meta, null, 1)); log('errors', errs.length, errs.slice(0, 5).join(' | ')); await b.close(); clearTimeout(kill);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
