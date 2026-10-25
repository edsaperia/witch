// The biome looks' contact sheet (Ed, 2026-10-23: art/flora/biomes.js): a row per biome (and temperate), each on a
// floor of one of its areas, lit by the game's night: three shared species (oak, pine, birch) in its look, then four of its own
// species in its look, then a 3 x 3 patch of its own crowns as the treetops see them; then border islands blending two.
//   node tools/biomes/sheet.mjs <png> [scale]   (MODE=trees, the default; canopy: the treetops; blends: border islands; ground: the tufts and the decor's rocks; rings: each biome at rings 3, 4 and 5's strengths; areas: a real
//   area's own trees today and in a biome's look; ROWS=jungle,cold only those; COLS=n panels to a row)
import { writeFileSync } from "node:fs";
import { openBrowser } from "../../art/headless.mjs";

const [out = "previews/biomes/sheet.png", scale = "2"] = process.argv.slice(2);
const b = await openBrowser();
if (process.env.MODE) await b.page.addInitScript(m => { window.MODE = m; }, process.env.MODE);
if (process.env.COLS) await b.page.addInitScript(n => { window.COLS = n; }, +process.env.COLS);
if (process.env.ROWS) await b.page.addInitScript(l => { window.ROWS = l; }, process.env.ROWS.split(","));
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async ({ scale }) => {
  const G = await import("/art/generator.js"), { shade } = await import("/art/lighting.js"), B = await import("/art/flora/biomes.js"), { M } = await import("/art/core.js");
  const st = G.defaultStyle(), K = 2 / (st.pixel || 2);
  // each biome: the area whose floor it stands on, its own species, the areas to show its look over
  const ROWS = [
    ["temperate", "bluebell-glade", ["oak", "beech", "alder", "rowan"]],
    ["cold", "snowfield", ["fir", "pine", "birch", "juniper"]],
    ["mountains and glaciers", "crags", ["larch", "cedar", "pine", "rowan"]],
    ["volcanic", "cinder-slopes", ["cycad", "pine", "kapok", "datePalm"]],
    ["badlands", "red-canyon", ["paloVerde", "ironwood", "juniper", "joshua"]],
    ["hot", "savanna", ["acacia", "baobab", "datePalm", "flat"]],
    ["mangrove swamp", "mangrove", ["mangrove", "willow", "datePalm", "alder"]],
    ["jungle", "temple-jungle", ["kapok", "strangler", "ironwood", "bamboo"]],
    ["cold rainforest", "mossy-creek", ["cedar", "fir", "yew", "alder"]],
  ];
  const BLENDS = [ // border islands: bearing between two biomes
    [{ a: "jungle", b: "mangrove swamp", w: .75 }, "temple-jungle", ["kapok", "mangrove", "willow"]],
    [{ a: "jungle", b: "mangrove swamp", w: .5 }, "mangrove", ["kapok", "mangrove", "willow"]],
    [{ a: "cold", b: "mountains and glaciers", w: .5 }, "snowfield", ["fir", "larch", "birch"]],
    [{ a: "volcanic", b: "badlands", w: .5 }, "cinder-slopes", ["cycad", "paloVerde", "pine"]],
  ];
  const SHARED = ["oak", "pine", "birch"];
  const tree = (id, look, seed) => {
    const S = G.TREE_SPECIES[id], r = G.rng(seed), ts = B.biomeStyle({ ...st, leafHue: .28 }, look), t = S.fn(r, ts, st.treeSize * K * B.biomeScale(look));
    G.snowCrown(t.sp, B.biomeSnow(look, 0), seed);
    const c = G.treeColours(G.rng(3), ts, S.fn); c[M.NOSE] = [20, 16, 24]; c[M.WEB] = [225, 225, 232]; B.biomeColours(c, look, M);
    return { whole: G.bake(t.sp, c, st, "none"), top: G.bake(G.splitTree(t).top, c, st, "none"), crownY: t.crownY };
  };
  const canopy = vs => { // a 3 x 3 patch of crowns, back to front (art/preview.mjs canopy)
    const r = G.rng(17), items = [], ws = vs.map(v => v.top.w).sort((p, q) => p - q), cw = ws[ws.length >> 1] * .7, ch = cw * .55;
    for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const v = vs[Math.floor(r() * vs.length)]; items.push({ v, x: i * cw + (j % 2) * cw * .5 + (r() - .5) * cw * .2, y: j * ch + (r() - .5) * ch * .2 }); }
    const W = Math.ceil(cw * 3.6 + Math.max(...vs.map(v => v.top.w))), H = Math.ceil(ch * 3 + Math.max(...vs.map(v => v.top.h)));
    const A = document.createElement("canvas"), N = document.createElement("canvas"); A.width = N.width = W; A.height = N.height = H; const a = A.getContext("2d"), n = N.getContext("2d");
    for (const it of items.sort((p, q) => p.y - q.y)) { const t = it.v.top, x = Math.round(it.x + 4), y = Math.round(it.y + H - ch * 3 - t.h + ch); a.drawImage(t.A, x, y - Math.round(it.v.crownY * .3)); n.drawImage(t.N, x, y - Math.round(it.v.crownY * .3)); }
    return { A, N, w: W, h: H };
  };
  const rows = [], pick = window.ROWS, mode = window.MODE || "trees";
  if (mode === "areas") { // each biome's look over a real area's own ten trees: what the re-themed areas would bake
    const AREAS = [["temperate", "old-oaks"], ["cold", "garden"], ["mountains and glaciers", "rocky-slope"], ["volcanic", "log-pile"], ["badlands", "heath"], ["hot", "meadow"], ["mangrove swamp", "wetland"], ["jungle", "cave-mouth"], ["cold rainforest", "ancient"]];
    for (const [biome, area] of AREAS) {
      if (pick && !pick.includes(biome)) continue;
      const vs = s => G.areaTreeVariants(area, s).filter(v => v.heightClass !== "sapling" && !v.face).slice(-3).map(v => v.whole);
      rows.push({ label: `${area}: today | as ${B.BIOME_LOOKS[biome].name}`, floor: G.areaAssets(area, st).floor.sp, items: biome === "temperate" ? vs(st) : [...vs(st), { gap: 16 }, ...vs({ ...st, biome })] });
    }
  } else if (mode === "ground") { // each biome's ground cover (tufts, on an area of its own floor) and world-decor rocks and ruins
    const rocks = G.DECOR.filter(d => d.family === "rocks" || d.family === "ruins").slice(0, 7);
    for (const [biome, area] of ROWS) {
      if (pick && !pick.includes(biome)) continue;
      const s2 = biome === "temperate" ? st : { ...st, biome }, look = biome === "temperate" ? null : B.biomeLook(biome), col = G.decorColours(st);
      if (look) B.biomeColours(col, look, M, { flower: false, stone: true });
      const items = G.bakeTufts(area, s2).flatMap(t => { const c = document.createElement("canvas"), n = document.createElement("canvas"); c.width = n.width = t.w * 3; c.height = n.height = t.h * 3; const a = c.getContext("2d"), m = n.getContext("2d"); a.imageSmoothingEnabled = m.imageSmoothingEnabled = false; a.drawImage(t.A, 0, 0, t.w * 3, t.h * 3); m.drawImage(t.N, 0, 0, t.w * 3, t.h * 3); return [{ A: c, N: n, w: t.w * 3, h: t.h * 3 }]; });
      const pieces = rocks.map(d => { const r = G.decorSprite(d.id, st, { variant: 0 }); return G.bake(r.whole, col, st, "none"); });
      rows.push({ label: `${B.BIOME_LOOKS[biome].name}: tufts (x3) | rocks and ruins`, floor: G.areaAssets(area, st).floor.sp, items: [...items, { gap: 12 }, ...pieces] });
    }
  } else if (mode === "blends") {
    for (const [blend, area, ids] of BLENDS) {
      const look = B.biomeLook(blend), [pa, pb] = [B.biomeLook(blend.a), B.biomeLook(blend.b)];
      rows.push({ label: `Border island: ${look.name}`, floor: G.areaAssets(area, st).floor.sp, items: [tree(ids[0], pa, 41), { gap: 12 }, ...ids.map((id, i) => tree(id, look, 41 + i * 13).whole), { gap: 12 }, tree(ids[0], pb, 41)].map(v => v.whole || v) });
    }
  } else if (mode === "rings") { // each biome at each ring's strength (Ed, 2026-10-25; the tuning's biomeLooks: rules/lakeLooks.ts biomeStrength): ring 3, ring 4, ring 5 (full: every ring before)
    for (const [biome, area, own] of ROWS) {
      if (biome === "temperate" || (pick && !pick.includes(biome))) continue;
      for (const [ring, k] of [[3, .55], [4, .8], [5, 1]]) {
        const look = B.biomeLook(k >= 1 ? biome : `${biome}|${biome}|1.00|${k.toFixed(2)}`), mk = (ids, s) => ids.map((id, i) => tree(id, look, s + i * 13));
        rows.push({ label: `${B.BIOME_LOOKS[biome].name}: ring ${ring} (${Math.round(k * 100)}%)${k >= 1 ? ", and every ring before" : ""}`, floor: G.areaAssets(area, st).floor.sp, items: [...mk(SHARED, 41).map(v => v.whole), { gap: 14 }, ...mk(own.slice(0, 2), 71).map(v => v.whole)] });
      }
    }
  } else for (const [biome, area, own] of ROWS) {
    if (pick && !pick.includes(biome)) continue;
    const look = biome === "temperate" ? null : B.biomeLook(biome), mk = (ids, s) => ids.map((id, i) => tree(id, look, s + i * 13));
    const L = B.BIOME_LOOKS[biome];
    if (mode === "canopy") rows.push({ label: `${L.name}: treetops (${own.join(", ")})`, floor: G.areaAssets(area, st).floor.sp, items: [canopy(mk(own, 71).concat(mk(own, 171)))] });
    else rows.push({ label: `${L.name}: oak, pine, birch | ${own.join(", ")}`, sub: L.feel, floor: G.areaAssets(area, st).floor.sp, items: [...mk(SHARED, 41).map(v => v.whole), { gap: 14 }, ...mk(own, 71).map(v => v.whole)] });
  }
  // each a panel of its own, lit by the game's night, laid out COLS to a row
  const gap = 6, lab = 22, wOf = it => it.gap ?? it.w, cols = window.COLS || 3;
  const panels = rows.map(r => {
    const w = r.items.reduce((a, s) => a + wOf(s) + gap, gap), h = Math.max(...r.items.map(s => s.h || 0)) + gap * 2;
    const mkc = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
    const A = mkc(), N = mkc(), a = A.getContext("2d"), n = N.getContext("2d"), F = r.floor;
    n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, w, h);
    for (let fy = 0; fy < h; fy += F.h) for (let fx = 0; fx < w; fx += F.w) { a.drawImage(F.A, fx, fy); n.drawImage(F.N, fx, fy); }
    let x = gap; for (const s of r.items) { if (s.gap) { x += s.gap + gap; continue; } a.drawImage(s.A, x, h - gap - s.h); n.drawImage(s.N, x, h - gap - s.h); x += s.w + gap; }
    const lit = mkc(); shade({ a, n, w, h }, lit, st, [], [0, 0, w, h]);
    return { ...r, lit, w, h };
  });
  const cw = Math.max(...panels.map(p => p.w)), grid = [];
  for (let i = 0; i < panels.length; i += cols) grid.push(panels.slice(i, i + cols));
  const rhs = grid.map(g => Math.max(...g.map(p => p.h)) + lab), W = (cw + gap) * Math.min(cols, panels.length) + gap, H = rhs.reduce((a, v) => a + v + gap, gap);
  const big = document.createElement("canvas"); big.width = W * scale; big.height = H * scale;
  const g = big.getContext("2d"); g.fillStyle = "#0c1014"; g.fillRect(0, 0, big.width, big.height); g.imageSmoothingEnabled = false;
  let y = gap;
  grid.forEach((row, k) => {
    row.forEach((p, i) => {
      const x = gap + i * (cw + gap), top = y + lab + rhs[k] - lab - p.h;
      g.drawImage(p.lit, x * scale, top * scale, p.w * scale, p.h * scale);
      g.fillStyle = "#e8e4d8"; g.font = `bold ${Math.round(8 * scale)}px sans-serif`; g.fillText(p.label, x * scale, (y + 9) * scale);
      if (p.sub) { g.fillStyle = "#a9b0a6"; g.font = `${Math.round(6.5 * scale)}px sans-serif`; g.fillText(p.sub, x * scale, (y + 18) * scale); }
    });
    y += rhs[k] + gap;
  });
  return big.toDataURL("image/png");
}, { scale: +scale });
writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
console.log("wrote", out, b.errors.length ? b.errors : "");
await b.close();
