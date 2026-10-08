// The generated soundsystems in play (render/soundsystemGen.ts; Ed, 2026-10-08): the built game (DIST, default dist/) at 1280×720,
// WAVES waves brought on at once (the N key's nextWave), each left to rise; her by each soundsystem in turn, close, on the ground
// (CLOSE=n of them), waiting for its art; then up in the treetops between the first two, zoomed out ZOOM steps, settled and shot.
//   npm run build && node tools/soundsystem/ingame.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/soundsystems", seed = "123"] = process.argv.slice(2), WAVES = +(process.env.WAVES || 4), ZOOM = +(process.env.ZOOM || 3), CLOSE = +(process.env.CLOSE || 4);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    const step = (o, n = 1) => page.evaluate(([o, n]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 30); }, [o, n]);
    await step({ moveX: 0.3 }, 10); // (off her decks)
    for (let k = 0; k < WAVES; k++) { await step({ nextWave: true }); await step({}, 30); }
    // let every soundsystem's art arrive and rise
    for (let i = 0; i < 40; i++) { await step({}, 15); await page.waitForTimeout(500); }
    const areas = await page.evaluate(() => [...window.witch.game.party.areas.values()].filter(a => a.soundsystem).map(a => ({ x: a.soundsystem.x, z: a.soundsystem.z })));
    console.log("soundsystems", areas.length, "drawn", await page.evaluate(() => window.witch.view.partyView.gen?.count));
    for (const [i, a] of areas.slice(0, CLOSE).entries()) {
      await page.evaluate(a => { const g = window.witch.game; g.witch = { ...g.witch, x: a.x, z: a.z + 26, vx: 0, vz: 0 }; }, a);
      // (wait for its art: baked by the art workers once it's in view, ahead of the queue)
      for (let k = 0; k < 120; k++) { await step({}, 6); if (await page.evaluate(() => window.witch.view.partyView.gen?.count > 0)) break; await page.waitForTimeout(1000); }
      await step({}, 90); await page.waitForTimeout(800); await step({}, 2);
      await page.screenshot({ path: path.join(outDir, `close-${i}.png`) });
    }
    await step({ toggleMode: true }); await step({}, 60);
    for (let i = 0; i < ZOOM; i++) { await step({ zoom: 1 }); await step({}, 20); }
    await page.evaluate(areas => { const g = window.witch.game, a = areas[0], b = areas[1] ?? a; g.witch = { ...g.witch, x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 + 30, vx: 0, vz: 0 }; }, areas); // (amid the first two: they're hundreds of metres from the dancefloor)
    for (let k = 0; k < 20; k++) { await step({}, 10); await page.waitForTimeout(1000); } await step({}, 2);
    await page.screenshot({ path: path.join(outDir, "map.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("saved to", outDir);
})().catch(e => { console.error(e); process.exit(1); });
