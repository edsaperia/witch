// A small PNG reader for the build (vite.config.ts) and the tests: 8-bit greyscale, grey + alpha, RGB, RGBA and indexed (with
// tRNS), not interlaced; enough for hand-drawn sprites saved from any pixel editor. Gives RGBA rows, top first.
import { inflateSync } from "node:zlib";

export interface Png { w: number; h: number; rgba: Uint8Array }

const SIG = [137, 80, 78, 71, 13, 10, 26, 10];

export function readPng(buf: Uint8Array): Png {
  if (SIG.some((b, i) => buf[i] !== b)) throw new Error("not a PNG");
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let w = 0, h = 0, depth = 0, type = 0, interlace = 0, palette: Uint8Array | null = null, trns: Uint8Array | null = null;
  const idat: Uint8Array[] = [];
  for (let o = 8; o < buf.length;) {
    const len = dv.getUint32(o), kind = String.fromCharCode(...buf.subarray(o + 4, o + 8)), data = buf.subarray(o + 8, o + 8 + len);
    if (kind === "IHDR") { w = dv.getUint32(o + 8); h = dv.getUint32(o + 12); depth = data[8]; type = data[9]; interlace = data[12]; }
    else if (kind === "PLTE") palette = data;
    else if (kind === "tRNS") trns = data;
    else if (kind === "IDAT") idat.push(data);
    else if (kind === "IEND") break;
    o += 12 + len;
  }
  if (depth !== 8) throw new Error(`PNG bit depth ${depth}: save it as 8 bits a channel`);
  if (interlace) throw new Error("interlaced PNG: save it without interlacing");
  const ch = ({ 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 } as Record<number, number>)[type];
  if (!ch) throw new Error(`PNG colour type ${type}`);
  const raw = inflateSync(Buffer.concat(idat)), stride = w * ch, px = new Uint8Array(h * stride);
  // undo each row's filter (none, sub, up, average, Paeth)
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)), row = px.subarray(y * stride, (y + 1) * stride), up = y ? px.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= ch ? row[i - ch] : 0, b = up ? up[i] : 0, c = up && i >= ch ? up[i - ch] : 0;
      const p = f === 0 ? 0 : f === 1 ? a : f === 2 ? b : f === 3 ? (a + b) >> 1 : (() => { const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; })();
      row[i] = (src[i] + p) & 255;
    }
  }
  const rgba = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const s = i * ch, d = i * 4;
    if (type === 6) { rgba[d] = px[s]; rgba[d + 1] = px[s + 1]; rgba[d + 2] = px[s + 2]; rgba[d + 3] = px[s + 3]; }
    else if (type === 2) { rgba[d] = px[s]; rgba[d + 1] = px[s + 1]; rgba[d + 2] = px[s + 2]; rgba[d + 3] = 255; }
    else if (type === 0) { rgba[d] = rgba[d + 1] = rgba[d + 2] = px[s]; rgba[d + 3] = 255; }
    else if (type === 4) { rgba[d] = rgba[d + 1] = rgba[d + 2] = px[s]; rgba[d + 3] = px[s + 1]; }
    else { const k = px[s]; rgba[d] = palette![k * 3]; rgba[d + 1] = palette![k * 3 + 1]; rgba[d + 2] = palette![k * 3 + 2]; rgba[d + 3] = trns && k < trns.length ? trns[k] : 255; }
  }
  return { w, h, rgba };
}
