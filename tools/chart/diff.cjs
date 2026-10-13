// Two screenshots compared pixel by pixel (the chart before and after a change that should draw it the same): the count that
// differ, the most any channel differs by, and where (their box). Decoded in headless Chromium, as tools/bench/compare.cjs does.
//   node tools/chart/diff.cjs a.png b.png [diff.png]
const fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [A, B, OUT] = process.argv.slice(2);
(async () => {
  const browser = await playwright.chromium.launch(), page = await browser.newPage();
  const r = await page.evaluate(async ({ a, b }) => {
    const load = async s => { const i = new Image(); i.src = "data:image/png;base64," + s; await i.decode(); const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const x = c.getContext("2d"); x.drawImage(i, 0, 0); return { c, x, d: x.getImageData(0, 0, i.width, i.height) }; };
    const P = await load(a), Q = await load(b);
    if (P.c.width !== Q.c.width || P.c.height !== Q.c.height) return { n: -1 };
    const W = P.c.width, out = P.x.createImageData(W, P.c.height);
    let n = 0, most = 0, x0 = W, y0 = P.c.height, x1 = -1, y1 = -1;
    for (let k = 0; k < P.d.data.length; k += 4) {
      const d = Math.max(Math.abs(P.d.data[k] - Q.d.data[k]), Math.abs(P.d.data[k + 1] - Q.d.data[k + 1]), Math.abs(P.d.data[k + 2] - Q.d.data[k + 2]));
      if (d) { n++; most = Math.max(most, d); out.data[k] = 255; out.data[k + 3] = 255; const px = (k >> 2) % W, py = Math.floor((k >> 2) / W); if (px < x0) x0 = px; if (px > x1) x1 = px; if (py < y0) y0 = py; if (py > y1) y1 = py; }
      else { out.data[k] = Q.d.data[k] >> 2; out.data[k + 1] = Q.d.data[k + 1] >> 2; out.data[k + 2] = Q.d.data[k + 2] >> 2; out.data[k + 3] = 255; }
    }
    P.x.putImageData(out, 0, 0);
    return { n, most, total: P.d.data.length / 4, box: [x0, y0, x1, y1], diff: n ? P.c.toDataURL("image/png").split(",")[1] : null };
  }, { a: fs.readFileSync(A).toString("base64"), b: fs.readFileSync(B).toString("base64") });
  await browser.close();
  if (r.n < 0) { console.log("different sizes"); process.exit(1); }
  if (r.diff && OUT) fs.writeFileSync(OUT, Buffer.from(r.diff, "base64"));
  console.log(r.n === 0 ? `same picture (${r.total} pixels)` : `${r.n} of ${r.total} pixels differ (${(100 * r.n / r.total).toFixed(2)}%, most by ${r.most}), within x ${r.box[0]}..${r.box[2]}, y ${r.box[1]}..${r.box[3]}${OUT ? `; see ${path.basename(OUT)}` : ""}`);
  process.exit(r.n === 0 ? 0 : 1);
})().catch(e => { console.error(e); process.exit(1); });
