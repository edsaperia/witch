// Waking in her nightie (Ed, 2026-10-23: "When waking up she wears only a nightie; last night's clothes are in a pile on the floor
// (pick all up with x/e)"): her wake-up and on-foot poses in the nightie (sitting up in bed, the stretch, standing, walking, and up
// and down the screen), last night's clothes in their pile (her outfit's own colours), and her dressed as the pile puts her, at
// `scale` (default 4), a row each, labelled.
//   node tools/witch/nightie-sheet.mjs <out.png> [scale]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const [out, scale = "4"] = process.argv.slice(2);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async S => {
  const G = await import("/art/generator.js"), WG = await import("/art/witchGenome.js"), st = G.defaultStyle();
  const { look } = WG.genomeLook(WG.WITCH_GENOME), N = { ...look, nightie: true, hat: "none", phones: false };
  const dressedCol = G.witchColours(st), nightCol = dressedCol; // (the nightie white, trimmed in her own colours)
  const one = (o, L, col) => G.bake(G.witchSprite(st, { ...o, look: L }), col, st, st.cOutline);
  const rows = [
    ["nightie: in bed, the stretch", [["sit", 0], ["sit", 1], ["liftSigil", 0], ["liftSigil", 1], ["liftSigil", 2]].map(([pose, frame]) => one({ pose, frame }, N, nightCol))],
    ["nightie: up, walking", [["idle", 0], ["idle", 1], ["walk", 0], ["walk", 1], ["walk", 2], ["walk", 3]].map(([pose, frame]) => one({ pose, frame }, N, nightCol))],
    ["nightie: away, towards", [["idle", 0, "away"], ["walk", 1, "away"], ["idle", 0, "towards"], ["walk", 1, "towards"]].map(([pose, frame, heading]) => one({ pose, frame, heading }, N, nightCol))],
    ["last night's clothes", [G.bake(G.clothesPileSprite(st, { look }), dressedCol, st, st.cOutline), G.bake(G.clothesPileSprite(st, { look, facing: "away" }), dressedCol, st, st.cOutline)]],
    ["dressed (E at the pile)", [["liftSigil", 1], ["idle", 0], ["walk", 1], ["walk", 3]].map(([pose, frame]) => one({ pose, frame }, look, dressedCol))],
  ];
  const all = rows.flatMap(r => r[1]), cw = Math.max(...all.map(s => s.w)) * S + 10, ch = Math.max(...all.map(s => s.h)) * S + 10, lw = 300, cols = Math.max(...rows.map(r => r[1].length));
  const c = document.createElement("canvas"); c.width = lw + cw * cols; c.height = ch * rows.length;
  const g = c.getContext("2d"); g.fillStyle = "#3a2a1e"; g.fillRect(0, 0, c.width, c.height); g.imageSmoothingEnabled = false;
  g.font = "18px monospace";
  rows.forEach(([label, sps], r) => { const y0 = r * ch; g.fillStyle = "#f4ecd8"; g.fillText(label, 10, y0 + ch / 2); sps.forEach((s, i) => g.drawImage(s.A, lw + i * cw + (cw - s.w * S) / 2, y0 + ch - 5 - s.h * S, s.w * S, s.h * S)); });
  return c.toDataURL();
}, +scale);
writeFileSync(out, Buffer.from(url.split(",")[1], "base64")); await b.close();
