// node montage.cjs <out.png> <cols> <crop w> <crop h> <scale> files...: each file's top-left crop, tiled
const fs = require("fs");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const [out, cols, cw, ch, sc, ...files] = process.argv.slice(2);
(async () => {
  const b = await pw.chromium.launch(), p = await b.newPage();
  const d = await p.evaluate(async ({ srcs, cols, cw, ch, sc, labels }) => {
    const W = cw * sc, H = ch * sc, C = document.createElement("canvas"); C.width = W * cols; C.height = H * Math.ceil(srcs.length / cols);
    const g = C.getContext("2d");
    for (let i = 0; i < srcs.length; i++) { const im = new Image(); im.src = srcs[i]; await im.decode(); g.drawImage(im, 0, 0, cw, ch, (i % cols) * W, Math.floor(i / cols) * H, W, H); if (labels[i]) { g.fillStyle = "rgba(0,0,0,0.7)"; g.fillRect((i % cols) * W, Math.floor(i / cols) * H + H - 30, W, 30); g.fillStyle = "#fff"; g.font = "bold 17px monospace"; g.fillText(labels[i], (i % cols) * W + 10, Math.floor(i / cols) * H + H - 9); } }
    return C.toDataURL("image/png");
  }, { srcs: files.map(f => "data:image/png;base64," + fs.readFileSync(f).toString("base64")), cols: +cols, cw: +cw, ch: +ch, sc: +sc, labels: (process.env.LABELS || "").split("|") });
  fs.writeFileSync(out, Buffer.from(d.split(",")[1], "base64")); await b.close();
})();
