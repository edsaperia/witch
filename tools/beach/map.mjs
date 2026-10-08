// The beach from above (Ed, 2026-10-06: "The beach can be more irregularly shaped"; rules/mapShape.ts sandWidths,
// rules/beachDecor.ts): the island, its sand round the coast at its width there, the rocky stretches, and the decorations
// (finds as dots, footprint trails as lines). node tools/beach/map.mjs [seed] [out.png] [--even] (--even: the old even band).
import { writeFileSync } from "node:fs";
import { openRules } from "../balance/lib.mjs";

const seed = Number(process.argv[2] ?? 123), out = process.argv[3] ?? `previews/beach-decor/map-${seed}.png`, even = process.argv.includes("--even");
const R = await openRules();
const { TUNING } = await R.load("/src/rules/tuning.ts"), { generateMap } = await R.load("/src/rules/map.ts"), { beachOf } = await R.load("/src/rules/mapShape.ts"), { BeachDecor } = await R.load("/src/rules/beachDecor.ts");
const t = even ? { ...TUNING, beach: { ...TUNING.beach, vary: { ...TUNING.beach.vary, amp: 0 } } } : TUNING;
const map = generateMap(seed, t), b = beachOf(map.bounds, t), N = b.coast.length, S = 900, k = (S / 2 - 20) / (b.edgeMax + 40);
const P = (a, r) => `${(S / 2 + Math.cos(a) * r * k).toFixed(1)},${(S / 2 + Math.sin(a) * r * k).toFixed(1)}`;
const ring = f => Array.from({ length: N * 2 + 1 }, (_, i) => { const a = -Math.PI + (i / (N * 2)) * Math.PI * 2; return P(a, f(a)); }).join(" ");
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><rect width="${S}" height="${S}" fill="#0c1a33"/>`;
svg += `<polygon points="${ring(a => b.edge(a))}" fill="#e8d9a8"/>`;
svg += `<polygon points="${ring(a => b.edge(a) - b.sandAt(a))}" fill="#29402b"/>`;
for (let i = 0; i < N * 2; i++) { const a = -Math.PI + (i / (N * 2)) * Math.PI * 2, rk = b.rockyAt(a); if (rk > 0.3) svg += `<circle cx="${P(a, b.edge(a) - 4).split(",")[0]}" cy="${P(a, b.edge(a) - 4).split(",")[1]}" r="3" fill="#6a6a74" opacity="${rk.toFixed(2)}"/>`; }
if (!even && t.beach.decor?.on) {
  const d = new BeachDecor(b, seed, t.beach.decor);
  for (let s = 0; s < t.beach.decor.sectors; s++) for (const it of d.sector(s)) {
    const x = S / 2 + (it.x - b.x) * k, z = S / 2 + (it.z - b.z) * k;
    svg += it.print ? `<circle cx="${x.toFixed(1)}" cy="${z.toFixed(1)}" r="0.7" fill="#7a5a3a"/>` : `<circle cx="${x.toFixed(1)}" cy="${z.toFixed(1)}" r="1.4" fill="${it.id.startsWith("rock") ? "#555" : it.id.startsWith("star") ? "#e0703a" : "#fff6e0"}"/>`;
  }
}
const w = [...b.sand];
svg += `<text x="16" y="28" fill="#fff" font-family="monospace" font-size="16">seed ${seed}${even ? " (before: an even band)" : ""} · sand ${Math.min(...w).toFixed(0)} to ${Math.max(...w).toFixed(0)} m (base ${b.width})</text></svg>`;
await R.close();
let pw; try { pw = await import("playwright"); } catch { pw = await import("/opt/node22/lib/node_modules/playwright/index.js"); }
const browser = await (pw.chromium ?? pw.default.chromium).launch(), page = await browser.newPage({ viewport: { width: S, height: S } });
await page.setContent(`<body style="margin:0">${svg}</body>`);
await page.screenshot({ path: out });
await browser.close();
writeFileSync(out.replace(/\.png$/, ".txt"), `sand widths (m), ${N} samples round from angle -pi:\n${w.map(v => v.toFixed(0)).join(" ")}\n`);
console.log(`wrote ${out}`);

