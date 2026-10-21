// Her on foot indoors (Ed, 2026-10-21: "we can give her standing and walking art"): the idle (3 frames) and the walk (6), side-on
// turned towards and away, and heading up the screen (away) and down it (towards), at `scale` (default 4), a row each, labelled.
//   node tools/witch/walk-sheet.mjs <out.png> [scale]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const [out, scale = "4"] = process.argv.slice(2);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async S => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), col = G.witchColours(st);
  const rows = [["side, towards", { facing: "towards" }], ["side, away", { facing: "away" }], ["heading up (away)", { heading: "away" }], ["heading down (towards)", { heading: "towards" }]];
  const poses = [["idle", G.WITCH_FOOT_POSES.idle.frames], ["walk", G.WITCH_FOOT_POSES.walk.frames]];
  const sps = rows.map(([, o]) => poses.flatMap(([pose, n]) => [...Array(n).keys()].map(frame => G.bake(G.witchSprite(st, { ...o, pose, frame }), col, st, st.cOutline))));
  const cw = Math.max(...sps.flat().map(s => s.w)) * S + 8, ch = Math.max(...sps.flat().map(s => s.h)) * S + 8, lw = 220;
  const c = document.createElement("canvas"); c.width = lw + cw * sps[0].length; c.height = 30 + ch * rows.length;
  const g = c.getContext("2d"); g.fillStyle = "#3a2a1e"; g.fillRect(0, 0, c.width, c.height); g.imageSmoothingEnabled = false;
  g.fillStyle = "#f4ecd8"; g.font = "16px monospace";
  let x = lw; for (const [pose, n] of poses) for (let f = 0; f < n; f++) { g.fillText(`${pose} ${f}`, x + 6, 20); x += cw; }
  rows.forEach(([label], r) => { const y0 = 30 + r * ch; g.fillStyle = "#f4ecd8"; g.fillText(label, 8, y0 + ch / 2); sps[r].forEach((s, i) => g.drawImage(s.A, lw + i * cw + (cw - s.w * S) / 2, y0 + ch - 4 - s.h * S, s.w * S, s.h * S)); });
  return c.toDataURL();
}, +scale);
writeFileSync(out, Buffer.from(url.split(",")[1], "base64")); await b.close();
