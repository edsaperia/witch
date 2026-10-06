// The map's shape from above (Ed, 2026-10-06: "The map as a whole should be circular rather than
// square, with a buffer zone with no runestones around the edge"): for each seed, the square map
// (?shape=square) and the circular one side by side at one scale: the playable areas in their
// type's colour, the buffer ring grey, the forest past her flight's edge dark; her flight's edge,
// the runestones (soundsystem spots), the legends' clearings, the relics and home.
//   node tools/map/shape.mjs [--seeds 1,123,925469] [--out previews/map-shape]
// (PNGs drawn by Playwright's Chromium.)
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { openRules, arg, nums } from "../balance/lib.mjs";

const rules = await openRules();
const { generateMap } = await rules.load("/src/rules/map.ts");
const { Forest } = await rules.load("/src/rules/forest.ts");
const { placeRelics } = await rules.load("/src/rules/legends.ts");
const { TUNING } = await rules.load("/src/rules/tuning.ts");
const out = arg("out", "previews/map-shape");
fs.mkdirSync(out, { recursive: true });

function draw(map, box, W, label) {
  const k = W / (box.maxX - box.minX), X = x => ((x - box.minX) * k).toFixed(1), Z = z => ((z - box.minZ) * k).toFixed(1);
  const p = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}" viewBox="0 0 ${W} ${W}"><rect width="${W}" height="${W}" fill="#07060c"/>`];
  const step = 16, C = map.centreCell, b = map.bounds, e = map.extent;
  for (let z = Math.max(box.minZ, e.minZ); z < Math.min(box.maxZ, e.maxZ); z += step) for (let x = Math.max(box.minX, e.minX); x < Math.min(box.maxX, e.maxX); x += step) {
    const c = map.cellSafe(x + step / 2, z + step / 2).cell, t = map.typeOf(c[0], c[1]), v = (c[0] * 7 + c[1] * 13) % 5;
    const fill = c[0] === C[0] && c[1] === C[1] ? "#6a5520" : map.playable(c[0], c[1]) ? `hsl(${(t * 137.5) % 360},${30 + v * 4}%,${26 + v * 3}%)` : map.inBuffer(c[0], c[1]) ? `rgb(${44 + v * 4},${44 + v * 4},${50 + v * 4})` : `rgb(${16 + v * 2},${15 + v * 2},${22 + v * 2})`;
    p.push(`<rect x="${X(x)}" y="${Z(z)}" width="${(step * k + 0.6).toFixed(1)}" height="${(step * k + 0.6).toFixed(1)}" fill="${fill}"/>`);
  }
  if (b.circle) p.push(`<circle cx="${X(b.circle.x)}" cy="${Z(b.circle.z)}" r="${(b.circle.r * k).toFixed(1)}" fill="none" stroke="#ff6fcf" stroke-width="2"/>`);
  else p.push(`<rect x="${X(b.minX)}" y="${Z(b.minZ)}" width="${((b.maxX - b.minX) * k).toFixed(1)}" height="${((b.maxZ - b.minZ) * k).toFixed(1)}" fill="none" stroke="#ff6fcf" stroke-width="2"/>`);
  p.push(`<rect x="${X(e.minX)}" y="${Z(e.minZ)}" width="${((e.maxX - e.minX) * k).toFixed(1)}" height="${((e.maxZ - e.minZ) * k).toFixed(1)}" fill="none" stroke="#555" stroke-dasharray="4 4"/>`);
  for (const lc of map.legendClearings) p.push(`<circle cx="${X(lc.x)}" cy="${Z(lc.z)}" r="${Math.max(1.5, lc.r * k).toFixed(1)}" fill="#8fd18f" fill-opacity=".7"/>`);
  for (const [cx, cy] of map.cells) { if (cx === C[0] && cy === C[1]) continue; const s = map.soundsystemSpot(cx, cy); p.push(`<circle cx="${X(s.x)}" cy="${Z(s.z)}" r="2.6" fill="#7fe8ff"/>`); }
  for (const r of placeRelics(map, new Forest(map))) p.push(`<rect x="${(+X(r.x) - 4).toFixed(1)}" y="${(+Z(r.z) - 4).toFixed(1)}" width="8" height="8" fill="#ffd040" stroke="#000"/>`);
  const d = map.dancefloor;
  p.push(`<circle cx="${X(d.x)}" cy="${Z(d.z)}" r="6" fill="#ff6fcf" stroke="#fff"/>`);
  p.push(`<text x="10" y="22" fill="#eee" font-family="monospace" font-size="15">${label}: ${map.cells.length} playable areas</text></svg>`);
  return p.join("");
}

const pngs = [], pages = [];
for (const seed of nums(arg("seeds", "1,123,925469"))) {
  const sq = generateMap(seed, { ...TUNING, map: { ...TUNING.map, shape: "square" } }), ci = generateMap(seed, { ...TUNING, map: { ...TUNING.map, shape: "circle" } });
  // one scale for both: the circle's extent, centred on each map's home
  const half = Math.max(ci.extent.maxX - ci.extent.minX, sq.extent.maxX - sq.extent.minX) / 2;
  const boxOf = m => ({ minX: m.dancefloor.x - half, maxX: m.dancefloor.x + half, minZ: m.dancefloor.z - half, maxZ: m.dancefloor.z + half });
  let buffer = 0; for (let y = 0; y < ci.n; y++) for (let x = 0; x < ci.n; x++) if (ci.inBuffer(x, y)) buffer++;
  console.log(`seed ${seed}: square ${sq.cells.length} playable; circle ${ci.cells.length} playable, ${buffer} in the buffer ring, flight radius ${ci.bounds.circle.r.toFixed(0)} m`);
  const legend = `<div style="font:13px monospace;color:#ccc;padding:4px 10px">seed ${seed} · colour: playable areas (gold: home) · grey: buffer ring · dark: past her flight's edge (pink) · dashed: the forest's extent · cyan: runestones · green: legends' clearings · yellow: relics</div>`;
  pages.push({ seed, html: `<body style="margin:0;background:#07060c"><div style="display:flex;gap:8px">${draw(sq, boxOf(sq), 640, "before (square)")}${draw(ci, boxOf(ci), 640, "after (circle)")}</div>${legend}</body>` });
}
await rules.close();
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const browser = await pw.chromium.launch(), page = await browser.newPage({ viewport: { width: 1288, height: 690 } });
for (const { seed, html } of pages) { await page.setContent(html); const f = path.join(out, `map-shape-${seed}.png`); await page.screenshot({ path: f }); pngs.push(f); }
await browser.close();
console.log(pngs.join("\n"));
