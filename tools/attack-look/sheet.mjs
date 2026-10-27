// The attack look's atlas as a picture (art/attackLook.js): node tools/attack-look/sheet.mjs <png> [scale]. Each pixel of the atlas
// drawn scale times over (default 3, the game's play zoom), on a checker of night ground and lit grass so both its glows and its
// dark edges show.
import { writeFileSync, readFileSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { attackLookAtlas } from "../../art/attackLook.js";

const [out = "attack-look.png", sc = "3"] = process.argv.slice(2), S = Number(sc);
const cfg = JSON.parse(readFileSync(new URL("../../config/attack-look.json", import.meta.url), "utf8"));
const { size, rgba, cells } = attackLookAtlas(cfg), W = size * S;
const img = Buffer.alloc((W * 3 + 1) * W);
for (let y = 0; y < W; y++) {
  img[y * (W * 3 + 1)] = 0;
  for (let x = 0; x < W; x++) {
    const ax = Math.floor(x / S), ay = Math.floor(y / S), i = (ay * size + ax) * 4, a = rgba[i + 3] / 255;
    const lit = (Math.floor(ax / 64) + Math.floor(ay / 64)) % 2, bg = lit ? [92, 118, 52] : [18, 30, 26];
    for (let k = 0; k < 3; k++) img[y * (W * 3 + 1) + 1 + x * 3 + k] = Math.round(bg[k] * (1 - a) + rgba[i + k] * a);
  }
}
const crcT = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc = b => { let c = -1; for (const v of b) c = crcT[(c ^ v) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (t, d) => { const len = Buffer.alloc(4), body = Buffer.concat([Buffer.from(t), d]), cr = Buffer.alloc(4); len.writeUInt32BE(d.length); cr.writeUInt32BE(crc(body)); return Buffer.concat([len, body, cr]); };
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(W, 4); ihdr[8] = 8; ihdr[9] = 2;
writeFileSync(out, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(img)), chunk("IEND", Buffer.alloc(0))]));
let used = 0; for (const [, , w, h] of Object.values(cells)) used += w * h;
console.log(`${out}: ${Object.keys(cells).length} cells, ${Math.round((100 * used) / (size * size))}% of ${size}×${size}`);
