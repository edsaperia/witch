// Contact sheets for the art iterations (docs/art-iterations/): for an area type and an art set (art/genome/next.js),
// three PNGs, lit under the previews' even studio light on the area's own floor:
//   creatures.png  its creature at baby, young, adult and legend, towards then away, the witch for scale; then the young
//                  in party gear, woken, and the sleeping legend's two breathing frames
//   plants.png     its tree variants across the height classes (whole), a 3 x 3 patch of crowns as the treetops show
//                  them and the trunks alone as the ground shows them; its walls, small and big objects and set piece
//   set.png        the set together: a patch of its floor with its trees, props, creature at every level and its sleeping legend
//   node tools/art-iterations/sheets.mjs <area> <out dir> [artSet] [scale]       (artSet "" or "-" for the default art)
//   node tools/art-iterations/sheets.mjs creature:<id>[,<id>...] <out dir> [artSet] [scale]   (creatures only, on a plain floor)
import { writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { openBrowser } from "../../art/headless.mjs";

const [what, outDir, artSetArg = "", scale = "3"] = process.argv.slice(2);
if (!what || !outDir) { console.error("usage: sheets.mjs <area>|creature:<ids> <out dir> [artSet] [scale]"); process.exit(1); }
const artSet = artSetArg === "-" ? "" : artSetArg;
mkdirSync(outDir, { recursive: true });
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const sheets = await b.page.evaluate(async ({ what, artSet, scale }) => {
  const G = await import("/art/generator.js"), { shade } = await import("/art/lighting.js");
  const st = { ...G.defaultStyle(), ...(artSet ? { artSet } : {}) };
  const studio = { ...st, ambient: .55, ambientHue: .15, moon: .9, moonHue: .15, shafts: 0 };
  const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  const creatureOnly = what.startsWith("creature:");
  const areaId = creatureOnly ? null : what, A = areaId ? G.areaAssets(areaId, st) : null;
  const floorTile = A ? A.floor.sp : null;
  const witch = G.bake(G.witchSprite(st), G.witchColours(st), st, st.cOutline);
  const bk = (sp, col) => G.bake(sp, col, st, st.cOutline);
  // a lit sheet from labelled rows of baked sprites: each row on the area's floor, its label above it
  const sheet = rows => {
    const gap = 8, lab = 14, w = Math.max(...rows.map(r => r.items.reduce((a, s) => a + s.w + gap, gap))), rh = rows.map(r => Math.max(...r.items.map(s => s.h)) + gap + lab), h = rh.reduce((a, v) => a + v, gap);
    const Ac = mk(w, h), Nc = mk(w, h), a = Ac.getContext("2d"), n = Nc.getContext("2d");
    if (floorTile) { a.fillStyle = a.createPattern(floorTile.A, "repeat"); a.fillRect(0, 0, w, h); a.fillStyle = "rgba(0,0,0,.25)"; let yy = gap; rh.forEach(v => { a.fillRect(0, yy, w, lab); yy += v; }); }
    else { a.fillStyle = `rgb(${G.hsv2rgb(st.groundHue, .4, st.groundVal)})`; a.fillRect(0, 0, w, h); }
    n.fillStyle = "rgb(128,75,240)"; n.fillRect(0, 0, w, h);
    if (floorTile) { n.fillStyle = n.createPattern(floorTile.N, "repeat"); n.fillRect(0, 0, w, h); }
    let y = gap;
    rows.forEach((r, i) => { let x = gap; const base = y + rh[i] - gap; for (const s of r.items) { a.drawImage(s.A, x, base - s.h); n.drawImage(s.N, x, base - s.h); x += s.w + gap; } y += rh[i]; });
    const lit = mk(w, h); shade({ a, n, w, h }, lit, studio, [], [0, 0, w, h]);
    const big = mk(w * scale, h * scale), g = big.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(lit, 0, 0, w * scale, h * scale);
    g.font = `${11 * scale}px monospace`; g.textBaseline = "top";
    y = gap; rows.forEach((r, i) => { g.fillStyle = "#000a"; g.fillText(r.label, gap * scale + 1, y * scale + 1); g.fillStyle = "#f4ecd8"; g.fillText(r.label, gap * scale, y * scale); y += rh[i]; });
    return big.toDataURL("image/png");
  };
  const out = {};
  // ---- creatures ----
  const ids = creatureOnly ? what.slice(9).split(",") : [A.def.creature], crows = [];
  for (const id of ids) {
    const S = G.speciesIn(id, st), name = S.name || id, col = G.speciesColours(id, st);
    for (const facing of ["towards", "away"]) crows.push({ label: `${name}: baby, young, adult, legend (${facing})`, items: [...[0, 1, 2, 3].map(l => bk(G.critter(id, l, 0, st, facing), col)), witch] });
    const gear = { collar: [255, 90, 210], hat: 1, glasses: "bar", shoes: "sneakers" }, woken = { woken: true }, extra = [bk(G.critter(id, 1, 0, st, "towards", gear), G.speciesColours(id, st, gear)), bk(G.critter(id, 2, 1, st, "towards", gear), G.speciesColours(id, st, gear)), bk(G.critter(id, 1, 0, st, "towards", woken), G.speciesColours(id, st, woken))];
    let label = `${name}: party gear (young, adult), woken`;
    if (G.LEGEND_IDS.includes(id)) { for (const frame of [0, 1]) { const { sp, colours } = G.legendForm(id, st, { frame }); extra.push(bk(sp, colours)); } label += ", sleeping legend (2 breaths)"; }
    crows.push({ label, items: extra });
    const wf = [0, 1].flatMap(f => [1, 2].map(l => bk(G.critter(id, l, f, st), col)));
    crows.push({ label: `${name}: walk frames 0 and 1 (young, adult)`, items: wf });
  }
  out.creatures = sheet(crows);
  if (creatureOnly) return out;
  // ---- plants ----
  const vs = G.areaTreeVariants(areaId, st), prows = [];
  if (vs.length) {
    prows.push({ label: `trees: ${[...new Set(vs.map(v => v.species))].join(", ")} across the height classes`, items: [...vs.map(v => v.whole), witch] });
    // the canopy from the treetops: a 3 x 3 patch of crowns, then the trunks alone as ground mode shows them
    const tops = vs.filter(v => v.heightClass !== "sapling"), r = G.rng(areaId.length * 31 + 7), ws = tops.map(v => v.top.w).sort((p, q) => p - q), cw = ws[ws.length >> 1] * .7, ch = cw * .55, its = [];
    for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) its.push({ v: tops[Math.floor(r() * tops.length)], x: i * cw + (j % 2) * cw * .5 + (r() - .5) * cw * .2, y: j * ch + (r() - .5) * ch * .2 });
    const W = Math.ceil(cw * 3.6 + Math.max(...tops.map(v => v.top.w))), H = Math.ceil(ch * 3 + Math.max(...tops.map(v => v.top.h)));
    const Ac = mk(W, H), Nc = mk(W, H), a = Ac.getContext("2d"), n = Nc.getContext("2d");
    for (const it of its.sort((p, q) => p.y - q.y)) { const t = it.v.top, x = Math.round(it.x + 4), y = Math.round(it.y + H - ch * 3 - t.h + ch - it.v.crownY * .3); a.drawImage(t.A, x, y); n.drawImage(t.N, x, y); }
    prows.push({ label: "the canopy from the treetops; the trunks as the ground shows them", items: [{ A: Ac, N: Nc, w: W, h: H }, ...vs.filter((v, i) => i % 2 === 0).map(v => v.bot)] });
  }
  const props = [...A.walls.map(p => p.sp), ...A.small.map(p => p.sp), ...A.big.map(p => p.sp), ...(A.setPiece ? [A.setPiece.sp] : [])];
  prows.push({ label: "walls, small objects, big objects, set piece", items: [...props, witch] });
  out.plants = sheet(prows);
  // ---- the set together: a patch of floor, its trees, props, creatures and sleeping legend, back to front ----
  const W = 520, H = 300, Ac = mk(W, H), Nc = mk(W, H), a = Ac.getContext("2d"), n = Nc.getContext("2d"), r = G.rng(91), items = [];
  a.fillStyle = a.createPattern(floorTile.A, "repeat"); a.fillRect(0, 0, W, H); n.fillStyle = n.createPattern(floorTile.N, "repeat"); n.fillRect(0, 0, W, H);
  const put = (s, x, y) => items.push({ s, x: Math.round(x - s.w / 2), y: Math.round(y - s.h), z: y });
  const place = (n2, f) => { for (let i = 0; i < n2; i++) f(G.uni(r, 20, W - 20), G.uni(r, 30, H - 4), i); };
  if (vs.length) { place(7, (x, y, i) => { if (Math.abs(x - W / 2) < 90 && y > 110) return; put(vs[(i * 3) % vs.length].whole, x, y); }); }
  const big = A.big.map(p => p.sp), small = A.small.map(p => p.sp), walls = A.walls.map(p => p.sp);
  if (!vs.length && big.length) place(6, (x, y, i) => { if (Math.abs(x - W / 2) < 90 && y > 110) return; put(big[i % big.length], x, y); });
  if (small.length) place(14, (x, y, i) => put(small[i % small.length], x, y));
  if (walls.length) for (let i = 0; i < 3; i++) put(walls[i % walls.length], 40 + i * 150, 40);
  if (A.setPiece) put(A.setPiece.sp, W * .78, H * .55);
  const id = A.def.creature, col = G.speciesColours(id, st);
  [2, 1, 0].forEach((l, i) => put(bk(G.critter(id, l, 0, st, i % 2 ? "away" : "towards"), col), W * .32 + i * 60, H * .8 + (i % 2) * 14)); // the awake legend is too big for the patch: the creatures sheet shows it
  if (G.LEGEND_IDS.includes(id)) { const { sp, colours } = G.legendForm(id, st, {}); put(bk(sp, colours), W * .14, H * .5); }
  put(witch, W * .62, H * .92);
  for (const it of items.sort((p, q) => p.z - q.z)) { a.drawImage(it.s.A, it.x, it.y); n.drawImage(it.s.N, it.x, it.y); }
  const lit = mk(W, H); shade({ a, n, w: W, h: H }, lit, studio, [], [0, 0, W, H]);
  const bg = mk(W * scale, H * scale), g = bg.getContext("2d"); g.imageSmoothingEnabled = false; g.drawImage(lit, 0, 0, W * scale, H * scale);
  out.set = bg.toDataURL("image/png");
  return out;
}, { what, artSet, scale: +scale });
for (const [k, url] of Object.entries(sheets)) {
  const f = `${outDir}/${k}.png`;
  writeFileSync(f, Buffer.from(url.split(",")[1], "base64"));
  try { execFileSync("convert", [f, "+dither", "-colors", "256", "-define", "png:compression-level=9", f]); } catch { /* ImageMagick missing: kept as drawn */ } // a few hundred KB, not megabytes, so the contents API serves them
  console.log("wrote", f);
}
if (b.errors.length) console.error(b.errors);
await b.close();
