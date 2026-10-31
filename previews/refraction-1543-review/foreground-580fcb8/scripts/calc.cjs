// Pixel maths in a browser canvas (no pngjs in the repo). Inputs are PNG Buffers.
async function analyse(browser, imgs, box, amp = 8) {
  const pg = await browser.newPage();
  const enc = {}; for (const k in imgs) enc[k] = imgs[k].toString('base64');
  const r = await pg.evaluate(async ({ enc, box, amp }) => {
    const load = async s => { const im = await createImageBitmap(await (await fetch('data:image/png;base64,' + s)).blob()); const c = new OffscreenCanvas(im.width, im.height); const x = c.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, im.width, im.height); };
    const I = {}; for (const k in enc) I[k] = await load(enc[k]);
    const W = I.off.width, H = I.off.height;
    const chan = (A, B, i) => { let d = 0; for (let k = 0; k < 3; k++) d = Math.max(d, Math.abs(A.data[i * 4 + k] - B.data[i * 4 + k])); return d; };
    // box: normalized bottom-up -> pixels
    const bx0 = Math.floor(box.left * W), bx1 = Math.ceil(box.right * W), by0 = Math.floor((1 - box.top) * H), by1 = Math.ceil((1 - box.bottom) * H);
    const mask = new Uint8Array(W * H), opaque = new Uint8Array(W * H); let maskN = 0, maskOutsideBox = 0, opaqueN = 0;
    for (let i = 0; i < W * H; i++) { const dv = chan(I.vis, I.hid, i); if (dv >= 24) { const x = i % W, y = (i / W) | 0; if (x >= bx0 && x <= bx1 && y >= by0 && y <= by1) { opaque[i] = 1; opaqueN++; } } if (dv > 0) { const x = i % W, y = (i / W) | 0; if (x >= bx0 && x <= bx1 && y >= by0 && y <= by1) { mask[i] = 1; maskN++; } else maskOutsideBox++; } }
    const stats = (A, B, m) => { let n = 0, max = 0, minx = W, miny = H, maxx = -1, maxy = -1, tot = 0;
      for (let i = 0; i < W * H; i++) { if (m && !m[i]) continue; tot++; const d = chan(A, B, i); if (d > 0) { n++; max = Math.max(max, d); const x = i % W, y = (i / W) | 0; minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); } }
      return { pixels: tot, changed: n, maxChannel: max, bounds: n ? [minx, miny, maxx, maxy] : null }; };
    const toB64 = async c => { const bl = await c.convertToBlob({ type: 'image/png' }); const buf = new Uint8Array(await bl.arrayBuffer()); let s = ''; for (let i = 0; i < buf.length; i += 32768) s += String.fromCharCode.apply(null, buf.subarray(i, i + 32768)); return btoa(s); };
    const ampImg = (A, B) => { const o = new ImageData(W, H); for (let i = 0; i < W * H; i++) { for (let k = 0; k < 3; k++) o.data[i * 4 + k] = Math.min(255, Math.abs(A.data[i * 4 + k] - B.data[i * 4 + k]) * amp); o.data[i * 4 + 3] = 255; } return o; };
    const pngOf = async im => { const c = new OffscreenCanvas(W, H); c.getContext('2d').putImageData(im, 0, 0); return toB64(c); };
    const onAmp = ampImg(I.off, I.on), retAmp = ampImg(I.off, I.ret);
    // mask overlay: witch mask in magenta over OFF
    const mo = new ImageData(new Uint8ClampedArray(I.off.data), W, H); for (let i = 0; i < W * H; i++) if (opaque[i]) { mo.data[i * 4] = 255; mo.data[i * 4 + 1] = 0; mo.data[i * 4 + 2] = 255; } else if (mask[i]) { mo.data[i * 4] = Math.min(255, mo.data[i * 4] + 60); mo.data[i * 4 + 2] = Math.min(255, mo.data[i * 4 + 2] + 60); }
    // side by side OFF | ON | diff x8 (cropped around the body box, padded, scaled 3x) plus full-frame strip
    const pad = 60, cx0 = Math.max(0, bx0 - pad), cy0 = Math.max(0, by0 - pad), cx1 = Math.min(W, bx1 + pad), cy1 = Math.min(H, by1 + pad), cw = cx1 - cx0, ch = cy1 - cy0, s = 3;
    const sbs = new OffscreenCanvas(cw * s * 3 + 8, ch * s), sx = sbs.getContext('2d'); sx.imageSmoothingEnabled = false; sx.fillStyle = '#fff'; sx.fillRect(0, 0, sbs.width, sbs.height);
    let j = 0; for (const im of [I.off, I.on, onAmp]) { const c = new OffscreenCanvas(W, H); c.getContext('2d').putImageData(im, 0, 0); sx.drawImage(c, cx0, cy0, cw, ch, j * (cw * s + 4), 0, cw * s, ch * s); j++; }
    return { W, H, boxPx: [bx0, by0, bx1, by1], maskPixels: maskN, maskPixelsOutsideBox: maskOutsideBox,
      whole: { onVsOff: stats(I.off, I.on), retVsOff: stats(I.off, I.ret), recheckVsOff: stats(I.off, I.vis) },
      witch: { onVsOff: stats(I.off, I.on, mask), retVsOff: stats(I.off, I.ret, mask) }, opaquePixels: opaqueN,
      witchOpaque: { onVsOff: stats(I.off, I.on, opaque), retVsOff: stats(I.off, I.ret, opaque) },
      png: { onX8: await pngOf(onAmp), retX8: await pngOf(retAmp), mask: await pngOf(mo), sbs: await toB64(sbs) }, crop: [cx0, cy0, cx1, cy1] };
  }, { enc, box, amp });
  await pg.close(); const png = {}; for (const k in r.png) png[k] = Buffer.from(r.png[k], 'base64'); delete r.png; return { stats: r, png };
}
module.exports = { analyse };
