// node reanalyse.cjs <fireDir>: recompute measures from saved PNGs (no game page) with the current calc.cjs.
const { chromium } = require('playwright'), fs = require('fs'), path = require('path'), { analyse } = require('./calc.cjs');
(async () => { const b = await chromium.launch(); const dir = process.argv[2]; const out = [];
  for (let i = 0; i < 5; i++) { const d = path.join(dir, `crossing-${i}`), rd = f => fs.readFileSync(path.join(d, f)), fg = JSON.parse(rd('foreground.json'));
    const a = await analyse(b, { off: rd('off.png'), on: rd('on.png'), ret: rd('off-return.png'), vis: rd('off-recheck.png'), hid: rd('off-nowitch.png') }, fg.bodyEnvelope);
    fs.writeFileSync(path.join(d, 'witch-mask.png'), a.png.mask); fs.writeFileSync(path.join(d, 'side-by-side.png'), a.png.sbs);
    fs.writeFileSync(path.join(d, 'diff-on-vs-off-x8.png'), a.png.onX8); fs.writeFileSync(path.join(d, 'diff-return-vs-off-x8.png'), a.png.retX8);
    const m = JSON.parse(rd('measure.json')); Object.assign(m, a.stats); fs.writeFileSync(path.join(d, 'measure.json'), JSON.stringify(m, null, 1));
    out.push({ i, lat: fg.lateral, op: a.stats.opaquePixels, wo: a.stats.witchOpaque, w: a.stats.witch, whole: a.stats.whole }); }
  console.log(JSON.stringify(out)); await b.close(); })();
