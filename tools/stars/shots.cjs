// The night sky (render/sky.ts; Ed, 2026-10-22: "Let's redo the starfield ... the occasional nebula", the telescope tilting up to the
// stars, tonight's find written in them as a constellation; rules/constellations.ts): the built game (DIST, default dist/), seed 123,
// 1280×800, stepped at a fixed 1/60 s. The game's own sky over the treetops; through the telescope (window.witch.telescope) near the
// horizon, tilted up across the Milky Way and at a nebula; tonight's constellation at the trunk's bearing as she first sees it
// (stars only) and once she's held the view on it (its lines in), then two other finds' (the trunk moved round and its wearable
// swapped, for the shots); and the crystal ball's placeholder line (E at it). Each shot the whole page as <out>/<name>.png, with the
// frame's cost (render ms over 20 frames, draw calls) in shots.json. Fails on a page error.
//   npm run build && node tools/stars/shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/stars", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = { seed, shots: [] };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error" && /shader|program|glsl/i.test(m.text())) errors.push(m.text()); });
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 900000, polling: 500 });
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = (n, c = C) => page.evaluate(([n, c]) => { for (let k = 0; k < n; k++) window.witch.frame(c, 1 / 60, k === n - 1); }, [n, c]);
    const cost = () => page.evaluate(c => { let ms = 0; for (let k = 0; k < 20; k++) ms += window.witch.frame(c, 1 / 60, true).render; const i = window.witch.view.renderer.info.render; return { renderMs: Math.round(ms / 2) / 10, calls: i.calls }; }, C);
    const shot = async (name, extra = {}) => { out.shots.push({ name, ...extra, ...(await cost()) }); await page.screenshot({ path: path.join(outDir, `${name}.png`), timeout: 300000 }); };
    await page.evaluate(() => { window.witch.manual = true; });
    for (let w = 0; w < 2; w++) { await page.evaluate(c => window.witch.frame({ ...c, nextWave: true }, 1 / 60, true), C); await step(240); }
    // The crystal ball's placeholder: E at it in the hub (config/house.json, the plan turned 45°: rules/houseRooms.ts fromPlan).
    await page.evaluate(() => { const g = window.witch.game, h = g.map.treehouse, c = Math.SQRT1_2, x = -4.38, z = -0.71; g.witch = { ...g.witch, x: h.x + x * c + z * c, z: h.z - x * c + z * c, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false, perch: g.witch.perch }; });
    await step(30);
    await page.evaluate(c => window.witch.frame({ ...c, sigil: true }, 1 / 60, true), C);
    await step(20);
    await shot("ball-placeholder");
    // The game's own sky over the treetops, south of the dancefloor, looking north as ever.
    await page.evaluate(() => { const g = window.witch.game, d = g.map.dancefloor; g.witch = { ...g.witch, x: d.x, z: d.z + 120, vx: 0, vz: 0, mode: "treetop", lift: 1, seated: false, perch: undefined }; });
    await step(150);
    await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 1000 }).catch(() => {});
    await step(4);
    await shot("game-sky");
    const look = (h, z, e) => page.evaluate(([h, z, e]) => window.witch.telescope.look(h, z, e), [h, z, e]);
    // (the constellation's lines fade in on real time held, a frame's step at most 0.1 s: frames drawn all the while)
    const hold = async ms => { const t0 = Date.now(); while (Date.now() - t0 < ms) await step(1); await step(3); };
    await look(30, 0, 8); await step(90); await shot("tele-horizon", { bearing: 30, up: 8 });
    await look(310, 0, 45); await step(30); await shot("tele-milky-way", { bearing: 310, up: 45 });
    await look(310, 0.86, 45); await step(30); await shot("tele-milky-way-zoom", { bearing: 310, up: 45, zoom: 0.86 });
    await look(140, 0, 19); await step(30); await shot("tele-nebula", { bearing: 140, up: 19 });
    await look(225, 0, 40); await step(30); await shot("tele-nebula-2", { bearing: 225, up: 40 });
    // Tonight's: at the trunk's bearing, 35° up; then two others (the trunk moved round, its wearable swapped).
    const trunk = await page.evaluate(() => { const g = window.witch.game, t = g.trunk, h = g.map.treehouse; return t && { item: t.item, x: t.x, z: t.z, bearing: ((Math.atan2(t.x - h.x, -(t.z - h.z)) * 180) / Math.PI + 360) % 360 }; });
    out.trunk = trunk;
    if (!trunk) throw new Error("no trunk tonight");
    const SETS = [[trunk.item, trunk.bearing], ["shades", (trunk.bearing + 120) % 360], ["backpack", (trunk.bearing + 240) % 360]];
    for (const [item, bearing] of SETS) {
      await page.evaluate(([item, bearing]) => { const g = window.witch.game, h = g.map.treehouse, t = g.trunk, r = Math.hypot(t.x - h.x, t.z - h.z), a = (bearing * Math.PI) / 180; t.item = item; t.x = h.x + Math.sin(a) * r; t.z = h.z - Math.cos(a) * r; }, [item, bearing]);
      await look(bearing, 0, 35);
      await step(3);
      await shot(`tele-${item}-first`, { item, bearing });
      await hold(1600);
      await shot(`tele-${item}-held`, { item, bearing });
    }
    // Found: the constellation's gone.
    await page.evaluate(() => { window.witch.game.trunk.found = true; });
    await step(3);
    await shot("tele-found", { bearing: SETS[2][1] });
  } finally { await browser.close(); server.close(); }
  fs.writeFileSync(path.join(outDir, "shots.json"), JSON.stringify({ ...out, errors }, null, 1));
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length) process.exit(1);
})();
