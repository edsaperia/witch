// What a real first visit asks of the art against what the bake has (tools/prebake/bake.mjs): loads a build in headless Chromium
// (a fresh browser: nothing kept), records every set the game's AssetLibrary asks for (`__witchArtAsks`, render/assets.ts) for a
// while, and reports which of their cache keys the bake's report lists, by kind. Also the load's marks (to the fade, the island in)
// and how many sets came from the baked art, for the notes' before/after.
//
//   node tools/prebake/coverage.cjs <dist> <report.json|-> "<link query>" [seconds] [out.json]
//   e.g. node tools/prebake/coverage.cjs dist .art-baked/report.json "island=fox&seed=123&loading=1&fresh=1" 240
const fs = require("fs"), path = require("path"), http = require("http");
const playwright = (() => { try { return require("playwright"); } catch { return require("/opt/node22/lib/node_modules/playwright"); } })();
const [dir = "dist", reportFile = "-", query = "island=fox&seed=123&loading=1&fresh=1", secs = "240", outFile] = process.argv.slice(2), root = path.resolve(dir);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".bin": "application/octet-stream" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  const baked = reportFile === "-" ? null : new Map(JSON.parse(fs.readFileSync(reportFile, "utf8")).sets.map(s => [s.key, s]));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.addInitScript(() => { window.__witchArtAsks = []; });
  const t0 = Date.now();
  await page.goto(`http://127.0.0.1:${server.address().port}/index.html?${query}`);
  const until = t0 + Number(secs) * 1000;
  let marks = {};
  while (Date.now() < until) {
    await page.waitForTimeout(5000);
    marks = await page.evaluate(() => Object.fromEntries(performance.getEntriesByType("mark").filter(m => /^(witch:ready|witch:prep-island|island:ready|chart:)/.test(m.name)).map(m => [m.name, Math.round(m.startTime)]))).catch(() => marks);
    if (process.env.UNTIL && marks[process.env.UNTIL] !== undefined) break;
  }
  // (the jobs not baked, with their keys, for bake.mjs --extra: a set asked on a first visit that the island listing doesn't reach)
  const asks = await page.evaluate(() => window.__witchArtAsks.map(a => ({ key: a.key, kind: a.kind, id: a.id, job: JSON.parse(JSON.stringify({ ...a.job, cacheKey: undefined, baked: undefined, urgent: undefined, gen: undefined, home: undefined })) })));
  const timings = await page.evaluate(() => window.witch?.view?.assets?.timings ?? globalThis.page?.view?.assets?.timings ?? null).catch(() => null);
  const byKind = {};
  const seen = new Set();
  for (const a of asks) {
    const k = a.key ?? `(no key) ${a.kind}:${a.id}`;
    if (seen.has(k)) continue;
    seen.add(k);
    const r = byKind[a.kind] ??= { asked: 0, baked: 0, missing: [] };
    r.asked++;
    if (baked?.has(a.key)) r.baked++; else if (r.missing.length < 4) r.missing.push(k);
  }
  const out = { query, seconds: Math.round((Date.now() - t0) / 1000), marks, asked: seen.size, baked: Object.values(byKind).reduce((n, r) => n + r.baked, 0), byKind,
    fromBaked: timings ? timings.filter(t => t.baked).length : null, cached: timings ? timings.filter(t => t.cached).length : null, drawn: timings ? timings.filter(t => !t.cached).length : null, errors: errors.slice(0, 10) };
  console.log(JSON.stringify(out, null, 1));
  if (outFile) fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
  if (process.env.EXTRA) { const seenX = new Set(); fs.writeFileSync(process.env.EXTRA, JSON.stringify(asks.filter(a => a.key && !a.job.cacheOnly && !baked?.has(a.key) && !seenX.has(a.key) && seenX.add(a.key)).map(a => ({ key: a.key, job: a.job })))); }
  await browser.close(); server.close();
});
