// The telescope (rules/telescope.ts, app/telescope.ts, render/view/camera.ts placeTelescope): the built game (DIST, default dist/)
// at 1280×800, seed 123 after three waves, stepped at a fixed 1/60 s. The game's own view first, then through the telescope at
// each bearing (N, E, S, W wide) and zoomed in (N and S close), each shot the whole page (its vignette and readout) as
// <out>/<name>.png, with the frame's cost: the view's own ms (window.witch.frame's render, by part), its draw calls and triangles,
// over 60 frames. RES=0.5 draws the telescope at half resolution (as on an integrated GPU: ?telescopeRes=0.5). Fails on a page error.
//   npm run build && node tools/telescope/shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/telescope", seed = "123"] = process.argv.slice(2), res = process.env.RES;
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const SHOTS = [
  { name: "n-wide", heading: 0, zoom: 0 }, { name: "e-wide", heading: 90, zoom: 0 }, { name: "s-wide", heading: 180, zoom: 0 },
  { name: "w-wide", heading: 270, zoom: 0 }, { name: "n-zoom", heading: 0, zoom: 0.7 }, { name: "s-zoom", heading: 180, zoom: 0.55 },
];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = { seed, res: res ?? "auto", shots: [] };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0${res ? `&telescopeRes=${res}` : ""}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 900000, polling: 500 });
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, c]) => { for (let k = 0; k < n; k++) window.witch.frame(c, 1 / 60, k === n - 1); }, [n, C]);
    await page.evaluate(() => { window.witch.manual = true; });
    for (let w = 0; w < 3; w++) { await page.evaluate(c => window.witch.frame({ ...c, nextWave: true }, 1 / 60, true), C); await step(240); }
    await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 1000 }).catch(() => {});
    // Every frame drawn, 60 of them: the view's ms (its own parts) and the GPU's work (draw calls, triangles) on the last.
    const cost = () => page.evaluate(c => {
      let ms = 0; const parts = {};
      for (let k = 0; k < 60; k++) { const r = window.witch.frame(c, 1 / 60, true); ms += r.render; for (const [p, v] of Object.entries(r.ms || {})) parts[p] = (parts[p] || 0) + v / 60; }
      const i = window.witch.view.renderer.info.render, v = window.witch.view;
      return { renderMs: Math.round((ms / 60) * 10) / 10, calls: i.calls, triangles: i.triangles, picture: `${v.width}×${v.height}`, top: Object.entries(parts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([p, v]) => `${p} ${v.toFixed(1)}`) };
    }, C);
    await step(30);
    out.game = await cost();
    await page.screenshot({ path: path.join(outDir, "game-view.png"), timeout: 300000 });
    for (const s of SHOTS) {
      await page.evaluate(s => window.witch.telescope.look(s.heading, s.zoom), s);
      await step(90); // (the crowns' reach easing out to the island's far side)
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 300000, polling: 1000 }).catch(() => {});
      await step(4);
      out.shots.push({ ...s, ...(await cost()) });
      await page.screenshot({ path: path.join(outDir, `${s.name}.png`), timeout: 300000 });
    }
    await page.evaluate(() => window.witch.telescope.close());
    await step(30);
    out.after = await page.evaluate(() => ({ on: window.witch.telescope.on, right: window.witch.spriteRight(), picture: `${window.witch.view.width}×${window.witch.view.height}`, far: window.witch.view.camera.far }));
  } finally { await browser.close(); server.close(); }
  fs.writeFileSync(path.join(outDir, "shots.json"), JSON.stringify({ ...out, errors }, null, 1));
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length) process.exit(1);
})();
