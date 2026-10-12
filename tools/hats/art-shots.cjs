// The hats' art in play (render/view/hatArt.ts): the built game (DIST, default dist/) at 1280×720 on a seed; at home's open
// ground she wears the Harvest hat and puts it down (its ring of berries grows, a sprout under each), then a Cyclone blows by
// her (its whirlwind rising, looping and falling apart); frames stepped by hand a fixed 1/20 s.
//   npm run build && node tools/hats/art-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/hat-art", seed = "123"] = process.argv.slice(2);
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
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&hat=harvest`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 4, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { const g = window.witch.game, D = g.map.dancefloor; g.witch = { ...g.witch, x: D.x + 40, z: D.z + 26, seated: false, mode: "ground", lift: 0 }; });
    await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 3, { timeout: 600000, polling: 500 }); // (the camera settles)
    const step = (o, dt = 0.05) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const shot = name => page.screenshot({ path: path.join(outDir, `${name}.png`), clip: { x: 340, y: 110, width: 600, height: 420 } });
    // her Harvest hat down: held E with nothing to pick up
    await step({ place: true, sigilHeld: true });
    for (let i = 0; i < 14; i++) await step({ sigilHeld: true });
    await step({});
    const ring = await page.evaluate(() => (window.witch.game.berries.harvest ?? []).filter(id => !window.witch.game.berries.berries[id].gone).length);
    for (let i = 0; i < 12; i++) await step({});
    await shot("harvest");
    // a Cyclone by her (as her Cyclone hat raises it: rules/hatSpells.ts), a few metres off
    await page.evaluate(() => { const g = window.witch.game, w = g.witch; g.witches[0].spells.cyc = { at: g.clock.time, x: w.x + 6, z: w.z - 3, held: [] }; });
    for (let i = 0; i < 74; i++) { if (i % 8 === 0 || i > 64) await shot(`cyclone-${String(i).padStart(2, "0")}`); await step({}); }
    console.log(JSON.stringify({ ring, errors }));
  } finally { await browser.close(); server.close(); }
  if (errors.length) process.exit(1);
})();
