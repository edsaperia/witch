// Before-and-after sheets for the tree migration onto the blob generator (#119): each species a row, a sapling, a mature and a
// tall tree in each column group, lit under the previews' studio light at the game's screen scale.
//   node tools/flora/species-sheet.mjs <out.png> <species,...|all> <column,...> [scale]
// A column is "<artSet or ->/<artStyle or ->", e.g. "-/-" today's art, "-/bold" or "-/ref" stylised (the game's ?style=).
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { openBrowser } from "../../art/headless.mjs";

const [out, list = "all", cols = "-/-,trees/-,trees/bold,trees/ref", scale = "2"] = process.argv.slice(2);
if (!out) { console.error("usage: species-sheet.mjs <out.png> <species,...|all> <column,...> [scale]"); process.exit(1); }
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ({ list, cols, scale }) => {
  const G = await import("/art/generator.js"), { shade } = await import("/art/lighting.js");
  const base = G.defaultStyle(), ids = list === "all" ? Object.keys(G.TREE_SPECIES) : list.split(",");
  const columns = cols.split(",").map(c => { const [set, sty] = c.split("/"); return { label: c, st: { ...base, ...(set !== "-" ? { artSet: set } : {}), ...(sty !== "-" ? { artStyle: sty } : {}) } }; });
  const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  const grow = (id, st, k, seed) => { const S = id === "palm" ? { fn: G.palmTree } : G.setPlant?.(id, st) || G.TREE_SPECIES[id], r = G.rng(seed), sp = S.fn(r, { ...st, leafHue: .3 }, st.treeSize * k), col = G.treeColours(G.rng(seed + 1), { ...st, leafHue: .3 }, S.fn); return G.bake(sp.sp || sp, col, st, st.artStyle === "ref" ? "dark" : st.cOutline); };
  const rows = ids.map(id => ({ id, groups: columns.map(c => [.6, 1, 1.4].map((k, i) => grow(id, c.st, k, 11 + i * 7))) }));
  const gap = 10, lab = 16, gw = columns.map((_, ci) => Math.max(...rows.map(r => r.groups[ci].reduce((a, s) => a + s.w + 4, 0)))), W = gw.reduce((a, v) => a + v + gap * 2, 90), rh = rows.map(r => Math.max(...r.groups.flat().map(s => s.h)) + gap), H = rh.reduce((a, v) => a + v, lab + gap);
  const Ac = mk(W, H), Nc = mk(W, H), a = Ac.getContext("2d"), n = Nc.getContext("2d");
  a.fillStyle = `rgb(${G.hsv2rgb(.24, .35, .42)})`; a.fillRect(0, 0, W, H); n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, W, H);
  let y = lab + gap;
  rows.forEach((row, ri) => { let x = 90; row.groups.forEach((g, ci) => { let xx = x; for (const s of g) { a.drawImage(s.A, xx, y + rh[ri] - gap - s.h); n.drawImage(s.N, xx, y + rh[ri] - gap - s.h); xx += s.w + 4; } x += gw[ci] + gap * 2; }); y += rh[ri]; });
  const studio = { ...base, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 }, lit = mk(W, H); shade({ a, n, w: W, h: H }, lit, studio, [], [0, 0, W, H]);
  const big = mk(W * scale, H * scale), g = big.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(lit, 0, 0, W * scale, H * scale);
  g.font = `${11 * scale}px monospace`; g.textBaseline = "top"; g.fillStyle = "#f4ecd8";
  let x = 90; columns.forEach((c, ci) => { g.fillText(c.label, x * scale, 3 * scale); x += gw[ci] + gap * 2; });
  y = lab + gap; rows.forEach((row, ri) => { g.fillText(row.id, 4 * scale, (y + rh[ri] / 2) * scale); y += rh[ri]; });
  return big.toDataURL("image/png");
}, { list, cols, scale: +scale });
writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
try { execFileSync("convert", [out, "+dither", "-colors", "256", out]); } catch { /* kept as drawn */ }
if (b.errors.length) console.error(b.errors);
console.log("wrote", out);
await b.close();
