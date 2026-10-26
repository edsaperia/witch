// The zoo's islands in their real shapes, end to end in one browser (Ed, 2026-10-26: "We already know the real coastline shapes,
// can't we reuse them in the zoo without calculating anything?"; app/zooCoasts.ts): a fresh browser's zoo first (nothing kept: every
// island round, and no stall), then the sea chart's page making its islands (as a night's warm-up, app/chartWarm.ts, does; each
// keeps an island's coast beside its outline, app/chartCache.ts keepCoast), then the zoo again, which must read every coast back and lay its
// islands out in them. Fails if the second zoo isn't all real, or if the zoo waited on the cache longer than it may.
//   npm run build && node tools/zoo/coasts.cjs [dist] [out]   (about 3 to 8 minutes: the chart's 65 islands made)
// PROFILE=<dir>: keep the browser's profile there (its IndexedDB: the chart kept), and with SHOTS=1 only shoot the zoo's deepest
// bay at its fence, on foot and from above, in the real shapes kept from an earlier run.
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
  const args = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
  // (one context: one IndexedDB across its pages; PROFILE keeps it on disk for a later run)
  const browser = process.env.PROFILE ? null : await playwright.chromium.launch({ args });
  const ctx = process.env.PROFILE ? await playwright.chromium.launchPersistentContext(process.env.PROFILE, { args, viewport: { width: 1280, height: 720 } }) : await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const fails = [];
  const zoo = async name => {
    const p = await ctx.newPage(), lines = [];
    p.on("console", m => lines.push(m.text()));
    p.on("pageerror", e => fails.push(`${name}: ${e.message}`));
    await p.goto(`${base}/?zoo&all&creator=0`);
    await p.waitForFunction(() => window.witch && window.witch.game, null, { timeout: 600000, polling: 500 });
    const said = lines.find(l => l.startsWith("zoo: ")) ?? "(no line)";
    const n = await p.evaluate(() => window.witch.game.map.zoo.layout.islands.filter(I => I.real).length);
    await p.waitForFunction(() => window.witch.ready, null, { timeout: 600000, polling: 500 }); // (grown, before a key starts it)
    log(name, said, `| real in the layout: ${n}`);
    const ms = Number((said.match(/\((\d+) ms\)/) ?? [])[1] ?? 0);
    if (ms > 600) fails.push(`${name}: the zoo waited ${ms} ms on the cache`);
    return { p, n };
  };
  // (the zoo's deepest bay: the island and bearing where its coast comes in furthest from its outer envelope; her in it, on the
  // street, or just south of it)
  const bay = async (p, name) => {
    const at = await p.evaluate(() => {
      const L = window.witch.game.map.zoo.layout, along = (I, a) => { const ux = Math.cos(a), uz = Math.sin(a), C = I.coast; let best = I.most; for (let i = 0, n = C.length, j = n - 2; i < n; j = i, i += 2) { const ax = C[j], az = C[j + 1], ex = C[i] - ax, ez = C[i + 1] - az, den = ux * ez - uz * ex; if (Math.abs(den) < 1e-9) continue; const t = (ax * ez - az * ex) / den, s2 = (ax * uz - az * ux) / den; if (t > 0 && s2 >= 0 && s2 <= 1 && t < best) best = t; } return best; };
      let best = null;
      for (const I of L.islands) if (I.real && I.found) for (let k = 0; k < 72; k++) { const a = (k / 72) * Math.PI * 2 - Math.PI; if (Math.sin(a) < 0.2) continue; const r = I.reach[Math.round(((a + Math.PI) / (Math.PI * 2)) * I.reach.length) % I.reach.length], c = along(I, a), deep = r - c; if (!best || deep > best.deep) best = { kind: I.kind, deep, x: I.x + Math.cos(a) * (c + Math.min(deep * 0.6, 40)), z: I.z + Math.sin(a) * (c + Math.min(deep * 0.6, 40)) }; }
      return best;
    });
    log(name, "deepest bay", JSON.stringify(at));
    for (const [mode, file, dz] of [["ground", "bay.png", 8], ["treetop", "bay-above.png", 30]]) {
      await p.evaluate(([x, z, m]) => { const Wb = window.witch.game.witches[0]; Wb.body = { ...Wb.body, x, z, vx: 0, vz: 0, seated: false, mode: m, lift: m === "ground" ? 0 : 1 }; }, [at.x, at.z + dz, mode]);
      await p.waitForTimeout(8000);
      for (let i = 0; i < 30; i++) { const q = await p.evaluate(() => window.witch.view.assets.queue.length + (window.witch.view.assets.workers.some(w => w.busy) ? 1 : 0)); if (!q) break; await p.waitForTimeout(4000); }
      await p.screenshot({ path: path.join(out, file) });
    }
  };
  if (process.env.SHOTS === "1") {
    try { const b = await zoo("zoo (kept)"); await b.p.keyboard.press("Enter"); await bay(b.p, "zoo (kept)"); } finally { await ctx.close(); await browser?.close(); server.close(); }
    if (fails.length) { console.error("FAILED:\n" + fails.join("\n")); process.exit(1); }
    return;
  }
  try {
    const a = await zoo("fresh zoo");
    if (a.n !== 0) fails.push(`fresh zoo: ${a.n} real islands with nothing kept`);
    await a.p.close();
    // (the sea chart's page making its islands, as a night's warm-up does (app/chartWarm.ts: under automation the night's art never
    // settles, so it never starts there); both keep each island's coast for the zoo the same way, app/chartCache.ts keepCoast)
    const chart = await ctx.newPage();
    chart.on("pageerror", e => fails.push(`chart: ${e.message}`));
    await chart.goto(`${base}/chart.html`);
    const kept = () => chart.evaluate(() => new Promise(res => { const r = indexedDB.open("witch-chart"); r.onsuccess = () => { const q = r.result.transaction("outlines").objectStore("outlines").getAllKeys(); q.onsuccess = () => res(q.result.filter(k => String(k).includes("|coast1|")).length); q.onerror = () => res(0); }; r.onerror = () => res(0); }));
    for (let i = 0; i < 180; i++) { await chart.waitForTimeout(5000); const n = await kept(); if (i % 6 === 0) log(`chart: ${n} coasts kept`); if (n >= 64) break; }
    await chart.close();
    const b = await zoo("zoo after the chart");
    if (b.n !== 64) fails.push(`zoo after the chart: ${b.n} of 64 islands real`);
    await b.p.keyboard.press("Enter");
    await bay(b.p, "zoo after the chart");
    await b.p.close();
  } finally { await ctx.close(); await browser?.close(); server.close(); }
  if (fails.length) { console.error("FAILED:\n" + fails.join("\n")); process.exit(1); }
  log("ok");
})().catch(e => { console.error(e); process.exit(1); });
