// Still API contracts with tiny encoded screenshots and a fake allocated page; no browser.
import { afterEach, expect, it, vi } from 'vitest';
import fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { installEnvironment, restoreEnvironment, installPreparedHold, restorePreparedHold, verifyVersion, loadStill } from './still.mjs';
import { encodePng } from './pixels.mjs';
afterEach(() => vi.unstubAllGlobals());
const sha = '1234567' + 'a'.repeat(33);
function fixture(noise = false) {
  let updates = 0, draws = 0, screenshots = 0;
  const actor = { visible: true }, game = { clock: { time: 1 }, herTime: 2 };
  const render = () => { updates++; };
  const view = { render, camera: {}, scene: {}, assets: { whenIdle: async () => {} }, post: { render() { draws++; } }, magic: { hideBackdrop() {}, restoreBackdrop() {} }, actor };
  const root = { Date, Math: { random: Math.random }, performance: { now: () => 99 }, on: true,
    witch: { manual: false, ready: true, view, game, frame(_controls: unknown, dt: number) { game.clock.time += dt; game.herTime += dt; } } };
  let init: { fn: Function; arg: unknown };
  const page = {
    async addInitScript(fn: Function, arg: unknown) { init = { fn, arg }; },
    async goto() { init.fn(init.arg, root); },
    async waitForFunction(fn: Function) { expect(root.performance.now()).toBe(99); if (!fn()) throw Error('Not ready'); },
    async evaluate(fn: Function, arg?: unknown) { if (fn.toString().includes('version.json')) return { version: 'dev · 1234567', built: 'fixed' }; return fn(arg); },
    async screenshot(options: { timeout: number }) {
      expect(options.timeout).toBe(120000); screenshots++;
      return encodePng({ width: 2, height: 1, data: Buffer.from([root.on ? 40 : 10, noise && screenshots === 4 ? 21 : 20, 30, 255, actor.visible ? 90 : 20, 40, 50, 255]) });
    },
  };
  vi.stubGlobal('window', root);
  return { root, view, page, render, actor, counts: () => ({ updates, draws }) };
}
async function temporary<T>(run: (directory: string) => Promise<T>): Promise<T> {
  const directory = await fs.mkdtemp(join(tmpdir(), 'witch-still-'));
  try { return await run(directory); }
  finally {
    if (resolve(dirname(directory)) !== resolve(tmpdir()) || !basename(directory).startsWith('witch-still-')) throw Error('Unsafe test temporary path');
    await fs.rm(directory, { recursive: true, force: true });
  }
}
it('pins wall clocks/random, catches the manual hook immediately, and restores original descriptors/state', () => {
  const f = fixture(), original = { date: f.root.Date, random: f.root.Math.random, now: f.root.performance.now, witch: Object.getOwnPropertyDescriptor(f.root, 'witch') };
  installEnvironment({ seed: 123, wallMs: 1000 }, f.root);
  expect(f.root.witch.manual).toBe(true); expect(f.root.Date.now()).toBe(1000); expect(new f.root.Date().getTime()).toBe(1000); expect(f.root.performance.now()).toBe(1000);
  const random = [f.root.Math.random(), f.root.Math.random()];
  expect(() => installEnvironment({}, f.root)).toThrow(/already/);
  restoreEnvironment(f.root);
  expect(f.root.Date).toBe(original.date); expect(f.root.Math.random).toBe(original.random); expect(f.root.performance.now).toBe(original.now);
  expect(f.root.witch.manual).toBe(false); expect(Object.getOwnPropertyDescriptor(f.root, 'witch')).toEqual(original.witch);
  installEnvironment({ seed: 123 }, f.root); expect([f.root.Math.random(), f.root.Math.random()]).toEqual(random); restoreEnvironment(f.root);
});
it('holds both clocks and bypasses View updates while preserving Post and restoring the exact wrapper', () => {
  const f = fixture(), descriptor = Object.getOwnPropertyDescriptor(f.view, 'render');
  installPreparedHold(f.root); f.view.render(1); f.view.render(1);
  expect(f.counts()).toEqual({ updates: 0, draws: 2 });
  expect(() => f.view.render(1.1)).toThrow(/clocks/);
  f.root.witch.game.herTime++; expect(() => f.view.render(1)).toThrow(/clocks/);
  restorePreparedHold(f.root); expect(Object.getOwnPropertyDescriptor(f.view, 'render')).toEqual(descriptor);
});
it('rejects wrong build labels/full-SHA shape without inventing a full-SHA server endpoint', () => {
  expect(verifyVersion({ version: 'dev · 1234567' }, sha).expectedSha).toBe(sha);
  expect(() => verifyVersion({ version: 'dev · 7654321' }, sha)).toThrow(/mismatch/);
  expect(() => verifyVersion({ version: '1234567' }, '1234567')).toThrow(/full/);
});
it('asserts exact OFF-return, makes a nonempty actor mask and restores toggle/hold/environment', async () => temporary(async output => {
  const f = fixture(), capture = await loadStill(f.page, { url: 'https://example.invalid', expectedSha: sha });
  try {
    await capture.step(2, { dash: true });
    const result = await capture.compare({ output, read: () => window.on, write: (on: boolean) => { window.on = on; }, actors: (w: any) => [w.view.actor] });
    expect(result.noise.count).toBe(0); expect(result.full.count).toBe(1); expect(result.masked.maskPixels).toBe(1); expect(result.masked.count).toBe(0);
    expect(f.actor.visible).toBe(true); expect(f.root.on).toBe(true); expect(f.view.render).toBe(f.render);
    const updates = f.counts().updates;
    await capture.compare({ output: join(output, 'reuse'), prepareFrame: false, read: () => window.on, write: (on: boolean) => { window.on = on; } });
    expect(f.counts().updates).toBe(updates);
    await capture.step(1);
    await expect(capture.compare({ output: join(output, 'stale'), prepareFrame: false, read: () => window.on, write: (on: boolean) => { window.on = on; } })).rejects.toThrow(/Prepare this clock/);
    expect((await fs.readdir(output))).toContain('capture.json');
  } finally { await capture.release(); }
  expect(f.root.witch.manual).toBe(false);
}));
it('fails unexplained OFF-return drift and still restores the toggle and render hook', async () => temporary(async output => {
  const f = fixture(true), capture = await loadStill(f.page, { url: 'https://example.invalid', expectedSha: sha });
  try { await expect(capture.compare({ output, read: () => window.on, write: (on: boolean) => { window.on = on; } })).rejects.toThrow(/OFF-return is not identical/); }
  finally { await capture.release(); }
  expect(f.root.on).toBe(true); expect(f.view.render).toBe(f.render); expect(f.root.witch.manual).toBe(false);
}));
