// Canonical runner: node tools/smoke/paused-world.cjs BASE_URL BASE_SHA CANDIDATE_URL CANDIDATE_SHA
const assert = require('node:assert/strict');
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }

async function measure(browser, url, sha, candidate) {
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  try {
    const manifest = await page.request.get(new URL('version.json', url).href);
    assert.equal(manifest.status(), 200);
    assert.ok((await manifest.json()).version.endsWith(sha.slice(0, 7)), 'wrong served build');
    const game = new URL(url);
    game.search = 'creator=0&quick=1&seed=123&island=4&wave=off&debug';
    await page.goto(game.href);
    await page.waitForFunction(() => window.witch?.ready, null, { timeout: 900000 });
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 300000 });
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
    const heldPixels = (await snapshot()).pixels;
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
    assert.deepEqual(first, heldPixels, 'forced repaint must match the retained picture');
    assert.deepEqual(await repaint(), first, 'two paused redraws must show the same world pixels');
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
