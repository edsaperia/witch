// The zoo's layout from above (rules/zooMap.ts): every island's outline (found ones in their area's green, the rest as lakes), the
// Ent's plaza, the streets out to the edge water; with how big the islands are and how wide the streets between them run (each
// island's nearest neighbour, coast to coast). For Ed's "too small and too far apart" (2026-10-26).
//   node tools/zoo/map.mjs [out.png] [--seed 7] [--size 900] [--real]
// --real: every island in its real coast, made here as the chart's worker makes it (rules/islandShape.ts islandOutline, then
// app/chartCache.ts compactCoast: what the zoo reads back from the chart's cache in a browser); about a minute.
import { createRequire } from "node:module";
import { arg, openRules, median } from "../balance/lib.mjs";
import { writeFileSync } from "node:fs";

const require = createRequire(import.meta.url);
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const { chromium } = playwright;

const out = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "previews/zoo/map.png", SIZE = Number(arg("size", 900));
const R = await openRules();
try {
  const { newGame } = await R.load("/src/rules/game.ts"), { TUNING } = await R.load("/src/rules/tuning.ts"), { reachAt } = await R.load("/src/rules/zooMap.ts"), { ZOO_CONFIG } = await R.load("/src/rules/zoo.ts");
  let coasts;
  if (process.argv.includes("--real")) {
    const { islandOutline } = await R.load("/src/rules/islandShape.ts"), { islandOf, KIND_NAMES } = await R.load("/src/rules/rosters.ts"), { compactCoast } = await R.load("/src/app/chartCache.ts");
    coasts = {};
    for (const k of KIND_NAMES) { const I = islandOf(k, 0); if (!I) continue; const c = compactCoast(islandOutline(I, TUNING, 32).loops); if (c) coasts[k] = c; }
    console.log(`real coasts: ${Object.keys(coasts).length}`);
  }
  const g = newGame(Number(arg("seed", 7)), { ...TUNING, map: { ...TUNING.map, shape: "zoo", island: "", islandAreas: 0, found: ["*"], ...(coasts ? { coasts } : {}) } });
  const L = g.map.zoo.layout, H = L.home, edge = L.reach + (ZOO_CONFIG.margin ?? 120), k = SIZE / (2 * (edge + 40));
  const P = (x, z) => `${((x - H.x) * k + SIZE / 2).toFixed(1)},${((z - H.z) * k + SIZE / 2).toFixed(1)}`;
  // (coast to coast: the gap to each island's nearest neighbour along the line between their middles)
  const gaps = L.islands.map(I => Math.min(...L.islands.filter(J => J !== I).map(J => { const a = Math.atan2(J.z - I.z, J.x - I.x); return Math.hypot(J.x - I.x, J.z - I.z) - reachAt(I.reach, a) - reachAt(J.reach, a + Math.PI); })));
  const across = L.islands.map(I => 2 * Math.sqrt(I.reach.reduce((s, r) => s + r * r, 0) / I.reach.length));
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" style="background:#0b0912"><circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${edge * k}" fill="#3a3530"/>`;
  svg += `<circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${(ZOO_CONFIG.plaza ?? 60) * k}" fill="#6a6a62" stroke="#7fe0b8" stroke-width="1.5"/>`;
  for (const I of L.islands) {
    const n = I.coast.length >> 1, pts = Array.from({ length: n }, (_, i) => P(I.x + I.coast[i * 2], I.z + I.coast[i * 2 + 1])).join(" "); // (its coast as the rules have it)
    svg += `<polygon points="${pts}" fill="${I.found ? "#2f5a34" : "#24466a"}" stroke="#e8c060" stroke-width="1"/>`;
    svg += `<text x="${P(I.x, I.z).split(",")[0]}" y="${P(I.x, I.z).split(",")[1]}" font-size="9" fill="#f3e8ff" text-anchor="middle" font-family="monospace">${I.kind}</text>`;
  }
  const line = `islands ${L.islands.length}, across ~${Math.round(median(across))} m (median), street to the nearest neighbour: median ${Math.round(median(gaps))} m, min ${Math.round(Math.min(...gaps))} m, max ${Math.round(Math.max(...gaps))} m; zoo ${Math.round(2 * edge)} m across`;
  svg += `<text x="10" y="${SIZE - 10}" font-size="13" fill="#f3e8ff" font-family="monospace">${line}</text></svg>`;
  console.log(line);
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: SIZE, height: SIZE } });
  await p.setContent(`<body style="margin:0">${svg}</body>`);
  writeFileSync(out, await p.screenshot());
  await b.close();
  console.log("wrote", out);
} finally { await R.close(); }
