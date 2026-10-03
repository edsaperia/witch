// Renders preview sheets of the art, lit by the lab's lighting pass under even "studio"
// light, enlarged with crisp pixels, for review on the PR.
//   node art/preview.mjs animals wolf,boar,owl art/previews/animals.png [scale]
//   node art/preview.mjs trees all art/previews/trees.png [scale]
// Optional env LEVELS=1,0 draws only those levels.
// Optional env GEN=<path from repo root> renders with another copy of the generator (for "before" images).
import { writeFileSync } from "node:fs";
import { openBrowser } from "./headless.mjs";

const [what = "animals", list = "wolf,boar,owl", out = "art/previews/preview.png", scale = "3"] = process.argv.slice(2);
const gen = process.env.GEN || "/art/generator.js", lighting = process.env.LIGHT || "/art/lighting.js";
const b = await openBrowser();
if (process.env.LEVELS) await b.page.addInitScript(l => { window.LEVELS = l; }, process.env.LEVELS.split(",").map(Number));
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ({ gen, lighting, what, list, scale }) => {
  const G = await import(gen), { shade } = await import(lighting);
  const st = { ...G.defaultStyle(), ...(window.STYLE || {}) };
  const studio = { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 };
  const rows = [];
  if (what === "animals") {
    const ids = list === "all" ? G.SPECIES.map(s => s.id) : list.split(",");
    for (const id of ids) rows.push((window.LEVELS || [2, 1, 0]).flatMap(l => [0, 1].map(f => G.bake(G.critter(id, l, f, st), G.speciesColours(id, st), st, st.cOutline))));
  } else {
    const K = 1, r = G.rng(7), types = G.TREE_TYPES;
    const n = list === "all" ? 2 : +list;
    for (let k = 0; k < n; k++) rows.push(types.map(([key, f], i) => { const tr = G.rng(100 * k + i + 1), ast = { ...st }, t = G.finishTree(f(tr, ast, st.treeSize * K * G.uni(tr, .9, 1.1)), ast, tr); return G.bake(t.sp, G.treeColours(tr, ast, f), st); }));
  }
  const gap = 6, w = Math.max(...rows.map(r => r.reduce((a, s) => a + s.w + gap, gap))), rh = rows.map(r => Math.max(...r.map(s => s.h)) + gap), h = rh.reduce((a, v) => a + v, gap);
  const mk = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  const A = mk(), N = mk(), a = A.getContext("2d"), n = N.getContext("2d");
  a.fillStyle = `rgb(${G.hsv2rgb(st.groundHue, .4, st.groundVal)})`; a.fillRect(0, 0, w, h); n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, w, h);
  let y = gap;
  rows.forEach((r, i) => { let x = gap; y += rh[i] - gap; for (const s of r) { a.drawImage(s.A, x, y - s.h); n.drawImage(s.N, x, y - s.h); x += s.w + gap; } y += gap; });
  const lit = mk(); shade({ a, n, w, h }, lit, studio, [], [0, 0, w, h]);
  const big = document.createElement("canvas"); big.width = w * scale; big.height = h * scale;
  const g = big.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(lit, 0, 0, w * scale, h * scale);
  return big.toDataURL("image/png");
}, { gen, lighting, what, list, scale: +scale });
writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
console.log("wrote", out, b.errors.length ? b.errors : "");
await b.close();
