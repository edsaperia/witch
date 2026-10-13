// A patch of forest from above, each tree, bush and ground-cover tuft a dot in its look's colour (the area type it takes its
// species, density and pattern from: rules/forest.ts plantType), the exact borders drawn in white (Ed's #887: planting blending
// across the borders), for a before and after:
//   node tools/forest/border-map.mjs <seed> <x> <z> <size m> <out.png> [blend width m]
// The blend width (areaEdgeBlend.width) defaults to the tuning file's; 0 is no blend at all.
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { openRules } from "./../balance/lib.mjs";
const [seed = "123", X = "2362", Z = "2546", size = "240", out = "previews/border-map.png", width] = process.argv.slice(2);
const O = await openRules(), G = await O.load("/src/rules/game.ts"), T = await O.load("/src/rules/tuning.ts"), F = await O.load("/src/rules/forest.ts"), C = await O.load("/src/rules/groundcover.ts");
const tuning = structuredClone(T.TUNING); if (width !== undefined) tuning.areaEdgeBlend.width = Number(width);
const g = G.newGame(Number(seed), tuning), m = g.map, forest = new F.Forest(m), S = Number(size), px = 3, W = Math.round(S * px), x0 = Number(X) - S / 2, z0 = Number(Z) - S / 2;
const img = new Uint8Array(W * W * 3).fill(18);
const PAL = [[255, 60, 60], [60, 220, 255], [255, 230, 40], [200, 90, 255], [80, 255, 120], [255, 150, 30], [255, 120, 220], [150, 150, 255]], seen = new Map();
const hue = t => { if (!seen.has(t)) seen.set(t, PAL[seen.size % PAL.length]); return seen.get(t); }; // (high contrast)
const dot = (x, z, c, r) => { const cx = (x - x0) * px, cz = (z - z0) * px; for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const u = Math.round(cx + dx), v = Math.round(cz + dz); if (u >= 0 && v >= 0 && u < W && v < W && dx * dx + dz * dz <= r * r) img.set(c, (v * W + u) * 3); } };
for (const t of [...new Set([...Array(200).keys()].map(k => m.areaAt(x0 + (k % 14) * S / 13, z0 + Math.floor(k / 14) * S / 13).look))].sort((a, b) => a - b)) hue(t); // (by the area types under the patch, in order, so a before and an after match)
const span = C.tuftSpan(4, 1.2);
for (let cj = Math.floor(z0 / span); cj <= Math.ceil((z0 + S) / span); cj++) for (let ci = Math.floor(x0 / span); ci <= Math.ceil((x0 + S) / span); ci++) for (const t of C.tuftsInCell(m, ci, cj, 4, 1.2, 0.6)) dot(t.x, t.z, hue(t.type).map(v => v * .45), 0);
for (const b of forest.bushesNear(Number(X), Number(Z), S * .75)) dot(b.x, b.z, hue(b.type).map(v => v * .7), 1);
for (const t of forest.treesNear(Number(X), Number(Z), S * .75)) dot(t.x, t.z, hue(t.type), 3);
// the exact borders
for (let v = 0; v < W; v++) for (let u = 0; u < W; u++) { const a = m.areaAt(x0 + u / px, z0 + v / px).cell, b = m.areaAt(x0 + (u + 1) / px, z0 + v / px).cell, c = m.areaAt(x0 + u / px, z0 + (v + 1) / px).cell; if (a[0] !== b[0] || a[1] !== b[1] || a[0] !== c[0] || a[1] !== c[1]) img.set([235, 235, 235], (v * W + u) * 3); }
// a PNG
const crc = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return b => { let c = 0xffffffff; for (const x of b) c = t[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }; })();
const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]), c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
const raw = Buffer.alloc((W * 3 + 1) * W); for (let v = 0; v < W; v++) { raw[v * (W * 3 + 1)] = 0; Buffer.from(img.buffer, v * W * 3, W * 3).copy(raw, v * (W * 3 + 1) + 1); }
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(W, 4); ihdr[8] = 8; ihdr[9] = 2;
writeFileSync(out, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]));
console.log(`wrote ${out}: ${S} m round ${X}, ${Z}, blend width ${tuning.areaEdgeBlend.width} m`); await O.close(); process.exit(0);
