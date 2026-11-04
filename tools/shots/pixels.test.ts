// Known PNG scanline filters and exact small pixel fixtures; no browser.
import { expect, it } from 'vitest';
import { deflateSync } from 'node:zlib';
import { decodePng, encodePng, diffPixels, actorMask, sideBySide } from './pixels.mjs';

const rgba = Buffer.from([10,20,30,40,15,25,35,45,12,24,36,48,17,29,41,53]);
function fixture(filter: number, rgb = false) {
  const rows = [
    [[10,20,30,40,15,25,35,45], [12,24,36,48,17,29,41,53]],
    [[10,20,30,40,5,5,5,5], [12,24,36,48,5,5,5,5]],
    [[10,20,30,40,15,25,35,45], [2,4,6,8,2,4,6,8]],
    [[10,20,30,40,10,15,20,25], [7,14,21,28,4,5,6,7]],
    [[10,20,30,40,5,5,5,5], [2,4,6,8,2,4,5,5]],
  ][filter];
  const crc = (b: Buffer) => { let c = 0xffffffff; for (const byte of b) { c ^= byte; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1; } return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type: string, value: Buffer) => { const name = Buffer.from(type), n = Buffer.alloc(4), check = Buffer.alloc(4); n.writeUInt32BE(value.length); check.writeUInt32BE(crc(Buffer.concat([name, value]))); return Buffer.concat([n, name, value, check]); };
  const h = Buffer.alloc(13); h.writeUInt32BE(2); h.writeUInt32BE(2, 4); h[8] = 8; h[9] = rgb ? 2 : 6;
  const raw = rgb ? [0,10,20,30,15,25,35,0,12,24,36,17,29,41] : [filter, ...rows[0], filter, ...rows[1]];
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', h), chunk('IDAT', deflateSync(Buffer.from(raw))), chunk('IEND', Buffer.alloc(0))]);
}
it('decodes all five PNG filters against hand-calculated RGBA scanlines, plus RGB', () => {
  for (let filter = 0; filter <= 4; filter++) expect(decodePng(fixture(filter)).data).toEqual(rgba);
  expect(decodePng(fixture(0, true)).data).toEqual(Buffer.from([10,20,30,255,15,25,35,255,12,24,36,255,17,29,41,255]));
});
it('roundtrips valid PNG, rejects corruption, and compares decoded pixels rather than compressed bytes', () => {
  const image = { width: 2, height: 2, data: rgba };
  expect(decodePng(encodePng(image))).toEqual(image);
  expect(fixture(0).equals(fixture(4))).toBe(false);
  expect(diffPixels(decodePng(fixture(0)), decodePng(fixture(4))).count).toBe(0);
  const corrupt = Buffer.from(fixture(0)); corrupt[corrupt.length - 1] ^= 1;
  expect(() => decodePng(corrupt)).toThrow(/CRC/);
});
it('counts one changed pixel once, including alpha, with exact maxima/bounds and explicit exclusions', () => {
  const a = { width: 2, height: 2, data: Buffer.alloc(16) }, b = { ...a, data: Buffer.alloc(16) };
  b.data[12] = 4; b.data[15] = 7;
  const result = diffPixels(a, b);
  expect(result.count).toBe(1); expect(result.max).toBe(7); expect(result.bounds).toEqual({ left: 1, right: 1, top: 1, bottom: 1 });
  expect(result.amplified.data[14]).toBe(56);
  expect(diffPixels(a, b, { ignore: [{ left: 1, right: 1, top: 1, bottom: 1 }] }).count).toBe(0);
  expect(() => diffPixels(a, { width: 1, height: 4, data: b.data })).toThrow(/dimensions/);
});
it('computes a thresholded actor mask within an explicit envelope and produces review strips', () => {
  const a = { width: 2, height: 2, data: Buffer.alloc(16) }, b = { ...a, data: Buffer.alloc(16) };
  b.data[0] = 25; b.data[4] = 24; b.data[8] = 23;
  const mask = actorMask(a, b, 24, { left: 0, right: 0, top: 0, bottom: 1 });
  expect([...mask]).toEqual([1,0,0,0]);
  expect(diffPixels(a, b, { mask }).count).toBe(1);
  expect(sideBySide([a, b]).width).toBe(4);
  expect(() => actorMask(a, b, 0)).toThrow(/threshold/);
});
