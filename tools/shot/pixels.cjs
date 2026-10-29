// How crisp the pixel art reaches the screen (Ed, 2026-10-29: "The pixel art sometimes just reads as blurry rather than stylised",
// "the pixels are just hard to read"; his machine: 1344x840 @1.25, window 1106x743, canvas 369x248 at pixel size 3). From the built
// game on the playtest's island with four sigils in her stack, at each device pixel ratio (DPR), tilt-shift on and off:
//   buffer  the drawing buffer as drawn (read back): blend, the share of its strong edges (a jump of 60 or more, summed over rgb, from
//           a pixel's left to its right neighbour) whose middle pixel is in between the two, not one or the other: smoothing inside
//           the render (the tilt-shift's blur, the bloom, half-resolution layers), before the browser scales it up
//   screen  the page as the screen shows it (device pixels): the share of runs of one colour across a row by length (crisp art at a
//           whole scale has runs of whole multiples of it; at 3.75 device pixels per canvas pixel they come out 3 and 4), and blend
//   per    device pixels per canvas pixel across (the canvas's css width times the DPR over its pixels)
// Each over the middle of the screen (her and her stack) and the whole. LOOK=before draws it as it was before the snap (?snap=0, the
// tilt-shift at its old 1.5 and 3); after (the default) as the build has it. Frames <out>/pixels-<look>-<dpr>-<tilt>.png, numbers
// <out>/pixels-<look>.json.
//   npm run build && node tools/shot/pixels.cjs [out dir]   (SEED=542195, LINK= more of the link, SIZE=1106x743, DPRS=1,1.25,1.5,
//   TILTS=on,off, LOOK=after|before, PX= pixel size, DIST=dist)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/shot/pixels"));
const SEED = process.env.SEED || "542195", [W, H] = (process.env.SIZE || "1106x743").split("x").map(Number);
const LINK = process.env.LINK ?? "world=1268398697&island=ibex&found=squirrel,hedgehog&hat=none&creator=0";
const LOOK = process.env.LOOK || "after", DPRS = (process.env.DPRS || "1,1.25,1.5").split(",").map(Number), TILTS = (process.env.TILTS || "on,off").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

// runs and blend over rgba pixels (w x h), within a box (fractions of the frame)
function stats(d, w, h, box = [0, 0, 1, 1]) {
  const x0 = Math.floor(box[0] * w), y0 = Math.floor(box[1] * h), x1 = Math.ceil(box[2] * w), y1 = Math.ceil(box[3] * h);
  const at = (x, y) => (y * w + x) * 4, diff = (i, j) => Math.abs(d[i] - d[j]) + Math.abs(d[i + 1] - d[j + 1]) + Math.abs(d[i + 2] - d[j + 2]);
  const runs = {}; let edges = 0, between = 0, nRuns = 0;
  for (let y = y0; y < y1; y++) {
    let n = 1;
    for (let x = x0 + 1; x < x1; x++) { if (diff(at(x - 1, y), at(x, y)) <= 6) n++; else { runs[n] = (runs[n] || 0) + 1; nRuns++; n = 1; } }
    runs[n] = (runs[n] || 0) + 1; nRuns++;
    for (let x = x0 + 1; x < x1 - 1; x++) {
      const l = at(x - 1, y), m = at(x, y), r = at(x + 1, y);
      if (diff(l, r) < 60) continue;
      edges++;
      if (diff(m, l) > 6 && diff(m, r) > 6) { let k = 0, best = -1; for (let c = 0; c < 3; c++) { const s = Math.abs(d[l + c] - d[r + c]); if (s > best) { best = s; k = c; } }
        const lo = Math.min(d[l + k], d[r + k]), hi = Math.max(d[l + k], d[r + k]); if (d[m + k] > lo + 8 && d[m + k] < hi - 8) between++; }
    }
  }
  const share = {}; for (const [k, v] of Object.entries(runs).sort((a, b) => b[1] - a[1]).slice(0, 6)) share[k] = +(v / nRuns).toFixed(2);
  return { blend: +(between / Math.max(1, edges)).toFixed(3), edges, runs: share };
}

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], result = {};
  try {
    for (const dpr of DPRS) for (const tilt of TILTS) {
      const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: dpr });
      const page = await ctx.newPage();
      page.on("pageerror", e => errors.push(e.message));
      // (LOOK=before: as before #pixel-snap, the pixels unsnapped and the tilt-shift at its old strength, 1.5 and 3 over the treetops)
      await page.goto(`http://127.0.0.1:${server.address().port}/?shot=at:4060,4621&seed=${SEED}&${LINK}${tilt === "off" ? "&tilt=off" : ""}${LOOK === "before" ? "&snap=0" : ""}${process.env.PX ? `&px=${process.env.PX}` : ""}`);
      if (LOOK === "before") await page.waitForFunction(() => window.witch && window.witch.tuning, null, { timeout: 900000, polling: 200 }).then(() => page.evaluate(() => { const T = window.witch.tuning.tiltShift; T.strength = 1.5; T.treetop.strength = 3; }));
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
      await page.evaluate(() => { window.witch.manual = true; });
      if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
      const said = await page.evaluate(() => window.witch.lastShot ?? window.witch.shot("at:4060,4621"));
      if (!said.ok) throw new Error(said.say);
      const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i === n - 1 || i % 6 === 5); }, n);
      // four sigils in her stack (the hardest to read, Ed's screenshot)
      await page.evaluate(() => { const g = window.witch.game, b = g.witches[0].body, cs = g.creatures.filter(c => !c.gone && !c.leashed).sort((p, q) => Math.hypot(p.x - b.x, p.z - b.z) - Math.hypot(q.x - b.x, q.z - b.z)).slice(0, 4);
        cs.forEach((c, i) => { c.leashed = true; c.level = i % 4; }); g.leash.stack = cs.map(c => c.id); });
      for (let round = 0, calm = 0; calm < 2 && round < 60; round++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) calm++; else { calm = 0; await page.waitForTimeout(1500); } }
      await step(30);
      const buf = await page.evaluate(() => {
        const w = window.witch, gl = w.view.renderer.getContext(), cw = gl.drawingBufferWidth, ch = gl.drawingBufferHeight, px = new Uint8Array(cw * ch * 4);
        w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true);
        gl.readPixels(0, 0, cw, ch, gl.RGBA, gl.UNSIGNED_BYTE, px);
        const c = w.view.renderer.domElement, r = c.getBoundingClientRect();
        // (readPixels is bottom-up: flipped so rows run top-down as the screen's do)
        const flip = new Uint8Array(px.length); for (let y = 0; y < ch; y++) flip.set(px.subarray((ch - 1 - y) * cw * 4, (ch - y) * cw * 4), y * cw * 4);
        return { cw, ch, cssW: r.width, cssH: r.height, dpr: devicePixelRatio, px: Array.from(flip) };
      });
      const shotFile = path.join(out, `pixels-${LOOK}-${dpr}-${tilt}.png`);
      await page.screenshot({ path: shotFile, timeout: 300000 });
      // the screenshot, decoded in the page (device pixels)
      const scr = await page.evaluate(async src => { const im = new Image(); im.src = src; await im.decode(); const c = document.createElement("canvas"); c.width = im.width; c.height = im.height; const x = c.getContext("2d"); x.drawImage(im, 0, 0); return { w: im.width, h: im.height, px: Array.from(x.getImageData(0, 0, im.width, im.height).data) }; }, "data:image/png;base64," + fs.readFileSync(shotFile).toString("base64"));
      const MID = [0.4, 0.2, 0.6, 0.6]; // (her and the stack over her hat)
      const per = buf.cssW * buf.dpr / buf.cw;
      result[`${dpr}-${tilt}`] = { canvas: `${buf.cw}x${buf.ch}`, css: `${buf.cssW}x${buf.cssH}`, per: +per.toFixed(3),
        buffer: { mid: stats(buf.px, buf.cw, buf.ch, MID), all: stats(buf.px, buf.cw, buf.ch) },
        screen: { size: `${scr.w}x${scr.h}`, mid: stats(scr.px, scr.w, scr.h, MID), all: stats(scr.px, scr.w, scr.h) } };
      log(dpr, tilt, JSON.stringify(result[`${dpr}-${tilt}`]));
      await ctx.close();
    }
    fs.writeFileSync(path.join(out, `pixels-${LOOK}.json`), JSON.stringify({ seed: SEED, size: `${W}x${H}`, result }, null, 2));
  } finally { await browser.close(); server.close(); }
  console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
