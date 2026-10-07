// The knockdown candles (art/treehouse.js candleSprite; Ed, 2026-10-07: a loading bar): every melt level and flicker frame, white
// and red, at scale 8, then the booth as the game layers it along the desk's front at four moments of the wait (all whole, a
// third melted, two thirds, the last guttering out), at scale 4: 6 white (the first knockdown's 6 s, a candle a second), 12 (12 s:
// 6 white, 6 red) and 24 (12 s at a candle a ½ s). The melt: one after another from the right (the red first), each over its share.
//   node tools/dj/candles-sheet.mjs <out.png>
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const [out = "previews/dj/candles.png"] = process.argv.slice(2);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), C = G.CANDLE, tc = G.treehouseColours(st);
  const css = [true, false].map(white => [...Array(C.levels).keys()].map(level => [...Array(C.frames).keys()].map(frame => G.bake(G.candleSprite(st, { level, frame, white }), tc, st, "none")))), cs = css[0];
  const T = G.treehouseSprite(st), house = G.bake(T.bot, tc, st, "none"), fore = G.bake(T.foreFrames[0], tc, st, "none");
  const look = G.genomeLook(G.WITCH_GENOME).look, wsp = G.witchSprite(st, { look, pose: "dj", frame: 4 }), her = G.bake(wsp, G.witchColours(st), st, st.cOutline), gr = wsp.anchors.ground;
  const seat = T.anchors.seat, [L, R] = T.candles, K = 4, cw = 120, ch = 80, cx = Math.round(seat.x - cw / 2), cy = Math.round(seat.y - ch * .7);
  const W = Math.max(C.frames * C.levels * 40, 4 * cw * K + 30), H = 420 + 3 * (ch * K + 30) + 30;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = "#14101c"; g.fillRect(0, 0, W, H);
  g.fillStyle = "#f4ecd8"; g.font = "14px monospace";
  css.forEach((cs, c) => cs.forEach((row, l) => row.forEach((s, f) => { const x = 10 + (l * C.frames + f) * 40, y = 200 + c * 200; if (!c) g.fillText(`L${l} f${f}`, x, 16); g.drawImage(s.A, x, y - s.h * 8, s.w * 8, s.h * 8); })));
  const melt = (n, p) => [...Array(n).keys()].map(i => Math.max(0, Math.min(1, p * n - (n - 1 - i)))); // candle i from the left; the right one first
  [[6, 0, "6 white (6 s, 1 s a candle)"], [12, 6, "6 white, 6 red (12 s)"], [24, 12, "12 white, 12 red (12 s, ½ s a candle)"]].forEach(([n, red, label], row) => [0, .34, .67, .97].forEach((p, k) => {
    const ox = 10 + k * (cw * K + 6), oy = 430 + row * (ch * K + 30), d = (img, x, y) => g.drawImage(img, ox + (x - cx) * K, oy + (y - cy) * K, img.width * K, img.height * K);
    g.save(); g.beginPath(); g.rect(ox, oy, cw * K, ch * K); g.clip();
    d(house.A, 0, 0); d(her.A, Math.round(seat.x - gr[0]), Math.round(seat.y - gr[1])); d(fore.A, T.foreBox.x, T.foreBox.y);
    melt(n, p).forEach((m, i) => { const t = n === 1 ? .5 : i / (n - 1), x = L.x + (R.x - L.x) * t, y = L.y + (R.y - L.y) * t, lv = m >= 1 ? C.levels - 1 : Math.min(C.levels - 2, Math.floor(m * (C.levels - 1))), s = css[n - 1 - i < red ? 1 : 0][lv][(i + k) % C.frames]; d(s.A, Math.round(x - s.w / 2), Math.round(y - s.h)); });
    g.restore(); g.fillStyle = "#f4ecd8"; g.fillText(`${label}, ${Math.round(p * 100)}% of the wait`, ox, oy - 6);
  }));
  return c.toDataURL();
});
writeFileSync(out, Buffer.from(url.split(",")[1], "base64")); await b.close(); console.log("wrote", out);
