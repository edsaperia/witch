// The victory lap's pulse home on the one line (Ed's quick win, 2026-10-29: "The pulse ended in a strange place, possibly because I
// won the night very quickly"; rules/win.ts lapRuns, render/leylines.ts lap): Ed's own night (SEED, WORLD, CLEARED: his debug
// link's), the island cleared early so the lap sets off at once from where the wave's pulse is; her put by the treehouse's front.
// One still as the pulse home runs the ring's link back toward the front (links under 0), one at the win (the pulse gone home).
//   npm run build && node tools/leylines/win-shots.cjs [out dir]   (SEED=173390, WORLD=1268398697, WAVE=1, CLEARED=17_15,...; SIZE=1280x720, ZOOM=3)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const outDir = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/leylines"));
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), ZOOM = process.env.ZOOM || "3";
const SEED = process.env.SEED || "173390", WORLD = process.env.WORLD || "1268398697", WAVE = process.env.WAVE || "1";
const CLEARED = process.env.CLEARED || "17_15,16_15,16_14,15_14,14_15,14_14,16_16,14_16,15_17";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    const base = `http://127.0.0.1:${server.address().port}/?seed=${SEED}&world=${WORLD}&wave=${WAVE}&cleared=${CLEARED}&creator=0&zoom=${ZOOM}`;
    await page.goto(`${base}&shot=${encodeURIComponent("object:mapTable")}`);
    await page.waitForFunction(() => window.witch && window.witch.game, null, { timeout: 600000, polling: 500 });
    const scene = await page.evaluate(() => { const f = window.witch.game.map.treehouseFront, d = window.witch.game.map.dancefloor; return `at:${(f.x + (d.x - f.x) * 0.5).toFixed(1)},${(f.z + (d.z - f.z) * 0.5).toFixed(1)}`; });
    await page.goto(`${base}&shot=${encodeURIComponent(scene)}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000, polling: 200 }).catch(() => {}); }
    const said = await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), scene);
    log("scene:", said.say);
    const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i === n - 1); }, n);
    for (let round = 0, calm = 0; calm < 2 && round < 40; round++) { await step(10); const p = await page.evaluate(() => window.witch.view.assets.pending); if (p === 0) calm++; else { calm = 0; await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 600000, polling: 500 }); } }
    // The waves on, the stragglers gone (as won over), so the lap sets off from where the wave's pulse is.
    await page.evaluate(() => { const g = window.witch.game; g.party.paused = false; for (const c of g.creatures) if (!c.gone && c.enraged && !c.boss) c.gone = true; });
    const state = () => page.evaluate(() => { const g = window.witch.game, w = g.win, v = window.witch.view.ley, t = v.pulseTip, f = g.map.treehouseFront; return `clock ${g.clock.time.toFixed(1)} wave ${g.party.wave} win ${w ? w.phase : "-"} lap links ${w && w.phase === "lap" ? (w.lap && w.lap.length ? "set" : "-") : "-"} pulseTip ${t ? `${t.links.toFixed(2)} at ${(t.x - f.x).toFixed(1)},${(t.z - f.z).toFixed(1)} from the front` : "none"}`; });
    for (let i = 0; i < 600; i++) { await step(6); const w = await page.evaluate(() => window.witch.game.win && window.witch.game.win.phase); if (w === "lap" || w === "won") break; }
    log(await state());
    // Till the pulse home is on the ring's link (its place under the route's start), then the still; then till the win.
    for (let i = 0; i < 600; i++) { const l = await page.evaluate(() => { const g = window.witch.game, t = window.witch.view.ley.pulseTip; return g.win && g.win.phase === "won" ? -9 : t ? t.links : 9; }); if (l < 0.9 || l === -9) break; await step(3); }
    log(await state());
    await page.screenshot({ path: path.join(outDir, "win-pulse-on-ring.png"), timeout: 300000 }); log("saved win-pulse-on-ring.png");
    for (let i = 0; i < 900; i++) { const w = await page.evaluate(() => window.witch.game.win && window.witch.game.win.phase); if (w === "won") break; await step(6); }
    await step(30);
    log(await state());
    await page.screenshot({ path: path.join(outDir, "win-home.png"), timeout: 300000 }); log("saved win-home.png");
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e.message || e); process.exit(1); });
