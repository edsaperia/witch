import { expect, it } from 'vitest';
import { monitorProgramLink, waitForPrograms } from './programReadiness';

it('detects a broken link once after completion, without status or log reads while unfinished', () => {
  let ready = false, statusReads = 0, logReads = 0; const messages: string[] = [];
  const p = { id: 42, program: {} as WebGLProgram, isReady: () => ready };
  monitorProgramLink({ LINK_STATUS: 35714, getProgramParameter: () => { statusReads++; return false; }, getProgramInfoLog: () => { logReads++; return 'broken fragment'; } }, p, m => messages.push(m));
  expect(p.isReady()).toBe(false); expect(statusReads + logReads).toBe(0);
  ready = true; expect(p.isReady()).toBe(true); expect(p.isReady()).toBe(true);
  expect(statusReads).toBe(1); expect(logReads).toBe(1); expect(messages[0]).toContain('broken fragment');
});

it('checks successful links after completion without reading their logs', () => {
  let logs = 0; const p = { id: 43, program: {} as WebGLProgram, isReady: () => true };
  monitorProgramLink({ LINK_STATUS: 35714, getProgramParameter: () => true, getProgramInfoLog: () => { logs++; return ''; } }, p, () => { throw Error('unexpected failure'); });
  expect(p.isReady()).toBe(true); expect(logs).toBe(0);
});

it('expires a15s landing grace without reading unfinished uniforms, then finishes in the background at30s', async () => {
  let clock = 0, reads = 0;
  const p = { id: 83, isReady: () => clock >= 30000, getUniforms: () => { if (clock < 30000) throw Error('blocking read'); reads++; } };
  const pause = async () => { clock += 50; await Promise.resolve(); };
  const complete = await waitForPrograms(() => [p], Promise.resolve(), () => {}, () => {}, pause, () => clock, () => 15000);
  expect(complete).toBe(false); expect(clock).toBe(15000); expect(reads).toBe(0);
  expect(await waitForPrograms(() => [p], Promise.resolve(), () => {}, () => {}, pause, () => clock)).toBe(true);
  p.getUniforms(); expect(clock).toBe(30000); expect(reads).toBe(1);
});

it('preserves fast completion and cancels an obsolete island wait without uniform reads', async () => {
  let clock = 0;
  const pause = async () => { clock += 50; await Promise.resolve(); };
  expect(await waitForPrograms(() => [{ id: 1, isReady: () => clock >= 250 }], Promise.resolve(), () => {}, () => {}, pause, () => clock, () => 15000)).toBe(true);
  expect(clock).toBe(250);
  expect(await waitForPrograms(() => [{ id: 2, isReady: () => false }], new Promise(() => {}), () => {}, () => {}, pause, () => clock, () => -Infinity)).toBe(false);
});

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
