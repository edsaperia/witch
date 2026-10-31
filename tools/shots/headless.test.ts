// Slot validation and deadline behavior with a fake Chromium object, never an actual browser.
import { expect, it, vi } from 'vitest';
import fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { validateSlotEvidence, withHeadlessSlot } from './headless.mjs';
const sha = 'a'.repeat(40);
function evidence(now = Date.now()) { return { headSha: sha, granted: true, canonicalCommentId: 123, freeCommentId: 122, slotId: 'unit-only', inputIdleMs: 300001, inputCheckedAt: new Date(now).toISOString(), gameTabOpen: false, tabsCheckedAt: new Date(now).toISOString(), durationMs: 270000, expiresAt: new Date(now + 270000).toISOString() }; }
it('rejects missing/stale/unsafe evidence without launching anything', () => {
  const now = Date.now(), e = evidence(now);
  expect(validateSlotEvidence(e, sha, now)).toBe(270000);
  for (const patch of [{ granted: false }, { freeCommentId: 0 }, { inputIdleMs: 299999 }, { gameTabOpen: true }, { durationMs: 270001 }, { headSha: 'b'.repeat(40) }, { inputCheckedAt: new Date(now - 60001).toISOString() }, { expiresAt: new Date(now - 1).toISOString() }]) expect(() => validateSlotEvidence({ ...e, ...patch }, sha, now)).toThrow();
});
it('closes its owned browser on deadline and records teardown instead of granting permission', async () => {
  const output = await fs.mkdtemp(join(tmpdir(), 'witch-slot-test-'));
  vi.useFakeTimers();
  const close = vi.fn(async () => {}), browser = { newPage: async () => ({ setDefaultTimeout() {}, on() {} }) };
  const server = { close, kill: vi.fn(async () => {}), wsEndpoint: () => 'fake://owned', process: () => ({ pid: 42 }) };
  const launch = vi.fn(async options => { expect(options.headless).toBe(true); return server; });
  try {
    const promise = withHeadlessSlot({ playwright: { chromium: { launchServer: launch, connect: async () => browser } }, evidence: evidence(), expectedSha: sha, output }, () => new Promise(() => {}));
    // Attach the rejection assertion before moving the timer, avoiding an unhandled promise.
    const assertion = expect(promise).rejects.toThrow(/deadline/);
    await vi.waitFor(() => expect(launch).toHaveBeenCalledOnce());
    await vi.advanceTimersByTimeAsync(270000); await assertion;
    expect(close).toHaveBeenCalledOnce();
    const receipt = JSON.parse(await fs.readFile(join(output, 'slot-receipt.json'), 'utf8'));
    expect(receipt.timedOut).toBe(true); expect(receipt.browserClosed).toBe(true); expect(receipt.requiresOperatorSlotDone).toBe(true);
  } finally {
    vi.useRealTimers();
    if (resolve(dirname(output)) !== resolve(tmpdir()) || !basename(output).startsWith('witch-slot-test-')) throw Error('Unsafe test temporary path');
    await fs.rm(output, { recursive: true, force: true });
  }
});
