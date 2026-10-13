// Before-and-after vignettes for trees in the open areas (Ed, 2026-10-12: "let's see if we can reasonably put trees into areas with
// no trees"): for each area, a small scene of its own floor, its walls and small pieces, its big pieces and its set piece as the art
// draws them today, then the same with the proposed trees added (species, how many, how they stand). A mock: composed by hand from
// the real sprites, not the game's placement, the added trees drawn at the tall height class (1.5 times an ordinary tree, as the
// game's tall variants); no game code is changed.
//   node tools/flora/vignette.mjs <spec.json> <out dir> [scale]
// spec: [{ id, before: n (how many big pieces today), add: [{ type, n, at: "lone" | "ring" | "edge" | "clumps" | "rows" | "between", scale, lean }], note }]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { openBrowser } from "../../art/headless.mjs";

const [specPath, outDir, scale = "2"] = process.argv.slice(2);
const spec = JSON.parse(readFileSync(specPath, "utf8"));
mkdirSync(outDir, { recursive: true });
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
for (const S of spec) {
  const url = await b.page.evaluate(async ({ S, scale }) => {
    const G = await import("/art/generator.js"), { shade } = await import("/art/lighting.js");
    const st = G.defaultStyle(), studio = { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 }, K = 2 / (st.pixel || 2);
    const a = G.areaAssets(S.id, st), def = a.def, W = 640, H = 300, top = 150, bot = 290;
    let seed = S.id.length * 977 + 13; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const tree = (type, sc = 1, lean = 0) => { const T = G.TREE_SPECIES[type]; const r = G.rng(Math.floor(rnd() * 1e6)), ts = { ...st, leafHue: def.leaf, treeLean: lean }, t = T.fn(r, ts, st.treeSize * K * sc * 1.5 * (.9 + rnd() * .2)); return G.bake(t.sp, G.treeColours(r, ts, T.fn), st, "none"); };
    const mid = [W / 2, top + (bot - top) * .55], clear = (x, y) => Math.hypot((x - mid[0]) / 90, (y - mid[1]) / 30) > 1;
    const spot = (at, i, n, c) => {
      for (let k = 0; k < 40; k++) {
        let x, y;
        if (at === "ring") { const t = (i + rnd() * .4) / n * Math.PI * 2; x = mid[0] + Math.cos(t) * 150; y = mid[1] + Math.sin(t) * 55; }
        else if (at === "edge") { const side = i % 3; x = side === 0 ? 20 + rnd() * 90 : side === 1 ? W - 20 - rnd() * 90 : 60 + rnd() * (W - 120); y = side === 2 ? top + rnd() * 25 : top + rnd() * (bot - top); }
        else if (at === "clumps") { x = c[i % c.length][0] + (rnd() - .5) * 70; y = c[i % c.length][1] + (rnd() - .5) * 30; }
        else if (at === "rows") { x = 30 + (i + rnd() * .5) / n * (W - 60); y = top + 30 + x * .12 + (rnd() - .5) * 14; }
        else { x = 30 + rnd() * (W - 60); y = top + 10 + rnd() * (bot - top - 10); }
        if (clear(x, y) || at === "ring") return [x, Math.min(bot, Math.max(top, y))];
      }
      return [30 + rnd() * (W - 60), top + rnd() * (bot - top)];
    };
    const scene = withAdds => {
      const items = [];
      for (const w of a.walls) for (let i = 0; i < 2; i++) items.push({ sp: w.sp, ...Object.fromEntries([["x", 40 + rnd() * (W - 80)], ["y", top + 5 + rnd() * 30]]) });
      for (const s of a.small) for (let i = 0; i < 5; i++) items.push({ sp: s.sp, x: 20 + rnd() * (W - 40), y: top + rnd() * (bot - top) });
      for (let i = 0; i < (S.before ?? 3); i++) { const p = a.big[i % a.big.length]; if (!p) break; const [x, y] = spot(S.beforeAt || "lone", i, S.before ?? 3); items.push({ sp: p.sp, x, y }); }
      if (a.setPiece) items.push({ sp: a.setPiece.sp, x: mid[0], y: mid[1] });
      if (withAdds) for (const A of S.add) { const n = A.n, c = [[120 + rnd() * 120, top + 40 + rnd() * 60], [W - 120 - rnd() * 120, top + 40 + rnd() * 60]]; for (let i = 0; i < n; i++) { const [x, y] = spot(A.at, i, n, c); items.push({ sp: tree(A.type, A.scale ?? 1, A.lean ?? 0), x, y }); } }
      return items.sort((p, q) => p.y - q.y);
    };
    seed = S.id.length * 977 + 13; const before = scene(false); seed = S.id.length * 977 + 13; const after = scene(true);
    const panel = items => {
      const tallest = Math.max(...items.map(it => it.sp.h - (it.y - 0)), 0), lift = Math.max(0, tallest), w = W, h = H + lift;
      const mk = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; }, A = mk(), N = mk(), ac = A.getContext("2d"), nc = N.getContext("2d");
      ac.fillStyle = `rgb(${G.hsv2rgb(st.groundHue, .4, st.groundVal)})`; ac.fillRect(0, 0, w, h); nc.fillStyle = "rgb(128,75,240)"; nc.fillRect(0, 0, w, h);
      for (let y = top + lift - 30; y < h; y += a.floor.sp.h) for (let x = 0; x < w; x += a.floor.sp.w) { ac.drawImage(a.floor.sp.A, x, y); nc.drawImage(a.floor.sp.N, x, y); }
      for (const it of items) { ac.drawImage(it.sp.A, Math.round(it.x - it.sp.w / 2), Math.round(it.y + lift - it.sp.h)); nc.drawImage(it.sp.N, Math.round(it.x - it.sp.w / 2), Math.round(it.y + lift - it.sp.h)); }
      const lit = mk(); shade({ a: ac, n: nc, w, h }, lit, studio, [], [0, 0, w, h]); return lit;
    };
    const P1 = panel(before), P2 = panel(after), ph = Math.max(P1.height, P2.height), pad = 8, lab = 22;
    const out = document.createElement("canvas"); out.width = (W * 2 + pad * 3) * scale; out.height = (ph + lab * 2 + pad * 2) * scale;
    const g = out.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = "#1b2330"; g.fillRect(0, 0, out.width, out.height);
    g.drawImage(P1, pad * scale, (lab + pad + ph - P1.height) * scale, W * scale, P1.height * scale); g.drawImage(P2, (W + pad * 2) * scale, (lab + pad + ph - P2.height) * scale, W * scale, P2.height * scale);
    g.fillStyle = "#eee"; g.font = `${13 * scale}px sans-serif`; g.fillText(`${def.name}: today`, pad * scale, 16 * scale); g.fillText(`${def.name}: with trees (mock)`, (W + pad * 2) * scale, 16 * scale);
    g.font = `${11 * scale}px sans-serif`; g.fillText(S.note, pad * scale, (lab + pad * 2 + ph + 8) * scale);
    return out.toDataURL("image/png");
  }, { S, scale: +scale });
  const f = `${outDir}/${S.id}.png`;
  writeFileSync(f, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", f);
}
console.log(b.errors.length ? b.errors : "");
await b.close();
