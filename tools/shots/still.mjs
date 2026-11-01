// Shared still-frame API for a caller-owned allocated page: version, seeded/pinned stepping, warm-up, exact OFF-return and masks.
//   const shot = await loadStill(page, { url, expectedSha }); ... await shot.compare({ read, write, output }); await shot.release();
import fs from 'node:fs/promises';
import path from 'node:path';
import { decodePng, encodePng, diffPixels, actorMask, writeComparison } from './pixels.mjs';

export function verifyVersion(served, expectedSha) {
  if (!/^[a-f0-9]{40}$/.test(expectedSha)) throw Error('Require exact full source SHA');
  if (!String(served.version).includes(expectedSha.slice(0, 7))) throw Error('Served version mismatch');
  return { expectedSha, served, proof: 'Served label includes seven SHA characters; verify full CI artifact SHA separately.' };
}

/** Browser function, self-contained so Playwright can serialize it. */
export function installEnvironment({ seed = 12345, wallMs = 1000, pinClocks = true } = {}, root = window) {
  if (root.__witchStillEnvironment) throw Error('Still environment already installed');
  const previous = { random: root.Math.random, Date: root.Date, now: Object.getOwnPropertyDescriptor(root.performance, 'now'), witch: Object.getOwnPropertyDescriptor(root, 'witch') };
  const state = { seed: seed >>> 0, wallMs, epochMs: wallMs, pinned: pinClocks, nativeNow: root.performance.now.bind(root.performance), current: root.witch, manuals: new Map(), previous };
  state.restore = () => {
    root.Math.random = previous.random; root.Date = previous.Date;
    if (previous.now) Object.defineProperty(root.performance, 'now', previous.now); else delete root.performance.now;
    if (previous.witch) Object.defineProperty(root, 'witch', previous.witch);
    else Object.defineProperty(root, 'witch', { value: state.current, configurable: true, enumerable: true, writable: true });
    for (const [w, manual] of state.manuals) w.manual = manual;
    delete root.__witchStillEnvironment;
  };
  root.__witchStillEnvironment = state;
  try {
    root.Math.random = () => { state.seed = (Math.imul(state.seed, 1664525) + 1013904223) >>> 0; return state.seed / 4294967296; };
    root.Date = class extends previous.Date { constructor(...args) { super(...(args.length ? args : [state.pinned ? state.epochMs : previous.Date.now()])); } static now() { return state.pinned ? state.epochMs : previous.Date.now(); } };
    Object.defineProperty(root.performance, 'now', { value: () => state.pinned ? state.wallMs : state.nativeNow(), configurable: true });
    const manual = w => { if (w && !state.manuals.has(w)) { state.manuals.set(w, w.manual); w.manual = true; } };
    Object.defineProperty(root, 'witch', { configurable: true, enumerable: true, get: () => state.current, set: w => { state.current = w; manual(w); } });
    manual(state.current);
  } catch (error) { state.restore(); throw error; }
  return { seed: seed >>> 0, wallMs };
}
export function restoreEnvironment(root = window) { root.__witchStillEnvironment?.restore(); }
export function pinEnvironment(root = window) {
  const state = root.__witchStillEnvironment; if (!state) throw Error('Install still environment first');
  // Preserve monotonic/epoch clocks separately and do not hold wall-clock loading gates before ready.
  state.wallMs = state.nativeNow(); state.epochMs = state.previous.Date.now(); state.pinned = true;
  return { performanceMs: state.wallMs, epochMs: state.epochMs };
}

export function installPreparedHold(root = window) {
  if (root.__witchStillHold) throw Error('Prepared-scene hold already installed');
  const w = root.witch, v = w.view;
  if (v.fly || v.telescope || w.game.cauldron || v.cauldronLook) throw Error('Prepared hold requires ordinary world Post');
  const state = { view: v, descriptor: Object.getOwnPropertyDescriptor(v, 'render'), time: w.game.clock.time, personal: w.game.herTime, masks: new Map(), calls: 0 };
  root.__witchStillHold = state;
  v.render = (at, draw = true) => {
    if (at !== state.time || w.game.clock.time !== state.time || w.game.herTime !== state.personal) throw Error('Prepared hold cannot advance clocks');
    if (!draw) return;
    v.magic.hideBackdrop(v.scene);
    try { v.post.render(v.scene, v.camera); state.calls++; }
    finally { v.magic.restoreBackdrop(v.scene); }
  };
  return { time: state.time, personal: state.personal, mode: 'prepared scene through existing Post' };
}
export function restorePreparedHold(root = window) {
  const state = root.__witchStillHold; if (!state) return;
  for (const [actor, visible] of state.masks) actor.visible = visible;
  if (state.descriptor) Object.defineProperty(state.view, 'render', state.descriptor); else delete state.view.render;
  delete root.__witchStillHold;
}

async function servedVersion(page) {
  return page.evaluate(async () => { const r = await fetch(new URL('version.json', location.href), { cache: 'no-store' }); if (!r.ok) throw Error('version.json unavailable'); return r.json(); });
}
async function prepare(page) {
  await page.evaluate(async () => { const w = window.witch; w.view.render(w.game.clock.time, false); await w.view.assets.whenIdle(); w.view.render(w.game.clock.time); });
}
const summary = result => { const { amplified, ...metrics } = result; return metrics; };

export async function loadStill(page, { url, expectedSha, seed = 12345, wallMs = 1000, timeout = 120000 }) {
  if (!/^[a-f0-9]{40}$/.test(expectedSha)) throw Error('Require exact full source SHA');
  await page.addInitScript(installEnvironment, { seed, wallMs, pinClocks: false });
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout });
    await page.waitForFunction(() => window.witch?.ready, null, { timeout, polling: 100 });
    const served = await servedVersion(page), version = verifyVersion(served, expectedSha), freeze = await page.evaluate(pinEnvironment);
    let released = false, preparedClock = null;
    return {
      version, freeze,
      async step(frames, controls = {}, dt = 1 / 60) {
        if (released) throw Error('Still capture released');
        if (!Number.isInteger(frames) || frames < 0 || frames > 600 || !(dt > 0 && dt <= 0.1)) throw Error('Invalid bounded step');
        if (frames) preparedClock = null;
        return page.evaluate(({ frames, controls, dt }) => {
          if (window.__witchStillHold) throw Error('Release hold before stepping');
          const w = window.witch;
          for (let i = 0; i < frames; i++) {
            const c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...controls };
            if (i) for (const key of ['dash', 'castParty', 'spell', 'toggleMode']) if (key in c) c[key] = false;
            window.__witchStillEnvironment.wallMs += dt * 1000; window.__witchStillEnvironment.epochMs += dt * 1000; w.frame(c, dt, i === frames - 1);
          }
          return { time: w.game.clock.time, personal: w.game.herTime };
        }, { frames, controls, dt });
      },
      async compare({ read, write, output, validate = null, actors = null, maskThreshold = 24, envelope = null, prepareFrame = true }) {
        if (released) throw Error('Still capture released');
        const original = await page.evaluate(read); if (typeof original !== 'boolean') throw Error('Comparison toggle must be boolean');
        await fs.mkdir(output, { recursive: true });
        let held = false;
        try {
          await page.evaluate(write, true);
          if (prepareFrame) { await prepare(page); preparedClock = await page.evaluate(() => ({ time: window.witch.game.clock.time, personal: window.witch.game.herTime })); }
          else {
            const clock = await page.evaluate(() => ({ time: window.witch.game.clock.time, personal: window.witch.game.herTime }));
            if (!preparedClock || clock.time !== preparedClock.time || clock.personal !== preparedClock.personal) throw Error('Prepare this clock before reusing its scene');
          }
          if (validate) await page.evaluate(validate);
          const hold = await page.evaluate(installPreparedHold); held = true;
          const draw = async on => { await page.evaluate(write, on); await page.evaluate(() => { const w = window.witch; w.view.render(w.game.clock.time); }); };
          const shot = name => page.screenshot({ path: path.join(output, name), timeout: 120000 });
          await draw(false); await page.screenshot({ timeout: 120000 }); // Unmeasured shader/screenshot warm-up.
          await draw(false); const off = decodePng(await shot('off.png'));
          await draw(true); const on = decodePng(await shot('on.png'));
          await draw(false); const returned = decodePng(await shot('off-return.png'));
          const noise = diffPixels(off, returned);
          await writeComparison(path.join(output, 'off-return'), off, returned);
          if (noise.count) throw Error(`OFF-return is not identical: ${noise.count} px, max ${noise.max}; see ${output}/off-return`);
          const full = await writeComparison(path.join(output, 'on-off'), off, on);
          let masked = null;
          if (actors) {
            // Selector is trusted scenario code supplied by the caller, never page/source text.
            await page.evaluate(source => {
              const select = (0, eval)(`(${source})`), state = window.__witchStillHold;
              for (const actor of select(window.witch).flat(Infinity).filter(Boolean)) { if (!state.masks.has(actor)) state.masks.set(actor, actor.visible); actor.visible = false; }
              window.witch.view.render(state.time);
            }, actors.toString());
            let without;
            try { without = decodePng(await shot('off-without-actor.png')); }
            finally { await page.evaluate(() => { for (const [actor, visible] of window.__witchStillHold.masks) actor.visible = visible; window.__witchStillHold.masks.clear(); }); }
            const mask = actorMask(off, without, maskThreshold, envelope), maskRgba = Buffer.alloc(off.data.length);
            for (let i = 0; i < mask.length; i++) { maskRgba[i * 4] = maskRgba[i * 4 + 2] = mask[i] ? 255 : 0; maskRgba[i * 4 + 3] = 255; }
            await fs.writeFile(path.join(output, 'actor-mask.png'), encodePng({ width: off.width, height: off.height, data: maskRgba }));
            masked = await writeComparison(path.join(output, 'actor-on-off'), off, on, { mask });
            masked = { ...masked, threshold: maskThreshold, envelope, maskPixels: [...mask].reduce((a, b) => a + b, 0) };
            if (!masked.maskPixels) throw Error('Actor mask empty: comparison does not establish occlusion');
          }
          const after = await servedVersion(page); if (JSON.stringify(after) !== JSON.stringify(served)) throw Error('Served build changed during comparison');
          const result = { ...version, hold, noise: summary(noise), full, masked, screenshotTimeout: 120000, limitation: 'Stable pixels only; scenario must establish meaningful effect/actor overlap. No GPU/memory or acceptance claim.' };
          await fs.writeFile(path.join(output, 'capture.json'), JSON.stringify(result, null, 2)); return result;
        } finally {
          try { if (held) await page.evaluate(restorePreparedHold); }
          finally { await page.evaluate(write, original); }
        }
      },
      async release() {
        if (released) return;
        try { await page.evaluate(restorePreparedHold); }
        finally { await page.evaluate(restoreEnvironment); released = true; }
      },
    };
  } catch (error) { await page.evaluate(restoreEnvironment).catch(() => {}); throw error; }
}
