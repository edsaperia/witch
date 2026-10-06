// The legend relics on the map, from above (Ed, 2026-10-06: one of each kind, one near the home
// area's edge, the rest scattered, none within minGap of another): for each seed, an SVG (and a PNG
// by ImageMagick, if it's there) of the areas, home's area and circle, the legends' clearings and the
// relics, each with its kind and its nearest neighbour's distance; and, with --sweep N, a check of
// seeds 1..N (the count, the kinds, home's one, the gaps), printing any that fall short.
//   node tools/relics/map.mjs [--seeds 123,922199] [--out previews/relics] [--sweep 200]
// (The PNGs are drawn by Playwright's Chromium; with none, the SVGs stay.)
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { openRules, arg, nums } from "../balance/lib.mjs";

const rules = await openRules();
const { generateMap } = await rules.load("/src/rules/map.ts");
const { Forest } = await rules.load("/src/rules/forest.ts");
const { LEGENDS, placeRelics } = await rules.load("/src/rules/legends.ts");
const { TUNING } = await rules.load("/src/rules/tuning.ts");
const R = LEGENDS.relics, out = arg("out", "previews/relics");

const sweep = Number(arg("sweep", 0));
if (sweep) {
  let bad = 0, worst = Infinity;
  for (let seed = 1; seed <= sweep; seed++) {
    const map = generateMap(seed, TUNING), rel = placeRelics(map, new Forest(map)), C = map.centreCell;
    const home = rel.filter(r => r.cell[0] === C[0] && r.cell[1] === C[1]).length;
    let gap = Infinity;
    for (let i = 0; i < rel.length; i++) for (let j = i + 1; j < rel.length; j++) gap = Math.min(gap, Math.hypot(rel[i].x - rel[j].x, rel[i].z - rel[j].z));
    worst = Math.min(worst, gap);
    const kindsOk = new Set(rel.map(r => r.kind)).size === R.kinds.length && rel.length === R.kinds.length;
    if (!kindsOk || home !== 1 || gap < R.minGap || rel.some(r => map.hardClear(r.x, r.z))) { bad++; console.log(`seed ${seed}: ${rel.length} relics, ${home} in home, nearest pair ${gap.toFixed(0)} m`); }
  }
  console.log(`${sweep} seeds: ${bad} short; the closest pair on any seed ${worst.toFixed(0)} m (minGap ${R.minGap})`);
}

fs.mkdirSync(out, { recursive: true });
const svgs = [];
const COLOURS = { wine: "#b0306a", partyHat: "#f0c040", discoBall: "#c0d8ff", gramophone: "#d08a40", present: "#40c080", mask: "#a070ff" };
for (const seed of nums(arg("seeds", "123,922199,165272"))) {
  const map = generateMap(seed, TUNING), rel = placeRelics(map, new Forest(map)), b = map.bounds, W = 900, k = W / (b.maxX - b.minX);
  const X = x => ((x - b.minX) * k).toFixed(1), Z = z => ((z - b.minZ) * k).toFixed(1);
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}" viewBox="0 0 ${W} ${W}"><rect width="${W}" height="${W}" fill="#14121f"/>`];
  // The areas: a coarse grid of cell colours, home's in gold.
  const step = 12, C = map.centreCell;
  for (let z = b.minZ; z < b.maxZ; z += step) for (let x = b.minX; x < b.maxX; x += step) {
    const c = map.cellSafe(x + step / 2, z + step / 2).cell, home = c[0] === C[0] && c[1] === C[1];
    const v = 26 + ((c[0] * 7 + c[1] * 13) % 5) * 6;
    parts.push(`<rect x="${X(x)}" y="${Z(z)}" width="${(step * k + 0.5).toFixed(1)}" height="${(step * k + 0.5).toFixed(1)}" fill="${home ? "#4a3d18" : `rgb(${v},${v + 8},${v})`}"/>`);
  }
  const hs = map.siteOf(C[0], C[1]);
  parts.push(`<circle cx="${X(hs.x)}" cy="${Z(hs.z)}" r="${(map.homeRadius * k).toFixed(1)}" fill="none" stroke="#e8c060" stroke-dasharray="3 3"/>`);
  for (const r of rel) {
    let near = Infinity;
    for (const o of rel) if (o !== r) near = Math.min(near, Math.hypot(o.x - r.x, o.z - r.z));
    parts.push(`<circle cx="${X(r.x)}" cy="${Z(r.z)}" r="${(R.minGap / 2 * k).toFixed(1)}" fill="none" stroke="${COLOURS[r.kind] ?? "#fff"}" stroke-opacity=".35"/>`);
    parts.push(`<circle cx="${X(r.x)}" cy="${Z(r.z)}" r="6" fill="${COLOURS[r.kind] ?? "#fff"}" stroke="#000"/>`);
    const right = +X(r.x) > W - 190;
    parts.push(`<text x="${(+X(r.x) + (right ? -9 : 9)).toFixed(1)}" y="${(+Z(r.z) + 4).toFixed(1)}" text-anchor="${right ? "end" : "start"}" fill="#eee" font-family="monospace" font-size="13">${r.kind} · ${near.toFixed(0)} m</text>`);
  }
  parts.push(`<text x="10" y="20" fill="#eee" font-family="monospace" font-size="14">seed ${seed} · ${rel.length} relics · gold: the home area, dashed: home's circle · rings: minGap/2 (${R.minGap} m: they never overlap)</text></svg>`);
  const svg = path.join(out, `relics-${seed}.svg`);
  fs.writeFileSync(svg, parts.join(""));
  svgs.push(svg);
  console.log(`seed ${seed}: ${rel.map(r => `${r.kind} (${r.x.toFixed(0)}, ${r.z.toFixed(0)})`).join(", ")}`);
}
await rules.close();
try {
  const require = createRequire(import.meta.url);
  let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
  const browser = await pw.chromium.launch(), page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  for (const svg of svgs) { await page.setContent(`<body style="margin:0">${fs.readFileSync(svg, "utf8")}</body>`); await page.screenshot({ path: svg.replace(/\.svg$/, ".png") }); fs.rmSync(svg); }
  await browser.close();
} catch (e) { console.log(`(no PNGs: ${e.message.split("\n")[0]})`); }
