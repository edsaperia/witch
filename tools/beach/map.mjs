// The beach from above (Ed, 2026-10-06: "The beach can be more irregularly shaped"; rules/mapShape.ts sandWidths,
// rules/beachDecor.ts): the island, its sand round the coast at its width there, the rocky stretches, and the decorations
// (finds as dots, footprint trails as lines). node tools/beach/map.mjs [seed] [out.png] [--even] (--even: the old even band).
import { writeFileSync } from "node:fs";
import { openRules } from "../balance/lib.mjs";

const seed = Number(process.argv[2] ?? 123), out = process.argv[3] ?? `previews/beach-decor/map-${seed}.png`, even = process.argv.includes("--even");
const R = await openRules();
const { TUNING } = await R.load("/src/rules/tuning.ts"), { generateMap } = await R.load("/src/rules/map.ts"), { beachOf } = await R.load("/src/rules/mapShape.ts"), { BeachDecor } = await R.load("/src/rules/beachDecor.ts");
const t = even ? { ...TUNING, beach: { ...TUNING.beach, vary: { ...TUNING.beach.vary, amp: 0 } } } : TUNING;
const map = generateMap(seed, t), b = beachOf(map.bounds, t), L = b.land, box = L.box, S = 900, mid = { x: (box.minX + box.maxX) / 2, z: (box.minZ + box.maxZ) / 2 }, k = (S - 40) / Math.max(box.maxX - box.minX, box.maxZ - box.minZ);
const X = x => (S / 2 + (x - mid.x) * k).toFixed(1), Z = z => (S / 2 + (z - mid.z) * k).toFixed(1);
// (each loop of coast, and the sand's inner line along it: in from the coast by its width there)
const line = (li, inset) => { const l = L.loops[li], out = []; for (let s = 0; s <= l.length; s += 8) { const p = L.along(li, s), d = inset(s); out.push(`${X(p.x - p.nx * d)},${Z(p.z - p.nz * d)}`); } return out.join(" "); };
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><rect width="${S}" height="${S}" fill="#0c1a33"/>`;
L.loops.forEach((l, li) => { svg += `<polygon points="${line(li, () => 0)}" fill="${l.sea ? "#e8d9a8" : "#0c1a33"}"/>`; });
L.loops.forEach((l, li) => { if (l.sea) svg += `<polygon points="${line(li, s => b.sandAlong(li, s))}" fill="#29402b"/>`; });
L.loops.forEach((l, li) => { for (let s = 0; s < l.length; s += 12) { const rk = b.rockyAlong(li, s); if (rk > 0.3) { const p = L.along(li, s); svg += `<circle cx="${X(p.x - p.nx * 4)}" cy="${Z(p.z - p.nz * 4)}" r="3" fill="#6a6a74" opacity="${rk.toFixed(2)}"/>`; } } });
if (!even && t.beach.decor?.on) {
  const d = new BeachDecor(b, seed, t.beach.decor);
  for (const s of d.sectorKeys()) for (const it of d.sector(s)) {
    const x = X(it.x), z = Z(it.z);
    svg += it.print ? `<circle cx="${x}" cy="${z}" r="0.7" fill="#7a5a3a"/>` : `<circle cx="${x}" cy="${z}" r="1.4" fill="${it.id.startsWith("rock") ? "#555" : it.id.startsWith("star") ? "#e0703a" : "#fff6e0"}"/>`;
  }
}
const sea = L.loops.findIndex(l => l.sea), w = Array.from({ length: 256 }, (_, i) => b.sandAlong(sea, (i / 256) * L.loops[sea].length));
svg += `<text x="16" y="28" fill="#fff" font-family="monospace" font-size="16">seed ${seed}${even ? " (before: an even band)" : ""} · sand ${Math.min(...w).toFixed(0)} to ${Math.max(...w).toFixed(0)} m (base ${b.width})</text></svg>`;
await R.close();
let pw; try { pw = await import("playwright"); } catch { pw = await import("/opt/node22/lib/node_modules/playwright/index.js"); }
const browser = await (pw.chromium ?? pw.default.chromium).launch(), page = await browser.newPage({ viewport: { width: S, height: S } });
await page.setContent(`<body style="margin:0">${svg}</body>`);
await page.screenshot({ path: out });
await browser.close();
writeFileSync(out.replace(/\.png$/, ".txt"), `sand widths (m), 256 samples along the sea's coast:\n${w.map(v => v.toFixed(0)).join(" ")}\n`);
console.log(`wrote ${out}`);

