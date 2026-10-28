// Every kind's island (home's too, by the map's own coast) as a
// dream bubble draws it (art/islands.js islandPixels, 30 px at the game's 3-px grid, on the bubble's pale face) and as the sea
// chart's path, from its coastline (rules/islandShape.ts islandCoast) with the islands' coast knobs (islands.coast) (or those given), its phase
// from the kinds table (art/areas/<id>/kind.json and config/kinds/) where the rosters have it (else 0).
//   node tools/islands/sheet.mjs <out.png> [--amp 0.3] [--harmonics 4] [--detail 0.35]
import fs from "fs";
import { createRequire } from "module";
import { openRules, arg } from "../balance/lib.mjs";
import { kindsTable } from "../lib/kinds.mjs";
const require = createRequire(import.meta.url), out = process.argv[2] || "previews/islands.png";
const { islandPixels, islandPath } = await import("../../art/islands.js"), { SIGIL_IDS, islandSigil, sigilColour } = await import("../../art/sigils.js");
const R = await openRules(), { islandCoast } = await R.load("/src/rules/islandShape.ts"), { TUNING } = await R.load("/src/rules/tuning.ts");
const knobs = { ...TUNING.islands.coast, ...(arg("amp") ? { amp: +arg("amp") } : {}), ...(arg("harmonics") ? { harmonics: +arg("harmonics") } : {}), ...(arg("detail") ? { detail: +arg("detail") } : {}) };
const kinds = kindsTable(); // (art/areas/<id>/kind.json and config/kinds/, by slot)
const cells = ["home", ...SIGIL_IDS].map(kind => {
  const phase = kinds[kind]?.phase ?? 0, c = islandCoast({ kind, phase }, kind === "home" ? TUNING.map.coast : knobs), p = islandPixels(kind, c.radii);
  return { kind, phase, areas: c.areas, sigil: islandSigil(kind), colour: sigilColour(islandSigil(kind)), rgba: Array.from(p.rgba), path: islandPath(c.radii) };
});
await R.close();
const html = `<body style="margin:12px;background:#141020;color:#ccc;font:12px sans-serif"><div style="margin-bottom:8px">Island outlines (coast amp ${knobs.amp}, harmonics ${knobs.harmonics}, detail ${knobs.detail}): each as a dream bubble's symbol (30 px, x3) and as the sea chart's path</div>
<div style="display:grid;grid-template-columns:repeat(8,128px);gap:10px">${cells.map((c, i) => `<div style="text-align:center"><div style="display:flex;gap:4px;justify-content:center;align-items:center"><div style="background:#f4f1ea;padding:6px;border-radius:4px"><canvas id="c${i}" width="30" height="30" style="width:90px;height:90px;image-rendering:pixelated"></canvas></div></div>
<svg width="64" height="64" viewBox="0 0 1 1" style="margin-top:4px;background:#0e2a3a"><path d="${c.path}" fill="#2e4c46" stroke="#dccb92" stroke-width=".02"/></svg><br>${c.kind} · ${c.areas} areas</div>`).join("")}</div>
<script>const C=${JSON.stringify(cells.map(c => c.rgba))};C.forEach((a,i)=>{const x=document.getElementById("c"+i).getContext("2d"),d=x.createImageData(30,30);d.data.set(a);x.putImageData(d,0,0);});</script></body>`;
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const b = await pw.chromium.launch(), page = await b.newPage({ viewport: { width: 1200, height: 900 } });
await page.setContent(html); await page.screenshot({ path: out, fullPage: true }); await b.close();
console.log("wrote", out, cells.length, "islands");
