import { expect, it } from 'vitest';
import { sleepingLegendSizeProblems } from '../art/checks/sleepingLegendSize.js';
import { M } from '../art/core.js';

// Real featheredserpent/marten generation and every original assertion run on the
// existing sleeping-legends art task's sprites, both frames and facings. No timeout increase.
const sprite = () => ({ w: 2, h: 2, m: new Uint8Array([M.BODY, 0, M.BODY, 0]), n: new Float32Array(12), groundLine: 1, origin: [1, 1] });
const pair = () => { const a = sprite(), b = sprite(); b.m[0] = M.BODY2; return [a, b]; };
it('accepts two distinct valid breaths without modifying sprites', () => {
  const breaths = pair(), before = structuredClone(breaths);
  expect(sleepingLegendSizeProblems({ h: 2 }, breaths)).toEqual([]);
  expect(breaths).toEqual(before);
});
it('rejects every original size, contact, normal, material, ground, origin and breath violation', () => {
  for (const frame of [0, 1]) {
    const cases: [string, (sp: ReturnType<typeof sprite>) => void][] = [
      ['height', sp => sp.h = 3], ['bottom row', sp => sp.m.fill(0, 2)],
      ['finite normals', sp => sp.n[0] = Infinity], ['finite normals', sp => sp.n[0] = NaN],
      ['ground line', sp => sp.groundLine = 0], ['origin', sp => sp.origin[0] = -1],
      ['origin', sp => sp.origin[0] = 3],
      ...[M.PUPIL, M.IRIS, M.MAGIC, M.MAGIC2, M.GLOW].map(mat => ['awake eyes/glow', (sp: ReturnType<typeof sprite>) => { sp.m[0] = mat; }] as [string, (sp: ReturnType<typeof sprite>) => void]),
    ];
    for (const [reason, mutate] of cases) { const breaths = pair(); mutate(breaths[frame]); expect(sleepingLegendSizeProblems({ h: 2 }, breaths)).toContain(`frame${frame}: ${reason}`); }
  }
  expect(sleepingLegendSizeProblems({ h: 2 }, [sprite(), sprite()])).toContain('no breath');
  expect(sleepingLegendSizeProblems({ h: 2 }, [sprite()])).toContain('two breathing frames required');
});
