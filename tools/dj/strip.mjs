// The witch's DJ frames (art/witch.js, pose "dj"; Ed, 2026-10-06): every frame of every gesture, for our witch and a few
// generated witches (with and without headphones), at scale 5, each over its row's label; under each, the frame's upper
// layer (what's drawn over the decks) tinted, to check the cut.
//   node tools/dj/strip.mjs <out.png> [seeds, e.g. 3,8]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const [out = "previews/dj/frames.png", seeds = "3,8"] = process.argv.slice(2);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async seeds => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), K = 5, P = G.WITCH_FOOT_POSES.dj;
  const mine = { look: G.genomeLook(G.WITCH_GENOME).look, col: G.witchColours(st), name: "her" };
  const rows = [mine, ...seeds.map(s => { const pw = G.partyWitch(s); return { look: pw.look, col: pw.colours(st), name: `witch ${s}${pw.look.phones ? "" : " (no headphones)"}` }; })];
  const gname = f => Object.entries(G.DJ_GESTURES).find(([, fr]) => fr.includes(f))[0];
  const cells = rows.map(r => [...Array(P.frames).keys()].map(frame => { const sp = G.witchSprite(st, { look: r.look, pose: "dj", frame }), up = { ...sp, m: sp.m.map((v, i) => sp.upper[i] ? v : 0), get(x, y) { return x < 0 || y < 0 || x >= sp.w || y >= sp.h ? 0 : this.m[y * sp.w + x]; } };
    return { full: G.bake(sp, r.col, st, st.cOutline), up: G.bake(up, r.col, st, "none") }; }));
  const cw = Math.max(...cells.flat().map(c => c.full.w)) * K + 10, ch = Math.max(...cells.flat().map(c => c.full.h)) * K;
  const W = P.frames * cw + 20, H = rows.length * (ch * 2 + 60) + 20;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#2a2433"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
  rows.forEach((r, j) => { const y0 = 10 + j * (ch * 2 + 60); g.fillStyle = "#f4ecd8"; g.font = "18px monospace"; g.fillText(r.name, 10, y0 + 18);
    cells[j].forEach((cl, f) => { const x = 10 + f * cw; g.fillStyle = "#c9b8ff"; g.font = "13px monospace"; g.fillText(`${f} ${gname(f)}`, x, y0 + 38);
      g.drawImage(cl.full.A, x, y0 + 44 + ch - cl.full.h * K, cl.full.w * K, cl.full.h * K);
      g.fillStyle = "#4a3a20"; g.fillRect(x, y0 + 48 + ch, cl.full.w * K, ch); g.drawImage(cl.up.A, x, y0 + 48 + ch + ch - cl.up.h * K, cl.up.w * K, cl.up.h * K); }); });
  return c.toDataURL();
}, seeds.split(",").map(Number));
writeFileSync(out, Buffer.from(url.split(",")[1], "base64")); await b.close();
console.log("wrote", out);
