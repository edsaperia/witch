// The leash round a lake (Ed, 2026-10-12: "This leashed animal pathing seems to go through a lake"): the built game (DIST,
// default dist/) in headless Chromium at 1280×720 on Ed's island and seed (raven, 753732), her in the treetops on the lake's
// shore where Ed was (3131.8, 2556.2), two of the island's animals leashed to her on dry land across the lake, so they travel to
// her and their leashes are drawn along their routes. Shots once their routes are planned and after they've walked a while,
// and how much of each route and of the ground each walked lies on the water.
//   npm run build && node tools/qa/leash-lake.cjs [out dir]   (default previews/leash-lake)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/leash-lake"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".ogg": "audio/ogg", ".woff2": "font/woff2" };
const ARGS = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"];
const HER = { x: 3131.8, z: 2556.2 }, THEM = [{ x: 3287.4, z: 2711.8 }, { x: 3258.0, z: 2736.4 }];

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ARGS });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(`pageerror: ${e.message}`));
    await page.goto(`http://127.0.0.1:${port}/?island=raven&seed=753732&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; const p = window.witch.game.party; if (p.spellAt === null) p.spellAt = -100; });
    const run = (n, c = {}, dt = 1 / 60, draw = true) => page.evaluate(async ({ n, c, dt, draw }) => {
      for (let i = 0; i < n; i++) { window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c }, dt, draw); if (i % 20 === 19) await new Promise(r => setTimeout(r, 0)); }
    }, { n, c, dt, draw });
    // off the decks, then to Ed's spot in the treetops with two animals leashed across the lake
    for (let i = 0; i < 20 && (await page.evaluate(() => !!window.witch.game.witch.seated)); i++) await run(30, { moveX: 1 });
    await page.evaluate(({ HER, THEM }) => {
      const g = window.witch.game, W = g.witches[0];
      g.witch = { ...g.witch, x: HER.x, z: HER.z, vx: 0, vz: 0, mode: "treetop", lift: 1, perch: undefined, seated: false };
      g.camera.tx = HER.x; g.camera.tz = HER.z;
      const pick = g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && c.level >= 1).slice(0, THEM.length);
      pick.forEach((c, i) => { Object.assign(c, { x: THEM[i].x, z: THEM[i].z, tx: THEM[i].x, tz: THEM[i].z, leashed: true, enraged: false, siege: undefined, fight: undefined, route: undefined, state: "leashed", circle: undefined }); W.leash.stack.push(c.id); });
      for (const c of g.creatures) if (!c.leashed && Math.hypot(c.x - HER.x, c.z - HER.z) < 400) c.gone = true; // (a quiet shore)
      g.byArea = null;
      window.__leashLake = pick.map(c => c.id);
    }, { HER, THEM });
    const hold = () => page.evaluate(({ HER }) => { const g = window.witch.game; g.witch = { ...g.witch, x: HER.x, z: HER.z, vx: 0, vz: 0 }; }, { HER });
    const measure = () => page.evaluate(() => {
      const g = window.witch.game, L = g.map.bounds.lakes, depth = (x, z) => { if (!L) return -1; const fx = (x - L.x0) / L.step, fz = (z - L.z0) / L.step, i = Math.round(fx), j = Math.round(fz); return i < 0 || j < 0 || i >= L.cols || j >= L.rows ? -1e9 : L.dist[j * L.cols + i]; };
      const wet = pts => { let w = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], d = Math.hypot(b.x - a.x, b.z - a.z), n = Math.max(1, Math.ceil(d / 2)); for (let k = 1; k <= n; k++) if (depth(a.x + (b.x - a.x) * k / n, a.z + (b.z - a.z) * k / n) > 0) w += d / n; } return Math.round(w); };
      return window.__leashLake.map(id => { const c = g.creatures[id]; return { id, at: [Math.round(c.x), Math.round(c.z)], travelling: !!c.travelling, onWater: depth(c.x, c.z) > 0, route: c.route ? { points: c.route.points.length, wetMetres: wet(c.route.points) } : null }; });
    });
    for (let k = 0; k < 4; k++) { await hold(); await run(15); }
    for (let k = 0; k < 2; k++) await run(30, { zoom: 1 }); // (out a little, to see the lake and the trail)
    await hold(); await run(60);
    console.log("planned", JSON.stringify(await measure()));
    await page.screenshot({ path: path.join(outDir, "leash-lake-0.png") });
    // walking: 20 s of game time, a sample every second, any step on the water noted
    const walked = [];
    for (let s = 0; s < 20; s++) { await hold(); await run(60, {}, 1 / 60, s % 5 === 4); walked.push(await measure()); }
    const onWater = walked.flat().filter(m => m.onWater).length;
    console.log("walked", JSON.stringify(walked[walked.length - 1]), `samples on the water: ${onWater}/${walked.flat().length}`);
    await page.screenshot({ path: path.join(outDir, "leash-lake-1.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log(`ok: ${outDir}`);
})();
