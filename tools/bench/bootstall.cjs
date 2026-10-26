// The page's thread while the game loads (the boot freeze, 2026-10-25): the built game loaded in headless Chromium for a while,
// untouched, a 50 ms heartbeat from its first script, and every wait over half a second between beats (when, and how long: a task
// that long held the page). For bisecting a freeze across builds, and seeing one gone.
//   npm run build && node tools/bench/bootstall.cjs [seconds] [link]   (DIST=dist; e.g. 80 "?seed=497831")
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), secs = Number(process.argv[2] || 60), link = process.argv[3] || "";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.addInitScript(() => { const w = window; w.__gaps = []; const t0 = performance.now(); let last = t0; const tick = () => { const n = performance.now(); if (n - last > 500) w.__gaps.push([Math.round(last - t0), Math.round(n - last)]); last = n; setTimeout(tick, 50); }; setTimeout(tick, 50); });
    page.goto(`http://127.0.0.1:${server.address().port}/${link}`).catch(() => {});
    await new Promise(r => setTimeout(r, secs * 1000));
    const r = await page.evaluate(() => ({ gaps: window.__gaps, ready: !!(window.witch && window.witch.ready) }));
    for (const [at, ms] of r.gaps) console.log(`  held ${(ms / 1000).toFixed(1).padStart(5)} s from ${(at / 1000).toFixed(1)} s`);
    console.log(`${r.gaps.length} waits over 0.5 s in ${secs} s; the longest ${(Math.max(0, ...r.gaps.map(g => g[1])) / 1000).toFixed(1)} s; ${r.ready ? "ready" : "NOT ready"}`);
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); process.exit(1); });
