// The west coast's kraken (art/kraken.js; Ed, 2026-10-07): every tentacle and head frame on a night sea with a moon road, at
// scale 3, then a scene at game scale (px 5 shows it bigger still): three tentacles at different frames round its head.
//   node tools/beach/kraken-sheet.mjs <out.png>
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const [out = "previews/kraken.png"] = process.argv.slice(2);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), K = G.KRAKEN, col = G.krakenColours();
  const ten = [...Array(K.frames).keys()].map(frame => { const sp = G.krakenTentacle(st, { frame }); return { sp, b: G.bake(sp, col, st, st.cOutline) }; });
  const head = [...Array(K.headFrames).keys()].map(frame => { const sp = G.krakenHead(st, { frame }); return { sp, b: G.bake(sp, col, st, st.cOutline) }; });
  const W = 1500, H = 900, c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
  const sky = g.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "#0b1424"); sky.addColorStop(1, "#16304a"); g.fillStyle = sky; g.fillRect(0, 0, W, H);
  const road = (x, y, w) => { g.fillStyle = "rgba(220,230,255,0.18)"; g.fillRect(x - w / 2, y, w, H - y); }; // the moon road
  g.fillStyle = "#f4ecd8"; g.font = "14px monospace";
  const water = 420; g.fillStyle = "#1d3b55"; g.fillRect(0, water, W, H - water); road(W / 2, water, 300);
  let x = 10; ten.forEach(({ sp, b }, i) => { g.fillStyle = "#f4ecd8"; g.fillText(`tentacle ${i}`, x, 18); g.drawImage(b.A, x, water - sp.h * 3, b.w * 3, b.h * 3); x += b.w * 3 + 6; });
  x = 10; head.forEach(({ sp, b }, i) => { g.fillStyle = "#f4ecd8"; g.fillText(`head ${i}`, x, 460); g.drawImage(b.A, x, 640 - sp.h * 3, b.w * 3, b.h * 3); x += b.w * 3 + 10; });
  return c.toDataURL();
});
writeFileSync(out, Buffer.from(url.split(",")[1], "base64")); await b.close(); console.log("wrote", out);
