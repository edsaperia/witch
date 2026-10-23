// The Workshop's broom parts (art/broomParts.js) as a contact sheet, no browser: each part at the bay's card size and as it hangs on
// the pegboard in the room (the house's pixel), the old cut-down kinds beside them (OLD=<a copy of the old art/workshop.js>), and her broom assembled from each set's
// parts; lit by a plain light from the upper left (the game lights them with art/lighting.js).
//   node tools/workshop/parts-sheet.mjs [out.png] [up]
import zlib from "zlib"; import fs from "fs";
const R = new URL("../..", import.meta.url).pathname;
const { Model } = await import(R + "/art/model3d.js");
const { modelSprite, furnitureColours } = await import(R + "/art/furniture.js");
const { EMISSIVE, M } = await import(R + "/art/core.js");
const { PART_ART, drawPart, drawBroom, stubby } = await import(R + "/art/broomParts.js");
const W0 = process.env.OLD ? await import(process.env.OLD) : null; // (OLD: a copy of the old art/workshop.js, its cut-down kinds beside the new parts)
const G = await import(R + "/art/generator.js");
const up = Number(process.argv[3] || 3);
function png(w, h, rgba) { const crc = b => { let c, t = []; for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } c = 0xffffffff; for (const x of b) c = t[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (ty, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(ty), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const raw = Buffer.alloc((w * 4 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; Buffer.from(rgba.buffer, y * w * 4, w * 4).copy(raw, y * (w * 4 + 1) + 1); }
  const hd = Buffer.alloc(13); hd.writeUInt32BE(w, 0); hd.writeUInt32BE(h, 4); hd[8] = 8; hd[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", hd), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]); }
// her broom's colours over the workshop's (the classic witch's: render/workshopArt.ts partColours)
const wc = G.witchColours({}, G.genomeLook(G.WITCH_GENOME).outfit ?? undefined);
const col = { ...furnitureColours({}, "workshop"), [M.BROOM]: wc[M.BROOM], [M.STRAW]: wc[M.STRAW] };
const ids = Object.keys(PART_ART), house = 32 / 3;
const one = (draw, o) => { const m = new Model({ blend: .02 }); draw(m); return modelSprite(m, o).sp; };
// rows: the card (side on, pitch .3, scaled to about 60 px long), the room (the pegboard's: house ppm, pitch .6, the board's tilt)
const card = id => one(m => drawPart(m, id), { ppm: 58 / (PART_ART[id].len * 2), pitch: .45, yaw: .35 });
const { ctPlace } = await import(R + "/art/country.js");
const K = Number(process.env.K || .55), PX = Number(process.env.PX || 21);
const room = id => one(m => { drawPart(m, id); stubby(m, 0, K); ctPlace(m, 0, { pitch: .45 }); }, { ppm: PX / 2 / (PART_ART[id].len * K), pitch: .6, yaw: 0 }); // (hung on the pegboard: stubbier, tilted, about PX px long)
const old = id => { const P = { missile: ["missile", "body"], curl: ["curl", "body"], horse: ["hobbyhorse", "body"], fairing: ["jetbike", "body"], ladder: ["ladder", "body"], canoe: ["canoe", "body"], nozzles: ["jetbike", "tail"], twigs: ["twig", "tail"], oar: ["oar", "tail"] }[id]; return W0.partSprite(P[0], P[1], { ppm: 30 / 2, pitch: .3 }).sp; };
const SETS = [["bare", {}], ["Rocket", { tip: "missile", chassis: "fairing", exhaust: "nozzles" }], ["Hedge", { tip: "curl", chassis: "ladder", exhaust: "twigs" }], ["Ferry", { tip: "horse", chassis: "canoe", exhaust: "oar" }], ["mixed", { tip: "horse", chassis: "fairing", exhaust: "twigs" }]];
const brooms = SETS.map(([, f]) => one(m => drawBroom(m, f), { ppm: house * 1.6, pitch: .6, yaw: 0 }));
const rows = [ids.map(card), ids.map(room), ...(process.env.OLD ? [ids.map(old)] : []), brooms];
const gap = 8, Wd = Math.max(...rows.map(r => r.reduce((a, s) => a + Math.max(s.w, 20) + gap, gap))), rowH = rows.map(r => Math.max(...r.map(s => s.h)) + gap), Hh = rowH.reduce((a, b) => a + b, gap);
const img = new Uint8Array(Wd * up * Hh * up * 4); for (let i = 0; i < img.length; i += 4) img.set([46, 40, 44, 255], i);
const L = [-.5, .6, .62];
let oy = gap;
rows.forEach((row, ri) => { let ox = gap; for (const sp of row) { const top = oy + rowH[ri] - gap - sp.h; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) { const i = y * sp.w + x, mm = sp.m[i]; if (!mm) continue; const c = col[mm] || [255, 0, 255]; const d = EMISSIVE.has(mm) ? 1.15 : .45 + .7 * Math.max(0, sp.n[i * 3] * L[0] + sp.n[i * 3 + 1] * L[1] + sp.n[i * 3 + 2] * L[2]); const px = [...c.map(v => Math.min(255, v * d)), 255];
  for (let a = 0; a < up; a++) for (let b = 0; b < up; b++) img.set(px, (((y + top) * up + a) * Wd * up + (x + ox) * up + b) * 4); } ox += Math.max(sp.w, 20) + gap; } oy += rowH[ri]; });
fs.writeFileSync(process.argv[2] || "previews/parts-sheet.png", png(Wd * up, Hh * up, img));
console.log(rows.map(r => r.map(s => `${s.w}x${s.h}`).join(" ")).join("\n"));
