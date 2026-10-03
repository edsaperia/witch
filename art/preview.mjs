// Renders preview sheets of the art, lit by the lab's lighting pass under even "studio"
// light, enlarged with crisp pixels, for review on the PR.
//   node art/preview.mjs animals wolf,boar,owl art/previews/animals.png [scale]
//   node art/preview.mjs trees all art/previews/trees.png [scale]
//   node art/preview.mjs areas all art/previews/areas.png [scale]
//   node art/preview.mjs lights all art/previews/light-sources.png [scale]
//   node art/preview.mjs sigils all art/previews/sigils.png [scale]
//   node art/preview.mjs soundsystems all art/previews/soundsystems.png [scale]
// Optional env LEVELS=1,0 draws only those levels; FACINGS=towards,away one row per view; TREES=wBroad,wFir only those kinds.
// Optional env SIGIL=stag adds soundsystems carved with that creature's sigil; for lights, a list of species carves stones with their sigils.
// Optional env DRAWON=1 with sigils and a list draws each one on the ground through its draw-on.
// Optional env GEN=<path from repo root> renders with another copy of the generator (for "before" images).
import { writeFileSync } from "node:fs";
import { openBrowser } from "./headless.mjs";

const [what = "animals", list = "wolf,boar,owl", out = "art/previews/preview.png", scale = "3"] = process.argv.slice(2);
const gen = process.env.GEN || "/art/generator.js", lighting = process.env.LIGHT || "/art/lighting.js";
const b = await openBrowser();
if (process.env.TREES) await b.page.addInitScript(l => { window.TREES = l; }, process.env.TREES.split(","));
if (process.env.FACINGS) await b.page.addInitScript(l => { window.FACINGS = l; }, process.env.FACINGS.split(","));
if (process.env.SIGIL) await b.page.addInitScript(l => { window.SIGIL = l; }, process.env.SIGIL);
if (process.env.DRAWON) await b.page.addInitScript(() => { window.DRAWON = true; });
if (process.env.LEVELS) await b.page.addInitScript(l => { window.LEVELS = l; }, process.env.LEVELS.split(",").map(Number));
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ({ gen, lighting, what, list, scale }) => {
  const G = await import(gen), { shade } = await import(lighting);
  const st = { ...G.defaultStyle(), ...(window.STYLE || {}) };
  const studio = { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 };
  const rows = [];
  if (what === "sigils") { // every sigil, flat and on the ground (drawn), glowing on a dark ground, with its name
    const S = await import(gen.replace("generator.js", "sigils.js"));
    if (window.DRAWON) { // the draw-on: each listed sigil on the ground at moments through its writing, then glowing
      const ids = list.split(","), ts = [.08, .16, .26, .36, .46, .6, 1.4], D = 112, gw = D + 2, gh = Math.ceil(D * Math.sin(S.GROUND_PITCH)) + 2, W = ts.length * (gw + 8) + 8, H = ids.length * (gh + 8) + 8;
      const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#14121c"; g.fillRect(0, 0, W, H);
      ids.forEach((id, r) => { const gs = S.groundSigil(id, { diameter: D }); ts.forEach((t, k) => g.drawImage(S.paintGroundSigil(gs, t), 8 + k * (gw + 8), 8 + r * (gh + 8))); });
      const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale; const bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
      return big.toDataURL("image/png");
    }
    const ids = list === "all" ? S.SIGIL_IDS : list.split(","), cell = 96, cols = 6, rowsN = Math.ceil(ids.length / cols), gh = Math.ceil(cell * Math.sin(S.GROUND_PITCH)) + 2;
    const W = cols * cell * 2, H = rowsN * (cell + 22), c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"); g.fillStyle = "#14121c"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
    ids.forEach((id, i) => {
      const x = (i % cols) * cell * 2, y = Math.floor(i / cols) * (cell + 22);
      S.drawSigil(g, id, { x: x + cell * .08, y: y + cell * .04, size: cell * .92 });
      const gs = S.groundSigil(id, { diameter: cell - 8 }), pc = S.paintGroundSigil(gs, S.SIGIL_DRAW_TIME + .8); // written, at the pulse's peak
      g.drawImage(pc, Math.round(x + cell * 1.5 - gs.w / 2), Math.round(y + cell * .6 - gs.h / 2));
      const pg = S.sigilGlyph(id, 16), col = S.sigilColour(id);
      for (let py = 0; py < 16; py++) for (let px = 0; px < 16; px++) { const m = pg.m[py * 16 + px]; if (!m) continue; g.fillStyle = m === 2 ? "#fff8e8" : `rgb(${col})`; g.fillRect(x + cell * 1.5 - 8 + px, y + 4 + py, 1, 1); }
      g.fillStyle = "#cfc6e0"; g.font = "12px sans-serif"; g.textAlign = "center"; g.fillText(G.SPECIES_BY_ID[id].name, x + cell, y + cell + 14);
    });
    const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale;
    const bg = big.getContext("2d"); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, W * scale, H * scale);
    return big.toDataURL("image/png");
  }
  if (what === "animals") {
    const ids = list === "all" ? G.SPECIES.map(s => s.id) : list.split(",");
    for (const id of ids) for (const facing of window.FACINGS || ["towards"]) rows.push((window.LEVELS || [2, 1, 0]).flatMap(l => [0, 1].map(f => G.bake(G.critter(id, l, f, st, facing), G.speciesColours(id, st), st, st.cOutline))));
  } else if (what === "lights") { // the campfire's frames, the magic stones, the pond
    const L = G.lightProps(st); rows.push([...L.campfire, ...Object.values(L.stones), L.pond]);
    if (list !== "all") rows.push(list.split(",").map((id, i) => G.runeStone(st, { glow: ["cyan", "violet", "green"][i % 3], sigil: id }))); // stones carved with these creatures' sigils
  } else if (what === "soundsystems") { // per variant: three playing frames, two damaged, destroyed, and the witch for scale
    for (let v = 0; v < G.SOUNDSYSTEMS.length; v++) { if (list !== "all" && !list.split(",").includes(String(v))) continue; const col = G.soundsystemColours(v), b = o => G.bake(G.soundsystemSprite(st, { variant: v, ...o }), col, st, "none"); rows.push([b({ frame: 0 }), b({ frame: 1 }), b({ frame: 2 }), b({ state: "damaged", frame: 0 }), b({ state: "damaged", frame: 1 }), b({ state: "destroyed" }), G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline)]); }
    if (window.SIGIL) rows.push(G.SOUNDSYSTEMS.map((S, v) => G.bake(G.soundsystemSprite(st, { variant: v, sigil: window.SIGIL }), G.soundsystemColours(v), st, "none"))); // carved with a creature's sigil
  } else if (what === "areas") { // per area type: floor tile, walls, small, big, set piece, its creature (young)
    const ids = list === "all" ? G.AREAS.map(a => a.id) : list.split(",");
    for (const id of ids) { const a = G.areaAssets(id, st); rows.push([a.floor, ...a.walls, ...a.small, ...a.big, ...(a.setPiece ? [a.setPiece] : [])].map(x => x.sp).concat([G.bake(G.critter(a.def.creature, 1, 0, st), G.speciesColours(a.def.creature, st), st, st.cOutline)])); }
  } else {
    const K = 2 / (st.pixel || 2), r = G.rng(7), types = G.TREE_TYPES;
    const n = list === "all" ? 2 : +list;
    for (let k = 0; k < n; k++) rows.push(types.filter(([key]) => !window.TREES || window.TREES.includes(key)).map(([key, f], i) => { const tr = G.rng(100 * k + i + 1), ast = { ...st }, t = G.finishTree(f(tr, ast, st.treeSize * K * G.uni(tr, .9, 1.1)), ast, tr); return G.bake(t.sp, G.treeColours(tr, ast, f), st); }));
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
