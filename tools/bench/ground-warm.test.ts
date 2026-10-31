import {describe,it,expect,beforeAll,afterAll,vi} from 'vitest';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {verifyInventory} from './ground-warm-preflight.mjs';

let groundWarmFixture: typeof import('./ground-warm-fixture').groundWarmFixture;
beforeAll(async () => {
  vi.resetModules();
  const storage = new Map<string,string>();
  vi.stubGlobal('localStorage',{getItem:(k:string)=>storage.get(k)??null,setItem:(k:string,v:string)=>storage.set(k,v),removeItem:(k:string)=>storage.delete(k)});
  ({groundWarmFixture} = await import('./ground-warm-fixture'));
});
afterAll(() => { vi.unstubAllGlobals();vi.resetModules(); });

describe('ground warm browser-free preflight', () => {
  it('resolves actual shots, seeds, reachable order and descriptors', () => {
    const fixture = groundWarmFixture();
    expect(fixture.inside).toMatch(/^room:[a-z0-9]+$/);
    expect(fixture.targets).toHaveLength(2);
    expect(fixture.targets.every(t => t.seed === fixture.seed && 'GROUND_SPECIALIZED' in t.defines)).toBe(true);
    expect(Math.floor(fixture.random * 1000000)).toBe(fixture.seed);
  });
  it('rejects missing room/target data and invalid seeds before browser work', () => {
    expect(() => groundWarmFixture({rooms:[]})).toThrow(/room/);
    expect(() => groundWarmFixture({found:['no-such-island','other']})).toThrow(/target/);
    expect(() => groundWarmFixture({seed:NaN})).toThrow(/seed/);
  });
  it('rejects missing and escaping built paths', () => {
    const root = mkdtempSync(join(tmpdir(),'ground-warm-'));
    try {
      writeFileSync(join(root,'index.html'),'fixture');
      expect(() => verifyInventory(root,{'missing.js':'abc'})).toThrow(/built path/);
      expect(() => verifyInventory(root,{'../outside.js':'abc'})).toThrow(/built path/);
      expect(() => verifyInventory(root,{'index.html':'wrong-hash'})).toThrow(/built path/);
    } finally { rmSync(root,{recursive:true,force:true}); }
  });
});
