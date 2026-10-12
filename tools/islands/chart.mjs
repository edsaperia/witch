// The archipelago from above (Ed, 2026-10-12, the journey's tessellation: rules/archipelago.ts): for each world, the chart's
// layout today (every island on its phase's ring at its bearing) beside the new one (packed over the whole disc, each in its
// patch), at one true scale (CHART_METRES): each island's patch outlined, and its land (a disc of its true area, or with
// --outlines its real coast, grown in its patch: slow, about a minute a world). Phases coloured, home pink.
//   node tools/islands/chart.mjs [--worlds 0,1,2] [--outlines] [--out previews/islands/chart.png]
import fs from "node:fs";
import path from "node:path";
import { openRules, arg, nums } from "../balance/lib.mjs";

const worlds = nums(arg("worlds", "0,1,2")), out = arg("out", "previews/islands/chart.png"), outlines = process.argv.includes("--outlines");
const R = await openRules();
const A = await R.load("/src/rules/archipelago.ts"), Ro = await R.load("/src/rules/rosters.ts"), L = await R.load("/src/app/chartLayout.ts");
const S = outlines ? await R.load("/src/rules/islandShape.ts") : null, { TUNING } = await R.load("/src/rules/tuning.ts");
const W = 760, C = W / 2, k = (W / 2 - 8);
const COL = ["#c2549a", "#4f8f3a", "#5f9a3f", "#7a9a3a", "#8f8f35", "#9a7a35"];
const panels = [];
for (const world of worlds) {
  const kinds = Object.keys(Ro.KINDS).map(id => ({ id, phase: Ro.KINDS[id].phase + 1, bearing: Ro.bearingOf(id, world) }));
  const t0 = performance.now(), arch = Ro.worldOf(world), ms = performance.now() - t0, M = arch.metres;
  const disc = (x, y, r, fill, extra = "") => `<circle cx="${(C + x * k).toFixed(1)}" cy="${(C + y * k).toFixed(1)}" r="${(r * k).toFixed(1)}" fill="${fill}" ${extra}/>`;
  const landR = p => Math.sqrt(A.LAND_KM2[p] * 1e6 / Math.PI) / M;
  // before: today's rings (app/chartLayout.ts), land at the same true scale
  let before = `<rect width="${W}" height="${W}" fill="#0c1a33"/>` + disc(0, 0, 1, "none", `stroke="#345"`);
  const isleOf = id => id === "home" ? Ro.homeIsland(world, Ro.REAL_KINDS.slice(0, 64), 64) : Ro.islandOf(id, world);
  const coast = (o, x, y) => o.loops.map(l => { const q = []; for (let i = 0; i < l.pts.length; i += 2) q.push(`${(C + (x + l.pts[i] / M) * k).toFixed(1)},${(C + (y + l.pts[i + 1] / M) * k).toFixed(1)}`); return `<polygon points="${q.join(" ")}" fill="${l.sea ? "COL" : "#3f86c2"}" stroke="#e8d9a8" stroke-width="0.6"/>`; }).join("");
  // (today: its phase's ring at its bearing, grown with no patch)
  for (const id of ["home", ...kinds.map(kd => kd.id)]) {
    const at = L.ringAt ? L.ringAt(id, world) : L.islandAt(id, world), isl = isleOf(id), ph = id === "home" ? 0 : isl.phase;
    if (!at) continue;
    if (S) before += coast(S.islandOutline({ ...isl, patch: undefined, turn: undefined }, TUNING, 32), at.x, at.y).replaceAll('"COL"', `"${COL[ph]}"`);
    else before += disc(at.x, at.y, landR(ph), COL[ph], `stroke="#e8d9a8" stroke-width="0.7" opacity="0.9"`);
  }
  before += `<text x="8" y="18" fill="#fff" font-family="monospace" font-size="13">world ${world}: today (rings)</text>`;
  // after: the archipelago's patches and land
  let after = `<rect width="${W}" height="${W}" fill="#0c1a33"/>` + disc(0, 0, 1, "none", `stroke="#345"`);
  for (const p of arch.islands.values()) {
    const pts = [];
    for (let a = 0; a < p.patch.length; a++) { const t = (a / p.patch.length) * Math.PI * 2, r = p.patch[a] / M; pts.push(`${(C + (p.x + Math.cos(t) * r) * k).toFixed(1)},${(C + (p.y + Math.sin(t) * r) * k).toFixed(1)}`); }
    after += `<polygon points="${pts.join(" ")}" fill="none" stroke="#2a4a70" stroke-width="1"/>`;
  }
  const coasts = [];
  for (const p of arch.islands.values()) {
    if (S) { const o = S.islandOutline(isleOf(p.id), TUNING, 32); coasts.push({ id: p.id, o, x: p.x * M, y: p.y * M }); after += coast(o, p.x, p.y).replaceAll('"COL"', `"${COL[p.phase]}"`); }
    else after += disc(p.x, p.y, landR(p.phase), COL[p.phase], `stroke="#e8d9a8" stroke-width="0.7" opacity="0.9"`);
  }
  // (with outlines, the sea between neighbouring coasts: each island's nearest other coast, its least marked in red where under a strait)
  if (S) {
    const B = 200, grid = new Map(), cellOf = (x, y) => `${Math.floor(x / B)},${Math.floor(y / B)}`;
    coasts.forEach((c, n) => { for (const l of c.o.loops) if (l.sea) for (let i = 0; i < l.pts.length; i += 2) { const x = c.x + l.pts[i], y = c.y + l.pts[i + 1], key = cellOf(x, y); if (!grid.has(key)) grid.set(key, []); grid.get(key).push(n, x, y); } });
    const near = coasts.map(() => ({ d: Infinity, x: 0, y: 0, x2: 0, y2: 0 })), R = 4;
    for (const [key, list] of grid) { const [gi, gj] = key.split(",").map(Number); for (let di = -R; di <= R; di++) for (let dj = -R; dj <= R; dj++) { const o = grid.get(`${gi + di},${gj + dj}`); if (!o) continue; for (let a = 0; a < list.length; a += 3) for (let b = 0; b < o.length; b += 3) { if (list[a] === o[b]) continue; const d = Math.hypot(list[a + 1] - o[b + 1], list[a + 2] - o[b + 2]), m = near[list[a]]; if (d < m.d) Object.assign(m, { d, x: list[a + 1], y: list[a + 2], x2: o[b + 1], y2: o[b + 2] }); } } }
    const ds = near.map(m => m.d).filter(Number.isFinite).sort((a, b) => a - b), q = f => ds[Math.floor(f * (ds.length - 1))];
    const worst = near.map((m, n) => [m.d, coasts[n].id]).sort((a, b) => a[0] - b[0]).slice(0, 4); console.log(worst.map(w => `${w[1]} ${w[0].toFixed(0)}`).join(', '));
    console.log(`world ${world}: nearest coasts (m): least ${q(0).toFixed(0)}, 10% ${q(0.1).toFixed(0)}, median ${q(0.5).toFixed(0)}, most ${q(1).toFixed(0)}; under a strait (${A.STRAIT} m, less the outline's sampling): ${ds.filter(d => d < A.STRAIT - 8).length}`);
    for (const m of near) if (m.d < A.STRAIT - 8) after += `<line x1="${(C + (m.x / M) * k).toFixed(1)}" y1="${(C + (m.y / M) * k).toFixed(1)}" x2="${(C + (m.x2 / M) * k).toFixed(1)}" y2="${(C + (m.y2 / M) * k).toFixed(1)}" stroke="#ff3030" stroke-width="3"/>`;
  }
  after += `<text x="8" y="18" fill="#fff" font-family="monospace" font-size="13">world ${world}: archipelago (${ms.toFixed(0)} ms)</text>`;
  panels.push(before, after);
  console.log(`world ${world}: laid out in ${ms.toFixed(0)} ms`);
}
await R.close();
const H = W * worlds.length;
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W * 2}" height="${H}">`;
panels.forEach((p, i) => { svg += `<g transform="translate(${(i % 2) * W},${Math.floor(i / 2) * W})">${p}</g>`; });
svg += "</svg>";
fs.mkdirSync(path.dirname(out), { recursive: true });
let pw; try { pw = await import("playwright"); } catch { pw = await import("/opt/node22/lib/node_modules/playwright/index.js"); }
const browser = await (pw.chromium ?? pw.default.chromium).launch(), page = await browser.newPage({ viewport: { width: W * 2, height: H } });
await page.setContent(`<body style="margin:0">${svg}</body>`);
await page.screenshot({ path: out });
await browser.close();
console.log(`wrote ${out}`);
