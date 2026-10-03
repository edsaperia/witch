// The art's checks, run before every push (there is no CI yet):
//   node art/check.mjs
// 1. builds the lab (tools/art-lab/build.mjs);
// 2. opens the source lab page and the built one in headless Chromium: no script errors,
//    a bestiary card for every species, the scene drawn;
// 3. draws every creature at every level and frame, every tree kind and bush, and every area
//    type's assets, and checks each is non-empty, stands on its bottom row, and that legends
//    are the tallest.
import { execFileSync } from "node:child_process";
import { openBrowser, ROOT } from "./headless.mjs";

let failed = 0;
const ok = (cond, what) => { console.log(`${cond ? "ok  " : "FAIL"} ${what}`); if (!cond) failed++; };

execFileSync("node", ["tools/art-lab/build.mjs"], { cwd: ROOT, stdio: "inherit" });
const b = await openBrowser();
const ignore = e => /ERR_CERT_AUTHORITY_INVALID|fonts\.g/.test(e); // web fonts, blocked in some sandboxes
for (const page of ["/tools/art-lab/witch-art-lab.html", "/tools/art-lab/dist/witch-art-lab.html"]) {
  b.errors.length = 0;
  await b.page.goto(b.base + page, { waitUntil: "domcontentloaded", timeout: 90000 });
  // the bestiary draws a little after the page; wait for every card (or give up after 90 s)
  await b.page.waitForFunction(async () => { const n = document.querySelectorAll("#bestiary canvas").length; return n > 0 && n === (await import("/art/generator.js")).SPECIES.length; }, null, { timeout: 90000, polling: 500 }).catch(() => {});
  const cards = await b.page.evaluate(() => document.querySelectorAll("#bestiary canvas").length);
  const species = await b.page.evaluate(async () => (await import("/art/generator.js")).SPECIES.length);
  const lit = await b.page.evaluate(() => { const c = document.getElementById("scene"), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 30) n++; return n / (d.length / 4); });
  const errs = b.errors.filter(e => !ignore(e));
  ok(!errs.length, `${page}: no script errors${errs.length ? " — " + errs.join("; ") : ""}`);
  ok(cards === species, `${page}: ${cards} of ${species} bestiary cards`);
  ok(lit > .5, `${page}: scene drawn (${Math.round(lit * 100)}% of pixels lit)`);
}
await b.page.goto(b.base + "/art/headless-blank.html");
const report = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), res = [];
  const stats = sp => { let n = 0, bottom = 0; for (let i = 0; i < sp.m.length; i++) if (sp.m[i]) n++; for (let x = 0; x < sp.w; x++) if (sp.m[(sp.h - 1) * sp.w + x]) bottom++; return { n, bottom, w: sp.w, h: sp.h }; };
  for (const S of G.SPECIES) {
    const hs = [];
    for (const level of [0, 1, 2]) for (const frame of [0, 1]) { const s = stats(G.critter(S.id, level, frame, st)); hs[level] = s.h; res.push({ what: `${S.id} level ${level} frame ${frame}`, good: s.n > 20 && s.bottom > 0, info: `${s.w}x${s.h}` }); }
    res.push({ what: `${S.id}: legend taller than young taller than baby`, good: hs[2] > hs[1] && hs[1] > hs[0], info: hs.join(" < ") });
  }
  for (const [key, f] of G.TREE_TYPES) for (let v = 0; v < 3; v++) { const r = G.rng(v + 1), t = f(r, st, st.treeSize * G.uni(r, .9, 1.1)), s = stats(t.sp); res.push({ what: `tree ${key} ${v}`, good: s.n > 200 && s.bottom > 0 && t.crownY > 0 && t.crownY < s.h, info: `${s.w}x${s.h}` }); }
  for (let v = 0; v < 8; v++) { const s = stats(G.bush(G.rng(v), st).sp); res.push({ what: `bush ${v}`, good: s.n > 20, info: `${s.w}x${s.h}` }); }
  for (const facing of ["towards", "away"]) for (const frame of [0, 1, 2]) { const s = stats(G.witchSprite(st, { frame, facing })); res.push({ what: `witch ${facing} frame ${frame}`, good: s.n > 200 && s.bottom > 0, info: `${s.w}x${s.h}` }); }
  for (const id of ["wolf", "owl", "snake"]) { const s = stats(G.critter(id, 1, 0, st, "away")); res.push({ what: `${id} turned away`, good: s.n > 50 && s.bottom > 0, info: `${s.w}x${s.h}` }); }
  { const H = G.soundsystemHeight(st), ws = G.witchSprite(st);
    for (let v = 0; v < G.SOUNDSYSTEMS.length; v++) {
      const play = [0, 1, 2].map(frame => stats(G.soundsystemSprite(st, { variant: v, frame }))), dmg = [0, 1].map(frame => stats(G.soundsystemSprite(st, { variant: v, frame, state: "damaged" }))), dead = stats(G.soundsystemSprite(st, { variant: v, state: "destroyed" }));
      res.push({ what: `soundsystem ${G.SOUNDSYSTEMS[v].id}: 3 playing, 2 damaged, destroyed; standing; about 3 times the witch; rubble lower than the stack`, good: [...play, ...dmg, dead].every(s => s.n > 200 && s.bottom > 0) && play[0].h > ws.h * 2.4 && dead.h < play[0].h * .7, info: `${play[0].w}x${play[0].h} rubble ${dead.w}x${dead.h} witch ${ws.h}` });
    } }
  // sigils: one per species; non-empty as vector (SVG, and drawn on a canvas) and as a 12 px pixel glyph; strokes inside the box;
  // on the ground, the draw-on only adds ink and the finished rune has some
  for (const S of G.SPECIES) {
    const id = S.id, strokes = G.sigilStrokes(id), half = G.SIGIL_STROKE / 2;
    const inside = strokes.length > 0 && strokes.every(k => k.pts.every(([x, y]) => { const m = k.dot ? G.SIGIL_DOT : half; return x >= m - 1e-9 && x <= 1 - m + 1e-9 && y >= m - 1e-9 && y <= 1 - m + 1e-9; }));
    const svg = G.sigilSVG(id), c = document.createElement("canvas"); c.width = c.height = 48; G.drawSigil(c.getContext("2d"), id, { size: 48, glow: 0 });
    let ink = 0; const px = c.getContext("2d").getImageData(0, 0, 48, 48).data; for (let i = 3; i < px.length; i += 4) if (px[i] > 128) ink++;
    const glyph = G.sigilGlyph(id, 12), gn = glyph.m.reduce((a, v) => a + (v ? 1 : 0), 0);
    const gr = G.groundSigil(id, { diameter: 64 }), at = [...gr.at], early = at.filter(a => a <= .3).length, done = at.filter(a => a <= 1).length;
    res.push({ what: `sigil ${id}: vector, 12 px glyph, inside the box, ground draw-on`, good: inside && /<(polyline|circle)/.test(svg) && ink > 40 && gn > 8 && done > 60 && early < done, info: `${strokes.length} strokes, ${ink} px at 48, ${gn} px at 12, ground ${gr.w}x${gr.h}` });
  }
  { const L = G.lightProps(st), all = [...L.campfire, ...Object.values(L.stones), L.pond]; res.push({ what: "light sources: 3 campfire frames, 3 magic stones, a pond with a water mask", good: all.length === 7 && all.every(b => b.w > 4 && b.h > 4) && !!L.pond.mask, info: all.map(b => b.w + "x" + b.h).join(" ") }); }
  for (const A of G.AREAS) {
    const a = G.areaAssets(A.id, st), props = [...a.walls, ...a.small, ...a.big, ...(a.setPiece ? [a.setPiece] : [])];
    res.push({ what: `area ${A.id}: floor, ${props.length} props, creature ${A.creature} exists`, good: a.floor.sp.w > 0 && props.length > 0 && !!G.SPECIES_BY_ID[A.creature] && props.every(p => p.sp.w > 0 && p.sp.h > 0), info: "" });
  }
  return res;
});
for (const r of report) if (!r.good) ok(false, `${r.what} (${r.info})`);
ok(report.every(r => r.good), `${report.length} sprite checks`);
await b.close();
console.log(failed ? `${failed} check(s) failed` : "all checks passed");
process.exit(failed ? 1 : 0);
