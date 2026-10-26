// The moon through the telescope (Ed's playtest, v4522: "The moon does not stay the same height in the sky as you move the telescope
// around"; rules/telescope.ts moonInSky, render/view/camera.ts placeTelescope): the built game (DIST, default dist/) at 960×600, seed
// 123, the moon moved on to full (view.moonShift), the telescope aimed at the moon's bearing and panned across it (bearing −6° to +6°)
// and tilted through it (its elevation −8° to +8°), each frame's moon on the screen (the sky's uMoonAt) and a contact strip of the
// frames (top row the pan, bottom the tilt) as <out>/moon-strip.png, the numbers in <out>/moon.json. Fails on a page error.
//   npm run build && node tools/telescope/moon.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/telescope-moon", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const W = 960, H = 600, PAN = [-6, -3, 0, 3, 6], TILT = [-8, -4, 0, 4, 8];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], frames = [], out = { seed, pan: [], tilt: [] };
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 900000, polling: 500 });
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, c]) => { for (let k = 0; k < n; k++) window.witch.frame(c, 1 / 60, k === n - 1); }, [n, C]);
    await page.evaluate(() => { window.witch.manual = true; });
    // The moon full (its phase half way round), and where it stands: its bearing round north (as the telescope places it) and its
    // elevation as the fix puts it (rules/telescope.ts moonInSky; chart.moon.height at the band's top).
    const moon = await page.evaluate(() => {
      const v = window.witch.view, g = window.witch.game, M = g.tuning.moon, T = g.tuning.telescope, f = x => x - Math.floor(x);
      const time = g.clock.time, phase = f(M.phaseStart + time / M.phasePeriod);
      v.moonShift = f(0.5 - phase) * M.phasePeriod;
      const arc = f(M.arcStart + (time + v.moonShift) / M.orbit), x = M.left + (M.right - M.left) * arc, y = M.low + (M.high - M.low) * Math.sqrt(Math.sin(Math.PI * arc));
      const height = g.tuning.chart?.moon?.height ?? 22;
      return { bearing: (((x - 0.5) * T.moonSpread) % 360 + 360) % 360, elevation: height * Math.min(1, Math.max(0, (y - M.low) / (M.high - M.low))) };
    });
    out.moon = moon;
    const shoot = async (heading, elevation) => {
      await page.evaluate(([h, e]) => window.witch.telescope.look(h, 0.35, e), [heading, elevation]);
      await step(20);
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 300000, polling: 1000 }).catch(() => {});
      await step(2);
      const at = await page.evaluate(() => { const u = window.witch.view.sky.u.uMoonAt.value; return { x: u.x, y: u.y }; });
      frames.push((await page.screenshot({ timeout: 300000 })).toString("base64"));
      return { heading, elevation, moonX: +at.x.toFixed(4), moonY: +at.y.toFixed(4) };
    };
    for (const d of PAN) out.pan.push(await shoot(moon.bearing + d, moon.elevation));
    for (const d of TILT) out.tilt.push(await shoot(moon.bearing, moon.elevation + d));
    // The strip: the frames at a third of their size, the pan on top, the tilt below, a line through the middle of each.
    const strip = await page.evaluate(async ([frames, W, H]) => {
      const s = 1 / 3, w = Math.round(W * s), h = Math.round(H * s), c = document.createElement("canvas"); c.width = w * 5 + 4 * 4; c.height = h * 2 + 4;
      const x = c.getContext("2d"); x.fillStyle = "#000"; x.fillRect(0, 0, c.width, c.height);
      for (let i = 0; i < frames.length; i++) {
        const im = new Image(); im.src = "data:image/png;base64," + frames[i]; await im.decode();
        const cx = (i % 5) * (w + 4), cy = Math.floor(i / 5) * (h + 4);
        x.drawImage(im, cx, cy, w, h);
        x.strokeStyle = "rgba(255,80,80,0.5)"; x.beginPath(); x.moveTo(cx, cy + h / 2 + 0.5); x.lineTo(cx + w, cy + h / 2 + 0.5); x.stroke();
      }
      return c.toDataURL("image/png").split(",")[1];
    }, [frames, W, H]);
    fs.writeFileSync(path.join(outDir, "moon-strip.png"), Buffer.from(strip, "base64"));
  } finally { await browser.close(); server.close(); }
  fs.writeFileSync(path.join(outDir, "moon.json"), JSON.stringify({ ...out, errors }, null, 1));
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length) process.exit(1);
})();
