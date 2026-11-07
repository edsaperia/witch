// Evidence sheets of today's shipped legends (level 3), drawn by the game's own art pipeline in a
// worktree: the game's style (config/style.json over the Lab defaults, artStyle "bold", pixel 3, as
// src/app/viewParams.ts and src/render/style.ts build it), baked as the game's art worker bakes them
// (src/render/creatureArt.ts creatureSprites; src/render/artBuild.ts "sleep" and "nap" jobs), then lit
// under art/preview.mjs's even studio light (art/lighting.js shade).
//   node legends-today.mjs <worktree> <out dir>
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const [wt, outArg] = process.argv.slice(2);
const out = resolve(outArg); mkdirSync(out, { recursive: true });
const { openBrowser } = await import(join(resolve(wt), "art/headless.mjs"));
const LANES = {
  L1: "fox arcticfox fennec wolf raccoon redpanda badger otter",
  L2: "marten stoat meerkat mole hedgehog dormouse squirrel flyingsquirrel",
  L3: "cat lynx cheetah jaguar lion tiger snowleopard",
  L4: "stag elk roe ibex ram boar rhino elephant",
  L5: "bear polarbear hare beaver armadillo bat",
  L6: "owl raven heron penguin",
  L7: "crocodile komodo snake rattlesnake newt salamander toad stegosaurus",
  L8: "beetle crab dragonfly moth scorpion snail spider woodlouse",
  L9: "featheredserpent frosttroll frostwyrm griffin hydra sphinx unicorn",
};
const lanes = Object.fromEntries(Object.entries(LANES).map(([k, v]) => [k, v.split(" ")]));
const dirs = readdirSync(join(wt, "art/creatures"), { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort();
const inLanes = Object.values(lanes).flat();
const missing = dirs.filter(d => !inLanes.includes(d)), extra = inLanes.filter(d => !dirs.includes(d));
if (missing.length || extra.length) console.log("lane mismatch: not in a lane", missing, "not a species dir", extra);
const styleJson = JSON.parse(readFileSync(join(wt, "config/style.json"), "utf8"));

const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const failures = [];
const save = (name, url) => writeFileSync(join(out, name), Buffer.from(url.split(",")[1], "base64"));

// 1. bake and light every species' forms; keep the lit canvases on the page
const sizes = await b.page.evaluate(async ({ ids, styleJson }) => {
  const G = await import("/art/generator.js"), { shade } = await import("/art/lighting.js");
  const st = G.defaultStyle(), given = styleJson.style && typeof styleJson.style === "object" ? styleJson.style : styleJson;
  for (const [k, v] of Object.entries(given)) if (k in st) st[k] = v;
  st.artStyle = "bold"; st.propGen = 1; st.pixel = 3; // (src/app/viewParams.ts styleFromLink, gameStyle: tuning pixelSize 3)
  const studio = { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 };
  const ground = `rgb(${G.hsv2rgb(st.groundHue, .4, st.groundVal)})`;
  const lit = bk => { // one baked sprite lit alone on the ground colour, as preview.mjs lights its sheets
    const mk = () => { const c = document.createElement("canvas"); c.width = bk.w; c.height = bk.h; return c; };
    const A = mk(), N = mk(), a = A.getContext("2d"), n = N.getContext("2d");
    a.fillStyle = ground; a.fillRect(0, 0, bk.w, bk.h); n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, bk.w, bk.h); a.drawImage(bk.A, 0, 0); n.drawImage(bk.N, 0, 0);
    const L = mk(); shade({ a, n, w: bk.w, h: bk.h }, L, studio, [], [0, 0, bk.w, bk.h]); return L;
  };
  window.FORMS = {}; window.GROUND = ground; const info = {};
  for (const id of ids) {
    const f = {}, err = [];
    const tryForm = (key, fn) => { try { f[key] = lit(fn()); } catch (e) { err.push(`${key}: ${e && e.message || e}`); } };
    for (const facing of ["towards", "away"]) tryForm(facing, () => G.bake(G.critter(id, 3, 0, st, facing), G.speciesColours(id, st, null, 3), st, st.cOutline));
    tryForm("circle", () => { const { sp, colours } = G.legendForm(id, st, { frame: 0 }); return G.bake(sp, colours, st, "none"); }); // the area legend asleep in its circle (artBuild "sleep" job)
    tryForm("nap", () => G.bake(G.critter(id, 3, 0, st, "towards", { nap: true }), G.speciesColours(id, st, { nap: true }), st, st.cOutline)); // art/naps.js at level 3 (artBuild "nap" job)
    window.FORMS[id] = f; info[id] = { err, dims: Object.fromEntries(Object.entries(f).map(([k, c]) => [k, [c.width, c.height]])) };
  }
  return info;
}, { ids: dirs, styleJson });
for (const [id, s] of Object.entries(sizes)) if (s.err.length) failures.push(`${id}: ${s.err.join("; ")}`);
writeFileSync(join(out, "sizes.json"), JSON.stringify(sizes, null, 1));
console.log("baked", Object.keys(sizes).length, "species; errors:", b.errors.length ? b.errors.slice(0, 5) : "none");

// 2. compose sheets on the page: groups of cells, each a labelled row of forms at a scale
const sheet = (rows, title, opts = {}) => b.page.evaluate(({ rows, title, opts }) => {
  const F = window.FORMS, gap = 10, lab = 16, pad = 12, titleH = title ? 24 : 0;
  const cells = rows.map(r => r.items.map(([id, key, k, text]) => { const c = F[id] && F[id][key]; return c ? { c, k, text, w: c.width * k, h: c.height * k } : { c: null, k, text: text + " (none)", w: 8 * (text.length + 7), h: 20 }; }));
  const rowW = cells.map((cs, i) => Math.max(pad + (rows[i].label ? 8 * rows[i].label.length + 16 : 0) + cs.reduce((a, c) => a + Math.max(c.w, 7 * c.text.length) + gap, 0), 1));
  const rowH = cells.map(cs => Math.max(...cs.map(c => c.h)) + lab + gap);
  const W = Math.max(...rowW, title ? 9 * title.length + 2 * pad : 0) + pad, H = titleH + rowH.reduce((a, v) => a + v, 0) + pad * 2;
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const g = cv.getContext("2d"); g.imageSmoothingEnabled = false;
  g.fillStyle = "#24222b"; g.fillRect(0, 0, W, H); g.textBaseline = "top";
  if (title) { g.fillStyle = "#f0ecff"; g.font = "bold 14px monospace"; g.fillText(title, pad, pad); }
  let y = pad + titleH;
  cells.forEach((cs, i) => {
    let x = pad;
    if (rows[i].label) { g.fillStyle = "#ffe9a8"; g.font = "bold 13px monospace"; g.fillText(rows[i].label, x, y + lab + (rowH[i] - lab - gap) / 2 - 7); x += 8 * rows[i].label.length + 16; }
    for (const c of cs) {
      g.fillStyle = "#b9b2d4"; g.font = "11px monospace"; g.fillText(c.text, x, y + 2);
      const top = y + lab + (rowH[i] - lab - gap - c.h); // feet on one line
      if (c.c) { g.fillStyle = window.GROUND; g.fillRect(x, top, c.w, c.h); g.drawImage(c.c, x, top, c.w, c.h); }
      x += Math.max(c.w, 7 * c.text.length) + gap;
    }
    y += rowH[i];
  });
  return { url: cv.toDataURL("image/png"), W, H };
}, { rows, title, opts });

const short = process.env.SHORT || "", src = process.env.SRC || "";
const per = id => [
  { label: "native", items: [[id, "towards", 1, "towards"], [id, "away", 1, "away"], [id, "circle", 1, "asleep in circle (legends.js)"], [id, "nap", 1, "nap (naps.js)"]] },
  { label: "4x", items: [[id, "towards", 4, "towards 4x"], [id, "away", 4, "away 4x"]] },
  { label: "4x", items: [[id, "circle", 4, "asleep in circle 4x"], [id, "nap", 4, "nap 4x"]] },
];
for (const id of dirs) { const r = await sheet(per(id), `${id} - legend (level 3) - source ${short}`); save(`legend-${id}.png`, r.url); }
console.log("species sheets done");

const laneRow = (id, k) => ({ label: id.padEnd(16), items: [[id, "towards", k, "towards"], [id, "away", k, "away"], [id, "circle", k, "asleep in circle"], [id, "nap", k, "nap"]] });
const report = {};
for (const [lane, ids] of Object.entries(lanes)) {
  let k = 4, r;
  for (; k >= 1; k--) { r = await sheet(ids.map(id => laneRow(id, k)), `Lane ${lane} - today's legends (level 3) at ${k}x - source ${short}`); if (r.W < 8000 && r.H < 8000) break; }
  save(`lane-${lane}.png`, r.url); report[lane] = { scale: k, W: r.W, H: r.H }; console.log(lane, k, r.W, r.H);
}
// overview at native size: every species' awake towards, away and asleep, packed into rows
const ovRows = [], perRow = +(process.env.PER || 4);
for (let i = 0; i < dirs.length; i += perRow) ovRows.push({ items: dirs.slice(i, i + perRow).flatMap(id => [[id, "towards", 1, id], [id, "away", 1, "away"], [id, "circle", 1, "asleep"]]) });
const ov = await sheet(ovRows, `All 64 legends (level 3), native game pixels: towards, away, asleep in circle - source ${short}`);
save("all-legends.png", ov.url); report.all = { W: ov.W, H: ov.H };
console.log("overview", ov.W, ov.H);
writeFileSync(join(out, "report.json"), JSON.stringify({ src, failures, errors: b.errors, sheets: report }, null, 1));
console.log("failures:", failures.length ? failures : "none");
await b.close();
