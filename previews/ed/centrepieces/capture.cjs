// Capture each centrepiece mock's background: the area in the built game at play zoom, its runestone hidden, her a few metres east,
// and where the stone stands on screen and the scale there (screen px per metre east, per metre north on the ground, per metre up).
//   node capture.cjs <dist> <out dir> "<area>:<island>,..."
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [root, outDir, list] = process.argv.slice(2);
const [W, H] = [1280, 720];
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const meta = {};
  for (const item of list.split(",")) {
    const [area, island] = item.split(":");
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => log("page error", e.message));
    const set = encodeURIComponent("runeMarkers.scale=0.001;runeMarkers.beamHeight=0;runeMarkers.laser.opacity=0");
    const base = `http://127.0.0.1:${server.address().port}/?seed=123&island=${island}&cast=0&set=${set}`;
    await page.goto(`${base}&shot=${encodeURIComponent("area:" + area)}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    const spot = await page.evaluate(() => { const g = window.witch.game, w = g.witch, c = g.map.cellSafe(w.x, w.z).cell, s = g.map.soundsystemSpot(c[0], c[1]); return { x: s.x, z: s.z }; });
    // (again, her 7 m east of the stone, so the shot's art is loaded round it)
    await page.goto(`${base}&shot=${encodeURIComponent(`at:${(spot.x + 7).toFixed(2)},${spot.z.toFixed(2)}`)}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000, polling: 200 }).catch(() => {}); }
    await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), `at:${(spot.x + 7).toFixed(2)},${spot.z.toFixed(2)}`);
    const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i === n - 1); }, n);
    for (let round = 0, calm = 0; calm < 2 && round < 40; round++) { await step(10); const p = await page.evaluate(() => window.witch.view.assets.pending); if (p === 0) calm++; else { calm = 0; await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 600000, polling: 500 }); } }
    await step(30);
    const png = path.join(outDir, `${area}.png`);
    await page.screenshot({ path: png });
    const m = await page.evaluate(s => {
      const v = window.witch.view, cam = v.camera, P = cam.projectionMatrix.elements, V = cam.matrixWorldInverse.elements, y0 = v.witchBase.y;
      const proj = (x, y, z) => { const a = [x, y, z, 1], e = [0, 0, 0, 0]; for (let r = 0; r < 4; r++) e[r] = V[r] * a[0] + V[4 + r] * a[1] + V[8 + r] * a[2] + V[12 + r] * a[3]; const c = [0, 0, 0, 0]; for (let r = 0; r < 4; r++) c[r] = P[r] * e[0] + P[4 + r] * e[1] + P[8 + r] * e[2] + P[12 + r] * e[3]; return [(c[0] / c[3] + 1) / 2 * innerWidth, (1 - c[1] / c[3]) / 2 * innerHeight]; };
      const o = proj(s.x, y0, s.z), ex = proj(s.x + 1, y0, s.z), nz = proj(s.x, y0, s.z - 1), up = proj(s.x, y0 + 1, s.z);
      const U = window.witch.view.constructor && null;
      return { at: o, east: [ex[0] - o[0], ex[1] - o[1]], north: [nz[0] - o[0], nz[1] - o[1]], up: [up[0] - o[0], up[1] - o[1]], mpp: v.mpp, px: window.witch.tuning.pixelSize, floor: (() => { const g = window.witch.game, c = g.map.cellSafe(s.x, s.z).cell; return g.map.areaAt(s.x, s.z).type; })() };
    }, spot);
    meta[area] = { island, ...m };
    log(area, JSON.stringify(m));
    await page.close();
  }
  fs.writeFileSync(path.join(outDir, "meta.json"), JSON.stringify(meta, null, 1));
  await browser.close(); server.close();
})().catch(e => { console.error(e.message || e); process.exit(1); });
