// The trunks' shadows on the grass and flowers, and their cost (render/trunkShadows.ts; Ed, 2026-10-12): the built game (DIST, default
// dist/) at 1280×800, stepped at a fixed 1/60 s, her on foot 7 m east of a tree in a wooded area next to home, so its shadow falls west over
// its grass and tufts. debug.png paints where the shadows lie, magenta. Shots with the tuning set live: as shipped (shadows.trunks.cover 1, foot, taper, near on), with
// cover 0 (the ground darkened, its grass and flowers not: as before), and with the fades and taper off. Then the view's own work a
// frame (view.ms, median of 120 frames) with glowReach 20 and 50. Fails on a page error.
//   npm run build && node tools/shadows/trunk-cover.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/trunk-cover", seed = "123"] = process.argv.slice(2);
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
    // a tree in a wooded area next to home (as trunk-walkup.cjs), her 7 m east of it
    out.tree = await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor, hc = g.map.cellSafe(d.x, d.z).cell, home = g.map.typeOf(hc[0], hc[1]); window.witch.manual = true;
      const ts = g.forest.treesNear(d.x, d.z, 160).filter(t => { const r = Math.hypot(t.x - d.x, t.z - d.z); return r > 50 && t.type !== home && g.forest.treesNear(t.x, t.z, 12).length >= 3 && !g.forest.treesNear(t.x + 6, t.z, 4).length; }).sort((a, b) => Math.hypot(a.x - d.x, a.z - d.z) - Math.hypot(b.x - d.x, b.z - d.z));
      const t = ts[0]; window.__tree = t; if (t) g.witch = { ...g.witch, x: t.x + 7, z: t.z + 0.5, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false, perch: undefined };
      return t ? { x: t.x, z: t.z, type: t.type } : null; });
    if (!out.tree) throw new Error("no tree found");
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, c]) => { let ms = []; for (let k = 0; k < n; k++) { const r = window.witch.frame(c, 1 / 60, true); ms.push(r.render); } ms.sort((a, b) => a - b); return ms[Math.floor(ms.length / 2)]; }, [n, C]);
    await step(60); await page.waitForTimeout(30000); await step(2);
    const set = o => page.evaluate(o => Object.assign(window.witch.game.tuning.shadows.trunks, o), o);
    const shipped = await page.evaluate(() => ({ ...window.witch.game.tuning.shadows.trunks }));
    await page.screenshot({ path: path.join(outDir, "cover-on.png") });
    await set({ cover: 0 }); await step(2); await page.screenshot({ path: path.join(outDir, "cover-off.png") });
    await set({ cover: shipped.cover, foot: 0, taper: 0, near: 0 }); await step(2); await page.screenshot({ path: path.join(outDir, "fades-off.png") });
    await set({ ...shipped, mode: "debug" }); await step(2); await page.screenshot({ path: path.join(outDir, "debug.png") });
    await set(shipped);
    for (const r of [20, 50]) { await set({ glowReach: r }); await step(10); out[`render${r}`] = +(await step(120)).toFixed(2); }
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length) process.exit(1);
})();
