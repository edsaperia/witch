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
