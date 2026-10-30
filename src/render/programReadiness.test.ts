import { expect, it } from 'vitest';
import { waitForPrograms } from './programReadiness';

it('keeps waiting beyond 60 seconds until each program is ready, reporting pending identities once', async () => {
  let clock = 0, ready = false, reads = 0;
  const p = { id: 7, name: 'arrival', isReady: () => ready };
  const warnings: number[][] = [];
  await waitForPrograms(() => [p], Promise.resolve(), () => {}, ps => warnings.push(ps.map(p => p.id)), async () => {
    clock += 30000; if (clock === 120000) ready = true;
    expect(reads).toBe(0);
  }, () => clock);
  if (p.isReady()) reads++;
  expect(clock).toBe(120000);
  expect(warnings).toEqual([[7]]);
  expect(reads).toBe(1);
});

it('waits for compile scheduling to settle and includes programs added while waiting', async () => {
  let resolve!: () => void, turns = 0, ready = false;
  const compiled = new Promise<void>(r => { resolve = r; });
  const p = { id: 9, isReady: () => ready };
  await waitForPrograms(() => turns ? [p] : [], compiled, () => {}, () => {}, async () => {
    turns++; if (turns === 1) resolve(); if (turns === 3) ready = true;
    await Promise.resolve();
  });
  expect(turns).toBe(3);
});
