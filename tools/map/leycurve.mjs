// The ley line's curvature, before and after (Ed, 2026-10-06: "can we give leylines a maximum curvature so they don't
// kink like this?"; "Another runestone showing the leyline with a kink in it"): for each seed, the whole route from above
// (the line as planned, straight from stone to stone, grey; as curved, blue to pink in wave order; crossings ringed red),
// then close-ups at the stones where the straight line turned sharpest (its hairpins and Vs): straight (grey, dashed)
// against curved (cyan), the stone white, the minimum radius as a dashed circle for scale. Prints each seed's sharpest
// turn (degrees a metre, and the tightest radius) before and after, and its crossings.
//   node tools/map/leycurve.mjs [--seeds 1,2,3,123,4242,925469] [--out previews/ley-curve] [--close 4] [--at k,...]
// (one PNG per seed, drawn by Playwright's Chromium.)
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { openRules, arg, nums } from "../balance/lib.mjs";

const rules = await openRules();
const { generateMap } = await rules.load("/src/rules/map.ts");
const { TUNING } = await rules.load("/src/rules/tuning.ts");
const { routeOf } = await rules.load("/src/rules/party.ts");
const { crossingPairs, meetPoint, withinCrossingRules, leyRadius } = await rules.load("/src/rules/leyroute.ts");
const { tightestTurn } = await rules.load("/src/rules/leycurve.ts");
const out = arg("out", "previews/ley-curve"), seeds = nums(arg("seeds", "1,2,3,123,4242,925469")), nClose = Number(arg("close", "4")), at = arg("at", "") ? nums(arg("at", "")) : null;
fs.mkdirSync(out, { recursive: true });
const MW = 520, CW = 250, CR = 110; // whole map, close-up size (px), close-up half-width (m)
const deg = r => (r * 180 / Math.PI);
const corner = (S, i) => { const a = S[i], b = S[i + 1], h1 = Math.atan2(a[1][1] - a[0][1], a[1][0] - a[0][0]), h2 = Math.atan2(b[1][1] - b[0][1], b[1][0] - b[0][0]); return Math.abs(Math.atan2(Math.sin(h2 - h1), Math.cos(h2 - h1))); };

function whole(map, r) {
  const d = map.dancefloor, half = map.bounds.circle ? map.bounds.circle.r : (map.bounds.maxX - map.bounds.minX) / 2, k = MW / (2 * half + 40);
  const X = x => ((x - d.x + half + 20) * k).toFixed(1), Z = z => ((z - d.z + half + 20) * k).toFixed(1), poly = (l, col, w, extra = "") => `<polyline points="${l.map(q => `${X(q[0])},${Z(q[1])}`).join(" ")}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
  const p = [`<svg xmlns="http://www.w3.org/2000/svg" width="${MW}" height="${MW}"><rect width="${MW}" height="${MW}" fill="#0b0a12"/>`];
  r.straight.forEach(l => p.push(poly(l, "#555", 0.8)));
  const n = r.links.length;
  r.links.forEach((l, i) => { const t = i / Math.max(1, n - 1); p.push(poly(l, `hsl(${200 + t * 120},85%,${62 - t * 8}%)`, (2.2 - t * 1.2).toFixed(2))); });
  for (const [i, j] of crossingPairs(r.links)) { const m = meetPoint(r.links[i], r.links[j]); if (m) p.push(`<circle cx="${X(m[0])}" cy="${Z(m[1])}" r="7" fill="none" stroke="#ff3040" stroke-width="2"/>`); }
  p.push(`<circle cx="${X(d.x)}" cy="${Z(d.z)}" r="4" fill="#ffe25c"/></svg>`);
  return p.join("");
}
function close(map, r, i, R) {
  const s = r.stones[i], k = CW / (2 * CR), X = x => ((x - s[0] + CR) * k).toFixed(1), Z = z => ((z - s[1] + CR) * k).toFixed(1);
  const poly = (l, col, w, extra = "") => `<polyline points="${l.map(q => `${X(q[0])},${Z(q[1])}`).join(" ")}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
  const p = [`<svg xmlns="http://www.w3.org/2000/svg" width="${CW}" height="${CW}"><rect width="${CW}" height="${CW}" fill="#0b0a12"/>`];
  p.push(`<circle cx="${X(s[0])}" cy="${Z(s[1])}" r="${(R * k).toFixed(1)}" fill="none" stroke="#444" stroke-dasharray="3 3"/>`);
  for (const L of r.straight) p.push(poly(L, "#888", 1.5, `stroke-dasharray="5 4"`));
  for (const L of r.links) p.push(poly(L, "#5fe8ff", 2.4));
  for (const q of r.stones) p.push(`<rect x="${(+X(q[0]) - 4).toFixed(1)}" y="${(+Z(q[1]) - 6).toFixed(1)}" width="8" height="12" fill="#eee"/>`);
  p.push(`<text x="6" y="14" fill="#ddd" font-family="monospace" font-size="11">wave ${i + 1}: was ${deg(corner(r.straight, i)).toFixed(0)}°</text>`);
  p.push(`<text x="6" y="${CW - 6}" fill="#888" font-family="monospace" font-size="10">${2 * CR} m across · dashed circle ${R} m</text></svg>`);
  return p.join("");
}

const cells = [];
for (const seed of seeds) {
  const map = generateMap(seed, TUNING), r = routeOf(map), R = leyRadius(map);
  const corners = r.straight.slice(1, -1).map((_, k) => ({ i: k + 1, c: corner(r.straight, k + 1) })).sort((a, b) => b.c - a.c);
  const picks = at ?? corners.slice(0, nClose).map(c => c.i - 1 + 1).map(i => i);
  const before = Math.max(...corners.map(c => c.c)), tight = Math.min(...r.links.slice(1).map(l => tightestTurn(l, 6))), cs = crossingPairs(r.links).length, cs0 = crossingPairs(r.straight).length;
  const line = `seed ${seed}: before, corners at the stones up to ${deg(before).toFixed(0)}° (in no length at all); after, the tightest turn ${tight.toFixed(1)} m (${deg(1 / tight).toFixed(2)}°/m), minimum ${R} m; crossings ${cs0} -> ${cs}, within Ed's rules ${withinCrossingRules(r.links)}`;
  console.log(line);
  cells.push(`<div style="display:flex;flex-direction:column;gap:6px"><div style="font:12px monospace;color:#eee">${line}</div><div style="display:flex;gap:8px;align-items:flex-start">${whole(map, r)}<div style="display:grid;grid-template-columns:repeat(2,${CW}px);gap:8px">${picks.map(i => close(map, r, i, R)).join("")}</div></div></div>`);
}
await rules.close();
const legend = `<div style="font:12px monospace;color:#ccc;padding:6px 2px">Left: the whole route from above, home yellow; grey, the line as it was (straight from stone to stone); coloured, as curved now (blue, the first waves, to pink, the last); red rings, crossings. Right: close-ups at the stones where it turned sharpest before (its hairpins and Vs), ${2 * CR} m across: dashed grey, before; cyan, after; white, the stones; the dashed circle the minimum radius.</div>`;
const html = `<body style="margin:0;padding:10px;background:#07060c"><div style="display:flex;flex-direction:column;gap:18px">${cells.join("")}</div>${legend}</body>`;
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const browser = await pw.chromium.launch(), page = await browser.newPage({ viewport: { width: MW + 2 * CW + 40, height: 400 } });
await page.setContent(html);
const f = path.join(out, "ley-curve.png");
await page.screenshot({ path: f, fullPage: true });
await browser.close();
console.log(f);
