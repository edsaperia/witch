/** MP-A PLAN (canonical1476#6556803207, 2026-11-01).
 * Test existing visit APIs only: preparation rollback, guest/own save separation,
 * fresh own-night departure, persistent unlock/other-slot isolation, stale callbacks.
 * Own only this new fixture and app/visitAcceptance.test.ts. Production fixes belong
 * to1538. No browser/relay/fullsuite; focused one-worker tests and typecheck.
 * Current prototype98558e261 does not contain the named visit APIs; resolve the
 * exact product dependency before claiming any acceptance case passed.
 */
export const visitAcceptanceCases = {
  rollback: 'failed preparation preserves the own checkpoint',
  isolation: 'admission never saves the host snapshot as the own night',
  departure: 'leaving starts a fresh own night',
  persistence: 'permanent unlocks and other slots survive',
  stale: 'late callbacks cannot resurrect a departed visit',
} as const;

import type { NightStore, SavedNight } from '../app/nightSave';

export function deferred<T = void>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

export function memoryVisitStorage() {
  const bytes = new Map<string, string>();
  const storage = {
    getItem: (key: string) => bytes.get(key) ?? null,
    setItem: (key: string, value: string) => { bytes.set(key, value); },
    removeItem: (key: string) => { bytes.delete(key); },
  };
  return { bytes, storage, snapshot: () => [...bytes].sort(([a], [b]) => a.localeCompare(b)) };
}

/** Opaque persistence sentinel, not a valid game fixture: these APIs must not inspect game contents. */
export const nightSentinel = (identity: string) => ({ build: identity }) as SavedNight;

export function checkpointFixture() {
  const own = nightSentinel('own-checkpoint');
  let value: unknown = structuredClone(own), clears = 0;
  const writes: SavedNight[] = [];
  const store: NightStore = {
    read: async () => value,
    write: async next => { writes.push(structuredClone(next)); value = structuredClone(next); },
    clear: async () => { clears++; value = undefined; },
  };
  return { own, store, writes, current: () => value, clears: () => clears };
}
