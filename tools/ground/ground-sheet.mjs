// The ground's sheet (#119): a row per area, its floor tile repeated 3 x 2 (so seams show), a column per style; with
// --variants, its first four variants side by side instead, each once.
//   node tools/ground/ground-sheet.mjs <out.png> [area,...|all] [column,...] [scale] [--variants]
// A column is "<artStyle or ->" ("-" today's art, "bold" or "ref" stylised, the game's ?style=).
import { writeFileSync } from "node:fs";
import { openBrowser } from "../../art/headless.mjs";

const args = process.argv.slice(2).filter(a => !a.startsWith("--")), variants = process.argv.includes("--variants");
const [out, list = "moor,fern-forest,muddy-forest,stone-shrine,tangly-forest,wispy-forest,meadow,heath,bluebell-glade,rocky-slope", cols = "-,bold,ref", scale = "3"] = args;
if (!out) { console.error("usage: ground-sheet.mjs <out.png> [area,...|all] [column,...] [scale] [--variants]"); process.exit(1); }
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ({ list, cols, scale, variants }) => {
  const G = await import("/art/generator.js");
  const base = G.defaultStyle(), ids = list === "all" ? G.AREAS.map(a => a.id) : list.split(",");
  const columns = cols.split(",").map(c => ({ label: c === "-" ? "today" : c, st: { ...base, ...(c !== "-" ? { artStyle: c } : {}) } }));
  const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  const tiles = (id, st) => variants ? [0, 1, 2, 3].map(v => { const t = G.groundTile(G.AREA_BY_ID[id], st, v); return G.bake(t.sp, t.colours, st, "none").A; }) : [G.areaAssets(id, st).floor.sp.A];
  const TW = 64, TH = 48, gap = 8, lab = 14, cell = variants ? [TW * 4 + 3 * 2, TH] : [TW * 3, TH * 2], W = 70 + columns.length * (cell[0] + gap), H = lab + ids.length * (cell[1] + gap);
  const c = mk(W, H), g = c.getContext("2d"); g.fillStyle = "#222"; g.fillRect(0, 0, W, H);
  ids.forEach((id, ri) => columns.forEach((col, ci) => {
    const ts = tiles(id, col.st), x0 = 70 + ci * (cell[0] + gap), y0 = lab + ri * (cell[1] + gap);
    if (variants) ts.forEach((t, k) => g.drawImage(t, x0 + k * (TW + 2), y0));
    else for (let ty = 0; ty < 2; ty++) for (let tx = 0; tx < 3; tx++) g.drawImage(ts[0], x0 + tx * TW, y0 + ty * TH);
  }));
  const big = mk(W * scale, H * scale), bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
  bg.font = `${7 * scale}px monospace`; bg.textBaseline = "top"; bg.fillStyle = "#f4ecd8";
  columns.forEach((col, ci) => bg.fillText(col.label, (70 + ci * (cell[0] + gap)) * scale, 2 * scale));
  ids.forEach((id, ri) => bg.fillText(id, 2 * scale, (lab + ri * (cell[1] + gap) + cell[1] / 2 - 3) * scale));
  return big.toDataURL("image/png");
}, { list, cols, scale: +scale, variants });
writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
await b.close();
console.log("wrote", out);
