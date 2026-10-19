// Sailing's cost on the new page (Ed, 2026-10-19, Foxtrot's transition review: option 4, the map made in a worker while the chart
// flies, app/mapPrep.ts): opens the sea chart on a build (DIST, default dist/), chooses ISLAND, looks at it LOOK seconds (the
// chart's worker making its map meanwhile), sails (the Sail button: the flight, then the game's page), and on the new page reports
// the time from the old page leaving (the new one's navigation start) to each of its steps (witch:main, :prep, :game, :view,
// :ready, performance marks in main.ts), whether its map came from the worker (loadTimes.mapPrep 1), and its long tasks (count,
// total, the longest). THROTTLE=4 slows the CPU fourfold (CDP) from the Sail on. RUNS times each, a fresh browser each.
//   node tools/arrive/time.cjs [out.json]   DIST=dist ISLAND=fox WORLD=7 LOOK=4 THROTTLE=1 RUNS=1 SIZE=960x540
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(__dirname, "../..", env("DIST", "dist")), outFile = process.argv[2];
const ISLAND = env("ISLAND", "fox"), WORLD = env("WORLD", "7"), LOOK = Number(env("LOOK", 4)), THROTTLE = Number(env("THROTTLE", 1)), RUNS = Number(env("RUNS", 1));
const [W, H] = env("SIZE", "960x540").split("x").map(Number);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".webp": "image/webp", ".ogg": "audio/ogg", ".wasm": "application/wasm" };
function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")));
    fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(data); });
  });
  return new Promise(ok => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}
const wait = ms => new Promise(r => setTimeout(r, ms));

async function once(port) {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = [], notes = []; page.on("pageerror", e => errors.push(String(e))); page.on("console", m => { if (/map prep/.test(m.text())) notes.push(m.text()); });
  await page.addInitScript(() => {
    try { localStorage.setItem("witch.chart.sailAnywhere", "1"); } catch {}
    window.__long = [];
    try { new PerformanceObserver(l => { for (const e of l.getEntries()) window.__long.push({ at: Math.round(e.startTime), ms: Math.round(e.duration) }); }).observe({ type: "longtask", buffered: true }); } catch {}
  });
  const cdp = await page.context().newCDPSession(page);
  await page.goto(`http://127.0.0.1:${port}/chart.html?world=${WORLD}`);
  await page.waitForFunction(() => window.chart?.chart, null, { timeout: 180000 });
  await wait(2000);
  await page.evaluate(id => window.chart.choose(id), ISLAND);
  await wait(LOOK * 1000);
  if (THROTTLE > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: THROTTLE });
  const nav = page.waitForURL(u => /arrive=1/.test(String(u)), { timeout: 300000 });
  const sailed = Date.now();
  await page.click(".sail");
  await nav;
  const flew = Date.now() - sailed;
  await page.waitForFunction(() => window.witch?.ready, null, { timeout: 900000, polling: 500 });
  const r = await page.evaluate(() => {
    const m = Object.fromEntries(performance.getEntriesByType("mark").filter(e => e.name.startsWith("witch:")).map(e => [e.name.slice(6), Math.round(e.startTime)]));
    const long = window.__long.filter(e => e.at <= (m.ready ?? Infinity) + 2000);
    return { marks: m, mapPrep: window.witch.loadTimes.mapPrep ?? null, long: { count: long.length, total: long.reduce((t, e) => t + e.ms, 0), max: Math.max(0, ...long.map(e => e.ms)), top: [...long].sort((a, b) => b.ms - a.ms).slice(0, 6) } };
  });
  await browser.close();
  return { island: ISLAND, world: WORLD, throttle: THROTTLE, flightMs: flew, ...r, notes, errors };
}

(async () => {
  const { server, port } = await serve();
  const runs = [];
  for (let i = 0; i < RUNS; i++) { const r = await once(port); runs.push(r); console.log(JSON.stringify(r)); }
  server.close();
  if (outFile) fs.writeFileSync(outFile, JSON.stringify(runs, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
