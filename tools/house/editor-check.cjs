// Coordinator-only browser QA for the treehouse editor: real art pixels, drag, rotation, undo, copy fallback, validated import.
// EXPECT_SHA=<full source sha> node tools/house/editor-check.cjs <served treehouse-editor.html URL> [out dir]
// Uses an already allocated runner/server; starts no server and never opens the game or changes a player's saves.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
let playwright; try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }
const [url, output = 'previews/treehouse-editor'] = process.argv.slice(2), expected = process.env.EXPECT_SHA;
if (!url || !expected || !/^[a-f0-9]{40}$/.test(expected)) throw Error('Provide the served editor URL and EXPECT_SHA as its full source SHA.');
(async () => {
  const version = await (await fetch(new URL('version.json', url))).json();
  assert.ok(version.version.includes(expected.slice(0, 7)), `Wrong served source: ${JSON.stringify(version)}`);
  fs.mkdirSync(output, { recursive: true });
  const browser = await playwright.chromium.launch({ headless: true });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1500, height: 1100 } });
    page.on('pageerror', e => errors.push(e.message));
    await page.addInitScript(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('fixture denied'); } } }); });
    await page.goto(url);
    await page.locator('#status').filter({ hasText: 'Ready.' }).waitFor({ timeout: 240000 });
    const pixels = await page.evaluate(() => ['plan', 'camera'].map(id => {
      const c = document.getElementById(id), a = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
      let painted = 0; for (let i = 0; i < a.length; i += 4) if (a[i] !== 21 || a[i + 1] !== 27 || a[i + 2] !== 34) painted++;
      return { id, painted, width: c.width, height: c.height };
    }));
    assert.ok(pixels.every(p => p.painted > 1000), JSON.stringify(pixels));
    await page.screenshot({ path: path.join(output, 'overview.png'), timeout: 60000 });
    await page.selectOption('#object', 'wardrobe'); await page.click('#focus');
    const defaultAngle = Number(await page.inputValue('#rotation'));
    const before = Number(await page.inputValue('#x')), canvas = await page.locator('#plan').boundingBox();
    await page.mouse.move(canvas.x + canvas.width / 2, canvas.y + canvas.height / 2);
    await page.mouse.down(); await page.mouse.move(canvas.x + canvas.width / 2 + 30, canvas.y + canvas.height / 2, { steps: 5 }); await page.mouse.up();
    assert.ok(Number(await page.inputValue('#x')) > before, 'Dragging did not move the selected station');
    await page.fill('#rotation', '45'); await page.locator('#rotation').press('Tab');
    await page.click('#copy'); const text = await page.inputValue('#settings'), layout = JSON.parse(text), moved = layout.objects.find(o => o.id === 'wardrobe');
    assert.equal(moved.rotation, 45); assert.ok(Number.isFinite(moved.useAnchor.x));
    assert.match(await page.textContent('#status'), /Clipboard unavailable/);
    await page.click('#restore'); assert.notEqual(Number(await page.inputValue('#x')), moved.x);
    await page.fill('#settings', text); await page.click('#apply'); assert.equal(Number(await page.inputValue('#x')), +moved.x.toFixed(4)); assert.equal(Number(await page.inputValue('#rotation')), 45);
    const bad = structuredClone(layout); bad.objects[0].x = 'bad'; await page.fill('#settings', JSON.stringify(bad)); await page.click('#apply'); assert.match(await page.textContent('#status'), /Could not apply/); assert.equal(Number(await page.inputValue('#rotation')), 45);
    await page.click('#undo'); assert.equal(Number(await page.inputValue('#rotation')), defaultAngle);
    await page.click('#redo'); assert.equal(Number(await page.inputValue('#rotation')), 45);
    await page.locator('#camera[data-pending="0"]').waitFor();
    await page.screenshot({ path: path.join(output, 'moved-station.png'), timeout: 60000 });
    const clutterId = await page.locator('#object option').evaluateAll(options => options.find(o => o.value.startsWith('clutter:')).value);
    await page.selectOption('#object', clutterId);
    const clutterBefore = Number(await page.inputValue('#x'));
    await page.fill('#x', String(clutterBefore + 2)); await page.locator('#x').press('Tab');
    await page.fill('#rotation', '75'); await page.locator('#rotation').press('Tab');
    await page.click('#copy'); const clutterText = await page.inputValue('#settings');
    assert.equal(JSON.parse(clutterText).objects.find(o => o.id === clutterId).rotation, 75);
    await page.click('#restore'); await page.fill('#settings', clutterText); await page.click('#apply');
    assert.equal(Number(await page.inputValue('#x')), +(clutterBefore + 2).toFixed(4));
    assert.equal(Number(await page.inputValue('#rotation')), 75);
    await page.selectOption('#object', 'hats');
    assert.match(await page.textContent('#kind'), /Hat spawn zone/);
    assert.match(await page.textContent('#anchor'), /not a station/);
    assert.doesNotMatch(await page.textContent('#anchor'), /Use position:/);
    await page.click('#copy'); const zone = JSON.parse(await page.inputValue('#settings')).objects.find(o => o.id === 'hats');
    assert.equal(zone.kind, 'hat-spawn-zone'); assert.ok(zone.spawnSlots.length > 0); assert.ok(!('useAnchor' in zone));
    const storage = await page.evaluate(() => Object.keys(localStorage)); assert.equal(storage.length, 0, 'Editor wrote browser save data');
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ expected, version, pixels, moved, assertions: 'PASS', errors }, null, 2));
    console.log('PASS', JSON.stringify({ expected, pixels, moved }));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
