// The tufts' sheet (#119): a row per area (its tufts side by side), a column per style, lit under the previews' studio light.
//   node tools/flora/tuft-sheet.mjs <out.png> [area,...] [column,...] [scale]
// A column is "<artStyle or ->" ("-" today's art, "bold" or "ref" stylised, the game's ?style=).
import { writeFileSync } from "node:fs";
import { openBrowser } from "../../art/headless.mjs";

const [out, list = "moor,fern-forest,meadow,heath,stone-shrine,muddy-forest", cols = "-,bold,ref", scale = "6"] = process.argv.slice(2);
if (!out) { console.error("usage: tuft-sheet.mjs <out.png> [area,...] [column,...] [scale]"); process.exit(1); }
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ({ list, cols, scale }) => {
  const G = await import("/art/generator.js"), { shade } = await import("/art/lighting.js");
  const base = G.defaultStyle(), ids = list.split(",");
  const columns = cols.split(",").map(c => ({ label: c === "-" ? "today" : c, st: { ...base, ...(c !== "-" ? { artStyle: c } : {}) } }));
  const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  const rows = ids.map(id => ({ id, groups: columns.map(c => G.bakeTufts(id, c.st)) }));
  const gap = 4, lab = 10, gw = columns.map((_, ci) => Math.max(...rows.map(r => r.groups[ci].reduce((a, s) => a + s.w + 3, 0)))), W = gw.reduce((a, v) => a + v + gap * 2, 52), rh = rows.map(r => Math.max(...r.groups.flat().map(s => s.h)) + gap), H = rh.reduce((a, v) => a + v, lab + gap);
  const Ac = mk(W, H), Nc = mk(W, H), a = Ac.getContext("2d"), n = Nc.getContext("2d");
  a.fillStyle = `rgb(${G.hsv2rgb(.1, .3, .3)})`; a.fillRect(0, 0, W, H); n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, W, H);
  let y = lab + gap;
  rows.forEach((row, ri) => { let x = 52; row.groups.forEach((g, ci) => { let xx = x; for (const s of g) { a.drawImage(s.A, xx, y + rh[ri] - gap - s.h); n.drawImage(s.N, xx, y + rh[ri] - gap - s.h); xx += s.w + 3; } x += gw[ci] + gap * 2; }); y += rh[ri]; });
  const studio = { ...base, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 }, lit = mk(W, H); shade({ a, n, w: W, h: H }, lit, studio, [], [0, 0, W, H]);
  const big = mk(W * scale, H * scale), g = big.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(lit, 0, 0, W * scale, H * scale);
  g.font = `${5 * scale}px monospace`; g.textBaseline = "top"; g.fillStyle = "#f4ecd8";
  let x = 52; columns.forEach((c, ci) => { g.fillText(c.label, x * scale, 2 * scale); x += gw[ci] + gap * 2; });
  y = lab + gap; rows.forEach((row, ri) => { g.fillText(row.id, 2 * scale, (y + rh[ri] / 2 - 2) * scale); y += rh[ri]; });
  return big.toDataURL("image/png");
}, { list, cols, scale: +scale });
writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
await b.close();
console.log("wrote", out);
