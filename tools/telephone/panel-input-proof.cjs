// MP-C: preparation is browser-free; --run is reserved for a canonical cloud allocation.
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '../..');
const BASE = '9e655f938318efd6e581060b4440bf59d29a01fe';
const SIZES = [[960, 480], [960, 540], [1280, 720]];
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const git = (...args) => cp.execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();

// No replacement TelephonePanel/MenuFocus/Freeze implementation or style patch.
async function bundle() {
  return (await require('esbuild').build({ absWorkingDir: ROOT, stdin: {
    resolveDir: ROOT, loader: 'ts', contents: `
import { TelephonePanel } from './src/ui/telephone';
import { Freeze } from './src/platform/freeze';
const actions: Record<string, number> = {};
let panel: TelephonePanel;
const hit = (name: string) => { actions[name] = (actions[name] || 0) + 1; };
// Minimal clock only: exercise real Freeze input ownership, not game stepping/rendering.
const freeze = new Freeze({clock:{paused:false}} as any, 123, 'MP-C standalone');
freeze.quiet = true;
panel = new TelephonePanel({
 dial: () => hit('dial'), answer: () => hit('answer'), decline: () => hit('decline'),
 hangUp: () => hit('hangUp'), close: () => { hit('close'); panel.show(false); },
 retry: () => hit('retry'), confirmIdentity: () => hit('confirm'), digit: () => hit('digit')
});
let gameDown = 0, gameUp = 0, now = 0;
window.addEventListener('keydown', () => gameDown++);
window.addEventListener('keyup', () => gameUp++);
const render = (status = 'available', recent = ['7654321']) => {
 panel.render({own:'1234567',status,peer:'7654321',recent,saved:true});
};
(window as any).proof = {
 render, show: () => panel.show(true), reset: () => { for (const k of Object.keys(actions)) delete actions[k]; gameDown = gameUp = 0; },
 snapshot: () => ({actions:{...actions}, gameDown,gameUp,open:panel.open,paused:freeze.frozen,
  focus:document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent,
  value:(panel.root.querySelector('input') as HTMLInputElement).value,
  scrollTop:panel.root.scrollTop,scrollHeight:panel.root.scrollHeight,clientHeight:panel.root.clientHeight}),
 pad: (pressed: number[]) => {
  (window as any).__pads = [{connected:true,id:'MP-C synthetic standard pad',index:0,mapping:'standard',timestamp:now,
    axes:[0,0,0,0],buttons:Array.from({length:17},(_,i)=>({pressed:pressed.includes(i),touched:false,value:pressed.includes(i)?1:0}))}];
  freeze.pollPad();
  const pad = [...navigator.getGamepads()].find(p=>p) || null;
  panel.pollPad(pad, now += .05);
  return {paused:freeze.frozen,panelPadVisible:!!pad};
 }
};
render(); panel.show(true);
` }, bundle: true, platform: 'browser', format: 'iife', write: false, logLevel: 'silent' })).outputFiles[0].text;
}

async function record(rows, name, operation) {
  const row = { name, pass: false };
  try { row.evidence = await operation(); row.pass = true; }
  catch (e) { row.error = e.message; }
  rows.push(row);
  return row;
}
function requireHit(e) { assert.equal(e.centerHitsControl, true, `Control intercepted: ${JSON.stringify(e)}`); }
async function state(page) { return page.evaluate(() => window.proof.snapshot()); }
async function actionCount(page, name) { return (await state(page)).actions[name] || 0; }
async function geometry(locator) {
  await locator.scrollIntoViewIfNeeded();
  return locator.evaluate(el => {
    const r = el.getBoundingClientRect(), hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return { label: el.getAttribute('aria-label') || el.textContent, rect: r.toJSON(),
      centerHitsControl: !!hit && (hit === el || el.contains(hit)),
      hit: hit?.getAttribute('aria-label') || hit?.textContent,
      focus: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent,
      panelScroll: document.querySelector('#telephone-panel').scrollTop };
  });
}
async function click(page, locator, action) {
  const before = await state(page), hit = await geometry(locator); requireHit(hit);
  await locator.click(); const after = await state(page);
  if (action) assert.equal(after.actions[action] || 0, (before.actions[action] || 0) + 1);
  return { before, hit, after };
}
async function padPress(page, button) {
  await page.evaluate(() => window.proof.pad([]));
  const result = await page.evaluate(b => window.proof.pad([b]), button);
  await page.evaluate(() => window.proof.pad([])); return result;
}

async function cases(page, rows, screenshot) {
  const check = async (name, operation) => {
    const row = await record(rows, name, operation);
    if (!row.pass) {
      row.failureState = await state(page).catch(e => ({ unavailable: e.message }));
      try { await screenshot(`failure-${rows.length}`); } catch (e) { row.screenshotError = e.message; }
    }
    return row;
  };
  const button = name => page.getByRole('button', { name, exact: true });
  const input = page.getByRole('textbox', { name: 'Number to call', exact: true });
  const reset = async status => {
    await page.evaluate(s => { window.proof.render(s); window.proof.show(); window.proof.reset(); }, status);
    await page.waitForTimeout(300); // Reopening preserves the real slide transition too.
  };
  await check('game-key probe is live outside the panel', async () => {
    await page.locator('body').click({ position: { x: 800, y: 10 } });
    await page.keyboard.press('p'); const s = await state(page);
    assert.ok(s.gameDown > 0 && s.gameUp > 0); return s;
  });
  await reset('available');
  await check('native typing/editing and Enter stay local', async () => {
    await input.click(); await input.pressSequentially('7654321');
    await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Backspace'); await page.keyboard.press('Delete');
    assert.equal(await input.inputValue(), '54321');
    await page.keyboard.press('End'); await input.pressSequentially('09e');
    assert.equal(await input.inputValue(), '5432109');
    await page.keyboard.press('Enter'); const s = await state(page);
    assert.equal(s.actions.dial || 0, 0); assert.equal(s.actions.close || 0, 0);
    assert.equal(s.gameDown, 0); assert.equal(s.gameUp, 0); return s;
  });
  await check('Call center and native Enter activate once, not party shortcut', async () => {
    const e = await geometry(button('Call')); requireHit(e);
    await button('Call').focus(); const before = await actionCount(page, 'dial');
    await page.keyboard.press('Enter'); const s = await state(page);
    assert.equal(s.actions.dial, before + 1); assert.equal(s.gameDown, 0); assert.equal(s.gameUp, 0);
    await screenshot('call'); return { hit: e, after: s };
  });
  for (const focus of ['input', 'button']) await check(`Escape pauses/resumes over open panel from ${focus}`, async () => {
    if (focus === 'input') await input.focus(); else await button('Call').focus();
    const before = await state(page); await page.keyboard.press('Escape');
    const paused = await state(page); assert.equal(paused.paused, true); assert.equal(paused.open, true);
    const calls = JSON.stringify(paused.actions);
    // Programmatic focus simulates a stale behind-pause native control; real Freeze must block Enter.
    await button('Call').evaluate(el => el.focus()); await page.keyboard.press('Enter');
    const held = await state(page); assert.equal(JSON.stringify(held.actions), calls);
    const shield = await page.evaluate(() => document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.id);
    assert.equal(shield, 'pause-shield'); await screenshot(`pause-${focus}`);
    await page.keyboard.press('Escape'); const after = await state(page);
    assert.equal(after.paused, false); assert.equal(after.open, true);
    assert.equal(after.actions.close || 0, before.actions.close || 0); return { before, paused, held, shield, after };
  });
  await check('bound back KeyE on button steps away without game propagation', async () => {
    await button('Call').focus(); const before = await actionCount(page, 'close');
    await page.keyboard.press('e'); const s = await state(page);
    assert.equal(s.actions.close, before + 1); assert.equal(s.open, false); assert.equal(s.gameDown, 0); return s;
  });
  await reset('available');
  await check('Step away receives normal click and closes', async () => {
    const e = await click(page, button('Step away'), 'close'); assert.equal(e.after.open, false); return e;
  });
  await reset('available');
  await check('address book selects number without dialing, then Call works', async () => {
    const e = await click(page, button('7654321'));
    assert.equal(e.after.value, '7654321'); assert.equal(e.after.actions.dial || 0, 0);
    const call = await click(page, button('Call'), 'dial'); await screenshot('address-book'); return { selected: e, call };
  });
  await reset('confirming');
  await check('first-contact confirmation is explicit and hit-testable', async () => {
    assert.equal(await button('Call').isDisabled(), true); assert.equal(await actionCount(page, 'confirm'), 0);
    await input.focus(); await page.keyboard.press('Enter'); assert.equal(await actionCount(page, 'confirm'), 0);
    const e = await click(page, button('Connect to this new number'), 'confirm');
    await screenshot('confirmation'); return e;
  });
  await reset('ringing');
  await check('Answer and Not now have independent reachable actions', async () => {
    const answer = await click(page, button('Answer'), 'answer');
    const decline = await click(page, button('Not now'), 'decline'); await screenshot('ringing'); return { answer, decline };
  });
  for (const status of ['error', 'ended']) {
    await reset(status);
    await check(`${status}: Reconnect works and Call is disabled`, async () => {
      assert.equal(await button('Call').isDisabled(), true);
      const e = await click(page, button('Reconnect'), 'retry'); await screenshot(status); return e;
    });
  }
  await reset('connected');
  await check('connected Hang up is reachable', async () => click(page, button('Hang up'), 'hangUp'));
  await reset('available');
  await check('standard pad navigates/scrolls to Step away and chooses once', async () => {
    await page.evaluate(() => window.proof.pad([])); // Prime real MenuFocus once, without activation.
    const focusTrail = [];
    for (let i = 0; i < 60; i++) {
      await padPress(page, 13); const s = await state(page); focusTrail.push({ focus: s.focus, scrollTop: s.scrollTop });
      if (s.focus === 'Step away') break;
    }
    assert.equal((await state(page)).focus, 'Step away');
    const hit = await geometry(button('Step away')); requireHit(hit);
    await padPress(page, 0); const after = await state(page);
    assert.equal(after.actions.close, 1); assert.equal(after.open, false); return { focusTrail, hit, after };
  });
  await reset('available');
  await check('pad Start owns pause and shields underlying panel pad/choose', async () => {
    const open = await padPress(page, 9); assert.equal(open.paused, true); assert.equal(open.panelPadVisible, false);
    const before = await state(page); await padPress(page, 13); await padPress(page, 0);
    const held = await state(page); assert.deepEqual(held.actions, before.actions);
    const resume = await padPress(page, 9); assert.equal(resume.paused, false);
    await padPress(page, 1); const after = await state(page);
    assert.equal(after.actions.close, 1); assert.equal(after.open, false); return { open, before, held, resume, after };
  });
}

async function selfTest() {
  const rows = [];
  await record(rows, 'mock success', async () => ({ focus: 'Call' }));
  await record(rows, 'mock intercept', async () => requireHit({ centerHitsControl: false, hit: 'Dial 1' }));
  assert.equal(rows[0].pass, true); assert.equal(rows[1].pass, false);
  assert.match(rows[1].error, /Dial 1/); assert.equal(rows.length, 2);
  const code = await bundle(); assert.ok(code.includes('telephone-panel') && code.includes('pause-shield'));
  new (require('node:vm').Script)(code); // Parse only; never execute DOM or launch browser in preparation.
  console.log(JSON.stringify({ preparation: 'PASS', mockCases: 2, realBundleBytes: Buffer.byteLength(code), bundleHash: hash(code), browserRun: false }));
}

async function run(allocationFile) {
  const a = JSON.parse(fs.readFileSync(allocationFile, 'utf8'));
  assert.equal(a.environment, 'canonical-cloud'); assert.ok(a.canonicalComment && a.priorSlotFree);
  assert.equal(a.driverHash, hash(fs.readFileSync(__filename)));
  assert.equal(a.sourceSha, git('rev-parse', 'HEAD')); git('merge-base', '--is-ancestor', BASE, 'HEAD');
  assert.equal(git('status', '--porcelain', '--untracked-files=no'), '', 'Tracked tree must be clean');
  const code = await bundle(); assert.equal(a.bundleHash, hash(code));
  const out = path.resolve(a.output); fs.mkdirSync(out, { recursive: true });
  const report = { startedAt: new Date().toISOString(), sourceSha: a.sourceSha, baseline: BASE,
    canonicalComment: a.canonicalComment, driverHash: a.driverHash, bundleHash: hash(code),
    limits: 'Standalone real panel and Freeze; action spies, synthetic pad and game-key probes. No live call, save, real controller or full main integration acceptance.', viewports: [] };
  const save = () => fs.writeFileSync(path.join(out, 'result.json'), JSON.stringify(report, null, 2));
  let browser;
  const cap = setTimeout(() => { report.failure = '180s hard cap'; save(); void browser?.close(); process.exitCode = 1; }, 180000);
  try {
    const pw = require(a.playwrightModule || 'playwright');
    browser = await pw.chromium.launch({ headless: true, ...(a.chromium ? { executablePath: a.chromium } : {}) });
    for (const [width, height] of SIZES) {
      const context = await browser.newContext({ viewport: { width, height } });
      const page = await context.newPage(); page.setDefaultTimeout(4000);
      const v = { width, height, rows: [], pageErrors: [], consoleErrors: [] }; report.viewports.push(v);
      page.on('pageerror', e => v.pageErrors.push(e.message));
      page.on('console', m => { if (m.type() === 'error') v.consoleErrors.push(m.text()); });
      // Proof HTML receives no game URL, external font, art, relay or network data.
      await page.route('**/*', route => route.abort());
      await page.setContent('<!doctype html><html><body style="margin:0;min-height:100vh"><script>window.__pads=[];Object.defineProperty(navigator,"getGamepads",{configurable:true,value:()=>window.__pads});</script></body></html>');
      await page.addScriptTag({ content: code });
      await page.waitForFunction(() => window.proof?.snapshot().open);
      await page.waitForTimeout(300); // Real SlideIn has a220ms transition; never cancel/patch it.
      await cases(page, v.rows, label => page.screenshot({ path: path.join(out, `${width}x${height}-${label}.png`) }));
      save(); await context.close();
    }
    report.pass = report.viewports.length === SIZES.length && report.viewports.every(v =>
      v.rows.length === 15 && v.rows.every(r => r.pass) && !v.pageErrors.length && !v.consoleErrors.length);
  } catch (e) { report.failure = e.stack; report.pass = false; }
  finally { await browser?.close(); clearTimeout(cap); report.finishedAt = new Date().toISOString(); save(); }
  console.log(JSON.stringify({ pass: report.pass ?? false, output: out }));
  process.exitCode = report.pass ? 0 : 1;
}
if (require.main === module) {
  const mode = process.argv[2];
  const task = mode === '--self-test' ? selfTest() : mode === '--bundle-hash' ? bundle().then(b => console.log(hash(b)))
    : mode === '--run' && process.argv[3] ? run(process.argv[3]) : Promise.reject(Error('Use --self-test, --bundle-hash, or --run allocation.json (canonical cloud only)'));
  task.catch(e => { console.error(e.stack); process.exitCode = 1; });
}
module.exports = { bundle, record, requireHit, SIZES, cases };
