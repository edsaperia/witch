// Canonical runner: node tools/smoke/paused-world.cjs BASE_URL BASE_SHA CANDIDATE_URL CANDIDATE_SHA
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }

async function saveMismatch(page, reference, sha) {
  const evidence = await page.evaluate(reference => {
    const a = window.pauseProbe[reference], b = window.pauseProbe.frame;
    const width = Math.max(a.w, b.w), height = Math.max(a.h, b.h);
    const mask = new Uint8ClampedArray(width * height * 4);
    let changed = 0, left = width, top = height, right = -1, bottom = -1;
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const inA = x < a.w && y < a.h, inB = x < b.w && y < b.h;
      const i = 4 * ((a.h - 1 - y) * a.w + x), j = 4 * ((b.h - 1 - y) * b.w + x);
      let different = inA !== inB;
      if (inA && inB) for (let c = 0; c < 4; c++) different ||= a.bytes[i + c] !== b.bytes[j + c];
      const k = (y * width + x) * 4;
      mask[k + 3] = 255;
      if (!different) continue;
      mask.fill(255, k, k + 3);
      changed++;
      left = Math.min(left, x); right = Math.max(right, x);
      top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
    function png(w, h, bytes) {
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').putImageData(new ImageData(bytes, w, h), 0, 0);
      return canvas.toDataURL('image/png').split(',')[1];
    }
    function framePNG({ w, h, bytes }) {
      // WebGL readPixels starts at bottom left. Write the PNGs and bbox in screen coordinates.
      const rows = new Uint8ClampedArray(bytes.length), stride = w * 4;
      for (let y = 0; y < h; y++) rows.set(bytes.subarray(y * stride, (y + 1) * stride), (h - 1 - y) * stride);
      return png(w, h, rows);
    }
    return { changed, bbox: changed ? { left, top, right, bottom } : null,
      images: { [reference]: framePNG(a), repaint: framePNG(b), diff: png(width, height, mask) } };
  }, reference);
  const dir = path.resolve(process.env.PAUSE_PROOF_OUT || 'paused-world-proof');
  await fs.mkdir(dir, { recursive: true });
  for (const [name, data] of Object.entries(evidence.images)) {
    await fs.writeFile(path.join(dir, name + '.png'), Buffer.from(data, 'base64'));
  }
  console.log(JSON.stringify({ sha, reference, changedPixels: evidence.changed, bboxTopLeftInclusive: evidence.bbox, directory: dir }));
}

async function measure(browser, url, sha, candidate) {
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  try {
    const manifest = await page.request.get(new URL('version.json', url).href);
    assert.equal(manifest.status(), 200);
    assert.ok((await manifest.json()).version.endsWith(sha.slice(0, 7)), 'wrong served build');
    const game = new URL(url);
    game.search = 'opening=bedroom&quick=1&seed=123&island=4&wave=off&spell=wait&debug';
    await page.goto(game.href);
    await page.waitForFunction(() => window.witch?.ready, null, { timeout: 900000 });
    // Wake normally. The creator=0 shortcut skips the bedroom, so it cannot produce
    // the first morning's dressing-table pointer, however long the test waits.
    const wakeWait = { timeout: 300000, polling: 250 };
    await page.waitForFunction(() => window.witch.game.wake?.beat === 'alarm', null, wakeWait);
    await page.keyboard.down('KeyD');
    try {
      await page.waitForFunction(() => ['stretch', 'up'].includes(window.witch.game.wake?.beat), null, wakeWait);
    } finally { await page.keyboard.up('KeyD'); }
    await page.waitForFunction(() => {
      const { game, guide, view } = window.witch;
      const pin = guide.pin();
      return game.clock.time > 2 && game.wake?.open && game.party.spellAt === null && pin.key.startsWith('dress:') &&
        pin.key.includes('dressingTable') && pin.strength > 0 && view.pins.size > 0;
    }, null, wakeWait);
    await page.evaluate(() => {
      const view = window.witch.view, render = view.render.bind(view);
      const probe = window.pauseProbe = { draws: 0, sample: false, pixels: null };
      view.render = (...args) => {
        const result = render(...args);
        probe.draws++;
        if (probe.sample) {
          // Read inside the render task, before the browser discards the backbuffer.
          const gl = view.renderer.getContext(), w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
          const pixels = new Uint8Array(w * h * 4);
          gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
          let hash = 2166136261;
          for (const byte of pixels) hash = Math.imul(hash ^ byte, 16777619);
          probe.pixels = [w, h, hash];
          probe.frame = { w, h, bytes: pixels };
        }
        return result;
      };
    });
    const snapshot = () => page.evaluate(() => ({
      at: performance.now(), draws: window.pauseProbe.draws, time: window.witch.game.clock.time,
      phases: Array.from(window.witch.view.pins, p => p.scale), pixels: window.pauseProbe.pixels,
    }));
    const hold = async (name, duration) => {
      const before = await snapshot();
      if (candidate && name !== 'bestiary') {
        // A live menu frame restores its own stamp while the world canvas is held.
        await page.locator('#pause-sliders pre.stamp').evaluate(el => { el.textContent = 'pause proof'; });
        await page.waitForFunction(() => document.querySelector('#pause-sliders pre.stamp')?.textContent.includes('seed '));
      }
      await page.waitForTimeout(duration);
      const after = await snapshot();
      const count = after.draws - before.draws;
      console.log(JSON.stringify({ sha, name, count, elapsedMs: after.at - before.at, drawsPerMinute: count * 60000 / (after.at - before.at) }));
      assert.equal(after.time, before.time, name + ' simulation advanced');
      if (candidate) {
        assert.equal(count, 0, name + ' world redrew');
        assert.deepEqual(after.phases, before.phases, name + ' pointer phase changed');
      }
    };
    if (candidate) {
      await page.evaluate(() => { window.pauseProbe.sample = true; });
      await page.waitForFunction(() => window.pauseProbe.pixels !== null);
    }
    await page.keyboard.press('Escape');
    await page.waitForSelector('body.paused');
    const heldPixels = await page.evaluate(() => {
      window.pauseProbe.held = window.pauseProbe.frame;
      return window.pauseProbe.pixels;
    });
    await hold('pause', 60000);
    if (!candidate) return;
    assert.ok((await snapshot()).phases.length, 'need a visible world pointer fixture');
    // The real control opens Settings after a minute with no world draws.
    await page.getByRole('button', { name: /show settings page/i }).click();
    await page.waitForSelector('#settings-page.open');
    await hold('settings', 10000);
    await page.keyboard.press('Escape');
    await page.waitForSelector('#settings-page.open', { state: 'hidden' });
    await page.waitForSelector('body.paused');
    await page.evaluate(() => { window.pauseProbe.sample = true; });
    async function repaint() {
      const before = await snapshot();
      // Same-size resize uses the normal fit callback and keeps pixels comparable.
      await page.evaluate(() => window.dispatchEvent(new Event('resize')));
      await page.waitForFunction(n => window.pauseProbe.draws > n, before.draws);
      await page.waitForTimeout(1000);
      const after = await snapshot();
      assert.equal(after.draws - before.draws, 1);
      assert.deepEqual(after.phases, before.phases);
      return after.pixels;
    }
    const first = await repaint();
    assert.ok(first);
    if (first.some((v, i) => v !== heldPixels[i])) await saveMismatch(page, 'held', sha);
    assert.deepEqual(first, heldPixels, 'forced repaint must match the retained picture');
    await page.evaluate(() => { window.pauseProbe.firstRepaint = window.pauseProbe.frame; });
    const second = await repaint();
    if (second.some((v, i) => v !== first[i])) await saveMismatch(page, 'firstRepaint', sha);
    assert.deepEqual(second, first, 'two paused redraws must show the same world pixels');
    await page.keyboard.press('Escape');
    await page.waitForSelector('body.paused', { state: 'hidden' });
    await page.evaluate(() => window.witch.zooOverlay.open());
    await page.waitForFunction(() => window.witch.zooOverlay.isOpen);
    await hold('bestiary', 10000);
    await page.evaluate(() => window.witch.zooOverlay.close());
    await page.waitForFunction(t => window.witch.game.clock.time > t, (await snapshot()).time);
  } finally { await page.close(); }
}

(async () => {
  const [base, baseSha, candidate, candidateSha] = process.argv.slice(2);
  assert.ok(base && baseSha && candidate && candidateSha, 'supply both immutable builds and expected SHAs');
  const browser = await playwright.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  try { await measure(browser, base, baseSha, false); await measure(browser, candidate, candidateSha, true); }
  finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
