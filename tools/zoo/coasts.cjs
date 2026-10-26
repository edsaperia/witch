// The zoo's islands in their real shapes, end to end in one browser (Ed, 2026-10-26: "We already know the real coastline shapes,
// can't we reuse them in the zoo without calculating anything?"; app/zooCoasts.ts): a fresh browser's zoo first (nothing kept: every
// island round, and no stall), then a night that makes the sea chart ahead (?warmChart=1: app/chartWarm.ts, which keeps each
// island's coast beside its outline, app/chartCache.ts keepCoast), then the zoo again, which must read every coast back and lay its
// islands out in them. Fails if the second zoo isn't all real, or if the zoo waited on the cache longer than it may.
//   npm run build && node tools/zoo/coasts.cjs [dist] [out]   (about 3 to 8 minutes: the chart's 65 islands made)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.argv[2] || path.join(__dirname, "../../dist")), out = path.resolve(process.argv[3] || "previews/zoo/coasts");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } }); // (one context: one IndexedDB across its pages)
  const fails = [];
  const zoo = async name => {
    const p = await ctx.newPage(), lines = [];
    p.on("console", m => lines.push(m.text()));
    p.on("pageerror", e => fails.push(`${name}: ${e.message}`));
    await p.goto(`${base}/?zoo&all&creator=0`);
    await p.waitForFunction(() => window.witch && window.witch.game, null, { timeout: 600000, polling: 500 });
    const said = lines.find(l => l.startsWith("zoo: ")) ?? "(no line)";
    const n = await p.evaluate(() => window.witch.game.map.zoo.layout.islands.filter(I => I.real).length);
    log(name, said, `| real in the layout: ${n}`);
    const ms = Number((said.match(/\((\d+) ms\)/) ?? [])[1] ?? 0);
    if (ms > 600) fails.push(`${name}: the zoo waited ${ms} ms on the cache`);
    return { p, n };
  };
  try {
    const a = await zoo("fresh zoo");
    if (a.n !== 0) fails.push(`fresh zoo: ${a.n} real islands with nothing kept`);
    await a.p.close();
    // (a night, making the chart ahead)
    const night = await ctx.newPage(), done = new Promise(r => night.on("console", m => { if (m.text().startsWith("sea chart made ahead")) { log(m.text()); r(); } }));
    night.on("pageerror", e => fails.push(`night: ${e.message}`));
    await night.goto(`${base}/?seed=7&creator=0&warmChart=1`);
    await Promise.race([done, new Promise(r => setTimeout(r, 900000))]);
    await night.close();
    const b = await zoo("zoo after the chart");
    if (b.n !== 64) fails.push(`zoo after the chart: ${b.n} of 64 islands real`);
    await b.p.waitForTimeout(3000);
    await b.p.screenshot({ path: path.join(out, "zoo-real.png") });
    await b.p.close();
  } finally { await browser.close(); server.close(); }
  if (fails.length) { console.error("FAILED:\n" + fails.join("\n")); process.exit(1); }
  log("ok");
})().catch(e => { console.error(e); process.exit(1); });
