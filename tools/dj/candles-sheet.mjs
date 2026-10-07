// The knockdown candles (art/treehouse.js candleSprite; Ed, 2026-10-07): every melt level and flicker frame at scale 8, then the
// booth as the game layers it with 3 and 6 candles along the desk's front at four moments of the wait (all whole, a third
// melted, two thirds, the last guttering out), at scale 4. The melt: one after another from the right, each over its share.
//   node tools/dj/candles-sheet.mjs <out.png>
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const [out = "previews/dj/candles.png"] = process.argv.slice(2);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), C = G.CANDLE, tc = G.treehouseColours(st);
  const cs = [...Array(C.levels).keys()].map(level => [...Array(C.frames).keys()].map(frame => G.bake(G.candleSprite(st, { level, frame }), tc, st, st.cOutline)));
  const T = G.treehouseSprite(st), house = G.bake(T.bot, tc, st, "none"), fore = G.bake(T.foreFrames[0], tc, st, "none");
  const look = G.genomeLook(G.WITCH_GENOME).look, wsp = G.witchSprite(st, { look, pose: "dj", frame: 4 }), her = G.bake(wsp, G.witchColours(st), st, st.cOutline), gr = wsp.anchors.ground;
  const seat = T.anchors.seat, [L, R] = T.candles, K = 4, cw = 120, ch = 80, cx = Math.round(seat.x - cw / 2), cy = Math.round(seat.y - ch * .7);
  const W = Math.max(C.frames * C.levels * 70, 4 * cw * K + 30), H = 220 + 2 * ch * K + 60;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = "#14101c"; g.fillRect(0, 0, W, H);
  g.fillStyle = "#f4ecd8"; g.font = "14px monospace";
  cs.forEach((row, l) => row.forEach((s, f) => { const x = 10 + (l * C.frames + f) * 70; g.fillText(`L${l} f${f}`, x, 16); g.drawImage(s.A, x, 200 - s.h * 8, s.w * 8, s.h * 8); }));
  const melt = (n, p) => [...Array(n).keys()].map(i => Math.max(0, Math.min(1, p * n - (n - 1 - i)))); // candle i from the left; the right one first
  [[3, "3 candles (6 s)"], [6, "6 candles (12 s)"]].forEach(([n, label], row) => [0, .34, .67, .97].forEach((p, k) => {
    const ox = 10 + k * (cw * K + 6), oy = 230 + row * (ch * K + 30), d = (img, x, y) => g.drawImage(img, ox + (x - cx) * K, oy + (y - cy) * K, img.width * K, img.height * K);
    g.save(); g.beginPath(); g.rect(ox, oy, cw * K, ch * K); g.clip();
    d(house.A, 0, 0); d(her.A, Math.round(seat.x - gr[0]), Math.round(seat.y - gr[1])); d(fore.A, T.foreBox.x, T.foreBox.y);
    melt(n, p).forEach((m, i) => { const t = n === 1 ? .5 : i / (n - 1), x = L.x + (R.x - L.x) * t, y = L.y + (R.y - L.y) * t, lv = m >= 1 ? C.levels - 1 : Math.min(C.levels - 2, Math.floor(m * (C.levels - 1))), s = cs[lv][(i + k) % C.frames]; d(s.A, Math.round(x - s.w / 2), Math.round(y - s.h)); });
    g.restore(); g.fillStyle = "#f4ecd8"; g.fillText(`${label}, ${Math.round(p * 100)}% of the wait`, ox, oy - 6);
  }));
  return c.toDataURL();
});
writeFileSync(out, Buffer.from(url.split(",")[1], "base64")); await b.close(); console.log("wrote", out);
