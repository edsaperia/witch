// Stargazing at an exact spot (Ed's shots from the live build):
//   node tools/beach/spot.cjs <dist dir> <seed> <x> <z> <out.png>
// Loads the built game on that seed, puts her on foot at (x, z), pushes her straight out toward the nearest edge until she
// lies down to stargaze, waits for the view to settle and screenshots it; prints the area the overlay names there and how
// near the water she is. CURVE=<k> tries another beach.stargazeCurve, COAST=<k> another beach.camera.curve (the view bends by
// the larger of the two), SET="path=value;..." any tuning numbers.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [dir, seed, X, Z, out] = process.argv.slice(2), root = path.resolve(dir);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&spell=auto`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  if (process.env.CURVE) await page.evaluate(k => { window.witch.game.tuning.beach.stargazeCurve = k; }, Number(process.env.CURVE)); // (to try a bend)
  if (process.env.COAST) await page.evaluate(k => { window.witch.game.tuning.beach.camera.curve = k; }, Number(process.env.COAST)); // (the coast camera's own bend: the view takes the larger)
  // SET="beach.stargazeCurve=6;beach.camera.curve=4": any tuning numbers, set on the running game
  if (process.env.SET) await page.evaluate(set => { for (const kv of set.split(";").filter(Boolean)) { const [path, v] = kv.split("="), keys = path.split("."); let o = window.witch.game.tuning; for (const k of keys.slice(0, -1)) o = o[k]; o[keys[keys.length - 1]] = Number(v); } }, process.env.SET);
  const out0 = await page.evaluate(([x, z]) => { const g = window.witch.game, c = g.map.bounds.circle; g.witch = { ...g.witch, x, z, seated: false, vx: 0, vz: 0, mode: "ground", lift: 0 }; const d = Math.hypot(x - c.x, z - c.z) || 1; return { nx: (x - c.x) / d, nz: (z - c.z) / d }; }, [Number(X), Number(Z)]);
  const step = (n, o = {}) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, i === n - 1); return !!w.game.witch.stargazing; }, [n, o]);
  let lying = false;
  for (let i = 0; i < 80 && !lying; i++) lying = await step(10, { moveX: out0.nx * 0.4, moveZ: out0.nz * 0.4 });
  await page.waitForFunction(() => window.witch.view.assets.partyWitchArt(null), null, { timeout: 180000, polling: 250 });
  await step(240); await page.waitForTimeout(800); await step(2);
  const info = await page.evaluate(() => { const w = window.witch, g = w.game; return { area: w.areaUnderWitch ? w.areaUnderWitch() : null, x: Math.round(g.witch.x), z: Math.round(g.witch.z), c: g.map.bounds.circle }; });
  await page.screenshot({ path: out });
  console.log(`${lying ? "lying" : "NOT lying"} at ${info.x}, ${info.z}; the overlay's area: ${info.area} (the map's centre ${Math.round(info.c.x)}, ${Math.round(info.c.z)}, radius ${Math.round(info.c.r)}); ${errors.length ? "errors: " + errors.slice(0, 2).join(" | ") : "no page errors"} → ${out}`);
  await browser.close(); server.close();
  process.exit(lying && !errors.length ? 0 : 1);
});
