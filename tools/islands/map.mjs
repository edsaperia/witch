// Islands from above (Ed, 2026-10-11, the journey's irregular islands: rules/islandGrowth.ts, rules/land.ts): for each phase (0 home,
// 1 to 5) and seed, the island's land and coast, its playable areas' middles (home's in pink), its runestones and the sea round it,
// at one scale so the sizes compare; with how long each took to make.
//   node tools/islands/map.mjs [--phases 0,1,2,3,4,5] [--seeds 1,2,3] [--out previews/islands/phases.png] [--set path=value;...]
import fs from "node:fs";
import path from "node:path";
import { openRules, arg, nums } from "../balance/lib.mjs";

const phases = nums(arg("phases", "0,1,2,3,4,5")), seeds = nums(arg("seeds", "1,2,3")), out = arg("out", "previews/islands/phases.png");
const R = await openRules();
const { TUNING } = await R.load("/src/rules/tuning.ts"), { generateMap } = await R.load("/src/rules/map.ts"), { soundsystemFor } = await R.load("/src/rules/party.ts");
const C = 300, S = 3800; // (a cell's pixels; metres across a cell, the biggest island's room)
const cells = [], log = [];
for (const phase of phases) for (const seed of seeds) {
  const size = phase === 0 ? 10 : 10 * phase;
  const t = { ...TUNING, map: { ...TUNING.map, islandAreas: size, island: "", phase } };
  const t0 = performance.now(), map = generateMap(seed, t), ms = performance.now() - t0, L = map.bounds.land, d = map.dancefloor;
  const k = C / S, X = x => (C / 2 + (x - d.x) * k).toFixed(1), Z = z => (C / 2 + (z - d.z) * k).toFixed(1);
  const p = [`<svg x="0" y="0" width="${C}" height="${C}" viewBox="0 0 ${C} ${C}"><rect width="${C}" height="${C}" fill="#0c1a33"/>`];
  for (const l of L.loops) { const q = []; for (let i = 0; i < l.pts.length; i += 4) q.push(`${X(l.pts[i])},${Z(l.pts[i + 1])}`); p.push(`<polygon points="${q.join(" ")}" fill="${l.sea ? "#2f5a34" : "#2a5f8f"}" stroke="#e8d9a8" stroke-width="1.2"/>`); }
  for (const [cx, cy] of map.cells) { const s = soundsystemFor(map, [cx, cy]); p.push(`<circle cx="${X(s.x)}" cy="${Z(s.z)}" r="2.2" fill="#7fe8ff"/>`); }
  p.push(`<circle cx="${X(d.x)}" cy="${Z(d.z)}" r="4" fill="#ff6fcf" stroke="#fff"/>`);
  const coast = L.loops.filter(l => l.sea).reduce((a, l) => a + l.length, 0), lakes = L.loops.filter(l => !l.sea).length;
  p.push(`<text x="6" y="14" fill="#fff" font-family="monospace" font-size="11">phase ${phase} · seed ${seed} · ${map.cells.length - 1} areas</text>`);
  p.push(`<text x="6" y="${C - 8}" fill="#ccc" font-family="monospace" font-size="10">coast ${(coast / 1000).toFixed(1)} km · ${ms.toFixed(0)} ms${lakes ? ` · ${lakes} lake${lakes > 1 ? "s" : ""}` : ""}</text></svg>`);
  cells.push({ phase, seed, svg: p.join("") });
  log.push(`phase ${phase} seed ${seed}: ${map.cells.length - 1} areas, coast ${(coast / 1000).toFixed(2)} km, home ${L.distAt(d.x, d.z).toFixed(0)} m from the sea, made in ${ms.toFixed(0)} ms`);
}
await R.close();
const cols = seeds.length, rows = phases.length, W = cols * C, H = rows * C;
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`;
cells.forEach((c, i) => { svg += `<g transform="translate(${(i % cols) * C},${Math.floor(i / cols) * C})">${c.svg}</g>`; });
svg += "</svg>";
fs.mkdirSync(path.dirname(out), { recursive: true });
let pw; try { pw = await import("playwright"); } catch { pw = await import("/opt/node22/lib/node_modules/playwright/index.js"); }
const browser = await (pw.chromium ?? pw.default.chromium).launch(), page = await browser.newPage({ viewport: { width: W, height: H } });
await page.setContent(`<body style="margin:0">${svg}</body>`);
await page.screenshot({ path: out });
await browser.close();
console.log(log.join("\n"));
console.log(`wrote ${out}`);
