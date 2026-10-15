// The seer hats (Ed, 2026-10-15: the Edge-seer "shows the area edges", the Route-seer "see the entire route"; worn only:
// rules/hatSpells.ts seerWorn): the built game (DIST, default dist/) at 1280×720 on a seed, in the treetops over home's edge,
// wearing the hat (HAT=edgeseer, the default: the party areas' glowing dotted edges drawn; HAT=routeseer: the whole ley line and
// every beacon), then the same spot with a plain hat. Shots: <hat>-on.png, <hat>-off.png. Fails on a page error, or if what the
// hat shows isn't drawn with it and is without it.
//   npm run build && [HAT=routeseer] node tools/hats/edge-seer-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/edge-seer", seed = "123"] = process.argv.slice(2), HAT = process.env.HAT || "edgeseer";
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {};
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    if (process.env.DEBUG) page.on("console", m => console.log("console:", m.text().slice(0, 200)));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&hat=${HAT}&quick=1`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    // Up in the treetops over the home area's south-east edge, so the border runs across the picture.
    await page.evaluate(() => { const g = window.witch.game, D = g.map.dancefloor, a = g.map.areaSize; g.witch = { ...g.witch, x: D.x + a * 0.42, z: D.z + a * 0.3, seated: false, mode: "treetop", lift: 1, perch: undefined, vx: 0, vz: 0 }; });
    page.setDefaultTimeout(600000); // (the software renderer: a screenshot can take minutes)
    const step = (o, dt = 1 / 30) => page.evaluate(([o, dt]) => { const w = window.witch; w.manual = true; w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, dt); }, [o, dt]);
    // (what the hat shows: the border mesh drawn; the line grown to the whole route (growTo null) and every beacon up)
    const seen = () => page.evaluate(hat => { const w = window.witch, v = w.view; return { shown: hat === "routeseer" ? v.ley.growTo === null : v.borders.mesh.visible, hat: w.game.witches[0].spells.hat }; }, HAT);
    for (let i = 0; i < 90; i++) await step({}); // (the camera settles, the border's points are worked out)
    out.on = await seen();
    await page.screenshot({ path: path.join(outDir, `${HAT}-on.png`) });
    await page.evaluate(() => { window.witch.game.witches[0].spells.hat = "none"; });
    for (let i = 0; i < 10; i++) await step({});
    out.off = await seen();
    await page.screenshot({ path: path.join(outDir, `${HAT}-off.png`) });
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length || !out.on?.shown || out.off?.shown) process.exit(1);
})().catch(e => { console.error(e); process.exit(1); });
