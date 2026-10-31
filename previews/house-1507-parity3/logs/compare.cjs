// node compare.cjs <dirA> <dirB> <out.json> : decoded-pixel diff of every PNG, field diff of every JSON
const fs = require("fs"), path = require("path"), pw = require("/opt/node22/lib/node_modules/playwright");
const [A, B, out] = process.argv.slice(2);
const walk = (d, p = "") => fs.existsSync(d) ? fs.readdirSync(path.join(d, p), { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(d, path.join(p, e.name)) : [path.join(p, e.name)]) : [];
const flat = (o, p = "", r = {}) => { if (o && typeof o === "object") { for (const k of Object.keys(o)) flat(o[k], p ? `${p}.${k}` : k, r); if (!Object.keys(o).length) r[p] = JSON.stringify(o); } else r[p] = o; return r; };
(async () => {
  const fa = new Set(walk(A)), fb = new Set(walk(B)), all = [...new Set([...fa, ...fb])].sort();
  const browser = await pw.chromium.launch(); const page = await browser.newPage();
  const res = { pngs: [], json: [], oneSided: [] };
  for (const f of all) {
    if (!fa.has(f) || !fb.has(f)) { res.oneSided.push({ file: f, only: fa.has(f) ? "A" : "B" }); continue; }
    if (f.endsWith(".png")) {
      const [a, b] = [A, B].map(d => fs.readFileSync(path.join(d, f)).toString("base64"));
      const r = await page.evaluate(async ([a, b]) => {
        const dec = async s => { const bm = await createImageBitmap(await (await fetch("data:image/png;base64," + s)).blob()); const c = new OffscreenCanvas(bm.width, bm.height), x = c.getContext("2d"); x.drawImage(bm, 0, 0); return { w: bm.width, h: bm.height, d: x.getImageData(0, 0, bm.width, bm.height).data }; };
        const p = await dec(a), q = await dec(b);
        if (p.w !== q.w || p.h !== q.h) return { sizeMismatch: `${p.w}x${p.h} vs ${q.w}x${q.h}` };
        let n = 0, mx = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
        for (let i = 0; i < p.d.length; i += 4) { let m = 0; for (let k = 0; k < 4; k++) m = Math.max(m, Math.abs(p.d[i + k] - q.d[i + k])); if (m) { n++; mx = Math.max(mx, m); const px = (i / 4) % p.w, py = Math.floor(i / 4 / p.w); x0 = Math.min(x0, px); y0 = Math.min(y0, py); x1 = Math.max(x1, px); y1 = Math.max(y1, py); } }
        return { size: `${p.w}x${p.h}`, diff: n, max: mx, bbox: n ? [x0, y0, x1, y1] : null };
      }, [a, b]);
      res.pngs.push({ file: f, identical: !r.sizeMismatch && r.diff === 0, ...r });
    } else if (f.endsWith(".json")) {
      let ja, jb; try { ja = flat(JSON.parse(fs.readFileSync(path.join(A, f)))); jb = flat(JSON.parse(fs.readFileSync(path.join(B, f)))); } catch (e) { res.json.push({ file: f, error: e.message }); continue; }
      const diffs = [...new Set([...Object.keys(ja), ...Object.keys(jb)])].filter(k => JSON.stringify(ja[k]) !== JSON.stringify(jb[k])).map(k => ({ field: k, a: ja[k], b: jb[k] }));
      res.json.push({ file: f, identical: !diffs.length, diffs });
    }
  }
  await browser.close(); fs.writeFileSync(out, JSON.stringify(res, null, 2));
  console.log(`pngs ${res.pngs.length} identical ${res.pngs.filter(p => p.identical).length}; json ${res.json.length} identical ${res.json.filter(p => p.identical).length}; one-sided ${res.oneSided.length}`);
})().catch(e => { console.error(e); process.exit(1); });
