// The ley line leaving home, close up (Ed, 2026-10-06: "The leyline shouldn't cross the dancefloor. After going around
// the speaker circle it should go off to the right and loop around to whatever direction it needs to go"): for each
// seed, the 360 m round home from above: the dancefloor (grey), its ring of speakers (white dots) and the line's
// clearance round them (dashed), the treehouse (brown), the first link (the departure, cyan, thick) and the next few
// in wave order (blue to pink), each stone a dot.
//   node tools/map/leydepart.mjs [--seeds 1,2,3,123,4242,925469] [--out previews/ley-depart] [--route varied]
// (one PNG of all the seeds, drawn by Playwright's Chromium.)
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { openRules, arg, nums } from "../balance/lib.mjs";

const rules = await openRules();
const { generateMap } = await rules.load("/src/rules/map.ts");
const { TUNING } = await rules.load("/src/rules/tuning.ts");
const { routeOf } = await rules.load("/src/rules/party.ts");
const { departureClear } = await rules.load("/src/rules/departure.ts");
const { speakerRadius } = await rules.load("/src/rules/speakers.ts");
const out = arg("out", "previews/ley-depart"), seeds = nums(arg("seeds", "1,2,3,123,4242,925469")), route = arg("route", "spiral");
fs.mkdirSync(out, { recursive: true });
const W = 420, HALF = 180;

function panel(seed) {
  const map = generateMap(seed, { ...TUNING, party: { ...TUNING.party, route } }), r = routeOf(map), d = map.dancefloor, T = map.tuning;
  const k = W / (2 * HALF), X = x => ((x - d.x + HALF) * k).toFixed(1), Z = z => ((z - d.z + HALF) * k).toFixed(1);
  const p = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}"><rect width="${W}" height="${W}" fill="#0b0a12"/>`];
  p.push(`<circle cx="${X(d.x)}" cy="${Z(d.z)}" r="${(T.dancefloor.radius * k).toFixed(1)}" fill="#3a3a48"/>`);
  const sr = speakerRadius(T), n = T.dancefloor.speakers.count;
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; p.push(`<circle cx="${X(d.x + Math.cos(a) * sr)}" cy="${Z(d.z + Math.sin(a) * sr)}" r="2.5" fill="#ddd"/>`); }
  p.push(`<circle cx="${X(d.x)}" cy="${Z(d.z)}" r="${(departureClear(map, T.leyLines.depart.avoid) * k).toFixed(1)}" fill="none" stroke="#666" stroke-dasharray="4 3"/>`);
  const th = map.treehouse;
  if (th) p.push(`<rect x="${(+X(th.x) - 6).toFixed(1)}" y="${(+Z(th.z) - 6).toFixed(1)}" width="12" height="12" fill="#8a5a2a"/>`);
  const N = Math.min(r.links.length, 14);
  for (let i = N - 1; i >= 0; i--) {
    const l = r.links[i], t = i / Math.max(1, N - 1), col = i === 0 ? "#5fe8ff" : `hsl(${220 + t * 100},85%,60%)`;
    p.push(`<polyline points="${l.map(q => `${X(q[0])},${Z(q[1])}`).join(" ")}" fill="none" stroke="${col}" stroke-width="${i === 0 ? 3 : 1.8}" stroke-linecap="round"/>`);
  }
  for (let i = 0; i < N; i++) { const q = r.stones[i]; p.push(`<circle cx="${X(q[0])}" cy="${Z(q[1])}" r="3.2" fill="#fff"/><text x="${(+X(q[0]) + 5).toFixed(1)}" y="${(+Z(q[1]) - 4).toFixed(1)}" fill="#ccc" font-family="monospace" font-size="10">${i + 1}</text>`); }
  p.push(`<text x="8" y="16" fill="#eee" font-family="monospace" font-size="12">seed ${seed}</text></svg>`);
  return p.join("");
}

const cols = 3, cells = seeds.map(panel);
await rules.close();
const legend = `<div style="font:12px monospace;color:#ccc;padding:6px 2px">360 m round home from above (north up). Grey: the dancefloor; white dots: its speakers; dashed: the line's clearance round them; brown: the treehouse. Cyan, thick: the line leaving home; then the first waves' links, blue to pink, the stones numbered by wave.</div>`;
const html = `<body style="margin:0;padding:10px;background:#07060c"><div style="display:grid;grid-template-columns:repeat(${cols},${W}px);gap:12px">${cells.join("")}</div>${legend}</body>`;
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const rows = Math.ceil(seeds.length / cols), browser = await pw.chromium.launch(), page = await browser.newPage({ viewport: { width: cols * W + (cols - 1) * 12 + 20, height: rows * W + (rows - 1) * 12 + 60 } });
await page.setContent(html);
const f = path.join(out, `ley-depart${route === "spiral" ? "" : "-" + route}.png`);
await page.screenshot({ path: f, fullPage: true });
await browser.close();
console.log(f);
