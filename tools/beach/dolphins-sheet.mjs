// The east coast's dolphins (art/dolphins.js; Ed, 2026-10-07): every leap frame and splash frame at scale 8 on a night sea, then
// a leap's arc laid out at game scale (scale 5, as px 5 shows it): splash, the frames along the arc, splash.
//   node tools/beach/dolphins-sheet.mjs <out.png>
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const [out = "previews/dolphins.png"] = process.argv.slice(2);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), D = G.DOLPHIN, col = G.dolphinColours();
  const fr = [...Array(D.frames).keys()].map(frame => { const sp = G.dolphinSprite(st, { frame }); return { sp, b: G.bake(sp, col, st, st.cOutline) }; });
  const sx = [...Array(D.splashFrames).keys()].map(frame => { const sp = G.dolphinSplash(st, { frame }); return { sp, b: G.bake(sp, col, st, "none") }; });
  const W = 1400, H = 700, c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
  const sea = g.createLinearGradient(0, 0, 0, H); sea.addColorStop(0, "#0d1a2e"); sea.addColorStop(1, "#173248"); g.fillStyle = sea; g.fillRect(0, 0, W, H);
  g.fillStyle = "#f4ecd8"; g.font = "14px monospace";
  let x = 10; fr.forEach(({ b }, i) => { g.fillText(`leap ${i}`, x, 18); g.drawImage(b.A, x, 30, b.w * 6, b.h * 6); x += b.w * 6 + 10; });
  x = 10; sx.forEach(({ b }, i) => { g.fillText(`splash ${i}`, x, 300); g.drawImage(b.A, x, 310, b.w * 6, b.h * 6); x += b.w * 6 + 20; });
  // the arc at game scale (5): 4 m along, 2.5 m up, the water line at y 640
  const K = 5, ppm = 16 * 2 / 3, water = 640; g.fillStyle = "#2a5470"; g.fillRect(0, water, W, 2);
  const at = t => ({ x: 600 + (t - .5) * 4 * ppm * K, y: water - Math.sin(t * Math.PI) * 2.5 * ppm * K });
  [0, .5, 1].forEach((t, k) => { const s = sx[k === 1 ? 0 : 2]; if (k === 1) return; const p = at(t); g.drawImage(s.b.A, p.x - s.sp.origin.x * K, p.y - s.sp.origin.y * K, s.b.w * K, s.b.h * K); });
  fr.forEach(({ sp, b }, i) => { const p = at((i + .5) / D.frames); g.globalAlpha = .9; g.drawImage(b.A, p.x - sp.origin.x * K, p.y - sp.origin.y * K, b.w * K, b.h * K); g.globalAlpha = 1; });
  g.fillStyle = "#f4ecd8"; g.fillText("a leap at game scale (px 5), frames along the arc", 10, 470);
  return c.toDataURL();
});
writeFileSync(out, Buffer.from(url.split(",")[1], "base64")); await b.close(); console.log("wrote", out);
