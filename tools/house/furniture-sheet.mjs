// The treehouse's furniture (art/furniture.js) as a contact sheet, no browser: every piece drawn at its house.json footprint (every state of one with states), lit by a
// plain light from the upper left (the game lights them with art/lighting.js), each art pixel `up` screen pixels wide.
//   node tools/house/furniture-sheet.mjs [ppm] [up] [pitch] [out.png]   (ppm: art pixels a metre, the house's 10.67)   YAW=0 PER=6
import zlib from "zlib"; import fs from "fs";
const R = new URL("../..", import.meta.url).pathname;
const { furnitureSprite, furnitureColours, FURNITURE_IDS } = await import(R + "/art/furniture.js");
const { EMISSIVE } = await import(R + "/art/core.js");
const H = (await import(R + "/config/house/load.mjs")).loadHouse();
const ppm = Number(process.argv[2] || 32 / 3), up = Number(process.argv[3] || 4), pitch = Number(process.argv[4] || .6);
function png(w, h, rgba) { const crc = b => { let c, t = []; for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } c = 0xffffffff; for (const x of b) c = t[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (ty, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(ty), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const raw = Buffer.alloc((w * 4 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; Buffer.from(rgba.buffer, y * w * 4, w * 4).copy(raw, y * (w * 4 + 1) + 1); }
  const hd = Buffer.alloc(13); hd.writeUInt32BE(w, 0); hd.writeUInt32BE(h, 4); hd[8] = 8; hd[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", hd), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]); }
// each piece as it stands in the house: its footprint along the wall it backs on (render/houseFurniture.ts standing), facing the camera
// (YAW, radians, to turn them all); in rows of PER (6); every state of a piece with states
const yaw = Number(process.env.YAW || 0), PER = Number(process.env.PER || 6);
const { FURNITURE_STATES } = await import(R + "/art/furniture.js");
const jobs = FURNITURE_IDS.flatMap(id => (FURNITURE_STATES[id] ?? [undefined]).map(state => ({ id, state })));
// (a piece with no object in house.json yet, as the Studio's instruments before the music builder places them: drawn at NEW's
// footprint, facing the camera; NEW="id:w:d:h,..." for others)
const NEW = Object.fromEntries([["drumKit", 4.4, 4, 2.6], ["synthRack", 4.8, 1.4, 3.8], ["microphone", 1, 1, 3.4], ...(process.env.NEW ?? "").split(",").filter(Boolean).map(e => e.split(":").map((v, i) => (i ? Number(v) : v)))].map(([id, w, d, h]) => [id, { id, room: "", x: 0, z: 0, w, d, h }]));
const sprites = jobs.map(({ id, state }) => { const o = H.objects.find(q => q.id === id) ?? NEW[id], r = H.rooms.find(q => q.id === o.room), dx = r ? (r.x0 + r.x1) / 2 - o.x : 0, dz = r ? (r.z0 + r.z1) / 2 - o.z : 0;
  const foot = Math.abs(dx) > Math.abs(dz) ? { w: o.d, d: o.w, h: o.h } : { w: o.w, d: o.d, h: o.h }, curve = r?.r && Math.hypot(dx, dz) > 1.2 ? Math.hypot(dx, dz) + foot.d / 2 : 0; // (bent round its room's wall: render/houseFurniture.ts standing)
  const t0 = performance.now(); const s = furnitureSprite(id, foot, {}, { ppm, pitch, yaw, state, curve }); console.log(id, state ?? "", s.sp.w, s.sp.h, (performance.now() - t0).toFixed(0) + "ms", s.lights.length); return { s, col: furnitureColours({}, o.room, id) }; });
const gap = 6, rows = [];
for (let i = 0; i < sprites.length; i += PER) rows.push(sprites.slice(i, i + PER));
const W = Math.max(...rows.map(r => r.reduce((a, q) => a + q.s.sp.w + gap, gap))), rowH = rows.map(r => Math.max(...r.map(q => q.s.sp.h)) + gap), Hh = rowH.reduce((a, b) => a + b, gap);
const img = new Uint8Array(W * up * Hh * up * 4); for (let i = 0; i < img.length; i += 4) img.set([40, 30, 36, 255], i);
const L = [-.5, .6, .62];
let oy = gap;
rows.forEach((row, ri) => { let ox = gap; for (const { s, col } of row) { const sp = s.sp, top = oy + rowH[ri] - gap - sp.h; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) { const i = y * sp.w + x, m = sp.m[i]; if (!m) continue; const c = col[m] || [255, 0, 255]; const d = EMISSIVE.has(m) ? 1.15 : .45 + .7 * Math.max(0, sp.n[i * 3] * L[0] + sp.n[i * 3 + 1] * L[1] + sp.n[i * 3 + 2] * L[2]); const px = [...c.map(v => Math.min(255, v * d)), 255];
  for (let a = 0; a < up; a++) for (let b = 0; b < up; b++) img.set(px, (((y + top) * up + a) * W * up + (x + ox) * up + b) * 4); } ox += sp.w + gap; } oy += rowH[ri]; });
fs.writeFileSync(process.argv[5] || "previews/furniture-sheet.png", png(W * up, Hh * up, img));
