import { expect, it } from 'vitest';
import { createRequire } from 'node:module';
const { normalizeProfile } = createRequire(import.meta.url)('./worker-profile.cjs');
import { PixelCanvas } from './worker-compute-entry';
it('escapes malformed native Windows profile URLs without changing samples or times', () => {
  const raw = String.raw`{"nodes":[{"callFrame":{"url":"C:\Users\edsap\compute.cjs"}}],"samples":[1],"timeDeltas":[123]}`;
  const result = normalizeProfile(raw);
  expect(result.repaired).toBe(true); expect(result.profile.nodes[0].callFrame.url).toBe('C:\\Users\\edsap\\compute.cjs');
  expect(result.profile.samples).toEqual([1]); expect(result.profile.timeDeltas).toEqual([123]);
});
it('leaves valid profile JSON unchanged and rejects unrelated corruption', () => {
  const profile = { nodes: [], samples: [], timeDeltas: [] };
  expect(normalizeProfile(JSON.stringify(profile))).toEqual({ profile, repaired: false });
  expect(() => normalizeProfile('{"samples":broken}')).toThrow();
});
it('copies ImageData exactly and clips rectangles in the explicit Node pixel backend', () => {
  const canvas = new PixelCanvas(2, 2), ctx = canvas.getContext(), img = ctx.createImageData(2, 1);
  img.data.set([1, 2, 3, 255, 4, 5, 6, 254]); ctx.putImageData(img, -1, 1);
  expect([...ctx.getImageData(0, 1, 2, 1).data]).toEqual([4, 5, 6, 254, 0, 0, 0, 0]);
  expect([...ctx.getImageData(-1, 1, 2, 1).data]).toEqual([0, 0, 0, 0, 4, 5, 6, 254]);
  expect('drawImage' in ctx).toBe(false); // unsupported operations cannot silently become no-ops
});
