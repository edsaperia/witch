// node crop.cjs <dir> <out.png> x0 y0 x1 y1 scale : OFF | no-witch | ON | mask | 8x diff (ON-OFF)
const { chromium } = require('playwright'), fs = require('fs'), path = require('path');
(async () => {
  const [d, outp, x0, y0, x1, y1, s] = process.argv.slice(2).map((v, i) => i < 2 ? v : +v);
  const b = await chromium.launch(), pg = await b.newPage(); const enc = {};
  for (const k of ['off', 'off-nowitch', 'on', 'witch-mask', 'diff-on-vs-off-x8']) enc[k] = fs.readFileSync(path.join(d, k + '.png')).toString('base64');
  const ch = JSON.parse(fs.readFileSync(path.join(d, 'opaque-changes.json'))).px.map(p => [p.x, p.y]);
  const png = await pg.evaluate(async ({ enc, x0, y0, x1, y1, s, ch }) => {
    const ims = []; for (const k of ['off', 'off-nowitch', 'on', 'witch-mask', 'diff-on-vs-off-x8']) ims.push(await createImageBitmap(await (await fetch('data:image/png;base64,' + enc[k])).blob()));
    const n = ims.length + 1, w = (x1 - x0) * s, h = (y1 - y0) * s, c = new OffscreenCanvas(w * n + 6 * (n - 1), h + 18), x = c.getContext('2d');
    x.imageSmoothingEnabled = false; x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.fillStyle = '#000'; x.font = '13px sans-serif';
    ['OFF', 'OFF, witch hidden', 'ON', 'opaque mask (magenta)', '|ON-OFF| x8', 'changed opaque px (red) on OFF'].forEach((t, i) => x.fillText(t, i * (w + 6) + 3, 13));
    ims.forEach((im, i) => x.drawImage(im, x0, y0, x1 - x0, y1 - y0, i * (w + 6), 18, w, h));
    const L = ims.length * (w + 6); x.drawImage(ims[0], x0, y0, x1 - x0, y1 - y0, L, 18, w, h); x.fillStyle = '#f00'; for (const [px, py] of ch) if (px >= x0 && px < x1 && py >= y0 && py < y1) x.fillRect(L + (px - x0) * s, 18 + (py - y0) * s, s, s);
    const bl = await c.convertToBlob({ type: 'image/png' }), u = new Uint8Array(await bl.arrayBuffer()); let str = ''; for (let i = 0; i < u.length; i += 32768) str += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(str);
  }, { enc, x0, y0, x1, y1, s, ch });
  fs.writeFileSync(outp, Buffer.from(png, 'base64')); await b.close();
})();
