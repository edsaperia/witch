// Backgrounds for the station-menus mock: real game frames at the stations. node bg.cjs <dist> <outdir>
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [dist, out] = process.argv.slice(2);
const root = path.resolve(dist);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".ogg": "audio/ogg", ".woff2": "font/woff2" };
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on("pageerror", e => console.log("pageerror", e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?seed=123&creator=0`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
  for (let i = 0; i < 100 && !(await page.evaluate(() => window.witch.game.clock.time > 1)); i++) { await page.keyboard.press("Enter"); await page.waitForTimeout(3000); }
  await page.addStyleTag({ content: "#creator{display:none!important}" });
  const put = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, h = g.map.treehouse, W = g.witches[0]; W.body = { ...W.body, x: h.x + x, z: h.z + z, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0, seated: false }; }, [x, z]);
  const zoom = (k) => page.evaluate(k => { const t = window.witch.tuning; t.camera.house.distance = k; window.witch.game.camera.zoomStep = 0; }, k);
  const settle = async (ms) => { const t0 = await page.evaluate(() => performance.now()); await page.waitForFunction(t => performance.now() > t, t0 + ms, { timeout: 600000, polling: 300 }); };
  const walk = async (key, ms) => { await page.keyboard.down(key); await settle(ms); await page.keyboard.up(key); };
  const shot = async (name) => { await page.screenshot({ path: path.join(out, name + ".png"), timeout: 300000 }); console.log(name); };
  const only = (process.env.ONLY || "").split(",").filter(Boolean), want = n => !only.length || only.includes(n);
  // The wardrobe (17, -4.4), its front at z -4.1.
  if (want("wide")) {
    await zoom(.62); await put(19.9, 1.6); await settle(12000); await walk("KeyW", 250); await settle(6000); await shot("wardrobe-walkup");
    await put(17, -3.4); await walk("KeyW", 120); await settle(8000); await shot("wardrobe-at");
  }
  const face = (h) => page.evaluate(h => { const g = window.witch.game, W = g.witches[0]; W.body = { ...W.body, heading: h, away: h === "away" }; g.clock.paused = true; }, h);
  const go = () => page.evaluate(() => { window.witch.game.clock.paused = false; });
  const Z = +(process.env.Z || .48);
  const at = async (name, x, z, h) => { await go(); await zoom(Z); await put(x, z); await settle(12000); await face(h); await settle(5000); await shot(name); };
  if (want("zoom")) { await at("wardrobe-zoom-back", 17, -3.4, "away"); await at("wardrobe-zoom-front", 17, -3.4, "towards"); }
  if (want("table")) await at("table-zoom-front", 14.3, -13.2, "towards");
  if (want("broom")) await at("broom-zoom-front", -13.6, 2.1, "towards");
  if (want("mirror")) await at("mirror-zoom-front", 13.4, -3.2, "towards");
  if (want("hats")) await at("hats-zoom", 17, -0.4, "towards");
  if (want("seq")) {
    await go(); await zoom(Z); await put(17, -3.4); await settle(8000);
    console.log("docked", await page.evaluate(() => window.__creator && window.__creator.docked));
    console.log("clicked", await page.evaluate(() => { const b = [...document.querySelectorAll("#creator button")].find(b => b.textContent.trim() === "sequins"); if (b) b.click(); return !!b; }));
    await settle(10000); await face("towards"); await settle(5000); await shot("wardrobe-zoom-sequins");
  }
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
