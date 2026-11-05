// Exact decoded screenshot comparisons (8-bit RGB/RGBA PNG, non-interlaced), masks and review PNGs; no browser or extra package.
import { inflateSync, deflateSync } from 'node:zlib';
import fs from 'node:fs/promises';
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const crcTable = Array.from({ length: 256 }, (_, n) => { for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1; return n >>> 0; });
const crc = b => { let n = 0xffffffff; for (const x of b) n = crcTable[(n ^ x) & 255] ^ (n >>> 8); return (n ^ 0xffffffff) >>> 0; };
function chunk(name, data) { const type = Buffer.from(name), out = Buffer.alloc(data.length + 12); out.writeUInt32BE(data.length); type.copy(out, 4); data.copy(out, 8); out.writeUInt32BE(crc(Buffer.concat([type, data])), data.length + 8); return out; }
function dimensions(width, height) { if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width * height > 16_777_216) throw Error('Invalid/oversize image dimensions'); }
export function decodePng(buffer) {
  const b = Buffer.from(buffer); if (!b.subarray(0, 8).equals(signature)) throw Error('Require PNG');
  let width, height, channels, ended = false; const data = [];
  for (let at = 8; at + 12 <= b.length;) {
    const n = b.readUInt32BE(at), end = at + n + 12; if (end > b.length) throw Error('Truncated PNG');
    const name = b.toString('ascii', at + 4, at + 8), value = b.subarray(at + 8, at + 8 + n);
    if (crc(b.subarray(at + 4, at + 8 + n)) !== b.readUInt32BE(at + 8 + n)) throw Error('PNG CRC mismatch');
    if (name === 'IHDR') {
      if (n !== 13) throw Error('Invalid PNG header'); width = value.readUInt32BE(0); height = value.readUInt32BE(4); dimensions(width, height);
      if (value[8] !== 8 || ![2, 6].includes(value[9]) || value[10] || value[11] || value[12]) throw Error('Require non-interlaced 8-bit RGB/RGBA PNG');
      channels = value[9] === 6 ? 4 : 3;
    } else if (name === 'IDAT') data.push(value);
    else if (name === 'IEND') { ended = true; break; }
    at = end;
  }
  if (!ended || !channels) throw Error('Incomplete PNG');
  const stride = width * channels, expected = height * (stride + 1), raw = inflateSync(Buffer.concat(data), { maxOutputLength: expected });
  if (raw.length !== expected) throw Error('Wrong PNG data length');
  const scan = Buffer.alloc(height * stride), rgba = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)]; if (filter > 4) throw Error('Unknown PNG filter');
    for (let x = 0; x < stride; x++) {
      const left = x >= channels ? scan[y * stride + x - channels] : 0, up = y ? scan[(y - 1) * stride + x] : 0, corner = y && x >= channels ? scan[(y - 1) * stride + x - channels] : 0;
      const p = left + up - corner, a = Math.abs(p - left), b = Math.abs(p - up), c = Math.abs(p - corner);
      const prediction = filter === 0 ? 0 : filter === 1 ? left : filter === 2 ? up : filter === 3 ? Math.floor((left + up) / 2) : a <= b && a <= c ? left : b <= c ? up : corner;
      scan[y * stride + x] = (raw[y * (stride + 1) + x + 1] + prediction) & 255;
    }
  }
  for (let i = 0; i < width * height; i++) { for (let c = 0; c < 3; c++) rgba[i * 4 + c] = scan[i * channels + c]; rgba[i * 4 + 3] = channels === 4 ? scan[i * channels + 3] : 255; }
  return { width, height, data: rgba };
}
export function encodePng(image) {
  const { width, height, data } = image; dimensions(width, height);
  if (data.length !== width * height * 4) throw Error('Require RGBA data');
  const header = Buffer.alloc(13); header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6;
  const raw = Buffer.alloc(height * (width * 4 + 1)), bytes = Buffer.isBuffer(data) ? data : Buffer.from(data);
  for (let y = 0; y < height; y++) bytes.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  return Buffer.concat([signature, chunk('IHDR', header), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}
function compatible(a, b) {
  dimensions(a.width, a.height); dimensions(b.width, b.height);
  if (a.data.length !== a.width * a.height * 4 || b.data.length !== b.width * b.height * 4) throw Error('Require complete RGBA pixels');
  if (a.width !== b.width || a.height !== b.height) throw Error('Image dimensions differ');
}
export function diffPixels(a, b, { mask = null, ignore = [], amplify = 8 } = {}) {
  compatible(a, b); const { width, height } = a;
  if (mask && mask.length !== width * height) throw Error('Mask dimensions differ');
  const visual = Buffer.alloc(a.data.length); let count = 0, max = 0, left = width, top = height, right = -1, bottom = -1, considered = 0;
  for (let i = 0; i < width * height; i++) {
    const x = i % width, y = Math.floor(i / width), included = (!mask || mask[i]) && !ignore.some(r => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
    let delta = 0;
    for (let c = 0; c < 4; c++) delta = Math.max(delta, Math.abs(a.data[i * 4 + c] - b.data[i * 4 + c]));
    visual[i * 4 + 3] = 255;
    if (!included) continue; considered++;
    for (let c = 0; c < 3; c++) visual[i * 4 + c] = Math.min(255, Math.abs(a.data[i * 4 + c] - b.data[i * 4 + c]) * amplify);
    if (delta) { count++; max = Math.max(max, delta); left = Math.min(left, x); top = Math.min(top, y); right = Math.max(right, x); bottom = Math.max(bottom, y); if (delta === Math.abs(a.data[i * 4 + 3] - b.data[i * 4 + 3])) visual[i * 4 + 2] = Math.max(visual[i * 4 + 2], Math.min(255, delta * amplify)); }
  }
  return { count, max, considered, bounds: count ? { left, top, right, bottom } : null, ignored: ignore, amplified: { width, height, data: visual } };
}
export function actorMask(withActor, withoutActor, threshold = 24, envelope = null) {
  if (!(threshold > 0 && threshold <= 255)) throw Error('Require positive mask threshold');
  compatible(withActor, withoutActor); const mask = Buffer.alloc(withActor.width * withActor.height);
  for (let i = 0; i < mask.length; i++) {
    const x = i % withActor.width, y = Math.floor(i / withActor.width);
    if (envelope && (x < envelope.left || x > envelope.right || y < envelope.top || y > envelope.bottom)) continue;
    let delta = 0; for (let c = 0; c < 4; c++) delta = Math.max(delta, Math.abs(withActor.data[i * 4 + c] - withoutActor.data[i * 4 + c]));
    mask[i] = delta >= threshold ? 1 : 0;
  }
  return mask;
}
export function sideBySide(images) {
  const height = images[0]?.height; if (!images.length || images.some(i => i.height !== height)) throw Error('Side-by-side heights differ');
  const width = images.reduce((n, i) => n + i.width, 0); dimensions(width, height); const data = Buffer.alloc(width * height * 4);
  let x = 0; for (const image of images) { const bytes = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data); for (let y = 0; y < height; y++) bytes.copy(data, (y * width + x) * 4, y * image.width * 4, (y + 1) * image.width * 4); x += image.width; }
  return { width, height, data };
}
export async function writeComparison(directory, a, b, options = {}) {
  const result = diffPixels(a, b, options); await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(`${directory}/diff.png`, encodePng(result.amplified));
  await fs.writeFile(`${directory}/side-by-side.png`, encodePng(sideBySide([a, b, result.amplified])));
  const { amplified, ...metrics } = result; await fs.writeFile(`${directory}/diff.json`, JSON.stringify(metrics, null, 2)); return metrics;
}
