// The first load's cost on the page (Ed, 2026-10-20: the boot's own map made in a worker, app/mapPrep.ts startBootMapPrep): loads a
// build (DIST, default dist/) fresh, as a first load (no link but QUERY's), the CPU slowed THROTTLE times from the start (CDP), and
// reports when each step came (the witch:* marks, ms from the navigation's start), whether the boot's map came from the worker
// (loadTimes.mapPrep 1), and the main thread's long tasks up to `witch:view` and a few seconds past it (count, total, longest).
//   node tools/arrive/boot.cjs [out.json]   DIST=dist QUERY="opening=chart" THROTTLE=1 RUNS=1 SIZE=960x540 AFTER=5
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(__dirname, "../..", env("DIST", "dist")), outFile = process.argv[2];
const QUERY = env("QUERY", ""), THROTTLE = Number(env("THROTTLE", 1)), RUNS = Number(env("RUNS", 1)), AFTER = Number(env("AFTER", 5));
const [W, H] = env("SIZE", "960x540").split("x").map(Number);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".webp": "image/webp", ".ogg": "audio/ogg", ".wasm": "application/wasm" };
function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")));
    fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(data); });
  });
  return new Promise(ok => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}

async function once(port) {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = []; page.on("pageerror", e => errors.push(String(e)));
  await page.addInitScript(() => {
    window.__long = [];
    try { new PerformanceObserver(l => { for (const e of l.getEntries()) window.__long.push({ at: Math.round(e.startTime), ms: Math.round(e.duration) }); }).observe({ type: "longtask", buffered: true }); } catch {}
  });
  if (THROTTLE > 1) await (await page.context().newCDPSession(page)).send("Emulation.setCPUThrottlingRate", { rate: THROTTLE });
  await page.goto(`http://127.0.0.1:${port}/${QUERY ? "?" + QUERY : ""}`);
  await page.waitForFunction(() => performance.getEntriesByName("witch:view").length > 0, null, { timeout: 900000, polling: 250 });
  await page.waitForTimeout(AFTER * 1000);
  const r = await page.evaluate(() => {
    const m = Object.fromEntries(performance.getEntriesByType("mark").filter(e => /^(witch|opening):/.test(e.name)).map(e => [e.name, Math.round(e.startTime)]));
    const view = m["witch:view"], long = window.__long.filter(e => e.at <= view);
    return { marks: m, mapPrep: window.witch?.loadTimes?.mapPrep ?? null, mapPrepMs: window.witch?.loadTimes?.mapPrepMs ?? null,
      toView: { count: long.length, total: long.reduce((t, e) => t + e.ms, 0), max: Math.max(0, ...long.map(e => e.ms)), top: [...long].sort((a, b) => b.ms - a.ms).slice(0, 5) },
      after: window.__long.filter(e => e.at > view).slice(0, 5) };
  });
  await browser.close();
  return { query: QUERY, throttle: THROTTLE, ...r, errors };
}

(async () => {
  const { server, port } = await serve();
  const runs = [];
  for (let i = 0; i < RUNS; i++) { const r = await once(port); runs.push(r); console.log(JSON.stringify(r)); }
  server.close();
  if (outFile) fs.writeFileSync(outFile, JSON.stringify(runs, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
