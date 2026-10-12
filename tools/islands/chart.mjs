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
  const t0 = performance.now(), arch = A.archipelago(world, kinds), ms = performance.now() - t0, M = arch.metres;
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
    if (S) before += coast(S.islandOutline({ ...isl, patch: undefined }, TUNING, 32), at.x, at.y).replaceAll('"COL"', `"${COL[ph]}"`);
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
  for (const p of arch.islands.values()) {
    if (S) after += coast(S.islandOutline(isleOf(p.id), TUNING, 32), p.x, p.y).replaceAll('"COL"', `"${COL[p.phase]}"`);
    else after += disc(p.x, p.y, landR(p.phase), COL[p.phase], `stroke="#e8d9a8" stroke-width="0.7" opacity="0.9"`);
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
