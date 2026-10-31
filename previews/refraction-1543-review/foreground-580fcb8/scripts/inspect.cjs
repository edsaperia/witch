// node inspect.cjs <crossingDir> : list each ON-vs-OFF changed pixel inside the opaque mask with OFF/ON/no-witch colours and edge status
const { chromium } = require('playwright'), fs = require('fs'), path = require('path');
(async () => {
  const d = process.argv[2], m = JSON.parse(fs.readFileSync(path.join(d, 'foreground.json'))), box = m.bodyEnvelope;
  const b = await chromium.launch(), pg = await b.newPage(); const enc = {};
  for (const k of ['off', 'on', 'off-nowitch']) enc[k] = fs.readFileSync(path.join(d, k + '.png')).toString('base64');
  const r = await pg.evaluate(async ({ enc, box }) => {
    const load = async s => { const im = await createImageBitmap(await (await fetch('data:image/png;base64,' + s)).blob()); const c = new OffscreenCanvas(im.width, im.height); const x = c.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, im.width, im.height); };
    const O = await load(enc.off), N = await load(enc.on), H = await load(enc['off-nowitch']), W = O.width, Hh = O.height;
    const ch = (A, B, i) => Math.max(...[0, 1, 2].map(k => Math.abs(A.data[i * 4 + k] - B.data[i * 4 + k])));
    const bx0 = Math.floor(box.left * W), bx1 = Math.ceil(box.right * W), by0 = Math.floor((1 - box.top) * Hh), by1 = Math.ceil((1 - box.bottom) * Hh);
    const inM = i => { const x = i % W, y = (i / W) | 0; return x >= bx0 && x <= bx1 && y >= by0 && y <= by1 && ch(O, H, i) >= 24; };
    const rgb = (A, i) => [A.data[i * 4], A.data[i * 4 + 1], A.data[i * 4 + 2]];
    const out = []; let edge = 0, interior = 0;
    for (let i = 0; i < W * Hh; i++) if (inM(i) && ch(O, N, i) > 0) {
      // art texel = 3x3 screen px; interior if the texel ring one art-texel out (±3 px) is all in-mask
      const nb = [-3, 0, 3].flatMap(dy => [-3, 0, 3].map(dx => i + dy * W + dx)); const isEdge = !nb.every(inM); isEdge ? edge++ : interior++;
      out.push({ x: i % W, y: (i / W) | 0, off: rgb(O, i), on: rgb(N, i), noWitch: rgb(H, i), edge: isEdge });
    }
    return { box: [bx0, by0, bx1, by1], edge, interior, px: out };
  }, { enc, box });
  console.log(JSON.stringify({ edge: r.edge, interior: r.interior, box: r.box, sample: r.px.filter((_, i) => i % 3 === 0) }));
  fs.writeFileSync(path.join(d, 'opaque-changes.json'), JSON.stringify(r, null, 1)); await b.close();
})();
