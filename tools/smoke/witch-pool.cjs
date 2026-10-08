// Her light pool (render/lighting.ts nightLightShaded, render/view.ts): the built game (DIST, default dist/) at 1280×720 on a seed;
// she stands at home in front of the dancefloor and on its open heath, and in the middle of other areas (by cell, AREAS=x,y;x,y), and a still is saved
// of each, with her glow's reach and power at the time.  npm run build && node tools/smoke/witch-pool.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/witch-pool", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off${process.env.QUERY ? "&" + process.env.QUERY : ""}`); // (QUERY=a=b&c=d: more of the URL)
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const places = [["home-front", [0, 36]], ["home-grass", [40, 26]], ...(process.env.AREAS || "7,10;8,9").split(";").map(s => [`area-${s.replace(",", "-")}`, s.split(",").map(Number)])];
    for (const [name, cell] of places) {
      await page.evaluate(cell => {
        const g = window.witch.game, D = g.map.dancefloor, s = cell.home ? { x: D.x + cell.at[0], z: D.z + cell.at[1] } : g.map.siteOf(cell[0], cell[1]);
        g.witch = { ...g.witch, x: s.x, z: s.z, seated: false, mode: "ground", lift: 0 };
      }, name.startsWith("home") ? { home: true, at: cell } : cell);
      await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 4, { timeout: 600000, polling: 500 });
      await page.screenshot({ path: path.join(outDir, `${name}.png`) });
      console.log(name, await page.evaluate(() => { const w = window.witch, g = w.game; const c = g.map.cellSafe(g.witch.x, g.witch.z).cell; return JSON.stringify({ area: w.areaTypeId(g.map.typeOf(c[0], c[1])), reach: +(w.lightUniforms?.uGlowR.value ?? NaN).toFixed(2) }); }));
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
