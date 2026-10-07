// The ley line's route from above (Ed, 2026-10-06: the spiral mock-up, "This last example looks
// great!"): for each seed, the whole route through every area in wave order, the line from blue (the
// first waves, thicker) to pink (the last), home the yellow dot, each crossing ringed red; under it,
// distance from home by wave (cyan; dashed: the steady ideal, the k-th wave at the k-th nearest
// stone). (The varied order it was first compared with retired with its ?route=varied, 2026-10-07.)
//   node tools/map/leyroute.mjs [--seeds 1,2,3,123,4242,925469] [--out previews/ley-spiral]
// (one PNG of all the seeds, drawn by Playwright's Chromium.)
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { openRules, arg, nums } from "../balance/lib.mjs";

const rules = await openRules();
const { generateMap } = await rules.load("/src/rules/map.ts");
const { TUNING } = await rules.load("/src/rules/tuning.ts");
const { routeOf } = await rules.load("/src/rules/party.ts");
const { crossingPairs, meetPoint, routeShape } = await rules.load("/src/rules/leyroute.ts");
const out = arg("out", "previews/ley-spiral"), seeds = nums(arg("seeds", "1,2,3,123,4242,925469"));
fs.mkdirSync(out, { recursive: true });
const MW = 300, CW = 2 * MW + 8, CH = 150;

function routeSvg(map, r, label) {
  const d = map.dancefloor, half = map.bounds.circle ? map.bounds.circle.r : (map.bounds.maxX - map.bounds.minX) / 2;
  const k = MW / (2 * half + 40), X = x => ((x - d.x + half + 20) * k).toFixed(1), Z = z => ((z - d.z + half + 20) * k).toFixed(1);
  const p = [`<svg xmlns="http://www.w3.org/2000/svg" width="${MW}" height="${MW}"><rect width="${MW}" height="${MW}" fill="#0b0a12"/>`];
  if (map.bounds.circle) p.push(`<circle cx="${X(d.x)}" cy="${Z(d.z)}" r="${(half * k).toFixed(1)}" fill="none" stroke="#333"/>`);
  const n = r.links.length;
  r.links.forEach((l, i) => {
    const t = i / Math.max(1, n - 1), col = `hsl(${200 + t * 120},85%,${62 - t * 8}%)`;
    p.push(`<polyline points="${l.map(q => `${X(q[0])},${Z(q[1])}`).join(" ")}" fill="none" stroke="${col}" stroke-width="${(2.6 - t * 1.6).toFixed(2)}" stroke-linecap="round"/>`);
  });
  for (const [i, j] of crossingPairs(r.links)) { const m = meetPoint(r.links[i], r.links[j]); if (m) p.push(`<circle cx="${X(m[0])}" cy="${Z(m[1])}" r="7" fill="none" stroke="#ff3040" stroke-width="2"/>`); }
  p.push(`<circle cx="${X(d.x)}" cy="${Z(d.z)}" r="4" fill="#ffe25c"/>`);
  const sh = routeShape(map, r.stones);
  p.push(`<text x="6" y="14" fill="#ddd" font-family="monospace" font-size="11">${label}</text>`);
  p.push(`<text x="6" y="${MW - 8}" fill="#aaa" font-family="monospace" font-size="10">drift ${sh.drift.toFixed(0)} · one-sided ${sh.oneSided.toFixed(2)} · dip ${sh.lateDip.toFixed(0)} · ✕${crossingPairs(r.links).length}</text></svg>`);
  return p.join("");
}

function chartSvg(map, b) {
  const d = map.dancefloor, rad = st => st.map(q => Math.hypot(q[0] - d.x, q[1] - d.z)), rb = rad(b.stones), ideal = [...rb].sort((u, v) => u - v);
  const top = Math.max(...rb) * 1.05, n = rb.length, X = i => (30 + (i / Math.max(1, n - 1)) * (CW - 40)).toFixed(1), Y = v => (CH - 18 - (v / top) * (CH - 30)).toFixed(1);
  const line = (vs, col, extra = "") => `<polyline points="${vs.map((v, i) => `${X(i)},${Y(v)}`).join(" ")}" fill="none" stroke="${col}" stroke-width="1.4" ${extra}/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CW}" height="${CH}"><rect width="${CW}" height="${CH}" fill="#0b0a12"/>`
    + `<line x1="30" y1="${CH - 18}" x2="${CW - 10}" y2="${CH - 18}" stroke="#444"/><line x1="30" y1="8" x2="30" y2="${CH - 18}" stroke="#444"/>`
    + line(ideal, "#888", `stroke-dasharray="4 3"`) + line(rb, "#5fe8ff")
    + `<text x="34" y="18" fill="#aaa" font-family="monospace" font-size="10">distance from home by wave (up to ${top.toFixed(0)} m)</text>`
    + `<text x="${CW - 10}" y="${CH - 4}" text-anchor="end" fill="#aaa" font-family="monospace" font-size="10">wave ${n}</text></svg>`;
}

const cells = [];
for (const seed of seeds) {
  const map = generateMap(seed, TUNING), spiral = routeOf(map);
  cells.push(`<div style="display:flex;flex-direction:column;gap:4px"><div style="font:12px monospace;color:#eee">seed ${seed}</div><div style="display:flex;gap:8px">${routeSvg(map, spiral, "spiral")}</div>${chartSvg(map, spiral)}</div>`);
  console.log(`seed ${seed}: spiral ${JSON.stringify(routeShape(map, spiral.stones), (k, v) => (typeof v === "number" ? Math.round(v * 100) / 100 : v))}`);
}
await rules.close();
const legend = `<div style="font:12px monospace;color:#ccc;padding:6px 2px">The whole route in wave order, blue (first, thicker) to pink (last); home yellow; crossings ringed red. Under each map: radial drift (m), one-sidedness, the largest late dip toward home (m), crossings (✕). Chart: cyan the route, dashed the steady ideal (the k-th wave at the k-th nearest stone).</div>`;
const cols = 3, html = `<body style="margin:0;padding:10px;background:#07060c"><div style="display:grid;grid-template-columns:repeat(${cols},${CW}px);gap:18px">${cells.join("")}</div>${legend}</body>`;
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const rows = Math.ceil(seeds.length / cols), browser = await pw.chromium.launch(), page = await browser.newPage({ viewport: { width: cols * CW + (cols - 1) * 18 + 20, height: rows * (MW + CH + 30) + (rows - 1) * 18 + 50 } });
await page.setContent(html);
const f = path.join(out, "ley-spiral.png");
await page.screenshot({ path: f, fullPage: true });
await browser.close();
console.log(f);
