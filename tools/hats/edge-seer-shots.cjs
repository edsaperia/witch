// The Edge-seer hat (Ed, 2026-10-15: "shows the area edges ... while it's in play"; rules/hatSpells.ts edgesSeen): the built game
// (DIST, default dist/) at 1280×720 on a seed, in the treetops over home's edge, wearing the Edge-seer hat (the party areas' glowing
// dotted edges drawn), then the same spot with a plain hat (none drawn). Shots: edge-seer-on.png, edge-seer-off.png. Fails on a
// page error, or if the border mesh isn't visible with the hat and hidden without it.
//   npm run build && node tools/hats/edge-seer-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/edge-seer", seed = "123"] = process.argv.slice(2);
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
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&hat=edgeseer&quick=1`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    // Up in the treetops over the home area's south-east edge, so the border runs across the picture.
    await page.evaluate(() => { const g = window.witch.game, D = g.map.dancefloor, a = g.map.areaSize; g.witch = { ...g.witch, x: D.x + a * 0.42, z: D.z + a * 0.3, seated: false, mode: "treetop", lift: 1, perch: undefined, vx: 0, vz: 0 }; });
    page.setDefaultTimeout(600000); // (the software renderer: a screenshot can take minutes)
    const step = (o, dt = 1 / 30) => page.evaluate(([o, dt]) => { const w = window.witch; w.manual = true; w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, dt); }, [o, dt]);
    const seen = () => page.evaluate(() => { const w = window.witch; return { edges: w.view.borders.mesh.visible, hat: w.game.witches[0].spells.hat }; });
    for (let i = 0; i < 90; i++) await step({}); // (the camera settles, the border's points are worked out)
    out.on = await seen();
    await page.screenshot({ path: path.join(outDir, "edge-seer-on.png") });
    await page.evaluate(() => { window.witch.game.witches[0].spells.hat = "none"; });
    for (let i = 0; i < 10; i++) await step({});
    out.off = await seen();
    await page.screenshot({ path: path.join(outDir, "edge-seer-off.png") });
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length || !out.on?.edges || out.off?.edges) process.exit(1);
})().catch(e => { console.error(e); process.exit(1); });
