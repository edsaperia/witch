// The forest behind the treehouse's enclosed rooms (MOCK, ?behind=: render/post.ts renderIndoors, render/view.ts indoorsMock), shot
// from the built game (DIST, default dist/) at 1600×900: she's stood in each room (ROOMS, default bedroom,study) and on the Terrace,
// and each is shot as the game draws it now, with the forest black, and with it darkened and blurred (`<room>-<as|black|dim>.png`);
// and each mode's frames timed there (12 frames, the GPU finished each: timings.json). One load; the mode switched in place.
//   npm run build && node tools/house/indoors-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/indoors", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/house.json"), "utf8"));
const ROOMS = (process.env.ROOMS || "bedroom,study").split(",");
const A = ((H.turn || 0) * Math.PI) / 180, plan = (x, z) => [x * Math.cos(A) + z * Math.sin(A), -x * Math.sin(A) + z * Math.cos(A)];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], timings = {};
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&behind=black`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const stand = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; }, [x, z]);
    const step = n => page.evaluate(n => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); }, n);
    const mode = m => page.evaluate(m => { window.witch.view.behind = m; window.witch.view.post.indoors = null; }, m);
    const time = () => page.evaluate(() => { const w = window.witch, gl = w.view.renderer.getContext(), t0 = performance.now(); for (let i = 0; i < 12; i++) { w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); gl.finish(); } return +((performance.now() - t0) / 12).toFixed(1); });
    const spots = [...ROOMS.map(id => { const r = H.rooms.find(q => q.id === id); return [id, plan((r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2)]; }), ["terrace", [0, 0]]];
    for (const [id, [x, z]] of spots) {
      await stand(x, z); await step(120);
      timings[id] = {};
      for (const m of [null, "black", "dim"]) {
        await mode(m); await step(4);
        await page.screenshot({ path: path.join(outDir, `${id}-${m || "as"}.png`), timeout: 300000 });
      }
      // (timed after a warm-up, each mode twice in turn: the first frames after a move run slow whatever's drawn)
      await time();
      for (const m of [null, "black", "dim", "dim", "black", null]) { await mode(m); await step(2); const k = m || "as"; timings[id][k] = +(((timings[id][k] ?? 0) + (await time()) / 2)).toFixed(1); }
      console.log(id, JSON.stringify(timings[id]), await page.evaluate(() => window.witch.view.post.indoors));
    }
  } finally {
    fs.writeFileSync(path.join(outDir, "timings.json"), JSON.stringify(timings, null, 1));
    console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
    await browser.close(); server.close();
  }
})();
