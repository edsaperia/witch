// The trunks' shadows as she walks up to a trunk (Ed, 2026-10-12: "they should fade out at the bottom of the tree", "when you're close
// to the tree"; and "The shadows should darken other foliage that they cast upon": render/trunkShadows.ts): the built game (DIST,
// default dist/) at 1280×800, stepped at a fixed 1/60 s, her on foot east of a tree in a wooded area next to home (its shadow falling west,
// over its grass, flowers and tufts), at 16, 8, 4 and 2 m from its trunk. Shots: walkup-<d>m.png. Fails on a page error.
//   npm run build && node tools/shadows/trunk-walkup.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/trunk-walkup", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {};
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 900000, polling: 500 });
    // a tree in a wooded area next to home (not the home meadow's own big pieces), 50 to 160 m from the dancefloor, with few trees east of it
    out.tree = await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor, hc = g.map.cellSafe(d.x, d.z).cell, home = g.map.typeOf(hc[0], hc[1]); window.witch.manual = true;
      const ts = g.forest.treesNear(d.x, d.z, 160).filter(t => { const r = Math.hypot(t.x - d.x, t.z - d.z); return r > 50 && t.type !== home && g.forest.treesNear(t.x, t.z, 12).length >= 3 && !g.forest.treesNear(t.x + 6, t.z, 4).length; }).sort((a, b) => Math.hypot(a.x - d.x, a.z - d.z) - Math.hypot(b.x - d.x, b.z - d.z));
      const t = ts[0]; window.__tree = t; return t ? { x: t.x, z: t.z, type: t.type } : null; });
    if (!out.tree) throw new Error("no tree found");
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    for (const [i, d] of [16, 8, 4, 2].entries()) {
      await page.evaluate(d => { const g = window.witch.game, t = window.__tree; g.witch = { ...g.witch, x: t.x + d, z: t.z + 0.5, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false, perch: undefined }; }, d);
      await page.evaluate(([n, c]) => { for (let k = 0; k < n; k++) window.witch.frame(c, 1 / 60, k === n - 1); }, [60, C]);
      if (i === 0) { await page.waitForTimeout(30000); await page.evaluate(c => window.witch.frame(c, 1 / 60, true), C); }
      await page.screenshot({ path: path.join(outDir, `walkup-${String(d).padStart(2, "0")}m.png`) });
    }
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length) process.exit(1);
})();
