// The rainbow wave in the built game (Ed, 2026-10-29; rules/rainbow.ts, render/leash/rainbow.ts): from by home on an island, a wave
// set off as an early clear would send it (g.rainbows), shot a few times as it runs out along the ley line, the line it passes over
// shown and fading behind it.
//   npm run build && node tools/rainbow/shots.cjs [out dir]   (ISLAND=fox, SEED=123, SIZE=1280x720, AT="x,z" where she stands, TIMES="1,2.5,4")
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const outDir = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/rainbow"));
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), TIMES = (process.env.TIMES || "1,2.5,4").split(",").map(Number);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    const base = `http://127.0.0.1:${server.address().port}/?seed=${process.env.SEED || 123}&island=${process.env.ISLAND || "fox"}`;
    // (by default out on the ground west of the dancefloor, by the route's first stretch on seed 123 (AT= for another): read off a first load, then loaded there,
    // so the shot loads the art round it)
    let scene = process.env.AT ? `at:${process.env.AT}` : "";
    if (!scene) {
      await page.goto(`${base}&shot=${encodeURIComponent("object:mapTable")}`);
      await page.waitForFunction(() => window.witch && window.witch.game, null, { timeout: 600000, polling: 500 });
      scene = await page.evaluate(() => { const d = window.witch.game.map.dancefloor; return `at:${(d.x - 35).toFixed(1)},${(d.z + 20).toFixed(1)}`; });
    }
    await page.goto(`${base}&shot=${encodeURIComponent(scene)}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000, polling: 200 }).catch(() => {}); }
    const said = await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), scene);
    log("scene:", said.say);
    const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i === n - 1); }, n);
    for (let round = 0, calm = 0; calm < 2 && round < 40; round++) { await step(10); const p = await page.evaluate(() => window.witch.view.assets.pending); if (p === 0) calm++; else { calm = 0; await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 600000, polling: 500 }); } }
    await page.evaluate(() => { const g = window.witch.game; g.rainbows = [g.clock.time]; });
    let at = 0;
    for (const s of TIMES) {
      await step(Math.max(1, Math.round((s - at) * 60))); at = s;
      log(await page.evaluate(() => { const g = window.witch.game; return `clock ${g.clock.time.toFixed(2)} paused ${g.clock.paused} rainbows ${JSON.stringify(g.rainbows)} her ${g.witch.x.toFixed(0)},${g.witch.z.toFixed(0)}`; }));
      const f = path.join(outDir, `rainbow-${s}s.png`);
      await page.screenshot({ path: f, timeout: 300000 });
      log("saved", path.relative(process.cwd(), f));
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e.message || e); process.exit(1); });
