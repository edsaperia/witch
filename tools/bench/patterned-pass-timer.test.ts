import { expect, it } from 'vitest';
import { installPassTimer } from './patterned-pass-timer.cjs';
it('times separate passes, rejects nested timing and restores the renderer', async () => {
  let active: object | null = null, deleted = 0;
  const gl = { CURRENT_QUERY: 1, QUERY_RESULT_AVAILABLE: 2, QUERY_RESULT: 3,
    getQuery: () => active, createQuery: () => ({}), beginQuery: (_: number, q: object) => { active = q; }, endQuery: () => { active = null; },
    getQueryParameter: (_: object, key: number) => key === 2 ? true : 2000000, getParameter: () => false, flush() {}, deleteQuery() { deleted++; } };
  const renderer = { render(_scene: object) {}, getRenderTarget: () => null }, original = renderer.render;
  const timer = installPassTimer(renderer, gl, { TIME_ELAPSED_EXT: 4, GPU_DISJOINT_EXT: 5 });
  renderer.render({ name: 'scene' }); renderer.render({ name: 'composite' });
  expect((await timer.collect(async () => {})).map((p: { scene: string; gpuMs: number }) => [p.scene, p.gpuMs])).toEqual([['scene', 2], ['composite', 2]]);
  expect(deleted).toBe(2); active = {};
  expect(() => renderer.render({})).toThrow('cannot nest'); active = null;
  timer.restore(); expect(renderer.render).toBe(original);
});
